import {defineVideo} from '../../core';
import {CuocGoiNhoReel} from './Reel';
import {CGN_TOTAL} from './timeline';

export const cuocGoiNhoVideo = defineVideo({
  id: 'CuocGoiNhoReel',
  slug: 'cuoc-goi-nho',
  component: CuocGoiNhoReel,
  durationInFrames: CGN_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 709, 1418],
  tags: ['story', 'vietnamese'],
});
