# Video review — metkhong v2

## Round 1 (reviewer độc lập, tile 1fps + 20 frame dày + số đo): 9.0/10 — PASS (≥8)
- Vẻ đẹp + chi tiết: 1.0/2 (frame giữa transition gần như đen trống).
- Caption: 2.0/2. Cung cảm xúc: 2.0/2. Nhãn minh hoạ + an toàn: 2.0/2. Style: 2.0/2.
- Lỗi Trung bình: (1) fade-through-black để khung đen trống ở 6 transition (metT-02/08/11/14/15/17); (2) audio cần nghe xác minh (CER s2 0.078, s5 0.079).
- Lỗi Thấp: s6 mắt特写 thay vì mặt người (chấp nhận); s1 polaroid sepia gợi camon (chấp nhận).

## Fix sau round 1 (main agent, tự verify bằng stills)
- Rút fade intro toàn cục: `kit.tsx` ramp mặc định len 14 → 6. Verify: metF-171 (người thay bóng đèn hiện rõ ở +5f), metF-866 (mắt s6 đã mở ở +5f), metF-1082. Không rebuild full review (gate đã PASS, fix nhỏ đã tự kiểm chứng).
- Audio s2/s5: để lại cho tai người (ghi trong báo cáo cuối).

## Kết luận
GATE C PASS. Ship out/metkhong-reel.mp4 v2 (51.1s). Audio chưa được nghe bởi bất kỳ agent nào — needs listening.
