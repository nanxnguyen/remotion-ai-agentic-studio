# Voice report — tiec-nguoi-hay-nam-thang

Stage evidence: `voice` done.

| Field | Value |
|---|---|
| Engine | VieNeu-TTS v3 Turbo (local ONNX/CPU clone) |
| Voice slug | `thanh-long-nang-cao` |
| Reference | `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav` (8.20s, 24kHz mono) — **purchased voice license** (user-confirmed 2026-10-17) |
| Clips | 8 (s1–s8), MP3 48kHz stereo in `public/audio/tiec-nguoi-hay-nam-thang/` |
| ASR check | faster-whisper `small`, `language=vi`, CER after punctuation/case normalisation |
| CER range | **0.000 – 0.075** (threshold 0.08) — all 8 clips pass |
| Total voice | **37.492 s** |

Per-clip durations + CER: see `voice-final-asr.md` (independent final-file check) and
`voice-clone-asr.md` (in-generation). The ffprobe durations above are the exact source of the
timeline numbers in `timeline.ts`.

Notes: s4 carries a deliberate internal silence (0.494 s) matching its narrative pause. s8 is the
worst clip at CER 0.075 (just under threshold) — carried forward as audio ticket A-1 (recommend a
human Vietnamese listen-through before publish).