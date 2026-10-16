# Voice durations — gaplai v2 (giọng CHỐT: Cam clone)

- Engine: VieNeu-TTS v3 Turbo (ONNX/CPU, local) clone từ ref `docs/gaplai/voice-ref/refCam.wav`
  (nguồn: `vietnamese-voice-samples/previews/Cam.mp3`).
- Text: `docs/gaplai/voice.json` v2 (9 shots, 186 từ, duyệt 9.5/10).
  Chạy với `--json docs/gaplai/voice.json` vì không có `voice-expressive.json`
  (lệnh gốc không `--json` sẽ đọc `voice-expressive.json` mặc định và lỗi file missing).
- ASR check: `docs/gaplai/voice-clone-asr.md`
  (CER 0.000–0.048, tất cả seed=0 ngay lần đầu, không câu nào vượt ngưỡng 0.08).
- Ngày tạo: 2026-10-13

## Độ dài voice clone Cam v2 (ffprobe)

| shot | voice (s) | padding | shot (s) | frames (30fps) | from |
|------|-----------|---------|----------|----------------|------|
| s1 | 3.12 | +0.5 | 3.62 | 109 | 0 |
| s2 | 5.59 | +0.5 | 6.10 | 183 | 109 |
| s3 | 4.48 | +0.5 | 5.00 | 150 | 292 |
| s4 | 5.65 | +0.5 | 6.17 | 185 | 442 |
| s5 | 5.58 | +0.5 | 6.10 | 183 | 627 |
| s6 | 5.76 | +0.5 | 6.27 | 188 | 810 |
| s7 | 4.63 | +0.5 | 5.13 | 154 | 998 |
| s8 | 3.84 | +0.5 | 4.37 | 131 | 1152 |
| s9 | 4.53 | +1.4 | 5.93 | 178 | 1283 |

- Tổng voice thuần: **43.17s**
- Tổng timeline gợi ý: **1461 frames = 48.7s**

## Pause gợi ý — CHƯA gồm trong timeline trên

`voice.json` giữ text thuần, không kèm pause marker, nên các khoảng lặng gợi ý
trong `script.md` **chưa được cộng** vào bảng trên. Timeline agent cộng thêm khi dựng:

- s3: +0.6s sau "mệt lắm hả?" (~18 frames)
- s7: +0.5s trước "cảm ơn nha" (~15 frames)
- s8: +0.8s lặng cuối shot trước CTA (~24 frames)

Nếu cộng đủ 1.9s pause → timeline ≈ 1461 + 57 = **1518 frames ≈ 50.6s**
(vẫn trong khung 45–55s của brief v2).

## So với v1 (7 shots, voice thuần 29.13s / 1009f = 33.6s)

- v1: voice thuần 29.13s, timeline 1009 frames = 33.6s
  (quá nhanh, thiếu khoảng lặng — pace Cam thực tế ~4.4 từ/giây).
- v2: voice thuần 43.17s (+14.04s), timeline 1461 frames = 48.7s (+452 frames).
  Tăng do thêm ~56 từ (tách s4→s4+s5, tách s7 cũ→s8+s9) + pace clone tự nhiên chậm hơn ước tính.
- Lưu ý dựng timeline/scenes v2: dùng bảng này (`voice-durations-cam-v2.md`),
  KHÔNG dùng `voice-durations-cam.md` (v1) hay `voice-durations.md` (edge-tts cũ).
