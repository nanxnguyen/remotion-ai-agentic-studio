import React from 'react';
import {Easing, Sequence, interpolate, spring, useCurrentFrame} from 'remotion';

// Shared stick-figure toolkit for the "truongthanh" videos (black bg, white pictograms, orange accent).
export const OR = '#f58b4c';
export const GRAY = '#8f8f8f';
export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
export const soft = Easing.bezier(0.25, 0.46, 0.45, 0.94);
export const sans: React.CSSProperties = {fontFamily: 'Inter', fontWeight: 700, color: '#fff'};
export const mono: React.CSSProperties = {fontFamily: 'JetBrains Mono', color: '#fff'};
export const sp = (frame: number, damping = 16, stiffness = 120) => spring({frame: Math.max(0, frame), fps: 30, config: {damping, stiffness, mass: 0.9}});
export const vis = (f: number, a: number, b: number) => interpolate(f, [a, a + 8, b - 8, b], [a === 0 ? 1 : 0, 1, 1, 0], clamp);

// ---------- pictogram figure ----------
export type V = [number, number];
export type Pose = {head: V; sh: V; hip: V; eL: V; hL: V; eR: V; hR: V; kL: V; fL: V; kR: V; fR: V};
export const STAND: Pose = {head: [0, -235], sh: [0, -150], hip: [0, 0], eL: [-75, -85], hL: [-85, -10], eR: [75, -85], hR: [85, -10], kL: [-32, 125], fL: [-42, 255], kR: [32, 125], fR: [42, 255]};
export const SIT: Pose = {head: [10, -225], sh: [0, -145], hip: [0, 0], eL: [40, -70], hL: [110, -60], eR: [60, -60], hR: [130, -50], kL: [115, -5], fL: [125, 125], kR: [150, 0], fR: [160, 130]};
export const UP: Pose = {...STAND, eL: [-85, -200], hL: [-105, -300], eR: [85, -200], hR: [105, -300]};
export const mix = (a: Pose, b: Pose, t: number): Pose => {
  const o = {} as Pose;
  (Object.keys(a) as (keyof Pose)[]).forEach(k => { o[k] = [a[k][0] + (b[k][0] - a[k][0]) * t, a[k][1] + (b[k][1] - a[k][1]) * t]; });
  return o;
};
export const walk = (f: number, amp = 1, base: Pose = STAND): Pose => {
  const s = Math.sin(f / 5) * amp;
  return {...base, kL: [-32 + s * 36, 125], fL: [-42 + s * 80, 255 - Math.abs(s) * 20], kR: [32 - s * 36, 125], fR: [42 - s * 80, 255 - Math.abs(s) * 20], hL: [-85 + s * 40, -10], hR: [85 - s * 40, -10]};
};

export const Fig: React.FC<{x: number; y: number; pose: Pose; scale?: number; face?: 'frown' | 'smile' | 'o' | 'calm' | 'none'; opacity?: number; flip?: boolean; color?: string; ink?: string}> = ({x, y, pose: p, scale = 1, face = 'frown', opacity = 1, flip = false, color = '#fff', ink = '#000'}) => {
  const L = (a: V, b: V, w: number) => <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth={w} strokeLinecap="round" />;
  const [hx, hy] = p.head;
  return <g opacity={opacity} transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
    {L(p.hip, p.kL, 36)}{L(p.kL, p.fL, 36)}{L(p.hip, p.kR, 36)}{L(p.kR, p.fR, 36)}
    {L(p.sh, p.hip, 66)}
    {L(p.sh, p.eL, 30)}{L(p.eL, p.hL, 30)}{L(p.sh, p.eR, 30)}{L(p.eR, p.hR, 30)}
    <circle cx={hx} cy={hy} r="58" fill={color} />
    {face !== 'none' && <><circle cx={hx - 20} cy={hy - 8} r="6" fill={ink} /><circle cx={hx + 20} cy={hy - 8} r="6" fill={ink} /></>}
    {face === 'frown' && <path d={`M ${hx - 20} ${hy + 26} Q ${hx} ${hy + 10} ${hx + 20} ${hy + 26}`} stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />}
    {face === 'smile' && <path d={`M ${hx - 22} ${hy + 14} Q ${hx} ${hy + 34} ${hx + 22} ${hy + 14}`} stroke={ink} strokeWidth="6" fill="none" strokeLinecap="round" />}
    {face === 'o' && <circle cx={hx} cy={hy + 24} r="9" fill={ink} />}
    {face === 'calm' && <line x1={hx - 14} y1={hy + 22} x2={hx + 14} y2={hy + 22} stroke={ink} strokeWidth="6" strokeLinecap="round" />}
  </g>;
};

export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}><g transform="translate(540 1450) scale(1.2) translate(-540 -1360)">{children}</g></svg>;
export const GY = 1360; // ground

// ---------- text on top (acts as caption) ----------
export const Top: React.FC<{text: string; accent?: string}> = ({text, accent}) => {
  const f = useCurrentFrame();
  const parts = accent ? text.split(accent) : [text];
  return <div style={{position: 'absolute', left: 90, right: 90, top: 250, textAlign: 'center', ...sans, fontSize: 68, lineHeight: 1.2, opacity: interpolate(f, [0, 9], [0, 1], clamp), transform: `translateY(${interpolate(f, [0, 12], [18, 0], {...clamp, easing: soft})}px)`}}>
    {accent && parts.length === 2 ? <>{parts[0]}<span style={{color: OR}}>{accent}</span>{parts[1]}</> : text}
  </div>;
};

export const Caps: React.FC<{sec: number; duration: number; voiceOffset?: number; parts: string[]; accents?: string[]}> = ({sec, duration, voiceOffset = 4, parts, accents = []}) => {
  const total = parts.join('').length;
  let acc = 0;
  return <>{parts.map((t, i) => {
    const from = voiceOffset + Math.round((acc / total) * sec * 30);
    acc += t.length;
    const end = i === parts.length - 1 ? duration : voiceOffset + Math.round((acc / total) * sec * 30);
    return <Sequence key={i} from={from} durationInFrames={Math.max(12, end - from)}><Top text={t} accent={accents[i]} /></Sequence>;
  })}</>;
};

export const Tag: React.FC = () => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 228, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: 0.85}}>
    <svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="34" r="12" fill={GRAY} />{[...Array(7)].map((_, i) => { const a = Math.PI + (i / 6) * Math.PI; return <line key={i} x1={28 + Math.cos(a) * 18} y1={34 + Math.sin(a) * 18} x2={28 + Math.cos(a) * 26} y2={34 + Math.sin(a) * 26} stroke={GRAY} strokeWidth="4" strokeLinecap="round" />; })}</svg>
    <div style={{...sans, fontSize: 44, color: GRAY}}>Thức dậy đi</div>
  </div>
);

export const bob = (f: number) => Math.sin(f / 9) * 4;
