// khoang-trong-trong-buc-tranh ("Khoảng trống trong bức tranh"). Durations from measured gTTS voice (placeholder).
// Profile: story/drama, ~55s total, 8 scenes.
// Colors: warm yellow (AMBER) vs cold blue (COLD) contrast per design-spec.
export const KTT_VOICE_OFFSET = 4;

export type Shot = {from: number; duration: number; sec: number; voice: string};

// [key, measuredSec, holdFrames] - measuredSec from voice-durations.ts (gTTS placeholder)
const raw: [string, number, number][] = [
  ['s1', 2.544, 15],   // HOOK - phone message reveal
  ['s2', 5.496, 0],    // cold dinner, empty chairs
  ['s3', 7.728, 0],    // husband returns, daughter shows drawing
  ['s4', 9.096, 0],    // RE-HOOK - drawing missing father
  ['s5', 9.192, 0],    // wife's calm confrontation
  ['s6', 8.616, 0],    // CLIMAX - phone revealed, apology
  ['s7', 7.416, 0],    // wife leaves with child
  ['s8', 0.744, 30],   // ENDING - empty space in drawing, hold
];

let acc = 0;
export const KTT_SHOTS: Record<string, Shot> = {};
raw.forEach(([k, sec, hold], i) => {
  // -1e-6: guard against float overshoot
  const duration = Math.ceil((sec + (i === raw.length - 1 ? 1.4 : 0.5)) * 30 - 1e-6) + hold;
  KTT_SHOTS[k] = {from: acc, duration, sec, voice: k};
  acc += duration;
});
export const KTT_TOTAL = acc; // ~1665 frames = 55.5s

// SFX (audio-agent): subtle cues under voice. Offsets relative to shot start.
export const KTT_SFX: {
  shot: string;
  offset: number;
  src: string;
  volume: number;
  duration?: number;
}[] = [
  {shot: 's1', offset: 10, src: 'sfx-phone-notif.mp3', volume: 0.25, duration: 60},
  {shot: 's2', offset: 5, src: 'sfx-microwave-hum.mp3', volume: 0.12, duration: 120},
  {shot: 's3', offset: 15, src: 'sfx-door-open.mp3', volume: 0.18, duration: 50},
  {shot: 's3', offset: 45, src: 'sfx-paper-rustle.mp3', volume: 0.15, duration: 40},
  {shot: 's4', offset: 10, src: 'sfx-pencil-scratch.mp3', volume: 0.14, duration: 80},
  {shot: 's5', offset: 20, src: 'sfx-deep-breath.mp3', volume: 0.16, duration: 40},
  {shot: 's6', offset: 10, src: 'sfx-phone-place.mp3', volume: 0.2, duration: 30},
  {shot: 's7', offset: 15, src: 'sfx-footsteps.mp3', volume: 0.12, duration: 60},
  {shot: 's8', offset: 30, src: 'sfx-clock-tick.mp3', volume: 0.1, duration: 90},
];