# Ba Tiếng Gõ Trong Đêm — V10 (opening challenge)

## Scope
Replaces only **00:00–00:03** of the approved V9 Luxury Cinematic video with a user-reference-inspired 3-second horror challenge card. Preserve **00:03–00:55** of V9, including its existing closing like+follow CTA. No video timecode, no storyboard border, and the whole film stays 55.000 seconds.

## Editorial / visual
- Vietnamese wording: **“NẾU BẠN ĐỦ CAN ĐẢM...”**, **“HÃY NGHE”**, **“TIẾNG GÕ”**, **“THỨ TƯ?”**, lower question **“DÁM Ở LẠI ĐẾN CUỐI?”**.
- Dynamic cinematic typography in antique gold with restrained warm-blood red, ornamental gilt, simple skull motif.
- Background is the **original wet wooden bedroom door from this exact story**, not the washing machine in user's inspiration reference. A small **2:17** digital clue is a prop-time motif, NOT a storyboard timecode.
- Text fades/slides in progressively; very low-noise camera push; four knocks with the fourth near 00:02.66; no jumpy shake or glitch.

## Authentic Vbee & QA
- Spoken text: **“Dám nghe tiếng gõ thứ tư không?”**
- Provider: Vbee Batch, model: `hn_male_phuthang_stor_24k-stl`, speed 1.17.
- Authenticated synthesis: GitHub Actions run [40216522092](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40216522092), artifact `ba-tieng-go-v10-opening-vbee`; source SHA-256 from `measured-timeline.json`: `d13152f310b85fef35f7a353da3942107a5eceb1d3421c844f3e50046ebcb186`.
- Finished local output: `Ba_Tieng_Go_Trong_Dem_V10_CTA_DAU_LUXURY_VBEE_55s.mp4`, H.264/AAC, 720×1280, 30 FPS, **55.000 sec**, **11,272,605 bytes**.
- Full ffmpeg decoding passed. Sampled 15 real video frames covering the challenge, hand transition, clues and original end CTA; no storyboard timecode observed. Opening voice loudness adjusted to close to the V9 spoken dialogue (mean intro approx -26.4dB vs scene 12-16 approx -27.6dB).
- **LIMITATIONS**: standalone 2D/2.5D cinematic source, not natural facial acting/lip-sync. This was rendered in the conversation runtime, **not** by the canonical repository Remotion pipeline. `npm run verify`, visual tests and `python3 -I scripts/pipeline.py audit ...` remain **unrun** for V10. Do not report these as PASS.

## Delivery
MP4 is a conversation artifact. **Google Drive upload has NOT been verified**; the connector requires a recognized connector file URI and rejected a local Library file ID. Do not link a prior Drive version as if it were V10. Store the new V10 in the preexisting numbered video folder when authorized upload becomes available. Avoid GitHub Release under the project's latest No-Releases instruction.
