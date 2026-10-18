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
