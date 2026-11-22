---
name: horror-story-writer
description: "This skill should be used when the user wants only the story or script for a horror / ghost video (no rendering yet), or wants an existing horror script audited and improved, e.g. \"write a scary story script\", \"give me horror video ideas\", \"check my ghost story script\", \"3 true scary stories script\", and Vietnamese requests such as \"viết kịch bản truyện ma\", \"nghĩ ý tưởng truyện kinh dị\", \"chấm kịch bản truyện ma\", \"viết truyện tâm linh cho video\", \"kịch bản Shorts truyện ma 60 giây\". It pitches premises from proven demand, writes original scripts with a beat/scare plan and TTS-ready narration, and scores scripts against a retention checklist."
metadata:
  version: "0.2.0"
---

# Horror story writer

Write original horror scripts built to hold viewers, ready for the `make-horror-video` or `make-horror-video-ditap` pipeline. The knowledge lives in the sibling skills' references:
- `../make-horror-video/references/`: `horror-trends.md` (formats, lengths, what is working now), `horror-story-engine.md` (laws, beat skeletons, scare grammar, twists, narration rules, checklist), `folklore-bank.md` (premises, safe angles, never-list), `packaging.md` (titles).
- `../make-horror-video-ditap/references/ditap-playbook.md` (**Option C — Dạ Hành Dị Tạp 25–35 min folklore format**): 8-beat script structure extracted from *Thần Trùng*, *Bùa Lỗ Ban*, and *Thiên Linh Cái* (0:00–1:00 cold-open rule/count anomaly → 1:00 black title card → village setup + folk specialist + 3 taboos → 3 escalations culminating in a modern-tech mirror trap → false ritual climax → post-climax subtle wrongness clues → 90% perspective-flip identity twist → 4th-wall dark-screen ending).

## Workflow
1. **Language and format.** Ask the video language first if unknown, then the format: Short (45–60 s), single story (8–15 min), compilation (15–25 min), **Dạ Hành Dị Tạp folklore episode (25–35 min, Option C)**, or long tâm linh (30–60 min). Default: Vietnamese single story, 10–12 min, channel Hẻm Chuyện Lạ (or 25–35 min 8-beat Dạ Hành Dị Tạp when the user asks for folklore / dị văn dân gian / Option C).
2. **Pitch.** Offer 3 premises, one line each: hook image + the rule + the want, twist hidden behind "(twist ẩn)", a draft title and a thumbnail idea. Mix sources: one folk/village, one modern urban, one wildcard (rules horror, cổ tích đen, object horror). For Dạ Hành Dị Tạp (Option C), use the minimal title formula `[Từ khóa dân gian / cấm kỵ] - [Chi tiết số đếm / vật định mệnh]` without suffix clutter. Recommend one and say why in one sentence, grounded in `horror-trends.md` / `ditap-playbook.md`.
3. **Outline.** Beat skeleton for the format with timestamps, the place/rule/want, the three escalations (including the modern-tech mirror/video-call trap for Option C), the midpoint reveal or false climax, the planted detail and the twist.
4. **Script.** Write the narration with inline beat tags `[HOOK] [PROMISE] [SETUP] [DREAD] [HUSH] [SCARE] [REVEAL] [BREATHER] [TWIST] [CTA]`, and under each paragraph a one-line visual note (what the 2D shot shows, which entity stage of the reveal ladder, or which `engine/ditap.js` traits such as `khanTang`, `blindEye`, `ditapAltar` with `mirrorPeek`, `faceless: true` appear).
5. **Audit.** Score the script 0–10 on: hook strength, clarity of rule/want, escalation, dread vs. jump balance, twist fairness (planted?), sensory detail, TTS readiness, title/thumbnail honesty. Run the checklist from `horror-story-engine.md` (and the 8-beat checklist in `ditap-playbook.md` for Option C); fix every miss before showing it.
6. **Deliver.** A finished script the user will keep goes into the session's document artifact type when one is listed (otherwise a `.md` file): title options, logline, beat outline, full script with tags + visual notes, and a clean `narration.txt` block (spoken text only, one sentence per line, numbers as words). Offer to produce the video with `make-horror-video` or `make-horror-video-ditap`.

## Auditing a user's script
Keep the user's voice. Report the score table, the 3 biggest problems with concrete rewrites (quote the line, give the replacement), then the checklist. Only rewrite the whole script if asked.

## Never
Copy another creator's story, a Reddit/creepypasta post or a book; present fiction as news about real people or places; describe gore or self-harm methods; mock a religion or ethnic group's customs.
