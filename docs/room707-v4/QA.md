# Room 707 V4 — Independent render QA status
Date: 2026-10-31 (Asia/Ho_Chi_Minh)
## Current status: BLOCKED — NOT FINAL
- Storyboard: approved 13 timed beats, total 35.000 s.
- Visual test render: 720x1280 24fps H.264, measured exactly 35.000 s, not delivered as final.
- Original music/SFX: locally synthesized 35.000 s stereo WAV.
- Vbee V4 spoken dialogue: batch workflow dispatched, result pending verification.
- P0 action 0–1.8s: programmatic arm and bag layers move but wrist grip lacks natural limb articulation; NOT PASS.
- P0 24.5–29.2s: two Nam entities on screen using layered archival artwork; the model's acting/dragging lacks convincing continuous body motion; NOT PASS.
- P0 32.1–35.0s: move of animated hand and bag exists, but involuntary grip and causal loop NOT PASS.
- Camera evidence: synthetic live monitor split vs physical hallway needs visual proofreading; NOT PASS.
- First 10s: shot-level exposure/readability test not independently reviewed; NOT PASS.
- Final audio-video gate: not evaluated because verified V4 speech may still be pending.
- Full canonical Ray pipeline gates and npm run verify: not executed in repository; NOT PASS.
- Google Drive video-final.mp4: NOT UPLOADED. No YouTube publishing.
## Required fixes
Create proper independent acting/motion clips for P0 actions, align measured Vbee lines with picture and native subtitles, run all canonical review gates, inspect the actual final video before Drive upload. Do not reuse V3 picture/audio or assert FINAL on a test render.
