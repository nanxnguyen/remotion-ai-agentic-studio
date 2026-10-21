import {defineVideo} from '../../core';
import {MetkhongReel} from './Reel';
import {MET_TOTAL} from './timeline';

export const metKhongVideo = defineVideo({
  id: '04-MetkhongReel',
  slug: 'met-khong',
  component: MetkhongReel,
  durationInFrames: MET_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 765, 1530],
  tags: ['story', 'vietnamese'],
});
