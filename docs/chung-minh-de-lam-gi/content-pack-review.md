# Content-pack review — chung-minh-de-lam-gi

## Round 1

Verdict: score 9.4, pass (1 ticket Thấp, non-blocking — không Cao/Trung).

### Điểm theo rubric (1–10, kèm bằng chứng)

| # | Mục | Điểm | Bằng chứng |
|---|---|---|---|
| 1 | Fidelity | 10 | Cả 15 key join bằng 1 dấu cách == `voice.json` byte-for-byte (đã kiểm từng key: s1–s11, gồm headline s1/s5/s10/s11 và caption s2a–s9b). S7a EXACT 16/20/16 đã đo: [16,20,16]. Không lệch một chữ. |
| 2 | Sound-off clarity | 9.5 | Cover s1: headline 2 dòng đủ từ frame 0 + huy chương/ghế trống = tắt tiếng vẫn hiểu (được công nhận + trống). Re-hook s5 nói + hiện chữ ở ~19.83s, trong cửa sổ 15–20s, là câu hỏi mới đúng nghĩa. |
| 3 | Readability | 8.5 | Mọi dòng caption/headline ≤28 ký tự (đã đo 47 dòng, max 27). Ngắt ở biên cụm từ, không chẻ từ ghép (`bằng khen`, `câu nói`, `nằm trong ngực`, `chỗ trống`, `soi gương` đều nguyên), dấu thanh đúng (`phăng phắc`, `triền miên`, `khẩy`, `định giá`). Trừ 1.5 vì 2 gợn (xem T1, G1). |
| 4 | Value of on-screen text | 9 | Mỗi shot một ý; headline = đúng lời nói (chuẩn sound-off cho hook/re-hook/climax, không phải tagline trừu tượng); chip bổ sung nguồn cụ thể; không slogan chung chung. |
| 5 | Emphasis | 9.5 | Accent khớp 3 highlight beats (H1 `im phăng phắc`·`nằm im`; H2 `lấp được`·`câu nói cũ`/`treo yên`·`nằm trong ngực`; H3 `soi gương`·`chỉ nhìn`/`cần điều gì nhất?`); ≤2 cụm/key (max 2, s3/s4a/s4b/s7a/s7b/s8/s9a); s4a trắng có chủ ý (niềm vui thật lúc đó); không CTA nên climax (s9–s10) và câu hỏi cuối (s11) tách shot đúng. |
| 6 | Credibility | 9.5 | C1 (F1/S4, 2 URL) ghi đúng phạm vi `chú ý tức thời`, không số Manilow (U1). C2 (F3/S11) ghi `(abstract)`, không số chi tiết (U5). C3 (S8/F5) ghi rõ `(bình luận)`, không mạo nhận thực nghiệm. C4 gắn đúng inference I1, không kết luận khoa học. Đủ nhãn `minh hoạ`: s2b + s7a (bong bóng thoại), s8 (biểu đồ, không số ngoài chip), s10 (thẻ giá); cảnh chung có dòng bao phủ ở §Labels. |
| 7 | User constraints (7/7) | 9.5 | (1) Không CTA + câu hỏi mở + lặng 2.0s: §CTA khóa, s11 giữ headline suốt lặng, không chữ thêm. (2) Chip s6 window 0.3–3.6 + fade; s8 0.3–3.8 + fade 0.3s; s10 chip Tuổi Trẻ hiện trong shot. (3) Nhãn `minh hoạ` đủ 4 điểm dựng lại. (4) Caption `bottom:224` ngoài 210px đáy, mọi chunk ≤28. (5) Headline đúng s1/s5/s10/s11, không caption đáy đi kèm. (6) s7a 16/20/16. (7) Accent ≤2/key. Trừ 0.5 vì chip s10 thiếu window số như s6/s8 (G2). |

Mean = (10+9.5+8.5+9+9.5+9.5+9.5)/7 = 9.4. Không mục nào dưới 8. Không ticket Cao/Trung.

### Ticket

| id | severity | where | evidence | concrete change | owner | acceptance check |
|---|---|---|---|---|---|---|
| T1 | Thấp | content-pack.md s10 headline, dòng 1 (`Bấy lâu nay, bạn trao quyền` = 27 ký tự) | content-pack.md:190–192; script.md:35 không khóa ngắt dòng headline s10; đối chiếu s1 (19/19), s5 (14–17), s11 (16–20) đều cân, riêng s10 dòng 1 gấp đôi dòng 2–3 | Ngắt lại headline s10 thành 3 dòng cân (gợi ý: `Bấy lâu nay, bạn` / `trao quyền định giá mình` / `cho người khác.`), join bằng 1 dấu cách vẫn == `voice.json` s10; giữ `định giá` cam | content-agent | `python3 -c` join 3 dòng == voice.json s10; mỗi dòng ≤20 ký tự; không đụng caption/chip/timing |

### Ghi nhận (không ticket — đạt, nêu để lưu vết)

- G1 (readability, script-locked): s7b chunk 2 `trên tường. Còn câu nói` gộp đuôi câu 1 + đầu câu 2 trong một chunk (script.md:31 đã khóa). Content-pack sao đúng script nên không ticket content-agent; mức độ nhẹ (23 ký tự, cụm `câu nói` nguyên), chấm readability vẫn ≥8.
- G2 (constraints, script-locked): chip s10 chỉ ghi `hiện trong shot`, thiếu window số kiểu s6/s8 — nhưng constraint user cho s10 chỉ yêu cầu hiện diện chip Tuổi Trẻ, và script.md:35 cũng khóa ở mức đó; timing số là việc của director/gate E, không chặn pass nhánh content.
- G3 (chính tả trích dẫn): chip s10 trích `trao quyền định giá bản thân cho người khác` trong ngoặc kép, bỏ `tôi đang` so với nguyên văn research §3 (`tôi đang trao quyền…`). Dạng lược chủ ngữ chuẩn cho chip, không gây hiểu sai, không ticket.

### Đối chiếu script-agent vs content-agent

- Không có vấn đề nào thuộc lời nói (spoken line) — mọi text khớp `voice.json`/`script.md` từng byte. Không ticket nào cho script-agent; gate A không mở lại.

## Round 2

Verdict: score 9.5, pass (0 ticket — T1 đã đóng, không Cao/Trung/Thấp mới).

### NEW only — verify T1 (s10 rebreak)
- Acceptance T1: ĐẠT. `content-pack.md:190–192` hiện 3 dòng `Bấy lâu nay, bạn` / `trao quyền định giá` / `mình cho người khác.` — đo `[16, 19, 20]`, max 20 ≤ 20; join 1 dấu cách == `voice.json` s10 byte-for-byte (`Bấy lâu nay, bạn trao quyền định giá mình cho người khác.`); `định giá` vẫn cam (§s10 Accent); không đụng caption/chip/timing.
- Regression: ĐẠT. 15/15 joins == `voice.json` (s1–s11, gồm headline s1/s5/s10/s11 + caption s2a–s9b); mọi dòng on-screen ≤28 ký tự (max 27 toàn pack, s10 max 20); s7a EXACT 16/20/16 nguyên vẹn; joins intact.
- Không phát sinh Cao/Trung/Thấp mới. G1/G2/G3 (Round 1, script-locked) giữ nguyên mức ghi nhận, không lên ticket.

### Điểm cập nhật
- Readability 8.5 → 9.5 (T1 đã hết; chỉ còn G1 nhẹ script-locked).
- Các mục khác giữ nguyên: Fidelity 10, Sound-off 9.5, Value 9, Emphasis 9.5, Credibility 9.5, Constraints 9.5.
- Mean = (10+9.5+9.5+9+9.5+9.5+9.5)/7 = 9.5. Không mục nào dưới 8.
