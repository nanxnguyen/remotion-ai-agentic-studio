# The mascot-host explainer format (Dumb Doggo-style)

## What the research shows (Nov 2026)
- AutonoLab lists **Dumb Doggo** (@DumbDoggoAnimation) as "funny, high-energy animated videos explaining absurd scenarios (e.g., fighting spiders) or teaching 'useless' skills"; its stated winning strategy is "binge-watchable content with recurring gags". Snapshot figures on that page: ~505k subscribers, ~3.7M average views; the page marks them historical. https://blog.autonolab.com/niches/2026-01-01-faceless-youtube-animation/
- vidIQ's public stats page (Aug 2026): ~744k subscribers, ~90.7M total views from only 18 videos, channel started March 2024. Top titles follow "What It's Like To…" / "Every Way You Can…": being eaten by a carnivorous plant (~16M), fighting the deadliest spiders (~10.7M) and beetles (~10.5M), every way you can be fossilized (~10.1M), crazy disorders that give you superpowers (~8.6M), a journey through the human digestive system. https://vidiq.com/youtube-stats/channel/@dumbdoggoanimation/
- Average video ~11 minutes; topics: animals, body science, psychology, space, history (favoree.io). Fans describe a dog host who tells crazy facts and that some topics get graphic.
- We could not watch the videos themselves; the grammar below is our design for the Thanh Hai style, not a copy of that channel's art, character or scripts.

## Why it works
Few uploads, huge views: each episode is a long, binge-able tour (rounds) with a reason to keep watching (escalating danger), a recurring character viewers care about, and running gags. The host suffering on the viewer's behalf turns dry facts into comedy.

## Anatomy (long-form 6–15 min; a Short keeps 2–3 rounds)
| Part | Length | What happens |
|---|---|---|
| Intro Gate (`0–28 s`) | `<= 28 s` (`<= 110` VI words) | **0–5 s:** Worst disaster + Freeze matching Thumbnail/Title. **5–15 s:** Payoff promise + Open Loop. **15–28 s:** Character scale/rule gag woven into action -> immediately enter Round #1 before `0:30`. |
| Round × 3–8 | 40–90 s each (6–20 s in a Short) | Title/tracker update → stat/blueprint card (verified numbers) → host experience + gag → **Chained Open Loop bridge** to next round (no closed section cliffs!). Include 1–2 **False Victories**, clean `0.02` **Silence Drops** (no slapstick inside somber beats), and 1 **Mid-Video Wager** naming remaining options. |
| Recap | 15–25 s | Contrast-driven ranking of all rounds (`spotTracker` settles; winner glows `∞`) |
| Binge Outro + End Screen | 15–20 s CTA + **15–20 s** End Screen | Debate comment question (external twist/choice, not re-voting settled rounds), mascot physical Subscribe payoff (`tailPress`), named Open Loop CTA into active animated End Screen cards (`end01..end02`, NO "goodbye" phrasing). |
Running gag & Progress HUD: persistent outer-margin counter (`x >= 52`, e.g., lost items / times bitten) plus top-center **`spotTracker()`** (`y = 92..130`) tracking every round's survival status.

## Title patterns and Vietnamese adaptations
"What it's like to…" → "Cảm giác bị/đánh nhau với … là như thế nào?" · "Every way you can…" → "Mọi cách để …" · "A journey through…" → "Hành trình xuyên qua …" · "Crazy … that give you superpowers" → "Những … kỳ lạ cho bạn siêu năng lực". Topic seeds: rắn độc Việt Nam, ong bắp cày, cá sấu, sứa hộp, bão, núi lửa, hệ miễn dịch, giấc ngủ, rơi xuống hố đen.

## Checklist
- [ ] Original mascot, 2.5D shaded + rim lit, identical accessories in every shot (bible).
- [ ] Every stat sourced; uncertain numbers rounded with "khoảng"; maps/props match named geography.
- [ ] Each round rotates framing (`ots`, `close`, `POV`, `insert`, `blueprint`, `3d`), escalates, and ends in a visual gag/callback; running-gag counter appears strictly from its trigger round.
- [ ] Cartoon violence only: bursts, swelling, bandages, no blood.
- [ ] Host reacts on the key word of every fact (`act`, `beatHold`); lip-synced lines (`visemeAt`).
- [ ] Safe zones respected: `"bars": "none"` in `config.json`, top HUD `y <= 135`, callouts/labels via `pill`/`stamp`/`popText` inside `y = 200..850`, and `subtitleScrim(g)` under captions.
- [ ] Cold open is the worst moment; recap + comment question + callback CTA at the end.

## Engine quick reference (engine/explainer.js + /engine/tihon.js)
`roundTitle`, `dangerCard` (accepts `{label, v, text}` or `[label, v, text]`, returns bar widths), `tally`, `spotTracker` (`y = 92..130` centered 7-slot survival pill), `sizeCompare`, `ouch` (`0..0.6s`), `popText` (persistent burst), `sign` (ceiling post), `pill` & `stamp` (`measure()`-sized pole-free labels, `>= 30 px` on dark pills for mobile Vietnamese legibility), `subtitleScrim`, `bug(g, 'beetle'|'spider'|'crab'|'flytrap', …)`. Mascot: `drawFigure`/`bigFace` (`outfit.species`) or `drawTiHon` / `bigFaceTiHon` from `/engine/tihon.js`. Tool: `tools/explainer_plan.py`. Captions break at sentence ends and pauses (`captionGroup`). Example: `examples/mascot-explainer`.
