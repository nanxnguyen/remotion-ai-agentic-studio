import {defineVideo} from '../../core';
import {KhongNgu11NgayVideo} from './Reel';
import {timeline} from './timeline';

export const khongNgu11NgayVideoVideo = defineVideo({
  id: '20-KhongNgu11NgayVideo',
  slug: 'khong-ngu-11-ngay',
  component: KhongNgu11NgayVideo,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1920,
  height: 1080,
  testFrames: [
    0,
    Math.floor(timeline.totalDurationInFrames / 2),
    timeline.totalDurationInFrames - 1,
  ],
});
