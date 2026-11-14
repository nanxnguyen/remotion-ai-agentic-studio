# The mascot-host explainer format (Dumb Doggo-style)

## What the research shows (Nov 2026)
- AutonoLab lists **Dumb Doggo** (@DumbDoggoAnimation) as "funny, high-energy animated videos explaining absurd scenarios (e.g., fighting spiders) or teaching 'useless' skills"; its stated winning strategy is "binge-watchable content with recurring gags". Snapshot figures on that page: ~505k subscribers, ~3.7M average views; the page marks them historical. https://blog.autonolab.com/niches/2026-01-01-faceless-youtube-animation/
- vidIQ's public stats page (Aug 2026): ~744k subscribers, ~90.7M total views from only 18 videos, channel started March 2024. Top titles follow "What It's Like To…" / "Every Way You Can…": being eaten by a carnivorous plant (~16M), fighting the deadliest spiders (~10.7M) and beetles (~10.5M), every way you can be fossilized (~10.1M), crazy disorders that give you superpowers (~8.6M), a journey through the human digestive system. https://vidiq.com/youtube-stats/channel/@dumbdoggoanimation/
- Average video ~11 minutes; topics: animals, body science, psychology, space, history (favoree.io). Fans describe a dog host who tells crazy facts and that some topics get graphic.
- We could not watch the videos themselves; the grammar below is our design for the Thanh Hai style, not a copy of that channel's art, character or scripts.

## Why it works
Few uploads, huge views: each episode is a long, binge-able tour (rounds) with a reason to keep watching (escalating danger), a recurring character viewers care about, and running gags. The host suffering on the viewer's behalf turns dry facts into comedy.

## Anatomy (long-form 8–15 min; a Short keeps 2–3 rounds)
| Part | Length | What happens |
|---|---|---|
| Cold open | 3–8 s | The worst moment of the episode first, freeze, then title |
| Title | 2–3 s | Episode title + host reaction |
| Round × 3–8 | 1–3 min each (6–20 s in a Short) | "#n NAME" card → stat card (the real numbers) → the host experiences it → gag; danger escalates |
| Recap | 5–20 s | Ranking of all rounds; winner glows |
| CTA | 3–6 s | Comment question ("what should I fight next?"), next-episode teaser |
Running gag: one counter (times bitten / pinched / died) that ticks up across the whole episode.

## Title patterns and Vietnamese adaptations
"What it's like to…" → "Cảm giác bị/đánh nhau với … là như thế nào?" · "Every way you can…" → "Mọi cách để …" · "A journey through…" → "Hành trình xuyên qua …" · "Crazy … that give you superpowers" → "Những … kỳ lạ cho bạn siêu năng lực". Topic seeds: rắn độc Việt Nam, ong bắp cày, cá sấu, sứa hộp, bão, núi lửa, hệ miễn dịch, giấc ngủ, rơi xuống hố đen.

## Checklist
- [ ] Original mascot, the same in every shot and every episode (bible).
- [ ] Every stat sourced; uncertain numbers rounded with "khoảng".
- [ ] Each round escalates and ends in a visual gag; one running-gag counter.
- [ ] Cartoon violence only: bursts, swelling, bandages, no blood.
- [ ] Host reacts on the key word of every fact; lip-synced lines.
- [ ] Cold open is the worst moment; recap + comment question at the end.

## Engine quick reference (engine/explainer.js + rig)
`roundTitle`, `dangerCard` (returns bar widths), `tally`, `sizeCompare`, `ouch`, `sign`, `bug(g, 'beetle'|'spider'|'crab'|'flytrap', …)`. Mascot: `drawFigure`/`bigFace` with `outfit: { species: 'dog'|'cat'|'bear', fur: '#c98a4b', top, color }`. Tool: `tools/explainer_plan.py`. Captions break at sentence ends and pauses (`captionGroup`). Example: `examples/mascot-explainer`.
