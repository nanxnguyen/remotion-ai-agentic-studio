# STORAGE & QA — BẮT BUỘC CHO MỖI VIDEO

## Hai đích do người dùng chốt
**Google Drive parent:** `Videos-shorts` tại `https://drive.google.com/drive/folders/1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D` (folder id `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`). Cần dùng chính folder này, không dùng root Drive hoặc thư mục có tên tương tự.
**GitHub repo:** `nanxnguyen/remotion-ai-agentic-studio`, lưu code/spec và MP4 thực vào **GitHub Releases**.

## Quy tắc đánh số Drive liên tục
1. Trước khi tạo: dùng Google Drive `list_folder` trên **đúng URL parent** với page/`top_k` đủ lớn để thấy tất cả folder. Lọc chỉ các folder khớp `/^(\d+)\.\s+(.+?)\s+-\s+(\d{4}-\d{2}-\d{2})$/`; bỏ qua file lẻ và tài liệu khác. `next = max(existing N)+1`, không tái sử dụng số đã tồn tại. Nếu muốn lấp số trống cũ phải có yêu cầu trực tiếp.
2. Kiểm tra ngay trước lúc `create_folder`, tránh trùng số khi hai job chạy đồng thời. Khi có xung đột, đọc lại danh sách và lấy số mới. Không tự tạo folder trống khi chưa có video final.
3. Tên chuẩn: **`N. tên video - YYYY-MM-DD`**, ví dụ `5. Đừng So Sánh Hành Trình Của Mình - 2026-10-24`. Ngày sản xuất dùng **Asia/Ho_Chi_Minh** ngày xuất final/QA, không mặc định ngày biên kịch.
4. Không di chuyển/xóa đổi tên thư mục cũ. Nếu folder chủ đề đã tồn tại, kiểm tra nội dung và chỉ điền asset thiếu/được phép cập nhật, không tạo bản trùng.

**Tình trạng được kiểm tra ngày 2026-10-24:** Parent có các số 1, 2, 3, 4; **số tiếp theo hiện là 5**, nhưng ở các phiên sau LUÔN đọc danh sách lại, không hardcode 5.

## Cấu trúc mỗi folder
```
N. Tên Video - YYYY-MM-DD/
  video-final.mp4                   # MASTER cuối đã QA
  thumbnail-shorts-1080x1920.png    # nếu Shorts 9:16
  # HOẶC thumbnail-long-1280x720.jpg nếu video dài 16:9
  youtube-title-description.txt    # TITLE, 2 alternatives, DESCRIPTION, HASHTAGS, TAGS, THUMBNAIL_TEXT, LINKS
  production-manifest.json         # sha, size, voice, date, 4-act, refs
  qa-contact-sheet.jpg             # optional nhưng nên có
```
File tối thiểu **MP4 + thumbnail đúng tỉ lệ + YouTube metadata**, thêm manifest để kiểm chứng. Với Shorts không mặc định thumbnail 1280x720 như video ngang.

## GitHub Releases bắt buộc
1. Đưa source project/metadata lên repository với branch/PR (hoặc main khi được yêu cầu). Video lưu GitHub Releases tag có version/slug/ngày, ví dụ `retro-tv-v9-2026-10-24`.
2. Upload **actual MP4 binary**, không dùng link PR/README để thay cho MP4. Nếu API connector không hỗ trợ upload binary trực tiếp, dùng GitHub Actions và đường truyền được cấp quyền, chia nhỏ rồi ghép bằng SHA nếu cần. Tất cả writes phải an toàn, giới hạn và không lộ token trong log.
3. Xác minh `release.assets`: đúng tên, >0 bytes, SHA-256 đúng local; tốt nhất tải ngược file để kiểm tra. Không cung cấp đường dẫn giả chưa tồn tại.
4. Đối chiếu bản Drive MP4 và GitHub asset bằng SHA256/size nếu tool cho phép; nếu không đủ quyền đọc thì ghi “chưa xác minh checksum chéo”.

## Lưu Google Drive
- Đọc metadata parent và file nguồn trước. Upload trực tiếp vào folder mới bằng `upload_file(parent_folder_id=<actual folder id>, file_uri=<verified file reference>)`; hoặc `copy_file` từ file Drive đã có để tránh truyền thêm dung lượng. Sau đó đọc lại folder/file metadata.
- Không tự chia sẻ `anyone with link` công khai chỉ vì cần YouTube; tôn trọng private hiện hữu. Link Drive riêng tư có thể yêu cầu người xem đăng nhập.
- Khi file đã có tên trong folder, kiểm tra trước rồi copy/update một cách có chủ đích, tránh 2 `video-final.mp4`.

## Gates bắt buộc trước khi nói Done
- [ ] đúng kịch bản/hook/body/climax/ending và đủ voice thật (nếu yêu cầu Vbee).
- [ ] full FFmpeg decode pass, ffprobe đúng FPS/resolution/duration/audio codecs.
- [ ] chữ Việt đúng dấu + karaoke focus đúng nhịp; không lộ chữ cũ trong màn hình TV.
- [ ] thumbnail nhìn tốt trên di động, đúng **1080×1920 Shorts** hoặc **1280×720 video dài**.
- [ ] `youtube-title-description.txt` chứa title/description/hashtag và từ khóa, không bịa số lượt xem.
- [ ] Google Drive folder đúng thứ tự và ≥3 file bắt buộc; đọc lại metadata.
- [ ] GitHub Release MP4 binary tồn tại thật và checksum kiểm tra.
- [ ] Báo cáo rõ trạng thái từng đích; nếu fail một nơi, nói fail đúng nơi đó.

## Mẫu báo cáo bàn giao
```
✅ Video: <tên> — <duration> | <resolution> | <fps>
🎬 MP4 Google Drive: <actual view URL>
📁 Folder Drive: <actual folder URL>
🖼️ Thumbnail: <actual Drive file URL>
📝 YouTube title+description: <actual Drive file URL>
⬇️ GitHub MP4: <actual release browser_download_url>
🔒 SHA256: <digest>
QA: render/audio/typography/ratio — PASS hoặc PENDING từng hạng mục.
```
