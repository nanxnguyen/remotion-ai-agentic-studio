# Content Pack — ban-khong-yeu-duoi-chi-da-manh-qua-lau

**Video ID:** `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · **Profile:** `story` · **Comp:** `BanKhongYeuDuoiReel` · 9:16 1080×1920 @ 30 fps
**Locked from:** `voice.json` (gate A, accepted at the 3-round cap) · **Script:** `script.md` · **Performance sidecar:** `voice-performance.json`
**Owner of this file:** `content-agent` (Phase 3a). This pack is the **final** text layer. `design-agent`, `scene-agent` and the join must take the strings from here, not from the draft on-screen column of `script.md` §3 — see §7 Divergence.
**Revision:** fix round 1 (2026-10-20) — closes `content-pack-review.md` round 1 tickets CR-01…CR-13, CR-15 (CR-14 folded into CR-04). Director decisions applied: CR-10 caller label `Người thân`; CR-12 voice-clip wording without a count.

---

## 1 · Definitions used throughout (closes carried ticket `T-A2`)

`script.md` §4 left "chunk" ambiguous. The final semantics:

- A **caption chunk** = one caption card shown at one time. A card holds **1 or 2 lines**. Both lines of a card are visible at once, so a line break follows the phrase, not the audio gap.
- Chunks and lines are joined with **exactly one space** (`" ".join(...)` — the same join rule as `voice-performance.json` `phraseJoin`). Joining every line of a key with one space reproduces `voice.json[key]` byte for byte.
- A **chunk boundary** is placed only where the line cannot fit in 2 lines, and then only at a **clause gap** (`pauseAfterSeconds` inside the clip). A compound word or a styled span is never split across lines.
- **Voice accent words** (`F-11` list) are the voice emphasis shared by `script.md` §3, `voice-direction.md` and the sidecar. This pack **does not change them**; they are repeated in §3 for traceability only.
- **Caption styling tier** (CR-04) is what the caption layer renders, typographically inside the line (colour/weight), never a separate text block, so it adds no y-range of its own:
  - **strong** — only the three highlight beats: `rất lâu` (`s3`/H1), `phải là người ổn` (`s7`/H2), `với bạn thế?` (`s10`/H3); plus `mạnh mẽ quá lâu` on the silent END card. Exactly 3 strong spans exist in captions.
  - **light** — at most **one** other span per key, visibly weaker than strong.
  - **none** — every other voice accent word renders as plain caption text.
- **On-screen text** is a separate headline layer. It must **add** something the spoken line does not say. Where it would only compress, repeat, or label what the frame already shows, the row is declared **caption-layer-only**.
- **Timings in this pack are 3.9 syl/s planning projections**, not measurements. Every second and frame number here is a planning estimate; the voice clips are measured at the join, and the measured frames replace these.

## 2 · Safe zone — no text in the bottom 210 px

Frame is 1920 px tall, so the forbidden band is `y ∈ (1710, 1920]`. **No element in this pack is assigned any pixel at `y > 1710`.**

**What 1710 bounds (CR-15).** `y = 1710` is the **outer bound of every rendered pixel**, including Vietnamese below-baseline marks (`dấu nặng`: `một`, `lại`, `bạn`), descenders, stroke and shadow. The caption **text box** bottom is therefore set at **≤ 1690**, leaving ≥ 20 px for descenders and shadow inside the bound.

| element | y-range assigned (px) | note |
|---|---|---|
| Cover headline (`Ai che ô cho bạn?`) | 360 – 540 | upper third, 1 line |
| Headline layer, general | 300 – 620 | all additive headlines live here |
| Accent styling (strong / light) | inside their caption line | no separate band |
| Caption layer, 2-line card | text box 1560 – 1690 | all pixels incl. descenders/shadow ≤ 1710 |
| Caption layer, 1-line card | text box 1630 – 1690 | all pixels incl. descenders/shadow ≤ 1710 |
| `s4` chat bubble (recreated UI) | 640 – 1060 | mid-frame |
| `s4` state tag `Chưa gửi` | 1070 – 1130 | mid-frame |
| `s4` tag `minh hoạ` | 1140 – 1180 | directly under the `Chưa gửi` tag, left-aligned to the bubble |
| `s6` incoming-call UI (avatar + name line `Người thân`) | 620 – 980 | mid-frame |
| `s6` tag `minh hoạ` | 990 – 1030 | directly under the call UI, centred on it |
| `s10` missed-call screen (same element as `s6`) | 620 – 980 | mid-frame |
| `s10` tag `minh hoạ` | 990 – 1030 | same position as `s6` |
| END title, two stacked lines | 760 – 1120 | centred block |

### `minh hoạ` tag render spec (CR-11)

| row | exact string | size | weight / ink | y-range | visible |
|---|---|---|---|---|---|
| `s4` | `minh hoạ` | **≥ 32 px** (34 px recommended) | caption font, 600, caption ink at ≥ 80 % opacity, no accent colour | 1140 – 1180 | **the whole time the chat bubble is on screen** — appears with the bubble's first frame, clears with its last |
| `s6` | `minh hoạ` | **≥ 32 px** | same | 990 – 1030 | **the whole time the call UI is on screen**, through the ring-stop and the 0.50 s unanswered hold |
| `s10` | `minh hoạ` | **≥ 32 px** | same | 990 – 1030 | **the whole time the missed-call screen is on screen** |

All three tags sit inside 300–1710 and never overlap a caption card or a headline. They are lowercase, Vietnamese diacritics intact (`hoạ`), and are not translated or abbreviated.

Highest assigned y anywhere in the pack: **1710** (outer pixel bound of the caption layer). Design may raise the floor further for platform UI overlays; 1710 is the contract.

## 3 · Per-key text layer (13 keys, `voice.json` order)

| key | on-screen text (final) | words / chars | clear event | caption chunks (lines, chars) | voice accent words (`F-11`, unchanged) | caption styling tier | label | claim ids |
|---|---|---|---|---|---|---|---|---|
| `s1` | `Ai che ô cho bạn?` | 5 w · 17 ch | holds from frame 0; **clears on the `s1`→`s2a` clip boundary** (3.34 s → planning frame 100) | **C1** L1 `Mọi người thường tìm đến bạn` (28) · L2 `mỗi khi có chuyện buồn.` (23) | `tìm đến bạn` · `chuyện buồn` | light `chuyện buồn` | — | — |
| `s2a` | `Ly của bạn vẫn trống` | 5 w · 20 ch | **clears on the `s2a`→`a1` clip boundary** (6.18 s → planning frame 185) | **C1** L1 `Bạn biết cách an ủi.` (20) · L2 `Biết phải nói gì.` (17) | `an ủi` · `nói gì` | light `an ủi` | — | — |
| `a1` | **— caption-layer-only** | — | — | **C1** L1 `Vai người khác nhẹ xuống.` (26) · L2 `Còn bạn thì đứng ngoài.` (23) | `nhẹ xuống` · `đứng ngoài` | light `đứng ngoài` | — | — |
| `s2b` | **— caption-layer-only** | — | — | **C1** L1 `Biết làm sao để người khác` (26) · L2 `thấy ổn hơn.` (12) | `thấy ổn hơn` | light `ổn hơn` (not the whole line) | — | — |
| `s3` | **— caption-layer-only** (CR-08) | — | — | **C1** L1 `Nhưng có một tối,` (17) · **C2** L1 `chính bạn lại ngồi rất lâu` (26) · L2 `trước màn hình điện thoại.` (26) | `một tối` · `rất lâu` · `trước màn hình điện thoại` | **strong `rất lâu`** (H1); no light span | — | — |
| `a2` | **— caption-layer-only** | — | — | **C1** L1 `Ngoài cửa sổ, mưa rơi đều.` (26) | `mưa rơi đều` | light `mưa rơi đều` | — | — |
| `s4` | bubble `Hôm nay mình mệt quá.` + state tag `Chưa gửi` + tag `minh hoạ` | 5 w · 21 ch + 2 w · 8 ch + 2 w · 8 ch | bubble types on with the line; **send key is never pressed** — the tag `Chưa gửi` is the declared terminal state and holds until the clip end (21.72 s → planning frame 652); `minh hoạ` visible for the whole bubble lifetime (§2) | **C1** L1 `Bạn muốn nhắn:` (14) · **C2** L1 `'Hôm nay mình mệt quá.'` (23) | `mệt quá` · `nhắn` | light `mệt quá` | **minh hoạ** (recreated phone chat UI) | — |
| `s5` | `Tay chưa buông điện thoại` | 5 w · 25 ch | **clears at the `s5` clip end** (23.69 s → planning frame 711), leaving `img1`'s 1.70 s deletion hold with no text at all | **C1** L1 `Rồi nghĩ một lúc,` (17) · L2 `bạn lại thôi.` (13) | `nghĩ một lúc` · `lại thôi` | light `lại thôi` | — | — |
| `s6` | `Bạn không nghe máy` | 4 w · 18 ch | **does not appear on the incoming-call frame.** It **appears on the ring-stop frame** (the frame the call UI stops ringing and switches to its unanswered state); holds through the 0.50 s unanswered-call hold; **clears on the `s6`→`s7` boundary** (28.12 s → planning frame 844). The join must place the ring-stop ≥ 1.0 s before that boundary so the 18 chars are readable | **C1** L1 `Không phải vì` (13) · L2 `không có ai để nhắn.` (20) | `không có ai` | light `không có ai` | **minh hoạ** (recreated phone call UI) | — |
| `s7` | **— caption-layer-only** (CR-05) | — | — | **C1** L1 `Mà vì bạn đã quen` (17) · **C2** L1 `với việc mình` (13) · L2 `phải là người ổn.` (17) | `đã quen` · `phải là người ổn` | **strong `phải là người ổn`** (H2); no light span | — | — |
| `s8` | **— caption-layer-only** | — | — | **C1** L1 `Bạn biết không…` (15) | `không…` | **none** (breath-word, not dramatised — `voice-direction.md`) | — | — |
| `s9` | **— caption-layer-only** (CR-09) | — | — | **C1** L1 `Người thường xuyên` (18) · L2 `che ô cho người khác` (20) · **C2** L1 `cũng có những ngày bị ướt.` (26) | `che ô` · `cũng` · `bị ướt` | light `bị ướt` | — | — |
| `s10` | **— caption-layer-only** | — | — | **C1** L1 `Và họ cũng cần` (14) · L2 `một người hỏi:` (14) · **C2** L1 `'Hôm nay có chuyện gì` (21) · L2 `với bạn thế?'` (13) | `một người hỏi` · `với bạn thế?` | **strong `với bạn thế?`** (H3); no light span (`một người hỏi` would cover its whole line) | **minh hoạ** (missed-call screen re-shown, same element as `s6`) | — |

**Chunk totals:** 18 cards · 29 lines · 0 chunks over 2 lines · max line 28 chars (`Mọi người thường tìm đến bạn`), min line 12 chars (`thấy ổn hơn.`).
**Styling totals:** 3 strong spans in captions (one per highlight beat) + 1 on END · 9 light spans, ≤ 1 per key · no light span equals a whole caption line (the strong H2/H3 spans fill their line minus terminal punctuation, by design of CR-01/CR-02 which keep each highlight on one line) · no styled span crosses a line break · `trước màn hình điện thoại` and `không…` carry no caption styling.

**Headline decisions recorded (CR-05, CR-08, CR-09).**
- `s3` — caption-layer-only. The old `Cái ô gập bên cửa` labelled a prop already in frame and added a second idea (umbrella) to H1, whose one idea is the wait at the phone. The strong `rất lâu` carries the wait.
- `s7` — caption-layer-only. `Mưa tắt` was a wrong collocation (`mưa tạnh`, not `tắt`), and any headline on H2 pulls the eye off the plainest line. No headline is visible while `phải là người ổn` is on screen.
- `s9` — caption-layer-only. The tilt is performed by the image itself (`script.md` §3 `s9`, `img2`), so `Ô nghiêng khỏi vai bạn` only described the frame over 3 caption lines. **Reopen condition:** if gate D shows the tilt is not legible at phone size, gate D may ask for it back.

### Rows with no voice key (`script.md` §3)

| row | on-screen text | caption | accent | label | note |
|---|---|---|---|---|---|
| `img1` (staged inside `s5`'s 1.70 s hold) | **— no text** | none (silent by design) | — | — | The row label `Xoá từng chữ.` in `script.md` is an **internal row name, explicitly not rendered** (`NEW-01`). The deletion is seen in the image only. `s5`'s headline clears before this hold, so the hold carries no text whatsoever. |
| `img2` (staged inside `s9`'s 1.30 s hold) | **— no text** | none | — | — | The tilt completes in the image; `s9` already said it in the owner's own words. |
| `END` (silent title card, 45.70–48.90 s planning) | **L1** `Bạn không yếu đuối,` (4 w · 19 ch) · **L2** `bạn chỉ đã mạnh mẽ quá lâu` (7 w · 26 ch) | none — **silent card, no voice** | **strong `mạnh mẽ quá lâu`** (on-screen emphasis only, not a voice accent) | — | Owner's title line verbatim, stacked, **no terminal full stop** (CR-13: `brief.md` line 14 has none; `script.md` §8's `.` is not carried). **Declared cap exception (`F-13`): L2 is 7 words, one over the ≤6-word rule.** The owner's wording outranks the style rule; `Bạn` is not dropped and the line is not reworded. |

### Join-back check (key → caption chunks)

| key | caption lines joined with one space | equals `voice.json[key]` |
|---|---|---|
| `s1` | `Mọi người thường tìm đến bạn mỗi khi có chuyện buồn.` | ✅ |
| `s2a` | `Bạn biết cách an ủi. Biết phải nói gì.` | ✅ |
| `a1` | `Vai người khác nhẹ xuống. Còn bạn thì đứng ngoài.` | ✅ |
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
- **Clear event:** the headline holds from frame 0 and **clears on the `s1`→`s2a` clip boundary**, leaving the caption layer alone until the `s2a` headline (`S-05`). Frame-accurate event; `design-spec.md` and the join must honour it.
- This string is **locked by gate A** and is carried unchanged.

## 5 · Re-hook (~15–20 s) — the withheld message

- **Key:** `s4`. Clip starts **19.02 s** at the 3.9 planning rate (**17.93 s** at 4.2, **19.86 s** at 3.7) — inside 15–20 s at every rate in the band.
- **On-screen text:** recreated chat input bubble carrying `Hôm nay mình mệt quá.`, with the state tag `Chưa gửi` next to the send key, and the tag `minh hoạ` under it (§2 render spec).
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

| key | `script.md` §3 draft | final in this pack (round 1) | words shared with the row's own caption |
|---|---|---|---|
| `s1` | `Ai che ô cho bạn?` | **unchanged** (gate-A locked) | 1 (`bạn`) |
| `s2a` | `Bạn luôn biết phải nói gì.` | `Ly của bạn vẫn trống` (CR-06) | **4 → 1** |
| `a1` | `Còn bạn thì đứng ngoài.` | **— caption-layer-only** | **5 → 0** (draft was verbatim-identical to caption line 2) |
| `s2b` | `Người khác thấy ổn hơn.` | **— caption-layer-only** | **4 → 0** (draft was a truncation of the caption) |
| `s3` | `Chính bạn ngồi trước màn hình.` | **— caption-layer-only** (CR-08) | **6 → 0** |
| `a2` | `—` | **unchanged** | 0 |
| `s4` | bubble `Hôm nay mình mệt quá.` | bubble + tag `Chưa gửi` + tag `minh hoạ` | intentional, declared (§5) |
| `s5` | `Sao lại thôi?` | `Tay chưa buông điện thoại` | **2 → 0** |
| `img1` | `—` | **unchanged** | 0 |
| `s6` | `Không phải vì không có ai.` | `Bạn không nghe máy` (CR-07), after ring-stop | **5 → 1** (`không`) |
| `s7` | `Bạn đã quen làm người ổn.` | **— caption-layer-only** (CR-05) | **5 → 0** |
| `s8` | `—` | **unchanged** | 0 |
| `s9` | `Người che ô cũng bị ướt.` | **— caption-layer-only** (CR-09) | **4 → 0** |
| `img2` | `—` | **unchanged** | 0 |
| `s10` | `Có chuyện gì với bạn thế?` | **— caption-layer-only** | **6 → 0** (draft was caption card 2 verbatim) |
| `END` | 2 stacked lines | owner's verbatim title, **no full stop** (CR-13), `F-13` exception | n/a |

**Handoff:** `design-spec.md` §Text authority (line 6) lists the round-0 strings of this pack. Round 1 changes five of them (`s2a`, `s3`, `s6`, `s7`, `s9` — see the design-spec spot list in the fix-round return). **The final strings are the ones in §3 of this file.** The join reconciles; nothing in `script.md` was edited.

### NEW-4 closure (the one `script-review.md` ticket routed here)

> *"`s2a`'s headline shares four words with the caption it sits on and has no declared clear event."*

**Closed by option (a): the headline string differs from its caption chunk**, and it shares **one** word (`bạn`) with the caption instead of four. `s2a` reads `Ly của bạn vẫn trống` (5 words, 20 chars) — a fact the spoken line never states, matching the shot's own staging in `script.md` §3 `s2a` (her own glass **untouched and empty**, re-shown empty at `a1`, `s2b` and `s7`). **A clear event is declared: it appears with the doorway shot and clears on the `s2a`→`a1` clip boundary (planning frame 185).**

**Option (b) — caption-layer-only — is used for `a1`, `s2b`, `s3`, `a2`, `s7`, `s8`, `s9`, `s10`**, where a headline could only restate the line or label what the frame already shows.

## 8 · Claims

| id | claim as shown | source URL | fact / inference |
|---|---|---|---|
| — | **No claim is made anywhere on screen.** | — | — |

The table is **empty by evidence, not by omission**:

- `research.md` §Primary source: *"This is a personal/emotional story, not a factual or product claim video. No external factual claims are made on screen."*
- `brief.md` §Source / claim plan: *"No factual claims requiring external sources… Claims table will be empty/short."*
- All 13 spoken lines are first-person narration about a feeling. There is **no** statistic, health claim, diagnosis, promise, advice, "this will fix you" line or external proposition anywhere in the text layer.
- The two silent beats `img1` (the deletion) and `img2` (the tilt) carry **no voice and no text**, so they assert no event either — the owner's account contains no deletion.
- The only on-screen strings that are not narration or headline are the recreated UI labels `Chưa gửi`, `Người thân` and `minh hoạ`, which are **interface labels inside or beside a `minh hoạ` element**, not claims about the world.

## 9 · Labels (`minh hoạ`)

| row | element | type | label |
|---|---|---|---|
| `s4` | chat input bubble `Hôm nay mình mệt quá.` + send key + tag `Chưa gửi` | recreated phone chat UI | **minh hoạ** (render spec §2) |
| `s6` | incoming-call screen: generic contact avatar + name line `Người thân` + one ring | recreated phone call UI | **minh hoạ** (render spec §2) |
| `s10` | the same missed-call screen, re-shown, same name line `Người thân` — **continuity, not a second claim** | recreated phone call UI | **minh hoạ** (render spec §2) |

**Correction to `brief.md` §Source / claim plan.** The brief expects *"none"* for this story profile. That is wrong as written: `script.md` §3 marks two phone interfaces as recreated (`s4` chat bubble, `s6` incoming-call UI) and both must carry `minh hoạ`. The brief's expectation is corrected here rather than repeated; `brief.md` was not edited.

**No diagrams, no charts, no recreated dashboards anywhere in this video.** Every other element is a vector/SVG plate and typography built in Remotion per `script.md` §2.3.

**Naming decision (closed, CR-10).** **Decided by the director (fix round 1, 2026-10-20):** the caller's name line renders **`Người thân`** ("family / someone close") — a saved-contact label that reads as a real person at phone size, matches `script.md` §3's "saved name, legible at phone size, never named", and invents no person or biography. It is never spoken, so **no script change** and no gate-A reopen. The avatar is a generic silhouette (no initial, no photo). The old placeholder `Tên đã lưu` is retired everywhere.

## 10 · Acceptance checks (round 1)

Checks are by reading the files on disk and comparing strings and code-point counts. **No shell, script or render was run by `content-agent` in this round**; the runtime offers no process-execution tool.

| # | check | method | result |
|---|---|---|---|
| 1 | every caption chunk reproduces its `voice.json` value word for word | each key's caption lines joined with one space, compared to the `voice.json` value read this round | **13/13 exact**; only `s6`, `s7`, `s10` line breaks moved, words unchanged |
| 2 | no caption line over 28 chars, no chunk over 2 lines | code points per line re-counted for the moved lines (`Không phải vì` 13, `không có ai để nhắn.` 20, `với việc mình` 13, `phải là người ổn.` 17, `Và họ cũng cần` 14, `một người hỏi:` 14) | **29 lines · 18 cards · max 28 · min 12 · 0 cards over 2 lines** |
| 3 | nothing in the bottom 210 px | every y-range in §2 scanned; 1710 defined as outer pixel bound incl. descenders/shadow; caption text box ≤ 1690 | **highest assigned y = 1710** |
| 4 | styled spans | count of strong/light per key in §3 | **3 strong in captions (s3/s7/s10) + END; 9 light, ≤ 1 per key; no span split by a break; strong H2/H3 = line minus punctuation (declared)** |
| 5 | headlines ≤ 6 words, not duplicating caption or UI | `Ai che ô cho bạn?` 5 w, `Ly của bạn vẫn trống` 5 w, `Tay chưa buông điện thoại` 5 w, `Bạn không nghe máy` 4 w | **all ≤ 6**; no `tắt` with `mưa` anywhere |
| 6 | every `voice.json` key has a row | row order vs `voice.json` key order | **13/13**, exact file order |
| 7 | END title equals the owner's title | L1 + " " + L2 vs `brief.md` line 14 | **exact**, no added full stop |
| 8 | `minh hoạ` tags specified | §2 render spec | **3 rows**, ≥ 32 px, y ≤ 1180, visible for the element's lifetime |

**Commands I did NOT run.**

- `python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau` — **not run** (no process-execution tool in this runtime). **The director must run it** and record the result.
- No `npm run verify`, `npm run test:visual`, `ffprobe`, render, measure or audio command. I make **no claim** about measured durations, frame numbers, loudness, fit, or how any string looks on screen.
- **Nothing in this pack has been seen rendered.** Phone-size legibility, `FitText` overflow, the 54 px caption floor, the 32 px tag floor and the y-ranges in §2 are proven at gate D, the join and gate C — not by me.

**Timing honesty (CR-12).** Every second and frame in this file is a **3.9 syl/s planning projection**. `voice-agent` is producing the voice clips in `public/audio/<vid>/`; this pack makes no claim about which clips exist. **The voice clips are measured at the join**, and the measured clip durations replace every planning number here. If the measured rate falls outside 3.29–4.43 syl/s, `script.md` §5's elasticity applies — never audio speed.

**END contingency, not published.** `script.md` §8 contains contingency figures **49.72 s** and **51.72 s** for the case where the owner asks for the title to be spoken. They are **contingency arithmetic only and are not this video's runtime**. The governing planning figures are **46.58 / 48.90 / 50.66 s** across the 4.2 / 3.9 / 3.7 syl/s band (48.90 s at the planning rate). Nothing in this pack publishes 49.72 or 51.72.

## 11 · Open questions

1. ~~`Tên đã lưu`~~ — **closed** (CR-10, director decision: `Người thân`, §9).
2. **`s4` double-layer** — the bubble and the caption carry the same words by design (§5). Gate E should confirm the two never overlap spatially and are never scaled to look alike.
3. **Accent-count note.** `s3` and `s9` keep **three** voice accent words each because `F-11` requires one identical list across `script.md` §3, `voice-direction.md` and `voice-performance.json`. The caption layer now styles at most one strong + one light span per key (§1), so the visual ≤2 rule holds without touching `F-11`.
4. **Divergence (§7).** Confirm the join and `design-spec.md` take strings from §3 of this file (round 1), not the `script.md` drafts or the round-0 strings.
5. **CTA** — absent by design (§6). A save/follow prompt would need a new shot after END and a gate-A reopen.
6. **Highlight accents** — `H1 s3`, `H2 s7`, `H3 s10` are matched: `rất lâu` / `phải là người ổn` / `với bạn thế?`. Confirm the audio branch emphasised the same tokens; a mismatch re-opens the join.
7. **`s9` headline reopen** — only if gate D finds the tilt illegible at phone size (§3).
8. **`s6` ring-stop frame** — the join must place it ≥ 1.0 s before the `s6`→`s7` boundary so `Bạn không nghe máy` is readable (§3).
