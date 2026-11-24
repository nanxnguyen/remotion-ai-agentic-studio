#!/usr/bin/env python3
"""Generate actual Vbee audio for storytelling video and measure it; never use fallback voices.

The Vbee realtime (sync) endpoint requires a plan feature this account does not have.
The documented batch (async) API is used, with parallel workers, fast backoff polling,
input-hash caching, and optional single-narration mode.
Secrets are supplied by GitHub Actions or local environment at runtime, not stored in Git.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
import math
import os
from pathlib import Path
import random
import shutil
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://api.vbee.vn/v1/tts"
DEFAULT_VOICE = "hn_male_phuthang_stor_24k-stl"  # Vbee Anh Khoi storytelling
WEBHOOK = "https://example.com/room404-vbee-callback"  # required by API; result is polled
POLL_SCHEDULE = (1.0, 1.2, 1.5, 2.0, 2.5, 3.0)
MAX_WAIT_SECONDS = 300.0


def env_secret(*names):
    return next((os.environ[k] for k in names if os.environ.get(k)), None)


def credentials():
    token = env_secret("VBEE_ACCESS_TOKEN", "VBEE_TOKEN", "VBEE_API_KEY", "VBEE_API_TOKEN")
    app_id = env_secret("VBEE_APP_ID", "VBEE_APPID", "VBEE_APPLICATION_ID")
    if not token or not app_id:
        raise RuntimeError("Vbee token/App ID missing from runtime environment")
    return token, app_id


def compute_input_hash(text: str, voice_code: str, speed: float) -> str:
    payload = f"{voice_code}|{speed:.4f}|{text}".encode("utf-8")
    return hashlib.sha256(payload).hexdigest()


def request_json(request, retries: int = 4):
    last_exc = None
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(request, timeout=25) as response:
                body = response.read(32768)
            try:
                return json.loads(body)
            except ValueError:
                raise RuntimeError("Vbee returned a non-JSON batch response") from None
        except urllib.error.HTTPError as exc:
            if exc.code in (429, 500, 502, 503, 504) and attempt < retries - 1:
                time.sleep((1.5 * (attempt + 1)) + random.uniform(0.1, 0.6))
                last_exc = exc
                continue
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
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            if attempt < retries - 1:
                time.sleep(1.0 * (attempt + 1))
                last_exc = exc
                continue
            raise RuntimeError(f"Vbee network/timeout error: {exc}") from None
    raise RuntimeError(f"Vbee request failed after retries: {last_exc}")


def headers():
    token, app_id = credentials()
    return {"Authorization": f"Bearer {token}", "App-Id": app_id, "Content-Type": "application/json"}


def read_duration(path: Path) -> float:
    """Verify true Vbee MP3 size and measure clip length; use bitrate estimate if ffprobe unavailable."""
    if shutil.which("ffprobe"):
        result = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1", str(path)],
            capture_output=True, text=True, check=True)
        return float(result.stdout.strip())
    payload = path.read_bytes()
    if not payload.startswith(b"ID3") or len(payload) < 1500:
        raise RuntimeError("Cannot estimate audio duration: malformed Vbee MP3")
    offset = 10 + ((payload[6] & 127) << 21) + ((payload[7] & 127) << 14) + ((payload[8] & 127) << 7) + (payload[9] & 127)
    return (len(payload) - offset) * 8 / 128000


def generate_async(text: str, voice_code: str, speed: float, dest: Path, webhook_url: str) -> None:
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
        raise RuntimeError(f"Vbee batch response lacked request ID; status={status.get('status', 'UNKNOWN')}")

    url = f"{API}/requests/{urllib.parse.quote(rid, safe='')}"
    elapsed = 0.0
    poll_idx = 0
    while elapsed < MAX_WAIT_SECONDS:
        wait_s = POLL_SCHEDULE[min(poll_idx, len(POLL_SCHEDULE) - 1)]
        time.sleep(wait_s)
        elapsed += wait_s
        poll_idx += 1
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
            temp = dest.with_name(f"{dest.name}.{os.getpid()}.tmp")
            temp.write_bytes(mp3)
            temp.replace(dest)
            return
    raise RuntimeError("Vbee request still pending after 5 minutes")


def load_existing_cache(measured_path: Path) -> dict[int, dict]:
    if not measured_path.exists():
        return {}
    try:
        items = json.loads(measured_path.read_text(encoding="utf-8"))
        return {int(item["id"]): item for item in items if isinstance(item, dict) and "id" in item}
    except (ValueError, KeyError, TypeError):
        return {}


def process_scene(
    scene: dict,
    out_dir: Path,
    voice_code: str,
    speed: float,
    webhook_url: str,
    use_cache: bool,
    cached_entry: dict | None,
) -> dict:
    i = int(scene["id"])
    narration = scene["narration"]
    dest = out_dir / f"s{i}.mp3"
    in_hash = compute_input_hash(narration, voice_code, speed)

    if use_cache and cached_entry and dest.exists() and cached_entry.get("input_hash") == in_hash:
        duration = float(cached_entry.get("audio_seconds") or read_duration(dest))
        sha = cached_entry.get("sha256") or hashlib.sha256(dest.read_bytes()).hexdigest()
        print(f"[cache] Vbee clip {dest.name}: {duration:.2f}s", flush=True)
        return {
            "id": i,
            "audio_file": dest.name,
            "text": narration,
            "voice_code": voice_code,
            "audio_seconds": round(duration, 3),
            "visual_start_seconds": round((i - 1) * 5.5, 3),
            "sha256": sha,
            "input_hash": in_hash,
        }

    generate_async(narration, voice_code, speed, dest, webhook_url)
    duration = read_duration(dest)
    if not math.isfinite(duration) or duration < 0.3:
        raise RuntimeError(f"Scene {i}: invalid duration")
    print(f"Vbee clip {dest.name}: {duration:.2f}s", flush=True)
    return {
        "id": i,
        "audio_file": dest.name,
        "text": narration,
        "voice_code": voice_code,
        "audio_seconds": round(duration, 3),
        "visual_start_seconds": round((i - 1) * 5.5, 3),
        "sha256": hashlib.sha256(dest.read_bytes()).hexdigest(),
        "input_hash": in_hash,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--timeline", type=Path, default=Path("docs/buc-anh-thu-tu/timeline.json"))
    ap.add_argument("--single-narration", type=Path, default=None,
                    help="Generate 1 contiguous voiceover.mp3 from a plain-text narration file")
    ap.add_argument("--out-dir", type=Path, default=Path("public/audio/buc-anh-thu-tu"))
    ap.add_argument("--voice-code", default=os.environ.get("VBEE_VOICE_CODE", DEFAULT_VOICE))
    ap.add_argument("--speed", type=float, default=0.98)
    ap.add_argument("--webhook-url", default=os.environ.get("VBEE_WEBHOOK_URL", WEBHOOK))
    ap.add_argument("--limit", type=int, default=0, help="Generate only first N scenes for a capability test")
    ap.add_argument("--only-scene", type=int, default=0, help="Regenerate one scene (1-indexed), preserving others")
    ap.add_argument("--workers", type=int, default=6, help="Parallel Vbee async workers (1-12)")
    ap.add_argument("--no-cache", action="store_true", help="Disable input_hash skip cache")
    args = ap.parse_args()

    if not (0.25 <= args.speed <= 1.9):
        ap.error("Speed must be between 0.25 and 1.9")
    if not args.webhook_url.startswith("https://"):
        ap.error("webhook URL must be HTTPS")
    workers = max(1, min(12, args.workers))
    args.out_dir.mkdir(parents=True, exist_ok=True)
    measured_path = args.out_dir / "measured-timeline.json"

    if args.single_narration:
        text = args.single_narration.read_text(encoding="utf-8").strip()
        if not text:
            ap.error("Single narration file is empty")
        dest = args.out_dir / "voiceover.mp3"
        generate_async(text, args.voice_code, args.speed, dest, args.webhook_url)
        duration = read_duration(dest)
        entry = {
            "id": 1,
            "audio_file": dest.name,
            "text": text,
            "voice_code": args.voice_code,
            "audio_seconds": round(duration, 3),
            "visual_start_seconds": 0.0,
            "sha256": hashlib.sha256(dest.read_bytes()).hexdigest(),
            "input_hash": compute_input_hash(text, args.voice_code, args.speed),
        }
        measured_path.write_text(json.dumps([entry], ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"PRODUCED: 1 contiguous Vbee voiceover ({duration:.2f}s).", flush=True)
        return

    all_scenes = json.loads(args.timeline.read_text(encoding="utf-8"))
    scenes = all_scenes[:args.limit] if args.limit else all_scenes
    if args.only_scene:
        scenes = [s for s in all_scenes if int(s.get("id", 0)) == args.only_scene]
        if len(scenes) != 1:
            ap.error("Invalid --only-scene; no matching scene")

    existing = load_existing_cache(measured_path)
    use_cache = not args.no_cache
    results_by_id: dict[int, dict] = {}

    with ThreadPoolExecutor(max_workers=min(workers, len(scenes))) as pool:
        futures = {
            pool.submit(
                process_scene,
                scene,
                args.out_dir,
                args.voice_code,
                args.speed,
                args.webhook_url,
                use_cache,
                existing.get(int(scene["id"])),
            ): int(scene["id"])
            for scene in scenes
        }
        for fut in as_completed(futures):
            entry = fut.result()
            results_by_id[entry["id"]] = entry

    if args.only_scene and existing:
        merged = dict(existing)
        merged.update(results_by_id)
        timeline = [merged[k] for k in sorted(merged)]
    else:
        timeline = [results_by_id[int(s["id"])] for s in scenes]

    measured_path.write_text(json.dumps(timeline, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"PRODUCED: {len(timeline)} actual Vbee audio clips (workers={workers}).", flush=True)


if __name__ == "__main__":
    main()
