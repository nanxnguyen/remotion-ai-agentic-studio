// "Lan" version (script-v2). Durations come from measured voice (public/audio/truongthanh2/sN.mp3) + room for pauses.
// Regenerate after the final voice is chosen: python3 -I scripts/gen-voice.py truongthanh2 (or expressive script), then update `sec`/`duration`.
export const TT2_VOICE_OFFSET = 4;

export type Shot = {from: number; duration: number; sec: number; voice: string};

// sec = measured voice seconds, duration = frames for the shot (sec + ~0.5s; last shot +1.4s). Measured from scripts/gen-voice-expressive.py output (--rate-shift -6 --pause-scale 1.3 --post).
const raw: [string, number][] = [['s1', 4.41], ['s2', 4.98], ['s3', 4.02], ['s4', 4.18], ['s5', 2.89], ['s6', 4.45], ['s7', 4.83], ['s8', 6.15]];
const PAUSE = 0; // expressive voice already contains its pauses
let acc = 0;
export const TT2_SHOTS: Record<string, Shot> = {};
raw.forEach(([k, sec], i) => {
  const s = sec + PAUSE;
  const duration = Math.ceil((s + (i === raw.length - 1 ? 1.4 : 0.5)) * 30);
  TT2_SHOTS[k] = {from: acc, duration, sec: s, voice: k};
  acc += duration;
});
export const TT2_TOTAL = acc;

export const TT2_SFX = [
  {shot: 's1', offset: 20, src: 'click.mp3', volume: 0.2},
  {shot: 's2', offset: 40, src: 'typewriter.mp3', volume: 0.16, duration: 60},
  {shot: 's3', offset: 90, src: 'shimmer.mp3', volume: 0.14},
  {shot: 's5', offset: 58, src: 'click.mp3', volume: 0.3},
  {shot: 's6', offset: 70, src: 'shimmer.mp3', volume: 0.16},
  {shot: 's7', offset: 60, src: 'riser.mp3', volume: 0.14, duration: 100},
  {shot: 's8', offset: 120, src: 'shimmer.mp3', volume: 0.2},
] as const;
