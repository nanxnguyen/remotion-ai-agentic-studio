import {defineVideo} from '../../core';
import {TruongThanhReel} from '../../TruongThanh';
import {TT_TOTAL} from '../../truongThanhTimeline';

export const truongThanhVideo = defineVideo({
  id: 'TruongThanhReel',
  slug: 'truong-thanh',
  component: TruongThanhReel,
  durationInFrames: TT_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  defaultProps: {withBgm: true},
  testFrames: [0, 806, 1612],
  tags: ['story', 'vietnamese'],
});
