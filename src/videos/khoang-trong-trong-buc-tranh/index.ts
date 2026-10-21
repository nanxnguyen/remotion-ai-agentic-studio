import {defineVideo} from '../../core';
import {KhoangTrongTrongBucTranhReel} from './Reel';
import {KTT_TOTAL} from './timeline';

export const khoangTrongTrongBucTranhVideo = defineVideo({
  id: '15-KhoangTrongTrongBucTranhReel',
  slug: 'khoang-trong-trong-buc-tranh',
  component: KhoangTrongTrongBucTranhReel,
  durationInFrames: KTT_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, Math.floor(KTT_TOTAL / 2), KTT_TOTAL - 1],
  tags: ['story', 'vietnamese', 'drama', 'family'],
});
