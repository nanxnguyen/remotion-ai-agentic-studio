# RETRO TV ART BIBLE & DỰNG PHIM

## Frame gốc bất biến
Nguồn đã được người dùng duyệt: `../../../assets/retro-tv-reference.jpg` (bối cảnh phòng ấm màu nâu gỗ, đèn bàn, cây leo, TV đen–đồng với núm chỉnh bên phải). Tránh thay model CRT giữa các tập. Đây là hình chuẩn cho bối cảnh vật lý; ảnh nguyên gốc **đã chứa chữ cũ** trong màn hình và tiêu đề "THÓI QUEN NHỎ" ở ngoài TV. Khi áp dụng chủ đề mới phải dùng footage che hoàn toàn phần chữ cũ trong màn kính; với text ngoài TV cần tạo clean plate được duyệt hoặc cập nhật bằng layer mới, KHÔNG để sai chủ đề.

## Màn hình CRT
- Calibrate matte alpha trực tiếp trên reference đang sử dụng, không tái sử dụng bừa tọa độ mask từ frame TV khác.
- Footage crop fill màn hình; 640×640 virtual screen hoặc tỉ lệ tương đương. Feather 5–9px tại viền kính thực.
- Footage thiên nhiên có chuyển động gió/tia nắng thật; tránh slideshow ảnh tĩnh.
- Scanlines 2–4%, vignette mép 8–12%, glare 2–6%, không lấn lên chữ.
- Biến đổi màu theo 4 hồi: xanh/vàng nhẹ → xanh sâu → nắng mở → vàng ấm dịu.
- Typography không đè lên viền CRT, nằm ở safe box rộng khoảng 78–82% màn kính, từ tối đa 2 dòng/cụm.

## Chữ & highlight
- Be Vietnam Pro ExtraBold, màu trắng ngà #F7F4EE, vàng champagne #FFD27A, đổ bóng mềm.
- Một layer chữ trắng ổn định toàn cảnh, layer vàng `clip-path` hoặc alpha mask quét từng cụm (ease-out cubic 8–14 frame). Chữ vàng hiện đúng âm tiết, underline chạy sau 2–3 frame và bỏ qua nếu quá dài.
- Không tween cả câu từ trắng sang vàng rồi chuyển sang câu khác gây ghosting / nhấp nháy.
- Đặc biệt câu kết: nếu hai beat khác từ khóa trong cùng một câu, giữ nguyên geometry và glyph bitmap, chỉ cập nhật mask focus.

## Shotlist dựng
Mỗi shot record: `id, act, narration, audio_start, audio_end, planned_duration, actual_duration, location/stock_source, lens/comp, camera/subject_motion, light, subtitles, focus, transitions, music, QA`. Khi lời thoại dài, chia beat theo cụm đọc; không ép chữ 4 dòng.
Các cut 5–10 frame cross-dissolve, có J-cut/L-cut nếu giúp giữ mạch; match direction của tia nắng. Tỷ lệ 9:16 master, 30 FPS. Video ngang 16:9 dùng TV trong bố cục tổng phù hợp, vẫn giữ truyền tải ở trung tâm.

## Voice, nhạc & sound design
- Vbee Ngọc Huyền (nếu connector/secrets hoạt động); đo duration từng clip, không dùng số giây ước lượng làm truth.
- Hook ấm tò mò; body thủ thỉ; climax chắc và giàu hy vọng; ending trầm bình yên.
- Piano + pad ambient, strings chỉ dâng khi climax; duck nhạc theo voice. Master target ~ -16 LUFS stereo, peak <= -1 dBTP, kiểm thật bằng loudnorm/ebur128.

## Đầu ra tối thiểu
`video-final.mp4`, `qa-contact-sheet.jpg`, `script.md`, `voice-timeline.json`, `caption-timeline.csv`, `production-manifest.json`, `sha256.txt`, source/project nếu đã render bằng code. Mọi assets không có quyền thương mại chỉ phục vụ tham khảo, không khẳng định được phép phân phối công khai.
