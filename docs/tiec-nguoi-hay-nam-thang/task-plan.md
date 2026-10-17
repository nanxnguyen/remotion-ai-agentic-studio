# Task plan — tiec-nguoi-hay-nam-thang (post-handoff local plan)

Executed local plan (record of the work performed after the ChatGPT cold handoff):

1. Voice — run gen-voice-clone.py for s1–s8 with refThanhLong.wav (VieNeu-TTS v3 Turbo, loudnorm POST), measure ffprobe durations, ASR/CER check → `voice-final-asr.md` (8/8 clips, CER 0.000–0.075). DONE 15:55.
2. Re-time — timeline.ts from measured durations + semantic holds (incl. A-C7 final 2.0s hold) → 1422f. DONE.
3. Scene QA — verify scenes.tsx shots render headline + motif per pack; boundary checks at all 8 shot starts on the final MP4. DONE (10 frame extracts).
4. Render — `pipeline.py render` → H.264/AAC 1080×1920@30, 47.40s, verified fingerprint. DONE 16:11.
5. Reviews — record content/audio/D/E/B/C with reports in docs/. THIS STEP.
6. Delivery — check → ready; monitor green.

Ownership: director owns timeline/Reel/registry; voice-agent owned clips only; reviewers never edit.
