# Assets manifest — xay-doi-minh-hay-chung-minh (audio: BGM + SFX)

Files in `public/audio/xay-doi-minh-hay-chung-minh/` (disjoint with `sN.mp3`). Offsets are relative to shot start, ANCHORED to faster-whisper-small word timestamps measured 2026-10-16 (round 2; small-model timing ±1 frame, words confirmed against voice-report pauses). TO FINALIZE cleared on all voice-placed cues.

## BGM
| file | origin | license | notes |
|---|---|---|---|
| `bgm.mp3` (62.7 s, 44.1 kHz, -20.2 LUFS int. measured 2026-10-16, peak -10.5 dBFS/TPK, LRA 1.3) | Self-synthesized: `docs/xay-doi-minh-hay-chung-minh/analysis/gen-bgm-night.py` (numpy+ffmpeg, deterministic, no third-party audio) | Own work, no attribution needed | 60 BPM A-minor pad + 2 sparse bell notes/bar (night, 0-48 s) -> C-major pad + 4 bell notes/bar an octave up from 48 s (dawn, = s10 +0.6 s @est; TO FINALIZE — measured voice runs +3.6 s late by s10, dawn currently lands ~early, see verification note below). Distinct from camon `bgm-soft.mp3` (C-Am-F-G, 72 BPM, arpeggio). |

Why not the library: all 5 `SC/assets/audio/bgm` tracks are drum-driven house/hip-hop (already used by UA, gaplai, metkhong, cuoc-goi-nho-cua-me); wrong for a reflective, nocturnal, slow-tension film (S1). **No beat sync** (pad, no clear beat) -> no beat_data.json / grid_drift.json.

## SFX (all trimmed from `skills/video-shotcraft/assets/audio/sfx/`, Mixkit license per `SC/assets/audio/ATTRIBUTION.md`; re-encoded 128k, 44.1 kHz)
| file | source | dur | peak dB | role |
|---|---|---|---|---|
| `sfx-brick-a.mp3` | impact/hit-weak.mp3 (first 0.5 s) | 0.50 | -6.2 | soft "cop" brick |
| `sfx-brick-b.mp3` | impact/hit-blow.mp3 (0.5 s) | 0.50 | -2.3 | alternate brick |
| `sfx-brick-soft.mp3` | impact/hit-weak.mp3, lowpass 1.8 kHz | 0.50 | -7.6 | s10 "dat" brick, softer than all prior |
| `sfx-window-off.mp3` | ui/switch-light.mp3 (real switch, +6 dB) | 0.17 | -4.9 | window light "tach" |
| `sfx-engrave.mp3` | text/typewriter-hit-hard.mp3 (0.35 s) | 0.35 | -1.4 | chisel into base brick |
| `sfx-glass-clink.mp3` | glass/glass-hit-cine.mp3 (first 0.5 s) | 0.50 | -1.0 | glasses "cach" |
| `sfx-chalk.mp3` | text/chalk-line.mp3 (0.9 s) | 0.90 | -0.8 | chalk room flash / draw |
| `sfx-bulb-hum.mp3` | data/static-electric-present.mp3, lowpass 1.2 kHz | 3.90 | -12.8 | buzzing bulb (room tone; quiet source -> +gain below) |

Not found in library (do not fake): crowd laughter (s2b), alarm clock (s8), ladder creak (s5a2), fan/water/TV (s4/s5b), birds (s10). Only 3 crowd files exist (applause, clap, heartbeat).
Unverified by ear: all trims judged by waveform/levels only; audio-reviewer / optional audio-listen must confirm "bulb-hum" reads as a buzz, not static.

## SFX cue table
| shot | offset s | file | gain dB (linear) | durationInFrames | lands on |
|---|---|---|---|---|---|
| s1 | 0.0 | sfx-bulb-hum | -28 (0.040) | 105 (3.5 s = shot, was 114) | room-tone bed under hook (ANCHORED; trimmed to shot end, no bleed into s2a) |
| s2a | 4.18 | sfx-glass-clink | -22 (0.080) | 8 | voice ends 4.13, +0.05 s in 0.25 s gap (ANCHORED T3; 0.5 s sample trimmed to 0.27 s, ~0.07 s tail crosses s2b head at -22 dB — negligible) |
| s2b | - | (laugh) | - | - | DROPPED (AUD-T8): no licensed laugh in library; hand-wave + text carry it. Only a user-supplied licensed laugh may be added, never synthesized |
| s3 | 0.41 | sfx-engrave | -22 (0.080) | 11 | "Từ đó," ends 0.36, +0.05 (ANCHORED T4; next word 0.62) |
| s3 | 1.37 | sfx-brick-a | -20 (0.100) | 15 | "lương tháng đầu," ends 1.32, +0.05 (ANCHORED T4; next word 1.62) |
| s3 | 2.15 | sfx-brick-b | -23 (0.071) | 15 | "chiếc xe," ends 2.10, +0.05 (ANCHORED T4, alternate descending S2; next word 2.36) |
| s3 | 2.85 | sfx-brick-a | -26 (0.050) | 15 | "tấm bằng," ends 2.80, +0.05 (ANCHORED T4; next word 3.06) |
| s7b | 1.95 | sfx-chalk | -26 (0.050) | 11 (trim) | voice ends 1.90, +0.05 in 0.35 s tail (moved from 2.25 by T1 tail trim; ends 2.32, ~0.07 s into s8 head at -26 dB — negligible) |
| s9a | 2.30 | sfx-window-off | -16 (0.158) | 6 | mid-gap: voice ends 1.94, gap 0.7 (ANCHORED, unchanged — already safe) |
| s9b | 0.0 | sfx-bulb-hum | -24 (0.063) | 83 (2.77 s = voice 1.75 + hold 1.0, was 117) | the only sound in the 1.0 s hold (trimmed to hold end, no bleed into s10) |
| s10 | 2.46 | sfx-brick-soft | -27 (0.045) | 15 | "đất" onset 2.46 word-timestamped (ANCHORED T5, was 2.30; Δ+0.16) |
| s10 | 4.64 | sfx-chalk | -26 (0.050) | 11 (trim) | voice/clip ends 4.59, +0.05 (moved from 3.68 by T5 — old sat under "Ngay chỗ…"; 0.37 s trim ends ~0.22 s into s11 head at -26 dB — accepted, only voice-free placement) |
Tuning knobs: if voice-report shows a cue under a word, shift to the nearest gap; s3 nouns especially.

## Open issues (round 2 CLOSED where noted)
1. s2b laugh: DROPPED (AUD-T8 applied in cue table). Hand-wave + text carry it. Reopen only on a user-supplied licensed laugh (Mixkit/Freesound CC0); never synthesize a crowd.
2. BGM dawn: RESOLVED by mix offset (AUD-T2 — see mix-plan.md: BGM offset +3.0 s, dawn file-48 s → video 51.0 s, within ±0.5 s of s10 voice start on both timeline baselines). Fallback written accept: if director prefers BGM under the hook (video 0–3 s), keep offset 0 and accept dawn ~3 s early in the s9b hold — say so explicitly; do not silently split the difference.
3. Voice-dependent offsets: ANCHORED round 2 (word-timestamped); T6/T7/T9 are director/voice accepts, not audio.

## Verification 2026-10-16 (ffprobe + ebur128 + volumedetect; voice-report.md still missing)
All 9 files verified: durations/peaks/srates match the tables above exactly; no clipping anywhere (hottest peaks: chalk -0.8, glass -1.0, engrave -1.4 — all < 0 dBFS, and all play at <= -16 dB gain); BGM+SFX all 44.1 kHz stereo. BGM measured -20.2 LUFS int / TPK -10.5 / LRA 1.3. No beat grid (pad, no clear beat) — no beat_data.json, correctly skipped. All 7 SFX source files confirmed present in `SC/assets/audio/`; `sfx/crowd/` holds only applause/clap/heartbeat — no laughter, open issue 1 stands. Licences: 8 trims = Mixkit license per `SC/assets/audio/ATTRIBUTION.md`; BGM = own work (deterministic script above).
Voice clips (HoaiMy, read-only, NOT owned): 24 kHz mono, sum 51.75 s vs 47.3 s @4.1 est (+4.45 s). Measured per key: s1 3.11 · s2a 4.13 · s2b 2.99 · s3 4.85 · s4 4.21 · s5a1 1.15 · s5a2 2.63 · s5b 5.90 · s6 3.71 · s7a 2.61 · s7b 1.90 · s8 4.38 · s9a 1.94 · s9b 1.75 · s10 4.59 · s11 1.90. Biggest overruns: s5b +1.30, s2b +0.99, s10 +0.89, s3 +0.75. Cumulative drift puts s10 start at ~51.0 s video (vs 47.40 est, +3.6 s) and total video at ~59.6 s — borderline over the 59.5 s cap; director trims unprotected holds first (never s9 gap/holds or final 2.0 s). Consequences TO FINALIZE after voice-report: (a) s2a glass-clink @3.72 now lands ~0.4 s UNDER voice — shift to measured voice tail; (b) all four s3 cues shift right ~+0.3–0.5 s, re-anchor to ASR noun onsets; (c) s10 brick-soft target "đất" moves from est 2.20–2.44 to ~2.7–3.0 — MUST re-anchor to measured word onset ±0.15 s; (d) s10 chalk @3.68 may sit under stretched words; (e) BGM dawn at file 48 s now lands ~3 s early vs story (s9b hold/s10 start, not s10+0.6) — Phase 7 chooses: BGM offset +~3.5 s, regenerate, or accept. s9a window-off (gap-placed) and s9b bulb-hum (whole-shot) stay structurally safe. Voice 24 kHz mono will need resample in Phase 7 mix.

## Round 2 fixes 2026-10-16 (audio-review R1 tickets; word timestamps via faster-whisper-small on s3/s10)
s3 nouns: "đó," ends 0.36 · "đầu," ends 1.32 · "xe," ends 2.10 · "bằng," ends 2.80 (each followed by a 0.26–0.30 s micro-gap — cues at +0.05 sit in-gap). s10: "đất" onset 2.46 (2.46–2.62), clip ends 4.59, pause 2.6–3.5 matches voice-report. No audio files changed (offsets are mix-level; BGM regen off-limits — generator script outside writable set — so T2 solved by mix offset). Licences unchanged: 8 Mixkit trims + own-work BGM. No beat_data.json (pad, no beat — not faked). T6/T7/T9 untouched (director/voice).
