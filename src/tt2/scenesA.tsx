import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Caps, Fig, GRAY, GY, OR, SIT, Stage, Tag, bob, clamp, mix, mono, sans, soft} from '../stick';
import {TT2_SHOTS, TT2_VOICE_OFFSET} from './timeline';
import type {Pose} from '../stick';

// Start frame of each caption part (same rule as <Caps/>), so visuals follow the spoken sentences.
const starts = (parts: string[], sec: number) => {
  const total = parts.join('').length;
  let acc = 0;
  return parts.map(t => { const s = TT2_VOICE_OFFSET + Math.round((acc / total) * sec * 30); acc += t.length; return s; });
};
const ramp = (f: number, a: number, len = 14) => interpolate(f, [a, a + len], [0, 1], {...clamp, easing: soft});

const Desk: React.FC<{x1?: number}> = ({x1 = 470}) => <g fill="#fff">
  <rect x={x1} y={1190} width={940 - x1} height={16} rx={6} />
  <rect x={900} y={1206} width={16} height={GY - 1206} />
</g>;

// ---------------- S1 ----------------
const P1 = ['Lan hai mươi sáu tuổi.', 'Ba tiếng rồi, cô chưa bấm gửi.'];
export const Tt2S1: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = TT2_SHOTS.s1;
  const [, b] = starts(P1, sec);
  const on = ramp(f, 4, 26); // laptop lights up
  const t2 = ramp(f, b, 16); // sentence 2: clock appears
  const slump = ramp(f, b + 20, 30);
  const pose: Pose = mix(SIT, {...SIT, head: [26, -205], sh: [4, -138]}, slump);
  const hand = f > b ? 1 : 0;
  const ang = interpolate(f, [b, D - 10], [0, 3 * 360], clamp);
  return <AbsoluteFill style={{background: '#000'}}>
    <Stage>
      <Desk />
      {/* laptop */}
      <rect x={640} y={1176} width={250} height={14} rx={5} fill="#d9d9d9" />
      <rect x={690} y={1010} width={200} height={168} rx={10} fill="#d9d9d9" opacity={0.25 + on * 0.75} />
      <rect x={702} y={1022} width={176} height={144} rx={5} fill="#000" />
      <rect x={702} y={1022} width={176} height={144} rx={5} fill="#fff" opacity={on * 0.9} />
      <g opacity={on}>
        <rect x={718} y={1042} width={90} height={9} rx={4} fill="#000" opacity={0.55} />
        <rect x={718} y={1066} width={140} height={9} rx={4} fill="#000" opacity={0.35} />
        <rect x={718} y={1090} width={120} height={9} rx={4} fill="#000" opacity={0.35} />
        <rect x={718} y={1130} width={70} height={22} rx={6} fill={OR} opacity={hand * (0.5 + 0.5 * Math.abs(Math.sin(f / 10)))} />
      </g>
      <Fig x={380} y={1230 + bob(f)} pose={pose} face="frown" />
      {/* clock = "3 tiếng" */}
      <g opacity={t2} transform={`translate(800 800)`}>
        <circle r={78} fill="none" stroke="#fff" strokeWidth={10} />
        {[0, 90, 180, 270].map(a => <line key={a} x1={0} y1={-62} x2={0} y2={-50} stroke="#fff" strokeWidth={6} strokeLinecap="round" transform={`rotate(${a})`} />)}
        <line x1={0} y1={0} x2={0} y2={-52} stroke={OR} strokeWidth={8} strokeLinecap="round" transform={`rotate(${ang})`} />
        <line x1={0} y1={0} x2={0} y2={-34} stroke="#fff" strokeWidth={8} strokeLinecap="round" transform={`rotate(${ang / 12})`} />
        <circle r={8} fill="#fff" />
        <text y={128} textAnchor="middle" fontSize={54} style={{...mono, fontWeight: 700}} fill="#fff">3h</text>
      </g>
    </Stage>
    <Caps sec={sec} duration={D} parts={P1} accents={['', 'Ba tiếng']} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 300, textAlign: 'center', ...sans, fontWeight: 500, fontSize: 36, color: GRAY}}>Nhân vật minh họa</div>
    <Tag />
  </AbsoluteFill>;
};

// ---------------- S2 ----------------
const P2 = ['Email chỉ một dòng: em xin nghỉ việc.', 'Trong đầu, lỡ sai thì sao?'];
const TYPED = 'em xin nghỉ việc';
export const Tt2S2: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = TT2_SHOTS.s2;
  const [, b] = starts(P2, sec);
  const win = ramp(f, 2, 18);
  const n = Math.round(interpolate(f, [18, Math.max(30, b - 12)], [0, TYPED.length], clamp));
  const cursor = Math.floor(f / 12) % 2 === 0 ? 1 : 0.15;
  const qs = [[130, 1010, 0], [480, 1010, 9], [530, 1110, 18]] as const;
  return <AbsoluteFill style={{background: '#000'}}>
    <Stage>
      <g opacity={win}>
        <rect x={140} y={600} width={800} height={310} rx={22} fill="#000" stroke="#fff" strokeWidth={8} />
        <rect x={140} y={600} width={800} height={64} rx={22} fill="#fff" />
        <rect x={140} y={640} width={800} height={24} fill="#fff" />
        <circle cx={186} cy={632} r={9} fill="#000" /><circle cx={218} cy={632} r={9} fill="#000" /><circle cx={250} cy={632} r={9} fill={OR} />
        <text x={180} y={724} fontSize={36} fill={GRAY} style={mono}>Đến: sếp</text>
        <line x1={170} y1={744} x2={910} y2={744} stroke={GRAY} strokeWidth={3} />
        <text x={180} y={826} fontSize={52} fill="#fff" style={{...mono, fontWeight: 700}}>{TYPED.slice(0, n)}</text>
        <rect x={180 + n * 31.2} y={786} width={5} height={52} fill={OR} opacity={cursor} />
        <rect x={730} y={850} width={160} height={44} rx={10} fill={OR} opacity={n >= TYPED.length ? 1 : 0.4} />
        <text x={810} y={884} textAnchor="middle" fontSize={30} fill="#000" style={{...sans, color: '#000'}}>Gửi</text>
      </g>
      <Fig x={300} y={1230 + bob(f)} pose={SIT} scale={0.95} face="frown" />
      <Desk x1={430} />
      {qs.map(([x, y, d], i) => {
        const o = ramp(f, b + d, 12);
        return <text key={i} x={x} y={y + Math.sin((f + d * 3) / 9) * 8} textAnchor="middle" fontSize={96} opacity={o} fill={OR} style={{...sans, color: OR}}>?</text>;
      })}
    </Stage>
    <Caps sec={sec} duration={D} parts={P2} accents={['nghỉ việc', 'lỡ sai thì sao']} />
    <Tag />
  </AbsoluteFill>;
};

// ---------------- S3 ----------------
const P3 = ['Việc cũ đâu tệ.', 'Chỉ là chiều Chủ nhật nào cô cũng nghẹn.'];
export const Tt2S3: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = TT2_SHOTS.s3;
  const [, b] = starts(P3, sec);
  const chest = ramp(f, b - 6, 20);
  const heavy = ramp(f, b + 10, 40);
  const dim = ramp(f, b, 60);
  const base: Pose = {...SIT, eL: [30, -75], hL: [60, -75], eR: [45, -70], hR: [75, -70]};
  const hold: Pose = {...base, head: [14, -222], sh: [4, -143], eL: [40, -70], hL: [20, -125], eR: [52, -62], hR: [86, -60]};
  const pose = mix(mix(base, hold, chest), {...hold, head: [30, -198], sh: [8, -132]}, heavy);
  const sunY = interpolate(f, [0, b, D], [880, 900, 1070], {...clamp, easing: soft});
  const sunO = 0.95 - dim * 0.7;
  return <AbsoluteFill style={{background: '#000'}}>
    <Stage>
      <defs><clipPath id="win3"><rect x={590} y={640} width={340} height={470} /></clipPath></defs>
      <rect x={590} y={640} width={340} height={470} fill="#000" stroke="#fff" strokeWidth={10} />
      <g clipPath="url(#win3)"><circle cx={760} cy={sunY} r={78} fill={OR} opacity={sunO} /></g>
      <line x1={760} y1={640} x2={760} y2={1110} stroke="#fff" strokeWidth={8} />
      <line x1={590} y1={875} x2={930} y2={875} stroke="#fff" strokeWidth={8} />
      <rect x={570} y={1110} width={380} height={14} rx={6} fill="#fff" />
      <rect x={110} y={1330} width={860} height={8} rx={4} fill={GRAY} />
      <Fig x={330} y={1230 + bob(f) * (1 - heavy * 0.6)} pose={pose} face="frown" />
      <rect x={-100} y={500} width={1300} height={1000} fill="#000" opacity={dim * 0.3} />
    </Stage>
    <Caps sec={sec} duration={D} parts={P3} accents={['tệ', 'nghẹn']} />
    <Tag />
  </AbsoluteFill>;
};
