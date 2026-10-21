import {defineVideo} from '../../core';
import {BanKhongYeuDuoiReel} from './Reel';
import {timeline} from './timeline';

export const banKhongYeuDuoiReelVideo = defineVideo({
  id: '14-BanKhongYeuDuoiReel',
  slug: 'ban-khong-yeu-duoi-chi-da-manh-qua-lau',
  component: BanKhongYeuDuoiReel,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [
    0,
    Math.floor(timeline.totalDurationInFrames / 2),
    timeline.totalDurationInFrames - 1,
  ],
});
