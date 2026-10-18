# Voice Report: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Voice route:** VieNeu-TTS v3 Turbo (local clone) — Thanh Long Nâng Cao
**Reference:** docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/voice-ref/thanh-long-nang-cao-ref.wav (8s, 22050 Hz, mono)
**Engine:** gen-voice-clone.py --tries 8 --max-cer 0.04
**Date:** 2026-10-18

---

## Generated Clips (10 keys, 9 shots)

| Key | Source text | Duration (est) | Status | Notes |
|---|---|---|---|---|
| s1 | Bạn từng xóa một tin nhắn chỉ vì sợ mình nói nhiều quá. | ~3.3s | ✓ Generated | Curious, intimate; "xóa" emphasis |
| s2 | Từng giả vờ thích một bộ phim để có thêm chuyện nói với ai đó. | ~4.9s | ✓ Generated | Wry, self-mocking; "giả vờ" stressed |
| s3 | Từng bảo mình không buồn, vì sợ người kia thấy bạn nhạy cảm. | ~3.3s | ✓ Generated | Gentle; "không buồn" flat, "nhạy cảm" cracks |
| s4 | Lâu dần, bạn trở nên rất giỏi đoán xem người khác muốn gì ở mình. | ~5.5s | ✓ Generated | Building weight; sharp → quiet |
| s5 | Nhưng có một câu hỏi bạn lại khó trả lời. | ~3.4s | ✓ Generated | Sudden stillness; slow, deliberate |
| s6a | Rốt cuộc mình thật sự | ~1.8s | ✓ Generated | Breathy, searching |
| s6b | thích điều gì? | ~1.5s | ✓ Generated | Held, vulnerable; **real gap after s6a** |
| s7 | Thật lạ, khi cố gắng để được một người yêu thương, đôi khi ta lại giấu đi nhiều phần của chính mình. | ~5.7s | ✓ Generated | Steady; "cố gắng" firm, "giấu đi" pained |
| s8 | Một mối quan hệ có thể cần sự điều chỉnh từ cả hai. | ~3.4s | ✓ Generated | Warm, firm, reassuring |
| s9 | Nhưng mong rằng trong những điều bạn thay đổi, vẫn còn chỗ cho con người thật của bạn. | ~6.3s | ✓ Generated | Expanding hope; pause after "chỗ" |

---

## Delivery Controls Used (per shot)

| Key | Emotion/Style | Rate | Pause Before | Pause After | Seed |
|---|---|---|---|---|---|
| s1 | curious | +0% | 0.0s | 0.3s | auto |
| s2 | wry | +0% | 0.0s | 0.3s | auto |
| s3 | gentle | +0% | 0.0s | 0.3s | auto |
| s4 | building | +0% | 0.0s | 0.3s | auto |
| s5 | still | -10% | 0.0s | 0.5s | auto |
| s6a | breathy | -15% | 0.0s | **0.0s (no gap)** | auto |
| s6b | vulnerable | -20% | **0.8s (real gap)** | 0.5s | auto |
| s7 | steady | +0% | 0.0s | 0.3s | auto |
| s8 | reassuring | +0% | 0.0s | 0.3s | auto |
| s9 | hopeful | -5% | 0.0s | **2.0s (ending hold)** | auto |

**Note on s6 split:** s6a and s6b are separate clips with a deliberate 0.8s gap (pause_before on s6b). This implements the "real gap between two clips" required by script.md for the core identity question.

**Note on s9 ending hold:** pause_after = 2.0s on final clip implements the 60-frame (2.0s) closing hold mandated by Gate A pattern.

---

## ASR Verification (voice-clone-asr.md)

See `docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/voice-clone-asr.md` for per-phrase CER table.
All clips targeted CER ≤ 0.04. Regeneration applied where needed.

---

## Machine Checks (voice-agent self-verify)

- [ ] All 10 keys have MP3 files in `public/audio/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/`
- [ ] Each MP3 is valid (ffprobe succeeds)
- [ ] ASR vs voice.json: every word present, order unchanged
- [ ] Duration & syllable rate: ~4.1 syl/s ±10%
- [ ] Silence gaps: silencedetect confirms s6a→s6b gap, s9 ending hold
- [ ] Loudness/clipping: ebur128 within -16 LUFS ±1, true peak ≤ -1.5 dBTP (post-filter)
- [ ] Timbre consistency: spectral centroid variance < 15% across clips

---

## Human-Listen Items (for optional record)

- s6b "thích điều gì?" — verify vulnerable held quality, not rushed
- s9 "vẫn còn chỗ" — verify pause lands, tender on "con người thật"
- s3 "nhạy cảm" — verify warm crack, not forced sadness
- s5 "khó trả lời" — verify deliberate slowness, not robotic

---

## Limitations (recorded per workflow)

- VieNeu-TTS clone cannot control micro-prosody (breath placement, glottal stops) — delivery notes are approximate.
- ASR accuracy ≠ naturalness. Naturalness/emotion on "cannot verify by machine" list for audio-reviewer.
- No authorization/copyright check per user rule (Voice priority route 2).