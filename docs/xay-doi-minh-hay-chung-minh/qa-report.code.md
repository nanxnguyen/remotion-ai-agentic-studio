# QA report (code/determinism/claims) — xay-doi-minh-hay-chung-minh

Verdict: **CONDITIONAL PASS** — ship-blocking: 2 stale-test/format gates. No nondeterminism, no missing media, no unsourced claims.

Scores: determinism 5/5 · claims 5/5 · media 5/5 · timeline 5/5 · repo-gates 2/5.

## 1. Typecheck — PASS
- `npx tsc --noEmit` → exit 0, no output.

## 2. Nondeterminism grep — PASS
- `grep Date.now|Math.random src/videos/xay-doi-minh-hay-chung-minh/` → 3 hits, all comments ("no Math.random / Date.now").
- Code-usage regex `(^|[^/])Date.now\(|Math.random\(` → zero matches. Seeded `hash()` only.

## 3. Determinism stills — PASS (3/3 match)
- `remotion still XayDoiMinhReel` frames 0/1000/1700 × 2 runs:
  - f0 `17a49451…`, f1000 `c91540b5…`, f1700 `4c4e9b42…` — a/b md5 identical per frame.

## 4. Python tests — PASS
- `python3 -m unittest scripts.test_pipeline scripts.test_voice_catalog` → 27 tests OK.

## 5. Timeline — PASS
- Shot sum = 1776f = 59.20s @30fps ✓. Voice clips ffprobe sum = 51.75s (excl. sfx) = timeline comment ✓. Holds 7.45s ✓.

## 6. Registry — CONDITIONAL (stale test, not stale code)
- `xayDoiMinhVideo` registered, `validateVideoRegistry` import-time check passes.
- `tests/core/registry.test.ts` expects 7 comps / `testFrames[-1] == duration-1`; all other videos follow the convention, XDM has 8th entry + `testFrames [0,1000,1700]` (last ≠ 1775). 2 vitest failures.

## 7. Claims — PASS
- On-screen claim inventory vs `content-pack.md` claims table (C1/C2): chip C1 only in s5b (`ScenesC.tsx` CHIP_LINES byte-match, window f18–144 = 0.6–4.8s ✓, absent s6 ✓); `minh hoạ` only s4 ✓; no Manilow 46%/23% or other numerals on screen (rendered-text scan: 34 VN nodes, 0 unmatched) ✓. Props (THẤY CHƯA?, Người xem, 5%, 10 năm trước, 05:00, brick labels) are story callbacks per pack §notes, not claims ✓.

## 8. Captions vs voice.json — PASS (with note)
- `voice.json` = 16 keys ✓. Rendered-text extraction: all 34 VN text nodes are substrings of voice values or pack-approved on-screen text, 0 orphans. Exact 16/16 chunk-join documented in `content-sync.md` (NFC single-space join, diff empty); mechanically re-verifiable from `content-pack.md` table.

## 9. Audio files — PASS (ffprobe, no listen)
- 16/16 voice (`s1,s2a,s2b,s3,s4,s5a1,s5a2,s5b,s6,s7a,s7b,s8,s9a,s9b,s10,s11`) ✓ + `bgm.mp3` (62.7s) ✓ + 8 distinct sfx files across 11 cue rows ✓.

## Tickets
| # | Owner | Acceptance | Severity |
|---|---|---|---|
| T1 | test-owner | `tests/core/registry.test.ts` lists 8 comps incl. XayDoiMinhReel 1776f/30fps/1080×1920; suite green | Blocker (verify gate) |
| T2 | director | XDM `testFrames` last = 1775 (repo convention, all 7 others comply) or test expectation amended; suite green | Blocker (verify gate) |
| T3 | scene-agent | `prettier --write` clean on 7 flagged files (ScenesC/D/E, timeline.ts, +3); `format:check` green, no wording change | Blocker (verify gate) |

*Reran commands only; no source edits. Evidence: md5s §3, ffprobe §9, grep §2/§7.*

## Round 2 (new reviewer re-verification, 2026-10-16)

Verdict: **PASS** — all 3 Round 1 blockers (T1/T2/T3) resolved. No source edits made this round.

- T1 registry: `tests/core/registry.test.ts` now expects 8 comps incl. `{XayDoiMinhReel, 1776, 30fps, 1080×1920}`; `npx vitest run tests/core/registry.test.ts` → 2/2 passed.
- T2 testFrames: `index.ts` → `[0, 1000, 1775]`, last = 1775 = 1776−1 ✓ (convention gate inside suite, green).
- T3 format: `npx prettier --check` on `src/videos/xay-doi-minh-hay-chung-minh/**` + `tests/core/registry.test.ts` → all clean, exit 0.
- Typecheck: `npx tsc --noEmit` → exit 0.
- Determinism spot-check: `remotion still XayDoiMinhReel --frame=1393` × 2 runs → md5 `5f84b910dd1e675797c633a5fee819c8` identical.
