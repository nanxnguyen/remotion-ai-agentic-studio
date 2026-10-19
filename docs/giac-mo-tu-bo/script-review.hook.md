# Script review — lens B (hook · specificity/emotional impact · structure) — `giac-mo-tu-bo`

Reviewer role: `script-reviewer`, gate A, **clean context** — I did not write this script, brief, hook candidates or
voice files. Lens: rubric items **2 (hook ≤ 3 s)**, **8 (specificity / emotional impact)** and **structure** only.
I do **not** score fidelity, claims/sources, spoken naturalness, raw syllable timing or the voice-performance
contract; other lenses own those.

**Runtime note (rule 01).** This runtime has **no shell**, so I could not run any command. Per the dispatch, the
director already ran `python3 -I scripts/pipeline.py audit giac-mo-tu-bo` → **`ok` (exit 0)**; I quote that result and
did not re-run it. I did not run `pipeline.py` (not my role). `docs/giac-mo-tu-bo/` was listed: **no
`script-review.md` and no `script-review.hook.md` existed before this file**, so this is round 1 and there are no
previous-round tickets to verify. Every number below is recomputed from `script.md` §1/§1.1 or the cited file:line.

---

## Round 1 · lens B (hook/specificity/structure)

### Step 1 — read as the viewer first (spoken lines only, at the planned durations)

Spoken spine at the planning rate 3.9 syl/s (`script.md` §1, `script.md:37-54`): 0.00 promise→job · 3.07 the list ·
6.40 the thin page · 9.21 the office · 11.51 the habit · 13.76 `'Để khi nào rảnh.'` · 15.03 the finger that stops ·
18.35 the notebook found · 23.36 dust · 26.17 intact ink · 28.42 the pity · 31.58 the busier stranger · 34.85 the
permission · 38.83 `Nhưng…` · 41.69 one chord · 44.39 the buzzing chord · 47.29 the debt refused · 53.27 silence.

- **What I felt / understood (two lines).** *This is my own list* — the video never claims it for a character; it
  puts the list in my hands at 6 s and makes me look at it again at 28 s with a finger that slows because the
  handwriting starts to hurry, and at 31.6 s it stops accusing me. The last 5 s stop trying to fix me: one buzzing
  chord is allowed to be enough, and the voice refuses the word *debt* out loud at 47.3 s and then stops.
- **The exact second attention could drop: ~11.3 s** (window **9.2–13.8 s**). `s4` (9.21–11.26) is by design the
  "least emotional read in the video" (`script.md:224`), `s5a` (11.51–13.76) is a habit sentence whose colon is left
  hanging, and the next structural reward is not until `s5b` (13.76) and the re-hook (18.35). 9.2 s is the first
  moment after the paper macro where the video asks the viewer to hold a *routine* with no object of their own on
  screen. Second-likeliest drop: 23.4–26.2 s (`s8`, `s9` are observations about dust and ink, and the *list* — the
  viewer's object — is not the subject of either line).

### Score table (my lens only)

| # | item | score | evidence (file:line / shot) |
|---|---|---:|---|
| 2 | **Hook ≤ 3 s** (separate 0–1 s and 1–3 s review below) | **9 / 10** | `script.md:221` (s1) · `script.md:133-163` (§2.2) · `hook-options.md:23-94` · first payoff `script.md:90,222` (`s2`, 6.15 s) |
| 8 | **Specificity / emotional impact** (separate sub-score, must be ≥ 9) | **9 / 10** | `script.md:371-402` (§6.3, spot-verified row-by-row against §3) · `script.md:343-355` (§6.1) · `script.md:357-369` (§6.2) · `script.md:416-423` (§6.5) |
| — | **Structure** (situation → turn → ending, re-hook, contrast, highlight count, silence, climax≠CTA) | **9 / 10** | `script.md:8` (re-hook `s7` = 18.35 s) · §6.1–§6.5 · `script.md:409` + `:232-233` (object arcs close) |
| | **lens B mean** | **9.0 / 10** | verdict **revise** — not on score, but because B1 (**Cao**) and B2 (**Trung**) are open |

**Why not higher.** Two mechanisms that carry the whole emotional argument exist only in the render (the cover's
collision legibility; the same eleven ink paths at `s2` vs `s10`) — see **B7** and "what I could not verify". And the
single most load-bearing specific detail, the badge-on-the-list, is currently given **three different timestamps**
(**B1**). Both are honest reasons to sit at 9 rather than 9.5.

**Why not lower.** The 2026-10-14 flat-script failure mode (`.agents/skills/ray-pineline-worflow-agent/SKILL.md:533`)
is avoided on every one of its five named causes: (1) the owner's summary is dramatised into objects and micro-actions,
not kept as wording; (2) sensory evidence is present in all 18 beats, verified below; (3) the telling is two-directional
— three named contrast pairs, with the turn built on the *same* page seen twice; (4) the climax (`s15`) and the close
(`s16`) are separate shots and there is **no CTA at all** (`script.md:416-423`); (5) there is an explicit emphasis
system (three named highlights, accent words per shot, three deliberately quieter lines).

---

### Step 2 — hook review (0–1 s judged separately from 1–3 s)

**0–1 s — image:** the canonical frame 0 (`script.md:137-148`) is an open sewn notebook on the floorboards of a slate
workroom, eleven short lines of blue-ballpoint handwriting legible as handwriting and not as words, **one line crossed
out** and **the last line stopping mid-word**, a grey-brown dust film broken by **one fresh finger-wide streak**, and
**a work lanyard with a security badge lying diagonally across the lower third of the page, strap still coiled as
though just pulled off a head, badge photo area an empty grey rectangle**; cold grey window light stopping short of the
page; dust motes drifting; slow push-in 1.00→1.03.
**On-screen text:** `Bạn từng nói sẽ học đàn.` — 6 words, upper third, complete at frame 0, the only text during `s1`
(`script.md:159-163`).

Verdict on the first second: the 0–1 s contract asks for "an observable subject, problem, consequence, or surprising
result" (`hook-engineering.md:7`). The frame delivers **subject + problem**: a handwritten list with a work badge lying
**on top of** it is a problem statement that needs no reading. It is not a logo, title fade or greeting. Stopping power,
however, lives mostly in the **text and the spoken line**, not in the motion — the packet says so itself: "the strongest
motion at phone size is the drift of the dust motes" (`script.md:151-152`). See **B3** (Thấp).

**1–3 s — speech:** `Bạn từng nói mình sẽ học đàn. Rồi bạn đi làm.`, two clauses, 4 syllables in the second; the cut
lands on `Rồi bạn đi làm.` and the badge ends up over the writing (`script.md:221`). The gap the viewer holds is one
sentence and it is about *them*: "you promised, then ordinary work swallowed it — which of the two is still lying on
the floor?" (`hook-options.md:70-73`). Truthful: both clauses are the owner's own lines 1 and 3 (`request.md:9,11`),
with `Ngày trước,` dropped and `mình` dropped only in the headline, both recorded (`script.md:221`, `hook-options.md:93`).
No statistic, no withheld answer, no shock claim, no promise to fix the viewer.

**The 0.07 s overrun — my ruling: acceptable.** The hook's last syllable lands at 2.50 / 2.62 / **2.82** / 2.97 / 3.06 s
at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s, and at the no-trim band edge 3.586 s it lands at **3.07 s** (`script.md:88`,
`script.md:98-101`). Reasons it does not cost the hook:
1. **The sound-off promise is rate-independent.** The headline is complete at frame 0 (`script.md:159`), so the hook is
   delivered inside the first second at *any* rate; the overrun only affects when the *second clause finishes speaking*.
2. **At the planning rate there is 0.18 s of margin**, and the second clause *begins* at 1.79 s (3.9) / 2.06 s (3.4) —
   the cut that hurts is well inside 3 s in every reading.
3. The packet states the edge instead of rounding it away (`script.md:97-104`) — exactly the behaviour rule
   `01-status-truth.md` wants.
Qualification (filed as **B8**, Thấp): "inside 3 s for every measured rate ≥ 3.667" is true, but 3.667 is a **modelled**
band, and the packet's own §9 evidence (`script.md:493-494`) cites the same reference file measuring as low as **3.17
syl/s** (`docs/chung-minh-de-lam-gi/voice-report.md`), below the 3.586 no-trim edge. At 3.4 syl/s the hook completes at
3.24 s. The floor should be named as evidence rather than left as a hypothetical band edge.

**First concrete payoff by ~8 s — yes: `s2`, the last word at 6.15 s** (5.48 / 5.73 / **6.15** / 6.47 / 6.64 s across
the band; `script.md:90`, `script.md:222`). It is concrete and it is *proof*: the fingertips lift the page's lower
corner and let it fall, so the viewer sees the list is three-quarters of a page, the reverse side's ink showing through
as reversed ghosts, one line starting like a title and stopping mid-word. The promise is paid on screen before second 8
at every rate.

**Does the ending resolve the promised tension? Yes, and on the same objects.** The hook's question is "which of the two
is still lying on the floor?" — and the answer *is* the image of the close: the notebook lies **open** on the boards, the
phone is **face-down** beside it, and the dust smear still holds the shape of the box that stood there; the badge that
won is demoted to "the only thing in the lower third, small, and nobody looks at it" at `s12` (`script.md:233`, `:237`).
The promised tension is not merely answered in words at `s16` (`Không phải để bù lại… Chỉ để được vui`) but staged:
the object that lost is the object left open in the light.

**Chosen candidate vs a rejected candidate — `H1` vs `H3` (the found object), the named competing candidate.**
`H3` (`hook-options.md:124-152`, research §5 #2) is genuinely stronger on two hook-engineering axes: frame-0 object
visibility and *physical action* (dust lifting off a cover, paper opening) — `hook-options.md:139-141` concedes this.
I tested the argument `hook-options.md:202-206` asks the reviewer to test, and **I agree `H1` wins**, on structure and
not on timing (they are equal at 11 syllables):
1. `H3` **spends the video's only turn** at 0–1 s. The video's shape is promise → years → the object found again, and
   the finding is exactly the 15–20 s re-hook slot. `H3` and `s7` would be the same beat, so one of them would have to
   be given up — and the packet actually *keeps* `H3`'s image where it earns most, as `s7` (`script.md:228`).
2. `H3`'s frame 0 **drops the cause**. Without `Rồi bạn đi làm.` there is no counterweight, and `s4`/`s6` would arrive
   as inserted backstory instead of as the cut that hurts.
3. `H3`'s headline `Cuốn sổ ngày xưa.` names a thing and opens no question (`hook-options.md:149`), whereas `H1`'s
   `Bạn từng nói sẽ học đàn.` is a sentence the viewer can check against themselves in one second.
`H4` (abstract claim) is a clearer rejection and worth recording: it has no observable subject at frame 0 at all
(`hook-options.md:157`) and nothing can be proved by second 8 — it fails the 0–1 s contract outright, which is why its
beauty survives only as the END card. `H5` fails **on accuracy, not craft** (`hook-options.md:179-184`) — rightly rejected
outright. `H2` fails on arithmetic and is correctly demoted to `s5b`, where it does more work than it could at second 1.

---

### Step 3 — line-by-line show / tell map (all 17 spoken keys + the silent card)

`show` = concrete, see-or-hear detail; `tell` = summary/abstract/named emotion with nothing sensory in the line itself.

| key | t (3.9) | line | verdict | note |
|---|---|---|---|---|
| s1 | 0.00–2.82 | Bạn từng nói mình sẽ học đàn. Rồi bạn đi làm. | **show** | object named (đàn) + an event (đi làm); carried physically by the finger on the list and the badge |
| s2 | 3.07–6.15 | Bạn đã lưu cả một danh sách những bài hát muốn chơi. | **show** | object-anchored: the page is lifted in the same frame |
| s3 | 6.40–8.96 | Trang sổ mỏng, chữ bút bi xanh, viết dở. | **show** | thin paper, blue ballpoint, half-written — pure sensory |
| s4 | 9.21–11.26 | Sáng nào cũng quẹt thẻ, hộp thư đầy. | **show** | badge tap, overflowing inbox |
| s5a | 11.51–13.76 | Mỗi lần định mua đàn, bạn lại nghĩ: | **show** | a repeated concrete moment + the browser screen |
| s5b | 13.76–14.78 | 'Để khi nào rảnh.' | **show** | the most concrete line in the video: a quoted sentence |
| s6 | 15.03–18.10 | Ngón tay khựng trên nút Mua ngay, rồi tắt màn hình. | **show** | a finger that stops, a screen that goes dark |
| s7 | 18.35–22.96 | Vài năm sau, trong một buổi dọn nhà, bạn tìm thấy cuốn sổ có danh sách ấy. | **show** | an event with an object (`buổi dọn nhà` is a time summary inside a concrete finding) |
| s8 | 23.36–25.87 | Bụi phủ kín bìa, một vệt tay kéo qua. | **show** | dust film, a finger stroke |
| s9 | 26.17–27.97 | Chữ viết ngày xưa vẫn còn nguyên. | **show** | a state of a visible object, provable in frame (intact ink, fold-line unbroken) |
| s10 | 28.42–31.23 | Bạn ngồi đọc, thấy thương người đã viết ra nó. | **show + named emotion** | `ngồi đọc` is physical; the feeling is **named**, not shown — its showing is delegated to the finger stopping where the writing hurries (`script.md:231`) |
| s11 | 31.58–34.40 | Người ấy đâu biết sau này mình sẽ bận đến thế. | **tell** | the only fully abstract line in the video — no object, no sense data |
| s12 | 34.85–38.38 | Có thể hôm nay bạn không còn muốn trở thành nhạc công nữa. | **tell** | a statement about a want; paired with a strong show (standing, leaving, the badge alone in the lower third) |
| s13 | 38.83–41.39 | Nhưng nếu vẫn thích âm thanh của cây đàn… | **show (heard)** | names a sound, and the shot has one: a single low note struck off-camera and left to ring (`script.md:234`) |
| s14 | 41.69–43.69 | Bạn có thể học một hợp âm. | **show** | six strings, one fret, a fingertip under 10 cm |
| s15 | 44.39–46.94 | Một hợp âm rè nhẹ, ngón ấn chưa quen. | **show** | a buzzing string, a 2 mm slip, a dent in the pad |
| s16 | 47.29–52.72 | Không phải để bù lại những năm đã qua. Chỉ để được vui với một điều mình từng yêu thích. | **show** | `được vui`, `từng yêu thích` are anchored to the flat hand, the open page and the light |
| END | 53.27–56.07 | *(silent)* | **show** | motes drifting in the warm bar, the frame unchanged |

**Count:** 15 `show` · 1 `show + named emotion` (s10) · 2 `tell` (s11, s12). **Longest run of `tell`: 2 (s11→s12) — at
the ceiling, no fix triggered.** The run is bracketed by sensory lines on both sides (s9 intact ink; s13 a ringing
note). I recorded the stricter reading in **B6**: if `s10`'s named feeling is counted as `tell`, the run is 3 and the
rule would demand a fix — I do not count it, because `Bạn ngồi đọc,` is physical and its shot is the video's most
concrete (a finger slowing exactly where the handwriting hurries, then stopping mid-line, `script.md:231`). The
*underlying* risk is real and is filed as an acceptance check, not as a line rewrite: the emotional value of the
s11/s12 run is carried entirely by the images, so those images must read at phone size.

---

### Step 4 — specificity / emotional impact audit

**Sensory detail per beat: 18/18, spot-verified against §3, not taken on trust.** I checked every claim in
`script.md:371-402` against the corresponding shot row: `s1` forefinger to the full stop, lanyard over the writing
(`:221`) · `s2` page corner lifted and let fall, reversed ghosts, half-word (`:222`) · `s3` fibre dent, lighter line
from a used-up pen (`:223`) · `s4` fluorescent bar, badge reader, tray above its rim, unread rows past the screen edge
(`:224`) · `s5a` one scroll, thumb lifted and staying off (`:225`) · `s5b` guitar gone grey, bar mirrored in a dormant
screen (`:226`) · `s6` 6–8 px short of the button, fingerprint in the glow, button unchanged, locked grey (`:227`) ·
`s7` flap tape curling, **clean square in the dust where the box stood**, notebook up with its dust shape, warm light
landing on page and wrist (`:228`) · `s8` stroke pushed into a raised edge, cover darker under the stroke (`:229`) ·
`s9` fold-line crossing without breaking a stroke, one mote landing and not brushed away (`:230`) · `s10` finger slowing
where the writing hurries, stopping mid-line (`:231`) · `s11` hand flat on the closed cover, unmoving for a whole line
(`:232`) · `s12` walking out, empty page in the warm bar, badge alone in the lower third (`:233`) · `s13` page edge
riffling, one low note left to ring (`:234`) · `s14` pressure released by mistake and pressed again (`:235`) · `s15` the
string buzzing against the fret, 2 mm slip, **string-shaped dent** (`:236`) · `s16` phone face-down, dust holding the
box's shape, fingers curling once (`:237`) · `END` motes drifting (`:238`). No beat is detail-free.

**Contrast pair at the turn: `CP1`, and it is a real symmetric pair, not a one-directional telling** (`script.md:347`,
`:351-352`). `s2`+`s3` (the list written in hope) → `s10`+`s11` (the same list read with pity): same notebook, same
page, same ink, same handwriting, framed once as a young person's plan and once under a finger that slows where the
letters lean forward. Two further pairs: `CP2` `s5b` → `s6` (the deferred sentence ↔ the intention meeting a live
button, polarity fixed: the button is live and the finger never lands; `script.md:353`) and `CP3` `s12` → `s14`+`s15`+
`s16` (becoming a musician ↔ being happy with one chord, resolved *without* an achievement — the chord buzzes and is
badly fretted, `script.md:354-355`). This is the "structural contrast" the 2026-10-14 lesson asks for, built from the
video's own props rather than from an argument.

**Highlight beats: exactly 3, each with paired delivery + visual + light** (`script.md:359-363`):

| # | beat | delivery | visual | light | own check |
|---|---|---|---|---|---|
| `H1` | `s7` the finding | plainest possible read, almost offhand → slower/lower, `danh sách ấy` as one unit, stops | box flap, clean square in the dust, notebook up with its dust shape | **`L2`: the one arrival — first warm light, on the open page and the wrist** | passes — it is both the re-hook and the arrival, and it is the packet's only "two labels on one beat", which is legitimate |
| `H2` | `s10`–`s11` the pity | thinning, not swelling; then the quietest line, an observation about a stranger, volume dropping and stopping | finger slows where the writing hurries → hand flat on the closed cover, unmoving for a whole line | `L3`: the same warm rectangle, wider (forearm, knee, page edge) | passes on structure; the risk is delivery (see below) |
| `H3` | `s15` the chord | warm, slightly amused, unimpressed with itself, no performed laugh; `chưa quen` takes the last emphasis | 8 cm fret macro: string buzzing against the fret, 2 mm slip, string-shaped dent in the pad | `L4`: warmest and steadiest, plus one warm bounce off the near strings | passes — and it is the best structural decision in the packet: an **imperfect** payoff is what makes `s16`'s "for joy" true instead of rhetorical (`script.md:435`) |

Three, not more; the other light-bearing shots are explicitly marked not-highlight (`script.md:365-369`), and there is
exactly **one arrival** in the video (`L2`), which prevents light inflation.

**Silence / hold after the closing line: real.** Last word 52.72 s → `s16`'s 0.55 s hold → **2.80 s silent END card** →
**3.35 s of real silence** after the last word, with the image continuing (`script.md:310-316`, `:422`). Nothing is
re-written to fill it, and BGM cuts at the last word (`voice-direction.md:136-141`).

**Climax ≠ CTA: satisfied by deliberate absence.** Climax `s15`, close `s16`, silent card `END`, and **no CTA anywhere**
— no follow, no comment, no handle, no "hãy thử" (`script.md:416-423`). For this topic that absence is the right call,
not an omission.

**Would a viewer be MOVED, or only informed?** Moved — conditionally, and my score of 9 (not higher) is exactly where
that conditionality sits. The mechanism is: an object the viewer may already own (`s2`) → the same object made to pity
its author (`s10`–`s11`) → the career taken off the viewer as a permission (`s12`) → an offer too small to be
intimidating (`s14`) → a payoff allowed to fail slightly (`s15`) → the debt refused out loud and then silence (`s16`).
Emotion is delegated to micro-actions rather than named: 6–8 px short of `Mua ngay`; a hand flat for a whole line; 2 mm
of slippage; a dent in a fingertip. The reservations that keep it at 9:
1. **The whole mechanism presupposes the viewer has an abandoned thing**, and the video deliberately gives the
   character no biography at all (`U1`/`U4`; no face by camera law, `script.md:171-175`). The only specific anchors are
   props. If the props do not carry it, nothing else will — and two of the props' key readings are render-only (**B7**).
2. **`H2` depends on the video's quietest, flattest deliveries** (`s11` is the only fully abstract line; `s10` names
   its feeling). Their landing is a voice-stage outcome I cannot hear, and if the clone delivers them flat, the video's
   emotional floor is flat. This is a *delivery* dependency on a *specificity* claim, and it must be checked at the
   audio gate and again at E — recorded below as unverifiable.

---

### Step 5 — structure

- **Situation → turn → ending:** located and unambiguous. Situation `s1`–`s6` (promise, list, office routine, the
  deferral, the finger that stops) · turn `s7` (the finding, the one arrival) and `CP1` at `s10`–`s11` (the pity), with
  the rhetorical hinge `Nhưng` at `s13` · ending `s12` permission → `s14` offer → `s15` payoff → `s16` meaning →
  `END` silent card.
- **Re-hook at ~15–20 s: present and named — `s7`, clip start 18.35 s** at 3.9 (16.52–19.70 s across the modelled band;
  16.17–19.77 s across the no-trim band). Named consistently in `script.md:8`, `brief.md:158`, `hook-options.md:215`.
  It is a genuine re-hook, not a restatement of the opening claim: the opening says *you promised, then you worked*; the
  re-hook supplies new information (the object was never lost) and the video's only change of light.
- **The 8–20 s stretch** does progress by concrete example and story turn (`s3` the paper itself, `s4` the cause staged
  as routine, `s5b` the deferral said small, `s6` the deferral costing something visible) — `hook-engineering.md:10`
  satisfied. The cost is that its spoken register is deliberately flat (`voice-direction.md:89`), which is why 9.2–13.8 s
  is my named drop window.
- **Object chain closes:** the lanyard/badge runs frame 0 → `s1` → `s4` → `s6` → `s12` (`script.md:409`) and ends
  *demoted*, not triumphant; the notebook runs frame 0 → `s1` → `s2` → `s3` → `s7` → `s8` → `s10` → `s11` → `s12` →
  `s13` → `s16`. Nothing that acts in the second half was not introduced in the first.
- **Climax ≠ CTA, silent hold, determinism:** see step 4. One structural question I flag rather than ticket as a
  defect: the END card restates the *loss* (`Có những giấc mơ bạn đã âm thầm từ bỏ`) two seconds after the voice has
  refused it — filed as **B6** with an acceptance check, because the card is the owner's own topic line and the image
  beneath it keeps the resolution.

---

### Tickets

Severity: **Cao** = blocks the gate · **Trung** = must be closed before build · **Thấp** = improvement, does not block.
Owner is `script-agent` unless stated; every ticket names an acceptance check. **No open Cao or Trung ticket may remain
for a pass.**

| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| **B1** | **Cao** | `script.md:151`, `:154` (§2.2 frame 0) **vs** `script.md:221` (§3 s1 image cell) **vs** `script.md:295` (§5 silence budget) **vs** `voice-performance.proposed.json:122`; also `script.md:409` (§6.4), `:432` (§7) | One physical event — the badge coming to cover the list — is given **three incompatible timestamps**: (a) *already done at frame 0* — "the badge **has landed on top of** the list" (`:151`), "with the badge **on top**" (`:154`), and this is the stated sound-off thesis ("the badge is on top of the list", `hook-options.md:45-46`); (b) *inside `s1` at ~1.79 s* — "the coiled lanyard **drops** across the page and the badge **covers the list**, so the writing goes under the badge" (`:221`, in a cell that opens "**Exactly §2.2**"), repeated as "drops on the page at `s1`" (`:409`); (c) *during the 0.25 s hold after `s1`'s clip* (2.82–3.07 s) — "the badge **lands on the list**" (`:295`), mirrored in the machine-readable sidecar (`voice-performance.proposed.json:122`). §7 (`:432`) muddles (a) and (b) in one phrase. Two of the three readings make the cover's own thesis false at frame 0, and §5 assigns this landing as the *named beat* of the s1→s2 hold. | Pick **one** instant and make all five statements agree. **Recommended (A):** keep the canonical cover — the badge already lies on the list at frame 0 (it is what makes the hook readable with sound off, and it is what `hook-options.md:45-46` claims) — then replace `script.md:221`'s second movement with something the cover does not already show, e.g. *"then, on `Rồi bạn đi làm.`, the lanyard's strap **settles flat** against the boards and the page's lower corner **lifts a millimetre** — the badge is already on the list and does not move"*, and re-purpose the hold at `:295` to a new named visual ("the page settling; one mote crossing the cold bar"). **Alternative (B):** if the drop at 1.79 s is chosen instead, then `script.md:144-148`, `brief.md:170-174`, `hook-options.md:35-39` **and** `hook-options.md:45-46` all have to be rewritten, and the hook's sound-off case then rests on the headline alone. | `script-agent` | All statements of the badge's contact with the list, in every file, name the same single instant; §2.2's canonical paragraph, §3-`s1`, §5's `s1` hold, §6.4, §7 and `voice-performance.proposed.json`'s `postClipHoldPolicy` agree; gate D's cover render matches the paragraph it is checked against. |
| **B2** | **Trung** | `script.md:162` (§2.2), `:221` (§3 s1 text cell), `:251` (§4 table); `brief.md:177`; `hook-options.md:56-57` | The headline clear is stated as the *event* "the `s1`→`s2` boundary at **3.07 s**", and `script.md:162` instructs `content-agent` and `design-spec.md` to treat that clear as a **frame-accurate event**. But 3.07 s is only the 3.9 syl/s value: the boundary is `11 ÷ rate + 0.25` = **2.75 / 2.87 / 3.07 / 3.22 / 3.31 s** at 4.4 / 4.2 / 3.9 / 3.7 / 3.6. §1.1's structural-marks table (`script.md:86-95`) recomputes every other mark per rate and **omits this one**. If a builder keys the clear to the literal 3.07 s, then at any measured rate faster than 3.9 the headline stays on screen for up to **0.32 s after the first caption appears** — the exact "headline + caption saying the same thing" defect the packet itself calls *"a print defect, not emphasis"* (`script.md:160-161`). | Replace the fixed number with the measured boundary: *"clears on the measured `s1`→`s2` boundary (`11 ÷ rate + 0.25` = 2.75 / 2.87 / 3.07 / 3.22 / 3.31 s at 4.4 / 4.2 / 3.9 / 3.7 / 3.6), keyed to the measured clip ends, never to a hard-coded 3.07 s"*; add that row to §1.1's table; propagate to `brief.md:177`, `hook-options.md:56-57` and §4's `s1` row. | `script-agent` (→ `content-agent`, `design-spec.md`) | No file states a fixed 3.07 s clear; §1.1 carries the boundary at five rates; the content pack and design spec derive the frame from measured clip ends; no measured rate can show the headline and the first caption on screen in the same frame. |
| **B3** | Thấp | `script.md:151-152` (§2.2), `script.md:221` (§3 `s1`) | The packet states its own weakness: *"The strongest motion at phone size is the drift of the dust motes through the cold light"* (`:151-152`). The only other first-second motion is the 1.00→1.03 push-in, and §3's `s1` cell never says **when** the forefinger enters — only that it traces the first line. The 0–1 s contract is met by subject+problem, so this does not block; but in the first second nothing is *acting* except dust, and the hook's stop-power therefore rests on the text. | State in §3-`s1` and §2.2 that the forefinger's **entry begins inside the first ~0.5 s** (so frames 0–15 contain a hand movement), and give gate D's hook-motion strip that as an explicit acceptance check. | `script-agent` (text) → `design-agent` (strip) | Frames 0–15 contain a moving element other than the motes and the push-in, named in the hook-motion strip evidence. |
| **B4** | Thấp | `script.md:244-247` (§4 preface) | The preface says "Each chunk … words reproduced **word-for-word** from `voice.proposed.json`", but two of the three elements that *replace* a caption are **not** verbatim: `s1`'s headline drops `mình` (`Bạn từng nói sẽ học đàn.` vs `Bạn từng nói mình sẽ học đàn.`) and `s15`'s headline is truncated to the first clause. `content-agent` "locks the final set" from this file, so the rule it reads contradicts the table it sees. | Reword the preface: *"every **caption** chunk is word-for-word from `voice.proposed.json`; the three **headline** elements (`s1`, `s5b`, `s15`) replace that key's caption, and `s1` and `s15` are the only places where the on-screen string differs from the canonical string — recorded here, and nowhere else."* | `script-agent` | §4 states which elements are verbatim and which are headlines, and names exactly two permitted departures. |
| **B5** | Thấp | `script.md:266` (§4 `s15`) + `script.md:236` (§3 `s15`) | `s15` is `H3` — the video's sound payoff — and its headline `Một hợp âm rè nhẹ.` covers only the first clause. `ngón ấn chưa quen.`, to which §6.2 gives *"the last emphasis of the whole video"*, exists in the audio and in **no on-screen text** (the headline replaces the caption, `script.md:270`). A muted viewer gets the buzz without the verdict, and the packet's own sound-off argument is not extended past the hook. | Keep the headline; add `ngón ấn chưa quen.` as a second caption chunk that appears after the headline clears (4 words, inside the ≤6-word cap; it is a different clause, so it does not print the same sentence twice). | `script-agent` → `content-agent` | Every key with a voice line has a mute-complete text path, or appears in a short declared exception list; that exception list is exactly the three headline keys. |
| **B6** | Thấp | `script.md:238`, `:450-453` (§8 END card); `script.md:237` (`s16`) | The last spoken sentence refuses the loss out loud (`Không phải để bù lại… Chỉ để được vui`), and two seconds later the silent card re-states the loss. The card is the owner's own topic line and must stay, and the image under it keeps the resolution (open notebook, flat hand, warm bar, motes) — so I read it as the video's **title**, not a reversal. It is nonetheless the one place where the ending could re-open the wound it has just closed, and no file asks anyone to check that. | Keep the card; add an acceptance row to §10: *"the END card reads as the video's title over a resolved image, not as a reversal — the card changes **text only**, the warm light and the flat hand are unchanged, and gate E confirms no grief is re-introduced; if E disagrees, the fix is content/design (type weight, dwell), never cutting the owner's topic line."* | `script-agent` | The acceptance row exists, and gate E records its result in `integration-review.md`. |
| **B7** | Thấp | `script.md:347` (`CP1`), `script.md:179` (eleven fixed ink paths), `script.md:133-136` (cover), `hook-options.md:45-46` | The entire specificity argument rests on two readings that exist **only in the render**: (a) the cover's collision — a badge lying **on top of** a handwritten list — must read at thumbnail/phone size; (b) the `s2` page (6.15 s) and the `s10` page (28.42 s) must read as the **same page**, 22 s apart, or `CP1` degrades into "an old notebook" twice. Gate D is obliged to prove only (a) (`script.md:135-136`); nothing obliges anyone to prove (b). | Add to §10: *"gate D proves the cover collision at phone size; gate E (or the design/scene stills) proves the `s10` page is recognizably the `s2` page — same ink paths, same crossing-out, same half-word — with the two frames recorded side by side."* | `script-agent` (rows) → `design-agent` / `integration-reviewer` (execution) | Both acceptance rows exist and carry recorded **frames**, not assertions; if (b) fails at E, the fix is at `design-spec`/scene level (the ink-path identity required by `script.md:179`), not a text change. |
| **B8** | Thấp | `script.md:88`, `:98-101` (§1.1), `:493-494` (§9) | "The hook's last syllable is inside 3 s for **every measured rate ≥ 3.667 syl/s**" is true, but 3.667 is a **modelled** threshold, while the packet's own §9 evidence cites the *same reference file* measuring as low as **3.17 syl/s** (`docs/chung-minh-de-lam-gi/voice-report.md`) — below the 3.586 no-trim edge, and far below 3.667. At 3.4 syl/s the hook completes at 3.24 s. The claim is therefore bounded by a hypothetical band edge, not by the cited evidence, and the packet's own declared floor (3.455) is *above* an observed value. | Add one sentence to §1.1 naming the observed floor from the cited report (3.17 in `chung-minh-de-lam-gi`; 3.58–4.01 in `thuong-hay-so-bat-dau-lai`) and stating that the **≤3 s spoken** claim is conditional on the measured rate while the **frame-0 headline is the rate-independent guarantee**; keep the escalation path (report to the director, never cut `Rồi bạn đi làm.`). | `script-agent` | §1.1 names the cited per-clip floor, distinguishes a measurement from the modelled band, and states which part of the hook is rate-independent. |

**Scoring consequence of the tickets:** B1 (Cao) and B2 (Trung) are open, so **no pass** — despite item 2 and item 8 each
scoring 9. Neither ticket changes the *scores*: under either resolution of B1 the hook keeps a truthful first payoff and
a sound-off headline; the contrast pair, the 18/18 sensory beats, the three highlights, the real closing silence and the
climax≠CTA absence all survive either reading.

### Previous-round fixes verified

**N/A — round 1.** No `script-review.md` or `script-review.hook.md` existed in `docs/giac-mo-tu-bo/` before this file
(directory listing), so there are no earlier tickets and I am not re-litigating anything.

### What I could NOT verify (only render, audio or publication can show it)

1. **The cover at phone size** — whether the badge-on-top-of-the-list collision, the fresh streak, the coiled strap and
   the crossed-out line read at thumbnail scale on the muted frame. Gate D owns this; it is the hook's whole sound-off
   case. (No image file exists yet; no shell in this runtime.)
2. **`CP1` recognition** — whether the `s10` page reads as the `s2` page 22 s later. Text can only require it
   (`script.md:179`); only frames can show it. B7.
3. **The `H2` delivery** — whether a cloned Thanh Long can say `s11` (the video's quietest line) as an observation about
   a stranger with the volume dropping and *stopping*, never becoming a whisper or a flat read (`voice-direction.md:110`,
   `:158`). This is a specificity claim resting on the audio branch; if it lands flat the emotional floor is flat and E
   must flag it.
4. **The measured per-clip rate** — the actual second at which the hook completes and whether it exceeds 3 s; the plan
   is 2.82 s at 3.9, and the spoken figure is only as good as the measurement that replaces §1.
5. **The first-second stop-power in the wild** — whether a stranger scrolling actually stops on an unmoving notebook.
   `hook-experiment.md` and 0–3 s retention are publication-time evidence, and no percentage may be invented from this
   packet (`hook-engineering.md:41-43`).
6. **Whether the END card re-opens the wound** — a viewer-response question; B6 routes it to gate E as an acceptance
   check rather than pretending text can settle it.

### Return

`lens B score: 9.0  verdict: revise` — hook sub-score **9/10**, specificity/emotional-impact sub-score **9/10**,
structure **9/10**; blocked by **B1 (Cao)** and **B2 (Trung)**, both open.

Top 3 fixes: **(1) B1** — decide *one* instant for the badge's contact with the list and make §2.2, §3-`s1`, §5's `s1`
hold, §6.4, §7 and `voice-performance.proposed.json` agree (three timestamps currently coexist, frame 0 / 1.79 s /
2.82 s). **(2) B2** — stop stating the headline clear as a fixed `3.07 s`; state it as the measured `s1`→`s2` boundary
(`11 ÷ rate + 0.25`) and add it to §1.1. **(3) B5** — give `s15` (`H3`) a mute-complete second clause
(`ngón ấn chưa quen.`) so the video's sound payoff carries its verdict with the sound off.

Report path: `docs/giac-mo-tu-bo/script-review.hook.md`.
