import {defineVideo} from '../../core';
import {LamLaiKhongCoNghiaLaQuayVeSoKhongBanReel} from './Reel';
import {timeline} from './timeline';

export const lamLaiKhongCoNghiaLaQuayVeSoKhongBanReelVideo = defineVideo({
  id: '12-LamLaiKhongCoNghiaLaQuayVeSoKhongBanReel',
  slug: 'lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban',
  component: LamLaiKhongCoNghiaLaQuayVeSoKhongBanReel,
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
