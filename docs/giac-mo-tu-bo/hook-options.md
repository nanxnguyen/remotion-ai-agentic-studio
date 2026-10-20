# Hook options — giac-mo-tu-bo

Phase 2a hook engineering, per `.agents/skills/ray-pineline-worflow-agent/references/hook-engineering.md`
(symlinked to `.claude/skills/...`). Profile `story`, 9:16 1080×1920 @30 fps, **50–60 s** (owner prose override).
Source of the five candidates: `research.md` §5. **Selected: `H1`** → it is `s1` in `script.md`, and its id is
referenced in `brief.md` §Hook and `script.md` (header + §2.2).

Every second quoted in this file is the **same planning timeline as `script.md` §1**: 175 syllables,
fixed silence 11.20 s, planning rate 3.9 syl/s, planned total **56.07 s** (50.97 / 52.87 / 56.07 / 58.50 / 59.81 s
at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s).

Anti-clickbait rule applied to every candidate below: **no statistic, no shock claim, no withheld answer, and every
question the cover raises is answered on screen before the ending** (the four hook-engineering blockers
"unsupported statistic", "misleading before/after", "withheld answer", "a hook unrelated to the final payoff" are
each tested explicitly).

The owner's account (`S1`, quoted in `brief.md`) is the **only** factual source about the character. No candidate
below may assert anything the owner did not write; the two places where a candidate drifts into an inference
(`I3`) are named and are the reason those candidates lose.

---

## H1 — Direct address, flatly stated · `Bạn từng nói mình sẽ học đàn. Rồi bạn đi làm.` (research #1) → **CHOSEN** → `s1`

**1. Literal first frame (0–1 s) and 9:16 safe-zone text.**
Canonical cover description — reproduced **word for word** from `script.md` §2.2 and `brief.md` §Hook; gate D proves
it reads at phone size on `out/qa/<vid>-cover.png` with the audio muted:

> Frame 0 **is** the cover — already composed, no fade from black, no logo, no title animation. 9:16, high oblique
> over the floor of a slate workroom: **an open sewn notebook lies on the floorboards, its left page covered in a
> list of eleven short lines of thin blue-ballpoint handwriting that is legible as handwriting and illegible as
> words** — the letters are vector ink strokes that never resolve into a readable title, **one line near the top is
> crossed out with a single hard diagonal stroke, and the last line stops in the middle of a word**. A grey-brown
> film of dust lies over the cover and the page edge, **broken by one finger-wide streak wiped clean through the dust
> from the lower-left corner of the page**. **A work lanyard with a security badge lies diagonally across the lower
> third of the page**, its strap still coiled as though just pulled off over a head — **the badge's photo area is an
> empty grey rectangle with no face in it**. The room behind is slate `#1C2229`; a cold grey window light falls in
> from frame left and lays a soft-edged parallelogram across the boards, **stopping just short of the page — no warm
> light touches this frame anywhere**. Dust motes drift through the cold light. Slow push-in 1.00→1.03.

Three contract tests on that frame:
- **An observable subject is present and something has just happened**: the dust streak is fresh, **the lanyard is
  already off a head and lying across the page with its strap still relaxing flat**, and the crossed-out line and the
  abandoned half-word are both visible. The notebook is not a held pose — it is *found*, and the badge lying across it
  dates the finding to now: the list outlived the promise.
- **The thesis is visible at thumbnail scale without any text**: **an old handwriting list and a work badge occupy
  the same frame, and the badge is on top of the list.** That is the whole video in one image, and it reads as
  value and overlap, not as a caption. **Because the badge is in the cover at frame 0, the thesis is never deferred
  to a later beat** — nothing drops, nothing lands: the plate is already there, and only the **strap** finishes
  settling.
- **The subject of the frame is the lost object, not a person**: no face, no age, no gender anywhere in the frame
  or in the video (`U1`). The viewer is the character, and the character is represented only by a hand, a torso and
  a lanyard.

**Two readings carry this frame and neither is provable in prose (`B7`).** The cover collision at phone size is
proved by **gate D** on `out/qa/<vid>-cover.png`; that the `s10` page is recognisably the `s2` page is proved by
**gate E** (or the scene stills) with frames recorded side by side. Until those frames exist, both stay claims.

Safe-zone headline (upper third, nothing in the bottom 210 px): **`Bạn từng nói sẽ học đàn.`** — 6 words, complete
at **frame 0**. It is the **only** text on screen during `s1`: the caption layer never draws in that key, and the
second sentence `Rồi bạn đi làm.` is **never printed** (carried by the badge on the list and by `s4`), so the cover
is never duplicated by a caption of the same sentence (same device as `docs/dung-bien-tuoi-30-thanh-ban-an/brief.md`:
"HEADLINE thay caption" — the headline replaces the caption for that key, so no sentence is printed twice).
It clears on the `s1`→`s2` boundary at **`11 ÷ rate + 0.25`** = **2.75 / 2.87 / 3.07 / 3.22 / 3.31 s** at
4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s — the frame where the first caption appears. That formula is the rule, keyed to the
**measured** `s1` clip end; **3.07 s is only its value at the planning rate and is never hard-coded**. The headline is
removed one frame before the caption draws, so the headline and the caption never share a frame at any rate.

**2. Spoken 0–3 s line, syllables, sound-off.**
Spoken: `Bạn từng nói mình sẽ học đàn. Rồi bạn đi làm.` = **11 space-separated syllables**. Clip `s1` runs
**0.00–2.82 s**; the hook's last syllable lands at **2.50 / 2.62 / 2.82 / 2.97 / 3.06 s** at
4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s.
**Sound-off: yes, and independently of the speech.** The headline is complete at frame 0 and the image already
carries the collision (list + badge). Nothing in the hook depends on hearing.
**Honest edge:** the two clauses are the owner's own two sentences, so the line cannot be shortened without cutting
the owner's words. The spoken hook's last syllable is inside 3 s **only for a measured rate ≥ 3.667 syl/s**; at the
slowest end of the no-trim band (3.586 syl/s) it lands at **3.07 s — 0.07 s past**, and at the lowest rate this same
voice has produced in this repo (**3.17 syl/s**, `docs/chung-minh-de-lam-gi`) it lands at **3.47 s — 0.47 s past**.
That is stated here rather than rounded away, so **the ≤ 3 s spoken claim is conditional on the measured rate**. The
sound-off promise is **not** conditional: the on-screen hook text is complete at frame 0, at every rate.

**3. Specific viewer tension held at 2.82 s — one sentence.**
**"You made a promise about an instrument and then ordinary work swallowed it — so which of the two is still
lying on the floor?"** The gap is raised by the two clauses in the first 2.82 s and by the badge on top of the
list; it is a gap the viewer answers about themselves, not a mystery the video withholds.

**4. First concrete payoff before second 8, and where the ending resolves it.**
The first payoff is **`s2`** — `Bạn đã lưu cả một danh sách những bài hát muốn chơi.` — the song list is not a
guess, it is a page with eleven lines on it, and the pinky-line of the page flicks over to show how much of it
there is. `s2`'s clip ends at **5.48 / 5.73 / 6.15 / 6.47 / 6.64 s** at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s — inside
the 3–8 s window **at every rate in the band**, and inside it also at both ends of the no-trim band
(5.35 s at 4.510, 6.66 s at 3.586).
`s2` is also **the first halo of the whole video**: the wish was written *before* the reasons, and the page proves
it in ink rather than in a claim.
Resolution: the promise is answered in the owner's own words at **`s12`–`s16`** — `Có thể hôm nay bạn không còn
muốn trở thành nhạc công nữa… Nhưng nếu vẫn thích âm thanh của cây đàn… Bạn có thể học một hợp âm.` — and the
video's last spoken words reject the debt framing out loud (`Không phải để bù lại… Chỉ để được vui`). The **END
card** carries the topic line, silent. The promise the cover makes is therefore exactly the promise the video pays:
**the list was never the problem; the badge was.**

**5. Anti-clickbait risk and explicit rejection of weaker variants.**
Risk: **the lowest of the five.** No superlative, no number, no statistic, no promise to fix the viewer, no
withheld answer. Both clauses are the owner's own sentences (`S1` lines 1 and 3), so frame 0 asserts nothing the
video cannot show, and the "Rồi bạn đi làm." half is *paid* by `s4` (the badge reader, the inbox) rather than
merely repeated. The one compression made for the headline — `mình` dropped from `Bạn từng nói mình sẽ học đàn.` —
does not change the claim.

---

## H2 — Viewer question · `'Để khi nào rảnh.' Bạn đã nói câu này bao nhiêu lần?` (research #3)

**1. First frame / 9:16 safe-zone text.** A phone held flat on an open palm, screen glowing, a shopping page for a
guitar; headline `Bạn đã nói câu này bao nhiêu lần?` (8 words — **over the 6-word cap, so it would have to be cut
to `Câu này bạn nói mấy lần?`**). Subject: a phone, not an event; nothing in the frame has just happened.

**2. Spoken 0–3 s.** 12 syllables: `'Để khi nào rảnh.'` (4) + `Bạn đã nói câu này bao nhiêu lần?` (8).
Hook complete at **2.73 / 2.86 / 3.08 / 3.24 / 3.33 s** at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s — **past 3 s at the
planning rate and at every rate below 4.0**, so it fails the contract on arithmetic, not on taste.
Sound-off: partial — the question is legible as text, but a question with no object on screen asks the viewer to
supply both the object and the stakes.

**3. Tension / promise.** Strong, and the phrase is verified twice: the owner's own line 4 (`S1`) and public usage
(`S5`/`S6`, `F11`/`F12`). It is the best *recognition* line of the five.

**4. Payoff before second 8.** Reaches the deferred guitar and the years passing, but its payoff is the same
sentence the viewer just answered privately — nothing new is proved on screen by second 8.

**5. Risk / verdict.** No clickbait. **Rejected as the opener; kept as `s5b` (`13.76–14.78 s`)**, where it is the
deferral itself, said once, in the ink blue of the notebook's page against a dimmed screen — the video's
contrast pair CP2 depends on this key existing, and it earns far more at 14 s than at second 1. The cost of
promoting it: the notebook (the video's object) would not appear until after the office, and the 15–20 s re-hook
slot would have nothing left to reveal.

---

## H3 — The found object · `Một buổi dọn nhà, bạn tìm thấy cuốn sổ ngày xưa.` (research #2)

**1. First frame / 9:16 safe-zone text.** The open notebook already in a hand, dust lifting off the cover;
headline `Cuốn sổ ngày xưa.` (4 words).

**2. Spoken 0–3 s.** 11 syllables (`Một buổi dọn nhà, bạn tìm thấy cuốn sổ ngày xưa.`), the same length as `H1`,
so the 3 s arithmetic is identical: **2.50–3.06 s** across the band.

**3. Tension / promise.** A found object with no explanation — *what is written in it, and why does it matter?*
It is a real gap, and the object itself is on screen at frame 0.

**4. Payoff before second 8.** `H3` must spend its own payoff immediately: the notebook **is** the payoff, so by
second 8 the notebook has been found, opened and read, and the song list — the video's first concrete proof — is
already behind the viewer. Its second act would have to be the office, i.e. the story told backwards.

**5. Risk / verdict.** **This is the named competing candidate for the reviewer to weigh.** It is the strongest
alternative on *object visibility* and on *physical action* (dust lifting, paper opening) — stronger than `H1` on
both — and it is inherently the most "filmic" of the five. It still loses, and the reason is structural, not
arithmetic:
- **It reveals the ending.** The video's shape is *promise → years → the object found again*; finding it in second
  one removes the only turn the middle of the video has, and the 15–20 s re-hook slot (`s7`) is precisely the
  finding. `H3` and the re-hook would be the same beat, so one of them would have to be given up.
- **It drops the cause.** Without `Rồi bạn đi làm.`, the notebook is a found object with no counterweight, and the
  rest of the video (the office, `s4`/`s6`, the deferral) has to be *inserted* as backstory instead of *arriving*
  as the cut that hurts.
- Its frame 0 has an empty headline: `Cuốn sổ ngày xưa.` names a thing and opens no question.
**Rejected as the opener; kept as the re-hook `s7`**, where the same image earns its weight because the viewer has
just been shown the workplace it was abandoned for.

---

## H4 — Abstract claim · `Điều bạn từ bỏ không ồn ào. Nó chỉ lặng lẽ biến mất.` (research #5)

**1. First frame / 9:16 safe-zone text.** Empty room, no object; headline `Không ồn ào.` (2 words).
**2. Spoken 0–3 s.** 13 syllables = **2.95 / 3.10 / 3.33 / 3.51 / 3.61 s** at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s —
over 3 s at the planning rate and below.
**3. Tension / promise.** True to the topic line (`âm thầm từ bỏ`), but it hands the viewer an abstraction and
asks them to bring their own object.
**4. Payoff before second 8.** **No.** Nothing can be proved by second 8 because there is nothing to show; the
claim would have to be illustrated by the video it is trying to open.
**5. Risk / verdict.** No clickbait, and the last line is genuinely beautiful. **Rejected as the opener** — an
abstract claim in the first 3 s is the "generic opening" blocker, and a frame 0 with no observable subject fails
the 0–1 s contract outright. Its truth is kept where abstraction costs nothing: the **END card's topic line**, on
screen only, after the chord has been heard.

---

## H5 — Withheld identity · `Chữ viết ngày xưa vẫn còn nguyên. Bạn quên nó rồi.` (research #4)

**1. First frame / 9:16 safe-zone text.** A page held to the light, writing showing through from the reverse;
headline `Chữ viết ngày xưa.` (4 words).
**2. Spoken 0–3 s.** 12 syllables = **2.73 / 2.86 / 3.08 / 3.24 / 3.33 s** — over 3 s at the planning rate.
**3. Tension / promise.** Whose handwriting, and why "still intact" is said with weight.
**4. Payoff before second 8.** Partial — the notebook opens and the writer's identity lands, but the identity *is*
the payoff, so nothing escalates after it.
**5. Risk / verdict — the one that must be rejected on accuracy, not on craft.** **`Bạn quên nó rồi.` is not in
the owner's account.** It states inference **`I3`** as a fact about the viewer, and it contradicts the very sentence
the video is built on — the owner's line 7 is `Bạn ngồi đọc, thấy thương người đã viết ra nó.`: the writer was not
forgotten, they were **pitied**. A hook that asserts forgetfulness would make `s10`–`s11` a non-sequitur and would
put an unverified claim in frame 0. **Rejected outright** (not reused anywhere), and the source of the rejection
is recorded so it is not re-proposed: `research.md` §5 #4 already flags `I3`; the flag is decisive.

---

## Decision

| Candidate | 0–1 s subject / action | Hook complete by 3 s | 1–3 s gap the viewer holds | First payoff < 8 s | Sound-off | Resolved by | Clickbait risk | Verdict |
|---|---|---|---|---|---|---|---|---|
| **H1** direct address | **event in progress** — fresh dust streak, lanyard **already off and lying on the page, its strap settling flat while the plate stays where it lies**, badge on an old handwriting list | **yes — 2.50 / 2.62 / 2.82 / 2.97 / 3.06 s** (2.50–2.97 s ≥ 3.667 syl/s) | **yes** — "you promised, then work swallowed it; which is still lying on the floor?" | **yes — 5.48 / 5.73 / 6.15 / 6.47 / 6.64 s (`s2`)** | **yes** | `s12`–`s16` + END card | low | **CHOSEN** → `s1` |
| H2 viewer question | a phone on a palm; nothing has happened | **no** — 3.08–3.33 s at ≤ 3.9 syl/s | yes — strong recognition | partial (no new proof) | partial | — | low | rejected → **`s5b`**, the deferral |
| H3 the found object | the notebook already in a hand, dust lifting | yes — 2.50–3.06 s | yes — "what is written in it?" | spends itself: the notebook *is* the payoff | yes | — | low | rejected → **`s7`**, the re-hook |
| H4 abstract claim | an empty room, no object | **no** — 3.33–3.61 s at ≤ 3.9 syl/s | weak — no object supplied | **no** | no | END card wording only | low | rejected → END card |
| H5 withheld identity | a page held to the light | **no** — 3.08–3.33 s at ≤ 3.9 syl/s | yes | partial | yes | — | low | **rejected on accuracy** (`I3` asserted as fact) |

`H1` is chosen on the two literal tests the contract names first — an observable subject **acting** in the first
second, and a truthful promise that is *paid* on screen before second 8 — plus the only candidate that opens and
closes on the same question (the list and the badge) without spending its turn early.

**Named competing candidate for the reviewer to weigh: `H3`** (the found object, research #2). It is stronger than
`H1` on object visibility and physical action, and it is the most filmic of the five. It loses on structure: the
finding **is** the video's only turn, so spending it at 0–1 s empties the 15–20 s re-hook slot and forces the
office to arrive as backstory instead of as the cut that hurts. The reviewer should test that argument — not the
timing one, where `H3` is exactly equal to `H1` at 11 syllables.

---

## Coverage check

- **Hook complete** 2.50 / 2.62 / 2.82 / 2.97 / 3.06 s at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s · own-line edge at
  3.586 → 3.07 s, stated in `H1` §2 and in `script.md` §1.1.
- **First payoff** (`s2`, named once in every file as *the first payoff*) 5.48 / 5.73 / 6.15 / 6.47 / 6.64 s.
- **Re-hook `s7`** starts 16.52 / 17.20 / **18.35** / 19.23 / 19.70 s — inside 15–20 s at every rate in the
  no-trim band 3.586–4.510 (16.17 s at 4.510, 19.77 s at 3.586).
- **Highlights** `s7` (H1) / `s10`–`s11` (H2) / `s15` (H3) — `script.md` §6.2.
- **Contrast pairs** CP1–CP3 — `script.md` §6.1.
- **Light plan** L0–L4 with exactly one arrival (L2 at `s7`), plus a held `L2-held` state for the post-turn shots — `script.md` §2.1.
- **Post-word tail** = `s16`'s 0.55 s hold + END card 2.80 s = **3.35 s** of real silence after the last word at
  52.72 s (3.9 syl/s).
- **Total** 50.97 / 52.87 / **56.07** / 58.50 / 59.81 s — inside the owner's 50–60 s for every rate between
  **3.59 and 4.51 syl/s**.
- **Claim sources:** every row's `source` cell in `script.md` §3 resolves to `S1` (the owner's account) or to the
  named research fact; the two recreated UI screens carry a `minh hoạ` label. Full claim plan in `brief.md`
  §Claim plan.
