import {defineVideo} from '../../core';
import {CamonReel} from './Reel';
import {CAMON_TOTAL} from './timeline';

export const camOnVideo = defineVideo({
  id: 'CamonReel',
  slug: 'cam-on',
  component: CamonReel,
  durationInFrames: CAMON_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 760, 1520],
  tags: ['story', 'vietnamese'],
});
