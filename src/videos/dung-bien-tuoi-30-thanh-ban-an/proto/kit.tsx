// Shared kit for dung-bien-tuoi-30-thanh-ban-an prototype (story profile).
// Palette + type per docs/dung-bien-tuoi-30-thanh-ban-an/design-spec.md §1.
// Style: "thế giới giấy ô ly dưới đèn bàn" — graphite pencil on grid paper.
import React from 'react';
import {staticFile, useCurrentFrame} from 'remotion';
import {E_SINE, Grain, mix, ramp} from './motion';

export const PAPER = '#F0F3F0';
export const GRID = '#AFD6D3';
export const INK = '#3E454B';
export const PAPER_TEXT = '#F3F5F2';
export const RED = '#D23B2E';
export const HILITE = '#FFE24D';
export const LAMP = '#F6E7C4';
export const LAMP_SHADOW = '#D8D2BF';
export const NIGHT = '#C9CCC6';
export const SCREEN = '#DCEAF2';
export const LABEL = '#7C858C';

// Font stacks (verified 2026-10-17: Bitter/Caveat/Nunito Sans have NO vietnamese subset)
export const HEAD = "'Literata',Georgia,serif"; // fallback for Bitter ExtraBold
export const CAP = "'Be Vietnam Pro','Lexend',sans-serif"; // fallback for Nunito Sans Bold
export const HAND = "'Lora',Georgia,serif"; // fallback for Caveat Bold (italic)

export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const VN =
  'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB';
const LE =
  'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF';
const LA =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD,U+FFFD';
const face = (fam: string, weight: number, style: string, file: string, range: string) =>
  `@font-face{font-family:'${fam}';font-weight:${weight};font-style:${style};font-display:swap;src:url('${staticFile('fonts/' + file)}') format('woff2');unicode-range:${range}}`;
export const DBTFonts: React.FC = () => (
  <style>{`
${face('Literata', 700, 'normal', 'Literata-Bold-VN.woff2', VN)}
${face('Literata', 700, 'normal', 'Literata-Bold-LE.woff2', LE)}
${face('Literata', 700, 'normal', 'Literata-Bold-LA.woff2', LA)}
${face('Be Vietnam Pro', 600, 'normal', 'BeVietnamPro-SemiBold-VN.woff2', VN)}
${face('Be Vietnam Pro', 600, 'normal', 'BeVietnamPro-SemiBold-Latin.woff2', LA)}
${face('Lora', 400, 'italic', 'Lora-Italic-Variable.ttf', VN)}
${face('Lora', 400, 'italic', 'Lora-Italic-Variable.ttf', LE)}
${face('Lora', 400, 'italic', 'Lora-Italic-Variable.ttf', LA)}
`}</style>
);

// Grid paper background (ô ly Việt Nam)
export const GridPaper: React.FC<{dim?: number}> = ({dim = 0}) => (
  <div style={{position: 'absolute', inset: 0, background: PAPER}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 86px, ${GRID} 86px 88px), repeating-linear-gradient(90deg, transparent 0 86px, ${GRID} 86px 88px)`,
        opacity: 0.6,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse 90% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(62,69,75,${0.08 + dim * 0.12}) 100%)`,
      }}
    />
  </div>
);

// Caption pill: bottom 224 + lift, max 2 lines, centered. Size default 58 (>=54).
export const DbtLine: React.FC<{
  text: string;
  accent?: string;
  accentColor?: string;
  size?: number;
  enter?: number;
  lift?: number;
}> = ({text, accent, accentColor = RED, size = 58, enter = 0, lift = 0}) => {
  const f = useCurrentFrame();
  const e = enter <= 0 ? 1 : ramp(f, enter, 12, E_SINE);
  const parts = accent ? text.split(accent) : [text];
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 224 + lift,
        display: 'flex',
        justifyContent: 'center',
        opacity: e,
        transform: `translateY(${(1 - e) * 16}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 952,
          fontFamily: CAP,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1.45,
          textAlign: 'center',
          color: PAPER_TEXT,
          padding: '22px 30px 26px',
          borderRadius: 26,
          background: 'rgba(62,69,75,0.85)',
          border: '1px solid rgba(243,245,242,.14)',
          textShadow: '0 2px 14px rgba(0,0,0,.9)',
        }}
      >
        {accent && parts.length === 2 ? (
          <>
            {parts[0]}
            <span style={{color: accentColor, fontWeight: 700}}>{accent}</span>
            {parts[1]}
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

// Big headline (s1, s5a/s5b, s10): Literata 700, accent spans colored.
export type HSeg = {t: string; c?: string; b?: boolean};
export const Headline: React.FC<{lines: HSeg[][]; size?: number; top?: number; enter?: number}> = ({
  lines,
  size = 84,
  top = 300,
  enter = 0,
}) => {
  const f = useCurrentFrame();
  const e = enter <= 0 ? 1 : ramp(f, enter, 14, E_SINE);
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top,
        textAlign: 'center',
        opacity: e,
        transform: `translateY(${(1 - e) * 18}px)`,
      }}
    >
      {lines.map((segs, i) => (
        <div
          key={i}
          style={{
            fontFamily: HEAD,
            fontWeight: 700,
            fontSize: size,
            lineHeight: 1.32,
            color: INK,
            textShadow: `0 2px 0 ${PAPER}, 2px 0 0 ${PAPER}, -2px 0 0 ${PAPER}, 0 3px 14px rgba(62,69,75,.32)`,
            textWrap: 'balance' as const,
          }}
        >
          {segs.map((s, j) => (
            <span
              key={j}
              style={s.c ? {color: s.c, fontWeight: 700} : s.b ? {fontWeight: 700} : undefined}
            >
              {s.t}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

// Handwritten text (Caveat fallback → Lora Italic)
export const Handwrite: React.FC<{
  text: string;
  size?: number;
  x?: number;
  y?: number;
  color?: string;
  enter?: number;
  style?: React.CSSProperties;
}> = ({text, size = 48, x = 0, y = 0, color = INK, enter = 0, style}) => {
  const f = useCurrentFrame();
  const e = enter <= 0 ? 1 : ramp(f, enter, 16, E_SINE);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontFamily: HAND,
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: size,
        color,
        opacity: e,
        transform: `translateY(${(1 - e) * 10}px)`,
        ...style,
      }}
    >
      {text}
    </div>
  );
};

// Ruler (chiếc thước kẻ tay) — the central metaphor
export const Ruler: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  angle?: number;
  ticks?: number[];
  activeTick?: number;
  enter?: number;
}> = ({
  x = 0,
  y = 0,
  width = 800,
  angle = -12,
  ticks = [18, 22, 25, 30],
  activeTick,
  enter = 0,
}) => {
  const f = useCurrentFrame();
  const e = enter <= 0 ? 1 : ramp(f, enter, 20, E_SINE);
  const tickSpacing = width / (ticks.length + 1);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height: 80,
        transform: `rotate(${angle}deg)`,
        opacity: e,
      }}
    >
      {/* ruler body */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 20,
          width: '100%',
          height: 40,
          background: 'rgba(210,210,200,0.9)',
          border: `2px solid ${INK}`,
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(62,69,75,0.25)',
        }}
      />
      {/* tick marks */}
      {ticks.map((t, i) => {
        const tx = tickSpacing * (i + 1);
        const isActive = t === activeTick;
        return (
          <div key={t}>
            <div
              style={{
                position: 'absolute',
                left: tx - 1,
                top: 20,
                width: 2,
                height: isActive ? 40 : 30,
                background: isActive ? RED : INK,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: tx - 20,
                top: 62,
                width: 40,
                textAlign: 'center',
                fontFamily: CAP,
                fontWeight: 600,
                fontSize: 22,
                color: isActive ? RED : INK,
              }}
            >
              {t}
            </div>
            {/* red circle around active tick */}
            {isActive && (
              <div
                style={{
                  position: 'absolute',
                  left: tx - 28,
                  top: 12,
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: `3px solid ${RED}`,
                  opacity: 0.9,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Pencil character (graphite, soft shading, NOT stick figure)
export const PencilChar: React.FC<{
  x?: number;
  y?: number;
  s?: number;
  pose?: 'stand' | 'sit' | 'hold';
  enter?: number;
}> = ({x = 0, y = 0, s = 1, pose = 'stand', enter = 0}) => {
  const f = useCurrentFrame();
  const e = enter <= 0 ? 1 : ramp(f, enter, 16, E_SINE);
  const breathe = Math.sin(f / 30) * 2 * s;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + breathe,
        width: 120 * s,
        height: 280 * s,
        opacity: e,
      }}
    >
      {/* head */}
      <div
        style={{
          position: 'absolute',
          left: 20 * s,
          top: 0,
          width: 80 * s,
          height: 80 * s,
          borderRadius: '50%',
          background: `radial-gradient(circle at 40% 35%, #5A636B, ${INK} 70%)`,
          boxShadow: '0 6px 16px rgba(62,69,75,0.3)',
        }}
      />
      {/* hair */}
      <div
        style={{
          position: 'absolute',
          left: 15 * s,
          top: -5 * s,
          width: 90 * s,
          height: 40 * s,
          borderRadius: '50% 50% 0 0',
          background: '#2A2F33',
        }}
      />
      {/* body (sweater) */}
      <div
        style={{
          position: 'absolute',
          left: 15 * s,
          top: 75 * s,
          width: 90 * s,
          height: 130 * s,
          borderRadius: `${20 * s}px ${20 * s}px ${10 * s}px ${10 * s}px`,
          background: `linear-gradient(180deg, #4A5258, ${INK} 80%)`,
          boxShadow: '0 8px 20px rgba(62,69,75,0.25)',
        }}
      />
      {/* graphite construction marks: a deliberate pencil-on-paper finish */}
      <div
        style={{
          position: 'absolute',
          left: 27 * s,
          top: 95 * s,
          width: 66 * s,
          height: 90 * s,
          borderLeft: `${2 * s}px solid rgba(240,243,240,.18)`,
          borderRight: `${1 * s}px solid rgba(240,243,240,.12)`,
          transform: 'skewY(-2deg)',
          opacity: 0.75,
        }}
      />
      {/* legs */}
      <div
        style={{
          position: 'absolute',
          left: 25 * s,
          top: 200 * s,
          width: 30 * s,
          height: 70 * s,
          borderRadius: `${8 * s}px`,
          background: INK,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 65 * s,
          top: 200 * s,
          width: 30 * s,
          height: 70 * s,
          borderRadius: `${8 * s}px`,
          background: INK,
        }}
      />
      {/* arm holding pencil */}
      {pose === 'hold' && (
        <div
          style={{
            position: 'absolute',
            left: 85 * s,
            top: 90 * s,
            width: 60 * s,
            height: 16 * s,
            borderRadius: `${8 * s}px`,
            background: INK,
            transform: 'rotate(-30deg)',
            transformOrigin: 'left center',
          }}
        />
      )}
      {pose === 'sit' && (
        <>
          <div
            style={{
              position: 'absolute',
              left: 18 * s,
              top: 183 * s,
              width: 88 * s,
              height: 18 * s,
              borderRadius: 9 * s,
              background: INK,
              transform: 'rotate(8deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 24 * s,
              top: 218 * s,
              width: 70 * s,
              height: 18 * s,
              borderRadius: 9 * s,
              background: INK,
              transform: 'rotate(-8deg)',
            }}
          />
        </>
      )}
    </div>
  );
};

// Lamp glow (vệt đèn bàn chếch)
export const LampGlow: React.FC<{opacity?: number; x?: number; y?: number}> = ({
  opacity = 0.3,
  x = 200,
  y = 100,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 700,
      height: 500,
      background: `radial-gradient(ellipse at 50% 30%, ${LAMP} 0%, rgba(246,231,196,0) 70%)`,
      opacity,
      pointerEvents: 'none',
    }}
  />
);

// Red pen writing lines (ba dòng tội danh)
export const RedPenLines: React.FC<{lines: string[]; x?: number; y?: number; enter?: number}> = ({
  lines,
  x = 100,
  y = 200,
  enter = 0,
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: x, top: y}}>
      {lines.map((line, i) => {
        const e = enter <= 0 ? 1 : ramp(f, enter + i * 8, 12, E_SINE);
        return (
          <div
            key={i}
            style={{
              fontFamily: HAND,
              fontStyle: 'italic',
              fontSize: 44,
              color: RED,
              marginBottom: 16,
              opacity: e,
              transform: `translateX(${(1 - e) * 20}px)`,
              textShadow: '0 1px 4px rgba(210,59,46,0.3)',
            }}
          >
            {line}
          </div>
        );
      })}
    </div>
  );
};

export const Feast: React.FC<{x?: number; y?: number; scale?: number; steam?: boolean}> = ({
  x = 180,
  y = 760,
  scale = 1,
  steam = true,
}) => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 18) * 5;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 720 * scale, height: 310 * scale}}>
      <div
        style={{
          position: 'absolute',
          left: 100 * scale,
          top: 115 * scale,
          width: 520 * scale,
          height: 125 * scale,
          borderRadius: '50%',
          background: '#D6CDBB',
          border: `4px solid ${INK}`,
          boxShadow: '0 14px 20px rgba(62,69,75,.22)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 175 * scale,
          top: 88 * scale,
          width: 140 * scale,
          height: 80 * scale,
          borderRadius: '50%',
          background: '#C5B59D',
          border: `3px solid ${INK}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 380 * scale,
          top: 95 * scale,
          width: 145 * scale,
          height: 72 * scale,
          borderRadius: '50%',
          background: '#B99E82',
          border: `3px solid ${INK}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 285 * scale,
          top: 145 * scale,
          width: 120 * scale,
          height: 60 * scale,
          borderRadius: '50%',
          background: '#8D927F',
          border: `3px solid ${INK}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 170 * scale,
          top: 35 * scale,
          width: 6 * scale,
          height: 150 * scale,
          background: INK,
          transform: 'rotate(-25deg)',
          transformOrigin: 'bottom',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 245 * scale,
          top: 28 * scale,
          width: 6 * scale,
          height: 150 * scale,
          background: INK,
          transform: 'rotate(20deg)',
          transformOrigin: 'bottom',
        }}
      />
      {steam &&
        [0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: (235 + i * 95) * scale,
              top: (8 + (i % 2) * 12) * scale,
              width: 48 * scale,
              height: 112 * scale,
              borderLeft: `7px solid rgba(124,133,140,.58)`,
              borderRadius: '50%',
              transform: `translateY(${(drift * (i + 1)) / 2}px) rotate(${i === 1 ? 8 : -8}deg)`,
              opacity: 0.75,
            }}
          />
        ))}
    </div>
  );
};

export const QuestionBurst: React.FC<{x?: number; y?: number; compact?: boolean}> = ({
  x = 280,
  y = 560,
  compact = false,
}) => {
  const f = useCurrentFrame();
  const qs = ['Có nhà chưa?', 'Kết hôn chưa?', 'Lương bao nhiêu?'];
  return (
    <div style={{position: 'absolute', left: x, top: y, width: 600, height: compact ? 120 : 230}}>
      {qs.map((q, i) => (
        <div
          key={q}
          style={{
            position: 'absolute',
            left: (i % 2) * 180 + (i === 2 ? 90 : 0),
            top: i * (compact ? 36 : 68) + Math.sin((f + i * 8) / 15) * 3,
            fontFamily: HAND,
            fontStyle: 'italic',
            fontSize: compact ? 24 : 42,
            color: RED,
            fontWeight: 700,
            transform: `rotate(${i === 1 ? 3 : -4}deg)`,
            textShadow: '0 1px 2px rgba(210,59,46,.18)',
          }}
        >
          {q}
        </div>
      ))}
    </div>
  );
};

export const PhoneMock: React.FC<{x?: number; y?: number; on?: boolean; scale?: number}> = ({
  x = 0,
  y = 0,
  on = true,
  scale = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 230 * scale,
      height: 430 * scale,
      borderRadius: 28 * scale,
      background: on ? '#26323A' : '#4A5258',
      border: `8px solid ${INK}`,
      boxShadow: '0 12px 30px rgba(62,69,75,.3)',
      overflow: 'hidden',
    }}
  >
    <div style={{height: 26 * scale, background: INK}} />
    {on ? (
      <>
        <div
          style={{
            margin: 18 * scale,
            height: 125 * scale,
            background: '#B8CBD4',
            borderRadius: 10 * scale,
            border: `2px solid ${PAPER}`,
          }}
        />
        <div
          style={{
            margin: `12px ${18 * scale}px`,
            height: 10 * scale,
            background: PAPER,
            opacity: 0.8,
          }}
        />
        <div
          style={{
            margin: `12px ${18 * scale}px`,
            height: 76 * scale,
            background: '#849BA3',
            borderRadius: 8 * scale,
          }}
        />
        <div
          style={{
            margin: `12px ${18 * scale}px`,
            height: 10 * scale,
            background: PAPER,
            opacity: 0.6,
          }}
        />
      </>
    ) : (
      <div
        style={{
          position: 'absolute',
          left: 40 * scale,
          top: 195 * scale,
          width: 150 * scale,
          height: 3 * scale,
          background: '#818B90',
          transform: 'rotate(-12deg)',
        }}
      />
    )}
  </div>
);

// Minh hoa label
export const MinhHoa: React.FC<{top?: number}> = ({top = 120}) => (
  <div
    style={{
      position: 'absolute',
      top,
      right: 70,
      fontFamily: CAP,
      fontWeight: 600,
      fontSize: 32,
      color: LABEL,
      background: 'rgba(62,69,75,0.72)',
      padding: '8px 18px',
      borderRadius: 14,
      border: '1px solid rgba(124,133,140,0.4)',
    }}
  >
    minh hoạ
  </div>
);

// Film grain + vignette finish for proto frames.
export const Finish: React.FC = () => (
  <>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 90% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(62,69,75,0.25) 100%)',
      }}
    />
    <Grain opacity={0.05} />
  </>
);

export {mix};
