import {defineVideo} from '../../core';
import {HieuUngConNhimReel} from './Reel';
import {timeline} from './timeline';

export const hieuUngConNhimReelVideo = defineVideo({
  id: '18-HieuUngConNhimReel',
  slug: 'hieu-ung-con-nhim',
  component: HieuUngConNhimReel,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, Math.floor(timeline.totalDurationInFrames / 2), timeline.totalDurationInFrames - 1],
});
