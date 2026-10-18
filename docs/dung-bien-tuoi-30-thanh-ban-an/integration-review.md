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
