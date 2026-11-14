# Rendering, QC and troubleshooting

## Render

**Preview first.** `node render.mjs --project projects/my-video --from 0 --to 30 --scale 0.5` writes `build/preview.mp4`. Watch it (or sample stills). Then send the user a preview or a contact sheet before the long final render.

**Final render:**
```bash
node render.mjs --project projects/my-video [--workers N] [--format jpeg]
python audio/mix.py --project projects/my-video        # builds music + SFX, mixes, muxes -> out/<title>.mp4
```
- Workers default to half the CPU threads (max 8). Each worker is a separate Chromium. Lower the count if RAM is short (about 0.6–1.5 GB per worker at 1080p, more at 4K).
- On machines without a GPU (most Linux servers), Chromium uses SwiftShader (`--gl swiftshader`, the default on Linux). On Windows and macOS desktops the GPU is used (`--gl auto`).
- **Speed guide** (frames = seconds × 24): measured at 720p on a 2-thread cloud CPU, about 2 frames/s, so a 47 s video took about 10 min. 1080p costs ~2× that, 1440p ~3.5×, 4K ~8×. A modern 8-core desktop is ~3–5× faster, and a GPU helps the 3D shots most. Budget accordingly, and for 10-minute videos at 4K plan for a long or overnight render. Long renders should run in the background (`nohup … &` or a separate terminal) while you poll the log.
- `--format jpeg` speeds up capture (~1.5×) with negligible quality loss.
- **Partial re-render after a fix:** re-run the whole video (simple and safe), or render only the changed range with `--from/--to --out build/fix.mp4` and splice it in with ffmpeg if you're comfortable.
- **Final QC:** `ffprobe` duration ≈ the shots.json duration, audio present, then make a contact sheet of the final file with ffmpeg (`-vf fps=1/10,scale=320:-1,tile=6x5`) and look at it.


## QC checklist (run on every contact sheet)
- [ ] No `MISSING SHOT` or red `ERROR` frames, and the console printed no shot errors.
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
