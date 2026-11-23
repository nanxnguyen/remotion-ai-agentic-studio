# Horror story engine — how to write stories that hold millions of viewers

## 1. The five laws
1. **The hook is the anomaly, not the context.** First sentence = something wrong, specific and visual. ("Lúc 2 giờ 17 phút sáng, chiếc xe buýt số 0 dừng trước nhà tôi. Tôi chưa từng thấy tuyến xe đó.") Never open with greetings, the channel name, "hôm nay mình kể…", weather, or backstory.
2. **One rule, one place, one want.** Every story has a place with a rule ("đừng trả lời khi có ai gọi tên sau 2 giờ"), a protagonist who wants something ordinary (về nhà, giữ việc, tìm em), and the rule standing in the way. The scare comes from the rule being broken.
3. **Escalate in three.** Three encounters, each closer and more personal: heard → seen far away → inside the safe space/touching. Each step removes one escape.
4. **The audience must know a little more than the protagonist** at least once (dramatic irony: we see the figure in the background, they don't). That is dread, and dread holds viewers longer than jump scares.
5. **The ending re-reads the beginning.** The twist uses a detail planted in the first 60 s (the photo, the time, the number of passengers). An ending that ignores the hook kills comments and shares.

## 2. Beat skeletons (times are % of the video; beat names match shots.json "beat")

**Short (45–60 s)**
| % | Beat | Content |
|---|---|---|
| 0–4 | hook | the anomaly + a number/time/object, on screen and in the first spoken words |
| 4–25 | setup | who, where, the rule; one sensory detail (smell of incense, wet footprints) |
| 25–55 | dread | first escalation; something moves where it shouldn't |
| 55–75 | hush → scare/reveal | silence, then the reveal |
| 75–93 | twist | the planted detail flips the meaning |
| 93–100 | cta | story-specific question or "phần 2" tease (never a generic "like và đăng ký") |

**Single story (8–15 min)**
| % | Beat |
|---|---|
| 0–3 | cold open: the most frightening image of the story (from ~70 %), then "nhưng để hiểu chuyện gì xảy ra, phải quay lại ba ngày trước…" |
| 3–8 | promise: what the viewer will find out (an open loop) |
| 8–25 | setup: normal life, the place, the rule, the planted detail |
| 25–40 | escalation 1 (heard / sensed) → breather |
| 40–50 | escalation 2 (seen) |
| 48–55 | **midpoint reveal** — new information that changes the question (who the ghost was, why the rule exists) |
| 55–75 | escalation 3 (inside the safe space) → the protagonist acts |
| 75–90 | climax: confrontation / escape / ritual |
| 90–97 | twist ending |
| 97–100 | CTA + tease of the next story |

**Compilation (15–25 min):** cold open from story 3's peak → story 1 (good, 4–6 min) → story 2 (stronger) → story 3 (strongest, 6–8 min) with `H.chapterTag` cards. Each story keeps a mini hook–escalation–twist. Order by rising fear; the strongest last keeps the binge.

**Long tâm linh (30–60 min):** a narrator persona tells one long "chuyện có thật" with digressions about customs (cúng, tháng cô hồn, bùa ngải). Scare beats every 5–8 min; breathers explain customs; slower shots with constant camera drift.

## 3. Scare grammar
Every scare = **anticipation → hush → hit → hold → release**.
- Anticipation 3–10 s: slower cuts, tighter frames, a sound that stops (crickets, the lamp buzz).
- Hush 0.4–0.8 s: music and ambience drop (`"hush": true` on that shot); the image holds.
- Hit: the reveal on the exact frame of the `scare` SFX; `H.punch` + `H.scareFlash`.
- Hold 0.5–1.5 s on the reveal (let them see it).
- Release: a breather shot (wide, warmer, or a different place).
Spacing: ≥ 25 s between scares in long-form; mix types — jump scare, slow reveal (something was there all along), wrong detail (the photo smiles), sound scare (knock from inside the wardrobe), false alarm (the cat) followed by the real one. Max one false alarm per video.

## 4. Twist types (pick one, plant it early)
- **The protagonist is the ghost** (only if planted: nobody answers him, the date on the ticket).
- **The helper is the threat** (the kind neighbour, the old woman who warned them).
- **The rule was a lie** (following it is what summons the thing).
- **It's still here** (the last image: the thing is in the viewer's position / behind the narrator).
- **Time loop** (02:17 again; the first scene repeats with one change).
- **The why** (a heartbreaking reason: a child waiting for her mother — horror that turns into sadness gets shares in Vietnam).

## 5. Writing the narration (TTS-friendly, Vietnamese)
- Short sentences: 6–16 words. One action per sentence. Concrete verbs.
- First person ("tôi") for "chuyện có thật" framing; third person for legends and cổ tích đen.
- Write numbers and codes as words: "hai giờ mười bảy", "phòng bốn không bốn", "xe buýt số không".
- Use pauses on purpose: an empty line in `narration.txt` = a longer pause (before reveals).
- Senses beyond sight in every scene: smell (nhang, ẩm mốc, tanh), touch (lạnh, ướt), sound (tiếng guốc, tiếng gõ ba lần).
- Avoid: "đột nhiên" overuse, explaining the fear ("tôi rất sợ"), modern slang, real names of living people, real addresses.
- Target pace — measure, never assume. Measured on this studio's Vbee voices (Nov 2026, pauses included): ~183 words/min at speed 1.0–1.05 (eight Shorts of 143–160 words came out at 45–51 s) and 188–196 words/min on long narration. So at normal speed: Short ≈ 140–160 words, 10 min ≈ 1,800–1,900 words. A deliberately slow read (speed ≈ 0.9) runs ~130–150 words/min → 10 min ≈ 1,300–1,500 words. Voice the first paragraph, compute words ÷ seconds, then size the rest of the script.
- English: same rules; ~150 wpm; first-person "true story" voice works best.

## 6. Script checklist (all must pass before voicing)
- [ ] First sentence contains the anomaly and a specific detail (time / number / object / place).
- [ ] The first 30 s contain an open loop the ending closes.
- [ ] One place, one rule, one want are clear by 25 %.
- [ ] Three escalations, each closer; at least one moment of dramatic irony.
- [ ] Midpoint reveal (long-form) between 45–55 %.
- [ ] Every scare has anticipation, a hush line/pause, a hit and a release.
- [ ] Twist uses a detail planted in the first 60 s.
- [ ] CTA is story-specific (a question the story raises, or the next part).
- [ ] No gore described in detail; no real victims, addresses or living people; no copied story.
- [ ] Numbers written as words; sentences ≤ 16 words; sensory detail in every scene.
- [ ] Title + thumbnail idea promise exactly what the story delivers.
