# V3 repair — 92s Healing Monologue (not a 6:30 podcast)

## What the user approved
- Keep the original ~92 seconds, horizontal 16:9.
- Replace static AI contact-sheet video with **genuinely moving real-world footage**.
- Retain Vietnamese healing monologue, performed in Vbee Thanh Long.
- Strong cinematic audio/typography, smooth transitions, real 60fps source clips when available.

## Existing file audit
- Submitted preview verified as 92.0s, 1920×1080, 30fps, with audio.
- Prior preview uses multiple still images with pans/zooms and contains visible storyboard-style labels in frames.
- Do not stretch to 390 seconds; do not present stock extras as the same actress Linh.

## Chosen approach
A **real-life montage**: 18 time-coded live-action stock shots depicting relatable office/quiet-living moments. Keep the story in second-person, so different stock performers are editorial vignettes, not one character. Stock asset provenance and native fps tracked individually in `source-inventory.json`.

## Acceptance / fail gates
1. No still-image contact sheets in the final picture.
2. Footage must contain actual observable actor/object motion.
3. 92.0s ±0.3, 1920×1080, H.264/AAC.
4. 60fps container is acceptable but **never claim 60fps native across all shots**; report source fps distribution and repeated-frame fraction.
5. Exact **Be Vietnam Pro** loaded from font source and Vietnamese glyphs present.
6. Real Vbee synthesis with account credentials, voice duration measured, narration and actions aligned at major beats.
7. Audio music stays under narration, and no ending phrase is clipped.
8. Read QA JSON, inspect contact sheet, listen to the hook/midpoint/end before calling FINAL.
9. The rendered video is **PREVIEW** until a human aesthetic review confirms it. Never overwrite the previous Google Drive copy silently.

## Licensing and ethics
The storyboard does not imply stock performers actually experienced psychological conditions. Portray an everyday experience without medical labels; do not imply endorsement of a service or product. All Pexels source links and videographer credits in `manifest.json`. Pexels license: https://www.pexels.com/license/.

## Actual output status
- Implementation and workflow submitted; run https://github.com/nanxnguyen/remotion-ai-agentic-studio/actions/runs/40127474482
- MP4 file only exists once pipeline completes and QA verifies it. User sees original file unchanged until that check.
