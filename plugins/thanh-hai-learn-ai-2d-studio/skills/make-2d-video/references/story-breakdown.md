# Story breakdown (the creative pass)

Read the whole transcript twice. Then write `story/bible.md` (short, practical):
- **Logline and tone** (wonder / suspense / comedy / drama), plus who "you" is if the script is in second person.
- **Cast table.** For each recurring character: id, role, outfit `{top, color, head, headColor, face, legs, gloves, kid}`, signature colour, personality, and the expressions they use most. Every recurring character gets exactly ONE distinct saturated signature item (style-bible.md, Characters). Put the outfits in `scenes/cast.js`.
- **Locations (sets).** For each: name, mood (`day|golden|dusk|night|storm|interiorWarm|interiorCool|void`), where the key light comes from, the window/view, 3–6 signature props, and the layers (sky → far → mid → floor → foreground).
- **Motifs:** recurring visual devices tied to the story, such as a frozen-droplets look for slowed time, a corner multiplier badge, a heartbeat line, or a colour that marks a power.
- **Act / music plan:** sections with a mood and intensity (sound-design.md).

Then **rewrite `story/shots.json`** (schema in engine-api.md, story/shots.json). For every shot set:
`id, start, end, size, line, scene` (`size` = the framing from the shot vocabulary: wide, medium, ots, close, insert, top, freeze, 3d, data, blueprint, title, end; `scene` = one concrete sentence describing the picture, e.g. "OTS: blurred Jake shoulder fg, Max at the window, rain, slow push"), `set`, `bars`, `in` (transition), `sfx`, `amb`, `notes`.

Pacing rules:
- Shots are **contiguous**: each `end` equals the next `start`. The first starts at 0 and the last ends at `duration`, which is the voiceover length plus about 1.5 s.
- Cut on phrase boundaries. Start a shot **0.1–0.2 s before** the phrase it illustrates.
- Target a **median of 2–3.5 s**. Fast action: 0.8–2 s cuts (split one phrase into several shots). Emotional or dialogue holds: 4–8 s. Never go beyond ~10 s without a new action or camera move.
- **Hook:** the first shot is the most striking image of the video and lasts ≤ 4 s; no logo, channel intro or title card in the first 3 s (the title card comes after the cold open).
- Mark punchline / realisation words in `notes` ("beat: <word>") so the shot can use `beatHold`; mark fast action shots with `"mblur": 6` and comedic or cozy ones with `"timing": "twos"`.
- Every new location opens with an establishing shot (wide 2D or 3D).
- Expect roughly **15–25 shots per minute** of narration.

Run `python tools/shot_lint.py --project projects/<slug>` and fix every error (warnings: fix or justify in `notes`). Give the user a 5–10 line summary: the cast, the locations, the number of shots, and the visual highlights per act. Continue unless they object.

