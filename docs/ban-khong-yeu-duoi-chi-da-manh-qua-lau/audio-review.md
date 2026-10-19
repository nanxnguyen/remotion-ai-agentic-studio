# Audio review — ban-khong-yeu-duoi-chi-da-manh-qua-lau (Phase 3b, round 1)

Reviewer: audio-reviewer (clean context, machine-only; no human listen)
Inputs: voice.json (13 keys), voice-performance.json (accepted sidecar), voice-direction.md, voice-report.md, voice-clone-asr.md, mix-plan.md, assets-manifest.md, public/audio/<vid>/ (s1–s9, a1, bgm, 10× sfx), pipeline.py audit.

## Scores

| evidence group | score (1–10) |
|---|---|
| Technical fidelity | 4 |
| Performance evidence | 6 |
| Mix | 7 |
| **Overall** | **5** |

**Verdict: revise** — overall < 9 and open Cao/Trung tickets exist (AR-01…AR-06). Pass requires ≥ 9 with zero open Cao/Trung.

## 1 · Technical fidelity — 4/10

**Clip inventory vs voice.json (13 keys: s1 s2a a1 s2b s3 a2 s4 s5 s6 s7 s8 s9 s10).** Present: s1, s2a, a1, s2b, s3, s4, s5, s7, s8, s9 (48 kHz mono mp3, durations match mix-plan §2). **Absent: s6.mp3, s10.mp3, a2.mp3** — 3 of 13 canonical keys have no audio, so the timeline cannot be assembled and the 45–55 s budget (brief §1, planned 48.90 s) cannot be verified. voice-report.md and voice-clone-asr.md have no rows for s6, s10, a2.

**Measured loudness/true peak (10 present clips), ebur128 peak=true:**

| clip | dur s | I LUFS | TP dBFS |
|---|---|---|---|
| s1 | 2.758 | −19.8 | −2.2 |
| s2a | 2.323 | −20.8 | −4.5 |
| s2b | 1.958 | −20.0 | −4.6 |
| s3 | 3.454 | −20.1 | −2.4 |
| s4 | 2.112 | −20.4 | −3.7 |
| s5 | 1.736 | −20.6 | −3.3 |
| a1 | 2.556 | −20.2 | −2.6 |
| s7 | 2.809 | −20.3 | −3.7 |
| s8 | 0.659 | −20.5 | −4.4 |
| s9 | 3.159 | −20.3 | −2.8 |

Spread = 1.0 LU (≤ 2 LU ✓); no clipping (all TP ≤ −2.2 dBFS ✓); no dead air at clip start/end (silencedetect, noise −30 dB, d ≥ 0.1 s ✓). Internal clause silences match planned pauseAfterSeconds (s1 0.224 vs 0.22; s4 0.263 vs 0.24; s9 0.269 vs 0.26; a1 0.257 vs 0.24; s5 0.208 vs 0.18) ✓.

**ASR re-check (faster-whisper small, Vietnamese, vs canonical voice.json; my own pass, independent of voice-clone-asr.md):**

| clip | CER | WER | ASR vs canonical | gate ≤ 0.04 |
|---|---|---|---|---|
| s1 | 0.000 | 0.000 | exact | ✓ |
| s2a | **0.056** | 0.222 | "an ủi" → "ăn ủy" (tone on accent word) | ✗ |
| a1 | **0.061** | 0.200 | "chùng xuống" → "trùng xuống", "vai người" → "vài người" | ✗ |
| s2b | 0.000 | 0.000 | exact | ✓ |
| s3 | 0.000 | 0.000 | exact | ✓ |
| s4 | 0.000 | 0.000 | exact — "nhắn" heard correctly | ✓ |
| s5 | 0.000 | 0.000 | exact | ✓ |
| s7 | 0.021 | 0.083 | "Mà" → "và" (opening word substituted) | ✓ (CER) / word-change risk |
| s8 | 0.000 | 0.000 | exact | ✓ |
| s9 | **0.062** | 0.143 | "che ô" → "trẻ ô", "bị ướt" → "bị ớt" | ✗ |
| s6, a2, s10 | — | — | **no clip** | ✗ |

Judgement on voice-clone-asr.md deviations: s4 "nhắn → nhấn" (CER 0.077 there) is **not confirmed** by my pass (CER 0.000) — the branch's own ASR check produced a false positive; no voice fix for s4, but the ASR gate configuration is unreliable (see AR-11). s7 "che ô/quen" deviations: "quen → quên" not confirmed ("quen" heard correctly); "Mà → và" confirmed at low CER. s2a "an ủi", a1 "chùng xuống/vai người", s9 "che ô/bị ướt" are confirmed by both passes → genuine tone/vowel errors on accent words → **Cao**.

## 2 · Performance evidence — 6/10

voice-direction.md → voice-performance.json mapping is complete: every phrase carries tempoIntent, emphasis array, pauseBeforeSeconds/pauseAfterSeconds, and all 13 `reference` fields point to the single local refThanhLong.wav (route 2, denoise false, seed unset). Engine declares rate/pitch/volume/atempo unsupported, so **no mechanical atempo/pitch manipulation is possible** — a genuine positive, not an assumption.

Execution evidence: measured internal silences match the planned pauseAfterSeconds on every multi-phrase clip ✓; no clip is time-compressed (durations consistent with conversational delivery, not uniform cadence). What I **cannot** verify by machine: whether emphasis ("tìm đến bạn", "mệt quá", "phải là người ổn", "với bạn thế?…") and the slow/fast contours were actually rendered — no f0/centroid contour data exists in voice-report.md, and naturalness/emotion are not machine-verifiable (labelled below).

Discrepancy: voice-performance.json has `"seed": null` on every phrase, while voice-report.md records seeds 0/1 in "actual controls" — the sidecar does not record what was actually used, so the candidate policy (initial 1, max 3 per phrase, pinned-seed check) cannot be audited from the sidecar.

## 3 · Mix — 7/10

**BGM bed (bgm.mp3):** original repo synthesis (scripts/gen-bgm-soft.py, no third-party licence); whole-file −20.3 LUFS / TP −10.1 dBFS; played 43.90 s segment (offset 3.500 s) −20.1 LUFS / TP −10.6 dBFS / LRA 1.5 LU (mix-plan §3). No beat sync — measured degenerate (0 beats), cues pinned to voice timeline ✓ (analysis/no-beat-sync.md, grid_drift.json).

**Balance (mix-plan §3.1/§5):** file gain −15.20 dB (0.1738) → bed −35.3 LUFS integrated = **15.0 dB under voice** (−20.30 LUFS mean); ducked −40.3 LUFS = 20.0 dB under while speaking. Duck depth 5.0 dB (within 4–6 ✓), ramps 200 ms (within 150–300 ms ✓), duck hold 0.40 s after last clip so short intra-clip pauses (shortest 0.14 s in a2) are absorbed — no pumping by design ✓. Bed rises to 1.40× only in holds/closing (L3 swell), cut to zero at 43.900 s ✓ by plan.

**SFX:** 10 cues, Mixkit SFX Free License, 0 licence gaps (check-licences.py exit 0; ATTRIBUTION.md URLs registered), all trims peak-aligned with 4–60 ms in / 25–150 ms out fades, no volume > 1 ✓ (assets-manifest §2). check-cues.py exit 0: 11/11 cues inside silence windows, 0 word overlaps; loudest post-gain SFX −12.4 dBFS vs voice peak −2.2 dBFS ≈ 10 dB under ✓.

**Unverifiable / pending:** BGM_FILE_GAIN re-derivation at Phase 7 from the *complete* voice-report (anchored to n=10 today — mix-plan §7.1); cue re-base onto measured timeline (§7.2); OUTPUT_AUDIO_OFFSET_F measurement on first render (§6); closing silence (BGM = 0 from 43.900, no audio 43.90–48.90) can only be confirmed on the rendered MP4 (gate C/final-check).

## 4 · Fix list (round 1 — exhaustive)

| id | sev | where | evidence | change | owner | acceptance |
|---|---|---|---|---|---|---|
| AR-01 | Cao | public/audio/<vid>/s6.mp3, s10.mp3, a2.mp3 (absent); voice.json keys s6/s10/a2 | 3 of 13 keys have no audio; voice-report.md / voice-clone-asr.md lack rows; timeline unbuildable; SFX cues #7 (s6) and #11 (s10) unplaceable | Generate s6, a2, s10 via route 2 (refThanhLong.wav, denoise false), one candidate per phrase; then run CER/duration/loudness gate | voice-agent | Clips exist; ffprobe duration; ASR CER ≤ 0.04; loudness within −19.8…−20.8 LUFS; voice-report.md gains rows for s6, a2, s10 |
| AR-02 | Cao | voice-report.md | Covers only s4–s9 (7/13 keys); missing s1, s2a, a1, s2b, s3, a2, s6, s10 | Complete the report with all 13 keys (CER, duration, silence, LUFS-I, true peak, actual controls) | voice-agent | 13 rows; values match fresh ffprobe/ebur128/ASR measurements |
| AR-03 | Cao | s2a.mp3 ("Bạn biết cách an ủi.") | Independent ASR CER 0.056; "an ủi" heard as "ăn ủy" — tone error on accent word | Regenerate s2a phrase 1; verify "ủi" tone | voice-agent | Re-ASR CER ≤ 0.04; "an ủi" intact |
| AR-04 | Cao | a1.mp3 ("Vai người khác chùng xuống.") | Independent ASR CER 0.061; "chùng" → "trùng", "vai" → "vài" | Regenerate a1 phrase 1 | voice-agent | Re-ASR CER ≤ 0.04; "chùng xuống" intact |
| AR-05 | Cao | s9.mp3 (both phrases) | Independent ASR CER 0.062; "che ô" → "trẻ ô", "bị ướt" → "bị ớt"; corroborated by voice-clone-asr.md | Regenerate s9 phrases; check tones on "che ô" / "bị ướt" | voice-agent | Re-ASR CER ≤ 0.04 for s9 |
| AR-06 | Trung | s7.mp3 ("Mà vì bạn đã quen") | Independent ASR CER 0.021; opening word "Mà" → "và" changes contrastive meaning | Regenerate s7 phrase 1 | voice-agent | Re-ASR CER ≤ 0.02; first word is "Mà" |
| AR-07 | Trung | voice-performance.json (all phrases `"seed": null`) vs voice-report.md "actual controls" (seeds 0/1) | Actual seed/candidate per phrase not auditable; max-3-candidate and pinned-seed policy unverifiable | Record actual seed per phrase (or document null = engine default) in the sidecar | voice-agent | Every phrase has a seed value or documented null; consistent with voice-report.md |
| AR-08 | Thấp | s2b, s3, s7, a1 | Unplanned ~0.10 s internal silences measured (silencedetect) not in pauseBefore/After plan | Confirm engine padding vs natural speech; document or remove | voice-agent | Internal silences match plan or are documented; no undocumented gaps |
| AR-09 | Thấp | mix-plan.md §3.1/§7.1 | BGM_FILE_GAIN 0.1738 anchored to n=10 clips (mean −20.30 LUFS); s6/s10/a2 missing changes the mean | Re-derive bed gain from final voice-report.md via §3.1 formula at Phase 7 | audio-agent | Bed 12–18 dB under final measured voice LUFS (verified on render) |
| AR-10 | Thấp | mix-plan.md §4 cue #11 (sfx-cup-down, s10 clause gap) | 0.015 s headroom; s10 missing so offset unverified; any re-base risks collision with speech | Re-base cues on measured timeline; re-run analysis/check-cues.py; keep ≥ 0.10 s headroom | audio-agent | check-cues.py exit 0 on measured durations; #11 clear of speech |
| AR-11 | Thấp | voice-clone-asr.md s4 row (CER 0.077 "nhắn→nhấn") | My independent pass: s4 CER 0.000, "nhanne" correct — branch ASR check is unreliable and could mask real errors | Re-run ASR/CER gate with one documented configuration on all 13 clips; align voice-clone-asr.md with voice-report.md | voice-agent | One ASR table for all 13 clips; CER ≤ 0.04 everywhere; deviations corroborated before acting |
| AR-12 | Thấp | mix-plan.md §4.1 prose vs check-cues table | Prose says cue #2 drops "as mưa rơi đều lands"; check-cues places it after a2's end | Align prose with check-cues output | audio-agent | mix-plan prose and check-cues.txt agree per cue |
| AR-13 | Thấp | Ending behaviour (s10 last word 43.90, BGM cut at 43.900, 5.00 s silent tail) | Not measurable yet (no render; s10 missing) | Confirm on rendered MP4 in Phase 8 | audio-agent / render-agent | final-check.md closing row verified on render |
| AR-14 | Thấp | voice-report.md | No spectral-centroid/pitch data; cross-clip timbre consistency unmeasured | Add centroid/pitch-range per clip | voice-agent | Report includes centroid/pitch per clip; no outlier vs cluster |

## 5 · What I could not verify (not blocking)

- Naturalness, intimacy, emotion, and whether emphasis contours were actually rendered — no listening possible; machine evidence covers timing, levels, CER only.
- Cross-clip timbre consistency (spectral centroid/pitch) — no data in voice-report.md (AR-14).
- BGM near-silent tail and last-word stop at 43.900 — requires the rendered MP4 (AR-13).
- Actual seeds/candidates used per phrase — sidecar records null (AR-07).

## Pipeline

```
python3 -I scripts/pipeline.py review ban-khong-yeu-duoi-chi-da-manh-qua-lau audio 5 --reviewer audio-reviewer --report docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/audio-review.md --verdict revise
python3 -I scripts/pipeline.py gate ban-khong-yeu-duoi-chi-da-manh-qua-lau audio   (expected: not passed — gate follows the revise verdict)
python3 -I scripts/pipeline.py agent ban-khong-yeu-duoi-chi-da-manh-qua-lau audio-reviewer done --stage audio
```
