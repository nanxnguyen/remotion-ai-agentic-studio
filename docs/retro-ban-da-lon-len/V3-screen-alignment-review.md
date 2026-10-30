# Retro TV — Bạn Đã Lớn Lên Trong Những Ngày Không Ai Thấy — V3 (Sky)
Updated 2026-10-31, Asia/Ho_Chi_Minh. Status: **REVIEW**.

## User-reported regression
V2 shows an off-aligned sky image relative to the curved vintage CRT bezel. The production video should contain the moving nature footage **only inside** the screen's rounded viewport. Keep the outside room, desk, title and subtitles stable.

## Fix implemented for V3
- The compositor now uses one canonical geometry `SX=161, SY=521, SW=758, SH=490` for the footage placement, opening of the bronze CRT frame, and alpha matte.
- An anti-aliased 4x-resolution rounded alpha matte clips moving footage at the CRT window's **own** edges. No rectangular footage should leak past the bezel.
- Eleven footage beats from original Pexels sky sources; transitions are 10 frames (0.333 seconds).
- Five **genuine** Vbee Ngọc Huyền MP3s from GitHub Actions run `40918739264`, original transcript `docs/retro-ban-da-lon-len/voice.json`, word-for-word text check.
- The genuine Be Vietnam Pro ExtraBold font loads locally; no silent font replacement.
- 1080×1920 at CFR 30 fps, H.264/yuv420p, AAC stereo 48 kHz, decoder QA, phone-scale contact sheet.

## Screen proof (QA required)
1. Check opening frame, scene switches, ending frame.
2. All footage pixels remain strictly within the rounded viewport; bezel covers the edge consistently.
3. Subtitle text below TV doesn't overlap the screen, control knobs or social-platform safe zone.
4. Entire MP4 has no frozen/black unexpected gaps and audible Vbee.
5. Listening and **human frame-level word sync** must still be checked. The 21 captions are verbatim, but karaoke timestamps are *estimated* from per-act durations, not manually confirmed word boundaries. **Do not label FINAL or claim 100% alignment.**

## Files
- `scripts/render-ban-da-lon-len-v3-clouds.py`
- `.github/workflows/retro-ban-da-lon-len-v3-render.yml`
- Vbee source artifact: [run #40918739264](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40918739264)
- Original eight sky footage clips: [run #41101547956](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/41101547956)
- V3 rendered review artifact: GitHub Actions run launched on the `feat/retro-ban-da-lon-len-v3-qa-20261031` branch; verify concrete artifact/run ID before linking in a handoff.
- Google Drive movie folder `#34`: https://drive.google.com/drive/folders/1CZlSY_RyxphuGZibnJ8GwJ6P4VzCuf5_

## Restrictions
This revision is a reproducible FFmpeg/Pillow compositor, **not** a native Remotion `src/videos/<slug>` composition. Do not misstate it as passing canonical repository Remotion/pipeline gates. Use review status until technical and editorial evidence is completed.
