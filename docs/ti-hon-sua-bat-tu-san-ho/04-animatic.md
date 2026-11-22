# Tài Liệu #4 — Biên Bản Animatic & Kiểm Định Chất Lượng Tập 6 (`04-animatic.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-sua-bat-tu-san-ho`
- **Tệp thành phẩm:** `thanhhai-2d-studio/projects/ti-hon-sua-bat-tu-san-ho/out/video-final.mp4`
- **Thông số FFprobe:** `1080 × 1920` (`9:16`), `24 fps`, **`37.128000 giây`** (`892` khung hình), `h264 High` (`10.349 kb/s`) + `aac LC` (`48.000 Hz`, `stereo`, `197 kb/s`), **`48.918.720 bytes`**.
- **Kiểm định FFmpeg:**
  - `blackdetect`: **`NO_BLACK_FRAMES`**
  - `freezedetect`: **`NO_UNEXPECTED_FREEZE`**
  - `silencedetect (d=0.6)`: **`NO_LONG_SILENCE`**
  - `ebur128`: **`-14.9 LUFS`**, LRA `2.4 LU`, True Peak **`-1.4 dBFS`** (`<= -1.0 dBTP`).
- **Kiểm định `shot_lint.py --strict`:** **`16 shots, 0 error(s), 0 warning(s)`**.
- **Nhịp & Âm thanh:** 35 SFX cues + 16 ambient beds + 5 phân đoạn nhạc nền (`wonder 0.62` → `playful 0.64` → `wonder 0.65` → `dark 0.03 Silence Drop 27.75–30.85s` → `triumph 0.72`), kiểm tra lưới 4×4 `build/final_mp4_qa.png` đạt 100%.
