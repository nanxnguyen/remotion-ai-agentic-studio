import {defineVideo} from '../../core';
import {SapHangKhongCoTrongSoReel} from './Reel';
import {timeline} from './timeline';

export const sapHangKhongCoTrongSoVideo = defineVideo({
  id: '20-SapHangKhongCoTrongSo',
  slug: 'sap-hang-khong-co-trong-so',
  component: SapHangKhongCoTrongSoReel,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 59, 180, 420, 720, 1020, timeline.totalDurationInFrames - 1],
});
