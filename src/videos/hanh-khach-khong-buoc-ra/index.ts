import {defineVideo} from '../../core';
import {HanhKhachKhongBuocRaReel} from './Reel';
import {timeline} from './timeline';

export const hanhKhachKhongBuocRaVideo = defineVideo({
  id: '18-HanhKhachKhongBuocRa',
  slug: 'hanh-khach-khong-buoc-ra',
  component: HanhKhachKhongBuocRaReel,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 59, 180, 420, 720, 1020, timeline.totalDurationInFrames - 1],
});
