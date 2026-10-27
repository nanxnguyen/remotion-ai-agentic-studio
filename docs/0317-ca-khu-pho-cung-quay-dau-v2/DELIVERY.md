# 03:17 — Cả Khu Phố Cùng Quay Đầu — approved V2 preview delivery

Status: **REVIEW** only. Do not promote this MP4 to FINAL without additional independent shot art, Remotion render and canonical QA.

## Verified Drive archive #26, created 2026-10-27
- Folder: https://drive.google.com/drive/folders/1eDeNuLWjsiAmSLmUUNZT3JpXrgeW4u5S
- Video: https://drive.google.com/file/d/1dPYH9IT3nbeYJcDiwkEu9H6s6eqqsrea/view?usp=drivesdk
- Thumbnail: https://drive.google.com/file/d/181dgCCMYtjUE_7xOPhR4E_5Pb8OMd18I/view?usp=drivesdk
- YouTube copy: https://drive.google.com/file/d/1DRKzDEmY_fY41sVpMKCKh5EA1tsFDwGd/view?usp=drivesdk
- Actual MP4 20-shot contact: https://drive.google.com/file/d/1KkLZkGT_-j1RHj-zr4KKxqDQUJCX8ff6/view?usp=drivesdk
- QA JSON: https://drive.google.com/file/d/1ihqpSEY1fcQbXVhlibR06knexyLciYNB/view?usp=drivesdk
- Approved storyboard: https://drive.google.com/file/d/1q46dXAk6q3GgyUs3hr_iI7LTeX6_M8VP/view?usp=drivesdk

## Technical checks
- 60.000000 seconds, 1080×1920 H.264, 60fps MP4 stream, 3600 video frames, AAC 48kHz audio, 40,989,348 bytes, SHA256: `4d679d84c3841d5f7ff5ec3d2df22de44fcf6ae7a9dbe6d4829aa6c71cd6db4c`.
- Native authored motion source 720×1280/30fps with 60fps delivery duplicate/interpolated frame cadence, *not native 60fps actor animation*.
- FFmpeg decoded entire MP4 without errors.
- Genuine Vbee Batch Anh Khôi (voiceCode `hn_male_phuthang_stor_24k-stl`) 18 separate source files, SHA256 validated, every actual MP3 duration below approved shot budget, audio content matches approved 18-line screenplay. GitHub Actions run: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40545011163 (success, artifact ID 12752572817).
- Exact top story headline + lower narration transcript, label **LỜI KỂ**, never voice provider name. Both opening 3-second and closing 4-second CTAs are story-specific.

## Editorial and pipeline limitations
- Original source assets: three full-size, new, independently generated *cinematic master images* for this film. Scene variations use procedural camera moves, cut-outs and graphic effects; **not 18 unique independent high-resolution photographic scene renders**.
- Film events curtain pull, camera hand, black drop and progressive window blackout are indicated with composited action; still need final-grade shot-specific before/action/after performance.
- Local procedural compositor and FFmpeg encoder, not canonical Remotion; no npm verify, test:visual, agent pipeline audit or complete P0 motion QA. Must not claim FINAL or native 60fps motion.
- Did not modify older films. No YouTube publication and no GitHub release.

The approved story/voice contract remains `docs/0317-ca-khu-pho-cung-quay-dau-v2/voice-timeline.json`. Preserve all prior versions until explicitly instructed to delete.
