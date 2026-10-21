# Brief — can-phong-bua-bon-khong-phai-that-bai

> Director header written by `video-director` (Phase 0 intake, 2026-10-21).
> `script-agent` owns and completes the creative sections below (viewer need, retellable point,
> tone, claim plan, visual identity, differentiation). Director-owned lines are marked and must
> not be edited by producers.

## Identity (director-owned)

- vid: `can-phong-bua-bon-khong-phai-that-bai`
- slug: `can-phong-bua-bon-khong-phai-that-bai`
- composition id: `CanPhongBuaBonReel` (bare name; `pipeline.py resolve_comp` maps it to the
  numbered registry id once the composition is registered — `video:new` assigns the next number)
- profile: `story`
- platform: TikTok / Reels / Shorts (9:16, 1080×1920, 30 fps)
- duration: 30–45 s (user explicit; includes speech, pauses, transitions, ending hold)
- shots: 5–8 (user explicit)
- voice route: **route 2 — local VieNeu-TTS clone**, voice slug `thanh-long-nang-cao`
  (Thanh Long Nâng Cao). Reference: `docs/can-phong-bua-bon-khong-phai-that-bai/voice-ref/refThanhLong.wav`,
  copied from `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav`.
  `md5 -q` = `199de31c8281d895dd571e36fe464ed5` (matches the required hash), `ffprobe` duration
  8.200000 s. **Voice is fixed by the user — no benchmark of other voices, no change.**
- output: `out/can-phong-bua-bon-khong-phai-that-bai-thanh-long-nang-cao-reel.mp4`
- delivery pacing: brisk and natural, short breaths (target rate +4 %…+8 % relative to the
  engine's natural read), but **never** by speeding up the rendered audio file.

## User constraints (verbatim, keep exactly)

- Topic line: **"Căn phòng bừa bộn không phải là thất bại"** — mệt mỏi kéo dài, mừng từng việc nhỏ.
- **Mandatory opening line (verbatim, this is the chosen hook candidate H1):**
  > "Ba ngày rồi bạn chưa dọn phòng. Không phải vì bạn lười."
  It is **one of three** hook candidates; the other two must use a different mechanism
  (bất ngờ/tương phản · khoảng trống tò mò · stake cá nhân cụ thể). All three are scored in the
  brief; H1 stays the chosen one unless Gate A rejects it on evidence.
- Thesis (to be rewritten by `script-agent`, meaning preserved): a messy room is a sign you are
  depleted — not a measure of your worth; today it only takes one small thing, and that small
  thing is worth celebrating.
- Viewer: Vietnamese 20–30, prolonged burnout (work, loneliness, pressure); they look at their
  messy room and blame themselves for being lazy or useless. They need to be **understood**, not
  taught.
- Tone: gentle, close, not preachy, not "healing". **No psychological diagnosis.**
- Allowed as one light closing line: if the tiredness lasts many weeks, tell someone you trust.
  **No phone numbers / hotlines** unless research has an official source with a URL.
- Every statistic or psychological concept used must have a real source in `research.md`;
  if there is no source, drop it.
- Render only the version **with background music**.

## Phase 0 — intake (director, 2026-10-21)

- **Duplicate-topic check — CLEARED.** Searched `docs/` + `src/` (grep on `bừa bộn|don dep|dọn phòng|cốc cà phê|phòng bừa`, plus reading the briefs of `ban-khong-yeu-duoi-chi-da-manh-qua-lau`, `metkhong`,
  `ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu`, `dung-bien-tuoi-30-thanh-ban-an`,
  `lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban`, `thuong-hay-so-bat-dau-lai`,
  `chong-ngoai-tinh-ban-than-vo`, `khoang-trong-trong-buc-tranh`).
  Nearest neighbours and why they are **not** the same core idea:
  - `metkhong` — night alone in a rented room, doing chores, eating alone; message = "you don't have
    to carry everything alone, it's allowed to rest and ask for help". The only lexical overlap is
    one prop ("cốc cà phê nguội", `docs/metkhong/design-spec.md` line 8) and the night-room mood.
    **This video must not resemble it**: different core claim, different palette (see
    differentiation), no night-blue cold room, no "one person doing chores alone" spine.
  - `ban-khong-yeu-duoi-chi-da-manh-qua-lau` — emotional exhaustion + wanting someone to lean on.
  - `dung-bien-tuoi-30-thanh-ban-an` — social milestones as a verdict at age 30.
  - `khoang-trong-trong-buc-tranh` — family/separation story, unrelated.
  No existing video makes the claim "the mess is a symptom of depletion, not a verdict on your
  worth; today one small visible act is enough and worth celebrating".
- **Preflight — `scripts/preflight.py` is MISSING in this repo → manual checks** (raw outputs):

  ```
  $ ffmpeg -version | head -1
  ffmpeg version 9.0.1 Copyright (c) 2000-2026 the FFmpeg developers

  $ node -v
  v22.22.3

  $ npx remotion --version        # prints CLI help banner; version comes from package.json
  $ grep '"remotion"' package.json
  "remotion": "4.0.534"

  $ echo "CHROME_EXECUTABLE=$CHROME_EXECUTABLE"
  CHROME_EXECUTABLE=
  $ ls "/Applications/Google Chrome.app/Contents/MacOS/" | head -1
  Google Chrome

  $ python3 -c "import vieneu"
  ModuleNotFoundError: No module named 'vieneu'
  → VieNeu lives in its own venv: ~/.venvs/vieneu (bin/python present); scripts/gen-voice-clone.py
    is run with that interpreter.

  $ df -h . | tail -1
  /dev/disk3s5   460Gi   361Gi    69Gi    85%    7.1M  720M   1%   /System/Volumes/Data
  → 69 GiB free — enough for a 1080×1920 H.264 render + QA stills.

  $ python3 -m unittest scripts.test_voice_catalog
  .
  ----------------------------------------------------------------------
  Ran 1 test in 0.000s

  OK
  EXIT=0
  ```
- Monitor: `http://127.0.0.1:4180/api/status` responded and lists this video → the existing
  monitor instance is healthy and reused (no second server started).
- Status initialized: `python3 -X utf8 -I scripts/pipeline.py init can-phong-bua-bon-khong-phai-that-bai --comp CanPhongBuaBonReel --voice thanh-long-nang-cao --profile story` → exit 0.
- Voice reference copied and verified:
  ```
  $ mkdir -p docs/can-phong-bua-bon-khong-phai-that-bai/voice-ref && cp docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav docs/can-phong-bua-bon-khong-phai-that-bai/voice-ref/refThanhLong.wav
  $ md5 -q docs/can-phong-bua-bon-khong-phai-that-bai/voice-ref/refThanhLong.wav
  199de31c8281d895dd571e36fe464ed5
  EXPECT 199de31c8281d895dd571e36fe464ed5
  $ ffprobe -v error -show_entries format=duration -of csv=p=0 docs/can-phong-bua-bon-khong-phai-that-bai/voice-ref/refThanhLong.wav
  8.200000
  ```
- **Scripts the skills mention that this repo does NOT have** (recorded truthfully, never reported
  as run): `scripts/preflight.py`, `scripts/tone-probe.py`, `scripts/gen-voice-vc.py`.
  - missing `preflight.py` → manual preflight above.
  - missing `tone-probe.py` → `script-agent` must hand-review stacked-tone words and mark RISK,
    rewriting before Gate A, and write "tone-probe.py missing — manual tone review" in
    `voice-direction.md`.
  - missing `gen-voice-vc.py` → fallback ladder skips route 3 and goes to `accepted-risk`.

## Light mode

Short `story` video → light mode per the base skill (one `research-agent`, one consolidated
research handoff, three Phase-3 branches in one parallel message, one `scene-agent` per 3–4 shots).
Gates A, D, E, B, C, the content and audio branch reviews, fix-loop discipline and file ownership
always stay.

## Clock

Phase 0 started at 2026-10-21T16:25:07Z (unix 1792599907). Target ≤ 600 s wall clock to a
verified deliverable; over budget is recorded as **SLA missed** and the full workflow still runs.
Only ideation may be compressed (3 hooks → choose 1, one visual thesis, ≤ 8 shots, no second
moodboard). Never compress real voice, independent review, render, QA or evidence.

---

## Creative sections — owned by `script-agent`

> Written by `script-agent` (Phase 2a/2b, 2026-10-21). The director-owned sections above are unchanged.
> The full shot table, the timing ledger and the structural self-check live in **`script.md`**;
> the hook comparison lives in **`hook-options.md`**; the performance plan lives in
> **`voice-direction.md`** and **`voice-performance.proposed.json`**.

### Viewer need (one need)

**To stop reading their own messy room as evidence against themselves.** The viewer in their twenties or thirties has been tired for weeks — work, pressure, sometimes loneliness — and the room at home has quietly stopped being looked after. What they want from this video is **not a cleaning method and not a diagnosis**: they want to be *understood*, and they want the accusation in their own head to stop.

### Retellable point (one sentence, in the viewer's own words)

> "Căn phòng bừa bộn không phải là thất bại — nó chỉ nói về hôm nay thôi; hôm nay tôi làm được đúng một việc nhỏ, và việc đó đáng mừng."

### Tone & personality

- **Gentle, close, plain.** A friend in the room with you, not a voice-over about your life.
- **Not preachy, not "healing", not motivational.** The video never says "bạn cần phải…", never says "bạn mạnh lắm", never uses a clinical term, never names a condition or a theory.
- **Understood, not taught.** The self-blame is spoken *for* the viewer (in the viewer's own words), then taken away — never scolded for having it.
- **Warm but unvarnished.** The room is still a mess at the end. The video does not pretend one folded shirt fixes anything; it says the small thing is worth celebrating, and stops there.
- **The speaker is warm at the end and never louder than at the start.**
- **Delivery:** brisk at the hook (it is a fact), unhurried everywhere else (the subject is exhaustion). No whisper, no crying, no forced humour, no uniform reading cadence.

### Claim plan (claim → source)

**This video makes no factual claim.** `research.md` did not exist when the script was written (checked 2026-10-21), so per §User constraints **no statistic and no named psychological concept appears anywhere** — not in the speech, not in the captions, not on screen.

| id | statement | kind | source |
|---|---|---|---|
| — | *no statistic anywhere* | — | **none used.** No number, percentage, duration-of-burnout figure or research finding is spoken or shown |
| — | *no named psychological concept anywhere* | — | **none used.** "Mệt", "hết sức", "lười" are ordinary Vietnamese words, not clinical terms |
| U1 | `Ba ngày rồi bạn chưa dọn phòng. Không phải vì bạn lười.` | **owner wording, verbatim** | §User constraints — the mandated opening line, unchanged |
| U2 | `Căn phòng bừa bộn` / `không phải là thất bại.` (on screen at the re-hook) | **owner wording, verbatim** | §User constraints — the topic line, split into two elements of ≤ 6 words |
| U3 | `Nếu mệt kéo dài mấy tuần, hãy nói với một người bạn tin.` | owner-**allowed** closing line, reworded | §User constraints ("Allowed as ONE light closing line: if the tiredness lasts many weeks, tell someone you trust"). **No hotline and no phone number**, because the brief forbids one without an official sourced URL |
| U4 | the props — cold coffee cup, clothes on a chair, unmade bed, face-down phone, half-drawn curtain, desk lamp | owner-specified staging | §User constraints — the owner's own list of props |
| S1 | every other spoken line | `script-agent`'s own words, staged on screen, **no claim** | `script.md` §3 `source` column, shot by shot |

**If `research.md` lands later**, no statistic may be added without reopening gate A: a sourced claim would have to be voiced, re-timed (there is ~6.7 s of headroom to 45 s, i.e. about 29 syllables) and re-scored. The safe default the brief asks for was taken here.

### Visual identity

**Art-direction thesis (one sentence): _"Chỗ bừa được quay như một bức tĩnh vật, không phải như rác."_** The room is never dirty and never ruined — it is *tired*. The camera treats the cold cup, the heap on the chair and the shoved duvet with the same care it would give a portrait: real late-afternoon light, real dust, real surfaces. The only warm thing in the first half is a blade of sun, and the only new light in the whole video is a desk lamp the viewer sees switched on.

**Palette — six named tokens (these are the only colours allowed in the runtime):**

| token | hex | where it lives |
|---|---|---|
| **Nắng chiều** (late sun) | `#F4E0B4` | the blade of sun through the curtain; the flood at the end |
| **Hổ phách** (amber) | `#C58B4E` | the desk lamp's pool; the accent words inside the captions |
| **Bóng tím** (violet shadow) | `#7C7385` | the shadow side of the room, the wall in shade |
| **Mực tím** (ink violet) | `#3B3540` | the deepest shadow, the frame's base value |
| **Khăn** (linen) | `#EDE4D6` | the shirt, the duvet's lit side, the caption text |
| **Gỗ** (warm wood) | `#8C6A4E` | the desk, the chair frame, the phone body |

**Palette collision check** (against `src/Main.tsx` and every `docs/*/brief.md`): `src/Main.tsx` is near-black `#090909` + gold `#d4a574`; `src/ClaudeMem.tsx` **does not exist in this repo** (checked 2026-10-21 — only `src/Main.tsx` does), and `lam-lai-…` uses its cream `#f5efe6`; `metkhong` is night grey-blue `#141A24` with a `#FFC46B` bulb; `gaplai` night brown `#171310` + `#E8B04B`; `camon` night blue-stone → `#F4C77D`; `cuoc-goi-nho-cua-me` cold day `#E8EEF2` / `#4A90B8` / `#E5484D` and warm `#2B2320` / `#F2A65A`; `dung-bien-tuoi-30-thanh-ban-an` grid paper `#F0F3F0` + charcoal `#3E454B` + red pen `#D23B2E` + highlighter `#FFE24D`; `giac-mo-tu-bo` slate `#1C2229` + ink blue `#243A8C` + aged paper `#EDE4D2`; `ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu` charcoal `#0D0D0D` + `#E8A87C`; `ban-khong-yeu-duoi-chi-da-manh-qua-lau` deep navy + soft grey + amber; `chong-ngoai-tinh-ban-than-vo` gold gradient `#FFD700`. **This video shares none of them**: its hero colour is a **pale, low-saturation gold** (`#F4E0B4`, value 0.79), its only saturated colour is a **muted amber** (`#C58B4E`, value 0.55 — not the glowing `#FFC46B` of `metkhong` nor the bright `#F2A65A` of `cuoc-goi-nho-cua-me`), its shadow is a **violet-grey** (`#7C7385` / `#3B3540`) that appears in **no other brief in `docs/`**, and its base value is a mid-light dust, not near-black.

**Fonts — two roles, two jobs, both Google Fonts with the `vietnamese` subset and both already in `public/fonts/`:**

| role | face | file | used for |
|---|---|---|---|
| **Display / thesis** | **Literata SemiBold** | `public/fonts/Literata-SemiBold-VN.woff2` | the frame-0 cover hook; the two upper-third beat labels (`Căn phòng bừa bộn / không phải là thất bại.` at the re-hook, `Một việc thôi.` at the payoff) — the words the video **states** |
| **Body / caption** | **Be Vietnam Pro SemiBold** | `public/fonts/BeVietnamPro-SemiBold-VN.woff2` | every caption chunk — the words the video **says**. ≥ 54 px glyph height, ≤ 2 lines, ≤ ~28 chars per line, accent words in `#C58B4E` |

**Type collision check.** `metkhong` = DM Serif Display + Be Vietnam Pro; `thuong-hay-so` = Literata + Lexend; `ban-khong-yeu-duoi-chi-da-manh-qua-lau` = Be Vietnam Pro + Literata; `camon` = Lora + Inter; `dung-bien-tuoi-30-thanh-ban-an` = Bitter + Nunito Sans + Caveat handwriting. **Rejected on purpose:** DM Serif Display (it is `metkhong`'s closing-question face), Lexend (`thuong-hay-so`'s caption face), Lora and Inter (`camon`), and the whole handwriting set (`dung-bien-tuoi-30-thanh-ban-an`) — **no handwriting appears anywhere in this video**, because the handwriting there is a ruling, a grid and a red pen, and this video must not resemble it. Literata is used by three existing videos, but as a *bookish* serif it is the right register for a line written to a tired person; the differentiation here is carried by the **palette, the layout (captions in the upper-middle band, not below), the caption face and the shot language**.

**Motion:**

- **Frame-driven only.** No `Date.now()`, no `Math.random()`, no unseeded randomness; the asset scalars are continuous across the runtime.
- **Camera law:** slow pushes (1.00→1.03 / 1.00→1.04), **one** pull-back to the widest frame at the re-hook (1.06→1.00), **one** slow lateral track across the props (1.02→1.00), **one** drift-back at the celebration (1.02→1.00). No whip pans, no zoom punches, no flash cuts, no transitions that are not motivated by the room.
- **Light law:** the sun blade and the desk lamp. **One arrival only** (`L1`, the lamp click at the payoff); `L2` and `L3` are the same two sources widening. The curtain is the through-line device and it opens only in the silent ending.
- **Prop law:** one scalar `fold ∈ 0…1` for the shirt, continuous from `s6` through the ending; `lampOn` flips exactly once and never flips back; the phone never lights up and is never turned over.

**Captions:**

- **Upper-middle band**, the last caption line's baseline at **y ≈ 880 px** in the 1920 px frame — above the lower half, so the floor, the sun blade, the folded shirt and the curtain stay clear. **Nothing in the bottom 210 px** (rule C3). This is a deliberate departure from the lower-third captions of `metkhong`, `cuoc-goi-nho-cua-me` and `thuong-hay-so`.
- ≤ 2 lines, ≤ ~28 characters per line, word-for-word from `voice.proposed.json`; accent words in `#C58B4E`.
- The **frame-0 hook text is the cover headline and doubles as `s1`'s caption** — one text instance, never two layers of the same words.
- Beat labels sit higher, at **y ≈ 210 px**, in the display face. **No floating text cards, no title animation, no logo, no fade-from-black.**

**One video-specific visual signature:** **the blade of light.** A single narrow wedge of late-afternoon sun lying across the floor of a half-drawn curtain — present from frame 0, unchanged through the first five shots, joined by the lamp's amber pool at the payoff, and finally opened into a full flood in the silent ending. It is a recurring **shape of light in the frame**, not a card, a badge or a device laid on top of the picture, and it is the only warm thing in the first half of the video.

### How this differs from every existing video in this repo

Checked against `src/Main.tsx`, `src/videos/registry.ts` and every `docs/*/brief.md` (14 existing briefs). **`CanPhongBuaBonReel` is not in `src/videos/registry.ts`** and no existing video covers this core idea — the Phase 0 duplicate check in the header cleared it.

- **`metkhong`** — the nearest sibling and the one this video must not resemble. *That* video: a **night** rented room, cold grey-blue `#141A24`, one yellow `#FFC46B` bulb, a person **doing chores alone** (changing a bulb, carrying boxes, cooking for one), captions **below**, message = "you may rest and ask for help". *This* video: a **late-afternoon** room, pale gold `#F4E0B4` with violet-grey shadow, the room as a **still life** rather than a chore list, **no chores performed** except one shirt folded, captions in the **upper-middle band**, message = "the mess is a reading of today, not a verdict on your life". Different palette, different hour, different spine, different caption position.
- **`ban-khong-yeu-duoi-chi-da-manh-qua-lau`** — **rain at the window, "the strong one" theme**. Its world is a night street, an umbrella, deep navy, and its ending is a spoken question to the viewer. *This* video has **no rain, no street, no umbrella and no "strong one"**: it is an interior, the subject is the **room as a mirror of energy**, and it ends on a **silent hold with the light opening**, not on a question.
- **`dung-bien-tuoi-30-thanh-ban-an`** — **ruler-on-grid-paper, pencil/red pen**. Its whole world is a sheet of squared paper under a desk lamp, drawn with charcoal, scored in red and highlighted in yellow. *This* video uses **no paper, no grid, no ruler, no pen and no handwriting of any kind**; the object chain is **cup → shirt → curtain → lamp**, and the turn is carried by a **change of light on a real room**.
- **`chong-ngoai-tinh-ban-than-vo`** — a betrayal/divorce story with a gold gradient cover, Space Grotesk, a phone ring as the hook and a CTA line. *This* video has **no second person, no phone call, no gold gradient, no CTA**; the only phone is **face-down and silent**, and the ending is a **held silence**.
- **`cuoc-goi-nho-cua-me`** — a warm **night** scene (`#2B2320` / `#F2A65A`) about a mother's missed call, with captions below and a **red** UI accent (`#E5484D`). *This* video is **daylight**, has **no red**, **no phone UI** and **no family relationship**.
- **`camon`** — dawn blue-stone → `#F4C77D`, Lora + Inter, an old photo and a lone silhouette. *This* video has **no photograph, no silhouette-as-hero, no dawn**; the frame 0 is a **room in full afternoon light**.
- **`xay-doi-minh-hay-chung-minh`** and **`chung-minh-de-lam-gi`** — social comparison, a brick wall, a spotlight chip, a mid-night feed. *This* video has **no feed, no social comparison, no wall, no chip** and no accusation from other people — the accusation comes from the viewer's own inner voice.
- **`giac-mo-tu-bo`** — a childhood dream of being a musician, aged paper, ink blue, a badge that wins, camera below the collarbone. *This* video has **no dream, no badge, no instrument**; the camera law is a slow push on hands and props.
- **`thuong-hay-so`** — two people, a kitchen bowl, a key, red `#FF5A36`, Literata + Lexend. *This* video is **one person alone with a room**, has no second character, no bowl and no red.
- **`ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu`** — charcoal `#0D0D0D` + `#E8A87C`, "you don't have to become someone else to be loved". *This* video is **not about worth, romance or self-acceptance**; it is about **one small act and the light that answers it**.
- **`lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban`** — cream `#f5efe6`, a return to a first home. *This* video is **daylight and dusty**, and the room is not a place to return to but a place to leave **one thing flat**.
- **`tiec-nguoi-hay-nam-thang`** — "regret the person or the months", a flat figure on a dark ground. *This* video has **no flat figure, no black ground** and no regret framing.
- **`src/Main.tsx`** — a terminal-style near-black `#090909` screen with gold `#d4a574` and a typing caret. *This* video is **no terminal, no caret, no near-black, no gold-on-black**; the only motion in frame 0 is a draught moving a curtain.

### Hook scoring — three candidates, and the choice

Full comparison in **`hook-options.md`**. Summary of the three scored on the three axes the brief names (**source support · sound-off comprehensibility · first-frame visual potential**), plus the contract's own tests:

| candidate | mechanism | source support | sound-off comprehensibility | first-frame visual potential | hook clear ≤ 3 s | first payoff < 8 s | clickbait risk | verdict |
|---|---|---:|---:|---:|---|---|---|---|
| **H1** `Ba ngày rồi bạn chưa dọn phòng. Không phải vì bạn lười.` | contrast / relief | **10** | **10** — the whole hook is on screen at frame 0 | **9** — real room, live blade of light, the draught moving the curtain | **10** (2.79 s) | **10** (4.54 s) | very low | **CHOSEN → `s1`** |
| H2 `Căn phòng bừa bộn này đang nói gì với bạn?` | curiosity gap | 8 | 9 | 9 | 10 (2.33 s) | **4** — the answer would arrive at 18.56 s | medium-high | rejected as the opener → **its mechanism is the re-hook `s4`**, answered 1.50 s later by `s5` |
| H3 `Ngày mai bạn lại nhìn cả căn phòng, rồi tự trách mình.` | specific personal stake | 9 | 8 | **7** — the frame would have to illustrate a future event | 10 (2.79 s) | 7 — the promised thing is inverted by the ending | medium | rejected as the opener → **its stake is preserved in `s3`** |

**Why `H1` stays the chosen hook.** It is the **owner's mandated opening line** and it is not unsafe, unclear or clickbait: it removes an accusation in the same breath as it names the situation, it is fully legible with the sound off, and its promise — *the room is not a verdict on you* — is paid in words at `s5`, in an action at `s6` and in light in the silent ending. It also happens to be the only candidate whose first payoff lands inside the 3–8 s window (4.54 s) **and** whose 1–3 s promise matches what the video actually delivers. `H2` and `H3` are not straw-men: **H2's mechanism was re-timed into the re-hook rather than thrown away**, because its 18-second answer would have broken the "withheld answer" rule, and **H3's stake was kept in `s3`**, where the loop is shown rather than predicted.

**Re-hook (named): `s4`** — `Căn phòng này không nói gì về bạn đâu.` — clip starts at **15.97 s** (15.36 / 16.64 / 17.38 / 18.20 s at 4.5 / 4.1 / 3.9 / 3.7 syl/s), inside 15–20 s at every rate in the band. It is a **reveal**, not a repeat: the hook removed the *personal* verdict ("you're lazy"), and `s4` removes the *existential* one ("this is a failure").

### Timing summary

**125 syllables · 38.33 s** at the 4.3 syl/s planning rate (37.03 / 39.74 / 41.30 / 43.03 / 44.96 s at 4.5 / 4.1 / 3.9 / 3.7 / 3.5) — inside 30–45 s for any measured rate between **3.50 and 6.02 syl/s**. 8 shots · 11 voice keys · 9.25 s of planned silence, every second of it a named beat. Full ledger: `script.md` §1.

---

## Shot table — owned by `script-agent`

> Condensed. The authoritative table, with the full action/camera/SFX/source cells and the structural self-check, is **`script.md` §3**. The caption chunks are `script.md` §4.

| # | seconds | VO exact text | on-screen text | action/visual | camera/motion | SFX | source | scene owner |
|---|---|---|---|---|---|---|---|---|
| **s1** · HOOK · COVER · frame 0 | 0.00–3.14 | **Ba ngày rồi bạn chưa dọn phòng. Không phải vì bạn lười.** | `Ba ngày rồi bạn` / `chưa dọn phòng.` / `Không phải vì bạn lười.` (cover headline, doubles as the caption) | the real room in late-afternoon light: half-drawn curtain, one blade of sun on the floor, dust turning in it, clothes on the chair, cold cup + dried ring on the desk, lamp off, phone face-down on the bed, a hand on the chair back | slow push-in 1.00→1.03; the beam slides a few cm as the curtain breathes | room tone + distant street; no SFX cue in the first second | **owner — mandated line, verbatim** | `scene-agent-1` |
| **s2** · FIRST PAYOFF | 3.14–8.57 | **Mệt thì cái gì cũng nặng. Cốc cà phê nguội trên bàn, quần áo trên ghế, giường chưa được gấp.** | — (caption only) | lateral drift across the three props **in the order they are named**: the unsteaming cup → the clothes on the chair → the unmade bed. Light L0 | slow lateral track 1.02→1.00 | room tone; no SFX cue | owner (props + "mệt mỏi kéo dài"); wording is script-agent's | `scene-agent-1` |
| **s3a** | 8.57–11.71 | **Nhìn cả căn phòng, bạn tự nói trong đầu: mình lười thật.** | — (caption only) | she sits on the edge of the bed, seen from behind, and looks away; the phone stays face-down | slow push-in on head/shoulder 1.00→1.03 | room tone | script-agent (staging the audience's own loop) | `scene-agent-1` |
| **s3b** | 11.71–15.97 | **Rồi bạn cũng chỉ nằm xuống thôi. Cả ngày mệt, tối chẳng muốn động gì.** | — (caption only) | she lies down on the duvet, still dressed; **in the hold the face-down phone buzzes once against the sheet** and its screen line flickers | very slow pull-back 1.02→1.00 | one muffled phone vibration against fabric | script-agent — plain wording, no clinical term, no statistic | `scene-agent-1` |
| **s4** · RE-HOOK | **15.97–18.56** | **Căn phòng này không nói gì về bạn đâu.** | `Căn phòng bừa bộn` / `không phải là thất bại.` (beat label, the owner's topic line verbatim) | the camera pulls back to the widest frame and shows the room **square-on for the first time** — same objects, different distance. Light L0, deliberately unchanged | slow pull-back 1.06→1.00 (the only wide) | room tone; no SFX cue | script-agent (re-hook) + **owner** (topic line on screen) | `scene-agent-1` |
| **s5** | 18.56–23.83 | **Nó nói: hôm nay bạn không còn sức làm một việc nhỏ nữa. Nó nói về hôm nay thôi.** | — (caption only) | close on her hand **flat** on the desk beside the unsteaming cup; the lamp switch under her fingertip, unpressed. Light L0 | slow push-in on the hand 1.00→1.04 | room tone; no SFX cue | **owner** (the thesis) restated in plain words by script-agent | `scene-agent-2` |
| **s6** · PAYOFF (the one small act) | 23.83–27.36 | **Hôm nay, chỉ gấp một cái áo lên, đặt lên lưng ghế.** | `Một việc thôi.` (beat label) | **the one small visible act:** one shirt out of the heap, shaken once, folded once, laid flat on the chair back — **and the desk lamp clicks on (L1, the one arrival), its amber pool taking the desk, the cup and the new flat shirt** | push-in on the shirt 1.00→1.03 | the lamp switch click on the accent `lưng ghế`; a soft fabric snap | **owner** ("one small thing") + the clothes-on-the-chair prop; the act is script-agent's staging | `scene-agent-2` |
| **s7a** | 27.36–28.13 | **Xong rồi.** | — (caption only) | her hand stays on the folded shirt for a beat, then lifts away. Light L2 | static 1.00 | room tone; no SFX cue | script-agent — the beat the split key exists for | `scene-agent-2` |
| **s7b** · CLIMAX | 28.13–31.70 | **Một việc nhỏ thôi. Nhưng hôm nay, việc đó đáng mừng.** | — (caption only) | the folded shirt lies flat inside the lamp's amber pool, its crease catching the light; the heap around it is still a heap. Light L2 | slow drift back 1.02→1.00 | room tone; no SFX cue | **owner** ("mừng từng việc nhỏ") | `scene-agent-2` |
| **s8a** | 31.70–33.50 | **Nếu mệt kéo dài mấy tuần,** | — (caption only) | she stands at the window, hand on the curtain's edge, the folded shirt visible behind her. Light L2 | static 1.00 | room tone; the outside starts to be audible | **owner-allowed** closing line | `scene-agent-2` |
| **s8b** · CLOSING LINE (last word) | 33.50–36.70 | **hãy nói với một người bạn tin.** | — (caption only) | same frame; **BGM cuts on the last word at 35.13 s**; in the 3.20 s hold **she draws the curtain fully open and the late gold floods the room (L3)** and reaches the folded shirt | static, then a slow 1.00→1.02 push as the light opens | only room sound: fabric on the rail. No swell, no sting | **owner-allowed** closing line; no hotline, no number, no CTA | `scene-agent-2` |
