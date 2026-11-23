import {defineVideo} from '../../core';
import {DaiDuongSauThucTeReel} from './Reel';
import {timeline} from './timeline';

export const daiDuongSauThucTeReelVideo = defineVideo({
  id: '22-DaiDuongSauThucTeReel',
  slug: 'dai-duong-sau-thuc-te',
  component: DaiDuongSauThucTeReel,
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
