import {describe, expect, it} from 'vitest';
import {fitFontSize} from '../../src/core/fit-text';

const base = {
  text: 'Người từng xem thường bạn có thể đã quên.',
  maxWidth: 900,
  fontFamily: 'Archivo',
  minFontSize: 40,
  maxFontSize: 96,
} as const;

describe('fitFontSize', () => {
  it('caps a short line at maxFontSize instead of filling the whole width', () => {
    const result = fitFontSize(base, () => ({fontSize: 180, lines: [base.text]}));
    expect(result).toEqual({fontSize: 96, lines: [base.text], overflow: false});
  });

  it('keeps the measured size when it is inside the range', () => {
    const lines = ['Người từng xem thường bạn', 'có thể đã quên.'];
    const result = fitFontSize({...base, maxLines: 2}, () => ({fontSize: 58.4, lines}));
    expect(result).toEqual({fontSize: 58.4, lines, overflow: false});
  });

  it('flags overflow and holds minFontSize when the text cannot fit', () => {
    const result = fitFontSize(base, () => ({fontSize: 22, lines: [base.text]}));
    expect(result.fontSize).toBe(40);
    expect(result.overflow).toBe(true);
  });

  it('passes the line budget and max size to the measurer', () => {
    const seen: unknown[] = [];
    fitFontSize({...base, maxLines: 3, fontWeight: 800}, (options) => {
      seen.push(options);
      return {fontSize: 50, lines: ['a']};
    });
    expect(seen[0]).toMatchObject({maxLines: 3, maxWidth: 900, maxFontSize: 96, fontWeight: 800});
  });

  it.each([
    ['empty text', {text: ''}],
    ['non-positive width', {maxWidth: 0}],
    ['min above max', {minFontSize: 100}],
    ['fractional line budget', {maxLines: 1.5}],
  ])('rejects %s', (_label, override) => {
    expect(() =>
      fitFontSize({...base, ...override}, () => ({fontSize: 50, lines: ['a']})),
    ).toThrow();
  });
});
