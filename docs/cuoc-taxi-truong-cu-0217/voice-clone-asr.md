# Vbee ASR / Text Fidelity Review

**Status: PENDING — no independent ASR transcript tool was run.**

Machine checks completed:
- 23 actual Vbee MP3 files exist.
- All 23 files decode without FFmpeg errors.
- FFprobe durations match the Vbee measured manifest within 30 ms.
- SHA-256 matches all 23 manifest entries.

Not verified:
- Exact ASR text against each requested utterance.
- Vietnamese pronunciation, names (“Quân”, “Linh”), number reading, and punctuation pauses.
- Human listening for clipped syllables, breath artifacts, emotional consistency and voice continuity.

Do not mark voice clone/ASR QA passed until a separate ASR or human listening pass is recorded.
