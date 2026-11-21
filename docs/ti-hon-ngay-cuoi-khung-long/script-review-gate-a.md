# Gate A Script Lock & Whole-Package Verification — Tập 3

**Episode Slug:** `ti-hon-ngay-cuoi-khung-long`  
**Series:** Tí Hon Khoa Học — Tập 3 (*Ngày cuối cùng của khủng long: tớ trốn ở đâu thì sống?*)  
**Branch:** `feat/tap-3-khung-long-script`  
**Canonical Vbee Source:** [`script-vbee.txt`](./script-vbee.txt)  
**Locked SHA-256 (`script-vbee.txt`):** `7b42bdc446b55ac4888adba4cb6b261b8215ae0004d241689f26a8c0ff1577eb`  
**Gate A Status:** **LOCKED PASS — Approved for Vbee Minh Quân (`1.1x`) Synthesis**

---

## 1. Whole-Branch Independent Review Baseline (`df0d2fb8`)

- **Reviewed Range:** `7800d71..c702a7c` (Tasks 1–6 full diff, reviewed by clean `superpowers-code-reviewer` `df0d2fb8`, `Model: pro`)
- **Initial Reviewer Score & Verdict:** **`8.3 / 10 — REVISE`** (`0 Critical`, `4 Important`, `3 Minor`)
- **Pass-Clean Checkpoints:** Scientific & chronological parity (`research-sources.md` -> `script-annotated.md`), `9:16` / `16:9` coordinate safe-zone enforcement, Emotional Range structure (`0:02.2` freeze, `SILENCE DROP #1/#2`, non-uniform pacing).

---

## 2. Resolved Gate A Findings (Single Fix Pass + TDD RED->GREEN Verification)

| Severity | Finding from Gate A Review (`df0d2fb8`) | Applied Fix Across Files | Fresh Post-Edit Verification |
|---|---|---|---|
| **Important #1** | `shot_lint.py --strict` failure in `#9` (`P70–P73`, `7` consecutive `data` beats) | Varied `b70b` -> `close`, `b71b` -> `medium`, `b72b` -> `insert` in `script-annotated.md` (`b69a..b73b` strictly alternating) | **PASS:** `max_consecutive_same_size = 2` (`<= 3` across all `164` beats) |
| **Important #2** | Title char-count typos (`56`/`54` claimed vs actual `55`/`53`) and Title–Thumbnail phrase overlap in `packaging.md` | Locked actual lengths (`59`, `55`, `53` chars `< 60`); updated Thumbnail v2 display text in `§2–§4` to **Variant A (`SỐNG NỔI 0 GIÂY?!`)** & **Variant B (`TRỐN ĐÂU CHO THOÁT?!`)** with zero phrase duplication | **PASS:** Python length assertion (`59`, `55`, `53` exact) & stale variants (`7 CHỖ · 1 SỐNG!`, `CHỈ 1 CHỖ SỐNG?!`) absent |
| **Important #3** | Vbee `1.1x` speakability traps (`I u ca tan`, `sôn khí`, flat `.` on questions in `script-vbee.txt` & Shorts 1–2) | Normalized `Diu ca tan`, `xon khí`; added `?` across `10` rhetorical/CTA questions in `script-vbee.txt` (`P03, P23, P29, P47, P58, P64, P78, P79x2, P82`) + Short 1 (`2` `?`) & Short 2 (`2` `?`) | **PASS:** `I u ca tan = 0`, `sôn khí = 0`, `digits = 0`, `symbols = 0`, `? = 10` in `script-vbee.txt` |
| **Important #4** | Timing drift in `#2–#5` (`-8.9s` VO deficit), `8.4s` unscripted CTA pause in `#11` (`P79–P80`), & `P82` `9:15` vs `9:15.5` mismatch | Shifted `P08–P78` timestamps proportionally to `0:42–8:49`, rebalanced `#11` (`8:49–9:19`: `15s` CTA `P79–P80` + `15s` 4-beat active End Screen `P81–P82`), synced `bible.md §6` (`559s / 9:19`, `2,271` words) & `packaging.md` chapters (`00:00..08:49`) & Mid-video Hold (`3:57–7:39`) | **PASS:** Zero beat gaps/drifts across all `82` rows / `164` beats, exact end `559.0s (9:19)`, 3-way chapter/bible sync `100%` |
| **Minor #1** | `"khổng lồ"` over-narrowing on non-avian dinosaur extinction in `P76` HUD caption & Short 3 | Removed `"khổng lồ"` from `P76` HUD caption (`khủng long không bay đã tuyệt chủng...`) and Short 3 (`Mọi con khủng long không biết bay đều gục ngã...`) | **PASS:** Verified clean across `script-annotated.md:105` & `shorts-scripts.md` (`Short 3: 189w`) |
| **Minor #2** | Short 1 `"chết đúng mười lăm phút"` implied overly narrow precision inside `15–30 phút` window | Softened to `"chết chỉ khoảng mười lăm phút"` in Short 1 table + copy-paste block (`188` words) | **PASS:** Verified in both Short 1 table and Vbee block |
| **Minor #3** | Vbee phrasing polish (`P01` `"mốc không giây"`, `P06` `"tua lại sáng hôm nay"`, `P34` `"vụn đá sóng thần"`, `P73` `"cùng người bạn thú tí hon"`, `P81` varied ending `"nào"`) | Applied all 5 phrasing improvements across `script-annotated.md` & `script-vbee.txt` | **PASS:** `100%` column-4 parity verified between `script-annotated.md` and `script-vbee.txt` |

---

## 3. Final Locked Deliverables & Metrics

| Deliverable | Verified Metrics | SHA / Status |
|---|---|---|
| [`research-sources.md`](./research-sources.md) | 7 locked claims, 10 numeric tokens, 7 forbidden misstatements, verified citations | **LOCKED (Gate A Source)** |
| [`bible.md`](./bible.md) | Mascot v0.7, auto-rewind `00:00`, `4` safe-zone `y` bands, `6` 3D slots, `2,271` words / `559s (9:19)` | **SYNCED & LOCKED** |
| [`script-annotated.md`](./script-annotated.md) | `82` rows (`P01–P82`), `164` beats (`max_streak = 2`), `2` freezes, `6` 3D hero shots, `0` `twos+mblur`, exact `0:00–9:19` | **LOCKED** |
| [`script-vbee.txt`](./script-vbee.txt) | `82` paras, **`2,271` words** (`~542.6s` VO + `~16s` SFX/silence = `559s`), `max_para = 32w`, `0` digits/symbols, `10` `?` marks | **SHA-256 LOCKED (`7b42bdc4...1577eb`)** |
| [`shorts-scripts.md`](./shorts-scripts.md) | Short 1 (`188w`), Short 2 (`191w`), Short 3 (`189w`), `0` non-TTS tokens, 3 hook options/Short | **LOCKED** |
| [`packaging.md`](./packaging.md) | 3 titles (`59`, `55`, `53` chars `< 60`), 50/50 Thumbnail v2 (Variant A/B zero phrase overlap), 12 chapters (`00:00..08:49`), manual CTR rubric | **LOCKED** |

*(Note: Under `executing-plans`, post-review fixes are verified deterministically via TDD RED->GREEN assertions rather than running a duplicate whole-branch re-score.)*

---

## 4. Production Handoff Contract (`Task 7 -> Vbee & Phase 3 Remotion`)

1. **Synthesize Voice First (No Unapproved Text Drift):** Feed [`script-vbee.txt`](./script-vbee.txt) (`SHA-256: 7b42bdc446b55ac4888adba4cb6b261b8215ae0004d241689f26a8c0ff1577eb`) verbatim into Vbee **Minh Quân (`1.1x`)**, plus the 3 copy-paste blocks in [`shorts-scripts.md`](./shorts-scripts.md). Save real `mp3` + measured `voice-durations.ts` into the Episode 3 project workspace before freezing final Remotion frame counts.
2. **Custom Procedural Audio & Mixing:** Generate `custom/clock_tick_buzz.wav` and series SFX under `-14 LUFS` integrated loudness, true peak `<= -1.0 dBTP`, honoring `Silence Drop #1` (`#7`, Asia false picnic -> winter drop) and `Silence Drop #2` (`#8`, Spot #7 burrow entry).
3. **Remotion Scene Implementation (`src/videos/ti-hon-ngay-cuoi-khung-long/` or `thanhhai-2d-studio/`):**
   - Preserve Episode 3 `y` band segregation (`Top HUD y=28..146` with `chapterTag` at `y=28..70`, `Upper-1/3 Labels 160 <= y <= 360`, `Mid Cards 360..850`, `Captions y >= 940`).
   - Run `shot_lint.py --strict` across generated timelines (`max_consecutive_same_size <= 3`, `freezes <= 3`, `twos+mblur == 0`).
   - Render both Thumbnail Variants (`1920x1080`) with bottom-right corner (`x > 1650, y > 920`) unobstructed and execute the `168x94px` mobile shrink check in [`packaging.md`](./packaging.md).
   - Keep `bible.md` deferred non-blocking design clarifications visible during asset implementation: (a) cartoon-only physical comedy/harm boundary (`bible.md:47`), (b) explicit `chapterTag y=28..70` inside Top HUD (`bible.md:82`), and (c) distinct `new_spring_recap` (`#9`) vs `new_spring_dawn` (`#10–#11`) studio palette shift (`bible.md:140`).
4. **Delivery Rules:** Follow `AGENTS.md` Google Drive `Videos-shorts` (`1rtJF9zDWuFZ8_6IixdMew3WCZj8415-D`) sequential folder archive + source PR rules (`NO` GitHub Release MP4s; `NO` auto-publishing).
