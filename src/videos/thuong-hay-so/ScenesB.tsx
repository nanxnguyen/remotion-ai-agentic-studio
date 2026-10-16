// ScenesB — scene-agent-2: s4 (speed-ramp-freeze/freeze-annotate), s5 + s6
// (transition-hidden-cut: light-leak-burn + invisible-cut).
//
// s5/s6 share ONE staging (STAGE + StagingTable) = one contrast device, replayed
// beat-for-beat; only the grade + one action change. Motion is easeInOutSine
// everywhere (E_SINE); thaw uses the card's smootherstep remap (no overshoot).
// Frame-driven only. 9:16 1080x1920.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, Grain, mix, ramp} from './lib/motion';
import {
  BLUE,
  Bowl,
  CAP,
  Cooker,
  DUSK1,
  DUSK2,
  Finish,
  GREEN,
  GREEN_LT,
  HAIR,
  HandChop,
  Headline,
  INK,
  MinhHoa,
  PAPER,
  PILL,
  RED,
  SHIRT,
  SKIN,
  STICK1,
  STICK2,
  ThoFonts,
  ThoLine,
} from './kit';

export const S4_DUR = 171; // s4a 43 + gap 9 + s4b 119
export const S5_DUR = 174;
export const S6_DUR = 277; // s6a 134 + gap 12 + s6b 131

export const SceneS4_DEFAULTS = {
  capA: 'Đang nhặt dở, mình khựng lại.',
  capB: 'Lần đầu tiên, mình tự hỏi: nhặt vì người ấy, hay vì mình?',
  question: 'Vì người ấy, hay vì mình?',
};
export const SceneS5_DEFAULTS = {
  tag: 'vì thương',
  cap: 'Có những tối, mình nhặt hành vì nhớ người ấy ghét hành. Nghe tiếng chìa khoá, mình chạy ra mở cửa.',
};
export const SceneS6_DEFAULTS = {
  tag: 'vì sợ',
  capA: 'Có những tối, mình nhặt hành vì quen tay. Nghe tiếng chìa khoá, mình thở phào.',
  capB: 'Vậy là, chưa phải bắt đầu lại. Chưa phải học xem một người mới ghét gì.',
};

// ---------------------------------------------------------------- shared staging (s5 + s6 replay)
// One top-down table tableau. Geometry constants are shared so the s6 replay
// lands pixel-identical; only wash + hand clock differ.
const STAGE = {
  bowlX: 360,
  bowlY: 860,
  bowlS: 1.35,
  ownX: 110,
  ownY: 1360,
  ownS: 1.0,
  dishX: 730,
  dishY: 1150,
  handX: 590,
  handY: 380,
  handS: 1.15,
};

const Dish: React.FC<{x: number; y: number; n?: number}> = ({x, y, n = 4}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 190,
      height: 110,
      borderRadius: '50%',
      background: '#DDE3E1',
      boxShadow: '0 14px 36px rgba(20,15,35,.35)',
    }}
  >
    {Array.from({length: n}, (_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: 22 + i * 34,
          top: 28 + (i % 2) * 14,
          width: 46,
          height: 12,
          borderRadius: 6,
          background: i % 2 ? GREEN : GREEN_LT,
          transform: `rotate(${-14 + i * 11}deg)`,
          boxShadow: '0 2px 5px rgba(40,70,40,.4)',
        }}
      />
    ))}
  </div>
);

const StagingTable: React.FC<{
  wash: string;
  handX: number;
  handY: number;
  handAngle?: number;
  steam?: number;
}> = ({wash, handX, handY, handAngle = 18, steam = 0.7}) => (
  <div style={{position: 'absolute', inset: 0}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, #CBD1D6 0%, #B4BBC0 55%, #9AA2A8 100%)',
      }}
    />
    {[240, 640, 1040, 1440, 1780].map((y) => (
      <div
        key={y}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: y,
          height: 3,
          background: 'rgba(255,255,255,.28)',
        }}
      />
    ))}
    <Cooker x={36} y={110} s={0.7} steam={steam} />
    <Bowl x={STAGE.bowlX} y={STAGE.bowlY} s={STAGE.bowlS} scallions={4} steam={steam} />
    <Bowl x={STAGE.ownX} y={STAGE.ownY} s={STAGE.ownS} scallions={5} sticksAcross steam={0.5} />
    <Dish x={STAGE.dishX} y={STAGE.dishY} />
    <HandChop x={handX} y={handY} s={STAGE.handS} angle={handAngle} strand />
    <div style={{position: 'absolute', inset: 0, background: wash}} />
  </div>
);

const Tag: React.FC<{text: string; color: string; enter: number; top?: number}> = ({
  text,
  color,
  enter,
  top = 420,
}) => {
  const f = useCurrentFrame();
  const e = ramp(f, enter, 12, E_SINE);
  return (
    <div
      style={{
        position: 'absolute',
        left: 90,
        top,
        opacity: e,
        transform: `translateY(${(1 - e) * 16}px)`,
        fontFamily: CAP,
        fontWeight: 700,
        fontSize: 40,
        color,
        background: PILL,
        padding: '12px 26px',
        borderRadius: 20,
        boxShadow: '0 10px 30px rgba(20,15,35,.4)',
      }}
    >
      {text}
    </div>
  );
};

// ---------------------------------------------------------------- s4: freeze re-hook
// FreezeAnnotateReal mechanics kept: slope-0 instant freeze (no ease-in),
// circle-draw annotation, smootherstep thaw with slope>1 time make-up, hold.
// Deviations (D2): no viewfinder chrome, no white flash, no timecode — pause is
// read from the hum cut + still-breathing LED. Circle replaces marker pen.
const S4_FREEZE = 30;
const S4_THAW = 66;
const S4_LAND = 92;
const S4_MAKEUP = 26; // frozen src frames repaid during thaw (avg slope > 1)
const smoother = (t: number) => {
  const c = t < 0 ? 0 : t > 1 ? 1 : t;
  return c * c * c * (c * (c * 6 - 15) + 10);
};
const s4SrcAt = (f: number): number => {
  if (f <= S4_FREEZE) return Math.max(0, f);
  if (f <= S4_THAW) return S4_FREEZE;
  return S4_FREEZE + S4_MAKEUP * smoother((f - S4_THAW) / (S4_LAND - S4_THAW));
};

export const SceneS4: React.FC<{duration?: number}> = () => {
  const f = useCurrentFrame();
  const src = s4SrcAt(f);
  const frozen = f >= S4_FREEZE && f < S4_THAW;
  void frozen;
  // Chopsticks descend toward the bowl on the src clock (stalls to slope 0),
  // then settle lower after the thaw so the question reads clear.
  const descend = E_SINE(Math.min(1, Math.max(0, src / 56)));
  const chopY = mix(-40, 34, descend) + 350 * ramp(f, S4_LAND, 50, E_SINE);
  const chopRot = mix(7, 0, descend);
  // Strand tip tracked from the sticks, so the circle sits on it even mid-thaw
  // (static during freeze since src is frozen).
  const rotRad = (chopRot * Math.PI) / 180;
  const strandCX = 470 + 33 - 700 * Math.sin(rotRad);
  const strandCY = 260 + chopY + 700;
  // Steam + strand sway run on the same clock, so they hang mid-air in freeze.
  const wisps = [0, 1].map((i) => {
    const ph = (((src / 70 + i * 0.5) % 1) + 1) % 1;
    return {ph, i};
  });
  const strandRot = 8 + Math.sin(src / 9) * 4;
  // Circle annotation draws around the gripped strand, fades after thaw.
  const draw = ramp(f, S4_FREEZE + 4, 12, E_SINE);
  const inkFade = 1 - ramp(f, 96, 12, E_SINE);
  const capAOp = 1 - ramp(f, 44, 8, E_SINE);
  return (
    <AbsoluteFill style={{background: INK, overflow: 'hidden'}}>
      <ThoFonts />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #241E36 0%, #3A2C48 55%, #2A2038 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(560px 520px at 540px 1050px, rgba(255,122,72,.20), rgba(255,122,72,0) 70%)',
        }}
      />
      {/* macro bowl, soft and low */}
      <div style={{position: 'absolute', inset: 0, filter: 'blur(1px)'}}>
        <Bowl x={200} y={1180} s={1.9} scallions={4} steam={0} />
      </div>
      {wisps.map((w) => (
        <div
          key={w.i}
          style={{
            position: 'absolute',
            left: 430 + w.i * 130,
            top: 900 - w.ph * 260,
            width: 90,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(247,245,250,.5), rgba(247,245,250,0) 70%)',
            opacity: (1 - w.ph) * 0.55,
          }}
        />
      ))}
      {/* frozen chopsticks gripping one strand */}
      <div
        style={{
          position: 'absolute',
          left: 470,
          top: 260 + chopY,
          transform: `rotate(${chopRot}deg)`,
          transformOrigin: '50% 0%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 15,
            height: 700,
            borderRadius: 8,
            background: STICK1,
            boxShadow: '0 14px 40px rgba(0,0,0,.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 34,
            top: 0,
            width: 15,
            height: 700,
            borderRadius: 8,
            background: STICK2,
            boxShadow: '0 14px 40px rgba(0,0,0,.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -22,
            top: 690,
            width: 110,
            height: 24,
            borderRadius: 12,
            background: GREEN,
            transform: `rotate(${strandRot}deg)`,
            boxShadow: '0 4px 12px rgba(40,70,40,.6)',
          }}
        />
      </div>
      {/* circle annotation around the strand */}
      {draw > 0 && inkFade > 0.001 && (
        <svg
          width={1080}
          height={1920}
          style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
        >
          <ellipse
            cx={strandCX}
            cy={strandCY}
            rx={155}
            ry={115}
            fill="none"
            stroke={PAPER}
            strokeWidth={10}
            strokeLinecap="round"
            opacity={0.92 * inkFade}
            strokeDasharray={1120}
            strokeDashoffset={1120 * (1 - draw)}
            transform={`rotate(-4 ${strandCX} ${strandCY})`}
          />
        </svg>
      )}
      {/* LED keeps breathing through the freeze (habit unchanged) */}
      <Cooker x={70} y={100} s={0.5} steam={0} />
      <div
        style={{
          position: 'absolute',
          left: 95,
          top: 10,
          width: 60,
          height: 110,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(247,245,250,.4), rgba(247,245,250,0) 70%)',
        }}
      />
      <Headline top={300} size={80} enter={88} lines={[[{t: 'Vì người ấy, hay vì mình?'}]]} />
      {capAOp > 0.001 && (
        <div style={{opacity: capAOp}}>
          <ThoLine text={SceneS4_DEFAULTS.capA} size={56} enter={2} />
        </div>
      )}
      {f >= 58 && <ThoLine text={SceneS4_DEFAULTS.capB} size={54} enter={58} />}
      <Finish />
      <Grain opacity={0.06} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- s5: contrast A (warm)
// LightLeakBurn mechanics kept: leak climbs along a diagonal in 3 warm tones,
// peak frame hides a hard cut (table -> door), leak recedes over the new scene.
// The leak IS the shot's single glint (Q4). Rise uses E_SINE (video discipline;
// demo's ease-in would overshoot the sine-only rule — visual equivalent here).
const S5_PEAK = 130;
const S5_LEAK_START = 100;

const LeakLayer: React.FC<{intensity: number; cx: number; cy: number}> = ({intensity, cx, cy}) => {
  if (intensity <= 0.003) return null;
  const core = Math.pow(intensity, 3);
  const blobs = [
    {d: 2600, c: '#c2311a', a: 0.6, o: 300},
    {d: 2000, c: '#ff5a1f', a: 0.8, o: 130},
    {d: 1500, c: '#ffb347', a: 0.95, o: 0},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          mixBlendMode: 'screen',
          opacity: intensity,
          background:
            'linear-gradient(210deg, rgba(255,179,71,.9) 0%, rgba(255,90,31,.55) 16%, rgba(194,49,26,.2) 32%, rgba(0,0,0,0) 48%)',
        }}
      />
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: cx - b.d / 2 + b.o * 0.8,
            top: cy - b.d / 2.7 - b.o * 0.6,
            width: b.d,
            height: b.d / 1.35,
            borderRadius: '50%',
            transform: 'rotate(-34deg)',
            mixBlendMode: 'screen',
            opacity: b.a * intensity,
            background: `radial-gradient(closest-side, ${b.c} 0%, ${b.c} 65%, rgba(0,0,0,0) 100%)`,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: cx - 950,
          top: cy - 620,
          width: 1900,
          height: 1240,
          borderRadius: '50%',
          transform: 'rotate(-34deg)',
          mixBlendMode: 'screen',
          opacity: core,
          background:
            'radial-gradient(closest-side, #fff6e6 0%, rgba(255,236,200,.9) 40%, rgba(255,200,130,0) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#ff9a4a',
          mixBlendMode: 'screen',
          opacity: 0.4 * intensity * intensity,
        }}
      />
    </div>
  );
};

const DoorScene: React.FC<{f: number}> = ({f}) => {
  const zoom = mix(1.04, 1, ramp(f, S5_PEAK, 44, E_SINE));
  return (
    <div style={{position: 'absolute', inset: -60, transform: `scale(${zoom})`}}>
      <div style={{position: 'absolute', inset: 0, background: '#171221'}} />
      {/* open door: dusk floods in */}
      <div
        style={{
          position: 'absolute',
          left: 190,
          top: 480,
          width: 700,
          height: 1050,
          borderRadius: 24,
          overflow: 'hidden',
          border: '12px solid #2E2838',
          background: `linear-gradient(180deg, ${DUSK1} 0%, #6B4A8C 42%, ${DUSK2} 76%, #F2B57E 100%)`,
          boxShadow: '0 0 120px rgba(255,150,100,.55)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 380,
            top: 560,
            width: 220,
            height: 150,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,220,180,.9), rgba(255,220,180,0) 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 220,
            background: 'rgba(35,25,55,.45)',
          }}
        />
        {/* partner silhouette with keys, backlit */}
        <div style={{position: 'absolute', left: 250, top: 560, width: 200, height: 480}}>
          <div
            style={{
              position: 'absolute',
              left: 30,
              top: 200,
              width: 140,
              height: 280,
              borderRadius: 55,
              background: `linear-gradient(180deg, ${SHIRT}, #3E4A63)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 55,
              top: 120,
              width: 90,
              height: 95,
              borderRadius: 42,
              background: SKIN,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 48,
              top: 88,
              width: 104,
              height: 66,
              borderRadius: 32,
              background: '#1B1626',
            }}
          />
          {/* raised hand holding keys (matte, no glow — the leak is the glint) */}
          <div
            style={{
              position: 'absolute',
              left: 150,
              top: 240,
              width: 34,
              height: 110,
              borderRadius: 16,
              background: SKIN,
              transform: 'rotate(-18deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 176,
              top: 330,
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '7px solid #8E979C',
            }}
          />
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 186 + i * 14,
                top: 364,
                width: 9,
                height: 44,
                background: '#8E979C',
              }}
            />
          ))}
        </div>
        {/* warm spill on the floor */}
        <div
          style={{
            position: 'absolute',
            left: -60,
            right: -60,
            bottom: -40,
            height: 300,
            background:
              'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,180,120,.5), rgba(255,180,120,0) 70%)',
          }}
        />
      </div>
      {/* dark jambs frame the doorway */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 190,
          background: '#14101E',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 190,
          background: '#14101E',
        }}
      />
    </div>
  );
};

export const SceneS5: React.FC<{duration?: number}> = () => {
  const f = useCurrentFrame();
  const door = f > S5_PEAK;
  // Hand picks quickly, then puts the sticks down at the keys cue (~108).
  const putDown = ramp(f, 106, 18, E_SINE);
  const bob = Math.sin(f / 10) * 12 * (1 - putDown);
  const handX = STAGE.handX + 180 * putDown;
  const handY = STAGE.handY + 320 * putDown + bob;
  const warm = 0.3 + 0.18 * ramp(f, 30, 40, E_SINE);
  const intensity =
    f <= S5_PEAK
      ? ramp(f, S5_LEAK_START, S5_PEAK - S5_LEAK_START, E_SINE)
      : 1 - ramp(f, S5_PEAK, 40, E_SINE);
  const sweep = ramp(f, S5_LEAK_START, 70, E_SINE);
  const cx = mix(1400, -350, sweep);
  const cy = mix(-300, 2200, sweep);
  const tableZoom = mix(1, 1.02, ramp(f, 0, 100, E_SINE));
  const burn =
    intensity > 0.01
      ? `brightness(${(1 + intensity * 0.85).toFixed(3)}) contrast(${(1 - intensity * 0.5).toFixed(3)}) saturate(${(1 - intensity * 0.25).toFixed(3)})`
      : undefined;
  return (
    <AbsoluteFill style={{background: INK, overflow: 'hidden'}}>
      <ThoFonts />
      {!door && (
        <div
          style={{position: 'absolute', inset: -60, transform: `scale(${tableZoom})`, filter: burn}}
        >
          <StagingTable
            wash={`rgba(255,90,54,${warm.toFixed(3)})`}
            handX={handX}
            handY={handY}
            steam={0.8}
          />
        </div>
      )}
      {door && <DoorScene f={f} />}
      <LeakLayer intensity={intensity} cx={cx} cy={cy} />
      <Tag text={SceneS5_DEFAULTS.tag} color={RED} enter={6} />
      <ThoLine text={SceneS5_DEFAULTS.cap} size={54} enter={4} />
      <Finish />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- s6: contrast B (cold)
// InvisibleCut mechanics kept: a near-lens blurred occluder with a solid core
// wider than the frame sweeps through; the hard cut (warm -> cold replay)
// lands on the frame where the core truly covers 1080px (CUT=10). After the
// cut the B side eases back to rest. Here the "occluder" is the 12f rewind
// blur itself: horizontal streaks + steel band.
const S6_CUT = 10;
const S6_SW0 = 2;
const S6_SW1 = 18;
const S6_CORE = 1500; // > 1080: guarantees a real full-cover window
const S6_SOFT = 180;
const S6_GAP0 = 134; // 12f exhale gap: no voice, held pose, SFX lives here
const S6B0 = 146;
const S6_INSERT = 108; // rel s6b: strange-chopsticks insert, 18f dissolve
const S6_INSERT_DUR = 18;

const s6BandX = (f: number) => mix(1100, -1600, ramp(f, S6_SW0, S6_SW1 - S6_SW0, E_SINE));

const RewindBand: React.FC<{f: number}> = ({f}) => {
  const sweeping = f >= S6_SW0 && f <= S6_SW1;
  if (!sweeping) return null;
  const x = s6BandX(f);
  const cover =
    ramp(f, S6_SW0, S6_CUT - S6_SW0, E_SINE) * (1 - ramp(f, S6_CUT, S6_SW1 - S6_CUT, E_SINE));
  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      {/* rewind streaks across the frame */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: -40,
            right: -40,
            top: 700 + i * 120,
            height: 30,
            borderRadius: 15,
            background: 'rgba(247,245,250,.30)',
            transform: 'skewX(-14deg)',
            opacity: 0.8 * cover,
          }}
        />
      ))}
      {/* soft lead shadow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: x - 500,
          width: 500 + S6_SOFT,
          background:
            'linear-gradient(90deg, rgba(30,36,52,0) 0px, rgba(30,36,52,.38) 500px, rgba(30,36,52,.5) 100%)',
        }}
      />
      {/* blurred steel occluder: soft edges + solid core + cold rim light */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          bottom: -40,
          left: x,
          width: S6_CORE + S6_SOFT * 2,
          background: `linear-gradient(90deg, rgba(48,56,76,0) 0px, rgba(48,56,76,.85) ${S6_SOFT * 0.6}px, #30384C ${S6_SOFT}px, #272E40 ${S6_SOFT + S6_CORE}px, rgba(39,46,64,.8) ${S6_SOFT + S6_CORE + S6_SOFT * 0.4}px, rgba(39,46,64,0) ${S6_CORE + S6_SOFT * 2}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: S6_SOFT * 0.35,
            width: 200,
            background:
              'linear-gradient(90deg, rgba(157,180,255,0) 0%, rgba(157,180,255,.40) 45%, rgba(157,180,255,0) 100%)',
          }}
        />
      </div>
    </div>
  );
};

// Strange-chopsticks insert (E-T2): ONLY strange sticks + strange bowl, heavy
// blur, no hands, no face, no human features. Dissolve 18f, labelled minh hoa.
const StrangeInsert: React.FC<{r: number}> = ({r}) => {
  const op = ramp(r, S6_INSERT, 6, E_SINE) * (1 - ramp(r, S6_INSERT + 12, 6, E_SINE));
  if (op <= 0.001) return null;
  return (
    <div style={{position: 'absolute', left: 140, right: 140, top: 560, opacity: op}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          top: 0,
          height: 480,
          borderRadius: 36,
          overflow: 'hidden',
          background: 'rgba(38,44,62,.92)',
          filter: 'blur(12px)',
          border: '2px solid rgba(157,180,255,.35)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 180,
            top: 190,
            width: 440,
            height: 220,
            borderRadius: '50%',
            background: '#7E8CA3',
            border: '20px solid #5A6579',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 230,
            width: 320,
            height: 140,
            borderRadius: '50%',
            background: '#A9B4C6',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 330,
            top: 60,
            width: 16,
            height: 360,
            borderRadius: 8,
            background: '#4A3320',
            transform: 'rotate(9deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 372,
            top: 60,
            width: 16,
            height: 360,
            borderRadius: 8,
            background: '#3A2818',
            transform: 'rotate(13deg)',
          }}
        />
        <div style={{position: 'absolute', inset: 0, background: 'rgba(157,180,255,.22)'}} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: -70,
          display: 'flex',
          justifyContent: 'center',
          opacity: op,
        }}
      >
        <div
          style={{
            fontFamily: CAP,
            fontWeight: 600,
            fontSize: 32,
            color: '#C9CFE0',
            background: 'rgba(42,34,56,.8)',
            padding: '8px 20px',
            borderRadius: 14,
            border: '1px solid rgba(157,180,255,.35)',
          }}
        >
          minh hoạ
        </div>
      </div>
    </div>
  );
};

// Seated shoulder foreground (s6): bleeds off the frame's lower edge + cold rim
// so it reads as a body, not a prop. Sinks on the exhale.
const Shoulder: React.FC<{top: number}> = ({top}) => (
  <div
    style={{
      position: 'absolute',
      left: 600,
      top,
      width: 440,
      height: 320,
      borderRadius: 150,
      background: 'linear-gradient(180deg, #B4A88F, #7E7268)',
      boxShadow: '0 -18px 50px rgba(20,15,35,.4), inset 0 8px 0 rgba(157,180,255,.45)',
    }}
  />
);

export const SceneS6: React.FC<{duration?: number}> = () => {
  const f = useCurrentFrame();
  const cold = f >= S6_CUT;
  // Replay clock: identical pick motion to s5's table phase, then stillness.
  const fr = Math.min(f, S6_GAP0);
  const r = Math.max(0, fr - S6_SW1);
  const still = ramp(fr, 108, 14, E_SINE);
  const bob = Math.sin(r / 10) * 12 * (1 - still);
  const handY = STAGE.handY + 40 + bob;
  // Seated shoulder lowers with the exhale; extra 8px sinks into the gap.
  const drop = 26 * ramp(fr, 108, 30, E_SINE) + 8 * ramp(f, S6_GAP0, 12, E_SINE);
  const partnerOp = 0.55 * ramp(f, 96, 30, E_SINE);
  const wash = cold ? 'rgba(157,180,255,0.38)' : 'rgba(255,90,54,0.30)';
  const zoom = mix(1, 1.02, ramp(f, S6_SW1, 100, E_SINE));
  const inS6b = f >= S6B0;
  const rb = f - S6B0;
  // s6b close-up: hand sets the sticks down beside the bowl, then rests.
  const setDown = inS6b ? ramp(rb, 0, 44, E_SINE) : 0;
  const capAOp = (1 - ramp(f, 122, 10, E_SINE)) * ramp(f, 20, 10, E_SINE);
  // Strange insert dissolves over the close-up; the main layer yields to it.
  const insertOp = inS6b
    ? ramp(rb, S6_INSERT, 6, E_SINE) * (1 - ramp(rb, S6_INSERT + 12, 6, E_SINE))
    : 0;
  return (
    <AbsoluteFill style={{background: INK, overflow: 'hidden'}}>
      <ThoFonts />
      {!inS6b && (
        <div style={{position: 'absolute', inset: -60, transform: `scale(${zoom})`}}>
          <StagingTable wash={wash} handX={STAGE.handX} handY={handY} steam={0.6} />
          {/* partner enters blurred behind, clear of the picking hand */}
          {partnerOp > 0.001 && (
            <div
              style={{
                position: 'absolute',
                left: 140,
                top: 100,
                width: 220,
                height: 420,
                filter: 'blur(8px)',
                opacity: partnerOp,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 40,
                  top: 180,
                  width: 140,
                  height: 240,
                  borderRadius: 55,
                  background: SHIRT,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 65,
                  top: 100,
                  width: 90,
                  height: 95,
                  borderRadius: 42,
                  background: SKIN,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 58,
                  top: 68,
                  width: 104,
                  height: 66,
                  borderRadius: 32,
                  background: HAIR,
                }}
              />
            </div>
          )}
          {/* seated shoulder, foreground — sinks on exhale */}
          <Shoulder top={1620 + drop} />
        </div>
      )}
      {inS6b && (
        <div style={{position: 'absolute', inset: 0}}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, #3A4356 0%, #2E3646 60%, #232936 100%)',
            }}
          />
          <div style={{position: 'absolute', inset: 0, background: 'rgba(157,180,255,.30)'}} />
          <div style={{position: 'absolute', inset: 0, opacity: 1 - insertOp * 0.78}}>
            <Bowl x={150} y={880} s={1.5} scallions={3} steam={0.5} />
            <HandChop
              x={560 + 200 * setDown}
              y={260 + 440 * setDown}
              s={1.15}
              angle={14}
              strand={false}
            />
          </div>
          {/* slumped shoulder holds the frame's lower edge */}
          <Shoulder top={1680} />
          <StrangeInsert r={rb} />
        </div>
      )}
      <RewindBand f={f} />
      <Tag text={SceneS6_DEFAULTS.tag} color={BLUE} enter={6} />
      {capAOp > 0.001 && (
        <div style={{opacity: capAOp}}>
          <ThoLine text={SceneS6_DEFAULTS.capA} size={54} enter={0} />
        </div>
      )}
      {inS6b && <ThoLine text={SceneS6_DEFAULTS.capB} size={54} enter={S6B0 + 4} />}
      <Finish />
      <Grain opacity={0.07} />
    </AbsoluteFill>
  );
};
