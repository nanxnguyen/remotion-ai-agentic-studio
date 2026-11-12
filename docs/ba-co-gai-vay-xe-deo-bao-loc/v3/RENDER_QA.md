# V3 Render QA — Bảo Lộc three women horror short

**Status: PREVIEW / NOT FINAL APPROVED**

- Video: `video-V3-preview-animatic.mp4`
- Google Drive: https://drive.google.com/file/d/1n28fODJ3hiMsr1AwobB_eA--SoAs2bUm/view?usp=drivesdk
- Existing folder 41: https://drive.google.com/drive/folders/1wz_yyZRQJpGXwBNN7srZvxSqUpT7QmW4
- Format: MP4 H.264 video + AAC stereo audio, 1080 × 1920, 30 FPS
- `ffprobe` full duration: **53.700s**
- Actual file size: **13,061,284 bytes**
- MP4 SHA-256: `2e9e5cf4e798547110de1fb64f546383a02d3f7653b41fe58f1fd320c55ac671`
- Full FFmpeg decode: **PASS** (no decode error)
- Original Vbee Batch voice `n_hn_male_ngankechuyen_ytstable_vc` — 10 MP3 clips, manifest SHA-256 checked
- Vbee proof run: https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/41438762676
- Audio measured: 49.632 seconds total voice; final mix duration 53.712 seconds
- Audio detected peak: −5.7 dBFS; detected mean: −26.5 dBFS
- Source images: individual composite/matte illustrations. Standalone original AI thumbnail art forms the motif, other backgrounds/props are procedurally authored; no storyboard grid crops.
- Changes: scene 8 timed apparition fade to empty road; scene 9 mirror reflection fade in; original background ambience synthesized.
- Captions: burnt in as native subtitle typesetting with Vietnamese UTF-8, 18 sampled frames inspected.

## Important non-passed gates

1. **Photoreal cinema/acting:** NOT ACHIEVED — produced footage is stylized 2D/2.5D animated illustration, not true independent full human acting or photoreal live action. Do not represent it as a final cinematic visual-quality pass.
2. **Listening QA:** PENDING — automated decode/volume checks do not replace a full manual listening pass.
3. **Full repository canonical gate/audit:** PENDING — the chat render used standalone FFmpeg pipeline rather than Remotion registry; do not mark canonical source/visual tests as passed.
4. **Final publishing:** NOT AUTHORIZED. No YouTube upload.

## Archive override

Latest archive instruction: approved media belongs in existing Drive folder #41; GitHub retains source and QA. **No GitHub Releases**, and do not create a second numbered folder for this revision.

This is an honest playable V3 preview for story pacing and voice review; V1/V2 are preserved. Do not mark full production as completed until the visual acting/picture-lock and manual audio/QA gates pass.
