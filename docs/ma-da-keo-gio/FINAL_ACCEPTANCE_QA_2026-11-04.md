# Ma Da Keo Gio — V3 final acceptance QA (2026-11-04)

## Accepted scope

- **Final-quality gate explicitly changed by the owner:** realistic continuous character acting / natural full-body animation is **NOT REQUIRED** for this film.
- Preserve the established visual style, cinematic still-asset moves, the approved 60-second edit and the exact Vbee voice code.
- QA scope is picture legibility and visual narrative, authentic narration, audio timing/mix, captions and technical playback of the whole file.
- This is an **existing V3 voice-only revision**, not a new full-motion video.

## Verified output

- Source local filename: `MA_DA_KEO_GIO_VBEE_NGAN_V3.mp4`
- Google Drive file: [video-final.mp4](https://drive.google.com/file/d/1jV5k1YnXpYKhgzsNN_oED_gnMfyim-_c/view?usp=drivesdk)
- Drive folder: [48. Ma Da Kéo Giò - 2026-11-04](https://drive.google.com/drive/folders/1M2Xwj2XFQHrFfsmRc8kDE7cbcnQG3DUQ)
- MP4 SHA-256: `4c419b0fa9f12c288a165a6bce2a100834d37fa015ff2a7ed610d186896435cb`
- Size: 2,930,452 bytes
- H.264, 1080x1920, exactly 60.000 s, 30 fps, 1,800 decoded video frames; AAC stereo 48 kHz.
- Whole-file FFmpeg decode: **PASS**, no reported decoding errors in either the video stream or audio stream.
- H.264 bitstream copied unchanged from V2; SHA-256 (video stream only): `e57eec9a5a9b053b5b948a84f7f738344d1d49bfcbd372eb69936c7c9c79fec5`.

## Picture and typography QA

- Reviewed 28 distributed screen captures, 0.5 through 59.3 seconds; reviewed mobile-sized samples around 1.3, 16.7, 34.7, 48.5 and 59.0 s.
- Verified key visual beats: ghost hand gripping hull; Lợi reaction, Mekong canal; female hand with red thread; grandmother warning; paddle rescue; ankle grasp; fall to water; boat scene; red thread transfer; three knocks and boat departing.
- Text sampled at hook, the red-thread clue, the twist and the outro: legible Vietnamese characters, consistent title/caption style, no observed image corruption, blank cut or unexpected render badge.
- The edit uses a large dark typographic layout with the scene image positioned in a central band. This is an intentional stylization accepted under the owner's motion waiver, not a moving-actor quality failure.
- This is sampled-frame review plus complete decode, **not** uninterrupted subjective playback inspection.

## Audio QA

- 15/15 authenticated Vbee Batch MP3 source files verified by SHA-256 and original voice code `n_hn_male_ngankechuyen_ytstable_vc`.
- Each original utterance was independently compared with the MP4 soundtrack around its intended start. All 15 were detected (normalized correlation approx. 0.993–1.000, alignment error within ~0.1 ms).
- Source lines match the picture's originally approved caption transcript; audio clips were placed entirely before the 60 s boundary.
- FFmpeg whole-track integrated loudness: approx. **-18.1 LUFS**, sample peak **-0.7 dBFS**, loudness range **5.7 LU**.
- At native 48 kHz, no samples > 0 dBFS; no clipping detected. A short low-level fade after about 59.2 s is consistent with the planned final tail.
- Objective QA cannot verify pronunciation nuance, subjective emotional delivery, ambience loudness by ear, or whether the 60-second film feels compelling in uninterrupted human viewing.

## Verdict

**Technical media QA: PASS. Visual keyframe / continuity QA: PASS at sampled beats. Voice provenance and timing QA: PASS.**

**Subjective full listening / uninterrupted playback evaluation: NOT INDEPENDENTLY PERFORMED in this environment.** Do not claim a human review pass that has not happened. The present V3 video can be used as the final **technical export** under the owner's approved no-natural-acting requirement, while subjective viewing/listening sign-off remains separate.

No re-render required by the objective tests. Do not auto-publish to YouTube or change Drive sharing.
