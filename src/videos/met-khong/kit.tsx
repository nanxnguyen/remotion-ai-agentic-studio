import React from 'react';
import {Sequence, interpolate, useCurrentFrame} from 'remotion';
import {clamp, soft} from '../../stick';
import {MET_VOICE_OFFSET} from './timeline';

// metkhong shared kit (v2 upgrade). Palette: "chung cu khuya xam lanh + mot bong den am".
export const BG = '#141A24';
export const WALL = '#1E2633';
export const GRAY = '#9AA3B2';
export const CREAM = '#F3EDE2';
export const LAMP = '#FFC46B';
export const INK = '#0C1017';
export const FONT = "'Be Vietnam Pro','Inter',sans-serif";
export const SERIF = "'DM Serif Display',serif";
export const VO = MET_VOICE_OFFSET;

export const ramp = (f: number, a: number, len = 6) =>
  interpolate(f, [a, a + len], [0, 1], {...clamp, easing: soft});

// Char-proportional caption timing from measured voice seconds.
export const starts = (parts: string[], sec: number) => {
  const total = parts.join('').length;
  let acc = 0;
  return parts.map((t) => {
    const s = VO + Math.round((acc / total) * sec * 30);
    acc += t.length;
    return s;
  });
};

export const MetFonts: React.FC = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600&family=DM+Serif+Display&display=swap');`}</style>
);

// Caption: bottom 260 (clear of 210px safe zone), max 2 lines, centered.
export const MetLine: React.FC<{text: string; accent?: string; size?: number}> = ({
  text,
  accent,
  size = 56,
}) => {
  const f = useCurrentFrame();
  const parts = accent ? text.split(accent) : [text];
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 260,
        display: 'flex',
        justifyContent: 'center',
        opacity: interpolate(f, [0, 9], [0, 1], clamp),
        transform: `translateY(${interpolate(f, [0, 12], [16, 0], {...clamp, easing: soft})}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 952,
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1.45,
          textAlign: 'center',
          color: CREAM,
          padding: '22px 30px 26px',
          borderRadius: 26,
          background: 'rgba(8,11,17,.66)',
          border: '1px solid rgba(243,237,226,.12)',
          textShadow: '0 2px 14px rgba(0,0,0,.9)',
          textWrap: 'balance' as const,
        }}
      >
        {accent && parts.length === 2 ? (
          <>
            {parts[0]}
            <span style={{color: LAMP}}>{accent}</span>
            {parts[1]}
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

export const MetCaps: React.FC<{
  sec: number;
  duration: number;
  parts: string[];
  accents?: string[];
}> = ({sec, duration, parts, accents = []}) => {
  const froms = starts(parts, sec);
  return (
    <>
      {parts.map((t, i) => {
        const from = froms[i];
        const end = i === parts.length - 1 ? duration : froms[i + 1];
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(12, end - from)}>
            <MetLine text={t} accent={accents[i]} />
          </Sequence>
        );
      })}
    </>
  );
};

export const MinhHoa: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 120,
      right: 70,
      fontFamily: FONT,
      fontSize: 28,
      color: GRAY,
      background: 'rgba(20,26,36,.7)',
      padding: '6px 16px',
      borderRadius: 14,
    }}
  >
    minh hoạ
  </div>
);

// Single warm lamp glow in the cold room. flick 0..1.
export const LampGlow: React.FC<{glow?: number; flick?: number}> = ({glow = 1, flick = 0}) => {
  const f = useCurrentFrame();
  const fl = 1 - flick * (0.06 + 0.04 * Math.sin(f / 7) * Math.sin(f / 13));
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 700,
        background: `radial-gradient(ellipse 420px 300px at 50% 12%, rgba(255,196,107,${0.4 * glow * fl}), transparent 70%)`,
      }}
    />
  );
};
