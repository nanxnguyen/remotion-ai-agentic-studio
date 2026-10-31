# QA — Không Ai Vỗ Tay Cho Ngày Đầu Tiên V5 (Gate 1)

Ngày: 2026-10-31. Trạng thái: **PROOF / CHƯA ĐƯỢC DUYỆT / KHÔNG PHẢI FINAL 140 GIÂY**.

## Mục tiêu khóa bởi Master Prompt V3

- Phim đầy đủ dài 140 giây, nhưng Gate 1 yêu cầu một đoạn 15 giây trước khi mở rộng.
- Nội dung: 00–04 chạy, 04–08 chống đẩy, 08–12 đấm bao cát, 12–15 đưa tay giúp cậu bé.
- Render từng frame bằng đồ họa vector lập trình **trực tiếp tại 1920×1080**, không upscale 720p24.
- Sản phẩm: `V5-GATE1-15s-1080p30.mp4`; có bản storyboard lấy trực tiếp từ MP4.
- Audio: nhạc/hiệu ứng tổng hợp nguyên bản, stereo 48 kHz (không sử dụng sound clip từ phim tham chiếu).

## Đã kiểm chứng bằng công cụ

- File: H.264 / yuv420p 1920×1080 @30 FPS, audio AAC @48 kHz stereo, duration 15.000s.
- Giải mã toàn bộ video + audio với FFmpeg thành công.
- 8 bài kiểm thử `src/test_v5.py` đạt (kinematics/run world contact/IK/plank/fist contact/child hand attachment).
- Kiểm tra thị giác trên 16 frame trích trực tiếp từ MP4.
- Đánh giá thực tế: **người chưa duyệt**, chuyển động vẫn thiên về procedural puppet; khớp cánh tay khi chạy và đứng lên, nhịp chống đẩy/cú đấm, nét mặt, môi trường/camera còn cần animator tinh chỉnh.
- **Chưa đạt chứng nhận ≥8/10 diễn xuất/camera**. Không coi Gate 1 đã chính thức PASS, dù các kiểm tra kỹ thuật PASS.

## Các vấn đề còn phải xử lý trước Gate 2

1. Chỉnh tay pose chính của chạy: heel/toe roll, body mass, swing arm, root acceleration; giữ contact lock khi camera theo nhân vật.
2. Chỉnh chống đẩy bằng line-of-action và arm/shoulder load, tránh khuỷu cứng.
3. Đấm: shoulder/hip rotation nhiều hơn, guard hand, recoil, phát âm thanh ở impact, motion blur đúng hướng.
4. Hai nhân vật: thể hiện nhận ra nhau bằng mắt/đầu, không chỉ nhìn thoáng qua; kết thúc có gesture/holding beat rõ.
5. Phông nền: thêm 2.5D parallax có chiều sâu, shadow tracking và scene-specific lighting; hạn chế bố cục phẳng.
6. Port rig và timeline sang **Remotion trong repository**; bản Gate1 hiện là Python/Pillow renderer, chưa phải Remotion composition.
7. Review 15 giây ở tốc độ 1x (không chỉ contact sheet), đánh giá ≥8/10 cho 5 tiêu chí.
8. Chỉ khi Gate 1 được duyệt mới mở rộng sang bản phim 140 giây, theo đúng chỉ đạo của Master Prompt V3.

## Tài sản và nguồn

- `src/rig_v5.py`: pure deterministic 2D FK/IK/actions/prop constraints.
- `src/render_gate1.py`: native 1080p30 renderer và original soundtrack, deterministic 450 frames.
- `src/test_v5.py`: 8 regression tests.
- `manifest-v5-gate1.json`: sha, spec, định danh phiên bản.
- `V5-actual-mp4-QA-contact.jpg`: 16 khung render thật.

Tất cả đồ họa, nhân vật và nhạc trong Gate1 được tạo nguyên bản; không nhúng frame, âm thanh hoặc visual asset từ phim DISCIPLINE. Nguồn tham chiếu chỉ dùng để phân tích kỹ thuật.
