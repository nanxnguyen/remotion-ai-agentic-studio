import {describe, expect, it} from 'vitest';
import {videoRegistry} from '../../src/videos/registry';

describe('videoRegistry', () => {
  it('preserves the published compositions and their metadata', () => {
    expect(
      videoRegistry
        .filter((video) => !video.tags?.includes('demo'))
        .map(({id, durationInFrames, fps, width, height}) => ({
          id,
          durationInFrames,
          fps,
          width,
          height,
        })),
    ).toEqual([
      {id: 'CamonReel', durationInFrames: 1521, fps: 30, width: 1080, height: 1920},
      {id: 'MetkhongReel', durationInFrames: 1531, fps: 30, width: 1080, height: 1920},
      {id: 'CuocGoiNhoReel', durationInFrames: 1308, fps: 30, width: 1080, height: 1920},
      {id: 'UnderstandAnythingReel', durationInFrames: 1290, fps: 30, width: 1080, height: 1920},
      {id: 'ThuongHaySoReel', durationInFrames: 1769, fps: 30, width: 1080, height: 1920},
      {id: 'XayDoiMinhReel', durationInFrames: 1776, fps: 30, width: 1080, height: 1920},
      {id: 'ChungMinhDeLamGiReel', durationInFrames: 1728, fps: 30, width: 1080, height: 1920},
      {id: 'TiecNguoiHayNamThangReel', durationInFrames: 1422, fps: 30, width: 1080, height: 1920},
      {
        id: 'DungBienTuoi30ThanhBanAnReel',
        durationInFrames: 1549,
        fps: 30,
        width: 1080,
        height: 1920,
      },
      {
        id: 'LamLaiKhongCoNghiaLaQuayVeSoKhongBanReel',
        durationInFrames: 875,
        fps: 30,
        width: 1080,
        height: 1920,
      },
      {
        id: 'BanKhongCanTroThanhAiKhacDeDuocYeuReel',
        durationInFrames: 1767,
        fps: 30,
        width: 1080,
        height: 1920,
      },
      {id: 'BanKhongYeuDuoiReel', durationInFrames: 720, fps: 30, width: 1080, height: 1920},
      {id: 'KhoangTrongTrongBucTranhReel', durationInFrames: 1542, fps: 30, width: 1080, height: 1920},
    ]);
  });

  it('uses valid baseline frames for every composition', () => {
    for (const video of videoRegistry) {
      expect(video.testFrames.length).toBeGreaterThanOrEqual(3);
      expect(video.testFrames[0]).toBe(0);
      expect(video.testFrames.at(-1)).toBe(video.durationInFrames - 1);
    }
  });
});
