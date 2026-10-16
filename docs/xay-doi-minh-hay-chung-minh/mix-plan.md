# Mix plan — xay-doi-minh-hay-chung-minh (global seconds MEASURED round 2: voice clips + trimmed holds; director timeline is source of truth for shot starts)
Targets: final -14 LUFS, TP <= -1.5 dBTP; BGM 12-18 dB under voice; extra duck 4-6 dB under voice, 150-300 ms ramps. BGM file measured -20.2 LUFS integrated 2026-10-16, so volume is its gain directly (voice clips -17.7…-19.2 LUFS per audio-review; voice 24 kHz mono — resample at mix).
AUD-T1 applied: s5a1 gap 0.3→0.15, s5b tail 0.4→0.25, s7b tail 0.5→0.35 (−0.45 s total; s9 gap 0.7, 1.0 s hold after s9b, final 2.0 s untouched). Recomputed total 59.20 s (clips+holds; 59.50 on reviewer's 59.95 baseline) — both ≤ 59.5 s cap.
AUD-T2 applied: BGM offset +3.0 s in mix (BGM starts at video t=3.0, 1.2 s fade-in). Dawn file-48 s → video 51.0 s: within ±0.5 s of s10 voice start on both baselines (50.51 clips-math, 51.26 review). Tradeoff: video 0–3.0 s has bulb-hum bed only, no BGM under the hook. Fallback accept (director says explicitly): offset 0 keeps BGM under hook but dawn lands ~3 s early in the s9b hold. BGM file (62.7 s) covers to video 65.7 — no length issue.
Measured shot starts (trimmed): s1 0.00 · s2a 3.51 · s2b 7.89 · s3 11.23 · s4 16.28 · s5a1 20.69 · s5a2 21.99 · s5b 24.92 · s6 31.07 · s7a 35.28 · s7b 38.29 · s8 40.54 · s9a 45.12 · s9b 47.76 · s10 50.51 · s11 55.30 · end 59.20.

| t (s) | event | BGM dB | linear |
|---|---|---|---|
| 0 -> 3.0 | no BGM (bulb-hum bed @ -24 only, E09 phone-audibility lift) | -inf | 0 |
| 3.0 -> 4.2 | fade-in | -inf -> -13 | 0 -> 0.22 |
| gaps/tails (no voice) | bed lifts | -9 (0.35) |  ramp 250 ms |
| voice speaking (s1-silence…s8) | bed (duck 4 dB below the gap level) | -13 | 0.22 |
| s7b tail 40.19-40.54 | slight swell | -9 | 0.35 |
| s8 end 44.92 -> s9a start 45.12 | down | -20 | 0.10 |
| s9a 45.12-47.76 (gap 0.7 after 47.06) | low | -20 | 0.10 |
| s9b voice 47.76-49.51 | lower | -26 | 0.05 |
| 49.51 -> 49.8 | to silence (hold to 50.51: only bulb hum) | -inf | 0 (ramp 250 ms) |
| s10 50.5 -> 51.7 | dawn returns, 1.2 s fade-in | -inf -> -15 | 0 -> 0.18 |
| s10-s11 voice | dawn bed | -15 | 0.18 |
| s11 56.8 -> 57.2 | fade-out under "...cho ai?" (voice ends 57.20) | -15 -> -inf | 0.18 -> 0 |
| 57.20 -> 59.20 | PURE SILENCE (no SFX, no BGM) | - | 0 |
Implement as piecewise `interpolate` on frame (30 fps) in Reel.tsx; keep `bgm` boolean inputProp convention. SFX gains per cue table (all <= -16 dB; bulb hum s1/s9b both -24 now, E09). No SFX in last 2.0 s.
