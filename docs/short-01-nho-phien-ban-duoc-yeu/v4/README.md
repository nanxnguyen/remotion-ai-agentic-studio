# Short #01 V4 — smooth-motion edition

## Why V3 felt jerky
V3 rebuilt the protagonist in each independent shot, including varying poses/anchors, reinitialised per-shot camera transforms and headlines, and a 24fps canvas. Cross dissolves alone did not eliminate perceived snapping when the protagonist's location, type animation and pose changed together.

## Changes in V4
- **Native 60 fps**: 2,425 frames at 1080×1920, not 24fps frames duplicated.
- **Single continuously drawn protagonist**: fixed anchor (208,578) on the 540×960 working canvas; arms/face interpolate across shots instead of teleporting.
- **Continuous subpixel camera**: global fractional affine transformation, BICUBIC resampling; no integer-rounding step changes between shots.
- **Smooth background scene dissolves**: each of the 27 boundaries spans 44 consecutive frames (~0.733 seconds); visual props fade while the foreground actor remains singular.
- **Readable typography**: 14 paced headlines held across 28 shots (two complementary visuals per headline), eliminating a full headline reset on every ~1.4s scene.
- **No new Vbee synthesis**: the complete, already verified V3 AAC soundtrack (8 Vbee Thanh Long speech beats and original dynamic piano) is bit-for-bit preserved via FFmpeg stream-copy; audio packets have identical MD5.

## Verified output
- MP4: `docs/short-01-nho-phien-ban-duoc-yeu/final/short01-v4-28-scenes-smooth60.mp4`
- GitHub Actions successful run: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/39998033562
- V4: 40.416667 seconds · 1080×1920 · 60fps · 28 story shots · 27 transitions.
- QA: `v4/seam-QA.json` reports 27 seam checks and largest frame-to-frame average pixel delta 0.341 (measured on downscaled transition frames); `v4/final-QA.json` verifies streams, frame rate, duration, same Vbee/piano audio packet MD5, SHA256.
- MP4 SHA256: `c3a136ec86f2b0298e4b8f3ed0542e0c1b329512e2c4a7b1d0669c0204effe86`
- Original contact sheet: `v4/contact-sheet.jpg`.
- Imported to user's vidIQ media library; durable uploadId: `d77bf32b-a587-452e-815a-17524dc8c647` (status ready). Refresh via vidIQ upload lookup by ID rather than keeping the expiring signed URL.

## Remaining creative review
Machine-measured continuity alone cannot guarantee every artistic transition looks natural or that a streaming playback issue is impossible. Human viewing on a mobile device is still recommended. Video has **not** been published to YouTube. Retention and view-through analytics have not been measured.
