# Mix plan — tiec-nguoi-hay-nam-thang

Stage evidence: `audio` done.

## Source layout

- 8 voice clips (s1–s8) mounted as `<Audio>` tracks in `src/videos/tiec-nguoi-hay-nam-thang/Reel.tsx`,
  ordered s1→s8 at the frame offsets given by `timeline.ts`.
- **Voice-only mix** — no BGM, no SFX. Required by the brief (illustrative story profile; a music bed
  was judged non-blocking and no licensed asset ships in the repo). Judged acceptable for this
  story-reel tone (audio-review ticket A-3, Thấp).

## Timing

- Each Sequence duration = ceil(measured_clip_seconds × 30) + semantic hold frames, so **no clip is
  cut** and gaps are intentional narrative silence, not audio dropouts.
- Total = **1422 frames = 47.40 s** (voice 37.492 s + holds), inside the 45–60 s target.
- Final beat: **60-frame (2.0 s) closing hold** after s8 (Gate A ticket A-C7).

## Loudness / delivery

- Normalised through `pipeline.py render` to **−14 LUFS** integrated (measured −13.9 LUFS, peak
  −1.9 dBFS, LRA 2.6 — no clipping).
- Container: AAC, 48 kHz, stereo.

Audio gate recorded by an independent `audio-reviewer` — see `audio-review.md`.