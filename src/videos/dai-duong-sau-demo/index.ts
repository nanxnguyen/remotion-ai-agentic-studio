import {defineVideo} from '../../core';
import {DaiDuongSauDemoReel} from './Reel';
import {timeline} from './timeline';

export const daiDuongSauDemoReelVideo = defineVideo({
  id: '21-DaiDuongSauDemoReel',
  slug: 'dai-duong-sau-demo',
  component: DaiDuongSauDemoReel,
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
