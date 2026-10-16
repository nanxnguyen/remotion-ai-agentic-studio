import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Caps, Fig, GRAY, GY, OR, SIT, STAND, Stage, Tag, bob, clamp, mix, soft} from '../stick';
import {TT2_SHOTS} from './timeline';

const ease = {...clamp, easing: soft};
const prog = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], ease);

// ---------- S4: nghĩ đến mẹ, cửa trống ----------
export const Tt2S4: React.FC = () => {
  const f = useCurrentFrame();
  const D = TT2_SHOTS.s4.duration;
  const p = f / D;
  const fadeIn = prog(p, 0, 0.1);
  const ghost = prog(p, 0.12, 0.3) * (1 - prog(p, 0.55, 0.78)) * 0.28;
  const drift = prog(p, 0.55, 0.78) * 30; // bóng trôi nhẹ ra xa khi mờ
  const gaze = prog(p, 0.1, 0.3); // quay nhìn bóng mẹ
  const doorIn = prog(p, 0.4, 0.55);
  return (
    <AbsoluteFill>
      <Stage>
        <Fig x={380} y={GY - 255 + bob(f)} pose={mix(STAND, {...STAND, head: [14, -233]}, gaze)} opacity={fadeIn} face="frown" />
        <Fig x={600 + drift} y={GY - 255 + bob(f + 12)} pose={STAND} opacity={ghost} face="frown" />
        <g opacity={doorIn * 0.9}>
          <rect x={800} y={GY - 330} width={140} height={330} rx={6} fill="none" stroke={GRAY} strokeWidth={10} />
          <circle cx={915} cy={GY - 160} r={7} fill={GRAY} />
        </g>
        <line x1={90} y1={GY} x2={990} y2={GY} stroke={GRAY} strokeWidth={3} opacity={0.35 * fadeIn} />
      </Stage>
      <Caps sec={TT2_SHOTS.s4.sec} duration={D} parts={['Cô nghĩ đến mẹ.', 'Đến lúc quay về, không ai chờ.']} accents={['mẹ', 'không ai chờ']} />
      <Tag />
    </AbsoluteFill>
  );
};

// ---------- S5: tay run, bấm gửi ----------
export const Tt2S5: React.FC = () => {
  const f = useCurrentFrame();
  const D = TT2_SHOTS.s5.duration;
  const p = f / D;
  const appear = prog(p, 0, 0.1);
  const shake = Math.sin(f * 1.3) * 3.2 * (1 - prog(p, 0.45, 0.55)) + Math.sin(f * 0.7) * 1.2 * (1 - prog(p, 0.45, 0.55));
  const press = prog(p, 0.52, 0.58) * (1 - prog(p, 0.64, 0.72)); // ngón nhấn xuống
  const click = prog(p, 0.56, 0.74);
  const fly = prog(p, 0.62, 0.9);
  const mx = 560, my = 1190;
  const fy = my - 150 + press * 38 + bob(f) * 0.3;
  const hx = mx + shake;
  return (
    <AbsoluteFill>
      <Stage>
        <g opacity={appear}>
          {/* chuột */}
          <rect x={mx - 90} y={my - 60} width={180} height={250} rx={90} fill="#2a2a2a" stroke={GRAY} strokeWidth={6} />
          <line x1={mx} y1={my - 60} x2={mx} y2={my + 40} stroke={GRAY} strokeWidth={5} />
          {/* cánh tay + bàn tay trắng */}
          <g transform={`translate(${shake} 0)`}>
            <line x1={mx + 420} y1={my + 330} x2={mx + 120} y2={my + 110} stroke="#fff" strokeWidth={64} strokeLinecap="round" />
            <rect x={mx - 85} y={my - 20} width={190} height={170} rx={70} fill="#fff" />
            <line x1={mx - 20} y1={my + 10} x2={hx - 20 - shake} y2={fy + 30} stroke="#fff" strokeWidth={46} strokeLinecap="round" />
          </g>
        </g>
        {/* click: vòng cam nở rồi tan */}
        {click > 0 && click < 1 && <circle cx={mx - 20} cy={my + 20} r={30 + click * 150} fill="none" stroke={OR} strokeWidth={10 * (1 - click) + 1} opacity={1 - click} />}
        {/* phong bì bay lên */}
        {fly > 0 && (
          <g transform={`translate(${mx - 20} ${my - 120 - fly * 330}) scale(${1 - fly * 0.25})`} opacity={interpolate(fly, [0, 0.15, 0.8, 1], [0, 1, 1, 0], clamp)}>
            <rect x={-70} y={-48} width={140} height={96} rx={8} fill="#fff" />
            <path d="M -70 -42 L 0 14 L 70 -42" fill="none" stroke={OR} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round" />
          </g>
        )}
      </Stage>
      <Caps sec={TT2_SHOTS.s5.sec} duration={D} parts={['Tay cô run.', 'Nhưng cô vẫn bấm gửi.']} accents={['run', 'bấm gửi']} />
      <Tag />
    </AbsoluteFill>
  );
};

// ---------- S6: khóc, giọt rơi ----------
export const Tt2S6: React.FC = () => {
  const f = useCurrentFrame();
  const D = TT2_SHOTS.s6.duration;
  const p = f / D;
  const appear = prog(p, 0, 0.12);
  const bow = prog(p, 0.1, 0.35);
  const shoulder = Math.sin(f / 4) * 1.6 * bow;
  const pose = mix(SIT, {...SIT, head: [58, -188], sh: [0, -145 + shoulder]}, bow);
  const bx = 400, hipY = GY - 130 + bob(f) * 0.3;
  // giọt: hình thành (0.3-0.45), rơi chậm (0.45-0.7), chạm đất -> gợn
  const hx = bx + pose.head[0] + 8, hy0 = hipY + pose.head[1] + 62;
  const form = prog(p, 0.3, 0.45);
  const fall = prog(p, 0.45, 0.7);
  const ripple = prog(p, 0.7, 0.95);
  const ty = interpolate(fall, [0, 1], [hy0, GY - 8], {...clamp, easing: (t: number) => t * t});
  return (
    <AbsoluteFill>
      <Stage>
        <line x1={90} y1={GY} x2={990} y2={GY} stroke={GRAY} strokeWidth={3} opacity={0.35 * appear} />
        <Fig x={bx} y={hipY} pose={pose} face="frown" opacity={appear} />
        {form > 0 && fall < 1 && <ellipse cx={hx} cy={ty} rx={9 * form} ry={13 * form} fill={OR} />}
        {ripple > 0 && ripple < 1 && [0, 0.3].map((d, i) => {
          const r = Math.max(0, ripple - d) / (1 - d);
          return r > 0 ? <ellipse key={i} cx={hx} cy={GY} rx={10 + r * 50} ry={3 + r * 10} fill="none" stroke={OR} strokeWidth={5} opacity={1 - r} /> : null;
        })}
      </Stage>
      <Caps sec={TT2_SHOTS.s6.sec} duration={D} parts={['Rồi cô khóc.', 'Giá đầu tiên, nặng hơn cô tưởng.']} accents={['khóc', 'Giá đầu tiên']} />
      <Tag />
    </AbsoluteFill>
  );
};
