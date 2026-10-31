import {strict as assert} from 'node:assert';
import {test} from 'node:test';
import {bagDisplacement, blendPose, locomotionPose, punchPose, pushupPose, solveTwoBone} from '../../src/animation/character-motion.ts';

const approx = (a: number, b: number, epsilon = 0.001) => assert.ok(Math.abs(a - b) <= epsilon, `${a} != ${b}`);
const finitePose = (pose: ReturnType<typeof locomotionPose>) => {
  for (const point of [pose.head, pose.shoulder, pose.hip, ...pose.elbows, ...pose.hands, ...pose.knees, ...pose.feet]) {
    assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y));
  }
};

test('IK keeps both bone lengths and reaches a target inside reach', () => {
  const r = solveTwoBone({x: 0, y: 0}, {x: 120, y: 80}, 110, 110, 1);
  approx(Math.hypot(r.joint.x, r.joint.y), 110);
  approx(Math.hypot(r.end.x - r.joint.x, r.end.y - r.joint.y), 110);
  approx(r.end.x, 120);
  approx(r.end.y, 80);
});

test('IK clamps unreachable targets without NaN', () => {
  const far = solveTwoBone({x: 0, y: 0}, {x: 3000, y: 0}, 90, 80, 1);
  assert.ok(far.end.x <= 170);
  approx(Math.hypot(far.joint.x, far.joint.y), 90);
  const zero = solveTwoBone({x: 10, y: 10}, {x: 10, y: 10}, 90, 80, -1);
  assert.ok(Number.isFinite(zero.joint.x));
  assert.ok(Number.isFinite(zero.end.y));
});

test('stance foot remains fixed on the ground during walk and run', () => {
  for (const mode of ['walk', 'run'] as const) {
    const speed = mode === 'walk' ? 150 : 280;
    const stepLength = mode === 'walk' ? 78 : 122;
    const duration = stepLength / speed;
    const a = locomotionPose({time: duration * 0.1, originX: 340, groundY: 900, speed, mode});
    const b = locomotionPose({time: duration * 0.8, originX: 340, groundY: 900, speed, mode});
    approx(a.feet[0].x, b.feet[0].x);
    approx(a.feet[0].y, 900);
    approx(b.feet[0].y, 900);
    assert.ok(a.feet[1].y <= 900 && b.feet[1].y <= 900);
    finitePose(a);
    finitePose(b);
  }
});

test('foot positions remain continuous across step changes', () => {
  const speed = 150, duration = 78 / speed;
  const before = locomotionPose({time: duration - 0.00001, originX: 0, groundY: 900, speed, mode: 'walk'});
  const after = locomotionPose({time: duration, originX: 0, groundY: 900, speed, mode: 'walk'});
  for (let i = 0; i < 2; i++) {
    assert.ok(Math.abs(before.feet[i].x - after.feet[i].x) < 1);
    assert.ok(Math.abs(before.feet[i].y - after.feet[i].y) < 1);
  }
});

test('pushups keep palms and toes planted through repetitions', () => {
  const a = pushupPose({time: 0, originX: 820, groundY: 900});
  const b = pushupPose({time: 0.5, originX: 820, groundY: 900});
  for (let i = 0; i < 2; i++) {
    approx(a.hands[i].x, b.hands[i].x);
    approx(a.hands[i].y, 900);
    approx(b.hands[i].y, 900);
    approx(a.feet[i].x, b.feet[i].x);
    approx(b.feet[i].y, 900);
  }
  assert.ok(b.shoulder.y > a.shoulder.y);
  finitePose(b);
});

test('punch fist reaches the bag without crossing through it', () => {
  const bagX = 1070, bagRadius = 78;
  const p = punchPose({time: 0.48, originX: 760, groundY: 900, bagX, bagRadius});
  approx(p.hands[1].x, bagX - bagRadius, 0.5);
  assert.ok(p.hands[1].x <= bagX - bagRadius + 0.5);
  finitePose(p);
});

test('bag impact response is zero before contact and decays', () => {
  approx(bagDisplacement(0.2), 0);
  assert.ok(Math.abs(bagDisplacement(0.66)) > 1);
  assert.ok(Math.abs(bagDisplacement(2.3)) < 60);
});

test('pose blending preserves endpoints and finite joints', () => {
  const a = locomotionPose({time: 0.2, originX: 200, groundY: 900, speed: 150, mode: 'walk'});
  const b = locomotionPose({time: 0.1, originX: 240, groundY: 900, speed: 280, mode: 'run'});
  const mixed = blendPose(a, b, 0.3);
  approx(blendPose(a, b, 0).head.x, a.head.x);
  approx(blendPose(a, b, 1).head.x, b.head.x);
  finitePose(mixed);
});
