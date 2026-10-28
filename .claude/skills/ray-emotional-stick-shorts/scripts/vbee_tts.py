#!/usr/bin/env python3
"""Vbee Batch TTS: Vietnamese male narration (requires private credentials)."""
import argparse
import json
import os
from pathlib import Path
import sys
import time
from urllib.error import HTTPError
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen

BASE = "https://api.vbee.vn/v1/tts"
DEFAULT_VOICE = "hn_male_thanhlong_talk_48k-fhg"

def headers():
    app = os.environ.get("VBEE_APP_ID")
    token = os.environ.get("VBEE_ACCESS_TOKEN")
    if not app or not token:
        raise RuntimeError("Configure VBEE_APP_ID and VBEE_ACCESS_TOKEN securely (not in git or chat).")
    return {"Authorization": "Bearer " + token, "App-Id": app, "Content-Type": "application/json"}

def json_request(url, hdrs, payload=None):
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8") if payload is not None else None
    req = Request(url, data=body, headers=hdrs, method="POST" if body else "GET")
    try:
        with urlopen(req, timeout=60) as response:
            return json.load(response)
    except HTTPError as error:
        try:
            detail = error.read(1200).decode("utf-8", errors="replace").strip()
        except Exception:
            detail = ""
        detail = " ".join(detail.split())[:700]
        suffix = ("; provider_detail=" + detail) if detail else ""
        raise RuntimeError("Vbee HTTP status " + str(error.code) + suffix) from None

def secure_https(value):
    uri = urlparse(value)
    if uri.scheme != "https" or not uri.netloc:
        raise ValueError("A valid HTTPS webhook/audio URL is required.")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--text-file", type=Path)
    ap.add_argument("--voice-code", default=DEFAULT_VOICE)
    ap.add_argument("--webhook-url", default=os.environ.get("VBEE_WEBHOOK_URL", ""))
    ap.add_argument("--output", type=Path, default=Path("vbee-voice.mp3"))
    ap.add_argument("--request-id", help="Resume the prior request without generating twice")
    ap.add_argument("--speed", type=float, default=0.95)
    ap.add_argument("--attempts", type=int, default=40)
    args = ap.parse_args()
    h = headers()
    if args.request_id:
        request_id = args.request_id
    else:
        if not args.text_file:
            ap.error("--text-file is required for new requests")
        secure_https(args.webhook_url)
        text = args.text_file.read_text(encoding="utf-8").strip()
        if not text or len(text) > 100000:
            ap.error("Batch text must contain 1–100,000 characters")
        if not 0.25 <= args.speed <= 1.9:
            ap.error("--speed must be 0.25–1.9")
        data = {"text": text, "mode": "async", "voiceCode": args.voice_code,
                "webhookUrl": args.webhook_url, "outputFormat": "mp3",
                "bitrate": 128, "speed": args.speed,
                "clientPause": {"mediumBreak": 0.32, "sentenceBreak": 0.55}}
        result = json_request(BASE, h, data)
        request_id = result.get("requestId")
        if not request_id:
            raise RuntimeError("Vbee did not return a requestId.")
        print("Vbee request ID: " + request_id, file=sys.stderr)
    for n in range(args.attempts):
        result = json_request(BASE + "/requests/" + quote(request_id, safe=""), h)
        status = str(result.get("status", "")).upper()
        if status == "COMPLETED":
            url = result.get("audioLink")
            if not url:
                raise RuntimeError("COMPLETED but audioLink is missing")
            secure_https(url)
            args.output.parent.mkdir(parents=True, exist_ok=True)
            with urlopen(Request(url), timeout=120) as response, args.output.open("wb") as out:
                while True:
                    chunk = response.read(1024 * 1024)
                    if not chunk:
                        break
                    out.write(chunk)
            if args.output.stat().st_size < 1000:
                raise RuntimeError("Unexpectedly small audio output; verify format.")
            print("Audio: " + str(args.output))
            return
        if status in ("FAILED", "ERROR", "CANCELLED"):
            raise RuntimeError("Vbee synthesis failed: " + status)
        if n < args.attempts - 1:
            time.sleep(5)
    raise RuntimeError("Still processing; rerun with --request-id " + request_id)

if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, OSError, ValueError) as err:
        print("ERROR: " + str(err), file=sys.stderr)
        sys.exit(1)
