// Scenes — ban-khong-yeu-duoi-chi-da-manh-qua-lau (Phase 3c prototype, gate-D fix round 1).
// Full rebuild against the pose-rig kit: every shot is staged to `script.md` §3 with a
// distinct posture, prop and light state; the umbrella is anchored to a gripping fist;
// props (Phone / Cup / Glass / Surface / Hand) carry the still life.
//
// Everything is a pure function of an explicit frame `f` (never Date.now / Math.random).
// All scenes render SVG <g> fragments in absolute 1080×1920 coordinates; the HTML text
// layers (Headline / Caption / MinhHoa) are composed by the Proto* wrappers.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

import {
  ADULT,
  BKYDFonts,
  CHILD,
  Caption,
  Child,
  Contact,
  Cup,
  Glass,
  Headline,
  HER,
  Line,
  LitWindow,
  MinhHoa,
  NightGrade,
  OTHER,
  PAL,
  Person,
  Phone,
  Pose,
  Rain as RainComp,
  SodiumLamp,
  Surface,
  UmbrellaFurled,
  UmbrellaGeom,
  UmbrellaOpen,
  WetPavement,
  canopyShadowPts,
  doorWedge,
  furledOutline,
  polyPath,
  pt,
  standHipY,
} from './kit';
import {EASE, bezier, mix, ramp} from './lib/polish';

export const HOOK_DUR = 96; // 3.2 s — s1 clip
export const TURN_DUR = 120; // 4.0 s — a1, the payoff
export const END_DUR = 96; // 3.2 s — the silent END card
export const S7_DUR = 90; // 3.0 s — s7 proof (mid sheen)
export const S9_DUR = 90; // 3.0 s — s9 proof (mid palette boundary)
export const S10_DUR = 90; // 3.0 s — s10 proof (climax still life)

const GROUND = 1660; // ONE ground plane for every street frame (D-09/D-14)
const f2 = (n: number) => n.toFixed(1);
const P2 = (p: {x: number; y: number}) => `${f2(p.x)} ${f2(p.y)}`;

// ─────────────────────────── shared street scene (s1 / s9 / img2) ───────────────────────────

const SHE_X = 300;
const SHE_S = 1.06;
const KID_X = 740;
const KID_S = 1.145; // child's crown lands on her shoulder line (script §2.2)
const GRIP = pt(610, 1120); // her RIGHT fist (viewer-left arm reaches across); D-01/D-22
const UMB_BASE: UmbrellaGeom = {hand: GRIP, ang: 12, len: 520, r: 280, depth: 145};

export const herHip = (ground = GROUND) => pt(SHE_X, standHipY(ground, ADULT, SHE_S));
export const kidHip = (ground = GROUND) => pt(KID_X, standHipY(ground, CHILD, KID_S));

const HER_STREET: Pose = {
  view: 'front',
  turn: 0.28, // her face turns slightly toward the child
  lean: 2,
  headTilt: -2,
  eyes: 'open',
  mouth: 'closed',
  armL: {to: GRIP, bend: 1, hand: 'fist'}, // her right arm holds the shaft, extended over the child
  armR: {a1: 9, a2: 15, hand: 'open'},
  legL: {a1: 3, a2: 1},
  legR: {a1: -3, a2: -1},
};
const KID_STREET: Pose = {
  view: 'front',
  headTilt: -5, // looking up at the canopy
  eyes: 'open',
  mouth: 'closed',
  armL: {a1: 7, a2: 12, hand: 'open'},
  armR: {a1: -7, a2: -12, hand: 'open'},
  legL: {a1: 2, a2: 1},
  legR: {a1: -2, a2: -1},
};

type StreetOpts = Readonly<{
  f: number;
  layer?: 'all' | 'far' | 'mid' | 'near';
  warm?: number; // L3/L4 grade tint
  wet?: number;
  wetShoulder?: number;
  rimWarm?: number;
  tilt?: number; // extra canopy tilt (s9/img2: tilted AWAY from her)
  doorOn?: number; // her own lit doorway behind her (s9: "so a viewer can answer when")
}>;

/** The frame-0 street, decomposed into rail layers. `layer='all'` renders everything. */
export const StreetScene: React.FC<StreetOpts> = ({
  f,
  layer = 'all',
  warm = 0,
  wet = 0.85,
  wetShoulder = 0.25,
  rimWarm = 0,
  tilt = 0,
  doorOn = 0,
}) => {
  const geom: UmbrellaGeom = {...UMB_BASE, ang: UMB_BASE.ang + tilt};
  const cone = canopyShadowPts(geom, 980);
  const show = (l: string) => layer === 'all' || layer === l;
  return (
    <g>
      {show('far') ? (
        <g>
          <defs>
            <linearGradient
              id="st-sky"
              x1="0"
              y1="0"
              x2="0"
              y2={GROUND}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={PAL.night0} />
              <stop offset="55%" stopColor="#0B1620" />
              <stop offset="100%" stopColor={PAL.night3} />
            </linearGradient>
            <linearGradient
              id="st-fog"
              x1="0"
              y1="520"
              x2="0"
              y2="900"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={PAL.night3} stopOpacity="0" />
              <stop offset="55%" stopColor={PAL.mist} stopOpacity="0.5" />
              <stop offset="100%" stopColor={PAL.night3} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={1080} height={GROUND} fill="url(#st-sky)" />
          {/* the fog band that separates the canopy silhouette from the sky (D-07) */}
          <rect x={0} y={520} width={1080} height={380} fill="url(#st-fog)" />
          <g style={{filter: 'blur(5px) saturate(0.7)'}}>
            {/* facades across the street */}
            <rect x={-40} y={760} width={420} height={900} fill="#0C1822" />
            <rect x={380} y={640} width={360} height={1020} fill="#0A141D" />
            <rect x={740} y={720} width={380} height={940} fill="#0D1A24" />
            <rect x={150} y={860} width={120} height={200} fill="#13222E" opacity={0.8} />
            <rect x={560} y={760} width={110} height={180} fill="#13222E" opacity={0.6} />
            {/* one lit apartment window across the street — a warmth she is not under */}
            <LitWindow
              x={828}
              y={700}
              w={150}
              h={190}
              on={1}
              warm={warm > 0.5 ? 1 : 0}
              spillTo={1400}
            />
            {/* the ONE sodium lamp, behind her (single asset, one softness — D-A13) */}
            <SodiumLamp x={950} top={620} ground={GROUND} pool={1} glow={1} />
          </g>
          {doorOn > 0 ? (
            <g opacity={doorOn}>
              {/* her own lit doorway behind her, frame left (script §3 s9) */}
              <rect x={40} y={950} width={210} height={610} fill="#241A10" />
              <rect x={64} y={974} width={162} height={562} fill={PAL.window} opacity={0.5} />
              <rect
                x={40}
                y={950}
                width={210}
                height={610}
                fill="none"
                stroke={PAL.night1}
                strokeWidth={16}
              />
              <ellipse cx={145} cy={1255} rx={230} ry={330} fill={PAL.window} opacity={0.12} />
            </g>
          ) : null}
        </g>
      ) : null}

      {show('mid') ? (
        <g>
          <WetPavement y={GROUND} warm={warm > 0.5 ? 1 : 0} smearX={905} poolX={1010} />
          <Contact x={SHE_X} y={GROUND} w={250} />
          <Contact x={KID_X} y={GROUND} w={190} />
          {/* the rim's shadow cone: falls across the CHILD and the pavement, never across her */}
          <defs>
            <linearGradient
              id="st-cone"
              x1="0"
              y1="700"
              x2="0"
              y2="1700"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#02050A" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#02050A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#02050A" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={polyPath(cone)} fill="url(#st-cone)" />
          {/* the child — dry, lighter, under the rim */}
          <Child hip={kidHip()} s={KID_S} pose={KID_STREET} f={f} rimCold={0.5} rimSide={1} />
          {/* THE umbrella, anchored at her fist */}
          <UmbrellaOpen {...geom} f={f} s={SHE_S} warm={rimWarm > 0.6 ? 1 : 0} drips={1} />
          {/* her: right sleeve wet (wetArm 'L' = viewer-left = her right), 40 px glaze + drips */}
          <Person
            hip={herHip()}
            s={SHE_S}
            body={ADULT}
            look={HER}
            pose={HER_STREET}
            f={f}
            wet={wet}
            wetArm="L"
            wetShoulder={wetShoulder}
            rimCold={0.9}
            rimSide={1}
            rimWarm={rimWarm}
          />
        </g>
      ) : null}

      {show('near') ? (
        <g>
          {/* a near lamp post as the rail's foreground depth reference */}
          <g style={{filter: 'blur(7px)'}}>
            <rect x={44} y={260} width={26} height={1660} fill="#050B11" />
            <ellipse cx={57} cy={266} rx={40} ry={12} fill="#0B151C" />
          </g>
          {/* rain — masked out inside the canopy cone so the child stays dry (D-23) */}
          <RainLayer f={f} exclude={[cone]} />
        </g>
      ) : null}
    </g>
  );
};

const RainLayer: React.FC<{f: number; exclude: readonly (readonly {x: number; y: number}[])[]}> = ({
  f,
  exclude,
}) => <RainComp f={f} count={110} seed={7} opacity={0.5} width={2.5} exclude={exclude} />;

// ─────────────────────────── ProtoHook (s1, the cover) ───────────────────────────

const RAIL_Y = 64; // px of vertical travel at 1.0× — the depth gradient, not a pan
const DRIVE_EASE = bezier(0.45, 0, 0.18, 1);

const S1_CAP: Line[] = [
  [{t: 'Mọi người thường '}, {t: 'tìm đến bạn'}],
  [{t: 'mỗi khi có '}, {t: 'chuyện buồn', tier: 'light'}, {t: '.'}],
];

export const ProtoHook: React.FC = () => {
  const f = useCurrentFrame();
  const drive = ramp(f, 6, 78, DRIVE_EASE) + 0.16 * ramp(f, 84, 12, EASE.smooth);
  const scale = mix(1, 1.03, ramp(f, 0, HOOK_DUR, EASE.smooth));
  const capOp = ramp(f, 8, 14, EASE.out);
  return (
    <AbsoluteFill style={{backgroundColor: PAL.night0}}>
      <BKYDFonts />
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0}}
        >
          <g transform={`translate(0 ${f2(-RAIL_Y * 0.35 * drive)})`}>
            <StreetScene f={f} layer="far" />
          </g>
          <g transform={`translate(0 ${f2(-RAIL_Y * 0.7 * drive)})`}>
            <StreetScene f={f} layer="mid" />
          </g>
          <g transform={`translate(0 ${f2(-RAIL_Y * 1.4 * drive)})`}>
            <StreetScene f={f} layer="near" />
          </g>
        </svg>
        <NightGrade warm={0} vignette={0.5} />
        {/* frame 0 = the cover: the headline is already complete, no fade-in from black */}
        <Headline text="Ai che ô cho bạn?" top={380} size={64} />
        <Caption lines={S1_CAP} opacity={capOp} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── kitchen scene (s2a / a1 / s2b) ───────────────────────────

const DOOR_L = 600; // the doorway's left jamb — the wedge anchor (D-19)
const DOOR_R = 1030;
const DOOR_TOP = 360;
const THRESH = 1580;
const TABLE_Y = 1250;

const HER_HALL: Pose = {
  view: 'front',
  turn: 0.45, // her face turns toward the warm room
  headTilt: 3,
  eyes: 'open',
  mouth: 'closed',
  armL: {a1: 12, a2: 18, hand: 'open'},
  armR: {a1: -6, a2: -10, hand: 'open'},
  legL: {a1: 3, a2: 1},
  legR: {a1: -3, a2: -1},
};

type KitchenOpts = Readonly<{f: number; open: number; drop: number; headUp: number}>;

/** The kitchen doorway: the OTHER adult seated at the table, both glasses on it,
 *  her standing in the dark hallway with the door frame between them. */
const KitchenScene: React.FC<KitchenOpts> = ({f, open, drop, headUp}) => {
  const otherPose: Pose = {
    view: 'front',
    headDrop: mix(26, 0, headUp),
    headTilt: mix(14, -6, headUp),
    dropL: drop,
    dropR: drop,
    eyes: headUp > 0.5 ? 'open' : 'down',
    mouth: 'closed',
    // head in hands: both arms fold up to the head; at s2b the right hand drops to the glass
    armL: {to: pt(766, 1046), bend: 1, hand: 'open'},
    armR:
      headUp > 0.55
        ? {to: pt(896, 1216), bend: -1, hand: 'open'}
        : {to: pt(874, 1050), bend: -1, hand: 'open'},
    // seated: thighs forward, shins down — the table panel hides the legs
    legL: {a1: 76, a2: 8},
    legR: {a1: 70, a2: 10},
  };
  const wedge = doorWedge(DOOR_L, 820, THRESH, open, 560);
  return (
    <g>
      <defs>
        <radialGradient id="kt-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={PAL.amberHot} stopOpacity={0.4} />
          <stop offset="100%" stopColor={PAL.amber} stopOpacity={0} />
        </radialGradient>
        <linearGradient
          id="kt-wedge"
          x1={DOOR_L}
          y1="0"
          x2={DOOR_L - 560}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={PAL.amber} stopOpacity="0.34" />
          <stop offset="100%" stopColor={PAL.amber} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="kt-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#060C12" />
          <stop offset="100%" stopColor="#0A1219" />
        </linearGradient>
      </defs>
      {/* hallway + interior back wall */}
      <rect x={0} y={0} width={1080} height={1920} fill="#04080D" />
      <rect x={0} y={THRESH} width={1080} height={1920 - THRESH} fill="#0A141D" />
      <rect
        x={DOOR_L}
        y={DOOR_TOP}
        width={DOOR_R - DOOR_L}
        height={THRESH - DOOR_TOP}
        fill="#1C140C"
      />
      <g opacity={0.55 + 0.45 * open}>
        <ellipse cx={815} cy={860} rx={330} ry={420} fill="url(#kt-glow)" />
        {/* the table with the OTHER adult behind it */}
        <Person
          hip={pt(820, 1430)}
          s={0.95}
          body={ADULT}
          look={OTHER}
          pose={otherPose}
          f={f}
          screen={0}
          rimWarm={open}
        />
      </g>
      {/* table slab + front panel (drawn after the figure so the legs are occluded) */}
      <g opacity={0.75 + 0.25 * open}>
        <Surface x={628} y={TABLE_Y} w={420} h={44} warm={open} />
        <rect x={664} y={TABLE_Y + 44} width={352} height={300} fill="#1A120A" opacity={0.9} />
      </g>
      {/* both glasses on the table: THEIRS with water, HERS untouched and empty (S-01) */}
      <Glass x={886} base={TABLE_Y} w={78} h={124} water={0.75} lit={open} />
      <Glass x={694} base={TABLE_Y} w={78} h={124} water={0} lit={open * 0.6} />
      {/* doorway frame */}
      <rect
        x={DOOR_L - 34}
        y={DOOR_TOP - 34}
        width={34}
        height={THRESH - DOOR_TOP + 34}
        fill="#0B141C"
      />
      <rect
        x={DOOR_R}
        y={DOOR_TOP - 34}
        width={34}
        height={THRESH - DOOR_TOP + 34}
        fill="#0B141C"
      />
      <rect
        x={DOOR_L - 34}
        y={DOOR_TOP - 34}
        width={DOOR_R - DOOR_L + 68}
        height={34}
        fill="#0B141C"
      />
      {/* THE sliver: the wedge starts at the jamb and crosses the floor toward her feet */}
      {open > 0.001 ? (
        <g>
          <path d={polyPath(wedge)} fill="url(#kt-wedge)" />
          <rect
            x={DOOR_L - 16 * open}
            y={DOOR_TOP + 120}
            width={16 * open}
            height={THRESH - DOOR_TOP - 120}
            fill={PAL.amber}
            opacity={0.2 * open}
          />
        </g>
      ) : null}
      {/* she stands in the dark hallway — outside the warm room, door frame between */}
      <Contact x={280} y={GROUND} w={220} />
      <Person
        hip={pt(280, standHipY(GROUND, ADULT, SHE_S))}
        s={SHE_S}
        body={ADULT}
        look={HER}
        pose={HER_HALL}
        f={f}
        wet={0.6}
        wetArm="L"
        wetShoulder={0.2}
        rimCold={0.7}
        rimSide={-1}
        rimWarm={0}
        collarSliver={open}
        collarSide={1}
      />
      <RainComp f={f} count={26} seed={11} opacity={0.16} x0={-40} x1={560} y0={200} y1={1660} />
    </g>
  );
};

export const ProtoTurn: React.FC = () => {
  const f = useCurrentFrame();
  const OUT_CUBIC = bezier(0.215, 0.61, 0.355, 1); // the door gap OPENS
  const open = ramp(f, 18, 40, OUT_CUBIC);
  const cone = ramp(f, 26, 36, (t) => t); // the light cone fades in linearly — decoupled on purpose (D-08)
  const drop = ramp(f, 34, 56, EASE.smooth) * 15;
  const headUp = ramp(f, 74, 30, EASE.smooth);
  return (
    <AbsoluteFill style={{backgroundColor: PAL.night0}}>
      <BKYDFonts />
      <AbsoluteFill>
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0}}
        >
          <KitchenScene f={f} open={open * cone} drop={drop} headUp={headUp} />
        </svg>
        <NightGrade warm={cone > 0.4 ? 0.5 : 0} vignette={0.55} />
        <Caption
          lines={[
            [{t: 'Vai người khác '}, {t: 'chùng xuống'}],
            [{t: 'Còn bạn thì '}, {t: 'đứng ngoài', tier: 'light'}, {t: '.'}],
          ]}
          opacity={ramp(f, 6, 12, EASE.out)}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── interior room (s3 / a2 / s4 / s5 / img1 / s6 / s7 / s8) ───────────────────────────

type RoomKind = 's3' | 'a2' | 's4' | 's5' | 'img1' | 's6' | 's7' | 's8';

/** One dark room, eight staging states. Props and posture carry the difference. */
const RoomScene: React.FC<{
  f: number;
  kind: RoomKind;
  sliver?: number;
  sheen?: number;
  typed?: string;
}> = ({f, kind, sliver = 0, sheen = 0, typed = ''}) => {
  const seatedHip = pt(430, 1400);
  const headDown = kind === 's5' || kind === 'img1';
  const seated: Pose = {
    view: 'front',
    turn: kind === 's3' || kind === 's6' || kind === 's4' ? 0.35 : 0.15,
    headTilt: headDown ? 16 : 10,
    headDrop: headDown ? 24 : 10,
    eyes: 'down',
    mouth: 'closed',
    armL:
      kind === 's7' || kind === 's8'
        ? {to: pt(392, 1432), bend: 1, hand: 'fist'}
        : {to: pt(520, 1330), bend: 1, hand: 'open'},
    armR:
      kind === 's7' || kind === 's8'
        ? {to: pt(556, 1512), bend: -1, hand: 'fist'}
        : {a1: -14, a2: -22, hand: 'open', behind: true},
    legL: headDown ? {a1: 62, a2: 118} : {a1: 74, a2: 10},
    legR: headDown ? {a1: 56, a2: 122} : {a1: 68, a2: 12},
  };
  const furledA = pt(348, 1362);
  const furledB = pt(628, 1548);
  const furled = furledOutline(furledA, furledB, 1.0);
  return (
    <g>
      <defs>
        <linearGradient id="rm-wall" x1="0" y1="0" x2="0" y2="1920" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#070D13" />
          <stop offset="70%" stopColor="#0A1219" />
          <stop offset="100%" stopColor="#05090E" />
        </linearGradient>
        <radialGradient id="rm-scr" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={PAL.screen} stopOpacity="0.3" />
          <stop offset="100%" stopColor={PAL.screen} stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="rm-sliver"
          x1={1080}
          y1="0"
          x2={620}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={PAL.amber} stopOpacity="0.3" />
          <stop offset="100%" stopColor={PAL.amber} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rm-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={PAL.amberHot} stopOpacity="0" />
          <stop offset="50%" stopColor={PAL.amberHot} stopOpacity="0.75" />
          <stop offset="100%" stopColor={PAL.amberHot} stopOpacity="0" />
        </linearGradient>
        <clipPath id="rm-furled">
          <path d={polyPath(furled)} />
        </clipPath>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill="url(#rm-wall)" />
      <rect x={0} y={1620} width={1080} height={300} fill="#060B10" />

      {kind === 'a2' ? (
        /* a2 — hold on the window: rain on the glass, the lamp broken into moving dots */
        <g>
          <rect x={120} y={420} width={840} height={1000} fill="#0B1620" />
          <rect x={148} y={448} width={784} height={944} fill="#13222E" opacity={0.7} />
          <rect
            x={148}
            y={448}
            width={784}
            height={944}
            fill="none"
            stroke="#050B11"
            strokeWidth={26}
          />
          <rect x={526} y={448} width={18} height={944} fill="#050B11" />
          <rect x={148} y={900} width={784} height={18} fill="#050B11" />
          <RainComp
            f={f}
            count={70}
            seed={23}
            opacity={0.55}
            x0={150}
            x1={930}
            y0={450}
            y1={1390}
            width={3}
          />
          {Array.from({length: 12}).map((_, i) => {
            const cx = 200 + ((i * 137) % 700) + Math.sin((f + i * 21) / (18 + i)) * 14;
            const cy = 620 + ((i * 211) % 640) + Math.cos((f + i * 17) / (22 + i)) * 10;
            return (
              <ellipse key={i} cx={cx} cy={cy} rx={9} ry={13} fill={PAL.sodiumCore} opacity={0.5} />
            );
          })}
          {/* her head as a dark shape at the edge of frame */}
          <ellipse cx={70} cy={1310} rx={150} ry={190} fill="#04080D" />
        </g>
      ) : null}

      {kind === 's4' || kind === 's6' ? (
        /* s4 / s6 — over-the-shoulder: her shoulder + head silhouette bottom-left, phone big */
        <g>
          <ellipse cx={210} cy={1720} rx={420} ry={330} fill="#060C12" />
          <ellipse cx={330} cy={1330} rx={150} ry={185} fill="#080F16" />
          <LitWindow x={880} y={330} w={130} h={170} on={0.5} />
        </g>
      ) : null}

      {/* the chair / stool she sits on */}
      {kind !== 'a2' && kind !== 's4' && kind !== 's6' && kind !== 'img1' ? (
        <g>
          <rect x={360} y={1420} width={220} height={30} rx={10} fill="#1A2833" />
          <rect x={380} y={1450} width={26} height={210} fill="#111C25" />
          <rect x={536} y={1450} width={26} height={210} fill="#111C25" />
        </g>
      ) : null}

      {/* she */}
      {kind !== 'a2' && kind !== 'img1' ? (
        <Person
          hip={seatedHip}
          s={SHE_S}
          body={ADULT}
          look={HER}
          pose={seated}
          f={f}
          wet={kind === 's7' || kind === 's8' ? 0.75 : 0.6}
          wetArm="L"
          wetShoulder={kind === 's7' || kind === 's8' ? 0.45 : 0.2}
          rimCold={0.55}
          rimSide={-1}
          rimWarm={sliver}
          screen={kind === 's3' || kind === 's4' || kind === 's6' ? 0.95 : 0}
          phoneIn={kind === 's3' || kind === 's5' ? 'L' : undefined}
          phoneLit={kind === 's3' || kind === 's5' ? 0.9 : 0}
        />
      ) : null}

      {/* s3 — the furled umbrella dripping by the door */}
      {kind === 's3' ? (
        <g>
          <UmbrellaFurled a={pt(928, 1050)} b={pt(1016, 1592)} s={1} drip={1} f={f} />
          <ellipse cx={960} cy={1616} rx={92} ry={16} fill={PAL.sheen} opacity={0.14} />
        </g>
      ) : null}

      {/* s7 / s8 — the furled umbrella IN HER LAP + the L2 sliver + the sheen (swept once) */}
      {kind === 's7' || kind === 's8' ? (
        <g>
          {/* the s2a empty glass still on the table behind her (S-01) */}
          <Surface x={700} y={1268} w={330} h={30} warm={sliver} />
          <Glass x={860} base={1268} w={72} h={116} water={0} lit={sliver * 0.7} />
          <UmbrellaFurled a={furledA} b={furledB} s={1} drip={0.2} f={f} warm={sliver} />
          {sheen > 0 && sheen < 1 ? (
            <g clipPath="url(#rm-furled)">
              <rect
                x={mix(140, 700, sheen)}
                y={1200}
                width={150}
                height={520}
                fill="url(#rm-sheen)"
                transform={`rotate(-26 ${f2(mix(215, 775, sheen))} 1455)`}
              />
            </g>
          ) : null}
        </g>
      ) : null}

      {/* the doorway L2 sliver, entering from the right */}
      {sliver > 0 ? (
        <rect x={780} y={360} width={300} height={1300} fill="url(#rm-sliver)" opacity={sliver} />
      ) : null}

      {/* img1 — the phone face-down on the table + her hand */}
      {kind === 'img1' ? (
        <g>
          <Surface x={300} y={1290} w={560} h={40} />
          <Phone x={430} y={1030} w={300} state="facedown" rot={-4} />
          <Contact x={580} y={1294} w={330} />
          <ellipse cx={300} cy={1560} rx={300} ry={340} fill="#070D13" />
        </g>
      ) : null}

      {/* the phone prop for s4 / s6 (big, in the foreground) */}
      {kind === 's4' ? (
        <g>
          <Phone
            x={560}
            y={640}
            w={300}
            state="chat"
            typed={`Hôm nay mình mệt quá.${typed}`}
            cursor
            dim={0.95}
          />
          {/* the send key, never pressed: the state tag sits beside it */}
          <rect
            x={584}
            y={1218}
            width={190}
            height={64}
            rx={20}
            fill="#21384A"
            stroke="#7FA4BE"
            strokeWidth={3}
          />
          <text
            x={679}
            y={1262}
            textAnchor="middle"
            fontFamily="'Be Vietnam Pro', sans-serif"
            fontWeight={600}
            fontSize={40}
            fill={PAL.grey2}
          >
            Chưa gửi
          </text>
        </g>
      ) : null}
      {kind === 's6' ? (
        <g>
          <Phone x={560} y={620} w={300} state="incoming" ring={0.5} dim={1} />
        </g>
      ) : null}

      {/* cold screen glow pooling in the room (s3/s4/s6) */}
      {kind === 's3' || kind === 's4' || kind === 's6' ? (
        <ellipse
          cx={kind === 's3' ? 560 : 700}
          cy={kind === 's3' ? 1240 : 1000}
          rx={420}
          ry={420}
          fill="url(#rm-scr)"
        />
      ) : null}
    </g>
  );
};

// ─────────────────────────── kerb scene (s10 / END) ───────────────────────────

const KY = 1330; // kerb top

const ThirdHand: React.FC<{
  wrist: {x: number; y: number};
  elbow: {x: number; y: number};
  s: number;
}> = ({wrist, elbow, s}) => {
  const dir = {x: wrist.x - elbow.x, y: wrist.y - elbow.y};
  const L = Math.hypot(dir.x, dir.y) || 1;
  const d = {x: dir.x / L, y: dir.y / L};
  return (
    <g>
      <path
        d={`M${P2(elbow)} L${P2(wrist)}`}
        stroke="#6F6763"
        strokeWidth={62 * s}
        strokeLinecap="round"
      />
      <path
        d={`M${P2(elbow)} L${P2(wrist)}`}
        stroke="#9A8E88"
        strokeWidth={52 * s}
        strokeLinecap="round"
      />
      <g>
        {/* a simplified fist plate on the handle */}
        <ellipse
          cx={wrist.x + d.x * 14 * s}
          cy={wrist.y + d.y * 14 * s}
          rx={26 * s}
          ry={24 * s}
          fill="#9A8E88"
          stroke="#6F6763"
          strokeWidth={2.4 * s}
        />
      </g>
    </g>
  );
};

type KerbOpts = Readonly<{f: number; warm: number; end?: boolean}>;

/** s10 / END: the street outside her own lit doorway. She sits low on the kerb; the
 *  missed-call phone and the warm cup rest on it; the saved name's hand reaches the
 *  umbrella handle from off-frame (D-01: the child never touches it). */
const KerbScene: React.FC<KerbOpts> = ({f, warm, end = false}) => {
  const hipY = end ? 1680 : 1300;
  const her: Pose = {
    view: 'front',
    turn: 0.4,
    headTilt: 8,
    headDrop: end ? 30 : 14,
    eyes: 'down',
    mouth: 'closed',
    armL: {a1: 26, a2: 44, hand: 'open'},
    armR: {a1: -10, a2: -18, hand: 'open'},
    legL: {a1: 72, a2: 96},
    legR: {a1: 66, a2: 100},
  };
  const grip = end ? pt(860, 1790) : pt(760, 1440);
  const geom: UmbrellaGeom = end
    ? {hand: grip, ang: -20, len: 480, r: 240, depth: 122}
    : {hand: grip, ang: 6, len: 500, r: 250, depth: 128};
  const phoneX = end ? 140 : 620;
  const phoneY = end ? 1150 : 715;
  return (
    <g>
      <defs>
        <linearGradient id="kb-sky" x1="0" y1="0" x2="0" y2="1920" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#060D14" />
          <stop offset="60%" stopColor="#0C1620" />
          <stop offset="100%" stopColor="#050B11" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1080} height={1920} fill="url(#kb-sky)" />
      {/* her own lit doorway, warm, behind her (L4: two sources) */}
      <g style={{filter: 'blur(4px)'}}>
        <rect
          x={end ? 660 : 700}
          y={end ? 420 : 400}
          width={340}
          height={end ? 1080 : 930}
          fill="#2A1D10"
        />
        <rect
          x={end ? 690 : 730}
          y={end ? 450 : 430}
          width={280}
          height={end ? 1020 : 870}
          fill={PAL.amber}
          opacity={0.34}
        />
        <ellipse
          cx={end ? 830 : 870}
          cy={end ? 900 : 830}
          rx={360}
          ry={480}
          fill={PAL.amber}
          opacity={0.13}
        />
      </g>
      <LitWindow x={70} y={end ? 520 : 460} w={150} h={190} on={0.8} warm={1} />
      <WetPavement y={end ? 1700 : KY} warm={warm} kerb={0} />
      {/* the kerb / step she sits on */}
      <Surface x={-40} y={end ? 1700 : KY} w={1160} h={end ? 240 : 340} warm={warm} />
      <UmbrellaOpen {...geom} f={f} s={SHE_S} warm={warm} drips={end ? 0.4 : 1} />
      <Contact x={end ? 620 : 340} y={end ? 1700 : KY} w={300} />
      <Person
        hip={pt(end ? 620 : 340, hipY)}
        s={SHE_S}
        body={ADULT}
        look={HER}
        pose={her}
        f={f}
        wet={1}
        wetArm="L"
        wetShoulder={0.9}
        rimCold={0.4}
        rimSide={1}
        rimWarm={warm}
      />
      {/* the still life: the missed-call phone from s6 + the warm cup */}
      <Contact x={phoneX + 150} y={end ? 1704 : KY + 4} w={330} />
      <Phone x={phoneX} y={phoneY} w={300} state="missed" dim={1} rot={end ? -10 : -3} />
      <Cup x={end ? 470 : 980} base={end ? 1700 : KY} w={94} h={116} f={f} warm={1} />
      {/* the saved name's hand, entering from off-frame, on the umbrella handle */}
      <ThirdHand
        wrist={end ? pt(900, 1795) : pt(806, 1452)}
        elbow={end ? pt(1120, 1880) : pt(1096, 1540)}
        s={SHE_S}
      />
      <RainComp f={f} count={end ? 34 : 60} seed={31} opacity={end ? 0.22 : 0.4} />
    </g>
  );
};

// ─────────────────────────── ProtoEnd (silent title card) ───────────────────────────

const TITLE_L1 = ['Bạn', 'không', 'yếu', 'đuối,'];

const WordsSlide: React.FC<{
  words: string[];
  startIndex: number;
  f: number;
  strongFrom?: number;
}> = ({words, startIndex, f, strongFrom}) => (
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 22px'}}>
    {words.map((w, i) => {
      const p = ramp(f, 8 + (startIndex + i) * 3, 18, EASE.out);
      const strong = strongFrom !== undefined && i >= strongFrom;
      return (
        <span
          key={w + i}
          style={{
            display: 'inline-block',
            opacity: p,
            transform: `translateY(${f2((1 - p) * 26)}px)`,
            filter: p >= 1 ? undefined : `blur(${f2((1 - p) * 11)}px)`,
            fontFamily: "'Literata', Georgia, serif",
            fontWeight: 700,
            fontSize: 64,
            lineHeight: 1.35,
            color: strong ? PAL.amberHot : PAL.grey2,
            textShadow: '0 2px 16px rgba(4,9,15,0.95)',
          }}
        >
          {w}
        </span>
      );
    })}
  </div>
);

export const ProtoEnd: React.FC = () => {
  const f = useCurrentFrame();
  const scale = mix(1, 1.03, ramp(f, 0, END_DUR, EASE.smooth));
  return (
    <AbsoluteFill style={{backgroundColor: PAL.night0}}>
      <BKYDFonts />
      <AbsoluteFill style={{transform: `scale(${scale})`}}>
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0}}
        >
          <KerbScene f={f} warm={1} end />
        </svg>
        {/* local scrim so both title lines hold their contrast over the scene (D-08/D-10) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 700,
            height: 480,
            background:
              'linear-gradient(180deg, rgba(4,9,15,0) 0%, rgba(4,9,15,0.72) 30%, rgba(4,9,15,0.72) 70%, rgba(4,9,15,0) 100%)',
          }}
        />
        <NightGrade warm={1} vignette={0.5} />
        <div style={{position: 'absolute', left: 60, right: 60, top: 776}}>
          <WordsSlide words={TITLE_L1} startIndex={0} f={f} />
          <div style={{height: 14}} />
          <WordsSlide
            words={['bạn', 'chỉ', 'đã', 'mạnh', 'mẽ', 'quá', 'lâu']}
            startIndex={4}
            f={f}
            strongFrom={3}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── ProtoS7 (gut punch, mid sheen) ───────────────────────────

export const ProtoS7: React.FC = () => {
  const f = useCurrentFrame();
  const sliver = ramp(f, 0, 30, EASE.smooth) * 0.6 + 0.25;
  const sheen = ramp(f, 12, 46, EASE.smooth);
  return (
    <AbsoluteFill style={{backgroundColor: PAL.night0}}>
      <BKYDFonts />
      <AbsoluteFill>
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0}}
        >
          <RoomScene f={f} kind="s7" sliver={sliver} sheen={sheen} />
        </svg>
        <NightGrade warm={0.35} vignette={0.55} />
        <Caption
          lines={[[{t: 'với việc mình'}], [{t: 'phải là người ổn', tier: 'strong'}, {t: '.'}]]}
          warm
          opacity={ramp(f, 4, 12, EASE.out)}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── ProtoS9 (palette turn, mid boundary) ───────────────────────────

export const ProtoS9: React.FC = () => {
  const f = useCurrentFrame();
  const t = ramp(f, 10, 60, EASE.smooth);
  const bx = mix(-320, 1420, t);
  const bound = [pt(bx + 280, -160), pt(bx + 620, -160), pt(bx - 380, 2080), pt(bx - 740, 2080)];
  return (
    <AbsoluteFill style={{backgroundColor: PAL.night0}}>
      <BKYDFonts />
      <AbsoluteFill>
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0}}
        >
          <defs>
            <clipPath id="s9-warm">
              <path d={polyPath(bound)} />
            </clipPath>
            <clipPath id="s9-core">
              <path d={`${polyPath([bound[0], bound[1]])} L${P2(bound[2])} L${P2(bound[3])} Z`} />
            </clipPath>
          </defs>
          {/* the SAME street twice — pixel-identical layout, only the grade differs */}
          <StreetScene f={f} warm={0} wet={1} wetShoulder={0.9} rimWarm={0} tilt={8} doorOn={1} />
          <g clipPath="url(#s9-warm)">
            <StreetScene f={f} warm={1} wet={1} wetShoulder={0.9} rimWarm={1} tilt={8} doorOn={1} />
          </g>
          {/* the dawn line: white-hot core + warm band on the lit side */}
          <path
            d={`M${P2(bound[0])} L${P2(bound[3])}`}
            stroke={PAL.amberHot}
            strokeWidth={26}
            opacity={0.5 * (t > 0 && t < 1 ? 1 : 0)}
            fill="none"
          />
          <path
            d={`M${P2(bound[0])} L${P2(bound[3])}`}
            stroke="#FFFFFF"
            strokeWidth={7}
            opacity={0.9 * (t > 0 && t < 1 ? 1 : 0)}
            fill="none"
          />
        </svg>
        <NightGrade warm={t > 0.5 ? 0.7 : 0.2} vignette={0.5} />
        <Caption
          lines={[[{t: 'Người thường xuyên'}], [{t: 'che ô cho người khác'}]]}
          warm={t > 0.5}
          opacity={ramp(f, 4, 12, EASE.out)}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── ProtoS10 (climax still life) ───────────────────────────

export const ProtoS10: React.FC = () => {
  const f = useCurrentFrame();
  const push = mix(1, 1.035, ramp(f, 0, S10_DUR, EASE.smooth)); // slow lateral push (declared s10 deviation, D-15)
  return (
    <AbsoluteFill style={{backgroundColor: PAL.night0}}>
      <BKYDFonts />
      <AbsoluteFill style={{transform: `scale(${push})`}}>
        <svg
          width={1080}
          height={1920}
          viewBox="0 0 1080 1920"
          style={{position: 'absolute', inset: 0}}
        >
          <KerbScene f={f} warm={1} />
        </svg>
        <NightGrade warm={1} vignette={0.45} />
        <MinhHoa x={640} y={1258} />
        <Caption
          lines={[[{t: "'Hôm nay có chuyện gì"}], [{t: 'với bạn thế?', tier: 'strong'}, {t: "'"}]]}
          warm
          opacity={ramp(f, 4, 12, EASE.out)}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ─────────────────────────── storyboard board (16 tiles) ───────────────────────────

export type ShotId =
  | 's1'
  | 's2a'
  | 'a1'
  | 's2b'
  | 's3'
  | 'a2'
  | 's4'
  | 's5'
  | 'img1'
  | 's6'
  | 's7'
  | 's8'
  | 's9'
  | 'img2'
  | 's10'
  | 'END';

export const ORDER: readonly ShotId[] = [
  's1',
  's2a',
  'a1',
  's2b',
  's3',
  'a2',
  's4',
  's5',
  'img1',
  's6',
  's7',
  's8',
  's9',
  'img2',
  's10',
  'END',
];
export const BOARD_IDS = ORDER;

const CARDS: Record<ShotId, string> = {
  s1: 'camera/depth-layer-moves',
  s2a: 'effects/light-play-moves A',
  a1: 'effects/light-play-moves A',
  s2b: 'effects/light-play-moves A',
  s3: 'effects/spotlight-sweep-moves C',
  a2: 'effects/glow-flyline-moves A',
  s4: 'interaction/glass-pill-dictation-typing',
  s5: 'typography/typewriter-moves A',
  img1: 'typography/typewriter-moves A',
  s6: 'interaction/hashtag-to-pill-materialize',
  s7: 'effects/light-play-moves B',
  s8: 'effects/light-play-moves B',
  s9: 'interaction/theme-switch-moves A',
  img2: 'interaction/theme-switch-moves A',
  s10: 'camera/tension-camera-moves A',
  END: 'typography/blur-slide',
};

const BOARD_FRAMES: Record<ShotId, number> = {
  s1: 84,
  s2a: 40,
  a1: 112,
  s2b: 100,
  s3: 60,
  a2: 45,
  s4: 70,
  s5: 40,
  img1: 45,
  s6: 40,
  s7: 45,
  s8: 80,
  s9: 55,
  img2: 80,
  s10: 45,
  END: 86,
};

const Tile: React.FC<{shot: ShotId}> = ({shot}) => {
  const f = BOARD_FRAMES[shot];
  let scene: React.ReactNode;
  switch (shot) {
    case 's1':
      scene = <StreetScene f={f} />;
      break;
    case 's2a':
      scene = <KitchenScene f={f} open={0} drop={0} headUp={0} />;
      break;
    case 'a1':
      scene = <KitchenScene f={f} open={1} drop={15} headUp={0} />;
      break;
    case 's2b':
      scene = <KitchenScene f={f} open={1} drop={15} headUp={1} />;
      break;
    case 's9':
      scene = (
        <>
          <StreetScene f={f} warm={0} wet={1} wetShoulder={0.9} tilt={8} doorOn={1} />
          <defs>
            <clipPath id="bd-s9">
              <path d={polyPath([pt(700, -160), pt(1500, -160), pt(120, 2080), pt(-680, 2080)])} />
            </clipPath>
          </defs>
          <g clipPath="url(#bd-s9)">
            <StreetScene f={f} warm={1} wet={1} wetShoulder={0.9} rimWarm={1} tilt={8} doorOn={1} />
          </g>
        </>
      );
      break;
    case 'img2':
      scene = (
        <StreetScene f={f} warm={1} wet={1} wetShoulder={1} rimWarm={1} tilt={14} doorOn={1} />
      );
      break;
    case 's10':
      scene = <KerbScene f={f} warm={1} />;
      break;
    case 'END':
      scene = <KerbScene f={f} warm={1} end />;
      break;
    default:
      scene = (
        <RoomScene
          f={f}
          kind={shot as RoomKind}
          sliver={shot === 's7' || shot === 's8' ? 0.55 : 0}
          sheen={shot === 's7' ? 0.5 : 1}
          typed=""
        />
      );
  }
  return (
    <AbsoluteFill style={{backgroundColor: PAL.night0}}>
      <BKYDFonts />
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{position: 'absolute', inset: 0}}
      >
        {scene}
      </svg>
      <NightGrade
        warm={shot === 's10' || shot === 'END' || shot === 's9' || shot === 'img2' ? 0.6 : 0}
        vignette={0.4}
      />
      {/* label: shot id + card name. 76 px / 60 px in tile coords → ≥ 18 px on the 1080-wide sheet */}
      <div
        style={{
          position: 'absolute',
          left: 36,
          top: 30,
          fontFamily: "'Be Vietnam Pro', sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: '#F2F6F9',
            textShadow: '0 2px 10px rgba(4,9,15,0.95)',
            lineHeight: 1.05,
          }}
        >
          {shot}
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 600,
            color: '#A7B4BE',
            textShadow: '0 2px 10px rgba(4,9,15,0.95)',
          }}
        >
          {CARDS[shot]}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const BoardTile: React.FC<{shot?: ShotId}> = ({shot = 's1'}) => <Tile shot={shot} />;
