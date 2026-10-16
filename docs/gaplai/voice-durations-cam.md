# Voice durations — gaplai (giọng CHỐT: Cam clone)

- Engine: VieNeu-TTS v3 Turbo (ONNX/CPU, local) clone từ ref `docs/gaplai/voice-ref/refCam.wav`
  (nguồn: `vietnamese-voice-samples/previews/Cam.mp3`, 17.6s, 44100Hz stereo → convert 24000Hz mono).
- Ref check: 1 giọng duy nhất, sạch (mean −16.6 dB, max −6.6 dB), ASR faster-whisper-small
  nghe rõ câu motivational hoàn chỉnh, không tạp âm.
- Text: `docs/gaplai/voice.json` giữ nguyên. ASR check: `docs/gaplai/voice-clone-asr.md`
  (CER 0.000–0.034, tất cả seed=0 ngay lần đầu, không câu nào vượt ngưỡng 0.08).
- Ngày tạo: 2026-10-13

## Độ dài voice clone Cam (ffprobe)

| shot | voice (s) | padding | shot (s) | frames (30fps) | from |
|------|-----------|---------|----------|----------------|------|
| s1 | 3.12 | +0.5 | 3.62 | 109 | 0 |
| s2 | 3.68 | +0.5 | 4.20 | 126 | 109 |
| s3 | 4.48 | +0.5 | 5.00 | 150 | 235 |
| s4 | 4.88 | +0.5 | 5.40 | 162 | 385 |
| s5 | 4.53 | +0.5 | 5.03 | 151 | 547 |
| s6 | 3.69 | +0.5 | 4.20 | 126 | 698 |
| s7 | 4.76 | +1.4 | 6.20 | 185 | 824 |

- Tổng voice thuần: **29.13s**
- Tổng timeline gợi ý: **1009 frames = 33.6s**

## So với bản tạm cũ (edge-tts HoaiMy, 41.93s / 1395 frames = 46.5s)

- Bản Cam nhanh hơn ~12.8s voice thuần; timeline ngắn hơn 386 frames (~12.9s).
- Lưu ý dựng timeline/scenes: dùng bảng Cam này, KHÔNG dùng `voice-durations.md` cũ.
