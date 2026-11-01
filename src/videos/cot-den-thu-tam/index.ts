import {defineVideo} from '../../core';
import {CotDenThuTamReel} from './Reel';
import {timeline} from './timeline';

export const cotDenThuTamVideo = defineVideo({
  id: '21-CotDenThuTam',
  slug: 'cot-den-thu-tam',
  component: CotDenThuTamReel,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 59, 180, 420, 720, 1020, timeline.totalDurationInFrames - 1],
});
