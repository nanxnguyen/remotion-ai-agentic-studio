# Script Review — cuoc-goi-nho-cua-me (độc lập, clean context)

Nguồn đã đọc: `research.md`, `brief.md`, `script.md`, `voice.json`.
Rubric profile story: mỗi shot nhân vật có hành động rõ theo beat; situation–turn–ending xứng đáng (earned); caption hỗ trợ cảnh.

## Bảng điểm (tổng 10)

| # | Tiêu chí (trọng số) | Điểm | Bằng chứng (dòng cụ thể) | Nhận xét |
|---|---------------------|------|---------------------------|----------|
| 1 | Fidelity giữ verbatim lời user (2đ) | **2.0 / 2.0** | `research.md:9` hook "Mẹ gọi lúc mình đang bận. Mình định lát nữa gọi lại…" = `script.md:7` s1 = `voice.json:s1`. `research.md:13` body = nối `voice.json:s2–s8` từng chữ (kể cả "Lát con gọi lại nha.", "Con ăn cơm chưa?", "Một cuộc gọi lại thôi, họ cũng vui rồi."). `script.md:1` luật "giữ nguyên từng chữ, chỉ ngắt shots" được tuân thủ. | Không thêm/bớt/sửa chữ nào. Dấu "…" và ngoặc kép giữ nguyên. |
| 2 | Hook rõ trong 3s (1.5đ) | **1.5 / 1.5** | `script.md:7` s1 (HOOK): 12 từ / 3.0s + hình "màn hình điện thoại hiện 'cuộc gọi nhỡ — Mẹ', rung nhẹ". `research.md:66` candidate 1 được chọn làm hook chính ("đủ tò mò, đúng giọng kể, không spoil kết"). | Hook vừa nghe vừa thấy trong 3s đầu, bỏ lửng ở "…" giữ chân. Không spoil cú xoay "Con ăn cơm chưa?". |
| 3 | Clarity + kết kể lại được 1 câu (1.5đ) | **1.5 / 1.5** | `brief.md:5` thông điệp 1 câu: "mẹ chẳng cần gì lớn lao — một cuộc gọi lại thôi cũng đủ làm mẹ vui" = `script.md:14` s8 chốt verbatim. Arc: situation s1–s3 (bận/bấm tắt/quên) → turn s4–s5 ("mới nhớ", "Con ăn cơm chưa?") → ending s6–s8 (chuyện nhỏ + chốt callback "đã gọi lại"). `brief.md:7` callback điện thoại mở–kết khớp `script.md:14` hình s8. | Kết kể lại được đúng 1 câu, không đạo lý sáo (đúng lệnh cấm `brief.md:8`: không "báo hiếu/hãy yêu thương khi còn có thể"). Cú xoay earned vì s5 trả đúng fact `research.md:45`. |
| 4 | Spoken naturalness + delivery nhanh→chậm (1.5đ) | **1.5 / 1.5** | Voice toàn câu nói thường ("bấm tắt", "làm nốt vài việc", "trời ở đây có mưa không"), không từ viết/lớn. Cột Delivery `script.md:7–14`: s1 "vừa, hơi gấp" → s2–s3 "nhanh, dồn dập" → s4 "chậm lại, chùng xuống" → s5–s8 "ấm, chậm / thủ thỉ / lặng". Khớp yêu cầu giọng `research.md:21` ("đọc nhanh đoạn công việc, ấm chậm từ lúc mẹ bắt máy") và tone 2 nhịp `brief.md:6`. | Arc delivery khả thi với giọng nam kể chuyện đã chốt (`brief.md:19`). Không câu nào dài quá hơi (max 25 từ ở s7–s8, đã chia nhịp thủ thỉ). |
| 5 | Timing 40–60s khả thi (1đ) | **0.8 / 1.0** | `brief.md:26–28`: 138 từ, 4.0 từ/giây → voice thuần 34.5s + padding 5.4s ≈ 40s; kịch bản thật đọc ấm-chậm nửa sau (~3.0–3.5 từ/giây) kéo lên ~44–47s. `script.md:16` ghi cùng con số. | Trừ 0.2 vì mốc danh nghĩa 40s nằm sát biên dưới: nếu TTS đọc nhanh hơn 4.0 hoặc cắt padding, video có thể rơi <40s. Khả thi nhưng phụ thuộc delivery chậm + hold (xem fix). |
| 6 | Source accuracy, không bịa (1đ) | **1.0 / 1.0** | Voice không thêm fact nào ngoài `research.md:40–48` (8 facts). Inferences (`research.md:50–54`: "mẹ chờ từ chiều", "áy náy", "nhẹ lòng") không bị đưa vào voice như sự thật. Unknowns (`research.md:56–62`: mẹ ở đâu, gọi bằng app gì) không bị điền vào voice. Hình s6–s7 ("mẹ cầm điện thoại mỉm cười", "bữa tối/mưa") là minh hoạ theo đúng ảnh yêu cầu `research.md:17`, không ghi thành lời khẳng định. | Không số liệu, không "báo hiếu/đấng sinh thành/vô thường" — đúng lệnh cấm `research.md:35`. |
| 7 | Visual feasibility + khác Lan/gaplai (1.5đ) | **1.3 / 1.5** | Mỗi shot có 1 hành động quay được: s1 mock UI rung (`script.md:7`), s2 tay bấm tắt (`script.md:8`), s4 mở điện thoại (`script.md:10`), s5 "đang gọi → ấm lên" (`script.md:11`), s6 push-in chậm (`script.md:12`), s7 mâm cơm + mưa (`script.md:13`), s8 callback "đã gọi lại" + hold (`script.md:14`). Khác biệt ghi rõ `brief.md:11–16`: mở bằng màn hình gọi nhỡ ban ngày lạnh (không phải phòng đêm), palette sáng lạnh `#E8EEF2`→tối ấm `#2B2320`+hổ phách, chữ Plus Jakarta Sans phía dưới (Lan = đen-cam/pictogram que/chữ trên; gaplai = phòng nâu `#171310` tĩnh). | Trừ 0.2 vì s3 (`script.md:9`) nhồi 3 beat (họp + nhắn tin + checklist) trong 4.5s — rủi ro dựng bị dồn (xem fix). Còn lại khả thi, caption accent đổi xanh lạnh→hổ phách hỗ trợ đúng nhịp. |

## Fix bắt buộc

Không có fix bắt buộc (voice verbatim, cấm sửa chữ). Hai lưu ý chuyển sang phase build (không đổi script):

1. **Timing (giữ ≥40s):** giữ delivery ấm-chậm nửa sau (s5–s8) + hold hình ≥0.6s và 1.4s lặng cuối như `brief.md:28` đã tính; KHÔNG tua nhanh audio để bù. Nếu TTS render thuần <36s, bù bằng hold/dissolve, không nhồi chữ.
2. **s3 đỡ dồn:** nếu dựng 4.5s không đủ cho 3 beat (họp/nhắn/checklist), ưu tiên giữ bong bóng chat "Lát con gọi lại nha." + 1 beat việc (checklist), họp chỉ lướt nền mờ — giữ nguyên voice.

## TỔNG: 9.6 / 10 — Verdict: PASS

Script đạt verbatim tuyệt đối, hook đúng 3s, arc situation–turn–ending earned, khác rõ Lan/gaplai. Cho qua phase tiếp theo với 2 lưu ý build ở trên, không cần revise script.

## Vòng 2 (2026-10-14 — script v2: user cho phép sửa lời, bỏ verbatim v1)

Nguồn đã đọc: `research.md`, `brief.md` (v2), `script.md` (v2), `voice.json` (v2).
Đã đối chiếu: `voice.json` khớp từng chữ `script.md` (s1–s8). Trọng tâm vòng này: xúc động.

## Bảng điểm vòng 2 (tổng 10)

| # | Tiêu chí (trọng số) | Điểm | Bằng chứng (dòng cụ thể) | Nhận xét |
|---|---------------------|------|---------------------------|----------|
| 1 | Fidelity sự thật vs research facts (2đ) | **1.5 / 2.0** | Khung 8 facts `research.md:39–48` giữ đủ: bấm tắt (`script.md:10`) → nhắn hứa (`script.md:11`) → quên (`script.md:11–12`) → tối gọi lại (`script.md:12–13`) → "Con ăn cơm chưa?" (`script.md:13`) → chuyện nhỏ (`script.md:15`) → chốt (`script.md:16`). Unknowns `research.md:56–62` không bị điền (không khẳng định mẹ ở đâu/sống với ai, gọi bằng app gì, tần suất gọi). Chi tiết cụ thể hóa mới: "họp dở" (`script.md:10`), "chưa kịp reo hai tiếng" (`script.md:13`), "cơm đã nguội" / "mưa vẫn gõ nhẹ" (`script.md:15`), "phòng đã tắt đèn" (`script.md:12`). | Trừ 0.5: "mưa vẫn gõ nhẹ" nâng chủ đề trò chuyện (fact 7: hai mẹ con KỂ "trời có mưa không") thành thời tiết đang diễn ra — suy diễn thành fact, nặng nhất trong các điểm mới. "Chưa kịp reo hai tiếng" cụ thể hóa "rất nhanh" (fact 5), nhẹ hơn nhưng vẫn là con số bịa. "Chột dạ" / "nghĩ mãi" là cảm xúc của chính người kể → chấp nhận được, không tính vi phạm. Tất cả nằm trong quyền sửa lời user đã cho, không đảo fact nào — chỉ trừ điểm fidelity, không block. |
| 2 | Hook rõ trong 3s (1đ) | **1.0 / 1.0** | `script.md:9` s1 giữ nguyên chữ đã duyệt (12 từ ≈ 2.9s) + mock UI "cuộc gọi nhỡ — Mẹ" rung nhẹ. | Vừa nghe vừa thấy trong 3s đầu, bỏ lửng ở "…", không spoil cú xoay. |
| 3 | Clarity + kết kể lại được 1 câu (1.5đ) | **1.4 / 1.5** | Kể lại 1 câu: "Mẹ chẳng cần gì lớn lao — một cuộc gọi lại thôi cũng đủ làm mẹ vui" = `script.md:16` s8. Arc: s1–s3 situation → s4–s5 turn → s6–s8 ending; callback phone "Đã gọi lại" (`script.md:16`) khép với s1 (`brief.md:7`). | Trừ 0.1: s5 dồn 3 ý (ngón tay + reo + câu mẹ) trong 1 shot khiến spotlight của cú turn bị chia với chi tiết ngón tay. Ending earned, không đạo lý, đúng lệnh cấm `brief.md:8`. |
| 4 | Xúc động / cụ thể cảm xúc (2đ — tiêu chí chính vòng này) | **1.7 / 2.0** | "vẫn nằm đó, mình chột dạ" (`script.md:12`) thay "mới nhớ" trừu tượng; "chính ngón tay ban chiều bấm tắt" (`script.md:13`) gieo từ close-up s2; "cơm đã nguội" / "mưa vẫn gõ nhẹ" / 2 mâm cơm (`script.md:15) cho giác quan + tương phản; "nghĩ mãi" (`script.md:16`) tạo dư âm. Đủ 3 highlight `brief.md:29` (a nín nhịp s5, b ấm nhất s6, c lặng s8). | Nâng cấp rõ rệt so với v1 ở đúng tiêu chí user chê. Trừ 0.3: s5 nhồi 3 cú đấm cảm xúc trong ~6s, đỉnh "Con ăn cơm chưa?" bị chia lửa; "chột dạ" gọi tên cảm xúc (tell) thay vì để hình tự nói — dù cặp "phòng tắt đèn / màn hình sáng" đã gỡ lại phần nào. |
| 5 | Spoken naturalness + delivery (1.5đ) | **1.2 / 1.5** | Câu ngắn, từ nói ("bấm tắt vội", "quên bẵng", "chẳng nhờ gì cả"). Hai nhịp nhanh→chậm + 3 highlight có pause ghi rõ cột Delivery (`script.md:9–16`), khớp tone 2 nhịp `brief.md:6`. | Trừ 0.3: s5 25 từ, pause "nín 1 nhịp sau 'hai tiếng'" nằm giữa shot — TTS/render lệch nhịp là mất highlight (a). s7 28 từ dài nhất, mệnh đề "vừa kể: hôm nay ăn gì, chỗ con có mưa không" là tường thuật gián tiếp, hơi gượng miệng khi đọc lên. |
| 6 | Timing 40–55s ở nhịp Thanh Long ~4.1 từ/s (1đ) | **1.0 / 1.0** | Đếm thật: s4 21 từ (không phải 22) → tổng **160** (không phải 161 như `script.md:18`, `brief.md:26` ghi). Voice thuần 160/4.1 ≈ 39.0s + pause s5 0.5s + lặng s8 ~1.2s ≈ 40.7s; nửa sau đọc chậm 3.2–3.5 từ/s → voice thật ~43–46s; + padding 5.4s → **video ~46–51s, trong biên 40–55s**. | Đạt, biên an toàn hơn v1. Sai số đếm từ chỉ 0.2s, không ảnh hưởng timing — ghi làm fix doc. |
| 7 | Visual feasibility + highlight dựng được (1đ) | **0.8 / 1.0** | (a) s5: beat Con dưới đèn đường → pause → close-up mẹ + chuông dừng + sáng ấm (`script.md:13`); (b) s6 đèn sáng nhất + push-in (`script.md:14`); (c) s8 callback "Đã gọi lại" + lặng (`script.md:16`). Caption accent đổi xanh lạnh→hổ phách theo nhịp (`brief.md:12`); mỗi shot nhân vật có hành động/beat rõ. | Trừ 0.2: cú cắt s5 phải rơi đúng pause 0.5s, lệch là mất highlight (a); thiếu cầu chuyển không gian s4 (phòng tối) → s5 (đèn đường) — cần 1 cut ra khỏi phòng; s3 vẫn 3 beat montage trong 5.1s (rủi ro dồn kế thừa từ v1). |

## Fix bắt buộc (vòng 2)

Không có fix nào đụng voice (`voice.json` khớp script, khung fact nguyên, timing trong biên). 01 fix doc (sửa khi tiện, không block build):

1. **Số từ:** `script.md:18` + `brief.md:26,28` — tổng 161→**160** từ; s4 22→**21** từ, giây s4 5.4→**5.1s**, voice thuần 39.3→**39.0s**. Không đổi chữ voice.

## Lưu ý build (không đổi script)

1. **Pause s5:** align cut Con→Mẹ theo audio (đúng sau "hai tiếng"), không cắt theo timecode cứng.
2. **Cầu s4→s5:** thêm 1 cut ra khỏi phòng (đứng dậy / hành lang / cầu thang) trước beat đèn đường, nếu không viewer lạc không gian.
3. **s7 nếu thoại dồn:** giữ beat 2 mâm đối xứng + dải VoiceWave; mưa chỉ giữ tiếng/ánh ngoài cửa sổ, không thêm shot.
4. **Soften option (không bắt buộc):** nếu muốn fidelity tuyệt đối, đổi "Ngoài cửa, mưa vẫn gõ nhẹ" → "vừa kể chuyện mưa nắng" — nhưng sẽ mất 1 giác quan; giữ bản hiện tại vẫn PASS vì thuộc quyền sửa lời user đã cho.

## TỔNG VÒNG 2: 8.6 / 10 — Verdict: PASS

V2 đạt mục tiêu vòng này: cụ thể hóa cảm xúc (tội lỗi "chột dạ", tương phản 2 ngón tay / 2 mâm cơm, bằng chứng "chưa kịp reo hai tiếng") + đủ 3 highlight dựng được. Cho build với 1 fix doc và 3 lưu ý ở trên.
Lưu ý so sánh: tổng 8.6 thấp hơn 9.6 của v1 chỉ vì đổi rubric (fidelity từ "verbatim tuyệt đối" sang "trừ điểm cụ thể hóa") — hai tổng không so sánh trực tiếp được; tiêu chí chính vòng này (xúc động) đã tăng rõ rệt.
