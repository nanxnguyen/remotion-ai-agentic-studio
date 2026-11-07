# V6 Mini Horror — faithful poster 3s opening (2026-10-26)

**Status:** REVIEW awaiting owner visual approval. Owner specifically rejected prior in-video intro because it departed from the approved gold/crimson generated horror artwork. This cut displays **the approved image itself** for the first 3.000 seconds with a very slight centered 1.4% camera push and 0.20s fade-in. No replacement typography or subtitle blocks are composited atop the original poster.

- **Verified Google Drive preview:** https://drive.google.com/file/d/1rr462b8zOaRTvHD0S0HGrhDXXVEZzLHr/view?usp=drivesdk
- **Actual poster vs decoded video QA frame:** https://drive.google.com/file/d/19L7JiH0GzLxuclPSgTmpBQD_N4GTfJHE/view?usp=drivesdk
- **QA machine-readable manifest:** https://drive.google.com/file/d/1FPfbp_CkKGzq7ukVbmY8j7HWeHrvMIPv/view?usp=drivesdk
- Existing film #18 folder: https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN

## True input and process
- Image: `máy_giặt_ma_ám_hãy_xem_đến_cuối.png` (941×1672 generated, portrait ratio 9:16). The artwork includes its own premium metallic gold/red words, wet washer and trapped face.
- Source movie: `video-v6-mini-horror-68s-REVIEW.mp4` (68s); its Vbee 3-second opener and the later 5-second CTA are kept as originally recorded.
- Reencoded only frame 0..179 of the new image as 1080×1920, H264 High profile 60fps, then appended **stream-copied tail frames** 180..4079 of the previous movie using exact source keyframe at t=3.00s, frame-accurate mux.
- Audio AAC from previous full 68-second MP4 stream-copied without alteration.

## Actual checks on output
- Output 68.000s, 1080×1920 9:16, exactly 4080 frames 60/1 FPS, H264 High / AAC 24kHz.
- All 3900 output video packet SHA-256 values **after the opening** match byte-for-byte the corresponding 3900 packets from the input.
- All 1595 audio packet SHA-256 values match byte-for-byte.
- Full decoded MP4 with FFmpeg returned exit 0 and empty error log.
- SHA-256 final MP4: `28b1f7773d4c0f4586ef68e2f60e1a696581c59460c8ed5d87ed99ed4438679a`.
- Drive file 31,959,112 bytes, MIME `video/mp4`, exact parent film #18 verified by connector readback.

No source existing approved final or earlier preview was overwritten or deleted. No canonical Remotion render or all visual-action gate approval claimed; this is a visual REVIEW. No GitHub Releases or YouTube publication.
