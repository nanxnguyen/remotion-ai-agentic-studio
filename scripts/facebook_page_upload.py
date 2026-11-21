#!/usr/bin/env python3
"""Upload a verified 9:16 MP4 from Google Drive to a Facebook Page as a Reel.

Dry-run by default: verifies the Page token, downloads and inspects the video,
validates metadata. Only --execute uploads. Default state is DRAFT.
Facebook's API cannot post to personal profiles; Pages only.
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from youtube_multi_channel import DRIVE_SCOPES, PreflightError, credentials, download_drive, drive_id

GRAPH_VERSION = os.environ.get("FB_GRAPH_VERSION", "v27.0")
GRAPH = f"https://graph.facebook.com/{GRAPH_VERSION}"
RUPLOAD = f"https://rupload.facebook.com/video-upload/{GRAPH_VERSION}"
STATES = {"DRAFT", "PUBLISHED"}


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


def validate_meta(meta: dict, *, execute: bool) -> None:
    desc = meta.get("description")
    if not isinstance(desc, str) or not desc.strip():
        raise PreflightError("Metadata needs a non-empty 'description'")
    if len(desc) > 2200:
        raise PreflightError("Description longer than 2200 characters")
    if execute and meta.get("qa_approved") is not True:
        raise PreflightError("Metadata not approved (qa_approved must be true) - upload blocked")


def upload_reel(page_id: str, token: str, path: Path, description: str, state: str) -> str:
    start = graph("POST", f"{GRAPH}/{page_id}/video_reels", token, {"upload_phase": "start"})
    video_id = start["video_id"]
    size = path.stat().st_size
    sent = graph("POST", f"{RUPLOAD}/{video_id}", token, body=path.read_bytes(),
                 headers={"offset": "0", "file_size": str(size), "Content-Type": "application/octet-stream"})
    if not sent.get("success"):
        raise PreflightError(f"Binary upload not accepted: {sent}")
    done = graph("POST", f"{GRAPH}/{page_id}/video_reels", token,
                 {"upload_phase": "finish", "video_id": video_id, "video_state": state, "description": description})
    if not done.get("success"):
        raise PreflightError(f"Finish phase failed: {done}")
    return video_id


def run(args) -> dict:
    state = args.state.upper()
    if state not in STATES:
        raise PreflightError(f"--state must be one of {sorted(STATES)}")
    page_id = os.environ.get("FB_PAGE_ID", "").strip()
    token = os.environ.get("FB_PAGE_ACCESS_TOKEN", "").strip()
    if not page_id or not token:
        raise PreflightError("Missing FB_PAGE_ID or FB_PAGE_ACCESS_TOKEN")
    meta = json.loads(Path(args.metadata).read_text(encoding="utf-8"))
    validate_meta(meta, execute=args.execute)

    page = graph("GET", f"{GRAPH}/{page_id}?fields=id,name", token)
    if page.get("id") != page_id:
        raise PreflightError("Token does not resolve to FB_PAGE_ID - wrong Page token")

    from googleapiclient.discovery import build
    drive = build("drive", "v3", credentials=credentials(DRIVE_SCOPES, os.environ.get("DRIVE_REFRESH_TOKEN", "")),
                  cache_discovery=False)
    with tempfile.TemporaryDirectory() as tmp:
        video = Path(tmp) / "reel.mp4"
        download_drive(drive, drive_id(args.video_drive_id), video, {"video/mp4"})
        info = probe(video)
        check_reel(info)
        receipt = {"page": page, "video": info, "state": state, "executed": False}
        if args.execute:
            receipt["video_id"] = upload_reel(page_id, token, video, meta["description"], state)
            receipt["executed"] = True
    return receipt


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--video-drive-id", required=True)
    p.add_argument("--metadata", required=True)
    p.add_argument("--state", default="DRAFT", help="DRAFT (default) or PUBLISHED")
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
