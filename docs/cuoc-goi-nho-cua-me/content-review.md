# Content Review — cuoc-goi-nho-cua-me (Cuộc gọi nhỡ của mẹ)

Reviewer độc lập (clean context). Đọc như một trải nghiệm người xem duy nhất.
Đối chiếu: `script.md` (8 shots, verbatim 138 từ) + `brief.md` + `research.md` (facts/inferences/unknowns)
+ 3 style frames (`-s1`, `-s5`, `-s8`) + `design-spec.md` + `design-review.md`.

> Lưu ý phạm vi: voice là verbatim lời user nên mặc định an toàn. Review này soi
> **chuyển thể hình ảnh** có giữ đúng logic câu chuyện không.

## I. Profile story

**Sự cụ thể cảm xúc (chi tiết nào chạm):** Mạnh. Ba chi tiết neo cả video đều là lời thật,
không nâng tông: (1) `"Con ăn cơm chưa?"` — câu cửa miệng không cần ngữ cảnh, đúng như
research §2 ghi nhận; (2) `"nghe giọng mình một chút thôi"` — động cơ nhỏ đến mức đau;
(3) `"Một cuộc gọi lại thôi"` — callback kép (lời hứa s3 → trạng thái phone s8).
Không số liệu, không "báo hiếu/đấng sinh thành", không kết luận đạo lý — brief §"Bỏ ra" được tôn trọng.

**Cú xoay (bận rộn → ấm):** Rõ và đặt đúng chỗ. Bản lề là s5 "Mẹ bắt máy rất nhanh" —
ánh sáng ấm tràn lên + chuông dừng là cú nhấn duy nhất, khớp yêu cầu user
("ấm chậm từ lúc mẹ bắt máy"). Không spoil sớm: hook s1 bỏ lửng ở "…".

**Pacing nhanh → chậm:** Đúng yêu cầu user trên giấy (s1–s3 shot 3–5s, ≥2 beat, hard-cut;
s5–s8 push-in 1→1.05, hold ≥0.6s, outro 1.4s). Nhưng **nhịp "đường về" bị mất** (xem Lỗi C-2):
s4 văn phòng tối → s5 nhảy thẳng sang phía mẹ, không có beat người con đang gọi lại
từ đâu — cú chậm lại thiếu một nhịp thở chuyển không gian.

**Kết có earned không:** Lời kết earned (suy ngẫm "họ cũng vui rồi", không khuyên răn).
**Hình kết chưa earned** — vì s7/s8 vẽ sai logic cuộc gọi (xem Lỗi C-1): kết đoàn viên
tại cùng một mâm cơm làm câu chốt về "một cuộc gọi lại" mất đối tượng.

## II. Nhận xét từng nhịp (đúng yêu cầu user?)

Yêu cầu user (research §1): gọi nhỡ → bàn bận → **gọi lại trên đường về** → bữa tối.
Giọng: nhanh đoạn việc, ấm chậm từ mẹ bắt máy.

| Shot | Nhận xét | Đúng yêu cầu? |
|---|---|---|
| s1 hook | Phone "cuộc gọi nhỡ — Mẹ" + rung + nền văn phòng lạnh. Hook = candidate 1 verbatim, không spoil. | ✅ |
| s2 | Tay bấm tắt + laptop/tin nhắn dồn vào, cắt nhanh. Khớp "đang làm việc nên bấm tắt". | ✅ |
| s3 | Chat "Lát con gọi lại nha." → montage họp/gõ/checklist. Đủ 3 việc trong lời kể, không thêm việc bịa. | ✅ |
| s4 | Tối dần, gọi nhỡ ban chiều hiện lại, nhịp chậm lại. Đúng "mở điện thoại ra mới nhớ". | ✅ |
| s5 bản lề | Mẹ áp phone mỉm cười, glow hổ phách, caption "Con ăn cơm chưa?". Nụ cười mẹ là suy diễn visual nhưng hợp lý (không bịa fact — research inference, không đưa vào voice). | ✅ có lưu ý nhỏ (thiếu phía người con đang gọi — xem C-2) |
| s6 | Mẹ cầm phone mỉm cười, đèn ấm. Khớp "chỉ muốn nghe giọng mình". | ✅ (visual) |
| s7 | **GÃY.** Voice là cuộc gọi ("ngồi nói chuyện… thêm mấy phút", "trời ở đây có mưa không" — "ở đây" = hai nơi khác nhau). Hình (script + spec + frame s8) vẽ **hai mẹ con ngồi chung một mâm cơm** — biến cuộc gọi xa thành bữa cơm đoàn viên. | ❌ sai logic |
| s8 chốt | Callback phone "Đã gọi lại" đặt **giữa mâm cơm chung** — nếu đã ngồi cùng nhau thì "gọi lại" vô nghĩa, câu chốt mất đối tượng. | ❌ kéo theo s7 |

## III. Soi bịa / sáo / sến (unknowns research §3 → có thành fact trong hình?)

1. **Mẹ ở quê hay phố, sống với ai (unknown #1):** Không vi phạm. Frames chỉ vẽ nội thất
   trung tính + cửa sổ đêm + mưa, không có marker quê/phố, không thêm nhân vật thứ ba.
   Mâm 3 bát cho 2 người ở s8 là chi tiết thừa — nên coi là prop vẽ ẩu, không đọc thành fact.
2. **Người kể trai hay gái (unknown #2):** ⚠️ **Vi phạm gián tiếp.** Brief đã chốt giọng nam
   (Thanh Long) + design vẽ con tóc ngắn áo xanh đá — chuỗi này ngầm chốt người kể là con trai,
   trong khi research để unknown. Không bắt đổi ngay, nhưng phải ghi nhận là **lựa chọn sáng tạo
   cần user confirm**, và visual nên giữ trung tính (không đẩy thêm marker giới tính).
3. **Gọi lại trên đường về hay đã về tới nhà (unknown #3):** ⚠️ **Bị lấp đi thay vì giữ mở.**
   Thay vì giữ ambiguous một cách có chủ ý (ví dụ: không gian tối trung tính + phone),
   spec/frames **xoá luôn beat đường về** rồi đáp thẳng vào mâm cơm chung (C-2).
4. **Gọi thường / Zalo / Messenger (unknown #4):** Không vi phạm. Mock UI vẽ generic
   ("Cuộc gọi nhỡ — Mẹ", "Đang gọi — Mẹ") + pill "minh hoạ" đúng spec — giữ nguyên,
   tuyệt đối không thêm logo app nào khi build.
5. **Tần suất gọi nhau (unknown #5):** Không vi phạm. Không caption/voice nào thêm backstory.
6. **Timestamp `17:42 · Hôm nay` (frame s1):** ⚠️ Bịa nhẹ — lời kể chỉ nói "chiều". Giờ cụ thể
   trên mock UI là fact giả không cần thiết. Đổi thành `Chiều nay`.
7. **Sáo/sến:** Voice sạch đạo lý. Visual có mùi sến ở đúng chỗ gãy (đoàn viên mâm cơm,
   trăng + mưa + đèn treo cùng lúc ở s8) — sẽ tự hết khi sửa C-1, không cần khử riêng.

## IV. Lỗi nội dung (mức độ)

- **C-1 [BLOCKING] — s7/s8 nhập hai không gian thành một.** Bằng chứng nội tại: voice s7
  "trời ở đây có mưa không" chỉ có nghĩa khi hai người ở hai nơi; research fact #7 là
  "nói thêm mấy phút" qua điện thoại. Frame s8 vẽ hai bust chung mâm + phone "Đã gọi lại"
  đặt giữa mâm. Design-review 8.7 PASS đã **bỏ lọt** lỗi này (chỉ soi craft, không soi logic).
  Sửa: tách không gian — con ở chỗ con (phòng tối/mưa ngoài cửa sổ riêng), mẹ ở nhà mẹ;
  trò chuyện QUA ĐIỆN THOẠI (phone áp tai, hoặc split-screen cuộc gọi). Mâm cơm chỉ thuộc
  một phía, hoặc hai mâm riêng. Sửa cột Hình s7/s8 trong `script.md` + spec §7 + vẽ lại frame s8.
- **C-2 [MAJOR] — Mất beat "đường về".** Yêu cầu user ghi rõ "gọi lại trên đường về"
  nhưng s5 chỉ có phía mẹ. Sửa: mở s5 bằng phía người con (đường/phòng tối, màn hình
  "Đang gọi — Mẹ") rồi mới sang mẹ bắt máy — vừa giữ nhịp thở chuyển không gian, vừa lấp
  unknown #3 một cách trung thực (gọi từ nơi con đang ở, không khẳng định đường hay nhà).
- **C-3 [MINOR] — Timestamp `17:42` → `Chiều nay`** (frame s1, tránh fact giả).
- **C-4 [GHI NHẬN] — Giọng nam = chốt giới tính người kể.** Cần user confirm một câu;
  nếu giữ, visual không thêm marker giới tính nào nữa.

## V. TỔNG: 6.5/10 — verdict: REVISE

Lời kể 9/10 (cụ thể, xoay đúng, kết earned, không sáo). Chuyển thể hình ảnh 5/10 vì
gãy logic ở đúng cao trào (C-1) + mất beat đường về (C-2). Design-review PASS trước đó
không có giá trị che cho hai lỗi này. **Không vào build cho tới khi sửa C-1 + C-2,
vẽ lại frame s8 (hai không gian riêng, thoại qua phone), sửa cột Hình s7/s8.**
C-3 sửa cùng lúc. C-4 hỏi user một câu khi giao.

---

## Vòng 2 (chấm lại sau sửa — ngày 2026-10-14)

**Phạm vi:** đối chiếu `script.md` (verbatim, không đổi lời thoại) + `brief.md` + `research.md`
+ `design-spec.md` (đã sửa) + 3 frames mới (`-s1` badge ống nghe+mũi tên, `-s5` 2 beat,
`-s8` hai panel + phone cầu nối) + voice chốt (clone Thanh Long 33.73s → timeline
1162f ≈ 38.7s + holds hook +0.5s/outro +1.0s → ~40.2s, vừa min 40s).

### 1. Đối chiếu 4 fix vòng 1

- **C-1 [BLOCKING] s7/s8 nhập hai không gian thành một — ĐÃ HẾT (phần hình).**
  Frame `-s8` mới vẽ đúng `TwoRoomsCall`: panel `Con` (tường lạnh `ROOM_CHILD #232B34`,
  bàn 1 bát ăn một mình, cửa sổ mưa riêng) + panel `Mẹ` (tường ấm `NIGHT_BG`, mâm 2 bát
  thuộc phía mẹ) + dải `VoiceWave` hổ phách nối giữa + phone portrait cầu nối.
  Cả hai bust đều áp phone — cuộc gọi xa, khớp voice s7 ("trời ở đây có mưa không",
  "ở đây" = hai nơi). Mâm 3-bát thừa vòng 1 đã hết (nay 2 bát phía mẹ + 1 bát phía con,
  trung tính). Spec §5/§7/§8 ghi đúng "hai phòng riêng", "không ngồi chung khung".
- **C-2 [MAJOR] mất beat "đường về" — ĐÃ HẾT.** Spec s5 + frame `-s5` mới có đủ 2 beat:
  beat 1 người con dưới `StreetLamp` đêm, phone "Đang gọi — Mẹ" (màn đêm `#171310`,
  không sub-rect xanh lạc tông) → dải `VoiceWave` → beat 2 mẹ bắt máy, glow 0→0.5.
  Vừa khớp yêu cầu user ("gọi lại trên đường về"), vừa giữ mở unknown #3 một cách
  trung thực (không khẳng định đường hay nhà ở s7–s8, panel `Con` là phòng đêm trung tính).
- **C-3 [MINOR] timestamp `17:42` → `Chiều nay` — ĐÃ HẾT.** Frame `-s1` hiện `Chiều nay`;
  spec §5 khóa "timestamp chữ `Chiều nay` (không giờ cụ thể)". Badge s1 đúng
  ống nghe + mũi tên trượt, không tick xác nhận.
- **C-4 [GHI NHẬN] giọng nam — KHÔNG TÍNH LÀ LỖI.** Giọng nam (Thanh Long) là ràng buộc
  do USER chỉ định trực tiếp ngày 2026-10-14, không phải suy diễn của pipeline.
  Spec §5 giữ trung tính visual (không thêm marker giới tính ngoài tạo hình đã chốt)
  là xử lý đúng; không cần user confirm thêm.

### 2. Còn khẳng định fact nào từ unknowns không?

Không. Quét lại 5 unknowns (research §3): (1) mẹ ở đâu/sống với ai — nội thất trung tính,
không marker quê/phố, không nhân vật thứ ba, nhãn panel chỉ `Con`/`Mẹ`; (2) giới tính
người kể — xem C-4, là ràng buộc user; (3) đường về hay đã về — s5 vẽ đường về theo đúng
yêu cầu user, s7–s8 giữ phòng trung tính; (4) app gọi nào — phone generic toàn bộ,
không logo; (5) tần suất gọi — không backstory thêm. Timer `03:12` trên phone s8 là
mock UI minh họa ("thêm mấy phút" — research fact #7), có pill "minh hoạ", không đọc
thành fact. Không trăng ở cửa sổ (đã bỏ theo spec — tránh sến), tốt.

### 3. Fix còn lại (1, MINOR — không chặn build)

- **C-5 [MINOR] — Lệch trạng thái phone ở s8 giữa các tài liệu + voice.**
  Voice s8: *"Cúp máy rồi mình nghĩ…"* (đã cúp) + spec §5(d) outro callback *"Đã gọi lại"*
  + tick hổ phách — nhưng spec §7 dòng s8 và frame `-s8` lại ghi/vẽ phone cầu nối
  *"Đang gọi — Mẹ · 03:12"* (đang gọi). Mâu thuẫn nội tại: nếu đã cúp thì phone phải hiện
  "Đã gọi lại" theo đúng callback brief ("cùng chiếc điện thoại đó hiện trạng thái
  đã gọi lại"). Sửa: thống nhất s8 = phone "Đã gọi lại" + tick hổ phách (giữ ngôn ngữ
  portrait để nhận ra cùng chiếc điện thoại), sửa 1 dòng spec §7 + redraw riêng phone
  trong frame `-s8` (không cần vẽ lại toàn frame). Kèm theo: cột Hình s7 `script.md`
  còn chữ cũ *"Hai mẹ con trò chuyện bên bữa tối"* — gợi mâm chung, sửa thành
  *"Con ở phòng riêng + mẹ ở nhà, trò chuyện qua điện thoại (TwoRoomsCall)"* cho khớp spec
  (lời thoại verbatim giữ nguyên).

### 4. TỔNG VÒNG 2: 8.5/10 — verdict: PASS (kèm fix C-5)

Lời kể giữ 9/10. Chuyển thể hình ảnh từ 5/10 → 8/10 (C-1 + C-2 hết, C-3 hết, C-4 thành
ràng buộc; trừ 1 điểm cho C-5 lệch trạng thái phone s8 + chữ Hình s7 cũ, trừ 1 điểm dự
phòng craft khi build: caption đêm bắt buộc `textShadow`, mắt cong/bob thở chỉ kiểm
được ở stills QA động). **Cho vào build; sửa C-5 (1 dòng spec + phone trong frame s8
+ 1 cụm chữ cột Hình s7) trước hoặc song song build, không cần vòng review 3.**

---

## Vòng 3 (chấm độc lập script v2 160 từ + voice clone — ngày 2026-10-14)

**Phạm vi (clean context):** `script.md` v2 160 từ (user cho phép sửa lời, bỏ luật
verbatim v1; khung sự thật giữ nguyên) + `brief.md` + `research.md` + `design-spec.md`
v2 (hệ thống nhấn mạnh 3 đỉnh §9 + Be Vietnam Pro 600) + 3 frames SVG
(`-s1` badge ống nghe + mũi tên + "Chiều nay", `-s5` caption v2
"bắt máy ngay, chưa kịp reo hai tiếng", `-s8` phone "Đã gọi lại ✓") + `voice.json`
v2 (khớp từng chữ script) + voice chốt clone Thanh Long s1 2.80 / s2 2.80 / s3 5.92 /
s4 5.44 / s5 6.78 / s6 3.89 / s7 7.26 / s8 5.91 = **40.80s** → video ~47.3s
(holds s1+15f / s8+30f). Lưu ý đầu vào: **s5 CER 0.046 vượt ngưỡng — cần người nghe kỹ,
không phải lỗi content** (xem §6).

**Đối chiếu nhanh vòng 2:** C-1 (hai không gian) — giữ nguyên đã hết (frame `-s8`
`TwoRoomsCall` hai panel riêng + `VoiceWave`, spec §5/§7 khóa "không ngồi chung khung").
C-2 (beat đường về) — giữ nguyên đã hết (frame `-s5` đủ 2 beat + `StreetLamp`,
spec s5 beat 1 "Đang gọi — Mẹ"). C-3 (`Chiều nay`) — giữ nguyên đã hết (frame `-s1`
+ spec §5 khóa không giờ cụ thể). C-4 (giọng nam) — ràng buộc user, không tính lỗi.
**C-5 (phone s8 "Đang gọi" vs voice "Cúp máy rồi") — ĐÃ HẾT:** frame `-s8` hiện
"Đã gọi lại ✓" + tick hổ phách; spec §5(d)/§7 thống nhất outro sau cúp máy; cột Hình
s7 script v2 đã sửa thành `TwoRoomsCall` hai phòng riêng (không còn chữ "bên bữa tối"
gợi mâm chung).

### 1. Xúc động / cụ thể — 2.8/3 (tiêu chí user)

V2 sửa lời đúng hướng "cụ thể hóa hành vi + giác quan", không thêm đạo lý:
s2 "họp dở · bấm tắt vội" (việc cụ thể đang làm + close-up ngón tay gieo tương phản);
s3 "nhắn vội" + chốt "rồi quên bẵng" (gọi tên hành vi quên thật thay vì liệt kê);
s4 "phòng đã tắt đèn / màn hình sáng" + "vẫn nằm đó, mình chột dạ" (giác quan + tội lỗi
cụ thể thay cho "mới nhớ lời hẹn" khái quát); s5 "chính ngón tay ban chiều bấm tắt" +
"chưa kịp reo hai tiếng" (tương phản tay + bằng chứng âm thanh thay cho "rất nhanh"
trừu tượng); s7 "cơm đã nguội · mưa vẫn gõ nhẹ · nhỏ xíu" (tương phản 1 bát nguội vs
mâm nhà mẹ + âm thanh mưa); s8 thêm "mãi" (nghĩ mãi — dư âm, không đổi nghĩa).
Ba neo cảm xúc research §2 ("Con ăn cơm chưa?", "nghe giọng mình một chút thôi",
"Một cuộc gọi lại thôi") giữ nguyên vị trí và nguyên chữ. Không số liệu, không
"báo hiếu/đấng sinh thành/vô thường", không kết luận sáo — brief §"Bỏ ra" được tôn trọng.
Trừ 0.2: "chưa kịp reo hai tiếng" là định lượng mới (research chỉ nói "rất nhanh");
chấp nhận được vì user cho phép sửa lời + nằm trong khung sự thật, nhưng chính chi tiết
này gắn với CER s5 0.046 nên phải nghe kỹ (nếu voice đọc sai số/tốc độ thì là lỗi render,
không phải lỗi chữ).

### 2. Cấu trúc nhanh→chậm + 3 highlight earned — 2.4/2.5

Nhanh→chậm đúng brief và đúng số: s1–s3 shot ngắn 2.8–5.9s, ≥2 beat, hard-cut/slide-in;
s4 dissolve bản lề ngày→tối 20f, nhịp chùng; s5–s8 shot dài 3.9–7.3s, 1 động tác/shot
(push-in/tĩnh), hold ≥0.6s + nín s5 0.5s + lặng s8 1.0–1.4s + outro. Ba đỉnh (§9 spec +
cột Delivery script) đều earned, không slam: (a) s5 nín 1 nhịp sau "hai tiếng" + close-up
mẹ + chuông dừng + glow 0.25→0.5 — earned bằng chờ đợi + tương phản ngón tay;
(b) s6 "nghe giọng mình một chút thôi" ấm nhất + WarmGlow 1.0 MAX + push-in chậm nhất —
earned vì là lời giải motive ("chẳng nhờ gì cả"); (c) s8 "Một cuộc gọi lại thôi" lặng +
caption tắt sớm + phone "Đã gọi lại ✓" — earned bằng callback lời hứa s3 → trạng thái
phone. Trừ 0.1: ý đồ s6 "chậm nhất (~3.2 từ/s)" chưa thể hiện ở render hiện tại
(16 từ / 3.89s ≈ 4.1 từ/s, bằng pace trung bình; s7 3.85 và s5 hiệu dụng ~3.4 còn chậm hơn).
Đây là ghi nhận đạo diễn voice cho bản final nếu re-render, không trừ vào chữ.

### 3. Kết + lặng — 1.5/1.5

Trọn điểm. Câu chốt giữ suy ngẫm ngôi "mình" ("họ cũng vui rồi"), không khuyên răn,
không từ đao to. Callback kép kín: lời hứa s3 "Lát con gọi lại nha." → trạng thái phone
s8 "Đã gọi lại ✓" trên cùng chiếc phone portrait đầu video; cửa sổ đêm ấm + hold lặng
cuối + outro. Lặng 1.0–1.4s sau câu cuối + caption tắt sớm (spec §4/§9) cho câu chốt chỗ
thở — đúng yêu cầu highlight (c).

### 4. Trung thực vs research unknowns — 1.4/1.5

Quét lại 5 unknowns (research §3), không vi phạm nào thành fact: (1) mẹ ở đâu/sống với
ai — nội thất trung tính, không marker quê/phố, không nhân vật thứ ba, nhãn panel chỉ
`Con`/`Mẹ`, mâm 2 bát trung tính phía mẹ; (2) giới tính người kể — script chỉ dùng
"mình/con", visual không thêm marker ngoài tạo hình đã chốt (giọng nam là ràng buộc user);
(3) đường về hay đã về — s5 vẽ đường về theo đúng yêu cầu user ("gọi lại trên đường về"),
s7–s8 giữ phòng đêm trung tính, không khẳng định giờ giấc; (4) app gọi nào — phone generic
toàn bộ, không logo, pill "minh hoạ" ≥30px; (5) tần suất gọi — không backstory thêm.
Các cụ thể hóa v2 ("họp dở", "phòng tắt đèn", "chính ngón tay", "hai tiếng", "cơm nguội",
"mưa gõ", "nghĩ mãi") nằm trong khung sự thật + user cho phép sửa lời, không mâu thuẫn
facts #1–#8. Trừ 0.1 dự phòng tính định lượng của "hai tiếng" (xem §1/§6).

### 5. Nhất quán script ↔ design ↔ frames — 1.5/1.5

Khớp hoàn toàn, kiểm từng điểm: accent words spec §4 = cột Accent script cả 8 shots
(s1 "Mẹ gọi · gọi lại" … s8 "Một cuộc gọi lại thôi"); Be Vietnam Pro 600 + caption đáy
250px + safe-zone 210px + accent xanh lạnh→hổ phách (brief + spec §4 + cả 3 SVG);
s1 badge ống nghe + mũi tên (cấm tick) + "Chiều nay" (spec §5a + SVG s1);
s5 đủ 2 beat + phone đêm `#171310` không sub-rect xanh + caption v2 đúng chữ voice
(spec §5c/§7 + SVG s5 + `voice.json` s5); s8 `TwoRoomsCall` + phone "Đã gọi lại ✓" +
2 bát phía mẹ / 1 bát phía con + mưa không trăng (spec §5d/§7/§9 + SVG s8 + Hình s8);
WarmGlow 0.25→0.5→1.0→0.6→0.4+hold (spec §6/§9 + Delivery script). Tổng từ 160 và voice
40.80s khớp ước tính brief/script (39–41s); video ~47.3s nhích +1–2s so với dự kiến
45–46s do holds s1+15f/s8+30f — trong dung sai Reel, không phải lệch nhất quán.

### 6. Ghi nhận sản xuất (không tính lỗi content)

- **s5 CER 0.046:** nghe kỹ toàn bộ s5, trọng tâm "chưa kịp reo hai tiếng" (số + nhịp)
  và câu "Con ăn cơm chưa?" (ngắt sau nín 0.5s, ấm/chậm/rõ). Nếu sai chữ/nhịp → re-render
  riêng s5, không sửa chữ.
- s6 nếu có re-render: chỉ đạo đọc chậm/nhỏ nhẹ đúng ý đồ "ấm nhất, chậm nhất", không sửa chữ.

### TỔNG VÒNG 3: 9.6/10 — verdict: PASS (không cần fix content)

2.8 + 2.4 + 1.5 + 1.4 + 1.5 = **9.6**. Lời kể cụ thể, xoay đúng, kết earned + lặng;
3 highlight earned với delivery + visual đi kèm; trung thực unknowns; 3 tài liệu + 3 frames
+ voice khớp từng chữ (C-5 đã hết). **Cho qua; chỉ còn bước nghe kỹ s5 (CER) ở QA audio.**
