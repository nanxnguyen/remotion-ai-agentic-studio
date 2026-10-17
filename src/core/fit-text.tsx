import {fitText, fitTextOnNLines} from '@remotion/layout-utils';
import React from 'react';

export type FitTextOptions = Readonly<{
  text: string;
  maxWidth: number;
  maxLines?: number;
  fontFamily: string;
  fontWeight?: number | string;
  letterSpacing?: string;
  minFontSize: number;
  maxFontSize: number;
}>;

export type FitTextResult = Readonly<{
  fontSize: number;
  lines: readonly string[];
  overflow: boolean;
}>;

type MeasureRequest = Readonly<{
  text: string;
  maxWidth: number;
  maxLines: number;
  fontFamily: string;
  fontWeight?: number | string;
  letterSpacing?: string;
  maxFontSize: number;
}>;

export type TextMeasurer = (request: MeasureRequest) => {fontSize: number; lines: string[]};

// Browser measurement via @remotion/layout-utils; it throws if the font is not loaded yet,
// which is what we want: a size measured on a fallback font would clip Vietnamese diacritics.
const measureInBrowser: TextMeasurer = ({maxLines, maxWidth, maxFontSize, ...font}) => {
  if (maxLines === 1) {
    return {fontSize: fitText({...font, withinWidth: maxWidth}).fontSize, lines: [font.text]};
  }
  return fitTextOnNLines({...font, maxLines, maxBoxWidth: maxWidth, maxFontSize});
};

export const fitFontSize = (
  {maxLines = 1, minFontSize, maxFontSize, ...rest}: FitTextOptions,
  measure: TextMeasurer = measureInBrowser,
): FitTextResult => {
  if (!rest.text.trim()) throw new Error('fitFontSize needs non-empty text');
  if (!(rest.maxWidth > 0)) throw new Error('maxWidth must be positive');
  if (!(minFontSize > 0) || minFontSize > maxFontSize) {
    throw new Error('font sizes must satisfy 0 < minFontSize <= maxFontSize');
  }
  if (!Number.isInteger(maxLines) || maxLines < 1)
    throw new Error('maxLines must be an integer >= 1');
  const measured = measure({...rest, maxLines, maxFontSize});
  const overflow = measured.fontSize < minFontSize;
  return Object.freeze({
    fontSize: overflow ? minFontSize : Math.min(measured.fontSize, maxFontSize),
    lines: Object.freeze([...measured.lines]),
    overflow,
  });
};

export type FitTextProps = FitTextOptions &
  Readonly<{
    // Vietnamese stacks diacritics above and below; 1.25 keeps them inside the line box.
    lineHeight?: number;
    style?: React.CSSProperties;
  }>;

export const FitText: React.FC<FitTextProps> = ({lineHeight = 1.25, style, ...options}) => {
  const {fontSize, lines, overflow} = fitFontSize(options);
  if (overflow) {
    // Surfaces in render logs so QA can route the shot back instead of shipping clipped text.
    console.warn(`FitText overflow at ${options.minFontSize}px: "${options.text}"`);
  }
  return (
    <div
      style={{
        ...style,
        fontFamily: options.fontFamily,
        fontWeight: options.fontWeight,
        letterSpacing: options.letterSpacing,
        fontSize,
        lineHeight,
        maxWidth: options.maxWidth,
      }}
    >
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {index > 0 ? <br /> : null}
          {line}
        </React.Fragment>
      ))}
    </div>
  );
};
