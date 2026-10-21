# Script: Có những giấc mơ bạn đã âm thầm từ bỏ

**Video ID:** giac-mo-tu-bo · **Profile:** story · **Comp:** `GiacMoTuBoReel` · 9:16 1080×1920 @30 fps
**Duration:** **50–60 s** (owner explicit override; speech + pauses + transitions + ending hold) — **planned total
56.07 s** at the 3.9 syl/s planning rate, **50.97 s** at 4.4, **52.87 s** at 4.2, **58.50 s** at 3.7, **59.81 s**
at 3.6.
**Hook:** candidate **`H1`** (`hook-options.md` §H1) — research #5 candidate #1, the owner's own two sentences.
**Re-hook (named): `s7`**, clip starts **16.52 / 17.20 / 18.35 / 19.23 / 19.70 s** at 4.4 / 4.2 / 3.9 / 3.7 / 3.6
syl/s — inside 15–20 s at every rate in the no-trim band 3.586–4.510.
**Keys: 17 spoken, played back in file order — `s1 · s2 · s3 · s4 · s5a · s5b · s6 · s7 · s8 · s9 · s10 · s11 ·
s12 · s13 · s14 · s15 · s16`** plus the silent shot row **`END`**.
`s1`, `s2`, `s5a`, `s5b`, `s7`, `s9`, `s10`, `s11`, `s12`, `s13`, `s14`, `s16` are the owner's own lines (129
syllables). **One move is named: `s1` is owner L1 + L3 and `s2` is owner L2, so L3 (`Rồi bạn đi làm.`) is heard
before L2 (`Bạn đã lưu cả một danh sách…`); L4–L12 keep their order.** `s3`, `s4`, `s6`, `s8`, `s15` are the only
five `[ADD]` lines (46 syllables),
each justified one-to-one in §7. `s1` merges owner lines 1 + 3 and drops the two-syllable opener `Ngày trước,` so
the hook is a two-clause sentence inside 3 s; `s5a` + `s5b` are owner line 4 split into two keys because a cloned
voice cannot be told to pause: the **0.20 s gap sits inside `s5a`** after `Mỗi lần định mua đàn,`, and the split
itself is **0.00 s** — the two clips butt at 13.76 s. `END` carries **no voice key**.

---

## 1 · Timing budget

**Unit:** `syl` = space-separated token (repo unit). **Planning rate: 3.9 syl/s for every key** — one planning
figure, chosen because it is the *measured average of this exact voice* (§9), not because it sounded right.
Expressiveness comes from holds, emphasis and light, not from invented per-key rates: a cloned voice cannot change
pace, and a per-key rate column would be an unverifiable claim.

**The identity every number below obeys:**

```
planningTotal(rate) = Σ(syl_k ÷ rate) + Σ(pauseAfterSeconds) + Σ(postClipHold_k) + END card
                    = Σ(syl_k ÷ rate) +        2.60 s       +       5.80 s        +   2.80 s
                    = Σ(syl_k ÷ rate) + 11.20 s of silence that exists whether or not the rate changes
```

| # | key | syl | speech s | pause after (inside clip) | clip end s | post-clip hold s | next start s | start s |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | **s1 · HOOK · COVER** | 11 | 2.82 | 0.00 | 2.82 | 0.25 | 3.07 | 0.00 |
| 2 | **s2 · first payoff** | 12 | 3.08 | 0.00 | 6.15 | 0.25 | 6.40 | 3.07 |
| 3 | s3 · `[ADD]` | 9 | 2.31 | 0.25 | 8.96 | 0.25 | 9.21 | 6.40 |
| 4 | s4 · `[ADD]` | 8 | 2.05 | 0.00 | 11.26 | 0.25 | 11.51 | 9.21 |
| 5 | s5a | 8 | 2.05 | 0.20 | 13.76 | 0.00 | 13.76 | 11.51 |
| 6 | **s5b · the deferred sentence — 0.00 s boundary** | 4 | 1.03 | 0.00 | 14.78 | 0.25 | 15.03 | **13.76** |
| 7 | s6 · `[ADD]` | 11 | 2.82 | 0.25 | 18.10 | 0.25 | 18.35 | 15.03 |
| 8 | **s7 · RE-HOOK · H1** | 17 | 4.36 | 0.25 | 22.96 | 0.40 | 23.36 | **18.35** |
| 9 | s8 · `[ADD]` | 9 | 2.31 | 0.20 | 25.87 | 0.30 | 26.17 | 23.36 |
| 10 | s9 | 7 | 1.79 | 0.00 | 27.97 | 0.45 | 28.42 | 26.17 |
| 11 | s10 · **H2 (i)** | 10 | 2.56 | 0.25 | 31.23 | 0.35 | 31.58 | 28.42 |
| 12 | s11 · **H2 (ii)** | 11 | 2.82 | 0.00 | 34.40 | 0.45 | 34.85 | 31.58 |
| 13 | s12 | 13 | 3.33 | 0.20 | 38.38 | 0.45 | 38.83 | 34.85 |
| 14 | s13 | 9 | 2.31 | 0.25 | 41.39 | 0.30 | 41.69 | 38.83 |
| 15 | s14 | 7 | 1.79 | 0.20 | 43.69 | **0.70** | 44.39 | 41.69 |
| 16 | s15 · **H3** | 9 | 2.31 | 0.25 | 46.94 | 0.35 | 47.29 | 44.39 |
| 17 | s16 · close | 20 | 5.13 | 0.30 | **52.72** | 0.55 | 53.27 | 47.29 |
| 18 | **END · silent** | 0 | 0.00 | 0.00 | — | **2.80** | **56.07** | 53.27 |
| | **TOTAL** | **175** | **44.87** | **2.60** | | **8.60** | | |

**Owner-derived 129 syl · `[ADD]` 46 syl · total 175 syl · fixed silence 11.20 s (20.0 % of runtime).**

**Where the clip end and the last word differ, and why.** `s1` is two sentences joined with **no inserted silence**,
so no key in this packet spends a pause *after* its last syllable. The last word of the video is `s16`'s clip end,
because `s16`'s 0.30 s gap sits **inside** the clip, ahead of the second sentence:

```
lastWord(rate) = s16Start(rate) + 9 ÷ rate + 0.30 (sentence gap) + 11 ÷ rate
               = 47.62 / 49.52 / 52.72 / 55.15 / 56.46 s   at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s
```

### 1.1 Rate band, break-even, and the structural marks at every rate

| measured rate | speech = 175 ÷ rate | + 11.20 s silence | **total** | inside 50–60 s |
|---:|---:|---:|---:|---|
| **4.4 syl/s (fastest modelled)** | 39.77 | 11.20 | **50.97 s** | ✅ 0.97 s above the floor |
| 4.2 syl/s | 41.67 | 11.20 | 52.87 s | ✅ |
| 4.1 syl/s | 42.68 | 11.20 | 53.88 s | ✅ |
| **3.9 syl/s (planning rate = measured voice average)** | 44.87 | 11.20 | **56.07 s** | ✅ |
| 3.7 syl/s | 47.30 | 11.20 | 58.50 s | ✅ |
| **3.6 syl/s (slowest modelled)** | 48.61 | 11.20 | **59.81 s** | ✅ 0.19 s below the ceiling |

**Break-even rates.** Solving `175/r + 11.20 = 50` gives **r = 4.510**; solving it `= 60` gives **r = 3.586**.
The packet is inside 50–60 s for any measured rate between **3.59 and 4.51 syl/s**, which brackets the whole
3.6–4.4 modelling band with margin at both ends. Outside that band §5's elasticity applies — **never audio speed,
never a cut owner word.**

**Structural marks, recomputed at every rate.**

| mark | 4.4 | 4.2 | 3.9 | 3.7 | 3.6 | contract |
|---|---:|---:|---:|---:|---:|---|
| **hook complete** = `s1`'s last syllable, `11 ÷ rate` | **2.50** | **2.62** | **2.82** | **2.97** | **3.06** | ≤ 3 s ✅ for rate ≥ **3.667** |
| **cover headline clears** = `s1` clip end + 0.25 s, `11 ÷ rate + 0.25` | **2.75** | **2.87** | **3.07** | **3.22** | **3.31** | frame-accurate; keyed to the **measured** clip, never to 3.07 s |
| `Rồi bạn đi làm.` begins, `7 ÷ rate` | 1.59 | 1.67 | 1.79 | 1.89 | 1.94 | the cut that hurts |
| **first payoff** = `s2`'s clip end, `23 ÷ rate + 0.25` | **5.48** | **5.73** | **6.15** | **6.47** | **6.64** | < 8 s ✅ |
| **re-hook `s7` clip starts**, `63 ÷ rate + 2.20` | **16.52** | **17.20** | **18.35** | **19.23** | **19.70** | 15–20 s ✅ |
| the chord (`s15` clip starts), `146 ÷ rate + 6.95` | 40.13 | 41.71 | 44.39 | 46.41 | 47.51 | — |
| **last word of the video** = `s16` clip end | 47.62 | 49.52 | **52.72** | 55.15 | 56.46 | — |
| END card starts (last word + `s16`'s 0.55 s) | 48.17 | 50.07 | 53.27 | 55.70 | 57.01 | — |
| **total** | **50.97** | **52.87** | **56.07** | **58.50** | **59.81** | 50–60 s ✅ |

**Two contract edges, stated rather than rounded away (`N-integrity`).**
1. **The spoken hook is inside 3 s only for a measured rate ≥ 3.667 syl/s** (2.97 s at 3.7). At the slowest
   end of the no-trim band (3.586) it lands at **3.07 s — 0.07 s past**; at **3.17 syl/s**, the lowest rate this same
   voice has actually produced in this repo (`docs/chung-minh-de-lam-gi`), it lands at **3.47 s — 0.47 s past**. The
   ≤ 3 s claim is therefore **conditional on the measured rate**, and it is written that way everywhere it appears.
   It is not repaired by cutting the line: both clauses are the owner's own sentences, and dropping
   `Rồi bạn đi làm.` is exactly the move `hook-options.md` §H3 rejected. **What is not conditional is the sound-off
   hook**: the cover headline is complete at **frame 0**, before a single syllable is spoken, so the promise lands at
   **0.00 s at every rate**. The headline — not the voice — is the rate-independent guarantee, and the spoken line is
   the part that has a rate band.
2. **The re-hook is inside 15–20 s for every rate in the no-trim band** (16.17 s at 4.510, 19.77 s at 3.586). At the
   trim-extended floor of 3.455 syl/s (§5) it lands at **20.43 s — 0.43 s past**, which is a further reason the trim
   set is a *last* resort and the extension set is preferred.

**The payoff's measurement convention, stated once.** The contract figure is the **last word** of `s2` — the beat
that turns "you wanted this" into a page with eleven lines on it. `s2` carries no intra-clip pause, so its last
syllable *is* the beat. The **re-hook** is measured at `s7`'s clip **start** (the first syllable of `Vài năm sau`),
because the reveal is the object appearing, not the sentence finishing.

One beat is called **the first payoff** in this document and nowhere else: **`s2`**. `s1` is the setup `s2` lands on.

---

## 2 · Staging contract

### 2.1 Light plan — published once, here (`H-03`, `S-02`, `A-L14`)

**Exactly one arrival in the whole video: `L2`.** `voice-direction.md`, `hook-options.md` and the shot table
reference these ids; they never re-describe or re-claim an arrival.

| id | where | state |
|---|---|---|
| **L0** (baseline, present from frame 0, **pre-turn shots only**) | `s1`, `s2`, `s3`, `s5a`, `s5b` | The workroom's own **cold grey** window light from frame left, a soft-edged parallelogram on the boards that **stops short of the page**. This is the world, not the turn — it is already in the cover, and **no warm light is in the frame**. |
| **L1** — a different room, colder | `s4`, `s6` | **Office fluorescent** `#DCE7DE`: a hard even bar from a ceiling panel, no softness, a green-grey cast that appears nowhere else. Not an arrival — the same state at both shots, and it is *cold*. |
| **L2** — **the one arrival** | `s7` | **The first warm light in the video.** The same window, later in the day: the bar of light has **moved across the boards and has gone warm** `#F0D9A6`, and for the first time it **lands on the closed cover in the hand and on the wrist** (the notebook is shut here; it opens at `s9`). Small, natural, unexplained by anyone on screen. |
| **L3** | `s10` → `s11` | The same warm rectangle, **wider**: now on the forearm, the knee and the far edge of the page. Still the same window; nothing new is lit. |
| **L4** — warmest | `s15` | Warmest and steadiest in the video, the same window at its fullest, plus one low warm bounce off the near strings. |
| **L2-held** — no new arrival | `s8`, `s9`, `s12`, `s13`, `s14`, `s16`, `END` | The same window, warm, **unchanged from `L2`/`L3`** — no arrival, no new light in these shots; the bar simply continues across the boards. |

`s1`–`s6` are the only cold frames; the palette turns at `s7` and never returns. **No amber bulb, no candle, no
red, no neon** anywhere, at any point (§Visual identity, `brief.md`).

### 2.2 Frame 0 = cover — canonical description (`H-02`, `F-14`, `S-05`)

This paragraph is the single source of the cover. `hook-options.md` §H1 §1 and `brief.md` §Hook reproduce it
**word for word**; gate D proves it reads at phone size on `out/qa/<vid>-cover.png` with the audio muted.

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

- **Motion is in progress at frame 0, and more is moving than the dust.** **The badge plate is already in place**: at
  frame 0 the work lanyard lies **settled across the lower third of the open page**, its **badge plate face-up and never
  landing again — there is no drop, no second settle, anywhere in the packet**. The **strap is a different object and it
  does move**: its coil is still **relaxing flat in `s1`**, it **straightens onto a torso at `s4`**, **hangs in the
  office at `s6`**, **comes back to the lower third at `s12`** and **rests at the lower-left at `s16`/`END`** — where the
  **plate centre sits at y ≈ 1450–1620, fully above y = 1710**, badge plate face-up, outside the warm bar, small; if the
  strap runs off-frame, the plate does not.
  Also moving: the page's lower corner is **lifted about 1 mm**, and — beginning
  inside the **first 0.5 s (frames 0–15)** — the **forefinger enters from the lower right of frame and starts tracing
  the first line**. Frames 0–15 therefore contain a named, non-mote moving element at phone size; the cover is never
  a still image under a headline. The dust motes drift through the cold light throughout.
- **The thesis is visible at thumbnail scale with no text**: an old handwriting list and a work badge in the same
  frame, with the **plate** on top. It reads as overlap and value, not as a caption — and because the plate is in the
  cover **at frame 0**, the thesis is never deferred to a later beat.
- **No face, no age, no gender in the frame** (`U1`). The camera law for the whole video is stated in §2.3.
- **The through-line objects are named here and never contradicted later.** The *same* sewn notebook, the *same*
  ballpoint ink, the *same* dust film and the *same* cold grey window light run through the whole video; the *same*
  lanyard runs frame 0 → `s1` (strap relaxing flat) → `s4` (straightened onto a torso) → `s6` (hanging in the office) →
  `s12` (lower third as the torso leaves) → `s16` (lower-left edge, **badge plate face-up**, outside the warm bar,
  small) → `END` (same position, same plate). **The notebook has one state ledger, and this is it** — every state and,
  where the change is on screen, the action that makes it. **The one change that is not a shot is the close:** the
  `s3`→`s7` cut **returns to the finding** — the notebook is still shut in the box; the shot order goes **back to
  the present finding**, not forward, so this is not a forward time ellipsis. Nobody is seen closing it: frame 0 **`open`** on the boards → `s1` `open` → `s2` `open` → `s3` `open` → *(cut back
  to the finding; shut off screen)* → `s7` **`closed`** (the hand lifts it
  out of the box, still shut) → `s8` **`closed`** (the dust stroke is drawn on the cover) → `s9` **`open`** (the hand
  **opens it at the same page**) → `s10` `open` → `s11` `open` (the hand comes to rest flat on the **open page**) →
  `s12` **`open`** (the hand carries it down off the knee, lets go, and it rests open on the boards) → `s13` **`open`**
  (the hand squares it edge-first on the boards) → `s16` `open`. §6.4 lists exactly these shots in exactly this order.
  **No other shot opens, closes, carries or moves the notebook.**
- **Cover headline** (upper third, safe zone, nothing in the bottom 210 px): **`Bạn từng nói sẽ học đàn.`** —
  6 words, complete at frame 0, and the **only** text on screen during `s1` (the caption layer stays empty for the
  **whole** key: the second sentence `Rồi bạn đi làm.` is **never printed** — it is carried by the badge lying on the
  page and then by `s4`'s office; a headline and a caption saying the same sentence is a print defect, not emphasis).
  It **clears on the
  `s1`→`s2` boundary**, which is `s1`'s **measured** clip end plus the 0.25 s hold:
  **`11 ÷ rate + 0.25` = 2.75 / 2.87 / 3.07 / 3.22 / 3.31 s at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s**. That formula is
  the rule; **3.07 s is only its value at the planning rate and is never hard-coded**. The headline is removed on the
  boundary frame **before** the caption layer draws — the two layers never share a frame — and `content-agent` and
  `design-spec.md` must key the clear to the measured clip duration, not to a number from this document.

### 2.3 Hero asset class and the camera law (`F-07`, `NEW-06`, `A-L12`)

The hero is **one consistent stylised figure built as vector/SVG plates and typography — no photograph, no
live-action plate, no photoreal face, no stock footage, no 3D render.** Every micro-action in §3 is a frame-driven
property of that figure.

**The camera law, and why it is a constraint and not a style: the camera never rises above the collarbone.** The
character exists in this video as **one hand (five fingers, one visible seam at the wrist), a forearm, a torso seen
from behind or from the side, a knee, and a lanyard.** There is no head, no face, no hair and no profile anywhere in
56 seconds. This is how `U1` (no age, no gender) stays true in *every* frame instead of being a note in a document,
and it is why the pity beat at `s10`–`s11` is staged on a hand lying flat on a page rather than on a face.

| micro-action in §3 | how it is delivered from frames only |
|---|---|
| the handwriting that never resolves into words | **eleven vector ink-stroke paths per page**, one weight, `#243A8C`; a path's vertices are fixed per shot, so the text is identical on every render and legible as *handwriting*, never as *words* (`U3`) |
| the dust film and the finger streak | one seeded scalar `dust 0..1` per surface plus **one wiped path** whose endpoint advances on the frame index; no re-seed between `s1`, `s8` and `s16` |
| the lanyard and the badge | one seeded strap path (**already lying on the page at frame 0** → coil relaxing flat → straightened onto a torso → across the open notebook) and one badge plate whose photo area is a **solid grey rectangle** with no face |
| the pocket flap of the box opening (`s7`) | a two-segment flap rotation on a fixed frame curve |
| the warm light arriving (`s7`) | the L2 bar is a **rotation + colour-ramp** of the same L0 parallelogram: angle increases and the ramp moves from grey to `#F0D9A6` across `s7`; nothing new is added to the scene |
| the fingertip pressing a string (`s14`, `s15`) | fingertip pad deform + string displacement; the buzz is a **sound**, the dent is a scalar that fades in one direction only |
| the fingertip slowing where the writing hurries (`s10`) | trace speed as a function of the ink path's own curvature, not of wall-clock time |
| dust motes | deterministic scatter on the frame index |
| the office fluorescent bar (`s4`, `s6`) | a flat ungraded rectangle, the only hard-edged light in the video |

No shot in §3 requires `Date.now()`, `Math.random()`, live video or an actor. **How the profile rubric's
"expressive close-ups" are delivered without a face:** by framing and still-life — the push-in on the page at frame
0, the macro of the fingerprint on the glass at `s5b`/`s6`, the hand flat on the **open page** at `s11`, the 8 cm
fret macro at `s15`.

### 2.4 The instrument rule (`U2`, `I1`)

**The guitar appears in exactly two shots, `s14` and `s15`, and only as six strings, a fret and a fingertip.**
The crop is tighter than 10 cm on every frame of both shots, so **no body, no soundboard, no case, no box, no price,
no shop, no receipt and no delivery is ever in frame**, and the room behind the strings is out of focus and
unidentifiable. The video therefore **neither states nor implies that a guitar was bought** (`U2` unfilled): what it
asserts is a sound and a finger, which is exactly what the owner's own line 11 asserts (`Bạn có thể học một hợp
âm.`). `s5a`/`s5b` show a **browsing** page labelled `minh hoạ`, and `s6` shows a finger **stopping short** of a
button and the screen going dark — `I1`'s reading of the owner's line 4, carried as an inference and never as an
event.

### 2.5 Recreated screens (`minh hoạ`)

Two shots contain phone UI that this video invents: the shopping page in `s5a`/`s5b` and the `Mua ngay` button in
`s6`. Both are **recreated, not captured**, and both carry the on-screen label **`minh hoạ`** (`#8C8578`,
auxiliary size) for as long as the UI is visible. `s4`'s inbox screen carries the same label. No real product, no
brand mark, no price and no legible name of any kind appears in either.

---

## 3 · Shot table

On-screen text = headline layer, ≤ 6 words per element, safe zone. Caption chunks: §4. "image = design" cells are
staging, not claims. `source` resolves to `S1` (the owner's account, `research.md` §1) or to a named research fact.

| # | seconds (syl · speech · slot) | spoken line | on-screen text | image / action | accent words | delivery | source |
|---|---|---|---|---|---|---|---|
| **s1 · HOOK · COVER · frame 0** | 11 · 2.82 · 0.00–2.82 | Bạn từng nói mình sẽ học đàn. Rồi bạn đi làm. | `Bạn từng nói sẽ học đàn.` — 6 words, **complete at frame 0**, the only text during `s1`; clears on the `s1`→`s2` boundary at **`11 ÷ rate + 0.25`** = 2.75 / 2.87 / 3.07 / 3.22 / 3.31 s (measured clip end; 3.07 s only at the planning rate), headline removed one frame before the caption draws | **Exactly §2.2.** **The badge plate is already lying on the list at frame 0 and never lands again in this shot** — there is no drop and no landing. Two movements: inside the **first 0.5 s (frames 0–15)** the **forefinger enters from the lower right and traces the first line to its full stop**; then on `Rồi bạn đi làm.` the **strap's coil relaxes and settles flat** (the strap is the moving object — the plate on top of it is not) while the **page's lower corner lifts about 1 mm**. Same slate, same cold grey window light, no new light | học đàn · đi làm | Curious, recognising — someone stating something you already know about yourself, not consoling you. Brisk and level through `Bạn từng nói mình sẽ`, then `học đàn` lands slower and **stops**; the second sentence is **lower and flatter** than the first, four syllables, ending level on `làm.` — no lift, no sigh, no audible regret. **No inserted pause anywhere in this key and no breath before it**: the two sentences are separate phrases joined with no silence, so the hook completes at 2.82 s (3.9) and the headline clears at the clip end + 0.25 s | owner **L1 + L3**; the dropped opener `Ngày trước,` is recorded in `brief.md` §Source material. Image = design. **Light L0 only** |
| **s2 · THE FIRST PAYOFF** | 12 · 3.08 · 3.07–6.15 | Bạn đã lưu cả một danh sách những bài hát muốn chơi. | — (caption only) | The same page, one beat later: **the fingertips lift the page's lower corner and let it fall**, so the viewer sees the list is not three lines but **three-quarters of a page**; the reverse side's ink shows through as reversed ghosts in the thin paper; near the bottom **one line starts like a title and stops mid-word**, the nib having lifted. **The badge plate still lies exactly where it lay at frame 0** — unmoved, still across the page, still with no face in its photo area (the strap has finished settling and does not move again in this shot) | danh sách · muốn chơi | Warm by one degree, unhurried, **the one line in the video that is allowed to sound pleased**. Even through `Bạn đã lưu cả một danh sách`, then `những bài hát muốn chơi` a touch slower with the stress on `muốn`, and `chơi.` set down flat. No pause inside, no breath: this is the beat the hook promised, so it must arrive **in the same breath as the page's lower corner lifted and let fall** | owner **L2** — verbatim. Image = design. **Light L0.** First halo: the list was written **before** the reasons (`F1`) |
| **s3 · `[ADD]`** | 9 · 2.31 · 6.40–8.96 | Trang giấy mỏng quá, chữ viết tay, viết dở. | — (caption only) | Extreme macro on the paper's fibre: the page is thin enough that the next page's strokes show through as a mirror image, and the ink is the same blue ballpoint `#243A8C` — **shown, never said** (the colour is image-only). **One line is visibly lighter than the rest** — a used-up pen, the tip pressing through in two places — and the forefinger's pressure **dents** the fibre where it rests | mỏng quá · viết tay · viết dở | Quiet, factual, almost to itself. Three short statements, each landing on its own, with the first leaning on `quá` so it is a spoken clause and not a list item; the deliberate **0.25 s gap after `mỏng quá,`** is the only beat in this key, and `viết dở` is said **flatter and lower** than the two clauses before it, then stops. No breath before the clip | **`[ADD]`** sensory line, `script-agent` (§7) — the paper itself; `I4` (ink colour) is a **labelled design choice**, not a sourced fact |
| **s4 · `[ADD]`** | 8 · 2.05 · 9.21–11.26 | Sáng nào cũng quẹt thẻ, hộp thư đầy. | `minh hoạ` — auxiliary label under the recreated inbox screen; no legible name, number or logo anywhere | Hard cut to a different room and to **L1**: a hard even bar of **fluorescent** `#DCE7DE` from a ceiling panel; a badge reader by a glass door as `quẹt thẻ` is said (the **same coiled lanyard** from frame 0, now straightened around a torso seen from behind, camera below the collarbone); then a desk corner as `hộp thư đầy` is said: paper stacked **above** the rim of a tray, top sheet sliding off, and beside the keyboard a screen with **unread rows stacked past the bottom edge** — recreated UI, labelled | quẹt thẻ · hộp thư đầy | Flat, administrative, deliberately **the least emotional read in the video** — the point is that nothing feels wrong while it is happening. Even and slightly hurried on `Sáng nào cũng quẹt thẻ,`; `hộp thư đầy` lower, as a full stop. No pause inside and no breath: the two clauses are one worn routine | **`[ADD]`** staging from the owner's own `Rồi bạn đi làm.` (`S1` L3) using research §4 item 6; **no job title, company or number is shown or said** (`U1`) |
| **s5a** | 8 · 2.05 · 11.51–13.76 | Mỗi lần định mua đàn, bạn lại nghĩ: | `minh hoạ` — auxiliary label under the recreated shopping page | Back to **L0**, close on a phone lying flat on an open palm: a **browsing** page for a guitar, the screen's `#8FB6E8` glow the only light on the wrist. The thumb scrolls **once** and stops with the same line of the page in the middle of the screen; on `bạn lại nghĩ:` the thumb **lifts off the glass and stays off**. Nothing is added to a cart, nothing is chosen | định mua đàn · lại nghĩ | Faintly amused and completely without self-judgement — this is a habit, not a failure. Light through `Mỗi lần định mua đàn,`; the **0.20 s gap** after it; `bạn lại nghĩ:` lower and slower with the colon left hanging, **not resolved**. No breath before the clip | owner **L4**, first half — verbatim. Recreated UI = `minh hoạ` (`I1`: browsing, not buying) |
| **s5b · the deferred sentence — 0.00 s boundary** | 4 · 1.03 · **13.76–14.78** | 'Để khi nào rảnh.' | **`'Để khi nào rảnh.'`** — 4 words, headline **replaces** this key's caption, set in the notebook's own **ink blue `#243A8C`** on an ivory `#EDE4D2` panel: the only time the ink colour is used as a graphic colour rather than as ink on paper | The same phone, one beat later: **the screen has dimmed and the guitar has gone grey**; the thumb is still lifted **above the glass and motionless**; the office's fluorescent bar is now a hard reflection lying across the dormant screen, i.e. the office is present in the room at home | khi nào rảnh | **The deferred sentence, and the whole video hinges on how small it is said.** Said as a remembered line, not as a quote: quiet, quick, almost dismissive, **level to the end** — no rue, no irony, nothing that would let the viewer hear a warning. The beat around it is **not punctuation**: it is the **0.20 s gap inside `s5a`, before that clip ends** (`pauseAfterSeconds 0.20`) plus the 0.25 s after this clip, which is why it is its own key | owner **L4**, second half — verbatim (`S1`); the phrase's reality in the wild is `F11`/`F12` (`S5`/`S6`). **CP2, member 1** |
| **s6 · `[ADD]`** | 11 · 2.82 · 15.03–18.10 | Ngón tay khựng trước nút Mua ngay, rồi tắt màn hình. | `minh hoạ` — auxiliary label; the button's own label is the only legible text on the screen | Extreme macro on the phone, back to **L1**: a **browsing** page whose `Mua ngay` button sits in the lower two-thirds. The thumb comes down and **stops 6–8 px short of the button and stays there — it never lands on it** — the pad is on the glass, **the button does not change state**, and the fingerprint is visible in the glow on the underside of the pad. Then `rồi tắt màn hình.`: the side button is pressed and the screen drops to **locked grey `#6E7A85`**, leaving a slab of dark glass with the fluorescent bar mirrored in it and the thumbnail as a shadow | khựng · Mua ngay · tắt màn hình | **The video's first silence inside a line.** `Ngón tay khựng trước nút Mua ngay,` is said **fast, almost casually**, and stops dead on `ngay` — the word stops *before* the button, and the finger must too; the **0.25 s gap** does the work the words do not; then `rồi tắt màn hình.` is **smaller and lower than everything before it** — an anticlimax delivered as an anticlimax, no regret in the voice at all. No breath after the last word | **`[ADD]`** (§7). Grounded in the owner's `Mỗi lần định mua đàn…` (`S1` L4) and carried as **inference `I1`** — the finger **stops**, so nothing is purchased (`U2`). **CP2, member 2** |
| **s7 · RE-HOOK · H1 · `L2` the one arrival** | 17 · 4.36 · **18.35–22.96** | Vài năm sau, trong một buổi dọn nhà, bạn tìm thấy cuốn sổ có danh sách ấy. | — (caption only) | **The reveal, and the only change of light in the video.** A moving box sits on the boards, one flap open, tape curling; the shelf behind shows **a clean square in the dust where the box used to stand**; the hand goes in and comes up with **the same sewn notebook, the dust still holding the shape of its cover**. On `tìm thấy cuốn sổ`, **the bar of window light has moved across the boards and gone warm `#F0D9A6` — and for the first time in 56 seconds it lands on the closed cover in the hand and on the wrist.** No bulb, no lamp, nobody turns anything on | dọn nhà · tìm thấy · danh sách ấy | **The re-hook is delivered by the plainest possible reading.** Almost offhand through `Vài năm sau, trong một buổi dọn nhà,` as though any of this were ordinary; the **0.25 s gap** at the comma inside the line keeps the phrase unhurried rather than dramatic; then `bạn tìm thấy cuốn sổ có danh sách ấy.` is **slower, lower and warmer**, and the last three words land as **one unit** — `danh sách ấy` — with the final syllable **stopping, not fading**. No breath before the clip; a real 0.40 s of silence after it | owner **L5** — verbatim. Image = design. **`H1` highlight** (§6.2), **`L2`** (§2.1) |
| **s8 · `[ADD]`** | 9 · 2.31 · 23.36–25.87 | Bụi phủ kín hết bìa, tay kéo vệt qua. | — (caption only) | Macro on the **closed** cover (the ledger's state for this shot): the dust is an even grey-brown `#9A8F7C` film, then **the forefinger draws one stroke through it from top to bottom**, pushing the dust into a **fine raised edge** at the end of the stroke; under the stroke the cover is darker and cleaner. A few motes lift into the warm light and drift. The traced stroke **crosses the seam of the cover** and does not stop at it | phủ kín · tay kéo vệt qua | Small, tactile, said while doing — **not a caption of the image, an observation beside it**. Light through `Bụi phủ kín hết bìa,` with `hết` as the spoken hinge, the **0.20 s gap**, then `tay kéo vệt qua.` slower with the stress on `kéo`, plain landing. No breath before the clip | **`[ADD]`** sensory line, `script-agent` (§7) — grounded in `S1` L5 (`buổi dọn nhà`) + research §4 item 2 |
| **s9** | 7 · 1.79 · 26.17–27.97 | Chữ viết ngày xưa vẫn còn nguyên. | — (caption only) | The page held flat: **the ink is intact and un-faded**, and the page's own fold-line runs straight through the writing **without breaking a single stroke or a single word** — that is what `vẫn còn nguyên` means here. **One dust mote lands on the page and is not brushed away.** The warm bar sits across the fold | ngày xưa · còn nguyên | Quiet, even, **one thought and nothing more** — the line is the video's steadiest, and the steadiness is the point. No internal pause; `vẫn còn nguyên` only marginally slower than what precedes it, ending level and closed. The 0.45 s after this clip is the longest silence in the first half | owner **L6** — verbatim. Image = design |
| **s10 · H2 (i) · `L3`** | 10 · 2.56 · 28.42–31.23 | Bạn ngồi đọc, thấy thương người đã viết ra nó. | — (caption only) | The reader is finally given a body and still no face: **a torso from behind, sitting on the floor, knees up, the open notebook on one knee**, camera below the collarbone. The forefinger traces a line and **slows exactly where the writing becomes more hurried** — the letters leaning forward, the strokes closer — and **stops mid-line**, the finger still on the page. **`L3`: the same warm rectangle, now wider, reaching the forearm, the knee and the far edge of the page** | ngồi đọc · thấy thương | **The turn into tenderness is a thinning, not a swell.** `Bạn ngồi đọc,` level and ordinary; the **0.25 s gap** at the comma is real silence, and it is where the finger stops; then `thấy thương người đã viết ra nó.` is **close, plain and smaller**, with no trembling, no breathiness and no upward bend on `thương` — said the way you say something you did not expect to feel. The final syllable **stops** | owner **L7** — verbatim. **`I3` labelled: pity, not self-blame.** **`H2`, part i** (§6.2) |
| **s11 · H2 (ii)** | 11 · 2.82 · 31.58–34.40 | Người ấy đâu biết sau này mình sẽ bận đến thế. | — (caption only) | **The beat where nothing moves.** The notebook stays **open** on the knee (it was opened at `s9` and is not shut again in this video); the hand **comes to rest flat on the open page, palm down, and does not move for the whole line** — no finger tap, no rub, no press. The warm light does not change either. The only motion in the frame is the dust motes in the warm bar and the slow push-in. This is the held beat the whole video was walking towards | đâu biết · bận đến thế | **The smallest line in the video, and the one that must not be acted.** Nearly conversational on `Người ấy đâu biết sau này`, as though it were a practical fact; `mình sẽ bận đến thế.` **lower, slower, and plain**, delivered as an **observation about a stranger** rather than about the speaker. The line **thins** on `bận đến thế` — the last three words lose energy and **stop**; it **never becomes a whisper and never trails off**. **No level automation inside the take**: the line is not made louder or quieter anywhere, it is only *smaller* (closer, less air, fewer consonants). No breath inside, no breath after | owner **L8** — verbatim. Image = design. **`L3`.** **`H2`, part ii** |
| **s12** | 13 · 3.33 · 34.85–38.38 | Có thể hôm nay bạn không còn muốn trở thành nhạc công nữa. | — (caption only) | **The exit is staged inside the camera law of §2.3 — no head, no face, no legs, nobody walks.** The **knee dips and the torso rises out of the top of frame**; the hand **carries the notebook down off the knee and lets go of it**, so it comes to rest **open** on the boards with the warm bar lying across a used page; the room is otherwise still. On `không còn muốn trở thành nhạc công`, the camera settles so that **the lanyard from frame 0 is now the only thing in the lower third** — the object that won is back in frame, small, and nobody looks at it | Có thể · không còn muốn · nhạc công | Spoken carefully, **as a permission rather than a loss** — no melancholy, no relief either. `Có thể hôm nay` light, the **0.20 s gap** after it, then `bạn không còn muốn trở thành nhạc công nữa.` steady and even, with the stress carried by `không còn muốn` and `nhạc công`, and `nữa.` set down flat. This is the first of the three lines that take the debt off the viewer | owner **L9** — verbatim. **CP3, member 1** (`U4`: no musical future is claimed) |
| **s13** | 9 · 2.31 · 38.83–41.39 | Nhưng nếu vẫn thích âm thanh của cây đàn… | — (caption only) | Close on the **open** notebook being **squared edge-first on the boards** (it is already on the boards — the hand only squares it, nothing is carried in from elsewhere, no table); **the page edge riffles and settles**. As `âm thanh của cây đàn` is said, **a single low note is struck off-camera and left to ring out into the room** — the frame does not show what made it. The warm bar lies on the boards beside it | Nhưng · vẫn thích · cây đàn | **The pivot, and the only one-word phrase in the packet.** `Nhưng` is said **alone, quiet and level**, and then there is **0.25 s of real silence** (`pauseAfterSeconds`) before the clause continues — because a cloned voice cannot be told to pause, the beat is a clip-internal gap and **never the owner's `…`** (which is kept in the text only and is **not performed**). The rest is unhurried and warm; the last syllable **trails very slightly** and is **not** stretched | owner **L10** — verbatim, including the owner's own `…`. The off-camera note is **staging**; the instrument's presence is never explained (§2.4, `U2`) |
| **s14** | 7 · 1.79 · 41.69–43.69 | Bạn có thể học một hợp âm. | — (caption only) | **The first time strings exist in this video, and the camera is closer than 10 cm** (§2.4): six nylon strings, one fret, one fingertip — **no body, no case, nothing of the room behind them**. The finger comes down **hesitantly**, settles on one string, presses, **releases the pressure by mistake**, presses again. The string gives slightly under the pad and the string is the only thing that moves | học · một hợp âm | **Said as an offer, not as advice and not as a challenge** — the smallest possible sentence, so it is given the smallest possible weight. `Bạn có thể học` light and quick, the **0.20 s gap** after it, then `một hợp âm.` slow, level, and **finished** — a full stop, not a hook, not a call to action. No breath before the clip | owner **L11** — verbatim. **CP3, member 2.** Worth of one chord grounded in `F5`, `F6`, `F15` |
| **s15 · H3 · `L4`** | 9 · 2.31 · 44.39–46.94 | Một hợp âm rè nhẹ, ngón ấn chưa quen. | `Một hợp âm rè nhẹ.` — 5 words, headline **replaces** this key's caption. **Clear = `5 ÷ rate + 0.25` after this key's clip start** (measured end of phrase 1, never a fixed number): **1.53 s at 3.9 syl/s → 45.92 s absolute**; the second chunk `ngón ấn chưa quen.` then holds **≥ 1.0 s at rates ≤ 4.0**; at faster measured rates the chunk holds into the 0.35 s post-clip hold (46.94 − 45.92 = 1.02 s at 3.9), and the two layers never share a frame | **The video's only sound payoff, and it is deliberately imperfect.** The chord is struck: **the low string buzzes against the fret** — a short, dull, rattling buzz, not a chord — the fingertip **slips about 2 mm and finds the fret again**, presses harder, and the second attempt is only marginally better. **`L4`: the same window at its fullest, plus one low warm bounce off the near strings.** At the end of the line the hand comes off, and the pad of the forefinger shows **a faint string-shaped dent** (`F8`, `S3`) before the frame cuts | rè nhẹ · chưa quen | **Warm, slightly amused, and completely unimpressed with itself** — the smallest laugh in the voice, and **no performed laugh sound anywhere** (`experimentalCues` disabled). `Một hợp âm rè nhẹ,` almost apologetic; the **0.25 s gap** at the comma; then `ngón ấn chưa quen.` **slower**, with `chưa quen` given the last emphasis of the whole video and the final syllable **stopping dead**. The line **ends the video's speech on a small failure that is allowed to be good enough** | **`[ADD]`** (§7) — grounded in `F8` (`S3`: blistered, string-dented fingertips) and `F6` (`S2`: the first song was "sướng lắm"). **`H3` highlight**, **`L4`** |
| **s16 · close** | 20 · 5.13 · **47.29–52.72** | Không phải để bù lại những năm đã qua. Chỉ để được vui với một điều mình từng yêu thích. | — (caption only) | The room, one step wider and still below the collarbone: the notebook lies **open** on the boards, the phone is **face-down** beside it, and **the thin smear of dust on the boards still holds the shape of the box that stood there**. **The lanyard lies at the lower-left, plate centre y ≈ 1450–1620, fully above y = 1710** — badge plate face-up, outside the warm bar, small; if the strap runs off-frame, the plate does not — the same object from frame 0, at rest, never picked up. The hand lies **flat on the open page and does not move**; the warm rectangle holds without changing. At the **last syllable**, the fingers **curl slightly, once**, and stop. The frame then holds, and the image is the only thing left running | bù lại · được vui · từng yêu thích | **The resolution, said to one person and then stopped.** `Không phải để bù lại những năm đã qua.` steady and slightly firm — this is the sentence that refuses the debt; the **0.30 s gap** between the two sentences is real silence; then `Chỉ để được vui với một điều mình từng yêu thích.` **warmer than anything else in the video and not one degree louder**, with the movement on `được vui` and the last three words slowing to a **settled, level, closed** end. The voice **stops on the word** — no fade on the words, no sigh after them, **no call to action** | owner **L12** — verbatim. The "joy, not achievement" framing is corroborated by `F5`, `F17`, `F19`. **Held `L2`/`L3` state, warm, unchanged** (§2.1) |
| **END · silent** | 0 · 0.00 · **53.27–56.07** | *(no voice key — silence)* | `Có những giấc mơ` / `bạn đã âm thầm từ bỏ` — the owner's topic line, 4 + 6 words, stacked, on screen only | The frame holds the open notebook, the flat hand, the face-down phone, **the lanyard at the lower-left, plate centre y ≈ 1450–1620, fully above y = 1710 — badge plate face-up, outside the warm bar, small, the same position as `s16`; if the strap runs off-frame, the plate does not**; the slow push-in continues; the dust motes still drift in the warm bar. Nothing new enters. No logo, no handle, no sign-off | — | **No voice at all.** | owner **topic line** (`request.md`), on-screen only. **No CTA anywhere in this video** |

---

## 4 · Caption chunks (proposal — `content-agent` locks the final set)

Each chunk ≤ 2 lines, ≤ ~28 characters per line. **Caption chunks are literal substrings of their key's canonical
line** (`voice.proposed.json`, copied to `voice.json` at acceptance — whichever exists when the caption layer is built,
the two are identical by contract) — the caption is never paraphrased, and a chunk boundary always falls on a word
boundary that already exists in the spoken text. Three keys (`s1`, `s5b`, `s15`) carry a **headline element that replaces the caption
for that key**; everything else is a caption chunk. Caption box bottom edge at y ≈ 1710 px in a 1920 px frame —
**nothing in the bottom 210 px**. Caption chunks are a display layer: they are **not** synthesis phrases, and no
caption chunk is ever used as a phrase in `voice-performance.proposed.json`.

**Exactly two permitted departures from verbatim, both inside the three-key headline layer (`s1`, `s5b`, `s15`), and
both named here:**

1. `s1` headline `Bạn từng nói sẽ học đàn.` drops the spoken `mình` (6 words instead of the spoken 7) — a headline,
   not a transcript. The spoken line keeps `mình`.
2. `s15` headline `Một hợp âm rè nhẹ.` covers only the first clause of the spoken line; `, ngón ấn chưa quen` is
   **not** dropped from the screen — it follows as the second caption chunk **after the headline clears** (see the
   `s15` row), so the whole line is still readable with the sound off.

**Plus one named omission, which is not a departure from verbatim:** `s1`'s **second sentence, `Rồi bạn đi làm.`, is
never printed at all.** There is no room for it before the headline clears on the `s1`→`s2` boundary, and a headline
plus a caption saying the same thing is a print defect. It is carried by **the image** — the badge lying on the open
list at frame 0 — and by **`s4`**, the office the sentence names. So `s1`'s on-screen strings are exactly
**`Bạn từng nói sẽ học đàn.`** and nothing else; the caption layer never draws in that key.

No other key departs from its canonical text in any chunk, and no other sentence is left unprinted.

| key | chunk 1 | chunk 2 | chunk 3 |
|---|---|---|---|
| s1 | **`Bạn từng nói sẽ học đàn.`** — cover headline, **replaces** this key's caption; the caption layer never draws during `s1`, and the second sentence `Rồi bạn đi làm.` is **never printed** (carried by the badge on the page and by `s4`). It clears on the `s1`→`s2` boundary at **`11 ÷ rate + 0.25`** = 2.75 / 2.87 / 3.07 / 3.22 / 3.31 s at 4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s — keyed to the **measured** clip end, never to a fixed 3.07 s; the headline is removed one frame before `s2`'s first caption draws | | |
| s2 | `Bạn đã lưu cả một danh sách` | `những bài hát muốn chơi.` | |
| s3 | `Trang giấy mỏng quá,` | `chữ viết tay, viết dở.` | |
| s4 | `Sáng nào cũng quẹt thẻ,` | `hộp thư đầy.` | |
| s5a | `Mỗi lần định mua đàn,` | `bạn lại nghĩ:` | |
| s5b | **`'Để khi nào rảnh.'`** — headline replaces caption (ink blue on ivory) | | |
| s6 | `Ngón tay khựng trước nút` | `Mua ngay, rồi tắt màn hình.` | |
| s7 | `Vài năm sau, trong một` | `buổi dọn nhà, bạn tìm thấy` | `cuốn sổ có danh sách ấy.` |
| s8 | `Bụi phủ kín hết bìa,` | `tay kéo vệt qua.` | |
| s9 | `Chữ viết ngày xưa` | `vẫn còn nguyên.` | |
| s10 | `Bạn ngồi đọc,` | `thấy thương người` | `đã viết ra nó.` |
| s11 | `Người ấy đâu biết sau này` | `mình sẽ bận đến thế.` | |
| s12 | `Có thể hôm nay` | `bạn không còn muốn` | `trở thành nhạc công nữa.` |
| s13 | `Nhưng nếu vẫn thích` | `âm thanh của cây đàn…` | |
| s14 | `Bạn có thể học` | `một hợp âm.` | |
| s15 | **`Một hợp âm rè nhẹ.`** — headline replaces the caption; clears at **`5 ÷ rate + 0.25`** after the key's clip start (1.53 s at 3.9, 45.92 s absolute), keyed to the measured end of phrase 1 | `ngón ấn chưa quen.` — second chunk, drawn **after the headline clears** and held **≥ 1.0 s at rates ≤ 4.0**; at faster measured rates the chunk holds into the 0.35 s post-clip hold, so the line's second clause is on screen too; the two layers never share a frame | |
| s16 | `Không phải để bù lại` | `những năm đã qua.` | `Chỉ để được vui với một` / `điều mình từng yêu thích.` |
| END | *(no caption — the topic line is the card itself, silent)* | | |

**Three keys carry a headline instead of a caption** — `s1`, `s5b`, `s15` — so **no sentence is ever printed twice
on screen**, and `s11`, `s12`, `s13` carry a caption with no headline. `s15` is the one key with **both**: the headline
first, then its remaining clause as a caption, never at the same time. Every headline on screen in this video is
**≤ 6 words**; unlike `ban-khong-yeu-duoi-chi-da-manh-qua-lau` (whose END card needs a declared cap exception), this
packet needs **no cap exception at all** (§8).

---

## 5 · Silence budget and elasticity (`A-T5`, `NEW-2`, `NEW-3`, `NEW-5`)

**Every one of the 11.20 s is a named beat. There is no unassigned hold, and no hold is empty air: each of the
four longest holds has a named visual running inside it.**

| silence | where | position | what it does |
|---:|---|---|---|
| 0.25 | inside `s3` | between clauses | the paper's three short statements |
| 0.20 | inside `s5a` | after `Mỗi lần định mua đàn,` | the habit pausing before the excuse |
| 0.25 | inside `s6` | after `Mua ngay,` | **the finger stopping** — the video's first silence inside a line |
| 0.25 | inside `s7` | at the comma | keeps the re-hook unhurried rather than dramatic |
| 0.20 | inside `s8` | between clauses | the hand doing the thing |
| 0.25 | inside `s10` | at the comma | **where the finger stops mid-line** |
| 0.20 | inside `s12` | after `Có thể hôm nay` | the permission being weighed |
| 0.25 | inside `s13` | after `Nhưng` | **the pivot's beat — a clip-internal gap, never the owner's `…`** |
| 0.20 | inside `s14` | after `Bạn có thể học` | the smallest possible sentence, given room |
| 0.25 | inside `s15` | at the comma | the buzz is allowed to sit before the verdict |
| 0.30 | inside `s16` | between the two sentences | the debt sentence and the joy sentence are separate thoughts |
| 0.25 | after `s1` | clip boundary | **the page's lifted lower corner falls back and the strap finishes coming to rest flat — a real beat with a named motion in it; the badge plate itself has not moved since frame 0 and does not move here** |
| 0.25 | after `s2` | clip boundary | the page settles |
| 0.25 | after `s3` | clip boundary | before the office |
| 0.25 | after `s4` | clip boundary | the routine lets go |
| 0.25 | after `s5b` | clip boundary | **the deferred sentence is left hanging with nobody to answer it** |
| 0.25 | after `s6` | clip boundary | **the dead screen is left alone for the whole hold before the re-hook**, with no voice over it |
| **0.40** | after `s7` | clip boundary | the warm light and the found object are given time to be believed |
| 0.30 | after `s8` | clip boundary | the dust settles |
| **0.45** | after `s9` | clip boundary | **the longest silence in the first half — the intact writing is allowed to be true** |
| 0.35 | after `s10` | clip boundary | the reader's held breath, without a performed breath |
| **0.45** | after `s11` | clip boundary | **the flat hand on the open page: the pity beat is not interrupted by the next line** |
| **0.45** | after `s12` | clip boundary | **the hand lets go and the open page settles in the warm bar** |
| 0.30 | after `s13` | clip boundary | the note rings out |
| **0.70** | after `s14` | clip boundary | **the finger presses, releases, presses again — the video's longest pre-climax hold** |
| 0.35 | after `s15` | clip boundary | the buzz and the dent are left alone |
| **0.55** | after `s16` | clip boundary | **the closing hold, before the card** |
| **2.80** | **END** | clip boundary | **the required silent hold after the closing line; BGM already out** |
| | | **11.20 s** | 20.0 % of 56.07 s |

**Post-word audio tail = `s16`'s 0.55 s hold + the END card's 2.80 s = 3.35 s** of real silence. The last word ends
at **52.72 s**, BGM cuts there, and the mix is silent from 52.72 to 56.07 s. The identity holds exactly:
`52.72 + 0.55 + 2.80 = 56.07`.

**Join obligation — this table is a contract, not a description (`C-06`).** Every value above is a
`minimumPostClipHoldSeconds` in `voice-performance.proposed.json`. No tool reads that file: **`timeline.ts` must write
all 17 per-key holds plus the 2.80 s silent END card as real gaps**, and the timeline must **prove their sum is exactly
11.20 s** — 2.60 inside keys + 5.80 after keys + 2.80 card. If the timeline rounds, overlaps or trims them, the
identity fails and every duration in this document is wrong. The Join step reports the **measured** sum, never an
assumed one.

**Six joins run sample-adjacent with no hold at all, and only one of them is a key boundary (`C-07`).** These are the
only places on the assembled track where two takes butt with no silence between them:

| # | key | phrase A → phrase B | where the silence is |
|---:|---|---|---|
| 1 | `s1` | `Bạn từng nói mình sẽ học đàn.` → `Rồi bạn đi làm.` | none — **inside the key** |
| 2 | `s2` | `Bạn đã lưu cả một danh sách` → `những bài hát muốn chơi.` | none — **inside the key** |
| 3 | `s4` | `Sáng nào cũng quẹt thẻ,` → `hộp thư đầy.` | none — **inside the key** |
| 4 | `s9` | `Chữ viết ngày xưa` → `vẫn còn nguyên.` | none — **inside the key** |
| 5 | `s11` | `Người ấy đâu biết sau này` → `mình sẽ bận đến thế.` | none — **inside the key** |
| 6 | `s5a` → `s5b` | `bạn lại nghĩ:` → `'Để khi nào rảnh.'` | none **at the split** — `s5a`'s 0.20 s `pauseAfterSeconds` sits after `Mỗi lần định mua đàn,`, *inside* that clip, so the two keys still butt at 0.00 s |

The fix is a **`pauseBeforeSeconds` on the second phrase inside the key** — join 6's pad already sits inside `s5a`
(`pauseAfterSeconds 0.20`), so the `s5a`→`s5b` boundary itself carries no pad and stays at **0.00 s** — **never a key
merge and never a change to a word of the canonical text**. `voice-agent` listens to each of the
six on the assembled track (no click, no swallowed consonant, no broken intonation contour) and reports each one.

**Every other key boundary has a real hold of 0.25–0.45 s** (the §5 table above), so it is not a 0.00 s join and needs
no padding. No boundary that carries a hold is described anywhere in this document as a junction.

**Two phrase costs are unproven (`C-09`).** `s5b` is planned at **1.03 s** and `s13` at **2.31 s** at 3.9 syl/s. The
`voice-agent` reports both measured durations, and for `s13` also **whether the owner's `…` cost audible time** (a held
vowel or a trailing pause) on top of 2.31 s. If it did, the fix is agreed with the director **before** synthesis:
strip the `…` from **both** the canonical line and the sidecar phrase so the join stays byte-identical, and keep the
beat as the real 0.25 s `pauseAfterSeconds` after `Nhưng`. The ellipsis is never performed as sound.

**Elasticity, in the order to apply it.** Speech is never touched, **no owner word is ever cut**, no line is ever
re-read slower or faster to fit, and audio is never sped up.

- **Too long** (measured slower than 3.586 syl/s): apply in this order, and **count it exactly** —
  `s14` hold 0.70 → 0.45 (−0.25) · END card 2.80 → 2.40 (−0.40) · `s11` 0.45 → 0.30 · `s9` 0.45 → 0.30 · `s12`
  0.45 → 0.30 (−0.15 each = −0.45) · `s16` 0.55 → 0.40 (−0.15) · `s7` 0.40 → 0.30 · `s10` 0.35 → 0.25 · `s8`
  0.30 → 0.20 · `s15` 0.35 → 0.25 (−0.10 each = −0.40) · `s3` **post-clip hold** 0.25 → 0.20 · `s13` **post-clip hold**
  **0.30 → 0.25** (−0.05) · `s2` 0.25 → 0.20 · `s4` 0.25 → 0.20 (−0.05 each = −0.20).
  **`s3` has two 0.25 values and only one of them moves:** the post-clip hold goes to 0.20; the 0.25
  `pauseAfterSeconds` inside the key (after `mỏng quá,`) is untouched. **`s13` is the other way round:** its 0.25 is the
  intra-clause pause after `Nhưng` and is untouched; only its **0.30 post-clip hold** drops to 0.25. Every hold named in
  this list is the post-clip hold unless it says otherwise.
  **Total recovered: 0.25 + 0.40 + 0.45 + 0.15 + 0.40 + 0.20 = 1.85 s**, silence 11.20 → 9.35 s.
  **Honest bound:** with all of it applied the ceiling is met for any measured rate **≥ 3.455 syl/s** (3.455 →
  60.00 s; 3.50 → 59.35 s; 3.60 → 57.96 s). **Below ≈ 3.44 syl/s this packet cannot keep both the owner's 129
  syllables and the 60 s ceiling** — each further 0.10 s of trimming buys only ~0.03 syl/s, and the two structural
  marks have already drifted by then. **Report it to the director rather than cutting an owner word.** The two
  marks to report when the trim set is in use: at the band edge (3.586) the hook completes at **3.07 s** and `s7`
  starts at **19.77 s**; at the trim-extended floor (3.455) they are **3.18 s** and **20.43 s**.
  **The floor above is a model; the repo has a measurement below it.** The slowest same-voice per-clip rate actually
  measured in this repo is **3.17 syl/s** (`docs/chung-minh-de-lam-gi/voice-report.md`), which puts this script at
  175 ÷ 3.17 = **55.21 s** of speech + 11.20 s = **66.41 s**, and still **64.56 s** with the entire 1.85 s trim set
  applied. **Escalation, not a fix:** if the measured rate lands under 3.586 syl/s, the decision is the director's and
  the owner's — accept a video longer than 60 s, or cut an owner word. A silent cut, a sped-up take, a hushed take
  or shortening the END card past its declared range is never acceptable.
- **Too short** (measured faster than 4.510 syl/s): apply in this order — END card 2.80 → 4.80 (+2.00), then `s16`
  hold 0.55 → 1.05 (+0.50), then `s14` hold 0.70 → 1.20 (+0.50). **Total +3.00 s**, silence 14.20 s, which brings
  the floor down to any measured rate **≤ 4.888 syl/s** (4.89 → 49.99 s; 4.95 → 49.55 s, so 4.89 is the bound).
  Stretching the card lengthens the post-word tail, so §1 is recomputed at the measured rate.
- At the exact break-evens the total is 50.00 s at **4.510** and 60.00 s at **3.586** with **no cut at all**.

---

## 6 · Structural self-check

### 6.1 Contrast-pair registry (`H-05`) — the only place pairs are described

| id | pair | members | carries |
|---|---|---|---|
| **CP1** | **the list written in hope ↔ the same list read with pity** | `s2` + `s3` → `s10` + `s11` | **the turn of the video** |
| **CP2** | the deferred sentence ↔ the intention meeting a live button | `s5b` → `s6` | the reveal of what "rảnh" cost |
| **CP3** | becoming a musician ↔ being happy with one chord | `s12` → `s14` + `s15` + `s16` | the resolution |

Every shot row in §3 names its pair by id only. **The turn is carried by `CP1`** — the same handwriting, the same
page, the same ink, framed once as a young person's plan and once under a finger that slows where the letters lean
forward. `CP2`'s polarity is fixed and never inverted: **the button is live in `s6` and the finger never lands on
it, and the screen goes dark for **1.27 s at 3.9 syl/s** (from the `tắt` press to `s7` at 18.35 s) before the notebook returns.** `CP3` is resolved without an achievement:
`s12` explicitly lets the musician go, and `s15`'s chord is **buzzing and badly fretted**, which is the point.

### 6.2 Highlight beats — exactly three (`S-02`)

| # | beat | delivery | visual | light |
|---|---|---|---|---|
| **H1** | **`s7`** — the finding (`bạn tìm thấy cuốn sổ có danh sách ấy`) | plainest possible read, almost offhand, then slower and lower with `danh sách ấy` landing as one unit and stopping | the box flap open, the clean square in the dust on the shelf, the notebook coming up **still shut**, its dust shape intact | **`L2` — the one arrival: the first warm light in the video, landing on the closed cover and the wrist** |
| **H2** | **`s10`–`s11`** — the pity (`thấy thương người đã viết ra nó` → `sẽ bận đến thế`) | `s10` close, plain, no trembling, thinning rather than swelling; `s11` the **smallest** line in the video, an observation about a stranger, the line **thinning** on `bận đến thế` and stopping | the fingertip slowing exactly where the writing hurries, then the hand coming to rest **flat on the open page and not moving for a whole line** | **`L3` — the same warm rectangle, wider: forearm, knee, page edge** |
| **H3** | **`s15`** — the chord (`một hợp âm rè nhẹ, ngón ấn chưa quen`) | warm and slightly amused, the smallest laugh in the voice and **no performed laugh anywhere**; `chưa quen` given the last emphasis of the video | the 8 cm fret macro: the low string **buzzing against the fret**, the fingertip slipping 2 mm and re-pressing, then the **string-shaped dent** in the pad | **`L4` — warmest and steadiest, plus one low warm bounce off the near strings** |

**Every shot that carries light appears above or is explicitly marked "no highlight"**: `s4`/`s6` = `L1` (the
coldest room, not a highlight), `s7` is both the re-hook and `H1` (the arrival *is* the highlight, and it is the
only beat in this packet that holds two labels), `s10`–`s11` = `L3` + `H2`, `s15` = `L4` + `H3`; `s1`, `s2`, `s3`,
`s5a`, `s5b`, `s8`, `s9`, `s12`, `s13`, `s14`, `s16`, `END` = no highlight (and `s16`/`END` carry no new light —
they are the **held `L2`/`L3`** state, warm and unchanged).

### 6.3 Sensory detail per beat — 18/18, verified against this table

`s1` the forefinger tracing the list to its full stop · **the lanyard already lying across the page at frame 0**, its coiled strap relaxing flat · **the page's lower corner lifting about 1 mm** · the badge plate covering the writing since frame 0 · the fresh dust streak · the drifting motes · `s2` the page's lower corner lifted and let
fall · the reverse side's ink showing through as reversed ghosts · one line starting like a title and stopping
mid-word · `s3` the paper's fibre denting under a finger · one line lighter than the rest from a used-up pen · the
next page's strokes as a mirror image · `s4` the hard fluorescent bar · the badge reader at the glass door · the
tray's paper stacked above its rim, the top sheet sliding · unread rows running past the bottom of the screen ·
`s5a` the thumb scrolling once and stopping · the thumb lifting off the glass and staying off · the screen's glow on
the wrist · `s5b` the screen dimmed and the guitar gone grey · the thumb motionless above the glass · the
fluorescent bar mirrored across the dormant screen · `s6` the thumb stopping 6–8 px short of the button · the
fingerprint visible in the glow under the pad · the button **not** changing state · the screen dropping to locked
grey with the fluorescent bar mirrored in it · `s7` the box flap open, tape curling · **the clean square in the dust
where the box stood** · the notebook coming up with the dust still holding its cover shape · **the bar of light
warm and moving onto the closed cover and the wrist** · `s8` the even grey-brown dust film · one finger-wide stroke pushed
into a fine raised edge · the cover darker under the stroke · motes lifting into the warm light · `s9` intact
un-faded ink · the fold-line crossing the writing without breaking a stroke · **one mote landing and not being
brushed away** · `s10` the torso from behind, knees up, notebook on one knee · the finger **slowing where the
writing hurries** · the finger stopping mid-line and staying · the warm bar on the forearm and page edge · `s11`
the **open** notebook · **the hand flat on the open page, unmoving for the whole line** · nothing else moving but the
motes · `s12` the knee dipping and the torso rising out of frame · the hand carrying the open notebook down off the
knee and letting go · the warm bar on the settled page · the lanyard back in the lower third · `s13` the page edge
riffled and settling · **a single low note struck off-camera and left to ring** · the warm bar on the boards beside the
squared page · `s14` six nylon strings and one fret at
under 10 cm · the finger releasing pressure by mistake and pressing again · the string giving under the pad ·
`s15` the low string **buzzing against the fret** · the fingertip slipping 2 mm and finding the fret · the warm
bounce off the near strings · **the string-shaped dent in the pad** · `s16` the open notebook, the phone face-down ·
the smear of dust still holding the shape of the box · the fingers curling once at the last syllable · `END` the
same frame holding, motes still drifting.

**The video has at least one see-or-hear detail in every beat including the silent one**, and **two sounds that are
not words**: the off-camera low note at `s13`, and the buzzing chord at `s15` (both for the audio branch —
`assets-manifest.md` must licence them; neither is a spoken cue).

### 6.4 Who acts, and when they are introduced (`H-04`)

| actor | introduced | acts |
|---|---|---|
| the hand / the reader (no face, no age, no gender, `U1`) | frame 0 (the dust streak is already made) | every physical beat in the video |
| the lanyard — **badge plate and strap, two different things** | frame 0, **already off a head and lying across the open page, its strap still relaxing flat** | **the plate** is on the page at frame 0 and **never lands again**; **the strap** finishes relaxing flat in `s1` → straightens onto a torso at `s4` → hangs in the office at `s6` → lies in the lower third at `s12` → lies at the **lower-left, plate centre y ≈ 1450–1620, fully above y = 1710 — badge plate face-up, outside the warm bar, small** at `s16` and in the `END` card (if the strap runs off-frame, the plate does not) |
| the notebook | frame 0, **open** | traced `s1` · corner lifted `s2` · examined `s3` · **closed** — lifted out of the box `s7` and dusted `s8` · **opened at the same page** `s9` · read `s10` · hand flat on the **open page** `s11` · carried down off the knee and **left open on the boards** `s12` · squared **edge-first, open** `s13` · **open** `s16`. **It is open on screen from frame 0 to `s3`, shut off screen across the `s3`→`s7` cut (which cuts back to the present finding, not forward) — nobody is seen closing it — and opened exactly once, at `s9`** |
| the off-camera note at `s13` | `s13` — heard, never seen | makes the `s15` chord possible **without ever explaining where the instrument came from** (`U2`) |

There is **no anonymous hand**, no voice-over character, no second person and no narrator figure anywhere in the
video. Nothing that acts in the second half was not introduced in the first.

### 6.5 Climax ≠ CTA · silent hold · determinism

The **climax is `s15`** (the video's only sound payoff: one buzzing chord) and **`s16` is the close** (the meaning
sentence). **There is no call to action in this video at all** — no follow, no comment, no handle, no advice, no
"hãy thử", no end-card sign-off — so the rule that climax and CTA never share a shot is satisfied trivially and is
recorded here as a deliberate absence rather than an omission. The **silent hold after the closing line** is
`s16`'s 0.55 s hold plus the **2.80 s** END card = **3.35 s** of real silence, with only the image continuing.
Nothing in §3 requires wall-clock time or unseeded randomness (§2.3).

---

## 7 · The five `[ADD]` lines, and why they are not the owner's

| key | line | syl | one-line justification |
|---|---|---:|---|
| `s3` | `Trang giấy mỏng quá, chữ viết tay, viết dở.` | 9 | The owner's account names the notebook but never the page. Without a macro on the paper, `s2`'s list exists only as a claim; with it, `CP1` becomes physically comparable between `s2` and `s10`. **No colour word is spoken** — the blue ballpoint is `I4`, a labelled design choice, and it stays **image-only** (`A1`); `quá` is the spoken hinge that keeps the line a clause rather than a list. |
| `s4` | `Sáng nào cũng quẹt thẻ, hộp thư đầy.` | 8 | The owner's `Rồi bạn đi làm.` is four syllables and is the video's whole cause. This line is that cause staged as a **worn routine** (research §4 item 6), so the badge plate that is **already on the list at frame 0** has something to have won. No title, company or number (`U1`). |
| `s6` | `Ngón tay khựng trước nút Mua ngay, rồi tắt màn hình.` | 11 | The owner's line 4 is the deferral **thought**; this makes the thought cost something visible, and it is **`CP2`'s second member**. It is carried as inference **`I1`**: the finger stops **before** the button, so nothing is bought (`U2`). `trước` is load-bearing — `trên` would say the finger is on the button. |
| `s8` | `Bụi phủ kín hết bìa, tay kéo vệt qua.` | 9 | The object has to be shown to have been **out of sight for years** for `s7`'s warm light to mean anything. The dust streak is also the video's cheapest piece of proof that the hand in this video is the same hand as in frame 0. `hết` is the spoken hinge. |
| `s15` | `Một hợp âm rè nhẹ, ngón ấn chưa quen.` | 9 | The owner's lines 11–12 promise a chord; nothing in the account says it succeeds. The buzz and the dented finger pad are grounded in `F8` (`S3`), and the imperfection is what makes `s16`'s "for joy" true rather than rhetorical. |

All five are sensory or action observations in the owner's own vocabulary, none is a summary of an owner line, and
none invents an event the account does not contain. All are counted in the 175-syllable total and in every second
figure in §1.

**Cost, stated plainly.** Owner lines alone are 129 syl = **33.08 s at 3.9 syl/s** (129 ÷ 3.9), which needs
**16.92 s** of silence to clear the 50 s floor (50.00 − 33.08); the five `[ADD]` lines bring that down to the 11.20 s
of named silence in §5. The `[ADD]` budget is **46 syl = 26 % of the spoken text** (46 of 175, and 175 − 129 = 46),
and it is deliberately spent on **paper, office and fingers** —
never on a feeling, never on a lesson, and never on the ending.

---

## 8 · END card (`F-13`, `F-09`, `NEW-07`)

The owner's topic line is **on screen only, silent**, in two stacked elements across a 2.80 s static card:
`Có những giấc mơ` (4 words) / `bạn đã âm thầm từ bỏ` (6 words). **Both elements are within this video's ≤ 6-word
on-screen cap, so this packet declares no cap exception** — unlike `ban-khong-yeu-duoi-chi-da-manh-qua-lau`, whose
END card needs one. The card carries no CTA, no handle and no sign-off.

**Contingency, recorded (`F-09`).** If the owner asks for the topic line to be **spoken**, it becomes an 18th key
of **10 syl = 2.56 s at 3.9 syl/s**, inserted **before the END card, not inside it** — the card stays a separate
silent shot. Arithmetic: `56.07 + 2.56 = 58.63 s`, still inside the owner's 50–60 s, with the card's full 2.80 s
preserved. **No figure in this contingency is a timeline number**: the plan's totals stay 50.97 / 52.87 / 56.07 /
58.50 / 59.81 s until the owner decides, and §1 is recomputed at the measured rate only if they do. The owner's
wording is never dropped to make room and the silent tail is never silently cut to zero.

---

## 9 · Voice route and rate provenance (`A-C1`, `F-06`, `NEW-03`, `NEW-4`)

**Route 2, local VieNeu-TTS clone, reference `docs/giac-mo-tu-bo/voice-ref/thanh-long-nang-cao-ref.wav`** —
filled into all 17 `reference` fields in `voice-performance.proposed.json` and mirrored in
`voice-direction.md` §Voice reference.

- **The route is a Phase 0 fact, not an agent choice**: the owner authorised cloning **Thanh Long Nâng Cao** in the
  monitor on 2026-10-18 (`request.md`), `status.json` already carries `voice: "thanh-long-nang-cao"`, and the
  preview `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3` exists on this machine (confirmed by listing
  the directory; Phase 0 preflight recorded it decoding as a **35.93 s** mp3). A same-named ref file already exists
  for another video (`docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/voice-ref/thanh-long-nang-cao-ref.wav`),
  which is why this packet uses that naming convention.
- **What is still pending, stated plainly:** `docs/giac-mo-tu-bo/voice-ref/` **does not exist yet**, so the
  reference does not exist yet either. `voice-performance.proposed.json` therefore carries
  `referenceSelectionStatus: "pending"` on all 17 shots with the reason, and **`voice-agent` cuts the 6–8 s,
  single-speaker, music-free WAV** from the preview into that exact path. Nothing in this packet claims the file
  exists, and nothing calls any reference "verified".
- **Reference handling (`NEW-4`).** The pinned path is the synthesis reference and is used **unmodified** by
  `gen-voice-clone.py` (it carries no `startSeconds` / `durationSeconds`). Do **not** create a second reference file
  under a different name: the sidecar is read-only for `voice-agent`, so a new filename would be invisible to the
  contract and the run would silently use an uncropped or wrong take.
- **Left to `voice-agent`:** listen to the preview before cutting, keep all 17 shots on one voice, run the CER/ASR
  gate, and report the measured per-clip rate that replaces §1's planning figures.

**What 3.9 syl/s is (`NEW-03`), with the evidence named.**
- **4.1 syl/s is a planning convention, not a measurement of this video.** The only trace of it I could find in this
  repo is a **quotation** inside `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/script-review.fidelity.md:502`, which
  quotes a file that no longer exists in this repository; that absent file is not claimed to exist and **no first-hand
  4.1 measurement is claimed** (`A4`). So 4.1 is not used as the plan.
- **The same voice has been measured in this repo.** `docs/thuong-hay-so-bat-dau-lai/voice-report.md:34` reports
  **207 syllables over 52.6 s = 3.9 syl/s** for the identical Thanh-Long clone, with per-clip values from
  **3.58 to 4.22** (lines 17–27 of that file). `docs/chung-minh-de-lam-gi/voice-report.md` — also the same ref file
  — shows the same engine's spread is wider still: **3.17** (`s9a`) to **4.45** (`s6`).
- **Therefore 3.9 syl/s is the measured average of this voice, and 3.6–4.4 is the band this plan *models*** — the same
  engine has measured **3.17 to 4.45** across the same-voice clips in this repo, so 3.6–4.4 is a planning window placed
  *inside* the observed spread, not a claim about what this run will produce. It is not a stylistic slowdown either.
  The intimate register of this video is carried by **holds, light and emphasis**, and by nothing that requires the
  engine to change pace.
- **Nothing in this packet calls a planning figure "measured".** Every measured number above carries its
  `voice-report.md` citation, and §1's totals are marked as plan values that the measured clips replace.

**Join rule (`F-05`).** Phrase texts in the sidecar are joined with **exactly one space**:
`" ".join(phrase.text) == voice.json[key]`, byte-for-byte, verified before generation (`voice.json` is the accepted
Phase-3 copy of `voice.proposed.json`, and it is what the voice-agent actually reads). Every phrase
boundary in this packet falls on a canonical space, so an assembler that joins with `""` would merge two words and
fail the CER gate.

---

## 10 · Acceptance check (self-run, `script-agent`)

| check | result |
|---|---|
| Syllable count per shot and total | **175** — the §1 table per key, and `Σ` = 44.87 s of speech at 3.9 syl/s |
| Estimated seconds per shot and total, including planned pauses | per-key slot column in §1; totals **50.97 / 52.87 / 56.07 / 58.50 / 59.81 s** at 4.4 / 4.2 / 3.9 / 3.7 / 3.6; identity `175 ÷ rate + 11.20` verified at all five rates |
| Duration inside the owner's 50–60 s | ✅ for every rate 3.586–4.510 (§1.1); outside it §5 applies and §5 states the honest bounds |
| Every `source` cell resolves to research | ✅ — each row cites owner line numbers (`S1`) or a named fact; the two recreated screens carry `minh hoạ` (§2.5) |
| Keys in `voice.proposed.json` match the table | ✅ 17 keys, same order, no extra key, `END` has no voice key |
| Keys in `voice-performance.proposed.json` match `voice.proposed.json` | ✅ 17 identical keys |
| Concatenated performance phrases exactly equal each canonical line | ✅ **33 phrases** across 17 keys; `" ".join(...)` equals the canonical string byte-for-byte for every key, and every phrase boundary falls on a canonical single space |
| Acting directions appear in neither narration nor captions | ✅ — every direction lives only in this file's `delivery` column, in `voice-direction.md` and in the sidecar's intent/emotion/tempo fields; §4's caption chunks are the canonical words and nothing else |
| **Every key with a voice line has a mute-complete text path, except the one named carve-out (`s1`)** — **16/17 ✅** | ✅ (`B4`, `B5`) — **14 caption keys + 3 headline keys (`s1`, `s5b`, `s15`).** The 14 caption keys carry **literal substrings** of their canonical line. `s1` is the **one named carve-out**: its second sentence `Rồi bạn đi làm.` is **never printed**, so `s1` is **not** fully readable as text — it is carried **by the badge lying on the list at frame 0 and by `s4`**, and `s1`'s on-screen string is its headline only. `s15` is the one key that needs **both** layers, and its second clause `ngón ấn chưa quen.` is drawn as a caption after the headline clears. The only two departures (`s1` drops `mình`; `s15`'s clause moves from headline to caption) are named in §4 |
| Hook clear within 3 s | ✅ **for a measured rate ≥ 3.667 syl/s** (2.50–2.97 s at 4.4–3.7). At the band edge 3.586 it is **3.07 s** and at the observed floor 3.17 it is **3.47 s** — **the spoken ≤ 3 s claim is conditional and is written that way in §1.1**. The **frame-0 headline** is the rate-independent guarantee: the sound-off hook lands at 0.00 s at every rate (`B8`) |
| Frame 0 = cover, no fade from black | ✅ §2.2, one canonical paragraph, reproduced in `brief.md` §Hook and `hook-options.md` §H1 §1 |
| Re-hook at 15–20 s, named | ✅ **`s7`**, 16.52–19.70 s across the modelled band |
| Specificity & emotional impact sub-score | **≥ 9 claimed on this basis**: every one of the 18 beats has a named see-or-hear detail (§6.3); the turn is carried by a named contrast pair (`CP1`, §6.1); and the video **moves** rather than informs — it gives the viewer an object they already own (`s2`), makes it pity them (`s10`–`s11`), lets them stop wanting the career (`s12`) and lets a buzzing chord be enough (`s15`), then refuses the debt out loud (`s16`). The reviewer scores this independently; this is the claim, not the verdict. |
| Silent hold after the closing line | ✅ 3.35 s of real silence (`s16` 0.55 + END 2.80) |
| Climax and CTA never share a shot | ✅ no CTA exists anywhere; climax `s15`, close `s16`, silent card `END` (§6.5) |
| ≤ 3 named highlight beats | ✅ exactly three (`H1`,`H2`,`H3`, §6.2) |
| `U1`–`U5`, `I1` obeyed in every frame | ✅ camera law (§2.3), instrument rule (§2.4), `minh hoạ` (§2.5), no song titles, no musical future, no purchase |
| **Frames 0–15 contain a named non-mote motion (`B3`)** | ✅ the forefinger enters from the lower right inside the first **0.5 s** and begins tracing the first line; **gate D's hook strip must show it** — a strip whose first three frames contain only dust motes fails this row |
| **END card does not re-open the wound (`B6`)** | ✅ the card is the video's **title over a resolved image**: text only, the warm light and the flat hand unchanged from `s16`, no new object, no new sound. It restates the *premise* (`Có những giấc mơ` / `bạn đã âm thầm từ bỏ`) after `s16` has already refused the debt, so it must read as a title, not as a verdict. **Gate E confirms no grief is re-introduced**; if it reads as an accusation, **the card is never cut** — the owner's topic line is not deleted for a presentation problem. The fallback is to **reduce the type weight and shorten the dwell**, or to **move the card earlier over the same resolved image** (same two strings, same image, lighter and sooner). **If gate E still insists, escalate to the director**; the owner's wording outranks the card's treatment |
| **The `s2` page and the `s10` page are recognisably the same page (`B7`)** | ⏳ **not provable from this document.** Two readings carry the video's specificity — the cover collision at phone size, and the page identity between `s2` and `s10` — and both are render-only. **Gate D** proves the first on `out/qa/<vid>-cover.png`; **gate E (or the scene stills)** proves the second with frames recorded **side by side**, same line positions, same fold-line, same dust shape. Until those frames exist this row is open |
