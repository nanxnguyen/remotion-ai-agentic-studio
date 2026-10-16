# Voice clone ASR check (gaplai)

Ref: `docs/gaplai/voice-ref/refCam.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Gặp lại mình của vài năm trước, bạn sẽ nói gì đầu tiên? | 0 | 0.019 | Cặp lại mình của vài năm trước. Bạn sẽ nói gì đầu tiên. |
| s2 | Chắc không phải là cố lên đâu. Hồi đó mình đã cố nhiều rồi, cố tới mức chẳng muốn nghe thêm lời khuyên nào nữa. | 0 | 0.000 | chắc không phải là cố lên đâu. Hồi đó mình đã cố nhiều rồi, cố tới mức chẳng muốn nghe thêm lời khuyên nào nữa. |
| s3 | Mình sẽ ngồi xuống cạnh bạn ấy thôi, rồi hỏi khẽ một câu: dạo này, mệt lắm hả? | 0 | 0.014 | Mình sẽ ngủi xuống cạnh bạn ấy thôi. Rồi hỏi khẽ một câu, dạo này mệt lắm hả? |
| s4 | Rồi nghe bạn ấy kể hết. Những đêm tăng ca muộn, mùi mì khuya lẫn tiếng quạt rè, một mình nuốt mệt vào trong. | 0 | 0.048 | Rồi nghe bạn ấy kể hết. Những đêm tăng ca muộn mùi mì khuya lẫn tiếng khoạt xè, một mình nuốt nệt vào trong. |
| s5 | Có tin nhắn soạn rồi lại xóa, chẳng dám gửi cho ai. Nhìn bạn bè đi xa, chỉ thấy mình đứng yên mà tủi. | 0 | 0.041 | Có tin nhắn xoạn dồi lại xóa, chẳng dám gửi cho ai.  Nhìn bạn bè đi xa chỉ thấy mình đứng yên mà tuổi. |
| s6 | Mình sẽ cho bạn ấy xem hôm nay. Chưa hoàn hảo đâu, vẫn mệt, nhưng biết nghỉ, biết nhờ giúp, biết tha cho mình hơn. | 0 | 0.000 | mình sẽ cho bạn ấy xem hôm nay. Chưa hoàn hảo đâu vẫn mệt, nhưng biết nghỉ biết nhờ giúp, biết tha cho mình hơn. |
| s7 | Và trước khi rời đi, mình sẽ ôm bạn ấy một cái thật lâu, rồi nói khẽ: cảm ơn nha. | 0 | 0.039 | Và trước khi rời đi, mình sẽ ông bạn ấy một cái thật lâu, rồi nói khẽ cảm ơn nhà. |
| s8 | Vì lúc khó nhất, chính bạn đã gồng mình đưa chúng ta bước tiếp qua đoạn ấy. | 0 | 0.000 | vì lúc khó nhất chính bạn đã gồng mình đưa chúng ta bước tiếp qua đoạn ấy. |
| s9 | Còn bạn thì sao, có điều gì muốn nhắn với mình của vài năm trước không? Kể mình nghe nhé. | 0 | 0.000 | Còn bạn thì sao có điều gì muốn nhắn với mình của vài năm trước không? Kể mình nghe nhé. |
