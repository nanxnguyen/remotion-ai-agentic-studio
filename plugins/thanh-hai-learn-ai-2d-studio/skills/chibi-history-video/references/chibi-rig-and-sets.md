# Chibi Rig, Reusable Sets & Long-Form Render Guide

Technical specification for producing 2D minimalist historical storytelling videos (*Tờ Bờ* / *Văn Vở* / *OverSimplified* style) inside `thanhhai-2d-studio`.

---

## 1. Pawn-Body Chibi Rig (`drawChibiPawn`)

Characters use a **3-layer stacked silhouette**—no articulated arms or legs—so every historical figure can be defined purely via config:

| Layer | Geometry & Style | Config Options |
|---|---|---|
| **Base / Robe** | Rounded trapezoid / bell-shaped torso (`width ~ 72–96 px`, `height ~ 105–130 px` at `scale = 1`), thick `#1e1e24` outline (`3.5 px`). Optional flared cape behind torso. | `robeColor`, `trimColor`, `armorPlates` (`bool`), `capeColor`, `emblem` (`'scroll' \| 'dragon' \| 'circle'`) |
| **Head & Hair/Crown** | Rounded circle/oval (`r ~ 34–40 px`), flat skin fill (`#f6d5b8`), hair/helm/crown drawn behind + on top. | `hair` (`'topknot' \| 'ponytail' \| 'bun' \| 'helm' \| 'crown' \| 'mohawk'`), `hairColor`, `helmPlumeColor` |
| **Face** | Minimalist high-contrast features: dot/oval eyes, angled eyebrows, optional mustache/goatee. No complex nose; optional tiny mouth when shouting/talking. | `expr` (`'neutral' \| 'angry' \| 'smirk' \| 'scared' \| 'shocked' \| 'sleep' \| 'dead'`), `beard` (`'none' \| 'goatee' \| 'full' \| 'long'`), `look` (`-1 \| 0 \| 1`) |
| **Floating Prop** | Drawn at `(x + facing * 52, y - 55 + bob)` with independent rotation/swing. | `prop` (`'sword' \| 'spear' \| 'fan' \| 'scroll' \| 'tea' \| 'gavel' \| 'handPoint' \| null`) |

### Motion Rules (Deterministic)
- **Speaking bounce:** `dy = -Math.abs(Math.sin(t * 10)) * 5` when `talking === true`.
- **Idle breathing / floating prop:** `propDy = Math.sin(t * 2.8 + seed) * 4`, `propRot = Math.sin(t * 2.1 + seed) * 0.06`.
- **Sword/Fan slash:** Interpolate `propRot` from `-0.4` to `+0.9` over `0.18 s` with overshoot.
- **Horizontal slide / march:** Ease position with `easeOutCubic`; add a tiny tilt (`rot = vx * 0.0004`) so characters lean into movement.

---

## 2. Ancient-Scroll Nameplate (`drawNameplate`)

Place centered at `(x, headTopY - 38)`:
- **Box:** Warm parchment fill (`#e8d595` or `#f3e4b0`), `#1e1e24` border (`2.5 px`), small corner fretwork squares (`6×6 px`) at all four corners to evoke traditional East Asian scroll plaques.
- **Typography:** Bold sans/serif (`Nunito 800` or `Noto Serif`, `#1e1e24` text or `#fff` with `#1e1e24` stroke), `18–22 px` at 1080p.
- **Rule:** Fade/pop in over `0.2 s` when a character first appears or when multiple generals share a scene; hide or dim in rapid action cuts once the viewer knows who is who.

---

## 3. Cloned Soldier Formations (`drawSoldierCrowd`)

To depict armies (e.g. 80 vạn quân Tào at Xích Bích) at zero extra art cost:
1. Define 1–2 compact soldier variants (`blackArmor + redPlume + spear`, `blueRobe + bambooHat`).
2. Render back-to-front rows with perspective scaling (`scale = 0.35` in far background → `0.85` near foreground) and slight horizontal jitter seeded deterministically from `(row, col)`.
3. Animate collective march using a single phase offset per soldier (`Math.sin(t * 7 + col * 0.9) * 3`).

---

## 4. Reusable 2D Sets & Paper-Grain Overlay

Build 6–10 flat-shaded 2D vector sets with `3.5 px` `#2a2a32` outlines:
- **Grassland / Hills:** Layered rolling green hills + puffy outlined white clouds on a sky-blue or amber gradient.
- **Riverbank / Naval:** Split diagonal shoreline (`land` + `water`) with horizontal white ripple dashes.
- **Palace / Throne Hall:** Trapezoid perspective room, red top drapery, large wall crest/dragon banner, central dais table.
- **Bedchamber / War Tent:** Warm earth walls, wooden bed/table, hanging tent flaps or scroll map.
- **Tactical Map:** Parchment tabletop with animated dashed arrow paths (`strokeDashoffset` driven by `t`), territory color blobs, and miniature pawn tokens.

**Paper-Grain Overlay:** Tile a pre-generated deterministic `256×256` monochrome noise pattern across the canvas at `globalAlpha = 0.04–0.06` (`multiply` or `overlay`) so flat vector fills look rich and tactile rather than sterile.

---

## 5. Chunked Rendering for 25–55 Minute Long-Form Videos

Rendering 36,000–90,000+ frames in a single headless Chromium pass risks memory bloat. Split long episodes into **chapter chunks** (~2–4 min each):

```bash
# Render chapter chunks
node render.mjs --project projects/<slug> --from shot_001 --to shot_045 --out build/chunks/ch01.mp4
node render.mjs --project projects/<slug> --from shot_046 --to shot_095 --out build/chunks/ch02.mp4

# Concatenate losslessly with FFmpeg
printf "file '%s'\n" build/chunks/ch*.mp4 > build/chunks.txt
ffmpeg -y -f concat -safe 0 -i build/chunks.txt -c copy build/video_raw.mp4
```

Then mix the full-length voiceover + BGM + SFX track (`python3 audio/mix.py --project projects/<slug>`) and mux into the final `build/video-final.mp4`.

---

## 6. Set Catalog (engine v0.6) — pick by what the line says

| Set | Use when the line is about | Options (`shot.params`) |
|---|---|---|
| `warTent` | meeting, council, plan, advice, memorial (họp, bàn kế, mưu, khuyên, Xuất Sư Biểu, Tam cố) | `faction` |
| `siege` | attacking/holding a city or pass, flooding, empty-fort (công/vây/phá thành, qua ải, mở toang cổng) | `faction`, `fire`, `gateOpen`, `crowd` |
| `navalFleet` | river war, boats (Xích Bích, thủy quân) | `chained` (liên hoàn), `straw` (thuyền cỏ + arrows), `fire`, `faction` |
| `peachGarden` | oath, brotherhood (vườn đào, kết nghĩa) | — |
| `bridge` | Trường Bản bridge stand, pursuit across a river | `crowd` |
| `mountainPass` | Nhai Đình, Âm Bình, Kỳ Sơn, Nam chinh, march through mountains | `crowd`, `night` |
| `starNight` | death, omen, falling star, wooden statue (Ngũ Trượng Nguyên, qua đời) | — |
| `market` | commoners, selling sandals, recruitment notice (chợ, cáo thị) | `notice` |
| `court` | emperors, enthronement, abdication, eunuchs, chancellor | `fire` (panic) |
| `tacticalMap` | troop movement, territory, "chia ba", year jumps | `arrows: [[from, to, faction]]`, `places`, `focus`, `label` ("NĂM 208"), `era` (`warlords`/`three`) |
| `battlefield` / `forestCamp` / `riverbank` / `cityGate` / `snowWall` / `palace` / `bedchamber` / `teaTable` | classic sets; `teaTable` = narrator "soi" segment, `bedchamber` = feigned illness | `fire`, `crowd`, `gateOpen` |
| `banquet` | drinking, feasts (thanh mai chử tửu, rượu nóng) | — |
| `cottage` | Ngọa Long thatched hut, Tam cố thảo lư | `snow` |
| `windAltar` | Thất Tinh altar, praying for the east wind | — |
| `flood` | Phàn Thành flood, thủy yểm thất quân | — |
| `cavalry` | horse charges, pursuit, flanking raids (Xích Thố, kỵ binh) | `faction`, `fire` |
| `study` | memorials, reading strategy, Xuất Sư Biểu | — |
| `emptyFort` | Không thành kế: open gate, zither on the tower | — |
| `hills` | generic fallback only — lint fails above 10% | — |

Overlays (screen space): `drawChapterTag(g, label)`, `drawChapterOpen(g, label, t)`, `drawImpact(g, x, y, t)`.
Action layers callable from any shot: `drawFlames(g,x,y,w,h,t)`, `drawSmoke(g,x,y,t)`, `drawArrowRain(g,t,{x0,x1,y0,y1,count,dir})`.
Map places known to `tacticalMap`: Lạc Dương, Trường An, Hứa Xương, Quan Độ, Hà Bắc, Kinh Châu, Xích Bích, Giang Đông, Kiến Nghiệp, Thành Đô, Hán Trung, Kỳ Sơn, Ngũ Trượng Nguyên, Nhai Đình, Di Lăng, Bạch Đế, Phàn Thành, Mạch Thành, Âm Bình, Từ Châu, Trường Bản, Tây Lương (`MAP_PLACES`).

**Retention rule of thumb:** a viewer should see a *new place or a new action* at least every ~10 s, and every location change opens on a `wide` shot before medium/close reactions.
