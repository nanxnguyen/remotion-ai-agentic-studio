import {defineVideo} from '../../core';
import {DaiDuongSauLongformVideo} from './Reel';
import {timeline} from './timeline';

export const daiDuongSauLongformVideoVideo = defineVideo({
  id: 'DaiDuongSauLongformVideo',
  slug: 'dai-duong-sau-longform',
  component: DaiDuongSauLongformVideo,
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
