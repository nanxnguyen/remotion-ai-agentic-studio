---
name: mascot-explainer
description: "This skill should be used when the user wants a funny, high-energy explainer video hosted by an animal mascot who personally tries every fact and suffers for it (the Dumb Doggo-style format), e.g. \"what it's like to fight the deadliest spiders\", \"every way you can be fossilized\", \"a journey through the digestive system\", \"make a Dumb Doggo style video\", \"mascot explainer\", and Vietnamese requests such as \"làm video kiểu Dumb Doggo\", \"cảm giác bị … là thế nào\", \"đánh nhau với các loài bọ\", \"video giải thích có linh vật chó\", \"hành trình qua hệ tiêu hoá\". It plans cold open → rounds with stat cards and gags → recap → CTA and builds it with the Thanh Hai 2D kit."
metadata:
  version: "0.5.2"
  author: Thanh Hai Learn AI
---

# /mascot-explainer: a mascot host who tries it so you don't have to

One recurring animal host (an ORIGINAL mascot, never a copy of another channel's character) explains a science topic by living it: fighting the creature, being eaten, travelling through the body. Each fact is a round with a stat card; each round ends in a gag; a running-gag counter ties the episode together. Read `../make-2d-video/references/mascot-explainer-format.md` first. Install, style bible, animation principles, render and sound are shared with `../make-2d-video/`.

## Golden rules
1. **Ask the video language first** (Stage 0 of `../make-2d-video/SKILL.md`).
2. **Facts are real, the host's suffering is the joke.** Research every number on a stat card (size, venom, force, speed) with web search, open the pages, write `story/sources.md`. Round with words like "khoảng", "một trong những" where sources disagree. Never invent danger.
3. **An original mascot of your own (or the built-in `/engine/tihon.js` v3.0 1:1 channel mascot rig).** Pick species (`dog`, `cat`, `bear`) or import `{ drawTiHon, bigFaceTiHon, drawFloat } from '/engine/tihon.js'` (Tí Hon v3.0: 3/4-view two big white eyes, thick expressive eyebrows, compact dark-slate oval base pad `#334155` + glossy red `"VỀ NHÀ"` dome button `#ef4444` + cyan `"TUA LẠI"` LED on crown, dark-green crown/nape spikes `#1b661e`, rounded snout with nostril & warm cheek blush, pale-cream `#d8f3b4` lower jaw + dark-maroon mouth `#581c1c` + 5 sharp white upper teeth + pink tongue with 7-shape Vietnamese lip-sync `A, O, U, E, M, F, rest`, continuous pear-shaped green body `#48b83e` with 2.5D shading `#2e8527`, ribbed pale-cream belly, compact orange scarf `#f97316` with `swingFrom` physics, pointed horizontal triangular tail with dorsal spikes & `tailPress` arc, chibi pillar legs, short curved T-Rex arms, and Episode 2/3 props: `backpack`, `popsicle`, `divingMask`, `picnicBread`, `frost`, `soot`, `holdingWorm`, `headlamp`, `glasses`, `sunglasses`, `pointer`, `clockOnWrist`, `bandages`, `slime`, `costume`, `prop`). Write the character design into `story/bible.md`, and reuse it in every episode of the channel. Never draw another channel's character, name or signature look; do not call the video "Dumb Doggo".
4. **Mandatory 5-document production workflow (`1. Series Bible -> 2. Shot List -> 3. Storyboard -> 4. Animatic -> 5. Production Spec`).** Every episode must maintain and verify the 5 canonical Vietnamese production documents before final render:
   - `1. Series Bible` (`docs/ti-hon-series/01-series-bible.md`): character model sheet, color palette, 4 signature props, 8-beat comedy formula, and safe-zone typography rules (`FONTS.ui` / `FONTS.display`: `'Be Vietnam Pro', 'Inter', 'Nunito', 'Fredoka', sans-serif`, HUDs/callouts `y <= 860`, captions `y >= 940`).
   - `2. Shot List` (`docs/<slug>/02-shot-list.md`): complete table of every shot (`s01a`..`end02`) with exact timestamps, Vbee narration, visual action, camera size/movement, on-screen text/HUDs, and SFX/BGM cues.
   - `3. Storyboard` (`docs/<slug>/03-storyboard.md`): frame-by-frame visual composition breakdown linked directly to contact sheets (`build/sheets/sheet_01.png..`).
   - `4. Animatic` (`docs/<slug>/04-animatic.md`): pacing & timing audit of `build/animatic.mp4` covering the 0–45 s hook, all round escalations, silence drops, climax twist, and 15–20 s End Screen hold.
   - `5. Production Spec` (`docs/ti-hon-series/05-production-spec.md`): technical delivery standard (`1440p` `2560x1440` 16:9 or `1080x1920` 9:16, `-14.0 LUFS` / `<= -1.0 dBTP`, 15–20 s End Screen with `"hold"` notes, subtitle safe zone `y >= 940`).
5. **The host is in every shot and reacts to every fact** (`exprAt` on the key word, `act` for gestures, lip-sync with `viseme`). Gore stays cartoon: no blood, cut away or use a comic burst (`ouch`) for the hit, swelling and bandages instead of wounds. Keep it suitable for a general audience.
6. **Hook = the worst moment first & strict `<= 28 s` Intro Gate.** The cold open (`0–5 s`) drops directly into the worst disaster matching the Thumbnail/Title (`0 GIÂY?!` / crisis moment), then **compresses Promise + Open Loop (`5–15 s`) and Stakes + Rules (`15–28 s`) into `<= 110` Vietnamese words** so Round/Spot #1 starts before `0:30` (never waste seconds `15–30` on channel greetings, long disclaimers, or recap chatter).
7. **Retention engineering (No Section Cliffs, False Victories, Mid-Video Wager, Silence Drops, Binge Outro):**
   - **Chained Open Loops:** Never end a round with a closed stop (*"Done with #1, onto #2"*). Open the next round's paradox/hypothesis *before* rewinding or closing the survival clock.
   - **False Victories & Mid-Video Wager:** Place 1–2 brief "False Victory" calm turns before sudden escalation reversals, plus a mid-video interactive wager explicitly naming the remaining choices (`"1. X, 2. Y, or 3. Z — which do you bet on?"`).
   - **Clean Silence Drops:** Drop BGM to `intensity: 0.02` (`3.5–4.5 s`) on dark scientific/emotional turns, keeping slapstick gags strictly *before* or *after* the somber beat—never inside it.
   - **Binge Outro (`15–20 s` End Screen):** Never say *"Goodbye / Thanks for watching"*. Ask an open debate question (not voting on already-resolved rounds), pay off the mascot's recurring physical gag (e.g., short-arms -> `tailPress` on Subscribe), and end on an explicit named Open Loop pointing into the `15–20 s` animated End Screen (`end01..end02`).
8. **Vbee-First 1-Pass Rule & Vietnamese TTS Cleanliness (`voiceover.mp3` BEFORE `shots.json`):**
   - Always finalize the script, lock facts against `story/sources.md`, and audit **Script-to-Rig prop continuity** (never mention removed props like a yellow helmet when using Tí Hon v3.0's crown red button + `tailPress`; unify terms like `"vô cực"`).
   - Format the Vbee input cleanly (`docs/<slug>/script-vbee.txt`): zero digits/math symbols (spell out numbers/units in Vietnamese, e.g. `"độ xê"`, `"si li cát"`), avoid English loanwords that trip TTS (`"picnic"` -> `"dã ngoại"`), keep sentences concise (`<= 25` words, no em-dashes), and export the real `input/voiceover.mp3` + run Whisper alignment (`words.json`, `anchors.json`) **before** building `story/shots.json`.
   - Prefer `explainer.js` **`spotTracker()`** at top center (`y = 92..130`), **`>= 30 px`** dark-pill callouts (`y = 162..860`), outer HUD margin `x >= 52, y >= 36`, and **3D `hero3d` dispatch** (`sh.params?.hero3d`) so shot IDs never break when re-splitting paragraphs.

## Stage 1: Intake (one AskUserQuestion, skip what is known)
Topic and pattern ("What it's like to…", "Every way you can…", "A journey through…", "Top N deadliest…"), 16:9 long-form (8–15 min, the format's home) or a 9:16 Short (45–60 s, 2–3 rounds), voiceover file or none, mascot (existing from the channel bible, or design a new one), resolution.

## Stage 2: Research and script
Pick 3–8 rounds, ordered to escalate (least to most dangerous, or along the journey). For each: name, 1–3 stats with a 0–1 bar value and a short text, the experience (what happens to the host, one verb), the gag (a visual punchline), and a cue word if there is a voiceover. Write the host's lines in first person, short sentences, one fact per line, a joke every 15–20 s. Write `story/sources.md` and `story/script.md`; send the user the round list and continue unless they object.

## Stage 3: Project and plan (inside `thanhhai-2d-studio/`)
```bash
python tools/new_project.py --name <slug> --voice "<file>" --aspect 16:9 --resolution 1080p --title "<title>" --lang <code>
python tools/transcribe.py --project projects/<slug> --lang <code>   # or parse_script.py with a timed script
python tools/visemes.py --project projects/<slug>
# no voiceover: new_project.py --duration N, then write timeline/words.json from script timings (captions only)
```
Write `story/rounds.json` (schema at the top of `tools/explainer_plan.py`), then:
```bash
python tools/explainer_plan.py --project projects/<slug> --force
python tools/shot_lint.py --project projects/<slug>
```
Shots: `c00` cold open, `t00` title, per round `rNNa` "#n NAME" card, `rNNb` stat card, `rNNc…` experience beats ≤ 6.5 s (gag on the last), `z90` recap, `z99` CTA, plus SFX and a 4-part music plan. With a voiceover each round's `cue` word moves the round start onto it.

## Stage 4: Build
Read `../make-2d-video/references/engine-api.md` (explainer.js section), `animation-principles.md`, and the reference project `examples/mascot-explainer/scenes/shots/explainer.js`. Pattern:
- One or split `scenes/shots/NN_*.js` modules register every shot from `E.shots` params (keeping `if (sh.size === '3d') continue;` in 2D files when `00_3d_hero.js` owns 3D shots). For long episodes (8–12 min), split multi-beat paragraphs into **0.8–3.5 s visual beats** (Master Shot List with sub-shots `s01a/b/c`, rotating `wide`/`ots`/`close`/`insert`/`POV`/`freeze`/`blueprint`/`3d`).
- Custom hero mascots & creatures should use multi-stop `linGrad`/`radGrad` 2.5D shading, `swingFrom` scarf/cape/tail lag, deterministic `Math.floor(t * 12)` + `rng(...)()` panic boil, and `blurLayer(..., fg => ..., cam, 1.65)` foreground DoF instead of flat cutouts.
- Round card: `roundTitle(g, t, { n, title })` over the round's place. Stat card: `dangerCard(g, t, { name, stats })` beside the creature (`bug(g, ...)` or custom `creatures.js`) — `dangerCard` supports both `{label, v, text}` and `[label, v, text]`.
- Experience beats: vary camera grammar (`submerge`, inside-jaw `POV`, `top` underwater shadows), act with `act()` + `impact` squash + `beatHold` on punchlines, use `pill()`/`stamp()` (`measure()`-sized, no overhead wooden posts intersecting HUDs!) and `popText()` (or `ouch(g, t - hitT, ...)`) for comic hits.
- Geographic & scientific accuracy: verify map silhouettes match the named ocean/region (never reuse one continent map for another), and weave recurring visual callbacks (cold-open clock/prop foreshadowing returning at climax & final Subscribe CTA).
- Safe zones (`16:9` with `"bars": "none"`): top HUDs `y <= 135`, callouts/diagrams `y = 200..850`, and `subtitleScrim(g)` behind captions at `y ≈ 1005`. Running gag: `tally(g, { label, count, since })` shown only from the round where the gag begins.
- Recap & CTA: ranked leaderboard with icons/gauges, fourth-wall close-up question + bright high-contrast speech bubble, and tail/mascot Subscribe gag.
Check `node render.mjs --project projects/<slug> --sheet --scale 0.45` and key `--stills` across all 3D/POV/freeze frames before full render!

## Stage 5: Render, sound, deliver
Stage 8 of `../make-2d-video/SKILL.md`. Deliver the MP4 with: a title in the pattern ("Cảm giác … là như thế nào?", "Mọi cách để …"), a thumbnail idea (the host's most extreme face + the creature + 2–3 words), a description with chapters per round and `story/sources.md` links.
