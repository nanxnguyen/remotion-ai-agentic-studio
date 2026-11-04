#!/usr/bin/env python3
"""Private-only YouTube long-form uploader; selects and verifies target channel.

A YouTube refresh token is channel-specific, even when one Google login manages
several Brand Accounts. This tool never changes a video's visibility to public.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
YT_SCOPES = ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.readonly"]
DRIVE_SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]
RETRYABLE = {429, 500, 502, 503, 504}


class PreflightError(ValueError):
    pass


def read_target(config: Path, key: str) -> dict:
    if not re.fullmatch(r"[A-Z][A-Z0-9_]{1,31}", key):
        raise PreflightError("Channel key must be UPPER_SNAKE_CASE, e.g. OLISE_MAN")
    doc = json.loads(config.read_text(encoding="utf-8"))
    target = doc.get("channels", {}).get(key)
    if not isinstance(target, dict):
        raise PreflightError(f"Unknown channel {key}; add it to {config}")
    handle = target.get("handle")
    if not isinstance(handle, str) or not re.fullmatch(r"@[\w.-]{3,30}", handle):
        raise PreflightError("Invalid channel handle in allowlist")
    pinned = target.get("channel_id")
    if pinned is not None and (not isinstance(pinned, str) or not re.fullmatch(r"UC[A-Za-z0-9_-]{22}", pinned)):
        raise PreflightError("Invalid pinned channel_id; use UC... or null")
    return {"key": key, "handle": handle, "channel_id": pinned}


def resolve_channel(yt, target: dict) -> dict:
    """Check BOTH current public handle and the OAuth token's real owner."""
    public = yt.channels().list(part="id,snippet", forHandle=target["handle"]).execute().get("items", [])
    owned = yt.channels().list(part="id,snippet,contentDetails", mine=True).execute().get("items", [])
    if len(public) != 1 or len(owned) != 1:
        raise PreflightError("Cannot unambiguously resolve handle and OAuth channel")
    found, authorized = public[0], owned[0]
    if found["id"] != authorized["id"]:
        raise PreflightError(f"WRONG CHANNEL: @{target['handle'].lstrip('@')} is {found['id']}; OAuth belongs to {authorized['id']}. Upload blocked.")
    if target["channel_id"] and found["id"] != target["channel_id"]:
        raise PreflightError("Pinned channel ID no longer matches handle. Upload blocked")
    return authorized


def credentials(scope: list[str], refresh: str):
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    client_id = os.environ.get("YOUTUBE_CLIENT_ID")
    client_secret = os.environ.get("YOUTUBE_CLIENT_SECRET")
    if not client_id or not client_secret or not refresh:
        raise PreflightError("Missing Google OAuth client ID, secret, or provider refresh token")
    cred = Credentials(None, refresh_token=refresh, token_uri="https://oauth2.googleapis.com/token",
                       client_id=client_id, client_secret=client_secret, scopes=scope)
    cred.refresh(Request())
    return cred


def validate_meta(meta: dict, *, require_approval: bool) -> None:
    title, desc = meta.get("title"), meta.get("description")
    if not isinstance(title, str) or not 5 <= len(title.strip()) <= 100:
        raise PreflightError("Title must contain 5–100 characters")
    if not isinstance(desc, str) or not 1 <= len(desc) <= 5000:
        raise PreflightError("Description must contain 1–5000 characters")
    if meta.get("language") != "en":
        raise PreflightError("This silent-animation workflow requires language=en")
    if not isinstance(meta.get("made_for_kids"), bool) or not isinstance(meta.get("contains_synthetic_media"), bool):
        raise PreflightError("Set made_for_kids and contains_synthetic_media explicitly")
    if require_approval and meta.get("qa_approved") is not True:
        raise PreflightError("FINAL QA approval is required before uploading")
    if meta.get("privacy", "private") != "private" or "publish_at" in meta or "publishAt" in meta:
        raise PreflightError("This uploader is PRIVATE ONLY")
    tags = meta.get("tags", [])
    if not isinstance(tags, list) or len(tags) > 30 or not all(isinstance(t, str) and t.strip() for t in tags):
        raise PreflightError("Invalid tags")
    if sum(len(t) for t in tags) > 450:
        raise PreflightError("Tags exceed budget")


def drive_id(value: str) -> str:
    value = (value or "").strip()
    m = re.fullmatch(r"https://drive\.google\.com/file/d/([A-Za-z0-9_-]+)(?:/view.*)?", value)
    if m:
        value = m.group(1)
    if not re.fullmatch(r"[A-Za-z0-9_-]{12,200}", value):
        raise PreflightError("Provide a Google Drive file ID or drive.google.com/file/d/ID/view link")
    return value


def download_drive(drive, fid: str, destination: Path, expected_mimes: set[str]) -> None:
    from googleapiclient.http import MediaIoBaseDownload
    info = drive.files().get(fileId=fid, fields="id,name,mimeType,size").execute()
    if info.get("mimeType") not in expected_mimes:
        raise PreflightError(f"Wrong Drive MIME for {info.get('name')}: {info.get('mimeType')}")
    request = drive.files().get_media(fileId=fid)
    with destination.open("wb") as stream:
        client = MediaIoBaseDownload(stream, request, chunksize=8 * 1024 * 1024)
        done = False
        while not done:
            _, done = client.next_chunk(num_retries=3)
    if not destination.stat().st_size:
        raise PreflightError("Downloaded file is empty")


def inspect_video(path: Path) -> dict:
    try:
        output = subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)], capture_output=True, text=True, check=False)
        if output.returncode:
            raise PreflightError(f"ffprobe failed (exit={output.returncode}, bytes={path.stat().st_size}): {output.stderr[-300:]}")
        data = json.loads(output.stdout)
        v = next(x for x in data["streams"] if x.get("codec_type") == "video")
        a = next(x for x in data["streams"] if x.get("codec_type") == "audio")
        fps = v.get("avg_frame_rate", "0/1")
        n, d = (int(x) for x in fps.split("/"))
        duration = float(data["format"]["duration"])
    except PreflightError:
        raise
    except (OSError, StopIteration, KeyError, ValueError, subprocess.CalledProcessError, ZeroDivisionError) as e:
        raise PreflightError(f"Invalid MP4 or missing video/audio stream (bytes={path.stat().st_size}): {type(e).__name__}: {str(e)[:180]}") from e
    if (v.get("width"), v.get("height")) != (2560, 1440) or abs(n / d - 30) > 0.05 or not 180 <= duration <= 240.5:
        raise PreflightError("Expected 2560x1440 at 30 FPS and 3–4 minutes")
    if v.get("codec_name") != "h264" or a.get("codec_name") != "aac":
        raise PreflightError("Expected H.264 video and AAC audio")
    return {"width": v["width"], "height": v["height"], "fps": round(n / d, 3), "duration": round(duration, 3)}


def inspect_thumbnail(path: Path) -> None:
    from PIL import Image
    if path.stat().st_size > 2 * 1024 * 1024:
        raise PreflightError("Thumbnail must be 2 MiB or smaller")
    with Image.open(path) as im:
        if im.size != (1280, 720) or im.format not in {"JPEG", "PNG"}:
            raise PreflightError("Thumbnail must be 1280x720 PNG/JPEG")
        im.verify()


def file_hash(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(4 * 1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def duplicate_video(yt, channel: dict, marker: str) -> str | None:
    playlist = channel.get("contentDetails", {}).get("relatedPlaylists", {}).get("uploads")
    if not playlist:
        raise PreflightError("Cannot inspect authorized channel uploads; refusing possible duplicate")
    token = None
    for _ in range(8):
        data = yt.playlistItems().list(part="contentDetails", playlistId=playlist, maxResults=50, pageToken=token).execute()
        ids = [row.get("contentDetails", {}).get("videoId") for row in data.get("items", [])]
        ids = [x for x in ids if x]
        if ids:
            found = yt.videos().list(part="snippet", id=",".join(ids), maxResults=50).execute()
            for row in found.get("items", []):
                if marker in row.get("snippet", {}).get("tags", []):
                    return row["id"]
        token = data.get("nextPageToken")
        if not token:
            break
    return None


def upload_video(yt, path: Path, meta: dict, marker: str) -> str:
    from googleapiclient.http import MediaFileUpload
    from googleapiclient.errors import HttpError
    body = {
        "snippet": {"title": meta["title"].strip(), "description": meta["description"],
                    "tags": [*meta.get("tags", []), marker], "categoryId": "1", "defaultLanguage": "en"},
        "status": {"privacyStatus": "private", "selfDeclaredMadeForKids": meta["made_for_kids"],
                   "containsSyntheticMedia": meta["contains_synthetic_media"]},
    }
    req = yt.videos().insert(part="snippet,status", body=body,
                             media_body=MediaFileUpload(str(path), mimetype="video/mp4", resumable=True, chunksize=8 * 1024 * 1024))
    retries = 0
    while True:
        try:
            progress, result = req.next_chunk()
            if progress:
                print(f"Upload: {progress.progress() * 100:.0f}%")
            if result:
                if not result.get("id") or result.get("status", {}).get("privacyStatus") not in {"private", None}:
                    raise PreflightError("Unexpected upload result; verify the video in YouTube Studio")
                return result["id"]
        except HttpError as ex:
            retries += 1
            if getattr(ex.resp, "status", None) not in RETRYABLE or retries > 4:
                raise
            time.sleep(min(2 ** retries, 20))


def write_receipt(path: Path, doc: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + ".tmp")
    temp.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    temp.replace(path)


def run(args) -> dict:
    target = read_target(Path(args.config), args.channel)
    metadata_path = Path(args.metadata).resolve()
    if not metadata_path.is_relative_to(ROOT):
        raise PreflightError("Metadata must be a file checked into this repository")
    meta = json.loads(metadata_path.read_text(encoding="utf-8"))
    validate_meta(meta, require_approval=args.execute)
    video_id = drive_id(args.video_drive_id)
    thumb_id = drive_id(args.thumbnail_drive_id)
    if video_id == thumb_id:
        raise PreflightError("Video and thumbnail cannot be the same Drive file")
    if args.execute and os.getenv("YOUTUBE_UPLOAD_PRIVATE_ENABLED") != "1":
        raise PreflightError("Upload blocked: set YOUTUBE_UPLOAD_PRIVATE_ENABLED=1")

    from googleapiclient.discovery import build
    yt_refresh = os.environ.get("YOUTUBE_REFRESH_TOKEN", "")
    if not yt_refresh:
        raise PreflightError("Missing channel-specific YOUTUBE_REFRESH_TOKEN")
    yt = build("youtube", "v3", credentials=credentials(YT_SCOPES, yt_refresh), cache_discovery=False)
    owned = resolve_channel(yt, target)  # MUST precede upload
    drive_refresh = os.environ.get("DRIVE_REFRESH_TOKEN", "")
    if not drive_refresh:
        raise PreflightError("Missing DRIVE_REFRESH_TOKEN")
    drive = build("drive", "v3", credentials=credentials(DRIVE_SCOPES, drive_refresh), cache_discovery=False)

    with tempfile.TemporaryDirectory(prefix="youtube-longform-private-") as folder:
        video = Path(folder) / "video.mp4"
        thumb = Path(folder) / "thumbnail.png"
        download_drive(drive, video_id, video, {"video/mp4"})
        download_drive(drive, thumb_id, thumb, {"image/png", "image/jpeg"})
        stats = inspect_video(video)
        inspect_thumbnail(thumb)
        sha = file_hash(video)
        marker = "saf-" + sha[:32]
        existing = duplicate_video(yt, owned, marker)
        receipt = {"channel_key": target["key"], "handle": target["handle"], "channel_id": owned["id"],
                   "video_sha256": sha, "video_info": stats, "source_drive_id": video_id,
                   "thumbnail_drive_id": thumb_id, "privacy": "private"}
        if not args.execute:
            receipt.update(status="dry_run", previously_uploaded_id=existing)
            write_receipt(Path(args.receipt), receipt)
            return receipt
        if existing:
            raise PreflightError(f"Video already uploaded to target channel as {existing}; no duplicate upload")
        remote_id = upload_video(yt, video, meta, marker)
        receipt.update(status="uploaded_private_thumbnail_pending", youtube_video_id=remote_id,
                       youtube_url=f"https://www.youtube.com/watch?v={remote_id}")
        write_receipt(Path(args.receipt), receipt)  # fail-safe before thumbnail
        from googleapiclient.http import MediaFileUpload
        mime = "image/png" if thumb.read_bytes()[:8] == b"\x89PNG\r\n\x1a\n" else "image/jpeg"
        yt.thumbnails().set(videoId=remote_id, media_body=MediaFileUpload(str(thumb), mimetype=mime)).execute()
        receipt["status"] = "uploaded_private_ready_for_review"
        write_receipt(Path(args.receipt), receipt)
        return receipt


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--channel", default="OLISE_MAN", help="Allowlisted channel key, e.g. OLISE_MAN")
    ap.add_argument("--config", default=str(ROOT / "config" / "youtube-channel-targets.json"))
    ap.add_argument("--video-drive-id", required=True)
    ap.add_argument("--thumbnail-drive-id", required=True)
    ap.add_argument("--metadata", required=True)
    ap.add_argument("--receipt", default="youtube-private-receipt.json")
    ap.add_argument("--execute", action="store_true", help="Upload PRIVATE; default is dry-run")
    a = ap.parse_args()
    try:
        result = run(a)
    except Exception as error:
        print(json.dumps({"status": "blocked", "error": f"{type(error).__name__}: {str(error)[:360]}"}), file=sys.stderr)
        raise SystemExit(1)
    print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()