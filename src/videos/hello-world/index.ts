import {defineVideo} from '../../core';
import {HelloWorldReel} from './Reel';

export const helloWorldVideo = defineVideo({
  id: '01-HelloWorldReel',
  slug: 'hello-world',
  component: HelloWorldReel,
  durationInFrames: 150,
  fps: 30,
  width: 1080,
  height: 1920,
  testFrames: [0, 75, 149],
  tags: ['demo', 'stick-figure', 'no-api-key'],
});
