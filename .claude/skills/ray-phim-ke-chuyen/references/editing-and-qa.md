# Existing-video voice edits and QA

## Scope precedence

When a user says **“Ở trên có Video rồi chỉ bổ sung voice”**, treat it as VOICE_ONLY. Keep all frames, titles, image order, transitions, FPS, geometry, color treatment and duration unchanged. Editing a spoken sentence touches narration and possibly audio ducking. Distinguish burned-in captions (must remain unchanged unless allowed) from live Remotion subtitles (can be fixed in source when requested). Never rebuild pictures without consent.

## Editing sequence

1. Probe the source: duration, streams and video codec. Snapshot hash and file reference.
2. Obtain exact approved transcript, scene start times/durations and source Vbee tracks. If removing a line, update transcript manifest first and generate only changed TTS file.
3. Measure per-scene speech with FFprobe. Require every audio file exists and spoken tail fits before its slot ends; if not, shorten text/correct segmentation rather than clip.
4. If original MP4 has an inseparable voice+music mix, **exclude entire old audio track** to prevent doubled narration. Mix optional **separate** licensed/owned BGM/SFX source under new Vbee speech. Say explicitly when no separate BGM is available; do not pretend soundtrack is retained.
5. Run `scripts/replace_narration.py --video <original.mp4> --manifest <storyboard.json> --audio-dir <vbee-clips> --output <final.mp4> [--bgm <original_bgm.wav>]`. This copies the video stream (`-c:v copy`) with no visual re-encode. It will stop on out-of-slot audio.
6. Run `scripts/verify_video.py --original <original.mp4> --video <final.mp4> --must-have-audio` to verify video packet MD5 equality plus AV metadata. This is a technical check, not a substitute for listening.
7. Listen to the final MP4, including the new last line and its tail, check against subtitles, inspect end fade, peaks and obvious clipping; only then declare finished. If audio cannot be auditioned, report that limitation accurately.

## Audio quality

Target voice clearly above BGM (typically music at ~8–15% gain depending on material); avoid vocals competing with narration. Check first 3s, each scene boundary and the last 5s. Normalize/limit without changing voice identity unnaturally. A correct waveform/stream cannot prove natural narration; require actual listening when available.

## Final handoff

Provide actual verified output path/link, what changed, exact voice provider and source, measured duration/fps/dimensions, whether BGM was preserved/replaced/omitted, and evidence. Do not claim full QA based solely on successfully launching GitHub Actions. Never publish/share video publicly by default.
