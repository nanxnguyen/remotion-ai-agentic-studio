import {defineVideo} from '../../core';
import {Main} from '../../Main';
import {FPS, HEIGHT, TOTAL, WIDTH} from '../../timeline';

export const understandAnythingVideo = defineVideo({
  id: '06-UnderstandAnythingReel',
  slug: 'understand-anything',
  component: Main,
  durationInFrames: TOTAL,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
  defaultProps: {withBgm: true},
  testFrames: [0, 645, 1289],
  tags: ['product', 'vietnamese'],
});
