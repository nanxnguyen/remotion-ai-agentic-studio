# Voice Direction — giac-mo-tu-bo

**Video ID:** giac-mo-tu-bo · **Profile:** story — one consistent stylised figure (asset class: `script.md` §2.3),
**never shown above the collarbone**, acting out each beat
**Canonical text:** `voice.proposed.json` — **17 keys**, played back in file order:
`s1 · s2 · s3 · s4 · s5a · s5b · s6 · s7 · s8 · s9 · s10 · s11 · s12 · s13 · s14 · s15 · s16`
(`s1`, `s2`, `s5a`, `s5b`, `s7`, `s9`, `s10`, `s11`, `s12`, `s13`, `s14`, `s16` are the owner's own lines; **one move
is named — `s1` is L1 + L3 and `s2` is L2, so L3 is heard before L2** and L4–L12 keep their order; `s3`, `s4`, `s6`,
`s8`, `s15` are the five `[ADD]` lines justified in `script.md` §7.
`scripts/gen-voice-clone.py` walks the file in insertion order, so this **is** the playback order.)
`END` is a **shot row with no voice key** — the silent topic card at 53.27–56.07 s, with no speech at all.

## Voice reference — route 2, Thanh Long Nâng Cao

**All 17 `reference` fields in `voice-performance.proposed.json` name the same path:
`docs/giac-mo-tu-bo/voice-ref/thanh-long-nang-cao-ref.wav`.** `referenceSelectionStatus` is **`pending`** on every
shot, because the file does not exist yet — see the three honest lines below.

- **Route:** 2 — local VieNeu-TTS clone (`~/.venvs/vieneu`), reference read from a local WAV. No external upload, no
  API voice.
- **Why this voice:** it is a **Phase 0 fact, not an agent choice.** The owner authorised cloning **Thanh Long Nâng
  Cao** in the monitor on 2026-10-18 (`request.md`, "Voice clone"), `status.json` already carries
  `voice: "thanh-long-nang-cao"`, and Phase 0 preflight recorded the preview
  `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3` decoding as **35.93 s**. I confirmed by listing the
  directory that `vietnamese-voice-samples/previews/` **does exist** on this machine and that the file is in it.
- **What is still pending, stated plainly:** `docs/giac-mo-tu-bo/voice-ref/` **does not exist**, so the reference
  WAV does not exist. **`voice-agent` cuts it**: 6–8 s, one speaker, no music, no background, from the preview at
  that exact path. Nothing in this packet claims the file exists and nothing calls it verified.
- **Reference handling (`NEW-4`).** The pinned path is the synthesis reference and is used **unmodified** — it
  carries no `startSeconds` / `durationSeconds`, so `gen-voice-clone.py` will not crop it. **Do not create a second
  reference file under a different name:** the sidecar is read-only for `voice-agent`, so a new filename would be
  invisible to the contract and the run would silently use the uncropped audio. If a re-cut is genuinely needed,
  **overwrite this exact path** and report it to the director.
- **Left to `voice-agent`:** listen to the preview before cutting (it is a demo reel, so the cut must be a single
  clean sentence), keep all 17 shots on one voice and one reference, run the CER/ASR gate, and report the measured
  per-clip rate that replaces `script.md` §1's plan figures.

## Audience addressed

**One person ("bạn") — the viewer who once wanted something and quietly stopped mentioning it.** Singular,
addressed directly, **never "chúng ta", never an audience**, never a group. The video speaks to the viewer the way
it would speak to someone who has just found an old notebook, and it assumes no gender, no age and no circumstance
(`U1`): every line has to be true for a 24-year-old and for a 40-year-old, which is why the delivery is **level and
plain rather than confiding or confessional**.

## Speaker relationship

**A friend who already knows, and who is not going to make a scene about it.** Peer to peer — no coach, no
therapist, no motivational voice, no elder. This friend has the same list somewhere, so the tone is
**recognition, not sympathy**: the video never says "tội nghiệp bạn" and never says "bạn nên". It states what
happened, lets the object do the work, and at the end it takes the debt off the viewer's shoulders without
applauding them for it.

## Overall delivery personality

**Level, unhurried, warm, dry — emotionally precise but never theatrical.** Inside one video: mildly amused at the
office and at the phone (`s4`, `s5a`, `s5b`), plain and low at the finding and the pity (`s7`, `s10`, `s11`), open
and warm at the close (`s16`), and **slightly amused at itself** at the chord (`s15`).

- **No whisper anywhere.** Every quiet passage is close and unhurried, not breathy, not stage-acting.
- **No performed emotion**: no trembling on `thấy thương`, no sighing, no audible laugh, no drawn-out vowels, no
  crying quiver, **no sentimentality**. `experimentalCues` are **disabled** (`[cười]`, `[thở dài]`, `[hắng giọng]`
  and similar non-spoken cues are not requested anywhere in this packet).
- **Varied intonation, meaningful emphasis, natural phrase shape** — no uniform reading cadence, and no two
  consecutive lines delivered the same way.
- **Expressiveness comes from *where the voice slows and where it stops*, never from level.** **Whole-line level and
  within-line dynamics are two different things here.** No line is asked to be **louder** than any other, and **no line
  asks for level automation inside the take** — the engine exposes no volume control (the sidecar records this as an
  unsupported control). What the three beat lines (`s10`, `s11`, `s16`) get instead is a **smaller** delivery — closer,
  less air, fewer consonants — not a quieter gain; at `s11` the line **thins** on `bận đến thế` and stops. Any
  whole-line gain difference is **clip gain in the mix at assembly — a timeline/mix parameter, never an engine
  parameter** — and never part of the performance.
- **The pacing is not "slow".** The plan is the measured rate of this exact voice (§below), so nothing here asks the
  engine for something it does not do.

**Planning rate is 3.9 syl/s, with the band 3.6–4.4 modelled (`script.md` §9 gives the numbers).** 4.1 syl/s is a
**planning convention, not a measurement of this video**: the only trace of it in the repo is a quotation inside
`docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/script-review.fidelity.md:502`, which quotes a file that no longer exists
here — that absent file is not claimed to exist and no first-hand 4.1 measurement is claimed. This voice has been
measured: `docs/thuong-hay-so-bat-dau-lai/voice-report.md:34` reports **207 syllables over 52.6 s = 3.9 syl/s** for
the identical Thanh-Long clone (per-clip **3.58–4.22**, lines 17–27 of that file), and
`docs/chung-minh-de-lam-gi/voice-report.md` — the same ref file — shows **3.17–4.45** across clips. **So 3.9 syl/s is
the measured average of this voice, and 3.6–4.4 is the band this plan *models*** — the same engine has measured
3.17–4.45, so the window sits *inside* the observed spread rather than describing what this run will produce — and the
intimate register is carried by holds, light and emphasis rather than by slowing the voice down. **No direction in this packet requests a pace the engine cannot deliver, and no
number here is called "measured" without its citation.** **Honest bound:** at the observed floor (3.17 syl/s) this
script runs **66.41 s** (55.21 s of speech + 11.20 s of silence), and **64.56 s** with the whole 1.85 s trim set — so a
measured rate below 3.586 syl/s is escalated to the director and the owner (accept > 60 s, or cut an owner word), never
fixed by speeding the voice up or trimming words silently.

**Light plan: `script.md` §2.1 is the single source.** This file references the ids `L0`–`L4` and the held `L2-held`
state, and never
re-describes or re-claims an arrival. There is exactly **one** arrival in the packet — **`L2` at `s7`**, the first
warm light in the video — and `L3` (`s10`–`s11`) and `L4` (`s15`) are the same window widening, not new light.

## Energy curve (planning rate 3.9 syl/s; the full identity is `script.md` §1)

| span | what happens | energy |
|---|---|---|
| 0.00–2.82 s (`s1`) | the hook: your promise, then your job | **lightest and quickest read in the video**, the second sentence lower and flatter than the first |
| 3.07–8.96 s (`s2` → `s3`) | the list, then the paper itself | warm by one degree at `s2` — the only line allowed to sound pleased — then factual and quiet at `s3` |
| 9.21–14.78 s (`s4` → `s5a` → `s5b`) | the office, the habit, and the deferred sentence | **flat and deliberately the least emotional passage in the video**; `s5b` said small, quick and dismissive |
| 15.03–18.10 s (`s6`) | the finger that stops short | almost casual, then **smaller and lower on `rồi tắt màn hình.`** — an anticlimax delivered as an anticlimax |
| **18.35–22.96 s (`s7`)** | **the re-hook and the one arrival** | almost offhand, then slower, lower and warmer; the last three words as one unit |
| 23.36–27.97 s (`s8` → `s9`) | dust, and intact ink | small and tactile; then the steadiest line in the video |
| **28.42–34.40 s (`s10` → `s11`)** | **the pity** | the video's emotional floor: thinning rather than swelling, then the **smallest** line in the packet |
| 34.85–41.39 s (`s12` → `s13`) | the permission, then the pivot | steady and even; `Nhưng` alone, quiet, with 0.25 s of real silence after it |
| 41.69–43.69 s (`s14`) | one chord is enough | the smallest possible sentence, given the smallest possible weight |
| **44.39–46.94 s (`s15`)** | **the chord — the sound payoff** | warm, slightly amused, unimpressed with itself; the last emphasis of the video on `chưa quen` |
| 47.29–52.72 s (`s16`) | the close: not to make up for it, only to be glad | **warmer than anything else and not one degree louder**; stops on the word |
| 53.27–56.07 s (END) | silent | no voice at all |

## Emotional turns

1. **2.82 s (`s1` → cut)** — the promise is cut off by ordinary work. Level, no drama, no audible regret: the
   viewer must hear an everyday sentence, not a lament.
2. **13.76–14.78 s (`s5b`)** — the deferred sentence, said **as small as it was actually said**. This is the
   turn the video is built on, and its power depends entirely on the voice under-selling it.
3. **18.35 s (`s7`)** — the re-hook: the object is not lost, it is found, and the light arrives with it.
4. **28.42–31.23 s (`s10`)** — the pity arrives as a **thinning**, not a swell; the 0.25 s gap inside the line is
   where the finger stops mid-word.
5. **31.58–34.40 s (`s11`)** — the **smallest** line in the video, said as an observation about a stranger, the line
   **thinning** on `bận đến thế` and **stopping — never a whisper**.
6. **38.83 s (`s13`)** — the pivot: `Nhưng` alone, then 0.25 s of real silence, then the clause.
7. **44.39–46.94 s (`s15`)** — the release, and it is imperfect on purpose: a buzzing chord, fingers that are not
   used to pressing, and a voice that finds it slightly funny rather than triumphant.
8. **52.72 s (`s16`)** — the debt refused out loud, then the voice stops on the word.

## Restraint

- **No whisper anywhere.** Quiet is close and unhurried, never stage breath.
- No music swell under a line; **no hold in this packet is longer than 2.80 s**, and the 2.80 s hold is the closing
  card.
- No repetition for effect anywhere in this packet: every line is said once.
- **No advice, no diagnosis, no "bạn nên…", no "đừng bỏ lỡ", no "không bao giờ là quá muộn"** — even though the
  audience language contains that last one (`F14`/`S8`); using it would turn the video into a motivational post.
- **No CTA**, no follow/comment, no handle, no end-card sign-off, no "hãy thử".
- The owner's own `…` in `s13` is **kept verbatim in the text** and is **not performed**: the dramatic beat around
  it is the **0.25 s gap inside the clip** (`pauseAfterSeconds`), never a sustained vowel and never the ellipsis
  itself.
- **The `[ADD]` lines are given no more conviction than the owner's lines.** All five are said at the same level as
  the account around them, so a listener cannot hear which sentences were added.

**Join obligation (`C-06`).** The 17 `minimumPostClipHoldSeconds` in `voice-performance.proposed.json` (sum 5.80 s)
plus the 2.80 s silent END card must be written into `timeline.ts` as **per-key holds** — one real gap after each named
clip — and the timeline must **prove the sum is exactly 11.20 s** (2.60 inside keys + 5.80 after keys + 2.80 card). No
voice direction in this file can create a hold on its own: **the clone cannot be told to pause**, so any direction
here that depends on silence depends on that timeline obligation being honoured. If the holds are rounded, overlapped
or trimmed, every duration in `script.md` §1 is wrong.

## Ending behaviour

The last words of `s16` are said evenly and settled, and simply **stop** — the audio does not fade on the
words. `s16` is two sentences with a real **0.30 s** `pauseAfterSeconds` **between** them, so its clip ends — and
the last word of the video lands — at **47.62 / 49.52 / 52.72 / 55.15 / 56.46 s** at 4.4 / 4.2 / 3.9 / 3.7 / 3.6
syl/s. **BGM cuts at that instant.** `s16`'s post-clip hold runs 0.55 s, then the **END card** runs 2.80 s to
56.07 s. **Post-word audio tail = 0.55 + 2.80 = 3.35 s** of total silence, with only the image continuing (the open
notebook, the flat hand, the face-down phone, the motes drifting in the warm bar). If a measured run lands **under
50 s**, the fix is this tail — END card 2.80 → up to 4.80 s, then `s16`'s hold, then `s14`'s hold
(`script.md` §5 gives the exact order and arithmetic). **`s16` is never re-read faster, slower, louder or with more
feeling to fill a gap.**

## Shot direction

| key | intent | emotion | accent words | fast / slow sections | breath & pause placement | ending contour |
|---|---|---|---|---|---|---|
| s1 | **Hook + frame-0 cover**: name what the viewer promised and what got in the way; the headline must carry the hook with the sound off. **The badge plate is already on the song list at frame 0** — this is the cover, not a reveal | Curious, recognising, level, faintly wry | **học đàn** · **đi làm** | **Fast and light:** `Bạn từng nói mình sẽ` · **settles:** `học đàn` (then a full stop) · **second sentence lower and flatter than the first** | **No inserted pause anywhere in this key** — the two sentences are separate synthesis phrases joined with **no silence**, and there is **no breath before the clip and none inside it**; real silence arrives only after, as the 0.25 s clip boundary | Flat, level — a statement, not a question; `làm.` set down and closed |
| s2 | **The first payoff**: turn "you wanted this" into a page with eleven lines on it | Warm by one degree, unhurried — the one line allowed to sound pleased | **danh sách** · **muốn chơi** | Even through `Bạn đã lưu cả một danh sách`; **slightly slower** on `những bài hát muốn chơi` with the stress on `muốn` | No pause inside, no breath inside: the lifted corner and the sentence are one movement | Flat landing on `chơi.`; pleased but not rising |
| s3 | **`[ADD]`**: make the paper itself physical. **The ink colour is image-only and never said** | Quiet, factual, almost to itself | **mỏng quá** · **viết tay** · **viết dở** | Three short statements, each landing on its own; **`quá` is leaned on** so the first reads as a spoken clause, not a list item; the third is the slowest | **0.25 s real gap after `mỏng quá,`** (`pauseAfterSeconds`) — the paper's own pause; no breath before the clip | **Flatter and lower** on `viết dở`, then stopped — deliberately not a sad ending |
| s4 | **`[ADD]`**: stage the cause, as routine, with no complaint | Flat, administrative — **the least emotional read in the video** | **quẹt thẻ** · **hộp thư đầy** | Even and slightly hurried on the first clause; `hộp thư đầy` lower, as a full stop | No pause inside, no breath: the two clauses are one worn routine | Flat, closed; no sigh, no weariness in the voice |
| s5a | Stage the habit, with no self-judgement | Faintly amused, completely unbothered | **định mua đàn** · **lại nghĩ** | Light through `Mỗi lần định mua đàn,`; `bạn lại nghĩ:` **lower and slower**, the colon left hanging | **0.20 s real gap** after the first clause; no breath before the clip | Hanging — the colon is **not resolved inside this key**, deliberately |
| s5b | **CP2, member 1** — say the deferral **as small as it was actually said** | Quiet, quick, dismissive. **Nothing in the voice may sound like a warning** | **khi nào rảnh** | The whole key is fast; no slow section at all | **No pause inside.** The beat is **outside** the key: the 0.20 s gap inside `s5a` + the 0.25 s clip boundary after — it is a **split key precisely because a cloned voice cannot be told to pause** | Level to the end; the sentence simply finishes and is left with nobody to answer it |
| s6 | **`[ADD]`**: make the deferral cost something visible — the finger that stops | Almost casual, then anticlimactic. **No regret in the voice at all** | **khựng** · **Mua ngay** · **tắt màn hình** | **Fast** through `Ngón tay khựng trước nút Mua ngay,` and **stops dead** on `ngay` — the finger never reaches the button, so the word must not land on it either; then `rồi tắt màn hình.` **smaller and lower than everything before it** | **0.25 s real gap** after `Mua ngay,` — the finger stopping; **no breath after the last word** | Falling, small, closed — an anticlimax delivered as an anticlimax |
| s7 | **RE-HOOK + H1**: the object is not lost, it is found, and the light with it | Almost offhand, then warm — **the plainest reading of the most important line** | **dọn nhà** · **tìm thấy** · **danh sách ấy** | **Light and level** through `Vài năm sau, trong một buổi dọn nhà,`; after the gap it is **slower and lower**, and `danh sách ấy` lands as **one unit** | **0.25 s real gap** at the comma inside the line (this is what keeps it unhurried rather than dramatic); no breath before the clip; **0.40 s of real silence after**, the longest hold in the first half | Last syllable **stops, never fades**; warmer but not louder |
| s8 | **`[ADD]`**: the dust, and the hand doing the thing | Small, tactile — said beside the action, not about it | **phủ kín** · **tay kéo vệt qua** | Light through `Bụi phủ kín hết bìa,` with **`hết` as the spoken hinge**; **slower** on `tay kéo vệt qua.` with the stress on `kéo` | **0.20 s real gap** between the clauses; no breath before the clip | Plain landing; closed |
| s9 | Make "still intact" **true** | Quiet, even — **the steadiest line in the video**, and the steadiness is the point | **ngày xưa** · **còn nguyên** | No fast section; the whole key is even, with `vẫn còn nguyên` only **marginally** slower than what precedes it | No pause inside; no breath; a real **0.45 s** after the clip — the longest silence in the first half | Level and closed; no lift, no gravity either |
| s10 | **H2 (i) + `L3`**: the turn into tenderness | Close, plain — **pity, not self-blame (`I3`)** | **ngồi đọc** · **thấy thương** | `Bạn ngồi đọc,` level and ordinary; then the line **thins** — it does not swell | **0.25 s real gap** at the comma — **real silence, and it is exactly where the finger stops mid-line**; **no trembling, no breathiness, no upward bend on `thương`** | The final syllable **stops**; **smaller** than everything before it |
| s11 | **H2 (ii)**: say the fact the past self could not have known | **The smallest line in the video.** Not sad — observational. Said about a stranger, not about yourself | **đâu biết** · **bận đến thế** | Nearly conversational on `Người ấy đâu biết sau này`; **slower and lower** on `mình sẽ bận đến thế.` | No pause inside; no breath before or after. **The silence is the 0.45 s immediately AFTER this clip**, while the hand lies flat on the **open page** and does not move | Volume **thins** on `bận đến thế` — the last three words lose energy and **stop there** (no level automation inside the take) — **never a whisper, never a trail-off** |
| s12 | **CP3, member 1**: take the musician off the viewer, as a permission | Steady, even, unsentimental — **not relief, not melancholy** | **Có thể** · **không còn muốn** · **nhạc công** | `Có thể hôm nay` light; then the long clause steady and even, with the stress on `không còn muốn` and `nhạc công` | **0.20 s real gap** after `Có thể hôm nay`; no breath | `nữa.` set down flat and closed — this is a permission, not a loss |
| s13 | **The pivot**: the one word that turns the whole video | Quiet, level, warm — `Nhưng` said **without any lift at all** | **Nhưng** · **vẫn thích** · **cây đàn** | **`Nhưng` alone**, quiet and level, then 0.25 s of silence, then the clause unhurried to the end | **0.25 s real gap after `Nhưng`** — the clip-internal beat, **never the owner's `…`**, which is not performed; no breath | Last syllable **trails very slightly** and is **not stretched**; deliberately unresolved |
| s14 | **CP3, member 2**: the smallest possible sentence | An offer, not advice and not a challenge — minimal weight | **học** · **một hợp âm** | `Bạn có thể học` light and quick; `một hợp âm.` slow and level | **0.20 s real gap** after `Bạn có thể học`; no breath before the clip | **Finished and closed** — a full stop, definitely **not** a hook and **not** a call to action |
| s15 | **H3 + `L4`**: the sound payoff, and it is imperfect on purpose | Warm, slightly amused, **unimpressed with itself** | **rè nhẹ** · **chưa quen** | `Một hợp âm rè nhẹ,` almost apologetic; **slower** on `ngón ấn chưa quen.` | **0.25 s real gap** at the comma, so the buzz sits before the verdict; **no performed laugh sound and no audible breath anywhere** | `chưa quen` takes the **last emphasis of the video**, and the final syllable **stops dead** |
| s16 | **Close**: refuse the debt, then allow the joy | Warm, settled — **warmer than anything else and not one degree louder** | **bù lại** · **được vui** · **từng yêu thích** | The first sentence steady and slightly **firm**; the second warmer with the movement on `được vui` and **the last three words slowing** | **0.30 s real gap between the two sentences**; **no breath inside and no sigh after the last word** | **Settled, level, closed.** The voice **stops on the word**; `s16` is never re-read to fill the tail |

## Production-metadata note

Every direction above is production metadata. **None of it appears in `voice.proposed.json` or in any caption
chunk.** Spoken text and captions remain exactly the canonical values in `voice.proposed.json`; acting notes live
only in the `delivery` columns of `script.md` §3 and in `voice-performance.proposed.json`.

**Phrase join rule (`F-05`).** Phrase texts are joined with **exactly one space** —
`" ".join(phrase.text) == voice.proposed.json[key]`, byte-for-byte — and that join is verified against the
canonical file before generation. The packet holds **33 phrases across the 17 keys**, every phrase boundary falls
on a canonical single space, and an assembler that joins with `""` would merge two words and fail the CER gate.

**Accent words (`F-11`, `NEW-05`).** The accent set for each key is **one identical string list** in `script.md`
§3, in this table, and in `voice-performance.proposed.json` (`accentWords` plus the per-phrase `emphasis` arrays).
Every accent word is a **substring of the phrase text that contains it**, and every accent word appears in that
phrase's `emphasis` array.

**Pause implementation (`pauseAfterSeconds`).** `pauseBeforeSeconds` / `pauseAfterSeconds` pad **inside one clip**;
the post-clip hold is a **real gap between two clips in the timeline**. No beat in this packet is created with
punctuation, and no key relies on the ellipsis or a full stop to produce silence — which is why `s5a` and `s5b` are
two keys, and why `s13`'s beat is an intra-clip gap rather than the owner's `…`.
