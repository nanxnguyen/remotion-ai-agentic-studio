# Voice clone ASR check (cuoc-goi-nho-cua-me)

Ref: `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Mẹ gọi lúc mình đang bận. Mình định lát nữa gọi lại... | 0 | 0.000 | Mẹ gọi lúc mình đang bận, mình định lát nữa gọi lại. |
| s2 | Chiều đó mẹ gọi, mình đang họp dở nên bấm tắt vội. | 8 | 0.000 | Chiều đó mẹ gọi, mình đang họp dở nên bấm tắt vội. |
| s3 | Mình nhắn vội: "Lát con gọi lại nha." Rồi họp tiếp, trả lời tin nhắn, làm nốt việc, rồi quên bẵng. | 1 | 0.033 | Mình nhắn vội, lát con gọi lại nhà, rồi học tiếp, trả lời tin nhắn làm nốt việc, rồi quên bãng. |
| s4 | Tối, phòng đã tắt đèn. Mở điện thoại lên, dòng chữ "Cuộc gọi nhỡ — Mẹ" vẫn nằm đó, mình chột dạ. | 10 | 0.023 | Tối phòng đã tắt đèn. Mở điện thoại lên, dòng chữ cuộc gọi nhỡ, mẹ vẫn nằm đó mình trột dạ. |
| s5 | Mình bấm gọi lại, cũng chính ngón tay ban chiều bấm tắt. Mẹ bắt máy ngay. "Con ăn cơm chưa?" | 0 | 0.012 | Mình bấm gọi lại cũng chính ngón tay ban chiều bấm tắt, mẹ bắt máy ngay, còn ăn cơm chưa? |
| s6 | Hóa ra mẹ chẳng nhờ gì cả. Mẹ chỉ muốn nghe giọng mình một chút thôi. | 0 | 0.030 | Hóa ra mẹ chẳng nhờ gì cả, mẹ chỉ muốn nghe dọng mình một chút thôi. |
| s7 | Mình vừa ăn bát cơm đã nguội, vừa kể: hôm nay ăn gì, chỗ con có mưa không. Toàn chuyện nhỏ xíu. | 0 | 0.022 | Mình vừa ăn bắt cơm đã nguội vừa kể, hôm nay ăn gì chỗ còn có mưa không?  Toàn chuyện nhỏ xíu. |
| s8 | Cúp máy rồi mình nghĩ mãi: có những người chẳng cần mình làm gì lớn lao. Một cuộc gọi lại thôi, họ cũng vui rồi. | 0 | 0.037 | Cục máy rồi mình nghĩ mãi, có những người chẳng tân mình làm gì lớn lao.  Một cuộc gọi lại thôi, họ cũng vui rồi. |
