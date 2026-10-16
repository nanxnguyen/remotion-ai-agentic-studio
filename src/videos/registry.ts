import type {AnyVideoDefinition} from '../core';
import {validateVideoRegistry} from '../core';
import {camOnVideo} from './cam-on';
import {cuocGoiNhoVideo} from './cuoc-goi-nho';
import {gapLaiVideo} from './gap-lai';
import {metKhongVideo} from './met-khong';
import {thuongHaySoVideo} from './thuong-hay-so';
import {truongThanhVideo} from './truong-thanh';
import {understandAnythingVideo} from './understand-anything';
import {xayDoiMinhVideo} from './xay-doi-minh-hay-chung-minh';
// video:new imports -- keep this marker

export const videoRegistry: readonly AnyVideoDefinition[] = [
  truongThanhVideo,
  camOnVideo,
  gapLaiVideo,
  metKhongVideo,
  cuocGoiNhoVideo,
  understandAnythingVideo,
  thuongHaySoVideo,
  xayDoiMinhVideo,
  // video:new entries -- keep this marker
];

validateVideoRegistry(videoRegistry);
