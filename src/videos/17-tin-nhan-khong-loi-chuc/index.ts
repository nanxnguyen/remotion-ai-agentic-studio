import {defineVideo} from '../../core';
import {SeventeenMessagesReel} from './Reel';
import {DURATION_FRAMES,FPS} from './timeline';

export const seventeenMessagesVideo = defineVideo({
  id:'17-MuoiBayTinNhanReel',
  slug:'17-tin-nhan-khong-loi-chuc',
  component:SeventeenMessagesReel,
  fps:FPS,
  durationInFrames:DURATION_FRAMES,
  width:1080,
  height:1920,
  testFrames:[0,240,855,1380,1800,DURATION_FRAMES-1],
  tags:['story','vietnamese','emotional','ray-emotional-stick-shorts'],
});
