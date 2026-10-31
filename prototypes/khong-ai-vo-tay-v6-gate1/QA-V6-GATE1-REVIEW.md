# V6 Gate 1 — Đánh giá độc lập sau sửa lỗi (2026-10-31)

**TRẠNG THÁI: REVIEW — chưa phải phim FINAL 140 giây, chưa đạt chứng nhận diễn xuất cấp chuyên nghiệp.** Bản V5 cũ được giữ nguyên.

## Đầu ra kiểm chứng

- `V6-GATE1-15s-1080p30-EN-REVIEW.mp4` — **15.000 s, 1920×1080 gốc, CFR 30 FPS, 450 frame, H.264/yuv420p, AAC stereo/48 kHz**, giải mã toàn bộ bằng FFmpeg không lỗi.
- SHA-256: `57d777b48fe4f7cbcb0e189e02ca561ab1b05491d0f68ba90c4538cf792c019b`.
- Phối nhạc và tác động âm thanh tổng hợp nguyên bản, **không có giọng đọc**. Text English là editorial intertitles, **không phải** phụ đề của spoken narration.
- Typography: **Inter Display ExtraBold** và Inter Display Medium từ font hệ thống trong quá trình render; không đóng gói hoặc phân phối font file.

## Trước / sau — trích trực tiếp từ MP4

| Đoạn | Lỗi V5 | Sửa V6 | Kết quả / giới hạn |
|---|---|---|---|
| 00:00–00:04 chạy | Tay gập như cánh gà, nhịp chân khó đọc | Hạ tay xuống gần xương sườn, giảm chiều dài bước, thêm compression/flight | **Cải thiện**, vẫn còn gait procedural và hình nền đơn giản |
| 00:04–00:08 chống đẩy | Khuỷu–cổ tay co giãn từ 35–67px | IK hai đoạn cố định (103/97px), khóa hai lòng bàn tay và mũi chân, nhịp thất bại riêng | **Đã sửa lỗi co giãn xương**; góc gập khuỷu và lực vai vẫn cần artist review |
| 00:08–00:12 đấm | Cánh tay quá dài, đứng khom thấp | Dời vị trí nhân vật gần bao, giới hạn tay (133/130px), nâng hông, thực hiện anticipation/impact/recoil | **Cải thiện hình học**, thiếu mô phỏng xoay vai/hông thuyết phục và bag squash |
| 00:12–00:15 giúp cậu bé | Cậu bé hoàn toàn cố định; tay người lớn như cần gạt | Cậu bé chuyển hông/đầu lên; người lớn đứng lên, tiếp xúc tay và giữ nhau | **Đã có hành động đứng dậy**, nét mặt/diễn xuất cảm xúc còn cứng |
| Toàn phim | Chữ tiếng Việt nhỏ khó đọc | Chữ tiếng Anh editorial Inter Display ExtraBold, accent warm & contrast | **Đã thay toàn bộ lời trên màn hình**, cần mobile review thêm |

## TDD và QA

- Trước khi sửa: 8 test mới chạy, **3 FAIL**, trong đó lỗi chiều dài cánh tay chống đẩy và cậu bé bất động được tái hiện bằng assertions. Sau sửa: **10/10 PASS**.
- `ffprobe` xác nhận 15.000s, H.264 1920×1080 30/1, 450 video frames, AAC 48000 Hz stereo.
- `ffmpeg -i ... -f null -` giải mã hoàn toàn (exit 0).
- Contact sheet và ảnh đối chiếu V5↔V6 được tạo **từ MP4 thật**, không phải từ mã nguồn tĩnh.

## Các gate CHƯA đạt để gọi FINAL

1. Natural acting: tay / chân vẫn có thể nhìn giống puppet; cần animator điều chỉnh thủ công các key poses và micro timing.
2. Cinematic depth: camera tracking, bố cục và parallax chưa đạt kỹ thuật của film tham chiếu.
3. Character rig/timeline chưa được chuyển sang composition **Remotion**; renderer hiện dùng Pillow/FFmpeg.
4. Chưa có vòng xem/nghe bởi reviewer người ở tốc độ 1×, và chưa chứng minh mỗi mục đạt ≥8/10.
5. Full film 140s chưa được dựng V6. Không được tự động đánh dấu FINAL hoặc archive vào draft Release khi gate chưa qua.

## English copy xuất hiện trong video

- `DAY ONE` / `NO ONE SEES THE FIRST STEP`
- `ONE MORE REP` / `GET UP. TRY AGAIN.`
- `STAY IN THE FIGHT` / `ONE MORE ROUND.`
- `YOUR EFFORT MATTERS` / `SOMEONE IS WATCHING.`

Tất cả text đều là tiếng Anh, không có lỗi chính tả đã xác định; chữ đã render bằng font Inter Display thật tại quá trình xuất.
