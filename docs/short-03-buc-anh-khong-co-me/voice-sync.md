# Voice sync plan and verified narration source

Voice provider: **Vbee Batch**, registered voice code: `hn_male_thanhlong_talk_48k-fhg` (Thanh Long).
Nine separate human-language utterances, one narrator. Dialogue spoken by Linh is **embedded in narrator’s quotation**, not a new actor voice.

## Planned starts (must be reconciled against measured TTS duration)

- 1: 0.1s — whisper of surprise — Linh lật album ảnh gia đình... rồi sững lại. Hơn trăm bức ảnh, mà chẳng thấy mẹ.
- 2: 5.3s — warm memory — Ngày sinh nhật, mẹ chụp. Ngày tốt nghiệp... mẹ cũng là người chụp.
- 3: 10.5s — affectionate recollection — Đến những bữa cơm đông đủ... mẹ lại lùi ra sau, bảo cả nhà cười lên.
- 4: 15.7s — slow poignant hesitation — Trong ảnh ai cũng rạng rỡ. Chỉ có một người... luôn vắng mặt.
- 5: 20.2s — quiet suspense and discovery — Rồi Linh phóng to một tấm ảnh cũ. Trên ô kính... có bóng mẹ.
- 6: 25.6s — gentle ache — Mẹ vẫn cầm máy, mỉm cười tự hào. Linh bỗng thấy lòng nghẹn lại.
- 7: 30.9s — hushed realization — Cô quay vào bếp. Mẹ vẫn đang lặng lẽ dọn dẹp... như mọi ngày.
- 8: 36s — bright tenderness — Linh nắm tay mẹ: Mẹ ơi... lần này mẹ đứng giữa nhé!
- 9: 40.2s — uplifting, soft landing — Tách! Cuối cùng... bức ảnh gia đình cũng thật sự đủ đầy.

The FFmpeg producer decodes each actual Vbee MP3, reads peak and sourceDuration via ffprobe/volumedetect, and computes a per-segment tempo. It explicitly rejects tempo exceeding **1.31×** for any emotional beat. The timeline is only final after that test. Results are saved to `final/SHORT03-QA.json`.

No claim of full independent listening / phoneme-level ASR here. Caption text is supporting typography, not timestamp-aligned word-level subtitles.
