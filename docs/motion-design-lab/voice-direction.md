# Motion Design Lab — voice direction

Date: 2026-10-18. Profile: knowledge. Canonical text: `voice.proposed.json` until the director copies an accepted proposal to `voice.json`.

## Listener and performance idea

- Address one Vietnamese creator who has noticed a small visual jump but may not know why it feels wrong.
- Sound like a creator showing a useful experiment at their desk: curious at the problem, increasingly certain through the demonstrations, then warm and inviting at the close.
- Keep the energy brisk without flattening every phrase to one speed. Questions lift naturally; explanations move forward; observable results and timing words receive a short measured landing.
- Avoid announcer cadence, exaggerated acting, whispering and forced sentiment. The emotional movement is small frustration → satisfying control → invitation.
- Directions in this file are metadata only. They must never enter narration, captions or ASR target text.

## Local voice route and benchmark

- Engine baseline: local VieNeu-TTS 3.8.3, ONNX/CPU. Use one voice consistently across s1–s5.
- Read-only purchased source catalog: `vietnamese-voice-samples/previews/`. Never alter or upload the catalog files.
- Initial candidates: `Anh-Khoi-Ke-Chuyen.mp3`, `Thanh-Long-Nang-Cao.mp3`, `Ngoc-Huyen.mp3`.
- Render the same original 71-syllable benchmark through all three references. At the 4.1 syllables/s planning rate it is approximately 17.32 seconds; actual duration must be measured:

  > Bạn có thấy chấm nhỏ này vừa đổi cảnh đã khựng lại không? Mình đang giữ nguyên đường đi của nó, rồi thay từng lớp nền phía sau. Lúc đầu chấm bật ngược nên mắt mình bị kéo khỏi câu chuyện. Sau khi nối lại đúng hướng, chuyển động trôi liền hơn, và mình có thể tập trung vào điều thật sự muốn kể. Cảm giác ấy nhẹ đi rõ rệt.

- Compare canonical-text accuracy, Vietnamese tones, phrase-boundary silence, duration, loudness, clipping and cross-phrase consistency. Without an actual listening record, naturalness and emotional credibility are `not verified by listening`; metadata and ASR cannot rank them as human-like.
- Select a clean 6–8 second crop from the benchmark winner for production. Record the selected path, crop range and seed in the generated `voice-performance.json`/`voice-report.md`; until then the selection is explicitly pending.

## Control boundaries

- Verified route inputs are reference audio, candidate seed and `denoise: false`.
- Pace and emotion below are selection criteria for the reference/candidate delivery. They are not direct engine parameters.
- Do not request rate, pitch, volume or style controls; do not use `atempo` or pitch shifting to create expression.
- Phrase gaps are explicit post-synthesis silence during assembly. Shot-level visual tails and the final hold are timeline gaps after the completed clip.
- Experimental inline cues such as `[cười]`, `[thở dài]` and `[hắng giọng]` remain disabled until a separate benchmark proves that they are rendered as intended and do not leak into narration or captions.

## Shot direction

| Shot / slot  | Listener intent and emotion                                                                                                      | Emphasis                                   | Tempo and explicit phrase gap                                                                                                | Breath / line ending                                                                                        | Timeline hold after clip                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| s1 · 0–7 s   | Point out the problem, then invite the viewer to inspect the path; curious with a small real surprise, settling into confidence. | `giật`, `đường đi`                         | Brisk question; 0.16 s assembly gap after the question; slightly gentler invitation; firm final `đổi nền`.                   | One light reset in the explicit gap; question rises, explanation ends level and assured.                    | Use only the measured remainder of the 7 s slot for the visible repair; no cue shift.                            |
| s2 · 7–15 s  | Reassure through two observable rules: the dot continues, the panels blend, the caption stays crisp.                             | `đi tiếp`, `tan vào nhau`, `vẫn rõ`        | Quick first sentence; 0.10 s gap; ease through the blend explanation; 0.12 s gap; slow slightly for the crisp-text contrast. | Keep the middle flowing, then land `không tan theo` cleanly with a low falling finish.                      | Use the measured remainder for the dissolve preview/boundary demonstration.                                      |
| s3 · 15–22 s | Reset attention with a new question, then solve the harder moving-panel case; inquisitive → confident → satisfied.               | `cả khung`, `một hướng`, `không bật ngược` | Brisk re-hook; 0.12 s gap; confident explanation; 0.08 s gap; slow the observable result without stretching audio.           | Question rises; final `nữa` falls softly after a precise emphasis on `không bật ngược`.                     | Slot is tightest; if measured speech plus gaps cannot fit, shorten text and rerun Gate A rather than accelerate. |
| s4 · 22–30 s | Make the wipe tactile, then reassure that voice and captions keep their original cues; light playfulness → precise proof.        | `tấm rèm`, `đúng nhịp ban đầu`             | Brisk curtain image; 0.12 s gap; measured second sentence with a firmer landing on `đúng nhịp`.                              | Tiny natural reset in the explicit gap; soften `ban đầu` after the accent.                                  | Preserve a visible post-line timing demonstration before s5; actual duration determines the remainder.           |
| s5 · 30–36 s | Invite one viewer to try the test; warm, relaxed and curious rather than promotional.                                            | `bạn thử`, `một chấm`, `bị giật`           | Conversational first sentence; 0.14 s gap; slightly slower final question.                                                   | Keep the first ending open and friendly; finish the last question with a gentle fall, then stop completely. | Reserve at least 1.0 s / 30 frames of true timeline silence after the clip.                                      |

## Acceptance handoff

- Each shot's phrase text in `voice-performance.proposed.json`, joined with one ASCII space, equals the corresponding `voice.proposed.json` value exactly.
- Generate one initial candidate per phrase. A failed phrase or keyword may be regenerated up to three total candidates; never regenerate a passing full set by default.
- Every selected phrase must pass the configured CER/ASR check even when its seed is pinned. Report supported controls actually used and all limitations.
- Measure the assembled clip including phrase gaps. Do not move starts `0/210/450/660/900`, do not exceed frame `1080`, and do not speed up audio to fit.
