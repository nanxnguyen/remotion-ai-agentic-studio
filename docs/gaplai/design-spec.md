# Design spec — gaplai (Nếu gặp lại mình của vài năm trước)

Style: "phòng đêm đèn vàng" — nền `#171310`, sàn `#241B14`, vàng đèn `#E8B04B`,
chữ kem `#F5EBD7`, xám quá khứ `#8A7E6E`, viền khung ảnh `#3A2E22`.
Chữ Be Vietnam Pro 600, caption dưới 2 dòng căn giữa, từ nhấn màu vàng đèn.
Nhãn "minh hoạ" nhỏ xám góc khung ảnh cũ. Timeline v2: giọng Cam clone, GAP_TOTAL = 1518 frames (50.6s).

| # | time | shot | key motion |
|---|------|------|------------|
| s1 | 0.00–3.63s (f0–109) | push-in ghế trống | push-in rất chậm về phía ghế trống đối diện dưới đèn bàn |
| s2 | 3.63–9.73s (f109–292) | dissolve ảnh cũ nhãn minh hoạ | khung ảnh cũ dissolve vào, nhãn "minh hoạ" xám góc khung |
| s3 | 9.73–15.33s (f292–460) | tách trà | tách trà bốc khói, đèn bàn nhấp nháy nhẹ, hold ≥0.6s |
| s4 | 15.33–21.50s (f460–645) | montage ảnh 1 | khung ảnh cũ 1 dissolve vào/ra, cắt mềm |
| s5 | 21.50–27.60s (f645–828) | montage ảnh 2 | khung ảnh cũ 2 (tin nhắn soạn dở), cắt mềm |
| s6 | 27.60–33.87s (f828–1016) | ảnh mới cạnh ảnh cũ | khung ảnh mới đặt cạnh ảnh cũ, push-in chậm |
| s7 | 33.87–39.50s (f1016–1185) | ôm + sáng đèn | cú đập duy nhất: cái ôm, zoom nhẹ + đèn sáng lên |
| s8 | 39.50–44.67s (f1185–1340) | lặng chốt: ghế trống + trà nguội | ghế nay trống, tách trà đã nguội, hai khung ảnh cạnh nhau; hold 0.8s |
| s9 | 44.67–50.60s (f1340–1518) | CTA riêng | chữ cuối + CTA comment trên nền phòng đêm |

- Font: Be Vietnam Pro 600 local tại `public/fonts/BeVietnamPro-SemiBold-{VN,LatinExt,Latin}.woff2`
  (tải từ Google Fonts, `@font-face` local trong `GapFonts` của cả `scenesA` + `scenesB`,
  dùng chung cho `scenesC`; fix final review: bỏ `@import` Google Fonts lúc render),
  fallback Inter. License: SIL Open Font License 1.1 (OFL, miễn phí thương mại).
- s4: montage đúng 2 ảnh (văn phòng khuya → phòng tối đèn ngủ, dissolve f78–100, bỏ con hẻm);
  mỗi ảnh giữ ~2.5–3s (shot chỉ 162f = 5.4s nên không thể hold 4s/ảnh).
- s7: lặng thị giác 0.7s (f85–106, không caption) giữa "bước tiếp." và nhịp CTA;
  CTA pill `Bạn muốn nhắn gì với mình cũ?` hiện f155–185 tại vị trí caption (đáy 250px).
