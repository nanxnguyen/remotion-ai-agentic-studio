#!/usr/bin/env python3
"""Upload a verified MP4 from Google Drive to a Facebook Page as a Reel or Page Video.

Dry-run by default: verifies the Page token, downloads and inspects the video,
validates metadata. Only --execute uploads. Default state is DRAFT.
Supports optional custom thumbnail (--thumbnail-drive-id) and first comment (meta.comment).
Facebook's API cannot post to personal profiles; Pages only.
"""
from __future__ import annotations

import argparse
import json
import mimetypes
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from pathlib import Path

from youtube_multi_channel import DRIVE_SCOPES, PreflightError, credentials, download_drive, drive_id

GRAPH_VERSION = os.environ.get("FB_GRAPH_VERSION", "v27.0")
GRAPH = f"https://graph.facebook.com/{GRAPH_VERSION}"
GRAPH_VIDEO = f"https://graph-video.facebook.com/{GRAPH_VERSION}"
RUPLOAD = f"https://rupload.facebook.com/video-upload/{GRAPH_VERSION}"
STATES = {"DRAFT", "PUBLISHED", "SCHEDULED"}
MODES = {"reel", "video", "auto"}
CHUNK_BYTES = 16 * 1024 * 1024


def graph(method: str, url: str, token: str, params: dict | None = None,
          body: bytes | None = None, headers: dict | None = None) -> dict:
    # Token goes in the Authorization header, never in the URL (keeps it out of logs).
    data = body if body is not None else (urllib.parse.urlencode(params).encode() if params else None)
    req = urllib.request.Request(url, data=data, method=method,
                                 headers={"Authorization": f"OAuth {token}", **(headers or {})})
    try:
        with urllib.request.urlopen(req, timeout=600) as resp:
            return json.loads(resp.read() or b"{}")
    except urllib.error.HTTPError as e:
        try:
            err = json.loads(e.read()).get("error", {})
        except ValueError:
            err = {}
        raise PreflightError(f"Graph API {e.code}: {err.get('message', 'unknown error')} "
                             f"(type={err.get('type')}, code={err.get('code')})") from None


def encode_multipart(fields: dict[str, str], files: dict[str, tuple[str, bytes, str]]) -> tuple[bytes, str]:
    """Encode form fields and binary files as multipart/form-data."""
    boundary = f"----AntigravityFB{uuid.uuid4().hex}"
    parts: list[bytes] = []
    for name, value in fields.items():
        parts.append(
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="{name}"\r\n\r\n'
            f"{value}\r\n".encode("utf-8")
        )
    for name, (filename, payload, content_type) in files.items():
        parts.append(
            f"--{boundary}\r\n"
            f'Content-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'
            f"Content-Type: {content_type}\r\n\r\n".encode("utf-8")
            + payload
            + b"\r\n"
        )
    parts.append(f"--{boundary}--\r\n".encode("utf-8"))
    return b"".join(parts), f"multipart/form-data; boundary={boundary}"


def check_reel(info: dict) -> None:
    """Facebook Reels spec: 9:16, at least 540x960, 3-90 s, 24-60 fps, H.264/AAC."""
    w, h = info["width"], info["height"]
    if w * 16 != h * 9 or w < 540:
        raise PreflightError(f"Reel must be 9:16 and >=540x960, got {w}x{h}")
    if not 3 <= info["duration"] <= 90:
        raise PreflightError(f"Reel must be 3-90 s, got {info['duration']} s")
    if not 23.9 <= info["fps"] <= 60.05:
        raise PreflightError(f"Reel must be 24-60 fps, got {info['fps']}")
    if info["vcodec"] != "h264" or info["acodec"] != "aac":
        raise PreflightError("Expected H.264 video and AAC audio")


def check_video(info: dict) -> None:
    """Facebook Page Video spec: >=480x360, >=3 s, H.264/AAC."""
    w, h = info["width"], info["height"]
    if w < 480 or h < 360:
        raise PreflightError(f"Video must be >=480x360, got {w}x{h}")
    if info["duration"] < 3:
        raise PreflightError(f"Video must be >=3 s, got {info['duration']} s")
    if info["vcodec"] != "h264" or info["acodec"] != "aac":
        raise PreflightError("Expected H.264 video and AAC audio")


def resolve_mode(requested: str, info: dict) -> str:
    """Resolve 'auto' to 'reel' for 9:16 <=90s videos, else 'video'."""
    if requested != "auto":
        return requested
    w, h = info["width"], info["height"]
    if w * 16 == h * 9 and w >= 540 and 3 <= info["duration"] <= 90:
        return "reel"
    return "video"


def probe(path: Path) -> dict:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)],
                         capture_output=True, text=True)
    if out.returncode:
        raise PreflightError(f"ffprobe failed: {out.stderr[-300:]}")
    data = json.loads(out.stdout)
    try:
        v = next(s for s in data["streams"] if s.get("codec_type") == "video")
        a = next(s for s in data["streams"] if s.get("codec_type") == "audio")
        n, d = (int(x) for x in v["avg_frame_rate"].split("/"))
        return {"width": v["width"], "height": v["height"], "fps": round(n / d, 3),
                "duration": round(float(data["format"]["duration"]), 3),
                "vcodec": v.get("codec_name"), "acodec": a.get("codec_name")}
    except (StopIteration, KeyError, ValueError, ZeroDivisionError) as e:
        raise PreflightError(f"Invalid MP4 or missing video/audio stream: {type(e).__name__}") from e


def validate_meta(meta: dict, *, execute: bool, mode: str = "reel") -> None:
    desc = meta.get("description")
    if not isinstance(desc, str) or not desc.strip():
        raise PreflightError("Metadata needs a non-empty 'description'")
    max_len = 2200 if mode == "reel" else 63206
    if len(desc) > max_len:
        raise PreflightError(f"Description longer than {max_len} characters")
    if execute and meta.get("qa_approved") is not True:
        raise PreflightError("Metadata not approved (qa_approved must be true) - upload blocked")


def validate_schedule(state: str, scheduled_ts: int | None, now: int | None = None) -> None:
    if state != "SCHEDULED":
        return
    if not scheduled_ts:
        raise PreflightError("SCHEDULED state requires --scheduled-publish-time (Unix timestamp)")
    cur = int(time.time()) if now is None else now
    if scheduled_ts < cur + 600:
        raise PreflightError("scheduled_publish_time must be at least 10 minutes in the future")
    if scheduled_ts > cur + 30 * 86400:
        raise PreflightError("scheduled_publish_time must be within 30 days")


def upload_reel(page_id: str, token: str, path: Path, description: str, state: str,
                scheduled_ts: int | None = None) -> str:
    start = graph("POST", f"{GRAPH}/{page_id}/video_reels", token, {"upload_phase": "start"})
    video_id = start["video_id"]
    size = path.stat().st_size
    sent = graph("POST", f"{RUPLOAD}/{video_id}", token, body=path.read_bytes(),
                 headers={"offset": "0", "file_size": str(size), "Content-Type": "application/octet-stream"})
    if not sent.get("success"):
        raise PreflightError(f"Binary upload not accepted: {sent}")
    finish_params = {"upload_phase": "finish", "video_id": video_id, "video_state": state, "description": description}
    if state == "SCHEDULED" and scheduled_ts:
        finish_params["scheduled_publish_time"] = str(scheduled_ts)
    done = graph("POST", f"{GRAPH}/{page_id}/video_reels", token, finish_params)
    if not done.get("success"):
        raise PreflightError(f"Finish phase failed: {done}")
    return video_id


def upload_page_video(page_id: str, token: str, path: Path, title: str, description: str, state: str,
                      scheduled_ts: int | None = None) -> str:
    """Upload a regular/long-form Page Video using resumable chunked upload on graph-video."""
    size = path.stat().st_size
    start = graph("POST", f"{GRAPH_VIDEO}/{page_id}/videos", token,
                  {"upload_phase": "start", "file_size": str(size)})
    session_id = start["upload_session_id"]
    video_id = start["video_id"]
    with path.open("rb") as stream:
        offset = 0
        while offset < size:
            chunk = stream.read(CHUNK_BYTES)
            if not chunk:
                break
            body, ctype = encode_multipart(
                {"upload_phase": "transfer", "upload_session_id": str(session_id), "start_offset": str(offset)},
                {"video_file_chunk": ("chunk.mp4", chunk, "application/octet-stream")},
            )
            res = graph("POST", f"{GRAPH_VIDEO}/{page_id}/videos", token, body=body, headers={"Content-Type": ctype})
            offset = int(res.get("start_offset", offset + len(chunk)))
    finish_params = {
        "upload_phase": "finish",
        "upload_session_id": str(session_id),
        "title": title,
        "description": description,
        "published": "true" if state == "PUBLISHED" else "false",
    }
    if state == "SCHEDULED" and scheduled_ts:
        finish_params["scheduled_publish_time"] = str(scheduled_ts)
    done = graph("POST", f"{GRAPH_VIDEO}/{page_id}/videos", token, finish_params)
    if not done.get("success"):
        raise PreflightError(f"Video finish phase failed: {done}")
    return str(video_id)


def upload_thumbnail(video_id: str, token: str, thumb_path: Path) -> dict:
    """Attach a preferred custom thumbnail to a Reel or Page Video (retries while ingesting)."""
    mime = mimetypes.guess_type(thumb_path.name)[0] or "image/png"
    payload = thumb_path.read_bytes()
    last_err: Exception | None = None
    for delay in (2, 5, 10, 15):
        time.sleep(delay)
        try:
            body, ctype = encode_multipart(
                {"is_preferred": "true"},
                {"source": (thumb_path.name, payload, mime)},
            )
            return graph("POST", f"{GRAPH}/{video_id}/thumbnails", token, body=body, headers={"Content-Type": ctype})
        except PreflightError as exc:
            last_err = exc
    return {"warning": f"thumbnail_not_applied: {last_err}"}


def post_comment(video_id: str, token: str, message: str) -> dict:
    """Post an initial comment on a published video/reel."""
    try:
        return graph("POST", f"{GRAPH}/{video_id}/comments", token, {"message": message})
    except PreflightError as exc:
        return {"warning": f"comment_not_posted: {exc}"}


def run(args) -> dict:
    state = args.state.upper()
    if state not in STATES:
        raise PreflightError(f"--state must be one of {sorted(STATES)}")
    scheduled_ts = int(args.scheduled_publish_time) if str(args.scheduled_publish_time).strip() else None
    validate_schedule(state, scheduled_ts)
    requested_mode = args.mode.lower()
    if requested_mode not in MODES:
        raise PreflightError(f"--mode must be one of {sorted(MODES)}")
    page_id = os.environ.get("FB_PAGE_ID", "").strip()
    token = os.environ.get("FB_PAGE_ACCESS_TOKEN", "").strip()
    if not page_id or not token:
        raise PreflightError("Missing FB_PAGE_ID or FB_PAGE_ACCESS_TOKEN")
    meta = json.loads(Path(args.metadata).read_text(encoding="utf-8"))

    page = graph("GET", f"{GRAPH}/{page_id}?fields=id,name", token)
    if page.get("id") != page_id:
        raise PreflightError("Token does not resolve to FB_PAGE_ID - wrong Page token")
    if not args.video_drive_id:
        validate_meta(meta, execute=args.execute, mode="video" if requested_mode == "video" else "reel")
        return {"page": page, "ping": "ok", "executed": False}

    from googleapiclient.discovery import build
    drive = build("drive", "v3", credentials=credentials(DRIVE_SCOPES, os.environ.get("DRIVE_REFRESH_TOKEN", "")),
                  cache_discovery=False)
    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)
        video = tmp_dir / "video.mp4"
        download_drive(drive, drive_id(args.video_drive_id), video, {"video/mp4"})
        info = probe(video)
        mode = resolve_mode(requested_mode, info)
        if mode == "reel":
            check_reel(info)
        else:
            check_video(info)
        validate_meta(meta, execute=args.execute, mode=mode)

        thumb_path: Path | None = None
        if args.thumbnail_drive_id:
            thumb_path = tmp_dir / "thumbnail.png"
            download_drive(drive, drive_id(args.thumbnail_drive_id), thumb_path, {"image/png", "image/jpeg"})

        receipt = {
            "page": page,
            "mode": mode,
            "video": info,
            "has_thumbnail": thumb_path is not None,
            "has_comment": bool(meta.get("comment")),
            "state": state,
            "executed": False,
        }
        if args.execute:
            if mode == "reel":
                vid = upload_reel(page_id, token, video, meta["description"], state, scheduled_ts)
            else:
                title = (meta.get("title") or meta["description"].splitlines()[0])[:255]
                vid = upload_page_video(page_id, token, video, title, meta["description"], state, scheduled_ts)
            receipt["video_id"] = vid
            receipt["scheduled_publish_time"] = scheduled_ts
            receipt["executed"] = True
            if thumb_path is not None:
                receipt["thumbnail_result"] = upload_thumbnail(vid, token, thumb_path)
            if state == "PUBLISHED" and meta.get("comment"):
                receipt["comment_result"] = post_comment(vid, token, meta["comment"])
    return receipt


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--video-drive-id", default="", help="Empty = ping only (verify Page token)")
    p.add_argument("--thumbnail-drive-id", default="", help="Optional Drive file ID for custom cover thumbnail")
    p.add_argument("--metadata", required=True)
    p.add_argument("--mode", default="reel", help="reel (default), video, or auto")
    p.add_argument("--state", default="DRAFT", help="DRAFT (default), SCHEDULED, or PUBLISHED")
    p.add_argument("--scheduled-publish-time", default="", help="Unix timestamp for SCHEDULED state")
    p.add_argument("--receipt", default="facebook-reel-receipt.json")
    p.add_argument("--execute", action="store_true", help="Actually upload; otherwise dry-run")
    args = p.parse_args()
    try:
        receipt = run(args)
    except PreflightError as e:
        receipt = {"error": str(e), "executed": False}
        print(f"BLOCKED: {e}", file=sys.stderr)
    Path(args.receipt).write_text(json.dumps(receipt, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(receipt, ensure_ascii=False, indent=2))
    return 1 if "error" in receipt else 0


if __name__ == "__main__":
    sys.exit(main())
