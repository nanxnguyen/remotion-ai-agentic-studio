# Animation principles (v0.3): make figures act, not slide

Poses that only cross-fade (`posesAt`) look like puppets. From v0.3, every character action uses `engine/motion.js` so it follows the classic principles: anticipation, arcs, overshoot and settle, follow-through, squash and stretch, timing and holds. All functions are deterministic (same `t` → same frame), so previews, sheets and the final render always agree. Working reference: `examples/motion-lab/scenes/shots/lab_motion.js` (14 s, every recipe below). Read it once before writing shots.

```js
import { act, arcBlend, exprAt, swingFrom, follow, impact, beatHold, onTwos, boilPose, saccade, spring } from '/engine/motion.js';
import { visemeAt } from '/engine/core.js';
```

## The principles and the call that gives them

| Principle | Use | Notes |
|---|---|---|
| Anticipation → action → settle | `act(t, [[0,'stand'], [1.2,'point'], [3,'cheer',{amt:0.25}]])` | Each key **starts** a move at its time (put it on the trigger word). The body pulls the other way for `antic` (0.15 s), reaches the pose ≈0.2 s after the key, overshoots ≈8% and settles by ≈0.4 s. Bigger actions: `{antic: 0.22, amt: 0.2–0.3}`. Subtle: `{amt: 0.06}`. |
| Arcs | built into `act`; `arcBlend(a, b, k)` for manual blends | Hands and elbows swing around the shoulder instead of sliding in straight lines. |
| Overshoot / springy settle | `spring(t - at, freq, damp)` | Also for props, UI pops and camera pushes: `scale = 1 + 0.06 * (spring(t-at, 2.5, 0.45) - 1)`. |
| Follow-through / overlapping action | `drawFigure({ swing: swingFrom(xAt, t, { facing }) })` | Ponytail, headband tails and coat hems lag behind movement and flick forward when the body stops. `xAt` = the character's world x as a function of time; pass the same `facing` as the figure. `follow(fn, t)` gives a lagging copy of any number (a tail, an antenna, a hanging sign). |
| Squash & stretch | `drawFigure({ squash })` with `impact(t, landT, 0.25)` after contact; negative (stretch, ≈ −0.2) at take-off and in fast falls | Area is preserved and feet stay planted. Keep it for jumps, landings, hits, comedic takes; never on calm standing shots. |
| Timing / holds | `beatHold(t, at, 6–12)` | Freezes the action 6–12 frames before a punchline or realisation word, then snaps. Feed its result as the time for poses and camera: `const tb = beatHold(t, at, 8)`. 1–3 per minute. |
| Staging & secondary acting | `exprAt(t, [[0,'neutral'],[1.2,'shocked']])`, `saccade(t, seed)` for `look`, blinks with a different period per character | Expressions cross-fade over 0.12–0.15 s on the beat of the word. Listeners get eye darts so they are never frozen. |
| Lip-sync (quoted lines only) | `viseme: visemeAt(info.globalT, lineStart, lineEnd)` | Needs `timeline/visemes.json` (`python tools/visemes.py --project …`). 7 shapes: A, O, U, E, M (m/b/p), F (ph/v), rest. The narrator is never lip-synced. Falls back to `talk` when there is no data. |
| Hands | `drawFigure({ hands: 'point' })` or `{ F: 'point', B: 'open' }` | Shapes: fist, open, point, grip, thumb, wave. Use in medium shots and closer (s ≥ 1.4). Match the gesture to the words (point = "this/there", open = explaining, fist = triumph, thumb = approval, wave = greeting). |
| Hand-made texture (2026 trend) | shot field `"timing": "twos"`, `boilPose(pose, t, 1.2)` | Twos holds each drawing for 2 frames; boil adds a 3-drawing line wobble. Use for comedy, cozy, emotional or storybook moments. Not on data cards, blueprints, UI or 3D. |
| Motion blur | shot field `"mblur": 6` (or `--mblur 6` for the whole render) | Averages sub-frames across a 180° shutter. Use 5–6 samples: 3 shows separate ghost copies on very fast moves. Only on fast shots (whips, jumps, falls, super-speed); it costs ≈ N× render time on that shot. Never together with `"timing": "twos"` on one shot (the sub-frames land on the same drawing). |

## Recipes

**Point at something on a word.** `const at = (wordTime('này', info.shot.start) ?? info.shot.start + 0.5) - info.shot.start;` then `pose: breathe(act(t, [[0,'stand'], [at - 0.05,'point']]), t), hands: t > at ? { F: 'point' } : null`.

**Walk in and stop.** Walk with `walkPose(t * 2π * 0.9)` while moving; when stopped switch to `act(t, [[0,'stand'], [stopT + 0.4, 'point']])`. Add `swing: swingFrom(xAt, t, { facing })`. Make the walk direction match `facing`.

**Jump.** Crouch key ≈0.3 s before take-off (`act`), squash 0.15 into the crouch, stretch (−0.2) on take-off scaled by vertical speed, `pose: POSES.jump` in the air, then `impact(t, land, 0.28)` and `act(t, [[land,'crouch'],[land+0.35,'cheer']])`. Rings or dust at the landing point. See `m04` in motion-lab.

**Realisation close-up.** `bigFace` + `beatHold` 8 frames before the key word + `exprAt(... 'shocked')` on the word + a springy 4–6% push (`spring`). See `m03`.

**Dialogue two-shot.** Speaker: `act` between `explain` / `talk` poses every 0.8–1.5 s, `hands: 'open'`, `viseme`. Listener: `crossArms` or `relaxed` with `saccade` and an `exprAt` reaction on the key word.

## Don'ts
- Don't key a new pose more often than every 0.4 s: the overshoot needs time to settle.
- Don't put anticipation on tiny moves (eye looks, blinks): `amt: 0` or `posesAt`.
- Don't squash characters who are just standing, talking or walking.
- Don't use twos/boil on a shot that has precise UI numbers or diagrams.
- Don't lip-sync the narrator or a character whose line isn't in quotes.
