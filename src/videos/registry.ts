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
import {chungMinhDeLamGiVideo} from './chung-minh-de-lam-gi';
import {tiecNguoiHayNamThangVideo} from './tiec-nguoi-hay-nam-thang';
import {dungBienTuoi30ThanhBanAnReelVideo} from './dung-bien-tuoi-30-thanh-ban-an';
import {lamLaiKhongCoNghiaLaQuayVeSoKhongBanReelVideo} from './lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban';
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
  chungMinhDeLamGiVideo,
  tiecNguoiHayNamThangVideo,
  dungBienTuoi30ThanhBanAnReelVideo,
  lamLaiKhongCoNghiaLaQuayVeSoKhongBanReelVideo,
  // video:new entries -- keep this marker
];

validateVideoRegistry(videoRegistry);
