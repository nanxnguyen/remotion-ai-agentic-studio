# Integration review — dung-bien-tuoi-30-thanh-ban-an

## Round 1 — Gate E clean-context integration review

Reviewed 2026-10-18 from the locked brief/script/voice packet, content and design evidence, audio/mix packet, join notes, current timeline and Reel, all 16 current scene files, and the supplied cover/board/motion evidence. This is a review-only pass. No source, audio, status, or pipeline review/gate file was edited.

### Verdict

**score: 3.1/10  verdict: revise**

The narrative packet is coherent on paper and the 16-key order is preserved, but the joined artifact is not integration-ready: production scenes are still placeholders, `Reel.tsx` contains no voice/BGM/SFX, the canonical spoken text is not reliably present in the current voice takes, and the design board still contradicts the canonical climax text. Open Cao/Trung tickets remain, so Gate E cannot pass.

### Rubric

| Item | Score | Evidence | Judgment |
|---|---:|---|---|
| Story ↔ frames | 2.5 | `script.md:23-38`; `design-spec.md:45-62`; `design-review.md:302-337`; `scenes/Scene01.tsx:4-8` through `Scene16.tsx:4-8` | The intended sequence is correct, but the production frames are sixteen `Scene N` placeholders; the board still has unresolved s4b/s7/s8/s9 action ambiguity. |
| Text ↔ frames | 2.5 | `content-pack.md:16-33`; `content-pack.md:35-45`; `board.png` s9b; `Reel.tsx:21-40` | Content pack joins 16/16, but no production scene renders it and the board's s9b label says `mình muốn gì?`, not `Dạo này, bạn sống có vui không?`. |
| Voice ↔ pacing | 4.0 | `join-notes.md:9-31`; `timeline.ts:11-27`; `voice-report.md:16-37`; `script.md:61-64` | Key order, measured durations, re-hook at frame 578/19.27s, 0.70s climax gap, and 2.40s final hold are budgeted. However s1's required 0.15s lead-in is not represented by the timeline, 9/16 current clips fail the final ASR threshold, s8's internal pause is not evidenced, and the final hold is not rendered/measured. |
| Sound ↔ story | 1.5 | `Reel.tsx:1-40`; `mix-plan.md:11-18,20-39,82-90`; `audio-review.md:186-248` | Cue offsets are documented and the current interval recomputation is post-voice, but no sound is mounted in the Reel and no integrated mix proves ducking, loudness, SFX audibility, or the near-silent ending. |
| Viewer experience | 3.0 | `brief.md:16-23`; `script.md:66-76`; `design-review.md:264-275,302-310` | The planned story has a strong hook/re-hook/turn/ending, but a viewer of the current composition sees placeholder labels, not the promised paper world, character actions, re-hook, or earned silence. |
| User constraints | 4.0 | `brief.md:5,10,22`; `content-pack.md:24-25,47-50`; `voice.json` | The mandatory line and no-shaming/no-CTA constraints are locked in text documents. They are not yet proven in the actual composition or current voice takes (`s10` ASR hears `bản ảnh`). |

### Measured walk-through

The table uses the current `join-notes.md:16-31` frame-quantized ranges at 30 fps. “Sees” is the accepted design/content intent; “current” records what the production source can actually deliver today.

| Key / time | Intended sees · hears · reads | Current integration / attention risk |
|---|---|---|
| s1 0.00–2.57s | Cover: headline, ruler/circled 30, character; voice hook; headline replaces caption; pencil cue after voice. | Cover evidence exists, but `Scene01` is only `Scene 01`; no voice or SFX in `Reel`. Highest first-second drop if built as-is. |
| s2 2.57–6.13s | Red three-line verdict; one continuous spoken line; caption chunks and `BA CHƯA`. | `Scene02` is placeholder; content timing is only documented, not rendered. |
| s3a 6.13–10.73s | Ruler ticks 18/22/25/30; four caption chunks; pencil/mark cue after speech. | `Scene03` is placeholder; numeric/word sequence is also one of the failed ASR keys. |
| s3b 10.73–12.97s | Overflowing list and second sheet; “vẫn cứ dài thêm”; paper-slide tail. | `Scene04` is placeholder; current ASR regresses this phrase. |
| s4a 12.97–16.63s | Tết feast/steam, continuous narration, plate cue. | `Scene05` is placeholder; current ASR fails the opening phrase/`cỗ`; design board evidence is stronger than production source. |
| s4b 16.63–19.27s | Frozen chopsticks/temple reaction and three questions; question bursts; caption + in-world questions. | `Scene06` is placeholder and the design review still flags the board reaction pose as not readable. Re-hook boundary is close enough to work only after visual/audio integration. |
| s5a 19.27–21.37s | Hard freeze, Tết noise cut, verbatim “Bạn chưa có nhà, chưa kết hôn.” | `Scene07` is placeholder; no audio envelope/reverb proof. This is the key re-hook attention test. |
| s5b 21.37–24.20s | Verbatim second clause, pen drop, red unfinished question, 0.35s tail silence. | `Scene08` is placeholder; no mounted pen-drop cue. |
| s6a 24.20–28.07s | Character on 30, red “thất bại” stops; two caption chunks. | `Scene09` is placeholder; voice ASR fails `ba mươi`/canonical delivery. |
| s6b 28.07–31.47s | Macro reveal: hand-drawn 30, eraser, graphite stop; near-whisper; zoom SFX after speech. | `Scene10` is placeholder; voice ASR fails the key phrase and the design board is only a diagonal macro symbol. Highlight cannot land until rebuilt. |
| s7a 31.47–35.03s | Phone-lit feed, `minh hoạ`, three life-status cards; swipe tail. | `Scene11` is placeholder; board does not clearly show thumb-scroll/face light. |
| s7b 35.03–37.07s | Screen-off isolation and “mình đi nhầm đường à?”; no competing SFX. | `Scene12` is placeholder; board is a generic dark rectangle rather than a clear reaction. |
| s8 37.07–41.50s | Number-free salary bar and four arrows; three caption chunks; two notification tails. | `Scene13` is placeholder; current voice fails the first clause and no measurement proves the intended internal pause, so caption reveal timing is under-specified. |
| s9a 41.50–45.17s | Props/marks retract to blank paper; room sound fades; 0.70s gap before climax. | `Scene14` is placeholder; board is an empty oval cue, not a clearly staged clearing/exit. |
| s9b 45.17–47.47s | Warm light, character hugs knees, exact self-question handwritten/highlighted, 0.40s silence. | `Scene15` is placeholder; board visibly says `mình muốn gì?` and current ASR drops `Dạo này`. This is a direct text/frame/voice contradiction. |
| s10 47.47–51.77s | Exact closing sentence, yellow sweep, unattended ruler, 2.40s quiet hold with paper wind exception. | `Scene16` is placeholder; current ASR hears `bản ảnh`, and no integrated render proves final silence/BGM fade. |

### Highlight and re-hook checks

- H1 (`s5a/s5b`, ~19.27s): the script, content pack, and join timing agree on the verbatim two-part line and 0.45s gap. The production path has no freeze implementation, no voice, and no pen-drop SFX, so the combined beat is unverified.
- H2 (`s6b`, ~28.07s): macro/near-whisper/zoom intent agrees in the script and design spec, but the current voice fails the phrase and the production scene is a placeholder; the promised eraser-and-hand reveal is not integrated.
- H3 (`s9a/s9b`, ~45.17s): the 0.70s gap and final 0.40s hold are correctly budgeted, but the board text contradicts the canonical question and the actual voice drops “Dạo này”. The emotional climax is therefore not locked across branches.
- Re-hook: starts at frame 578 / 19.27s, within the requested 15–20s window. It is viable in the plan, not yet in the composition.
- Closing: `timeline.ts:27` allocates 2.40s, but `Reel.tsx` has no audio and there is no integrated render; the silence claim remains unproven.

### Round 1 exhaustive tickets

| ID | Severity | Where | Evidence | Concrete change | Owner | Acceptance check |
|---|---|---|---|---|---|---|
| E-001 | Cao | `src/videos/dung-bien-tuoi-30-thanh-ban-an/scenes/Scene01.tsx:4-8` through `Scene16.tsx:4-8`; `Reel.tsx:21-38` | Every scene renders only `Scene NN`; none implements the accepted design/content beat map. Current viewer experience contradicts `brief.md:46-64` and `design-spec.md:45-62`. | Replace all 16 placeholders with production scenes wired to the accepted 16-key content/design map: paper/grid, character action, props, captions, safe zone, highlight motion, and exact s9b/s10 text. Keep one scene per timeline key and preserve deterministic frame-driven motion. | design-agent | A full-size and thumbnail walk of all 16 production scenes shows the expected character/action/prop/text for each key without consulting spec prose; Gate D rerun. |
| E-002 | Cao | `Reel.tsx:1-40` | No `<Audio>`, voice clips, BGM, SFX, ducking, or ending fade are mounted; `join-notes.md:37-46` and `mix-plan.md:3,11-18` require these integration decisions. | Integrate the 16 measured voice clips, BGM envelope, all listed relative SFX cues, 200ms duck ramps, and s10 BGM fade into the Reel using the accepted relative frame offsets. | video-director + audio-agent | `Reel.tsx` contains all required audio tracks; an integrated render passes the audio-review windows: −14±1 LUFS, true peak ≤−1.5 dBTP, 4–6 dB duck, 12–18 dB voice/music gap, disjoint SFX, and ≥1.2s near-silent ending; audio review and Gate E rerun. |
| E-003 | Cao | `voice-clone-asr.md:7-24`; `voice-report.md:16-37` | Only 7/16 final clips pass CER ≤0.04. Failing canonical/high-impact keys include `s1`, `s3a`, `s3b`, `s4a`, `s6a`, `s6b`, `s8`, `s9b`, `s10`; examples: `s6b` ASR “Cây móc và mùi ấy…”, `s9b` drops “Dạo này”, `s10` says “bản ảnh”. | Regenerate the failing keys from locked `voice.json`; preserve `ba mươi`, number words, `kẻ tay`, `Dạo này`, and `bản án`. Re-measure durations and update dependent timing evidence. | voice-agent | Fresh PCM ASR has every key at CER ≤0.04 with the canonical word sequence present; voice report, clone ASR, durations, and mix proof agree; audio review and Gate E rerun. |
| E-004 | Cao | `script.md:61`; `timeline.ts:11-27`; `mix-plan.md:9,43-57` | Script/mix plan require s1 speech to begin after a 0.15s lead-in, but `timeline.ts` gives s1 only a single 0.40s post-voice hold and `Reel.tsx` has no `voiceFrom`/audio offset. The cue proof assumes a 0.15s lead-in that the join does not implement. | Encode the s1 0.15s lead-in explicitly in the timeline/audio placement, retain the 0.25s post-voice hold, and recalculate s1 cue and all downstream frame boundaries. | video-director + audio-agent | Rendered s1 has 0.15s pre-roll before speech, 0.25s post-roll, cue at the documented relative frame, and the total remains 40–60s; timeline/mix proof and Gate E rerun. |
| E-005 | Trung | `script.md:35`; `content-pack.md:30`; `voice-report.md:28`; `timeline.ts:24` | s8 has three caption chunks and an explicit instruction to verify the internal pause or split to s8a/s8b, but the current voice is one 4.130s key with no pause measurement. Caption changes therefore have no measured reveal boundaries. | Measure the internal pause in s8. If absent/insufficient, split to s8a/s8b with a 0.30s gap, regenerate durations, update content/timeline/mix cues, and preserve the no-number salary visual. | voice-agent + content-agent + video-director | Voice evidence records the pause boundaries or the split keys; every caption appears within its spoken phrase and no cue overlaps speech; content/audio reviews rerun. |
| E-006 | Cao | `out/qa/dung-bien-tuoi-30-thanh-ban-an-board.png` s9b; `design-review.md:304,336`; `content-pack.md:32`; `voice.json` | The board visibly labels the climax `mình muốn gì?`, while canonical spoken/on-screen text is `Dạo này, bạn sống có vui không?`. This is a direct design↔content↔voice contradiction, not a style preference. | Rebuild s9b storyboard/prototype text and self-written action to the exact canonical question; keep the warm light, hug-knees pose, and yellow underline. | design-agent | Board/style evidence shows the exact canonical sentence or an unambiguous exact-text layout; no `mình muốn gì?` remains in s9b evidence; Gate D and Gate E rerun. |
| E-007 | Cao | `design-review.md:320-327,329-337`; board s4b, s7a/s7b, s8, s9a/s9b | Independent Gate D Round 3 still scores 8.3 and carries open D3/D6/D8: temple reaction, phone actions, money-drain action, clearing/exit, and self-question are not thumbnail-readable without spec prose. These are exactly the beats needed to make the voice/story turn legible. | Rebuild the affected board tiles and corresponding production scenes with distinct acting poses and props: temple reaction, thumb-scroll/screen-off, kneeling money drain, clearing exit, and hug-knees self-question. | design-agent | At full size and thumbnail, each affected key has character + action + prop/location/device and matches the spoken line without labels/spec prose; Gate D rerun before E. |
| E-008 | Trung | `audio-review.md:217-248`; `mix-plan.md:82-90`; `Reel.tsx:21-40` | The source cue proof is post-voice, but integrated mix targets and the ≥1.2s near-silent ending remain unmeasured; the planned s10 paper-wind exception cannot be distinguished from silence until render. | Produce the integrated mix after E/B implementation and measure the voice/music windows, duck ramps, SFX windows, BGM fade, and s10 hold separately. | video-director + audio-agent | A verified render reports all target numbers and shows at least 1.2s near-silent s10 hold after the last word, with paper foley reported separately; audio review and Gate E rerun. |

### Concrete weaknesses even before the fixes

1. The strongest designed hook is currently replaced by a literal `Scene 01` frame in the actual production composition.
2. The board's climax text contradicts the locked canonical line, while the current `s9b` voice independently drops the same opening phrase; two branches fail at the same emotional beat.
3. The timeline documents a special s1 lead-in that is not encoded in the timeline/Reel contract, so the first cue/voice alignment is not reproducible.
4. The audio packet has numerical source proofs but no integrated audio path at all; BGM/SFX/ducking/closing silence cannot be experienced or measured.
5. The current storyboard is not sufficient to hand off the action-dependent middle/end beats to scene implementers without consulting prose, despite the design gate's own open tickets.

### Invalidated reviews

- `design-review.md` / Gate D must be rerun for E-001, E-006, and E-007.
- `audio-review.md` must be rerun for E-002, E-003, E-004, E-005, and E-008.
- `content-pack-review.md` must be rerun if E-005 changes key structure or caption timing.
- Gate E must be rerun after all Cao/Trung tickets close; Gate B remains blocked until then.

### Audit

Required read-only audit run after this report was written:

`python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an`

Result: **FAIL (exit 1)**

```text
dung-bien-tuoi-30-thanh-ban-an: FAIL
  ✗ review A report docs\dung-bien-tuoi-30-thanh-ban-an\script-review.md is missing
  ✗ review A report docs\dung-bien-tuoi-30-thanh-ban-an\script-review.md is missing
  ✗ review A report docs\dung-bien-tuoi-30-thanh-ban-an\script-review.md is missing
  ✗ agent audio-agent-3 is still running but stage audio is done
  ✗ agent integration-reviewer is still running but stage design is done
```

The missing canonical Gate A report and stale agent-state errors are pre-existing/outside this review's writable scope. No `pipeline.py review` or `pipeline.py gate` command was run.

## Round 2 — clean-context Gate E integration review

Reviewed 2026-10-18 after the Round 1 E-001…E-008 fix pass. Inputs re-read: `brief.md`, `script.md`, `content-pack.md` + `content-pack-review.md`, `voice-report.md`, `voice-clone-asr.md`, `voice.json`, `voice-durations.ts`, `assets-manifest.md`, `audio-review.md`, `mix-plan.md`, `design-spec.md`, `design-review.md`, `join-notes.md`, `task-review.md`, the Round 1 report and its ticket/closure evidence, all 16 scene files, `Reel.tsx`, `timeline.ts`, and the current cover/board/style/motion evidence. This is review-only: no source, audio, status, or pipeline review/gate file was edited.

### Verdict

**score: 8.1/10  verdict: revise**

The Round 1 visual integration failures are materially repaired: the 16 scene files are no longer placeholders, the canonical text is present in the scene source, the current board has the corrected s9b question and the requested action vocabulary, and `Reel.tsx` now mounts all voice/SFX/BGM tracks. Gate E still cannot pass because Cao/Trung integration blockers remain: current voice evidence is only 7/16 ASR-clean, s8 has no measured internal pause, the s1 lead-in is not represented as an exact timeline contract, and no integrated render proves ducking/loudness/ending silence. One genuinely new mix-envelope defect is also recorded below.

### Rubric

| Item | Score | Evidence | Judgment |
|---|---:|---|---|
| Story ↔ frames | 8.7 | `Scene01.tsx`–`Scene16.tsx`; `design-review.md` Round 3; current `board.png` | Production scenes now contain real paper, character, props, actions, and deterministic frame-driven motion. The board is improved and s9b is corrected, but the independent design evidence still calls several tiles icon-level and no final joined render verifies every transition. |
| Text ↔ frames | 8.8 | `content-pack.md`; exact strings in all 16 scene files; `Scene15.tsx:6,41-74`; `Scene16.tsx:6,34-48`; `board.png` | The ordered key text and mandatory line are present, safe-zone placement is documented, and s9b no longer says `mình muốn gì?`. Full rendered caption timing is not yet proven, especially s8's three chunks. |
| Voice ↔ pacing | 6.8 | `voice-report.md:14-46`; `voice-durations.ts:3-19`; `timeline.ts:11-27`; `join-notes.md:9-31` | Duration budget is 1553 frames / 51.7667s and remains in the 40–60s target; the re-hook is at frame 578 (19.27s), s9a→s9b has 0.70s, and s10 has a 2.40s hold. But 9/16 current clips fail the final CER threshold, s8 has no pause boundary, and the s1 lead-in remains only a Reel-side 5-frame approximation. |
| Sound ↔ story | 7.0 | `Reel.tsx:26-72`; `mix-plan.md:9-17,43-80`; `audio-review.md` Round 3 | All 16 voice clips, 12 bounded SFX cues, and BGM are now mounted; current cue recomputation is post-voice and the s10 fade is present. The BGM duck is a hard 0.20↔0.11 step rather than a 200ms ramp, there is no explicit 1s bed fade-in, and no integrated render proves loudness, duck delta, audibility, or the near-silent ending. |
| Viewer experience | 8.2 | `brief.md:16-23`; `design-spec.md`; current scene sources and board | The planned hook → social verdict → Tết pressure → re-hook → macro reveal → self-question → quiet close now has corresponding scene implementations. The viewer experience is still not Gate-E-ready until canonical spoken delivery and the combined audio/visual timing are verified together. |
| User constraints | 8.8 | `brief.md:5,10,22`; `voice.json:8-9,16-17`; `Scene07.tsx:53-58`; `Scene08.tsx:62-70`; `Scene15.tsx:6,41-74`; `Scene16.tsx:6,34-48`; current board | The mandatory sentence is exact in voice/source scenes, no CTA is added, and s9b/s10 use the required wording in current visual evidence. Current ASR still mishears/drops required wording in s1/s6b/s9b/s10, so the constraint is not yet proven in the heard track. |

### Round 1 ticket verification

| ID | Round 2 status | Evidence | Result |
|---|---|---|---|
| E-001 | **fixed for integration source** | All 16 files are substantive (no `Scene NN`, placeholder, or TODO); `Scene01.tsx`–`Scene16.tsx`; current QA stills for the scene clusters | The scenes now implement the accepted paper/character/prop/action map and exact key text. Final full-render visual QA remains a downstream Gate B/C check, not an open E ticket. |
| E-002 | **partial / open** | `Reel.tsx:67-72` mounts 16 voice sequences, all listed SFX sequences, and BGM; `Reel.tsx:52-57` is the current envelope | Track mounting and relative placement are present, but the source has no integrated mix measurement and the ducking is not ramped as required. Keep open as a Cao integration blocker until the NEW envelope issue and render acceptance close. |
| E-003 | **open** | `voice-report.md:16-31,35-46`; 7/16 pass; failures include `s1,s3a,s3b,s4a,s6a,s6b,s8,s9b,s10` | Not closed. The final current ASR still fails canonical/high-impact words and cannot be treated as a viewer-heard exact-text pass. |
| E-004 | **partial / open** | `Reel.tsx:29-31,46-50,69`; `timeline.ts:11-12`; `mix-plan.md:9,43-65` | A 5-frame (`0.1667s`) s1 audio offset exists and cues are placed after the offset speech interval, but the required `0.150s` lead-in and `0.250s` post-roll are not explicit in the timeline contract. `timeline.ts` still documents a generic `voice + 0.40s` hold and the frame-quantized total is 1553 frames. |
| E-005 | **open** | `voice-report.md:28,35-46`; `content-pack.md` s8 row; `Scene13.tsx:17-31`; `timeline.ts:24` | s8 remains one 4.130s key and no measured internal pause/split evidence exists. Scene13 switches captions at local frames 38/78 without a voice-derived pause boundary, so the three chunks are not yet integrated to delivery. |
| E-006 | **fixed** | `design-review.md` Gate E closure; `proto/scenes.tsx:690`; current `board.png`; `Scene15.tsx:6,41-74` | The current board/prototype and production scene use the exact canonical `Dạo này, bạn sống có vui không?`; the old `mình muốn gì?` is absent from current s9b evidence. |
| E-007 | **fixed in design-owned integration scope** | Current board/action tiles; `Scene06.tsx`, `Scene11.tsx`, `Scene12.tsx`, `Scene13.tsx`, `Scene14.tsx`, `Scene15.tsx`; Gate E design-ticket closure | The requested feast/reaction, phone on/off, salary drain, clearing, and hug-knees actions now exist in the current board and production scene sources. The independent Gate D report still carries separate design hard-cap risk; that is not silently re-scored here. |
| E-008 | **open** | `Reel.tsx:33-39,52-72`; `mix-plan.md:82-90`; `audio-review.md` Round 3 | Relative offsets now mirror the current post-voice proof and s10 has a 9-frame BGM fade after the rounded last voice end, but no integrated render proves −14±1 LUFS, true peak, voice/music gap, duck ramps, or ≥1.2s near-silent ending. |

### Exhaustive remaining and NEW tickets

| ID | Status | Severity | Where | Evidence | Concrete change | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|
| E-002 | remaining | Cao | `Reel.tsx:52-57,67-72` | Tracks are mounted, but integrated mix targets are not measured and the envelope is not yet compliant with the mix contract. | Complete the accepted mix integration after the final voice/timing decisions; implement the documented duck/fade behavior and produce the verification render. | video-director + audio-agent | Integrated render passes −14±1 LUFS, true peak ≤−1.5 dBTP, 12–18dB voice/music gap, 4–6dB duck with 150–300ms ramps, and the ending check. |
| E-003 | remaining | Cao | `public/audio/dung-bien-tuoi-30-thanh-ban-an/s1.mp3`, `s3a.mp3`, `s3b.mp3`, `s4a.mp3`, `s6a.mp3`, `s6b.mp3`, `s8.mp3`, `s9b.mp3`, `s10.mp3`; `voice-report.md:16-31` | Current final PCM ASR is 7/16 pass; examples include `s6b` mistranscription, `s9b` dropped `Dạo này`, and `s10` `bản ảnh`. | Regenerate the failing keys from locked `voice.json`, then remeasure durations and dependent timing/cues. | voice-agent | Fresh PCM faster-whisper evidence has all 16 keys at CER ≤0.04 with the canonical word sequence present. |
| E-004 | remaining | Cao | `timeline.ts:6-12`; `Reel.tsx:29-31,46-50,69`; `mix-plan.md:9,63-65` | Five frames encode ≈0.167s, not the specified 0.150s; timeline does not expose the lead-in/post-roll contract, so the first cue alignment is not reproducible from the timeline alone. | Add an explicit s1 lead-in/post-roll contract and recalculate the affected frame/cue table from exact current durations while keeping the total in 40–60s. | video-director + audio-agent | Timeline/join evidence explicitly records the s1 speech interval `0.150–2.310s` (or an explicitly frame-quantized equivalent), preserves ≥0.25s post-roll, and the rendered first cue is after speech. |
| E-005 | remaining | Trung | `Scene13.tsx:29`; `voice-report.md:28,35-46`; `content-pack.md` s8 | No internal pause measurement or s8a/s8b split; caption changes are fixed local frames rather than measured delivery boundaries. | Measure the pause in the current clip; if absent, split/regenerate s8 and update content/timeline/mix cues. | voice-agent + content-agent + video-director | Evidence records the pause/split boundaries; every s8 caption appears within its spoken phrase and no cue overlaps speech. |
| E-008 | remaining | Trung | `Reel.tsx:52-57,72`; `mix-plan.md:82-90`; `out/` | No joined render exists, so BGM duck/fade, integrated loudness, SFX audibility, and the ≥1.2s near-silent s10 hold are unverified. | Render the joined composition after E-003/E-004/E-005 and measure the final mix windows separately from paper-edge foley. | video-director + audio-agent | Verified render reports all mix targets and shows ≥1.2s BGM-near-silent after the last spoken sample, with paper foley reported separately. |
| E-009 NEW | remaining | Trung | `Reel.tsx:52-57` | `bgmVolume` jumps between `0.20` and `0.11` when a voice window enters/exits (±6 frames); it does not interpolate 200ms attack/release ramps. The mix plan requires linear duck ramps and no pumping. | Replace the hard window switch with frame-derived attack/release interpolation around every voice window, preserving the s10 fade and intentional holds. | video-director + audio-agent | Source inspection shows explicit ramps; integrated audio review measures 150–300ms ramps and a 4–6dB duck without clicks/pumping. |

No other NEW cross-branch Cao/Trung issue was found in the requested packet. The remaining design-review D3/D6/D7/D8/D10 hard-cap risks are recorded in `design-review.md`; they are not duplicated as new E tickets because the current Gate E board/source now contains the requested corrected s9b and action beats, while final visual fidelity remains a Gate B/C responsibility.

### Measured walkthrough and highlight checks

| Key / time | Sees · hears · reads in current integration | Finding |
|---|---|---|
| s1 0.00–2.57s | `Scene01`: headline, ruler/circled 30, character; voice sequence starts at `from+5`; pencil SFX at local 71f. | Visual/text fixed; exact 0.15s contract remains E-004; current ASR fails the opening word/number. |
| s2–s4b 2.57–19.27s | Verdict lines, ruler/list, feast/steam, three question bursts; 4 scene sources and post-voice SFX offsets. | Story/props now exist; s3a/s3b/s4a voice wording remains in E-003; s4b text and action are present. |
| s5a/s5b 19.27–24.20s | Freeze, exact mandatory two-part line, pen drop and question mark. | H1 is now source-integrated: exact scene text and mounted voice/SFX; heard-track proof still depends on the voice/mix tickets. |
| s6a/s6b 24.20–31.47s | Red unfinished `thất bại`, then macro hand-drawn 30/eraser/graphite. | H2 visual beat is present; s6a/s6b ASR remains open and zoom SFX is only source/cue verified. |
| s7a/s7b 31.47–37.07s | Feed with `minh hoạ`, thumb-scroll, screen-off isolation, exact self-question. | Action sources are present and no competing SFX is listed; final joined timing/render remains unverified. |
| s8 37.07–41.50s | Number-free salary bar and four arrows, two notification cues, three caption chunks. | Visual constraint is met; pause/chunk alignment is open E-005 and first clause ASR fails. |
| s9a/s9b 41.50–47.47s | Clearing paper, 0.70s gap, warm light, hug-knees, exact canonical question and yellow underline. | E-006 is fixed; no s9b SFX is correct; exact heard delivery and final render remain open. |
| s10 47.47–51.77s | Exact closing card, unattended ruler, 2.40s hold, paper wind at local 58f; BGM fades over 9f after rounded voice end. | Source fade/hold design is present; final near-silence and current ASR `bản án` are not proven in an integrated render. |

Concrete weaknesses despite the repaired packet:

1. The visual branch and text source now agree, but the final heard track still contradicts canonical wording on nine keys, including the climax and close.
2. `Reel.tsx` has the right track inventory and relative cue list, yet its BGM envelope is still a hard switch and therefore does not implement the mix-plan ramp semantics.
3. The current 1553-frame composition is within the duration budget, but the exact voice total plus 7.700s of holds (51.833915s) and the quantized timeline total (51.7667s) are not reconciled into one explicit timing contract.

### Invalidated reviews

- `audio-review.md` must rerun after E-003, E-004, E-005, E-008, and E-009; the current audio override does not make these integrated checks pass.
- `content-pack-review.md` must rerun if E-005 changes the s8 key structure or caption boundaries.
- Gate D remains independently carried at its recorded hard-cap override; no new design taste score is assigned here. If production scenes materially change the board-owned actions, rerun Gate D before B.
- Gate E remains `revise`; Gate B/build approval remains blocked until all Cao/Trung E tickets close and the joined evidence is rerun.

### Audit

Required read-only audit run after this append:

`python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an`

Result: **FAIL (exit 1)**

```text
dung-bien-tuoi-30-thanh-ban-an: FAIL
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
```

This is the pre-existing canonical Gate A report-path defect; it is outside this reviewer's writable scope. No `pipeline.py review` or `pipeline.py gate` command was run.

## Round 3 — clean-context Gate E integration review

Reviewed 2026-10-18 as an independent, review-only pass. Re-read the workflow/rules, `join-notes.md`, this report's prior rounds, `audio-review.md`, `task-review.md`, the current `Reel.tsx`, `timeline.ts`, and all 16 scene files. The current preview `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview.mp4` was inspected with `ffprobe`, `ffmpeg` (`ebur128`, `volumedetect`, `silencedetect`, `astats`), and a frame contact sheet. No source, status, pipeline, audio, or task file was edited by this review.

### Verdict

**score: 6.8/10  verdict: revise**

Gate E **does not pass**. The visual join is materially present and the preview renders, but open Cao/Trung tickets remain. In particular, the integrated preview misses the loudness target, the final voice evidence remains 7/16 ASR-clean, the exact s1 lead-in contract is still not represented in `timeline.ts`, and s8 caption boundaries are not voice-measured. E-009 is improved at source level but is not fully accepted without integrated ramp/pumping evidence. No automatic pass is permitted while any Cao/Trung ticket remains open.

### Round 3 rubric

| Item | Score | Evidence | Judgment |
|---|---:|---|---|
| Story ↔ frames | 8.5 | All 16 current scene files; preview contact sheet `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-contact.png` | The preview shows the paper world, character, ruler, feast, phone, salary sheet, clearing beat, and closing card. This is materially integrated, but the contact sheet is sampled evidence rather than the downstream full visual QA. |
| Text ↔ frames | 8.1 | `Scene01.tsx`–`Scene16.tsx`; `Scene13.tsx`; `Scene15.tsx`; `Scene16.tsx`; `content-pack.md` | Canonical s9b/s10 source strings and safe-zone captions are present. s8 uses hard-coded local boundaries (38/78), not a measured spoken boundary, so text/audio integration is not fully proven. |
| Voice ↔ pacing | 5.4 | `voice-clone-asr.md`; `voice-report.md`; `voice-durations.ts`; `timeline.ts`; `join-notes.md` | 16 clips decode and the 51.7667s frame budget renders, but only 7/16 meet CER ≤0.04. E-004 and E-005 remain unresolved, so the timing contract is not approval-ready. |
| Sound ↔ story | 5.0 | `Reel.tsx`; `mix-plan.md`; preview ffprobe/ffmpeg measurements | All voice/SFX/BGM tracks are mounted and the source now contains 6-frame duck ramps. The preview measures `-21.8 LUFS`, outside `-14±1 LUFS`; windowed voice/music gap, duck delta, SFX audibility, and separated ending-bed measurement are not demonstrated. |
| Viewer experience | 7.4 | Preview contact sheet; `join-notes.md` walkthrough; all 16 scenes | Hook → social verdict → re-hook → macro reveal → self-question → quiet close is visually legible in the sampled preview. The heard wording and mix level can still undermine the intended emotional beat. |
| User constraints | 7.2 | `voice.json`; `Scene15.tsx`; `Scene16.tsx`; `voice-clone-asr.md` | No CTA/shaming change is visible in the current source, and the required visual strings exist. The heard track still fails required wording on s9b/s10 and other high-impact keys, so full constraint compliance is not proven. |

### Direct preview evidence

- `ffprobe`: H.264 video plus AAC stereo audio, 1080×1920, 30fps, 51.776s.
- `ebur128`: integrated loudness **-21.8 LUFS**, LRA 1.7 LU. This fails the stated `-14±1 LUFS` integrated target and keeps E-002/E-008 open.
- `volumedetect`: mean volume **-24.5 dB**, max sample **-5.6 dB**. This is not a true-peak certification and cannot replace the required true-peak/windowed report.
- `silencedetect` on the final section: silence intervals at approximately 49.630–49.947s and 51.000–51.733s. The latter is only about 0.733s of measured pure silence; paper-wind and BGM cannot be separated from the joined AAC by this check, so the required ≥1.2s near-silent bed window is not proven.
- A sampled contact sheet shows real content in the current scene join; it does not substitute for Gate B/C full-frame QA.

### Ticket verification

| ID | Round 3 status | Evidence and finding |
|---|---|---|
| E-002 | **open — Cao** | `Reel.tsx` now mounts 16 voice clips, 12 bounded SFX cues, and BGM, and the preview renders. However integrated loudness is `-21.8 LUFS` versus `-14±1`; no windowed 12–18 dB voice/music gap, 4–6 dB duck delta, SFX audibility, or true-peak proof is recorded. Track presence is fixed; integration acceptance is not. |
| E-003 | **open — Cao** | `voice-report.md`/`voice-clone-asr.md` report **7/16** pass. Failing keys still include `s1`, `s3a`, `s3b`, `s4a`, `s6a`, `s6b`, `s8`, `s9b`, and `s10`; the high-impact examples remain dropped `Dạo này` and `bản án`→`bản ảnh`. This is a direct heard-content blocker, not a documentation-only issue. |
| E-004 | **open — Cao** | `Reel.tsx` applies `VOICE_LEAD_IN_FRAMES.scene01 = 5` (0.1667s at 30fps), but `timeline.ts` still exposes only the generic `VOICE_SECONDS.s1 + 0.40` shot contract. The required exact 0.150s lead-in and ≥0.250s post-roll are not encoded/reconciled as one reproducible timing contract. |
| E-005 | **open — Trung** | `s8` remains one 4.129958s clip. `Scene13.tsx` changes captions at local frames 38/78, but no ASR/silence measurement establishes those as phrase boundaries and no s8a/s8b split exists. Caption timing remains an authored approximation. |
| E-008 | **open — Trung** | The joined preview now exists, but it fails integrated loudness (`-21.8 LUFS`) and does not provide the required windowed duck/gap/SFX/ending evidence. Final pure silence is only measured for ~0.733s in the inspected tail; the planned paper-wind exception prevents claiming ≥1.2s near-silent integrated-bed proof without separated tracks or a documented window measurement. |
| E-009 | **partial / open — Trung** | Source inspection confirms explicit 6-frame attack/release interpolation (200ms at 30fps) around ordinary voice windows in `Reel.tsx`. The last voice window takes the intentional s10 fade branch, so the source is improved but the acceptance check still requires integrated measurement of ramp duration, duck delta, and no pumping/clicks. No such measurement is present in the preview evidence. |

### Required disposition

Keep Gate E at **revise**. Route E-002/E-008 to director/audio integration, E-003 to voice regeneration and fresh ASR, E-004 to the shared timeline/Reel contract, E-005 to voice/content/timeline reconciliation, and E-009 to integrated mix verification. Gate B/build must remain blocked until Gate E is independently passed at ≥9/10 with no open Cao/Trung ticket. This review did not run `pipeline.py review`, `pipeline.py gate`, `override`, or any status mutation.

### Required audit result

After this Round 3 report was appended, the required read-only command was run:

`python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an`

Result: **FAIL (exit 1)**. The only reported errors are the pre-existing Gate A report-path entries using Windows separators:

```text
✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
```

`npx tsc --noEmit` completed successfully. This reviewer did not repair the audit/status defect because the requested scope was review-only.
