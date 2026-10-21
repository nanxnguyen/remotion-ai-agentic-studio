# Remotion production playbook (4.x; consult installed official skill)

Source references: official Remotion `remotion-best-practices`, `remotion-markup`, `remotion-captions`, `remotion-render` and docs. Their independent instructions do **not** replace this repo's `pipeline.py` rendering/evidence contracts.

## Before writing any scene

1. Inspect the current `src/videos/registry.ts`, an existing approved composition, folder conventions and `remotion.config.ts`.
2. Use existing repo's composition registration, *not* direct `Root.tsx` registration if its registry remains authoritative.
3. Follow one-owner-per-shared-file rule. Scene agents write only assigned scene components; director owns registry, central `Reel.tsx`, global audio/kit, `timeline.ts` and voice JSON.
4. Start Studio for design feedback when supported; it is a preview, **not** an approved deliverable. It must not block machine QA unless required by the base workflow.

## Deterministic animation

- Drive video motion with `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, `spring()` or frame-based `Sequence`/`Series` equivalents as supported by the installed Remotion version.
- FPS conversion always derives from `useVideoConfig().fps`, avoiding hard-coded frame counts when composition fps differs.
- Avoid CSS `transition`, CSS keyframes, Tailwind animated utilities and `requestAnimationFrame` for rendered motion; they are not frame-driven.
- Avoid `Math.random()` without deterministic seed, current wall time, unversioned requests or other environment-dependent composition state.
- Stable remote media should be downloaded/referenced with rights/source metadata and checksums when allowed; do not fetch unstable data at render time.
- Use `staticFile()` for vetted bundled public assets when applicable. Check rendering guidance for fonts, audio, images, captions and any video layers.
- All scene durations come from measured narration and timeline. Make animation readable when audio is muted and synced when enabled.

## Example motion component (small, illustrative)

```tsx
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const ClaimReveal = ({ label }: { label: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, 0.35 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(progress, [0, 1], [36, 0]);
  return (
    <AbsoluteFill style={{ justifyContent: 'center', padding: 100 }}>
      <div style={{ opacity: progress, transform: `translateY(${y}px)` }}>
        {label}
      </div>
    </AbsoluteFill>
  );
};
```

This is a fragment for creative direction, **not** a complete scene. It has no automatic caption safe-area guarantee; verify actual stills.

## Scene choreography

- Cover at frame 0 explicitly states/depicts topic. No unrelated black fade.
- Use visual grammar from `references/shotcraft.md`: setup > emphasis > release. Cut on semantic change or voice accent, not arbitrary timer.
- Narration, on-screen caption and key action must be semantically aligned per shot; on-screen text containing a claim requires source or an illustration label.
- Reserve visible hold for reading and end; do not add pointless perpetual motion.
- If character scenes are used, assemble/verify design kit before style frames: heads, torso, arms/hands, legs/feet, pose variations and prop attachments.

## Preview, evidence, full render

- For inner-loop iteration, the current repo supports `python3 -X utf8 -I scripts/pipeline.py render <vid> --draft --scale 0.5`; verify exact options in local `--help`.
- Check targeted stills and hook strip early, but **do not** substitute them for full motion evidence and full gate C/QA regression.
- For final use ONLY `python3 -X utf8 -I scripts/pipeline.py render <vid> --min-seconds 30 --max-seconds 45`, adjusting to explicit brief and current CLI. `pipeline.py` normalizes audio and validates output in the source workflow.
- `pipeline.py verify` and its audit are authoritative. Inspect returned file path and ensure SHA/fingerprint for the rendered MP4 equals the one that passed Gate C and final QA.
- After ANY full re-render, C must review the new fingerprint and the complete final test matrix must run again. Independent QA follows C.

## Audio/captions

Read `voice-character-sync.md` before generating speech. Derive speaker audio, shot coverage and caption intervals from the same measured utterance timeline; explicitly plan cross-shot dialogue. Review cast identity and synchronization in the final MP4, not only source audio.

- Canonical spoken words: `docs/<vid>/voice.json`. Review/ASR must compare full mix vs canonical source per shot; ASR cannot verify human expressiveness.
- Audio targets from source skill: integrated around −14 LUFS, true peak ≤−1.5 dBTP; BGM typically 12–18 dB below voice. Measure from rendered MP4; don't confuse gain settings with measured output.
- Captions require Vietnamese tone marks, exact spoken wording as appropriate, no bottom 210px, no cramped or clipped FitText. Clear type with controlled emphasis beats; don't karaoke animate every word unless it improves comprehension.
- Check visual and audio boundary at scene transitions; reveal timing should track phoneme/voice emphasis when evidence permits.

## Verification command checklist

```bash
npx tsc --noEmit
python3 -m unittest scripts.test_pipeline scripts.test_voice_catalog
python3 -X utf8 -I scripts/pipeline.py audit <vid>
# Render final via pipeline.py (never bypass with ad-hoc npx remotion render):
python3 -X utf8 -I scripts/pipeline.py render <vid> --min-seconds 30 --max-seconds 45
python3 -X utf8 -I scripts/pipeline.py show <vid>
# After independent Gate C + Phase 9 QA and docs/<vid>/eval.md:
python3 -X utf8 -I scripts/pipeline.py check <vid>
```

Pass scores/review steps are recorded by the director with the base skill's `pipeline.py advance` and `gate` mechanics. Tests are examples from the observed repo; verify exact available test modules in your clone.
