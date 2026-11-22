# Production Spec & Master Shot List (v2 Cinematic Upgrade)
**Tập 16:9:** *Tớ Sống Được Bao Lâu Ở Mỗi Đại Dương Tiền Sử?*
**Thời lượng audio gốc (Vbee Minh Quân, tốc độ 1,1):** `481.488s` (`08:01.49`), tổng thời lượng video `482.988s` (`1920×1080`, `24 fps`, `-14 LUFS`)
**Engine mục tiêu:** `thanhhai-2d-studio` (`make-2d-video` v0.5 + `mascot-explainer` + `three-kit.js` + `motion.js`)

---

## Phần A — Chẩn đoán v1 & 6 Trụ cột Nâng cấp Điện ảnh (v2)

### 1. Vì sao bản v1 chưa đạt tầm điện ảnh?
1. **Bố cục lặp & phẳng:** Hầu hết các cảnh giữ nguyên một khung hình tĩnh kiểu "Tí Hon đứng bên trái, quái vật bên phải, camera zoom nhẹ `1.06`" — thiếu góc máy cận mặt (`bigFaceTiHon`), góc OTS qua vai/vây tiền cảnh mờ, góc nhìn từ dưới đáy ngước lên xuyên mặt nước, và thiếu không gian 3D (`three-kit.js`).
2. **Thiếu chiều sâu trường ảnh (`blurLayer`) & ánh sáng thể tích:** Vật thể vẽ bằng mảng màu phẳng + viền đen đều; chưa có lớp tiền cảnh mờ (`depth 1.5–1.8`), chưa có độ mờ nền khi cận mặt (`blurLayer(12)` + `veil`), chưa có ánh sáng gợn sóng nước (`caustics`) chiếu lên lưng quái vật và nhân vật.
3. **Diễn xuất theo "từ khóa" còn thưa:** Tí Hon chưa dùng `act()` (lấy đà → vung tay theo cung → quá đà → dừng) hay `beatHold(8f)` trước câu chốt, chưa dùng `"timing": "twos"` ở cảnh hài hoặc `"mblur": 5` ở cú lao nhanh.
4. **Thiếu nhiều hành động đắt giá trong kịch bản gốc:** Ví dụ camera *chìm từ trên mặt nước xuống dưới* ở `#1`; Tí Hon *tuột ra như xà phòng* ở `#19`; *sách cũ 5–10 m → phồng tròn như bóng bay → báo "ĐĂNG MŨM MĨM"* ở `#23`; *vòng răng mọc mới phía sau rồi cuộn dần ra trước* ở `#29`; *đuôi thò qua kẽ răng* ở `#46`; *hoạt hoạ cá nhỏ quẫy trong bụng làm cá lớn đau bụng mắt X* ở `#49`; *lén nhón chân đo với răng* ở `#58`; *băng dán chéo nằm dang tay* ở `#63`.

### 2. Sáu trụ cột nâng cấp bắt buộc cho v2

| Trụ cột | Chuẩn kỹ thuật áp dụng trong `thanhhai-2d-studio` | Hiệu quả hình ảnh đạt được |
|---|---|---|
| **1. Chiều sâu 3 lớp (`blurLayer` DoF)** | Mọi cảnh thường có đủ: BG (`depth 0.15–0.5`, tia sáng + địa hình xa) → MID (`depth 1.0`, Tí Hon + quái vật) → **FG tiền cảnh mờ (`blurLayer(g, 9..14, ..., cam, 1.65)`)**: tảo biển đung đưa, mỏm đá, bọt khí lớn lướt qua ống kính, vây/đuôi mờ trong OTS. | Khung hình có chiều sâu như ống kính cine khẩu lớn, xóa cảm giác "dán sticker lên nền 2D". |
| **2. Ánh sáng & Shading 2.5D đa lớp** | Thay toàn bộ tô màu phẳng bằng **`linGrad`/`radGrad` theo hướng đèn chính**, thêm khe mang, gân vây bán trong suốt, ánh kim trên giáp xương, bóng răng phản quang, lớp gợn sáng mặt nước (`caustics` động theo `t`), `rim light` dày `4.5–5px` đúng hướng đèn. | Quái vật có khối lượng, độ lì/bóng vật liệu (giáp sắt vs da cá mập vs vỏ nón đá) và độ đe doạ thật sự. |
| **3. Đa dạng 12 cỡ cảnh & Camera sống** | Không lặp cùng kiểu bố cục quá 2 shot liên tiếp. Dùng đủ: `wide`, `medium`, `ots` (FG mờ vai Tí Hon / vây quái vật), `close` (`bigFaceTiHon`), `insert` (cận răng/mắt/nút mũ), `top`, `freeze`, **`3d` (`three-kit.js` 4 shot đinh)**, `data`, `blueprint`, `title`, `end`. Mọi shot đều có quỹ đạo camera (`push`, `pull-out`, `submerge`, `roll ±0.03`, `shake`). | Tạo nhịp xem lôi cuốn kiểu phim tài liệu hài, mỗi chuyển cảnh là một góc nhìn mới. |
| **4. Diễn xuất `motion.js` khớp `wordTime()`** | Mọi chuyển động đổi tư thế dùng `act()` (có `antic` + overshoot), `swingFrom()` cho vạt khăn quàng cam, `impact()` squash-stretch khi rơi/va chạm, `beatHold(t, at, 8)` trước punchline (`"Rắc!"`, `"Kẹp!"`, `"8 giây"`, `"CHÊ!"`), `timing: "twos"` + `boilPose` cho cảnh hài, `mblur: 5` cho cú lao/rơi nhanh. | Tí Hon diễn có hồn, đúng trọng âm thoại thay vì đứng rung tại chỗ. |
| **5. Ngữ pháp Chuyển cảnh & Hướng nhìn** | 75–80% `cut` cứng đúng nhịp câu; **`whip`** (0.28s) khi nhảy cổng sang đại dương mới; **`flash`** trắng khi đóng băng `#2` và cú ngoạm `#61`; **`zoom`** lặn vào X-quang/CT Scan/bản đồ; **`dip`** đen ở phân hồi & kết thúc thiên thạch. Giữ hướng nhìn nhất quán: Tí Hon bên trái nhìn phải (`facing: 1`) ↔ Quái vật bên phải nhìn trái (`facing: -1`), chỉ đảo ở góc POV/OTS. | Mạch phim mượt, người xem không bị rối hướng khi cắt nhanh. |
| **6. Đồ hoạ HUD & Phụ đề Dễ đọc 100%** | Giữ dải gradient tối mỏng ở 110px đáy màn hình (`rgba(2,6,23,0.52) -> transparent`) khi bật phụ đề để chữ trắng/vàng đọc nét trên mọi nền sáng (Studio, Cambri cát vàng, Bãi biển). Đồ hoạ minh hoạ giữ ở `y <= 905`. `dangerCard` dùng thanh tiến trình phát sáng + icon minh hoạ; thước so sánh dùng tỉ lệ pixel chính xác. | Chữ sạch, sang, không đè nhau, không chói trên nền sáng. |

---

## Phần B — Production Spec Chi tiết

### 1. Nhân vật chính: Mascot v0.7 — **Tí Hon** (`scenes/cast.js`)
- **Tạo hình khóa cứng:** Khủng long T-Rex xanh bỏ túi (`#4fb856` đỉnh sáng → `#2e7d34` bụng bóng, bụng kem `#f2eab0`, 3 gai lưng cam `#ff8c3a`), hai tay siêu ngắn (chỉ dài tới ngang ngực — gag lặp lại mỗi khi với nút hoặc nút Đăng ký), đuôi dài linh hoạt có khớp cong chữ S để đập trúng đỉnh đầu (`tailPress: 0..1`).
- **Phụ kiện bắt buộc v0.7:**
  1. **Khăn quàng cam** (`#f97316` / `#fb923c` viền sáng, nút thắt `#c2410c`) có 2 vạt sau cổ tính trễ vật lý theo `swingFrom(xAt, t)` + độ rung nước.
  2. **Mũ bảo hiểm vàng-đậm** (`#facc15` có mảng bóng cong, vành kính xám thép `#334155`, tem sọc cảnh báo) gắn **nút bấm đỏ `"VỀ NHÀ"`** phát hào quang nhẹ khi kích hoạt hoặc lúc nguy cấp.
- **Biến thể trạng thái theo kịch bản:**
  - `goggles + labcoat`: Cảnh `#4`–`#5` (kính bảo hộ kéo lên trán/mắt, áo blouse trắng).
  - `sunglasses`: Cảnh `#34`–`#35` (kính râm thư giãn trên phao, tụt xuống mũi ở `#35`).
  - `slime`: Cảnh `#40` (nhớp xanh rêu nhỏ giọt sau khi bị nhè ra).
  - `headlamp`: Cảnh `#45` (đèn pin trên mũ bật nón sáng quét trong bụng Pliosaur).
  - `glasses + pointer`: Cảnh `#50`, `#66` (kính cận gọng đen + que chỉ bảng).
  - `bandages`: Cảnh `#63`–`#72` (băng dán chéo đầu gối/đỉnh trán).
- **Cận mặt `bigFaceTiHon`:** Chiếm 55–70% chiều cao khung hình trên nền đại dương đã làm mờ `blurLayer(14)` + `veil(0.35)`, có nếp nhăn biểu cảm, mồ hôi rơi (`sweat`), tia mắt đảo `saccade()`, và 7 khẩu hình `visemeAt`.

### 2. Đạo cụ xuyên suốt & HUD (`scenes/props.js`)
- **3 Phao tiến cấp:**
  1. `duck`: Phao vịt vàng bóng nhựa (có highlight cong, mỏ cam, mắt đen lóng lánh) — mất ở `#19–#20`.
  2. `striped`: Phao tròn sọc đỏ trắng có dây thừng viền ngoài — xuất hiện ở Cold Open `#1–#2` và bị cắn nát tung tóe ở `#25`.
  3. `iron`: Phao sắt xám kim loại có đinh tán 3D nổi & vân xước hàn — bị cưa làm 2 nửa chìm dần ở `#31–#32`.
  4. `tiny`: Phao cứu sinh mini màu cam chật chội cho đại dương `#5–#8`.
- **Cổng thời gian (`drawTimePortal`):** Vòng xoáy năng lượng 2 tầng tím-xanh (`#8b5cf6` + `#38bdf8`) kèm tia sét tĩnh điện và luồng hạt hút lên trời.
- **Đồng hồ sinh tồn (góc trên trái `x=36, y=28`):** Nền đen `#0a0c12`, viền vàng `#facc15` (chuyển đỏ nhấp nháy ở `warning`), chữ số tabular cực rõ, icon đồng hồ bấm giờ nhỏ quay kim; riêng `#61` vỡ mặt kính trắng tóe tại `00:08`.
- **Bộ đếm phao (góc trên phải `x=E.W-36, y=74`):** `"PHAO ĐÃ MẤT: 0 → 1 → 2 → 3"`, nảy phóng to (`spring`) + viền chớp đỏ mỗi khi tăng số (ẩn ở Mở đầu `#1–#6` và Hiện tại `#63–#72`, hiện từ `#7` hoặc rõ từ `#20` — theo bảng gốc dùng từ đại dương 2 trở đi, riêng `#7–#19` có thể ẩn hoặc giữ đồng hồ để góc phải thoáng hơn; **quyết định v2: chỉ hiện `PHAO ĐÃ MẤT` từ đại dương 2 (`#14` hoặc bật pop-in ở `#20`)** đúng nguyên văn bảng đạo cụ!).

### 3. Bảng Thế giới, Ánh sáng & Tiền cảnh Mờ (10 Environments — `sets/oceans.js`)

| ID | Bối cảnh | Nguồn sáng chính & Caustics | Lớp Tiền cảnh mờ (`blurLayer` FG) |
|---|---|---|---|
| `studio` | Studio sáng (Cảnh `#3–#6`) | Đèn trần cyclorama trắng-xanh lạnh + bóng sàn mềm | Cạnh bàn thí nghiệm / chân giá đèn mờ góc dưới |
| `cambri` | #1 Cam bri (Cảnh `#7–#13`) | Xanh ngọc trong `#0ea5e9 → #2dd4bf`, đáy cát vàng, tia nắng thẳng | Hải quỳ mờ & bọt khí cận kính; cảnh lên bờ đá trơ trụi nắng gắt |
| `ordovici` | #2 Oóc đô vi (Cảnh `#14–#20`) | Xanh lam sâu `#0c2461 → #1e40af`, tia nắng chiếu xiên 30° | Rặng san hô cổ đại tím thẫm mờ + bụi phù du trôi chậm |
| `devon` | #3 Đê vôn (Cảnh `#1–#2, #21–#26`) | Xanh rêu tối `#0f2e22`, bùn nâu đục, ánh sáng yếu trên mặt nước | Đám rong tối & vẩn bùn trôi ngang sát ống kính |
| `permi` | #4 Pẹc mi (Cảnh `#27–#33b`) | Xám thép `#1f2937`, luồng sáng cam công nghiệp từ trên xuống | Mỏm đá bazan đen & bọt khí kim loại lấp lánh |
| `tamdiep` | #5 Tam Điệp (Cảnh `#34–#40`) | Xanh dương mênh mông trống trải `#0284c7 → #082f49` | Không gian trống rỗng đến rợn người; chỉ vài hạt sương biển xa |
| `jura` | #6 Jura (Cảnh `#41–#46`) | Xanh đậm gần đen `#020617 → #09142c`, đèn rim xanh lạnh | Đá ngầm sắc nhọn mờ góc dưới + vách đá Anh + cảnh trong miệng tối đen |
| `phantrang` | #7 Phấn Trắng (Cảnh `#47–#53`) | Xanh ngọc đục biển nông `#0d9488`, đáy đá vôi trắng | Cỏ biển đung đưa mờ tiền cảnh, tia nắng tán xạ nông |
| `maioxen` | #8 Mai ô xen (Cảnh `#54–#62`) | Xanh đen bão tố `#020617`, trời xám chớp nhẹ, sóng dữ | Bọt sóng trắng đánh ngang ống kính + vệt ánh đỏ nguy hiểm |
| `hientai` | Hiện tại & Kết (Cảnh `#63–#72`) | Bãi biển nắng vàng rực, nước trong vắt → cam hoàng hôn `#9a3412` | Vỏ sò / lá dừa mờ góc khung, vệt sao băng thiên thạch rạch trời |

### 4. Tích hợp 4 Shot 3D Low-poly (`three-kit.js` — `kind: '3d'`)
Để tạo điểm nhấn điện ảnh thực thụ (đúng chuẩn ~1 shot 3D mỗi ~1–2 phút trong `style-bible.md`):
1. **`s04c_3d` (`19.7s`):** Camera `dolly` bay dọc hành lang **8 cổng cột nước đại dương tiền sử** phát sáng đủ 8 màu trong studio không gian trước khi đồng hồ rơi xuống.
2. **`s29a_3d` (`183.3s`):** Camera `orbit` quanh **vòng răng xoắn ốc 3D của Helicoprion** quay chậm trong luồng sáng cam thép để thấy cấu trúc lưỡi cưa đĩa 3D rõ trước khi vào thẻ chỉ số.
3. **`s42a_3d` (`287.8s`):** Camera `dolly` lướt dọc **vách đá bờ biển Anh (Dorset)** có hố khai quật & ánh đèn rọi vào cái đầu lâu 2 m lộ ra khỏi vách đá.
4. **`s72a_3d` (`476.9s`):** Camera `orbit` thấp ngước từ mặt đất cam rực lên bầu trời đêm rực lửa nơi **khối thiên thạch rực sáng** xé toạc bầu trời phía sau Tí Hon trước khi cắt đen.

*(Lưu ý kỹ thuật: `three-kit.js` tự phủ lớp grading + bloom; ta viết thêm `overlay(g, t, info)` vẽ Mascot Tí Hon 2D hoặc HUD lên trên khung 3D để đồng bộ hoàn toàn.)*

---

## Phần C — Master Shot List v2 Đầy đủ (~155 Shot · Khớp 100% 73 Đoạn Audio)

Quy ước ký hiệu cột:
- **Size/Cam:** `wide|medium|ots|close|insert|top|freeze|3d|data|blueprint|title|end` + quỹ đạo camera (`push`, `pull`, `pan`, `submerge`, `roll`, `shake`).
- **3 Lớp (FG / MID / BG):** Tiền cảnh mờ (`blurLayer`) / Chủ thể trung cảnh / Hậu cảnh + Ánh sáng.
- **Nhãn kỹ thuật:** `[twos]` = vẽ 2 khung/nhịp hài; `[mblur:5]` = nhòe chuyển động nhanh; `[beatHold@Xs]` = khựng 8 khung trước từ khóa; `[in:...]` = kiểu chuyển cảnh.

### Hồi 0: Mở đầu — Cold Open & Luật chơi (`0.00s – 38.00s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s01a` | #1 | `0.00–2.45` | `wide` · `push` + sóng lắc nhẹ `r: ±0.015` | **FG:** Gợn sóng mờ sát mép dưới. **MID:** Tí Hon bé xíu ngồi phao sọc đỏ trắng giữa biển. **BG:** Mặt biển Đê vôn xanh rêu rộng, trời âm u. | Nhịp `t=0`: mở thẳng không logo; Tí Hon ngó quanh lo lắng (`saccade`), vạt khăn cam bay. | Góc trên phải: `"360 TRIỆU NĂM TRƯỚC"` | `[cut]` · `bubbles.wav` |
| `s01b` | #1 | `2.45–4.85` | `medium` · `submerge` (`y: -260 -> +260` xuyên mặt nước!) | **FG:** Dải bọt khí & đường mặt nước cắt ngang lúc camera chìm xuống. **MID:** 2 chân Tí Hon đạp nước dưới đáy phao. **BG:** Đáy bùn nâu mờ xa. | Camera chìm từ trên mặt nước xuống dưới mặt nước đúng chữ `"Chỉ có một cái phao bơi"`. | Giữ `"360 TRIỆU NĂM TRƯỚC"` | `[cut]` · `splash.wav` |
| `s01c` | #1 | `4.85–7.18` | `ots` · `push` nhanh + rung nhẹ | **FG:** Chân Tí Hon mờ bên trái trên. **MID:** Bóng đầu giáp *Dunkleosteus* khổng lồ lướt ngang từ trái qua rồi quay ngoắt đầu về phía chân Tí Hon. **BG:** Ánh sáng rêu đục. | Đúng chữ `"ngửi thấy mùi"`: bóng đầu giáp ngoặt 180° quay lại, mắt vàng lóe sáng. | Không chữ thêm để giữ căng thẳng | `[cut]` · `impact` |
| `s02a` | #2 | `7.18–8.45` | `close` · `bigFaceTiHon` + `roll` hoảng loạn | **FG:** Bọt nước văng mờ. **MID:** Cận mặt Tí Hon mắt trợn to, 2 tay ngắn với lên đỉnh mũ mà hụt hẳn, xoay trên phao. **BG:** Hàm *Dunkleosteus* lao lên từ dưới tối (`blurLayer`). | `act()` giơ tay với lên hụt 2 lần theo nhịp `"Cứu!"`; khăn cam quất mạnh. | Chữ đỏ rung: `"CỨU!!!"` | `[cut]` · `mblur: 5` |
| `s02b` | #2 | `8.45–9.60` | `freeze` · `push` cực chậm 3% | **FG:** Hạt nước đóng băng (`FX.drops`) lấp lánh. **MID:** Hàm cá giáp há hết cỡ ngay sát chân Tí Hon. **BG:** Nền xanh lạnh khử bão hòa + viền `scope`. | **ĐÓNG BĂNG THỜI GIAN** ngay trước cú cắn; vòng sáng tỏa quanh nút `"VỀ NHÀ"`. | `"CỨU!!!"` đóng băng + dấu `!` | `[flash]` · `freeze` + `rewind.wav` |
| `s03a` | #3 | `9.60–12.90` | `medium` · `whip` tua ngược vào Studio sáng | **FG:** Cạnh bàn studio mờ góc dưới. **MID:** Vệt tua băng VHS lướt qua, Tí Hon vẫy tay tạo dáng tự hào giữa luồng đèn studio. **BG:** Cyclorama sáng sạch, lưới mờ. | Tua xong: Tí Hon đáp xuống (`impact` squash), cười toe vẫy tay `"Xin chào, tớ là Tí Hon"`. | Trên cùng: `"KHỦNG LONG TÍ HON"` | `[whip]` · `[twos]` · `ding` |
| `s03b` | #3 | `12.90–15.78` | `data` · `pull` nhẹ `1.1 -> 1.0` | **FG:** Thanh thước vạch mờ góc trái. **MID:** Bóng người lớn 1,7 m xám đứng thẳng, Tí Hon bé tí đứng bên phải cao đúng tới mắt cá chân. **BG:** Sàn studio sáng. | Tí Hon ưỡn ngực tự hào (`proud`), đường gióng đỏ từ mắt cá chân bật ra (`ease.outBack`). | `"NGƯỜI LỚN 1,7 m"` · `"CAO TỚI MẮT CÁ CHÂN!"` | `[cut]` · `pop` |
| `s04a` | #4 | `15.78–18.38` | `close` · `bigFaceTiHon` + `push` | **FG:** Gọng kính bảo hộ mờ rìa. **MID:** Tí Hon mặc áo blouse trắng, kéo kính bảo hộ xuống mắt tự tin (`determined`). **BG:** Studio làm mờ + glow xanh. | Đúng chữ `"nhảy xuống"`: kính bảo hộ sập xuống mắt *cạch*. | Tiêu đề lớn: `"TỚ SỐNG ĐƯỢC BAO LÂU?"` | `[cut]` · `blip` |
| `s04b` | #4 | `18.38–19.85` | `data` · `pan` ngang phải → trái | **FG:** Không (UI rõ nét). **MID:** Dải 8 ô đại dương 8 màu sắc riêng trượt ngang vào giữa, mỗi ô hiện dấu `?`. **BG:** Studio tối nhẹ làm nổi 8 ô màu. | Tí Hon nhỏ bên góc trái chỉ que vào dải 8 ô từ `#1` tới `#8`. | `"#1 ?"` → `"#8 ?"` + `"CỔ NHẤT → GẦN NHẤT"` | `[cut]` · `counter` |
| `s04c` | #4 | `19.85–22.33` | `3d` (`three-kit`) · `dolly` bay qua 8 cổng nước + overlay 2D | **3D:** 8 khung cổng đại dương phát sáng nối tiếp nhau, đồng hồ sinh tồn vàng-đen rơi từ trên cao xuống chính giữa khung (`impact`). **2D Overlay:** Đồng hồ nảy số `00:00` + tiếng tích. | Đồng hồ chạm giữa màn hình đúng chữ `"bắt đầu chạy"`, kim nhảy 1 nhịp. | `"ĐỒNG HỒ SINH TỒN: 00:00"` | `[zoom]` · `clock` + `hit` |
| `s05a` | #5 | `22.33–26.00` | `medium` · `pan` theo 3 món đạo cụ | **FG:** Ánh sáng studio. **MID:** 3 cột lần lượt nảy ra theo lời: (1) Phao vịt vàng nảy *boing*, (2) Cỗ máy thời gian xoáy ù, (3) Cận mũ bảo hiểm + nút đỏ `"VỀ NHÀ"`. | Tí Hon chỉ lần lượt từng món bên cạnh bằng que chỉ. | 3 nhãn bật ra: `"PHAO"` · `"MÁY THỜI GIAN"` · `"NÚT VỀ NHÀ"` | `[cut]` · `boing.wav` + `hum` + `blip` |
| `s05b` | #5 | `26.00–28.78` | `insert` · `push` cận lưng/đỉnh đầu Tí Hon | **FG:** Mép khung studio mờ. **MID:** Tí Hon với tay ngắn hụt 2 lần rồi quay ngoắt lưng, vung đuôi chữ S đập *bíp* vào nút đỏ trên mũ. **BG:** Studio sáng. | `beatHold@27.5s` (8 khung ngay trước cú đập đuôi!) → lóe tia sáng trên nút đỏ. | Vòng truyện tranh `"BÍP!"` | `[cut]` · `[twos]` · `blip` |
| `s06a` | #6 | `28.78–32.52` | `data` · `cut` đối xứng 2 nửa màn hình | **Trái:** Chồng tài liệu nghiên cứu đóng dấu xanh **`THẬT ✓`** *bịch*. **Phải:** Đồng hồ bấm giờ đóng dấu vàng **`TỚ TỰ BẤM`**. **BG:** Nền blueprint navy sạch. | Hai con dấu đập xuống đúng nhịp từng câu nói (`ease.outBack`). | `"SỐ LIỆU: THẬT"` · `"GIỜ SỐNG SÓT: CHO VUI"` | `[cut]` · `hit` ×2 |
| `s06b` | #6 | `32.52–38.00` | `close` · `push` + rung đồng hồ | **FG:** Hạt ánh sáng đỏ mờ. **MID:** Dải 8 ô tối lại, chỉ **ô #8 nhấp nháy đỏ rực**; giữa khung là đồng hồ dừng ở **`00:08`** rung bần bật. Tí Hon góc trái nháy mắt đầy ẩn ý (`smirk`). | Đúng câu cuối `"Thử đoán xem..."`, Tí Hon chỉ tay về phía ô #8 đỏ. | `"CHƯA TỚI 10 GIÂY?!"` | `[cut]` · `heartbeat` |

---

### Hồi 1: Đại dương #1 — Kỷ Cam bri (`38.00s – 87.27s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s07a` | #7 | `38.00–41.80` | `title` · `whip` vào vùng nước xanh ngọc | **FG:** Bọt khí trôi lên mờ. **MID:** Thẻ vòng **`#1 KỶ CAMBRI`** đập vào luồng sáng xanh ngọc. **BG:** Đáy cát vàng & tia nắng thẳng. | Cổng thời gian mở ở đỉnh trên màn hình, chuẩn bị hút/thả Tí Hon. | `"#1 · CAMBRI · 508 TRIỆU NĂM"` | `[whip]` · `whoosh` |
| `s07b` | #7 | `41.80–43.55` | `wide` · `pan` dọc theo cú rơi + `shake` nhẹ | **FG:** Mép mặt nước gợn sáng. **MID:** Tí Hon rơi từ cổng thời gian xuống *tõm* vào phao vịt vàng trên mặt nước ấm. **BG:** Nước xanh ngọc trong vắt. | Rơi có giãn dọc (`squash: -0.25`) → chạm phao nảy bẹp (`impact(0.28)`), bắn giọt nước (`FX.drops`). Đồng hồ góc trái bật chạy! | HUD: `ĐỒNG HỒ` chạy + `#1 CAMBRI` | `[cut]` · `[mblur:5]` · `splash.wav` |
| `s07c` | #7 | `43.55–46.56` | `medium` · `pan` quét ngang bờ đất trơ trụi | **FG:** Tảng đá xám mờ góc dưới phải. **MID:** Cắt lên bờ: đất đá nâu trống trơn không một bóng cây, Tí Hon đứng ngó trái phải tìm cây trèo rồi nhún vai. | Nhún vai (`shrug`) đúng chữ `"chưa có cả cái cây nào"`. | Nhãn nhẹ: `"TRÊN CẠN: TRỐNG TRƠN"` | `[cut]` · `[twos]` |
| `s08` | #8 | `46.56–52.14` | `ots` · `push` từ sau lưng Tí Hon | **FG:** Vai & khăn cam Tí Hon mờ bên trái (`blurLayer`). **MID:** Dưới nước, sinh vật nhỏ bơi lại gần rồi phóng to, 2 mắt lồi trên cuống quay phắt nhìn thẳng vào Tí Hon. **BG:** Cát vàng + tia nắng. | Cận 2 mắt trên cuống xoay tròn tập trung đúng chữ `"mắt lồi trên hai cái cuống"`. | Không chữ để tôn ánh mắt | `[cut]` · `bubbles.wav` |
| `s09a` | #9 | `52.14–54.50` | `data` · `medium` cân bằng | **FG:** Hải quỳ mờ góc dưới. **MID:** *Anomalocaris* lơ lửng trung cảnh trái (`facing: 1`), thân đốt uốn lượn + thẻ `dangerCard` bật vào bên phải. | Tí Hon ở góc dưới trái chỉ tay giới thiệu. | Thẻ: `"ANOMALOCARIS · Càng: 18 cm · Thợ săn đầu chuỗi"` | `[cut]` · `blip` |
| `s09b` | #9 | `54.50–57.60` | `insert` · `push` cực cận vào phần đầu & 2 càng gai | **FG:** Hạt bụi nước lấp lánh. **MID:** Cận 2 chiếc càng gai co duỗi tóm mồi; thước đo vàng bật ra dọc theo càng ghi **`18 cm`**. | Càng gập mở đúng nhịp giới thiệu `"hai cái càng gai trước miệng"`. | Thước đo: `"18 cm"` | `[zoom]` · `swish` |
| `s09c` | #9 | `57.60–61.83` | `medium` · `pull` lùi nhẹ | **FG:** Tảo mềm mờ rìa phải. **MID:** *Anomalocaris* lao thử một cú ngắn tóm bóng cá mờ; Tí Hon giật mình ôm mũ. | Tí Hon biểu cảm `worried`, nấp sau vành phao vịt. | Giữ thẻ `ANOMALOCARIS` rút gọn | `[cut]` |
| `s10a` | #10 | `61.83–66.58` | `blueprint` · `pan` theo cánh tay | **FG:** Không (bản vẽ so sánh sắc nét). **MID:** Bóng người lớn giơ cánh tay ngang; *Anomalocaris* đặt dọc cẳng tay → ngắn hơn cánh tay! Tí Hon thở phào nhẹ nhõm. | Thanh thước đo `"≈ 38 cm (không tính càng & đuôi)"` kéo ngang thân tôm. | `"≈ 38 cm"` · `"< CÁNH TAY NGƯỜI LỚN"` | `[cut]` · `pop` |
| `s10b` | #10 | `66.58–69.80` | `close` · `push` + gag đối chiếu | **FG:** Cát vàng đáy mờ. **MID:** Tí Hon đứng tự tin cạnh con tôm… rồi mặt xụ xuống khi nhận ra đỉnh đầu mình vẫn thấp hơn nó! | `beatHold@68.4s` ngay chữ `"Nhưng mà…"` rồi mặt chuyển `happy -> sad`. | `"VẪN DÀI HƠN TỚ..."` | `[cut]` · `[twos]` · `boing.wav` |
| `s11` | #11 | `69.80–74.52` | `ots` · `medium` nhìn qua đầu Tí Hon | **FG:** Mũ vàng Tí Hon mờ góc trái dưới. **MID:** Trên đầu *Anomalocaris* hiện bong bóng suy nghĩ với **con sâu mềm hồng (♥ xanh)** và **vỏ ốc xoắn cứng (✕ đỏ)**. | Con sâu nhúc nhích đáng yêu, vỏ ốc rung lắc bị gạch chéo đỏ. | `"THÍCH ĐỒ MỀM ♥"` · `"ĐỒ CỨNG ✕"` | `[cut]` · `blip` |
| `s12a` | #12 | `74.52–77.42` | `close` · `shake` 2 nhịp | **FG:** Bọt nước tung tóe. **MID:** Hai càng *Anomalocaris* kẹp vào đầu/mũ Tí Hon đúng 2 nhịp `"Kẹp… kẹp…"` rồi nhăn mặt nhả ra! | `impact` nén xuống 2 lần theo tiếng kẹp, bùm truyện tranh `"KẸP!" ×2`. | Bùm: `"KẸP!"` → `"KẸP!"` | `[cut]` · `[twos]` · `hit` ×2 |
| `s12b` | #12 | `77.42–81.05` | `medium` · `pull` | **FG:** Rong biển mờ góc trái. **MID:** Con tôm lắc đầu bơi bỏ đi (`"CHÊ!"`); Tí Hon đứng gõ tay vào đầu/mũ mình *cốc cốc* cười tự hào hết cỡ. | Gõ đầu 2 nhịp đúng chữ `"nhiều xương"`, mặt `proud`/`joy`. | Bùm: `"CHÊ!"` · `"CỐC CỐC"` | `[cut]` · `[twos]` · `ding` |
| `s13a` | #13 | `81.05–84.10` | `medium` · `push` | **FG:** Tia sáng lấp lánh. **MID:** Tí Hon đứng trên phao vịt giơ 2 tay ngắn ăn mừng; đồng hồ góc trái quay số loạn xạ rồi bật sáng dấu **`∞`**. | Đồng hồ phóng to chớp vàng, con dấu kết quả đập xuống. | Dấu: `"#1 · ∞ VÔ HẠN"` | `[cut]` · `ding` |
| `s13b` | #13 | `84.10–87.27` | `wide` · `pan` lên cổng | **FG:** Mặt nước gợn dưới chân. **MID:** Tí Hon vung đuôi đập nút đỏ trên mũ, tia sáng cổng thời gian phía trên hút cậu bay vút lên trời. | `squash: -0.25` kéo dài người lúc bị hút vút lên cổng (`mblur`). | Giữ dấu `#1 · ∞` | `[cut]` · `[mblur:5]` · `shimmer` |

---

### Hồi 2: Đại dương #2 — Kỷ Oóc đô vi (`87.27s – 131.87s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s14a` | #14 | `87.27–91.15` | `title` · `whip` | **FG:** Hạt sáng mờ. **MID:** Thẻ `#2 KỶ ORDOVICI` hiện giữa biển xanh lam sâu, tia nắng xiên góc 30°. | Nhịp mở màn bí ẩn, `PHAO ĐÃ MẤT: 0` chính thức xuất hiện ở góc trên phải. | `"#2 · ORDOVICI · 470 TRIỆU NĂM"` | `[whip]` · `whoosh` |
| `s14b` | #14 | `91.15–95.08` | `wide` · `pan` trượt từ trái qua phải theo vật dài | **FG:** Rặng san hô tím mờ góc dưới. **MID:** Thấy một cây cột điện xám thẳng tắp trôi ngang — camera lia tới đầu bên phải thì lộ ra bó xúc tu tím ngoe nguẩy! Tí Hon dụi mắt. | Tí Hon dụi mắt kinh ngạc (`confused` → `shocked`) khi lộ xúc tu. | Không chữ | `[cut]` · `bubbles.wav` |
| `s15a` | #15 | `95.08–98.10` | `data` · `medium` | **FG:** Bọt khí mờ. **MID:** *Endoceras* chếch bên trái; thẻ `dangerCard` bật bên phải + đường nối họ hàng với icon mực & bạch tuộc nhỏ. | Xúc tu uốn lượn nhẹ theo dòng nước. | Thẻ: `"ENDOCERAS · Họ hàng mực · Vỏ nón thẳng"` | `[cut]` · `blip` |
| `s15b` | #15 | `98.10–101.11` | `insert` · `push` cận vỏ nón | **FG:** Hạt phù du mờ. **MID:** Viền cây vỏ nón thẳng phát sáng vàng rực như mũi giáo. | Sáng viền chạy dọc từ đầu nhọn tới miệng vỏ. | Nhãn: `"VỎ NÓN THẲNG NHƯ GIÁO"` | `[cut]` |
| `s16a` | #16 | `101.11–104.60` | `blueprint` · `zoom` vào tủ bảo tàng | **FG:** Khung kính bảo tàng phản quang nhẹ. **MID:** Hóa thạch vỏ vỡ 3 m nằm trên bệ bảo tàng, thước đo kéo dài ghi **`3 m`**. | Thước vàng kẻ ngang phần hóa thạch còn lại. | `"HÓA THẠCH CÒN LẠI: 3 m"` | `[zoom]` · `counter` |
| `s16b` | #16 | `104.60–108.14` | `data` · `pull` dần sang phải | **FG:** Lưới blueprint mờ. **MID:** Phần chóp vỏ bị thiếu tự vẽ thêm bằng nét đứt phát sáng; thước đo kéo dài từ 3 m lên **`5,7 m`**. | Nét đứt mọc ra từng đoạn theo nhịp thoại `"ước tính... năm phẩy bảy mét"`. | `"3 m → ƯỚC TÍNH ≈ 5,7 m (2015)"` | `[cut]` |
| `s16c` | #16 | `108.14–111.72` | `close` · `push` | **FG:** Ánh vàng tỏa. **MID:** Huy chương vàng **`DÀI NHẤT`** đóng thẳng lên phần vỏ 5,7 m, lấp lánh hào quang. | Huy chương xoay nảy (`ease.outBack`). | Huy chương: `"HỌ MỰC DÀI NHẤT"` | `[cut]` · `ding` |
| `s17a` | #17 | `111.72–115.10` | `blueprint` · `wide` | **FG:** Không. **MID:** Chiếc ô tô 7 chỗ màu xanh đặt ngay dưới *Endoceras* 5,7 m — thân vỏ nón dài thò hẳn ra ngoài đầu xe. | Đường gióng đỏ chỉ phần dài vượt trội hơn ô tô 7 chỗ. | `"> Ô TÔ 7 CHỖ (~4,7 m)"` | `[cut]` · `pop` |
| `s17b` | #17 | `115.10–117.56` | `ots` · `push` qua đầu xúc tu | **FG:** Các đầu xúc tu mờ sát góc phải ống kính. **MID:** Đối diện, Tí Hon run rẩy nhìn bó xúc tu đang vẫy chào mình thân thiện một cách rùng rợn. | Xúc tu vẫy qua lại nhịp nhàng. | Không chữ | `[cut]` |
| `s18` | #18 | `117.56–122.20` | `close` · `shake` + `roll` | **FG:** 2 sợi xúc tu tím quấn ngang mép khung. **MID:** Xúc tu quấn chặt quanh thân Tí Hon (chừa tay ngắn); Tí Hon lắc đầu 3 lần đúng 3 chữ `"Không, không, không!"`. | Mặt tái mét (`scared`), biểu cảm giãy nảy. | Chữ đỏ rung: `"ĐỪNG ÔM TỚ!"` | `[cut]` · `[twos]` |
| `s19` | #19 | `122.20–127.12` | `wide` · `pan` trái | **FG:** Bọt khí tung mù. **MID:** Tí Hon tuột vọt ra khỏi vòng xúc tu như cục xà phòng, bơi chó hì hục sang trái; phía phải *Endoceras* ôm chặt **cái phao vịt vàng** kéo tuột vào bóng tối! | Đúng chữ `"phao vịt"`: phao vịt phát tiếng *quác* thảm thiết khi bị lôi đi. | Không chữ | `[cut]` · `[mblur:5]` · `quack.wav` |
| `s20a` | #20 | `127.12–129.60` | `data` · `medium` | **FG:** San hô mờ góc dưới. **MID:** Đồng hồ góc trên trái dừng `12:00`; **`PHAO ĐÃ MẤT: 0 → 1`** nảy to ở góc phải trên; biển báo gỗ `#2 · 12 PHÚT` cắm bên trái. | Số `1` phóng to bật sáng đỏ-vàng (`spring`). | `"#2 · 12 PHÚT"` · `"PHAO ĐÃ MẤT: 1"` | `[cut]` · `pop` |
| `s20b` | #20 | `129.60–131.87` | `medium` · `pull` | **FG:** Bọt nước mờ. **MID:** Xa phía bên phải, phao vịt vàng chìm dần vào vùng tối vẫn giơ cánh vẫy chào Tí Hon; Tí Hon thở dài quay đuôi bấm nút hút lên cổng. | Gag vĩnh biệt phao vịt cực hài. | Giữ `"PHAO ĐÃ MẤT: 1"` | `[cut]` · `shimmer` |

---

### Hồi 3: Đại dương #3 — Kỷ Đê vôn (`131.87s – 171.95s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s21a` | #21 | `131.87–135.75` | `title` · `whip` | **FG:** Rong rêu tối mờ. **MID:** Thẻ `#3 KỶ DEVON` trên nền xanh rêu bùn nâu quen thuộc. | Nhạc căng thẳng của mở đầu quay lại. | `"#3 · DEVON · 360 TRIỆU NĂM"` | `[whip]` · `stinger` |
| `s21b` | #21 | `135.75–139.92` | `wide` · `submerge` (khớp khung cảnh `#1`!) | **FG:** Mặt nước rêu cắt ngang. **MID:** Lặp lại đúng khung cảnh mở đầu — Tí Hon ngồi trên **phao tròn sọc đỏ trắng**; dưới nước *Dunkleosteus* lộ nguyên thân đầy uy lực. | Người xem nhận ra ngay vòng lặp từ Cold Open! | Nhãn nhỏ: `"CHỖ ĐẦU VIDEO ĐÂY RỒI!"` | `[cut]` |
| `s22a` | #22 | `139.92–143.10` | `data` · `push` | **FG:** Bùn lơ lửng mờ. **MID:** *Dunkleosteus* với giáp đầu kim loại sáng bóng lướt vệt sáng specular qua má giáp; thẻ `dangerCard` hiện bên phải. | Mắt cá giáp nheo lạnh lùng. | Thẻ: `"DUNKLEOSTEUS · Đầu giáp · Lưỡi xương dao"` | `[cut]` · `blip` |
| `s22b` | #22 | `143.10–146.28` | `insert` · `push` cận hàm mở | **FG:** Vệt ánh sáng lướt. **MID:** Cận hàm mở chậm: so sánh đôi nhỏ **`Răng cá thường ✕`** vs **`Lưỡi xương sắc như dao ✓`**, tia sáng lóe dọc mép xương. | Hàm khép thử 1 nhịp sắc lẹm. | `"RĂNG THƯỜNG ✕ · LƯỠI XƯƠNG DAO ✓"` | `[zoom]` · `swish` |
| `s23a` | #23 | `146.28–150.10` | `blueprint` · `medium` | **FG:** Không. **MID:** Cuốn sách cổ mở trang ghi **`5 – 10 m`**, hình cá dài thượt hung tợn. | Trang sách lật ra dứt khoát. | `"SÁCH CŨ: 5 – 10 m"` | `[cut]` |
| `s23b` | #23 | `150.10–154.50` | `medium` · `push` | **FG:** Hạt sáng mờ. **MID:** Con dấu **`2023: ≈ 4 m`** đập xuống cuốn sách — thân con cá co ngắn lại rồi phồng tròn mũm mĩm như quả bóng! | Biến hình từ thon dài sang tròn mũm mĩm theo `ease.outElastic`. | `"NGHIÊN CỨU 2023: ≈ 4 m"` | `[cut]` · `[twos]` · `boing.wav` |
| `s23c` | #23 | `154.50–158.43` | `data` · `pan` xoay tờ báo | **FG:** Không. **MID:** Tờ báo quay vù vào giữa khung với tít lớn **`ĐĂNG MŨM MĨM`** và ảnh con cá phúng phính mắt ngơ. | Tờ báo quay 360° rồi khóa chặt ở trung tâm. | Tít báo: `"TIN NÓNG: ĐĂNG MŨM MĨM"` | `[cut]` · `pop` |
| `s24` | #24 | `158.43–162.90` | `ots` · POV TỪ TRONG MIỆNG CÁ NHÌN RA! | **FG:** Viền lưỡi xương hàm trên và hàm dưới đóng khung 4 góc màn hình (mờ tối)! **MID:** Tí Hon ngồi trên phao sọc nhìn sững sờ ngay chính giữa khung. | Góc máy POV cực mạnh: hàm khép nhẹ dần vào mép khung. | Không chữ — tập trung căng thẳng | `[cut]` · `heartbeat` |
| `s25` | #25 | `162.90–166.09` | `close` · `shake` mạnh + `flash` va chạm | **FG:** Mảnh phao sọc đỏ trắng bay văng thẳng về phía ống kính (`mblur`)! **MID:** Hàm đóng sập ngay trước mặt → Tí Hon ôm mảnh vụn phao, mặt khóc mếu. | `beatHold@163.1s` rồi **RẮC!** bùng nổ mảnh vụn. | Bùm truyện tranh: `"RẮC!"` | `[flash]` · `[mblur:5]` · `crunch.wav` |
| `s26a` | #26 | `166.09–168.40` | `data` · `medium` | **FG:** Rong rêu mờ. **MID:** Đồng hồ `04:00`; **`PHAO ĐÃ MẤT: 2`** nảy ở góc phải; biển `#3 · 4 PHÚT`. | Tí Hon cầm bút lông đỏ chuẩn bị sửa tờ báo. | `"#3 · 4 PHÚT"` · `"PHAO ĐÃ MẤT: 2"` | `[cut]` · `pop` |
| `s26b` | #26 | `168.40–171.95` | `medium` · `push` | **FG:** Mép tờ báo. **MID:** Tí Hon gạch phăng chữ **`MŨM MĨM`** trên tờ báo, viết đè chữ đỏ **`NGUY HIỂM`**, rồi quay đuôi bấm nút lên cổng. | Gạch bút dứt khoát theo tiếng sột soạt (`chalk.wav`). | `"ĐĂNG MŨM MĨM"` → `"ĐĂNG NGUY HIỂM!"` | `[cut]` · `[twos]` · `chalk.wav` |

---

### Hồi 4: Đại dương #4 — Kỷ Pẹc mi (`171.95s – 227.50s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s27a` | #27 | `171.95–176.00` | `title` · `whip` | **FG:** Ánh cam công nghiệp. **MID:** Thẻ `#4 KỶ PERMI` trên nền xám thép tương phản cam rực. | Không khí nặng nề kim loại. | `"#4 · PERMI · 270 TRIỆU NĂM"` | `[whip]` · `whoosh` |
| `s27b` | #27 | `176.00–179.89` | `medium` · `shake` khi rơi | **FG:** Bọt nước & ánh cam. **MID:** **Phao sắt xám có đinh tán** rơi *keng* xuống trước; Tí Hon đáp lên gõ *coong coong*, khoanh tay vênh mặt (`smirk`). | Tí Hon gõ vào vành thép phao sắt tự đắc `"Cắn đi, cắn được thì cắn!"`. | `"PHAO SẮT! CẮN ĐI!"` | `[cut]` · `clang.wav` |
| `s28` | #28 | `179.89–183.30` | `close` · `bigFaceTiHon` + `push` từ xa | **FG:** Vệt bọt xoáy mờ bay tới. **MID:** Chia nhịp: vòng răng cưa quay vù vù xé nước tiến lại → cắt cận mặt Tí Hon từ vênh sang tái xanh hoảng loạn! | Đồng tử co nhỏ (`shocked`), mồ hôi vã ra khi tiếng cưa rít gần. | Không chữ | `[cut]` · `chainsaw.wav` |
| `s29a` | #29 | `183.30–187.46` | `3d` (`three-kit`) · `orbit` vòng răng 3D + `dangerCard` | **3D:** Mô hình *Helicoprion* & **vòng răng cưa xoắn ốc 3D** quay chậm giữa biển xám-cam công nghiệp. **2D Overlay:** Thẻ chỉ số *Helicoprion* & cây họ hàng cá mập ma. | Thẻ `dangerCard` trượt vào mượt bên phải. | Thẻ: `"HELICOPRION · 5–8 m · Vòng răng hàm dưới"` | `[zoom]` · `blip` |
| `s29b` | #29 | `187.46–191.68` | `blueprint` · `wide` | **FG:** Không. **MID:** Thước so sánh **Xe buýt (~10 m)** vàng đặt song song *Helicoprion* 5–8 m. | Đường gióng kích thước chạy ngang. | `"5 – 8 m (≈ XE BUÝT)"` | `[cut]` |
| `s29c` | #29 | `191.68–196.84` | `insert` · `push` cực cận vòng răng | **FG:** Ánh thép mờ. **MID:** Hoạt hoạ răng mới nhú ở tâm trong rồi cuộn dần ra rìa ngoài theo đường xoắn ốc, chèn bóng mờ vỏ ốc & lưỡi cưa đĩa chồng lên so sánh! | Hoạt hoạ cơ chế mọc răng cuộn cực trực quan. | `"VỎ ỐC + LƯỠI CƯA ĐĨA"` | `[zoom]` |
| `s30a` | #30 | `196.84–201.40` | `blueprint` · `medium` | **FG:** Lưới đo cổ sinh học. **MID:** Hình *Helicoprion* xám trống hàm dưới, dấu `?` lớn nhảy trên thân — `"Hơn 100 năm tranh cãi"`. | Các mũi tên `?` chỉ lung tung quanh thân cá. | `"TRANH CÃI > 100 NĂM: VỊ TRÍ Ở ĐÂU?"` | `[cut]` |
| `s30b` | #30 | `201.40–204.82` | `close` · `pan` nhanh lưng → đuôi | **FG:** Viền bảng xanh. **MID:** Dán thử vòng răng lên **lưng** (như vây lưng `?`), rồi dán xuống **chóp đuôi** (`?`) trông cực kỳ buồn cười. | Chuyển vị trí từng nhịp theo đúng lời `"nằm trên lưng... ở đuôi"`. | `"LƯNG?"` → `"ĐUÔI?"` | `[cut]` · `[twos]` · `pop` |
| `s30c` | #30 | `204.82–208.44` | `data` · `pan` tia CT Scan xanh | **FG:** Khung máy CT mờ rìa. **MID:** Tia quét CT xanh dương lướt dọc qua đầu cá — vòng răng sáng lên và khớp *cạch* đúng vào **hàm dưới (`✓`)**! | Tia laser xanh quét mượt, hàm dưới phát sáng xanh lá ✓. | `"CT SCAN 2013: HÀM DƯỚI ✓"` | `[cut]` · `blip` |
| `s31` | #31 | `208.44–212.94` | `top` · `push` từ góc trên cao + `shake` | **FG:** Tia lửa vàng cam bắn tung lên phía ống kính! **MID:** Vòng răng cưa hạ thẳng xuống đúng giữa vành **phao sắt**, cưa rít tóe lửa; Tí Hon ôm đầu rụt cổ. | Khung hình rung nhẹ theo nhịp cưa kim loại. | Không chữ | `[cut]` · `chainsaw.wav` |
| `s32` | #32 | `212.94–216.62` | `wide` · `pull` | **FG:** Bọt kim loại chìm. **MID:** Phao sắt tách đôi trôi dạt 2 phía, Tí Hon dạng chân chơi vơi trên 2 nửa phao; góc trên chèn nhanh cảnh `#27` `"Cắn đi"` đóng dấu `✕` đỏ! | Biểu cảm `cry` hối hận tột độ. | `"XIN RÚT LẠI!"` + ảnh nhỏ `#27 ✕` | `[flash]` · `crunch.wav` + `splash.wav` |
| `s33a` | #33 | `216.62–219.86` | `close` · `medium` | **FG:** Mảnh sắt mờ góc dưới. **MID:** Đồng hồ `02:30`; **`PHAO ĐÃ MẤT: 3`**; Tí Hon mắt xoáy `@ @` choáng váng, biển `#4 · 2:30`. | Đầu lắc lư, mắt xoáy chữ `@`. | `"#4 · 2:30"` · `"PHAO ĐÃ MẤT: 3"` | `[cut]` · `[twos]` · `pop` |
| `s33b` | #33 | `219.86–221.42` | `medium` · `push` | **FG:** Vòng sóng âm mờ quanh đầu Tí Hon. **MID:** Tí Hon bịt tai khi các vòng sóng âm cưa nhỏ dần quanh mũ rồi đuôi bấm nút hút lên cổng. | Hút lên cổng thời gian ánh tím. | Giữ `"PHAO ĐÃ MẤT: 3"` | `[cut]` |
| `s33xa` | #33b | `221.42–224.30` | `data` · `push` bảng tổng kết giữa chặng | **FG:** Không. **MID:** Bảng điểm giữa tập hiện 3 phao (vịt, sọc, sắt) bị gạch chéo đỏ `✕`. | 3 dấu `✕` gạch xuống dứt khoát. | `"4 ĐẠI DƯƠNG · PHAO ĐÃ MẤT: 3"` | `[cut]` · `riser` |
| `s33xb` | #33b | `224.30–227.50` | `close` · `bigFaceTiHon` + mini ô còn lại | **FG:** Ánh đỏ mờ. **MID:** 4 ô `#5–#8` hiện ra, 3 ô có bóng xe buýt đặt cạnh bóng quái vật to vượt trội; cận Tí Hon nuốt nước bọt ừng ực. | `act()` nuốt nước bọt, mắt liếc ngang sợ hãi. | `"CÒN 4 ĐẠI DƯƠNG · 3 CON > XE BUÝT!"` | `[cut]` |

---

### Hồi 5: Đại dương #5 — Kỷ Tam Điệp (`227.50s – 278.76s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s34a` | #34 | `227.50–231.50` | `title` · `whip` | **FG:** Nước xanh trống mờ. **MID:** Thẻ `#5 KỶ TAM ĐIỆP`. **BG:** Biển xanh dương rộng bát ngát, không bóng sinh vật. | Không khí yên ắng đến rợn. | `"#5 · TAM ĐIỆP · 246 TRIỆU NĂM"` | `[whip]` · `whoosh` |
| `s34b` | #34 | `231.50–234.60` | `wide` · `pull` | **FG:** Ánh sáng lạnh. **MID:** Chèn nhanh khung tối ấn tượng `"ĐẠI TUYỆT CHỦNG LỚN NHẤT"` (tro núi lửa tối sầm) → tan sang mặt biển xanh vắng lặng. | Chớp chuyển tương phản tối → sáng. | `"SAU ĐẠI TUYỆT CHỦNG"` | `[dip]` |
| `s34c` | #34 | `234.60–236.50` | `medium` · `drift` êm | **FG:** Sóng gợn nhẹ. **MID:** Tí Hon nằm ngửa trên cái phao mini, đeo **kính râm đen** gác chân thư giãn hoàn toàn. | Đung đưa cực chill trên phao nhỏ. | Không chữ | `[cut]` |
| `s35` | #35 | `236.50–240.01` | `top` · `pull` từ trên nhìn thẳng xuống! | **FG:** Tí Hon nhỏ xíu trên phao ở giữa khung. **MID/BG:** Một cái **bóng khổng lồ như tàu ngầm** dài vượt cả 2 mép màn hình từ từ lướt ngay bên dưới cậu! Kính râm tụt xuống mũi Tí Hon. | Kính râm trượt xuống chóp mũi lộ 2 mắt mở to (`beatHold` 6 khung). | Không chữ — tập trung quy mô | `[cut]` · `sonar.wav` |
| `s36a` | #36 | `240.01–243.00` | `data` · `medium` | **FG:** Bọt nước. **MID:** *Cymbospondylus* hiện ra với 2 lớp da lưng xanh đại dương – bụng bạc ánh sáng; thẻ `dangerCard` bật bên phải. | Vây chèo khẽ quạt. | Thẻ: `"CYMBOSPONDYLUS · > 17 m · Đầu ≈ 2 m"` | `[cut]` · `blip` |
| `s36b` | #36 | `243.00–246.46` | `wide` · `pull` LÙI MÃI (`z: 1.55 -> 0.85`) | **FG:** Con cá heo nhỏ hiện ở mép trái làm mốc. **MID:** Camera lùi thật xa, lùi mãi mới thấy hết thân dài > 17 m của thằn lằn cá! | Cảm giác choáng ngợp kích thước qua chuyển động camera `pull`. | `"CÁ HEO (~2,5 m) vs > 17 m"` | `[zoom]` · `whoosh` |
| `s36c` | #36 | `246.46–248.92` | `blueprint` · `close` | **FG:** Không. **MID:** Thước đo riêng phần đầu *Cymbospondylus* **`≈ 2 m`** đặt cạnh bóng người **`1,7 m`** đứng thẳng — riêng cái đầu đã cao hơn cả người lớn! | Đường gióng cao vọt qua đầu người. | `"RIÊNG ĐẦU ≈ 2 m > NGƯỜI 1,7 m"` | `[cut]` |
| `s37a` | #37 | `248.92–251.70` | `data` · `push` | **FG:** Ánh sáng đáy biển. **MID:** Huy chương vàng **`KHỔNG LỒ ĐẦU TIÊN`** đóng cạnh *Cymbospondylus*. | Ánh hào quang vàng phía sau. | `"SINH VẬT KHỔNG LỒ ĐẦU TIÊN"` | `[cut]` · `shimmer` |
| `s37b` | #37 | `251.70–256.80` | `blueprint` · `pan` | **FG:** Không. **MID:** Dòng thời gian: con bò sát nhỏ xíu bò từ cạn xuống nước → thanh thời gian chạy **`3 TRIỆU NĂM`** → thân hình phình to thần tốc thành cá nhà táng! | Hoạt hoạ biến hình tăng kích thước mượt theo thanh 3 triệu năm. | `"3 TRIỆU NĂM: BÉ TÍ → KHỔNG LỒ"` | `[cut]` |
| `s37c` | #37 | `256.80–261.38` | `wide` · `pan` cuộc đua tiến hoá | **FG:** Vạch đích bên phải. **MID:** Cuộc đua 2 làn: làn trên *Cymbospondylus* cán đích ở `3 triệu năm` (`✓`); làn dưới cá voi bơi chậm phía sau với thanh `hàng chục triệu năm`. | Gag cuộc đua tốc độ tiến hoá cực dễ hiểu. | `"3 TRIỆU NĂM ✓"` vs `"HÀNG CHỤC TRIỆU NĂM"` | `[cut]` · `powerup` |
| `s38` | #38 | `261.38–267.04` | `data` · `medium` | **FG:** Bọt nước mờ. **MID:** Thực đơn dạng bảng nhà hàng biển: (1) Mực ống, (2) Cá biển, và dòng 3 sáng đỏ **`3. BÒ SÁT BIỂN NHỎ HƠN`** kèm bóng mờ Tí Hon! | Dòng thứ 3 chớp đỏ ở nửa sau câu nói. | Thực đơn: `"MỰC · CÁ · BÒ SÁT NHỎ HƠN"` | `[cut]` |
| `s39a` | #39 | `267.04–270.00` | `close` · `push` | **FG:** Khung gỗ bảng phấn. **MID:** Tí Hon nhìn thẳng vào ống kính, đếm trên ngón tay ngắn theo từng từ `"Bò sát. Nhỏ hơn. Tớ là bò sát."`. | Phấn viết từng dòng lên bảng xanh phía sau. | Bảng: `"BÒ SÁT ✓ + NHỎ HƠN ✓"` | `[cut]` · `[twos]` · `chalk.wav` |
| `s39b` | #39 | `270.00–272.38` | `medium` · `push` vào mặt Tí Hon | **FG:** Không. **MID:** Trên bảng phấn bật chữ đỏ lớn **`= BỮA TRƯA`**, Tí Hon quay thẳng nhìn ống kính mặt đờ ra cam chịu! | `beatHold@271.2s` trước `"Toán học không đứng về phía tớ"`. | Bảng: `"= BỮA TRƯA"` | `[cut]` · `ding` |
| `s40a` | #40 | `272.38–275.80` | `close` · `shake` + `flash` | **FG:** Bóng hàm khổng lồ khép ngang (không máu). **MID:** Cắt ngay khoảnh khắc bị ngoạm → phụt ra một làn bong bóng lớn kèm Tí Hon dính đầy nhớt xanh, đồng hồ dừng `01:15`. | Giọt nhớt nhỏ xuống từ mũ và khăn quàng cam. | `"#5 · 1:15"` · `"KHÔNG VỊ MỰC!"` | `[flash]` · `gulp.wav` |
| `s40b` | #40 | `275.80–278.76` | `medium` · `pull` | **FG:** Bong bóng mờ. **MID:** Tí Hon ngửi tay mình nhăn mặt, lấy đuôi đập nút `"VỀ NHÀ"` bay lên cổng thời gian. | Hút lên cổng giữa màn biển xanh. | Giữ `#5 · 1:15` | `[cut]` · `[twos]` · `shimmer` |

---

### Hồi 6: Đại dương #6 — Kỷ Jura (`278.76s – 319.39s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s41a` | #41 | `278.76–282.70` | `title` · `whip` | **FG:** Ánh xanh thẫm mờ. **MID:** Thẻ `#6 KỶ JURA` tối uy nghiêm. | Nhạc trầm đe doạ mở đầu. | `"#6 · JURA · 150 TRIỆU NĂM"` | `[whip]` · `stinger` |
| `s41b` | #41 | `282.70–287.82` | `wide` · `submerge` (bờ → vực tối) | **FG:** Mặt nước. **MID:** Trên bờ xa, bóng khủng long cổ dài; Tí Hon vẫy tay chào họ hàng → camera chìm xuống đáy xanh gần như đen, nơi một **chiếc vương miện vàng** đang trôi lơ lửng trong bóng tối! | Chuyển điệu hài → rợn cực mượt bằng cú chìm camera. | `"VUA ĐẠI DƯƠNG"` | `[cut]` |
| `s42a` | #42 | `287.82–292.62` | `3d` (`three-kit`) · `dolly` vách đá Anh | **3D:** Vách đá bờ biển Dorset (Anh) xám lạnh dưới trời mây xám, ánh đèn rọi vào hố đào nơi lộ dần khối **đầu lâu dài 2 m**. **2D Overlay:** Bóng người vẽ que cầm xẻng đứng đo. | Camera tiến sát dần vào phần mõm đầu lâu. | `"2023 · ANH · ĐẦU LÂU ≈ 2 m"` | `[zoom]` · `hit` |
| `s42b` | #42 | `292.62–295.86` | `insert` · `push` cận hàm đầu lâu | **FG:** Đá vụn mờ rìa. **MID:** Cận cảnh đầu lâu gần như nguyên vẹn với hàng trăm chiếc răng nhọn xám-trắng xếp khít. | Vệt sáng quét dọc hàng răng đếm nhanh. | `"≈ 130 CÁI RĂNG"` | `[cut]` |
| `s43a` | #43 | `295.86–298.70` | `data` · `medium` | **FG:** Đá ngầm mờ. **MID:** Đầu lâu "mọc" da thịt 2.5D biến thành *Pliosaur* sống đội vương miện vàng; thẻ `dangerCard` bật bên phải. | Chớp sáng chuyển xương → cơ thể sống. | Thẻ: `"PLIOSAUR · Cổ ngắn, đầu khổng lồ · > 12 m"` | `[cut]` · `blip` |
| `s43b` | #43 | `298.70–301.24` | `blueprint` · `insert` | **FG:** Bọt nước mờ. **MID:** Đánh dấu phát sáng 4 cái **vây mái chèo** lớn quạt nước mạnh mẽ. | 4 vòng tròn highlight quanh 4 vây chèo. | `"4 VÂY MÁI CHÈO"` | `[cut]` |
| `s43c` | #43 | `301.24–303.79` | `wide` · `pull` | **FG:** Bụi biển. **MID:** *Pliosaur* đặt cạnh thước so sánh **Xe buýt (~10 m)** — dài hơn cả xe buýt! | Thước đo kéo vượt khung xe buýt. | `"> XE BUÝT (~10 m)"` | `[cut]` |
| `s44a` | #44 | `303.79–305.80` | `close` · `push` | **FG:** Viền hàm dưới mờ. **MID:** Tí Hon đứng ngay trước hàm *Pliosaur* đang há, giơ ngón tay ngắn chỉ từng răng đếm `1... 2... 3... 10`. | Số đếm nhảy trên không trung theo tiếng *píp*. | Bộ đếm: `"1 … 10"` | `[cut]` · `blip` |
| `s44b` | #44 | `305.80–308.38` | `medium` · `shake` khi khép hàm | **FG:** Răng cửa khép sập! **MID:** Đếm tới **`20`** → hai hàm khép sập cái *ực*, màn hình chuyển tối đen hoàn toàn ngay chữ `"ánh sáng nữa"`! | Đóng sập khung đen dứt khoát. | Bộ đếm dừng ở `"20"` → ĐEN | `[dip]` · `gulp.wav` |
| `s45` | #45 | `308.38–312.56` | `close` · `pan` tia đèn pin | **FG:** Bóng răng bao quanh viền. **MID:** Màn hình tối đen chỉ thấy 2 mắt trắng của Tí Hon → cậu bật **đèn pin trên mũ** quét sang phải, chiếu trúng 2 chú cá nhỏ khác cũng đang ngồi chờ vẫy tay! | Quét tia đèn pin nón sáng (`lightCone`) làm lộ đồng cảnh ngộ. | Không chữ | `[cut]` · `[twos]` · `blip` |
| `s46a` | #46 | `312.56–315.10` | `insert` · `push` cận kẽ răng | **FG:** 2 chiếc răng trắng khổng lồ án ngữ màn hình. **MID:** Từ trong khe tối giữa các răng, chiếc **đuôi xanh của Tí Hon** thò ra ngoài chạm trúng nút đỏ trên chỏm mũ? Hoặc cái đầu mũ nhô khe răng cho đuôi đập nút! | Đuôi vươn ra ngoài khe răng bấm *bíp* chính xác! | `"#6 · 0:40"` | `[cut]` · `ding` |
| `s46b` | #46 | `315.10–319.39` | `data` · `pull` | **FG:** Tia sáng tím từ cổng. **MID:** Luồng sáng cổng thời gian kéo Tí Hon bay vút ra khỏi miệng *Pliosaur*; chiếc **Cúp vàng "KỶ LỤC"** rơi vào tay cậu. | Biểu cảm `proud` nâng cúp vàng. | `"KỶ LỤC: BẤM NÚT TRONG MIỆNG"` | `[flash]` · `shimmer` |

---

### Hồi 7: Đại dương #7 — Kỷ Phấn Trắng (`319.39s – 367.07s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s47a` | #47 | `319.39–323.30` | `title` · `whip` | **FG:** Cỏ biển mờ góc dưới. **MID:** Thẻ `#7 KỶ PHẤN TRẮNG` trên biển nông xanh ngọc đục. | Sáng và hài hơn các đại dương trước. | `"#7 · PHẤN TRẮNG · > 80 TRIỆU NĂM"` | `[whip]` · `whoosh` |
| `s47b` | #47 | `323.30–327.17` | `blueprint` · `zoom` vào bản đồ Mỹ | **FG:** Không. **MID:** Bản đồ nước Mỹ bị một dải biển xanh chạy dọc chia đôi ở giữa, chấm đỏ chớp **`TỚ Ở ĐÂY`**; cắt sang con cá bạc trông bình thường. | Bản đồ thu nhỏ nhường chỗ cho con cá cháo nhìn hiền lành. | `"BIỂN NÔNG GIỮA NƯỚC MỸ · TỚ Ở ĐÂY"` | `[zoom]` |
| `s47c` | #47 | `327.17–330.37` | `close` · `pull` LÙI NHANH (`1.6 -> 1.0`) | **FG:** Cỏ biển mờ. **MID:** Camera lùi gấp ra lộ thân dài tới **6 m** — bất ngờ con cá nhe hàm răng nanh sắc lẹm khiến Tí Hon giật bắn! | `beatHold@328.8s` đúng chữ `"dài sáu mét"` trước khi nhe răng nanh. | `"6 m · NHE RĂNG NANH!"` | `[cut]` · `stinger` |
| `s48a` | #48 | `330.37–333.90` | `data` · `medium` | **FG:** Bọt nước. **MID:** *Xiphactinus* há miệng đớp mọi thứ trôi qua (cá con, rong, dép?); thẻ `dangerCard` bật bên phải. | Hàm đớp liên tục *chộp chộp*. | Thẻ: `"XIPHACTINUS · 5–6 m · Siêu tham ăn"` | `[cut]` · `crunch.wav` |
| `s48b` | #48 | `333.90–337.19` | `medium` · `push` | **FG:** Khung rèm bảo tàng mờ. **MID:** Khung tranh hóa thạch nổi tiếng **`CÁ TRONG CÁ`** treo trang trọng như tác phẩm bảo tàng. | Ánh đèn rọi bảo tàng (`lightCone`) xuống bức tranh hóa thạch. | Tranh: `"HÓA THẠCH: CÁ TRONG CÁ"` | `[cut]` |
| `s49a` | #49 | `337.19–342.20` | `blueprint` · `zoom` X-quang | **FG:** Khung kính X-quang. **MID:** Phóng to bức tranh thành phim **soi X-quang**: thấy rõ con cá dài **1,9 m** nguyên vẹn nằm trong bụng con **4,2 m**! | Tia X sáng xanh làm nổi bật bộ xương cá nhỏ trong bụng cá lớn. | `"4,2 m NUỐT 1,9 m"` | `[zoom]` · `blip` |
| `s49b` | #49 | `342.20–344.20` | `close` · `push` | **FG:** Viền xanh. **MID:** Chế độ hoạt hoạ tái hiện vui nhộn: con cá nhỏ bên trong bụng giãy giụa đạp đùng đùng làm bụng con lớn phồng xẹp. | Chớp chuyển nhẹ bên trong dạ dày. | `"CHƯA KỊP TIÊU HÓA"` | `[cut]` · `[twos]` |
| `s49c` | #49 | `344.20–348.92` | `medium` · `shake` nhẹ | **FG:** Bọt khí. **MID:** Con cá lớn ôm bụng nhăn mặt đau bụng, rồi cả hai từ từ nằm ngửa nổi lên với **mắt dấu `✕ ✕`** (hoạt hình, 0 máu). | Biểu cảm hài đúng phong cách cartoon. | `"CẢ HAI CÙNG CHẾT (✕_✕)"` | `[cut]` · `[twos]` · `hit` |
| `s50` | #50 | `348.92–352.06` | `medium` · `push` | **FG:** Bục giảng mờ góc dưới. **MID:** Tí Hon đeo **kính cận**, cầm **que chỉ**, đứng trước bảng phấn gõ 2 cái thuyết giảng như thầy giáo. | `act()` gõ que chỉ lên bảng. | Bảng: `"ĐỪNG NUỐT THỨ TO BẰNG NỬA NGƯỜI MÌNH"` | `[cut]` · `ding` |
| `s51a` | #51 | `352.06–354.50` | `close` · `bigFaceTiHon` | **FG:** Ánh sáng lóe. **MID:** Bóng đèn ý tưởng bật *ting* rực sáng trên mũ Tí Hon, mặt nhe răng tinh quái (`smirk`). | `beatHold@352.5s` lúc bóng đèn ý tưởng sáng lên. | Biểu tượng bóng đèn sáng 💡 | `[cut]` · `shimmer` |
| `s51b` | #51 | `354.50–357.68` | `insert` · `push` cận tấm ảnh | **FG:** Bàn tay ngắn Tí Hon giơ sát mặt cá. **MID:** Tí Hon lục ra giơ thẳng tấm ảnh hóa thạch **`CÁ TRONG CÁ`** ngay trước mũi *Xiphactinus*! | Tấm ảnh lật thẳng vào trung tâm khung hình. | `"CHIÊU: TẤM ẢNH"` | `[cut]` |
| `s52a` | #52 | `357.68–360.67` | `ots` · 2 nhịp liếc mắt | **FG:** Tấm ảnh trên tay Tí Hon mờ bên trái. **MID:** Cận mắt *Xiphactinus* nhìn xuống **tấm ảnh** → đảo mắt nhìn sang **Tí Hon** → giọt mồ hôi lớn chảy xuống thái dương! | Chớp nhịp im lặng căng thẳng hài hước. | Không chữ | `[cut]` · `[twos]` |
| `s52b` | #52 | `360.67–363.12` | `medium` · `pull` | **FG:** Cỏ biển mờ. **MID:** *Xiphactinus* lặng lẽ quay đuôi bơi thẳng mất dạng sang phải; Tí Hon khoanh tay nhướng mày đắc thắng. | Con cá trượt êm ra khỏi khung phải. | Không chữ | `[cut]` · `[twos]` |
| `s53` | #53 | `363.12–367.07` | `data` · `medium` | **FG:** Hạt sáng xanh. **MID:** Đồng hồ `03:00`, biển `#7 · 3 PHÚT`; Tí Hon gõ ngón tay ngắn vào thái dương cười tự hào (`proud`) rồi đuôi bấm nút hút lên. | Lần đầu tiên chiến thắng không mất phao! | `"#7 · 3 PHÚT"` · `"THẮNG BẰNG TRÍ KHÔN!"` | `[cut]` · `ding` |

---

### Hồi 8: Đại dương #8 — Thế Mai ô xen (`367.07s – 425.93s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s54a` | #54 | `367.07–370.85` | `title` · `whip` + rung nhẹ | **FG:** Bọt sóng dữ mờ. **MID:** Thẻ **`#8 THẾ MIOCEN`** màu đỏ rực rung mạnh + chèn bóng đồng hồ `00:08` cảnh `#6`. | Cảnh báo trùm cuối xuất hiện. | `"#8 · MIOCEN · ≈ 10 TRIỆU NĂM"` | `[whip]` · `stinger` |
| `s54b` | #54 | `370.85–374.54` | `blueprint` · `zoom` vào bản đồ Nam Mỹ | **FG:** Không. **MID:** Bản đồ Nam Mỹ với chấm đỏ sáng rực ngoài khơi nước **Peru** + callback đồng hồ `00:08` cảnh `#6`. | Zoom vào vùng biển Thái Bình Dương ngoài khơi Peru. | `"NGOÀI KHƠI PERU"` | `[zoom]` |
| `s54c` | #54 | `374.54–378.19` | `wide` · `roll ±0.03` theo sóng lớn | **FG:** Bọt sóng trắng đánh qua ống kính. **MID:** Biển xanh đen sóng dữ dội, trời xám chớp nhẹ; Tí Hon nằm nhún vai tự tin trên cái phao nhỏ xíu. | Nằm gác đầu chủ quan dù sóng đánh lắc lư dữ dội. | Không chữ | `[cut]` |
| `s55a` | #55 | `378.19–380.25` | `close` · `push` | **FG:** Sóng đen che rìa dưới. **MID:** Một mảng lưng đen bóng khổng lồ trồi lên sát bên phao, cao hơn Tí Hon gấp nhiều lần. | Tí Hon há hốc miệng (`shocked`). | Không chữ | `[cut]` |
| `s55b` | #55 | `380.25–382.60` | `medium` · `shake` + cột nước | **FG:** Tia nước phun mờ phủ màn hình! **MID:** Lỗ phun nước trên đầu cá voi phụt lên một cột nước khổng lồ dội Tí Hon ướt sũng. | Cột nước trắng bắn tung trời (`spray: 1`). | Không chữ | `[cut]` · `splash.wav` |
| `s56a` | #56 | `382.60–385.88` | `data` · `medium` | **FG:** Bọt nước biển sâu. **MID:** *Livyatan* hung dữ với thẻ `dangerCard` mà **thanh Độ nguy hiểm dài xuyên tràn ra ngoài khung đỏ**! | Thanh danger vượt lố khỏi viền thẻ! | Thẻ: `"LIVYATAN · 13,5–17,5 m · Răng cả 2 hàm"` | `[cut]` · `blip` |
| `s56b` | #56 | `385.88–388.68` | `blueprint` · `wide` | **FG:** Không. **MID:** Thước so sánh đặt **Xe buýt (~10 m)** dưới *Livyatan* 13,5–17,5 m (dài hơn hẳn xe buýt). | Vạch kích thước 17,5 m nổi bật. | `"13,5 – 17,5 m > XE BUÝT"` | `[cut]` |
| `s56c` | #56 | `388.68–392.35` | `insert` · `medium` so 2 đầu lâu | **FG:** Lưới blueprint. **MID:** Đặt 2 đầu lâu cạnh nhau: **Cá nhà táng nay** (răng chỉ ở hàm dưới ✓ / trên ✕) vs **Livyatan** (răng khổng lồ ở **CẢ 2 HÀM ✓✓**). | Khoanh sáng đỏ các răng hàm trên. | `"RĂNG THẬT CẢ 2 HÀM ✓✓"` | `[cut]` |
| `s57a` | #57 | `392.35–398.10` | `insert` · `shake` mạnh lúc răng rơi | **FG:** Bụi đáy biển tung lên. **MID:** Một chiếc răng khổng lồ rơi *bịch* xuống giữa khung (`36 cm`), đặt cạnh chiếc răng T-Rex to nhất (`~27 cm`) ngắn hơn hẳn! | Răng T-Rex trông lép vế hẳn bên cạnh. | `"36 cm vs RĂNG T-REX (~27 cm)"` | `[cut]` · `impact` |
| `s57b` | #57 | `398.10–403.20` | `data` · `push` | **FG:** Ánh vàng mờ. **MID:** Huy chương **`RĂNG CẮN LỚN NHẤT`** kèm chú thích nhỏ *(không tính ngà)* đóng dấu sáng rực cạnh chiếc răng 36 cm. | Huy chương bật vào góc trên chiếc răng. | `"RĂNG CẮN LỚN NHẤT (không tính ngà)"` | `[cut]` · `ding` |
| `s58` | #58 | `403.20–405.59` | `medium` · `push` | **FG:** Cát biển mờ. **MID:** Tí Hon đứng cạnh đúng 1 chiếc răng 36 cm, lén **nhón hết gót chân** để cố cao hơn… nhưng vẫn lùn hơn mũi răng! | Gag nhón chân ngước nhìn đỉnh răng đầy bất lực. | `"1 CHIẾC RĂNG > NGƯỜI TỚ!"` | `[cut]` · `[twos]` |
| `s59a` | #59 | `405.59–407.60` | `wide` · `pan` nhanh | **FG:** Rặng tối mờ. **MID:** Bóng một con cá voi khác hốt hoảng bơi vụt ngang chạy trốn khỏi bóng tối phía sau. | Tạo chứng cứ trực quan về kẻ ăn thịt cá voi. | Không chữ | `[cut]` · `whoosh` |
| `s59b` | #59 | `407.60–410.59` | `top` · GÓC MÁY TỪ ĐÁY VỰC NHÌN NGƯỢC LÊN! | **FG:** Hàng răng dưới của *Livyatan* mở toang ở mép dưới màn hình. **MID:** Phao mini + Tí Hon như một chấm nhỏ xíu lơ lửng trên mặt nước ngay chính giữa miệng nó! | Góc quay kinh điển kiểu *Jaws* nhìn thẳng từ dưới vực lên. | Không chữ | `[cut]` · `heartbeat` |
| `s59x` | #59b | `410.59–415.20` | `close` · `push` + `flash` ngoạm | **FG:** Mép giấy rách bay. **MID:** Tí Hon giơ tấm ảnh `"CÁ TRONG CÁ"` lên tự tin… hàm *Livyatan* lao tới ngoạm phăng cả tấm ảnh, trên tay cậu chỉ còn mẩu giấy rách! | `beatHold@413.2s` → hàm đớp *phập* cắt phăng tấm ảnh. | `"CHIÊU CŨ: THẤT BẠI!"` | `[cut]` · `[mblur:5]` · `crunch.wav` |
| `s60` | #60 | `415.20–417.51` | `close` · `bigFaceTiHon` | **FG:** Không. **MID:** Cận mặt Tí Hon nhìn thẳng ống kính đờ đẫn (`deadpan`); đồng hồ góc trái mới nhích đúng **`00:01`**. | Nhịp im lặng hài hước 1 nhịp trước cú ngoạm kết liễu. | Đồng hồ: `"00:01"` | `[cut]` · `[twos]` |
| `s61a` | #61 | `417.51–419.80` | `freeze` · `flash` trắng + vỡ kính | **FG:** Mảnh kính đồng hồ vỡ tung. **MID:** Chớp trắng lóe sáng (không thấy cảnh máu me) → đồng hồ sinh tồn đứng chết ở **`00:08`** rồi nứt toác mặt kính! | Chớp sáng chuyển ngay sang mặt đồng hồ vỡ nát. | Dấu đỏ to: `"#8 · 8 GIÂY"` | `[flash]` · `glass_crack.wav` |
| `s61b` | #61 | `419.80–423.42` | `data` · `pull` | **FG:** Ánh đỏ chớp. **MID:** Chèn lại khung cảnh `#6` (`"CHƯA TỚI 10 GIÂY?!"` + ô `#8` đỏ) và đóng dấu xanh **`✓`** xác nhận lời hứa đầu video! | Khép vòng cung cấu trúc (payoff của câu đố đầu tập). | `"CHƯA TỚI 10 GIÂY?! ✓"` | `[cut]` · `ding` |
| `s62` | #62 | `423.42–425.93` | `close` · `shake` điên cuồng | **FG:** Khung răng tối đen bao quanh. **MID:** Chỉ thấy mũ bảo hiểm + cái đuôi Tí Hon quẫy loạn xạ đập trúng nút đỏ **`4 LẦN`** đúng 4 cụm từ (`"Về nhà! Bấm nút! Bằng đuôi! Bấm đi mà!"`) → cổng xoáy mở tung! | Chớp sáng cổng mỗi cú đập đuôi, hút vọt lên sáng lòa. | `"BẤM ĐI MÀ!!!"` | `[flash]` · `[mblur:5]` · `blip` ×4 + `shimmer` |

---

### Hồi 9: Về hiện tại (`425.93s – 444.15s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s63a` | #63 | `425.93–428.60` | `wide` · `dip` mở ra bãi biển nắng vàng | **FG:** Vỏ sò & lá dừa mờ góc phải. **MID:** Tí Hon rơi *bịch* từ trên trời xuống cát vàng (`impact`), nằm dang tay thở phào với miếng **băng dán chéo** trên trán. **BG:** Biển xanh trời vàng dịu. | Squash nặng xuống nền cát làm cát bắn nhẹ. | `"HIỆN TẠI"` | `[dip]` · `splash.wav` + `ding` |
| `s63b` | #63 | `428.60–431.67` | `medium` · `drift` êm | **FG:** Bụi nắng lấp lánh (`FX.dust`). **MID:** Một chú cua đỏ lạch bạch bò ngang qua nhìn Tí Hon nằm bẹp rồi bình thản bỏ đi tiếp. | Cua chớp mắt nhìn rồi đi ngang qua cảnh. | Không chữ | `[cut]` · `[twos]` |
| `s64a` | #64 | `431.67–435.00` | `wide` · `pan` hướng ra khơi | **FG:** Cát vàng + vai Tí Hon mờ bên trái (`OTS`). **MID:** Ngoài khơi xa, một con **Cá voi xanh** khổng lồ trồi lên phun cột nước trắng cao vút. | Tạo cảm giác choáng ngợp yên bình. | `"CÁ VOI XANH · LỚN NHẤT TỪNG SỐNG"` | `[cut]` |
| `s64b` | #64 | `435.00–438.70` | `blueprint` · `pull` | **FG:** Không. **MID:** Thước so sánh quy mô: **Cá voi xanh (~30 m)** nằm ở trên, dài vượt cả hàng **8 con quái vật tiền sử** xếp nối đuôi bên dưới! | Hiện lần lượt 8 bóng sinh vật nối hàng dưới bụng cá voi xanh. | `"DÀI HƠN CẢ 8 QUÁI VẬT XẾP HÀNG"` | `[cut]` |
| `s64c` | #64 | `438.70–441.73` | `close` · `push` | **FG:** Màng lọc sừng cá voi mờ. **MID:** Cận miệng cá voi xanh đang lọc đàn **tôm tí hon hồng**; chữ **`TÍ HON`** bay ra từ đàn tôm → Tí Hon giật mình tự chỉ tay vào mình! | Gag chơi chữ `"Tí hon. Giống tớ."` cực duyên. | `"ĂN: TÔM TÍ HON"` | `[cut]` · `pop` |
| `s65` | #65 | `441.73–444.15` | `medium` · `pull` | **FG:** Vỏ sò mờ. **MID:** Tí Hon lùi tít lên trên bờ cát cao cách xa mép nước, hí hoáy đắp một **lâu đài cát** nhỏ cắm cờ đỏ. | Lùi nhanh từng bước nhỏ (`twos`), cười vui vẻ an toàn. | Không chữ | `[cut]` · `[twos]` |

---

### Hồi 10: Tổng kết, Bảng xếp hạng & Hẹn tập sau (`444.15s – 482.99s`)

| Shot | Đoạn | Giờ thực tế | Size & Camera | Bố cục 3 lớp (FG / MID / BG) | Hành động & Nhịp `wordTime()` | Chữ / Đồ hoạ | Chuyển cảnh & Kỹ thuật |
|---|---|---|---|---|---|---|---|
| `s66` | #66 | `444.15–447.94` | `data` · `dip` vào bảng xếp hạng | **FG:** Đèn rọi sân khấu mờ. **MID:** Bảng xếp hạng 8 hàng trống trượt vào giữa; Tí Hon đeo kính cầm que chỉ đứng bên trái. | Cả 8 hàng hiện dấu `???`. | `"BẢNG XẾP HẠNG · THEO ĐỒNG HỒ CỦA TỚ"` | `[dip]` · `riser` |
| `s67a` | #67 | `447.94–451.34` | `data` · `push` | **MID:** Hàng **`#8`** dưới đáy lật sáng xanh ngọc: **Kỷ Cam bri · Anomalocaris · `∞ Vô hạn`**. | Lật thẻ mượt kèm icon con tôm nhỏ. | `"8 · CAMBRI · ∞"` | `[cut]` · `card_flip.wav` |
| `s67b` | #67 | `451.34–456.45` | `medium` · `pan` lên dần theo bảng | **MID:** Từ hàng **`#7`** lên **`#3`** lần lượt lật nối tiếp đúng từng con số đọc: `12:00` → `04:00` → `03:00` → `02:30` → `01:15`, mỗi hàng có icon loài vật nhỏ! | Tí Hon đưa que chỉ lên từng hàng theo nhịp thoại. | `"7·12:00"` → `"6·4:00"` → `"5·3:00"` → `"4·2:30"` → `"3·1:15"` | `[cut]` · `card_flip.wav` ×5 |
| `s68a` | #68 | `456.45–459.52` | `data` · `push` | **MID:** Hàng **`#2`** lật sáng xanh đậm: **Kỷ Jura · Pliosaur · `0:40`**. | Nhạc dồn chuẩn bị chốt hạng nhất. | `"2 · JURA · 0:40"` | `[cut]` · `card_flip.wav` |
| `s68b` | #68 | `459.52–463.98` | `close` · `shake` ở hạng nhất | **MID:** Hàng **`#1`** rung bần bật rồi lật bật đỏ rực: **Thế Miocen · Livyatan · `0:08`**! Tí Hon nấp thò nửa mặt sau cạnh bảng. | `beatHold@462.5s` ngay trước `"Tám giây."` → đập trống rung bảng! | `"1 · LIVYATAN · 0:08"` | `[cut]` · `impact` |
| `s70a` | #70 | `463.98–468.36` | `close` · `bigFaceTiHon` | **FG:** Không. **MID:** Tí Hon chỉ thẳng tay về phía ống kính mắt sáng rực; phía sau lưới **8 ô đại dương (1–8)** nổi nhẹ. | Phá vỡ bức tường thứ tư hỏi trực tiếp khán giả. | `"BẠN CHỌN ĐẠI DƯƠNG NÀO?"` | `[cut]` |
| `s70b` | #70 | `468.36–473.21` | `data` · `medium` | **MID:** Lưới 8 ô đại dương nhấp nháy luân phiên, biểu tượng **bong bóng bình luận vector** nảy lên bên cạnh (không dùng emoji). | Tí Hon gật gù lắng nghe bên góc trái. | `"BẠN CHỌN ĐẠI DƯƠNG SỐ MẤY?"` | `[cut]` · `pop` |
| `s71` | #71 | `473.21–476.91` | `medium` · `push` | **FG:** Viền sáng nút ĐĂNG KÝ. **MID:** Nút đỏ **`ĐĂNG KÝ`** hiện lên cao; Tí Hon giơ tay ngắn với không tới → quay lưng vung đuôi đập *tách* làm nút chuyển sang **`ĐÃ ĐĂNG KÝ ✓`** rung chuông! | Callback hoàn hảo với gag nút `"VỀ NHÀ"` ở cảnh `#5`. | Nút `"ĐĂNG KÝ"` → `"ĐÃ ĐĂNG KÝ ✓"` | `[cut]` · `[twos]` · `ding` |
| `s72a` | #72 | `476.91–480.20` | `3d` (`three-kit`) · `orbit` trời hoàng hôn thiên thạch | **3D:** Bầu trời cam rực chuyển đỏ thẫm, một **quả cầu lửa thiên thạch khổng lồ** kéo vệt khói rực sáng lao xé ngang bầu trời phía sau đồi cát! **2D Overlay:** Tí Hon đứng quay lưng nhìn lại. | Tí Hon từ từ quay đầu ngoái lại sau lưng theo vệt sáng thiên thạch. | `"TẬP SAU: NGÀY CUỐI CÙNG CỦA KHỦNG LONG"` | `[cut]` · `riser` |
| `s72b` | #72 | `480.20–482.99` | `close` · `bigFaceTiHon` → `dip` ĐEN | **MID:** Cận mặt Tí Hon mắt mở to tròn phản chiếu ánh lửa cam thiên thạch lao gần (`"Từng giờ một."`) → **CẮT ĐEN HOÀN TOÀN** đột ngột ngay âm cuối! | `beatHold` 6 khung trên ánh lửa phản chiếu trong mắt → cắt đen im lặng. | Màn hình đen chốt hậu vị | `[dip]` · `impact` |

---

## Phần D — Checklist Phê duyệt trước khi Code bản v2

- [ ] **Đa dạng góc máy:** Không có cặp shot nào dùng lại cùng bố cục quá 2 lần; đã đưa vào OTS tiền cảnh mờ, `bigFaceTiHon` với nền mờ, POV từ dưới vực (`#59b`), POV từ trong hàm (`#24`), `freeze` thời gian (`#2b`, `#61a`), và 4 shot 3D `three-kit.js`.
- [ ] **Khớp 100% lời Vbee hiện có:** Toàn bộ mốc giây được neo theo `timeline/words.json` (`481.488s`, 73 đoạn), không thay đổi lời đọc nên tái sử dụng trực tiếp file Vbee đã kiểm chứng.
- [ ] **Mũ bảo hiểm `"VỀ NHÀ"` + Khăn quàng cam + 3 Phao:** Hiện diện liên tục đúng logic mất dần (`0 → 1 → 2 → 3`).
- [ ] **An toàn phụ đề 16:9:** Dải gradient tối nhẹ ở đáy (`y = 970..1080`) bảo đảm phụ đề đọc sắc nét trên mọi nền sáng mà không che đồ hoạ (`y <= 905`).
