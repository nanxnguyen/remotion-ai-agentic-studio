#!/usr/bin/env python3
"""Technical MP4 QA: AV streams, dimensions, duration and original-video packet hash."""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys


def probe(path: Path) -> dict:
    p = subprocess.run(
        ["ffprobe", "-v", "error", "-show_streams", "-show_format", "-print_format", "json", str(path)],
        text=True, capture_output=True, check=True,
    )
    return json.loads(p.stdout)


def video_packet_md5(path: Path) -> str:
    # Hash encoded video packets in demuxed order. Copy codec should preserve these bytes.
    p = subprocess.run(
        ["ffmpeg", "-loglevel", "error", "-i", str(path), "-map", "0:v:0", "-c:v", "copy", "-f", "md5", "-"],
        capture_output=True, check=True,
    )
    return p.stdout.decode("ascii").strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", type=Path, required=True)
    ap.add_argument("--original", type=Path)
    ap.add_argument("--must-have-audio", action="store_true")
    args = ap.parse_args()
    info = probe(args.video)
    streams = info["streams"]
    v = [s for s in streams if s["codec_type"] == "video"]
    a = [s for s in streams if s["codec_type"] == "audio"]
    if not v or (args.must_have_audio and not a):
        raise SystemExit("FAILED: expected video and audible-track stream")
    result = {
        "path": str(args.video), "width": v[0].get("width"), "height": v[0].get("height"),
        "fps": v[0].get("avg_frame_rate"), "duration_seconds": float(info["format"]["duration"]),
        "video_codec": v[0].get("codec_name"), "audio_codec": a[0].get("codec_name") if a else None,
        "sha256": hashlib.sha256(args.video.read_bytes()).hexdigest(),
    }
    if args.original:
        orig = probe(args.original)
        video_orig = next(s for s in orig["streams"] if s["codec_type"] == "video")
        if v[0].get("width") != video_orig.get("width") or v[0].get("height") != video_orig.get("height"):
            raise SystemExit("FAILED: geometry changed")
        if abs(float(orig["format"]["duration"]) - result["duration_seconds"]) > 0.12:
            raise SystemExit("FAILED: duration changed unexpectedly")
        result["original_video_packet_md5"] = video_packet_md5(args.original)
        result["result_video_packet_md5"] = video_packet_md5(args.video)
        result["video_packets_identical"] = result["original_video_packet_md5"] == result["result_video_packet_md5"]
        if not result["video_packets_identical"]:
            raise SystemExit("FAILED: visual video stream differs from original")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print("Technical checks passed. Human listening/visual inspection remains separate QA.")


if __name__ == "__main__":
    main()
