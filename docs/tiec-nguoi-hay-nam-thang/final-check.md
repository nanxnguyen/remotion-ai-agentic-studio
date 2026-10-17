# Final check — tiec-nguoi-hay-nam-thang

Stage evidence: `render` done. Output: `out/tiec-nguoi-hay-nam-thang-thanh-long-nang-cao-reel.mp4`.

## Verification (via `pipeline.py render`, exits 0)

| property | value | target | result |
|---|---|---|---|
| Duration | 47.40 s (1422 frames) | 45–60 s | ✓ |
| Video codec | H.264 | h264 | ✓ |
| Resolution | 1080×1920 | 1080×1920 | ✓ |
| Frame rate | 30 fps | 30 | ✓ |
| Audio codec | AAC, 48 kHz, stereo | AAC | ✓ |
| Integrated loudness | −13.9 LUFS | −14 ±1 | ✓ |
| Peak | −1.9 dBFS | < 0 (no clip) | ✓ |

## Compliance

- `pipeline.py check` → **exit 0 / ready**.
- All review gates recorded and valid (`status.json.review_valid` all `true`): A 9.1 · content 9.0 ·
  audio 9.0 · D 9.0 · E 9.0 · B 9.0 · C 9.0.
- `tsc --noEmit` clean; `pipeline.py render` normalised + verified the final MP4.

See `render-evidence.md` for the fingerprint/stream/loudness raw evidence.