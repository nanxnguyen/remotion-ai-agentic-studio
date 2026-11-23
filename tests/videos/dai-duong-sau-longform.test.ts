import {describe, expect, it} from 'vitest';
import {daiDuongSauLongformVideoVideo} from '../../src/videos/dai-duong-sau-longform';
import {timeline} from '../../src/videos/dai-duong-sau-longform/timeline';

describe('dai-duong-sau-longform composition', () => {
  it('uses 16:9 1920x1080 at 30fps with 180s sequential timeline', () => {
    expect(daiDuongSauLongformVideoVideo.width).toBe(1920);
    expect(daiDuongSauLongformVideoVideo.height).toBe(1080);
    expect(daiDuongSauLongformVideoVideo.fps).toBe(30);
    expect(timeline.totalDurationInFrames).toBe(5400);
    expect(timeline.shots.scene01.from).toBe(0);
    expect(timeline.shots.scene07.from + timeline.shots.scene07.duration).toBe(5400);
  });
});
