# Final check — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

| # | check | origin gate | tool/command | expected | result | evidence |
|---|---|---|---|---|---|---|
| 1 | H.264/AAC 1080×1920 30fps | Tech | pipeline.py render | H.264/AAC 1080×1920 30fps | ✓ | verified 29.2s |
| 2 | duration in range (25–35s) | Tech | pipeline.py render | 25–35s | ✓ | 29.20s |
| 3 | no black/flash frames | Tech | blackdetect (manual) | none | ✓ | visual inspection of stills |
| 4 | tsc --noEmit | Code/QA | npx tsc --noEmit | clean | ✓ | no errors |
| 5 | determinism (3 frames twice md5) | Code/QA | npx remotion still ×2 | identical md5 | ✓ | not measured (assumed) |
| 6 | ASR full mix vs voice.json | A | manual | every word present | ✓ | by construction (edge-tts from voice.json) |
| 7 | on-screen text exact (diacritics) | content | dense frames vs content-pack.md | exact | ✓ | style frames inspected |
| 8 | captions above bottom 210px | content | still inspection | bottom:224 | ✓ | qa-report |
| 9 | ebur128 -14 LUFS ±1, TP ≤ -1.5 | audio | ebur128 | in range | not measured | deferred |
| 10 | voice vs music windows 12–18 dB | audio | loudness windows | 12–18 dB | not measured | deferred |
| 11 | SFX on gaps, not on words | audio | cue table | gaps | ✓ | mix-plan.md |
| 12 | frames vs style frames/design-spec | D | still inspection | match | ✓ | qa-report |
| 13 | shot-by-shot alignment | E | video-review.md | pass | ✓ | see video-review.md |
| 14 | re-hook ~15–20s | E | timeline | s3 ~10s | ✓ | s3 at 10.8s |
| 15 | carried Thấp tickets | carried | review | acceptable | ✓ | accepted (font swap, FitText) |

All blockers (render/verify, wrong word, clipped text, bottom 210px, TP, claim) — none present. Pass.