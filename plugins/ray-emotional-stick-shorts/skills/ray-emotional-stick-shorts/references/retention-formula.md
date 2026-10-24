# Universal YouTube Shorts retention formula — for EVERY topic, all future chats

**Always load and apply this when asked for a NEW or REVISED YouTube Short, no matter the topic.** Applies to emotional healing, romance, parenting, family stories, horror, education, product explanations, storytelling and documentary Shorts. This rule supplements — not replaces — the relevant subject skill, repository rules and mandatory QA/gates.

**Source of truth for future conversations:**
- GitHub repo: `nanxnguyen/remotion-ai-agentic-studio`
- Universal script standard: `docs/standards/youtube-shorts-retention-universal.md` (on branch `docs/shorts-retention-global-v1` until merged into main)
- Current AGENTS.md, `.claude/skills/ray-video-10-phut/SKILL.md`, `.claude/skills/ray-emotional-stick-shorts/SKILL.md`, `.agents/skills/ray-pineline-worflow-agent/SKILL.md`, `scripts/pipeline.py` and `docs/production-archive-policy.md` remain authoritative. Read LIVE files; don't assume a PR has merged.

## Mandatory narrative design — testable creative heuristics, not a secret algorithm

**0–1s:** First frame is emotionally or informationally legible without sound; show active surprise/contradiction, not a black logo intro.

**1–5s:** Specific hook and meaningful open loop. Draft 3 DISTINCT hooks (surprising event, recognisable confession, striking visual contradiction); choose strongest based on mobile clarity and actual spoken duration. Some genres require a shorter/longer hook.

**5–12s:** Who/what/why now? Establish concrete stakes, details, motive or surprising factual relevance early.

**12–22s:** New actions and information every ~2–4s as justified; credible escalation, re-hook/turn, purposeful cuts. Do not increase shot count by duplicating poses/backgrounds.

**22–33s:** Earned climax, unexpected but well-planted discovery, meaningful decision or evidence-backed explanation. Image must reflect the spoken action.

**33–45s:** Compassionate resolution, decisive action, specific takeaway or reveal that rewards continued viewing; subtle organic prompt for discussion only if truly relevant. Avoid fake suspense or forced engagement.

If user explicitly requests a 60s script, scale the middle while preserving a decisive hook and tight momentum. The creator's default production length is 30–45 seconds, ideally ~37–41 seconds. **Never promise 1 million views**; this is a production objective that must be tested using YouTube Studio.

## Required output / preflight for all scripts

1. Three genuinely different hooks internally, select and explain the chosen one when drafting.
2. Clear story question and arc — EVENT → COMPLICATION → TURN → CLIMAX → PAYOFF. For knowledge videos: QUESTION → FACTS/EVIDENCE → SURPRISING INSIGHT → UTILITY.
3. Exact narrated Vietnamese text per scene with plausible speech budget and timestamp; narration must be measured from final Vbee MP3 before locking shots.
4. Stable character and WORLD bible matched to actual script; maintain consistent identity, clothing, props, and locations through cuts.
5. Varied, meaningful cinematography and action; make dialogue visible, don't hide a slideshow behind 60fps zooms.
6. Smooth original frame-by-frame acting/rig with matched anchors, joint poses, cameras, and short motivated transition families; check scene boundaries.
7. Readable Vietnamese type safe for 9:16 mobile; original/licensed music with voice ducking and SFX matched to visible action.
8. A humble internal retention-review checklist (score 0–2 each, maximum 20): hook clarity; hook duration; specificity; stakes by 10s; each scene adds; re-hook; earned climax; continuity/acting; memorable finish; intelligibility. Under 16: rewrite weakest parts before rendering. This is NOT an official YouTube ranking score.
9. Actual QA: check streams using ffprobe, listen to narration AND score in FINAL MP4, inspect frame 0 + all scene boundaries and climax, verify duration/size/fps, hand off only actual verified media.
10. Only after approval and successful QA, archive media in approved draft GitHub Release and Google Drive as specified in live repo; use vidIQ import and store stable `uploadId`. Signed URLs expire. NEVER auto-publish YouTube.

## Vbee route and security

- Default narration provider for this plugin: real Vbee Batch, voice `hn_male_thanhlong_talk_48k-fhg` if supported, directed with evolving emotions (restraint → tension → climax → relief) and measured per utterance.
- Use GitHub Actions Secrets `VBEE_APP_ID` and `VBEE_ACCESS_TOKEN`; do not paste, store, or repeat their values.
- Existing non-secret callback: `https://iehmucsshklgjmxqyggp.supabase.co/functions/v1/vbee-batch-callback`; poll the Batch request status to receive a short-lived audioLink; download immediately and verify audio with ffprobe.
- Verified helper path `.claude/skills/ray-emotional-stick-shorts/scripts/vbee_tts.py`; audit the latest repo files before using.
- If Realtime API is not part of subscription, never silently fallback or pretend it succeeded. Vbee pronunciation/emotional quality needs human listening.

## Post-publish evaluation

Use YouTube Studio: **Stayed to watch / chose to view**, **Engaged views**, average view duration, **Average percentage viewed**, second-by-second audience retention and authentic comments/shares. Compare against the channel's comparable Shorts, not fabricated thresholds or guaranteed outcomes.

Official references:
- https://support.google.com/youtube/answer/12942217
- https://support.google.com/youtube/answer/12220281
- https://support.google.com/youtube/answer/9314415
- https://blog.youtube/creator-and-artist-stories/youtube-shorts-deep-dive/

**Important:** GitHub source/this private plugin provide cross-conversation knowledge. ChatGPT personal Memory is separate and may not be modified from this chat. Use repo and plugin as the durable source.
