# Ray Psychology #28 — Doomscrolling

- Original Vietnamese explainer, no copied reference audio/video, user-requested new psychology topic.
- 8 scenes, SVG stickman with action-specific phone/news/timer/sleep visuals, native Remotion source in `entry.tsx`.
- `vbee-script.txt` is canonical narration, synthesized by a protected GitHub Actions workflow using real Vbee `hn_male_minhquan_yt_24k-pre` (must verify the actual output).
- `prepare_audio.py` derives acoustic silence-based scene boundaries and an original generated WAV score; missing proof blocks release.
- `timing.json` and real Vbee MP3 created in Actions, not fabricated/committed.
- Phrase caption boundaries are estimates, NOT word-level alignment; label video REVIEW until manual verification.
- Render command inside source repo: `npx remotion render docs/ray-psychology-doomscrolling/entry.tsx RayDoomscrollingExplained output/doom.mp4 --codec h264 --crf 18 --concurrency 2` after generating `public/` audio/fonts/timing.
- User requested 1–4s original hook and distinctly educational psychological content. If actual synthesized hook is longer, workflow must fail instead of claiming compliance.
- Sources: Cleveland Clinic Aug 2026 and Sept 2026 Frontiers systematic review, DOI listed in `sources-and-safety.md`.
- New Drive folder #28 holds all outputs, never overwrite #27.
