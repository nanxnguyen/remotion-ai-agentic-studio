import type {AnyVideoDefinition} from '../core';
import {validateVideoRegistry} from '../core';
import {camOnVideo} from './cam-on';
import {cuocGoiNhoVideo} from './cuoc-goi-nho';
import {editorialQuoteVideo} from './editorial-quote';
import {helloWorldVideo} from './hello-world';
import {metKhongVideo} from './met-khong';
import {thuongHaySoVideo} from './thuong-hay-so';
import {understandAnythingVideo} from './understand-anything';
import {xayDoiMinhVideo} from './xay-doi-minh-hay-chung-minh';
import {chungMinhDeLamGiVideo} from './chung-minh-de-lam-gi';
import {tiecNguoiHayNamThangVideo} from './tiec-nguoi-hay-nam-thang';
import {dungBienTuoi30ThanhBanAnReelVideo} from './dung-bien-tuoi-30-thanh-ban-an';
import {lamLaiKhongCoNghiaLaQuayVeSoKhongBanReelVideo} from './lam-lai-khong-co-nghia-la-quay-ve-so-khong-ban';
import {banKhongCanTroThanhAiKhacDeDuocYeuVideo} from './ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu';
import {banKhongYeuDuoiReelVideo} from './ban-khong-yeu-duoi-chi-da-manh-qua-lau';
import {khoangTrongTrongBucTranhVideo} from './khoang-trong-trong-buc-tranh';
import {soNoiKhongVideo} from './so-bi-xem-la-ich-ky-khi-noi-khong';
import {giayThu61V2Video} from './giay-thu-61-v2';
// video:new imports -- keep this marker

export const videoRegistry: readonly AnyVideoDefinition[] = [
  helloWorldVideo,
  editorialQuoteVideo,
  camOnVideo,
  metKhongVideo,
  cuocGoiNhoVideo,
  understandAnythingVideo,
  thuongHaySoVideo,
  xayDoiMinhVideo,
  chungMinhDeLamGiVideo,
  tiecNguoiHayNamThangVideo,
  dungBienTuoi30ThanhBanAnReelVideo,
  lamLaiKhongCoNghiaLaQuayVeSoKhongBanReelVideo,
  banKhongCanTroThanhAiKhacDeDuocYeuVideo,
  banKhongYeuDuoiReelVideo,
  khoangTrongTrongBucTranhVideo,
  soNoiKhongVideo,
    giayThu61V2Video,
  // video:new entries -- keep this marker
];

validateVideoRegistry(videoRegistry);
