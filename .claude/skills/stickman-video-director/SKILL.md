---
name: stickman-video-director
description: "Direct and scaffold 9:16 Remotion stickman videos using the integrated kaomei/stickman-video-director methodology (retention hooks, style presets, expressive poses, kinetic strokes, and single-line safe-area captions)."
---

# Stickman Video Director (Remotion Integration)

Adapted from `kaomei/stickman-video-director` for deterministic 9:16 Remotion rendering in `src/`.

## 1. Visual Style Mapping (`DIRECTOR_STYLES` in `src/animation/stickman-director.ts`)

| Upstream Style | Remotion `styleId` | Visual Character & Use Case |
| :--- | :--- | :--- |
| A1 · Classic B&W | `classic-bw` | Pure dark background, high-contrast white stickman, orange accent (`#F58B4C`). |
| B1 · Minimal Line Art | `minimal-handdrawn` | Warm paper canvas (`#FDFDFC`), subtle 64px grid, hand-drawn ink strokes. |
| A6 · Amber Noir | `amber-noir` | Warm dark shadows, cream ink, amber accent (`#F08A24`) for dramatic storytelling. |
| B3 · Retro TV | `retro-tv` | Dark slate with deterministic CRT scanlines and radial vignette. |
| B4 · Survival Thriller | `survival-thriller` | High-stakes dark tone, crimson accent (`#CE6050`), tight 3-second shot pacing. |
| B6 · Dynamic Meme | `dynamic-meme` | Bold stroke (`38px`), warm cream background, pill-boxed captions. |

## 2. Retention & Pacing Rules

1. **0–3s Visual Escalation Gate:** The opening shot must present a clear visual contrast or action within the first 3 seconds—never a static talking head or empty title card.
2. **3–6s Beat Cadence:** Change the principal visual state (pose preset, kinetic stroke reveal, prop, or camera framing) at least once every 3–6 seconds. Camera drift alone does not count as visual action.
3. **5-Stage Narrative Arc:** Hook (0–5s) → Setup / Tension → Escalation / Turn → Climax → Concise Visual Payoff.
4. **9:16 Safe-Area Captions:** Keep captions strictly single-line (`<= 42` chars) inside `PORTRAIT_SAFE_AREA` (`x: 84, w: 912, captionY: 1470`) so YouTube Shorts / TikTok UI chrome never overlaps text.

## 3. Remotion Implementation Workflow

1. **Scaffold video:** `npm run video:new -- --slug <slug> --id <VideoId> --scenes <N>`
2. **Author storyboard JSON** and validate it before coding scenes:
   `node scripts/stickman-director/validate-storyboard.mjs docs/<slug>/storyboard.json`
3. **Build scenes in `src/videos/<slug>/`** using:
   - `DirectorStage`, `DirectorCharacter`, `KineticStroke`, `DirectorCaption` from `src/animation/StickmanDirectorKit.tsx`
   - `directorPose`, `interpolateKeyState`, `DIRECTOR_STYLES` from `src/animation/stickman-director.ts`
4. **Verify:** Run `npm run verify` and inspect frames in `npm run studio`.
