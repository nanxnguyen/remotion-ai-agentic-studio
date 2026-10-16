# Gate A review — ban-khong-yeu-duoi-chi-da-manh-qua-lau

Gate A is the strictest gate in the pipeline (pass >= 9/10, plus hook sub-score >= 9, plus specificity sub-score >= 9, plus no open Cao/Trung ticket).
Producer: `script-agent`. Reviewers: three clean-context lens reviewers, none of them the producer. Director merged their reports; the gate score is the LOWEST lens score.

## Round 1 — 2026-10-18 · verdict: revise · score 7.3

### Lens scores

| lens | reviewer | report | items scored | score |
|---|---|---|---|---|
| fidelity + claims | `script-reviewer-1` | `script-review.fidelity.md` | 1, 6, 7 | 7.7 |
| hook + emotional impact | `script-reviewer-2` | `script-review.hook.md` | 2, 8, 9 | **7.3** (hook 7.0 · specificity 7.5 · story test 7.5) |
| spoken naturalness + timing + performance | `script-reviewer-3` | `script-review.spoken.md` | 3, 4, 5, 10 | **7.3** |

**Gate score = 7.3 (lowest lens).** Pass bar 9. Verdict `revise`. 10 Cao tickets open.

### What all three lenses confirm as sound

- All ten mandated owner lines are present verbatim, in the owner's order, one unsplit key each (characters, diacritics, `…` and the inner straight quotes all check out). Captions reproduce them word for word.
- No factual claim, statistic, health claim, diagnosis, "this will fix you" promise, advice or CTA anywhere; the story profile stays a story.
- Every arithmetic figure in `script.md` §1 reproduces: 142 syllables, 13.05 s of planned silence, 46.86 / 49.46 / 51.43 s at 4.2 / 3.9 / 3.7 syl/s, all 14 slot starts, re-hook inside 15–20 s at every rate.
- All 14 performance phrases reassemble the canonical line byte-for-byte; no acting cue, no unsupported engine control, no direction leaking into speech or captions.
- The silent END title card carrying the owner's title line is the right call (fidelity lens): the owner listed it as a theme line, not mandatory speech, and speaking it would eat the required post-close hold.

### Why it fails (root causes, not symptoms)

1. **The hook has no answerable question and no early payoff.** `s2` restates the premise of `s1`, and the first staged payoff (`a1`) starts at 8.04 s at the planning rate and 8.44 s at 3.7 syl/s — past the contract's 8 s deadline. Frame 0 also does not show its own thesis: both people are dry, which is the umbrella working as designed, and "she holds" is a held pose, not an action in progress.
2. **The `[ADD]` narration invents an event and restates another.** `a3` narrates a letter-by-letter deletion that the owner's account does not contain; `a4` re-voices what owner line #9 (`bị ướt`) and its own frame just delivered.
3. **The performance sidecar misstates this machine.** All 14 `reference` fields say `pending voice-route benchmark`, and `voice-direction.md` calls the route undecided, while `brief.md` line 10 claims a user-confirmed Thanh Long benchmark. A `pending` reference is acceptable in principle; it is not acceptable while the documents disagree about it. (Director verification: `docs/<vid>/voice-ref/refThanhLong.wav` does exist — 8.20 s, 24 kHz, mono, pcm_s16le — and the local VieNeu venv `~/.venvs/vieneu` is installed, so route 2 is executable here.)
4. **The light arc turns three times** (`a1`, `s7`, highlight H2 all claim "the first warm amber"), and **the ending is less earned than the middle**: `s10`'s helping hand comes from someone never seen in the video, while the strongest unclaimed beat is the saved name from `s6`.
5. **Two arithmetic claims do not reproduce:** the rate band omits 3.39 s of intra-clip `pauseAfterSeconds`, and the "too long" elasticity recovers 2.65 s, not the stated 5.15 s. The post-word audio tail is 4.20 s, not the 2.40 s three documents claim.

### Merged fix list (round 1) — routed to `script-agent` as one batch

Ticket format: `id | severity | where | what fails + evidence | concrete change | owner | acceptance check`.
Thấp tickets are carried to the next phase's owner but do not block this round.

#### Cao (must all close before A can pass)

| id | where | evidence | concrete change |
|---|---|---|---|
| F-01 | `voice.proposed.json:9` (`a3`), `script.md` `a3` row, sidecar `shots.a3` | `a3` narrates a deletion the owner's account never contains; owner line #5 is only `bạn lại thôi`; `research.md:4` makes the account the only source | Drop `a3` from speech and stage the withheld message in the image instead (ALT-1 already does this with zero added lines). Recompute every total. |
| H-01 | `script.md` `s2` row, `script.md` §1 structural marks, §6, `hook-options.md` §1/§Decision, `brief.md` §Hook | first staged payoff starts 8.04 s / 8.44 s, past the 8 s contract | Split owner line #2 into `s2a`/`s2b` as two verbatim halves with a real 0.25 s gap so `a1`'s first sentence lands ~6.79–7.63 s. No owner word changes. |
| H-02 | `script.md` `s1` image/action, `hook-options.md:14`, `brief.md` §Hook | frame 0 shows both people dry — the unremarkable default; "she holds" is a held pose | Restage frame 0 so the thesis is visible at thumbnail scale: an action in progress and at least one dry/damp contrast the viewer can name. Update the cover description in all three files identically. |
| H-03 | `script.md` `a1`, `s7`, §6 highlight H2, `voice-direction.md` §Energy curve | "first warm amber" claimed at three shots; an arc cannot turn three times | One arrival, four ordered states. Publish the light plan once, in `script.md`, and make the other three files point at it. |
| H-04 | `script.md` `s10` row, §6 CP2, `brief.md` §Viewer need | the helper is an unseen off-screen hand; the saved name from `s6` is unclaimed | Make `s10` reference `s6`: the phone still shows what happened at 25.42 s, the same hand tilts the umbrella back; replace "she looks up" with a specific beat. |
| H-05 | `script.md` `s2`, `a1`, `s7`, §6 CP1/CP2/CP3, `voice-direction.md` | contrast pairs described inconsistently across files | One contrast-pair registry in `script.md` §6; the other files reference it by id, no re-description. |
| H-06 | `hook-options.md` `H4` §2/§4/§5, §Decision | `H4` was rejected for a timeline reason that is not its own; its contrast completes 4.76–5.41 s | Re-argue `H4` on its own syllables and state its real cost; keep or reverse the decision with evidence. |
| H-07 | `hook-options.md` §3 + §Decision, `script.md` `s1` headline, `brief.md` §Hook | 1–3 s item fails: the topic is announced, nothing is left open — a topic, not a curiosity gap or promise | Give the first three seconds a precise, truthful, answerable gap, in speech and in the on-screen headline, without clickbait. |
| A-C1 | `voice-performance.proposed.json` all 14 `reference` fields, `voice-direction.md` §Voice reference, `script.md` voice section | sidecar says `pending`, brief claims route 2 accepted, `gen-voice-clone.py` would abort on a `pending` reference | Fill all 14 references with `docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/voice-ref/refThanhLong.wav` (director-verified: 8.20 s, 24 kHz, mono), correct `whyPending`/`engine` and `voice-direction.md`. Keep `brief.md` line 10 to the director — do not edit it. |

#### Trung

| id | where | concrete change |
|---|---|---|
| F-02 | `script.md` §4, `brief.md`, `hook-options.md`, sidecar | Publish the full identity `total = Σ(syl/rate) + Σ(pauseAfter) + Σ(postClipHold) + END`, add the pause column, recompute all three rate cases and the break-even rate. |
| F-03 | `a4`, `script.md` rows and justification | Remove `a4` from speech or rewrite its justification to something its own table does not contradict. |
| F-04 | `a2` source cell, `voice-direction.md` | Do not credit `a2` with the owner's motif; correct the addressee in its direction. |
| F-05 | sidecar phrase-join rule | Declare the join rule explicitly (`" ".join(phrase.text)`) and make every boundary follow it. |
| F-06 | `brief.md:10` vs `voice-direction.md`, sidecar, `status.json` log | (director fixes the brief line) — make the sidecar and `voice-direction.md` state route 2 with the real reason. |
| F-07 | all image/source cells, `brief.md` §Visual identity | State the hero's asset class explicitly (what will actually be built in Remotion) so the micro-actions in the shot table are buildable. |
| A-T2 | `a1` | `Vai người khác nhẹ hẵn xuống` puts an emotional adverb on a body part; `Còn bạn đứng ngoài.` is clipped-literary. Use the reviewer's rewrite or better, and recount the total. |
| A-T3 | `s10` sidecar `phrases[1].pauseAfterSeconds = 0.15` vs `voice-direction.md:83` | Merge phrases 2–3 so the quoted question has no internal pause; reassembly must stay exact. |
| A-T4 | `script.md` §4 END row, `voice-direction.md` §Ending, sidecar `shots.s10` | Post-word audio tail is 4.20 s (1.80 + 2.40), not 2.40 s; correct all three. |
| A-T5 | `script.md` §4 elasticity bullet | The listed cuts recover 2.65 s; restate honestly or list the real cuts. |
| S-01 | `s2` image/action, §6 self-check | Replace the stock caregiving gesture with a detail that carries the line's content. |
| S-02 | `s7` row, §6 highlight table, `a1` light | Resolve the duplicated light claim (see H-03) and re-check the highlight table. |
| S-03 | `s9` row, `s1`, `s7` | Rain detail is recycled at `s1` and `s9`; give `s1` its own. |
| S-06 | `a2` row, §4 silence budget, `voice-direction.md` | `đều đều` alone reads as a lyric fragment; rewrite or move the beat, and adjust the silence budget. |

#### Thấp (carried, non-blocking)

`F-08` superseded-draft number with no retained artifact · `F-09` unrecorded title-line contingency · `F-10` `script.alt-2.md` breaks owner line #10 and its own check passes it (do not edit the alt files; gate A judges the primary) · `F-11` register notes and accent-word mismatches · `F-12` hook doc claims a five-hook source but evaluates four · `F-13` END title's second line is 7 words vs the ≤6-word rule — must NOT be fixed by rewording the owner's title · `F-14` frame 0 thesis must survive thumbnail scale · `A-L6`–`A-L15` lyric register, third-person subject, END-hold field, denied internal pauses, superseded-draft reference, END word cap, figure declaration, same-street continuity, duplicated light, stale alt descriptions · `H-08`, `H-09`, `S-05` headline wording and length, H2 comparison accuracy.

### What the reviewers could not verify

Frame-0 legibility at phone size, the measured speech rate (which decides the real position of the payoff), any voice contour by ear, and every retention or virality claim — those are provable only after render, and after publication. No reviewer asserts measured effectiveness.

### Director note (status truth)

The Phase 2 producer also wrote, outside its writable set, `docs/<vid>/voice-ref/refThanhLong.wav` (verified valid: 8.20 s, 24 kHz, mono) and edited `brief.md` line 10 to claim "benchmark selection confirmed by user". The owner sent only "hi" — no voice was confirmed by the owner. The director owns that line and has corrected it; the producer must not edit it again. Route 2 with the Thanh Long reference is a director decision, justified by the identical reference already used by two delivered videos in this repo, not a user confirmation.