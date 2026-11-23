import { describe, expect, it } from 'vitest';
import { contrast, generateTheme, THEMES } from './lch';

describe('theme LCH', () => {
  for (const [name, input] of Object.entries(THEMES)) {
    it(`${name}: chữ đạt AA`, () => {
      const t = generateTheme(input);
      for (const bg of [t.bg, t.surface, t.surface2]) {
        expect(contrast(t.ink, bg), `ink trên ${bg}`).toBeGreaterThanOrEqual(7);
        expect(contrast(t.muted, bg), `muted trên ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
      for (const k of ['run', 'need', 'err', 'ok', 'pend'] as const) {
        expect(contrast(t[k], t.surface), `${k}`).toBeGreaterThanOrEqual(3);
      }
      expect(contrast(t.accentInk, t.accent)).toBeGreaterThanOrEqual(4.5);
    });
  }
});
