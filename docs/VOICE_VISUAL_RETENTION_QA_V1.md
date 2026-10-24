# VOICE_VISUAL_RETENTION_QA_V1 — Ray Phim Kể Chuyện v0.2.9

**Scope:** Every subsequent story-driven YouTube Shorts/TikTok/Remotion video. Based on the verified lessons from *Ngọn Hải Đăng Không Chiếu Ra Biển*, where V3 reused 10 images for 60s and several narrated actions were absent, and V4 rebuilt ~25 motivated micro-shots using 16 story-specific images and readable effects. **No view-growth claim follows from those production changes.**

## 1. Creative lock before generating scenes

- Produce **three distinct hook candidates**; choose one where the impossible visual or concrete conflict is readable at 0–2s. Use 0–6s HOOK / 6–30s BODY / 30–48s CLIMAX / 48–60s PAYOFF for 60s horror. New cause-and-effect information typically every 3–6 seconds; never mechanically require an arbitrary shot count.
- The viewer must see **WHAT CHANGES**. For voiced actions ("opens a door", "water rises", "turns a light", "the stranger raises his hand first") storyboard a before → visible action → observable result sequence. A static expression, an unrelated staircase photo, a caption or the narrator asserting the action **is not visual evidence**.
- Establish clear geography, plausible causality, character look continuity (including past/future self), physical props and precise twist foreshadowing. Do not reveal the final identity too early or spoil it in the title.
- Draft the 16-panel **captioned review storyboard**, each panel with concise Vietnamese narrative and white/amber/red emphasis, mobile legibility and distinctive camera angles; produce *separate clean assets for MP4*, with captions as native Remotion text. Review timecode/grid never belongs in MP4.

## 2. New gate: VOICE → VISIBLE ACTION → FRAME PROOF

Every *meaningful* story/voice beat requires a `voice-visual-evidence.json` record containing:

| Field | Required proof |
|---|---|
| `id`, `phase`, `start_sec`, `end_sec`, `narration` | Measured narration timing and one of `HOOK/BODY/CLIMAX/PAYOFF` |
| `expected_visible_action` | Precise action, clue, consequence or reveal (not a mood word) |
| `observable_evidence` | **What is visibly different before and after**; describe pixels, not just repeat voice |
| `asset_ref`, `review_frame_ref`, `evidence_time_sec` | Real clean source asset and extracted *rendered MP4* proof within beat |
| `review_status` | `visually_verified` ONLY **after reviewing the actual pixels**; default `pending` |

`python scripts/validate_voice_visual_evidence.py voice-visual-evidence.json --assets-root <production-dir>` checks this **structural** contract and must fail on missing event proof, missing sample image, out-of-window evidence, or unverified beat. **This cannot recognize image contents or certify that water really rises**; human visual inspection remains mandatory. Keep both source asset and proof frame; automation cannot be used to self-certify a scene.

**Lighthouse regression cases:**
- ~18–30s: the *other person raises a hand before ông Lâm* → show other hand, then Lam reacting, then matching gesture, not a photo of Lam.
- ~30–36s: stairway → door swings open → **same lamp room**. A staircase shot + voice alone fails.
- ~36–42s: actual visually progressive waterline (ankle → knee, etc.) or equivalent visibly evolving event; a staircase photo cannot pass.
- ~42–48s: Lam operates lighthouse mechanism + beam sweeps onto the deck.
- ~48–60s: young Lam recognizable from old Lam, then submerged lighthouse revealed and held long enough to understand.
These specific events are **regression examples only**, not plot requirements for future films.

## 3. Motion & audio — preserve user-approved style

- 2D/2.5D cinematic video **is allowed**; independent natural actor animation is optional. For voice claiming a physical action, depict it through a deliberately authored sequential composite, movement or appropriate actual clip. Never call a still zoom "real acting".
- Prefer **smooth eased camera motion** and 0.35–0.55s **fade/crossfade** with real overlap; no abrupt shake, flash cuts, glitch, rough freeze frames or sudden zoom. Avoid double-exposed text or faces across fades; typography separate and timed to Vbee phrase boundaries.
- Keep **original measured Vbee** speech provenance, voice-first mix, restrained dark ambient, motivated scene-synchronous SFX and silence with dramatic purpose. Listening-based QA for voice clarity, clipped syllables and quiet patches; a silence detector or dB peak cannot replace a listening check.
- Keep 9:16, <=60.000s for short, 30fps; 1080×1920 preferred when assets actually support the detail, 720×1280 acceptable for QA and current pipeline. Do not upscale and call it increased visual detail.

## 4. Evidence-based final gates

**Block FINAL** if any story beat is only narrated but not visibly shown, if actor/props are inconsistent, or if story-critical clue/twist is unreadable. Do not hide failures with extra microshots, music, captions or animated zooms.

Before release: (1) verify generated source assets, timing, genuine voice origin; (2) render full MP4; (3) use `ffprobe` and complete `ffmpeg` decode; (4) make **1–2 fps contact sheet**, samples at 0–2, every transition, each narrated action and both twist beats; (5) personally review source and exported frames **at native phone 9:16**; (6) inspect full audio and subtitle spelling/safe areas; (7) annotate each beat `visually_verified` only if checked, run JSON structural validator; (8) compare candidate versions with same narrative conditions and actual platform metrics when available.

**Retention measurement:** compare viewed-vs-swiped, average watch duration, average % viewed, retention around action/climax/twist and rewatches against the channel's own baseline. Do not fabricate 70%/85% thresholds or promise millions of views. V3 vs V4 comparison is production QA, not observed algorithm performance.

**Delivery:** User's latest destination contract prevails. Store **MP4 + thumbnail + Vietnamese YouTube copy on the same numbered movie Google Drive folder**; preserve prior V3/V4 files for comparison, don't allocate new folder for same film. Store manifests/scripts/QA source on GitHub repo `nanxnguyen/remotion-ai-agentic-studio`. **NEVER upload MP4 to GitHub Releases.** Read back Drive IDs, bytes, MIME and access; do not alter sharing without explicit request.
