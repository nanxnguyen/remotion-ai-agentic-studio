# Motion Design Lab — research

Research date: 2026-10-18 (Asia/Saigon). Profile: knowledge. Original illustrative demo; no audience-retention or performance claim.

## Primary evidence

| ID | Source | Verified fact and intended use |
| --- | --- | --- |
| R1 | [Official TransitionSeries documentation](https://www.remotion.dev/docs/transitions/transitionseries), read 2026-10-18 | Transitions overlap adjacent visual sequences and reduce their summed duration. Example: 40 + 60 frames with 30-frame overlap gives 70 frames. A transition cannot exceed either adjacent sequence. Supports the production timing constraint, not a spoken claim of automatic timing preservation. |
| R2 | [Official transitions documentation](https://www.remotion.dev/docs/transitions), read 2026-10-18 | fade changes scene opacity; slide moves incoming and outgoing scenes; wipe reveals the next scene over the previous scene. Supports the illustrated vocabulary. |
| O1 | Approved implementation request and this video's original graphic demonstration | Preserve measured voice/caption starts; compensate visual overlap; illustrate a deliberate cut, opacity dissolve, slide and wipe using one moving dot. This is a design requirement to verify later, not an already measured result. |

The demo term “dissolve” means a conventional opacity crossfade implemented by fade(). The current documentation also names a separate dissolve() glowing-burn presentation; that effect is outside this demo. Use only version-matched 4.0.534 APIs verified in installed source.

## Design inferences and preferences

- A single visible dot and path make position/direction discontinuities concrete without needing real footage.
- Maintaining an intentional path while changing the panel can demonstrate continuity. It does not prove every cut is smooth or that every scene should fade.
- Keep narration/captions in independent timeline layers so the visual demonstration can change without shifting their cue points. This is the planned adapter behavior; final evidence must measure it.
- “Mượt hơn” is an invitation to inspect this original example, not a universal aesthetic or retention claim.

## Audience language

Intended viewer: a Vietnamese creator who sees a dot jump at a scene boundary and wants the next edit to feel connected. Working phrases are authored for the demo, not extracted audience quotes: “vừa đổi cảnh đã giật”, “nối tiếp đường cũ”, “đúng nhịp ban đầu”.

## Five hook candidates

1. “Sao chấm này vừa đổi cảnh đã giật?” — chosen: point directly at the continuity failure.
2. “Nhìn chấm này, đừng nhìn nền.” — attention experiment.
3. “Đổi cảnh rồi, sao chấm vẫn chạy liền?” — reveal the intended outcome first.
4. “Một chấm, bốn kiểu chuyển cảnh.” — concise demonstration promise.
5. “Cắt thẳng cũng có thể nối liền.” — challenge a fade-only assumption without making a universal claim.

## Unknowns and exclusions

- Speech durations, ASR fidelity and final mix levels: not measured in this phase; use actual clips before Join.
- Humanlike emotional delivery cannot be certified by ASR or text directions. HoaiMyNeural is a temporary synthetic demo route; rate/pitch alone do not guarantee expressive acting.
- Exactly 36 seconds must include measured speech, deliberate visual demonstration time and the final silent hold. Do not accelerate finished clips to fit.
- No retention uplift, benchmark, brand endorsement, third-party UI or real-world footage is claimed.
