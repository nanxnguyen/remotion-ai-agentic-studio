import {defineVideo} from '../../core';
import {BanTinLuc0Gio07Reel} from './Reel';
import {timeline} from './timeline';

export const banTinLuc0Gio07Video = defineVideo({
  id: '19-BanTinLuc0Gio07',
  slug: 'ban-tin-luc-0-gio-07',
  component: BanTinLuc0Gio07Reel,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 59, 180, 420, 720, 1020, timeline.totalDurationInFrames - 1],
});
