# Join notes — dung-bien-tuoi-30-thanh-ban-an

Phase 4 director join draft, created after content/audio/design branch reviews.

## Source of truth

- Locked spoken text: `docs/dung-bien-tuoi-30-thanh-ban-an/voice.json`.
- Current measured durations: `src/videos/dung-bien-tuoi-30-thanh-ban-an/voice-durations.ts`.
- Current authoritative voice total: **44.133915s**; the current frame-quantized timeline is **1549 frames / 51.633333s** at 30fps. The first table below is retained only as historical audit context.
- `timeline.ts` is the current join contract. It uses one scene per ordered voice key and allocates the locked holds/gaps to the current scene boundaries.

## Historical first join draft (superseded — do not use for current review)

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

## Current join snapshot after voice reopen (2026-10-18)

- Voice source was regenerated and remeasured. Current rounded durations are `2.160, 3.327, 4.236, 1.975, 3.381, 2.348, 1.661, 2.498, 3.476, 3.087, 3.266, 1.749, 4.130, 2.976, 1.910, 1.797` seconds in `voice.json` order.
- `timeline.ts` now derives its shot lengths from the current `VOICE_SECONDS`; the frame-quantized total is `1549` frames (`51.633s`). The authoritative sequential ranges are `s1 [0,78)`, `s2 [78,185)`, `s3a [185,321)`, `s3b [321,388)`, `s4a [388,498)`, `s4b [498,577)`, `s5a [577,640)`, `s5b [640,725)`, `s6a [725,841)`, `s6b [841,943)`, `s7a [943,1050)`, `s7b [1050,1111)`, `s8 [1111,1244)`, `s9a [1244,1354)`, `s9b [1354,1423)`, `s10 [1423,1549)`. s1 uses a declared `0.15s` lead-in quantized conservatively to `5f` and a full `0.25s` post-roll; s8 caption boundaries are `43f/89f`.
- Final-style normalized preview: `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview-verified-r3.mp4`, measured `51.600s` video / `51.594s` AAC, `-14.7 LUFS`, sample peak `-1.8 dBFS`. The delivery render uses the same `loudnorm` contract with `TP=-2.0` and `-shortest` for AAC margin.
- Current ASR evidence is consolidated in `voice-clone-asr.md`: `11/16` at CER `<=0.04`; remaining failures are explicitly carried, not hidden. This join snapshot is ready for the final audio review and Gate E rerun, not a clean pass claim.
- Independent stem proof is recorded in `integration-mix-proof.md`; the s1 frame contract now allocates a full post-roll frame after the 5-frame lead-in quantization.

## Integrated preview evidence

- Preview render: `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview.mp4`.
- Rendered range: frames `0–1552`, 1080×1920, 30fps, measured duration `51.776s`.
- FFmpeg `ebur128` measurement: integrated loudness `-21.8 LUFS`, LRA `1.7 LU`; this is below the `-14±1 LUFS` target and therefore remains a Gate E revision finding.
- The preview confirms the current Reel mounts the visual scenes, 16 voice tracks, BGM, and SFX without a render failure. It is not the final delivery render and does not close E-008 until windowed ducking, true peak, SFX audibility, and the near-silent ending are measured.

## Gate E handoff checks

- Confirm `voice.json` order matches scene order: 16/16.
- Confirm `content-pack.md` caption chunks match `voice.json`: 16/16 exact.
- Confirm card/style/demo/poster lookup: 16/16 per design handoff.
- Confirm integration adds voice, BGM and SFX to `Reel.tsx` only after Gate E/B instructions.
