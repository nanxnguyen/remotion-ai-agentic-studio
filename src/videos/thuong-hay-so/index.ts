import {defineVideo} from '../../core';
import {ThuongHaySoReel} from './Reel';
import {HEIGHT, THS_TOTAL, WIDTH} from './timeline';

export const thuongHaySoVideo = defineVideo({
  id: '07-ThuongHaySoReel',
  slug: 'thuong-hay-so-bat-dau-lai',
  component: ThuongHaySoReel,
  durationInFrames: THS_TOTAL,
  fps: 30,
  width: WIDTH,
  height: HEIGHT,
  testFrames: [0, 884, 1768],
  tags: ['story', 'vietnamese'],
});
