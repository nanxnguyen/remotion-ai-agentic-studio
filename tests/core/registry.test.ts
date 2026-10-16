import {describe, expect, it} from 'vitest';
import {videoRegistry} from '../../src/videos/registry';

describe('videoRegistry', () => {
  it('preserves the seven published compositions and their metadata', () => {
    expect(
      videoRegistry.map(({id, durationInFrames, fps, width, height}) => ({
        id,
        durationInFrames,
        fps,
        width,
        height,
      })),
    ).toEqual([
      {id: 'TruongThanhReel', durationInFrames: 1613, fps: 30, width: 1080, height: 1920},
      {id: 'CamonReel', durationInFrames: 1521, fps: 30, width: 1080, height: 1920},
      {id: 'GaplaiReel', durationInFrames: 1518, fps: 30, width: 1080, height: 1920},
      {id: 'MetkhongReel', durationInFrames: 1531, fps: 30, width: 1080, height: 1920},
      {id: 'CuocGoiNhoReel', durationInFrames: 1419, fps: 30, width: 1080, height: 1920},
      {id: 'UnderstandAnythingReel', durationInFrames: 1290, fps: 30, width: 1080, height: 1920},
      {id: 'ThuongHaySoReel', durationInFrames: 1769, fps: 30, width: 1080, height: 1920},
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
