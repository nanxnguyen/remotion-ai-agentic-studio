# YOUTUBE PACKAGING — THUMBNAIL, TITLE, DESCRIPTION

## Thumbnail là deliverable bắt buộc
Sinh một **thumbnail riêng cho từng video**, không dùng contact sheet làm thumbnail, không tái sử dụng ảnh y hệt tập trước nếu làm mất dấu ấn chủ đề. Thể hiện cảnh thiên nhiên điện ảnh kịch tính + đúng TV Retro đen–đồng; tăng tương phản và chiều sâu nhưng không gian dối về nội dung. Nếu có công cụ tạo ảnh, ưu tiên tạo tác phẩm minh họa/clean plate hợp lệ. Kiểm tra bằng mắt ở cỡ màn hình 160px để chắc chắn điểm nhấn rõ ràng.

| Loại video | Thumbnail | Format | Khu vực chữ |
|---|---|---|---|
| **Shorts 9:16** | **1080×1920** dọc | PNG/JPG | center, tránh khoảng 15% trên & 22% dưới có UI Shorts |
| **Video dài 16:9** | **1280×720** ngang (hoặc 1920×1080) | JPG/PNG | ưu tiên một phần ba trái hoặc phải có contrast tốt |

YouTube có thể giới hạn lựa chọn ảnh đại diện Shorts so với video dài tùy luồng đăng và giao diện; giữ file cover độc lập để dùng trên các nền tảng và kiểm cách YouTube lấy frame khi đăng. Không hứa tự upload/custom thumbnail nếu tài khoản không hỗ trợ.

## Khung thumb truyền động lực thu hút
- **Điểm nhìn:** một mầm cây/hoa/chiếc lá có nắng vàng chói nhẹ, chiếc TV Retro và nét đồng vàng tạo độ nhận diện.
- **Chữ đập vào mắt:** 3–6 từ, lớn, dấu tiếng Việt chuẩn. Ví dụ: “BẠN KHÔNG HỀ CHẬM”, “ĐỪNG TỪ BỎ HÔM NAY”, “CỨ NỞ HOA ĐÚNG MÙA”, “MỘT CHÚT MỖI NGÀY”. Không nhồi transcript lên thumb.
- **Hierarchy:** 1 chủ thể, 1 headline, tối đa 1 accent: trắng + vàng champagne, outline nhẹ nếu nền sáng.
- **Dramatic but hopeful:** tương phản vàng–xanh sâu, ánh sáng bùng qua lá; không làm ảnh kinh dị/giật sợ/đánh lừa người xem.
- **Check:** cỡ chữ, tỉ lệ mặt kính/TV, crop, độ tương phản và dấu font. Nếu có ảnh text AI sinh sai, xóa text và typeset bằng layer riêng.

## YouTube metadata tối thiểu
Lưu nguyên nội dung vào `youtube-title-description.txt` (UTF-8):
```
TITLE:
<Một tựa chính, tiếng Việt tự nhiên, ưu tiên 45–65 ký tự>

ALTERNATIVE TITLES:
1. <A>
2. <B>

DESCRIPTION:
<2 câu đầu đặt hook và giá trị rõ ràng>
<1–2 đoạn tóm tắt, cảm xúc, thông điệp cụ thể, không trùng lặp máy móc>
<lời gợi bình luận nhẹ, không cưỡng ép>

HASHTAGS:
#Shorts #TruyenDongLuc #ChuaLanh #RetroTV #SongTichCuc

TAGS:
<8–12 từ khóa thực, không spam>

THUMBNAIL_TEXT:
<3–6 từ như đã render>

GITHUB_RELEASE_URL:
<verified actual link, or PENDING>

DRIVE_FOLDER_URL:
<verified actual link, or PENDING>
```
- YouTube title nên tự nhiên, giàu cảm xúc, hạn chế clickbait giả, không spam chữ hoa/emoji.
- Hashtag tối đa 3–5 đúng chủ đề; không làm quá dày. Có thể đề xuất bản A/B nhưng chỉ một tựa chính trong file.
- Nếu người dùng muốn, kèm thêm pinned comment, chapters cho video dài và hashtag tối ưu riêng Facebook/TikTok.
