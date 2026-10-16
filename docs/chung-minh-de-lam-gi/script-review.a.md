# Script review (lens A: fidelity + sources/claims) — chung-minh-de-lam-gi

- Lens: (a) fidelity + sources/claims. Phạm vi: brief↔script↔voice.json, claim↔source, spotlight scope, Manilow, CTA, sibling-diff. Không chấm timing/visual/naturalness (lens khác).
- Đọc-nhanh vai viewer (2 dòng): hiểu ngay "được công nhận mà vẫn trống, vì bằng treo tường còn câu chê nằm trong ngực"; giây dễ rơi chú ý nhất ~22–26s (s6 giải thích cơ chế, nói đều sau re-hook).
- Specificity sub-score: **ngoài phạm vi lens (a)** — chờ lens (b).

## Bảng điểm (lens a)

| # | Item | Điểm | Evidence |
|---|---|---|---|
| A1 | Brief↔script traceability | 9 | Mọi beat có gốc: s2a/s2b←brief.md:34 + research.md:35 (I5); s4a/s4b H1←brief.md:34; s5 re-hook←brief.md:34 + research.md:70; s7a/s7b H2←brief.md:34; s8←brief.md:42; s9a/s9b H3←brief.md:34; s10←brief.md:34 + research.md:24 (F5); s11←brief.md:5,34. Trừ 1: 2 drift (ticket A2, A1). |
| A2 | voice.proposed.json khớp script, không chữ bịa | 10 | 15/15 key khớp byte cột spoken line (script.md:22–36 vs voice.proposed.json:1: s1..s11). Đếm Grep: 8+13+11+15+14+14+10+15+13+13+16+12+12+12+14=192, khớp script.md:39. Không key thừa, không wording ngoài script. |
| A3 | Source accuracy (claim nào cũng có URL + tag fact/inference) | 8 | s6 chip←research.md:9 (S4, 2 URL) + research.md:20 (F1) + scope research.md:28; s8 chip←research.md:13 (S11) + research.md:22 (F3) + research.md:42 (U5, abstract-only); s7←research.md:31 (I1, tag diễn giải, script.md:30–31 ghi đúng "Diễn giải I1"); s10←research.md:11 (S8 URL) + research.md:24 (F5, bài bình luận — script.md:35 ghi đúng). Trừ 2: s10 nhãn "nguyên văn" sai + thiếu chip trên màn hình (ticket A1 Trung). |
| A4 | Spotlight scope (chỉ chú ý tức thời, không claim trí nhớ) | 10 | Chip s6 ghi đúng "đo ở chú ý tức thời" (script.md:29) = research.md:28. Không có câu "họ đã quên/đã tiếc" nào; re-hook s5 là câu hỏi hành động, không phải claim trí nhớ (đúng U4 research.md:41). |
| A5 | Không số Manilow | 10 | Không số % nào trên màn hình/chip/voice; script.md:61 ghi rõ "Không hiện số 46%/23%" = research.md:38 (U1). |
| A6 | Không CTA, kết đúng brief | 10 | s11 câu hỏi mở + lặng thuần 2.0s (script.md:36) = brief.md:5,7. Không CTA, không "vả mặt" (s11 vẫn cầm huy chương), cao trào s9–s10 tách shot với s11. |
| A7 | Sibling differentiation (không reuse gạch/tường-cover) | 9 | Không gạch/THẤY CHƯA?/story-UI/rửa bát/đặt-gạch (đối chiếu xay-doi script.md:13–20,25–40); cover khác hẳn (que+huy chương+ghế trống vs tường+ô cửa+bảng đèn). Trừ 1: chữ "tường" xuất hiện 2 lần (ticket A4 Thấp, brief-mandated). |

**Overall (lens a) = (9+10+8+10+10+10+9)/7 = 9.4. Không item nào <8.**

## Tickets

| id | Sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| A1 | Trung | script.md:35 (s10 source col + on-screen) vs brief.md:43 vs research.md:47 | Source col ghi "S8 nguyên văn" nhưng text là "trao quyền định giá **mình**" trong khi S8 nguyên văn (research.md:47) là "trao quyền định giá **bản thân**"; đồng thời claim plan brief.md:43 liệt kê s10 là claim có nguồn nhưng on-screen s10 chỉ có HEADLINE, **không có chip nguồn** (s6/s8 đều có). | Một trong hai: (i) sửa spoken+headline s10 về đúng "Bấy lâu nay, bạn trao quyền định giá bản thân cho người khác." (14 âm tiết, cập nhật totals + voice.json), + thêm chip "Tuổi Trẻ 14/02/2026 (bài bình luận, không phải thực nghiệm)"; hoặc (ii) giữ chữ "mình", đổi source col thành "diễn đạt theo S8/F5 (không phải trích nguyên văn)" + thêm chip như (i). | script-agent | On-screen s10 có chip S8 đúng URL tuoitre.vn + tag "bình luận"; chữ "nguyên văn" chỉ còn khi khớp byte research.md:47. |
| A2 | Thấp | script.md:34 (s9b) vs brief.md:34 | Brief spine H3: "rốt cuộc, mình đang cần điều gì?" — script s9b thêm "nhất?": "đang cần điều gì nhất?" (voice.json khớp script, nên không bịa voice; chỉ drift brief↔script). | Thêm "nhất" vào brief.md:34 HOẶC bỏ "nhất" khỏi script+voice (12→11 âm tiết, cập nhật totals). | script-agent + director | brief.md:34 và script s9b/voice s9b khớp chữ từng từ. |
| A3 | Thấp | script.md:29 (s6 chip 0.6–4.8s, shot 3.86s) · script.md:32 (s8 chip ≥4s, shot 4.10s) | Chip s6 "hiện 0.6–4.8s (≥4s)" vượt quá shot 3.86s (tối đa 0.6–3.6 ≈ 3.0s); s8 tương tự (tối đa ~3.3s < 4s). Nguồn thì đúng, chỉ cửa sổ hiển thị bất khả thi. | Sửa cửa sổ chip vừa trong shot (vd s6 "0.4–3.5s", s8 "0.3–3.9s") và bỏ cam kết "≥4s", hoặc rút gọn chữ chip; design-agent xác nhận đọc được. | script-agent + design-agent | Mọi chip nguồn nằm gọn trong shot chứa nó; không con số nào hứa hẹn vượt độ dài shot. |
| A4 | Thấp | script.md:27 (s4b "nằm im trên tường") · script.md:31 (s7b "treo yên trên tường") vs brief.md:34,50 | Chữ "tường" trùng từ với metaphor lõi video anh em ("bức tường"), dù ở đây chỉ là giá treo huy chương theo đúng brief.md:34 (brief tự mandate "treo lên tường") và visual khác hệ (que/nền đen vs paper-cut gạch). | Director xác nhận giữ (brief đã mandate) HOẶC đổi "tường" → "móc treo/tấm bảng" ở s4b+s7b (+ voice.json, totals không đổi: "trên tường"=2 → "trên giá"=2, "treo yên trên tường"=4 → "treo yên trên giá"=4). | director | brief.md:34 và script s4b/s7b dùng cùng danh từ treo huy chương; không còn khiếu nại "giống video 1" ở review sau. |

## Không verify được

- Nội dung full text S8/S11 (research chỉ đọc abstract/summary — tin research.md:13,42 theo phạm vi đã tag; lens này không mở lại URL).
- Độ đọc được thực tế của chip (chờ design-agent still QA).

**score: 9.4 verdict: revise** (1 Trung A1 mở; pass cần đóng hết Cao/Trung + lens (b) specificity ≥9) · top fix: A1 chip+verbatim s10 · path: docs/chung-minh-de-lam-gi/script-review.a.md
