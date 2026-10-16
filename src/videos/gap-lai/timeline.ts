// gaplai ("Nếu gặp lại mình của vài năm trước"). Durations from measured Cam clone voice
// v2 (public/audio/gaplai/sN.mp3, VieNeu-TTS v3 Turbo) — see docs/gaplai/voice-durations-cam-v2.md.
// DO NOT use docs/gaplai/voice-durations-cam.md (v1) or docs/gaplai/voice-durations.md (old edge-tts HoaiMy timing).
export const GAP_VOICE_OFFSET = 4;

export type Shot = {from: number; duration: number; sec: number; voice: string};

// sec = measured voice seconds + pause_after (s3 +0.6, s7 +0.5, s8 +0.8, rest +0),
// duration = ceil((sec + padding) * 30); last shot padding 1.4, others 0.5.
const raw: [string, number][] = [
  ['s1', 3.12],
  ['s2', 5.59],
  ['s3', 5.08],
  ['s4', 5.65],
  ['s5', 5.58],
  ['s6', 5.76],
  ['s7', 5.13],
  ['s8', 4.64],
  ['s9', 4.53],
];
let acc = 0;
export const GAP_SHOTS: Record<string, Shot> = {};
raw.forEach(([k, sec], i) => {
  const duration = Math.ceil((sec + (i === raw.length - 1 ? 1.4 : 0.5)) * 30);
  GAP_SHOTS[k] = {from: acc, duration, sec, voice: k};
  acc += duration;
});
export const GAP_TOTAL = acc; // 1518

// SFX (audio agent 2026-10-13, v2 9 shots): 8 light cues under Cam voice; scenes are stubs so
// offsets sit at generic action beats (dissolve early, tea/lamp/hug mid, shimmer late s7,
// aura rất nhẹ đầu khoảng lặng s8, soft CTA s9).
// All peaks near 0dB refiles → volume 0.14-0.2 sits ~-17dB under voice mean (-15.6dB full-scale).
export const GAP_SFX: {
  shot: string;
  offset: number;
  src: string;
  volume: number;
  duration?: number;
}[] = [
  {shot: 's2', offset: 10, src: 'gaplai-dissolve-soft.mp3', volume: 0.16, duration: 70}, // khung ảnh cũ dissolve vào
  {shot: 's3', offset: 30, src: 'gaplai-tea.mp3', volume: 0.18, duration: 70}, // rót tách trà
  {shot: 's4', offset: 10, src: 'gaplai-dissolve-short.mp3', volume: 0.15, duration: 60}, // khung ảnh dissolve (mẫu khác s2, chống machine-gun)
  {shot: 's5', offset: 60, src: 'gaplai-lamp.mp3', volume: 0.2, duration: 60}, // bật/sáng đèn bàn
  {shot: 's7', offset: 25, src: 'gaplai-heartbeat.mp3', volume: 0.2, duration: 60}, // cái ôm s7: 1 nhịp tim ngay đầu ôm (fix final review: dời từ s6+45)
  {shot: 's7', offset: 110, src: 'gaplai-shimmer.mp3', volume: 0.16, duration: 70}, // shimmer kết dưới lời cảm ơn (file 2.33s=70f; tail tự nhiên tràn ~11f sang đầu s8, ok)
  {shot: 's8', offset: 120, src: 'gaplai-aura-soft.mp3', volume: 0.14, duration: 35}, // đuôi lặng 0.8s: chỉ aura rất nhẹ đầu khoảng lặng (5.5s, max −1.8 dB)
  {shot: 's9', offset: 25, src: 'gaplai-cta-soft.mp3', volume: 0.16, duration: 50}, // CTA: soft success tone (1.62s, max −0.6 dB)
];
