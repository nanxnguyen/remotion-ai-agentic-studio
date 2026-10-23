# Shorts retention + cinematic typography — mandatory production contract

**Start here before rendering:** [Preflight quality gates](preflight-quality-gates.md). These gates are mandatory for new films and substantial video revisions; a contact sheet or finished-looking poster is not a replacement for motion/voice QA.

## Narration structure, max 60 seconds

- Default 55–60 seconds. Hard maximum **60.000s** for this creator unless the user explicitly changes the constraint. Avoid 70–90s suggestions for productions intended as <=60s.
- **HOOK 0–3s** (immediate impossible visual / threat); **BODY 3–30s** (new clue every ~4–7s, emotional causality); **CLIMAX 30–48s** (consequences, stakes, physical action); **ENDING 48–60s** (real payoff/twist and 0.5–1s emotional hold). Each film may shift these windows to fit measured voice.
- Ending reveals *why* prior clues matter; open ending okay but must close current conflict. The final shot should leave an image/sound memory, not a spoken disclaimer, generic CTA or abrupt unfinished sentence.
- Use a script that can be performed naturally by authentic Vbee, leaving room for character reaction and SFX. Do not shorten emotional acting to accommodate excessive narration.

## Typography is part of storytelling

- Use native Vietnamese text overlays, not baked-in AI image captions. Fonts must render Vietnamese diacritics and be licensed/available. Maintain visual hierarchy: premium movie-poster headline > concise clue/keyword > phrase-timed readable narration subtitle.
- Warm ivory is default, amber is discovery, red is explicit danger; no random colors. Dramatic emphasis only on 1–2 important words per beat, not every word.
- Caption = short phrase synchronized to exact spoken words (not full paragraph), typically <=2 lines. Text enters/exits smoothly and should **not duplicate the headline**. Preserve actor's eyes, mouth, hands and key prop. Keep 9:16 phone-safe margins, high contrast but not a thick gaudy box.
- First frame shows image hook and a readable high-impact phrase; climax has dynamic but restrained keywords aligned to sound; final twist text lands only when spoken clue resolves.
- Motion easing purposeful (fade, gentle rise, type tracking). No constant giant shaking, bouncing or wipes. Lower-third placement only when it does not cover action; use upper or empty-side alignment when necessary.

## Authentic acting and audiovisual rhythm

- Every line has a visible associated micro-beat: facial **eyes/brows/mouth**, body/hand action, camera response, and timed `voice_cue`/caption. A wide shot, slow Ken Burns zoom, or crossfade cannot stand in for required hand movement, terror, smile or physical struggle.
- Distinct Vbee narrator and character voice, dramatization via pacing, pauses, music ducking, physical SFX. Three bells/cut, ticket tear/tear, door opens/latch must land on same beat.
- Plan transitions before full render; soft dissolves for breath, match cuts for repeated objects, hard cuts on action, motivated black fade; do not indiscriminately crossfade all nine cuts.
- Build one **real-voice animatic** before final render; manual inspection in motion is mandatory. Use `scripts/preflight_story_video.py` on the voice-to-action timeline and consult [Preflight quality gates](preflight-quality-gates.md).

## Publish metadata and analytics (no guaranteed viral result)

Provide 2–3 truthful titles testing curiosity without spoiling twist, one concise video description, vertical thumbnail if explicitly requested, optional natural pinned question. Track YouTube Studio's viewed vs swiped away, engaged views, average view duration / percentage viewed, retention graph and comments after publication. No fabricated view counts or 'million-view guaranteed' assertions.
