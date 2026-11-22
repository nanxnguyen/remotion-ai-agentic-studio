# Tài Liệu #4 — Biên Bản Animatic & Kiểm Định Chất Lượng Tập 5 (`04-animatic.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang`
- **Tệp video thành phẩm đã nghiệm thu:** `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang/out/video-final.mp4` (muxed từ `out/Sao_Biển_Là_Họ_Hàng_Của_Bạn_Hơn_Cả_Con_Tôm.mp4`)
- **Thông số kỹ thuật đo trực tiếp từ `ffprobe`:**
  - **Độ phân giải & Tỷ lệ:** `1080 × 1920` (`DAR 9:16`, `h264 High`, `yuvj420p`, `10.661 kb/s`)
  - **Tốc độ khung hình & Thời lượng:** `24 fps` (`24/1`), **`38.438000 giây`** (`923` khung hình)
  - **Âm thanh:** `aac (LC)`, `48.000 Hz`, `stereo`, `198 kb/s`
  - **Dung lượng tệp:** `52.069.182 bytes` (`49,66 MiB`)
- **Kiểm định kỹ thuật FFmpeg:**
  - `blackdetect (d=0.1, pix_th=0.10)`: **Đạt (`NO_BLACK_FRAMES`)**
  - `freezedetect (n=-60dB, d=2.0)`: **Đạt (`NO_UNEXPECTED_FREEZE`)**
  - `silencedetect (noise=-50dB, d=0.6)`: **Đạt (`NO_LONG_SILENCE`)**
  - `ebur128`: Integrated Loudness **`-14.7 LUFS`**, LRA **`1.8 LU`**, True Peak **`-1.4 dBFS`** (`<= -1.0 dBTP`)
- **Kiểm định `shot_lint.py --strict`:** **`16 shots, 0 error(s), 0 warning(s)`**.

---

## 1. Đánh Giá Nhịp Mở Màn & Thử Thách Quiz (`s01` → `s06`, `0.000s – 16.550s`)

| Phân đoạn | Cảnh | Mốc thời gian | Thời lượng | Đánh giá nhịp hình – tiếng (Retention Check) |
|---|---|---|---|---|
| **1. Hook Phôi Thai Gây Sốc** | `s01` | `0.000s – 3.250s` | `3.250s` | Phóng cận phôi nang từ `0.00s` (`whoosh`), tới `lt=2.40s` bật nảy burst **`HẢ?!`** + pill **`1. CÁI MÔNG?!`** + `stinger` trùng câu `"thứ đầu tiên bạn có là cái mông"`. |
| **2. Đặt Vấn Đề & Thẻ Quiz** | `s02` → `s03` | `3.250s – 8.600s` | `5.350s` | Tách đôi **`SAO BIỂN (= BẠN ✓)`** vs **`CON TÔM (KHÁC ✗)`**, rồi `whip` sang 2 thẻ đối đầu `A: CON TÔM` vs `B: SAO BIỂN`. |
| **3. Đánh Lạc Hướng & Lật Đáp Án** | `s04` → `s06` | `8.600s – 16.550s` | `7.950s` | Nêu 3 ưu thế của Tôm (`s04`), đối lập nét ngố của Sao Biển (`s05`), rồi `flash` + dập **`SAI RỒI! ✗`** lên Tôm ở `lt=0.08s` kèm tia DNA vàng nối người với Sao Biển (`s06`). |

---

## 2. Kiểm Nhịp Giải Thích Phôi Thai Học & Gag Độc Lạ (`s07` → `s10`, `16.550s – 28.150s`)

| Phân đoạn | Cảnh | Mốc thời gian | Thời lượng | Nhịp chuyển & Khớp âm thanh |
|---|---|---|---|---|
| **Blueprint Lỗ Phôi & Protostomia** | `s07` → `s08` | `16.550s – 19.940s` | `3.390s` | `dip` vào phôi nang `LỖ ĐẦU TIÊN (BLASTOPORE)` (`powerup`), rồi cắt sang phôi Con Tôm hóa miệng trước (`hit` tại `+0.90s`). |
| **Cladogram Deuterostomia** | `s09` | `19.940s – 24.040s` | `4.100s` | Bật sáng lần lượt 4 loài (`BẠN`, `CÁ`, `CHIM`, `SAO BIỂN`) khớp nhịp đọc và đóng dấu xanh **`DEUTEROSTOMIA ✓`** tại `lt=2.72s`. |
| **Tuyệt Chiêu Lộn Dạ Dày** | `s10` | `24.040s – 28.150s` | `4.110s` | Chuyển nhạc `mystery (0.58)`; Sao Biển lộn dạ dày hồng vào vỏ sò kèm burst **`MĂM!`** và phản ứng ghê sợ của Tí Hon. |

---

## 3. Kiểm Định Silence Drop, CTA & Teaser Sứa Bất Tử (`s11` → `s16`, `28.150s – 38.438s`)

| Phân đoạn | Cảnh | Mốc thời gian | Thời lượng | Hiệu quả nhịp điệu trên `video-final.mp4` |
|---|---|---|---|---|
| **Silence Drop (28.15–32.28s)** | `s11` → `s12` | `28.150s – 32.280s` | `4.130s` | Nhạc nền `dark` hạ về **`0.03`**, làm nổi tiếng `slowmo` + `heartbeat` khi `bigFaceTiHon` (`visemeAt`) phát hiện `"tớ cũng mọc mông trước"` và thấy Sao Biển quàng khăn cam qua sợi DNA. |
| **Chối Bỏ & CTA Quật Đuôi** | `s13` → `s14` | `32.280s – 34.700s` | `2.420s` | Nhạc bật sang `triumph (0.72)`; Tí Hon quay đi từ chối (`s13`, `1.02s`), rồi quật đuôi bấm nút đỏ **`ĐÃ ĐĂNG KÝ ✓`** (`s14`, `1.40s`) tại `y=620`. |
| **Teaser Sứa Bất Tử & Loop End** | `s15` → `s16` | `34.700s – 38.438s` | `3.738s` | Sứa *Turritopsis dohrnii* phát sáng biển thẳm (`KHÔNG TIM`, `KHÔNG NÃO`, `BẤT TỬ ♾️`), chốt bằng dấu `?` + **`ĐOÁN Ở BÌNH LUẬN! 👇`** và `fadeOut: 0.25s`. |

---

## 4. Kết Luận Nghiệm Thu Tổng Thể

- **48 SFX cues** + **16 ambient beds** + **5 phân đoạn BGM** (`playful 0.62` → `wonder 0.64` → `mystery 0.58` → `dark 0.03 Silence Drop` → `triumph 0.72`) hòa trộn với giọng Vbee tại **`-14.7 LUFS` / `-1.4 dBFS`**.
- Lưới 4×4 `build/final_mp4_qa.png` và toàn bộ kiểm định FFprobe/FFmpeg đạt 100%.

