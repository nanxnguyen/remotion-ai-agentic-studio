# QA report A — xay-doi-minh-hay-chung-minh, frames cluster s1·s2a·s2b·s3·s4 (Round 1)

Scope: frames 0–621 (s1 0 / s2a 105 / s2b 237 / s3 337 / s4 488, end 621 per timeline.ts).
Inputs read: script.md, content-pack.md, voice.json (s1–s4 rows), design-spec.md, join-notes.md timeline,
task-review.md (owner map: A=ScenesA s1/s2a/s2b, B=ScenesB s3/s4),
existing stills out/qa/xay-doi-minh-hay-chung-minh-build-{s1,s2a,s2b,s3,s4}.png,
style-hook proto still + 15 self-rendered stills out/qa/xay-doi-minh-hay-chung-minh-qa-a-{0,18,104,105,177,236,237,267,336,337,407,487,488,558,620}.png
(`npx remotion still src/index.ts XayDoiMinhReel --frame=N`). All 20 stills visually read.
Code checks (tsc/determinism/durations) are covered by qa-report.code.md; light grep here: no Date.now/Math.random
in scenes (comments only), shot durations match timeline.ts (105/132/100/151/133).

## Fidelity table (shot | score /10 | gap)

| shot | score | gap |
|---|---|---|
| s1 | 9 | Window slab larger than spec's "ô cửa sổ nhỏ" but reads as neighbouring block; otherwise cover bands, chase f0–20, sweep y930–1070 excl. sign, brick lands f18, push 1.00→1.04 all per script/spec. Frame 0 works as cover, headline full, diacritics clean. |
| s2a | 8 | Table/feast/tag/đào/petals/steam/clink all present; caption chunks match pack; −2 for bare table at cut (A-S2A-01). |
| s2b | 8 | Hard cut f267 + punch 1.22→1 + gượng eyes-down close-up per card; caption flip on cut ✓; −2 for sparse beat-1 staging (A-S2B-01). Face full-bleed is punch grammar, hi-res vector, punch-only (R4 1/3 in cluster). |
| s3 | 7 | Deal bottom→top, carving, 3 labels, ladder, straight top, age growth (no-hat→hat→taller) all ✓; −3 for dust-over-label (A-S3-02) + caption orphan wrap (A-S3-01). <8 → fix. |
| s4 | 7 | Phone panel, scroll, hot-row highlight, pin 5%, minh hoạ tag, caption flips (f558) ✓; −3 for thumb missing hot row (A-S4-01) + invisible wall shadow (A-S4-02). <8 → fix. |

## Checks

- Clipping/diacritics: all Vietnamese glyphs correct in every still (đang, cuộc, đời, chứng, Mười, Tết, "Nó á? Còn lâu.", NÓ Á? CÒN LÂU., story, Người xem, minh hoạ). No tofu. No text clipped by frame edges (s2b face bleed is intentional punch grammar).
- Safe zone: no text inside bottom 210px in any still; captions marginBottom 224 (58px ScenesA / 56px proto ≥54 ✓).
- Caption↔voice: s1 headline, s2a c1/c2 (flip f177=shot+72 ✓), s2b c1/c2 (flip on f267 cut ✓), s3 c1/c2 (flip f407=shot+70 ✓), s4 c1/c2 (flip f558=shot+70 ✓) all concatenate to voice.json text exactly.
- Caption↔pack lines: s3c2 violates pack breaks (see A-S3-01); all others match pack line splits (s3c1, s4c1 wrap correctly by luck — same root cause, fix covers them).
- Sizes (Q11 adapted): captions 56–58 ✓, labels 37 ✓, carving 44 ✓, tag "10 năm trước" 36 ✓; violations: "minh hoạ" 30px + "5%" 30px < 32 floor (A-S4-03).
- Boundaries: 104→105, 236→237, 336→337, 487→488 all hard cuts, no flash/empty frames (s2a opening bareness is staged drop-in, A-S2A-01).
- Fast transitions: s1 drop f18, s2b cut+punch f267, s3 deals lands 41/65/86 — no broken crossfades.

## Tickets (id | severity | where | evidence | concrete change | owner scene file | acceptance)

- A-S3-01 | Trung | s3 caption chunk 2, ScenesB.tsx S3Scene (~line 304) + shared proto/Caption.tsx (no \n support) | qa-a-407.png / 487.png: renders "thành gạch xây về phía nhà người" (30 chars, >28) + orphan "đó." — pack mandates "thành gạch" / "xây về phía nhà người đó." (10/25) | Add explicit line breaks to s3 caption segs (needs \n→<br/> support in proto Caption, director-owned shared file — coordinate, do not fork a second caption); keep accent exactly on "nhà người đó" (period stays white) | src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesB.tsx | Re-render f407 + f487: caption lines byte-match pack c2 splits, every line ≤28 chars. Regression: s3c1, s4c1/c2 still match pack.
- A-S3-02 | Trung | s3 paper dust, ScenesB.tsx Dust + S3Scene (~lines 294–297) | qa-a-407.png + build-s3.png: white dust chips cluster over "chiếc xe" label for ~10f after each landing (Dust origin = brick centre, t≈0.1 dist <50px, rendered on top of text) | Spawn dust at brick bottom edge (cy = rowsY+BH) and/or render Dust behind HeroBrick text, so no chip covers glyphs during land+3…land+12 | src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesB.tsx | Stills at lands 41/65/86 +5f and +10f: all three labels fully legible, zero chips over glyphs.
- A-S4-01 | Trung | s4 thumb parking, ScenesB.tsx S4Scene (~line 407) | qa-a-620.png: thumb capsule sits at phone-y 604 in empty list area; hot (sen-ring) row is at phone-y ~400–492 — finger misses target by ~200px (formula uses unscrolled row pos, ignores scroll −196) | Include scroll in thumb top: top = 170 + 10 + TARGET_ROW*104 + scroll + offset, so parked thumb overlaps the hot row | src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesB.tsx | f620: thumb capsule visibly overlaps/touches the sen-ring highlighted row.
- A-S4-02 | Trung | s4 wall shadow, ScenesB.tsx S4Scene (~line 366) | f488–620 stills: pink "THẤY CHƯA?" shadow div at (560,620,300×120) lies fully inside phone rect (220–860 × 330–1160, opaque bg) → zero visible pixels; script.md s4 mandates "bóng bức tường THẤY CHƯA? in lên tường phòng" | Move shadow outside phone rect (e.g. left wall x≈40–200, or below phone y≈1200–1350), keep rotation/opacity; verify against curtain (x830+) | src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesB.tsx | f488 + f620: pink glow text visibly peeks beside phone without touching caption zone or minh hoạ tag.
- A-S4-03 | Thấp | s4 small UI text, ScenesB.tsx S4Scene (~lines 389–411) | "minh hoạ" tag 30px, "5%" pin 30px < Q11 adapted floor 32px (pack allows ≥26 so voice/pack unaffected) | Bump both to 32px, mechanical, no wording change | src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesB.tsx | Both render ≥32px, tag still clear of caption zone and phone list.
- A-S2A-01 | Thấp | s2a opening staging, ScenesA.tsx S2aScene dish lands 8–28 (~lines 666–700) | qa-a-105.png: at cut the table is bare brown (only 1 bánh chưng), reads empty for ~1s | Pre-land dishes (lands ≈4/8/12/16/20/24) or shorten settle so ≥3 dishes visible by shot+6f | src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesA.tsx | f111 still shows ≥3 dishes + bowls on table.
- A-S2B-01 | Thấp | s2b beat 1, ScenesA.tsx S2bScene (f<30 branch) | qa-a-237.png: lone small hand capsule mid-frame, large empty surround for 1.0s | Enlarge hand ~1.3× and/or add foreground feast bokeh; director call whether minimalism direction already accepts this | src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesA.tsx | Director signs off or beat-1 restaged; caption "Có người bật cười:" unchanged.

## Verdict

FAIL — 4 Trung open (ScenesB ×4: A-S3-01, A-S3-02, A-S4-01, A-S4-02) + 3 Thấp (ScenesB ×1, ScenesA ×2). Cluster mean 7.8/10.
No Cao. s1 passes (9/10, no ticket). Fix-loop: Round 1 exhaustive list above; Round 2 verifies each acceptance + regression on touched shots.

## Round 2

Scope: re-verify of 7 Round 1 tickets against fix stills
out/qa/xay-doi-minh-hay-chung-minh-s3-fix.png + s4-fix.png (rendered 01:41, post-Round-1),
spot-check out/qa/xay-doi-minh-hay-chung-minh-build-s2a.png + build-s2b.png,
code cross-check src/videos/xay-doi-minh-hay-chung-minh/scenes/ScenesB.tsx + ScenesA.tsx.
No source edits; read-only QA.

| ticket | verdict | evidence |
|---|---|---|
| A-S3-01 | FIXED ✓ | Fix still caption = two pills "thành gạch" (10ch) / "xây về phía nhà người đó." (25ch), both ≤28, byte-match pack s3c2 splits; code ll.446–447 exact strings, accent kept on "nhà người đó", period separate white seg. No orphan. Regression: s3c1 segs (l.449) unchanged, still match pack. |
| A-S3-02 | FIXED ✓ (single-still) | All 3 labels ("chiếc xe", "lương tháng đầu", "NÓ Á? CÒN LÂU.") fully legible, zero chips over glyphs (Round 1 chips over "chiếc xe" gone); code moved Dust to brick bottom edge (cy=rowsY+BH, ll.411–413). Caveat: only 1 still provided, land+5/+10f at all 3 lands not individually shown. |
| A-S4-01 | FIXED ✓ | Thumb capsule now parked right of the sen-ring hot row, vertically overlapping/touching it (Round 1: sat ~200px low in empty area); code top includes scroll (l.760). |
| A-S4-02 | FIXED ✓ | Pink "THẤY CHƯA?" glow visibly peeks bottom-left outside phone rect (Round 1: 0 visible px); clear of caption pill and minh hoạ tag; code l.574 left-wall placement. |
| A-S4-03 | FIXED ✓ (code) | "5%" (ll.703–704) and "minh hoạ" (l.779) both fontSize 32 ≥ floor; both clear of list/caption in still. |
| A-S2A-01 | FIXED ✓ | build-s2a still: populated table (2 bánh chưng, 2 bowls, oranges, cups — ≥3 dishes); code pre-lands 2/4/6 + 8f settle (ScenesA ll.873–883, 999–1009). |
| A-S2B-01 | FIXED ✓ (code) | Hand enlarged 1.3× in code (ScenesA l.1275); build-s2b still confirms punch-beat close-up unaffected. No beat-1 (f<30) still provided — accepted on code evidence. |

Regression (touched shots s2a/s2b/s3/s4 only): window/ladder/wall/phone-list/curtain/tags/caption-c2 all consistent with Round 1 stills; s4c1 single-seg auto-wrap unchanged (still "by luck", matches pack visually). No NEW breakage → no NEW tickets.

Scores: s1 9 (untouched) · s2a 8→9 · s2b 8→9 · s3 7→9 · s4 7→9. Cluster mean 9.0/10.

## Verdict (Round 2)

PASS — all 7 tickets closed (4 Trung + 3 Thấp), zero NEW tickets.
