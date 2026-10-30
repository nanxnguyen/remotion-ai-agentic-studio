import {defineVideo} from '../../core';
import {GiayThu61V2Reel} from './Reel';
import {FPS,TOTAL_FRAMES} from './timeline';

export const giayThu61V2Video = defineVideo({
  id:'GiayThu61V2Cinematic',
  slug:'giay-thu-61-v2',
  component:GiayThu61V2Reel,
  durationInFrames:TOTAL_FRAMES,
  fps:FPS,
  width:1920,
  height:1080,
  testFrames:[0,12*FPS,61*FPS,83*FPS,103*FPS,130*FPS,134*FPS],
  tags:['story','vietnamese','horror','cinematic','16:9'],
});
