#!/usr/bin/env python3
"""Resumable, SHA-verified Google Drive binary delivery for Silent Factory.

Uses a SEPARATE consented Drive-write OAuth token, not the read-only token
of the existing YouTube uploader.  No ZIP/thumbnail can masquerade as FINAL.
"""
from __future__ import annotations
import hashlib
import io
import os
import random
import re
import tempfile
import time
from pathlib import Path

WRITE_SCOPES = ['https://www.googleapis.com/auth/drive.file']
RETRYABLE = {429, 500, 502, 503, 504}
FOLDER_RE = re.compile(r'^[a-zA-Z0-9_-]{12,200}$')


class DriveWriteBlocked(ValueError):
    pass


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(4 * 1024 * 1024), b''):
            digest.update(block)
    return digest.hexdigest()


def retry_drive(operation, *, attempts: int = 5, sleeper=time.sleep):
    for n in range(attempts):
        try:
            return operation()
        except Exception as error:
            status = getattr(getattr(error, 'resp', None), 'status', None)
            if status in (401, 403):
                raise DriveWriteBlocked('Drive writer authorization/scope denied; renew a scoped credential') from error
            if status not in RETRYABLE or n == attempts - 1:
                if status in RETRYABLE:
                    raise DriveWriteBlocked('Drive retry budget exhausted; safe to retry the same SHA later') from error
                raise
            sleeper(min(16, 2 ** n) + random.random() / 10)
    raise AssertionError('unreachable')


def build_drive_client(environ: dict | None = None):
    env = dict(os.environ if environ is None else environ)
    if not env.get('DRIVE_WRITE_REFRESH_TOKEN'):
        raise DriveWriteBlocked('DRIVE_WRITE_REFRESH_TOKEN credential is missing; read-only DRIVE_REFRESH_TOKEN cannot write')
    if not env.get('YOUTUBE_CLIENT_ID') or not env.get('YOUTUBE_CLIENT_SECRET'):
        raise DriveWriteBlocked('OAuth client credential missing')
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
    creds = Credentials(token=None, refresh_token=env['DRIVE_WRITE_REFRESH_TOKEN'],
                        client_id=env['YOUTUBE_CLIENT_ID'], client_secret=env['YOUTUBE_CLIENT_SECRET'],
                        token_uri='https://oauth2.googleapis.com/token', scopes=WRITE_SCOPES)
    try:
        creds.refresh(Request())
    except Exception as exc:
        raise DriveWriteBlocked('Drive writer OAuth refresh failed (grant/scope)') from exc
    return build('drive', 'v3', credentials=creds, cache_discovery=False)


def _readback_sha(drive, file_id: str, download_bytes=None) -> tuple[str, int]:
    if download_bytes is not None:
        content = download_bytes(file_id)
        if not isinstance(content, bytes):
            raise DriveWriteBlocked('Drive readback must return bytes')
        return hashlib.sha256(content).hexdigest(), len(content)
    from googleapiclient.http import MediaIoBaseDownload
    with tempfile.SpooledTemporaryFile(max_size=8 * 1024 * 1024) as target:
        downloader = MediaIoBaseDownload(target, drive.files().get_media(fileId=file_id), chunksize=8 * 1024 * 1024)
        done = False
        while not done:
            _, done = retry_drive(downloader.next_chunk)
        target.seek(0)
        digest = hashlib.sha256()
        length = 0
        while block := target.read(4 * 1024 * 1024):
            digest.update(block)
            length += len(block)
        return digest.hexdigest(), length


def _upload_one(drive, path: Path, folder_id: str, kind: str,
                *, media_factory=None, download_bytes=None) -> str:
    digest = file_sha256(path)
    mime = 'video/mp4' if kind == 'final_video' else ('image/jpeg' if path.suffix.lower() in {'.jpg', '.jpeg'} else 'image/png')
    safe_name = path.name.replace("'", '')
    # Drive.file scope can list only files created or explicitly authorized for this app.
    query = "name = '" + safe_name + "' and '" + folder_id + "' in parents and trashed = false"
    page = retry_drive(lambda: drive.files().list(q=query, fields='files(id,name,mimeType,size,appProperties),nextPageToken',page_size=100).execute())
    candidates = [item for item in page.get('files', []) if item.get('name') == path.name]
    for item in candidates:
        if item.get('appProperties', {}).get('sha256') == digest and item.get('mimeType') == mime:
            file_id = item['id']
            actual_hash, actual_size = _readback_sha(drive, file_id, download_bytes)
            if actual_hash != digest or actual_size != path.stat().st_size:
                raise DriveWriteBlocked('Drive existing file readback SHA/size mismatch')
            return file_id
    if candidates:
        raise DriveWriteBlocked('A different file uses the same name in Drive; never overwrite a different SHA')
    if media_factory is None:
        from googleapiclient.http import MediaFileUpload
        def media_factory(p, mimetype, resumable, chunksize):
            return MediaFileUpload(str(p), mimetype=mimetype, resumable=resumable, chunksize=chunksize)
    media = media_factory(path, mime, resumable=True, chunksize=8 * 1024 * 1024)
    body = {'name': path.name, 'parents': [folder_id], 'mimeType': mime,
            'appProperties': {'sha256': digest, 'asset_kind': kind}}
    upload = drive.files().create(body=body, media_body=media,
                                  fields='id,name,mimeType,size,appProperties,parents')
    response = None
    while response is None:
        _, response = retry_drive(upload.next_chunk)
    file_id = response.get('id')
    if not file_id:
        raise DriveWriteBlocked('Drive returned no file ID')
    metadata = retry_drive(lambda: drive.files().get(fileId=file_id,
        fields='id,name,mimeType,size,appProperties,parents').execute())
    if metadata.get('mimeType') != mime or metadata.get('name') != path.name or folder_id not in metadata.get('parents', []):
        raise DriveWriteBlocked('Drive metadata parent/name/MIME verification failed')
    if int(metadata.get('size', -1)) != path.stat().st_size:
        raise DriveWriteBlocked('Drive uploaded byte count mismatch')
    actual_hash, actual_size = _readback_sha(drive, file_id, download_bytes)
    if actual_hash != digest or actual_size != path.stat().st_size:
        raise DriveWriteBlocked('Drive readback SHA/size mismatch')
    return file_id


def upload_verified_media(video: Path, thumb: Path, folder_id: str, sha256: str,
                          *, drive, media_factory=None, download_bytes=None) -> dict:
    video, thumb = Path(video), Path(thumb)
    if not FOLDER_RE.fullmatch(folder_id):
        raise DriveWriteBlocked('Invalid consented destination folder ID')
    if not video.is_file() or not thumb.is_file():
        raise DriveWriteBlocked('Actual MP4 and thumbnail must exist')
    with video.open('rb') as stream:
        video_header = stream.read(12)
    if video.suffix.lower() != '.mp4' or video.stat().st_size < 12 or video_header[4:8] != b'ftyp':
        raise DriveWriteBlocked('Actual MP4 required, not ZIP or preview surrogate')
    with thumb.open('rb') as stream:
        thumb_header = stream.read(12)
    jpeg = thumb_header.startswith(b'\xff\xd8\xff') and thumb.suffix.lower() in {'.jpg', '.jpeg'}
    png = thumb_header.startswith(b'\x89PNG\r\n\x1a\n') and thumb.suffix.lower() == '.png'
    if not (jpeg or png):
        raise DriveWriteBlocked('Actual JPEG/PNG thumbnail required with matching filename extension')
    if not re.fullmatch(r'[0-9a-f]{64}', sha256) or file_sha256(video) != sha256:
        raise DriveWriteBlocked('Source MP4 SHA does not match independently reviewed SHA')
    video_id = _upload_one(drive, video, folder_id, 'final_video', media_factory=media_factory, download_bytes=download_bytes)
    thumbnail_id = _upload_one(drive, thumb, folder_id, 'thumbnail', media_factory=media_factory, download_bytes=download_bytes)
    if video_id == thumbnail_id:
        raise DriveWriteBlocked('Drive returned same ID for video and thumbnail')
    return {'video_drive_id': video_id, 'thumbnail_drive_id': thumbnail_id,
            'verified_sha256': sha256, 'mime_type': 'video/mp4',
            'video_bytes': video.stat().st_size, 'thumbnail_bytes': thumb.stat().st_size}