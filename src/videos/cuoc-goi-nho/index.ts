import {defineVideo} from '../../core';
import {CuocGoiNhoReel} from './Reel';
import {CGN_TOTAL} from './timeline';

export const cuocGoiNhoVideo = defineVideo({
  id: '05-CuocGoiNhoReel',
  slug: 'cuoc-goi-nho',
  component: CuocGoiNhoReel,
  durationInFrames: CGN_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, Math.floor(CGN_TOTAL / 2), CGN_TOTAL - 1],
  tags: ['story', 'vietnamese'],
});
