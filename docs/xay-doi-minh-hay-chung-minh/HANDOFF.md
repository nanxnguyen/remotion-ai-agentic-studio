# HANDOFF — xay-doi-minh-hay-chung-minh (stopped by user, 2026-10-17)

> **UPDATE 2026-10-17 15:20 — PIPELINE COMPLETE.** All stages done; gates A/D/E/B/C + content/audio branch
> reviews passed; gate C 9.0/10 fingerprint-bound to the verified MP4
> `out/xay-doi-minh-hay-chung-minh-thanh-long-nang-cao-reel.mp4` (59.30s H.264/AAC 1080x1920 30fps).
> `pipeline.py check` → `ready`. QA rounds 1–3 reports live in this folder (qa-report.A/B/C.md).
> Voice used: `thanh-long-nang-cao` (user request changed from the Cam fallback noted below).
> Remaining Thấp residuals (non-blocking): C7 fg-hand detail at small preview, C3 stand/squat vs kneel staging.
> Everything below this note is the historical mid-flight state at the moment the user stopped the run.

## Status (`python3 -I scripts/pipeline.py show xay-doi-minh-hay-chung-minh`)
- Done: research, brief, script. Gate A: round 1 = 8.4 revise; round 2 = 9.0 pass (recorded).
- Pending: voice, design, build, audio, qa, render. Gates D, E, B, C not started.
- After the round-2 pass, script-agent applied A15/A16/A17 (spoken line s3 changed: "nhà người ấy" → "nhà người đó"). Round-3 narrow regression review was dispatched and **stopped before finishing** → no round-3 result recorded. Re-run a clean-context script-reviewer (narrow: A15–A17 + total 194 syllables + mandatory line byte-exact) and append "## Round 3" to script-review.md, or accept as-is (A pass already recorded; Thấp-level change).
- Comp ID planned: `XayDoiMinhReel` (not yet in src/Root.tsx). Profile story. Monitor was started on :4180 (may still be running).

## Locked decisions
- Topic: "Bạn đang xây cuộc đời mình, hay cố chứng minh ai đó đã sai?"
- Mandatory verbatim line (s9a + s9b): “Người từng xem thường bạn có thể đã quên. Còn bạn vẫn sống để họ phải tiếc.”
- Style: own design, more striking than out/truongthanh-contact-sheet.jpg; must NOT resemble it (no black + white stick figure + orange, no stamp, no sofa/bar chart). Proposed: paper-cut diorama, coban #141B6B→#2A36C9, hồng sen #FF2E9A ("chứng minh"), ngọc #19C48A ("xây cho mình"), xanh nước #8FE3FF ("họ"); Bricolage Grotesque + Archivo (verify Vietnamese subset; fallback Be Vietnam Pro / Archivo ExtraBold). Final design is design-agent's call at Phase 3.
- Script: 16 voice keys (s1, s2a, s2b, s3, s4, s5a1, s5a2, s5b, s6, s7a, s7b, s8, s9a, s9b, s10, s11), 194 syllables, ~55.2s at 4.1 syl/s; holds 7.9s (gaps s2a→s2b 0.25, s5a1→s5a2 0.3, s6 lead-in 0.3, s7a→s7b 0.4, s9a→s9b 0.7, 1.0 silence after s9b, 2.0 silence after s11).
- Voice requested by user: vietnamese-voice-samples/previews/Cam.mp3 (no provider/voice ID in catalog). **Clone authorization NOT recorded** (needs user's dated written confirmation naming the voice). Fallback: edge-tts vi-VN-HoaiMyNeural rate +6%, then `pipeline.py voice <vid> hoaimy`. Note: a classifier blocked an attempt to write an inferred authorization into brief.md; do not infer it.

## Files
docs/xay-doi-minh-hay-chung-minh/: brief.md, research.md, script.md, voice.proposed.json (not yet copied to voice.json), script-review.md (rounds 1–2), status.json.
No src/, public/audio/, out/ files created.

## Next steps
1. (Optional) finish round-3 review of A15–A17.
2. `cp docs/xay-doi-minh-hay-chung-minh/voice.proposed.json docs/xay-doi-minh-hay-chung-minh/voice.json`.
3. Ask user for Cam authorization; else fallback voice.
4. Dispatch in ONE message: design-agent, voice-agent, audio-agent (light mode), then audio-reviewer + design-reviewer (D) in parallel; then E, task-planner/B, scene-agents, qa, render, C.
5. Add `XayDoiMinhReel` composition in src/Root.tsx (director only).

## Warnings
- Any spoken-line change reopens A. Don't cut audio speed to fit. Render only the BGM version. Caption at bottom: 224.
