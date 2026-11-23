import {describe, expect, it} from 'vitest';
import {daiDuongSauThucTeReelVideo} from '../../src/videos/dai-duong-sau-thuc-te';
import {timeline} from '../../src/videos/dai-duong-sau-thuc-te/timeline';

describe('dai-duong-sau-thuc-te composition', () => {
  it('uses 9:16 1080x1920 at 30fps with 65s sequential timeline', () => {
    expect(daiDuongSauThucTeReelVideo.width).toBe(1080);
    expect(daiDuongSauThucTeReelVideo.height).toBe(1920);
    expect(daiDuongSauThucTeReelVideo.fps).toBe(30);
    expect(timeline.totalDurationInFrames).toBe(1950);
    expect(timeline.shots.scene01.from).toBe(0);
    expect(timeline.shots.scene05.from + timeline.shots.scene05.duration).toBe(1950);
  });
});
