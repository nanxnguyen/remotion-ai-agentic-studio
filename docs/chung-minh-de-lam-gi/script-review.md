# Script review — chung-minh-de-lam-gi (gate A, director merge Round 1)

3 lens reviewers (clean context, parallel): (a) fidelity+sources `script-review.a.md` 9.4 revise · (b) hook+emotion `script-review.b.md` 9.2 pass, specificity 9.4 · (c) spoken+timing+visual `script-review.c.md` 8.8 pass-with-tickets.
Merged rule: ONE score = lowest lens = **8.8**, verdict **revise** (open Trung below). De-duplicated (T8-lensb ≡ T2-lensc chip s6; T15-lensc ≡ T2-lensb cover; T7-lensb ≡ T14-lensc heartbeat).

## Score: 8.8/10 — revise

## Fix list (to script-agent, one pass)

| id | sev | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| A1 | Trung | s10 | ghi "S8 nguyên văn" nhưng text đổi "bản thân"→"mình"; claim có nguồn nhưng on-screen thiếu chip (s6/s8) | trả đúng nguyên văn hoặc đổi label + thêm chip Tuổi Trẻ (bình luận); chip hiện trong shot chứa claim | script-agent | text khớp label; chip có mặt đúng shot |
| T2 | Trung | s6 chip | chip "0.6–4.8s (≥4s)" nhưng shot chỉ 3.86s | chip 0.3–3.6s + nới điều kiện "≥4s", fade trước cut | script-agent | window vừa shot, fade trước cut |
| T3emo | Trung | s6+s8 | 2 beat "đọc như kể tin" kẹp H2, nguy cơ didactic-dip | giữ chữ; delivery "bình thản/đều, không lên giọng"; design không thêm text/chart ngoài chip + đường phẳng; không kéo hold 2 chip | script-agent + design-agent | delivery note trong script; design tuân thủ |
| T3sync | Trung | s3 | "3 huy chương rơi trùng 3 danh từ" cần word-timestamp, voice.json chỉ key-level | choreography 3 nhịp đều trong key, KHÔNG hứa sync từng danh từ (word-timestamp lấy ở join nếu có) | script-agent | script không claim sync chính xác |
| T4 | Trung | s7a caption | chunk "tấm bằng / khen này" chẻ từ ghép "bằng khen" | re-chunk `Bạn đã tưởng tấm / bằng khen này sẽ lấp / được câu nói cũ.` (16/20/16) | script-agent | mọi dòng ≤28, không chẻ từ ghép |
| T6 | Trung | design constraint | "phát sáng mờ/bóng loáng/vệt sáng" (s4b/s7a/s7b/s9b) | render bằng shape phẳng + opacity, CẤM gradient/blur filter | design-agent (ghi vào script image/action) | script không yêu cầu gradient/blur |
| T1 | Thấp | Totals | hold cộng tay = 6.05s, draft ghi 5.85s | sửa Totals → ~52.9/50.8/56.6s (@4.1/4.3/3.8), vẫn ≤59.5s | script-agent | số khớp |
| A2 | Thấp | s9b | thêm "nhất" lệch brief | bỏ "nhất" hoặc cập nhật brief | script-agent | khớp brief |
| A3 | Thấp | chip s8 | window chạm biên shot 4.10s | chip s8 vừa khít + fade trước cut (timeline-agent đo khít ở join) | script-agent | window + fade rõ |
| A4 | Thấp | s? "tường" | chữ "tường" trùng từ video anh em | director CHỐT: giữ (callback có chủ ý khác ngữ cảnh) | director | ghi nhận, không đổi |
| T1b | Thấp | s5 re-hook 19.83s @4.1 (~20.8s @3.8) | biên trên cửa sổ 15–20s | giữ; nếu voice chậm: rút đuôi s5 0.30→0.20 trước (không đụng gap s7/s9/lặng cuối) | director/audio | parenthesized fallback |
| T2b | Thấp | cover 2 ẩn dụ | spec "một ẩn dụ duy nhất" | NGOẠI LỆ có chủ ý: ghế background-mờ 20%, huy chương foreground-focus | director | design giữ ghế mờ/nhỏ |
| T4b | Thấp | s10 trừu tượng | "trao quyền định giá" cụm óc | giữ + thẻ giá + tay khựng neo hình; delivery "chậm, rõ, không cay đắng" | script-agent | delivery note |
| T5b | Thấp | s2b dày 2 sự kiện/2.93s | giữ (cú cắt im trước "nó thì" là beat hay); dựng đúng mốc 1.0s | design-agent | mốc 1.0s |
| T6b | Thấp | s3 đếm medal | "tăng ca" không phải vật treo | 3 nhịp cho "bằng khen, chức danh, gom hết" HOẶC 2 huy chương + 1 thẻ tên — chốt 1 cách trước build | design-agent | một cách duy nhất |
| T5c | Thấp | s2b mặt que | dễ thành chi tiết | ≤3 nét (2 chấm mắt + 1 miệng ngắn) | design-agent | spec nét |
| T7c | Thấp | s7a reflection | phản chiếu méo mó quá phức tạp | 2–3 đường cong gợi bóng; bubble + huy chương làm chính | design-agent | đơn giản |
| T8c | Thấp | s4a confetti | motion bận nhất | giới hạn hạt, thưa; "phòng sáng rực" = shape trắng trên nền đen | design-agent | thưa |
| T9 | Thấp | dấu câu voice text | colon/comma tạo pause TTS ngoài timeline | giữ (budget dư ~3s); ffprobe xác nhận ở voice-report; lố thì rút đuôi s5/s7b | voice-agent | voice-report xác nhận |
| T13 | Thấp | headline s5/s10/s11 44–55 ký tự | tối đa 3 dòng ExtraBold | check đọc được trên điện thoại ở still QA | design-agent | still QA |
| T16 | Thấp | ASR watchlist | "khẩy/triền miên/phăng phắc/định giá" giọng Nam gộp phụ âm cuối | accepted-noise theo brief lesson 10, không regen vô ích | voice-agent | ghi voice-report |

## Director decisions (locked)

- T7/T14 heartbeat synth: DROP synth preset; dùng im lặng + gap 0.40s có sẵn (tiền lệ video 1 AUD-T8). Audio-agent không tạo pulse.
- T10/T11 optional wording (+1/+3 syl): DECLINED — giữ timing đã khóa; budget dư dành cho pause TTS (T9).
- T12 delivery note "hỏi nhỏ" s9b: giữ trong script delivery.
- A4 "tường": giữ có chủ ý.

## Pass condition round 2

Mọi Trung đóng + recount 192 (± thay đổi) + totals khớp + caption ≤28 + chip vừa shot. Mới: reviewer round 2 verify + regression, chỉ NEW mới.
