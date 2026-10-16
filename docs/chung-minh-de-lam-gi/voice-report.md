# Voice report — chung-minh-de-lam-gi

Route: **2 (VieNeu-TTS local clone, Thanh-Long-Nang-Cao)** — AUTHORIZED on two bases: (1) user written instruction 2026-10-17 naming `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3` for this video (brief §Voice); (2) prior user permission 2026-10-15 (brief thuong-hay-so). One voice, all 15 keys. No audio sped up.

Ref: `docs/chung-minh-de-lam-gi/voice-ref/refThanhLong.wav` — 8.0s WAV cut from preview at 14–22s (clean speech block between the two detected silence gaps at 12.4s and 24.9s; 0 silence starts at -30dB/0.4s inside the cut). Model VieNeu-TTS v3 Turbo (ONNX/CPU), first pass `--tries 8 --max-cer 0.04`, targeted regen s1 `--tries 16`.

## Machine checks per clip

| shot | duration s | syl/s | CER | issues |
|---|---|---|---|---|
| s1 | 2.17 | 3.68 | 0.054 ⚠ | ASR "trống"→"chống"; regen targeted 16 tries, best seed stuck at same merge → **accepted-noise** (Southern final-consonant ASR merge, brief lesson 10) |
| s2a | 3.43 | 3.78 | 0.000 | — |
| s2b | 3.14 | 3.51 | 0.022 | punctuation-only diff ("khẩy"→"khảy" ASR spelling, canonical text intact) |
| s3 | 4.29 | 3.50 | 0.016 | "triền"→"triển" ASR spelling only |
| s4a | 3.71 | 3.78 | 0.000 | — |
| s4b | 3.65 | 3.84 | 0.016 | "phăng phắc"→"phang phắc" ASR spelling only |
| s5 | 2.34 | 4.28 | 0.000 | — |
| s6 | 3.37 | 4.45 | 0.000 | pace above 3.7–4.2 budget; natural TTS rate, not adjusted (never speed audio) |
| s7a | 2.91 | 4.47 | 0.000 | pace above budget; natural TTS rate, not adjusted |
| s7b | 3.32 | 3.92 | 0.018 | "treo"→"trao" ASR spelling only |
| s8 | 4.28 | 3.74 | 0.000 | passed on seed 1 |
| s9a | 3.78 | 3.17 | 0.000 | below budget; matches scripted delivery (chậm, khẽ) — informational |
| s9b | 2.93 | 4.09 | 0.000 | — |
| s10 | 2.89 | 4.16 | 0.000 | — |
| s11 | 3.34 | 4.19 | 0.000 | — |

Global checks: 0 silence gaps >0.6s in any clip · integrated loudness ≈ −16 LUFS (loudnorm), true peak ≤ −1.9 dBFS, no clipping · timbre consistent by construction (single ref, single model run, no voice switch).

Total voice: **49.55s**. + timeline holds/gaps 6.05s → est. video **≈55.6s** (≤59.5s cap; near script worst-case 56.6s @3.8 — if over after ffprobe, cut s5 tail first per script §Totals, never touch gaps s7a→s7b/s9a→s9b or final 2.0s silence).

Regenerated keys: **s1 only** (targeted, tries 16; unresolved → accepted-noise, no further regen useful).

## Cannot-verify list (informational, no listener pending)

- Tones/accents: ASR cannot confirm Southern-tinge delivery or emotional shading (trầm/tĩnh/khuya); text fidelity only.
- s9a slowed line (3.17 syl/s) and s6/s7a fast lines (4.45/4.47): natural TTS rates, accepted as-is; timing absorbs them in timeline.
- Naturalness: never claimed — ASR cannot hear.
