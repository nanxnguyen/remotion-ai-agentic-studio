# Script review — thang-may-tang-13 (gate A)

## Round 1

Reviewer: `script-reviewer`, chạy trong context sạch, độc lập, không phải người viết. Ngày 2026-11-07.
Đầu vào đã đọc: `brief.md`, `research.md`, `script.md`, `shotlist.json`, `voice.proposed.json`, `voice-direction.md`, `voice-performance.proposed.json`, `docs/SHORTS_RETENTION_PLAYBOOK.md`, `.claude/skills/ray-phim-ke-chuyen/SKILL.md` (HOOK_0_6_60S_V1, RAY_V030, SOFT_FADE), `references/v3v4-retention-action-qa-v030.md`, `.agents/skills/ray-pineline-worflow-agent/SKILL.md` (Gate A, Phase 2a/2b, hook contract), `references/hook-engineering.md`, `schemas/review-gates.json` (A ≥ 9), `docs/ngon-hai-dang/FINAL_PRODUCTION_REPORT.md`, `docs/chiec-bat-goi-ten/script.md`.

### Kết luận: **7.7/10 — revise** · specificity/cảm xúc **7/10** · hook **7/10**

Ý tưởng mạnh và đúng mọi beat owner yêu cầu. Chưa đạt vì: (1) dị thường của hook rơi vào khoảng 4–5 s, không nằm trong 0–2 s, và frame 0 không phải cover; (2) thiếu artifact bắt buộc (`hook-options.md`, mảng phrases trong performance sidecar, bảng tone-probe); (3) phần twist (cùng toà nhà, ngày, giỗ) do narrator khẳng định chứ hình chưa chứng minh, và payoff gương bị gãy; (4) mẹ và câu "về ăn cơm" không được gieo trước 41 s, nên s11 thành thông tin chứ không phải callback.

### Bảng điểm

| # | Mục | Điểm | Bằng chứng |
|---|---|---|---|
| 1 | Fidelity (ràng buộc owner) | 9 | brief.md:16: thang 12 tầng dừng tầng 13 (s1–s2), hành lang giống hệt + niêm phong (s4), cửa nhà Linh hé (s6), có người xem tin cháy (s7–s8), ảnh nạn nhân là Linh (s9). Voice không đọc câu hư cấu (script.md:55). Owner không bắt buộc câu nguyên văn nào |
| 2 | Hook ≤3 s | **7** | 0–1 s: P01 hiện "11" rồi "12" (shotlist id1 visual), caption bắt đầu 0.1 s, frame 0 không có chữ. 1–3 s: chỉ là luật "chỉ có 12 tầng", chưa có gì bất thường. "13" lật theo cue "mười ba" ở cuối s2, khoảng 5.3 s tuyệt đối. Thiếu `hook-options.md` |
| 3 | Clarity (kể lại được trong 1 câu) | 8 | Kể lại được: "Linh chết cháy một năm trước; đêm giỗ đầu thang máy đưa hồn cô về tầng 13, nơi mẹ đang gọi cô về ăn cơm." Nhưng các mối nối cùng-toà-nhà và cùng-ngày do narrator nói, hình không chứng minh (P10 không có ngày), và payoff gương ở P16 vô nghĩa |
| 4 | Tự nhiên khi nói | 8 | Phần lớn tự nhiên. Có ba chỗ lệch: "Biển số" (nghe như biển số xe) và "phòng của cô" (phòng trọ/khách sạn) ở s6; s10 liệt kê ba mệnh đề như đọc kê khai |
| 5 | Timing | 8 | Đếm lại 161 âm tiết, mọi câu đều vừa slot. Nhưng script.md:62 ghi "297 syllables", sai sự thật. Khoảng 18–23 s không có lời, trái với memory owner "nghỉ ngắn" |
| 6 | Nguồn/độ chính xác | 8 | Hư cấu, không có claim thật (research.md:18). Có hai rủi ro: tên "CHUNG CƯ AN PHÚ" trên bản tin giả trùng địa danh thật, chưa kiểm; giỗ tính theo âm lịch nên "đúng một năm" dương lịch chưa chắc là giỗ đầu |
| 7 | Khả thi trong Remotion | 8 | Mọi panel 2.5D đều khả thi. Có ba chỗ hở: "Mẹ thì thầm" (s11) không có hình mẹ; tro bay trong cabin ở P16 mâu thuẫn không gian với P15; s7 lời nói "tivi đang bật" nhưng action ghi "TV flickers on" |
| 8 | **Specificity / cảm xúc** | **7** | Cảm giác lạnh có (niêm phong, ngày, tro). Thiếu cặp tương phản ở điểm xoay: mẹ xuất hiện lần đầu ở 41 s. Bát cơm "set for one" (P14) không được trả. s12 là câu hỏi chung chung "bạn có… không?", phá dư vị đau buồn. s10 tóm tắt hình thay vì cho cảm giác |
| 9 | Profile `story` | 8 | Nhân vật nhất quán (brief.md:31), có situation → turn → ending. Nhưng Linh không có mục tiêu chủ động (vì sao bước ra khỏi thang sau khi bấm đóng cửa?) |
| 10 | Voice direction | **6** | Không có `phrases` nên không làm được phép so byte. Không có pause before/after, tempo, seed. `emotion` mô tả Linh chứ không mô tả giọng narrator. Không có bảng tone-probe (voice-direction.md:38: "availability not checked") |

Trung bình (9+7+8+8+8+8+8+7+8+6)/10 = **7.7**. Điều kiện pass (≥ 9; hook ≥ 9; specificity ≥ 9; không mục nào < 8; không còn ticket Cao/Trung) **không đạt**.

### Quy trình kiểm tra (10 bước)

1. **Đọc như người xem.** Tôi chỉ đọc lời, theo slot. Cảm nhận: một chuỗi manh mối lạnh và sạch, twist "là Linh" rõ, câu của mẹ chạm nhưng đến muộn và lạ, vì mẹ chưa từng xuất hiện. Hai điểm dễ mất người xem: **0–2.8 s** (mới chỉ là một câu luật, chưa có gì lạ) và **~25–30 s** (s7 lặp nhịp "phát hiện → mô tả" lần thứ năm liên tiếp).
2. **Hook.** Chi tiết ở mục Hook gate. H1 thắng H2 và H3 là đúng, nhưng cách dựng trễ một nhịp so với quy tắc 0–2 dị thường / 2–4 phản ứng / 4–6 leo thang. Muted, frame 0 + 0–2 s chỉ là "CHUNG CƯ CHỈ CÓ 12 TẦNG" trên màn hình số "11" hoặc "12", chưa có xung đột. Không có mô tả frame-0 cover.
3. **Show/tell.** s1 tell (luật), s2 show, s3 show, s4 show, s5 show, s6 show, s7 show, s8 tell (tóm tắt bản tin), s9 show, s10 tell-ish (kể lại hình), s11 show, s12 tell (CTA). Không có hơn 2 tell liên tiếp, đạt.
4. **Thử nói.** Không câu nào vượt một hơi thở (~20 từ); dài nhất là s8 và s10, mỗi key 20 âm tiết chia thành 2 câu. Số đã viết bằng chữ. Dấu đúng hết. Lỗi tự nhiên: s6 "Biển số", "phòng của cô"; s10 kê khai. "…" ở s4/s5/s9/s11/s12: chưa biết Vbee đọc ra nghỉ bao lâu.
5. **Cấu trúc.** Situation s1–s2 → turn s8–s9 → ending s11–s12. Re-hook ở s5 (15.8–20.0, ngày "đúng một năm trước"), đạt. Highlight: script dùng đỏ cho 4 beat liền s8–s11, vượt giới hạn ≤3. Hold 0.8 s sau câu cuối, đạt. Climax (s9–s10) và CTA (s12) ở hai shot khác nhau, đạt. Cặp tương phản ở điểm xoay chưa có.
6. **Fidelity.** Không có câu bắt buộc nguyên văn. Năm beat tóm tắt của owner đều được dựng thành cảnh (xem mục 1 bảng điểm), không chép nguyên tóm tắt.
7. **Claims.** Không có claim thật. Rủi ro tên "An Phú" (P10) và âm lịch/giỗ: ticket A9, A10.
8. **Timing.** Đếm theo âm tiết cách nhau bằng dấu cách, từ `voice.proposed.json`: s1 9 · s2 11 · s3 12 · s4 15 · s5 10 · s6 16 · s7 13 · s8 20 · s9 7 · s10 20 · s11 13 · s12 15 = **161** (script.md:62 ghi 297, sai). Ở 4.3 syl/s, lời + nghỉ dấu câu / slot: s1 2.1/2.8 · s2 2.6+0.2/3.2 · s3 2.8+0.3/4.6 · s4 3.5+0.4/5.2 · s5 2.3+0.4/4.2 · s6 3.7+0.4/5.0 · s7 3.0+0.3/5.0 · s8 4.7+0.4/6.4 · s9 1.6+0.6/4.8 · s10 4.7+0.5/6.8 · s11 3.0+0.5/5.8 · s12 3.5+0.4+0.8 hold/6.2. Lời ≈ 37 s; cộng nghỉ và hold ≈ 42 s trên 60 s. Mọi câu vừa slot ở 4.3–4.8 syl/s với speed_rate 1.05. Ở 3.5 syl/s (giọng storytelling chậm), s6 (≈5.0 s) và s8 (≈6.3 s) sát hoặc vượt "slot − 0.08 s".
9. **Hợp đồng performance.** Không có phrases nên không ghép và so byte với `voice.proposed.json` được. Không có cue nào lọt vào lời/caption, đạt. Không bịa control cho engine, `unsupportedControls` được khai đúng, đạt. Pause chỉ dựa vào dấu câu.
10. **Săn điểm yếu.** Dưới đây là 18 ticket, mỗi ticket kèm câu hoặc chỉ dẫn thay thế.

### Hook engineering gate

- **0–1 s (frame 0):** P01 ECU đồng hồ thang đỏ "11", caption chưa hiện (bắt đầu 0.1 s). Đây không phải cover: không chủ thể bất thường, không chữ.
- **0–3 s:** lời "Chung cư nhà Linh chỉ có mười hai tầng." cùng caption "CHUNG CƯ CHỈ CÓ 12 TẦNG". Có luật nhưng chưa có vi phạm. Chi tiết "keeps climbing / flickers" (id1 action_beats 1.3–2.8) quá mờ để đọc khi tắt tiếng.
- **3–8 s first payoff:** "13" và cửa mở (≈4.4–5.5 s), phản ứng của Linh (P03). Payoff có thật, đạt.
- **Kết có trả lời lời hứa?** Có: tầng 13 là nơi hồn cô về đêm giỗ. Đạt.
- **So với candidate bị loại:** H3 / research #4 (gương trống) lộ twist trong 2 s nên loại đúng. H2 / research #2 (niêm phong) thiếu nhân vật. H1 thắng **về ý**, nhưng phải dựng sao cho mâu thuẫn "12 tầng ↔ 13" nằm **trong một frame từ frame 0**. TikTok cover line ở script.md:67 ("Chung cư 12 tầng. Thang máy dừng ở tầng 13.") mạnh hơn chính 3 s mở đầu của phim.
- **Artifact:** `docs/thang-may-tang-13/hook-options.md` **không tồn tại** (glob `docs/thang-may-tang-13/*`). Bảng 3 dòng ở script.md:12–16 thiếu các trường bắt buộc: chữ trong safe-zone, số âm tiết 0–3 s, payoff trước 8 s, rủi ro clickbait.
- Hook sub-score **7** < 9, chưa đạt.

### Tickets

`id | sev | where | evidence | concrete change | owner | acceptance`

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| A1 | **Cao** | s1–s2 / P01–P02 / shotlist id1–2 | "13" chỉ hiện khoảng 4.4–5.3 s; 0–2 s chỉ có luật; id2 `motion` ghi "flip on 'mười ba'" mâu thuẫn `action_beats` (flip ở 0–1.6 trên "đêm nay"); id1 `action_beats` đặt cue ngược ("mười hai tầng" 0–1.3 trước "chỉ có") | P01 frame 0: bảng nút 1–12 (không có 13) **và** đồng hồ đỏ đã sáng "12" trong cùng khung, caption "CHUNG CƯ CHỈ CÓ 12 TẦNG" hiện **từ frame 0**. Đồng hồ lật **12→13 ở ~1.5 s** (đúng cue "mười hai tầng", ≈1.3–2.0 s), caption amber "TẦNG 13" chen vào ≤2.0 s. Giữ nguyên lời s1. s2 (2.8–6.0) chỉ còn cửa mở + Linh rút tai nghe (phản ứng 2–4 s) + hành lang tối (leo thang 4–6 s). Sửa `action_beats` id1 theo đúng thứ tự lời; id2 bỏ "Display flips". Thêm mô tả frame-0 cover vào script.md | script-agent | Tắt tiếng, chỉ xem 0–2 s vẫn thấy "chỉ 12 tầng" mâu thuẫn với "13"; mọi `voice_cue` theo đúng thứ tự từ trong câu; script.md có mục frame-0 cover |
| A2 | **Cao** | thiếu `docs/thang-may-tang-13/hook-options.md` | hook-engineering.md:33,37; role yêu cầu có artifact | Tạo file: ≥3 candidate (H1, H2, H3 + research #3/#5), mỗi candidate đủ 5 trường (first frame + chữ safe-zone; lời 0–3 s + số âm tiết + hiểu được khi tắt tiếng; tension; payoff trước 8 s + payoff kết; rủi ro clickbait + lý do loại). Ghi ID candidate thắng vào `script.md` và `brief.md` | script-agent | File tồn tại, đủ 5 trường × ≥3 candidate, ID được tham chiếu ở script.md và brief.md |
| A3 | **Cao** | voice-direction.md:38 | Role: thiếu bảng tone-probe là Cao. Glob `**/tone-probe*` không thấy tool trong repo. Doc ghi "availability not checked", sai sự thật về trạng thái | Thay dòng 38 bằng: "`scripts/tone-probe.py` absent in repo (glob `**/tone-probe*`, 2026-11-07) → step **blocked**, reported to director", rồi thêm **bảng manual** theo key: các từ chồng thanh hoặc dễ nuốt cho giọng Bắc Anh Khôi (gợi ý soát: "nhúc nhích", "niêm phong", "hé mở", "nén nhang", "giỗ đầu", "thì thầm"), cột `risk / action`. Director ghi blocked qua pipeline | script-agent (+ director ghi blocked) | voice-direction.md có bảng tone (tool hoặc manual) và câu blocked kèm bằng chứng; không còn chữ "not checked" |
| A4 | **Trung** (Cao nếu director coi đây là contract fail) | voice-performance.proposed.json toàn bộ `shots` | Không có `phrases`, `pauseBefore/After`, `tempo`, `seed`/reference (SKILL Phase 2b). `emotion` mô tả nhân vật ("Linh: tired, unaware") chứ không mô tả giọng đọc | Mỗi key thêm `phrases` (ghép lại phải trùng byte với voice.proposed.json), `tempo` (vd s3 câu 1 "brisk", câu 2 "slow"), `pauseAfterSec` (dùng làm gap timeline), `seed: null` + ghi chú "Vbee không có seed". Đổi `emotion` thành giọng narrator (vd s1 "bình thản, kể sự thật"; s11 "dịu, nghẹn, gần thì thầm"), chuyển cảm xúc của Linh sang trường `characterState` | script-agent | Ghép phrases == voice.proposed.json cho mọi key; `emotion` là chỉ dẫn giọng đọc |
| A5 | **Trung** | script.md:62 | "297 syllables in 60 s" sai; đếm thật 161 | Sửa thành: "161 syllables (s1 9, s2 11, s3 12, s4 15, s5 10, s6 16, s7 13, s8 20, s9 7, s10 20, s11 13, s12 15); ≈37 s speech at 4.3 syl/s + planned pauses/holds". Re-budget slot theo số âm tiết và gap có chủ đích (brief cho phép ≤60 s, không bắt buộc đúng 60), **hoặc** dùng thời gian dư cho chi tiết giác quan ở A13/A14 | script-agent | Con số khớp recount; tổng gap không lời được liệt kê theo từng slot và mỗi gap đều có lý do |
| A6 | **Trung** | P10 (s8) + s1/P01 | Cùng toà nhà chỉ nối bằng "12 tầng"; tên toà nhà xuất hiện lần đầu ở P10; bản tin không có ngày | (a) P10 lower-third thêm **"07.11.2025"** (amber, cùng định dạng với seal P06). (b) Sửa lời s8: "Bản tin phát lại: chung cư mười hai tầng bốc cháy lúc nửa đêm." → "**Tivi đang chiếu lại bản tin cũ: chính chung cư này cháy lúc nửa đêm.**" (15 âm tiết so với 14 cũ, +1, vẫn vừa slot 6.4 s). (c) Tuỳ chọn: P03 màn hình khoá điện thoại "00:12 · 07.11" khớp timestamp 00:12 ở P10 (clue cho người xem lại) | script-agent | Tắt tiếng vẫn thấy cùng ngày ở seal và bản tin; lời nói rõ "chính chung cư này" |
| A7 | **Trung** | Payoff gương (script.md:33, P03, P16) | P16: cabin trống vì Linh không ở trong, nên gương phản chiếu trống không chứng minh gì. Tro bay trong cabin mâu thuẫn với việc Linh tan thành tro trong căn 1205 (P15) | P03: gương bên cạnh Linh **không có Linh** (mép khung, hơi out-focus, ~1.5 s, chỉ thấy khi xem lại). P16: bỏ tro trong cabin; cửa đóng trên cabin trống, đồng hồ "13" mờ dần. Sửa bảng foreshadow: "mirror beside Linh shows empty car (P03) → explained by s9" | script-agent | Bảng foreshadow chỉ có payoff hợp lệ; P16 không còn mâu thuẫn không gian |
| A8 | **Trung** | s11 / P15 | Lời kể hành động "Mẹ thì thầm" nhưng P15 chỉ có tay Linh, vi phạm cổng V3→V4 (v3v4 §2) | P15 dựng lại thành two-shot: tiền cảnh là tay Linh đang hoá tro, hậu cảnh là mẹ cúi đầu cắm nhang lên bát nhang, môi mấp máy (2.5D), lấy nét kéo từ mẹ (0–2.5 s) sang tay (2.5–5.6 s). Vẫn 16 panel | script-agent | Panel cho thấy mẹ nói (trước → nói → kết quả) trùng cue "giỗ đầu con" |
| A9 | **Trung** | research.md + P06/P14 + s5/s11 | Giỗ đầu tính theo âm lịch; "đúng một năm trước" theo dương lịch 07.11 có thể lệch ngày giỗ. Người xem Việt sẽ để ý | research.md thêm một dòng: "giỗ tính theo âm lịch". Rồi chọn một: P14 thêm tờ lịch bóc trên tường bàn thờ, số dương "7" lớn và dòng âm lịch nhỏ trùng ngày âm của vụ cháy (design tự tính và kiểm hai năm cho khớp), **hoặc** sửa lời s5 "đúng một năm trước" → "**cách đây đúng một năm, cũng đêm nay.**" và bỏ năm trên seal để không nối cứng với ngày dương. Ghi lại lựa chọn | script-agent | research có dòng âm lịch; ngày trên hình/lời không mâu thuẫn với giỗ đầu |
| A10 | **Trung** | P10 "CHÁY CHUNG CƯ AN PHÚ" | "An Phú" trùng địa danh thật (vd phường An Phú, TP.HCM) và có thể trùng tên chung cư thật. research.md:3 nói "invented" nhưng không ghi đã kiểm. Bản tin cháy giả gắn tên thật dễ gây hiểu lầm, nhất là khi người xem còn nhớ các vụ cháy chung cư thật | Bỏ tên: "CHÁY CHUNG CƯ 12 TẦNG — 07.11.2025", **hoặc** dùng tên bịa đã kiểm không trùng (ghi kết quả kiểm vào research.md). Logo đài tin phải là đài bịa | script-agent | research.md ghi bằng chứng kiểm tên; P10 không có tên thật |
| A11 | **Trung** | s9 (twist) | Nhịp ngưng quan trọng nhất phim chỉ dựa vào "…" mà Vbee có thể đọc ngắn (voice-direction.md:32) | Tách key: **s9a** "Ảnh nạn nhân hiện lên." / **s9b** "Là Linh." với gap timeline 0.6–0.8 s (sub-bass + ảnh trượt vào nằm trong gap). Cập nhật voice.proposed.json, performance, shotlist | script-agent | Hai key riêng, có gap ≥0.6 s ghi trong shotlist |
| A12 | **Trung** | s8–s11 captions | Đỏ dùng cho 4 beat liền (s8 "MỘT CÔ GÁI KHÔNG THOÁT RA", s9, s10, s11), vượt ≤3 highlight; đỏ bị loãng | s8 "MỘT CÔ GÁI KHÔNG THOÁT RA" → **white**. Đỏ chỉ còn "LÀ LINH", "DI ẢNH CỦA LINH", "GIỖ ĐẦU CON…" | script-agent | Tối đa 3 caption đỏ, gắn với 3 highlight beat |
| A13 | **Trung** (specificity) | s2/P03 → s11 | Mẹ và câu "về ăn cơm" không được gieo trước 41 s; s11 là thông tin, không phải callback; chưa có cặp tương phản ở điểm xoay | P03: Linh rút tai nghe, màn hình điện thoại sáng tin nhắn **"Mẹ: Về ăn cơm nhé con"** (chỉ là hình, không đọc). Cặp tương phản: tin nhắn thường ngày (P03) ↔ lời mời ngày giỗ (s11). Tuỳ chọn s11: "Mẹ thì thầm: giỗ đầu con…" → "**Mẹ thì thầm: hôm nay giỗ đầu con…** con về ăn cơm với mẹ nhé." (+2 âm tiết, vẫn vừa slot) | script-agent | Có một plant nhìn thấy trước 6 s và được s11 trả lại |
| A14 | **Trung** (specificity) | s12 | "Nếu đêm nay thang máy dừng ở tầng mười ba… bạn có bước ra không?" là câu hỏi CTA chung chung, lặp hook, kéo người xem ra khỏi dư vị đau buồn; bát cơm "set for one" (P14) không được trả | Kết bằng hình: P16 = cận cảnh bát cơm một đôi đũa trên bàn thờ, khói nhang nghiêng về phía cửa, rồi cắt sang cửa thang đóng, đồng hồ "13" tắt. Lời: "**Trên bàn thờ, bát cơm vẫn đầy. Đũa vẫn chờ một người.**" (12 âm tiết). Nếu director muốn giữ câu hỏi để kéo bình luận, chuyển nó vào caption/description, không đọc | script-agent | Câu cuối gắn với twist và có hình chứng minh; climax và kết vẫn khác shot; hold ≥0.8 s |
| A15 | Thấp | s6 | "Biển số" nghe như biển số xe; "phòng của cô" nghe như phòng trọ; đọc "một hai không năm" bỏ lỡ chỗ nhắc tầng 12 | "Chỉ một cánh cửa hé mở. Biển số ghi một hai không năm, phòng của cô." → "**Chỉ một cánh cửa hé mở. Căn mười hai không năm… nhà của cô.**" (14 âm tiết, −2). "Mười hai" trên một tầng 13 là thêm một clue. Caption "1205 — NHÀ CỦA CÔ" | script-agent | Lời mới trong voice.proposed.json và caption |
| A16 | Thấp | s10 | Ba mệnh đề kê khai, kể lại đúng cái hình đang chiếu | "Người trên ghế quay lại. Là mẹ cô, tay cầm nén nhang, bên bàn thờ có di ảnh của Linh." → "**Người trên ghế quay lại. Là mẹ. Sau lưng bà… di ảnh của Linh.**" (14 âm tiết). Thêm caption "LÀ MẸ CÔ" (white), vì khi tắt tiếng hiện chưa có chữ nào cho beat mẹ | script-agent | Caption s10 có beat mẹ; lời ≤15 âm tiết |
| A17 | Thấp | s3→s4 / s7 | Linh bấm đóng cửa rồi lại tự bước ra mà không có lý do (thiếu mục tiêu). s7 lời "tivi đang bật" nhưng P09 action "TV flickers on" | s4: "Hành lang giống hệt tầng nhà cô…" → "**Ngoài kia, hành lang giống hệt tầng nhà cô…**" và P05 cho thấy Linh nhìn thấy kệ giày quen trước khi bước ra (động cơ: quen thuộc). P09 action → "TV already on; glow pulses" | script-agent | Động cơ bước ra nhìn thấy được; action khớp lời |
| A18 | Thấp | research.md:8 + brief | Trùng cơ chế "nhân vật đã chết" với `ngon-hai-dang` (research.md:8; report của phim đó không mô tả twist). `chiec-bat-goi-ten` đã dùng mẹ + di ảnh + mất mát. Owner yêu cầu twist nên giữ, nhưng cần khác biệt rõ | Thêm vào brief.md mục "khác với phim trước": điểm khác là **lời mời ngày giỗ** (hồn được gọi về, không phải bị ám), không có thực thể và kết là đau buồn chứ không phải hù doạ. A13/A14 chính là bằng chứng cho khác biệt này | script-agent | brief.md có mục khác biệt cụ thể |

### Fix vòng trước

Không có (Round 1).

### Những gì chưa xác minh được (chỉ xác minh được sau voice/render/publish)

- Vbee đọc "…" và ":" thành khoảng nghỉ bao lâu; thời lượng thật của từng clip `s*.mp3` (ffprobe ở Join). s6/s8 có rủi ro tràn nếu giọng thực tế dưới khoảng 3.6 syl/s.
- `voiceCode hn_male_phuthang_stor_24k-stl` còn được gói hỗ trợ không (brief.md:48 tự ghi cần kiểm lại).
- Caption như "NẾU THANG MÁY DỪNG Ở TẦNG 13…" (28 ký tự) có wrap quá 2 dòng ở 1080 px với Be Vietnam Pro bold không; vị trí safe-zone TikTok.
- Ngày âm lịch thật của 07.11.2025 và 07.11.2026 (chưa tính, nên mới để thành ticket A9).
- "An Phú" có trùng chung cư thật không; 07.11.2025 có trùng vụ cháy thật nào không (chưa tra web).
- Retention 0–3 s, viewed vs swiped: chỉ đo được sau khi đăng.
- `python3 -I scripts/pipeline.py audit thang-may-tang-13`: **không chạy**. Reviewer không có shell, và caller dặn không chạy pipeline.py. Director cần chạy.

### Điều kiện pass Round 2

Đóng A1–A14 (Cao/Trung) theo đúng acceptance; recount âm tiết sau khi sửa lời; hook sub-score ≥9 (frame 0 có mâu thuẫn 12/13); specificity ≥9 (có plant mẹ + payoff bát cơm hoặc tương đương); phrases ghép trùng byte cho mọi key (kể cả s9a/s9b nếu tách).

## Round 2

Reviewer: `script-reviewer-2`, context sạch, độc lập: không viết các file này và không làm Round 1. Ngày 2026-11-07.
Đầu vào đã đọc: `brief.md`, `research.md`, `hook-options.md`, `script.md`, `shotlist.json`, `voice.proposed.json`, `voice-direction.md`, `voice-performance.proposed.json`, `image-prompts.md` (chỉ để đối chiếu art route), `status.json` (grep), `.claude/skills/ray-phim-ke-chuyen/SKILL.md` (NO_CARTOON_ART_V1 :8–16, HOOK_0_6_60S_V1 :165–167, SOFT_FADE :213–217, RAY_V030 :222–228), `references/v3v4-retention-action-qa-v030.md`, `references/horror-frame-direction-v1.md`, `.agents/skills/ray-pineline-worflow-agent/references/hook-engineering.md`, `docs/SHORTS_RETENTION_PLAYBOOK.md`. Phần hình ảnh không thuộc Gate A; tôi chỉ chấm kế hoạch shot.

### Kết luận: **8.3/10 — revise** · specificity/cảm xúc **9/10** · hook **8/10**

Bản này tốt hơn hẳn Round 1. Hook đã có mâu thuẫn 12↔13 ngay trong 2 s đầu. Cặp tin nhắn "về ăn cơm" (P03) ↔ lời mẹ thì thầm (s12) ↔ bát cơm đầy (s13) là một mạch cảm xúc thật. Twist được tách thành hai clip, có khoảng lặng thật. Ghép phrases trùng byte cho cả 13 key. Vẫn chưa pass vì bốn lý do:
1. script.md:60 ghi art route là "vector illustration… Not photoreal", trái với luật owner NO_CARTOON_ART_V1, luật được đặt ra chính vì phim này.
2. Nhịp 2–4 s của hook chưa có phản ứng của nhân vật (SKILL.md:167).
3. A9 chưa đạt acceptance.
4. Còn ba lỗ hổng voice→hình/timing mới: "cũng lúc nửa đêm" chưa có hình chứng minh, mẹ quay lại trên ảnh photoreal, s7 sát trần slot.

### Bảng điểm

| # | Mục | Điểm | Bằng chứng |
|---|---|---|---|
| 1 | Fidelity (owner) | 8 | Đủ năm beat owner (brief.md:16): s1–s2, s4, s6, s7–s8, s9–s10. Không đọc disclaimer (script.md:56). **Nhưng** script.md:60 viết "original 2D/2.5D vector illustration… Not photoreal", trái với SKILL.md:10–14 (owner đã loại art hoạt hình của *chính phim này*) và trái với image-prompts.md:1 ("photoreal, NO_CARTOON_ART_V1") |
| 2 | Hook | **8** | Frame 0: bảng nút 1–12 (không có 13), đồng hồ "12", caption trắng "CHUNG CƯ CHỈ CÓ 12 TẦNG" từ 0.0 (shotlist id1 caption_beats). Lật 12→13 ở 1.5 s, caption amber "TẦNG 13" từ 1.5 s, khớp đúng lúc lời "mười hai tầng" (≈1.4–2.1 s ở 4.3 syl/s), nên tắt tiếng vẫn hiểu. **Lỗi:** 2.0–2.8 vẫn là insert P01, 2.8–4.2 là cửa mở P02, Linh xuất hiện lần đầu ở **4.2 s** (P03, id2 action_beats 1.4–3.2). Quy tắc 2–4 s "phản ứng nhân vật nhìn thấy được" (SKILL.md:167, v3v4 §1) chưa đạt |
| 3 | Clarity | 9 | Kể lại được trong một câu: "Linh chết cháy một năm trước; đêm giỗ đầu, thang máy đưa hồn cô lên một tầng 13 giống hệt tầng nhà mình, nơi mẹ đang gọi cô về ăn cơm." Nối cùng toà nhà/cùng ngày bằng hình: P10 lower third 07.11.2025 + bồn nước trên mái (shotlist id8 visual), P11 "căn 1205" |
| 4 | Tự nhiên khi nói | 8 | Phần lớn là văn nói. Ba chỗ lệch: s7 "tivi đang bật" rồi ngay sau đó s8 "Tivi đang chiếu lại…" lặp đầu câu; s3 "cabin" là token tiếng Anh, không có trong bảng tone; s12 "giỗ đầu con…" hơi cụt so với cách mẹ nói thật ("hôm nay giỗ đầu con") |
| 5 | Timing | 8 | Đếm lại 159 âm tiết, khớp script.md:64: s1 9 · s2 11 · s3 14 · s4 15 · s5 12 · s6 14 · s7 17 · s8 21 · s9 5 · s10 2 · s11 14 · s12 13 · s13 12. Ở 4.0 syl/s cộng nghỉ dấu câu, **s7 ≈ 4.25 + 0.65 = 4.9 s so với trần 4.92 s**: không còn dư, đúng chỗ ranh giới BODY→CLIMAX 30.0 s. Gap 0.7 s gán hai nơi khác nhau (shotlist id9 `transition_out` "carried by s10 slot" ↔ performance s9 `pauseAfterSec` 0.7). Chưa có bảng gap theo slot (phần dư của A5) |
| 6 | Nguồn/chính xác | 8 | Hư cấu, P10 đã bỏ tên thật. Nhưng research.md:3 vẫn viết "the building name 'An Phú' is invented", nên câu "removed everywhere" ở script.md:85 sai. research.md chưa có dòng âm lịch (A9). Seal P06 và P10 vẫn ghi năm 2025 cạnh "giỗ đầu" |
| 7 | Khả thi trong Remotion | 8 | Kế hoạch V3→V4 có trước → hành động → kết quả cho hầu hết beat (script.md:57). Hai chỗ hở: s5 nói "cũng lúc nửa đêm" nhưng P06 chỉ có ngày (shotlist id5 visual); s11 "Người trên ghế quay lại" dự định "2.5D head/shoulder layers" (id11 motion), và trên ảnh photoreal tĩnh cách này sẽ méo mặt |
| 8 | **Specificity / cảm xúc** | **9** | Mỗi beat có chi tiết giác quan: tiếng ù cáp, đèn tắt phụt, muội trần, mép giấy niêm phong rung, mùi nhang, ánh tivi xanh, tro đầu ngón tay, bát cơm đầy. Cặp tương phản ở điểm xoay: tin nhắn thường ngày (P03) ↔ lời mời ngày giỗ (s12). Đúng 3 highlight đỏ, có hold sau câu cuối. Câu kết là hình chứ không phải CTA. Đọc lên thấy buồn chứ không chỉ hiểu. Còn non hai chỗ: plant điện thoại có thể bị bỏ lỡ (A30), và "chờ một người" yếu hơn một callback "về" (A29) |
| 9 | Profile `story` | 9 | Có mục tiêu (về nhà) và động cơ bước ra: đèn cabin tắt, chỉ còn ánh hành lang (s3, id3 motion). Đi đủ situation → turn → ending. Nhân vật nhất quán (brief.md:35–36) |
| 10 | Voice direction | 8 | Có `phrases`, narrator `emotion`, `characterState`, `tempo`, `pauseAfterSec`, `seed: null`. `unsupportedControls` khai trung thực (voice-performance:14–21). Có bảng tone (voice-direction.md:37–53). Nhưng `tempo: slow` ở 10/13 key (s4–s13), trái memory owner "nói nhanh hơn, nghỉ ngắn" (brief.md:19). Metadata này không tác động lên engine nhưng chỉ sai hướng cho voice stage. Gap s9 gán hai nơi |

Trung bình (8+8+9+8+8+8+8+9+9+8)/10 = **8.3**. Điều kiện pass: overall ≥ 9 ✗; hook ≥ 9 ✗; specificity ≥ 9 ✓; không mục nào < 8 ✓; không còn Cao/Trung ✗. Kết quả: **revise**.

### Quy trình kiểm tra (10 bước)

1. **Đọc như người xem.** Đọc riêng lời theo slot. Cảm nhận: luật bị phá ngay, rồi một chuỗi manh mối lạnh (niêm phong → ngày → cửa nhà mình → tivi), twist "Là Linh" sau một khoảng lặng thật, và cái kết làm thắt lòng nhờ bát cơm. Chỗ dễ mất người xem: **~25–30 s**. Đây là nhịp "phát hiện → mô tả" thứ năm liên tiếp, và s7→s8 lặp "Tivi đang…".
2. **Hook.** Xem mục Hook gate. H1 vẫn là lựa chọn mạnh nhất. Cover line trùng với 2 s đầu. Thiếu phản ứng ở 2–4 s.
3. **Show/tell.** s1 tell (luật, nhưng có hình phá luật cùng lúc) · s2 show · s3 show · s4 show · s5 show · s6 show · s7 show · s8 tell (thuật lại bản tin) · s9 show · s10 show · s11 show · s12 show · s13 show. Không có tell nào liên tiếp. Đạt.
4. **Thử nói.** Câu dài nhất là s8, 21 âm tiết chia ba cụm, vẫn trong một hơi mỗi cụm. Số viết bằng chữ ("mười hai không năm"). Dấu tiếng Việt đúng ở cả lời lẫn caption. Grep không thấy "..." ASCII, NBSP hay khoảng trắng kép trong `voice*.json`. Lỗi: "cabin" (s3), "Tivi đang" lặp (s7/s8).
5. **Cấu trúc.** HOOK 0–6, BODY 6–30, CLIMAX 30–48 (hai tầng: bản tin → ảnh → "Là Linh"; mẹ quay lại → di ảnh), ENDING 48–60, khớp SKILL.md:167. Re-hook ở s5 (15.8–20.0, "một năm trước"). Cặp tương phản: tin nhắn (P03) ↔ s12. Đỏ chỉ ở s10, s11, s12: **3 cảnh liên tiếp, đúng mức tối đa**, s8 đã chuyển sang trắng. Climax (s9–s11) và kết (s13) ở hai shot khác nhau. Hold 0.8 s, fade-to-black. Chuyển cảnh: s9 `cut-on-silence` là hard cut owner không yêu cầu (SKILL.md:217). s11/s12 fade 0.6 s nằm ngoài khoảng 0.35–0.55 s của brief.md:12 (SKILL cho phép 0.6–0.8 cho đoạn "memory", nên chấp nhận được nếu ghi lý do).
6. **Fidelity.** Owner không bắt buộc câu nguyên văn nào. Năm beat tóm tắt đều được dựng thành cảnh, không chép nguyên văn. Luật owner NO_CARTOON_ART_V1 bị script.md:60 trái (A19).
7. **Claims.** Không có claim thật. "chính chung cư này" được chứng minh bằng hình (bồn nước, 12 tầng). Rủi ro còn lại: âm lịch/giỗ (A9) và dòng "An Phú" cũ trong research (A26).
8. **Timing.** Mỗi key, lời ở 4.0 / 4.5 syl/s (cộng nghỉ ≈0.15 cho dấu phẩy, 0.25 cho dấu chấm hoặc hai chấm, 0.35 cho "…") so với trần slot − 0.08: s1 2.25/2.0 vs 2.72 · s2 2.9/2.6 vs 3.12 · s3 4.0/3.6 vs 4.52 (thêm 0.25 nếu đọc "ca bin") · s4 4.1/3.7 vs 5.12 · s5 3.5/3.2 vs 4.12 · s6 4.1/3.7 vs 4.92 · **s7 4.9/4.4 vs 4.92** · s8 5.75/5.2 vs 6.32 · s9 1.25+0.7 gap vs 2.32 · s10 0.5 vs 2.32 · s11 4.35/4.0 vs 6.72 · s12 3.85/3.5 vs 5.72 · s13 3.4+0.8 hold vs 6.12. Lời ≈ 37–45 s. Tổng slot 60.000 s. Join sẽ retime theo clip đo thật (script.md:64), nên runtime thật sẽ khoảng 50–56 s.
9. **Hợp đồng performance.** Ghép phrases bằng một dấu cách: đọc trực tiếp 13 key, thứ tự và nối đúng. Dùng một pattern literal duy nhất grep cả hai file: `voice.proposed.json` khớp **13/13** câu canonical, `voice-performance.proposed.json` khớp **24/24** phrase (1+1+3+1+1+2+3+3+1+1+3+2+2), `shotlist.json` narration khớp 13/13. Như vậy cả ba file dùng cùng chuỗi byte, loại được lệch NFC/NFD và lệch ký tự "…". Không có cue nào lọt vào lời hay caption. Không bịa control. Pause chủ đích là gap timeline (s9 0.7, s13 0.8), không dựa vào dấu câu. Đạt.
10. **Săn điểm yếu.** Ticket A19–A32 bên dưới, mỗi ticket có câu hoặc chỉ dẫn thay thế cụ thể.

### Hook engineering gate

- **0–1 s (frame 0 = cover):** ECU bảng nút 1–12 sáng, không có nút 13, đồng hồ đỏ "12", caption trắng "CHUNG CƯ CHỈ CÓ 12 TẦNG" từ frame 0 (shotlist id1 visual + caption_beats[0]). Có chủ thể và có lời hứa căng thẳng ("chỉ có…"). Đạt.
- **1–3 s:** 1.5 s đồng hồ lật 13 + "ding", caption amber "TẦNG 13" thay chỗ. Đúng lúc đó lời đọc "mười hai tầng", nên chữ, tiếng và hình cùng tạo một mâu thuẫn. Đây là dị thường trong 0–2 s. Đạt. Nhưng 2.0–2.8 s chưa có người.
- **2–4 s phản ứng:** **không có.** 2.8–4.2 là cửa mở (P02), một hình leo thang chứ không phải phản ứng. Linh chỉ xuất hiện ở 4.2–6.0 (P03). Thứ tự đang là dị thường → leo thang → phản ứng, ngược với 0–2 / 2–4 / 4–6 (A20).
- **3–8 s first payoff:** cửa mở trên tầng 13 (≈3–4 s), Linh phản ứng + tin nhắn mẹ (4.2–6 s), cửa không chịu đóng và đèn tắt (6–10.6 s). Payoff có thật, đạt.
- **Kết có trả lời lời hứa?** Có: tầng 13 là tầng nhà cô trong đêm giỗ, nơi mẹ gọi cô về. Đạt.
- **So với candidate bị loại:** H3 (gương trống, hook-options.md:9) lộ twist trong 2 s nên loại đúng, và đã giữ lại làm clue xem lại ở P03. H2 (niêm phong, :8) thiếu nhân vật và "vì sao đêm nay", nên làm BODY là đúng. H5 (âm thanh, :11) mất khi tắt tiếng. H1 thắng xứng đáng.
- **Artifact:** `hook-options.md` có 5 candidate × 5 trường. ID H1 được tham chiếu ở script.md:12 và brief.md:25. Đạt.
- Hook sub-score **8**: hình và chữ 0–2 s đủ mạnh cho 9, nhưng thiếu nhịp phản ứng 2–4 s bắt buộc. Sau khi đổi thứ tự P02/P03 (A20) thì đạt 9.

### Xác minh ticket Round 1 (theo acceptance, không dựa vào bảng tự khai)

| id | Kết quả | Bằng chứng |
|---|---|---|
| A1 | **fixed** (phần dư → A20) | Frame 0 có 1–12 + "12" + caption từ 0.0. Lật ở 1.5 s. Cue id1 đúng thứ tự lời. id2 không còn "Display flips". Mục frame-0 ở script.md:12. Tắt tiếng 0–2 s thấy 12 ↔ 13. Phần "phản ứng 2–4 s" trong concrete change của A1 chưa làm: tách thành A20 |
| A2 | **fixed** | hook-options.md có H1–H5, đủ 5 trường; ID ở script.md:12, brief.md:25 |
| A3 | **fixed** (phía tài liệu) | voice-direction.md:39 có câu blocked kèm bằng chứng glob và bảng manual :41–53. Grep `status.json` không thấy bản ghi blocked của director: **director còn nợ**, không phải ticket script |
| A4 | **fixed** | Xem bước 9: 13/13 canonical, 24/24 phrase, join đúng. `emotion` là giọng narrator, `characterState` tách riêng |
| A5 | **fixed** (phần dư Thấp → A32) | script.md:64 ghi 159, khớp recount của tôi. Chưa có bảng gap theo slot. Rủi ro chính được cơ chế retime ở Join xử lý (script.md:64) |
| A6 | **fixed** | s8 "chính chung cư này"; P10 lower third "CHÁY CHUNG CƯ 12 TẦNG — 07.11.2025" + bồn nước trên mái (id8 visual) |
| A7 | **fixed** | Gương trống ở P03 (id2 visual), payoff ở s10. P16 là bàn thờ, không còn tro trong cabin |
| A8 | **fixed** | P15 two-shot: mẹ thì thầm ở hậu cảnh, tay hoá tro ở tiền cảnh (id12) |
| A9 | **not fixed** | Acceptance yêu cầu (1) "research có dòng âm lịch": research.md **không có**. (2) "ngày trên hình/lời không mâu thuẫn với giỗ đầu": seal P06 (id5 visual, "07.11.2025") và P10 vẫn ghi năm dương, cạnh "một năm trước" + "giỗ đầu". Không làm theo phương án nào trong hai phương án (không có lịch âm, không bỏ năm). Câu "no calendar arithmetic shown" ở script.md:84 không đúng: chính hình đang mời người xem tự tính |
| A10 | **fixed** ở P10 (phần dư → A26) | P10 không còn tên thật. research.md:3 vẫn ghi "An Phú is invented"; script.md:85 "removed everywhere" sai |
| A11 | **fixed** | s9 / s10 là hai key riêng, gap 0.7 s (performance s9 `pauseAfterSec`). Chỗ gán gap không thống nhất → A25 |
| A12 | **fixed** | Đỏ chỉ ở s10, s11, s12 (3 cảnh liên tiếp, đúng tối đa). s8 trắng |
| A13 | **fixed** | P03 điện thoại "Mẹ: Tối nay về ăn cơm nhé con", được s12 + s13 trả lại. Độ đọc được → A30 |
| A14 | **fixed** | s13 + P16 bát cơm, hold 0.8 s, kết khác shot với climax |
| A15 | **fixed** | s6 dùng đúng câu đề xuất; caption "CĂN 1205 — NHÀ CỦA CÔ" |
| A16 | **fixed** | s11 + caption "LÀ MẸ CÔ" (14 âm tiết) |
| A17 | **fixed** | Đèn cabin tắt là động cơ (id3). P09 "TV already on" |
| A18 | **fixed** | brief.md:23–25 |

### Tickets mới (Round 2)

`id | sev | where | evidence | concrete change | owner | acceptance`

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| A9 | **Trung** (mở lại) | research.md · P06 · P10 · script.md:84 | Xem bảng xác minh. Giỗ đầu tính theo âm lịch; ngày âm của 07.11.2025 và 07.11.2026 không trùng nhau (năm Ất Tỵ 2025 có tháng nhuận) | (1) research.md thêm: "Giỗ tính theo âm lịch. Phim không nêu ngày dương của 'đêm nay'; chỉ ghi ngày xảy ra vụ cháy." (2) **Bỏ năm** trên seal P06 và lower third P10, chỉ giữ "07.11" (hoặc chỉ giữ giờ, xem A21), để "một năm trước" và "giỗ đầu" không bị ép vào phép tính dương lịch. Không đưa ngày hôm nay lên điện thoại hay bất kỳ màn hình nào. (3) Sửa script.md:84 cho đúng | script-agent | research có dòng âm lịch; không frame nào ghi đủ ngày/tháng/năm dương của vụ cháy kèm ngày hiện tại |
| A19 | **Cao** NEW | script.md:60 | "Art route: original 2D/2.5D vector illustration… Not photoreal" trái với NO_CARTOON_ART_V1 (SKILL.md:10–14: owner loại art hoạt hình của chính phim này) và trái với image-prompts.md:1. Agent downstream đọc script.md có thể dựng lại đúng thứ owner đã loại. HANDOFF.md:20 cũng có câu này (thuộc director) | Thay script.md:60 bằng: "**Art route: cinematic photoreal frames from an approved image model per [image-prompts.md](image-prompts.md) (NO_CARTOON_ART_V1). '2.5D' = camera/parallax/light/particle motion on those photoreal frames; in-frame text composited in Remotion. Not independent human acting; mouth/turn beats disclosed as limited motion.**" Director sửa HANDOFF.md:20 giống vậy | script-agent (+ director cho HANDOFF) | Grep `vector\|Not photoreal` trong `docs/thang-may-tang-13/*.md` (trừ script-review.md) = 0 |
| A20 | **Trung** NEW | s2 / P02–P03 / shotlist id2 | HOOK 2–4 s phải có phản ứng nhân vật nhìn thấy được (SKILL.md:167; v3v4 §1). Hiện 2.8–4.2 là cửa (P02), Linh xuất hiện ở 4.2 | Đổi thứ tự trong id2: **P03 trước (2.8–4.2 abs)**: Linh ngẩng nhìn đồng hồ "13", rút tai nghe, điện thoại sáng. **P02 sau (4.2–6.0)**: cửa trượt mở vào hành lang tối, khớp lời "dừng ở tầng mười ba" (leo thang). action_beats: `0–1.4 "đêm nay" → Linh looks up, earbud out, phone lights` / `1.4–3.2 "tầng mười ba" → doors part onto dark corridor`. Caption giữ nguyên. Cập nhật hook-options/script.md:16 | script-agent | Trong 2.0–4.0 s abs có ít nhất 1.2 s mặt hoặc tay Linh phản ứng; 4–6 s là cửa mở/hành lang |
| A21 | **Trung** NEW | s5 / P06 (+P03, P10) | Lời nói giấy niêm phong ghi "cũng lúc nửa đêm", nhưng P06 chỉ có ngày (id5 visual): một clue được đọc lên mà không có hình chứng minh (v3v4 §2). "cũng" ngầm nói bây giờ là nửa đêm, điều chưa được cho thấy | Seal P06 composite: "**00:12 — 07.11**" (giờ bằng amber). P03 màn hình khoá điện thoại hiện đồng hồ "**00:12**" phía trên tin nhắn mẹ (chỉ giờ, không ngày, xem A9). P10 lower third thêm "00:12". Người xem tắt tiếng sẽ thấy giờ hiện tại = giờ vụ cháy | script-agent | Ba frame P03/P06/P10 cùng có "00:12"; không frame nào có ngày hiện tại |
| A22 | **Trung** NEW | s7 / voice.proposed.json:8 | 17 âm tiết + 1 dấu phẩy + 2 dấu chấm ≈ 4.9 s ở 4.0 syl/s, so với trần 4.92 s, mà direction lại là "slow / rất khẽ". Nếu tràn thì theo script.md:64 phải viết lại và chạy lại Gate A | "Bên trong, tivi đang bật. Mùi nhang phảng phất. Có người ngồi quay lưng về phía cô." → "**Bên trong, tivi đang bật. Mùi nhang phảng phất. Trên ghế, có người ngồi quay lưng.**" (16 âm tiết, ≈4.65 s ở 4.0). Còn gieo luôn "ghế" cho s11 "Người trên ghế quay lại". Caption giữ "CÓ NGƯỜI NGỒI QUAY LƯNG". Cập nhật phrases, shotlist id7 | script-agent | s7 ≤ 16 âm tiết; ước lượng ở 4.0 syl/s + nghỉ ≤ 4.7 s; join phrases == canonical |
| A23 | **Trung** NEW | s11 / P13 / shotlist id11 motion | "Người trên ghế quay lại" là một hành động lời kể. Kế hoạch "2.5D head/shoulder layers (~1 s eased)" trên **một** ảnh photoreal sẽ méo mặt và không có trước → hành động → kết quả thật (v3v4 §2; horror-frame-direction :32) | P13 gồm hai nguồn: **trước** = crop lưng mẹ từ P09 (búi tóc xám, sofa), **hành động** = crossfade 0.4 s + push nhẹ, **kết quả** = P13 mặt mẹ quay về phía cửa. Ghi "limited 2D motion (two-plate crossfade)" trong id11 motion. Làm tương tự cho môi mấp máy ở P15: ghi là limited motion, không gọi là lip-sync | script-agent | id11 có before/action/result với asset ref riêng cho lưng và mặt; không còn head-layer warp trên một ảnh |
| A24 | Thấp NEW | s3 / voice.proposed.json:4 | "cabin" là token tiếng Anh, không có trong bảng tone (voice-direction.md:41–53); Vbee có thể đọc theo tiếng Anh | "Đèn cabin tắt phụt." → "**Đèn trong thang tắt phụt.**" (5 âm tiết). Caption "ĐÈN TRONG THANG TẮT PHỤT". Hoặc giữ "cabin" và thêm dòng tone + kiểm ASR | script-agent | Không còn token tiếng Anh chưa qua bảng tone |
| A25 | Thấp NEW | shotlist id9 `transition_out` · performance s9 · id11/id12 fades | Gap 0.7 s gán hai nơi khác nhau. "cut-on-silence" là hard cut owner không yêu cầu (SKILL.md:217). Fade 0.6 s ở s11/s12 nằm ngoài 0.35–0.55 s (brief.md:12) | id9 `transition_out` → "**soft-fade-0.35s inside the 0.7 s silence after s9 clip (gap belongs to s9 slot)**". id11/id12 hoặc đổi về 0.5 s, hoặc ghi lý do "memory passage, SKILL.md:215 allows 0.6–0.8" | script-agent | Một nguồn duy nhất cho gap; không còn hard cut không lý do; mọi fade >0.55 s có lý do |
| A26 | Thấp NEW | research.md:3 · brief.md:9 · script.md:85 | research còn câu "An Phú is invented"; brief ghi "12 narration scenes" trong khi thực tế là 13; script.md:85 "removed everywhere" chưa đúng (rules 01-status-truth). Horror-frame-direction :12 gợi ý 8–12 narration scene, 13 cũng được nếu ghi lý do (tách twist) | research.md:3 → "No real building name is used; the fictional news shows 'CHUNG CƯ 12 TẦNG' only." brief.md:9 → "13 narration scenes (twist split s9/s10)" (brief do director sở hữu) | script-agent + director | Grep "An Phú" trong docs/thang-may-tang-13/*.md (trừ review) = 0; brief ghi 13 |
| A27 | Thấp NEW | s7→s8 / voice.proposed.json:9 · id8 caption | "Tivi đang bật." rồi ngay sau là "Tivi đang chiếu lại…", hai câu liền nhau cùng mở bằng "Tivi đang", nghe như đọc. Caption "BỐC CHÁY" lệch với lời "cháy" | s8 → "**Trên màn hình là bản tin cũ: chính chung cư này cháy lúc nửa đêm. Một cô gái không thoát ra.**" (21 âm tiết, không đổi). Caption "CHÍNH CHUNG CƯ NÀY CHÁY" | script-agent | Không có hai câu liền nhau cùng mở đầu; caption khớp lời |
| A28 | Thấp NEW | s12 | "giỗ đầu con…" cụt; mẹ Việt sẽ nói "hôm nay giỗ đầu con" | "**Mẹ thì thầm: hôm nay giỗ đầu con… con về ăn cơm với mẹ nhé.**" (15 âm tiết; ≈4.35 s ở 4.0 so với trần 5.72). Caption "“HÔM NAY GIỖ ĐẦU CON…”" (đỏ) | script-agent | Lời mới vừa slot; phrases cập nhật |
| A29 | Thấp NEW (specificity) | s13 | "Đũa vẫn chờ một người" đẹp nhưng chung chung. "về" đã xuất hiện ở tin nhắn và lời mẹ; khép lại bằng "về" lần thứ ba sẽ đau hơn | "Trên bàn thờ, bát cơm vẫn đầy. Đũa vẫn chờ một người." → "**Trên bàn thờ, bát cơm vẫn đầy. Đôi đũa vẫn chờ Linh về.**" (13 âm tiết). Caption amber "ĐÔI ĐŨA VẪN CHỜ LINH VỀ" | script-agent | Câu cuối là callback "về"; hold ≥0.8 s giữ nguyên |
| A30 | Thấp NEW (specificity) | P03 plant | Tin nhắn 30 ký tự trong MCU 1.8 s, cạnh caption "THANG MÁY DỪNG Ở TẦNG 13": người xem lần đầu dễ không đọc kịp, mà plant là gốc của cặp tương phản | Rút gọn thành "**Mẹ: Về ăn cơm nhé con**", điện thoại chiếm ≥15 % khung, giữ ≥1.5 s. Ở P15, điện thoại rơi cạnh bàn tay hoá tro, màn hình sáng lại đúng tin đó khi mẹ nói "về ăn cơm" (hình, không đọc) | script-agent | Tin nhắn hiện ≥2 lần (P03, P15); ≤22 ký tự |
| A31 | Thấp NEW | voice-performance s4–s13 `tempo` · voice-direction.md:20–29 | 10/13 key ghi "slow", trái memory owner "nói nhanh hơn, nghỉ ngắn" (brief.md:19). Vbee không có tempo theo câu, nên đây là chỉ dẫn sai hướng | s4–s8 → `tempo: "even"`. Chỉ giữ "slow" ở s9–s13 (twist/kết). Ghi rõ: "speed_rate 1.05 global; tempo là ghi chú ý đồ, không phải control" | script-agent | Tối đa 5 key "slow"; khớp brief.md:19 |
| A32 | Thấp (phần dư A5) | script.md:62–64 | Acceptance A5 yêu cầu liệt kê gap không lời theo từng slot | Thêm bảng `key / est. speech @4.3 / designed gap / reason` (vd s11: 3.6 s lời, 3.1 s tilt-up bàn thờ; s13: 3.0 s lời, ≥0.8 s hold + fade). Ghi runtime dự kiến sau Join (≈52–56 s) | script-agent | Mỗi slot có gap kèm lý do |

### Săn điểm yếu (≥3, có câu viết lại)

1. s7→s8 lặp "Tivi đang" → A27: "Trên màn hình là bản tin cũ: …".
2. s13 "Đũa vẫn chờ một người." → A29: "Đôi đũa vẫn chờ Linh về."
3. s12 "giỗ đầu con…" → A28: "hôm nay giỗ đầu con…".
4. s7 sát trần slot → A22: "Trên ghế, có người ngồi quay lưng."
5. Hook 2–4 s chưa có người → A20: đổi P03 lên trước P02.

### Những gì chưa xác minh được

- Thời lượng thật của từng clip Vbee và độ dài khoảng nghỉ thực tế ở "…" và ":". s7 có rủi ro tràn nếu giọng dưới ~4.0 syl/s (A22 xử lý trước).
- Cách Vbee đọc "cabin", "tivi" (ASR ở voice stage).
- Plant điện thoại và gương trống ở P03 có đọc được trên điện thoại thật không. Chỉ biết sau khi có frame photoreal và render.
- Caption dài nhất ("“CON VỀ ĂN CƠM VỚI MẸ NHÉ”", 26 ký tự) có giữ ≤2 dòng trong safe-zone TikTok không.
- 07.11.2025 có trùng một vụ cháy chung cư thật nào không (chưa tra web; A9 bỏ năm sẽ giảm rủi ro này).
- Retention 0–3 s, viewed vs swiped, rewatch cho clue gương: chỉ đo được sau khi đăng.
- Director chưa ghi tone-probe blocked trong `status.json` (grep không thấy).
- `python3 -I scripts/pipeline.py audit thang-may-tang-13`: **không chạy**. Reviewer không có shell, và caller dặn không chạy pipeline.py. Director cần chạy.

### Điều kiện pass Round 3

Đóng A9, A19, A20, A21, A22, A23 theo đúng acceptance. Recount âm tiết và kiểm lại join phrases sau mỗi lần đổi lời (A22, và A24/A27/A28/A29 nếu nhận). Hook ≥9 sau A20; specificity giữ ≥9. Không re-litigate các ticket A1–A8, A10–A18 đã đóng.

## Round 3

Reviewer: `script-reviewer-3`, context sạch, độc lập: không viết các file này và không làm Round 1–2. Ngày 2026-11-08.
Đầu vào đã đọc: `brief.md`, `research.md`, `hook-options.md`, `script.md`, `shotlist.json`, `voice.proposed.json`, `voice-direction.md`, `voice-performance.proposed.json`, `image-prompts.md`, HANDOFF.md (grep). Tôi mở 6 frame nguồn để kiểm tính khả thi: `frames/p01.png`, `p03.png`, `p09.png`, `p13.png`, `p15.png`, `p16.png`. Phần trau chuốt hình thuộc gate D; ở đây chỉ ghi những gì làm hỏng kế hoạch shot đã duyệt.

### Kết luận: **8.8/10 — revise** · specificity/cảm xúc **9/10** · hook **9/10**

Bản script đã gần đạt: lời, nhịp, hook và mạch cảm xúc đều đạt chuẩn 9. Chưa pass vì còn 4 việc nhỏ, mỗi việc chỉ cần sửa một hai dòng:
1. **A19 (Cao)** còn sót một dòng: HANDOFF.md:20 vẫn ghi art route là vector, không photoreal.
2. **A9 (Trung)** còn sót hai dòng: brief.md:42 và script.md:18 vẫn ghi "07.11.2025".
3. **A35 (Trung, NEW):** di ảnh trên bàn thờ ở P09 đọc rõ được mặt ở giây 26–30, lộ twist 10 s trước "Là Linh". Ghi chú build "thay bằng crop P14" sẽ làm lộ nặng hơn, vì P14 chính là di ảnh của Linh.
4. **A34 (Trung, NEW):** voice-direction.md vẫn trỏ tới câu cũ "chờ một người", không còn trong canonical.

Nếu cả bốn được đóng đúng acceptance, Round 4 có thể pass mà không phải viết lại lời.

### Bảng điểm

| # | Mục | Điểm | Bằng chứng |
|---|---|---|---|
| 1 | Fidelity (owner) | 9 | Đủ năm beat owner (brief.md:16) ở s1–s2, s4, s6, s7–s8, s9–s10. script.md:60 nay ghi photoreal Gemini + NO_CARTOON_ART_V1. Không đọc disclaimer (script.md:56). Tài liệu director (HANDOFF.md:20, brief.md:42) còn mâu thuẫn, xem A19/A9 |
| 2 | **Hook** | **9** | Frame 0 (id1): panel 1–12, đồng hồ "12", caption trắng từ 0.0. Lật 13 ở 1.5 s, caption amber "TẦNG 13". Từ 2.8 s Linh ngẩng nhìn và rút tai nghe (id2 action_beats 0–1.4, P03); từ 4.2 s cửa mở ra hành lang tối (P02). Thứ tự dị thường → phản ứng → leo thang đã đúng SKILL.md:167. Frame P03 thật cho thấy rõ phản ứng: mặt ngẩng, tay ở tai nghe, điện thoại sáng. Lỗi asset của P01 chuyển sang gate D (xem Hook gate) |
| 3 | Clarity | 9 | Kể lại được trong một câu: "Đêm giỗ đầu, hồn Linh, người chết trong vụ cháy chung cư, được thang máy đưa về một tầng 13 giống hệt nhà mình, nơi mẹ đang mời cô về ăn cơm." Nối cùng giờ bằng "00:12" trên P03/P06/P10 (id2, id5, id8 visual) |
| 4 | Tự nhiên khi nói | 9 | Hết "cabin", hết lặp "Tivi đang", có thêm "hôm nay giỗ đầu con". Câu dài nhất là s8, 21 âm tiết chia 3 cụm. Chỉ còn một chỗ hơi văn viết: "Ngày ghi trên giấy… là một năm trước" (A37) |
| 5 | Timing | 9 | Tôi đếm lại 162 âm tiết, khớp script.md:64 (chi tiết ở bước 8). Ở 4.1 syl/s cộng nghỉ dấu câu, mọi key đều dưới mức slot − 0.08. Chặt nhất là s2 (2.83 so với 3.12) và s7 (≈4.7 so với 4.92). Có bảng gap (script.md:115–131) |
| 6 | Nguồn/chính xác | 9 | Hư cấu, không có tên thật (research.md:3). Dòng âm lịch ở research.md:13. Shotlist không ghi năm ở bất kỳ màn hình nào |
| 7 | Khả thi trong Remotion | 8 | Kế hoạch V3→V4 đủ cho mọi beat; A23 crossfade hai ảnh khả thi (P09 có lưng mẹ, P13 có mặt mẹ). Còn hở: P09 làm lộ di ảnh (A35). Lưng mẹ ở P09 là ghế bành ánh xanh, P13 là sofa ánh vàng, nên crossfade sẽ thành cú nhảy (gate D). Join retime có thể nuốt mất 3.6 s hành động ở s11 (A38) |
| 8 | **Specificity / cảm xúc** | **9** | Mạch "về" giờ khép đủ ba lần: tin nhắn P03 "Mẹ: Về ăn cơm nhé con" → s12 "con về ăn cơm với mẹ nhé" → s13 "Đôi đũa vẫn chờ Linh về". Chi tiết giác quan có ở mọi beat (đèn tắt phụt, muội trần, mép giấy rung, mùi nhang, tro đầu ngón tay, bát cơm đầy). P16 thật là bàn thờ với bát cơm và đôi đũa gác ngang, di ảnh mờ phía sau: hình đủ sức giữ 0.8 s hold. Đọc lên thấy buồn, không chỉ hiểu |
| 9 | Profile `story` | 9 | Có mục tiêu (về nhà theo tin nhắn), có động cơ bước ra (đèn trong thang tắt). Đi đủ situation → turn → ending. Nhân vật nhất quán trong các frame đã mở (áo mưa vàng mù tạt, tóc bob; mẹ áo len đỏ sẫm, búi tóc xám) |
| 10 | Voice direction | 8 | Sidecar sạch: phrases khớp, tempo đã đổi, `unsupportedControls` khai trung thực, accentWords đều là chuỗi con của canonical. Nhưng bảng người đọc trong voice-direction.md chưa cập nhật: :20–29 vẫn ghi "slow" cho s4–s13, :29 nhấn "chờ một người", :53 dòng tone "Đũa vẫn chờ một người." (A34) |

Trung bình (9+9+9+9+9+9+8+9+9+8)/10 = **8.8**. Điều kiện pass: overall ≥ 9 ✗; hook ≥ 9 ✓; specificity ≥ 9 ✓; không mục nào < 8 ✓; không còn Cao/Trung ✗ (A19 Cao; A9, A34, A35 Trung). Kết quả: **revise**.

### Quy trình kiểm tra (10 bước)

1. **Đọc như người xem.** Đọc riêng lời theo slot. Cảm nhận: luật bị phá ngay ở 1.5 s, có mặt người phản ứng trước 3 s. Sau đó là chuỗi manh mối lạnh, rồi khoảng lặng thật trước "Là Linh", rồi mẹ, rồi bát cơm. Cái kết đọng buồn. Chỗ dễ mất người xem: **~25–30 s**. Đây vẫn là nhịp "phát hiện → mô tả" thứ năm liên tiếp, nhưng "Trên ghế, có người ngồi quay lưng" tạo được một câu hỏi mới nên đã giữ được. Nếu người xem kịp đọc di ảnh ở P09 (26–30 s), twist sẽ mất trước 38.8 s (A35).
2. **Hook.** Xem mục Hook gate. H1 vẫn là lựa chọn đúng; nhịp 0–2 / 2–4 / 4–6 đã đúng thứ tự.
3. **Show/tell.** s1 tell (nhưng hình phá luật cùng lúc) · s2–s7 show · s8 tell (thuật lại bản tin) · s9–s13 show. Không có tell liên tiếp. Đạt.
4. **Thử nói.** Không câu nào vượt một hơi. Số viết bằng chữ. Dấu tiếng Việt đúng ở cả lời và caption (đọc trực tiếp 13 key và 26 caption_beats). Không còn token tiếng Anh nào ngoài "tivi" (đã Việt hoá). Chỗ hơi văn viết: s5 "Ngày ghi trên giấy… là một năm trước" (A37, Thấp).
5. **Cấu trúc.** HOOK 0–6 / BODY 6–30 / CLIMAX 30–48 / ENDING 48–60, khớp SKILL.md:167 (shotlist `phase`). Re-hook ở s5 (15.8 s). Cặp tương phản: tin nhắn P03 ↔ lời mẹ s12. Caption đỏ chỉ ở id10 "LÀ LINH", id11 "DI ẢNH CỦA LINH", id12 "“HÔM NAY GIỖ ĐẦU CON…”", tức 3 cảnh liên tiếp, đúng tối đa. Climax (s9–s11) và kết (s13) ở hai shot khác nhau. Hold 0.8 s + fade-to-black. Fade 0.4–0.6 s, hai fade 0.6 có lý do (script.md:106). Không có hard cut, shake hay flash.
6. **Fidelity.** Owner không bắt buộc câu nguyên văn nào. Năm beat tóm tắt đều được dựng thành cảnh, không chép nguyên văn. NO_CARTOON_ART_V1: script.md:60 đạt; HANDOFF.md:20 chưa (A19).
7. **Claims.** Không có claim thật. Âm lịch được ghi ở research.md:13. Còn hai dòng ghi "07.11.2025" ở brief.md:42 và script.md:18 (A9).
8. **Timing.** Đếm từ `voice.proposed.json`: s1 9 · s2 11 · s3 15 · s4 15 · s5 12 · s6 14 · s7 16 · s8 21 · s9 5 · s10 2 · s11 14 · s12 15 · s13 13 = **162**. Ở 4.1 syl/s, cộng ≈0.15 cho dấu phẩy, 0.25 cho dấu chấm hoặc hai chấm giữa câu, 0.35 cho "…", so với trần (slot − 0.08): s1 2.2 / 2.72 · s2 2.83 / 3.12 · s3 4.16 / 4.52 · s4 4.1 / 5.12 · s5 3.43 / 4.12 · s6 4.0 / 4.92 · s7 4.7 / 4.92 · s8 5.6 / 6.32 · s9 1.22 + 0.7 gap / 2.32 · s10 0.5 / 2.32 · s11 4.2 / 6.72 · s12 4.26 / 5.72 · s13 3.32 + 0.8 hold / 6.12. Tất cả vừa. Tổng slot 60.000 s.
9. **Hợp đồng performance.** Tôi không chạy chương trình ghép chuỗi (không có shell). Cách kiểm thật sự: (a) đọc trực tiếp các mảng `phrases` của cả 13 key và ghép bằng một dấu cách; thứ tự và dấu câu khớp canonical. (b) Grep pattern literal cho 9 phrase chứa "…", dấu phẩy hoặc dấu hai chấm (s3c, s4, s5, s6b, s7c, s8b, s11c, s12b, s13b): mỗi pattern khớp ở cả `voice.proposed.json`, `voice-performance.proposed.json` và `shotlist.json` (9/9/9). Grep 15 phrase còn lại: perf 15/15, voice 11 dòng, đủ cho 13 key. Vậy ba file dùng cùng chuỗi byte. Mọi `accentWords` đều là chuỗi con của câu. Không có cue nào lọt vào lời hay caption. Không bịa control (`unsupportedControls` khai đúng). Pause chủ đích là gap timeline (s9 0.7, s13 0.8). Lỗi duy nhất nằm ở tài liệu người đọc, voice-direction.md (A34).
10. **Săn điểm yếu.** Xem các ticket NEW và mục "Săn điểm yếu".

### Hook engineering gate

- **0–1 s (frame 0 = cover):** id1: bảng nút 1–12, đồng hồ đỏ "12", caption trắng "CHUNG CƯ CHỈ CÓ 12 TẦNG" từ 0.0. Đạt về kế hoạch. **Asset `frames/p01.png` có lỗi phải sửa ở gate D:** lưới nút thiếu số **8**, có **hai nút "1"**, có một **nút trống** ở góc trên phải ngay cạnh "12" (dễ bị đọc thành nút thứ 13), và còn hai nút nữa ở mép dưới khung. Màn hình LED có sẵn vệt số ma, cần mask trước khi composite "12"/"13". Cover dựa hoàn toàn vào ý "panel chỉ đến 12", nên đây là must-fix của gate D (composite lại số nút hoặc regenerate). Không trừ điểm ở gate A.
- **1–3 s:** 1.5 s lật 13 + "ding", caption amber "TẦNG 13", đúng lúc lời "mười hai tầng". Tắt tiếng vẫn hiểu. Đạt.
- **2–4 s phản ứng:** P03 từ 2.8 s abs. `frames/p03.png` có mặt Linh ngẩng lên, hoảng, tay ở tai nghe, điện thoại sáng. Đạt (độ dài cửa sổ xem A20 bên dưới).
- **4–6 s leo thang:** P02 cửa trượt mở ra hành lang tối từ 4.2 s. Đạt.
- **3–8 s first payoff:** tầng 13 mở ra, Linh phản ứng, cửa không đóng và đèn tắt (6–10.6 s). Đạt.
- **Kết có trả lời lời hứa?** Có: tầng 13 là nhà của hồn Linh trong đêm giỗ đầu. Đạt.
- **So với candidate bị loại:** H3 (gương trống) lộ twist trong 2 s, nên đúng là chỉ giữ làm clue xem lại. Lưu ý gate D: `p03.png` có một vệt vàng áo mưa ở mép trái gương (khoảng x 0–30, y 980–1150 trên ảnh hiển thị), làm yếu clue "không có bóng", cần xoá. H2 (niêm phong) không có người. H5 mất khi tắt tiếng. H1 thắng xứng đáng.
- **Artifact:** `hook-options.md` có H1–H5 × 5 trường. Đạt.
- **Hook sub-score 9.** Chỉ xác minh được sau render và đăng: tỷ lệ dừng xem ở 0–3 s, và việc người xem có đọc ra "chỉ đến 12" trên panel khi lướt nhanh hay không.

### Xác minh ticket Round 2 (theo acceptance, không dựa vào bảng tự khai ở script.md:95–113)

| id | Kết quả | Bằng chứng |
|---|---|---|
| A9 | **not closed** (Trung) | Đạt: research.md:13 có dòng âm lịch; shotlist id5 seal "day and month only (no year)", id8 lower third chỉ "00:12", id2 điện thoại "00:12 (no date)". Chưa đạt: **brief.md:42** (environment bible mà design/composite đọc) vẫn ghi seal "dated **07.11.2025**", và **script.md:18** vẫn ghi "date 07.11.2025 on screen". Cả hai trái acceptance và trái script.md:101. Xem A9 Round 3 |
| A19 | **not closed** (Cao, phần dư thuộc director) | script.md:60 đạt. Grep `vector\|Not photoreal` (trừ review): **HANDOFF.md:20** "Art route is original 2D/2.5D vector illustration (Remotion layers), not photoreal" vẫn còn. HANDOFF.md:9 là ghi chép lịch sử về art bị loại, tôi **loại khỏi** acceptance. board/make_art.py là file rác đã ghi nhận ở HANDOFF.md:9 |
| A20 | **fixed** (phần dư Thấp → A20b) | id2: P03 trước (0–1.4 rel = 2.8–4.2 abs), P02 sau (1.4–3.2 rel). Cửa sổ 2.0–4.0 abs có đúng 1.2 s Linh (2.8–4.0), nhưng fade 0.4 s từ s1 ăn vào đầu cửa sổ, nên mặt thấy rõ chỉ khoảng 0.9–1.0 s |
| A21 | **fixed** | "00:12" ở id2 (P03), id5 (P06), id8 (P10); không có ngày hiện tại |
| A22 | **fixed** | s7 16 âm tiết; ≈4.7 s ở 4.1 syl/s; join khớp |
| A23 | **fixed** | id11 motion: "back-of-head plate (crop of P09) crossfades 0.4 s into the P13 face plate (no warping)". Cả hai ảnh nguồn đều có thật. Rủi ro ánh sáng/ghế chuyển sang gate D |
| A24 | **fixed** | "Đèn trong thang tắt phụt." ở voice, perf, shotlist, caption |
| A25 | **fixed** | id9 `transition_out` "soft-fade-0.4s (the 0.7 s silence is the tail of s9's own slot)"; fade 0.6 có lý do (script.md:106) |
| A26 | **fixed** | research.md:3 "no building name is used"; brief.md:9 "13 narration scenes". "An Phú" chỉ còn trong board/make_art.py (file rác đã loại) |
| A27 | **partly fixed** (Thấp, còn mở) | Lời đã đổi. Caption id8 vẫn là "CHÍNH CHUNG CƯ NÀY BỐC CHÁY" (script.md:44, shotlist id8), trong khi lời là "cháy". Acceptance "caption khớp lời" chưa đạt |
| A28 | **fixed** | s12 15 âm tiết, caption đỏ "“HÔM NAY GIỖ ĐẦU CON…”" |
| A29 | **fixed** ở voice/caption | s13 "Đôi đũa vẫn chờ Linh về.", caption amber khớp. Không được lan sang voice-direction.md → A34 |
| A30 | **closed (disagree chấp nhận)** | Tin nhắn "Mẹ: Về ăn cơm nhé con" (21 ký tự ≤ 22). Bỏ lần hiện thứ hai ở P15: tôi chấp nhận, vì `frames/p15.png` thật không có điện thoại và callback bằng lời đã đủ mạnh |
| A31 | **partly fixed** (Thấp, gộp vào A34) | voice-performance đã đổi tempo. Bảng voice-direction.md:20–28 vẫn ghi "slow" cho s4–s12 |
| A32 | **fixed** | script.md:115–131 có bảng gap theo slot |

### Tickets Round 3

`id | sev | where | evidence | concrete change | owner | acceptance`

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| A19 | **Cao** (phần dư) | HANDOFF.md:20 | Vẫn ghi "vector illustration… not photoreal", trái NO_CARTOON_ART_V1 và script.md:60 | Thay HANDOFF.md:20 bằng: "**Art route: 16 photoreal Gemini frames (`frames/p01..p16.png`, NO_CARTOON_ART_V1); 2.5D = camera/parallax/light/particles/crossfades on those photos; all in-frame text composited in Remotion; limited motion disclosed.**" | director | Grep `vector\|not photoreal` (không phân biệt hoa thường) trong `docs/thang-may-tang-13/*.md`, trừ script-review.md và dòng lịch sử HANDOFF.md:9, ra 0 kết quả |
| A9 | **Trung** (phần dư) | brief.md:42 · script.md:18 | Hai dòng còn ghi "07.11.2025", trái shotlist và research.md:13 | brief.md:42 "…white paper seals with a red stamp on every door, dated **07.11.2025**." → "…, handwritten **day/month + 00:12, no year** (see research.md lunar note)." script.md:18 "date 07.11.2025 on screen" → "**timestamp 00:12 on screen (no year)**" | director (brief) + script-agent (script.md) | Grep `2025` trong `docs/thang-may-tang-13/*.md`, trừ script-review.md và bảng lịch sử Round 1 ở script.md:81, ra 0 kết quả |
| A34 | **Trung** NEW | voice-direction.md:20–29, :53 | Tài liệu voice stage đọc vẫn trỏ tới câu đã xoá: cột emphasis s13 "chờ một người", dòng tone "Đũa vẫn chờ một người.". Tempo "slow" ở s4–s13 trái sidecar và brief.md:19 (phần dư A31). Rubric 10 yêu cầu phrase-to-canonical khớp chính xác | :29 emphasis → "vẫn đầy, chờ Linh về". :53 → `| "Đôi đũa vẫn chờ Linh về." | s13 | "Đôi đũa" onset + falling "về" may clip | keep 0.8 s hold after |`. Cột tempo :20–29 chép đúng từ `voice-performance.proposed.json` (s4–s8, s10–s12 "natural, unhurried"; s9 "natural"; s13 "natural, settled"). Thêm dòng tone cho "bàn thờ" (s13) và "Mẹ thì thầm" (s12, "thì thầm" sau dấu hai chấm) | script-agent | Mọi cụm trong cột emphasis và cột word của bảng tone là chuỗi con của `voice.proposed.json`; cột tempo trùng sidecar từng key |
| A35 | **Trung** NEW | shotlist id7 / P09 (25–30 s) · ghi chú build "thay di ảnh P09 bằng crop P14" | `frames/p09.png`: bàn thờ ở giữa-phải khung, có nến chiếu sáng, di ảnh tóc bob đọc được mặt, 10 s trước "Là Linh" (38.8 s). Nếu thay bằng crop P14 (chính là di ảnh Linh) thì twist lộ hoàn toàn ở 26 s. Shotlist chỉ ghi "altar glimpsed at right edge", chưa cấm mặt đọc được | id7 `visual` P09 thêm: "**altar stays as the incense/candle plant, but the portrait is unreadable: defocused + darkened, or occluded by incense smoke, or cropped out; no legible face before s10. The wall calendar shows no highlighted day.**" Bỏ kế hoạch thay bằng crop P14 ở P09. Di ảnh Linh chỉ xuất hiện rõ lần đầu ở P14 (s11), sau ảnh TV ở P11 | script-agent (+ gate D thực hiện mask) | id7 visual có câu cấm mặt đọc được; frame P09 sau build, xem ở kích thước 1080×1920, không nhận ra được mặt di ảnh |
| A20b | Thấp | id1→id2 chuyển cảnh 2.8 s | Fade 0.4 s làm mặt Linh chỉ thấy rõ ~0.9–1.0 s trong cửa sổ 2–4 s (acceptance A20 là ≥1.2 s) | Hoặc đổi id1 `transition_out` thành soft-fade-0.25s, hoặc bắt đầu P03 lúc 2.5 s abs (crossfade 0.3 s dưới đuôi s1, sau khi "TẦNG 13" đã hiện 1.0 s) | script-agent | Mặt Linh rõ ≥1.2 s trong 2.0–4.0 s abs |
| A27 | Thấp (còn mở) | id8 caption_beats[0] · script.md:44 | "BỐC CHÁY" lệch lời "cháy" | Caption → "**CHÍNH CHUNG CƯ NÀY CHÁY**" | script-agent | Caption trùng từ trong lời |
| A36 | Thấp NEW | script.md:3, :19 · id2 `camera` | :3 "Round 2 after Gate A round 1 (7.7…)", đã cũ. :19 vẫn trích "giỗ đầu con… con về ăn cơm…", khác lời s12 hiện tại. id2 `camera` "Locked insert on doors, then MCU push on Linh" ngược thứ tự panel sau A20 | :3 → "Round 3 after Gate A round 2 (8.3, revise)". :19 → "mother whispers \"hôm nay giỗ đầu con… con về ăn cơm với mẹ nhé\"". id2 camera → "**MCU push on Linh, then locked insert on doors**" | script-agent | Không còn mô tả nào trong script.md/shotlist trái với canonical hoặc thứ tự panel |
| A37 | Thấp NEW | s5 / P06 | Seal không có năm (A9), nên tờ giấy không tự chứng minh "một năm trước"; câu "Ngày ghi trên giấy… là một năm trước" hơi văn viết | Giữ lời (narrator là nguồn, caption "MỘT NĂM TRƯỚC" đỡ phần tắt tiếng). id5 visual thêm "**seal paper yellowed and dusty, stamp ink faded**" để hình tự nói giấy đã cũ. Tuỳ chọn lời (12 âm tiết, không đổi): "**Giấy niêm phong ghi… một năm trước, cũng lúc nửa đêm.**", nếu sửa thì cập nhật phrases và chạy lại join | script-agent | id5 visual có dấu hiệu giấy cũ; nếu đổi lời thì join == canonical |
| A38 | Thấp NEW | script.md:64 (Join retime) · s11, s13 | "Re-timed to its measured clip + hold" có thể cắt mất phần im lặng đã thiết kế: s11 cần 3.6 s cho mẹ quay + tilt-up bàn thờ (V3→V4), s13 cần chỗ cho hold | Thêm vào script.md:64: "**Join keeps a per-slot visual minimum: s11 ≥ 6.0 s, s12 ≥ 5.0 s, s13 ≥ clip + 0.8 s hold + 1.0 s settle; other slots may shrink to clip + 0.3 s.**" | script-agent | script.md ghi mức tối thiểu cho các slot có hành động hình dài |

**Gửi gate D (ghi nhận, không tính điểm A):** (1) P01: composite lại lưới nút 1–12 cho đúng (thiếu 8, hai nút "1", nút trống cạnh "12", hai nút ở mép dưới), mask số ma trên LED. (2) P03: xoá vệt vàng ở mép trái gương. (3) P09 lưng mẹ (ghế bành, ánh xanh) ↔ P13 mặt mẹ (sofa, ánh vàng): khớp màu và nền trước khi crossfade A23. (4) P15: mẹ đứng và nét, khác "soft focus" và khác tư thế ngồi ở P13; chấp nhận được nhưng nên làm mờ hậu cảnh đúng như kế hoạch. (5) P16 đạt: bát cơm, đôi đũa gác ngang, di ảnh mờ.

### Săn điểm yếu (≥3, có câu viết lại)

1. Twist lộ sớm qua di ảnh P09 → A35: "portrait unreadable… no legible face before s10".
2. Caption s8 lệch lời → A27: "CHÍNH CHUNG CƯ NÀY CHÁY".
3. s5 "Ngày ghi trên giấy… là một năm trước" → A37: "Giấy niêm phong ghi… một năm trước, cũng lúc nửa đêm."
4. Hook 2–4 s bị fade ăn mất một phần → A20b: P03 vào lúc 2.5 s.

### Những gì chưa xác minh được

- Thời lượng thật của từng clip Vbee và độ dài nghỉ ở "…" và ":". s2 và s7 là hai key sát trần nhất.
- `voiceCode hn_male_phuthang_stor_24k-stl` còn được gói hỗ trợ không (brief.md:52).
- Panel P01 sau khi composite có đọc ra "chỉ đến 12" khi lướt nhanh trên điện thoại không; tin nhắn P03 có đọc kịp không. Chỉ biết sau render.
- Mặt di ảnh ở P09 sau mask có còn nhận ra không (A35, cần xem frame đã build).
- Caption dài nhất ("“CON VỀ ĂN CƠM VỚI MẸ NHÉ”") có giữ ≤2 dòng trong safe-zone TikTok không.
- 10 frame còn lại (p02, p04–p08, p10–p12, p14) tôi chưa mở; tính nhất quán toàn bộ thuộc gate D.
- Retention 0–3 s, viewed vs swiped, rewatch: chỉ đo được sau khi đăng.
- Director chưa ghi tone-probe blocked trong `status.json` (Round 2 ghi nhận; tôi không kiểm lại).
- `python3 -I scripts/pipeline.py audit thang-may-tang-13`: **không chạy**. Reviewer không có shell, và caller dặn không chạy pipeline.py. Director cần chạy.

### Điều kiện pass Round 4

Đóng A19 (HANDOFF.md:20), A9 (brief.md:42, script.md:18), A34, A35 theo đúng acceptance. Các ticket Thấp nên làm cùng lúc vì đều là sửa một dòng. Nếu đổi lời (A37) thì đếm lại âm tiết và kiểm lại join. Không re-litigate A1–A8, A10–A18, A20–A26, A28–A30, A32 đã đóng. Round 4 phải do một reviewer mới làm.

## Round 4

Reviewer: `script-reviewer-4`, context sạch, độc lập: không viết các file này và không làm Round 1–3. Ngày 2026-11-08.
Đầu vào đã đọc: `brief.md`, `research.md`, `hook-options.md`, `script.md`, `shotlist.json`, `voice.proposed.json`, `voice-direction.md`, `voice-performance.proposed.json`, `image-prompts.md`, `HANDOFF.md`, Round 1–3 của file này. Tôi mở hai plate để kiểm acceptance A35 và cover: `public/images/thang-may-tang-13/p09.jpg`, `frames/p09.png`, `public/images/thang-may-tang-13/p01.jpg`. Lời thoại **không đổi** so với Round 3: 13 key, 162 âm tiết.

### Kết luận: **8.9/10 — revise** · specificity/cảm xúc **9/10** · hook **9/10**

Lời, hook, mạch cảm xúc và timing đều đạt chuẩn 9, không cần sửa câu nào. A19, A9 và A35 đã đóng đúng acceptance. Chưa pass chỉ vì **một dòng** trong bảng tone của voice-direction.md: dòng :49 `"nén nhang" (removed) / "nhang"` vẫn còn. Acceptance A34 (Round 3) đòi mọi cụm ở cột word phải là chuỗi con của `voice.proposed.json`, mà "nén nhang" thì không có trong canonical. Tôi không hạ chuẩn của vòng trước, nên A34 vẫn mở ở mức Trung. Cách sửa là xoá dòng :49 hoặc rút còn `| "nhang" | s7 | … |`. Sửa xong là đủ điều kiện pass, không phải viết lại lời.

### Bảng điểm

| # | Mục | Điểm | Bằng chứng |
|---|---|---|---|
| 1 | Fidelity (owner) | 9 | Đủ năm beat owner (brief.md:16) ở s1–s2, s4, s6, s7–s8, s9–s10. Art route photoreal được ghi nhất quán ở script.md:60, HANDOFF.md:10 và image-prompts.md:1. Voice không đọc disclaimer (script.md:56) |
| 2 | **Hook** | **9** | id1: frame 0 có panel 1–12, đồng hồ "12" và caption trắng "CHUNG CƯ CHỈ CÓ 12 TẦNG" từ 0.0. Đồng hồ lật 13 ở 1.5 s, caption amber "TẦNG 13". id2 cho Linh phản ứng từ 2.8 s (P03), cửa mở từ 4.2 s (P02). Thứ tự 0–2 dị thường / 2–4 phản ứng / 4–6 leo thang đúng SKILL.md HOOK_0_6. Lỗi asset P01 vẫn còn, thuộc gate D (xem Hook gate) |
| 3 | Clarity | 9 | Kể lại được trong một câu: "Đêm giỗ đầu, hồn Linh, cô gái chết trong vụ cháy chung cư, được thang máy đưa về một tầng 13 giống hệt nhà mình, nơi mẹ đang mời cô về ăn cơm." Mối nối cùng giờ: "00:12" xuất hiện ở P03, P06 và P10 |
| 4 | Tự nhiên khi nói | 9 | Câu dài nhất là s8, 21 âm tiết chia ba cụm. Không có token tiếng Anh, số đã viết bằng chữ. Còn đúng một chỗ hơi văn viết ở s5 (W1, Thấp) |
| 5 | Timing | 9 | Đếm lại 162 âm tiết (chi tiết ở bước 8), mọi key đều dưới mức slot − 0.08 s. Có bảng gap (script.md:115–131) và mức tối thiểu khi Join (script.md:147–149) |
| 6 | Nguồn/chính xác | 9 | Hư cấu, không dùng tên toà nhà (research.md:3). Có dòng giỗ tính theo âm lịch (research.md:13). Không màn hình nào ghi năm (shotlist id5, id8; brief.md:42) |
| 7 | Khả thi trong Remotion | 9 | Mọi beat được kể đều có trước → hành động → kết quả nhìn thấy được. A35 đã đóng: di ảnh ở P09 không đọc được. A38 đã đóng: có mức tối thiểu cho s11–s13. Rủi ro còn lại ở crossfade P09→P13 (ghế bành ánh xanh sang sofa ánh vàng) thuộc gate D |
| 8 | **Specificity / cảm xúc** | **9** | Mạch "về" khép đủ ba lần: tin nhắn ở P03 → s12 "con về ăn cơm với mẹ nhé" → s13 "Đôi đũa vẫn chờ Linh về". Beat nào cũng có chi tiết giác quan: đèn tắt phụt, giấy niêm phong ố vàng, mùi nhang, ánh tivi xanh, tro ở đầu ngón tay, bát cơm đầy. Đúng 3 highlight đỏ, hold 0.8 s. Đọc lên thấy buồn, không chỉ hiểu |
| 9 | Profile `story` | 9 | Có mục tiêu (về nhà theo tin nhắn của mẹ) và động cơ bước ra (đèn trong thang tắt). Đi đủ situation → turn → ending. Plate P09 khớp character bible: búi tóc xám, áo len đỏ sẫm, áo mưa vàng ở mép khung |
| 10 | Voice direction | **8** | Sidecar sạch: 13/13 key join khớp, tempo và emphasis trong voice-direction.md:17–29 trùng sidecar từng key, có dòng tone mới cho s13, "bàn thờ" và "Mẹ thì thầm". Nhưng :49 vẫn là dòng `"nén nhang" (removed)`, một cụm không có trong canonical, nên acceptance A34 chưa đạt. Thêm một chỗ hơi lệch: s12 `emotion` "gần thì thầm" (:28) cạnh dòng tone "must not perform a whisper voice" (:55). Hai ý này tương thích ("nói khẽ hơn", không diễn giọng thì thầm), nhưng nên ghi rõ (W3) |

Trung bình (9+9+9+9+9+9+9+9+9+8)/10 = **8.9**. Điều kiện pass: overall ≥ 9 ✗; hook ≥ 9 ✓; specificity ≥ 9 ✓; không mục nào < 8 ✓; không còn Cao/Trung ✗ (A34 Trung). Kết quả: **revise**.

### Quy trình kiểm tra (10 bước)

1. **Đọc như người xem.** Đọc riêng lời theo slot. Luật bị phá ngay ở 1.5 s, có mặt người phản ứng trước 3 s. Tiếp theo là chuỗi manh mối lạnh, khoảng lặng thật trước "Là Linh", rồi mẹ quay lại, rồi bát cơm. Cái kết đọng buồn, kể lại được. Chỗ dễ mất người xem nhất vẫn là **~25–30 s**, nhịp "phát hiện → mô tả" thứ năm liên tiếp. "Trên ghế, có người ngồi quay lưng" mở ra một câu hỏi mới nên vẫn giữ được người xem. Di ảnh ở P09 không còn lộ twist.
2. **Hook.** Xem mục Hook gate. H1 đúng, thứ tự 0–2 / 2–4 / 4–6 đúng.
3. **Show/tell.** s1 tell (hình phá luật cùng lúc) · s2–s7 show · s8 tell (thuật lại bản tin) · s9–s13 show. Không có hai tell liền nhau. Đạt.
4. **Thử nói.** Không câu nào dài quá một hơi. Dấu tiếng Việt đúng ở cả 13 key và 26 caption_beats (đọc trực tiếp shotlist.json). Chỗ còn hơi văn viết là s5 (W1).
5. **Cấu trúc.** Phase trong shotlist khớp HOOK 0–6 / BODY 6–30 / CLIMAX 30–48 / ENDING 48–60. Re-hook ở s5 (15.8 s). Cặp tương phản: tin nhắn P03 ↔ lời mẹ s12. Caption đỏ chỉ ở id10 "LÀ LINH", id11 "DI ẢNH CỦA LINH", id12 "“HÔM NAY GIỖ ĐẦU CON…”": 3 cảnh liên tiếp, đúng tối đa. Climax (s9–s11) và kết (s13) ở hai shot khác nhau. Hold 0.8 s rồi fade-to-black. Không có hard cut, shake hay flash. Có một mâu thuẫn nhỏ về fade ở 2.8 s (A20b).
6. **Fidelity.** Owner không bắt buộc câu nguyên văn nào. Năm beat tóm tắt đều được dựng thành cảnh, không chép nguyên văn. NO_CARTOON_ART_V1 được giữ ở mọi tài liệu đang dùng.
7. **Claims.** Không có claim thật. Grep `2025` (trừ file review) chỉ còn script.md:81 và :138, đều nằm trong bảng ticket-response lịch sử, mô tả việc sửa chứ không phải nội dung hiển thị. Ngoài ra là `board/make_art.py`, file rác đã ghi ở HANDOFF.md:9.
8. **Timing.** Đếm lại từ `voice.proposed.json`: s1 9 · s2 11 · s3 15 · s4 15 · s5 12 · s6 14 · s7 16 · s8 21 · s9 5 · s10 2 · s11 14 · s12 15 · s13 13 = **162**, khớp script.md:64. Ở 4.1 syl/s cộng nghỉ (0.15 cho dấu phẩy, 0.25 cho dấu chấm hoặc hai chấm giữa câu, 0.35 cho "…"), so với trần slot − 0.08: s2 2.83/3.12 · s3 4.16/4.52 · s7 4.70/4.92 · s8 5.62/6.32 · s12 4.26/5.72 · s13 3.32 + 0.8 hold/6.12. Các key còn lại dư nhiều hơn. Tổng slot 60.000 s.
9. **Hợp đồng performance.** Tôi không có shell nên không chạy chương trình ghép chuỗi. Cách kiểm: (a) đọc trực tiếp mảng `phrases` của 13 key, ghép bằng một dấu cách: thứ tự và dấu câu khớp canonical. (b) Grep một pattern literal gồm 8 phrase/câu có "…", dấu phẩy hoặc dấu hai chấm: khớp **8/8/8** ở `voice.proposed.json`, `voice-performance.proposed.json` và `shotlist.json`, nên ba file dùng cùng chuỗi byte. Mọi `accentWords` đều là chuỗi con của canonical. Không có cue nào lọt vào lời hay caption, không bịa control. Pause chủ đích nằm ở gap timeline (s9 0.7 s, s13 0.8 s). Lỗi duy nhất: voice-direction.md:49 (A34).
10. **Săn điểm yếu.** Xem mục "Săn điểm yếu" bên dưới (W1–W3).

### Hook engineering gate

- **0–1 s (frame 0 = cover):** id1 có panel 1–12, đồng hồ đỏ "12", caption trắng từ 0.0. Kế hoạch đạt. **Plate `public/images/thang-may-tang-13/p01.jpg` vẫn còn đủ lỗi gate D Round 3 đã ghi:** thiếu nút 8, hai nút "1", một nút trống ở cột phải ngay trên "11", cạnh "12". Nút trống này nằm đúng chỗ người xem sẽ đọc thành nút thứ 13, nên làm yếu trực tiếp hook khi tắt tiếng. Ngoài ra còn vệt số ma trên LED, hàng nút cụt ở mép dưới và **logo sparkle của Gemini ở góc dưới phải**. Đây là must-fix của gate D, không trừ điểm gate A.
- **1–3 s:** lật 13 ở 1.5 s kèm tiếng "ding", caption amber "TẦNG 13", đúng lúc lời đọc "mười hai tầng". Tắt tiếng vẫn hiểu. Đạt.
- **2–4 s phản ứng:** P03 từ 2.8 s, Linh ngẩng lên, rút tai nghe, điện thoại sáng. Đạt. Thời lượng fade còn hai nguồn mâu thuẫn (A20b).
- **4–6 s leo thang / 3–8 s first payoff:** cửa mở ra hành lang tối từ 4.2 s. Sau đó cửa không chịu đóng và đèn tắt ở 6–10.6 s. Đạt.
- **Kết có trả lời lời hứa?** Có: tầng 13 là nhà của hồn Linh trong đêm giỗ đầu. Đạt.
- **So với candidate bị loại:** H3 (gương trống, hook-options.md:9) lộ twist trong 2 s, nên chỉ được giữ làm clue xem lại ở P03. H2 không có người. H5 mất khi tắt tiếng. H1 thắng xứng đáng.
- **Artifact:** hook-options.md có H1–H5 × 5 trường. ID được tham chiếu ở script.md:12 và brief.md:25. Đạt.
- **Hook sub-score 9.** Chỉ đo được sau render và đăng: tỷ lệ dừng xem 0–3 s, và người xem lướt nhanh có đọc ra "panel chỉ đến 12" hay không.

### Xác minh ticket Round 3 (theo acceptance, không dựa vào bảng tự khai ở script.md:133–149)

| id | Kết quả | Bằng chứng |
|---|---|---|
| A19 | **closed** | HANDOFF.md:10 nay là route photoreal Gemini. Grep `vector\|not photoreal` (không phân biệt hoa thường, trừ review) chỉ còn HANDOFF.md:9, dòng lịch sử đã được miễn trong acceptance. Không còn kết quả nào khác ở `*.md` |
| A9 | **closed** | brief.md:42 "dated with day/month + 00:12, no year". script.md:18 "timestamp 00:12 on screen (no year)". Grep `2025` còn script.md:81 (đã được miễn) và script.md:138. Dòng :138 nằm trong bảng ticket-response Round 3, mô tả việc đã bỏ ngày, cùng loại lịch sử với :81, nên tôi miễn theo đúng lý do đó. Không có frame hay mô tả hình nào ghi năm |
| A34 | **not closed** (Trung) | Đạt: cột tempo :17–29 trùng sidecar từng key; emphasis s13 "vẫn đầy, chờ Linh về"; :53 "Đôi đũa vẫn chờ Linh về."; có dòng "bàn thờ" (:54) và "Mẹ thì thầm" (:55). Chưa đạt: **:49 `"nén nhang" (removed) / "nhang"`**. "nén nhang" không phải chuỗi con của `voice.proposed.json`, trái acceptance "mọi cụm trong cột word… là chuỗi con" |
| A35 | **closed** | shotlist id7 visual: "portrait unreadable (darkened/defocused, no legible face before s10)". Kế hoạch crop P14 đã bỏ (script.md:140). Plate `p09.jpg` và `frames/p09.png` xem ở 1125×2000: chỗ di ảnh là một khối tối, **không nhận ra mặt**. Ghi chú gate D bên dưới |
| A20b | **partly fixed** (Thấp, còn mở) | id2 `camera` ghi "P03 enters with a 0.25 s fade", nhưng id1 `transition_out` và script.md:37 vẫn ghi "soft-fade-0.4s". Cùng một chuyển cảnh có hai giá trị |
| A27 | **partly fixed** (Thấp, còn mở) | shotlist id8 caption đã là "CHÍNH CHUNG CƯ NÀY CHÁY". Bảng shot-by-shot script.md:44 vẫn ghi "CHÍNH CHUNG CƯ NÀY BỐC CHÁY" |
| A36 | **partly fixed** (Thấp, còn mở) | :3 đã cập nhật, id2 camera đã đúng thứ tự. Còn hai chỗ: **script.md:19** trích lời mẹ thiếu "hôm nay" ("giỗ đầu con… con về ăn cơm với mẹ nhé"), và **script.md:57** ghi "fire footage with date", trong khi màn hình không có ngày. Acceptance "không còn mô tả trái canonical" chưa đạt |
| A37 | **closed** | id5 visual: "yellowed, aged paper with faded stamp ink". Lời giữ nguyên (đây là phương án được phép) |
| A38 | **closed** | script.md:147–149 có mức tối thiểu khi Join cho s11, s12, s13 |

### Tickets Round 4

`id | sev | where | evidence | concrete change | owner | acceptance`

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| A34 | **Trung** (còn mở, phần dư một dòng) | voice-direction.md:49 | `| "nén nhang" (removed) / "nhang" | s7 | — | keep |`: "nén nhang" không có trong canonical | Xoá dòng :49, **hoặc** thay bằng `| "nhang" | s7 | short level tone after "Mùi", low risk | keep |` | script-agent | Mọi cụm ở cột word của bảng tone (:43–55) là chuỗi con của `voice.proposed.json` |
| A20b | Thấp (còn mở) | shotlist id1 `transition_out` · id2 `camera` · script.md:37 | 0.4 s ↔ 0.25 s cho cùng chuyển cảnh 2.8 s | Chọn một giá trị và ghi ở `transition_out` của id1, nơi build đọc. Đề xuất "soft-fade-0.3s" (đủ mềm, mặt Linh rõ ≥1.2 s trong 2–4 s). Xoá phần ghi chú fade trong id2 `camera`, sửa script.md:37 cho khớp | script-agent | Một nguồn duy nhất cho fade 2.8 s; script.md và shotlist trùng nhau |
| A27 | Thấp (còn mở) | script.md:44 | Caption ghi "BỐC CHÁY", shotlist ghi "CHÁY" | script.md:44 → "CHÍNH CHUNG CƯ NÀY CHÁY (white)" | script-agent | script.md:44 trùng shotlist id8 |
| A36 | Thấp (còn mở) | script.md:19, :57 | :19 thiếu "hôm nay"; :57 "fire footage with date" | :19 → `mother whispers "hôm nay giỗ đầu con… con về ăn cơm với mẹ nhé"`. :57 → "fire footage with timestamp 00:12" | script-agent | Không còn mô tả nào trái canonical hoặc trái shotlist |
| A39 | Thấp NEW | HANDOFF.md:8, :11, :23 | :8 "12 scenes", :11 "round 2 review dispatched", :23 "p09 altar portrait shows a man" đều đã cũ so với :10 và :25 (rules 01-status-truth) | :8 → "13 scenes"; :11 → gộp vào :25; :23 thêm "(superseded: portrait darkened, see :10)" | director | HANDOFF không còn mô tả trạng thái trái với file hiện tại |

**Gửi gate D (ghi nhận, không tính điểm A):**
1. **P01** (`public/.../p01.jpg`) vẫn còn đủ lỗi đã ghi ở Round 3. Riêng nút trống ở chỗ "13" là lỗi nặng nhất cho cover.
2. **Logo sparkle của Gemini** ở góc dưới phải trên p01 và p09 (cả plate lẫn frame). Kiểm và xoá trên cả 16 plate.
3. **P09:** di ảnh là một khối đen phẳng, dễ đọc thành ô che. Nên làm mờ nét kèm khói nhang che, hoặc phản chiếu ánh nến trên kính, để vẫn không nhận ra mặt mà trông tự nhiên. Tờ lịch có số "1" đỏ ở đầu, trong khi id7 ghi "no highlighted day": nên làm tối hoặc mờ chỗ đó. Khung ảnh nhỏ bên trái bàn thờ có hình người: kiểm ở 1080×1920 để chắc không ai đọc thành Linh.
4. Các lưu ý Round 3 cho P03, P09↔P13 và P15 vẫn còn hiệu lực.

### Săn điểm yếu (≥3, có câu viết lại; không chặn pass)

- **W1 (s5, văn viết).** "Ngày ghi trên giấy… là một năm trước, cũng lúc nửa đêm." → "**Giấy niêm phong ghi… một năm trước, cũng lúc nửa đêm.**" (12 âm tiết, không đổi số). Nếu nhận: cập nhật phrases ở cả ba file, caption id5 "NGÀY NIÊM PHONG:" giữ nguyên.
- **W2 (s9, chỉ kể lại hình).** "Ảnh nạn nhân hiện lên." chỉ thuật lại đúng cái đang thấy. Có thể đổi thành "**Rồi ảnh nạn nhân hiện lên.**" (6 âm tiết, ≈1.5 s + 0.7 gap, vẫn dưới 2.32). "Rồi" kéo nhịp chờ vào khoảng lặng. Tuỳ chọn, Thấp.
- **W3 (s12, chỉ dẫn giọng).** voice-performance s12 `emotion` "dịu, nghẹn, gần thì thầm" → "**dịu, nghẹn, khẽ hơn (không diễn giọng thì thầm)**", cho khớp dòng tone :55.
- **W4 (~25–30 s, nhịp).** Đây là chỗ dễ mất người xem nhất. Nếu sau render retention rơi ở đây, cách sửa rẻ nhất là cho mép giấy niêm phong ở P07 bay rơi xuống đúng cue "hé mở". Thêm hành động hình, không thêm lời.

### Những gì chưa xác minh được

- Thời lượng thật của từng clip Vbee và độ dài nghỉ ở "…" và ":". s2 và s7 là hai key sát trần nhất.
- `voiceCode hn_male_phuthang_stor_24k-stl` còn được gói hỗ trợ không (brief.md:52, HANDOFF.md:19).
- P01 sau khi gate D sửa có đọc ra "chỉ đến 12" khi lướt nhanh không; tin nhắn P03 có đọc kịp không.
- 12 plate còn lại tôi chưa mở (chỉ mở p01, p09); tính nhất quán toàn bộ thuộc gate D.
- Caption dài nhất "“CON VỀ ĂN CƠM VỚI MẸ NHÉ”" có giữ ≤2 dòng trong safe-zone TikTok không.
- Retention 0–3 s, viewed vs swiped, rewatch: chỉ đo được sau khi đăng.
- Director đã ghi tone-probe blocked trong `status.json` chưa: tôi không kiểm.
- `python3 -I scripts/pipeline.py audit thang-may-tang-13`: **không chạy**. Reviewer không có shell, và caller dặn không chạy pipeline.py. Director cần chạy.

### Điều kiện pass Round 5

Đóng A34 bằng cách xoá hoặc sửa voice-direction.md:49 theo acceptance. Nếu chỉ thay đổi đúng vậy, mục 10 lên 9, trung bình 9.0, không còn Cao/Trung, và gate A pass. Nên làm luôn các Thấp A20b, A27, A36, A39 vì mỗi cái chỉ là sửa một dòng. Không cần viết lại lời. Nếu nhận W1 hoặc W2 thì phải đếm lại âm tiết và kiểm lại join. Không re-litigate A1–A33, A35, A37, A38 đã đóng.
