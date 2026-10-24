# Universal YouTube Shorts Story & Retention Playbook

**Scope:** Every new scripted vertical short in this repository — emotional stick figure, horror, family, romance, thriller, education, or other genre. This is a required **creative preflight**, not a promise of a particular number of views.

## Rule zero: make a story before adding motion

Build a clear viewer question, specific identifiable protagonist, desire, obstacle, concrete actions, escalating tension, and an earned emotional or informational payoff. Do not use a sequence of generic stock scenes, hollow quotes, identical character poses, or motion added solely to increase shot count. Visuals must show what the narration says.

## Retention-oriented script structure

Choose duration based on the brief and measure the real synthesized narration.

| Stage | For 30–45s emotional shorts | For 45–60s narrative/horror | Required outcome |
| --- | --- | --- | --- |
| Hook | 0–4/6s | 0–6s | 0–2s attention-grabbing concrete visual, immediately legible tension; finish a curiosity question by 4–6s |
| Escalation | 4/6–20s | 6–30s | Cause-and-effect beats, a new meaningful detail, reaction, or choice every ~3–6s |
| Climax / reveal | ~20–33s | ~30–48s | Credible irreversible action, unexpected but properly foreshadowed turn or emotional recognition |
| Payoff | ~33–45s | ~48–60s | Change in character, strong image or resonant closure; no lengthy moralizing, logo, or dead-air outro |

**Hook design:** Draft at least three contrasting hook options (mystery, emotional contradiction, visual surprise). Select the one the filmed action can prove in the first two seconds. A 4–6s hook is a three-beat sequence, not six seconds of setup: 0–2s concrete anomaly; 2–4s human reaction; 4–6s open question or meaningful clue. Never spoil the central reveal in the title or thumbnail. No clickbait that the film does not pay off.

**Middle:** Each ~3–6s beat adds information or changes a relationship. Use micro-reversals, prop callbacks, action/reaction, visual bridges and well-paced quiet beats. Avoid a constant stream of text or repetitive pans and zooms.

**Climax:** Reveal something grounded in clues shown earlier. The character must *do* something, not merely be told a lesson. Align narrator emphasis, facial expression, prop motion, edit and music dynamics.

**Ending:** End on a memorable visual action and one concise line. Prefer an emotional aftertaste, earned surprise, or natural discussion question, not a forced "like/share/subscribe." A looping ending is optional only when it serves the story.

## Production contract (apply regardless of genre)

1. Write a one-sentence premise and **story question**. Define the intended viewer emotion.
2. Prepare three hook candidates and explain the chosen one. Screenplay must include exact **timecode, narration, physical action, setting, framing, onscreen text, emotion, music/SFX and transition** for each beat.
3. Create character and environment bibles *before* renders. Keep hair, outfit, physical proportions, screen direction, light source, spatial relationships and important objects coherent. Use supporting characters only when they do something necessary.
4. Storyboard *purposeful* scenes: establishing, insert, reaction, medium, detail, POV, reveal and resolution as the plot needs. Match the physical action to spoken words. No forced 28-shot target if 14 stronger shots work better.
5. Use real, smooth frame-derived animation / source motion. Native 60fps alone does not imply convincing animation. Verify important movements, joint transitions and boundary frames; use match cuts, anchored camera, prop continuity, brief dissolves where motivated.
6. Default emotional-short voice: **genuine Vbee Batch**, Thanh Long as configured in the emotional skill. For horror/storytelling choose appropriate licensed/available Vbee speaker according to its skill. Divide narration by intention, audition authentic emotional performance, measure actual audio duration, align edit to voice instead of assuming text fits. Duck BGM, include silences deliberately, listen to final mixed MP4.
7. Typography: mobile-safe, correct Vietnamese diacritics, generally 1–2 short lines, synchronized to narration. Prefer concise impactful text, never use subtitles to restate every scene's exposition on top of the visuals.
8. Run repository's canonical gates and tests; record **actual** results. At minimum inspect first 6 seconds, midpoint climax, last 6 seconds, frame boundaries, voice and music, audio tails and MP4 with ffprobe. Do not claim human/subjective review has passed without playback.
9. Publish/upload only when authorized. vidIQ media-library import != YouTube publication. Store stable file links and upload IDs, never expiring signed URLs or secrets.

## What to measure *after* publishing

Evaluate metrics available in YouTube Studio: **Viewed vs swiped away**, average view duration / retention shape, average percentage viewed and replay behavior; also comments, likes, shares and subscribers gained in context. Compare variants of hook, pacing and endings over multiple comparable posts. High views are *not guaranteed*. Do not assume numerical thresholds without actual channel data.

## Script approval checklist

- [ ] An audience can understand the anomaly/conflict in the first 1–2 seconds.
- [ ] The hook is fulfilled, not misleading.
- [ ] Each beat changes story information, stakes or feeling.
- [ ] Main character has an identifiable goal, consistent appearance and visibly motivated actions.
- [ ] The reveal is foreshadowed; climax arrives early enough.
- [ ] Narration is speakable and its measured Vbee duration fits the edit.
- [ ] Final line is concise, supported by an image, and not a generic sermon.
- [ ] Storyboard environments, props, subtitle timing and transitions are coherent.
- [ ] Video and audio QA are verified before declaring complete.

## Source and skills

Start every new film by reading this file, `AGENTS.md`, the relevant **Ray** skill, and the canonical pipeline gates. Genre-specific cinematic treatments may vary while the retention-oriented story structure stays. For 30–45s shorts use `.claude/skills/ray-emotional-stick-shorts/SKILL.md` when emotional stick figures are requested; for broader stories `.claude/skills/ray-phim-ke-chuyen/SKILL.md`. Film-specific instructions can override timing, but never the demand for a strong opening and earned payoff.

**Implementation history:** Captures the project owner's standing requirement (2026-10-24) to use a YouTube Shorts high-retention narrative formula for **every topic**. This is a creative heuristic and an internal creator preference, not an official YouTube ranking algorithm or a promise of a million views.
