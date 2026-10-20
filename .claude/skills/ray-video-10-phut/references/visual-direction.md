# Video visual direction — adapted from distinctive frontend design principles

This is original video-specific guidance, **informed by** the idea of subject-led visual identity in Anthropic's `frontend-design`. If the official skill is installed locally, read it directly and honor its license; this file does not reproduce it.

## Art direction card (one page)

1. **Subject's visual language**: 3 nouns describing materials/place/culture (not generic adjectives like modern, premium, clean).
2. **Design thesis**: “This story feels like [specific real-world reference], therefore typography/color/motion will behave like [specific observable system].”
3. **Palette**: 4–6 named HEX tokens (primary field, ink, support, functional accent, optional highlight); one dominant color and one controlled contrast.
4. **Type hierarchy**: display role + reading/caption role; pick fonts tested for Vietnamese diacritics, measure actual rendered glyphs and intended size on phone.
5. **Composition signature**: one unique recurring device (lens window, tactile torn paper, topic-specific graph, documentary split, letterbox timeline). Do not reuse identical tiles across most shots.
6. **Motif from topic**: specific prop, subject silhouette or information diagram; one narrative function for every graphic element.
7. **Motion semantics**: entrance = reveal, transition = conceptual connection, hold = emphasis. Do not animate a word merely to fill time.
8. **Anti-pattern check**: no stock “AI gradient + random glow + repeated floating cards”, no incoherent type pairing, no too-small captions, no excessive bounces, no decorative motion unrelated to meaning.

## Reusable kit without generic output

Optimize speed by fixing **engineering primitives** (typography system, safe zones, caption block, gradients, scene registration, easing functions), not the visual story. Distinctive imagery and staging must still be subject-led.

Implement a small **design kit before full style frames** (the base skill's `Kit ready` rule): full character anatomy when characters appear; every listed prop present and attached to its actor; minimum 3 expressive poses when required; each shot gets distinct composition; storyboard and hook strip show visible motion progression. Keep the exact base evidence files and independent Gate D review.

## Mobile legibility and blocking defects

- Render at 1080×1920 unless the explicit brief overrides; captions visually tested on scaled-to-phone images.
- Keep bottom 210px clear per base skill's final blocker contract; consider platform overlays and top/side gutters.
- Ensure Vietnamese tone marks, punctuation, punctuation-boundary kerning, overshoot and line wraps are actually visible in stills.
- Up to 2 lines of current important caption text where practical; never minimize typography to hide overflow.
- Frame 0 readable as a cover; transitions should preserve subject continuity even when scenes use different geometry.

## Art-director review against the storyboard

Ask two separate questions with evidence: **“Does it express the story?”** and **“Does it look deliberately crafted?”** Both must pass. Gather style frames, cover, storyboard and hook motion strip before independent Gate D. A good static frame does not prove readable motion; review actual strips and dense frames.
