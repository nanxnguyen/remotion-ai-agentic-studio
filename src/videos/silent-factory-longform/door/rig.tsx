import React from 'react';
import {solveTwoBone} from '../../../animation/character-motion';
import type {Point} from '../../../animation/character-motion';

/** Frame-deterministic stick-figure rig for the "A Door for Tomorrow" film. */
export const INK = '#1B1E2B';
export const BODY = '#F4F1EA';
export const YELLOW = '#F2B83B';
export const BLUE = '#3E86E0';
export const RED = '#E0533F';

export type Mood = 'neutral' | 'happy' | 'sad' | 'determined' | 'surprised' | 'strain' | 'worried';
export type Who = 'mira' | 'oto' | 'kid' | 'maker';
export type Vec = readonly [number, number];

export type PoseSpec = {
  /** Hip x in world units. */
  x: number;
  /** Ground line y. */
  gy: number;
  s: number;
  facing: 1 | -1;
  /** 0 stand .. 1 deep crouch. */
  crouch?: number;
  /** Explicit hip height in unit space (overrides crouch). */
  hipH?: number;
  /** Torso lean in radians, positive = toward facing direction. */
  lean?: number;
  /** Hand targets relative to shoulder, unit space; x is mirrored by facing. [back, front]. */
  hands: readonly [Vec, Vec];
  /** Foot targets relative to hip x / ground, unit space; y negative lifts. [back, front]. */
  feet: readonly [Vec, Vec];
  tilt?: number;
  look?: Vec;
  mood?: Mood;
  blink?: boolean;
  /** Scarf / cape wind phase. */
  wind?: number;
};

const THIGH = 76;
const SHIN = 74;
const UPPER = 58;
const FORE = 56;
const TORSO = 112;
const HEAD_R = 31;

const P = (x: number, y: number): Point => ({x, y});
const rot = (v: Vec, a: number): Vec => [
  v[0] * Math.cos(a) - v[1] * Math.sin(a),
  v[0] * Math.sin(a) + v[1] * Math.cos(a),
];

export const ease = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const seg = (t: number, a: number, b: number) => ease((t - a) / (b - a));

type Key<T> = readonly [number, T];
/** Keyframe interpolation for numbers or numeric arrays (nested one level). */
export function kf(t: number, keys: readonly Key<number>[]): number {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    if (t <= keys[i][0]) {
      const [t0, v0] = keys[i - 1];
      const [t1, v1] = keys[i];
      return lerp(v0, v1, ease((t - t0) / (t1 - t0)));
    }
  }
  return keys[keys.length - 1][1];
}
export function kv(t: number, keys: readonly Key<Vec>[]): Vec {
  return [
    kf(
      t,
      keys.map(([k, v]) => [k, v[0]] as const),
    ),
    kf(
      t,
      keys.map(([k, v]) => [k, v[1]] as const),
    ),
  ];
}

/** Grounded walk: stance foot pinned in world space for each step. */
export function walk(t: number, x0: number, speed: number, facing: 1 | -1, s: number, stride = 46) {
  const step = stride * s;
  const dur = step / Math.max(1e-6, speed);
  const k = Math.floor(t / dur);
  const ph = (t - k * dur) / dur;
  const x = x0 + facing * speed * t;
  const support = x0 + facing * k * step;
  const swing = x0 + facing * (k - 1 + 2 * ease(ph)) * step;
  const lift = -26 * Math.sin(Math.PI * ph);
  const a: Vec = [(support - x) / s, 0];
  const b: Vec = [(swing - x) / s, lift];
  const feet = k % 2 === 0 ? ([a, b] as const) : ([b, a] as const);
  // Feet are stored relative to hip and later mirrored by facing, so un-mirror here.
  const rel = (v: Vec): Vec => [v[0] * facing, v[1]];
  const swingArm = Math.sin((t / dur) * Math.PI);
  return {
    x,
    feet: [rel(feet[0]), rel(feet[1])] as const,
    bob: Math.abs(Math.sin(Math.PI * ph)) * 5,
    arms: [[-14 + swingArm * 26, 104] as Vec, [14 - swingArm * 26, 104] as Vec] as const,
  };
}

export const STAND_FEET: readonly [Vec, Vec] = [
  [-16, 0],
  [18, 0],
];
export const REST_HANDS: readonly [Vec, Vec] = [
  [-18, 106],
  [20, 106],
];

function solveJoints(p: PoseSpec) {
  const f = p.facing;
  const s = p.s;
  const hipH = p.hipH ?? 146 - (p.crouch ?? 0) * 70;
  const hip = P(p.x, p.gy - hipH * s);
  const lean = (p.lean ?? 0) * f;
  const sv = rot([0, -TORSO], lean);
  const shoulder = P(hip.x + sv[0] * s, hip.y + sv[1] * s);
  const hv = rot([0, -(HEAD_R + 20)], lean + (p.tilt ?? 0) * f);
  const head = P(shoulder.x + hv[0] * s, shoulder.y + hv[1] * s);
  const arm = (h: Vec, i: number) => {
    const target = P(shoulder.x + h[0] * f * s, shoulder.y + h[1] * s);
    // Elbows bend outward/back; front arm bends the other way for natural reach.
    const bend = (i === 0 ? -1 : 1) * f * (h[1] < -20 ? -1 : 1);
    return solveTwoBone(shoulder, target, UPPER * s, FORE * s, bend as 1 | -1);
  };
  const leg = (v: Vec, i: number) => {
    const target = P(hip.x + v[0] * f * s, p.gy + v[1] * s);
    const start = P(hip.x + (i === 0 ? -5 : 5) * f * s, hip.y);
    return solveTwoBone(start, target, THIGH * s, SHIN * s, -f as 1 | -1);
  };
  return {
    hip,
    shoulder,
    head,
    arms: [arm(p.hands[0], 0), arm(p.hands[1], 1)] as const,
    legs: [leg(p.feet[0], 0), leg(p.feet[1], 1)] as const,
  };
}

const Face: React.FC<{c: Point; s: number; f: 1 | -1; mood: Mood; look: Vec; blink: boolean}> = ({
  c,
  s,
  f,
  mood,
  look,
  blink,
}) => {
  const ex = c.x + (look[0] * f + 6 * f) * s;
  const ey = c.y + (look[1] - 4) * s;
  const gap = 11 * s;
  const eye = (dx: number) =>
    blink ? (
      <line
        x1={ex + dx - 4 * s}
        x2={ex + dx + 4 * s}
        y1={ey}
        y2={ey}
        stroke={INK}
        strokeWidth={3 * s}
        strokeLinecap="round"
      />
    ) : mood === 'surprised' ? (
      <circle cx={ex + dx} cy={ey} r={4.6 * s} fill={INK} />
    ) : (
      <ellipse
        cx={ex + dx}
        cy={ey}
        rx={3.6 * s}
        ry={(mood === 'happy' ? 3.4 : 4.4) * s}
        fill={INK}
      />
    );
  const brow = (dx: number, side: -1 | 1) => {
    const inner = side * -1;
    const tilt =
      mood === 'sad' || mood === 'worried'
        ? -5 * inner
        : mood === 'determined' || mood === 'strain'
          ? 5 * inner
          : mood === 'surprised'
            ? -3
            : 0;
    const by = ey - (mood === 'surprised' ? 14 : 11) * s;
    return (
      <line
        x1={ex + dx - 5 * s}
        x2={ex + dx + 5 * s}
        y1={by + tilt * s * (side === 1 ? 1 : -1) * -0.5}
        y2={by - tilt * s * (side === 1 ? 1 : -1) * -0.5}
        stroke={INK}
        strokeWidth={2.6 * s}
        strokeLinecap="round"
      />
    );
  };
  const mx = ex;
  const my = c.y + 13 * s;
  const mouth =
    mood === 'happy' ? (
      <path
        d={`M ${mx - 9 * s} ${my - 2 * s} Q ${mx} ${my + 9 * s} ${mx + 9 * s} ${my - 2 * s}`}
        stroke={INK}
        strokeWidth={3 * s}
        fill="none"
        strokeLinecap="round"
      />
    ) : mood === 'sad' || mood === 'worried' ? (
      <path
        d={`M ${mx - 8 * s} ${my + 4 * s} Q ${mx} ${my - 4 * s} ${mx + 8 * s} ${my + 4 * s}`}
        stroke={INK}
        strokeWidth={3 * s}
        fill="none"
        strokeLinecap="round"
      />
    ) : mood === 'surprised' ? (
      <ellipse cx={mx} cy={my + 2 * s} rx={4 * s} ry={5.5 * s} fill={INK} />
    ) : mood === 'strain' ? (
      <rect x={mx - 8 * s} y={my - 2 * s} width={16 * s} height={6 * s} rx={2 * s} fill={INK} />
    ) : (
      <line
        x1={mx - 7 * s}
        x2={mx + 7 * s}
        y1={my}
        y2={my}
        stroke={INK}
        strokeWidth={3 * s}
        strokeLinecap="round"
      />
    );
  return (
    <g>
      {brow(-gap / 2, -1)}
      {brow(gap / 2, 1)}
      {eye(-gap / 2)}
      {eye(gap / 2)}
      {mouth}
    </g>
  );
};

export const Stick: React.FC<{pose: PoseSpec; who: Who; frame: number; accent?: string}> = ({
  pose,
  who,
  frame,
  accent,
}) => {
  const j = solveJoints(pose);
  const s = pose.s;
  const w = 13 * s;
  const outline = 5 * s;
  const blink = pose.blink ?? frame % 97 < 3;
  const limb = (a: Point, b: Point, c: Point) => `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`;
  const paths = [
    limb(j.hip, j.legs[0].joint, j.legs[0].end),
    limb(j.shoulder, j.arms[0].joint, j.arms[0].end),
    `M ${j.hip.x} ${j.hip.y} L ${j.shoulder.x} ${j.shoulder.y}`,
    limb(P(j.hip.x, j.hip.y), j.legs[1].joint, j.legs[1].end),
    limb(j.shoulder, j.arms[1].joint, j.arms[1].end),
  ];
  const wind = pose.wind ?? frame / 30;
  const f = pose.facing;
  const neck = P(lerp(j.shoulder.x, j.head.x, 0.32), lerp(j.shoulder.y, j.head.y, 0.32));
  const wrist = j.arms[1].end;
  const wristDir = Math.atan2(wrist.y - j.arms[1].joint.y, wrist.x - j.arms[1].joint.x);
  return (
    <g>
      <ellipse
        cx={j.hip.x}
        cy={pose.gy + 4 * s}
        rx={44 * s}
        ry={7 * s}
        fill="#000"
        opacity={0.28}
      />
      {/* Ink outline pass then body pass keeps every limb readable on any background. */}
      {paths.map((d, i) => (
        <path
          key={'o' + i}
          d={d}
          stroke={INK}
          strokeWidth={w + outline}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {paths.map((d, i) => (
        <path
          key={'b' + i}
          d={d}
          stroke={BODY}
          strokeWidth={w}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {who === 'mira' && (
        <>
          {/* Signature yellow satchel on hip and wristband on front wrist. */}
          <rect
            x={j.hip.x - 15 * s * f - 10 * s}
            y={j.hip.y - 8 * s}
            width={22 * s}
            height={20 * s}
            rx={5 * s}
            fill={YELLOW}
            stroke={INK}
            strokeWidth={3 * s}
          />
          <line
            x1={wrist.x - Math.cos(wristDir) * 10 * s}
            y1={wrist.y - Math.sin(wristDir) * 10 * s}
            x2={wrist.x - Math.cos(wristDir) * 20 * s}
            y2={wrist.y - Math.sin(wristDir) * 20 * s}
            stroke={YELLOW}
            strokeWidth={w + 5 * s}
            strokeLinecap="butt"
          />
        </>
      )}
      {who === 'oto' && (
        <>
          <path
            d={`M ${neck.x - 16 * s} ${neck.y} Q ${neck.x} ${neck.y + 12 * s} ${neck.x + 16 * s} ${neck.y}`}
            stroke={BLUE}
            strokeWidth={13 * s}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M ${neck.x - 6 * s * f} ${neck.y + 6 * s} q ${-22 * s * f} ${18 * s} ${-46 * s * f} ${
              10 * s + Math.sin(wind * 4) * 9 * s
            }`}
            stroke={BLUE}
            strokeWidth={10 * s}
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
      {who === 'maker' && accent && (
        <line
          x1={j.hip.x}
          y1={j.hip.y}
          x2={j.shoulder.x}
          y2={j.shoulder.y}
          stroke={accent}
          strokeWidth={w * 0.55}
          strokeLinecap="round"
        />
      )}
      <circle
        cx={j.head.x}
        cy={j.head.y}
        r={HEAD_R * s}
        fill={BODY}
        stroke={INK}
        strokeWidth={outline}
      />
      {who === 'kid' && (
        <path
          d={`M ${j.head.x - 30 * s} ${j.head.y - 9 * s} A ${31 * s} ${31 * s} 0 0 1 ${j.head.x + 30 * s} ${
            j.head.y - 9 * s
          } L ${j.head.x + 30 * s + 18 * s * f} ${j.head.y - 7 * s} Z`}
          fill={RED}
          stroke={INK}
          strokeWidth={3 * s}
        />
      )}
      <Face
        c={j.head}
        s={s}
        f={f}
        mood={pose.mood ?? 'neutral'}
        look={pose.look ?? [0, 0]}
        blink={blink}
      />
    </g>
  );
};

/** Hand world positions, so props can be attached exactly to the drawn hands. */
export function handsOf(pose: PoseSpec): readonly [Point, Point] {
  const j = solveJoints(pose);
  return [j.arms[0].end, j.arms[1].end];
}
export function headOf(pose: PoseSpec): Point {
  return solveJoints(pose).head;
}
