# Tài Liệu #4 — Biên Bản Animatic & Kiểm Định Chất Lượng — Bản V2 (`04-animatic.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-ho-hang-cay-nam`
- **Tệp video thành phẩm V2 đã nghiệm thu:** `thanhhai-2d-studio/projects/ti-hon-ho-hang-cay-nam/out/video-final-v2.mp4` (lưu giữ song song với bản V1 `out/video-final.mp4` `47.664s`)
- **Thông số kỹ thuật V2 đo trực tiếp từ `ffprobe`:**
  - **Độ phân giải & Tỷ lệ:** `1080 × 1920` (`DAR 9:16`, `h264 High`, `yuvj420p`, `10.125 kb/s`)
  - **Tốc độ khung hình & Thời lượng:** `24 fps` (`24/1`), **`41.476000 giây`** (`996` khung hình)
  - **Âm thanh:** `aac (LC)`, `48.000 Hz`, `stereo`, `196 kb/s`
  - **Dung lượng tệp:** `53.524.986 bytes` (`51,05 MiB`)
- **Kiểm định kỹ thuật FFmpeg:**
  - `blackdetect (d=0.1, pix_th=0.10)`: **Đạt (`NO_BLACK_FRAMES`)** — không có khung hình đen bất thường.
  - `freezedetect (n=-60dB, d=2.0)`: **Đạt (`NO_UNEXPECTED_FREEZE`)** — không có đoạn đứng hình ngoài ý muốn.
  - `silencedetect (noise=-50dB, d=0.6)`: **Đạt (`NO_LONG_SILENCE`)** — không có khoảng lặng chết >= 0.6s.
  - `ebur128`: Integrated Loudness **`-14.9 LUFS`**, LRA **`2.4 LU`**, True Peak **`-1.4 dBFS`** (`<= -1.0 dBTP`).
- **Kiểm định `shot_lint.py --strict`:** **`18 shots, 0 error(s), 0 warning(s)`**.

---

## 1. Đánh Giá Nhịp Mở Màn & Giữ Chân 0–13.45 Giây (`s01` → `s07`)

| Phân đoạn | Cảnh | Mốc thời gian | Thời lượng | Đánh giá nhịp hình – tiếng (V2 Retention Check) |
|---|---|---|---|---|
| **1. Hook Hành Động Cực Nhanh (0–0.85s)** | `s01` | `0.000s – 0.850s` | `0.850s` | Tăng tốc tối đa: đũa lao xuống và burst `KHOAN!` xuất hiện ngay `0.15s` (`stopAt=0.42s`) cùng `whoosh` + `stinger` (+0.12s) + `pop` (+0.35s), triệt tiêu hoàn toàn độ trễ 0.5s đầu. |
| **2. Cú Lật Sinh Học (0.85–2.70s)** | `s02` | `0.850s – 2.700s` | `1.850s` | Chuyển `zoom` mở xoắn DNA nối người với nấm khớp chặt câu `"Bạn sắp ăn... bà con của mình đấy!"`, đặt câu hỏi tò mò ngay dưới mốc `2.7s`. |
| **3. Thử Thách 3 Lựa Chọn & Đánh Lạc Hướng (2.70–11.70s)** | `s03` → `s06` | `2.700s – 11.700s` | `9.000s` | Nhịp cắt gắt (`1.36s–3.24s`/cảnh): dàn 3 thẻ trong `2.80s`, dập **`SAI! ✗`** vào Đùi Gà đúng `lt=1.18s`, callback Tập 3 ôm gà (`1.36s`), rồi dập **`SAI LUÔN! ✗`** vào Cọng Rau đúng `lt=2.50s`. |
| **4. Lật Đáp Án Freeze Frame (11.70–13.45s)** | `s07` | `11.700s – 13.450s` | `1.750s` | Chớp `flash` + `freeze` + `beatHold` đúng tại `lt=0.74s` trùng từ khóa `"CÂY NẤM!"`, chuyển tông nhạc từ `playful (0.65)` sang `wonder (0.62)`. |

---

## 2. Kiểm Nhịp Giải Thích Khoa Học & Cao Trào Quy Mô (`s08` → `s13`)

| Phân đoạn | Cảnh | Mốc thời gian | Thời lượng | Nhịp chuyển & Khớp âm thanh |
|---|---|---|---|---|
| **Quang hợp vs Dị dưỡng** | `s08` → `s09` | `13.450s – 17.650s` | `4.200s` | `whip` mở `godRays` ánh nắng vào cải xanh (`s08`, `1.65s`), sau đó cắt thẳng sang nấm bị gạch quang hợp và phóng sợi nấm hút thức ăn như người (`s09`, `2.55s`). |
| **Bằng chứng Chitin & Cladogram** | `s10` → `s11` | `17.650s – 24.300s` | `6.650s` | `dip` vào nền Blueprint kính lúp lục giác hoàn tất `<= 2.57s` (khớp `buzz` tại `+1.75s`), sau đó cây tiến hóa `OPISTHOKONTA` đóng dấu **`GẦN BẠN HƠN RAU! ✓`** tại `<= 2.75s`. |
| **Leo Thang Quy Mô Siêu Nấm Oregon** | `s12` → `s13` | `24.300s – 29.250s` | `4.950s` | Nhạc chuyển sang `epic (0.75)` với `riser` 1.35s (`s12`, `1.55s`), bùng sang bản đồ rừng Oregon lan rễ xong ở `2.35s` và bộ đếm chạm mốc **`1.300+ SÂN BÓNG`** đúng tại `lt=2.40s` (`s13`, `3.40s`). |

---

## 3. Kiểm Định Silence Drop & Kết Thúc Tối Ưu Vòng Lặp (`s14` → `s18`)

| Phân đoạn | Cảnh | Mốc thời gian | Thời lượng | Hiệu quả nhịp điệu trên `video-final-v2.mp4` |
|---|---|---|---|---|
| **Silence Drop (29.25–33.35s)** | `s14` → `s15` | `29.250s – 33.350s` | `4.100s` | Nhạc nền `dark` hạ đột ngột về **`0.03`**, nhường không gian cho `slowmo` + `heartbeat` và cận mặt `bigFaceTiHon` nhận ra `"tớ cũng là động vật mà"` → `"nấm... cũng là bà con của tớ?!"` (nấm khăn cam xuất hiện tại `s15`). |
| **Hồi Ức Bữa Ăn (33.35–35.10s)** | `s16` | `33.350s – 35.100s` | `1.750s` | Nhạc chuyển sang `tension (0.58)`; `whip` về đĩa cơm với đôi đũa run rẩy + `tick` + `riser` 0.95s đẩy câu hỏi `"Vậy... bạn còn dám gắp nữa không?"` lên cao trào. |
| **CTA Quật Đuôi Độc Lập (35.10–37.10s)** | `s17` | `35.100s – 37.100s` | `2.000s` | Nhạc bùng sang `triumph (0.72)`; Tí Hon (`visemeAt` `35.08..36.86s`) quật đuôi bấm nút đỏ **`ĐĂNG KÝ`** (`pop` +0.25s, `ding` +1.05s đúng chữ `"ký"`), không bị dồn thông tin đại dương vào cùng một cảnh. |
| **Teaser Đại Dương & Comment Hook (37.10–41.476s)** | `s18` | `37.100s – 41.476s` | `4.376s` | Thẻ đôi sao biển 5 cánh tay (`?`, `GẦN BẠN HƠN!`) vs `CON TÔM` kết thúc bằng pill **`ĐOÁN Ở BÌNH LUẬN! 👇`** đúng câu `"Đoán đi!"` và `fadeOut: 0.25s` gọn gàng (loại bỏ hoàn toàn đoạn lặp tiêu đề 1.9s ở cuối V1). |

---

## 4. Kết Luận Nghiệm Thu V2

- **48 SFX cues** + **18 ambient beds** + **6 phân đoạn BGM** (`playful 0.65` → `wonder 0.62` → `epic 0.75` → `dark 0.03 Silence Drop` → `tension 0.58` → `triumph 0.72`) hòa trộn mượt với giọng Vbee thật tại **`-14.9 LUFS` / `-1.4 dBFS`**.
- Lưới 4×4 `build/final_mp4_qa_v2.png` và toàn bộ kiểm định FFprobe/FFmpeg (`d=0.6s` silence check) đạt 100%, đã tải lên thư mục Google Drive hiện hữu `#56` (`1c-lLcAr1TNWYafwQ6nH5QnrvLwD6gobm`).
