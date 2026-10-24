# YouTube Shorts retention playbook — universal video rule (2026-10-24)

**Scope: ALL new and revised YouTube Shorts, in every topic/genre** (healing, family, horror, knowledge, history, products, stories, etc.). Apply when producing through `ray-emotional-stick-shorts`, `ray-video-10-phut`, `ray-phim-ke-chuyen` or the canonical video production pipeline.

**Purpose:** Maximize *potential* reach, completion, meaningful comments and shares through viewer-first filmmaking. There is **no formula that guarantees 1 million views**, and no user-specific performance claims may be made before YouTube analytics exists. Follow platform rules, authenticity, copyright, and non-manipulative storytelling.

## Default creative sequence (30–45s unless the brief overrides)

| Time | Purpose | Required evidence in the storyboard |
|---|---|---|
| 0–1s | Scroll stop — visible action, surprise or contradiction immediately | First frame understandable without audio; no black fade, logo or long intro |
| 1–5s | Hook — specific tension or curiosity gap (3–5s typical, vary by story) | An unanswered question / stakes and a feasible voice line |
| 5–12s | Context — who/what/why now | 1–2 concrete events, real props and acting; not generic monologue |
| 12–22s | Escalate — complications and re-hook | New information, character choice, perspective or unexpected detail |
| 22–33s | Climax / reveal / payoff | Visibly consequential action and emotionally meaningful revelation |
| 33–45s | Resolution and memorable final line | Answer/reframe the hook and enable organic share/comment without begging |

For 60-second Shorts, expand the middle while keeping tension and causality; do not add filler. These are **editorial heuristics**, not the official YouTube recommendation algorithm.

## Required storyboard and VO process (regardless of topic)

1. Write **3 distinct candidate hooks**, each with a 0–1s visual and 3–5s script. Select the one with the strongest specific open loop and feasible reading time.
2. Write a complete scene-specific plot: **event → escalating consequence → turning point → visible character decision → meaningful resolution**. Non-fiction may substitute a **surprising fact → evidence → implication → actionable takeaway** arc.
3. Build a beat table including shot ID, start/end, exact Vbee voice text (where configured), **visible action**, character emotion, scene/prop, camera, transition, typography, and SFX/music. Avoid repetitive stand-and-zoom imagery.
4. Maintain a **character bible and world bible** for each film; continuity of costume, hair, color accents, staging, hands and props matters more than increasing shot count. A camera cut should create new information, not merely satisfy a quota. Prefer 12–20 meaningful production shots; use 20+ only when story requires it.
5. Test plausible word count, then **measure the actual narration MP3** before locking scene durations. No hurried speech to fit an arbitrary cut. Route genuine Vbee Batch as the default for emotional stick Shorts; pause when credentials/provider unavailable.
6. Use native frame-driven animation and explicit transition continuity; 60fps helps only if positions, limbs and camera are actually interpolated. Restrict transition families and inspect boundary strips; avoid jump cuts caused by pose/camera resets or double silhouettes.
7. Place mobile-safe readable Vietnamese typography that advances the story, preferably one or two short lines. Use contrasting type hierarchy, not decorative clutter.
8. Score SFX/ambience/music by emotion and action; duck under spoken narration; listen to final MP4 for speech and music. Do not mistake the existence of an audio stream for audible words.
9. End with a specific image or line that completes the hook. Choose a **natural** question only when the audience has an authentic reason to comment. Do not promise virality, use clickbait that misrepresents content, or ask for fake engagement.
10. Conduct independent critical review and all applicable canonical QA gates **before shipping**. Rendered files, publication and analytics are distinct states.

## Creative preflight score (internal editorial self-assessment, NOT an official YouTube score)

Score 0/1/2 per item. If total <16/20, revise before costly render.

| Check | Question |
|---|---|
| 1 | Can a silent mobile viewer understand the first frame immediately? |
| 2 | Does the hook start by 0–1s and finish within its actual spoken budget? |
| 3 | Does the story pose a *specific* human problem/decision or useful unknown? |
| 4 | Is there a reason to care by 10s? |
| 5 | Does each scene add something new visually or narratively? |
| 6 | Is there an escalation/re-hook before the midpoint feels flat? |
| 7 | Is the climax earned, with believable stakes or defensible evidence? |
| 8 | Are acting, camera, prop and world continuity coherent? |
| 9 | Does the ending reward staying rather than being generic advice? |
| 10 | Can the viewer clearly hear/read the story on mobile? |

This audit is **editorial**, not a probability, ranking signal, or claim of reaching 1 million views.

## Measurement after upload (only when published)

Check actual YouTube Studio metrics: **Stayed to watch / chose to view**, **Engaged views**, average view duration, **Average percentage viewed**, audience retention by second (especially 0–5s, re-hook, payoff), and shares/comments. Compare with this channel's historical Shorts of similar topic and length, and edit the next hypothesis. Never report fabricated retention percentages or guaranteed view counts.

Official sources:
- YouTube Shorts analytics: https://support.google.com/youtube/answer/12942217
- Viewer engagement metrics: https://support.google.com/youtube/answer/12220281
- Audience retention: https://support.google.com/youtube/answer/9314415
- YouTube Shorts creator blog: https://blog.youtube/creator-and-artist-stories/youtube-shorts-deep-dive/

## Canonical infrastructure (do not bypass)

Production source: `nanxnguyen/remotion-ai-agentic-studio`; read latest `AGENTS.md`, `.agents/skills/ray-pineline-worflow-agent/SKILL.md`, `.claude/skills/ray-video-10-phut/SKILL.md`, target skill and `scripts/pipeline.py`.

Vbee provider specifics: `.claude/skills/ray-emotional-stick-shorts/references/vbee-provider.md`; Batch API via GitHub Actions with GitHub Secrets `VBEE_APP_ID`, `VBEE_ACCESS_TOKEN`, and pre-existing HTTPS callback as a **non-secret** literal at `https://iehmucsshklgjmxqyggp.supabase.co/functions/v1/vbee-batch-callback` (service availability must be checked, not assumed). Verified helper: `.claude/skills/ray-emotional-stick-shorts/scripts/vbee_tts.py`, voice `hn_male_thanhlong_talk_48k-fhg` (subject to live availability); authenticated polling, immediate MP3 download and ffprobe. Never put token values in files, logs or chat. Previously exposed bearer credentials should be rotated.

Archive policy: `docs/production-archive-policy.md`; verified full MP4 in a **draft GitHub Release** + Drive preview when accessible, and import complete AV to vidIQ with durable `uploadId` (signed playback URLs expire). A vidIQ import is **not** YouTube publication. No auto-publish, no public release or expanded Drive permissions without explicit approval.

## New-chat bootstrap

When a new ChatGPT conversation asks for ANY Shorts video, the assistant must:
1. Read this file before proposing script or rendering.
2. Read applicable genre skill and latest repo rules (don't rely on old conversation summaries).
3. Apply retention sequence **even if the topic is unrelated to romance/healing**.
4. Preserve the selected production provider, QA gates, and archive contract; disclose any missing step.
