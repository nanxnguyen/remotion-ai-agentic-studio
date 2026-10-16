import {defineVideo} from '../../core';
import {EditorialQuoteReel} from './Reel';

export const editorialQuoteVideo = defineVideo({
  id: 'EditorialQuoteReel',
  slug: 'editorial-quote',
  component: EditorialQuoteReel,
  durationInFrames: 120,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 60, 119],
  tags: ['demo', 'editorial', 'no-api-key'],
});
