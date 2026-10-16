import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Fig, Pose, STAND, walk} from '../../stick';
import {CAMON_SHOTS} from './timeline';
import {
  C,
  Captions,
  EASE,
  Glow,
  PH,
  PW,
  Polaroid,
  Sky,
  Sprout,
  Sun,
  Svg,
  hash,
  lerp,
  mixHex,
  ramp,
  vAt,
} from './kit';
import {HANDOFF, PastFig, PhotoScene, handoffScale, photoFig} from './photo';

type V2 = [number, number];
const lv = (a: V2, b: V2, t: number): V2 => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

// Stick person with a hand-drawn face so it can fade in (o) and smile gradually (q: 0 = calm line, 1 = full smile).
const Person: React.FC<{
  x: number;
  y: number;
  s: number;
  pose: Pose;
  color: string;
  ink: string;
  o?: number;
  q?: number;
  cheek?: number;
  opacity?: number;
}> = ({x, y, s, pose, color, ink, o = 0, q = 0, cheek = 0, opacity = 1}) => {
  const [hx, hy] = pose.head;
  const hw = lerp(14, 27, q),
    ey = hy + lerp(22, 13, q),
    cy = hy + lerp(22, 44, q);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <Fig x={0} y={0} pose={pose} face="none" color={color} ink={ink} />
      <g opacity={o}>
        <circle cx={hx - 20} cy={hy - 8} r={6.5} fill={ink} />
        <circle cx={hx + 20} cy={hy - 8} r={6.5} fill={ink} />
        <circle cx={hx - 18} cy={hy - 10} r={2} fill="#fff" />
        <circle cx={hx + 22} cy={hy - 10} r={2} fill="#fff" />
        <path
          d={`M ${hx - hw} ${ey} Q ${hx} ${cy} ${hx + hw} ${ey}`}
          stroke={ink}
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
        />
        {cheek > 0 && (
          <>
            <ellipse cx={hx - 42} cy={hy + 6} rx={11} ry={7} fill="#F2A58E" opacity={0.7 * cheek} />
            <ellipse cx={hx + 42} cy={hy + 6} rx={11} ry={7} fill="#F2A58E" opacity={0.7 * cheek} />
          </>
        )}
      </g>
    </g>
  );
};

// Dawn sky shared by the s9 close-up and s10, so the s9 -> s10 crossfade is tone-on-tone (t: 0 = moss night, 1 = full sunrise).
const DAWN_T0 = 0.42;
const DawnSky: React.FC<{t: number; id: string}> = ({t, id}) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={mixHex('#1E2A25', '#27495A', t)} />
        <stop offset="0.38" stopColor={mixHex('#2C3D33', '#7C6E86', t)} />
        <stop offset="0.52" stopColor={mixHex('#2C3D33', '#EBA37C', t)} />
        <stop offset="0.6" stopColor={mixHex('#2C3D33', '#F8D79A', t)} />
        <stop offset="1" stopColor={mixHex('#1E2A25', '#1D3A34', t)} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="1080" height="1920" fill={`url(#${id})`} />
  </>
);

// Same transform as Polaroid's photo area, so a figure can leave the photo without being clipped.
const photoSpace = (x: number, y: number, s: number, rot: number) =>
  `translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(${-PW / 2} ${-(PH + 150) / 2 + 34})`;

// ---------- S9: "Cảm ơn vì đã cố gắng." (a) the same photo from s8: grey self turns, face appears, steps out of the frame; (b) cut to the smiling "now" self ----------
export const CamonS9: React.FC = () => {
  const f = useCurrentFrame();
  const {duration: D, sec} = CAMON_SHOTS.s9;
  const at = (t: number) => vAt(sec, t);
  const pf = f + CAMON_SHOTS.s8.duration; // photo clock continues s8's, so rain lines match through the crossfade

  const turn = ramp(f, at(0.04), 12, EASE.smooth); // back -> face
  const out = ramp(f, at(0.32), at(0.95) - at(0.32), EASE.smooth); // steps out toward camera
  const tCut = Math.round(at(1.0)) + 2;
  const up = f >= tCut ? 1 : 0; // hard cut to the close-up (no layered dissolve)
  const ps = handoffScale(f); // continuous push from s8
  const g0 = photoFig(1);
  const fx = lerp(g0.x, 300, out),
    foot = lerp(g0.foot, 1010, out),
    fs = lerp(g0.s, 1.3, out);

  const q = lerp(0.35, 1, ramp(f, tCut + 2, 20));
  const push = 1 + 0.05 * ramp(f, tCut, D + 8 - tCut, (t) => t);
  const pose: Pose = {...STAND, eL: [-50, -80], hL: [-58, -4], eR: [50, -80], hR: [58, -4]};

  return (
    <AbsoluteFill style={{background: C.moss}}>
      {up < 1 && (
        <Svg>
          <Sky id="cm9sky" top={C.moss} bottom={mixHex(C.moss2, '#5E6A47', 0.5)} />
          <Glow x={540} y={1000} r={760} color={C.dawn} o={0.2 + 0.1 * out} id="cm9g" />
          <Polaroid x={HANDOFF.x} y={HANDOFF.y} s={ps} rot={HANDOFF.rot} id="s8clip">
            <PhotoScene
              id="cm9ph"
              f={pf}
              walkT={1}
              amp={0}
              rain={1 - 0.6 * out}
              warm={0.5 * out}
              figure={false}
            />
          </Polaroid>
          <g transform={photoSpace(HANDOFF.x, HANDOFF.y, ps, HANDOFF.rot)}>
            <ellipse
              cx={fx}
              cy={foot + 4}
              rx={95 * fs}
              ry={20 * fs}
              fill="#000"
              opacity={0.5 * (1 - out)}
            />
            <PastFig
              x={fx}
              y={foot - 262 * fs}
              s={fs}
              phase={f * 0.9}
              amp={0.7 * ramp(f, at(0.3), 4) * (1 - ramp(f, at(0.95), 4))}
              faceO={turn}
            />
          </g>
        </Svg>
      )}
      {up > 0 && (
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0, opacity: up}}
        >
          <DawnSky t={DAWN_T0} id="cm9dawn" />
          <g transform={`translate(540 1000) scale(${push}) translate(-540 -1000)`}>
            <path
              d={`M-200 ${HORIZON} Q540 ${HORIZON - 26} 1280 ${HORIZON} L1280 2200 L-200 2200 Z`}
              fill={mixHex('#2C3D33', '#24463D', DAWN_T0)}
            />
            <Glow x={540} y={800} r={620} color="#FFE2A8" o={0.55} id="cm9head" />
            {[...Array(12)].map((_, i) => {
              const a = hash(i) * 6.283,
                d = 330 + hash(i + 3) * 360;
              const b = 0.5 + 0.5 * Math.sin(f / 14 + i * 2.1);
              return (
                <circle
                  key={i}
                  cx={540 + Math.cos(a) * d}
                  cy={800 + Math.sin(a) * d * 0.85}
                  r={10 + hash(i + 9) * 26}
                  fill="#FFE9BF"
                  opacity={0.08 + 0.12 * b}
                />
              );
            })}
            <Person
              x={540}
              y={800 + 235 * 3}
              s={3}
              pose={pose}
              color={C.now}
              ink={C.night}
              o={1}
              q={q}
              cheek={ramp(f, tCut + 2, 20)}
            />
          </g>
        </svg>
      )}
      <Captions
        sec={sec}
        duration={D}
        parts={['Cảm ơn vì đã cố gắng.']}
        accents={['Cảm ơn']}
        accentColor={C.dawn}
      />
    </AbsoluteFill>
  );
};

// ---------- S10: "Cảm ơn vì đã đưa mình đến hôm nay." (finale: walk to the sunrise, fade to warm light) ----------
const SPROUT_Y = [1570, 1520, 1470, 1425, 1385, 1350, 1318, 1290, 1262];
const HORIZON = 1010;

export const CamonS10: React.FC = () => {
  const f = useCurrentFrame();
  const {duration: D, sec} = CAMON_SHOTS.s10;
  const hand = ramp(f, vAt(sec, 0.05), 14, EASE.smooth); // hand on the shoulder while "Cảm ơn" starts
  const u0 = Math.round(vAt(sec, 0.45));
  const u = ramp(f, u0, D - u0 - 20, EASE.smooth); // walk toward the sun
  const prog = ramp(f, 0, D - 20, EASE.smooth);
  const amp = ramp(f, u0 - 2, 6) * (1 - ramp(f, D - 40, 25));

  const s = lerp(0.9, 0.42, u);
  const hip = lerp(1390, 1120, u) - Math.abs(Math.sin(f / 5)) * 6 * s * amp;
  const k = s / 0.9;
  const faceO = 1 - ramp(f, u0 - 4, 12);
  const baseG = walk(f, amp, {
    ...STAND,
    eL: [-50, -80],
    hL: [-58, -4],
    eR: [50, -80],
    hR: [58, -4],
  });
  const baseI = walk(f, amp);
  const reachE: V2 = [-70, -75],
    reachH: V2 = [-118, -150];
  const ivory: Pose = {...baseI, eL: lv(baseI.eL, reachE, hand), hL: lv(baseI.hL, reachH, hand)};

  const feetY = hip + 255 * s;
  const cam = 1 + 0.07 * ramp(f, 0, D, (t) => t);
  const bgT = lerp(DAWN_T0, 1, prog);

  return (
    <AbsoluteFill style={{background: C.moss}}>
      <Svg scale={cam} ox={540} oy={1100}>
        <DawnSky t={bgT} id="cm10sky" />
        <Glow x={540} y={HORIZON} r={900} color="#FFD79A" o={0.2 + 0.5 * prog} id="cm10big" />
        <g opacity={0.5 * prog}>
          {[...Array(14)].map((_, i) => {
            const a = Math.PI + ((i + 0.5) / 14) * Math.PI;
            return (
              <line
                key={i}
                x1={540 + Math.cos(a) * 230}
                y1={955 + Math.sin(a) * 230}
                x2={540 + Math.cos(a) * (700 + (i % 3) * 120)}
                y2={955 + Math.sin(a) * (700 + (i % 3) * 120)}
                stroke="#FFE2A8"
                strokeWidth={26}
                strokeLinecap="round"
                opacity={0.12}
              />
            );
          })}
        </g>
        <Sun
          x={540}
          y={lerp(1085, 945, prog)}
          r={lerp(70, 160, prog)}
          o={0.4 + 0.6 * ramp(f, 0, 30)}
        />
        <path
          d={`M0 ${HORIZON} Q540 ${HORIZON - 26} 1080 ${HORIZON} L1080 1920 L0 1920 Z`}
          fill={mixHex('#2C3D33', '#24463D', bgT)}
        />
        <path
          d={`M0 ${HORIZON} Q540 ${HORIZON - 26} 1080 ${HORIZON}`}
          fill="none"
          stroke="#FFDDA6"
          strokeWidth={4}
          opacity={0.55 * prog}
        />
        <defs>
          <linearGradient id="cm10path" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFE2A8" stopOpacity={0.55} />
            <stop offset="1" stopColor="#FFE2A8" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <polygon
          points="515,1014 565,1014 860,1920 220,1920"
          fill="url(#cm10path)"
          opacity={0.25 + 0.75 * prog}
        />
        {SPROUT_Y.map((sy, i) => {
          const kk = (sy - HORIZON) / 910;
          const g = ramp(sy - feetY, 0, 50, (t) => t);
          const sx = 540 + (i % 2 ? 1 : -1) * (70 + 190 * kk);
          const sc = 0.6 + 3 * kk * kk;
          return (
            <g key={i}>
              <circle cx={sx} cy={sy - 30 * sc} r={70 * sc} fill={C.leaf} opacity={0.12 * g} />
              <Sprout x={sx} y={sy} g={g} s={sc} />
            </g>
          );
        })}
        <ellipse cx={540} cy={feetY + 6} rx={200 * k} ry={16 * k} fill="#000" opacity={0.25} />
        <Person
          x={540 - 54 * k}
          y={hip}
          s={s}
          pose={baseG}
          color={C.past}
          ink={C.night}
          o={faceO}
          q={0.6}
        />
        <Person
          x={540 + 54 * k}
          y={hip}
          s={s}
          pose={ivory}
          color={C.now}
          ink={C.night}
          o={faceO}
          q={1}
          cheek={faceO}
        />
      </Svg>
      <Captions
        sec={sec}
        duration={D}
        parts={['Cảm ơn vì đã đưa mình đến hôm nay.']}
        accents={['đến hôm nay']}
        accentColor={C.dawn}
      />
      <AbsoluteFill
        style={{
          background: C.dawn,
          opacity: 0.55 * ramp(f, D - 15, 15, (t) => t),
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
