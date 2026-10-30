#!/usr/bin/env python3
"""Fail closed until 22 genuine independent video clips and 22 Vbee MP3s are staged.

Usage:
    python3 scripts/verify-giay61-v2-media.py --root public/giay-thu-61-v2

This is a preflight gate, not an acting/continuity/visual-quality certification.
"""
import argparse
import json
import subprocess
from pathlib import Path

SHOT_SECONDS = [3, 6, 5, 6, 7, 6, 7, 6, 6, 7, 7, 6, 6, 6, 7, 7, 7, 7, 6, 6, 6, 5]
assert sum(SHOT_SECONDS) == 135

def probe(path):
    process = subprocess.run(
        ["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(path)],
        capture_output=True, text=True, check=True,
    )
    return json.loads(process.stdout)

def verify(root):
    failures = []
    for i, expected in enumerate(SHOT_SECONDS, 1):
        video = root / "clips" / f"shot-{i:02d}.mp4"
        voice = root / "voice" / f"s{i}.mp3"
        if not video.is_file() or video.stat().st_size < 1024:
            failures.append(f"shot {i:02d}: missing genuine independent video {video}")
        else:
            try:
                data = probe(video)
                stream = next(s for s in data["streams"] if s["codec_type"] == "video")
                w, h = int(stream["width"]), int(stream["height"])
                duration = float(data["format"]["duration"])
                if (w, h) != (1920, 1080):
                    failures.append(f"shot {i:02d}: required 1920x1080, got {w}x{h}")
                if duration < expected + (0.5 if i < 22 else 0):
                    failures.append(f"shot {i:02d}: clip {duration:.3f}s too short for {expected}s + fade tail")
            except Exception as exc:
                failures.append(f"shot {i:02d}: ffprobe failed: {exc}")
        if not voice.is_file() or voice.stat().st_size < 1024:
            failures.append(f"shot {i:02d}: missing genuine Vbee {voice}")
        else:
            try:
                duration = float(probe(voice)["format"]["duration"])
                if duration > expected + 0.05:
                    failures.append(f"shot {i:02d}: voice {duration:.3f}s exceeds {expected}s")
            except Exception as exc:
                failures.append(f"shot {i:02d}: Vbee probe failed: {exc}")
    if failures:
        print("MEDIA GATE: BLOCKED (" + str(len(failures)) + " errors)")
        for failure in failures:
            print(" - " + failure)
        return 1
    print("MEDIA GATE: 22 clips + 22 voices present and technically conformant.")
    print("Still required: SHA voice check, picture continuity, action evidence, Remotion render, full visual/audio QA.")
    return 0

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("public/giay-thu-61-v2"))
    args = parser.parse_args()
    raise SystemExit(verify(args.root))
