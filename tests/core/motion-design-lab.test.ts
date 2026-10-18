import {describe, expect, it} from 'vitest';
import {planMotionTimeline} from '../../src/core';
import {motionDesignLabVideo} from '../../src/videos/motion-design-lab';
import {BOUNDARIES, MOTION_SHOTS, timeline} from '../../src/videos/motion-design-lab/timeline';

describe('motion design lab integration', () => {
  it('keeps its 36-second vertical manifest tied to the measured timeline', () => {
    expect(motionDesignLabVideo).toMatchObject({
      id: 'MotionDesignLabReel',
      slug: 'motion-design-lab',
      width: 1080,
      height: 1920,
      fps: 30,
      durationInFrames: 1080,
    });
    expect(timeline.totalDurationInFrames).toBe(motionDesignLabVideo.durationInFrames);
  });

  it('demonstrates all four boundary choices without moving voice or shot starts', () => {
    expect(BOUNDARIES.map((boundary) => boundary.type)).toEqual([
      'cut',
      'dissolve',
      'slide',
      'wipe',
    ]);
    const planned = planMotionTimeline(MOTION_SHOTS, BOUNDARIES);
    expect(planned.totalDurationInFrames).toBe(1080);
    expect(planned.shots.map((shot) => shot.from)).toEqual(
      Object.values(timeline.shots).map((shot) => shot.from),
    );
    for (const [id, shot] of Object.entries(timeline.shots)) {
      expect(planned.shots.find((visual) => visual.id === id)?.from).toBe(shot.from);
      expect(shot.duration).toBeGreaterThan(shot.voiceFrom ?? 0);
    }
  });
});
