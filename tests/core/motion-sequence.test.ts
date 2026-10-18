import {describe, expect, it} from 'vitest';
import {
  planMotionTimeline,
  motionProgress,
  staggerFrame,
  panZoomStyle,
  parallaxOffset,
  entranceExitStyle,
} from '../../src/core/motion-sequence';

const shots = [
  {id: 'a', from: 0, duration: 90},
  {id: 'b', from: 90, duration: 60},
  {id: 'c', from: 150, duration: 90},
] as const;
const dissolve = {
  fromShot: 'a',
  toShot: 'b',
  type: 'dissolve',
  durationInFrames: 12,
  timing: {type: 'easing', ease: 'smooth'},
} as const;

describe('measured motion timeline', () => {
  it('compensates official TransitionSeries overlaps without moving measured starts or end', () => {
    const plan = planMotionTimeline(shots, [dissolve]);
    expect(plan.shots.map((s) => [s.from, s.duration, s.visualDurationInFrames])).toEqual([
      [0, 90, 102],
      [90, 60, 60],
      [150, 90, 90],
    ]);
    expect(plan.totalDurationInFrames).toBe(240);
    expect(plan.shots.reduce((n, s) => n + s.visualDurationInFrames, 0) - 12).toBe(240);
  });
  it('keeps a single shot and zero cut unchanged', () => {
    expect(planMotionTimeline([shots[0]], []).totalDurationInFrames).toBe(90);
    expect(
      planMotionTimeline(shots, [{...dissolve, type: 'cut', durationInFrames: 0}]).shots[0]
        .visualDurationInFrames,
    ).toBe(90);
  });
  it('rejects unknown IDs, nonadjacent and duplicate boundaries', () => {
    expect(() => planMotionTimeline(shots, [{...dissolve, toShot: 'z'}])).toThrow();
    expect(() => planMotionTimeline(shots, [{...dissolve, toShot: 'c'}])).toThrow();
    expect(() => planMotionTimeline(shots, [dissolve, dissolve])).toThrow();
  });
  it('rejects invalid and noncontiguous shot spans', () => {
    expect(() => planMotionTimeline([], [])).toThrow();
    expect(() => planMotionTimeline([{...shots[0], from: 1}], [])).toThrow();
    expect(() => planMotionTimeline([shots[0], {...shots[1], from: 91}], [])).toThrow();
    expect(() => planMotionTimeline([{...shots[0], duration: 0}], [])).toThrow();
    expect(() => planMotionTimeline([shots[0], {...shots[1], id: 'a'}], [])).toThrow();
  });
  it.each([-1, 1.5, NaN, 0, 61])(
    'rejects non-cut overlap %s beyond either adjacent shot',
    (durationInFrames) => {
      expect(() => planMotionTimeline(shots, [{...dissolve, durationInFrames}])).toThrow();
    },
  );
  it('rejects nonzero cuts and conflicting incoming/outgoing transitions', () => {
    expect(() => planMotionTimeline(shots, [{...dissolve, type: 'cut'}])).toThrow();
    expect(() =>
      planMotionTimeline(shots, [
        {...dissolve, durationInFrames: 40},
        {...dissolve, fromShot: 'b', toShot: 'c', durationInFrames: 30},
      ]),
    ).toThrow();
  });
});

describe('scene motion', () => {
  it('is frame-driven, clamped and deterministic for easing and spring', () => {
    const cue = {from: 10, durationInFrames: 20, timing: {type: 'easing', ease: 'linear'}} as const;
    expect(motionProgress(0, 30, cue)).toBe(0);
    expect(motionProgress(20, 30, cue)).toBe(0.5);
    expect(motionProgress(40, 30, cue)).toBe(1);
    const spring = {...cue, timing: {type: 'spring'}} as const;
    expect(motionProgress(20, 30, spring)).toBe(motionProgress(20, 30, spring));
    expect(staggerFrame(20, 2, 4)).toBe(12);
  });
  it('provides style-free camera and depth motion', () => {
    expect(parallaxOffset(100, 0.2)).toBe(20);
    expect(panZoomStyle(0.5, {x: 0, y: 0, scale: 1}, {x: 100, y: 20, scale: 2}).transform).toBe(
      'translate(50px, 10px) scale(1.5)',
    );
    expect(entranceExitStyle(0, 30, {enter: {from: 0, durationInFrames: 10}}).opacity).toBe(0);
  });
});
