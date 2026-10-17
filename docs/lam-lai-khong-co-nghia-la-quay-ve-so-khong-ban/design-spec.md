# Design spec — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

Profile: story · 9:16 1080×1920 @ 30fps · 39s (1170 frames planned)

## Palette
- bg-dim: linear-gradient slate #1a1f2e → #2a2418 (hook), warming to #2a3020/#1f2a18 (closure)
- accent-warm: #F58B4C (cam) for highlight words; increases subtly via frame-driven opacity
- text-primary: #f5efe6 (off-white) on dark; #ffffff on core-line shot
- text-secondary: #BDBDBD (auxiliary, unused in v1)

## Fonts
- Headline/caption: system-ui (Inter fallback) — Bold/ExtraBold; Vietnamese subset not needed for system font; for final use Google Fonts "Be Vietnam Pro" with `vietnamese` subset.
- Licence: Google Fonts (OFL) — to be confirmed in assets-manifest.md at audio stage.

## Caption component
- Bottom caption: position absolute bottom:224, maxWidth 920, fontSize clamp 52–64, fontWeight 600, lineHeight 1.25, textAlign center, opacity fade-in 0→1 over 20 frames.
- Headline (s1 cover, s4 core): fontSize 56–64, fontWeight 800, centered, accent span #F58B4C.
- No text in bottom 210px (bottom:224 enforced).

## Motion recipe
- Frame-driven only (useCurrentFrame, interpolate). No Date.now/Math.random.
- Fade-in 0→1 over 15–20 frames per shot; subtle zoom 1.00→1.02 over scene duration (max 2%).
- Accent color appears on highlight words only (≤2 per shot).

## Shot-card table (exact demo TSX paths)
| Shot | Key | Frames (est.) | Visual | Card/demo |
|---|---|---|---|---|
| s1 | s1 | 0–180 | subdued interior, rim light low, headline hook | editorial-quote/Reel.tsx (fade reveal) |
| s2 | s2 | 180–450 | same space, rim light increasing, caption | scenesA (caption fade) |
| s3 | s3 | 450–720 | slow zoom, posture straightens, re-hook | scenesA (zoom) |
| s4 | s4 | 720–990 | warmer frame, core headline emphasis | editorial-quote (headline) |
| s5 | s5 | 990–1170 | gentle forward movement, soft glow, closure | scenesA (fade) |

## Style frames (rendered)
- out/qa/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban-style-hook.png (frame 0)
- out/qa/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban-style-turn.png (frame 225)
- out/qa/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban-style-end.png (frame 449)
- out/qa/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban-cover.png (frame 0)
- out/qa/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban-board.png (5 panels)
- out/qa/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban-motion-hook.png (12 frames)

## Notes
- Prototype uses system-ui; final will swap to Be Vietnam Pro with vietnamese subset (C3).
- Timeline frames are estimates (90f/shot); final timeline built from measured voice in Phase 4.