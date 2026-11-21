# Episode 3 ("Ngày cuối cùng của khủng long – tớ trốn ở đâu thì sống?") Script Writing Plan (v2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Research-verify, draft, pace-calibrate, review, and 100%-lock the verbatim Vietnamese Vbee voiceover script (`~9:00–9:30` runtime), Mascot v0.7 continuity bible (with 3D/SFX/tone arcs), packaging/3-title/A-B thumbnail brief, and 3 standalone 9:16 Shorts scripts BEFORE synthesizing Vbee audio or creating Remotion/Canvas scene code.

**Architecture:** Calibrated directly against Episode 2 (`thanhhai-2d-studio/projects/ti-hon-8-dai-duong/` at `251.1 words/min` / `4.185 words/sec` Vbee Minh Quân `1.1x`), this pipeline locks primary paleontological/climate citations (`story/sources.md`) and non-colliding `16:9` coordinate bounds (`y=160..360` upper labels, `y=360..850` cards, `y>=940` captions) first, then drafts `82–86` short Vbee paragraphs (`2,220–2,320` words) re-weighted toward Spot 5–7 emotional depth (`Chỗ 6` `~330w`, `Chỗ 7` `~325w`) while keeping the opening `<= 42s`, ending with an active-voiced `15s` animated end screen and passing clean-context Gate A (`>= 9/10`).

**Tech Stack:** Markdown production docs, Python 3.12 text/pacing audit script, `thanhhai-2d-studio/tools/shot_lint.py` rules, `docs/SHORTS_RETENTION_PLAYBOOK.md`, `.claude/skills/mascot-explainer/SKILL.md`, `search_web` for citation verification.

**Spec:** `/Users/nguyenanhnhut/Desktop/Projects/AI-video-edition/docs/superpowers/specs/2026-11-18-ti-hon-ngay-cuoi-khung-long-script-spec.md`

## Global Constraints

- **100% Script & Source Lock Before Vbee:** Freeze factual wording, citations, phonetic loanwords, and word budgets BEFORE any Vbee TTS synthesis runs.
- **Format, FPS & Audio Mastering (Inlined Production Standard):** `16:9` (`1920x1080`), **`24 fps` locked from init**, `-14 LUFS`, **`true peak <= -1.0 dBTP`**, target runtime `9:00–9:40` (`540–580s`) including **`14–16s` active-voiced animated end-screen tail** (zero dead-air silence outro, zero hard cut to black).
- **Non-Colliding 16:9 Safe-Zone Map (`bars: "none"`):**
  - `Top HUD`: `y = 28..146` (`SurvivalClock` `x=36..360`, optional center `chapterTag` `y=24..70`, compact top-right status `x >= 1450` avoiding spoilers).
  - `Upper-1/3 Labels`: **strictly `160 <= y <= 360`** (never `< 160` and never inside bottom captions!).
  - `Mid-Canvas Cards / dangerCard`: **`360 <= y <= 850`**.
  - `Bottom Captions Scrim`: **`y >= 940`** (subtitle baseline `y ≈ 1005`).
- **Mascot v0.7 Continuity & Tone Contrast:** Green pocket T-Rex (`#4fb856`, ankle-height to `1.7 m` human), super-short arms, orange trailing scarf, yellow helmet with glowing red `"VỀ NHÀ"` button (`"Tua lại sáng hôm nay"` toggle + `00:00` auto-rewind at ground-zero vaporization), cartoon-only harm; alternate comedy with quiet cosmic-dread beats (`Spot 1` scale, `Spot 5` dust oven, `Spot 6` freezing darkness).
- **Strict Pacing & `shot_lint.py --strict` Guardrails:**
  - `2,220–2,320` spoken words (`82–86` paragraphs, `max_para_words <= 42`), opening hook beat `<= 2.5s` (`no title/logo/intro in < 3s`), median visual beat `1.5–4.5s` (`~185–215` sub-beats, minimum beat `>= 0.8s`), zero unsplit `> 8s` beats (End Screen `#11` explicitly split into `3` x `~5s` active sub-beats), `<= 3` total `freeze` frames, `<= 3` consecutive same-size shots, **never mix `"timing": "twos"` with `"mblur"` on one shot**, and reserve `6` explicit `size: "3d"` (`three-kit.js`) hero shots.
- **Honest Growth Hygiene:** Follow `docs/SHORTS_RETENTION_PLAYBOOK.md` (no guaranteed-million-view claims; keep **vidIQ blocked until `15/12`** and execute manual mobile-pixel + YouTube Test & Compare rubric in Task 6).

## Review Focus

- **Chronological Continuity ("Từng giờ một"):** Verify Spot #3 (Tanis `15–30 min` seismic seiche, `~3,000 km`) sits **before** Spot #4 (crater ocean resurge `30–60+ min`), and Asia Hour-1 only flashes as a brief split contrast inside Spot #5 (`1–3h`) before Spot #6 dives into multi-month impact winter.
- **Biological & Climate Accuracy at Spot #6–7:** Ensure narration reads global mean air temperature **drops by at least 26°C** (*Brugger et al. 2017*), **never cite arboreal *Purgatorius* as a burrower**, and keep carnivorous T-Rex Tí Hon eating post-impact **detrital bugs/earthworms** while his small burrowing mammal roommate eats stored seeds.
- **Vbee Spoken Rate & Silent SFX Pause Budget:** Keep `script-vbee.txt` inside `2,220–2,320` words (`~530–554s` raw VO at `251.1 wpm`), explicitly leaving breathing room (`silence drop` before Spot #6 darkening + Spot #7 tension) without crossing `10:00`, while keeping active narration/mini-gag running across the `14–16s` animated End Screen.
- **3D + Audio Script Readiness:** Tag all `6` `three-kit.js` 3D hero shots (`0..1` per ~90s), separate `audio/sfx.py` library cues from bespoke `audio_custom.py` WAV needs (`tektite clatter`, `popsicle sizzle`, `hotpot boil`, `wind freeze`), and map explicit **Music Mood Intensity Curve (`1..5`)** per segment inside `script-annotated.md`.
- **Clean Packaging Separation & Shorts Stand-Alone Framing:** Ensure none of the 3 titles duplicate Thumbnail display copy (`"7 CHỖ · 1 SỐNG!"`), remove 7-box thumbnail clutter/faded `✓`/shovel, tease (without spoiling) Short #3's chicken-rice punchline in Ep 3's `#10`, and write 3 standalone `45–60s` Shorts scripts sized for Vbee (`~185–215` words @ `1.1x`, or `~145–175` words @ `1.0x`).

---

## File Structure

- `docs/ti-hon-ngay-cuoi-khung-long/research-sources.md` — Verified primary bibliography (`During 2022`, `DePalma 2019`, `Gulick 2019`, `Johnson/Purdue JGR 2026`, `Grady & Benton`, `Brugger 2017`, K-Pg detrital food web + avian theropods) + forbidden-misstatement rules
- `docs/ti-hon-ngay-cuoi-khung-long/bible.md` — Mascot v0.7 Ep 3 continuity bible, `"VỀ NHÀ"` auto-rewind switch, non-spoil HUD rules, explicit `y` zone coordinates, 8 environments, word/time allocation
- `docs/ti-hon-ngay-cuoi-khung-long/script-vbee.txt` — Frozen clean Vbee Minh Quân `1.1x` input (`82–86` paragraphs, `2,220–2,320` words, phonetically normalized, zero stage tags)
- `docs/ti-hon-ngay-cuoi-khung-long/script-annotated.md` — Master annotated screenplay (`# | Para | Time | Spoken Vbee Line | HUD Caption Spelling | Upper-1/3 Label y=160..360 | 1.5–4.5s Micro-Beats + 6x 3D Flags | Music Intensity 1..5 / Silence / SFX Source`)
- `docs/ti-hon-ngay-cuoi-khung-long/shorts-scripts.md` — 3 standalone 9:16 vertical Shorts scripts (`45–60s`, `~185–215` words @ `1.1x` each) with 3 hook options & safe-zone text notes
- `docs/ti-hon-ngay-cuoi-khung-long/packaging.md` — Ranked 3 YouTube titles, 50/50 Thumbnail v2 composition & manual mobile-legibility rubric (no vidIQ until `15/12`), A/B Test & Compare plan, chapters, description pulling Ep 2 <-> Ep 3 <-> Shorts
- `docs/ti-hon-ngay-cuoi-khung-long/script-review-gate-a.md` — Clean-context independent Gate A review (`>= 9/10`) + SHA-256 lock hash + handoff map into `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/`

---

### Task 1: Primary Scientific Verification & Fact Lock (`research-sources.md`)

**Files:**
- Create: `docs/ti-hon-ngay-cuoi-khung-long/research-sources.md`

**Interfaces:**
- Consumes: User references + session-verified primary papers
- Produces: Locked fact table (`Claim | Exact Verified Range | Primary Citation | Approved Vietnamese Phrasing | Misstatement Guard`)

- [ ] **Step 1: Verify remaining paleobiology details (`detrital food web`, K-Pg small burrowing mammals vs arboreal *Purgatorius*, avian theropod survival)**

Run targeted `search_web` checks to cite real fossil studies supporting:
1. Arboreal tarsal evidence in *Purgatorius* (Chester et al., *PNAS* 2015) — confirming why Ep 3 uses unnamed **small burrowing Cretaceous mammals** (e.g., fossorial multituberculates / burrowing insectivores) instead.
2. Post-impact **detrital food web / fungal spike** (Vajda & McLoughlin, *Science* 2004; Robertson et al. 2004 thermal shelter hypothesis) — grounding Tí Hon's worm/bug foraging inside the burrow.

- [ ] **Step 2: Author `docs/ti-hon-ngay-cuoi-khung-long/research-sources.md`**

Lock all 7 core claims with exact years/authors:
1. Spring impact & Tanis `15–30 min` seismic seiche + glass spherules in fish gills (`During et al., Nature 2022`; `DePalma et al., PNAS 2019`).
2. `~10–12 km` (~6 mi) impactor, `~180–200 km` crater, `~130 m` Day-1 rock fill & `~30+ min` tsunami resurge (`Gulick et al., PNAS 2019`).
3. `> 900 miles` (~1,450–1,500 km) near-field blast/thermal reach (`Kring / Gulick`).
4. Global fine silicate dust thermal lid turning surface into an oven for `1–2+ hours` (`Brandon C. Johnson et al., Purdue Univ., JGR: Biogeosciences, July 28, 2026`).
5. Far-field Hour-1 sky color shift in Asia/Europe/NZ (`Michael Benton & Monica Grady`).
6. Global annual mean surface air temperature **drops by at least 26°C** (`Brugger et al., Geophys. Res. Lett. 2017`) & `~75%` extinction.
7. Underground burrow thermal shield + detrital food web + surviving avian dinosaurs.

- [ ] **Step 3: Audit numeric parity**

Verify every stat slated for upper-1/3 labels (`10–12 km`, `180–200 km`, `1.500 km`, `15–30 phút`, `3.000 km`, `>30 phút`, `1–3 giờ`, `ít nhất 26°C`, `75%`, `130 m`) exists verbatim in `research-sources.md`.

---

### Task 2: Continuity Bible, Safe-Zone Spec & Re-Weighted Word Budget (`bible.md`)

**Files:**
- Create: `docs/ti-hon-ngay-cuoi-khung-long/bible.md`

**Interfaces:**
- Consumes: `thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/bible.md`, `research-sources.md`, Spec v2
- Produces: Locked Mascot v0.7 Ep 3 rules, `y` coordinate bands, non-spoil HUD rules, 8 distinct color/lighting environments, `3D` hero shot map, and re-weighted segment budget (`2,220–2,320` words, `82–86` paras).

- [ ] **Step 1: Document Mascot v0.7 continuity, non-spoil HUD & coordinate guardrails**

Lock verbatim:
- Top HUD `y=28..146`; Upper-1/3 Callouts `160 <= y <= 360`; Mid Cards `360 <= y <= 850`; Bottom Captions `y >= 940`.
- Helmet `"VỀ NHÀ"` red button (`"Tua lại sáng hôm nay"` switch + automatic rewind at `00:00` vaporization).
- Top-right status badge shows dynamic per-spot danger state (never spoils `6 -> 0` remaining failures).
- Explicit inline copy of all 5 production lessons (no external `kinh-nghiem-san-xuat.md` dependency).

- [ ] **Step 2: Lock re-weighted 12-segment word & runtime budget (`total = 2,265 words`, `84 paragraphs`, `~541s VO + ~15s tail/breaths`)**

Allocate exact targets (`<= 42s` fast opening; heavy climax budget on Spots 5–7):
- `#0` (`18s`, `~75w`, `3p`), `#1` (`24s`, `~100w`, `4p`) — combined intro `42s / 175w`.
- `#2` Chỗ 1 `0 km` (`46s`, `~195w`, `7p`), `#3` Chỗ 2 `1.500 km` (`44s`, `~185w`, `7p`), `#4` Chỗ 3 Tanis `15–30m` (`46s`, `~190w`, `7p`), `#5` Chỗ 4 Crater Ocean Resurge `30–60m+` (`46s`, `~190w`, `7p`).
- `#6` Chỗ 5 Forest Oven `1–3h` (`64s`, `~265w`, `9p`), `#7` Chỗ 6 Asia -> Winter (`80s`, `~330w`, `12p`), `#8` Chỗ 7 Burrow Climax (`80s`, `~325w`, `12p`).
- `#9` Leaderboard (`34s`, `~135w`, `5p`), `#10` Epilogue Bird/Plate Tease (`36s`, `~145w`, `5p`), `#11` CTA + Active `15s` End Screen (`37s`, `~130w`, `4p` = `2` CTA + `2` spoken end-screen overhang).

- [ ] **Step 3: Lock 6 `three-kit.js` 3D shots & Music Mood/Intensity Arc (`1..5`)**

Assign exact shot slots for the `6` 3D hero scenes (`#0` meteor orbit, `#2` crater rim, `#4` Tanis river valley, `#6` atmospheric thermal shell, `#7` frozen globe, `#8` 3D burrow cutaway) plus mood shifts (`Playful Dawn -> Cosmic Shock -> Panic Comic -> Burning Dread -> Silence/Sub-Zero Tragedy -> Cozy Burrow Relief -> Wonder Twist -> Upbeat Ep 2 Hand-off`).

---

### Task 3: Draft Act 0–II (`#0` Fast Hook through `#5` Spot 4 Ocean Crater Resurge)

**Files:**
- Create: `docs/ti-hon-ngay-cuoi-khung-long/script-annotated.md` (Part 1: `#0–#5`)

**Interfaces:**
- Consumes: `research-sources.md`, `bible.md`
- Produces: Segments `#0–#5` (`~935` words, `35` paragraphs), each mapped to `1.5–4.5s` micro-beats, `y=160..360` upper labels, `3D` tags (`#1–#3`), and Audio/SFX source tags.

- [ ] **Step 1: Draft 3 Cold Open candidates (`0:00–0:18`) & select Winner A**

Confirm opening visual anomaly lands by `0:02` (no title/logo/greeting in `< 3s`), clock freezes trembling, curiosity loop completes within `4–6s`, and `#1` (`0:18–0:42`) cleanly links Ep 2's closing line plus the auto-rewind safety switch.

- [ ] **Step 2: Draft `#2` Spot 1 (`0 km` Scale + Instant `00:00`) & `#3` Spot 2 (`1.500 km` Popsicle -> Short #2)**

Establish epic `10–12 km` scale awe at Spot 1 before instant flash reset; keep Spot 2 crisp at `~44s` with a clear standalone **Short #2** beat arc.

- [ ] **Step 3: Draft `#4` Spot 3 (`Tanis 15–30m`, Glass Spherules -> Short #1) & `#5` Spot 4 (`Ocean Resurge ~30–60m+`)**

Ensure Tí Hon explicitly explains *why* he tries inland Montana/North Dakota (`3.000 km`) right after Spot 2 burns, and why diving offshore after Tanis backfires into the crater resurge washing-machine spin. Keep clear `T+00:15` -> `T+00:30+` progression badges inside `y=160..360`.

---

### Task 4: Draft Act III–IV (`#6` Forest Oven through `#11` Burrow Climax, Bird Tease & Active End Screen)

**Files:**
- Modify: `docs/ti-hon-ngay-cuoi-khung-long/script-annotated.md` (append Part 2: `#6–#11`)

**Interfaces:**
- Consumes: `script-annotated.md` Part 1, `research-sources.md`, `bible.md`
- Produces: Complete `84`-paragraph annotated script (`~2,265` words) with intentional tone shift, accurate detrital biology, and active-voiced `15s` end screen.

- [ ] **Step 1: Draft `#6` Spot 5 (Purdue Dust Oven `1–3h` + Hotpot Pond) & 1s Asia Hour-1 Split**

Script the shift from comedic pond `"nồi lẩu"` into burning wildfire dread (`17x` lethal thermal flux under fine silicate dust lid), ending with a 1-second glance at clear sunset skies in distant Asia.

- [ ] **Step 2: Draft `#7` Spot 6 (Asia False Relief -> `silence drop` -> `-26°C+` Winter & `75%` Extinction)**

Spend `~15s` selling fake calm picnic victory, drop music/VO cleanly for `0.8s` (`silence drop`) as the sun dims, then dedicate `~65s` to serious atmospheric dread, global temperature falling *by at least 26°C*, food-chain collapse, and `[3D #5]` frozen globe. Zero slapstick jokes inside the peak extinction beats.

- [ ] **Step 3: Draft `#8` Spot 7 (Underground Burrow Climax — `Clock ∞`)**

Weave together: (a) Tí Hon's ankle-height scale callback (`Ep 2`); (b) unnamed Cretaceous small burrowing mammal roommate; (c) soil insulation vs `1–3h` oven, silicate dust, and acid rain; (d) biological accuracy (mammal eats stored seeds; T-Rex Tí Hon pulls funny grimace hunting earthworms/grubs from post-impact detrital/fungal soil); (e) Clock crossing `365 ngày` to **`∞`**.

- [ ] **Step 4: Draft `#9` Leaderboard, `#10` Avian Tease (No Full Spoiler) & `#11` Active Spoken End Screen (`3` x `5s` Beats)**

Include:
- `#9` (`34s`): Crisp ranking flip + Day-1 `130 m` crater fill note.
- `#10` (`36s`): Dawn of Cenozoic -> bird chirping -> Tí Hon frozen realizing birds are living theropod dinosaurs + clever **tease toward the dinner plate** (`"Khoan... vậy đĩa cơm trưa nay của con người thì sao?!"`) that sparks curiosity for **Short #3** instead of spending the full joke prematurely.
- `#11` (`37s` total: `22s` poll CTA + `15s` active-voiced animated End Screen split across `3` x `~5s` sub-beats): tail hits Subscribe, narration smoothly pivots to **Episode 2 (8 phút) End-Screen card** (`"Trong lúc chờ Short đĩa cơm, xem lại tập tớ lặn xuống 8 đại dương ở đây — xem đại dương nào làm tớ bay màu sau đúng 8 giây!"`) so retention stays high through the final frame.

---

### Task 5: Vbee Normalization, Word-Count & `shot_lint.py` Pre-Verification

**Files:**
- Create: `docs/ti-hon-ngay-cuoi-khung-long/script-vbee.txt`
- Modify: `docs/ti-hon-ngay-cuoi-khung-long/script-annotated.md`

**Interfaces:**
- Consumes: `script-annotated.md`
- Produces: Plain-text TTS-ready `script-vbee.txt` + audited timing & lint checklist.

- [ ] **Step 1: Export clean spoken text to `script-vbee.txt` with phonetic spellings & pause-aware punctuation**

Normalize foreign nouns (`Yucatán -> I u ca tan`, `Chicxulub -> Chích xu lúp`, `Tanis -> Ta nít`, `Dakota -> Đa cô ta`, `Purdue -> Pơ điu`), convert numbers/units into spoken Vietnamese (`"một nghìn năm trăm ki lô mét"`, `"ít nhất hai mươi sáu độ xê"`, `"bảy mươi lăm phần trăm"`), ensure zero brackets/stage directions remain, and insert natural comma/period pauses around SFX cues (`[pause]`) in `script-annotated.md`.

- [ ] **Step 2: Run word-count & pacing verification script**

Run:
```bash
python3 -c "
p = 'docs/ti-hon-ngay-cuoi-khung-long/script-vbee.txt'
txt = open(p, encoding='utf-8').read()
paras = [x.strip() for x in txt.split('\n\n') if x.strip()]
words = txt.split()
max_p = max(len(x.split()) for x in paras)
est_vo = len(words) / 4.185
print('paragraphs:', len(paras), 'words:', len(words), 'max_para_words:', max_p, 'est_vo_sec:', round(est_vo, 1), 'est_total_with_8s_sfx_tail:', round(est_vo + 8, 1))
assert 2220 <= len(words) <= 2320, f'Word count {len(words)} out of tightened 2220..2320 budget!'
assert 80 <= len(paras) <= 88, f'Paragraph count {len(paras)} out of 80..88 range!'
assert max_p <= 42, f'Longest paragraph {max_p} words exceeds ~10s ceiling!'
"
```
Expected: Assertion passes cleanly (`est_vo_sec` `~530–554s`, total with SFX/tail `~538–562s` = `08:58 – 09:22`, cleanly inside `9–10 phút` without overflowing `600s`!).

- [ ] **Step 3: Audit sub-beat map in `script-annotated.md` against `shot_lint.py --strict` rules**

Verify:
1. First beat `<= 2.5s` and zero `title/logo/intro` tags in `start < 3.0s`.
2. Median beat `1.5–4.5s`, zero beats `< 0.8s`, End Screen `#11` split into `3` sub-beats (`<= 6.5s` each, zero `> 8s` `long-shot` gaps).
3. Zero `twos + mblur` combined shots, `<= 3` total `freeze` frames, `<= 3` same-size runs, and `6` explicit `3d` hero shots mapped.

---

### Task 6: Standalone 9:16 Shorts Scripts & CTR-First Packaging (`shorts-scripts.md`, `packaging.md`)

**Files:**
- Create: `docs/ti-hon-ngay-cuoi-khung-long/shorts-scripts.md`
- Create: `docs/ti-hon-ngay-cuoi-khung-long/packaging.md`

**Interfaces:**
- Consumes: `script-annotated.md`, `research-sources.md`, `docs/SHORTS_RETENTION_PLAYBOOK.md`, Spec v2 §2
- Produces: 3 standalone `45–60s` Shorts scripts (`~185–215` words @ `1.1x` each) + Ep 3 Title/Thumbnail/A-B Test package.

- [ ] **Step 1: Write 3 standalone 9:16 Shorts scripts (`45–60s`, `~185–215` words @ `1.1x`)**

Each Short includes 3 hook variants, vertical 9:16 center-action beats every `2–4s`, safe-zone caption margins, and a **Related Video pointer pushing traffic back to Ep 3 Long-form**:
1. **Short 1 (Tanis `15–30 min`):** *"Con cá này chết 15 phút sau khi thiên thạch rơi, và trong mang nó còn có hạt thủy tinh"*
2. **Short 2 (`1.500 km` Blast):** *"Cách 1.500 km mà vẫn bị nướng chín"*
3. **Short 3 (`Đĩa cơm` Payoff):** *"Khủng long chưa tuyệt chủng, nó đang nằm trên đĩa cơm của bạn"* (completing the punchline teased in Ep 3 `#10`!).

- [ ] **Step 2: Author `packaging.md` (3 Titles + Clean 50/50 Thumbnail Brief + Manual CTR Rubric)**

Include:
- Title A (`59 chars`), Title B (`56 chars`), Title C (`54 chars`) with mobile-cutoff preview at `50/60` chars.
- Clean 50/50 Thumbnail v2 composition brief (`7 CHỖ · 1 SỐNG!` / `CHỈ 1 CHỖ SỐNG?!` A/B variants, meteor vs panicked backpack-gripping Tí Hon + glowing `00:00` clock; **no 7 tiny boxes, no faded ✓, no shovel**; bottom-right `x>1650, y>920` clear).
- **Manual Pre-Publish CTR Check (vidIQ blocked until `15/12`):** mandatory `168×94px` & `320×180px` shrink inspection, zero title–thumbnail phrase overlap check, plus YouTube Test & Compare post-publish metric table (CTR, Viewed vs Swiped Away for Shorts, 0:00–0:45 retention vs Ep 2 baseline).

---

### Task 7: Clean-Context Gate A Review, SHA-256 Freeze & Production Handoff (`script-review-gate-a.md`)

**Files:**
- Create: `docs/ti-hon-ngay-cuoi-khung-long/script-review-gate-a.md`

**Interfaces:**
- Consumes: All files in `docs/ti-hon-ngay-cuoi-khung-long/`
- Produces: Clean-context Gate A score (`>= 9/10`), locked SHA-256 hash of `script-vbee.txt`, and exact initialization handoff instructions for `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/`.

- [ ] **Step 1: Run independent clean-context Gate A evaluation (7 checkpoints)**

Verify strictly without context leakage:
1. **Science & Chronology Parity:** Spot order (`0km -> 1.500km -> Tanis 15-30m -> Crater Resurge 30-60m+ -> Purdue Dust Oven 1-3h -> Asia Winter -26°C+ -> Burrow 365+`), detrital bugs/worms diet, no arboreal *Purgatorius*, accurate `Purdue (Johnson et al., 2026)`.
2. **Emotional Range & Retention:** Fast `<= 42s` start, non-uniform spot durations breaking monotony, true silence/cosmic dread at Spots 5–6, zero spoil counter, active-voiced `15s` End Screen pointing to Ep 2.
3. **Word/Lint Math:** `2,220–2,320` words, `<= 42` max para words, `6` `3D` hero shots, zero `twos+mblur`, `<= 3` freeze frames, End Screen split `<= 6.5s` beats.
4. **Coordinate Safety:** Strict separation `Top HUD y=28..146 | Labels y=160..360 | Cards y=360..850 | Captions y>=940`.
5. **Packaging Synergy:** 3 real titles, no title–thumbnail phrase overlap, clean mobile-first thumbnail (`no 7 boxes / no ✓ / no shovel`).
6. **Shorts Calibration:** All 3 Shorts hit `45–60s` (`185–215` words @ `1.1x`) cleanly.
7. **Speakability:** Zero foreign pronunciation traps in `script-vbee.txt`.

- [ ] **Step 2: Fix all High/Medium findings until Gate A `>= 9/10`**

Apply fixes to `script-annotated.md` and `script-vbee.txt`, re-running Task 5 Step 2 assertion script.

- [ ] **Step 3: Lock SHA-256 & write Project Scaffold Handoff Map**

Compute and record `shasum -a 256 docs/ti-hon-ngay-cuoi-khung-long/script-vbee.txt` inside `script-review-gate-a.md`, plus the exact mapping for the subsequent Vbee + Studio build phase:
- `docs/ti-hon-ngay-cuoi-khung-long/script-vbee.txt` -> send for Vbee Minh Quân `1.1x` synthesis, then save MP3 + verbatim copy as `thanhhai-2d-studio/projects/ti-hon-ngay-cuoi-khung-long/input/{voiceover.mp3,script.txt}`
- `docs/ti-hon-ngay-cuoi-khung-long/research-sources.md` -> `.../story/sources.md`
- `docs/ti-hon-ngay-cuoi-khung-long/bible.md` -> `.../story/bible.md`
- `docs/ti-hon-ngay-cuoi-khung-long/packaging.md` -> `.../out/youtube-title-description.txt` + `thumbnail.mjs` brief
- Enforce `fps: 24`, `-14 LUFS`, `true peak <= -1.0 dBTP` in project `config.json` and `audio/mix.py`.
