/** Frame-deterministic 2D puppet motion. Pure math: no DOM, timers, or random input. */
export type Point = Readonly<{x: number; y: number}>;
export type Pair = readonly [Point, Point];
export type Expression = 'calm' | 'focused' | 'tired';
export type CharacterPose = Readonly<{
  head: Point;
  shoulder: Point;
  hip: Point;
  elbows: Pair;
  hands: Pair;
  knees: Pair;
  feet: Pair;
  expression: Expression;
}>;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const pt = (x: number, y: number): Point => ({x, y});
const lerpPoint = (a: Point, b: Point, t: number): Point => pt(mix(a.x, b.x, t), mix(a.y, b.y, t));
export const smoothstep = (v: number): number => {
  const t = clamp(v, 0, 1);
  return t * t * (3 - 2 * t);
};

/** Exact two-bone lengths, with the end target constrained to the reachable annulus. */
export const solveTwoBone = (
  start: Point,
  target: Point,
  first: number,
  second: number,
  bend: 1 | -1,
): {joint: Point; end: Point} => {
  if (!(first > 0 && second > 0)) throw new Error('Bone lengths must be positive');
  const dx = target.x - start.x;
  const dy = target.y - start.y;
  const inputDist = Math.hypot(dx, dy);
  const angle = inputDist < 1e-9 ? 0 : Math.atan2(dy, dx);
  const distance = clamp(inputDist, Math.abs(first - second) + 1e-7, first + second - 1e-7);
  const end = pt(start.x + Math.cos(angle) * distance, start.y + Math.sin(angle) * distance);
  const cosAngle = clamp((first * first + distance * distance - second * second) / (2 * first * distance), -1, 1);
  const jointAngle = angle + bend * Math.acos(cosAngle);
  const joint = pt(start.x + first * Math.cos(jointAngle), start.y + first * Math.sin(jointAngle));
  return {joint, end};
};

/** The stance foot is anchored in WORLD coordinates for a whole step; the other foot swings. */
export const locomotionPose = ({time, originX, groundY, speed, mode}: {
  time: number;
  originX: number;
  groundY: number;
  speed: number;
  mode: 'walk' | 'run';
}): CharacterPose => {
  if (!(speed > 0) || time < 0) throw new Error('Locomotion needs positive speed and nonnegative time');
  const stepLength = mode === 'walk' ? 78 : 122;
  const duration = stepLength / speed;
  const k = Math.floor(time / duration);
  const phase = clamp((time - k * duration) / duration, 0, 1);
  const supportX = originX + k * stepLength;
  const swingX = originX + (k - 1 + 2 * smoothstep(phase)) * stepLength;
  const lift = (mode === 'walk' ? 35 : 65) * Math.sin(Math.PI * phase);
  const leftIsSupport = k % 2 === 0;
  const feet: Pair = leftIsSupport
    ? [pt(supportX, groundY), pt(swingX, groundY - lift)]
    : [pt(swingX, groundY - lift), pt(supportX, groundY)];
  const rootX = originX + speed * time;
  const bob = Math.sin(Math.PI * phase) * (mode === 'walk' ? 7 : 13);
  const hip = pt(rootX, groundY - 208 - bob);
  const shoulder = pt(rootX + (mode === 'run' ? 19 : 2), hip.y - 155);
  const head = pt(shoulder.x + 7, shoulder.y - 86);
  const legL = solveTwoBone(pt(hip.x - 23, hip.y), feet[0], 153, 150, -1);
  const legR = solveTwoBone(pt(hip.x + 23, hip.y), feet[1], 153, 150, -1);
  const armSwing = Math.sin((time / duration) * Math.PI);
  const amplitude = mode === 'walk' ? 42 : 75;
  const hands: Pair = [
    pt(shoulder.x - 52 + armSwing * amplitude, shoulder.y + 149 - Math.abs(armSwing) * 16),
    pt(shoulder.x + 52 - armSwing * amplitude, shoulder.y + 149 - Math.abs(armSwing) * 16),
  ];
  const armL = solveTwoBone(pt(shoulder.x - 33, shoulder.y), hands[0], 103, 100, -1);
  const armR = solveTwoBone(pt(shoulder.x + 33, shoulder.y), hands[1], 103, 100, 1);
  return {
    head,
    shoulder,
    hip,
    elbows: [armL.joint, armR.joint],
    hands: [armL.end, armR.end],
    knees: [legL.joint, legR.joint],
    feet: [legL.end, legR.end],
    expression: mode === 'run' ? 'focused' : 'calm',
  };
};

/** Two hands and both feet remain pinned to the ground; upper body lowers then rises. */
export const pushupPose = ({time, originX, groundY}: {
  time: number;
  originX: number;
  groundY: number;
}): CharacterPose => {
  const down = (1 - Math.cos(2 * Math.PI * Math.max(0, time))) / 2;
  const shoulder = pt(originX - 145, groundY - 158 + 64 * down);
  const hip = pt(originX + 54, groundY - 145 + 60 * down);
  const head = pt(shoulder.x - 76, shoulder.y - 18);
  const hands: Pair = [pt(originX - 172, groundY), pt(originX - 122, groundY)];
  const feet: Pair = [pt(originX + 324, groundY), pt(originX + 339, groundY)];
  const armL = solveTwoBone(pt(shoulder.x - 18, shoulder.y), hands[0], 102, 101, -1);
  const armR = solveTwoBone(pt(shoulder.x + 20, shoulder.y), hands[1], 102, 101, 1);
  const knees: Pair = [
    lerpPoint(hip, feet[0], 0.53),
    lerpPoint(hip, feet[1], 0.53),
  ];
  return {head, shoulder, hip, elbows: [armL.joint, armR.joint], hands, knees, feet, expression: 'focused'};
};

const PUNCH_PERIOD = 1.2;
const IMPACT = 0.48;
const reach = (time: number) => {
  const phase = ((time % PUNCH_PERIOD) + PUNCH_PERIOD) % PUNCH_PERIOD;
  if (phase < 0.28 || phase > 0.69) return 0;
  if (phase <= IMPACT) return smoothstep((phase - 0.28) / (IMPACT - 0.28));
  return 1 - smoothstep((phase - IMPACT) / (0.69 - IMPACT));
};

/** Impact drives a damped swing; initial contact occurs at exactly 0.48 + n*1.2 seconds. */
export const bagDisplacement = (time: number): number => {
  if (time <= IMPACT) return 0;
  let displacement = 0;
  for (let impact = IMPACT; impact <= time; impact += PUNCH_PERIOD) {
    const elapsed = time - impact;
    displacement += 54 * Math.exp(-2.8 * elapsed) * Math.sin(8 * elapsed);
  }
  return displacement;
};

/** IK hand locks to the bag front plane on impact. The bag can swing after contact. */
export const punchPose = ({time, originX, groundY, bagX, bagRadius}: {
  time: number;
  originX: number;
  groundY: number;
  bagX: number;
  bagRadius: number;
}): CharacterPose => {
  const extension = reach(time);
  const hip = pt(originX, groundY - 208);
  const shoulder = pt(originX + 12 + extension * 15, groundY - 355);
  const head = pt(shoulder.x + 8, shoulder.y - 87);
  const feet: Pair = [pt(originX - 65, groundY), pt(originX + 72, groundY)];
  const knees: Pair = [
    solveTwoBone(pt(hip.x - 20, hip.y), feet[0], 153, 150, -1).joint,
    solveTwoBone(pt(hip.x + 20, hip.y), feet[1], 153, 150, -1).joint,
  ];
  const palmL = pt(shoulder.x + 40, shoulder.y + 90);
  const palmR = pt(mix(shoulder.x + 70, bagX - bagRadius, extension), shoulder.y + 16);
  const left = solveTwoBone(pt(shoulder.x - 28, shoulder.y), palmL, 139, 139, 1);
  const right = solveTwoBone(pt(shoulder.x + 28, shoulder.y), palmR, 139, 139, -1);
  return {
    head, shoulder, hip,
    elbows: [left.joint, right.joint],
    hands: [left.end, right.end],
    knees, feet,
    expression: 'focused',
  };
};

/** Blend skeleton coordinates for transition windows; do not use it in lieu of foot locking. */
export const blendPose = (a: CharacterPose, b: CharacterPose, amount: number): CharacterPose => {
  const t = clamp(amount, 0, 1);
  const pair = (x: Pair, y: Pair): Pair => [lerpPoint(x[0], y[0], t), lerpPoint(x[1], y[1], t)];
  return {
    head: lerpPoint(a.head, b.head, t),
    shoulder: lerpPoint(a.shoulder, b.shoulder, t),
    hip: lerpPoint(a.hip, b.hip, t),
    elbows: pair(a.elbows, b.elbows),
    hands: pair(a.hands, b.hands),
    knees: pair(a.knees, b.knees),
    feet: pair(a.feet, b.feet),
    expression: t < 0.5 ? a.expression : b.expression,
  };
};
