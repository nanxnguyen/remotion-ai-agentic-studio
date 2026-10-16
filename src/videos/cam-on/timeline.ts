// "Cảm ơn phiên bản mình" video. Voice: public/audio/camon/sN.mp3 (measured with ffprobe).
// After regenerating voice, update `sec` below; `hold` is the picture-only breathing room per shot (emotional beats get more).
export const CAMON_VOICE_OFFSET = 4;
export const FPS = 30;

export type Shot = {from: number; duration: number; sec: number; voice: string; xf: number};

// [id, measured voice seconds, hold seconds, crossfade-in frames]
const raw: [string, number, number, number][] = [
  ['s1', 3.34, 1.4, 0],
  ['s2', 4.48, 1.4, 10],
  ['s3', 5.66, 1.4, 10],
  ['s4', 2.46, 1.4, 10],
  ['s5', 3.5, 2.0, 10],
  ['s6', 3.86, 1.5, 10],
  ['s7', 1.78, 1.7, 6],
  ['s8', 3.43, 1.8, 6],
  ['s9', 1.62, 1.4, 10],
  ['s10', 2.22, 2.9, 8],
];
let acc = 0;
export const CAMON_SHOTS: Record<string, Shot> = {};
raw.forEach(([k, sec, hold, xf]) => {
  const duration = Math.ceil((sec + hold) * FPS + CAMON_VOICE_OFFSET);
  CAMON_SHOTS[k] = {from: acc, duration, sec, voice: k, xf};
  acc += duration;
});
export const CAMON_TOTAL = acc;

// offset = frames from shot start; f = fraction of the shot's voice span instead (resolved in Reel).
export const CAMON_SFX: {
  shot: string;
  at: number;
  src: string;
  volume: number;
  duration?: number;
}[] = [
  {shot: 's1', at: 0.0, src: 'paper-slide.mp3', volume: 0.25},
  {shot: 's2', at: 0.42, src: 'transition-soft.mp3', volume: 0.12},
  {shot: 's5', at: 0.0, src: 'light-aura.mp3', volume: 0.12, duration: 120},
  {shot: 's5', at: 0.55, src: 'chime-crystal.mp3', volume: 0.1},
  {shot: 's7', at: 0.2, src: 'sparkle-touch.mp3', volume: 0.1},
  {shot: 's9', at: 0.0, src: 'chime-crystal.mp3', volume: 0.12},
  {shot: 's10', at: 0.6, src: 'light-aura.mp3', volume: 0.14, duration: 150},
];
