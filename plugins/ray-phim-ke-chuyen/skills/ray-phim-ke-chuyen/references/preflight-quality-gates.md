# Ray Phim Kể Chuyện — mandatory one-pass quality gates (v0.2)

**Applies to ALL NEW_FILM and full video revisions.** Purpose: prevent repeated revisions caused by unapproved story structure, poster-like static frames, emotionless acting, narration drifting away from shots, ugly typography, and arbitrary transitions. Do not substitute this checklist for the repository's canonical agent pipeline/audit. Keep all review evidence; mark a gate pending if it cannot be run.

## Golden defaults / locked user constraints

- Format: vertical **9:16**, cinema-noir Vietnamese psychological horror, legible on mobile; use project dimensions/FPS, default 1080x1920/30 if new and unspecified. Preserve original FPS when revising.
- **Maximum 60.000 seconds** (user hard ceiling); aim 55–59s, leaving 1–3s total for reaction/holds and final silence; do not stretch automatically to 70s. If story does not fit, shorten voice/script BEFORE animation.
- Default storyteller: **genuine Vbee Anh Khôi**, Batch TTS voice `hn_male_phuthang_stor_24k-stl` where available. Important female character dialogue must have a distinct licensed/genuine voice; if Vbee fails, report blocker and do not label substitute as Vbee. Verify actual provider artifact/job.
- Consistent main-character face, age, wardrobe, set geography, light direction, recurring props and real shot continuity. No unlicensed music/assets or font bundles.
- Avoid final spoken fiction disclaimer or appended CTA that spoils the twist. Upload only draft Releases if actually authorized, never publicly publish without explicit authorization.

## Gate A: Story lock BEFORE generating assets or voice

- Story is **HOOK (0–3s) → BODY (3–30s) → CLIMAX (30–48s) → END/PAYOFF (48–60s)**. These are indicative windows, not license to mis-time spoken lines. Each scene MUST advance causal plot and show an observable change. Horror rule and stakes visible; twist explained by prior clue; ending resolves the immediate dramatic question, may create a new unsettling implication.
- Produce script with exact final spoken Vietnamese dialogue, speaker, emotional intent, subtext, correct pronunciations and punctuation; remove repetitive exposition. Distinguish *narrator* from in-world character lines.
- Provide a **voice-to-action shotlist**, not just a picture prompt. At minimum `phase`, `narration`, `speaker`, `start_sec`, `duration_sec`, `emotion`, `action`, `camera`, `caption_beats`, `motion`, `transition_in` per shot; key emotional/prop events include precise local `action_beats` times and matching `voice_cue`.
- Break story into 9–12 usable vertical shots (or 20–28 micro-beats where acting requires); avoid forcing one static picture to carry several contradictory events. Production scope must fit actual available animation/generation tools.
- **Sign-off:** one story/shotlist pass with all ending clues, reactions and dialogue planned; do not create final frame assets until this passes. Approval can be inherited from user's existing approved script, not re-asked unnecessarily.

## Gate B: Character, acting and continuity lock

- Build a character bible and reference appearance. Define emotional progression across each scene, e.g. suspicion → disbelief → fear → urgency → relief/dread; include **eyes, brows, mouth, hand tension, breath, gaze direction, posture** and visible response to event.
- Every narrated causal verb gets matching imagery at the corresponding syllable: **look → look**, **raise hand → hand visibly raises**, **tear ticket → visible tear**, **bell → light/screen response**, **door opens → latch and door move**, **smile → character actually smiles**. Single scene must not show the consequence before the event or hold an unrelated poster throughout.
- When plot requires separate reflections/doubles, show independent expression/pose; 3-second mirror lag at 24fps = **72 frames** (at 30fps = 90). A Ken Burns zoom/crossfade is **not** independent character animation. If only stills/2D composites can be made, truthfully mark technique and render a consistent shot that communicates the beat without claiming natural acting.
- Important mouth/speech beats require appropriately timed facial movement. Explicitly disclose that general mouth warping is NOT phoneme-accurate lip sync unless verified.
- No facial deformation, extra/malformed hands, text printed inside AI art, implausible reflection geometry, inconsistent wardrobe or face between scene cuts. Contact sheet alone is NOT evidence that motion works. Watch video in motion.

## Gate C: Genuine voice performance and hard timing lock

- Generate Vbee **only after** script/character lines lock. Voice acting plan: Hook low and crisp → BODY curious/uneasy → CLIMAX faster/louder or a deliberate hush → END slowed, threat + final silence. Do not simulate drama merely by boosting overall track gain; use pacing, breath, SFX and music ducking. Avoid robotic same-speed delivery.
- Synthesize utterance-level MP3s and store original unprocessed voice source plus a measured duration map, `voice_code`, `sha256`, speaker, spoken text. No 'Vbee' claim without actual Vbee output.
- First build one **master timed transcript** from real audio, with each `voice_cue` start/end mapped to a corresponding `action_beat` and short phrase caption. All scenes and transitions derive their timing from this source; do not independently guess shot boundaries. Check word/phrase boundaries, especially 3 bells, a warning, a ticket tear and last latch click.
- Fit speech naturally within slots with room for reaction/SFX; shorten script/extend within the 60s ceiling instead of clipping endings or speeding voice until unnatural. Character dialogue and narrator must never accidentally overlap unless intentionally written.
- Mix voice forward: BGM ducked under narration and allowed to rise only during action holds; independent SFX stems (`brake`, `bell 1/2/3`, `tear`, `door latch`, `rain`) aligned to visible event. Listen to the full video, not only inspect codec.

## Gate D: Art direction + cinematic typography locked BEFORE full render

- **9:16 mobile-safe, cinematic photographic composition**. Subject readable with headroom and visual story props. Do not render original storyboard contact-sheet as a scene. Avoid static pasted photo with identical digital zoom for all shots. Use shot variety: establishing, reaction close-up, prop insert, OTS, action wide, match cut.
- Compose **titles/subtitles in Remotion or renderer**, not inside image generation; Vietnamese glyphs/diacritics verified. Adopt **one consistent cinematic font family** (e.g. Be Vietnam Pro / Noto Sans with Vietnamese support, licensed availability), clear size hierarchy, warm ivory `#F6F3E9` base, amber `#F4C575` for clues, restrained threat red `#FF4C53` for danger. Subtle dark gradient/shadow, no overly thick outline/gaudy neon.
- Captions **phrase-synchronized to speech**, preferably 3–7 words per beat, maximum 1–2 lines and <=48 displayed characters where possible; 2 beats per scene typical. One headline for scene theme, a second short cue that **adds new information**, not redundant repeated full title. Do not obstruct eyes, mouth, hands, ticket, threat reveal or final twist. Keep safe margins appropriate to actual Shorts interface and verify on vertical preview.
- Typography motion: short, subtle fade+rise/tracking adjustments; key red/amber word can enter exactly at SFX. Do not shake or bounce constantly. First 2 seconds present text + image hook simultaneously. Last payoff text holds just long enough to register (avoid spoiling prior narration).

## Gate E: Transition + emotional pacing lock

- Build a small transition vocabulary: motivated **match cut**, short cinematic **dissolve** for passing time/atmosphere, **hard cut on SFX** for shock, restrained black fade for ending. Plan each of the N-1 scene boundaries; 9 transitions is not a universal requirement, depends on scene count.
- Typical crossfade approx **0.25–0.55s** where action and voice continuity allow; avoid indiscriminate slides/wipes, long fades that smear continuity, digital shakes on every cut or jumpy unmotivated zooms.
- Vary motion by shot intent: push-in for realization, fixed CCTV for evidence, handheld restraint for panic, linger/hold on last threat. Avoid pan/zoom while subject is speaking if it distracts from expression.
- J-cuts/L-cuts allowed only if documented in the voice/action map; captions and causality still must match. Make SFX land on correct video frame.

## Gate F: Preflight + QA / strict release

Before expensive full render, run `python3 scripts/preflight_story_video.py --timeline <shotlist.json> --max-seconds 60` (portable skill equivalent: `scripts/preflight_story_video.py`) and optional `--voice-manifest <measured-timeline.json> --asset-root <path> --check-assets`. **Exit 0 does NOT certify creativity/performance**; checklist remains mandatory. Correct all script/voice/art/timing errors before export; do NOT silently downgrade features.

- Produce **low-res timed animatic with real voice**, include 0–3s hook, one BODY beat, full CLIMAX and END, then inspect in motion for emotional reactions, captions and pacing. Only after this, freeze picture and render final 60s MP4.
- Mandatory finished-video review: `ffprobe` video/audio, actual FPS, width/height, measured duration <= 60.000s (allow <= one frame tolerance for container rounding only if promised exactly 60), AAC sound, non-silent narration; first 3s, every speech scene, every transition, climax, final 5s; check cuts/flash/freeze, eye/hand consistency, typo/diacritics, subtitle ownership, peaks/no clipping, authentic provider ID, final payoff not truncated. Save QA evidence and limitations accurately.
- Run repo's `npm run verify`, visual tests and `python3 -I scripts/pipeline.py audit <vid>` whenever operating as canonical Remotion video. If blocked, record actual failures in handoff, not 'pass'.
- Render preview MP4 accessible in ChatGPT **before** claiming success. Archive verified MP4 into a **draft GitHub Release**, validate asset name, bytes, SHA-256 and real download URL; never fabricate a GitHub URL. If connector cannot upload binary, mark `archive_pending` and provide real chat MP4 link only.
- Provide a one-shot deliverable: MP4 preview, QA/contact sheet, editable project/manifest, honest status of motion realism, voice provenance and GitHub archive. Capture issues as concrete bug reports (scene/time, expected vs actual), edit only affected assets rather than blindly rerendering everything.

## Non-negotiable minimum scorecard

Creative: hook / clear story / stakes / earned payoff. Acting: visible emotion and causal motion. Audio: Vbee source real, dramatic rhythm, clean/dialogue distinction, no clipping. Visual: character continuity, no text baked into generated backgrounds. Type: legible, cinematic, phrase-synced Vietnamese. Edit: motivated smooth transitions and SFX frame-synced. Delivery: MP4 playback verified + accurate GitHub state. **Any critical fail blocks FINAL label.** No numeric scores or 'pass' unless actual evidence is present.
