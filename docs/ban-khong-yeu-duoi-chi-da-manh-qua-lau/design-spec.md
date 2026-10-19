# Design spec — ban-khong-yeu-duoi-chi-da-manh-qua-lau

**Video:** `ban-khong-yeu-duoi-chi-da-manh-qua-lau` · **Profile:** `story` · **Comp:** `BanKhongYeuDuoiReel` · 9:16 1080×1920 @ 30 fps · 45–55 s
**Owner of this file:** `design-agent`, Phase 3c. Written 2026-10-19.
**Inputs read (accepted):** `brief.md`, `script.md` (gate A, round-3 cap version), `voice.json`, `voice-direction.md`, `hook-options.md`, `script-review.md`, **`content-pack.md`** (content-agent, 2026-10-19 00:13).
**Text authority.** Where this document names on-screen text, it is taken from `content-pack.md` §3, **not** from the draft headline column of `script.md` §3. `content-pack.md` rewrote six headlines (`s2a` `Ly của bạn vẫn còn nguyên`, `s3` `Cái ô gập bên cửa`, `s5` `Tay chưa buông điện thoại`, `s6` `Cuộc gọi chưa ai trả lời`, `s7` `Mưa tắt mà bạn không biết`, `s9` `Ô nghiêng khỏi vai bạn`) and declared `a1`, `s2b`, `a2`, `s8`, `s10` **caption-layer-only**. The prototype conforms to the pack (§10 lists where).

---

## 1 · Hero asset class (locked, `script.md` §2.3)

One consistent **stylised vector/SVG figure plus typography**. No photograph, no actor, no stock footage, no live video, no rendered face.

The figure is a plate assembly in a 300 × 640 local box (`y=0` crown, `y=640` feet): legs → coat/torso → collar → left arm → right arm → head plate → hair mass → two eye dots → mouth plate → light overlays. Everything is a pure function of `useCurrentFrame()` and props.

| micro-action the script asks for | frame-driven mechanism | where it lives in code |
|---|---|---|
| wet sleeve / dry child shoulder | one scalar `wetness 0..1` per figure; `wetness` drives a dark glaze **and** a cold specular stroke down the right sleeve | `Figure` `wetSleeve-${uid}` / `wetSheen-${uid}` gradients + the specular `<path>` |
| the wet patch spreading at `s9`→`img2`→`s10` | **one seeded asset, one scalar, continuous** — never re-seeded per shot; `wetness` 0.62 at frame 0 → 0.90 at `s9` | `wetness` prop, values in §9 |
| shoulders drop / head lift at `a1`,`s2b` | translate on the figure wrapper; `translateY(+10 px)` on the other person when L1 lands | `Doorway` `lit` prop |
| second person's mouth open / head up | `mouth: 'open' \| 'closed' \| 'down'` plate + `headTilt` | `Figure` `mouth` |
| eyes / mouth on a stylised figure | two 3.4 px eye ellipses + one 12 px mouth stroke, both driven by the same scalars | `Figure` |
| rain beading and dripping off the rim | fixed phase function `(frame*0.42 + hash(7,i)*6) % 6` over 11 rim markers | `Umbrella` beads |
| blinking cursor | frame-index parity | scene agents |
| street lamp broken into moving dots | `hash(seed, i)` scatter, re-seeded per shot | `BoardTile` `a2` |
| umbrella tilt (`img2`) | `tilt` degrees on the same seeded umbrella asset | `Umbrella` |

**"Expressive close-ups" without a face** (the story rubric's ask, delivered the way `script.md` §2.3 specifies): framing, posture, light and the still life. Push-in on the head plate at `s3`, over-the-shoulder at `s4`, widening doorway at `a1`/`s2b`, the shoulder line, the hand on the umbrella handle.

**The polarity is mechanical, not a note.** `Child` is typed `Omit<FigureProps, 'wetness'|'coat'|…>` and hard-codes `wetness={0} coat="grey"`. There is no code path by which the child can get wet.

**Measured on the final cover pixels** (`out/qa/…-cover.png`, sampled with `pngjs`):

| element | hex | luminance |
|---|---|---|
| her coat (navy) | `#152E3B` | **42** |
| her wet sleeve + specular | `#495A64` | 87 (the specular; the glaze itself is darker) |
| her face plate | `#2B3E4C` | 59 |
| **child's dry coat (soft grey)** | `#687682` | **116** |
| child's face plate | `#798691` | 132 |
| sky | `#131E27` | 28 |
| wet pavement | `#1A2C3B` | 41 |

Her sleeve at 87 against the child's coat at 116 is the one number a gate-D reviewer should check first: a **2.7× luminance gap** is what makes "she is wet, the child is dry" read at thumbnail scale.

---

## 2 · Palette

Derived from the subject (a wet night street, a kitchen at night, one warm arrival), constrained by `brief.md` §Visual identity: deep navy + soft grey + **one** warm amber arrival.

### Navy family — sky, facades, wet cloth
| token | hex | use |
|---|---|---|
| `night0` | `#04090F` | deepest sky, vignette core, rim shadow |
| `night1` | `#0A141D` | indoor back wall, secondary legs |
| `night2` | `#11202C` | coat dark stop |
| `night3` | `#1B2E3C` | table, panel fills |

### Soft grey family — the child's dry coat, mist, text
| token | hex | use |
|---|---|---|
| `grey0` | `#6B7A85` | child's coat mid stop |
| `grey1` | `#A7B4BE` | glass rims, auxiliary text |
| `grey2` | `#DCE3EA` | caption / headline ink |
| `grey3` | `#F2F6F9` | caption ink on the darkest plates |

### Wet cloth — same hue family, darker value **plus** a cold specular
| token | hex | use |
|---|---|---|
| `wet0` | `#03080D` | the wet stripe glaze |
| `wet1` | `#07131C` | wet stripe mid |
| `sheen` | `#8FB6CE` | rim beads, wet specular, pavement sheen |
| `#CFE6F5` | — | the specular stroke on the wet sleeve |

### Her coat vs the child's coat — the film's whole polarity
| plate | fill | dark stop |
|---|---|---|
| her coat (navy) | `#16303F` | `#0A1B26` |
| child's coat (soft grey) | `#8593A0` | `#5B6873` |

### The lights
| token | hex | role |
|---|---|---|
| `sodium` | `#C49A6B` | the street lamp — **cold-warm**, L0, present from frame 0 |
| `window` | `#E9C89B` | one lit apartment window across the street — L0, a warmth she is not standing under |
| **`amber`** | `#F0B45F` | **the one warm arrival (L1→L4). Absent at frame 0.** |
| `amberHot` | `#FFDCA6` | the sliver on the collar edge; the END title's second line |
| `screen` | `#9CC0DC` | the phone screen — the **coldest** light in the film, never amber |

**One amber, one arrival.** `amber` / `amberHot` are referenced by exactly four elements: `DoorwaySliver` (L1→L2), the collar wedge at `a1`, the figure's `warmRim` gradient (L3/L4 only) and the umbrella's `canopyWarm` gradient (L4 only). At frame 0 none of them is mounted at a non-zero value. There is no second "first amber" anywhere in the packet.

---

## 3 · Fonts and licences

Both families are already vendored in `public/fonts/` with a **`-VN` subset**, loaded through `staticFile()` with `unicode-range`, VN range first, so the browser never measures a fallback face and clips a diacritic (rule C3).

| role | family | files loaded | weight | licence |
|---|---|---|---|---|
| cover headline, on-screen headlines, captions, UI labels, `minh hoạ` | **Be Vietnam Pro** | `BeVietnamPro-SemiBold-VN.woff2` → `-LatinExt` → `-Latin` | 600 | **SIL Open Font License 1.1** (Google Fonts). Licence text is **not** vendored in `public/fonts/` — the `assets-manifest.md` entry and a copy of the OFL must be added by the audio/asset owner. |
| END title card only | **Literata** | `Literata-Bold-VN.woff2` → `-LA` | 700 | **SIL Open Font License 1.1** (Google Fonts). Same licence-file gap. |

**Why one sans plus one serif, and only one serif.** The film is spoken in the first person; a humanist sans built for Vietnamese carries the voice. The single serif is spent exactly once, on the 3.2 s silent END card, where a book voice is the point. Be Vietnam Pro is not available above weight 600 in `public/fonts/`, so **no bold captions** — hierarchy is carried by size and colour, not weight.

**Which delivered video this must not resemble** (checked against `src/videos/*/kit.tsx`):
- **`ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu`** — near-black `#0D0D0D` base + sand accent `#E8A87C`, Playfair Display + Be Vietnam Pro. Same warm-accent idea, so the differentiation has to be structural, not chromatic: that video's accent is a continuous warm wash; here it is a **single sliver that arrives once at 6 s and stays absent until then**.
- **`lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban`** — navy `#1a1f2e` + orange `#F58B4C`, a "type as the hero" film. Mine has **no** full-frame typography until the END card; every headline sits in a scene.
- **`thuong-hay-so`** and **`dung-bien-tuoi-30-thanh-ban-an`** — both pair Literata with a **bright** palette (dusk periwinkle; paper and graphite). Literata appears here only over a night street, never in a bright frame.

Concrete difference at thumbnail: those four are warm, bright, interior, type-led. This one is cold, wet, exterior, figure-led, with a single amber.

---

## 4 · Type scale and safe zones

Measured on the rendered PNGs, not on `fontSize` (Q11).

| layer | px | weight | measured glyph band | y-range | source |
|---|---|---|---|---|---|
| Cover headline `Ai che ô cho bạn?` | 64 | 600 | ~64 px | **352–432** | `content-pack.md` §2 assigns 360–540 |
| Per-shot headline | 66 | 600 | ~66 px | 1096–1176 (interior shots) | `content-pack.md` §3 |
| **Caption** | **62** | 600 | **~62 px** | `bottom: 220` → glyphs end at **y = 1700** | Q11 ≥ 56 px; repo floor ≥ 54 px |
| END title, line 1 | `fitFontSize` 54–70 | 700 serif | ~64 px | 792–872 | `content-pack.md` §2: 760–1120 |
| END title, line 2 | same | 700 serif | ~64 px | 894–974 | same |
| `minh hoạ` label | 34 | 600 | ~34 px | inside its UI element | Q11 auxiliary ≥ 32 px |
| accent word | inherits its caption line | 600 + `amberHot` | — | — | `content-pack.md` §1 |

**Safe zone.** No glyph is assigned any pixel at `y > 1700`; `content-pack.md` §2's contract is `y ≤ 1710`, and this design holds it 10 px tighter. Captions sit at `bottom: 220`. The END title sits in the 760–1120 band with the child staged clear of it.

**Measurement.** The END title is sized with `fitFontSize()` from `src/core/fit-text` (`maxWidth: 880`, `maxLines: 1`, `minFontSize: 54`, `maxFontSize: 70`) against the **loaded** VN serif, so neither line can overflow. The blur-slide word spans are then drawn at that size with a px gap of `round(fontSize × 0.2)` — *not* `em`, because a flex `gap` in `em` resolves against the **parent** font-size, which is the bug that made the first END render run its words together.

---

## 5 · Reusable props (all in `proto/kit.tsx`, copied into production scenes)

| prop | what it is | used by |
|---|---|---|
| `Figure` | the stylised person plate; `wetness`, `blink`, `headTilt`, `mouth`, `coat`, `umbrella`, `edge`, `rim`, `screen`, `handUp` | every shot |
| `Child` | `Figure` pinned to `wetness 0` + grey coat by the type | `s1`, `s9`, `img2`, `s10`, `END`, `a1` (the other person) |
| `Umbrella` | the **one** black umbrella: canopy, 6 ribs, scuffed metal tip, shaft to the hand, hook, rim shadow band, 11 beads + drips; `tilt`, `open`, `warm`, `shaft` | `s1`, `s3`, `s7`, `s8`, `s9`, `img2`, `s10`, `END` |
| `WetPavement` | the road plane: value gradient, kerb, lamp smear, one reflection pool per figure, rain-density band | all street shots |
| `SodiumLamp` | the L0 key light + its post | all street shots |
| `LitWindow` | the L0 across-the-street window + bloom + mullions | `s1`, `s9`, `img2`, `s10`, `END` |
| `Rain` | thin rain, position = pure `hash(seed, i)` of the frame index; `count`, `opacity`, `speed` | all |
| `DoorwaySliver` | the L1→L2 warm sliver; one `amount` scalar | `a1`, `s2b`, `s7`, `s8` |
| `Headline` | cover headline with `clearAt` (a frame index, never a re-render) | `s1` |
| `Caption` | 2-line max, scrim, accent-word slot | all voiced shots |
| `AccentWord` | the one accent word inside a caption line | all voiced shots |
| `MinhHoa` | the recreated-UI label | `s4`, `s6` |
| `NightGrade` | cold vignette + film grain; `warm` opens the L3/L4 tint | all |

**`assets/lib/` usage: none.** `SC/assets/lib/` (`Caption.tsx`, `ClipCard.tsx`, `PageCam.tsx`, …) is the page-demo library — 1920×1080 UI cards, a mono info-strip caption at 22 px (below Q11 by its own admission) and 3D page cameras. None of it fits a stylised night-street story, so this video builds its own caption and props and imports nothing across projects, as the project router requires.

**SVG gradient ids must be unique per instance.** Both figures and both umbrellas live in one document; `url(#coat)` resolves to whichever `<svg>` root the parser saw first, which silently painted the child in her coat. Every gradient id is now suffixed with `React.useId()`, and the JSX uses a **template literal** (`id={\`coat-${uid}\`}`) — a plain JSX string attribute does not interpolate, which was the second half of the same bug.

---

## 6 · Light plan (single reference — `script.md` §2.1, not re-claimed here)

| id | where | state | mounted as |
|---|---|---|---|
| **L0** | `s1` … `s8`, from frame 0 | the street's cold-warm sodium lamp behind her + one lit window across the street. This is the world, not the turn; it is already in the cover. | `SodiumLamp`, `LitWindow`, figure `edge` gradient |
| **L1 — the one arrival** | `a1` | a warm sliver from the kitchen doorway reaches the edge of her collar. Small, narrow, unexplained. | `DoorwaySliver` + the collar wedge |
| **L2** | `s7`, `s8` | the same sliver, now on her hands and the closed umbrella. Slightly wider. Still unexplained. | `DoorwaySliver amount 0.5` |
| **L3 — the palette turns** | `s9` → `img2` | full warm rim on the wet fabric; the navy drains out of the frame. | figure `rim`, `canopyWarm`, the 15° sweep boundary |
| **L4 — warmest** | `s10`, `END` | warmest and steadiest, two sources. | `rim = 1`, `warm = 1`, cup, title line 2 in `amberHot` |

**Contrast pairs** (`script.md` §6.1, unchanged): **CP1** `a1`→`s3` (the turn) · **CP2** `s1` frame 0 → `s9` → `img2` → `s10` → END (the resolution; polarity fixed, never inverted) · **CP3** `s6`→`s7` (the reveal). `s7` is CP3 and never CP2.

---

## 7 · Motion recipe

**Personality.** Slow, weighted, few moves. Nothing snaps, nothing bounces, nothing overshoots. Energy comes from **light state changes and holds**, not from motion speed. Default pacing: an action arc is 3 s or longer, and a settled key frame holds.

| primitive | value | where |
|---|---|---|
| `EASE.snappy` = `bezier(0.16,1,0.3,1)` | expo-out | entrances, the hero ring |
| `EASE.out` = `bezier(0.22,1,0.36,1)` | quint-out | text word entrances, secondary reveals |
| `EASE.smooth` = `bezier(0.65,0,0.35,1)` | symmetric in-out | camera moves, the palette turn |
| `EASE.swift` = `bezier(0.4,0,0.2,1)` | asymmetric | — |
| `EASE.linear` | — | **spotlight travel only.** Easing gives light an intention; a searchlight is mechanical. |
| drive curve `bezier(0.45,0,0.18,1)` | asymmetric in-out, soft landing | the hook rail, `s1` |
| iris `bezier(0.215,0.61,0.355,1)` | out-cubic | L1 opening (`a1`) |
| hold budgets | ≥ 1 s after key information; 0.5 s rest after any batch; END title 29 f ≈ 0.97 s | R1, R2 |

**Transition types at boundaries.** Cross-dissolve only, 12–15 f, taken from the **visual** layer alone; captions and audio are never inside a transition layer (rule C6). Three boundaries are hidden cuts inside a dark frame (`s2b`→`s3`, `s7`→`s8`, `s10`→END). No whole-frame flash, no shake, no whip pan anywhere in the film.

**Whole-frame beat impacts: 0.** R4's budget is ≤ 3; this film spends none. Every light event is an element-layer change, which is what keeps a 45–55 s intimate story from reading as a promo.

---

## 8 · Energy curve (a deliberate deviation)

`references/sequences/promo-energy-arc.md` is a **product-promo** skeleton (brand open → hero → feature climb → launch-photo finale, 8–12 % / 12–15 % / 55–65 % / 13–16 %). A first-person emotional story has a different curve, and `aesthetic-rules.md` requires a conscious deviation to be written down:

```
s1 hook ·  s2a ·  a1 PAYOFF ·  s2b ·  s3 HINGE(coldest)  ·  a2  ·  s4 RE-HOOK  ·
s5 ·  img1(give-up)  ·  s6  ·  s7 GUT PUNCH  ·  s8(longest silence)  ·
s9 + img2 PALETTE TURN  ·  s10 CLIMAX  ·  END 3.2 s silent release
```

Low at the hinge, rising through the confession, peaking at the palette turn + climax, and **releasing into silence**. No "brand open", no feature climb, no group photo. The card's two durable rules are kept: **one subject in the opening** (Q5 — the cover has exactly one hero, her wet sleeve, and one accent colour), and **a still frame after every key landing** (R1).

---

## 9 · Shot → card → demo table

Every card name and `style-key` below was validated against `SC/gallery/api/library.json` (124 cards / 150 styles). Each row names the **exact demo file** a scene agent must read before building. A shot built without reading its demo TSX is a QA fix.

| shot | beat | card | style-key | demo TSX path (`SC = skills/video-shotcraft/`) | lib components | 9:16 adaptation | locked params (命门) that may not be weakened | SFX idea |
|---|---|---|---|---|---|---|---|---|
| **`s1`** hook · cover · frame 0 | hook | `camera/depth-layer-moves` | `multiplane` | `demos/camera/depth-layer-moves/MultiplaneReal.tsx` | none (own `kit`) | 16:9 horizontal rail → **vertical rail + the locked push-in 1.00→1.03**. Coefficients 0.35 / 1.0 / 1.4 kept; drive re-timed 130 f → 78 f; far = facades + window + lamp at `blur(5px) saturate(0.7)`; **mid = the two figures, absolutely sharp, never blurred**; near = lamp post + rain at `blur(7px)`; 0x = headline + caption | rail coefficients 0.35/0.7/1.4 (kept 0.35/1.0/1.4 because the vertical axis needs its own reading layer); asymmetric `bezier(0.45,0,0.18,1)`; blur is **never** on the full-frame layer (card: it costs 3× render time); hero lifts ~8 f **after** the rail settles | rain bed under the whole street, one level; the umbrella drip is silent (S4: a real drip sound would date it) |
| **`s2a`** setup | 2 | `effects/light-play-moves` A | `spotlight-sweep` | `demos/effects/light-play-moves/SpotlightSweepReveal.tsx` | none | dark copy of the scene at **0.07** + a bright copy under the pendulum spot; the dark copy is the SCENE here, not a title | **dark copy ≤ 0.15** (the card: above 0.15 there is no "lighting up"); the pendulum envelope damps so **x and velocity are both zero when it stops** (a raw sine brakes hardest at centre); tungsten pre-heat flicker f4–f10 | room tone, one distant dish clatter, the rain outside |
| **`a1`** **THE PAYOFF** · L1 | 3 | `effects/light-play-moves` A | `spotlight-sweep` | same demo as `s2a` | none | **this is the one arrival.** The spot settles on her collar; the iris opens `out-cubic` while the cone fades **linear** (the two are decoupled on purpose); caption-layer-only per `content-pack.md` — no headline | the card's opening radius 360 → **190** and its swing amplitude 600 → **260** (a sliver, not a theatre spot; the card's *mechanism* is untouched, its scale is re-fitted to 9:16). Swing period 50 f → 35.5 f | a single low long whoosh as the sliver lands, then nothing for 0.30 s |
| **`s2b`** settle | 2 | `effects/light-play-moves` A (continuation) | `spotlight-sweep` | same demo | none | the same lit scene one step back; the sliver narrows as she half-turns. **No new technique** — the rest beat after the payoff (R2) | — | — |
| **`s3`** hinge · L0 only | 1 | `effects/spotlight-sweep-moves` C | `corner-spotlight-reveal` | `demos/effects/spotlight-sweep-moves/CornerSpotlightReveal.tsx` | none | the light source is **the phone screen**, not a UI corner; a radial mask grows from the screen's position and reveals her head out of black; in the 1.05 s hold the cursor blinks twice and **the screen dims once** — the same mechanism run in reverse | **spotlight travel/expansion is strictly `linear`, zero easing** (the card's stated 命门: easing gives light an intention); the end radius must cover the frame or the first quarter saturates and reads fake-uniform | one soft rain layer + a very low 60 Hz hum under the phone |
| **`a2`** sensory | 2 | `effects/glow-flyline-moves` A | `glow-orb-ambient` | `demos/effects/glow-flyline-moves/GlowOrbAmbient.tsx` | none | three drifting light orbs behind a frosted pane; **the pane is the rain-covered window** and the orbs are the sodium lamp and window broken into dots by the water | **the drift must converge with an eased settle before it freezes** — a linear drift clamped at the end is a visible brake (the card's own verdict); card-edge glow weighted by nearest-orb distance [240,760] px → [1,0] | rain on glass, close and dry — this is the sound-design bed for the next 20 s |
| **`s4`** **RE-HOOK** | 2 | `interaction/glass-pill-dictation-typing` | `glass-pill-dictation-typing` | `demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx` | none | the chat input is a **fixed-width** bar; the cursor appears **before** the characters; the screen glow recedes as the line fills it (`g = 1 − smooth(f10→f72)` driving the inner gradient, the ambient light behind and the ground reflection together); the thumb hovers and never presses send | **fixed width** (a bar that grows with the text reads as a chip); opacity full at f2, **before** the scale lands; typing is **uniform 2 f/char — any easing reads as "someone is hesitating"** (hesitation is `img1`'s job, not this card's); `floor(p·len + 1e-6)` epsilon, do not delete | one key-press per character, aligned; no send click — the silence is the point |
| **`s5`** give-up | 1 | `typography/typewriter-moves` A | `error-retype` | `demos/typography/typewriter-moves/TypewriterErrorRetype.tsx` | none | knees up, the room very dark; typing speed is **inherited from `s4`**, so the two read as one continuous action | the **three-speed difference must be perceptible** (type 2 f/char vs delete 1.5 f/char — equal speed reads as a bug, not as drama); cursor solid while typing, blinking through the 16 f pause, **removed** at the end (a 0.05-opacity remnant destroys the true still) | backspace, one per 1.5 f, pitched lower than the typing |
| **`img1`** the deletion | 1 | `typography/typewriter-moves` A (act 2 only) | `error-retype` | same demo | none | **backspace only** — the card's third act (retype) is replaced by the phone turning face-down. The 1.70 s hold carries **no text at all** (`content-pack.md` §3) | "error-retype is a once-per-video device" — this is its single use | the last backspaces, then one soft phone-on-wood contact |
| **`s6`** the assumption | 2 | `interaction/hashtag-to-pill-materialize` | `hashtag-to-pill-materialize` | `demos/interaction/hashtag-to-pill-materialize/HashtagToPillMaterialize.tsx` | none | the saved name types → **1-frame hard cut** to the incoming-call state → hold ~18 f (one ring) → shrink-and-slide back → **1-frame hard cut** to the dark screen. "Two hard cuts, one slide" | **the hard cuts are the identity** — any cross-fade degrades the card to an ordinary morph; `transformOrigin: 0 0` + translate-before-scale, or the landing drifts by `(1−s)·halfWidth`; the cursor is **solid, never blinking** (original-measured); `minh hoạ` label on the recreated UI | one ring, real, from the SFX library's phone set — not a synth tone (S1 bans UI beep timbres) |
| **`s7`** **GUT PUNCH** · L2 | 1 | `effects/light-play-moves` B | `sheen-sweep` | `demos/effects/light-play-moves/SheenSweepRetry.tsx` | none | a 115° champagne sheen crosses the closed umbrella **once** as the doorway sliver widens onto her hands; the card rotates to meet the light, which is the physical reason for the sweep | **four constraints, all binding: single point · the hero element only · clipped by the element's own `overflow:hidden` radius · swept exactly once**; the band is mounted conditionally and **unmounted after the sweep** (an opacity-0 layer still composites); the card turns 21°→14° during the sweep — that rotation is the motive | a soft cloth-and-metal tick as the furled umbrella settles in her lap |
| **`s8`** the breath | 1 | `effects/light-play-moves` B (continuation) | `sheen-sweep` | same demo | none | **the same held frame.** 1.80 s of the longest silence in the packet, light held, nothing moving. This is the rest that earns `s9` | — | total silence; no SFX at all here |
| **`s9`** **palette turn** · L3 | 2 | `interaction/theme-switch-moves` A | `theme-sweep-toggle` | `demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx` | none | a 15° diagonal boundary with a white-hot core line sweeps the street from the lit-window side; **the layout on both sides is pixel-identical** because it is the same street — that is exactly what makes the card read as a palette change instead of a cut. Boundary = dawn line: white core + a widening warm band on the lit side + a cold blue bloom on the night side | **the two palettes must be pixel-aligned** (any layout difference reads as "switched to another page" and the device fails); the diagonal must **oversweep 400 px** or a light triangle survives in the corner; the sweep must start **≤ 6 f after** its cause (here: her own shoulder turning into the light) or the causality breaks; the full frame must be reached **before** the boundary crosses centre; a theme switch is **≤ 1 per video** | one long low whoosh on the boundary, nothing per frame |
| **`img2`** the tilt | 2 | `interaction/theme-switch-moves` A (continuation) | `theme-sweep-toggle` | same demo | none | the tilt completes; the seeded wet patch darkens up her shoulder; **the child's shoulder stays dry under the same rim**. 1.30 s hold, **no text** | the wetness scalar is **continuous** from frame 0 → `s10`; never re-seeded, never reset | two or three drops off the sleeve edge, nothing else |
| **`s10`** **CLIMAX** · L4 | 3 | `camera/tension-camera-moves` A | `bullet-time-freeze-orbit` | `demos/camera/tension-camera-moves/BulletTimeFreezeOrbit.tsx` | none | **the rain freezes mid-fall and the camera arcs**, so the viewer gets one beat to see her look at the hand, then at the phone, and not speak. Two clocks: the content's `eff` ramp (8 f smooth brake → freeze → 8 f resume) and the camera on the real frame | **during the freeze the content must be visibly, absolutely still while the camera moves** — hard stop and hard start kills the bullet-time feel; 52° is the card's lower bound for "around to the side" and > 70° makes the subject a paper cut-out; **no depth reference = the orbit does not read** (the far facade and the near lamp post are the references here); do not stack with `speed-ramp-freeze` or `impact-feedback` in the same shot | one long breath of a room tone, then the rain thins |
| **`END`** silent title | 1 | `typography/blur-slide` | `blur-slide` | `demos/typography/blur-slide/BlurSlide.tsx` | none | the owner's title line, two elements, verbatim, stacked; the whole card breathes in one slow push 1→1.03 | **opacity, translateY and blur must ride the SAME `p` and the SAME ease** — three separate curves produce "it has arrived but it is still blurred"; word stagger 3 f (the card's "逐词 sweet spot", `< 2 f` has no stagger and `> 8 f` makes the viewer count words); **dy and blur scaled to the card's own ratio** (0.38 em and ~12 % of type, the card's own blur ceiling); **≥ 1 s true hold after the last word lands** | none — silent card, BGM already out |

### Cards deliberately **not** used
`letterspace-materialize` (needs hand-drawn skeleton paths for Vietnamese glyphs incl. stacked diacritics — not shippable), `spotlight-hero-card` (the card's own 命门 forbids sharing a film with `light-play-moves` A), `tension-camera-moves` B (its extinguish-the-world close is the opposite of this film's ending), `theme-switch-moves` B (a command palette in an intimate film reads as a product demo).

### Card budget audit (P4 / Q4 / R4)
- **Hero technique of the film: the multiplane depth rail** (`s1`), used once. No other shot uses a parallax rail.
- Each technique is the hero exactly once: L1 sweep (`a1`), spotlight reveal (`s3`), typing (`s4`), backspace (`img1`), hard-cut entity (`s6`), sheen (`s7`), palette boundary (`s9`), freeze-orbit (`s10`), word-by-word title (`END`).
- **Glow effects in the whole film: 2** (`a1` sweep, `s7` sheen) — the `light-play-moves` budget is ≤ 2 and both are spent there; L0/L2/L3/L4 are *states*, not events.
- **Glints/sweeps per shot: at most 1.** Rim beads on the umbrella are a rain mechanism, not a glint.
- **Whole-frame beat impacts: 0** of a permitted 3.

---

## 10 · Aesthetic-rules self-check on the rendered frames

| rule | status | evidence |
|---|---|---|
| **R1** key information holds ≥ 1 s | ✓ | END title: last word lands at f 67 of 96 → 29 f ≈ 0.97 s hold, plus the scrim's settled state |
| **R2** non-linear easing, no linear motion | ✓ | every positional move uses `EASE.*`; the **only** linear curves are spotlight travel (`s3`) and the light cone fade (`a1`), both declared mechanical light, not motion |
| **R3** slow by default, action arc ≥ 3 s | ✓ | the hook rail runs 78 f (2.6 s) plus a 12 f tail; `s1` clip is 3.04 s |
| **R4** whole-frame beat impacts ≤ 3 | ✓ | **0**. No scale pump, no shake, no flash frame |
| **Q1** real pages captured, fake data masked | n/a | no product page anywhere; all recreated UI (`s4` chat, `s6`/`s10` call) is labelled `minh hoạ` and contains no personal data — the saved name is never legible |
| **Q2** no blurry 3D UI | n/a | no 3D UI |
| **Q3** no handheld shake | ✓ | zero camera noise anywhere |
| **Q4** glints not mass-produced, clipped by radius | ✓ | 2 glow effects total, both on the hero, both inside the element's own bounds |
| **Q5** one subject in the opening | ✓ | the cover has one hero (her wet sleeve), one accent colour, one action (the tilt mid-motion) |
| **Q6** camera serves legibility | ✓ | the only strong angles are the push-in and the freeze-orbit; all text sits front-on |
| **Q7/Q8/Q9** object close-up / group photo / real slots | n/a | not applicable to this profile |
| **Q10** publish-grade mock content | ✓ | the recreated phone UI is one line of real text + a state tag, not a fake document |
| **Q11** caption ≥ 56 px, auxiliary ≥ 32 px | ✓ | measured on the renders: caption 62 px, `minh hoạ` 34 px, END title ~64 px. **Measured, not asserted** |
| **S1–S5** sound | deferred to `audio-agent` | the SFX column in §9 is a proposal, not a selection; the ban on game-timbre UI beeps is binding on the phone ring at `s6` |
| **C1** on-screen text from the final pack | ✓ | `content-pack.md` §3 strings used verbatim; `a1`/`s2b`/`a2`/`s8`/`s10` carry **no** headline in the prototype |
| **C3** 3D annotation | n/a | no 3D scene |
| **P4** one technique as hero, no duplicate beats | ✓ | §9 budget audit |
| **P1** self-check frames before handing over | ✓ | every PNG in `out/qa/` was rendered **and read**; the first four passes were rejected on value structure and re-shot |

### Declared, deliberate violations
1. **`glow-flyline-moves` "全片暗场段 ≤1 段"** — the card assumes one dark segment inside a light main visual. This film's *entire* frame is a night street, so there is no light↔dark switching cost to avoid. The rule's purpose (the cost of switching) does not apply; its other rules (eased drift convergence, edge glow weighted by orb distance) are kept.
2. **`End` uses a serif in a film whose whole system is sans** — deliberate, once, on the silent closing card, and written here rather than smuggled.
3. **The hook's push-in is 1.00→1.03, which is slower than the card's own examples** — this is not mine to change: `script.md` §2.2 fixes the number. The motion is instead carried by the three-layer rail, the rim drips and the caption fade, so 2 s of hook is never a static frame (measured: **27.0 % of pixels change between frame 0 and frame 59**, mean |Δ| 31.3).

---

## 11 · Prototype deliverables

| path | what |
|---|---|
| `src/videos/ban-khong-yeu-duoi-chi-da-manh-qua-lau/proto/kit.tsx` | palette, fonts, figure, child, umbrella, props, caption, headline, grade |
| `src/videos/ban-khong-yeu-duoi-chi-da-manh-qua-lau/proto/scenes.tsx` | `ProtoHook`, `ProtoTurn`, `ProtoEnd`, `BoardTile` (+ `BOARD_IDS`) |
| `src/videos/ban-khong-yeu-duoi-chi-da-manh-qua-lau/proto/lib/polish.tsx` | copied verbatim from `SC/demos/_fixtures/Polish.tsx` (easing, ramp, grain, vignette, soft shadow) |
| `src/videos/ban-khong-yeu-duoi-chi-da-manh-qua-lau/proto/entry.tsx` | self-registering Remotion entry **and** the registry-ready manifest |

| output | frame |
|---|---|
| `out/qa/ban-khong-yeu-duoi-chi-da-manh-qua-lau-style-1.png` | hook, f 84 |
| `out/qa/ban-khong-yeu-duoi-chi-da-manh-qua-lau-style-2.png` | turn (`a1`, L1 open), f 112 |
| `out/qa/ban-khong-yeu-duoi-chi-da-manh-qua-lau-style-3.png` | ending (END card), f 86 |
| `out/qa/ban-khong-yeu-duoi-chi-da-manh-qua-lau-cover.png` | **frame 0 of the hook** |
| `out/qa/ban-khong-yeu-duoi-chi-da-manh-qua-lau-board.png` | 16 low-fi storyboard tiles, 4×4, labelled shot id + card name + light state |
| `out/qa/ban-khong-yeu-duoi-chi-da-manh-qua-lau-motion-hook.png` | 2 s of the hook at 12 fps, 6×4 tile |

The prototype is a **separate Remotion entry point**, so all six frames render without touching `src/Root.tsx` or `src/videos/registry.ts`:

```
npx remotion still src/videos/ban-khong-yeu-duoi-chi-da-manh-qua-lau/proto/entry.tsx \
  BanKhongYeuDuoiProtoHook out/qa/ban-khong-yeu-duoi-chi-da-manh-qua-lau-cover.png --frame=0
```

If the Studio should also show it, register the manifest exported from the same file (§12).

**No new npm dependency is required.** Everything used is already in `package.json`: `remotion`, `@remotion/layout-utils` (via `src/core/fit-text`), React. No `three`, no `@remotion/three`, no `@remotion/motion-blur`, no `@remotion/google-fonts` (fonts are vendored `.woff2` under `public/fonts/` and loaded with `staticFile`).

---

## 12 · Registry lines for the director

`src/videos/registry.ts`, add the import next to the other `ban-khong-yeu-duoi-*` imports (above the `// video:new imports -- keep this marker` line):

```ts
import {banKhongYeuDuoiProtoVideo} from './ban-khong-yeu-duoi-chi-da-manh-qua-lau/proto/entry';
```

and add the entry to the `videoRegistry` array (above the `// video:new entries -- keep this marker` line):

```ts
  banKhongYeuDuoiProtoVideo,
```

**Composition id:** `BanKhongYeuDuoiProtoReel`.
**Slug must differ from the production slug** — `ban-khong-yeu-duoi-chi-da-manh-qua-lau-proto` — because `validateVideoRegistry()` throws on a duplicate slug and the production video already owns `ban-khong-yeu-duoi-chi-da-manh-qua-lau`. The prototype also registers three sibling compositions in its own entry for rendering (`BanKhongYeuDuoiProtoHook`, `…ProtoTurn`, `…ProtoEnd`, `…ProtoBoard`); if the director wants those in the Studio catalog too, they can be exported as three more `defineVideo()`s — **this design does not require it**.

---

## 13 · Known weaknesses — what I could not verify

1. **The typography of the figures is a stylised plate, not a likeness.** A gate-D reviewer may find the two-dot faces too diagrammatic for `story`. That is the locked asset class (`script.md` §2.3, "a rendered face is never required"), but the risk is real and the mitigation — more posture and light, fewer facial marks — is a build-time decision.
2. **Only three shots are prototype-built.** `s2a`, `s3`, `a2`, `s4`, `s5`, `img1`, `s6`, `s7`, `s8`, `s9`, `img2`, `s10` exist as low-fi storyboard tiles only. Their cards and locked params are mapped in §9, but **no frame has been rendered against them**. `s7`'s sheen and `s9`'s palette boundary are the two most likely to need re-fitting at 9:16 and neither has been proven.
3. **All frame numbers are 3.9 syl/s planning projections** (`content-pack.md` §2 states this). Nothing in this document is a measured duration; the join must re-derive every start.
4. **Timing was compressed against the cards.** `a1` runs the sweep in 120 f against the card's 170 f, and `s1`'s rail in 78 f against 130 f. Both compress, neither distorts, the mechanism — but the compression is unproven at real speed and is the first thing motion-agent should re-check.
5. **The umbrella canopy is a filled dome; it has no underside.** From a low angle it would show as a flat silhouette. Every current framing is level or slightly high, so this is a latent risk for Phase 4b, not a visible defect now.
6. **Sound is proposed, not selected.** Every SFX cell in §9 is an idea for `audio-agent`; none has been auditioned, and the `s6` ring must be a real object sound (S1 bans synth UI beeps).
7. **Font licence files are missing** from `public/fonts/` for both families. The `assets-manifest.md` entry is required and the OFL text should be vendored.
8. **No real-page capture is needed** — this profile has no product page (Q1 is n/a, not skipped).

---

## 14 · Provenance

| claim | source |
|---|---|
| every card name and style-key | validated against `SC/gallery/api/library.json` (124 cards / 150 styles) |
| every "命门" | the card's own `## 已知坑` / `## 参数表`, quoted per row |
| every demo path | `## 参考实现` in the card's markdown |
| palette luminances, motion delta | measured on the rendered PNGs with `pngjs` / `ffmpeg` this session |
| on-screen text | `content-pack.md` §3, verbatim |
| light plan, contrast pairs, cover paragraph | `script.md` §2.1, §2.2, §6.1 — referenced, never re-claimed |