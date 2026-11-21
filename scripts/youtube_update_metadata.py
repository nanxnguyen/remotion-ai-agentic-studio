#!/usr/bin/env python3
"""Update title/description/tags for existing PRIVATE YouTube videos on a verified channel."""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
from googleapiclient.discovery import build

from youtube_multi_channel import ROOT, credentials, read_target, resolve_channel

YT_SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube.force-ssl",
]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--channel", required=True)
    ap.add_argument("--items-json", required=True)
    ap.add_argument("--receipt", required=True)
    args = ap.parse_args()

    target = read_target(ROOT / "config/youtube-channel-targets.json", args.channel)
    yt = build("youtube", "v3", credentials=credentials(YT_SCOPES, os.environ.get("YOUTUBE_REFRESH_TOKEN", "")))
    authorized = resolve_channel(yt, target)

    items = json.loads(Path(args.items_json).read_text(encoding="utf-8"))
    results = []
    for item in items:
        vid = item["video_id"]
        meta = json.loads((ROOT / item["metadata_path"]).read_text(encoding="utf-8"))
        cur = yt.videos().list(part="snippet,status", id=vid).execute().get("items", [])
        if len(cur) != 1:
            raise RuntimeError(f"Video {vid} not found")
        v = cur[0]
        if v["status"]["privacyStatus"] != "private":
            raise RuntimeError(f"Refusing to update non-private video {vid}")
        snippet = v["snippet"]
        snippet["title"] = meta["title"]
        snippet["description"] = meta["description"]
        snippet["tags"] = meta.get("tags", [])
        snippet["defaultLanguage"] = meta.get("language", "vi")
        snippet["defaultAudioLanguage"] = meta.get("language", "vi")
        updated = yt.videos().update(part="snippet", body={"id": vid, "snippet": snippet}).execute()
        results.append({
            "video_id": vid,
            "title": updated["snippet"]["title"],
            "privacy": v["status"]["privacyStatus"],
        })

    Path(args.receipt).write_text(
        json.dumps({"channel_id": authorized["id"], "updated": results}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Updated {len(results)} videos on {authorized['id']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
