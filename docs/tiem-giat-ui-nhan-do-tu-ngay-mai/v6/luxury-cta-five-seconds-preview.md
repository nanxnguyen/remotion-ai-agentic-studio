# Luxury Cinematic CTA — five seconds — verified preview

**Date:** 2026-10-25. User explicitly changed the planned 14-second CTA to **2–5 seconds**. Implemented **5.000-second CTA** appended to unchanged 60.000-second approved film.

## Deliverable (REVIEW)
- Video: https://drive.google.com/file/d/1XS0RtS9fd-QrPluAyzmvbXlxx31j7EXZ/view?usp=drivesdk — `video-v6-luxury-cta-65s-REVIEW.mp4`.
- Preview frame from actual 62s output: https://drive.google.com/file/d/1J_mQc3uS_wtSckyEbZ49VKhWkI3-hSo8/view?usp=drivesdk
- QA JSON: https://drive.google.com/file/d/1zmDT2EdVEPcIBASvmCsCtgkJDjASQRbP/view?usp=drivesdk
- Existing film #18 folder: https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN — the previously approved `video-final.mp4` **remains untouched**.

## Design
- Scene-specific elegant CTA: warm champagne-gold serif question “BẠN DÁM XEM TIẾP?”, silhouetted laundry image backdrop sampled from film's last frame, dark vignette, restrained gold heart and “THẢ TIM · ĐĂNG KÝ”.
- Lower subtitles carry genuine CTA narration, distinct from the scene header.
- Soft alpha fades, no shake, dark/luxury cinematic palette.
- VOICE: original Vbee Anh Khôi `hn_male_phuthang_stor_24k-stl`, text: “Thả tim và đăng ký kênh… chuyện kinh dị tiếp theo đang chờ bạn!”. Duration **4.152s**; started 0.350s after CTA begins, ends at ~4.502s of 5.000s segment, not cut.
- Vbee generation: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40213543951 ; genuine job artifact 12605889102.
- Original source MP3 SHA-256: `13b544b04c9b81439e4a6542d5430733b4d460520a16c7968ea15d44ba5a277b`.

## Technical QA
- Total **65.000s, 1080×1920, 60fps, exactly 3,900 frames**, video H.264, audio AAC mono.
- Full FFmpeg decode completed with zero errors.
- Uploaded MP4 29,874,264 bytes and exact parent verified from Google Drive readback.
- Local MP4 SHA-256: `6640f242e97400b79556417c30592f0bec123a05bdf9fd6d1b115902ce2e426a`.
- Render was FFmpeg + ASS / frame-preserving concat. Do not call it a canonical Remotion render or claim all canonical P0 visual-action gates passed.
- **Status remains REVIEW pending user selection**; no overwrite of approved 60s video, no publishing or GitHub Releases.
