# Psychology People-Pleasing V2 Remotion Implementation Plan

> Implement inline with regression tests and an original REVIEW artifact. V1 remains unchanged.

**Goal:** Upgrade V1 psychology stick-figure video based on audited defects while preserving original verified Vbee audio.

**Architecture:** Separate V2 Remotion entry and caption-timing JSON; reuse measured Vbee audio and original music via GitHub Actions. V2 editing is reversible and distinct from V1. A reproducible workflow exports to GitHub Actions artifact and Drive #27.

**Tech stack:** React 19, Remotion 4.0.534, SVG vector motion, Python 3, FFmpeg, GitHub Actions, Google Drive.

## Constraints
- Same original educational script and genuine Vbee HN Thanh Long, 37.733 s measured dry voice; no synthetic substitute or unwarranted 100% word alignment claims.
- Native 1080x1920, 30fps, H264/AAC stereo 48kHz, and authentic Be Vietnam Pro ExtraBold.
- No overwrite/deletion of V1; V2-REVIEW until complete human/mobile listening and commercial rights signoff.
- Correct section indicator: INTRO / 01–06 / TAKEAWAY / CTA, never 08/06.
- CTA not overlap limbs; each scene receives a specific animated psychological action.

## Tasks
1. Build phrase-timing JSON by listening-oriented waveform energy minima around text-weighted boundaries and validate each phrase covers narration script once, monotonic times with no gaps. Inspect voice gaps and report estimates not true word alignment.
2. Create new entry-v2.tsx: fix footer semantics, CTA collision, modify rig to illustrate concrete actions, purposeful icon/object motion, professional type and safe zones. Static regex/regression tests for counters, subtitle data, font references, and source preservation.
3. Render GitHub Actions V2 via workflow distinct from V1; confirm artifact authentic, full decode, ffprobe size/duration, frame samples and audible Vbee evidence.
4. Review actual MP4 scenes/contact sheet, place full V2 pack in existing Drive #27, verify links, parent, MIME and bytes. Report remaining review blockers honestly.

## Review Focus
- Split captions too early/late due to energy-pause detection: validate sampled midpoint and disclose non-word alignment.
- SVG overlays crossing captions/safe zone: check exported 360x640 preview and contact sheet.
- CTA overlays figure at last 3 seconds: verify screenshot near t=36.5s.
- V1 accidental change due to workflow path reuse: use new V2 filename and entry only.
- Unproven commercial Vbee rights: leave upload status REVIEW.
