# QA report

## Output verification

- Both deliverables decode as H.264 video and AAC audio.
- Resolution: 1080 × 1920, portrait 9:16.
- Frame rate: 30 fps; 1,290 frames; 43 seconds.
- Audio: stereo, 48 kHz.
- Visual frame hashes match between the music and no-music versions.
- `blackdetect` found no black segment lasting 0.15 seconds or longer.
- Integrated loudness: −18.2 LUFS with music; −18.3 LUFS without music. True peak is below −4 dBFS on both.
- TypeScript check: `npx tsc --noEmit` passes.

## Accessibility and creative review

- Vietnamese captions use 64 px type and sit 224 px above the bottom edge for mobile safe area.
- The product UI shot uses the repository's official `overview.png`; illustrative graph scenes are code-native recreations.
- The researched script distinguishes repository features from visual interpretation and includes a note that initial indexing can use many tokens.
- An independent review identified caption placement, scene seams, and motion clarity issues. Those were corrected before final render; the final visual stream was checked again.

## Audio timing

- Voice, music, and shot effects are mixed in separate Remotion compositions.
- The music-free deliverable retains narration and sound effects.
- Opening, proof, and closing impacts are aligned against the decoded sound-effect transient, with start offsets compensated for source encoder delay.
