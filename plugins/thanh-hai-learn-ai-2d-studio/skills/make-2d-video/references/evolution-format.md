# The "Evolution of X" format (diarymation-style)

## What the research shows (Nov 2026)
- AutonoLab's study of faceless animation channels lists **diarymation** ("videos explaining the evolution of subjects (animals, people) using 2D animations and diagrams") with ~2.6k subscribers but ~134k average views, an efficiency of ~52× views per subscriber, and a top video "Evolution of Cristiano Ronaldo (animated)" at ~585k views; "Human evolution" had ~133k. The page itself warns these are historical snapshots, not live data. Source: https://blog.autonolab.com/niches/2026-01-01-faceless-youtube-animation/
- The gap it names: evolution topics exist, but **applying them to pop-culture figures and specific animals is underserved**.
- The channel describes its Ronaldo video as following a legend "from a skinny kid in Portugal" to one of the greatest of all time. The format is a life story told as a transformation.
- We could not watch the channel's videos directly, so the visual grammar below is our design for the Thanh Hai style, built on the format, not a copy of that channel.

## Why it works
A single question ("how did THIS become THAT?") is answered in one continuous transformation; every 2–4 s the counter rolls and the picture changes, which keeps retention high; the payoff line-up is a natural loop for Shorts and a strong thumbnail.

## Anatomy (Short, 25–45 s)
| Part | Time | What happens |
|---|---|---|
| Hook | 0–2.6 s | Peak/final stage first + big line, flash-cut to the start ("…from THIS") |
| Stages | 6–10 × 2–4 s | Morph burst + flash on each change; counter rolls to the new value; title pops; one action per stage |
| Payoff | last 3–4 s | All stages lined up, popping in; one-line question; last frame echoes the first (loop) |
Long-form (2–8 min) keeps the same spine but gives each stage 15–45 s with a mini-story, diagrams (blueprint, data cards) for the "why", and a voiceover.

## Topic ideas
- People (tribute, facts only): athletes, musicians, scientists, historical figures, "a typical Vietnamese farmer 1945 → 2025".
- Animals: cat, dog, horse, whale (land → sea), bird (dinosaur → sparrow), elephant, crocodile.
- Objects and places: phone, car, football, bicycle, áo dài, Hà Nội / Sài Gòn skyline, school classroom, money.
- Characters: a fictional hero (no IP), "you" from 0 to 80.

## Stage design checklist
- [ ] Each stage changes at least two of: size/body, outfit/colour, place/light, action/prop.
- [ ] The signature item survives every stage.
- [ ] Values are true and sourced; titles ≤ 4 words in the video language.
- [ ] Moods vary; the climax is the brightest and warmest stage.
- [ ] The counter and title are readable on every background (the HUD has a dark stroke; avoid white skies behind it).
- [ ] No logos, crests, sponsor marks or likeness of real people; no minors as the subject.

## Engine quick reference (engine/evolve.js)
`stagesFromShots`, `stageAt`, `counterAt` (log-scale roll for deep time), `fmtCounter(v, 'age'|'year'|'ago', lang)`, `ageLook(age)` → `{s, stoop}`, `agePose(pose, age)`, `EVO_POSES.knuckle|stoop`, `creature(g, 'cell'|'fish'|'amphibian'|'reptile'|'mammal'|'ape'|'hominid'|'human', {x, y, s, facing, t, rim, accent})`, `timelineBar`, `evoOverlay(g, t, info, {center, counter, title, bar, burst})`. Tool: `tools/evolution_plan.py`. Examples: `examples/evolution-life` (9:16), `examples/evolution-species` (16:9).
