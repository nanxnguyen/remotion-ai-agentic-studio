# Brief — giac-mo-tu-bo

> Phase 0 header written by `video-director` from `request.md`. The creative sections
> (viewer need, tone, visual identity, source plan, hook) are completed by `script-agent`
> in Phase 2a and locked at gate A.

## Identity
- vid: `giac-mo-tu-bo`
- slug: `giac-mo-tu-bo`
- composition id: `GiacMoTuBoReel`
- profile: `story`
- platform: TikTok / Reels / Shorts (9:16, 1080×1920, 30 fps)
- duration: **50–60 s** (owner explicit override; includes speech, pauses, transitions and the ending hold)
  - Conflict recorded: the request's structured `Duration` field says "30–45 s" (the repo default), but the
    owner's own topic line says "**50–60 giây**". The topic prose wins, exactly as the sibling video
    `ban-khong-yeu-duoi-chi-da-manh-qua-lau` honoured its prose duration as an explicit override.
    Render with `--min-seconds 50 --max-seconds 60`.
- voice route: **route 2** — local VieNeu-TTS clone from the owner-provided preview
  `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3` (35.93 s mp3, verified by preflight).
  Voice name **Thanh Long Nâng Cao**, output voice slug **`thanh-long-nang-cao`** (already set in `status.json`).
  The reference clip must be cut to a clean 6–8 s, single-speaker, music-free WAV in `docs/giac-mo-tu-bo/voice-ref/`
  before synthesis (`voice-agent`). No authorization check needed (rule set 2026-10-17).
- output: `out/giac-mo-tu-bo-thanh-long-nang-cao-reel.mp4`

## Owner constraints (verbatim)
Topic line: `8. Có những giấc mơ bạn đã âm thầm từ bỏ`
Theme: `Ước mơ · Nuối tiếc · Khao khát sống thật · 50–60 giây`
Owner notes: `phải làm thật kĩ và chất lượng nhé` and `không đc phép làm ẩu` (see `owner-notes.md` N1/N2).

Sources supplied: **none.** Mandatory lines: **none.** Style reference: none. Must not resemble: not specified. Light mode: **off**.

## Source material — the owner's supplied narration (primary source, keep its meaning)
> Ngày trước, bạn từng nói mình sẽ học đàn.
> Bạn đã lưu cả một danh sách những bài hát muốn chơi.
> Rồi bạn đi làm.
> Mỗi lần định mua đàn, bạn lại nghĩ: 'Để khi nào rảnh.'
> Vài năm sau, trong một buổi dọn nhà, bạn tìm thấy cuốn sổ có danh sách ấy.
> Chữ viết ngày xưa vẫn còn nguyên.
> Bạn ngồi đọc, thấy thương người đã viết ra nó.
> Người ấy đâu biết sau này mình sẽ bận đến thế.
> Có thể hôm nay bạn không còn muốn trở thành nhạc công nữa.
> Nhưng nếu vẫn thích âm thanh của cây đàn…
> Bạn có thể học một hợp âm.
> Không phải để bù lại những năm đã qua. Chỉ để được vui với một điều mình từng yêu thích.

**Syllable count — corrected in Phase 2a (`script-agent`).** The supplied passage is **131 space-separated
syllables** (the Phase 0 header said "~134"; recounted line by line: 9 · 12 · 4 · 12 · 17 · 7 · 10 · 11 · 13 · 9 ·
7 · 20 = **131**), i.e. **≈32 s of pure speech at 4.1 syl/s** — not ≈33 s. The script keeps **129** of those
syllables (it drops the two-syllable opener `Ngày trước,` from line 1 so the hook can be a two-clause sentence
inside 3 s) and adds **46 marked `[ADD]` syllables**. The 50–60 s target is reached by **developing and expanding
beats** (sensory detail, a contrast pair, holds, an ending hold), never by accelerating finished audio.
No line is verbatim-mandatory; behaviour and meaning are preserved.

## Viewer need (one need)
**To be allowed to want something again without paying for the years you did not.** Not permission to start
something new and ambitious — permission for something small and useless, and only for its own pleasure
(`S8` "sống thật với chính mình", `S2` "Học cho vui, cho thỏa ước mong của mình, chứ không phải học để đi thi đấu",
`S9` "Chơi cho vui chứ đừng vì tiền. Nếu không vui thì thôi." — `F5`, `F15`).

## Retellable sentence (one sentence, the viewer's own words)
**"Mình từng có một danh sách những bài hát muốn chơi, và mình vẫn còn nhớ nó nằm ở đâu."** The video has to make
that sentence true for the viewer *while they watch*, using an object, not an argument.

## Tone
Quiet, level, unhurried, honest; addressed to one person ("bạn"), never to an audience, never "chúng ta".
No sentimentality, no self-help vocabulary, **no advice**, no moral. The register is the one the audience already
uses about this subject — `"giờ già rồi lại đi học nhạc"` (`S7`), `"tự nhủ rằng một ngày nào đó mình sẽ làm"`
(`S10`), `"Cứ nói để đó đi, nhưng cũng chẳng bước ra."` (`S12`) — spoken by a friend who is stating facts, not
feelings. There is **no CTA anywhere**, and the video does not tell the viewer what to do; it only refuses the
debt framing out loud, in the owner's own words, and then stops.

**Owner notes N1/N2 applied** (`phải làm thật kĩ và chất lượng nhé`, `không đc phép làm ẩu`): every shot row in
`script.md` §3 carries all seven contract cells, every claim cites `S1` or a named research fact, every silence is
a named beat (§5), the two recreated screens are labelled `minh hoạ`, and the constraints `U1`–`U5` are carried as
a written list in §Constraints below. `owner-notes.md` is **not** one of this role's six writable files
(rule 03), so the notes are answered here and their `pending` → `done` marking is left to `video-director`.

## Claim plan — every claim → its source

| # | claim, exactly as the video makes it | spoken in | on screen | source | status |
|---|---|---|---|---|---|
| C1 | The character once said they would learn the guitar, and then went to work | `s1` | cover headline `Bạn từng nói sẽ học đàn.`; caption `Rồi bạn đi làm.` | **`S1`** lines 1 + 3 (owner, verbatim except the dropped two-syllable `Ngày trước,`) | owner's own words |
| C2 | They kept a whole list of songs they wanted to play | `s2` | caption | **`S1`** line 2, verbatim | owner's own words |
| C3 | The list is thin paper, blue ballpoint, written half-way | `s3` `[ADD]` | caption | **`S1`** line 5 ("cuốn sổ có danh sách ấy") + `I4` (ink colour is a **design** choice, not a sourced fact — labelled `I4` here and never presented as fact) | inference, labelled |
| C4 | Every morning: a badge tapped, a full inbox | `s4` `[ADD]` | caption + `minh hoạ` on the recreated inbox screen | **`S1`** line 3 ("Rồi bạn đi làm") expanded into research §4 item 6 staging (fluorescent office, badge on a lanyard, overflowing inbox). **No number, no job title, no company** | staging from an owner line |
| C5 | Each time they meant to buy a guitar they thought: "Để khi nào rảnh." | `s5a` `s5b` | headline `'Để khi nào rảnh.'` | **`S1`** line 4, verbatim (`s5a` + `s5b` = 8 + 4 = 12 syl = the whole line) | owner's own words |
| C6 | The finger stopped on a `Mua ngay` button and the screen went off | `s6` `[ADD]` | `minh hoạ` on the recreated product page | **`I1`**, labelled: the owner never states a purchase. The shot shows **hovering, not buying**; see §Constraints | inference, labelled |
| C7 | Years later, clearing the house, they found the notebook with that list in it | `s7` | headline `Bạn tìm thấy cuốn sổ ấy.`; caption | **`S1`** line 5, verbatim | owner's own words |
| C8 | The cover was covered in dust; one finger drew a streak through it | `s8` `[ADD]` | caption | **`S1`** line 5 ("buổi dọn nhà" — the object was out of sight long enough to gather dust) + research §4 item 2 | staging from an owner line |
| C9 | The old handwriting is still intact | `s9` | caption | **`S1`** line 6, verbatim | owner's own words |
| C10 | They sat reading it and felt sorry for whoever wrote it | `s10` | headline `Bạn thương người viết ra nó.`; caption | **`S1`** line 7, verbatim; the shot chose *pity, not regret* per **`I3`** (labelled inference: "thấy thương" is self-compassion, not self-blame) | owner's own words + labelled inference |
| C11 | That person had no idea how busy they would become | `s11` | caption | **`S1`** line 8, verbatim | owner's own words |
| C12 | Today they may no longer want to be a musician | `s12` | caption | **`S1`** line 9, verbatim | owner's own words |
| C13 | But if they still like the sound of the guitar… | `s13` | caption | **`S1`** line 10, verbatim, including the owner's own `…` | owner's own words |
| C14 | They can learn one chord | `s14` | headline `Học một hợp âm.`; caption | **`S1`** line 11, verbatim; the **worth of one chord** is grounded in `F5` (`S2` "Học cho vui…"), `F6` (`S2` "Lần đầu tiên đàn được bản nhạc, sướng lắm") and `F15` (`S9`) | owner's own words + grounded |
| C15 | A chord, slightly buzzing, fingers not used to pressing | `s15` `[ADD]` | headline `Một hợp âm rè nhẹ.` | **`F8`** (`S3`: fingertips blistered, string-shaped dents "5 ngón tay phồng rộp, lõm lại vết hằn của dây đàn") is the sensory grounding of the buzz and the dent. **The chord is heard, not claimed as success** | staging from a research fact |
| C16 | Not to make up for the lost years — only to be glad about something once loved | `s16` | caption | **`S1`** line 12, verbatim; the "for joy, not achievement" framing is corroborated by `F5`, `F17` (`S11` "quay lại với những đam mê từng bị bỏ dở"), `F19` (`S13`) | owner's own words + corroborated |
| C17 | *(silent card)* the topic line | — | `Có những giấc mơ` / `bạn đã âm thầm từ bỏ` | the owner's own topic line (`request.md`) | owner's own words |

**Claims the video deliberately does NOT make**: no age, no number of years, no song title, no gender, no city, no
job title, no purchase, no instrument ownership, no "you will become a musician", no instruction to start, no
statistic, no trend claim. See §Constraints.

## Visual identity (derived from the subject: old ink, dust, and a badge that won)

- **Palette (fixed, no other colour is allowed into any frame).**
  | role | hex | where |
  |---|---|---|
  | workroom slate (base, present from frame 0) | `#1C2229` | wall, floor, the dark that dust and ink sit on |
  | aged paper ivory | `#EDE4D2` | the notebook's pages, the paper panel behind quoted text |
  | ruled line | `#C9BFA8` | the notebook's printed rules, table edges |
  | **hero: ballpoint ink blue** | `#243A8C` | the handwriting, and **only** the handwriting — thin strokes, one weight, never a fill |
  | dust grey-brown | `#9A8F7C` | the film on the cover, the smear on the table, the motes |
  | office fluorescent cast | `#DCE7DE` | `s4`, `s6` — the only green-grey in the video, i.e. the only room that is not home |
  | phone screen light | `#8FB6E8` | the recreated shopping page |
  | locked-screen grey | `#6E7A85` | `s6` after the phone goes off |
  | **warm daylight (the one arrival)** | `#F0D9A6` | from `s7` onward only |
  | `minh hoạ` label | `#8C8578` | under the two recreated screens |
  **No amber bulb, no candle, no red, no neon, no gradient glow.** The only saturated colour in the video is the
  ink blue, and the only warm light is the window.
- **Type.** **Manrope** (Google Fonts, OFL, has a Vietnamese subset) for the cover headline, on-screen text and
  captions — verified unused anywhere in the repo (`grep -r Manrope` over `*.tsx/ts/json/md/css`: **no matches**),
  so this video's type is unambiguous. **No handwriting font anywhere**: the song list is drawn as **vector ink
  strokes**, deliberately unlike `dung-bien-tuoi-30-thanh-ban-an`, which uses Caveat/Lora-italic hand-lettering
  (`docs/dung-bien-tuoi-30-thanh-ban-an/brief.md`). Weights: headline 700, on-screen text 600, captions 600.
- **Motion.** Slow and single-direction only: one push-in per shot (1.00→1.03 at most), no whips, no zoom-punches,
  no parallax for its own sake, no speed ramps. The video's motion budget is spent on **four** real movements —
  the push-in at frame 0, the pocket of the box flap at `s7`, the finger's dust streak at `s8`, and the finger
  pressing a string at `s14`–`s15` — and on nothing else. Dust motes drift on a fixed phase of the frame index.
- **Caption treatment.** Manrope 600, ivory `#EDE4D2` on a `#1C2229` pill at 86 %, two lines maximum, centred,
  bottom edge at y ≈ 1710 px of 1920 — **nothing in the bottom 210 px**. Word-for-word from `voice.proposed.json`
  (`script.md` §4). Accent words are set by weight only (700), never by colour: colour is reserved for the ink and
  the light. Where a headline exists for a key it **replaces** that key's caption, so no sentence is printed twice
  (device taken from `docs/dung-bien-tuoi-30-thanh-ban-an/brief.md`, "HEADLINE thay caption").
- **Asset class.** One consistent **vector/SVG** system — plates, typography, dust and light as scalars driven by
  the frame index. **No photograph, no live-action plate, no photoreal face, no stock footage, no 3D render.**
  **The camera never rises above the collarbone**: the character is a hand, a forearm, a torso and a lanyard.
  This is not a stylistic tic — it is how the video keeps `U1` (no age, no gender) true in every single frame.

## Voice route
- **Route 2** — local VieNeu-TTS clone (`~/.venvs/vieneu`), no external upload, no API voice.
- Voice **Thanh Long Nâng Cao**, slug **`thanh-long-nang-cao`**, reference cut from
  `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3` (35.93 s, verified by Phase 0 preflight) into
  `docs/giac-mo-tu-bo/voice-ref/thanh-long-nang-cao-ref.wav` — 6–8 s, single speaker, no music.
  **That directory does not exist yet**; the pinned path is the target and `voice-agent` cuts it
  (`voice-performance.proposed.json` carries `referenceSelectionStatus: "pending"` and says so).
- **This is a route already chosen in Phase 0 (the owner authorised cloning Thanh Long Nâng Cao in the monitor on
  2026-10-18); the specific reference cut is a director decision.** The audio branch proves consistency across all
  17 clips.
- A **cloned voice cannot control pauses**, so no beat in this video is built from punctuation or `…`: every
  deliberate pause is either a **split key** (`s5a`/`s5b`, so `'Để khi nào rảnh.'` lands as its own clip) or a
  **real timeline gap** (`script.md` §5). `s13`'s trailing `…` is the owner's own character and is kept in the
  text only — the beat around it is the 0.25 s gap **inside** `s13`'s clip, not the ellipsis.
- Planning rate **3.9 syl/s**, with the band 3.6–4.4 modelled; provenance and evidence in `script.md` §9.

## Hook
**Selected candidate `H1` (`hook-options.md` §H1) — research #5 candidate #1, the owner's own two sentences.** It is
`s1` in `script.md`. Re-hook named: **`s7`** (the finding), starting 16.52 / 17.20 / 18.35 / 19.23 / 19.70 s at
4.4 / 4.2 / 3.9 / 3.7 / 3.6 syl/s — inside 15–20 s at every rate in the no-trim band 3.586–4.510.

**Frame 0 = cover, canonical description** (reproduced word for word in `hook-options.md` §H1 §1 and
`script.md` §2.2; gate D proves it reads at phone size on `out/qa/<vid>-cover.png` with the audio muted):

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

Cover headline **`Bạn từng nói sẽ học đàn.`** (6 words) is complete at frame 0, is the only text on screen during
`s1`, and clears on the `s1`→`s2` boundary at 3.07 s, where the caption layer takes over.

## Constraints the script must obey in every shot (`U1`–`U5`, `I1`)
| id | constraint | how the packet obeys it |
|---|---|---|
| `U1` | No age, no gender, no city, no job title, no number of years anywhere | the camera never rises above the collarbone; `s7` says only the owner's `Vài năm sau`; `s4` shows a badge and an inbox with **no legible name, no number and no logo** |
| `U2` | **Whether a guitar was ever bought or owned stays unfilled** | the instrument appears **only at `s14`–`s15`, only as six strings, a fret and a fingertip, cropped so that no body, no case, no box, no price, no shop and no delivery is ever in frame**; `s5` shows a *browsing* page labelled `minh hoạ`; `s6` shows a finger **stopping short** of the button and the screen going off |
| `U3` | No song titles | the list is ten to eleven lines of ink that never resolve into words; no word is legible at any frame |
| `U4` | Whether the character plays again, or becomes a musician, is not claimed | `s12` says out loud that they may not want to be one; the video ends on a buzzing chord and a silent card, not on an achievement |
| `U5` | The tenderness of `thấy thương người đã viết ra nó` is not decided by the writer | `s10`'s direction is *close and plain, no trembling*, and `voice-direction.md` leaves the final tenderness to the voice stage's own measurement |
| `I1` | The no-purchase reading is an inference | marked `I1` in the claim plan and in `s6`'s source cell; the shot is staged as *hovering*, which is what the owner actually wrote |

## How this differs from every existing video in this repo
Checked against `src/Main.tsx`, `src/ClaudeMem.tsx`, `src/stick.tsx`, `src/styles.ts`, `src/videos/registry.ts` and
every `docs/*/brief.md`.

- **`GiacMoTuBoReel` and the slug `giac-mo-tu-bo` are unused** in `src/videos/registry.ts` (the only composition
  catalog), and no existing video covers this core idea (a dream silently abandoned and then reclaimed **for joy
  rather than for achievement**) — duplicate check in the Phase 0 header and `research.md`.
- **Palette collision check.** `src/Main.tsx` is near-black `#090909` with gold `#d4a574`; `src/ClaudeMem.tsx` is
  cream `#f5efe6` with clay `#d97757`. This video shares **neither** — its base is slate `#1C2229`, its only
  saturated colour is **ink blue `#243A8C` on aged paper `#EDE4D2`**, and its only warm light is a window
  `#F0D9A6`. No other brief in `docs/` uses ink blue as a hero colour, and none uses a **badge/lanyard** as the
  object that wins.
- **Type collision check.** `dung-bien-tuoi-30-thanh-ban-an` builds its whole identity on **Caveat/Lora-italic
  handwriting**; `ban-khong-yeu-duoi-chi-da-manh-qua-lau` uses its own display set. This video uses **Manrope only**
  — and uses **no handwriting font at all**, because the handwriting is *image*, not type.
- **Story-shape difference from the closest sibling**, `ban-khong-yeu-duoi-chi-da-manh-qua-lau`: that video is a
  **night, rain, navy, one continuous conversation outside**, and its subject is *the person who shelters everyone*;
  its turn is delivered by a metaphor (the umbrella). This video is a **daylit interior, dust and paper**, with two
  rooms (office / workroom), and its turn is delivered by a **found object and a change of light**; where the
  sibling ends on a spoken question, this one ends on an **instrument sound and a silent card**. They share no
  palette, no type, no shot type and no closing device.
- **Nothing here is a re-skin.** `GiacMoTuBoReel` gets its own palette, its own type, its own camera law (below the
  collarbone) and its own object chain (notebook → dust → badge → ink → chord).

## Phase references
- Research: the owner's account is the primary source; research only audience language + hook candidates.
- Script: shot table (seconds, spoken line, on-screen text, image/action, accent words, delivery, source);
  timing in space-separated syllables (planning rate 3.9 syl/s, band 3.6–4.4; 4.1 is a repo convention, not a
  measurement — `script.md` §9).
- Voice: `voice.json` canonical ordered map; `voice-performance.proposed.json` sidecar; pauses as split keys.
- Design: `src/videos/giac-mo-tu-bo/` prototype, 3 style frames + cover + storyboard + hook motion strip.
