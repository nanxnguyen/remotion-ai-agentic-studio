# Audio review R1 — xay-doi-minh-hay-chung-minh (verdict: REVISE)

Reviewer: audio-reviewer (machine only, no listen). Clips measured as-is with ffprobe/ffmpeg/ebur128/silencedetect; spectrograms read back. No audio edited.

## Verified measurements (independent of voice-report)

- 16/16 voice.json keys have clips; ffprobe durations match voice-report to ≤0.01 s. Total voice 51.75 s, 194 syl, avg 3.75 syl/s.
- Recomputed timeline (measured voice + script holds incl. s6 lead-in 0.3): **total 59.95 s** — s10 start 51.26, s11 start 56.05, s9b voice start 48.51.
- silencedetect (-30 dB/0.6 s): pauses only in s2b 1.59–2.51 (0.92 s), s5b 3.30–4.21 (0.91 s), s8 2.53–3.43 (0.89 s), s10 2.56–3.46 (0.90 s) — all at punctuation, normal. No other dead air.
- Loudness (ebur128 I): -17.7…-19.2 LUFS across 16 clips = **1.5 LU spread (≤2 ✓)**. Peaks -3.3…-6.1 dBFS — **no clipping**. BGM -20.2 LUFS confirmed.
- Tails (last 100 ms RMS 3000–5000, max 9700–11400): natural decay, no hard cuts on s7b/s9b/s11/s5a1/s1.
- Spectrograms s7b/s9b (`qc/s7b-spec.png`, `qc/s9b-spec.png`): clean harmonic stacks, clear formants, no robotic buzz bands, no clicks. s10/s7b waveforms normal.
- Voice 24 kHz mono; BGM+SFX 44.1 kHz stereo (resample needed at mix — already in mix-plan).
- SFX source peaks match manifest (brick-b -2.3, chalk -0.8, glass -1.0, engrave -1.4 — all <0 dBFS and all play at ≤-16 dB gain: safe).
- Cue safety re-check vs measured voice: s7b chalk @2.25 lands in tail (voice ends 1.90 ✓ safe); s9a window-off @2.30 in 0.7 s gap (voice ends 1.94 ✓ safe); s9b bulb-hum whole-shot ✓; s1 bulb-hum ✓.
- Licences: 8 SFX = Mixkit trims per SC/assets/audio/ATTRIBUTION.md; BGM = own deterministic script. Recorded ✓.

## ASR judgement (CER>0.04 items)

s2b 0.067, s3 0.080, s5a2 0.089, s7b 0.108, s8 0.078, s10 0.044, s11 0.088. All are Southern final-mergers (gạch→gặt/gặp, tiếc→tiết, bát→bác, tối→tuối, mái→máy) and close-vowel confusions typical of faster-whisper-small on HoaiMy TTS. Watch-words correct: "story" ✓, "Còn lâu"/"còn lâu" ✓ everywhere, "Tết" ✓, "đặt" ✓. s9a mandatory v1 CER 0.000. Regen cannot fix any of these (identical text/voice/rate → identical bytes; edge-tts 403 anyway) — **no regen demanded**; tickets below are accept-or-timeline only.

## Scores

| # | item | score | evidence |
|---|---|---|---|
| 1 | completeness/duration | 8 | 16/16 ✓; 51.75 s + 7.9 s holds; but recomputed total **59.95 s vs 59.5 cap (+0.45 over)** |
| 2 | ASR/text fidelity | 7 | 7 keys CER>0.04, all accent/model mergers; watch-words + s9a perfect; s9b mandatory final-merge only |
| 3 | silence/gaps | 9 | 4 pauses verified at punctuation (~0.9 s); final holds live in timeline per plan |
| 4 | loudness/consistency | 9 | 1.5 LU spread, no clip, single voice, clean spectrograms |
| 5 | mix feasibility | 6 | BGM dawn ~3.3 s early; s2a/s3/s10 cues collide or drift (all TO FINALIZE); timeline over cap |
| 6 | artifacts | 9 | no clicks/buzz/cut tails on inspected clips |
| 7 | licences | 10 | all recorded and verified |

**Overall 8.3 → 8. Verdict: REVISE** (overall <9, open Trung tickets).

## Tickets (round 1, exhaustive)

- AUD-T1 | Trung | timeline total 59.95 s vs 59.5 s cap (voice 51.75 + holds 8.2 incl. s6 lead-in) | trim ≥0.5 s from unprotected holds only: s5a1 gap 0.3→0.15, s5b tail 0.4→0.25, s7b tail 0.5→0.35 (never s9 gap/holds, never final 2.0 s) | owner audio-agent | acceptance: recomputed total ≤59.5 s, protections intact
- AUD-T2 | Trung | BGM dawn (file 48 s) lands at video ~48.0 = s9a→s9b gap, ~3.3 s before s10 start 51.26 (BGM RMS 40–48 s 2489 vs 48–56 s 2592 confirms change at 48 s) | BGM offset +3.3 s in mix, or regenerate, or director accepts early dawn | owner audio-agent | acceptance: dawn entry within ±0.5 s of s10 voice start, or written accept
- AUD-T3 | Trung | s2a glass-clink @3.72 now ~0.4 s UNDER voice (voice ends 4.13) | shift cue to measured voice end +0.05 s | owner audio-agent | acceptance: cue onset ≥ voice end, inside gap
- AUD-T4 | Trung | s3 four cues (0.45/1.22/1.71/2.20 est) drift +0.3–0.5 s right after measured voice | re-anchor each to measured noun-end gaps (Từ đó, / lương tháng đầu / chiếc xe / tấm bằng) | owner audio-agent | acceptance: each onset within ±0.15 s of its gap
- AUD-T5 | Trung | s10 chalk @3.68 sits under stretched words "Ngay chỗ…" (voice 3.46–4.59 after 2.56–3.46 pause); brick-soft @2.30 needs confirmation (pause-anchored "đất" onset ≈2.30, coincidentally near est) | re-anchor brick to measured "đất" onset ±0.15 s; shift chalk to voice end +0.05 s | owner audio-agent | acceptance: brick ±0.15 s on "đất", chalk fully voice-free
- AUD-T6 | Thấp | s9b "tiếc"→ASR "tiết" (CER 0.031), mandatory verbatim line, Southern merge, regen impossible | no regen; director accepts accent rendering | owner voice-agent | acceptance: director sign-off
- AUD-T7 | Thấp | s7b 4.74 syl/s fastest + worst CER 0.108 (căn→đăng, ở→nhở) | machine cannot judge rushed delivery; no regen possible; accept or human-listen | owner voice-agent | acceptance: director accept / listen-confirm
- AUD-T8 | Thấp | s2b laughter SFX missing (no laugh in library, confirmed) | DROP the laugh (manifest rec b); hand-wave + text carry; only a licensed user-supplied laugh may be added, never synthesized | owner audio-agent + director | acceptance: cue table marks s2b laugh DROPPED
- AUD-T9 | Thấp | s2b/s3/s5a2/s8/s10/s11 CER 0.044–0.089 all vowel/final mergers, watch-words correct | accept as small-model artifacts; no regen | owner voice-agent | acceptance: listed accepted-noise in closure

A14 split decision: NOT needed — s5b and s10 internal pauses (0.91/0.90 s) already separate the phrases.

## Cannot verify by machine (non-blocking)

Tones/emotion/naturalness on all clips; whether s7b sounds rushed; whether a human ear hears "tiết/gặt/gặp/bác" as wrong words; bulb-hum reading as buzz vs static; SFX character (chalk/glass/brick) by ear.

## Round 2 (verify R1 tickets; verdict: PASS)

Reviewer: audio-reviewer round 2 (new clean context, machine only). Fresh ffprobe/ebur128/silencedetect math below. No audio files changed by fixes (offsets are mix-level) — voice clips re-measured identical to R1 (sum 51.754 s vs 51.75 reported ✓).

### Ticket verification (acceptance checks)

- AUD-T1 | CLOSED | total: voice 51.754 (fresh sum) + holds 7.45 = **59.20 s ≤ 59.5** ✓ (mix-plan line 3: trims s5a1 gap 0.3→0.15, s5b tail 0.4→0.25, s7b tail 0.5→0.35 = −0.45; s11 55.30+1.898+2.0 final = 59.198 ✓). Protections intact per mix-plan: s9 gap 0.7, 1.0 s hold after s9b, final 2.0 s untouched ✓.
- AUD-T2 | CLOSED | BGM offset +3.0 s: dawn file-48 s → video **51.0 s**. s10 start 50.51 (mix-plan) → Δ+0.49 ✓; 51.26 (R1 baseline) → Δ−0.26 ✓. Within ±0.5 s on both baselines. BGM 62.7 s + 3.0 offset covers to 65.7 ≥ 59.2 ✓ no length issue.
- AUD-T3 | CLOSED | s2a glass-clink cue 4.18 vs fresh voice 4.133 → **+0.047 s ≥ voice end**, inside 0.25 s gap ✓.
- AUD-T4 | CLOSED | s3 cues 0.41/1.37/2.15/2.85 vs manifest word-timestamped noun-ends 0.36/1.32/2.10/2.80 → each **+0.05 s, in-gap** (next-word gaps 0.26–0.30 s cited) ✓ within ±0.15. All < clip 4.850 ✓. (Word timestamps taken from producer measurement 2026-10-16; spot-plausible, no independent whisper re-run — small-model timing ±1 frame disclosed.)
- AUD-T5 | CLOSED | s10 brick-soft 2.46 = stated "đất" onset 2.46 ✓ ±0.00; onset sits just before pause 2.557–3.461 (fresh silencedetect: silence_end 3.461, dur 0.903) = end of "…xuống đất." sentence ✓ narratively plausible. Chalk 4.64 vs fresh clip end 4.594 → **+0.046 s, fully after s10 voice** ✓ (old 3.68-under-words gone).
- AUD-T6/T7/T9 (Thấp, director/voice accepts) | untouched per manifest, still Thấp — non-blocking, no evidence to dispute.
- AUD-T8 | CLOSED | laugh DROPPED in cue table (manifest line 32) ✓; no laugh file in dir listing ✓.

### Regression check (what fixes touched)

- Trimmed holds: only unprotected s5a1/s5b/s7b trims; s9/final protections intact — no regression.
- BGM offset side-effect: video 0–3.0 s has bulb-hum bed only, no BGM under hook; BGM fade-in 3.0→4.2 crosses s1→s2a boundary (s2a starts 3.51) at low bed level — disclosed tradeoff in mix-plan with written fallback (offset 0 + accept early dawn). Not a defect; director's choice recorded.
- Trimmed SFX tails bleed into next-shot heads at −22…−26 dB, all disclosed: s2a glass ~0.07 s into s2b head (−22), s7b chalk ~0.07 s into s8 head (−26), s10 chalk ~0.22 s into s11 head (−26). All ≥21 dB under voice — inaudible, no voice-word masking. Accepted as negligible.
- Loudness spot-check: s10 −18.8 LUFS integrated, TPK −4.4, within R1 band (−17.7…−19.2) — consistency intact, no clipping.

### NEW tickets

- AUD-N1 (NEW) | Thấp | s10 chalk 0.37 s trim ends ~0.22 s into s11 head, overlapping s11 voice onset ("Viên") at −26 dB | already only voice-free placement available (clip ends 4.594, shot ends 4.79); −26 dB is ~inaudible under voice | owner audio-agent | acceptance: keep as-is (negligible) or shorten trim to 0.2 s — director's call, non-blocking. (Raised for completeness; does not violate T5 acceptance intent, which was chalk clear of *s10* words.)

### Scores (round 2)

| # | item | score | evidence |
|---|---|---|---|
| 1 | completeness/duration | 10 | 16/16 ✓; 59.20 ≤ 59.5, protections intact |
| 2 | ASR/text fidelity | 7 | unchanged; mergers accepted-noise, watch-words correct |
| 3 | silence/gaps | 9 | s10 pause re-verified 2.557–3.461; no new dead air |
| 4 | loudness/consistency | 9 | s10 −18.8 LUFS in band, TPK −4.4, no clip |
| 5 | mix feasibility | 9 | dawn 51.0 ±0.5 ✓ both baselines; all cues anchored; tradeoffs disclosed |
| 6 | artifacts | 9 | no changes to audio files; R1 findings stand |
| 7 | licences | 10 | unchanged, verified R1 |

**Overall 9. Verdict: PASS** (overall ≥ 9, no open Cao/Trung; one NEW Thấp non-blocking). Report: `docs/xay-doi-minh-hay-chung-minh/audio-review.md`.
