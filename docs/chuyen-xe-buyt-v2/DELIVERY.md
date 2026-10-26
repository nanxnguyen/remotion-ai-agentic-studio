# Chuyến Xe Buýt Không Có Trạm Cuối — V2 render REVIEW

Owner-approved V2 story and 64-second timeline implemented as a watchable vertical MP4. Status: **REVIEW, not production QA-approved FINAL**.

## Verified Google Drive delivery — folder #23 (2026-10-26)
- Film folder: https://drive.google.com/drive/folders/1XCohZYBmqkMOy33SGyxHCwSTKJZIrYRX
- Actual MP4 **video-v2-64s-REVIEW.mp4**: https://drive.google.com/file/d/1EuwFezrs6HzRQ1qvmgOLRvMM6Kp6xojX/view?usp=drivesdk
- Story-specific 9:16 thumbnail: https://drive.google.com/file/d/1kv9gXfixAs2OtOpk5fC3PIFKTJDFc8Xg/view?usp=drivesdk
- YouTube description: https://drive.google.com/file/d/145KDmuw5zXU9Ol5OuFWgJQvNjqy7OSEm/view?usp=drivesdk
- Contact sheet extracted from actual MP4: https://drive.google.com/file/d/1e8P_HsYfyp1dh4bIjCMMvD3LtrUbf3E8/view?usp=drivesdk
- Machine-readable QA: https://drive.google.com/file/d/1EB_izhyGZPXSb_C30CYfitxcslXTKQrM/view?usp=drivesdk

## Verification
MP4 video H264 1080×1920, 60/1 FPS, exactly 3840 frames; 64.000000 s; AAC 48 kHz mono; 29,741,572 bytes; SHA-256 `f37e3568bbac9094ae94a301a565d5765841413ded1e1ddd8e03752c1e15c85f`. Entire FFmpeg MP4 decode returned exit code 0 and zero stderr.

18 genuine Vbee Anh Khôi MP3 clips and measured-timeline.json were produced by completed GitHub Actions run https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40294756776 — artifact ID 12637584041, 18 audio SHA-256 checksums all match source, each utterance fits its assigned slot. Timeline lives in docs/chuyen-xe-buyt-v2/voice-timeline.json.

## Visual status (honest)
- Render is locally composited with PIL and FFmpeg (cinematic title treatment, short 2.5D image motion, matte fades, native text and audio mix), **not canonical Remotion CLI**.
- Several image sources were enlarged / cleaned concepts derived from user-approved storyboard compositions rather than 18 fully independent clean high-resolution AI shots. This is temporary for editorial REVIEW and **does not satisfy the full Ray storyboard-to-video source separation gate**.
- Loss of cast shadows, toy-bus rolling and mirror age-shift require stronger before→action→after evidence. Strict P0 action QA and canonical `npm run verify`, `npm run test:visual`, `python3 -I scripts/pipeline.py audit` have not been executed.
- Do NOT claim naturally animated actors, actor video or FINAL QA. No YouTube publishing, Drive permission change or GitHub Release.
- User should review the actual MP4, especially 26–36s missing-shadow/toy-bus and 52–60s age-reveal, then regenerate those clean independent motion assets before final promotion.
