# REVIEW MP4 — Tiệm Giặt Ủi Nhận Đồ Từ Ngày Mai — 2026-10-25

## Verified preliminary deliverables

Google Drive REVIEW folder: https://drive.google.com/drive/folders/1X8TrdKGBILnwp9TChyyf76U5qkrNkezs

- REVIEW MP4: https://drive.google.com/file/d/1PYfIUHeQSRrghL9zqAMmV5dBXI23yvMr/view?usp=drivesdk — 2,524,735 bytes
- Thumbnail: https://drive.google.com/file/d/1LMAGJosmo_uWnuVv2_7QAfwvT-XtPOGI/view?usp=drivesdk — 1,002,412 bytes
- YouTube copy: https://drive.google.com/file/d/1l_RZcKx_d9H0eTN_HrNKy12o1it6cy9w/view?usp=drivesdk — 819 bytes

## Runtime validation

- Render format: 60.000 s / 540x960 / 24fps / H.264 / AAC mono.
- Frame count: 1440.
- FFmpeg full video decode: PASS.
- Media SHA-256: `623bfe5cfe9dc678b920055f578eacaa935131a5d8cf92d864d7440da6795268`.
- Thumbnail SHA-256: `0e9b60fbb8ad37ea265db1dceaf3df96ed17f551ef9272098eb21bcc748364a5`.
- Title copy SHA-256: `a4d5ea51fbff7bfd847b45185a147c8eded0a8ee68b54229770568ae3a12efbb`.
- Three Google Drive object IDs, sizes, MIME types and parent were read back successfully; folder intentionally named REVIEW to distinguish preview from final.
- Source for cinematic 2.5D frames: clean cropped regions from previously supplied 16-panel storyboard, with independent native Vietnamese captions and soft fades. This is NOT full new motion footage.

## Critical unresolved FINAL gates

- **Real Vbee Batch narration: NOT GENERATED**. This preview intentionally uses provisional offline `espeak vi-sgn` synthesized Vietnamese speech. Do not call it Vbee; replace with real audio and re-align captions per measured utterances.
- **P0 voice-to-visible-motion evidence: NOT PASSED**. Some important actions remain photo-derived camera/composite motion; verify and improve drum rotation, water progression, hand movement and swap proof before final approval.
- **Canonical Remotion pipeline / npm verify / visual gates and pipeline audit: NOT RUN** in this container; this local FFmpeg animatic is a review file, not a canonical GitHub pipeline final.
- **1080x1920 / >=30fps preferred delivery specs: NOT MET** (preview only at 540x960/24fps).
- **Final numbered Drive folder: NOT CREATED**. Current REVIEW folder is intentionally unnumbered. The next new final folder number must be determined freshly from Drive at the time of QA-approved delivery.
- No GitHub Releases or YouTube publication.

**User-facing status:** Google Drive preview EXISTS, FINAL video does not yet exist.
