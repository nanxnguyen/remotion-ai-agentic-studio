#!/usr/bin/env python3
"""Local technical QA of a real Shorts MP4. NOT a substitute for human watching/listening.

Examples:
  python3 verify_shorts.py --video video-review-V2.mp4 --full-decode
  python3 verify_shorts.py --video video-review-V2.mp4 --manifest production-manifest-V2.json

Requires FFprobe; --full-decode requires FFmpeg. Stdlib only.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import re
import shutil
import subprocess
import sys
from pathlib import Path


def probe_video(video: Path) -> dict:
    if not video.is_file() or video.stat().st_size < 100_000:
        raise ValueError("Not a nonempty playable MP4 >=100KB")
    if not shutil.which("ffprobe"):
        raise RuntimeError("ffprobe is unavailable; technical media QA NOT DONE")
    res = subprocess.run([
        "ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(video)
    ], capture_output=True, text=True, check=True)
    data = json.loads(res.stdout)
    if "format" not in data or not data.get("streams"):
        raise ValueError("ffprobe returned no usable container/streams")
    return data


def check_video(data: dict, *, min_seconds=15.0, max_seconds=180.0) -> list[str]:
    v = next((x for x in data.get("streams", []) if x.get("codec_type") == "video"), None)
    a = next((x for x in data.get("streams", []) if x.get("codec_type") == "audio"), None)
    issues = []
    if v is None:
        issues.append("Missing video stream")
    if a is None:
        issues.append("Missing audio stream")
    if v:
        if v.get("codec_name") != "h264":
            issues.append("Expected H264")
        if int(v.get("width", 0)) != 1080 or int(v.get("height", 0)) != 1920:
            issues.append("Expected 1080x1920 vertical")
        if v.get("pix_fmt") != "yuv420p":
            issues.append("Expected yuv420p pixel format")
        fps = v.get("avg_frame_rate", v.get("r_frame_rate", "0/1"))
        try:
            n, d = fps.split("/")
            rate = float(n) / float(d)
        except (ValueError, ZeroDivisionError):
            rate = 0.0
        if not (abs(rate - 30) < 0.02 or abs(rate - 60) < 0.02):
            issues.append(f"Expected 30 or 60 FPS; received {fps}")
    if a:
        if a.get("codec_name") != "aac":
            issues.append("Expected AAC audio")
        if int(a.get("sample_rate", 0)) != 48000:
            issues.append("Expected 48000 Hz audio")
        if int(a.get("channels", 0)) != 2:
            issues.append("Expected stereo audio")
    duration = float(data.get("format", {}).get("duration", 0) or 0)
    if not (min_seconds <= duration <= max_seconds):
        issues.append(f"Unexpected duration: {duration:.3f}s")
    return issues


def check_manifest(data: dict, manifest: dict) -> list[str]:
    issues = []
    if manifest.get("status") == "FINAL" and not manifest.get("human_signoff", False):
        issues.append("FINAL without human_signoff=true")
    dur = manifest.get("duration_seconds_actual")
    if dur is not None:
        try:
            actual = float(data["format"]["duration"])
            if abs(float(dur) - actual) > 0.1:
                issues.append(f"Manifest duration mismatch {dur} vs {actual:.3f}s")
        except (ValueError, TypeError, KeyError):
            issues.append("Manifest duration malformed")
    return issues


def digest(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def full_decode(video: Path) -> None:
    if not shutil.which("ffmpeg"):
        raise RuntimeError("ffmpeg unavailable; full decode NOT DONE")
    subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-xerror", "-i", str(video),
                    "-map", "0:v:0", "-map", "0:a:0", "-f", "null", "-"],
                   check=True, capture_output=True, text=True)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--video", required=True, type=Path)
    ap.add_argument("--manifest", type=Path)
    ap.add_argument("--full-decode", action="store_true")
    args = ap.parse_args()
    result = {"status": "NOT_CHECKED", "video": str(args.video), "issues": [],
              "scope": "technical_only; no claim of human audio, sync, originality, rights or YPP approval"}
    try:
        meta = probe_video(args.video)
        result["issues"].extend(check_video(meta))
        result["duration_seconds"] = float(meta.get("format", {}).get("duration", 0))
        result["bytes"] = args.video.stat().st_size
        result["sha256"] = digest(args.video)
        if args.manifest:
            manifest = json.loads(args.manifest.read_text(encoding="utf-8"))
            result["issues"].extend(check_manifest(meta, manifest))
        if args.full_decode:
            full_decode(args.video)
            result["full_decode"] = "PASS"
        else:
            result["full_decode"] = "NOT_CHECKED"
        result["status"] = "PASS_TECHNICAL_ONLY" if not result["issues"] else "FAIL"
    except (FileNotFoundError, ValueError, RuntimeError, subprocess.CalledProcessError, json.JSONDecodeError) as err:
        result["issues"].append(str(err))
        result["status"] = "FAIL"
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0 if result["status"] == "PASS_TECHNICAL_ONLY" else 1


if __name__ == "__main__":
    sys.exit(main())
