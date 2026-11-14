---
name: new-video
description: "This skill should be used when the user runs /new-video or asks to \"start a new 2D video\", \"set up a video from this voiceover\", \"timestamp my voiceover\", \"transcribe and time my narration\", \"import my SRT/timestamped script\", or \"plan the shots for my script\" in the Thanh Hai Learn AI 2D Studio. It covers intake, installing or checking the studio, creating the project, building word-level timestamps (Whisper or the user's timestamped script), and the story breakdown with the shot list.\n"
metadata:
  version: "0.5.0"
  author: Thanh Hai Learn AI
---

# /new-video: intake → install → timeline → story breakdown

This command covers stages 1–4 of the Thanh Hai Learn AI 2D Studio pipeline. Shared references live in the sibling skill folder `../make-2d-video/references/` (relative to this skill's base directory), and the studio kit lives in `../make-2d-video/kit/`.

## 0. Video language (always first)
Before anything else (no install, no files, no edits), ask one question in the user's language: **"Video này dùng ngôn ngữ nào?"** Wait for the answer and map it to an ISO code (`vi`, `en`, `ja`, …). Skip only if the user already named it in this conversation. Follow Stage 0 in `../make-2d-video/SKILL.md`: the code goes to `--lang` and every piece of on-screen text is written in that language.

## 1. Intake
Then ask once (AskUserQuestion when available), skipping anything the user already said:
- **Voiceover file** (required).
- **Script:** timestamped (SRT, VTT, JSON, or TXT with `[mm:ss]`), plain text, or none.
- **Aspect:** 16:9 or 9:16.
- **Resolution:** 720p / 1080p / 1440p / 2160p.
- **Captions:** default on for 9:16.
- **Music:** generated, own file, or none. **SFX:** on or off.
- **Title.**

Defaults: 16:9, 1080p, generated music + SFX.

## 2. Studio
If `thanhhai-2d-studio/render.mjs` doesn't exist in the workspace, follow `../make-2d-video/references/install.md` in full. Otherwise run `python tools/doctor.py` inside it and fix anything reported.

## 3. Project and timestamps (inside `thanhhai-2d-studio/`)
```bash
python tools/new_project.py --name <slug> --voice "<voiceover>" [--script "<script>"] --aspect <16:9|9:16> --resolution <res> --title "<title>" --lang <code> [--captions]
```
- **Timestamped script** → `python tools/parse_script.py --project projects/<slug> --script projects/<slug>/input/script.<ext>`. It accepts SRT, VTT, JSON (`[{start,end,text}]`, `{segments}`, `{words}`) and TXT lines like `[00:12.5] text`, `00:12 - 00:15 text` or `00:00:12,500 --> 00:00:15,000 text`. If the parser reports no timestamps, fall back to the plain-script route.
- **Plain script** → `python tools/transcribe.py --project projects/<slug> --script projects/<slug>/input/script.txt --lang <code> --model small`. It keeps the script's exact words with Whisper timing. Require ≥ 90% match; if lower, tell the user the script and audio differ.
- **No script** → `python tools/transcribe.py --project projects/<slug> --lang <code> --model small` (`base` for speed, `large-v3` for difficult audio). The first run downloads the model.

Open `timeline/transcript.txt` and confirm it reads correctly and ends near the voiceover length. Then run `python tools/beats.py --project projects/<slug>` (add `--force` to overwrite an existing shots.json) and `python tools/visemes.py --project projects/<slug>` (lip-sync mouth shapes).

## 4. Story breakdown
Read `../make-2d-video/references/style-bible.md`, `../make-2d-video/references/story-breakdown.md` and `../make-2d-video/references/animation-principles.md` fully, then:
1. Write `projects/<slug>/story/bible.md`: logline and tone, the cast (one saturated signature item each), locations (mood, key light, window view, props), motifs and the music plan.
2. Write `projects/<slug>/scenes/cast.js` with the outfits.
3. Rewrite `projects/<slug>/story/shots.json` following the pacing rules. Every shot needs a concrete `scene` description, plus transitions, bars, sfx and amb where they matter.
4. Run `python tools/shot_lint.py --project projects/<slug>` and fix every error (hook in the first 3 s, gaps, pacing).
5. Send the user a 5–10 line summary: the cast, the locations, the shot count, and the highlights per act.

Finish by saying the next step is `/video-styles` (or continue with the full pipeline in the `make-2d-video` skill if the user asked for the whole video).
