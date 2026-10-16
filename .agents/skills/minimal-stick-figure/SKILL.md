---
name: minimal-stick-figure
description: Optional visual profile for Vietnamese 9:16 editorial storytelling with monochrome stick figures and restrained orange highlights.
---

# Minimal Stick Figure — visual profile v1

Use this profile **only when the accepted brief or director explicitly selects** `visual_profile: minimal-stick-figure`. The normal shotcraft-driven workflow remains the default for all other videos.

## Creative intent
Premium, quiet, emotionally specific editorial storytelling. White vector stick figures, purposeful props, and one visual metaphor per shot against a solid black background. **Do not recreate or trace a reference image frame-for-frame.** Adapt the visual language with original staging and distinct narrative beats.

## Tokens and constraints
- Canvas `#000000`; primary ink `#FFFFFF`; muted `#BDBDBD`; one orange accent `#F28C52`.
- Consistent, licensed Vietnamese-capable sans-serif font with embedded/loaded assets; bold quote above the illustration, selective orange highlighting (at most 1–3 words per shot). Never highlight a whole paragraph.
- Exact 1080×1920 composition; preserve the repository's existing safe zones (90px horizontal, 120px top, 210px bottom); captions above bottom 210px. Caption glyph height >=54px; auxiliary text >=32px measured on output pixels.
- Vector primitives/SVG with consistent stroke widths, rounded caps/joins, head/body ratios, and prop proportions. No gradients, generic colorful panels, photorealistic assets, 3D, fake UI, gratuitous particles or arbitrary geometric filler.
- Each shot contains one focal figure/action and at most two props; any additional elements require a documented storytelling reason. Keep enough negative space without leaving the emotional action illegibly small.
- Frame-driven animations only: `useCurrentFrame`, `interpolate`, `spring`; no wall-clock or unseeded randomness. Subtle pose/prop changes, short entrances, intentional still holds. No unnecessary bounce, flashing or camera shake.
- Intro/hook, turning point and ending must be compositionally distinct but share typography, proportions, stroke system and accent semantics.
- Text must preserve exactly the accepted `content-pack.md` and captions/voice mapping; do not rewrite dialogue to fit layout.

## Design-agent deliverables
1. State the profile explicitly in `docs/<vid>/design-spec.md` under `Visual profile: minimal-stick-figure`, recording tokens, typeface/license, stroke/character proportions, reusable props, motion recipe and per-shot visual metaphors.
2. For each shot provide `beat | quote | accent words | metaphor | character pose | prop(s) | camera/layout | frame range | motion | evidence`. Favor character action over decorative symbols.
3. Create the existing three full-resolution style frames (hook, turn, end), frame-0 cover, full storyboard and 2-second hook motion strip using existing pipeline naming. Inspect at 1/3 display size.
4. Use original deterministic Remotion/SVG prototype assets, not shotcraft's unrelated gallery cards. Mark gallery-card mapping `N/A: profile-native vector shot`; record the exact reusable component/implementation source instead.
5. Fix frame-specific issues before requesting Gate D. Return evidence locations.

## Gate D acceptance (independent design-reviewer)
Apply the existing 10-item Gate D rubric and score thresholds (mean >=9, beauty and subject-fit >=9, no item <8, no open Cao/Trung). For this profile, replace the **shot-card choice and fidelity** item with **profile fidelity and original metaphor quality** rather than demanding shotcraft gallery cards.
- Hard fail: inaccessible or clipped Vietnamese text; wrong spoken/on-screen wording; safe-zone violation; inconsistent character proportions/stroke tokens; non-deterministic motion; unrelated metaphor; missing required style-frame/storyboard/motion evidence.
- Review all storyboard shots, not only the three style frames. For every failing criterion provide `ticket ID | severity | shot/frame | observed evidence | exact proposed fix | acceptance check`.
- Do not edit producer-owned files or invent missing visual evidence. Do not pass if critical tickets remain open. At fix-round cap, return `blocked` for unattended publishing; an override is never a publish-ready signal.

## Downstream contract
Scene agents follow this design spec and use original reusable vector components instead of unrelated shotcraft demos. QA checks per-shot fidelity and Gate C checks the rendered MP4. Existing pipeline gate commands and status schema are unchanged. The director must explicitly opt in via the brief; this profile does not change completed videos or the global default.
