# Script review — giac-mo-tu-bo · lens A (fidelity / sources & claims / user constraints)

Reviewer: `script-reviewer` (clean context; I did not write this packet). Scope of this file: **rubric items 1 (fidelity), 6 (source accuracy), 9 (profile content test) and user-constraint compliance only.** Hook (item 2), specificity (item 8), timing (item 5), spoken naturalness (item 4), visual feasibility (item 7) and voice-direction feasibility (item 10) are scored by other lenses; I do not re-score them, but I do check that no *claim* or *constraint* is broken.

Runtime note: this runtime has **no shell / process-execution tool**, so I could not re-run `python3 -I scripts/pipeline.py audit giac-mo-tu-bo`. The director reports it ran → `ok` (exit 0). I read the artifact and its cross-references directly; every citation I could check by reading, I checked.

---

## Round 1 · lens A (fidelity/claims/constraints)

### 1 · Read as a viewer first (before the rubric)

Read the 17 spoken keys at their planned durations with the sound off in my head. **What I felt / understood:** I promised myself a guitar, then life — a badge, an inbox, one deferred sentence — took the years; years later the list I wrote in hope is a page I read with pity; I am allowed to stop wanting to be a musician, and one buzzing chord is enough. **Where attention could drop:** at `s4` (9.21–11.26 s), the office routine — it is deliberately the flattest read (script.md:224) and a viewer who has not yet seen the notebook can drift here; the `s6` dead-screen hold (18.10–18.35 s) is the second soft spot. The `s7` re-hook (18.35 s) recovers it.

### 2 · Score table (my three items)

| # | item | score | evidence |
|---|---|---:|---|
| 1 | **Fidelity** — mandated lines verbatim, user intent kept | **9.5** | No mandatory lines exist (`request.md:31–33`); all 12 owner lines survive in `script.md` §3, 11 verbatim and L1 with only the documented two-syllable opener `Ngày trước,` dropped (`script.md:14`, `brief.md:46–52`); 129/131 owner syllables kept, 46 `[ADD]` labelled (`script.md:57`, `script.md:429–439`); owner's own `…` kept in `s13` (`voice.proposed.json:15`). Held under 10 by the open question in ticket A1 (instrument presence at `s14`/`s15`). |
| 6 | **Source accuracy** — no claim without source, inferences not stated as fact | **9** | Every row of the claim plan (`brief.md:80–102`) and every `source` cell of `script.md:219–238` resolves to `S1` or a named research fact; `I1`/`I3`/`I4` are labelled, not asserted (`script.md:223,226,227,231`; `research.md:60–66`); no `U1–U5` is filled (`research.md:68–73`). Held at 9 by four **Thấp** provenance defects (tickets A2–A5), none of which touches a content claim, a total, an owner line or a hook. |
| 9 | **Profile content test (`story`)** | **9** | Consistent hero acting each beat via the camera law (`script.md:165–188`, actor table `:404–414`); expressive close-ups without a face (`script.md:189–192`); situation (`s1`–`s6`) → turn (`s7`–`s11`, contrast pair CP1 `script.md:343–355`) → ending (`s12`–`s16`) all earned; captions word-for-word from `voice.proposed.json`, headline replaces caption on `s1`/`s5b`/`s15` (`script.md:249–273`). Theme `Ước mơ · Nuối tiếc · Khao khát sống thật` all present (`request.md:8`). |

**Lens-A mean = (9.5 + 9 + 9) / 3 = 9.17 → 9.2. No Cao/Trung ticket open → verdict on this lens: `pass`.**

### 3 · Fidelity line map — the owner's 12 lines → `script.md`

Owner source: `request.md:9–20`, mirrored verbatim in `research.md:79–91` and `brief.md:33–44`.

| # | owner line (abbrev.) | lands in | verbatim? | note |
|---|---|---|---|---|
| L1 | `Ngày trước, bạn từng nói mình sẽ học đàn.` | `s1` (`script.md:221`) | **minus opener** | `Ngày trước,` (2 syl) dropped so the hook is a two-clause sentence inside 3 s; `từng` already carries the past sense; drop recorded `script.md:14`, `brief.md:46–52`. Cover headline also drops `mình` (`hook-options.md:93–94`). Meaning unchanged. |
| L2 | `Bạn đã lưu cả một danh sách những bài hát muốn chơi.` | `s2` (`:222`) | **yes** | byte-for-byte in `voice.proposed.json:3` |
| L3 | `Rồi bạn đi làm.` | `s1` 2nd sentence (`:221`) | **yes** | merged with L1; staged at `s4` (`:224`) |
| L4 | `Mỗi lần định mua đàn, bạn lại nghĩ: 'Để khi nào rảnh.'` | `s5a` + `s5b` (`:225`, `:226`) | **yes** | split across a real gap because a cloned voice cannot pause; join = 8 + 4 = 12 syl = whole line |
| L5 | `Vài năm sau, trong một buổi dọn nhà, bạn tìm thấy cuốn sổ có danh sách ấy.` | `s7` (`:228`) | **yes** | re-hook |
| L6 | `Chữ viết ngày xưa vẫn còn nguyên.` | `s9` (`:230`) | **yes** | |
| L7 | `Bạn ngồi đọc, thấy thương người đã viết ra nó.` | `s10` (`:231`) | **yes** | `I3` labelled (pity, not self-blame) |
| L8 | `Người ấy đâu biết sau này mình sẽ bận đến thế.` | `s11` (`:232`) | **yes** | |
| L9 | `Có thể hôm nay bạn không còn muốn trở thành nhạc công nữa.` | `s12` (`:233`) | **yes** | `U4` respected (no musical future claimed) |
| L10 | `Nhưng nếu vẫn thích âm thanh của cây đàn…` | `s13` (`:234`) | **yes, incl. owner's `…`** | `…` kept in text, not performed (`script.md:291`) |
| L11 | `Bạn có thể học một hợp âm.` | `s14` (`:235`) | **yes** | |
| L12 | `Không phải để bù lại những năm đã qua. Chỉ để được vui với một điều mình từng yêu thích.` | `s16` (`:237`) | **yes** | debt refused out loud |

**Syllable audit (independent recount):** owner lines = 9+12+4+12+17+7+10+11+13+9+7+20 = **131** (`brief.md:46–48` = 131 ✅). Kept = 131 − 2 = **129** ✅. Per-key counts in `script.md:35–54` sum to **175** = 129 owner + 46 `[ADD]` (`s3` 9 + `s4` 8 + `s6` 11 + `s8` 9 + `s15` 9 = 46 ✅). No owner meaning is changed or lost; nothing owner-authored is dropped beyond the documented two-syllable adverb.

### 4 · Claim / source verification (item 6)

| claim as the video makes it | spoken | source cell | verdict |
|---|---|---|---|
| said they would learn guitar, then went to work | `s1` | `S1` L1+L3 (`script.md:221`) | owner's own words ✅ |
| kept a list of songs they wanted to play | `s2` | `S1` L2 verbatim (`:222`) | ✅ |
| page is thin, blue-ballpoint, written half-way | `s3` `[ADD]` | `S1` L5 + `I4` **labelled design choice** (`:223`) | labelled, not asserted as sourced fact ✅ (see A1) |
| every morning a badge, a full inbox | `s4` `[ADD]` | `S1` L3 + research §4 item 6; **no job title/company/number** (`:224`, `U1`) | staging, no invented fact ✅ |
| `Để khi nào rảnh.` | `s5a`/`s5b` | `S1` L4 verbatim; `F11`/`F12` in the wild (`:225–226`) | ✅ |
| finger stopped on `Mua ngay`, screen off | `s6` `[ADD]` | inference **`I1` labelled**; hovering, not buying (`:227`, `U2`) | labelled, no purchase asserted ✅ |
| found the notebook years later | `s7` | `S1` L5 verbatim (`:228`) | ✅ |
| dust covering the cover, one finger streak | `s8` `[ADD]` | `S1` L5 + research §4 item 2 (`:229`) | staging ✅ |
| old handwriting still intact | `s9` | `S1` L6 verbatim (`:230`) | ✅ |
| sat reading, felt sorry for the writer | `s10` | `S1` L7 + `I3` labelled (`:231`) | ✅ |
| that person did not know how busy they'd be | `s11` | `S1` L8 verbatim (`:232`) | ✅ |
| today may no longer want to be a musician | `s12` | `S1` L9 verbatim (`:233`) | ✅ |
| but if they still like the sound of the guitar | `s13` | `S1` L10 verbatim; off-camera note = staging (`:234`) | ✅ |
| they can learn one chord | `s14` | `S1` L11 verbatim; worth grounded `F5`/`F6`/`F15` (`:235`) | ✅ |
| a chord, slightly buzzing, fingers not used to it | `s15` `[ADD]` | `F8` (S3) + `F6` (S2) (`:236`) | staging from a research fact ✅ |
| not to make up for it — only to be glad | `s16` | `S1` L12 verbatim; corroborated `F5`/`F17`/`F19` (`:237`) | ✅ |
| topic line (silent card) | `END` | owner topic line (`request.md`), on-screen only (`:238`) | ✅ used correctly |

**Unknowns not filled (checked):** U1 no age/gender/city/job-title/year-count anywhere (`s4` shows no legible name/number/logo; camera below the collarbone, `script.md:171–175`); U2 no purchase shown (`s6` finger stops short; `s14`/`s15` cropped tighter than 10 cm, `script.md:196–203`); U3 no song titles (list never resolves into words, `script.md:179`); U4 no musical future claimed (`s12` lets the musician go, `script.md:233`); U5 tenderness left to the voice stage (`script.md:231`, `voice-direction.md:157`). ✅

### 5 · User-constraint compliance

| constraint | source | verdict |
|---|---|---|
| duration **50–60 s** (explicit override over the 30–45 s default) | `request.md:8`, `brief.md:13–17` | plan totals 50.97–59.81 s across the modelled band, break-evens 3.586/4.510 (`script.md:70–95`); targets the override, not the default ✅ (feasibility itself = item 5, other lens) |
| 9:16 1080×1920 @30 fps | `request.md:23`, `script.md:3` | ✅ |
| mandatory lines | `request.md:31–33` = **none** | none claimed as mandatory; the 12 supplied lines are treated as the source/spine with meaning preserved (`brief.md:32–52`) ✅ — no violated verbatim lock |
| **no forced CTA / no forced sentiment** | `brief.md:64–70`, `script.md:416–422`, `voice-direction.md:116–129` | no CTA anywhere; `END` has no handle/sign-off; no advice, no "bạn nên", no "không bao giờ là quá muộn" ✅ |
| profile `story` content test | `SKILL.md:323` | situation → turn → ending earned; captions support the scene (`script.md:249–273`) ✅ |
| owner notes `làm thật kĩ` / `không đc phép làm ẩu` | `request.md:41,43`, `owner-notes.md` N1/N2 | every shot row carries all 7 cells, every claim cites a source, `minh hoạ` labels on the two recreated screens, `U1–U5`/`I1` carried as a written list (`brief.md:72–76,179–187`) ✅ |
| END card uses the owner's topic line correctly | `request.md:7`, `script.md:450–453` | `Có những giấc mơ` / `bạn đã âm thầm từ bỏ`, on screen only, silent, within the ≤6-word element cap and declared as needing **no** cap exception ✅ |
| brief's duration-conflict note accurate | `brief.md:14–17` vs `request.md:8,23` | accurate: structured field says "30–45 s", topic prose says "50–60 giây" ✅ — **except** the sibling analogy (A3) |

### 6 · Tickets (all **Thấp**; no Cao / no Trung open)

`id | severity | where | evidence | concrete change | owner | acceptance check`

- **A1 | Thấp | `script.md:223` (`s3` spoken line), `script.md:196–203`** | The `s3` spoken line says `chữ bút bi xanh` (blue ballpoint), but blue ink is **`I4`, a design choice never in the owner's account** (`research.md:64`). It is labelled in the *source cell* but spoken to the viewer as a description of the object, and it is the only `[ADD]` line that puts a design choice into the voice. Secondarily, `s14`/`s15` show an instrument being played; the packet's defence (`script.md:196–203`, off-camera note at `s13`) keeps U2 unfilled but the design/scene phase must never add a possession cue (case/strap/pick/price). | Keep the blue ink as an **image-only** design choice: rewrite `s3` to `Trang sổ mỏng, chữ viết tay, viết dở.` — or, if the colour is kept in the voice, add one clause to §7 stating the ink colour is a stated design choice and never an owner fact. | script-agent | `s3`'s spoken text either contains no colour word, or §7 carries the explicit design-choice clause; `script.md` §2.4 still shows no ownership cue in `s14`/`s15`. |
- **A2 | Thấp | `script.md:493`, `voice-direction.md:73`, `voice-performance.proposed.json:658`, `brief.md:493`** | The packet states the same-voice run has "per-clip values from **3.58 to 4.01** (lines 17–27)" of `docs/thuong-hay-so-bat-dau-lai/voice-report.md`. I recounted lines 17–27: 3.91, 3.85, **4.22** (s4a), 3.61, 3.87, 3.58, 4.01, 4.13, 4.01, 4.00, 3.78 — min **3.58** ✅ but max **4.22**, not 4.01. | Rewrite the four occurrences to "**3.58 to 4.22** (lines 17–27)" or restrict the cited line range to those clips. | script-agent | all four occurrences read `3.58`–`4.22`; the 3.9 avg citation at `:34` (207 syl / 52.6 s) is untouched and still correct. |
- **A3 | Thấp | `brief.md:16`** | "the topic prose wins, exactly as the sibling video `ban-khong-yeu-duoi-chi-da-manh-qua-lau` honoured its **prose duration** as an explicit override." The sibling has **no `request.md`**, and its theme/topic lines (`docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/brief.md:14–15`) carry no duration; its override is recorded only as "user explicit override" (`:9`). "Prose duration" is unverifiable. | Rewrite: "…as the sibling video's explicit **45–55 s** owner override shows, an explicit owner duration outranks the repo default." | script-agent | the analogy no longer asserts a "prose" provenance the sibling's files cannot show. |
- **A4 | Thấp | `script.md:489`, `voice-direction.md:71`, `voice-performance.proposed.json:658`** | The packet cites `docs/motion-design-lab/script.md:23` as the source for "4.1 syl/s is a planning convention, not a measurement". That file is **absent from the repo on this machine** (directory `docs/motion-design-lab/` does not exist). The underlying quote is recoverable verbatim from `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/script-review.fidelity.md:502`. | Either restore/verify the cited file, or re-cite to a present source (the sibling review's quote), or restate the claim without the file+line citation. | script-agent | each occurrence cites a path that exists, or drops the file citation; the rate plan (3.9) is unaffected. |
- **A5 | Thấp | `brief.md:122`** | "verified unused anywhere in the repo (`grep -r Manrope` over `*.tsx/ts/json/md/css`: **no matches**)". Repo-wide grep now returns 4 matches, all inside this brief itself. The claim was true before the brief existed; stated as a live "no matches" it is now self-referentially false. | Rewrite: "verified unused in any **other** repo file (`grep -r Manrope` excluding this brief: no matches)". | script-agent | the claim no longer asserts a state the file itself contradicts. |

Nothing above is a Cao or Trung: none changes a total, an owner line, a hook, a constraint, or a claim about the character.

### 7 · Weakness hunt (≥3, each with a rewrite)

1. **`s3` speaks a design choice (`chữ bút bi xanh`).** Rewrite: `Trang sổ mỏng, chữ viết tay, viết dở.` — keeps the sensory beat, removes the one spoken `I4`.
2. **The sibling-duration analogy overstates its evidence (`brief.md:16`).** Rewrite: "…as the sibling video's explicit 45–55 s owner override shows, an explicit owner duration outranks the repo default."
3. **The per-clip range is wrong by a whole clip (`3.58–4.01` → `3.58–4.22`).** Rewrite: "with per-clip values **3.58 to 4.22** (lines 17–27 of that file; s4a = 4.22)."
4. **The rate-provenance citation points at a file the repo no longer contains (`docs/motion-design-lab/script.md:23`).** Rewrite: cite the recoverable quote in `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/script-review.fidelity.md:502`, or drop the file+line and keep the definitional claim.

### 8 · Previous-round fixes

Not applicable — **round 1**, and no prior `script-review.md` section exists for this vid. This is the first gate-A review.

### 9 · What I could NOT verify

- **`python3 -I scripts/pipeline.py audit giac-mo-tu-bo`** — no shell in this runtime; the director reports `ok` (exit 0). Not re-run here.
- **`docs/motion-design-lab/script.md`** — absent from the repo on this machine (see A4). I could not read the cited line.
- **The sibling video's duration provenance** — no `request.md` exists in `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/` (see A3).
- **Anything rendered or heard** — no render exists at gate A; captions/cover legibility (design/content branch), measured voice rate (voice branch) and delivered emotion (audio branch) are downstream.
- **The voice reference WAV** — `docs/giac-mo-tu-bo/voice-ref/thanh-long-nang-cao-ref.wav` is declared `pending` on all 17 shots by design (`voice-performance.proposed.json:20–29`); nothing in the packet claims it exists, and I confirm it does not (the packet says so honestly).

### Verdict (lens A)

**Fidelity is exemplary, claim integrity is sound, and every user constraint holds.** All five open tickets are **Thấp** documentation/provenance hygiene; none touches a content claim, a mandated line, the hook, the duration or a constraint. Lens-A mean **9.2 → `pass`**.
