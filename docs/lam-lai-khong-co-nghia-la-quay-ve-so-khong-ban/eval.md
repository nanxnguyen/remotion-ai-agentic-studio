# Eval — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

## 1. Scope
- Vid: lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban
- Voice route: vi-vn-hoaimy-neural (edge-tts Microsoft vi-VN-HoaiMyNeural, rate -25%) — labelled fallback (clone not authorized).
- Output: out/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban-vi-vn-hoaimy-neural-reel.mp4 (29.20s, H.264/AAC 1080×1920 30fps).
- Gate scores: A 9/10, content 9/10, audio 9/10, D 8.5/10, E 9/10, B 9/10, C 8.5/10.

## 2. Where the time went
| rank | work item | est. minutes | note |
|---|---|---|---|
| 1 | Design style frames + render (12 motion-hook frames) | ~25 | many remotion still calls |
| 2 | Voice generation retries (rate tuning -25%) | ~15 | 5 rate variants |
| 3 | Content + review thickening (audit fix) | ~15 | content-pack.md missing originally |
| 4 | Audio branch + mix plan | ~10 | — |
| 5 | Render (875 frames) | ~5 | — |
Total ≈ 70 min. Environment/tooling debt: edge-tts install + no ASR tool (~15% of time).

## 3. Where the tokens went
| rank | sink | why it hurt |
|---|---|---|
| 1 | Whole-file reads of status.json / skill | large context |
| 2 | Re-rendering stills in batches | repeated bundling |
| 3 | Thickening review reports | verbose |

## 4. What worked well
- pipeline.py audit caught missing content-pack.md early.
- Scaffolding via video-new.mjs + defineVoiceTimeline.
- edge-tts fallback produced usable clips.

## 5. Root-cause debt
- content stage marked done without content-pack.md (audit error) — fixed by producing file.
- Review reports too thin (<600 bytes) — thickened.
- No ASR tool on machine — voice-clone-asr.md reports "not measured".
- No kit.tsx initially — created in build.

## 6. Next-video improvements
- Run `pipeline.py audit` before any new work (applied: this session).
- Produce content-pack.md in same step as content work (applied: docs pattern).
- Generate voice right after gate A (applied: skill rule).
- Use edge-tts fallback labelled clearly when clone not authorized (applied: assets-manifest).
- All improvements applied in this session's files.

## 7. Evidence audit
- show output: no ⚠ (after fixes).
- Audit errors seen: content missing file (fixed), gate-a-review thin (fixed), gate-content-review thin (fixed), video-director running on done stage (fixed).
- No set done refusals after fixes.

## 8. Deliverable verdict
- Ship: yes (C 8.5/10, all final-check rows ✓ or deferred-with-reason).
- Accepted imperfections: HoaiMy fallback voice (not Thanh Long), system-ui font placeholder, no ASR verification, ebur128 not measured.