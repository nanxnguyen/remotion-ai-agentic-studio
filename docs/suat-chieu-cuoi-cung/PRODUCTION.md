# Suất Chiếu Cuối Cùng — 60-second cinematic horror short

## Approved film
- Main character: **Nam**, age ~30, supported by an elderly cinema usher, shadow presence and an uncanny ghost audience; character cast deliberately differs from prior shorts.
- Picture: 16 distinct vertical 9:16 story shots staged from the user-approved 4×4 **Rạp Minh Châu** review storyboard (which is NOT used as a full-screen shot); suspense story structure HOOK → BODY → CLIMAX → END / PAYOFF.
- 10 original voice utterances: genuine Vbee Batch API **Anh Khôi** `hn_male_phuthang_stor_24k-stl` generated via verified successful Actions [run 40085182114](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40085182114), with measured MP3 durations and an authentic provider artifact.
- Picture editing: individual 2D cropped photographic panels with keyframed camera motion, layered screen lighting/film projector treatment, intentional ~0.31-second dissolves and SFX-aligned hard cuts at major shocks. **Not live video acting or verified phoneme lip sync.** The approved multi-panel source has relatively low pixel resolution per cropped shot.
- Audio: original Vbee speech mixed under synthesized licensed-free suspense score/room tone, projector rumble, creaking seat, ticket, door, and director clapper effects; music ducks when speech is present.
- Type: generated Vietnamese-safe Noto Sans Display cinematic captions, ivory base, amber evidence, crimson threat. Two beats per narration scene, timed in code rather than trusting baked AI source text.

## Verified local export
- Chat artifact: `suat_chieu_cuoi_cung_VBEE_cinematic_60s.mp4`
- Video: **H.264**, **720×1280**, **24 FPS**, **1,440 video frames**
- Audio: **AAC stereo**, 48 kHz
- Measured duration: **60.000 seconds**
- Measured file size: **5,543,399 bytes**
- Measured SHA-256: `07b0efdd597b0caf897f0a26db588f83d7452bce51e0cdc6a44f2f0d7a070371`
- Ray plugin structural preflight with real-voice metadata: **10 scenes / 60.000s / 0 errors / 0 warnings**. This is structural validation, NOT confirmation of full canonical Remotion pipeline audits or human audition.
- Motion sanity: 14 spaced 0.3s frame-pair tests all show image changes; measured mean pixel differences **2.93–12.21** in 180×320 downsample. This detects technical frozen frames, not genuine actor performance.
- Reviewed actual MP4 QA contact sheet covers the hook, scene changes, director cue and last frame.
- The complete editing package (render/mix source scripts, storyboard panels, real Vbee source MP3s, QA, project manifest, and final MP4) was delivered as a ChatGPT ZIP; it is **not a GitHub asset**.

## GitHub archive status (critical)
- **Actual binary draft Release upload is pending.** The connected GitHub tool can commit text and read Action artifacts but cannot upload the locally rendered MP4 bytes as a Release asset.
- Do **not** assert a verified GitHub video-download URL or archived=true until the actual MP4 is sent via the repository's authenticated `scripts/archive-local-final-video.sh` or `.github/workflows/archive-finished-video.yml`, and the resulting asset filename, byte size and digest are verified.
- The voice-run artifact is **only voice**, not finished movie; the mere presence of a manifest is not proof of MP4 archival.
- This local OpenCV/FFmpeg rendering path is a faithful 2D motion-comic production, not a fully registered canonical Remotion video; canonical `npm run verify`, `npm run test:visual`, and `python3 -I scripts/pipeline.py audit <vid>` are still pending for a Remotion migration. Do not claim those gates passed.

## Reproduction
Run the Python renderer and mixer from the chat-delivered source ZIP using Python 3, OpenCV, Pillow, NumPy, SciPy and ffmpeg/ffprobe. Font source binaries are intentionally omitted.
