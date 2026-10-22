# Bắt đầu lại sau một mối quan hệ dài — WORK IN PROGRESS

This folder hands off a new story video for the repository's canonical 9:16 Remotion pipeline. **It does not contain a finished video or any valid pipeline approvals.**

## What is included

- `brief.md`: thesis, three opening hooks, original motif, audience, source limits.
- `script.md`: proposed narration, visual directions, provisional 37-second preview slots (not measured TTS).
- `voice.json` and `voice-performance.json`: six narrative segments, first-person voice plan.
- `HANDOFF.md`: ordered steps to generate the real Thanh Long voice, recreate the video in Remotion, execute every mandatory independent gate, and deliver the final verified MP4.
- `scripts/voiceover_preview_thanh_long.py`: **optional** interim step that adds real verified voice clips to a separately provided 37-second FFmpeg preview; it is **not** the Remotion build, and deliberately refuses to truncate narration.
- `scripts/test_voiceover_preview_thanh_long.py`: contract tests for the interim helper.

## Quick check

```bash
python3 -m unittest scripts.test_voiceover_preview_thanh_long
python3 scripts/voiceover_preview_thanh_long.py --help
```

## Interim voiced preview (requires the local voice environment)

```bash
python3 scripts/voiceover_preview_thanh_long.py \
  --repo . --preflight \
  --video /path/to/bat-dau-lai-sau-moi-quan-he-dai-preview.mp4

python3 scripts/voiceover_preview_thanh_long.py \
  --repo . --python ~/.venvs/vieneu/bin/python \
  --video /path/to/bat-dau-lai-sau-moi-quan-he-dai-preview.mp4 \
  --output /path/to/bat-dau-lai-sau-moi-quan-he-dai-thanh-long-nang-cao-voiced-preview.mp4
```

The **source preview must be supplied separately** from the earlier conversation. Do not commit the private sample, generated MP3s, user media, MP4 or QA files.

## Final canonical release

Follow [HANDOFF.md](HANDOFF.md) **from Phase 0**, then deliver only the `pipeline.py render` verified `out/bat-dau-lai-sau-moi-quan-he-dai-thanh-long-nang-cao-reel.mp4`. Until then PR remains **Draft**.
