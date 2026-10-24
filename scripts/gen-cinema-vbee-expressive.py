#!/usr/bin/env python3
"""Real Vbee Batch narration with scene-aware pace and source provenance. No substitute voices."""
import importlib.util
import json
import hashlib
import os
from pathlib import Path
from datetime import datetime, timezone

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location("vbee_batch", ROOT/"scripts"/"gen-story-vbee-batch.py")
module=importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
scenes=json.loads((ROOT/"docs"/"suat-chieu-cuoi-cung"/"timeline-v2-expressive.json").read_text(encoding="utf-8"))
out=ROOT/"public"/"audio"/"suat-chieu-cuoi-cung-v2"
out.mkdir(parents=True,exist_ok=True)
code="hn_male_phuthang_stor_24k-stl"
callback=os.environ.get("VBEE_WEBHOOK_URL") or "https://example.com/story-tts-webhook"
manifest=[]
for s in scenes:
    n=s["id"]
    p=out/f"s{n}.mp3"
    module.generate_async(s["narration"], code, s["speed"], p, callback)
    duration=module.read_duration(p)
    if duration>5.75:
        raise RuntimeError(f"Scene {n} Vbee too long: {duration:.3f} sec exceeds 6s slot, shorten text; do not clip")
    sha=hashlib.sha256(p.read_bytes()).hexdigest()
    manifest.append({"id":n,"text":s["narration"],"speed":s["speed"],"emotion_direction":s["emotion"],"voice_code":code,"audio_seconds":duration,"slot_start_seconds":6*(n-1),"slot_seconds":6,"sha256":sha,"file":f"s{n}.mp3","provider":"Vbee Batch API"})
    print(f"scene{n}: {duration:.3f}s, {s['emotion']}",flush=True)
(out/"measured-timeline.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("GENUINE_VBEE_EXPRESSIVE_V2_SUCCESS",flush=True)
