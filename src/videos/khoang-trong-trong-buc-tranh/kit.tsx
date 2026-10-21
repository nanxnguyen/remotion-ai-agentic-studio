import React from 'react';
import {Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {KTT_VOICE_OFFSET} from './timeline';

// khoang-trong-trong-buc-tranh shared kit (main agent owns).
// Palette (design-spec): night cold NIGHT_BG #1E1E32 / NIGHT_DEEP #121222 /
// COLD #2E5C8A / COLD_DARK #1B3A5C / INK #1E1E32 /
// AMBER #F2A65A / AMBER_WARM #E89442 / CREAM #FAF3E8 / WOOD #4A3728
// MUTED #6B7A8A / MISS #E5484D (only for s1 notification)
// People: realistic-minimal busts, curved eyes (D fix), NOT stick figures.
export const NIGHT_BG = '#1E1E32';
export const NIGHT_DEEP = '#121222';
export const COLD = '#2E5C8A';
export const COLD_DARK = '#1B3A5C';
export const INK = '#1A1A2E';
export const AMBER = '#F2A65A';
export const AMBER_WARM = '#E89442';
export const CREAM = '#FAF3E8';
export const WOOD = '#4A3728';
export const MUTED = '#6B7A8A';
export const MISS = '#E5484D';
export const SKIN = '#E9BE9C';
export const MOM_TOP = '#8A5A6B';
export const CHILD_TOP = '#3E5A78';
export const DAD_TOP = '#2D3A4A';
export const FONT = "'Be Vietnam Pro',sans-serif";
export const VO = KTT_VOICE_OFFSET;

export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
export const soft = Easing.bezier(0.25, 0.46, 0.45, 0.94);
export const ramp = (f: number, a: number, len = 14) =>
  interpolate(f, [a, a + len], [0, 1], {...clamp, easing: soft});
export const bob = (f: number) => Math.sin(f / 9) * 4;

// Caption start frames — char-proportional, same rule as other videos Caps.
export const starts = (parts: string[], sec: number) => {
  const total = parts.join('').length;
  let acc = 0;
  return parts.map((t) => {
    const s = VO + Math.round((acc / total) * sec * 30);
    acc += t.length;
    return s;
  });
};

// Be Vietnam Pro 600 local (OFL, public/fonts).
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
// Night captions MUST add textShadow — built in here.
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

// Notification badge for s1.
export const NotifBadge: React.FC<{cx: number; cy: number; r?: number}> = ({cx, cy, r = 60}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={MISS} />
    <text
      x={cx}
      y={cy + 20}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={42}
      fontWeight={600}
      fill="#FFFFFF"
    >
      1
    </text>
  </g>
);

// Chat/message bubble (s1).
export const MessageBubble: React.FC<{
  x: number;
  y: number;
  text: string;
  w?: number;
  fromMe?: boolean;
}> = ({x, y, text, w = 460, fromMe = false}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={100}
      rx={24}
      fill={fromMe ? COLD : '#E8ECEF'}
      stroke={fromMe ? 'none' : MUTED}
      strokeWidth={2}
      opacity={0.95}
    />
    <text
      x={x + 30}
      y={y + 62}
      fontFamily={FONT}
      fontSize={36}
      fontWeight={600}
      fill={fromMe ? '#FFFFFF' : INK}
    >
      {text}
    </text>
  </g>
);

// Minimal-realistic bust. Curved smiling eyes (D fix). mood: down|calm|soft|sad.
export const Bust: React.FC<{
  x: number;
  y: number;
  mood?: 'down' | 'calm' | 'soft' | 'sad';
  mom?: boolean;
  dad?: boolean;
  child?: boolean;
  scale?: number;
}> = ({x, y, mood = 'calm', mom, dad, child, scale = 1}) => {
  const eyes =
    mood === 'down' || mood === 'sad' ? (
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
    ) : mood === 'sad' ? (
      <path
        d="M -14 32 q 14 -12 28 0"
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
  const hairColor = mom ? MOM_TOP : dad ? DAD_TOP : CHILD_TOP;
  const hairStyle = mom ? (
    <>
      <circle cx={0} cy={-62} r={52} fill="#4A3A30" />
      <circle cx={0} cy={-6} r={58} fill={SKIN} />
      <circle cx={0} cy={-88} r={26} fill="#4A3A30" />
      <circle cx={-14} cy={-92} r={4} fill="#C9C2B8" />
      <circle cx={10} cy={-84} r={4} fill="#C9C2B8" />
    </>
  ) : dad ? (
    <path
      d="M -70 -10 q -8 -70 30 -84 q 60 -18 100 10 q 22 60 -8 84 q 6 -52 -30 -62 q -50 -14 -78 10 q -18 16 -14 42z"
      fill="#2E2A26"
    />
  ) : (
    <path
      d="M -70 -10 q -8 -70 30 -84 q 60 -18 100 10 q 22 60 -8 84 q 6 -52 -30 -62 q -50 -14 -78 10 q -18 16 -14 42z"
      fill="#2E2A26"
    />
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={150} rx={95} ry={80} fill={hairColor} />
      <circle cx={0} cy={0} r={70} fill={SKIN} />
      {hairStyle}
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
        stroke="#3A4A5A"
        strokeWidth={5}
        opacity={0.5}
      />
    ))}
    <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={WOOD} strokeWidth={8} />
  </g>
);

// Warm radial glow overlay (for emotional moments).
export const WarmGlow: React.FC<{level: number}> = ({level}) => (
  <rect x={-100} y={-100} width={1280} height={2120} fill={AMBER} opacity={level * 0.12} />
);

// Slow zoom helper.
export const pushIn = (f: number, dur: number, amt = 0.035) =>
  interpolate(f, [0, dur], [1, 1 + amt], {...clamp, easing: soft});

// Table for dinner scenes.
export const DinnerTable: React.FC<{
  x: number;
  y: number;
  hasFood?: boolean;
  emptyChairs?: number;
}> = ({x, y, hasFood = true, emptyChairs = 2}) => (
  <g>
    <ellipse cx={x} cy={y} rx={240} ry={50} fill={WOOD} />
    {hasFood && (
      <>
        <ellipse cx={x - 100} cy={y - 35} rx={60} ry={22} fill={CREAM} />
        <ellipse cx={x + 100} cy={y - 35} rx={60} ry={22} fill={CREAM} />
        <ellipse cx={x} cy={y - 40} rx={50} ry={18} fill="#E8D5B7" /> // soup bowl
      </>
    )}
    {emptyChairs > 0 && (
      <>
        <rect x={x - 200} y={y + 60} width={80} height={120} rx={8} fill={WOOD} opacity={0.6} />
        <rect x={x - 200} y={y + 30} width={80} height={30} rx={8} fill={WOOD} opacity={0.4} />
        {emptyChairs > 1 && (
          <>
            <rect x={x + 120} y={y + 60} width={80} height={120} rx={8} fill={WOOD} opacity={0.6} />
            <rect x={x + 120} y={y + 30} width={80} height={30} rx={8} fill={WOOD} opacity={0.4} />
          </>
        )}
      </>
    )}
  </g>
);

// Child drawing - the key visual for s4/s8.
export const ChildDrawing: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  showDad?: boolean;
  showEmpty?: boolean;
}> = ({x, y, w = 500, h = 400, showDad = false, showEmpty = false}) => (
  <g>
    {/* Paper texture */}
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={16}
      fill="#FEFEFE"
      stroke="#D0D0D0"
      strokeWidth={4}
    />
    {/* Mom and child (always present) */}
    <circle cx={x + 140} cy={y + 280} r={55} fill={SKIN} />
    <ellipse cx={x + 140} cy={y + 220} rx={45} ry={55} fill={MOM_TOP} />
    <path
      d={`M ${x + 95} ${y + 275} q ${20} ${-40} ${60} ${-50} q ${30} ${30} ${50} ${30}`}
      stroke="#4A3A30"
      strokeWidth={6}
      fill="none"
      strokeLinecap="round"
    />
    <circle cx={x + 125} cy={y + 200} r={8} fill="#4A3A30" />
    <circle cx={x + 155} cy={y + 200} r={8} fill="#4A3A30" />
    <path
      d={`M ${x + 115} ${y + 225} q ${15} ${10} ${30} ${0}`}
      stroke="#E5484D"
      strokeWidth={4}
      fill="none"
      strokeLinecap="round"
    />
    {/* Child */}
    <circle cx={x + 360} cy={y + 290} r={40} fill={SKIN} />
    <ellipse cx={x + 360} cy={y + 245} rx={35} ry={40} fill={CHILD_TOP} />
    <path
      d={`M ${x + 325} ${y + 285} q ${15} ${-30} ${45} ${-35} q ${25} ${20} ${40} ${20}`}
      stroke="#2E2A26"
      strokeWidth={5}
      fill="none"
      strokeLinecap="round"
    />
    <circle cx={x + 345} cy={y + 225} r={6} fill="#2E2A26" />
    <circle cx={x + 375} cy={y + 225} r={6} fill="#2E2A26" />
    <path
      d={`M ${x + 345} ${y + 245} q ${10} ${8} ${20} ${0}`}
      stroke="#E5484D"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    {/* Dad - empty space or present */}
    {showDad ? (
      <>
        <circle cx={x + 250} cy={y + 260} r={50} fill={SKIN} />
        <ellipse cx={x + 250} cy={y + 200} rx={42} ry={50} fill={DAD_TOP} />
        <path
          d={`M ${x + 210} ${y + 255} q ${18} ${-38} ${50} ${-45} q ${28} ${28} ${45} ${28}`}
          stroke="#2E2A26"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
        />
        <circle cx={x + 230} cy={y + 185} r={7} fill="#2E2A26" />
        <circle cx={x + 270} cy={y + 185} r={7} fill="#2E2A26" />
        <path
          d={`M ${x + 235} ${y + 210} q ${12} ${8} ${24} ${0}`}
          stroke="#E5484D"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
      </>
    ) : showEmpty ? (
      <>
        {/* Dashed outline for empty space */}
        <rect
          x={x + 190}
          y={y + 150}
          width={120}
          height={180}
          rx={20}
          fill="none"
          stroke={AMBER}
          strokeWidth={4}
          strokeDasharray="15 10"
          opacity={0.6}
        />
        <text
          x={x + 250}
          y={y + 250}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={28}
          fontWeight={600}
          fill={AMBER}
          opacity={0.7}
        >
          Ba
        </text>
        <text
          x={x + 250}
          y={y + 280}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={24}
          fontWeight={600}
          fill={AMBER}
          opacity={0.7}
        >
          (chỗ trống)
        </text>
      </>
    ) : null}
    {/* Label at bottom */}
    <text
      x={x + w / 2}
      y={y + h - 30}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={32}
      fontWeight={600}
      fill={INK}
      opacity={0.7}
    >
      {showDad ? 'Gia đình trọn vẹn' : showEmpty ? 'Chỗ trống của ba' : 'Mẹ và con'}
    </text>
  </g>
);

// Final ending text.
export const EndingText: React.FC<{f: number; duration: number}> = ({f, duration}) => {
  const o = interpolate(f, [duration - 90, duration - 30], [0, 1], clamp);
  return (
    <g opacity={o}>
      <rect x={140} y={700} width={800} height={180} rx={30} fill={NIGHT_DEEP} opacity={0.95} />
      <text
        x={540}
        y={770}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={48}
        fontWeight={600}
        fill={CREAM}
      >
        Có những khoảng trống...
      </text>
      <text
        x={540}
        y={830}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={48}
        fontWeight={600}
        fill={AMBER}
      >
        không thể lấp bằng một lời xin lỗi.
      </text>
    </g>
  );
};
