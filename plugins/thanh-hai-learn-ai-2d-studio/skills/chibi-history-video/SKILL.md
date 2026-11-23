---
name: chibi-history-video
description: "This skill should be used when the user wants a 2D minimalist chibi historical storytelling video in the OverSimplified, Tờ Bờ, or Văn Vở style (pawn/chess-piece armless characters with thick dark outlines, floating weapons/props, ancient-scroll nameplates above heads, cloned soldier formations, flat 2D layered backgrounds with paper grain, and fast-paced humorous narration), e.g. \"make an OverSimplified style history video\", \"chibi Three Kingdoms animated recap\", and Vietnamese requests such as \"làm video lịch sử chibi\", \"làm video kiểu Tờ Bờ\", \"làm video kiểu Văn Vở\", \"dựng video Tam Quốc hoạt hình 2D tối giản\", or \"làm video kể chuyện lịch sử kiểu OverSimplified\". Supports 16:9 long-form (10–55 min via chunked chapter rendering) and 9:16 Shorts."
metadata:
  version: "1.0.0"
  author: Thanh Hai Learn AI
---

# Chibi History Video (`chibi-history-video`)

Produce 100% code-drawn 2D animated historical/storytelling videos (16:9 long-form or 9:16 Shorts) using **pawn-bodied chibi characters**, **floating props**, **ancient-scroll nameplates**, **cloned soldier formations**, and **grain-textured flat 2D sets**—the proven visual language of *Tờ Bờ*, *Văn Vở*, and *OverSimplified*.

**Reference guide (read before coding scenes):**
- `references/chibi-rig-and-sets.md` — Pawn-body anatomy, costume/headgear config table, floating-prop animation, nameplate layout, soldier crowd cloning, reusable 2D sets, paper-grain overlay, and chunked chapter rendering for 25–55 min episodes.

---

## Golden Rules
1. **Confirm language, channel & aspect first** (`vi` / `en`, `16:9` 1080p recommended for long-form or `9:16` for Shorts). Skip if already specified.
2. **Modular Cast, Zero External PNGs.** Define all recurring historical figures once in `scenes/cast.js` (robe/armor palette, crown/hair, beard, signature prop, nameplate). Never generate external character PNGs that drift across scenes.
3. **Pawn-Body + Floating Props = Speed & Consistency.** Characters have no complex articulated limbs—use rounded robe/armor silhouettes with thick `#1e1e24` outlines (`3–4 px`), expressive eyebrows/eyes, and floating props (sword, spear, feather fan, scroll, pointing hand) that bob, tilt, and swing independently.
4. **Always Show Nameplates on New Entrances.** Every named historical figure enters with an ancient-scroll nameplate (`Nameplate`) above their head for at least 2–3 seconds so viewers never lose track of large casts.
5. **Visual Change Every 2–4 Seconds.** Minimalist 2D art relies on pacing: swap facial expressions (`angry`, `smirk`, `shocked`, `sweat`), bounce characters on spoken beats, slide/zoom cameras, and layer SFX (`whoosh`, `sword-clang`, `wooden-tap`, `war-drum`).
6. **Vbee-First Audio & Deterministic Frames.** Synthesize narration first, measure real durations + word timestamps (`beats` / `words.json`), and drive all motion from frame/time `t` (never `Math.random()` or `Date.now()`). Mix BGM + SFX to `-14.0 LUFS`.
7. **Every Shot Shows What the Narration Says.** The set comes from the line, never from a default: meeting → `warTent`, attack a city → `siege`, boats/river → `navalFleet`, oath → `peachGarden`, death/omen → `starNight`, troop movement → `tacticalMap` with march arrows. Run `tools/chibi_assign.py`; `shot_lint` fails if one set holds >30% of shots or the generic `hills` >10%.
8. **Film Grammar, Not a Slideshow.** Alternate `size` (`wide` establishing → `medium` exchange → `closeup` punchline/reaction); never 4 same sizes in a row. Open each new location with a `wide` shot.
9. **Draft Contact Sheets Before Full Render.** Always inspect contact sheets (`--sheet`) and short preview clips before rendering a 25–55 min episode.

---

## Stage 1: Intake & Script Structure
- **Topic & Target Duration:** e.g. 25 min (`~5,000–5,500` Vietnamese syllables) or 50+ min (`~10,000+` syllables), or 45–60s Shorts hook.
- **Channel Palette Override:** Default to clean daylight/parchment (`Tờ Bờ` look) or adapt to channel identity (e.g., *A Xìn Kể Chuyện*: nocturnal crimson/gold/jade dark-ink palette).
- **Script Format:** Write `script.md` with clear `[CHƯƠNG N]` markers, `[SFX: ...]` cues, and clean TTS narration (`narration.txt`, numbers/dates spelled out in words).
- **Hook (0:00–0:45):** Open directly on a dramatic conflict, ironic twist, or central question—never a channel logo or *"Xin chào các bạn"*.

## Stage 1.5: Production Bible — define cast, places, sets and shot count BEFORE voice/render (mandatory gate)
Every script has its own people, places and scenes. Decide them once, up front, so nothing is discovered at render time:
```bash
python3 tools/chibi_bible.py --project projects/<slug>     # -> story/bible.md; exit 1 while items are undecided
```
1. **Cast:** every named person gets a look — main cast in `scenes/cast.js`, side characters in `EXTRA_PEOPLE` (`tools/chibi_assign.py`), or an explicit "crowd" decision. Places/terms the tool flags as names are ignored or added to `PLACES`.
2. **Sets:** every sentence the scene rules do not match gets a decision (new rule, or a `story/overrides.json` line). If the story needs a place the catalog lacks, add the set to the engine now, not after a render.
3. **Chapters:** write `story/chapters.json` (number, title, corner tag, first spoken words).
4. **Shot budget:** ~2.3 s per shot (a 22-min recap ≈ 575 shots). Show the user `bible.md`; get approval of cast + sets before Stage 2.
5. After assignment, approve the **contact sheet** (`render.mjs --sheet --scale 0.5`, ~3 min) — the full render (~50 min) only runs on an approved sheet.

## Stage 2: Voiceover, Timestamps & Project Scaffold
Inside `thanhhai-2d-studio/`:
```bash
python3 tools/new_project.py --name <slug> --voice "<voiceover.mp3>" --script "<narration.txt>" --aspect 16:9 --resolution 1080p --title "<title>" --lang vi
python3 tools/transcribe.py --project projects/<slug> --script projects/<slug>/input/script.txt --lang vi --model small
python3 tools/beats.py --project projects/<slug>
```
Verify `timeline/transcript.txt` matches the audio length (`>= 90%` alignment).

**Story pacing (fast/slow delivery, no new TTS):**
```bash
python3 tools/voice_pacing.py --project projects/<slug> --dry-run   # review fast/brisk/slow/normal per sentence
python3 tools/voice_pacing.py --project projects/<slug>             # writes input/voiceover-paced.wav + remaps timeline & shots
python3 tools/beats.py --project projects/<slug>
```
Action/chase lines ×1.07 with tight pauses, long expository lines ×1.05, deaths/oaths/reveals ×0.94 with a breath after, +0.45 s after questions, +0.3 s before punchlines and "A Xìn soi". Run it after shots exist (it reads badges/stamps) and before the full render.

## Stage 3: Cast & Reusable Sets (`scenes/cast.js`, `scenes/sets/`)
Read `references/chibi-rig-and-sets.md`.
0. **Start from the templates, never from a blank file:** copy `templates/main.js` → `scenes/shots/main.js` (it only registers shots; all drawing is `engine/chibi-shot.js`) and use `templates/cast.example.js` as the model for `scenes/cast.js`. Improve rendering in the engine, not per project, so every future video gets the fix.
1. Create `scenes/cast.js` with `CAST` entries for all main figures + generic `SOLDIER` / `ADVISOR` templates.
2. Use the engine set catalog (`engine/chibi.js` → `drawChibiSet(g, kind, t, opts)`), see `references/chibi-rig-and-sets.md` §6. Only add a project set when the story needs a place the catalog lacks, and add it to the engine (plus `CHIBI_SETS` in `tools/shot_lint.py`) so later videos reuse it.
3. Add the subtle full-frame **paper-grain overlay** and **2.5D camera pan/zoom** helper so static backgrounds still feel alive.

## Stage 4: Chapter Shots (`scenes/shots/`)
Split shots by chapter (`01_hook.js`, `02_chapter1.js`, ...) to keep files small and maintainable:
- **Shot density:** a long-form recap needs a new picture every ~2 s (a 22-min episode ≈ 600+ shots). `tools/chibi_assign.py` splits every shot longer than 3 s into ~2.3 s pieces on word boundaries (prefers commas); extra pieces become alternate angles (other speaker, different size) that continue the set's animation. It always re-splits from `story/shots.base.json` (one shot per line), so re-running is safe; `--no-split` disables it.
- **Cast follows the words:** whoever a line names is on screen with a nameplate — main cast from `scenes/cast.js`, side characters from `EXTRA_PEOPLE` in the assigner (add names there). Lines that name nobody keep the last speakers for ≤2 shots, then show set-appropriate extras (peasants at the market, officials at court, soldiers in battle) — never the main heroes by default.
- Assign story-matched sets and their options (faction, fire, chained, straw, march arrows, year label):
  ```bash
  python3 tools/chibi_assign.py --project projects/<slug>        # prints the set distribution
  ```
  Then hand-correct the shots the rules got wrong in `story/overrides.json` (`{"s012": {"set": "court", "badge": "..."}}`), never by editing shots.json by hand — the assigner re-applies overrides on every run.
- `story/chapters.json` (`[{"n", "title", "tag", "first"}]`) anchors chapters to their first spoken words: the corner tag (`CHƯƠNG 6 · XÍCH BÍCH`) and a 2.4 s chapter-open stamp replace spoken headings.
- The assigner also directs the cut: shot-size rhythm (new place → wide, joke/question → closeup, never 3 same sizes), transitions (chapter → dip, new place → fade/whip/zoom, punchline → flash, same place → cut), acting (`enter` slide-in, `clash`/`standoff` rush + impact + shake + `hit` SFX), punch-in zoom on badges/stamps.
- `scenes/shots/main.js` must pass `p.*` set options to `drawChibiSet`, map `shot.size` to framing (wide 1.0, medium 1.12, closeup 1.3 zoom toward the speaker), accept `chars` entries that are config objects, register ids up to s999, and clamp the camera so pans/zooms never reveal the canvas edge.
- Run `python3 tools/shot_lint.py --project projects/<slug> --strict` and fix all errors.
- Never let TTS read section headings or timecodes: narration text contains only spoken lines (strip `#`, `CHƯƠNG N … (0:50 – 3:00)` lines before Vbee). If a voice already contains them, cut by word timestamps and re-run `transcribe.py`.

## Stage 5: Visual QA, Chunked Render & Audio Mix
1. **Contact-sheet inspection:**
   ```bash
   node render.mjs --project projects/<slug> --sheet --scale 0.5
   ```
   Read `build/sheets/sheet_XX.png` to verify readable nameplates, zero overlapping UI, and clear silhouettes.
2. **Render (use chunked chapters for videos > 10 min):**
   - For short/demo videos (`<= 5 min`): `node render.mjs --project projects/<slug>`
   - For long-form (`25–55 min`): render chapter ranges (`--from <shotA> --to <shotB>`) into `build/chunks/chXX.mp4` and concatenate via `ffmpeg -f concat -safe 0 -i chunks.txt -c copy build/video_raw.mp4`.
3. **Audio mix & final encode (`-14.0 LUFS`):**
   ```bash
   python3 audio/mix.py --project projects/<slug>
   ```
   Mux final video + mixed audio, then verify with `ffprobe` and inspect sample frames before delivery.

---

## Production checklist — lessons from the Tam Quốc 22-min episode (v1 → v4)

Each item below cost a ~50-minute re-render once. Check them before the full render.

| # | Rule | Check |
|---|---|---|
| 1 | TTS never reads headings or timecodes (`CHƯƠNG 1 … (0:50 – 3:00)` was spoken as "không giờ năm mươi phút") | Grep the narration text for `CHƯƠNG` and `\d+:\d\d` before sending it to Vbee |
| 2 | Production bible approved (cast, places, a set for every line, chapters, shot budget) | `tools/chibi_bible.py` exits 0 |
| 3 | About 2.3 s per shot; long lines are split into alternate angles | `chibi_assign.py` prints `split: N -> M`; 22 min ≈ 575–620 shots |
| 4 | On screen = who the line names. Unnamed lines show set-appropriate extras, never the heroes by default | Contact sheet |
| 5 | Scene words inside names (Điêu **Thuyền**, Bạch **Đế**) never choose the set | Handled by `strip_names()`. Add new names to `NAMED`/`EXTRA_PEOPLE` |
| 6 | Bed scenes: the patient lies in the bed (feigned illness peeks and smirks; deathbeds sleep) with one visitor; names mentioned only in passing ("gấp mười Tào Phi") are not in the room | Contact sheet |
| 7 | No single set above 30%; generic `hills` at most 10% | `shot_lint.py --strict` |
| 8 | Overlays stay inside the safe area: letterbox bars are 60 px, so the corner tag sits at y ≥ 84; badges sit top-centre; captions sit at the bottom | Still frame |
| 9 | The camera never shows the canvas edge (black side strips) on pan, zoom or shake | Stills of `closeup` shots |
| 10 | The army stays in the background band behind named characters | Contact sheet |
| 11 | Delivery pacing follows the story: action fast, deaths and reveals slow, a beat before punchlines | `voice_pacing.py --dry-run` |
| 12 | The minute count in the title matches the measured duration (misleading metadata breaks YouTube policy) | `config.json` title vs `ffprobe` |
| 13 | Approval order: bible → contact sheet (~3 min) → full render (~47 min for 22 min at 1080p24 with 5 workers). Do not render to discover problems | User OK on the sheet |
| 14 | Final QA: video and audio durations match; loudness −14 ±1 LUFS; 6 sampled frames (hook, a clash, a chapter open, a map, an emotional beat, the ending) | `ffprobe`, `ebur128` |
