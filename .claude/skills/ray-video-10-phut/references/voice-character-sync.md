# Voice casting, character identity and picture synchronization

## Scope and evidence

Apply to every spoken video. Use existing canonical voice/timeline contracts; record extra casting and timing evidence in `docs/<vid>/voice-sync.md`, without silently extending `voice.json` schemas. These are workflow instructions for existing Audio, Join and final reviews; they do not claim automatic enforcement by pipeline.py.

## 1. Cast before generating full dialogue

**Default narrator.** The narrator speaker is Thanh Long Nâng Cao (VieNeu-TTS clone) using `docs/thuong-hay-so-bat-dau-lai/voice-ref/refThanhLong.wav` (md5 `199de31c8281d895dd571e36fe464ed5`) unless the user names another voice. The narrator needs no new casting audition; record it in `voice-sync.md` with that hash. Casting and auditions below apply to every *other* speaker.

- Give each role a stable speaker ID, including a separate narrator. Record perceived age, vocal presentation, dialect, timbre, pace, emotional range, provider/model/version, voice ID and generation settings. Preserve identity across every utterance.
- For the family story: daughter = believable young girl; father = adult man; mother = adult woman. Do not use one adult narrator voice for all dialogue or pitch-shift an adult voice and assume it sounds like a child.
- Generate a short actual audition for each role using its hook or most emotionally demanding line. Listen for pronunciation, Vietnamese rhythm, breathing, stress, natural pauses and fit with the character. Record asset hash, listener, findings and selected take. A provider label or ASR transcript does not prove suitability.
- If suitable voices or listening capability are unavailable, mark blocked/pending. Offer an explicitly labeled narrator adaptation only with user agreement. Never claim an unheard take is natural or approved.

## Natural Vietnamese performance (mandatory)

Aim for smooth, believable speech with emotion appropriate to the scene. Do not promise that every TTS engine can achieve human-level acting.

1. Rewrite spoken lines for conversation before synthesis: short thought groups, familiar Vietnamese wording and pronounceable names/numbers. Preserve meaning and keep canonical text/captions in sync. Avoid literary sentences, repeated ellipses and punctuation used as an uncontrolled emotion hack.
2. Direct each line with intention, addressee, emotional intensity, one or two stress words, pace and motivated pauses. Keep instructions separate from spoken text. Use only controls actually supported by the selected engine; never invent SSML or emotion parameters.
3. Build an emotional arc: hesitation, restrained hurt, shock or resolve according to context. Vary pace and emphasis across meaningful phrases; avoid uniform syllable timing, identical sentence endings, announcer delivery and constant dramatic crying. A child's line must sound age-appropriate rather than an adult performing exaggerated baby talk.
4. Generate at least two short candidate takes for the hook and emotional climax; audition them in picture and select by actual listening. Keep voice identity and dialect stable. Regenerate only weak lines, then listen across both neighboring joins to catch changes in timbre, room tone, pace or intensity.
5. Preserve natural breaths, consonant attacks, quiet pauses and phrase endings. Trim only accidental silence/noise. Use fades only at safe audio boundaries; never crossfade speech in a way that doubles syllables. Avoid aggressive denoising, compression, pitch shifting or speed changes that create metallic, watery or robotic artifacts. Music must not hide weak pronunciation or acting.
6. Listen to isolated dialogue first, then the final mix at normal playback speed. Evaluate natural phrasing, Vietnamese pronunciation, character fit, emotional credibility and smooth joins separately. Record concrete defects and take IDs; ASR and loudness meters cannot certify these perceptual qualities.
7. Require every dimension to be acceptable, with no unresolved robotic cadence, unnatural stress, slurred/clipped words, metallic artifacts or emotional mismatch. Mark unheard output pending. If retries cannot produce an acceptable take, change to a tested suitable voice/provider or report blocked; do not quietly deliver a lower-quality voice to meet ten minutes.

Example direction (metadata, never spoken): daughter asks her father privately, seeking reassurance; soft and hesitant, a brief breath after “Ba ơi”, emphasize “mẹ”, finish as an uncertain question. Do not force a sob on every word.

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

## Executable evidence checks

Create `docs/<vid>/voice-sync.json` alongside the listening notes and run:

```bash
python3 .claude/skills/ray-video-10-phut/scripts/validate_voice_sync.py docs/<vid>/voice-sync.json --mp4 <final.mp4>
```

Use `templates/voice-sync.example.json` as a schema example only. Replace every sample value with real measured data and actual review results; never treat the example as evidence. All frame intervals are global and half-open. `audio_seconds` means playable duration after trims. The initial checker accepts one covering shot per utterance and rejects dialogue overlap. Split a planned cross-shot line into measured segments or report unsupported mapping rather than bypassing validation.

The checker rejects wrong speaker/voice mappings, missing picture coverage, measurement drift, caption drift, overlapping dialogue, stale review fingerprints and pending/failed listening dimensions. It validates declarations only: with `--mp4` the actual output fingerprint and file existence are checked; source audio hashes, waveform contents and media decoding are not inspected, and it cannot prove reviewer honesty, natural acting or that all script lines are represented. Existing pipeline checks, canonical-script comparison and real listening remain mandatory. Pass this checker before requesting final reviews; it does not itself set a pipeline gate to pass.
