# Voice Direction — can-phong-bua-bon-khong-phai-that-bai

**Video ID:** can-phong-bua-bon-khong-phai-that-bai · **Profile:** story — one consistent stylised figure (asset class: `script.md` §2.3); the room is the hero, the figure is present as hands, forearms, shoulder and the back of the head, never a rendered face.

**Canonical text:** `voice.proposed.json` — **11 keys**, played back in file order:
`s1 · s2 · s3a · s3b · s4 · s5 · s6 · s7a · s7b · s8a · s8b`
(Three shots carry two keys each — `s3`, `s7`, `s8`. Each split is a **real timeline gap**, never punctuation. `scripts/gen-voice-clone.py` walks the file in insertion order, so this is the playback order.)

## Voice reference — route 2, Thanh Long

**All eleven `reference` fields in `voice-performance.proposed.json` are `docs/can-phong-bua-bon-khong-phai-that-bai/voice-ref/refThanhLong.wav`.** `referenceSelectionStatus` is `selected`; nothing in the packet says `pending`.

- **Route:** 2 — local VieNeu clone (`~/.venvs/vieneu`), reference read from the local WAV above. No external upload, no API voice, no network call at synthesis time.
- **Why this reference:** a **director/owner decision already recorded** in `brief.md` §Identity — "Voice is fixed by the user — no benchmark of other voices, no change." `script-agent` did **not** benchmark other voices and does not claim a naturalness ranking.
- **Machine facts, quoted not re-claimed:** the reference exists; md5 `199de31c8281d895dd571e36fe464ed5`, 8.20 s — the director's verification (`brief.md` §Phase 0). This runtime has **no shell or process-execution tool**, so `script-agent` could not run `ffprobe` itself; the figures above are the director's, not a new measurement.
- **Reference handling.** The pinned `reference.source` is the synthesis reference and is **used unmodified** — it carries no `startSeconds` / `durationSeconds`, so `gen-voice-clone.py` will not crop it. If a re-cut is genuinely needed, **overwrite this exact path** and report it to the director; a second filename under a different name would be invisible to the contract and the run would silently use the uncropped audio.
- **Left to `voice-agent`:** the CER/ASR gate per phrase, one voice across all eleven keys, and the measured durations that replace the planning timeline in `script.md` §1.

## Audience addressed

**One person ("bạn")** — the viewer in their own twenties or thirties who has been tired for weeks: work, pressure, sometimes loneliness, and a room at home that has quietly stopped being looked after. Singular, addressed directly, never "chúng ta", never an audience.

## Speaker relationship

**A friend who has been in that room too** — someone who knows exactly what a cold cup and an unmade bed look like at the end of a long day, and who is sitting next to you rather than standing over you. Peer to peer. **Not** a therapist, **not** a coach, **not** a productivity voice. The speaker never asks the viewer to do better; the speaker only refuses to let the viewer be a verdict against themselves.

## Overall delivery personality

**Gentle, close, conversational, emotionally expressive but never theatrical.** Brisk at the hook because the hook is a fact; unhurried everywhere else because the subject is exhaustion. Varied intonation, meaningful emphasis, natural breaths, **no uniform reading cadence**. **No forced humour, no exaggerated sadness, no whispering, no crying.** Expressiveness comes from *where the voice slows and where it stops*, not from volume. The speaker is warmer at the end than at the start, and never louder.

**Planning rate is 4.3 syl/s.** 4.1 syl/s is this repo's **planning convention, not a measurement**; the owner's own pacing instruction (`brief.md` §Identity) asks for a brisk but natural read at **+4 %…+8 %** over the engine's natural 4.1, i.e. **4.26–4.43** — 4.3 is the middle of that mandated band. Measured Thanh-Long runs in this repo sit lower (`docs/xay-doi-minh-hay-chung-minh/voice-report.md`: 194 syllables over 51.75 s = 3.75 syl/s; `docs/lam-lai-…/audio-review.md`: ≈3.5–3.7). The plan is built to survive that: `script.md` §1.1 keeps the total inside 30–45 s for any measured rate between **3.50 and 6.02 syl/s**, and §5 cuts *holds*, never words and never the tempo, if a run comes out long. **The audio is never sped up to fit.**

**Light plan: `script.md` §2.1 is the single source.** This file references the ids `L0`–`L3` and never re-describes or re-claims an arrival. There is exactly **one** arrival, `L1` at `s6`; `L2` and `L3` are the same two sources widening.

## Energy curve (planning rate 4.3 syl/s; the full identity is `script.md` §1)

| span | what happens | energy |
|---|---|---|
| 0.00–3.09 s (`s1`) | the hook — the room is named and the accusation removed | lightest, quickest read in the video |
| 3.09–8.47 s (`s2`) | **the first payoff** at 4.49 s, then the room's inventory | warm and factual; one deliberate landing, then a steady three-object list that gets lighter each time |
| 8.47–15.77 s (`s3a` → `s3b`) | the loop and the exhausted body | the lowest stretch of the video; slow, small, unperformed |
| **15.77–18.26 s (`s4`)** | **the re-hook** — the room stops judging you | one lift on `đâu`, then a fall; the only hint of playfulness in the packet |
| 18.26–23.94 s (`s5`) | the thesis, offered as a reading | level and unhurried; the calmest and steadiest passage |
| 23.94–27.32 s (`s6`) | **the payoff act** — one shirt folded, the lamp clicked on | light and practical, almost casual; the smallest job in the packet gets the most concrete delivery |
| 27.32–31.51 s (`s7a` → `s7b`) | **the climax** — the celebration | the warmest read in the video, still not loud |
| 31.51–34.94 s (`s8a` → `s8b`) | the one light closing line | the softest, most aside-like passage; level, and it simply stops |
| 34.94–38.14 s (the silent ending) | the curtain opens, the light floods | **no voice at all** |

## Emotional turns

1. **3.09–4.49 s (`s2`, clause 1)** — the payoff: the mess is not moral, it is weight. Said as a fact, not as a comfort.
2. **8.47–11.26 s (`s3a`)** — the viewer's own accusation is spoken out loud for the first time, in the viewer's own words. Embarrassed, small.
3. **15.77–17.86 s (`s4`)** — the re-hook: the room is a witness, not a judge. The only gently playful moment in the packet.
4. **18.26–23.54 s (`s5`)** — the thesis, offered as the narrator's own reading: `Có lẽ nó nói: … Nó nói về hôm nay thôi.` The plainest, steadiest, most important line in the video. **`Có lẽ` must be audible** — it is the honesty of the video, not a wobble.
5. **23.94–26.87 s (`s6`)** — the turn into action: the voice gets *practical*, and the lamp clicks on.
6. **28.09–30.91 s (`s7b`)** — the celebration: the warmest read in the video, and still not loud.
7. **33.31–34.94 s (`s8b`)** — the last words: one calm clause, no lift, and the voice stops.

## Restraint

- **No whisper anywhere.** The quiet passages are close and unhurried, not stage breaths.
- **No music swell under a line**, no sting, no dramatic pause longer than **3.20 s** (the silent ending) anywhere in the packet.
- **No repetition for effect.** `s5`'s `Nó nói … Nó nói …` is the only repeat, and it is the answer to `s4`'s question — a structural echo, not a rhetorical one.
- **No advice, no diagnosis, no "bạn cần phải…", no "bạn mạnh lắm".** The video describes, then celebrates, then leaves one small practical line and stops.
- **No CTA.** No handle, no follow, no comment, no hotline, no phone number — the brief allows exactly one light closing line and it gets nothing more.
- The closing line is **never** crammed into the same breath as the celebration: `s7b` and `s8a`/`s8b` are separate shots, and the last word is followed by **3.20 s of silence**.

## Ending behaviour

The last words of `s8b` are said at an even, settled volume and simply **stop** — the audio does not fade out on the words. `s8a` and `s8b` are **split keys**, so the comma in the closing line is a **real 0.40 s timeline gap** (the hold after `s8a`), not a drawn-out vowel. The last word lands at **35.13 s**; **BGM cuts on that instant**. The 3.20 s hold that follows is the ending: the curtain is drawn fully open, the late gold floods the room and reaches the folded shirt, and the only sound is fabric on the rail. If a measured run lands short, the fix is this tail (3.20 s → up to 5.20 s); `s8b` is never re-read faster, slower or with more feeling to fill it.

## Shot direction

| key | intent | emotion | accent words | fast / slow sections | breath & pause placement | ending contour |
|---|---|---|---|---|---|---|
| **s1** | HOOK + frame-0 cover: name the viewer's room and take the accusation away; the on-screen text must carry the whole hook with the sound off | gentle relief, close, like a friend letting you off — **never pity, never a verdict** | **Ba ngày** · **chưa dọn phòng** · **Không phải vì bạn lười** | **Fast:** `Ba ngày rồi` · **Settles:** `Không phải vì bạn lười` | No breath inside the clip — the sentence boundary is the engine's own, not a timeline hold. **0.30 s of real silence after the clip**: the dust keeps turning and the shoulder shifts once | Flat, level — a statement that lands, not a question |
| **s2** | **THE FIRST PAYOFF** — prove the video has seen the viewer's actual room, then name the objects | observational, close, unsurprised — the tone of someone looking around a room *with* you | **cái gì cũng nặng** · **cà phê nguội** · **chưa được gấp** | The first clause is a plain fact and lands at once; the three objects then come one at a time, each **slightly lighter** than the last | **0.20 s real gap inside the clip** after `Mệt thì cái gì cũng nặng.` (the payoff needs a breath before the inventory); **0.18 s** after `…quần áo trên ghế,`; **0.35 s real silence after the clip** — the lateral move finishes on the bed | Falling — the last object settles the camera and the room |
| **s3a** | show the loop: the room turned into a verdict on the person; the quoted self-accusation is the **viewer's inner voice**, not the narrator's opinion | quiet, slightly embarrassed — repeating something you say to yourself and are ashamed of | **mình lười thật** | The setup clause is quick; the quoted words **slow slightly**, because they are being heard out loud for the first time | No pause inside the clip. **0.35 s real silence after** — she looks away; the phone's screen edge shows a thin line | Flat — the accusation does not want an answer yet |
| **s3b** | land the depleted state in plain physical words — tired, not lazy; **no clinical term, no statistic** | flat, resigned, unbothered — a fact, not a confession | **nằm xuống thôi** · **chẳng muốn động gì** | First clause plain and low; second clause **slower**, with the fatigue audible in the pace rather than in the words | **0.22 s real gap inside the clip** — the accusation and the exhaustion are two different sentences. **0.55 s real silence after**, and that hold is where the phone buzzes once against the sheet | Trailing, no lift — nothing is being promised |
| **s4** | **RE-HOOK** — turn the room from judge into witness; the `đâu` at the end is the whole point | warm, assured, **slightly playful at the edge** — never smug | **không nói gì về bạn** | One clause, unhurried; the final `đâu` **lifts slightly and falls back** — the only hint of playfulness in the packet | No pause inside. **0.50 s real silence after** — the pull-back settles and the room sits still | Falling on `đâu`, leaving the room's answer open |
| **s5** | answer the re-hook and state the thesis in plain words. **The hedge `Có lẽ` is mandatory** — `research.md` §8.1 requires the link between a depleted state and a messy room to be spoken as the narrator's reading, never as a finding, because no study measures it | plain, factual, almost tender underneath — an explanation **offered**, not a verdict | **Có lẽ** · **không còn sức làm một việc nhỏ nữa** · **hôm nay thôi** | `Có lẽ nó nói:` is a quiet, careful turn — **not a certainty and not a rush**; the middle clause is level; the last clause **slows and lands on `thôi`** | **0.18 s real gap inside the clip** after `Có lẽ nó nói:` (a turn with a breath in it); **0.22 s** after `…một việc nhỏ nữa.` (the thesis's two halves need a seam); **0.40 s real silence after** — her shoulders drop half a centimetre | Flat and settled on `thôi` — the promise the whole video has been making |
| **s6** | **THE PAYOFF** — name the one small act exactly, so the viewer can see it and check it; `chỉ` carries the whole promise | light, easy, almost casual — **the smallness is the point, so the voice must not make it sound like a mission** | **chỉ gấp một cái áo lên** · **lưng ghế** | **Brisk and practical** through the first clause; the destination **slows a touch** so the eye can follow it | **0.14 s real gap inside the clip** after `…một cái áo lên,`; **0.60 s real silence after**, and that hold is where the lamp's amber pool blooms over the desk, the cup and the newly flat shirt | Settles — the act is done and the sentence is done |
| **s7a** | a single satisfied syllable after the act — the beat the split key exists to create | quiet satisfaction, almost a small exhale | **Xong rồi** | Short, unhurried, with the natural drop at the end of a finished action | No pause inside. **0.30 s real silence after** — the folded shirt lies flat and the lamp light travels across it as she straightens | Falls away — it must leave room for the celebration that follows |
| **s7b** | **THE CLIMAX** — celebrate the small thing without teaching it; the celebration is stated, not suggested, because the user's own theme is *mừng từng việc nhỏ* | warm — the warmest read in the video, and still not loud | **Một việc nhỏ thôi** · **đáng mừng** | First clause light and quick; `Nhưng` opens the turn; the last clause **slows a little** so the celebration lands rather than snaps | **0.26 s real gap inside the clip** after `Một việc nhỏ thôi.` — `Nhưng` needs a seam to turn on; **0.75 s real silence after** — the camera drifts back and the room is held | Settles and holds — the voice does not fall away into a fade |
| **s8a** | open the one light closing line the brief allows; it must sound like an aside from a friend, not like advice | quiet, practical, unemphatic — the softest line in the video | **mấy tuần** | Unhurried; the clause is **set up and left open**, because the gap after it is real silence | No pause inside. **0.40 s real silence after** — she is still at the window, her hand on the curtain edge | Rests on the comma — the sentence is not finished and does not pretend to be |
| **s8b** | the last words of the video: say it to one person, then stop. **No hotline, no number, no follow, no comment** | gentle, direct, close | **một người bạn tin** | One calm clause, **no lift on the final word** — the instruction must not sound like a call to action | No pause inside. **3.20 s of real silence after** — the silent ending: the curtain is drawn fully open, the gold floods the room, the folded shirt catches it | Level, and simply stops |

## Highlight beats (three, each with paired voice + visual + light)

| # | key & line | **voice** | **visual** | **light** |
|---|---|---|---|---|
| **HB1** | `s5` — `Nó nói về hôm nay thôi.` | the plainest read in the packet; the only line that states a thesis, said with no special effect at all; it slows on `hôm nay thôi` and lands flat | her hand **flat** on the desk beside the unsteaming cup; the lamp switch under her fingertip, unpressed | **L0 — unchanged on purpose.** The room was never a light source; it was a reading |
| **HB2** | `s6` — `Hôm nay, chỉ gấp một cái áo lên, đặt lên lưng ghế.` | light and practical, almost casual; `chỉ` does the work; the act must not sound like a mission | one shirt out of the heap, shaken once, folded once, laid flat on the chair back | **L1 — the one arrival.** The lamp clicks on as the shirt lands; the amber pool takes the desk, the cup and the new flat shirt |
| **HB3** | `s7b` — `Nhưng hôm nay, việc đó đáng mừng.` | the warmest read in the video, still not loud; `đáng mừng` **lands rather than snaps** | the folded shirt inside the lamp pool, its crease catching the light; the heap around it is still a heap | **L2** — the lamp's pool is now the room's warm centre, both warm sources in one frame |

Every other key carries **no** highlight beat: `s1`, `s2`, `s3a`, `s3b`, `s4`, `s8a`, `s8b` and the silent ending are marked "no light beat" in `script.md` §6.2.

---

## tone-probe.py missing — manual tone review

**`scripts/tone-probe.py` does not exist in this repository** (confirmed by listing `scripts/`; the same absence is recorded in `brief.md` §Phase 0). **It was not run and no output from it is claimed.** The review below was done by hand, line by line, against this rule:

> **RISK** = a syllable pair in which (a) an `ng`/`nh` initial carrying a **non-huyền** tone (sắc, hỏi, ngã) sits next to another `ng`/`nh` initial; or (b) an **ngã** syllable is immediately followed by another **ngã**; or (c) an **hỏi** syllable is adjacent to an **ngã** syllable.
> **LOW** = a single `ng`/`nh` initial next to a plain nặng syllable (`không`, `ngày`, `nữa`, `nguội`, `trong` …). These are unambiguous huyền words that read cleanly and are common Vietnamese bigrams; they are recorded, not rewritten.
> **OK** = no `ng`/`nh` initial at all, or only isolated ones.

Every RISK found was rewritten **now, inside the script stage**, and the rewrite is already in `voice.proposed.json`, `script.md` and `voice-performance.proposed.json`. The two rewrites are the only changes this review produced.

| word | sentence (as it would have been) | verdict | rewrite (as written) |
|---|---|---|---|
| `bạn nằm` | ~~Rồi bạn nằm xuống.~~ (ngã + ngã) | **RISK — rewritten** | **Rồi bạn cũng chỉ nằm xuống thôi.** — `ngã` + `huyền` (`cũng`), `huyền` + `ngã` (`chỉ nằm`): no two ngã syllables touch. Meaning unchanged; `cũng chỉ` carries the resignation better than the original. Applied to `s3b`; syllable count 4 → 7, already inside the 125-syl budget |
| `nhiều tuần` | ~~Nếu mệt kéo dài nhiều tuần,~~ (`nh` + ngã — the most error-prone Vietnamese tone stack) | **RISK — rewritten** | **Nếu mệt kéo dài mấy tuần,** — `mấy` is ngã and is followed by `tuần` (huyền); `ngã` is never adjacent to `ngã` or `hỏi` anywhere in the sentence. Meaning preserved ("if it lasts several weeks"), and the closing line stays softer. Applied to `s8a`; syllable count 6 → 8 |
| `Ba ngày` | Ba ngày rồi bạn chưa dọn phòng. (sắc → ng/huyền) | **LOW — cannot be rewritten** | **Owner-mandated verbatim line** (`brief.md` §User constraints). `Ba ngày` is a fixed everyday phrase and `ngày` is unambiguously huyền. **No rewrite is possible and none is attempted.** Mitigation if the clone stumbles on it: the hard-stop ladder (3 candidates → one re-split → accepted-risk) and a re-cut of `s1` only, which reopens gate A |
| `không phải` | Không phải vì bạn lười. (ng/huyền + huyền) | **LOW** | no rewrite — both syllables are unambiguous huyền; standard Vietnamese |
| `bạn chưa` · `vì bạn lười` | (in the same mandated line) | **LOW** | no rewrite — ngã next to huyền only; no ngã/ngã and no hỏi/ngã adjacency |
| `phê nguội` | Cốc cà phê nguội trên bàn… (huyền → ng/huyền) | **LOW** | no rewrite — one isolated ng/huyền in a run of huyền |
| `cái gì cũng nặng` | Mệt thì cái gì cũng nặng. (ng/huyền + huyền) | **LOW** | no rewrite — `cũng` is huyền |
| `ngày mệt` | Cả ngày mệt, tối chẳng muốn động gì. (ng/huyền + huyền) | **LOW** | no rewrite |
| `chẳng muốn động gì` | (same sentence) | **LOW** | no rewrite — `chẳng`, `động`, `gì` are all huyền |
| `trong đầu` | Nhìn cả căn phòng, bạn tự nói trong đầu… (ng/huyền + huyền) | **LOW** | no rewrite |
| `về bạn đâu` | Căn phòng này không nói gì về bạn đâu. (huyền + ngã + huyền) | **LOW** | no rewrite — the ngã in `bạn` is surrounded by huyền; the deliberate gentle lift on `đâu` is prosody, not a tone-mark clash |
| `nay bạn không` | Nó nói: hôm nay bạn không còn sức… (ngã + ng/huyền) | **LOW** | no rewrite — `không` is unambiguously huyền and `bạn không` is one of the most common bigrams in Vietnamese; the ngã is followed by huyền, not by another ngã |
| `không còn sức` | (same sentence) | **LOW** | no rewrite |
| `nay, việc đó` | Nhưng hôm nay, việc đó đáng mừng. | **LOW** | no rewrite — `việc`, `đó` are huyền |
| `một người bạn tin` | hãy nói với một người bạn tin. (ng/huyền + ngã + huyền) | **LOW** | no rewrite |
| `Xong rồi` | Xong rồi. | **OK** | no ng/nh initial at all |

**Words checked and confirmed absent** (each would have been a RISK if present): `nghỉ`, `ngoài`, `những`, `người` as an addressed noun, `nhẹ`, `nhanh`, `nhớ`, `nghe` — **none appears in any line of this script**, so no `nh`/`ng` word carries a sắc or hỏi tone anywhere in the packet. **No `hỏi` syllable is adjacent to an `ngã` syllable in any line** (`nói` is hỏi and is always followed by a huyền word).

**Final verdict: the packet is clean of RISK tone stacks.** The two rewrites above are applied everywhere they are needed; the one remaining LOW cluster sits inside the owner's mandated line and is recorded as an accepted risk with its mitigation.

---

## Production-metadata note

Every direction above is **production metadata**. **None of it appears in `voice.proposed.json` or in any caption chunk.** Spoken text and captions remain exactly the canonical values in `voice.proposed.json`; acting notes live only in the `delivery` columns of `script.md` §3 and in `voice-performance.proposed.json`.

**Phrase join rule.** Phrase texts are joined with **exactly one space** — `" ".join(phrase.text) == voice.proposed.json[key]`, byte-for-byte — and that join is verified against the canonical file before generation. Every phrase boundary in this packet falls on a canonical space, so an assembler that joins with `""` would merge two words and fail the CER gate.

**Accent words.** The accent set for each key is one identical string list in `script.md` §3, in the table above, and in `voice-performance.proposed.json` (`accentWords` plus the per-phrase `emphasis` arrays). Every accent word appears in the `emphasis` array of the phrase that actually contains it.
