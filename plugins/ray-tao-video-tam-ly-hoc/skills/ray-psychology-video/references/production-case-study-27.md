# Case study: #27 "6 dấu hiệu bạn luôn cố làm hài lòng người khác"

This previous episode establishes a **reproducible baseline and concrete known bugs**, not a cookie-cutter template for future psychology content.

### Confirmed outputs and provenance

- Google Drive canonical folder: https://drive.google.com/drive/folders/1nDkj1nBLkPywi6H5WoS6OrcFwK1Ny78u
- V1 original Remotion REVIEW: https://drive.google.com/file/d/1k6CC97bI0U8zBgEtr1U3FWlVfk9rRdeb/view
- V2 Thanh Mai Pro voice-swap REVIEW: https://drive.google.com/file/d/1w-wUeJO-t2csoiUN7brFoDq8LKg1Vqwe/view
- Voice audition Thanh Mai Pro: https://drive.google.com/file/d/1LWBXMGsffChCqv3MDJfCuRXlau73lux1/view
- Voice audition Thảo Trinh: https://drive.google.com/file/d/1o3eTCYqgdEuBhZKD8zJXKI1rcNYfyk6n/view
- Remotion source repo: `nanxnguyen/remotion-ai-agentic-studio`; prior working branches `feat/psychology-people-pleasing-short-20261028`, `feat/psychology-people-pleasing-v2-20261028`; inspect live files, don't assume branches were merged.
- V1 original genuine Vbee HN Thanh Long GitHub run `40551246372`; selected V2 Vbee Thanh Mai Pro audition workflow run `40560458768`. Actual V2 swap output duration observed 38.144s, 1080×1920/30fps/h264/AAC 48k.

### Lessons

1. When speech changes from ~38s to a new ~43s, don't overlay the full new take at arbitrary scale and declare word sync without new alignment. Re-time visuals/subtitles to the **exact** new MP3; the swap was labeled REVIEW for a reason.
2. Actual V1 showed a visible `08/06` counter, despite six signs. Fix arithmetic and test the end slide; don’t rely on a generic scene counter.
3. Original CTA/button overlapped stick figure feet, and a test speech bubble approached the face. Model safe zones from real motion and render multiple frames.
4. Word captions in V1 were phrase-window estimates from detected silences and lacked independent word-level listening verification.
5. There was previous #11 content on people-pleasing; develop genuinely different mechanisms and illustrations, not 20 more quasi-identical "5 dấu hiệu" Shorts.
6. Technical H264/AAC decode, 1080×1920 and genuine voice provenance are necessary but not sufficient for cinematic QA or YouTube monetization.

### Deliberate differentiators for future episodes

- More acted scene transitions and intentional poses, not slide art.
- Truthful psychology with evidence and actionable takeaway.
- Voice casting per episode, not "all Thanh Mai" or "all Thanh Long".
- Flexible format A/B/C. Consider cause/effect and respectful counterexamples, not universal mind-reading claims.
- Solid production metadata and manual REVIEW vs FINAL process.
