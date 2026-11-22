---
name: render-video
description: "This skill should be used when the user runs /render-video or asks to \"build the scenes\", \"check the shots\", \"show me a contact sheet\", \"preview the video\", \"render the video\", \"render in 4K / 9:16\", \"re-render after a fix\", or \"export the final MP4\" for an Thanh Hai Learn AI 2D Studio project. It writes or repairs shot code in batches with contact-sheet QC, makes preview clips, runs the full frame-by-frame render, and muxes the final video with sound.\n"
metadata:
  version: "0.5.1"
  author: Thanh Hai Learn AI
---

# /render-video: build, QC, preview and final render

Work inside `thanhhai-2d-studio/` on the active project (`projects/<slug>`; if several exist, ask which one). Shared references are in `../make-2d-video/references/` relative to this skill's base directory. Read `engine-api.md`, `animation-principles.md`, `style-bible.md` and `render-qc.md` before writing or fixing scenes.

Read `config.json` → `lang` first. If it is missing (a project made before this version), ask the user which language the video is in before editing anything, save it to `config.json` → `lang`, and write all on-screen text in that language.

## 1. Build or repair shots (batches of 8–12)
- List what's missing: `node render.mjs --project projects/<slug> --sheet --scale 0.4`. The console lists MISSING shots and shot errors, and `build/sheets/sheet_XX.png` shows one still per shot.
- Write `scenes/sets/*.js` and `scenes/shots/NN_name.js` (`registerShot(id, …)` for each shot id). Study `examples/reaction-time/scenes/` and `examples/motion-lab/scenes/` (v0.3 acting: `act`, lip-sync, squash, follow-through) for working patterns. Every pose change uses `act()`.
- After each batch, re-run `--sheet --scale 0.45` and **open every sheet PNG** plus `--stills` across all 3D (`three-kit`), freeze, POV, and dense-UI timestamps against the QC checklist in `render-qc.md` (specifically checking for `"undefined"` cards, missing panic/boil characters from `NaN` transforms, clipped Vietnamese diacritics, and overhead `sign()` poles intersecting HUDs). Fix and repeat until every shot passes cleanly.
- To check motion, use `--stills t1,t2,t3` (several moments of one shot) or `--from A --to B --scale 0.5` (writes `build/preview.mp4`).

## 2. Preview checkpoint
Run `python tools/shot_lint.py --project projects/<slug>` (0 errors), then render `node render.mjs --project projects/<slug> --from 0 --to 30 --scale 0.5` and send the user the preview, or the contact sheets, before the long render. Mention the expected render time (speed guide in `render-qc.md`: frames = seconds × 24; ~2 frames/s at 720p on a small 2-core CPU, 1080p ~2× slower, 4K ~8× slower, desktops 3–5× faster).

## 3. Final render
- To change resolution or aspect, edit `projects/<slug>/config.json` (`resolution`, `aspect`). Switching aspect needs a fresh sheet review, because 9:16 framing differs.
- Run `node render.mjs --project projects/<slug> --workers 6 --format jpeg --preset veryfast` (`--format jpeg --preset veryfast` speeds up 1440p/4K frame capture ~2.5–3× with `CRF 18` parity). For long renders run in background and poll the log.
- Verify Top HUD outer margin `x >= 52, y >= 36`, `spotTracker` at `y = 92..130`, callouts `>= 30 px` on `>= 92%` dark pills (`y = 162..860`), and `15–20 s` active animated End Screen (`end01..end02`, `notes: "hold"`).
- Motion blur: shots with `"mblur": N` render ≈N× slower; mention it in the ETA. `--mblur N` applies it to every shot (rarely worth it).
- If Playwright cannot download its Chromium (offline or locked-down machines), point it at an installed one: `--chrome /path/to/chrome` or `CHROME_PATH=…`.
- Use fewer workers if memory is tight (about 1–1.5 GB each at 1080p, more at 4K). With no GPU, add `--gl swiftshader` (already the Linux default).
- Output: `build/video_silent.mp4`. If a long `--workers 4` render stops partway, back up completed `build/parts/part_*.mp4` files before running `render.mjs` again (which wipes `build/parts/`), render only the interrupted range with `--from A --to B --out ...`, concatenate with `ffmpeg -f concat -c copy`, and verify the boundary frames.

## 4. Sound, mux and deliver
Make sure the music plan (including `0.02` Silence Drops where scripted) and SFX are set (see `/video-sound`), then run `python audio/mix.py --project projects/<slug>`, normalize `build/mix.wav` with `loudnorm=I=-14.0:TP=-1.0:LRA=7`, and mux cleanly (`out/video-final.mp4`, cleaning any redundant auto-muxed `out/<title>.mp4`). QC: `ffprobe` duration ≈ `story/shots.json` duration, `ebur128` `-14.0 ± 0.4 LUFS`, `-vf "blackdetect=d=1.2:pix_th=0.05,freezedetect=n=-60dB:d=2.5"` + `-af "silencedetect=noise=-45dB:d=2.5"`, extract a 16-frame 4×4 contact sheet of the final MP4 and inspect it with `read_file`. Send the MP4 path/links cleanly to the user.
