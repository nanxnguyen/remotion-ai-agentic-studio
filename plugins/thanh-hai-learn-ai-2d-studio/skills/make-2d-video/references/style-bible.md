# Style bible: the Thanh Hai Learn AI 2D look

Follow this closely. It is the only description of the target look; no reference images are available.

## The look in one paragraph
Pure black (`S().ink`) stick figures, each with a circle head and thick round-capped line limbs, carry a thin rim-light edge on the side facing the light. They act inside **low-key, cinematic, flat-shaded vector environments**: one strong light source per scene (a sunset window, a street lamp, stadium floodlights, a monitor), deep purple or navy shadows, warm amber highlights, soft glows, floating dust or rain, shallow depth of field (blurred foreground and background layers), a slow constant camera drift, letterboxed frames, film grain and a vignette. Characters are recognised by ONE coloured garment or accessory. Faces are minimal: white dot or ring eyes, a simple white mouth shape, and occasional brows. The rhythm is broken up with giant face close-ups that fill the frame, freeze-frame moments with particles hanging in the air, glowing animated numbers and charts, navy blueprint diagrams for explanations, and low-poly 3D shots that use the same figures and palette. The overall feel is "a stick-figure film lit by a cinematographer": simple shapes, sophisticated light.

## Characters
- **Construction** (handled by `drawFigure`): head circle r = 26 rig units, torso 15, limbs 11–13 with round caps, short forward-pointing foot stubs, no fingers at normal sizes. Hands and fingers appear only in insert close-ups (thick capsules).
- **Depth shading:** the near arm and leg are pure ink. The far arm and leg use `inkFar`, a dark purple-grey. That's automatic.
- **Rim light on every lit character:** pass `rim: { color: M.rim, dir: [dx, dy] }`, where `dir` points from the figure toward the light. Backlit by a window or sun behind → `[0, -1]`. Light from the left → `[-1, -0.3]`. Width 4–5 at 1080p. The rim is what makes black-on-dark readable, so never skip it.
- **Signature items** (exactly one strong colour per recurring character; keep it identical all video): red-orange hoodie `#d64a33`, yellow cap `#f2c21a`, pink beanie `#f29ac0`, green cap `#3fb950`, blue tee `#3a6ea5`, purple tracksuit `#8a5ad6`, white lab coat + round glasses (scientist), black trench + fedora + sunglasses (mysterious mentor or antagonist, often half in shadow), headband in any accent colour (athlete), ponytail or bun to add variety. Children: `kid: true` (72% size). Background people and crowds: plain ink with no colour item.
- **Faces** are drawn on the side the figure faces (3/4 view). Expressions are the main acting tool. Change them **on the beat of the words**, not randomly:
  `neutral, smile, happy, joy, surprised, shocked, scared, worried, nervous, angry, determined, sad, cry, smirk, sleepy, thinking, confused, awe`.
  Blink every 2.5–4 s (`blink: (t % 3.1) > 3.0`, with a different period per character).
- **Talking:** only when a character speaks a quoted line. Lip-sync with `viseme: visemeAt(info.globalT, lineStart, lineEnd)` (mouth shapes from `tools/visemes.py`; falls back to `talk: talkAmount(...)` when there is no viseme data) and add 2–3 faint expanding `FX.rings` around the head. The narrator is never lip-synced.
- **Acting (v0.3):** poses must read as silhouettes, and every action follows the animation principles in `animation-principles.md`. Change poses with `act(t, [[0,'stand'],[0.6,'point']])` (anticipation → arc → overshoot → settle), not `posesAt` (keep `posesAt` only for tiny moves). Change expressions with `exprAt` on the beat of the word, give listeners `saccade` eye darts, add `hands` in medium shots and closer, `swing` for hair and coat tails, `squash` with `impact` for jumps and hits, and `beatHold` before punchlines. Wrap standing or sitting figures in `breathe(pose, t, 1, seed)` so nobody is frozen. The exception is freeze-time moments, where the world is frozen and only the hero moves. Walking and running use `walkPose(phase, {run})`, moving x at a matching speed (walk ≈ 160 units/s × s, run ≈ 420 units/s × s, with phase = t × 2π × 0.9 for walk and × 1.6 for run). Use `trail: {count:4, dx:-40}` for super-speed afterimages.
- **Scale:** wide shots `s` ≈ 0.8–1.2 (figures fill 15–25% of the frame height). Medium shots `s` ≈ 1.5–1.8. Emotional close-ups use `bigFace` (radius 280–360 at 1080p, head slightly below centre, shoulders cropped by the frame bottom, with a rim crescent on the lit side). Always put figures on a floor with a contact shadow (automatic) and never let them float.

## Sets and environments
- Built from **flat shapes and soft linear gradients**: no outlines, no photos, no clip-art, no emoji. Texture is limited to floor lines, window mullions, blinds and lit-window grids.
- **Value structure:** 60–75% of the frame is dark mid-tones (walls and floors from the mood, usually darkened with `shade(c, -0.3)`), with 1–3 bright accents (a window, lamps, screens, floodlights, a sunset). **Stage black figures in front of the brightest area** (a window, a light pool, a glowing screen) so their silhouettes read.
- **Depth layers** with parallax via `layer(g, cam, depth, fn)`: sky 0.1–0.2 → skyline/hills 0.3–0.4 → back wall/facade 0.5–0.6 → floor/props 0.8–0.9 → characters 1.0 → blurred foreground 1.5–1.8 (`blurLayer(g, 8–14, fn, cam, 1.7)`). Most medium shots should have something soft in the foreground (glassware, plants, a railing, crowd heads, another character's shoulder).
- **Windows are the signature element.** Large windows with mullions and a sky gradient behind (sunset, golden, or night with a skyline of lit windows), a sun or moon glow, sometimes blinds. Night streets have house facades with warm lit windows, steps, lamp posts with light cones, parked cars and trees as round silhouettes.
- Typical locations to invent from the script: labs, cafés, bedrooms (moonlight on the bed), kitchens, classrooms, offices, hospitals, locker rooms, stadiums (tiered crowd rows, floodlight rigs, giant screen), streets, rooftops, piers at sunset, roads at night, parks, airports, space. Build each as a reusable `sets/<name>.js` function anchored to `GY` (the ground line: `E.H * V(0.8, 0.68)`) and `CX = E.W/2`. Extend walls, floors and skies far beyond the frame so camera moves never reveal edges.
- **Atmosphere in nearly every shot:** dust motes indoors (`FX.dust`), rain streaks for storms and night (`FX.rain`), frozen droplets or bubbles for time-stop (`FX.drops`), stars in night skies, a lens streak across bright sources (`FX.lensStreak`), god rays from suns and windows (`FX.godRays`), and soft fog bands.

## Light and colour
- Pick a **mood** per location: `M = mood('night')` gives `sky[], ambient, key, rim, wall, floor, dark, practical, grass, road, fog`. Take every colour from `M`, `S()` (style tokens) or the cast. Avoid hard-coded colours so style switching works.
- The story drives the mood: tense or scary beats go darker and cooler (night/storm/interiorCool), triumphant or tender beats go warm (golden/dusk/interiorWarm), and explanations use `void`/blueprint.
- **One key light per shot.** Show it (a sun, lamp or window) and spill it: `glow()` around the source, `FX.pool()` on the floor under it, `FX.lightCone()` from lamps, `FX.godRays()` from windows and suns.
- The global colour grade comes from the chosen style and is applied automatically to every final frame, 2D and 3D alike: per-channel lift/gamma/gain (lift tints shadows, gain tints highlights), contrast, saturation, vignette and grain. Bloom applies to 3D. This is why scenes must use mood and style colours: the grade then makes each style look distinct.

## Camera (never fully static)
Every shot moves: a slow push-in (`z` 1.0 → 1.05–1.10 over the shot), a lateral drift (`x` ±20–60), a slow pull-out for reveals, a slight roll (`r` ±0.02) for unease, or shake (`shake(t, amp)`) for impacts. Use `ease.inOut` for moves and `ease.out` for snaps.

**Shot vocabulary** (use all of these across a video, roughly in these proportions):
1. **Establishing wide** (10%): the location with small figures and a slow push. Opens each new scene. Often 3D.
2. **Medium two-shot** (25%): side view, characters facing each other, conversation and action.
3. **Over-the-shoulder** (10%): a big blurred silhouette of one character in the foreground (`blurLayer`, depth 1.6), the other sharp.
4. **Giant face close-up** (`bigFace`, 10–15%): reactions, realisations, "you" moments, dialogue lines. Background = the location, blurred and darkened (`blurLayer` + `veil`).
5. **Insert / macro** (10%): hands, a phone screen, a watch, a ball, a cup, a door handle. Big, simple, blurred background.
6. **Top-down / diagram view** (5%): e.g. a table from above with a dotted trajectory and a timing label.
7. **Freeze frame / time-stop** (signature moment, 1–3 per video): particles hanging in the air, a cool tint, a corner badge (`100x`), slow rings, a slow rotation, only the hero moving. Enter with a `flash` transition and a `freeze` SFX.
8. **3D orbit / fly-through** (about 1 per minute): big spaces like stadiums, streets and halls, using `three-kit` (engine-api.md, three-kit).
9. **Data card / UI** (as needed): any number the narrator says appears on screen and animates as it's spoken.
10. **Blueprint diagram**: the explanatory or science segment (navy grid, light-blue line art, gold highlights, labels synced to words).
11. **Title card**: glowing caps title over a cinematic wide (often after the cold-open hook).
12. **End screen**: the question in serif italic, a comment bubble, a subscribe pill, and the whole cast lined up.

**Letterbox (`bars`):** `wide` (2:1) is the default. `scope` (2.39:1) is for drama: the title, freezes, climaxes and intense close-ups. Use `none` for full-frame UI or blueprint if wanted. Bars animate smoothly between shots.

## Editing and transitions
Hard **cut** by default (80% or more). **flash** (white) into freeze, time-stop or superpower moments and big realisations. **dip** (to black) for time skips and chapter changes. **fade** for gentle or dreamy moments and the title card. **whip** for energetic jumps between places. **zoom** to dive into an explanation. Keep continuity: the same outfits, the same screen direction (in a conversation, the hero is on the left facing right), and the same set geometry for every shot in a scene.

## On-screen graphics and typography
- **Fonts:** Fredoka Bold for titles and big lines (ALL CAPS, letter-spaced, warm glow). Nunito Black for labels and numbers. Playfair Display Black Italic for the end-screen question.
- **Colours:** gold `S().ui.gold` for key numbers, coral `ui.accent` for alarming values, cream `ui.cream` for labels, blueprint blue `ui.blueprint`.
- **Toolkit (`ui2d`):** `titleCard`, `bigLine` (a question or chapter line), `badge` (corner multiplier or day counter), `readout` ("NORMAL: 0.25 s"), `dataCard` (title, counter and a curve drawing on), `compareBars`, `dimension` (arrowed measure "30 m"), `callout` (leader-line label), `meter`, `blueprint` + `lineFigure`, `bubble`, `endScreen`, `captions`.
- Every number or measurement the narrator says should appear, synced with `wordTime()`. Keep text minimal: at most 1–2 short labels at once, and never sentences except the title, the question and the end screen.
- Pop graphics in with `ease.outBack` scale and a `pop`/`blip` SFX. Fade them out before the cut.

## Story conventions ("What if…?" narratives; use only what the script contains)
Cold-open hook (a dramatic moment, often a freeze) → title card → normal life and the discovery → escalation with concrete numbers → the cost or twist → the climax → the resolution → "Is any of this real?" (blueprint science segment) → end screen with a question and CTA. Explainer, history and documentary scripts use the same vocabulary: characters act out examples, data cards carry numbers, blueprint diagrams explain mechanisms.

## Hand-made texture and the hook (2026)
- Viewers in 2026 reward crafted, slightly imperfect animation over glossy, generic AI video. Use `"timing": "twos"` and `boilPose` on comedy, cozy, emotional and storybook shots (not on UI, data or 3D) to make the film feel drawn.
- **The hook is the first 3 s.** Open on the most striking picture of the video (often a freeze or a giant face), never on a logo, channel intro or slow establishing shot. Change the picture at least every 8 s throughout. `tools/shot_lint.py` checks this.
- Vary framing and sets from video to video: channels that publish near-identical templated videos risk YouTube's inauthentic-content policy.

## Language of on-screen text
Write every piece of on-screen text (title cards, labels, units, signs, chart captions, captions) in the video language from `config.json` → `lang`, never in English by default. Keep it as short as the English equivalent would be; Vietnamese words carry accents, so leave a little extra line height above and below. Units and numbers follow the language's conventions (Vietnamese: decimal comma, "giây", "mét", "lần").

## Don't
No realism, gradients on characters, thick outlines, photos, emoji, clip-art or flat white backgrounds (except flashes). No static shots. No figures without rim light in lit scenes. No narrator lip-sync. No walls of text. No more than ~4 characters in focus at once (crowds are fine). No floating figures. No outfit colour changes. No centring everything (use thirds; the face close-up is the exception). No hard-coded colours that ignore `mood()`/`S()`. No `Math.random()` or `Date.now()` in scenes (they break determinism; use `rng(seed)` and `t`).


## 9:16 vertical rules
The logical stage is 1080×1920 (`E.vertical === true`). Use `V(landscape, vertical)` for every size and position that depends on the aspect.
- **Closer framing:** medium shots and close-ups dominate. Wides become tall stacks (sky → building → ground), with figures in the middle third.
- **Safe area:** keep faces and text inside the central ~900×1500, away from platform UI. Captions sit at ~79% of the height (`captions: true` in config.json); auto-shrink long phrases.
- Diagrams stack vertically (eye above brain above arm). Data cards are taller. Font sizes are larger (the UI helpers already use `V()`).
- Bars default to `none`, and `scope` gives thin bars. Ground line `GY = E.H * 0.68`, which keeps characters above the captions (y ≈ 0.79·H). Set `"captions": false` on title-card or end-screen shots so the words don't duplicate on-screen text.
- Check with `--sheet` in 9:16 before rendering. Shots designed only for 16:9 usually crop the subject.

---
