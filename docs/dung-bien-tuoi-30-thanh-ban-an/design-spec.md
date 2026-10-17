# Design spec — dung-bien-tuoi-30-thanh-ban-an (Phase 3c, design-agent)

Profile `story` · 9:16 1080×1920 · 30fps · 10 shot / 16 key · ~51.6s @4.1 · light mode.

## 0. Library availability note

The SC vendored library (`skills/video-shotcraft/`) referenced in the dispatch packet **does not exist** in this repo — no `gallery/api/library.json`, no `demos/`, no `references/aesthetic-rules.md`, no `references/sequences/promo-energy-arc.md`. Card selection below is therefore derived from the brief's explicit style direction + the motion grammar already proven in `thuong-hay-so/proto` (the only proto with a full kit). This is a known weakness: the design-reviewer should treat the card table as "brief-derived" not "gallery-validated".

## 1. Palette (locked)

| Token | Hex | Role |
|---|---|---|
| `PAPER` | `#F0F3F0` | nền giấy ô ly (trắng ngà lạnh, vân mịn) |
| `GRID` | `#AFD6D3` | ô ly 2px, mờ dần ra ngoài |
| `INK` | `#3E454B` | chì than — nhân vật, chữ viết tay, caption pill 85% |
| `PAPER_TEXT` | `#F3F5F2` | chữ trên pill |
| `RED` | `#D23B2E` | đỏ bút thầy — MọI dấu vết bên đo đếm |
| `HILITE` | `#FFE24D` | vàng dạ quang — MọI dấu vết nhân vật tự giành |
| `LAMP` | `#F6E7C4` | đèn bàn ấm (từ s9b) |
| `LAMP_SHADOW` | `#D8D2BF` | bóng đèn bàn (nửa đầu) |
| `NIGHT` | `#C9CCC6` | đêm phòng (s7a–s7b) |
| `SCREEN` | `#DCEAF2` | ánh màn hình |
| `LABEL` | `#7C858C` | nhãn "minh hoạ" + chip nguồn |

## 2. Fonts (verified 2026-10-17)

| Brief font | VN subset? | Fallback used | Rationale |
|---|---|---|---|
| Bitter ExtraBold | **NO** (latin only) | **Literata Bold** (VN ✓) | slab serif "chữ in giấy tờ", Literata là serif có VN subset trong repo |
| Nunito Sans Bold | **NO** (latin only) | **Be Vietnam Pro SemiBold** (VN ✓) | caption + nhãn, BVP đã dùng trong repo |
| Caveat Bold | **NO** (latin only) | **Lora Italic** (VN ✓) | chữ viết tay trong cảnh, Lora Italic gần Caveat nhất có VN |

Verification: Google Fonts CSS2 API trả về đúng 1 `@font-face` block (latin) cho cả 3 font — không có subset `vietnamese`. Fallback đúng brief: "Archivo ExtraBold cho headline (đã dùng trong repo), Be Vietnam Pro cho caption và chữ viết tay (chỉ in nghiêng)". Archivo không có trong repo → dùng Literata Bold (serif, VN ✓) thay thế.

## 3. Type tokens

| Use | Font | Size | Weight |
|---|---|---|---|
| HEADLINE (s1, s5a/s5b, s10) | Literata Bold | 84–92px | 700 |
| Caption pill | Be Vietnam Pro SemiBold | 56–58px | 600 |
| Chữ trong cảnh (Caveat→Lora) | Lora Italic | 44–52px | 400 |
| Nhãn "minh hoạ" | Be Vietnam Pro SemiBold | 30–32px | 600 |

## 4. Spacing / safe zone

- Caption: `bottom: 224`, max 2 lines, centered, pill `INK` 85%, radius 26
- Safe zone: no text below y=1710 (bottom 210px)
- Grid: ô ly 2px `#AFD6D3`, opacity fade vignette ra ngoài

## 5. Motion tokens

| Token | Value | Use |
|---|---|---|
| `E_SINE` | easeInOutSine | nửa sau (s6a–s10), không overshoot |
| `EASE.snappy` | bezier(0.16,1,0.3,1) | nửa đầu (s1–s4b), viết–khắc |
| `EASE.smooth` | bezier(0.65,0,0.35,1) | zoom macro s6b |
| `ramp(f, start, dur, ease)` | — | mọI chuyển động derive từ frame |
| `mix(a, b, t)` | — | nội suy |
| `Grain` | opacity 0.06, step 2 | finish |

## 6. Energy curve (10 shots)

```
energy
  ▲
  │  s1    s2    s3a   s3b   s4a   s4b   s5a   s5b   s6a   s6b   s7a   s7b   s8    s9a   s9b   s10
  │  ████  ████  ████  ███   ████  ████  █     ██    ███   ████  ███   ██    ███   █     █     ██
  │  hook  tội  thước  dài  Tết   hỏi   freeze bút   đỏ   macro feed  tối  sao   rút   câu   đóng
  │  ▲     danh  vạch   thêm  cỗ    dồn   0.4s  rơi  dở   zoom  lướt  màn  kê    hết  hỏi   +lặng
  │                                                                                    2.4s
  └──────────────────────────────────────────────────────────────────────────────────────────────► time
  0    2.6   6.0   10.5  12.7  16.1  18.6  20.8  23.8  27.9  31.4  35.1  37.3  41.5  45.2  47.3  51.6
```

- **Hook (s1):** quick+taut — thước trượt vào, mực khoanh tròn 30 tự vẽ
- **Rising (s2–s4b):** viết–khắc — nét đỏ viết liền, vạch lách, mâm cỗ bốc khói
- **Re-hook (s5a/s5b):** freeze 0.4s → bút tuột rơi "cộp" + vệt đèn thu lại
- **Turn (s6a/s6b):** zoom macro easeInOutCubic 1.1s — vạch 30 là nét chì kẻ tay
- **Falling (s7a–s9a):** tẩy–viết lại — feed lướt, sao kê, mọI thứ rút đi
- **Climax (s9b):** vệt sáng ấm + câu hỏi tự viết + dạ quang
- **Close (s10):** quét dạ quang 0.6s → push-in 1.00→1.03 → đứng im 2.4s lặng

## 7. Shot → card table

> **Note:** SC gallery không tồn tại trong repo. Card dưới đây là brief-derived (style direction + motion grammar từ thuong-hay-so/proto). Design-reviewer nên coi đây là "brief-derived" không phải "gallery-validated".

| shot | beat | card | style-key | demo TSX path | assets/lib components | 9:16 adaptation | locked params | SFX idea |
|---|---|---|---|---|---|---|---|---|
| s1 | hook/COVER | `ruler-reveal` | `paper-grid` | N/A (SC missing) | `Ruler`, `Headline`, `GridPaper` | thước ngang nghiêng 12° giữa khung, nhân vật 1/3 trái | mực khoanh tròn 30 còn ướt, stroke-dashoffset 0.4–1.2s | tiếng bút chì cạ rất nhỏ |
| s2 | tội danh | `red-pen-writing` | `paper-grid` | N/A | `RedPenLines`, `Caption` | ba dòng đỏ viết liền cao hơn đầu người | mực đậm dần, đầu bút hụt 1 nhịp ở dòng 3 | tiếng đầu bút cọt kẹt |
| s3a | thước vạch | `ruler-ticks` | `paper-grid` | N/A | `Ruler`, `Caption` | máy ngang qua mặt thước, vạch lách theo lời | 4 vạch 18/22/25/30, 3 vạch khớp lời | tiếng vạch khắc "cộp cộp" |
| s3b | dài thêm | `paper-overflow` | `paper-grid` | N/A | `PaperStack`, `Caption` | danh sách tràn khỏi mép, tờ giấy thứ 2 đè xuống | thước bị đẩy lệch khỏi khung | tiếng giấy trượt |
| s4a | Tết cỗ | `steam-wisp` | `paper-grid` | N/A | `Feast`, `Caption` | mâm cỗ bốc khói vẽ chì, hơi nước bay | khói = nét mờ, không phải ảnh thật | tiếng bát đũa "cạch" |
| s4b | hỏi dồn | `question-burst` | `paper-grid` | N/A | `HandChop`, `Caption` | đũa khựng, tay day thái dương, 3 câu hỏi bật liên tiếp | 3 câu hỏi trong hơi nước | tiếng câu hỏi dồn dập |
| s5a | RE-HOOK freeze | `freeze-frame` | `paper-grid` | N/A | `Freeze`, `Headline` | freeze toàn khung 0.4s, giấy trống + 3 dòng đỏ chớp sáng | bút đóng băng giữa không trung | tiếng ồn Tết cắt phắt |
| s5b | bút rơi | `pen-drop` | `paper-grid` | N/A | `PenDrop`, `Headline` | bút tuột tay rơi "cộp", vệt đèn thu lại | dấu chấm hỏi đỏ viết dở tẽ ngòi | "cộp" nhỏ + reverb mờ |
| s6a | đỏ dở | `red-scribble` | `paper-grid` | N/A | `RedScribble`, `Caption` | nhân vật đứng trên vạch 30, nét đỏ viết dở "thất bại" | bút dừng trước khi viết xong | tiếng đỏ cọt dở |
| s6b | MACRO zoom | `macro-pencil-line` | `paper-grid` | N/A | `MacroZoom`, `Caption` | zoom macro easeInOutCubic 1.1s vào vạch 30 | vạch 30 = nét chì lệch + vết tẩy + hạt cao su | tiếng chì cọt dừng phắt |
| s7a | feed lướt | `phone-feed` | `night-screen` | N/A | `PhoneFeed`, `Caption` | phòng tối, màn hình hắt sáng mặt, 3 ảnh trôi qua | UI minh hoạ, không tên thật, không số liệu | tiếng lướt giấy "sột soạt" |
| s7b | màn tắt | `screen-off` | `night-screen` | N/A | `ScreenOff`, `Caption` | feed đóng băng, màn tắt dần, 1 câu hỏi trên nền tối | ánh màn hình tắt để lại mặt trong bóng | tiếng nuốt nghẹn |
| s8 | sao kê | `money-arrows` | `paper-grid` | N/A | `MoneyArrows`, `Caption` | sao kê không số, dòng tiền quét dạ quang, 4 mũi tên kéo đi | KHÔNG con số, chỉ thanh tiền + mũi tên | chuông "ting" 2 lần rồi tắt |
| s9a | rút hết | `paper-empty` | `paper-grid` | N/A | `PaperEmpty`, `Caption` | mọI thứ rút đi, chỉ còn giấy trắng + khoảng lặng | tiếng ồn phòng tiệc mờ dần đến câm | tiếng ồn mờ dần |
| s9b | CLIMAX câu hỏi | `handwrite-glow` | `paper-grid` | N/A | `Handwrite`, `Headline` | vệt sáng ấm, câu hỏi tự viết, dạ quang quét dưới | nhân vật ngồi ôm gối, không ai nói thêm | im lặng 0.4s sau |
| s10 | đóng + lặng | `highlighter-sweep` | `paper-grid` | N/A | `Highlighter`, `Card` | chữ đóng hiện dưới nhát dạ quang, thước lệch mép không ai cầm | push-in 1.00→1.03, đứng im 2.4s lặng | tiếng bút đặt xuống rất nhỏ |

## 8. Must NOT resemble

| Video | Why different |
|---|---|
| xay-doi | diorama giấy cắt nhiều lớp, coban/hồng sen, viền mực 4–6px → video này: mặt phẳng giấy ô ly, chì + đỏ bút + dạ quang |
| truongthanh | nền đen + người que trắng + cam `#F58B4C` → video này: nền giấy sáng, nhân vật chì có khối |
| thuong-hay | bếp chạng vạng tím, LED đỏ son, Literata/Lexend → video này: không bếp, không LED, đỏ là mực bút |
| camon | polaroid + mầm lá, đêm xanh rêu → video này: không polaroid, không cây lá |
| gaplai | nâu đêm + đèn bàn vàng + hai ghế → video này: không ghế, nguồn sáng là vệt đèn chếch trên giấy |
| metkhong | phòng trọ xám lạnh đêm → video này: thế giới mặt phẳng giấy |
| cuoc-goi | điện thoại giữa hai phòng, đỏ gọi nhỡ → video này: điện thoại chỉ là màn feed 2.7s có nhãn minh hoạ |

## 9. Proto deliverables

- `src/videos/dung-bien-tuoi-30-thanh-ban-an/proto/index.tsx` — separate entry (registerRoot), không đụng Root.tsx
- `src/videos/dung-bien-tuoi-30-thanh-ban-an/proto/kit.tsx` — palette, fonts, shared components
- `src/videos/dung-bien-tuoi-30-thanh-ban-an/proto/motion.tsx` — easing, ramp, grain
- `src/videos/dung-bien-tuoi-30-thanh-ban-an/proto/scenes.tsx` — ProtoHook, ProtoTurn, ProtoEnd, BoardTile

## 10. Known weaknesses

1. **SC gallery missing** — card table là brief-derived, không gallery-validated
2. **Fonts fallback** — Bitter/Caveat/Nunito Sans không có VN subset → dùng Literata Bold / Be Vietnam Pro / Lora Italic
3. **Proto chỉ 3 shot** — hook/turn/ending, chưa đủ 10 shot cho storyboard đầy đủ
4. **Chưa có audio** — proto là visual-only, chưa verify motion với voice timing
