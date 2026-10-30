# GIÂY THỨ 61 V2 — Remotion film rebuild (NOT YET RENDERED)

**User lock:** 16:9 horizontal, 135 seconds, 24 fps, 1920×1080 target; 22 original Vbee Anh Khôi voice lines unchanged; **photorealistic real-looking human footage** like the older Ray horror films, not the V1 procedural vector animation. OpenArt excluded by user. Keep original V1 Drive file intact.

## Implemented
- `src/videos/giay-thu-61-v2/index.ts`: new composition `GiayThu61V2Cinematic`, 3,240 frames.
- `timeline.ts`: all 22 immutable voice/action beats, totaling exactly 135 seconds.
- `Reel.tsx`: Remotion-only film composition using **real independent 16:9 video clip inputs**, measured Vbee source inputs, native Vietnamese cinematic text, 11-frame soft fades and clean 16:9 canvas. No cartoons, storyboard collages, source baked timecodes or false claims of acting. This is source code, NOT a finished video.
- `scripts/verify-giay61-v2-media.py`: fail-closed preflight: requires 22 actual 1920×1080 clips of sufficient length and 22 real Vbee MP3s before render.
- Genuine source audio and 22-shot cinematic prompt/visual evidence descriptions are in [the production preflight ZIP on Drive](https://drive.google.com/file/d/19CdorXW8vRcMWFEtvbUKR7AGbzizHXST/view?usp=drivesdk).

## Still BLOCKED
No complete independent photoreal motion clips have been produced. Connected Pollo accounts had 0 credits each; user explicitly excluded OpenArt. A clean photo image generation was submitted via Canva, but it is not a film clip and not a replacement for 22 acting/action videos. No genuine 16:9 photoreal MP4 V2 has been rendered. Do not call FINAL or claim technical QA passed.

## How to finish, with the correct Ray pipeline
1. Generate **22 separate** 16:9 1920×1080 clips (Huy same face/outfit, consistent room, before/action/outcome events). Place them in `public/giay-thu-61-v2/clips/shot-01.mp4` ... `shot-22.mp4`; each clip needs its shot duration + 0.5s for fade except final.
2. Extract `audio/s1.mp3` ... `audio/s22.mp3` from the verified ZIP and place in `public/giay-thu-61-v2/voice/`. Compare SHA256 to the Vbee manifest.
3. Run `python3 scripts/verify-giay61-v2-media.py`. Fix every media error.
4. Run `npm run verify`, `npm run test:visual`, `python3 -I scripts/pipeline.py audit giay-thu-61-v2`. Do not mark stages passed if a gate is blocked.
5. Render `npx remotion render src/index.ts GiayThu61V2Cinematic out/giay-thu-61-v2-review.mp4 --codec h264`; then ffprobe, full FFmpeg decode, 22 action frame proof checks, human listen, smoothness/caption/CTA QA.
6. Archive real MP4/thumbnail/YouTube text in the existing **Drive folder #35**, keep V1 and all other films, and commit only source and QA to GitHub. No GitHub Releases, no automatic YouTube publish.

## Action evidence P0
Monitor impossible 61st second; no camera behind Huy; predicted mug spills **then real mug spills**; disconnected camera keeps playing; locked drawer opens; broken keyboard; cursor moves alone; digital Huy hits inside glass; progress reaches 100%; physical Huy disappears; empty chair; Huy imprisoned inside monitor; CAMERA 02 captures next victim. Any missing visual action fails V2 final.
