---
name: healing-story-video
description: Quy trình sản xuất trọn gói video Shorts 9:16 (<= 45s) phong cách chữa lành/tâm sự 2.5D cho kênh Sống Chậm Lại (@song.cham.lai01 / CU_LA_CHINH_MINH): viết & chấm điểm kịch bản chữa lành, chạy voice Vbee Thành Long qua GitHub Actions + căn word-level timestamps, dựng 15-20 micro-shots 100% bằng engine rig2d.js của thanhhai-2d-studio, xuất contact sheet preview, mix -14 LUFS + render duy nhất 1 file out/video-final.mp4, tạo thumbnail 9:16, đẩy lên Google Drive Videos-shorts và đặt lịch YouTube lúc 19:00 UTC+7. Dùng khi người dùng yêu cầu làm video/Shorts cho kênh Sống Chậm Lại hoặc video tâm sự/chữa lành 2.5D.
---

# Sống Chậm Lại Shorts Studio (`@song.cham.lai01`)

Skill chuẩn hóa toàn bộ quy trình làm video Shorts (`9:16`, `<= 45s`) cho kênh **Sống Chậm Lại**:
- **Channel Key:** `CU_LA_CHINH_MINH`
- **Handle / Channel ID:** `@song.cham.lai01` / `UClvEUI8YW3dv9aqQknMJS0w`
- **Thư mục Drive cha (`Videos-shorts`):** `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`
- **Giờ đăng mặc định:** `19:00 UTC+7` (`publish_at: "<YYYY-MM-DD>T19:00:00+07:00"`)
- **Ẩn số lượt thích:** `public_stats_viewable: false` (bắt buộc)

---

## 1. Kịch bản & Kiểm định chất lượng (Bắt buộc trước khi làm voice)

1. **Cấu trúc Shorts `<= 45s` (sweet spot `35–44s`, `~120–145` từ tiếng Việt):**
   - **0–3s (Hook):** Tình huống đời thường lúc khuya/một mình đánh trúng nỗi lòng người trưởng thành (ví dụ: ngồi quán cơm bụi lúc 23h, đứng ngoài cửa hít thở trước khi vào nhà).
   - **3–26s (Leo thang):** 3–4 áp lực cụ thể (tin nhắn sếp, khách hàng, học phí, hóa đơn...) nhưng không ai hỏi *"Anh/em ổn không?"*.
   - **26–38s (Twist ấm áp):** Chi tiết nhỏ đầy thấu cảm từ người thân (vợ mở cửa đưa 2 ly nước ấm, biết chồng không đi nhậu...).
   - **38–44s (Câu hỏi + CTA):** 1 câu hỏi chạm cảm xúc để kéo bình luận + CTA nhẹ *"Ấn Thích · Đăng ký Sống Chậm Lại"*.
2. **Kiểm định bằng tool:**
   - Chạy `animation-script-audit` và `hookscore.py` (mục tiêu `>= 70/100`).
   - Dùng `yt-package` (`title.py`) kiểm tra **Tiêu đề (`<= 60` ký tự, có `#shorts`)** và **Chữ bìa (`3–4` từ, `0%` trùng từ với tiêu đề)**.
   - Dùng `yt-seo` viết mô tả + tags lưu vào `docs/<slug>/youtube-title-description.txt`.

---

## 2. Voice Vbee (GitHub Actions) & Word-level Timestamps

1. **Giọng mặc định:** `hn_male_thanhlong_talk_48k-fhg`, `speed = 0.98–1.02`.
2. **Sinh voice nhanh qua `gen-story-vbee-batch.py` / GitHub Actions:**
   - Script đã tối ưu chạy **song song (`--workers 6`)**, poll backoff từ `1.0s`, retry `429/5xx`, và cache theo `input_hash` (sửa câu nào chỉ chạy lại câu đó).
   - Với Shorts `<= 45s` cần ngữ điệu liền mạch và nhanh nhất, có thể chạy `--single-narration docs/<slug>/narration-vbee.txt` để tạo **1 file `voiceover.mp3` trong 1 request duy nhất**, hoặc chạy batch qua `auto-video-vbee.yml` rồi tải clip về `public/audio/<slug>/`.
3. **Ghép & căn từng từ:**
   - Ghép thành `thanhhai-2d-studio/projects/<slug>/input/voiceover.mp3` (xác nhận tổng thời lượng `<= 45.0s`).
   - Chạy `faster_whisper` + `SequenceMatcher` tạo `timeline/words.json` chuẩn xác 100% số từ, để `ui2d.js` chạy phụ đề highlight từng từ ở `y = 1480`.

---

## 3. Dựng hình 100% bằng Thanh Hải (`thanhhai-2d-studio`)

1. **Engine bắt buộc:** `rig2d.js` (`drawFigure`, `POSES`, `breathe`, `rim` 2.5D lighting) + `fx2d.js` (`rain`, `dust`) + `styles.js` (`style: "midnight"`). Không phụ thuộc ảnh AI ngoài.
2. **Nhịp cảnh (`story/shots.json`):**
   - Chia thành **15–20 micro-shots** (`1.8s–3.0s/shot`), chuyển cảnh mượt (`whip`, `zoom`, `flash`, `fade`).
   - Tuyệt đối không để cảnh đứng yên quá `3.5s` hoặc đè chữ/UI lên vùng phụ đề `y >= 1420` và vùng biển hiệu phía trên (`y < 420`).
3. **Chi tiết 2.5D đặc trưng cho Sống Chậm Lại:**
   - Hơi khói ấm bốc lên từ đĩa cơm / ly nước ấm.
   - Vệt sáng đèn pha xe máy chiếu xuống đường đêm/mưa.
   - Vũng nước trước cửa nhà phản chiếu ánh đèn vàng ấm hoặc ánh xanh lạnh.
   - Màn hình điện thoại, hóa đơn, bong bóng tin nhắn rõ nét, dễ đọc trên điện thoại.
4. **Preview bắt buộc trước khi render MP4:**
   ```bash
   cd thanhhai-2d-studio && node render.mjs --project projects/<slug> --sheet
   ```
   Mở `build/sheets/sheet_01.png` kiểm tra trực quan toàn bộ micro-shots trước khi render.

---

## 4. Mix Audio, Render MP4 & Dọn file trùng

1. **Mix & Render:**
   ```bash
   cd thanhhai-2d-studio && \
     python3 audio/mix.py --project projects/<slug> && \
     node render.mjs --project projects/<slug> --workers 6 --format jpeg --preset fast
   ```
2. **Kiểm tra mux & chỉ giữ 1 file duy nhất (`out/video-final.mp4`):**
   - Kiểm tra `out/video-final.mp4` bằng `ffprobe` và trích 1 frame giữa video (`ffmpeg -ss 25.0 ...`) để chắc chắn file trong `out/` đúng là bản mới vừa render (nếu `render.mjs` chỉ mới xuất `build/video_silent.mp4`, mux trực tiếp `video_silent.mp4 + mix.wav` thành `out/video-final.mp4`).
   - **Xóa mọi file MP4 trùng tên tiếng Việt khác trong `out/`**, chỉ giữ duy nhất **`out/video-final.mp4`** để tránh nhầm lẫn và tràn bộ nhớ.

---

## 5. Thumbnail 9:16, Google Drive & Đặt lịch YouTube `19:00`

1. **Thumbnail `9:16` (`docs/<slug>/thumbnail-youtube.png`):**
   - Lấy frame đẹp nhất (thường `M01`), phủ gradient tối ở phần trên (`y = 0..480`) để không lộ chữ nền, đặt badge thời gian + chữ bìa `3–4` từ (khớp `title.py`, 0% trùng tiêu đề) tương phản cao.
2. **Google Drive `Videos-shorts` (`1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`):**
   - Liệt kê lấy `max(N) + 1`, tạo thư mục `<N>. <Tên ngắn> - <YYYY-MM-DD>`, upload đủ 3 file: `video-final.mp4`, `thumbnail-youtube.png`, `youtube-title-description.txt`.
3. **Upload & Đặt lịch YouTube (`CU_LA_CHINH_MINH`):**
   - Tạo `config/films/<slug>.json` (`privacy: "private"`, `language: "vi"`, `qa_approved: true`).
   - Chạy dry-run `scripts/youtube_multi_channel.py --channel CU_LA_CHINH_MINH --profile SHORTS_VI ...`.
   - Bật `YOUTUBE_UPLOAD_PRIVATE_ENABLED=1` và chạy `--execute` để lấy `video_id`.
   - Chạy `scripts/youtube_update_metadata.py` đặt:
     - `"publish_at": "<YYYY-MM-DD>T19:00:00+07:00"`
     - `"public_stats_viewable": false`
   - Trả về đầy đủ link Google Drive (folder + 3 file) và link YouTube đã lên lịch.
