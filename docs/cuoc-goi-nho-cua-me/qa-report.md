# QA report — `cuoc-goi-nho-cua-me` (Cuộc gọi nhỡ của mẹ)

## Code review (reviewer độc lập, 2026-10-14)

Phạm vi: `src/cuocgoinho/kit.tsx`, `timeline.ts`, `Reel.tsx`,
`scenesA/B/C.tsx`, `src/Root.tsx` (composition `CuocGoiNhoReel`),
đối chiếu `docs/cuoc-goi-nho-cua-me/voice.json` từng chữ.

### Kết quả kiểm tra

| # | Hạng mục | Kết quả |
|---|----------|---------|
| 1 | `tsc --noEmit` toàn project | PASS (exit 0, không lỗi) |
| 2 | Determinism (`Date.now`/`Math.random`) | PASS — không có trong `src/cuocgoinho`; chỉ `Math.sin(f/…)` theo frame, `f % 30` blink, timer `Math.floor(f/30)` — tất cả deterministic |
| 3 | Timeline khớp voice durations | **1 lỗi Trung bình (đã fix)** — xem bên dưới |
| 4 | Caption khớp voice từng chữ | PASS 8/8 (so bằng script normalize whitespace: `parts.join(' ')` ≡ voice) |
| 5 | Safe-zone đáy 210px | PASS — mọi caption `bottom: 250` (`kit CcLine`, `scenesC CapsLines`); `scenesA SeqCaps`/`scenesB Caps` dùng lại `CcLine` nên cùng 250px |
| 6 | Font local, không `@import` mạng | PASS — `CcFonts` dùng `staticFile('fonts/PlusJakartaSans-Bold-VN/Latin.woff2')`, cả 2 file + `OFL-PlusJakartaSans.txt` tồn tại trong `public/fonts`; không có `@import`/URL mạng trong `src/cuocgoinho` |
| 7 | SFX offsets hợp lệ | PASS — `s1+5+90≤114`, `s2+8+60≤90`, `s3+5+60≤157`, `s3+40+56≤157`, `s5+5+60≤142`, `s5+45+60≤142`, `s8+120+70≤264`; file mp3 đủ 8 voice + bgm + 7 sfx |
| 8 | Voice thực tế (ffprobe) khớp `sec` | PASS — s1 2.798/s2 2.503/s3 4.732/s4 2.993/s5 4.220/s6 4.178/s7 5.911/s8 6.396 (đều ≤ `sec`, nằm gọn trong shot `sec+0.5s`, voice offset 4f) |
| 9 | Root không vỡ comp cũ | PASS — chỉ thêm 2 dòng import + `Composition id="CuocGoiNhoReel"`; 7 comp cũ nguyên vẹn |
| 10 | Caption hardcode `dur` trong scenesA | PASS — s1 `114`, s2 `90`, s3 `157` khớp timeline tính toán; s4–s8 đọc `CGN_SHOTS` động |

### Lỗi đã phát hiện và fix

**[Trung bình] `CGN_TOTAL` thực tế = 1207, không phải 1206 như spec/comment
(`src/cuocgoinho/timeline.ts`).**
Nguyên nhân: floating-point — `(6.4 + 1.4) * 30 = 234.00000000000003`
nên `Math.ceil` ra 235 thay vì 234, khiến `s8.duration = 265`
thay vì 264. Đã xác minh bằng cách compile đúng file `timeline.ts`
và import thật (không chỉ tính tay): `CGN_TOTAL=1207`, `s8=265`.
Fix: trừ epsilon trước khi ceil
(`Math.ceil((sec + pad) * 30 - 1e-6)`), đã kiểm tra cả 8 shot
vẫn ra đúng durations ý đồ (114/90/157/105/142/141/193/264) và
`CGN_TOTAL=1206`. An toàn vì mọi consumer (`Reel.tsx` BGM fade,
`Root.tsx` composition, `scenesB/C`, SFX `s8+120+70=190≤264`) đều
đọc `CGN_TOTAL`/`CGN_SHOTS` động, không hardcode 1207/265 ở đâu.
Sau fix: compile lại → `CGN_TOTAL=1206`, `s8=264`; `npx tsc --noEmit` PASS.

### Ghi nhận mức Thấp (không sửa — ngoài ngưỡng fix, không ảnh hưởng render)

- **Comment stale về `kit CcCaps**`: `scenesA/B/C` ghi "`CcCaps` giữ mọi
  part visible tới cuối shot / chồng chữ", nhưng code `kit.tsx:87-107`
  hiện tại đã là luật replace (`end[i] = start[i+1]`). Comment viết cho
  bản kit cũ; `CcCaps` hiện không còn usage nào (dead export, chỉ còn
  định nghĩa). Không ảnh hưởng render — các scene dùng `SeqCaps`/`Caps`/
  `CapsLines` cục bộ.
- **Crossfade caption 6–10f** tại biên part (`scenesA SeqCaps`,
  `scenesB Caps`): hai pill chồng nhau thoáng qua khi chuyển part.
  Transient, chuẩn crossfade, không sửa để tránh đổi hành vi đã duyệt stills.
- **Glyph "✓"** (`PhoneDone` s8 "Đã gọi lại ✓", U+2713) không nằm trong
  `unicode-range` của 2 subset font → rơi về font hệ thống. Cosmetic,
  chỉ 1 ký tự trang trí trong SVG.
- **`Reel.tsx` import `Fonts` từ `Main`**: kéo theo `@font-face`
  DM Serif/Inter/JetBrains Mono không dùng tới + reset toàn cục
  `*{box-sizing}`. Vô hại (`@font-face` chỉ tải khi dùng; stills đã
  duyệt với cấu hình này). Không chạm để giữ nguyên baseline đã QA.

## Frame tests (tester frames, 2026-10-14)

Render 16 stills `out/qa/cuoc-goi-nho-cua-me-q-<frame>.png`
(`npx remotion still src/index.ts CuocGoiNhoReel … --frame=N`),
mỗi shot 2 frame (giữa + gần cuối):
s1 f57/f105, s2 f159/f196, s3 f282/f352, s4 f413/f458,
s5 f537/f600, s6 f678/f742, s7 f845/f925, s8 f1075/f1185.
Đọc từng PNG + 3 frame xác minh bổ sung (f530/f545/f1150).

### Kết quả từng frame

| Frame (shot/local) | Caption thấy được | Nhận xét |
|---|---|---|
| f57 (s1/57) | "Mình định lát nữa gọi lại…" (accent "gọi lại") | ĐẠT — đủ dấu, tương phản tốt, trên safe-zone |
| f105 (s1/105) | như f57 | ĐẠT |
| f159 (s2/45) | "mình đang làm việc" | ĐẠT |
| f196 (s2/82) | "nên bấm tắt." (accent "bấm tắt") | ĐẠT — fade-out shot bắt đầu ở local 82, vẫn đặc |
| f282 (s3/78) | "Rồi mình họp, trả lời" (accent "họp") | ĐẠT — beat họp, busts mắt cong |
| f352 (s3/148) | "tin nhắn, làm nốt vài việc." | ĐẠT — checklist 3/3 tick, fade-out ở local 149 chưa chạm |
| f413 (s4/52) | "mình mới nhớ" (accent) | ĐẠT — chữ kem/tối đọc tốt, phone "minh hoạ" đủ |
| f458 (s4/97) | "lời hẹn lúc chiều." | ĐẠT |
| f537 (s5/71) | "hỏi đúng một câu:" + bóng "Mẹ bắt máy rất nhanh," phía sau | Chồng transient 6f (xem phân tích dưới) |
| f600 (s5/134) | ""Con ăn cơm chưa?"" | ĐẠT |
| f678 (s6/70) | "Mẹ chỉ muốn" | ĐẠT — mưa gọn trong cửa sổ (có clipPath) |
| f742 (s6/134) | "nghe giọng mình một chút thôi." | ĐẠT |
| f845 (s7/96) | 2 pills part 2 | ĐẠT — đủ dấu, "minh hoạ" trên phone cầu nối |
| f925 (s7/176) | 2 pills part 2 | ĐẠT |
| f1075 (s8/133) | 2 pills "Một cuộc gọi lại thôi, / họ cũng vui rồi." | ĐẠT — phone "Đã gọi lại ✓" |
| f1185 (s8/243) | (không caption) | Theo thiết kế — hold lặng cuối 30f (xem dưới) |

### Phân tích 2 điểm nghi vấn (đều KHÔNG phải lỗi, không sửa code)

1. **f537 chồng caption ("bóng ma") — transient crossfade, chấp nhận.**
   `scenesB Caps` (giống `scenesA SeqCaps` và luật Caps gaplai/tt2):
   part cũ fade-out 6f đồng thời part mới fade-in 8f tại biên
   (`end[i] = start[i+1]`). s5 biên part2→part3 ở local 67
   (`starts()` theo tỉ lệ ký tự, sec=4.22); f537 = local 71,
   đúng giữa cửa sổ crossfade ~67–73/142f (~4% thời lượng shot).
   Xác minh: f530 (local 64) chỉ còn "Mẹ bắt máy rất nhanh,",
   f545 (local 79) chỉ còn "hỏi đúng một câu:" — cả hai sạch,
   một pill duy nhất, không cắt/chồng. Nhất quán với quyết định QA
   trước ("crossfade chuẩn, không sửa để tránh đổi hành vi đã duyệt").

2. **f1185 không caption — hold lặng outro 30f theo thiết kế, chấp nhận.**
   `CgnS8` dùng `CapsLines … holdEnd={D - 30}` (comment trong code:
   "Part 2 tắt ở D-30: hold lặng cuối 30f, không CTA").
   D=264 → caption tắt ở local 234 (fade 226–234);
   f1185 = local 243 nên trống là đúng ý đồ.
   Xác minh: f1150 (local 208) hiện đủ 2 pills part 2 đặc, đúng chữ.

### Các hạng mục checklist khác (16/16 frames)

- Caption cắt/chồng ngoài 2 điểm trên: không có.
- Đủ dấu tiếng Việt mọi caption + text scene ("Cuộc gọi nhỡ",
  "Chiều nay", "Đã bấm tắt", "Trả lời tin nhắn"…): ĐẠT.
- Tương phản (pill trắng/chữ đậm ban ngày, pill tối/chữ kem + textShadow
  ban đêm): ĐẠT.
- Caption đáy 250px, không lọt safe-zone 210px (kể cả stack 2 pills
  s7/s8 — pill dưới ở 250, pill trên cao hơn): ĐẠT.
- Nhãn "minh hoạ" trên mọi mock phone (s1 PhoneFrame, s3 phone beat 1,
  s4 PhoneFrame, s5 thẻ "Đang gọi", s7/s8 phone cầu nối): ĐẠT.
- Phone s8 "Đã gọi lại ✓" (f1075 + f1185): ĐẠT.
- Mắt bust cong mọi bust (calm/soft, s3/s5/s6/s7/s8): ĐẠT,
  không stick-figure.
- Mưa không tràn khung: mọi `NightWindow` đều nằm trong clipPath
  khớp khít (`s6win`, `cgn s7/s8 winCon/winMe`); stills s6/s7/s8 mưa
  gọn trong cửa sổ: ĐẠT.
- Ô cam nhỏ lẻ trong s4 (f413/f458, 2 ô hai biên): KHÔNG phải lỗi —
  đèn nhà `scenesB CgnS4` (`opacity = night*0.85`, ô thứ 3 bị phone che).

### Kết luận

Không phát hiện lỗi cần sửa → không chạm `src/cuocgoinho/`,
không render lại. 16/16 frames ĐẠT (f537 + f1185 đã xác minh là
hành vi đúng ý đồ qua 3 stills bổ sung f530/f545/f1150).

## Code review v2 (reviewer độc lập, 2026-10-14)

Phạm vi v2: `src/cuocgoinho/kit.tsx`, `timeline.ts` (`CGN_TOTAL` 1419),
`Reel.tsx`, `scenesA/B/C.tsx`, `src/Root.tsx`, đối chiếu
`docs/cuoc-goi-nho-cua-me/voice.json` (script v2, 8 shots) từng chữ.

### Kết quả kiểm tra

| # | Hạng mục | Kết quả |
|---|----------|---------|
| 1 | `npx tsc --noEmit` | PASS trước fix (exit 0) và PASS sau fix (exit 0) |
| 2 | Determinism (cấm `Date.now`/`Math.random`) | PASS — không có usage thật trong `src/cuocgoinho` (1 match duy nhất là comment trong `scenesB.tsx:33`); chỉ `Math.sin(f/…)` theo frame, `f % 30` blink, `Math.floor(f/30)` timer — tất cả deterministic |
| 3 | Caption khớp `voice.json` v2 từng chữ 8/8 | PASS 8/8 (normalize whitespace, `parts.join('')/join(' ')` ≡ voice): s1 2 parts, s2 3 parts, s3 3 parts, s4 4 parts, s5 4 parts, s6 2 parts, s7 5 parts, s8 5 parts |
| 4 | Safe-zone đáy 210px | PASS — `kit CcLine` `bottom: 250`, mọi caption qua `CcCaps`/`CcLine` nên cùng 250px |
| 5 | Font Be Vietnam local, cấm `@import` mạng, weight 600 | **1 lỗi Trung bình (đã fix)** — xem bên dưới. Local PASS: `CcFonts` dùng `staticFile('fonts/BeVietnamPro-SemiBold-*.woff2')`, cả 3 file tồn tại trong `public/fonts`; không có `@import`/URL mạng trong `src/cuocgoinho` |
| 6 | SFX 7 cues trong shot | PASS — đúng 7 cues `CGN_SFX`; tất cả nằm gọn trong shot: s1+5+90=95≤114, s2+8+60=68≤99, s3+5+60=65≤193, s3+40+56=96≤193, s5+5+60=65≤219, s5+45+60=105≤219, s8+120+70=190≤250; đủ file 8 voice + bgm + 7 sfx trong `public/audio/cuoc-goi-nho-cua-me/` |
| 7 | Timeline khớp durations đo + holds | PASS — raw khớp spec (s1 2.80 / s2 2.80 / s3 5.92 / s4 5.44 / s5 6.78 / s6 3.89 / s7 7.26 / s8 5.91; holds s1+15f, s8+30f): durations tính lại 114/99/193/179/219/132/233/250, `CGN_TOTAL`=1419; hardcode `dur` trong scenesA (114/99/193) khớp timeline, s4–s8 đọc `CGN_SHOTS` động |
| 8 | Root comp cũ nguyên vẹn | PASS — `src/Root.tsx` giữ đủ 8 compositions, 7 comp cũ + `CuocGoiNhoReel` (`CGN_TOTAL`); không xóa/sửa comp cũ |

### Lỗi đã phát hiện và fix

**[Trung bình] `fontWeight={700}` trong `scenesB.tsx` (6 chỗ) + `scenesC.tsx`
(6 chỗ) — tổng 12 chỗ, vi phạm quy tắc weight-600.**
`CcFonts` chỉ khai báo subset `Be Vietnam Pro` weight 600 (3 file
`BeVietnamPro-SemiBold-*.woff2`); weight 700 không có file → rơi vào
faux-bold/synthetic, sai spec §3 (toàn bộ text weight 600).
`scenesA.tsx` + `kit.tsx` đã đúng 600 toàn bộ.
Fix: `replaceAll fontWeight={700}` → `fontWeight={600}` trong cả 2 file
(`scenesB`: phone s4 "Mẹ/Cuộc gọi nhỡ/Chiều nay", thẻ s5 "minh hoạ/Đang gọi — Mẹ/timer";
`scenesC`: nhãn panel "Con/Mẹ", phone s7 "Đang gọi/Mẹ/timer", phone s8 "Đã gọi lại ✓").
Sau fix: grep `fontWeight={700}` trong `src/cuocgoinho` = 0 match;
`npx tsc --noEmit` PASS (exit 0). Không chạm logic/timeline/caption.

### Ghi nhận mức Thấp (không sửa)

- `Reel.tsx` import `Fonts` từ `Main`: kéo theo `@font-face` DM Serif/Inter/JetBrains Mono
  không dùng tới (local `staticFile`, không phải `@import` mạng) — vô hại, giữ nguyên baseline.
- `kit.tsx` export `VO` (`CGN_VOICE_OFFSET`) hiện không có consumer ngoài `starts()` nội bộ —
  dead export vô hại, không xóa để tránh đổi API kit.

## Boundary tests (tester biên shot, 2026-10-14)

Timeline v2 (`CGN_TOTAL`=1419): s1 0/114, s2 114/99, s3 213/193,
s4 406/179, s5 585/219, s6 804/132, s7 936/233, s8 1169/250.
Render 8 stills biên `out/qa/cuoc-goi-nho-cua-me-e-<frame>.png`
(`npx remotion still src/index.ts CuocGoiNhoReel …`):
f113 (s1 cuối/local 113), f212 (s2 cuối/98), f360 (s3 giữa/147),
f465 (s4 giữa/59), f584 (s4 cuối/178), f803 (s5 cuối/218),
f935 (s6 cuối/131), f1168 (s7 cuối/232) + 1 still xác minh
f1175 (s8 đầu/local 6, kiểm tra phone sau cut s7→s8).

### Kết quả từng frame

| Frame (shot/local) | Thấy được | Nhận xét |
|---|---|---|
| f113 (s1/113) | phone "Cuộc gọi nhỡ / Mẹ / Chiều nay" + "minh hoạ", caption mờ dần | ĐẠT — caption fade-out [108,114] (`CcCaps` `end=D`), còn ~5% nên mờ là đúng; cut s1→s2 cùng `DAY_BG`, không nháy |
| f212 (s2/98) | pill "Đã bấm tắt" + 3 cards tin nhắn, caption mờ dần | ĐẠT — caption fade-out [93,99] đúng luật; một pill duy nhất, không chồng |
| f360 (s3/147) | beat 3 typing + checklist, caption "làm nốt việc, rồi quên bẵng." đặc | ĐẠT — một pill duy nhất; row 3 mới ramp-in (đúng `130+i*8`), không bóng ma |
| f465 (s4/59) | phone "Mẹ / Cuộc gọi nhỡ / Chiều nay" + "minh hoạ", caption "Mở điện thoại lên, dòng chữ" đặc | ĐẠT — một pill duy nhất, mưa gọn trong `NightWindow` |
| f584 (s4/178) | như f465, caption "mình chột dạ." mờ dần | ĐẠT — fade-out [173,179] đúng luật; cut s4→s5 cùng nền đêm, không nháy |
| f803 (s5/218) | con + mẹ close-up, thẻ "Đang gọi — Mẹ 00:10", caption mờ dần | ĐẠT — timer `00:{03+⌊218/30⌋}`=00:10 đúng; caption fade-out [213,219] đúng; `beat2` đặc hoàn toàn |
| f935 (s6/131) | mẹ close-up + đèn treo, caption mờ dần | ĐẠT — fade-out [126,132] đúng; chỉ part 2 visible, một pill duy nhất |
| f1168 (s7/232) | TwoRooms + phone "Đang gọi Mẹ 00:07", caption mờ dần | ĐẠT — timer `⌊(232-4)/30⌋`=7 → 00:07 đúng; fade-out [227,233] đúng |
| f1175 (s8/6) | phone "Đã gọi lại ✓" hổ phách + "minh hoạ", caption part 1 mờ dần vào | ĐẠT — cut s7→s8 sạch: không còn "Đang gọi", sóng `dim` tĩnh, caption fade-in `ramp(f,4,10)` đúng (còn mờ ở local 6 là đúng) |

### Các hạng mục checklist biên (9/9 frames)

- Chuyển cảnh mượt / không nháy, không khung trắng / render dở: ĐẠT —
  cut cứng giữa `Sequence` (không crossfade scene), các cặp cùng tông
  (s1→s2 ngày, s4→s5→s6→s7→s8 đêm) liền mạch; s2→s3, s3→s4, s6→s7
  là đổi cảnh có chủ ý, stills không có artifact nửa-cảnh.
- Caption biên chồng 2 pill: KHÔNG có — `CcCaps` replace-style
  (`end[i]=start[i+1]`) + mỗi scene caption local-frame riêng nên tại
  biên tối đa 1 pill/scene; crossfade 6f chỉ xuất hiện giữa part
  trong-shot, không tại biên shot (biên còn có gap 4f do `VO`=4:
  caption cũ tắt ở D, caption mới bắt đầu ở local 4 — đúng ý đồ khớp voice).
- Phone s8 "Đã gọi lại ✓": ĐẠT (f1175 + stills v2 `…-v2-s8-cap`
  "Một cuộc gọi lại thôi," / `-s8-end` / `-s8-silent` đối chiếu:
  phone giữ "Đã gọi lại ✓" suốt s8, không rò "Đang gọi").
- Bóng ma (ghost pill / text doppelt): KHÔNG có — `CcLine`
  `inline-block` một hộp duy nhất, stills mọi biên chỉ 0–1 pill.

### Kết luận

Không phát hiện lỗi cần sửa → không chạm `src/cuocgoinho/`,
không render lại. 9/9 frames ĐẠT.
