# Image prompt pack — thang-may-tang-13 (photoreal, NO_CARTOON_ART_V1)

Generate **16 separate vertical 9:16 images (1080×1920 or larger)**, one per panel, in the same chat/session so faces stay consistent. Save as `p01.png … p16.png` in `docs/thang-may-tang-13/frames/` (or send them back). Do **not** let the model write Vietnamese text: every screen, seal, phone and display is generated blank or with plain digits, and text is composited later in Remotion.

## Paste once at the start (style + character bible)

> Cinematic photoreal horror film still, vertical 9:16, shot on 35mm anamorphic, high contrast, cold blue-black shadows with warm tungsten practical lights, subtle film grain, light haze, realistic skin and fabric texture, shallow depth of field. Vietnamese urban apartment building at night, rainy season, no gore. NOT cartoon, NOT illustration, NOT 3D render, no text, no subtitles, no watermark.
>
> Character LINH: Vietnamese woman, 26, short straight black bob haircut with bangs, pale tired face, small silver earrings, wet mustard-yellow raincoat over a grey hoodie, white wired earbuds, grey canvas tote bag, blue staff lanyard. Keep exactly this face and outfit in every image.
>
> Character MẸ (Linh's mother): Vietnamese woman, about 55, grey hair in a low bun, thin face, red-rimmed tired eyes, dark maroon knitted cardigan over a cream blouse.
>
> Location: old 12-floor Vietnamese apartment block. Elevator: brushed steel walls, one mirror wall, red LED floor display above the door, button panel with buttons 1 to 12 only. Corridor: beige tiles, shoe racks and potted plants beside each door, wall-mounted fire extinguisher box, cold fluorescent tubes. Apartment 1205: small living room, old CRT television, brown faux-leather sofa facing away from the door, small family altar with candles, incense and a framed portrait.

## Panels

| file | time | prompt (append to the bible) |
|---|---|---|
| p01 | 0–2 s HOOK | Extreme close-up of the elevator control: a vertical steel button panel with round buttons numbered 1 to 12 (no 13), button 12 lit amber, and above it a dark red LED floor display that is blank (digits added later). Cold steel reflections, red glow, very shallow focus. |
| p02 | 2–4 s HOOK | From inside the elevator looking at the closed steel doors, which are starting to slide open; a thin vertical slit of cold blue light from a dark corridor; red LED display glowing above the door (blank). |
| p03 | 4–6 s HOOK | Medium close-up of LINH inside the elevator, looking up at the display, pulling out one earbud with her right hand, confused and alarmed; her phone screen glows in her left hand (blank screen, text added later). On the left, the mirror wall shows the empty elevator interior and does not show her reflection (subtle). |
| p04 | 6–10 s BODY | Insert: LINH's index finger (mustard raincoat sleeve) pressing the door-close button hard; the elevator ceiling light is dying, the cabin goes dark; through the open doors a dim corridor lit by one cold fluorescent tube. |
| p05 | 10–15 s BODY | Wide one-point perspective down the floor-13 corridor: identical to a normal floor (shoe racks, plants), but soot stains spread across the ceiling and every apartment door is crossed with two white paper seal strips with red circular stamps. LINH, small in frame, steps out of the dark elevator into the corridor. Flickering tube light. |
| p06 | 15–20 s BODY | Extreme close-up of one paper seal strip on a dark wooden door: a red circular official stamp and a blank space where a handwritten date will be added; LINH's fingertip touching the paper; the paper edge lifting in a draft. |
| p07 | 20–25 s BODY | Medium shot at the end of the corridor: one apartment door is ajar, its paper seal torn and hanging; warm amber lamplight leaks through the gap onto the tiles; blank brass number plate on the door; LINH's long shadow on the floor. |
| p08 | 25–26 s BODY | Insert over LINH's shoulder: her hand in the mustard raincoat sleeve pushes the door open; inside, blue television light washes over the doorway; a thin thread of incense smoke in the light. |
| p09 | 26–30 s BODY | Wide interior of the small living room seen from the doorway: an old CRT television glowing blue (screen content added later), a sofa facing away from camera with the back of a woman's head with a grey bun (MẸ, face not visible), incense smoke drifting through the TV light, a small family altar with two red candles at the right edge. |
| p10 | 30–36 s CLIMAX | Close-up of the CRT television screen showing night news footage: a 12-floor apartment block on fire, flames from upper-floor windows, a rooftop water tank on the building; empty lower-third bar area (text added later); scanlines and screen curvature. |
| p11 | 36–38 s CLIMAX | Close-up of the CRT television screen showing a portrait photo of LINH (same face, bob haircut, mustard raincoat collar, neutral ID-photo expression); empty lower-third bar (text added later); scanlines. |
| p12 | 38–41 s CLIMAX | Close-up of LINH's face lit only by blue television light, eyes wide, hand pressed over her mouth, stepping back in horror; the doorway dark behind her. |
| p13 | 41–43 s CLIMAX | Medium close-up of MẸ turning around on the sofa toward camera, holding three lit incense sticks with both hands, grieving and tender, red-rimmed eyes; warm lamp behind her, blue TV light on one side of her face. |
| p14 | 43–48 s CLIMAX | Close-up of the family altar: a black-framed portrait photo of LINH (same face as p11, solemn), two red candles, an incense bowl with smoke, a bowl of white rice heaped full with a pair of chopsticks laid across it for one person; warm candlelight. |
| p15 | 48–53 s ENDING | Over-the-shoulder two-shot: in the foreground, LINH's open hands (mustard raincoat cuffs) with her fingertips crumbling into grey ash that drifts in the lamplight; in the soft-focus background, MẸ holds incense and whispers toward the doorway. |
| p16 | 53–60 s ENDING | Close-up of the altar's full bowl of white rice with untouched chopsticks; the last flakes of grey ash settling on the table beside it; candles burning still; the room empty and silent. |

## After generation

1. Check each image: same Linh face/bob/mustard raincoat, same Mẹ, no cartoon look, no stray text.
2. Regenerate any frame that breaks continuity before building the board.
3. The director then builds the captioned review board (`board/make_board.py`) and the clean film plates; digits, seal date, phone message and TV lower thirds are composited in Remotion.
