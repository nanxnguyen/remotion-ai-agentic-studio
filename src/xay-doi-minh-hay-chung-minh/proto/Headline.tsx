// Origin: skills/video-shotcraft/demos/typography/paper-title-card/PaperTitleCard.tsx
// (verbatim grammar, re-skinned). Locked params kept:
// word delay = 4 + i*4, 9f, bezier(0.2,0.75,0.3,1), scale 1.28->1, blur 7px->0,
// underline scaleX 16->34f. Re-skin: Bricolage ExtraBold, ink-on-cobalt, accent colors.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {C, F_HEAD} from './tokens';

export type HWord = {text: string; accent?: string; br?: boolean};

export const HeadlinePress: React.FC<{
  lines: HWord[];
  size?: number;
  color?: string;
  underline?: string | null;
  top?: number;
}> = ({lines, size = 88, color = C.lampWhite, underline = null, top = 150}) => {
  const frame = useCurrentFrame();
  const ul = interpolate(frame, [16, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  return (
    <AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center'}}>
      <div style={{marginTop: top, textAlign: 'center', maxWidth: 980}}>
        <div
          style={{
            fontFamily: F_HEAD,
            fontWeight: 800,
            fontSize: size,
            lineHeight: 1.16,
            color,
            letterSpacing: '-0.015em',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            columnGap: '0.24em',
            textShadow: '0 3px 26px rgba(6,8,30,0.55)',
          }}
        >
          {lines.map((w, i) => {
            const delay = 4 + i * 4;
            const t = interpolate(frame, [delay, delay + 9], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.2, 0.75, 0.3, 1),
            });
            return (
              <React.Fragment key={i}>
                <span
                  style={{
                    opacity: t,
                    transform: `scale(${1.28 - 0.28 * t})`,
                    filter: `blur(${(1 - t) * 7}px)`,
                    display: 'inline-block',
                    color: w.accent ?? undefined,
                  }}
                >
                  {w.text}
                </span>
                {w.br && <span style={{flexBasis: '100%', height: 0}} />}
              </React.Fragment>
            );
          })}
        </div>
        {underline && (
          <div
            style={{
              height: 8,
              width: 240,
              margin: '30px auto 0',
              borderRadius: 4,
              background: underline,
              transform: `scaleX(${ul})`,
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};
