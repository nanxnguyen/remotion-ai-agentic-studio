// Stick-figure + prop kit — chung-minh-de-lam-gi.
// Same SYSTEM as truongthanh (src/stick.tsx): black stage, white figures, #F58B4C accent,
// flat vector shapes only (T6: no gradient / blur filter / feTurbulence).
// Differences from truongthanh: thinner limbs, expressive que faces (<=3 strokes),
// bottom captions (not top), one unique metaphor prop per shot.
import React from 'react';
import {C} from './tokens';

export type V = [number, number];
export type Pose = {
  head: V; sh: V; hip: V; eL: V; hL: V; eR: V; hR: V; kL: V; fL: V; kR: V; fR: V;
};
export const STAND: Pose = {
  head: [0, -235], sh: [0, -150], hip: [0, 0],
  eL: [-70, -85], hL: [-80, -10], eR: [70, -85], hR: [80, -10],
  kL: [-30, 125], fL: [-40, 250], kR: [30, 125], fR: [40, 250],
};
export const SIT: Pose = {
  head: [10, -225], sh: [0, -145], hip: [0, 0],
  eL: [40, -70], hL: [105, -60], eR: [60, -60], hR: [125, -50],
  kL: [110, -5], fL: [120, 120], kR: [145, 0], fR: [155, 125],
};
export const BOW: Pose = {
  ...STAND,
  head: [30, -205], sh: [20, -135],
  eL: [-40, -60], hL: [-30, 30], eR: [60, -70], hR: [70, 20],
};
export const ARMS_UP: Pose = {
  ...STAND, eL: [-80, -195], hL: [-100, -290], eR: [80, -195], hR: [100, -290],
};

export type FaceKind =
  | 'downcast' // hook/s1, s3: two dots + short down mouth (sad-tired)
  | 'smirk' // s2b: asymmetric — one eye lower, crooked mouth (chua, not villain)
  | 'smile' // s4a: genuine joy (white, never orange)
  | 'droop' // s4b: eyes half, flat mouth low
  | 'calm' // s6/s8: flat line mouth
  | 'lit' // s9b: same calm, head tilted up 8deg
  | 'none';

/** Expressive que face in <=3 strokes: 2 eye dots + 1 mouth stroke. */
export const Face: React.FC<{hx: number; hy: number; kind: FaceKind; ink?: string}> = ({
  hx, hy, kind, ink = C.ink,
}) => {
  if (kind === 'none') return null;
  const eye = (dx: number, dy: number, r = 6) => (
    <circle cx={hx + dx} cy={hy + dy} r={r} fill={ink} />
  );
  return (
    <g>
      {kind === 'smirk' ? (
        <>
          {eye(-20, -2)}
          {eye(20, -14)}
          <path
            d={`M ${hx - 24} ${hy + 28} L ${hx + 26} ${hy + 2}`}
            stroke={ink} strokeWidth={6} fill="none" strokeLinecap="round"
          />
        </>
      ) : (
        <>
          {eye(-20, -8)}
          {eye(20, -8)}
          {kind === 'downcast' && (
            <path d={`M ${hx - 18} ${hy + 28} Q ${hx} ${hy + 14} ${hx + 18} ${hy + 28}`} stroke={ink} strokeWidth={6} fill="none" strokeLinecap="round" />
          )}
          {kind === 'smile' && (
            <path d={`M ${hx - 22} ${hy + 14} Q ${hx} ${hy + 36} ${hx + 22} ${hy + 14}`} stroke={ink} strokeWidth={6} fill="none" strokeLinecap="round" />
          )}
          {kind === 'droop' && (
            <line x1={hx - 16} y1={hy + 28} x2={hx + 16} y2={hy + 28} stroke={ink} strokeWidth={6} strokeLinecap="round" />
          )}
          {(kind === 'calm' || kind === 'lit') && (
            <line x1={hx - 14} y1={hy + 22} x2={hx + 14} y2={hy + 22} stroke={ink} strokeWidth={6} strokeLinecap="round" />
          )}
        </>
      )}
    </g>
  );
};

export const Que: React.FC<{
  x: number; y: number; pose?: Pose; s?: number; face?: FaceKind;
  opacity?: number; flip?: boolean; color?: string; tilt?: number;
}> = ({x, y, pose = STAND, s = 1, face = 'downcast', opacity = 1, flip = false, color = C.white, tilt = 0}) => {
  const L = (a: V, b: V, w: number) => (
    <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth={w} strokeLinecap="round" />
  );
  const [hx, hy] = pose.head;
  return (
    <g opacity={opacity} transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${tilt} ${hx} ${hy})`}>
      {L(pose.hip, pose.kL, 20)}{L(pose.kL, pose.fL, 20)}
      {L(pose.hip, pose.kR, 20)}{L(pose.kR, pose.fR, 20)}
      {L(pose.sh, pose.hip, 34)}
      {L(pose.sh, pose.eL, 15)}{L(pose.eL, pose.hL, 15)}
      {L(pose.sh, pose.eR, 15)}{L(pose.eR, pose.hR, 15)}
      <circle cx={hx} cy={hy} r={56} fill={color} />
      <Face hx={hx} hy={hy} kind={face} ink={face === 'none' ? color : C.ink} />
    </g>
  );
};

/** Medal: flat orange disc + ribbon (no gradient). Prominent: r>=90 on hero shots. */
export const Medal: React.FC<{x: number; y: number; r?: number; opacity?: number; dim?: boolean}> = ({
  x, y, r = 92, opacity = 1, dim = false,
}) => (
  <g opacity={opacity} transform={`translate(${x} ${y})`}>
    <polygon points={`-${r * 0.42},-${r * 2.1} -${r * 0.1},-${r * 1.05} ${r * 0.1},-${r * 1.05} ${r * 0.42},-${r * 2.1}`} fill={dim ? C.grey : C.orange} opacity={dim ? 0.6 : 1} />
    <circle r={r} fill={dim ? C.orange : C.orange} opacity={dim ? 0.6 : 1} />
    <circle r={r * 0.68} fill="none" stroke={C.bg} strokeWidth={r * 0.09} opacity={dim ? 0.6 : 1} />
    <circle r={r * 0.2} fill={C.bg} opacity={dim ? 0.6 : 1} />
  </g>
);

/** Empty chair: tall backrest posts + seat, back to viewer. Reads at 20% ghost. */
export const Chair: React.FC<{x: number; y: number; s?: number; opacity?: number; flip?: boolean}> = ({
  x, y, s = 1, opacity = 0.2, flip = false,
}) => (
  <g opacity={opacity} transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} stroke={C.white} strokeLinecap="round" fill="none">
    <line x1={-70} y1={-300} x2={-70} y2={-40} strokeWidth={22} />
    <line x1={70} y1={-300} x2={70} y2={-40} strokeWidth={22} />
    <line x1={-70} y1={-300} x2={70} y2={-300} strokeWidth={22} />
    <line x1={-70} y1={-180} x2={70} y2={-180} strokeWidth={16} />
    <line x1={-95} y1={-40} x2={95} y2={-40} strokeWidth={20} />
    <line x1={-80} y1={-40} x2={-100} y2={0} strokeWidth={20} />
    <line x1={80} y1={-40} x2={100} y2={0} strokeWidth={20} />
  </g>
);

/** Speech bubble (old quote): white outline + tail, carries "minh hoạ" tag.
 *  T1: quote text lives INSIDE the bubble (pack-exact lines, ≤28ch/line). */
export const Bubble: React.FC<{x: number; y: number; w?: number; h?: number; opacity?: number; lines?: string[]; size?: number}> = ({
  x, y, w = 560, h = 190, opacity = 1, lines = [], size = 44,
}) => (
  <g opacity={opacity} transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={44} fill="#060606" stroke={C.white} strokeWidth={10} />
    <polygon points={`-${w / 2 + 60},${h / 2 - 6} -${w / 2 + 20},${h / 2 + 74} -${w / 2 + 130},${h / 2 - 6}`} fill="#060606" stroke={C.white} strokeWidth={10} strokeLinejoin="round" />
    {lines.map((t, i) => (
      <text
        key={i}
        x={0}
        y={(i - (lines.length - 1) / 2) * size * 1.3 + size * 0.36}
        textAnchor="middle"
        fontFamily="'Be Vietnam Pro', 'Lexend', sans-serif"
        fontWeight={600}
        fontSize={size}
        fill={C.white}
      >
        {t}
      </text>
    ))}
  </g>
);

/** Price tag: flat white card + hole + string, "minh hoạ" labelled. */
export const PriceTag: React.FC<{x: number; y: number; tilt?: number; opacity?: number}> = ({
  x, y, tilt = 0, opacity = 1,
}) => (
  <g opacity={opacity} transform={`translate(${x} ${y}) rotate(${tilt})`}>
    <line x1={0} y1={-190} x2={0} y2={-96} stroke={C.grey} strokeWidth={8} />
    <g transform="rotate(8)">
      <rect x={-130} y={-96} width={260} height={150} rx={26} fill={C.white} />
      <circle cx={-92} cy={-21} r={16} fill={C.bg} />
      <line x1={-50} y1={-50} x2={90} y2={-50} stroke={C.bg} strokeWidth={14} strokeLinecap="round" />
      <line x1={-50} y1={-8} x2={60} y2={-8} stroke={C.bg} strokeWidth={14} strokeLinecap="round" />
    </g>
  </g>
);

/** Mirror: flat frame + standing reflection (two figures facing each other). */
export const Mirror: React.FC<{x: number; y: number; w?: number; h?: number}> = ({x, y, w = 420, h = 640}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={60} fill="none" stroke={C.grey} strokeWidth={14} />
  </g>
);

/** Flat light disc (desk lamp pool / mirror beam): solid fill + opacity only. */
export const LightDisc: React.FC<{x: number; y: number; r?: number; opacity?: number; color?: string}> = ({
  x, y, r = 200, opacity = 0.3, color = C.lampWhite,
}) => <circle cx={x} cy={y} r={r} fill={color} opacity={opacity} />;

/** Flat beam fan (s9b): solid polygon from off-frame into chest, opacity 0.8. */
export const BeamFan: React.FC<{opacity?: number}> = ({opacity = 0.8}) => (
  <polygon points="1080,240 1080,640 620,1080 380,1080" fill={C.lampWhite} opacity={opacity} />
);

/** Dust motes: seeded flat dots inside lamp pool (deterministic). */
export const Motes: React.FC<{cx: number; cy: number; r?: number; n?: number; opacity?: number}> = ({
  cx, cy, r = 190, n = 7, opacity = 0.5,
}) => (
  <g opacity={opacity} fill={C.white}>
    {Array.from({length: n}, (_, i) => {
      const a = ((i * 137.5) * Math.PI) / 180;
      const d = 40 + ((i * 53) % 140);
      return <circle key={i} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d * 0.8} r={3 + ((i * 7) % 4)} />;
    })}
  </g>
);
