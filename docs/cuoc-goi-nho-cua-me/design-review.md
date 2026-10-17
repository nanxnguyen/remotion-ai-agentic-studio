# Design Review — cuoc-goi-nho-cua-me (Cuộc gọi nhỡ của mẹ)

Reviewer độc lập (clean context). Đối chiếu: `brief.md` + `design-spec.md` + `script.md` (8 shots, 138 từ) + 3 style frames `out/qa/cuoc-goi-nho-cua-me-style-s1.svg`, `-s5.svg`, `-s8.svg`.

## Bảng điểm (tổng 10)

| Tiêu chí | Điểm tối đa | Điểm | Bằng chứng |
|---|---|---|---|
| Visual identity rõ + hợp story mẹ-con | 2.5 | **2.3** | Arc "ngày sáng lạnh → tối ấm dần" đọc rõ qua 3 frames: s1 `DAY_BG #E8EEF2` + PhoneFrame trắng + badge đỏ `MISS #E5484D`; s5 gradient chuyển `#6B5A4E → #3A2E28 → #2B2320` + glow hổ phách `#F2A65A`; s8 `NIGHT_BG` + `MealTable` gỗ `WOOD` + mâm 3 bát + hơi nóng + phone "Đã gọi lại" callback đúng brief §callback. Beat hành động rõ: s1 gọi nhỡ → s5 mẹ áp phone mỉm cười (bản lề) → s8 hai bust bên mâm cơm. Close-up cảm xúc đúng chỗ (s5 nụ cười mẹ, mắt cong). Trừ 0.2: hổ phách `#F2A65A` vẫn gần vàng đèn gaplai `#E8B04B` khi nhìn lướt — nhưng đã được bù bằng nửa ngày lạnh + nhấn đỏ + áo mẹ tím nâu `#8A5A6B`. |
| Consistency 3 frames | 2.0 | **1.7** | Tokens đúng hex spec: da `#E9BE9C`, tóc mẹ `#4A3A30` + điểm bạc `#C9BBA8`, áo mẹ `#8A5A6B`, áo con `#3E5A78`, caption đáy 250px + vạch safe-zone 210px cả 3 frames. Mẹ s5→s8 nhất quán (búi + streak bạc + áo). Trừ 0.3: (a) mắt mẹ là đường cong cười nhưng mắt con là 2 chấm tròn — lệch ngôn ngữ vẽ; (b) phone s1 dọc portrait lớn vs s8 nằm ngang nhỏ — callback "cùng chiếc điện thoại" đọc yếu; (c) s5 thiếu accent "rất nhanh" so với spec §4. |
| Legibility phone/caption 1080×1920 | 2.0 | **1.7** | Caption 50px/700 ≤2 dòng, căn giữa, trên safe-zone (y 1570/1632 vs vạch 1710) cả 3 frames. Contrast: `INK` trên `DAY_BG` ~13.5:1 (s1 có pill trắng 0.82 càng chắc); `CREAM` trên `NIGHT_BG` ~12:1 (s5/s8). Mock UI có pill "minh hoạ" đúng spec. Trừ 0.3: (a) chữ "Đã gọi lại" trong phone s8 chỉ 30px — nhỏ, chỉ là prop nên chấp nhận được nhưng không nên nhỏ hơn; (b) pill "minh hoạ" s5 dùng 26px, dưới spec 30px; (c) caption đêm trong SVG tĩnh chưa có textShadow (spec §4 yêu cầu `0 2px 18px rgba(0,0,0,.78)`) — phải bổ sung khi build. |
| Originality vs Lan & gaplai | 2.0 | **1.8** | vs Lan (nền đen `#000` + que trắng + cam `#F58B4C` + Inter chữ trên): video này nền sáng lạnh, bust tả thực tối giản (không que), Plus Jakarta Sans caption đáy — khác hoàn toàn. vs gaplai (phòng đêm nâu `#171310` + đèn vàng `#E8B04B` + 2 ghế tĩnh): video này mở bằng mock phone ban ngày lạnh, có arc sáng→tối + nhanh→chậm, nhấn đỏ `#E5484D`, ghế đối diện → mâm cơm — khác rõ. Trừ 0.2: cặp hổ phách/vàng như đã nêu — cần giữ áo mẹ `#8A5A6B` (không chuyển vàng) để không trôi về gaplai. |
| Craft tổng | 1.5 | **1.2** | SVG 1080×1920 sạch, đúng viewBox, tokens chuẩn, safe-zone QA đầy đủ, hơi nóng/rain/glow vẽ có chủ ý. Trừ 0.3: (a) badge "Cuộc gọi nhỡ" s1 dùng icon **dấu tick** (checkmark) — sai ngữ nghĩa, phải là icon gọi nhỡ; (b) phone s5 có sub-rect xanh `#4A90B8` bên trong màn hình đêm — gây rối, sai spec màn đêm `#171310` + chữ kem. |

## Fix bắt buộc (trước build)

1. **s1 badge icon:** thay checkmark bằng icon gọi nhỡ đúng nghĩa (ống nghe úp + mũi tên trượt / phone-missed), giữ vòng tròn đỏ `MISS #E5484D`. Không dùng tick xác nhận cho trạng thái nhỡ.
2. **Thống nhất mắt nhân vật:** chuyển mắt con từ 2 chấm tròn sang cùng ngôn ngữ đường cong/mood với mẹ (spec mood `down/calm/soft`, bob thở ±4px khi build).
3. **s5 phone + caption:** xoá sub-rect xanh trong màn hình đêm, giữ màn `#171310` + chữ kem + timer hổ phách; pill "minh hoạ" nâng về ≥30px; bổ sung accent "rất nhanh" (spec §4) hoặc sửa spec nếu cố ý bỏ.
4. **Caption đêm khi build:** bắt buộc `textShadow 0 2px 18px rgba(0,0,0,.78)` cho s5–s8 (SVG tĩnh chưa thể hiện); giữ pill trắng s1.
5. **s8 callback phone:** giữ ngôn ngữ portrait của s1 (dựng nghiêng/đặt nghiêng trên bàn thay vì xoay ngang thành landscape) để "cùng chiếc điện thoại" nhận ra ngay; giữ tick + chữ "Đã gọi lại" hổ phách, cỡ chữ prop không dưới 30px.

## TỔNG: 8.7/10 — verdict: PASS (có fix bắt buộc nhỏ trước build)

Không có lỗi gãy kết cấu (arc, beat, callback, phân biệt Lan/gaplai đều đạt). 5 fix trên là nhỏ, sửa trực tiếp trên frames/spec rồi vào build, không cần vẽ lại hướng mới.

---

## Vòng 2

Reviewer độc lập (clean context, chấm lại sau sửa). Đối chiếu: `brief.md` + `design-spec.md` (đã cập nhật: §5 mắt cong thống nhất, timestamp `Chiều nay`, icon ống nghe + mũi tên, `TwoRoomsCall`, màn đêm `#171310`) + 3 frames mới (`-s1.svg` badge ống nghe + mũi tên, timestamp "Chiều nay"; `-s5.svg` con gọi dưới đèn đường + mẹ bắt máy; `-s8.svg` hai phòng riêng nối sóng thoại).

### Bảng điểm vòng 2 (tổng 10)

| Tiêu chí | Điểm tối đa | Điểm | Bằng chứng |
|---|---|---|---|
| Visual identity rõ + hợp story mẹ-con | 2.5 | **2.4** | Arc "ngày sáng lạnh → tối ấm dần" giữ nguyên và rõ hơn: s1 `DAY_BG #E8EEF2` + PhoneFrame trắng; s5 gradient đêm + `StreetLamp` + chùm sáng hổ phách + glow `0.55`; s8 hai panel tường lạnh/ấm phân biệt + `MealTable` phía mẹ. Beat bản lề s5 giờ có 2 beat thật (con dưới đèn đường → mẹ bắt máy, nối bằng `VoiceWave`) thay vì chỉ mẹ cười như vòng 1. Trừ 0.1 tồn dư: hổ phách `#F2A65A` nhìn lướt vẫn gần vàng đèn gaplai `#E8B04B` — đã bù bằng nửa ngày lạnh + nhấn đỏ + áo mẹ `#8A5A6B`, giữ nguyên khuyến nghị vòng 1. |
| Consistency 3 frames | 2.0 | **1.9** | 3 lỗi vòng 1 đã sửa sạch: (a) mắt con s5 (đường cong `M 668 600 q 21 -15 42 0`) + s8 (`M 200 480 q 20 -14 40 0`) cùng ngôn ngữ cong với mắt mẹ — không còn chấm tròn; (b) phone s1 portrait ↔ s8 phone cầu nối portrait `280×400` — "cùng chiếc điện thoại" đọc được; (c) caption s5 đã có đủ 2 accent `rất nhanh` + `Con ăn cơm chưa?` đúng spec §4. Tokens chuẩn: da `#E9BE9C`, tóc mẹ `#4A3A30` + streak bạc `#C9BBA8`, áo mẹ/con đúng hex cả 3 frames. Trừ 0.1: status card "Đang gọi" ở s5 tỉ lệ `420×360` hơi ngang, khác ngôn ngữ portrait của `PhoneFrame` s1/s8 — chấp nhận được nếu coi là overlay trạng thái (con đã có phone nhỏ áp tai riêng), nhưng khi build nên thu về portrait hoặc định danh rõ là overlay. |
| Legibility phone/caption 1080×1920 | 2.0 | **1.9** | Pill "minh hoạ" cả 3 frames đã về đúng spec ≥30px (s1 30px, s5 30px, s8 30px — lỗi 26px vòng 1 đã hết). Chữ phone s5 `46px` + timer `38px`, s8 `38px` + timer `36px` — đọc tốt, không còn chữ 30px như vòng 1. Caption đáy 250px + safe-zone 210px cả 3 frames; contrast ngày `13.5:1` / đêm `~12:1` giữ nguyên. Trừ 0.1 carry-over: caption đêm trong SVG tĩnh vẫn chưa có `textShadow 0 2px 18px rgba(0,0,0,.78)` (spec §4) — bắt buộc bổ sung khi build, không trừ thêm vì SVG tĩnh không thể hiện. |
| Originality vs Lan & gaplai | 2.0 | **1.8** | Không đổi so với vòng 1: khác Lan hoàn toàn (không que, không đen-cam, không chữ trên); khác gaplai rõ (mở bằng mock phone ngày lạnh, arc sáng→tối + nhanh→chậm, nhấn đỏ `#E5484D`; hai ghế đối diện cùng phòng → hai phòng riêng nối sóng thoại). Giữ nguyên trừ 0.2 cặp hổ phách/vàng + khuyến nghị giữ áo mẹ `#8A5A6B`. |
| Craft tổng | 1.5 | **1.4** | 2 lỗi craft vòng 1 đã sửa sạch: (a) badge s1 giờ là ống nghe + mũi tên trượt (`#FFD9DC` trên nền đỏ `MISS`), không còn tick xác nhận; (b) màn hình đêm s5 là `#171310` phẳng + chữ kem + timer hổ phách, không còn sub-rect xanh `#4A90B8`. Timestamp giả `17:42` đã biến mất — s1 chỉ còn chữ `Chiều nay`; timer `00:03` (s5) / `03:12` (s8) là duration cuộc gọi, không phải giờ giả — chấp nhận. Trừ 0.1: status card s5 ngang như đã nêu ở consistency. |

### Trọng tâm vòng 2

- **Logic hai-không-gian:** ĐÚNG. s8 = hai panel bo góc riêng (`Con` tường lạnh `ROOM_CHILD #232B34` viền `#3E5A78` / `Mẹ` tường ấm `NIGHT_BG #2B2320` viền `#5A4230`), nhãn chỉ `Con`/`Mẹ`, cả hai bust đều áp phone, dải `VoiceWave` hổ phách nối giữa + phone portrait cầu nối `Đang gọi — Mẹ · 03:12`. Mâm 2 bát trung tính CHỈ phía mẹ; phía con là bàn nhỏ 1 bát riêng — không còn cảnh hai người ngồi chung mâm. `NightWindow` mưa không trăng dùng được cho cả hai panel, không marker quê/phố, không nhân vật thứ ba.
- **Beat đường về:** RÕ. s5 beat 1 có `StreetLamp` (cột + chùm sáng + cone), vệt đường đêm + vạch vàng đứt, bóng nhà xa với cửa sổ sáng — đúng "gọi lại trên đường về", nối sang beat 2 (mẹ bắt máy, glow `0.55` + tia ấm) bằng dải sóng thoại.
- **Timestamp giờ giả / tick sai:** HẾT. Không còn `17:42`, không còn tick ở badge gọi nhỡ. Tick chỉ được phép xuất hiện ở outro callback "Đã gọi lại" khi build.
- **Mắt con:** ĐÃ THỐNG NHẤT. s5 + s8 đều dùng đường cong cùng stroke (`#2A2320`, round cap) với mắt mẹ; miệng mỉm cùng ngôn ngữ.

### Fix còn lại (nhỏ, trước/khi build)

1. **Docs:** spec §9 dòng 157 còn ghi chú stale ("file `-s1.svg` trên đĩa vẫn còn timestamp `17:42` và icon tick") — thực tế frame đã sửa đúng spec; xoá/cập nhật ghi chú để khỏi gây nhầm khi build.
2. **Build (carry-over vòng 1):** caption đêm s5–s8 bắt buộc `textShadow 0 2px 18px rgba(0,0,0,.78)`; giữ pill trắng s1.
3. **Build (tùy chọn):** status card "Đang gọi" s5 thu về portrait cho cùng ngôn ngữ `PhoneFrame`, hoặc ghi rõ là overlay trạng thái (không phải device).
4. **Build (kiểm tra):** outro callback "Đã gọi lại" + tick hổ phách (spec §5 trạng thái d) phải xuất hiện ở hold cuối — s8 frame hiện chỉ thể hiện trạng thái đang gọi `03:12`, không phải thiếu sót của frame nhưng cần checklist khi build để callback brief §callback khép kín.

## TỔNG VÒNG 2: 9.4/10 — verdict: PASS (vào build, chỉ còn fix docs + checklist build)

---

## Vòng 3

Reviewer độc lập (clean context). Đối chiếu: `brief.md` (font CHỐT Be Vietnam Pro 600) + `design-spec.md` (v2: shot table mới + §9 hệ thống 3 đỉnh) + `script.md` v2 (8 shots, 160 từ) + 3 frames `out/qa/cuoc-goi-nho-cua-me-style-s*.svg` + `src/cuocgoinho/kit.tsx`. Chuẩn tham chiếu mới: kênh "Thức dậy đi" (nền đen, nhân vật trắng tối giản, caption TRÊN + keyword cam, tag kênh nhỏ) — chỉ rút nguyên tắc (accent bật từ xa, tương phản mạnh, nhân vật đọc được ở phone nhỏ, không chi tiết thừa), KHÔNG copy style.

### Bảng điểm vòng 3 (thang vòng 2, tổng 10)

| Tiêu chí | Điểm tối đa | Điểm | Bằng chứng |
|---|---|---|---|
| Visual identity rõ + hợp story mẹ-con | 2.5 | **2.4** | Arc "ngày sáng lạnh → tối ấm dần" nguyên vẹn: s1 `DAY_BG #E8EEF2` + PhoneFrame trắng + badge đỏ; s5 `StreetLamp` + gradient đêm + glow `0.55`; s8 hai panel lạnh/ấm + `MealTable` phía mẹ + phone "Đã gọi lại ✓" callback khép đúng brief §callback. Hệ thống 3 đỉnh (§9) dựng được: (a) s5 nín 0.5s + close-up + chuông dừng + glow 0.5; (b) s6 glow 1.0 + push-in chậm nhất; (c) s8 caption tắt sớm + hold ≥1.0s — kit đã có `WarmGlow level`, `VoiceWave`, `CcCaps`. Trừ 0.1 carry-over: hổ phách `#F2A65A` nhìn lướt vẫn gần vàng đèn gaplai `#E8B04B` (bù bằng nửa ngày lạnh + nhấn đỏ + áo mẹ `#8A5A6B`, giữ khuyến nghị). |
| Consistency 3 frames | 2.0 | **1.6** | Shot table spec §7 khớp thoại v2 từng số: word/sec s1 2.9 → s8 6.1, padding + pause + outro = ~45–46s, đúng `script.md:7–16` + brief (160 từ). Accent list §4 khớp chữ voice v2 cả 8 shots (s7 "cơm đã nguội" nằm trong "bát cơm đã nguội" ✓). Ghi chú stale §9 vòng 2 đã được xoá — spec sạch. Trừ 0.4: (a) **caption frame s5 SAI lời v2** — frame ghi "Mẹ bắt máy rất nhanh," (`-s5.svg:114`) nhưng script v2 + spec §4 đã là "Mẹ bắt máy ngay, chưa kịp reo hai tiếng" + accent "chính ngón tay ban chiều bấm tắt" — frame còn chữ v1, spec §4 cũng không còn "rất nhanh"; (b) bát solo phía con s8 vẫn có steam `opacity 0.45` (`-s8.svg:45`), trái spec §6 "nguội: ít hoặc không steam". |
| Legibility phone/caption 1080×1920 | 2.0 | **1.9** | Tiến bộ thật: `CcLine` trong kit đã nhúng sẵn `textShadow 0 2px 18px rgba(0,0,0,.78)` (`kit.tsx:80`) — carry-over vòng 1/2 ĐÃ ĐÓNG, không còn là checklist. Pill "minh hoạ" 30px cả 3 frames, caption đáy 250px + safe-zone, contrast ngày 13.5:1 / đêm ~12:1. Đối chiếu reference: accent hổ phách trên nền tối bật tương đương keyword cam mẫu (s8 accent từng phần "cuộc gọi lại" trong câu kem = đúng nguyên tắc nhất); pill đáy + shadow bù tương phản ngang caption trên của mẫu — áp dụng đúng mức, không copy vị trí trên (brief cấm trùng Lan). Trừ 0.1: s5 dòng 2 full-amber cả câu hỏi (`-s5.svg:115`) mất phân cấp keyword như mẫu (chỉ accent từ khoá); nửa đầu accent `#2E6E94` trên pill trắng bật yếu hơn nửa sau theo thiết kế (chấp nhận, nêu để biết). |
| Originality vs Lan & gaplai | 2.0 | **1.8** | Reference "Thức dậy đi" thực chất cùng họ Lan (đen + top + cam) — video này KHÔNG trôi theo: giữ đáy pill + arc sáng→tối + bust tả thực, đúng brief §Style "không que, không đen-cam, không chữ trên". Lưu ý font swap Be Vietnam Pro kéo gần gaplai (gaplai cũng Be Vietnam) nhưng xa Lan (Inter) — cán cân khác biệt vẫn dương nhờ palette/nhịp/cấu trúc 2 phòng. Giữ trừ 0.2 cặp hổ phách/vàng + áo mẹ `#8A5A6B`. |
| Craft tổng | 1.5 | **1.3** | Status card s5 vẫn `420×360` hơi ngang (carry-over, giữ khuyến nghị portrait/overlay). Blush má đỏ `opacity 0.25` (s5) + nền s5 nhiều chi tiết (nhà xa, vệt đường, tia ấm) là chi tiết thừa theo chuẩn mẫu — chấp nhận vì frame QA gộp 2 beat (video thật chiếu nối tiếp), nhưng khi build không thêm chi tiết mới. Trừ 0.2: (a) kit + frames dùng `fontWeight 700` trong khi `@font-face` chỉ load Be Vietnam Pro **600** (`kit.tsx:49–57`) → faux-bold khi render; (b) `FONT` kit còn fallback `'Inter'` (`kit.tsx:26`), trái spec §3 "không dùng font của Lan/gaplai làm fallback" — sửa thành `'Be Vietnam Pro',sans-serif`. |

### Sót font Plus Jakarta Sans (kiểm tra toàn repo)

- Kit ĐÃ swap (`kit.tsx:26,46–58` Be Vietnam Pro local, không CDN) ✓; spec §3 ĐÃ swap ✓; 3 SVG dùng Be Vietnam ✓.
- **Còn sót ở docs (phải sửa, có 1 cái chặn build):** `qa-report.md:18` vẫn ghi `CcFonts` dùng `PlusJakartaSans-Bold` (sai sự thật); `task-review.md:12,18,106,109` vẫn ra gate "main agent phải lấy font Plus Jakarta Sans về" — **gate sai, làm theo sẽ fetch nhầm font**; `script-review.md:16` còn câu "chữ Plus Jakarta Sans phía dưới"; file thừa `public/fonts/OFL-PlusJakartaSans.txt`. Vòng 1 `design-review.md:12` nhắc Plus Jakarta là bản ghi lịch sử — giữ nguyên, không sửa các vòng cũ.

### Fix bắt buộc (trước build)

1. **Frame s5:** sửa caption theo đúng lời v2 + accent spec §4 (bỏ "Mẹ bắt máy rất nhanh" — chữ v1 đã bỏ); chỉ accent từng phần ở dòng thường, giữ full-amber tối đa cho câu quote highlight.
2. **Docs font:** sửa `qa-report.md:18`, `task-review.md` (xoá gate fetch Plus Jakarta, chốt Be Vietnam local sẵn), `script-review.md:16`; xoá `public/fonts/OFL-PlusJakartaSans.txt`; KHÔNG fetch Plus Jakarta Sans.
3. **Kit:** `FONT` → `'Be Vietnam Pro',sans-serif`; `CcLine`/frames dùng weight **600** (đúng weight đã load) hoặc bổ sung file 700.
4. **Frame s8:** giảm/bỏ steam bát solo phía con (cơm nguội, theo spec §6).
5. **Checklist build:** s8 dựng trình tự Đang gọi → cúp → "Đã gọi lại ✓" (frame gộp tĩnh, video phải có trình tự); `CcCaps` chưa có early-off cho hold lặng s8 (c) — thêm prop hoặc truyền duration ngắn hơn shot; status card s5 về portrait hoặc ghi rõ overlay.

## TỔNG VÒNG 3: 9.0/10 — verdict: PASS (sửa 5 fix trên rồi vào build; không gãy kết cấu, không cần vẽ lại)

---

## Vòng 4 xác nhận (2026-10-17 — sau retime v3: 1308f)

Không đổi thiết kế — xác nhận trên render thật 43.7s mới (`out/qa/cuoc-goi-nho-cua-me-c-frame-*.png`, 12 khung):

| # | item | score | evidence |
|---|---|---|---|
| 1 | Beautiful | 9 | s6 đèn vàng ấm NHẤT (f750), s8 glow mẹ (f1290); palette nhất quán |
| 2 | Fits subject | 9 | 2 không gian riêng vẫn phân biệt (f879/f975): Con bát nguội vs mâm mẹ |
| 3 | Originality | 9 | — |
| 4 | Consistency | 10 | font Be Vietnam 600 đúng 5 checkpoint (f0/115/640/975/1056) |
| 5 | Legibility + safe | 9 | dấu chuẩn mọi khung ("Đã gọi lại ✓" f1056; "minh hoạ" trên mọi UI mock) |
| 6 | Profile test | 9 | — |
| 7 | Motion | 9 | beat mẹ vào f52–86 khớp giọng mới "Mẹ bắt máy ngay" (f640 = beat 2 đúng lúc) |
| 8 | Cover + board | 9 | f0: mock UI có nhãn minh hoạ |
| 9 | Shot fidelity | 9 | — |
| 10 | Aesthetic rules | 9 | deterministic, không timing wall-clock |

**9.0/10 — verdict: PASS** (không đổi từ vòng 3; 5 fix build vòng 3 đã xác nhận có mặt: Be Vietnam ✓, s8 trình tự Đang gọi → "Đã gọi lại ✓" ✓, CcCaps tắt trong hold ✓).
