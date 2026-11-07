# V4 — No One Applauded on Day One

**Scope:** 140-second original 2D animation (version V4), 24 scene beats, minimalist ivory stick figure, all on-screen captions in English. This is a complete rendered film delivery but remains subject to animator/art-direction approval.

## Verified stored render

- MP4: https://drive.google.com/file/d/1cHfoGbWQJNso7PQMnqnOCiyzo4An4Gno/view?usp=drivesdk
- Folder #39: https://drive.google.com/drive/folders/1XbvKX4TTMYVkMkDHVa52TrhcUhveZyaf
- Actual file size: **45,450,933 bytes** (source file and Google Drive metadata match).
- Source-side SHA-256: `5b5d39d68a62e15d00de500a605f4bcc1eb9cbeae43bbafc436454b7063345ca`
- 1920 x 1080, CFR 30 FPS, 140 seconds, **4,200 frames**, H.264 with AAC stereo 48 kHz.
- Full `ffmpeg -v error -i ... -f null -` decode: PASS, no stderr errors.
- The 24-scene storyboard was rendered and visually inspected as a contact sheet.
- Motion math checks: deterministic foot plant, pushup hand/toe locks, boxing fist-to-bag contact, 24-interval timeline: PASS.
- Translation coverage: static analysis of original caption calls plus fully resolved English caption map, including end card; clock display `05:00` remains numeric.

## Original visual direction
- Reference-style family: white/ivory single-color head, torso, arms and legs; round joints and minimal black facial expression.
- No clothes or shoes. Red headband only while running, pushing up and boxing.
- Child is a distinct smaller figure. Both animated by a procedural rig.
- Original film's copyrighted frames/assets are not reused in this render.

## Known limits / honest quality gate
- A procedural stick character does not imply frame-accurate replication or professional animator performance.
- Some knee/elbow actions and body timing can be improved by manually directed key poses and deformation.
- Existing project-authored 720p scenic backgrounds were upscaled; only character shape rendering is drawn natively at 1080p.
- Music/foley is project-owned, reused from V2.
- This V4 production uses Pillow/Python; **not yet ported to the Remotion registry**, and full repository visual/pipeline validation has **not** been performed for V4.
- Drive file access remains restricted unless the owner changes sharing.

## Remaining sign-off steps
1. Review full MP4 at 1x, including walk 00:25, run 00:32, pushup 00:38, punch 00:50, child 02:05.
2. Retake any awkward poses; continue manual motion improvement toward source-film *feel*, not identity copying.
3. Port the rig and scenes to Remotion and pass `npm run verify`, `npm run test:visual`, and per-video pipeline audit before treating it as an engine-native delivery.
