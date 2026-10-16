# HANDOFF — Hybrid Local, Video 08

## Status
ChatGPT prebuild ONLY; no audio or final MP4. No review gate has been marked passed. No claims about test or visual inspections not actually performed.

## Inputs
- Canonical spoken lines: `docs/tiec-nguoi-hay-nam-thang/voice.json` (8 keys, order matters).
- Creative intent: brief.md, script.md, content-pack.md, design-spec.md.
- Typed Remotion composition: `src/videos/tiec-nguoi-hay-nam-thang/index.ts`; registered in registry.
- Machine-readable contract: production-contract.json. You must check PR head SHA and required paths before execution.

## Local continuation — exact order
1. Checkout this PR in a dedicated safe worktree; never execute untrusted PRs or expose secrets to pre-build.
2. Run `python3 -I scripts/pipeline.py init tiec-nguoi-hay-nam-thang --comp TiecNguoiHayNamThangReel --voice thanh-long-nang-cao --profile story` only if status.json is absent. Do not manually write/edit status.json.
3. Execute independent script and content reviews, record and pass Gate A/content via pipeline.py. Inspect design spec and renders as independent reviewer, record Gate D only if actually passing.
4. Generate s1..s8.mp3 using local VieNeu-TTS from an authorized local WAV reference, verify ASR/CER and duration with ffprobe; place clips in `public/audio/tiec-nguoi-hay-nam-thang/`, record actual provider/ref provenance in brief, and generate voice report.
5. Replace provisional `PROPOSED_FRAMES` in timeline.ts using measured clip durations + semantic holds. Aim 45–60s; check no voice clipping. Update composition duration and captions as necessary.
6. Produce licensed/original subtle BGM; integrate the per-shot Audio tracks; review audio and run integration Gate E then task Gate B according to pipeline order.
7. Run npm run verify, npm run test:visual; render full 1080x1920 MP4 via repo commands, capture QA frames and full review evidence, pass Gate C only on verified final MP4.
8. Present final MP4 and explicitly ASK OWNER whether to upload to YouTube Shorts and Facebook Page Reels. Never publish without explicit per-video approval. 

## Blocking conditions
- Missing clone model or unauthorized voice reference -> voice blocked.
- Any major story/character mismatch -> redesign before continuing.
- No fabricated scores, duration, QA evidence, or published status.
