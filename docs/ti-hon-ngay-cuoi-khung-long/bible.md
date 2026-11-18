# Continuity Bible, Safe-Zone Spec & Re-Weighted Word Budget — Tập 3

**Episode:** Tập 3 — *Ngày cuối cùng của khủng long: tớ trốn ở đâu thì sống?* (`ti-hon-ngay-cuoi-khung-long`)  
**Series Slot:** Long-form 16:9 (`1920x1080`, `24 fps`, `bars: "none"`), Mascot v0.7 (*Tí Hon*)  
**Target Voiceover:** Vbee **Minh Quân (1.1x)** (`~251.1 words/min` / `4.185 words/sec`, calibrated from Episode 2 `ti-hon-8-dai-duong`)  
**Fact Lock Anchor:** [`docs/ti-hon-ngay-cuoi-khung-long/research-sources.md`](./research-sources.md) (single source of truth for all paleontological numbers, citations, and forbidden misstatements).  
**Series Continuity Anchor:** [`thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/bible.md`](../../thanhhai-2d-studio/projects/ti-hon-8-dai-duong/story/bible.md).

---

## 1. Story Continuity & Cross-Episode Funnel

- **Inbound Bridge from Episode 2:** Episode 2 (`ti-hon-8-dai-duong`) ended with Tí Hon promising: *"Vì tập sau, tớ sẽ sống qua ngày cuối cùng của loài khủng long. Từng giờ một."* Segment `#1` resolves this promise directly before launching the 7 chronological survival trials (`00:00` -> `Day 365+`).
- **Core Dramatic Premise:** On a Northern Hemisphere spring morning 66 million years ago, pocket-sized green T-Rex **Tí Hon** tests **7 hiding spots** in chronological order against a live **Survival Clock** — moving from instant Chicxulub blast/thermal shock, Tanis seismic seiche, crater tsunami resurge, and the fine-dust global infrared oven into multi-year impact winter — until his tiny ankle-high size turns from a fatal handicap into his sole biological advantage inside an **underground mammal burrow**.
- **Outbound Funnel:**
  - **Segment `#10` (Epilogue):** Teases living avian dinosaurs (*Aves*) via a chirping bird shadow beside a steaming restaurant plate (`"Khoan... con đó là HỌ HÀNG tớ?!"`), sparking curiosity toward **Short #3** without spoiling Short #3's full chicken-rice punchline.
  - **Segment `#11` (CTA + Active `15s` End Screen):** Directs viewers back to **Episode 2 (8 phút)** for YouTube Session Watch Time and teases Episode 4 over live Vbee narration (zero dead air).
- **Scientific Parity & Vbee Spoken Normalization Rule:**
  - Every numeric stat and upper-1/3 label token (`10–12 km`, `180–200 km`, `130 m`, `>30 phút`, `15–30 phút`, `3.000 km`, `1.500 km`, `1–3 giờ`, `ít nhất 26°C`, `75%`) MUST match `research-sources.md` verbatim in `script.md`, captions, and upper-1/3 labels.
  - When preparing Vbee narration scripts (`voice.txt` / TTS payloads), normalize mathematical and degree symbols (`>`, `°C`) into natural spoken Vietnamese (e.g., `>30 phút` -> `"hơn 30 phút"`, `>900 dặm` -> `"hơn 900 dặm"`, `ít nhất 26°C` -> `"ít nhất 26 độ C"`), while keeping the locked numeric tokens intact in display captions and HUD labels.
  - Strictly obey all 7 Forbidden Misstatements in `research-sources.md`:
    1. Always say **`"nhiệt độ trung bình toàn cầu giảm thêm ít nhất 26°C"`** (never *"giảm xuống còn 26°C"*).
    2. Never name or depict *Purgatorius* as a ground burrower (`Chester et al., 2015, PNAS` proved arboreal tarsals); use unnamed **small Late Cretaceous burrowing mammals** (*thú nhỏ đào hang thời Phấn Trắng muộn*).
    3. Carnivorous Tí Hon eats **earthworms and burrowing grubs** from the post-impact detrital food web (`Vajda & McLoughlin, 2004`), **never** seeds or nuts (which sustain the small mammal).
    4. Hour 1 in Asia/Europe/New Zealand brings an **eerie sky color shift** (`Benton & Grady`), not instant crater blast destruction.
    5. Hour `1–3 giờ` surface oven (`~17x` lethal human radiation) is caused by re-entering molten spherules trapped beneath a **fine silicate dust thermal lid** (`Brandon C. Johnson et al., 2026`), not local volcano lava alone.
    6. Keep **`130 m`** Day-1 crater melt/resurge fill + **`>30 phút`** ocean resurge (`Gulick et al., 2019`) distinct from Tanis's **`15–30 phút`** / **`3.000 km`** seismic seiche + tektite rain (`DePalma et al., 2019`).
    7. State that **non-avian dinosaurs** vanished (`~75%` of species), while **avian dinosaurs (*Aves*)** survived.

---

## 2. Mascot v0.7 Episode 3 Continuity (`scenes/cast.js`)

- **Species & Proportions:** Chubby pocket-sized green *T. rex* (`s=1` ~195 logical units tall), **ankle-high relative to a `1.7 m` adult human silhouette** (locked from Episode 2 Studio). Short two-fingered arms cannot reach the top of his own head without using his tail.
- **Locked Character Palette:**
  - Main body: `#4fb856`
  - Dark limbs / tail shading: `#368a3d`
  - Cream belly: `#f2eab0`
  - Dorsal ridges: `#ff8c3a`
  - Crisp ink line: `#0e1410`
- **Signature Accessories (v0.7):**
  - **Orange scarf** (`#f97316` base, `#fb923c` highlight, `#c2410c` knot) with dual trailing tails driven by frame-deterministic `swing` + wind phase.
  - **Safety helmet** (`#eab308` yellow dome, `#334155` visor brim) topped with the **glowing red `"VỀ NHÀ"` button** (`#ef4444`) pressed by Tí Hon's tail (`tailPress >= 0.85`).
- **Episode 3 Button & Auto-Rewind Logic (`"Tua lại sáng hôm nay"`):**
  - Visually preserves the exact Ep 2 `"VỀ NHÀ"` red helmet button.
  - Segment `#1` includes 1 fast comedic line showing Tí Hon flipped a side toggle on the helmet button from `"Về hiện tại"` to **`"Tua lại sáng hôm nay"`**, armed with an **automatic emergency rewind trigger at `00:00` vaporization**.
  - Whenever an extreme failure vaporizes or instantly kills Tí Hon (e.g., Spot #1 at `00:00`), the helmet auto-triggers the rewind before plasma impact completes — closing any plot hole about pressing a button after turning to ash.
  - **Cartoon-Only Harm Rule:** All catastrophic hazards resolve through stylized cartoon-only harm (flash-freeze silhouette, soot puffs, melting popsicle, tumbling wash, `00:00` auto-rewind zip) — zero gore, graphic trauma, or realistic injury.
- **Episode 3 Props & Costume States:**
  - Lightweight explorer backpack strap (no shovel in thumbnail or burrow entry — the Late Cretaceous burrowing mammal dug the shelter).
  - Scene props: melting popsicle (`#3`), helmet deflection sparks from falling tektite glass hail (`#4`), tiny backup float & goggles (`#5`), damp sweatband/smoke cough (`#6`), tight scarf wrap & frost breath (`#7`), helmet headlamp cone + muddy snout / earthworm prop (`#8`), reading glasses & pointer (`#9`), cross bandage / warm morning scarf (`#10–#11`).
- **Deterministic Animation Contract:** `act()` anticipation/overshoot on pose transitions, `boilPose` panic jitter, `squash` on landings/impacts, `exprAt` cross-faded expressions, `saccade` eye darts, and 7-shape Vietnamese lip-sync (`visemeAt`), computed exclusively from Remotion frame numbers (never wall-clock time or unseeded randomness).

---

## 3. Anti-Spoiler Top-Right Status Badge & Survival Clock States

- **Anti-Spoiler Rule:** Episode 2's countdown-spoiling failure tally (`6 -> 0` remaining) is **retired**. The Top-Right Status Badge (`x >= 1450`) displays a **dynamic per-spot danger/status readout (`TRẠNG THÁI`)** so viewers never know in advance how many failed spots remain before Spot #7.

| Seg | Segment Name | Top-Left `SurvivalClock` (`y=28..146`) | Top-Right Status Badge (`x >= 1450`) |
|---|---|---|---|
| `#0` | Fast Hook (Cold Open) | `00:00` (trembling) | `TRẠNG THÁI: SẮP VA CHẠM` |
| `#1` | Setup & Ep 2 Bridge | `T-00:05` (Xuân 66 Ma) | `MỤC TIÊU: SỐNG SÓT?` |
| `#2` | Chỗ 1: Yucatán (`0 km`) | `00:00` (auto-rewind flash) | `ÁP SUẤT: HỦY DIỆT` |
| `#3` | Chỗ 2: Đất liền (`1.500 km`) | `00:05` | `NHIỆT: THIÊU ĐỐT` |
| `#4` | Chỗ 3: Sông Tanis (`3.000 km`) | `00:15 -> 00:30` | `MƯA ĐÁ THỦY TINH` |
| `#5` | Chỗ 4: Hố va chạm (`>30 phút`) | `00:30 -> 01:00+` | `XOÁY NƯỚC: CỰC ĐẠI` |
| `#6` | Chỗ 5: Rừng rậm (`1–3 giờ`) | `01:00 -> 03:00` | `NHIỆT: LÒ NUNG 17x` |
| `#7` | Chỗ 6: Châu Á -> Mùa đông | `GIỜ 1 -> NĂM 1–3` | `TRỜI TẮT NẮNG / GIẢM ≥26°C` |
| `#8` | Chỗ 7: Hang thú nhỏ (Climax) | `NGÀY 1 -> 365+ -> ∞` | `CHỖ TRỐN: SỐNG SÓT` |
| `#9` | Leaderboard Recap | `∞` (locked) | `XẾP HẠNG: 7 CHỖ` |
| `#10` | Epilogue: Chim / Đĩa ăn | `HIỆN TẠI` | `HẬU DUỆ: CÒN SỐNG` |
| `#11` | CTA + Active `15s` End Screen | `TẬP 2 -> TẬP 4` | `CHỌN TẬP TIẾP THEO` |

---

## 4. Strict 16:9 Safe-Zone Coordinates (`1920x1080`, `bars: "none"`)

Every scene, HUD overlay, upper-1/3 label, mid-canvas card, and subtitle MUST obey these exact `y` bands so zero text overlaps subtitles or HUD elements:

| Band | Exact Coordinates | Allowed Elements & Guardrails |
|---|---|---|
| **Top HUD Band** | `y=28..146` | Top-left `SurvivalClock` (`x = 36..360, y = 28..146`); optional top-center `chapterTag` (`y = 28..70`, strictly inside `y=28..146`); top-right anti-spoiler status badge (`x >= 1450`, `y = 28..120`, concise text staying clear of center). |
| **Upper-1/3 Labels** | `160 <= y <= 360` | Distance badges (`0 km`, `1.500 km`, `3.000 km`), `T+HH:MM` clock stamps, and one-line locked numerical stats (`10–12 km`, `180–200 km`, `130 m`, `>30 phút`, `15–30 phút`, `1–3 giờ`, `ít nhất 26°C`, `75%`). Strictly inside `160 <= y <= 360` — zero collision with Top HUD or Mid Cards. |
| **Mid Cards & Stage** | `360 <= y <= 850` | `dangerCard` (~400px tall), scale comparison silhouettes (impactor vs Mt. Everest, Tí Hon vs 1.7m adult), regional maps, burrow cutaway stage, and Mascot/environment action. |
| **Bottom Captions** | `y >= 940` | Reserved solely for burned-in Vietnamese captions (`baseline y ≈ 1005`) backed by a soft dark gradient scrim (`940..1080`). All props, scale bars, and cards stay at `y <= 915` (`<= 850` for primary cards). |
| **Thumbnail Safe Corner** | `x > 1650, y > 920` | Kept clear on the `1920x1080` Split 50/50 Thumbnail so YouTube's duration badge never covers Tí Hon's face or the `00:00` clock. |

---

## 5. Five Production Lessons (Inline Self-Contained Rules)

All 5 production lessons are embedded directly below (zero external `kinh-nghiem-san-xuat.md` dependency):

1. **100% Script & Science Lock Before Vbee Synthesis:** Lock every scientific claim, number, and phrasing against `research-sources.md` and this `bible.md` before calling Vbee TTS; post-synthesis word edits break measured durations and lip-sync cues.
2. **Strict Upper/Mid Label Separation From Subtitles:** Keep all distance tags, clock stamps, and stat cards inside `160 <= y <= 360` and `360 <= y <= 850`, leaving `y >= 940` (`baseline y ≈ 1005`) exclusively for captions.
3. **`14–16s` Active-Voiced Animated End Screen:** Split the `15s` end screen into `3` animated sub-beats of `5s` each (`<= 6.5s` per beat) with continuous Vbee voiceover pointing to Episode 2 and teasing Episode 4 — zero silent tail and zero hard cut to black.
4. **Lock Render & Loudness Specs From Init:** Lock `24 fps` (`1920x1080`, `bars: "none"`), `-14 LUFS` integrated loudness, and `true peak <= -1.0 dBTP` from initial scaffold through final master mix.
5. **`shot_lint.py --strict` Compatibility:** Never combine `timing: "twos"` with motion blur (`mblur`); limit freeze frames to `<= 3` across the entire video; hit the opening visual hook within `<= 2.5s` (`0:02` flash freeze); maintain a median visual beat duration of `1.5–4.5s`; and deploy `5–8` designated `three-kit.js` 3D hero shots (`6` locked below).

---

## 6. Re-Weighted 12-Segment Word, Paragraph & Runtime Budget

- **Total Target Words:** **`2,265` words** (strict allowed envelope: **`2,220–2,320` words**).
- **Total Target Paragraphs:** **`82` paragraphs** exact segment sum (target envelope: **`82–86` paragraphs**, target `~82–84`, matching automated `80..88` bounds).
- **Total Target Runtime:** **`~541s` pure Vbee VO** (`2,265 words / 4.185 wps`) + **`~14–15s` inter-segment tail/breaths** = **`~555s` (`9:15`)** — comfortably inside `9:00–9:40` (`540–580s`) and safely below `10:00`.
- **Opening Budget:** `#0 + #1 = 42s / 175 words / 7 paragraphs` (`<= 42s` fast opening).

| # | Segment & Chronology | Est. Time | Words | Paras | Core Beats & Scientific Anchor |
|---|---|---|---|---|---|
| `#0` | **Fast Hook (Cold Open)** — Yucatán beach freeze | `18s` | `~75` | `3` | `0:02` flash freeze + `00:00` trembling clock; no intro card; `[3D #1]` orbital impactor glimpse. |
| `#1` | **Setup & Ep 2 Bridge** — Spring morning `66 Ma` | `24s` | `~100` | `4` | Resolves Ep 2 *"từng giờ một"*; Northern Hemisphere **spring** (`During et al., 2022`); `"Tua lại sáng hôm nay"` + `00:00` auto-rewind toggle; `1.7 m` ankle-height reminder. |
| `#2` | **Chỗ 1 (`T+00:00`, `0 km`)** — Yucatán Ground Zero | `46s` | `~195` | `7` | `10–12 km` impactor vs Mt. Everest scale -> `180–200 km` crater (`Gulick et al., 2019`); `[3D #2]` crater rim flash -> `00:00` auto-rewind. |
| `#3` | **Chỗ 2 (`T+00:05`, `1.500 km`)** — Inland Distance Test | `44s` | `~185` | `7` | Blast & thermal pulse reaches `1.500 km` (`>900` miles); 1s melting popsicle gag (**Short #2** anchor). |
| `#4` | **Chỗ 3 (`T+00:15–00:30`, `3.000 km`)** — Tanis Riverbank | `46s` | `~190` | `7` | Seismic waves arrive in `15–30 phút` at `3.000 km` -> river standing *seiche* + molten tektite glass rain lodging in fish gills (`DePalma et al., 2019`; `During et al., 2022`); `[3D #3]` valley surge + helmet `lộp độp` hail gag (**Short #1** anchor). |
| `#5` | **Chỗ 4 (`T+00:30–01:00+`)** — Crater Ocean Resurge | `46s` | `~190` | `7` | Outgoing tsunami surges *back* into crater bowl (`>30 phút`), contributing to `130 m` Day-1 melt rock & resurge breccia fill (`Gulick et al., 2019`); washing-machine spin gag. |
| `#6` | **Chỗ 5 (`T+01:00–03:00`, `1–3 giờ`)** — Forest Oven | `64s` | `~265` | `9` | Re-entering spherules + fine silicate dust thermal lid (`>1,000 km³` vaporized rock) heats ground to `~17x` lethal human threshold within `1–3 giờ` (`1–2+` hr onset) + global wildfires (`Johnson et al., 2026`); `[3D #4]` glowing atmospheric shell; brief pond `"nồi lẩu"` gag -> wildfire dread + 1s split glimpse of Asia sky at Hour 1. |
| `#7` | **Chỗ 6 (`Giờ 1 -> Tháng 1–12`)** — Asia -> Impact Winter | `80s` | `~330` | `12` | Hour 1 eerie sky color shift (`Benton & Grady`) -> false picnic celebration -> **Silence Drop #1** -> `[3D #5]` frozen globe; sulfate/soot sunblock drops global mean temp **by at least 26°C** (`ít nhất 26°C`, ~3 yrs below 0°C) & **`75%` extinction** (`Brugger et al., 2017`); starving giant dinosaur silhouettes (zero slapstick). |
| `#8` | **Chỗ 7 (`Ngày 0 -> 365+`)** — Underground Mammal Burrow (Climax) | `80s` | `~325` | `12` | **Silence Drop #2** -> `[3D #6]` 3D burrow cutaway; soil shields against `1–3 giờ` infrared pulse (`Robertson et al., 2004`); **ankle-height payoff** lets Tí Hon fit beside unnamed **small Late Cretaceous burrowing mammal** (NOT *Purgatorius*, `Chester et al., 2015`); mammal eats stored seeds while Tí Hon eats **earthworms & grubs** from fungal/detrital food web (`Vajda & McLoughlin, 2004`) -> **Clock hits `∞`**. |
| `#9` | **Leaderboard Recap** — 7 Spots Ranked (`#7 -> #1`) | `34s` | `~135` | `5` | Rapid `2–3s` card-flip countdown from `#7` (0s) to `#1` (Burrow `∞`), echoing `130 m` Day-1 crater record ("first day of the Cenozoic"). |
| `#10` | **Final Epilogue Twist** — Avian Survivors | `36s` | `~145` | `5` | New spring sunrise; non-avian dinosaurs vanished (`75%`), yet **avian dinosaurs (*Aves*)** survived; bird shadow lands by steaming restaurant plate tease (`"HỌ HÀNG tớ?!"` -> **Short #3** bridge). |
| `#11` | **CTA + Active `15s` End Screen** (`22s` CTA + `15s` End Screen) | `37s` | `~130` | `4` | `2` CTA paras (poll + tail Subscribe press) + `2` spoken end-screen paras over `3 × 5s` animated sub-beats pointing to **Episode 2 (8 phút)** + Episode 4 tease. |
| **SUM** | **12 Segments (`#0..#11`)** | **`555s` (`9:15`)** | **`2,265`** | **`82`** | **`~541s` VO + `~14–15s` tail/breaths; `6` 3D hero shots; 100% fact-locked** |

---

## 7. Eight Distinct Lighting & Color Environments

No two consecutive spots or narrative blocks share the same color palette or lighting mood:

| # | Env Key | Used In | Palette & Lighting Direction | Emotional Mood |
|---|---|---|---|---|
| `1` | `yucatan_coast` | `#0`, `#1`, `#2` (Chỗ 1) | Bright spring turquoise sea & golden sand (`#38bdf8` / `#fef08a`) snapping into blinding white-amber impact plasma (`#fff7ed` / `#f97316`). | Playful Dawn -> Cosmic Shock |
| `2` | `inland_arid` | `#3` (Chỗ 2 — `1.500 km`) | Scorched terracotta, bone-dry red-ochre plains & harsh horizontal heat-shimmer rim light (`#c2410c` / `#fdba74` / `#451a03`). | Panic Comic (1s melting gag) |
| `3` | `tanis_river` | `#4` (Chỗ 3 — `3.000 km`) | Misty olive-jade river valley & slate water (`#0f766e` / `#34d399` / `#1e293b`) streaked with glowing amber tektite hail (`#fbbf24`). | Startled Chaos / Hail Gag |
| `4` | `crater_abyss` | `#5` (Chỗ 4 — Resurge) | Stormy slate-cobalt & churning seafoam indigo (`#0f172a` / `#1d4ed8` / `#38bdf8`) with violent swirling underwater light shafts. | Claustrophobic Spin Panic |
| `5` | `forest_oven` | `#6` (Chỗ 5 — `1–3 giờ`) | Superheated copper-crimson canopy & charcoal ash (`#7f1d1d` / `#ef4444` / `#1c1917`), choking backlit ember drift. | Burning Dread (hot-pot -> wildfire) |
| `6` | `asia_winter` | `#7` (Chỗ 6 — Winter) | Opens in eerie bruised violet-amber Hour-1 dusk (`#581c87` / `#d97706`), plunging into desaturated ice-slate & soot-black starless gloom (`#020617` / `#334155` / `#cbd5e1`). | Uncanny Calm -> Sub-Zero Tragedy |
| `7` | `burrow_earth` | `#8` (Chỗ 7 — Burrow) | Deep warm chocolate-umber soil cutaway (`#451a03` / `#78350f`), cozy amber headlamp cone & subtle pale fungal accents (`#fde68a` / `#a3e635`). | Quiet Shelter -> Cozy Burrow Relief |
| `8` | `new_spring` | `#9` (`new_spring_recap`), `#10–#11` (`new_spring_dawn`) | Sub-variant `new_spring_recap` (`#9`): clean studio indigo-slate (`#1e1b4b` / `#6366f1`) for Leaderboard flip. Sub-variant `new_spring_dawn` (`#10–#11`): sunlit pastel sky & fresh emerald meadow (`#e0f2fe` / `#86efac` / `#fef9c3`). | Crisp Recap -> Wonder Twist -> Upbeat Ep 2 Hand-off |

---

## 8. Six Designated `three-kit.js` 3D Hero Shots & Music Intensity Arc (`1..5`)

### A. 6 `three-kit.js` 3D Hero Shots (Strict `5–8` Shot Budget)
1. **`[3D #1]` Segment `#0` (Fast Hook):** Orbital Chicxulub asteroid sweeping across Earth's curved sunlit horizon toward the Yucatán shelf.
2. **`[3D #2]` Segment `#2` (Chỗ 1 — Ground Zero):** 3D Chicxulub crater rim & peak-ring explosion cavity (`10–12 km` impactor -> `180–200 km` crater).
3. **`[3D #3]` Segment `#4` (Chỗ 3 — Tanis):** 3D Tanis river valley walls & seiche standing wave surging forward beneath glowing tektite trajectories.
4. **`[3D #4]` Segment `#6` (Chỗ 5 — Forest Oven):** 3D glowing red-amber atmospheric thermal shell of re-entering spherules & fine silicate dust trapping infrared heat downward.
5. **`[3D #5]` Segment `#7` (Chỗ 6 — Impact Winter):** 3D rotating Earth globe shrouded in dark sulfate/soot clouds as frost creeps from poles to equator (`ít nhất 26°C` drop).
6. **`[3D #6]` Segment `#8` (Chỗ 7 — Burrow Climax):** 3D cutaway underground burrow demonstrating surface thermal/frost insulation above Tí Hon and the small burrowing mammal below.

### B. Music Mood & Intensity Arc (`1..5`) & Mandatory Silence Drops

| Seg | Intensity (`1..5`) | Musical Texture & Mood | Special Audio / Mix Cue |
|---|---|---|---|
| `#0` | `4 -> 5` | Snappy curiosity pluck -> rising cosmic sub-braaam | Hard stop at `0:02` flash freeze; VHS rewind zip into `#1`. |
| `#1` | `2` | **Playful Dawn** — bouncy marimba & light woodwinds | Crisp toggle click on `"Tua lại sáng hôm nay"`. |
| `#2` | `5 -> 4` | **Cosmic Shock** — orchestral brass swell -> sub-bass flash | Auto-rewind synth sweep at `00:00` plasma peak. |
| `#3` | `4` | **Panic Comic** — fast pizzicato chase + thermal hiss | Comic sizzling SFX on 1s popsicle melt. |
| `#4` | `4` | **Startled Chaos** — rolling timpani + kinetic staccato | Metallic/ceramic `lộp độp` tektite hail pings on helmet. |
| `#5` | `4` | **Ocean Spin** — swirling low-pass strings + roaring surf | Underwater muffled filter during crater vortex spin. |
| `#6` | `3 -> 5` | **Burning Dread** — brief quirky pluck -> ominous low drone + crackle | Heat-shimmer riser building into global wildfire roar. |
| `#7` | `2 -> 0 -> 4` | **Uncanny Twilight -> Sub-Zero Tragedy** — thin glassy pad -> **Silence Drop #1** -> mournful solo cello & icy wind | **SILENCE DROP #1 (Spot #6 Winter):** Hard drop to `0` (`~0.8–1.2s` breath) right after Asia picnic celebration before the dark sunless `ít nhất 26°C` drop & `75%` extinction reveal. |
| `#8` | `0 -> 1 -> 3` | **Quiet Stillness -> Cozy Burrow Relief** — **Silence Drop #2** -> subterranean drip -> warm acoustic kalimba/guitar swell | **SILENCE DROP #2 (Spot #7 Burrow Reveal):** Cut icy wind to quiet underground stillness at burrow entrance before warm cutaway & `∞` chime. |
| `#9` | `3` | **Crisp Recap** — rhythmic marimba & clean UI ticks | Crisp `2–3s` rank-flip whooshes (`#7 -> #1`). |
| `#10` | `2 -> 3` | **Wonder Twist** — hopeful dawn strings & flute | Morning birdsong -> comedic record scratch on restaurant plate tease. |
| `#11` | `3` | **Upbeat Ep 2 Hand-off** — warm energetic series outro groove | Tail Subscribe pop + balanced `-14 LUFS` bed under `15s` active end screen. |
