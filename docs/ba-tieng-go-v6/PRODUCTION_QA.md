# BA TIẾNG GÕ TRONG ĐÊM — V6, 55 seconds

## Delivered media (2026-10-25, Asia/Ho_Chi_Minh)

- **Current final video:** [Google Drive video-final.mp4](https://drive.google.com/file/d/1eCxCITPVWhykEyvQMtMA8AjkacrFmcoZ/view)
- **Containing numbered folder:** [20. Ba Tiếng Gõ Trong Đêm](https://drive.google.com/drive/folders/1OFuWJi4td_cg3qnP2YwF6gGb9L3H5-VV)
- **Portrait cover:** [thumbnail-youtube.png](https://drive.google.com/file/d/1eDkQbMsMKObQA1uhHnONttEhPB85QOz9/view)
- **Vietnamese YouTube copy:** [youtube-title-description.txt](https://drive.google.com/file/d/1NC-hOytlccTTyziDedp-KlHlgxKfzEj4/view)
- **Earlier V5** kept under its own version filename; **earlier V4** remains available as `video-final-V4-archived.mp4`. This revision became the canonical `video-final.mp4`.

## Verified technical output

- Duration: **55.000s exact**; format **H.264 / AAC**; **720×1280**, **30fps**, yuv420p.
- Real **1,650 video frames**: all frames decoded successfully with FFmpeg (exit=0).
- Selected 30 frames in 0–54s had nonzero mean brightness; scene-specific visual samples independently inspected.
- 16 distinct independently staged clean images, smooth 2.5D camera motion, authored action effects and ~0.42s dissolves. No board timecode, review grid, review badges or storyboard captions burned into MP4.
- **13 original measured Vbee Batch MP3 cues** from GitHub Actions run [40207993379](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40207993379):
  - Anh Khôi `hn_male_phuthang_stor_24k-stl`, Actions artifact ID `12604481512`.
  - Ngọc Huyền `hn_female_ngochuyen_full_48k-fhg`, Actions artifact ID `12604481474`.
- All 13 measured MP3 voice clips fit their scripted shot intervals; no loss of final word. The audio was balanced with a -17 LUFS target using FFmpeg loudnorm.
- Native subtitle phrases are based on measured utterance durations, using proportional phrase subdivision. **Not phoneme-level forced alignment / not true lip-sync**.
- Sound effect knocks, door, phone and cemetery rain aligned to designed beats.
- **Final local SHA-256**: `c7891b00d4ea0484da24399f71c20847dd1349a63ee42b93e419b645ba614504`.
- **Final Drive byte count:** `5,078,198`; Drive metadata read-back confirmed video/mp4, parent ID, filename and bytes.

## P0 visual evidence summary

The story-specific proof checks include: 2:17 clock; muddy hand grasping Huy's ankle; floor mud marks; incoming mother call; locked door; separately animated metal knob; readable warning `MẸ ĐANG Ở MỘ CON.`; Huy confronting the door; escalating damp soil; Huy in collapsing dirt; rainy grave; mourning mother represented as dark silhouette; coffin lid shift and widening gap; entity's real-textured eyes and short whispered subscribe/heart CTA.

This is a **cinematic 2D/2.5D** horror short assembled from still-image sources and composited keyframes, not a fully character-animated video. It does not claim natural actor lip synchronization or independently filmed performances.

## Outstanding canonical pipeline check

Production was rendered and media-checked in the ChatGPT container rather than running the full repository Remotion project. `npm run verify`, `npm run test:visual`, and `python3 -I scripts/pipeline.py audit ba-tieng-go-v6` were **not run in this container** and are **pending**; do not represent them as passing.

No GitHub Release used: video bytes, thumbnail and publishing text live in the existing numbered Drive movie folder. GitHub stores workflow, cue manifest and production/QA metadata only.
