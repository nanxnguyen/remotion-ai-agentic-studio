# Short #01 — Bạn nhớ họ, hay nhớ phiên bản mình khi được họ yêu?

## Editorial brief
A 26.42-second, 1080×1920, 24fps, 17-shot original stick-figure visual narrative. White outlines on near-black, subtle warm amber visual motif. The protagonist first feels dependent on an old relationship for joy, then rediscovers agency in small self-directed acts (flower, café, smile). Format is deliberately shorter than the 35–45s baseline for Shorts testing; no guarantee of reach/views.

YouTube's own Shorts Search & Discovery guidance identifies percentage choosing to view versus swiping, average view duration, average percentage viewed, and satisfaction signals. No fabricated viral score or guaranteed view threshold. Source: https://support.google.com/youtube/answer/11914225

## Voice production
- **Original user hook (exact):** “Có thể người bạn nhớ nhất không phải là họ, mà là chính mình của những ngày còn được yêu.”
- **Original user ending (exact):** “Bạn không cần họ quay lại để tìm lại phiên bản từng rạng rỡ ấy.”
- HeyGen voice: Paul – Soothing, voice ID `046dacc3502347eea0c796f97399632e`.
- Recorded narration: ~13.087s of condensed empathetic story, time-spaced across four voice beats (~0s, 8s, 16s, 21.4s). The spoken ending is preserved exactly, final scene carries a shorter visual echo.
- Total intended picture: ~26.42s; 17 narrative shots and original piano (A minor transitioning into warmer C). The voice quota was insufficient for the longer initial 47s draft; no robotic substitute used.

## Actual spoken narration
Có thể người bạn nhớ nhất không phải là họ, mà là chính mình của những ngày còn được yêu. Bạn không muốn quay lại… bạn chỉ nhớ nụ cười ngày ấy. Nhưng nụ cười đó vốn là của bạn. Bạn không cần họ quay lại để tìm lại phiên bản từng rạng rỡ ấy.

## Production provenance
- HeyGen original visual-plus-piano asset: `df4918c0b5464fe28fb8e28dc8ef2c6f` (no voice).
- HeyGen narration asset: `id=93f3c68e-30b1-40d7-ac75-bcb898535a55.wav`.
- `.github/workflows/archive-short01.yml` downloads original ingredients, places four speech beats at story transitions, mixes piano and voice, validates 4 audio windows, stores `final/short01-full-voice-piano.mp4`, SHA256 and **auto-commits** to this branch.
- Technical validation != human listening: manually listen to the completed MP4, inspect transitions and verify speech punctuation before approving PR / publication.
- Publishing to YouTube is **not authorized** and will not be performed.

## Delivery
Prefer verified FULL MP4 attached from this branch and imported into vidIQ. Use `vidiq_video_upload` and store durable `uploadId`; refresh expiring vidIQ media URLs via `vidiq_video_upload({uploadId})` when requested.
