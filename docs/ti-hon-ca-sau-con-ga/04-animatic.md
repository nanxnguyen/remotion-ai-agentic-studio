# Tài Liệu #4 — Biên Bản Animatic & Kiểm Định Chất Lượng Tập 9 (`04-animatic.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-ca-sau-con-ga`
- **Tệp thành phẩm:** `thanhhai-2d-studio/projects/ti-hon-ca-sau-con-ga/out/video-final.mp4`
- **Thông số FFprobe:** `1080 × 1920` (`9:16`), `24 fps`, **`35.136000 giây`** (`844` khung hình), `h264 High` (`10.900 kb/s`) + `aac LC` (`48.000 Hz`, `stereo`, `196 kb/s`), **`48.753.869 bytes`**.
- **Kiểm định FFmpeg:**
  - `blackdetect`: **`NO_BLACK_FRAMES`**
  - `freezedetect`: **`NO_UNEXPECTED_FREEZE`**
  - `silencedetect (d=0.6)`: **`NO_LONG_SILENCE`**
  - `ebur128`: **`-14.8 LUFS`**, LRA `2.9 LU`, True Peak **`-1.4 dBFS`** (`<= -1.0 dBTP`).
- **Kiểm định `shot_lint.py --strict`:** **`15 shots, 0 error(s), 0 warning(s)`**.
- **Nhịp & Âm thanh:** 34 SFX cues + 15 ambient beds + 5 phân đoạn nhạc nền (`playful 0.62` → `wonder 0.64` → `mystery 0.60` → `dark 0.03 Silence Drop 26.50–29.40s` → `triumph 0.72`), lưới 4×4 `build/final_mp4_qa.png` đạt 100%.
