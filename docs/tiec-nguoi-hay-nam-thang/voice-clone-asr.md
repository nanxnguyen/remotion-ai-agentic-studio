# Voice clone ASR check (tiec-nguoi-hay-nam-thang)

Ref: `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Năm năm bên nhau. Nhưng chuyện của tháng này, bạn còn gì để kể? | 0 | 0.033 | nằm nằm bên nhau, nhưng chuyện của tháng này bạn còn gì để kể? |
| s2 | Có người bạn nói với mình: Bọn mình bên nhau gần năm năm rồi. Bây giờ dừng lại, tiếc lắm. | 0 | 0.035 | Có người bạn nói với mình, bọn mình bên nhau gần 5 năm rồi, bây giờ dừng lại tiếc lắm. |
| s3 | Mình hỏi: Dạo này hai người thế nào? Bạn ấy im lặng một lúc. | 0 | 0.000 | Mình hỏi, dạo này hai người thế nào, bạn ấy im lặng một lúc? |
| s4 | Bạn ấy kể con dốc hai đứa từng leo. Kể bàn tay đã nắm chặt lúc cả hai tưởng mình không qua nổi. | 0 | 0.011 | Bạn ấy kể con dốc hai đứa từng leo, kể bạn tay đã nắm chặt lúc cả hai tưởng mình không qua nổi. |
| s5 | Nhưng đến ô tháng này, bạn ấy nhìn xuống. Rồi không kể thêm. | 0 | 0.000 | nhưng đến ô tháng này bạn ấy nhìn xuống, rồi không kể thêm. |
| s6 | Tấm thẻ năm năm vẫn nằm chặt trong tay. Có khi ta giữ nó, vì sợ buông ra thì chuyện cũ thành vô nghĩa. | 0 | 0.020 | Tấm thẻ nằm nằm vẫn nằm chặt trong tay, có khi ta giữ nó vì sợ buông ra thì chuyện cũ thành vô nghĩa. |
| s7 | Nhưng những trang đã qua đâu có biến mất. Chúng từng có ý nghĩa, dù câu trả lời hôm nay là gì. | 0 | 0.022 | Nhưng những tràng đã qua đầu có biến mất, chúng từng có ý nghĩa dù câu trả lời hôm nay là gì. |
| s8 | Tạm cất tấm thẻ năm năm đi. Ô lịch hôm nay vẫn trống. Bạn đang tiếc người ấy, hay tiếc những năm mình đã bỏ ra? | 0 | 0.075 | Tạm kết tấm thể 5 năm đi, ô lịch hôm nay vẫn chống, bạn đang tiếc người ấy hay tiếc những năm mình đã bỏ ra. |
