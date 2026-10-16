import type {AnyVideoDefinition} from '../core';
import {validateVideoRegistry} from '../core';
import {camOnVideo} from './cam-on';
import {cuocGoiNhoVideo} from './cuoc-goi-nho';
import {editorialQuoteVideo} from './editorial-quote';
import {gapLaiVideo} from './gap-lai';
import {helloWorldVideo} from './hello-world';
import {metKhongVideo} from './met-khong';
import {thuongHaySoVideo} from './thuong-hay-so';
import {truongThanhVideo} from './truong-thanh';
import {understandAnythingVideo} from './understand-anything';
import {xayDoiMinhVideo} from './xay-doi-minh-hay-chung-minh';
import {tiecNguoiHayNamThangVideo} from './tiec-nguoi-hay-nam-thang';
// video:new imports -- keep this marker

export const videoRegistry: readonly AnyVideoDefinition[] = [
  helloWorldVideo,
  editorialQuoteVideo,
  truongThanhVideo,
  camOnVideo,
  gapLaiVideo,
  metKhongVideo,
  cuocGoiNhoVideo,
  understandAnythingVideo,
  thuongHaySoVideo,
  xayDoiMinhVideo,
  tiecNguoiHayNamThangVideo,
  // video:new entries -- keep this marker
];

validateVideoRegistry(videoRegistry);
