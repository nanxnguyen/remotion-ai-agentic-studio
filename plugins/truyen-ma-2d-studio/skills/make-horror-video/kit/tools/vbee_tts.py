"""tools/vbee_tts.py — narrate a Vietnamese script with the Vbee TTS API (async batch), one MP3 per line, then join.

  python tools/vbee_tts.py --script story/narration.txt --out input/voiceover.mp3 [--voice hn_male_phuthang_stor_24k-stl] [--speed 0.95] [--gap 0.35]

Credentials come ONLY from environment variables (never write them in files, logs or the repo):
  VBEE_APP_ID          (or VBEE_APPID)                  application id
  VBEE_ACCESS_TOKEN    (or VBEE_TOKEN / VBEE_API_KEY)   bearer token
  VBEE_WEBHOOK_URL     HTTPS callback the API requires; results are polled anyway, so any endpoint you control works.
API: POST https://api.vbee.vn/v1/tts  {text, voiceCode, mode:"async", webhookUrl, outputFormat:"mp3", speed}
     GET  https://api.vbee.vn/v1/tts/requests/<requestId> → status, audioLink (download at once: links expire in minutes).
Script format: one narration line per text line. A line starting with "#" is a comment; an empty line adds a longer pause
("--para" seconds). Write numbers as words ("hai giờ mười bảy", "phòng bốn không bốn") so the voice reads them right.
Writes the joined MP3 plus <out>.lines.json (text, file, start, end per line) for exact caption timing.
Runs wherever HTTPS to api.vbee.vn is allowed (your computer or a GitHub Actions runner). If it cannot run, the pipeline
accepts any voiceover file instead (record it yourself or use another TTS) — never label a substitute voice as Vbee.
"""
import argparse, json, os, subprocess, sys, time, urllib.request, urllib.error

API = "https://api.vbee.vn/v1/tts"


def env(*names):
    for n in names:
        v = os.environ.get(n)
        if v: return v
    return None


def req(method, url, token, app, body=None):
    data = json.dumps(body).encode() if body is not None else None
    r = urllib.request.Request(url, data=data, method=method, headers={"Authorization": f"Bearer {token}", "App-Id": app, "Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=60) as f:
        return json.loads(f.read().decode())


def probe(p):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p], capture_output=True, text=True).stdout.strip()
    return float(out or 0)


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--script", required=True); ap.add_argument("--out", required=True)
    ap.add_argument("--voice", default="hn_male_phuthang_stor_24k-stl"); ap.add_argument("--speed", type=float, default=0.95)
    ap.add_argument("--gap", type=float, default=0.35, help="silence between lines (s)"); ap.add_argument("--para", type=float, default=0.9, help="silence at an empty line (s)")
    ap.add_argument("--timeout", type=int, default=240); a = ap.parse_args()
    app, token, hook = env("VBEE_APP_ID", "VBEE_APPID", "APPLICATION_ID"), env("VBEE_ACCESS_TOKEN", "VBEE_TOKEN", "VBEE_API_KEY", "VBEE_API_TOKEN"), env("VBEE_WEBHOOK_URL")
    if not (app and token and hook):
        sys.exit("missing VBEE_APP_ID / VBEE_ACCESS_TOKEN / VBEE_WEBHOOK_URL in the environment (values are never printed)")
    lines = [l.rstrip("\n") for l in open(a.script, encoding="utf-8")]
    work = os.path.splitext(a.out)[0] + "_lines"; os.makedirs(work, exist_ok=True)
    items = []
    for raw in lines:
        s = raw.strip()
        if s.startswith("#"): continue
        if not s: items.append({"pause": a.para}); continue
        items.append({"text": s})
    for i, it in enumerate(items):
        if "text" not in it: continue
        mp3 = os.path.join(work, f"s{i + 1:03d}.mp3"); it["file"] = mp3
        if os.path.exists(mp3) and probe(mp3) > 0.2: continue          # resume: keep lines already synthesised
        body = {"text": it["text"], "voiceCode": a.voice, "mode": "async", "webhookUrl": hook, "outputFormat": "mp3", "speed": a.speed}
        try: res = req("POST", API, token, app, body)
        except urllib.error.HTTPError as e: sys.exit(f"Vbee POST failed for line {i + 1}: HTTP {e.code} {e.read()[:300]!r}")
        rid = (res.get("result") or {}).get("request_id") or res.get("request_id") or (res.get("result") or {}).get("requestId")
        if not rid: sys.exit(f"Vbee POST: no request id in response {str(res)[:300]}")
        t0 = time.time()
        while True:
            time.sleep(2.5); st = req("GET", f"{API}/requests/{rid}", token, app); r = st.get("result") or st
            status = (r.get("status") or "").upper()
            if status in ("COMPLETED", "SUCCESS", "DONE") and (r.get("audio_link") or r.get("audioLink")):
                link = r.get("audio_link") or r.get("audioLink"); urllib.request.urlretrieve(link, mp3); break
            if status in ("FAILED", "FAILURE", "ERROR"): sys.exit(f"Vbee job failed for line {i + 1}: {str(r)[:300]}")
            if time.time() - t0 > a.timeout: sys.exit(f"Vbee job timed out for line {i + 1} (request {rid})")
        print(f"line {i + 1}/{len(items)} ok ({probe(mp3):.2f}s)")
    # join with silences, record exact line timings
    concat, meta, t = os.path.join(work, "concat.txt"), [], 0.0
    sil = lambda d: (p := os.path.join(work, f"sil_{int(d * 1000)}.mp3"), os.path.exists(p) or subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(d), "-q:a", "4", p], check=True))[0]
    with open(concat, "w", encoding="utf-8") as f:
        for it in items:
            if "pause" in it: f.write(f"file '{os.path.abspath(sil(it['pause']))}'\n"); t += it["pause"]; continue
            d = probe(it["file"]); f.write(f"file '{os.path.abspath(it['file'])}'\n"); meta.append({"text": it["text"], "file": it["file"], "start": round(t, 3), "end": round(t + d, 3)}); t += d
            f.write(f"file '{os.path.abspath(sil(a.gap))}'\n"); t += a.gap
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", concat, "-ar", "48000", "-ac", "1", "-b:a", "192k", a.out], check=True)
    json.dump(meta, open(a.out + ".lines.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"wrote {a.out} ({probe(a.out):.1f}s, {len(meta)} lines, voice {a.voice}, speed {a.speed})")


if __name__ == "__main__":
    main()
