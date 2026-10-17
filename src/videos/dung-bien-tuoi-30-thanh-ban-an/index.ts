import {defineVideo} from '../../core';
import {DungBienTuoi30ThanhBanAnReel} from './Reel';
import {timeline} from './timeline';

export const dungBienTuoi30ThanhBanAnReelVideo = defineVideo({
  id: 'DungBienTuoi30ThanhBanAnReel',
  slug: 'dung-bien-tuoi-30-thanh-ban-an',
  component: DungBienTuoi30ThanhBanAnReel,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, Math.floor(timeline.totalDurationInFrames / 2), timeline.totalDurationInFrames - 1],
});
