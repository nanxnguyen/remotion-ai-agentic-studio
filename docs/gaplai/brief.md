# Brief — gaplai (Nếu gặp lại mình của vài năm trước)

## Content
- **Thông điệp 1 câu:** không cần dặn mình cũ "cố lên" nữa, chỉ cần ngồi cạnh, lắng nghe, rồi cảm ơn vì bạn ấy đã đưa ta đi qua đoạn khó nhất.
- **Tone:** thủ thỉ, đời thường như tâm sự đêm khuya với chính mình; ấm và chậm, không sáo, không giảng đạo, không khoe "nay đã ổn".
- **Callback:** "ghế trống đối diện" mở đầu → "cái ôm + cảm ơn" cuối; câu chốt là lời cảm ơn, không phải lời khuyên.
- **Bỏ ra:** số liệu, trích dẫn, lời khuyên cụ thể, mọi chi tiết khoe khoang thành công.

## Style (mới, không trùng Lan / claude-mem)
- **Ý tưởng:** "phòng đêm đèn vàng" — hai chiếc ghế đối diện nhau dưới ánh đèn bàn, xen khung ảnh cũ có nhãn "minh hoạ". Minh họa phẳng tối giản tả thực (người thật tỉ lệ đơn giản), KHÔNG phải pictogram que.
- **Palette:** nền nâu đêm `#171310`, sàn `#241B14`, ánh đèn vàng `#E8B04B`, chữ kem nhạt `#F5EBD7`, xám mờ quá khứ `#8A7E6E`, viền khung ảnh `#3A2E22`.
- **Chữ:** Be Vietnam Pro 600, caption đặt **phía dưới** 2 dòng căn giữa, từ nhấn màu vàng đèn `#E8B04B`. Nhãn "minh hoạ" nhỏ xám `#8A7E6E` góc khung ảnh cũ.
- **Khác video Lan (truongthanh) thế nào:** Lan = nền đen thuần `#000` + pictogram que trắng + nhấn cam `#F58B4C` + chữ Inter 700 phía trên; gaplai = nền nâu đêm có chiều sâu + nhân vật tả thực + nhấn vàng đèn `#E8B04B` + chữ Be Vietnam Pro phía dưới. Không que, không cam, không chữ trên đầu.
- **Khác claude-mem thế nào:** claude-mem = cream/ink/clay sáng (giấy kem + mực đen + đất nung, terminal/node); gaplai = phòng đêm tối ấm (nâu + vàng đèn), không terminal, không sơ đồ, không tông giấy sáng.
- **Chuyển động:** push-in rất chậm về phía ghế trống, đèn bàn nhấp nháy nhẹ, khung ảnh cũ dissolve vào/ra; cắt mềm, hold ≥0.6s; cú đập duy nhất là cái ôm ở shot 7 (zoom nhẹ + sáng đèn lên).

## Giọng
- **Chọn (CHỐT):** giọng **Cam** — clone local từ ref `vietnamese-voice-samples/previews/Cam.mp3`
  (sample custom của user, không có trong voices.csv/json; ref đã convert tại
  `docs/gaplai/voice-ref/refCam.wav`). Bỏ giọng Anh Khôi theo quyết định mới của user.
- **Lý do:** giọng Cam truyền cảm, chinh phục người xem — hợp độc thoại "ngồi cạnh chính mình"
  cần sự vỗ về ấm áp nói với bản trẻ. Chỉ dùng mẫu để tham khảo/clone, không sao chép giọng người thật.
- **Thực tế:** đã clone thành công bằng VieNeu-TTS v3 Turbo (ONNX/CPU, local), KHÔNG fallback HoaiMy.
  Clip tại `public/audio/gaplai/s1..s7.mp3`, ASR check `docs/gaplai/voice-clone-asr.md`
  (CER 0.000–0.034), độ dài `docs/gaplai/voice-durations-cam.md` (tổng voice 29.13s, timeline 1009 frames = 33.6s).

## Script v2 (CHỐT, 2026-10-13)

- **Cấu trúc:** 9 shots — tách lớp "nghe kể" v1-s4 thành s4+s5 (đào sâu chi tiết),
  tách s7 cũ (chốt + CTA) thành s8 (chốt/lặng) + s9 (CTA riêng).
- **Tổng từ:** **186** (s1 13 + s2 25 + s3 18 + s4 24 + s5 24 + s6 25 + s7 20 + s8 17 + s9 20).
- **Nhịp mục tiêu:** **4.0 từ/giây** (chuẩn thận trọng cho giọng Cam; thực tế Cam ~4.4 từ/giây
  nên voice thật có thể về ~42s — vẫn trong khung).
- **Voice thuần ước tính:** 186 / 4.0 ≈ **46.5s**. Padding 8×0.5s + 1.4s cuối = 5.4s
  → **video dự kiến ~52s** (khung yêu cầu 45–55s).
- **Pause gợi ý khi clone/dựng:** s3 nghỉ 0.6s sau "mệt lắm hả?", s7 nghỉ 0.5s trước
  "cảm ơn nha", s8 lặng 0.8s cuối shot trước CTA (chi tiết trong `script.md`, `voice.json` giữ text thuần).
- Text mới tại `script.md` + `voice.json` (v2). Chưa làm voice/timeline/scenes cho v2.
