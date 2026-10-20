// Kit — ban-khong-yeu-duoi-chi-da-manh-qua-lau (Phase 3c prototype, gate-D fix round 1 rebuild).
// Tokens: docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/design-spec.md §2–§5.
//
// ROOT CAUSE fixed in this rebuild: the round-0 kit had no pose rig, no hands, no props and an
// umbrella that was not anchored to any hand, so every shot collapsed into one standing pose.
// Here a figure is a forward-kinematics rig (hip → torso → shoulders → arms/legs, two-bone IK
// for a hand that must reach a point), drawn as OPAQUE plates in a fixed layer order, and the
// umbrella is built FROM the grip point of a hand: the shaft starts inside the fist.
//
// Everything is a pure function of props + an explicit frame `f` (never Date.now/Math.random).
// All shapes are SVG <g> fragments in absolute 1080×1920 scene coordinates.
import React from 'react';
import {staticFile, useCurrentFrame} from 'remotion';

import {Grain, Vignette} from './lib/polish';

// ───────────────────────────── 1 · Palette ─────────────────────────────

export const PAL = {
  // navy family — sky, facades, wet cloth
  night0: '#04090F',
  night1: '#0A141D',
  night2: '#11202C',
  night3: '#1B2E3C',
  mist: '#2B4352', // the lighter fog band that separates the canopy and her head from the sky
  // soft grey family — dry cloth, text
  grey0: '#5E6B76',
  grey1: '#A7B4BE',
  grey2: '#DCE3EA',
  grey3: '#F2F6F9',
  // wet cloth — darker value + cold specular
  wet0: '#03080D',
  sheen: '#8FB6CE',
  spec: '#E2F1FA', // the wet specular: the brightest small element of the cover (Q5)
  // L0 world lights — desaturated, never on a body as a saturated warm
  sodium: '#B8A58A', // cold-warm, desaturated (D-18: pushed colder than round 0's #C49A6B)
  sodiumCore: '#E8DCC4',
  window: '#D9BE96',
  // THE one amber arrival (L1 → L4). Absent at frame 0.
  amber: '#F0B45F',
  amberHot: '#FFDCA6',
  // the phone screen — the coldest light in the film
  screen: '#9CC0DC',
  screenHi: '#D6E8F5',
} as const;

// figure looks
export type Look = Readonly<{
  coat: string;
  coatDark: string;
  coatLine: string;
  trousers: string;
  shoe: string;
  skin: string;
  skinShade: string;
  hair: string;
  hairStyle: 'bob' | 'kid' | 'short';
  coatLen: number; // 0..1 share of the thigh the coat hem covers
  hood?: string;
}>;

export const HER: Look = {
  coat: '#1A3446',
  coatDark: '#0D1D29',
  coatLine: '#071119',
  trousers: '#0B141C',
  shoe: '#05090D',
  skin: '#9A8E88',
  skinShade: '#6F6763',
  hair: '#06090C',
  hairStyle: 'bob',
  coatLen: 0.62,
};

/** The child: soft grey, matte, DRY. Never takes `wet` (enforced by `Child`'s type). */
export const KID: Look = {
  coat: '#5E6B76',
  coatDark: '#46525C',
  coatLine: '#2E3840',
  trousers: '#2A343D',
  shoe: '#151B21',
  skin: '#8E8682',
  skinShade: '#6E6764',
  hair: '#1A1F24',
  hairStyle: 'kid',
  coatLen: 0.45,
  hood: '#525E68',
};

/** The other person at the kitchen table (s2a/a1/s2b): a distinct adult — knit, no hood,
 *  short hair; soft-grey family but taupe, so it never reads as the child's plate. */
export const OTHER: Look = {
  coat: '#7A7670',
  coatDark: '#5C5955',
  coatLine: '#3A3835',
  trousers: '#262A2E',
  shoe: '#14171A',
  skin: '#A2948B',
  skinShade: '#7A6E68',
  hair: '#2B2C2E',
  hairStyle: 'short',
  coatLen: 0,
};

// ───────────────────────────── 2 · Fonts ─────────────────────────────

export const FONT = {
  sans: "'Be Vietnam Pro', system-ui, sans-serif",
  serif: "'Literata', Georgia, serif",
} as const;

const VN =
  'U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,' +
  'U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB';
const LE =
  'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,' +
  'U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,' +
  'U+A720-A7FF';
const LA =
  'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,' +
  'U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const face = (fam: string, weight: number, file: string, range: string) =>
  `@font-face{font-family:'${fam}';font-weight:${weight};font-style:normal;font-display:block;` +
  `src:url('${staticFile('fonts/' + file)}') format('woff2');unicode-range:${range}}`;

export const BKYDFonts: React.FC = () => (
  <style>{`
${face('Be Vietnam Pro', 600, 'BeVietnamPro-SemiBold-VN.woff2', VN)}
${face('Be Vietnam Pro', 600, 'BeVietnamPro-SemiBold-LatinExt.woff2', LE)}
${face('Be Vietnam Pro', 600, 'BeVietnamPro-SemiBold-Latin.woff2', LA)}
${face('Literata', 700, 'Literata-Bold-VN.woff2', VN)}
${face('Literata', 700, 'Literata-Bold-LA.woff2', LA)}
`}</style>
);

// ───────────────────────────── 3 · Math ─────────────────────────────

export const hash = (seed: number, i: number) => {
  const x = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
export type P = Readonly<{x: number; y: number}>;
const D2R = Math.PI / 180;
export const pt = (x: number, y: number): P => ({x, y});
const add = (a: P, b: P): P => ({x: a.x + b.x, y: a.y + b.y});
const sub = (a: P, b: P): P => ({x: a.x - b.x, y: a.y - b.y});
const mul = (a: P, k: number): P => ({x: a.x * k, y: a.y * k});
const len = (a: P) => Math.hypot(a.x, a.y);
/** direction from an angle measured from straight DOWN, positive toward +x */
export const dirDown = (deg: number): P => ({x: Math.sin(deg * D2R), y: Math.cos(deg * D2R)});
/** rotate a screen vector clockwise by deg */
const rot = (v: P, deg: number): P => {
  const c = Math.cos(deg * D2R);
  const s = Math.sin(deg * D2R);
  return {x: v.x * c - v.y * s, y: v.x * s + v.y * c};
};
const f2 = (n: number) => n.toFixed(1);
const poly = (pts: readonly P[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${f2(p.x)} ${f2(p.y)}`).join(' ') + ' Z';
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Two-bone IK: elbow position for a shoulder `a`, target `t`, bone lengths, bend side ±1. */
export const ik = (a: P, t: P, l1: number, l2: number, bend: 1 | -1): {elbow: P; hand: P} => {
  const d0 = sub(t, a);
  const d = Math.min(len(d0), l1 + l2 - 0.5);
  const base = Math.atan2(d0.y, d0.x);
  const cosA = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * Math.max(d, 1e-3));
  const ang = Math.acos(Math.max(-1, Math.min(1, cosA)));
  const e = add(a, {x: Math.cos(base + bend * ang) * l1, y: Math.sin(base + bend * ang) * l1});
  const hand = add(a, {x: Math.cos(base) * d, y: Math.sin(base) * d});
  return {elbow: e, hand};
};

// ───────────────────────────── 4 · Body rig ─────────────────────────────

export type Body = Readonly<{
  headRx: number;
  headRy: number;
  neck: number;
  torso: number; // shoulder line → hip line
  shoulder: number; // half width
  hip: number; // half width
  upper: number;
  fore: number;
  thigh: number;
  shin: number;
  armW: number;
  foreW: number;
  legW: number;
  shinW: number;
  hand: number;
}>;

/** Adult: ~1000 px tall at s = 1. */
export const ADULT: Body = {
  headRx: 58,
  headRy: 70,
  neck: 30,
  torso: 330,
  shoulder: 100,
  hip: 74,
  upper: 238,
  fore: 214,
  thigh: 252,
  shin: 236,
  armW: 66,
  foreW: 56,
  legW: 70,
  shinW: 56,
  hand: 25,
};
/** Child: ~775 px tall at s = 1 — the SAME `s` as the adult keeps the ratio fixed (D-14). */
export const CHILD: Body = {
  headRx: 60,
  headRy: 68,
  neck: 18,
  torso: 248,
  shoulder: 78,
  hip: 60,
  upper: 178,
  fore: 158,
  thigh: 176,
  shin: 166,
  armW: 54,
  foreW: 46,
  legW: 54,
  shinW: 44,
  hand: 20,
};

/** Hip height above the ground for a straight standing pose (feet on `ground`). */
export const standHipY = (ground: number, b: Body, s: number) => ground - (b.thigh + b.shin + 16) * s;

export type Arm = Readonly<{
  /** absolute angles from straight down (upper arm, forearm). Ignored if `to` is set. */
  a1?: number;
  a2?: number;
  /** IK target for the hand (scene px). */
  to?: P;
  bend?: 1 | -1;
  hand?: 'open' | 'fist' | 'none';
  /** drawn behind the torso (side view far arm, or an arm behind the back) */
  behind?: boolean;
}>;
export type Leg = Readonly<{a1: number; a2: number}>;

export type Pose = Readonly<{
  view: 'front' | 'side';
  facing?: 1 | -1; // side view: +1 faces viewer-right
  lean?: number; // torso lean, deg, + = top toward +x
  headTilt?: number;
  headDrop?: number; // head lowered toward the chest (px at s=1)
  turn?: number; // front view: -1..1 face turned toward -x / +x
  dropL?: number; // shoulder drop, viewer-left shoulder (px at s=1)
  dropR?: number;
  eyes?: 'open' | 'down' | 'closed';
  mouth?: 'closed' | 'open' | 'tight';
  armL: Arm; // viewer-left arm in front view; NEAR arm in side view
  armR: Arm; // viewer-right arm in front view; FAR arm in side view
  legL: Leg;
  legR: Leg;
}>;

export const STAND: Pick<Pose, 'legL' | 'legR'> = {legL: {a1: 2, a2: 1}, legR: {a1: -2, a2: -1}};

export type Rig = Readonly<{
  hip: P;
  neck: P;
  head: P;
  shL: P;
  shR: P;
  elL: P;
  elR: P;
  hdL: P;
  hdR: P;
  hipL: P;
  hipR: P;
  knL: P;
  knR: P;
  anL: P;
  anR: P;
  up: P;
}>;

/** Forward kinematics. Pure: the same inputs always give the same joints (used by props too). */
export const solveRig = (hip: P, s: number, b: Body, pose: Pose): Rig => {
  const side = pose.view === 'side';
  const fc = pose.facing ?? 1;
  const lean = pose.lean ?? 0;
  const up = rot({x: 0, y: -1}, lean);
  const across = rot({x: 1, y: 0}, lean);
  const neck = add(hip, mul(up, b.torso * s));
  const sw = (side ? b.shoulder * 0.22 : b.shoulder * 0.86) * s;
  const dl = (pose.dropL ?? 0) * s;
  const dr = (pose.dropR ?? 0) * s;
  const shoulderBase = add(neck, mul(up, -26 * s));
  // side view: near shoulder slightly toward the front, far shoulder toward the back
  const shL = add(add(shoulderBase, mul(across, side ? sw * fc : -sw)), {x: 0, y: dl});
  const shR = add(add(shoulderBase, mul(across, side ? -sw * fc : sw)), {x: 0, y: dr});
  const headC = add(
    add(neck, mul(rot(up, pose.headTilt ?? 0), (b.neck + b.headRy * 0.92) * s)),
    {x: 0, y: (pose.headDrop ?? 0) * s},
  );
  const arm = (sh: P, a: Arm, defBend: 1 | -1) => {
    if (a.to) {
      const r = ik(sh, a.to, b.upper * s, b.fore * s, a.bend ?? defBend);
      return {el: r.elbow, hd: r.hand};
    }
    const el = add(sh, mul(dirDown(a.a1 ?? 0), b.upper * s));
    const hd = add(el, mul(dirDown(a.a2 ?? 0), b.fore * s));
    return {el, hd};
  };
  const L = arm(shL, pose.armL, 1);
  const R = arm(shR, pose.armR, -1);
  const hw = (side ? b.hip * 0.25 : b.hip * 0.62) * s;
  const hipL = add(hip, mul(across, side ? hw * fc : -hw));
  const hipR = add(hip, mul(across, side ? -hw * fc : hw));
  const knL = add(hipL, mul(dirDown(pose.legL.a1), b.thigh * s));
  const knR = add(hipR, mul(dirDown(pose.legR.a1), b.thigh * s));
  const anL = add(knL, mul(dirDown(pose.legL.a2), b.shin * s));
  const anR = add(knR, mul(dirDown(pose.legR.a2), b.shin * s));
  return {
    hip,
    neck,
    head: headC,
    shL,
    shR,
    elL: L.el,
    elR: R.el,
    hdL: L.hd,
    hdR: R.hd,
    hipL,
    hipR,
    knL,
    knR,
    anL,
    anR,
    up,
  };
};

const Limb: React.FC<{a: P; b: P; w: number; color: string; line: string; s: number}> = ({
  a,
  b,
  w,
  color,
  line,
  s,
}) => (
  <>
    <path
      d={`M${f2(a.x)} ${f2(a.y)} L${f2(b.x)} ${f2(b.y)}`}
      stroke={line}
      strokeWidth={w + 4 * s}
      strokeLinecap="round"
    />
    <path
      d={`M${f2(a.x)} ${f2(a.y)} L${f2(b.x)} ${f2(b.y)}`}
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
    />
  </>
);

/** A hand plate: `open` = mitten + thumb along the forearm, `fist` = closed round grip. */
export const Hand: React.FC<{
  at: P;
  dir: P; // forearm direction (elbow → wrist), normalised or not
  s: number;
  r: number;
  look: Pick<Look, 'skin' | 'skinShade'>;
  kind: 'open' | 'fist';
  thumbSide?: 1 | -1;
}> = ({at, dir, s, r, look, kind, thumbSide = 1}) => {
  const L = len(dir) || 1;
  const d = {x: dir.x / L, y: dir.y / L};
  const n = {x: -d.y * thumbSide, y: d.x * thumbSide};
  const ang = (Math.atan2(d.y, d.x) * 180) / Math.PI - 90;
  if (kind === 'fist') {
    const c = add(at, mul(d, r * 0.55 * s));
    return (
      <g>
        <ellipse
          cx={c.x}
          cy={c.y}
          rx={r * 1.12 * s}
          ry={r * 1.0 * s}
          transform={`rotate(${f2(ang)} ${f2(c.x)} ${f2(c.y)})`}
          fill={look.skin}
          stroke={look.skinShade}
          strokeWidth={2.4 * s}
        />
        {[-0.45, 0, 0.45].map((k) => {
          const p0 = add(c, add(mul(n, -r * 0.95 * s), mul(d, k * r * s)));
          const p1 = add(c, add(mul(n, -r * 0.35 * s), mul(d, k * r * s)));
          return (
            <path
              key={k}
              d={`M${f2(p0.x)} ${f2(p0.y)} L${f2(p1.x)} ${f2(p1.y)}`}
              stroke={look.skinShade}
              strokeWidth={2 * s}
              strokeLinecap="round"
            />
          );
        })}
        <ellipse
          cx={add(c, mul(n, r * 0.6 * s)).x}
          cy={add(c, mul(n, r * 0.6 * s)).y}
          rx={r * 0.42 * s}
          ry={r * 0.7 * s}
          transform={`rotate(${f2(ang)} ${f2(add(c, mul(n, r * 0.6 * s)).x)} ${f2(add(c, mul(n, r * 0.6 * s)).y)})`}
          fill={look.skin}
          stroke={look.skinShade}
          strokeWidth={2 * s}
        />
      </g>
    );
  }
  const c = add(at, mul(d, r * 0.95 * s));
  const th = add(add(at, mul(d, r * 0.4 * s)), mul(n, r * 0.8 * s));
  return (
    <g>
      <ellipse
        cx={th.x}
        cy={th.y}
        rx={r * 0.36 * s}
        ry={r * 0.72 * s}
        transform={`rotate(${f2(ang + 28 * thumbSide)} ${f2(th.x)} ${f2(th.y)})`}
        fill={look.skin}
        stroke={look.skinShade}
        strokeWidth={2 * s}
      />
      <ellipse
        cx={c.x}
        cy={c.y}
        rx={r * 0.78 * s}
        ry={r * 1.18 * s}
        transform={`rotate(${f2(ang)} ${f2(c.x)} ${f2(c.y)})`}
        fill={look.skin}
        stroke={look.skinShade}
        strokeWidth={2.2 * s}
      />
    </g>
  );
};

export type PersonProps = Readonly<{
  hip: P;
  s: number;
  body: Body;
  look: Look;
  pose: Pose;
  f?: number;
  /** her right sleeve wetness 0..1: dark glaze ≥40 px wide + broken specular + elbow drips */
  wet?: number;
  /** which arm carries the wet: her RIGHT sleeve. Front view = viewer-left ('L'). */
  wetArm?: 'L' | 'R';
  /** wet patch spreading up across the shoulder (s9 → img2 → s10), 0..1 */
  wetShoulder?: number;
  /** cold L0 rim on hair/shoulder (-1 = light from viewer-left) */
  rimCold?: number;
  rimSide?: 1 | -1;
  /** warm rim (L3/L4 only) */
  rimWarm?: number;
  /** cold screen light on the face from below/front (s3–s6) */
  screen?: number;
  /** L1: the warm sliver that touches ONE collar edge (side = which edge) */
  collarSliver?: number;
  collarSide?: 1 | -1;
  /** phone held in a hand */
  phoneIn?: 'L' | 'R';
  phoneLit?: number;
}>;

/** One stylised person. Opaque plates, fixed draw order:
 *  far leg / back arms → near legs → coat skirt → torso → neck → head → front arms → hands. */
export const Person: React.FC<PersonProps> = (p) => {
  const {hip, s, body: b, look, pose} = p;
  const f = p.f ?? 0;
  const side = pose.view === 'side';
  const fc = pose.facing ?? 1;
  const r = solveRig(hip, s, b, pose);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const wet = clamp01(p.wet ?? 0);
  const wetArm = p.wetArm ?? 'L';
  const across = rot({x: 1, y: 0}, pose.lean ?? 0);
  const up = r.up;
  const lw = 3 * s;

  // ── torso outline (coat) ──
  const shY = add(r.neck, mul(up, -26 * s));
  const torsoPts: P[] = side
    ? [
        add(r.neck, mul(across, -18 * s * fc)),
        add(shY, mul(across, -b.shoulder * 0.42 * s * fc)),
        add(add(r.hip, mul(up, b.torso * 0.45 * s)), mul(across, -b.hip * 0.62 * s * fc)),
        add(r.hip, mul(across, -b.hip * 0.66 * s * fc)),
        add(r.hip, mul(across, b.hip * 0.62 * s * fc)),
        add(add(r.hip, mul(up, b.torso * 0.55 * s)), mul(across, b.shoulder * 0.5 * s * fc)),
        add(shY, mul(across, b.shoulder * 0.4 * s * fc)),
        add(r.neck, mul(across, 22 * s * fc)),
      ]
    : [
        add(r.neck, mul(across, -24 * s)),
        add({x: r.shL.x, y: r.shL.y}, add(mul(across, -b.shoulder * 0.2 * s), mul(up, 6 * s))),
        add(add(r.hip, mul(up, b.torso * 0.42 * s)), mul(across, -(b.hip + 10) * s)),
        add(r.hip, mul(across, -(b.hip + 4) * s)),
        add(r.hip, mul(across, (b.hip + 4) * s)),
        add(add(r.hip, mul(up, b.torso * 0.42 * s)), mul(across, (b.hip + 10) * s)),
        add({x: r.shR.x, y: r.shR.y}, add(mul(across, b.shoulder * 0.2 * s), mul(up, 6 * s))),
        add(r.neck, mul(across, 24 * s)),
      ];

  // ── coat skirt along the thighs (works standing AND seated) ──
  const skirt =
    look.coatLen > 0
      ? (() => {
          const kL = add(r.hipL, mul(sub(r.knL, r.hipL), look.coatLen));
          const kR = add(r.hipR, mul(sub(r.knR, r.hipR), look.coatLen));
          const out = side ? 0 : 1;
          return [
            add(r.hip, mul(across, -(b.hip + 4) * s)),
            add(kL, mul(across, -(26 * out + 12) * s)),
            add(kR, mul(across, (26 * out + 12) * s)),
            add(r.hip, mul(across, (b.hip + 4) * s)),
          ];
        })()
      : null;

  const leg = (h: P, k: P, a: P, key: string, ahead: boolean) => {
    const fwd = side ? fc : a.x < r.hip.x ? -0.35 : 0.35;
    const toe = add(a, {x: 26 * s * fwd, y: 10 * s});
    return (
      <g key={key}>
        <Limb a={h} b={k} w={b.legW * s} color={look.trousers} line={look.coatLine} s={s} />
        <Limb a={k} b={a} w={b.shinW * s} color={look.trousers} line={look.coatLine} s={s} />
        <ellipse
          cx={toe.x}
          cy={toe.y}
          rx={(side ? 46 : 36) * s}
          ry={15 * s}
          fill={look.shoe}
          opacity={ahead ? 1 : 0.96}
        />
      </g>
    );
  };

  const armDraw = (key: 'L' | 'R', a: Arm) => {
    const sh = key === 'L' ? r.shL : r.shR;
    const el = key === 'L' ? r.elL : r.elR;
    const hd = key === 'L' ? r.hdL : r.hdR;
    const isWet = key === wetArm && wet > 0;
    const cuff = add(hd, mul(sub(el, hd), 0.12));
    const n0 = sub(el, sh);
    const nrm = {x: -n0.y / (len(n0) || 1), y: n0.x / (len(n0) || 1)};
    const specSide = (p.rimSide ?? -1) * (key === 'L' ? 1 : -1) >= 0 ? 1 : -1;
    const specOff = mul(nrm, b.armW * 0.22 * s * specSide);
    const n1 = sub(cuff, el);
    const nrm1 = {x: -n1.y / (len(n1) || 1), y: n1.x / (len(n1) || 1)};
    const specOff1 = mul(nrm1, b.foreW * 0.22 * s * specSide);
    return (
      <g key={`arm${key}`}>
        <Limb a={sh} b={el} w={b.armW * s} color={look.coat} line={look.coatLine} s={s} />
        <Limb a={el} b={cuff} w={b.foreW * s} color={look.coat} line={look.coatLine} s={s} />
        {isWet ? (
          <g>
            {/* the glaze: a broad, clearly darker band, shoulder seam → cuff */}
            <path
              d={`M${f2(sh.x)} ${f2(sh.y)} L${f2(el.x)} ${f2(el.y)} L${f2(cuff.x)} ${f2(cuff.y)}`}
              stroke={PAL.wet0}
              strokeWidth={b.armW * 0.8 * s}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.5 + 0.42 * wet}
            />
            {/* broken specular — the thing a thumbnail reads as "wet" */}
            <path
              d={`M${f2(sh.x + specOff.x)} ${f2(sh.y + specOff.y + 10 * s)} L${f2(el.x + specOff.x)} ${f2(el.y + specOff.y)} L${f2(cuff.x + specOff1.x)} ${f2(cuff.y + specOff1.y)}`}
              stroke={PAL.spec}
              strokeWidth={7 * s}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${f2(58 * s)} ${f2(16 * s)} ${f2(26 * s)} ${f2(20 * s)} ${f2(80 * s)} ${f2(14 * s)}`}
              fill="none"
              opacity={0.45 + 0.5 * wet}
            />
            <path
              d={`M${f2(sh.x + specOff.x * 0.4)} ${f2(sh.y + 30 * s)} L${f2(el.x + specOff.x * 0.4)} ${f2(el.y)}`}
              stroke={PAL.sheen}
              strokeWidth={3 * s}
              strokeLinecap="round"
              strokeDasharray={`${f2(20 * s)} ${f2(34 * s)}`}
              fill="none"
              opacity={0.35 * wet}
            />
            {/* drips off the elbow and the cuff — frame-driven, continuous */}
            {[el, cuff, add(el, mul(sub(cuff, el), 0.5))].map((o, i) => {
              const period = 26 + 6 * i;
              const ph = (f + hash(41, i) * period) % period;
              const t = ph / period;
              const y = o.y + 14 * s + t * t * 260 * s;
              return (
                <g key={i}>
                  <ellipse cx={o.x} cy={o.y + 14 * s} rx={5 * s} ry={6.5 * s} fill={PAL.spec} opacity={0.8 * wet} />
                  {t < 0.85 ? (
                    <ellipse
                      cx={o.x}
                      cy={y}
                      rx={4.6 * s}
                      ry={(8 + 10 * t) * s}
                      fill={PAL.spec}
                      opacity={(0.9 - 0.6 * t) * wet}
                    />
                  ) : null}
                </g>
              );
            })}
          </g>
        ) : null}
        {a.hand !== 'none' ? (
          <Hand
            at={hd}
            dir={sub(hd, el)}
            s={s}
            r={b.hand}
            look={look}
            kind={a.hand ?? 'open'}
            thumbSide={key === 'L' ? (side ? fc : 1) : side ? fc : -1}
          />
        ) : null}
        {p.phoneIn === key ? (
          <g>
            <rect
              x={hd.x - 22 * s}
              y={hd.y - 8 * s}
              width={44 * s}
              height={78 * s}
              rx={8 * s}
              fill={PAL.night0}
              stroke="#33424D"
              strokeWidth={2 * s}
              transform={`rotate(${f2(side ? -60 * fc : 0)} ${f2(hd.x)} ${f2(hd.y)})`}
            />
            <rect
              x={hd.x - 18 * s}
              y={hd.y - 4 * s}
              width={36 * s}
              height={66 * s}
              rx={5 * s}
              fill={PAL.screenHi}
              opacity={p.phoneLit ?? 0}
              transform={`rotate(${f2(side ? -60 * fc : 0)} ${f2(hd.x)} ${f2(hd.y)})`}
            />
          </g>
        ) : null}
      </g>
    );
  };

  // ── head ──
  const H = r.head;
  const rx = b.headRx * s;
  const ry = b.headRy * s;
  const tilt = pose.headTilt ?? 0;
  const turn = side ? fc : pose.turn ?? 0;
  const eyes = pose.eyes ?? 'open';
  const eyeY = H.y + ry * 0.1;
  const eyeX = (k: number) => H.x + turn * rx * (side ? 0.62 : 0.32) + k * rx * (side ? 0 : 0.36 * (1 - 0.35 * Math.abs(turn)));
  const hairBack =
    look.hairStyle === 'bob'
      ? `M${f2(H.x - rx * 1.12 - turn * rx * 0.2)} ${f2(H.y - ry * 0.2)} C${f2(H.x - rx * 1.25)} ${f2(H.y + ry * 0.9)} ${f2(H.x - rx * 0.9)} ${f2(H.y + ry * 1.18)} ${f2(H.x - rx * 0.55)} ${f2(H.y + ry * 1.12)} L${f2(H.x + rx * 0.55)} ${f2(H.y + ry * 1.12)} C${f2(H.x + rx * 0.9)} ${f2(H.y + ry * 1.18)} ${f2(H.x + rx * 1.25)} ${f2(H.y + ry * 0.9)} ${f2(H.x + rx * 1.12 - turn * rx * 0.2)} ${f2(H.y - ry * 0.2)} Z`
      : '';
  const hairCap = (() => {
    const o = side ? -fc * rx * 0.28 : -turn * rx * 0.16;
    const low = look.hairStyle === 'short' ? 0.05 : look.hairStyle === 'kid' ? 0.0 : 0.12;
    return `M${f2(H.x - rx * 1.06 + o)} ${f2(H.y + ry * low)} C${f2(H.x - rx * 1.1 + o)} ${f2(H.y - ry * 1.25)} ${f2(H.x + rx * 1.1 + o)} ${f2(H.y - ry * 1.25)} ${f2(H.x + rx * 1.06 + o)} ${f2(H.y + ry * low)} C${f2(H.x + rx * 0.7 + o)} ${f2(H.y - ry * 0.42)} ${f2(H.x - rx * 0.1 + o)} ${f2(H.y - ry * 0.62)} ${f2(H.x - rx * 0.62 + o)} ${f2(H.y - ry * 0.38)} C${f2(H.x - rx * 0.86 + o)} ${f2(H.y - ry * 0.22)} ${f2(H.x - rx * 1.0 + o)} ${f2(H.y)} ${f2(H.x - rx * 1.06 + o)} ${f2(H.y + ry * low)} Z`;
  })();
  const sideBack = side
    ? `M${f2(H.x - fc * rx * 0.05)} ${f2(H.y - ry * 1.0)} C${f2(H.x - fc * rx * 1.45)} ${f2(H.y - ry * 0.9)} ${f2(H.x - fc * rx * 1.35)} ${f2(H.y + ry * (look.hairStyle === 'bob' ? 1.15 : 0.55))} ${f2(H.x - fc * rx * 0.55)} ${f2(H.y + ry * (look.hairStyle === 'bob' ? 1.12 : 0.5))} L${f2(H.x - fc * rx * 0.1)} ${f2(H.y + ry * 0.2)} Z`
    : '';

  const front = (a: Arm) => !a.behind;

  return (
    <g>
      <defs>
        <radialGradient id={`scr-${uid}`} cx="0.5" cy="0.75" r="0.8">
          <stop offset="0%" stopColor={PAL.screenHi} stopOpacity={0.75 * (p.screen ?? 0)} />
          <stop offset="100%" stopColor={PAL.screen} stopOpacity={0} />
        </radialGradient>
      </defs>
      {/* hood hanging behind (child) */}
      {look.hood && !side ? (
        <ellipse cx={r.neck.x} cy={r.neck.y + 6 * s} rx={b.shoulder * 0.62 * s} ry={34 * s} fill={look.hood} stroke={look.coatLine} strokeWidth={lw} />
      ) : null}
      {/* long hair behind the shoulders */}
      {hairBack && !side ? <path d={hairBack} fill={look.hair} transform={`rotate(${tilt} ${f2(H.x)} ${f2(H.y)})`} /> : null}
      {/* back arms */}
      {!front(pose.armR) ? armDraw('R', pose.armR) : null}
      {!front(pose.armL) ? armDraw('L', pose.armL) : null}
      {/* legs: far first */}
      {side ? leg(r.hipR, r.knR, r.anR, 'lr', false) : null}
      {side ? leg(r.hipL, r.knL, r.anL, 'll', true) : null}
      {!side ? leg(r.hipL, r.knL, r.anL, 'll', true) : null}
      {!side ? leg(r.hipR, r.knR, r.anR, 'lr', true) : null}
      {skirt ? <path d={poly(skirt)} fill={look.coat} stroke={look.coatLine} strokeWidth={lw} strokeLinejoin="round" /> : null}
      {/* torso */}
      <path d={poly(torsoPts)} fill={look.coat} stroke={look.coatLine} strokeWidth={lw} strokeLinejoin="round" />
      {/* seam / zip, and a darker side for volume */}
      {!side ? (
        <path
          d={`M${f2(r.neck.x)} ${f2(r.neck.y + 30 * s)} L${f2(r.hip.x)} ${f2(r.hip.y + (skirt ? 60 : 0) * s)}`}
          stroke={look.coatDark}
          strokeWidth={3 * s}
        />
      ) : null}
      {/* wet patch spreading up across the shoulder (s9 → img2 → s10), continuous scalar */}
      {(p.wetShoulder ?? 0) > 0 ? (
        <ellipse
          cx={(wetArm === 'L' ? r.shL : r.shR).x + (wetArm === 'L' ? 18 : -18) * s}
          cy={(wetArm === 'L' ? r.shL : r.shR).y + 20 * s}
          rx={(30 + 46 * (p.wetShoulder ?? 0)) * s}
          ry={(26 + 40 * (p.wetShoulder ?? 0)) * s}
          fill={PAL.wet0}
          opacity={0.75 * (p.wetShoulder ?? 0)}
        />
      ) : null}
      {/* neck */}
      <path
        d={`M${f2(r.neck.x)} ${f2(r.neck.y + 8 * s)} L${f2(H.x)} ${f2(H.y + ry * 0.6)}`}
        stroke={look.skinShade}
        strokeWidth={34 * s}
        strokeLinecap="round"
      />
      {/* collar: the exact edge L1 reaches */}
      {look.hairStyle === 'bob' ? (
        <path
          d={poly(
            side
              ? [add(r.neck, mul(across, -20 * s * fc)), add(r.neck, {x: 20 * s * fc, y: -30 * s}), add(r.neck, {x: 26 * s * fc, y: 22 * s})]
              : [
                  add(r.neck, mul(across, -44 * s)),
                  add(r.neck, add(mul(across, -18 * s), mul(up, 34 * s))),
                  add(r.neck, add(mul(across, 0), mul(up, -40 * s))),
                  add(r.neck, add(mul(across, 18 * s), mul(up, 34 * s))),
                  add(r.neck, mul(across, 44 * s)),
                ],
          )}
          fill={look.coatDark}
          stroke={look.coatLine}
          strokeWidth={lw}
          strokeLinejoin="round"
        />
      ) : null}
      {(p.collarSliver ?? 0) > 0 && !side ? (
        <path
          d={poly([
            add(r.neck, mul(across, (p.collarSide ?? -1) * 50 * s)),
            add(r.neck, add(mul(across, (p.collarSide ?? -1) * 16 * s), mul(up, 30 * s))),
            add(r.neck, add(mul(across, (p.collarSide ?? -1) * 24 * s), mul(up, 34 * s))),
            add(r.neck, mul(across, (p.collarSide ?? -1) * 64 * s)),
          ])}
          fill={PAL.amberHot}
          opacity={0.95 * (p.collarSliver ?? 0)}
        />
      ) : null}
      {/* head */}
      <g transform={`rotate(${tilt} ${f2(H.x)} ${f2(H.y)})`}>
        {sideBack ? <path d={sideBack} fill={look.hair} /> : null}
        <ellipse cx={H.x} cy={H.y} rx={rx} ry={ry} fill={look.skin} stroke={look.skinShade} strokeWidth={2.4 * s} />
        {/* shade on the side away from the key */}
        <path
          d={`M${f2(H.x + (side ? -fc : 1) * rx * 0.2)} ${f2(H.y - ry)} A${f2(rx)} ${f2(ry)} 0 0 ${side ? (fc > 0 ? 0 : 1) : 1} ${f2(H.x + (side ? -fc : 1) * rx * 0.2)} ${f2(H.y + ry)} Z`}
          fill={look.skinShade}
          opacity={0.42}
        />
        {/* ear */}
        {Math.abs(turn) < 0.95 || side ? (
          <ellipse
            cx={H.x + (side ? -fc * rx * 0.12 : -turn * rx * 0.96 + (turn >= 0 ? -1 : 1) * 0)}
            cy={H.y + ry * 0.12}
            rx={10 * s}
            ry={16 * s}
            fill={look.skinShade}
          />
        ) : null}
        <path d={hairCap} fill={look.hair} />
        {/* nose */}
        {side ? (
          <path
            d={`M${f2(H.x + fc * rx * 0.94)} ${f2(H.y - ry * 0.02)} L${f2(H.x + fc * rx * 1.12)} ${f2(H.y + ry * 0.26)} L${f2(H.x + fc * rx * 0.92)} ${f2(H.y + ry * 0.3)} Z`}
            fill={look.skin}
            stroke={look.skinShade}
            strokeWidth={2 * s}
          />
        ) : Math.abs(turn) > 0.12 ? (
          <path
            d={`M${f2(H.x + turn * rx * 0.62)} ${f2(H.y + ry * 0.12)} L${f2(H.x + turn * rx * 0.74)} ${f2(H.y + ry * 0.34)} L${f2(H.x + turn * rx * 0.56)} ${f2(H.y + ry * 0.36)}`}
            stroke={look.skinShade}
            strokeWidth={3 * s}
            fill="none"
            strokeLinecap="round"
          />
        ) : null}
        {/* eyes + brows: expression from posture first, these only confirm it */}
        {(side ? [0] : [-1, 1]).map((k) => {
          const ex = eyeX(k);
          return (
            <g key={k}>
              {eyes === 'open' ? (
                <ellipse cx={ex} cy={eyeY} rx={5.2 * s} ry={7 * s} fill={PAL.night0} opacity={0.88} />
              ) : (
                <path
                  d={`M${f2(ex - 9 * s)} ${f2(eyeY + (eyes === 'down' ? 2 : 0) * s)} Q${f2(ex)} ${f2(eyeY + (eyes === 'down' ? 7 : 5) * s)} ${f2(ex + 9 * s)} ${f2(eyeY + (eyes === 'down' ? 2 : 0) * s)}`}
                  stroke={PAL.night0}
                  strokeWidth={3.4 * s}
                  fill="none"
                  strokeLinecap="round"
                  opacity={0.85}
                />
              )}
              <path
                d={`M${f2(ex - 11 * s)} ${f2(eyeY - 20 * s + (k * 3 + (side ? 0 : 0)) * s)} L${f2(ex + 11 * s)} ${f2(eyeY - 22 * s - k * 3 * s)}`}
                stroke={look.hair}
                strokeWidth={3.6 * s}
                strokeLinecap="round"
                opacity={0.8}
              />
            </g>
          );
        })}
        {/* mouth */}
        {pose.mouth === 'open' ? (
          <ellipse cx={H.x + turn * rx * (side ? 0.7 : 0.3)} cy={H.y + ry * 0.55} rx={8 * s} ry={9 * s} fill={PAL.night0} opacity={0.8} />
        ) : (
          <path
            d={`M${f2(H.x + turn * rx * (side ? 0.62 : 0.3) - 10 * s)} ${f2(H.y + ry * 0.55)} L${f2(H.x + turn * rx * (side ? 0.62 : 0.3) + 10 * s)} ${f2(H.y + ry * 0.55 + (pose.mouth === 'tight' ? 2 : 0) * s)}`}
            stroke={look.skinShade}
            strokeWidth={3.4 * s}
            strokeLinecap="round"
          />
        )}
        {/* screen light on the face */}
        {(p.screen ?? 0) > 0 ? <ellipse cx={H.x} cy={H.y + ry * 0.2} rx={rx * 1.3} ry={ry * 1.3} fill={`url(#scr-${uid})`} /> : null}
        {/* cold rim (L0) on the lamp side of the hair */}
        {(p.rimCold ?? 0) > 0 ? (
          <path
            d={`M${f2(H.x + (p.rimSide ?? -1) * rx * 0.2)} ${f2(H.y - ry * 1.04)} Q${f2(H.x + (p.rimSide ?? -1) * rx * 1.18)} ${f2(H.y - ry * 0.9)} ${f2(H.x + (p.rimSide ?? -1) * rx * 1.08)} ${f2(H.y + ry * 0.3)}`}
            stroke="#C9D3D6"
            strokeWidth={4 * s}
            fill="none"
            strokeLinecap="round"
            opacity={0.55 * (p.rimCold ?? 0)}
          />
        ) : null}
        {(p.rimWarm ?? 0) > 0 ? (
          <path
            d={`M${f2(H.x + rx * 0.3)} ${f2(H.y - ry * 1.02)} Q${f2(H.x + rx * 1.2)} ${f2(H.y - ry * 0.8)} ${f2(H.x + rx * 1.06)} ${f2(H.y + ry * 0.5)}`}
            stroke={PAL.amberHot}
            strokeWidth={6 * s}
            fill="none"
            strokeLinecap="round"
            opacity={0.8 * (p.rimWarm ?? 0)}
          />
        ) : null}
      </g>
      {/* cold rim on the shoulder line, lamp side */}
      {(p.rimCold ?? 0) > 0 && !side ? (
        <path
          d={`M${f2(((p.rimSide ?? -1) < 0 ? r.shL : r.shR).x)} ${f2(((p.rimSide ?? -1) < 0 ? r.shL : r.shR).y - 20 * s)} Q${f2(((p.rimSide ?? -1) < 0 ? r.shL : r.shR).x + (p.rimSide ?? -1) * 34 * s)} ${f2(((p.rimSide ?? -1) < 0 ? r.shL : r.shR).y)} ${f2(((p.rimSide ?? -1) < 0 ? r.shL : r.shR).x + (p.rimSide ?? -1) * 30 * s)} ${f2(((p.rimSide ?? -1) < 0 ? r.shL : r.shR).y + 70 * s)}`}
          stroke="#C9D3D6"
          strokeWidth={4 * s}
          fill="none"
          strokeLinecap="round"
          opacity={0.5 * (p.rimCold ?? 0)}
        />
      ) : null}
      {(p.rimWarm ?? 0) > 0 ? (
        <path
          d={`M${f2(r.shR.x - 10 * s)} ${f2(r.shR.y - 18 * s)} Q${f2(r.shR.x + 40 * s)} ${f2(r.shR.y + 10 * s)} ${f2(r.shR.x + 30 * s)} ${f2(r.shR.y + 120 * s)}`}
          stroke={PAL.amberHot}
          strokeWidth={7 * s}
          fill="none"
          strokeLinecap="round"
          opacity={0.75 * (p.rimWarm ?? 0)}
        />
      ) : null}
      {/* front arms + hands last (a hand on the face or a fist on a shaft must be on top) */}
      {front(pose.armR) ? armDraw('R', pose.armR) : null}
      {front(pose.armL) ? armDraw('L', pose.armL) : null}
    </g>
  );
};

/** The child: `wet` and its relatives are not in the type — there is no code path to wet them. */
export const Child: React.FC<Omit<PersonProps, 'wet' | 'wetShoulder' | 'body' | 'look' | 'rimWarm'>> = (p) => (
  <Person {...p} body={CHILD} look={KID} wet={0} wetShoulder={0} />
);

// ───────────────────────────── 5 · The umbrella ─────────────────────────────

export type UmbrellaGeom = Readonly<{
  hand: P; // grip point — the centre of HER fist
  ang: number; // shaft angle from vertical, + = top toward +x
  len: number; // grip → apex
  r: number; // canopy half width
  depth: number;
}>;

export const umbrellaFrame = (g: UmbrellaGeom) => {
  const up = {x: Math.sin(g.ang * D2R), y: -Math.cos(g.ang * D2R)};
  const perp = {x: Math.cos(g.ang * D2R), y: Math.sin(g.ang * D2R)};
  const apex = add(g.hand, mul(up, g.len));
  const rimC = sub(apex, mul(up, g.depth));
  const L = sub(rimC, mul(perp, g.r));
  const R = add(rimC, mul(perp, g.r));
  const at = (u: number, v: number) => add(add(rimC, mul(perp, u)), mul(up, v));
  return {up, perp, apex, rimC, L, R, at};
};

/** The canopy's shadow cone on everything under it (the child, the pavement). */
export const canopyShadowPts = (g: UmbrellaGeom, reach: number, spread = 0.12): P[] => {
  const u = umbrellaFrame(g);
  return [
    u.at(-g.r * 0.96, 0),
    u.at(g.r * 0.96, 0),
    add(u.R, {x: g.r * spread, y: reach}),
    add(u.L, {x: -g.r * spread * 0.4, y: reach}),
  ];
};

/** The ONE black umbrella, open. The shaft starts INSIDE the grip (draw the hand after it). */
export const UmbrellaOpen: React.FC<
  UmbrellaGeom & {f: number; s: number; warm?: number; rimLight?: number; drips?: number}
> = (g) => {
  const u = umbrellaFrame(g);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const N = 28;
  const dome: P[] = [];
  for (let i = 0; i <= N; i++) {
    const t = Math.PI * (1 - i / N);
    // slightly flattened dome; the rim between ribs scallops up
    dome.push(u.at(g.r * Math.cos(t), g.depth * Math.pow(Math.sin(t), 0.8)));
  }
  const ribs = 8;
  const rim: P[] = [];
  for (let k = 0; k <= ribs; k++) {
    const x0 = -g.r + (2 * g.r * k) / ribs;
    rim.push(u.at(x0, 0));
    if (k < ribs) rim.push(u.at(x0 + g.r / ribs, g.depth * 0.07));
  }
  const outline = [...dome.slice(0, -1), ...rim.slice().reverse()];
  const s = g.s;
  const hook0 = add(g.hand, mul(u.up, -34 * s));
  const hook1 = add(hook0, add(mul(u.up, -40 * s), mul(u.perp, -26 * s)));
  const hook2 = add(hook0, add(mul(u.up, -10 * s), mul(u.perp, -48 * s)));
  const tip = add(u.apex, mul(u.up, 34 * s));
  const warm = g.warm ?? 0;
  const drips = g.drips ?? 1;
  return (
    <g>
      <defs>
        <linearGradient id={`can-${uid}`} gradientUnits="userSpaceOnUse" x1={u.apex.x} y1={u.apex.y} x2={u.rimC.x} y2={u.rimC.y + 10}>
          <stop offset="0%" stopColor="#1C2A35" />
          <stop offset="100%" stopColor="#070C11" />
        </linearGradient>
        <linearGradient id={`canW-${uid}`} gradientUnits="userSpaceOnUse" x1={u.L.x} y1={u.L.y} x2={u.R.x} y2={u.R.y}>
          <stop offset="0%" stopColor={PAL.amber} stopOpacity={0.05 * warm} />
          <stop offset="70%" stopColor={PAL.amber} stopOpacity={0.22 * warm} />
          <stop offset="100%" stopColor={PAL.amberHot} stopOpacity={0.55 * warm} />
        </linearGradient>
      </defs>
      {/* shaft: grip → apex → scuffed metal tip */}
      <path d={`M${f2(hook0.x)} ${f2(hook0.y)} L${f2(tip.x)} ${f2(tip.y)}`} stroke="#3B4A55" strokeWidth={9 * s} strokeLinecap="round" />
      <path d={`M${f2(hook0.x)} ${f2(hook0.y)} L${f2(u.apex.x)} ${f2(u.apex.y)}`} stroke="#8EA2B0" strokeWidth={2.2 * s} opacity={0.5} />
      {/* J hook under the fist */}
      <path
        d={`M${f2(hook0.x)} ${f2(hook0.y)} Q${f2(hook1.x)} ${f2(hook1.y)} ${f2(hook2.x)} ${f2(hook2.y)}`}
        stroke="#2A3640"
        strokeWidth={15 * s}
        fill="none"
        strokeLinecap="round"
      />
      {/* canopy */}
      <path d={poly(outline)} fill={`url(#can-${uid})`} stroke="#03070B" strokeWidth={2 * s} strokeLinejoin="round" />
      {warm > 0 ? <path d={poly(outline)} fill={`url(#canW-${uid})`} /> : null}
      {Array.from({length: ribs - 1}).map((_, k) => {
        const x0 = -g.r + (2 * g.r * (k + 1)) / ribs;
        const c = u.at(x0 * 0.62, g.depth * 0.86);
        const e = u.at(x0, 0);
        return (
          <path
            key={k}
            d={`M${f2(u.apex.x)} ${f2(u.apex.y)} Q${f2(c.x)} ${f2(c.y)} ${f2(e.x)} ${f2(e.y)}`}
            stroke="#2C3D49"
            strokeWidth={2 * s}
            fill="none"
            opacity={0.8}
          />
        );
      })}
      {/* cold rim light along the canopy top: keeps the silhouette readable on the night sky */}
      <path
        d={dome.map((p, i) => `${i ? 'L' : 'M'}${f2(p.x)} ${f2(p.y)}`).join(' ')}
        stroke={warm > 0.5 ? PAL.amberHot : '#A9C2D2'}
        strokeWidth={4 * s}
        fill="none"
        strokeLinecap="round"
        opacity={0.65 * (g.rimLight ?? 1)}
      />
      <circle cx={tip.x} cy={tip.y} r={6 * s} fill="#C7D3DB" />
      {/* beads on the rim + drips falling: big enough to read at strip scale */}
      {rim
        .filter((_, i) => i % 2 === 0)
        .map((p, i) => {
          const period = 30 + Math.floor(hash(17, i) * 14);
          const ph = (g.f + hash(19, i) * period) % period;
          const t = ph / period;
          const fall = t > 0.35 ? (t - 0.35) / 0.65 : -1;
          return (
            <g key={i}>
              <ellipse cx={p.x} cy={p.y + 7 * s} rx={6 * s} ry={(6 + (t < 0.35 ? 6 * t : 0)) * s} fill={PAL.spec} opacity={0.85} />
              {fall >= 0 && drips > 0 ? (
                <ellipse
                  cx={p.x}
                  cy={p.y + 14 * s + fall * fall * 420 * s}
                  rx={5.5 * s}
                  ry={(10 + 12 * fall) * s}
                  fill={PAL.spec}
                  opacity={(0.95 - 0.55 * fall) * drips}
                />
              ) : null}
            </g>
          );
        })}
    </g>
  );
};

/** The same umbrella, furled: tip → handle. Used s3 (by the door), s7/s8 (in her lap). */
export const UmbrellaFurled: React.FC<{a: P; b: P; s: number; drip?: number; f?: number; warm?: number}> = ({
  a,
  b,
  s,
  drip = 0,
  f = 0,
  warm = 0,
}) => {
  const d = sub(b, a);
  const L = len(d);
  const dn = {x: d.x / L, y: d.y / L};
  const n = {x: -dn.y, y: dn.x};
  const tipEnd = add(a, mul(dn, 44 * s));
  const body0 = add(a, mul(dn, 60 * s));
  const fat = add(a, mul(dn, L * 0.55));
  const body1 = add(a, mul(dn, L * 0.8));
  const hook0 = b;
  const hook1 = add(b, add(mul(dn, 46 * s), mul(n, 10 * s)));
  const hook2 = add(b, add(mul(dn, 26 * s), mul(n, 44 * s)));
  const pts = [
    add(body0, mul(n, -6 * s)),
    add(fat, mul(n, -30 * s)),
    add(body1, mul(n, -16 * s)),
    add(body1, mul(n, 16 * s)),
    add(fat, mul(n, 30 * s)),
    add(body0, mul(n, 6 * s)),
  ];
  return (
    <g>
      <path d={`M${f2(a.x)} ${f2(a.y)} L${f2(b.x)} ${f2(b.y)}`} stroke="#3B4A55" strokeWidth={9 * s} strokeLinecap="round" />
      <path d={poly(pts)} fill="#0A1219" stroke="#03070B" strokeWidth={2 * s} strokeLinejoin="round" />
      {/* fold lines + strap */}
      {[0.35, 0.55, 0.72].map((k) => {
        const c = add(a, mul(dn, L * k));
        return <path key={k} d={`M${f2(c.x + n.x * -22 * s)} ${f2(c.y + n.y * -22 * s)} L${f2(c.x + n.x * 20 * s + dn.x * 30 * s)} ${f2(c.y + n.y * 20 * s + dn.y * 30 * s)}`} stroke="#1D2B35" strokeWidth={3 * s} />;
      })}
      <path d={`M${f2(add(fat, mul(n, -30 * s)).x)} ${f2(add(fat, mul(n, -30 * s)).y)} L${f2(add(fat, mul(n, 30 * s)).x)} ${f2(add(fat, mul(n, 30 * s)).y)}`} stroke="#22313C" strokeWidth={10 * s} />
      {warm > 0 ? <path d={poly(pts)} fill={PAL.amber} opacity={0.18 * warm} /> : null}
      {/* scuffed metal tip */}
      <path d={`M${f2(a.x)} ${f2(a.y)} L${f2(tipEnd.x)} ${f2(tipEnd.y)}`} stroke="#B9C7D1" strokeWidth={6 * s} strokeLinecap="round" />
      <path d={`M${f2(a.x + n.x * 2 * s)} ${f2(a.y + n.y * 2 * s)} L${f2(add(a, mul(dn, 16 * s)).x)} ${f2(add(a, mul(dn, 16 * s)).y)}`} stroke="#6A7884" strokeWidth={2 * s} />
      <path d={`M${f2(hook0.x)} ${f2(hook0.y)} Q${f2(hook1.x)} ${f2(hook1.y)} ${f2(hook2.x)} ${f2(hook2.y)}`} stroke="#2A3640" strokeWidth={15 * s} fill="none" strokeLinecap="round" />
      {drip > 0
        ? [0, 1].map((i) => {
            const period = 34 + i * 9;
            const t = ((f + hash(61, i) * period) % period) / period;
            return (
              <ellipse key={i} cx={a.x + (i - 0.5) * 6 * s} cy={a.y + 8 * s + t * t * 120 * s} rx={4 * s} ry={(6 + 6 * t) * s} fill={PAL.spec} opacity={(0.9 - 0.7 * t) * drip} />
            );
          })
        : null}
    </g>
  );
};

/** Returns the outline points of the furled umbrella (for the s7 sheen clip). */
export const furledOutline = (a: P, b: P, s: number): P[] => {
  const d = sub(b, a);
  const L = len(d);
  const dn = {x: d.x / L, y: d.y / L};
  const n = {x: -dn.y, y: dn.x};
  const body0 = add(a, mul(dn, 60 * s));
  const fat = add(a, mul(dn, L * 0.55));
  const body1 = add(a, mul(dn, L * 0.8));
  return [
    add(body0, mul(n, -6 * s)),
    add(fat, mul(n, -30 * s)),
    add(body1, mul(n, -16 * s)),
    add(body1, mul(n, 16 * s)),
    add(fat, mul(n, 30 * s)),
    add(body0, mul(n, 6 * s)),
  ];
};
export const polyPath = poly;

// ───────────────────────────── 6 · Props ─────────────────────────────

/** Rain: thin streaks, deterministic on f; `exclude` polygons are masked out (canopy cone, D-23). */
export const Rain: React.FC<{
  f: number;
  count: number;
  seed: number;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  speed?: number;
  opacity?: number;
  width?: number;
  exclude?: readonly (readonly P[])[];
  color?: string;
}> = ({f, count, seed, x0 = -40, x1 = 1120, y0 = -100, y1 = 1920, speed = 1, opacity = 0.4, width = 2, exclude, color = '#C9D6DE'}) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const H = y1 - y0;
  return (
    <g>
      {exclude && exclude.length ? (
        <defs>
          <mask id={`rm-${uid}`} maskUnits="userSpaceOnUse" x={-200} y={-200} width={1480} height={2400}>
            <rect x={-200} y={-200} width={1480} height={2400} fill="#fff" />
            {exclude.map((e, i) => (
              <path key={i} d={poly(e)} fill="#000" />
            ))}
          </mask>
        </defs>
      ) : null}
      <g mask={exclude && exclude.length ? `url(#rm-${uid})` : undefined} opacity={opacity}>
        {Array.from({length: count}).map((_, i) => {
          const x = x0 + hash(seed, i) * (x1 - x0);
          const v = (24 + 16 * hash(seed, i + 90)) * speed;
          const y = y0 + ((hash(seed, i + 500) * H + f * v) % H);
          const l = 40 + 70 * hash(seed, i + 300);
          return (
            <path
              key={i}
              d={`M${f2(x)} ${f2(y)} L${f2(x - l * 0.16)} ${f2(y + l)}`}
              stroke={color}
              strokeWidth={width}
              strokeLinecap="round"
              opacity={0.45 + 0.55 * hash(seed, i + 7)}
            />
          );
        })}
      </g>
    </g>
  );
};

/** The street lamp — ONE asset, one softness everywhere (D-A13). */
export const Lamp: React.FC<{x: number; top: number; ground: number; pool?: number; glow?: number}> = ({
  x,
  top,
  ground,
  pool = 1,
  glow = 1,
}) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <g>
      <defs>
        <radialGradient id={`lg-${uid}`}>
          <stop offset="0%" stopColor={PAL.sodiumCore} stopOpacity={0.55 * glow} />
          <stop offset="30%" stopColor={PAL.sodium} stopOpacity={0.22 * glow} />
          <stop offset="100%" stopColor={PAL.sodium} stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`lp-${uid}`}>
          <stop offset="0%" stopColor={PAL.sodium} stopOpacity={0.34 * pool} />
          <stop offset="100%" stopColor={PAL.sodium} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={x + 60} cy={ground + 30} rx={300} ry={70} fill={`url(#lp-${uid})`} />
      <rect x={x - 7} y={top + 20} width={14} height={ground - top - 20} fill="#071016" />
      <path d={`M${x} ${top + 24} Q${x + 10} ${top - 10} ${x + 60} ${top - 6}`} stroke="#071016" strokeWidth={10} fill="none" />
      <circle cx={x + 64} cy={top + 14} r={220} fill={`url(#lg-${uid})`} />
      <path d={`M${x + 34} ${top - 6} L${x + 96} ${top - 6} L${x + 86} ${top + 16} L${x + 44} ${top + 16} Z`} fill="#0B151C" />
      <ellipse cx={x + 65} cy={top + 18} rx={22} ry={7} fill={PAL.sodiumCore} opacity={0.95 * glow} />
    </g>
  );
};

/** A lit window with bloom + mullions + a spill streak on the wet street. */
export const LitWindow: React.FC<{x: number; y: number; w: number; h: number; on?: number; warm?: number; spillTo?: number}> = ({
  x,
  y,
  w,
  h,
  on = 1,
  warm = 0,
  spillTo,
}) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const col = warm > 0.5 ? PAL.amber : PAL.window;
  return (
    <g>
      <defs>
        <radialGradient id={`wb-${uid}`}>
          <stop offset="0%" stopColor={col} stopOpacity={0.32 * on} />
          <stop offset="100%" stopColor={col} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={x + w / 2} cy={y + h / 2} rx={w * 1.6} ry={h * 1.3} fill={`url(#wb-${uid})`} />
      <rect x={x} y={y} width={w} height={h} fill={col} opacity={0.72 * on} />
      <rect x={x + w * 0.08} y={y + h * 0.55} width={w * 0.84} height={h * 0.4} fill="#7E6248" opacity={0.35 * on} />
      <rect x={x + w / 2 - 3} y={y} width={6} height={h} fill={PAL.night1} />
      <rect x={x} y={y + h * 0.46 - 3} width={w} height={6} fill={PAL.night1} />
      <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} fill="none" stroke={PAL.night1} strokeWidth={8} />
      {spillTo !== undefined ? (
        <rect x={x + w * 0.2} y={spillTo} width={w * 0.6} height={260} fill={col} opacity={0.12 * on} rx={w * 0.3} />
      ) : null}
    </g>
  );
};

/** Drinking glass, side view; `water` 0..1. */
export const Glass: React.FC<{x: number; base: number; w: number; h: number; water?: number; lit?: number}> = ({
  x,
  base,
  w,
  h,
  water = 0,
  lit = 0,
}) => (
  <g>
    <ellipse cx={x} cy={base + 2} rx={w * 0.62} ry={w * 0.12} fill={PAL.night0} opacity={0.6} />
    <path d={`M${x - w / 2} ${base - h} L${x - w * 0.42} ${base} L${x + w * 0.42} ${base} L${x + w / 2} ${base - h} Z`} fill="#9FB4C2" opacity={0.16 + 0.1 * lit} />
    {water > 0 ? (
      <path
        d={`M${x - w * 0.47} ${base - h * water * 0.85} L${x - w * 0.42} ${base - 4} L${x + w * 0.42} ${base - 4} L${x + w * 0.47} ${base - h * water * 0.85} Z`}
        fill={PAL.sheen}
        opacity={0.55}
      />
    ) : null}
    <path d={`M${x - w / 2} ${base - h} L${x - w * 0.42} ${base} L${x + w * 0.42} ${base} L${x + w / 2} ${base - h}`} stroke="#D3E1EA" strokeWidth={4} fill="none" strokeLinejoin="round" />
    <ellipse cx={x} cy={base - h} rx={w / 2} ry={w * 0.1} stroke="#D3E1EA" strokeWidth={3.5} fill="none" />
    <path d={`M${x - w * 0.3} ${base - h * 0.85} L${x - w * 0.26} ${base - h * 0.2}`} stroke="#FFFFFF" strokeWidth={4} opacity={0.5} strokeLinecap="round" />
  </g>
);

/** A cup (mug), side view, warm (L4) with steam. */
export const Cup: React.FC<{x: number; base: number; w: number; h: number; f: number; warm?: number}> = ({x, base, w, h, f, warm = 1}) => (
  <g>
    <ellipse cx={x + 6} cy={base + 4} rx={w * 0.72} ry={w * 0.16} fill={PAL.night0} opacity={0.75} />
    <path d={`M${x + w * 0.45} ${base - h * 0.75} C${x + w * 0.95} ${base - h * 0.75} ${x + w * 0.95} ${base - h * 0.2} ${x + w * 0.42} ${base - h * 0.25}`} stroke="#C9B9A6" strokeWidth={w * 0.12} fill="none" />
    <path d={`M${x - w / 2} ${base - h} L${x - w * 0.45} ${base - 6} Q${x} ${base + 6} ${x + w * 0.45} ${base - 6} L${x + w / 2} ${base - h} Z`} fill="#D8CBBB" />
    <path d={`M${x + w * 0.1} ${base - h} L${x + w * 0.16} ${base - 8} Q${x + w * 0.36} ${base - 2} ${x + w * 0.45} ${base - 6} L${x + w / 2} ${base - h} Z`} fill="#A99B8C" />
    <ellipse cx={x} cy={base - h} rx={w / 2} ry={w * 0.13} fill="#5C3E22" />
    <ellipse cx={x} cy={base - h} rx={w / 2} ry={w * 0.13} fill="none" stroke="#EDE3D6" strokeWidth={3} />
    <path d={`M${x - w / 2} ${base - h} L${x - w * 0.45} ${base - 6}`} stroke={PAL.amberHot} strokeWidth={5} opacity={0.7 * warm} />
    {[0, 1, 2].map((i) => {
      const t = ((f * 0.6 + i * 20) % 60) / 60;
      const sx = x - w * 0.2 + i * w * 0.2;
      return (
        <path
          key={i}
          d={`M${sx} ${base - h - 10 - t * 90} q${12} ${-20} 0 ${-40} q${-12} ${-20} 0 ${-40}`}
          stroke="#F3E6D3"
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
          opacity={(0.45 * Math.sin(t * Math.PI)) * warm}
        />
      );
    })}
  </g>
);

// ───────────────────────────── 7 · Phone (recreated UI, labelled `minh hoạ`) ─────────────────────────────

export type PhoneState = 'dark' | 'chat' | 'incoming' | 'missed' | 'facedown';

/** A phone in scene space. The UI is deliberately NOT cuoc-goi-nho's pill call card:
 *  a full-height cold-glass screen, a generic silhouette avatar, a name line and two
 *  round controls, no waveform, no red. */
export const Phone: React.FC<{
  x: number;
  y: number;
  w: number;
  rot?: number;
  state: PhoneState;
  typed?: string;
  cursor?: boolean;
  ring?: number; // 0..1 ring pulse
  dim?: number; // 0..1 screen brightness
}> = ({x, y, w, rot: r0 = 0, state, typed = '', cursor = false, ring = 0, dim = 1}) => {
  const h = w * 2.05;
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const k = w / 300; // UI designed at 300 px width
  if (state === 'facedown') {
    return (
      <g transform={`rotate(${r0} ${x + w / 2} ${y + h / 2})`}>
        <rect x={x + 8} y={y + 12} width={w} height={h} rx={34 * k} fill={PAL.night0} opacity={0.7} />
        <rect x={x} y={y} width={w} height={h} rx={34 * k} fill="#1A242C" stroke="#3A4852" strokeWidth={3} />
        <rect x={x + w * 0.1} y={y + w * 0.1} width={w * 0.34} height={w * 0.34} rx={20 * k} fill="#10181E" />
        <circle cx={x + w * 0.2} cy={y + w * 0.2} r={w * 0.06} fill="#05090C" />
        <circle cx={x + w * 0.34} cy={y + w * 0.34} r={w * 0.06} fill="#05090C" />
      </g>
    );
  }
  const lit = state === 'dark' ? 0 : dim;
  return (
    <g transform={`rotate(${r0} ${x + w / 2} ${y + h / 2})`}>
      <defs>
        <linearGradient id={`ph-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E4C63" />
          <stop offset="100%" stopColor="#13222E" />
        </linearGradient>
        <radialGradient id={`pg-${uid}`}>
          <stop offset="0%" stopColor={PAL.screen} stopOpacity={0.35 * lit} />
          <stop offset="100%" stopColor={PAL.screen} stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={x + w / 2} cy={y + h / 2} rx={w * 1.25} ry={h * 0.8} fill={`url(#pg-${uid})`} />
      <rect x={x + 10} y={y + 14} width={w} height={h} rx={36 * k} fill={PAL.night0} opacity={0.6} />
      <rect x={x} y={y} width={w} height={h} rx={36 * k} fill="#05090C" stroke="#4A5A66" strokeWidth={3} />
      <rect x={x + 12 * k} y={y + 12 * k} width={w - 24 * k} height={h - 24 * k} rx={26 * k} fill={state === 'dark' ? '#070C10' : `url(#ph-${uid})`} opacity={state === 'dark' ? 1 : 0.35 + 0.65 * lit} />
      {state === 'dark' ? (
        // the black screen reflects her head as a dark shape
        <ellipse cx={x + w * 0.5} cy={y + h * 0.42} rx={w * 0.22} ry={w * 0.26} fill="#121B22" />
      ) : null}
      {state === 'incoming' || state === 'missed' ? (
        <g opacity={0.4 + 0.6 * lit}>
          <text x={x + w / 2} y={y + 120 * k} textAnchor="middle" fontFamily={FONT.sans} fontWeight={600} fontSize={26 * k} fill={PAL.grey1}>
            {state === 'incoming' ? 'Cuộc gọi đến' : 'Cuộc gọi nhỡ'}
          </text>
          {state === 'incoming' && ring > 0 ? (
            <circle cx={x + w / 2} cy={y + 235 * k} r={(70 + 40 * ring) * k} fill="none" stroke={PAL.screenHi} strokeWidth={3 * k} opacity={0.5 * (1 - ring)} />
          ) : null}
          <circle cx={x + w / 2} cy={y + 235 * k} r={62 * k} fill="#6E8597" />
          <circle cx={x + w / 2} cy={y + 218 * k} r={22 * k} fill="#B6C6D2" />
          <path d={`M${x + w / 2 - 38 * k} ${y + 280 * k} Q${x + w / 2} ${y + 236 * k} ${x + w / 2 + 38 * k} ${y + 280 * k} Z`} fill="#B6C6D2" />
          <text x={x + w / 2} y={y + 360 * k} textAnchor="middle" fontFamily={FONT.sans} fontWeight={600} fontSize={46 * k} fill={PAL.grey3}>
            Người thân
          </text>
          {state === 'incoming' ? (
            <>
              <circle cx={x + w * 0.27} cy={y + h - 110 * k} r={36 * k} fill="#46586A" />
              <path d={`M${x + w * 0.27 - 16 * k} ${y + h - 104 * k} q${16 * k} ${-14 * k} ${32 * k} 0`} stroke={PAL.grey3} strokeWidth={6 * k} fill="none" strokeLinecap="round" />
              <circle cx={x + w * 0.73} cy={y + h - 110 * k} r={36 * k} fill="#5E8FB0" />
              <path d={`M${x + w * 0.73 - 16 * k} ${y + h - 114 * k} q${16 * k} ${14 * k} ${32 * k} 0`} stroke={PAL.grey3} strokeWidth={6 * k} fill="none" strokeLinecap="round" />
            </>
          ) : (
            <g>
              <path d={`M${x + w / 2 - 30 * k} ${y + 420 * k} l${22 * k} ${22 * k} l${30 * k} ${-30 * k}`} stroke={PAL.grey1} strokeWidth={6 * k} fill="none" strokeLinecap="round" />
              <text x={x + w / 2} y={y + 488 * k} textAnchor="middle" fontFamily={FONT.sans} fontWeight={600} fontSize={26 * k} fill={PAL.grey1}>
                1 lần · chưa gọi lại
              </text>
            </g>
          )}
        </g>
      ) : null}
      {state === 'chat' ? (
        <g opacity={0.4 + 0.6 * lit}>
          <rect x={x + 26 * k} y={y + h - 150 * k} width={w - 110 * k} height={70 * k} rx={35 * k} fill="#21384A" stroke="#7FA4BE" strokeWidth={2.5 * k} />
          <text x={x + 48 * k} y={y + h - 105 * k} fontFamily={FONT.sans} fontWeight={600} fontSize={24 * k} fill={PAL.grey3}>
            {typed}
          </text>
          {cursor ? <rect x={x + 50 * k + typed.length * 12.4 * k} y={y + h - 132 * k} width={3 * k} height={34 * k} fill={PAL.screenHi} /> : null}
          <circle cx={x + w - 50 * k} cy={y + h - 115 * k} r={30 * k} fill="#3E6684" />
          <path d={`M${x + w - 62 * k} ${y + h - 115 * k} l${24 * k} 0 m${-10 * k} ${-10 * k} l${10 * k} ${10 * k} l${-10 * k} ${10 * k}`} stroke={PAL.grey3} strokeWidth={4 * k} fill="none" strokeLinecap="round" />
        </g>
      ) : null}
    </g>
  );
};

// ───────────────────────────── 8 · Text layers (HTML) ─────────────────────────────

export type Span = Readonly<{t: string; tier?: 'light' | 'strong'}>;
export type Line = readonly Span[];

/** Accent tiers (content-pack §1): light = cold sheen (never amber, D-17);
 *  strong = amberHot only where the scene light is already warm (L2+), else bright white + sheen underline. */
export const Caption: React.FC<{lines: readonly Line[]; warm?: boolean; opacity?: number}> = ({lines, warm = false, opacity = 1}) => (
  <>
    {/* local scrim: constant from f0, a soft band, never a box (D-A11, no f0→f1 pop) */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 1440,
        height: 330,
        background: 'linear-gradient(180deg, rgba(4,9,15,0) 0%, rgba(4,9,15,0.62) 34%, rgba(4,9,15,0.7) 70%, rgba(4,9,15,0) 100%)',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        bottom: 236, // text box bottom = 1684 ≤ 1690; dot-below + shadow measured ≤ 1710
        textAlign: 'center',
        fontFamily: FONT.sans,
        fontWeight: 600,
        fontSize: 62,
        lineHeight: 1.24,
        color: PAL.grey3,
        textShadow: '0 2px 8px rgba(4,9,15,0.95)',
        opacity,
      }}
    >
      {lines.map((ln, i) => (
        <div key={i}>
          {ln.map((sp, j) => (
            <span
              key={j}
              style={
                sp.tier === 'strong'
                  ? warm
                    ? {color: PAL.amberHot}
                    : {color: '#FFFFFF', textDecoration: 'underline', textDecorationColor: PAL.sheen, textDecorationThickness: 5, textUnderlineOffset: 10}
                  : sp.tier === 'light'
                    ? {color: '#A9D0E6'}
                    : undefined
              }
            >
              {sp.t}
            </span>
          ))}
        </div>
      ))}
    </div>
  </>
);

/** Headline layer, inside the pack's 300–620 band.
 *  `clearAt` — frame index at which it clears (a frame-accurate event, never a re-render);
 *  `from` — frame index at which it starts fading in (opacity ramps over `fade` frames). */
export const Headline: React.FC<{text: string; top?: number; size?: number; opacity?: number; clearAt?: number; from?: number; fade?: number}> = ({
  text,
  top = 380,
  size = 64,
  opacity = 1,
  clearAt,
  from = 0,
  fade = 1,
}) => {
  const frame = useCurrentFrame();
  if (clearAt !== undefined && frame >= clearAt) return null;
  const fin = fade <= 0 ? 1 : Math.max(0, Math.min(1, (frame - from) / fade));
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top,
        textAlign: 'center',
        fontFamily: FONT.sans,
        fontWeight: 600,
        fontSize: size,
        lineHeight: 1.2,
        color: PAL.grey2,
        textShadow: '0 2px 18px rgba(4,9,15,0.95), 0 0 2px rgba(4,9,15,0.9)',
        opacity: opacity * fin,
      }}
    >
      {text}
    </div>
  );
};

export const MinhHoa: React.FC<{x?: number; y: number; center?: boolean}> = ({x = 0, y, center}) => (
  <div
    style={{
      position: 'absolute',
      left: center ? 0 : x,
      right: center ? 0 : undefined,
      top: y,
      textAlign: center ? 'center' : 'left',
      fontFamily: FONT.sans,
      fontWeight: 600,
      fontSize: 34,
      lineHeight: 1.1,
      color: PAL.grey2,
      opacity: 0.85,
      textShadow: '0 1px 6px rgba(4,9,15,0.9)',
    }}
  >
    minh hoạ
  </div>
);

// ───────────────────────────── 9 · Gate-D fix-round additions ─────────────────────────────

/** Alias kept so design-spec §5's prop name resolves to the one rig (no second figure system). */
export const Figure: typeof Person = Person;

/** ONE lamp asset everywhere (D-A13): the sodium street lamp, its glow and its pavement pool. */
export const SodiumLamp = Lamp;

/** Wet pavement plane: value gradient, kerb line, one lamp smear, one soft reflection pool.
 *  Pure function of props — the sheen is constant from frame 0 (D-06: no f0→f1 pop). */
export const WetPavement: React.FC<{
  y: number;
  warm?: number;
  smearX?: number;
  smearW?: number;
  poolX?: number;
  poolW?: number;
  kerb?: number;
}> = ({y, warm = 0, smearX, smearW = 220, poolX, poolW = 300, kerb = 1}) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <g>
      <defs>
        <linearGradient id={`wp-${uid}`} x1="0" y1={y} x2="0" y2={1920} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1B2E3C" />
          <stop offset="45%" stopColor="#101E29" />
          <stop offset="100%" stopColor="#050B11" />
        </linearGradient>
        <linearGradient id={`ws-${uid}`} x1="0" y1={y} x2="0" y2={1920} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={warm > 0.5 ? PAL.amberHot : PAL.sodium} stopOpacity={0.34} />
          <stop offset="100%" stopColor={warm > 0.5 ? PAL.amber : PAL.sodium} stopOpacity={0} />
        </linearGradient>
      </defs>
      <rect x={-40} y={y} width={1160} height={1920 - y} fill={`url(#wp-${uid})`} />
      {smearX !== undefined ? (
        <rect x={smearX - smearW / 2} y={y} width={smearW} height={260} rx={smearW / 2} fill={`url(#ws-${uid})`} />
      ) : null}
      {poolX !== undefined ? <ellipse cx={poolX} cy={y + 46} rx={poolW} ry={54} fill={PAL.sodium} opacity={0.16} /> : null}
      {kerb > 0 ? (
        <>
          <rect x={-40} y={y - 3} width={1160} height={3} fill="#2B4352" opacity={0.7 * kerb} />
          <rect x={-40} y={y} width={1160} height={9} fill="#050B11" opacity={0.5 * kerb} />
        </>
      ) : null}
    </g>
  );
};

/** A solid surface a prop can rest on: step, kerb, bench or table slab, with a lit top edge
 *  and a contact strip. Contact shadows for the objects on it are drawn by the scene. */
export const Surface: React.FC<{x: number; y: number; w: number; h: number; warm?: number; tone?: number}> = ({
  x,
  y,
  w,
  h,
  warm = 0,
  tone = 1,
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="#152330" opacity={0.55 + 0.45 * tone} />
    <rect x={x} y={y} width={w} height={10} rx={5} fill={warm > 0.5 ? '#8A7355' : '#3B5364'} opacity={0.9} />
    <rect x={x} y={y + 10} width={w} height={5} fill="#0A141D" opacity={0.8} />
    <rect x={x} y={y + h - 14} width={w} height={14} fill="#04090F" opacity={0.75} />
  </g>
);

/** Small dark contact shadow under an object standing on a surface (D-02). */
export const Contact: React.FC<{x: number; y: number; w: number; k?: number}> = ({x, y, w, k = 1}) => (
  <ellipse cx={x} cy={y + 2 * k} rx={w / 2} ry={w * 0.1} fill="#020508" opacity={0.55} />
);

/** The door-gap geometry (D-08/D-19): the warm wedge anchored to the door's left jamb.
 *  `open` 0..1 widens the gap; the polygon is what the light mask and the floor wedge share,
 *  so the sliver on her collar is continuous with the door gap — never a floating orb. */
export const doorWedge = (jambX: number, top: number, bottom: number, open: number, reach = 520): P[] => {
  const w = open * reach;
  return [
    pt(jambX, top),
    pt(jambX, bottom),
    pt(jambX - w * 0.72, bottom + 90),
    pt(jambX - w, bottom + 60),
    pt(jambX - w * 0.55, top + (bottom - top) * 0.42),
  ];
};

/** Night grade: the one cold vignette + film grain, `warm` opens the L3/L4 tint. */
export const NightGrade: React.FC<{warm?: number; vignette?: number; grain?: number}> = ({
  warm = 0,
  vignette = 0.5,
  grain = 0.07,
}) => (
  <>
    <Vignette strength={vignette} inner={0.42} color={warm > 0.5 ? '#140D06' : '#04070C'} cx={0.5} cy={0.44} />
    {warm > 0 ? (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse 80% 60% at 72% 62%, rgba(240,180,95,${(0.14 * warm).toFixed(3)}) 0%, rgba(240,180,95,0) 70%)`,
        }}
      />
    ) : null}
    <Grain opacity={grain} blend={warm > 0.5 ? 'overlay' : 'soft-light'} />
  </>
);
