import {defineSequentialTimeline} from '../../core';

export const FPS = 30;

export const timeline = defineSequentialTimeline([
  {id: 'scene01', durationInFrames: 90}, // 0-3s: Hook (0m)
  {id: 'scene02', durationInFrames: 180}, // 3-9s: Mat bien -> 100m
  {id: 'scene03', durationInFrames: 210}, // 9-16s: 332m (Deepest scuba + Shark/Orca)
  {id: 'scene04', durationInFrames: 210}, // 16-23s: 632m (Giant Spider Crab)
  {id: 'scene05', durationInFrames: 210}, // 23-30s: 1000m (No light X + Goblin Shark)
] as const);
