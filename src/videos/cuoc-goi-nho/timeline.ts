// cuoc-goi-nho-cua-me ("Cuộc gọi nhỡ của mẹ"). Durations from measured Thanh Long
// clone voice v4 = script v3 (vòng 3: s5/s7 rút gọn theo review vòng 2, regen 8/8 clips).
// Holds: s1 +15f hook, s8 +30f outro.
export const CGN_VOICE_OFFSET = 4;

export type Shot = {from: number; duration: number; sec: number; voice: string};

// [key, measuredSec, holdFrames]
const raw: [string, number, number][] = [
  ['s1', 2.8157, 15],
  ['s2', 2.8635, 0],
  ['s3', 5.626, 0],
  ['s4', 5.4312, 0],
  ['s5', 5.2049, 0],
  ['s6', 3.7676, 0],
  ['s7', 5.3887, 0],
  ['s8', 5.9716, 30],
];
let acc = 0;
export const CGN_SHOTS: Record<string, Shot> = {};
raw.forEach(([k, sec, hold], i) => {
  // -1e-6: guard against float overshoot — (6.4+1.4)*30 = 234.00000000000003
  // would ceil to 235 and push CGN_TOTAL to 1207 instead of spec 1206.
  const duration = Math.ceil((sec + (i === raw.length - 1 ? 1.4 : 0.5)) * 30 - 1e-6) + hold;
  CGN_SHOTS[k] = {from: acc, duration, sec, voice: k};
  acc += duration;
});
export const CGN_TOTAL = acc; // 1308 = 43.6s

// SFX (audio-agent, v2): light cues under Thanh Long voice. Offsets relative to shot start.
export const CGN_SFX: {
  shot: string;
  offset: number;
  src: string;
  volume: number;
  duration?: number;
}[] = [
  {shot: 's1', offset: 5, src: 'sfx-missed-call.mp3', volume: 0.18, duration: 90}, // chuông gọi nhỡ (mẫu 5s, chỉ phát 90f)
  {shot: 's2', offset: 8, src: 'sfx-hangup-tap.mp3', volume: 0.2, duration: 60}, // bấm tắt
  {shot: 's3', offset: 5, src: 'sfx-chat-notif.mp3', volume: 0.18, duration: 60}, // bong bóng chat
  {shot: 's3', offset: 40, src: 'sfx-typing.mp3', volume: 0.16, duration: 56}, // gõ phím (mẫu 1.85s)
  {shot: 's5', offset: 5, src: 'sfx-callback-ring.mp3', volume: 0.2, duration: 60}, // tín hiệu gọi đi
  {shot: 's5', offset: 45, src: 'sfx-pickup.mp3', volume: 0.2, duration: 60}, // mẹ bắt máy
  {shot: 's8', offset: 120, src: 'sfx-warm-chime.mp3', volume: 0.16, duration: 70}, // shimmer ấm câu chốt
];
