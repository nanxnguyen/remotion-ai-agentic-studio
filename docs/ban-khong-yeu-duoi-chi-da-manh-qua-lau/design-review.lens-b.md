# Design review — lens (b) — ban-khong-yeu-duoi-chi-da-manh-qua-lau

## Round 1

**Reviewer:** `design-reviewer` (gate D, lens b: fit to story/brief, originality, hook motion, shot-card validity). Clean context, 2026-10-20.
**Inputs opened:** `design-spec.md`, `script.md`, `brief.md` §Visual identity + §Hook, `content-pack.md` (§2 bands, §3 text, §4 cover), `skills/video-shotcraft/references/aesthetic-rules.md` (full), `skills/video-shotcraft/gallery/api/library.json`, the 11 demo TSX paths, `src/videos/*/kit.tsx` (palette headers), `out/qa/cuoc-goi-nho-cua-me-v2-s8-silent.png`. Every PNG below was opened at full size and judged again as a ~1/3-size phone thumbnail.
**Previous round:** none (no `design-review.md` exists). This is round 1, so every ticket is listed.
**Pass bar given by caller:** ≥ 8.5 with no open Cao/Trung ticket. The role's own bar is 9 (items 1 and 2 ≥ 9, none < 8).

### Score table

| # | item | score | evidence (frame + region) |
|---|---|---:|---|
| 1 | Beautiful | 6 | The palette and night grade are coherent (cover, sky and pavement). The figures are translucent overlapping plates: on the cover the arm plates show the torso through them (her coat x 600–900, y 760–1390), and the faces are flat discs with dot eyes. Props float (style-3 cup at x 557–612, y 1488–1535). Text collides with objects (cover headline on the canopy; style-3 title over her body and the shaft). |
| 2 | Fits the subject | 5 | Nobody holds the umbrella in any street frame (D-01). a1 does not stage its own line (D-03). The END props are unreadable (D-02). The thesis "she is wet" is a hairline (D-05). |
| 3 | Originality | 7 | Wet exterior street plus umbrella is new. The navy room with one warm lamp and stick figures overlaps `met-khong`, and the rain window, missed call and round-head dot-eye figures overlap `cuoc-goi-nho` (D-12). |
| 4 | Consistency | 6 | The child's scale and value change between cover and style-3. The a1 "other person" uses the Child plate at adult height. The board's END tile (doorway) contradicts style-3 END (street) (D-04, D-03, D-13). |
| 5 | Phone legibility + safe zone | 7 | Captions are 62 px, VN diacritics are intact and glyphs end ≈ y 1690. Problems: the END title runs over her body and amber rim, the shaft crosses the line-1 glyphs, the child's legs in style-3 run to y ≈ 1850, and the cover headline sits on the canopy (D-10, D-14, D-17). |
| 6 | Profile visual test (hero acts the beat) | 5 | The board shows her standing idle in 11 of 16 tiles. The hero never performs s3–s8's actions (D-04). |
| 7 | Motion (hook strip) | 5 | The only visible change is a tile 1→2 value pop (the pavement goes dark and the caption pops in). Tiles 3–24 are near-identical, so the rail and the hero lift cannot be read and easing cannot be judged (D-06). |
| 8 | Cover + storyboard | 4 | The cover has an unheld umbrella and a hairline wet cue, and the canopy vanishes at thumbnail size. The board stages almost none of the script's actions (D-01, D-04, D-05, D-07). |
| 9 | Shot-card choice and fidelity | 6 | All 11 style-keys exist in `library.json` and all 11 demo TSX files exist (verified). However, several cards fight their beat, one locked param was changed, and the glow budget is miscounted (D-08, D-09, D-15, D-16, D-18). |
| 10 | Aesthetic rules | 6 | R1 ✗ (END hold 0.97 s), R4 ✗ (frame 0→1 whole-frame value pop), Q5 ✗ (the brightest element on the cover is the child, not her sleeve), Q4 count understated, Q9-equivalent floating props (D-11, D-06, D-05, D-16, D-02). |
| | **Mean** | **5.7** | |

**Verdict: revise.** The mean of 5.7 is below 8.5 (and below 9), items 1 and 2 are below 9, eight items are below 8, and 7 Cao plus 12 Trung tickets are open.

### Inspection log

**Cover (`-cover.png`, frame 0), elements checked against `script.md` §2.2:**
- Night street, mid-shot: ✓.
- "She holds the black umbrella": ✗. The shaft runs from the canopy tip (433, 248) to a hook at (575, 1640), close to the ground. Her hand sits at about (835, 1130) and the child's at about (465, 1320). Neither hand touches the shaft.
- Tilt toward the child: ~ only. The canopy spans x 50–860 and her head (x 650–845, y 530–770) sits directly under its right half, so at thumbnail size the umbrella reads as covering both of them. The rim's shadow on the child is not visible.
- Child at "about her shoulder height": ~. The child's crown is at y 910 against her shoulder at y ≈ 760, so the child reaches about chest height.
- Wet stripe from shoulder to elbow: ✗ as a value cue. There is one thin specular line at x ≈ 850, y 810–1110 and no darker band. At 1/3 size it disappears. The line is on the viewer's right of a camera-facing figure, which is her **left** sleeve; the script locks "her right sleeve" as a through-line.
- Child matte and dry: ✓. The child is the brightest mass in the frame.
- Wet pavement sheen: ✓ (y > 1700).
- Rim beads: ✓ (11 dots along the rim). The drips are barely visible.
- One lit window across the street: ✓ (x 885–980, y 370–490).
- Sodium lamp behind: ✓ (top left). It also throws a warm edge down the left side of both coats (her coat x 605–640, y 880–1360; child x 310–330), which spends warmth before L1.
- Headline `Ai che ô cho bạn?`: diacritics ✓. It is printed on the canopy and the shaft passes through "ô ch". The glyph top is at y ≈ 352, against the pack band of 360–540.

**Style-1 (hook f84):**
- Headline still up, which is correct inside the s1 slot.
- Caption `Mọi người thường tìm đến bạn / mỗi khi có chuyện buồn.`: 62 px, diacritics ✓, glyph bottom ≈ 1690.
- Accent words `tìm đến bạn` and `chuyện buồn` are **not** coloured.
- Umbrella still unheld; the hook dangles at y ≈ 1600 behind the caption.
- The canopy is now clipped off the left edge.

**Style-2 (a1 turn f112), against `script.md` s2a/a1/s2b:**
- Kitchen doorway: ✗. There is no kitchen cue (no table, counter, wall detail), only a blank grey gradient and a door slab on the right.
- Glass "on the table": ✗. Both glasses stand on the floor line at y ≈ 1260–1420, scaled to knee height. Her empty glass is overlapped by her own translucent legs (x 750–880).
- "The other person's shoulders visibly drop" while the line says `Vai người khác chùng xuống`: ✗. That figure stands upright and neutral, with no head-on-hands and no slump.
- The other person is the `Child` plate (grey dry coat, same hood) at adult height (y 410–1390), so it reads as the cover's child, enlarged.
- L1 "warm sliver from the doorway reaches the edge of her collar": ✗ in physics. The door's warm band is on her right (x 730–790), but the glow blob sits on her left collar (≈ 650, 525) and reads as a floating orb, not a sliver.
- `Còn bạn thì đứng ngoài`: ✗. She stands in front of the lit doorway, and the other person stands in the same dark space as her. Nobody is "inside" the warmth, so "outside" is not staged.
- Caption: diacritics ✓; no accent colour on `chùng xuống` / `đứng ngoài`.

**Style-3 (END f86), against `script.md` END + s10:**
- Umbrella tilted back over her: ~. The canopy now reaches over her head, but the hook ends beside the **child's** hand (≈ 265, 1640), so it reads as the child holding the umbrella. That contradicts §6.4 ("the child: nothing") and s10 ("the same hand [the saved name] … touches the umbrella handle").
- Warm cup beside the phone: ✗. The "cup" is an amber square floating mid-air (557–612, 1488–1535) with no surface.
- Missed call still on screen: ✗. The "phone" is a pale translucent rectangle over her shins (650–740, 1500–1670); no call UI and no `minh hoạ` label is legible.
- Title: Literata, diacritics ✓ (`yếu đuối`, `chỉ đã mạnh mẽ`). Line 1 crosses her neck and shoulders, the umbrella shaft cuts through near `không` / `chỉ`, and line 2 (amberHot) ends over her amber coat rim at x ≈ 860, where the contrast collapses.
- Child: smaller (crown 1170 → feet 1850) and **lower** than her feet (1700), so it is nearer the camera yet smaller, which breaks depth. The coat is darker than on the cover. The feet sit in the bottom 210 px.
- Wetness "0.90, wetter than frame 0": not readable. The sleeve cue is still a hairline under the amber rim.

**Side by side (cover / style-1 / style-2 / style-3):**
- Her plate, palette and caption style are consistent.
- The child's height ratio is 0.68 on the cover and ≈ 0.59 in END, with its value darker in END.
- The "other person" in style-2 shares the child's design.
- The light logic breaks in style-2 (collar glow on the side away from the door).

**Motion strip (`-motion-hook.png`, 24 tiles at 12 fps, read left to right):**
- Tile 1 (f0) has a bright pavement band and no caption.
- Tile 2 has a dark pavement and the caption half in. That is a whole-frame value change in ~2.5 frames: a pop, not an eased move.
- Tiles 3–24 are near-identical. No parallax spacing between near, mid and far layers can be measured, and the hero lift is not visible. The spacing therefore cannot show the easing curve; the strip reads as a held still.
- The canopy is almost invisible at strip scale (black on navy). Only the shaft line and the rim dots remain, so the film's central object drops out at thumbnail size.

**Storyboard (`-board.png`, 16 tiles), shot by shot against `script.md` §3:**
- S1: unheld umbrella (same as the cover).
- S2A: ✗. Only one figure is shown, although the line needs the other person (mouth open, nodding), and she is not finishing anyone's sentence.
- A1: ✗. Only one figure, so the line "Vai người khác chùng xuống" has no one to show.
- S2B: ✗. The other person is absent and the "half-turned toward the hall" pose is not shown.
- S3: ✗. The line is `ngồi rất lâu trước màn hình điện thoại`, but she **stands**. There is no phone, no push-in on her head and no furled umbrella dripping by the door; the phone light is drawn as a halo around her head.
- A2: ~. The window and orbs are present, but she is a full figure, not "a dark shape at the edge".
- S4: ✗. No over-the-shoulder shot, phone, chat input or far window.
- S5: ✗. She stands, so the knees-up pose is missing.
- IMG1: ✗. No phone and no face-down turn.
- S6: ✗. No incoming-call screen, only a box with `minh hoạ`.
- S7: ✗. The tile says "furled umbrella in her lap", but she stands with no umbrella, and the glass from s2a is not shown.
- S8: ✗. No hands on an umbrella.
- S9: ~. Same street; the canopy is now warm. Two script requirements are missing: "her own doorway is behind her in frame" and someone holding the umbrella.
- IMG2: ~. The tilt is unchanged from S9.
- S10: ✗. No hand, cup or phone with the missed call, and no hint of the freeze-orbit.
- END: ✗. The tile is the doorway interior, which contradicts style-3 (street).

**Card validation:**
- `library.json` contains all 11 style-keys: `multiplane`, `spotlight-sweep`, `sheen-sweep`, `corner-spotlight-reveal`, `glow-orb-ambient`, `glass-pill-dictation-typing`, `error-retype`, `hashtag-to-pill-materialize`, `theme-sweep-toggle`, `bullet-time-freeze-orbit`, `blur-slide`.
- All 11 demo TSX paths in §9 exist under `skills/video-shotcraft/demos/`.

### Tickets

`id | severity | where | evidence | concrete change | owner | acceptance check`

#### Cao

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| D-01 | Cao | cover, style-1, board S1/S9/IMG2/S10, style-3 | The shaft ends in a free-hanging hook near the ground (cover 575, 1640). Neither figure's hand touches it, which contradicts `script.md` §2.2 "She holds the black umbrella out over the person beside her". In style-3 the hook sits at the child's hand, which contradicts §6.4 and s10. | Give `Figure` a gripping hand on the shaft. Shorten the shaft so the hook sits in **her** hand, at her side nearest the child, with the arm extended toward the child. At s10/END, add the saved name's hand entering frame on the handle; the child never touches it. | design-agent | Cover, style-1, s9 and END frames show her hand closed on the shaft (≤ 10 px gap). At s10/END a third hand from off-frame is on the handle. The child's hands never meet the shaft. |
| D-02 | Cao | `design-spec.md` §5 prop list; style-3 cup/phone | The kit has no `Phone`, `Hand`, `Cup`, `Table` or `Glass-on-surface` prop, although the script drives s3–s6, img1, s10 and END with them and the brief names "a hand reaching out". In style-3 the cup floats at (557–612, 1488–1535) and the phone is a ghost rectangle over her shins. | Add `Phone` (states: dark, typing, incoming call, missed call, face-down), `Hand`, `Cup` and a `Surface` (step/bench by the doorway for END, kitchen table for s2a–s2b, s7) to §5 and the kit. Put the cup and phone **on** a surface. Show the missed-call screen with a legible `minh hoạ` label inside the pack's 620–980 band. | design-agent | Re-rendered style-3 shows the cup and phone resting on a visible surface with a contact shadow, a missed-call UI readable at 1/3 size, and `minh hoạ` ≥ 32 px. §5 lists the new props. |
| D-03 | Cao | style-2 (a1 f112), board S2A/A1/S2B | The line `Vai người khác chùng xuống` is spoken over an upright, neutral other person. The "other person" is the `Child` plate at adult height (spec line 140). There is no kitchen or table, the glasses stand on the floor, and her leg passes over her own glass. Board S2A/A1/S2B show no other person at all. | Build a distinct adult "other person" plate (different coat colour **within** the soft-grey family, a different hair mass, no hood) seated at a kitchen table, head dropping and shoulders lowering through a1. Put both glasses on the table: theirs with water, hers empty, in clear view and not occluded. Stage her standing **outside** the warm room (in the dark hallway, door frame between them) so `đứng ngoài` is literal. Fix the board tiles to match. | design-agent | At a1 the other person's shoulder line drops ≥ 10 px between f0 and the line's last word, and both glasses sit on the table unoccluded. The warm room contains the other person and not her. The figure is not the Child plate (different silhouette at thumbnail size). |
| D-04 | Cao | board S2A, S3, S4, S5, IMG1, S6, S7, S8, S10, END | 11 of 16 tiles reuse one standing-by-the-door composition. s3 says `ngồi rất lâu` but she stands. s4's over-the-shoulder shot and chat input, s5's knees up, img1's face-down phone, s6's incoming call, s7–s8's umbrella in her lap and s10's hand, cup and missed call are all absent. Rubric item 8 fails. | Re-draw every tile to its `script.md` §3 staging: s3 seated, phone-lit head, furled umbrella dripping by the door; s4 over-the-shoulder on the phone with the input bar and far lit window; s5 knees up; img1 phone face-down; s6 incoming-call UI; s7 seated, furled umbrella in her lap, the s2a empty glass behind her, sliver on her hands; s8 hands on the umbrella; s10 hand plus cup plus missed-call phone plus the rim tilting; END matching the chosen END location (see D-13). | design-agent | Each of the 16 tiles shows the action its script row names, verifiable by a reviewer with the label covered. No two interior tiles share the same pose and framing. |
| D-05 | Cao | cover (her sleeve x ≈ 850, y 810–1110); `design-spec.md` §1 line 44 | The thesis cue is a 1–3 px specular line with no darker shoulder-to-elbow band, invisible at 1/3 size. The child (luminance 116 to 132) is the brightest mass, so the eye goes to the dry figure first, which breaks the spec's own Q5 claim. The spec's "2.7× luminance gap" is arithmetically wrong: 116 / 87 ≈ **1.33×** (a `01-status-truth` error). | Paint a clearly darker, glossier wet band from shoulder seam to elbow (value well below the coat, plus a 6–10 px broken specular and 2–3 visible drips off the elbow). Add a dark wet patch on her shoulder. Reduce the child's coat value so the wet band and specular are the frame's strongest contrast. Correct the §1 number. | design-agent | At 360 px width the wet sleeve is the first thing read (reviewer check). The sleeve band is measurably darker than the rest of her coat. §1 states the correct ratio. |
| D-06 | Cao | motion strip tile 1 → 2; spec §10 R4 / declared violation 3 | Tile 1 has a bright pavement and no caption; tile 2 has a dark pavement and the caption half in. That is a whole-frame value pop in the first ~3 frames, while spec R4 claims 0. Tiles 3–24 are near-identical, so the 78 f rail and hero lift are not visible. The "27 % pixel change" figure is most likely this pop plus the caption, not the rail. | Make frame 0's pavement and grade identical to frame 1 (the cover is the first played frame, not a separate still). Give the rail enough travel to read at 12 fps sampling (visible near/mid/far differential across the 24 tiles) with the asymmetric drive curve. Re-measure the motion with the caption layer excluded. | design-agent | A new strip shows no tile-to-tile global luminance jump > a few %. The parallax displacement grows non-uniformly across tiles (eased spacing), and the near layer moves visibly more than the far layer. The spec's motion figure is re-measured on the visual layer only. |
| D-07 | Cao | cover / motion strip canopy | At strip scale (~1/6) and at 1/3 size the black canopy merges with the navy sky; only the shaft and the rim dots remain. The film's central object is not legible as a thumbnail. | Separate the canopy from the sky: a cold rim light from the sodium lamp along the canopy top edge, a lighter sky or fog band behind the canopy, and stronger rim beads. Keep the canopy black but give it a readable silhouette. | design-agent | The cover downscaled to 360 × 640 shows the umbrella silhouette clearly against the sky (reviewer check, plus measured edge contrast). |

#### Trung

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| D-08 | Trung | spec §9 s2a/a1/s2b `spotlight-sweep` | The card is a swinging theatre spot over a dark title (`use: 暗场大标题揭示开场`). A doorway's light does not swing on a pendulum. Running the bright copy under a moving spot in s2a also lights the scene with a warm event **before** L1, "the one arrival". | Drop the pendulum for s2a/s2b. Use a door-gap widen (a mask that is a vertical sliver which opens), so L1 at a1 is the first and only warm event. If the card is kept, use only its dark-copy + mask mechanism without the swing, and declare the deviation. | design-agent | §9 states that s2a carries no warm moving light, and the a1 prototype shows the sliver geometry anchored to the door edge. |
| D-09 | Trung | spec §9 s3 `corner-spotlight-reveal` | The card's locked rule is that the end radius covers the frame, so the frame ends fully lit. The script says s3 is "lit **only** by the screen", the coldest frame. The two contradict each other. | Either cap the reveal at the phone-lit head (declare a deviation from the card's end-radius rule) or choose a card whose end state is a small pool of light. | design-agent | §9 s3 row states the resolved end state, and it is consistent with "lit only by the screen". |
| D-10 | Trung | style-3 title (y 792–974) | Line 1 crosses her neck and shoulders. The umbrella shaft cuts through glyphs near `không` / `chỉ`. Line 2 (amberHot) ends over her amber coat rim at x ≈ 860, where the contrast collapses. | Re-stage END so the 760–1120 band is clear of the figure and shaft (move her right and down, or move the shaft out), or add a soft local scrim. Keep line 2 off any amber surface. | design-agent | No figure, shaft or rim pixels sit behind any title glyph, and the line-2 glyph contrast against its local background is ≥ 4.5:1. |
| D-11 | Trung | spec §10 R1; style-3 END | The END title's last word lands at f67 of 96, leaving a 29 f hold (0.97 s). That is below R1's ≥ 1 s and below the `blur-slide` card's "≥ 1 s true hold". Marked ✓ in §10. | Land the last word ≤ f60, or lengthen the card, so the true hold is ≥ 30 f (prefer ≥ 1.5 s for a 3.2 s silent card). Correct §10. | design-agent | §10 states a measured hold of ≥ 1.0 s, and the render confirms the last word is settled at least 30 frames before the end. |
| D-12 | Trung | spec §3 differentiation list; `src/videos/met-khong/kit.tsx`, `src/videos/cuoc-goi-nho/kit.tsx` | The spec compares against 4 videos only. `met-khong` is a navy `#141A24` room with a single warm `LAMP #FFC46B` and stick figures, and "Mệt không?" sits close to s4 "mình mệt quá". `cuoc-goi-nho` has a night rain window, a phone call or missed call as its payoff, round-head dot-eye figures and `AMBER #F2A65A`, which overlaps s6/s10. | Add both to §3 with concrete structural differences. In frame terms, keep the interior shots from becoming "navy room plus one lamp plus phone" (lean on the wet-cloth / umbrella grammar indoors too), and make the s6/s10 call UI visibly different from `cuoc-goi-nho`'s pill call card. | design-agent | §3 lists both with frame-level differences, and the s6/s10 UI tile is visibly distinct from `out/qa/cuoc-goi-nho-cua-me-v2-s8-silent.png`. |
| D-13 | Trung | board END tile vs style-3; s10 location | The board END tile is a doorway interior and style-3 END is the street. s9 asks for "her own doorway behind her" on the street, which neither frame shows. | Choose one location for s9 → s10 → END (recommended: the street outside her own lit doorway, with a step or bench as the surface for cup and phone) and draw all three in it. | design-agent | Board S9, S10 and END tiles and style-3 share one location with the doorway in frame. |
| D-14 | Trung | style-3 child; cover vs END | The child is smaller (crown 1170 → feet 1850) yet placed lower than her feet (1700), so it sits nearer the camera but smaller, which breaks depth. The child's value is darker than on the cover. The feet are in the bottom 210 px. | Keep the child's height ratio (≈ 0.68 of hers, or the script's "shoulder height") and its ground line consistent with hers. Keep the child's coat the lighter, dry value. Keep the figure above y 1710 or crop deliberately at frame edge. | design-agent | The ratio of the child's height to hers is within ±5 % of the cover. The ground lines are consistent with the depth order. No figure feet sit at y > 1710 unless cropped by the frame edge. |
| D-15 | Trung | spec §9 s10 `bullet-time-freeze-orbit` | The card orbits rotateY 52–55° around a flat UI plane. On flat SVG figure plates a 52° orbit will read as cardboard cut-outs turning, which the spec's own row warns about at > 70°. The card is a "tension" camera on the warmest, steadiest, release beat, which fights the spec's "slow, weighted, few moves" personality. Not prototyped. | Prototype one s10 frame mid-orbit and judge it, or replace with a slow lateral push or a rack between hand and phone that keeps the freeze idea without rotateY on flat plates. | design-agent | One rendered s10 mid-move frame is attached and does not show plate edges or cut-out flattening. |
| D-16 | Trung | spec §9 budget audit; Q4 | "Glow effects in the whole film: 2" ignores the s2a/s2b spotlight copies, the s3 spotlight reveal, the a2 glow orbs and the s9 boundary's 18 px glow. Seven shots are light-reveal devices (s2a, a1, s2b, s3, a2, s7, s9), which is the homogeneity P4 warns about. | Recount honestly, then cut one or two of the light devices (s2a/s2b per D-08 are the natural cuts). Restate the budget. | design-agent | The §9 audit lists every light/glow event by shot, and the total matches the shot table. |
| D-17 | Trung | style-1, style-2 captions | Accent words (`tìm đến bạn`, `chuyện buồn`, `chùng xuống`, `đứng ngoài`) are not rendered, although spec §4 / `content-pack.md` §1 define an accent slot. Rendering them in amberHot at s1 would also break "amber absent at frame 0". | Render the accents in a non-amber accent (for example `grey3` with a weight or size bump, or a cold `sheen`) through s1–s8, and switch the accent to amber only from L1 / L3 onward. Declare this in §2/§4. | design-agent | Style-1 and style-2 show the accent words visibly distinct, and no amber pixel appears in a caption before a1. |
| D-18 | Trung | cover warm coat edges vs a1 L1 | The frame-0 sodium edge on both coats (her coat x 605–640, y 880–1360) is close in hue to L1's collar glow, so "the one warm arrival" does not read as new at a1. | Push the L0 sodium edge colder and dimmer (desaturated, lower value), or remove it from the figures and keep it only on the lamp and pavement, so L1's amber is the first saturated warm light on a body. | design-agent | A side-by-side crop of the cover coat edge and the a1 collar shows a clearly different hue and saturation (reviewer check, with measured hex in §1). |
| D-19 | Trung | style-2 L1 placement | The warm door band is on her right (x 730–790), but the glow blob is on her left collar (≈ 650, 525) and reads as a floating orb. | Put the sliver on the collar edge nearest the door and shape it as a narrow wedge clipped by the door-gap geometry, not as a radial blob. | design-agent | At a1 the sliver touches the collar on the door side and its shape is a wedge continuous with the door gap. |

#### Thấp

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| D-20 | Thấp | cover headline | The headline is printed on the canopy, the shaft passes through "ô ch", and the glyph top at y ≈ 352 is outside the pack band of 360–540. | Move the headline into the sky above the canopy, or below the canopy rim but clear of heads, inside 360–540, with no shaft crossing. | design-agent | The headline glyph box is inside 360–540 with no canopy, rib or shaft pixels behind it. |
| D-21 | Thấp | spec §9 s1 locked params | The card's rail coefficients 0.35/0.7/1.4 were changed to 0.35/1.0/1.4 in the column titled "may not be weakened". A mid layer moving at 1.0 equals the camera and adds no parallax for the hero. | Restore 0.7 for mid, or justify the change with a rendered comparison. | design-agent | §9 states 0.7 or attaches the comparison. |
| D-22 | Thấp | cover sleeve side | For a camera-facing figure the wet stripe sits on her **left** arm, while the script locks "her right sleeve/shoulder" as the s7/s9/img2/s10 through-line. | Mirror the cover (child on viewer-right, so her right arm is the exposed, outer one), or record the side in the spec as an explicit, script-consistent choice. | design-agent | The wet side in every frame equals the script's "right sleeve" for the figure's orientation. |
| D-23 | Thấp | cover rain | Rain streaks are drawn inside the canopy footprint, for example over the child's hood area around (390, 1020), which undercuts "the child is dry". | Mask the rain layer under the canopy footprint. | design-agent | No rain streak pixels inside the canopy's shadow cone. |
| D-24 | Thấp | `design-spec.md` §13.2 | The spec defers proof of s7 and s9 (the two hardest 9:16 re-fits) entirely. | Render one s7 mid-sweep frame and one s9 mid-boundary frame in the next round. | design-agent | Two extra PNGs are attached and judged. |

### Previous fixes verified
None. This is round 1, and no prior `design-review.md` exists.

### Cannot verify
- **Card fidelity against the gallery samples.** `skills/video-shotcraft/gallery/media/poster/` has no posters for these style-keys (only `.mp4` files exist, e.g. `media/multiplane.mp4`), and I cannot play video. The demo motion grammar was not compared against the strip.
- **Motion outside the 2 s hook strip.** a1 iris timing, s4 typing cadence, s6 hard cuts, s7 sheen, s9 boundary, s10 orbit and the END blur-slide easing are all unverified. Only planned values in §9 were read.
- **Pixel luminance claims** in spec §1 (no pixel sampler available to me). Only the arithmetic error was checked.
- **Audio / SFX** (S1–S5): out of scope for gate D.
- **`python3 -I scripts/pipeline.py audit ban-khong-yeu-duoi-chi-da-manh-qua-lau`**: **not run.** This reviewer session has no shell tool, so its result is unknown and nothing in this review claims it passed. The director must run it.

### Top 3 fixes
1. **D-01 / D-02.** Make the umbrella held (her hand at the hook, then the saved name's hand at s10/END) and add the missing phone, hand, cup and surface props so every scripted object exists and rests somewhere.
2. **D-03 / D-04.** Stage a1 literally (a distinct adult slumping at a lit kitchen table, her outside it) and re-draw the board so every tile performs its script row (seated phone at s3, knees up at s5, umbrella in her lap at s7, and so on).
3. **D-05 / D-06 / D-07.** Make the cover thesis read at thumbnail size (a dark wet sleeve band, a readable canopy silhouette) and remove the frame 0→1 value pop so the hook rail actually reads as eased motion.

**score: 5.7  verdict: revise**
