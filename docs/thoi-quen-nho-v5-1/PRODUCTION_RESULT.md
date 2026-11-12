# V5.1 Be Vietnam Pro — Editorial Square Frame

## Đã dựng và QA tại ChatGPT

- Bản render thật: `Thanh_Cong_Thoi_Quen_Nho_V5_1_BeVietnam_Editorial.mp4`
- Duration **25.333333s**, 760 frames at **30fps**, **1080×1920**, H.264 + AAC.
- Footage vuông nguyên bản: 640×640 tọa độ (220, 640), nền đen biên tập; khung kim loại champagne mảnh, nhãn chữ tối giản, thanh tiến trình nhỏ.
- Caption **Be Vietnam Pro ExtraBold thật**: 41 hình PNG trong artifact Actions [#40071347158](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40071347158); font nhị phân KHÔNG được commit hoặc bàn giao.
- Highlight câu chữ vàng ấm theo 41 nhịp, underline 2px, crossfade 0.11s; âm thanh giữ nguyên Vbee Ngọc Huyền và nhạc cảm hứng của bản V5.
- Nền cảnh thiên nhiên sử dụng footage tham chiếu người dùng cung cấp, đã làm sạch chữ cũ; cần xác minh quyền phát hành công khai.

## QA

- FFprobe 25.333333s, 760 frames, H.264/AAC, 1080×1920.
- FFmpeg decode toàn file không lỗi.
- Kiểm tra 15 snapshot của video hoàn chỉnh, thấy rõ BeVietnam highlights tại các mốc cảm xúc.
- SHA-256 binary render: `a9f6045cd01671685e98c032717adfe0f06f1644f2b756269bb0f50792faa8ad`
- File size **6,332,507 bytes**.
- Mã dựng, 41 PNG typography, background, audio và QA được bàn giao trong ZIP ChatGPT. Không đính kèm file font.

## Trạng thái GitHub

**PENDING ARCHIVE**: binary MP4 chưa được upload lên GitHub Releases; hiện không có link video GitHub đáng tin cậy. Các source cần được đưa vào repo theo chuẩn pipeline sau khi qua các gate; không đánh dấu đã archive từ riêng manifest.

**Remotion and canonical pipeline:** rendering V5.1 performed with OpenCV / FFmpeg; `npm run verify`, `npm run test:visual` và audit pipeline chưa chạy với phiên bản này. PR giữ Draft đến khi đầy đủ gate.
