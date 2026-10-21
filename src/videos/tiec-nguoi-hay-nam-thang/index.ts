import {defineVideo} from '../../core';
import {TiecNguoiHayNamThangReel} from './Reel';
import {TOTAL_FRAMES} from './timeline';
export const tiecNguoiHayNamThangVideo = defineVideo({
  id: '10-TiecNguoiHayNamThangReel',
  slug: 'tiec-nguoi-hay-nam-thang',
  component: TiecNguoiHayNamThangReel,
  durationInFrames: TOTAL_FRAMES,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, Math.floor(TOTAL_FRAMES / 2), TOTAL_FRAMES - 1],
  tags: ['story', 'vietnamese', 'prebuild'],
});
