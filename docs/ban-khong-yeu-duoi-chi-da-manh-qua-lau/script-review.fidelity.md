# Gate A lens review — `ban-khong-yeu-duoi-chi-da-manh-qua-lau`

Reviewer lens: **fidelity + sources/claims** (rubric items 1, 6, 7). Clean context; I did not
write `brief.md`, `script.md`, `voice.proposed.json`, `voice-direction.md`,
`voice-performance.proposed.json` or `hook-options.md`. Judge only; nothing was fixed.

Inputs read: `AGENTS.md`, `.agents/rules/README.md` + `01`–`04`, `.agents/roles/script-reviewer.md`,
`.claude/skills/ray-pineline-worflow-agent/SKILL.md` (Phase 2a/2b, Gate A, `story` rubric row,
last bullet of Common failure points), and the nine video documents listed in the dispatch.

**Method.** No shell in this runtime: no `pipeline.py`, no audio, no frame render. Every check below
was done by reading the files and by string/syllable arithmetic performed here, and each number is
labelled with where it came from. Claims I could not test are listed at the end.

---

## Round 1 — lens: fidelity & claims

### 0 · Reading as the listener first (spoken track only, at the durations in `script.md` §1)

I heard only the fourteen lines in `voice.proposed.json`, in file order, at 3.9 syl/s with the
holds of `script.md` §1. Felt: the first three seconds put a name on me; the middle (the unsent
message, the deletion, "không có ai") is where the floor drops out; the close asks a question and
then stops — the silence is the best part. Understood: I am allowed to be tired and someone should
ask me. My attention would have dropped at **a3** (22.98–25.42 s), where the ear is told something
the eye did not just watch happen and did not happen in the story I was told; that is a beat where
I would have looked back at the frame.

---

### 1 · Mandated-line verification (character-for-character)

Source of truth: `brief.md:16` "Mandatory spoken text (Vietnamese, keep wording verbatim in
`voice.json` and captions)" and the ten quoted lines at `brief.md:18–27`.
Compared against `voice.proposed.json:2–15`, `script.md:62–76` (spoken-line column),
`script.md:84–99` (caption chunks), `voice-performance.proposed.json` (`shots.*.phrases`),
`voice-direction.md:4–6, 70–83`.

| # | owner line (`brief.md`) | line | key(s) in `voice.proposed.json` | order | verbatim? | character checks |
|---|---|---|---|---|---|---|
| 1 | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | 18 | `s1` (:2) | 1st | **yes** | all diacritics present; final `.` kept |
| 2 | `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` | 19 | `s2` (:3) | 2nd | **yes** | all three sentences intact, single spaces, no split, two `.` inside |
| 3 | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | 20 | `s3` (:5) | 3rd | **yes** | comma after `tối`, `rất lâu`, `màn hình điện thoại` intact |
| 4 | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | 21 | `s4` (:7) | 4th | **yes** | colon after `nhắn`; inner message wrapped in **straight** single quotes `'` (U+0027) as in the brief, not curly; final `.` **inside** the quotes before `'` |
| 5 | `Rồi nghĩ một lúc, bạn lại thôi.` | 22 | `s5` (:8) | 5th | **yes** | comma after `lúc` |
| 6 | `Không phải vì không có ai để nhắn.` | 23 | `s6` (:10) | 6th | **yes** | — |
| 7 | `Mà vì bạn đã quen với việc mình phải là người ổn.` | 24 | `s7` (:11) | 7th | **yes** | `với việc` and `mình phải là người ổn` not reordered |
| 8 | `Bạn biết không…` | 25 | `s8` (:12) | 8th | **yes** | single **U+2026 HORIZONTAL ELLIPSIS**; grep for `\.\.\.` across the whole video folder returns exactly one hit (`brief.md:64`, a JSON-shape note) → no three-dot substitution anywhere |
| 9 | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | 26 | `s9` (:13) | 9th | **yes** | `bị ướt` intact (accented `ị`) |
| 10 | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | 27 | `s10` (:15) | 10th | **yes** | `họ` (not `hộ`); colon after `hỏi`; straight quotes; `?` inside the quotes |

**Result: 10/10 verbatim, 10/10 in the owner's original relative order, 0 rewrites, 0 paraphrases,
0 droppings, 0 duplications, 0 duplicated owner line, 0 key splits.** Each mandated line occupies
exactly one key, which is why no `s6a/s6b` split can ever be blamed on the lock. Captions
(`script.md:84–99`) reproduce each owner line word-for-word, as `brief.md:16` also requires —
checked key by key, including `'Hôm nay mình mệt quá.'`, `Bạn biết không…` and
`'Hôm nay có chuyện gì / với bạn thế?'`.

Sidecar fidelity (SKILL "Phase 2b": concatenating phrases must reproduce the canonical value
exactly): in **13 of 14 keys every phrase boundary falls exactly on a single space** of the
canonical string (`s1` `"…tìm đến bạn"` + `"mỗi khi…"`; `s10` three phrases; etc.). The words,
diacritics and punctuation are all preserved — but the file never states the join rule, so an
assembler that concatenates with `""` merges two words (`…đến bạnmỗi khi…`). See ticket **F-05**.

---

### 2 · The title line — verdict: **keeping it silent is the right call, not a fidelity failure**

Where it appears: `script.md:76` — the END title card, on screen only, two stacked elements
`Bạn không yếu đuối,` / `bạn chỉ đã mạnh mẽ quá lâu.`, 47.06–49.46 s, "**No voice at all.**",
not a key in `voice.proposed.json`, not in `voice-performance.proposed.json`, and stated as
production metadata at `voice-direction.md:7`. Reasoning that holds:

- `brief.md:14` files it as "Title / theme line", **outside** the "Mandatory spoken text" block at
  `brief.md:16`. Under `SKILL.md:47` ("Keep verbatim only the user lines the user marked
  mandatory; everything else may be dramatized"), the owner locked ten spoken lines, not this one.
- `research.md:20, 23` itself assigns the title line to "closing re-hook/resolution", not the
  opener, and `hook-options.md:43–49` documents the H3 rejection. The packet is internally
  consistent on this point in four places.
- Speaking it would consume the required post-close hold: the END region is 2.40 s and the line is
  11 syl ≈ 2.82 s at 3.9 (42.54 s at 4.2). The rubric's "silence/hold after the closing line"
  (SKILL Common failure points, item 4) would then have to come out of a beat that already carries
  the resolution.
- The owner's words still reach the viewer **visually and verbatim** on the last frame.

Residual cost I accept but want recorded: it is the only owner wording in the whole video that
never reaches the ear. If the owner later asks "sao không đọc tiêu đề", the correct fix is a
spoken END card plus a shortened tail, and §1 must be recomputed — not a silent swap. That
contingency is **not** written down anywhere, which is why it becomes ticket **F-09**.

---

### 3 · The four `[ADD]` lines — verdict per line

Test applied: (i) does it add a concrete sensory detail, (ii) does it invent a fact / assert an
event the owner's account never contains, (iii) does it contradict or sharpen the owner's meaning,
(iv) is it sayable as narration rather than a treatment-document sentence read aloud.

| key | line (`voice.proposed.json`) | adds detail? | invents an event? | contradicts owner? | sayable as narration? | **verdict** |
|---|---|---|---|---|---|---|
| `a1` :4 | `Vai người khác nhẹ hẵn xuống. Còn bạn đứng ngoài.` | yes — the effect `s2` only asserts | no — s2's image (`script.md:63`) has her hand on the other's shoulder and her in the dark hallway; `a1`'s own image (`script.md:64`) shows the shoulders dropping and the amber edge reaching her collar | no — it is exactly the viewer need at `brief.md:30` | yes — a narrator can observe this; "Còn bạn đứng ngoài" is a natural spoken fragment | **accept** (register note, F-11) |
| `a2` :6 | `Mưa ngoài cửa sổ, đều đều.` | yes — the room's sound | no — staged environment, entailed by the owner's own umbrella metaphor (line #9) | no | borderline — a nominative fragment; and its own direction says "almost said **to the room**" (`script.md:66`, `voice-direction.md:74`), which switches addressee away from the one person the brief mandates (`brief.md:35`, `voice-direction.md:21`) | **accept with a Trung fix on the source cell** (F-04) |
| `a3` :9 | `Ngón tay bấm xoá từng chữ.` | yes — and it is a **new plot event** | **yes — Cao.** The owner's line #5 says only `Rồi nghĩ một lúc, bạn lại thôi.`, and the frame the viewer has just seen (`script.md:68`) shows "her hand stays on the phone; she pulls her knees up onto the bed" — **no deletion**. Nothing in `research.md` (whose only source is the owner's account, `research.md:4`) supports it. | yes, in effect — the owner's `thôi` is "she stopped"; the narration upgrades it to "she typed and then deleted it, letter by letter", i.e. self-censorship, a stronger and more self-accusing claim the owner did not make | no — "Ngón tay bấm xoá…" is a shot description with an inanimate subject: it reads like a treatment line, not like something a person says to you | **reject — Cao (F-01)** |
| `a4` :14 | `Chiếc ô nghiêng đi. Mưa rơi lên vai bạn.` | yes — but nothing new | no | no | yes | **reject as speech / Trung (F-03)** — see below |

**`a3` in detail (the one Cao).** `script.md:137` justifies it as "the re-hook's answer … without
this the give-up never happens on screen". The premise is false: the give-up *is* staged on screen
in `a3`'s own image cell (`script.md:69`: "backspace pressed, the characters vanish one by one
until the box is empty; her hand hesitates, then turns the phone face-down"), and `script.alt-1.md:73`
already proves the image-only route works with zero added lines ("The deletion is **staged in the
image**, not narrated — the price of adding no lines"). What `a3` adds is not a visual but a
narration of an act the account never contained, in the same voice as the owner's own sentences, so
a viewer cannot tell which of the fourteen lines are the account and which are the producer. That is
exactly the "inference stated as fact" case in my contract. Concrete change in **F-01**.

**`a4` in detail.** `script.md:138` claims `a4` "is the half of contrast pair 2 that `s9` can only
describe". `script.md:73` contradicts this in the same document: `s9`'s image already has "the
umbrella is open and **tilted away from her** … a dark wet patch begins to spread on her left
shoulder", and `a4`'s own image (`:74`) only "finishes the beat". On top of that, the narration
`Mưa rơi lên vai bạn.` restates, in the same 2.3 s, what the owner has just said (`bị ướt`) and what
the frame has just shown. The information is real; it is redundant in the ear, and the stated
justification is unsupported. Concrete change in **F-03**.

---

### 4 · Claims table (every assertion a viewer or a downstream agent could read as fact)

| # | claim | where | source offered | verdict |
|---|---|---|---|---|
| C1 | The ten spoken lines are the owner's account | `voice.proposed.json:2–15` | `brief.md:16–27` | **true** — 10/10 verbatim (§1 above) |
| C2 | Cover headline `Mọi người tìm bạn khi buồn.` | `script.md:62`, `hook-options.md:15` | restates owner #1 | **true**, no new claim |
| C3 | Recreated chat bubble + incoming call | `script.md:67, 70` | labelled `minh hoạ` in the on-screen column | **compliant** with `brief.md:51` and SKILL Phase 3a Labels |
| C4 | `Ngón tay bấm xoá từng chữ.` (deletion happened) | `voice.proposed.json:9`, `script.md:69` | source cell: "**[ADD]** sensory line, `script-agent`" | **unsupported by the account → Cao (F-01)**; the table label exists, the viewer cannot see it |
| C5 | Rain audible outside a window at 15.60–18.33 s | `voice.proposed.json:6`, `script.md:66` | "motif is the owner's own (`brief.md` visual identity)" | **staged detail, acceptable; attribution over-broad → Thấp (F-04)** — the window/rain-as-sound is producer staging; only the umbrella metaphor is the owner's (line #9) |
| C6 | Health / diagnosis language | — | — | **none**: grep for `kiệt lực` over the folder hits only `research.md:7`; it never reaches `script.md` or `voice.proposed.json`. No statistic, no percentage, no study, no promise to fix the viewer |
| C7 | No CTA, no handle, no advice | `script.md:76, 163`, `voice-direction.md:58–59` | owner constraint `brief.md:47` | **true** — the climax (`s10`) and the card are separate shots, the card carries no call to action, no `bạn cần phải…`, no `bạn mạnh lắm` anywhere |
| C8 | `s10`'s image shows someone arriving with a cup and tilting the umbrella back | `script.md:75` | staged resolution of the owner's own metaphor | **acceptable** — it resolves the picture, it does not promise the viewer that anyone will come; must not be art-directed into "someone will save you" (note to design) |
| C9 | Total runtime 46.86–51.43 s, "inside 45–55 s at every rate" | `script.md:42–51, 142`, `brief.md:59`, `hook-options.md:7, 76`, `status.json:33` | "planning rate 3.9 syl/s", recomputed by me | **incomplete, therefore false as a budget → Trung (F-02)** — it counts speech + inter-clip silence and omits the **3.39 s of intra-clip pauses** that `voice-performance.proposed.json` itself schedules (`pauseAfterSeconds`: `:68` 0.22, `:99`+`:107` 0.60, `:139` 0.24, `:170` 0.26, `:200` 0.14, `:232` 0.24, `:265` 0.18, `:293` 0.16, `:325` 0.18, `:356` 0.24, `:408` 0.26, `:439` 0.22, `:470`+`:480` 0.45). True band = **50.25–54.82 s**; break-even is 3.68 syl/s, so the ceiling margin is 0.18 s, not 3.57 s |
| C10 | "The previous 10-key draft spent 19.25 s (41 %)" | `script.md:36, 105` | "see §4" — §4 restates it; **no earlier draft exists in `docs/`** | **untraceable → Thấp (F-08)** |
| C11 | "benchmark selection confirmed by user" (Thanh Long) | `brief.md:10` | — | **contradicted inside the packet** by `voice-direction.md:11–17`, `voice-performance.proposed.json:5, 27–29, 53` (`"pending"`, `selectedReference: null`) and `script.md:165` ("Voice route: `pending`"); `owner-notes.md` holds only "hi" → **Trung (F-06)** |
| C12 | "the umbrella metaphor … is a known resonant image"; "the 'strong friend' angle performs well" | `research.md:8` | none — no URL, no date | **unsourced inference in the primary source**, inherited by `script.md:66, 73` as "research §Audience language". Nothing reaches the screen or the speech, so the video itself claims nothing → **Thấp (F-07)** |
| C13 | "the audience uses terms like …" (four terms) | `research.md:7` | — | three of the four are the owner's own wording (topic label `brief.md:15`, line #9, `người ổn`), presented as audience research. Harmless to the video, misleading as a citable label → folded into **F-07** |
| C14 | Hook/frame-0 and re-hook timings (2.82 s, 18.33 s, 47.06–49.46 s) | `brief.md:56–59`, `script.md:38, 51`, `hook-options.md:18, 25, 76` | labelled "planning rate", with a band table | **honest** — labelled as planning-rate arithmetic, not measurement (SKILL: `Do not claim measured effectiveness from a script-only review`). Internal arithmetic re-verified by me: every slot, the 142-syl total, the 111 owner + 31 add split and the 13.05 s silence all reconcile (two 0.01 s rounding artefacts at `script.md:22, 23, 30` — no ticket) |
| C15 | `hook-options.md` sources from research #1–#5 | `hook-options.md:4` | four candidates evaluated (H1–H4 from #1, #4, #5, #2) | **partly overstated** — #3 is used as the 33.92 s payoff, never offered as an opener, and the decision table has no row for it → **Thấp (F-12)** |
| C16 | ALT-2 owner line #10 | `script.alt-2.md:55, 152` | cites `brief.md L27` and marks it "✔" | **verbatim break**: `Và hộ cũng cần…` — `hộ` for `họ`; ALT-2's own verification table passes it. Not the selected artifact → **Thấp, would be Cao if ALT-2 were ever adopted (F-10)** |

---

### 5 · Scores for this lens

| rubric item | score | evidence |
|---|---:|---|
| **1 · Fidelity (mandated wording + user intent kept)** | **8** | 10/10 owner lines verbatim, in order, unsplit, and captions word-for-word (§1 table) — the lock itself is perfect. Held to 8 by: one owner-unwritten plot event asserted as narration (`a3`, F-01, Cao), one added line whose stated justification is contradicted by the document's own shot table (`a4`, F-03), an over-broad source attribution for `a2` (F-04), an undeclared phrase-join rule that would merge words in 13/14 keys at assembly (F-05), and the title line never reaching the ear with no contingency recorded (F-09). Intent kept otherwise: kiệt lực cảm xúc → `s3`/`s7`; khao khát được dựa vào ai đó → `s6`/`s7`/`s10`; no advice, no self-help, no CTA (`brief.md:47`, `script.md:163`, `voice-direction.md:58–59`). |
| **6 · Source accuracy (no unsourced claim; inference not stated as fact)** | **7** | On-screen and spoken text is clean: no statistic, no health or diagnosis claim, no promise to fix (`research.md:4` names the owner account as the only source, and nothing outruns it except `a3`). The documentation layer is not clean: the 46.86–51.43 s band is incomplete against the sidecar's own pauses and is repeated in four files (C9/F-02); `brief.md:10` claims a user-confirmed voice benchmark that three phase-2 files call pending (C11/F-06); a superseded-draft number has no retained artifact (C10/F-08); `research.md:7–8` carries unsourced performance language that the script cites as a source label (C12/C13/F-07); `hook-options.md:4` claims a five-hook source it evaluates four of (C15/F-12). |
| **7 · Visual feasibility in Remotion** | **8** | Timing, frame-driven motion, spring/crossfade language, frame-0-as-cover, the umbrella through-line and the 15/15 sensory inventory are all renderable; determinism constraints are respected (`brief.md:44`; "Slow push 1.00→1.03" is a transform, not wall clock). Held to 8 because the script never states the **asset class** of the hero while it demands photographic micro-actions — dry collar vs soaked fabric (`script.md:62, 73`), "the other person's shoulders visibly drop **under her hand**" (`:64`), "the black screen … shows her face" (`:69`), a wet patch that begins to spread, darkens, and is still wet across three shots (`:73, 74, 75`), rain beading and dripping off the rim (`:62`), "the street lamp broken into moving dots" (`:66`). The repo's established `story` technique is an SVG stick figure plus typography — `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/kit.tsx:89–96` (`<circle>` head + line limbs, 9 px stroke) driven from `scenes.tsx:67–70` — which cannot deliver any of the above. That gap will otherwise surface as a rebuild at D/E. Plus the continuity constraint (one deterministic wet-patch asset across s9/a4/s10) is nowhere stated. |

**Lens mean: (8 + 7 + 8) / 3 = 7.7.** Open tickets: **1 Cao, 5 Trung, 6 Thấp** → verdict **revise**.

---

### 6 · Tickets (exhaustive)

| id | severity | where | one-line |
|---|---|---|---|
| F-01 | **Cao** | `voice.proposed.json:9` · `script.md:69, 137` · `voice-performance.proposed.json:278–307` | `a3` narrates a deletion the owner's account never contains |
| F-02 | Trung | `script.md:42–52, 142` · `brief.md:59` · `hook-options.md:7, 76` · `status.json:33` · `voice-performance.proposed.json:20–26` | the timing band omits the sidecar's own 3.39 s of intra-clip pauses |
| F-03 | Trung | `voice.proposed.json:14` · `script.md:74, 138, 150` | `a4` duplicates `s9`'s image + owner wording, on a justification its own table contradicts |
| F-04 | Trung | `script.md:66` · `voice-direction.md:74` · `brief.md:35` | `a2`'s source cell claims the motif is the owner's own; its direction switches addressee |
| F-05 | Trung | `voice-performance.proposed.json:33–38, 62–494` vs `voice.proposed.json:2–15` | the phrase-join rule is undeclared; 13/14 boundaries sit exactly on a canonical space |
| F-06 | Trung | `brief.md:10` vs `voice-direction.md:11–17`, `voice-performance.proposed.json:5, 27–29`, `script.md:165`, `status.json:134` | brief claims a user-confirmed voice benchmark that the phase-2 files call pending |
| F-07 | Trung | `script.md:62–76` (all image/source cells) · `brief.md:40` · `hook-options.md:14` | asset class for the hero unstated against a shot table of photographic micro-actions |
| F-08 | Thấp | `script.md:36, 105` | "previous 10-key draft spent 19.25 s (41 %)" has no retained artifact |
| F-09 | Thấp | `script.md:76` · `brief.md:59` · `hook-options.md:49` | the silent title card is right, but the "owner asks for it spoken" contingency is unrecorded |
| F-10 | Thấp | `script.alt-2.md:55, 152` | ALT-2's line #10 reads `Và hộ cũng cần` and its own table marks it ✔ |
| F-11 | Thấp | `voice.proposed.json:4, 14` · `script.md:64, 74` | register notes: `nhẹ hẵn xuống`, `Chiếc ô nghiêng đi`; plus accent-word mismatches `s5`/`s6`/`s8` |
| F-12 | Thấp | `hook-options.md:4, 65–70` | claims research #1–#5 as the opener source, evaluates four |
| F-13 | Thấp | `script.md:76` · `brief.md:43, 45` | END title's second line is 7 words vs the ≤6-word on-screen rule — must not be "fixed" by dropping `Bạn` |
| F-14 | Thấp | `script.md:62` · `hook-options.md:14` | "her shoulders are dry" must survive thumbnail scale or frame 0 loses the thesis |

---

**F-01 · Cao · `a3` asserts an event the owner's account does not contain**

- **Evidence.** Owner line #5 (`brief.md:22`, `voice.proposed.json:8`) is `Rồi nghĩ một lúc, bạn lại thôi.` — "she thought for a while, she stopped". The frame the viewer has just seen, `script.md:68`, contains no deletion: "Her hand stays on the phone; she pulls her knees up onto the bed; the room is very dark; only the rain texture on the wall". `research.md:4` names the user's account as the only source. `a3` states `Ngón tay bấm xoá từng chữ.` in the same narrator voice as the owner's sentences, so the viewer cannot tell it is not the account; its own justification (`script.md:137`) claims the give-up "never happens on screen" without it, which is false — `script.md:69` stages it, and `script.alt-1.md:73` proves the image-only route with zero added lines.
- **Concrete change.** Remove `a3` from the spoken track and keep the deletion in the image (`script.alt-1.md:73` model). Re-balance the recovered 2.44 s into existing holds; §4 elasticity already authorises this. New syllable total 136; `Σ pauseAfterSeconds` 3.23; holds 12.15 → **47.76 s at 4.2 syl/s, 50.25 s at 3.9, 52.14 s at 3.7**, inside 45–55 s at every rate in the band with the sidecar pauses counted and no elasticity needed. If the producer insists on a spoken line in that slot, it must restate what the frame already shows and may not introduce an act — and it must be marked `[ADD]` in the source column and the caption chunk, like the other additions.
- **Owner.** script-agent (voice.proposed.json, voice-performance.proposed.json, script.md §1/§2/§3/§5/§6).
- **Acceptance check.** `voice.proposed.json` has 13 keys; `script.md:33` totals 136 syl; the shot table for the deletion shows the backspace/characters-vanishing action in the **image** column only; the `source` cell for that shot says "image = design (staged), no voice key"; a grep for `bấm xoá` over the video folder returns hits only in `script.md` image cells, never in `voice.proposed.json`, `voice-performance.proposed.json` or any caption chunk.

**F-02 · Trung · the rate-sensitivity claims are computed on an incomplete budget**

- **Evidence.** `script.md:14` defines speech as `syl ÷ 3.9` plus "real silence" *between* clips (`:32`, `13.05 s`), and `voice-performance.proposed.json:45` declares `pauseBefore/pauseAfterSeconds` as "explicit post-synthesis silence during phrase assembly" — silence **inside** a clip. Summing the sidecar's own values gives **3.39 s** that no document adds to the total. The claim repeated in `script.md:42–51`, `brief.md:59`, `hook-options.md:76` and `status.json:33` — "46.86–51.43 s … inside 45–55 s … 3.57 s below the ceiling" — is therefore wrong by 3.39 s. True band, with pauses: **4.2 → 50.25 s · 3.9 → 52.85 s · 3.7 → 54.82 s**. Break-even is `142/r + 3.39 + 13.05 = 55` → **r = 3.68 syl/s**: below that the video needs §4's elasticity before phase 3, and the packet currently implies 3.4 s of headroom.
- **Concrete change.** Add an `intra-clip pause` column to `script.md` §1 and a line to `voice-performance.proposed.json.benchmark` stating the identity `planningTotalSeconds = Σ(syl/rate) + Σ(pauseAfterSeconds) + Σ(minimumPostClipHoldSeconds) + END hold`; recompute the band table and the "inside 45–55 s at every rate" sentence in all four files; state the rate at which the elasticity order must be applied (3.68 syl/s) rather than 3.7.
- **Owner.** script-agent (script.md, voice-performance.proposed.json); video-director owns `status.json` and must correct the log note it already wrote.
- **Acceptance check.** The identity above reproduces `planningTotalSeconds` to ±0.01 s for every rate in the table; the ceiling margin printed in the text equals the recomputed number; `status.json`'s note for the `script` stage no longer carries "46.86-51.43 s".

**F-03 · Trung · `a4` is redundant narration resting on a justification its own document contradicts**

- **Evidence.** `script.md:138`: "`a4` … is the half of contrast pair 2 that `s9` can only describe". `script.md:73` (same shot, `s9`) already specifies "the umbrella is open and **tilted away from her** … a dark wet patch begins to spread on her left shoulder", and `script.md:74` (`a4`) only "finishes the beat". The owner has just said `bị ướt` (line #9) and the frame has just shown the wet shoulder; `Mưa rơi lên vai bạn.` then says it a third time in 2.31 s.
- **Concrete change.** Preferred: remove `a4` from the spoken track, keep the tilt as an image-only continuation, and re-balance. Combined with F-01 → 127 syl, `Σ pauseAfter` 3.01, holds 11.45; **45.10 s at 4.2** (after lengthening the END hold 2.40 → 2.80 s per §4 elasticity), **47.42 s at 3.9**, **49.18 s at 3.7**. Minimum alternative: keep `a4` and correct `script.md:138` and the CP2 line at `:150` to state the real function (the umbrella's second physical beat, spoken in the viewer's own second person) instead of the "s9 can only describe" claim that `:73` refutes.
- **Owner.** script-agent.
- **Acceptance check.** Either (a) `voice.proposed.json` has no `a4` key, `script.md` totals 127 syl, END hold 2.80 s, and all three totals in 45–55 s; or (b) `script.md:138` and `:150` no longer claim `s9` "can only describe" it, and the justification names the second-person beat.

**F-04 · Trung · `a2` is credited with the owner's motif and directed at the wrong addressee**

- **Evidence.** `script.md:66`, source cell: "the owner's script has no audible environment … **Motif is the owner's own** (`brief.md` visual identity, research §Audience language)". The owner's ten lines contain no window and no rain-as-sound; the rain-as-audible-environment beat is the producer's staging. Separately, `script.md:66` and `voice-direction.md:74` direct `a2` to be "almost said **to the room** rather than to the viewer", while `brief.md:35`, `voice-direction.md:21` and every other shot address exactly one person ("bạn") directly.
- **Concrete change.** Rewrite the `a2` source cell to: "**[ADD]** sensory line, `script-agent`; the rain motif derives from the owner's own umbrella metaphor (line #9) — the window and the rain-as-sound are produced staging, not the owner's wording." Change `voice-direction.md:74`'s "almost said to the room rather than to the viewer" to a closeness instruction that keeps the addressee ("said as if the narrator had just noticed it, still to one listener, never stage-voiced"), and drop the same phrase from `script.md:66`.
- **Owner.** script-agent.
- **Acceptance check.** `grep -n "owner's own" script.md` returns only the instance for the umbrella in `s9`; `grep -n "to the room" voice-direction.md` returns nothing; the `a2` source cell names `script-agent` as the author of the line.

**F-05 · Trung · the sidecar's phrase-join rule is undeclared**

- **Evidence.** SKILL Phase 2b requires that concatenating the phrases reproduce each canonical value exactly. In 13 of 14 keys the boundary falls exactly on the canonical single space (`voice-performance.proposed.json:64`+`:73` → `voice.proposed.json:2`; `:95`+`:104`+`:113` → `:3`; `:467`+`:476`+`:485` → `:15`), and no phrase adds, removes or normalises a character. But neither the file nor `voice-direction.md` states the join, so an assembler joining with `""` produces `…đến bạnmỗi khi…` (one merged word) and the ASR/CER check at phase 3b fails on 13 clips.
- **Concrete change.** Add `"phraseJoin": " "` to `voice-performance.proposed.json` (top level or per shot) and a sentence to `voice-direction.md` §Production-metadata note: "phrase texts are joined with exactly one space; the join is verified by test against `voice.json` before generation".
- **Owner.** script-agent.
- **Acceptance check.** For all 14 keys, `" ".join(phrases) == voice.json[key]` is true byte-for-byte, and the field is present in the file.

**F-06 · Trung · the brief claims a user-confirmed voice benchmark that the phase-2 files call pending**

- **Evidence.** `brief.md:10`: "Voice name: Thanh Long (**benchmark selection confirmed by user**)" and "Output voice slug: `thanh-long` after gate A". Against it: `voice-direction.md:11` "Status: `pending voice-route benchmark`" and `:17` (four steps still owed); `voice-performance.proposed.json:5` engine "tbd", `:27` `selectedReference: null`, `:29` `whyPending`, and all fourteen `reference.source` = "pending voice-route benchmark"; `script.md:165` "Voice route: `pending`"; `status.json:134` "route 2 Thanh Long reference accepted". `owner-notes.md` contains only two "hi" notes, so the confirmation is not in the record. `docs/.../voice-ref/refThanhLong.wav` **does** exist (verified by listing the folder), so the practical exposure is skipping the benchmark, not a missing file.
- **Concrete change.** Resolve to one truth before gate A closes: either `brief.md:10` is corrected to "Thanh Long proposed, benchmark pending" or the confirming instruction is recorded (dated, in `owner-notes.md` or the status log) and `voice-direction.md` §Voice reference + all fourteen `reference` fields + `selectedReference` are filled with the same slug. Pick one and make the other three files match.
- **Owner.** script-agent for the three phase-2 files; `video-director` for `brief.md` and `status.json` (owner-owned).
- **Acceptance check.** `grep -c "pending voice-route benchmark" voice-performance.proposed.json` is either 0 or 14, and the same answer is true of `brief.md:10`'s parenthetical and of `status.json`'s note — never a mix.

**F-07 · Trung · the hero's asset class is unstated while the shot table demands photographic micro-actions**

- **Evidence.** `brief.md:40` and the `story` rubric row (`SKILL.md:323`) require "a consistent character acting out the beat, with expressive close-ups". The shot table relies on: dry collar against soaked fabric (`:62`), "the other person's shoulders visibly drop **under her hand**" (`:64`), "rain beads on the rim and drips off the lower edge onto wet pavement" (`:62`), "the black screen … shows her face" (`:69`), "a dark wet patch **begins to spread** … darkens across her collar … her shoulder is **still wet**" across three shots (`:73`, `:74`, `:75`), "the street lamp broken into moving dots on the water" (`:66`). The repo's established `story` build is an SVG stick figure plus typography — `src/videos/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/kit.tsx:89–96` and `scenes.tsx:67–70` — which renders none of these. Every `source` cell instead defers with "Image = design", which leaves design holding an unstated photographic requirement.
- **Concrete change.** Add one paragraph to `script.md` §2 stating the intended asset class for the hero (photographic plate composite / illustrated figure / SVG), naming the deterministic technique for the four continuous elements (rain beads, wet-patch spread across `s9`→`a4`→`s10` from **one** seeded asset, blinking cursor, moving lamp dots), and stating that the wet patch must be one asset across the three shots. Then fix `brief.md:40` if the chosen class cannot deliver "expressive close-ups", so the profile requirement and the build agree before D.
- **Owner.** script-agent (script.md, and the brief line if it must change — director-owned).
- **Acceptance check.** `script.md` names the asset class and one seeded, cross-shot-continuous asset for the wet patch; `design-spec.md` can map every image cell to a shot card without changing the script.

**F-08 · Thấp · superseded-draft number with no retained artifact**

- **Evidence.** `script.md:36` and `:105`: "the previous 10-key draft spent 19.25 s (41 %)". The only reference is "see §4", and §4 restates it; no earlier draft exists in `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/` (folder listing: `brief.md`, `research.md`, `script.md`, `script.alt-1.md`, `script.alt-2.md`, `hook-options.md`, `voice*.json`, `voice-direction.md`, `status.json`, `status.lock`, `owner-notes.md`, `voice-ref/`). 19.25/49.46 = 38.9 %, not 41 %.
- **Concrete change.** Delete the comparison, or restate it as the 10-key arithmetic actually used ("111 owner syl + the two connectors of the earlier draft"), or quote the source file and timestamp.
- **Owner.** script-agent. **Acceptance check.** every historical number in `script.md` names its file, or is gone.

**F-09 · Thấp · the title-line contingency is unrecorded**

- **Evidence.** `script.md:76`, `brief.md:54, 59`, `hook-options.md:49` all agree the title is a silent END card — correct (see §2 above) — but nowhere is written what happens if the owner asks for it spoken, which is the one likely late change.
- **Concrete change.** Add one line to `script.md` §2 END row: "if the owner asks for the title spoken, it replaces the start of the 2.40 s hold (11 syl ≈ 2.82 s at 3.9 → total 49.9 s, recomputed in §1) and the silent tail shortens to ≈1.5 s; the owner's wording is never dropped to make room."
- **Owner.** script-agent. **Acceptance check.** the contingency and its arithmetic are in `script.md`; the card keeps `Bạn` in both stacked elements.

**F-10 · Thấp · ALT-2 breaks owner line #10 and its own check passes it**

- **Evidence.** `script.alt-2.md:55` and its verification row at `:152` read `Và hộ cũng cần một người hỏi: …` — `hộ` for `họ` — while citing `brief.md L27` and marking the row "✔". ALT-2 is not the selected artifact, so nothing ships, but the file is a gate-A input and its self-check is unreliable.
- **Concrete change.** Fix the character in both places and re-run the variant's own verbatim check; add the row-level reason to the table so a future reader sees the diff was found, not assumed.
- **Owner.** script-agent-alt-2 (via the director, if that session is gone).
- **Acceptance check.** `grep -n "Và hộ" docs/*/*.md` returns nothing in any video folder.

**F-11 · Thấp · register and cross-file accent mismatches**

- **Evidence.** (a) `a1`'s accent phrase `nhẹ hẵn xuống` (`voice.proposed.json:4`, `script.md:64`, emphasis at `voice-performance.proposed.json:137`) rests on an idiom that is doubtful for "shoulders visibly drop" — `Vai người khác chùng xuống.` is the ordinary Vietnamese for it. (b) `a4` opens with the written-register classifier `Chiếc ô` (`voice.proposed.json:14`, `script.md:74`); spoken Vietnamese takes `Cái ô`. (c) accent words differ across the three files: `s5` is `một lúc · lại thôi` (`script.md:68`, `voice-direction.md:76`) but `["nghĩ một lúc", "lại thôi"]` (`voice-performance.proposed.json:253`); `s6` lists accent `nhắn` (`script.md:70`, `voice-direction.md:78`) with **no** emphasis entry in either phrase (`:326`, `:332`); `s8` lists `biết` (`voice-direction.md:80`) but the sidecar's `accentWords` is `["không…"]` (`:376`).
- **Concrete change.** (a)/(b) are the spokenness reviewer's call — if they are changed, `script.md` §1 syllable counts and every second figure must be recomputed. (c) is mine: make the accent-word strings identical in `script.md`, `voice-direction.md` and `voice-performance.proposed.json`, and give `s6`'s `nhắn` an emphasis entry (or drop it from both lists).
- **Owner.** script-agent (c); spokenness lens for (a)/(b).
- **Acceptance check.** for each of the 14 keys, the accent set is one string list in all three files, and every accent word appears in some `emphasis` array of that key.

**F-12 · Thấp · hook doc claims a five-hook source it evaluates four of**

- **Evidence.** `hook-options.md:4` — "Sources: `research.md` 'Five hook possibilities' #1–#5"; the decision table (`:65–70`) has rows for H1–H4 only (from #1, #4, #5, #2). #3 (`research.md:18`) is used as the 33.92 s payoff (`script.md:73`) and never offered as an opener, without saying so.
- **Concrete change.** Change `:4` to "#1, #2, #4, #5 evaluated as openers; #3 is held as the umbrella payoff (see `script.md` §2 `s9`)" — one line, no change of decision.
- **Owner.** script-agent. **Acceptance check.** every research hook number is either a candidate row or explicitly assigned a non-hook role.

**F-13 · Thấp · the END title's second element breaks the ≤6-word on-screen rule — do not fix it by rewording**

- **Evidence.** `script.md:76` "owner's title line, 4 + 7 words, verbatim, stacked"; `brief.md:43, 45` set the ≤6-word per-element cap for this video's on-screen text. ALT-1 hit the same wall and resolved it by dropping the repeated `Bạn` (`script.alt-1.md:40–42`); ALT-2 flagged it for the content branch (`script.alt-2.md:60`). The owner's wording outranks the style rule, so the deviation must be **declared**, not silently repaired.
- **Concrete change.** State the deviation in `script.md:76` in ALT-2's form ("exceeds the ≤6-word element cap by one word because the owner's own wording is kept verbatim; `content-agent` must split across two stacked elements and must not drop `Bạn`").
- **Owner.** script-agent (declaration); content-agent implements and must not reword.
- **Acceptance check.** `content-pack.md` END element reads `Bạn không yếu đuối,` / `bạn chỉ đã mạnh mẽ quá lâu.` with both `Bạn`s present.

**F-14 · Thấp · frame 0's thesis must survive thumbnail scale**

- **Evidence.** `script.md:62` / `hook-options.md:14` rest the whole thesis on "**her own collar and shoulders are dry**" while rain beads on the rim and drips — a comparison between two regions of one frame, at the exact size of a TikTok thumbnail (~200 px wide), where a matte dry collar next to wet fabric may not resolve. The owner-facing line this carries is "che ô cho người khác … cũng có những ngày bị ướt" (`brief.md:26`).
- **Concrete change.** Add one sentence to `script.md:62` / `hook-options.md:14` requiring the dry/wet contrast to be carried by a **tonal difference** (wet sheen and darker value on the other person's shoulders and the pavement, matte dry collar on hers) so it reads at thumbnail size, not by a caption.
- **Owner.** script-agent (text); design-agent implements at D.
- **Acceptance check.** `out/qa/<vid>-cover.png` shows the contrast without reading any text.

---

### 7 · What I could not verify

1. **No shell in this runtime**, so `python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau` was **not run** and no exit status exists for this report. Per `.agents/rules/01-status-truth.md` S5 the director must run it and treat my audit statement as absent. I read `status.json` instead: stage `script: in_progress`, `reviews: {}`, `next` set, agents `video-director: running` / `script-agent: done` — no contradiction visible, but that is a read, not an audit.
2. **No audio, no listening.** Every second in `script.md` §1, `brief.md:56–59` and `hook-options.md` is a 3.9 syl/s planning-rate projection, not a measurement. I verified the *arithmetic* (142 syl, 111 owner + 31 add, 13.05 s silence, slot chain, band table) and found it internally consistent to ±0.01 s; I verified **no** actual syllable rate, pause, emphasis or naturalness, and I make no claim about how the voice will sound.
3. **The voice reference file.** `docs/.../voice-ref/refThanhLong.wav` exists (folder listing) and `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav` exists, but `brief.md:10`'s "8.2 s mono 24 kHz pcm_s16le" could not be measured without `ffprobe`, and whether the file is byte-identical to its source could not be checked.
4. **Whether `a1`/`a4`'s register notes and the ten owner lines read naturally when spoken.** I judged the ADD lines' sayability as asked, but naturalness, breath placement and whether the owner's own lines need a re-read are the spokenness lens's primary call; I flag `nhẹ hẵn xuống` and `Chiếc ô` as questions, not as defects I measured.
5. **Rendering.** No frame was rendered, so every image/action cell (wet-patch continuity, thumbnail legibility, the black screen reflecting her eyes, the lamp's moving dots) is judged as *specified*, not as *achievable*. F-07 records the specification gap; whether it is achievable can only be confirmed at D, E and C.
6. **Visual feasibility against the video-shotcraft gallery.** I did not walk `SC/gallery/media` for shot cards matching the umbrella/wet-shoulder beats, so I cannot say whether a proven card exists; my F-07 rests on the repo's own `story` implementation instead.
7. **The `research.md` unsourced claims (C12/C13) I could not repair or attribute** — no external search was run, and `research.md` is not my file. I report them as they stand.
8. **Whether the owner's account really contains no deletion.** The owner supplied the ten lines; if the deletion happened and simply was not written down, F-01 changes from "remove it" to "record it in the brief's mandatory block so the lock covers it". I cannot see past `brief.md:16–27`, so I flag this as the one question in this report that only the owner can answer — and it does not block the rest of F-01, because the *current* packet has no source for the line either way.
