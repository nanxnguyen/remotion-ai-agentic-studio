# V4 — Thành Công Là Điều Nhỏ Bé | Production result

## Local render, verified
- Video: `Thanh_Cong_La_Dieu_Nho_Be_V4_Cinematic_1080x1920.mp4`
- Duration 34.000s, 1020 frames, 1080×1920, 30fps, H.264/AAC
- Correct reference-inspired DNA: footage **640×640** at (x=220, y=640) over `#030405` black letterbox.
- Original Vietnamese script is in `docs/thoi-quen-nho-v4/timeline.json`.
- Ten authentic Vbee Ngọc Huyền phrase tracks from successful [GitHub Actions run 40020181085](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40020181085); locally mastered and placed at measured audio offsets (not synthesized with a substitute voice).
- Original Python-generated felt piano/pad motivational score, with near-silent doubt beat and brighter harmonic payoff.
- Transitions: selective seven-frame cross-dissolves plus motivated hard cuts for montage beats; captions center square, white with warm yellow highlights.
- Render engine: **Pillow + OpenCV + FFmpeg**, not a verified Remotion render. Source and original/processed art are included in a user-delivered project ZIP.

## QA
- MP4 decoded end-to-end with FFmpeg without error.
- ffprobe confirmed 1080×1920 @30fps, 1020 frames, duration 34s, one H.264 stream and AAC audio.
- Audio mean -19.1dBFS, max -2.3dBFS, no detected clipping.
- Square black matte checked at video corner sample points, and 15-frame visual contact sheet reviewed.
- SHA-256 of actual local MP4: `9d84521b8eef9dfa783009fa788d474ae36a38a26a23d69330eb81e115d4701d`.
- Binary size: **3,229,863 bytes**.

## GitHub archive status
**Pending.** The verified MP4 exists and is available as a ChatGPT sandbox artifact and project ZIP. This connected GitHub integration cannot transfer local MP4 binary into a release asset. The output is NOT yet in a draft GitHub Release. Do not claim an asset URL until a real upload and SHA-256 comparison succeeds.

## Remaining repo gates
- Register/verify a true Remotion composition in the canonical registry; source package is editable Python/FFmpeg instead.
- Run `npm run verify`, `npm run test:visual`, and canonical pipeline audit in a cloned repo, then archive verified MP4 through the repository's release workflow.
