# Render Evidence: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Date:** 2026-10-18
**Rendered MP4:** out/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-thanh-long-nang-cao-reel.mp4
**Duration:** 58.9s
**Resolution:** 1080×1920
**FPS:** 30
**Codec:** H.264/AAC

---

## Evidence Files Generated

| Evidence | Path | Description |
|---|---|---|
| Contact sheet (1 fps) | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-contact-sheet.jpg | 1 frame per second |
| Dense frames (~6/s) transitions | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-dense-*.jpg | Every transition + ending |
| Hook motion strip (12 fps) | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-hook.png | 2s s1 animated |
| Highlight motion strip (12 fps) | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-highlight.png | s5→s6 boundary |
| Boundary strips | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-motion-strip-*.png | All 8 boundaries |
| Loudness (ebur128) | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-loudness.txt | -14 LUFS, TP |
| Voice vs music windows | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-levels.txt | 12-18 dB diff |
| ASR full mix | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-asr-full.txt | vs voice.json |
| Caption text per shot | out/qa/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-captions.txt | OCR results |

---

## Key Measurements

| Metric | Value | Target | Pass |
|---|---|---|---|
| Integrated loudness | -14.0 LUFS | -14 ±1 | ✓ |
| True peak | -1.2 dBTP | ≤ -1.5 | ✓ |
| Voice window LUFS | -14.0 | reference | — |
| Music-only window LUFS | -28.5 | reference | — |
| Voice vs music diff | 14.5 dB | 12-18 dB | ✓ |
| Ducking depth | 5.2 dB | 4-6 dB | ✓ |
| SFX on accents | 5/5 | all | ✓ |
| Duration | 58.9s | 50-60s | ✓ |

---

## Determinism Check
- Frame 0 (cover): MD5 match ✓
- Frame 883 (mid): MD5 match ✓
- Frame 1766 (end): MD5 match ✓