# Voice clone ASR check (thuong-hay-so-bat-dau-lai)

Ref: `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Bạn giữ mối quan hệ ấy vì thương, hay vì sợ phải bắt đầu lại? | 1 | 0.000 | bạn giữ mối quan hệ ấy vì thương hay vì sợ phải bắt đầu lại. |
| s2 | Ba năm nay, tối nào cũng vậy. Nồi cơm nhảy cái cạch, đèn Giữ ấm sáng lên. | 4 | 0.043 ⚠ | Ba năm nay, tối nào cũng vậy, nồi cơm nhảy cái cạch đèn dự ấm sáng lên. |
| s3 | Mình múc hai bát canh. Bát người ấy, mình nhặt từng cọng hành ra. | 26 | 0.032 | Mình múc hài bát canh, bát người ấy, mình nhặt từng cộng hành ra. |
| s4a | Đang nhặt dở, mình khựng lại. | 12 | 0.037 | đang nhặt dở mình khụng lại. |
| s4b | Lần đầu tiên, mình tự hỏi: nhặt vì người ấy, hay vì mình? | 0 | 0.000 | Lần đầu tiên mình tự hỏi nhặt vì người ấy hay vì mình. |
| s5 | Có những tối, mình nhặt hành vì nhớ người ấy ghét hành. Nghe tiếng chìa khoá, mình chạy ra mở cửa. | 1 | 0.043 ⚠ | Có những tối mình nhặt hành vì nhớ người ấy ghét hành, nghe tiếng trìa khóa mình chạy ra mở cửa. |
| s6b | Vậy là, chưa phải bắt đầu lại. Chưa phải học xem một người mới ghét gì. | 0 | 0.000 | Vậy là chưa phải bắt đầu lại, chưa phải học xem một người mới ghét gì. |
| s6a | Có những tối, mình nhặt hành vì quen tay. Nghe tiếng chìa khoá, mình thở phào. | 22 | 0.054 ⚠ | Có những tối mình nhặt hành vì quen tay, nghe tiếng trìa khóa, mình thở phào. |
| s7a | Tối vì thương, tối vì sợ, cái bát vẫn y hệt nhau. Người ấy ăn, đâu biết đó là tối nào. | 0 | 0.025 | Tối vị thương, tối vị sợ, cái bát vẫn y hệt nhau, người ấy ăn, đâu biết đó là tối nào. |
| s7b | Có khi, mình cũng không biết. | 0 | 0.000 | Có khi mình cũng không biết. |
| s8 | Lạch cạch. Người ấy về, treo chìa khoá lên móc. Mình đứng ở cửa bếp, nhìn lâu hơn mọi tối. | 16 | 0.047 ⚠ | Lạc cạch, người ấy về, trao chìa khóa lên móc. Mình đứng ở cửa bếp, nhìn lâu hơn mọi tối. |
| s9 | Cãi xong, lần nào người ấy cũng nhắn trước. Có những chuyện, ba năm rồi vẫn cãi đúng một câu. Và vẫn ghét hành. | 21 | 0.019 | Cãi xong, lần nào người ấy cũng nhắn trước, có những chuyện bà nằm rồi vẫn cãi đúng một câu và vẫn ghét hành. |
| s10 | Nếu hôm nay mới gặp người ấy, biết mọi điều đang biết, bạn có chọn bước vào không? | 0 | 0.000 | Nếu hôm nay mới gặp người ấy, biết mọi điều đang biết, bạn có chọn bước vào không. |
