# BA TIẾNG GÕ TRONG ĐÊM — V4 production handoff

Status: **PREVIEW ONLY / NOT FINAL** (2026-10-25).

## Deliverables verified locally
- 55.000s technical motion-comic preview using a 12-panel approved horror contact sheet as source; 14 timeline beats.
- Preview encoded H.264 540x960 @24fps + AAC; FFmpeg full-stream decode passed.
- SHA-256 local preview: `51cc68e1d5663e67b77555de0f6fd36cac8fbc1d2f5edc70a1e9eb55aa086469`.
- No storyboard review timecodes were intentionally exported; in-story 2:17 clock is allowed.
- Cinematic fade 0.45s; limited smooth 2D camera movement. **Not independently animated acting.**
- Preview voice was **eSpeak Vietnamese** (local synthetic stand-in), **not Vbee**, so NOT suitable for delivery as Ray FINAL.
- Preview source media is a conversation-local, user-approved generated storyboard; not embedded into Git history.

## Required work to reach FINAL
1. Generate separate clean full-height source shots 9:16 with no captions, badges, timecodes or grid boundaries. Replace enlarged/cropped review panes; verify Huy/mother/door/coffin and action cues.
2. Generate new genuine Vbee Batch utterances with authenticated GitHub Secrets; capture job IDs, real MP3, measured durations, checksums. Re-time voices/graphics to exactly <=55 seconds; avoid clipped phonemes.
3. Render production Remotion composition registered only in `src/videos/registry.ts`, scene asset proof at 0-6, 26-42, 42-55, 0.35–0.55 sec fades, no fake shake.
4. Run repo canonical phase/gate pipeline; `npm run verify`, `npm run test:visual`, `python3 -I scripts/pipeline.py audit ba-tieng-go-trong-dem-v4`; ffprobe/ffmpeg decode; listen to actual Vbee and inspect action proof; label blockers explicitly.
5. Only after QA PASS, create the next available numbered child of Videos-shorts `1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`; upload and re-read `video-final.mp4`, `thumbnail-youtube.png`, `youtube-title-description.txt`. GitHub hosts source/QA/Drive links ONLY, never Releases.

Current blockers: HeyGen Video Agent not included in free tier in this region; OpenArt video mode minimum 50 credits while 40 credits available; real Vbee generation not executed; Drive final archival not executed. No link is to be fabricated.
