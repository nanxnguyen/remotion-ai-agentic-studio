#!/usr/bin/env python3
"""Create per-scene real Vbee MP3s through Vbee Batch API.

Usage:
  python generate_vbee_batch.py --manifest storyboard.json --out-dir public/audio/my-film
  python generate_vbee_batch.py --manifest storyboard.json --out-dir public/audio/my-film --only-scene 7

Requires FFprobe + env VBEE_ACCESS_TOKEN (or VBEE_TOKEN/API_KEY/API_TOKEN),
VBEE_APP_ID (or VBEE_APPID/APPLICATION_ID), VBEE_WEBHOOK_URL (valid HTTPS URL).
Credentials are never persisted/logged. No TTS fallback, and no automatic paid retries.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import subprocess
import time
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen

API = "https://api.vbee.vn/v1/tts"
DEFAULT_VOICE = "hn_male_phuthang_stor_24k-stl"


def first_env(*keys: str) -> str | None:
    return next((os.getenv(key) for key in keys if os.getenv(key)), None)


def credentials() -> tuple[str, str]:
    token = first_env("VBEE_ACCESS_TOKEN", "VBEE_TOKEN", "VBEE_API_KEY", "VBEE_API_TOKEN")
    app_id = first_env("VBEE_APP_ID", "VBEE_APPID", "VBEE_APPLICATION_ID")
    if not token or not app_id:
        raise RuntimeError("Missing Vbee token or App ID in runner environment")
    return token, app_id


def headers() -> dict[str, str]:
    token, app_id = credentials()
    return {
        "Authorization": f"Bearer {token}",
        "App-Id": app_id,
        "Content-Type": "application/json",
    }


def json_request(req: Request) -> dict:
    try:
        with urlopen(req, timeout=90) as response:
            raw = response.read(65536)
    except HTTPError as exc:
        code, message = "UNKNOWN", ""
        try:
            details = json.loads(exc.read(2048).decode("utf-8", errors="replace"))
            error = details.get("error", {})
            code = str(error.get("code", details.get("error_code", "UNKNOWN")))[:60]
            message = str(error.get("message", details.get("error_message", "")))[:250]
            for secret in credentials():
                message = message.replace(secret, "[REDACTED]")
        except (ValueError, TypeError, AttributeError):
            pass
        raise RuntimeError(f"Vbee HTTP {exc.code}: {code}: {message}") from None
    except URLError as exc:
        raise RuntimeError(f"Vbee network failure: {type(exc.reason).__name__}") from None
    try:
        result = json.loads(raw)
    except json.JSONDecodeError:
        raise RuntimeError("Vbee batch endpoint did not return JSON") from None
    if not isinstance(result, dict):
        raise RuntimeError("Invalid Vbee API response")
    return result


def media_duration(path: Path) -> float:
    res = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
        check=True, text=True, capture_output=True,
    )
    duration = float(res.stdout.strip())
    if not math.isfinite(duration) or duration <= 0.1:
        raise RuntimeError(f"Bad audio duration: {path.name}")
    return duration


def synthesize(text: str, dest: Path, voice: str, speed: float, webhook: str) -> str:
    if not text.strip() or len(text) > 100000:
        raise ValueError("Vbee batch text must be 1-100000 characters")
    payload = json.dumps({
        "text": text,
        "voiceCode": voice,
        "mode": "async",
        "webhookUrl": webhook,
        "outputFormat": "mp3",
        "bitrate": 128,
        "speed": speed,
    }, ensure_ascii=False).encode("utf-8")
    first = json_request(Request(API, data=payload, headers=headers(), method="POST"))
    job_id = first.get("requestId")
    if not isinstance(job_id, str) or not job_id:
        raise RuntimeError(f"Vbee did not provide requestId: {str(first.get('status', 'UNKNOWN'))[:80]}")
    status_url = f"{API}/requests/{quote(job_id, safe='')}"
    for _ in range(75):
        time.sleep(4)
        job = json_request(Request(status_url, headers=headers(), method="GET"))
        status = str(job.get("status", "")).upper()
        if status in {"FAILED", "FAILURE", "ERROR"}:
            raise RuntimeError(f"Vbee job failed: {status}")
        if status != "COMPLETED":
            continue
        audio_link = job.get("audioLink")
        if not isinstance(audio_link, str) or urlparse(audio_link).scheme != "https":
            raise RuntimeError("Vbee completed but valid HTTPS audioLink missing")
        # Expiring URL: download immediately. Do not log/persist it.
        with urlopen(audio_link, timeout=90) as response:
            mp3 = response.read(15_000_001)
        if len(mp3) > 15_000_000:
            raise RuntimeError("Audio exceeds 15 MB safety limit")
        if len(mp3) < 200 or not (
            mp3.startswith(b"ID3") or (mp3[0] == 255 and (mp3[1] & 224) == 224)
        ):
            raise RuntimeError("Downloaded audio is not a valid MP3 payload")
        tmp = dest.with_name(dest.name + ".part")
        tmp.write_bytes(mp3)
        tmp.replace(dest)
        return job_id
    raise RuntimeError("Vbee batch job did not complete in 5 minutes")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", required=True, type=Path)
    ap.add_argument("--out-dir", required=True, type=Path)
    ap.add_argument("--voice-code", default=os.getenv("VBEE_VOICE_CODE", DEFAULT_VOICE))
    ap.add_argument("--webhook-url", default=os.getenv("VBEE_WEBHOOK_URL"))
    ap.add_argument("--speed", type=float, default=0.98)
    ap.add_argument("--only-scene", type=int, default=0)
    args = ap.parse_args()
    if not 0.25 <= args.speed <= 1.9:
        ap.error("--speed must be between 0.25 and 1.9")
    if not args.webhook_url or urlparse(args.webhook_url).scheme != "https":
        ap.error("Provide an authorized HTTPS webhook via --webhook-url or VBEE_WEBHOOK_URL")
    credentials()  # fail before any chargeable TTS requests
    scenes = json.loads(args.manifest.read_text(encoding="utf-8"))
    if not isinstance(scenes, list) or not scenes:
        ap.error("--manifest must contain nonempty list of scene objects")
    ids = [int(s["id"]) for s in scenes]
    if len(set(ids)) != len(ids) or min(ids) < 1:
        ap.error("Scene IDs must be distinct positive integers")
    chosen = [s for s in scenes if not args.only_scene or int(s["id"]) == args.only_scene]
    if not chosen:
        ap.error("Requested scene not found")
    args.out_dir.mkdir(parents=True, exist_ok=True)
    results = []
    for scene in chosen:
        scene_id = int(scene["id"])
        outfile = args.out_dir / f"s{scene_id}.mp3"
        job_id = synthesize(str(scene["narration"]), outfile, args.voice_code, args.speed, args.webhook_url)
        dur = media_duration(outfile)
        shot_duration = float(scene["duration_sec"])
        results.append({
            "id": scene_id,
            "text": scene["narration"],
            "start_sec": float(scene["start_sec"]),
            "duration_sec": shot_duration,
            "audio_seconds": round(dur, 3),
            "fits_scene": dur <= shot_duration - 0.1,
            "file": outfile.name,
            "voice_code": args.voice_code,
            "request_id": job_id,
            "sha256": hashlib.sha256(outfile.read_bytes()).hexdigest(),
        })
        print(f"Scene {scene_id}: Vbee MP3 {dur:.2f}s; fits shot: {results[-1]['fits_scene']}", flush=True)
    report = args.out_dir / "measured-timeline.json"
    # When generating only one changed shot, do not claim old clips have been remeasured.
    report.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    if any(not s["fits_scene"] for s in results):
        raise RuntimeError("One or more Vbee voice segments exceed shot duration; rewrite/retime, do not cut audio")
    print(f"Vbee batch: {len(results)} scene(s) generated; output {args.out_dir}")


if __name__ == "__main__":
    main()
