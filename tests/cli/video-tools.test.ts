import {describe, expect, it} from 'vitest';
import {commandForRender, parseRenderArgs} from '../../scripts/video-render.mjs';

describe('video render CLI', () => {
  it('preserves the existing default composition', () => {
    expect(parseRenderArgs([]).id).toBe('UnderstandAnythingReel');
  });

  it('supports explicit composition and output', () => {
    const options = parseRenderArgs(['--id', 'TruongThanhReel', '--out', 'out/custom.mp4']);
    expect(commandForRender(options, '/repo').args).toEqual([
      'render',
      'src/index.ts',
      'TruongThanhReel',
      'out/custom.mp4',
      '--codec',
      'h264',
      '--crf',
      '18',
      '--pixel-format',
      'yuv420p',
    ]);
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
