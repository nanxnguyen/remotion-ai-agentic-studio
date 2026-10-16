# Audio review R1 — chung-minh-de-lam-gi (machine verdict, no human listen)

Method: ffprobe + ebur128/volumedetect/silencedetect/astats on all 23 files; independent faster-whisper-small ASR (beam + greedy, word timestamps) vs canonical `voice.json`; spectrograms of s1/s2a/s7a. Voice-report figures replicated exactly (durations ±0.01, CER pattern, -16 LUFS claim refined below).

## Scores

| # | item | score | evidence |
|---|---|---|---|
| 1 | completeness/duration/rate | 10 | 15/15 clips; sum 49.55s, +6.05 holds = 55.60 ≤ 59.5 cap; rates 3.17–4.47 syl/s, outliers script-justified (s9a chậm-khẽ, s6/s7a natural TTS) |
| 2 | ASR vs canonical | 8 | no dropped/added words 15/15 in 2 pipelines; s1 trống→chống replicated (accepted-noise stands); 4 low-confidence substitutions p=0.54–0.70 (AR-06) |
| 3 | silence/dead-air | 9 | no internal silence >0.6s anywhere; s7b 0.46s = sentence-boundary pause, fine; s1/s2a clips start at 0.00 zero headroom (feeds AR-02/06); final 2.0s silence feasible (s11 end 53.60 → 55.60, BGM OFF from s10) |
| 4 | loudness/consistency/clipping | 7 | no clipping (true peaks ≤ -1.9); 14 clips -15.9…-16.6 LUFS but **s7a -20.2 LUFS (RMS -19.15 vs ≈-15.3)** → 4.3 LU spread > 2 LU bar (AR-01) |
| 5 | mix feasibility | 8 | bed math works at measured voice -16.4 LUFS (file -13/-9 → 16.9/12.9 dB under, in 12–18 band; recompute AR-04); duck 4 dB/250 ms fine; **s1 ting collides with first word** (AR-02); taps need word re-anchor (AR-03); drip-b 0.05s tail @≈-30 dB negligible; 24 kHz mono → resample (AR-05) |
| 6 | spectrograms/artifacts | 9 | s1/s2a/s7a imaged: clean harmonic speech, no clicks/buzz/cut tails; s7a uniformly quiet = level issue, not defect |
| 7 | licences | 7 | BGM own-work ✓; 7 SFX claim Mixkit per external ATTRIBUTION.md (SC/ absent from repo, unverifiable); keyboard.mp3 commercial-confirm open (AR-07); all 7 source files confirmed in skills lib |

**Overall 8.3 → verdict: revise** (pass needs ≥ 9 + zero open Cao/Trung).

## Tickets (round-1 exhaustive)

| id | sev | where | evidence | change | owner | acceptance |
|---|---|---|---|---|---|---|
| AR-01 | Trung | s7a.mp3 | int -20.2 LUFS, RMS -19.15 dB vs siblings ≈-15.3; peak -1.9 normal | per-clip +3.8 dB gain at mix (or voice-agent re-render) | audio-agent | post-gain int within ±1 LU of voice mean (-16.4), TP ≤ -1.5 |
| AR-02 | Trung | cue s1 ting @0.10 | first word "Được" [0.00–0.10] p=0.55, "công" from 0.10 — ting sits on hook's first words; manifest's own nudge rule fails (onset = 0.00) | move ting to mid-sentence pause ≈0.90 (gap 0.84–1.20) or drop to ≤ -24 dB | audio-agent | no SFX energy under first two words |
| AR-03 | Trung | cues s3 taps @1.07/2.15/3.22, applause/keys truncate, drip-b anchor | mid-voice transients placed without word-timestamp clearance | re-anchor all voice-overlapping cues to ASR word timestamps, nearest-gap rule | audio-agent | no transient peak inside a vowel nucleus; truncates = measured voice frames |
| AR-04 | Thấp | mix-plan BGM gains | plan assumes voice ≈ -18 LUFS; measured -16.4 | recompute: bed ≈ -11.1 dB file gain for 15-under | audio-agent | bed 12–18 dB under measured voice LUFS |
| AR-05 | Thấp | voice clips 24 kHz mono vs 44.1 kHz stereo timeline | ffprobe all 15 voice clips | resample at mix | audio-agent | no aliasing, shot starts unchanged |
| AR-06 | Thấp | s2a onset Th→Kh (word @0.00, p=0.70), s3 triền→triển p=0.67, s4b phăng phắc→phang phát + khen→khên p=0.54, s7a khen→khên p=0.55 | two independent pipelines split on these syllables; word counts match (substitutions only, Southern-merge family) | voice-agent documents F0/formant rationale or re-renders affected keys | voice-agent | third-decode or acoustic evidence accepts each syllable; zero drops/adds reconfirmed |
| AR-07 | Thấp | sfx-keys ← text/keyboard.mp3 | source marked 无法反查; SC/ + ATTRIBUTION.md absent from repo | confirm commercial use or replace sfx-keys | audio-agent (escalate producer) | licence confirmed in writing or replacement landed + re-verified |
| AR-08 | Thấp | s1 CER 0.054 accepted-noise | replicated in independent pipeline (same chống merge) | none — recorded, closed | voice-agent | — |

## Cannot verify by machine (non-blocking)

Naturalness, emotion, Southern-tinge delivery; ting reading as small metal (not sci-fi), drip-b as bathroom drip (not bubble), applause at -26 dB as distant warmth; BGM mood fit to story arc.

## Round 2 (machine re-check 2026-10-17, fresh ffprobe/ffmpeg; no Reel exists yet — all mix/cue checks are manifest-level, render checks carry to build)

Scope note (NEW): this video is pre-production — voice + audio design landed, no `src/videos/chung-minh-de-lam-gi/` Reel/timeline. Verification = fresh file measurements + manifest/mix-plan arithmetic. Render-time items (§carry) gate the build, not this round.

| ticket | verdict | fresh evidence |
|---|---|---|
| AR-01 (s7a +3.8 dB + limiter) | PASS | ebur128 re-measured: s7a −20.2 LUFS int / TPK −1.9 (canonical untouched ✓); siblings s1 −16.4, s2a/s3/s4a −16.5 → mean ≈ −16.4; −20.2+3.8 = −16.4 = mean exactly (±1 LU ✓). `alimiter limit=0.841` = −1.504 dB ceiling vs +1.9 dBFS naked peak → TP ≤ −1.5 ✓ (marginal, meets bar). |
| AR-02 (ting 0.10→0.90) | PASS (paper) | Cue tabled s1 offset 0.90, inside gap 0.84–1.20; first words Được [0.00–0.10] + công from 0.10 → 0.80 s clear, zero SFX energy under first two words ✓. 9 f @30 fps = 0.30 s → ends 1.20 = "sao" onset exactly; file 0.60 s so played truncated (mechanism = build-time durationInFrames, §carry). |
| AR-03 (taps/applause/drip-b) | PASS (paper, 1 note) | Offsets 1.51/2.29/3.13 all post-word-end (+0.05/+0.05/**+0.01** — NEW note: third is +0.01 not the tabled +0.05 rule, still inside gap 3.12–3.28, accepted). Truncates 8/7/5 f → end bleeds 0.04/0.00/0.02 s, all at baked fade tail and disclosed ✓. Applause 111 f = 3.70 ≈ voice 3.71 ✓; drip-b re-anchored 3.70 = last-word end +0.02 ✓. No transient inside a vowel nucleus by offset arithmetic. |
| AR-04 (bed −11.1 dB) | PASS | Recomputed (−16.4−15)−(−20.3) = −11.1 ✓ landed in mix-plan; bed plays −31.4 ≈ 15.0 dB under measured voice, in 12–18 band ✓. BGM file re-measured −20.3 int / TPK −10.1 ✓. |
| AR-05 (resample) | PASS (paper) | Recipe in mix-plan l20 (soxr → 44.1 k stereo, length-preserving); voice files still 24 kHz mono = canonical untouched ✓. |
| AR-07 (sfx-keys) | CLOSED | File ABSENT on disk ✓; zero live refs (only historical record). Remaining 6 trims all have confirmed URL rows in `docs/audio-attribution.md` (ll 85/108/109/138/160/162); keyboard.mp3 itself marked 无法反查 (l36) → drop was correct. BGM own-work. Nothing unlicensed ships. |

Regression (NEW): untouched cues intact (applause 0.0/−26/111 f, drip-a opt-in OFF, dropped list unchanged); final 2.0 s silence preserved (53.60→55.60, BGM OFF from s10, no SFX) ✓; SFX peaks re-measured exactly as tabled (ting −7.6, tap-a −1.4, tap-b −2.9, drip-b −9.2, applause −1.4) ✓; tap-a/tap-b md5-distinct (7ad58d… vs 0ab677…) ✓. AR-06/AR-08 voice-owned, out of scope, unchanged.

Rescores (NEW): item 4: 7→10 · item 5: 8→9 (paper-complete, render pending) · item 7: 7→10 · others unchanged (1:10, 2:8, 3:9, 6:9). **Overall 9.3 → verdict: PASS** (zero open Cao/Trung).

Carry to build gate (NEW, non-blocking here): (a) final −14 LUFS / TP ≤ −1.5 on with-BGM render; (b) durationInFrames truncation behavior incl. s1 ting 9 f; (c) BGM bed 12–18 under voice stems in render; (d) pure-silence tail 53.60–55.60.
