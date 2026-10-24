# Đám Cưới Không Có Cô Dâu — FINAL production QA

**Date:** 2026-10-25 (Asia/Ho_Chi_Minh)  
**Ray version:** v0.3.0  
**Final Drive MP4:** https://drive.google.com/file/d/1llmM1lIFF60uw9UgTpl4N-W9SLOMZxoG/view?usp=drivesdk  
**Numbered film folder #14:** https://drive.google.com/drive/folders/1kLV_wbdyFDbELAeaxIse3CDTBJc_m_HA  
**Thumbnail:** https://drive.google.com/file/d/1vYpoRYF52iRIsGE1ZkGIFwq5r5R2koIS/view?usp=drivesdk  
**YouTube copy:** https://drive.google.com/file/d/1F1KTj9vvv93YPC5GiBIXlo9n80csjSbW/view?usp=drivesdk  
**20 actual video sample frames:** https://drive.google.com/file/d/1QdUv1DqpxhAxLtcetxsOAnkdkf3qIohb/view?usp=drivesdk

## Technical verified facts
- Complete MP4 is 60.000 seconds, 720×1280, 30 FPS, H.264 and AAC; **1800 video frames** and 1876 AAC packets/frames.
- Full FFmpeg audio/video decode: PASS (exit 0).
- The final Drive object was fetched back: SHA-256 **`7438b3d2826a7bfa0b5fe1fa24cce080424bafad57eac357a1626a0400009ba7`** exactly matched local finished MP4.
- Voice is ten authentic Vbee Batch job MP3s, speed 1.15, code `hn_male_phuthang_stor_24k-stl` from [GitHub Actions run #40132748782](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40132748782). All ten MP3 SHA-256 values verified against measured-timeline.json, original audio durations 3.46–5.52s within 6s slots.
- The approved 16-panel review board was the visual basis; **28 cinematic 2D/2.5D microshots**. Separate native white/amber/crimson Vietnamese captions, not storyboard-review typography; smooth crossfade ~0.43s, no deliberate shake/glitch. Original synthesized dark wedding score plus context SFX.
- Removed residual panel indices by cropping/inpainting top-left of each clean per-shot art asset. Reviewed 20 actual frame grabs across the exported MP4; no claim of independent natural human acting.
- Technical QC was rerun after discovering and rejecting the first upload: it had 60s audio but only 648 video frames (21.6s). That bad artifact was renamed `REJECTED_incomplete_video_21s_DO_NOT_USE.mp4` and is not the FINAL linked above. Verified final has the full 1800 video frames.
- Manual perceptual review of the entire hour/minute playback and subjective voice emotional quality was not independently certified; do not claim an objective view/retention increase.

## Story beats / on-screen evidence
0–6s guests rise, invisible aisle and floating veil; 6–18s bride in camera but absent in reality; 18–24s name PHONG on wedding invitation; 24–30s guests know the secret; 30–36s bouquet drop and flight to exit; 36–42s door leads back to empty reception; 42–48s the bride closes on camera; 48–54s groom identity revealed through recording; 54–60s camera left on chair, recording the empty reception with a final glimpse of groom and bride.

## Archive contract
Only source, timeline, provenance, Vbee workflow and production QA go on GitHub. User-visible video binary, vertical thumbnail and title-description live in **Google Drive folder #14**. **No GitHub Releases, no video binary in Git commits**. Do not automatically publish to YouTube.
