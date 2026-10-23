# Bức Ảnh Thứ Tư — cinematic Vietnamese horror short

**Completed local video:** `buc_anh_thu_tu_VBEE_cinematic_55s.mp4` (55.000 seconds, 720×1280, 24fps, H.264 video / AAC stereo audio, 2,184,588 bytes).

**SHA-256:** `03c5b0fd09dc2197000032af684165960c7b9384bbb2ab34d15ba3416b976113`

**Actual narration:** 10 genuine Vbee Anh Khôi storytelling tracks, synthesized through GitHub Actions run [39936286701](https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/39936286701) and its `buc-anh-thu-tu-vbee-voice` artifact. Each segment is verified via ffprobe, mixed at its scene boundary.

**Artwork:** 10 storyboard frames derived from the user's approved cinematic horror illustration. Artwork, music WAV, render scripts and completed MP4 are contained in the downloadable ChatGPT production ZIP. They **have not been uploaded to this GitHub repository** yet, as the active GitHub connector cannot upload raw binary files.

## Contents tracked in GitHub

- `timeline.json`: ten original voice lines, shot descriptions, captions.
- `scripts/gen-story-vbee-batch.py`: Batch API voice generator, polls request completion, uses GitHub Secrets at runtime.
- `.github/workflows/buc-anh-thu-tu-voice.yml`: reproduces the genuine audio.
- `HANDOFF.md`: outstanding archival / canonical pipeline checks.

## Video archive requirement

The final MP4 must be uploaded to a **draft GitHub Release** to satisfy the user's retention requirement. The host-completed MP4 can be uploaded after download on an authenticated machine:

```bash
scripts/archive-local-final-video.sh ./buc_anh_thu_tu_VBEE_cinematic_55s.mp4 buc-anh-thu-tu
```

The uploader verifies video and audio codecs, creates the draft Release and retrieves the **real video asset URL** after checking file size and digest. Do not invent a GitHub video link before successful upload.

The local render was created with Python/Pillow and FFmpeg, with restrained camera motion, original ambient score, red–gold–white captions, an audio-level limiter and a `55.0s` picture lock. The existing Remotion composition registry was not updated. This is stated explicitly rather than mislabeling the video as an approved canonical Remotion build.
