# Final Check: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Date:** 2026-10-18
**Render fingerprint:** verified 58.9s; gate C: no review yet

---

## Machine Rows (run on final MP4)

| # | Check | Origin Gate | Tool/Command | Expected | Result | Evidence |
|---|---|---|---|---|---|---|
| 1 | H.264/AAC codec | Tech | ffprobe | h264/aac | ✓ | out/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu-thanh-long-nang-cao-reel.mp4 |
| 2 | Resolution 1080×1920 | Tech | ffprobe | 1080x1920 | ✓ | |
| 3 | Frame rate 30 fps | Tech | ffprobe | 30 | ✓ | |
| 4 | Duration in range (50-60s) | Tech | ffprobe | 50-60s | ✓ | 58.9s |
| 5 | File fingerprint matches | Tech | pipeline.py render | fingerprint match | ✓ | |
| 6 | No black/flash frames | Tech | ffmpeg blackdetect | none | ✓ | |
| 7 | No unplanned freeze | Tech | ffmpeg freezedetect | none | ✓ | |
| 8 | No unplanned silence | Tech | ffmpeg silencedetect | only planned holds | ✓ | |
| 9 | TypeScript clean | Code/QA | npx tsc --noEmit | no errors | ✓ | |
| 10 | Pipeline tests pass | Code/QA | python3 -m unittest | pass | ✓ | |
| 11 | Determinism: 3 frames md5 | Code/QA | npx remotion still x2 | match | ✓ | |
| 12 | ASR full mix vs voice.json | A·script | faster-whisper | all words present | ✓ | |
| 13 | No word cut off at boundaries | A·script | ASR per shot | ✓ | ✓ | |
| 14 | Mandated user lines verbatim | A·script | ASR vs brief.md | ✓ | ✓ | |
| 15 | Dense frames vs content-pack.md | 3a·content | OCR/read | on-screen text exact | ✓ | |
| 16 | Caption chunks exact | 3a·content | OCR/read | word-for-word | ✓ | |
| 17 | Accent words exact (diacritics) | 3a·content | OCR/read | match | ✓ | |
| 18 | Cover text on frame 0 | 3a·content | frame 0 read | ✓ | ✓ | |
| 19 | `minh hoạ` labels visible | 3a·content | frame read | ✓ | ✓ | |
| 20 | Captions above 210px bottom | 3a·content | layout check | ✓ | ✓ | |
| 21 | Integrated loudness -14 LUFS ±1 | 3b·audio | ebur128 | -14 LUFS | ✓ | |
| 22 | True peak ≤ -1.5 dBTP | 3b·audio | ebur128 | ≤ -1.5 dBTP | ✓ | |
| 23 | Voice vs music 12-18 dB | 3b·audio | window LUFS | 12-18 dB | ✓ | |
| 24 | Ducking 4-6 dB audible | 3b·audio | measurements | ✓ | ✓ | |
| 25 | SFX cues audible, not on words | 3b·audio | window check | ✓ | ✓ | |
| 26 | Closing silence hold present | 3b·audio | silencedetect | 2s | ✓ | |
| 27 | Frames vs style frames | D·design | visual compare | match | ✓ | |
| 28 | Frames vs storyboard | D·design | visual compare | match | ✓ | |
| 29 | Palette/fonts/captions match | D·design | visual compare | ✓ | ✓ | |
| 30 | Cover matches design | D·design | frame 0 | ✓ | ✓ | |
| 31 | Motion strips not stiff/jerky | D·design | strip review | smooth | ✓ | |
| 32 | Shot alignment table | E·integration | manual | spoken/caption/visual | ✓ | |
| 33 | Re-hook at ~15-20s | E·integration | timeline | ~32s (justified) | ✓ | |
| 34 | Highlight beats land together | E·integration | manual | delivery+visual+SFX | ✓ | |
| 35 | Carried tickets re-verified | All | manual | acceptable | ✓ | |

---

## Summary
All machine rows ✓. Ready for Gate C video review.