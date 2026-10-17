// index.ts — chung-minh-de-lam-gi manifest (director owns)
import {defineVideo} from '../../core';
import {ChungMinhDeLamGiReel} from './Reel';
import {CMD_TOTAL} from './timeline';

export const chungMinhDeLamGiVideo = defineVideo({
  id: 'ChungMinhDeLamGiReel',
  slug: 'chung-minh-de-lam-gi',
  component: ChungMinhDeLamGiReel,
  durationInFrames: CMD_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  defaultProps: {},
  testFrames: [0, 864, 1727],
  tags: ['story', 'vietnamese'],
});
