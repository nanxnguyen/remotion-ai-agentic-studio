# Voice casting, character identity and picture synchronization

## Scope and evidence

Apply to every spoken video. Use existing canonical voice/timeline contracts; record extra casting and timing evidence in `docs/<vid>/voice-sync.md`, without silently extending `voice.json` schemas. These are workflow instructions for existing Audio, Join and final reviews; they do not claim automatic enforcement by pipeline.py.

## 1. Cast before generating full dialogue

- Give each role a stable speaker ID, including a separate narrator. Record perceived age, vocal presentation, dialect, timbre, pace, emotional range, provider/model/version, voice ID and generation settings. Preserve identity across every utterance.
- For the family story: daughter = believable young girl; father = adult man; mother = adult woman. Do not use one adult narrator voice for all dialogue or pitch-shift an adult voice and assume it sounds like a child.
- Generate a short actual audition for each role using its hook or most emotionally demanding line. Listen for pronunciation, Vietnamese rhythm, breathing, stress, natural pauses and fit with the character. Record asset hash, listener, findings and selected take. A provider label or ASR transcript does not prove suitability.
- If suitable voices or listening capability are unavailable, mark blocked/pending. Offer an explicitly labeled narrator adaptation only with user agreement. Never claim an unheard take is natural or approved.

## 2. Lock utterance ownership

Before TTS, create one row per utterance:

| Utterance ID | Exact text | Speaker ID | Voice ID / take | Emotion / emphasis / pauses | Shot ID | Picture mode | Visible character IDs |
|---|---|---|---|---|---|---|---|
| u01 | Ba ơi... con có phải gọi cô ấy là mẹ không? | daughter | selected audition | hesitant; pause after Ba ơi | s01 | on-screen | daughter |

Modes: on-screen dialogue, off-screen dialogue, narrator, or reaction shot. For off-screen/reaction/J-cut/L-cut, document the speaker cue, reason and permitted cross-shot interval. A father's reaction under his daughter's voice can be intentional; showing an unrelated speaking mouth cannot pass as synchronization.

Generate and store audio per utterance, never split an undifferentiated multi-character TTS track by guessed text lengths. Do not read speaker names, stage directions or emotion tags aloud. Keep stable voice settings; change delivery per line without changing identity. Cache by text + speaker + voice/model/settings + take, not text alone.

## 3. Measure audio, then build the timeline

- Probe each final trimmed asset with FFprobe or the repo measurement tool. Record hash, measured duration, trim offsets, global start/end frames and caption intervals. Reject missing, zero-length, truncated or stale measurements.
- Use the composition FPS. Start frames come from one shared timeline; duration frames round up from measured playable audio. Account for trims, inserted silence, breaths and transitions exactly once.
- Build audio placement, captions and picture cues from that shared map. Do not independently type hard-coded seconds in each scene. Avoid duplicate audio from both scene and global tracks.
- Require every utterance exactly once, known speaker/shot IDs, ordered valid intervals, no unintended dialogue overlap, no utterance beyond composition end, and complete picture coverage. Allow cross-shot speech only when explicitly planned.
- Default project review tolerance for caption/speech onset and explicit speaker cues: 100 ms; round to frames and record any justified exception. This is a local acceptance target, not an upstream Remotion guarantee. Check ending words and tails too.
- If dialogue overruns, shorten the script and regenerate, extend the shot, or revise the agreed duration. Never squeeze speech with unnatural speed or cut the last word to hit 45 seconds.
- Still-image pans are illustrated dialogue, not lip sync. For visible moving mouths, verify mouth/speech alignment in motion; use a non-speaking cutaway or supported lip-sync workflow if alignment is unavailable. Never label stills as lip-synced footage.

## 4. Review the rendered result

Audio review: listen to every final take for character suitability, consistent identity, pronunciation and emotional intent. Join review: reconcile the complete mapping, measurements and actual scene schedule before build.

Gate C/final QA: watch and listen to the actual final MP4 from beginning to end, not only the isolated WAV or screenshots. For each utterance record observed start/end, speaker, visible shot/character, caption alignment, tail integrity and verdict. Inspect speaker handoffs and shot cuts on both sides. ASR supports wording checks but cannot establish speaker identity, naturalness, acting, or lip sync.

Record reviewer identity, method/tool, timestamp, MP4 hash, evidence and unresolved findings in voice-sync.md and reference it from existing review records. If nobody can actually listen, retain pending status and do not deliver as verified. Never fabricate human approval.

Block delivery for wrong/unidentified speaker, silent fallback to narrator, unexplained picture mismatch, missing/repeated/cut dialogue, unplanned overlap, failed caption timing or unverified listening. Repair the affected take/map/shot; remeasure, rebuild dependent captions/timeline, invalidate stale evidence through the existing pipeline, rerender and repeat final QA on the new fingerprint. Keep unaffected valid assets cached. Exceed the ten-minute target rather than waive these checks.
