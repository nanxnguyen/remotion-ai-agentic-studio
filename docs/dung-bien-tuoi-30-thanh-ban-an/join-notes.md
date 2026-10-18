# Join notes — dung-bien-tuoi-30-thanh-ban-an

Phase 4 director join draft, created after content/audio/design branch reviews.

## Source of truth

- Locked spoken text: `docs/dung-bien-tuoi-30-thanh-ban-an/voice.json`.
- Current measured durations: `src/videos/dung-bien-tuoi-30-thanh-ban-an/voice-durations.ts`.
- Current voice total: **44.133915s**; locked holds/gaps: **7.700s**; frame-quantized timeline: **1553 frames / 51.7667s** at 30fps.
- `timeline.ts` is the current join draft. It uses one scene per ordered voice key and allocates the locked holds/gaps to the following scene boundary.

## Key reconciliation

| key | scene | voice s | hold/gap s | from f | duration f | end f |
|---|---:|---:|---:|---:|---:|---:|
| s1 | scene01 | 2.160 | 0.400 | 0 | 77 | 77 |
| s2 | scene02 | 3.327 | 0.250 | 77 | 107 | 184 |
| s3a | scene03 | 4.298 | 0.300 | 184 | 138 | 322 |
| s3b | scene04 | 1.975 | 0.250 | 322 | 67 | 389 |
| s4a | scene05 | 3.381 | 0.300 | 389 | 110 | 499 |
| s4b | scene06 | 2.348 | 0.300 | 499 | 79 | 578 |
| s5a | scene07 | 1.661 | 0.450 | 578 | 63 | 641 |
| s5b | scene08 | 2.498 | 0.350 | 641 | 85 | 726 |
| s6a | scene09 | 3.476 | 0.400 | 726 | 116 | 842 |
| s6b | scene10 | 3.087 | 0.300 | 842 | 102 | 944 |
| s7a | scene11 | 3.266 | 0.300 | 944 | 107 | 1051 |
| s7b | scene12 | 1.749 | 0.300 | 1051 | 61 | 1112 |
| s8 | scene13 | 4.130 | 0.300 | 1112 | 133 | 1245 |
| s9a | scene14 | 2.976 | 0.700 | 1245 | 110 | 1355 |
| s9b | scene15 | 1.910 | 0.400 | 1355 | 69 | 1424 |
| s10 | scene16 | 1.898 | 2.400 | 1424 | 129 | 1553 |

## Locked decisions

- Re-hook `s5a/s5b` remains split and lands at approximately frame 578 (19.27s), within the planned 15–20s window.
- `s9a → s9b` keeps the 0.70s gap; the final s10 hold remains 2.40s.
- Audio mix and SFX use relative offsets from `mix-plan.md`; no cue is placed before the measured spoken interval.
- The current audio review has accepted-risk ASR residuals and an unverified integrated mix. These are carried into Gate E/B/C; this document does not claim audio pass.
- The 16 existing scene files are scaffold/build inputs; no scene is declared production-complete until Gate B passes and build QA verifies visual content.

## Gate E handoff checks

- Confirm `voice.json` order matches scene order: 16/16.
- Confirm `content-pack.md` caption chunks match `voice.json`: 16/16 exact.
- Confirm card/style/demo/poster lookup: 16/16 per design handoff.
- Confirm integration adds voice, BGM and SFX to `Reel.tsx` only after Gate E/B instructions.
