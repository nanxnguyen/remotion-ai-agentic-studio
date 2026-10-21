import {defineVideo} from '../../core';
import {XayDoiMinhReel} from './Reel';
import {XDM_TOTAL} from './timeline';

export const xayDoiMinhVideo = defineVideo({
  id: '08-XayDoiMinhReel',
  slug: 'xay-doi-minh-hay-chung-minh',
  component: XayDoiMinhReel,
  durationInFrames: XDM_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  defaultProps: {},
  testFrames: [0, 1000, 1775],
  tags: ['story', 'vietnamese'],
});
