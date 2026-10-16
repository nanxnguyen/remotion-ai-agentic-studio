# Design Spec — cuoc-goi-nho-cua-me (Cuộc gọi nhỡ của mẹ)

Nguồn: `docs/cuoc-goi-nho-cua-me/brief.md` + `script.md` (v2 — 8 shots, 160 từ, bỏ luật verbatim v1) + `research.md` §5.
Pattern kỹ thuật tham khảo `src/gaplai/scenesB.tsx` (GapFonts/Caps local, caption đáy 250px) — chỉ mượn cấu trúc, KHÔNG copy palette/vật liệu.

## 1. Visual direction (chốt 1 hướng)

**"Ngày sáng lạnh → tối ấm dần"** — nửa đầu văn phòng ban ngày sáng lạnh, nhịp cắt nhanh (tin nhắn, họp, màn hình điện thoại); nửa sau đường về + bữa tối ở nhà, ánh sáng ấm dần, push-in chậm, hold dài. Mở đầu bằng **màn hình cuộc gọi nhỡ (mock UI điện thoại)**, không phải nhân vật ngồi phòng đêm.

Ba từ mô tả động效: **gấp → chùng → ấm** (một thương hiệu, một giọng động效; chỉ đổi tốc độ/hold, không đổi easing gốc).

### Motion tokens (brand→động效, theo pipeline §1)

| Nửa | Preset gốc | Chủ时长@30fps | Easing | Overshoot / squash | Hold |
|---|---|---|---|---|---|
| s1–s4 (việc, gấp) |活力大胆 biến thể nhẹ | ~18f vào, cắt shot 3.4–5.6s | bezier(0.16,1,0.3,1) | 1.08 / 0.1 (chỉ cho badge/tin nhắn pop) | 0.3s |
| s5 (bản lề, đỉnh a) | 亲和友好 | ~26f | bezier(0.25,0.46,0.45,0.94) | 1.04 / 0.08 | 0.5s (nín 0.5s sau "hai tiếng") |
| s6 (đỉnh b, ấm nhất) | 平静关怀 | ~42f vào, push-in toàn shot | ease-in-out đối xứng | 1.0 / ≤0.04 | ≥0.6s |
| s7–s8 (lắng, đỉnh c ở s8) | 平静关怀 | push-in rất chậm hoặc tĩnh | ease-in-out đối xứng | 1.0 / ≤0.04 | s7 ≥0.6s; s8 caption tắt sớm + hold lặng ≥1.0s, outro +1.4s |

- Ba cú nhấn (hệ thống 3 đỉnh, chi tiết §9): (a) s5 nín 0.5s + close-up mẹ + chuông dừng + ấm tràn; (b) s6 WarmGlow max + push-in chậm nhất; (c) s8 caption tắt sớm + hold lặng ≥1.0s. Không slam ở bất kỳ đỉnh nào.
- Chuyển cảnh: nửa đầu hard-cut / slide-in; s4→s5 dissolve mềm 20f (ngày→tối); nửa sau dissolve + push-in rất chậm (zoom 1→1.05 cả shot).
- Determinism: cấm `Date.now()`/`Math.random()`; pseudo-random seed cố định.

## 2. Palette (hex đầy đủ)

### Ngày sáng lạnh (s1–s4)

| Token | Hex | Dùng |
|---|---|---|
| `DAY_BG` | `#E8EEF2` | nền văn phòng ban ngày |
| `DESK` | `#C9D6DF` | bàn làm việc, mặt phẳng phụ |
| `INK` | `#1E2A33` | chữ chính, viền phone |
| `COLD` | `#4A90B8` | nhấn xanh lạnh, accent caption nửa đầu |
| `MISS` | `#E5484D` | đỏ gọi nhỡ, nút bấm tắt |
| `PHONE_SCREEN` | `#FFFFFF` | màn hình mock UI |
| `MUTED` | `#8A94A0` | nhãn "minh hoạ", timestamp phụ |
| `CHAT_OUT` | `#4A90B8` | bong bóng chat người con gửi (chữ trắng) |
| `CHAT_IN` | `#DCE6EC` | bong bóng đến (chữ ink) |

### Tối ấm (s5–s8)

| Token | Hex | Dùng |
|---|---|---|
| `NIGHT_BG` | `#2B2320` | nền đêm (phía mẹ, tông ấm) |
| `ROOM_CHILD` | `#232B34` | tường phòng đêm phía người con (tông lạnh, phân biệt hai không gian) |
| `NIGHT_DEEP` | `#1D1714` | chân nền, sàn, viền tối |
| `AMBER` | `#F2A65A` | hổ phách: đèn, glow, accent caption nửa sau |
| `CREAM` | `#FAF3E8` | chữ chính trên nền tối |
| `WOOD` | `#5A4230` | bàn ăn gỗ |
| `SKIN` | `#E9BE9C` | da nhân vật |
| `HAIR_MOM` | `#4A3A30` | tóc mẹ (búi, điểm bạc `#C9BBA8`) |
| `HAIR_CHILD` | `#23282E` | tóc người con |
| `SWEATER_MOM` | `#8A5A6B` | áo mẹ (tím nâu trầm — tránh vàng đèn gaplai) |
| `SHIRT_CHILD` | `#3E5A78` | áo người con (xanh đá lạnh, nối nửa đầu) |

### Chuyển tiếp (s4→s5)

Gradient dọc `DAY_BG #E8EEF2` → `#6B5A4E` → `NIGHT_BG #2B2320`; glow hổ phách radial opacity 0→0.5 tại khoảnh khắc bắt máy.

### Contrast (xác minh)

- `INK #1E2A33` trên `DAY_BG #E8EEF2` ≈ 13.5:1 ✓
- `CREAM #FAF3E8` trên `NIGHT_BG #2B2320` ≈ 12:1 ✓
- `MISS #E5484D` trên trắng ≈ 4.0:1 — chỉ dùng cho chữ lớn ≥40px / icon, không dùng body nhỏ ✓
- `MUTED #8A94A0` trên trắng ≈ 3.2:1 — chỉ dùng nhãn phụ "minh hoạ", không mang thông tin chính ✓

## 3. Font + license

- **Be Vietnam Pro 600** cho caption + UI text trong mock phone (font duy nhất, đã chốt).
- License: **SIL Open Font License 1.1** (OFL — dùng thương mại được; file local sẵn).
- Triển khai: `CcFonts` trong `src/cuocgoinho/kit.tsx` — `@font-face` local từ `public/fonts/BeVietnamPro-SemiBold-{VN,LatinExt,Latin}.woff2` (copy pattern gaplai, unicode-range VN). Không import Google Fonts CDN (đảm bảo render offline/determinism).
- Hỗ trợ dấu Việt: kiểm tra glyph `ơ ư đ á à ả ã ạ ă â ê ô` ở stills QA trước khi build.
- Fallback stack: `'Be Vietnam Pro',sans-serif` (không dùng font của Lan/gaplai làm fallback).

## 4. Caption component (`CcCaps`, copy cấu trúc `GCaps`/`GLine`)

- Vị trí: căn giữa, `left 70 / right 70`, **đáy cách 250px** (> safe-zone 210px của pipeline). Tối đa 2 dòng, font 58px/1.32.
- Màu: nửa đầu chữ `INK` viền trắng mềm trên nền sáng; nửa sau chữ `CREAM` + `textShadow 0 2px 18px rgba(0,0,0,.78)`.
- Từ nhấn (`accent`): nửa đầu màu `COLD #4A90B8` (trên nền sáng dùng bản đậm `#2E6E94` để đủ contrast chữ nhỏ); nửa sau màu `AMBER #F2A65A`.
- Timing: fade 9f vào / 7f ra, rise 16→0px; chia 2–3 parts/shot theo `script.md` v2 (không thêm/bớt chữ voice). Riêng s8: caption **tắt sớm** trước khi hết shot để nhường hold lặng ≥1.0s (đỉnh c, §9).
- Caption đêm khi build: bắt buộc `textShadow 0 2px 18px rgba(0,0,0,.78)` cho s5–s8 (SVG tĩnh không thể hiện); giữ pill nền trắng s1.
- Accent words theo script v2: s1 "Mẹ gọi · gọi lại", s2 "họp dở · bấm tắt vội", s3 "Lát con gọi lại nha. · quên bẵng", s4 "vẫn nằm đó · chột dạ", s5 "chính ngón tay ban chiều bấm tắt · Con ăn cơm chưa?", s6 "nghe giọng mình một chút thôi", s7 "cơm đã nguội · mưa vẫn gõ nhẹ · nhỏ xíu", s8 "Một cuộc gọi lại thôi".

## 5. Character / UI treatment

### Người con (đi làm xa)

- Tả thực tối giản: đầu tròn da `#E9BE9C`, tóc ngắn `#23282E`, áo `#3E5A78`. Không pictogram que (khác Lan).
- Xuất hiện: **close-up ngón tay POV** chạm nút tắt (s2 — gieo tương phản cho s5 "chính ngón tay ban chiều") → bust dưới đèn đường đêm đang gọi lại (s5 beat 1) → bust ở phòng riêng, áp phone (s7–s8 panel `Con`). Biểu cảm: s2 cúi-gấp, s5–s8 mềm, mỉm cười nhẹ.
- Mắt vẽ bằng **đường cong cùng ngôn ngữ với mẹ** (mood `down/calm/soft`, bob thở ±4px khi build) — không dùng chấm tròn.
- KHÔNG thêm marker giới tính nào ngoài tạo hình đã chốt (tóc ngắn, áo xanh đá); giữ trung tính vì research unknown #2.

### Mẹ (ở nhà)

- Tóc búi `#4A3A30` điểm bạc, áo `#8A5A6B`, điện thoại áp tai (**CLOSE-UP s5 beat 2** → s6 → s7–s8 panel `Mẹ`). Biểu cảm duy nhất: mỉm cười hiền, mắt cong (mood `soft`).
- Không bao giờ xuất hiện cùng khung hình văn phòng lạnh — mẹ chỉ thuộc về nửa ấm.
- Mâm cơm (`MealTable`, 2 bát trung tính) chỉ thuộc panel phía mẹ; không vẽ hai người ngồi chung một mâm.

### Quy tắc trung thực hình ảnh (research unknowns — bắt buộc)

- **KHÔNG khẳng định giới tính người kể** (unknown #2): ngoài tạo hình đã chốt, không thêm marker giới tính (tên, xưng hô, đồ vật gợi giới tính) trong hình.
- **KHÔNG khẳng định mẹ ở đâu / sống với ai** (unknown #1): nội thất trung tính, không marker quê/phố, không nhân vật thứ ba; nhãn panel chỉ ghi `Con` / `Mẹ` để định danh người nói.
- **KHÔNG khẳng định app gọi nào** (unknown #4): phone luôn generic — mock UI chữ + icon vẽ tay, tuyệt đối không logo Zalo/Messenger/cuộc gọi thường nào khi build.
- **Giữ mở "đường về hay đã về"** (unknown #3): s5 vẽ người con dưới đèn đường đêm đang gọi (đúng yêu cầu user "gọi lại trên đường về") nhưng không khẳng định nhà/đường ở s7–s8 — panel `Con` là phòng đêm trung tính.

### Mock UI điện thoại (luôn gắn nhãn "minh hoạ")

- Khung `PhoneFrame`: bo 64px, viền `INK` 10px (ngày) / `#0F0C0A` (tối), màn hình trắng (ngày) / `#171310` chữ kem (tối).
- 4 trạng thái: **(a)** s1/s4 "Cuộc gọi nhỡ — Mẹ" + icon gọi nhỡ đỏ `MISS` (**ống nghe úp + mũi tên trượt, tuyệt đối không tick xác nhận**) + timestamp chữ `Chiều nay` (không giờ cụ thể như `17:42` — tránh fact giả); **(b)** s3 bong bóng chat "Lát con gọi lại nha."; **(c)** s5 "Đang gọi — Mẹ" + timer + sóng âm (màn đêm `#171310` + chữ kem, KHÔNG sub-rect xanh lạc tông); **(d)** outro s8 "Đã gọi lại ✓" + tick hổ phách (giữ ngôn ngữ portrait để nhận ra "cùng chiếc điện thoại"; fix C-5: s8 KHÔNG hiện "Đang gọi" vì voice đã *"Cúp máy rồi"*).
- Nhãn "minh hoạ": pill xám `MUTED #8A94A0`, góc trên-trái khung phone, **cỡ chữ ≥30px** — bắt buộc mọi shot có mock UI.
- Rung nhẹ khi có cuộc gọi đến (s1: translateX ±8px, 3 nhịp); không rung ở trạng thái đã gọi lại.

## 6. Props tái dùng

| Prop | Mô tả | Shots |
|---|---|---|
| `PhoneFrame` | khung điện thoại + 4 trạng thái màn hình + nhãn "minh hoạ" ≥30px | s1, s3, s4, s5, s8 |
| `ChatBubble` | bong bóng chat vào/ra, tail, pop 18f | s2, s3 |
| `DeskSet` | bàn + laptop + checklist + cốc (tông `DESK`) | s2, s3 |
| `StreetLamp` | cột đèn đường đêm + chùm sáng hổ phách (beat 1 gọi lại trên đường về; WarmGlow nền ~0.25, lạnh-ấm lẫn) | s5 |
| `TwoRoomsCall` | hai panel bo góc riêng (`Con` tường lạnh `ROOM_CHILD` / `Mẹ` tường ấm `NIGHT_BG`) + dải `VoiceWave` hổ phách nối giữa + phone portrait cầu nối (s7 hiện "Đang gọi — Mẹ" + timer; s8 hiện "Đã gọi lại ✓" sau cúp máy); hai bust đều áp phone, không ngồi chung khung; panel `Con`: `SoloTable` 1 bát cơm nguội (ít/không steam) + `NightWindow` mưa; panel `Mẹ`: `MealTable` mâm nhà + steam ấm | s7, s8 |
| `MealTable` | bàn gỗ `WOOD`, 2 bát, đũa, hơi nóng (steam dash) — CHỈ thuộc panel phía mẹ | s7, s8 |
| `SoloTable` | bàn nhỏ + 1 bát cơm một mình (nguội: ít hoặc không steam — tương phản mâm nhà mẹ) + đũa — phía người con | s7, s8 |
| `NightWindow` | cửa sổ đêm + mưa chéo (s7 mưa gõ nhẹ ngoài cửa phía con), KHÔNG trăng (tránh sến khi đi cùng đèn + glow) — dùng được cho cả hai panel | s4, s7, s8 |
| `WarmGlow` | radial hổ phách, param `level` 0→1. Cường độ tương đối chốt theo §9: s5 beat 1 ~0.25 → s5 beat 2 **0.5** (ấm tràn khi bắt máy) → s6 **1.0 MAX** toàn video → s7 **0.6** → s8 **0.4** + hold lặng | s5–s8 |
| `MomBust` / `ChildBust` | bust tả thực tối giản, mắt cong cùng ngôn ngữ, mood `down/calm/soft`, bob thở ±4px | s5–s8 |

## 7. Shot references (s1–s8)

| # | Thời lượng* | Shot | Key motion |
|---|---|---|---|
| s1 HOOK | 3.4s | Màn hình "cuộc gọi nhỡ — Mẹ", rung nhẹ, nền văn phòng sáng lạnh | rung 3 nhịp + badge đỏ pop; hold 0.5s |
| s2 | 3.4s | **Close-up ngón tay POV** (người con) chạm nút tắt; laptop + tin nhắn dồn vào, cắt nhanh | cắt nhanh, slide-in tin nhắn 18f; hard-cut dứt khoát |
| s3 | 5.6s | Chat "Lát con gọi lại nha." → montage nhanh 3 việc: phòng họp, gõ trả lời tin nhắn, checklist | 3 beat montage, mỗi beat ~1.2s, wipe trái; dồn dập không nghỉ |
| s4 | 5.6s | **Phòng tối** (đèn đã tắt); **màn hình điện thoại sáng bật lên** giữa bóng tối, dòng "Cuộc gọi nhỡ — Mẹ" ban chiều hiện lại | dissolve ngày→tối 20f, nhịp chậm hẳn, chùng xuống |
| s5 BẢN LỀ (đỉnh a) | 7.1s | Beat 1: con dưới `StreetLamp` đêm, phone "Đang gọi — Mẹ" (giữ fix C-2). Beat 2: **CLOSE-UP mẹ áp phone vào tai**, sáng ấm tràn lên, **chuông dừng** (dải `VoiceWave` nối hai beat) | nín 0.5s sau "hai tiếng" + glow →0.5 + chuông dừng (riser→im lặng); tay bấm gọi đối xứng ngón tay bấm tắt s2 |
| s6 (đỉnh b, ấm NHẤT) | 4.4s | Mẹ ở nhà, **đèn vàng ấm MẠNH NHẤT toàn video** (WarmGlow 1.0), push-in rất chậm về phía mẹ | push-in 1→1.04 **chậm nhất** toàn video, hold 0.6s |
| s7 | 7.3s | `TwoRoomsCall`: panel Con — phòng riêng, **1 bát cơm đã nguội** một mình, **mưa ngoài cửa sổ** riêng (mưa gõ nhẹ); panel Mẹ — mâm cơm nhà mẹ; dải VoiceWave nối giữa, cả hai áp phone | push-in 1→1.05, steam loop seed cố định (panel mẹ có steam, panel con ít/không) |
| s8 CHỐT (đỉnh c) | 8.0s | `TwoRoomsCall` giữ nguyên; phone cầu nối hiện **"Đã gọi lại ✓" + tick hổ phách** (đã cúp máy); cửa sổ đêm ấm; **caption tắt sớm + hold lặng cuối ≥1.0s** | tĩnh gần như tuyệt đối; caption tắt sớm nhường hold lặng, outro +1.4s |

\* = voice ước tính script v2 (4.1 từ/s: s1 2.9 / s2 2.9 / s3 5.1 / s4 5.1 / s5 6.1 / s6 3.9 / s7 6.8 / s8 6.1) + 0.5s padding/shot; s5 +0.5s nín, s8 +1.4s outro. Tổng ≈ 45–46s (khớp `script.md` v2; nửa sau ấm-chậm thực tế có thể nhích lên).

### Nhịp cắt nhanh→chậm

s1–s3: shot ~3.4–5.6s, ≥2 beat/shot, easing có overshoot nhẹ. s4: dissolve bản lề. s5–s8: shot 4.4–8.0s, 1 động tác/shot (push-in hoặc tĩnh), hold ≥0.6s (s8 hold lặng ≥1.0s + outro 1.4s). Không flash-cut sau s5.

## 8. Khác biệt đã chốt (không trùng Lan / gaplai)

- **vs Lan** (`out/lan-reel.mp4`): Lan = nền đen `#000` + pictogram que trắng + nhấn cam `#F58B4C` + Inter 700 chữ phía trên. Video này: không que, không đen-cam, không chữ trên — người tả thực tối giản, nền sáng lạnh→tối ấm, Be Vietnam Pro 600 caption phía dưới.
- **vs gaplai** (phòng đêm nâu `#171310` + đèn vàng `#E8B04B` + hai ghế đối diện tĩnh): video này mở bằng mock phone ban ngày lạnh, có arc sáng→tối + nhịp nhanh→chậm, nhấn đỏ gọi nhỡ `#E5484D`, chỉ dùng hổ phách ở nửa sau; hai ghế đối diện cùng phòng → hai phòng riêng nối bằng sóng thoại (`TwoRoomsCall`).

- **Trung thực hình ảnh:** phone generic không logo; timestamp mock là chữ `Chiều nay`; nhãn panel chỉ `Con`/`Mẹ`; mâm 2 bát trung tính phía mẹ (xem §5).

## 9. Hệ thống nhấn mạnh (3 đỉnh — theo script v2)

Ba đỉnh delivery + visual đi kèm, cường độ ánh sáng (`WarmGlow level`) tăng dần rồi hạ về lặng:

| Đỉnh | Shot | Delivery (voice) | Visual đi kèm | Ánh sáng tương đối |
|---|---|---|---|---|
| (a) nín nhịp | s5 beat 2 "Con ăn cơm chưa?" | **Nín 1 nhịp ~0.5s** sau "chưa kịp reo hai tiếng" rồi mới đọc câu mẹ — ấm, chậm, rõ từng chữ | **CLOSE-UP mẹ áp phone vào tai**; **chuông dừng** (riser→im lặng, không slam); ấm tràn lên; tay bấm gọi đối xứng ngón tay bấm tắt s2 ("chính ngón tay ban chiều") | beat 1 ~0.25 (đèn đường, lạnh-ấm lẫn) → beat 2 **0.5** |
| (b) ấm nhất | s6 "Mẹ chỉ muốn nghe giọng mình một chút thôi." | **Ấm NHẤT, chậm nhất** (~3.2 từ/s), nhỏ nhẹ | **WarmGlow level cao nhất** toàn video + **push-in chậm nhất** (1→1.04 cả shot) về phía mẹ | **1.0 MAX** |
| (c) lặng chốt | s8 "Một cuộc gọi lại thôi, họ cũng vui rồi." | **Lặng 1.0–1.4s** sau câu cuối, outro hold; giữ suy ngẫm ngôi "mình", không khuyên răn | **Caption tắt sớm** trước khi hết shot để nhường hold lặng; `TwoRoomsCall` tĩnh gần như tuyệt đối; phone cầu nối "Đã gọi lại ✓"; cửa sổ đêm ấm | s7 **0.6** → s8 **0.4** + hold |

Chuỗi cường độ chốt: **s5 beat 2 (0.5) → s6 (1.0 max) → s7 (0.6) → s8 (0.4 + hold lặng)**. Không đỉnh nào dùng slam; chỉ dissolve/push-in/hold đổi tốc độ, không đổi easing gốc (§1).

## 10. Style-frames (pipeline §1, bản 9:16)

3 SVG tĩnh tại `out/qa/`: `cuoc-goi-nho-cua-me-style-s1.svg` (hook), `-s5.svg` (bản lề 2 beat: con gọi dưới đèn đường → mẹ bắt máy), `-s8.svg` (kết `TwoRoomsCall`: hai panel riêng + phone cầu nối). 1080×1920, tự vẽ shapes/text, caption mẫu đúng vị trí đáy 250px + vạch safe-zone 210px để QA. (Đã sửa s1: timestamp → `Chiều nay`, badge → ống nghe + mũi tên.)
