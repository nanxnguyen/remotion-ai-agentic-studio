# Render evidence — tiec-nguoi-hay-nam-thang

Raw evidence for the final MP4 `out/tiec-nguoi-hay-nam-thang-thanh-long-nang-cao-reel.mp4`.

## Fingerprint (from `status.json.render_check`)

| field | value |
|---|---|
| fingerprint (size:mtime) | `3485059:1792232389887885600` |
| sha256 | `e4172513ccbc3105af082526aea8b4d488df2da1ee9f79b794e7964a7fbf3f5a` |
| md5 | `00d69266374e9e12ae0c1e9dc5997fad` |
| size | 3,485,059 bytes |
| duration | 47.40 s |
| checked at | 2026-10-17T17:19:51+07:00 |

Gate C review is bound to this fingerprint (`video-review.md`, `render_fingerprint` field).

## ffprobe stream info

```
codec_name=h264  codec_type=video  width=1080  height=1920  r_frame_rate=30/1
codec_name=aac   codec_type=audio  sample_rate=48000  channels=2
```

## Loudness (ffmpeg ebur128, via `pipeline.py render`)

- Integrated: **−13.9 LUFS** (target −14 ±1)
- True peak: **−1.9 dBFS**
- LRA: 2.6
- No clipping.

## Render path

`pipeline.py render` → remotion render → loudness normalise (−14 LUFS) → verify (H.264/AAC/
1080×1920/30 fps) → atomic replace. Duration window enforced with `--min-seconds 40 --max-seconds 60`.