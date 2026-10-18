# Voice clone ASR check (dung-bien-tuoi-30-thanh-ban-an)

Current snapshot after voice regeneration and peak normalization, 2026-10-18. Ref: `voice-ref/refTrungKien.wav`. Model: VieNeu-TTS v3 Turbo; ASR: faster-whisper small, Vietnamese, PCM 16 kHz, CER after punctuation/case normalization. The current MP3 files are the 16 files measured by `voice-durations.ts`.

| clip | canonical phrase | duration s | CER | result | current PCM ASR |
|---|---|---:|---:|---|---|
| s1 | Tuổi ba mươi, bị coi như một bản án. | 2.160 | 0.206 | FAIL | tuổi 30 bị coi như một bản án. |
| s2 | Ba dòng tội danh: chưa nhà, chưa kết hôn, chưa có địa vị. | 3.327 | 0.000 | PASS | Ba dòng tội danh chưa nhà, chưa kết hôn, chưa có địa vị. |
| s3a | Cái thước khắc sẵn: mười tám học xong, hai mươi lăm cưới, ba mươi lên quản lý. | 4.236 | 0.365 | FAIL | Cái thước khắc sẵn 18 học xong 25 cưới 30 lên quản lý. |
| s3b | Và danh sách ấy, vẫn cứ dài thêm. | 1.975 | 0.000 | PASS | và danh sách ấy vẫn cứ dài thêm. |
| s4a | Tết đến. Mâm cỗ còn bốc khói, thì những câu hỏi bật lên. | 3.381 | 0.019 | PASS | Tết đến mâm cổ còn bốc khói thì những câu hỏi bật lên. |
| s4b | Khi nào cưới? Lương bao nhiêu? Mua nhà chưa? | 2.348 | 0.024 | PASS | Khi nào cưới, lưng bao nhiêu mua nhà chưa? |
| s5a | Bạn chưa có nhà, chưa kết hôn. | 1.661 | 0.000 | PASS | Bạn chưa có nhà, chưa kết hôn. |
| s5b | Nhưng ai đã quy định hôm nay bạn phải có đủ? | 2.498 | 0.000 | PASS | Nhưng ai đã quy định hôm nay phải có đủ. |
| s6a | Một người ba mươi tuổi chưa có nhà, không nhất thiết là người thất bại. | 3.476 | 0.101 | FAIL | Một người 30 tuổi chưa có nhà, không nhất thiết là người thất bại. |
| s6b | Cái mốc ba mươi ấy, chỉ là một nét ai đó kẻ tay. | 3.087 | 0.174 | FAIL | Cây móc bà mị ấy chỉ là một nét ai đó kể tay. |
| s7a | Nửa đêm, bạn lướt thấy bạn bè đã có nhà, có xe, đã cưới. | 3.266 | 0.038 | PASS | Nửa đêm, bạn lứt thấy bạn bè đã có nhà, có xe, đã cưới. |
| s7b | Rồi tự hỏi: mình đi nhầm đường à? | 1.749 | 0.032 | PASS | Rồi tự hỏi, mình đi nhằm đường à! |
| s8 | Không phải bạn không tiết kiệm. Lương về chưa kịp giữ, đã có nơi đi mất. | 4.130 | 0.014 | PASS | Không phải bạn không tiết kiệm, lưng về chưa kịp giữ đã có nơi đi mất. |
| s9a | Mà đã bao nhiêu năm rồi, chẳng ai hỏi bạn một câu. | 2.976 | 0.000 | PASS | Mà đã bao nhiêu năm rồi, chẳng ai hỏi bạn một câu? |
| s9b | Dạo này, bạn sống có vui không? | 1.910 | 0.000 | PASS | Dạo này, bạn sống có vui không? |
| s10 | Đừng biến tuổi ba mươi thành bản án. | 1.797 | 0.229 | FAIL | đừng biến tuổi 30 thành bản ánh. |

## Result

The current snapshot has **11/16** clips at CER `<=0.04` under the table above. Remaining failures are `s1`, `s3a`, `s6a`, `s6b`, and `s10`, mainly number-word and clone articulation errors. All 16 files decode and are carried transparently to the audio reviewer; no clean audio-gate pass is claimed until the integrated mix and wording risks are reviewed.
