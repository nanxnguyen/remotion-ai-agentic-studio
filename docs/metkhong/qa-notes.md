# QA notes — metkhong

- Script review (subagent sạch ngữ cảnh): 9.1/10 PASS.
- Stills QA: 14 stills out/qa/metkhong-*.png, caption không cắt/chồng, bottom 260 ngoài safe-zone 210px.
- Final review 1: FAIL 6.5/10 — thiếu nhãn minh hoạ s2-s5 + emoji font s7.
- Fix: thêm <MinhHoa/> s2-s5,s7; thay emoji bằng vector div; re-render OK.
- Final review 2 (re-check): 2 lỗi trên PASS, không còn blocker từ 2 lỗi này.
- Còn lại (chấp nhận, ghi rõ): visual tối giản (chữ trong khung thay vì tả thực chi tiết) — nhất quán toàn video, caption gánh câu chuyện; nhịp clone ~4.5 từ/giây nhanh hơn spec 2.3 nhưng nghe rõ, CER ≤0.079, không clip (max -4.8dB).
- Kỹ thuật: 1080x1920 30fps H264 32.4s, audio AAC mean -19.3dB max -4.8dB.
- Giọng: clone cục bộ VieNeu-TTS v3 Turbo từ preview Thanh Long của user (không phải output Vbee thật). Có key Vbee thật sau này: đặt clip vào public/audio/metkhong/s1..s7.mp3, đo lại, render lại.
