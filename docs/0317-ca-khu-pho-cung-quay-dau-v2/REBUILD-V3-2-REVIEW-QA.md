# 03:17 Rebuild V3.2 — FULL 60s REVIEW QA (2026-10-28)

## Delivery
- [Actual 60s MP4 (Google Drive)](https://drive.google.com/file/d/1TTY1IIxNMVWLwVBgJTAPOwckDU6FkSvA/view?usp=drivesdk)
- [All 18 MP4-extracted review frames](https://drive.google.com/file/d/1N0OSbzJ9c0KYTym6sZ9RmYiAmzRv14JB/view?usp=drivesdk)
- [Action proof contact: curtain, phone, blackout](https://drive.google.com/file/d/1wtSsT6OpUpg5CgabzJJJ-AGgD9q1JBOK/view?usp=drivesdk)
- Folder #26 reused, older V2 retained unchanged.
- Approved original voice [Vbee Actions run #40545011163](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40545011163).

## Verified technical checks
- 60.000000s, 1080×1920, H.264/yuv420p, nominal 60fps container, 3600 frames; AAC 48kHz audio.
- 34,926,501 bytes. SHA256 `019415cda7bf7139447be6d2cbda7fc29bd81fab26e9fa75ef1db1b06d24ac2d`.
- Full FFmpeg decode produced no errors.
- 18 approved Vietnamese lines, genuine Vbee Anh Khôi source MP3s from prior checked Batch job. Mixed audio track reused unmodified from approved V2.
- Story 18 beats (3s CTA intro, 53s narrative, 4s CTA outro); caption lower-label only "LỜI KỂ", never speaker/voice provider name.
- Reviewed actual decoded MP4 image samples at 18 shot midpoints plus 18 action-phase timestamps.
- Source photo artwork from approved storyboard is cropped and cleaned to remove scene-grid/timecode/baked subtitle. Intro/reaction/blackout backgrounds use independently cropped high-res key art. First-look ceiling hand stays out of view until camera reveal.

## Still failing/pending FINAL gates — do not relabel as FINAL
- Some physical actions use editorial 2D/2.5D illustrated transforms/composites, not convincing full-frame film motion (12–15s curtain cloth and witness eyes 18–21s). Distinct source art quality is variable; 15 of 18 shots are crops from approved storyboard art, not original 1080×1920 standalone generated scene photographs. This is a watchable **review**.
- 46–50s blackout is sequential and visibly trackable, but black-out masks require photorealistic window-boundary refinement. Camera apparition is confined to phone screen at 30–34s, but phone plate and ceiling physical geography still deserve final consistency review.
- Editorial frames authored at 540×960/30fps, encoded 1080×1920 nominal 60fps. **Do not claim native 60fps animation or high-res optical detail.**
- Did not run canonical Remotion workflow, npm verify, npm test:visual, or `python3 -I scripts/pipeline.py audit`. Critical motion event proof records remain editorial REVIEW, not passed P0 certifications.
- No YouTube publishing, GitHub Releases or destructive edits to older film versions.

## Next production upgrades
- New consistent clean source artwork and composited hand/curtain action; realistic eye/gaze changes in witnesses; 46–50s photometric per-window blackout; 53–56s camera near-reveal.
- Canonical Remotion build & independent visual+audio acceptance after replacing these assets.
