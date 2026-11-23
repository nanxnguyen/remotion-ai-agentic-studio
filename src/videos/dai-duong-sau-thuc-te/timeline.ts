import {defineSequentialTimeline} from '../../core';

export const timeline = defineSequentialTimeline([
  {id: 'scene01', durationInFrames: 150},
  {id: 'scene02', durationInFrames: 390},
  {id: 'scene03', durationInFrames: 450},
  {id: 'scene04', durationInFrames: 480},
  {id: 'scene05', durationInFrames: 480},
] as const);
