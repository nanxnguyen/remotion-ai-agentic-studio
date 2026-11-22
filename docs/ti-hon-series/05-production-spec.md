# Tài Liệu #5 — Thông Số Kỹ Thuật & Đút Kết Kinh Nghiệm Sản Xuất Dùng Chung (Production Spec)

> **Phạm vi áp dụng:** Quy chuẩn kỹ thuật bắt buộc và quy trình tăng tốc sản xuất gấp đôi áp dụng cho toàn bộ Series **Khủng Long Tí Hon** (Tập 2, Tập 3 và các tập tiếp theo) trên nền tảng `thanhhai-2d-studio`.

---

## 1. Thông Số Xuất Bản Chuẩn (Video & Audio Mastering Spec)

Mọi bản xuất cuối cùng (`video-final.mp4` và các bản Shorts cắt từ tập dài) phải đạt chuẩn kiểm định tự động trước khi tải lên Google Drive và YouTube:

| Hạng mục | Video Dài (YouTube Long-Form 16:9) | Video Ngắn (YouTube Shorts / TikTok 9:16) |
|---|---|---|
| **Độ phân giải xuất bản** | **`1440p` (`2560 × 1440 px`)** — kích hoạt bộ mã hóa VP9/AV1 băng thông cao của YouTube | **`1080p Vertical` (`1080 × 1920 px`)** |
| **Tốc độ khung hình (FPS)** | **`24 fps`** (chuẩn hoạt hình điện ảnh, kết hợp `timing: "twos"` 12fps cho biểu cảm nhân vật và `24fps` mượt cho lia máy/3D) | **`24 fps`** (hoặc `30 fps` khi tái sử dụng sang pipeline Remotion Shorts) |
| **Video Codec & Profile** | `H.264 / libx264`, Profile `High`, `CRF 18`, Pixel Format `yuv420p`, cờ `-movflags +faststart` | `H.264 / libx264`, Profile `High`, `CRF 18`, Pixel Format `yuv420p`, `-movflags +faststart` |
| **Audio Codec & Sample Rate** | `AAC`, `48.000 Hz` (`48 kHz`), `Stereo (2 kênh)`, Bitrate `192 kbps` | `AAC`, `48.000 Hz` (`48 kHz`), `Stereo`, `192 kbps` |
| **Hiệu ứng đầu/cuối video** | `fadeIn: 0.5s`, `fadeOut: 0.8s`, không viền đen (`bars: "none"`) | Không viền đen, mở thẳng vào giây `0.00s` |

---

## 2. Chuẩn Âm Thanh Phát Sóng (`-14.0 LUFS` & `<= -1.0 dBTP`)

1. **Chuẩn hóa độ lớn âm thanh 2-pass (`FFmpeg loudnorm`):**
   - Mọi bản mix cuối cùng (gồm giọng đọc Vbee + nhạc nền procedural theo tâm trạng + 19 hiệu ứng SFX) bắt buộc chạy chuẩn hóa 2-pass:
     `loudnorm=I=-14.0:TP=-1.0:LRA=11`
2. **Ngưỡng kiểm định nghiệm thu (`QA Gate`):**
   - **Integrated Loudness:** **`-14.0 LUFS`** (sai số cho phép `±0.3 LUFS`, khớp chuẩn phát sóng YouTube để không bị YouTube tự động nén hay giảm âm lượng).
   - **True Peak:** **`<= -1.0 dBTP`** (tuyệt đối không clipping ở các cảnh nổ thiên thạch `flash_boom.wav` hay sóng thần `rumble.wav`).
3. **Cân bằng dải động & Nhịp lặng (`Ducking & Silence Drops`):**
   - Nhạc nền (`music.gainDb: -17 dB`) tự động hạ thấp dưới giọng đọc Vbee.
   - Tại các điểm **Silence Drop** (như `s46a` mùa đông hạt nhân và `s51a` cửa hang ngầm trong Tập 3), nhạc nền hạ về `intensity: 0.02` trong `3.8–4.2 giây` để giọng kể và tiếng gió lạnh/tiếng thở tạo sức nặng cảm xúc tối đa.

---

## 3. Quy Chuẩn Màn Hình Kết Thúc (`15–20 Giây` Active Animated End Screen)

- **Thời lượng bắt buộc:** Từ **`15 đến 20 giây`** sau khi câu thoại cuối cùng của Vbee kết thúc (ví dụ Tập 3: thoại Vbee kết thúc ở `437.616s`, màn hình kết thúc kéo dài **`16.384 giây`** từ `437.616s` đến `454.000s`, chia làm 2 cảnh hoạt họa `end01` `8.184s` và `end02` `8.200s`).
- **Tuyệt đối không cắt đen hay đứng hình tĩnh:**
  - Nền cảnh bình minh mùa xuân vẫn chuyển động nhẹ, nhạc nền `triumph` (`intensity: 0.74`) tiếp tục chơi trọn vẹn và chỉ `fadeOut` ở `0.8s` cuối cùng.
  - Nhân vật **Tí Hon v3.0** đứng ở trung tâm dưới, liên tục vẫy tay, nhún nhảy và chỉ vào hai khung tương tác chuẩn YouTube End Screen:
    1. **Khung thẻ Video bên trái (`Left Video Card`):** Giới thiệu tập liên quan (ví dụ: *"TẬP 2: 8 ĐẠI DƯƠNG — SỐNG NỔI 8 GIÂY?!"*) để kéo chuỗi xem liên tiếp (Session Watch Time).
    2. **Khung nút Đăng Ký bên phải (`Right Subscribe Circle`):** Gợi nhắc hành động bấm Đăng ký kênh cùng Tí Hon.
- **Tương thích `shot_lint.py --strict`:** Trong `story/shots.json`, các cảnh `end01` và `end02` (`size: "end"`, `~8.2s/cảnh`) phải ghi chú từ khóa `"hold"` trong trường `notes` để trình kiểm lỗi hiểu đây là nhịp giữ khung End Screen có chủ đích.

---

## 4. Vùng An Toàn Phụ Đề & Quy Tắc Nhãn Chữ Không Đè Phụ Đề

1. **Ranh giới cứng `y <= 860` (trên hệ tọa độ `1920×1080`):**
   - Toàn bộ nhãn chữ trên hình (`drawSpotCallout`), thẻ thông số khoa học (`data`), sơ đồ cắt lớp (`blueprint`), nhãn mũi tên và đồng hồ trong cảnh **bắt buộc kết thúc ở `y <= 860`** (tương đương `y <= 1147` ở `1440p`).
   - Vùng `y = 940..1080` dành độc quyền cho lớp nền tối `drawSubtitleScrim` và dòng phụ đề karaoke (`captionStyle: { y: 1005, size: 34, max: 9 }`).
2. **Quy chuẩn độ dễ đọc của nhãn chữ trên hình (`Callout Legibility`):**
   - Cỡ chữ cho mọi nhãn thông tin trong cảnh: **`>= 30px`** (`Bold 700–800`), đặt trên hộp nền pill tối `rgba(8, 14, 26, 0.88)` có viền sáng theo mã màu cảnh.
   - Không hiển thị quá **2 cụm chữ trên hình** trong cùng một cảnh để mắt người xem vừa kịp nhìn hành động của Tí Hon vừa đọc được phụ đề.
3. **Góc an toàn trên Thumbnail (`1920×1080`):**
   - Góc dưới bên phải (`x > 1650, y > 920`) trên Thumbnail YouTube luôn để trống 100% (không đặt chữ, mặt nhân vật hay số đồng hồ) để không bị nhãn thời lượng `7:34` của YouTube che khuất.

---

## 5. Đút Kết 4 Kinh Nghiệm Từ Tập 2 & Tập 3 Để Sản Xuất Nhanh Gấp Đôi (2× Speed Playbook)

Qua thực tế sản xuất Tập 2 (*8 Đại Dương Tiền Sử*) và Tập 3 (*7 Chỗ Trốn Thiên Thạch*), quy trình chuẩn dưới đây giúp **rút ngắn 50% tổng thời gian từ kịch bản đến file MP4 `1440p`** mà không phải sửa lại cảnh hay lệch khẩu hình:

### (a) Chốt kịch bản Vbee & thu `.mp3` TRƯỚC khi lập Shot List (Không làm lại 2 vòng!)
- **Bài học:** Nếu chia cảnh hoặc code thời lượng cảnh dựa trên độ dài ước tính trước khi có file thu âm Vbee thật, khi ghép voice thật vào sẽ lệch nhịp từng câu và phải sửa lại toàn bộ `shots.json` lần hai.
- **Quy trình 1 vòng duy nhất:**
  1. Viết và duyệt kịch bản văn bản (`input/script.txt`, đủ 73 đoạn neo cảm xúc).
  2. Thu âm ngay file **`input/voiceover.mp3`** bằng giọng Vbee chuẩn và chạy Whisper alignment để lấy chính xác `timeline/words.json` (từng từ tới mili-giây) và `story/anchors.json` (`audioDuration` thật, ví dụ `437.616s`).
  3. Chạy `tools_build_shots.py` để tự động chia 155 cảnh bám sát từng dấu chấm câu và khoảng nghỉ thật của giọng Vbee + cộng thêm đúng `16.384s` End Screen (`454.0s`). Kết quả khớp nhịp 100% ngay từ lần đầu.

### (b) Dùng `--format jpeg` (`quality 94`) trong `render.mjs` để tăng tốc chụp frame Chromium gấp ~2.5–3 lần
- **Bài học:** Khi xuất video dài `7.5 phút` ở độ phân giải `1440p` (`2560×1440`, `24 fps` = `10.896 frames`), việc nén và ghi đĩa định dạng PNG không nén tốn rất nhiều thời gian CPU/IO của Chromium headless.
- **Giải pháp chuẩn:** Truyền cờ **`--format jpeg`** (hoặc cấu hình JPEG `quality: 94` trong pipeline chụp frame của `render.mjs`) khi đẩy frame từ canvas qua FFmpeg encode `CRF 18`. Chất lượng hình ảnh 2D phẳng và 3D Three.js hoàn toàn tương đương mắt thường so với PNG nhưng tốc độ chụp frame nhanh gấp **2.5 đến 3 lần**.

### (c) Tái sử dụng thư viện nhân vật & HUD dùng chung `/engine/tihon.js`
- **Bài học:** Không viết lại code vẽ Tí Hon, đồng hồ sinh tồn, bộ đếm `"ĐỒ ĐÃ MẤT"` hay hộp chữ callout ở từng file cảnh.
- **Giải pháp chuẩn:** Mọi hàm vẽ nhân vật **Tí Hon v3.0** (`drawTiHon`), đồng hồ góc trái (`drawSurvivalClock`), bộ đếm mất đồ góc phải (`drawLostItemsHUD`), dải tối phụ đề (`drawSubtitleScrim`) và hộp chữ chuẩn `y <= 860` (`drawSpotCallout`) đều được đóng gói tập trung trong `/engine/tihon.js` (và `scenes/shared.js`). Khi nâng cấp thiết kế nhân vật (như từ v2 lên v3.0 bỏ mũ vàng, thêm răng/lưỡi/ngấn bụng), chỉ cần sửa một nơi là toàn bộ 155 cảnh đồng bộ ngay lập tức.

### (d) Duyệt Storyboard (`--sheet`) & bản Animatic trước khi render full `1440p`
- **Bài học:** Render toàn bộ `10.896 frames` ở `1440p` mất nhiều thời gian máy chạy; nếu phát hiện chữ đè phụ đề hoặc sai bố cục sau khi render xong thì chi phí sửa rất lớn.
- **Giải pháp chuẩn 2 bước kiểm duyệt nhẹ:**
  1. **Bước 1 — Xuất 7 tờ Contact Sheet Storyboard (`render.mjs --sheet`):** Chỉ chụp 155 khung hình đại diện (1 frame giữa mỗi cảnh) ghép thành 7 bảng `build/sheets/sheet_01.png .. sheet_07.png` trong vòng chưa tới 20 giây. Kiểm tra ngay vị trí Tí Hon v3.0, bảng màu 9 môi trường và quy tắc chữ `y <= 860`.
  2. **Bước 2 — Xuất bản Animatic (`render.mjs --animatic` -> `build/animatic.mp4`):** Ghép 155 khung hình tĩnh với giọng Vbee thật (`437.616s`), nhạc nền có 2 điểm Silence Drop và 19 hiệu ứng SFX (`454.0s`) trong chưa đầy 1 phút. Duyệt nhịp Hook 45 giây đầu, nhịp chuyển 7 chỗ trốn và 16.4 giây End Screen hoàn hảo rồi mới bấm lệnh render full `1440p`.
