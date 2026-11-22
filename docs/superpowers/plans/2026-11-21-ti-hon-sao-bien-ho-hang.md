# Tiny Rex Ep 5 (9:16 Short) — "Sao Biển Là Họ Hàng Của Bạn Hơn Cả Con Tôm?!" Implementation Plan

> **For agentic workers:** Follow the exact file ownership, exported JS signatures, shot IDs, timestamps, and 9:16 safe zones below inside `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang/`. Do NOT edit any files in `ti-hon-ho-hang-cay-nam` or outside your assigned ownership.

**Goal:** Produce a high-retention 9:16 (`1080×1920`, 24fps, `-14 LUFS`, `38.438s`) Vietnamese YouTube Short in `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang/` using `/engine/tihon.js` v3.0 (`drawTiHon`, `bigFaceTiHon`) and `mascot-explainer`, matching `@TinyRex01/shorts` style.

**Spec & References:**
- `plugins/thanh-hai-learn-ai-2d-studio/skills/mascot-explainer/SKILL.md`
- `plugins/thanh-hai-learn-ai-2d-studio/skills/make-2d-video/references/engine-api.md`
- `plugins/thanh-hai-learn-ai-2d-studio/skills/make-2d-video/references/animation-principles.md`
- `docs/ti-hon-series/01-series-bible.md` & `docs/ti-hon-series/05-production-spec.md`
- `docs/SHORTS_RETENTION_PLAYBOOK.md` & `docs/GOOGLE_DRIVE_VIDEO_ARCHIVE.md`
- Voiceover timeline already aligned at `thanhhai-2d-studio/projects/ti-hon-sao-bien-ho-hang/timeline/words.json` and `sentences.json` (`duration: 38.438s`).

## Global Constraints (9:16 `1080×1920` @ 24fps)
- Canvas logical units: `E.W = 1080`, `E.H = 1920`, `E.vertical = true`.
- `config.json`: `"bars": "none"`, `"fadeIn": 0`, `"fadeOut": 0.25`, `"duration": 38.438`, `"captionStyle": { "y": 1455, "size": 60, "max": 4 }`.
- **Safe Zones (9:16 YouTube Shorts & TikTok):**
  - Top header / title banner zone: `y = 140 .. 310`.
  - Main visual stage / characters / diagrams / quiz cards: `y = 330 .. 1330`, `x = 60 .. 920` (avoid right-side YouTube UI buttons at `x > 920, y > 900` for critical text!).
  - Captions zone: `y = 1360 .. 1540` (always draw `subtitleScrim(g)` at bottom when background is bright).
  - Bottom YouTube/TikTok overlay zone: `y > 1540` — NEVER place vital text or faces below `y = 1520`.
- **Determinism & Engine Traps:** Never use `Math.random()` or `Date.now()` — always use `rng(seed)()`. `radGrad(g, x, y, r0, r1, stops)` takes 6 args. `poly(g, pts, fill)` ignores args 4+ (call `g.stroke()` explicitly; if `g.clip()` is used, re-trace path before `g.stroke()`!). Never combine `"timing": "twos"` and `"mblur"` on one shot.
- **Character Rig:** Use `drawTiHon` and `bigFaceTiHon` from `../cast.js` (re-exporting `/engine/tihon.js` v3.0). Use `visemeAt(info.globalT, info.shot.start, info.shot.end)` when Tí Hon speaks (`s11`, `s12`, `s13`, `s14`).

## Exact 16-Shot Timeline (`0.000` to `38.438`)

| Shot ID | Start | End | Dur | Size | `in` | Spoken Line / Visual Beat |
|---|---|---|---|---|---|---|
| `s01` | `0.000` | `3.250` | `3.25` | `close` | `cut` | "Lúc bạn còn là một cái phôi tí xíu, thứ đầu tiên bạn có là cái mông." — Embryo blastula zoom + comic opening `"1. CÁI MÔNG?!"` (`lt=2.40`), TinyRex shocked |
| `s02` | `3.250` | `5.750` | `2.50` | `medium` | `zoom` | "Con sao biển này cũng vậy, còn con tôm thì không." — Split compare: Starfish `= BẠN ✓` vs Shrimp `KHÁC ✗` |
| `s03` | `5.750` | `8.600` | `2.85` | `data` | `whip` | "Đố bạn, tôm hay sao biển, ai là bà con gần của bạn hơn?" — Ocean blue radial burst, 2 quiz cards `A: CON TÔM` vs `B: SAO BIỂN`, TinyRex smug explaining |
| `s04` | `8.600` | `11.460` | `2.86` | `close` | `cut` | "Nhìn thì phải là tôm chứ! Có mắt, có chân, bơi vèo vèo." — Card A zooms in, Shrimp swimming lively with `"CÓ MẮT"`, `"CÓ CHÂN"`, `"BƠI VÈO VÈO"` |
| `s05` | `11.460` | `14.280` | `2.82` | `medium` | `whip` | "Còn sao biển, không đầu, không não, bơm nước biển khắp người." — Card B Starfish goofy-eyed on seabed with pulsing water canals `"KHÔNG ĐẦU"`, `"KHÔNG NÃO"`, `"BƠM NƯỚC BIỂN"`; TinyRex thinking |
| `s06` | `14.280` | `16.550` | `2.27` | `freeze` | `flash` | "Sai rồi! Sao biển mới là bà con của bạn." — Red stamp `"SAI RỒI! ✗"` slams onto Shrimp (`lt=0.08`, shake + `impact`), golden spotlight + DNA helix onto Starfish & Human icon |
| `s07` | `16.550` | `18.300` | `1.75` | `blueprint` | `dip` | "Bí mật nằm ở cái lỗ đầu tiên trên phôi." — Blueprint grid: embryonic cross-section pulsing `"LỖ ĐẦU TIÊN (BLASTOPORE)"` |
| `s08` | `18.300` | `19.940` | `1.64` | `insert` | `cut` | "Ở con tôm, lỗ đó thành cái miệng." — Blueprint zoom: Shrimp embryo opening morphs into chomping mouth (`"PROTOSTOMIA: MIỆNG TRƯỚC"`) |
| `s09` | `19.940` | `24.040` | `4.10` | `data` | `cut` | "Còn ở bạn, ở cá, ở chim và ở sao biển, lỗ đó thành cái mông, miệng mọc sau." — Cladogram `DEUTEROSTOMIA`: `"1. CÁI MÔNG"` -> `"2. MIỆNG SAU"`, 4 glowing icons: Human, Fish, Bird, Starfish |
| `s10` | `24.040` | `28.150` | `4.11` | `medium` | `whip` | "Chưa hết, sao biển còn lộn cả dạ dày ra ngoài, nhét vào vỏ sò, tiêu hóa ngay tại chỗ." — Ocean floor gag: Starfish pops pink cartoon stomach into clam (`"LỘN DẠ DÀY 🤢"`), TinyRex disgusted (`expr: 'scared'`, `sweat: true`) |
| `s11` | `28.150` | `29.880` | `1.73` | `close` | `dip` | "Khoan đã... tớ cũng mọc mông trước." — **Silence Drop (`intensity: 0.03`)!** `bigFaceTiHon` close-up (`beatHold`, `saccade`, `visemeAt`), bubble `"TỚ MỌC MÔNG TRƯỚC?!"` |
| `s12` | `29.880` | `32.280` | `2.40` | `close` | `cut` | "Vậy tớ với sao biển là bà con từ cái mông à?" — `bigFaceTiHon` panicked + DNA helix linking TinyRex & cute Starfish wearing orange scarf (`"BÀ CON TỪ CÁI MÔNG?!"`) |
| `s13` | `32.280` | `33.300` | `1.02` | `ots` | `whip` | "Thôi, tớ không nhận đâu!" — TinyRex turns away waving frantically (`"KHÔNG NHẬN ĐÂU!!"`, `visemeAt`), scarf-wearing Starfish pouting |
| `s14` | `33.300` | `34.700` | `1.40` | `medium` | `cut` | "Đăng ký Khủng Long Tí Hon nhé!" — Emerald stage: TinyRex tail-whips up to press red `"ĐÃ ĐĂNG KÝ ✓"` button at `y=620` (`visemeAt`) |
| `s15` | `34.700` | `37.780` | `3.08` | `wide` | `whip` | "Tập sau: loài vật không tim, không não, nhưng gần như bất tử." — Deep abyssal blue stage: glowing bioluminescent Immortal Jellyfish (*Turritopsis dohrnii*) with `"KHÔNG TIM"`, `"KHÔNG NÃO"`, `"BẤT TỬ ♾️"` |
| `s16` | `37.780` | `38.438` | `0.658` | `end` | `flash` | "Đoán đi!" — Silhouette Jellyfish `? ? ?` + `"TẬP SAU: CON GÌ ĐÂY?"` + `"ĐOÁN Ở BÌNH LUẬN! 👇"` seamless loop end |

## Shared Module Interfaces (`sets-assets` -> `shots-part1/2/3`)

### `scenes/cast.js`
- Re-exports `drawTiHon`, `bigFaceTiHon`, `drawFloat` from `/engine/tihon.js`.
- `export const TI_HON_RIM = '#fde047';`
- `export function drawTiHonShort(g, o)` — wraps `drawTiHon` defaulting `rim: { color: '#fde047', dir: [0, -1] }`, `buttonPulse: true`.

### `scenes/sets/ocean_bg.js`
- `export function drawOceanStage(g, t, palette = 'ocean')` — supports `'ocean' | 'purple' | 'abyss' | 'emerald' | 'coral' | 'blueprint'`, draws radial underwater rays + floating plankton/bubbles + seabed silhouette when needed.
- `export function drawTopHeader(g, t, titleText, subText = null, opts = {})` — bold outlined headline at `y = 210` (safe below top notch, above `y = 330`).
- `export function drawSeabedFloor(g, t, yTop = 1080)` — sandy 2.5D ocean floor with gentle swaying kelp & pebbles.

### `scenes/props_saobien.js`
All centered at `(x, y)` with scale `s = 1`:
- `export function drawEmbryo(g, x, y, s = 1, t = 0, opts = {})` — `{ stage: 'ball'|'pore'|'mouth'|'butt', poreCol, label }` glowing blastula cross-section.
- `export function drawStarfish(g, x, y, s = 1, t = 0, opts = {})` — `{ expr: 'goofy'|'proud'|'sad'|'water', scarf, stomachOut, glow }` cute 5-armed 2.5D sea star with textured dots & tube feet.
- `export function drawShrimp(g, x, y, s = 1, t = 0, opts = {})` — `{ swim, mouth, xMark }` segmented 2.5D cartoon shrimp with antennae, big eyes & swimming legs.
- `export function drawClam(g, x, y, s = 1, t = 0, openAmt = 0.5)` — bivalve shell with pearl/soft interior.
- `export function drawJellyfishMystery(g, x, y, s = 1, t = 0, mystery = false)` — bioluminescent *Turritopsis dohrnii* jellyfish (or glowing `?` silhouette).
- `export function drawHumanIcon(g, x, y, s = 1, t = 0)`
- `export function drawFishIcon(g, x, y, s = 1, t = 0)`
- `export function drawBirdIcon(g, x, y, s = 1, t = 0)`
- `export function drawDnaHelix(g, x, y, h = 240, t = 0, colA = '#fde047', colB = '#38bdf8')`
- `export function drawQuizCard(g, x, y, w, h, { label, title, state = 'idle', t = 0, drawIcon })`

## Tasks & File Ownership
1. `planner-docs`: `config.json`, `story/sources.md`, `story/script.md`, `story/bible.md`, `story/shots.json` -> `shot_lint.py --strict`.
2. `sets-assets`: `scenes/cast.js`, `scenes/props_saobien.js`, `scenes/sets/ocean_bg.js` -> `node --check`.
3. `shots-part1`: `scenes/shots/01_hook_quiz.js` (`s01`–`s06`, `0.000`–`16.550`).
4. `shots-part2`: `scenes/shots/02_embryo_science.js` (`s07`–`s10`, `16.550`–`28.150`).
5. `shots-part3`: `scenes/shots/03_twist_cta.js` (`s11`–`s16`, `28.150`–`38.438`).
6. `packaging-thumb`: `thumbnail.mjs` (`1080×1920` `out/thumbnail-youtube.png`) + `out/youtube-title-description.txt`.
7. `verifier`: `node --check`, `shot_lint.py --strict`, `--sheet` + `thumbnail-youtube.png` inspection (`read_file`), fix routing if needed, full `1080×1920` render + `audio/mix.py`, `out/video-final.mp4`, FFprobe/FFmpeg QA + `build/final_mp4_qa.png`, `docs/ti-hon-sao-bien-ho-hang/02-shot-list.md`, `03-storyboard.md`, `04-animatic.md`, and Google Drive upload to `Videos-shorts` (`max(N)+1`) returning clickable Drive URLs.
