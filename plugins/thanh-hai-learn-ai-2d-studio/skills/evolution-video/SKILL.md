---
name: evolution-video
description: "This skill should be used when the user wants an \"Evolution of X\" animated video in the Thanh Hai Learn AI 2D style (the diarymation-style format): one subject transforming stage by stage with a rolling year/age counter and a timeline, e.g. \"make an evolution of a cat video\", \"evolution animation like diarymation\", \"human evolution animated short\", \"from baby to old age animation\", \"the evolution of the phone\", and Vietnamese requests such as \"làm video sự tiến hoá của…\", \"video tiến hoá kiểu diarymation\", \"hành trình từ bé đến lớn\", \"từ sơ sinh đến già\", \"tiến hoá loài người hoạt hình\", \"điện thoại qua các thời kỳ\". It researches the stages, plans hook → stages → payoff, builds the stage scenes with engine/evolve.js, renders 9:16 Shorts or 16:9, with or without a voiceover."
metadata:
  version: "0.5.0"
  author: Thanh Hai Learn AI
---

# /evolution-video: "Evolution of X" in the Thanh Hai 2D style

One subject, one transformation, told in 6–10 stages: a life (baby → legend → old age), a lineage (single cell → human), or an object or place through its eras. A big rolling counter (age, year, or "million years ago"), the stage title, and a timeline bar carry the viewer; every stage changes the look, the place and the action of the same subject. The format and why it works are in `../make-2d-video/references/evolution-format.md`; read it first. Everything else (install, style bible, animation principles, render, sound) is shared with `../make-2d-video/` and its kit.

## Golden rules
1. **Ask the video language first** (Stage 0 of `../make-2d-video/SKILL.md`), then talk to the user in their language.
2. **Facts before pictures.** Stage values (ages, years, dates) and titles must be true. Research with web search, open the pages, and write `story/sources.md` (one line per stage: fact + link). Never invent milestones.
3. **Same subject, unmistakable at every stage.** One signature item (colour, number, accessory) is kept from the first stage to the last; size, outfit, posture and setting change. Species videos keep the same rim light, screen position and direction so the eye tracks the change.
4. **Every stage = new place + new action + one prop that names the stage.** Never the same background with a swapped figure: that is the templated look YouTube demonetises as inauthentic content.
5. **Hook in the first 3 s, payoff at the end, loop.** Open on the most striking stage (the peak for a life, the final form for a lineage), cut hard to the start ("…from THIS"); end with every stage lined up and a one-line question, the last frame echoing the first.
6. **Real people:** a factual, respectful stick-figure tribute. Their signature colour/number only: no club or brand logos, crests, sponsor marks or face likeness; no invented quotes or private events; no minors as the subject; title says "(animated)" / "(hoạt hình)". If the user wants someone's private life or a likeness, decline that part and offer the tribute version.

## Stage 1: Intake (one AskUserQuestion, skip what is known)
- **Subject and kind:** life (a person or a character), species (a lineage), object/place (a product, a city, a sport).
- **Format:** 9:16 Short, 25–45 s (default) or 16:9, 2–8 min.
- **Voice:** music-only with on-screen text (default for Shorts), or a voiceover file.
- **Resolution** (default 1080p) and **title**. Defaults: style `dusk`, generated music + SFX.

## Stage 2: Research the stages
Search, open sources, and pick 6–10 stages that each change something visible (size, body, outfit, place, tool, achievement). For a life: birth, first contact with the passion, school/academy, debut, peak, setback or turning point, now/legacy. For species: follow a reputable timeline (e.g. museum or encyclopedia pages) and use rounded "years ago" values. Write `story/sources.md`. Send the user the stage list (value · title · one-line picture) and continue unless they object.

## Stage 3: Project and shot plan (inside `thanhhai-2d-studio/`)
```bash
# music-only Short
python tools/new_project.py --name <slug> --duration 30 --aspect 9:16 --resolution 1080p --title "<title>" --lang <code>
# or with a voiceover: --voice "<file>" (then transcribe.py / parse_script.py and visemes.py as in make-2d-video)
```
Write `projects/<slug>/story/stages.json` (schema at the top of `tools/evolution_plan.py`): `kind`, `counter` (`age` | `year` | `ago`), `hook.dur` (2–3 s), `outro.dur` (3–4 s), and per stage `value`, `title` (≤ 4 words, in the video language), `scene`, optional `weight` (longer stages), `cue` (the spoken word that starts the stage, with a voiceover). Then:
```bash
python tools/evolution_plan.py --project projects/<slug> --force
python tools/shot_lint.py --project projects/<slug>
```
This writes `story/shots.json`: `e00` hook, `e01…` one shot per stage (stages longer than 7 s are split into parts with a new angle), `e99` payoff, flash + whoosh + pop on every stage change, and a 3-part music plan. Shot params carry `{stage, value, title}`.

## Stage 4: Design the stages
Write `story/bible.md`: the subject and its signature item; per stage the place (mood, key light), the action (one verb), the prop that names the stage, and the outfit/size (`ageLook(age)` for people, `creature(kind)` for species). Vary moods across stages (night → dusk → day → golden), and keep the climax warm and bright.

## Stage 5: Build the scenes
Read `../make-2d-video/references/engine-api.md` (evolve.js section), `animation-principles.md`, and both reference projects: `examples/evolution-life/scenes/shots/life.js` (9:16 life) and `examples/evolution-species/scenes/shots/evolution.js` (16:9 lineage). Pattern:
- One module registers every shot from `E.shots` by its params: `STAGE[i](g, t, cam)` draws the place + subject; stage shots then call `evoOverlay(g, t, info, { center })` (counter + title + timeline + morph burst on the first part only).
- People: `drawFigure` with `s: base * ageLook(age).s`, `pose: agePose(pose, age)`, the same signature colour every stage; animate actions with `act`, `impact`, `exprAt`, `hands` (animation-principles.md). Species: `creature(g, kind, {…})` with a rim light, gentle bob or walk cycle via `t`.
- Springy arrival after each morph: scale the subject by `1 + 0.06 * (spring(t, 2.2, 0.5) - 1)`.
- Hook: peak/final stage with a big two-part line ("MỘT HUYỀN THOẠI…" / "…BẮT ĐẦU TỪ ĐÂY", "TỪ ĐÂY…" / "…ĐẾN ĐÂY?") and a white flash on the cut. Payoff: all stages in a row (left → right, small to big), pop in 0.15 s apart, then the question.
Check with `node render.mjs --project projects/<slug> --sheet --scale 0.5` and open every sheet: counter readable, subject recognisable, no two stages with the same place.

## Stage 6: Render, sound, deliver
Follow Stage 8 of `../make-2d-video/SKILL.md` (`render.mjs`, then `python audio/mix.py --project …`; music-only projects need no voiceover). Deliver the MP4 plus a title, description and thumbnail idea:
- Title: "Sự tiến hoá của <X> (hoạt hình)" / "Evolution of <X> (animated)"; optionally the span ("0 → 60 tuổi", "3,5 tỷ năm trong 30 giây").
- Thumbnail idea: first stage and peak stage side by side with an arrow and the two values.
- Description: one line of hook, the stage list with values, `story/sources.md` links.
