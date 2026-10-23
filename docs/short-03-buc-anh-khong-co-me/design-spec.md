# Design direction — The mother outside the frame

## Thesis
Mother remains physically **outside each group portrait** until Linh actively brings her to the centre. The film asks a visual question before speech answers it.

## frontend-design pass

### Palette & typography tokens
| Role | Value | Use |
|---|---|---|
| Background | #08090B | Film negative space |
| Main text | #F5F5F4 | Headlines / figure contour |
| Secondary | #85878A | Mother hair, image metadata |
| Amber | #EF9E69 | Reflection outline, shutter, candle, final warm release |
| Slate | #2A303F | Room, glass, furniture and photo props |

Display: DejaVu Sans Bold (Vietnamese glyph coverage), 28–33 px at 540×960 source, 2× on output. Label: 12–15 px. Use intentional left-to-right reading, preserve Shorts UI margin.

### Screen wireframes
**Opening**: top title / substantial album-phone in centre-right / Linh at left / bottom one-line question.

**Reveal**: centre enlargement of one photographic window / mother holding camera in reflected glass / large negative space for “TRONG Ô KÍNH”.

**Ending**: mom centred in family photo at centre / shutter action / warm amber lower caption.

### Generic-design defaults deliberately rejected
- No random animated emoji or sparkles.
- No new heading for every 0.5 seconds; one stable headline per paired scene.
- No identical empty stick figure stage pretending to be bedroom, graduation and kitchen.
- No loud gradients; amber reserved for narrative rewards.

### Story-specific revision
Earlier video #02 was built with too many generic repeated motifs. This story adds original nine linked spaces with concrete props (candle, cap, graduation window, family dinner, album phone, bowls, tripod) and puts the mother’s camera gesture at the centre.

### One memorable device
**The graduation-window reflection**, which makes mother visible as the person behind the lens; final image reverses the camera and brings her into the family.

### Self-critique and preview
The authored camera uses limited slow movement and selective cross-dissolves; frame-boundary QA should confirm smoothness. Reviewing story contact sheet at phone size is necessary before claiming visual storytelling success.
