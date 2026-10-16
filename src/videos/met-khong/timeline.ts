// metkhong v2 ("Lon roi, it ai hoi minh co met khong"). Durations from measured
// Thanh Long clone voice -20% (public/audio/metkhong/sN.mp3, VieNeu-TTS v3 Turbo).
// v2: duration = ceil((sec + hold) * 30) + 4; long holds on emotional beats (s4/s6/s7).
export const MET_VOICE_OFFSET = 4;

export type Shot = {from: number; duration: number; sec: number; voice: string};

// [shot, measured sec, hold sec]
const raw: [string, number, number][] = [
  ['s1', 4.18, 1.2],
  ['s2', 3.65, 1.2],
  ['s3', 3.15, 1.2],
  ['s4', 3.77, 3.0],
  ['s5', 5.08, 1.5],
  ['s6', 4.54, 2.5],
  ['s7', 10.47, 4.5],
];
let acc = 0;
export const MET_SHOTS: Record<string, Shot> = {};
raw.forEach(([k, sec, hold]) => {
  const duration = Math.ceil((sec + hold) * 30) + 4;
  MET_SHOTS[k] = {from: acc, duration, sec, voice: k};
  acc += duration;
});
export const MET_TOTAL = acc; // 1531 (51.0s)

// SFX: offsets rescaled by shot proportion from v1 (video stretched ~1.6x);
// durations unchanged (bound by file lengths). Volumes sit under voice.
export const MET_SFX: {
  shot: string;
  offset: number;
  src: string;
  volume: number;
  duration?: number;
}[] = [
  {shot: 's1', offset: 11, src: 'gaplai-dissolve-soft.mp3', volume: 0.16, duration: 70},
  {shot: 's2', offset: 44, src: 'gaplai-lamp.mp3', volume: 0.2, duration: 60},
  {shot: 's3', offset: 15, src: 'gaplai-dissolve-short.mp3', volume: 0.15, duration: 60},
  {shot: 's4', offset: 78, src: 'gaplai-tea.mp3', volume: 0.18, duration: 70},
  {shot: 's6', offset: 78, src: 'gaplai-heartbeat.mp3', volume: 0.2, duration: 60},
  {shot: 's7', offset: 154, src: 'gaplai-shimmer.mp3', volume: 0.16, duration: 70},
];
