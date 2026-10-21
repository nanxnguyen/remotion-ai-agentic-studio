import {defineVideo} from '../../core';
import {BanKhongCanTroThanhAiKhacDeDuocYeuReel} from './Reel';
import {TOTAL_FRAMES} from './timeline';
export const banKhongCanTroThanhAiKhacDeDuocYeuVideo = defineVideo({
  id: '13-BanKhongCanTroThanhAiKhacDeDuocYeuReel',
  slug: 'ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu',
  component: BanKhongCanTroThanhAiKhacDeDuocYeuReel,
  durationInFrames: TOTAL_FRAMES,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, Math.floor(TOTAL_FRAMES / 2), TOTAL_FRAMES - 1],
  tags: ['story', 'vietnamese', 'prebuild'],
});
