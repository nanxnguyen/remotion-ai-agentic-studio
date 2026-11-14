---
name: video-styles
description: "This skill should be used when the user runs /video-styles or asks to \"show me style options\", \"compare the looks\", \"pick a visual style\", \"make it warmer / darker / more neon\", \"create a custom style\", or \"change the colour grade\" for an Thanh Hai Learn AI 2D Studio video. It renders the same shots of the user's story in five preset styles (dusk, midnight, golden, neon, storybook) as a comparison grid, records the choice, and builds custom styles.\n"
metadata:
  version: "0.5.0"
  author: Thanh Hai Learn AI
---

# /video-styles: render style options and lock the look

Work inside `thanhhai-2d-studio/` on the active project (`projects/<slug>`; if several exist, ask which one). Shared references are in `../make-2d-video/references/` relative to this skill's base directory.

Read `config.json` → `lang` first. If it is missing (a project made before this version), ask the user which language the video is in before editing anything, save it to `config.json` → `lang`, and write all on-screen text in that language.

## 1. Make sure there is something representative to show
The grid uses the user's own shots, never the bundled example. If the project has fewer than 3 finished shots, first build (following `../make-2d-video/references/style-bible.md` and `engine-api.md`):
- `scenes/cast.js` and the 1–2 most-used sets,
- a wide set shot with ≥ 2 characters, a `bigFace` close-up, and a data/blueprint or 3D shot.

Pick one time inside each shot (about 45% through it) for the grid columns.

## 2. Render the grid
```bash
node render.mjs --project projects/<slug> --styles dusk,midnight,golden,neon,storybook --at <t1>,<t2>,<t3> --scale 0.5
```
Open `build/styles/style_grid.png` (one row per style) and check it, then send it to the user with one line each:
- **dusk — Cinematic Dusk:** mauve-purple shadows, amber key light, cream rim light (the reference look).
- **midnight — Midnight Blue:** cold navy, blue-white rims, sodium-orange practicals; good for night, rain, thrillers.
- **golden — Golden Hour:** warm orange-and-teal, big sun glows; uplifting and nostalgic.
- **neon — Neon Noir:** deep blacks, magenta and teal rims, strong bloom; sci-fi, tech, crime.
- **storybook — Soft Storybook:** lighter pastel, low contrast; family-friendly.

Ask which they want (AskUserQuestion when available).

## 3. Save or customise
- Preset chosen → set `"style"` in `projects/<slug>/config.json`.
- Tweaks requested → add a new entry to `STYLES` in `engine/styles.js`. Copy the closest preset, give it a new id and a `name`/`desc`, then adjust:
  - `moods` overrides (per mood: `sky`, `key`, `rim`, `wall`, `floor`, `practical`),
  - `grade`: `lift` [r,g,b] tints the shadows (raise b for cooler shadows), `gain` [r,g,b] tints the highlights (raise r for warmer), `gamma` [r,g,b], `sat`, `contrast`, `vignette`, `grain`, `bloom` (3D),
  - `ui` colours (gold, accent, cream, blueprint) and `rimWidth`.

  Re-render with `--styles <newid>,<closest preset> --at …` so the user can compare, iterate until they're happy, then set it in config.json. `tools/verify_kit.py` will now report `engine/styles.js` as changed; that's expected.

Scenes only follow a style switch if they take colours from `mood()`/`S()`. If one shot ignores the style, find the hard-coded colours in it and replace them.
