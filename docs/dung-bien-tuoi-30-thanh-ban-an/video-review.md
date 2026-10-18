# Gate C — independent visual review

Video: `dung-bien-tuoi-30-thanh-ban-an`  
Reviewer: clean-context visual reviewer  
Date: 2026-10-18  
Scope: review-only; no source, status, or pipeline changes

## Evidence reviewed

- Final MP4: `out/dung-bien-tuoi-30-thanh-ban-an-trung-kien-nang-cao-reel.mp4`
- Contract observed from the final MP4: H.264/AAC, 1080×1920, 30fps, 51.633333s.
- `docs/dung-bien-tuoi-30-thanh-ban-an/brief.md`
- `docs/dung-bien-tuoi-30-thanh-ban-an/design-spec.md`
- `docs/dung-bien-tuoi-30-thanh-ban-an/design-review.md`
- `docs/dung-bien-tuoi-30-thanh-ban-an/render-evidence.md`
- `docs/dung-bien-tuoi-30-thanh-ban-an/final-check.md`
- 48 current QA stills under `out/qa/`, three stills for each of the 16 shot keys.
- Cover: `out/qa/dung-bien-tuoi-30-thanh-ban-an-cover.png`.
- Frame samples extracted directly from the final MP4 around every shot boundary to inspect transitions.

## Score

| Criterion | Score | Finding |
|---|---:|---|
| Visual content | **8.0/10** | Every key beat has a concrete visual: ruler, red verdict marks, Tết tray/questions, freeze/re-hook, macro mark, phone/feed, salary routes, clearing paper, self-question, and closing ruler. No persistent placeholder or TODO state found. |
| Composition and hierarchy | 8.2/10 | The paper plane, graphite figure, ruler and caption pill create a consistent hierarchy. The sparse scenes use negative space intentionally; s4/s8/s10 retain a clear focal point. |
| Phone legibility | 7.8/10 | Main captions and required Vietnamese diacritics remain readable at portrait-phone scale. Small ruler labels and some in-scene annotations are secondary and become difficult at thumbnail size, but they do not carry the primary spoken message. |
| Motion transitions | 7.8/10 | Boundary samples show coherent state changes: ruler/list, list→feast, feast→questions, freeze→re-hook, macro→feed, phone blackout→statement, statement→clearing, and question→closing card. The visual language is smooth and deterministic. Some short caption-pill fade states are intentionally empty during entry/exit and could momentarily resemble a blank card when paused. |
| Paper/graphite identity | 8.8/10 | Graph paper, graphite character/props, red measurement marks and yellow self-authored agency are consistently maintained from cover to close. The treatment is recognizably distinct from the cited prior videos. |
| Safe zone | 8.7/10 | Primary captions, headline and closing title stay above the bottom danger region. No cropped required text or edge collision observed in the 48 stills. |
| Cover | 8.8/10 | Hook is immediately legible: “Tuổi ba mươi, bị coi như một bản án.” The circled 30/ruler and lower-left character establish the metaphor without competing elements. |
| Placeholder check | 8.5/10 | No persistent empty scene, debug label, missing asset, or unfinished visual block found. Blank caption pills at a few transition frames are transient animation states, not missing-content panels. |

**Overall: 8.2/10**  
**Visual content: 8.0/10**  
**Verdict: PASS**

## Open visual tickets

- **Thấp — C-VIS-001:** s3a ruler annotations are intentionally small and are not reliably readable at a paused phone thumbnail. Keep them as supporting texture; do not rely on them as the sole carrier of spoken meaning.
- **Thấp — C-VIS-002:** a few transition samples show a blank caption pill while the next caption fades in (notably around s4a/s5b). This is visually coherent in motion and is not a placeholder, but a future polish pass could shorten the empty interval.

No open visual Cao/Trung ticket. The Gate B and Gate E accepted risks, including the five carried voice-articulation risks, are acknowledged but are outside this visual-only verdict and do not change the visual content score.

## Gate C Round 1 — audio and alignment lenses

The independent audio lens scored **6.8/10 — REVISE**. The final MP4 loudness (`-14.7 LUFS`), peak (`-1.9 dBFS`), format and SFX clearance passed, but direct MP4 ASR still surfaced wording risks and the absolute silence after ending foley was only about `0.6s`. The alignment lens scored **7.6/10 — REVISE** with visual content `8.2/10`: ranges, s1 lead-in, s8 boundaries, s3a cue and closing card matched, but the five voice risks remained a Cao blocker. The s10 paper-wind cue was shortened from `48f` to `24f` and the final render was regenerated for Round 2.

## Reviewer conclusion

The final MP4 is visually usable and clears the Gate C visual threshold. It preserves the intended paper/graphite identity, presents all 16 planned visual beats, remains phone-readable for the primary text, and has no persistent placeholders. The only remaining visual polish is minor: supporting ruler text at small size and brief blank caption-pill transition states.

## Gate C Round 2 — after ending-tail fix

- Visual lens: **8.2/10 PASS**, visual content `8.1/10`; no Cao/Trung visual ticket.
- Audio lens: **7.4/10 REVISE**. The shortened s10 foley now ends near `50.17s`, leaving about `1.4s` below the silence threshold; loudness and peak remain within target. Five clone wording risks remain open.
- Alignment lens: **7.6/10 REVISE**, visual content `8.2/10`. All 16 ranges, s1/s8 contracts, s3a cue, s10 cue `[1481,1505)` and BGM tail match the current source. The remaining blocker is canonical spoken wording; the old 1553-frame join table is now explicitly historical and the current 1549-frame ranges are listed above.

Gate C therefore remains **REVISE** on the audio/alignment lenses. No clean C pass is claimed.
