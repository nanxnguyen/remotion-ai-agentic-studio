# tay-tao-video-truyen-dong-luc

Plugin riêng tư hướng dẫn sản xuất video truyền động lực và chữa lành với phong cách Retro TV đã được duyệt.

## Khả năng
- Phát triển 3–5 chủ đề có hook / key emotion / câu chốt.
- Viết kịch bản 4 hồi, shotlist/voice cue/caption beat chính xác để dựng.
- Hướng dẫn dựng video chuyển động thật trong mặt kính CRT, karaoke gold focus và giọng Vbee Ngọc Huyền khi có quyền công cụ.
- Tạo thumbnail dọc 1080×1920 cho Shorts, ngang 1280×720 cho video dài; gói title và description chuẩn YouTube.
- Quy trình lưu Google Drive có đánh số tăng dần trong parent `Videos-shorts`, lưu MP4 thực tại GitHub Releases và kiểm tra checksum.

## Tài khoản đích đã chốt
Google Drive: https://drive.google.com/drive/folders/1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D
GitHub: https://github.com/nanxnguyen/remotion-ai-agentic-studio

Plugin v1.0.0 là skills-only, không cung cấp MCP server riêng hoặc tác vụ chạy nền. Video cần kết nối các công cụ render, voice và Drive/GitHub được phép.

## Quy trình thư mục Drive
`N. Tên Video - YYYY-MM-DD/video-final.mp4 + thumbnail-shorts-1080x1920.png + youtube-title-description.txt (+ production-manifest.json)`.
Luôn đọc số mới nhất thay vì hardcode. Ngày sử dụng theo Asia/Ho_Chi_Minh. Không tự chia sẻ công khai.

## Frame
`assets/retro-tv-reference.jpg`: khung Retro TV nguồn do người dùng chọn. `assets/plugin-icon.png`: biểu tượng crop từ ảnh đó. Không phân phối font file.
