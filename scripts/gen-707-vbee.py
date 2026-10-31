#!/usr/bin/env python3
"""Generate actual Vbee audio for Room 404 and measure it; never use fallback voices.

The Vbee realtime (sync) endpoint requires a plan feature this account does not have.
The documented batch (async) API is used, with polling of request status.
Secrets are supplied by GitHub Actions environment at runtime, not stored in Git.
"""
import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://api.vbee.vn/v1/tts"
DEFAULT_VOICE = "hn_male_phuthang_stor_24k-stl"  # Vbee Anh Khoi storytelling
WEBHOOK = "https://example.com/room404-vbee-callback"  # required by API; result is polled, not awaited via webhook

def env_secret(*names):
    return next((os.environ[k] for k in names if os.environ.get(k)), None)

def credentials():
    token = env_secret("VBEE_ACCESS_TOKEN", "VBEE_TOKEN", "VBEE_API_KEY", "VBEE_API_TOKEN")
    app_id = env_secret("VBEE_APP_ID", "VBEE_APPID", "VBEE_APPLICATION_ID")
    if not token or not app_id:
        raise RuntimeError("Vbee token/App ID missing from GitHub Actions runtime")
    return token, app_id

def request_json(request):
    try:
        with urllib.request.urlopen(request, timeout=90) as response:
            body = response.read(32768)
    except urllib.error.HTTPError as exc:
        errcode, msg = "UNKNOWN", ""
        try:
            payload = json.loads(exc.read(2048).decode("utf-8", errors="replace"))
            err = payload.get("error") or {}
            errcode = str(err.get("code", payload.get("error_code", "UNKNOWN")))[:60]
            msg = str(err.get("message", payload.get("error_message", "")))[:220]
            token, app_id = credentials()
            msg = msg.replace(token, "[REDACTED]").replace(app_id, "[REDACTED]")
        except (ValueError, TypeError, AttributeError):
            pass
        raise RuntimeError(f"Vbee HTTP {exc.code}: {errcode}: {msg}") from None
    try:
        return json.loads(body)
    except ValueError:
        raise RuntimeError("Vbee returned a non-JSON batch response") from None

def headers():
    token, app_id = credentials()
    return {"Authorization": f"Bearer {token}", "App-Id": app_id, "Content-Type": "application/json"}

def read_duration(path):
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        capture_output=True, text=True, check=True)
    return float(result.stdout.strip())

def generate_async(text, voice_code, speed, dest, webhook_url):
    if not 1 <= len(text) <= 100000:
        raise ValueError("Vbee batch TTS requires nonempty text <= 100000 chars")
    data = json.dumps({
        "text": text, "voiceCode": voice_code,
        "mode": "async", "webhookUrl": webhook_url,
        "outputFormat": "mp3", "bitrate": 128, "speed": speed
    }, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(API, data=data, headers=headers(), method="POST")
    status = request_json(req)
    if not isinstance(status, dict):
        raise RuntimeError("Unexpected Vbee batch submit response")
    rid = status.get("requestId") or (status.get("result") or {}).get("request_id")
    if not rid or not isinstance(rid, str):
        raise RuntimeError(f"Vbee batch response lacked request ID; status={status.get('status','UNKNOWN')}")
    print("Submitted Vbee async request; polling completion...", flush=True)

    url = f"{API}/requests/{urllib.parse.quote(rid, safe='')}"
    for n in range(75):  # max 5 minutes per shot
        time.sleep(4)
        result = request_json(urllib.request.Request(url, headers=headers()))
        state = str(result.get("status", "")).upper()
        if state in ("FAILED", "ERROR", "FAILURE"):
            raise RuntimeError(f"Vbee job failed, status={state}; check voice/credits")
        audio_url = result.get("audioLink") or result.get("audio_link")
        if state == "COMPLETED" and audio_url:
            parsed = urllib.parse.urlparse(audio_url)
            if parsed.scheme != "https":
                raise RuntimeError("Vbee audioLink requires HTTPS")
            with urllib.request.urlopen(audio_url, timeout=90) as response:
                mp3 = response.read(15_000_000)
            if len(mp3) < 200 or not (
                mp3.startswith(b"ID3") or
                (mp3[0] == 255 and (mp3[1] & 224) == 224)
            ):
                raise RuntimeError("Vbee audioLink did not contain MP3 binary")
            temp = dest.with_suffix(".tmp")
            temp.write_bytes(mp3)
            temp.replace(dest)
            return
    raise RuntimeError("Vbee request still pending after 5 minutes")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--timeline", type=Path, default=Path("docs/don-hang-707/voice-lines.json"))
    ap.add_argument("--out-dir", type=Path, default=Path("public/audio/don-hang-707"))
    ap.add_argument("--voice-code", default=os.environ.get("VBEE_VOICE_CODE", DEFAULT_VOICE))
    ap.add_argument("--speed", type=float, default=0.98)
    ap.add_argument("--webhook-url", default=os.environ.get("VBEE_WEBHOOK_URL", WEBHOOK))
    ap.add_argument("--limit", type=int, default=0, help="Generate only first N scenes for a non-destructive capability test")
    ap.add_argument("--only-scene", type=int, default=0, help="Regenerate one scene (1-indexed), leaving other audio untouched")
    args = ap.parse_args()
    if not (0.25 <= args.speed <= 1.9):
        ap.error("Speed must be between 0.25 and 1.9")
    if not args.webhook_url.startswith("https://"):
        ap.error("webhook URL must be HTTPS")
    all_scenes = json.loads(args.timeline.read_text(encoding="utf-8"))
    scenes = all_scenes[:args.limit] if args.limit else all_scenes
    if args.only_scene:
        scenes = [s for s in all_scenes if int(s.get("id", 0)) == args.only_scene]
        if len(scenes) != 1:
            ap.error("Invalid --only-scene; no matching scene")
    args.out_dir.mkdir(parents=True, exist_ok=True)
    timeline = []
    for scene in scenes:
        i = int(scene["id"])
        dest = args.out_dir / f"s{i}.mp3"
        generate_async(scene["narration"], args.voice_code, args.speed, dest, args.webhook_url)
        duration = read_duration(dest)
        if not math.isfinite(duration) or duration < 0.3:
            raise RuntimeError(f"Scene {i}: invalid duration")
        timeline.append({
            "id": i, "audio_file": dest.name, "text": scene["narration"],
            "voice_code": args.voice_code, "audio_seconds": round(duration, 3),
            "visual_start_seconds": round(float(scene.get("start", (i-1)*5.5)), 3),
            "sha256": hashlib.sha256(dest.read_bytes()).hexdigest()
        })
        print(f"Vbee clip s{i}.mp3: {duration:.2f}s", flush=True)
    (args.out_dir/"measured-timeline.json").write_text(
        json.dumps(timeline, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"PRODUCED: {len(timeline)} actual Vbee audio clips.", flush=True)

if __name__ == "__main__":
    main()
