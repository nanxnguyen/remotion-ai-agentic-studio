# Không Ai Vỗ Tay Cho Ngày Đầu Tiên — Film Handoff

**Film:** Không Ai Vỗ Tay Cho Ngày Đầu Tiên
**Production date:** 2026-10-31 (Asia/Ho_Chi_Minh)
**Slug:** `khong-ai-vo-tay-cho-ngay-dau-tien`

## Original film

The deliverable is an independently drawn original 2D character short, continuing the previously reviewed 50-second pilot.

- **Duration:** 140 seconds
- **Output:** 1920×1080, 30 FPS, H.264 + AAC
- **Animation source:** frame-deterministic Pillow drawing and original vector-style rig; generated at 1280×720/24 and upscaled via Lanczos + frame resampling for 1080p/30 delivery
- **Score:** original procedural synthesized music, no sampled commercial recording
- **Scene structure:** 24 authored beats in a dark gym, bedroom and dawn street; an adult returns to training, struggles, and finally inspires a younger child to persevere
- **Audio:** original music and impacts, no narration or third-party voice
- **Copyright:** original drawings and narrative; DISCIPLINE was referenced only at the level of genre and animation principles

## Verified Google Drive archive

**Numbered folder:** [39. Không Ai Vỗ Tay Cho Ngày Đầu Tiên - 2026-10-31](https://drive.google.com/drive/folders/1XbvKX4TTMYVkMkDHVa52TrhcUhveZyaf)

- [video-final.mp4](https://drive.google.com/file/d/12bCAkstj-vfpGqaxJ4MDD3_L1YQtoKw8/view)
- [thumbnail-youtube.png](https://drive.google.com/file/d/1QVv7ylP2dy2W_q8Gr60FpEc5w-qoN5WX/view)
- [source-and-production-package.zip](https://drive.google.com/file/d/1vO440-WgqQQKSlyMSJV_NYBU8htR1PNK/view) — both Python render scripts, text metadata, storyboard, QA and production manifest

Verified MP4 byte size: `13746197`.
SHA-256: `ce19276870dbd312610ec30403e53c605847dffd135a2f275e0dcddc34f70e04`.

## Production status / technical honesty

- MP4 was rendered and inspected, and its video/audio stream metadata verified.
- 24-frame storyboard and representative frames extracted from the actual encoded MP4 were inspected.
- **This was produced using a standalone Python/FFmpeg animator, not the repository's native Remotion composition system.** Do not describe it as integrated into `src/videos/registry.ts`.
- This PR preserves the full original Python sources in `scripts/original-films/khong-ai-vo-tay/` and documents the final media handoff. The film is not yet ported to native Remotion.
- No public publishing, and no claim of studio-quality character acting or monetization guarantees.
- Human creative approval and a proper Remotion port remain separate follow-up tasks.

## Local source

Original reproducible scripts are now versioned under `scripts/original-films/khong-ai-vo-tay/`. On a Linux system with Python 3.12+, NumPy, Pillow, and FFmpeg installed, run `python scripts/original-films/khong-ai-vo-tay/build_final.py` from the repository root. It writes MP4, music, thumbnail, storyboard and manifest to its local `out/` folder. Running the complete render is resource intensive; exclude generated MP4 and WAV from commits. The exact produced film bytes and QA-reviewed artifacts are stored in Google Drive above.
