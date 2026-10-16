import {defineVideo} from '../../core';
import {GaplaiReel} from './Reel';
import {GAP_TOTAL} from './timeline';

export const gapLaiVideo = defineVideo({
  id: 'GaplaiReel',
  slug: 'gap-lai',
  component: GaplaiReel,
  durationInFrames: GAP_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 759, 1517],
  tags: ['story', 'vietnamese'],
});
