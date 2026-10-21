# Script: Căn phòng bừa bộn không phải là thất bại

**Video ID:** can-phong-bua-bon-khong-phai-that-bai · **Profile:** story · **Comp:** `CanPhongBuaBonReel` · 9:16 1080×1920 @30 fps
**Duration:** 30–45 s (owner explicit; speech + pauses + transitions + ending hold) — **planned total 38.14 s** at the 4.3 syl/s planning rate, **39.58 s** at 4.1 and **42.92 s** at 3.7.
**Hook:** candidate **H1** (`hook-options.md` §H1) — the owner's mandated opening line, verbatim. **Re-hook (named): `s4`, clip starts 15.77 s** (15.16 / 16.44 / 17.18 / 18.00 s at 4.5 / 4.1 / 3.9 / 3.7 syl/s — inside 15–20 s at every rate in the band).
**Shots:** 8 (`s1 · s2 · s3 · s4 · s5 · s6 · s7 · s8`). **Keys: 11 spoken, played back in file order — `s1 · s2 · s3a · s3b · s4 · s5 · s6 · s7a · s7b · s8a · s8b`.**
`scripts/gen-voice-clone.py` walks the file in insertion order, so this is the playback order. Three shots carry two keys each (`s3`, `s7`, `s8`); the split is a real timeline gap, never punctuation.

**Zero statistics. Zero named psychological concepts. One mandatory hedge.** `research.md` landed on 2026-10-21 and was read before this script was finalised. It permits **no statistic at all** (§3.5) and **no named psychological concept** (§3.1, §3.3, §3.13). Every line here is either the owner's own wording, a plain observation staged on screen, or — in `s5` — the **narrator's own reading, explicitly hedged** (`Có lẽ`), because `research.md` §8.1 states that the link between a depleted state and a messy room is **the video's inference, not a finding**, and must be spoken humanely ("tôi nghĩ…", "nhiều người…"). Nothing in this packet claims a number, a percentage, a clinical term or a research result. See §7.

---

## 1 · Timing budget

**Unit:** `syl` = space-separated token (the repo unit). **Planning rate: 4.3 syl/s** — the middle of the band the owner asked for in `brief.md` §Identity ("target rate +4 %…+8 % relative to the engine's natural read", i.e. 4.26–4.43). 4.3 is a **planning figure, not a measurement**. The audio is never sped up to fit; if the measured run is long, §5 cuts holds, never words and never the tempo.

**Unified silence model.** Two declared mechanisms, never punctuation:
- **In-clip phrase pauses** (`pauseAfterSeconds` in the sidecar) — real audio gaps written inside the key's own clip by `gen-voice-clone.py` (`adelay` / `apad`). Total **1.40 s**.
- **Post-clip timeline holds** (`minimumPostClipHoldSeconds`) — gaps the Reel/timeline layer places after the clip. Total **7.20 s**, of which the last **3.20 s** is the silent ending.

```
planningTotal(rate) = Σ(syl ÷ rate) + Σ(in-clip phrase pauses) + Σ(post-clip holds)
                   = 127 ÷ rate + 1.40 s + 7.20 s
                   = 127 ÷ rate + 8.60 s
```

| # | key | syl | speech s | in-clip pause s | key length s | start s | clip end s | post-clip hold s | next start s |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | `s1` · **HOOK · COVER · frame 0** | 12 | 2.79 | 0.00 | 2.79 | 0.00 | 2.79 | 0.30 | 3.09 |
| 2 | `s2` · **FIRST PAYOFF** | 20 | 4.65 | 0.38 | 5.03 | 3.09 | 8.12 | 0.35 | 8.47 |
| 3 | `s3a` | 12 | 2.79 | 0.00 | 2.79 | 8.47 | 11.26 | 0.35 | 11.61 |
| 4 | `s3b` | 15 | 3.49 | 0.22 | 3.71 | 11.61 | 15.32 | 0.45 | 15.77 |
| 5 | `s4` · **RE-HOOK** | 9 | 2.09 | 0.00 | 2.09 | **15.77** | 17.86 | 0.40 | 18.26 |
| 6 | `s5` | 21 | 4.88 | 0.40 | 5.28 | 18.26 | 23.54 | 0.40 | 23.94 |
| 7 | `s6` · **PAYOFF (the one small act)** | 12 | 2.79 | 0.14 | 2.93 | 23.94 | 26.87 | 0.45 | 27.32 |
| 8 | `s7a` | 2 | 0.47 | 0.00 | 0.47 | 27.32 | 27.79 | 0.30 | 28.09 |
| 9 | `s7b` · **CLIMAX (the celebration)** | 11 | 2.56 | 0.26 | 2.82 | 28.09 | 30.91 | 0.60 | 31.51 |
| 10 | `s8a` | 6 | 1.40 | 0.00 | 1.40 | 31.51 | 32.91 | 0.40 | 33.31 |
| 11 | `s8b` · **CLOSING LINE (last word)** | 7 | 1.63 | 0.00 | 1.63 | 33.31 | **34.94** | **3.20** (the silent ending) | **38.14** |
| | **TOTAL** | **127** | **29.53** | **1.40** | **30.93** | | | **7.20** | **38.14** |

**Total 127 syllables · 38.14 s at 4.3 syl/s.**

### 1.1 Rate band and break-even

| measured rate | speech = 127 ÷ rate | + 1.40 in-clip | + 7.20 holds | **total** | inside 30–45 s |
|---:|---:|---:|---:|---:|---|
| **4.5 syl/s (fast run)** | 28.22 | 1.40 | 7.20 | **36.82 s** | ✅ |
| **4.3 syl/s (planning rate)** | 29.53 | 1.40 | 7.20 | **38.13 s** | ✅ |
| 4.1 syl/s (engine natural read) | 30.98 | 1.40 | 7.20 | **39.58 s** | ✅ |
| 3.9 syl/s | 32.56 | 1.40 | 7.20 | **41.16 s** | ✅ |
| 3.7 syl/s | 34.32 | 1.40 | 7.20 | **42.92 s** | ✅ |
| 3.5 syl/s (slow run) | 36.29 | 1.40 | 7.20 | **44.89 s** | ✅ 0.11 s under the ceiling |

**Break-even:** `127/r + 8.60 = 45` gives **r = 3.489 syl/s**; `127/r + 8.60 = 30` gives **r = 5.935 syl/s**. The packet is inside 30–45 s for any measured rate between **3.49 and 5.93 syl/s** — which brackets the whole realistic band for this reference with margin on both sides (the measured Thanh-Long runs in this repo sit at 3.5–3.75 syl/s). The mandated planning rate 4.3 sits inside it.

### 1.2 Structural marks at every rate

| mark | 4.5 | 4.3 | 4.1 | 3.9 | 3.7 | contract |
|---|---:|---:|---:|---:|---:|---|
| hook complete (`s1` last syllable) | 2.67 | **2.79** | 2.93 | 3.08 | 3.24 | ≤ 3 s ✅ at 4.3 and at the engine's natural 4.1; **0.08 s over at 3.9 and 0.24 s over at 3.7 — stated, not rounded away.** The on-screen text carries the full hook from frame 0, so the sound-off hook is complete at **0.00 s** at every rate. |
| **first payoff** — `s2` clause 1, `Mệt thì cái gì cũng nặng.`, last word | 4.30 | **4.49** | 4.69 | 4.92 | 5.16 | < 8 s ✅ at every rate |
| `s2` complete (the whole room inventory) | 7.57 | 8.12 | 8.44 | 8.81 | 9.23 | — |
| **re-hook `s4` clip starts** | 15.16 | **15.77** | 16.44 | 17.18 | 18.00 | 15–20 s ✅ at every rate |
| **last word of the video** (`s8b` clip end) | 32.69 | **34.94** | 36.29 | 37.74 | 39.26 | — |
| silent ending (post-word tail) | 3.20 | 3.20 | 3.20 | 3.20 | 3.20 | — |
| **total** | **36.82** | **38.13** | **39.58** | **41.16** | **42.92** | 30–45 s ✅ |

**The payoff's measurement convention, stated once.** The contract figure is the **last word** of the payoff clause (`nặng.`), i.e. `s2.start + 6 ÷ rate`. The 0.20 s in-clip pause sits *after* that word, so the following clause starts at 4.69 / 4.94 / 5.19 s — still inside the 3–8 s window at every rate.

---

## 2 · Staging contract

### 2.1 Light plan — one arrival, then widening

Published once, here. `voice-direction.md`, `hook-options.md` and the shot table reference these ids; they never re-describe or re-claim an arrival.

| id | where | state |
|---|---|---|
| **L0** (baseline, present from frame 0) | `s1` → `s5` | Late-afternoon light through the **half-drawn curtain**: one narrow blade of sun lying across the floor, dust turning inside it. The **desk lamp is OFF** and its bulb reads dark. The shadow side of the room is dusty violet-grey, not blue-black. This is the world, not the turn — it is already in the cover. |
| **L1** — **the one arrival** | `s6` | The desk lamp **clicks on** as the shirt is laid down. Its amber pool covers the desk, the cold cup and the newly flat shirt. This is the only new light source that appears anywhere in the video, and it appears because she turned it on. |
| **L2** | `s7` | The lamp's pool is now the room's warm centre and the camera has drifted back, so both warm sources sit in one frame. No new source; the same lamp, wider. |
| **L3** — warmest | `s8` → the silent ending | In the 3.20 s hold the curtain is drawn **fully open**; the late-afternoon gold floods the room and reaches the folded shirt on the chair back. Same two sources, no longer contained. |

Exactly one "first" exists: **L1**. `L2` and `L3` are states of the same two sources widening, not new arrivals.

**The research's central image, expressed as a real object.** `research.md` §5 proposes an **empty battery symbol** ("một thanh pin rỗng / đèn bàn tắt") as the video's central image for "sạc đầy pin" / "tắt nguồn" (S7). A drawn battery icon is exactly the "generic floating graphic" the owner's brief forbids, and it would break the "real room" requirement. **The same idea is delivered as the desk lamp's bulb: dark in `L0`, lit in `L1`.** The object is real, it belongs to the room, and it is on screen from frame 0.

### 2.2 Frame 0 = cover — canonical description

This paragraph is the single source of the cover. `hook-options.md` §H1 §1 and `brief.md` §Hook reproduce it **word for word**; gate D proves it reads at phone size on `out/qa/<vid>-cover.png` with the audio muted.

> Frame 0 **is** the cover — already composed, no fade from black, no logo, no title animation. 9:16, a real room in **late-afternoon light**. A **half-drawn curtain** on the right; through it, **one narrow blade of warm sun lying across the floor**, and **dust turning slowly inside the beam**. On the **chair**, a heap of clothes with one sleeve hanging over the armrest. On the **desk**, a **cold coffee cup** with a skin formed on its surface and a dried ring beside it on the wood; the **desk lamp beside it is off, its bulb dark**. On the **bed**, the duvet shoved to one side and **a phone lying face-down**, its screen edge showing a thin line. The room is **not dirty** — it is **tired**: nothing is ruined, everything is exactly where three days of leaving it put it. The **shadow side is dusty violet-grey**, the sun blade is pale gold. A hand rests on the chair back at the bottom of frame, still, not reaching for anything. The curtain's edge moves once in a faint draught and the blade on the floor slides a few centimetres — the only motion in the frame. Slow push-in 1.00→1.03.

- **An action is in progress**, not a held pose: the draught moves the curtain edge and the beam slides a few centimetres across the floor — the strongest motion in the frame at phone size.
- **The thesis is visible at thumbnail scale**: warm sun on the floor against a violet-grey shadow side; one flat, clean, ordinary room that has simply been *left*. It must read as a tone and light difference, not as a caption.
- **The sound-off hook is complete at frame 0**: the on-screen text is the hook itself, in full, at frame 0 (§3, `s1`).
- **Nothing is ruined and nothing is dirty.** The whole art direction depends on this: the room must not read as a garbage dump. It reads as a room where someone stopped.

### 2.3 Hero asset class

The hero of this video is **the room**, and the character is **one consistent stylised figure built as vector/SVG plates and typography — no photograph, no live-action plate, no photoreal face**. The figure is present as **hands, forearms, shoulder and the back of the head**; there is no rendered face anywhere in the runtime.

| what the shot needs | how it is delivered from frames only |
|---|---|
| the room's three props (cup, clothes, bed) | one set of vector prop plates; each prop has a fixed geometry and a fixed light response |
| the shirt that gets folded | one asset, one scalar `fold ∈ 0…1`, continuous across `s6` → `s7` → `s8` → the ending |
| the cup's coldness | a matte surface plate + a separate "skin" plate whose opacity is `1` from frame 0; no steam layer exists in the kit at all |
| the desk lamp | one bulb plate + one cone plate; `lampOn ∈ {0,1}` flips **once**, at `s6`, and never flips back |
| the curtain | one cloth plate whose x-scale is a scalar, driven by the draught (frame 0) and by the hand (the ending) |
| the phone, face-down | one plate with a 1-pixel screen-edge glow; it flickers once, inside `s3b`'s hold, and never lights up |
| the figure's hands | two hand plates on the arm rig, parented to the forearm, driven by the same scalars |

No shot requires `Date.now()`, `Math.random()`, a live video or an actor. The profile rubric's "expressive close-ups" are delivered through **framing, hand posture, light and the still life of the frame** — a push-in on the hand flat on the desk (`s5`), the shirt coming flat (`s6`), the hand leaving the folded shirt (`s7`).

---

## 3 · Shot table

On-screen text = the text layer. **Caption chunks: §4.** Caption text reproduces `voice.proposed.json` word for word; the caption layer sits in the **upper-middle band** (see §2.4), never below.

| # | seconds | VO exact text | on-screen text | action/visual | camera/motion | SFX | source | scene owner |
|---|---|---|---|---|---|---|---|---|
| **s1 · HOOK · COVER · frame 0** | 0.00–3.09 (clip 0.00–2.79, hold 0.30) | **Ba ngày rồi bạn chưa dọn phòng. Không phải vì bạn lười.** | `Ba ngày rồi bạn` / `chưa dọn phòng.` / `Không phải vì bạn lười.` — **display face, upper third; this is the cover headline and it doubles as s1's caption (one instance, no duplicate layer)** | **Exactly §2.2.** The blade of sun on the floor, the draught moving the curtain, the heap on the chair, the cold cup with its dried ring, the dark lamp bulb, the face-down phone on the bed, the hand resting on the chair back | Slow push-in 1.00→1.03; the blade of light slides a few cm as the curtain breathes | Room tone (low hum) + a distant street. **No SFX cue, no laugh, no "ding", no bright music in the first 3 s** (`research.md` §5: a cheerful sound would break the "gỡ tội" mechanism) | **owner brief — the mandated opening line, verbatim** (also `hook-options.md` §H1). Image = design (§2.2) | `scene-agent-1` |
| **s2 · FIRST PAYOFF** | 3.09–8.47 (clip 3.09–8.12, hold 0.35) | **Mệt thì cái gì cũng nặng. Cốc cà phê nguội trên bàn, quần áo trên ghế, giường chưa được gấp.** | — (caption only) | The camera drifts laterally across the room **in the order the words name the objects**: the cold cup on the desk (a skin on the surface, no steam, a dried ring on the wood) → the clothes on the chair (one sleeve over the armrest) → the unmade bed (the duvet shoved aside, one pillow dented). **Light L0 — unchanged.** The room is shown as a still life, not as a mess | Slow lateral track right→left, 1.02→1.00 | Room tone; **no SFX cue** — the inventory is carried by the voice | **owner brief** — the props (cold coffee cup, clothes on a chair, unmade bed) and the owner's "mệt mỏi kéo dài" framing; the wording is `script-agent`'s. The line is a **figurative saying**, not a sourced finding (§7, S2) | `scene-agent-1` |
| **s3a** | 8.47–11.61 (clip 8.47–11.26, hold 0.35) | **Nhìn cả căn phòng, bạn tự nói trong đầu: mình lười thật.** | — (caption only) | The figure sits on the edge of the unmade bed, seen **from behind** — shoulder, forearm, the back of the head; no face. She looks at the room, then looks away. The phone stays face-down beside her thigh; its screen edge shows a thin line | Slow push-in on the head plate and the shoulder line, 1.00→1.03 | Room tone | `script-agent` — staging the audience's own loop ("blaming themselves for being lazy"), from `brief.md` §User constraints and `research.md` §4C (the self-blame language is the research's, the line is mine) | `scene-agent-1` |
| **s3b** | 11.61–15.77 (clip 11.61–15.32, hold 0.45) | **Rồi bạn cũng chỉ nằm xuống thôi. Cả ngày mệt, tối chẳng muốn động gì.** | — (caption only) | She lies down on the unmade duvet, still dressed, one arm off the edge. The room is unchanged. **In the 0.45 s hold: the face-down phone buzzes once against the sheet — a muffled vibration — and its screen line flickers once.** She does not turn it over | Very slow pull-back, 1.02→1.00, so the lying figure becomes small in the room | **One muffled phone vibration against fabric**, inside `s3b`'s hold | `script-agent` — plain physical wording for the depleted state, drawn from the research's audience language (`research.md` §4A: "Cơ thể mệt nhoài… không thể làm được gì", S8); **no clinical term, no statistic, no diagnosis** | `scene-agent-1` |
| **s4 · RE-HOOK** | **15.77–18.26** (clip 15.77–17.86, hold 0.40) | **Căn phòng này không nói gì về bạn đâu.** | `Căn phòng bừa bộn` / `không phải là thất bại.` — **upper-third beat label; the owner's topic line, verbatim, in two elements of ≤ 6 words** | The camera **pulls back to the widest frame of the video** and shows the room **square-on for the first time** — the whole room in one piece instead of in pieces. Same objects, same mess, different distance. **Light L0 — deliberately unchanged.** The point is that the room was never a light source, it was a reading | Slow pull-back 1.06→1.00 (the only wide in the runtime) | Room tone; **no SFX cue** | `script-agent` (re-hook) + **owner brief** (the topic line, on screen) + `research.md` **C16** (the topic line as an INFERENCE from S2 — WHO recommends intervening on *conditions*, not on the person) | `scene-agent-1` |
| **s5** | 18.26–23.94 (clip 18.26–23.54, hold 0.40) | **Có lẽ nó nói: hôm nay bạn không còn sức làm một việc nhỏ nữa. Nó nói về hôm nay thôi.** | — (caption only) | Close on her hand lying **flat** on the desk beside the cold cup — a hand that has stopped trying. The cup is **not steaming**; the surface has a skin on it. The **lamp switch is under her fingertip**, but she does not press it. **Light L0 — unchanged.** In the 0.40 s hold her shoulders drop half a centimetre | Slow push-in on the hand, 1.00→1.04 | Room tone; **no SFX cue** — the silence is the point | **owner brief** (the thesis) restated in plain words by `script-agent`, **hedged as the narrator's own reading** per `research.md` §8.1 and §3.11; the underlying mechanism is supported by `research.md` **C05** (Diamond, S3) and the audience language in §4A. **No psychological concept, no statistic** | `scene-agent-2` |
| **s6 · PAYOFF · the one small act** | 23.94–27.32 (clip 23.94–26.87, hold 0.45) | **Hôm nay, chỉ gấp một cái áo lên, đặt lên lưng ghế.** | `Một việc thôi.` — upper-third beat label (4 words) | **THE ONE SMALL VISIBLE ACT.** Her foot **stops** in front of the pile (`research.md` §5: "tiếng gót chân dừng lại trước đống đồ"), then she lifts **one** shirt out of the heap, shakes it out once (the fabric snaps in the air), folds it in two and lays it flat over the back of the chair. **Light L1 — the arrival: as the shirt touches the chair back, her other hand clicks the desk lamp on and the amber pool blooms over the desk, the cold cup and the newly flat shirt.** The sun blade is unchanged. The room is still a mess — one thing in it is flat | Push-in on the shirt, 1.00→1.03, following the fold | the **footstep stopping**; a soft **fabric snap** on the shake-out; a small soft **"cạch"** as the shirt lands on the chair back; **the lamp switch click** on the accent `lưng ghế` (`research.md` §5: "tiếng đồ vật đặt xuống — một tiếng cạch nhỏ" for "một việc nhỏ xong") | **owner brief** — "today it only takes one small thing" + the clothes-on-the-chair prop; `research.md` **C10 / C11 / C12** (WHO Vietnamese guide: "ngay cả các hành động nhỏ nhất cũng có tác động", "hành trình vạn dặm bắt đầu bằng một bước"; C12 = "dọn một chỗ thôi — và điều đó đáng được mừng", INFERENCE). The act is `script-agent`'s staging | `scene-agent-2` |
| **s7a** | 27.32–28.09 (clip 27.32–27.79, hold 0.30) | **Xong rồi.** | — (caption only) | Her hand stays on the folded shirt for a beat, then lifts away. **Light L2.** The lamp pool is now the room's warm centre | Static, 1.00 | Room tone; **no SFX cue** | `script-agent` — the beat that the split key exists to create | `scene-agent-2` |
| **s7b · CLIMAX · the celebration** | 28.09–31.51 (clip 28.09–30.91, hold 0.60) | **Một việc nhỏ thôi. Nhưng hôm nay, việc đó đáng mừng.** | — (caption only) | The camera drifts back; the folded shirt lies flat on the chair back **inside the lamp's amber pool**, its crease catching the light. The heap around it is still a heap — the video does not pretend the room is clean. **Light L2** | Slow drift back, 1.02→1.00 | Room tone; **no SFX cue** | **owner brief** — "mừng từng việc nhỏ" (celebrate each small job) is the user's own framing of the topic line; `research.md` **C12** | `scene-agent-2` |
| **s8a** | 31.51–33.31 (clip 31.51–32.91, hold 0.40) | **Nếu mệt kéo dài mấy tuần,** | — (caption only) | She is standing at the window now, her hand resting on the edge of the half-drawn curtain. The room behind her; the folded shirt visible on the chair back in the background. **Light L2** | Static, 1.00 | Room tone; the outside is starting to be audible | **owner brief** — the one light closing line the owner allows. `research.md` **C14**: the wording is the user's, "nhiều tuần" is **not** a verified clinical threshold (§2.4 UNKNOWN), so it is used as a light reminder and **no number is printed** | `scene-agent-2` |
| **s8b · CLOSING LINE · last word** | 33.31–36.51 (clip 33.31–34.94, hold 3.20) | **hãy nói với một người bạn tin.** | — (caption only) | Same frame; her hand stays on the curtain edge. The line is said to her, in the room. **Light L2.** **BGM cuts on the last word at 34.94 s.** In the 3.20 s hold: **she draws the curtain fully open and the late-afternoon gold floods the room and reaches the folded shirt** — **Light L3**, the warmest frame in the video. No voice from here on | Static, then a slow 1.00→1.02 push as the light opens | **Only room sound: the curtain's fabric sliding on its rail** (~1.2 s, inside the hold). No music swell, no sting | **owner brief** — the allowed closing line; `research.md` **C14 / S10** ("tìm sự hỗ trợ … hoặc từ những người bạn tin tưởng trong cộng đồng"). **No hotline, no number, no CTA** (§3.7) | `scene-agent-2` |

### 2.4 Caption placement (set once here, for every shot)

Captions sit in the **upper-middle band**, baseline of the last line at **y ≈ 880 px** in a 1920 px frame — i.e. **above the lower half of the picture**, so the floor, the blade of light, the folded shirt and the curtain stay unobstructed. **Nothing is placed in the bottom 210 px** (rule C3). The beat labels (`s4`, `s6`) sit higher, at **y ≈ 210 px**, in the display face. This is a deliberate departure from `metkhong`, `cuoc-goi-nho-cua-me` and `thuong-hay-so`, whose captions all sit in the lower third.

---

## 4 · Caption chunks (proposal — `content-agent` locks the final set)

Each chunk ≤ 2 lines, ≤ ~28 characters per line, words reproduced **word for word** from `voice.proposed.json`. Accent words match the three highlight beats (§6.2). `s1`'s caption **is** the cover headline — one text instance, not two.

| key | chunk 1 | chunk 2 | accent (colour `#C58B4E`) |
|---|---|---|---|
| s1 | `Ba ngày rồi bạn` / `chưa dọn phòng.` | `Không phải vì bạn lười.` | `Ba ngày` · `chưa dọn phòng` |
| s2 | `Mệt thì cái gì cũng nặng.` | `Cốc cà phê nguội trên bàn,` / `quần áo trên ghế, giường chưa được gấp.` | `cái gì cũng nặng` · `cà phê nguội` |
| s3a | `Nhìn cả căn phòng,` | `bạn tự nói trong đầu: mình lười thật.` | `mình lười thật` |
| s3b | `Rồi bạn cũng chỉ nằm xuống thôi.` | `Cả ngày mệt, tối chẳng muốn động gì.` | `chẳng muốn động gì` |
| s4 | `Căn phòng này` | `không nói gì về bạn đâu.` | `không nói gì về bạn` |
| s5 | `Có lẽ nó nói: hôm nay bạn` / `không còn sức làm một việc nhỏ nữa.` | `Nó nói về hôm nay thôi.` | `Có lẽ` · `không còn sức làm` · `hôm nay thôi` |
| s6 | `Hôm nay, chỉ gấp một cái áo lên,` | `đặt lên lưng ghế.` | `chỉ gấp một cái áo lên` · `lưng ghế` |
| s7a | `Xong rồi.` | | `Xong rồi` |
| s7b | `Một việc nhỏ thôi.` | `Nhưng hôm nay, việc đó đáng mừng.` | `đáng mừng` |
| s8a | `Nếu mệt kéo dài mấy tuần,` | | — |
| s8b | `hãy nói với một người bạn tin.` | | `một người bạn tin` |

---

## 5 · Silence budget and elasticity

**Every one of the 8.60 s is a named beat.** In-clip phrase pauses (1.40 s) are real audio gaps inside the key's own clip; post-clip holds (7.20 s) are timeline gaps the Reel layer applies. **No hold in this packet is empty air**, and none is inferred from punctuation.

| silence | where | position | what it does |
|---:|---|---|---|
| 0.20 | inside `s2` | after `Mệt thì cái gì cũng nặng.` | the payoff needs a breath before the inventory starts |
| 0.18 | inside `s2` | after `…quần áo trên ghế,` | separates the three objects |
| 0.30 | after `s1` | clip boundary | the dust keeps turning in the blade; the figure's shoulder shifts once — the hook needs air |
| 0.35 | after `s2` | clip boundary | the lateral move finishes on the unmade bed and the duvet edge sags |
| 0.22 | inside `s3b` | after `…nằm xuống thôi.` | the accusation and the exhaustion are two different sentences |
| 0.35 | after `s3a` | clip boundary | she looks away from the room; the phone's screen edge glows a thin line |
| **0.45** | **after `s3b`** | clip boundary | **the phone buzzes once against the sheet** — a muffled vibration — and its screen line flickers once |
| 0.40 | after `s4` | clip boundary | the pull-back settles; the whole room sits still for a beat |
| 0.18 | inside `s5` | after `Có lẽ nó nói:` | a turn, with a breath in it |
| 0.22 | inside `s5` | after `…một việc nhỏ nữa.` | the thesis's two halves need a seam |
| 0.40 | after `s5` | clip boundary | her shoulders drop half a centimetre; the lamp switch is under her fingertip |
| 0.14 | inside `s6` | after `…một cái áo lên,` | the eye follows the shirt to its destination |
| **0.45** | **after `s6`** | clip boundary | **the lamp's amber pool blooms over the desk, the cold cup and the newly flat shirt** — the light's arrival, seen |
| 0.30 | after `s7a` | clip boundary | the folded shirt lies flat and the lamp light moves across it as she straightens |
| 0.26 | inside `s7b` | after `Một việc nhỏ thôi.` | `Nhưng` needs a seam to turn on |
| 0.60 | after `s7b` | clip boundary | the camera drifts back; the room with the lamp pool is held |
| 0.40 | after `s8a` | clip boundary | she is still at the window, her hand on the curtain edge |
| **3.20** | **after `s8b`** | clip boundary | **THE SILENT ENDING.** No voice, no CTA, BGM already cut. The curtain is drawn fully open and the late gold floods the room; the folded shirt on the chair back catches it. Only room sound: fabric on the rail |
| | | **8.60 s** | 22.6 % of 38.14 s |

**Post-word audio tail = 3.20 s** of total silence after the last word (34.94 s), during which only the image and one room sound continue. The identity holds exactly: `34.94 + 3.20 = 38.14`.

**Elasticity, in the order to apply it.**
- **Too long** (measured slower than 3.49 syl/s): cut holds only, in this order — `s7b` hold 0.60 → 0.40 (−0.20), `s3b` hold 0.45 → 0.35 (−0.10), `s4` hold 0.40 → 0.30 (−0.10), `s5` hold 0.40 → 0.30 (−0.10), `s2` hold 0.35 → 0.25 (−0.10), `s1` hold 0.30 → 0.20 (−0.10) = **−0.70 s**; then the silent ending 3.20 → 2.40 (−0.80) = **−1.50 s total**. **Honest bound:** with all cuts applied, `127/r + 7.10 ≤ 45` holds for every rate **r ≥ 3.36 syl/s** (at 3.36 the total is 44.98 s). Speech is never touched, no word is ever cut, and the audio is never sped up.
- **Too short** (measured faster than 5.93 syl/s): lengthen the silent ending 3.20 → up to 5.20 s (+2.00), then `s7b`'s hold 0.60 → 1.20 (+0.60) = **+2.60 s**. Stretching the ending also lengthens the post-word tail, so §1 must be recomputed at the measured rate.

---

## 6 · Structural self-check

### 6.1 Contrast-pair registry

| id | pair | members | carries |
|---|---|---|---|
| **CP1** | the lit corner ↔ the rest of the room | `s5` → `s6` → `s7` | **the turn** — the amber pool on the desk against the violet-grey shadow side |
| **CP2** | the room as judge ↔ the room as witness | `s3` → `s4` | the re-hook — the same objects, a different distance, a different verdict |
| **CP3** | cold cup ↔ warm cup | `s1`/`s2`/`s5` → `s6`/`s7` | the payoff — the same matte, unsteaming surface, later inside the lamp's pool |

CP3 is **light-only**: the cup never moves and never changes shape. Its temperature read is carried by the absence of steam, which the kit does not contain at all.

### 6.2 Highlight beats — exactly three

| # | beat | delivery | visual | light |
|---|---|---|---|---|
| **HB1** | `s5` — `Nó nói về hôm nay thôi.` | plain, factual, slowing only on `hôm nay thôi`; the only line in the video that states a thesis, said without any special effect. **The hedge `Có lẽ` belongs to the same beat and must not be rushed** | her hand flat on the desk beside the unsteaming cup; the lamp switch under her fingertip, unpressed | **L0 — unchanged on purpose.** The room was never a light source; it was a reading |
| **HB2** | `s6` — `Hôm nay, chỉ gấp một cái áo lên, đặt lên lưng ghế.` | light, practical, almost casual; `chỉ` carries the promise. The smallness must not sound like a mission | one shirt out of the heap, shaken once, folded once, laid flat on the chair back | **L1 — the one arrival.** The lamp clicks on as the shirt lands; the amber pool takes the desk, the cup and the new flat shirt |
| **HB3** | `s7b` — `Nhưng hôm nay, việc đó đáng mừng.` | the warmest read in the video, still not loud; `đáng mừng` lands rather than snaps | the folded shirt inside the lamp pool, its crease catching the light; the heap around it is still a heap | **L2** — the lamp's pool is now the room's warm centre, both warm sources in one frame |

Every other shot carries **no** light beat: `s1`/`s2`/`s3a`/`s3b`/`s4` = L0, `s5` = L0, `s6` = L1, `s7a`/`s7b` = L2, `s8a`/`s8b` = L2, the silent ending = L3.

### 6.3 Sensory detail per beat — 8/8 shots

`s1` the draught moving the curtain edge · dust turning inside the sun beam · the beam sliding a few centimetres across the floor · the cup's skin and the dried ring on the wood · the dark lamp bulb · the phone's thin screen edge · the sleeve over the chair armrest · the duvet shoved aside, one pillow dented · `s2` the cup's **absence of steam** (the temperature read) · the dried ring · the coffee ring on the wood · the sleeve's rough weave over the armrest · the duvet's weight sagging at the edge · the pillow dent · `s3a` the back of the head and the shoulder line dropping · the thin screen line on the pillowcase · `s3b` the duvet creasing under her weight · **the muffled vibration of the phone against the sheet** (sound) · the screen line flickering once · `s4` the whole room in one square-on frame · the blade of light lying across the floor · the dust still turning in it · `s5` the flat hand on the wood · the grain under her palm · the **unsteaming** cup beside it · the lamp switch under her fingertip · her shoulders dropping half a centimetre · `s6` **the footstep stopping in front of the pile** (sound) · the fabric snapping as the shirt is shaken out (sound) · **the small "cạch" of the shirt landing on the chair back** (sound) · **the lamp's switch click** (sound) · the shirt's crease going flat · the amber pool landing on the wood · `s7a` the hand lifting off the shirt · the lamp light travelling across the fold · `s7b` the crease catching the amber · the heap still a heap · `s8a` the curtain's rough weave under her fingers · the outside getting audible · `s8b` the same weave · **the fabric sliding on its rail** (sound) · the gold reaching the folded shirt.

### 6.4 Who acts, and when they are introduced

| actor | introduced | acts |
|---|---|---|
| the figure | `s1` frame 0 (the hand on the chair back) | lies down (`s3b`), stops her foot before the pile (`s6`), the fold (`s6`), the lamp click (`s6`), leaves the shirt (`s7a`), draws the curtain open (the silent ending) |
| the draught | `s1` frame 0 | moves the curtain edge and the beam — the only motion in the cover |
| the phone | `s1` frame 0, face-down | buzzes once inside `s3b`'s hold; it is never turned over in the whole runtime |

There is **no second person, no helping hand and no off-screen helper** anywhere in this video. `research.md` §5 suggests "cửa mở, một người đứng ngoài ngưỡng cửa" for the closing line; **this script declines that image on purpose** — a person at the door would make the ending about someone's arrival and imply that the fix is a rescue, which contradicts the thesis that *one small thing is enough today*. The closing line stays an invitation the viewer answers off-screen; the last image is the warm room and the folded shirt.

### 6.5 Climax ≠ CTA · silent hold · determinism

`s7b` is the climax and `s8a`/`s8b` are a **separate shot**: the celebration never shares a breath with the closing instruction. The closing line carries **no hotline, no number, no handle, no follow, no comment** — `research.md` §3.7 verified that no government hotline could be confirmed and that the only verifiable official number (NIMH, S12) is not printed here; the WHO Vietnamese guide (S10) already supports "tìm sự hợp trợ … hoặc từ những người bạn tin tưởng" without a number. The post-word tail is **3.20 s of real silence**, during which only the image and one room sound continue. Nothing in §3 requires wall-clock time or unseeded randomness (§2.3).

### 6.6 Show / tell check

Every line is staged on screen, and no two `tell` lines sit in a row: `s1` shows the room, `s2` shows the three objects, `s3a` shows the loop (she looks at the room and looks away), `s3b` shows her lying down, `s4` shows the room whole, `s5` shows the hand that has stopped, `s6` shows the fold, `s7` shows the flat shirt, `s8` shows the hand on the curtain. **Zero `tell` lines in a row.** The two lines that state an idea (`Mệt thì cái gì cũng nặng.` and `Có lẽ nó nói: … Nó nói về hôm nay thôi.`) are separated by four shown beats and are both the *payoff* and the *thesis*, which the contract requires to be said. The thesis line carries the hedge `Có lẽ` precisely because it is an idea and not an observation (`research.md` §8.1).

---

## 7 · Claims and sources

**This packet makes no factual claim and no statistic.** `research.md` §3.5 lists the numbers it wants excluded from the video; **every one of them is excluded** — nothing numeric appears in the speech, the captions or the on-screen text.

| id | statement on screen / in speech | kind | source |
|---|---|---|---|
| — | *no statistic anywhere* | — | **none used.** `research.md` §3.5: the numbers ("52% Gen Z", "42% Anphabe", "30% rối loạn tâm thần", "16% / 12 tỷ ngày / 1 nghìn tỷ USD", the US "bed rotting" rates) are **excluded**, not used |
| — | *no named psychological concept* | — | **none used.** "Mệt", "không còn sức", "lười" are ordinary Vietnamese words. The script never says "kiệt sức", "trầm cảm", "hội chứng phòng bừa bộn" or "mệt quyết định" (`research.md` §3.1, §3.3, §3.4, §3.10, §3.13) |
| — | *no diagnosis of the viewer* | — | **none made.** `s5` is hedged with `Có lẽ` and attributed to the narrator's reading of the room (`research.md` §8.1) |
| — | *no hotline, no phone number* | — | **none printed** (`research.md` §3.7) |
| U1 | `Ba ngày rồi bạn chưa dọn phòng. Không phải vì bạn lười.` | **owner wording, verbatim** | `brief.md` §User constraints — the mandated opening line, unchanged. `research.md` §6 H1 confirms the second sentence is an INFERENCE, not a conclusion, and that **no word may be added that turns it into a diagnosis** — none is |
| U2 | `Căn phòng bừa bộn` / `không phải là thất bại.` (on screen at `s4`) | **owner wording, verbatim** | `brief.md` §User constraints — the topic line; `research.md` **C16** (INFERENCE from S2: WHO recommends intervening on *conditions*, not on the person) |
| U3 | `Nếu mệt kéo dài mấy tuần, hãy nói với một người bạn tin.` | owner-allowed closing line, **reworded** | `brief.md` §User constraints + `research.md` **C14 / S10**. Two changes, both recorded: `nhiều` → `mấy` (the `nh`+ngã tone stack is the most error-prone Vietnamese cluster — see `voice-direction.md`), and the wording stays the user's because **"nhiều tuần" is not a verified clinical threshold** (`research.md` §2.4 UNKNOWN), so a vaguer word is the safer form of a gentle reminder. **No number is printed** |
| U4 | the props (cold coffee cup, clothes on a chair, unmade bed, face-down phone, half-drawn curtain, desk lamp) | **owner-specified staging** | `brief.md` §User constraints — the owner's own list of props |
| S1 | `Mệt thì cái gì cũng nặng.` | **a figurative saying in the narrator's own voice — no source claimed** | `research.md` §4A gives the same register from the audience's own words ("Cơ thể mệt nhoài… không thể làm được gì", S8) and **C05** (Diamond, S3) documents the underlying mechanism; the line itself is a shared observation, not a finding, and no source is attributed to it on screen |
| S2 | `Có lẽ nó nói: hôm nay bạn không còn sức làm một việc nhỏ nữa. Nó nói về hôm nay thôi.` | **the narrator's hedged reading** | `research.md` §8.1 requires the "mess ← depletion" link to be spoken humanely, never as a finding; **C05** (S3) supports the mechanism, **C15** is the allowed INFERENCE wording. **The `Có lẽ` is mandatory, not decorative** |
| S3 | `Hôm nay, chỉ gấp một cái áo lên, đặt lên lưng ghế.` + `Một việc nhỏ thôi. Nhưng hôm nay, việc đó đáng mừng.` | **the owner's "mừng từng việc nhỏ" framing** | `research.md` **C10 / C11 / C12** (WHO Vietnamese guide: "ngay cả các hành động nhỏ nhất cũng có tác động", "hành trình vạn dặm bắt đầu bằng một bước"; C12 = "dọn một chỗ thôi — và điều đó đáng được mừng"). **No claim that a small act *treats* anything** (`research.md` §3.6) |
| S4 | every other spoken line | **script-agent's own words, staged, no claim** | `script.md` §3 `source` column, shot by shot |

**Claims table for `content-agent`:** the only on-screen text that carries a source id is **U2 → research C16**. Everything else on screen is either the owner's mandated line (U1) or a stage direction. `content-agent` must mark **no** recreated UI and **no** recreated diagram in this video, so the `minh hoạ` label list is empty.

---

## 8 · Voice route and rate provenance

**Route 2 — local VieNeu-TTS clone**, reference `docs/can-phong-bua-bon-khong-phai-that-bai/voice-ref/refThanhLong.wav` (director-verified: md5 `199de31c8281d895dd571e36fe464ed5`, 8.20 s), voice slug `thanh-long-nang-cao`. This is a **director/owner decision recorded in `brief.md` §Identity** — "Voice is fixed by the user — no benchmark of other voices, no change." No benchmark of other voices was run by `script-agent` and none is claimed.

**What 4.3 syl/s is.** It is the **planning rate**, taken from the owner's own pacing instruction in `brief.md` §Identity (a brisk but natural read, target +4 %…+8 % over the engine's natural 4.1 syl/s ⇒ 4.26–4.43). 4.1 syl/s is this repo's **planning convention, not a measurement**; measured Thanh-Long runs in this repo sit lower (`docs/xay-doi-minh-hay-chung-minh/voice-report.md` reports 194 syllables over 51.75 s = 3.75 syl/s; `docs/lam-lai-…/audio-review.md` reports ≈3.5–3.7). The plan is therefore **robust to a slower run**: the band 3.5–4.5 all lands inside 30–45 s (§1.1), and the elasticity in §5 covers anything slower than 3.49 syl/s. **The audio is never sped up to fit; only holds are cut.**

**Join rule.** Phrase texts are joined with **exactly one space**: `" ".join(phrase.text) == voice.proposed.json[key]`, byte-for-byte, verified programmatically before returning (§10). Every phrase boundary in this packet falls on a canonical space, so an assembler that joins with `""` would merge two words and fail the CER gate.
