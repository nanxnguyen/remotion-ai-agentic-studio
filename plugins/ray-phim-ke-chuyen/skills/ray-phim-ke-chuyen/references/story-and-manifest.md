# Story + manifest contract

## Writing specifications

Default Vietnamese mystery: ~55s including a little silence/holds; target 10–16 independent shots, not one busy collage. Hook (<3s), rule/setting, an impossible clue, escalating contradictory evidence, reversal, open-ended question. Use concrete sensory details rather than broad generic horror adjectives. Visual and voice must express the same story beat.

Never present fictional crimes or fake missing-person reports as verified facts. A non-spoken fiction indication can appear in video metadata/description when necessary, but do not narrate the closing disclaimer unless requested. If story references identifiable real cases, verify every factual claim and avoid compositing fake press coverage implying genuine evidence.

## JSON script/production manifest

Create JSON array like:

```json
[
  {
    "id": 1,
    "start_sec": 0,
    "duration_sec": 5.5,
    "narration": "Khách sạn này có một quy tắc kỳ lạ: đừng bấm tầng bốn sau nửa đêm.",
    "caption": "ĐỪNG BẤM TẦNG BỐN",
    "speaker": "narrator",
    "visual": "Protagonist close-up outside dark hotel",
    "image_path": "assets/scene-01.png",
    "motion": "slow push-in, 1.00 to 1.05",
    "sfx": "distant thunder"
  }
]
```

`id` must be 1..N unique, ordered; `start_sec` and `duration_sec` numeric; audio `s{id}.mp3` corresponds exactly to `narration`. Total duration comes from the final scene end, normally 55s for Room 404. If two shots share dialogue, document the cross-shot ownership intentionally.

### Vbee voice over timing

Run batch TTS per final line, write `measured-timeline.json` with `audio_seconds`, `sha256`, `voice_code`, `start_sec` and `duration_sec`. Required check per shot: `audio_seconds <= duration_sec - 0.1` unless speech explicitly crosses into next shot and captions/visuals support it. Do not try to match 55 seconds by increasing voice speed recklessly or chopping the tail; adjust script lengths carefully.

## New-film Remotion data flow

`script.md` → `storyboard.json` → `assets/scene-XX.png` → `public/audio/<vid>/sN.mp3` → actual durations → `src/videos/<slug>/timeline.ts` + frame-driven scene components → final rendered MP4, contact sheet, source archive.

For the existing GitHub repo, its canonical pipeline and registry override generic snippets. Never register a new composition directly in `Root.tsx` where repo rules prohibit it. When metadata is not available, refrain from claiming it was measured.

## Final accepted Room 404 ending

Spoken text: **“Nếu là bạn, bạn có mở cánh cửa đó không?”**. Do not append “Câu chuyện này hoàn toàn hư cấu.” to the spoken track. Keep separate fiction labeling, if appropriate, outside the question instead of confusing it with spoken content.
