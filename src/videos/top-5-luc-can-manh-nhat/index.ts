import {defineVideo} from '../../core';
import {Top5LucCanManhNhatVideo} from './Reel';
import {timeline} from './timeline';

export const top5LucCanManhNhatVideoVideo = defineVideo({
  id: '19-Top5LucCanManhNhatVideo',
  slug: 'top-5-luc-can-manh-nhat',
  component: Top5LucCanManhNhatVideo,
  durationInFrames: timeline.totalDurationInFrames,
  fps: 30,
  width: 1920,
  height: 1080,
  testFrames: [
    0,
    Math.floor(timeline.totalDurationInFrames / 2),
    timeline.totalDurationInFrames - 1,
  ],
});
