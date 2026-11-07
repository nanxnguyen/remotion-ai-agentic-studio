# V6 Seven-Action Integration — REVIEW (2026-10-25)

Status: **VIEWABLE PREVIEW / NOT QA-APPROVED FINAL**.

**Verified watchable MP4**: https://drive.google.com/file/d/1GoaHeM_FVADjOSnAJCXrPPuSnxewC63n/view?usp=drivesdk

**Existing numbered film #18 Drive folder**: https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN

**21 sampled proof frames**: https://drive.google.com/file/d/1O_B9u-9COnIAK-6HllJLAZlSmsOTcalw/view?usp=drivesdk

**QA JSON**: https://drive.google.com/file/d/1Zlp02ZI4_8zr_NDKdd_KpP1j3zxKzwmp/view?usp=drivesdk

## Build and verification
- V6 base: existing 60s Vbee sourced MP4. **Audio track preserved by stream copy** and was not resynthesized.
- Seven new generated three-pose triptych assets cropped into **21 independent vertical state images**, with native Vietnamese captions. Each action uses three states (before/action/result), smooth temporal interpolation and subtle eased camera movement. Water clip additionally has a monotonic animated waterline.
- Replaced exact windows: **0–2, 26–30, 30–34, 34–38, 38–42, 42–48, 56–60 seconds**. Other windows retain V6 base.
- Output **1080×1920, 60/1 fps, 3600 video frames, 60.000s, H.264 + original AAC track**.
- FFmpeg decoded entire MP4 with zero errors; technical preview SHA-256: `bfb1e3e0e108f5d5dac4af30cd41488bd9aee1128235d7b14df8d7010fc649fe`; file 20,164,279 bytes. Readback of Google Drive file ID, MIME, bytes and parent succeeded.

## Temporal proof sampled from actual MP4
Every action has three extracted review frames at ~12%, 52%, 90% within the exact narrated window. Observed grayscale frame differences are non-zero between consecutive states. This proves different images appear over time; it does **not** automatically certify all narrated physical causal changes.

## Remaining production-review limitations
- Motion is still image/pose-based 2.5D, not independent realistic actor footage.
- Some portrait crops omit geographic details (e.g. disconnected plug), and STOP acceleration cannot be measured just by a three-state photo cut. Even when visual state changes are visible, P0 proof should be evaluated by human reviewers at full playback before labeling FINAL.
- Soft fade continuity between retained V6 shots and these seven new segments is not yet guaranteed at *all* 16 boundaries.
- Render engine: **OpenCV compositing and FFmpeg H264**, not official Remotion CLI. Canonical `npm run verify`, `npm run test:visual`, pipeline audit and independent reviewer gates **not run**.
- Source images are pose-derived from triptych generated art; no storyboard timecodes or panel lines were composited into this preview.

V5 and the previous V6 remain preserved on Drive. The new file is named **video-v6-actions-preview-60fps.mp4**, not `video-final.mp4`. No YouTube publication or GitHub Release.
