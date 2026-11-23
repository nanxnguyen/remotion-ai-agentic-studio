# Horror style bible — the look of Truyện Ma 2D Studio

Read with the base `style-bible.md` (rim light, sets, camera, 9:16 rules). Where they conflict, this file wins for horror.

## 1. Value structure: darkness is the canvas
- 70–85 % of every frame sits in the darkest two value steps. Light is a privilege: one motivated **practical** per shot (street lamp, candle, phone screen/flashlight, moon, TV, altar candles), plus a cold ambient fill so shapes stay readable.
- Make darkness with `H.darkness(g, holes)` (screen-space, soft holes around the light), not by painting everything black — the set must exist under the dark so the eye searches it.
- Practical lights breathe: `H.flicker(t)` on every lamp; a dying light (flicker → off) is a beat, schedule it on a word.
- Rim light on every figure (base rule) — the human gets a warm rim from the practical, the entity a cold one (`glowColor`) or none at all (pure silhouette against a lit wall).

## 2. Styles (config.json → style)
| Style | Use for | Palette logic |
|---|---|---|
| `amhon` (default) | modern urban horror, hẻm, bus, hotel, hospital | blue-black ambient, one warm sodium practical, desaturated, heavy vignette + grain |
| `nhang` | altars, funerals, old houses, villages at night | amber candle/incense key, deep brown-black, red accents |
| `huyet` | climax segments, curses, revenge | crimson moon, pure blacks, very high contrast — sparingly |
| `vhs` | found footage, "băng ghi hình", analog horror | washed green, crushed blacks, heavy grain + `H.vhs()` overlay |
| `giayma` | cổ tích đen, legends, historical | muted paper tones, warm lift, paper-cut 2.5D layers |
Horror moods for `mood()`: `ghostNight`, `altarRoom`, `moonRiver`, `hospital`, `bloodMoon` (plus base `night`, `storm`, `interiorCool`).

## 3. The entity
- **Design:** one entity per story with one unforgettable trait (hair over the face, a red veil, a too-long arm, glowing eyes, a smile in a photo). Write it in `story/bible.md` and never change it.
- **Movement:** glides (`ghost()` hovers, hem fades, no feet) or **snaps** between positions across a cut/flicker — never a walk cycle. Head tilts slowly (`tilt`), arms rise slowly (`reach`). Stillness is scarier than motion.
- **Reveal ladder** across the video: (1) absence — an empty doorway the camera lingers on; (2) trace — wet footprints, a hand print, a sound; (3) silhouette far away / out of focus / in a reflection; (4) partial — hair, a hand, eyes in the dark; (5) **full face only at the peak** (`reveal` 0→1). Don't jump to (5) before 60 % of the video.
- **Placement:** the entity lives in negative space — the far end of the hẻm, behind a character's shoulder, in a doorway, the corner of the frame. The viewer finds it before the character does (dramatic irony).
- **Eyes that glow through the dark:** draw the figure under `H.darkness`, then draw `shadowFigure({only:'eyes'})` after it.

## 4. Camera grammar (a move in every shot)
| Move | Helper | Meaning |
|---|---|---|
| slow push-in 6–12 % | `H.creep(t, dur)` | dread, something is about to happen |
| zoom punch | `cam.z *= H.punch(t, at)` | the hit frame |
| dolly zoom | `H.dollyZoom` (bg vs fg scales) | realisation ("it was the photo") |
| tremble | `H.dread(t, fear)` added to cam.x/y | fear rising; never glitchy shake |
| slow lateral drift on 2.5D planes | `H.planes(g, cam, [...])` | establishing, breathers |
| POV flashlight | `H.flashBeam` + `darkness({cone})` | search scenes |
| dutch tilt 3–6° | `cam.r` | wrongness after the midpoint |
Framing: leave empty space where the threat will be; over-the-shoulder with the doorway visible; low angles for the entity, high angles for the trapped human; extreme close-up inserts on objects (photo, lock, phone screen at 02:17).

## 5. 2.5D depth
Build exteriors and big interiors as 3–5 planes: sky (0.2) → far set (0.4–0.5, `haze`) → mid set (0.8) → action (1.0) → foreground (1.2–1.5, blurred, e.g. paper money, branches, bars). The `H.hem()` set is already layered (0.35 / 0.7 / 0.85 / 1.0). Foreground occluders (door frames, curtains) make the viewer feel they are hiding and watching.

## 6. Editing
- Dread shots 3–6 s with motion inside; scares 0.4–1.2 s; breathers 3–5 s wides.
- Cut on sound: the knock, the creak, the word.
- Transitions: hard cuts and dips to black (`in: {type:'dip'}`); `flash` only on scares; no whips or playful transitions.
- Shorts: change the picture every 2–4 s; the first frame already shows the anomaly.
- Use 1–2 "nothing happens" holds per video (the empty corridor for 4 s) — the viewer's imagination does the work.

## 7. On-screen text
Hook card (time/number: `H.clockStamp`), chapter tags (`H.chapterTag`), rule cards (`H.ruleCard`), title/CTA card (`H.horrorTitle`). Vietnamese with full diacritics in Nunito 900 / Playfair italic; ≤ 2 short lines; red `#d1121f` only for threat words. Captions in Shorts: word groups at the lower third, above the 250 px bottom safe zone.

## 8. Don'ts
- No gore, wounds, blood pools, dismemberment, or realistic corpses; a covered body, a dropped sandal or a shadow says more.
- No jump scare in the first 3 s of a long video (it spends the trust you need); hook with wrongness instead.
- No more than one scare every 25 s; no constant loud stingers.
- No cute/comic animation on the entity (bouncy squash, cartoon eyes) — keep humans expressive, the entity still.
- No bright, evenly lit frames except deliberate breathers.
- No real logos, brand mascots, real people's faces, or recognisable copyrighted monsters.
