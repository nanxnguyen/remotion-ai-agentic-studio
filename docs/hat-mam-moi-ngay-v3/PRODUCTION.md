# Hạt Mầm V3 — Nhịp điện ảnh cảm xúc

**Nguồn đề tài:** Thành công đến từ những thói quen/nỗ lực nhỏ được duy trì mỗi ngày.

## Bản MP4 đã render trong ChatGPT

- Tên phim: Có Những Nỗ Lực Không Ai Nhìn Thấy — Cinematic V3
- 35.800s, 1080×1920, 30fps, H.264/AAC
- 18 micro-shots, 16 subtitle beats
- SHA-256: `7a4381f2799f970775b5f135a525f9b57171e1390a418629f953860d1dbb96b3`
- Dung lượng: **13,378,917 bytes**
- Nội dung và giọng: Giữ lại sáu câu Vbee Ngọc Huyền thật từ V2, xử lý nhịp nhanh/chậm bằng FFmpeg atempo (không đổi pitch). Không tạo bản giọng nói mới.
- Nhạc: Giai điệu piano và lớp pad nguyên gốc được tổng hợp cho V3; giảm âm nhạc ở khoảnh khắc nghi ngờ, tăng dần ở cao trào.
- Hình: Dùng minh họa AI gốc, với các khung gần khuôn mặt, bàn tay, bước chân, mầm và núi; 2D Ken Burns / dissolve, không phải footage nhân vật diễn xuất thực.
- Công cụ xuất bản MP4: Python/OpenCV/Pillow + FFmpeg; **không** báo đã render thành công bằng Remotion. Source code/art/voice được bàn giao trong user-facing project ZIP, không tự nhận đã được commit vào repo.

## Phân đoạn

| Time | Nhịp và cảm xúc |
|---|---|
| 0–5,3s | Chậm, riêng tư, bắt đầu bằng ánh mắt và câu hỏi |
| 5,3–9,8s | Lắng, hạt giống & bộ rễ |
| 9,8–15,2s | Kiên trì vô hình, lạnh, nhạc mỏng |
| 15,2–21,4s | 6 micro-shot, cắt nhanh 0,85–1,2s theo thói quen |
| 21,4–27,2s | Gần lặng, phân vân, mầm cây xuất hiện |
| 27,2–35,8s | Cao trào: piano sáng, cảnh rộng bình minh, nhịp kể hạ chậm |

## Trạng thái lưu trữ

**Chưa archive MP4 thật vào GitHub Releases.** Hiện GitHub connector không nhận MP4 nhị phân từ runtime này. Theo `docs/production-archive-policy.md`, chỉ ghi "archived" sau khi asset nhị phân được upload vào draft Release và kiểm chứng kích thước/hash. Link video GitHub chưa tồn tại để cung cấp.

## Kiểm tra đã thực hiện

- FFprobe: đúng 35,8s, 1080×1920@30fps, H.264 và AAC
- Giải mã toàn bộ MP4 bằng FFmpeg: đạt
- Kiểm tra visual contact sheet 17 mốc và sửa các cảnh còn chữ in sẵn: đạt
- Audio mean ≈ -17,3 dBFS; peak ≈ -0,8 dBFS; câu nói cuối kết thúc trước 33,5s, còn dư âm nhạc

## Công việc còn lại để đạt chuẩn repo

1. Tạo composition Remotion đúng registry contract và thay source 2D local bằng asset hợp lệ có thể truy cập trong runner.
2. Thực thi `npm run verify`, `npm run test:visual` và `python3 -I scripts/pipeline.py audit <vid>` trong repo — chưa chạy các gate này cho bản xuất local.
3. Đưa MP4 thật vào GitHub Actions artifact/Release từ môi trường có thể upload bytes, rồi bổ sung URL và checksum asset kiểm chứng.
