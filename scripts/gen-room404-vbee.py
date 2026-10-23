#!/usr/bin/env python3
"""Generate genuine Vbee TTS MP3 per Room 404 scene.

Uses GitHub Actions secrets at runtime; never persists or logs credentials.
Speech duration is measured using ffprobe; no silent TTS fallback.
"""
import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import subprocess
import urllib.error
import urllib.request

API_URL = "https://api.vbee.vn/v1/tts"
DEFAULT_VOICE = "hn_female_ngochuyen_full_48k-fhg"

def secret(*names):
    return next((os.environ[name] for name in names if os.environ.get(name)), None)

def seconds(path):
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(result.stdout.strip())

def vbee_tts(text, voice_code, speed, destination):
    token = secret("VBEE_ACCESS_TOKEN", "VBEE_TOKEN", "VBEE_API_KEY", "VBEE_API_TOKEN")
    app_id = secret("VBEE_APP_ID", "VBEE_APPID", "VBEE_APPLICATION_ID")
    if not token or not app_id:
        raise RuntimeError(
            "Vbee credentials missing in Actions runtime. Required: Vbee bearer token "
            "and Vbee App ID. Check workflow's secret-name mapping (not token values)."
        )
    if not (1 <= len(text) <= 300):
        raise ValueError("Vbee realtime TTS requires 1–300 characters per request")
    payload = json.dumps({
        "text": text,
        "voiceCode": voice_code,
        "outputFormat": "mp3",
        "bitrate": 128,
        "speed": speed,
        "mode": "sync",
    }, ensure_ascii=False).encode("utf-8")
    request = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {token}",
            "App-Id": app_id,
            "Content-Type": "application/json",
            "Accept": "audio/mpeg",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            content_type = response.headers.get("Content-Type", "").lower()
            audio = response.read()
    except urllib.error.HTTPError as exc:
        raise RuntimeError(
            f"Vbee TTS HTTP {exc.code}: check token/App ID, credits and realtime voice compatibility"
        ) from None
    if ("json" in content_type or len(audio) < 200 or
        not (audio.startswith(b"ID3") or
             (audio[0] == 255 and audio[1] & 224 == 224))):
        raise RuntimeError("Vbee did not return a valid MP3 audio payload")
    temp = destination.with_suffix(".tmp")
    temp.write_bytes(audio)
    temp.replace(destination)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--timeline", type=Path, default=Path("docs/room404-vbee/timeline.json"))
    parser.add_argument("--out-dir", type=Path, default=Path("public/audio/room404-vbee"))
    parser.add_argument("--voice-code", default=os.environ.get("VBEE_VOICE_CODE", DEFAULT_VOICE))
    parser.add_argument("--speed", type=float, default=0.96)
    args = parser.parse_args()
    if not (0.25 <= args.speed <= 1.9):
        parser.error("--speed must be in [0.25, 1.9]")
    scenes = json.loads(args.timeline.read_text(encoding="utf-8"))
    args.out_dir.mkdir(parents=True, exist_ok=True)
    timeline = []
    frame_cursor = 0
    for i, scene in enumerate(scenes, 1):
        destination = args.out_dir / f"s{i}.mp3"
        vbee_tts(scene["narration"], args.voice_code, args.speed, destination)
        voice_seconds = seconds(destination)
        if not math.isfinite(voice_seconds) or voice_seconds <= 0.2:
            raise RuntimeError(f"Invalid Vbee MP3 duration for scene {i}")
        duration_frames = max(int(scene.get("duration", 132)), math.ceil((voice_seconds + 0.5) * 24))
        timeline.append({
            "id": i,
            "audio_file": destination.name,
            "text": scene["narration"],
            "voice_code": args.voice_code,
            "audio_seconds": round(voice_seconds, 3),
            "from_frame": frame_cursor,
            "duration_frames": duration_frames,
            "sha256": hashlib.sha256(destination.read_bytes()).hexdigest(),
        })
        frame_cursor += duration_frames
        print(f"Scene {i:02}: {voice_seconds:.2f}s voice, {duration_frames / 24:.2f}s picture")
    report = args.out_dir / "measured-timeline.json"
    report.write_text(json.dumps(timeline, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Vbee narration generated: {len(timeline)} scenes, {frame_cursor/24:.2f}s total.")
    print("Voice provider: Vbee realtime API; no fallback voice.")

if __name__ == "__main__":
    main()
