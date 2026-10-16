# Mix plan — chung-minh-de-lam-gi (measured clips 2026-10-17 + locked gaps/holds; director timeline is source of truth for shot starts)
Targets: final **-14 LUFS integrated, TP ≤ -1.5 dBTP**; BGM **12–18 dB under voice**; extra duck **4–6 dB under voice, 150–300 ms ramps**.
BGM file measured -20.3 LUFS int / TPK -10.1 (2026-10-17). Voice measured **-16.4 LUFS mean** (voice-report; s7a outlier corrected separately below) — AR-04 RECOMPUTE: nominal bed = voice − 15 dB ⇒ file gain = (−16.4 − 15) − (−20.3) = **−11.1 dB (0.279)**. Gap-lift = bed + 4 dB; s9a low = bed − 7 dB; s9b = bed − 13 dB. (Voice runs 1.6 dB hotter than the −18 assumption — SFX gains unchanged: transients ting/taps/drip-b peak −19…−26 dBFS out, applause texture −27.4, all still tiny.)
Measured shot starts: s1 0.00 · s2a 2.42 · s2b 6.05 · s3 9.44 · s4a 13.88 · s4b 17.84 · s5 21.94 · s6 24.58 · s7a 28.15 · s7b 31.46 · s8 35.18 · s9a 39.66 · s9b 43.74 · s10 47.07 · s11 50.26 · end 55.60. (Gaps/holds locked — gap s2a→s2b 0.20, s4a→s4b 0.25, lead-in s5 0.20, gap s7a→s7b 0.40, gap s9a→s9b 0.30, tails per script, final silence 2.0 s inviolable.)

| t (s, video) | event | BGM dB | linear |
|---|---|---|---|
| 0 → 1.2 | fade-in under hook | -inf → -11.1 | 0 → 0.279 |
| voice speaking (s1…s8) | bed (15.0 dB under measured voice; ducked 4 dB below gap level) | -11.1 | 0.279 |
| gaps/tails (no voice, s1…s8) | bed lifts | -7.1 | 0.442 (ramps 250 ms) |
| s4a 13.88–17.59 | applause bed moment: BGM stays bed (applause carries the lift, not BGM) | -11.1 | 0.279 |
| s9a 39.66–43.44 | down (night deepens) | -18.1 | 0.124 |
| s9a tail gap 43.44–43.74 | drip-b only, BGM holds low | -18.1 | 0.124 |
| s9b voice 43.74–46.67 | lower (question needs air) | -24.1 | 0.062 |
| 46.67 → 47.07 (0.40 tail) | fade to silence | -24.1 → -inf | 0.062 → 0 (ramp 250 ms) |
| s10 47.07 → s11 voice end 53.60 | OFF — dry voice only (starkest stretch; "trao quyền định giá" + final question land with no bed) | -inf | 0 |
| 53.60 → 55.60 | PURE SILENCE (no BGM, no SFX, no voice; s11 drip opt-in stays OFF by default) | — | 0 |

Implement as piecewise `interpolate` on frame (30 fps) in Reel.tsx; keep `bgm` boolean inputProp convention (deliver with- and without-BGM renders from the same timeline). SFX gains per cue table (all ≤ -16 dB; applause texture -26 dB). No SFX in last 2.0 s. BGM file (65.43 s) starts at video 0 and covers to end with margin — truncate, no loop, no offset.
Voice stem prep (AR-05): voice clips are 24 kHz mono — resample at mix with `ffmpeg -i sN.mp3 -af "aresample=44100:resampler=soxr" -ar 44100 -ac 2`; length-preserving (sub-ms), shot starts unchanged; encoder-priming residue covered by the §4.6 OUTPUT_AUDIO_OFFSET re-measure below. s7a stem additionally gets the AR-01 chain (`volume=+3.8dB` + `alimiter=limit=0.841` — see manifest; canonical clip untouched).
Alignment: apply sound-design §4.6 compensation at build — `Sequence.from = targetPeak − sourcePeakLag − OUTPUT_AUDIO_OFFSET_F` (reuse the pipeline-measured offset constant for this Remotion/codec/container chain; re-measure by §4.6 cross-correlation if any of the four changed). Source peak lags for the new trims (measure at build, attacks are near-head by construction): ting/tap-a/tap-b/drip-b ≈ 0–2 f; keys/applause beds exempt (texture, not peak-aligned). `Math.max(0, …)` guard stands; no cue sits within 2 f of video head except s1 ting (residual noted in manifest).
What remains for R2 machine re-check (voice-report.md has LANDED since round 0): (a) confirm BGM bed measures 12–18 dB under voice stems in the render (bed −11.1 dB file gain target); (b) re-run word-timestamp ASR on final stems (s7a post-gain change is mix-time, no new ASR needed for cues — cue anchors above are final); (c) verify final −14 LUFS / TP ≤ −1.5 on the with-BGM render and pure-silence tail 53.60–55.60.
