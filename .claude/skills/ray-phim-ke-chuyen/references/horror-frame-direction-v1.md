# Horror Frame Direction V1



## HORROR_FRAME_DIRECTION_V1 — mandatory default for horror storytelling

Trigger this preset whenever a brief involves **kinh dị / truyện ma / psychological horror / supernatural / analog horror / dark mystery** and the user has not selected a different visual direction. It covers storyboard preview and the actual scene-compositing plan; it **must not overwrite user-supplied footage in VOICE_ONLY tasks**.

### Storyboard contact-sheet preview (not the finished video's geometry)

- Generate **separate source scene assets** with continuous face/costume/prop identity, then arrange a **3×4 or 4×4 review grid** with panel timecodes and Vietnamese captions. Reference: the user's approved 16-panel **Cuộc Gọi Từ Tầng Hầm** cinematic horror story board.
- Storyboard panels are typically **3–6 seconds** per dramatic beat and collectively must respect the user's **hard 60.000-second maximum**, including ending silence. A board may have 12/16/20 micro-shots while the spoken narrative retains 8–12 numbered narration scenes.
- EACH contact-sheet panel shows upper-left timecode, white narration phrase, amber/yellow clue or red warning/twist emphasis, visible story event and a deliberate shot type. Strong image-led hook in panel one; narrative payoff or unresolved danger after explanation in the last panel.
- **Never render the entire grid as one scene or stretch the reference sheet over the full MP4**. For finished 9:16 video, render **one scene/shot at a time**. Make captions with Remotion or another reliable text renderer, not baked/generated Vietnamese text in source photos; avoid duplicating inherited panel text from cropped reference images.
- The contact sheet is an approval/review artifact. A source sheet does not certify finished motion, correct voice alignment, or photoreal acting.

### Character & visual-subject diversity — hard QA gate

- Establish a **character bible** first: protagonist, relationship, clothing, face and key props fixed across shots. Diversity means multiple **distinct roles and visual subjects**, NOT changing the protagonist's face between panels.
- As a starting target, protagonist-only close-up panels should be **no more than ~40% of the sheet**, where story logic permits. This is a shot-distribution guideline, NOT an absolute ban on a single-person story or a reason to invent characters.
- For stories with named related roles, show those roles **when established by the actual plot**: mother, father, neighbor, keeper, child, ghost, alternate self. For **Cuộc Gọi Từ Tầng Hầm**: protagonist Hà, her mother, a photo/voice trace of her father, a neighbor, and the implied basement entity are narratively motivated.
- Every storyboard should include, where relevant, (1) one environment/world-establishing view, (2) one physical clue/prop insert, (3) one supporting-character or role-signifying image, and (4) one unsettling entity/reveal or ominous environmental sign. For a one-person story, satisfy the supporting-role function through a portrait, phone caller, sound source or object without adding new unsupported characters.
- Use real cinematic shot variety: extreme close-up, close-up, medium, wide, POV/over-shoulder, prop detail; avoid >2 consecutive portraits of the same expression/framing. If repetition is detected, revise the **shotlist before generating art**, substituting motivated prop, location, hands/action and supporting-role shots.
- For each shot, state narrator line, \`start_sec\`, \`duration_sec\`, character ID, emotion, **observable action** (face, eyes, hands, locomotion), camera and shot size, prop continuity, sound cue, caption beats, transition in/out. Avoid generic "scary woman looking" frames as the sole depiction of narrative verbs.

### Horror cinema visual language

- 9:16, high-contrast rainy/noir cinematic realism by default; old wood/steel, dirty glass, damp walls, film grain and haze are tools, not mandatory decorations.
- Palette: warm ivory \`#F7F1E8\` as readable main caption; amber \`#F5C467\` for meaningful evidence; restrained crimson \`#ED3E4C\` for danger, panic, curse and final twist; cold blue-black with tungsten practicals for environmental contrast.
- Poster-sized hook only where it does **not** cover eyes or crucial props. Later text should be restrained 1–2 readable lines per beat in the safe area, timed to real Vbee phonetic/phrase boundaries where possible. Check all Vietnamese accents manually.
- Transitions must convey causality, location/time movement or sonic emphasis: J/L cuts, gentle dissolve, match cut on prop/action, rhythmic hard cut at knocks/bells. Do not use repeated random zoom or static posters masquerading as character performance.
- If the main action is **independent character motion** (a delayed reflection, gripping hands, opening a lock, mouth speaking), use a separately staged animation/clip or explicitly disclose 2D limited motion rather than claiming the still image accomplished it.

### One-pass mandatory preflight and delivery

1. **Story lock**: HOOK (first 0–3s), BODY, CLIMAX and END/PAYOFF all present; audio budget and total runtime <=60.000s; meaningful twist and characters.
2. **Board lock**: each panel is a distinct event with timecode/caption; character bible continuity, visual diversity/subject distribution and face consistency approved; no misleading collage as video scene.
3. **Audio lock**: genuine Vbee source verified, text identical to approved transcript, measured MP3 times, character voice differentiated when real dialogue requires it, no clipped final syllables.
4. **Acting/shot lock**: audible words correspond to the pictured action at the right moment; expressions progress emotionally; hands, props and location match.
5. **Typography & transition lock**: 9:16 phone-safe areas, all accents correct, 1–2 subtitle lines, white/amber/red hierarchy, purposeful animation and clean cuts.
6. **Animatic lock**: **render and play back a low-resolution 10–20-second representative section with genuine audio** covering hook and a high-action moment, not just a contact sheet; correct mismatches before full MP4 render.
7. **Technical & delivery lock**: run existing \`preflight_story_video.py\`, canonical repository tests/audits, ffprobe and actual AV QC where available. Final MP4 and GitHub draft-Release asset must be real and verified, otherwise clearly report pending; do not mislabel animation level or uploaded status.

This preset supplements existing \`references/preflight-quality-gates.md\`, \`references/visual-direction.md\` and \`references/story-and-manifest.md\`. No claims of guaranteed millions of views; rely on actual audience retention metrics.
