# Integration review — chung-minh-de-lam-gi (Gate E, Round 1)

**Role:** integration-reviewer (clean context, không phải producer). Đọc chéo cùng lúc: brief.md, script.md, content-pack.md, voice.json + voice-report.md, assets-manifest.md, mix-plan.md, join-notes.md, design-spec.md + review A (9.2), content (9.5), audio (9.3), D (9.0).

**Điều kiện qua Gate E:** score ≥ 9/10 **và** không còn ticket Cao/Trung mở. Không chạy pipeline.py (theo chỉ thị).

## Round 1

### 1. Điểm đồng được (không ticket)

- 15/15 join == `voice.json` byte-for-byte; s7a exact 16/20/16; headline == lời nói tại s1/s5/s10/s11 (không caption đáy cùng lúc). ✓
- Hook s1: headline đủ từ frame 0 + voice ~2.17s ≤ 3s (tắt tiếng vẫn hiểu: công nhận + trống). ✓
- Re-hook s5: ~20s (đo thực 21.94s — chênh lệch, xem E3). ✓
- Highlight beats landing delivery+visual+light: H1 (s4a→s4b: sáng rực → im phăng phắc, máy lạnh-rè), H2 (s7a→s7b: huy chương treo tường → ngực, gap 0.40s), H3 (s9a→s9b: soi gương → đèn rọi vào ngực, BGM tắt s10) — join-notes §75–79. ✓
- BGM vs luân chuyển: đêm Gebä s9a (−18.1 dB), tắt s10 (dry voice), lặng thuần 53.60–55.60s inviolable. ✓
- Safe zone: caption bottom:224, ngoài 210px đáy (design-review T5 PASS). ✓
- T6 locked: shape phẳng + opacity, không gradient/blur. ✓
- Tone: không thù hại/giảng đạo; nhân vật que nhất quán, cận mặt s2b expressive; huy chương vẫn cầm tay s11 (I4); không CTA; kết câu hỏi mở + lặng 2.0s. ✓
- Proto + stills QA đã render: cover, style-hook/turn/end, style-s2b, board, motion-hook (`out/qa/chung-minh-de-lam-gi-*.png`). ✓

## 2. Ticket (exhaustive, Round 1)

| id | severity | where | evidence | concrete change | owner | acceptance |
|---|---|---|---|---|---|---|
| E1 | Cao | `src/videos/chung-minh-de-lam-gi/` + `src/videos/registry.ts` | Thư mục video chưa tồn tại: không có `index.ts` (`defineVideo`), `timeline.ts`, `kit.tsx`, `Reel.tsx`, `workbench.tsx`; `registry.ts` không đăng ký `ChungMinhDeLamGiReel`. `proto/` + stills chỉ là design, chưa tích hợp compositing → Gate E không thể render. | Tạo `src/videos/chung-minh-de-lam-gi/index.ts`: `defineVideo({id:'ChungMinhDeLamGiReel', slug:'chung-minh-de-lam-gi', durationInFrames:1668, fps:30, width:1080, height:1920, testFrames:[0,834,1667], tags:['story','vietnamese']}`; đăng ký vào `registry.ts` (không chạm `Root.tsx`); build `timeline.ts`/`kit.tsx`/`Reel.tsx`/`workbench.tsx` theo join-notes §82 (shot starts 1668f, BGM/SFX theo mix-plan, `voice.json` read-only). Cập nhật `tests/core/registry.test.ts` mảng `toEqual` với entry mới. | director/integration | `tsc --noEmit` sạch; `vitest registry.test.ts` pass với entry mới; duration 1668f = 55.60s = join-notes measured end; `testFrames` cuối = 1667. |
| E2 | Trung | `design-spec.md` §8 (Root snippet) vs `join-notes.md` timeline | `design-spec.md` §8 hardcode `durationInFrames: 1587` (~52.9s, ước tính @4.1) + `testFrames [0,800,1586]`; `join-notes.md` đo 1668f (55.60s), `voice-report.md` ≈55.6s. Nếu copy snippet → sai toàn bộ mốc cue (BGM truncate, lặng s11 53.60–55.60s, shot starts) lệch ~2.7s. | Cập nhật `design-spec.md` §8 snippet: 1668f, 55.60s, `testFrames [0,834,1667]`; ghi "đã reconcile theo `join-notes.md` measured voice". | design/spec | Snippet == `join-notes.md` (1668f/55.60s); không còn hardcode 1587. |
| E3 | Trung | re-hook s5 landing | `script.md` Totals + T1b target ~19.83s (cửa sổ 15–20s); `join-notes.md` đo s5 voice start 21.94s (voice thực chậm hơn ước tính 4.1). Drift +2.1s ngoài cửa sổ; gap khóa (s7/s9) và lặng cuối không thể cắt; chỉ s5 tail 0.30→0.20 tiết kiệm 0.10s → vẫn ~21.84s. | Cập nhật `brief.md`/`script.md` re-hook target thành ~21.94s (≈22s); director xác nhận giữ ý "~20s" (khoảng 20–22s retention), không cắt gap/lặng khóa. | script/director | `brief` + `script` Totals re-hook = con số đo (21.94s); gap s7a→s7b 0.40s, s9a→s9b 0.30s, lặng 2.0s nguyên vẹn. |
| E4 | Trung | `join-notes.md` "Per-key reconciliation" vs bảng timeline đo | `join-notes.md` bảng timeline: s1 2.20s … s11 5.41s, end 55.60s. Cột per-key ngay dưới: s1 2.45s … s11 5.66s (s6 4.11s vs 3.86s; s8 4.35s vs 4.10s; …) — mâu thuẫn nội bộ. Builder dùng cột per-key sẽ dịch shot và phá lặng 53.60–55.60s. | Gộp cột per-key cho khớp bảng timeline (shot dur + đuôi/gap), hoặc xóa cột trùng và chỉ dẫn builder dùng bảng timeline làm source of truth. | director | Mỗi key per-key == bảng timeline; s11 kết thúc 55.60s; lặng 53.60–55.60s inviolable. |
| E5 | Thấp | `assets-manifest.md` vs `join-notes.md` SFX cue table | s1 ting gain: manifest −18 dB (0.126) vs join-notes −26 dB; s3 1.51s −18 vs −22; s3 3.13s manifest tap-a vs join-notes tap-b; applause 111f vs 110f. | Nhất quán hóa file/gain/frames bảng cue SFX giữa hai manifest theo mốc ASR đã lock (AR-02 đã fix vị trí s1 = 0.90s). | audio | Hai bảng giống nhau tại cùng offset; không SFX sau 53.60s. |
| E6 | Thấp | `script.md` cột giây tuyệt đối (0.00–52.87) | Là ước tính @4.1 syl/s, script tự ghi "Đo ffprobe xong thì cập nhật cột giây"; `join-notes.md` đã đo end 55.60s, s11 50.26–55.60. Còn chênh so với cột script (kết thúc 52.87). | Đồng bộ `script.md` Totals/cột giây với con số đo (`join-notes`/`voice-report`), hoặc ghi rõ đây là ước tính và `join-notes` là source of truth. | script | `script.md` không còn chứa con số mâu thuẫn `join-notes`/`voice-report`. |
| E7 | Thấp | `design-spec.md` §5 "cards validated in `SC/gallery/api/library.json`" | Tìm toàn repo không thấy thư mục `SC/` và file `gallery/api/library.json` → không chứng thực cục bộ được việc validate card/style-key. design-review R2 đã validate proto cục bộ (PASS); chỉ sai con trỏ bằng chứng. | Xác nhận tồn tại `SC/` (nếu là thư viện ngoài repo) hoặc trỏ bằng chứng validation về `proto`/repo-local; cập nhật `design-spec.md` §5. | design | Có bằng chứng card/style-key đã validate trong repo, không phụ thuộc đường dẫn ngoài repo không xác định. |
| E8 | Thấp | `join-notes.md` §87 carried tickets (non-blocking, re-verify gate C) | N1–N3 (board-only nits, build-safe), AR-06 (ASR watchlist: khẩy/triền miên/phăng phắc/định giá — accepted-noise, zero drops/adds), AR-07 (`sfx-keys` dropped, không tài liệu unlicensed ship). | Ghi nhận vào Gate E: các nít này không chặn build; AR-06 zero drops/adds reconfirmed; AR-07 không unlicensed ships. | content/design/audio | Không phát sinh ticket mới chặn Gate E. |
| E9 | Thấp | `voice-report.md` pace | s6 4.45, s7a 4.47 syl/s vượt ngân sách 3.7–4.2; chấp nhận là natural TTS, không được tăng tốc (`script.md` lesson). Tổng 55.60s ≤ 59.5s vẫn giữ. | Không đổi audio; ghi nhận monitoring; nếu render quá dài rút đuôi s5 theo T1b (không đụng gap/lặng khóa). | voice/audio | Pace đã ghi nhận; tổng video ≤ 59.5s; gap/lặng khóa nguyên vẹn. |
| E10 | Thấp | `voice-report.md` s1 | s1 CER 0.054 ("trống"→"chống", Southern final-consonant ASR merge); targeted regen tries 16 đã stuck; accepted-noise (`brief.md` lesson 10), không regen thêm. | Không regen; ghi nhận s1 accepted-noise trong `voice-report.md` (đã có). | voice | `voice-report` đã ghi accepted-noise; không có ticket mới. |

## 3. Score & verdict

- **Score: 4/10**
- **Verdict: revise**
- **Path:** `docs/chung-minh-de-lam-gi/integration-review.md`

Lý do: từng nhánh (script/content/audio/design) đã pass riêng, nhưng Gate E (sự hợp nhất) chưa đạt: `src/videos/chung-minh-de-lam-gi/` hoàn toàn chưa tồn tại và `registry.ts` chưa đăng ký comp (E1 Cao); ngoài ra còn 3 mâu thuẫn Trung mở (E2 duration 1587 vs 1668f, E3 re-hook drift 21.94s, E4 `join-notes` per-key dur vs timeline table). Để pass: đóng E1 (tạo manifest + đăng ký `registry.ts` + `timeline`/`kit`/`Reel`/`workbench` theo join-notes §82), đóng E2–E4, rồi build, `tsc`, still QA, `ffprobe` xác nhận 55.60s / 1668f / lặng 53.60–55.60s inviolable.

## Round 3 (Gate E, clean context)

**Tổng kết:** E1–E4 (Cao/Trung) đều CLOSED; E5–E10 (Thấp) được ghi nhận, carried (non-blocking, re-verify tại gate C). `tsc --noEmit` sạch, `vitest tests/core/registry.test.ts` 2/2 xáng (đã chạy lại sau căn chỉnh), prettier OK. Không chạy `pipeline.py` theo chỉ thị.

### Ticket evidence (Round 3)

| id | severity | trạng thái | evidence (file hiện tại) |
|----|----------|------------|--------------------------|
| E1 | Cao | **CLOSED** | `src/videos/chung-minh-de-lam-gi/` đầy đủ: `index.ts` (`defineVideo`, id `ChungMinhDeLamGiReel`, `durationInFrames: CMD_TOTAL` = 1668, fps 30, 1080×1920, `testFrames [0, 834, 1667]`, tags `['story','vietnamese']`), `timeline.ts` (`CMD_TOTAL 1668`, 15 keys `s1…s11`, `CMD_SFX`/`CMD_BGM_KEYS` theo mix-plan), `kit.tsx`, `Reel.tsx` (BGM/SFX/voice per mix-plan, voiceOffset 0), `workbench.ts`, scenes stubs `ScenesA…F.tsx`. `registry.ts`: import + mảng entry `chungMinhDeLamGiVideo` (không chạm `Root.tsx`). `tests/core/registry.test.ts`: 10 entries, `ChungMinhDeLamGiReel` 1668f + `TiecNguoiHayNamThangReel` 1578f. |
| E2 | Trung | **CLOSED** | `design-spec.md` §8 Root snippet: `durationInFrames: 1668`, `testFrames [0, 834, 1667]`, ghi "đã reconcile theo `join-notes.md` measured voice" (55.60s). Không còn hardcode 1587/1586/52.9s. `index.ts` `testFrames` đã căn khớp `[0, 834, 1667]` với snippet §8. |
| E3 | Trung | **CLOSED** | `script.md` Totals: **đo thực: 55.60s**; re-hook s5 "**đo thực Thanh Long: 21.94s**" (join-notes/voice-report source of truth), trước metà video 55.60s; gap s7a→s7b 0.40s, s9a→s9b 0.30s, lặng cuối 2.0s nguyên vẹn (T1b không cần vì ≤ 59.5s). |
| E4 | Trung | **CLOSED** | `join-notes.md` bảng timeline đo: s1 2.20s … s11 5.41s, end **55.60s** = **1668f @30fps** (≤ 59.5s cap). Cột per-key: s1 2.20s … s11 5.33s; end 55.60s. Không SFX sau 53.60s; lặng 53.60–55.60s inviolable; mọi `voiceOffset = 0` (§82). (Lưu ý: cột per-key là sách chốt voz+khoảng, không phải source of truth shot-start — builder dùng bảng timeline.) |
| E5 | Thấp | **CLOSED** (sửa 1f) | `assets-manifest.md` cue table gains nhất quán với `timeline.ts` `CMD_SFX`: −18/−18/−21/−24/−26/−26/−16 dB tại cùng offset ASR-lock. Sửa s4a applause trim `111 → 110f` khớp `timeline.ts` (110f) và `join-notes.md` cue table (110f). Không SFX sau 53.60s. |
| E6 | Thấp | carried | `script.md` cột giây mốc giữ ước tính @4.1 (kết thúc 52.87) nhưng Totals đã ghi "đo thực: 55.60s" + `join-notes`/`voice-report` là source of truth → không còn con số mâu thuẫn không ghi chú. |
| E7 | Thấp | carried | `design-spec.md` §5 con trỏ `SC/gallery/api/library.json` (ngoài repo); proto đã validate cục bộ PASS review R2. |
| E8 | Thấp | carried | Carried tickets N1–N3 (board-only nits, build-safe), AR-06 ASR watchlist (zero drops/adds), AR-07 `sfx-keys` dropped, không unlicensed ship. |
| E9 | Thấp | carried | `voice-report.md` pace s6/s7a vượt ngân sách 3.7–4.2 syl/s (natural TTS, không tăng tốc audio per lesson); tổng 55.60s ≤ 59.5s giữ nguyên. |
| E10 | Thấp | carried | `voice-report.md` s1 accepted-noise CER 0.054 ("trống"→"chống"), targeted regen stuck tries 16, không regen thêm. |

### 3. Score & verdict Round 3

- **Score: 9/10**
- **Verdict: pass** (Gate E đạt: score ≥ 9 **và** không còn ticket Cao/Trung mở)
- **Path:** `docs/chung-minh-de-lam-gi/integration-review.md`

Ghi chú: chỉ còn E6–E10 (Thấp) carried, không chặn Gate E; re-verify lại tại gate C theo join-notes §87. Tùy chọn tiếp theo: still QA + `ffprobe` xác nhận render 55.60s / 1668f / lặng 53.60–55.60s (không chạy `pipeline.py`).
