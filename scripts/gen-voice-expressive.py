#!/usr/bin/env python3
"""Expressive edge-tts voice: per-phrase rate/pitch/volume + ffmpeg-inserted silences, one mp3 per shot.

Usage: python3 -I scripts/gen-voice-expressive.py <video_id> [--json FILE] [--out-dir DIR]
                                                  [--voice V] [--post] [--force]
  --json     default docs/<video_id>/voice-expressive.json
  --out-dir  default public/audio/<video_id>  (use a lab folder to avoid touching public/)
  --post     light ffmpeg polish: warm EQ, gentle compression, very light reverb, loudnorm
  --rate-shift N   add N percentage points to every phrase's rate (e.g. 6 = faster) to fit the timeline
  --pause-scale X  multiply every pause_before/pause_after by X (e.g. 0.6 = tighter)
  --pitch-scale X / --pitch-shift N  pitch' = X*pitch + N Hz (widen or recentre intonation spread)
  --vol-scale X    multiply every volume offset by X
  --force    overwrite existing sN.mp3 (otherwise kept, so hand-made Vbee/ElevenLabs clips survive)

JSON: {"s1": [{"t": "câu 1", "rate": "-8%", "pitch": "-4Hz", "vol": "+0%",
               "pause_before": 0.0, "pause_after": 0.45}, ...], ...}
Every field except "t" is optional (defaults: +0% / +0Hz / +0% / 0 / 0.3). A plain string is one default phrase.
The last phrase's pause_after is ignored so the clip ends on speech (same as gen-voice.py).
Requires: pip3 install edge-tts; ffmpeg + ffprobe on PATH. Prints seconds + from/duration like gen-voice.py.
"""
import asyncio
import json
import math
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import edge_tts

argv = sys.argv[1:]


def opt(name: str, default=None):
    if name in argv:
        i = argv.index(name)
        v = argv[i + 1]
        del argv[i : i + 2]
        return v
    return default


def flag(name: str) -> bool:
    if name in argv:
        argv.remove(name)
        return True
    return False


force, post = flag("--force"), flag("--post")
json_arg, out_arg = opt("--json"), opt("--out-dir")
rate_shift, pause_scale = int(opt("--rate-shift", 0)), float(opt("--pause-scale", 1))
pitch_scale, pitch_shift, vol_scale = float(opt("--pitch-scale", 1)), float(opt("--pitch-shift", 0)), float(opt("--vol-scale", 1))
voice = opt("--voice", "vi-VN-HoaiMyNeural")
vid = argv[0]
root = Path(__file__).resolve().parent.parent
lines = json.loads(Path(json_arg or root / "docs" / vid / "voice-expressive.json").read_text(encoding="utf-8"))
out = Path(out_arg) if out_arg else root / "public" / "audio" / vid
out.mkdir(parents=True, exist_ok=True)

# edge-tts accepts only these exact shapes; fail early instead of getting NoAudioReceived 8 times.
FMT = {"rate": r"[+-]\d+%", "pitch": r"[+-]\d+Hz", "vol": r"[+-]\d+%"}
TRIM = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse"
POST = (
    "highpass=f=70,equalizer=f=180:t=q:w=1:g=2,equalizer=f=5000:t=q:w=1.5:g=-2,"
    "acompressor=threshold=-22dB:ratio=2.5:attack=15:release=200,"
    "aecho=0.8:0.88:45:0.10,loudnorm=I=-16:TP=-1.5:LRA=9"
)


def clean(t: str) -> str:
    # Curly quotes and the ellipsis character make edge-tts return NoAudioReceived.
    for a, b in (("“", ""), ("”", ""), ("‘", ""), ("’", ""), ('"', ""), ("…", "...")):
        t = t.replace(a, b)
    return t


def norm(seg) -> dict:
    s = {"t": seg} if isinstance(seg, str) else dict(seg)
    s.setdefault("rate", "+0%"), s.setdefault("pitch", "+0Hz"), s.setdefault("vol", "+0%")
    s.setdefault("pause_before", 0.0), s.setdefault("pause_after", 0.3)
    s["rate"] = f"{int(s['rate'][:-1]) + rate_shift:+d}%"
    s["pitch"] = f"{round(int(s['pitch'][:-2]) * pitch_scale + pitch_shift):+d}Hz"
    s["vol"] = f"{round(int(s['vol'][:-1]) * vol_scale):+d}%"
    s["pause_before"], s["pause_after"] = s["pause_before"] * pause_scale, s["pause_after"] * pause_scale
    for k, pat in FMT.items():
        if not re.fullmatch(pat, s[k]):
            raise SystemExit(f"bad {k}={s[k]!r} in {s['t']!r} (expected like {pat})")
    return s


async def tts(seg: dict, dest: Path) -> None:
    for n in range(12):  # service is flaky (NoAudioReceived etc.); retry with backoff
        try:
            await edge_tts.Communicate(
                clean(seg["t"]), voice, rate=seg["rate"], pitch=seg["pitch"], volume=seg["vol"]
            ).save(str(dest))
            if dest.exists() and dest.stat().st_size > 0:
                return
        except Exception:
            pass
        dest.unlink(missing_ok=True)  # drop empty/partial file
        await asyncio.sleep(1.5 + n)
    raise SystemExit(f"FAILED: {seg['t'][:40]!r}")


def ff(*a: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", *a], check=True)


def seconds(p: Path) -> float:
    r = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
        capture_output=True, text=True, check=True,
    )
    return float(r.stdout)


async def build(key: str, segs: list, dest: Path) -> None:
    segs = [norm(s) for s in segs]
    segs[-1]["pause_after"] = 0.0
    with tempfile.TemporaryDirectory() as td:
        tmp, parts = Path(td), []
        for i, s in enumerate(segs):
            raw, wav = tmp / f"{i}.mp3", tmp / f"{i}.wav"
            await tts(s, raw)
            # edge-tts bakes ~0.2s of silence at both ends of every clip; trim it so pause_* is the real gap.
            # Then pad -> mono 24 kHz wav, trivially concat-safe.
            ff("-i", str(raw), "-af",
               f"{TRIM},adelay={int(s['pause_before'] * 1000)}:all=1,apad=pad_dur={s['pause_after']}",
               "-ar", "24000", "-ac", "1", str(wav))
            parts.append(wav)
        lst = tmp / "list.txt"
        lst.write_text("".join(f"file '{p}'\n" for p in parts))
        joined = tmp / "joined.wav"
        ff("-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", str(joined))
        ff("-i", str(joined), *(["-af", POST] if post else []), "-ar", "24000", "-ac", "1",
           "-c:a", "libmp3lame", "-b:a", "64k", str(dest))


async def main() -> None:
    for k, segs in lines.items():
        f = out / f"{k}.mp3"
        if force or not f.exists() or f.stat().st_size == 0:
            await build(k, segs if isinstance(segs, list) else [segs], f)
    start, keys = 0, list(lines)
    for i, k in enumerate(keys):
        d = seconds(out / f"{k}.mp3")
        frames = math.ceil((d + (1.4 if i == len(keys) - 1 else 0.5)) * 30)
        print(f"{k}: {d:.2f}s  from={start}  duration={frames}")
        start += frames
    print(f"TOTAL frames={start}  seconds={start / 30:.1f}")


asyncio.run(main())
