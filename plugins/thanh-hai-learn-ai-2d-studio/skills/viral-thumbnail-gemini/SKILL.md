---
name: viral-thumbnail-gemini
description: Tự động điều khiển `claude -p ... --chrome` dùng session Google Gemini đang đăng nhập sẵn (`Neon Cao`) để tạo thumbnail YouTube triệu view / CTR cao (chữ trắng distressed + đỏ rực + mũi tên đỏ + tia `!` vàng), kiểm tra trực quan và lưu đúng vào `docs/<slug>/thumbnail-youtube.png`.
---

# Viral Thumbnail Gemini (`claude --chrome`)

Skill này tự động hoá quy trình tạo **thumbnail YouTube CTR cao** bằng **Google Gemini (`Neon Cao`)** thông qua **Claude in Chrome** (`claude -p ... --chrome`), tận dụng session Google đã đăng nhập sẵn trên Chrome cá nhân mà **không cần xác thực lại**.

---

## 1. Điều kiện tiên quyết

1. Máy đã cài `claude` CLI hỗ trợ flag `--chrome` (kiểm tra nhanh: `claude --help | grep -i chrome`).
2. Extension **Claude in Chrome** đang bật và kết nối với cửa sổ Chrome cá nhân có sẵn session Google Gemini (`https://gemini.google.com/app`).
3. Luôn kiểm tra kịch bản/tiêu đề trong `docs/<slug>/` trước khi viết prompt tạo ảnh để đảm bảo thumbnail đánh trúng cú twist hoặc nút thắt hấp dẫn nhất.

---

## 2. Bộ nhận diện & Tên kênh chuẩn (BẮT BUỘC DÙNG ĐÚNG)

| Kênh | Tên hiển thị trên Thumbnail | Tỷ lệ | Phong cách hình & chữ |
|---|---|---|---|
| **A Xìn Chém Sử** (`A_XIN_KE_CHUYEN`) | `A XÌN CHÉM SỬ` *(tuyệt đối không ghi nhầm thành A Xìn Kể Chuyện)* | `16:9` (dài) / `9:16` (Shorts) | Minh họa lịch sử 2D/2.5D nét mực tối (`crimson / gold / jade`), bố cục tương phản nhân vật mưu lược tiền cảnh + chiến trường/cảnh sử hậu cảnh, chữ trắng distressed + đỏ rực, mũi tên đỏ cong, tia `!` vàng, badge năm đỏ (`NĂM 264`). |
| **Hẻm Chuyện Lạ** (`HEM_CHUYEN_LA`) | `HẺM CHUYỆN LẠ` | `16:9` / `9:16` | Dark comic / khắc mực rùng rợn (nhà gỗ mưa bão, bàn thờ, sương mù), nhân vật hoảng sợ tiền cảnh phải + bàn tay/bóng ma phía sau, đồng hồ đỏ (`03:15`), tia `!` vàng, chữ trắng/đỏ rỉ máu. |
| **Khủng Long Tí Hon** (`TINY_REX`) | `KHỦNG LONG TÍ HON` | `16:9` / `9:16` | 2D/3D tương phản tiến hoá hoặc câu hỏi A/B gây tò mò, nhân vật Tí Hon nổi bật, chữ trắng-vàng-đỏ cực ngắn (2–4 từ). |
| **Tech Cà Chớn** (`TECH_CA_CHON`) | `TECH CÀ CHỚN` | `16:9` / `9:16` | Tech high-contrast, so sánh số liệu/biểu tượng AI nổi bật, chữ đậm gọn. |
| **Olise Man** (`OLISE_MAN`) | *(Tiếng Anh, tối giản tên kênh)* | `16:9` / `9:16` | Dark editorial / survival / dark psychology, ánh sáng điện ảnh, 2–4 từ tiếng Anh gây tò mò tột độ. |
| **Sống Chậm Lại** (`CU_LA_CHINH_MINH`) | *(Tối giản, chỉ 2 dòng móc câu TRẮNG + VÀNG CAM trên cùng; không chèn dòng tên kênh thứ 3 nếu không cần)* | `9:16` / `16:9` | **BẮT BUỘC dùng từ khóa `2D stickman / white stick figure` (KHÔNG dùng `chibi` hay `anime`)**: đầu tròn trắng trơn hoàn toàn (không tóc, không tai, không mũi), chỉ có 2 chấm tròn mắt + 1 nét miệng đơn giản, tay chân que mảnh viền đen đậm; đặt trên nền đêm mưa tối sâu (deep dark night) tương phản cực mạnh với 1 nguồn ánh sáng đèn đường vàng cam ấm phản chiếu mặt đường ướt + hạt bụi vàng lấp lánh. |

---

## 3. Công thức Thumbnail Triệu View (High-CTR Formula)

1. **Quy tắc 3 tầng chữ (bên trái hoặc vùng tối thoáng):**
   - **Dòng 1 (Móc câu trên):** 3–4 từ IN HOA, font dày mạnh mẽ, màu **TRẮNG hơi xước nhẹ (distressed)**, viền đen dày.
   - **Dòng 2 (Cao trào/Twist):** 3–4 từ IN HOA, font dày, màu **ĐỎ RỰC phát sáng nhẹ**, viền đen dày.
   - **Dòng 3 (Thương hiệu):** Tên kênh chuẩn (VD: `A XÌN CHÉM SỬ` hoặc `A XÌN CHÉM SỬ - TẬP 5`), màu **TRẮNG sạch**, cỡ nhỏ hơn vừa phải.
2. **Yếu tố dẫn mắt (Visual Hook):**
   - **1 mũi tên đỏ cong** chỉ thẳng vào chi tiết đắt giá nhất (quân cờ, bàn tay, vật chứng, nhân vật bí ẩn).
   - **1 dấu chấm than (`!`) màu vàng phát sáng** (hoặc biểu cảm sốc) ở điểm nhấn.
   - **Không chèn quá 3 cụm chữ**, không trùng từ khoá với Tiêu đề YouTube (kiểm tra bằng `python3 .claude/skills/yt-package/title.py --title "<tiêu đề>" --thumb "<chữ trên thumb>"`).
3. **Khuyến nghị chạy 2 nhịp nếu cần độ hoàn hảo cao:**
   - *Nhịp 1:* Tạo ảnh nền sạch (không chữ) để chốt bố cục nhân vật, ánh sáng và chừa khoảng tối bên trái.
   - *Nhịp 2:* Yêu cầu Gemini giữ 100% bố cục ảnh vừa tạo và thêm đúng 3 dòng chữ tiếng Việt + mũi tên đỏ + tia `!` vàng.

---

## 4. Quy trình thực thi tự động với `claude --chrome`

### Bước 1: Đọc kịch bản & chốt concept
- Đọc `docs/<slug>/script.md` hoặc `docs/<slug>/narration-vbee.txt` (50–80 dòng đầu) để tìm **cú twist / hình ảnh đắt giá nhất**.
- Chốt:
  - Dòng 1 (Trắng) + Dòng 2 (Đỏ) + Dòng 3 (Tên kênh chuẩn).
  - Tỷ lệ (`16:9` hoặc `9:16`).
  - Đường dẫn lưu: `/Users/nguyenanhnhut/Desktop/Projects/AI-video-edition/docs/<slug>/thumbnail-youtube.png`.

### Bước 2: Gọi `claude -p ... --chrome`
Chạy lệnh shell (dạng background task với timeout ~180s):

```bash
claude -p "Hãy dùng Claude in Chrome trên cửa sổ Chrome hiện tại (session Google đã đăng nhập sẵn) để tạo thumbnail YouTube trên Google Gemini và lưu về máy:
1. Mở https://gemini.google.com/app (bấm Cuộc trò chuyện mới).
2. Kiểm tra dropdown model ở góc phải ô nhập 'Hỏi Gemini': đảm bảo đang chọn đúng 'Neon Cao' (nếu chưa, hãy chuyển sang 'Neon Cao').
3. Gửi prompt tạo ảnh tỷ lệ <16:9 hoặc 9:16>, phong cách <phong cách kênh>, bố cục kịch tính tương phản cao, chừa vùng tối bên trái để đặt chữ cực kỳ dễ đọc trên điện thoại:
   - Hình ảnh chính: <mô tả nhân vật tiền cảnh & bối cảnh hậu cảnh>
   - Typography tiếng Việt chuẩn xác, không sai dấu, không chữ rác:
     + Dòng 1 (in hoa lớn, trắng distressed, viền đen dày): <DÒNG 1>
     + Dòng 2 (in hoa lớn, đỏ rực phát sáng nhẹ, viền đen dày): <DÒNG 2>
     + Dòng 3 (nhỏ vừa, trắng sạch, viền đen): <TÊN KÊNH CHUẨN>
   - Thêm 1 mũi tên đỏ cong chỉ vào <điểm nhấn> và 1 tia chấm than (!) màu vàng phát sáng nhỏ.
4. Chờ Gemini tạo xong ảnh. Kiểm tra kỹ chính tả/dấu tiếng Việt và bố cục. Nếu sai dấu hoặc lệch bố cục, yêu cầu Gemini sửa lại 1 lần (giữ 100% phần đạt, chỉ sửa chỗ lỗi).
5. Bấm Tải xuống kích thước gốc về máy, rồi di chuyển/đổi tên thành đúng đường dẫn:
   /Users/nguyenanhnhut/Desktop/Projects/AI-video-edition/docs/<slug>/thumbnail-youtube.png" --chrome
```

### Bước 3: Kiểm tra trực quan (Visual QA Gate — Bắt buộc)
1. Mở trực tiếp `docs/<slug>/thumbnail-youtube.png` bằng `read_file` để tự mắt kiểm tra:
   - Đúng dấu & chính tả tiếng Việt 100%.
   - Đúng tên kênh (VD: `A XÌN CHÉM SỬ`).
   - Đúng tỷ lệ (`16:9` hoặc `9:16`), chữ đọc rõ ngay cả khi thu nhỏ cỡ màn hình điện thoại.
2. Nếu chỉ sai 1 chi tiết nhỏ (ví dụ sai tên kênh hoặc sai 1 dấu), gọi lại `claude -p ... --chrome` mở lại đúng URL đoạn chat Gemini đó và yêu cầu: *"Giữ nguyên 100% ảnh vừa tạo, chỉ sửa duy nhất dòng chữ ... thành ..."*.
3. **Lưu ý giới hạn 2MB của YouTube:** Gemini tải về bản gốc thường là PNG 2730×1536 (~8–9 MB). Giữ file PNG gốc làm bản master; khi upload lên YouTube qua API, xuất thêm bản nén JPEG `1280×720` (hoặc `1080×1920` cho Shorts) dưới `2MB`.
