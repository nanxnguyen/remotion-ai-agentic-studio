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

---

## Round 2 — lens: fidelity & claims

Reviewer `script-reviewer-r2-fidelity`. New clean context: I wrote neither this packet nor round 1, and I
did not see round 1 until I read it. Judge only; nothing was fixed. **No shell in this runtime** — no
`pipeline.py`, no `ffprobe`, no audio, no rendered frame. Every check below is a read or arithmetic done
here; nothing I could not run is listed in §7.

Inputs re-read in full this round: the merged `script-review.md`, this file's round-1 section,
`brief.md`, `research.md`, `script.md`, `hook-options.md`, `voice.proposed.json`, `voice-direction.md`,
`voice-performance.proposed.json`, `status.json`, `owner-notes.md`; plus the two prior videos the packet
cites as its voice-route precedent (`docs/cuoc-goi-nho-cua-me/`, `docs/thuong-hay-so-bat-dau-lai/`) and
`SKILL.md:316–323, 365, 516–533`.

**Headline.** All ten mandated lines are still verbatim, in the owner's order, and the new split of owner
line #2 rejoins byte-for-byte. Every round-1 Cao in this lens is closed and the producer's arithmetic
reproduces to ±0.01 s. What is left is not the script — it is four small documentation defects, three of
them provable by internal contradiction inside the packet's own numbers, plus one stale current-state
field in a director-owned file that round 1's own acceptance check named. **8.3 / 10, verdict revise**,
on four open Trung and no Cao. Three of the four are one-line edits that need no recount.

---

### 0 · Closure table — every round-1 ticket in this lens, by its acceptance check

| id | round-1 severity | acceptance check, as written | result | evidence |
|---|---|---|---|---|
| **F-01** | **Cao** | 13 keys; deletion in the **image** column only; source cell "image = design (staged), no voice key"; `bấm xoá` never in speech/sidecar/captions | **fixed, residual** | `voice.proposed.json:2–14` = 13 keys, no `a3`. `script.md:129` is the new `img1` row: spoken column "silence", source cell "**image = design (staged), no voice key** (`F-01`)", backspace staged inside `s5`'s 1.70 s hold, which `:181` names as the beat. Sidecar `keyPlan.noVoiceKeyShots` `:49`. Grep `bấm xoá` over the folder hits only `script.alt-1.md:22` (a non-selected variant's own inventory) and the three round-1 reports — never the canonical voice, the sidecar or a caption. **Residual: the on-screen-text cell → NEW-01** |
| **F-02** | Trung | identity reproduces the total ±0.01 s for every rate; printed ceiling margin = recomputed; `status.json`'s script-stage note no longer carries "46.86-51.43 s" | **fixed in every producer-owned file; acceptance check NOT met on `status.json`** | `script.md:15–21` publishes `planningTotal = Σ(syl/rate) + 2.54 + 10.70 + 3.10 = +16.34`; the table gained a `pause after (inside clip)` column (`:23`); `:45–52` recomputes 4.2/4.1/4.0/3.9/3.8/3.7; `:54` states break-even 4.43 / 3.29; `brief.md:60`, `hook-options.md:5, 100` and sidecar `benchmark.identity:29` agree. I recomputed every figure from `voice.proposed.json` (§2) — all reproduce. **`status.json:33` still reads "14 keys, 142 syl, 46.86-51.43 s" → NEW-04** |
| **F-03** | Trung | option (a): no `a4` key, 127 syl, END hold 2.80 s, all three totals inside 45–55 | **fixed — differently, with more margin** | No `a4` key. `script.md:134` = `img2`, spoken "silence", staged inside `s9`'s 1.30 s hold, named as a beat at `:188`; CP2 registry `:209` now `s1 frame 0 → s9 → img2 → s10`; the refuted justification ("the half of contrast pair 2 that `s9` can only describe") is gone; `:257` records the removal and its reason. Total is 127 syl ✓ but END hold is **3.10 s, not the 2.80 s the option proposed** — totals 46.58 / 48.90 / 50.66, i.e. 1.58 s above the floor at 4.2 and 4.34 s below the ceiling at 3.7, verified. The option's intent is met with more headroom than proposed; I record the deviation rather than pretend the number matches |
| **F-04** | Trung | `grep "owner's own" script.md` returns only the `s9` umbrella instance; `grep "to the room" voice-direction.md` returns nothing; `a2` source cell names `script-agent` | **fixed in substance; literal grep would not pass** | `script.md:126`: "**[ADD]** sensory line, `script-agent`. The rain motif derives from the owner's own umbrella metaphor (line #9); **the window and the rain-as-sound are produced staging, not the owner's wording**", repeated at `:253`; `voice-direction.md:78` now "still to one listener, never stage-voiced". `to the room` → 0 hits in `script.md` and `voice-direction.md`. `owner's own` now appears in the `a2` row and §7 (both crediting the umbrella, which is the ticket's point) and no longer in `s9`. The check's *purpose* — no line may claim the owner's wording — holds; I say so instead of asserting a grep that would fail |
| **F-05** | Trung | `" ".join(phrases) == voice.proposed.json[key]` byte-for-byte for all keys; field present | **fixed** | `phraseJoin: " "` (`voice-performance.proposed.json:17`) + `phraseJoinRule` `:18`; mirrored `voice-direction.md:91`, `script.md:279`. I re-joined all 13 keys by hand from the file — byte-for-byte equal in every case (§1) |
| **F-06 / A-C1** | Trung / **Cao** | no mix of `pending` and `selected` between `brief.md:10`, `voice-direction.md` and the sidecar | **fixed** | `voice-direction.md:9–17`: route 2, reference named, `referenceSelectionStatus: selected`, "nothing in the packet says `pending`". All 13 `shots.*.reference.source` = the local WAV (`:75, 106, 137, 168, 190, 221, 252, 283, 314, 345, 376, 398, 429`) and all 13 statuses `selected`; `benchmark.status` `:20` "route selected — no pending state remains", `ownerConfirmed: false` `:22`. Grep `pending voice-route benchmark` over the folder → **0 hits** in the packet. `brief.md:10` (director-owned) now reads "**selected by `video-director`, not confirmed by the owner**", matching `owner-notes.md` (N1/N2 = "hi"). Precedent verified by read: both `voice-ref/refThanhLong.wav` files exist and both videos are delivered (`cuoc-goi-nho-cua-me/status.json:34–38` render done 43.7 s, gate C 9.0 at `:175–181`; `thuong-hay-so-bat-dau-lai/status.json:20–22, 310–313` render done, verified 59.00 s). Two observations, no ticket: byte-identity of the WAVs is unverifiable without a shell (the packet attributes the file facts to the director, `voice-direction.md:16` — honest), and a **third** prior video also carries `voice-ref/refThanhLong.wav` (`docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/`), with three more citing the same file, so "the two videos" undercounts without being false. **NEW-03 sits in the same paragraph** |
| **F-07** | Trung | asset class named; one seeded cross-shot asset for the wet patch; every image cell mappable to a shot card | **fixed as a declaration; residual NEW-06** | `script.md:97–111` §2.3: "one consistent stylised figure built as vector/SVG plates and typography — **no photograph, no live-action plate, no photoreal face, no stock footage**", a 7-row mechanism table (wetness scalar; **one seeded wet-patch asset continuous across `s9` → `img2` → `s10`, never re-seeded per shot**; shoulder endpoints interpolated; rim beads on a fixed phase function of the frame index; cursor by frame-index parity; lamp dots by deterministic scatter; rim rotation on the same seeded umbrella), plus "No shot in §3 requires `Date.now()`, `Math.random()`, a live video or an actor". `voice-direction.md:3` points at it. Grep `her face` over `script.md` → **0 hits** (only the alt variants keep it; they are not the artifact). The class now matches the repo's own `story` build (SVG figure + typography, per the round-1 evidence `kit.tsx:89–96`). Two of nine mechanisms uncovered → NEW-06 |
| **F-08** | Thấp | every historical number names its file, or is gone | **fixed** | Grep `19.25` and `41 %` over `script.md` → 0 hits; the superseded-draft comparison is gone from §1 and §5 |
| **F-09** | Thấp | the contingency and its arithmetic are in `script.md`; the card keeps both `Bạn`s | **fixed as a record; arithmetic → NEW-07** | `script.md:269` states the contingency, says "§1 must then be recomputed", and keeps both `Bạn`s; `:265–267` keeps the owner's wording and forbids dropping it |
| **F-10** | Thấp | `grep "Và hộ" docs/*/*.md` returns nothing | **not fixed — by the director's own instruction** | The merged fix list says "do not edit the alt files; gate A judges the primary". `script.alt-2.md:55` and its self-check at `:152` still read `Và hộ`. Not blocking, unchanged from round 1, Cao only if ALT-2 were ever adopted. Primary verified clean (§1) |
| **F-11** | Thấp | (a)/(b) spokenness lens; (c) one identical accent list in all three files, every accent word in some `emphasis` array | **fixed; one residual NEW-05** | (a) `nhẹ hẵn xuống` → `chùng xuống`, `Còn bạn đứng ngoài.` → `Còn bạn thì đứng ngoài.` (`voice.proposed.json:4`, justified `script.md:252`); (b) moot — the `Chiếc ô` line is gone. (c) I compared all 13 keys across `script.md` §3, `voice-direction.md` §Shot direction and the sidecar: **one identical string list in all three for every key**, and every accent word does appear in an `emphasis` array of its own key — the check passes as written. For `s6` that emphasis array sits on the phrase that lacks the words → NEW-05 |
| **F-12** | Thấp | every research hook number is a candidate row or explicitly assigned a non-hook role | **fixed** | `hook-options.md:4`: "**#1, #2, #4 and #5 are evaluated as openers below; #3 is held as the umbrella payoff at `s9` and is never offered as an opener**" |
| **F-13** | Thấp | END element declared as a deviation; owner's wording kept; `content-agent` must not reword | **fixed** | `script.md:265–267`: 7 words, "one over this video's ≤ 6-word on-screen cap … It is not repaired by dropping the repeated `Bạn` … `content-agent` must split it as written and must not drop `Bạn`" |
| **F-14** | Thấp | the dry/wet contrast is carried by tone/sheen, not a caption | **fixed** | `script.md:93` and `hook-options.md:20`, both inside the canonical cover paragraph reproduced word for word in `brief.md:56`, `script.md:90`, `hook-options.md:16` (I compared the three: identical) |

**Count: 8 fully closed · 5 fixed with a residual (F-01, F-02, F-07, F-09, F-11) · 1 deliberately not fixed
(F-10, by the director's instruction). 1 round-1 Cao open: none.**

---

### 1 · Mandated-line verification, re-run from scratch

Source of truth `brief.md:16–27`; compared against `voice.proposed.json:2–14`, `script.md:121–136` (spoken
column), `script.md:146–158` (caption chunks), `voice-performance.proposed.json` `shots.*.phrases`, and
`voice-direction.md:73–85`. Unit = space-separated token.

| # | owner line (`brief.md`) | key(s) | syl | order | verbatim? | character checks |
|---|---|---|---:|---|---|---|
| 1 | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | `s1` `:2` | 11 | 1st | **yes** | all diacritics; final `.` kept |
| 2 | `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` | `s2a` `:3` + `s2b` `:5` | 9+9=18 | 2nd, in two halves | **yes — split at a full sentence boundary, rejoins byte-for-byte** | see §1.1 below |
| 3 | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | `s3` `:6` | 15 | 3rd | **yes** | comma after `tối`; `rất lâu`, `màn hình điện thoại` intact |
| 4 | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | `s4` `:8` | 8 | 4th | **yes** | colon after `nhắn`; inner message in **straight** quotes (U+0027); final `.` inside the quotes |
| 5 | `Rồi nghĩ một lúc, bạn lại thôi.` | `s5` `:9` | 7 | 5th | **yes** | comma after `lúc` |
| 6 | `Không phải vì không có ai để nhắn.` | `s6` `:10` | 8 | 6th | **yes** | — |
| 7 | `Mà vì bạn đã quen với việc mình phải là người ổn.` | `s7` `:11` | 12 | 7th | **yes** | `với việc` / `mình phải là người ổn` not reordered |
| 8 | `Bạn biết không…` | `s8` `:12` | 3 | 8th | **yes** | single **U+2026**; no `...` substitution anywhere in the packet |
| 9 | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | `s9` `:13` | 14 | 9th | **yes** | `bị ướt` intact |
| 10 | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | `s10` `:14` | 15 | 10th | **yes** | `họ` not `hộ`; colon after `hỏi`; `?` inside the quotes |
| — | `[ADD]` `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` | `a1` `:4` | 10 | between #2's halves | marked `[ADD]`, attributed to `script-agent` (`script.md:123, 252`) | adds an observation the account does not contain; invents no event |
| — | `[ADD]` `Ngoài cửa sổ, mưa rơi đều.` | `a2` `:7` | 6 | after #3 | marked `[ADD]`, attributed to `script-agent`; umbrella motif credited to owner line #9, window/rain-as-sound declared producer staging (`script.md:126, 253`) | staged environment, entailed by the owner's own umbrella metaphor |

**Result: 10/10 verbatim · 10/10 in the owner's original relative order · 0 rewrites · 0 paraphrases ·
0 drops · 0 duplications · 0 duplicated owner line.** Owner syllables 111, added 16, total **127** —
recomputed token by token, not read from the file.

**Caption re-verification (all 13 keys, `script.md:146–158`):** concatenating the chunks of each key
reproduces `voice.proposed.json[key]` word for word in **13/13**, including `'Hôm nay mình mệt quá.'`,
`Bạn biết không…` and `'Hôm nay có chuyện gì` + `với bạn thế?'`. `img1`/`img2`/`END` carry no caption
(`:159`), which is correct for two silent image beats but is one of the three things NEW-01 is about.

**Sidecar fidelity (SKILL Phase 2b):** `" ".join(phrase.text)` equals the canonical value byte-for-byte
in **13/13** keys, checked by hand: `s1` `:86`+`:95`→`:2`; `s2a` `:117`+`:126`→`:3`; `a1` `:148`+`:157`→`:4`;
`s2b` `:179`→`:5`; `s3` `:201`+`:210`→`:6`; `a2` `:232`+`:241`→`:7`; `s4` `:263`+`:272`→`:8`;
`s5` `:294`+`:303`→`:9`; `s6` `:325`+`:334`→`:10`; `s7` `:356`+`:365`→`:11`; `s8` `:387`→`:12`;
`s9` `:409`+`:418`→`:13`; `s10` `:440`+`:449`→`:14`. Every boundary falls on a canonical single space,
and the join rule is now declared in three places. Straight quotes survive identically in canonical and
sidecar.

#### 1.1 · Is splitting a mandated line acceptable fidelity? — **yes, on this evidence**

`H-01` ordered owner line #2 split into two verbatim halves around the payoff. I judge the result, not the
instruction:

1. **The split point is a sentence boundary.** `s2a` ends `…Biết phải nói gì.` and `s2b` begins
   `Biết làm sao…`. Each half is a complete utterance on its own; nothing is severed mid-clause.
2. **The rejoin is byte-exact.** `"Bạn biết cách an ủi. Biết phải nói gì." + " " + "Biết làm sao để người
   khác thấy ổn hơn."` = owner line #2 exactly. No word added, removed, reordered or re-punctuated.
3. **Captions still reproduce the line word for word**, as `brief.md:16` requires — each half verbatim in
   its own chunk pair, and the two together the whole line.
4. **The interruption is by a declared `[ADD]` connector**, and it is bracketed by real timeline silence,
   not by a pause smuggled inside an owner line (0.25 s after `s2a`, 0.30 s after `a1`; `script.md:172–174`).
5. **Nothing is reordered.** The owner's tenth... ninth... line #9 still arrives after #8 and before #10;
   the split is *inside* one line, so the owner's relative order is untouched.

The one consequence worth recording for `content-agent`, not as a ticket: on screen the owner's line #2
will be read as two blocks separated by `a1`'s caption, so the two halves must each be readable in one
glance (they are: 5 and 4 words) and the `a1` caption must not overlap either. My round-1 note that "each
mandated line occupies exactly one key" is no longer true, and I record that as a change of fact, not a
regression: the lock that matters — the characters — is intact.

---

### 2 · Regression check on what the fixes touched

**`[ADD]` set.** Grep and read: `a1` and `a2` only (`script.md:7, 248–257`; `voice.proposed.json:4, 7`;
sidecar `keyPlan.addedKeys: ["a1","a2"]`). 16 added syllables, all attributed to `script-agent`, none
credited to the owner. `script.md:255` states neither "is a summary of an owner line" nor "invents an
event" — for `a1` that is true (the frame at `s2a`→`a1` shows the shoulders dropping); for `a2` it is
true by staging declaration. No dangling `a3`/`a4` reference survives anywhere in the packet (they appear
only in the round-1 reports and in `script.alt-1.md`'s inventory of its own variant).

**The identity, recomputed from the canonical file.** `Σsyl = 127`; `ΣpauseAfterSeconds = 2.54`
(0.22+0.28+0.24+0+0.26+0.14+0.24+0.18+0.18+0.24+0+0.26+0.30 — matches the sidecar's thirteen values one
by one); `ΣpostClipHold = 10.70`; END 3.10; **silence 16.34 s**. `127/3.9 + 16.34 = 48.90` ·
`127/4.2 + 16.34 = 46.58` · `127/3.7 + 16.34 = 50.66`; break-even 4.43 / 3.29 (the exact ceiling value is
3.285, so 3.29 errs conservatively and the range statement is true); silence share 33.4 %. All of
`script.md:39–54`, `:192`, `brief.md:60`, `hook-options.md:5, 100` and sidecar `benchmark:29–41` agree.

**Slot chain and structural marks.** I re-derived every row of `script.md:23–38` from the canonical
syllables and the sidecar's pauses: all slot starts, clip ends and holds reproduce, with two ±0.01 s
rounding artefacts in the printed cells (`a2` clip end printed 18.77 where the rounded arithmetic gives
18.78, and `s10` clip end printed 43.90 where the exact value is 43.905). Both sit inside the ±0.01 s
tolerance that F-02's own acceptance check allows, so I raise no ticket — same treatment round 1 gave the
two artefacts it found. The five structural marks reproduce exactly: hook complete 2.62/2.82/2.97; **first
payoff** (`a1` phrase 1) 7.00/7.46/7.81 — I recomputed it as `20/r + 1.05 + 5/r` and got the same three
numbers, so the payoff really does land inside 3–8 s at every rate in the band; owner line #2 complete
10.88/11.59/12.13; re-hook `s4` at `60/r + 3.64` = 17.93/19.02/19.86, inside 15–20 s at every rate.

**One derived figure does not survive.** §1.1's "last word of `s10`" (41.28/43.60/45.36) is the end of
the last *phrase's speech*, i.e. `127/r + 11.04`, excluding `s10`'s 0.30 s trailing `pauseAfterSeconds`.
§1's table puts `s10`'s clip end at 43.90 (which includes that 0.30). Both are internally right; the two
together make the post-word tail **5.30 s**, not the 5.00 s the packet prints. → NEW-02.

**Route truth across the packet.** 13 references, 13 `selected` statuses, `ownerConfirmed: false`,
`brief.md:10` director-selected and owner-not-confirmed, `owner-notes.md` = two "hi" notes, and the
precedent paths verified to exist. One unsourced adjective survives in the same paragraph → NEW-03.

**Asset class against the shot table.** §2.3 now names the class and a mechanism for 7 of the 9 distinct
micro-actions. Two cells in §3 are outside the table and outside the declaration → NEW-06.

---

### 3 · Claims table (every assertion a viewer or a downstream agent could read as fact)

| # | claim | where | source offered | verdict |
|---|---|---|---|---|
| C1 | Ten spoken lines are the owner's account, verbatim | `voice.proposed.json:2–14` | `brief.md:16–27` | **true**, 10/10, one split rejoining byte-exact (§1) |
| C2 | Cover headline `Ai che ô cho bạn?` | `script.md:95, 121`; `brief.md:57`; `hook-options.md:23` | new text by `script-agent`, not a compression of any owner line | **true** — it asks a question the video answers at `s10`; no claim |
| C3 | Recreated chat bubble + incoming call marked `minh hoạ` | `script.md:127, 130` | label in the on-screen column | **compliant** with `brief.md:51` and SKILL:365 Labels |
| C4 | A deletion happened | `script.md:129` (image) and **`:129` (on-screen-text cell)** | source cell "image = design (staged), no voice key"; the row's own spoken column says "this video asserts none" | **image staging is authorised and accepted** (it is F-01's own prescribed fix, and `script.alt-1.md:73` is its precedent). **The on-screen-text cell is a second, undeclared channel for the same assertion → NEW-01.** Round 1's open question — whether the owner actually deleted — is unchanged and still only the owner can answer; nothing in the fix pre-empts it |
| C5 | Rain audible outside a window | `voice.proposed.json:7`; `script.md:126` | "the rain motif derives from the owner's own umbrella metaphor (line #9); the window and the rain-as-sound are produced staging" | **correctly attributed** now (F-04 closed) |
| C6 | Health / diagnosis / promise language | — | — | **none**: no statistic, no percentage, no study, no "this will fix you", no advice, no CTA (`script.md:244`, `voice-direction.md:61–62`) |
| C7 | `s10`'s hand belongs to someone already in the video | `script.md:135, 237` | §6.4's introduction table: the saved name rings unanswered at `s6`, its hand acts at `s10` | **acceptable** — it resolves the picture; it does not promise that anyone will come. Must not be art-directed into "someone will save you" |
| C8 | Total runtime 48.90 s (46.58 / 50.66), inside 45–55 s for 3.29–4.43 syl/s | `script.md:45–54`; `brief.md:60`; `hook-options.md:5, 100`; sidecar `:29–41` | the published identity, recomputed by me from `voice.proposed.json` | **true** — the round-1 incomplete budget is closed everywhere in producer-owned files; **the stale copy in `status.json:33` is not → NEW-04** |
| C9 | Post-word audio tail = 5.00 s | `script.md:194`; `voice-direction.md:67`; sidecar `:57–58`; `brief.md:60`; `hook-options.md:100` | "postClipHold 1.90 + END 3.10" | **false as printed, and self-contradicting on one line**: the same sentence says "the mix is silent from 43.60 to 48.90 s" = **5.30 s**. A residual of A-T4 → NEW-02 |
| C10 | "Thanh Long is the repo's **measured** ≈4.1 syllables/s general read" | `voice-direction.md:14` | none in the packet | **contradicted by the repo**: `docs/motion-design-lab/script.md:23` states 4.1 syl/s "is a planning baseline, **not a measured rate**"; the one measured Thanh-Long run I could find is `docs/xay-doi-minh-hay-chung-minh/voice-report.md:24` = 194 syl / 51.75 s = **3.75 syl/s**, and `docs/lam-lai-.../audio-review.md:12` reports 3.5–3.7 → NEW-03 |
| C11 | Voice route justified by two already-delivered videos using the identical reference | `script.md:277`; `voice-direction.md:14`; sidecar `:21` | folder listings + both `status.json`s | **true as stated** (both files exist, both videos rendered and gated). Byte-identity unverifiable here; the packet says so. "Two" undercounts (three more videos carry or cite the file) but does not misstate |
| C12 | Voice confirmed by the owner | — | — | **no such claim survives**: `brief.md:10` says director-selected / not owner-confirmed, sidecar `ownerConfirmed: false`, `voice-direction.md:15` says the same, `owner-notes.md` holds two "hi" notes. **F-06 closed.** I deliberately raise no ticket for a missing *licence* basis: `SKILL.md:521` (rule set 2026-10-17) states voice authorization is not required and must not be asked about |
| C13 | "the previous 10-key draft spent 19.25 s (41 %)" | — | — | **gone** from `script.md` (F-08 closed) |
| C14 | `research.md` hook #1/#3/#5 citations in the source cells | `script.md:121, 133, 136` | `research.md:16, 18, 20` | **traceable**: each of those three research hooks quotes an owner line verbatim, so the source labels now resolve to the owner's own text. Round 1's unsourced "performs well / known resonant image" language (`research.md:8`) is **no longer cited anywhere in the packet** |
| C15 | ALT-2 owner line #10 | `script.alt-2.md:55, 152` | cites `brief.md L27`, marks "✔" | **still `Và hộ`** — unchanged, by instruction (F-10) |
| C16 | §8 title-spoken contingency → "near 47.9 s" | `script.md:269` | the file's own numbers | **reconciles under no reading** (48.90 if the hold is fully absorbed; 49.82 if the tail is 1.2 s; 51.72 if silence is unchanged) → NEW-07 |
| C17 | One asset class, no photo/actor/stock | `script.md:97–111` | the declaration itself | **true and buildable**; two cells contradict it → NEW-06 |

---

### 4 · Scores for this lens

| rubric item | score | evidence |
|---|---:|---|
| **1 · Fidelity (mandated wording + user intent kept)** | **9** | 10/10 owner lines verbatim, in order, with line #2 split at a sentence boundary and rejoining byte-for-byte; captions 13/13 word-for-word; sidecar 13/13 byte-exact (§1). Both Cao/Trung fidelity defects of round 1 are gone and the deletion no longer exists in speech, in the sidecar or in any caption. The two `[ADD]` lines are declared, attributed to `script-agent`, and neither invents an event nor is credited to the owner (`script.md:123, 126, 252–253`). Intent kept: kiệt lực cảm xúc → `s3`/`s7`; khao khát được dựa vào ai đó → `s6`/`s7`/`s10`; no advice, no self-help, no CTA. The silent END card keeps the owner's title verbatim and its contingency is recorded. Held from 10 by **NEW-01** (the deletion reappears as a string in the rendered-text column of the very row created to remove it) and by the fact that the deletion is still *depicted*, which is F-01's own prescribed fix and not re-litigated here |
| **6 · Source accuracy (no unsourced claim; inference not stated as fact)** | **8** | On-screen and spoken text is clean: no statistic, no health or diagnosis claim, no promise to fix, nothing outruns the owner's account. The documentation layer is now internally consistent on the two facts round 1 called false: the runtime band is complete and reproduced (§2), and the route truth is one story across five files with `ownerConfirmed: false`. Round 1's five defects (C9, C10, C11, C13, C15) are all closed. Held from 9 by four remaining inaccuracies, three of them provable from the packet's own numbers: **NEW-02** (a tail figure that contradicts the sentence it sits in, repeated in five files), **NEW-03** ("measured" for a number the repo explicitly calls a planning estimate), **NEW-04** (a current-state status field asserting 14 keys/142 syl/46.86–51.43 s on a 13-key/127-syl/48.90 s packet), **NEW-07** (a contingency total that reconciles under no reading) |
| **7 · Visual feasibility in Remotion** | **8** | §2.3 now declares the asset class (one stylised vector/SVG figure + typography, no photograph/actor/stock), gives a frame-driven mechanism for seven distinct micro-actions, pins the wet patch as **one seeded asset continuous across `s9`→`img2`→`s10`**, and states the determinism rule; the class matches the repo's own `story` build, and "her face" is gone from the primary. Frame-driven motion, the umbrella through-line, the 0–1 s cover and the timing are all renderable. Held from 9 by **NEW-06**: two §3 cells require what §2.3 says the figure cannot deliver (`their mouth is still open when they nod`; `the black screen reflects her eyes`, repeated in §6.3) and neither is in the mechanism table, and `brief.md:40`'s "expressive close-ups" is left unreconciled with "no photoreal face" |

**Lens mean: (9 + 8 + 8) / 3 = 8.3.** Open tickets: **0 Cao · 4 Trung · 3 Thấp** → verdict **revise**.
None of the four Trung requires a recount, a re-render or a change to a single owner line; three are
one-sentence edits.

---

### 5 · Tickets

Closed this round: **F-01 · F-02\*** · F-03 · F-04\* · F-05 · F-06 · F-07\* · F-08 · F-09\* · F-10 (carried by
instruction) · F-11\* · F-12 · F-13 · F-14 — `*` = fixed with the residual recorded below or in §0.
(\* F-02 and F-07 and F-09 and F-11 residuals are listed here as NEW tickets rather than re-opened.)

---

**NEW-01 · Trung · the deletion is asserted a second time, in the rendered-text column**
- **Where.** `script.md:129`, `img1` row, **on-screen-text cell**.
- **Evidence.** The row's spoken column says "*(silence — the owner's account contains no deletion and this video asserts none)*", its source cell says "image = design (staged), no voice key", and §4 `:159` gives it no caption — yet the on-screen-text cell contains the string `` `Xoá từng chữ.` (3 words, as the on-screen key name only)``. §3's own preamble at `:117` defines that column as "On-screen text = headline layer, ≤ 6 words per element, safe zone", and SKILL:365 has `content-agent` lock final on-screen text *from that column*. The same kind of row is treated the other way one line below: `img2` `:134` puts "—" in the same cell. F-01's acceptance check asked for the deletion "in the **image** column only"; the image column delivers it, and the text column now carries it a second time, in a row that says in the same breath that the video asserts no deletion. Both readings of the parenthetical cannot be true at once.
- **Concrete change.** One edit, no recount: move the label into the row key — `**img1` · `Xoá từng chữ.` · internal row name, not rendered**` — and put `—` (with a note "(no on-screen text; the deletion is in the image)") in the on-screen-text cell, exactly as `img2` does.
- **Owner.** script-agent (`script.md`).
- **Acceptance check.** The on-screen-text cells of `img1` and `img2` are identical in form (both `—` + a reason); grep `Xoá` over the folder returns hits only in `script.md` image/key cells, never in an on-screen-text cell, a caption chunk, `voice.proposed.json` or the sidecar.

**NEW-02 · Trung · the post-word audio tail contradicts itself by 0.30 s, in five files (residual of A-T4)**
- **Where.** `script.md:194`; `voice-direction.md:67`; `voice-performance.proposed.json:57–58`; `brief.md:60`; `hook-options.md:100`.
- **Evidence.** `script.md:194` in one sentence: "**Post-word audio tail = `s10`'s 1.90 s hold + END's 3.10 s = 5.00 s** … the mix is silent from **43.60 to 48.90 s**." 48.90 − 43.60 = **5.30 s**. The missing 0.30 s is `s10`'s own trailing `pauseAfterSeconds` (`voice-performance.proposed.json:444`), which §1's table counts (`s10` clip end 43.90) and which the sidecar itself declares as "post-synthesis silence during phrase assembly" (`:67`). §1.1 `:64` confirms the last *word* ends at 43.60 and the clip ends at 43.90 — so the packet knows both numbers and then adds the wrong ones. Round 1's A-T4 caught this field being short by 1.80 s; the fix corrected the model but kept the intra-clip tail out of it. Magnitude is small (9 frames at 30 fps) and **no total, hook, payoff or owner line changes** — but the figure is published in five files and the BGM cut is timed against it, so phase 3b will measure 5.30 s against a declared 5.00 s.
- **Concrete change.** Replace "5.00 s" with "5.30 s" and the sum with `0.30 (last-phrase pad) + 1.90 (hold) + 3.10 (END card)` in all five places; keep `lastWordEndsAtSeconds: 43.6` and `bgmCutsAtSeconds: 43.6` exactly as they are (both are right).
- **Owner.** script-agent (`script.md`, `voice-direction.md`, sidecar); `brief.md:60` and `hook-options.md:100` are producer-editable, `brief.md:10`'s route line is not touched by this.
- **Acceptance check.** Every occurrence of the tail equals `48.90 − 43.60 = 5.30`, and `0.30 + postClipHoldSeconds + silentCardSeconds == audioTailSeconds` in the sidecar.

**NEW-03 · Trung · "the repo's measured ≈4.1 syllables/s" is a planning convention, not a measurement**
- **Where.** `voice-direction.md:14` (new this round; `script.md:275–277` makes the same argument without the word).
- **Evidence.** The sentence "Thanh Long is the repo's measured ≈4.1 syllables/s general read; the plan at 3.9 syl/s is the deliberate slowdown for an intimate register" rests on a number the repo explicitly refuses to call measured: `docs/motion-design-lab/script.md:23` — "Reference estimate is 4.1 syllables/s; this is a planning baseline, **not a measured rate** for the benchmark-selected VieNeu reference". The one measured Thanh-Long run I can point at is lower: `docs/xay-doi-minh-hay-chung-minh/voice-report.md:24` — "Total voice: 51.75 s (194 syllables, avg **3.75 syl/s**)" (that video's `eval.md:6` records the same `refThanhLong.wav`), and `docs/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/audio-review.md:12` reports ~3.5–3.7. The load-bearing word is "measured", and it is what makes 3.9 look like a considered slowdown rather than an unvalidated number.
- **Concrete change.** One sentence, no recount: "4.1 syl/s is this repo's **planning convention** (`docs/motion-design-lab/script.md:23`); the measured Thanh-Long runs in this repo average ≈3.7–3.8 syl/s (`docs/xay-doi-minh-hay-chung-minh/voice-report.md:24`), so the 3.9 syl/s plan is already at the measured rate and the register is carried by holds and emphasis, not by pace."
- **Owner.** script-agent (`voice-direction.md`, and the same clause in `script.md:277` if kept).
- **Acceptance check.** No file in the packet calls 4.1 syl/s (or any planning rate) "measured"; every measured figure carries a `voice-report.md` citation.

**NEW-04 · Trung · `status.json`'s current-state note now contradicts the packet (director-owned)**
- **Where.** `status.json:33` (`stages.script.note`), and the identical string repeated in the log at `status.json:166`.
- **Evidence.** The note reads "phase 2 packet verified consistent on disk (**14 keys, 142 syl, 46.86-51.43 s**); gate A lens review in progress". The packet on disk is **13 keys, 127 syl, 48.90 s** (`voice.proposed.json:2–14`, `script.md:39, 50`). This is a *current-state* field, not a historical log line, and `.agents/rules/01-status-truth.md` requires it to be true at every moment; F-02's acceptance check named this exact string. (`status.json:5 "voice": "tbd"` and `:9 paths.out: …-tbd` are **not** defects: `brief.md:10` says the slug is applied with `pipeline.py voice` *after* gate A passes.)
- **Concrete change.** Director only: `python3 -I scripts/pipeline.py set ban-khong-yeu-duoi-chi-da-manh-qua-lau script …` with a note carrying the current figures (13 keys / 127 syl / 48.90 s at 3.9 syl/s), or a fresh note appended through the same command. No hand edit.
- **Owner.** video-director (status.json is not the producer's file).
- **Acceptance check.** No current-state note or log line in `status.json` mentions 14 keys, 142 syl or 46.86–51.43 s.

**NEW-05 · Thấp · `s6`'s accent emphasis is attached to the phrase that does not contain the words**
- **Where.** `voice-performance.proposed.json:336` (`shots.s6.phrases[1].emphasis = ["không có ai"]`; that phrase's `text` is `"để nhắn."`), with the accent set at `:318`.
- **Evidence.** F-11's check ("every accent word appears in some `emphasis` array of that key") passes literally, but the entry is on the wrong phrase: `Không phải vì không có ai` is phrase 0 (`:325`). Round 1's finding was that `s6` had *no* emphasis entry at all; the fix added one and attached it where the words are not. All other 12 keys place every accent word inside the phrase that carries it — I checked each one.
- **Concrete change.** Move `["không có ai"]` from phrase 1 to phrase 0's `emphasis`; leave phrase 1's `emphasis` empty. No caption, syllable or timing change.
- **Owner.** script-agent. **Acceptance check.** for every key, each `emphasis` entry is a substring of its own phrase's `text`.

**NEW-06 · Thấp · three figure cells need a face the declared asset class says cannot exist**
- **Where.** `script.md:111` ("The face is never required … a stylised figure cannot deliver a face") against `script.md:122` (`their mouth is still open when they say it — their mouth is still open when they nod`) and `script.md:125` ("the black screen reflects **her eyes**"), repeated at `script.md:226`; and `brief.md:40` ("with expressive close-ups where useful").
- **Evidence.** F-07's rewrite removed "her face" everywhere (grep → 0 hits in `script.md`) but left two eye/mouth-level details, and §2.3's seven-row mechanism table covers neither. Round 1's ticket anticipated exactly this ("where this file previously said 'her face', it now says 'her head' or 'her figure'"); the rewrite was applied to "face" and missed "eyes" and "mouth". A stylised figure can carry an open mouth and two eye dots, so the shot table is still buildable and F-07's acceptance check ("design-spec.md can map every image cell to a shot card without changing the script") is met — but the file currently contradicts itself, and `brief.md:40`'s "expressive close-ups" is left unreconciled with "no photoreal face".
- **Concrete change.** One row in §2.3's mechanism table — "eyes / mouth on a stylised figure | two eye dots + a mouth shape as part of the head plate, driven by the same `wetness`/blink scalars" — plus one clause in §2.3: "the close-ups the profile rubric asks for are carried by framing and posture (push-in on the head, shoulder line, hand), not by facial expression". No change to any shot cell.
- **Owner.** script-agent (`script.md`). **Acceptance check.** every eye/mouth-level detail in §3 appears in §2.3's mechanism table, and §2.3 states how the profile's "expressive close-ups" are delivered without a face.

**NEW-07 · Thấp · the title-spoken contingency's total reconciles under no reading (residual of F-09)**
- **Where.** `script.md:269`.
- **Evidence.** "it becomes a 14th key of 11 syl (≈2.82 s at 3.9), which must come out of the END card's 3.10 s hold and shortens the silent tail to roughly 1.2 s; §1 must then be recomputed and the total lands **near 47.9 s**." 48.90 − 3.10 + 2.82 + 1.20 = **49.82 s**; if the tail were zero the total is 48.90 s; if the silence is untouched it is 51.72 s. 47.9 s is reachable only by also cutting 1.9 s of silence that the sentence does not authorise. F-09's acceptance check ("the contingency and its arithmetic are in `script.md`") is met in form; the number is wrong.
- **Concrete change.** Restate as: "48.90 → 49.82 s at 3.9 (2.82 s of speech + a 1.2 s tail replacing the 3.10 s END hold); recompute §1 at that rate; the owner's wording is never dropped." One sentence.
- **Owner.** script-agent. **Acceptance check.** the contingency's total is derivable from the sentence's own numbers.

---

### 6 · Checked and deliberately **not** ticketed

- **Voice authorization / licence basis.** `voice-direction.md:15` says the owner gave "no voice instruction of any kind" in this video's `owner-notes.md`, and the repo elsewhere records an owner purchase confirmation for this voice (`docs/cuoc-goi-nho-cua-me/eval.md:13`, `docs/thuong-hay-so-bat-dau-lai/brief.md:6`). I checked and **raised nothing**: `SKILL.md:521` (rule set 2026-10-17) states voice authorization is not required and must not be asked about. The packet's statement is scoped to selection and is accurate.
- **Whether the owner really deleted the message.** Still only the owner can answer (my round-1 §7.8). The packet depicts it in the image, which is what F-01 prescribed. Not re-opened.
- **The three named prior videos vs "two".** Undercounting, not a false claim. No ticket.
- **±0.01 s rounding artefacts** in two printed cells of `script.md` §1 — inside the tolerance F-02's own acceptance check allows.

---

### 7 · What I could not verify

1. **No shell in this runtime**, so `python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau` was **not run** and this report carries no audit statement. Per `.agents/rules/01-status-truth.md` the director must run it and treat my audit statement as absent. I read `status.json` instead (`script: in_progress`, A 7.3 recorded, `next` set) — a read, not an audit. NEW-04 is a read finding, not an audit finding.
2. **No audio, no listening.** Every second in the packet is a 3.9 syl/s planning projection. I verified the *arithmetic* (127 syl, 16.34 s silence, the slot chain, all six rates, the five structural marks) and I verified **no** measured rate, pause, emphasis, naturalness or contour. I make no claim about how the voice will sound, and none of my scores depend on it.
3. **The reference WAVs.** The three `voice-ref/refThanhLong.wav` files exist (folder listings). Their duration, sample rate, channel count and **byte-identity** to each other could not be checked without `ffprobe`/`shasum`. The packet attributes those properties to the director (`voice-direction.md:16`, `script.md` §9) and says so — correct handling, but the underlying facts remain second-hand.
4. **Whether `voice-performance.proposed.json` would validate and run.** No `validate_voice_performance.py`, no `gen-voice-clone.py`. I verified the join rule, the declared controls and the absence of acting cues by reading; I did not execute either script.
5. **Rendering.** No frame was rendered. §2.3's mechanisms, the wet-patch continuity across `s9`→`img2`→`s10`, the thumbnail legibility of the dry/wet contrast and the cover's readability with sound off are judged as *specified*. Achievability can only be confirmed at D, E and C.
6. **`content-pack.md` behaviour.** I did not and could not see how `content-agent` reads `script.md`'s on-screen-text column — which is exactly why NEW-01 is filed as Trung rather than dismissed as a parenthetical.
7. **The measured rate of this voice.** NEW-03 rests on documents other videos wrote about their own measured clips; I did not re-measure any of them.
8. **Hook and specificity.** Not my lens. I confirmed only that `hook-options.md` exists with ≥3 candidates and a decision table, and that the payoff mark it and `script.md` share (7.00/7.46/7.81 s) reproduces arithmetically.

---

## Round 3 — lens: fidelity & claims

Reviewer `script-reviewer-r3-fidelity`. New clean context: I wrote nothing in this packet and I did not
see round 1 or round 2 until I read this file. Judge only; nothing was fixed, and **I did not touch
`script-review.md`**. **No shell in this runtime** — no `pipeline.py`, no `ffprobe`, no audio, no
rendered frame. Every check below is a read, a grep or arithmetic done here.

Inputs re-read in full this round: the merged `script-review.md`, this file's round-1 and round-2
sections, `brief.md`, `research.md`, `script.md`, `hook-options.md`, `voice.proposed.json`,
`voice-direction.md`, `voice-performance.proposed.json`, `status.json`; the three repo documents the
packet cites as its rate and voice precedent (`docs/motion-design-lab/script.md:23`,
`docs/xay-doi-minh-hay-chung-minh/voice-report.md:24`, `docs/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/audio-review.md:12`).

**Headline.** Every round-1 and round-2 ticket in my lens is closed except **NEW-07**, which was
re-worded and now contradicts itself inside one sentence. The round-3 Cao raised by the hook lens
(frame-0 polarity) is closed and propagated byte-identically to all three files. All ten owner lines
are verbatim and the split rejoins byte-for-byte. Three **new** stale figures were introduced by the
round-3 anchor change itself (`10.70 + 3.10`, `3.10 s tail`, `exactly 55.00 s`) — all Thấp, none
touching a total, an owner line, a hook or a rendered frame. **9.2 / 10, verdict pass for this
lens**, on 0 Cao / 0 Trung and 3 NEW Thấp.

---

### 0 · Closure table — every round-1 and round-2 ticket in this lens, by its acceptance check

| id | round | sev | acceptance check, as written | result | evidence |
|---|---|---|---|---|---|
| **F-01** | 1 | **Cao** | 13 keys; deletion in the **image** column only; `bấm xoá` never in speech/sidecar/captions | **fixed** | `voice.proposed.json:2–14` = 13 keys, no `a3`. `script.md:143` (`img1`): source cell "image = design (staged), no voice key", spoken cell "the owner's account contains no deletion and this video asserts none", staged inside `s5`'s 1.70 s hold. Grep `xoá` over the folder → hits in `script.md:143` (image/key cells only), `script.alt-1.md:22` (a non-selected variant's own inventory, which F-01's check explicitly tolerated) and the three round-1 reports. Never in `voice.proposed.json`, the sidecar or a caption chunk. **NEW-01 now closed** |
| **F-02** | 1 | Trung | identity reproduces the total ±0.01 s at every rate; printed ceiling margin = recomputed | **fixed** (one residual, `R3-1`) | `script.md:18–21` publishes `Σ(syl/rate) + 2.54 + 10.60 + 3.20 = +16.34`; `:23` gained the pause column; `:52–59` reproduces 46.58 / 47.32 / 48.09 / 48.90 / 49.76 / 50.66 — I recomputed each as `127/r + 16.34` and all six match; `:61` break-even 4.43 / 3.29. The **sidecar's own `identity` string was not updated** with the rest → **R3-1** |
| **F-03** | 1 | Trung | option (a): no `a4`, 127 syl, END hold 2.80 s, all totals in 45–55 | **fixed — with the round-3 amendment** | No `a4`; `script.md:148` = `img2`, staged in `s9`'s hold; CP2 at `:225`; 127 syl ✓. END hold is now **3.20 s** (the spoken lens's NEW-2 fix moved 0.10 s out of `s10`'s hold); totals unchanged at 46.58 / 48.90 / 50.66, verified |
| **F-04** | 1 | Trung | no line claims the owner's wording; `to the room` gone; `a2` attributed | **fixed** | `script.md:140`: "**[ADD]** sensory line, `script-agent`. The rain motif derives from the owner's own umbrella metaphor (line #9); **the window and the rain-as-sound are produced staging**"; repeated `:269`. `voice-direction.md:81` "still to one listener, never stage-voiced". `to the room` → 0 hits |
| **F-05** | 1 | Trung | `" ".join(phrases) == voice.proposed.json[key]` for all keys; field present | **fixed** | `phraseJoin: " "` + `phraseJoinRule` (sidecar `:17–18`), mirrored `voice-direction.md:94` and `script.md:299`. I re-joined all 13 keys by hand — byte-for-byte equal in every case (§1 below) |
| **F-06 / A-C1** | 1 | Trung / **Cao** | no mix of `pending` and `selected` across the packet | **fixed** | `voice-direction.md:11–17`; all 13 `shots.*.reference.source` = the local WAV and all 13 `referenceSelectionStatus: selected`; `benchmark.ownerConfirmed: false` (`:22`); `brief.md:10` "selected by `video-director`, not confirmed by the owner". Grep `pending voice-route benchmark` over the packet → 0 hits |
| **F-07** | 1 | Trung | asset class named; one seeded cross-shot asset for the wet patch; every image cell mappable | **fixed** | `script.md:111` "one consistent stylised figure built as vector/SVG plates and typography — no photograph, no live-action plate, no photoreal face, no stock footage"; the mechanism table is now **9 rows** (`:115–123`), including the wet patch as **one seeded asset continuous across `s9`→`img2`→`s10`, never re-seeded per shot**; `:125` states the determinism rule and how the profile's "expressive close-ups" are delivered. `brief.md:40` is answered by `:125`, not contradicted. **NEW-06 closed** |
| **F-08** | 1 | Thấp | historical numbers name their file, or are gone | **fixed** | `19.25` / `41 %` → 0 hits in `script.md` |
| **F-09** | 1 | Thấp | the contingency and its arithmetic are in `script.md`; both `Bạn`s kept | **record fixed; arithmetic still wrong → NEW-07 open** | `script.md:285` states the contingency and keeps both `Bạn`s; its total is still not derivable (§5) |
| **F-10** | 1 | Thấp | `grep "Và hộ"` → nothing | **not fixed — by the director's instruction** | `script.alt-2.md:55, 152` unchanged; the director owns deletion of the two `script.alt-*` files once A passes. `Và hộ` → 0 hits in every primary packet file (verified this round). Not blocking; A-L15 not re-raised |
| **F-11** | 1 | Thấp | one identical accent list per key across three files; every accent word in some `emphasis` array | **fixed** | All 13 keys compared across `script.md` §3, `voice-direction.md:76–88` and the sidecar: one identical string list each; every accent word is a substring of a phrase of its own key. **NEW-05 closed** |
| **F-12** | 1 | Thấp | every research hook number is a candidate row or explicitly assigned a non-hook role | **fixed** | `hook-options.md:4` names #1, #2, #4, #5 as openers and #3 as the `s9` payoff |
| **F-13** | 1 | Thấp | the END cap exception is declared; owner's wording kept | **fixed** | `script.md:283`: "**7 words, one over this video's ≤ 6-word on-screen cap** … must not drop `Bạn`" |
| **F-14** | 1 | Thấp | the dry/wet contrast is carried by tone/sheen, not a caption | **fixed** | `script.md:101` and `hook-options.md:16`, inside the canonical paragraph reproduced word for word in `brief.md:56` (three identical strings, verified by grep) |
| **NEW-1** | 2 | **Cao** (hook) | frame-0 polarity must not invert its own thesis; propagate verbatim to all three files; `s9` re-checked | **fixed** | The paragraph now reads "**a wet sheen and a darker tone down her right sleeve, matte and dry on the child's coat and on the shoulder under the rim; wet sheen on the pavement below**" — identical in `script.md:101`, `hook-options.md:16`, `brief.md:56`. The polarity invariant is declared in seven places (`script.md:103, 106, 147, 148, 228, 252`; `hook-options.md:20`) and no file anywhere inverts it — I grepped `dry|matte` across the packet and read all 15 hits |
| **NEW-2 / NEW-3** | 2 | Trung (hook) | `s2a`'s on-screen text is its own beat and §3/§4 agree; `s2b`'s cell buildable and in the §6.3 audit | **fixed** | `script.md:136` on-screen text is `Bạn luôn biết phải nói gì.` (6 words, this key's own beat); §4 `s2a` caption chunks are the verbatim words — headline layer and caption layer are declared distinct at `:131`/`:156`, so they no longer disagree. `s2b`'s cell (`:138`) is head geometry + shoulder line + a hand closing on a glass + a half-turn — every element maps to `:117/:118/:119` or to plain plate geometry. §6.3 lists `s2b` and its audit count is **16/16**, which I verified: §3 has 16 beat rows and §6.3 names all 16 |
| **NEW-01** | 2 | Trung | the on-screen-text cells of `img1`/`img2` identical in form; `Xoá` never in a text cell | **fixed** | `script.md:143`: the label lives in the **row key** (`img1 · Xoá từng chữ. · internal row name, not rendered`) and the on-screen-text cell is `—` (no on-screen text; the deletion is in the image), exactly as `img2` `:148`. `Xoá` in the packet appears only at `script.md:143` (image/key cells), plus review files and the alt variant |
| **NEW-02** | 2 | Trung | every printed tail equals the packet's own arithmetic | **fixed — and correctly, not by paper-over** | The model changed: `s10`'s 0.30 s is now declared an **inter-phrase clause gap** (`sidecar:446` sits on phrase 0, `:55` explains it), so the last word lands at the clip end. `script.md:43, 46–48, 71, 208`; `voice-direction.md:70`; sidecar `ending:53–59` (`lastWordEndsAtSeconds` 43.9, `bgmCutsAtSeconds` 43.9, `postClipHoldSeconds` 1.8, `silentCardSeconds` 3.2, `audioTailSeconds` 5.0); `brief.md:60`; `hook-options.md:100`. I re-derived `127/r + 11.34` and got 41.58 / 43.90 / 45.66 — the packet's three numbers — and `43.90 + 1.80 + 3.20 = 48.90` holds exactly. **One stale copy left → R3-2** |
| **NEW-03** | 2 | Trung | no planning rate called "measured"; every measured figure carries a `voice-report.md` citation | **fixed** | `script.md:297`, `voice-direction.md:32`, sidecar `limitations:470`: 4.1 syl/s is the repo's **planning convention**, cited to `docs/motion-design-lab/script.md:23` — which I read and which says verbatim "this is a planning baseline, **not a measured rate**" — and the measured runs are cited to `xay-doi-minh-hay-chung-minh/voice-report.md:24` (which I read: "51.75 s (194 syllables, avg **3.75 syl/s**)") and `lam-lai-…/audio-review.md:12` ("~3.5–3.7"). **All three citations verified by reading the cited lines.** Grep `measured` over the six packet files: every remaining use refers to a rate once a run exists (`script.md:52, 61, 211, 212`), never to a planning figure |
| **NEW-04** | 2 | Trung | no current-state note or log line in `status.json` mentions 14 keys / 142 syl / 46.86–51.43 s | **not fixed — director-owned, not re-raised** | `status.json:33` (current-state note) and `:182` (log line) still read "14 keys, 142 syl, 46.86-51.43 s" against a 13-key / 127-syl / 48.90 s packet. Per the dispatch this is director-owned and I raise no ticket; I record it because `01-status-truth.md` requires the current-state field to be true before the packet is released to phase 3 |
| **NEW-05** | 2 | Thấp | each `emphasis` entry is a substring of its own phrase's text | **fixed** | `s6` phrase 0 "Không phải vì không có ai" carries `emphasis: ["không có ai"]` (sidecar `:329`); phrase 1 "để nhắn." now carries `emphasis: []` (`:338`). I checked all 13 keys: every `emphasis` entry is now a substring of its own phrase |
| **NEW-06** | 2 | Thấp | every eye/mouth-level detail appears in §2.3's table; §2.3 states how close-ups are delivered without a face | **fixed** | New row `:119` "**eyes / a mouth on a stylised figure** | two eye dots and a mouth shape drawn as part of the head plate, driven by the same `wetness` and blink scalars"; `:118` already covers the second person's mouth; `script.md:139` now reads "the black screen reflects **her head as a dark shape**" (was "her eyes"), and `:242` matches. `:125` states how the profile's close-ups are delivered. `her face` → 0 hits |
| **NEW-07** | 2 | Thấp | the contingency's total is derivable from the sentence's own numbers | **NOT fixed — and the fix added a new contradiction** | See §5. `script.md:285` now asserts both "takes 2.82 s … out of the END card's **3.20 s** and leaves a **1.2 s** card" (3.20 − 2.82 = 0.38, not 1.2) and a total of **49.82 s**, which no reading of the sentence produces |
| **NEW-1 (spoken)** | 2 | Trung | the last-word / BGM-cut anchor is 43.90 s everywhere; `voice-direction.md` no longer internally impossible | **fixed** | `script.md:37, 43, 46–48, 71, 150, 208`; `voice-direction.md:57, 70`; sidecar `ending:53–54`; `brief.md:60`; `hook-options.md:34, 100`. No file in the packet contains "43.60" |
| **NEW-2 (spoken)** | 2 | Thấp | no two strings claim the same longest beat | **fixed** | `s10`'s hold is back to 1.80 (sidecar `:438`), which the spoken lens obtained by moving 0.10 s into the END card. `script.md:200` and `voice-direction.md:86` now say "the longest hold between two voiced clips before the resolution — **tied with the closing hold, not uniquely longest**"; sidecar `:386` matches |
| **NEW-3 (spoken)** | 2 | Thấp | the five listed cuts are called five and their sum is right; `elasticRange` names what it bounds | **fixed** | `script.md:212`: "**five** cuts … Those five cuts recover **3.10 s**" (0.60+1.00+0.60+0.50+0.40 = 3.10 ✓). `ending.silentCardElasticRange: [2.2, 5.2]` + `:61` now names what it bounds. **One arithmetic slip in the new sentence → R3-3** |
| **NEW-4 (spoken)** | 2 | Thấp | the reference-handling instruction reaches `voice-agent` | **fixed as a declaration; execution owed by `voice-agent`** | `sidecar:463` and `:295` of `script.md` and `voice-direction.md:17` all say: the pinned `reference.source` is used unmodified (no `startSeconds`/`durationSeconds`, so `gen-voice-clone.py` will not crop it), and any re-cut must **overwrite this exact path**, never a new filename |

**Count: 17 fully closed · 3 fixed with a residual (`R3-1`, `R3-2`, `R3-3`) · 1 not fixed and
director-owned (`NEW-04`, carried, not re-raised) · 1 not fixed by the producer (`NEW-07`, Thấp) ·
1 deliberately not fixed (`F-10`, by the director's instruction). Open Cao in my lens: none.
Open Trung in my lens: none.**

---

### 1 · Mandated-line verification, re-run from scratch

Source of truth `brief.md:16–27` ("Mandatory spoken text (Vietnamese, keep wording verbatim in
`voice.json` and captions)"). Compared against `voice.proposed.json:2–14`, `script.md:135–150`
(spoken column), `script.md:160–172` (caption chunks), `script.md` §1 (syllable column),
`voice-performance.proposed.json` `shots.*.phrases`, `voice-direction.md:76–88`.
Unit = space-separated token; counted here, not read from the file.

| # | owner line (`brief.md`) | key(s) | syl | order | verbatim? | character checks |
|---|---|---|---:|---|---|---|
| 1 | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | `s1` `:2` | 11 | 1st | **yes** | `Mọi người thường tìm đến bạn` + `mỗi khi có chuyện buồn.`; all diacritics; final `.` kept |
| 2 | `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` | `s2a` `:3` + `s2b` `:5` | 9+9 = **18** | 2nd, in two halves | **yes — split at a full sentence boundary, rejoins byte-for-byte** | §1.1 below |
| 3 | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | `s3` `:6` | 15 | 3rd | **yes** | comma after `tối`; `rất lâu`, `màn hình điện thoại` intact; one U+2026-free line |
| 4 | `Bạn muốn nhắn: 'Hôm nay mệt…'` → full: `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | `s4` `:8` | 8 | 4th | **yes** | colon after `nhắn`; **straight** quotes (U+0027), not curly; final `.` **inside** the quotes |
| 5 | `Rồi nghĩ một lúc, bạn lại thôi.` | `s5` `:9` | 7 | 5th | **yes** | comma after `lúc` |
| 6 | `Không phải vì không có ai để nhắn.` | `s6` `:10` | 8 | 6th | **yes** | — |
| 7 | `Mà vì bạn đã quen với việc mình phải là người ổn.` | `s7` `:11` | 12 | 7th | **yes** | `với việc` / `mình phải là người ổn` not reordered |
| 8 | `Bạn biết không…` | `s8` `:12` | 3 | 8th | **yes** | one **U+2026 HORIZONTAL ELLIPSIS**. Grep `\.\.\.` over the six packet files → 2 hits, both non-speech: `brief.md:65` (a JSON-shape note `{"s1": "..."}`) and `sidecar:470` (an elided path `docs/lam-lai-...`). No three-dot substitution anywhere |
| 9 | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | `s9` `:13` | 14 | 9th | **yes** | `bị ướt` intact (accented `ị`) |
| 10 | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | `s10` `:14` | 15 | 10th | **yes** | `họ` — grep `Và hộ` → 0 hits in every primary packet file; colon after `hỏi`; straight quotes; `?` inside the quotes |
| — | `[ADD]` `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` | `a1` `:4` | 10 | between #2's halves | marked `[ADD]`, author `script-agent` (`script.md:137, 268`) | §1.2 |
| — | `[ADD]` `Ngoài cửa sổ, mưa rơi đều.` | `a2` `:7` | 6 | after #3 | marked `[ADD]`, author `script-agent`; rain motif credited to owner line #9, window/rain-as-sound declared producer staging (`script.md:140, 269`) | §1.2 |

**Result: 10/10 verbatim · 10/10 in the owner's original relative order · 0 rewrites · 0 paraphrases ·
0 drops · 0 duplications · 0 duplicated owner line.** Owner syllables **111**, added **16**, total
**127** — recounted token by token from the canonical file, and it reproduces `script.md:41`.

#### 1.1 The split line #2, rejoined exactly as heard and read

`"Bạn biết cách an ủi. Biết phải nói gì." + " " + "Biết làm sao để người khác thấy ổn hơn."` =
`Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` — owner line #2,
byte for byte. No word added, removed, reordered or re-punctuated. The split falls on a full
sentence boundary; each half is a complete utterance. Captions carry both halves verbatim
(`script.md:161` `Bạn biết cách an ủi.` / `Biết phải nói gì.` and `:163` `Biết làm sao để người
khác` / `thấy ổn hơn.`), as `brief.md:16` requires. The interruption is by a declared `[ADD]`
connector, bracketed by real timeline silence (0.25 s after `s2a`, 0.30 s after `a1` —
`script.md:186, 188`) and never by a pause smuggled inside an owner line. Nothing outside line #2 was
reordered. **Fidelity: intact.**

#### 1.2 The two remaining `[ADD]` lines — invented event, or concrete detail?

| key | line | concrete sensory detail? | invents an event the account never contains? | credited to the owner? | verdict |
|---|---|---|---|---|---|
| `a1` | `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` | **yes** — the shoulder drop is staged in `a1`'s own image cell (`script.md:137`), so the ear names what the eye is watching in the same 3.1 s | **no** — it interprets the owner's own premise (line #1: *"Mọi người thường tìm đến bạn"* = people come to you, so you are the one outside) and adds no fact, no act and no event | no — "**[ADD]** sensory line, `script-agent`" (`:137`), §7 justification `:268` | **accept** (unchanged since round 2; register rewrite `A-T2` applied) |
| `a2` | `Ngoài cửa sổ, mưa rơi đều.` | **yes** — the room's sound, the one thing the account has none of | **no** — staged environment, and the rain motif is entailed by the owner's own umbrella metaphor (line #9) | no — "the window and the rain-as-sound are **produced staging, not the owner's wording**" (`:140`), repeated `:269` | **accept** (F-04 closed) |

Neither `[ADD]` line is a summary of an owner line, neither asserts anything the account does not
contain, and both are attributed. The set is closed at two lines (`sidecar keyPlan.addedKeys:
["a1","a2"]`), and no dangling `a3`/`a4` reference survives anywhere in the packet.

#### 1.3 Caption and sidecar re-verification

**Captions, 13/13:** concatenating each key's chunks in `script.md:160–172` reproduces
`voice.proposed.json[key]` word for word, including `'Hôm nay mình mệt quá.'` (`s4`), `Bạn biết
không…` (`s8`, ellipsis intact) and `'Hôm nay có chuyện gì` + `với bạn thế?'` (`s10`). `img1`,
`img2` and `END` carry no caption (`:173`), correct for three silent beats.

**Sidecar, 13/13 byte-exact** under the declared join `" ".join(phrase.text)`, checked by hand:
`s1` `:88`+`:97`→`:2` · `s2a` `:119`+`:128`→`:3` · `a1` `:150`+`:159`→`:4` · `s2b` `:181`→`:5` ·
`s3` `:203`+`:212`→`:6` · `a2` `:234`+`:243`→`:7` · `s4` `:265`+`:274`→`:8` · `s5` `:296`+`:305`→`:9` ·
`s6` `:327`+`:336`→`:10` · `s7` `:358`+`:367`→`:11` · `s8` `:389`→`:12` · `s9` `:411`+`:420`→`:13` ·
`s10` `:442`+`:451`→`:14`. Every boundary falls on a canonical single space; the straight quotes of
`s4` and `s10` survive identically in canonical text and sidecar.

---

### 2 · Regression check on what the round-3 fixes touched

**The identity, recomputed from the canonical file.** `Σsyl = 127`; `ΣpauseAfterSeconds = 2.54`
(the sidecar's eleven non-zero values: 0.22+0.28+0.24+0.26+0.14+0.24+0.18+0.18+0.24+0.26+0.30);
`ΣpostClipHold = 10.60` (thirteen values); END 3.20 → **silence 16.34 s**. `127/3.9 + 16.34 = 48.904`
→ the packet's **48.90** ✓; `127/4.2 + 16.34 = 46.578` → 46.58 ✓; `127/3.7 + 16.34 = 50.664` → 50.66 ✓;
`127/4.1 = 47.32` ✓; `127/4.0 = 48.09` ✓; `127/3.8 = 49.76` ✓. Break-even `127/r = 28.66` → **4.43**;
`127/r = 38.66` → **3.285** → 3.29 ✓. Silence share 16.34/48.90 = **33.4 %** ✓. §5's 23-row silence
table sums to 16.34 line for line, and every row is a named beat (`:183–205`).

**The anchor, re-derived from first principles** (this is what the round-3 fix turned on):
syllables before `s10` = 60+8+7+8+12+3+14 = 112; silence before the last word = 16.34 − (1.80 hold
+ 3.20 card) = **11.34**; `s10` = 15 syl. So the last word = `127/r + 11.34` = **41.58 / 43.90 /
45.66** at 4.2 / 3.9 / 3.7 — the packet's three numbers, from an independent derivation. The 0.30 s
clause gap is correctly counted *inside* that span because `s10` phrase 0 carries
`pauseAfterSeconds: 0.30` (`sidecar:446`) and phrase 1 is the question. `43.90 + 1.80 + 3.20 =
48.90` holds exactly in `script.md:208`, `voice-direction.md:70` and `sidecar:59`. **This is the
right model, not a paper-over**: round 2's version was internally impossible because it treated an
inter-phrase gap as a trailing pad. (The exact value at 3.9 is 43.904, so the published 43.90
truncates by 0.006 s — 0.2 frames — and is therefore self-consistent everywhere. Not a ticket; the
figure is a 2-decimal planning-rate projection like every other second in the packet.)

**Structural marks, recomputed.** Hook complete = `11/r` = 2.62 / 2.82 / 2.97 ✓ (≤ 3 s at every
rate). First payoff = `(20+5)/r + 1.05` = 7.00 / 7.46 / 7.81 ✓ — I re-derived the 1.05 s of prior
silence (0.22+0.30+0.28+0.25) rather than trusting it. Next phrase inside `a1` = +0.24 → 7.24 / 7.70
/ 8.05, and `script.md:75` states the 8.05 overshoot at the slowest modelled rate instead of rounding
it away ✓. Owner line #2 complete = `38/r + 3.64` = 10.88 / 11.59 / 12.13 ✓. Re-hook `s4` =
`60/r + 3.64` = 17.93 / 19.02 / 19.86 ✓ inside 15–20 s at every rate. END card start = 45.70 at the
planning rate ✓. All reproduce.

**Slot chain.** Every start, clip end and hold in `script.md:25–38` re-derives from the canonical
syllables and the sidecar's pauses, with two residual ±0.01 s drift artefacts of the same family
round 1 and round 2 both declined to ticket (`a2` clip end printed 18.77 where the arithmetic gives
18.78; `s4` clip end printed 21.32 where the chain-of-rounded-values gives 21.31). The round-3 change
**removed** one such artefact (s10's clip end now agrees with its own §1.1 figure). No ticket.

**The `[ADD]` set.** Still exactly two keys, 16 syllables, both attributed, neither credited to the
owner (§1.2). No `a3`/`a4` survives.

**The one wet figure.** The polarity invariant — *she is wet from frame 0 and gets wetter; the child
stays dry for the whole runtime* — is stated in seven places and contradicted in none. I grepped
`dry|matte` across `script.md`, `brief.md`, `hook-options.md` and `voice-direction.md` and read all
15 hits: frame 0 (`script.md:101`, `brief.md:56`, `hook-options.md:16`), the declaration
(`:103, 106`, `hook-options.md:20`), `s9` "the same child beside her under the rim (still dry)"
(`:147`), `img2` "the child's shoulder stays dry under the same rim" (`:148`), the CP2 note (`:228`)
and the §6.4 actor table (`:252`). `s10` turns the rim back over *her* shoulder and never shows the
child, so nothing collides.

**Everything the hook lens's Cao touched.** `script.md:101`, `hook-options.md:16` and `brief.md:56`
carry one identical paragraph (grep returned the three paths and nothing else), and each of the three
now also carries a second, consistent test of the polarity (`hook-options.md:20`; `script.md:103,
105, 106`; `brief.md:56` carries it inside the paragraph itself).

**Route truth across the packet, unchanged and still one story.** 13 references → the local WAV;
13 × `selected`; `ownerConfirmed: false`; `brief.md:10` "selected by `video-director`, not confirmed
by the owner"; `owner-notes.md` = two "hi" notes; `voice-direction.md:15` says the same. Nothing in
the packet claims the owner chose a voice, and nothing claims a preview catalogue exists.

**What the round-3 fixes broke.** Three stale figures, all caused by the spoken lens's NEW-2 fix
moving 0.10 s from `s10`'s hold into the END card without updating every copy of the sums
(`R3-1`, `R3-2`), plus one arithmetic slip in the re-worded elasticity sentence (`R3-3`). Nothing
else regressed: no owner line, no syllable count, no total, no hook, no payoff, no light arc and no
shot cell changed.

---

### 3 · Claims table — every assertion a viewer or a downstream agent could read as fact

| # | claim | where | source offered | verdict |
|---|---|---|---|---|
| C1 | The ten spoken lines are the owner's account, verbatim | `voice.proposed.json:2–14` | `brief.md:16–27` | **true**, 10/10, one split rejoining byte-exact (§1) |
| C2 | Cover headline `Ai che ô cho bạn?` | `script.md:107, 135`; `hook-options.md:23` | new text by `script-agent`; not a compression of any owner line | **true** — asks the question `s10` and the END card answer; no claim |
| C3 | `s2a` headline `Bạn luôn biết phải nói gì.` (**new in round 3**) | `script.md:136` | restates the owner's own `Biết phải nói gì.` with the intensifier `luôn` | **acceptable, and it is the one place a headline restates an owner sentence with a stronger quantifier.** It is bounded by owner line #1 (*`Mọi người thường tìm đến bạn`*) and by the brief's viewer need (`:30`); it asserts nothing about the world, and it sits in the headline layer, which §3's preamble (`:131`) and §4 (`:156`) keep separate from the captions. **No ticket; recorded so the content branch sees it** |
| C4 | Recreated chat bubble + incoming call marked `minh hoạ` | `script.md:141, 144` | label in the on-screen-text column | **compliant** with `brief.md:51` and SKILL:365 Labels |
| C5 | A deletion happened | `script.md:143`, **image column only** | source cell "image = design (staged), no voice key"; the row's own spoken cell says the video asserts none | **authorised image staging** — F-01's own prescribed fix, `script.alt-1.md:73` is its precedent, and the label no longer leaks into the rendered-text channel. Round 1's open question (does the account contain a deletion?) is still only the owner can answer; **not re-opened** |
| C6 | Rain audible outside a window | `voice.proposed.json:7`; `script.md:140` | "the rain motif derives from the owner's own umbrella metaphor (line #9); the window and the rain-as-sound are produced staging" | **correctly attributed** |
| C7 | The saved name is someone already in the video | `script.md:149, 253` | §6.4's introduction table: introduced at `s6`, acts at `s10` | **true as staged**, and it resolves the picture rather than promising that anyone will come |
| C8 | Health / diagnosis / advice / promise / CTA | — | — | **none.** No statistic, no percentage, no study, no "this will fix you", no advice, no CTA (`script.md:244, 260`; `voice-direction.md:64–65`). The END card carries the owner's title and no sign-off |
| C9 | Runtime 48.90 s (46.58 / 50.66), inside 45–55 s for 3.29–4.43 syl/s | `script.md:52–61`; `brief.md:60`; `hook-options.md:5, 100`; sidecar `:29–41` | the published identity, recomputed by me from `voice.proposed.json` | **true** — all six rates reproduce; the round-1 incomplete budget is closed everywhere in producer-owned files |
| C10 | Post-word audio tail = **5.00 s** from the last word at 43.90 s | `script.md:208`; `voice-direction.md:70`; sidecar `:53–59`; `brief.md:60`; `hook-options.md:100` | `lastWord + hold + card` | **true and self-consistent** — round 2's NEW-02 is genuinely closed. **One stale copy survives → R3-2** |
| C11 | ≈4.1 syl/s is a *planning convention*; measured Thanh-Long runs are 3.5–3.75 | `script.md:297`; `voice-direction.md:32`; sidecar `:470` | three cited repo documents, **all three read by me and all three say what is claimed** | **true** — round 2's NEW-03 is closed by correcting the label and attaching the evidence |
| C12 | The route is justified by videos already delivered in this repo using the identical reference | `script.md:293`; `voice-direction.md:14`; sidecar `:21` | folder listings; both cited `status.json`s | **true as stated**; "two" undercounts (a third video carries the same file) but does not misstate — carried observation, no ticket |
| C13 | The voice was confirmed by the owner | — | — | **no such claim survives anywhere** |
| C14 | The sidecar's timing identity is `Σ(syl/rate) + 2.54 + 10.70 + 3.10` | `sidecar:29` | the same file's `sumPostClipHoldSeconds: 10.6` (`:35`) and `silentCardSeconds: 3.2` (`:57`) | **stale by 0.10 s in each of two terms**; the sum 16.34 is right, so no total moves → **R3-1** |
| C15 | The title-spoken contingency takes the total to 49.82 s | `script.md:285` | the sentence's own numbers | **does not reconcile, and the sentence now contradicts itself** → **NEW-07, still open** |
| C16 | Five elasticity cuts recover 3.10 s and hold the ceiling at "exactly 55.00 s" at 3.04 syl/s | `script.md:212` | `127/3.04 + 16.34 − 3.10 = 55.016` | **the cut list and its sum are correct**; the word "exactly" is false by 0.016 s at the rounded rate → **R3-3** |
| C17 | ALT-2 owner line #10 | `script.alt-2.md:55, 152` | cites `brief.md L27`, marks "✔" | still `Và hộ` — **by the director's instruction (F-10 / A-L15); not re-raised** |
| C18 | One asset class, no photograph / actor / stock footage | `script.md:111–125` | the declaration itself | **true and buildable**; every §3 cell now maps to a declared mechanism or to plain plate geometry |

---

### 4 · Scores for this lens

| rubric item | score | evidence |
|---|---:|---|
| **1 · Fidelity (mandated wording + user intent kept)** | **9.5** | 10/10 owner lines verbatim, in the owner's order, with line #2 split at a sentence boundary and rejoining byte-for-byte (§1, §1.1); captions 13/13 word-for-word; sidecar 13/13 byte-exact under the declared join; the two `[ADD]` lines are declared, attributed, and neither invents an event nor claims the owner's wording (§1.2). Every round-1 and round-2 fidelity ticket in this lens is closed, including **NEW-01**. Intent kept: kiệt lực cảm xúc → `s3`/`s7`; khao khát được dựa vào ai đó → `s6`/`s7`/`s10`; no advice, no self-help, no CTA (`brief.md:30–31, 47`; `script.md:244, 260`). Held from 10 by two accepted costs, neither a defect: the packet puts one `[ADD]` connector **inside** a single owner sentence (the price `H-01` bought, and the cheapest one available), and the one owner-only question of this whole review — whether the account contains a deletion — remains unanswerable from inside `docs/`, while the video now depicts one |
| **6 · Source accuracy (no unsourced claim; inference not stated as fact)** | **9** | The layer a viewer can read is clean: no statistic, no health or diagnosis claim, no promise, no advice, no CTA, and nothing on screen or in speech outruns `research.md`'s only source, the owner's account (`research.md:4`). Round 2's two load-bearing errors are now genuinely fixed: the rate label is corrected *and* cited to three documents I read and verified (`script.md:297`), and the audio tail is corrected by fixing the model rather than the sentence (`script.md:43, 46–48`). Held from 10 by four numeric slips in the documentation layer, none of which changes a total, an owner line, a hook or a rendered frame: **NEW-07** (not fixed; now self-contradicting), **R3-1** (stale `10.70 + 3.10` in the sidecar's own identity string), **R3-2** (stale `3.10 s tail` in the hook doc's decision table), **R3-3** (`exactly 55.00 s` at 3.04 is 55.02). Plus the director-owned stale `status.json` field, which I record and do not ticket |
| **7 · Visual feasibility in Remotion** | **9** | §2.3 names the asset class (one stylised vector/SVG figure + typography; no photo, no actor, no stock), gives a frame-driven mechanism for **nine** distinct micro-actions, pins the wet patch as **one seeded asset continuous across `s9`→`img2`→`s10`**, states the determinism rule, and now answers the profile rubric's "expressive close-ups" without a face (`:125`) — **NEW-06 closed**. `s2b`'s cell was rewritten into buildable elements and entered the §6.3 audit, which is honestly 16/16 — **NEW-3 closed**. Frame-driven motion, the umbrella through-line, the cover, the light arc and every hold are renderable. Held from 10 by one prop whose continuity is named but not pinned the way the wet patch is — the untouched glass appears in four shots (`s2a`, `a1`, `s2b`, `s7`), and §6.3's `S-01` note (`:244`) still says it is "re-shown at `s7`" only, which undercounts the three shots `a1`/`s2b` now show — and by the fact that achievability can only be confirmed at D, E and C |

**Lens mean: (9.5 + 9 + 9) / 3 = 9.17 → 9.2.** Open tickets in this lens: **0 Cao · 0 Trung · 3 NEW Thấp**
(+ `NEW-07` Thấp carried open from round 2, + `NEW-04` Trung director-owned and not re-raised).
**Verdict for this lens: pass.**

---

### 5 · Tickets

Closed this round: `F-01`–`F-14` (all, with `F-10` carried by instruction) · `NEW-1` (Cao, hook) ·
`NEW-2`/`NEW-3` (hook) · `NEW-01`–`NEW-07` (fidelity, except NEW-07) · `NEW-1`–`NEW-4` (spoken).
**`NEW-07` remains open.** The three NEW tickets below are the only open items I am raising.

---

**R3-1 · NEW · Thấp · the sidecar's timing identity string still carries the pre-round-3 hold split**
- **Where.** `voice-performance.proposed.json:29` (`benchmark.identity`).
- **Evidence.** The string reads `"... = SUM(syl/rate) + 2.54 + 10.70 + 3.10 = SUM(syl/rate) + 16.34 s"`, while the fields three and twenty-eight lines below it in the same file say `sumPostClipHoldSeconds: 10.6` (`:35`) and `ending.silentCardSeconds: 3.2` (`:57`). `script.md:19` was updated to `2.54 + 10.60 + 3.20`; this string was not. The sum is right (16.34 either way), so no total, hook, payoff or owner line moves — but a machine or a reader reconciling the file against itself gets two different splits of the same silence.
- **Concrete change.** One string edit, no recount: `2.54 + 10.70 + 3.10` → `2.54 + 10.60 + 3.20`.
- **Owner.** script-agent (sidecar).
- **Acceptance check.** `benchmark.identity` contains the same three constants as `sumPauseAfterSeconds`, `sumPostClipHoldSeconds` and `ending.silentCardSeconds`.

**R3-2 · NEW · Thấp · the hook doc's decision table still prints the superseded tail figure**
- **Where.** `hook-options.md:91` (the `H1` row, "Payoff resolved" column).
- **Evidence.** The cell reads "`s10` + END card + **3.10 s tail**". Since the round-3 anchor change the END card is 3.20 s and the post-word tail is **5.00 s**, and the same file says so twice — `:34` ("last word at **43.90 s** … END card … **45.70–48.90 s**") and `:100` ("post-word tail **5.00 s** from the last word at 43.90 s"). `3.10` is the END hold as it stood in round 2. Under either reading the cell is wrong: the card is not 3.10 s, and the tail is not 3.10 s.
- **Concrete change.** `3.10 s tail` → `5.00 s tail` (or, if the cell is meant to name the card rather than the tail, `END card 3.20 s`). One cell, no recount.
- **Owner.** script-agent (`hook-options.md`).
- **Acceptance check.** No string in `hook-options.md` contains `3.10`; the file's tail and card figures equal `script.md:208` and `sidecar:56–58`.

**R3-3 · NEW · Thấp · "exactly 55.00 s" is off by 0.016 s, in the unsafe direction**
- **Where.** `script.md:212` (the "too long" elasticity bullet, re-worded in round 3).
- **Evidence.** "Those five cuts recover 3.10 s, which holds the ceiling down to a measured **3.04 syl/s**: at 3.04 syl/s with all five applied the total is **exactly 55.00 s**." The cut list and its sum are now correct (0.60+1.00+0.60+0.50+0.40 = 3.10). But `127/3.04 + 16.34 − 3.10 = 55.016 s`, so at the printed rate the run is 0.016 s **over** the owner's 55 s ceiling, and "exactly" is false. The exact break-even with all five cuts is `127/r = 41.76` → **r = 3.0410**. The round-3 rewrite rounded the rate **down** (3.041 → 3.04), which is the side that overshoots the ceiling.
- **Concrete change.** "…holds the ceiling down to a measured **3.04 syl/s**: at 3.04 syl/s with all five applied the total is **55.02 s** (the exact break-even is 3.041 syl/s = 55.00 s)." Two numbers, no recount, no change to any total at 3.7–4.2.
- **Owner.** script-agent (`script.md` §5).
- **Acceptance check.** the break-even sentence re-derives from `127/r + 16.34 − 3.10`, and no elasticity sentence uses "exactly" for a value it does not hit.

**NEW-07 · Thấp · NOT FIXED · the title-spoken contingency still does not reconcile, and now contradicts itself**
- **Where.** `script.md:285`.
- **Evidence.** "If the owner asks for the title spoken: it becomes a 14th key of 11 syl, which **takes 2.82 s at the 3.9 planning rate out of the END card's 3.20 s and leaves a 1.2 s card** — so the total goes **48.90 → 49.82 s** at 3.9." Three numbers, three problems: (a) 3.20 − 2.82 = **0.38 s**, so the card cannot be both "reduced by 2.82 s" and "1.2 s"; (b) the printed total is not derivable — speech taken out of the card and the card left at 1.2 s gives 48.90 − 3.20 + 2.82 + 1.20 = **49.72 s**, speech added on top of a 1.2 s card gives **51.72 s**, and speech inside a 3.20 s card gives **48.90 s**; 49.82 s is reachable only by also cutting 1.90 s of hold the sentence does not authorise; (c) round 2's vague "near 47.9 s" has been replaced by a precise-looking wrong number, so the edit improved the form and worsened the kind of defect. The root cause is that the sentence never says whether the spoken title **replaces** part of the card or **precedes** it. Acceptance check ("the contingency's total is derivable from the sentence's own numbers") **fails**.
- **Concrete change.** One sentence, no recount: "If the owner asks for the title spoken, it becomes a 14th key of 11 syl = 2.82 s at the 3.9 planning rate, **inserted before** the card; the card keeps 1.20 s, so the total goes **48.90 → 51.72 s** at 3.9 (inside the owner's 45–55 s; if the director prefers the card to absorb it, the total stays 48.90 s and the card shortens to 0.38 s — state which, once). §1 must be recomputed at the measured rate. The owner's wording is never dropped to make room and the silent tail is never cut to zero."
- **Owner.** script-agent (`script.md` §8).
- **Acceptance check.** the contingency's total re-derives from the sentence's own numbers under the reading the sentence states.

---

### 6 · Checked and deliberately **not** ticketed

- **The deletion depicted in `img1`.** F-01's own prescribed fix was to move it from speech into the
  image; round 1 and round 2 both accepted that and I re-litigate nothing. The label now sits in the
  row key, not in the rendered-text channel, which was the actual leak.
- **`a1` inside owner line #2.** Accepted in rounds 1 and 2 as the cheapest available payoff
  placement; recorded here as the one fidelity cost that remains, not as a ticket.
- **`s2a`'s headline intensifier `luôn`.** Bounded by owner line #1 and by `brief.md:30`; no ticket,
  recorded so `content-agent` sees it in the layer it will lock (C3).
- **The child in frame 0 and the saved-name call at `s6`.** Producer staging in both cases, declared
  as `image = design` / `minh hoạ` per the packet's own convention; nothing on screen or in speech
  asserts them as the owner's account. Accepted since round 1.
- **"no dramatic pause longer than 1.80 s"** (`voice-direction.md:62`) while the END card is 3.20 s.
  A defensible reading — §5 lists the card separately as "the required silent hold", not as a beat
  between two voiced clips — and unchanged in kind since round 2. Not a ticket; noted so the
  director knows I read it and did not object.
- **±0.01 s rounding artefacts** in two printed cells of `script.md` §1 (`a2` clip end, `s4` clip
  end), inside the tolerance F-02's own acceptance check allows and unchanged from rounds 1–2.
- **A-L15 and NEW-04.** Not re-raised, by instruction. A-L15's two `script.alt-*` files are
  director-owned and will be deleted once A passes; NEW-04 is a director-owned `status.json` field.
- **Voice authorization / licence basis.** Still nothing: `SKILL.md` (rule set 2026-10-17) states
  voice authorization is not required and must not be asked about, and the packet's statement is
  scoped to *selection*.

---

### 7 · What I could not verify

1. **No shell in this runtime**, so `python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau` was **not run** and this report carries **no audit statement**. Per `.agents/rules/01-status-truth.md` the director must run it and treat my audit statement as absent. I read `status.json` instead (`script: in_progress`, gate A rounds 1 and 2 recorded, `next` set) — a read, not an audit. **NEW-04 and the `status.json` rows in §0 are read findings.**
2. **No audio, no listening.** Every second in the packet is a 3.9 syl/s planning projection. I verified
   the arithmetic (127 syl, 111 owner + 16 added, 16.34 s of silence, the slot chain, all six rates,
   all six structural marks, the tail identity) and I verified **no** measured rate, pause, emphasis,
   contour or naturalness. I make no claim about how the voice will sound.
3. **The reference WAV.** `docs/…/voice-ref/refThanhLong.wav` exists (folder listing); its 8.20 s /
   24 kHz / mono / pcm_s16le properties and byte-identity to the two precedent files are
   **director-verified facts**, attributed as such at `voice-direction.md:16` and `sidecar:26` — the
   correct handling, but second-hand. No `ffprobe`.
4. **Whether the two tools that consume this sidecar would run it.** No `validate_voice_performance.py`,
   no `gen-voice-clone.py`. I verified the join rule, the declared controls and the absence of acting
   cues by reading; I did not execute either script. `NEW-4` (the reference-crop instruction) is
   therefore verified as a *declaration only* — the 6–8 s cropped reference is still owed by
   `voice-agent` at the same path.
5. **Rendering.** No frame was rendered. §2.3's nine mechanisms, the wet-patch continuity across
   `s9`→`img2`→`s10`, the thumbnail legibility of the wet/dry contrast and the cover's readability
   with the sound off are judged as *specified*. Achievability is confirmable only at D, E and C.
6. **`content-pack.md` behaviour.** I cannot see how `content-agent` will consume §3's on-screen-text
   column; that is why NEW-01 was filed as Trung in round 2 and why I verified the `img1` cell by
   reading rather than by inspecting the next phase.
7. **The measured rate of *this* voice.** NEW-03's fix rests on three other videos' own reports about
   their own clips; I read the three cited lines and confirmed they say what is claimed, and I
   re-measured nothing.
8. **Hook, specificity, naturalness, timing feasibility and the voice-performance contract.** Not my
   lens; I verified only the fidelity and arithmetic facts those lenses depend on, and I did not score
   them.
9. **Whether the owner's account contains a deletion.** Unchanged from round 1 and still the one
   question only the owner can answer. The packet now depicts it as authorised image staging, so this
   no longer blocks the gate — but if the owner later says there was no deletion, `img1`'s image cell
   is the thing to change, and `script.md` §7 already records that the deletion is staged, not
   narrated.
