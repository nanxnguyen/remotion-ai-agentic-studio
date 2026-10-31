# "Khong Ai Vo Tay Cho Ngay Dau Tien" V3 — render QA

## Scope
Full 140-second re-render (V3) of the existing original story, not an edited still image. Visual improvements focus on character proportions, clothing, joint poses, walk/run, pushups, boxing and adult/child differentiation.

## Verified MP4
- **Drive**: https://drive.google.com/file/d/1q3wU10JdV8vy-obL4WT9lgPGCCEGiTXH/view?usp=drivesdk
- **Folder #39**: https://drive.google.com/drive/folders/1XbvKX4TTMYVkMkDHVa52TrhcUhveZyaf
- Filename: `video-final-v3.mp4`, 47,879,821 bytes (Drive metadata readback matched source)
- Full duration: 140.000 seconds; 1920 x 1080; 30 fps; 4,200 frames
- Audio: AAC stereo 48 kHz
- SHA-256: `19e57aa64498c3d1b03c28280775f819f7ee289327a485e25a66784b378992cc`
- FFmpeg full-stream decode: no errors
- Basic deterministic geometric checks on IK/contact poses: PASS

## Art changes from V2
- Replaced the featureless cream mannequin with an original clothed 2D adult and distinct child.
- Reduced head scale, shortened neck, articulated arm/leg anatomy, improved elbow/knee directions.
- Added shoes, sleeves, wrists, pelvis plane, cloth shading, expression states, stance-weighted gait and controlled punch contact.
- Preserved the original 24 story beats, existing audio composition and overall narrative.

## Visual QA: OPEN (important)
V3 is still an **illustrated procedural-rig prototype**, not professional hand-keyed animation or a reproduction of the provided character reference. Some knee/hand positions remain stylized (notably pushup and punch), background scene artwork began as 720p and was scaled to 1080p, and no complete shot-by-shot animator signoff has occurred. A successful decode or geometric test does not certify acting quality.

## Source
- [V3 source, base scripts, contact sheet, QA ZIP](https://drive.google.com/file/d/1PtOm8W-t8qGiQY7tSKrBsPnpUGJJlHQk/view?usp=drivesdk)
- [V3 original thumbnail](https://drive.google.com/file/d/1kyj-4KR4joG52nxdJ7ACuQU4M6OSGMAd/view?usp=drivesdk)
- The source uses Python/Pillow and original V2 script/audio. The ZIP documents its prerequisites and contains the relevant Python source files; it does not include the V2 soundtrack WAV.
- **NOT a Remotion-native video composition;** porting into `src/videos/` and passing full repo pipeline gates remains future work.

## Delivery status
- MP4 and source/QA ZIP verified as real files in existing folder #39, no duplicate folder created.
- V1 and V2 retained and not overwritten.
- No release binary committed and no automatic public YouTube upload or Drive sharing.
