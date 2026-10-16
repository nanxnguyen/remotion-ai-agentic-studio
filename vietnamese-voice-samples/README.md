# Bộ mẫu giọng tiếng Việt — 12/10/2026

## Nội dung

Gói gồm **37 mẫu MP3 trong danh mục**: 35 lựa chọn giọng tiếng Việt trong danh sách công khai của Vbee và 2 giọng ElevenLabs (Huyen, Ngan). Thư mục `previews/` còn có `Cam.mp3` do dự án thêm riêng, tổng cộng 38 file. 3 giọng FPT chưa tải được mẫu (xem mục cuối).

- `previews/`: 37 file trong danh mục và `Cam.mp3`. Tên file là tên giọng rút gọn. Thư mục này là danh mục giọng (bản CSV/JSON cũ đã bỏ); khi chọn giọng, ghi nhà cung cấp và mã giọng lấy từ trang của nhà cung cấp vào `brief.md`.
- `README.md`: hướng dẫn sử dụng và giới hạn.

Một số giọng Vbee có nhiều phiên bản (cơ bản, nâng cao, Pro, 2.0, Beta). Gói giữ riêng theo mã giọng, không gộp các phiên bản chỉ vì cùng tên.

## Cách nghe và sử dụng

1. Giải nén toàn bộ gói ZIP.
2. Nghe MP3 trong `previews`. Chạy `python3 -m unittest scripts.test_voice_catalog` từ thư mục gốc dự án để xác nhận thư mục mẫu còn đủ file.
3. Ưu tiên nghe Ngan, Huyen, Ngọc Huyền, Tường Vy, Thảo Trinh và Lan Trinh nếu muốn thử phong cách nữ gần gũi. Đây là ứng viên để so sánh, không phải bảng xếp hạng chất lượng đã nghe đánh giá.
4. Muốn đọc kịch bản mới, chọn giọng trên dịch vụ tương ứng bằng tên/mã được ghi trong danh sách. Các giọng Vbee không tự xuất hiện trong kết nối vidIQ; cần dùng Vbee. Tương tự, Huyen và Ngan không thuộc danh sách 21 giọng vidIQ đã lấy trước đó.
5. Xuất lời đọc mới thành MP3 và đưa vào `public/audio/voice.mp3` của Remotion; chỉnh timeline và caption theo bản thu mới.

## Câu kiểm tra đề xuất

“Ủa… mới mở repo thôi mà em tưởng đang khai quật di tích! Bình tĩnh nha, để em kiếm cái bản đồ đã.”

Khi thử, so sánh dấu tiếng Việt, nhịp nghỉ, từ tiếng Anh xen kẽ và cách nhấn câu đùa. Giọng dễ thương là cảm nhận cá nhân, chưa được xác nhận chỉ từ mô tả của nhà cung cấp.

## Nguồn

- Danh sách Vbee công khai: https://vbee.vn/api/v1/voices?language_code=vi-VN&limit=100&offset=0&active=true — trả 35 mục, tổng metadata 35 tại thời điểm lấy.
- Trang Vbee: https://vbee.vn/
- Giọng Huyen được ElevenLabs liệt kê tại https://elevenlabs.io/text-to-speech/vietnamese
- Link MP3 Huyen và Ngan lấy từ trang gallery JSON2Video và trỏ đến kho mẫu ElevenLabs; `sourcePage` lưu riêng cho mỗi giọng. Đây là nguồn gallery bên thứ ba, không phải tài khoản ElevenLabs của người dùng.
- Thông tin FPT: https://docs.fpt.ai/docs/vi/speech/api/text-to-speech/

## Phần chưa tải được

Lan Nhi (`lannhi`), Linh San (`linhsan`), Ban Mai (`banmai`) của FPT.AI: trang mẫu trả HTTP 403 trong môi trường này và chưa tìm được link MP3 công khai xác minh được. Gói không có file âm thanh của 3 giọng này. Nghe tại https://voicemaker.fpt.ai/

## Giới hạn

Đây là bộ mẫu nghe công khai, không chứa mô hình TTS offline, không tạo bản thu mới và không sao chép giọng người khác. Các mẫu không đọc cùng kịch bản. Mẫu ElevenLabs chưa được kiểm tra ngôn ngữ bằng nghe thủ công; việc tải và xác minh định dạng không đồng nghĩa đã đánh giá độ tự nhiên hoặc độ dễ thương.

“Toàn bộ” ở đây là 35 giọng trong danh sách Vbee công khai đã trả về và 2 mẫu ElevenLabs tìm được; không phải toàn bộ giọng của mọi nhà cung cấp hoặc thư viện cộng đồng Vbee.

Bộ mẫu dùng để nghe chọn giọng, không tự cấp thêm quyền sử dụng âm thanh mẫu trong video thương mại. Khi tạo và xuất bản bản thu mới, áp dụng điều khoản của dịch vụ tương ứng.
