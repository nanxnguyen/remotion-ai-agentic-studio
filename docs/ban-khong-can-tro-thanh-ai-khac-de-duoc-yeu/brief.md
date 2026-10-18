# Brief: Bạn không cần trở thành ai khác để được yêu

**Video ID:** ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu
**Composition ID:** BanKhongCanTroThanhAiKhacDeDuocYeuReel
**Voice:** Thanh Long Nâng Cao (VieNeu-TTS clone, route 2)
**Profile:** story
**Duration:** 50–60 seconds (explicit user override; default is 30–45 s)
**Platform:** TikTok / Reels / Shorts (9:16, 1080×1920, 30 fps)

## Topic & Core Message
**User's exact wording (mandatory):**
> "Bạn từng xóa một tin nhắn chỉ vì sợ mình nói nhiều quá.
> Từng giả vờ thích một bộ phim để có thêm chuyện nói với ai đó.
> Từng bảo mình không buồn, vì sợ người kia thấy bạn nhạy cảm.
> Lâu dần, bạn trở nên rất giỏi đoán xem người khác muốn gì ở mình.
> Nhưng có một câu hỏi bạn lại khó trả lời.
> 'Rốt cuộc mình thật sự thích điều gì?'
> Thật lạ, khi cố gắng để được một người yêu thương, đôi khi ta lại giấu đi nhiều phần của chính mình.
> Một mối quan hệ có thể cần sự điều chỉnh từ cả hai.
> Nhưng mong rằng trong những điều bạn thay đổi, vẫn còn chỗ cho con người thật của bạn."

**Core message:** Self-worth, the cost of masking oneself for acceptance, and the hope that genuine connection still has room for your true self.

**Target audience:** Young adults (20–35) navigating relationships, people-pleasing tendencies, identity suppression.

**One viewer need:** Feel seen in the habit of self-erasure for love; leave with permission to keep parts of yourself.

**Retellable point:** "The things you delete, fake, and hide to be loved — they're the very parts that make you you."

## Tone & Visual Identity
- **Tone:** Intimate, reflective, gently piercing — not melodramatic. Conversational narration, like a close friend speaking late at night.
- **Palette:** Deep charcoal `#0D0D0D` base, warm accent `#E8A87C` (amber sand), muted highlight `#A0A0A0`, soft white `#F5F5F5` for text. No neon, no high-contrast tech look.
- **Fonts:** Google Fonts `Be Vietnam Pro` (vietnamese subset) for UI/captions; `Playfair Display` (vietnamese subset) for emotional beat headings.
- **Motion:** Slow, breath-paced. Micro-motion on holds (subtle scale/opacity breathe). Entrances: translateY only, frame-0 visible. Transitions: cross-dissolve on emotional beats, hard cut on realization moments.
- **Captions:** Phone-safe (above bottom 210px), ≤ 2 lines, ≤ 28 chars/line, word-for-word from voice.json. Accent words in amber `#E8A87C`.

## Voice Route
- **Provider:** VieNeu-TTS v3 Turbo (local clone)
- **Voice slug:** `thanh-long-nang-cao`
- **Engine:** `gen-voice-clone.py` with 6–10s WAV reference from `vietnamese-voice-samples/previews/Thanh-Long-Nang-Cao.mp3`
- **Delivery notes:** Measured, warm, slightly breathy. Syllable rate ~4.1/s. Pauses are deliberate — every emotional turn gets a split key or hold. No forced whisper/sadness; vary intonation per beat (curious → pained → quiet realization → hopeful).

## Source / Claim Plan
- Personal story / universal observation — no external citations needed.
- Any recreated UI/diagram labeled `minh hoạ`.

## How It Differs From Earlier Videos
- `tiec-nguoi-hay-nam-thang`: calendar/memory metaphor, more structural/visual metaphor.
- This video: character-driven emotional beats, text-led with minimalist art, slower pacing (50–60s), focus on internal monologue moments.
- New voice route: Thanh Long Nâng Cao (previous used Thanh Long base).

## Acceptance Checks (self-verify before Gate A)
- [ ] `brief.md` complete with all sections
- [ ] User's mandatory lines preserved verbatim in script
- [ ] Duration budget includes pauses + ending hold within 50–60s
- [ ] Voice route recorded with provider + authorization basis
- [ ] Palette hex, fonts, motion recipe documented
- [ ] `docs/<vid>/voice-ref/` reference WAV prepared