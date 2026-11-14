# Engine reference

## Folder layout
```
thanhhai-2d-studio/
  render.mjs  player.html  package.json
  engine/   core.js styles.js rig2d.js motion.js fx2d.js ui2d.js three-kit.js player.js
  tools/    doctor.py verify_kit.py new_project.py transcribe.py parse_script.py beats.py common.py visemes.py shot_lint.py
  audio/    dsp.py sfx.py music.py mix.py
  examples/reaction-time/   (reference project: scenes + story)
  examples/motion-lab/      (v0.3 animation-principles reference: act, lip-sync, squash, twos, boil, motion blur)
  tests/                    (unit + golden-frame tests for the engine)
  projects/<slug>/
     config.json   input/ (voiceover, script, music)   timeline/ (words, sentences, beats)
     story/shots.json  story/bible.md   scenes/cast.js  scenes/sets/*.js  scenes/shots/*.js
     build/ (sheets, stills, styles, parts, music.wav, mix.wav, video_silent.mp4)   out/<title>.mp4
```
Every `.js` under `scenes/` is loaded automatically (files starting with `_` are skipped). Import the engine with absolute paths (`'/engine/core.js'`) and project files relatively (`'../cast.js'`).

## config.json
`{ title, lang: "vi"|"en"|… (ISO code of the video language; drives Whisper, fonts and on-screen text), aspect: "16:9"|"9:16", resolution: "720p"|"1080p"|"1440p"|"2160p", fps: 24, style: "dusk", voiceover, script, duration, captions: bool, captionStyle?: {y,size,max}, bars: null|"wide"|"scope"|"none"|number, fadeIn: 0.5, fadeOut: 0.8, music: {enabled, gainDb, file?, seed?, key?}, sfx: {enabled, gainDb}, loudness: -14 }`

## story/shots.json
```json
{ "title": "…", "duration": 312.4,
  "shots": [ { "id": "s001", "start": 0, "end": 3.4, "line": "spoken words", "scene": "what we see", "set": "cafe",
               "bars": null, "in": {"type": "cut|fade|dip|dipWhite|flash|whip|zoom", "dur": 0.4, "dir": 1},
               "sfx": [{"at": 0.4, "name": "buzz", "gain": -10}], "amb": {"name": "murmur", "gain": -26},
               "params": {}, "vignette": true, "captions": true, "notes": "" } ],
  "music": [ {"start": 0, "end": 42, "mood": "mystery", "intensity": 0.4} ],
  "sfx": [ {"t": 120.5, "name": "impact", "gain": -6} ] }
```

## Shot modules
```js
import { E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, wordTime, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace, headPos } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';  import * as UI from '/engine/ui2d.js';
import { lab } from '../sets/lab.js';  import { MAX, DOC } from '../cast.js';

registerShot('s013', { draw(g, t, info) {            // 2D: g = canvas ctx in logical units, t = seconds into the shot
  const cam = { z: 1 + 0.06 * ease.inOut(t / info.dur), x: -30 };
  const { GY, M } = lab(g, t, cam);
  layer(g, cam, 1, g => drawFigure(g, { x: E.W/2 - 40, y: GY, s: 1.4, facing: -1, outfit: DOC,
        pose: breathe(posesAt(t, [[0, 'stand'], [0.4, 'point']]), t), expr: 'smile', rim: { color: M.rim, dir: [0, -1] } }));
  FX.dust(g, t);
}});
registerShot('s008', { kind: '3d',                   // 3D: init once (T = three-kit), draw per frame, optional 2D overlay
  init(T, info) { const st = T.stage({ mood: 'golden' }); /* build */ return { stage: st }; },
  draw(s, t, info, T) { T.orbit(s.stage.camera, t, { target: [0, 1, 0], radius: 6, height: 2.5, from: -0.8, to: 0.3, dur: info.dur }); },
  overlay(g, t, info, s) { /* 2D graphics on top, logical units */ } });
```
`info = { dur, globalT, p, line, shot, ...shot.params }`. An exception inside a shot is printed to the console and drawn as red text on the frame, so check the render output.

## Core, rig, FX and UI API (logical units: 16:9 → 1920×1080, 9:16 → 1080×1920)
- **core.js:** `E` (W, H, PX, fps, vertical, cfg, words, shots), `V(h, v)`, `clamp lerp prog ease{linear,in,out,inOut,sine,outBack,outElastic} key(t, [[t,v],…], ease) mixVal rng(seed) noise(x, seed) shake(t, amp, freq, seed) talkAmount(globalT, from, to) wordTime(word, afterGlobalT)`, colour `rgb css mix alpha shade`, `mood(name) S() setStyle`, draw `rr seg poly circle ring linGrad radGrad glow fillRect backdrop veil text measure FONTS`, camera `layer(g, cam, depth, fn) blurLayer(g, amount, fn, cam?, depth?)`, `registerShot getShot`.
- **rig2d.js:** `drawFigure(g, {x, y, s, facing, pose, rot, outfit, expr, talk, blink, look:[x,y], rim:{color, dir, w}, dim, alpha, prop, shadow, trail})`. Poses: `POSES.{stand, relaxed, talk, explain, point, pointUp, wave, cheer, handsOnHead, crossArms, think, shrug, holdFront, phone, reach, sad, facepalm, ready, crouch, sit, sitBack, kneel, lie(+rot), dive(+rot), kick, jump, fall}`, plus `posesAt, blendPose, breathe, walkPose(phase, {run})`, `face(g, x, y, r, {expr, talk, blink, look, front})`, `bigFace(g, cx, cy, r, {outfit, expr, talk, blink, look, rimColor, rimSide, tilt})`, `headPos(o) → [x, y, r]`, `soccerBall(g, x, y, r, rot)`. Props: `phone, ball, paper, cup, paddle, pointer, tablet, flashlight`. Outfit: `top: hoodie|labcoat|trench|jersey|tshirt|suit|dress|tracksuit|none, color, color2, legs, head: cap|capBack|beanie|fedora|headband|visor|hood|ponytail|bun|curly|spiky|none, headColor, face: glasses|sunglasses, gloves, number, kid`. Custom poses are plain objects with the 11 points; edit a copy (`{...POSES.sit, hF:[34,-188]}`).
- **fx2d.js:** `rain drops dust snow stars fog sun moon godRays lightCone pool lensStreak sparkle lightning speedLines rings skyline hills clouds tree pine lampPost windowFrame facade door chair stool counter screen bed clock floorLines crowd`.
- **ui2d.js:** `titleCard bigLine badge readout callout dimension dataCard compareBars meter blueprint bpStroke lineFigure bubble endScreen captions`.

## motion.js (v0.3: animation principles, see animation-principles.md)
`act(t, keys, opts)` pose keys with anticipation/arcs/overshoot (keys `[time, pose|name, {antic, amt, freq, damp}]`, each key starts its move) · `arcBlend(a, b, k)` · `spring(t, freq=3, damp=0.62)` · `exprAt(t, keys, blend=0.15)` → value for `expr` · `saccade(t, seed, {min, max, amp})` → `look` · `follow(fn, t, {freq, damp})` · `swingFrom(xFn, t, {facing, gain})` → `swing` · `impact(t, at, amt)` → `squash` · `squashScale(s)` · `beatHold(t, at, frames=8)` → remapped time · `onTwos(t)` · `boilPose(pose, t, amt=1.2)`.

**drawFigure v0.3 options:** `squash` (−0.45…0.45, + = squash, area kept, feet planted), `swing` (radians, ponytail/headband/coat hem), `hands` (`'fist'|'open'|'point'|'grip'|'thumb'|'wave'` or `{F, B}`), `viseme` (`'A'|'O'|'U'|'E'|'M'|'F'|'rest'`), `expr` may be an `exprAt` cross-fade object. `bigFace` also takes `viseme` and cross-fade `expr`. **core.js:** `visemeAt(globalT, from, to)` reads `timeline/visemes.json`; `wordTime()` now matches Vietnamese diacritics exactly.

**shots.json v0.3 fields:** `size` (`wide|medium|ots|close|insert|top|freeze|3d|data|blueprint|title|end`, used by `tools/shot_lint.py`), `timing: "twos"` (hold drawings for 2 frames), `mblur: N` (motion-blur sub-frames). **config.json:** `timing`, `mblur`, `shutter` (0.5 = 180°) as project-wide defaults.

**Tools:** `python tools/visemes.py --project P` → `timeline/visemes.json`. `python tools/shot_lint.py --project P [--strict]` → hook, gaps, pacing, repetition report (`story/lint.json`). Renderer: `--mblur N`, `--chrome PATH` (or `CHROME_PATH`) to use an existing Chromium. Tests (kit maintainers): `npm test`, `npm run test:golden`.

## evolve.js (v0.4: "Evolution of X" videos, see evolution-format.md and the evolution-video skill)
`stagesFromShots(E.shots)` (shots with `params.stage`; split parts merged) · `stageAt(t, stages)` · `counterAt(t, stages)` · `fmtCounter(v, 'age'|'year'|'ago', lang)` · `ageLook(age)` → `{s, stoop}` (multiply drawFigure `s`) · `agePose(pose, age)` · `EVO_POSES.knuckle|stoop` · `creature(g, kind, {x, y, s, facing, t, rim, accent})` for `cell fish amphibian reptile mammal ape hominid human` · `timelineBar(g, globalT, stages)` · `evoOverlay(g, t, info, {center, counter, title, bar, burst})`. Plan with `python tools/evolution_plan.py --project P` from `story/stages.json`. Music-only projects: `new_project.py --duration N` (no `--voice`).

## explainer.js (v0.5: mascot-host explainers, see mascot-explainer-format.md and the mascot-explainer skill)
`roundTitle(g, t, {n, title, sub})` · `dangerCard(g, t, {name, stats:[{label, v, text}], x, y, w})` → bar widths · `tally(g, {label, count, since, x, y})` running-gag counter · `sizeCompare(g, t, {items:[{label, h, text, draw}], maxH})` · `ouch(g, t, x, y, {text})` comic burst (0.6 s) · `sign(g, x, y, text)` · `bug(g, 'beetle'|'spider'|'crab'|'flytrap', {x, y, s, facing, t, rim})`. **Mascot heads:** `outfit.species` = `'dog'|'cat'|'bear'` (ears, snout, nose, whiskers) and `outfit.fur` (head colour) on `drawFigure` and `bigFace`. **ui2d:** `captionGroup(words, i, max)`: caption groups now break at sentence ends and pauses. Plan with `python tools/explainer_plan.py --project P` from `story/rounds.json`.

## three-kit.js (passed as `T` to `init`/`draw`)
`T.stage({mood, fov, fog:[near, far], sky, keyPos, keyIntensity, ambient, bloom})` → `{scene, camera, composer, sun, add(...objs), render(), dispose()}`. Builders: `box cyl cone sphere plane ground(w, d, color, tex) planks tiles windowPane(w, h, {glowColor, cols, rows, power, interior}) shaft(w, len, color, opacity) building(w, h, d, {color, win, lit}) tree3D pine3D crowd3D({rows, perRow, width, step, rise, colors}) figure3D(outfit, {rim, pose, s}) → .setPose(pose)`, `mat basic canvasTex`, and cameras `orbit(camera, t, {target, radius, height, from, to, dur})` and `dolly(camera, t, [[t, {pos, look, fov}], …])`. Units are metres, a figure is ~1.7 m and faces +x. 3D shots get the same grade, bars and grain automatically. Keep exposure moody: let windows and lamps be the brightest things, and keep the floor dark.

