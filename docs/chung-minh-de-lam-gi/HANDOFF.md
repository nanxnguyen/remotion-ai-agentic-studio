# HANDOFF — chung-minh-de-lam-gi (pause, tiếp tục làm tiếp)

## Tình trạng hiện tại (2026-10-18)

Pipeline state (xem `python3 -I scripts/pipeline.py show chung-minh-de-lam-gi`):

| Stage | Trạng thái |
|---|---|
| Research | done |
| Brief | done |
| Script | done (gate A 9.2 pass) |
| Content pack | done (gate content 9.4 pass) |
| Voice | done (15 clips Thanh-Long-Nang-Cao, gate audio 9.3 pass) |
| Audio | done (gate audio 9.3 pass) |
| Design | done (gate D 9.0 pass) |
| Build | done (scaffold: manifest/index/timeline/kit/Reel/workbench, scenes stubs) |
| QA | **in_progress** ← làm tiếp ở đây |
| Render | pending |
| Gate C | pending |

Reviews (tất cả pass qua `pipeline.py`):
- A: 9.2, content: 9.4, audio: 9.3, D: 9.0, E: 9.0, B: 9.0

`next: qa` · `audit` exit 0 · `HANDOFF.md` đã ghi ở đây.

## Cách tiếp theo (theo SKILL.md ray-pipeline)

1. **Scene agents A–F** (6 agent, disjoint files, frame-driven, no Date.now/Math.random) — thay stubs `#060606` bằng 장면 thực:
   - A: `ScenesA.tsx` s1 (cover: headline 2 dòng + medal + ghế trống 20%)
   - B: `ScenesB.tsx` s2a (văn phòng đêm, ghế kéo), s2b (smirk close-up ≥300px, bong bóng thoại "nó thì làm được gì" minh hoạ)
   - C: `ScenesC.tsx` s3 (bàn phím, 3 huy chương rơi 3 nhịp), s4a (sáng rực + vỗ tay + confetti thưa), s4b (tối + medal 60% + ghế trống)
   - D: `ScenesD.tsx` s5 (HEADLINE re-hook ~21.94s đo thực), s6 (chip spotlight 0.3–3.6s), s7a (medal close-up + bong bóng thoại minh hoá)
   - E: `ScenesE.tsx` s7b (biểu đồ đường phẳng + ngực que nét đứt), s8 (chip 0.3–3.8s + line-graph 4 nốt tuần), s9a (gương + dấu hỏi)
   - F: `ScenesF.tsx` s9b (đèn rọi vào ngực), s10 (HEADLINE + thẻ giá minh hoá + bóng người mờ), s11 (HEADLINE + huy chương vẫn cầm tay + push-in 1.00→1.03 + **dead stop 2.0s**, không SFX/BGM)
   Mỗi agent: still 3/shot + boundary + frame0, tsc sạch, không gradient/blur (T6 locked), safe zone caption bottom:224 ngoài 210px.

2. **QA agent**: still QA, determinism (md5 ×2), claims C1–C4, caption ≤28 chars, chip windows s6/s8/s10, SFX cue timing (ting 0.90s, taps 1.51/2.29/3.13, drip-b 3.70), BGM mix (−14 LUFS, TP≤−1.5, pure silence 53.60–55.60s).

3. **Render agent**: `pipeline.py render chung-minh-de-lam-gi --min-seconds 40 --max-seconds 60` → ffprobe xác nhận 55.60s/1668f, pure silence cuối.

4. **Gate C**: video-reviewer 3 lens (visual/audio/alignment) trên MP4, score ≥8, final-check.md full regression.

5. **Delivery**: `pipeline.py check`, director viết báo cáo, workbench, optional human-listen.

## File quan trọng (đừng đụng hay ghi đè)
- `docs/chung-minh-de-lam-gi/voice.json` — khóa byte-exact từ gate A
- `docs/chung-minh-de-lam-gi/script.md` — Totals 55.60s, re-hook 21.94s
- `docs/chung-minh-de-lam-gi/content-pack.md` — 15/15 join == voice.json
- `docs/chung-minh-de-lam-gi/mix-plan.md` — BGM keyframes, shot starts (s1 0.00 … s11 50.26, end 55.60)
- `docs/chung-minh-de-lam-gi/assets-manifest.md` — SFX gains (−18/−18/−21/−24/−26), sfx-keys đã xóa
- `src/videos/chung-minh-de-lam-gi/timeline.ts` — CMD_SHOTS 1668f, CMD_SFX, CMD_BGM_KEYS
- `src/videos/chung-minh-de-lam-gi/Reel.tsx` — composition (import scenes stubs)
- `src/videos/registry.ts` + `tests/core/registry.test.ts` — đã đăng ký ChungMinhDeLamGiReel 1668f

## Tickets carried (Thấp, không chặn, re-verify tại C)
N1–N3 (board-only nits), AR-06 (ASR watchlist: khẩy/triền miên/phăng phắc/định giá), AR-07 (sfx-keys dropped, không unlicensed ship), pace s6/s7a 4.45–4.47 syl/s accepted, s1 CER 0.054 accepted-noise.

## Style (user chỉ định, khác video 1)
Nền đen `#060606`, chữ trắng `#FAFAF7`, nhấn cam `#F58B4C`, stick-figure que đơn giản (≤3 nét mặt), mỗi scene một ẩn dụ, motion nhẹ (fade/slide/scale), safe zone 9:16, không gradient/blur, không image assets, không có CTA, kết câu hỏi mở + lặng 2.0s. Không giống truongthanh (hóa đơn/stamp) — user yêu cầu theme tương tự stick-figure nhưng nội dung introspective.

## Liên hệ
Nếu cần hỏi voice/clone: brief.md §Voice đã ghi 2 cơ sở authorization. Nếu cần sửa script: re-open gate A (phải qua pipeline, không tự động).
