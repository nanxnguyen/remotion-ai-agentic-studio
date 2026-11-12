# Không Ai Vỗ Tay Cho Ngày Đầu Tiên — V2 render and QA

Production date: 2026-10-31 (Asia/Ho_Chi_Minh).

## Real V2 render

- **Verified Google Drive MP4:** https://drive.google.com/file/d/1QCzDJSVCmaFDBN1Rowmcrc3OU9JBMVr7/view?usp=drivesdk
- **Existing numbered movie folder #39:** https://drive.google.com/drive/folders/1XbvKX4TTMYVkMkDHVa52TrhcUhveZyaf
- **Source, tests, manifest and QA ZIP:** https://drive.google.com/file/d/1z2RI4q3qy9VSWCjHwxdz0Fs3MG6mUGSr/view?usp=drivesdk
- **Original V2 thumbnail:** https://drive.google.com/file/d/1iBNGxJ-2wjP-TFGDS-gTB3VC3I1vWtjm/view?usp=drivesdk
- **Real-frame V2 visual contact sheet:** https://drive.google.com/file/d/1C4ja9sBKJDMrFetsBhOUJOmx-DFddPWs/view?usp=drivesdk

This is a **separate upgraded V2**; the previous `video-final.mp4` remains available unchanged until owner approval. Neither YouTube nor other platforms were published.

## Verified MP4

| Property | Verified |
|---|---|
| Filename | `video-final-v2.mp4` |
| Size | 47,905,232 bytes |
| SHA-256 | `a10b272c3031bb7e75be34aec4e8a77d5a65bcdb63ce4715c1f0926bcb51403d` |
| Video | H.264, 1920×1080, constant 30 FPS, 140.000 s, 4,200 decoded frames |
| Audio | AAC, 48 kHz, 2 channels |
| Decode | Full FFmpeg decode PASS (empty error log) |
| Local motion tests | 6/6 PASS |

## Changes

- Replaced the source's 24 FPS resampling with frame-native 30 FPS puppet motion.
- Renders each character in Full HD image coordinates with articulated bone math, planted walk/run, pushup hand/foot anchors, punch IK with anticipation/recovery, damped bag reaction and two-character shared hand target.
- Added stereo original synthesized footfall/impact Foley to the previous user-project original score.
- Preserved all 24 scene beats and the 140-second emotional narrative.

## Limitations and remaining gates

- **Backgrounds are still resized original 720p artwork.** Only characters and overlays are drawn in native 1080p space. Do not claim all art is native 1080p.
- **This V2 film was rendered by independent Python/Pillow tooling, not by the repo's Remotion registry or production pipeline.** The actual Python source is in the verified Drive ZIP; it has **not yet been ported into repo-native production source**. This PR records the durable V2 handoff, not source integration.
- Quality is still stylized vector puppetry, not photorealistic or professional animator-authored acting, and **not a claim of 100% similarity** to the DISCIPLINE reference.
- Unit tests and sample frame reviews do not replace an eyes-on review of the whole 140-second film. No `npm run verify`, `npm run test:visual`, or pipeline audit is asserted for this independent Python render.

## Required follow-up

1. Owner visually approves V2 or lists timestamped issues.
2. If approved, port the exact character action timeline and authored poses to `src/videos/khong-ai-vo-tay-cho-ngay-dau-tien/` and `src/animation/rig-v2/` with parity tests.
3. Rerender native Remotion source; inspect and run the canonical video workflow.
4. Update the existing Drive #39 movie folder; keep publishing private until separate approval.
