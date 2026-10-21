import {defineVideo} from '../../core';
import {SoNoiKhong} from './Reel';
import {timeline} from './timeline';

export const soNoiKhongVideo = defineVideo({
  id: '16-SoNoiKhongReel',
  slug: 'so-bi-xem-la-ich-ky-khi-noi-khong',
  component: SoNoiKhong,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, Math.floor(timeline.totalDurationInFrames / 2), timeline.totalDurationInFrames - 1],
});
