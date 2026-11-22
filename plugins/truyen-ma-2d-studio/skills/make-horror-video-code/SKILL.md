---
name: make-horror-video-code
description: "Option A — 100% code-drawn horror video pipeline with upgraded procedural details (mossy/cracked walls, puddle reflections, detailed close-up facial fear, deep-socket hair-parting ghost, 2.5D camera & horror sound). Use when the user wants a fully automated, zero-image-cost horror story video, e.g. \"làm truyện ma bằng code\", \"make horror video option A\", \"truyện ma 100% code\"."
metadata:
  version: "0.3.0"
  author: Ray (built on Thanh Hai Learn AI 2D Studio)
---

# Truyện Ma 2D Studio — Option A (100% Vẽ Bằng Code Nâng Cấp)

Dùng skill này khi muốn sản xuất video truyện ma **tự động 100%, không cần ảnh vẽ sẵn bên ngoài**, đồng nhất nhân vật tuyệt đối và giữ chi phí tài nguyên bằng 0, nhưng nâng cấp độ chi tiết vượt trội so với stickman mặc định.

## Khác biệt so với bản cơ bản
- **Bối cảnh có chất liệu thật hơn:** thêm vết nứt tường, mảng rêu ẩm mốc, vết ố nước, dây điện chằng chịt, vũng nước phản chiếu ánh đèn vàng chập chờn (dùng deterministic PRNG `seeded()` — không dùng `Math.random()`).
- **Cận cảnh người sống chi tiết:** không dùng đầu tròn stickman ở close-up; vẽ khung mặt có quai hàm, hốc mắt tối, đồng tử co lại và rung nhẹ theo nhịp tim, giọt mồ hôi lạnh, tóc lay nhẹ, ánh sáng xanh trắng từ màn hình điện thoại hắt lên mặt.
- **Cận cảnh thực thể ma rợn người:** thay mắt tròn bằng hốc mắt sâu hoắm, quầng thâm, đồng tử nhỏ trắng đục/đỏ mờ, miệng há bóng tối, các lớp sợi tóc rẽ tự nhiên chuyển động mềm + `punch()` + `scareFlash()` + `vhs()`.

## Tài nguyên dùng chung trong plugin
Skill này dùng chung toàn bộ engine và công cụ tại `../make-horror-video/kit/` (cài đặt thành `truyenma-studio/`) và các tài liệu tham khảo tại `../make-horror-video/references/`:
- Kịch bản & scare ladder: `../make-horror-video/references/horror-story-engine.md`, `folklore-bank.md`
- Luật hình ảnh & API: `../make-horror-video/references/horror-style-bible.md`, `horror-engine-api.md`
- Âm thanh & hush: `../make-horror-video/references/horror-sound.md`
- Giọng Vbee & đóng gói: `../make-horror-video/references/voice.md`, `packaging.md`, `install.md`

## Quy trình thực hiện
1. **Chạy đủ Stage 0 → Stage 5** theo quy trình chuẩn của `../make-horror-video/SKILL.md` (Ngôn ngữ → Format → Kiểm tra `truyenma-studio/` → Kịch bản & `scare_lint` → Giọng đọc → `new_project.py` + `transcribe.py` + `beats.py` + `visemes.py` + `shots.json`).
2. **Dựng cảnh 100% code nâng cấp** (tham khảo mẫu thực tế tại `truyenma-studio/projects/demo-option-a/scenes/shots/demo_a.js`):
   - **Wide / Establishing:** gọi `H.hem(...)` hoặc set tương ứng, sau đó phủ thêm lớp `drawWeatheredWall` (rêu, vết ẩm, vết nứt deterministic) và vũng nước phản chiếu ánh sáng Practical Light.
   - **Close-up nhân vật sống:** vẽ giải phẫu đầu-cổ-vai tỷ lệ thật hơn, hốc mắt đổ bóng, đồng tử co + rung `Math.sin(t * 28)`, giọt mồ hôi lạnh và ánh sáng hắt từ điện thoại/đèn pin.
   - **Close-up ma:** hốc mắt sâu radial gradient, đồng tử điểm nhỏ, sợi tóc phân lớp rẽ dần theo `ease.out(prog(...))` kết hợp `H.punch`, `H.heartbeatVignette`, `H.scareFlash`, `H.vhs`.
3. **Kiểm tra thị giác, Render & Bàn giao Google Drive (mặc định):**
   - Luôn chạy `node render.mjs --project projects/<slug> --sheet --scale 0.5` và mở kiểm tra từng frame trước khi render MP4 full.
   - Render: `node render.mjs --project projects/<slug> --workers 4` và ghép âm thanh theo `../make-horror-video/SKILL.md` thành `<slug>-final.mp4`.
   - Đẩy bộ 3 file lên thư mục Google Drive `Videos-shorts` (`$VIDEOS_SHORTS_FOLDER_ID`) vào folder đánh số mới `<N>. <Tên video> - <YYYY-MM-DD>`: **`<slug>-final.mp4` (luôn dùng tên thật của video sản xuất, không dùng `video-final.mp4`)**, `thumbnail-youtube.png`, và `youtube-title-description.txt`; kiểm tra lại metadata và trả về trực tiếp 4 đường link Google Drive bấm mở được.
