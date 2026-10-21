import {describe, expect, it} from 'vitest';
import {parseRenderArgs} from '../../scripts/video-render.mjs';

describe('video render CLI', () => {
  it('preserves the existing default composition', () => {
    expect(parseRenderArgs([]).id).toBe('06-UnderstandAnythingReel');
  });

  it.each([
    ['--id', 'wrong-id'],
    ['--out', 'not-an-mp4.mov'],
    ['--id'],
    ['--unknown'],
    ['--id', 'Video', '--id', 'Other'],
    ['--list', '--id', 'Video'],
  ])('rejects invalid arguments %s', (...args) => {
    expect(() => parseRenderArgs(args)).toThrow();
  });

  it('supports safe dry-run without starting a render', () => {
    expect(parseRenderArgs(['--dry-run']).dryRun).toBe(true);
  });
});
