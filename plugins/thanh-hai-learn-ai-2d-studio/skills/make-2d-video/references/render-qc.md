# Rendering, QC and troubleshooting

## Render

**Preview first.** `node render.mjs --project projects/my-video --from 0 --to 30 --scale 0.5` writes `build/preview.mp4`. Watch it (or sample stills). Then send the user a preview or a contact sheet before the long final render.

**Final render (1440p recommended for YouTube 16:9 VP9/AV1 bitrate):**
```bash
node render.mjs --project projects/my-video --workers 6 --format jpeg --preset veryfast
python audio/mix.py --project projects/my-video        # builds music + SFX, mixes, muxes -> out/<title>.mp4
ffmpeg -y -i projects/my-video/build/mix.wav -af "loudnorm=I=-14.0:TP=-1.0:LRA=7" -ar 48000 projects/my-video/build/mix_norm.wav && mv projects/my-video/build/mix_norm.wav projects/my-video/build/mix.wav
```
- `--format jpeg --preset veryfast` speeds up 1440p capture **~2.5–3×** with `CRF 18` visual parity; re-mux cleanly after normalizing `build/mix.wav` (`ebur128` verified `-14.0 ± 0.4 LUFS`, `TP <= -1.0 dBTP`) and delete any stale auto-generated `out/<title>.mp4` if exporting a custom filename like `out/video-final.mp4`.
- **Safe Margins & Typography Floor (16:9 `1920×1080` logical):** keep outer HUD margins **`x >= 52, y >= 36`**, centered `spotTracker()` at **`y = 92..130`** below `spotLabel` (`y = 36..84`), upper callouts starting at **`y >= 162`**, minimum callout text size **`>= 30 px`** (`weight 900`, `stroke >= 4.5 px`) on **`>= 92%` dark pill backing**, all scene graphics ending at **`y <= 860`**, and captions isolated at `y >= 940` over `subtitleScrim()`.
- Workers default to half the CPU threads (max 8). Each worker is a separate Chromium. Lower the count if RAM is short (about 0.6–1.5 GB per worker at 1080p, more at 4K).
- On machines without a GPU (most Linux servers), Chromium uses SwiftShader (`--gl swiftshader`, the default on Linux). On Windows and macOS desktops the GPU is used (`--gl auto`).
- **Speed guide** (frames = seconds × 24): measured at 720p on a 2-thread cloud CPU, about 2 frames/s, so a 47 s video took about 10 min. 1080p costs ~2× that, 1440p ~3.5×, 4K ~8×. A modern 8-core desktop is ~3–5× faster, and a GPU helps the 3D shots most. Budget accordingly, and for 10-minute videos at 4K plan for a long or overnight render. Long renders should run in the background (`nohup … &` or a separate terminal) while you poll the log.
- `--format jpeg` speeds up capture (~1.5×) with negligible quality loss.
- **Partial re-render & crash recovery (long videos):** `render.mjs` clears `build/parts/` on startup. If a long `--workers 4` render stops with completed chunks (`part_001..003.mp4` passing `ffprobe`), back up the valid `part_*.mp4` files outside `build/parts/` first, render ONLY the missing range (`node render.mjs --project P --from A --to B --workers 4 --crf 18 --out build/parts_saved/part_000.mp4`), concatenate with `ffmpeg -f concat -safe 0 -i list.txt -c copy -movflags +faststart build/video_silent.mp4`, and visually inspect 3 boundary frames around the splice timestamp (`--stills`).
- **Final Media QA (mandatory on every final MP4):**
  - Verify `ffprobe` format duration, H.264/AAC streams, and zero black/freeze/silence glitches:
    `ffmpeg -i out/video-final.mp4 -vf "blackdetect=d=1.2:pix_th=0.05,freezedetect=n=-60dB:d=2.5" -af "silencedetect=noise=-45dB:d=2.5" -f null -`
  - Extract a 16-frame 4×4 contact sheet of the final muxed MP4 (`ffmpeg -y -i out/video-final.mp4 -vf "fps=16/<dur>,scale=480:270,tile=4x4" -frames:v 1 build/final_mp4_qa.png`) and open it (`read_file`) to confirm clean subtitles, HUDs, and compositing.
  - When delivering a v2 revision for A/B comparison against v1, preserve `video-final.mp4` (v1) alongside `video-final-v2.mp4` / `thumbnail-youtube-v2.png` unless replacement is requested.

## QC checklist (run on every contact sheet + `--stills` on 3D/POV/freeze)
- [ ] No `MISSING SHOT` or red `ERROR` frames, and the console printed no shot errors (`node --check` + `shot_lint.py --strict` pass with 0 errors).
- [ ] **No `"undefined"` stat rows, vanished boil/panic characters, or clipped bold labels:** verify every `dangerCard` shows real numbers, characters remain visible in `panic`/`boil` frames (no `NaN` from calling `rng(seed)` without `()`), and Vietnamese diacritics fit cleanly inside `pill`/`stamp` borders (`measure()`).
- [ ] **Zero HUD/pole/map collisions:** `sign()` posts never overlap top HUDs/clocks; map overlays match the named geography; captions read cleanly over bright floors (`"bars": "none"` + `subtitleScrim`).
- [ ] **3D & POV check:** inspect full-res `--stills` for every `kind: '3d'` shot (well-lit sculpted geometry, non-overlapping 2D `overlay`), `freeze`, and `POV` shot before starting a long final render.
- [ ] Each picture matches its `line`, and the key action lands on the key word.
- [ ] Actions use `act` (anticipation, arcs, overshoot), not plain pose slides; landings/hits squash; hair and coat tails follow through; expressions change on the beat (`exprAt`). Check with `--stills` a few frames apart around each action.
- [ ] Talking characters are lip-synced (`viseme`), the narrator is not. Medium shots and closer show `hands` that match the gesture.
- [ ] The first 3 s open on the strongest picture (no logo/intro); `python tools/shot_lint.py --project …` reports 0 errors.
- [ ] Characters are readable: rim light present, staged against brighter areas, not cut off at the edges, not overlapping text.
- [ ] Outfits and screen direction are consistent within a scene, and every character has a contact shadow or is grounded.
- [ ] Moody value structure (mostly dark, 1–3 bright accents), not flat or washed out, and colours come from the mood/style.
- [ ] Every shot has camera motion and some atmosphere (dust/rain/particles/glows).
- [ ] Text is short, inside the safe area, and legible at phone size. Numbers match the narration.
- [ ] All on-screen text is in the video language (`config.json` → `lang`), spelled correctly, with every accent/diacritic drawn in the same font (no fallback-font letters or missing marks). Zoom into a still with text to check.
- [ ] Variety: no more than 3 consecutive shots of the same type or framing, with close-ups and inserts sprinkled in.
- [ ] 9:16: subjects in the middle, nothing important under the captions.
- [ ] Audio: voice clear, music ducked, no SFX pile-ups, final loudness about −14 LUFS.

## Troubleshooting
- **Fonts look like serif defaults** → the `@fontsource` packages are missing. Run `npm install` in thanhhai-2d-studio.
- **`Player failed to boot`** → read the message. Usually it's a JSON syntax error in shots.json/config.json or an import path in a scene. Scene import errors are listed at the end of a render.
- **WebGL or 3D shot black** → add `--gl swiftshader`, and check the console for Three.js errors (a misspelt builder or a missing `return {stage}` in init).
- **Out of memory or crashes at 4K** → use `--workers 1` or `2`, and avoid huge blur amounts on 4K (blur cost scales with resolution).
- **Whisper slow** → use `--model base`. **Script match < 90%** → the wrong script or audio. Ask the user.
- **The video is longer or shorter than the audio** → `story.duration` must equal the last shot's `end`. Re-run `beats.py --force` or fix by hand.
- **PyAV/`av` errors from faster-whisper** → the tools decode audio with ffmpeg themselves, so just ensure ffmpeg is on PATH.
- **Windows paths** → quote paths with spaces. Use `python` (or `py -3`) instead of `python3`.
