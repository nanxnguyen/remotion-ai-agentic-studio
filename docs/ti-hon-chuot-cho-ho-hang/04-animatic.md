# Tài Liệu #4 — Biên Bản Animatic & Kiểm Định Chất Lượng Tập 8 (`04-animatic.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-chuot-cho-ho-hang`
- **Tệp thành phẩm:** `thanhhai-2d-studio/projects/ti-hon-chuot-cho-ho-hang/out/video-final.mp4`
- **Thông số FFprobe:** `1080 × 1920` (`9:16`), `24 fps`, **`32.040000 giây`** (`769` khung hình), `h264 High` (`9.208 kb/s`) + `aac LC` (`48.000 Hz`, `stereo`, `197 kb/s`), **`37.505.699 bytes`**.
- **Kiểm định FFmpeg:**
  - `blackdetect`: **`NO_BLACK_FRAMES`**
  - `freezedetect`: **`NO_UNEXPECTED_FREEZE`**
  - `silencedetect (d=0.6)`: **`NO_LONG_SILENCE`**
  - `ebur128`: **`-14.9 LUFS`**, LRA `2.2 LU`, True Peak **`-1.4 dBFS`** (`<= -1.0 dBTP`).
- **Kiểm định `shot_lint.py --strict`:** **`10 shots, 0 error(s), 0 warning(s)`**.
- **Nhịp & Âm thanh:** 31 SFX cues + 10 ambient beds + 5 phân đoạn nhạc nền (`playful 0.62` → `wonder 0.64` → `mystery 0.58` → `dark 0.03 Silence Drop 23.90–27.00s` → `triumph 0.72`), lưới 4×4 `build/final_mp4_qa.png` đạt 100%.
