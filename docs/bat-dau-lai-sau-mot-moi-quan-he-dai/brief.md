# Brief — bat-dau-lai-sau-mot-moi-quan-he-dai

> Director header written by `video-director` (Phase 0 intake, 2026-10-21T17:07Z).
> `script-agent` owns and completes the creative sections below. Director-owned lines are marked
> and must not be edited by producers.
> **Runtime used for this video: OpenCode** — roles dispatched with the native `subagent` tool
> (`agent: "<role>"`, one child session per role), the OpenCode path of the base skill's
> "Runtime mapping". A separate `codex exec` process was not used; OpenCode custom agents are the
> installed equivalent (`~/.opencode` role files mirror `.agents/roles/`).

## Identity (director-owned)

- vid: `bat-dau-lai-sau-mot-moi-quan-he-dai`
- slug: `bat-dau-lai-sau-mot-moi-quan-he-dai`
- composition id: `BatDauLaiSauMoiQuanHeDaiReel` (bare name in status; `pipeline.py resolve_comp`
  maps it to the numbered registry id once `video:new` assigns the next number)
- profile: `story`
- platform: TikTok / Reels / Shorts — 9:16, 1080×1920, 30 fps
- duration: **30–40 s (explicit override of the 30–45 s default)** — render/verify always with
  `--min-seconds 30 --max-seconds 40`
- shots: **5–7**
- speech budget: Thanh Long measured ≈ 4.1 syllables/s → **≈100–125 syllables total**, the rest is
  breaths, planned gaps and the final hold
- voice route: **route 2 — local VieNeu-TTS clone**, slug `thanh-long-nang-cao` (Thanh Long Nâng Cao).
  Reference `docs/bat-dau-lai-sau-mot-moi-quan-he-dai/voice-ref/refThanhLong.wav`, copied from the
  canonical reference. `md5 -q` = `199de31c8281d895dd571e36fe464ed5` (matches the required hash),
  `ffprobe` duration `8.200000` s. **Fixed by the owner — no other voice, no benchmark.**
- delivery pacing: brisk and natural (+4…+8 % perceived rate, short breaths) achieved by **writing
  shorter sentences**, never by speeding up a rendered file.
- output: `out/bat-dau-lai-sau-mot-moi-quan-he-dai-thanh-long-nang-cao-reel.mp4`
- narration person: **first person "Tôi", consistent for the whole video** (the hook is first person).

## User constraints (verbatim, keep exactly)

- Topic: **"Bắt đầu lại sau một mối quan hệ dài"** — những thói quen của "hai người" còn sót lại khi
  chỉ còn một.
- **Mandatory opening line = s1, verbatim, hook candidate H1:**
  > "Tôi vẫn mua hai phần ăn theo thói quen. Đến lúc tính tiền mới nhớ giờ chỉ còn mình."
- Thesis (rewritable, meaning preserved): the habits of two people do not vanish in a day; starting
  over is not erasing the other person, it is slowly learning to take care of yourself again —
  starting with **one portion of food that is just for you**.
- Viewer: 22–35, just out of a long relationship (years, possibly cohabiting), still living by the
  routines of two. They need to be told this is normal — **not** "just get over it".
- Visual: everyday, concrete, real light — checkout counter / rice shop with **two boxes**, hand
  hesitating; a pair of toothbrushes; the empty chair opposite; a message typed then deleted.
  Payoff: **one portion for one person, eaten properly, light warming up.** No melodrama, no crying,
  no visible face of the ex.
- Tone: gentle, real, no blame, no platitudes ("rồi sẽ ổn", "buông bỏ đi"). No psychological
  diagnosis. Any statistic/concept needs a real source in `research.md`, otherwise drop it.
- **Differentiation confirmed by the owner — this is a NEW video; do not stop to ask again:**
  - `thuong-hay-so-bat-dau-lai` = stay-or-leave, **before** the breakup; uses "two bowls facing each
    other" + the rice-cooker warm-light motif.
  - `tiec-nguoi-hay-nam-thang` = missing the person or the years, **while deciding to stop**.
  - This video = **after it has ended**, the routines of two remain. Must not reuse wording, hook,
    layout or cover of those two; **avoid the "two bowls facing each other" frame** — use a checkout
    counter / takeaway boxes.
- Render only the version **with background music**.

## Phase 0 — intake (director, 2026-10-21T17:07Z)

- **Duplicate-topic check — CLEARED.** Read `brief.md` + `script.md` of
  `thuong-hay-so-bat-dau-lai`, `tiec-nguoi-hay-nam-thang`,
  `lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban`; also checked `chong-ngoai-tinh-ban-than-vo`,
  `khoang-trong-trong-buc-tranh`, `metkhong`, `ban-khong-yeu-duoi-chi-da-manh-qua-lau`.
  - `thuong-hay-so-bat-dau-lai` — decision **before** leaving ("thương hay sợ bắt đầu lại"), the
    "nhặt hành khỏi bát canh" motif, two bowls facing. Owns that frame and that question. We must not
    use a bowl/food-to-share frame; our device is a **takeaway counter with two boxes**.
  - `tiec-nguoi-hay-nam-thang` — calendar/year-card device, "tiếc người hay tiếc năm tháng", spoken
    by a friend about a friend, while still deciding.
  - `lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban` — reframing past years as not wasted after
    failure; no relationship routine.
  - No existing video covers "after the relationship ended, the muscle memory of two people remains;
    re-learning self-care starts with one portion for one person". Not a duplicate.
- **Preflight — `scripts/preflight.py` is MISSING in this repo → manual checks** (raw outputs):

  ```
  $ ffmpeg -version | head -1
  ffmpeg version 9.0.1 Copyright (c) 2000-2026 the FFmpeg developers

  $ node -v
  v22.22.3

  $ grep '"remotion"' package.json
  "remotion": "4.0.534"

  $ echo "CHROME_EXECUTABLE=[$CHROME_EXECUTABLE]"
  CHROME_EXECUTABLE=[]
  $ ls "/Applications/Google Chrome.app/Contents/MacOS/" | head -1
  Google Chrome

  $ python3 scripts/gen-voice-clone.py --help     # engine import path
  usage: gen-voice-clone.py [-h] [--ref REF] [--json JSON] [--performance PERFORMANCE]
                            [--out-dir OUT_DIR] [--force] [--shot SHOT] [--no-cache]
                            [--tries TRIES] [--max-cer MAX_CER] video_id
  → script runs; the VieNeu engine lives in ~/.venvs/vieneu (system python3 has no `vieneu` module).

  $ df -h . | tail -1
  /dev/disk3s5   460Gi   361Gi    68Gi    85%    7.1M  716M   1%   /System/Volumes/Data
  → 68 GiB free.

  $ python3 -m unittest scripts.test_voice_catalog
  Ran 1 test in 0.000s
  OK
  ```
- Status initialized: `python3 -X utf8 -I scripts/pipeline.py init bat-dau-lai-sau-mot-moi-quan-he-dai --comp BatDauLaiSauMoiQuanHeDaiReel --voice thanh-long-nang-cao --profile story` → exit 0.
- Voice reference copied + verified:
  ```
  $ md5 -q docs/bat-dau-lai-sau-mot-moi-quan-he-dai/voice-ref/refThanhLong.wav
  199de31c8281d895dd571e36fe464ed5
  $ ffprobe -v error -show_entries format=duration -of csv=p=0 docs/bat-dau-lai-sau-mot-moi-quan-he-dai/voice-ref/refThanhLong.wav
  8.200000
  ```
- **Skill-named scripts that do NOT exist in this repo** (recorded truthfully, never reported as run):
  `scripts/preflight.py` (manual checks above), `scripts/tone-probe.py` (manual tone review required,
  documented in `voice-direction.md`), `scripts/gen-voice-vc.py` (fallback ladder skips route 3 →
  `accepted-risk`).
- **A previous brief in this session** (`can-phong-bua-bon-khong-phai-that-bai`) was put on hold by
  the director when the owner replaced `promt.md` with this one; its stages are `blocked` with that
  reason, no delivery was claimed, and none of its artifacts are reused here.

## Clock

Phase 0 of this video started at 2026-10-21T17:07:17Z (unix 1792602437). Target ≤ 600 s to a verified
deliverable; if exceeded, the report records **SLA missed** and the full workflow still runs.
Only ideation may be compressed (3 hooks → 1, one visual thesis, ≤7 shots, no second moodboard).
Never compress real voice, independent review, render, QA or evidence.

---

## Creative sections — owned by `script-agent`

### 1 · Viewer need (one)

A 22–35-year-old a few weeks out of a long relationship keeps catching their own body shopping,
cooking and getting ready for two people. They do not need a plan or a diagnosis; they need to see
that the residue is normal, and to watch one person do one small thing for themselves without
pretending it fixes anything.

### 2 · Retellable sentence (one)

**Bắt đầu lại không phải là xoá người kia — đó là tập lại cách chăm một người, bắt đầu từ một phần
ăn chỉ dành cho mình.**

### 3 · Tone and personality

- **Register:** telling, not teaching. Someone a few months out, talking to someone a few weeks
  out. Same age, no seniority, no "I've healed" energy.
- **Voice character:** dry, awake, warm only at the edges; a person who notices small physical things
  (a dry toothbrush, the receipt paper, steam on the face) and reports them without decorating them.
- **What it never does:** no advice, no consolation, no psychology vocabulary, no blame of the ex, no
  crying, no whisper-as-emotion. Banned and not present anywhere: "rồi sẽ ổn", "buông bỏ đi",
  "quên đi", "phải mạnh mẽ lên". They are replaced by observable acts: buying one box, opening it,
  eating it, feeling full.
- **Humour:** none forced. The one wry beat is s3 — typing "Ăn gì chưa" out of pure habit and then
  deleting it character by character. It is played deadpan, never as a joke; it is the "first smile"
  of this video (`viral-tech-video-creator` gate) by recognition, not by punchline.
- **Restraint:** the story never says the narrator is sad. It says what their hands do. The only
  named feeling is the negation at the end ("Không thấy nhẹ người") plus a physical fact ("Chỉ thấy
  no") — that is the whole emotional claim of the video.

### 4 · Claim plan

`research.md` **now exists** (read 2026-10-22): `docs/bat-dau-lai-sau-mot-moi-quan-he-dai/research.md`.
It supports the premise (long relationships build routines — F1/S1; habits are context-cued and
automatic — F3/S2) but the script still carries **zero statistics, zero named psychological
concepts, zero claims about how long grief lasts, zero claims about what "most people" do**. The
mechanism is **staged as objects, never spoken as a rule**: the counter, the receipt, the brush
holder and the second chair are the context; no line tells the viewer a fact about people in general.

| id | claim as shown | type | source | how it appears |
|---|---|---|---|---|
| B1 | After a long relationship ends, the routines of two people keep running (buying two portions, two toothbrushes, two chairs set at the table). | story premise / first-person testimony, **not** a universal claim | owner brief §User constraints (topic + mandated s1); `research.md` C1 (user) | dramatised in s1–s3; never generalised to "ai cũng thế" |
| B2 | Starting over = slowly learning to take care of yourself again, starting with one portion that is just for you. | owner thesis, restated | owner brief §User constraints (thesis); `research.md` C12 (user) | the visible act in s5–s6; never spoken as a maxim |
| B3 | The second chair, the dry brush, the deleted message, the receipt | invented detail of this narrator | story device, not a factual claim; `research.md` P1/P3/P5/P9 (props) | image only, no caption implying data |
| B4 | *Sourced mechanism, not spoken:* habits are automatic responses cued by a stable context. | FACT used only as staging logic | `research.md` F3 / C4 — Thomas, Poortinga & Sautkina, *PLoS ONE* 11(4):e0153490 (2016), https://pmc.ncbi.nlm.nih.gov/articles/PMC4847906/ | the shop, the table and the receipt are the repeated context; no sentence asserts the mechanism |
| B5 | *Non-claims:* no duration ("ba tháng", "một năm"), no frequency, no diagnosis, no term such as "chấp nhận", "chữa lành", "gắn bó" | — | `research.md` §Claims we must NOT make (1–10) | nothing on screen or in voice |

The `B…` ids are brief-plan rows, deliberately distinct from `research.md`'s `C…` table: research
`C5` is the context inference ("the kitchen and the familiar road still give the habit a place to
run"), not the non-claim row above. `script.md` §6 cites research ids only.

No statistic enters the script. Only B4's **staging** is sourced, and it is never narrated; if the
director wants a spoken fact, it must be quoted with its URL in `script.md` §6 first.

### 5 · Visual identity

**Thesis (one sentence):** *Một quầy cơm lúc sáu giờ chiều — inox ướt, hơi cơm trắng, giấy bill in
ra — và đúng khung hình đó, lần thứ hai, chỉ còn một hộp.*

**Palette (6 named tokens).** Grounded in the shop, not in a mood board: steel, receipt paper, dusk,
one red plastic accent, one tungsten bulb.

| token | hex | role | where it lives |
|---|---|---|---|
| **Quầy** | `#12100E` | dominant field | shadow under the counter, the negative space around hands and boxes, the home table at night |
| **Giấy bill** | `#EDE6D8` | ink | receipt paper, hook block, all captions, the small in-world labels |
| **Inox ướt** | `#8A9A8F` | support (mid-tone) | the stainless counter plane, the wet patch under the boxes, the tap in s2 |
| **Phố chiều** | `#3B4A5A` | support (depth) | the dusk outside the shop door and the home window; background only |
| **Nhựa đỏ** | `#B23A2E` | controlled accent | the red elastic band on box #2, one red plastic bag, one price card — **max 3 appearances, never more than ~4 % of frame** |
| **Đèn vàng** | `#D9A441` | light token (not a fill) | the counter bulb (unlit until s5, 35 % at the decision) and the pendant bulb at home (40 % → 100 % in s6) |

Deliberately **not** used: the `#FF5A36` son-red and `#9DB4FF` periwinkle of
`thuong-hay-so-bat-dau-lai`, any purple dusk, any gold `#d4a574` from `src/Main.tsx`.

**Type (3 roles, all already in `public/fonts/`).**

- **Narrator's words — `Lora Variable`** (`Lora-Variable.ttf`, OFL recorded in
  `public/fonts/Lora-OFL.txt`), weight 500. Hook block and every caption. A written, slightly
  calligraphic serif for a first-person confession; the serif is the "letter" voice.
- **The physical world — `Be Vietnam Pro SemiBold`** (`BeVietnamPro-SemiBold-VN.woff2`), uppercase,
  tracking `+0.06em`, 34–40 px. Price card, `CHƯA GỬI`, any future `minh hoạ` label. A shop-sign
  sans, used only for text that exists inside the scene.
- **The receipt — `JetBrains Mono Regular`**, digits and `×` only (`×2`, `×1`, `38.000`). Never
  Vietnamese words, so the receipt stays a physical object rather than a second text layer.

No fourth font. Nothing is set in Inter, Lexend or Literata (the three are owned by other videos).

**Motion personality — "máy đặt trên quầy".** Locked-off camera, no handheld, no shake, no light
flicker. Push-in ≤ `1.00 → 1.03` across a shot; one rack focus per shot; hard cuts only, landing on
mechanical sounds (printer, lid, box on steel). Exactly **one** freeze in the video: `0.45 s` at the
end of s4a, then a hard cut into s4b. No crossfades, no speed ramps, no whip pans, no zoom punches.
Rationale: the subject is muscle memory — the camera must be the one thing that does not fidget.

**Captions.** `Lora` 500, 66 px, line-height 1.18, colour `#EDE6D8`, left-aligned at `x = 84`,
**max 2 lines, ≤ 28 characters per line**, block bottom edge at `y = 1690` (i.e. 230 px above the
frame bottom, clear of the 210 px floor). Scrim: a soft darkening of the lower 28 % of the frame
(0 → 55 %), **no pill box and no border**, so the counter stays visible under the words. The hook
(s1) is the one exception: the same four short lines, 76 px **target on a 912 px measure with a
64 px floor — measured and fitted, never eyeballed (rule in `script.md` §2)**, bottom edge
`y = 1430`, and they are the frame's only text — the caption for s1 *is* the hook block, so nothing
is written twice.

**Visual signature — `tờ bill`.** A narrow thermal receipt is printed three times and is always a
physical object inside the shot, lit by the scene, never a full-screen card: `×2` at the counter
(s1, the printer spits it), `×1` when the vendor tears the new one (s5), and that same `×1` strip
lying under the open box on the home table, curling, in warm light (s6). It is the numeric form of
the contrast pair and the only graphic device the video needs.

**Character and props (consistency contract for build).** "Tôi": hands, forearms, shoulders and nape
only — **no face**, so the viewer can stand in; cream small-stripe shirt with the right cuff rolled
once; short nails. The ex never appears: not blurred, not as a photo, not as a phone contact. The
vendor: hands and an out-of-focus torso, no dialogue in the final script. Props: two identical
takeaway boxes (one red elastic band), receipt printer, red plastic bag, toothbrush holder with two
brushes (one dry, one wet), a two-chair table where the second chair holds folded mail, a phone whose
screen stays out of focus, one counter bulb, one pendant bulb.

**Light arc (motivated, no filter).** s1–s3 cool tube + dusk; s4a–s4b unchanged (the freeze is the
only event); **s5 the vendor switches the counter bulb on to count change** — first warmth, 35 %,
motivated by her hand; s6 at home the pendant is already on and, as the lid opens, steam crosses the
bulb's cone and the grade warms 40 % → 100 % over 1.2 s. The warmth is earned by an action, not by a
colour preset.

### 6 · Differentiation (owner-confirmed new video)

| existing | what it owns | what this video does instead |
|---|---|---|
| `thuong-hay-so-bat-dau-lai` | stay-or-leave **before** the breakup; two bowls facing; rice-cooker "Giữ ấm" red LED; "nhặt hành"; Literata headline + Lexend captions; purple dusk | **after** the end; checkout counter + takeaway boxes + receipt; no bowl, no cooker, no hành, no facing-bowls frame; Lora + Be Vietnam Pro; steel + sodium amber |
| `tiec-nguoi-hay-nam-thang` | "tiếc người hay tiếc năm tháng"; calendar/year card; a friend narrating about a friend; still deciding | first person throughout; no card device; no stick figures; already ended; the decision is one portion, not a yes/no |
| `ban-khong-yeu-duoi-chi-da-manh-qua-lau` | umbrella/rain, a withheld message (thumb hovers, never sends), "che ô cho người khác" | no rain, no umbrella, no stated metaphor; the message is a **habit** typed and deleted character by character, not a hovering unsent message; no chat bubble, no contact name, no hold |
| `gaplai` | two chairs facing + yellow desk lamp + brown night | **no facing-chair composition, no desk lamp**; one extra chair used as a shelf, shop tube + sodium |
| `metkhong` | one person alone in a cold grey rented room at night, small hand tasks | public shop at dusk, two-person residue, first warmth from a counter bulb |
| `camon` | blue-stone night `#1B2230` → moss `#1E2A25` → sunrise `#F4C77D`, Lora, polaroid | no dawn arc, no polaroid; dusk → tungsten, receipt instead of photo |
| `chung-minh-de-lam-gi`, `xay-doi-minh-hay-chung-minh` | essay/argument register | a scene, not a thesis; the only idea is carried by an act |
| `src/Main.tsx` (legacy tech video, "Repo 200.000 dòng code") | near-black `#090909` + gold `#d4a574` + DM Serif/Inter + node diagram | no UI, no gold, no diagram, no numbers on screen |
| `src/ClaudeMem.tsx` | **file does not exist in this repo** (checked with Glob); the comparison in `thuong-hay-so-bat-dau-lai/brief.md:61` therefore cannot be re-run here | nothing to collide with; recorded as "not present", not as "compared" |

No cover, hook wording, layout or caption style is reused from any of them. The two boxes + receipt
frame exists in none of the existing videos.

`gaplai` is the one row without a first-party brief in this repo: `docs/gaplai/brief.md` and
`src/gaplai/` do not exist (checked 2026-10-22), so its palette and composition are taken from the
secondary descriptions in `docs/metkhong/brief.md:16` and
`docs/cuoc-goi-nho-cua-me/design-spec.md:151`. The comparison is still valid for the only property
that matters here — it owns the two-facing-chairs + brown-night frame.

### 7 · Voice route

Route 2 — local **VieNeu-TTS clone**, slug `thanh-long-nang-cao` (Thanh Long Nâng Cao), fixed by the
owner; no benchmark, no alternate voice. Reference
`docs/bat-dau-lai-sau-mot-moi-quan-he-dai/voice-ref/refThanhLong.wav`,
`md5 199de31c8281d895dd571e36fe464ed5`, `ffprobe` duration `8.200000` s (director-verified). The
engine reads only `reference`, `seed`, `denoise` and explicit silence padding per phrase — no rate,
pitch, volume, style or emotion parameter. The brisk delivery is written, not processed: short
sentences, 116 syllables, planned at **4.3 syl/s** with a measured baseline of ≈4.1; audio is never
time-stretched. Pauses that must be audible are real: `s4a`/`s4b` is a split key with a 0.45 s
timeline gap, and the ending is 1.80 s of real silence.

### 8 · Hook decision (scored in `hook-options.md`)

| id | mechanism | S source | O sound-off | F first frame | P payoff | total /40 |
|---|---|---|---|---|---|---|
| **H1 (chosen)** | specific personal stake, mandated verbatim | 10 | 9 | 10 | 10 | **39 (9.75)** |
| H2 | surprise / contrast — the vendor names the habit | 8 | 8 | 9 | 9 | 34 (8.5) |
| H3 | curiosity gap — the one object not thrown away | 8 | 9 | 8 | 6 | 31 (7.75) |

H1 has the highest total and no axis below 9, and it is the owner's line; H2 is kept as the fallback with its exact wording.

## Shot table — owned by `script-agent`

Canonical directive table (with action, camera/motion, SFX, accent words, delivery, source and scene
owner) lives in `docs/bat-dau-lai-sau-mot-moi-quan-he-dai/script.md`; keys, seconds and spoken text
are identical in both files. Overview:

| # | seconds (4.3 syl/s plan) | VO exact text | on-screen text | source | scene owner |
|---|---|---|---|---|---|
| s1 · HOOK / COVER | 0.20–4.76 · 19 syl · voice 4.42 s + 0.14 gap | Tôi vẫn mua hai phần ăn theo thói quen. Đến lúc tính tiền mới nhớ giờ chỉ còn mình. | hook block = the same sentence, 4 lines | owner brief (mandated); `research.md` C1 | `scene-agent-1` |
| s2 | 5.26–9.16 · 16 syl · 3.72 s + 0.18 gap | Về đến nhà, giá đỡ có hai bàn chải. Một cái khô, một cái còn ướt. | captions only | owner brief (visual list); `research.md` P3 | `scene-agent-1` |
| s3 | 9.61–13.52 · 15 syl · 3.49 s + 0.42 gap | Bàn ăn vẫn kê hai ghế. Tôi gõ: Ăn gì chưa. Rồi xoá từng chữ. | captions + `CHƯA GỬI` | owner brief (visual list); `research.md` P5 | `scene-agent-1` |
| s4a · freeze / pre-roll | 14.37–16.23 · 8 syl · 1.86 s | Có một tối, tôi đứng lại trước quầy. | captions only | owner brief (counter); `research.md` P1 | `scene-agent-2` |
| s4b · RE-HOOK | 16.68–20.62 · 16 syl · 3.72 s + 0.22 gap | Không hẳn vì tiếc. Mà vì tôi quên mất một phần ăn thì trông thế nào. | captions only | owner thesis (`research.md` C12); `I2`/`I7` | `scene-agent-2` |
| s5 | 20.97–25.83 · 19 syl · 4.42 s + 0.44 gap | Hai hộp nằm sẵn trên quầy. Tay tôi dừng trên hộp thứ hai. Rồi tôi nói: một phần thôi. | captions + receipt `×1` | owner brief (two boxes, hesitant hand, payoff); `P1`/`P2`/`P9` | `scene-agent-2` |
| s6 · PAYOFF + HOLD | 26.28–32.47 · 23 syl · 5.35 s + 0.84 gap | Tôi mang một hộp về. Ngồi xuống, mở nắp, hơi cơm bốc lên mặt. Ăn hết. Không thấy nhẹ người. Chỉ thấy no. | captions only | owner brief (one portion, light warms); `P6`, `C12` | `scene-agent-2` |

Total **116 syllables**; plan total **34.27 s** at 4.3 syl/s = 26.98 s of speech + **2.24 s** of
inside-clip phrase gaps + **4.85 s** of post-clip holds (including the **1.80 s** ending) + **0.20 s**
lead-in. Range: 33.07 s at 4.5, 35.58 s at 4.1, 37.03 s at 3.9 — inside 30–40 s. Full arithmetic and
the elasticity order live in `script.md` §1.
