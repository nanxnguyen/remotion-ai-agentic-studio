# Tài Liệu #4 — Biên Bản Animatic & Kiểm Định Chất Lượng Tập 7 (`04-animatic.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-ca-vang-ca-map`
- **Tệp thành phẩm:** `thanhhai-2d-studio/projects/ti-hon-ca-vang-ca-map/out/video-final.mp4`
- **Thông số FFprobe:** `1080 × 1920` (`9:16`), `24 fps`, **`32.616000 giây`** (`783` khung hình), `h264 High` (`9.145 kb/s`) + `aac LC` (`48.000 Hz`, `stereo`, `199 kb/s`), **`38.086.689 bytes`**.
- **Kiểm định FFmpeg:**
  - `blackdetect`: **`NO_BLACK_FRAMES`**
  - `freezedetect`: **`NO_UNEXPECTED_FREEZE`**
  - `silencedetect (d=0.6)`: **`NO_LONG_SILENCE`**
  - `ebur128`: **`-15.0 LUFS`**, LRA `2.4 LU`, True Peak **`-1.3 dBFS`** (`<= -1.0 dBTP`).
- **Kiểm định `shot_lint.py --strict`:** **`11 shots, 0 error(s), 0 warning(s)`**.
- **Nhịp & Âm thanh:** 33 SFX cues + 11 ambient beds + 5 phân đoạn nhạc nền (`playful 0.62` → `wonder 0.64` → `mystery 0.58` → `dark 0.03 Silence Drop 23.35–26.85s` → `triumph 0.72`), lưới 4×4 `build/final_mp4_qa.png` đạt 100%.
