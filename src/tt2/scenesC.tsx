import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Caps, Fig, GRAY, GY, OR, Pose, STAND, SIT, UP, Stage, Tag, bob, clamp, mix, mono, sans, soft, sp} from '../stick';
import {TT2_SHOTS} from './timeline';

const Sun: React.FC<{y: number; r: number; o: number; f: number}> = ({y, r, o, f}) => (
  <g transform={`translate(540 ${y})`} opacity={o}>
    {[...Array(12)].map((_, i) => { const a = (i / 12) * Math.PI * 2 + f * 0.006; return <line key={i} x1={Math.cos(a) * r * 1.25} y1={Math.sin(a) * r * 1.25} x2={Math.cos(a) * r * 1.55} y2={Math.sin(a) * r * 1.55} stroke={OR} strokeWidth="10" strokeLinecap="round" />; })}
    <circle r={r} fill={OR} />
  </g>
);

// ---------- S7: "Trưởng thành không phải hết sợ. / Là vẫn sợ, mà vẫn bấm gửi." ----------
export const Tt2S7: React.FC = () => {
  const f = useCurrentFrame();
  const {duration: D, sec} = TT2_SHOTS.s7;
  const V = sec * 30; // voice span
  const p = (a: number, b: number) => interpolate(f, [a * V, b * V], [0, 1], {...clamp, easing: soft}); // fractions of voice
  const rise = p(0.5, 0.68);
  const hands = p(0.68, 0.88);
  const sun = p(0.55, 0.95);
  const tremble = 1 - hands * 0.8;
  const t = (k: number) => Math.sin(f * 0.9 + k) * 4 * tremble;
  let pose: Pose = mix(mix({...SIT, head: [30, -208]}, STAND, rise), UP, hands);
  pose = {...pose, hR: [pose.hR[0] + t(0), pose.hR[1] + t(2)], hL: [pose.hL[0] + t(1), pose.hL[1] + t(3)]};
  const hipY = (GY - 130) + ((GY - 255) - (GY - 130)) * rise;
  return <AbsoluteFill>
    <Stage>
      <Sun y={1130 - sun * 120} r={50 + sun * 110} o={sun} f={f} />
      {rise < 0.5 && <><rect x="400" y={GY - 100} width="280" height="26" rx="13" fill={GRAY} /><rect x="430" y={GY - 74} width="22" height="74" fill={GRAY} /><rect x="630" y={GY - 74} width="22" height="74" fill={GRAY} /></>}
      <Fig x={500 + 40 * rise} y={hipY + bob(f) * 0.5} pose={pose} face={rise > 0.5 ? 'smile' : 'frown'} />
    </Stage>
    <Caps sec={sec} duration={D} parts={['Trưởng thành không phải hết sợ.', 'Là vẫn sợ, mà vẫn bấm gửi.']} accents={['hết sợ', 'vẫn sợ, mà vẫn bấm gửi']} />
    <Tag />
  </AbsoluteFill>;
};

// ---------- S8: "Còn bạn, chần chừ nút nào? / Thức dậy đi. / Hôm nay, trả một khoản nhỏ." ----------
const OPEN: Pose = {...STAND, eL: [-105, -120], hL: [-175, -75], eR: [105, -120], hR: [175, -75]};
export const Tt2S8: React.FC = () => {
  const f = useCurrentFrame();
  const {duration: D, sec} = TT2_SHOTS.s8;
  const V = sec * 30;
  const p = (a: number, b: number) => interpolate(f, [a * V, b * V], [0, 1], {...clamp, easing: soft});
  const open = p(0.05, 0.3);
  const sun = p(0.3, 0.8);
  const chips = (i: number) => sp(f - (0.68 * V + i * 8), 18, 110);
  const pose = mix(STAND, OPEN, open);
  return <AbsoluteFill>
    <Stage>
      <Sun y={1180 - sun * 190} r={80 + sun * 140} o={interpolate(f, [0.25 * V, 0.4 * V], [0, 1], clamp)} f={f} />
      <Fig x={540} y={GY - 255 + bob(f)} pose={pose} face="smile" />
    </Stage>
    <Caps sec={sec} duration={D} parts={['Còn bạn, chần chừ nút nào?', 'Thức dậy đi.', 'Hôm nay, trả một khoản nhỏ.']} accents={['chần chừ nút nào', 'Thức dậy đi', 'một khoản nhỏ']} />
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 228, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, opacity: sp(f - 0.68 * V, 18, 110)}}>
      <div style={{...sans, fontSize: 40, color: GRAY}}>Thức dậy đi</div>
      <div style={{display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', padding: '0 30px'}}>
        {['#thucdaydi', '#podcast', '#donglucmoingay'].map((x, i) => <div key={x} style={{...mono, fontSize: 34, padding: '10px 22px', borderRadius: 999, border: '2px solid rgba(255,255,255,.7)', background: '#000', opacity: chips(i), transform: `translateY(${(1 - chips(i)) * 20}px)`}}>{x}</div>)}
      </div>
    </div>
  </AbsoluteFill>;
};
