import {defineVoiceTimeline} from '../../core';
import {VOICE_SECONDS} from './voice-durations';

const FPS = 30;
const TARGET_FRAMES = [57, 63, 60, 120, 120, 120, 120, 180, 270, 150] as const;

export const timeline = defineVoiceTimeline([
  {id: 'scene01', voiceSeconds: VOICE_SECONDS.s1, holdFrames: Math.max(0, TARGET_FRAMES[0] - Math.ceil(VOICE_SECONDS.s1 * FPS)), voice: 's1'},
  {id: 'scene02', voiceSeconds: VOICE_SECONDS.s2, holdFrames: Math.max(0, TARGET_FRAMES[1] - Math.ceil(VOICE_SECONDS.s2 * FPS)), voice: 's2'},
  {id: 'scene03', voiceSeconds: VOICE_SECONDS.s3, holdFrames: Math.max(0, TARGET_FRAMES[2] - Math.ceil(VOICE_SECONDS.s3 * FPS)), voice: 's3'},
  {id: 'scene04', voiceSeconds: VOICE_SECONDS.s4, holdFrames: Math.max(0, TARGET_FRAMES[3] - Math.ceil(VOICE_SECONDS.s4 * FPS)), voice: 's4'},
  {id: 'scene05', voiceSeconds: VOICE_SECONDS.s5, holdFrames: Math.max(0, TARGET_FRAMES[4] - Math.ceil(VOICE_SECONDS.s5 * FPS)), voice: 's5'},
  {id: 'scene06', voiceSeconds: VOICE_SECONDS.s6, holdFrames: Math.max(0, TARGET_FRAMES[5] - Math.ceil(VOICE_SECONDS.s6 * FPS)), voice: 's6'},
  {id: 'scene07', voiceSeconds: VOICE_SECONDS.s7, holdFrames: Math.max(0, TARGET_FRAMES[6] - Math.ceil(VOICE_SECONDS.s7 * FPS)), voice: 's7'},
  {id: 'scene08', voiceSeconds: VOICE_SECONDS.s8, holdFrames: Math.max(0, TARGET_FRAMES[7] - Math.ceil(VOICE_SECONDS.s8 * FPS)), voice: 's8'},
  {id: 'scene09', voiceSeconds: VOICE_SECONDS.s9, holdFrames: Math.max(0, TARGET_FRAMES[8] - Math.ceil(VOICE_SECONDS.s9 * FPS)), voice: 's9'},
  {id: 'scene10', voiceSeconds: VOICE_SECONDS.s10, holdFrames: Math.max(0, TARGET_FRAMES[9] - Math.ceil(VOICE_SECONDS.s10 * FPS)), voice: 's10'},
] as const, FPS);

if (timeline.totalDurationInFrames > 45 * FPS) {
  throw new Error('Hẻm Chuyện Lạ Short exceeds the 45-second hard cap. Retiming is required.');
}
