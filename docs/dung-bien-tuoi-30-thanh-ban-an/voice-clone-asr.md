# Voice clone ASR check (dung-bien-tuoi-30-thanh-ban-an)

Ref: `docs/dung-bien-tuoi-30-thanh-ban-an/voice-ref/refTrungKien.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Tuổi ba mươi, bị coi như một bản... án. | 0 | 0.206 ⚠ | Tuổi 30 bị coi như một bản, án. |
| s2 | 3.327 | 0.000 | PASS |
| s3b | 1.975 | 0.000 | PASS |
| s3a | Cái thước khắc sẵn: mười tám, học xong; hai mươi lăm, cưới; ba mươi, lên quản lý. | 5 | 0.365 ⚠ | Cái thước khắc sẵn 18, học xong 25, cưới 30 lên quản lý. |
| s4a | 3.381 | 0.019 | PASS |
| s4b | 2.348 | 0.024 | PASS |
| s5a | 1.661 | 0.000 | PASS |
| s5b | 2.498 | 0.000 | PASS |
| s6a | Một người ba mươi tuổi chưa có nhà; không nhất thiết là người thất bại. | 0 | 0.101 ⚠ | Một người 30 tuổi chưa có nhà, không nhất thiết là người thất bại. |
| s6b | Cái mốc ba mươi ấy, chỉ là một nét ai đó kẻ tay. | 31 | 0.087 ⚠ | Cái móc bà mùi ấy chỉ là một nét ai đó kẻ tay. |
| s7a | 3.266 | 0.038 | PASS |
| s7b | 1.749 | 0.032 | PASS |
| s8 | 4.130 | 0.014 | PASS; pause boundaries measured separately |
| s9a | 2.976 | 0.000 | PASS |
| s9b | 1.910 | 0.000 | PASS |
| s10 | Đừng biến tuổi ba mươi thành bản án. | 42 | 0.200 ⚠ | Đừng biến tuổi 30 thành bản án. |
