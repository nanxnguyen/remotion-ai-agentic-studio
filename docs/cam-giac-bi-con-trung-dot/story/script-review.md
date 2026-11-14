# Script review — cam-giac-bi-con-trung-dot

## Round 1

Reviewer: script-reviewer (gate A), 2026-11-14. I did not write this script.
Inputs read: `story/script.md`, `story/sources.md` (used as the research file), `story/rounds.json`, `plugins/thanh-hai-learn-ai-2d-studio/skills/mascot-explainer/SKILL.md`, `.../make-2d-video/references/mascot-explainer-format.md`, `.../make-2d-video/kit/tools/explainer_plan.py` (`_cue`, `plan`), `docs/SHORTS_RETENTION_PLAYBOOK.md`, `.agents/skills/ray-pineline-worflow-agent/references/hook-engineering.md`.
Missing inputs: `brief.md`, `hook-options.md`, `voice.proposed.json`, `voice-direction.md`, `voice-performance.proposed.json`, `story/bible.md`. `pipeline.py audit` was not run because this reviewer has no Bash. Status is unverified.
User constraint (quoted): "Hãy tiến hành viết kịch bản tầm 3 - 4 phút chủ đề bạn tự chọn". The user mandated no verbatim lines.

**Verdict: revise. Overall 7.9/10.** Hook 8 and specificity 8 are both below the required 9. Cao and Trung tickets are open.

### 1. Viewer-first read (spoken lines only, at ~4.1 syl/s)
- What I felt: the cold-open nail mystery and the bee "hy sinh / ghét tôi đến vậy" beat (r02d) are genuinely funny. Schmidt's quotes do most of the sensory work. I could retell the ending ("kiến đạn đau nhất vì 4 điểm và đau tới cả ngày"). Emotionally it stays light and pleasant, not surprising.
- First drop point, ~6–25 s: right after the hook comes "Chào các bạn, tôi là Cún Lú" and then 19 s of title exposition that never mentions the nail again. Second drop point, ~2:00–2:30 (r05b → r05e): a stack of four fact lines with no host joke.

### 2. Score table
| # | Item | Score | Evidence |
|---|---|---|---|
| 1 | Fidelity / user intent | 9 | Self-chosen topic, Vietnamese, host voiceover, mascot-explainer anatomy (script.md:3-8). No mandated lines. The duration risk is scored under item 5. |
| 2 | Hook ≤3 s | **8** | c00 (script.md:13-14) is strong in-media-res: scream + swollen heel + "cái đinh… làm gì có cái đinh nào". But there is no on-screen hook text (sound-off fails), a generic greeting follows at ~6 s (script.md:18), the nail promise is never re-stated, and `hook-options.md` is missing. |
| 3 | Clarity / retellable ending | 9 | Recap ranking (script.md:97) plus the 5 phút vs 24 giờ contrast (r05d, script.md:86). One confusion: the r04b vs r05b "only 4" wording (ticket T09). |
| 4 | Spoken naturalness | 8 | Mostly conversational. Problems: literary quote-translations "đau thuần khiết, dữ dội, rực rỡ" (script.md:84) and "chói loà" (script.md:69); five English names with TTS risk; ~10 punctuation-only "..." pauses. |
| 5 | Timing | **7** | Recount below. Estimated speech is ~674 syl ≈ 2:44, or ≈ 2:55–3:05 with holds. That is at or below the 3:00 floor, and a faster voice (user pace preference) lands under it. The header says "~3.5 phút" (script.md:3) but the section allotments add up to 244 s. `title_card.dur` 14 s does not match the ~19 s of title voice, which causes a cue collision (T04). |
| 6 | Source accuracy | 8 | Core Schmidt numbers and quotes match sources.md:7-20. Unsourced: harvester habitat and seed-carrying (script.md:54), tarantula hawk paralyse + egg-laying (script.md:67), bullet-ant rainforest range (script.md:82), "chân trần" added to the quote (script.md:84). The recap drops a hedge: "đau cả ngày!" (script.md:97) vs the sourced "có khi… khoảng một ngày". |
| 7 | Visual feasibility | 8 | All beats are drawable in 2D canvas. The kit `bug()` only has beetle/spider/crab/flytrap (format.md:34), so ant, bee, wasp and bullet ant need custom drawers. r02c, r05c and r05e are host-less inserts, which breaks format rule 4 ("host in every shot"). |
| 8 | **Specificity / emotional impact** | **8** | Each round has a concrete gag and there is a real contrast pair (r05d). But the host's own body experience is thin: the pain is borrowed from Schmidt's words. Round 5, the climax, has no host joke for ~35 s. The nail payoff (r05c) is visual-only and never spoken. The final punchline "Nó tên là… Đạn" (script.md:91) is predictable because Đạn is the ant's name. Competent and likeable, but the climax does not hit. |
| 9 | Profile content test (mascot-explainer checklist) | 8 | Pass: worst-moment cold open, escalation, a gag per round, running tally, cartoon-only violence, recap + comment question. Fail: no `story/bible.md` (SKILL.md rule 3), title 14–19 s vs the format's 2–3 s (format.md:16), host missing from 3 shots, invented 0.6 bar on a qualitative stat (script.md:53). |
| 10 | Voice direction feasibility | 6 | Not evaluable: none of the voice artifacts exist. The script relies on "..." for its pauses, which is a punctuation-only pause contract (Trung by procedure step 8). I give no credit without evidence. |
| | **Overall (mean)** | **7.9** | Pass requires ≥9 overall, items 2 and 8 ≥9, and nothing below 8. Items 2, 5, 8 and 10 fail. |

### 3. Hook engineering gate
- **First second (0–1 s):** frame 0 is the night rainforest. Cún Lú hops on one foot with a balloon-swollen red heel, bandaged all over, tally "5" in the corner. Audio is "AAAA! Cái đinh!". The subject, problem and consequence are all visible. This passes.
- **First three seconds:** "Ai rút giùm tôi cái đinh khỏi gót chân với?!" (13 syl ≈ 3.2 s). The tension is that there is a nail in the heel. At ~4–5 s the turn "Khoan. Làm gì có cái đinh nào." creates a real curiosity gap: pain like a nail, with no nail. Sound off, the viewer sees only a hurt dog. No text carries the gap. **Blocker.**
- **First payoff (3–8 s):** the title card names the topic (insect stings, from mild to the world's worst). That is a partial, truthful payoff. The specific nail answer only arrives at r05c (~2:15). The promise is honest and gets paid off, but nothing re-states it in between.
- **Ending vs promised tension:** r05c's quote ("cây đinh… cắm vào gót chân") resolves the nail, and r05f returns to the cold-open frame. This works structurally, but no one says out loud "đây là cái đinh lúc đầu", so a casual viewer may miss the click.
- **Comparison with a rejected candidate:** there is no `hook-options.md`, so I compare against a candidate built from the research. Candidate B, "result first": an extreme close-up of a bullet ant plus a stat card "ĐAU 24 GIỜ", with the line "Có một con kiến đốt mà đau suốt một ngày." The current c00 wins. It is in-media-res with the host, it creates a mystery instead of spending the top stat in second 1, and it foreshadows r05c. B gives away the finale. The winner is the right concept, but it is under-packaged. Text, re-hook and the spoken callback would lift it to 9.
- **Verifiable only after render/publish:** whether the scream reads as funny rather than distressing at frame 0, caption legibility of the hook text, real 0–3 s retention / viewed-vs-swiped.

### 4. Line-by-line show/tell
| Shot | Mark | Shot | Mark | Shot | Mark |
|---|---|---|---|---|---|
| c00 | show | r02c | show | r04d | show |
| t00 | tell (5 of 9 sentences are exposition) | r02d | show | r04e | show |
| r01b | tell + quote | r02e | tell (safety, required) | r05b | tell |
| r01c | show | r03b | tell + quote | r05c | show |
| r01d | show | r03c | show | r05d | tell |
| r02b | tell + quote | r03d | show | r05e | tell |
| | | r04b | tell | r05f | show |
| | | r04c | show | z90/z99 | tell |

The tell runs are r02e → r03a → r03b (3, counting the card) and r05d → r05e (2, but at the climax). The round-5 run is the one that hurts (T06).

### 5. Spoken test
- No line runs past one breath. The longest is r05e's second sentence (15 syl).
- TTS risk words: Schmidt (×6), Justin, Maricopa, tarantula (×2), poneratoxin. Each needs a pronunciation map in voice-direction (e.g. Schmidt → "Sờ-mít", tarantula → "ta-ran-tu-la", poneratoxin → "pô-nê-ra-tốc-xin"). Captions keep the real spelling.
- Written register: "đau thuần khiết, dữ dội, rực rỡ", "chói loà".

### 6. Structure
- Situation (c00/t00) → escalating turns (r01–r04) → climax (r05) → recap → CTA. Climax and CTA are in different shots (r05f vs z99). OK.
- **Re-hook at 15–20 s: missing.** t00 never brings the nail back (T03).
- Contrast pair: "5 phút" vs "24 giờ" split screen (r05d). Good.
- Highlight beats (≤3): c00 scream, r04d "XẸT! AAAA", r05c nail image. OK. No delivery/light pairing is written down (the voice-direction file is missing).
- Hold after the closing line: none specified for z99 (T15).
- Joke cadence (format: every 15–20 s): the gaps are fine everywhere except r04e (~1:57) → r05f (~2:32), about 35 s.

### 7. Fidelity vs dramatization
There are no mandated lines. The user summary was just "3–4 phút, chủ đề tự chọn", and the script dramatizes it rather than copying it. N/A otherwise.

### 8. Claims check (vs sources.md)
| Claim | Where | Status |
|---|---|---|
| Scale 1–4, honey bee anchor 2 | script.md:18,39 | sourced (sources.md:7) |
| "hàng chục loài" | script.md:18 | sourced (78 species, sources.md:8) |
| Fire ant 1, "sắc, đột ngột, hơi giật mình", ≤5 min | script.md:26 | sourced (:9) |
| Honey bee 2, quote, barbed stinger, bee dies | script.md:39,41 | sourced (:10-11) |
| Allergy warning | script.md:46 | sourced (:12) |
| Harvester "sống ở châu Mỹ, chuyên tha hạt giống" | script.md:54 | **unsourced** |
| Drill quotes (Florida, Maricopa) | script.md:54,56 | sourced (:13-14) |
| Tarantula hawk 4, ~5 cm, ~5 min, quote, lie down and scream | script.md:66-71 | sourced (:15-17) |
| Tarantula hawk paralyses tarantula, lays egg on it | script.md:67 | **unsourced** |
| Bullet ant "rừng mưa Trung và Nam Mỹ" | script.md:82 | **unsourced** |
| Bullet ant only 4 in the first table | script.md:82 | sourced (:18), but confusing next to r04b (T09) |
| Quote with "chân trần" | script.md:84 | **embellished**: "chân trần" is not in the quote |
| "có khi… khoảng một ngày" | script.md:86 | sourced, hedged (:19) |
| Poneratoxin mechanism | script.md:88 | sourced (:20) |
| Recap "đau cả ngày!" | script.md:97 | **hedge dropped** |
| Subjectivity caveat | script.md:97 | present. Good. |

### 9. Timing recount (space-separated syllables, ~4.1 syl/s, before holds)
| Segment | Syl | Speech s | Allotted in script/rounds.json |
|---|---|---|---|
| c00 | 20 | 4.9 (≈6 with pause) | 5 |
| t00 | 73 | 17.8 (≈19) | 14 |
| R1 | 63 | 15.4 | ~30 |
| R2 | 108 | 26.3 | ~40 |
| R3 | 88 | 21.5 | ~35 |
| R4 | 90 | 22.0 | ~40 |
| R5 | 130 | 31.7 | ~50 |
| z90 | 67 | 16.3 | 20 |
| z99 | 35 | 8.5 | 10 |
| **Total** | **674** | **164 s ≈ 2:44** | 244 s |

With ~15 "..." pauses, card holds and gag holds, I estimate 2:55–3:05. That is at the floor of the 3–4 min target, and English names read as multi-syllable add only a few seconds. The chapters (script.md:108) assume 3:34+ and will be wrong.
**Cue check (`_cue`/`plan`):** body0 = cold 5 + title 14 = 19 s. The round-1 cue "kiến" is searched from 19 s on. The title line's "…loài ong và **kiến** đốt" falls at ≈19–20 s of speech, so round 1 can snap into the middle of the title card. The other cues are clean. "ông" ≠ "ong" after NFC, and rounds 1, 3 and 4 contain no early "ong"/"kiến" words.

### 10. Voice performance contract
Not checkable: `voice.proposed.json`, `voice-direction.md` and `voice-performance.proposed.json` are absent, as is the tone-probe table. The "..." pauses in c00, t00, r01d, r02b, r02c, r03b, r03c, r04b, r04c and r05f are punctuation-only. They must become split keys (e.g. `r04c_a`/`r04c_b`) or live in voice-expressive.json.

### 11. Tickets
| id | sev | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| T01 | Cao | docs/cam-giac-bi-con-trung-dot/ (missing `hook-options.md`) | hook-engineering.md:33 requires it; gate cannot pass without it | Write ≥5 distinct candidates (in-media-res nail, result-first 24 giờ, counterintuitive "ong chết để bạn đau 10 phút", size-shock tarantula hawk, question "Bạn chịu được mấy điểm?") with the 5 fields each; mark c00 as winner with the rejection reasons | script-agent | file exists, winner id referenced in script.md header and brief.md |
| T02 | Trung | c00, script.md:13 | sound-off shows only a hurt dog; no text carries the gap | Add on-screen text, beat 1 (0.3 s): "CÁI ĐINH?!"; beat 2 (at "Khoan"): "…KHÔNG CÓ CÁI ĐINH NÀO." | script-agent | c00 Hình lists both text beats with timing |
| T03 | Trung | t00, script.md:18 | generic greeting at ~6 s, 19 s exposition, no re-hook; format title is 2–3 s | Replace the t00 line with: "Tôi là Cún Lú. Hôm nay năm loài côn trùng sẽ đốt tôi, từ nhẹ nhất tới đau nhất thế giới. Cái đinh lúc nãy? Nó nằm ở vòng cuối. Thước đo là thang đau Schmidt, từ một tới bốn, của một nhà khoa học đã tự để hơn bảy mươi loài đốt mình. Ông làm vì khoa học. Còn tôi… lỡ ký hợp đồng." (no "kiến", ≤15 s) | script-agent | no greeting; the nail is re-stated before 20 s; t00 ≤ 15 s by syllable count |
| T04 | Trung | rounds.json:4 + t00 | `title_card.dur` 14 vs ~19 s of voice; cue "kiến" in the title line lands ≈ body0 | Apply T03 (removes "kiến" from t00) and set `cold_open.dur`/`title_card.dur` from the measured or recounted syllables | script-agent / planner | t00 text has no word starting with "kiến"; cold+title durations within 1 s of the syllable estimate |
| T05 | Trung | whole script, script.md:3 | estimate ≈ 2:55–3:05 vs target 3–4 min; header says 3.5, allotments add to 4:04 | Add ~30–40 s of host-experience material, not facts: e.g. r03 a beat where Cún Lú tries to "cancel" the drill with a toothpick (gag), and the r05 additions in T06/T07. Then fix the header and the chapters to the recount | script-agent | recount ≥ 760 syl (≈3:05 speech, ≈3:20 with holds); header and chapters match |
| T06 | Trung | r05b–r05e, script.md:82-88 | ~35 s with no host joke at the climax; 2 tell lines in a row | Add a host beat to r05e: "Tôi thử tìm nút TẮT rồi. Bấm cả trăm lần. Cái công tắc này… không có nút tắt." (Hình: Cún Lú hammering the stuck switch) | script-agent | no gap between host jokes > 20 s by the recount |
| T07 | Trung | r05c/r05f, script.md:84,91 | nail payoff is visual-only; punchline "Đạn" is predictable | Add after r05c's quote: "Đó. Cái đinh lúc đầu video đó. Không có cái đinh nào… nhưng cái đau thì có thật." Change r05f's ending to: "…tôi đặt tên cho cơn đau luôn rồi. Nó tên là… Bé Đinh." | script-agent | the cold-open callback is spoken; the punchline calls back the nail rather than repeating the ant's name |
| T08 | Trung | script.md:54,67,82,84 | four unsourced or embellished claims | Add rows to sources.md for harvester range + seed-gathering, tarantula hawk paralysis + egg, bullet ant range (open the pages); drop "chân trần" or mark it as a paraphrase | research / script-agent | every factual clause maps to a sources.md row |
| T09 | Trung | r04b vs r05b, script.md:67,82 | viewer just saw a 4/4 wasp, then hears the bullet ant was "the only 4" | Replace the r05b second sentence with: "Bốn điểm, bằng con ong lúc nãy. Nhưng con ong chỉ đau năm phút…" and move the "only 4 in 1983" fact to the recap caveat or cut it | script-agent | no line implies a single 4/4 while two are shown |
| T10 | Trung | z90, script.md:97 | "đau cả ngày!" drops the sourced hedge | "Vô địch: kiến đạn, bốn điểm, có khi đau cả ngày!" | script-agent | recap wording matches r05d's hedge |
| T11 | Trung | r03b stat, script.md:53 / rounds.json:13 | bar 0.6 for "Kiểu đau: như máy khoan" is an invented quantity; format says every stat sourced | Replace with a text-only chip (no bar) or a sourced duration stat for level 3 | script-agent | every bar value is traceable to sources.md |
| T12 | Trung | r02c, r05c, r05e | host-less inserts; mascot SKILL.md rule 4 | Put Cún Lú in frame for each (reacting at the corner / pointing at the diagram) | script-agent → scenes | every shot's Hình names the host and his reaction |
| T13 | Trung | all "..." lines (10 shots) | punctuation-only pauses | Mark each intended pause as a split key or a voice-expressive pause in voice-direction | voice-director | no pause relies on punctuation only |
| T14 | Trung | voice artifacts missing | voice.proposed.json, voice-direction.md (+ tone-probe table), voice-performance.proposed.json absent | Produce them. Include a pronunciation map for Schmidt, Justin, Maricopa, tarantula, poneratoxin (spoken form only, captions keep the spelling) | voice-director | files exist; phrases concatenate byte-for-byte to the canonical lines |
| T15 | Thấp | z99, script.md:101 | no hold after the close; ending is a generic warning | After "đừng thử ở nhà!" add a 1.5 s hold, then a stray fire ant bites: "CHÍCH!", tally → 6, Cún Lú deadpan "…sáu." | script-agent | z99 Hình lists the hold and the button gag |
| T16 | Thấp | r01d, script.md:30-31 | "một điểm nhân với cả đàn" but the tally only +1 | The tally spins to "47", then Cún Lú: "Thôi, tính là một lần." It snaps back to 1 | script-agent | tally behaviour matches the joke |
| T17 | Thấp | script.md:69,84 | literary register | "chói loà" → "chói cả mắt"; "đau thuần khiết, dữ dội, rực rỡ" → "đau nguyên chất, dữ dội, sáng loá" | script-agent | reads aloud naturally |
| T18 | Thấp | story/bible.md missing | mascot SKILL.md rule 3 | Write the Cún Lú bible (species, fur #c98a4b, shirt #f2c21a, accessory) | design | file exists |
| T19 | Thấp | visuals for ant/bee/wasp | `bug()` has only beetle/spider/crab/flytrap | Note custom creature drawers needed per round in the shot notes | scenes | each creature has a planned drawer |
| T20 | Thấp | brief.md missing | pipeline input | Write the brief (premise, story question, target emotion, duration 3–4 min, 16:9) | director / script-agent | file exists |

### 12. Weakness hunt (top 3, rewrites above)
1. Climax round 5 is the flattest stretch: fact stack, no host joke, unspoken nail payoff (T06, T07).
2. The 19 s title is a generic intro that kills the hook's momentum and collides with the cue planner (T03, T04).
3. Runtime sits at or under the 3:00 floor, and the declared timings are inconsistent (T05).

### 13. Previous-round fixes
None (Round 1).

### 14. Could not verify
- `pipeline.py audit` (no Bash in this session).
- Real voice duration and TTS pronunciation of the English names.
- Rendered first frame, caption legibility, whether the gags read in the 2D kit.
- Post-publication retention.
