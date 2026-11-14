---
name: make-2d-video
description: "This skill should be used when the user wants a narrated animated video in the Thanh Hai Learn AI 2D style (cinematic stick figures with rim light, moody 2.5D sets, giant face close-ups, freeze-frames, data overlays, blueprint diagrams and low-poly 3D shots), e.g. \"make a 2D video from this voiceover\", \"animate my script\", \"turn this narration into a stick figure video\", \"make a What If video\", \"create an animated explainer from my audio\", or \"do the whole video\", and Vietnamese requests such as \"làm video 2D\", \"làm video người que\", \"dựng video hoạt hình từ giọng đọc\", \"làm video What If\". It runs the full pipeline: install, timestamps (Whisper), story breakdown, style choice, scene building, rendering, music, SFX and final MP4 in 16:9 or 9:16 at 720p to 4K.\n"
metadata:
  version: "0.5.0"
  author: Thanh Hai Learn AI
---

# Thanh Hai Learn AI 2D Studio: full video pipeline

Turn a voiceover (plus an optional script) into a finished MP4 where every frame is drawn by code (HTML canvas + Three.js), captured frame by frame in headless Chromium and encoded with ffmpeg. No image or video generation models are used, so characters stay consistent and text stays crisp. Invent the visuals fresh for every script; only the style is fixed.

**Bundled resources (this skill's base directory):**
- `kit/`: the tested studio (renderer, engine, tools, audio, the `examples/reaction-time` and `examples/motion-lab` reference projects, tests). Install it into the workspace as `thanhhai-2d-studio/` (see `references/install.md`).
- `references/install.md`: install, dependency table, doctor, self-test.
- `references/animation-principles.md`: **the motion** (v0.3): anticipation, arcs, overshoot, follow-through, squash & stretch, holds, lip-sync, hands, twos/boil, motion blur, with recipes. Read it before writing any shot with characters.
- `references/style-bible.md`: **the look** (characters, sets, light, camera, editing, graphics, 9:16 rules, don'ts). Read it fully before designing any shot.
- `references/story-breakdown.md`: writing `story/bible.md` and `story/shots.json`, plus pacing rules.
- `references/engine-api.md`: the scene API, config and shots.json schemas, and the three-kit reference.
- `references/sound-design.md`: the music plan, SFX library, ambience and levels.
- `references/render-qc.md`: preview and final render, speed guide, QC checklist, troubleshooting.

For "Evolution of X" videos (a life, a species, an object through its stages), use the `evolution-video` skill; for funny explainers hosted by an animal mascot ("what it's like to…", Dumb Doggo-style), use `mascot-explainer`. Both share this kit. Stage commands from this plugin re-run one stage: `/new-video` (stages 1–4), `/video-styles` (5), `/render-video` (6 and 8), `/video-sound` (7). When running end to end, follow this file and load references as each stage needs them.

## Golden rules
0. **Ask the video language first.** Before any other question, install, file or edit, ask the user which language the video is in (Stage 0). Every later step uses that language. Talk to the user in the language they write in.
1. **Keep the narration intact.** Never rewrite, add, drop or reorder spoken words. Every shot illustrates the words spoken while it is on screen.
2. **Same style, new pictures.** Invent sets, props, characters and actions from this script. Use `examples/reaction-time` and `examples/motion-lab` only to learn the API.
2b. **Characters act, they don't slide.** Every pose change uses `act()` (anticipation → arc → overshoot → settle); landings squash, hair follows through, faces change on the beat, talking characters are lip-synced. See `references/animation-principles.md`.
3. **Show what is said, literally and specifically.** Abstract lines become visual metaphors, diagrams or close-up reactions.
4. **Draft, look, fix, then render.** Open contact sheets and stills yourself (read the PNGs) before any full render. Rendering is slow; looking is fast.
5. **Three user checkpoints:** setup choices, style choice from rendered samples, and the preview before the final render. If the user is away, take the defaults, state what was assumed, and continue.
6. **Files are the truth.** Each video lives in `thanhhai-2d-studio/projects/<slug>/`, and `story/shots.json` owns all timing.

## Stage 0: Video language (always first)
Before asking anything else, creating files, installing or editing, ask exactly one question in the user's language, for example: **"Video này dùng ngôn ngữ nào? (ví dụ: Tiếng Việt, English, 日本語…)"**. Use AskUserQuestion when available. Wait for the answer, then map it to an ISO 639-1 code (`vi`, `en`, `ja`, `ko`, `es`, `pt`, `de`, `fr`, `hi`, …). If the user already named the video language earlier in this conversation, confirm it in one line instead of asking again.

The language code drives the whole pipeline:
- `--lang <code>` on `tools/new_project.py` (stored in `config.json` → `lang`). `tools/transcribe.py` reads it from the config.
- **All on-screen text** (title cards, labels, units, signs, chart captions, burned-in captions) is written in this language, short and correctly spelled with full diacritics. Never translate or change the spoken narration.
- Fonts: the renderer loads latin, latin-ext and Vietnamese glyphs; for `vi` the title font switches to Nunito automatically so accents render in one consistent font. For scripts the bundled fonts don't cover (Japanese, Korean, Chinese, Arabic, Hindi, Thai…), tell the user and check text stills carefully during QC.

## Stage 1: Intake
After the language is known, ask once (AskUserQuestion when available) for:
- **Voiceover file** (required).
- **Script:** timestamped (SRT/VTT/JSON/TXT with `[mm:ss]`), plain text (best: aligned to the audio, keeping exact wording), or none (transcribed).
- **Aspect:** 16:9 or 9:16.
- **Resolution:** 720p / 1080p (recommended) / 1440p / 2160p (4K). Mention that higher resolutions take much longer to render.
- **Captions:** default on for 9:16, off for 16:9.
- **Music:** generated, the user's own file, or none. **SFX:** on or off.
- **Title.**

Don't ask about style yet. Defaults: 16:9, 1080p, 24 fps, generated music + SFX, style `dusk`.

## Stage 2: Install or check the studio
Follow `references/install.md`: copy `kit/` to `thanhhai-2d-studio/` in the workspace (skip if already present), install dependencies, run `python tools/verify_kit.py` and `python tools/doctor.py`, then run the example self-test. Report what was installed in one short list.

## Stage 3: Project + timeline
Run inside `thanhhai-2d-studio/`. Use `python3` where `python` isn't Python 3.
```bash
python tools/new_project.py --name <slug> --voice "<voiceover path>" [--script "<script path>"] --aspect 16:9 --resolution 1080p --title "<title>" --lang <code> [--captions]
```
- Timestamped script: `python tools/parse_script.py --project projects/<slug> --script projects/<slug>/input/script.<ext>`
- Plain script: `python tools/transcribe.py --project projects/<slug> --script projects/<slug>/input/script.txt --lang <code> --model small`. The match must be ≥ 90%; if it's lower, tell the user the script and audio differ.
- No script: `python tools/transcribe.py --project projects/<slug> --lang <code> --model small` (`base` on slow machines, `large-v3` for hard audio).

Check `timeline/transcript.txt` (its end should be near the voiceover length), then run `python tools/beats.py --project projects/<slug>` to get the beat sheet and a draft `story/shots.json`, and `python tools/visemes.py --project projects/<slug>` to build the lip-sync mouth shapes (`timeline/visemes.json`).

## Stage 4: Story breakdown
Read `references/style-bible.md` and `references/story-breakdown.md`. Write `story/bible.md` (logline, cast with one signature colour each, locations with moods and key lights, motifs, music plan). Write `scenes/cast.js`. Rewrite `story/shots.json`: contiguous shots, cut on phrase boundaries 0.1–0.2 s early, a median of 2–3.5 s, an establishing shot per new location, a `size` and a concrete `scene` description for each, and a hook in the first 3 s (most striking picture first, no logo/intro). Run `python tools/shot_lint.py --project projects/<slug>` and fix every error. Send the user a 5–10 line plan summary and continue unless they object.

## Stage 5: Style choice
Build the 1–2 most-used sets plus 3 representative shots (a wide shot with ≥ 2 characters, a `bigFace` close-up, a data/blueprint or 3D shot). Then render:
```bash
node render.mjs --project projects/<slug> --styles dusk,midnight,golden,neon,storybook --at <t1>,<t2>,<t3> --scale 0.5
```
Open `build/styles/style_grid.png`, then show it with one line per style: **dusk** (mauve shadows, amber key, cream rim), **midnight** (cold navy, blue-white rims, sodium practicals), **golden** (warm orange and teal), **neon** (deep blacks, magenta and teal), **storybook** (soft pastel, low contrast). Save the pick in `config.json` → `style`. For tweaks, add a custom entry to `STYLES` in `engine/styles.js` (moods overrides plus the `grade` lift/gamma/gain, sat, contrast, vignette, grain, bloom) and re-render that row.

## Stage 6: Build every shot
Read `references/engine-api.md`, `references/animation-principles.md` and the example scenes in `examples/reaction-time/scenes/` and `examples/motion-lab/scenes/` once. Work in batches of 8–12 shots:
1. Write `scenes/sets/<location>.js` (reusable, anchored to `GY = E.H * V(0.8, 0.68)` and `CX = E.W/2`, with walls, floor and sky extended past the frame) and `scenes/shots/NN_<name>.js` with `registerShot('<id>', {...})` for the ids in shots.json.
2. Run `node render.mjs --project projects/<slug> --sheet --scale 0.5`. Open every `build/sheets/sheet_XX.png` and check it against the QC checklist in `references/render-qc.md`. Fix any MISSING shots, errors printed by the renderer, and composition problems.
3. Check motion with `--stills t1,t2,t3` a few frames apart around each action (anticipation, overshoot, landing), or `--from A --to B --scale 0.5` (writes `build/preview.mp4`).

Non-negotiables from the style bible:
- Rim light on every lit figure.
- `act()` for pose changes, `exprAt` for faces, `viseme` for quoted lines, `hands` from medium shots up (animation-principles.md).
- Colours from `mood()`/`S()`.
- A camera move in every shot.
- Atmosphere (dust, rain, glows).
- Moody value structure.
- Graphics synced to words with `wordTime()`.
- `V()` for every aspect-dependent value.
- No `Math.random`/`Date.now`.

## Stage 7: Sound
Read `references/sound-design.md`. Fill `story/shots.json` → `music` (contiguous mood sections) and add per-shot `sfx` cues and `amb` beds. Mixing happens after the final render (Stage 8), or run `python audio/mix.py --project projects/<slug>` now to audition `build/mix.wav`.

## Stage 8: Render and deliver
Read `references/render-qc.md`.
1. Lint again (`python tools/shot_lint.py --project projects/<slug>`), then preview: `node render.mjs --project projects/<slug> --from 0 --to 30 --scale 0.5`. Show the user the preview or a contact sheet before the long render.
2. Final: `node render.mjs --project projects/<slug>`. Run it in the background for long videos and poll the log. The log prints fps and ETA, so share the estimate.
3. Run `python audio/mix.py --project projects/<slug>`, which generates music and SFX, ducks the music under the voice, normalises to −14 LUFS and muxes `out/<title>.mp4`.
4. QC the final file: duration matches, audio is present, and a 1-frame-per-10-s contact sheet looks right. Deliver the MP4 (send the file), then give the location in plain words and one line on what to tweak next if needed.

## Defaults and judgement calls
- When unsure about a visual, choose the more literal, more cinematic option: a close-up for emotion, an insert for objects, a blueprint for mechanisms, 3D for big spaces.
- Keep about 15–25 shots per minute. Use 1–3 freeze-frames per video and about one 3D shot per minute.
- Use `"mblur": 6` (5–6 samples) only on fast shots (it multiplies that shot's render time), `"timing": "twos"` + `boilPose` on comedic, cozy or emotional shots, and 1–3 `beatHold`s per minute on punchlines.
- Keep each character's outfit colour fixed for the whole video, and keep screen direction consistent within a scene.
- Prefer re-rendering a fixed shot range over the whole video only when the user is comfortable splicing. Otherwise re-render everything.
