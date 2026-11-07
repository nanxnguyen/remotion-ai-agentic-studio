# Laundry Horror V6 — Horror Bold Viral Plus typography review (2026-10-25)

**Status: REVIEW; typography upgrade only.** Selected user option 1: stronger headline motion and emphasis without changing film footage, narration, plot or timing.

## Grounded deliverables
- Verified Drive preview: https://drive.google.com/file/d/1OvVoeQHvp-fj5DQ7AKOSbXyubX1SjY9L/view?usp=drivesdk
- QA 16-scene image: https://drive.google.com/file/d/1DIXccp0II-oilbBZr2Q-Y-m39yRPWUuZ/view?usp=drivesdk
- QA JSON: https://drive.google.com/file/d/1TEWKsffo1WbbjXVFkKmq_0n9jLAmGK_U/view?usp=drivesdk
- Existing film folder #18 (prior versions preserved): https://drive.google.com/drive/folders/1d_Enij2nqNu8FIrt1Bmv4wrTaLeBwxqN

## Visual design
- 16 per-shot kinetic upper headlines, timed to scene beats (not constant movie title).
- Slight slide/pop eased entrance, warm-white setup and coral/red threat emphasis, amber/red micro-phase cues.
- Strong but restrained dark cinematic title region, sharp red corner brackets.
- Native Vietnamese subtitle phrasing follows 16 genuine Vbee original lines and measured starts, shorter phrase exposure for two long beats.
- Opaque lower editorial panel masks text contamination from inherited source frames; previous subtitle ghosting was checked on rendered screenshot.

## Verified technical QA on actual output
- Video 1080×1920, 9:16, 60/1 fps, **3600 frames**, **60.000 seconds**.
- H.264 video + original AAC voice stream, bit-for-bit packet MD5 equality to source: `f361abb76c23733920c8c86c99de7c09` for both.
- FFmpeg full decode error log: **0 bytes**. Rebuilt precise frame timestamps to resolve a duplicate DTS at 30s, then validated full output.
- Uploaded file size **31,612,706 bytes** and parent #18 read back via Google Drive metadata; SHA256: `aa00fa3d280d063c89d61b2f187f98b3acf316aa9068f275f76669db9bfd3b18`.
- Visually inspected 16 actual extracted representative frames including beginning, STOP beat and ending.

**Boundary:** Render executed in FFmpeg with ASS, not canonical Remotion CLI. This is a reviewed **text-style preview**, not full story P0 motion final; original V5/V6 files retained and no publishing or Release performed.
