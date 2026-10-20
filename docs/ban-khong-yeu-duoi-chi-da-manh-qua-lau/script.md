# Script: Bạn không yếu đuối, bạn chỉ đã mạnh mẽ quá lâu

**Video ID:** ban-khong-yeu-duoi-chi-da-manh-qua-lau · **Profile:** story · **Comp:** `BanKhongYeuDuoiReel` · 9:16 1080×1920 @30 fps
**Duration:** 45–55 s (owner explicit override; speech + pauses + transitions + ending hold) — **planned total 48.90 s** at the 3.9 syl/s planning rate, **46.58 s** at 4.2 and **50.66 s** at 3.7.
**Hook:** candidate **H1** (`hook-options.md` §H1). **Re-hook (named): `s4`, clip starts 19.02 s** (17.93 / 19.02 / 19.86 s at 4.2 / 3.9 / 3.7 syl/s — inside 15–20 s at every rate in the band).
**Keys: 13 spoken, played back in file order — `s1 · s2a · a1 · s2b · s3 · a2 · s4 · s5 · s6 · s7 · s8 · s9 · s10`**
`s1`–`s10` are the owner's ten mandatory lines, verbatim, in the owner's original order; `a1` and `a2` are the only two `[ADD]` connectors left (§7). Three shot rows carry **no voice key**: `img1` (the deletion, staged in `s5`'s hold), `img2` (the umbrella tilt, staged in `s9`'s hold) and `END` (the silent title card).

---

## 1 · Timing budget

**Unit:** `syl` = space-separated token (repo unit). **Planning rate: 3.9 syl/s for every key** — one planning figure, chosen for the *gentle, intimate, never theatrical* register the brief asks for. Expressiveness comes from holds and emphasis, not from invented per-key rates: a cloned voice cannot change pace and a per-key rate column would be an unverifiable claim. See §9 for what "3.9" is and is not.

**Unified silence model (this section and `voice-performance.proposed.json` agree):** every pause is a timeline hold applied by the timeline/Reel layer. Each clip (key) contains spoken text only — no WAV padding, no `silencePadding`. `pauseBeforeSeconds`/`pauseAfterSeconds` are holds between phrase segments inside the key's slot; `minimumPostClipHoldSeconds` is the hold after the clip; the END card is the closing hold.

**The identity every number below obeys:**

```
planningTotal(rate) = Σ(syl_k ÷ rate) + Σ(phrase-gap holds) + Σ(post-clip holds) + END card
                   = Σ(syl_k ÷ rate) +   2.54 s          +      10.60 s       +   3.20 s
                   = Σ(syl_k ÷ rate) + 16.34 s of timeline holds
```

| # | key | syl | speech s | pause after (inside clip) | clip end s | post-clip hold s | next start s | start s |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | s1 | 11 | 2.82 | 0.22 | 3.04 | 0.30 | 3.34 | 0.00 |
| 2 | s2a | 9 | 2.31 | 0.28 | 5.93 | 0.25 | 6.18 | 3.34 |
| 3 | **a1** · the payoff | 10 | 2.56 | 0.24 | 8.98 | 0.30 | 9.28 | 6.18 |
| 4 | s2b | 9 | 2.31 | 0.00 | 11.59 | 0.35 | 11.94 | 9.28 |
| 5 | s3 | 15 | 3.85 | 0.26 | 16.05 | 1.05 | 17.10 | 11.94 |
| 6 | a2 | 6 | 1.54 | 0.14 | 18.77 | 0.25 | 19.02 | 17.10 |
| 7 | **s4** · RE-HOOK | 8 | 2.05 | 0.24 | 21.32 | 0.40 | 21.72 | **19.02** |
| 8 | s5 | 7 | 1.79 | 0.18 | 23.69 | **1.70** (stages `img1`) | 25.39 | 21.72 |
| 9 | s6 | 8 | 2.05 | 0.18 | 27.62 | 0.50 | 28.12 | 25.39 |
| 10 | s7 | 12 | 3.08 | 0.24 | 31.44 | 0.60 | 32.04 | 28.12 |
| 11 | s8 | 3 | 0.77 | 0.00 | 32.81 | 1.80 | 34.61 | 32.04 |
| 12 | s9 | 14 | 3.59 | 0.26 | 38.46 | **1.30** (stages `img2`) | 39.76 | 34.61 |
| 13 | s10 | 15 | 3.85 | 0.30 | **43.90** | 1.80 | 45.70 | 39.76 |
| 14 | END | 0 | 0.00 | 0.00 | — | **3.20** | **48.90** | 45.70 |
| | **TOTAL** | **127** | **32.56** | **2.54** | | **10.60** | | |

**`clip end s` includes the key's phrase-gap holds — timeline holds between phrase segments inside the key's slot. The WAV clip itself ends at the last syllable; `post-clip hold s` is the Reel-layer gap to the next key.**

**Owner lines 111 syl · `[ADD]` connectors 16 syl · total 127 syl · silence 16.34 s (33.4 % of runtime).**

**Worst case at 3.7 syl/s (cap check — must be ≤ 54 s, i.e. ≥ ~1 s headroom under the 55 s owner cap):**
- Speech: 127 syl ÷ 3.7 = 34.32 s — owner lines 111 syl ÷ 3.7 = 30.00 s, `[ADD]` connectors 16 syl ÷ 3.7 = 4.32 s
- Timeline holds: phrase-gap holds 2.54 s + post-clip holds 10.60 s (sum of `postClipHoldSeconds`) + END card 3.20 s = 16.34 s
- **Total: 34.32 + 16.34 = 50.66 s ≤ 54 s ✅** — 4.34 s headroom under the cap. Across the band: 46.58 s at 4.2 syl/s, 48.90 s at 3.9 syl/s, 50.66 s at 3.7 syl/s — all inside 45–55 s and under the 54 s worst-case line.

**Where the clip end and the last word differ, and why.** `s10` is two phrase segments with a real 0.30 s timeline hold **between** them (Reel layer, not inside the WAV), so the clip's end is later than `start + 15 ÷ rate`. The last word of the video is `s10`'s clip end, because the timeline hold sits between the two segments, ahead of the question — not after it:

```
lastWord(rate) = s10Start(rate) + 7 ÷ rate + 0.30 (clause gap) + 8 ÷ rate
               = 41.58 / 43.90 / 45.66 s   at 4.2 / 3.9 / 3.7 syl/s
```

### 1.1 Rate band, break-even, and the structural marks at every rate

| measured rate | speech = 127 ÷ rate | + 16.34 s silence | **total** | inside 45–55 s |
|---:|---:|---:|---:|---|
| **4.2 syl/s (fastest modelled)** | 30.24 | 16.34 | **46.58 s** | ✅ 1.58 s above the floor |
| 4.1 syl/s | 30.98 | 16.34 | 47.32 s | ✅ |
| 4.0 syl/s | 31.75 | 16.34 | 48.09 s | ✅ |
| **3.9 syl/s (planning rate)** | 32.56 | 16.34 | **48.90 s** | ✅ |
| 3.8 syl/s | 33.42 | 16.34 | 49.76 s | ✅ |
| 3.7 syl/s (slowest modelled) | 34.32 | 16.34 | **50.66 s** | ✅ 4.34 s below the ceiling |

**Break-even rates.** Solving `127/r + 16.34 = 45` gives **r = 4.43 syl/s**; solving `127/r + 16.34 = 55` gives **r = 3.285 syl/s**, rounded to **3.29**. The packet is therefore inside 45–55 s for any measured rate between **3.29 and 4.43 syl/s**, which brackets the whole 3.7–4.2 modelling band with margin on both sides. Outside it, §5's elasticity applies — never audio speed, never a cut owner word.

**Structural marks, recomputed at each rate.**

| mark | 4.2 syl/s | 3.9 syl/s | 3.7 syl/s | contract |
|---|---:|---:|---:|---|
| hook complete (`s1` last syllable) | **2.62 s** | **2.82 s** | **2.97 s** | ≤ 3 s ✅ |
| **first staged payoff** = `a1` sentence 1, `Vai người khác nhẹ xuống.` — **last word** | **7.00 s** | **7.46 s** | **7.81 s** | < 8 s ✅ |
| owner line #2 complete (`s2b`) | 10.88 s | 11.59 s | 12.13 s | — |
| **re-hook `s4` clip starts** | **17.93 s** | **19.02 s** | **19.86 s** | 15–20 s ✅ |
| **last word of the video** (`s10` clip end) | **41.58 s** | **43.90 s** | **45.66 s** | — |
| END card starts | 43.38 s | 45.70 s | 47.46 s | — |
| **total** | **46.58 s** | **48.90 s** | **50.66 s** | 45–55 s ✅ |

**Hook / re-hook confirmation at 3.7–4.2 syl/s:** hook complete (`s1` last syllable) is 2.62 s at 4.2 syl/s and 2.97 s at 3.7 syl/s — inside the 3 s budget at every rate ✅. Re-hook `s4` clip starts at 17.93 s (4.2 syl/s) and 19.86 s (3.7 syl/s) — inside the 15–20 s contract window (and the tighter 16–20 s band) at every rate ✅.

**The payoff's measurement convention, stated once.** The contract figure is the **last word** of the payoff sentence (the criterion `H-01`'s acceptance check names). `a1` sentence 1 is followed by a 0.24 s clause gap, so the *next* phrase inside `a1` begins at **7.24 / 7.70 / 8.05 s** — inside the window at 4.2 and 3.9 syl/s, and 0.05 s past it at the slowest modelled rate, which is stated here rather than rounded away.

One beat is called the **payoff** in this document and nowhere else: **`a1`**. `s2a` is not a payoff — it is the setup the payoff lands on.

---

## 2 · Staging contract

### 2.1 Light plan — published once, here (`H-03`, `S-02`, `A-L14`)

One arrival, four ordered states. `voice-direction.md`, `hook-options.md` and the shot table reference these ids; they never re-describe or re-claim an arrival.

| id | where | state |
|---|---|---|
| **L0** (baseline, present from frame 0) | `s1` | The street's own cold-warm sodium lamp behind her, and one lit apartment window across the street. This is the world, not the turn — it is already there in the cover. |
| **L1** — **the one arrival** | `a1` | A warm sliver from the kitchen doorway reaches the edge of her collar where the hallway is dark. Small, narrow, unexplained. |
| **L2** | `s7` | The same sliver, now on her hands and on the closed umbrella. Slightly wider. Still unexplained. |
| **L3** — **the palette turns here** | `s9` → `img2` | Full warm rim on the wet fabric; the navy drains out of the frame. |
| **L4** — warmest | `s10` | Warmest and steadiest in the video, two sources (the doorway sliver + the lit window now on this side). |

Exactly one "first" exists in this packet: **L1**. `s7` and `s9` are states of the same sliver, not new arrivals.

### 2.2 Frame 0 = cover — canonical description (`H-02`, `NEW-1`, `F-14`, `S-05`)

This paragraph is the single source of the cover. `hook-options.md` §H1 §1 and `brief.md` §Hook reproduce it **word for word**; gate D proves it reads at phone size on `out/qa/<vid>-cover.png` with the audio muted.

> Frame 0 **is** the cover — already composed, no fade from black, no logo, no title animation. 9:16 night street, mid-shot. **She holds the black umbrella out over the person beside her — a child, about her shoulder height — and it is tilted a few degrees toward them, so the rim's shadow falls across them and not across her.** Her right shoulder and the outside of her sleeve are already dark with rain, a wet stripe from shoulder to elbow; **she has not noticed and does not adjust.** The child's shoulder under the rim is dry. The contrast is carried by value and sheen rather than by a caption: **a wet sheen and a darker tone down her right sleeve, matte and dry on the child's coat and on the shoulder under the rim; wet sheen on the pavement below.** Water beads on the rim and drips off the lower edge. **Across the street one lit apartment window glows warm — a warmth she is not standing under.** One cold-warm sodium street lamp behind; deep navy and soft grey everywhere else. Slow push-in 1.00→1.03.

- **Exactly one figure is wet: she is.** The child's coat and the shoulder under the rim are matte and dry; the pavement is wet. No sentence in the paragraph contradicts any other, and the polarity matches what `s9`/`img2` later pay.
- **Action in progress**: the umbrella is being tilted toward the child and is already failing to cover her — the tilt is mid-motion, and water is actively beading and dripping off the rim (that drip, not the tilt, is the strongest motion in the frame at phone size).
- **The thesis is visible at thumbnail scale**: one dark wet stripe down her sleeve against the child's dry, lighter shoulder, separated by the rim's shadow. It must read as a tone and sheen difference, not as a caption.
- **The through-line object and body part are named here and never contradicted later**: the *same* black umbrella with the scuffed metal tip, and **her right sleeve/shoulder**, appear in `s7` (furled in her lap), `s9` (the wet patch spreading from that same sleeve), `img2` and `s10`. The child stays dry for the whole runtime; only her side gets wetter.
- **Cover headline** (upper third, safe zone, nothing in the bottom 210 px): **`Ai che ô cho bạn?`** — 5 words, a question, and **not** a compression of the spoken line (`H-07`, `S-05`). It holds from frame 0 and **clears on the `s1`→`s2a` boundary**, leaving the caption layer alone; `content-agent` and `design-spec.md` must treat that clear as a frame-accurate event.

### 2.3 Hero asset class (`F-07`, `NEW-06`, `A-L12`)

The hero is **one consistent stylised figure built as vector/SVG plates and typography — no photograph, no live-action plate, no photoreal face, no stock footage.** Every micro-action in §3 is expressed as a frame-driven property of that figure, not as a photograph:

| micro-action in §3 | how it is delivered from frames only |
|---|---|
| the wet sleeve in frame 0 / the child's dry shoulder | value + sheen layers on the figure's shoulder and sleeve shapes; `wetness` is one scalar `0..1` per figure |
| **the wet patch spreading on her collar** | **one seeded asset, one scalar, continuous across `s9` → `img2` → `s10`** — seeded per video, never re-seeded per shot, and starting from the value already set in frame 0 |
| her shoulders/head under the hand at `a1` | shoulder line endpoints interpolated on the figure |
| the second person's mouth and head at `s2a` | mouth shape + head plate as part of the figure's head geometry, driven by the same scalars |
| **eyes / a mouth on a stylised figure** | **two eye dots and a mouth shape drawn as part of the head plate**, driven by the same `wetness` and blink scalars — expressive without a rendered face |
| rain beading and dripping off the rim | rim bead markers on a fixed phase function of the frame index |
| the blinking cursor | frame-index parity |
| the street lamp broken into moving dots | deterministic scatter on frame index |
| the umbrella tilt (`img2`) | rim rotation on the same seeded umbrella asset |

No shot in §3 requires `Date.now()`, `Math.random()`, a live video or an actor. **How the profile rubric's "expressive close-ups" (`brief.md` §Visual identity) are delivered without a face:** by framing, posture, light and the still-life of the frame — push-in on the head plate at `s3`, the over-the-shoulder at `s4`, the widening doorway at `a1`/`s2b`, the shoulder line, the hand on the umbrella handle. The expression the rubric asks for is carried by those, not by a rendered face.

---

## 3 · Shot table

On-screen text = headline layer, ≤ 6 words per element, safe zone. Caption chunks: §4. "image = design" cells are staging, not claims.

| # | seconds (syl · speech · slot) | spoken line | on-screen text | image / action | accent words | delivery | source |
|---|---|---|---|---|---|---|---|
| **s1 · HOOK · COVER · frame 0** | 11 · 2.82 · 0.00–3.34 | Mọi người thường tìm đến bạn mỗi khi có chuyện buồn. | `Ai che ô cho bạn?` (5 words, complete at frame 0, clears on the `s1`→`s2a` boundary) | **Exactly §2.2.** The umbrella tilted toward the child, her right sleeve already wet, the lit window across the street | tìm đến bạn · chuyện buồn | Curious, recognising — someone who has noticed a pattern about you, not consoling you yet. Brisk on `Mọi người thường`, then `tìm đến bạn` settles slower; the last two words land together and stop. **A 0.22 s clause gap sits between `bạn` and `mỗi` (sidecar `pauseAfterSeconds`)**; no breath before the clip, none after the last word | owner **#1** — verbatim; research hook #1. Image = design (§2.2) |
| **s2a** | 9 · 2.31 · 3.34–6.18 | Bạn biết cách an ủi. Biết phải nói gì. | `Bạn luôn biết phải nói gì.` (6 words — this key's own beat, not `s2b`'s) | Kitchen doorway of the same night: **she finishes their sentence before they say it** — their mouth is still open when they nod; a glass of water sits in front of them, and **her own glass on the table is untouched and empty** | an ủi · nói gì | Reassuring, matter-of-fact. Two statements, each landing on its own; the second slightly quicker. **Not the payoff** — this is what the payoff lands on | owner **#2**, first half — verbatim, split for the real 0.25 s gap before `a1` (`H-01`). Image = design |
| **a1 · [ADD] · THE PAYOFF** | 10 · 2.56 · 6.18–9.28 | Vai người khác nhẹ xuống. Còn bạn thì đứng ngoài. | `Còn bạn thì đứng ngoài.` (5 words) | Same shot one beat later: the other person's shoulders visibly drop; the empty glass in front of them is still theirs; **her own glass is still untouched and empty where she left it** (re-shown, `S-01`). **Light L1: a warm sliver from the doorway reaches the edge of her collar** | nhẹ xuống · đứng ngoài | Observational, said the way you notice something. Level on the first sentence; `Còn bạn thì đứng ngoài.` slightly lower. **This is the video's first concrete payoff and the only beat called one** | **[ADD]** sensory line, `script-agent`: it stages the effect `s2a` only asserts, and it **is** CP1, the pair the turn lands on (§6) |
| **s2b** | 9 · 2.31 · 9.28–11.94 | Biết làm sao để người khác thấy ổn hơn. | `Người khác thấy ổn hơn.` (5 words) | The same doorway, pulled back one step: the other person's head has come up off their hands, their shoulders are down, their hand has finally closed around their own glass; **her own glass is still where she left it, untouched and empty.** She is already half-turned toward the hall | thấy ổn hơn | Even and unhurried. **This clause settles after the payoff, it does not compete with it** — no extra weight or slowing beyond a natural emphasis on `thấy ổn hơn` | owner **#2**, second half — verbatim. Image = design |
| **s3** | 15 · 3.85 · 11.94–17.10 | Nhưng có một tối, chính bạn lại ngồi rất lâu trước màn hình điện thoại. | `Chính bạn ngồi trước màn hình.` (6 words) | Hard cut: the same hand now holding a phone; **the scuffed black umbrella, furled, drips onto the floor by the door**. Push slowly into her head lit **only** by the screen; the black screen reflects her head as a dark shape; the cursor blinks in an empty chat box; rain runs down the glass behind her, out of focus. **In the 1.05 s hold after the clip: the cursor blinks twice more and the screen dims once** — that hold has a named visual, it is not empty air | một tối · rất lâu · trước màn hình điện thoại | The hinge of the video. `Nhưng` plainly, no drama; slow through `ngồi rất lâu` so the duration is audible; the last clause lands flat | owner **#3** — verbatim. Image = design. **Light L0 only** |
| **a2** | 6 · 1.54 · 17.10–19.02 | Ngoài cửa sổ, mưa rơi đều. | — | Hold on the window: rain hitting the glass, the sodium lamp broken into moving dots on the water; inside, her head is only a dark shape at the edge of frame | mưa rơi đều | Quiet, close — said as if the narrator had just noticed it, still to one listener, never stage-voiced. Even, unhurried | **[ADD]** sensory line, `script-agent`. The rain motif derives from the owner's own umbrella metaphor (line #9); **the window and the rain-as-sound are produced staging, not the owner's wording** (`F-04`) |
| **s4 · RE-HOOK** | 8 · 2.05 · **19.02–21.72** | Bạn muốn nhắn: 'Hôm nay mình mệt quá.' | chat bubble, recreated UI, label `minh hoạ`: `Hôm nay mình mệt quá.` | Over-the-shoulder on the phone: the characters appear one by one in the input box; **her thumb hovers and does not press send**; the lit window from the frame-0 street is still visible across the road, far away | mệt quá · nhắn | **The re-hook — hesitant, intimate, the words she almost sent.** The quoted message is said in her imagined voice, slightly softer than the narration; `mệt quá` once, without repetition, then nothing | owner **#4** — verbatim. UI bubble = recreated → `minh hoạ` |
| **s5** | 7 · 1.79 · 21.72–25.39 | Rồi nghĩ một lúc, bạn lại thôi. | `Sao lại thôi?` (3 words) | Her hand stays on the phone; she pulls her knees up; the room is very dark; only the rain texture on the wall | nghĩ một lúc · lại thôi | Soft, rueful — a small shrug said out loud, not self-pity. Light on the first clause, then `bạn lại thôi` settles down and does not rise | owner **#5** — verbatim |
| **`img1` · `Xoá từng chữ.` · internal row name, not rendered · image only · NO VOICE KEY** | 0 · 0.00 · staged inside `s5`'s 1.70 s hold | *(silence — the owner's account contains no deletion and this video asserts none)* | `—` (no on-screen text; the deletion is in the image) | **The give-up is staged, not narrated:** backspace pressed, the characters vanish one by one until the box is empty; her hand hesitates, then turns the phone face-down; the black screen shows her head as a dark shape | — | No voice. The 1.70 s hold is the whole beat | **image = design (staged), no voice key** (`F-01`, `NEW-01`). The owner's line #5 says only `bạn lại thôi` |
| **s6** | 8 · 2.05 · 25.39–28.12 | Không phải vì không có ai để nhắn. | `Không phải vì không có ai.` (5 words) | **This is the shot `s10` will pay.** The screen lights again with an incoming call from a **saved name**, one ring; she looks at it, does not answer, lets it stop. Her head in the phone glow. The saved name is legible at phone size and is never named | không có ai | Correcting an assumption — gentle, direct, looking at the viewer. Level on the first four words, then a slight emphasis and a small lowering | owner **#6** — verbatim. Incoming-call UI = recreated → `minh hoạ` |
| **s7** | 12 · 3.08 · 28.12–32.04 | Mà vì bạn đã quen với việc mình phải là người ổn. | `Bạn đã quen làm người ổn.` (6 words) | The rain outside stops without her noticing; she picks up the furled scuffed umbrella, holds it in her lap, **does not open it**; **her untouched-empty glass from `s2a` is still on the table behind her, untouched** (`S-01`). **Light L2: the doorway sliver is now on her hands and the closed umbrella, slightly wider** | đã quen · phải là người ổn | **The gut punch — the truest line in the video, so it must be the plainest.** Start almost offhand, `quen` unstressed — she does not know she is confessing anything — then land `phải là người ổn` slowly and quietly; the last two words drop in volume and **stop**; they never fade to a whisper | owner **#7** — verbatim. Image = design. **CP3** (§6) |
| **s8** | 3 · 0.77 · 32.04–34.61 | Bạn biết không… | — | A beat on her hands on the closed umbrella; the light holds; the room is still | không… | A breath-word, not a stage aside. Natural conversational `không…`, no dramatisation of the ellipsis, as if checking whether the other person is still there. **The 1.80 s after it is real timeline silence, not the punctuation** | owner **#8** — verbatim (owner's own `…` kept) |
| **s9** | 14 · 3.59 · 34.61–39.76 | Người thường xuyên che ô cho người khác cũng có những ngày bị ướt. | `Người che ô cũng bị ướt.` (6 words) | **The same street as frame 0 — asserted, not implied:** the same scuffed black umbrella (identical metal tip), the same child beside her under the rim (still dry), the same collar, and **her own doorway is behind her in frame**, so a viewer can answer *when* and *why* she is outside. The umbrella is open and **tilted away from her**; the seeded wet patch **spreads from that same right sleeve up across her shoulder**, darker than it was in frame 0. **Light L3: full warm rim on the wet fabric — the palette turns here** | che ô · cũng · bị ướt | Warm but honest, no poetry. Conversational through the first clause, then slow on `cũng có những ngày bị ướt` so the reversal is *audible* rather than announced; `bị ướt` lands plainly | owner **#9** — verbatim; research hook #3. **CP2** (§6) |
| **`img2` · image only · NO VOICE KEY** | 0 · 0.00 · staged inside `s9`'s 1.30 s hold | *(silence — `s9` already said it in the owner's own words)* | `—` (no on-screen text; the tilt is in the image) | The tilt completes: the seeded wet patch darkens up her shoulder, drops run off the edge of her sleeve; **the child's shoulder stays dry under the same rim**. The umbrella now shades someone else and no longer her | — | No voice. The 1.30 s hold is the whole beat | **image = design (staged), no voice key** (`F-03`). Spoken duplication removed |
| **s10** · climax | 15 · 3.85 · 39.76–45.70 | Và họ cũng cần một người hỏi: 'Hôm nay có chuyện gì với bạn thế?' | `Có chuyện gì với bạn thế?` (6 words) | **The ending pays `s6`, not a stranger** (`H-04`): the phone beside her still shows the missed call from the saved name — one ring, unanswered — and **the same hand that would have rung it twice** sets a warm cup down beside it and touches the umbrella handle so the rim tilts back over her shoulder. **She looks at the hand, then at the phone, and does not speak.** **Light L4: warmest and steadiest, two sources** | một người hỏi · với bạn thế? | The warmest and most open read in the video, and still not loud. Unhurried through `Và họ cũng cần một người hỏi`; the quoted question is **one clause, one breath, no internal pause** — said to the viewer at normal volume with a real question contour, the only rising contour here. The final `thế?` falls; it never rises into a call to action | owner **#10** — verbatim. Ends the spoken text. **CP2** (§6) |
| **END · silent** | 0 · 0.00 · **45.70–48.90** | *(no voice key — silence)* | `Bạn không yếu đuối,` / `bạn chỉ đã mạnh mẽ quá lâu.` (owner's title line, 4 + 7 words, verbatim, stacked) | The frame keeps the umbrella tilted back over her, the warm cup beside the phone, the missed call still on the screen; the rain thins. **BGM cuts on the last word at 43.90 s**; from there the audio is silent | mạnh mẽ quá lâu (on screen only) | **No voice at all.** | owner Title / theme line (`brief.md`), on-screen only — research hook #5 as the resolution. **CP2 closes here** |

---

## 4 · Caption chunks (proposal — `content-agent` locks the final set)

Each chunk ≤ 2 lines, ≤ ~28 characters per line, words reproduced word-for-word from `voice.proposed.json`. Caption box bottom edge at y ≈ 1710 px in a 1920 px frame — nothing in the bottom 210 px. The cover headline (`Ai che ô cho bạn?`) is a separate layer, not a caption chunk, and clears on the `s1`→`s2a` boundary (`S-05`).

| key | chunk 1 | chunk 2 | chunk 3 |
|---|---|---|---|
| s1 | `Mọi người thường tìm đến bạn` | `mỗi khi có chuyện buồn.` | |
| s2a | `Bạn biết cách an ủi.` | `Biết phải nói gì.` | |
| a1 | `Vai người khác nhẹ xuống.` | `Còn bạn thì đứng ngoài.` | |
| s2b | `Biết làm sao để người khác` | `thấy ổn hơn.` | |
| s3 | `Nhưng có một tối,` | `chính bạn lại ngồi rất lâu` / `trước màn hình điện thoại.` | |
| a2 | `Ngoài cửa sổ, mưa rơi đều.` | | |
| s4 | `Bạn muốn nhắn:` | `'Hôm nay mình mệt quá.'` | |
| s5 | `Rồi nghĩ một lúc,` | `bạn lại thôi.` | |
| s6 | `Không phải vì không có ai` | `để nhắn.` | |
| s7 | `Mà vì bạn đã quen với việc` | `mình phải là người ổn.` | |
| s8 | `Bạn biết không…` | | |
| s9 | `Người thường xuyên che ô cho` | `người khác cũng có những` / `ngày bị ướt.` | |
| s10 | `Và họ cũng cần` / `một người hỏi:` | `'Hôm nay có chuyện gì` / `với bạn thế?'` | |
| img1 / img2 / END | *(no caption — deliberate silences)* | | |

---

## 5 · Silence budget and elasticity (`A-T5`, `NEW-3`, `NEW-2`, `NEW-5`)

**Every one of the 16.34 s is a named beat, and every row below is a timeline hold applied by the Reel layer.** The "inside clip" positions are holds between phrase segments inside the key's slot — never WAV padding. Two beats that used to be loads are now staged with the motion they were holding for: `img1` inside `s5`'s 1.70 s, `img2` inside `s9`'s 1.30 s. The 1.05 s after `s3` now has its own named visual (the cursor blinking twice, the screen dimming once), so no hold in this packet is empty air.

| silence | where | position | what it does |
|---:|---|---|---|
| 0.22 | inside `s1` | between clauses | the clause gap the contract inserts |
| 0.28 | inside `s2a` | between clauses | owner line #2's first two statements |
| 0.30 | after `s1` | clip boundary | the viewer absorbs being named |
| 0.25 | **before `a1`** | clip boundary | the real split gap inside owner line #2 (`H-01`) — structural, not dramaturgical, and declared as such |
| 0.24 | inside `a1` | between clauses | the two observations |
| 0.30 | after `a1` | clip boundary | the turn needs air |
| 0.26 | inside `s3` | at the comma | the hinge |
| 0.35 | after `s2b` | clip boundary | before `Nhưng` |
| **1.05** | **after `s3`, i.e. BEFORE `a2`** | clip boundary | **the withheld-message beat** — moved ahead of the whisper so the re-hook lands on a beat instead of out of a fade (`S-06`); the hold itself shows the cursor blinking twice and the screen dimming once |
| 0.14 | inside `a2` | between clauses | the rain |
| 0.25 | after `a2` | clip boundary | the whisper's tail → the re-hook |
| 0.24 | inside `s4` | before the quote | the words she almost sent |
| 0.40 | after `s4` | clip boundary | the draft is left hanging, unsent |
| **1.70** | **after `s5`** | clip boundary, stages `img1` | **the deletion is seen, not narrated** (`F-01`) |
| 0.18 | inside `s5` | between clauses | the give-up lands here, inside its own clip |
| 0.18 | inside `s6` | between clauses | the assumption |
| 0.50 | after `s6` | clip boundary | the call that was not answered hangs |
| 0.24 | inside `s7` | between clauses | the confession |
| 0.60 | after `s7` | clip boundary | the recognition lands |
| **1.80** | **after `s8`** | clip boundary | **the longest hold between two voiced clips before the resolution — tied with the closing hold, not uniquely longest** (`NEW-2`) |
| 0.26 | inside `s9` | between clauses | the metaphor |
| **1.30** | **after `s9`** | clip boundary, stages `img2` | **the tilt completes** (`F-03`) |
| 0.30 | inside `s10` | after the colon | the question begins |
| **1.80** | **after `s10`** | clip boundary | **the voice stops; the question is left in the room** |
| **3.20** | **END** | clip boundary | the required silent hold; BGM already out |
| | | **16.34 s** | 33.4 % of 48.90 s |

**Post-word audio tail = `s10`'s 1.80 s hold + END card's 3.20 s = 5.00 s** (`NEW-1`, `NEW-02`). The last word ends at **43.90 s**, BGM cuts there, and the mix is silent from 43.90 to 48.90 s. The identity holds exactly: `43.90 + 1.80 + 3.20 = 48.90`.

**Elasticity, in the order to apply it.**
- **Too short** (measured faster than 4.43 syl/s): lengthen the END card 3.20 → up to 5.20 s (+2.00), then `s8`'s hold 1.80 → up to 2.60 s (+0.80), for +2.80 s. **Stretching the card also lengthens the 5.00 s post-word tail, so §1 must be recomputed at the measured rate.**
- **Too long** (measured slower than 3.29 syl/s): **five** cuts, in this order — `s8` hold 1.80 → 1.20 (−0.60), END card 3.20 → 2.20 (−1.00), `img1` hold 1.70 → 1.10 (−0.60), `img2` hold 1.30 → 0.80 (−0.50), `s3` hold 1.05 → 0.65 (−0.40). **Those five cuts recover 3.10 s.** **Honest bound:** with all five applied, a measured 3.04 syl/s run lands at **55.02 s — 0.02 s over the ceiling**; the rate that lands on exactly 55.00 s with all five cuts is **3.041 syl/s**, so every measured rate at or above **3.05 syl/s** is inside the ceiling without further action (3.05 syl/s → 54.88 s). If a run measures below 3.05 syl/s, close the gap with one further **0.10 s** off the `s8` hold (1.20 → 1.10), which brings 3.04 syl/s to 54.92 s. For scale, a 3.0 syl/s run is 58.67 s before any cut, 55.57 s after all five, and 55.47 s after that extra 0.10 s.
- At the exact break-even of **3.285 syl/s** the total is 55.00 s with **no cut at all**; at **3.29 syl/s** it is already 54.94 s uncut.
- Speech is never touched, no owner word is ever cut, and audio is never sped up.

---

## 6 · Structural self-check

### 6.1 Contrast-pair registry (`H-05`) — the only place pairs are described

| id | pair | members | carries |
|---|---|---|---|
| **CP1** | others sink, you stand outside | `a1` → `s3` | the turn |
| **CP2** | shelter / soaked | `s1` frame 0 → `s9` → `img2` → `s10` (and the END card, same umbrella still tilted back) | the resolution |
| **CP3** | spoken assumption vs spoken truth | `s6` → `s7` | the reveal |

Every shot row in §3 names its pair by id only. **`s7` is CP3 and never CP2.** `img1` and `img2` belong to no pair; they are the staged halves of their neighbours' holds. CP2's polarity is fixed by §2.2 and never inverted: **she is wet from the first frame and gets wetter; the child is dry for the whole runtime.**

### 6.2 Highlight beats — exactly three (`S-02`)

| # | beat | delivery | visual | light |
|---|---|---|---|---|
| **H1** | `s3` — `chính bạn lại ngồi rất lâu…` | the hinge said plainly, no drama; slow through `ngồi rất lâu`; lands flat | the scuffed umbrella furled and dripping by the door; the cursor blinking, then the screen dimming once | L0 only — screen glow, the coldest frame in the video |
| **H2** | `s7` — `phải là người ổn` (**the gut punch — this line and no other carries that name**) | plainest, quietest read in the video; last two words drop in volume and stop | the furled umbrella held but not opened; her untouched-empty glass still behind her | L2 — the doorway sliver widened onto her hands |
| **H3** | `s10` — the question | normal volume, one clause, one breath, real question contour; the only rising contour; the final `thế?` falls | the missed call from `s6` still on screen; the same hand sets a cup down and tilts the rim back; she looks at the hand, then the phone, and does not speak | L4 — warmest, two sources |

**Every shot that carries a light beat appears above or is explicitly marked "no light beat"**: `a1` = L1 (the arrival, not a highlight), `s9`/`img2` = L3 (the palette turn, inside CP2 rather than a fourth highlight), `s1`/`s2a`/`s2b`/`a2`/`s4`/`s5`/`img1`/`s6`/`s8`/END = no light beat.

### 6.3 Sensory detail per beat — 16/16, verified against this table

`s1` umbrella tilted toward the child · her wet sleeve stripe, shoulder to elbow · the child's dry shoulder · the rim's shadow · the wet pavement · the lit window across the street · `s2a` she finishes their sentence before they say it · their mouth open as they nod · their glass of water · **her own glass untouched and empty** · `s2b` the same doorway pulled back a step · the other person's head coming up off their hands · their shoulders down · their hand closing around their own glass · **her glass still where she left it** · she already half-turned toward the hall · `a1` the other person's shoulders dropping · their glass still theirs · her glass still untouched where she left it · L1 arriving on her collar's edge · `s3` the furled scuffed umbrella dripping · the black screen reflecting her head as a dark shape · the blinking cursor · rain on the glass out of focus · **in the hold: the cursor blinking twice more, the screen dimming once** · `a2` rain hitting the glass · the sodium lamp broken into moving dots · `s4` characters appearing · the thumb hovering over an unpressed send key · the far lit window · `s5` knees pulled up · rain texture on the wall · `img1` backspace · characters vanishing one by one · the hand hesitating · the phone turning face-down · the black screen showing her head · `s6` a saved-name call ringing once and going unanswered · `s7` rain stopping unnoticed · the furled umbrella closed but unopened · **the untouched-empty glass re-shown** · L2 widened onto her hands · `s8` hands on the closed umbrella, the still room · `s9` the same street, umbrella, child and collar, her own doorway behind her · the wet patch spreading from the same right sleeve · L3 turning the palette · `img2` the patch darkening up her shoulder · drops off her sleeve · the child's dry shoulder under the same rim · `s10` the missed call still lit · the warm cup · the rim tilting back · the umbrella edge catching a rim of light · END rain thinning, the lamp steady.

`S-01` closed: the untouched-empty glass is hers, introduced at `s2a`, carries the line's content ("what you do for other people, never for yourself"), and is re-shown at `s7`. The old stock gesture — a hand on a shoulder — is gone.

### 6.4 Who acts, and when they are introduced (`H-04`)

Every off-screen element that acts anywhere in this video is introduced earlier in the video.

| actor | introduced | acts |
|---|---|---|
| the child under the rim | `s1` frame 0 | nothing; present only so the viewer can see who is being sheltered — and stays dry for the whole runtime |
| the saved name on the phone | `s6` — the call rings once and is not answered | **its hand sets the cup down and tilts the rim back at `s10`** |
| the narrator's "bạn" | `s1` | the whole runtime |

There is no anonymous helping hand anywhere. `s10` names `s6` by shot id, and the ending's gesture is the return of a call the viewer already watched not be answered.

### 6.5 Climax ≠ CTA · silent hold · determinism

`s10` is the climax and the last spoken shot; the END card is a separate silent shot carrying the owner's title line, and it contains no call to action, no handle, no follow/comment, no advice. The post-word tail is 5.00 s of real silence. Nothing in §3 requires wall-clock time or unseeded randomness (§2.3).

---

## 7 · The two `[ADD]` lines, and why they are not the owner's

| key | line | syl | one-line justification |
|---|---|---:|---|
| `a1` | `Vai người khác nhẹ xuống. Còn bạn thì đứng ngoài.` | 10 | It stages the effect `s2a` only asserts and it **is** CP1 — without it the first eight seconds contain no payoff (`H-01`). `nhẹ xuống` is the ordinary Vietnamese for shoulders easing down; `Còn bạn thì…` restores the spoken register (`A-T2`). |
| `a2` | `Ngoài cửa sổ, mưa rơi đều.` | 6 | The owner's script contains no audible environment; without it `s3`→`s4` is four abstract lines in a vacuum. The rain motif derives from the owner's own umbrella metaphor (line #9); the window and the rain-as-sound are produced staging (`F-04`). |

Both are sensory/action observations in the owner's own vocabulary; neither is a summary of an owner line, and neither invents an event the account does not contain. Counted in the 127-syllable total and in every second figure in §1.

**Removed in earlier rounds, with reasons.** Two `[ADD]` connectors were dropped: one narrated a letter-by-letter deletion the owner's account never contains — it is now the image-only beat `img1`, staged inside `s5`'s hold with no voice key (`F-01`); the other restated owner line #9's `bị ướt` after the frame had already shown the wet shoulder — it is now `img2`, an image-only continuation inside `s9`'s hold (`F-03`). No key, line or figure from any superseded round survives in this packet.

**Cost of removing both, stated plainly:** the spoken total is **127 syl** (111 owner + 16 added) and the two recovered slots were absorbed by the holds that now carry the staged beats (`s5` 1.70 s, `img2` inside `s9`'s 1.30 s) and by the END card — 46.58 / 48.90 / 50.66 s across the band. Ten owner lines plus two marked connectors cannot reach 45–55 s otherwise: 111 syl alone is 26.43–28.46 s of speech, which needs ~16.5 s of silence at every rate to clear the floor.

---

## 8 · END card (`F-13`, `F-09`, `NEW-07`)

The owner's title line is **on screen only, silent**. `Bạn không yếu đuối,` (4 words) / `bạn chỉ đã mạnh mẽ quá lâu.` (7 words) is the owner's verbatim wording, stacked in two elements across a 3.20 s static card.

**Declared cap exception.** The second element is **7 words, one over this video's ≤ 6-word on-screen cap** (`brief.md` §Visual identity). It is not repaired by dropping the repeated `Bạn`: the owner's wording outranks the style rule, and re-wording it is out of bounds. `content-agent` must split it as written and must not drop `Bạn` (`F-13`).

**Contingency, recorded (`F-09`, `NEW-07`).** If the owner asks for the title spoken, it becomes a 14th key of 11 syl = **2.82 s at the 3.9 planning rate**, inserted **BEFORE the END card, not inside it** — the card stays a separate silent shot. Arithmetic: `48.90 + 2.82 = 51.72 s`, inside the owner's 45–55 s, with the post-close silence preserved at the card's full 3.20 s. (The owner may instead prefer a shorter runtime, which would mean cutting the card to 1.20 s for `49.72 s` and a 1.20 s post-close silence; that is not the default because it weakens the required hold.) **No figure in this contingency is a timeline number** — the measured plan's totals stay 46.58 / 48.90 / 50.66 s until the owner decides, and §1 is recomputed at the measured rate only if they do. The owner's wording is never dropped to make room, and the silent tail is never silently cut to zero.

---

## 9 · Voice route and rate provenance (`A-C1`, `F-06`, `NEW-03`, `NEW-4`)

**Route 2, local VieNeu clone, reference `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav`** — filled into all thirteen `reference` fields in `voice-performance.proposed.json` and mirrored in `voice-direction.md` §Voice reference.

This is a **director decision**, justified by consistency with the videos already delivered in this repo that use the identical reference file. **It is not an owner confirmation** — `owner-notes.md` contains two "hi" notes and no voice instruction of any kind. `vietnamese-voice-samples/previews/` does not exist on this machine, so no preview catalogue is available and none is cited.

**Reference handling (`NEW-4`).** The pinned `reference.source` is the synthesis reference and is **used unmodified** — it carries no `startSeconds` / `durationSeconds`, so `gen-voice-clone.py` will not crop it. `voice-agent` must **overwrite this exact path** if a re-cut is ever needed and must not create a second file under a different name: the agent is read-only for the sidecar, so a new filename would be invisible to the contract and the run would silently use the uncropped audio.

**What 3.9 syl/s is (`NEW-03`).** **4.1 syl/s is this repo's planning convention, not a measurement** (`docs/motion-design-lab/script.md:23` says so explicitly), and the measured Thanh-Long runs in this repo sit **lower** — `docs/xay-doi-minh-hay-chung-minh/voice-report.md:24` reports 194 syllables over 51.75 s = **3.75 syl/s**, and `docs/lam-lai-…/audio-review.md:12` reports ≈3.5–3.7. So the **3.9 syl/s plan is already at the measured rate for this reference**, and the intimate register is carried by holds, emphasis and light rather than by slowing the voice down. Nothing in this packet calls any planning rate "measured", and every measured figure here carries a `voice-report.md` citation.

**Join rule (`F-05`).** Phrase texts in the sidecar are joined with **exactly one space**: `" ".join(phrase.text) == voice.proposed.json[key]`, byte-for-byte, verified before generation. Every phrase boundary in this packet falls on a canonical space.
