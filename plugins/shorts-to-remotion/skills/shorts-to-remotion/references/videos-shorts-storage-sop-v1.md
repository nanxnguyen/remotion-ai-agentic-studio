# QUY TẮC LƯU VIDEO – VIDEOS-SHORTS

Phiên bản: 1.0 · 2026-10-25

## Thư mục gốc

Google Drive: `Videos-shorts` Folder ID: `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`

## Quy tắc bất biến

1. **Một chủ đề/video gốc = một thư mục đánh số duy nhất.** V2, V3, V12.3.1, V12.3.2, FINAL, RESTORED, Podcast, thumbnail, voice, project và metadata thuộc cùng video phải nằm trong **cùng thư mục** đã có.
2. Trước mỗi lần lưu, **đọc lại danh sách tất cả folder con trực tiếp** trong `Videos-shorts`. Không dựa vào số thứ tự cũ ghi nhớ từ các lần trước. Nếu danh sách trả về bị cắt, phải phân trang/kiểm tra đủ.
3. Xác định định danh video theo thứ tự: `video_id`/`canonical_slug` đã khai báo trong manifest (nếu có) > tên chủ đề đã được xác nhận > tên folder chuẩn hóa. Khi chuẩn hóa, bỏ dấu câu, khoảng trắng thừa, ngày tháng và hậu tố phiên bản (`V2`, `V3`, `V12.3.2`, `FINAL`, `PREVIEW`, `RESTORED`), không đánh đồng hai chủ đề khác nhau chỉ vì từ ngữ tương tự. Đối với chủ đề có thể nhập nhằng, xem kịch bản/manifest trước khi quyết định dùng lại folder.
4. Nếu tìm thấy folder đúng chủ đề: **dùng lại folder ID đó**, không tạo folder khác. Không đổi số thứ tự chỉ vì nâng cấp video.
5. Nếu thực sự là chủ đề mới: lấy `next = max(các số thứ tự đầu tên folder hợp lệ) + 1`. Kiểm tra danh sách mới nhất trước khi tạo folder để tránh trùng số. Tạo theo mẫu `{next}. {Tên video} - {YYYY-MM-DD}`. Không tái sử dụng số của video khác.
6. Trước khi upload vào folder, kiểm tra file đã tồn tại chưa bằng tên, phiên bản, dung lượng và SHA-256/manifest khi có. Cùng nội dung -> bỏ qua upload; cùng tên nhưng nội dung khác -> lưu thành phiên bản khác (không ghi đè nếu người dùng chưa yêu cầu).
7. Cấu trúc mong muốn trong folder: `video-final-Vx.mp4`, `thumbnail-shorts-Vx.png`, `youtube-title-description-Vx.txt`, `production-manifest-Vx.json`, các phiên bản/nguồn nếu cần.
8. Sau upload, **kiểm tra lại bằng Google Drive**: URL và ID thật, đúng folder cha, MIME `video/mp4`, kích thước byte và các file được yêu cầu. Không báo thành công trước khi xác minh.
9. Không xóa hay di chuyển file của video khác; khi gặp folder trùng, đối chiếu toàn bộ nội dung trước. Các thao tác phá hủy cần được người dùng chấp thuận cụ thể.
10. Video nâng cấp cùng chủ đề phải lưu **bên cạnh bản gốc** để so sánh được hai link.

## Ví dụ đã kiểm chứng

- \#11 `Lớn Rồi, Không Cần Làm Vừa Lòng Tất Cả Nữa`: toàn bộ 4 tài liệu Podcast V3 đã chuyển về đây; không tạo thêm folder số 13.
- \#13 `Bạn Không Bắt Đầu Từ Số Không V12.3`: mọi bản V12.3.1 / V12.3.2 và bản tiếp theo đều lưu tại đây.
- Chủ đề mới tiếp theo dùng #14 (nếu không có folder mới khác được tạo trước đó).

**Lưu ý:** File này là SOP cho quy trình lưu trữ, không cấp quyền truy cập và không tự động chạy. Mỗi lần lưu vẫn phải thực hiện kiểm tra trực tiếp qua Google Drive API.

## Hướng dẫn thực thi cho agent

- Quy tắc SOP v1.0 này **thay thế quy định cũ** về tạo thư mục theo mỗi lần xuất và giới hạn mỗi thư mục chỉ có 3 file. Giữ tài sản nguyên bản và mọi phiên bản cạnh nhau; số tệp trong thư mục có thể nhiều hơn 3. Khi bàn giao bản FINAL, phải có video/thumbnail/title-description được yêu cầu cùng manifest nếu sản xuất được; chưa có thì báo thiếu trung thực.
- Trước thao tác ghi, liệt kê danh sách children thực tế từ Drive và xử lý phân trang bằng công cụ hỗ trợ. Tách folder được đặt tên REVIEW hoặc folder chỉ chứa các phiên bản cùng chủ đề vào folder gốc đúng chủ đề **chỉ khi được người dùng yêu cầu và sau khi kiểm tra kỹ, không tự di chuyển hoặc xóa**.
- Nếu một chủ đề mới chưa có video_id, có thể tạo canonical_slug ổn định trên manifest. Không tự gán số 14 cố định vì thư mục khác có thể đã được thêm trong thời gian giữa các phiên.
- Nếu quy tắc repo/skill cũ xung đột (ví dụ 3 file duy nhất, folder REVIEW mới cho bản V2/V3), ưu tiên SOP này cho việc bố trí thư mục. Tuân thủ quy trình QA/voice và các quy định bảo mật hiện hành riêng rẽ.
