# Audio review — dung-bien-tuoi-30-thanh-ban-an

Round 1, clean-context machine review, 2026-10-18. Scope: `voice.json`, `voice-report.md`, `voice-clone-asr.md`, `assets-manifest.md`, `mix-plan.md`, `script.md`, and every file in `public/audio/dung-bien-tuoi-30-thanh-ban-an/`. No audio, `voice.json`, or manifest file was edited.

## Verdict

**REVISE — 5.7/10.** The packet has all 16 voice clips and all 9 BGM/SFX files, but it does not pass the audio gate: ASR has confirmed failures, voice loudness spread is 5.2 LU (limit 2 LU), the cue plan contains multiple speech overlaps, and the final integrated mix/closing hold is not yet measurable. Open `Cao`/`Trung` tickets remain.

Initial `python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` also failed on pre-existing non-audio state: missing canonical `script-review.md` and stale content-agent statuses. This report does not alter those files.

## Method and inventory

- `ffprobe` was run on every file. Voice: 16/16 present, MP3 mono 24 kHz, 43.489 s total. BGM: 56.430 s, stereo 44.1 kHz. SFX: 8/8 present, stereo 44.1 kHz.
- FFmpeg checks: `ebur128=peak=true`, `volumedetect`, `silencedetect=noise=-45dB:d=0.6`; PCM extraction for independent ASR and timbre measurements.
- ASR: faster-whisper `small`, Vietnamese, CPU/int8, with FFmpeg PCM 16 kHz input. Direct file input was additionally attempted but the installed PyAV failed with `metadata_errors`; the PCM route completed all 16 clips. CER uses the same punctuation/case-normalised character metric as `scripts/gen-voice-clone.py`.
- Spectrograms were generated and visually inspected for the ASR-suspicious clips `s1`, `s3a`, `s6a`, `s6b`, `s9b`, `s10`. No isolated broadband spike or visible hard cut-off was observed; this does not prove naturalness, emotion, clicks, or robotic artifacts by ear.

## Rubric scores

| Item | Score | Evidence | Result |
|---|---:|---|---|
| Completeness, duration, syllable rate, budget | 9/10 | 16/16 keys exist; total voice 43.489 s; script holds/gaps add 7.700 s → 51.189 s; measured rates in `voice-report.md` are about 3.67–4.99 syl/s | Pass with one fast outlier (`s6b`) |
| ASR/CER and wording | 3/10 | Independent rerun confirms `s1`, `s3a`, `s6a`, `s6b`, `s10`; additionally `s8`=0.043 and `s9b`=0.207 exceed CER 0.04 | Fail |
| Silence and planned holds | 7/10 | No voice clip has an internal silence >0.6 s; BGM tail has intentional 0.666 s silence. The final 2.4 s hold is only stated in the plan, not proven by an integrated render | Partially verified |
| Loudness, peak, timbre | 5/10 | Voice LUFS `-17.2…-22.4`, spread 5.2 LU > 2 LU; true peak `-1.6…-2.0 dBFS`; spectral centroid median `867–1,280 Hz`, pitch median `111.9–139.5 Hz` | Level consistency fail; no clip clipping |
| Mix feasibility, ducking, SFX timing | 5/10 | Planned duck is 5.2 dB with 200 ms ramps (within target), but no integrated mix exists; BGM bed/duck levels are not measured in voice-vs-music windows. SFX cues overlap speech in 10 planned intervals; `s5b` starts 0.098 s before voice end | Fail pending mix correction/render |
| Spectrogram/artifact screen | 8/10 | Suspicious clips show continuous harmonic energy without visible hard cut-offs or isolated broadband spikes | Machine screen only |
| Sources and licences | 9/10 | `assets-manifest.md` records origin/licence for `bgm.mp3` and all 8 SFX; BGM is project synthesis, SFX are identified Mixkit files with URLs and licence | Manifest evidence passes |

## Independent voice measurements

| Clip | Duration s | Rate syl/s | Independent CER | ASR | LUFS | True peak |
|---|---:|---:|---:|---:|---:|---:|
| s1 | 2.159 | 4.17 | 0.294 | `Vũi 30 bị coi như một bản án.` | -20.3 | -2.0 |
| s2 | 3.326 | 3.91 | 0.000 | `Ba dòng tội danh, chưa nhà, chưa kết hôn, chưa có địa vị.` | -17.4 | -1.9 |
| s3a | 4.236 | 4.01 | 0.419 | `Cái thứ khắc sẵn 18 học xong 25 cưới 30 lần quản lý.` | -17.6 | -1.6 |
| s3b | 1.975 | 4.05 | 0.032 | `và dành sách ấy vẫn cứ dài thêm.` | -20.4 | -2.0 |
| s4a | 3.380 | 3.85 | 0.019 | `tết đến mâm cổ còn bốc khói, thì những câu hỏi bật lên.` | -18.0 | -1.9 |
| s4b | 2.348 | 3.83 | 0.024 | `Khi nào cưới, lưng bao nhiêu mua nhà chưa?` | -18.8 | -1.9 |
| s5a | 1.661 | 4.21 | 0.000 | Exact canonical words | -20.0 | -1.9 |
| s5b | 2.498 | 4.40 | 0.000 | Exact canonical words | -21.6 | -2.0 |
| s6a | 3.475 | 4.32 | 0.101 | `Một người 30 tuổi chưa có nhà, không nhất thiết là người thất bại.` | -17.2 | -1.8 |
| s6b | 2.605 | 4.99 | 0.283 | `Cây móc 30A chỉ là một nét ai đó kẻ tay.` | -22.2 | -1.9 |
| s7a | 3.266 | 4.29 | 0.038 | One substitution: `lứt` | -18.0 | -1.7 |
| s7b | 1.748 | 4.58 | 0.032 | `nhằm` for `nhầm` | -19.6 | -1.9 |
| s8 | 4.130 | 3.87 | 0.043 | `Lưu về chưa kịp giữ...` | -17.6 | -1.9 |
| s9a | 2.975 | 4.03 | 0.000 | Words present; punctuation differs | -20.6 | -2.0 |
| s9b | 1.910 | 3.67 | 0.207 | Adds `Nhưng` before canonical line | -21.9 | -1.9 |
| s10 | 1.797 | 4.45 | 0.229 | `Đừng biến tuổi 30 thành bản ánh.` | -22.4 | -2.0 |

The existing report flags `s1,s3a,s6a,s6b,s10`; the independent rerun verifies all five and adds `s8,s9b` under the same CER≤0.04 gate. Number rendering as digits is still a wording/diacritic risk, not a pass.

## Silence, mix and cue evidence

All 16 voice clips returned no `silencedetect` gap above 0.6 s. The 2.4 s final hold cannot be measured from an unintegrated packet. `mix-plan.md` specifies BGM fade to zero after `s10`, but also places `sfx-paper-wind.mp3` at `s10 + 2.35 s`; this is compatible only with the stated “silence except paper-edge foley” interpretation, not with pure digital silence.

Using actual voice durations and the explicit frame durations in `mix-plan.md`, these SFX intervals overlap spoken audio: `s1` 0.80 s, `s2` 1.00 s, `s3a` 0.90 s, `s3b` 0.625 s, `s4a` 0.80 s, `s5b` 0.098 s, `s6b` 1.30 s, `s7a` 0.90 s, `s8` cue 1 0.80 s, `s8` cue 2 0.70 s, and `s9a` 0.525 s. `s10` starts after the 1.797 s voice clip, with about 0.553 s clearance. The plan says these cues sit below voice, but the rubric requires no SFX on a spoken word; the integrated render must prove masking is absent.

The BGM source is -20.3 LUFS / -10.1 dBFS max-volume by FFmpeg. At plan gain 0.20 (-14 dB), the nominal bed is approximately -34.3 LUFS-equivalent before render normalisation; at 0.11 (-19.2 dB), approximately -39.5. The planned duck delta is 5.2 dB and the 200 ms ramps are within target, but the required 12–18 dB voice/music windows and final -14 LUFS ±1 cannot be accepted without the integrated render.

## Tickets

| ID | Severity | Where | Evidence | Concrete change | Owner | Acceptance check |
|---|---|---|---|---|---|---|
| AUD-001 | Cao | `s1.mp3`, `s3a.mp3`, `s6a.mp3`, `s6b.mp3`, `s10.mp3` | Independent CER 0.294, 0.419, 0.101, 0.283, 0.229; canonical words/numbers are misrecognised | Regenerate only these keys from locked `voice.json`; preserve Vietnamese words `ba mươi`, `mười tám`, `hai mươi lăm`, `kẻ tay`, `bản án`; do not edit canonical text | voice-agent | Rerun faster-whisper small via PCM path; each CER ≤0.04 and no dropped/added word in the ASR text |
| AUD-002 | Trung | `s8.mp3`, `s9b.mp3` | Independent CER 0.043 and 0.207; `s8` hears `Lưu`, `s9b` adds `Nhưng` | Regenerate the two keys, keeping the locked punctuation/wording and the intended pause treatment | voice-agent | CER ≤0.04 for both; exact canonical word sequence present |
| AUD-003 | Trung | All voice clips, especially `s6a` -17.2 LUFS vs `s10` -22.4 LUFS | Voice loudness spread 5.2 LU, target ≤2 LU; true peaks are safe but perceived level is inconsistent | Apply one consistent gain/normalisation strategy to the regenerated/current voice set; remeasure every clip and update dependent duration evidence if any clip changes | voice-agent | 16/16 voice LUFS spread ≤2 LU; no true peak >-1.5 dBTP; durations remain in 40–60 s budget |
| AUD-004 | Trung | `mix-plan.md` cue table / actual voice intervals | 11 SFX intervals overlap speech, including `s5b` by 0.098 s despite “post-line hold” intent | Move cues intended for holds after the measured clip end, or shorten/duck them with explicit frame bounds; resolve all speech-overlap windows rather than relying on “below voice” | audio-agent | Cue table has no SFX interval intersecting a spoken interval; `s5b` begins after `s5b.mp3` end |
| AUD-005 | Trung | Integrated mix absent; final `s10` hold | No render exists to measure -14 LUFS ±1, true peak, 12–18 dB voice/music gap, ducking, or ≥1.2 s near-silent ending | Integrate the corrected plan in the video mix and produce a verified render/evidence pass; keep BGM fade and the intended paper-edge foley explicit | audio-agent | `ebur128` -14±1 LUFS, true peak ≤-1.5 dBTP, voice/music windows 12–18 dB, duck delta 4–6 dB with 150–300 ms ramps, final hold ≥1.2 s after last word with BGM near-silent |
| AUD-006 | Thấp | `s6b.mp3` | Fastest measured delivery: 4.99 syl/s; spectral/pitch screen cannot prove the intended near-whisper delivery | Recheck take after ASR regeneration; slow/re-record only if the producer’s machine checks show the line no longer fits the intended “nhỏ, chậm” delivery | voice-agent | Duration/rate is documented against the final take and the clip remains ASR-clean; no mandatory change if the corrected take is within delivery intent |

## Cannot verify by machine

Naturalness, emotional arc, Vietnamese accent quality, exact tone perception, breaths, clicks, robotic buzz, and whether the SFX feels audible but not distracting cannot be certified without listening. Spectrogram inspection found no visible hard cut-off or isolated broadband artifact in the suspicious clips, but this is not an auditory pass. A future optional human listen may record these items; it does not replace the numeric gate checks above.

## Required final audit

The required read-only command was run before this report and must be run again after writing it:

`python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an`

Observed result: **FAIL**

```
dung-bien-tuoi-30-thanh-ban-an: FAIL
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
  ✗ agent content-reviewer is still running but stage content is done
  ✗ agent content-agent-2 is still running but stage content is done
```

These failures are pre-existing and outside the audio packet; this audio reviewer did not edit status or any non-owned file.

## Round 2 — clean-context verification after voice regeneration and mix-plan changes

Reviewed 2026-10-18 against the current files, after the latest MP3 regeneration and `mix-plan.md` update. This section is appended only; no audio, `voice.json`, manifest, status, or other document was edited by this reviewer. No pipeline review/gate command was run.

### Verdict

**REVISE — 6.6/10.** The packet is complete and all 16 current voice clips decode, but the audio gate still fails: 8/16 clips fail the configured PCM ASR/CER threshold, voice loudness spread is 3.5 LU, the current cue proof regressed against regenerated durations (`s6b` and `s10` overlap speech, while `s3a` has only 2 ms clearance), and no integrated render exists to prove the final mix targets or closing hold. Open `Cao`/`Trung` tickets remain; therefore this is not a pass.

### Round-2 method and current inventory

- `ffprobe` was run on all 24 current MP3s: 16 voice clips, `bgm.mp3`, and 8 SFX. Voice clips are MP3 mono 24 kHz; BGM/SFX are MP3 stereo 44.1 kHz; all have non-zero duration and decode successfully.
- Current voice duration sum is **43.737 s**. The script's documented 7.700 s of gaps/holds gives an expected video budget of about **51.437 s**, inside 40–60 s. Current `s6b` is 3.086917 s and `s10` is 1.897958 s; these are newer than the durations used in the cue proof in `mix-plan.md`.
- Independent ASR used the repository's PCM path: FFmpeg mono 16 kHz float PCM into faster-whisper `small`, CPU/int8, with the repository CER normalisation/algorithm. This avoids the installed PyAV `metadata_errors` failure on direct MP3 input.
- `silencedetect=noise=-45dB:d=0.6` found no internal silence over 0.6 s in any of the 16 voice clips. The BGM source has a tail silence from 55.764–56.430 s; this is source behaviour, not proof of the final `s10` hold.
- `ebur128=peak=true` and `volumedetect` were run on every current voice clip and all BGM/SFX. Voice integrated loudness is −19.2…−22.7 LUFS (spread **3.5 LU**); true peak is −4.1…−2.3 dBFS. No voice clipping was detected. BGM is −20.3 LUFS / −3.0 dBFS true peak; SFX sources range −24.7…−12.3 LUFS and −11.0…−0.5 dBFS true peak.
- Fresh spectrograms of the eight ASR-suspicious clips (`s1`, `s3a`, `s4a`, `s4b`, `s6a`, `s6b`, `s8`, `s10`) showed continuous harmonic energy with no visible hard cut-off or isolated broadband spike. This is only a machine screen; it cannot certify naturalness, tones, breaths, clicks, or robotic artefacts by ear.

### Round-2 rubric scores

| Item | Score | Evidence | Result |
|---|---:|---|---|
| Completeness, duration, syllable rate, budget | 9/10 | 16/16 voice keys; 43.737 s voice; ≈51.437 s with documented holds; all media decode | Pass |
| ASR/CER and wording | 4/10 | Fresh PCM run: 8/16 pass; `s1`, `s3a`, `s4a`, `s4b`, `s6a`, `s6b`, `s8`, `s10` fail CER 0.058–0.378 | Fail |
| Silence and planned holds | 8/10 | No voice internal gap >0.6 s; final 2.4 s hold remains unmeasurable without integrated render | Partial |
| Loudness, peak, timbre | 6/10 | Voice spread 3.5 LU > 2 LU target; true peaks safe; spectrogram screen shows no visible hard cut-off | Fail on consistency |
| Mix feasibility, ducking, SFX timing | 5/10 | Plan specifies 5.2 dB duck / 200 ms ramps, but no integrated mix; current cue proof overlaps `s6b` and `s10` and under-clears `s3a` | Fail |
| Spectrogram/artifact screen | 8/10 | Eight suspicious current clips visually screened; no isolated spike/hard cut-off visible | Machine-only partial |
| Sources and licences | 9/10 | `assets-manifest.md` covers BGM synthesis and all 8 Mixkit SFX with source URLs/licence | Pass |

### Fresh PCM ASR/CER — all 16 clips

| Clip | Duration s | CER | Result | Current PCM ASR |
|---|---:|---:|---|---|
| s1 | 2.159042 | 0.294 | FAIL | `Vũi 30 bị coi như một bản án.` |
| s2 | 3.326333 | 0.000 | PASS | `ba dòng tội danh chưa nhà, chưa kết hôn, chưa có địa vị.` |
| s3a | 4.297958 | 0.378 | FAIL | `Cái thước khắc sẵn 18 học xong 25 cưới 30 liền quản lý.` |
| s3b | 1.974625 | 0.032 | PASS | `và dành sách ấy vẫn cứ dài thêm.` |
| s4a | 3.380292 | 0.094 | FAIL | `đến mâm cổ còn bốc khói thì những câu hỏi bật lên.` |
| s4b | 2.347667 | 0.073 | FAIL | `Kỳ nào cưới, lưng bao nhiêu mua nhà chưa?` |
| s5a | 1.660833 | 0.000 | PASS | `Bạn chưa có nhà, chưa kết hôn.` |
| s5b | 2.497958 | 0.000 | PASS | `nhưng ai đã quy định hôm nay bạn phải có đủ.` |
| s6a | 3.475083 | 0.101 | FAIL | `Một người 30 tuổi chưa có nhà, không nhất thiết là người thất bại.` |
| s6b | 3.086917 | 0.174 | FAIL | `Cây móc và mùi ấy chỉ là một nét ai đó kể tay.` |
| s7a | 3.265958 | 0.038 | PASS | `Nửa đêm, bạn lứt thấy bạn bè đã có nhà, có xe, đã cưới.` |
| s7b | 1.748208 | 0.032 | PASS | `Rồi tự hỏi, mình đi nhằm đường à.` |
| s8 | 4.129958 | 0.058 | FAIL | `không phải bàn không tiết kiệm. Lưu về chưa kịp giữ, đã có nơi đi mất.` |
| s9a | 2.975458 | 0.000 | PASS | `Mà đã bao nhiêu năm rồi? Chẳng ai hỏi bạn một câu?` |
| s9b | 1.909667 | 0.034 | PASS | `Vạo này, bạn sống có vui không?` |
| s10 | 1.897958 | 0.257 | FAIL | `Đừng biến tuổi 30 thành bản ảnh.` |

### Round-2 ticket verification and exhaustive remaining tickets

| ID | Status | Severity | Where | Evidence | Concrete change | Owner | Acceptance check |
|---|---|---|---|---|---|---|---|
| AUD-001 | OPEN | Cao | `s1`, `s3a`, `s6a`, `s6b`, `s10` | Old ticket remains open; current CER is 0.294, 0.378, 0.101, 0.174, 0.257 | Regenerate only these keys from locked `voice.json`; preserve `ba mươi`, `mười tám`, `hai mươi lăm`, `kẻ tay`, `bản án` | voice-agent | Fresh PCM faster-whisper run: each CER ≤0.04 and canonical word sequence present |
| AUD-002 | PARTIAL / OPEN | Trung | `s8` (paired old ticket; `s9b` is now within threshold) | `s8` CER 0.058; `s9b` improved to 0.034, so only `s8` remains unresolved | Regenerate `s8` only, preserving both canonical sentences and the intended internal pause; do not alter `voice.json` | voice-agent | `s8` CER ≤0.04 and both canonical clauses are present |
| AUD-003 | OPEN | Trung | All voice clips, especially `s6b` −19.2 LUFS vs `s10` −22.7 LUFS | Current ebur128 spread is 3.5 LU, over the ≤2 LU target; peaks are safe | Apply one consistent gain/normalisation strategy to the current/regenerated voice set; remeasure all 16 | voice-agent | Spread ≤2 LU, no voice true peak >−1.5 dBTP, total budget remains 40–60 s |
| AUD-004 | REOPENED | Trung | `mix-plan.md` cue table vs current durations | Latest current durations make `s6b` cue 2.667 s overlap the 3.086917 s clip by 0.420 s; `s10` cue 1.833 s overlaps the 1.897958 s clip by 0.065 s; `s3a` cue at 4.300 s has only 0.002 s clearance from 4.297958 s, not one full 30 fps frame | Rebase every cue on current `ffprobe` durations; move `s6b` and `s10` after speech and move `s3a` to at least 4.333 s (or later), preserving explicit bounded durations and holds | audio-agent | Every cue starts at least one 30 fps frame after current spoken end; no cue interval intersects a spoken interval |
| AUD-005 | OPEN | Trung | Integrated mix/final hold | No integrated render exists in `out/`; source BGM and plan cannot prove final −14 LUFS, true peak, 12–18 dB voice/music gap, 4–6 dB duck, or ≥1.2 s near-silent ending | After voice/cue fixes, integrate the plan in the owned video mix and render the verification artifact; keep the paper-edge foley exception explicit | audio-agent + video-director | `ebur128` −14±1 LUFS, true peak ≤−1.5 dBTP, voice/music gap 12–18 dB, duck 4–6 dB with 150–300 ms ramps, final hold ≥1.2 s near-silent |
| AUD-006 | OPEN | Thấp | `s6b` | Current rate is 4.21 syl/s and is documented, but CER is 0.174; intended near-whisper naturalness remains unverified by machine | Recheck the regenerated `s6b` take; slow/re-record only if the clean take still misses delivery intent after ASR fix | voice-agent | Current take is ASR-clean, rate/delivery evidence is documented; no extra change if accepted by machine checks |
| AUD-007 | NEW / OPEN | Trung | `mix-plan.md` AUD-004 interval proof and `voice-report.md` after latest regeneration | The plan says its proof uses current durations, but its table still records old `s3a` 4.236 s, `s6b` 2.605 s and `s10` 1.797 s values; current ffprobe is 4.297958 s, 3.086917 s and 1.897958 s. This stale evidence is the reason the apparent AUD-004 fix regressed after voice regeneration | Re-run the mix-plan proof from the current MP3 set and update every dependent interval/duration entry; do not claim closure from stale measurements | audio-agent | Every duration in the proof matches current `ffprobe` output and the cue table passes AUD-004 with no overlap |

No other Cao/Trung audio ticket was found in the reviewed packet. `assets-manifest.md` remains complete for the current BGM/SFX inventory. The previous `AUD-002` `s9b` subcase is closed by measurement (CER 0.034), but the parent ticket remains open until the paired `s8` requirement passes.

### Cannot verify by machine

Naturalness, emotional arc, Vietnamese accent/tone quality, breaths, clicks, robotic buzz, and whether SFX feels audible but not distracting still require listening. Spectrograms found no visible hard cut-off or isolated broadband spike in the eight suspicious clips, but that is not an auditory pass. The final hold and BGM duck are also not measurable until an integrated render exists.

### Round-2 audit result

Required read-only audit run after this append:

`python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an`

Result: **FAIL**, pre-existing/out-of-scope repository state remains:

```text
dung-bien-tuoi-30-thanh-ban-an: FAIL
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
  ✗ review A report docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing
```

This reviewer did not edit status or any non-owned file and did not run pipeline review/gate.

## Round 3 — clean-context hard-cap review

Reviewed 2026-10-18 against the current packet after the documented third voice-fix round. This is the hard-cap Round 3 review. Only this report is appended; no audio file, `voice.json`, `assets-manifest.md`, `voice-report.md`, `voice-clone-asr.md`, `voice-durations.ts`, or mix plan was edited. No `pipeline.py review` or gate command was run.

### Verdict

**REVISE / accepted-risk at hard cap — 7.1/10.** All audio is present and decodes, voice level consistency and the current post-voice cue proof pass their numeric checks, but the machine ASR gate remains open at **7/16 clips** (`CER <=0.04`). The residuals are explicitly documented below as accepted-risk after the third voice round; this is not an audio-gate pass. No integrated render exists because Join/build has not happened, so AUD-005 remains pending and is assigned to `video-director`.

### Round-3 independent measurements

- `ffprobe` inspected all **25 current MP3 files**: 16 voice clips, `bgm.mp3`, and 8 SFX. All are non-empty and decode. Voice is mono 24 kHz; BGM/SFX are stereo 44.1 kHz. Exact current voice durations sum to **44.133915 s**; with the documented 7.700 s gaps/holds, expected video budget is **51.833915 s**, within 40–60 s.
- PCM ASR used FFmpeg mono 16 kHz extraction and faster-whisper `small`, CPU/int8, Vietnamese. CER used the repository's punctuation/case-normalised character metric and threshold `<=0.04`. Independent result: **7/16 pass**.
- `silencedetect=noise=-45dB:d=0.6` found no internal voice gap over 0.6 s in all 16 clips. BGM source tail silence is **55.763946–56.430000 s (0.666054 s)**; this is not evidence of the final closing hold.
- `ebur128=peak=true` plus `volumedetect` on all current files: voice integrated loudness **−21.2…−22.7 LUFS**, spread **1.5 LU**; voice true peaks **−2.4…−6.2 dBTP**, no clipping. BGM is **−20.3 LUFS / −10.1 dBFS max sample**. SFX sources measure **−24.7…−12.3 LUFS** and **−11.0…−0.5 dBFS max sample**.
- Fresh spectrograms were generated and visually inspected for `s1,s3a,s3b,s4a,s6a,s6b,s8,s9b,s10`. They show continuous harmonic energy and no visible hard cut-off or isolated broadband spike. This remains a machine screen, not a listening certification.

### Every current voice clip — independent PCM ASR

| Clip | Duration s | syl/s | CER | Result | Current PCM ASR / evidence |
|---|---:|---:|---:|---|---|
| s1 | 2.159042 | 4.169 | 0.294 | FAIL | `Vũi 30 bị coi như một bản án.` |
| s2 | 3.326333 | 3.908 | 0.000 | PASS | `ba dòng tội danh chưa nhà, chưa kết hôn, chưa có địa vị.` |
| s3a | 4.297958 | 3.955 | 0.405 | FAIL | `Cây thước khắc sẵn 18 học xong 25 cưới 30 liền quản lý.` |
| s3b | 1.974625 | 4.051 | 0.129 | FAIL | `và trên sách ấy vẫn cứ dài thêm.` |
| s4a | 3.380292 | 3.846 | 0.094 | FAIL | Initial `Tết đến`/`cỗ` wording not recovered |
| s4b | 2.347667 | 3.834 | 0.024 | PASS | `Khi nào cưới, lưng bao nhiêu mua nhà chưa?` |
| s5a | 1.660833 | 4.215 | 0.000 | PASS | Canonical word sequence present |
| s5b | 2.497958 | 4.404 | 0.000 | PASS | Canonical word sequence present |
| s6a | 3.475083 | 4.316 | 0.101 | FAIL | `Một người 30 tuổi chưa có nhà, không nhất thiết là người thất bại.` |
| s6b | 3.086917 | 4.211 | 0.174 | FAIL | `Cây móc và mùi ấy chỉ là một nét ai đó kể tay.` |
| s7a | 3.265958 | 4.287 | 0.038 | PASS | One substitution: `lứt` for `lướt`; under threshold but tone/word remains machine-risk |
| s7b | 1.748208 | 4.576 | 0.032 | PASS | `nhằm` for `nhầm`; under threshold but tone remains machine-risk |
| s8 | 4.129958 | 3.874 | 0.058 | FAIL | `không phải bàn không tiết kiệm. Lưu về chưa kịp giữ, đã có nơi đi mất.` |
| s9a | 2.975458 | 4.033 | 0.000 | PASS | Canonical word sequence present |
| s9b | 1.909667 | 3.666 | 0.276 | FAIL | `Bạn sống có vui không?`; drops `Dạo này` |
| s10 | 1.897958 | 4.215 | 0.257 | FAIL | `Đừng biến tuổi 30 thành bản ảnh.` |

### Cue intervals and final-hold status

Using exact current MP3 durations and the documented half-open frame windows, all current SFX cues are post-voice with at least one 30 fps frame of clearance: `s1` 0.057625 s, `s2` 0.040334 s, `s3a` 0.035375 s, `s3b` 0.058708 s, `s4a` 0.053041 s, `s5b` 0.035375 s, `s6b` 0.046416 s, `s7a` 0.034042 s, `s8` cue 1 0.036709 s, `s8` cue 2 0.170042 s, `s9a` 0.057875 s, and `s10` 0.035375 s. `AUD-004` operationally passes this recomputation; its stale earlier proof in `mix-plan.md` remains covered by the existing `AUD-007` documentation ticket.

The final `s10` hold is documented as 2.4 s, with paper-edge foley as an explicit exception, but is **not measurable yet**: there is no Join/build integrated render. BGM bed level, 12–18 dB voice/music windows, 4–6 dB ducking with 150–300 ms ramps, integrated −14±1 LUFS, true peak, and the >=1.2 s near-silent ending remain unverified.

### Rubric scores

| Item | Score | Evidence | Result |
|---|---:|---|---|
| Completeness, duration, syllable rate, budget | 8/10 | 16/16 clips; exact voice total 44.133915 s; expected total 51.833915 s; rates 3.666–4.576 syl/s. Current docs state 43.737 s, so duration evidence needs reconciliation. | Partial |
| ASR/CER and wording | 4/10 | Only 7/16 pass `CER <=0.04`; nine clips fail. | Fail |
| Silence and planned holds | 8/10 | No internal voice silence >0.6 s; cue gaps are explicit. Final 2.4 s hold/BGM near-silence await render. | Partial |
| Loudness, true peak, timbre/clipping | 9/10 | Voice spread 1.5 LU; true peaks −2.4…−6.2 dBTP; no clipping; no visible spectral cut-off/spike. Natural timbre remains unhearable by machine. | Pass with limitation |
| Mix feasibility, ducking, SFX timing | 6/10 | Source files and cue windows measured; integrated voice/BGM gap, duck ramps, final loudness and rendered SFX audibility are not measurable yet. | Partial |
| Spectrogram/artifact screen | 8/10 | Nine suspicious clips visually inspected; continuous harmonic energy, no visible hard cut-off or isolated broadband spike. | Machine screen only |
| Sources and licences | 9/10 | `assets-manifest.md` records origin/licence for BGM and all 8 SFX; no new asset was added. | Pass |

### Prior-ticket closure and Round-3 disposition

| ID | Round-3 status | Evidence / owner |
|---|---|---|
| AUD-001 | **accepted-risk — still open after hard cap** | `s1,s3a,s6a,s6b,s10` remain over CER threshold; audio is present and every current ASR string/duration is documented above. Owner: `voice-agent`; do not claim pass. |
| AUD-002 | **accepted-risk — still open after hard cap** | `s8` is 0.058 and the paired requirement is not met; `s9b` regressed to 0.276. Owner: `voice-agent`; do not claim pass. |
| AUD-003 | **fixed** | Current all-clip spread is 1.5 LU and true peaks are below −1.5 dBTP. |
| AUD-004 | **fixed by current interval recomputation** | All 12 cue windows clear speech by >=1 frame. Existing stale-proof ticket AUD-007 remains open. |
| AUD-005 | **open / pending Join-build** | No integrated render exists, so final mix and closing-hold acceptance cannot be measured. Assign directly to `video-director` after Join/build. |
| AUD-006 | **accepted-risk — still open after hard cap** | `s6b` is 4.211 syl/s and CER 0.174; near-whisper naturalness cannot be certified by machine. Owner: `voice-agent`; do not claim pass. |
| AUD-007 | **still open** | Existing mix-plan proof contains stale pre-regeneration durations; owner `audio-agent`, acceptance is a proof fully matching current ffprobe. |
| AUD-008 NEW | **open documentation reconciliation** | Current ffprobe total is 44.133915 s, while `voice-report.md`, `voice-clone-asr.md`, and `mix-plan.md` state 43.737 s. Owner: `video-director` at Join; acceptance is one reconciled exact total and dependent timing/budget evidence. |

The hard-cap accepted-risk entries are allowed only because the corresponding audio is present and the residuals are explicitly documented here. They do not satisfy the audio gate. Review remains **REVISE**, with no pass claim and no gate command executed.

### Cannot verify by machine

Naturalness, Vietnamese tone/accent perception, emotional arc, breaths, clicks, robotic buzz, exact perceived wording, and whether SFX feels audible but non-distracting require listening. The spectrogram screen cannot certify these. The final integrated mix and the 2.4 s closing hold require the Join/build render.

### Required final audit

Before return, the read-only command `python3 -I scripts/pipeline.py audit dung-bien-tuoi-30-thanh-ban-an` was run. Its result is recorded in the final response; any pre-existing non-audio failures remain outside this reviewer-owned report.

## Fresh Round 1 — clean-context review after voice stage reopened

Reviewed 2026-10-18 after the latest voice regeneration and peak normalization. This is a **fresh Round 1** because the voice stage was reopened; it is not an additional Round 4 of the previous audio-gate loop. Scope: `voice-report.md`, `voice-clone-asr.md`, `voice.json`, `voice-durations.ts`, `mix-plan.md`, `timeline.ts`, `Reel.tsx`, all current audio files, and `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview-r6.mp4`. Review-only: no source, status, pipeline, voice, or manifest file was edited.

### Verdict and root cause

**REVISE — 7.6/10.** Audio is usable for continued diagnosis and the current preview decodes with both streams, but it does not pass the audio gate threshold (>=9) because ASR is not clean, the authoritative evidence is internally inconsistent, and the integrated loudness/ending-window proof is incomplete. No pipeline review/gate/override command was run.

Single root cause behind the recurring failures: **the packet has no single post-regeneration source of truth**. MP3s, the generated `voice-durations.ts`, the older voice/ASR reports, the mix-plan proof, and the r6 integrated preview were produced at different points. Peak normalization improved level consistency but did not regenerate/reconcile all dependent ASR and timing evidence; the Join preview then exposed a remaining final-mix target miss.

### Evidence run

- `ffprobe`: 16/16 voice clips present and decodable, mono 24 kHz MP3; BGM and 8 SFX present and decodable. Current exact voice total from the files is **44.133915 s**. `/tmp/...-r6.mp4` is **1080x1920, 30 fps, 51.605 s**, with H.264 video and 48 kHz stereo AAC.
- `ffmpeg -af ebur128=peak=true`: preview integrated loudness **-15.6 LUFS**, LRA 6.1 LU, true peak **-1.9 dBFS**. The peak passes the <=-1.5 dBTP target; integrated loudness misses the -14+/-1 LUFS window by 0.6 LU.
- `ffmpeg -af volumedetect`: preview mean **-18.3 dB**, max sample **-1.9 dB**; no clipping evidence.
- `silencedetect=noise=-45dB:d=0.20` on r6: silence intervals at **49.450-50.007 s (0.557 s)** and **50.933-51.605 s (0.672 s)**. This does not prove 1.2 s of near-silent BGM because the mixed file does not isolate BGM from paper foley.
- `silencedetect=noise=-45dB:d=0.10` on voice: s8 has an internal gap **1.40875-1.711167 s (0.302417 s)**; s1 has 0.127 s; s9a has 0.332 s. No voice clip has an internal gap >=0.6 s. The s8 gap is real, but the current caption boundaries (38f/78f) are not evidenced against it.
- Source inspection of `Reel.tsx`: voice gain is 1.6; BGM ramps are 6 frames each (200 ms) between 0.30 and 0.165, and the final fade is 9 frames (300 ms). These are contractually sized ramps, but no signal-level measurement proves the rendered duck delta or absence of pumping/clicks.
- Cue recomputation against exact current MP3 durations: all 12 SFX cue windows start after their corresponding spoken interval and have at least one frame of clearance. This item passes at source/frame-contract level.

### Current ASR evidence

The latest `voice-report.md` reports **7/16 pass** and lists these current failures: `s1` CER 0.294, `s3a` 0.405, `s3b` 0.129, `s4a` 0.094, `s6a` 0.101, `s6b` 0.174, `s8` 0.058, `s9b` 0.276, and `s10` 0.257. That is 9 listed failures, consistent with 7/16 passing. `voice-clone-asr.md` is stale and reports older values for several of the same clips (`s1` 0.206, `s3a` 0.365, `s3b` 0.000, `s4a` 0.019, `s8` 0.014, `s9b` 0.000, `s10` 0.229). Therefore the report cannot currently be treated as one reproducible ASR snapshot. The reviewer accepts the latest `voice-report.md` as the current claimed result, but does not claim independent ASR pass without a new post-regeneration PCM run.

### Rubric scores

| Item | Score | Evidence | Result |
|---|---:|---|---|
| Completeness, duration, syllable rate, budget | 8/10 | 16/16 clips decode; exact total 44.133915 s; 51.6 s preview fits budget. Older reports/mix plan still cite conflicting durations/totals. | Partial |
| ASR/CER and canonical wording | 4/10 | Latest voice report claims 7/16 pass; nine failures remain and `voice-clone-asr.md` disagrees. | Fail |
| Silence and planned holds | 7/10 | No clip has >=0.6 s dead air; s8 has measurable 0.302 s pause. Final near-silent BGM window is not isolated/proven. | Partial |
| Loudness, peak, clipping, consistency | 9/10 | Voice report claims 1.5 LU spread and safe peaks; r6 integrated peak is -1.9 dBFS with no clipping evidence. Integrated loudness is still below target. | Partial |
| Mix gap, ducking, ramps, SFX timing | 7/10 | 200 ms source ramps and cue intervals are contractually present; rendered voice/music gap and duck delta are not measured. | Partial |
| Spectral/artifact screen | 8/10 | No machine evidence of hard cut-off/spike in prior packet; naturalness, tone, breaths, clicks and robotic artifacts remain unhearable by machine. | Machine-only partial |
| Sources/licences | 9/10 | `assets-manifest.md` records original BGM synthesis and Mixkit source/licence for all SFX. | Pass |

### Exhaustive fresh Round-1 tickets

| ID | Severity | Where | Evidence | Concrete change | Owner | Acceptance check |
|---|---|---|---|---|---|---|
| AUD-R1-001 | Cao | `s1,s3a,s3b,s4a,s6a,s6b,s8,s9b,s10` | Latest voice report has 9 CER failures; only 7/16 pass. | Regenerate/reselect only failing keys from locked `voice.json`, preserving all canonical Vietnamese words and numbers; do not fix by changing script text. | voice-agent | Fresh PCM faster-whisper run after final normalization: all 16 clips CER <=0.04 and canonical word sequence present. |
| AUD-R1-002 | Cao | `voice-report.md` vs `voice-clone-asr.md` | Same clips have materially different CER/ASR values; e.g. s3b 0.129 vs 0.000 and s9b 0.276 vs 0.000. | Rerun one authoritative ASR command/model/normalization on all 16 final MP3s; replace/append both evidence documents with the same run ID, transcript, CER and file hash/mtime. | voice-agent | Reports agree for every clip and the run is reproducible from the current MP3 set. |
| AUD-R1-003 | Trung | `voice-report.md`, `mix-plan.md`, `voice-durations.ts` | Current ffprobe: s3a 4.235708 s and s10 1.796833 s; documents report older 4.297958/1.897958 values in places. Current exact total is 44.133915 s. | Re-run `voice:measure` after final take selection and regenerate every duration/total/table dependent on it, including the cue proof and budget. | voice-agent + audio-agent | Every duration in all reports, `voice-durations.ts`, timeline assumptions and mix-plan proof matches current ffprobe within rounding tolerance. |
| AUD-R1-004 | Cao | `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview-r6.mp4` | Integrated loudness is -15.6 LUFS; required window is -14+/-1 LUFS (-15.0 to -13.0). | Apply deterministic final-mix gain/normalization at the owned integration point, then render a new verification preview; preserve true-peak headroom. | audio-agent + video-director | New integrated preview measures -14+/-1 LUFS and true peak <=-1.5 dBTP with no clipping. |
| AUD-R1-005 | Trung | Integrated preview / mix proof | No windowed measurement proves 12-18 dB voice-to-music gap or the 4-6 dB duck delta. Source values alone are not integrated evidence. | Run windowed ebur128/RMS measurements on voice-active, hold, and duck-ramp windows of the new preview; record exact timestamps and values. | audio-agent | Voice/music gap 12-18 dB, duck delta 4-6 dB, and no unexpected pumping/click transient in measured windows. |
| AUD-R1-006 | Trung | `Reel.tsx` + r6 ending | Source has a 9f BGM fade, but mixed silences are only 0.672 s at the tail; BGM is not isolated to prove >=1.2 s near-silent after s10. | Produce an isolated stem/window measurement or deterministic render evidence showing the final 2.4 s hold, BGM near-silent for >=1.2 s, and paper-edge foley as the only declared exception. | audio-agent + video-director | Evidence identifies last speech end, BGM level over final >=1.2 s, and foley interval separately. |
| AUD-R1-007 | Trung | `timeline.ts` / `Reel.tsx` | Contract says 0.150 s lead-in, but implementation uses `Math.ceil(0.15*30)=5f` = 0.166667 s. | Choose and document one exact frame contract: either encode 5f as intended quantized lead-in everywhere, or adjust timing so the measured contract is explicitly 0.150 s within an accepted frame quantization rule. | video-director | `voice.json`, timeline, Reel sequence, and evidence use the same lead-in definition; no 0.150s claim beside a 5f/0.1667s implementation. |
| AUD-R1-008 | Trung | `timeline.ts` `S8_CAPTION_BOUNDARIES` and `s8.mp3` | Measured pause is 1.40875-1.711167 s (0.302417 s), while caption boundaries are 38f/78f (1.267/2.600 s); no proof shows captions change at the pause. | Re-anchor s8 caption split to the measured pause, or document a deliberate pre-pause caption boundary with frame evidence and rationale. | video-director + scene-agent | Rendered s8 frame strip shows caption timing aligned to the chosen pause contract and cites exact frame/time. |
| AUD-R1-009 | Thấp | Voice clips / listening-dependent artifacts | Machine checks cannot certify naturalness, Vietnamese tones, emotion, breaths, clicks, pumping, or robotic artifacts. | Record as non-machine-verifiable; optional human listen may annotate but cannot replace numeric gate evidence. | video-director | Explicit cannot-verify record remains in the next report; no false pass claim. |

### Items that pass in this fresh review

- Asset completeness and decode: 16/16 voice clips, BGM, and 8 SFX exist and decode.
- Current source cue contract: all 12 SFX windows are post-voice with at least one frame clearance when recomputed from current exact durations; no cue overlap is open at this source-level check.
- Duck ramp duration: 6 frames at 30 fps = 200 ms attack/release; final fade is 9 frames = 300 ms, both inside the specified ranges. Signal-level verification remains ticket AUD-R1-005.
- Peak safety: r6 true peak -1.9 dBFS and voice report peaks remain below the -1.5 dBTP ceiling.
- Asset provenance: BGM/SFX origins and licences are recorded in `assets-manifest.md`.

### Audit note

The required read-only audit was run after this review. It remains **FAIL** because of pre-existing/non-audio status/documentation defects, including the historical Gate A path using backslashes (`docs\\dung-bien-tuoi-30-thanh-ban-an\\script-review.md is missing`) and stale pipeline records. This reviewer did not edit status or pipeline. The audio gate must remain **REVISE** until the tickets above are closed by the owning agents and a new independent review is run; this fresh Round 1 does not consume the prior hard-cap Round 3.

## Round 2 — clean-context review of verified final-style preview after Round 1 fixes

Reviewed 2026-10-18. Scope: the Round-1 evidence above, current `voice-clone-asr.md`, current `voice-report.md`, `mix-plan.md`, `src/videos/dung-bien-tuoi-30-thanh-ban-an/timeline.ts`, `Reel.tsx`, `Scene13.tsx`, all current audio files, and `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview-verified.mp4`. Review-only: no source, status, pipeline, voice, or manifest file was edited. No pipeline command was run.

### Verdict and root cause

**REVISE — 8.1/10.** The new preview is materially improved and its integrated loudness is inside the requested window, but the audio gate does not pass: true peak is over the ceiling, the two current ASR evidence documents disagree, the s8 caption boundaries are not aligned to the measured pause, and the mixdown cannot independently prove the requested voice/music gap or BGM-only ending window. No `review`, `gate`, or `override` was run.

Root cause: **the final-style preview was normalized as a delivery artifact, but the normalization/measurement snapshot was not reconciled with the current source evidence and the preview is a single mixed AAC stream.** This produces a loudness result that is close to target while leaving true-peak headroom, ASR authority, caption timing, and stem-level duck/ending proof unresolved.

### Measurement evidence

- `ffprobe`: preview exists and decodes; H.264 video is 1080×1920 at 30 fps, 51.600 s; AAC audio is 48 kHz stereo, 51.700 s.
- `ebur128=peak=true`: integrated loudness **−14.4 LUFS**, LRA **5.7 LU**, true peak **−1.2 dBFS**. Loudness passes −14±1; true peak **fails** the ≤−1.5 dBTP ceiling by 0.3 dB.
- `volumedetect`: mean **−17.1 dB**, max sample **−1.3 dBFS**. This agrees that the delivery headroom is not yet within the stated −1.5 dB ceiling.
- Full-mix `silencedetect=noise=-45dB:d=0.6`: only the final **51.028–51.700 s** interval is detected as full silence (**0.672 s**). At the planned final hold, the 49.500–51.600 s output window measures mean **−43.0 dB**, max sample **−24.5 dBFS**; the first 1.2 s from 49.500–50.700 s measures mean **−45.7 dB**, max **−28.5 dBFS**. This is strong output-level evidence of a quiet tail, but it is not a BGM-isolated measurement because paper-edge foley and BGM are mixed together.
- Current source timeline totals **1548 frames / 51.600 s**. `s10` starts at frame 1422 / 47.400 s; its 5f-quantized voice end is frame 1476 / 49.200 s; the source BGM fade is 9f / 300 ms to frame 1485 / 49.500 s, leaving 2.100 s of the final 2.400 s hold after the fade. The ramp duration is contractually correct; stem-level pumping/click absence remains unprovable from the AAC mixdown.
- S8 source silence measurement: `s8.mp3` has **1.408750–1.711167 s**, duration **0.302417 s**. With scene 13 beginning at frame 1110 / 37.000 s, the pause is approximately global **38.408750–38.711167 s**, or scene-relative frames **42.26–51.34**. Current caption boundaries are scene-relative **38f / 78f** (1.2667 s / 2.6000 s), so the first caption changes about 4.3 frames before the pause starts and the second boundary is well after the pause. This is not pause-aligned evidence.
- `timeline.ts` and `Reel.tsx` agree on the lead-in contract: `ceil(0.15×30)=5f`, i.e. **0.166667 s quantized lead-in**. The source comment and `VOICE_LEAD_IN_FRAMES` encode the same rule; the previous ambiguity ticket is closed as a quantization clarification, not as a claim of exact 0.150 s frame timing.
- SFX source/frame check: all 12 listed cue windows remain after their corresponding measured voice window with at least one 30 fps frame of clearance. The cues are bounded by explicit `durationInFrames`; no unbounded SFX playback was found. This item passes at contract level, although the mixed preview cannot prove subjective audibility or clicks.

### ASR authority check

The current documents are still not one reproducible snapshot. `voice-report.md` says **7/16** clips pass and lists nine failures (`s1,s3a,s3b,s4a,s6a,s6b,s8,s9b,s10`), while the current `voice-clone-asr.md` summary says **11/16** pass and lists a different set of failures. Because both are presented as current evidence and no shared run ID/hash table reconciles them, the machine ASR sub-gate remains open. The canonical `voice.json` text itself was not changed by this review.

### Rubric scores

| Item | Score | Evidence | Result |
|---|---:|---|---|
| Completeness, duration, budget | 9/10 | 16/16 source clips and the preview decode; 51.600 s video timeline is coherent. | Pass with evidence caveat |
| ASR/CER and canonical wording | 5/10 | `voice-report.md` and `voice-clone-asr.md` disagree: 7/16 vs 11/16 pass. | Fail |
| Silence and planned holds | 8/10 | S8 pause is confirmed; final output is very quiet for >1.2 s, but BGM is not isolated. | Partial |
| Loudness, peak, clipping, consistency | 8/10 | −14.4 LUFS passes, but true peak −1.2 dBFS fails the ≤−1.5 ceiling. | Partial/fail on peak |
| Mix gap, ducking, ramps, SFX timing | 7/10 | SFX and 200 ms/300 ms source ramps are contractually correct; voice/music gap and stem duck delta are not measurable from one AAC mixdown. | Partial |
| Spectral/artifact screen | 8/10 | No machine-only clipping conclusion beyond peak result; naturalness, tone, clicks, pumping and robotic artifacts remain listening-dependent. | Machine-only partial |
| Sources/licences | 9/10 | Existing asset manifest remains complete. | Pass |

### Exhaustive Round-2 ticket closure and new tickets

| ID | Status | Severity | Evidence / closure | Owner | Acceptance check |
|---|---|---|---|---|---|
| AUD-R1-001 / AUD-R1-002 | **OPEN — carried forward** | Cao | Current `voice-report.md` and `voice-clone-asr.md` still disagree, and the authoritative report still does not establish 16/16 CER pass. | voice-agent | One post-normalization ASR run over all 16 current MP3s, with shared run ID, exact transcript, CER and file identity in both reports; all canonical sequences present. |
| AUD-R1-003 | **PARTIAL — carried forward** | Trung | Rounded `voice-durations.ts` and current `mix-plan.md` are aligned to the regenerated snapshot, but the conflicting ASR/report packet still prevents a single complete source-of-truth claim. | voice-agent + audio-agent | Reconcile all current reports and dependent timing tables from one final MP3 snapshot. |
| AUD-R1-004 | **CLOSED / superseded by AUD-R2-001** | Cao | Integrated loudness improved from r6 −15.6 LUFS to −14.4 LUFS. | — | — |
| AUD-R1-005 | **OPEN — carried forward** | Trung | Source ramps exist and are correctly sized, but a single AAC mixdown cannot separate voice from BGM to prove a 12–18 dB gap or 4–6 dB duck delta. | audio-agent + video-director | Provide windowed stem/isolated-BGM evidence from the same verified snapshot, including ramp windows and no pumping/click transient. |
| AUD-R1-006 | **PARTIAL — carried forward** | Trung | Full mix is very quiet for 1.2+ s after the fade window, but the BGM-only near-silence claim is not isolated from paper foley. | audio-agent + video-director | Measure the BGM stem or deterministic isolated-BGM render over the final 1.2 s and identify the foley exception separately. |
| AUD-R1-007 | **CLOSED** | Trung | `timeline.ts`, `Reel.tsx`, and the evidence now consistently encode the 0.150 s target as a 5-frame quantized lead-in (0.166667 s). | — | — |
| AUD-R1-008 | **OPEN — carried forward** | Trung | Measured s8 pause is scene frames 42.26–51.34; boundaries remain 38f/78f and are not pause-aligned. | video-director + scene-agent | Re-anchor the caption change to the selected pause contract, or document and visually prove a deliberate pre-pause boundary. |
| AUD-R1-009 | **OPEN — carried forward** | Thấp | Machine checks cannot certify naturalness, tone, emotion, breaths, clicks, pumping, or robotic artifacts. | video-director | Keep explicit cannot-verify note; do not convert it into a false pass. |
| **AUD-R2-001** | **NEW / OPEN** | Cao | Verified preview true peak is **−1.2 dBFS** and max sample is **−1.3 dBFS**, exceeding the ≤−1.5 dBTP delivery ceiling. | audio-agent + video-director | Re-render the same final-style mix with deterministic true-peak-safe normalization; `ebur128` true peak ≤−1.5 dBFS and integrated loudness remains −14±1 LUFS. |
| **AUD-R2-002** | **NEW / OPEN** | Cao | Current `voice-report.md` claims 7/16 pass while current `voice-clone-asr.md` claims 11/16 pass. | voice-agent | Reconcile both documents against one final normalized MP3 snapshot, with matching hashes/mtime, command/model, transcript and CER for all 16 clips. |
| **AUD-R2-003** | **NEW / OPEN** | Trung | S8 pause is 0.302417 s at scene frames 42.26–51.34, but caption boundaries are 38f/78f. | video-director + scene-agent | Align or deliberately justify the caption transition using a rendered frame strip and exact pause/frame evidence. |
| **AUD-R2-004** | **NEW / OPEN** | Trung | Output tail is quiet, but the requested BGM-only near-silence and duck delta cannot be proven from the single AAC mixdown. | audio-agent + video-director | Add isolated BGM/stem measurement from the exact verified snapshot; retain full-mix tail level and foley timing as separate evidence. |

### Items that pass in Round 2

- Preview container, video geometry, frame rate, audio stream and duration are valid.
- Integrated loudness is within −14±1 LUFS.
- All 16 current voice clips and SFX assets decode; source-level SFX windows remain non-overlapping with voice by the documented frame contract.
- The s1 lead-in is consistently encoded as 5 quantized frames; no remaining claim of exact 0.150 s frame timing is made.
- The final hold is present and the mixed output is below approximately −45 dB mean over the first 1.2 s after the BGM fade, but this does not replace BGM-stem proof.

### Final Round-2 conclusion

The audio branch remains **REVISE** and must not be marked passed or used to advance the workflow gate. The next fix loop must first reconcile the ASR snapshot and true-peak-safe final mix, then provide stem-level duck/ending evidence and correct or explicitly justify the s8 caption timing. This review did not change pipeline state.

## Round 3 — clean-context hard-cap review of `join-preview-verified-r2`

Reviewed 2026-10-18 against the exact requested snapshot: this report through Round 2, current `voice-report.md`, current `voice-clone-asr.md` 11/16 table, `mix-plan.md`, `timeline.ts` with S8 boundaries `43f/78f`, `Reel.tsx` with `VOICE_GAIN=1.6`, BGM levels `0.30/0.165`, 6-frame ramps and 9-frame s10 fade, all current source MP3s, and `/tmp/dung-bien-tuoi-30-thanh-ban-an-join-preview-verified-r2.mp4`. This is the final Round 3 of the reopened audio branch. Review-only: no source, status, pipeline, voice, manifest, or mix-plan file was edited. No `pipeline.py` command was run.

### Final verdict

**REVISE / accepted-risk at hard cap — 8.3/10.** The verified preview now meets the integrated loudness and true-peak targets, all 16 voice clips and the BGM/SFX inventory decode, the BGM envelope has a deterministic 200 ms duck/ramp and a measured 2.10 s zero-volume tail by frame contract, and SFX are disjoint from spoken intervals. The audio branch still does **not** pass: the authoritative documents disagree on ASR (11/16 versus 7/16), five clips remain over the stated CER threshold in the current table, S8 caption timing is not proven from the pause alone, and one SFX window crosses the s3a scene boundary by one frame. These residuals are recorded as accepted-risk for the hard cap; no audio-gate pass is claimed.

### Independent container and delivery measurements

Read-only `ffprobe`/`ffmpeg` measurements on the requested preview and current source files:

- Preview video: H.264, **1080×1920**, **30 fps**, **51.600000 s**.
- Preview audio: AAC, **48 kHz stereo**, **51.700000 s**. The 0.100 s stream-duration mismatch is non-fatal for this review but remains a delivery evidence caveat; final render should be checked again after the approved mix.
- `ebur128=peak=true`: integrated loudness **−14.7 LUFS**, LRA **5.4 LU**, true peak **−1.6 dBFS**. Loudness is inside −14±1 LUFS and peak is within the ≤−1.5 dBTP ceiling.
- `volumedetect`: mean **−17.3 dB**, max sample **−1.6 dBFS**; no sample-clipping indication.
- Full-mix `silencedetect=noise=-45dB:d=0.10`: initial lead-in silence **0.167 s**; tail intervals **49.5455–50.102042 s (0.556542 s)** and **51.028–51.700 s (0.672 s)**. The full mix does not show 1.2 s of silence because the planned paper-wind SFX occupies the hold; this is expected and is not BGM-stem proof.

### Source/frame stem-envelope proof

The current timeline is **1548 frames / 51.600 s**. Using the exact current MP3 durations and the frame-quantized implementation:

- The last s10 voice window is `[1422,1476)` frames, approximately `47.400–49.200 s`.
- The BGM fade is `[1476,1485)` frames, **9 frames / 300 ms**, from linear volume `0.30` to `0`.
- The BGM stem is explicitly at volume `0` for `[1485,1548)` = **63 frames / 2.103 s**, exceeding the required ≥1.2 s near-silent BGM window by frame contract.
- The declared paper-wind exception is `[1480,1528)` frames, approximately `49.333–50.933 s`; it overlaps the BGM-zero portion but does not invalidate the BGM-only proof. It explains why the mixed AAC tail is not silent until `51.028 s`.
- During speech, BGM is held at `0.165`; during holds it returns to `0.30`. The level ratio is `20log10(0.30/0.165) = 5.19 dB`, inside the requested 4–6 dB duck range. The attack/release is `6 frames / 30 fps = 200 ms`; the final fade is `9 frames = 300 ms`. This proves the deterministic source envelope, but not subjective pumping/click absence.
- The preview loudness/peak values are the integrated output proof. The voice/music gap remains a source-envelope proof rather than a separately isolated rendered-stem measurement, because the supplied artifact is one AAC mixdown.

### SFX disjointness and boundary verification

All 12 current cue windows were recomputed against exact `ffprobe` durations. Every cue starts after its corresponding voice interval with at least one frame of clearance; however, the prior proof did not check that every cue also stayed inside its owning scene.

| Cue | Voice end (absolute frames) | Cue window | Voice clearance | Scene-boundary result |
|---|---:|---:|---:|---|
| s1 | 69.271 | `[71,76)` | 0.057625 s | pass |
| s2 | 176.790 | `[178,184)` | 0.040334 s | pass |
| s3a | 311.071 | `[314,321)` | 0.097625 s | **FAIL: scene ends at 320; 1 frame spills** |
| s3b | 379.239 | `[381,386)` | 0.058708 s | pass |
| s4a | 488.409 | `[490,497)` | 0.053041 s | pass |
| s5b | 713.939 | `[715,724)` | 0.035375 s | pass |
| s6b | 932.608 | `[934,941)` | 0.046416 s | pass |
| s7a | 1039.979 | `[1041,1048)` | 0.034042 s | pass |
| s8 cue 1/2 | 1233.899 | `[1235,1238)` / `[1239,1242)` | 0.036709 s / 0.170042 s | pass |
| s9a | 1332.264 | `[1334,1353)` | 0.057875 s | pass |
| s10 | 1475.905 | `[1480,1528)` | 0.136500 s | pass |

`AUD-R3-001` is therefore opened as a **Trung accepted-risk**: `s3a` is voice-safe but not scene-contained. The source remains usable, but the next build-quality fix should move/shorten that cue or extend the owning hold and then rerun the complete cue proof.

### S8 pause verification

`ffmpeg -af silencedetect=noise=-45dB:d=0.05` on `s8.mp3` finds a real pause from **1.408750–1.711167 s**, duration **0.302417 s**. Scene 13 starts at absolute frame **1110**, so the pause is scene-relative **42.2625–51.3350 frames** (absolute approximately **1152.2625–1161.3350**). The current boundaries are `43f/78f`: the first caption change occurs at frame 43, inside the measured pause, and the second at frame 78, after it. The pause itself is verified, but silence detection cannot prove the word-level onset of “Lương về chưa kịp giữ” or justify the later `78f` transition. `AUD-R2-003` remains open/accepted-risk until a frame strip or word-alignment evidence proves the visual timing.

### ASR authority and closure

The current `voice-clone-asr.md` table reports **11/16** at CER `<=0.04`, with failures `s1,s3a,s6a,s6b,s10`. `voice-report.md` still carries a different historical/current table claiming **7/16** and nine failures. Because the two documents do not share one run ID, file identity table, and reproducible command output, the reviewer cannot promote the ASR sub-gate to pass. The current 11/16 table is recorded as the latest requested snapshot, not as a clean 16/16 result.

| Ticket | Round-3 disposition | Evidence |
|---|---|---|
| AUD-R1-001 / AUD-R1-002 / AUD-R2-002 | **accepted-risk — open after hard cap** | Current ASR evidence is inconsistent; latest table is 11/16 and still fails s1, s3a, s6a, s6b, s10. No pass invented. |
| AUD-R1-003 | **partial / accepted-risk** | `voice-durations.ts` is rounded to regenerated files, but dependent documentation still contains older exact durations/totals in places. |
| AUD-R1-005 | **partial / accepted-risk** | Source envelope proves 5.19 dB duck and 200 ms ramps; isolated rendered voice/music windows and subjective pumping/click checks are not available from one AAC mixdown. |
| AUD-R1-006 / AUD-R2-004 | **partially closed with source proof; accepted-risk remains** | BGM is zero for 2.103 s by `[1485,1548)` frame contract; mixed tail is not silent because paper-wind is present. |
| AUD-R1-007 | **closed** | 5-frame quantized lead-in is consistently encoded; no exact 0.150 s frame claim is made. |
| AUD-R1-008 / AUD-R2-003 | **accepted-risk — open after hard cap** | S8 pause is measured, but `43f/78f` is not fully word-aligned by silence evidence alone. |
| AUD-R2-001 | **closed** | Preview true peak improved to **−1.6 dBFS**, meeting the stated ceiling; integrated loudness is **−14.7 LUFS**. |
| **AUD-R3-001 NEW** | **accepted-risk — open after hard cap** | `s3a` cue `[314,321)` is disjoint from speech but crosses the scene boundary at frame 320 by one frame. |
| AUD-R1-009 | **carried** | Naturalness, tones, emotion, breaths, clicks, pumping and robotic artifacts remain listening-dependent and are not falsely certified. |

### Rubric scores

| Item | Score | Result |
|---|---:|---|
| Completeness, decode, duration and budget | 9/10 | 16/16 voice clips plus BGM/SFX decode; 51.6 s video is within target; audio stream is 0.1 s longer. |
| ASR/CER and canonical wording | 5/10 | Latest table is 11/16, and the two reports disagree. |
| Silence, pause and planned holds | 8/10 | S8 pause and final frame contract are measured; caption word alignment and mixed tail remain partial. |
| Loudness, true peak and clipping | 10/10 | −14.7 LUFS and −1.6 dBFS satisfy the requested delivery targets. |
| Mix envelope, ducking and SFX timing | 8/10 | 5.19 dB source duck, 200 ms ramps and voice-disjoint cues pass; s3a boundary spill and isolated mix gap remain. |
| Spectral/artifact screen | 8/10 | No numeric clipping failure; listening-dependent artifacts remain unverified. |
| Sources/licences | 9/10 | Existing BGM/SFX provenance remains documented. |

### Final Round-3 conclusion

The reopened audio branch is **REVISE at hard cap, accepted-risk only; not PASS**. The preview's loudness and peak now pass, and the source/frame ending envelope is proven. The remaining accepted-risk items are the contradictory ASR evidence with only 11/16 latest pass, S8 caption alignment, the one-frame s3a scene-boundary spill, and lack of isolated rendered-stem proof. This reviewer did not edit source/status/pipeline and did not run pipeline commands.
