# Handoff — dung-bien-tuoi-30-thanh-ban-an

## Yêu cầu “pass hết 10/10” — 2026-10-19 00:46 +07:00

`video-director` không áp dụng yêu cầu này vì không có bằng chứng để đổi các
điểm review thật thành 10/10. Gate C vòng 3 vẫn `revise`: lens visual 8.2,
audio 6.8 và alignment 7.6. `s3a`, `s6b`, `s10` còn rủi ro sai lời mang ý
nghĩa nội dung; `s1`, `s6a` còn rủi ro chuẩn hoá số-từ. Đây là blocker Gate C
không được override theo workflow, nên Voice và Render tiếp tục `blocked`, QA
tiếp tục `pending`. Không publish.

Lỗi audit đường dẫn review lịch sử đã được sửa ở `scripts/pipeline.py`: audit
giờ nhận basename của cả đường dẫn Windows và POSIX. Regression test được thêm
vào `scripts/test_pipeline.py`; test mục tiêu pass. Lệnh
`python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` hiện exit
0 (`ok`). Toàn bộ `scripts.test_pipeline` chạy 94 test, còn 3 lỗi ngoài thay đổi
này: hai race trạng thái monitor (`stopped` nhận `exited`) và một khác biệt
đường dẫn macOS `/private/var` so với `/var`.
`npm run verify` qua lint nhưng dừng ở `format:check` do 44 file Prettier tồn
đọng trong repo (gồm các video khác và các file video này đã có từ trước); không
tự động format hàng loạt vì sẽ chạm vào thay đổi của owner/agent khác.

### Bước tiếp theo

Khôi phục provider TTS hoạt động hoặc cung cấp MP3 thay thế đúng lời cho
`s1`, `s3a`, `s6a`, `s6b`, `s10`; sau đó chạy lại voice measure/ASR, audio
review, Join, E, B, Build, Render, Gate C và Final QA theo thứ tự.

## Đồng bộ trạng thái theo yêu cầu chủ video — 2026-10-19 00:21 +07:00

Không thể đánh dấu video là `complete` vì Gate C đã kết thúc vòng 3 với kết quả
`revise` (điểm hợp nhất 7.6/10), trong khi lỗi lời đọc thuộc nhóm blocker không
được override. `video-director` đã cập nhật trạng thái thật qua `pipeline.py`:

| Khu vực | Trạng thái hiện tại | Bằng chứng / lý do |
|---|---|---|
| Research, Brief, Script, Content, Design, Build, Audio | `done` | Các artifact hiện có; Design/Audio dùng hard-cap override và giữ accepted risks |
| Voice | `blocked` | ASR đạt 11/16; `s3a`, `s6b`, `s10` có rủi ro sai lời mang ý nghĩa nội dung; `s1`, `s6a` còn rủi ro chuẩn hoá số-từ |
| Motion | `skipped` | Video giữ workflow v3; không tự ý nâng lên v4 |
| Render | `blocked` | Render cũ mất hiệu lực xác minh khi Voice được mở lại; Gate C chưa đạt |
| Final QA | `pending` | Không được chạy trước khi có render mới và Gate C pass |

### Quyết định đã khoá

- Giữ nguyên `voice.json`; không sửa lời chuẩn để khớp với kết quả ASR.
- Giữ composition `DungBienTuoi30ThanhBanAnReel`, 1080×1920, 30 fps và output
  slug `trung-kien-nang-cao`.
- Không publish. MP4 hiện có chỉ là render cũ, không phải deliverable đã được Gate C
  và Final QA phê duyệt.
- VieNeu đã thử whole-line, phrase-split, punctuation steering và 60 seed nhưng
  chưa tạo take đạt; Edge-TTS đã thất bại trước khi tạo audio.

### File đang dở

- Không có file source nào đang được chỉnh sửa.
- Năm clip cần thay thế/khôi phục: `public/audio/dung-bien-tuoi-30-thanh-ban-an/{s1,s3a,s6a,s6b,s10}.mp3`.

### Bước tiếp theo theo thứ tự

1. Khôi phục một provider TTS hoạt động hoặc bổ sung MP3 thay thế đúng lời cho
   `s1`, `s3a`, `s6a`, `s6b`, `s10`.
2. Chạy `npm run voice:measure -- dung-bien-tuoi-30-thanh-ban-an --out src/videos/dung-bien-tuoi-30-thanh-ban-an/voice-durations.ts` và làm lại ASR/voice evidence.
3. Chạy lại audio review, Join, E, B, Build, Render, Gate C và Final QA theo thứ tự
   workflow v3; mọi reviewer phải là context mới.
4. Chỉ sau Gate C pass và Final QA pass mới viết `eval.md`, chạy
   `python3 -I scripts/pipeline.py check dung-bien-tuoi-30-thanh-ban-an` và báo hoàn tất.

### Audit đã xử lý

Ba review Gate A lịch sử vẫn giữ nguyên đường dẫn Windows trong bằng chứng.
`pipeline.py` nay chuẩn hoá basename khi kiểm tra trên POSIX, có regression test;
audit video exit 0 mà không sửa tay `status.json`.

## Final audio fix round 2 — 2026-10-18

- Updated `mix-plan.md` only for the cue correction; voice clips, `voice.json`, `timeline.ts`, and `Reel.tsx` were not edited.
- Re-ran `npm run voice:measure -- dung-bien-tuoi-30-thanh-ban-an --out /tmp/dung-bien-voice-durations-final.ts`; the generated file is byte-identical to `src/videos/dung-bien-tuoi-30-thanh-ban-an/voice-durations.ts`.
- Rebased every SFX cue on the current measured durations with `ceil(spoken-end × 30) + 1` frame. The critical corrections are `s3a 130f / 4.333s`, `s6b 94f / 3.133s`, and `s10 58f / 1.933s`.
- `mix-plan.md` now contains exact bounded cue windows and a round-2 no-overlap proof. All 12 cue instances pass with at least one 30 fps frame of post-voice clearance.
- Re-ran `ffprobe`, `ebur128=peak=true`, and `volumedetect` across all 25 current MP3s (16 voice + 1 BGM + 8 SFX). The current source measurements are recorded in the latest audio review; no integrated mix was rendered.
- AUD-004/AUD-007 are resolved at the plan/proof level. AUD-005 remains pending: integrated render, final loudness, ducking, voice/music windows, and near-silent ending are director/build dependencies and are not claimed here.
- Final `python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` remains **FAIL** for the pre-existing missing canonical Gate A report (`script-review.md`, reported three times) and stale `design-reviewer` running state while design is done. No status file was edited.

## Voice-agent reconciliation update — 2026-10-18

- Current MP3s were remeasured directly; no new audio was generated. `voice.json` and `timeline.ts` remain unchanged.
- Updated `voice-report.md` and `voice-clone-asr.md` with fresh `ffprobe`, PCM faster-whisper CER, `silencedetect`, `ebur128`, and `volumedetect` evidence for all 16 voice clips.
- Reran `npm run voice:measure -- dung-bien-tuoi-30-thanh-ban-an --out src/videos/dung-bien-tuoi-30-thanh-ban-an/voice-durations.ts` because targeted regeneration changed durations. Current total voice is 43.737 s; `s6b` is 3.087 s / 4.21 syl/s.
- Ticket closure: AUD-001 not fixed; AUD-002 not fixed (`s9b` passes but `s8` fails); AUD-003 not fixed (3.5 LU loudness spread); AUD-006 not fixed (s6b CER 0.174). AUD-004 and AUD-005 remain with audio-agent/director for mix integration and render proof.
- Current fresh ASR passes 8/16 clips. The remaining machine-unverifiable items are listed in `voice-report.md` and `voice-clone-asr.md`; no naturalness or accent claim is made.
- Final required audit command: `python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` → **FAIL** only because three historical Gate A entries reference missing `docs/dung-bien-tuoi-30-thanh-ban-an/script-review.md`. No voice-agent/stale-agent error remains in the final audit output.

## Audio-agent handoff

- Stage: `audio` remains `in_progress`; producer packet is complete, independent `audio-reviewer` is still required before `audio` can be marked `done`.
- Producer: `audio-agent-2` (completed this continuation).
- Owned outputs: `public/audio/dung-bien-tuoi-30-thanh-ban-an/bgm.mp3`, eight `sfx-*.mp3`, `assets-manifest.md`, `mix-plan.md`, and `analysis/no-beat-sync.md`.
- Decision: original deterministic soft-story BGM, no beat grid. Timeline remains voice-led; cues are relative to shot starts.
- Do not edit voice clips, `timeline.ts`, or `Reel.tsx` in this handoff. The director owns the eventual mix integration.

## Stage / gate snapshot

| Area | State | Evidence / next owner |
|---|---|---|
| Research | done | `research.md` |
| Brief / Script | done | Gate A pass 9.0 in round 3; see open audit issue below |
| Content | in_progress | `content-pack.md` from locked script/voice |
| Voice | in_progress | clone route and voice clips owned by voice-agent |
| Design | in_progress | style/prototype work owned by design-agent |
| Audio | in_progress | producer files complete; next `audio-reviewer` measures and records `audio-review.md` |
| Render / Final QA | pending | downstream |

## Checks completed

- `ffprobe` run on BGM and every added SFX: all decode as MP3, 44.1 kHz stereo, with non-zero durations.
- FFmpeg `volumedetect` and `ebur128=peak=true` run on every added file; no selected source has a peak below −12 dB.
- `sfx-paper-wind.mp3` is 5.50s and is explicitly bounded in every cue (`45f` or `48f`).
- No voice clip, timeline, or Reel file was modified.

## Audio fix round 1 update

- `mix-plan.md` was corrected for AUD-004/AUD-005. All SFX cues now use explicit relative frame offsets and bounded `durationInFrames`; each cue starts at least one 30 fps frame after the measured spoken interval and fits the documented hold.
- No audio file, `voice.json`, `timeline.ts`, or `Reel.tsx` was changed. `assets-manifest.md` remains valid because the source inventory and measurements did not change.
- AUD-005 remains pending until Join produces an integrated render. The corrected plan records the exact post-Join acceptance checks for integrated LUFS, true peak, voice/music gap, duck ramps, disjoint SFX intervals, and the final near-silent hold; no render result is claimed here.

## Open issues / exact next steps

1. Run an independent audio reviewer over the packet and write `docs/dung-bien-tuoi-30-thanh-ban-an/audio-review.md`; then record the audio review/gate through `pipeline.py`.
2. Existing preflight/audit failure is outside this audio packet: all three historical Gate A entries point to `docs/dung-bien-tuoi-30-thanh-ban-an/script-review.md`, but this checkout only has the round-specific `script-review.a*.md`, `b*.md`, and `c*.md` files. Do not hand-edit status; the director should restore/produce the canonical report or repair the pipeline evidence path.
3. After audio review, the director integrates the mix plan in `Reel.tsx`, renders, and re-measures the final mix.

## Latest required audit result

`python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` remains **FAIL** for pre-existing/out-of-scope state:

- canonical Gate A report `docs/dung-bien-tuoi-30-thanh-ban-an/script-review.md` is missing (three review references); round-specific reports exist.
- `voice-agent-3` is still recorded as running while the `voice` stage is done; status ownership remains with the director/voice workflow.

The last required command for this handoff is `python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an`; its result is reported in the agent handoff.

## Design-agent Round 2 audit note (2026-10-18)

Design outputs are complete and verified, but the repository-wide audit remains red for pre-existing ownership/evidence issues outside this design scope:

```text
python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an
FAIL
- review A report docs\dung-bien-tuoi-30-thanh-ban-an\script-review.md is missing (reported three times by historical review entries)
- agent voice-agent-3 is still running but stage voice is done
```

`npm run test:visual` also remains red outside this video: `CuocGoiNhoReel@1418` attempts to render frame 1418 although that composition ends at frame 1307. `npm run verify` reaches `format:check` but reports the repository's existing formatting debt across unrelated files; owned proto files were formatted and `npx tsc --noEmit` passes. The director/voice owner must repair the canonical script-review evidence and stale voice-agent state; design-agent did not edit status, timeline, Reel, Root, package.json, or other owners' files.

## Director continuation — Gate E/B sequence (2026-10-18)

- Integrated Join preview rendered at `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview.mp4`: 1080×1920, 30fps, 51.776s, with video/audio streams. `npx tsc --noEmit` passes.
- Gate D Round 3 was formally recorded: `8.3/10`, revise. D hard-cap override was recorded by `video-director`; D3/D6/D7/D8/D10 remain accepted-risk.
- Gate E Round 3 was formally recorded: `6.8/10`, revise. E hard-cap override was recorded by `video-director`; E-002/E-003/E-004/E-005/E-008/E-009 remain accepted-risk. This is not a clean Gate E pass.
- Gate B Round 1 was formally recorded: `4.8/10`, revise. B-001…B-005 remain open; Build/Render must not be declared complete from this state.
- Preview audio measurement: integrated loudness `-21.8 LUFS`, LRA `1.7 LU`; this misses the `-14±1 LUFS` target. ASR evidence remains `7/16` passing, and s8 pause plus exact s1 timing contracts remain unproven.
- Current pipeline audit still fails only on the three historical Gate A entries that contain the literal backslash path `docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md`. This is carried as an audit blocker; no status file was hand-edited.

## Safe next step

Do not run a final delivery render or claim completion from this handoff. To proceed, resolve or explicitly accept the Gate B tickets with a new review cycle as allowed by the workflow, then run Build/Render/QA evidence and Gate C in order.

## Latest Gate E Round 3 closure — verified-r4 (2026-10-18)

- Fresh clean-context review appended to `integration-review.md`: **8.8/10, revise; hard-cap accepted-risk, not a clean pass**.
- Verified r4: 1080×1920, 30fps, video 51.633333s, AAC 51.614667s, container 51.633333s; `ebur128` −14.7 LUFS; true peak −1.9 dBFS.
- R2 fixes verified: s1 5f lead-in plus 8f/0.2667s post-roll; s8 boundaries 43f/89f; current s3a cue `[315,321)` fits current scene `[185,321)`; deterministic motion and all 16 scenes type-check.
- Independent voice/BGM stems exist and decode; source envelope proves 200ms duck ramps and 2.10s BGM-zero tail. Per-window transient/pumping measurement remains a low-severity carry item.
- Authoritative ASR remains 11/16; failures `s1,s3a,s6a,s6b,s10` are carried honestly as accepted-risk and are not a clean audio/text pass.
- Required audit still fails on three historical Gate A backslash paths and stale `integration-reviewer-6` activity. No status/pipeline mutation was made during the review.
- Latest continuation: final MP4 exists at `out/dung-bien-tuoi-30-thanh-ban-an-trung-kien-nang-cao-reel.mp4` and was re-rendered after shortening the s10 paper-wind cue to `[1481,1505)`. Gate C visual lens passed at 8.2/10 (visual content 8.1), but audio 6.8 and alignment 7.6 remained REVISE after three fresh Gate C rounds.
- Current blocking condition: local VieNeu clone remains 11/16 CER-clean. `s3a`, `s6b`, and `s10` are content-significant wording risks; `s1` and `s6a` have number-word normalization risks. Whole-line, phrase-split, punctuation-steering, and 60-seed targeted regeneration did not yield a selected clean take. Edge-TTS fallback was attempted but the service failed before producing audio. Do not claim Gate C pass or Final QA completion.
- Safe next step requiring external state: provide replacement MP3s for the five keys, or restore a working provider/fallback TTS route; then run `npm run voice:measure`, refresh voice evidence, reopen Build → Render → Gate C, and rerun Final QA. Do not change `voice.json` to match ASR output.
- Latest render measurements: H.264/AAC 1080×1920 30fps, 51.633333s; -14.7 LUFS; -1.9 dBFS peak; BGM zero 2.10s; MP4 tail silence ~1.396s after foley.
- Verification: `npx tsc --noEmit` and targeted detector regression test pass. `npm run test:visual` fails on unrelated `CuocGoiNhoReel` golden/frame baseline. `npm run verify` stops at repository Prettier failures. `pipeline.py audit` still reports the historical Gate A backslash path.
