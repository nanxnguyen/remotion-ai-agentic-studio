# Horror sound — half of the fear is audio

Read with the base `sound-design.md` (levels, ducking, mixing commands). All sounds are generated locally (no downloads, no licences).

## Library additions (`python audio/sfx.py --list`)
| Name | Use |
|---|---|
| `scare` | the jump-scare hit (noise burst + dissonant cluster + sub boom). Exactly on the reveal frame, gain −6…−3 |
| `reverse` | suck-in swell that ENDS on the scare frame (cue `at` = scare time − 1.6 s) |
| `stinger` | softer reveal/twist hit (base library) |
| `drone` | low dread bed — the default `amb` for tense scenes (−22…−18) |
| `whisper` | breathy panning unintelligible whisper — behind the listener |
| `creak` | slow wooden door creak |
| `knock` | three slow knocks (`count`, `gap` adjustable) |
| `musicbox` | detuned lullaby — children, dolls, old rooms |
| `breath` | frightened breathing — POV hiding scenes |
| `templebell` | chuông chùa strike with a long tail — openings, endings, tâm linh |
| `drip` | water drip — wells, bathrooms, ma da |
| `static` | TV/radio static burst — VHS cuts, signal loss |
| `chime` | phong linh in a cold wind — the "something entered" cue |
| `wail` | distant ghostly moan, no words |
| `scrape` | nails / metal drag |
| base | `heartbeat footstep wind rain thunder roomtone hum glitch impact riser whoosh phonering phonebuzz` |

## Music moods (`story/shots.json` → `music`)
`dread` (54 bpm, drone + tick, very dark) · `haunt` (piano fragments over drone) · `folk` (Vietnamese village colour: drone + plucks + bell) · `chase` (140 bpm pulse for escapes) · `void` (near-silent sub drone) · plus base `dark`, `mystery`, `tension`, `sad` (for the heartbreaking "why" ending).

## Rules
1. **Silence is the instrument.** Before each scare, `"hush": true` on the previous shot drops music + ambience ~14 dB over its last 0.7 s. The hit then lands at full level. Never stack a stinger every few seconds.
2. **Layer the hit:** `reverse` (ending on the frame) + `scare` (on the frame) + a body sound (door slam = `hit`, glass, scream-free `wail`). Keep the voice clear: hits go between narrated words, not over a key word.
3. **Every location has a bed:** hẻm = `drone` + distant `city`/`hum`; village = `wind` + `chime`; rain scenes = `rain` + `thunder` on cuts; interiors = `roomtone` + `drip`.
4. **Diegetic cues sell the story:** the lamp buzz (`hum`) that stops when the ghost appears; three `knock`s that match the narration "cốc… cốc… cốc"; the phone ringing at 02:17.
5. **Music arc:** setup in `mystery`/`folk` at 0.3–0.4 intensity → escalations in `dread` 0.5–0.7 → climax `chase` or `dread` 0.85 → twist on `void` (near silence) → CTA on `templebell` + low `haunt`.
6. Levels (relative to the voice, handled by mix.py): music −17…−14 dB, beds −24…−18, hits −8…−3. Master −14 LUFS.
