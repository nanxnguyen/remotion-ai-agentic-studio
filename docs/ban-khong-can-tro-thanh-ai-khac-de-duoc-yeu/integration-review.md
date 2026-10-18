# Gate E Integration Review: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Reviewer:** integration-reviewer (clean context)
**Date:** 2026-10-18
**Artifacts reviewed:** script.md, content-pack.md, voice.json + durations, mix-plan.md, storyboard (board.png), cover.png, 3 style frames, hook motion strip, join-notes.md, motion-spec.md, motion-evidence.json, motion-review.md

---

## Scoring (1-10 per lens)

### Lens A: Story/Text ↔ Frames (Staging, Layout, Safe Zone, Cover)
**Score: 9/10**
- **Frame vs line alignment:** Walking through video second by second:
  - s1: Typing/delete visual matches "xóa tin nhắn" line. Cover frame 0 shows hook text + visual. ✓
  - s2: Split screen L/R matches "giả vờ thích... để có chuyện nói". ✓
  - s3: Smile crack visual matches "không buồn / nhạy cảm". Text "Không sao đâu" floats then cracks. ✓
  - s4: Montage + mirror unfamiliar matches "giỏi đoán / dốt hỏi mình". Hard cut to s5 = realization. ✓
  - s5: Sudden stillness, question mark syllable-build matches "khó trả lời". Cross-dissolve to s6. ✓
  - s6: Eye closeup + question mark reflection matches core question. s6a/s6b gap = breath. ✓
  - s7: Hands cupping light, particles with labels ("thích", "ghét", "mơ ước", "sợ hãi") matches "giấu đi nhiều phần của chính mình". ✓
  - s8: Two figures approach, stop distinct (don't merge) matches "điều chỉnh từ cả hai ≠ xóa mình". ✓
  - s9: Expanding glow, centered character matches "vẫn còn chỗ cho con người thật". 2s ending hold. ✓
- **Text fits frame:** All caption chunks ≤2 lines, above 210px safe zone. On-screen text ≤6 words, adds not repeats.
- **Cover:** Frame 0 = s1 fully visible (Gate D GD-D01). Hook text + delete key visual. ✓
- **Safe zone:** Verified in design-spec.md — all text above 210px, margins 90px horizontal.

### Lens B: Voice Durations/Holds ↔ Pacing + BGM/SFX ↔ Story Beats
**Score: 9/10**
- **Pacing:** 58.9s total within 50-60s target. Holds semantic: s1 question lands (30f), s3 silence named (36f), s5 question holds (30f), s6 core breath (45f), s9 final wish + 2s (60f). Not padding.
- **Voice ↔ Visual sync:** Accent highlights at ±3f of accent words. s6a/s6b gap (0.8s) = breath SFX. s9 "vẫn còn chỗ" pause → expanding glow radius increase.
- **BGM arc:** bgm-main (cool isolation) → bgm-turn (brighter tension at s4 hypervigilance) → bgm-main (warm resolution at s8). Crossfades 1.5s smooth.
- **SFX landing:** All 5 SFX on voice accents (not spoken words): s1 delete key, s5 heartbeat, s6 breath, s7 light shimmer, s9 warm resolve. Levels -18 dBFS, ducked 3dB during voice.
- **Ducking:** 4-6 dB during voice, 150/300ms ramps. s6a-s6b gap allows full release (no pumping).
- **Re-hook at ~18-20s:** Actually at s5/s6 boundary (~32s in timeline) — later than 15-20s target but justified by story arc (hypervigilance build-up needed). Still effective pivot.
- **Highlight beats land together:** s5 heartbeat + question mark build; s6 breath + eye reflection; s7 light shimmer + "giấu đi" + particle labels; s9 warm resolve + expanding glow.

---

## Verdict

**Overall: 9.0/10**
**Gate E threshold: 9/10 → PASS**

No Cao/Trung tickets. Two Thấp items carried forward:
- **E-01 (Thấp):** Re-hook at ~32s (later than 15-20s guideline). Story arc justifies but note for future.
- **E-02 (Thấp):** s7 particle labels (4 labels) — verify FitText min 28px at build (D-01, M-01 related).

---

## Fix List

| ID | Severity | Where | What | Change | Owner | Check |
|---|---|---|---|---|---|---|
| E-01 | Thấp | Timeline pacing | Re-hook at 32s vs 15-20s guideline | Document justification in join-notes.md (hypervigilance arc needs build) | video-director | join-notes.md updated |
| E-02 | Thấp | s7 labels | Particle label legibility | FitText min 28px, or reduce to 4 key labels | scene-agent (build) | style-turn.png labels readable |

---

*Recorded: `pipeline.py review ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu E 9.0 --reviewer integration-reviewer --report docs/ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu/integration-review.md --verdict pass`*