# Content Pack — ban-khong-yeu-duoi-chi-da-manh-qua-lau

**Video ID:** `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · **Profile:** `story` · **Comp:** `BanKhongYeuDuoiReel` · 9:16 1080×1920 @ 30 fps
**Locked from:** `voice.json` (gate A, accepted at the 3-round cap) · **Script:** `script.md` · **Performance sidecar:** `voice-performance.json`
**Owner of this file:** `content-agent` (Phase 3a). This pack is the **final** text layer. `design-agent`, `scene-agent` and the join must take the strings from here, not from the draft on-screen column of `script.md` §3 — see §7 Divergence.

---

## 1 · Definitions used throughout (closes carried ticket `T-A2`)

`script.md` §4 left "chunk" ambiguous. The final semantics:

- A **caption chunk** = one caption card shown at one time. A card holds **1 or 2 lines**.
- Chunks and lines are joined with **exactly one space** (`" ".join(...)` — the same join rule as `voice-performance.json` `phraseJoin`). Joining every line of a key with one space reproduces `voice.json[key]` byte for byte.
- A **chunk boundary** is placed only where the line cannot fit in 2 lines, and then only at a **clause gap** (`pauseAfterSeconds` inside the clip). A compound word is never split.
- **Accent words** are typographic emphasis inside the caption line they sit in (colour/weight), never a separate text block, so they add no y-range of their own.
- **On-screen text** is a separate headline layer. It must **add** something the spoken line does not say. Where it would only compress or repeat the line, the row is declared **caption-layer-only**.
- **Timings in this pack are 3.9 syl/s planning projections**, not measurements. Every frame number is a planning estimate to be replaced by measured frames at the join (voice clips do not exist yet).

## 2 · Safe zone — no text in the bottom 210 px

Frame is 1920 px tall, so the forbidden band is `y ∈ [1710, 1920]`. **No element in this pack is assigned any pixel at `y > 1710`.**

| element | y-range assigned (px) | note |
|---|---|---|
| Cover headline (`Ai che ô cho bạn?`) | 360 – 540 | upper third, 1 line |
| Headline layer, general | 300 – 620 | all additive headlines live here |
| Accent words | inside their caption line | no separate band |
| Caption layer, 2-line card | 1560 – 1710 | bottom edge exactly 1710 |
| Caption layer, 1-line card | 1630 – 1710 | bottom edge exactly 1710 |
| `s4` chat bubble (recreated UI) | 640 – 1060 | mid-frame |
| `s4` state tag `Chưa gửi` | 1070 – 1130 | mid-frame |
| `s6` incoming-call UI (avatar + name) | 620 – 980 | mid-frame |
| `s10` missed-call screen (same element) | 620 – 980 | mid-frame |
| END title, two stacked lines | 760 – 1120 | centred block |

Highest assigned y anywhere in the pack: **1710** (caption bottom edge). Design may raise the floor further for platform UI overlays; 1710 is the contract and what is asserted here.

## 3 · Per-key text layer (13 keys, `voice.json` order)

| key | on-screen text (final) | words / chars | clear event | caption chunks (lines, chars) | accent words | label | claim ids |
|---|---|---|---|---|---|---|---|
| `s1` | `Ai che ô cho bạn?` | 5 w · 17 ch | holds from frame 0; **clears on the `s1`→`s2a` clip boundary** (3.34 s → planning frame 100) | **C1** L1 `Mọi người thường tìm đến bạn` (28) · L2 `mỗi khi có chuyện buồn.` (23) | `tìm đến bạn` · `chuyện buồn` | — | — |
| `s2a` | `Ly của bạn vẫn còn nguyên` | 6 w · 25 ch | **clears on the `s2a`→`a1` clip boundary** (6.18 s → planning frame 185) | **C1** L1 `Bạn biết cách an ủi.` (20) · L2 `Biết phải nói gì.` (17) | `an ủi` · `nói gì` | — | — |
| `a1` | **— caption-layer-only** | — | — | **C1** L1 `Vai người khác chùng xuống.` (27) · L2 `Còn bạn thì đứng ngoài.` (23) | `chùng xuống` · `đứng ngoài` | — | — |
| `s2b` | **— caption-layer-only** | — | — | **C1** L1 `Biết làm sao để người khác` (26) · L2 `thấy ổn hơn.` (12) | `thấy ổn hơn` | — | — |
| `s3` | `Cái ô gập bên cửa` | 5 w · 17 ch | **clears at the `s3` clip end** (16.05 s → planning frame 482), before the 1.05 s withheld-message hold | **C1** L1 `Nhưng có một tối,` (17) · **C2** L1 `chính bạn lại ngồi rất lâu` (26) · L2 `trước màn hình điện thoại.` (26) | `một tối` · `rất lâu` · `trước màn hình điện thoại` | — | — |
| `a2` | **— caption-layer-only** | — | — | **C1** L1 `Ngoài cửa sổ, mưa rơi đều.` (26) | `mưa rơi đều` | — | — |
| `s4` | bubble `Hôm nay mình mệt quá.` + state tag `Chưa gửi` | 5 w · 21 ch + 2 w · 8 ch | bubble types on with the line; **send key is never pressed** — the tag `Chưa gửi` is the declared terminal state and holds until the clip end (21.72 s → planning frame 652) | **C1** L1 `Bạn muốn nhắn:` (14) · **C2** L1 `'Hôm nay mình mệt quá.'` (23) | `mệt quá` · `nhắn` | **minh hoạ** (recreated phone chat UI) | — |
| `s5` | `Tay chưa buông điện thoại` | 5 w · 25 ch | **clears at the `s5` clip end** (23.69 s → planning frame 711), leaving `img1`'s 1.70 s deletion hold with no text at all | **C1** L1 `Rồi nghĩ một lúc,` (17) · L2 `bạn lại thôi.` (13) | `nghĩ một lúc` · `lại thôi` | — | — |
| `s6` | `Cuộc gọi chưa ai trả lời` | 6 w · 24 ch | appears on the incoming-call frame; **clears at the `s6` clip end** (27.62 s → planning frame 829), before the 0.50 s unanswered-call hold | **C1** L1 `Không phải vì không có ai` (25) · L2 `để nhắn.` (8) | `không có ai` | **minh hoạ** (recreated phone call UI) | — |
| `s7` | `Mưa tắt mà bạn không biết` | 6 w · 25 ch | **clears at the `s7` clip end** (31.44 s → planning frame 943), before the 0.60 s recognition hold | **C1** L1 `Mà vì bạn đã quen` (17) · **C2** L1 `với việc mình phải là` (21) · L2 `người ổn.` (9) | `đã quen` · `phải là người ổn` | — | — |
| `s8` | **— caption-layer-only** | — | — | **C1** L1 `Bạn biết không…` (15) | `không…` | — | — |
| `s9` | `Ô nghiêng khỏi vai bạn` | 5 w · 22 ch | **clears at the `s9` clip end** (38.46 s → planning frame 1154), leaving `img2`'s 1.30 s tilt hold with no text | **C1** L1 `Người thường xuyên` (18) · L2 `che ô cho người khác` (20) · **C2** L1 `cũng có những ngày bị ướt.` (26) | `che ô` · `cũng` · `bị ướt` | — | — |
| `s10` | **— caption-layer-only** | — | — | **C1** L1 `Và họ cũng cần một` (18) · L2 `người hỏi:` (10) · **C2** L1 `'Hôm nay có chuyện gì` (21) · L2 `với bạn thế?'` (13) | `một người hỏi` · `với bạn thế?` | **minh hoạ** (missed-call screen re-shown, same element as `s6`) | — |

**Chunk totals:** 17 cards · 29 lines · 0 chunks over 2 lines · max line 28 chars (`Mọi người thường tìm đến bạn`), min line 8 chars.

### Rows with no voice key (`script.md` §3)

| row | on-screen text | caption | accent | label | note |
|---|---|---|---|---|---|
| `img1` (staged inside `s5`'s 1.70 s hold) | **— no text** | none (silent by design) | — | — | The row label `Xoá từng chữ.` in `script.md` is an **internal row name, explicitly not rendered** (`NEW-01`). The deletion is seen in the image only. `s5`'s headline clears before this hold, so the hold carries no text whatsoever. |
| `img2` (staged inside `s9`'s 1.30 s hold) | **— no text** | none | — | — | The tilt completes in the image; `s9` already said it in the owner's own words. |
| `END` (silent title card, 45.70–48.90 s planning) | **L1** `Bạn không yếu đuối,` (4 w · 19 ch) · **L2** `bạn chỉ đã mạnh mẽ quá lâu.` (7 w · 27 ch) | none — **silent card, no voice** | `mạnh mẽ quá lâu` (**on-screen emphasis only**, not a voice accent) | — | Owner's title line verbatim, stacked. **Declared cap exception (`F-13`): L2 is 7 words, one over the ≤6-word rule.** The owner's wording outranks the style rule; `Bạn` is not dropped and the line is not reworded. |

### Join-back check (key → caption chunks)

| key | caption lines joined with one space | equals `voice.json[key]` |
|---|---|---|
| `s1` | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | ✅ |
| `s2a` | `Bạn biết cách an ủi. Biết phải nói gì.` | ✅ |
| `a1` | `Vai người khác chùng xuống. Còn bạn thì đứng ngoài.` | ✅ |
| `s2b` | `Biết làm sao để người khác thấy ổn hơn.` | ✅ |
| `s3` | `Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại.` | ✅ |
| `a2` | `Ngoài cửa sổ, mưa rơi đều.` | ✅ |
| `s4` | `Bạn muốn nhắn: 'Hôm nay mình mệt quá.'` | ✅ |
| `s5` | `Rồi nghĩ một lúc, bạn lại thôi.` | ✅ |
| `s6` | `Không phải vì không có ai để nhắn.` | ✅ |
| `s7` | `Mà vì bạn đã quen với việc mình phải là người ổn.` | ✅ |
| `s8` | `Bạn biết không…` | ✅ |
| `s9` | `Người thường xuyên che ô cho người khác cũng có những ngày bị ướt.` | ✅ |
| `s10` | `Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?'` | ✅ |

**Owner's ten mandatory lines in the caption layer.** `s1`–`s10` are the ten owner lines verbatim, in the owner's order. Owner line #2 is split across `s2a` and `s2b` and rejoins character for character: `Bạn biết cách an ủi. Biết phải nói gì.` + one space + `Biết làm sao để người khác thấy ổn hơn.` = `Bạn biết cách an ủi. Biết phải nói gì. Biết làm sao để người khác thấy ổn hơn.` — identical to `brief.md` line 19. The `…` in `s8`, the straight inner quotes in `s4`/`s10` and all diacritics are preserved exactly.

---

## 4 · Cover (frame 0)

- **Frame 0 text (final):** `Ai che ô cho bạn?` — **5 words**, upper third, safe zone, nothing below y = 1710.
- **Subject:** the canonical frame-0 paragraph in `script.md` §2.2, reproduced word for word in `brief.md` §Hook and `hook-options.md` §H1 §1 — the umbrella tilted toward the child, her right sleeve already wet, the child's shoulder dry, one lit window across the street. **This pack does not restate or alter it**; gate D proves it on `out/qa/<vid>-cover.png`.
- **Sound-off test:** the frame shows a figure sheltering a child while her own sleeve is soaked; the headline asks who shelters her. With the audio muted, the cover states the whole thesis and opens one answerable question. The question is paid at `s10` and again on the END card — no clickbait.
- **Clear event:** the headline holds from frame 0 and **clears on the `s1`→`s2a` clip boundary**, leaving the caption layer alone for the rest of the runtime (`S-05`). Frame-accurate event; `design-spec.md` and the join must honour it.
- This string is **locked by gate A** and is carried unchanged.

## 5 · Re-hook (~15–20 s) — the withheld message

- **Key:** `s4`. Clip starts **19.02 s** at the 3.9 planning rate (**17.93 s** at 4.2, **19.86 s** at 3.7) — inside 15–20 s at every rate in the band.
- **On-screen text:** recreated chat input bubble carrying `Hôm nay mình mệt quá.`, with the state tag `Chưa gửi` next to the send key. Both marked `minh hoạ`.
- **Caption chunks:** `Bạn muốn nhắn:` (14) then `'Hôm nay mình mệt quá.'` (23).
- **Declared double-layer:** the bubble and the caption carry the same words **on purpose** — the bubble is the recreated phone UI (characters appearing one by one in an input box), the caption is the narration track in which she says the message aloud. They are different layers in different rects and must never overlap or be scaled to look like one another. This is stated openly so gate E can check it rather than discover it.
- **Sound-off:** the viewer reads `Chưa gửi` and an unsent draft in an input box — the withheld message is legible without sound.

## 6 · CTA — none, by design (recorded, not omitted)

**This video has no CTA. None is to be added.** Recorded explicitly rather than left blank:

- `voice-direction.md` §Restraint states it in the locked packet: *"No CTA, no follow/comment, no handle, no end-card sign-off."* `script.md` §6.5 states: *"the END card is a separate silent shot carrying the owner's title line, and it contains no call to action, no handle, no follow/comment, no advice."*
- The climax shot `s10` carries **no CTA** and is **caption-layer-only** for exactly this reason. Nothing is bolted onto the climax.
- The END card is a **silent title hold**, not a CTA slot: the owner's title line, no voice, no sign-off, no handle.
- The nearest thing to an ask is the **question** `Hôm nay có chuyện gì với bạn thế?` — it is spoken, and it is a question put to the viewer, **not an instruction**. It is **not** recorded here as a CTA and must not be read as one.
- If the owner later asks for a save/follow/share prompt, it is a **new shot after END**, it lengthens the runtime and eats into the required 5.00 s post-word tail — that reopens gate A (`script-agent`), not this file.

## 7 · Divergence from the draft on-screen text in `script.md` §3

`script.md` §4 states "caption chunks: proposal — `content-agent` locks the final set". Applying the rule *"on-screen text adds to the line instead of repeating it"* to the §3 draft column shows **9 of 13 rows duplicated or compressed their own caption**. `NEW-4` flagged only `s2a`; the same defect was found in `a1`, `s2b`, `s3`, `s5`, `s6`, `s7`, `s9` and `s10`. This pack fixes all of them. **`script.md` was not edited** — every change is declared here.

| key | `script.md` §3 draft | final in this pack | words shared with the row's own caption |
|---|---|---|---|
| `s1` | `Ai che ô cho bạn?` | **unchanged** (gate-A locked) | 1 (`bạn`) |
| `s2a` | `Bạn luôn biết phải nói gì.` | `Ly của bạn vẫn còn nguyên` | **4 → 1** |
| `a1` | `Còn bạn thì đứng ngoài.` | **— caption-layer-only** | **5 → 0** (draft was verbatim-identical to caption line 2) |
| `s2b` | `Người khác thấy ổn hơn.` | **— caption-layer-only** | **4 → 0** (draft was a truncation of the caption) |
| `s3` | `Chính bạn ngồi trước màn hình.` | `Cái ô gập bên cửa` | **6 → 0** |
| `a2` | `—` | **unchanged** | 0 |
| `s4` | bubble `Hôm nay mình mệt quá.` | bubble + tag `Chưa gửi` | intentional, declared (§5) |
| `s5` | `Sao lại thôi?` | `Tay chưa buông điện thoại` | **2 → 0** |
| `img1` | `—` | **unchanged** | 0 |
| `s6` | `Không phải vì không có ai.` | `Cuộc gọi chưa ai trả lời` | **5 → 0** (draft was caption line 1 verbatim) |
| `s7` | `Bạn đã quen làm người ổn.` | `Mưa tắt mà bạn không biết` | **5 → 1** |
| `s8` | `—` | **unchanged** | 0 |
| `s9` | `Người che ô cũng bị ướt.` | `Ô nghiêng khỏi vai bạn` | **4 → 1** |
| `img2` | `—` | **unchanged** | 0 |
| `s10` | `Có chuyện gì với bạn thế?` | **— caption-layer-only** | **6 → 0** (draft was caption card 2 verbatim) |
| `END` | 2 stacked lines | **unchanged** (owner's verbatim title, `F-13` exception) | n/a |

**Handoff:** design is building in parallel and `design-spec.md` is being written from `script.md`'s draft column. **The final strings are the ones in §3 of this file.** The join reconciles; nothing in `script.md` was edited.

### NEW-4 closure (the one `script-review.md` ticket routed here)

> *"`s2a`'s headline shares four words with the caption it sits on and has no declared clear event."*

**Closed by option (a): the headline string now differs from its caption chunk**, and it shares **one** word (`bạn`) with the caption instead of four. `s2a` reads `Ly của bạn vẫn còn nguyên` (6 words, 25 chars) — a fact the spoken line never states, drawn from the shot's own staging in `script.md` §3 (`S-01`: her own glass untouched and empty, later re-shown at `s7`). **A clear event is declared: it appears with the doorway shot and clears on the `s2a`→`a1` clip boundary (planning frame 185).** The `a1` headline, not this one, carries the shot's turn; the caption and the accent word `đứng ngoài` do that work.

**Option (b) — caption-layer-only — was used instead for `a1`, `a2`, `s8`, `s10`**, where the draft headline could only restate the line. Those four rows carry **no** headline, which trivially satisfies "the headline string differs from its caption chunk" while protecting the payoff, the rain beat, the breath-word and the climax question from a competing text block.

## 8 · Claims

| id | claim as shown | source URL | fact / inference |
|---|---|---|---|
| — | **No claim is made anywhere on screen.** | — | — |

The table is **empty by evidence, not by omission**:

- `research.md` §Primary source: *"This is a personal/emotional story, not a factual or product claim video. No external factual claims are made on screen."*
- `brief.md` §Source / claim plan: *"No factual claims requiring external sources… Claims table will be empty/short."*
- All 13 spoken lines are first-person narration about a feeling. There is **no** statistic, health claim, diagnosis, promise, advice, "this will fix you" line or external proposition anywhere in the text layer.
- The two silent beats `img1` (the deletion) and `img2` (the tilt) carry **no voice and no text**, so they assert no event either — the owner's account contains no deletion.
- The only on-screen strings that are not narration are the recreated UI labels `Chưa gửi` and `Tên đã lưu`, which are **interface labels inside a `minh hoạ` element**, not claims about the world.

## 9 · Labels (`minh hoạ`)

| row | element | type | label |
|---|---|---|---|
| `s4` | chat input bubble `Hôm nay mình mệt quá.` + send key + tag `Chưa gửi` | recreated phone chat UI | **minh hoạ** |
| `s6` | incoming-call screen: avatar + name line `Tên đã lưu` + one ring | recreated phone call UI | **minh hoạ** |
| `s10` | the same missed-call screen, re-shown — **continuity, not a second claim** | recreated phone call UI | **minh hoạ** |

**Correction to `brief.md` §Source / claim plan.** The brief expects *"none"* for this story profile. That is wrong as written: `script.md` §3 marks two phone interfaces as recreated (`s4` chat bubble, `s6` incoming-call UI) and both must carry `minh hoạ`. The brief's expectation is corrected here rather than repeated; `brief.md` was not edited.

**No diagrams, no charts, no recreated dashboards anywhere in this video.** Every other element is a vector/SVG plate and typography built in Remotion per `script.md` §2.3.

**Naming decision (open).** `script.md` §3 requires the caller's name to be *legible at phone size* and *never named*. `content-agent` will not invent a person who is not in the owner's account, so the name line renders the literal label **`Tên đã lưu`** ("saved name") beside a contact avatar. It is legible at phone size, unambiguously a saved contact rather than a stranger, and it invents nobody. If the owner wants a specific name, that is a director/script decision, not a content-pack edit.

## 10 · Acceptance checks run (and what I could not run)

All checks below were run programmatically against the **files on disk** — `voice.json` and `brief.md` were read and parsed, `content-pack.md` was read back, and the comparisons are exact string equality on the real bytes (not a re-typed transcription). The method is a `fetch` + `JSON.parse` + join performed inside the agent's tool runtime; it is **not** a shell command, and nothing here is a claim about a `pipeline.py` or `npm` run.

| # | check | method | result |
|---|---|---|---|
| 1 | every caption chunk reproduces its `voice.json` value word for word | parsed this file's §3 table, joined each key's caption lines with one space, compared by `===` to `JSON.parse(voice.json)[key]`; cross-checked with 13 literal `grep`s on `voice.json` | **13/13 exact**, zero mismatches |
| 2 | no caption line over 28 chars, no chunk over 2 lines | counted every line's code points, and the lines per chunk | **29 lines · max 28 (`Mọi người thường tìm đến bạn`) · min 8 · 0 chunks over 2 lines** |
| 3 | nothing in the bottom 210 px | every y-range in §2 scanned; the highest endpoint | **highest assigned y = 1710; no range ends below it; forbidden band [1710, 1920] empty** |
| 4 | the ten owner lines appear verbatim in the caption layer | `s2a` + `" "` + `s2b` compared by `===` to `brief.md`'s owner line #2; the other eight compared to their `voice.json` values | **10/10**, owner's order, `…` and straight inner quotes preserved |
| 5 | cover works with sound off in ≤ 6 words | word count of `Ai che ô cho bạn?` | **5 words** |
| 6 | every `voice.json` key has a row | row order compared to `Object.keys(voice.json)` | **13/13**, exact file order |
| 7 | END card carries the owner's title verbatim | the two stacked lines joined with one space, compared to `brief.md`'s `Title / theme line` | **exact match** (+ the terminal full stop `script.md` §8 already writes) |
| 8 | declared character/word counts in this file are true | every `(N ch)` and `N w · N ch` annotation re-counted | **all correct** — 7 were wrong on first write and are fixed |

**Commands I did NOT run.** This runtime has no shell or process-execution tool, so:

- I did **not** run `python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau`. My role normally requires it before returning; I cannot execute it here. **The director must run it** and record the result.
- I did **not** run `npm run verify`, `npm run test:visual`, `ffprobe`, or any render, measure or audio command. I make **no claim** about measured durations, frame numbers, loudness, fit, or how any string looks on screen.
- The verification in the table above was done by reading and parsing the files inside my tool runtime (`fetch` + `JSON.parse` + exact string comparison). It is a genuine byte-level check of the caption layer against `voice.json`, but it is **not** a shell pipeline run and **not** a render.
- **Nothing in this pack has been seen rendered.** Phone-size legibility, `FitText` overflow behaviour, the 54 px caption floor and the y-ranges in §2 are design/QA claims to be proven at gate D, the join and gate C — not by me.

**Timing honesty.** Every second and frame in this file is a **3.9 syl/s planning projection**. Voice clips do not exist yet. The measured timeline is decided at the join from real clip durations; if the measured rate falls outside 3.29–4.43 syl/s, `script.md` §5's elasticity applies — never audio speed.

**END contingency, not published.** `script.md` §8 contains contingency figures **49.72 s** and **51.72 s** for the case where the owner asks for the title to be spoken. They are **contingency arithmetic only and are not this video's runtime**. The governing planning figures are **46.58 / 48.90 / 50.66 s** across the 4.2 / 3.9 / 3.7 syl/s band (48.90 s at the planning rate). Nothing in this pack publishes 49.72 or 51.72.

## 11 · Open questions

1. **`Tên đã lưu`** — the caller's display name is a placeholder because the packet deliberately never names them. Confirm the placeholder, or route a real name through `script-agent` (gate A).
2. **`s4` double-layer** — the bubble and the caption carry the same words by design (§5). `content-reviewer` and gate E should confirm the two never overlap spatially and are never scaled to look alike.
3. **Accent-count exception.** `s3` and `s9` carry **three** accent words each, above the ≤2 guideline, because `F-11` requires `script.md` §3, `voice-direction.md` and `voice-performance.json` to hold one identical list and both are highlight/turn beats. If the director wants ≤2 everywhere, `script-agent` must change the sidecar — not `content-agent`.
4. **Divergence (§7).** Design is working from `script.md`'s draft column. Confirm the join takes strings from §3 of this file; if the director prefers the §3 drafts verbatim, that reopens 9 rows and the duplication defect returns.
5. **CTA** — absent by design (§6). If the owner ever wants a save/follow prompt, it needs a new shot after END and a gate-A reopen.
6. **Highlight accents** — `H1 s3`, `H2 s7`, `H3 s10` are matched: `rất lâu` / `phải là người ổn` / `với bạn thế?`. Confirm the audio branch emphasised the same tokens; a mismatch re-opens the join.
