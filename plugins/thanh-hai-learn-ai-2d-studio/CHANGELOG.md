# Changelog

## 0.5.0 (2026-11-14)
- **New skill `mascot-explainer`** (Dumb Doggo-style mascot-host explainers) + `references/mascot-explainer-format.md`.
- **rig**: mascot heads `outfit.species` dog/cat/bear with `outfit.fur`, on drawFigure and bigFace.
- **engine/explainer.js**: roundTitle, dangerCard, tally, sizeCompare, ouch, sign, bug (beetle, spider, crab, flytrap).
- **tools/explainer_plan.py**: cold open → title → rounds (card, stats, beats ≤ 6.5 s, gag) → recap → CTA, cue alignment, 4-part music.
- **fix**: captions grouped words across sentences ("…ĐẤY! VÒNG"); groups now break at sentence ends and pauses.
- **examples**: `mascot-explainer` (16:9); golden set 34 frames over 5 examples.

## 0.4.1 (2026-11-10)
- **fix**: plugin failed to install: manifest description over 500 characters; `evolution-video` description contained an angle-bracket placeholder read as an XML tag. `scripts/build-plugin.sh` now checks both before packaging.

## 0.4.0 (2026-11-10)
- **New skill `evolution-video`**: "Evolution of X" videos (diarymation-style): research → stages.json → shot plan → stage scenes → render. Reference `references/evolution-format.md`.
- **engine/evolve.js**: stages, rolling age/year/deep-time counter (log scale), Vietnamese/English formatting, life-stage scale + senior stoop, 8 species silhouettes, timeline bar, `evoOverlay` HUD with morph burst.
- **tools/evolution_plan.py**: hook + stages (split > 7 s) + payoff, morph SFX, 3-part music plan, voiceover cue alignment.
- **Music-only videos**: `new_project.py --duration`, `mix.py` without a voiceover.
- **fix**: jersey numbers were mirrored on figures facing left.
- **examples**: `evolution-life` (9:16), `evolution-species` (16:9); golden set now 28 frames over 4 examples; 27 JS + 17 Python unit tests.

## 0.3.0 (2026-11-10)
Phase 0 + Phase 1 of the "high-quality animation" plan.
- **engine/motion.js** (new): `act` (anticipation → arcs → overshoot → settle), `arcBlend`, `spring`, `exprAt`, `saccade`, `follow`, `swingFrom`, `impact`, `squashScale`, `beatHold`, `onTwos`, `boilPose`.
- **rig2d**: `squash`, `swing` (ponytail, headband, coat hem), `hands` (6 shapes), `viseme` (7 mouth shapes), expression cross-fades; `bigFace` takes visemes too. Defaults unchanged: old projects render identically.
- **player/render**: `timeline/visemes.json`, per-shot `timing: "twos"`, per-shot or global motion blur (`mblur`, `--mblur`), `--chrome` / `CHROME_PATH`.
- **tools**: `visemes.py` (Vietnamese syllable parser + English fallback), `shot_lint.py` (hook in first 3 s, gaps, pacing, repetition).
- **fix**: `wordTime()` stripped Vietnamese diacritics (`bà` matched `bố`).
- **docs**: new `references/animation-principles.md`; style bible, engine API, story breakdown, QC and all stage skills updated.
- **examples**: new `examples/motion-lab`.
- **tests**: `npm test` (19 JS + 11 Python unit tests), `npm run test:golden` (16 golden frames across both examples); `scripts/build-plugin.sh`.
