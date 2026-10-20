# Design review, lens (a): beauty, craft, phone legibility

**Video:** `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · profile `story` · gate D
**Reviewer:** `design-reviewer`, lens (a), clean context · written 2026-10-20

## Round 1

**Inputs read:** `design-spec.md`, `script.md`, `brief.md` §Visual identity, `skills/video-shotcraft/references/aesthetic-rules.md` (rule index), and every PNG at full size: `out/qa/ban-khong-yeu-duoi-chi-da-manh-qua-lau-{cover,style-1,style-2,style-3,board,motion-hook}.png`. I also judged each frame at about 1/3 size, as a phone thumbnail.
**Not run:** `python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau`. This reviewer session has no shell tool, so the director must run the audit. I make no claim about its result.

### Verdict

**score: 4.6  verdict: revise**. The gate D bar is a mean of 8.5 or more with no open Cao or Trung ticket. This round fails on both counts: 6 Cao and 5 Trung tickets are open.

The palette direction is right: cold navy, soft grey and one amber that is held back until the end. The Vietnamese diacritics render correctly everywhere I checked. The rendering, though, is a placeholder, not a frame you could publish. Nobody holds the umbrella. The wet-vs-dry thesis does not read at thumbnail size. The figures are blank discs on rectangles. 12 of the 16 storyboard tiles show the same standing pose.

### Score table

| # | item | score | evidence (frame + region) |
|---|---|---:|---|
| 1 | Beautiful | 4 | cover: values are flat, mostly inside the dark 20–60 luminance band. The lamp (top-left, ~60,70) is a blurred blob that lights nothing. The window (885–980, 370–485) is a flat tan square with no bloom. The figures are disc heads with 2 dots on rectangle legs and have no feet (her legs end at y≈1745, the child's at y≈1735). |
| 2 | Fits the subject (craft side) | 4 | cover: the canopy (x 50–860) covers her head (x 650–850), so she does not read as "outside the rim". The wet sleeve is one thin pale line (≈ x 850, y 810–1110) and the whole coat reads as "dark coat" rather than "wet". style-2: no kitchen, no table, glasses on the floor, and the doorway interior is black. |
| 3 | Originality | 6 | The cold, exterior, figure-led look does differ from the four warm, type-led videos in the spec's §3. The figure language, though, is generic infographic. |
| 4 | Consistency across hook / turn / end | 4 | The child is ≈ 830 px tall in the cover (head 910 → feet 1735) and ≈ 680 px in style-3 (1170 → 1850). In style-3 the child's feet sit 150 px below her ground line (y≈1700). The lamp changes from a soft blob (cover) to a hard flat disc (style-3, 10–100, 25–60). |
| 5 | Phone legibility + safe zone | 7 | Caption 62 px, white, glyph bottom ≈ y 1690 (style-1, style-2), so it clears the bottom 210 px. Diacritics are intact: `chuyện buồn`, `chùng xuống`, `đứng ngoài`, `yếu đuối`, `mạnh mẽ`. Problems: the headline sits on top of the canopy ribs (cover y 352–432), the umbrella shaft cuts through the END title (style-3 x≈370–400, y 800–940), and the caption has no scrim over figure legs and the umbrella hook (style-1 y 1560–1690). |
| 6 | Profile visual test (story: a consistent person, expressive) | 4 | No posture or hand carries emotion in any of the 3 frames. Every figure has hands in pockets and the same frontal stance, and the faces are identical neutral dot faces. |
| 7 | Motion (hook strip) | 4 | motion-hook: tiles 1→3 show the rail move and the bright pavement band disappearing. Tiles 4–24 look identical at strip size, with no visible drip, bead or push spacing. The canopy is nearly invisible (dark on dark). |
| 8 | Cover + storyboard | 3 | cover: no holder for the umbrella and the thesis does not read. board: S2A, S3, S4, S5, IMG1, S6, S7, S8 and END are all the same standing figure in front of a dark rectangle with two boxes. There is no phone, no sitting, no knees up, no call UI, no umbrella in the lap and no title. Tile labels are ≈ 11 px and cannot be read. |
| 9 | Shot-card fidelity (visible part) | 5 | No board tile shows its card: no spotlight cone in S2A/A1, no screen-lit radial reveal in S3, no input bar in S4, no sheen on the umbrella in S7, no diagonal boundary in S9. Only the A2 tile shows its device (orbs behind glass). |
| 10 | Aesthetic rules | 5 | Q5 is failed by the hook as rendered: the "single subject + complete action arc" is not legible, because the action (holding the umbrella out) is not drawn. R3/R2 cannot be confirmed from the strip because the motion stalls after about 0.25 s. P1: the spec claims every frame was "read", yet the floating umbrella and the 12 duplicate board tiles were shipped. |

**Mean: (4+4+6+4+7+4+4+3+5+5)/10 = 4.6**

### Fix tickets

`id | severity | where | evidence | concrete change | owner | acceptance`

**Cao**

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| D-A01 | Cao | cover, style-1, style-3, board S1/S9/IMG2/S10 | The umbrella shaft runs from the apex to a hook floating at (570,1640) in cover/style-1 and at (265,1640) in style-3. Both figures keep their hands in their pockets, so nobody holds the umbrella. In style-3 it reads as if the child holds it. | Give her an arm raised toward the child with a closed hand gripping the shaft (≈ y 1000–1100). The shaft starts at her hand. Draw the hook under her fist, not at knee height. | design-agent | In all 4 frames plus the board, her hand plate visibly closes on the shaft, and no shaft end floats in free space. |
| D-A02 | Cao | cover (thumbnail), style-1 | The canopy spans x 50–860 and covers her head (650–850). The "wet stripe" is one ≈ 6 px pale line down the sleeve. At 1/3 size the frame reads as dark coat vs light coat, not wet vs dry. | Move the canopy so her right shoulder and sleeve are clearly outside the rim, with rain streaks landing on them. Make the wet glaze a broad darker band of 40 px or more, plus a sheen and 2–3 drips off the elbow. Put the rim's shadow band across the child's shoulder. | design-agent | At 360×640 a viewer who has not read the spec can point to "she is wet, the child is dry". The rim edge falls between her and her own shoulder. |
| D-A03 | Cao | all figures, all frames | Disc heads with 2 dots and a dash, rectangle legs without feet, no hands, no neck, the same frontal pose everywhere. The coat hem cuts off abruptly. In style-3 a semi-transparent rectangle (the phone, 650–740 × 1500–1670) is drawn over her leg. In style-2 the right glass (750–880 × 1255–1405) is drawn in front of her legs. | Rebuild the figure plates: opaque fills, shoes/feet, hands, a neck, a hair silhouette that can turn into a 3/4 profile, and a posture rig (shoulder drop, head tilt, arm raise). Fix the layer order so props sit behind or beside the legs. Draw the phone and cup as opaque objects on a surface. | design-agent | Seen side by side, the 3 frames show 3 different readable postures, nothing ghosts over a body, and every figure has feet on a ground line. |
| D-A04 | Cao | style-2 (turn, `a1`) | The doorway (780–1015 × 150–1160) is black inside. The warm light comes from a strip on its left jamb plus a round glow blob at her collar (≈ 640–760, 500–560) that looks like a held lamp, not light falling on cloth. No kitchen and no table: both glasses stand on the floor. The "other person" is the standing child figure, cropped at the left edge (x≈20). | Make the doorway the warm source: lit interior and a narrow wedge on the floor and wall that ends at her collar edge, with falloff. The other person sits at a table with head in hands and shoulders dropping, both glasses on the table, hers untouched and empty. Keep the other person fully in frame. | design-agent | At thumbnail size, a viewer can name the light's source and say "it touches her collar". The table, the 2 glasses and the seated other person are identifiable. |
| D-A05 | Cao | board, tiles S2A–S8, IMG1, END | 12 of 16 tiles show the same standing figure, dark rectangle and two boxes. S3 (phone-lit head), S4 (over-the-shoulder, input bar), S5 (knees up), IMG1 (phone face-down), S6 (call UI + `minh hoạ`), S7 (furled umbrella in her lap, sheen) and END (title card) are not staged. Tile labels are ≈ 11 px. | Stage every tile to its `script.md` §3 line and its card from `design-spec.md` §9: the device visible, the posture visible, the light state visible. Raise the label text to 18 px or more on the 1024-wide sheet. | design-agent | Each tile can be matched to its spoken line without reading the label, and no two tiles share the same figure pose and composition. |
| D-A06 | Cao | motion-hook strip | Tile 1 has a bright pavement band (cover y 1710–1920), which is gone by tile 2–3. That is a pop, so the cover is not representative of the playing frame. Tiles 4–24 are indistinguishable: no visible drip, bead travel or push spacing. The spec's "27 % pixels change" is most likely this pop plus the rail. | Keep the pavement sheen continuous from frame 0. Spread the rail over its 78 f with the stated `bezier(0.45,0,0.18,1)` so the spacing visibly decelerates. Make the rim drips large and bright enough to read at strip size, and keep them falling through the whole 2 s. | design-agent | Re-rendered strip: the pavement value does not jump between tiles 1 and 2. The spacing visibly narrows toward the settle. At least one drip is readable in motion in every row. |

**Trung**

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| D-A07 | Trung | cover, style-1, headline | `Ai che ô cho bạn?` (y 352–432) is set directly on the canopy. Ribs cross the glyph band, the shaft passes at x≈450 next to "ô", and the rim bead dots sit 20 px under the baseline. | Either move the headline into clean sky above the canopy, or lower and shrink the canopy so the 340–450 band is empty. If any texture stays behind the type, add a soft local scrim. | design-agent | No rib, shaft or bead lies within 12 px of the headline's glyph box. |
| D-A08 | Trung | style-3 (END) | The umbrella shaft crosses both title lines (x≈370–400, y 800–940). The title sits over her face and torso. | Re-stage END so the 760–1120 band is negative space (her figure moved right or lower, the shaft out of the band), or use a scrim panel. | design-agent | The title band contains no line art and no figure edge. Contrast is 7:1 or better for line 1 and 4.5:1 or better for the amber line 2. |
| D-A09 | Trung | style-3 | The child shrinks to ≈ 680 px tall, and its feet (y≈1850) sit below her ground line (≈1700), outside the pavement plane. The "warm cup" is a 55 px amber square floating at (585,1510) on no surface. | Use one ground plane and one scale for both figures across hook, turn and end. Set the cup and phone on a visible surface (bench, step or kerb). | design-agent | Figure heights in cover vs END are within ±5 % at the same camera distance, both pairs of feet are on the same ground line, and the cup rests on something. |
| D-A10 | Trung | cover, style-1, style-3 (light + value) | No key/fill structure. The lamp lights neither pavement nor figure. The window has no bloom or spill. The figures barely separate from the facade (coat ≈ 42 luminance against a ≈ 28 sky and a dark facade). | Add a sodium pool on the pavement under the lamp plus a cold-warm rim on her hair and shoulder, a soft window bloom with a faint spill on the wet street, and a slightly lighter facade band behind her head for silhouette separation. Keep amber absent at frame 0. | design-agent | At 1/3 size both silhouettes (head, shoulder, umbrella) separate from the background, and a luminance histogram shows a distinct highlight cluster. |
| D-A11 | Trung | style-1, style-2 captions | `design-spec.md` §5 says `Caption` has a scrim, but none is visible. The style-1 caption sits over the child's legs and the umbrella hook (y 1560–1690). | Render the declared scrim (a soft gradient band, not a box) or clear the 1540–1700 band of figure detail. | design-agent | The caption reads at 4.5:1 or better over the busiest pixel beneath it in every voiced frame, including the warm L3/L4 frames. |

**Thấp**

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| D-A12 | Thấp | motion strip, cover | The canopy, the through-line object, almost disappears dark on dark at strip size. | Add a thin cool rim highlight along the canopy edge and the metal tip. | design-agent | The canopy outline reads in every strip tile. |
| D-A13 | Thấp | style-3 vs cover | The lamp changes from a soft blurred head (cover) to a hard flat disc (style-3), which reads as a different object. | Use one lamp asset with the same blur/depth treatment in both frames. | design-agent | The lamp matches in shape and softness. |
| D-A14 | Thấp | style-3 | The warm umbrella gradient lights only the right half of the canopy, ending in a hard edge at the rim, with no matching warm spill on her hair or face. | Tie the canopy warmth to a visible source direction and repeat it on the figure's rim. | design-agent | Warm light on canopy and figure comes from one consistent direction. |

### Weaknesses even if the Cao/Trung tickets are fixed (at least 3)
1. The faces will stay diagrammatic. Emotion has to come from posture and light, and D-A03's rig is the minimum for that.
2. The END card over a busy figure scene will compete with the title unless it is re-staged as quiet negative space (D-A08).
3. The single-weight sans (600 only) gives no hierarchy between headline and caption beyond size. Check the headline vs caption contrast once the scrims land.

### Previous fixes verified
None. This is round 1 of this lens.

### Cannot verify
- Motion outside the 2 s hook strip, including the `a1` sweep, `s3` linear reveal, `s7` sheen, `s9` boundary and `s10` freeze-orbit: none has a rendered frame.
- Actual-timing animatic: that belongs to Phase 4b motion review, not to gate D.
- The `pipeline.py audit` result: not run (no shell in this session).
