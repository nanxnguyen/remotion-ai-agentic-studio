# Mix plan — cuoc-goi-nho-cua-me

Cập nhật: 2026-10-17, đồng bộ timeline v4 1308f. Nguồn số: `timeline.ts` (SFX offsets), `Reel.tsx`
(âm lượng), `assets-manifest.md` (đặc tính file, volumedetect 2026-10-14).

## BGM — `bgm.mp3`

- Đường 104.31s, mean −16.7 dB, max −1.4 dB (native) — max < 0 dB ✅
- Âm lượng trong mix: **bed 0.05** (ramp `interpolate(f, [0, 40, CGN_TOTAL-60, CGN_TOTAL], [0, 0.05, 0.05, 0])`) — vào 1.33s, fade-out 2s tận cùng.
- **Không ducking động** — bed 0.05 đủ mỏng để giọng (full 1.0) nổi trực tiếp; dữ kiện tổng: `ebur128` cả bài −13.9 LUFS / peak −1.5 dBFS ⇒ không lấn giọng.
- Hold lặng s8 (~1.4s trước outro) nằm TRONG bed 0.05, không tắt hẳn BGM.

## Voice — `s1..s8.mp3`

- Full volume 1.0, mỗi clip bắt đầu tại `shot.from + 4f` (CGN_VOICE_OFFSET), không nén động.
- Padding giữa clips: +0.5s pause mỗi shot (trừ s1 hold +15f hook, s8 +1.4s outro + hold 30f).
- ASR sau regen (2026-10-17, `voice-clone-asr.md`): CER 0.012–0.037 ≤ 0.04 toàn bộ — biên bản nghe-máy thay cho "tai tổng hợp".

## SFX cue table (7, mức đổi = 0.16–0.2 từ assets-manifest; offset ĐỐI ĐẦU SHOT theo timeline v4)

| # | Cue | File | Offset | Vol | Nhiệm vụ | Kiểm tra trong dur mới |
|---|---|---|---|---|---|---|
| 1 | `sfx-missed-call.mp3` | countdown bleeps | s1 + 5f | 0.18 | chuông gọi nhỡ trên hook | 5+95 ≤ s1 115f ✅ |
| 2 | `sfx-hangup-tap.mp3` | switch-click quick | s2 + 8f | 0.20 | tay bấm tắt | 8+31 ≤ 101f ✅ (1.04s) |
| 3 | `sfx-chat-notif.mp3` | message pop | s3 + 5f | 0.18 | bong bóng "Lát con gọi lại nha." | 5+32 ≤ 184f ✅ |
| 4 | `sfx-typing.mp3` | digital typewriter | s3 + 40f | 0.16 | gõ trả lời / làm nốt việc | 40+56 ≤ 184f ✅ (1.85s) |
| 5 | `sfx-callback-ring.mp3` | hi-tech bleep | s5 + 5f | 0.20 | gọi đi, "Đang gọi — Mẹ" | 5+21 ≤ 172f ✅ (0.69s) |
| 6 | `sfx-pickup.mp3` | ui-select click | s5 + 45f | 0.20 | mẹ bắt máy + ấm lên, chuông dừng | 45+33 ≤ 172f ✅ |
| 7 | `sfx-warm-chime.mp3` | crystal chime | s8 + 120f | 0.16 | chốt "Một cuộc gọi lại thôi…" + "Đã gọi lại ✓" | 120+60 ≤ 252f ✅ (2.0s) |

- s4 / s6 / s7 cố ý **lặng SFX**, chỉ bed BGM — mood thủ thỉ (quyết định giữ nguyên từ vòng 2).
- Cặp cue 1 và 5 cố ý dùng khác mẫu để hai tiếng "chuông" không trùng nhau (ghi chú từ assets-manifest).

## Máy đo được / chưa

- Đã đo: ebur128 integrated −13.9 LUFS, true peak −1.5 dBFS (MP4 43.70s); offsets bằng ffprobe.
- Chưa đo (máy không thay được): độ vừa của bed 0.05 với tai thật — dẫn vào danh sách "cần tai người"
  của `video-review.md` vòng 3.
