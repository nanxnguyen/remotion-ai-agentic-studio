# Content pack review — ban-khong-yeu-duoi-chi-da-manh-qua-lau

## Round 1

**Reviewer:** `content-reviewer` (clean context, round 1 of max 3) · **Date:** 2026-10-20
**Inputs read on disk:** `content-pack.md`, `voice.json`, `script.md`, `brief.md`, `research.md`, `owner-notes.md`, `voice-performance.json`, `voice-direction.md`, `voice-report.md`, `status.json`, `script-review.md` (round-3 carried items), `script-review.hook.md` (NEW-2 / NEW-4), `.agents/rules/{README,01,02}.md`, and a listing of `public/audio/<vid>/*.mp3`.
**Previous content round:** none (this file is new).

**Result: `score: 8.1  verdict: revise`** — 0 Cao · 9 Trung · 5 Thấp. Mean is under 9, three items score below 8, and nine Trung tickets are open.

### What I could not run

- `python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau` was **not run**. This runtime has no shell or process-execution tool, so there is **no audit result**. The director must run it.
- Nothing was rendered or measured by me. Phone-size legibility, glyph extents and font metrics are not verified.
- My caption checks are manual: I read the files and compared strings and code-point counts myself. No script was executed.

### Fidelity check (done independently, every key)

I joined every caption line of every key with one space and compared the result to `voice.json`. All 13 keys match exactly: `s1`, `s2a`, `a1`, `s2b`, `s3`, `a2`, `s4`, `s5`, `s6`, `s7`, `s8`, `s9`, `s10`. Diacritics, the `…` in `s8` and the straight inner quotes in `s4` and `s10` are all intact. The ten owner lines are verbatim and in order, and `s2a` + `s2b` rejoins owner line #2 exactly (`brief.md:19`). I re-counted line lengths: the maximum is 28 (`s1` L1) and no card has more than 2 lines. The pack's claims here are true.

### Carried items (gate A → content-agent)

| item | acceptance check | state | evidence |
|---|---|---|---|
| `NEW-4` (hook): `s2a` headline overlapped its caption and had no clear event | "headline string differs from its caption chunk or is marked caption-only" | **closed** | `content-pack.md:44`: `Ly của bạn vẫn còn nguyên` differs from the caption, and a clear event is declared at the `s2a`→`a1` boundary. A **new**, separate problem with this string is raised as CR-06. |
| accepted-risk #2: END contingency 49.72 / 51.72 s must not be used as a timeline number | the figures do not appear as runtime | **closed** | `content-pack.md:200` names them as contingency only. The governing figures 46.58 / 48.90 / 50.66 s are stated. |
| `T-A2`: "chunk" was ambiguous | a definition exists | **closed** | `content-pack.md:11-18` |
| `F-11`: identical accent lists across `script.md` §3, `voice-direction.md` and the sidecar | — | **not touched by this pack** | `voice-direction.md:96` binds those **three script-side files** only. It does not bind caption styling, so CR-04 is fixable by `content-agent` without changing any list. |

### Rubric

| item | score | evidence |
|---|---:|---|
| Fidelity | **9.5** | 13/13 join-backs exact. The only nit is that the END title gains a full stop the owner's line does not have (CR-13). |
| Sound-off clarity | **8.5** | The cover `Ai che ô cho bạn?` plus frame 0 carries the thesis. The re-hook at `s4` (19.02 s planning) is legible via the `Chưa gửi` draft. The `s6` → `s10` payoff, however, rests on a caller label that reads as a placeholder (`Tên đã lưu`, CR-10), and the `s6` headline can be read as the opposite of the point (CR-07). |
| Readability | **7.5** | Every line is ≤ 28 characters and every card ≤ 2 lines. But `s7` breaks inside the H2 accent `phải là \| người ổn.` (CR-01), `s10` breaks inside `một \| người hỏi:` (CR-02), and `s6` strands `để nhắn.` (CR-03). |
| Value of on-screen text | **7.0** | The rewrite away from duplicate headlines is correct in direction (§7). However, `s2a` contradicts the staged image (CR-06), `s7` uses the non-idiomatic `Mưa tắt` and competes with H2 (CR-05), `s6` is ambiguous (CR-07), and `s3`/`s9` label props already in frame (CR-08, CR-09). |
| Emphasis | **7.0** | The three highlight tokens are present (`rất lâu` / `phải là người ổn` / `với bạn thế?`). But there are 25 accent spans across 13 keys plus END, all at one weight, so the 3 highlight beats do not stand out. One span covers a whole line (`s3` L2), and two highlight-adjacent accents are split by line breaks (CR-04, CR-01, CR-02). The CTA is properly absent and separate from the climax (§6). |
| Credibility | **8.5** | The empty claims table is justified by evidence (`research.md:4`, `brief.md:50`). `minh hoạ` is assigned to `s4`, `s6` and `s10`, but the label is never specified as a rendered element (text, size, position, duration), so gate D/E cannot check it (CR-11). The pack also falsely states that voice clips do not exist (CR-12). |
| User constraints | **9.0** | See the checklist below. Everything is met except the punctuation nit on the title. |

**Mean = (9.5 + 8.5 + 7.5 + 7.0 + 7.0 + 8.5 + 9.0) / 7 = 8.14 → 8.1.**

### User constraints, one by one (`brief.md`)

| constraint | state |
|---|---|
| Title line `Bạn không yếu đuối, bạn chỉ đã mạnh mẽ quá lâu` used verbatim | ✅ on END, `Bạn` kept and the line not reworded (`F-13` declared). The pack adds a trailing `.` (CR-13). |
| Mandatory spoken text verbatim in captions | ✅ 13/13 |
| Captions ≤ 2 lines, ≤ ~28 chars/line | ✅ (max 28) |
| Accent words matching highlight beats | ⚠ present but not distinguished (CR-04) |
| No text in bottom 210 px | ✅ as assigned. Zero margin at 1710 (CR-15). |
| Caption ≥ 54 px, auxiliary ≥ 32 px | not specified for the `minh hoạ` tag (CR-11). Otherwise design-owned. |
| Recreated UI marked `minh hoạ` | ✅ assigned, ⚠ render spec missing (CR-11) |
| Soft ending hold, no CTA | ✅ §6 |
| Owner notes N1/N2 | ✅ both `done` ("hi", no instruction) |

### Tickets

All tickets are owned by `content-agent` unless stated. No spoken line is at fault, so none goes to `script-agent`.

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **CR-01** | Trung | `content-pack.md:52` `s7` C2 | L1 `với việc mình phải là` / L2 `người ổn.` splits the **H2 gut-punch accent** `phải là người ổn` across two lines and breaks the copula `là \| người ổn`. | C2 → L1 `với việc mình` (13) / L2 `phải là người ổn.` (17). C1 `Mà vì bạn đã quen` stays. | content-agent | The `s7` join still equals `voice.json.s7`. `phải là người ổn` sits inside one line. Lines ≤ 28. |
| **CR-02** | Trung | `:55` `s10` C1 | L1 `Và họ cũng cần một` / L2 `người hỏi:` splits the accent `một người hỏi` and the noun phrase `một người`. `script.md:183` already proposed the clean break. | C1 → L1 `Và họ cũng cần` (14) / L2 `một người hỏi:` (14). C2 unchanged. | content-agent | The join equals `voice.json.s10`. The accent `một người hỏi` is in one line. |
| **CR-03** | Thấp | `:51` `s6` C1 | `Không phải vì không có ai` / `để nhắn.` (8) strands the end of the relative clause `ai để nhắn`. Both lines of a card show at once, so the audio's 0.18 s gap does not dictate the line break. | L1 `Không phải vì` (13) / L2 `không có ai để nhắn.` (20). | content-agent | The join equals `voice.json.s6`. The accent `không có ai` is in one line. No line < 10 chars unless the key is that short. |
| **CR-04** | Trung | §3 accent column, all rows | There are 25 accent spans (2+2+2+1+3+1+2+2+1+2+1+3+2, plus END), all at one weight, so H1/H2/H3 are visually indistinguishable from `an ủi` or `nghĩ một lúc`. `s3`'s `trước màn hình điện thoại` covers its whole L2 line. `s8`'s `không…` accents a breath-word that `voice-direction.md:86` says must not be dramatised. | Keep the `F-11` lists unchanged as the voice emphasis. Add a **caption-styling tier** column: **strong** = only `rất lâu` (s3/H1), `phải là người ổn` (s7/H2), `với bạn thế?` (s10/H3), plus `mạnh mẽ quá lâu` on END. **light** = at most one other span per key. **none** = everything else. Drop caption styling for `trước màn hình điện thoại` and `không…`. | content-agent | Exactly 3 strong spans in captions, one per highlight beat. No styled span equals a whole caption line. ≤ 1 light span per key. The `F-11` lists in the three script files are byte-unchanged. |
| **CR-05** | Trung | `:52` `s7` headline | `Mưa tắt mà bạn không biết`: `tắt` is used for lights and fire, so rain stopping is `mưa tạnh`, and this reads as an error. The headline also sits on **H2**, the "plainest" line (`script.md:156`), and pulls the eye to the window while she says the truest line. | Make `s7` **caption-layer-only**. If the director wants it kept, use `Mưa tạnh lúc nào không hay` (6 w, 26 ch) and clear it before C2 `với việc mình…` appears. | content-agent | No `tắt` collocated with `mưa`. `s7` has no headline visible while `phải là người ổn` is on screen. |
| **CR-06** | Trung | `:44`, `:122`, `:144` `s2a` headline | `Ly của bạn vẫn còn nguyên` means "your drink is still full, untouched". The staging it claims to draw from is `script.md:147`: "her own glass on the table is **untouched and empty**", re-shown empty at `a1`, `s2b` and `s7`. The headline describes the opposite object state from the frame. | → `Ly của bạn vẫn trống` (5 w, 20 ch). This matches the frame and carries the meaning (nobody poured for you). Alternatively, make `s2a` caption-layer-only. | content-agent | The headline's object state matches `script.md` §3 `s2a` image ("empty"). The string differs from the caption. The clear event is unchanged. |
| **CR-07** | Trung | `:51` `s6` headline | `Cuộc gọi chưa ai trả lời` ("a call nobody has answered") can be read as *no one is there*. The beat (CP3, `script.md:239`) is the reverse: someone **is** there, and **she** does not pick up. The headline also only restates what the recreated call UI already shows. | → `Bạn không nghe máy` (4 w, 18 ch). It attributes the refusal to her, which the frame alone leaves ambiguous (a ring that stops could be a missed call). This is why it differs from the prop-label pattern in CR-08/09. | content-agent | The headline names her as the one not answering. It appears only **after the ring stops** (not on the incoming-call frame), and that appear event is declared. ≤ 6 words. It duplicates neither the caption nor the UI text. |
| **CR-08** | Thấp | `:47` `s3` headline | `Cái ô gập bên cửa` labels a prop already in frame (`script.md:150`) and adds a second idea (umbrella) to the **H1** shot, whose one idea is waiting at the phone. | Make it caption-layer-only, or replace it with a string about the wait (not the prop). | content-agent | `s3` carries ≤ 1 idea and the headline does not name an object already visible. |
| **CR-09** | Thấp | `:54` `s9` headline | `Ô nghiêng khỏi vai bạn` describes the tilt the image is already performing (`script.md:158`) while 3 caption lines play. It is redundant with the frame. | Make it caption-layer-only, or keep it only if gate D shows the tilt is not legible at phone size. | content-agent | The decision and its reason are recorded in §3. |
| **CR-10** | Trung | `:167`, `:174`, `:204` | The caller name renders the literal `Tên đã lưu` ("saved name"). At phone size this reads as an unfilled UI template, not a person. The `s10` payoff ("the ending pays `s6`", `script.md:160`) depends on the viewer recognising a real contact with the sound off. | Pick a contact label that reads as a person without a biography. For example, use an initial avatar plus a relational label (`Bạn thân`, `Chị`), or a single common first name. Get a **director decision** recorded in the pack; `script-agent` is needed only if the director wants the name spoken. | content-agent (director decides first) | The rendered name line is not a template phrase. The decision is recorded in §9 with who decided it. Open question 1 is closed. |
| **CR-11** | Trung | §2 table `:24-35`, §9 `:162-168` | `minh hoạ` is assigned as a "label" but never specified as a **rendered** element: no text style, size (brief: auxiliary ≥ 32 px), position/y-range or duration. Gate D/E cannot verify the label exists or stays out of the bottom 210 px. | Add §2 rows: `minh hoạ` tag for `s4`, `s6` and `s10`. Give the exact string, ≥ 32 px, a y-range adjacent to the UI element (inside 300–1710), and "visible for the whole time the element is on screen". | content-agent | Three tag rows exist in §2 with y-ranges ≤ 1710. Size ≥ 32 px. Duration equals element visibility. |
| **CR-12** | Trung | `:18`, `:198` | "voice clips do not exist yet" is **false on disk**. The 2026-10-20 listing of `public/audio/ban-khong-yeu-duoi-chi-da-manh-qua-lau/` contains `s1`, `s2a`, `a1`, `s2b`, `s3`, `s4`, `s5`, `s7`, `s8` and `s9` `.mp3` (10 of 13 keys; `a2`, `s6` and `s10` are absent). `voice-report.md:5-13` also records measured phrases for `s4`, `s5`, `s7`, `s8` and `s9`. This breaks the binding rule "never claim a state the files do not prove" (`02-documentation.md` D2: a stale document is a defect). | Replace with: partial clips exist (list the keys); `voice-agent` is still generating or regenerating (`a2`, `s6`, `s10` missing; `s2a`, `a1`, `s9`, `s7` being regenerated per `status.json`); the pack's frames remain 3.9 syl/s projections until the join measures every key. | content-agent | No sentence in the pack says clips do not exist. The listed keys match `public/audio/<vid>/` at the time of the fix. |
| **CR-13** | Thấp | `:65`, `:188` | The owner's title (`brief.md:14`) has no terminal full stop. END L2 renders `quá lâu.`, and the pack calls it "exact match (+ full stop)". | Drop the `.` on END L2, or record it as an explicit deviation inherited from `script.md:294`. | content-agent | END L1 + " " + L2 equals the `brief.md:14` string exactly, or the deviation is declared as such. |
| **CR-15** | Thấp | `:29-30`, `:37` | The caption box bottom edge is "exactly 1710", zero margin to the forbidden band. Vietnamese below-baseline marks (`dấu nặng`: `một`, `lại`, `bạn`) and any shadow/stroke can cross it. | State that 1710 is the outer bound **including** glyph descenders and shadow, or set the box bottom to ≤ 1690. | content-agent | The §2 note defines what 1710 bounds. No rendered pixel of a caption is at y > 1710 at gate D. |

(CR-14 was folded into CR-04: the `s8` accent.)

### Notes for the join / gate E (not tickets here)

- §7 replaces 9 of the draft headlines in `script.md` §3 with strings not drawn from the spoken words. That departs from gate A's `NEW-2` acceptance wording ("drawn from that row's own spoken words") but follows the content rule that on-screen text must add to the line. The departure is declared, which is correct. Gate E must confirm that `design-spec.md` takes the strings from this pack, not from the `script.md` drafts.
- `s4` double layer (bubble + caption with the same words) is declared and acceptable. Spatial separation is for gate E.

### Summary

Score 8.1, revise. 0 Cao · 9 Trung (CR-01, 02, 04, 05, 06, 07, 10, 11, 12) · 5 Thấp (CR-03, 08, 09, 13, 15). The caption layer's fidelity is solid. The weak points are line breaks that split accents, a flat emphasis hierarchy, three headlines that misdescribe or misread their shot, and an unspecified `minh hoạ` render.

## Round 2

**Reviewer:** `content-reviewer` (new clean context, round 2 of max 3) · **Date:** 2026-10-20
**Inputs read on disk:** `content-pack.md` (fix round 1), `content-pack-review.md` round 1, `voice.json`, `voice-performance.json` (`accentWords`), `script.md` (staging lines for `s2a`/`s6`/`s7`), `owner-notes.md`. Director decision taken as given: caller label `Người thân` (CR-10). CR-12 wording without a clip count is also a director decision.

**Result: `score: 9.1  verdict: pass`** — 0 Cao · 0 Trung · 0 Thấp open. No NEW tickets.

### What I could not run

- `python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau` was **not run**: no shell or process-execution tool in this runtime. **There is no audit result. The director must run it.**
- All checks below are manual: I read the files and counted code points myself. Nothing was rendered or measured.

### Regression check (every key, re-done independently)

- **Join-back:** I joined each key's caption lines with one space and compared them to `voice.json`. All **13/13** match exactly (`s1`, `s2a`, `a1`, `s2b`, `s3`, `a2`, `s4`, `s5`, `s6`, `s7`, `s8`, `s9`, `s10`). The `…`, the straight quotes and the diacritics are intact.
- **Lines and cards:** there are 29 lines in 18 cards, and no card has more than 2 lines. The maximum line is 28 (`Mọi người thường tìm đến bạn`, recounted). The moved lines are `Không phải vì` 13, `không có ai để nhắn.` 20, `với việc mình` 13, `phải là người ổn.` 17, `Và họ cũng cần` 14 and `một người hỏi:` 14. No line is over 28.
- **Safe zone:** the highest assigned y is 1710, defined as the outer pixel bound. Caption text boxes end at ≤ 1690. The tag, UI and headline y-ranges in §2 do not overlap one another or the caption bands.
- **F-11:** the pack's voice-accent column equals `voice-performance.json` `accentWords` for all 13 keys. `content-agent` does not own the script-side files, and the pack does not alter them.

### Old tickets, by acceptance check

| id | sev | state | evidence |
|---|---|---|---|
| CR-01 | Trung | **closed** | `content-pack.md:72`: `phải là người ổn.` is on one line, and the join is exact. |
| CR-02 | Trung | **closed** | `:75`: `một người hỏi:` is on one line, and the join is exact. |
| CR-03 | Thấp | **closed** | `:71`: `không có ai` is on one line. The shortest line is 13. |
| CR-04 | Trung | **closed (one declared exception)** | `:19-21`, `:63-75`, `:78`. There are exactly 3 strong spans in captions (s3/s7/s10) plus one on END. There are 9 light spans, with at most 1 per key. `trước màn hình điện thoại` and `không…` are unstyled. The exception: strong H2 and H3 each cover their whole line apart from punctuation. That follows directly from the CR-01/CR-02 breaks this reviewer prescribed. It is declared at `:78`, and with only 3 strong spans it still separates the beats. Raising a ticket for it would move the bar, so I accept it. |
| CR-05 | Trung | **closed** | `s7` is caption-layer-only (`:72`, `:82`). `tắt` appears only in the retirement note. |
| CR-06 | Trung | **closed** | `:64` `Ly của bạn vẫn trống` matches `script.md` "untouched-empty glass" (`:248`, `:257`). It differs from the caption, and the clear event is unchanged. |
| CR-07 | Trung | **closed** | `:71` `Bạn không nghe máy` (4 w) attributes the refusal to her. It appears on the ring-stop frame, not on the incoming-call frame. The appear and clear events are declared, and the join must place the ring-stop ≥ 1.0 s before the boundary. The string duplicates neither the caption nor the UI. |
| CR-08 | Thấp | **closed** | `s3` is caption-layer-only, and the reason is recorded (`:81`). |
| CR-09 | Thấp | **closed** | `s9` is caption-layer-only. The reason and a reopen condition are recorded (`:83`). |
| CR-10 | Trung | **closed** | `:200` records the director's decision on `Người thân` with who decided it. `Tên đã lưu` appears only as retired (`:200`, `:229`). Open question 1 is closed. |
| CR-11 | Trung | **closed** | `:47-55` has 3 tag rows (s4 1140–1180, s6/s10 990–1030). Each is ≥ 32 px, visible for the element's whole lifetime, and inside 300–1710. |
| CR-12 | Trung | **closed** | `:223` makes no claim about which clips exist, and no "do not exist" sentence remains (grep). Using no count instead of a list of keys is the director's recorded decision (`:6`), and the wording is not false on disk. |
| CR-13 | Thấp | **closed** | `:91`: there is no terminal full stop, so L1 + " " + L2 equals the `brief.md` title. |
| CR-15 | Thấp | **closed** | `:29`, `:36-37`: 1710 is the outer bound including descenders and shadow, and the text box ends at ≤ 1690. The rendered pixels are for gate D to confirm. |

### Rubric

| item | score | evidence |
|---|---:|---|
| Fidelity | **9.5** | 13/13 exact. The owner's lines are verbatim and the END title is verbatim. |
| Sound-off clarity | **9.0** | Cover question, `Chưa gửi` re-hook at about 19 s, `Bạn không nghe máy` after the ring-stop, and `Người thân` reads as a person. The `s6`→`s10` payoff works without audio. |
| Readability | **9.0** | No accent or phrase is split across lines, the maximum is 28, and the minimum is 12. |
| Value of on-screen text | **9.0** | The 4 headlines each add something the line does not say. Every row where a headline would only label the frame is now caption-layer-only. |
| Emphasis | **9.0** | Three strong spans map to H1/H2/H3, the light spans are capped, and the CTA is absent and separate from the climax. |
| Credibility | **9.0** | The claims table is empty with evidence. `minh hoạ` is fully specified on all 3 recreated UIs. The timing language is honest. |
| User constraints | **9.5** | Every `brief.md` constraint is met. Owner notes N1/N2 are `done` with no new note. |

**Mean = (9.5 + 9.0 + 9.0 + 9.0 + 9.0 + 9.0 + 9.5) / 7 = 9.14 → 9.1.** No item is below 8, and no Cao or Trung ticket is open.

### Root cause of the round-1 tickets

The round-0 pack set line breaks and styled spans one key at a time, from the audio gaps. It had no rule saying that a styled span or phrase is never split, and no styling hierarchy above the `F-11` voice list. §1 now states both rules, which is why no ticket repeats.

### Notes for gate E / the join (not tickets)

- `design-spec.md` must take the round-1 strings from §3 (`s2a`, `s3`, `s6`, `s7`, `s9` changed), as stated at `content-pack.md:164`.
- The `s6` ring-stop must come ≥ 1.0 s before the `s6`→`s7` boundary. The `s4` bubble and caption must never overlap.
- The `pipeline.py audit` result is still missing because the director has not run it.

### Summary

Score 9.1, pass. 0 Cao · 0 Trung · 0 Thấp open, and no NEW tickets. All 14 round-1 tickets are closed by their acceptance checks. CR-04 is closed with one declared exception that follows from the reviewer's own CR-01/CR-02 fix.
