import {defineSequentialTimeline} from '../../core';
import {VOICE_SECONDS} from './voice-durations';

export const FPS = 30;
export const PAD_FRAMES = 14; // ~0.46s breathing/transition pad after each Vbee clip

const KEYS = [
  's1',
  's2',
  's3',
  's4',
  's5',
  's6',
  's7',
  's8',
  's9',
  's10',
  's11',
  's12',
  's13',
  's14',
  's15',
  's16',
  's17',
  's18',
  's19',
] as const;

export const timeline = defineSequentialTimeline(
  KEYS.map((key, idx) => {
    const id = `scene${String(idx + 1).padStart(2, '0')}`;
    const sec = VOICE_SECONDS[key];
    return {
      id,
      durationInFrames: Math.ceil(sec * FPS) + PAD_FRAMES,
    };
  }),
);
