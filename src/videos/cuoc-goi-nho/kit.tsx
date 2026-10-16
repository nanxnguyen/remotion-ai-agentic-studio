import React from 'react';
import {Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CGN_VOICE_OFFSET} from './timeline';

// cuoc-goi-nho-cua-me shared kit (main agent owns).
// Palette (design-spec): day cold DAY_BG #E8EEF2 / DESK #C9D6DF / INK #1E2A33 /
// COLD #4A90B8 / MISS #E5484D / MUTED #8A94A0; night warm NIGHT_BG #2B2320 /
// NIGHT_DEEP #1D1714 / AMBER #F2A65A / CREAM #FAF3E8 / WOOD #5A423A-ish.
// People: realistic-minimal busts, curved eyes (D fix), NOT stick figures.
export const DAY_BG = '#E8EEF2';
export const DESK = '#C9D6DF';
export const INK = '#1E2A33';
export const COLD = '#4A90B8';
export const COLD_DARK = '#2E6E94';
export const MISS = '#E5484D';
export const MUTED = '#8A94A0';
export const NIGHT_BG = '#2B2320';
export const NIGHT_DEEP = '#1D1714';
export const AMBER = '#F2A65A';
export const CREAM = '#FAF3E8';
export const WOOD = '#5A4230';
export const ROOM_CHILD = '#232B34';
export const SKIN = '#E9BE9C';
export const MOM_TOP = '#8A5A6B';
export const CHILD_TOP = '#3E5A78';
export const FONT = "'Be Vietnam Pro',sans-serif";
export const VO = CGN_VOICE_OFFSET;

export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
export const soft = Easing.bezier(0.25, 0.46, 0.45, 0.94);
export const ramp = (f: number, a: number, len = 14) =>
  interpolate(f, [a, a + len], [0, 1], {...clamp, easing: soft});
export const bob = (f: number) => Math.sin(f / 9) * 4;

// Caption start frames — char-proportional, same rule as tt2/gaplai Caps.
export const starts = (parts: string[], sec: number) => {
  const total = parts.join('').length;
  let acc = 0;
  return parts.map((t) => {
    const s = VO + Math.round((acc / total) * sec * 30);
    acc += t.length;
    return s;
  });
};

// Be Vietnam Pro 600 local (OFL, public/fonts — user chốt, thay Plus Jakarta Sans).
export const CcFonts: React.FC = () => (
  <style>{`
@font-face{font-family:'Be Vietnam Pro';font-weight:600;font-display:swap;
src:url('${staticFile('fonts/BeVietnamPro-SemiBold-VN.woff2')}') format('woff2');
unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}
@font-face{font-family:'Be Vietnam Pro';font-weight:600;font-display:swap;
src:url('${staticFile('fonts/BeVietnamPro-SemiBold-LatinExt.woff2')}') format('woff2');
unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Be Vietnam Pro';font-weight:600;font-display:swap;
src:url('${staticFile('fonts/BeVietnamPro-SemiBold-Latin.woff2')}') format('woff2');
unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
`}</style>
);

// Caption bottom-center, max 2 lines, bottom 250px (above 210px safe zone).
// Night captions MUST add textShadow (D fix) — built in here.
export const CcLine: React.FC<{text: string; accent?: string; dark?: boolean; size?: number}> = ({
  text,
  accent,
  dark,
  size = 58,
}) => {
  const f = useCurrentFrame();
  const parts = accent ? text.split(accent) : [text];
  const o = interpolate(f, [0, 9], [0, 1], clamp);
  const y = interpolate(f, [0, 12], [16, 0], {...clamp, easing: soft});
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        bottom: 250,
        textAlign: 'center',
        opacity: o,
        transform: `translateY(${y}px)`,
      }}
    >
      {/* inline-block = một hộp background duy nhất, không vỡ theo dòng;
          fix bóng ma của span inline + boxDecorationBreak:clone trên headless Chromium */}
      <div
        style={{
          display: 'inline-block',
          maxWidth: 940,
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1.32,
          color: dark ? INK : CREAM,
          background: dark ? 'rgba(255,255,255,.82)' : 'rgba(10,7,4,.62)',
          padding: '20px 28px',
          borderRadius: 26,
          textShadow: dark ? 'none' : '0 2px 18px rgba(0,0,0,.78), 0 0 5px rgba(0,0,0,.9)',
        }}
      >
        {accent && parts.length === 2 ? (
          <>
            {parts[0]}
            <span style={{color: dark ? COLD_DARK : AMBER}}>{accent}</span>
            {parts[1]}
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

// Multi-part caption: replace-style — one part visible at a time
// (end[i] = start[i+1]); all fade at shot end.
export const CcCaps: React.FC<{
  sec: number;
  duration: number;
  parts: string[];
  accents?: string[];
  dark?: boolean;
}> = ({sec, duration, parts, accents = [], dark}) => {
  const f = useCurrentFrame();
  const st = starts(parts, sec);
  return (
    <>
      {parts.map((t, i) => {
        const from = st[i];
        const end = st[i + 1] ?? duration;
        const vis = ramp(f, from, 10) * (1 - interpolate(f, [end - 6, end], [0, 1], clamp));
        if (vis <= 0) return null;
        return (
          <div key={i} style={{opacity: vis}}>
            <CcLine text={t} accent={accents[i]} dark={dark} />
          </div>
        );
      })}
    </>
  );
};

// Phone frame with mandatory "minh hoạ" pill (design-spec §5).
export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  border?: string;
}> = ({children, x = 270, y = 620, w = 540, h = 860, border = INK}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={64} fill={border} />
    <rect x={x + 18} y={y + 18} width={w - 36} height={h - 36} rx={50} fill="#FFFFFF" />
    <rect x={x + 42} y={y + 42} width={172} height={52} rx={26} fill={MUTED} opacity={0.9} />
    <text
      x={x + 128}
      y={y + 78}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={30}
      fontWeight={600}
      fill="#FFFFFF"
    >
      minh hoạ
    </text>
    {children}
  </g>
);

// Missed-call badge: handset + arrow, NEVER a tick (spec §5).
export const MissedBadge: React.FC<{cx: number; cy: number; r?: number}> = ({cx, cy, r = 86}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={MISS} />
    <g
      transform={`translate(${cx - r * 0.4},${cy - r * 0.4}) scale(${(r * 0.8) / 24})`}
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </g>
    <path
      d={`M ${cx + r * 0.42} ${cy + r * 0.42} q ${r * 0.28} ${r * 0.07} ${r * 0.22} ${r * 0.4}`}
      fill="none"
      stroke="#FFD9DC"
      strokeWidth={r * 0.08}
      strokeLinecap="round"
    />
  </g>
);

// Chat bubble (s3).
export const ChatBubble: React.FC<{x: number; y: number; text: string; w?: number}> = ({
  x,
  y,
  text,
  w = 560,
}) => (
  <g>
    <rect x={x} y={y} width={w} height={110} rx={30} fill={COLD} />
    <text x={x + 40} y={y + 70} fontFamily={FONT} fontSize={44} fontWeight={600} fill="#FFFFFF">
      {text}
    </text>
  </g>
);

// Warm radial glow overlay.
export const WarmGlow: React.FC<{level: number}> = ({level}) => (
  <rect x={-100} y={-100} width={1280} height={2120} fill={AMBER} opacity={level * 0.12} />
);

// Voice wave bridge between two rooms.
export const VoiceWave: React.FC<{x: number; y: number; w?: number; f?: number}> = ({
  x,
  y,
  w = 200,
  f = 0,
}) => {
  const bars = [36, 56, 44, 62, 40, 52, 34];
  return (
    <g>
      {bars.map((h, i) => {
        const hh = h * (0.8 + 0.2 * Math.sin(f / 8 + i));
        return (
          <rect
            key={i}
            x={x + i * 30}
            y={y - hh / 2}
            width={12}
            height={hh}
            rx={6}
            fill={AMBER}
            opacity={0.85}
          />
        );
      })}
    </g>
  );
};

// Minimal-realistic bust. Curved smiling eyes (D fix). mood: down|calm|soft.
export const Bust: React.FC<{
  x: number;
  y: number;
  mood?: 'down' | 'calm' | 'soft';
  mom?: boolean;
  scale?: number;
}> = ({x, y, mood = 'calm', mom, scale = 1}) => {
  const eyes =
    mood === 'down' ? (
      <>
        <path
          d="M -34 -8 q 12 8 24 0"
          stroke={INK}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 10 -8 q 12 8 24 0"
          stroke={INK}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <path
          d="M -34 -4 q 12 -10 24 0"
          stroke={INK}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 10 -4 q 12 -10 24 0"
          stroke={INK}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
        />
      </>
    );
  const mouth =
    mood === 'down' ? (
      <path
        d="M -12 34 q 12 -8 24 0"
        stroke={INK}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
    ) : mood === 'soft' ? (
      <path
        d="M -14 30 q 14 12 28 0"
        stroke={INK}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
    ) : (
      <path
        d="M -12 32 q 12 6 24 0"
        stroke={INK}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
    );
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={150} rx={95} ry={80} fill={mom ? MOM_TOP : CHILD_TOP} />
      <circle cx={0} cy={0} r={70} fill={SKIN} />
      {mom ? (
        <>
          <circle cx={0} cy={-62} r={52} fill="#4A3A30" />
          <circle cx={0} cy={-6} r={58} fill={SKIN} />
          <circle cx={0} cy={-88} r={26} fill="#4A3A30" />
          <circle cx={-14} cy={-92} r={4} fill="#C9C2B8" />
          <circle cx={10} cy={-84} r={4} fill="#C9C2B8" />
        </>
      ) : (
        <path
          d="M -70 -10 q -8 -70 30 -84 q 60 -18 100 10 q 22 60 -8 84 q 6 -52 -30 -62 q -50 -14 -78 10 q -18 16 -14 42z"
          fill="#2E2A26"
        />
      )}
      <g transform="translate(0 6)">
        {eyes}
        {mouth}
      </g>
    </g>
  );
};

// Night window with diagonal rain, NO moon (spec §6).
export const NightWindow: React.FC<{x: number; y: number; w?: number; h?: number}> = ({
  x,
  y,
  w = 340,
  h = 420,
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={24}
      fill={NIGHT_DEEP}
      stroke={WOOD}
      strokeWidth={10}
    />
    {[-40, 20, 80, 140, 200, 260].map((o, i) => (
      <line
        key={i}
        x1={x + 40 + o}
        y1={y + 20}
        x2={x + o}
        y2={y + h - 20}
        stroke="#5A7086"
        strokeWidth={5}
        opacity={0.6}
      />
    ))}
    <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={WOOD} strokeWidth={8} />
  </g>
);

// Street lamp (s5 beat 1: child calling on the way home).
export const StreetLamp: React.FC<{x: number; y: number; h?: number}> = ({x, y, h = 560}) => (
  <g>
    <rect x={x - 12} y={y - h} width={24} height={h} fill="#3A3F45" />
    <rect x={x - 12} y={y - h} width={150} height={24} fill="#3A3F45" />
    <circle cx={x + 138} cy={y - h + 34} r={22} fill={AMBER} />
    <circle cx={x + 138} cy={y - h + 34} r={60} fill={AMBER} opacity={0.18} />
  </g>
);

// Tables.
export const MealTable: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g>
    <ellipse cx={x} cy={y} rx={220} ry={46} fill={WOOD} />
    <ellipse cx={x - 90} cy={y - 30} rx={52} ry={20} fill={CREAM} />
    <ellipse cx={x + 90} cy={y - 30} rx={52} ry={20} fill={CREAM} />
    <path
      d="M -140 -90 q 8 -26 0 -48 M -112 -90 q 8 -26 0 -48"
      stroke={CREAM}
      strokeWidth={6}
      fill="none"
      opacity={0.5}
      transform={`translate(${x} ${y})`}
    />
  </g>
);
export const SoloTable: React.FC<{x: number; y: number}> = ({x, y}) => (
  // Bát cơm ĐÃ NGUỘI của con (không hơi nóng — SoloTable cấm steam, fix D3)
  <g>
    <ellipse cx={x} cy={y} rx={150} ry={34} fill={WOOD} />
    <ellipse cx={x} cy={y - 24} rx={46} ry={18} fill={CREAM} />
  </g>
);
