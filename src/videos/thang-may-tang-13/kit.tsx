import React from 'react';
import {
  AbsoluteFill,
  Img,
  continueRender,
  delayRender,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {EASE, ramp} from '../../core';

// thang-may-tang-13 visual kit: photoreal Gemini plates (NO_CARTOON_ART_V1) with
// camera motion, light flicker and particle overlays. All motion is frame-derived.

export const C = {
  ivory: '#F7F1E8',
  amber: '#F5C467',
  red: '#ED3E4C',
  led: '#FF2A2A',
};

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------- fonts (Lexend Bold, Vietnamese + Latin subsets) ----------
const RANGES = {
  LA: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  LE: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
  VN: 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB',
};
export const FONT = "'TM13 Lexend', sans-serif";
if (typeof document !== 'undefined' && !(window as unknown as {tm13Fonts?: boolean}).tm13Fonts) {
  (window as unknown as {tm13Fonts?: boolean}).tm13Fonts = true;
  const handle = delayRender('tm13 fonts');
  const faces = (Object.keys(RANGES) as (keyof typeof RANGES)[]).map(
    (k) =>
      new FontFace('TM13 Lexend', `url(${staticFile(`fonts/Lexend-Bold-${k}.woff2`)}) format('woff2')`, {
        weight: '700',
        unicodeRange: RANGES[k],
      }),
  );
  Promise.all(faces.map((f) => f.load()))
    .then((loaded) => {
      loaded.forEach((f) => document.fonts.add(f));
      continueRender(handle);
    })
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}

export const img = (id: string) => staticFile(`images/thang-may-tang-13/${id}.jpg`);

// ---------- photo plate with eased camera move ----------
export type Move = {
  from?: [number, number, number]; // scale, x%, y%
  to?: [number, number, number];
};

export const Plate: React.FC<{
  id: string;
  dur: number;
  move?: Move;
  start?: number;
  brightness?: (f: number) => number;
  style?: React.CSSProperties;
}> = ({id, dur, move, start = 0, brightness, style}) => {
  const f = useCurrentFrame();
  const [s0, x0, y0] = move?.from ?? [1.06, 0, 0];
  const [s1, x1, y1] = move?.to ?? [1.14, 0, -1];
  const t = ramp(f, start, dur, EASE.smooth);
  const s = s0 + (s1 - s0) * t;
  const x = x0 + (x1 - x0) * t;
  const y = y0 + (y1 - y0) * t;
  const b = brightness ? brightness(f) : 1;
  return (
    <AbsoluteFill style={{overflow: 'hidden', ...style}}>
      <Img
        src={img(id)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translate(${x}%, ${y}%) scale(${s})`,
          filter: b === 1 ? undefined : `brightness(${b})`,
        }}
      />
    </AbsoluteFill>
  );
};

// Crossfade helper: fade a layer in over `len` frames starting at `at`.
export const fadeIn = (f: number, at: number, len = 13) =>
  interpolate(f, [at, at + len], [0, 1], {...clamp, easing: EASE.smooth});

// ---------- grade: vignette, grain, gentle tube flicker ----------
export const Grade: React.FC<{flicker?: number; tint?: string}> = ({flicker = 0, tint}) => {
  const f = useCurrentFrame();
  const fl = flicker
    ? 1 - flicker * (0.5 + 0.5 * Math.sin(f * 0.9) * Math.sin(f * 0.37)) * (random(`fl${Math.floor(f / 3)}`) > 0.82 ? 1 : 0.25)
    : 1;
  const seed = Math.floor(f / 2) % 8;
  return (
    <>
      {tint ? <AbsoluteFill style={{background: tint, mixBlendMode: 'soft-light'}} /> : null}
      <AbsoluteFill style={{background: '#000', opacity: 1 - fl}} />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,.55) 85%, rgba(0,0,0,.85) 100%)',
        }}
      />
      <AbsoluteFill style={{opacity: 0.07, mixBlendMode: 'overlay'}}>
        <svg width="100%" height="100%">
          <filter id={`g${seed}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} />
          </filter>
          <rect width="100%" height="100%" filter={`url(#g${seed})`} />
        </svg>
      </AbsoluteFill>
    </>
  );
};

// ---------- particles (smoke, ash) ----------
export const Particles: React.FC<{
  n: number;
  kind: 'ash' | 'smoke' | 'dust';
  seed: string;
  rise?: number;
  area?: [number, number, number, number]; // x0,y0,x1,y1 in px
  opacity?: number;
}> = ({n, kind, seed, rise = 1, area = [0, 0, 1080, 1920], opacity = 1}) => {
  const f = useCurrentFrame();
  const [ax0, ay0, ax1, ay1] = area;
  return (
    <AbsoluteFill style={{pointerEvents: 'none', opacity}}>
      {new Array(n).fill(0).map((_, i) => {
        const rx = random(`${seed}x${i}`);
        const ry = random(`${seed}y${i}`);
        const rs = random(`${seed}s${i}`);
        const speed = (0.6 + rs) * rise;
        const h = ay1 - ay0;
        const y = ay0 + ((ry * h - f * speed * 2.2) % h + h) % h;
        const x = ax0 + rx * (ax1 - ax0) + Math.sin(f / (30 + rs * 40) + i) * 18;
        const size = kind === 'smoke' ? 60 + rs * 120 : kind === 'ash' ? 3 + rs * 6 : 2 + rs * 3;
        const color = kind === 'ash' ? '#b9b2a8' : kind === 'smoke' ? 'rgba(220,215,205,0.10)' : '#e8e0d0';
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: kind === 'ash' ? size * 0.7 : size,
              borderRadius: kind === 'ash' ? 2 : '50%',
              background: color,
              opacity: kind === 'smoke' ? 0.7 : 0.35 + rs * 0.5,
              filter: kind === 'smoke' ? 'blur(26px)' : undefined,
              transform: `rotate(${(f * (rs - 0.5) * 4 + i * 37) % 360}deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- 7-segment LED digits for the elevator display ----------
const SEG: Record<string, string> = {
  '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc',
  '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcdfg',
};
export const Led: React.FC<{text: string; size: number; on?: number}> = ({text, size, on = 1}) => {
  const w = 0.55 * size;
  const t = 0.11 * size;
  const gap = 0.2 * size;
  const segs = (d: string, ox: number) => {
    const P: Record<string, [number, number, number, number]> = {
      a: [ox + t, 0, w - 2 * t, t], g: [ox + t, size / 2 - t / 2, w - 2 * t, t], d: [ox + t, size - t, w - 2 * t, t],
      f: [ox, t, t, size / 2 - 1.5 * t], b: [ox + w - t, t, t, size / 2 - 1.5 * t],
      e: [ox, size / 2 + t / 2, t, size / 2 - 1.5 * t], c: [ox + w - t, size / 2 + t / 2, t, size / 2 - 1.5 * t],
    };
    return Object.entries(P).map(([k, [x, y, ww, hh]]) => (
      <rect key={k + ox} x={x} y={y} width={ww} height={hh} rx={t / 3}
        fill={SEG[d]?.includes(k) ? C.led : 'rgba(80,0,0,.35)'} opacity={SEG[d]?.includes(k) ? on : 1} />
    ));
  };
  const width = text.length * w + (text.length - 1) * gap;
  return (
    <svg width={width} height={size} style={{overflow: 'visible', filter: `drop-shadow(0 0 ${size * 0.12}px ${C.led})`}}>
      {text.split('').map((d, i) => segs(d, i * (w + gap)))}
    </svg>
  );
};

// ---------- captions (native Vietnamese text, never baked into plates) ----------
export type Cap = {start: number; end: number; text: string; color: 'white' | 'amber' | 'red'};
const COLOR = {white: C.ivory, amber: C.amber, red: C.red};

export const Captions: React.FC<{caps: readonly Cap[]; fps: number; top?: number}> = ({caps, fps, top = 1330}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{background: 'linear-gradient(180deg, rgba(0,0,0,0) 62%, rgba(0,0,0,.62) 78%, rgba(0,0,0,.8) 100%)'}}
      />
      {caps.map((c, i) => {
        const a = Math.round(c.start * fps);
        const b = Math.round(c.end * fps);
        if (f < a - 1 || f > b + 8) return null;
        const inT = ramp(f, a, 9, EASE.out);
        const outT = 1 - ramp(f, b, 8, EASE.smooth);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 70,
              right: 70,
              top,
              textAlign: 'center',
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: c.text.length > 22 ? 62 : 72,
              lineHeight: 1.18,
              letterSpacing: 0.5,
              color: COLOR[c.color],
              textShadow: '0 3px 14px rgba(0,0,0,.95), 0 0 2px rgba(0,0,0,1)',
              opacity: Math.min(inT, outT),
              transform: `translateY(${(1 - inT) * 22}px)`,
              filter: inT < 0.98 ? `blur(${(1 - inT) * 6}px)` : undefined,
            }}
          >
            {c.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Small in-world label (TV lower third, phone, seal) — composited text, not generated.
export const Label: React.FC<{
  children: React.ReactNode;
  x: number;
  y: number;
  w?: number;
  size: number;
  color?: string;
  bg?: string;
  rot?: number;
  opacity?: number;
  align?: 'left' | 'center';
  font?: string;
}> = ({children, x, y, w, size, color = '#fff', bg, rot = 0, opacity = 1, align = 'left', font = FONT}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      fontFamily: font,
      fontWeight: 700,
      fontSize: size,
      color,
      background: bg,
      padding: bg ? `${size * 0.2}px ${size * 0.4}px` : 0,
      transform: `rotate(${rot}deg)`,
      transformOrigin: 'left top',
      opacity,
      textAlign: align,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);
