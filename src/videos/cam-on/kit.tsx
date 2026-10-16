import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {CAMON_VOICE_OFFSET} from './timeline';

// "Ảnh cũ & bình minh xanh" look (docs/camon/brief.md): night slate past, moss -> dawn present, leaf-green accent.
export const C = {
  night: '#1B2230',
  night2: '#262F40',
  past: '#AEB9CB',
  pastDim: '#5B6880',
  moss: '#1E2A25',
  moss2: '#2C3D33',
  dawn: '#F4C77D',
  now: '#F6F2E8',
  leaf: '#9FD39A',
  ivory: '#EDE6D6',
  text: '#F3EEE3',
};
export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
// Same curves as video-shotcraft demos/_fixtures/Polish.tsx (EASE.out ≈ quint-out, EASE.smooth symmetric in-out).
export const EASE = {out: Easing.bezier(0.22, 1, 0.36, 1), smooth: Easing.bezier(0.65, 0, 0.35, 1)};
export const ramp = (f: number, start: number, dur: number, ease = EASE.out) =>
  interpolate(f, [start, start + dur], [0, 1], {...clamp, easing: ease});
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const mixHex = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `rgb(${x.map((v, i) => Math.round(lerp(v, y[i], t))).join(',')})`;
};
export const hash = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}; // deterministic 0..1
// Frame where the voice reaches fraction t of its spoken span (scenes are keyed to this, so new voice clips cost nothing).
export const vAt = (sec: number, t: number) => CAMON_VOICE_OFFSET + t * sec * 30;
export const Lora = "'Lora', serif";

export const CamonFonts: React.FC = () => (
  <style>{`
@font-face{font-family:'Lora';src:url('${staticFile('fonts/Lora-Variable.ttf')}') format('truetype');font-weight:400 700;font-style:normal}
@font-face{font-family:'Lora';src:url('${staticFile('fonts/Lora-Italic-Variable.ttf')}') format('truetype');font-weight:400 700;font-style:italic}
@font-face{font-family:'Inter';src:url('${staticFile('fonts/Inter-SemiBold.woff2')}') format('woff2');font-weight:650}
*{box-sizing:border-box}
`}</style>
);

// ---------- caption: blur-slide card (y/blur/opacity on one shared progress, word stagger) ----------
const Line: React.FC<{
  text: string;
  accent?: string;
  accentColor: string;
  len: number;
  instant?: boolean;
}> = ({text, accent, accentColor, len, instant}) => {
  const f = useCurrentFrame();
  // accent may hold several phrases separated by '|'; a word is accented if it starts inside any of them
  const ranges = (accent ?? '')
    .split('|')
    .filter(Boolean)
    .map((a) => {
      const i = text.indexOf(a);
      return [i, i + a.length];
    })
    .filter(([i]) => i >= 0);
  let pos = 0;
  const words = text.split(' ').map((w) => {
    const s = pos;
    pos += w.length + 1;
    return {w, acc: ranges.some(([a0, a1]) => s >= a0 && s < a1)};
  });
  const out = interpolate(f, [len - 7, len], [1, 0], clamp);
  return (
    <div
      style={
        {
          position: 'absolute',
          left: 80,
          right: 80,
          top: 236,
          textAlign: 'center',
          textWrap: 'balance',
          fontFamily: Lora,
          fontWeight: 650,
          fontSize: 70,
          lineHeight: 1.2,
          color: C.text,
          textShadow: '0 2px 22px rgba(8,12,18,.7), 0 0 2px rgba(8,12,18,.5)',
          opacity: out,
        } as React.CSSProperties
      }
    >
      {words.map(({w, acc}, i) => {
        const p = instant ? ramp(f, 0, 6) : ramp(f, i * 2.4, 20);
        return (
          <React.Fragment key={i}>
            {i > 0 ? ' ' : null}
            <span
              style={{
                display: 'inline-block',
                opacity: p,
                transform: `translateY(${((1 - p) * 24).toFixed(2)}px)`,
                filter: p > 0.999 ? undefined : `blur(${((1 - p) * 7).toFixed(2)}px)`,
                ...(acc ? {fontStyle: 'italic', color: accentColor} : {}),
              }}
            >
              {w}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// One caption line per sentence; timing by character share of the measured voice span (same rule as stick.tsx <Caps/>).
// instantFirst: first line is fully readable within 6 frames (hook shots).
export const Captions: React.FC<{
  sec: number;
  duration: number;
  parts: string[];
  accents?: string[];
  accentColor?: string;
  instantFirst?: boolean;
}> = ({sec, duration, parts, accents = [], accentColor = C.leaf, instantFirst}) => {
  const total = parts.join('').length;
  let acc = 0;
  return (
    <>
      {parts.map((t, i) => {
        const from = i === 0 ? 0 : CAMON_VOICE_OFFSET + Math.round((acc / total) * sec * 30) - 3;
        acc += t.length;
        const end =
          i === parts.length - 1
            ? duration
            : CAMON_VOICE_OFFSET + Math.round((acc / total) * sec * 30) - 3;
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(12, end - from)}>
            <Line
              text={t}
              accent={accents[i]}
              accentColor={accentColor}
              len={Math.max(12, end - from)}
              instant={instantFirst && i === 0}
            />
          </Sequence>
        );
      })}
    </>
  );
};
// Start frame of each caption part, so pictures can follow the spoken sentences.
export const partStarts = (parts: string[], sec: number) => {
  const total = parts.join('').length;
  let acc = 0;
  return parts.map((t) => {
    const s = CAMON_VOICE_OFFSET + Math.round((acc / total) * sec * 30);
    acc += t.length;
    return s;
  });
};

// ---------- backgrounds / texture ----------
export const Sky: React.FC<{top: string; bottom: string; id: string}> = ({top, bottom, id}) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={top} />
        <stop offset="1" stopColor={bottom} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height="1920" fill={`url(#${id})`} />
  </>
);
export const Glow: React.FC<{
  x: number;
  y: number;
  r: number;
  color: string;
  o: number;
  id: string;
}> = ({x, y, r, color, o, id}) => (
  <>
    <defs>
      <radialGradient id={id}>
        <stop offset="0" stopColor={color} stopOpacity={o} />
        <stop offset="1" stopColor={color} stopOpacity={0} />
      </radialGradient>
    </defs>
    <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
  </>
);
export const Film: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <svg
      width="1080"
      height="1920"
      style={{position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'overlay'}}
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="1080" height="1920" filter="url(#grain)" />
    </svg>
    <AbsoluteFill style={{boxShadow: 'inset 0 0 220px rgba(5,8,12,.55)'}} />
  </AbsoluteFill>
);
export const Svg: React.FC<{
  children: React.ReactNode;
  scale?: number;
  ox?: number;
  oy?: number;
}> = ({children, scale = 1, ox = 540, oy = 1200}) => (
  <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
    <g transform={`translate(${ox} ${oy}) scale(${scale}) translate(${-ox} ${-oy})`}>{children}</g>
  </svg>
);

// ---------- props ----------
export const Rain: React.FC<{
  f: number;
  x0: number;
  y0: number;
  w: number;
  h: number;
  n?: number;
  color?: string;
  o?: number;
  speed?: number;
}> = ({f, x0, y0, w, h, n = 60, color = C.past, o = 0.45, speed = 26}) => (
  <g opacity={o}>
    {[...Array(n)].map((_, i) => {
      const x = x0 + hash(i) * w;
      const y = y0 + ((hash(i + 99) * h + f * speed * (0.8 + hash(i + 7) * 0.4)) % h);
      return (
        <line
          key={i}
          x1={x}
          y1={y}
          x2={x - 6}
          y2={y + 34}
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />
      );
    })}
  </g>
);

export const Cloud: React.FC<{x: number; y: number; s?: number; color?: string; o?: number}> = ({
  x,
  y,
  s = 1,
  color = C.pastDim,
  o = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={o} fill={color}>
    <circle cx={-50} cy={10} r={42} />
    <circle cx={0} cy={-14} r={56} />
    <circle cx={55} cy={8} r={44} />
    <rect x={-92} y={8} width={190} height={46} rx={23} />
  </g>
);

export const Sprout: React.FC<{x: number; y: number; g: number; s?: number; color?: string}> = ({
  x,
  y,
  g,
  s = 1,
  color = C.leaf,
}) => {
  if (g <= 0) return null;
  const h = 46 * g;
  const leaf = Math.max(0, (g - 0.35) / 0.65);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <line x1={0} y1={0} x2={0} y2={-h} stroke={color} strokeWidth={5} strokeLinecap="round" />
      <ellipse
        cx={-14 * leaf}
        cy={-h + 4}
        rx={16 * leaf}
        ry={8 * leaf}
        fill={color}
        transform={`rotate(-28 ${-14 * leaf} ${-h + 4})`}
      />
      <ellipse
        cx={14 * leaf}
        cy={-h - 6}
        rx={16 * leaf}
        ry={8 * leaf}
        fill={color}
        transform={`rotate(28 ${14 * leaf} ${-h - 6})`}
      />
    </g>
  );
};

export const Sun: React.FC<{x: number; y: number; r: number; o: number}> = ({x, y, r, o}) => (
  <g opacity={o}>
    <Glow
      x={x}
      y={y}
      r={r * 4}
      color={C.dawn}
      o={0.55}
      id={`sun${Math.round(x)}${Math.round(y)}`}
    />
    <circle cx={x} cy={y} r={r} fill={C.dawn} />
  </g>
);

// Polaroid: ivory frame, photo area w×w*1.0, thicker bottom margin; children are drawn in photo coords (0..W, 0..H).
export const PW = 640,
  PH = 700;
export const Polaroid: React.FC<{
  x: number;
  y: number;
  s?: number;
  rot?: number;
  children: React.ReactNode;
  id: string;
  label?: string;
}> = ({x, y, s = 1, rot = -3, children, id, label = 'ngày đó'}) => (
  <g
    transform={`translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(${-PW / 2 - 34} ${-(PH + 150) / 2})`}
  >
    <rect x={10} y={16} width={PW + 68} height={PH + 150} rx={10} fill="#000" opacity={0.35} />
    <rect x={0} y={0} width={PW + 68} height={PH + 150} rx={10} fill={C.ivory} />
    <defs>
      <clipPath id={id}>
        <rect x={34} y={34} width={PW} height={PH} rx={4} />
      </clipPath>
    </defs>
    <g clipPath={`url(#${id})`}>
      <g transform="translate(34 34)">{children}</g>
    </g>
    <rect
      x={34}
      y={34}
      width={PW}
      height={PH}
      rx={4}
      fill="none"
      stroke="rgba(0,0,0,.18)"
      strokeWidth={2}
    />
    <text
      x={PW / 2 + 34}
      y={PH + 112}
      textAnchor="middle"
      fontFamily={Lora}
      fontStyle="italic"
      fontSize={38}
      fill="#6d675c"
    >
      {label}
    </text>
  </g>
);
