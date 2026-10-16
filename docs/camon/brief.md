# Brief — camon (Cảm ơn phiên bản mình đã âm thầm cố gắng)

Nguồn ý tưởng: lời thoại + bảng nhịp dựng do người dùng cung cấp (13/10/2026). Video "làm lại" theo pipeline của `out/lan-reel.mp4` (comp `LanReel`, `src/tt2/*` + `src/stick.tsx`), nhưng chủ đề, màu và nhịp mới.

## Content
- **Story spine (khoảnh khắc chạm):** tối về nhà mệt rã rời, lướt điện thoại thấy người khác tiến nhanh, tự hỏi mình đủ tốt chưa. Ai cũng từng có buổi tối đó.
- **Thông điệp 1 câu:** phiên bản cũ của mình đã cố gắng nhiều hơn mình từng ghi nhận; hãy cảm ơn họ.
- **Cấu trúc cảm xúc:** nhận ra (hook) → nhớ lại ngày mệt (đồng cảm) → chạnh lòng, chỉ thấy cái thiếu (đáy) → bước ngoặt "bây giờ nhìn lại" → bằng chứng nhỏ (dậy đi làm, làm tiếp, chưa từng đứng yên) → lời cảm ơn (payoff).
- **Thiết bị kể chuyện:** KHÔNG dùng hài (chủ đề chữa lành; skill mặc định hài được tắt có chủ đích). Thay bằng **callback hình ảnh**: tấm ảnh cũ (polaroid) mở đầu → cuối video nhân vật bây giờ cầm lại chính tấm ảnh đó, người trong ảnh bước ra; và **mầm lá 🌿**: mỗi bước chân "chậm thôi" để lại một mầm xanh, cuối video thành một lối đi xanh.
- **Hook (<3s):** "Có một phiên bản của mình... đã cố gắng rất nhiều, nhưng chẳng mấy ai biết." + hình: tấm ảnh cũ, bóng lưng một người bước một mình.
- **Claim:** không có claim sự thật/số liệu (nội dung phản tư cá nhân) → không cần nguồn. Nhân vật là hình que minh hoạ, không ám chỉ người thật.
- **Bỏ ra:** lời khuyên cụ thể, giảng đạo, so sánh "hãy cố hơn nữa", CTA bán hàng.
- **Thời lượng:** người dùng muốn ~50s. Lời gốc ~145 âm tiết → giữ nguyên lời gốc (v2), mục tiêu 50-58s, không tăng tốc audio. Đo thật: voice 35s → tổng 49.9s nhờ hold hình theo cảm xúc; mọi rút gọn lời phải hỏi người dùng trước.

## Giọng
- **Chọn:** Vbee **Anh Khôi nâng cao (Beta)** `hn_male_phuthang_stor_24k-stl` (người dùng chỉ định; nam trầm ấm, hợp kể chuyện).
- **Quyền sử dụng (13/10/2026):** người dùng yêu cầu "Phải dùng giọng nói này" và xác nhận: "không cần key vì cứ lấy mà dùng vì tôi là chủ của vbee". Theo uỷ quyền này, video dùng giọng clone cục bộ từ file mẫu; điều này thay cho quy tắc 6 của playbook ("không bắt chước giọng người thật") **chỉ cho video này**.
- **Thực tế:** không có `VBEE_*` key → giọng **clone zero-shot cục bộ** (không phải output Vbee thật) bằng VieNeu-TTS v3 Turbo (Apache-2.0, ONNX/CPU), ref = `docs/camon/voice-ref/refA.wav` (0.15-7.0s của `vietnamese-voice-samples/previews/Anh-Khoi-nang-cao-Beta--hn_male_phuthang_stor_24k-stl.mp3`, không nhạc nền). Lệnh: `HF_HUB_DISABLE_IMPLICIT_TOKEN=1 ~/.venvs/vieneu/bin/python -I scripts/gen-voice-clone.py camon --ref docs/camon/voice-ref/refA.wav --force`. Mỗi câu được kiểm ASR (faster-whisper), bảng CER ở `docs/camon/voice-clone-asr.md`. Model gắn watermark âm thanh AI mặc định (giữ nguyên).
- Có clip Vbee thật sau này: đặt vào `public/audio/camon/s1..s10.mp3`, đo lại, cập nhật `raw` trong `src/camon/timeline.ts`, render lại.
- **Xung đột đã chốt:** người dùng muốn giọng "sáng" nhưng cũng chỉ định file giọng Anh Khôi (nam trầm). Người dùng đã chốt: phải dùng giọng Anh Khôi.
- **Nhịp:** nhanh vừa, sáng; nghỉ ngắn 0.15-0.35s; riêng hai câu "Cảm ơn" chậm hơn (tách 'Cảm ơn,' + nghỉ 0.28/0.32s + atempo nhẹ 0.85/0.82 cho s9/s10, vì clone đọc ~5 âm tiết/s; đây là chủ ý biểu cảm theo yêu cầu, không dùng để ép thời lượng), nghỉ 0.55s giữa hai câu.

## Style — "Ảnh cũ & bình minh xanh"
- **Bảng màu:**
  - Quá khứ (s1-s4): nền đêm xanh-đá `#1B2230` → `#262F40`, nhân vật "mình ngày đó" xám xanh `#AEB9CB`, chi tiết `#5B6880`. Khung **polaroid** viền ngà `#EDE6D6` (nghiêng, grain, vệt sáng) chỉ xuất hiện ở s1 và s8-s10 (callback); s2-s4 là cảnh full khung tông đêm.
  - Hiện tại (s5-s9): nền rêu sẫm `#1E2A25` bắt đầu ấm lên ngay từ s5 (bước ngoặt), sáng dần tới ánh bình minh `#F4C77D` (glow) ở s9-s10, nhân vật "mình bây giờ" trắng ngà `#F6F2E8`.
  - Accent: lá mạ `#9FD39A` (🌿, chữ nhấn), vàng ấm `#F4C77D` (chữ "Cảm ơn", ánh sáng).
- **Font:** Lora (serif mềm, có dấu tiếng Việt, OFL) cho caption, SemiBold 60-64px; nhấn bằng *italic* + màu. Inter cho nhãn nhỏ.
- **Chuyển động:** chậm, trôi; crossfade 10 frame giữa các shot (s6→s7→s8: 6 frame) (Lan cắt thẳng); Ken Burns 1.00→1.05 trong mỗi shot; spring damping cao (ít nảy); mầm lá mọc với overshoot nhẹ. Nhịp hình theo câu thoại.
- **Đọc được trên que:** "bóng lưng" = que không mặt, đi vào chiều sâu (nhỏ dần + bóng chân); "quay lại" = mặt hiện dần; nụ cười s9 zoom đầu ~1.7x.
- **Caption:** phía trên (top ~250px), chữ ngà trên nền tối, mỗi câu thoại một lần đổi, fade + blur-in 10 frame; nằm ngoài 210px đáy.
- **Không giống:** Lan/Trưởng Thành (nền đen thuần, que trắng, cam `#F58B4C`, Inter, cắt thẳng), claude-mem (giấy kem/ink/clay, terminal), Understand Anything (tối/vàng gold, sơ đồ node). Tái dùng bộ khung que `src/stick.tsx` (tư thế, walk) nhưng đổi màu thân/mặt qua prop.
- **Âm thanh:** kho BGM của dự án đều là house/hiphop, không hợp chữa lành → **tự tổng hợp** nhạc pad + piano nhẹ (C-Am-F-G, ~70 BPM) bằng `scripts/gen-bgm-soft.py` (của dự án, không bản quyền bên thứ ba); SFX nhẹ từ kho (`chime-crystal`, `transition-soft`, `ui-success-soft`). BGM ~8%, voice rõ.

## Caption đăng bài (người dùng cung cấp)
Gửi lời cảm ơn đến phiên bản mình từng âm thầm cố gắng, kể cả trong những ngày chẳng ai nhận ra. 🌿
Nhờ có bạn của ngày đó, mình mới có mặt ở hôm nay.
#CamOnBanThan #ChuaLanh #YeuBanThan
