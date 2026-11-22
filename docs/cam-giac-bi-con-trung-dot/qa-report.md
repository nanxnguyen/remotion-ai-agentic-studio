# QA — Cảm giác bị côn trùng đốt (2026-11-14)

## Build
- Kit: Thanh Hai 2D studio (`out/thanhhai-2d-studio`, untracked), project `projects/cgbcd`. Source of the scenes: [scenes/cgbcd.js](scenes/cgbcd.js); timeline: [build_timeline.py](build_timeline.py).
- Voice: Vbee `hn_male_thanhlong_talk_48k-fhg`, speed 1.06, 49 clips from workflow run 43574996558 (`cam-giac-bi-con-trung-dot-vbee.yml`).
- Vbee pads ~0.55 s at every comma/period and clip end. `build_timeline.py` shortens internal pauses to 0.24 s and clip edges to 0.04 s (speech samples untouched): raw 235 s of clips → 205.6 s video.

## Checks on the final MP4
| Check | Result |
|---|---|
| Streams | H.264 1920×1080 24 fps + AAC 48 kHz stereo |
| Duration | 205.6 s (3:25.6), target 3–4 min |
| Loudness | −14.3 LUFS integrated (target −14) |
| Silence | no gap > 2 s at −45 dB |
| Voice over music | Whisper medium on the full mix (0:24, 2:00, 2:56) recovers the script nearly verbatim |
| Pictures | contact sheet 1 frame / 10 s: every shot drawn, no MISSING/ERROR frame, tally 0 → 6 |
| shot_lint | 0 errors; warnings: c00 is one 6.2 s shot (picture and text change at 0.3 s and 4.2 s), z99 10.1 s CTA, median shot 4.6 s |

## "ong" heard as "ông"
Whisper medium and large-v3 transcribe several "ong" as "ông". Two auditions (runs 43584069676, 43585267330):
- three settings (Thanh Long 1.06, Thanh Long 0.95, Phú Thắng 1.06) are all heard as "ông" by large-v3;
- a minimal pair synthesised with the production voice gives different audio for "ong" vs "ông" (DTW log-spectral distance 3.3 / 4.2 vs 8.8 between different sentences), and in the cleanly measured pair F1 of "ong" ≈ 870 Hz vs "ông" ≈ 650 Hz (open /ɔ/ vs close /o/).

Conclusion: Vbee pronounces "ong" distinctly; the error is the ASR's bias on Hanoi "ong". Not re-generated. A human listen of 1:42 ("ong săn nhện") and 2:56 (recap) is still the final word.

## Not done
- Gate A round 2 on script v2 (round 1 = 7.9, revise; all tickets addressed in v2 but not re-scored).
- Google Drive delivery: the connected Drive account cannot see `Videos-shorts` (`1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`); files are staged in `out/cgbcd-final/`.
