# HANDOFF — thang-may-tang-13

Updated 2026-11-07 (Asia/Ho_Chi_Minh). Branch `feat/thang-may-tang-13` (nothing committed yet).

## State

- research: done (`research.md`, original fiction, duplicate check clear).
- brief / script: in progress — `brief.md`, `script.md`, `shotlist.json` (preflight STRUCTURE OK, 13 scenes, 60.000 s), `voice.proposed.json`, `voice-direction.md`, `voice-performance.proposed.json`. Gate A rounds in `script-review.md`.
- Review board: first draft used code-drawn SVG/vector art; **owner rejected it** ("loại bỏ loại hoạt hình này"). New skill rule NO_CARTOON_ART_V1. Rejected leftovers (deletion was not permitted in-session, remove manually): `docs/thang-may-tang-13/board/make_art.py`, `out/qa/thang-may-tang-13-art/`, `out/qa/thang-may-tang-13-board.png`.
- Art route: 16 photoreal Gemini frames (`frames/p01..p16.png`, NO_CARTOON_ART_V1); 2.5D = camera/parallax/light/particles/crossfades on those photos; text composited in Remotion; limited motion disclosed. Plates exported to `public/images/thang-may-tang-13/` (p04 = top-half crop; p09 altar portrait darkened/unreadable).
- Gate A round 1: 7.7 revise (`script-review.md`). Round 2 fixes applied (all 18 tickets answered in `script.md`), see Gate A line below.

## Owner-requested decision gate (blocking)

The owner asked to review the **script + 16-panel captioned storyboard before voice and render**. Production waits here after Gate A. Next on approval: Phase 3 fork (content-agent, voice-agent+audio-agent via Vbee Batch GitHub Actions, design-agent) → Join → Motion → E → B → build → render → C → QA → Drive delivery.

## Open items

- Re-verify Vbee voiceCode `hn_male_phuthang_stor_24k-stl` is supported by the account package before generation.

## Frame generation progress (2026-11-07)

- Gemini (Browser pane, owner's Google account) frames saved full-size 1536×2752: `frames/p01..p11.png`. p04 came out as a split composition (button + corridor halves); p09 altar portrait darkened to unreadable (fixed); p11 not yet visually checked.
- Remaining: p12–p16. Main chat `gemini.google.com/u/1/app/03e0477e554e34d6` (holds Linh's face from p03) intermittently returns empty responses; a new chat works but loses face reference.
- Gate A: round 1 7.7, round 2 8.3, round 3 8.8 (all revise; reports in `script-review.md`). All round-3 tickets answered in `script.md`; round 4 = 8.9 revise (one Trung row A34, fixed); round 5 dispatched.
