---
name: make-horror-video-illustrated
description: "Option B — Illustrated PNG layers + 2.5D code animation, dynamic lighting, camera shake/punch, fog, and VHS overlays (Llama Arts / Truyen cua Emma look). Use when the user wants high-detail painted horror visuals animated by code, e.g. \"làm truyện ma kết hợp ảnh\", \"make horror video option B\", \"phong cách Truyện của Emma\", \"Llama Arts style\"."
metadata:
  version: "0.3.0"
  author: Ray (built on Thanh Hai Learn AI 2D Studio)
---

# Truyện Ma 2D Studio — Option B (Ảnh Minh Họa + Code Animation / Lighting 2.5D)

Dùng skill này khi muốn đạt chất lượng hình ảnh **hội họa kinh dị chi tiết cao** (gần phong cách *Truyện của Emma*, *Llama Arts*), trong đó bối cảnh/nhân vật dùng ảnh PNG vẽ sẵn hoặc tạo sẵn nhiều lớp, còn code đảm nhiệm chuyển động camera 2.5D, ánh sáng động, sương mù, rung tim, flash hù dọa và hiệu ứng VHS.

## Kiến trúc kỹ thuật bắt buộc
1. **Thư mục assets:** Lưu toàn bộ ảnh PNG (chuẩn `1920x1080` cho 16:9 hoặc `1080x1920` cho 9:16) trong `projects/<slug>/assets/`.
2. **Preload ảnh trước khi render frame 0:** Dùng top-level `await Promise.all(...)` trong file scene `.js` để đảm bảo mọi `Image()` đã `onload` xong trước khi `render.mjs` chụp frame đầu tiên (`0.0s`), tránh khung hình đen:
   ```js
   function loadAsset(src) {
     return new Promise((resolve) => {
       const img = new Image();
       img.onload = () => resolve(img);
       img.onerror = () => resolve(img);
       img.src = src;
     });
   }
   const [bg, charImg] = await Promise.all([
     loadAsset('/project/assets/bg_alley.png'),
     loadAsset('/project/assets/char_minh.png'),
   ]);
   ```
3. **Đồng bộ nhân vật giữa nhiều ảnh:** Khi tạo/chuẩn bị ảnh cho một câu chuyện, khóa chặt mô tả ngoại hình cố định (kiểu tóc, áo khoác, tông màu, phong cách nét vẽ semi-realistic dark 2D) trong `story/bible.md` trước khi sinh ảnh hàng loạt.
4. **Hòa trộn lớp code 2.5D lên ảnh:**
   - Vẽ ảnh nền/nhân vật có `pad` dư (40–80px) để khi `cam` zoom (`H.creep`, `H.punch`) hoặc rung (`Math.sin(t * 38)`) không bị hở viền đen.
   - Kết hợp `H.ghost(...)` ở lớp xa, `H.fogBank(...)` trôi ngang, ánh sáng màn hình/đèn pin nhấp nháy bằng `createRadialGradient`, `H.heartbeatVignette(...)`, `H.scareFlash(...)`, `H.clockStamp(...)` và `H.vhs(...)`.

## Tài nguyên dùng chung trong plugin
- Studio & scripts: `../make-horror-video/kit/` (cài thành `truyenma-studio/`)
- Kịch bản, âm thanh, Vbee, đóng gói: `../make-horror-video/references/` (`horror-story-engine.md`, `horror-sound.md`, `voice.md`, `packaging.md`)
- Dự án tham chiếu thực tế: `truyenma-studio/projects/demo-option-b/scenes/shots/demo_b.js`

## Quy trình thực hiện
1. **Chạy Stage 0 → Stage 5** theo `../make-horror-video/SKILL.md` để chốt kịch bản, giọng đọc, `shots.json` và `story/bible.md`.
2. **Chuẩn bị bộ ảnh PNG theo `shots.json`:**
   - Liệt kê các cảnh cần ảnh nền (`bg_*.png`), nhân vật (`char_*.png`) và cận cảnh thực thể (`ghost_*.png`); ưu tiên tách lớp (nền riêng, nhân vật riêng) cho các cảnh cần chuyển động độc lập.
   - Chuẩn hóa kích thước về `1920x1080` (hoặc `1080x1920` cho Shorts) trong `projects/<slug>/assets/`.
3. **Dựng scene `.js` kết hợp ảnh + hiệu ứng code:**
   - Preload toàn bộ ảnh qua `await Promise.all(...)`.
   - Gắn chuyển động camera (`creep`, `punch`, breathing, shake), lớp sương mù, ánh sáng chập chờn và flash đúng beat trong `shots.json`.
4. **Kiểm tra thị giác, Render & Bàn giao Google Drive (mặc định):**
   - Chạy `node render.mjs --project projects/<slug> --sheet --scale 0.5` và mở `sheet_01.png` để xác nhận không có frame nào bị đen do thiếu preload, không lộ viền khi zoom/shake.
   - Render MP4 hoàn chỉnh thành `<slug>-final.mp4`, xuất thumbnail (`thumbnail-youtube.png`) và nội dung (`youtube-title-description.txt`).
   - Đẩy đủ 3 file lên Google Drive `Videos-shorts` (`$VIDEOS_SHORTS_FOLDER_ID`) trong folder mới `<N>. <Tên video> - <YYYY-MM-DD>`: **giữ tên thật của video sản xuất (`<slug>-final.mp4`, không đặt `video-final.mp4`)**, `thumbnail-youtube.png`, và `youtube-title-description.txt`; đọc lại metadata và trả về 4 đường link Google Drive bấm mở được.
