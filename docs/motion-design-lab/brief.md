# Motion Design Lab — production brief

## Intake (2026-10-18)

- Topic: a visual demonstration of continuous, frame-driven motion across cut, dissolve, slide and wipe without moving narration or captions.
- Composition: MotionDesignLabReel. Slug: motion-design-lab.
- Profile: knowledge. Audience: the project owner and future video producers integrating motion into this Remotion studio.
- Platform: vertical Shorts/Reels; 1080 x 1920, 30 fps, exactly 36 seconds including holds.
- User constraints: motion style follows the individual subject; use a dedicated reviewed Motion phase after Join and before E; retain existing video behavior.
- Voice route: local VieNeu-TTS 3.8.3 (ONNX/CPU) using a clean 6–8 second reference crop from the user's purchased, read-only preview catalog. The initial benchmark shortlist is `Anh-Khoi-Ke-Chuyen.mp3`, `Thanh-Long-Nang-Cao.mp3`, and `Ngoc-Huyen.mp3`; the winning reference remains benchmark-driven rather than chosen from filename metadata. Reference media stays local and is never uploaded. Naturalness and emotional credibility are not machine-verifiable.
- Sources: the approved implementation plan; official Remotion transitions documentation; repository motion/timeline code. This is an original illustrative demonstration, not a claim about audience retention.
- Duplicate check: independent read-only intake searched docs/src for motion-design-lab, MotionDesignLabReel, motion lab/showcase and cut/dissolve/slide/wipe; no matching video or composition found. FFmpeg, FFprobe, Node and Python are available; voice catalog test passed.
- Mandated wording: none. Spoken Vietnamese and captions will be locked at gate A. Documentation remains English.

## Content and performance

- Viewer need: understand why a moving object jumps across an edit and see one concrete way to keep its path deliberate while changing the panel.
- Retellable point: follow the same dot through four kinds of scene change while voice and captions keep their original cues.
- Spine: one dot visibly hiccups, then travels a continuous path through cut, opacity dissolve, slide and wipe; the closing invitation asks the viewer to test the path themselves.
- Tone: curious opening, confident demonstration, warm invitation. No forced joke or sentiment; the small dot's hiccup supplies a light visual surprise.
- Contrast: the opening discontinuity versus the same dot continuing across later panels. Three named highlights: H1 hiccup/repair, H2 sliding-panel re-hook, H3 timing-lock payoff. CTA has its own shot.
- Claim plan: R2 supports transition vocabulary; R1 supports the production overlap accounting; O1 labels original illustrations and intended adapter behavior. See research.md. No claimed audience-retention improvement.
- Out of scope: template marketplace survey, external media, brand logos, and claims that every video should use this palette or these transitions.

## Visual identity

- Original motion-testing bench: saturated cobalt field #1736D6, warm white panels #F7F8FC, ink #15213A, signal-lime dot #D7FF52 and lavender secondary line #B3ABFF. Use colors to separate the tracked object from changing panels, not to imitate a product brand.
- Fonts: locally available Inter for Vietnamese headings/captions and JetBrains Mono for small frame labels; asset owner verifies local font files, Vietnamese glyph coverage and licenses before build.
- Motion personality: brisk, precise and playful. One readable path, short decisive panel moves, restrained spring settling, no random movement. Captions remain sharp; no whole-frame blur. Design and Motion phases choose exact paths/curves after measured Join.
- Frame 0 cover: large lime dot visibly on a kinked guide path, panel seam behind it, headline “Đổi cảnh sao bị giật?” already readable. No fade-from-black.
- Caption treatment: ink or warm white as contrast requires, two short lines maximum, explicit FitText bounds; at least 54 px caption glyph height. Captions occupy the stable lower-middle area with all text above the bottom 210 px. On-screen demo label: “minh hoạ”.
- Separation from existing videos: no dark-gold code/file-card identity from Main.tsx, no ClaudeMem cream/clay chat UI, no stick-figure interiors, invoices, phone-call story or relationship metaphor. Compared all existing docs/\*/brief.md headers and story spines on 2026-10-18; this is a graphic knowledge demo with a tracked object.

## Voice and timing contract

- Local route: VieNeu-TTS 3.8.3 through the repository's clone generator, with the selected reference derived locally from `vietnamese-voice-samples/previews/`. The catalog originals are read-only; any clean crop belongs under the video's private local voice-reference area and is not committed or uploaded. One benchmark script is rendered through all three shortlisted references before a single voice is selected for all five shots.
- `voice.json` remains the only canonical spoken text after Gate A. `voice-direction.md` defines the intended performance, while `voice-performance.proposed.json` carries phrase boundaries, pauses and supported controls without changing spoken words. Delivery notes are performance goals, not claims of direct emotion control. VieNeu's verified route accepts reference audio and candidate seeds; this production does not request rate, pitch, volume or style parameters and does not use `atempo` to manufacture expression.
- Keep directions and acting cues outside spoken text and captions. Do not depend on punctuation for clocked silence: phrase pauses are explicit assembly gaps, and shot-level demonstration/ending holds are timeline gaps after the clip. Natural breaths inside generated phrases are measured, not assumed. Experimental cues such as `[cười]` or `[thở dài]` remain disabled unless a separate benchmark proves they are spoken correctly and do not leak into ASR/captions.
- Machine acceptance covers canonical-text fidelity, CER/ASR, duration, silence, loudness, clipping and cross-shot consistency. Without an actual listening record, reports must label naturalness/emotional credibility **not verified by listening**; they must never claim a literal 100% human-identical voice.
- Fixed five-shot starts: frames 0, 210, 450, 660 and 900; composition ends at frame 1080. Slots are exactly 7, 8, 7, 8 and 6 seconds. Measure every clip, then allocate the remainder of its own slot to a visual tail/hold; do not redistribute time across slots. s5 must retain at least 30 frames of final silence. If a clip cannot fit its own slot with its required hold, shorten the affected spoken line and rerun gate A/affected reviews. Do not move any start or accelerate audio. Compensated visual overlap extends outgoing tails without shifting voice/caption cues. Speech duration is estimated until measured, but the five starts and end are locked.
- Approved voice proposal remains owned by script-agent; director alone copies it into voice.json after independent gate A.

## Production status

Research and the canonical five-line script have an earlier Gate A pass. This voice-route and performance-contract revision leaves every spoken word and fixed frame anchor unchanged, but requires a fresh independent Gate A check of `voice-direction.md` and `voice-performance.proposed.json` before downstream generation. Speech duration remains estimated until VieNeu clips are produced and measured; this brief does not approve audio quality or naturalness.
