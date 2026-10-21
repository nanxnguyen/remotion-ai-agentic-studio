# Hook options — can-phong-bua-bon-khong-phai-that-bai

Phase 2a hook engineering, per `.claude/skills/ray-pineline-worflow-agent/references/hook-engineering.md`.

**Sources.** `research.md` **did not exist when this file was written** (checked 2026-10-21, `docs/can-phong-bua-bon-khong-phai-that-bai/` contained only `brief.md`, `status.json`, `status.lock`). The contract asks for three substantially different candidates *chosen from five research hooks*; with no research file there are no five research hooks to choose from, so the three candidates below were built **directly from the owner's own words** — the mandated opening line (`brief.md` §User constraints), the topic line (`brief.md` §User constraints) and the audience note in the same section ("blaming themselves for being lazy or useless"). **No statistic, no research finding and no unsourced claim appears in any candidate**, and none may be added without reopening gate A.

Profile `story`, 9:16 1080×1920 @30 fps, 30–45 s. **Selected: `H1`** → it is `s1` in `script.md`. Every second quoted here is the same planning timeline as `script.md` §1 (125 syl, 4.3 syl/s planning rate, 9.25 s of planned silence, 38.33 s total).

**Anti-clickbait rule applied to every candidate:** no statistic, no shock claim, no withheld answer, and every question the cover raises is answered on screen inside the runtime.

---

## H1 — Contrast / relief · `Ba ngày rồi bạn chưa dọn phòng. Không phải vì bạn lười.` → **CHOSEN** → `s1`

**Mechanism.** *Surprise by contradiction.* The viewer arrives bracing for a lecture about a messy room. The line removes the accusation before the viewer can supply it: the expected "you're lazy" is contradicted by "không phải vì bạn lười". The relief lands in the same breath as the observation, so the video's whole promise — *I am not here to lecture you* — is delivered inside the first three seconds.

**1. Literal first frame (0–1 s) and safe-zone text.**
Canonical cover description — reproduced **word for word** from `script.md` §2.2 and `brief.md` §Hook; gate D proves it reads at phone size on `out/qa/<vid>-cover.png` with the audio muted:

> Frame 0 **is** the cover — already composed, no fade from black, no logo, no title animation. 9:16, a real room in **late-afternoon light**. A **half-drawn curtain** on the right; through it, **one narrow blade of warm sun lying across the floor**, and **dust turning slowly inside the beam**. On the **chair**, a heap of clothes with one sleeve hanging over the armrest. On the **desk**, a **cold coffee cup** with a skin formed on its surface and a dried ring beside it on the wood; the **desk lamp beside it is off, its bulb dark**. On the **bed**, the duvet shoved to one side and **a phone lying face-down**, its screen edge showing a thin line. The room is **not dirty** — it is **tired**: nothing is ruined, everything is exactly where three days of leaving it put it. The **shadow side is dusty violet-grey**, the sun blade is pale gold. A hand rests on the chair back at the bottom of frame, still, not reaching for anything. The curtain's edge moves once in a faint draught and the blade on the floor slides a few centimetres — the only motion in the frame. Slow push-in 1.00→1.03.

Three contract tests on that frame:
- **An action is in progress**, not a held pose: the draught moves the curtain edge and the beam slides a few centimetres across the floor — the strongest motion at phone size.
- **The thesis is visible at thumbnail scale**: warm sun on the floor against a violet-grey shadow side; one ordinary room that has simply been *left*. It must read as a tone-and-light difference, not as a caption.
- **The room must not read as a garbage dump** — nothing is ruined or dirty. The whole art direction depends on this: the room reads as a room where someone stopped, not as a failure.

**Safe-zone text (upper third, nothing in the bottom 210 px):** `Ba ngày rồi bạn` / `chưa dọn phòng.` + `Không phải vì bạn lười.` — **the hook itself, in full, at frame 0.** This is a deliberate deviation from the convention used in `ban-khong-yeu-duoi-chi-da-manh-qua-lau` (headline ≠ spoken line): the brief's gate item is *"H1's on-screen text must make the hook fully understandable with the sound off"*, and duplicating the spoken line is the only way to guarantee it. **One text instance only** — the cover headline doubles as `s1`'s caption; `content-agent` must not stack a second caption layer on top of it.

**2. Spoken 0–3 s line, syllables, sound-off.**
Spoken: `Ba ngày rồi bạn chưa dọn phòng. Không phải vì bạn lười.` = **12 space-separated syllables**. Clip `s1` runs **0.00–2.79 s**; the hook's last syllable lands at **2.67 / 2.79 / 2.93 / 3.08 / 3.24 s** at 4.5 / 4.3 / 4.1 / 3.9 / 3.7 syl/s. Inside the ≤ 3 s window at the 4.3 planning rate and at the engine's natural 4.1; **0.08 s over at 3.9 and 0.24 s over at 3.7 — stated, not rounded away.** The on-screen text carries the full hook from frame 0, so the **sound-off hook is complete at 0.00 s at every rate.**

Sound-off: **yes.** The frame says "a room three days of leaving it looks like"; the text says "you have not cleaned it in three days, and it is not because you are lazy".

**3. The gap the viewer is holding at 2.79 s.**
One question, asked in one sentence: **then what is the mess?** Not "am I lazy" — the hook has already taken that away — but *what is the mess actually telling me?* The promise is therefore a **reframe**, and the video pays it exactly: `s5` answers it (`Nó nói: hôm nay bạn không còn sức làm một việc nhỏ nữa. Nó nói về hôm nay thôi.`) and the turn is paid again by the one small act at `s6` and the celebration at `s7b`.

**4. First payoff before second 8, and where the ending resolves it.**
The first staged payoff is **`s2` clause 1** — `Mệt thì cái gì cũng nặng.` — and its last word lands at **4.29 / 4.54 / 4.74 / 4.97 / 5.25 s** at 4.5 / 4.3 / 4.1 / 3.9 / 3.7 syl/s. Inside the 3–8 s window at every rate. `s2` then inventories the viewer's own room (cold cup, clothes on the chair, unmade bed) and completes at **7.62–9.29 s**.

Resolution: `s6` performs the one small act (`Hôm nay, chỉ gấp một cái áo lên, đặt lên lưng ghế.`), `s7b` celebrates it (`Một việc nhỏ thôi. Nhưng hôm nay, việc đó đáng mừng.`), and the **silent ending** — the curtain drawn fully open in the 3.20 s hold after the last word — resolves the promise visually. **The hook's question is answered in words and in light.**

**5. Anti-clickbait risk and rejection of weaker variants.**
Risk: **the lowest of the three.** No superlative, no statistic, no implication that the video will fix the viewer, no mystery: the cover asks a question the video answers on screen at `s5` and pays with an action at `s6`. The weaker variants are re-argued below — and **one of them is not merely rejected, it is re-timed into the re-hook slot**, which is the strongest argument in this file.

---

## H2 — Curiosity gap · `Căn phòng bừa bộn này đang nói gì với bạn?` → **rejected as the opener → its mechanism is the re-hook `s4`**

**Mechanism.** *Open loop.* The room is given a voice, and the viewer is asked to listen to it. Genuinely different from H1's contradiction: H1 removes an accusation, H2 creates a question.

**1. Literal first frame and safe-zone text.**
The same room, same late-afternoon blade of light — the visual is not the problem here. Text: `Căn phòng này đang nói gì?` (5 words) over the same cover.

**2. Spoken 0–3 s line, syllables, sound-off.**
Spoken: `Căn phòng bừa bộn này đang nói gì với bạn?` = **10 space-separated syllables** = **2.33 s** at 4.3 syl/s (2.22 / 2.44 / 2.56 / 2.70 s across 4.5 / 4.1 / 3.9 / 3.7). Sound-off: **yes**, the frame + the question text carry it.

**3. The gap the viewer is holding.**
A strong one: *the room is talking — what is it saying?* This is the best single idea in the file.

**4. First payoff before second 8, and where the ending resolves it.**
**This is where the candidate dies.** The honest answer to "what is the room saying" in this script is `s5` — `Nó nói: hôm nay bạn không còn sức làm một việc nhỏ nữa.` — which sits at **18.56 s**. Opened with H2, the video would hold a question for **more than eighteen seconds** while the viewer watches a room. `hook-engineering.md` lists **"withheld answer"** as a blocker, and the 3–8 s rule says *"never withhold all value to inflate watch time"*. On its own syllables H2 is not the problem (2.33 s, comfortably inside 3 s) — **the problem is purely structural**: the answer it opens arrives far too late.

**5. Anti-clickbait risk and verdict.**
Risk: **medium-high as an opener** — a question with an 18-second wait is the classic shape of a clickbait hook that the video does not pay. But the *idea* is good, so it is **not discarded**: it is **re-timed**. `script.md` §3 places `s4` — `Căn phòng này không nói gì về bạn đâu.` — as the **re-hook at 15.97 s**, and `s5` answers it **1.50 s later**. In that position H2's mechanism keeps its full power *and* obeys the 3–8 s rule. Rejecting the mechanism would have wasted the best idea in the file; keeping it as the opener would have wasted the contract.

---

## H3 — Specific personal stake · `Ngày mai bạn lại nhìn cả căn phòng, rồi tự trách mình.` → **rejected as the opener → its stake is preserved in `s3`**

**Mechanism.** *The cost.* Not a question and not a contradiction: the hook names the **price** the viewer's self-blame is charging them — tomorrow they will look at the same room and accuse themselves again. Different again from H1 and H2.

**1. Literal first frame and safe-zone text.**
The same room — but the frame has to carry a **future** event, and the room cannot show tomorrow. The best available staging is the figure looking at the room as if measuring how long she has been avoiding it. Text: `Ngày mai bạn lại nhìn cả căn phòng.` (8 words).

**2. Spoken 0–3 s line, syllables, sound-off.**
Spoken: `Ngày mai bạn lại nhìn cả căn phòng, rồi tự trách mình.` = **12 space-separated syllables** = **2.67 / 2.79 / 2.93 / 3.08 / 3.24 s** at 4.5 / 4.3 / 4.1 / 3.9 / 3.7 syl/s. Sound-off: **yes**, the text is fully readable and the frame shows the room being looked at.

**3. The gap the viewer is holding.**
A real one: *so what — is tomorrow any different?* The viewer is being told their own loop has no exit.

**4. First payoff before second 8, and where the ending resolves it.**
**Weak, and this is the second structural failure.** The line promises that the loop continues; the video's entire job is to end it. The payoff (`s2`'s relief at 4.54 s, the act at `s6`, the celebration at `s7b`) answers a *different* promise, so the first words of the video are not paid by what follows — the video spends its first three seconds stating a bleak prediction and then contradicting it. The contract's rule is *"a hook unrelated to the final payoff"*; this hook is **related but inverted**, which is nearly as bad for a viewer whose first reaction is already defensive.

**5. Anti-clickbait risk and verdict.**
Risk: **medium, and it is the one that touches the brief directly.** `brief.md` §User constraints says the audience "need to be **understood**, not taught" and the tone must be "gentle, close, not preachy". H3 opens by telling a stranger what they will do tomorrow and why they are a failure — before any relief has arrived. That is the tone the brief forbids, delivered in the first three seconds. Its stake is preserved in **`s3`**, where the loop is shown rather than predicted and the viewer is *already* being understood.

---

## Decision

| Candidate | mechanism | source support | **sound-off comprehensibility** (frame 0 + text alone) | **first-frame visual potential** | hook clear ≤ 3 s | truthful 1–3 s promise | first payoff < 8 s | payoff resolved | clickbait risk | verdict |
|---|---|---:|---:|---:|---|---|---|---|---|---|
| **H1** contrast / relief | contradiction — the expected "you're lazy" is taken away | **10** | **10** — the full hook is on screen at frame 0 | **9** — a real room, a live blade of light, the draught moving the curtain | **10** (2.79 s) | **10** — promises a reframe, pays it at `s5` | **10** (4.54 s) | `s5` + `s6` + `s7b` + the silent ending | **very low** | **CHOSEN** → `s1` |
| H2 curiosity gap | open loop — the room gets a voice | 8 | 9 — readable, but the frame alone does not say what the video is | 9 — same room, same visual strength | 10 (2.33 s) | 9 — a real, answerable question | **4 — the answer is at 18.56 s** | yes, eventually | **medium-high** | rejected as opener → **its mechanism is the re-hook `s4`**, answered 1.50 s later by `s5` |
| H3 personal stake | the cost — tomorrow's loop | 9 | 8 — understandable, but it describes tomorrow, and the frame can only show today | **7** — the frame must illustrate a future event it cannot show | 10 (2.79 s) | 8 — true but inverted by the video's own ending | **7** — the promised thing is not what the video delivers | yes, by contradiction | medium | rejected as opener → **its stake is preserved in `s3`** |

**`H1` is chosen** on the three literal tests the brief names — **source support (10), sound-off comprehensibility (10) and first-frame visual potential (9)** — and because it is the only candidate whose 1–3 s promise is **paid by a first payoff at 4.54 s** and by the ending. H2 and H3 are not straw-men: H2 has the strongest single idea in the file and is **re-timed into the re-hook** rather than thrown away; H3 is a genuinely different mechanism and its stake is kept in `s3`.

**Named competing candidate for the reviewer to weigh: `H2`.** Its question — *what is the room saying?* — is the sharpest line in the packet, and on its own syllables it beats H1 (2.33 s against 2.79 s). It still loses, and the reason is **structural, not arithmetic**: opened at 0.00 s, its answer arrives at 18.56 s, which is the `hook-engineering.md` blocker *"withheld answer"*. Placed at `s4` (15.97 s) with the answer 1.50 s later, the same mechanism becomes the re-hook. The reviewer should test that argument — that H2 belongs at 16 s, not at 0 s — and not the syllable count.

**Coverage check.** Hook complete **2.79 s** (sound-off: **0.00 s**) · first staged payoff **`s2` clause 1 at 4.54 s** · **re-hook `s4` at 15.97 s** (15.36 / 16.64 / 17.38 / 18.20 s at 4.5 / 4.1 / 3.9 / 3.7 — inside 15–20 s at every rate) · highlight beats **HB1 `s5` · HB2 `s6` · HB3 `s7b`** · contrast pairs **CP1–CP3** · light plan **L0–L3** (one arrival, `L1`) · post-word tail **3.20 s** from the last word at 35.13 s · total **38.33 s** at 4.3 syl/s (37.03 / 39.74 / 41.30 / 43.03 / 44.96 s at 4.5 / 4.1 / 3.9 / 3.7 / 3.5), inside 30–45 s for any measured rate between **3.50 and 6.02 syl/s**. Full table in `script.md`.
