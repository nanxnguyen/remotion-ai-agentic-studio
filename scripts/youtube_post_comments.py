#!/usr/bin/env python3
"""Post top-level comments on public YouTube videos for a configured channel.

Checks existing top-level comments first so videos that already have a comment
from the channel owner are skipped. Requires youtube.force-ssl OAuth scope.
Note: YouTube Data API v3 does not expose an endpoint to pin comments; pinning
must be done in YouTube Studio after posting.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

from googleapiclient.discovery import build

from youtube_multi_channel import ROOT, YT_SCOPES, credentials, read_target, resolve_channel

YT_COMMENT_SCOPES = [*YT_SCOPES, "https://www.googleapis.com/auth/youtube.force-ssl"]


def list_public_videos(yt, channel_id: str, max_results: int = 50) -> list[dict]:
    """Return public videos from the channel's uploads playlist."""
    ch = yt.channels().list(part="contentDetails", id=channel_id).execute()
    items = ch.get("items", [])
    if not items:
        return []
    uploads_id = items[0]["contentDetails"]["relatedPlaylists"]["uploads"]
    pl = yt.playlistItems().list(part="contentDetails", playlistId=uploads_id, maxResults=max_results).execute()
    vids = [it["contentDetails"]["videoId"] for it in pl.get("items", [])]
    if not vids:
        return []
    det = yt.videos().list(part="snippet,status", id=",".join(vids)).execute()
    return [
        {"video_id": v["id"], "title": v["snippet"]["title"]}
        for v in det.get("items", [])
        if v.get("status", {}).get("privacyStatus") == "public"
    ]


def owner_has_comment(yt, video_id: str, channel_id: str) -> bool:
    """Return True if the channel owner already has a top-level comment on video_id."""
    res = yt.commentThreads().list(part="snippet", videoId=video_id, maxResults=50).execute()
    for item in res.get("items", []):
        author_id = item["snippet"]["topLevelComment"]["snippet"].get("authorChannelId", {}).get("value")
        if author_id == channel_id:
            return True
    return False


def post_comment(yt, video_id: str, text: str) -> dict:
    """Insert a top-level comment on video_id and return the created thread metadata."""
    body = {
        "snippet": {
            "videoId": video_id,
            "topLevelComment": {"snippet": {"textOriginal": text}},
        }
    }
    created = yt.commentThreads().insert(part="snippet", body=body).execute()
    return {"comment_id": created.get("id"), "video_id": video_id}


def run_comments(yt, channel_id: str, comments_map: dict[str, str], execute: bool = False) -> list[dict]:
    """Check public videos and post missing owner comments (or preview in dry-run)."""
    results = []
    for video in list_public_videos(yt, channel_id):
        vid = video["video_id"]
        text = comments_map.get(vid)
        if not text:
            results.append({"video_id": vid, "title": video["title"], "status": "skipped_no_template"})
            continue
        if owner_has_comment(yt, vid, channel_id):
            results.append({"video_id": vid, "title": video["title"], "status": "already_has_owner_comment"})
            continue
        if not execute:
            results.append({"video_id": vid, "title": video["title"], "status": "dry_run_would_post", "comment": text})
            continue
        posted = post_comment(yt, vid, text)
        results.append({"video_id": vid, "title": video["title"], "status": "posted", "comment_id": posted["comment_id"]})
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--channel", required=True, help="Channel key in config/youtube-channel-targets.json")
    parser.add_argument("--comments-file", required=True, help="JSON mapping {video_id: comment_text}")
    parser.add_argument("--execute", action="store_true", help="Actually post comments (default is dry-run)")
    args = parser.parse_args()

    target = read_target(ROOT / "config" / "youtube-channel-targets.json", args.channel)
    yt_refresh = os.environ.get("YOUTUBE_REFRESH_TOKEN", "").strip()
    if not yt_refresh:
        raise RuntimeError("YOUTUBE_REFRESH_TOKEN is required")

    yt = build("youtube", "v3", credentials=credentials(YT_COMMENT_SCOPES, yt_refresh), cache_discovery=False)
    actual = resolve_channel(yt, target)
    comments_map = json.loads(Path(args.comments_file).read_text(encoding="utf-8"))
    results = run_comments(yt, actual["id"], comments_map, execute=args.execute)
    print(json.dumps({"channel_id": actual["id"], "handle": target["handle"], "results": results}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(json.dumps({"status": "blocked", "error": f"{type(exc).__name__}: {exc}"}), file=sys.stderr)
        raise SystemExit(1)
