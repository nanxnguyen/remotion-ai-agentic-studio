# Assets manifest — metkhong

## Voice
- Clone cục bộ VieNeu-TTS v3 Turbo từ ref `docs/metkhong/voice-ref/refA.wav` (cắt 0.15-7.0s từ preview user `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3`, Vbee Thanh Long nâng cao Beta). Không phải output Vbee thật. ASR check: CER 0.000-0.079.

## BGM
- `public/audio/metkhong-bgm.mp3`: tự tổng hợp bằng `scripts/gen-bgm-soft.py` (pad C-Am-F-G 72 BPM, 40s), không bản quyền bên thứ ba. Volume ~7%, fade in/out.

## SFX (tái dùng kit gaplai, đã có trong public/audio)
- `gaplai-dissolve-soft.mp3`, `gaplai-dissolve-short.mp3`, `gaplai-lamp.mp3`, `gaplai-tea.mp3`, `gaplai-heartbeat.mp3`, `gaplai-shimmer.mp3` — nguồn `skills/video-shotcraft/assets/audio` (xem `docs/audio-attribution.md`).

## Hình ảnh tham khảo (Firecrawl, chỉ để dựng lại, KHÔNG copy file)
- Bóng đèn: phenikaalighting.com, ledxanh.vn, bkcs.vn, reddit r/DIY.
- Bê đồ: kienvang.com, dichvudonnhatrongoi.com, trongtanvn.com.
- Ăn một mình: tuoitre.vn, noinoinoi.com, thanhnien.vn.
- Bài viết burnout: Facebook/TikTok/VTV2 (gồng mình, kiệt sức).
- Mọi cảnh trong video đều vẽ lại bằng Remotion, ảnh tuổi thơ gắn nhãn "minh hoạ".
