# Integrated mix proof — dung-bien-tuoi-30-thanh-ban-an

Current snapshot: 2026-10-18. This is a deterministic source-level and render-level proof for the Join/Gate E packet; it does not replace the independent audio review.

## Render measurement

- Input preview: `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview-r4.mp4` (current snapshot).
- `ffprobe`: 1080×1920, 30fps, video 51.633333s, AAC audio 51.614667s after `-shortest`.
- `ebur128`: `-14.7 LUFS`, LRA `5.4 LU`.
- `volumedetect`: sample peak `-1.8 dBFS`.
- Delivery render applies `loudnorm=I=-14:TP=-2.0:LRA=11` and `-shortest` to keep AAC from extending beyond the video stream.

## Frame-derived envelope proof

- Current timeline total: `1549f`; current s10 shot starts at `1423f`.
- Current s10 voice window: `1423–1477f` (`1.797s` rounded at 30fps).
- BGM release ramp: `1477–1486f` (9f / 300ms); BGM volume is zero from `1486f` through the composition end at `1549f`, giving `63f / 2.10s` BGM silence.
- The current s10 paper-wind cue is `[1481f,1505f)` and is explicitly treated as the only ending-foley exception; it leaves a longer quiet tail and does not change the BGM-zero proof.
- Voice duck envelope is explicit in `Reel.tsx`: hold `0.165` versus bed `0.30`, a `5.19 dB` reduction, with 6-frame (`200ms`) attack/release ramps around every measured voice window.

## Caption and cue proof

- s8 `silencedetect`: silence `1.408750–1.711167s`, duration `0.302417s`.
- s8 word timestamps: first phrase ends near `1.320s`; second phrase ends near `2.960s`; current frame boundaries are `43f` and `89f`.
- s3a scene is `[185f,321f)` and its cue is `[315f,321f)` after the current source-duration refresh; the cue ends exactly at the exclusive scene boundary and does not spill cross-shot.
- All other SFX intervals are bounded and post-voice according to `mix-plan.md`.

## Independent stem snapshot

- Voice stem: `/tmp/dung-bien-stems2.8IYBAo/voice-stem.wav`, built from all 16 current clips at the exact frame offsets and `VOICE_GAIN=1.6`; `ebur128` measures `-15.6 LUFS` before delivery normalization.
- BGM envelope stem: `/tmp/dung-bien-stems2.8IYBAo/bgm-stem.wav`, built from `bgm.mp3` with the exact hold/duck/fade expression; `ebur128` measures `-30.6 LUFS`, LRA `1.6 LU`.
- The independent stems confirm the voice/bed separation and the 2.10s BGM-zero ending before AAC encoding; the final-style mix preview confirms delivery loudness/peak after normalization.

## Isolated rendered-window measurements

These measurements use the same current stem snapshot as above, with `ffmpeg -ss/-t` windows matching the runtime contract. They are source-stem isolation checks for the final-style envelope, not claims that the stems are the delivered MP4.

| Window | Voice stem | BGM stem | Interpretation |
|---|---:|---:|---|
| s6b `[841f,943f)` / `28.033–31.433s` | `-15.6 LUFS` | `-30.6 LUFS` | `15.0 dB` voice/bed separation before delivery normalization |
| s10 BGM release `[1477f,1486f)` / `49.233–49.533s` | voice ended | ramped to `0.000` | 300 ms release, no abrupt cut |
| s10 BGM-only tail `[1486f,1549f)` / `49.533–51.633s` | voice ended | below measurable bed / zero envelope | `2.10s` BGM silence; paper-wind foley remains separately bounded `[1481f,1505f)` |

The integrated preview measures `-14.7 LUFS` and `-1.9 dBTP`; the explicit 6-frame attack/release ramps and bounded SFX windows are the anti-pumping/click contract. No isolated window contains an SFX cue overlapping a spoken voice window.

## Known accepted risk

The current clone ASR snapshot is `11/16` at CER `<=0.04`; `s1,s3a,s6a,s6b,s10` remain open due number-word/clone articulation errors. This is carried explicitly to Gate E/B/C and is not represented as a clean audio pass.
