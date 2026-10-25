# Ray Phim Kể Chuyện — Laundry V6 Review Delivery (2026-10-25)

**Status: REVIEW / NOT FINAL.** Source V5 on Drive retained unchanged. Film plot and 16 original Vbee MP3s reused, 8 independent AI-generated visual references for stronger drama; actual V6 motion remains primarily cinematic zoom/pan (2.5D), with a temporal rising-water overlay. The seven complete before/action/after P0 gates have NOT all passed. Never mislabel this as fully production ready.

## Verified Drive objects
- Film #18 folder: https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN
- V6 video **REVIEW**: https://drive.google.com/file/d/1YBACdDxx3dgJUz_bBvMT3WBy5CBmbWhM/view?usp=drivesdk
- V6 thumbnail: https://drive.google.com/file/d/1M8TYjyB0TJk85dzq_6oIL1m97EwG5_V3/view?usp=drivesdk
- YouTube title/description: https://drive.google.com/file/d/1AOETuwOtBDa05uL4SG--zHXn2BexxBoQ/view?usp=drivesdk
- QA contact sheet: https://drive.google.com/file/d/1FGvtBjf3HdfZSSeeX7IBiAJKhHLo-rZx/view?usp=drivesdk
- QA JSON: https://drive.google.com/file/d/1vCRQdXcctpCgem195CCx7pCxHB_KnyIz/view?usp=drivesdk

Drive returned MP4 size 23,963,664 bytes, video/mp4, direct parent #18. V5 still separately available.

## Fresh checks
- V6: 1080x1920, 60/1fps, 3600 H.264 frames, 60.000000 seconds; audio AAC.
- MP4 full decode: FFmpeg `-v error -f null -` produced zero stderr lines.
- MP4 SHA256 `ac187c7ab736fabc443a85288571e20e02f1846f72e54b0f15c1ba93a8fabe92`.
- All 16 Vbee original source MP3 SHA256 values rechecked against `voice/measured-timeline.json`: 16/16 matched.
- Story visual samples were reviewed as 15 time-stamped source frames and a V5/V6 comparison.

## Quality notes and block reasons
- Compared with V5, V6 features separate scene illustrations of STOP press, latch tug, water spill, phone trapped self and outside duplicate; those appear as distinct **staged still images with camera motion**, not true actor performances.
- Motion evidence per each of seven events is incomplete: particularly disconnected plug + spinning drum, reflection smiles before Thu, STOP press causes acceleration, latch pull resists, rising water in space, phone shows character pounding, end inside/outside identity swap.
- No proof of 0.35–0.55 sec *continuous* crossfades at every boundary. This render has scene boundaries that should be polished; video test only confirms that full MP4 decodes.
- Remotion dependency install was blocked by external DNS; canonical `npm run verify`, `npm run test:visual` and `pipeline.py audit` were not executed and all canonical gate approvals remain unrun. This render was made with local FFmpeg from scene images, not Remotion CLI. No independent reviewer has watched end-to-end.
- Some earlier low-resolution art/text remains in first 8 shots; clean source rebuilding is still needed.
- Therefore the uploaded MP4 is a genuine watchable **REVIEW**, not QA-approved FINAL. No GitHub Releases or public publishing.

## Correct next action
Use a dependency-capable Remotion runner to implement real stateful action transitions and exact voice-to-visible P0 proof, then run the canonical QA pipeline; after passing, replace V6 REVIEW with `video-v6-final.mp4` inside existing folder #18 without altering V5.
