# Tiny Rex 9:16 Short — "Bạn Là Họ Hàng Của… Cây Nấm" Implementation Plan

> **For agentic workers:** Follow the exact file ownership, exported JS signatures, shot IDs, timestamps, and 9:16 safe zones below. Do NOT edit files outside your assigned ownership.

**Goal:** Produce a complete, broadcast-ready 9:16 (`1080×1920`, 24fps, `-14 LUFS`) Vietnamese YouTube Short in `thanhhai-2d-studio/projects/ti-hon-ho-hang-cay-nam/` using `/engine/tihon.js` v3.0 (`drawTiHon`, `bigFaceTiHon`) and `mascot-explainer` (`explainer.js`, `motion.js`), matching `@TinyRex01/shorts` visual identity.

**Spec & References:**
- `plugins/thanh-hai-learn-ai-2d-studio/skills/mascot-explainer/SKILL.md`
- `plugins/thanh-hai-learn-ai-2d-studio/skills/make-2d-video/references/engine-api.md`
- `plugins/thanh-hai-learn-ai-2d-studio/skills/make-2d-video/references/animation-principles.md`
- `docs/ti-hon-series/01-series-bible.md` & `docs/ti-hon-series/05-production-spec.md`
- `docs/SHORTS_RETENTION_PLAYBOOK.md` & `docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md`
- Voiceover timeline already aligned at `thanhhai-2d-studio/projects/ti-hon-ho-hang-cay-nam/timeline/words.json` and `sentences.json` (`duration: 47.664s`).

## Global Constraints (9:16 `1080×1920` @ 24fps)
- Canvas logical units: `E.W = 1080`, `E.H = 1920`, `E.vertical = true`.
- `"bars": "none"`, `"fadeIn": 0`, `"fadeOut": 0.35`, `"captions": true`, `"captionStyle": { "y": 1455, "size": 60, "max": 4 }`.
- **Safe Zones (9:16 YouTube Shorts & TikTok):**
  - Top header / title banner zone: `y = 140 .. 310` (keep clear of top edge notch `y < 120`).
  - Main visual stage / characters / diagrams / quiz cards: `y = 330 .. 1330`, `x = 60 .. 920` (avoid right-side YouTube UI buttons at `x > 920, y > 900` for critical text!).
  - Captions zone: `y = 1360 .. 1540` (always draw `subtitleScrim(g)` at bottom when background is bright).
  - Bottom YouTube/TikTok overlay zone: `y > 1540` — NEVER place vital text or faces below `y = 1520`.
- **Determinism:** Never use `Math.random()` or `Date.now()`. Use `rng(seed)()` (always invoke the returned function!) and deterministic `t` / `Math.floor(t * 12)` for boil.
- **Engine Traps:** `radGrad(g, x, y, r0, r1, stops)` takes 6 args (NOT 8). `poly(g, pts, fill)` ignores args 4+ (call `g.stroke()` explicitly). Never combine `"timing": "twos"` and `"mblur"` on one shot. All on-screen text in crisp Vietnamese with full diacritics (`FONTS.ui`, `FONTS.title` — both render cleanly via Nunito).
- **Character Rig:** Always use `drawTiHon` and `bigFaceTiHon` from `../cast.js` (re-exporting `/engine/tihon.js` v3.0: green skin `#48b83e`, orange scarf `#f97316`, crown spikes, red `"VỀ NHÀ"` button + cyan `"TUA LẠI"` LED — NO yellow helmet!). Use `visemeAt(info.globalT, info.shot.start, info.shot.end)` when Tí Hon speaks (`tớ`, first-person lines), and `act` / `exprAt` / `beatHold` / `impact` / `saccade` for lively acting!

## Exact 18-Shot Timeline (`0.000` to `47.664`)

| Shot ID | Start | End | Dur | Size | `in` | Spoken Line / Visual Beat |
|---|---|---|---|---|---|---|
| `s01` | `0.000` | `1.420` | `1.42` | `close` | `cut` | "Khoan! Đừng gắp!" — Chopsticks lunge toward meal plate; panicked TinyRex stops you (`popText`: `"KHOAN!"`) |
| `s02` | `1.420` | `3.550` | `2.13` | `medium` | `zoom` | "Bạn sắp ăn... bà con của mình đấy!" — Purple radial burst, glowing DNA strand linking Human silhouette & Mushroom on plate, TinyRex shocked |
| `s03` | `3.550` | `6.600` | `3.05` | `data` | `whip` | "Đố bạn! Món nào trên đĩa là họ hàng của BẠN?" — Blue radial burst, top header `"ĐỐ BẠN: HỌ HÀNG CỦA BẠN?"`, 3 quiz cards `A: CON GÀ`, `B: CỌNG RAU`, `C: ???`, TinyRex explaining |
| `s04` | `6.600` | `8.250` | `1.65` | `close` | `cut` | "Con gà hả? Sai!" — Card A zooms in; red `stamp`: `"SAI! ✗"` slams onto chicken at `lt=1.25` with shake |
| `s05` | `8.250` | `9.550` | `1.30` | `ots` | `whip` | "Gà là bà con của tớ cơ mà!" — Callback to Ep 3! TinyRex proudly hugging white chicken with glowing DNA link (`viseme`) |
| `s06` | `9.550` | `13.500` | `3.95` | `medium` | `cut` | "Cọng rau hả? Cùng mọc từ đất mà... Sai luôn!" — Card B (leafy bok choy sprouting from soil) vs mushroom; TinyRex thinks then red `"SAI LUÔN! ✗"` slams at `lt=2.85` |
| `s07` | `13.500` | `15.450` | `1.95` | `freeze` | `flash` | "Đáp án là... CÂY NẤM!" — Card C bursts open in gold/emerald! Hero 2.5D Mushroom + `"ĐÁP ÁN: CÂY NẤM!"` badge, `beatHold` at `lt=0.72` |
| `s08` | `15.450` | `17.150` | `1.70` | `wide` | `whip` | "Rau tự làm thức ăn từ ánh nắng." — Bright sunbeams (`godRays`) feeding leafy veggie, `"QUANG HỢP ☀️"` pill, sugar sparkles |
| `s09` | `17.150` | `20.050` | `2.90` | `medium` | `cut` | "Nấm thì không. Nó phải ăn, giống hệt bạn." — Mushroom blocks sun (`"KHÔNG QUANG HỢP"`), extends mycelium roots to eat nutrients beside TinyRex & human icon (`"PHẢI ĂN GIỐNG BẠN"`) |
| `s10` | `20.050` | `23.450` | `3.40` | `blueprint` | `dip` | "Vách tế bào của nấm làm từ cùng một chất... với vỏ con gián!" — Blueprint grid! Microscope cell wall hex `"CHITIN"` matching armored cockroach shell; TinyRex disgusted (`"GIỐNG VỎ GIÁN?!"`) |
| `s11` | `23.450` | `27.100` | `3.65` | `data` | `cut` | "Nên nấm được xếp chung nhánh với động vật. Gần bạn hơn gần cây rau!" — Animated cladogram tree: Plants split left; Animals + Fungi (`OPISTHOKONTA`) share golden branch + `"GẦN BẠN HƠN RAU!"` |
| `s12` | `27.100` | `28.900` | `1.80` | `close` | `zoom` | "Mà bà con này to lắm." — TinyRex looking down in awe as giant dark-glowing underground shadow rumbles (`"SIÊU TO KHỔNG LỒ!"`) |
| `s13` | `28.900` | `32.650` | `3.75` | `top` | `cut` | "Ở Mỹ có cây nấm nằm dưới đất, rộng hơn một nghìn ba trăm sân bóng!" — Oregon forest cross-section & top-down map: glowing gold mycelium spreading across `1.300+ SÂN BÓNG` animated counter (`~9,6 km²`) |
| `s14` | `32.650` | `34.600` | `1.95` | `close` | `dip` | "Khoan... tớ cũng là động vật mà." — **Silence Drop!** `bigFaceTiHon` close-up (`beatHold`), eyes darting, bubble `"TỚ = ĐỘNG VẬT?!"`, `viseme` |
| `s15` | `34.600` | `36.850` | `2.25` | `close` | `cut` | "Vậy nấm... cũng là bà con của tớ?!" — `bigFaceTiHon` panicked + sweat drops + glowing DNA between TinyRex and a cute mushroom wearing an orange scarf (`"BÀ CON CỦA TỚ?!"`) |
| `s16` | `36.850` | `38.550` | `1.70` | `insert` | `whip` | "Vậy... bạn còn dám gắp nữa không?" — Macro insert of steaming bowl/plate with trembling chopsticks hovering over wide-eyed cute mushroom (`"DÁM GẮP KHÔNG?!"`) |
| `s17` | `38.550` | `45.750` | `7.20` | `medium` | `cut` | "Đăng ký Khủng Long Tí Hon nhé! Tập sau: con vật năm cánh tay dưới biển... gần bạn hơn cả con tôm. Đoán đi!" — `0..2.5s`: TinyRex tail-presses red `"ĐĂNG KÝ"` pill (`y=620`); `2.5..7.2s`: Ocean teaser comparing 5-arm starfish mystery (`? ? ?`) vs Shrimp (`TÔM`) |
| `s18` | `45.750` | `47.664` | `1.914` | `end` | `flash` | "Bạn là họ hàng của… cây nấm" — Punchy closing card: TinyRex & Mushroom side-by-side in matching orange scarves, bold headline `"BẠN = HỌ HÀNG CÂY NẤM 🍄"` |

## Shared Module Interfaces (`sets-assets` -> `shots-part1/2/3`)

### `scenes/cast.js`
- Re-exports `drawTiHon`, `bigFaceTiHon`, `drawFloat` from `/engine/tihon.js`.
- `export const TI_HON_RIM = '#fde047';`
- `export function drawTiHonShort(g, o)` — convenience wrapper around `drawTiHon` defaulting `rim: { color: '#fde047', dir: [0, -1] }` and `buttonPulse: true`.

### `scenes/sets/studio_bg.js`
- `export function drawRadialStage(g, t, palette = 'purple')` — supports `'purple' | 'blue' | 'orange' | 'emerald' | 'ocean' | 'underground' | 'dark'`, draws rich radial burst + floating dust/spores + subtle vignette.
- `export function drawTopHeader(g, t, titleText, subText = null, opts = {})` — draws `@TinyRex01`-style bold outlined headline at `y = 210` (safe below top notch, above `y = 330`).
- `export function drawMealTable(g, t, opts = {})` — 2.5D wooden table surface + ceramic dinner plate centered around `(540, 880)`.

### `scenes/props_nam.js`
All coordinates centered at `(x, y)` with scale `s = 1`:
- `export function drawChickenLeg(g, x, y, s = 1, t = 0)` — roast drumstick / whole cartoon chicken leg on plate.
- `export function drawChickenBuddy(g, x, y, s = 1, t = 0, facing = 1)` — live cute white chicken (Ep 3 callback).
- `export function drawVeggie(g, x, y, s = 1, t = 0, happy = false)` — crisp leafy bok choy / green vegetable.
- `export function drawMushroom(g, x, y, s = 1, t = 0, opts = {})` — hero 2.5D red/cream spotted or golden honey mushroom (`{ cuteFace, scared, scarf, glow }`).
- `export function drawChopsticks(g, x, y, angle = 0, pinch = 0.3, s = 1, tremble = 0)` — pair of bamboo/ivory chopsticks descending from above.
- `export function drawDnaHelix(g, x, y, h = 240, t = 0, colA = '#fde047', colB = '#38bdf8')` — animated glowing double helix.
- `export function drawQuizCard(g, x, y, w, h, { label, title, state = 'idle', t = 0, drawIcon })` — states `'idle' | 'active' | 'wrong' | 'winner'`.
- `export function drawCockroach(g, x, y, s = 1, t = 0)` — 2.5D cartoon armored cockroach (`chitin` shell highlight).
- `export function drawStarfishMystery(g, x, y, s = 1, t = 0)` — 5-arm starfish silhouette with glowing `?` for Ep next teaser.
- `export function drawShrimp(g, x, y, s = 1, t = 0)` — cute pink/orange shrimp for Ep next comparison.
- `export function drawHumanIcon(g, x, y, s = 1, t = 0)` — clean stylized friendly human bust/silhouette.

## Tasks & File Ownership
1. `planner-docs`: `config.json`, `story/sources.md`, `story/script.md`, `story/bible.md`, `story/shots.json` -> run `shot_lint.py --strict`.
2. `sets-assets`: `scenes/cast.js`, `scenes/props_nam.js`, `scenes/sets/studio_bg.js` -> run `node --check`.
3. `shots-part1`: `scenes/shots/01_hook_quiz.js` (`s01`–`s07`) -> run `node --check`.
4. `shots-part2`: `scenes/shots/02_science_mycelium.js` (`s08`–`s13`) -> run `node --check`.
5. `shots-part3`: `scenes/shots/03_twist_cta.js` (`s14`–`s18`) -> run `node --check`.
6. `packaging-thumb`: `thumbnail.mjs` (render `out/thumbnail-youtube.png` 1080×1920) + `out/youtube-title-description.txt`.
7. `verifier`: Validates everything via `shot_lint.py --strict`, `--sheet` inspection (`read_file` on PNGs), thumbnail inspection (`read_file`), routes any fix tickets, then runs full `1080×1920` render + `audio/mix.py` + FFmpeg QA + writes `docs/ti-hon-ho-hang-cay-nam/02-shot-list.md`, `03-storyboard.md`, `04-animatic.md`.
