import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {
  Stick,
  handsOf,
  headOf,
  kf,
  kv,
  lerp,
  seg,
  walk,
  REST_HANDS,
  STAND_FEET,
  YELLOW,
  INK,
} from './rig';
import type {PoseSpec, Vec, Who, Mood} from './rig';
import {
  GY,
  DOOR,
  HINGES,
  DoorWall,
  Handle,
  Key,
  KeyRing,
  Sparks,
  Particles,
  Ladder,
  OilCan,
  Hammer,
  FileTool,
  Bench,
  Toolbox,
  Glint,
  Lamp,
  Interior,
  WindChime,
  HomeBench,
  Bridge,
  BridgeRail,
  rnd,
} from './sets';
import type {DoorState} from './sets';

export type DoorShot = {id: string; caption: string; highlight: string; palette?: string};

const FPS = 30;
const SHOT = 175;
const D = SHOT / FPS;
const W = 1920;
const H = 1080;

type Cam = {z: number; cx: number; cy: number};
type Built = {cam: Cam; node: React.ReactNode; over?: React.ReactNode};

const base = (who: Who, x: number, o: Partial<PoseSpec> = {}): PoseSpec => ({
  x,
  gy: GY,
  s: who === 'oto' ? 0.68 : who === 'kid' ? 0.36 : who === 'maker' ? 0.56 : 0.5,
  facing: 1,
  hands: REST_HANDS,
  feet: STAND_FEET,
  mood: 'neutral',
  ...o,
});

const door = (o: Partial<DoorState> = {}): DoorState => ({
  open: 0,
  handle: 'on',
  pins: [0, 0, 0],
  rust: 1,
  glow: 0,
  dawn: 0,
  ...o,
});

/** Convert a world target into a shoulder-relative hand target for a pose. */
const reachTo = (p: PoseSpec, wx: number, wy: number): Vec => {
  const hipH = p.hipH ?? 146 - (p.crouch ?? 0) * 70;
  const lean = (p.lean ?? 0) * p.facing;
  const sx = p.x + Math.sin(lean) * 112 * p.s;
  const sy = p.gy - hipH * p.s - Math.cos(lean) * 112 * p.s;
  return [((wx - sx) / p.s) * p.facing, (wy - sy) / p.s];
};

const S = (pose: PoseSpec, who: Who, fr: number, accent?: string) => (
  <Stick pose={pose} who={who} frame={fr} accent={accent} />
);

const walking = (
  who: Who,
  t: number,
  x0: number,
  speed: number,
  facing: 1 | -1,
  o: Partial<PoseSpec> = {},
): PoseSpec => {
  const p0 = base(who, x0);
  const w = walk(t, x0, speed, facing, p0.s);
  return {...p0, x: w.x, feet: w.feet, hands: w.arms, facing, hipH: 146 - w.bob, ...o};
};

/** Walk then settle into a standing pose at time `stop`. */
const walkStop = (
  who: Who,
  t: number,
  x0: number,
  speed: number,
  facing: 1 | -1,
  stop: number,
  o: Partial<PoseSpec> = {},
): PoseSpec => {
  if (t < stop) return walking(who, t, x0, speed, facing, o);
  const p = walking(who, stop, x0, speed, facing, o);
  const k = seg(t, stop, stop + 0.5);
  const feet: [Vec, Vec] = [
    [lerp(p.feet[0][0], STAND_FEET[0][0], k), lerp(p.feet[0][1], 0, k)],
    [lerp(p.feet[1][0], STAND_FEET[1][0], k), lerp(p.feet[1][1], 0, k)],
  ];
  return {...p, feet, hands: o.hands ?? REST_HANDS, hipH: 146};
};

const sit = (who: Who, x: number, o: Partial<PoseSpec> = {}): PoseSpec =>
  base(who, x, {
    hipH: 16,
    feet: [
      [70, 0],
      [92, -4],
    ],
    lean: 0.15,
    ...o,
  });

const ringSwing = (t: number) => Math.sin(t * 9) * 16;

// ---------------------------------------------------------------- shots
const shots: ((t: number, fr: number) => Built)[] = [
  // s01 WIDE hook: tiny Mira and the giant door
  (t, fr) => {
    const p = walkStop('mira', t, 250, 95, 1, 3.9, {mood: 'neutral'});
    const look = seg(t, 4.0, 4.8);
    const pose = {
      ...p,
      tilt: -0.45 * look,
      look: [2, -8 * look] as Vec,
      mood: (look > 0.5 ? 'surprised' : 'neutral') as Mood,
    };
    const h = handsOf(pose)[1];
    return {
      cam: {
        z: kf(t, [
          [0, 1.0],
          [D, 1.16],
        ]),
        cx: kf(t, [
          [0, 880],
          [D, 820],
        ]),
        cy: kf(t, [
          [0, 520],
          [D, 600],
        ]),
      },
      node: (
        <>
          <DoorWall st={door()} px={0} t={t} />
          {S(pose, 'mira', fr)}
          <KeyRing
            x={h.x}
            y={h.y}
            swing={t < 3.9 ? ringSwing(t) : ringSwing(t) * Math.exp(-(t - 3.9) * 2)}
          />
        </>
      ),
    };
  },
  // s02 CLOSE: key into the lock, it bends
  (t, fr) => {
    const p = base('mira', 1040, {
      mood: 'determined',
      feet: [
        [-14, -6],
        [16, -8],
      ],
    });
    const lock: Vec = [DOOR.lockX - 2, DOOR.lockY + 30];
    const insert = seg(t, 0.3, 1.4);
    const recoil = seg(t, 3.3, 3.8);
    const target: Vec = [
      lerp(lock[0] - 70, lock[0] - 22, insert) - recoil * 50,
      lock[1] + recoil * 30,
    ];
    const front = reachTo(p, target[0], target[1]);
    const shake = t > 3.3 && t < 4.6 ? Math.sin(t * 40) * 8 : 0;
    const pose: PoseSpec = {
      ...p,
      hands: [reachTo(p, target[0] - 6, target[1] + 6), [front[0], front[1] + shake]],
      mood: t < 1.5 ? 'determined' : t < 3.3 ? 'strain' : t < 4.4 ? 'surprised' : 'worried',
      lean: 0.12,
      tilt: t > 3.3 ? 0.2 : 0,
    };
    const twist = seg(t, 1.6, 3.2) * 40;
    return {
      cam: {
        z: kf(t, [
          [0, 2.4],
          [D, 2.7],
        ]),
        cx: 1050,
        cy: 735,
      },
      node: (
        <>
          <DoorWall st={door()} px={0} t={t} />
          {S(pose, 'mira', fr)}
          {t < 3.3 ? (
            <Key x={lock[0] - 30} y={lock[1]} a={twist} s={0.9} />
          ) : (
            <Key x={handsOf(pose)[1].x + 20} y={handsOf(pose)[1].y} a={20} s={0.9} bend={1} />
          )}
          {t > 3.2 && t < 3.6 && <Sparks x={lock[0]} y={lock[1]} t={t} on color="#D9DEE6" />}
        </>
      ),
    };
  },
  // s03 MED: key after key on the pile
  (t, fr) => {
    const cyc = t % 1.05;
    const n = Math.min(5, Math.floor(t / 1.05));
    const p = base('mira', 1045, {mood: n < 3 ? 'determined' : 'worried'});
    const toLock = seg(cyc, 0, 0.35) * (1 - seg(cyc, 0.55, 0.8));
    const throwBack = seg(cyc, 0.6, 0.9);
    const front = reachTo(
      p,
      lerp(990 - throwBack * 60, DOOR.lockX - 22, toLock),
      lerp(780 - throwBack * 50, DOOR.lockY + 30, toLock),
    );
    const stumble = seg(t, 4.6, 5.3);
    const pose: PoseSpec = {
      ...p,
      x: 1045 - stumble * 70,
      lean: -0.35 * stumble,
      hands: [[-30, 90], front],
      feet:
        stumble > 0
          ? [
              [-40, 0],
              [10, -14 * Math.sin(stumble * Math.PI)],
            ]
          : STAND_FEET,
      mood: stumble > 0.2 ? 'surprised' : p.mood,
    };
    const hand = handsOf(pose)[1];
    // keys flying to the pile
    const flying = cyc > 0.75 && t < 5.2;
    const fk = seg(cyc, 0.75, 1.05);
    return {
      cam: {
        z: 1.55,
        cx: kf(t, [
          [0, 1000],
          [D, 960],
        ]),
        cy: 730,
      },
      node: (
        <>
          <DoorWall st={door()} px={0} t={t} />
          {Array.from({length: n + 2}, (_, i) => (
            <Key
              key={i}
              x={900 + rnd(i) * 70}
              y={GY - 8 - (i % 3) * 7}
              a={rnd(i + 3) * 360}
              s={0.7}
              bend={i % 2}
            />
          ))}
          {S(pose, 'mira', fr)}
          {toLock > 0.1 && <Key x={hand.x + 18} y={hand.y} s={0.7} />}
          {flying && (
            <Key
              x={lerp(hand.x, 920, fk)}
              y={lerp(hand.y, GY - 10, fk) - Math.sin(fk * Math.PI) * 120}
              a={fk * 540}
              s={0.7}
            />
          )}
        </>
      ),
    };
  },
  // s04 DETAIL: keyhole glimmer + Mira's eye
  (t, fr) => {
    const lean = seg(t, 1.8, 3.0);
    const p = base('mira', 1070 - lean * 20, {
      feet: [
        [-20, -10],
        [10, -12],
      ],
      lean: 0.35 * lean,
      tilt: 0.25 * lean,
      mood: 'surprised',
      look: [4, 0],
    });
    const pose: PoseSpec = {
      ...p,
      hands: [
        reachTo(p, DOOR.lockX - 24, DOOR.lockY),
        reachTo(p, DOOR.lockX - 20, DOOR.lockY + 50),
      ],
    };
    const flick = 0.55 + 0.45 * Math.sin(t * 7) * Math.sin(t * 2.3);
    return {
      cam: {
        z: kf(t, [
          [0, 4.2],
          [D, 4.8],
        ]),
        cx: DOOR.lockX - 10,
        cy: DOOR.lockY + 10,
      },
      node: (
        <>
          <DoorWall st={door()} px={0} t={t} />
          <circle cx={DOOR.lockX} cy={DOOR.lockY + 18} r={7} fill="#DDE8F5" opacity={flick} />
          <circle
            cx={DOOR.lockX}
            cy={DOOR.lockY + 18}
            r={22}
            fill="#DDE8F5"
            opacity={flick * 0.25}
          />
          <Glint x={DOOR.lockX + 26} y={DOOR.lockY + 4} s={0.5 * flick} />
          {S(pose, 'mira', fr)}
          <circle
            cx={headOf(pose).x + 16}
            cy={headOf(pose).y}
            r={14}
            fill="#DDE8F5"
            opacity={lean * 0.25 * flick}
          />
        </>
      ),
    };
  },
  // s05 HOME BENCH: filing a key blank
  (t, fr) => {
    const filing = t < 4.2;
    const stroke = Math.sin(t * 9);
    const p = base('mira', 960, {s: 0.78, mood: 'determined', lean: 0.15, look: [3, 4]});
    const front = reachTo(p, 1030 + stroke * 34, 615);
    const wipe = seg(t, 4.3, 4.9) * (1 - seg(t, 5.3, 5.8));
    const back = wipe > 0 ? reachTo(p, headOf(p).x + 20, headOf(p).y - 10) : reachTo(p, 1005, 640);
    const pose: PoseSpec = {
      ...p,
      hands: [back, filing ? front : reachTo(p, 1000, 660)],
      mood: wipe > 0.3 ? 'happy' : 'determined',
    };
    const hand = handsOf(pose)[1];
    return {
      cam: {
        z: kf(t, [
          [0, 1.45],
          [D, 1.6],
        ]),
        cx: 1010,
        cy: 600,
      },
      node: (
        <>
          <HomeBench t={t} lamp={1} />
          <rect
            x={1028}
            y={600}
            width={46}
            height={14}
            fill="#D9B35A"
            stroke={INK}
            strokeWidth={3}
          />
          {S(pose, 'mira', fr)}
          {filing && <FileTool x={hand.x} y={hand.y} a={80} s={1.1} />}
          <Sparks x={1050} y={602} t={t} on={filing} color="#E8EDF2" />
          {Array.from({length: Math.floor(t * 3)}, (_, i) => (
            <path
              key={i}
              d={`M ${1000 + rnd(i) * 120} ${700 - 4} q 6 -8 12 0`}
              stroke="#C9CED6"
              strokeWidth={3}
              fill="none"
            />
          ))}
        </>
      ),
    };
  },
  // s06 DETAIL: the finished golden key
  (t, fr) => {
    const p = base('mira', 960, {s: 0.78});
    const raise = seg(t, 0.2, 1.8);
    const keyP: Vec = [lerp(1050, 1010, raise), lerp(610, 470, raise)];
    const blow = t > 2.0 && t < 3.0;
    const pose: PoseSpec = {
      ...p,
      hands: [reachTo(p, keyP[0] - 30, keyP[1] + 20), reachTo(p, keyP[0] - 10, keyP[1] + 6)],
      mood: blow ? 'surprised' : t > 3.2 ? 'happy' : 'determined',
      look: [4, -2],
      tilt: -0.1,
    };
    return {
      cam: {
        z: kf(t, [
          [0, 2.0],
          [D, 2.4],
        ]),
        cx: 990,
        cy: 520,
      },
      node: (
        <>
          <HomeBench t={t} lamp={1} />
          {S(pose, 'mira', fr)}
          <Key x={keyP[0]} y={keyP[1]} s={1.2} color="#F5C34B" />
          {blow && (
            <Particles
              x0={keyP[0] - 10}
              x1={keyP[0] + 90}
              y0={keyP[1] - 30}
              y1={keyP[1] + 20}
              t={t}
              n={14}
              color="#E7DCC4"
              fall={-40}
            />
          )}
          <Glint
            x={keyP[0] + 30}
            y={keyP[1] - 10}
            s={seg(t, 2.6, 3.0) * (1 - seg(t, 3.6, 4.4)) * 1.4}
          />
        </>
      ),
    };
  },
  // s07 BRIDGE tracking + Oto oiling a lamp post in the background
  (t, fr) => {
    const p = walking('mira', t, 400, 150, 1, {mood: 'determined'});
    const pose: PoseSpec = {...p, hands: [p.hands[0], [70, 40]]};
    const h = handsOf(pose)[1];
    const otoX = 1100 + 420;
    const oto = base('oto', otoX + 40, {
      gy: 760,
      s: 0.42,
      facing: -1,
      hands: [
        [30, -60],
        [60 + Math.sin(t * 3) * 10, -70],
      ],
      feet: [
        [0, 0],
        [20, -40],
      ],
    });
    return {
      cam: {z: 1.25, cx: p.x + 120, cy: 640},
      node: (
        <>
          <Bridge px={p.x - 400} t={t} />
          <g opacity={0.8}>
            <Ladder x0={otoX + 60} y0={GY} x1={otoX + 10} y1={560} />
            {S(oto, 'oto', fr)}
            <OilCan x={handsOf(oto)[1].x} y={handsOf(oto)[1].y} a={-150} />
          </g>
          {S(pose, 'mira', fr)}
          <Key x={h.x + 26} y={h.y} s={0.8} color="#F5C34B" />
          <Glint x={h.x + 40} y={h.y - 16} s={0.5 + 0.3 * Math.sin(t * 5)} />
          <BridgeRail px={p.x - 400} />
        </>
      ),
    };
  },
  // s08 CLOSE: hanging her whole weight on the golden key
  (t, fr) => {
    const hang = seg(t, 0.8, 1.8) * (1 - seg(t, 4.3, 4.6));
    const swing = Math.sin(t * 3) * hang * 8;
    const keyX = DOOR.lockX - 30;
    const keyY = DOOR.lockY + 30;
    const p = base('mira', 1050 + swing, {
      gy: GY - hang * 60,
      feet:
        hang > 0.2
          ? [
              [-10 + swing, 4],
              [24, -6 + Math.sin(t * 6) * 8],
            ]
          : STAND_FEET,
      lean: 0.1,
      mood: hang > 0.1 ? 'strain' : t > 4.6 ? 'sad' : 'determined',
    });
    const pose: PoseSpec = {
      ...p,
      hands: [reachTo(p, keyX - 6, keyY + 4), reachTo(p, keyX + 4, keyY)],
    };
    return {
      cam: {z: 2.5, cx: 1060, cy: 740},
      node: (
        <>
          <DoorWall st={door()} px={0} t={t} />
          <Key x={keyX} y={keyY} s={0.9} color="#F5C34B" a={hang * 6} />
          {S(pose, 'mira', fr)}
          {t > 4.5 && t < 5.0 && (
            <Particles
              x0={1000}
              x1={1120}
              y0={860}
              y1={900}
              t={t}
              n={10}
              color="#9AA3B5"
              fall={-20}
            />
          )}
        </>
      ),
    };
  },
  // s09 MED: pulling the handle until it snaps; she falls
  (t, fr) => {
    const snap = 2.6;
    const pull = Math.max(0, Math.sin(t * 5)) * (t < snap ? 1 : 0);
    const fall = seg(t, snap, snap + 0.7);
    const grip: Vec = [DOOR.lockX - 50, DOOR.handleY];
    const p = base('mira', 980 - pull * 8 - fall * 40, {
      lean: -0.35 - pull * 0.1 - fall * 0.9,
      crouch: 0.4,
      hipH: lerp(118, 18, fall),
      feet:
        fall > 0
          ? [
              [60, -fall * 50],
              [90, -fall * 30],
            ]
          : [
              [10, 0],
              [40, 0],
            ],
      mood: t < snap ? 'strain' : 'surprised',
    });
    const hands =
      t < snap
        ? [reachTo(p, grip[0] - 8, grip[1] + 6), reachTo(p, grip[0], grip[1])]
        : [[30, -30] as Vec, [50, -40] as Vec];
    const pose: PoseSpec = {...p, hands: hands as unknown as readonly [Vec, Vec]};
    const h = handsOf(pose)[1];
    return {
      cam: {z: 1.7, cx: 1010, cy: 740},
      node: (
        <>
          <DoorWall st={door({handle: t < snap ? 'on' : 'off'})} px={0} t={t} />
          {S(pose, 'mira', fr)}
          {t >= snap && <Handle x={h.x + 30} y={h.y} a={-20 - fall * 60} />}
          {t >= snap && t < snap + 0.4 && (
            <Sparks x={DOOR.lockX - 4} y={DOOR.handleY} t={t} on color="#E6D7A8" />
          )}
          {t > snap + 0.6 && t < snap + 1.6 && (
            <Particles
              x0={880}
              x1={1060}
              y0={860}
              y1={900}
              t={t}
              n={14}
              color="#8A93A6"
              fall={-25}
            />
          )}
        </>
      ),
    };
  },
  // s10 CLOSE FACE: staring at the broken handle, a tear
  (t, fr) => {
    const p = sit('mira', 920, {tilt: 0.35, mood: 'sad', look: [4, 6], lean: 0.25});
    const pose: PoseSpec = {
      ...p,
      hands: [
        [34, 60],
        [52, 56],
      ],
    };
    const h = handsOf(pose)[1];
    const head = headOf(pose);
    const tear = seg(t, 2.0, 4.0);
    return {
      cam: {
        z: kf(t, [
          [0, 2.9],
          [D, 3.2],
        ]),
        cx: 950,
        cy: 820,
      },
      node: (
        <>
          <DoorWall st={door({handle: 'off'})} px={0} t={t} />
          {S(pose, 'mira', fr)}
          <Handle x={h.x + 26} y={h.y - 4} a={-8} s={0.9} />
          {tear > 0 && tear < 1 && (
            <ellipse cx={head.x + 14} cy={head.y + 4 + tear * 60} rx={3} ry={5} fill="#9FD3F5" />
          )}
        </>
      ),
    };
  },
  // s11 HIGH WIDE: slumped against the giant door
  (t, fr) => {
    const p = sit('mira', 860, {tilt: 0.4, mood: 'sad', lean: -0.1, look: [0, 6]});
    const pose: PoseSpec = {
      ...p,
      hands: [
        [20, 70],
        [40, 66],
      ],
    };
    return {
      cam: {
        z: kf(t, [
          [0, 0.92],
          [D, 0.98],
        ]),
        cx: 960,
        cy: kf(t, [
          [0, 480],
          [D, 520],
        ]),
      },
      node: (
        <>
          <DoorWall st={door({handle: 'off'})} px={t * 6} t={t} />
          {Array.from({length: 8}, (_, i) => (
            <Key
              key={i}
              x={780 + rnd(i) * 260}
              y={GY + 6 + rnd(i + 1) * 20}
              a={rnd(i + 2) * 360}
              s={0.6}
              bend={i % 2}
            />
          ))}
          <Handle x={980} y={GY - 8} a={170} s={0.8} />
          {S(pose, 'mira', fr)}
          <Particles
            x0={0}
            x1={1920}
            y0={0}
            y1={900}
            t={t}
            n={18}
            color="#C9D3E0"
            fall={60}
            r={2}
          />
        </>
      ),
    };
  },
  // s12 MED: stands, pockets the handle, walks away, stops mid-step
  (t, fr) => {
    const rise = seg(t, 0, 1.4);
    let pose: PoseSpec;
    if (t < 1.4) {
      const s = sit('mira', 880, {mood: 'sad'});
      pose = {
        ...s,
        hipH: lerp(16, 146, rise),
        feet: [
          [lerp(70, -16, rise), 0],
          [lerp(92, 18, rise), 0],
        ],
        lean: lerp(0.15, 0.3, Math.sin(rise * Math.PI)),
        facing: -1,
      };
    } else if (t < 2.0) {
      pose = base('mira', 880, {
        facing: -1,
        mood: 'sad',
        hands: [
          [-20, 106],
          [-24, 70],
        ],
      });
    } else {
      const w = walkStop('mira', t - 2.0, 880, 80, -1, 2.6, {mood: 'sad'});
      pose = {...w, tilt: t > 4.8 ? -0.15 : 0.1, look: t > 4.8 ? [-4, -2] : [0, 4]};
    }
    return {
      cam: {
        z: 1.3,
        cx: kf(t, [
          [0, 860],
          [D, 760],
        ]),
        cy: 700,
      },
      node: (
        <>
          <DoorWall st={door({handle: 'off'})} px={0} t={t} />
          {Array.from({length: 8}, (_, i) => (
            <Key
              key={i}
              x={780 + rnd(i) * 260}
              y={GY + 6 + rnd(i + 1) * 20}
              a={rnd(i + 2) * 360}
              s={0.6}
              bend={i % 2}
            />
          ))}
          {t < 1.8 && (
            <Handle
              x={handsOf(pose)[1].x + 20 * pose.facing}
              y={handsOf(pose)[1].y}
              a={pose.facing < 0 ? 180 : 0}
              s={0.8}
            />
          )}
          {S(pose, 'mira', fr)}
        </>
      ),
    };
  },
  // s13 MED: turns back, camera pans to the rusty hinges
  (t, fr) => {
    const turn = t > 0.9 ? 1 : -1;
    const p = base('mira', 668, {
      facing: turn as 1 | -1,
      mood: t > 2.4 ? 'determined' : 'neutral',
      tilt: t > 1.5 ? -0.35 : 0,
      look: t > 1.5 ? [4, -8] : [0, 0],
    });
    return {
      cam: {
        z: kf(t, [
          [0, 2.2],
          [1.4, 2.2],
          [4.2, 1.35],
        ]),
        cx: kf(t, [
          [0, 670],
          [1.4, 670],
          [4.2, 760],
        ]),
        cy: kf(t, [
          [0, 780],
          [1.4, 780],
          [4.2, 560],
        ]),
      },
      node: (
        <>
          <DoorWall st={door({handle: 'off'})} px={0} t={t} />
          {S(p, 'mira', fr)}
          {HINGES.map((h, i) => (
            <circle
              key={i}
              cx={h.x + 40}
              cy={h.y}
              r={90}
              fill="none"
              stroke={YELLOW}
              strokeWidth={5}
              opacity={seg(t, 3.6 + i * 0.4, 4.0 + i * 0.4) * 0.5}
            />
          ))}
        </>
      ),
    };
  },
  // s14 DETAIL: finger touches the rusty hinge
  (t, fr) => {
    const p = base('mira', 690, {mood: 'determined', look: [4, 2]});
    const touch = seg(t, 0.6, 2.0);
    const pose: PoseSpec = {
      ...p,
      hands: [[-20, 100], reachTo(p, lerp(720, 770, touch), lerp(800, 772, touch))],
    };
    return {
      cam: {
        z: kf(t, [
          [0, 3.4],
          [D, 3.8],
        ]),
        cx: 760,
        cy: 775,
      },
      node: (
        <>
          <DoorWall st={door({handle: 'off', pins: [0, 0, 0.25]})} px={0} t={t} />
          {S(pose, 'mira', fr)}
          {t > 2.0 && (
            <Particles
              x0={770}
              x1={840}
              y0={780}
              y1={900}
              t={t - 2}
              n={12}
              color="#B5652E"
              fall={70}
              r={3}
            />
          )}
        </>
      ),
    };
  },
  // s15 MED: shoulder-push on the hinge side, the door creaks a hair
  (t, fr) => {
    const push = Math.max(0, Math.sin(t * 2.4));
    const p = base('mira', 712, {
      lean: 0.45 + push * 0.15,
      crouch: 0.35,
      feet: [
        [-60, 0],
        [10, 0],
      ],
      mood: 'strain',
    });
    const pose: PoseSpec = {...p, hands: [reachTo(p, 762, 760), reachTo(p, 764, 730)]};
    return {
      cam: {z: 1.6, cx: 800, cy: 650},
      node: (
        <>
          <DoorWall st={door({handle: 'off', shake: push * 1.5})} px={0} t={t} />
          {S(pose, 'mira', fr)}
          {t > 1.2 && (
            <Particles
              x0={760}
              x1={900}
              y0={130}
              y1={900}
              t={t}
              n={20}
              color="#C9C2B0"
              fall={90}
              r={2.5}
            />
          )}
        </>
      ),
    };
  },
  // s16 WIDE: Oto arrives with ladder and oil can
  (t, fr) => {
    const oto = walkStop('oto', t, 1780, 120, -1, 3.8, {mood: 'neutral'});
    const otoPose: PoseSpec = {...oto, hands: [[10, -30], oto.hands[1]]};
    const oh = handsOf(otoPose);
    const mira = base('mira', 720, {
      facing: t > 2.2 ? 1 : -1,
      mood: t > 2.2 ? 'surprised' : 'strain',
      look: [6, -4],
    });
    const sh = otoPose.x;
    return {
      cam: {
        z: kf(t, [
          [0, 0.98],
          [D, 1.06],
        ]),
        cx: kf(t, [
          [0, 1060],
          [D, 980],
        ]),
        cy: 560,
      },
      node: (
        <>
          <DoorWall st={door({handle: 'off'})} px={0} t={t} />
          {S(mira, 'mira', fr)}
          <Ladder x0={sh - 120} y0={oh[0].y + 14} x1={sh + 160} y1={oh[0].y - 10} />
          {S(otoPose, 'oto', fr)}
          <OilCan x={oh[1].x} y={oh[1].y + 8} />
        </>
      ),
    };
  },
  // s17 TWO-SHOT: handle up, she points at the top hinge, Oto nods
  (t, fr) => {
    const point = seg(t, 1.6, 2.4);
    const mira = base('mira', 840, {
      mood: point > 0.5 ? 'determined' : 'worried',
      tilt: -0.3 * point,
      look: [-2, -8 * point],
    });
    const miraPose: PoseSpec = {
      ...mira,
      hands: [
        [30, -20],
        point > 0 ? reachTo(mira, lerp(900, 770, point), lerp(740, 560, point)) : [44, -10],
      ],
    };
    const nod = t > 3.0 && t < 4.2 ? Math.sin((t - 3) * 10) * 0.12 : 0;
    const oto = base('oto', 1060, {
      facing: -1,
      tilt: 0.25 + nod - point * 0.5,
      look: [4, 4 - point * 10],
      mood: t > 3 ? 'happy' : 'neutral',
    });
    const lean = seg(t, 4.2, 5.4);
    const mh = handsOf(miraPose)[0];
    return {
      cam: {z: 1.75, cx: 920, cy: 660},
      node: (
        <>
          <DoorWall st={door({handle: 'off'})} px={0} t={t} />
          <Ladder
            x0={lerp(1180, 860, lean)}
            y0={GY}
            x1={lerp(1240, 790, lean)}
            y1={lerp(560, 300, lean)}
          />
          {S(miraPose, 'mira', fr)}
          <Handle x={mh.x + 26} y={mh.y} a={-80} s={0.8} />
          {S(
            {
              ...oto,
              hands: [
                [-10, 106],
                lean > 0 ? reachTo(oto, lerp(1210, 820, lean), lerp(700, 560, lean)) : [20, 106],
              ],
            },
            'oto',
            fr,
          )}
        </>
      ),
    };
  },
  // s18 LOW ANGLE: Oto oils the top hinge then pulls its pin; Mira holds the ladder
  (t, fr) => {
    const climb = seg(t, 0, 1.6);
    const rung = lerp(GY, 520, climb);
    const oto = base('oto', 800 + climb * -6, {
      gy: rung,
      facing: -1,
      lean: 0.15,
      mood: 'determined',
    });
    const oiling = t > 1.6 && t < 3.6;
    const pull = seg(t, 3.8, 5.0);
    const otoPose: PoseSpec = {
      ...oto,
      hands: [
        reachTo(oto, 800, rung - 200),
        oiling ? reachTo(oto, 770, 240) : reachTo(oto, 752, 205 - pull * 50),
      ],
    };
    const mira = base('mira', 880, {
      facing: -1,
      lean: 0.2,
      mood: 'determined',
      tilt: -0.4,
      look: [0, -8],
    });
    const miraPose: PoseSpec = {...mira, hands: [reachTo(mira, 832, 780), reachTo(mira, 836, 740)]};
    const oh = handsOf(otoPose)[1];
    return {
      cam: {
        z: 1.25,
        cx: 840,
        cy: kf(t, [
          [0, 640],
          [2, 440],
          [D, 440],
        ]),
      },
      node: (
        <>
          <DoorWall
            st={door({
              handle: 'off',
              pins: [pull * 1.5, pull * 1.5, 0],
              rust: 1 - seg(t, 2, 3.4) * 0.5,
            })}
            px={0}
            t={t}
          />
          <Ladder x0={860} y0={GY} x1={790} y1={300} />
          {S(otoPose, 'oto', fr)}
          {oiling && <OilCan x={oh.x + 10} y={oh.y - 4} a={-140} />}
          {oiling && (
            <Particles
              x0={760}
              x1={790}
              y0={260}
              y1={GY}
              t={t}
              n={8}
              color="#3A2A10"
              fall={260}
              r={4}
            />
          )}
          {S(miraPose, 'mira', fr)}
        </>
      ),
    };
  },
  // s19 CLOSE: hammering the lower pin out with the broken handle
  (t, fr) => {
    const taps = [0.6, 1.6, 2.6];
    const hit = taps.reduce((a, k) => a + (t > k ? 1 : 0), 0);
    const swingPh = (t % 1.0) / 1.0;
    const pin = t > 3.8 ? 1.6 : hit * 0.28;
    const p = base('mira', 700, {
      crouch: 0.35,
      mood: t > 3.9 ? 'happy' : 'strain',
      look: [4, -4],
      tilt: -0.15,
    });
    const up = Math.sin(swingPh * Math.PI * 2) * (t < 3.2 ? 1 : 0);
    const pose: PoseSpec = {
      ...p,
      hands: [reachTo(p, 760, 830), reachTo(p, 740 - up * 20, 840 - up * 50 + 20)],
    };
    const h = handsOf(pose)[1];
    const pinFall = seg(t, 3.8, 4.6);
    return {
      cam: {
        z: kf(t, [
          [0, 2.7],
          [D, 3.0],
        ]),
        cx: 760,
        cy: 760,
      },
      node: (
        <>
          <DoorWall st={door({handle: 'off', pins: [1.6, 1.6, pin], rust: 0.5})} px={0} t={t} />
          {S(pose, 'mira', fr)}
          <Handle x={h.x + 28} y={h.y} a={-90} s={0.8} />
          {t > 3.8 && (
            <rect
              x={720 + pinFall * 40}
              y={lerp(640, GY - 12, pinFall)}
              width={12}
              height={34}
              rx={4}
              fill="#9AA0AA"
              stroke={INK}
              strokeWidth={4}
              transform={`rotate(${pinFall * 80} ${726 + pinFall * 40} ${lerp(656, GY, pinFall)})`}
            />
          )}
          {taps.map((k) =>
            t > k && t < k + 0.25 ? (
              <Sparks key={k} x={752} y={812} t={t} on color="#F2E3B0" />
            ) : null,
          )}
        </>
      ),
    };
  },
  // s20 MED: pulling the hinge edge together; the door begins to pivot
  (t, fr) => {
    const heave = Math.max(0, Math.sin(t * 2.2));
    const open = seg(t, 3.4, D) * 0.12;
    const edge = DOOR.x0 + (DOOR.x1 - DOOR.x0) * (1 - Math.cos(open * 1.35));
    const mira = base('mira', 650 - heave * 8, {
      lean: -0.35 - heave * 0.1,
      crouch: 0.4,
      feet: [
        [-20, 0],
        [30, 0],
      ],
      mood: 'strain',
    });
    const oto = base('oto', 560 - heave * 8, {
      lean: -0.3 - heave * 0.1,
      crouch: 0.3,
      feet: [
        [-20, 0],
        [30, 0],
      ],
      mood: 'strain',
    });
    return {
      cam: {z: 1.45, cx: 760, cy: 640},
      node: (
        <>
          <DoorWall
            st={door({handle: 'off', pins: [1.6, 1.6, 1.6], rust: 0.5, open, glow: open * 2})}
            px={0}
            t={t}
          />
          {S(
            {...oto, hands: [reachTo(oto, edge + 6, 560), reachTo(oto, edge + 10, 600)]},
            'oto',
            fr,
          )}
          {S(
            {...mira, hands: [reachTo(mira, edge + 6, 760), reachTo(mira, edge + 10, 790)]},
            'mira',
            fr,
          )}
          {t > 3.4 && (
            <Particles
              x0={edge}
              x1={edge + 60}
              y0={130}
              y1={900}
              t={t}
              n={14}
              color="#C9C2B0"
              fall={110}
              r={2.5}
            />
          )}
        </>
      ),
    };
  },
  // s21 WIDE: the door swings open the other way; dawn light
  (t, fr) => {
    const open = lerp(0.12, 1, seg(t, 0, 2.6));
    const shield = seg(t, 1.0, 1.8);
    const mira = base('mira', 640 - shield * 30, {
      lean: -0.2 * shield,
      mood: shield > 0.5 ? 'surprised' : 'strain',
    });
    const oto = base('oto', 540 - shield * 20, {
      lean: -0.15 * shield,
      mood: shield > 0.5 ? 'surprised' : 'strain',
    });
    const shieldH = (p: PoseSpec): readonly [Vec, Vec] => [
      reachTo(p, headOf(p).x + 40, headOf(p).y - 20),
      reachTo(p, headOf(p).x + 30, headOf(p).y - 30),
    ];
    return {
      cam: {
        z: kf(t, [
          [0, 1.05],
          [D, 0.95],
        ]),
        cx: 860,
        cy: 540,
      },
      node: (
        <>
          <DoorWall
            st={door({handle: 'off', pins: [1.6, 1.6, 1.6], rust: 0.5, open, glow: open})}
            px={0}
            t={t}
          />
          {S({...oto, hands: shield > 0.2 ? shieldH(oto) : REST_HANDS}, 'oto', fr)}
          {S({...mira, hands: shield > 0.2 ? shieldH(mira) : REST_HANDS}, 'mira', fr)}
          <Particles
            x0={760}
            x1={1160}
            y0={120}
            y1={900}
            t={t}
            n={30}
            color="#FFF2D0"
            fall={-20}
            r={3}
          />
        </>
      ),
    };
  },
  // s22 INSIDE: the empty room
  (t, fr) => {
    const mira = walkStop('mira', t, 230, 70, 1, 2.0, {mood: 'neutral', look: [4, -4]});
    const oto = base('oto', 160, {mood: 'neutral', look: [4, -2]});
    return {
      cam: {
        z: kf(t, [
          [0, 1.0],
          [D, 1.12],
        ]),
        cx: kf(t, [
          [0, 960],
          [D, 1000],
        ]),
        cy: 520,
      },
      node: (
        <>
          <Interior life={0} lamp={0} dawn={0.35} px={0} t={t} />
          {S(oto, 'oto', fr)}
          {S({...mira, mood: t > 3 ? 'worried' : 'neutral'}, 'mira', fr)}
        </>
      ),
    };
  },
  // s23 CLOSE FACE: disappointment; Oto's hand on her shoulder
  (t, fr) => {
    const mira = base('mira', 420, {mood: 'sad', tilt: 0.25, look: [4, 6], lean: 0.1});
    const reach = seg(t, 1.8, 2.8);
    const oto = base('oto', 330, {mood: 'neutral', tilt: 0.3, look: [4, 6]});
    const head = headOf(mira);
    return {
      cam: {z: 2.7, cx: 400, cy: 720},
      node: (
        <>
          <Interior life={0} lamp={0} dawn={0.4} px={0} t={t} />
          {S(
            {
              ...oto,
              hands: [
                [-10, 106],
                reachTo(oto, lerp(360, head.x - 10, reach), lerp(840, head.y + 50, reach)),
              ],
            },
            'oto',
            fr,
          )}
          {S(
            {
              ...mira,
              hands: [
                [-10, 100],
                [16, 104],
              ],
            },
            'mira',
            fr,
          )}
        </>
      ),
    };
  },
  // s24 MED: walks to the toolbox and opens it
  (t, fr) => {
    const mira = walkStop('mira', t, 700, 110, 1, 2.4, {mood: 'neutral'});
    const lid = seg(t, 3.0, 3.9);
    const pose: PoseSpec =
      t > 2.6
        ? {
            ...mira,
            crouch: 0.4,
            lean: 0.25,
            hands: [reachTo(mira, 1040, 820), reachTo(mira, 1020 + lid * 20, 830 - lid * 70)],
            mood: lid > 0.6 ? 'surprised' : 'neutral',
          }
        : mira;
    return {
      cam: {
        z: 1.6,
        cx: kf(t, [
          [0, 820],
          [D, 1000],
        ]),
        cy: 700,
      },
      node: (
        <>
          <Interior life={0} lamp={0} dawn={0.45} px={0} t={t} />
          <Toolbox x={1010} y={GY} lid={lid} glint={seg(t, 3.9, 4.3) * (1 - seg(t, 4.8, 5.4))} />
          {S(pose, 'mira', fr)}
        </>
      ),
    };
  },
  // s25 CLOSE: lifts the hammer, looks back at the door: idea
  (t, fr) => {
    const lift = seg(t, 0.3, 1.4);
    const look = seg(t, 1.8, 2.4);
    const idea = seg(t, 3.0, 3.4);
    const mira = base('mira', 960, {
      mood: idea > 0.5 ? 'happy' : look > 0.5 ? 'surprised' : 'neutral',
      facing: look > 0.5 ? -1 : 1,
      look: [4, -2],
    });
    const pose: PoseSpec = {
      ...mira,
      hands: [
        [-10, 100],
        [lerp(30, 40, lift), lerp(100, -20, lift)],
      ],
    };
    const h = handsOf(pose)[1];
    const head = headOf(pose);
    return {
      cam: {z: 2.5, cx: 950, cy: 740},
      node: (
        <>
          <Interior life={0} lamp={0} dawn={0.5} px={0} t={t} />
          <Toolbox x={1010} y={GY} lid={1} glint={0} />
          {S(pose, 'mira', fr)}
          <Hammer x={h.x} y={h.y + 6} a={pose.facing < 0 ? -20 : 20} s={0.7} />
          {idea > 0 && (
            <Glint x={head.x} y={head.y - 60} s={idea * (1.3 + 0.2 * Math.sin(t * 8))} />
          )}
        </>
      ),
    };
  },
  // s26 MED: Oto re-seats the oiled pins, Mira fixes the handle inside, lamp on
  (t, fr) => {
    const tap = Math.abs(Math.sin(t * Math.PI));
    const oto = base('oto', 620, {facing: -1, mood: 'determined', lean: 0.1});
    const otoPose: PoseSpec = {
      ...oto,
      hands: [reachTo(oto, 530, 520), reachTo(oto, 540 + tap * 10, 470 - tap * 30)],
    };
    const mira = base('mira', 360, {
      facing: 1,
      mood: 'determined',
      feet: [
        [-14, -6],
        [16, -8],
      ],
    });
    const miraPose: PoseSpec = {
      ...mira,
      hands: [reachTo(mira, 452, 730), reachTo(mira, 448, 742 + tap * 4)],
    };
    const lamp = seg(t, 3.2, 3.6);
    const oh = handsOf(otoPose)[1];
    return {
      cam: {z: 1.3, cx: 560, cy: 560},
      node: (
        <>
          <Interior life={0.15} lamp={lamp} dawn={0.55} px={0} t={t} />
          <Lamp x={760} y={330} on={lamp} rope={420} />
          <Handle x={500} y={734} a={0} s={1} />
          {S(miraPose, 'mira', fr)}
          {S(otoPose, 'oto', fr)}
          <Hammer x={oh.x} y={oh.y} a={-60} s={0.8} />
        </>
      ),
    };
  },
  // s27 WIDE: wedge under the open door, dusts her hands
  (t, fr) => {
    const push = seg(t, 0.4, 2.5);
    const mira = base('mira', lerp(640, 600, push), {
      facing: -1,
      crouch: t < 2.6 ? 0.7 : 0,
      lean: t < 2.6 ? 0.5 : 0,
      mood: t < 2.6 ? 'strain' : 'happy',
    });
    const bx = lerp(600, 520, push);
    const clap = t > 3.2 ? Math.abs(Math.sin(t * 12)) : 0;
    const pose: PoseSpec = {
      ...mira,
      hands:
        t < 2.6
          ? [reachTo(mira, bx + 50, GY - 14), reachTo(mira, bx + 44, GY - 20)]
          : [
              [16 + clap * 10, 40],
              [20 - clap * 10, 40],
            ],
    };
    return {
      cam: {z: 1.15, cx: 700, cy: 560},
      node: (
        <>
          <Interior life={0.25} lamp={1} dawn={0.6} px={0} t={t} />
          <Lamp x={760} y={330} on={1} rope={420} />
          <path
            d={`M ${bx - 40} ${GY} l 80 0 l -80 -30 z`}
            fill="#C99A5B"
            stroke={INK}
            strokeWidth={4}
          />
          {S(pose, 'mira', fr)}
          {clap > 0.8 && (
            <Particles
              x0={570}
              x1={640}
              y0={760}
              y1={830}
              t={t}
              n={8}
              color="#C9C2B0"
              fall={30}
              r={2}
            />
          )}
        </>
      ),
    };
  },
  // s28 DOORWAY: a kid with a red cap peeks in
  (t, fr) => {
    const peek = seg(t, 1.2, 2.2);
    const step = seg(t, 3.8, 5.0);
    const kid = base('kid', lerp(30, 120, peek) + step * 90, {
      facing: 1,
      mood: 'worried',
      tilt: 0.25 * (1 - step),
      look: [4, 0],
      hands: [
        [10, 40],
        [30, 20],
      ],
    });
    const mira = base('mira', 760, {facing: -1, mood: t > 2.4 ? 'surprised' : 'neutral'});
    return {
      cam: {z: 1.45, cx: 420, cy: 700},
      node: (
        <>
          <Interior life={0.3} lamp={1} dawn={0.75} px={0} t={t} wedge />
          {S(kid, 'kid', fr)}
          <rect x={-200} y={100} width={250} height={GY - 100} fill="#3A4256" />
          {S(mira, 'mira', fr)}
        </>
      ),
    };
  },
  // s29 MED: waves the kid in, kneels, hands her a file and key blank
  (t, fr) => {
    const wave = t < 1.8 ? Math.sin(t * 10) : 0;
    const kneel = seg(t, 2.2, 3.0);
    const give = seg(t, 3.2, 4.2);
    const mira = base('mira', 720, {
      facing: -1,
      crouch: kneel * 0.8,
      lean: kneel * 0.2,
      mood: 'happy',
      look: [4, 4 * kneel],
    });
    const kid = walkStop('kid', t, 330, 90, 1, 2.6, {mood: give > 0.5 ? 'happy' : 'worried'});
    const meet: Vec = [lerp(640, 600, give), 820];
    const miraPose: PoseSpec = {
      ...mira,
      hands: [[-10, 100], t < 1.8 ? [30, -80 + wave * 20] : reachTo(mira, meet[0], meet[1])],
    };
    const kidPose: PoseSpec =
      give > 0.3 ? {...kid, hands: [kid.hands[0], reachTo(kid, meet[0] + 6, meet[1] + 4)]} : kid;
    return {
      cam: {z: 1.6, cx: 600, cy: 700},
      node: (
        <>
          <Interior life={0.3} lamp={1} dawn={0.8} px={0} t={t} wedge />
          {S(kidPose, 'kid', fr)}
          {S(miraPose, 'mira', fr)}
          {t > 2.6 && <FileTool x={meet[0]} y={meet[1]} a={-30} s={0.8} />}
          {t > 2.6 && <Key x={meet[0] + 20} y={meet[1] - 20} s={0.5} color="#C7A85C" />}
        </>
      ),
    };
  },
  // s30 WIDE EXTERIOR dawn: others arrive carrying planks; the kid carries the old keys in
  (t, fr) => {
    const people = [0, 1, 2].map((i) =>
      walking('maker', t + i * 0.7, 200 - i * 260, 120, 1, {mood: 'happy'}),
    );
    const kid = walking('kid', t, 1500, 70, -1, {
      mood: 'happy',
      hands: [
        [20, 30],
        [40, 30],
      ],
    });
    const accents = ['#59B67A', '#9B6BD6', '#E08A3C'];
    return {
      cam: {z: 0.98, cx: 920, cy: 560},
      node: (
        <>
          <DoorWall
            st={door({
              handle: 'off',
              pins: [0, 0, 0],
              rust: 0.2,
              open: 1,
              glow: 0.8,
              dawn: 0.9,
              wedge: true,
            })}
            px={0}
            t={t}
          />
          {people.map((p, i) => (
            <g key={i}>
              {S(
                {
                  ...p,
                  hands: [
                    [20, 10],
                    [40, 10],
                  ],
                },
                'maker',
                fr,
                accents[i],
              )}
              {i !== 1 ? (
                <rect
                  x={p.x - 120}
                  y={
                    handsOf({
                      ...p,
                      hands: [
                        [20, 10],
                        [40, 10],
                      ],
                    })[1].y - 12
                  }
                  width={210}
                  height={20}
                  fill="#C99A5B"
                  stroke={INK}
                  strokeWidth={4}
                />
              ) : (
                <rect
                  x={p.x - 10}
                  y={
                    handsOf({
                      ...p,
                      hands: [
                        [20, 10],
                        [40, 10],
                      ],
                    })[1].y - 40
                  }
                  width={70}
                  height={50}
                  fill="#B58552"
                  stroke={INK}
                  strokeWidth={4}
                />
              )}
            </g>
          ))}
          {S(kid, 'kid', fr)}
          <KeyRing x={handsOf(kid)[1].x} y={handsOf(kid)[1].y - 10} swing={ringSwing(t)} n={8} />
        </>
      ),
    };
  },
  // s31 WIDE INTERIOR: the room becomes a workshop
  (t, fr) => {
    const saw = Math.sin(t * 7);
    const tap = Math.abs(Math.sin(t * Math.PI * 1.6));
    const mira = base('mira', 680, {mood: 'happy', lean: 0.2, crouch: 0.2});
    const oto = base('oto', 1700, {facing: -1, mood: 'happy', lean: 0.15});
    const kid = base('kid', 960, {mood: 'happy', facing: 1});
    const m1 = base('maker', 1220, {facing: 1, mood: 'happy'});
    const m2 = walking('maker', t, 1200, 50, -1, {
      mood: 'happy',
      hands: [
        [20, 10],
        [40, 10],
      ],
    });
    const mh = handsOf({...mira, hands: [[-10, 90], reachTo(mira, 720, 720 - tap * 50)]})[1];
    return {
      cam: {
        z: kf(t, [
          [0, 0.95],
          [D, 1.02],
        ]),
        cx: 1060,
        cy: 560,
      },
      node: (
        <>
          <Interior life={1} lamp={1} dawn={0.85} px={0} t={t} chime wedge />
          <Lamp x={760} y={330} on={1} rope={420} />
          {S({...mira, hands: [[-10, 90], reachTo(mira, 720, 720 - tap * 50)]}, 'mira', fr)}
          <Hammer x={mh.x} y={mh.y} a={20} s={0.6} />
          {S(
            {...oto, hands: [reachTo(oto, 1620, 760), reachTo(oto, 1640 + saw * 40, 730)]},
            'oto',
            fr,
          )}
          {S(
            {
              ...kid,
              hands: [
                [30, 40],
                [40 + saw * 6, 34],
              ],
            },
            'kid',
            fr,
          )}
          {S(
            {
              ...m1,
              hands: [
                [30, -40],
                [40, -60],
              ],
            },
            'maker',
            fr,
            '#59B67A',
          )}
          <rect
            x={
              handsOf({
                ...m1,
                hands: [
                  [30, -40],
                  [40, -60],
                ],
              })[1].x - 10
            }
            y={420}
            width={20}
            height={190}
            fill="#7FB0D9"
            stroke={INK}
            strokeWidth={4}
          />
          {S(m2, 'maker', fr, '#9B6BD6')}
          <rect
            x={m2.x - 110}
            y={handsOf(m2)[1].y - 12}
            width={200}
            height={20}
            fill="#C99A5B"
            stroke={INK}
            strokeWidth={4}
          />
          <Sparks x={1640} y={740} t={t} on color="#E8D8B0" />
        </>
      ),
    };
  },
  // s32 DETAIL: the failed keys became a wind chime
  (t) => ({
    cam: {
      z: kf(t, [
        [0, 2.6],
        [D, 2.9],
      ]),
      cx: 1460,
      cy: 340,
    },
    node: (
      <>
        <Interior life={1} lamp={1} dawn={0.95} px={0} t={t} chime wedge />
        <Glint x={1450 + Math.sin(t * 2) * 60} y={380} s={0.6 + 0.3 * Math.sin(t * 4)} />
      </>
    ),
  }),
  // s33 CLOSE: she gives Oto a new key; he laughs and hangs it on the chime
  (t, fr) => {
    const give = seg(t, 0.4, 1.6);
    const hang = seg(t, 3.0, 4.4);
    const mira = base('mira', 1300, {mood: 'happy', look: [4, -6], tilt: -0.2});
    const oto = base('oto', 1440, {
      facing: -1,
      mood: 'happy',
      tilt: t > 1.8 && t < 2.8 ? Math.sin(t * 14) * 0.08 : 0,
    });
    const meet: Vec = [1370, 760];
    const otoPose: PoseSpec = {
      ...oto,
      hands: [
        [-10, 106],
        hang > 0
          ? reachTo(oto, lerp(meet[0], 1440, hang), lerp(meet[1], 360, hang))
          : reachTo(oto, meet[0] + 10, meet[1]),
      ],
    };
    const kh = handsOf(otoPose)[1];
    return {
      cam: {z: 1.7, cx: 1380, cy: 560},
      node: (
        <>
          <Interior life={1} lamp={1} dawn={0.95} px={0} t={t} chime wedge />
          {S(
            {
              ...mira,
              hands: [
                [-10, 100],
                hang > 0
                  ? [20, 100]
                  : reachTo(mira, lerp(1330, meet[0], give), lerp(800, meet[1], give)),
              ],
            },
            'mira',
            fr,
          )}
          {S(otoPose, 'oto', fr)}
          <Key
            x={t < 1.6 ? lerp(1330, meet[0], give) + 10 : kh.x + 6}
            y={t < 1.6 ? lerp(800, meet[1], give) : kh.y}
            s={0.8}
            color="#F5C34B"
            a={hang * 90}
          />
        </>
      ),
    };
  },
  // s34 MED: teaching the kid; the kid's key shines
  (t, fr) => {
    const file = Math.sin(t * 6);
    const lift = seg(t, 3.6, 4.4);
    const mira = sit('mira', 900, {hipH: 70, mood: 'happy', look: [4, 4]});
    const kid = sit('kid', 1080, {
      hipH: 70,
      facing: -1,
      mood: lift > 0.5 ? 'happy' : 'determined',
      look: [4, 4 + -8 * lift],
    });
    const kidPose: PoseSpec = {
      ...kid,
      hands: [[20, 40], lift > 0 ? [30, -60 * lift] : [40 + file * 10, 40]],
    };
    const kh = handsOf(kidPose)[1];
    return {
      cam: {z: 2.0, cx: 990, cy: 760},
      node: (
        <>
          <Interior life={1} lamp={1} dawn={1} px={0} t={t} chime wedge />
          <Bench x={860} y={800} w={300} />
          {S(
            {
              ...mira,
              hands: [
                [30, 50],
                [60 + file * 6, 40],
              ],
            },
            'mira',
            fr,
          )}
          {S(kidPose, 'kid', fr)}
          <Key x={kh.x - 14} y={kh.y} s={0.6} color="#F5C34B" />
          <Glint x={kh.x - 20} y={kh.y - 20} s={lift * (1 + 0.2 * Math.sin(t * 8))} />
        </>
      ),
    };
  },
  // s35 WIDE EXTERIOR dawn pull-back; another locked door far down the street
  (t, fr) => {
    const z = kf(t, [
      [0, 1.2],
      [D, 0.62],
    ]);
    return {
      cam: {
        z,
        cx: kf(t, [
          [0, 960],
          [D, 1500],
        ]),
        cy: kf(t, [
          [0, 560],
          [D, 520],
        ]),
      },
      node: (
        <>
          <DoorWall
            st={door({handle: 'off', rust: 0.2, open: 1, glow: 0.9, dawn: 1, wedge: true})}
            px={0}
            t={t}
          />
          <rect x={DOOR.x0 + 20} y={GY - 600} width={180} height={18} fill="#3E5A6E" />
          {S(base('mira', 900, {mood: 'happy'}), 'mira', fr)}
          {S(base('kid', 980, {mood: 'happy', facing: -1}), 'kid', fr)}
          {/* far door, smaller and locked, at the end of the street */}
          <g transform="translate(2300 360) scale(0.55)">
            <rect x={-60} y={-60} width={560} height={1000} fill="#4E4E5E" />
            <rect
              x={0}
              y={0}
              width={400}
              height={940}
              fill="#6B4A32"
              stroke={INK}
              strokeWidth={8}
            />
            {[120, 470, 820].map((y) => (
              <rect
                key={y}
                x={-14}
                y={y - 30}
                width={100}
                height={60}
                fill="#8A4B2A"
                stroke={INK}
                strokeWidth={6}
              />
            ))}
            <rect
              x={330}
              y={600}
              width={50}
              height={90}
              fill="#B08A3E"
              stroke={INK}
              strokeWidth={6}
            />
          </g>
        </>
      ),
    };
  },
  // s36 END CARD
  (t, fr) => {
    const glow = 0.6 + 0.4 * seg(t, 0, 1.5);
    return {
      cam: {z: 1, cx: 960, cy: 540},
      node: (
        <>
          <rect x={-200} y={-200} width={2400} height={1500} fill="#14121C" />
          <rect x={760} y={170} width={400} height={680} fill="#FCE6B8" opacity={glow} />
          <rect
            x={760}
            y={170}
            width={400}
            height={680}
            fill="none"
            stroke="#F2B83B"
            strokeWidth={10}
          />
          <polygon
            points={`760,850 1160,850 1420,1080 500,1080`}
            fill="#FCE6B8"
            opacity={0.25 * glow}
          />
          <g opacity={0.95}>
            {S(base('mira', 900, {gy: 850, mood: 'happy', facing: 1}), 'mira', fr)}
            {S(base('kid', 1010, {gy: 850, mood: 'happy', facing: -1}), 'kid', fr)}
          </g>
          <text
            x={960}
            y={120}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight={800}
            fontSize={40}
            fill="#F2B83B"
            letterSpacing={6}
            opacity={seg(t, 1.0, 1.8)}
          >
            LIKE &amp; SUBSCRIBE
          </text>
        </>
      ),
    };
  },
];

const PALETTE: Record<string, string> = {cold: '#FF8A7A', warm: '#FFC44D', hope: '#7FE3B8'};

const Caption: React.FC<{shot: DoorShot; local: number}> = ({shot, local}) => {
  if (!shot.caption.trim()) return null;
  const start = 18;
  const k = Math.max(0, Math.min(1, Math.min((local - start) / 10, (SHOT - 6 - local) / 10)));
  const hl = shot.highlight.trim();
  const i = hl ? shot.caption.toLowerCase().indexOf(hl.toLowerCase()) : -1;
  const color = PALETTE[shot.palette ?? 'cold'] ?? PALETTE.cold;
  return (
    <div
      style={{
        position: 'absolute',
        left: 140,
        right: 140,
        bottom: 92,
        display: 'flex',
        justifyContent: 'center',
        opacity: k,
      }}
    >
      <div
        style={{
          fontFamily: 'Arial Black, Arial, sans-serif',
          fontSize: 92,
          fontWeight: 900,
          letterSpacing: 1,
          color: '#FBFAF6',
          textAlign: 'center',
          lineHeight: 1.15,
          padding: '18px 44px',
          borderRadius: 28,
          background: 'rgba(8,10,18,0.62)',
          textShadow: '0 4px 14px rgba(0,0,0,0.9)',
          transform: `translateY(${(1 - k) * 18}px)`,
        }}
      >
        {i < 0 ? (
          shot.caption
        ) : (
          <>
            {shot.caption.slice(0, i)}
            <span style={{color}}>{shot.caption.slice(i, i + hl.length)}</span>
            {shot.caption.slice(i + hl.length)}
          </>
        )}
      </div>
    </div>
  );
};

export const DoorFilm: React.FC<{shots: DoorShot[]}> = ({shots: data}) => {
  const frame = useCurrentFrame();
  const index = Math.min(35, Math.floor(frame / SHOT));
  const local = frame - index * SHOT;
  const t = local / FPS;
  const built = shots[index](t, frame);
  const {z, cx, cy} = built.cam;
  // Short dip only at act boundaries; other cuts are hard cuts on action.
  const actStarts = [0, 7, 14, 21, 28, 35];
  const dip = actStarts.includes(index) ? Math.max(0, 1 - local / 8) : 0;
  const fadeOut = index === 35 ? Math.max(0, (local - (SHOT - 20)) / 20) : 0;
  return (
    <AbsoluteFill style={{background: '#000', overflow: 'hidden'}}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <g transform={`translate(${W / 2} ${H / 2}) scale(${z}) translate(${-cx} ${-cy})`}>
          {built.node}
        </g>
        {built.over}
        <rect x={0} y={0} width={W} height={H} fill="#000" opacity={Math.max(dip, fadeOut)} />
        <radialGradient id="vig" cx="50%" cy="50%" r="75%">
          <stop offset="0.6" stopColor="#000" stopOpacity={0} />
          <stop offset="1" stopColor="#000" stopOpacity={0.45} />
        </radialGradient>
        <rect x={0} y={0} width={W} height={H} fill="url(#vig)" />
      </svg>
      <Caption shot={data[index] ?? {id: '', caption: '', highlight: ''}} local={local} />
    </AbsoluteFill>
  );
};
