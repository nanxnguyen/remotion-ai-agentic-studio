# Independent final-file ASR check (tiec-nguoi-hay-nam-thang)

Measured on the FINAL mp3 files in `public/audio/tiec-nguoi-hay-nam-thang/` (post loudnorm/trim), independent of the in-generation report `voice-clone-asr.md`.

- Ref: `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav` (8.20s, 24kHz mono)
- Provider: VieNeu-TTS v3 Turbo (local ONNX/CPU), voice slug `thanh-long-nang-cao`
- ASR: faster-whisper `small`, language=vi, CER after punctuation/case normalisation
- Durations: ffprobe `format=duration` (exact source of the timeline numbers below)
- Silence: ffmpeg silencedetect -45dB / 0.4s

| clip | duration s | CER | lead silence s | tail silence s | flags | ASR transcript |
|---|---|---|---|---|---|---|
| s1 | 3.288 | 0.033 | 0.000 | 0.000 | ok | nằm nằm bên nhau, nhưng chuyện của tháng này bạn còn gì để kể? |
| s2 | 4.892 | 0.035 | 0.000 | 0.000 | ok | Có người bạn nói với mình, bọn mình bên nhau gần 5 năm rồi, bây giờ dừng lại tiếc lắm. |
| s3 | 3.296 | 0.000 | 0.000 | 0.000 | ok | Mình hỏi, dạo này hai người thế nào, bạn ấy im lặng một lúc. |
| s4 | 5.471 | 0.032 | 0.000 | 0.000 | internal-silence=[(1.978, 0.494)] | bạn ấy kể con giốc hai đứa từng leo, kể bạn tay đã nắm chặt lúc cả hai tưởng mình không qua nổi. |
| s5 | 3.430 | 0.000 | 0.000 | 0.000 | ok | nhưng đến ô tháng này bạn ấy nhìn xuống, rồi không kể thêm. |
| s6 | 5.690 | 0.040 | 0.000 | 0.000 | ok | Sấm thể nằm nằm vẫn nằm chặt trong tay, có khi ta giữ nó vì sợ buông ra thì chuyện cũ thành vô nghĩa. |
| s7 | 5.091 | 0.022 | 0.000 | 0.000 | ok | nhưng những tràng đã qua đầu có biến mất, chúng từng có ý nghĩa, dù câu trả lời hôm nay là gì. |
| s8 | 6.334 | 0.075 | 0.000 | 0.000 | ok | Làm cất tấm thể 5 năm đi, ô lịch hôm nay vẫn chống. Bạn đang tiếc người ấy, hay tiếc những năm mình đã bỏ ra. |

**Total voice = 37.492s**
