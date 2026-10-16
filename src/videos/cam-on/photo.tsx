import React from 'react';
import {Fig, Pose, STAND} from '../../stick';
import {C, Glow, PH, PW, Rain, hash, lerp, mixHex} from './kit';

// The one "old photo" (s1 layout) reused in s1, s8, s9: rainy night street, lamp on the right, grey self walking away.
// Drawn in Polaroid photo coords 0..PW x 0..PH.

// Back view: slumped shoulders, arms hanging close and swinging with the step (not on the hips).
export const pastPose = (phase: number, amp: number): Pose => {
  const s = Math.sin(phase / 5) * amp;
  return {
    ...STAND,
    head: [0, -222],
    sh: [0, -142],
    eL: [-46 - s * 10, -76],
    hL: [-50 - s * 26, -2],
    eR: [46 + s * 10, -76],
    hR: [50 + s * 26, -2],
    kL: [-30 + s * 36, 125],
    fL: [-40 + s * 80, 255 - Math.abs(s) * 20],
    kR: [30 - s * 36, 125],
    fR: [40 - s * 80, 255 - Math.abs(s) * 20],
  };
};

// Grey past self. faceO 0 = seen from the back (backpack + cross strap), 1 = turned to camera (face, no backpack).
// The turn squashes the figure horizontally around faceO = 0.5, where the backpack is swapped for the face.
export const PastFig: React.FC<{
  x: number;
  y: number;
  s: number;
  phase: number;
  amp: number;
  faceO: number;
  smile?: number;
}> = ({x, y, s, phase, amp, faceO, smile = 0.6}) => {
  const p = pastPose(phase, amp);
  const [hx, hy] = p.head;
  const sx = 1 - 0.8 * Math.sin(Math.PI * Math.min(1, Math.max(0, faceO)));
  const back = faceO < 0.5;
  const fo = Math.max(0, (faceO - 0.5) * 2);
  const ink = C.night,
    strap = '#4A566D';
  const hw = lerp(14, 24, smile),
    ey = hy + lerp(22, 14, smile),
    cy = hy + lerp(22, 40, smile);
  return (
    <g transform={`translate(${x} ${y}) scale(${s * sx} ${s})`}>
      <Fig x={0} y={0} pose={p} face="none" color={C.past} />
      {back && (
        <g>
          <line
            x1={30}
            y1={-146}
            x2={-30}
            y2={-14}
            stroke={strap}
            strokeWidth={12}
            strokeLinecap="round"
          />
          <rect x={-44} y={-128} width={88} height={92} rx={22} fill={C.pastDim} />
          <rect x={-30} y={-84} width={60} height={34} rx={10} fill="#4A566D" />
          <line
            x1={-30}
            y1={-128}
            x2={-26}
            y2={-146}
            stroke={strap}
            strokeWidth={10}
            strokeLinecap="round"
          />
        </g>
      )}
      {fo > 0 && (
        <g opacity={fo}>
          <circle cx={hx - 20} cy={hy - 8} r={6.5} fill={ink} />
          <circle cx={hx + 20} cy={hy - 8} r={6.5} fill={ink} />
          <path
            d={`M ${hx - hw} ${ey} Q ${hx} ${cy} ${hx + hw} ${ey}`}
            stroke={ink}
            strokeWidth={7}
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
};

// Where the grey self stands in the photo for walkT 0 (near camera) .. 1 (deep in the street).
export const photoFig = (walkT: number) => {
  const s = lerp(0.92, 0.4, walkT),
    foot = lerp(672, 520, walkT);
  return {x: lerp(250, 345, walkT), foot, s, hip: foot - 262 * s};
};

export const PhotoScene: React.FC<{
  id: string;
  f: number;
  walkT: number;
  rain?: number;
  warm?: number;
  faceO?: number;
  lamp?: number;
  amp?: number;
  figure?: boolean;
}> = ({id, f, walkT, rain = 1, warm = 0, faceO = 0, lamp = 1, amp = 0.8, figure = true}) => {
  const g = photoFig(walkT);
  const m = (a: string) => mixHex(a, C.dawn, 0.35 * warm);
  return (
    <g>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={m('#1B2538')} />
          <stop offset="1" stopColor={m('#46577A')} />
        </linearGradient>
      </defs>
      <rect width={PW} height={PH} fill={`url(#${id}sky)`} />
      {[
        [20, 250, 120],
        [130, 300, 90],
        [210, 220, 110],
        [400, 280, 100],
        [510, 240, 130],
      ].map(([bx, by, bw], i) => (
        <g key={i}>
          <rect x={bx} y={by} width={bw} height={450 - by + 60} fill={m('#2A3650')} />
          {[0, 1, 2].map(
            (j) =>
              hash(i * 3 + j) > 0.5 && (
                <rect
                  key={j}
                  x={bx + 18 + j * 30}
                  y={by + 30 + hash(i + j) * 80}
                  width={14}
                  height={20}
                  fill={C.dawn}
                  opacity={0.3}
                />
              ),
          )}
        </g>
      ))}
      <rect y={430} width={PW} height={270} fill={m('#2B3850')} />
      <polygon points="320,430 120,700 520,700" fill={m('#3A4A68')} />
      {[0.2, 0.5].map((k, i) => (
        <line
          key={i}
          x1={320}
          y1={430}
          x2={lerp(120, 70, k) + i * 380}
          y2={700}
          stroke="#34405A"
          strokeWidth={3}
          opacity={0.6}
        />
      ))}
      <ellipse cx={440} cy={600} rx={150} ry={34} fill={C.dawn} opacity={0.5 * lamp} />
      <rect x={494} y={200} width={12} height={410} fill="#0C1119" />
      <path d="M500 210 Q500 190 440 196" stroke="#0C1119" strokeWidth={10} fill="none" />
      <Glow x={436} y={204} r={330} color={C.dawn} o={0.95 * lamp} id={`${id}lamp`} />
      <polygon points="436,210 340,610 540,610" fill={C.dawn} opacity={0.17 * lamp} />
      <circle cx={436} cy={206} r={12} fill={C.dawn} opacity={0.35 + 0.65 * lamp} />
      <rect width={PW} height={PH} fill={C.dawn} opacity={0.18 * warm} />
      {figure && (
        <>
          <ellipse
            cx={g.x}
            cy={g.foot + 4}
            rx={95 * g.s}
            ry={20 * g.s}
            fill="#000"
            opacity={0.55}
          />
          <PastFig x={g.x} y={g.hip} s={g.s} phase={f * 0.75} amp={amp} faceO={faceO} />
        </>
      )}
      {rain > 0 && (
        <Rain f={f} x0={0} y0={0} w={PW} h={PH} n={80} o={0.75 * rain} color="#DCE6F8" />
      )}
    </g>
  );
};

// Polaroid placement where s8 ends and s9 begins (screen coords, no camera scale), so the photo carries across the crossfade.
// k = frames past the end of s8 (negative before); the push keeps going at the same speed through s9.
export const HANDOFF = {x: 540, y: 990, rot: -1, s: 1.3};
export const handoffScale = (k: number) => HANDOFF.s * (1 + 0.004 * k);
