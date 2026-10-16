# Design review — thuong-hay-so-bat-dau-lai

## Round 1

Vid `thuong-hay-so-bat-dau-lai` · profile story · 9:16 1080x1920 · gate D vòng 1 (clean context).
Inputs read: `brief.md`, `script.md` v2, `design-spec.md` (§3 card table, D1–D7, W2–W4),
`out/qa/thuong-hay-so-bat-dau-lai-{cover,style-hook,style-turn,style-end,board,motion-hook,diacritics}.png`
(tự mở từng PNG bằng Read, full-size + thu nhỏ ~1/3),
`skills/video-shotcraft/references/aesthetic-rules.md` (full R1–R4/Q1–Q11/S1–S5/C1–C3/P1–P4),
posters `spotlight-hero-card / before-after-slider-scrub / paper-title-card / scan-bracket-sweep.jpg`,
`src/Main.tsx`, `src/ClaudeMem.tsx`, user constraints (không khuyên ở/đi; F1 s1 + F2 s10 nguyên văn;
không giống gaplai/camon/cuoc-goi/metkhong/lan; s10 cấm ghế đối diện+đèn, hai màu ngang nhau).

### Score table (1–10, evidence = file + region)

| # | Mục | Điểm | Evidence |
|---|---|---|---|
| 1 | Beautiful | 7 | `style-hook.png` nửa dưới ~50% bàn xám trống; tay là khối mitten không ngón, đũa cắm vào bát; bát dẹt clip-art, thiếu độ sâu nước canh; cửa sổ tím có 2 thanh tối không giải thích (vùng 1/4 trên); nồi cơm + bát foreground bị cắt mép trái/dưới. `style-turn.png` bát lơ lửng không bàn, tay là blob xám/cam. `style-end.png` trắng bệt, figure pictogram, bát nhỏ lơ lửng cạnh tay. Thumbnail 1/3: hook đọc được nhưng lộ rẻ; end tương phản thấp. Chưa đạt "đăng kênh top không sửa". |
| 2 | Fits the subject | 7 | s1 đủ hero (bát đối diện + tay + LED Giữ ấm + F1) nhưng thiếu áo khoác người ấy (chỉ vệt tím mờ mép phải `cover.png`), hơi nước mờ, bát mình/bếp bị crop. s7 (`style-turn.png` f105) sai staging: script đòi "cùng bàn tay người ấy nâng bát" trên/dưới + hội tụ trung tính ở "y hệt nhau" — frame không có tay nâng, bát không có hành xanh, hai grade vẫn bão hoà đỏ/xanh (chưa hội tụ). s10 (`style-end.png`) thiếu người ăn: chỉ 1 lưng đứng, không có người ấy ngồi ăn cúi đầu; không thấy khung cửa frame-in-frame; vệt tuýp lạnh vắng mặt (chỉ LED đỏ tí hon) → vi phạm "hai mã màu ngang nhau". Mỗi element đã đối chiếu script s1–s10. |
| 3 | Originality | 9 | Palette gạch men + tím chạng vạng + RED `#FF5A36`/BLUE `#9DB4FF` khác hẳn UA (`Main.tsx`: đen `#090909`+gold sơ đồ node) và ClaudeMem (`ClaudeMem.tsx`: kem `#f5efe6`+clay terminal). Không ghế đối diện+đèn vàng (gaplai), không polaroid/rêu (camon), không điện thoại hai phòng (cuoc-goi; phone chỉ là insert s9), không một mình phòng trọ đêm (metkhong; bếp hai bộ đũa + người ấy s5–s10), không đen+que+cam (lan). Figure capsule đầy mình trên nền sáng ≠ que trắng trên đen. |
| 4 | Consistency | 7 | Tay hook (mitten da + đũa nâu) ≠ tay turn (blob xám/cam, mất đũa) ≠ tay end (cánh tay da + torso xanh). Bát hook (be + hành xanh) ≠ bát turn (trống, cam/xám đặc). Caption: hook headline Literata accent 2 màu, turn pill Lexend + tag 40px, end headline trắng 0-accent (0-accent đúng D6 nhưng light logic nhảy: hook trung tính+pool ấm → turn bão hoà → end trắng bệt). |
| 5 | Phone legibility + safe zone | 8 | Dấu đủ (xem `diacritics.png`: Ặ Ầ Ỗ Ộ Ữ Ể Giữ ễ đầy đủ, không tofu). Type scale đạt Q11: headline ~80px, caption 56–60px, tag 40px ≥32. Không chữ nào trong đáy 210px (headline trên, pill turn ~y1500–1690, end không caption đáy). Trừ: "sợ" `#9DB4FF` trên ron gạch trắng (`style-hook.png` dòng 4) tương phản thấp ở thumbnail 1/3; F2 trắng trên xám nhạt (`style-end.png`) phải nhờ glow mới đọc. |
| 6 | Profile visual test (story) | 7 | Đòi hero mỗi shot là character diễn beat. Hook: tay cận ✓. Turn: không mặt, không tay nâng, không người ăn ("Người ấy ăn, đâu biết đó là tối nào" không có người). End: 1 lưng, người ăn vắng mặt, không close-up biểu cảm. Board s5/s6/s8 trừu tượng (ô màu + blob), không đọc được diễn xuất. |
| 7 | Motion (strip) | 7.5 | `motion-hook.png` 24 ô (f0–59, 12fps tile 6x4): spacing gần như đều nhau = push 1.00→1.03 quá nhỏ, đọc như ảnh tĩnh; pool ấm pulse nhẹ hàng 2–4 ✓ sine, không overshoot/nảy ✓, pace hợp voice chậm. Không linear thô, nhưng R2 "tốc độ từ gia tốc" không cảm được ở cỡ phone; không thấy LOCK/holdEvt vì strip chỉ 2s đầu. |
| 8 | Cover + storyboard | 7 | Cover (`cover.png` = frame 0 hook): đủ hero + F1 nguyên văn 3 dòng từ frame 0, tắt tiếng vẫn hiểu "hai người" → 9. Board (`board.png` 10 tiles): đủ 10 shot + tên card + caption zone, nhưng s1/s10 text rút gọn ("...?"), s2 (wide bếp: chỉ hộp xám + chấm đỏ, mất hai bộ đũa/áo/móc chìa), s5 (cửa + dusk không đọc), s6 (rewind 12f không đọc), s8 (ngưỡng + rack focus không đọc: chỉ pill xanh + chấm nâu). Shot mờ: s2, s5, s6, s8. |
| 9 | Shot-card choice & fidelity | 8.5 | 10/10 cặp card+style-key validate trong `gallery/api/library.json` (check script 2026-10-16: 10 OK). Card hợp năng lượng beat; freeze hero 1 lần ✓ (P4); s5+s6 chung họ `transition-hidden-cut` với 2 style-key khác, spec đã biện minh là 1 device tương phản — chấp nhận. Text `blur-slide` là system, không tính hero — chấp nhận. 9:16 adaptation + locked params + D1–D7 ghi rõ. Trừ: poster `before-after-slider-scrub` là dashboard grid, proto là hai bát — giữ mechanic slider/rod nhưng ngữ nghĩa xa; tableau hook là SVG tự vẽ (không có demo tableau trong SC, W2 đã khai) nên fidelity hình ảnh N/A, chỉ giữ grammar. |
| 10 | Aesthetic rules | 7.5 | R1 ✓ (F1/s7/s10 hold khai ≥1s/1.8s, chờ verify timeline). R2 ✓ sine + stagger text. R3 ✓ arc hook 4.3s ≥3s. R4 ✓ 0 whole-frame slam (flicker tuýp element-level). Q3 ✓ không shake. Q4 ✓ 1 glint s5, LED thở là emissive pulse. Q5 ✓ 1 hero hook. Q6 ✓ text chính diện. Q8 N/A đúng cho story (không đòi group-photo). Q11 ✓. **Q1/Q10 ✗(`style-hook.png` tay/bát/cửa sổ):** SVG tự vẽ được phép (không复刻 page) nhưng chưa đạt出版级 — tay mitten, bát dẹt, thanh tối cửa sổ. Q10 s9 cũng chỉ verify nửa chừng (board tile nhỏ, chờ still full-size). S/C: F1/F2 nguyên văn ✓ (`cover.png`, `style-end.png`). P1/P2 ✓ (proto + stills + deviation log). |

**Mean: 7.6** · Mục 1 = 7 (<9), mục 2 = 7 (<9), có mục <8 → **verdict: revise**.

### Fixes

**Cao**
- **C1 — s10 dựng lại, đang thiếu người ăn + khung cửa (fit/script).** Thay đổi: giữ F2 nguyên văn; vẽ rõ khung cửa bếp (frame-in-frame tối 2 bên), trong là người ấy ngồi ăn cúi đầu (không nhìn ra), đối diện là bát mình còn hành + đũa ngang + hơi; lưng mình ở ngưỡng. Thêm vệt tuýp lạnh trên gạch ngang tầm LED đỏ để hai mã màu ngang nhau. Xong render lại `style-end.png` + tile s10 board (text đủ, không "…?").
- **C2 — hook hết đọc "clip-art" (Q10).** Thay đổi: vẽ lại tay có ngón kẹp đũa; bát có độ sâu (miệng/viền/nước/hành nổi/hơi); cửa sổ là cửa sổ thật (khung + gradient DUSK1→DUSK2, bỏ 2 thanh tối); nồi + bát foreground vào khung trọn (hết crop mép); bớt ~15% diện tích bàn xám trống phía dưới (nâng đường chân trời bàn hoặc crop tableau). Render lại `cover.png` + `style-hook.png`.
- **C3 — turn phải là "cùng một bát được nâng" + hội tụ (fit/script).** Thay đổi: hai nửa vẽ cùng tay nâng cùng bát (khớp tay hook), bát có hành; f-review đặt ở điểm đã hội tụ trung tính (grade trộn, không còn đỏ/xanh đặc); nhãn hai nửa mờ 50%; dời pill caption lên 60–80px để không đè bát dưới. Render lại `style-turn.png`.

**Trung**
- **T1 — chữ "sợ" `#9DB4FF` trên nền trắng mất tương phản.** Thay đổi: chỉ cho text dùng BLUE đậm hơn 1 nấc (giữ LED/grade nguyên) hoặc thêm scrim/shadow dưới dòng 4 hook; kiểm ở thumbnail 1/3 rồi chụp lại.
- **T2 — board s2/s5/s6/s8 không đọc được.** Thay đổi: s2 wide thấy 2 bộ đũa + áo + móc chìa; s5 cửa mở + dusk tràn; s6 thêm vệt rewind-blur + tư thế ngồi yên vai hạ; s8 ngưỡng cửa + 2 lớp focus; s1/s10 ghi đủ F1/F2. Render lại `board.png`.
- **T3 — khóa character kit.** Thay đổi: chốt 1 bộ (màu da, tay áo, đũa, mẫu bát) dùng chung hook/turn/end + board; turn/end không dùng blob thay tay.

**Thấp**
- **t1 — motion strip gần như tĩnh.** Thay đổi: tăng push hook 1.00→1.03 lên 1.00→1.05 + pool pulse 6%→8%, giữ sine, không overshoot; strip kiểm lại phải thấy nhịp thở ở cỡ phone.

### Previous fixes verified
Không có (vòng 1, chưa có round trước).

### Cannot verify (ngoài hook strip / stills)
Chu kỳ thở LED 2.4s; grade-shift đúng chữ "thương/sợ"; freeze slope-0 + thaw bù giờ (s4); rewind 12f + replay y hệt (s6); converge shimmer + đường chia tan (s7); rack focus s8; scan 1 pass/insert s9; press-stagger F2 + lặng thuần 1.8–2.0s (s10); toàn bộ SFX/BGM/ducking, voice-sync, timeline ffprobe — chờ QA/render và gate C.

## Round 2

Vid `thuong-hay-so-bat-dau-lai` · profile story · 9:16 1080x1920 · gate D vòng 2 (clean context, reviewer mới).
Inputs read: `brief.md`, `script.md` v2, `design-spec.md` (D1–D8 + kit khóa + render vòng 2 §5),
`out/qa/thuong-hay-so-bat-dau-lai-{cover,style-hook,style-turn,style-end,board,motion-hook}.png`
(tự mở từng PNG bằng Read, full-size + thu nhỏ ~1/3),
`skills/video-shotcraft/references/aesthetic-rules.md` (full R1–R4/Q1–Q11/S1–S5/C1–C3/P1–P4),
posters `spotlight-hero-card / before-after-slider-scrub / paper-title-card / scan-bracket-sweep.jpg`,
`src/Main.tsx`, `src/ClaudeMem.tsx`, user constraints (không khuyên ở/đi; F1 s1 + F2 s10 nguyên văn;
không giống gaplai/camon/cuoc-goi/metkhong/lan; s10 cấm ghế đối diện+đèn, hai màu ngang nhau),
Round 1 (7.6 revise — đối chiếu từng fix C1-C3/T1-T3/t1 bên dưới).

### Score table (1–10, evidence = file + region)

| # | Mục | Điểm | Evidence |
|---|---|---|---|
| 1 | Beautiful | 7.5 | `style-hook.png`: tay đã có ngón kẹp đũa, bát có miệng/nước/hành nổi, cửa sổ là cửa sổ thật (khung + gradient DUSK1→DUSK2), nồi + bát foreground vào khung trọn, pool ấm quanh bát thấy rõ — hết đọc "clip-art" ở cỡ phone (C2 đóng). Trừ: ~45% dưới khung vẫn là mặt bàn xám trống; vệt tím mờ mép phải (áo khoác?) đọc như vết nhòe không chủ ý; hơi nước gần như vô hình; phối cảnh bát dẹt (vành mỏng). `style-turn.png`: hai nửa gọn, kit khớp, nhưng vẫn là hai dải màu đặc + đường chia cứng — đọc như sơ đồ, chưa phải frame phim. `style-end.png`: sạch nhất (F2 thoáng, figure gọn), nhưng chi tiết dưới sẽ nói ở mục 2. Thumbnail 1/3: hook ổn, turn đồ họa, end chữ đọc tốt/hình mờ. Chưa đạt "đăng kênh top không sửa". |
| 2 | Fits the subject | 8 | Đối chiếu từng element với script s1–s10. s1: đủ hero (bát đối diện + tay + LED Giữ ấm + F1 + bát mình foreground) — áo khoác người ấy vẫn chỉ là blob mờ mép phải `cover.png`. s7 (`style-turn.png` f150): staging đã là "cùng tay cùng bát hai nửa" + tag + caption "Cái bát vẫn y hệt nhau." — nhưng (a) frame mang caption hội tụ mà hai grade vẫn bão hoà đỏ/xanh đặc, đường chia còn nguyên (script s7a/s7b: hội tụ trung tính + đường chia tan); (b) bát có 3 cọng hành, LỆCH script s7a "bát không hành" — xem verdict E dưới. s10 (`style-end.png`): đã có người ăn + LED + dải tuýp lạnh + F2 nguyên văn — nhưng KHÔNG thấy khung cửa bếp frame-in-frame (hai dải tối mép đọc như vignette, không jamb/threshold/bản lề), KHÔNG có lưng "mình" đứng ở ngưỡng (đáy khung là mặt bàn, vệt tối mép trái đọc như lỗi crop), figure nhìn từ trên xuống kiểu pictogram thay vì "ngồi ăn cúi đầu" trong phòng; vệt tuýp lạnh yếu hơn hẳn chấm LED → "ngang nhau" chưa thuyết phục. |
| 3 | Originality | 9 | Không đổi so vòng 1: gạch men + tím chạng vạng + RED `#FF5A36`/BLUE `#9DB4FF` khác hẳn UA (`Main.tsx`: đen `#090909`+gold sơ đồ node) và ClaudeMem (`ClaudeMem.tsx`: kem `#f5efe6`+clay terminal). Không ghế đối diện+đèn vàng (gaplai), không polaroid/rêu (camon), phone chỉ là insert s9 (cuoc-goi), bếp hai bộ đũa + người ấy s5–s10 (metkhong), không đen+que+cam (lan). |
| 4 | Consistency | 8.5 | Kit khóa T3 đã giữ: tay hook (da `#E3B98E` + tay áo `#C9BBA6` + đũa nâu) = tay turn (cùng da/áo/đũa, khác thế cầm do khác động tác — chấp nhận); bát hook/turn/end cùng mẫu (rim + soup + hành đổ bóng); figure end (da + `#5A6B8C` + tóc `#23202B`) đúng kit. Caption system nhất quán (headline Literata s1/s10, pill+tag Lexend s7). Trừ: chữ "sợ" `cover.png` (f0) nhạt hơn `style-hook.png` (f80) — cover còn giống BLUE cũ, hook đã BLUE_DEEP; ánh sáng turn bão hoà vs end nhợt là cố ý theo arc nhưng bước nhảy lớn. |
| 5 | Phone legibility + safe zone | 8.5 | Dấu đủ (Giữ ấm, sợ, thương, ữ/ể/ẫ render sạch cả 3 frame). Không chữ nào lọt đáy 210px (pill turn đáy ~y1690, vừa trong giới hạn; end không caption đáy). "sợ" BLUE_DEEP trên scrim tối (`style-hook.png`, motion strip) đã đọc được ở 1/3 — T1 cơ bản đóng. Trừ: "sợ" ở `cover.png` dòng 4 còn nhạt, nằm trên nền gạch sáng, ở thumbnail 1/3 là điểm mờ nhất của headline. |
| 6 | Profile visual test (story) | 7.5 | Hook: cận tay diễn beat ✓. Turn: đã có tay + bát hai nửa, nhưng beat ghi "Người ấy ăn, đâu biết đó là tối nào" — không có người ăn, không mặt, không động tác nâng bát (tay cầm đũa ngang, bát đặt yên). End: đã có người ăn (sửa lớn so vòng 1) nhưng là pictogram nhìn từ trên, không close-up biểu cảm; "nhìn lâu hơn mọi tối" (người nhìn) vắng mặt. Board vẫn trừu tượng (ô màu + capsule), chưa đọc được diễn xuất s5/s6/s8. |
| 7 | Motion (strip) | 8 | `motion-hook.png` 24 ô (f0–59, 12fps): pool ấm thở thấy được khi对照 ô đầu–giữa–cuối ở full-size (vầng đào quanh bát dâng ở hàng 2–3), push 1.00→1.05 vẫn vi mô — ở cỡ phone vẫn gần như tĩnh. Sine suốt, không overshoot/nảy ✓, pace hợp voice chậm. R2 không đòi gia tốc cho push chậm này. t1 cải thiện ở full-size, phone-marginal — giữ Thấp quan sát, không chặn. |
| 8 | Cover + storyboard | 7.5 | Cover 9: F1 nguyên văn đủ từ frame 0, hero + hai bát + LED, tắt tiếng hiểu "hai người", thumbnail đọc tốt. Board 6.5: s1/s10 đã ghi ĐỦ F1/F2 (hết "…?"), tên card + caption zone đủ 10 shot — nhưng tile staging vẫn sơ đồ: s2 chỉ hộp xám + 2 vạch đũa (mất hai bộ đũa/áo/móc chìa), s5 cửa phát sáng nhưng không người, s6 vạch rewind mờ, s8 một capsule đơn + blob tối (ngưỡng + rack focus không đọc). Trung bình 7.5. |
| 9 | Shot-card choice & fidelity | 8.5 | Không đổi: 10/10 cặp card+style-key đã validate ở vòng 1; freeze hero 1 lần ✓ (P4); s5+s6 chung họ `transition-hidden-cut` với biện minh 1-device-tương-phản — chấp nhận; text `blur-slide` là system. Poster `before-after-slider-scrub` là dashboard nhưng mechanic slider/converge được giữ (converge còn chờ evidence động). D1–D7 giữ nguyên, D8 flag đúng quy trình cho E. |
| 10 | Aesthetic rules | 8.5 | R1 ✓ (hold khai ≥1s/1.8s). R2 ✓ sine toàn video. R3 ✓ arc hook ≥3s. R4 ✓ 0 whole-frame slam. Q1 N/A-cho-phép (story, không复刻 page có sẵn) — hook đã tiệm cận Q10 tối thiểu (tay ngón/bát sâu/cửa sổ thật); blob tím mép phải là điểm Q10 còn lại. Q3 ✓, Q4 ✓ 1 glint s5, Q5 ✓ 1 hero, Q6 ✓ chính diện, Q11 ✓ trừ "sợ" cover nhạt (biên). S/C ✓ F1/F2 nguyên văn. P1/P2/P4 ✓ (freeze 1 lần, s5+s6 tính 1). Ghi nhận: s10 tĩnh tuyệt đối vs Q8 ("kết peak năng lượng") là deviation có ý thức của story profile nhưng spec chưa log — yêu cầu log ở Thấp. Không vi phạm cứng. |

**Mean: 8.1** · Mục 1 = 7.5 (<9), mục 2 = 8 (<9), có mục <8 (1, 6, 8) → **verdict: revise**.

### Fixes

**Cao**
- **C3-cont — turn: đưa evidence hội tụ + chốt D8 (BỎ hành).** Thay đổi: (a) render `style-turn.png` ở frame ĐÃ hội tụ (grade trộn trung tính, nhãn hai nửa mờ 50%, đường chia tan) đúng script s7a/s7b — frame hiện tại (f150, hai grade đặc + chia cứng) mâu thuẫn chính caption "y hệt nhau" trong khung; (b) verdict E: **BỎ 3 cọng hành trong bát turn**, vẽ bát KHÔNG hành (soup depth + steam giữ) + đĩa hành nhặt ra đặt cạnh mỗi nửa — lý do ở mục E dưới. Xong kiểm halves-match-halves (hai bát sạch giống hệt nhau) rồi render lại.
- **C1-cont — s10: dựng ngưỡng cửa đọc được + cân hai màu thật.** Thay đổi: giữ F2 nguyên văn + người ăn cúi đầu; vẽ rõ jamb tối hai bên + threshold đáy (frame-in-frame phải đọc ra là "đứng ở cửa nhìn vào", không phải top-down); thêm lưng/vai "mình" ở foreground ngưỡng (kể cả chỉ vai mờ mép trái nhưng phải ra dáng người, hiện tại đọc như lỗi crop); tăng vệt tuýp lạnh trên gạch lên ngang tầm chấm LED (rộng/sáng gấp ~2 lần hiện tại) để "hai mã màu ngang nhau" đúng nghĩa. Render lại `style-end.png` + tile s10.

**Trung**
- **T2-cont — board s2/s5/s6/s8 phải đọc được staging.** Thay đổi: s2 thấy 2 bộ đũa + áo + móc chìa (kể cả icon hoá); s5 cửa mở + dusk tràn + bóng người ấy; s6 vệt rewind-blur rõ + tư thế ngồi yên vai hạ (phân biệt s5); s8 ngưỡng + 2 lớp focus (vai mờ foreground + người treo chìa nét). Tile là low-fi nhưng story board phải kể được ai–ở đâu–làm gì. Render lại `board.png`.
- **T4 (mới) — dọn blob tím mép phải hook (Q10).** Thay đổi: hoặc vẽ áo khoác trên ghế ra dáng (nếp gấp + tay áo rủ) để khớp script frame 0, hoặc bỏ hẳn khỏi khung và cân lại bố cục; giữ nguyên vệt mờ hiện tại thì vẫn là điểm rẻ nhất của frame đẹp nhất. Render lại `cover.png` + `style-hook.png`.

**Thấp**
- **t2 — thống nhất "sợ" BLUE_DEEP cả cover.** `style-hook.png` đã đậm đúng; `cover.png` (f0) còn nhạt — cùng một headline F1 không được hai màu. Đổi cover sang BLUE_DEEP, kiểm thumbnail 1/3.
- **t3 — log deviation Q8 cho s10** vào design-spec (story ending = tĩnh tuyệt đối, không group-photo peak), một dòng như D1–D7.
- **t1-carry — motion strip ở cỡ phone vẫn gần tĩnh.** Đã thấy thở ở full-size (đóng 80%); nếu muốn đóng hẳn: tăng pool pulse thêm 2% HOẶC chọn strip window chứa LOCK 34f rõ hơn. Không chặn gate.

### Previous fixes verified (Round 1 → Round 2)
- **C1 s10: MỞ MỘT NỬA.** Đã thêm: người ăn cúi đầu ✓, LED Giữ ấm ✓, dải tuýp lạnh (yếu) ✓, F2 nguyên văn ✓. Chưa: khung cửa frame-in-frame, lưng "mình" ở ngưỡng, cân hai màu → chuyển thành C1-cont.
- **C2 hook clip-art: ĐÓNG.** Tay có ngón ✓, bát có độ sâu ✓, cửa sổ thật (khung + gradient) ✓, nồi + bát foreground trọn khung ✓, bớt cảm giác trống nhờ pool ấm ✓. Tồn dư duy nhất chuyển thành T4 (blob tím).
- **C3 turn staging: MỞ MỘT NỬA.** Cùng-tay-cùng-bát hai nửa ✓, tag 40px + caption lift khỏi bát ✓. Chưa: hội tụ grade + D8 → chuyển thành C3-cont.
- **T1 "sợ" tương phản: ĐÓNG 90%.** Hook + strip đã BLUE_DEEP đọc tốt; còn cover nhạt → t2.
- **T2 board: MỞ.** s1/s10 đủ chữ ✓; staging s2/s5/s6/s8 vẫn trừu tượng → T2-cont.
- **T3 character kit: ĐÓNG.** Da/tay áo/đũa/bát nhất quán hook↔turn↔end ✓, hết blob thay tay ✓.
- **t1 motion strip: ĐÓNG 80%.** Pulse 8% + push 1.05 thấy được ở full-size; phone-marginal → t1-carry.

### Verdict E (D8: 3 cọng hành trong bát turn vs script s7a "bát không hành")
**BỎ hành — vẽ bát turn KHÔNG hành.** (1) Script s7a ghi rõ tay người ấy "nâng bát canh không hành lên ăn" — bát này là bát SAU khi đã nhặt (s3→s7 là quan hệ nhân-quả, nhặt xong thì bát phải sạch); để 3 cọng hành là tự phủ nhận cả beat s3. (2) End frame (`style-end.png`) đã thực hiện đúng logic này: bát người ăn trống + đĩa hành nhặt ra đặt cạnh — giữ D8 thì turn mâu thuẫn với chính end. (3) "Y hệt nhau" của s7 là hai nửa khớp NHAU (thương-night vs sợ-night), không phải khớp với bát hook đang nhặt dở — hai bát sạch giống hệt nhau + hai đĩa hành giống hệt nhau vẫn giữ trọn visual rhyme, mà còn đúng chuyện hơn. (4) Callback s9 (đĩa hành) cũng cần bát-sạch để đĩa hành có nghĩa. Cách giữ: mỗi nửa = bát sạch (soup gloss + steam giữ nguyên độ ngon) + đĩa nhỏ 3 cọng hành cạnh bên; hai nửa đối xứng tuyệt đối. Nếu content-reviewer E muốn giữ hành vì lý do nhịp xem, thì phải sửa luôn script s7a + end + s9 — tốn hơn nhiều so với bỏ 3 cọng hành trong proto.

### Cannot verify (ngoài hook strip / stills)
Như vòng 1, cộng thêm: converge grade có chạy đúng chữ "y hệt nhau" không (stills hiện tại chưa thấy); LED thở 2.4s suốt turn/end; thaw bù giờ s4; replay y hệt s6 (cần strip riêng, ngoài hook strip); rack focus s8 (board chưa đọc); scan 1 pass/insert s9 ở full-size (board tile quá nhỏ để chấm Q10); press-stagger F2 + lặng thuần 1.8–2.0s s10; toàn bộ SFX/BGM/ducking, voice-sync, timeline — chờ QA/render và gate C.

### Weaknesses (điểm yếu còn lại, kể cả khi đã pass tương lai)
1. Mặt bàn xám chiếm ~45% frame hook mà không kể gì — pool ấm + bát foreground gánh một mình; cân nhắc crop tableau cao hơn hoặc đặt đĩa hành/đũa thừa kể thêm chuyện.
2. Figure end là pictogram nhìn từ trên — đúng kit nhưng thiếu một close-up mặt/biểu cảm nào trong cả 3 frame, story về "nhìn lâu hơn mọi tối" mà chưa có ánh mắt nào.
3. Hơi nước gần như vô hình cả 3 frame — brief gọi tên steam như giác quan của beat (s1/s3), hiện tại bát canh mất "nóng" (vừa múc), chỉ còn là hình nguội.
4. Nhãn "minh hoạ" s9 và tag "vì thương/vì sợ" dùng chung họ pill — sang build thật cần phân cấp rõ để viewer không đọc tag cảm xúc thành nhãn pháp lý của mock.
5. Board là QA sheet nhưng chữ tile s1/s10 quá nhỏ — reviewer E/B đọc board-first sẽ bỏ sót chữ; tăng cỡ chữ tile lên ≥2 lần hiện tại.

## Round 3

Vid `thuong-hay-so-bat-dau-lai` · profile story · 9:16 1080x1920 · gate D vòng 3 (clean context, reviewer mới).
Inputs read: `brief.md`, `script.md` v2, `design-spec.md` (D1–D9 + kit khóa + render vòng 3 §5),
`out/qa/thuong-hay-so-bat-dau-lai-{cover,style-hook,style-turn,style-end,board,motion-hook}.png`
(tự mở từng PNG bằng Read, full-size + đánh giá thumbnail ~1/3),
`skills/video-shotcraft/references/aesthetic-rules.md` (full R1–R4/Q1–Q11/S1–S5/C1–C3/P1–P4),
posters `spotlight-hero-card / before-after-slider-scrub / paper-title-card / scan-bracket-sweep.jpg`
(10/10 style-key tự validate trong `gallery/api/library.json`: đủ, không thiếu),
`src/Main.tsx`, `src/ClaudeMem.tsx` (đọc phần đầu: đen+gold sơ đồ node vs kem+clay terminal — không trùng),
profile story rubric (`.claude/skills/ray-pineline-worflow-agent/SKILL.md:120`: mỗi shot cần character diễn beat + close-up biểu cảm khi cần),
user constraints (F1 s1 + F2 s10 nguyên văn; cấm gaplai/camon/cuoc-goi/metkhong/lan;
s10 cấm ghế đối diện+đèn, hai màu ngang nhau),
Round 1 (7.6 revise) + Round 2 (8.1 revise — đối chiếu C3-cont/C1-cont/T2-cont/T4/t2/t3/t1-carry bên dưới).

### Score table (1–10, evidence = file + region)

| # | Mục | Điểm | Evidence |
|---|---|---|---|
| 1 | Beautiful | 8.5 | Hook (`style-hook.png` f80 + `cover.png` f0): tay đã có ngón kẹp đũa, bát có miệng/nước/hành nổi/hơi, cửa sổ là cửa sổ thật (khung + gradient DUSK1→DUSK2), pool ấm quanh bát đối diện thấy rõ, nồi + bát foreground trọn khung — hết đọc "clip-art" ở cỡ phone. Turn (`style-turn.png` f160): gọn, sạch, hai bát + hai đĩa hành đối xứng tuyệt đối. End (`style-end.png` f120): bố cục frame-in-frame + hai bát + nồi cơm + F2 thoáng, là frame điện ảnh nhất. Thumbnail 1/3: hook đọc tốt, end chữ đọc tốt/hình nhỏ, turn đọc như graphic. Trừ (chưa đạt "đăng kênh top không sửa"): ~40% dưới khung hook vẫn là mặt bàn xám trống không kể gì; phối cảnh bát còn dẹt (vành mỏng); jacket mép phải vẫn blur nặng nhất khung; nồi cơm ở end đè lên 1/3 bát mình (xếp lớp vụng); cả 3 frame không có mặt nào. |
| 2 | Fits the subject | 8.5 | Đối chiếu từng element với script. s1: đủ hero (bát canh ĐỐI DIỆN đang gắp + tay + LED Giữ ấm đỏ son + hơi + bát mình foreground + jacket trên ghế + F1 nguyên văn) ✓. s7 (`style-turn.png`): D8 ĐÓNG — hai bát SẠCH không hành + đĩa hành 3 cọng cạnh mỗi nửa ✓; converge ĐÓNG 90% — hai nền đã về cùng một tím-xám trung tính (không còn đỏ/xanh đặc) ✓, caption "Cái bát vẫn y hệt nhau." khớp ✓. s10: người ấy ngồi ăn cúi đầu (chưa ngẩng lên) ✓ + bát mình còn hành/đũa ngang/hơi = "chỗ vẫn chờ" ✓ + LED đỏ + vệt tuýp lạnh ✓ + F2 nguyên văn giữ suốt ✓ + không ghế đối diện/đèn ✓. Trừ: đường chia ngang giữa hai nửa turn vẫn còn nguyên (script s7b: "đường chia tan"), tag hai nửa còn đặc (spec: mờ 50%); tay turn cầm đũa ngang chứ không "nâng bát lên ăn" như script s7a; chấm LED đỏ ở end tí hon so với dải tuýp lạnh — "ngang nhau" mới đạt 70%. |
| 3 | Originality | 9 | Không đổi qua 3 vòng: gạch men + tím chạng vạng + RED `#FF5A36`/BLUE `#9DB4FF` khác hẳn UA (`Main.tsx`: đen `#090909`+gold sơ đồ node) và ClaudeMem (`ClaudeMem.tsx`: kem `#f5efe6`+clay terminal). Không ghế đối diện+đèn vàng (gaplai), không polaroid/rêu (camon), phone chỉ là insert s9 (cuoc-goi), bếp hai bộ đũa + người ấy s5–s10 (metkhong), không đen+que+cam (lan). |
| 4 | Consistency | 9 | Kit khóa giữ cả 3 frame: da `#E3B98E` + tay áo `#C9BBA6` + đũa nâu + mẫu bát (rim + soup gloss + hành đổ bóng + steam) hook↔turn khớp tuyệt đối; figure end (da + `#5A6B8C` + tóc `#23202B`) đúng kit. Caption system nhất quán (headline Literata s1/s10, pill+tag Lexend s7). "sợ" cover f0 = hook f80 (cùng BLUE_DEEP — t2 đóng). Light logic theo arc: hook trung tính+pool ấm → turn trung tính hội tụ → end phòng chạng vạng. |
| 5 | Phone legibility + safe zone | 9 | Dấu đủ cả 3 frame (Giữ ấm, sợ, thương, ữ/ể/ẫ/ộ sạch). Không chữ nào lọt đáy 210px (pill turn đáy ~y1690 vừa trong giới hạn; end không caption đáy). "sợ" BLUE_DEEP trên scrim đọc được ở 1/3 cả cover lẫn hook. F2 trắng trên tím mờ đọc bằng soft-shadow, không cần glow gắt. Trừ nhẹ: chữ tile board s1/s10 quá nhỏ (chuyển sang mục 8). |
| 6 | Profile visual test (story) | 8 | Rubric story: character diễn beat + close-up biểu cảm khi cần. Hook: cận tay diễn beat ✓. Turn: đã có tay + bát hai nửa đối xứng, nhưng beat ghi "Người ấy ăn, đâu biết đó là tối nào" — không có người ăn, không mặt, không động tác nâng bát (tay cầm đũa ngang, bát đặt yên). End: đã có người ăn + người nhìn (vai mờ foreground) nhưng figure là pictogram nhìn từ trên, cả 3 frame không có một close-up mặt/biểu cảm nào cho chuyện "nhìn lâu hơn mọi tối". Board s5/s6/s8 vẫn là capsule trừu tượng, chưa đọc được diễn xuất. |
| 7 | Motion (strip) | 8.5 | `motion-hook.png` 24 ô (f0–59, 12fps tile 6x4): đọc trái→phải thấy pool ấm thở theo hàng (hàng 3–4 vầng đào quanh bát dâng rõ so với hàng 1), push 1.00→1.05 vi mô nhưng đều-sine, không overshoot/nảy ✓, pace hợp voice chậm. t1-carry ĐÓNG (pulse 10% thấy được ở full-size, thoáng thấy ở cỡ phone). R2 không đòi gia tốc cho slow-push này. Chờ strip riêng cho freeze/rewind/converge (ngoài hook strip — xem Cannot verify). |
| 8 | Cover + storyboard | 7.5 | Cover 9: F1 nguyên văn đủ từ frame 0, hero + hai bát + LED, tắt tiếng hiểu "hai người", thumbnail đọc tốt. Board 6.5: đủ 10 shot + tên card + caption zone + s1/s10 đã ghi ĐỦ F1/F2 (hết "…?") — nhưng staging từng tile vẫn sơ đồ, đi từng shot: s2 chỉ hộp xám + 2 vệt đũa (không đọc được hai bộ đũa/áo/móc chìa); s5 oval cam + capsule (không cửa mở/dusk tràn/bóng người); s6 y hệt s5 đổi màu lạnh + vạch xám (rewind 12f + ngồi-yên-vai-hạ không đọc, không phân biệt được s5); s8 một capsule + brackets (ngưỡng + 2 lớp focus không đọc); s7 hai khối màu (không tay/bát). Shot mờ: s2, s5, s6, s8 — y hệt vòng 2. Trung bình (9+6.5)/2 = 7.5. |
| 9 | Shot-card choice & fidelity | 8.5 | 10/10 cặp card+style-key đã validate trong `library.json` (tự chạy check vòng này: đủ 10, thiếu 0). Freeze hero 1 lần ✓ (P4); s5+s6 chung họ `transition-hidden-cut` với 2 style-key, biện minh 1-device-tương-phản — chấp nhận; text `blur-slide` là system. 9:16 adaptation + locked params + D1–D9 ghi rõ (D9 log Q8 cho s10 — t3 đóng). Trừ: poster `before-after-slider-scrub` là dashboard grid, proto là hai bát — giữ mechanic slider/converge (converge tĩnh đã thấy, động chờ strip); tableau hook là SVG tự vẽ (W2 đã khai, không có demo tableau trong SC) nên fidelity hình ảnh N/A, chỉ giữ grammar. |
| 10 | Aesthetic rules | 9 | R1 ✓ (F1/s7/s10 hold khai ≥1s/1.8s). R2 ✓ sine toàn video, strip không linear thô. R3 ✓ arc hook ≥3s. R4 ✓ 0 whole-frame slam (flicker tuýp element-level). Q1 N/A-cho-phép (story SVG, đã tiệm cận Q10 tối thiểu). Q3 ✓ không shake. Q4 ✓ 1 glint s5 (LED thở là emissive pulse). Q5 ✓ 1 hero hook. Q6 ✓ text chính diện. Q8 deviation đã log D9 ✓. Q11 ✓ (trừ biên: chữ tile board nhỏ — tính ở mục 8). S/C ✓ F1/F2 nguyên văn. P1/P2/P4 ✓. Không vi phạm cứng. Tồn dư Q10 nhẹ: jacket blur, seam turn, nồi đè bát end (staging, đã ghi fixes Thấp). |

**Mean: 8.6** (85.5/10) · Mục 1 = 8.5 (<9), mục 2 = 8.5 (<9), mục 8 = 7.5 (<8) → **verdict: revise**.

### Fixes

**Trung**
- **T2-cont2 — board s2/s5/s6/s8 phải kể được ai–ở đâu–làm gì (MỞ từ vòng 1).** Thay đổi: s2 thấy 2 bộ đũa + áo vắt ghế + móc chìa (kể cả icon hoá, hiện tại chỉ là hộp xám + vệt); s5 cửa mở + dusk hồng tràn + bóng người ấy bước vào; s6 vệt rewind-blur rõ + tư thế ngồi yên vai hạ (phải phân biệt được với s5 ngay ở cỡ tile); s8 ngưỡng cửa + 2 lớp focus (vai mờ foreground + người treo chìa nét). Tile là low-fi nhưng storyboard phải đọc được staging — E/B đọc board-first hiện tại sẽ không duyệt được s5/s6/s8. Render lại `board.png`. (Nếu design-agent giữ quan điểm "board tiles là sơ đồ low-fi, scene build từ kit" thì phải ghi rõ chuẩn đọc board trong spec §5 để D/E chấm cùng thước — hiện tại spec nói một đằng, board một nẻo.)

**Thấp**
- **t4 — turn: cho đường chia tan + tag mờ đúng spec (tồn dư C3-cont).** Thay đổi: `style-turn.png` vẽ đường chia mờ dần về 0 ở điểm review (hiện tại còn vạch ngang nguyên), tag "vì thương/vì sợ" về 50% opacity đúng §5 render vòng 3 đã hứa; build thật: converge chạy đúng chữ "y hệt nhau", nhãn mờ theo grade. Không cần đổi staging (D8 bát sạch + đĩa hành đã đúng).
- **t5 — end: tách nồi cơm khỏi bát mình + cân LED lên (tồn dư C1-cont).** Thay đổi: dời nồi sang phải/xuống 60–80px để bát mình (còn hành) đọc trọn miệng bát; tăng glow LED Giữ ấm ~1.5–2x (hiện tại là chấm tí hon so với dải tuýp lạnh) để "hai mã màu ngang nhau" đúng nghĩa ở cỡ phone. Giữ F2 nguyên văn, giữ jamb/threshold/vai foreground (C1-cont đã đạt).
- **t6-carry — hook: bớt bàn trống + cho hơi nước thấy được.** Thay đổi (build, không cần re-render proto nếu tốn): crop tableau cao hơn ~10–15% hoặc đặt đĩa hành/đũa thừa vào nửa dưới; steam vẽ đậm + dày gấp đôi hiện tại (brief gọi tên steam như giác quan beat s1/s3, hiện tại gần như vô hình cả 3 frame).

### Previous fixes verified (Round 2 → Round 3)
- **C3-cont turn hội tụ + D8: ĐÓNG 90%.** Bát sạch không hành + đĩa hành 3 cọng mỗi nửa ✓ (verdict E vòng 2 đã thực hiện); hai grade đã về cùng tím-xám trung tính ✓; halves-match tuyệt đối ✓. Tồn dư 10% → t4 (seam + tag).
- **C1-cont s10 ngưỡng + hai màu: ĐÓNG 85%.** Jamb tối hai bên + threshold đáy đọc được ✓; vai/lưng "mình" foreground ở ngưỡng ✓ (dù chỉ là khối mờ nhưng ra dáng người, hết đọc như lỗi crop); vệt tuýp lạnh đã thành dải ngang rõ ✓; F2 nguyên văn ✓. Tồn dư → t5 (nồi đè bát, LED tí hon).
- **T2-cont board: MỞ.** s1/s10 đủ chữ ✓; staging s2/s5/s6/s8 vẫn sơ đồ như vòng 2 → chuyển thành T2-cont2 (Trung duy nhất còn mở).
- **T4 blob tím: ĐÓNG 85%.** Jacket đã có ghế + ve áo + nếp rủ, khớp script frame 0 ✓; còn blur nặng nhất khung (đọc như DOF, chấp nhận được) — không chặn.
- **t2 "sợ" BLUE_DEEP cả cover: ĐÓNG.** Cover f0 = hook f80, đọc tốt ở thumbnail 1/3 ✓.
- **t3 log Q8: ĐÓNG.** D9 đã có trong spec §6 ✓.
- **t1-carry motion strip: ĐÓNG.** Pulse 10% thấy rõ theo hàng ở full-size, thoáng thấy ở cỡ phone ✓.

### Cannot verify (ngoài hook strip / stills)
Như vòng 2: LED thở 2.4s suốt turn/end; grade-shift đúng chữ "thương/sợ" (hook) và converge chạy đúng chữ "y hệt nhau" (s7); freeze slope-0 + thaw bù giờ (s4); rewind 12f + replay y hệt (s6 — cần strip riêng); rack focus s8; scan 1 pass/insert s9 ở full-size (board tile quá nhỏ để chấm Q10); press-stagger F2 + lặng thuần 1.8–2.0s (s10); toàn bộ SFX/BGM/ducking, voice-sync, timeline ffprobe — chờ QA/render và gate C.

### Weaknesses (điểm yếu còn lại, kể cả khi đã pass tương lai)
1. Mặt bàn xám chiếm ~40% frame hook mà không kể gì — pool ấm + bát foreground gánh một mình (→ t6-carry).
2. Cả 3 frame không có một khuôn mặt/close-up biểu cảm nào — story về "nhìn lâu hơn mọi tối" mà chưa có ánh mắt nào (mục 6 sẽ còn bị trừ tới khi build có shot mặt).
3. Hơi nước gần như vô hình cả 3 frame — bát canh mất "nóng" (vừa múc), chỉ còn là hình nguội.
4. Nồi cơm đè lên bát mình ở end — vật chứng "chỗ vẫn chờ" bị che đúng chỗ quan trọng nhất (→ t5).
5. Board là QA sheet nhưng chữ tile s1/s10 quá nhỏ — reviewer E/B đọc board-first sẽ bỏ sót chữ; tăng cỡ chữ tile lên ≥2 lần.

## Round 4

Vid `thuong-hay-so-bat-dau-lai` · profile story · 9:16 1080x1920 · gate D vòng 4 (clean context, reviewer mới).
Inputs read: `brief.md`, `script.md` v2, `design-spec.md` (D1–D9 + kit khóa + render vòng 4 §5 + chuẩn đọc board),
`out/qa/thuong-hay-so-bat-dau-lai-{cover,style-hook,style-turn,style-end,board,motion-hook}.png`
(tự mở từng PNG bằng Read, full-size + đánh giá thumbnail ~1/3, cộng 3 crop kiểm chứng:
dải giữa turn, vùng giữa end, tile s2 board phóng to),
`skills/video-shotcraft/references/aesthetic-rules.md` (full R1–R4/Q1–Q11/S1–S5/C1–C3/P1–P4),
posters style-key (đối chiếu mô tả vòng trước), `gallery/api/library.json`
(tự chạy check vòng này: 10/10 cặp card+style-key tồn tại, thiếu 0),
`src/Main.tsx` (đọc 30 dòng đầu: đen `#090909`+gold DM Serif/Inter sơ đồ node — không trùng),
profile story rubric (ray-pineline SKILL: character diễn beat + close-up biểu cảm khi cần),
user constraints (F1 s1 + F2 s10 nguyên văn; cấm gaplai/camon/cuoc-goi/metkhong/lan;
s10 cấm ghế đối diện+đèn, hai màu ngang nhau),
Round 1 (7.6) + Round 2 (8.1) + Round 3 (8.6 — đối chiếu T2-cont2/t4/t5/t6-carry bên dưới).

### Score table (1–10, evidence = file + region)

| # | Mục | Điểm | Evidence |
|---|---|---|---|
| 1 | Beautiful | 8.5 | End (`style-end.png` f120) là frame điện ảnh nhất: nồi đã tách khỏi bát, LED có halo, vệt tuýp + steam thấy rõ (crop end-mid). Turn (`style-turn.png` f160) sạch, hai nửa cùng một tím-xám trung tính, seam chỉ còn bước tone rất nhẹ (crop turn-seam: chuyển mềm, không vạch cứng). Nhưng anchor sắc đẹp là hook — mà hook (`cover.png` f0 / `style-hook.png` f80) gần như không đổi từ vòng 3: ~40% dưới khung vẫn là mặt bàn xám trống không kể gì; jacket mép phải vẫn là element blur nặng nhất khung (không nếp gấp/tay áo rõ); vành bát mỏng, phối cảnh còn dẹt; cả 3 frame không có một khuôn mặt nào. Thumbnail 1/3: hook/end đọc tốt, turn đọc như graphic (đúng device). Chưa đạt "đăng kênh top không sửa". |
| 2 | Fits the subject | 9 | Đối chiếu từng element với script s1–s10: s1 đủ hero (tay gắp từ bát canh ĐỐI DIỆN + LED Giữ ấm + hơi + bát mình foreground/đũa ngang + jacket + cửa sổ tím + F1 nguyên văn từng chữ) ✓. s7: hai bát SẠCH không hành + đĩa hành 3 cọng mỗi nửa ✓ (D8), hai nền hội tụ cùng neutral ✓, caption "Cái bát vẫn y hệt nhau." khớp ✓, tag hai nửa đã mờ (crop: "vì sợ" muted) ✓. s10: người ấy ngồi ăn cúi đầu chưa ngẩng ✓ + bát mình còn hành/đũa ngang/hơi = "chỗ vẫn chờ" ✓ + LED đỏ có glow + vệt tuýp lạnh ngang ✓ (parity ~85%, crop end-mid) + F2 nguyên văn giữ suốt ✓ + không ghế đối diện/đèn ✓. Tồn dư nhỏ (→ Thấp, không chặn): tay turn cầm đũa ngang cạnh bát chứ chưa "nâng bát lên ăn" như chữ s7a; seam còn bước tone nhẹ; LED vẫn nhỏ hơn dải tuýp về diện tích. |
| 3 | Originality | 9 | Không đổi qua 4 vòng: gạch men + tím chạng vạng + RED `#FF5A36`/BLUE `#9DB4FF` khác hẳn UA (`Main.tsx`: đen+gold sơ đồ node) và ClaudeMem (kem+clay terminal). Không ghế đối diện+đèn vàng (gaplai), không polaroid/rêu (camon), phone chỉ là insert s9 (cuoc-goi), bếp hai bộ đũa + người ấy s5–s10 (metkhong), không đen+que+cam (lan). |
| 4 | Consistency | 9 | Kit khóa giữ cả 3 frame: da `#E3B98E` + tay áo `#C9BBA6` + đũa nâu + mẫu bát (rim + soup gloss + hành đổ bóng + steam) hook↔turn khớp; figure end đúng kit. "sợ" cover f0 = hook f80 (cùng BLUE_DEEP). Caption system nhất quán (Literata headline s1/s10, Lexend pill+tag s7). Light logic theo arc: hook trung tính+pool ấm → turn trung tính hội tụ → end phòng chạng vạng. |
| 5 | Phone legibility + safe zone | 9 | Dấu đủ cả 3 frame (Giữ ấm, sợ, thương, ữ/ể/ẫ/ộ sạch). Không chữ nào lọt đáy 210px (pill turn đáy ~y1690, vừa trong giới hạn; end không caption đáy). "sợ" BLUE_DEEP trên scrim + F2 trắng soft-shadow đều đọc được ở 1/3. Chữ tile board s1/s10 còn nhỏ — tính ở mục 8. |
| 6 | Profile visual test (story) | 8 | Hook: cận tay diễn beat ✓. Turn: tay + bát đối xứng nhưng beat "Người ấy ăn, đâu biết đó là tối nào" vẫn không có người ăn/mặt/động tác nâng. End: có người ăn + người nhìn (vai foreground) nhưng figure vẫn capsule nhìn từ trên, không biểu cảm. **Close-up: CHƯA render** — chỉ tồn tại dưới dạng eye-inset trong tile s8 board + chỉ định insert ở spec §5 (gaze payoff cho "nhìn lâu hơn mọi tối"). Ghi nhận cam kết đúng chỗ, nhưng D chỉ chấm được plan; close-up thật phải verify ở build/QA (→ t9). Board s5/s6/s8 nay đã đọc được diễn xuất (tiến lớn so vòng 3). |
| 7 | Motion (strip) | 8.5 | `motion-hook.png` 24 ô (f0–59, 12fps) đọc trái→phải: pool ấm thở theo hàng (hàng 3–4 vầng đào quanh bát dâng rõ so hàng 1, xem ô đầu–giữa–cuối full-size), push 1.00→1.05 vi mô đều-sine, không overshoot/nảy ✓, pace hợp voice chậm. Ở cỡ phone nhịp thở chỉ thoáng thấy. R2 không đòi gia tốc cho slow-push này. Strip riêng cho freeze/rewind/converge vẫn ngoài phạm vi (Cannot verify). |
| 8 | Cover + storyboard | 8.5 | Cover 9: F1 nguyên văn đủ từ frame 0, hero + hai bát + LED, tắt tiếng hiểu "hai người". Board 8: đủ 10 shot + tên card + caption zone + s1/s10 ĐỦ F1/F2; staging nay đã đọc được — s5 cửa mở+dusk tràn+figure, s6 xanh lạnh + nhãn "12f tua lại" + tư thế ngồi (phân biệt s5), s7 hai hàng tay-bát mini, s8 brackets + eye inset, s9 ba insert đọc được chữ + nhãn minh hoạ. s2 (crop phóng to): đọc được dạng icon-map top-down — cửa sổ tím + 2 bát + 2 đôi đũa + nồi LED chấm đỏ + áo trên ghế; móc chìa chỉ còn gợi ý, tile text còn nhỏ. Trung bình (9+8)/2 = 8.5. |
| 9 | Shot-card choice & fidelity | 8.5 | 10/10 cặp card+style-key tự validate trong `library.json` vòng này (10 tồn tại, 0 thiếu). Freeze hero 1 lần ✓ (P4); s5+s6 chung họ `transition-hidden-cut` 2 style-key = 1 device tương phản (đã biện minh); text `blur-slide` là system. Converge tĩnh đã thấy evidence (hai nền + seam mềm); converge ĐỘNG + rewind replay + thaw vẫn chờ strip riêng. Tableau hook SVG tự vẽ (W2 đã khai) nên fidelity hình ảnh N/A, chỉ giữ grammar. Poster `before-after-slider-scrub` là dashboard grid, proto hai bát — giữ mechanic, ngữ nghĩa xa (đã ghi từ vòng 1). |
| 10 | Aesthetic rules | 9 | R1 ✓ (hold khai ≥1s/1.8s). R2 ✓ sine toàn video, strip không linear thô. R3 ✓ arc hook ≥3s. R4 ✓ 0 whole-frame slam. Q1 N/A-cho-phép (story SVG). Q3 ✓ không shake. Q4 ✓ 1 glint s5 (LED thở là emissive pulse). Q5 ✓ 1 hero. Q6 ✓ chính diện. Q8 deviation đã log D9 ✓. Q11 ✓. S/C ✓ F1/F2 nguyên văn. P1/P2/P4 ✓. Tồn dư Q10 nhẹ: jacket blur, bước tone seam, chữ tile board nhỏ (đã ghi tickets Thấp). Không vi phạm cứng. |

**Mean: 8.8** (88/10) · Mục 1 = 8.5 (<9), mục 2 = 9 · không mục nào <8 · **verdict: revise** (mean <9).

### Previous fixes verified (Round 3 → Round 4)

- **T2-cont2 board s2/s5/s6/s8: ĐÓNG.** s5 cửa mở + dusk + figure ✓; s6 rewind label + ngồi-yên phân biệt s5 ✓; s7 tay-bát mini ✓ (ngoài yêu cầu); s8 brackets + eye inset ✓; s2 icon-map đọc được khi phóng to (cửa sổ + 2 bát + đũa + nồi LED + áo) ✓ — chấp nhận chuẩn "staging map low-fi" của spec §5; tồn dư (móc chìa gợi ý, chữ tile nhỏ) → t10.
- **t4 turn chia-tan + tag: ĐÓNG.** Crop dải giữa: không còn vạch cứng, hai nền cùng neutral, tag muted ✓; bước tone dư rất nhẹ → quan sát ở build (t8).
- **t5 end nồi + LED: ĐÓNG.** Nồi tách khỏi bát, bát mình đọc trọn miệng ✓; LED có glow, parity với vệt tuýp ~85% ✓.
- **t6-carry/W3 steam: ĐÓNG.** Steam thấy rõ ở turn (2 wisps/nửa) + end-mid (crop) ✓; hook/cover còn nhẹ nhưng chấp nhận (beat s1 hơi là phụ, beat chính là tay+hành+LED).

### Fixes (toàn Thấp — không còn Cao/Trung mở; NEW cho vòng 5 / build)

- **t7-NEW (Thấp) — hook: jacket + bàn (vòng 5 hoặc build-polish).** Thay đổi: hoặc vẽ jacket có nếp gấp/tay áo rủ ra dáng (hiện là blob blur nặng nhất khung), hoặc crop tableau cao hơn ~10–15% / đặt đĩa hành-đũa thừa vào nửa dưới để mặt bàn kể thêm chuyện. Acceptance: full-size hết đọc "vết nhòe", thumb không đổi.
- **t8-NEW (Thấp) — build s7: tay "nâng bát" + halves pixel-match.** Thay đổi: scene-agent dựng tay người ấy NÂNG bát (đúng chữ s7a), không đặt bát yên + đũa ngang; hai nửa converge về cùng một grade value (hết bước tone dư của proto). Acceptance: QA fidelity shot s7 ≥8.
- **t9-NEW (Thấp) — build s8: close-up mắt "nhìn lâu" phải tồn tại.** Thay đổi: thực hiện eye-insert đã chỉ định ở tile s8 + spec §5 (gaze payoff beat "nhìn lâu hơn mọi tối"); story hiện không có một ánh mắt nào. Acceptance: still s8 có close-up mắt/mặt, QA chấm.
- **t10-NEW (Thấp) — board: chữ tile ≥2x + icon móc chìa s2.** Thay đổi: tăng cỡ chữ tile (nhất là s1/s10 F1/F2) để E/B đọc board-first không sót; thêm icon móc chìa khoá vào tile s2. Acceptance: đọc đủ chữ tile ở 1/3.

### Root cause (vòng 3+ phải nêu)

Khoảng cách 8.8 → 9 nằm ở **finish full-size của proto SVG** (jacket, mặt bàn, vành bát) + **close-up chưa render** — tức trần modeling của style-frame, không phải sai staging hay sai chuyện. Mọi staging/script/device đã đúng; vòng 5 chỉ nên là polish có mục tiêu (t7) + cam kết build (t8/t9), không redesign.

### Cannot verify (ngoài hook strip / stills)

Như vòng 3: LED thở 2.4s suốt turn/end; grade-shift đúng chữ "thương/sợ"; freeze slope-0 + thaw bù giờ (s4); rewind 12f + replay y hệt (s6); rack focus s8; scan 1 pass/insert s9 full-size; press-stagger F2 + lặng thuần 1.8–2.0s (s10); close-up mắt s8 (t9, chờ build); toàn bộ SFX/BGM/ducking, voice-sync, timeline — chờ QA/render và gate C.

### Weaknesses (điểm yếu còn lại)

1. Mặt bàn xám ~40% frame hook không kể gì (→ t7).
2. Zero khuôn mặt/close-up đã render trong cả 3 frame (→ t9 build).
3. Vành bát mỏng, phối cảnh dẹt — cả 3 frame bát đều hơi "đồ họa phẳng" khi xem full-size.
4. Jacket là element rẻ nhất của frame đẹp nhất (→ t7).
5. Chữ tile board s1/s10 quá nhỏ cho người đọc board-first (→ t10).

## Round 5

Vid `thuong-hay-so-bat-dau-lai` · profile story · 9:16 1080x1920 · gate D vòng 5 (clean context, reviewer mới — **vòng cuối, hard cap**).
Inputs read: `brief.md`, `script.md` v2, `design-spec.md` (D1–D9 + log t7 vòng 5 + chuẩn đọc board §5),
`out/qa/thuong-hay-so-bat-dau-lai-{cover,style-hook,style-turn,style-end,board,motion-hook}.png`
(cover/hook/motion MỚI render sau fix t7 — tự mở từng PNG bằng Read, full-size + đánh giá thumbnail ~1/3),
`skills/video-shotcraft/references/aesthetic-rules.md` (full R1–R4/Q1–Q11/S1–S5/C1–C3/P1–P4),
posters style-key (đối chiếu mô tả các vòng trước), `gallery/api/library.json`
(vòng 1–4 đã validate 10/10, spec không đổi card nên không cần re-check),
`src/Main.tsx` (đen+gold sơ đồ node) / `src/ClaudeMem.tsx` (kem+clay terminal) — không trùng,
profile story rubric (ray-pineline SKILL: character diễn beat + close-up biểu cảm khi cần),
user constraints (F1 s1 + F2 s10 nguyên văn; cấm gaplai/camon/cuoc-goi/metkhong/lan;
s10 cấm ghế đối diện+đèn, hai màu ngang nhau),
Round 1 (7.6) + Round 2 (8.1) + Round 3 (8.6) + Round 4 (8.8 — đối chiếu t7/t8/t9/t10 bên dưới).

### Score table (1–10, evidence = file + region)

| # | Mục | Điểm | Evidence |
|---|---|---|---|
| 1 | Beautiful | 9 | Hook (`cover.png` f0 / `style-hook.png` f80, render mới): jacket mép phải nay đã ra dáng áo vắt trên ghế — ve cổ V + khuy tròn + tay áo rủ + chân ghế, hết đọc "vết nhòe" ở full-size (t7 đóng); foreground nay có bát mình (còn hành + đũa ngang) + đĩa hành nhặt ra đáy phải — nửa dưới đã kể chuyện, hết "bàn trống" ở mức chặn. Pool ấm quanh bát đối diện + tay ngón kẹp đũa + bát có miệng/nước/hành/hơi giữ nguyên. Turn gọn sạch, seam chỉ còn bước tone nhẹ; end là frame điện ảnh nhất (frame-in-frame + LED halo + vệt tuýp + steam). Thumbnail 1/3: hook/end đọc tốt. Tồn dư Thấp (không chặn): vùng giữa bàn vẫn ~30% xám phẳng; vành bát mỏng, phối cảnh dẹt khi xem full-size; zero khuôn mặt (→ t9 build). Đạt "đăng kênh top không sửa" ở cỡ phone — 9 biên. |
| 2 | Fits the subject | 9 | Đối chiếu từng element với script s1–s10. s1: tay gắp từ bát canh ĐỐI DIỆN ✓ + LED Giữ ấm đỏ son + hơi ✓ + bát mình foreground/đũa ngang ✓ + đĩa hành ✓ + jacket trên ghế ✓ + cửa sổ tím chạng vạng ✓ + F1 nguyên văn từng chữ (thương RED/sợ BLUE_DEEP) ✓. s7: hai bát SẠCH không hành + đĩa hành 3 cọng mỗi nửa ✓ (D8), hai nền cùng neutral hội tụ ✓, caption "Cái bát vẫn y hệt nhau." khớp ✓, tag hai nửa muted ✓. s10: người ấy ngồi ăn cúi đầu chưa ngẩng ✓ + bát mình còn hành/đũa ngang/hơi = "chỗ vẫn chờ" ✓ + LED glow + vệt tuýp lạnh ngang tầm (~85% parity) ✓ + F2 nguyên văn giữ suốt ✓ + không ghế đối diện/đèn ✓. Tồn dư Thấp: tay turn cầm đũa ngang cạnh bát chứ chưa "nâng bát lên ăn" như chữ s7a (→ t8 build). |
| 3 | Originality | 9 | Không đổi qua 5 vòng: gạch men + tím chạng vạng + RED `#FF5A36`/BLUE `#9DB4FF` khác hẳn UA (đen+gold sơ đồ node) và ClaudeMem (kem+clay terminal). Không ghế đối diện+đèn vàng (gaplai), không polaroid/rêu (camon), phone chỉ là insert s9 (cuoc-goi), bếp hai bộ đũa + người ấy s5–s10 (metkhong), không đen+que+cam (lan). |
| 4 | Consistency | 9 | Kit khóa giữ cả 3 frame: da `#E3B98E` + tay áo `#C9BBA6` + đũa nâu + mẫu bát (rim + soup gloss + hành đổ bóng + steam) hook↔turn khớp; figure end đúng kit. "sợ" cover f0 = hook f80 (cùng BLUE_DEEP — không regression sau re-render). Caption system nhất quán (Literata headline s1/s10, Lexend pill+tag s7). Light logic theo arc: hook trung tính+pool ấm → turn trung tính hội tụ → end phòng chạng vạng. |
| 5 | Phone legibility + safe zone | 9 | Dấu đủ cả 3 frame, kiểm từng chữ: F1 (giữ/mối/hệ/ấy/vì/thương/sợ/phải/bắt/đầu/lại), F2 (Nếu/hôm/nay/mới/gặp/người/ấy/biết/mọi/điều/đang/bạn/có/chọn/bước/vào/không), caption turn "Cái bát vẫn y hệt nhau.", tag "vì thương/vì sợ", nhãn nồi "Nấu/Giữ ấm" — không tofu. Không chữ nào lọt đáy 210px (pill turn đáy ~y1690 vừa trong giới hạn; end không caption đáy). "sợ" BLUE_DEEP trên scrim + F2 trắng soft-shadow đọc được ở 1/3. Chữ tile board nhỏ — tính ở mục 8. |
| 6 | Profile visual test (story) | 8 | Hook: cận tay diễn beat ✓. Turn: tay + bát đối xứng nhưng beat "Người ấy ăn, đâu biết đó là tối nào" vẫn không có người ăn/mặt/động tác nâng (→ t8 build). End: có người ăn + người nhìn (vai foreground) nhưng figure capsule nhìn từ trên, không biểu cảm. **Close-up mắt s8 vẫn chỉ tồn tại dưới dạng eye-inset trong tile board + chỉ định insert spec §5** — D chỉ chấm được plan (→ t9 build/QA). Board s5/s6/s8 đọc được diễn xuất (giữ từ vòng 4). Không regression, nhưng không có evidence mới để tăng điểm. |
| 7 | Motion (strip) | 8.5 | `motion-hook.png` 24 ô (f0–59, 12fps, render mới): đọc trái→phải pool ấm thở theo hàng (hàng 3–4 vầng đào quanh bát dâng rõ so hàng 1), push 1.00→1.05 vi mô đều-sine, không overshoot/nảy/jitter ✓, pace hợp voice chậm. Ở cỡ phone nhịp thở chỉ thoáng thấy — đúng bản chất slow-push, R2 không đòi gia tốc cho trường hợp này. Strip riêng cho freeze/rewind/converge vẫn ngoài phạm vi (Cannot verify). Giữ 8.5: không có evidence động mới so vòng 4. |
| 8 | Cover + storyboard | 8.5 | Cover 9: F1 nguyên văn đủ từ frame 0, hero + hai bát + đĩa hành + LED, tắt tiếng hiểu "hai người", thumbnail đọc tốt. Board 8: đủ 10 shot + tên card + caption zone + s1/s10 đủ F1/F2; staging đọc được (s5 cửa mở+dusk+figure, s6 rewind label + ngồi-yên phân biệt s5, s7 tay-bát mini, s8 brackets + eye inset, s9 ba insert + "minh hoạ", s2 icon-map đọc được khi phóng to). Tồn dư: chữ tile s1/s10 vẫn nhỏ, icon móc chìa s2 chỉ gợi ý (→ t10 vẫn MỞ). Trung bình (9+8)/2 = 8.5. |
| 9 | Shot-card choice & fidelity | 8.5 | 10/10 cặp card+style-key đã validate (vòng 1–4, spec không đổi). Freeze hero 1 lần ✓ (P4); s5+s6 chung họ `transition-hidden-cut` 2 style-key = 1 device tương phản (đã biện minh). Converge tĩnh đã thấy evidence (hai nền neutral + seam mềm + tag muted); converge ĐỘNG + rewind replay + thaw vẫn chờ strip riêng. Tableau hook SVG tự vẽ (W2 đã khai) nên fidelity hình ảnh N/A, chỉ giữ grammar. Không evidence mới — giữ 8.5. |
| 10 | Aesthetic rules | 9 | R1 ✓ (hold khai ≥1s/1.8s). R2 ✓ sine toàn video, strip không linear thô, không jitter. R3 ✓ arc hook ≥3s. R4 ✓ 0 whole-frame slam. Q1 N/A-cho-phép (story SVG). Q3 ✓ không shake. Q4 ✓ 1 glint s5 (LED thở là emissive pulse). Q5 ✓ 1 hero. Q6 ✓ chính diện. Q8 deviation đã log D9 ✓. Q11 ✓ (trừ biên: chữ tile board nhỏ — tính ở mục 8). S/C ✓ F1/F2 nguyên văn. P1/P2/P4 ✓. Tồn dư Q10 nhẹ: vành bát dẹt, vùng giữa bàn phẳng (→ t11 build-polish). Không vi phạm cứng. |

**Mean: 8.8** (87.5/10) · Mục 1 = 9 ✓, mục 2 = 9 ✓, không mục nào <8 ✓, **không còn Cao/Trung mở** ✓ — nhưng **mean 8.8 < 9 → verdict: revise** (chỉ tiêu mean chưa đạt).

### Previous fixes verified (Round 4 → Round 5)

- **t7 hook jacket + bàn: ĐÓNG.** Jacket nay có ve cổ/khuy/tay áo rủ/chân ghế, hết đọc "vết nhòe" ở full-size ✓; foreground có bát mình + đũa ngang + đĩa hành, nửa dưới kể chuyện ✓; F1/BLUE_DEEP/LED/steam không regression sau re-render (cover f0 = hook f80) ✓; thumbnail 1/3 đọc đủ F1 ✓; strip sine không jitter ✓. Tồn dư vùng giữa bàn phẳng → t11-NEW (Thấp, build-polish).
- **t8 build s7 tay "nâng bát": MỞ (build-scope).** Turn vẫn tay cầm đũa ngang cạnh bát — đúng như vòng 4, chờ scene-agent, không phải regression.
- **t9 build s8 close-up mắt: MỞ (build-scope).** Chưa có render mới — eye-inset vẫn chỉ nằm trong tile board + spec §5, chờ build/QA.
- **t10 board chữ tile + icon móc chìa: MỞ.** Chữ tile s1/s10 vẫn nhỏ, móc chìa s2 chỉ gợi ý — board không render lại vòng này.
- **Các ticket cũ (C1/C2/C3, T1/T2/T3, t1/t2/t3, C3-cont/C1-cont, T2-cont/T4, t4/t5/t6-carry, T2-cont2): không regression.** F1/F2 nguyên văn, kit khớp, converge/tag/two-color parity, board staging giữ nguyên mức vòng 4.

### Fixes (toàn Thấp — không còn Cao/Trung mở; vòng 5 là hard cap nên không loop)

- **t8 (Thấp, build, MỞ từ vòng 4) — scene-agent dựng tay người ấy NÂNG bát s7** (đúng chữ s7a), hai nửa converge về cùng grade value. Acceptance: QA fidelity shot s7 ≥8.
- **t9 (Thấp, build, MỞ từ vòng 4) — thực hiện eye-insert tile s8 + spec §5** (gaze payoff "nhìn lâu hơn mọi tối"). Acceptance: still s8 có close-up mắt/mặt, QA chấm.
- **t10 (Thấp, MỞ từ vòng 4) — board: chữ tile ≥2x (nhất là s1/s10 F1/F2) + icon móc chìa vào tile s2.** Acceptance: đọc đủ chữ tile ở 1/3.
- **t11-NEW (Thấp, build-polish) — hook mid-table còn ~30% xám phẳng giữa bát trung tâm và foreground.** Thay đổi (build, không cần re-render proto): thêm shading ron gạch/vignette nhẹ hoặc hạt noise vào vùng giữa để hết đọc "nền trơn", giữ tableau và safe zone. Acceptance: full-size hết vùng phẳng, thumb không đổi.

### Root cause (vòng 3+ phải nêu)

Khoảng cách 8.8 → 9 nằm ở **finish full-size của proto SVG + close-up chưa render** — tức trần modeling của style-frame, không phải sai staging hay sai chuyện. Mọi staging/script/device đã đúng; điểm nghẽn còn lại (mặt/biểu cảm, tay nâng bát, chữ board) đều thuộc build/QA, không thể đóng bằng thêm một vòng polish proto. Từ vòng 3 tới vòng 5 mỗi vòng chỉ tăng +0.2 (8.6 → 8.8 → 8.8), đường cong đã phẳng.

### Đề nghị director (hard cap — không loop vòng 6)

Gate D yêu cầu mean ≥9 + không Cao/Trung mở; hiện tại **không Cao/Trung mở**, mục 1+2 ≥9, không mục nào <8 — chỉ thiếu mean (+1.5 điểm, không thể lấy credibly từ polish proto mà không thổi điểm). Đề nghị director chọn một: (a) **pass có điều kiện**, chuyển t8/t9/t10/t11 cho scene-agent + QA fidelity (shot <8 là fix, QA đã có chuẩn này); hoặc (b) giữ revise và hạ chuẩn có lý do. Reviewer không thổi điểm để đủ 9.

### Cannot verify (ngoài hook strip / stills)

Như vòng 4: LED thở 2.4s suốt turn/end; grade-shift đúng chữ "thương/sợ"; freeze slope-0 + thaw bù giờ (s4); rewind 12f + replay y hệt (s6); rack focus s8; scan 1 pass/insert s9 full-size; press-stagger F2 + lặng thuần 1.8–2.0s (s10); close-up mắt s8 (t9, chờ build); toàn bộ SFX/BGM/ducking, voice-sync, timeline — chờ QA/render và gate C.

### Weaknesses (điểm yếu còn lại)

1. Vùng giữa bàn hook ~30% xám phẳng, không kể gì (→ t11 build-polish).
2. Zero khuôn mặt/close-up đã render trong cả 3 frame — story về "nhìn lâu hơn mọi tối" mà chưa có ánh mắt nào (→ t9 build).
3. Vành bát mỏng, phối cảnh dẹt — cả 3 frame bát đều hơi "đồ họa phẳng" khi xem full-size (trần style, chấp nhận ở cỡ phone).
4. Tay turn cầm đũa ngang cạnh bát thay vì "nâng bát lên ăn" như chữ s7a (→ t8 build).
5. Chữ tile board s1/s10 quá nhỏ cho người đọc board-first; icon móc chìa s2 chỉ gợi ý (→ t10).
