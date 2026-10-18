import {defineSequentialTimeline} from '../../core';
import {VOICE_SECONDS} from './voice-durations';

// Join draft: measured voice + locked per-key holds/gaps from script.md.
// Audio offsets and mix cues are integrated only after Gate E/B.
const shot = (id: string, voiceSeconds: number, holdSeconds: number) => ({
  id,
  durationInFrames: Math.round((voiceSeconds + holdSeconds) * 30),
});

export const timeline = defineSequentialTimeline([
  shot('scene01', VOICE_SECONDS.s1, 0.40),
  shot('scene02', VOICE_SECONDS.s2, 0.25),
  shot('scene03', VOICE_SECONDS.s3a, 0.30),
  shot('scene04', VOICE_SECONDS.s3b, 0.25),
  shot('scene05', VOICE_SECONDS.s4a, 0.30),
  shot('scene06', VOICE_SECONDS.s4b, 0.30),
  shot('scene07', VOICE_SECONDS.s5a, 0.45),
  shot('scene08', VOICE_SECONDS.s5b, 0.35),
  shot('scene09', VOICE_SECONDS.s6a, 0.40),
  shot('scene10', VOICE_SECONDS.s6b, 0.30),
  shot('scene11', VOICE_SECONDS.s7a, 0.30),
  shot('scene12', VOICE_SECONDS.s7b, 0.30),
  shot('scene13', VOICE_SECONDS.s8, 0.30),
  shot('scene14', VOICE_SECONDS.s9a, 0.70),
  shot('scene15', VOICE_SECONDS.s9b, 0.40),
  shot('scene16', VOICE_SECONDS.s10, 2.40),
] as const);
