import {describe, expect, it} from 'vitest';
import {EASE, crossfadeShots, mix, ramp, riseStyle, velocity} from '../../src/core/motion';

describe('ramp', () => {
  it('clamps before start and after end', () => {
    expect(ramp(-5, 0, 10)).toBe(0);
    expect(ramp(0, 0, 10)).toBe(0);
    expect(ramp(10, 0, 10)).toBe(1);
    expect(ramp(99, 0, 10)).toBe(1);
  });

  it('eases out by default (ahead of linear at midpoint)', () => {
    expect(ramp(5, 0, 10)).toBeGreaterThan(0.5);
    expect(ramp(5, 0, 10, EASE.linear)).toBeCloseTo(0.5);
  });

  it('is symmetric for smooth', () => {
    expect(ramp(5, 0, 10, EASE.smooth)).toBeCloseTo(0.5, 5);
  });

  it('treats zero duration as an instant step', () => {
    expect(ramp(4, 5, 0)).toBe(0);
    expect(ramp(5, 5, 0)).toBe(1);
  });
});

describe('mix / velocity', () => {
  it('interpolates without clamping', () => {
    expect(mix(10, 20, 0.5)).toBe(15);
    expect(mix(10, 20, 1.1)).toBeCloseTo(21);
  });

  it('measures per-frame speed by central difference', () => {
    expect(velocity((f) => f * 12, 7)).toBeCloseTo(12);
  });
});

describe('riseStyle', () => {
  it('starts hidden, lowered and blurred; settles fully', () => {
    const start = riseStyle(0);
    expect(start.opacity).toBe(0);
    expect(start.transform).toBe('translateY(28px)');
    expect(start.filter).toBe('blur(8px)');
    const end = riseStyle(40);
    expect(end).toEqual({opacity: 1, transform: 'translateY(0px)', filter: 'none'});
  });

  it('honours delay', () => {
    expect(riseStyle(10, {delay: 10}).opacity).toBe(0);
  });
});

describe('crossfadeShots', () => {
  const shots = {
    s1: {from: 0, duration: 90},
    s2: {from: 90, duration: 60},
    s3: {from: 150, duration: 30},
  };

  it('extends every shot except the last so the next one dissolves over it', () => {
    expect(crossfadeShots(shots, 10)).toEqual([
      {id: 's1', from: 0, durationInFrames: 100, fadeIn: 0},
      {id: 's2', from: 90, durationInFrames: 70, fadeIn: 10},
      {id: 's3', from: 150, durationInFrames: 30, fadeIn: 10},
    ]);
  });

  it('keeps total length and shot starts (voice stays in sync)', () => {
    const out = crossfadeShots(shots, 10);
    const last = out[out.length - 1];
    expect(last.from + last.durationInFrames).toBe(180);
    expect(out.map((s) => s.from)).toEqual([0, 90, 150]);
  });

  it('rejects negative or fractional overlap and overlap longer than a shot', () => {
    expect(() => crossfadeShots(shots, -1)).toThrow();
    expect(() => crossfadeShots(shots, 2.5)).toThrow();
    expect(() => crossfadeShots(shots, 31)).toThrow();
  });
});
