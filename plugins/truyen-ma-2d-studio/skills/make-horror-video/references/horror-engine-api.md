# horror.js API (import * as H from '/engine/horror.js')

All functions draw in logical units (16:9 = 1920×1080, 9:16 = 1080×1920), are deterministic (no Math.random) and take colours from the mood `M` where a set is lit by the scene. Reference usage: `kit/examples/hem-demo/scenes/shots/demo.js`.

## Timing helpers
| Function | Returns / does |
|---|---|
| `flicker(t, {seed, rate=9, drop=.16, min=.12, wobble=.12})` | 0..1 brightness for a practical light; dips to `min` in short bursts |
| `presence(t, {seed, rate, on})` | 0/1 — an entity that blinks in and out between frames |
| `punch(t, at, amt=.16, decay=7)` | zoom multiplier for the hit frame (`cam.z *= H.punch(t, 0.05)`) |
| `creep(t, dur, amt=.1)` | slow push-in multiplier over the shot |
| `dollyZoom(t, dur, amt=.22)` | `{bg, fg}` scales: background swells, subject shrinks |
| `dread(t, fear, seed)` | `[dx, dy]` smooth tremble scaled by fear 0..1 |
| `hush(t, at, pre=.6)` | 0..1 weight for the silent beat before `at` (freeze motion with it) |

## 2.5D and light
- `planes(g, cam, [{depth, draw(g), blur, haze:[color, a]}])` — far → near multiplane; depth < 1 slower, > 1 faster; `blur` uses blurLayer (depth of field).
- `darkness(g, holes, {a=.9, color})` — screen-space darkness; holes `{x, y, r, soft=.6, k}` or `{cone:[x, y, angle, len, spread], k}`. Call at stage level (outside `layer()`), after the scene, before UI.
- `flashBeam(g, x, y, angle, {len, spread, color, a, t})` — visible beam (pair with a `darkness` cone).
- `heartbeatVignette(g, t, {bpm, a, color})` — pulsing red vignette.
- `scareFlash(g, t, at, {color, dur=.14, a})` — white/red flash frame on a scare.

## Entities
- `ghost(g, {x, y, s, t, kind:'woman'|'child'|'bride'|'old', facing, a, float, reveal 0..1, tilt, reach 0..1, eyes:'hollow'|'glow', eyeColor, mouth 0..1, glitch 0..1, glowColor, hair, cloth, skin, seed})` — y is the ground line; height ≈ 230·s (child ≈ 150·s). Hovers, no feet.
- `shadowFigure(g, {x, y, s, t, a, eyes, eyeA, lean, color, only:'eyes'})` — tall silhouette (≈ 350·s) with smoky edges; `only:'eyes'` redraws just the eyes after darkness.
- `eyesInDark(g, t, [{x, y, s}], {color, open})` — pairs of eyes that blink.
- `handReach(g, x0, y0, x1, y1, p, {s, color, t})` — pale hand reaching from (x0,y0) toward (x1,y1); p 0..1.
- `handprints(g, [{x, y, s, r}], {color, a})` — prints on glass/mirror.
- `breathFog(g, x, y, t, {period, dir})` — cold breath puffs (place at a head with `headPos`).
Humans use the base rig (`drawFigure`, `act`, `exprAt`: `scared`, `shocked`, `worried`, `nervous`).

## Atmosphere and props
`fogBank(g, t, {y, h, color, a, speed, seed, count})` · `paperMoney(g, t, {count, area, color, fall})` · `water(g, y, t, M, {h, color, moonX})` · `candle(g, x, y, t, {s, lit})` · `incense(g, x, y, t, {s, n})` · `altar(g, cx, GY, t, M, {s, photo, photoEyes})` → `{top, left, right}` · `banyan(g, x, GY, t, M, {s})` · `well(g, x, GY, M, {s})` → `{rim}` · `lantern(g, x, y, t, {s, color, lit})` · `oldHouse(g, x, GY, t, M, {s, lit, doorOpen})` → `{door}`.

## Sets
`hem(g, t, cam, {moodName='night', M, lamp=1, endGlow=0, seed})` → `{GY, M, VX, VY, lampX, lampY, f}` — the Hẻm Chuyện Lạ signature alley: converging walls, tangled wires, one flickering lamp, a black vanishing point (`VX, VY`) where things appear (put entities on `layer(g, cam, 0.42, …)` at `y = VY + 96` for the far end). `lamp` 0..1 dims it; `f` is the current flicker.

## Overlays, titles, thumbnails
`vhs(g, t, {stamp, rec, a})` · `staticBurst(g, t, {a})` · `horrorTitle(g, t, {text, sub, y, color, accent, size})` · `ruleCard(g, t, {n, label='QUY TẮC SỐ', body})` · `clockStamp(g, t, {str='02:17', x, y, size, color})` · `chapterTag(g, t, {n, label='CHUYỆN SỐ', title})` · `thumbText(g, {lines, x, y, align, size, color, accent})` · `thumbArrow(g, x0, y0, x1, y1)` · `thumbCircle(g, x, y, r)`.

## Styles and moods
Styles: `amhon` (default), `nhang`, `huyet`, `vhs`, `giayma` (+ base `dusk midnight golden neon storybook`). Moods: `ghostNight altarRoom moonRiver hospital bloodMoon` (+ base).

## shots.json horror fields
```json
{ "id": "s014", "start": 61.2, "end": 63.0, "size": "close", "beat": "scare", "fear": 0.95,
  "scene": "close: her hair parts, hollow eyes; punch + flash",
  "sfx": [{"at": 0.05, "name": "scare", "gain": -4}], "in": {"type": "cut"} }
```
- `beat`: `hook promise setup dread scare reveal breather twist cta chapter` (used by `tools/scare_lint.py`).
- `fear`: 0..1 intended intensity (defaults by beat). The linter draws the fear curve and checks it climbs.
- `hush`: `true` (0.7 s) or seconds — on the shot **before** a scare; `audio/mix.py` pulls music and ambience down ~14 dB over that tail.

## Tools
- `python tools/scare_lint.py --project P [--strict]` — hook, peaks, scare SFX/hush, gaps, numbness, breathers, midpoint, CTA, fear curve.
- `python tools/vbee_tts.py --script narration.txt --out voiceover.mp3 [--voice CODE --speed .95 --gap .35]` — Vbee narration (env credentials), writes `.lines.json` timings.
- `python tools/make_thumb.py --project P [--shot thumb --variants 3 --style amhon]` — renders `thumb`, `thumb2`… shots to `out/thumbnail_N.png/.jpg` at 1280×720, no letterbox.

---

# ditap.js API (`import * as D from '/engine/ditap.js'`) — Option C (Phong cách Dạ Hành Dị Tạp)

All functions are deterministic (no `Math.random` or `Date.now`), adapt cleanly to both `16:9` (`1920×1080`) and `9:16` (`1080×1920`) via `E.W`, `E.H`, and `V()`, and build on `/engine/core.js` + `/engine/horror.js`. Reference usage: `kit/examples/ditap-demo/scenes/shots/demo.js` and `kit/examples/ditap-demo/scenes/shots/thumb.js`.

## Characters (`ditapFigure` & `ditapBigFace`)
- `ditapFigure(g, opts = {})` — draws a 2D pill-body Vietnamese folklore character with thick dark outlines (`#111216`, `3.5px`), rounded shoulder joints, short neck, and expressive eyes/mouth at ground position `(x, y)` with scale `s = V(1.8, 1.5)` and time `t = 0`:
  - Appearance: `facing` (`1 | -1`), `outfit` (`'baBa' | 'mourning' | 'ghost' | 'coat'` or `{ top, color, pants, sash }`), `skin`, `shirtColor`, `pantsColor`, `hair` (`'cap' | 'parted' | 'long' | 'bun' | 'none'`), `hairColor`, `beard` (`bool | 'long'`), `nonLa` (`bool`), `headR`, `tilt`, `outline`, `outlineW`.
  - Folklore & horror traits:
    - `khanTang: true` — white mourning cloth headband with trailing ties.
    - `scar` (`bool | 'left' | 'right'`) — diagonal scar across eyebrow.
    - `blindEye: 'left' | 'right' | null` — opaque milky sphere without dark pupil dot while healthy eye tracks `look`.
    - `faceless: true` — suppresses eyes, eyebrows, nose, and mouth completely even if `expr`, `blindEye`, or `viseme` are simultaneously passed.
  - Expression, pose & props: `expr` (`'neutral' | 'worried' | 'scared' | 'shocked' | 'determined' | 'angry' | 'sad' | 'eerie' | 'smirk'`), `look` (`[dx, dy]`), `blink`, `pose` (`'stand' | 'walk' | 'crouch' | 'point' | 'reach' | 'holdJar' | 'cane' | 'phone' | 'fear'`), `prop` (`'cane' | 'jar' | 'phone' | 'lantern' | 'incense' | null`), `talk` (`0..1`), `viseme` (`'A' | 'O' | 'U' | 'E' | 'M' | 'F' | 'rest'`), `globalT`, `talkRange`, `seed`.
- `ditapBigFace(g, cx, cy, r, opts = {})` — close-up / extreme close-up / thumbnail bust centered at `(cx, cy)` with head radius `r`. Supports `outfit`, `shirtColor`, `skin`, `rimColor`, `tilt`, `expr`, `look`, `blink`, `khanTang`, `nonLa`, `scar`, `blindEye`, `faceless` (strictly suppresses all facial features), `beard`, `hair`, `hairColor`, `talk`, `viseme`, `globalT`, `talkRange`, `t`, `seed`.

## Sets (`ditapAltar` & `ditapVillageStreet`)
- `ditapAltar(g, cam, t, M, opts = {})` — 2.5D blurred (`blurLayer`, `blur = 5.5`) Vietnamese ancestor worship room background so foreground characters pop: wooden pillars, crimson/gold horizontal plaque (`plaqueText = '德流光'`), ancestor portrait (`photoEyes = 0..1`), incense bowl, two flickering candles, two flanking mirrors draped in white mourning cloth (`mirrorPeek = 0..1`), warm center glow, and corner `vignette` (`0.62`). Returns `{ GY, M, altarTop }`.
- `ditapVillageStreet(g, cam, t, opts = {})` — multi-depth 2.5D rural Vietnamese market street: hazy distant karst hills, mossy tile-roof shopfronts (`'TẠP HOÁ'`, `'VẢI SỢI'`), parked bicycle silhouette, bamboo carrying pole (`quang gánh`), utility poles/wires, and drifting `fogBank` (`M`, `moodName = 'ghostNight'`). Returns `{ GY, M }`.

## Title Card, Burn-in Subtitles & Split-Color Thumbnails
- `ditapTitleCard(g, t, opts = {})` — pure black (`#000000`) 1:00 title screen with a minimal top emblem (`emblem: 'jar' | 'boat' | 'scarf' | 'mirror'`), large Serif `title` (`cream = '#f3ead5'`), `sub` (`crimson = '#c41c24'`), and muted `tag` (`'TRUYỆN KINH DỊ DÂN GIAN VIỆT NAM'`), `dur`.
- `ditapSubtitle(g, str, opts = {})` — burned-in narration subtitle in bold white sans-serif (`Nunito 800`) with a heavy `#000000` stroke outline and drop shadow (`y = E.H * V(0.89, 0.80)`, `size = V(44, 48)`, `maxW`, `color`, `strokeColor`). **Never draws a dark rectangle/pill background box (`fillRect`)**. Returns immediately without artifacts on empty/whitespace strings and wraps long Vietnamese strings safely into `<= 2` lines.
- `ditapTimedSubtitle(g, globalT, beats, opts = {})` — finds the active beat at `globalT` from `beats` (`[{start, end, text}]`) and renders it with `ditapSubtitle`. Safely no-ops when `beats` is empty/undefined or `globalT` lies in a silence gap between beats.
- `ditapThumbText(g, opts = {})` — high-contrast split-color thumbnail typography delegating to `horror.thumbText`: `lines` (`['LINE WHITE', 'LINE ACCENT']`), `x`, `y`, `align = 'left'`, `size = V(138, 112)`, `color = '#ffffff'`, `accent = '#e01b24'`, `tilt = -0.025`.
