# HANDOFF — lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban

## Stage/gate table (pipeline.py show)
All stages done: research, brief, script, content, voice, design, build, audio, qa, render. Gates: A 9, content 9, audio 9, D 8.5, E 9, B 9, C 8.5. check: ready. audit: ok.

## Locked decisions
- Topic: "Làm lại không có nghĩa là quay về số không" (motivational, story profile).
- Voice route: labelled fallback edge-tts vi-VN-HoaiMyNeural (clone not authorized). Slug vi-vn-hoaimy-neural.
- Palette: slate→amber, accent #F58B4C, text #f5efe6.
- Output: out/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban-vi-vn-hoaimy-neural-reel.mp4 (29.2s).

## Files (src)
- src/videos/lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban/: index.ts, Reel.tsx, timeline.ts, voice-durations.ts, kit.tsx, scenes/Scene01-05.tsx. Registered in registry.ts.

## Next steps
- Optional human listen (pipeline.py listen) — not required.
- Apply workflow fixes from eval.md if any (already applied in this session).
- Do not publish without owner request.

## Warnings / open tickets
- ASR not measured (no tool); ebur128 not measured; font placeholder (system-ui→Be Vietnam Pro). All accepted (Thấp).