import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Fig, Pose, STAND, mix, walk} from '../../stick';
import {
  C,
  Captions,
  EASE,
  Glow,
  Polaroid,
  PH,
  PW,
  Rain,
  Sky,
  Sprout,
  Sun,
  Svg,
  hash,
  lerp,
  mixHex,
  partStarts,
  ramp,
  vAt,
} from './kit';
import {CAMON_SHOTS} from './timeline';
import {HANDOFF, PhotoScene, handoffScale} from './photo';

// ---------- S7: chậm thôi, nhưng chưa từng đứng yên ----------
const S7 = CAMON_SHOTS.s7;
const S7_PARTS = ['Chậm thôi,', 'nhưng chưa từng đứng yên.'];
export const CamonS7: React.FC = () => {
  const f = useCurrentFrame();
  const D = S7.duration;
  const bright = ramp(f, 0, D, EASE.smooth);
  const gy = 1400,
    sc = 0.72;
  const x0 = 170,
    speed = 4.4,
    x = x0 + f * speed; // never stops: slow constant pace through the hold
  const N = 11,
    gap = 62;
  const FEET = 255 * sc;
  // close camera (~1.5x) that pans with the walker so figure + sprouts fill the lower-middle of the frame
  const cam = lerp(1.5, 1.56, f / D),
    camX = lerp(x0 + 210, x0 + 210 + D * speed * 0.7, f / D);
  return (
    <AbsoluteFill style={{background: C.moss}}>
      <Svg>
        <Sky
          id="s7sky"
          top={mixHex(C.moss, '#2F4A3B', bright)}
          bottom={mixHex(C.moss2, '#7C8F62', bright)}
        />
        <g transform={`translate(540 1500) scale(${cam}) translate(${-camX} ${-gy})`}>
          <Sun x={800} y={lerp(1180, 1040, bright)} r={70} o={0.25 + 0.5 * bright} />
          <Glow x={540} y={gy} r={700} color={C.dawn} o={0.12 + 0.16 * bright} id="s7g" />
          {/* far hills */}
          <path
            d={`M-400 ${gy - 110} L0 ${gy - 110} Q 220 ${gy - 230} 460 ${gy - 120} T 1080 ${gy - 150} L1480 ${gy - 150} V ${gy} H-400 Z`}
            fill={mixHex(C.moss, '#233A2E', 0.6)}
            opacity={0.9}
          />
          <path
            d={`M-400 ${gy - 50} L0 ${gy - 50} Q 300 ${gy - 130} 620 ${gy - 55} T 1080 ${gy - 70} L1480 ${gy - 70} V ${gy} H-400 Z`}
            fill={C.moss2}
          />
          {/* road */}
          <rect
            x={-400}
            y={gy}
            width={1880}
            height={420}
            fill={mixHex('#2B3A30', '#4B5A3C', bright)}
          />
          <rect
            x={-400}
            y={gy}
            width={1880}
            height={6}
            fill={C.dawn}
            opacity={0.18 + 0.2 * bright}
          />
          <ellipse cx={x} cy={gy + 12} rx={110 * sc + 20} ry={14} fill="#000" opacity={0.3} />
          {[...Array(N)].map((_, k) => {
            const sx = x0 + 20 + k * gap;
            const t0 = (sx + 28 - x0) / speed; // frame when the figure's step reaches this spot
            const t = f - t0;
            const g =
              t < 0
                ? 0
                : 1 +
                  0.22 * Math.sin(Math.min(t, 22) * 0.34) * Math.exp(-t / 14) -
                  Math.exp(-t / 5) * 1.0;
            const sway = Math.sin(f / 18 + k) * 2;
            return (
              <g key={k} transform={`rotate(${sway.toFixed(2)} ${sx} ${gy + 20})`}>
                <Sprout x={sx} y={gy + 20 + hash(k) * 6} g={Math.max(0, g)} s={1.5} />
              </g>
            );
          })}
          <Fig
            x={x}
            y={gy - FEET + Math.sin(f / 5) * 2.5}
            pose={walk(f, 0.6)}
            scale={sc}
            face="calm"
            color={C.now}
            ink={C.moss}
          />
        </g>
      </Svg>
      <Captions sec={S7.sec} duration={D} parts={S7_PARTS} accents={['', 'chưa từng đứng yên']} />
    </AbsoluteFill>
  );
};

// ---------- S8: nhìn lại tấm ảnh cũ ----------
const S8 = CAMON_SHOTS.s8;
const S8_PARTS = ['Nên mình muốn nói với phiên bản ấy một câu,', 'mà ngày đó mình quên nói.'];
export const CamonS8: React.FC = () => {
  const f = useCurrentFrame();
  const D = S8.duration;
  const p2 = partStarts(S8_PARTS, S8.sec)[1];
  const lift = ramp(f, 0, 24);
  const zoom = ramp(f, p2 - 6, D - p2 + 6, EASE.out); // grows through the second sentence + hold
  // lands on HANDOFF at frame D and keeps pushing at s9's speed through the crossfade tail
  const s = f < D ? lerp(0.55, HANDOFF.s, zoom) : handoffScale(f - D);
  const py = lerp(lerp(1160, 920, lift), HANDOFF.y, zoom);
  const hold: Pose = {
    ...STAND,
    eL: [-120, -270],
    hL: [-135, -355],
    eR: [120, -270],
    hR: [135, -355],
    head: [0, -228],
  };
  const pose = mix(STAND, hold, lift);
  const figO = 1 - zoom;
  return (
    <AbsoluteFill style={{background: C.moss}}>
      <Svg scale={lerp(1, 1.03, f / D)}>
        <Sky id="s8sky" top={C.moss} bottom={mixHex(C.moss2, '#5E6A47', 0.5)} />
        <Glow x={540} y={1000} r={760} color={C.dawn} o={0.08 + 0.12 * zoom} id="s8g" />
        <rect x={0} y={1676} width={1080} height={244} fill="#17201B" opacity={0.5} />
        <ellipse
          cx={540}
          cy={1470 + 255 * 0.85}
          rx={170}
          ry={16}
          fill="#000"
          opacity={0.28 * figO}
        />
        <Fig
          x={540}
          y={1450 + Math.sin(f / 30) * 3}
          pose={pose}
          scale={0.85}
          face="calm"
          color={C.now}
          ink={C.moss}
          opacity={figO}
        />
        {[...Array(14)].map((_, i) => {
          const a = hash(i) * Math.PI * 2,
            r = 380 + hash(i + 40) * 260 * (0.7 + 0.5 * zoom);
          const drift = (f * (0.35 + hash(i + 7) * 0.4)) % 120;
          const tw = 0.5 + 0.5 * Math.sin(f / 9 + i * 2.1);
          return (
            <circle
              key={i}
              cx={540 + Math.cos(a) * r * 1.05}
              cy={py + Math.sin(a) * r * 0.9 - drift}
              r={3 + hash(i + 60) * 4}
              fill={C.dawn}
              opacity={0.2 + 0.5 * tw * ramp(f, 14 + i * 3, 25)}
            />
          );
        })}
      </Svg>
      <Svg>
        <Polaroid x={HANDOFF.x} y={py} s={s} rot={lerp(-3, HANDOFF.rot, zoom)} id="s8clip">
          <PhotoScene id="s8ph" f={f} walkT={1} amp={0} />
        </Polaroid>
      </Svg>
      <Captions sec={S8.sec} duration={D} parts={S8_PARTS} accents={['', 'quên nói']} />
    </AbsoluteFill>
  );
};
