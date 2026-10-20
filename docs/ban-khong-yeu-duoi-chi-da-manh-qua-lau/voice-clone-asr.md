# Voice clone ASR check (ban-khong-yeu-duoi-chi-da-manh-qua-lau)

References are recorded per shot in `voice-report.md`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small (vi), one configuration for all 13 clips (AR-11). CER below is whole-clip vs canonical `voice.json`; per-phrase ASR of short phrases is less reliable than whole-clip ASR (see s2a p1 "an ủi.", seed 9: phrase CER 0.000 but the tone mark is lost in whole-clip ASR).

| clip | phrase | seed | CER | ASR |
|---|---|---:|---:|---|
| s1 | Mọi người thường tìm đến bạn | 0 | 0.0000 | Mọi người thường tìm đến bạn, mỗi khi có chuyện buồn. |
| s1 | mỗi khi có chuyện buồn. | 0 | 0.0000 | Mọi người thường tìm đến bạn, mỗi khi có chuyện buồn. |
| s2a | Bạn biết cách | 0 | 0.0278 | bạn biết cách an ui, biết phải nói gì. |
| s2a | an ủi. | 9 | 0.0278 | bạn biết cách an ui, biết phải nói gì. |
| s2a | Biết phải nói gì. | 0 | 0.0278 | bạn biết cách an ui, biết phải nói gì. |
| a1 | Vai | 0 | 0.0408 | vai người khác trùng xuống, còn bạn thì đứng ngoài. |
| a1 | người khác chùng xuống. | 8 | 0.0408 | vai người khác trùng xuống, còn bạn thì đứng ngoài. |
| a1 | Còn bạn thì đứng ngoài. | 0 | 0.0408 | vai người khác trùng xuống, còn bạn thì đứng ngoài. |
| s2b | Biết làm sao để người khác thấy ổn hơn. | 0 | 0.0000 | Biết làm sao để người khác thấy ổn hơn? |
| s3 | Nhưng có một tối, | 1 | 0.0000 | nhưng có một tối chính bạn lại ngồi rất lâu trước màn hình điện thoại. |
| s3 | chính bạn lại ngồi rất lâu trước màn hình điện thoại. | 0 | 0.0000 | nhưng có một tối chính bạn lại ngồi rất lâu trước màn hình điện thoại. |
| a2 | Ngoài cửa sổ, | 2 | 0.0000 | Ngoài cửa sổ mưa rơi đều. |
| a2 | mưa rơi đều. | 0 | 0.0000 | Ngoài cửa sổ mưa rơi đều. |
| s4 | Bạn muốn nhắn: | 0 | 0.0000 | Bạn muốn nhắn, hôm nay mình mệt quá. |
| s4 | 'Hôm nay mình mệt quá.' | 0 | 0.0000 | Bạn muốn nhắn, hôm nay mình mệt quá. |
| s5 | Rồi nghĩ một lúc, | 0 | 0.0000 | rồi nghĩ một lúc bạn lại thôi. |
| s5 | bạn lại thôi. | 0 | 0.0000 | rồi nghĩ một lúc bạn lại thôi. |
| s6 | Không phải vì không có ai | 0 | 0.0303 | không phải vì không có ai để nhấn. |
| s6 | để nhắn. | 0 | 0.0303 | không phải vì không có ai để nhấn. |
| s7 | Mà vì bạn đã quen | 1 | 0.0000 | mà vì bạn đã quen với việc mình phải là người ổn. |
| s7 | với việc mình phải là người ổn. | 0 | 0.0000 | mà vì bạn đã quen với việc mình phải là người ổn. |
| s8 | Bạn biết không… | 0 | 0.0000 | Bạn biết không? |
| s9 | Người thường xuyên | 1 | 0.0154 | Người thường xuyên chè ô cho người khác cũng có những ngày bị ướt. |
| s9 | che ô cho người khác | 3 | 0.0154 | Người thường xuyên chè ô cho người khác cũng có những ngày bị ướt. |
| s9 | cũng có những ngày | 0 | 0.0154 | Người thường xuyên chè ô cho người khác cũng có những ngày bị ướt. |
| s9 | bị ướt. | 1 | 0.0154 | Người thường xuyên chè ô cho người khác cũng có những ngày bị ướt. |
| s10 | Và họ cũng cần một người hỏi: | 0 | 0.0000 | và họ cũng cần một người hỏi, hôm nay có chuyện gì với bạn thế? |
| s10 | 'Hôm nay có chuyện gì với bạn thế?' | 0 | 0.0000 | và họ cũng cần một người hỏi, hôm nay có chuyện gì với bạn thế? |
