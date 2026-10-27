# Video Quality Gates — lessons from Shorts #14 V1 → V2 → V2.2 (2026-10-25)

Applies to **all subsequent Ray Emotional Stick Shorts / Shorts → Remotion Studio videos and revisions**, not only the story “Không ai đến cứu bạn đâu!”. This is a **mandatory production/QA checklist**, subordinate to live repository AGENTS.md, pipeline gates, current brand spec and explicit user choices. It is not a promise of viral views.

## Mandatory gate Q0: scene, type and audio preflight (BEFORE expensive render)

1. Prepare a consistent character/world bible plus at least 12–20 **motivated** camera shots for 10-scene stories (when that is the selected structure). Avoid 30 seconds of identical left-character/right-door framing. Each shot must have story purpose, clear camera size and emotional action; don't add arbitrary cuts.
2. **Typography MUST NOT regress when improving motion.** Compare against the best previously approved version (V1 can outperform V2). One established subtitle system per film. Default emotional-stick style: white #F5F5F4 heavy, glyph-safe Vietnamese font, thin dark stroke/soft shadow, restrained amber #EF9E69 only for emphasis; do **not** use opaque black subtitle boxes (e.g., FFmpeg/ASS `BorderStyle=3`) by default. Opaque text backgrounds are allowed only for an intentionally approved art treatment or accessibility exception.
3. Captions: max **2 lines**, semantic short phrase, no clipping or overlap, platform UI-safe margins; check at 1080×1920 and a **mobile-size simulation ~360×640**. Do not add decorative duplicate slogans like “CHỜ ĐỢI...” next to a lamp when subtitles already convey the same line. Avoid unreadable miniature prop text on calendar/letters unless a deliberate readable closeup reveals it. No storyboard panel borders/timecodes in final frames.
4. Align captions to **observed real Vbee Thanh Long speech** using measured MP3 and token/phrase timestamps; mark unverified forced-alignment or estimated captions truthfully. Vbee Batch remains the non-substitutable default; check Vietnamese diacritics, names and pauses. Separate BGM ducking and SFX from voice.
5. Build **frame-0 + hook (0–4s) + turn + climax + ending** proof-of-concept frames before rendering. In the first 0–1 second show visually legible conflict even without audio. Match hook picture to hook narration.

## Mandatory gate Q1: character acting / camera / continuity

1. Fixed rig pivots and character scale; at least **5 emotion states** (e.g. waiting, regret, surprise, resolve, release). Animate head, eye, eyebrow, shoulder, arm, torso and leg with anticipation, eased acceleration/deceleration and appropriate holds. Do not simulate acting by random camera zoom alone.
2. Hands remain attached to forearms/shoulders, feet to legs, held props to hands; enforce contacts with letter, chair, handle, shoes and ground. No detached limb-only cut presented as whole-body reaction unless clearly established as motivated insert, no floating feet, clipping, implausible rigid rotations or inconsistent prop visibility.
3. For high-impact action, plan **anticipation → contact → follow-through → reaction**. For Shorts #14: foot plant, hip shift, chair visibly moves, hand rotates the handle, door opens, light enters, feet land with weight, rain/splash follows contact. User-important dramatic actions deserve closeup + reaction + spatial continuity.
4. Camera shot mix: wide for geography, medium for physical acting, closeup for reaction, insert for props; preserve screen direction and matching action across cuts. Maximum two primary transition families unless justified. No arbitrary shakes, flashes or FX that steal attention from the story.
5. Native 1080×1920 vector/SVG/Remotion composition preferred. Rendering at 540×960 then upscaling does **not** establish native 1080p detail. Label provisional/Pillow or proxy versions honestly; use the actual renderer required by the repo for production.

## Mandatory gate Q2: per-frame and audio QA, with regression protection

1. Create **timecoded contact sheet** from the **final exported MP4**, plus screenshots at frame 0, every scene boundary ±2 frames, hook, twist, climax, end, and all shots with moving hands/feet/props. Inspect **actual final** output; do not certify from storyboard or source alone.
2. Record defects as `scene/time | observed defect | severity P0/P1/P2 | before/after evidence | status`. P0 blockers: illegible/overlapping Vietnamese text, detached body part, impossible continuity, broken subtitles, missing/inaudible required voice, frozen black shot, severe codec error. Resolve and re-render before finalization.
3. Measure frame differences/motion density **outside caption region** by shot; investigate long static runs. **A high frame-change percentage or 30/60 FPS is not proof of smooth animation.** Verify foot planting, hand/object contact, easing and visual meaning manually. Never publish a made-up motion score or audience retention estimate as a measured result.
4. Check H.264, yuv420p, 1080×1920 portrait, 30 fps target, true duration and sample frames with ffprobe; **AAC-LC stereo 48 kHz** for browser/mobile compatibility, `-movflags +faststart`, clean full decode, intelligible Vbee, music balance and no clipped true peak. Do not silently output 96 kHz AAC or a music-only MP4 as final.
5. Before approving changes, perform **V1 vs V2 side-by-side regression** on typography, expressions, framing, audio and key props. Improvement in motion must never silently worsen subtitles. Record exceptions, not generic 'QA pass' claims.

## Mandatory gate Q3: user approval / archival / analytics

1. For revisions, **keep approved `video-final.mp4` unchanged**; upload separately labeled `V2.x-REVIEW.mp4` under a versioned review subfolder, with real authenticated Drive metadata verification. Replace final **only after explicit user approval**. Main numbered video folder keeps the agreed final MP4, thumbnail and title-description; reviews may live in a separate subfolder.
2. Report exact completed gates; never claim canonical Remotion native render or independent A–C pipeline approvals if the output was Pillow/FFmpeg or those gates were not run. Keep verified `video-final.mp4` and genuine source separate; honor GitHub archive policy.
3. Measure *Stayed to watch*, engaged views, average percentage viewed, timestamped retention and sharing **only after publication and analytics access**, compared with comparable uploads. 1M views is an aspiration, **never a guarantee**. Use lessons as testable hypotheses, not an official algorithm.

## Shorts #14 observed failures that motivated these gates

- V2's solid black rectangular ASS subtitle boxes (`BorderStyle=3`) and redundant “CHỜ ĐỢI...” text made typography look worse than V1 despite better frame-change count. V2.1/V2.2 improved white/stroked typography and removed unnecessary decorative text.
- Some V2 shots showed an **orphan arm** and **legs without body**; later review attempted to restore connected body silhouettes and door contact. Such flaws must be caught at frame QA before delivery.
- Source motion had prolonged low-change sections (e.g., ~95% near-identical sampled frame pairs at 4–8s on V1); this motivates shot redesign but cannot alone establish smoothness or retention.
- Previous mobile playback issues showed why the pipeline must lock **AAC 48 kHz**, not assume all H.264/AAC files are equally compatible.
- Preserve original voice/script unless explicitly approved otherwise; do not automatically replace V1 when giving an enhanced review link.
