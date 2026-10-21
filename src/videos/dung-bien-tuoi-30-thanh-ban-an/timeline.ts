import {defineSequentialTimeline} from '../../core';
import {VOICE_SECONDS} from './voice-durations';

// Join timeline: measured voice + locked per-key holds/gaps from script.md.
// Audio offsets are relative to these frame-quantized shot boundaries.
const shot = (id: string, voiceSeconds: number, holdSeconds: number) => ({
  id,
  durationInFrames: Math.round((voiceSeconds + holdSeconds) * 30),
});

export const VOICE_LEAD_IN_SECONDS = {scene01: 0.15} as const;
// 0.15s is 4.5 frames at 30fps; round up to 5 frames so speech never starts early.
export const VOICE_LEAD_IN_FRAMES = {
  scene01: Math.ceil(VOICE_LEAD_IN_SECONDS.scene01 * 30),
} as const;
// Measured from s8.mp3: first phrase ends at 1.320s, the pause is
// 1.408750–1.711167s, and the second phrase ends at 2.960s.
// Boundaries are conservatively quantized to the first frame after each phrase.
export const S8_CAPTION_BOUNDARIES = {firstEnd: 43, secondEnd: 89} as const;

export const timeline = defineSequentialTimeline([
  // 0.15s lead-in + 0.25s post-roll; quantization keeps a full post-roll frame.
  shot('scene01', VOICE_SECONDS.s1, 0.45),
  shot('scene02', VOICE_SECONDS.s2, 0.25),
  shot('scene03', VOICE_SECONDS.s3a, 0.3),
  shot('scene04', VOICE_SECONDS.s3b, 0.25),
  shot('scene05', VOICE_SECONDS.s4a, 0.3),
  shot('scene06', VOICE_SECONDS.s4b, 0.3),
  shot('scene07', VOICE_SECONDS.s5a, 0.45),
  shot('scene08', VOICE_SECONDS.s5b, 0.35),
  shot('scene09', VOICE_SECONDS.s6a, 0.4),
  shot('scene10', VOICE_SECONDS.s6b, 0.3),
  shot('scene11', VOICE_SECONDS.s7a, 0.3),
  shot('scene12', VOICE_SECONDS.s7b, 0.3),
  shot('scene13', VOICE_SECONDS.s8, 0.3),
  shot('scene14', VOICE_SECONDS.s9a, 0.7),
  shot('scene15', VOICE_SECONDS.s9b, 0.4),
  shot('scene16', VOICE_SECONDS.s10, 2.4),
] as const);
