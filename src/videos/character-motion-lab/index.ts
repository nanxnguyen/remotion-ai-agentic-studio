import {defineVideo} from '../../core';
import {CharacterMotionLabReel} from './Reel';

export const characterMotionLabVideo = defineVideo({
  id: 'CharacterMotionLab',
  slug: 'character-motion-lab',
  component: CharacterMotionLabReel,
  durationInFrames: 300,
  fps: 30,
  width: 1920,
  height: 1080,
  testFrames: [0, 47, 96, 120, 180, 220, 299],
});
