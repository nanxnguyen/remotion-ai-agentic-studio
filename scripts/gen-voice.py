#!/usr/bin/env python3
"""Generate one Vietnamese TTS mp3 per shot and print measured durations.

Usage: python3 -I scripts/gen-voice.py <video_id> [voice] [rate] [--force]
Existing public/audio/<video_id>/sN.mp3 (e.g. clips made with a preferred Vbee/ElevenLabs voice) are kept unless --force.
Reads docs/<video_id>/voice.json  ({"s1": "text", "s2": "text", ...})
Writes public/audio/<video_id>/sN.mp3, then prints seconds and a suggested frame count.
Requires: pip3 install edge-tts, and ffprobe on PATH.
"""
import asyncio
import json
import math
import subprocess
import sys
from pathlib import Path

import edge_tts

force = "--force" in sys.argv
args = [a for a in sys.argv[1:] if a != "--force"]
vid = args[0]
voice = args[1] if len(args) > 1 else "vi-VN-HoaiMyNeural"
rate = args[2] if len(args) > 2 else "+4%"
root = Path(__file__).resolve().parent.parent
lines = json.loads((root / "docs" / vid / "voice.json").read_text(encoding="utf-8"))
out = root / "public" / "audio" / vid
out.mkdir(parents=True, exist_ok=True)


def clean(t: str) -> str:
    # Curly quotes and the ellipsis character make edge-tts return NoAudioReceived.
    return t.replace("“", "").replace("”", "").replace('"', "").replace("…", "...")


async def one(key: str, text: str) -> None:
    for _ in range(8):  # service is flaky; retry
        try:
            await edge_tts.Communicate(clean(text), voice, rate=rate).save(str(out / f"{key}.mp3"))
            return
        except Exception:
            (out / f"{key}.mp3").unlink(missing_ok=True)  # drop partial file so it is not mistaken for a kept clip
            await asyncio.sleep(1.5)
    raise SystemExit(f"FAILED: {key}")


def seconds(p: Path) -> float:
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
        capture_output=True, text=True, check=True,
    )
    return float(r.stdout)


async def main() -> None:
    for k, t in lines.items():
        f = out / f"{k}.mp3"
        if force or not f.exists() or f.stat().st_size == 0:
            await one(k, t)
    start = 0
    keys = list(lines)
    for i, k in enumerate(keys):
        d = seconds(out / f"{k}.mp3")
        frames = math.ceil((d + (1.4 if i == len(keys) - 1 else 0.5)) * 30)
        print(f"{k}: {d:.2f}s  from={start}  duration={frames}")
        start += frames
    print(f"TOTAL frames={start}  seconds={start / 30:.1f}")


asyncio.run(main())
