import {defineSequentialTimeline} from '../../core';

export const timeline = defineSequentialTimeline([
  {id: 'scene01', durationInFrames: 90},
  {id: 'scene02', durationInFrames: 90},
  {id: 'scene03', durationInFrames: 90},
  {id: 'scene04', durationInFrames: 90},
  {id: 'scene05', durationInFrames: 90},
] as const);
