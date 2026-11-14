import {defineSequentialTimeline} from '../../core';
import {VOICE_SECONDS} from './voice-durations';

export const FPS = 30;

// Semantic breathing holds (in frames) after each Vbee voice clip.
export const HOLDS = [12, 14, 14, 12, 15, 15, 14, 15, 27] as const;

const SHOT_IDS = [
  'scene01',
  'scene02',
  'scene03',
  'scene04',
  'scene05',
  'scene06',
  'scene07',
  'scene08',
  'scene09',
] as const;

const VOICE_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9'] as const;

export const timeline = defineSequentialTimeline(
  SHOT_IDS.map((id, index) => {
    const sec = VOICE_SECONDS[VOICE_KEYS[index]];
    const voiceFrames = Math.ceil(sec * FPS);
    return {
      id,
      durationInFrames: voiceFrames + HOLDS[index],
    };
  }),
);
