// ScenesD — xay-doi-minh-hay-chung-minh (scene-agent D, sole owner).
// Keys: s7a (91f) / s7b (67f) / s8 (138f). 30fps, 1080x1920, frame-driven only.
// Staging per design-spec §5 + task-plan E-folded notes:
// - s7: split locked center (x=540) at the board edge; figure straddling;
//   s7a ZERO jade; s7b chalk blink FULL >=15f + jade tail >=11f, uncut to end.
// - s8 (E01): TWO inserts only (05:00 + desk lamp) staged 0-75f; rub >=15f on
//   "No cung co cong" + pick 111-123f (3.70-4.10s) + stand in last 12f;
//   loose brick pre-placed at ladder foot from frame 0 (A18); chunk 2 lands
//   on the insert boundary (75f, J4). No in-scene jade before s10.
// Captions: bottom 224 via proto Caption; nothing story-critical below y=1700.
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Grain, Vignette, ramp} from '../../../xay-doi-minh-hay-chung-minh/lib/Polish';
import {Caption} from '../../../xay-doi-minh-hay-chung-minh/proto/Caption';
import {FONT_CSS} from '../../../xay-doi-minh-hay-chung-minh/proto/fonts';
import {PaperGrain} from '../../../xay-doi-minh-hay-chung-minh/proto/Paper';
import {Brick, Person} from '../../../xay-doi-minh-hay-chung-minh/proto/People';
import {C, F_HEAD, hash} from '../../../xay-doi-minh-hay-chung-minh/proto/tokens';
import {SignBoard, Wall} from '../../../xay-doi-minh-hay-chung-minh/proto/Wall';

const NIGHT = `linear-gradient(180deg, ${C.cobaltTop} 0%, ${C.cobaltBot} 100%)`;
const DARK_BACK = '#23264D';
const SPLIT_X = 540;

// ---------------------------------------------------------------- s7a ---
// HIGHLIGHT 1 first half: blazing sen front (left) / dark raw back (right),
// spotlight pool breathing on the left, figure straddling the board edge.
// ZERO jade anywhere in this shot.
export const S7aScene: React.FC = () => {
  const f = useCurrentFrame();
  // Caption chunk 2 ("...cho nguoi khac nhin.") lands on its first word:
  // 2/11 syllables of ~81f voice -> ~f15.
  const c2 = f >= 15;
  const pool = 0.24 + 0.05 * Math.sin(f / 18);
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <style>{FONT_CSS}</style>
      {/* LEFT: lit front, full brightness */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: SPLIT_X,
          height: 1920,
          overflow: 'hidden',
        }}
      >
        <Wall x={-40} y={420} cols={3} rows={12} seed={5} />
        <SignBoard x={20} y={560} w={500} fs={62} />
        {/* spotlight pool, frame-driven breath */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 420px 700px at 60% 45%, rgba(243,246,255,0.30), rgba(243,246,255,0) 70%)',
            opacity: pool / 0.29,
          }}
        />
      </div>
      {/* RIGHT: dark raw back, ~10% light */}
      <div
        style={{
          position: 'absolute',
          left: SPLIT_X,
          top: 0,
          width: 1080 - SPLIT_X,
          height: 1920,
          background: DARK_BACK,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 420,
            width: 60,
            height: 1150,
            background: C.boardBack,
            border: `5px solid ${C.ink}`,
          }}
        />
        {[560, 800, 1040, 1280].map((t, i) => (
          <div
            key={t}
            style={{
              position: 'absolute',
              left: 20,
              top: t,
              width: 150,
              height: 44,
              background: C.tape,
              opacity: 0.5,
              transform: `rotate(${-18 + 2 * Math.sin(f / 9 + i * 1.7)}deg)`,
              border: `3px solid ${C.ink}`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 500,
            width: 46,
            height: 1000,
            background: C.wood,
            border: `4px solid ${C.ink}`,
            transform: 'rotate(9deg)',
          }}
        />
        {/* darkness wash: right half reads ~10% of left */}
        <div style={{position: 'absolute', inset: 0, background: 'rgba(6,8,30,0.62)'}} />
      </div>
      {/* board edge */}
      <div
        style={{
          position: 'absolute',
          left: SPLIT_X - 4,
          top: 0,
          width: 8,
          height: 1920,
          background: C.ink,
        }}
      />
      {/* figure straddling the edge, half lit / half in shadow */}
      <Person x={440} y={1560} h={340} hat face="down" />
      <div
        style={{
          position: 'absolute',
          left: SPLIT_X,
          top: 1100,
          width: 540,
          height: 500,
          background: 'linear-gradient(90deg, rgba(243,246,255,0.20), rgba(10,15,61,0.55))',
        }}
      />
      <Caption
        segs={
          c2
            ? [{text: 'bạn xây một bức tường '}, {text: 'cho người khác nhìn.', accent: C.sen}]
            : [{text: 'Mười năm,'}]
        }
      />
      <PaperGrain opacity={0.14} />
      <Vignette strength={0.3} color="#06081E" inner={0.55} />
      <Grain opacity={0.07} blend="soft-light" />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- s7b ---
// HIGHLIGHT 1 second half: camera rests on the dark back. A chalk schematic
// room (door + chair + window) blinks FULL >=0.5s (f36-53, 17f) then a jade
// tail lingers >=0.35s (f53-67, 14f), uncut to the shot end (E04).
// Chalk SFX (Reel mix) lands at shot-relative f59, inside the tail.
const CHALK_ON = 36;
const CHALK_FULL_END = 53;

const ChalkRoom: React.FC<{opacity: number; glow: number}> = ({opacity, glow}) => {
  const dash = {
    border: `6px dashed ${C.jade}`,
    borderRadius: 16,
    boxShadow: `0 0 ${Math.round(34 * glow)}px rgba(25,196,138,${(0.65 * glow).toFixed(2)})`,
  };
  return (
    <div style={{position: 'absolute', left: 340, top: 640, width: 400, height: 460, opacity}}>
      {/* room outline */}
      <div style={{position: 'absolute', inset: 0, ...dash}} />
      {/* door (bottom-left, opening in the outline reads as a gap via solid fill patch) */}
      <div
        style={{
          position: 'absolute',
          left: 36,
          bottom: -6,
          width: 110,
          height: 210,
          border: `6px solid ${C.jade}`,
          borderBottom: 'none',
          borderRadius: '14px 14px 0 0',
          boxShadow: `0 0 ${Math.round(24 * glow)}px rgba(25,196,138,${(0.5 * glow).toFixed(2)})`,
        }}
      />
      {/* window (top-right) */}
      <div
        style={{
          position: 'absolute',
          right: 36,
          top: 40,
          width: 120,
          height: 120,
          border: `6px solid ${C.jade}`,
          borderRadius: 12,
          boxShadow: `0 0 ${Math.round(24 * glow)}px rgba(25,196,138,${(0.5 * glow).toFixed(2)})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 6,
            background: C.jade,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 6,
            background: C.jade,
          }}
        />
      </div>
      {/* chair: backrest + seat + legs (round-2 redraw grammar) */}
      <div style={{position: 'absolute', left: 150, top: 220, width: 110, height: 150}}>
        <div style={{position: 'absolute', left: 10, top: 0, width: 90, height: 70, ...dash}} />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 76,
            width: 110,
            height: 16,
            background: C.jade,
            borderRadius: 6,
          }}
        />
        {[8, 86].map((lx) => (
          <div
            key={lx}
            style={{
              position: 'absolute',
              left: lx,
              top: 92,
              width: 10,
              height: 58,
              background: C.jade,
              borderRadius: 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const S7bScene: React.FC = () => {
  const f = useCurrentFrame();
  const chalkOp =
    f < CHALK_ON
      ? 0
      : f <= CHALK_FULL_END
        ? ramp(f, CHALK_ON, 2)
        : interpolate(f, [CHALK_FULL_END, 67], [1, 0.35]);
  const glow =
    f < CHALK_ON ? 0 : f <= CHALK_FULL_END ? 1 : interpolate(f, [CHALK_FULL_END, 67], [1, 0.4]);
  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <style>{FONT_CSS}</style>
      {/* thin lit sliver at left = continuity of the board edge from s7a */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 150,
          height: 1920,
          overflow: 'hidden',
        }}
      >
        <Wall x={-330} y={420} cols={2} rows={12} seed={5} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(6,8,30,0) 30%, rgba(6,8,30,0.85) 100%)',
          }}
        />
      </div>
      {/* dark back fills the frame */}
      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 0,
          width: 930,
          height: 1920,
          background: DARK_BACK,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 330,
            top: 420,
            width: 60,
            height: 1150,
            background: C.boardBack,
            border: `5px solid ${C.ink}`,
          }}
        />
        {[560, 800, 1040, 1280].map((t, i) => (
          <div
            key={t}
            style={{
              position: 'absolute',
              left: 290,
              top: t,
              width: 150,
              height: 44,
              background: C.tape,
              opacity: 0.85,
              transform: `rotate(${-18 + 4 * Math.sin(f / 6 + i * 1.7)}deg)`,
              border: `3px solid ${C.ink}`,
              transformOrigin: '20% 50%',
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 560,
            top: 500,
            width: 46,
            height: 1000,
            background: C.wood,
            border: `4px solid ${C.ink}`,
            transform: 'rotate(9deg)',
          }}
        />
        {/* faint cold rim bleeding from the lit edge */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 260,
            height: 1920,
            background: 'linear-gradient(90deg, rgba(243,246,255,0.10), rgba(243,246,255,0))',
          }}
        />
      </div>
      <div
        style={{position: 'absolute', left: 146, top: 0, width: 8, height: 1920, background: C.ink}}
      />
      {chalkOp > 0 && <ChalkRoom opacity={chalkOp} glow={glow} />}
      {/* chalk dust sparkle while FULL */}
      {f >= CHALK_ON &&
        f <= CHALK_FULL_END &&
        Array.from({length: 10}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 340 + hash(i * 3 + 51) * 400,
              top: 640 + hash(i * 7 + 52) * 460,
              width: 5 + hash(i * 11 + 53) * 5,
              height: 5 + hash(i * 11 + 53) * 5,
              borderRadius: '50%',
              background: C.jade,
              opacity: 0.35 + 0.45 * hash(i * 13 + Math.floor(f / 3)),
            }}
          />
        ))}
      <Person x={440} y={1560} h={320} hat face="down" />
      <Caption
        segs={[{text: 'Chưa xây một căn phòng nào '}, {text: 'cho mình ở.', accent: C.jade}]}
      />
      <PaperGrain opacity={0.14} />
      <Vignette strength={0.38} color="#06081E" inner={0.5} />
      <Grain opacity={0.08} blend="soft-light" />
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------- s8 ---
// Recognition (E01, 138f): front-face night. TWO inserts only — 05:00 alarm
// + desk lamp — staged 0-75f in the upper area; insert boundary (75f) fires
// caption chunk 2 (J4). Foundation brick carving glows; figure squats by it,
// rubs it 94-111f (>=15f, covering "No cung co"), picks the pre-placed loose
// brick at the ladder foot 111-123f (3.70-4.10s), stands in the last 12f.
// The stand is a continuous un-squat — nothing pops from the void.
const INS_OUT = 75;
const RUB_A = 94;
const RUB_B = 111;
const PICK_END = 123;
const STAND_A = 126;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Straight sleeve segment between two points (B-D1 jointed arm grammar).
const Seg: React.FC<{x1: number; y1: number; x2: number; y2: number; op: number}> = ({
  x1,
  y1,
  x2,
  y2,
  op,
}) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (op <= 0.01 || len < 8) {
    return null;
  }
  const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <div
      style={{
        position: 'absolute',
        left: x1,
        top: y1 - 15,
        width: len,
        height: 30,
        background: C.shirt,
        border: `4px solid ${C.ink}`,
        borderRadius: 15,
        transform: `rotate(${ang.toFixed(1)}deg)`,
        transformOrigin: '0 50%',
        opacity: op,
      }}
    />
  );
};

export const S8Scene: React.FC = () => {
  const f = useCurrentFrame();

  // inserts: full 0-75, fade+lift out 75-81
  const insOp = f < INS_OUT ? 1 : interpolate(f, [INS_OUT, 81], [1, 0]);
  const insDy =
    f < INS_OUT
      ? 0
      : interpolate(f, [INS_OUT, 81], [0, -36], {easing: Easing.bezier(0.7, 0, 0.84, 0)});

  // caption chunk: c1 0-74 / c2 75-107 / c3 108-end (c2 lands on insert boundary)
  const chunk = f < 75 ? 0 : f < 108 ? 1 : 2;

  // carving glow: dim under inserts, full after they leave, warm pulse
  const glowBase = 0.35 + 0.65 * ramp(f, INS_OUT, 10);
  const glowPulse = 0.12 * Math.sin(f / 10);

  // hand choreography (hand disc center)
  const restX = 400;
  const restY = 1180;
  const footX = 865;
  const footY = 1445;
  let hx = restX;
  let hy = restY;
  if (f >= RUB_A && f < RUB_B) {
    hx = 470 + 12 * Math.sin(((f - RUB_A) * Math.PI * 4) / (RUB_B - RUB_A));
    hy = restY + 4 * Math.sin(((f - RUB_A) * Math.PI * 2) / (RUB_B - RUB_A));
  } else if (f >= RUB_B && f < 117) {
    const t = interpolate(f, [RUB_B, 117], [0, 1]);
    hx = lerp(470, footX, t);
    hy = lerp(restY, footY, t);
  } else if (f >= 117) {
    hx = footX;
    hy = footY;
  }
  // B-D2: clamp every post-pick interpolation so the carried brick stays on
  // screen for f>126 (extrapolation pushed it off-canvas at rel 127-137).
  const lift =
    f < 117
      ? 0
      : interpolate(f, [117, PICK_END], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const carryT =
    f < PICK_END
      ? 0
      : interpolate(f, [PICK_END, STAND_A], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const standT =
    f < STAND_A
      ? 0
      : interpolate(f, [STAND_A, 138], [0, 1], {
          easing: Easing.bezier(0.65, 0, 0.35, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  // B-D2: the carry ends with the brick held in front of the body, top edge
  // at y>=1310 — below the foundation-brick bottom (1300), over dark ground,
  // ink outline distinct (A15 handoff to s9a needs brick-in-hand).
  const HOLD_X = 225;
  const HOLD_Y = 1400;
  const brickX = f < 117 ? 770 : lerp(770, HOLD_X, carryT);
  const brickY = f < 117 ? 1430 : lerp(1430 - 70 * lift, HOLD_Y, carryT) - 90 * standT;
  const baseHandY = f < 117 ? hy : hy - 70 * lift;
  const handX = f < PICK_END ? hx : lerp(hx, HOLD_X + 150, carryT);
  const handY = (f < PICK_END ? baseHandY : lerp(baseHandY, HOLD_Y + 20, carryT)) - 90 * standT;
  // B-D1: two-segment jointed arm (shoulder -> elbow -> hand). The sleeve
  // fades out while the hand is far from the shoulder (long face->foot
  // transit, lift), so no straight bar ever crosses the foundation brick;
  // the travelling hand disc + rising brick keep the grab read 111-123.
  const shX = 340;
  const shY = 1352 - 24 * standT;
  const elX = (shX + handX) / 2;
  const elY = (shY + handY) / 2 + 60;
  const span = Math.hypot(handX - shX, handY - shY);
  const armOp = interpolate(span, [260, 320], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // squat -> stand: continuous un-squash, feet planted (origin bottom)
  const squat = 0.8 + 0.2 * standT;
  const riseY = -24 * standT;

  return (
    <AbsoluteFill style={{background: NIGHT}}>
      <style>{FONT_CSS}</style>
      {/* stars */}
      {Array.from({length: 26}).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: hash(i * 3 + 71) * 1040 + 20,
            top: 60 + hash(i * 7 + 72) * 560,
            width: 3 + hash(i * 11 + 73) * 4,
            height: 3 + hash(i * 11 + 73) * 4,
            borderRadius: '50%',
            background: 'rgba(243,246,255,0.8)',
            opacity: 0.25 + 0.4 * Math.abs(Math.sin(f / 12 + i)),
          }}
        />
      ))}
      {/* front-face wall, straight top edge */}
      <Wall x={-40} y={560} cols={5} rows={7} seed={7} />
      {/* TWO inserts only, upper area, 0-75f */}
      {insOp > 0 && (
        <div style={{position: 'absolute', left: 0, top: 150 + insDy, width: 1080, opacity: insOp}}>
          {/* 05:00 alarm */}
          <div
            style={{
              position: 'absolute',
              left: 90,
              top: 0,
              width: 420,
              height: 300,
              background: '#0B0E33',
              border: `5px solid ${C.ink}`,
              borderRadius: 28,
              textAlign: 'center',
              boxShadow: '0 0 40px rgba(143,227,255,0.25)',
            }}
          >
            <div
              style={{
                fontFamily: F_HEAD,
                fontWeight: 800,
                fontSize: 108,
                color: C.lampWhite,
                lineHeight: '240px',
              }}
            >
              05:00
            </div>
            {/* ring arcs */}
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 30 + i * 26,
                  left: 60,
                  right: 60,
                  height: 90 - i * 26,
                  border: '6px solid rgba(243,246,255,0.7)',
                  borderBottom: 'none',
                  borderRadius: '90px 90px 0 0',
                  opacity: 0.4 + 0.4 * Math.sin(f / 4 + i * 2),
                }}
              />
            ))}
          </div>
          {/* desk lamp */}
          <div
            style={{
              position: 'absolute',
              left: 570,
              top: 0,
              width: 420,
              height: 300,
              background: '#0B0E33',
              border: `5px solid ${C.ink}`,
              borderRadius: 28,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 60,
                top: 0,
                width: 300,
                height: 300,
                background: 'linear-gradient(180deg, rgba(255,246,216,0.55), rgba(255,246,216,0))',
                clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 175,
                top: 18,
                width: 70,
                height: 70,
                borderRadius: '50%',
                background: '#FFF6D8',
                boxShadow: '0 0 34px 14px rgba(255,240,200,0.8)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 200,
                top: 88,
                width: 20,
                height: 130,
                background: C.wood,
                border: `4px solid ${C.ink}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 150,
                bottom: 14,
                width: 120,
                height: 18,
                background: C.wood,
                border: `4px solid ${C.ink}`,
                borderRadius: 9,
              }}
            />
          </div>
        </div>
      )}
      {/* ground band */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 1300,
          width: 1080,
          height: 410,
          background: 'linear-gradient(180deg, #232A66 0%, #12163F 100%)',
          borderTop: `5px solid ${C.ink}`,
        }}
      >
        <PaperGrain opacity={0.12} />
      </div>
      {/* foundation brick with glowing carving */}
      <Brick x={330} y={1150} w={420} h={150} />
      <div
        style={{
          position: 'absolute',
          left: 330,
          top: 1150,
          width: 420,
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: F_HEAD,
          fontWeight: 800,
          fontSize: 52,
          color: '#FFE9F5',
          textShadow: `0 0 ${(18 * (glowBase + glowPulse)).toFixed(1)}px rgba(255,92,179,${(0.55 * glowBase + glowPulse).toFixed(2)}), 0 0 ${(46 * glowBase).toFixed(1)}px rgba(255,46,154,${(0.4 * glowBase).toFixed(2)})`,
        }}
      >
        NÓ Á? CÒN LÂU.
      </div>
      {/* ladder (right) */}
      <div style={{position: 'absolute', left: 800, top: 700, width: 150, height: 830}}>
        {[0, 1].map((s) => (
          <div
            key={s}
            style={{
              position: 'absolute',
              left: s * 112,
              top: 0,
              width: 24,
              height: 830,
              background: C.wood,
              border: `4px solid ${C.ink}`,
              borderRadius: 8,
            }}
          />
        ))}
        {[80, 230, 380, 530, 680].map((t) => (
          <div
            key={t}
            style={{
              position: 'absolute',
              left: 0,
              top: t,
              width: 136,
              height: 20,
              background: C.wood,
              border: `4px solid ${C.ink}`,
              borderRadius: 8,
            }}
          />
        ))}
      </div>
      {/* loose brick pre-placed at ladder foot from frame 0 (A18) */}
      {f < 117 && <Brick x={770} y={1430} w={190} h={90} />}
      {/* squatting figure (continuous un-squat into the stand) */}
      <div
        style={{
          position: 'absolute',
          left: 250,
          top: 1240 + riseY,
          width: 150,
          height: 300,
          transform: `scaleY(${squat.toFixed(3)})`,
          transformOrigin: '50% 100%',
        }}
      >
        <Person x={0} y={300} h={300} hat face="calm" />
      </div>
      {/* picked brick from f117 — drawn over the body so the hold reads in
          front, clear of the foundation face (B-D2) */}
      {f >= 117 && (
        <div
          style={{
            position: 'absolute',
            left: brickX,
            top: brickY,
            width: 190,
            height: 90,
            background: `linear-gradient(180deg, ${C.senLight} 0%, ${C.sen} 45%, ${C.senDark} 100%)`,
            border: `5px solid ${C.ink}`,
            borderRadius: 10,
            filter: 'drop-shadow(0 8px 10px rgba(6,8,30,0.4))',
          }}
        />
      )}
      {/* acting arm: jointed shoulder -> elbow -> hand; sleeve fades while
          the hand is far (B-D1). Hand disc always drawn (grab read 111-123). */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1080,
          height: 1920,
          pointerEvents: 'none',
        }}
      >
        <Seg x1={shX} y1={shY} x2={elX} y2={elY} op={armOp} />
        <Seg x1={elX} y1={elY} x2={handX} y2={handY} op={armOp} />
        {armOp > 0.01 && (
          <div
            style={{
              position: 'absolute',
              left: elX - 15,
              top: elY - 15,
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: C.shirt,
              border: `4px solid ${C.ink}`,
              opacity: armOp,
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            left: handX - 22,
            top: handY - 22,
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#F6CFA8',
            border: `4px solid ${C.ink}`,
          }}
        />
      </div>
      <Caption
        segs={
          chunk === 0
            ? [{text: 'Câu "'}, {text: 'còn lâu', accent: C.sen}, {text: '" ấy'}]
            : chunk === 1
              ? [{text: 'từng kéo bạn dậy lúc năm giờ sáng.'}]
              : [{text: 'Nó cũng '}, {text: 'có công.', accent: C.lampWhite}]
        }
      />
      <PaperGrain opacity={0.14} />
      <Vignette strength={0.3} color="#06081E" inner={0.55} />
      <Grain opacity={0.07} blend="soft-light" />
    </AbsoluteFill>
  );
};
