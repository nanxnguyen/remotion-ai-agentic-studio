import {defineSequentialTimeline} from '../../core';

export const timeline = defineSequentialTimeline([
  {id: 'scene01', durationInFrames: 300},
  {id: 'scene02', durationInFrames: 660},
  {id: 'scene03', durationInFrames: 840},
  {id: 'scene04', durationInFrames: 900},
  {id: 'scene05', durationInFrames: 900},
  {id: 'scene06', durationInFrames: 900},
  {id: 'scene07', durationInFrames: 900},
] as const);
