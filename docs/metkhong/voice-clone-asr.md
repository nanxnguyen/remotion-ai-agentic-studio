# Voice clone ASR check (metkhong)

Ref: `docs/metkhong/voice-ref/refA.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Hồi nhỏ, ngã một cái là có người chạy tới hỏi: Đau không con? | 0 | 0.017 | Hùi nhỏ, ngã một cái là có người chạy tới hỏi, đau không con? |
| s2 | Lớn rồi thì khác. Bóng đèn cháy cũng tự bắc ghế thay. | 0 | 0.078 | Lướn rồi thì khác, bóng đèn cháy cũng tự bắt kế thay. |
| s3 | Đồ nặng cũng tự bê. Việc muộn cũng tự ôm. | 0 | 0.000 | Đồ nặng cũng tự bê, việc muộn cũng tự ôm. |
| s4 | Buồn cũng để sang một bên, vì sáng mai vẫn phải đi làm. | 0 | 0.000 | Buồn cũng để sang một bên, vì sáng mai vẫn phải đi làm. |
| s5 | Mình quen miệng nói: Để tôi lo được. Rồi người ta cũng tin là mình lo được hết. | 0 | 0.079 | Viền quen điện nói để tôi lo được, rồi người ta cũng tin là mình lo được hết. |
| s6 | Nhưng có hôm, mình chỉ mong ai đó hỏi một câu thôi: Dạo này, mệt không? | 0 | 0.000 | nhưng có hôm mình chỉ mong ai đó hỏi một câu thôi, dạo này mệt không? |
| s7 | Nếu bạn cũng đang đợi câu đó, thì hôm nay mình hỏi bạn nhé: Bạn có mệt không? Mệt thì nghỉ một chút đi. Lớn rồi, đâu phải lúc nào cũng gánh một mình. | 0 | 0.000 | Nếu bạn cũng đang đợi câu đó, thì hôm nay mình hỏi bạn nhé, bạn có mệt không?  Mệt thì nghỉ một chút đi, lớn rồi, đâu phải lúc nào cũng gánh một mình. |
