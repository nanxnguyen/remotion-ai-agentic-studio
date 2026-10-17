# Voice clone ASR check (cuoc-goi-nho-cua-me)

Ref: `docs/cuoc-goi-nho-cua-me/voice-ref/refThanhLong.wav`. Model: VieNeu-TTS v3 Turbo (ONNX/CPU). ASR: faster-whisper small. CER after punctuation/case normalisation.

| clip | phrase | seed | CER | ASR |
|---|---|---|---|---|
| s1 | Mẹ gọi lúc mình đang bận. Mình định lát nữa gọi lại... | 0 | 0.000 | Mẹ gọi lúc mình đang bận, mình định lát nữa gọi lại. |
| s2 | Chiều đó mẹ gọi, mình đang họp dở nên bấm tắt vội. | 0 | 0.021 | Chiều đó mẹ gọi mình đang học dở nên bấm tắt vội. |
| s3 | Mình nhắn vội: "Lát con gọi lại nha." Rồi họp tiếp, trả lời tin nhắn, làm nốt việc, rồi quên bẵng. | 0 | 0.033 | Mình nhắn vội, lát con gọi lại nha. Rồi học tiếp, trả lời tin nhắn, làm nút việc, rồi quên bãng. |
| s4 | Tối, phòng đã tắt đèn. Mở điện thoại lên, dòng chữ "Cuộc gọi nhỡ — Mẹ" vẫn nằm đó, mình chột dạ. | 9 | 0.011 | Tối phòng đã tắt đèn, mở điện thoại lên dòng chữ cuộc gọi nhỡ, mẹ vẫn nằm đó mình chuột dạ. |
| s5 | Mình bấm gọi lại, cũng chính ngón tay ban chiều bấm tắt. Mẹ bắt máy ngay, chưa kịp reo hai tiếng. "Con ăn cơm chưa?" | 0 | 0.046 ⚠ | Mình bấm gọi lại cũng chính ngón tay ban chiều bấm tắt mẹ bắt máy ngay chưa kịp rèo 2 tiếng, còn ăn cơm chưa. |
| s6 | Hóa ra mẹ chẳng nhờ gì cả. Mẹ chỉ muốn nghe giọng mình một chút thôi. | 8 | 0.030 | Hóa ra mẹ chẳng nhờ gì cả, mẹ chỉ muốn nghe dọng mình một chút thôi. |
| s7 | Mình vừa ăn bát cơm đã nguội, vừa kể: hôm nay ăn gì, chỗ con có mưa không. Ngoài cửa, mưa vẫn gõ nhẹ. Toàn chuyện nhỏ xíu. | 0 | 0.017 | Mình vừa ăn bắt cơm đã nguội vừa kể, hôm nay ăn gì, chỗ còn có mưa không, ngoài cửa, mưa vẫn gõ nhẹ, toàn chuyện nhỏ xíu. |
| s8 | Cúp máy rồi mình nghĩ mãi: có những người chẳng cần mình làm gì lớn lao. Một cuộc gọi lại thôi, họ cũng vui rồi. | 0 | 0.019 | Cục máy rồi mình nghĩ mãi, có những người chẳng cần mình làm gì lớn lao.  Một cuộc gọi lại thôi, họ cũng vui rồi. |

## Vòng 3 (2026-10-14) — voice v2

- s1 giữ nguyên vòng 2 (không clone lại). s2–s8 clone mới từ text v2
  (`voice.json`), ref `refThanhLong.wav` không đổi, `--tries 14 --max-cer 0.04`.
- 6/7 clip mới PASS; s5 CER 0.046 ⚠ vượt ngưỡng (best trong 14 tries) —
  sai lệch chỉ ở mức nhầm ASR small ("reo→rèo", "Con→còn"), cần người nghe kỹ.
- Voice QA listening = PENDING.
