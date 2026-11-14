import {defineVideo} from '../../core';
import {ThangMayTang13Reel} from './Reel';
import {timeline} from './timeline';

export const thangMayTang13ReelVideo = defineVideo({
  id: '17-ThangMayTang13Reel',
  slug: 'thang-may-tang-13',
  component: ThangMayTang13Reel,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, Math.floor(timeline.totalDurationInFrames / 2), timeline.totalDurationInFrames - 1],
});
