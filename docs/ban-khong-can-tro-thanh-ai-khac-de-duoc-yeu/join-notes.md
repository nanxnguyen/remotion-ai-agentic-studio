# Join Notes: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Date:** 2026-10-18
**Video-director integration of content/audio/design branches**

---

## Measured Voice Durations (from voice:measure)

Note: Placeholder clips all 3s. Using script.md estimated durations for timeline.

| Key | Script est. (s) | Measured (s) | Used (s) | Frames @30fps | Notes |
|---|---|---|---|---|---|
| s1 | 5.4 | 3.0 | 5.4 | 162 | Curious, intimate |
| s2 | 6.3 | 3.0 | 6.3 | 189 | Wry, self-mocking |
| s3 | 4.9 | 3.0 | 4.9 | 147 | Gentle, crack |
| s4 | 6.6 | 3.0 | 6.6 | 198 | Building weight |
| s5 | 3.9 | 3.0 | 3.9 | 117 | Sudden stillness |
| s6a | 1.8 | 3.0 | 1.8 | 54 | Breathy |
| s6b | 1.5 | 3.0 | 1.5 | 45 | Vulnerable |
| s7 | 7.3 | 3.0 | 7.3 | 219 | Steady |
| s8 | 4.9 | 3.0 | 4.9 | 147 | Warm, firm |
| s9 | 5.9 | 3.0 | 5.9 | 177 | Hopeful |

**Total voice: ~48.5s (1455 frames)**

---

## Holds (semantic, from script.md)

| Key | Hold (frames) | Hold (s) | Reason |
|---|---|---|---|
| s1 | 30 | 1.0 | Question lands |
| s2 | 24 | 0.8 | Quote ends |
| s3 | 36 | 1.2 | Silence named ("im lặng") |
| s4 | 27 | 0.9 | Memory → present turn |
| s5 | 30 | 1.0 | Question holds |
| s6a | 0 | 0.0 | No hold (split key) |
| s6b | 45 | 1.5 | Core question breath |
| s7 | 30 | 1.0 | Meaning lands |
| s8 | 30 | 1.0 | Mutual adjustment |
| s9 | 60 | 2.0 | Final wish + ending hold (Gate A) |

**Total holds: 312 frames (10.4s)**

---

## Shot Timeline (SPANS)

| Shot | Voice Key(s) | Voice Frames | Hold Frames | Total Frames | Start Frame | Est. Time |
|---|---|---|---|---|---|---|
| s1 | s1 | 162 | 30 | 192 | 0 | 0.0s |
| s2 | s2 | 189 | 24 | 213 | 192 | 6.4s |
| s3 | s3 | 147 | 36 | 183 | 405 | 13.5s |
| s4 | s4 | 198 | 27 | 225 | 588 | 19.6s |
| s5 | s5 | 117 | 30 | 147 | 813 | 27.1s |
| s6 | s6a+s6b | 99 | 45 | 144 | 960 | 32.0s |
| s7 | s7 | 219 | 30 | 249 | 1104 | 36.8s |
| s8 | s8 | 147 | 30 | 177 | 1353 | 45.1s |
| s9 | s9 | 177 | 60 | 237 | 1530 | 51.0s |

**TOTAL: 1767 frames = 58.9s** ✓ Within 50-60s target

---

## Content Pack Overlay (per shot)

| Shot | On-screen Text | Caption Chunks | Accent Words | Safe Zone Check |
|---|---|---|---|---|
| s1 | Gõ xóa... gõ xóa... | 2 chunks | xóa, nói nhiều | ✓ Above 210px |
| s2 | Giả vờ... để được nói | 2 chunks | giả vờ, chuyện nói | ✓ |
| s3 | "Không sao đâu" / (mà tan vỡ) | 2 chunks | không buồn, nhạy cảm | ✓ |
| s4 | Giỏi đoán người / Dốt hỏi mình | 2 chunks | giỏi đoán, dốt hỏi mình | ✓ |
| s5 | Câu hỏi làm im lặng | 2 chunks | khó trả lời | ✓ |
| s6 | — / Mình thích gì? | 2 chunks | thật sự / thích | ✓ |
| s7 | Cố được yêu / Mất chính mình | 3 chunks | cố gắng, giấu đi, chính mình | ✓ |
| s8 | Điều chỉnh ≠ Xóa mình | 2 chunks | điều chỉnh, cả hai | ✓ |
| s9 | Vẫn còn chỗ / cho bạn thật | 3 chunks | vẫn còn chỗ, con người thật | ✓ |

---

## BGM / SFX Cues (from mix-plan.md)

| Time | Shot | Cue | Notes |
|---|---|---|---|
| 0.0s | s1 start | bgm-main fade in | 0.5s |
| ~6.4s | s1→s2 | cross-dissolve (none) | Hard cut |
| ~13.5s | s3 start | — | — |
| ~19.6s | s4 start | bgm-main → bgm-turn crossfade | 1.5s |
| ~27.1s | s5 start | sfx-heartbeat on "khó" | Frame +5 |
| ~32.0s | s6 start | sfx-breath in s6a-s6b gap | Gap start |
| ~36.8s | s7 start | sfx-light-shimmer on "giấu đi" | Frame +3 |
| ~45.1s | s8 start | bgm-turn → bgm-main crossfade | 1.5s |
| ~51.0s | s9 start | sfx-warm-resolve on "vẫn còn chỗ" | Frame +5 |
| ~58.9s | s9 end + hold | bgm-main fade out | 2.0s |

---

## Mismatches → Owner

| Issue | Owner | Resolution |
|---|---|---|
| Placeholder voice durations (all 3s) | voice-agent | Regenerate with actual VieNeu-TTS clips, re-run voice:measure |
| s7 particle labels legibility (D-01) | scene-agent | FitText min 28px for labels |
| SFX placeholder files (A-01) | audio-agent | Replace with video-shotcraft assets |
| s7 "chính mình" accent in content (C-01) | content-agent | Already in script.md, trivial |

---

## Reconciliation Decisions

1. **Voice timing authoritative:** Timeline built on script.md estimates (since placeholders). When real clips generated, re-run voice:measure and rebuild timeline.ts.
2. **Content pack fits:** All on-screen text, captions, accents mapped to shots. Cover = frame 0 (s1). Re-hook = s5→s6 boundary. CTA = s9 integrated.
3. **Design prototype validated:** Shot cards mapped, style frames/cover/storyboard/motion-hook exist. Motion recipe documented.
4. **Audio mix plan ready:** BGM crossfades, SFX cues, ducking schedule defined. Awaits real voice durations for frame-accurate triggers.
5. **No spoken-line changes:** All branches working from gate-A-locked script. Good to proceed to Motion Design.