# Tài Liệu #4 — Biên Bản Animatic & Kiểm Định Chất Lượng Tập 10 (`04-animatic.md`)

- **Dự án:** `thanhhai-2d-studio/projects/ti-hon-con-moi-con-gian`
- **Tệp thành phẩm:** `thanhhai-2d-studio/projects/ti-hon-con-moi-con-gian/out/video-final.mp4`
- **Thông số FFprobe:** `1080 × 1920` (`9:16`), `24 fps`, **`34.488000 giây`** (`828` khung hình), `h264 High` (`7.922 kb/s`) + `aac LC` (`48.000 Hz`, `stereo`, `196 kb/s`), **`34.874.410 bytes`**.
- **Kiểm định FFmpeg:**
  - `blackdetect`: **`NO_BLACK_FRAMES`**
  - `freezedetect`: **`NO_UNEXPECTED_FREEZE`**
  - `silencedetect (d=0.6)`: **`NO_LONG_SILENCE`**
  - `ebur128`: **`-14.8 LUFS`**, LRA `2.7 LU`, True Peak **`-1.3 dBFS`** (`<= -1.0 dBTP`).
- **Kiểm định `shot_lint.py --strict`:** **`14 shots, 0 error(s), 0 warning(s)`**.
- **Nhịp & Âm thanh:** 34 SFX cues + 14 ambient beds + 5 phân đoạn nhạc nền (`playful 0.62` → `wonder 0.64` → `mystery 0.58` → `dark 0.03 Silence Drop 23.98–27.36s` → `triumph 0.72`), lưới 4×4 `build/final_mp4_qa.png` đạt 100%.
