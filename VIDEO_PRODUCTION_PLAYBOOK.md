# Video production entry point

For every new Vietnamese 9:16 video, follow the single canonical workflow in [.claude/skills/ray-pineline-worflow-agent/SKILL.md](.claude/skills/ray-pineline-worflow-agent/SKILL.md). That skill defines agent ownership, stage order, review gates **A → D → E → B → C**, voice generation, Remotion build, verification, and delivery. `CLAUDE.md` documents repository architecture and commands.

The default video is **40–60 seconds**, 9:16, 1080×1920 at 30 fps. The final file is named `out/<topic-id>-<voice-slug>-reel.mp4`. Content review E happens after design review D and **before full scene build**, so script/storyboard changes are inexpensive. The final MP4 is reviewed again at video gate C.

Start a new video with:

```bash
python3 -m unittest scripts.test_voice_catalog
python3 -I scripts/pipeline.py init <topic-id> --comp <CompId> --voice <voice-slug> --profile story
npm run pipeline
```

Choose `story`, `product`, `knowledge`, or `news` for `--profile`. Use the stage, review, render, and check commands exactly as described in the skill. Existing videos and legacy output names do not need renaming.
