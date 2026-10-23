# Short 01 V3 — cinematic emotional story (28 shots)

## Creative intent
**Thesis:** Missing someone can conceal longing for the version of yourself you used to be. The resolution restores agency without invalidating grief. The intended emotional trajectory is curious → warm → lonely → recognition → compassion → hope.

**Core hook (first 2 seconds):** “Bạn tưởng mình còn yêu họ...” Over the mirror and phone imagery, create an unresolved question — never promise a psychological diagnosis.

**Key insight (approximately 22–27 seconds):** “Đau nhất không phải vì họ quên bạn... Mà vì bạn cũng quên mất... mình từng rạng rỡ đến thế.”

**Verbatim ending:** “Bạn không cần họ quay lại để tìm lại phiên bản từng rạng rỡ ấy.”

## Specs
- 9:16, 1080×1920, 24fps, 970 frames (~40.4167 seconds).
- 28 explicitly authored storyboards in `story.json`, with distinct text and purposeful props/motifs, gentle frame-driven camera movement, 9-frame dissolves, and character breathing.
- Text has narrative hierarchy: chapter label, large hand-paced hook/beat, short lower-third complement, restrained amber emphasis. Important text avoids extreme top/bottom Shorts UI boundaries.
- Female/male characters are not photorealistic or visually identifiable; original stick-figure design only.
- Vbee male Thanh Long generated via authenticated Batch TTS using 8 differently punctuated/scripted emotional beats; post-mix gain shaping and preserved natural timing. **Vbee's Batch API does not guarantee instruction-level emotion control**. Confirm subjective timbre by listening after render.
- Original adaptive piano generated from notes in `render_cinematic.py`; minor-key memory/tension, then warmer C-major resolution. Dynamic sidechain ducking under speech.
- Use `mix_and_qa.py --smoke` to verify the audio filter before consuming Vbee TTS requests.
- MP4 source location: `docs/short-01-nho-phien-ban-duoc-yeu/final/short01-v3-28-scenes-cinematic-vbee.mp4`. Final render is not asserted ready until GitHub Actions succeeds.
- Contact sheet: `v3/contact-sheet.jpg`; QA document: `final/V3-QA.json`.

## Retention-oriented editorial checks (hypotheses, not validated outcomes)
- 0–2 seconds: understandable emotional contradiction, no blank frame and no long channel intro.
- 2–11 seconds: emotionally legible micro-details (phone, message, smile, shared place).
- 11–21 seconds: loss; visually contrasting empty spaces; do not use loud or flashy transitions as substitutes for clarity.
- 21–32 seconds: emotional reveal and cognitive reframing; captions emphasize *mình* rather than an ex-partner.
- 32–40.4 seconds: concrete, gentle self-directed action, then held final reassurance.
- Avoid repeating the exact visual shot solely to meet a shot-count target.
- If YouTube is later published manually, review Studio **Stayed to watch**, **Average view duration**, **Average percentage viewed**, audience retention by second, shares, and comments. Iterate from measured data, not a fabricated viral score.

## Publishing / consent
- Automatic YouTube publishing: **not authorized**.
- Uploading a video to vidIQ media library, where connector is enabled, does not publish it to YouTube.
- Do not publish expiring signed URLs or TTS API credentials.
- Final speech audibility/stream presence and duration checks are technical only; independent human listening and aesthetic judgement have not been completed.
