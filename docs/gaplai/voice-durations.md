# Voice durations — gaplai (giọng TẠM)

- Engine: edge-tts `vi-VN-HoaiMyNeural` rate `+4%`
- Text: `docs/gaplai/voice.json` giữ nguyên (không thay ký tự nào; script tự clean `…`/ngoặc cong khi gửi).
- Ngày tạo: 2026-10-13

## Ghi chú giọng Anh Khôi

- Dòng CSV `Anh Khôi nâng cao Beta` có voiceId `hn_male_phuthang_stor_24k-stl`,
  nhưng preview thực tế là `vietnamese-voice-samples/previews/Anh-Khoi-Nang-Cao.mp3`
  (không phải tên file dài theo voiceId như user đưa).
- File preview tồn tại trong repo. Muốn giọng Anh Khôi thật: tạo clip từ `voice.json`
  (VBEE/ElevenLabs) rồi đặt vào `public/audio/gaplai/s1..s7.mp3` (ghi đè).
  Script `gen-voice.py` mặc định GIỮ file có sẵn trừ khi `--force`.

## Độ dài voice (ffprobe)

| shot | voice (s) | padding | shot (s) | frames (30fps) | from |
|------|-----------|---------|----------|----------------|------|
| s1 | 4.01 | +0.5 | 4.53 | 136 | 0 |
| s2 | 5.81 | +0.5 | 6.33 | 190 | 136 |
| s3 | 5.74 | +0.5 | 6.27 | 188 | 326 |
| s4 | 7.18 | +0.5 | 7.70 | 231 | 514 |
| s5 | 6.62 | +0.5 | 7.13 | 214 | 745 |
| s6 | 5.64 | +0.5 | 6.17 | 185 | 959 |
| s7 | 6.94 | +1.4 | 8.37 | 251 | 1144 |

- Tổng voice thuần: **41.93s**
- Tổng timeline gợi ý: **1395 frames = 46.5s**
