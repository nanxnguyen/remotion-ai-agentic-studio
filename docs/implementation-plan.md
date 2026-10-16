# Implementation plan

1. Dùng ảnh hero chính thức và dữ liệu graph công khai trong repo làm nền thị giác.
2. Dựng sáu scene thuần Remotion, tất cả animation là hàm xác định theo frame.
3. Sinh voice từng đoạn để giữ nhịp nói tự nhiên; ghép theo shot timeline.
4. Cắm SFX theo offset tương đối từng shot; duck BGM dưới voice.
5. Render hai MP4, trích contact sheet, kiểm tra caption/safe zone/audio/codec.
6. Đóng gói source, asset manifest và báo cáo QA.
