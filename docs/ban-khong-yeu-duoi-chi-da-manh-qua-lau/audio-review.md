# Audio review — ban-khong-yeu-duoi-chi-da-manh-qua-lau (Phase 3b, round 2 of fix loop)

Reviewer: audio-reviewer (fresh clean context; machine-only, no human listen; did not produce any input file).

## Round-1 history (short)

Round 1 scored **5.0/10, revise**: 3 of 13 voice keys had no clip (AR-01), `voice-report.md` covered only 8 keys (AR-02), suspected tone errors on s2a/a1/s9 and a meaning change on s7, `seed: null` everywhere (AR-07), and carried Thấp items AR-08…AR-14 + NEW-15. The producer then regenerated s2a, s6, s7, s9, a2, s10, rewrote `voice-report.md`, `voice-clone-asr.md` and `voice-performance.json`, and the round-2 reviewer verified every ticket by its acceptance check on current disk state. Two contested-pronunciation words were adjudicated with a two-model ASR panel (see §4); the director's ruling applies: AR-09/10/12/13 stay open as carried-forward Thấp closing at Phase 7/8 and do not block this gate.

## Method and decode configuration (exact)

- ffprobe durations; `ebur128` (peak=true) loudness/true peak; `silencedetect -30 dB, d>=0.1 s`.
- ASR panel: `Systran/faster-whisper-small` **and** `Systran/faster-whisper-large-v3`, `language=vi`, `device=cpu`, `compute_type=int8`, `beam_size=5` (plus `beam_size=1` cross-check), `vad_filter=False`, `temperature=0.0`, `condition_on_previous_text=True`, `word_timestamps=False` (plus `True` cross-check). Audio decoded via ffmpeg to f32le mono 16 kHz numpy (`faster_whisper.audio.decode_audio` is broken with av 19.0.1).
- CER = Levenshtein distance after lowercase + punctuation/ellipsis/quote stripping + whitespace collapse, per whole clip vs canonical `voice.json`.
- Word adjudication adds isolated raw-phrase WAVs (`public/audio/<vid>/raw/`) through the same panel, and `librosa.pyin` F0 contours (fmin 65, fmax 300 Hz) on word-aligned segments.

## Scores

| evidence group | score (1–10) |
|---|---|
| Technical fidelity | 8 |
| Performance evidence | 9 |
| Mix | 9 |
| **Overall** | **8** |

**Verdict: revise.** Overall 8 < 9 and two Cao tickets remain open (AR-03, AR-04) — both are **confirmed real pronunciation deviations**, and per the fix-loop rule the only allowed remedies are director decisions: (a) a different reference cut, (b) a director-granted new seed budget, or (c) reopening gate A for wording. In-cap regeneration is exhausted (s2a seeds 0–9; a1 seeds 0–20 across 4 splits, per `voice-report.md` §4) and must not be demanded. Round 1 was 5.0; no regressions were found this round.

## 1 · Technical fidelity — 8/10

**Inventory: 13/13 keys have clips** (fix of AR-01/AR-02 verified). All 48 kHz mono mp3, no clipping (max true peak −2.20 dBFS), loudness spread −20.8…−19.8 = 1.0 LU ≤ 2 LU.

| clip | dur s | I LUFS | TP dBFS | CER small | CER large-v3 | internal silence vs plan |
|---|---:|---:|---:|---:|---:|---|
| s1 | 2.758 | −19.80 | −2.20 | 0.0000 | 0.0000 | 0.224 vs 0.22 ✓ |
| s2a | 2.348 | −20.40 | −5.50 | 0.0278 | 0.0278 | 0.440 (2 gaps, documented §2) |
| a1 | 2.886 | −20.80 | −3.60 | **0.0408** | **0.0408** | 0.370 (gaps documented §2) |
| s2b | 1.958 | −20.00 | −4.60 | 0.0000 | 0.0000 | 0.102 engine-internal, documented |
| s3 | 3.454 | −20.10 | −2.40 | 0.0000 | 0.0000 | 0.407 (gaps documented §2) |
| a2 | 1.491 | −20.10 | −3.80 | 0.0000 | 0.0000 | 0.169 vs 0.14 ✓ |
| s4 | 2.112 | −20.40 | −3.70 | 0.0000 | 0.0000 | 0.263 vs 0.24 ✓ |
| s5 | 1.736 | −20.60 | −3.30 | 0.0000 | 0.0000 | 0.208 vs 0.18 ✓ |
| s6 | 2.207 | −20.30 | −2.80 | 0.0303 | 0.0000 | 0.312 (gaps documented §2) |
| s7 | 2.828 | −20.70 | −3.80 | 0.0000 | 0.0000 | 0.368 (gaps documented §2) |
| s8 | 0.659 | −20.50 | −4.40 | 0.0000 | 0.0000 | none ✓ |
| s9 | 3.491 | −20.50 | −3.00 | 0.0154 | 0.0000 | 0.485 (gaps documented §2) |
| s10 | 3.489 | −20.40 | −3.50 | 0.0000 | 0.0000 | 0.312 vs 0.30 ✓ |

- **Gate ≤ 0.04:** 12/13 clips pass on both models except a1 (0.0408, fails by 0.0008 — tied to AR-04). s7 special gate (≤ 0.02, first word "Mà") passes: both models transcript "mà vì bạn đã quen…", CER 0.0000.
- **Phrase concatenation:** `" ".join(phrases) == voice.json[key]` verified byte-exact for all 13 keys (AR-07 acceptance). Native raw WAVs exist for all 29 phrases (48 kHz pcm_s16le), `denoise: false` everywhere; `gen-voice-clone.py:436` confirms the chain is TRIM/concat/libmp3lame only — no atempo, pitch, EQ or loudnorm (s6 +0.5 dB, a2 −1.0 dB are static encode gains). Pinned seed is not exempt from any check above.
- **Timeline budget:** 127 syllables over 31.418 s speech = **4.04 syl/s overall**, inside the brief's validated 3.29–4.43 syl/s band, so the 45–55 s budget (planned 48.90 s incl. pauses/transitions/5.00 s ending hold) holds on measured files; per-clip rate 3.46 (a1, deliberately slow) – 4.60 (s2b). Full-timeline verification belongs to Phase 7. The final-question silence hold (≥ 1.2 s after s10's last word, BGM near-silent) is timeline/render-level — carried under AR-13.
- **TP ruling (requested by `voice-report.md` §5):** the task-template line "TP > −3 dBFS = fail" is stricter than the repository's binding no-clipping bar. Ruling: the repo bar governs — no clipping, max TP −2.20 dBFS — so s1 (−2.2), s3 (−2.4), s6 (−2.8) are **accepted**; the template line does not block.
- **Stale provenance (NEW-16):** `.voice-input-manifest.json` predates the regeneration: s2a/s7/s9 sha256 mismatch the files on disk; a2/s6/s10 are absent from it. Non-blocking for audio quality, but reproducibility audits break.

## 2 · Performance evidence — 9/10

- **Direction → sidecar:** `voice-performance.json` complete — 28 phrases, each with `tempoIntent`, `emphasis`, pause fields, a concrete `seed` matching `voice-report.md` §4 (s2a p2 = 9, a1 p2 = 8, s9 p2 = 3 …), the single route-2 reference, `denoise: false`; `postProcessingRestrictions` present; unsupported controls (rate/pitch/volume/atempo/style/directEmotion) declared and demonstrably never sent. No silent control drops, no acting cues spoken aloud, no caption-chunk synthesis (phrases are script clauses), candidate cap 3/3 respected with pinned seeds recorded.
- **Execution evidence:** measured silences match planned pauses or are documented in `voice-report.md` §2 (AR-08); durations fit conversational delivery; no clip time-compressed.
- **Not machine-verifiable (non-blocking):** naturalness, intimacy, emotion, and whether emphasis/slow-fast contours were rendered — "not verified by listening".

## 3 · Mix — 9/10

- **BGM:** repo-synthesised (`gen-bgm-soft.py`), 60.430 s; played segment (3.5→47.4 s) −20.1 LUFS, TP −10.6 dBFS, LRA ~1.5. No beat sync (measured 0 BPM; cues pinned to voice timeline).
- **Balance re-derived on the complete n=13 voice set (AR-09 evidence):** base gain −15.20 dB (0.1738) → bed −35.3 LUFS = **15.0 dB under** final voice mean −20.35 LUFS (inside 12–18 ✓); ducked −40.3 = 20.0 dB under; duck depth 5.0 dB (4–6 ✓), ramps 200 ms (150–300 ✓), 0.40 s duck hold absorbs all intra-clip pauses; bed cut at 43.900 s. Arithmetic holds on measured files; render-level confirmation stays with Phase 7/8 (AR-09/AR-13 carried per director ruling).
- **SFX:** `check-cues.py` exit 0 — 11/11 cues inside silence windows, 0 word overlaps (AR-10 evidence); loudest post-gain SFX −12.4 dBFS ≈ 10 dB under voice peak; `check-licences.py` exit 0 — 10 URLs + 10 sources + BGM recorded, 0 gaps; substitutions declared openly.

## 4 · Four-word pronunciation adjudication (decisive, two-model panel)

Decode config as in Method; "4/4" = beam 5/1 × word_timestamps on/off; clip-level is primary, isolated raw phrase is corroboration (single-word TTS extracts are context-poor and weigh less); F0 is independent acoustic evidence.

| word (phrase) | small, clip | large-v3, clip | isolated raw phrase | F0 evidence | verdict |
|---|---|---|---|---|---|
| **"an ủi"** (s2a p2) | "an ui" 4/4 | "an ui" 4/4 (word ts " ui,") | both models "An ui" 4/4 | "ủi" falls 155→117 Hz with **no hỏi rise-back**; "an" flat 127–133 (ngang ✓) | **real** — hỏi tone not realized; both models hear ngang "ui" in 16/16 decodes |
| **"chùng xuống"** (a1 p2) | "trùng xuống" 4/4 | "trùng xuống" 4/4 | both models "Người khác trùng xuống." 4/4 | initial-consonant pair (ch/tr), F0 not discriminating; numeric gate fails: a1 CER 0.0408 > 0.04 | **real** — ch→tr initial deviation in 16/16 decodes (note: ch/tr merge is common in Northern speech; perceptual acceptability is a human/gate-A question) |
| **"che ô"** (s9 p2) | "chè ô" 4/4 | **"che ô" 4/4** (s9 large-v3 CER 0.0000) | large-v3 splits by beam (5: "Chè", 1: "Che"); small outputs garbage ("Che Âu"/"Chạyâu") | word-aligned "che" F0 140/142/151 Hz — flat, high, ngang cluster; huyền controls in-clip fall to 82–85 Hz, "che" never below 128 | **asr-noise** — small-only confusion; ngang present per large-v3 + F0 |
| **"nhắn"** (s6 p3) | "nhấn" 4/4 | **"nhắn" 4/4** (s6 large-v3 CER 0.0000) | both models unreliable (Nhấn/Nhanh/Nhân/Để) | "nhắn" F0 [102,94,85,80,73] **falling** — nhấn (sắc) would rise; fall consistent with hỏi | **asr-noise** — small-only tone confusion; falling contour contradicts sắc |

Consequences: **AR-03 and AR-04 stay open Cao (real)**; **AR-05 and the s6 half of AR-11 close as asr-noise with the evidence above**. No in-cap regen may be demanded; the fix is a director choice among (a) different reference cut, (b) new seed budget, (c) reopen gate A for wording.

## 5 · Closure table (all round-1 tickets + NEW-15)

| id | sev | status | evidence (this round) |
|---|---|---|---|
| AR-01 | Cao | **fixed** | s6/a2/s10 exist; ffprobe 2.207/1.491/3.489 s; large-v3 CER 0.0000/0.0000/0.0000 (small 0.0303/0.0000/0.0000); loudness in band; voice-report §1 has 13 rows |
| AR-02 | Cao | **fixed** | `voice-report.md` now 28 phrase rows + 13-key gate table; durations/LUFS/TP/silences match my fresh ffprobe/ebur128/silencedetect within rounding |
| AR-03 | Cao | **not fixed — real, stays open** | "an ủi"→"an ui" in 16/16 decodes (2 models × clip + raw × 4 configs); F0: hỏi rise-back absent. Director options only: (a)/(b)/(c) |
| AR-04 | Cao | **not fixed — real, stays open** | "chùng"→"trùng" in 16/16 decodes; a1 CER 0.0408 > 0.04 on both models. Director options only: (a)/(b)/(c) |
| AR-05 | Cao | **fixed (asr-noise)** | s9 regenerated; large-v3 CER 0.0000 "che ô… bị ướt" correct 4/4; small "chè ô" contradicted by F0 ("che" high/flat, never < 128 Hz vs huyền floor 82–85) |
| AR-06 | Trung | **fixed** | s7 regenerated; both models CER 0.0000, first word "Mà" (≤ 0.02 gate met) |
| AR-07 | Trung | **fixed** | every phrase carries a concrete seed matching `voice-report.md` §4; join rule byte-exact for all 13 keys |
| AR-08 | Thấp | **fixed** | `voice-report.md` §2 documents every internal silence ≥ 0.1 s with classification; matches my silencedetect; engine tails kept by stated policy |
| AR-09 | Thấp | **open (carried, per director ruling)** | gain re-derived on n=13: bed 15.0 dB under voice (inside 12–18) — arithmetic holds; render-level confirmation at Phase 7/8 |
| AR-10 | Thấp | **open (carried, per director ruling)** | `check-cues.py` exit 0 on current measured durations (11/11, 0 overlaps); final re-base confirmation at Phase 7/8 |
| AR-11 | Thấp | **fixed** | `voice-clone-asr.md` one documented config, all 13 clips; my two-model panel corroborates deviations: s4 "nhắn" correct both models; s6/s9 deviations are asr-noise (§4) |
| AR-12 | Thấp | **open (carried, per director ruling)** | prose-vs-check-cues alignment is Phase 7/8 work |
| AR-13 | Thấp | **open (carried, per director ruling)** | ending silence hold/BGM cut verifiable only on the rendered MP4 (Phase 8) |
| AR-14 | Thấp | **not fixed (partial)** | cluster stats added (median centroid ~1099 Hz, f0 p50 ~115 Hz) but acceptance asked for **per-clip** values; my independent pass: centroids 938.6–1395.2 Hz (median 1113.4), f0 p50 102–130 Hz, s9 only z>2 centroid outlier — content-explained (s9 is longest, fricative-heavy "che ô… ướt"), f0 in cluster; no timbre break. Add a 13-row centroid/f0 column to §3; non-blocking |
| NEW-15 | Thấp | **fixed** | sidecar now documents `refThanhLong.wav` at 7.741 s = ffprobe (was 8.20 s) |

Counts: **8 fixed, 7 open (2 Cao real + 5 Thấp carried/partial), 0 disagree.**

## 6 · NEW tickets (round 2)

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| NEW-16 | Thấp | `public/audio/<vid>/.voice-input-manifest.json` | sha256 mismatch for s2a/s7/s9 (regenerated after manifest write); a2/s6/s10 absent | Regenerate the manifest for all 13 current clips | voice-agent | sha256 matches disk for all 13 keys; no missing entries |

No other genuinely new failures; regressions vs round 1: none (every changed clip re-measured clean).

## 7 · What I could not verify by machine (non-blocking)

- Naturalness, intimacy, emotional delivery, emphasis and slow-fast contours — "not verified by listening".
- Whether a human ear accepts the "chùng/trùng" initial (Northern ch/tr merge) and the truncated hỏi on "ủi" — machine says real; perceptual acceptability is the director's gate-A call.
- Ending silence hold ≥ 1.2 s after the last word with BGM near-silent — requires the rendered MP4 (AR-13).
- Cross-clip speaker identity at perceptual level — whole-clip statistics only.

## Pipeline

```
python3 -I scripts/pipeline.py review ban-khong-yeu-duoi-chi-da-manh-qua-lau audio 8 --reviewer audio-reviewer --report docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/audio-review.md --verdict revise
python3 -I scripts/pipeline.py gate ban-khong-yeu-duoi-chi-da-manh-qua-lau audio   (expected: not passed — open Cao AR-03/AR-04; director decision needed on fix path (a)/(b)/(c))
```
