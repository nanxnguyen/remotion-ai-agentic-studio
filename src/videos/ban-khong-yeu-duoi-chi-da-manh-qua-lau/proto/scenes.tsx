// Scenes — ban-khong-yeu-duoi-chi-da-manh-qua-lau, Phase 3c prototype.
//
// Every composition here is a RE-SKIN of a video-shotcraft demo file named in
// docs/ban-khong-yeu-duoi-chi-da-manh-qua-lau/design-spec.md §6, copied from
// skills/video-shotcraft/demos/ and re-coloured with this video's tokens. The
// mechanism (layer counts, drive curve, easing, locked params) is kept; the
// subject matter is replaced. Nothing here is written from a card's name alone.
//
//   ProtoHook  ← demos/camera/depth-layer-moves/MultiplaneReal.tsx
//   ProtoTurn  ← demos/effects/light-play-moves/SpotlightSweepReveal.tsx
//   ProtoEnd   ← demos/typography/blur-slide/BlurSlide.tsx
//   BoardTile  ← low-fi storyboard; composition/staging only, no technique.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

import {fitFontSize} from '../../../core/fit-text';
import {EASE, bezier, mix, ramp} from './lib/polish';
import {
  BKYDFonts,
  Caption,
  Child,
  DoorwaySliver,
  FONT,
  Figure,
  Headline,
  LitWindow,
  MinhHoa,
  NightGrade,
  PAL,
  Rain,
  SodiumLamp,
  Umbrella,
  WetPavement,
  hash,
} from './kit';

export const HOOK_DUR = 96; // 3.2 s — s1 clip is 3.34 s at the 3.9 planning rate
export const TURN_DUR = 120; // 4.0 s — a1 is the payoff; the card needs its full arc
export const END_DUR = 96; // 3.2 s — the script's END card, verbatim

// ── Shared staging constants (one composition, one world) ───────────────────────────
const GROUND = 1712;
const SHE = {x: 470, y: 520, s: 1.86};
const KID = {x: 218, y: 906, s: 1.26};
const CANOPY = {cx: 500, rimY: 452, w: 810, h: 212};
const HANDLE_Y = GROUND - 60; // where her hand is on the shaft

// ═══════════════════════════════════════════════════════════════════════════════
// ProtoHook — card: camera/depth-layer-moves · style-key: multiplane
// demo: demos/camera/depth-layer-moves/MultiplaneReal.tsx
// ═══════════════════════════════════════════════════════════════════════════════

/** Card's rail coefficients, unchanged: far 0.35x · mid 1.0x · near 1.4x (+ the 0x type layer). */
const RAIL = 0.35;
const MID = 1;
const NEAR = 1.4;
/** Card's asymmetric in-out: "起步柔、中段匀、落位很软". */
const DRIVE_EASE = bezier(0.45, 0, 0.18, 1);
const RAIL_Y = 30; // px of vertical travel at 1.0x — the depth gradient, not a pan
const driveAt = (f: number) => ramp(f, 6, 78, DRIVE_EASE) + 0.16 * ramp(f, 84, 12, EASE.smooth);

/** Card: the main reading layer must be a high-res texture with NO blur. Never blurred here. */
const Facades: React.FC = () => (
  <svg
    width={1080}
    height={1700}
    viewBox="0 0 1080 1700"
    style={{position: 'absolute', left: 0, top: 0, display: 'block'}}
  >
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0B1721" />
        <stop offset="46%" stopColor="#152734" />
        <stop offset="100%" stopColor="#1E3342" />
      </linearGradient>
    </defs>
    <rect width={1080} height={1700} fill="url(#sky)" />
    {/* the far block of flats: the mid-value plane the two silhouettes stand against */}
    <rect x={0} y={0} width={1080} height={1020} fill="#21353F" opacity={0.34} />
    {Array.from({length: 26}).map((_, i) => {
      const x = 40 + hash(21, i) * 1010;
      const y = 180 + hash(22, i) * 900;
      const w = 26 + hash(23, i) * 44;
      const h = 40 + hash(24, i) * 90;
      const lit = hash(25, i) > 0.86;
      return (
        <rect
          key={i}
          x={x}
          y={y}
          width={w}
          height={h}
          fill={lit ? PAL.window : PAL.night2}
          opacity={lit ? 0.3 : 0.5}
        />
      );
    })}
    {/* the block of flats on the far side of the street — the 0.35x layer's subject */}
    <rect x={0} y={1020} width={1080} height={480} fill="#182B36" opacity={0.9} />
    <rect x={0} y={1020} width={1080} height={3} fill="#39526000" opacity={0.7} />
  </svg>
);

export const ProtoHook: React.FC = () => {
  const f = useCurrentFrame();
  const d = driveAt(f);
  // Card: "落定后主角浮起" — her wet sleeve is the hero; it lifts and takes a thin ring
  // ~8 frames after the rail settles. §2.2's push-in 1.00→1.03 rides the same drive.
  const lift = ramp(f, 78, 14, EASE.out);
  const ring = ramp(f, 86, 16, EASE.snappy);
  const push = 1 + 0.03 * d;

  return (
    <AbsoluteFill style={{background: PAL.night0, overflow: 'hidden'}}>
      <BKYDFonts />

      {/* ── far layer 0.35x ── card: "缩小一档、退焦 5px、降饱和、上浓下淡的同色空气薄雾" */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${(-RAIL_Y * RAIL * d).toFixed(2)}px) scale(${(1 + 0.012 * d).toFixed(4)})`,
          transformOrigin: '50% 42%',
          filter: 'blur(5px) saturate(0.7)',
          opacity: 0.8,
        }}
      >
        <Facades />
        <SodiumLamp x={-236} y={-40} />
      </div>

      {/* ── mid layer 1.0x — THE reading layer, absolutely sharp ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${(-RAIL_Y * MID * d).toFixed(2)}px) scale(${push.toFixed(5)})`,
          transformOrigin: '54% 44%',
        }}
      >
        {/* across the street: one lit window — a warmth she is not standing under */}
        <LitWindow x={886} y={372} w={92} h={114} />

        <WetPavement y={GROUND} rain={0.5} />

        {/* the child — dry, matte, LIGHTER than her wet sleeve (CP2, never inverted) */}
        <div style={{transform: `translateY(${(-6 * lift).toFixed(2)}px)`}}>
          <Child x={KID.x} y={KID.y} s={KID.s} headTilt={6} mouth="closed" edge={0.7} />
        </div>

        {/* she — wetness 0.62 already at frame 0, the film's invariant */}
        <Figure x={SHE.x} y={SHE.y} s={SHE.s} wetness={0.62} umbrella edge={0.85} />

        {/* the hero ring: the sheen edge of the wet stripe, after the rail lands */}
        <div
          style={{
            position: 'absolute',
            left: SHE.x + 188 * SHE.s,
            top: SHE.y + 132 * SHE.s,
            width: 58 * SHE.s,
            height: 212 * SHE.s,
            borderRadius: 26,
            border: `2px solid ${PAL.sheen}`,
            opacity: 0.5 * ring,
            transform: `translateY(${(-14 * lift).toFixed(2)}px)`,
            boxShadow: `0 0 26px rgba(143,182,206,${(0.35 * ring).toFixed(3)})`,
          }}
        />

        {/* the umbrella, tilted a few degrees TOWARD the child so the rim's shadow falls on them */}
        <Umbrella
          cx={CANOPY.cx}
          rimY={CANOPY.rimY}
          w={CANOPY.w}
          h={CANOPY.h}
          tilt={-6}
          open
          bead={1}
          shaft={HANDLE_Y - CANOPY.rimY}
        />
      </div>

      {/* ── near layer 1.4x ── card: "掠��镜头" foreground, defocused, directional drag ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${(-RAIL_Y * NEAR * d).toFixed(2)}px) scale(${(1 + 0.02 * d).toFixed(4)})`,
          transformOrigin: '30% 50%',
          filter: 'blur(7px)',
          pointerEvents: 'none',
        }}
      >
        {/* the near lamp post, cropped — depth reference so the rail reads as a rail */}
        <div
          style={{
            position: 'absolute',
            left: -96,
            top: 40,
            width: 132,
            height: 1700,
            background: 'linear-gradient(90deg,#060B11,#0C1620)',
            opacity: 0.92,
          }}
        />
        <Rain count={26} opacity={0.34} speed={1.5} seed={5} />
      </div>

      {/* ── air perspective: cold haze that thickens toward the bottom of the frame ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(11,23,33,0.62) 0%, rgba(11,23,33,0.22) 44%, rgba(11,23,33,0) 100%)`,
          pointerEvents: 'none',
        }}
      />
      <Rain count={34} opacity={0.26} seed={2} />

      {/* ── 0x layer: the type that does not move while the world does ── */}
      <Headline clearAt={999} top={352} size={64} />
      <Caption lines={['Mọi người thường tìm đến bạn', 'mỗi khi có chuyện buồn.']} />
      <NightGrade strength={0.36} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ProtoTurn — card: effects/light-play-moves, form A · style-key: spotlight-sweep
// demo: demos/effects/light-play-moves/SpotlightSweepReveal.tsx
// This is L1 — THE one arrival. It happens once, here, and never again as a "first".
// ═══════════════════════════════════════════════════════════════════════════════

const SWING0 = 6;
const PERIOD = 35.5;
const SWING_END = Math.round(SWING0 + PERIOD * 2.25); // 86: θ ends at 4π, sin = 0, dead centre
const IRIS_END = SWING_END + 22;
const SPOT_CX = 520;
const SPOT_CY = 880;
/** Narrowed from the card's 600 — L1 is a sliver at a doorway, not a theatre spot. */
const AMP = 260;
const R0 = 190; // card's swinging spot radius, narrowed to a sliver
const outCubic = bezier(0.215, 0.61, 0.355, 1);

// Card 命门: the envelope is damped to 0 so that x AND velocity are both zero when the
// swing stops. A raw sine would brake hardest exactly at the centre — the card's own veto.
const spotAt = (f: number) => {
  const sf = Math.min(Math.max(f, SWING0), SWING_END);
  const th = -Math.PI / 2 + (2 * Math.PI * (sf - SWING0)) / PERIOD;
  const env = 1 - ramp(sf, SWING0 + PERIOD * 0.75, SWING_END - SWING0 - PERIOD * 0.75, EASE.smooth);
  const u = Math.sin(th) * env;
  return {x: SPOT_CX + AMP * u, y: SPOT_CY + 18 - 34 * u * u};
};

// Card 命门: tungsten pre-heat — two flickers before the lamp holds.
const FLICKER = [0, 0.55, 0.15, 0.8, 0.45, 1];
const lampOn = (f: number) => (f < 4 ? 0 : f >= 10 ? 1 : FLICKER[Math.min(5, f - 4)]);

/** The kitchen doorway still life: two glasses on the table — theirs with water in it,
 *  hers still where she left it, untouched and empty (S-01, carried from `s2a` to `s7`). */
const Doorway: React.FC<{lit: number}> = ({lit}) => (
  <>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg, #21323F 0%, #2B4152 54%, #33506A 100%)`,
      }}
    />
    {/* the doorway: a dark rectangle on HER side, with the warm sliver at its near edge */}
    <div
      style={{
        position: 'absolute',
        left: 782,
        top: 150,
        width: 236,
        height: 1010,
        borderRadius: 8,
        background: `linear-gradient(90deg, #2E4757 0%, #080F16 74%)`,
        border: `2px solid #4A6A7C`,
      }}
    />
    {/* L1: a warm sliver from the hallway. Small, narrow, unexplained — it is NOT a lamp. */}
    <DoorwaySliver x={712} y={150} w={120} h={1010} amount={lit} />
    {/* the wedge it throws down onto her collar */}
    <div
      style={{
        position: 'absolute',
        left: 690,
        top: 430,
        width: 190,
        height: 300,
        borderRadius: 95,
        background: `radial-gradient(ellipse at 30% 20%, rgba(240,180,95,${0.3 * lit}), rgba(240,180,95,0) 72%)`,
        filter: 'blur(22px)',
        mixBlendMode: 'screen',
      }}
    />
    {/* the table */}
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 1420,
        height: 30,
        background: 'linear-gradient(180deg,#5B7B8D,#31485A)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 1450,
        bottom: 0,
        background: 'linear-gradient(180deg,#1E3140,#101D27)',
      }}
    />
    {/* THEM, opposite, cropped by the left edge. a1 is "the same shot one beat later", so
        they are already in the frame at s2a; their shoulders drop by 10 px when L1 lands. */}
    <div style={{transform: `translateY(${(10 * lit).toFixed(1)}px)`}}>
      <Figure x={-78} y={392} s={1.5} wetness={0} coat="grey" mouth="closed" />
    </div>
    {/* THEIR glass — water in it */}
    <div
      style={{
        position: 'absolute',
        left: 216,
        top: 1256,
        width: 132,
        height: 166,
        borderRadius: 12,
        border: `4px solid ${PAL.grey2}`,
        opacity: 0.85,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 6,
          right: 6,
          top: 62,
          bottom: 6,
          borderRadius: 7,
          background: PAL.sheen,
          opacity: 0.5,
        }}
      />
    </div>
    {/* HER glass — still where she left it, untouched and empty */}
    <div
      style={{
        position: 'absolute',
        left: 748,
        top: 1256,
        width: 132,
        height: 166,
        borderRadius: 12,
        border: `4px solid #CFDBE3`,
        opacity: 0.95,
        boxShadow: `inset 0 0 26px rgba(4,9,15,0.7)`,
      }}
    />
    {/* her hands, resting — doing nothing for anyone */}
    <div
      style={{
        position: 'absolute',
        left: 636,
        top: 1404,
        width: 300,
        height: 40,
        borderRadius: 20,
        background: '#3E5566',
      }}
    />
    {/* she */}
    <Figure x={520} y={330} s={1.58} wetness={0.5} mouth="closed" edge={0.5} />
    {/* the collar edge — the exact sliver L1 is specified to reach */}
    <div
      style={{
        position: 'absolute',
        left: 520 + 96 * 1.58,
        top: 330 + 120 * 1.58,
        width: 92,
        height: 32,
        borderRadius: 16,
        background: '#08121A',
        opacity: 0.72,
      }}
    />
    {/* the warm sliver landing ON that collar edge */}
    <div
      style={{
        position: 'absolute',
        left: 520 + 74 * 1.58,
        top: 330 + 104 * 1.58,
        width: 150,
        height: 78,
        borderRadius: 39,
        background: `radial-gradient(ellipse at 40% 45%, rgba(255,226,180,${0.9 * lit}), rgba(240,180,95,${0.34 * lit}) 46%, rgba(240,180,95,0) 74%)`,
        filter: 'blur(16px)',
        mixBlendMode: 'screen',
      }}
    />
  </>
);

export const ProtoTurn: React.FC = () => {
  const f = useCurrentFrame();
  const on = lampOn(f);
  const {x, y} = spotAt(f);
  // Card: iris opens out-cubic while the cone fades LINEAR — the two are decoupled on purpose.
  const iris = ramp(f, SWING_END, IRIS_END - SWING_END, outCubic);
  const coneFade = 1 - 0.7 * ramp(f, SWING_END, IRIS_END - SWING_END, EASE.linear);
  const radius = mix(R0, 1180, iris); // card: 360→1080; widened so it opens onto the still life
  const ry = mix(R0 * 0.92, 820, iris);
  const spotMask = `radial-gradient(ellipse ${radius.toFixed(1)}px ${ry.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, #000 0%, rgba(0,0,0,0.96) 54%, rgba(0,0,0,0.45) 78%, transparent 100%)`;
  const maskStyle: React.CSSProperties = {WebkitMaskImage: spotMask, maskImage: spotMask};

  return (
    <AbsoluteFill style={{background: PAL.night0, overflow: 'hidden'}}>
      <BKYDFonts />

      {/* the always-on dark copy — card 命门 "暗版 0.07 常驻"; above 0.15 there is no "lighting up" */}
      <div style={{position: 'absolute', inset: 0, opacity: 0.07}}>
        <Doorway lit={0} />
      </div>

      {/* the lit copy, revealed by the swinging spot */}
      <div style={{position: 'absolute', inset: 0, opacity: on, ...maskStyle}}>
        <Doorway lit={1} />
      </div>

      {/* the light pool on the wall + its reflection on the table */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: on * coneFade,
          mixBlendMode: 'screen',
          background: `radial-gradient(ellipse ${(radius * 1.15).toFixed(0)}px ${(ry * 1.1).toFixed(0)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, rgba(255,226,180,0.26) 0%, rgba(240,180,95,0.10) 48%, rgba(240,180,95,0) 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1440,
          height: 260,
          opacity: on * coneFade * 0.8,
          mixBlendMode: 'screen',
          background: `radial-gradient(ellipse ${(radius * 1.0).toFixed(0)}px 110px at ${x.toFixed(1)}px 1470px, rgba(240,180,95,0.26) 0%, rgba(240,180,95,0) 74%)`,
        }}
      />

      <Caption lines={['Vai người khác chùng xuống.', 'Còn bạn thì đứng ngoài.']} />
      <NightGrade warm={on * 0.55} strength={0.3} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ProtoEnd — card: typography/blur-slide · style-key: blur-slide
// demo: demos/typography/blur-slide/BlurSlide.tsx
// The silent END card: the owner's title line, two elements, verbatim, 3.2 s.
// ═══════════════════════════════════════════════════════════════════════════════

const LINE_A = 'Bạn không yếu đuối,';
const LINE_B = 'bạn chỉ đã mạnh mẽ quá lâu.';

/** Card 命门: opacity / translateY / blur all ride the SAME p and the SAME ease. */
const Words: React.FC<{
  line: string;
  start: number;
  dy: number;
  blur: number;
  fontSize: number;
  color: string;
}> = ({line, start, dy, blur, fontSize, color}) => {
  const f = useCurrentFrame();
  const words = line.split(' ');
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        gap: Math.round(fontSize * 0.2),
        whiteSpace: 'nowrap',
      }}
    >
      {words.map((w, i) => {
        const p = ramp(f, start + i * 3, 16, EASE.out);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: p,
              transform: `translateY(${((1 - p) * dy).toFixed(2)}px)`,
              filter: p >= 0.999 ? undefined : `blur(${((1 - p) * blur).toFixed(2)}px)`,
              fontFamily: FONT.serif,
              fontWeight: 700,
              fontSize,
              lineHeight: 1.16,
              letterSpacing: '-0.012em',
              color,
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};

export const ProtoEnd: React.FC = () => {
  const f = useCurrentFrame();
  // The whole card breathes in one slow push (card: "文字层全程极缓推近 1→1.03").
  const push = 1 + 0.03 * ramp(f, 0, END_DUR - 1, EASE.smooth);
  // Measured once with the loaded VN serif, so neither line can overflow 900 px.
  const {fontSize} = fitFontSize({
    text: LINE_B,
    maxWidth: 880,
    maxLines: 1,
    fontFamily: FONT.serif,
    fontWeight: 700,
    minFontSize: 54,
    maxFontSize: 70,
  });
  const dy = fontSize * 0.38; // card's 64px @ 170px type, scaled to this card's size
  const blur = fontSize * 0.12; // card's 18px, and the card's own ~12%-of-type ceiling

  return (
    <AbsoluteFill style={{background: PAL.night0, overflow: 'hidden'}}>
      <BKYDFonts />
      {/* the frame keeps breathing: rain thinning, the lamp steady, the rim tilted back over her */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${push.toFixed(5)})`,
          transformOrigin: '50% 46%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, #1C2C38 0%, #2A3E4B 46%, #374C5B 100%)`,
            opacity: 1,
          }}
        />
        <SodiumLamp x={-236} y={-40} />
        <LitWindow x={892} y={392} w={86} h={106} warm={1} />
        <WetPavement y={1640} warm={1} rain={0.14} />
        <Child x={KID.x - 168} y={KID.y + 250} s={KID.s * 0.8} headTilt={4} edge={0.4} />
        {/* the umbrella tilted BACK over her shoulder — the CP2 polarity closes inverted-to-right */}
        <Umbrella
          cx={CANOPY.cx - 10}
          rimY={CANOPY.rimY - 10}
          w={CANOPY.w}
          h={CANOPY.h}
          tilt={8}
          open
          bead={1}
          warm={1}
          shaft={HANDLE_Y - CANOPY.rimY}
        />
        <Figure
          x={SHE.x + 10}
          y={SHE.y + 30}
          s={SHE.s * 0.92}
          wetness={0.82}
          rim={1}
          edge={0.5}
          umbrella
        />
        {/* the warm cup set down beside the phone, and the phone still showing the missed call */}
        <div
          style={{
            position: 'absolute',
            left: 556,
            top: 1470,
            width: 54,
            height: 46,
            borderRadius: 6,
            background: PAL.amber,
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 646,
            top: 1482,
            width: 92,
            height: 168,
            borderRadius: 14,
            background: PAL.screen,
            opacity: 0.34,
            boxShadow: '0 0 40px rgba(156,192,220,0.3)',
          }}
        />
        <Rain count={16} opacity={0.14} seed={9} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, rgba(8,16,24,0.42) 0%, rgba(8,16,24,0.18) 42%, rgba(8,16,24,0.52) 100%)`,
        }}
      />

      {/* the owner's title line, two elements, verbatim, stacked, in the ONE serif of the film */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 792, textAlign: 'center'}}>
        <Words line={LINE_A} start={2} dy={dy} blur={blur} fontSize={fontSize} color={PAL.grey3} />
        <div style={{height: Math.round(fontSize * 0.2)}} />
        <Words
          line={LINE_B}
          start={33}
          dy={dy}
          blur={blur}
          fontSize={fontSize}
          color={PAL.amberHot}
        />
      </div>

      <NightGrade warm={1} strength={0.3} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BoardTile — one low-fi storyboard frame per shot row of script.md §3.
// Composition, staging, key prop, caption position and the light state only.
// ═══════════════════════════════════════════════════════════════════════════════

type ShotId =
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

const BOARD: Record<
  ShotId,
  {card: string; light: string; note: string; amber: number; cap: boolean}
> = {
  s1: {
    card: 'multiplane',
    light: 'L0',
    note: 'umbrella tilted to the child · wet sleeve · push-in 1.00→1.03',
    amber: 0,
    cap: true,
  },
  s2a: {
    card: 'spotlight-sweep',
    light: 'L0',
    note: 'doorway, still dark · two glasses on the table',
    amber: 0,
    cap: true,
  },
  a1: {
    card: 'spotlight-sweep',
    light: 'L1',
    note: 'THE one arrival · sliver on the collar edge',
    amber: 1,
    cap: true,
  },
  s2b: {
    card: 'spotlight-sweep',
    light: 'L1',
    note: 'pulled back a step · she half-turns to the hall',
    amber: 0.45,
    cap: true,
  },
  s3: {
    card: 'corner-spotlight-reveal',
    light: 'L0',
    note: 'screen glow only · furled umbrella dripping',
    amber: 0,
    cap: true,
  },
  a2: {
    card: 'glow-orb-ambient',
    light: 'L0',
    note: 'rain on glass · the lamp broken into dots',
    amber: 0,
    cap: true,
  },
  s4: {
    card: 'glass-pill-dictation-typing',
    light: 'L0',
    note: 'over-the-shoulder · cursor first, then the words',
    amber: 0,
    cap: true,
  },
  s5: {
    card: 'error-retype',
    light: 'L0',
    note: 'knees up · the room is very dark',
    amber: 0,
    cap: true,
  },
  img1: {
    card: 'error-retype',
    light: 'L0',
    note: 'backspace, one by one · phone turned face-down',
    amber: 0,
    cap: false,
  },
  s6: {
    card: 'hashtag-to-pill-materialize',
    light: 'L0',
    note: 'saved name · one ring · not answered',
    amber: 0,
    cap: true,
  },
  s7: {
    card: 'sheen-sweep',
    light: 'L2',
    note: 'furled umbrella in her lap · not opened',
    amber: 0.5,
    cap: true,
  },
  s8: {
    card: 'sheen-sweep',
    light: 'L2',
    note: 'hands on the closed umbrella · the room is still',
    amber: 0.5,
    cap: false,
  },
  s9: {
    card: 'theme-sweep-toggle',
    light: 'L3',
    note: 'the palette turns · the wet patch spreads',
    amber: 1,
    cap: true,
  },
  img2: {
    card: 'theme-sweep-toggle',
    light: 'L3',
    note: 'the tilt completes · the child stays dry',
    amber: 1,
    cap: false,
  },
  s10: {
    card: 'bullet-time-freeze-orbit',
    light: 'L4',
    note: 'the cup is set down · the rim tilts back',
    amber: 1,
    cap: true,
  },
  END: {
    card: 'blur-slide',
    light: 'L4',
    note: 'silent title card · owner wording verbatim',
    amber: 1,
    cap: false,
  },
};

const ORDER: readonly ShotId[] = [
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

export const BoardTile: React.FC<{shot?: ShotId}> = ({shot = 's1'}) => {
  const id: ShotId = shot;
  const s = BOARD[id];
  const INDOOR: readonly ShotId[] = [
    's2a',
    'a1',
    's2b',
    's3',
    's4',
    's5',
    'img1',
    's6',
    's7',
    's8',
    'END',
    'a2',
  ];
  const indoor = INDOOR.includes(id);
  const wettest = id === 's9' || id === 'img2' || id === 's10';
  const furled = id === 's7' || id === 's8';
  const tilt = id === 's9' ? -2 : id === 'img2' ? 7 : id === 's10' ? 9 : -5.5;
  const screenShot = id === 's3' || id === 's4' || id === 's5' || id === 'img1' || id === 's6';
  return (
    <AbsoluteFill style={{background: PAL.night0, overflow: 'hidden'}}>
      <BKYDFonts />
      {indoor ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, ${PAL.night0} 0%, ${PAL.night1} 70%, ${PAL.night2} 100%)`,
          }}
        />
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg, ${PAL.night0} 0%, ${PAL.night1} 60%, ${PAL.night2} 100%)`,
            }}
          />
          <SodiumLamp x={-70} y={300} />
          <LitWindow x={856} y={700} w={70} h={88} warm={s.amber} />
          <WetPavement y={GROUND} warm={s.amber} />
          <Child x={KID.x} y={KID.y} s={KID.s} headTilt={5} edge={0.7} />
          <Figure
            x={SHE.x}
            y={SHE.y}
            s={SHE.s}
            wetness={wettest ? 0.9 : 0.62}
            rim={s.amber}
            edge={0.7}
            umbrella
          />
          <Umbrella
            cx={CANOPY.cx}
            rimY={CANOPY.rimY}
            w={CANOPY.w}
            h={CANOPY.h}
            tilt={tilt}
            open={!furled}
            bead={1}
            warm={s.amber}
            shaft={HANDLE_Y - CANOPY.rimY}
          />
        </>
      )}
      {indoor && (
        <>
          {id === 'a2' ? (
            <>
              {/* a2 is the WINDOW, not a doorway: rain on the glass, the sodium lamp broken
                  into moving dots on the water, her head only a dark shape at the frame edge. */}
              <div
                style={{
                  position: 'absolute',
                  left: 96,
                  top: 200,
                  width: 880,
                  height: 1160,
                  borderRadius: 8,
                  background: 'linear-gradient(170deg,#1D3344,#0C1922)',
                  border: '12px solid #2C4553',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 96,
                  top: 200,
                  width: 880,
                  height: 1160,
                  borderRadius: 8,
                  background:
                    'repeating-linear-gradient(76deg, rgba(220,227,234,0) 0px, rgba(220,227,234,0.16) 3px, rgba(220,227,234,0) 8px)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 180,
                  top: 430,
                  width: 700,
                  height: 700,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${PAL.sodium} 0%, rgba(196,154,107,0.2) 44%, rgba(196,154,107,0) 74%)`,
                  opacity: 0.85,
                }}
              />
              {Array.from({length: 20}).map((_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 220 + hash(31, i) * 600,
                    top: 470 + hash(32, i) * 600,
                    width: 14 + hash(33, i) * 18,
                    height: 14 + hash(33, i) * 18,
                    borderRadius: 11,
                    background: PAL.sodium,
                    opacity: 0.32 + 0.42 * hash(34, i),
                  }}
                />
              ))}
              <Figure x={930} y={430} s={1.3} wetness={0.5} screen={0.55} />
            </>
          ) : (
            <div
              style={{
                position: 'absolute',
                left: 512,
                top: 250,
                width: 300,
                height: 780,
                borderRadius: 6,
                background: PAL.night2,
                border: `2px solid ${PAL.night3}`,
                opacity: 0.6,
              }}
            />
          )}
          <DoorwaySliver x={806} y={250} w={150} h={780} amount={s.amber} />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 1420,
              height: 26,
              background: PAL.night3,
              opacity: 0.8,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 246,
              top: 1300,
              width: 118,
              height: 122,
              borderRadius: 10,
              border: `3px solid ${PAL.grey2}`,
              opacity: 0.8,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 5,
                right: 5,
                top: 46,
                bottom: 5,
                borderRadius: 6,
                background: PAL.sheen,
                opacity: 0.42,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 700,
              top: 1300,
              width: 118,
              height: 122,
              borderRadius: 10,
              border: `3px solid #C2CFD8`,
              opacity: 0.9,
            }}
          />
          <Figure
            x={640}
            y={300}
            s={1.62}
            wetness={0.5}
            rim={s.amber}
            screen={screenShot ? 1 : 0}
          />
          {/* the phone, and the input box that s4 / img1 / s6 all live inside */}
          <div
            style={{
              position: 'absolute',
              left: 300,
              top: 1240,
              width: 300,
              height: 170,
              borderRadius: 16,
              background: PAL.screen,
              opacity: screenShot ? 0.3 : 0.12,
            }}
          />
          {id === 's6' ? <MinhHoa x={318} y={1180} /> : null}
        </>
      )}

      {/* low-fi caption marker — always the same band, never below 1710 */}
      {s.cap && (
        <div
          style={{
            position: 'absolute',
            left: 90,
            right: 90,
            bottom: 220,
            height: 90,
            borderRadius: 12,
            border: '2px dashed rgba(167,180,190,0.45)',
            background: 'rgba(4,9,15,0.42)',
          }}
        />
      )}

      {/* shot id + card name + the light state */}
      <div
        style={{
          position: 'absolute',
          left: 54,
          top: 60,
          fontFamily: FONT.sans,
          fontWeight: 600,
          fontSize: 56,
          color: PAL.amberHot,
          letterSpacing: '0.02em',
        }}
      >
        {id.toUpperCase()}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 54,
          top: 132,
          fontFamily: FONT.sans,
          fontWeight: 600,
          fontSize: 36,
          color: PAL.grey1,
        }}
      >
        {s.card} · {s.light}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 54,
          right: 54,
          bottom: 220,
          fontFamily: FONT.sans,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.3,
          color: PAL.grey1,
        }}
      >
        {s.note}
      </div>
    </AbsoluteFill>
  );
};
