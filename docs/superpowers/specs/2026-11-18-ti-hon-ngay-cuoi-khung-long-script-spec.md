# Tập 3 Script Design Spec (v2 — Post-Swarm Review) — Ngày cuối cùng của khủng long: tớ trốn ở đâu thì sống?

**Target Series Slot:** Episode 3 (16:9 Long-form, Mascot v0.7 *"Tí Hon"*)
**Target Runtime:** `9:00 – 9:40` (`540 – 580s` total MP4, including `14–16s` active-voiced animated end screen; zero dead-air ending, zero hard cut to black)
**Target Voiceover Engine:** Vbee **Minh Quân (1.1x)** — calibrated from Episode 2 (`2,015` words in `481.488s` = `251.1 words/min` / `4.185 words/sec` -> **`2,220 – 2,320` Vietnamese words** across `~82–86` paragraphs, guarding against segment-pause overshoot past `10:00`)
**Cross-Episode Funnel Strategy:**
- **Inbound from Episode 2 (`ti-hon-8-dai-duong`):** Ep 2 `input/script.txt` line 145 ends with `"Vì tập sau, tớ sẽ sống qua ngày cuối cùng của loài khủng long. Từng giờ một."` Ep 3 directly resolves that promise in the Cold Open/Setup before turning into the 7 survival trials.
- **Session Funnel (Long -> Long, Shorts -> Long):** Ep 3's end screen points viewers to **Episode 2 (8 phút)** to maximize YouTube Session Watch Time, while the 3 derivative 9:16 Shorts feed viewers from Shorts Feed *back* into Episode 3 Long-form via Related Video links (with Act #10 teasing rather than spoiling Short #3's full chicken-rice joke).

---

## 1. Story Premise, Tone Balance & Core Turn

- **One-Sentence Premise:** Warned right before the Chicxulub asteroid hits on a spring morning 66 million years ago, pocket-sized green T-Rex **Tí Hon** tests **7 hiding spots in escalating chronological & tactical sequence** against a live **Survival Clock** — moving from instant shockwave horror through tsunami, river seiche, global dust-oven heat, and freezing impact winter — until his ankle-high size lets him survive the year inside an **underground mammal burrow**, before discovering birds mean dinosaurs never completely vanished.
- **Tone Balance (No Monotone Slapstick):** Deliberately alternate **comedy/gags** (Spots 1–4 & burrow bugs) with **Kurzgesagt-scale cosmic dread and quiet beats** (`silence drop` + visual scale comparisons in Spot 1 `10–12 km` impactor vs city, Spot 5 `17x` surface heat, and Spot 6 `-26°C+` global darkness / `75%` extinction), giving the final epilogue reveal earned emotional weight.
- **Pocket-Size Payoff:** Tí Hon's `1.7 m` ankle-height size (from Ep 2 Studio) makes him helpless in storms and waves, yet turns into his sole biological advantage in Spot #7 when giant dinosaurs cannot fit underground or sustain winter calorie demand.

---

## 2. Packaging Spec (CTR & Title-Thumbnail Synergy — Resolved)

### A. Three Title Candidates (`< 60` mobile chars prioritized; zero word overlap with Thumbnail text)
1. **Title A (Recommended — High stakes + numbers upfront):**
   `7 Chỗ Trốn Thiên Thạch Hủy Diệt Khủng Long: Chỉ 1 Nơi Sống!` (`59 chars`)
2. **Title B (Series continuity matching Ep 2 winning format):**
   `Ngày Cuối Của Khủng Long: Tớ Sống Được Bao Lâu Ở 7 Chỗ?` (`56 chars`)
3. **Title C (Action survival framing):**
   `Thiên Thạch Rơi! Tớ Trốn Ở 7 Chỗ – Chỉ 1 Chỗ Sống Sót` (`54 chars`)

### B. Split 50/50 Thumbnail v2 (`1920x1080` — Mobile-Legible `< 1.5s`)
- **Left 50%:** Blazing red-orange Chicxulub asteroid tearing through a dark sky toward the bright Yucatán coastline (warm/crisis side).
- **Right 50%:** Close-up wide-eyed panicked **Tí Hon** (yellow safety helmet with glowing red button + trailing orange scarf, clutching backpack strap — **NO shovel**, **NO 7 tiny boxes**, **NO faded `✓` spoiler**), paired with a large glowing **`00:00`** survival clock icon (cool/emerald character contrast).
- **Upper-Center Text (high-contrast backdrop/stroke, max 3–4 words, `~155–175px`):** **`7 CHỖ · 1 SỐNG!`** (Test & Compare A/B alt: **`CHỈ 1 CHỖ SỐNG?!`**) — never repeats `"trốn ở đâu"` from the title.
- **Safe Corner:** Bottom-right (`x > 1650, y > 920`) strictly clear of key visual info for YouTube's duration badge.
- **vidIQ Workaround (blocked until `15/12`):** Replace vidIQ check with a manual mobile-downscale readability check (`168×94px` + `320×180px`), 3-title `< 60` char truncation check, and YouTube's native **Test & Compare** A/B thumbnail run post-publish.

---

## 3. Mascot v0.7 Continuity, Safe Zones & Technical Baseline

1. **Helmet Button Logic & `0s` Auto-Reset:** Keep the signature red `"VỀ NHÀ"` button from Ep 2, adding 1 fast joke line at `#1` explaining Tí Hon flipped a side toggle from *"Về hiện tại"* to *"Tua lại sáng hôm nay"* **with an automatic emergency rewind trigger at `00:00` vaporization** (preventing the plot hole of pressing the button after vaporizing at Spot 1!).
2. **Top-Right Counter (Anti-Spoiler):** Replace Ep 2's countdown-spoiling `6 -> 0` failure counter with a dynamic **per-spot status badge** (e.g., `SỐNG SÓT?`, `NHIỆT: TĂNG VỌT`, `THỨC ĂN: 0`) so viewers cannot guess in advance how many failures remain before Spot #7.
3. **Strict 16:9 Safe-Zone Coordinates (`1920x1080`, `bars: "none"`):**
   - **Top HUD Band (`y = 28..146`):** Top-left `SurvivalClock` (`x = 36..360`), optional top-center `chapterTag` (`y = 24..70`), top-right compact badge (`x >= 1450`, keeping text brief so `tally` stays clear of center).
   - **Upper-1/3 On-Screen Callout Band (`y = 160..360`):** **Strictly bounded `160 <= y <= 360`** for distance badges, `T+HH:MM` clock stamps, and one-line callouts (resolving Ep 2's subtitle collisions without touching Top HUD!).
   - **Mid-Canvas Cards & Action Stage (`y = 360..850`):** Dedicated space for `dangerCard` (~400px tall), scale silhouettes, maps, and Mascot/environment action.
   - **Bottom Captions Scrim (`y = 940..1080`):** Reserved solely for burned-in captions (`y ≈ 1005`) backed by a soft gradient scrim.
4. **Inlined Production Constraints (incorporating user's 5 lessons directly, since `kinh-nghiem-san-xuat.md` is external to this repo):**
   - Lock script & primary scientific verification 100% before Vbee synthesis.
   - Keep labels clear of bottom subtitles (`y = 160..360` / `360..850`).
   - Include **`14–16s` active-voiced animated End Screen** (split into `3–4` sub-beats `<= 6.5s`, zero cut to black).
   - Lock `24 fps` from init, `-14 LUFS`, `true peak <= -1.0 dBTP`.
   - Enforce `shot_lint.py --strict` compatibility (`never combine timing:"twos" and mblur`, `<= 3` freeze frames, first beat `<= 2.5s`, median visual beat `1.5–4.5s`, `5–8` designated `three-kit.js` 3D hero shots).

---

## 4. Revised 12-Segment Timeline ("Từng giờ một" — Chronology Fixed & Re-Weighted)

| # | Est. Time | Words (`~2,265`) | Segment & Logical Progression | Scientific Anchor | Emotional Tone & 3D / Gag Design |
|---|---|---|---|---|---|
| `0` | `0:00–0:18` (`18s`) | `~75` (3p) | **Fast Hook (Cold Open):** Yucatán beach freeze | Incoming asteroid ("star" swells rapidly) | `0:02` flash freeze + `00:00` trembling clock; **no intro card**; `[3D #1]` orbital asteroid horizon glimpse |
| `1` | `0:18–0:42` (`24s`) | `~100` (4p) | **Setup & Ep 2 Bridge:** Spring morning `66 Ma` | Northern Hemisphere **spring** (Tanis fish bones, *Nature* 2022) | Resolves Ep 2's *"từng giờ một"* promise; explains auto-rewind switch on `"VỀ NHÀ"` button + pocket scale reminder |
| `2` | `0:42–1:28` (`46s`) | `~195` (7p) | **Chỗ 1 (`T+00:00`, `0 km`):** Yucatán ground zero | `~10–12 km` impactor hits shallow sea -> `~180–200 km` crater (*Gulick, PNAS 2019*) | **Awe first:** asteroid > Mt. Everest scale comparison + `[3D #2]` crater flash -> instant `00:00` auto-rewind before cheap slapstick |
| `3` | `1:28–2:12` (`44s`) | `~185` (7p) | **Chỗ 2 (`T+00:05`, `~1.500 km`):** Far enough inland? | Blast & thermal pulse reaches `> 900 miles` (~1,450 km) | Popsicle melts in 1s gag (**Short #2** anchor); Lesson: *running far above ground still burns!* |
| `4` | `2:12–2:58` (`46s`) | `~190` (7p) | **Chỗ 3 (`T+00:15–00:30`, `~3.000 km`):** Tanis riverbank (**moved before crater flood!**) | `M~10–11` quake arrives in `15–30 min`, triggering river *seiche* + **tektite glass spherules** in gills (*DePalma 2019 / During 2022*) | `[3D #3]` valley surge + helmet `lộp độp` glass hail gag (**Short #1** anchor); Lesson: *inland rivers flood & rain molten glass!* |
| `5` | `2:58–3:44` (`46s`) | `~190` (7p) | **Chỗ 4 (`T+00:30–01:00+`):** Deep coastal ocean hideout | Tsunami spreads out, then sea resurges *back* into crater bowl (`~30+ min`, part of `~130 m` Day-1 deposits — *Gulick 2019*) | Washed out & sucked backward like a spinning washing machine; Lesson: *open shallow seas turn into blenders!* |
| `6` | `3:44–4:48` (`64s`) | `~265` (9p) | **Chỗ 5 (`T+01:00–03:00`):** Inland dense forest | Re-entering ejecta + fine silicate dust thermal lid heats surface like an **oven** for `1–2+ hours` -> global wildfires (*Johnson et al., Purdue, JGR: Biogeosciences 2026*) | `[3D #4]` glowing red atmospheric shell; brief forest pond `"nồi lẩu"` gag -> shifts into choking smoke/wildfire dread + 1s split preview of Asia sky at Hour 1 |
| `7` | `4:48–6:08` (`80s`) | `~330` (12p) | **Chỗ 6 (`Hour 1 -> Months 1–12`):** Far away in Asia | Hour 1 eerie sky tint (*Grady & Benton*), followed by sulfate/soot sunblock dropping global mean surface temp **by at least 26°C** (*Brugger et al., GRL 2017*, land sub-freezing) & **`~75%` extinction** | **Peak emotional & cosmic dread:** false picnic celebration -> `silence drop` -> `[3D #5]` frozen dim Earth globe -> starving giant dinosaur silhouettes (ZERO slapstick here!) |
| `8` | `6:08–7:28` (`80s`) | `~325` (12p) | **Chỗ 7 (`Day 0 -> 365+`):** Underground mammal burrow (**Climax**) | Soil insulates against `1–3h` infrared heat pulse & dust/acid rain; Late Cretaceous **small burrowing mammals** + **detrital food web** (fungi, worms, insects) + low calorie budget allow survival | `[3D #6]` cutaway burrow; **ankle-high pocket size payoff** lets Tí Hon fit beside small burrowing mammal (*not arboreal Purgatorius!*); mammal nibbles seeds while T-Rex Tí Hon reluctantly hunts post-impact earthworms/grubs -> **Clock hits `∞`** |
| `9` | `7:28–8:02` (`34s`) | `~135` (5p) | **Leaderboard Recap:** 7 Spots Ranked | `~130 m` crater fill in Day 1 (*"First day of Cenozoic"*) | Crisp card-flip `#7 -> #1` speed summary (`2–3s` per rank) |
| `10` | `8:02–8:38` (`36s`) | `~145` (5p) | **Final Epilogue Twist:** Survivors didn't vanish | Living birds (*Aves*) = surviving theropod dinosaurs | Melancholic sunrise over new spring -> chirping bird shadow lands beside a **steaming restaurant plate tease** (`"Khoan... con đó là HỌ HÀNG tớ?!"` -> directs curiosity to **Short #3** without burning full punchline!) |
| `11` | `8:38–9:15` (`37s`: `22s` CTA + `15s` Active End Screen) | `~130` (4p: 2+2) | **CTA + Active-Voiced End Screen:** Zero dead air! | Poll question + Session retention bridge | Tail presses Subscribe + **15s live narration continues over animated end screen (`3` x `5s` sub-beats)** pointing viewers to **Episode 2 (8 phút)** + teasing Episode 4! |

---

## 5. Status of Previous Open Questions (Resolved for v2)

All 3 former open items are now resolved cleanly in Spec v2:
1. **`VỀ NHÀ` button:** Kept visually identical (`"VỀ NHÀ"` red helmet button) with a 1-line switch joke (`"Tua lại sáng hôm nay"`) + automatic safety rewind trigger at `00:00` vaporization.
2. **Chronology & Chỗ 7 biology:** Tanis (`15–30m`) moved before crater ocean resurge (`30–60m+`); `"arboreal Purgatorius"` & `"T-Rex eating seeds"` corrected to an unnamed Late Cretaceous small burrowing mammal + detrital/worm diet for Tí Hon.
3. **Counter, HUD bounds & Ending:** Removed countdown-spoiling `6 -> 0` counter; tightened safe bounds (`Top HUD y=28..146`, `Upper Labels y=160..360`, `Mid Cards y=360..850`, `Captions y>=940`); replaced `18s` silent outro with `15s` active-voiced animated end-screen split into 3 sub-beats.
