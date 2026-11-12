# Production standards v1 — Quy tắc bắt buộc (2026-10-25)

These requirements are mandatory for **every new video, revision, video review, short video and long-form video** produced via Shorts → Remotion Studio. They override older generic recommendations such as "25/30 fps", "every video is 9:16" and a fixed-length target when those recommendations conflict with this policy. Never claim 100% match from ASR confidence, one contact sheet, or FFmpeg decode alone.

## P1 — Lời thoại × chữ × hình phải khớp 100% (release blocker)

- Before rendering, lock a canonical approved spoken script and generate or receive the real final voice file. Derive duration, phrase boundaries, and word timestamps from **that exact audio asset**, not estimated reading speed or a previous V1/V2 audio.
- Every spoken word must be represented in the timed subtitle transcript in the same order, with correct Vietnamese spelling, punctuation and diacritics. Word-for-word equality is the target (ignore nonverbal breaths and typographic-only punctuation differences); do not paraphrase, truncate or introduce words the voice did not say. Headings, logos, source labels and separate CTAs are allowed only when clearly differentiated from spoken captions.
- Attach each spoken clause to a motivated visual beat whose objects/actions/emotions convey that line. Do not display contradictory, unrelated, or misleading footage; ensure each visible scene begins on or before the appropriate spoken phrase and ends naturally with it. Semantic visual matching requires manual review, not only metadata inspection.
- Highlights are driven by measured/verified word start/end times of the same audio. At 30 fps, target ≤2-frame subtitle entrance/keyword onset drift (~67 ms), at 60 fps ≤3 frames (~50 ms). For critical keywords prefer ≤1 frame after human review. If speech cannot be resolved to this precision, flag the residual mismatch instead of calling it 100%.
- Required QA: automated normalized canonical transcript-vs-caption comparison; real-audio listening pass for every sentence; boundary-frame screenshots and sample movie playback with audio at normal speed; manual visual beat-to-line review. ASR or forced alignment is **a draft timing aid**, not certification. If any test is unavailable, mark REVIEW / NOT VERIFIED, never FINAL or 100%.

## P2 — Không được có khoảng ngừng quá lâu

- Do not stretch video or distribute voice clips to an arbitrary target duration. Timeline length is driven by actual narration + intentional opening/closing beats. Arrange consecutive voice clips into a continuous emotional narration; preserve natural breathing without artificial long silence.
- Normal inter-phrase gaps: ~0.12–0.40 s, contextual longer thought pauses ~0.45–0.60 s. Flag and fix **all silent gaps >0.65 s while narration is expected** unless a deliberate dramatic pause is explicitly recorded in the shot list and audibly/visually justified. Longer deliberate visual/music outros may remain after the final spoken word if requested and purposeful.
- Build VAD or silence-detection reports on the dry voice track and listen for unnatural clipping; trim source leading/trailing silence non-destructively, preserve phrase endings/consonants, avoid speed changes or pitch distortion solely to fill empty time. Duck music under voice, smooth crossfades to prevent pops.

## P3 — FPS mặc định trong khoảng 30–60

- Default composition/export: **30 fps**, with **60 fps** for rapid movement or an explicitly selected 60-fps project. Source clips at other fps must be retimed/converted appropriately; do not silently export 24/25 fps. Target CFR 30 or 60 and verify via ffprobe.
- If the user explicitly requests another frame rate, follow that override only after acknowledging the difference.

## P4 — Chuẩn tỷ lệ theo định dạng

- **Shorts / TikTok / Reels / video ngắn: 9:16**, default **1080×1920**.
- **Long-form / video dài / landscape / YouTube ngang: 16:9**, default **1920×1080**.
- Do not decide aspect ratio based only on runtime, e.g. a 3-minute vertical Short may remain 9:16 when explicitly designated a Short. If the user explicitly requests another aspect ratio, prioritize that request and note the variation.
- Verify aspect ratio and safe zones for video, titles, captions and thumbnails independently on the exported MP4.

## P5 — Ưu tiên font Be Vietnam Pro ExtraBold

- Default titles and speech subtitles use **authentic Be Vietnam Pro ExtraBold, weight 800**, preferably vendored/self-hosted/local font assets with Vietnamese glyph coverage; do not use a CSS label with a different rendered font or faux ExtraBold.
- Check file presence, actual face/weight, Unicode Vietnamese (including multi-mark characters), correct shaping and diacritics; proof with final rendered PNG frames at desktop and ~360×640 mobile simulation.
- When intended headline art deliberately uses another display face, keep Be Vietnam Pro ExtraBold for speech captions unless the user explicitly overrides typography. When font unavailable, disclose fallback and mark typography requirement as unmet; do not claim final compliance.

## Release / QA checklist (must PASS before FINAL)

1. Exact real final voice recognized and measured; no substituted TTS represented as original provider.
2. Entire spoken script matches subtitles word-for-word in correct order; verified by both automated comparison and human listening.
3. All caption start/exit/key highlight events and scene/action cues visibly/audibly in sync within declared frame tolerance. Document timecoded exceptions.
4. No unintentional gaps >0.65 s in expected spoken passage; all longer pauses documented as intentional.
5. CFR 30 or 60 fps; correct 9:16/16:9 format; H.264/yuv420p + AAC 48 kHz stereo where relevant; faststart and full decode PASS.
6. Be Vietnam Pro ExtraBold genuine files applied with Vietnamese glyph validation (or explicit user exception).
7. Output final MP4 inspected at timecoded scene boundaries and a phone-scale view; compare previous approved typography and verify no regressions.
8. If any mandatory gate fails or cannot be validated, deliver a separate **REVIEW** MP4 with precise pending items and preserve the existing final version. Only call it FINAL after all gates pass.
