# Audio assets manifest — dung-bien-tuoi-30-thanh-ban-an

Phase 3b audio packet · profile `story` · measured 2026-10-18 with `ffprobe` and FFmpeg `volumedetect`.

## BGM

| File | Duration | Format | Mean / peak | Origin | Licence |
|---|---:|---|---|---|---|
| `public/audio/dung-bien-tuoi-30-thanh-ban-an/bgm.mp3` | 56.43s | MP3, 44.1 kHz stereo | −22.6 / −10.1 dB | Deterministic synthesis via `python3 -I scripts/gen-bgm-soft.py ... 56` (C–Am–F–G pad + soft arpeggio, 72 BPM source pulse, fades) | Original project synthesis; no third-party audio |

The video is voice-timed and intentionally does not consume a beat grid. See `analysis/no-beat-sync.md`.

## SFX

All SFX below are copied from the vendored `skills/video-shotcraft/assets/audio/` library. The library attribution records these as Mixkit Sound Effects Free License, free for commercial use without attribution; the source URL is recorded here for auditability.

| Delivery file | Source file | Duration | Mean / peak | Source / licence |
|---|---|---:|---|---|
| `sfx-pencil-write.mp3` | `sfx/text/pen-write-paper.mp3` | 1.47s | −26.0 / −7.0 dB | Mixkit “Pen writing on paper”; https://assets.mixkit.co/active_storage/sfx/2367/2367-preview.mp3; Mixkit SFX Free License |
| `sfx-paper-slide.mp3` | `sfx/paper/paper-slide.mp3` | 1.09s | −32.5 / −0.5 dB | Mixkit “Paper slide”; https://assets.mixkit.co/active_storage/sfx/1530/1530-preview.mp3; Mixkit SFX Free License |
| `sfx-plate-slide.mp3` | `sfx/glass/glass-plate-slide.mp3` | 1.13s | −26.9 / −11.0 dB | Mixkit “Glass plate slide”; https://assets.mixkit.co/active_storage/sfx/1527/1527-preview.mp3; Mixkit SFX Free License |
| `sfx-pen-drop.mp3` | `sfx/impact/hit-weak.mp3` | 0.59s | −22.4 / −5.6 dB | Mixkit “Weak hit impact”; https://assets.mixkit.co/active_storage/sfx/2148/2148-preview.mp3; Mixkit SFX Free License |
| `sfx-macro-zoom.mp3` | `sfx/camera/zoom-air-fast.mp3` | 1.28s | −19.5 / −1.1 dB | Mixkit “Fast air zoom”; https://assets.mixkit.co/active_storage/sfx/2625/2625-preview.mp3; Mixkit SFX Free License |
| `sfx-feed-swipe.mp3` | `sfx/paper/paper-move-quick.mp3` | 0.90s | −28.6 / −1.8 dB | Mixkit “Paper quick movement”; https://assets.mixkit.co/active_storage/sfx/2380/2380-preview.mp3; Mixkit SFX Free License |
| `sfx-paycheck-notify.mp3` | `sfx/ui/ui-message-pop.mp3` | 1.06s | −31.7 / −3.2 dB | Mixkit “Message pop alert”; https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3; Mixkit SFX Free License; allowed here because the on-screen notification is the system speaking |
| `sfx-paper-wind.mp3` | `sfx/paper/paper-wind-blow.mp3` | 5.50s | −19.6 / −1.0 dB | Mixkit “Wind blowing papers”; https://assets.mixkit.co/active_storage/sfx/2652/2652-preview.mp3; Mixkit SFX Free License |

`sfx-paper-wind.mp3` is longer than five seconds; every use is explicitly truncated with `durationInFrames` in the cue plan. No added file is below the −12 dB peak threshold after the final source selection.

## Scope note

Voice clips are owned by `voice-agent` and were not edited or re-encoded by this phase. No fonts, images, credentials, or generated MP4s were added.
