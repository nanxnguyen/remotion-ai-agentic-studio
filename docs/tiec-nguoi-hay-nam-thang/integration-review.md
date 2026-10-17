# Integration Review — Gate E, Round 3

Verifier: independent integration-reviewer subagent (clean context).
Evidence read directly (no pipeline commands, no rendering):
- `out/qa/tiec-nguoi-hay-nam-thang-c-frame-1171.png` (s8 open, from current verified render)
- `out/qa/tiec-nguoi-hay-nam-thang-c-frame-1400.png` (s8 final hold, from current verified render)
- `docs/tiec-nguoi-hay-nam-thang/script.md`
- `docs/tiec-nguoi-hay-nam-thang/voice.json`
- `docs/tiec-nguoi-hay-nam-thang/content-pack.md`
- `src/videos/tiec-nguoi-hay-nam-thang/timeline.ts`

## Ticket verification

### E-1 — script.md synced to Round-2 voice.json — FIXED
All 8 spoken lines in `script.md` were compared field-by-field against `voice.json`:
s1–s8 are byte-identical (same diacritics, same punctuation, including the colon in s2
"Có người bạn nói với mình: ..." and the question marks in s3/s8). The header correctly
declares Round 2 / Gate A 9.1 as the canonical source. No drift remains.

### E-2 — re-hook timing documented — FIXED
`content-pack.md` §Re-hook now states s5 = `NHỮNG NGÀY GẦN ĐÂY?` at **~21.3–26.3 s =
frames 639–790**. Recomputed independently from `timeline.ts`:
s1–s4 cumulative = 129+171+147+192 = 639 → 639/30 = 21.30 s;
s5 span 151f → ends frame 790 → 790/30 = 26.33 s. Matches the doc exactly.
The section header "~21–26 s" is a consistent rounding of the same values.

### E-3 — s8 motif crossing footer divider — FIXED
Re-extracted frames (not the stale round-1/2 extracts) confirm the raise:
- Frame 1171 (s8 open): fork legs terminate at y≈1490 (left tip) and y≈1420 (right leg);
  calendar bottom edge ≈ y 1550. The faint footer divider sits at y≈1578 with a clear
  gap under the calendar and under the fork's left leg. Footer CTA `BẠN ĐANG TIẾC
  ĐIỀU GÌ?` is fully clear of all motif elements.
- Frame 1400 (s8 final hold): identical geometry — no drift during the closing 60-frame
  hold; motif stays above the divider and off the CTA text.
No motif part crosses or touches the divider; separation is unambiguous in both frames.

## Regression checks

- **Timeline coherence:** recomputed TOTAL_FRAMES from `MEASURED_SECONDS` (ceil ×30) +
  `HOLDS` = 129+171+147+192+151+198+183+251 = **1422 f = 47.40 s**. Matches the stated
  total. s8 carries the mandated 60-frame (2.0 s) closing hold (Gate A ticket A-C7) —
  present in `HOLDS`.
- **Story spine:** s1 hook (5-year/what-left-to-tell) → s2 friend's sunk-cost quote →
  s3 question + silence → s4 memory (the climb, held hands) → s5 re-hook/turn to the
  present blank month → s6 fear of meaninglessness → s7 pages still counted → s8 final
  question (tiếc người hay tiếc năm tháng) + persistent CTA. No dead scene, no mismatch
  between motif and beat. Holds are semantic and documented per shot in the file header.
- **Doc consistency:** content-pack on-screen headlines match script.md captions and the
  rendered frames (`TIẾC NGƯỜI / HAY TIẾC NĂM THÁNG?` visible in both extracts; footer
  CTA persistent). Caption safe-zone rule (above bottom 210 px) respected in the frames.
- **Visual consistency:** frame 1171 vs 1400 differ only by the expected scene
  entrance/hold progression (headline + motif at final position in both). No overlap,
  no clipping, no contrast regression on the grey footer text.

## Open tickets

None. No Cao or Trung severity items remain.

## Score

**9/10 — PASS.** All three prior tickets independently confirmed fixed with fresh
evidence; docs, timeline math, and rendered frames are mutually consistent. Minor
non-blocking nit (not a ticket): content-pack Re-hook heading rounds to "~21–26 s"
while the body carries the exact 21.3–26.3 s; body value is authoritative and correct.
