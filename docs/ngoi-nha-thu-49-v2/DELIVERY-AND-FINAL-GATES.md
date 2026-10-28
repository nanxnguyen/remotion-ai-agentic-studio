# NGÔI NHÀ THỨ 49 — V2 REVIEW media delivery and QA (28 October 2026)

## Approved story contract
18 scene beats; total exactly 60 seconds; intro CTA 0–3s, outro CTA 56–60s; protagonist Thảo 26, mother at real house 48, phantom house 49 and thief duplicate. Original approved dialogue is preserved in [voice-timeline.json](voice-timeline.json) without content changes. Subtitle label only **LỜI KỂ**.

## Media stored in the owner's numbered Google Drive
- Folder #29: https://drive.google.com/drive/folders/1QwvZWX0yANLu4qRc4Sklhy4AL5kHNlwO
- **Actual REVIEW MP4**: https://drive.google.com/file/d/1eJj-02hYOTHkOAhoxu90gITjZOo-Ra3a/view?usp=drivesdk
- Story-specific vertical thumbnail: https://drive.google.com/file/d/1AJqDG6IAfUt5dEELbE6JPvCiDSRQ6nYa/view?usp=drivesdk
- Publishing title/description: https://drive.google.com/file/d/18ys7e_g65T3tpFwd642RWLxr0uYWAX0h/view?usp=drivesdk
- 18 actual MP4 review frames: https://drive.google.com/file/d/1oHt9pRU_HD6qr22DXsTcgr2PZUUmymy_/view?usp=drivesdk
- QA explanatory report: https://drive.google.com/file/d/11spkbBP5EdTATY_mRM4vV4rfKjgkahCP/view?usp=drivesdk
- Files remain private. No YouTube upload or older-film mutation.

## Verified technical results
- Real Vbee Anh Khôi 18 MP3 utterances, voice code `hn_male_phuthang_stor_24k-stl`, pace 1.16, Batch API, source SHA256 and ffprobe durations verified, all 18 fit the scheduled slots. [Actual successful GitHub Actions run 40695675428](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40695675428); artifact `house49-v2-authentic-vbee-18-lines` (id 12818349311).
- MP4 **20,004,632 bytes**, `SHA256 2d2ff8285616fea856cba9a9828cdf05e67e268b888a9a63b584c71bd4021813`.
- MP4 is H.264 720×1280 9:16 at 30 FPS, 1,800 video frames, AAC stereo 48kHz, **60.000000s** measured. Full FFmpeg video/audio decode exit code 0, sampled actual MP4 at all 18 mid-shot timestamps.
- 18 different shot concept image treatments with native separately rendered captions (exact narration + `LỜI KỂ`); original quiet synthesized drone/SFX; fades and controlled 2D/2.5D motion; no contact-sheet grid or storyboard timecode baked into MP4.
- Temporal visual editorial evidence (limited): 24–27s blur of disappearing knob, 50–54s house fades into fog, 54–56s two-person mother–daughter photo morphs into mother-only photo.

## Mandatory FINAL blockers — DO NOT claim final/monetizable certified
1. **Source art P0 FAIL**: rather than generating clean independent high-resolution vertical scene art, existing approved 720×1280 review board cards were individually cropped; visible art regions are only about 668×434 and are wrapped in a dark atmospheric 9:16 montage treatment. This produces posters-on-screen, less dynamic than the desired cinema grade. Needs new original 18 full-height scene assets, consistent mother/Thảo/double/house geometry.
2. **Action P0 PARTIAL**: individual critical actions (doorknob genuinely disappearing from an unaltered door, duplicate actually stepping through while heroine is blocked, clone running across lane, family photo alteration) are only represented by still illustrations, composited interpolation or partial masking — manual before/action/after proof does not pass completely.
3. **Canonical pipeline PENDING**: not implemented in the repo Remotion registry and no `npm run verify`, `npm run test:visual`, `python3 -I scripts/pipeline.py audit ngoi-nha-thu-49-v2` passes. Current REVIEW was rendered with procedural OpenCV+FFmpeg.
4. Final sound subjective listening QA is unverified (the source is genuinely Vbee and codec/level checks pass).
5. **No GitHub Release** per latest Ray no-release user directive; GitHub is source/QA, MP4/thumbnail/description live in Drive.

**Status: complete watchable 60-second REVIEW; production FINAL blocked by above P0 gates.** Never rebrand a review as final solely because media codec/frame count checks pass.

## Next execution work, not just recommendations
Use the approved concept as a creative brief to regenerate independent clean original 9:16 artwork. Show visible proof for actions especially scenes 09,13,14,16,17; implement canonical Remotion composition and rerender, listen and audit before renaming final. Preserve this review file and older projects.
