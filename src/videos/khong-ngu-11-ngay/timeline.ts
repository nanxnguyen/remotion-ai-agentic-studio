import {defineSequentialTimeline} from '../../core';
import {VOICE_SECONDS} from './voice-durations';

const FPS = 30;
const PAD_FRAMES = 14;
const framesFor = (sec: number) => Math.ceil(sec * FPS) + PAD_FRAMES;

export const timeline = defineSequentialTimeline([
  {id: 'scene01', durationInFrames: framesFor(VOICE_SECONDS.s1)},
  {id: 'scene02', durationInFrames: framesFor(VOICE_SECONDS.s2)},
  {id: 'scene03', durationInFrames: framesFor(VOICE_SECONDS.s3)},
  {id: 'scene04', durationInFrames: framesFor(VOICE_SECONDS.s4)},
  {id: 'scene05', durationInFrames: framesFor(VOICE_SECONDS.s5)},
  {id: 'scene06', durationInFrames: framesFor(VOICE_SECONDS.s6)},
  {id: 'scene07', durationInFrames: framesFor(VOICE_SECONDS.s7)},
  {id: 'scene08', durationInFrames: framesFor(VOICE_SECONDS.s8)},
  {id: 'scene09', durationInFrames: framesFor(VOICE_SECONDS.s9)},
  {id: 'scene10', durationInFrames: framesFor(VOICE_SECONDS.s10)},
  {id: 'scene11', durationInFrames: framesFor(VOICE_SECONDS.s11)},
  {id: 'scene12', durationInFrames: framesFor(VOICE_SECONDS.s12)},
  {id: 'scene13', durationInFrames: framesFor(VOICE_SECONDS.s13)},
  {id: 'scene14', durationInFrames: framesFor(VOICE_SECONDS.s14)},
] as const);
