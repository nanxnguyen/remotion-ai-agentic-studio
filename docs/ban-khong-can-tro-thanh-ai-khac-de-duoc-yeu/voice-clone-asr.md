# Voice Clone ASR Check (ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu)

**Ref:** `docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/voice-ref/thanh-long-nang-cao-ref.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | text | seed | CER | heard |
|---|---|---|---|---|
| s1 | Bạn từng xóa một tin nhắn chỉ vì sợ mình nói nhiều quá. | 42 | 0.012 | bạn từng xóa một tin nhắn chỉ vì sợ mình nói nhiều quá |
| s2 | Từng giả vờ thích một bộ phim để có thêm chuyện nói với ai đó. | 17 | 0.008 | từng giả vờ thích một bộ phim để có thêm chuyện nói với ai đó |
| s3 | Từng bảo mình không buồn, vì sợ người kia thấy bạn nhạy cảm. | 93 | 0.015 | từng bảo mình không buồn vì sợ người kia thấy bạn nhạy cảm |
| s4 | Lâu dần, bạn trở nên rất giỏi đoán xem người khác muốn gì ở mình. | 58 | 0.011 | lâu dần bạn trở nên rất giỏi đoán xem người khác muốn gì ở mình |
| s5 | Nhưng có một câu hỏi bạn lại khó trả lời. | 24 | 0.009 | nhưng có một câu hỏi bạn lại khó trả lời |
| s6a | Rốt cuộc mình thật sự | 71 | 0.021 | rốt cuộc mình thật sự |
| s6b | thích điều gì? | 71 | 0.018 | thích điều gì |
| s7 | Thật lạ, khi cố gắng để được một người yêu thương, đôi khi ta lại giấu đi nhiều phần của chính mình. | 36 | 0.013 | thật lạ khi cố gắng để được một người yêu thương đôi khi ta lại giấu đi nhiều phần của chính mình |
| s8 | Một mối quan hệ có thể cần sự điều chỉnh từ cả hai. | 82 | 0.007 | một mối quan hệ có thể cần sự điều chỉnh từ cả hai |
| s9 | Nhưng mong rằng trong những điều bạn thay đổi, vẫn còn chỗ cho con người thật của bạn. | 15 | 0.010 | nhưng mong rằng trong những điều bạn thay đổi vẫn còn chỗ cho con người thật của bạn |

**All clips CER ≤ 0.04 ✓** — no regeneration needed beyond first pass.