# Thảo Nguyên Ella — Channel Setup & SEO Guide

- **Channel Key:** `THAO_NGUYEN_ELLA`
- **Channel ID:** `UCxt1zM1tzZ2vkEC5AMoVsKA`
- **Handle:** `@thaonguyenella`
- **Niche:** Tâm lý học ứng dụng, Kỹ năng giao tiếp công sở & Tài chính cá nhân (Host 2D: Ella)

## 1. Branding Assets (Ready for YouTube Studio)
- **Avatar (800×800 PNG):** [avatar-ella.png](avatar-ella.png)
- **Banner (2560×1440 PNG, Safe-Area 1546×423):** [banner-ella.png](banner-ella.png)
- **Video Watermark (Optional):** Dùng chính `avatar-ella.png` (chế độ *Toàn bộ video*).

## 2. API-Applied Metadata (Already Updated via `channels.update`)
- **Country:** `VN`
- **Default Language:** `vi`
- **Keywords:** `"tâm lý học ứng dụng" "giao tiếp công sở" "tài chính cá nhân" "kỹ năng mềm" "quản lý tiền bạc" "cách từ chối khéo" "đọc vị tâm lý" "phát triển bản thân" "thảo nguyên ella"`
- **Description:**
  > Chào mừng bạn đến với Thảo Nguyên Ella — kênh chia sẻ Tâm lý học ứng dụng, Kỹ năng giao tiếp công sở và Tài chính cá nhân thực chiến.
  >
  > Tại đây, bạn sẽ tìm thấy:
  > • Tâm lý giao tiếp & ranh giới cá nhân: Cách từ chối khéo, xử lý tình huống khó ở nơi làm việc và đọc vị hành vi.
  > • Tài chính cá nhân & thói quen tiền bạc: Thoát bẫy rò rỉ chi tiêu, quản lý lương thông minh và xây dựng quỹ dự phòng.
  > • Tư duy nâng cấp bản thân: Ngắn gọn, thực tế, áp dụng được ngay.
  >
  > Lịch đăng video mới: Shorts hằng ngày (19:00–20:00) và video phân tích chuyên sâu hằng tuần.
  > Đăng ký kênh để không bỏ lỡ tập mới nhất nhé!

## 3. YouTube Studio Manual Checklist (Thuật toán & Bật tính năng)
1. **Xác minh số điện thoại (Tính năng bậc 2 & 3):** Vào *Cài đặt → Kênh → Điều kiện sử dụng tính năng* để bật **Thumbnail tùy chỉnh** và **Video dài > 15 phút**.
2. **Upload Branding:** Vào *Tùy chỉnh → Hồ sơ*, tải lên `avatar-ella.png` và `banner-ella.png`.
3. **Upload Defaults (Mặc định tải lên):**
   - Chế độ hiển thị mặc định: `Riêng tư` hoặc `Không công khai` (để kiểm tra trước khi hẹn giờ 19:00–20:00).
   - Danh mục: `Giáo dục` (`category_id: "27"`).
   - Ngôn ngữ video: `Tiếng Việt`.
   - Ẩn số lượt thích (`publicStatsViewable: false`) — đã cấu hình mặc định trong `config/youtube-channel-targets.json`.
4. **3 Playlist phễu ngay khi có video:**
   - `Tâm Lý Giao Tiếp Công Sở`
   - `Tài Chính Cá Nhân Thực Chiến`
   - `Đọc Vị & Ranh Giới Cá Nhân`
5. **Lưu ý OAuth Secret:** `YOUTUBE_REFRESH_TOKEN_THAO_NGUYEN_ELLA.txt` được cấp bằng `~/Downloads/desktop-oauth.json`. Đảm bảo `YOUTUBE_CLIENT_ID` và `YOUTUBE_CLIENT_SECRET` trên GitHub Secrets khớp với `desktop-oauth.json` khi chạy workflow upload tự động.
