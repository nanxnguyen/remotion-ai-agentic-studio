import {defineVoiceTimeline} from '../../core';
import {VOICE_SECONDS} from './voice-durations';

export const timeline = defineVoiceTimeline(
  [
    {id: 's1', voiceSeconds: VOICE_SECONDS.s1, holdFrames: 30},
    {id: 's2', voiceSeconds: VOICE_SECONDS.s2, holdFrames: 30},
    {id: 's3', voiceSeconds: VOICE_SECONDS.s3, holdFrames: 30},
    {id: 's4', voiceSeconds: VOICE_SECONDS.s4, holdFrames: 30},
    {id: 's5', voiceSeconds: VOICE_SECONDS.s5, holdFrames: 30},
  ] as const,
  30,
);
