---
name: mascot-explainer
description: "This skill should be used when the user wants a funny, high-energy explainer video hosted by an animal mascot who personally tries every fact and suffers for it (the Dumb Doggo-style format), e.g. \"what it's like to fight the deadliest spiders\", \"every way you can be fossilized\", \"a journey through the digestive system\", \"make a Dumb Doggo style video\", \"mascot explainer\", and Vietnamese requests such as \"làm video kiểu Dumb Doggo\", \"cảm giác bị … là thế nào\", \"đánh nhau với các loài bọ\", \"video giải thích có linh vật chó\", \"hành trình qua hệ tiêu hoá\". It plans cold open → rounds with stat cards and gags → recap → CTA and builds it with the Thanh Hai 2D kit."
metadata:
  version: "0.5.0"
  author: Thanh Hai Learn AI
---

# /mascot-explainer: a mascot host who tries it so you don't have to

One recurring animal host (an ORIGINAL mascot, never a copy of another channel's character) explains a science topic by living it: fighting the creature, being eaten, travelling through the body. Each fact is a round with a stat card; each round ends in a gag; a running-gag counter ties the episode together. Read `../make-2d-video/references/mascot-explainer-format.md` first. Install, style bible, animation principles, render and sound are shared with `../make-2d-video/`.

## Golden rules
1. **Ask the video language first** (Stage 0 of `../make-2d-video/SKILL.md`).
2. **Facts are real, the host's suffering is the joke.** Research every number on a stat card (size, venom, force, speed) with web search, open the pages, write `story/sources.md`. Round with words like "khoảng", "một trong những" where sources disagree. Never invent danger.
3. **An original mascot of your own.** Pick species (`dog`, `cat`, `bear`), fur colour, shirt colour and one accessory, write them into `story/bible.md`, and reuse them in every episode of the channel. Never draw another channel's character, name or signature look; do not call the video "Dumb Doggo".
4. **The host is in every shot and reacts to every fact** (`exprAt` on the key word, `act` for gestures, lip-sync with `viseme`). Gore stays cartoon: no blood, cut away or use a comic burst (`ouch`) for the hit, swelling and bandages instead of wounds. Keep it suitable for a general audience.
5. **Hook = the worst moment first.** The cold open shows the host mid-disaster from the last round, then the title. End on a recap ranking and a comment question.
6. **Voice:** this format is narrated by the host. Use a voiceover (Vbee or the user's own) whenever possible; a captions-only cut is a fallback.

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
- One module registers every shot from `E.shots` params. A `host(g, t, info, M, o)` helper draws the mascot (`outfit: { species, fur, top, color }`) with `viseme: visemeAt(info.globalT, shot.start, shot.end)`.
- Round card: `roundTitle(g, t, { n, title })` over the round's place. Stat card: `dangerCard(g, t, { name, stats })` beside the creature (`bug(g, 'beetle'|'spider'|'crab'|'flytrap', …)` or `creature` from evolve.js) while the host points at it.
- Experience beats: one place per round, the host acts (`act`, `impact` squash, `boilPose` for panic), comic hits with `ouch(g, t - hitT, x, y, { text: 'KẸP!' })`, gags with `sign(...)`, swelling via a springy scale on `bigFace`.
- Running gag: `tally(g, { label, count, since })` on every shot after the first hit.
- Recap: ranked mini cards with bars; CTA: the host asks the comment question, `sign` with the next-episode teaser.
Check `node render.mjs --project projects/<slug> --sheet --scale 0.5` and every sheet: host visible and reacting, cards readable, no gore.

## Stage 5: Render, sound, deliver
Stage 8 of `../make-2d-video/SKILL.md`. Deliver the MP4 with: a title in the pattern ("Cảm giác … là như thế nào?", "Mọi cách để …"), a thumbnail idea (the host's most extreme face + the creature + 2–3 words), a description with chapters per round and `story/sources.md` links.
