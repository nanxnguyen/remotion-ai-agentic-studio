# Voice clone ASR check (dung-bien-tuoi-30-thanh-ban-an)

Ref: `docs/dung-bien-tuoi-30-thanh-ban-an/voice-ref/refTrungKien.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Tuổi ba mươi, bị coi như một bản án. | 0 | 0.206 ⚠ | tuổi 30 bị coi như một bản án. |
| s2 | Ba dòng tội danh: chưa nhà, chưa kết hôn, chưa có địa vị. | 5 | 0.000 | ba dòng tội danh chưa nhà, chưa kết hôn, chưa có địa vị. |
| s3a | Cái thước khắc sẵn: mười tám học xong, hai mươi lăm cưới, ba mươi lên quản lý. | 1 | 0.365 ⚠ | Cái thước khắc sẵn 18 học xong 25 cưới 30 lên quản lý. |
| s3b | Và danh sách ấy, vẫn cứ dài thêm. | 0 | 0.000 | và danh sách ấy vẫn cứ dài thêm. |
| s4a | Tết đến. Mâm cỗ còn bốc khói, thì những câu hỏi bật lên. | 7 | 0.019 | Tết đến mâm cụ còn bốc khói thì những câu hỏi bật lên. |
| s4b | Khi nào cưới? Lương bao nhiêu? Mua nhà chưa? | 0 | 0.024 | Khi nào cưới, lưng bao nhiêu mua nhà chưa? |
| s5a | Bạn chưa có nhà, chưa kết hôn. | 0 | 0.000 | Bạn chưa có nhà, chưa kết hôn. |
| s5b | Nhưng ai đã quy định hôm nay bạn phải có đủ? | 1 | 0.000 | Nhưng ai đã quy định hôm nay bạn phải có đủ. |
| s6a | Một người ba mươi tuổi chưa có nhà, không nhất thiết là người thất bại. | 1 | 0.101 ⚠ | Một người 30 tuổi chưa có nhà, không nhất thiết là người thất bại. |
| s6b | Cái mốc ba mươi ấy, chỉ là một nét ai đó kẻ tay. | 6 | 0.217 ⚠ | Cái mốc 30A chỉ là một nét ai đó kẻ tay. |
| s7a | Nửa đêm, bạn lướt thấy bạn bè đã có nhà, có xe, đã cưới. | 2 | 0.038 | Nửa đêm, bạn lứt thấy bạn bè đã có nhà, có xe, đã cưới. |
| s7b | Rồi tự hỏi: mình đi nhầm đường à? | 0 | 0.032 | Rồi tự hỏi, mình đi nhằm đường à! |
| s8 | Không phải bạn không tiết kiệm. Lương về chưa kịp giữ, đã có nơi đi mất. | 0 | 0.029 | Không phải bạn không tiết kiệm. Lương về chưa kịp chữ đã có nơi đi mất. |
| s9a | Mà đã bao nhiêu năm rồi, chẳng ai hỏi bạn một câu. | 0 | 0.021 | mà đã bao nhiêu năm rồi, chẳng ai hỏi bàn một câu? |
| s9b | Dạo này, bạn sống có vui không? | 0 | 0.000 | Dạo này, bạn sống có vui không? |
| s10 | Đừng biến tuổi ba mươi thành bản án. | 5 | 0.200 ⚠ | Đừng biến tuổi 30 thành bản án. |
