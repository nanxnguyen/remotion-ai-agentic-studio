# Voice Direction — thang-may-tang-13

**Route:** Vbee Batch (`mode=async`) through GitHub Actions Secrets, voiceCode `hn_male_phuthang_stor_24k-stl` (Anh Khôi nâng cao, storytelling), planned `speed_rate` 1.05 (owner pace preference: natural, slightly fast, short pauses). One narrator; the mother's line is quoted by the narrator, not acted in a second voice. Canonical text: [voice.proposed.json](voice.proposed.json) (13 keys); per-shot sidecar with `phrases`, narrator `emotion`, `characterState`, `tempo`, `pauseAfterSec`, `seed: null`: [voice-performance.proposed.json](voice-performance.proposed.json).

## Who speaks to whom

A late-night storyteller close to one listener, third person about Linh throughout. Calm and restrained: the horror comes from facts and silence, not a spooky voice. The ending is grief, not a scare.

## Performance curve

Flat rule (s1) → firm break (s2) → three heavier facts (s3) → hushed observation (s4–s7) → newsreader-flat then lowered (s8) → plain statement, real 0.7 s silence (s9) → two quiet words "Là Linh." (s10) → soft "Là mẹ", heavy "di ảnh của Linh" (s11) → near-whisper callback (s12) → slow final image line, 0.8 s silence (s13).

## Per-shot direction (narrator voice)

| key | intent | emphasis | tempo | pause after (timeline gap) | narrator emotion |
|---|---|---|---|---|---|
| s1 | State the rule the picture is already breaking. | mười hai tầng | even | 0.0 s | bình thản, kể sự thật, hơi thấp |
| s2 | Break the rule; land hard on 'mười ba'. | đêm nay, mười ba | brisk then firm | 0.0 s | căng dần, nhấn mạnh cuối câu |
| s3 | Three short facts, each heavier. | liên tục, không nhúc nhích, tắt phụt | brisk / slow / slow | 0.0 s | gấp ở câu đầu, chậm và nặng dần |
| s4 | Recognition, then reveal after the pause. | giống hệt, niêm phong | natural, unhurried | 0.0 s | thì thầm quan sát, ngừng ở dấu ba chấm |
| s5 | Re-hook: slow, low on 'một năm trước'. | một năm trước | natural, unhurried | 0.0 s | chậm, thấp, lạnh |
| s6 | Quiet first sentence; number clear; 'nhà của cô' falls. | hé mở, mười hai không năm | even then slow | 0.0 s | nhẹ, nghẹn ở 'nhà của cô' |
| s7 | Hushed, as if the person inside might hear. | tivi đang bật, quay lưng | natural, unhurried | 0.0 s | rất khẽ, nín thở |
| s8 | Newsreader-flat, last sentence lower. | chính chung cư này, không thoát ra | even / slow | 0.0 s | đều như đọc tin, câu cuối hạ thấp |
| s9 | Plain statement, then real silence before s10. | nạn nhân | natural | 0.7 s | chậm, lặng |
| s10 | Two words, quiet and final. | Linh | natural, unhurried | 0.0 s | rất khẽ, dứt khoát |
| s11 | Soft on 'Là mẹ', heavy on 'di ảnh của Linh'. | Là mẹ, di ảnh của Linh | natural, unhurried | 0.0 s | dịu xuống, nặng ở cuối |
| s12 | Callback to the phone message; tender near-whisper. | giỗ đầu, về ăn cơm | natural, unhurried | 0.0 s | dịu, nghẹn, gần thì thầm |
| s13 | Final image line; slow, no lift; 0.8 s silence after. | vẫn đầy, chờ Linh về | natural, settled | 0.8 s | chậm, buồn, không kịch |

## Limits

- Vbee exposes voiceCode, speed_rate, audio type and bitrate only; no seed (`seed: null`), no per-word emotion. Intent/emotion/tempo are direction metadata; `pauseAfterSec` is inserted as timeline silence after the clip.
- No atempo/pitch post-processing. Overflowing clips → rewrite text and re-run Gate A.
- Secrets stay in GitHub Actions; only variable names appear in logs or docs.

## Tone probe

`scripts/tone-probe.py` is **absent** from the repository (glob `**/tone-probe*` returned nothing, 2026-11-07) → automated tone probe **blocked**, reported to director. Manual review below replaces it until a tool exists; it does not replace listening to the real Vbee clips.

| word / phrase | key | risk for Northern storytelling voice | action |
|---|---|---|---|
| "nhúc nhích" | s3 | two close "nh" onsets may blur at speed 1.05 | keep; check ASR at voice stage, slow s3 sentence 2 if CER > 10 % |
| "tắt phụt" | s3 | final stop "t" can be swallowed | sentence-final position gives a natural stop; check tail not clipped |
| "niêm phong" | s4 | nasal cluster, usually clear | keep |
| "hé mở" | s6 | short rising-broken tone pair, can sound like "hè mở" | check ASR; fallback "khép hờ" |
| "mười hai không năm" | s6 | number string may be read as a figure if written in digits | already spelled in words |
| "phảng phất" | s7 | two "ph" + "ng/t" endings, soft | keep |
| "nhang" | s7 | short level tone, low risk | keep |
| "Là Linh." | s10 | two-syllable clip may get trimmed edges | pad 0.15 s head/tail in assembly |
| "giỗ đầu" | s12 | ngã tone, Northern voice renders well | keep |
| "thì thầm" | s12 | fine | keep |
| "Đôi đũa vẫn chờ Linh về." | s13 | sentence-final "về" (huyền) can be swallowed | keep 0.8 s hold after; check ASR tail |
| "bàn thờ" | s13 | clear, low risk | keep |
| "Mẹ thì thầm" | s12 | narrator must not perform a whisper voice (one narrator) | keep plain, softer delivery only |
