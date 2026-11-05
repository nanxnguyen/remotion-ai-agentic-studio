#!/usr/bin/env python3
"""Reviewer-gated GitHub artifact -> verified Drive binaries -> Olise Private.

For an existing GitHub Actions render artifact, run in ONE workflow job after
independent full-video review is genuinely complete.  The transfer avoids
ChatGPT's ephemeral local-container bridge entirely.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import os
import re
import sys
from pathlib import Path

CHANNEL_ID='UCY3n3Nlqyo6uI4GU8nuX-5g'
SHA_RE=re.compile(r'^[a-f0-9]{64}$')
FILE_ID_RE=re.compile(r'^[A-Za-z0-9_-]{12,200}$')

class DeliveryBlocked(ValueError):
    pass


def _require(ok: bool, message: str):
    if not ok: raise DeliveryBlocked(message)


def validate_delivery(record: dict, actual_sha: str) -> dict:
    _require(record.get('channel') == 'OLISE_MAN' and record.get('channel_id') == CHANNEL_ID and
             record.get('privacy') == 'private', 'Only pinned Olise channel and Private uploads allowed')
    sha=record.get('video_sha256')
    _require(isinstance(sha,str) and SHA_RE.fullmatch(sha) is not None and sha == actual_sha,
             'Exact MP4 SHA must match inspected source')
    review=record.get('independent_audiovisual_review')
    _require(isinstance(review,dict) and review.get('complete') is True and
             review.get('actual_encoded_media') is True and
             review.get('reviewed_video_sha256') == sha and
             review.get('all_shots_reviewed') is True and
             review.get('audio_reviewed') is True and
             review.get('rights_verified') is True and
             isinstance(review.get('method'),str) and len(review['method'])>=25 and
             isinstance(review.get('timeline_covered_seconds'),(int,float)) and
             review['timeline_covered_seconds']>=180,
             'Independent full-video audio-visual review and rights are required')
    basis=record.get('creative_release_basis')
    _require(basis in ('creative_qa_passed','private_override_after_5_actual_repairs'),
             'Missing creative release basis')
    if basis=='creative_qa_passed':
        _require(review.get('creative_passed') is True, 'Creative PASS requires independent creative verdict')
    else:
        hashes=record.get('distinct_attempt_sha256',[])
        _require(record.get('genuine_corrective_rounds')==5 and
                 isinstance(hashes,list) and len(hashes)==6 and len(set(hashes))==6 and
                 all(isinstance(x,str) and SHA_RE.fullmatch(x) for x in hashes) and
                 hashes[-1]==sha, 'Five distinct real repairs plus baseline required')
        _require(review.get('creative_passed') is False,
                 'Private creative override requires truthful failed creative review')
    ids=(record.get('video_drive_id'),record.get('thumbnail_drive_id'))
    if any(v is not None for v in ids):
        _require(all(isinstance(v,str) and FILE_ID_RE.fullmatch(v) for v in ids) and ids[0]!=ids[1],
                 'Real separate Drive video/thumbnail file IDs required')
    return record


def repair_existing_private_video(record: dict, video_id: str, youtube, thumbnail_path: Path,
                                  *, media_factory=None) -> dict:
    """Repair thumbnail on the SAME verified private video, never call videos.insert."""
    validate_delivery(record, record['video_sha256'])
    _require(isinstance(video_id, str) and re.fullmatch(r'[A-Za-z0-9_-]{11}', video_id) is not None,
             'Invalid existing YouTube video ID')
    marker = 'saf-' + record['video_sha256'][:32]

    def verified_item() -> dict:
        result = youtube.videos().list(part='snippet,status', id=video_id).execute()
        items = result.get('items', [])
        _require(len(items) == 1, 'Existing video is not visible to this OAuth channel')
        item = items[0]
        snippet = item.get('snippet', {})
        _require(snippet.get('channelId') == CHANNEL_ID, 'Existing video belongs to wrong channel')
        _require(item.get('status', {}).get('privacyStatus') == 'private', 'Existing video is not Private')
        _require(marker in snippet.get('tags', []), 'Existing video SHA marker does not match source MP4')
        return item

    verified_item()  # verify before touching the video
    thumbnail_path = Path(thumbnail_path)
    _require(thumbnail_path.is_file(), 'Real thumbnail image missing')
    with thumbnail_path.open('rb') as stream:
        header = stream.read(10)
    if thumbnail_path.suffix.lower() in {'.jpg', '.jpeg'}:
        _require(header.startswith(b'\xff\xd8\xff'), 'Invalid JPEG thumbnail')
        mime = 'image/jpeg'
    elif thumbnail_path.suffix.lower() == '.png':
        _require(header.startswith(b'\x89PNG\r\n\x1a\n'), 'Invalid PNG thumbnail')
        mime = 'image/png'
    else:
        raise DeliveryBlocked('Thumbnail must be JPEG/PNG')
    if media_factory is None:
        from googleapiclient.http import MediaFileUpload
        media_factory = lambda p, mime_type: MediaFileUpload(str(p), mimetype=mime_type, resumable=False)
    youtube.thumbnails().set(videoId=video_id, media_body=media_factory(thumbnail_path, mime)).execute()
    verified_item()  # confirm channel and Private visibility remain unchanged
    return {'status':'existing_private_verified', 'youtube_video_id':video_id,
            'channel_id': CHANNEL_ID, 'privacy':'private',
            'video_sha256':record['video_sha256'], 'thumbnail_set_ack':True}


def validate_reviewed_film(technical: dict, delivery: dict, story: dict) -> dict:
    """Require timecoded independent review of the actual complete encoded film."""
    from scripts.silent_factory_media_review import verify_review, MediaReviewBlocked
    shots = story.get('shots')
    _require(isinstance(shots, list) and len(shots) == 36 and
             all(isinstance(s, dict) and isinstance(s.get('id'), str) for s in shots),
             'Independent review must be based on a real 36-shot story manifest')
    try:
        result = verify_review(technical, delivery.get('independent_audiovisual_review'),
                               [shot['id'] for shot in shots])
    except MediaReviewBlocked as exc:
        raise DeliveryBlocked('independent review: ' + str(exc)) from exc
    _require(result.get('independent_full_media_reviewed') is True,
             'independent full-video reviewer execution missing')
    basis = delivery.get('creative_release_basis')
    if basis == 'creative_qa_passed':
        _require(result['status'] == 'CREATIVE_PASS', 'independent creative PASS not established')
    else:
        _require(basis == 'private_override_after_5_actual_repairs' and
                 result['status'] == 'CREATIVE_FAIL',
                 'private override requires independent creative FAIL and 5 actual repairs')
    return result


def safe_private_release(record: dict, publish, *, repair_existing=None) -> dict:
    validate_delivery(record, record['video_sha256'])
    _require(isinstance(record.get('video_drive_id'),str) and
             isinstance(record.get('thumbnail_drive_id'),str), 'Drive assets not staged')
    dry=publish(record,False)
    _require(dry.get('channel_id')==CHANNEL_ID and dry.get('privacy')=='private' and
             dry.get('video_sha256')==record['video_sha256'],
             'Private dry-run returned wrong channel, SHA or privacy')
    if dry.get('previously_uploaded_id'):
        # A SHA match alone does NOT prove current privacy or thumbnail.
        if repair_existing is not None:
            return repair_existing(record,dry['previously_uploaded_id'])
        return {'status':'DUPLICATE_VERIFY_REQUIRED','previously_uploaded_id':dry['previously_uploaded_id']}
    real=publish(record,True)
    _require(real.get('channel_id')==CHANNEL_ID and real.get('privacy')=='private' and
             real.get('video_sha256')==record['video_sha256'],
             'Private uploader receipt mismatch')
    status=real.get('status')
    if status=='uploaded_private_thumbnail_pending':
        if repair_existing is not None:
            return repair_existing(record,real.get('youtube_video_id'))
        return {'status':'THUMBNAIL_REPAIR_REQUIRED','youtube_video_id':real.get('youtube_video_id')}
    _require(status=='uploaded_private_ready_for_review' and
             isinstance(real.get('youtube_video_id'),str) and
             re.fullmatch(r'[A-Za-z0-9_-]{11}',real['youtube_video_id']) is not None,
             'Private video ID / thumbnail confirmation missing')
    return real


def file_sha(path: Path) -> str:
    h=hashlib.sha256()
    with path.open('rb') as f:
        for b in iter(lambda:f.read(4*1024*1024),b''):h.update(b)
    return h.hexdigest()


def main() -> None:
    ap=argparse.ArgumentParser()
    ap.add_argument('--manifest',required=True,type=Path)
    ap.add_argument('--video',required=True,type=Path)
    ap.add_argument('--thumbnail',required=True,type=Path)
    ap.add_argument('--technical-qa',required=True,type=Path)
    ap.add_argument('--destination-folder',required=True)
    ap.add_argument('--receipt-dir',default='out/silent-factory-delivery')
    args=ap.parse_args()
    from silent_factory_drive_writer import build_drive_client, upload_verified_media
    from youtube_multi_channel import validate_meta, credentials, YT_SCOPES
    from silent_factory_release import run_uploader
    root=Path(__file__).resolve().parents[1]
    source=args.manifest.resolve()
    _require(source.is_relative_to(root) and '/config/silent-factory/deliveries/' in str(source),
             'Delivery manifest must be checked into config/silent-factory/deliveries')
    rec=json.loads(source.read_text(encoding='utf-8'))
    technical=json.loads(args.technical_qa.read_text(encoding='utf-8'))
    digest=file_sha(args.video)
    _require(technical.get('movie_sha256')==digest and
             technical.get('all_video_frames_decoded') is True and
             technical.get('all_audio_decoded') is True and
             technical.get('width')==2560 and technical.get('height')==1440 and
             technical.get('fps')==30 and 180<=technical.get('duration_seconds',0)<=240,
             'Actual encoded technical QA evidence missing')
    validate_delivery(rec,digest)
    story_ref=rec.get('story_path')
    _require(isinstance(story_ref,str) and
             re.fullmatch(r'config/silent-factory/jobs/[a-z0-9-]+\.json',story_ref),
             'Missing matching committed story manifest')
    story=json.loads((root/story_ref).read_text(encoding='utf-8'))
    validate_reviewed_film(technical,rec,story)
    path=rec.get('metadata_path')
    _require(isinstance(path,str) and re.fullmatch(r'config/films/[a-z0-9-]+\.json',path),
             'Missing safe repository metadata path')
    meta=json.loads((root/path).read_text(encoding='utf-8'))
    validate_meta(meta, require_approval=True, profile='LONGFORM_EN')
    _require(meta.get('source_rights_verified') is True and
             meta.get('thumbnail_qa_approved') is True and
             meta.get('title_qa_approved') is True and
             meta.get('description_qa_approved') is True,
             'Media rights and packaging QA approvals required')
    if rec['creative_release_basis']=='creative_qa_passed':
        _require(meta.get('creative_qa_passed') is True and meta.get('creative_qa_override') is not True,
                 'Creative PASS metadata inconsistent')
    else:
        _require(meta.get('creative_qa_passed') is False and meta.get('creative_qa_override') is True,
                 'Private override must remain explicit')
    drive=build_drive_client()
    files=upload_verified_media(args.video,args.thumbnail,args.destination_folder,digest,drive=drive)
    rec.update(files)
    validate_delivery(rec,digest)
    receipts=root/args.receipt_dir
    receipts.mkdir(parents=True,exist_ok=True)
    (receipts/'drive-receipt.json').write_text(json.dumps(files,indent=2)+'\n')
    def publish(r,execute):
        return run_uploader(r,receipts/('youtube-private.json' if execute else 'preflight.json'),execute)
    def repair(r,vid):
        from googleapiclient.discovery import build
        yt=build('youtube','v3',credentials=credentials(YT_SCOPES,os.environ['YOUTUBE_REFRESH_TOKEN']),cache_discovery=False)
        return repair_existing_private_video(r,vid,yt,args.thumbnail)
    outcome=safe_private_release(rec,publish,repair_existing=repair)
    (receipts/'delivery-result.json').write_text(json.dumps(outcome,indent=2)+'\n')
    print(json.dumps({'status':outcome.get('status'),'youtube_video_id':outcome.get('youtube_video_id'),
                      'video_drive_id':files['video_drive_id'],'thumbnail_drive_id':files['thumbnail_drive_id']}))

if __name__=='__main__':
    try:main()
    except (DeliveryBlocked,ValueError,OSError) as exc:
        print('SILENT_FACTORY_DELIVERY_BLOCKED: '+type(exc).__name__+': '+str(exc)[:400],file=sys.stderr)
        raise SystemExit(1)