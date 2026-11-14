# Sound design

`audio/mix.py` builds the soundtrack from `story/shots.json`. It ducks the music −9 dB and ambience −5 dB under the voice and normalises the master to −14 LUFS (YouTube), or `config.loudness`.

**Music plan** (`"music"` in shots.json): contiguous sections with a mood and intensity (0–1; higher adds pulse, arps and drums). Moods: `mystery, tension, action, wonder, hopeful, sad, triumph, playful, calm, dark, epic`. Change sections at story turns (the title card, a discovery, danger, the climax, the resolution, the science segment), typically every 30–90 s. Audition with `python audio/music.py --mood tension --dur 20 --out test.wav`. To use the user's own track, set `config.music.file = "input/music.mp3"` (it loops or trims and fades the end). Set `config.music.gainDb` (default −17 relative to the voice) for a louder or quieter bed. The generated music is a serviceable ambient/cinematic bed. For premium results, suggest the user's own licensed track.

**SFX cues** (per shot `"sfx": [{"at": 0.3, "name": "whoosh", "gain": -8}]`, where `at` is seconds from the shot start; optional `dur`, `seed`, `pitch`; `name` can also be a path to the user's own WAV/MP3). Library (`python audio/sfx.py --list`, audition all with `--demo build/sfx_demo`):
`whoosh, swish, impact, hit, riser, slowmo, freeze, tick, clock, heartbeat, pop, blip, counter, ding, shimmer, stinger, footstep, kick, whistle, carpass, phonebuzz, phonering, cheer, applause, murmur, rain, thunder, wind, roomtone, city, hum, powerup, glitch, flash, buzz`.
Conventions: `whoosh`/`swish` on camera whips and fast moves. `pop`/`blip` when graphics appear, `counter` under ticking numbers. `riser` 1–2 s before a big reveal, then `impact`/`stinger` on it. `slowmo` going into slow motion, `freeze` on time-stop. `ding`/`shimmer` for realisations and powers. `hit`/`kick`/`footstep` on contact. Gains: subtle UI −12 to −16, normal −6 to −10, big moments −3 to −6. Don't stack more than ~2 cues at the same instant, and leave dialogue clear.

**Ambience beds** (per shot `"amb": {"name": "rain", "gain": -20}`; looped with 0.4 s fades): `rain, wind, city, roomtone, murmur, hum`. Use them on most shots for a continuous world, at −18 to −28.

