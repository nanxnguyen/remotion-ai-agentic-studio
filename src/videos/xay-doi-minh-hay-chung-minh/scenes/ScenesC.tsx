// ScenesC — xay-doi-minh-hay-chung-minh (scene-agent C, sole owner)
// Keys: s5a1, s5a2, s5b, s6. Frame-driven only; no wall-clock, no unseeded random.
// Self-contained on purpose: kit/Reel/manifest are director-owned, so all
// tokens and helpers here are file-local. Timings mirror timeline.ts
// (s5a1 39f · s5a2 88f · s5b 184f · s6 126f, voiceOffset s6 = 9f;
// s6 "khong" cuts shot-relative 44/68/89f) — read, never edited.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';

// ---------- deterministic frame math ----------
const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const ramp = (f: number, a: number, b: number): number =>
  b <= a ? (f >= b ? 1 : 0) : clamp01((f - a) / (b - a));
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);
// hash-seeded pseudo-random (stable per index; safe under scrub/seek)
const hash = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ---------- local tokens (mirror design-spec §1; director kit is source of truth) ----------
const COBALT_TOP = '#141B6B';
const COBALT_BOT = '#2A36C9';
const SEN = '#FF2E9A';
const LAMP = '#F3F6FF';
const ICE = '#8FE3FF';
const BOARD = '#7A7FA6';
const TAPE = '#D9DCF2';
const INK = '#0A0F3D';
const SHIRT = '#E9EEFF';
const PANTS = '#1A2060';
const HAT = '#FFA3D1';
const WOOD = '#8A6B46';
const DIM = '#5A6194';
const HEAD_FONT = '"Bricolage Grotesque", Archivo, "Be Vietnam Pro", sans-serif';
const CAP_FONT = 'Archivo, "Be Vietnam Pro", sans-serif';

// ---------- shared type ----------
const Headline: React.FC<{lines: React.ReactNode[]}> = ({lines}) => (
  <div
    style={{
      position: 'absolute',
      top: 150,
      left: 0,
      width: 1080,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: HEAD_FONT,
      fontWeight: 800,
      fontSize: 86,
      lineHeight: 1.12,
      color: LAMP,
      textAlign: 'center',
    }}
  >
    {lines.map((ln, i) => (
      <div key={i}>{ln}</div>
    ))}
  </div>
);

const Caption: React.FC<{lines: React.ReactNode[]}> = ({lines}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      width: 1080,
      bottom: 224,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        background: 'rgba(10,15,61,0.85)',
        borderRadius: 28,
        padding: '18px 34px',
        fontFamily: CAP_FONT,
        fontWeight: 600,
        fontSize: 58,
        lineHeight: 1.25,
        color: LAMP,
        textAlign: 'center',
      }}
    >
      {lines.map((ln, i) => (
        <div key={i}>{ln}</div>
      ))}
    </div>
  </div>
);

// Standing figure with helmet (back view default; face via `face` prop).
const Figure: React.FC<{
  x: number;
  y: number;
  s?: number;
  face?: 'back' | 'up' | 'return' | 'gaze';
  climbT?: number;
}> = ({x, y, s = 1, face = 'back', climbT = 0}) => {
  const swing = Math.sin(climbT) * 26;
  const lift = Math.abs(Math.cos(climbT)) * 26;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={6} rx={64} ry={12} fill="#000" opacity={0.32} />
      {/* legs */}
      <rect x={-34} y={-150} width={26} height={150} rx={12} fill={PANTS} />
      <rect
        x={10}
        y={-150 + (face === 'back' ? -lift * 0.4 : 0)}
        width={26}
        height={150}
        rx={12}
        fill={PANTS}
        transform={`rotate(${face === 'back' ? swing * 0.25 : 0} 23 -10)`}
      />
      {/* torso */}
      <rect
        x={-44}
        y={-300}
        width={88}
        height={160}
        rx={26}
        fill={SHIRT}
        stroke={INK}
        strokeWidth={5}
      />
      {/* arms */}
      <rect
        x={-66}
        y={-290}
        width={24}
        height={130}
        rx={12}
        fill={SHIRT}
        stroke={INK}
        strokeWidth={4}
        transform={`rotate(${face === 'back' ? -swing * 0.5 : -8} -54 -280)`}
      />
      <rect
        x={42}
        y={-290}
        width={24}
        height={130}
        rx={12}
        fill={SHIRT}
        stroke={INK}
        strokeWidth={4}
        transform={`rotate(${face === 'back' ? swing * 0.5 : 8} 54 -280)`}
      />
      {face === 'gaze' ? (
        <g>
          {/* tilted-up gaze: face (never the back of the head) turned skyward,
              helmet tipped back, eyes high, mouth open — B-C3 */}
          <rect x={-14} y={-332} width={28} height={38} fill={SHIRT} stroke={INK} strokeWidth={4} />
          <g transform="rotate(-18 0 -330)">
            <circle cx={0} cy={-362} r={46} fill={SHIRT} stroke={INK} strokeWidth={5} />
            <path
              d="M-50 -372 A52 52 0 0 1 46 -384 L40 -398 A52 52 0 0 0 -56 -386 Z"
              fill={HAT}
              stroke={INK}
              strokeWidth={5}
            />
            <circle cx={-17} cy={-360} r={6} fill={INK} />
            <circle cx={17} cy={-360} r={6} fill={INK} />
            <ellipse cx={0} cy={-338} rx={8} ry={11} fill={INK} opacity={0.9} />
          </g>
        </g>
      ) : face === 'return' ? (
        <g>
          {/* helmet-on face, parted lips */}
          <circle cx={0} cy={-352} r={44} fill={SHIRT} stroke={INK} strokeWidth={5} />
          <path
            d="M-46 -360 A48 48 0 0 1 46 -360 L46 -372 A48 48 0 0 0 -46 -372 Z"
            fill={HAT}
            stroke={INK}
            strokeWidth={5}
          />
          <circle cx={-16} cy={-350} r={5} fill={INK} />
          <circle cx={16} cy={-350} r={5} fill={INK} />
          <ellipse cx={0} cy={-328} rx={9} ry={6} fill={INK} opacity={0.85} />
        </g>
      ) : (
        <g>
          {/* back of helmet */}
          <circle cx={0} cy={-352} r={44} fill={HAT} stroke={INK} strokeWidth={5} />
          <path d="M-44 -352 A44 44 0 0 0 44 -352 L44 -336 L-44 -336 Z" fill={HAT} opacity={0.55} />
          {face === 'up' && (
            <circle cx={0} cy={-318} r={10} fill={SHIRT} stroke={INK} strokeWidth={4} />
          )}
        </g>
      )}
    </g>
  );
};

const Sky: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(180deg, ${COBALT_TOP} 0%, ${COBALT_BOT} 100%)`,
    }}
  />
);

const BrickWall: React.FC<{top: number; tone?: string; rows?: number}> = ({
  top,
  tone = SEN,
  rows = 9,
}) => (
  <div style={{position: 'absolute', left: 0, top, width: 1080, height: 1920 - top}}>
    {Array.from({length: rows}).map((_, r) => (
      <div key={r} style={{display: 'flex', marginLeft: r % 2 === 0 ? 0 : -70}}>
        {Array.from({length: 9}).map((_, c) => (
          <div
            key={c}
            style={{
              width: 140,
              height: 76,
              margin: 5,
              background: tone,
              border: `5px solid ${INK}`,
              borderRadius: 6,
              opacity: 0.92,
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

// ============================================================
// S5a1 — RE-HOOK headline, hard cut + 0.15s gap hold (39f)
// HEADLINE: "Họ có / đang nhìn không?" — "đang nhìn" sen.
// ============================================================
const S5A1_D = 39;
const S5A1_GAP = 5; // 0.15s gap hold: motion frozen, headline locked
export const S5a1Scene: React.FC = () => {
  const f = useCurrentFrame();
  const mf = Math.min(f, S5A1_D - S5A1_GAP); // frozen clock during gap hold
  const press = easeOut(ramp(mf, 0, 9));
  const scale = lerp(1.28, 1, press);
  const push = lerp(1.0, 1.015, mf / S5A1_D);
  return (
    <AbsoluteFill style={{background: COBALT_TOP}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${push})`}}>
        <Sky />
        {/* wall top + figure at ladder foot, looking up */}
        <BrickWall top={1180} />
        <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
          {/* ladder */}
          <g stroke={WOOD} strokeWidth={22} strokeLinecap="round">
            <line x1={400} y1={1180} x2={400} y2={640} />
            <line x1={520} y1={1180} x2={520} y2={640} />
          </g>
          {Array.from({length: 6}).map((_, i) => (
            <line
              key={i}
              x1={400}
              y1={1120 - i * 80}
              x2={520}
              y2={1120 - i * 80}
              stroke={WOOD}
              strokeWidth={16}
              strokeLinecap="round"
            />
          ))}
          <Figure x={460} y={1180} s={1.15} face="up" />
        </svg>
      </div>
      <div style={{transform: `scale(${scale})`, opacity: press === 0 ? 0 : 1}}>
        <Headline
          lines={[
            'Họ có',
            <>
              <span style={{color: SEN}}>đang nhìn</span> không?
            </>,
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// S5a2 — crane rise along wall, ladder climb (88f)
// Caption: "Một tối, bạn leo lên / viên gạch cao nhất để xem."
// Ladder creak has no sample — motion carries (stepped climb + shake).
// ============================================================
const S5A2_D = 88;
// syllable-timed chunk flip: c1 5 syl (~41f) / c2 6 syl
const S5A2_C2_AT = 41;
export const S5a2Scene: React.FC = () => {
  const f = useCurrentFrame();
  const cam = easeInOutCubic(ramp(f, 0, S5A2_D)); // tilt-up along wall
  const camY = lerp(0, -560, cam);
  // stepped climb: quantized ascent + per-step bob (motion carries the creak)
  const step = Math.floor(f / 11);
  const stepT = (f % 11) / 11;
  const climbY = -step * 46 - easeOut(stepT) * 46;
  const shake = f > 8 && stepT < 0.25 ? (hash(step) - 0.5) * 7 : 0;
  const inSpot = ramp(f, 58, 74); // cold spotlight wash at the top brick
  const showC2 = f >= S5A2_C2_AT;
  const S5A2_ROWS = 16; // extended courses: tilt-up to -560 never exposes void
  return (
    <AbsoluteFill style={{background: COBALT_TOP}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          transform: `translateY(${camY}px)`,
        }}
      >
        <Sky />
        <BrickWall top={1250} rows={S5A2_ROWS} />
        {/* cold spotlight wash near the top brick */}
        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 300,
            width: 800,
            height: 700,
            background: `radial-gradient(ellipse at center, rgba(243,246,255,${0.5 * inSpot}) 0%, rgba(243,246,255,0) 70%)`,
          }}
        />
        <svg width={1080} height={2600} style={{position: 'absolute', left: 0, top: 0}}>
          <g transform={`translate(${shake} 0)`}>
            <g stroke={WOOD} strokeWidth={24} strokeLinecap="round">
              <line x1={410} y1={1900} x2={410} y2={560} />
              <line x1={540} y1={1900} x2={540} y2={560} />
            </g>
            {Array.from({length: 15}).map((_, i) => (
              <line
                key={i}
                x1={410}
                y1={1840 - i * 88}
                x2={540}
                y2={1840 - i * 88}
                stroke={WOOD}
                strokeWidth={17}
                strokeLinecap="round"
              />
            ))}
          </g>
          <Figure x={475} y={1900 + climbY} s={1.1} face="back" climbT={f * 0.55} />
          {/* top brick */}
          <rect
            x={380}
            y={500}
            width={220}
            height={110}
            rx={8}
            fill={SEN}
            stroke={INK}
            strokeWidth={6}
          />
        </svg>
      </div>
      <Caption
        lines={
          showC2
            ? [
                'Một tối, bạn leo lên',
                <>
                  <b>viên gạch cao nhất</b> để xem.
                </>,
              ]
            : ['Một tối, bạn leo lên']
        }
      />
    </AbsoluteFill>
  );
};

// ============================================================
// S5b — restaged interior answer (184f)
// E03: STANDING faceless back-figure at counter, faucet + stream LEFT,
// basin on counter line, TV flicker wash upper-left, steam, pane mullions.
// Chip 32px top-corner 0.6–4.8s (f18–144), fades before cut. Return
// face-cut (helmet ON, parted lips). Last 0.4s (12f): turn + descend so
// s6 starts grounded at the wall edge.
// Caption 3 chunks, syllable-timed: c1 9syl 0–66 / c2 4syl 66–95 / c3 rest.
// ============================================================
const S5B_D = 184;
const S5B_C2_AT = 66;
const S5B_C3_AT = 95;
const S5B_CHIP_IN = 18; // 0.6s
const S5B_CHIP_OUT = 144; // 4.8s, faded before cut
const S5B_RETURN_AT = 140; // return face-cut
const S5B_DESCEND_AT = S5B_D - 12; // last 0.4s: turn + start down
const CHIP_LINES = [
  'Hiệu ứng spotlight',
  '(Gilovich & cs., 2000):',
  'ta hay nghĩ người khác',
  'để ý mình hơn thực tế',
];
export const S5bScene: React.FC = () => {
  const f = useCurrentFrame();
  const inReturn = f >= S5B_RETURN_AT;
  const descend = ramp(f, S5B_DESCEND_AT, S5B_D);
  // TV flicker: stepped, frame-driven
  const flick = 0.25 + hash(Math.floor(f / 3)) * 0.45;
  const steamDrift = Math.sin(f / 14) * 14;
  const streamWob = Math.sin(f / 4) * 3;
  const chipO =
    ramp(f, S5B_CHIP_IN, S5B_CHIP_IN + 8) * (1 - ramp(f, S5B_CHIP_OUT - 12, S5B_CHIP_OUT));
  const chunk = f >= S5B_C3_AT ? 3 : f >= S5B_C2_AT ? 2 : 1;
  return (
    <AbsoluteFill style={{background: '#0C1248'}}>
      {!inReturn ? (
        <>
          {/* night alley backdrop */}
          <Sky />
          {/* window frame seen across the alley */}
          <div
            style={{
              position: 'absolute',
              left: 90,
              top: 330,
              width: 900,
              height: 1080,
              background: '#10175C',
              border: `10px solid ${INK}`,
              borderRadius: 18,
              overflow: 'hidden',
            }}
          >
            {/* warm interior */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg,#3A3F9E 0%,#232A7E 60%,#1A2060 100%)',
              }}
            />
            {/* TV flicker wash upper-left */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 420,
                height: 330,
                background: `radial-gradient(ellipse at 30% 20%, rgba(143,227,255,${flick}) 0%, rgba(143,227,255,0) 70%)`,
              }}
            />
            {/* TV set glow block upper-left */}
            <div
              style={{
                position: 'absolute',
                left: 60,
                top: 90,
                width: 190,
                height: 120,
                background: ICE,
                opacity: 0.35 + flick * 0.6,
                border: `6px solid ${INK}`,
                borderRadius: 10,
              }}
            />
            {/* counter line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 640,
                height: 26,
                background: WOOD,
                borderTop: `5px solid ${INK}`,
                borderBottom: `5px solid ${INK}`,
              }}
            />
            {/* basin on counter */}
            <div
              style={{
                position: 'absolute',
                left: 300,
                top: 560,
                width: 320,
                height: 90,
                background: '#B9C2EE',
                border: `6px solid ${INK}`,
                borderRadius: '14px 14px 30px 30px',
              }}
            />
            {/* faucet LEFT + ice stream into basin */}
            <div style={{position: 'absolute', left: 180, top: 380}}>
              <div
                style={{
                  width: 40,
                  height: 190,
                  background: '#8F97D6',
                  border: `6px solid ${INK}`,
                  borderRadius: 16,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 52,
                  top: 60,
                  width: 130,
                  height: 34,
                  background: '#8F97D6',
                  border: `6px solid ${INK}`,
                  borderRadius: 14,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 150 + streamWob,
                  top: 94,
                  width: 22,
                  height: 130,
                  background: ICE,
                  opacity: 0.85,
                  borderRadius: 10,
                }}
              />
            </div>
            {/* steam above basin */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 380 + i * 60 + steamDrift * (0.5 + i * 0.3),
                  top: 430 - i * 26 + Math.sin(f / 18 + i * 2) * 10,
                  width: 34,
                  height: 90,
                  borderRadius: 17,
                  background: 'rgba(243,246,255,0.28)',
                  opacity: 0.5 - i * 0.12,
                }}
              />
            ))}
            {/* STANDING back-figure at counter, faceless */}
            <svg width={900} height={1080} style={{position: 'absolute', inset: 0}}>
              <Figure x={640} y={660} s={1.5} face="back" />
            </svg>
            {/* pane mullions kept off the head */}
            <div
              style={{
                position: 'absolute',
                left: 440,
                top: 0,
                width: 14,
                height: 1080,
                background: INK,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 340,
                width: 900,
                height: 14,
                background: INK,
              }}
            />
          </div>
          {/* source chip, top corner, 32px build size */}
          <div
            style={{
              position: 'absolute',
              top: 120,
              left: 60,
              background: 'rgba(10,15,61,0.88)',
              border: `3px solid ${TAPE}`,
              borderRadius: 16,
              padding: '14px 20px',
              fontFamily: CAP_FONT,
              fontWeight: 600,
              fontSize: 32,
              lineHeight: 1.3,
              color: LAMP,
              opacity: chipO,
            }}
          >
            {CHIP_LINES.map((ln, i) => (
              <div key={i}>{ln}</div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* return face-cut: helmet ON, parted lips, in cold spotlight */}
          <Sky />
          <div
            style={{
              position: 'absolute',
              left: 140,
              top: 420,
              width: 800,
              height: 900,
              background:
                'radial-gradient(ellipse at center, rgba(243,246,255,0.4) 0%, rgba(243,246,255,0) 70%)',
            }}
          />
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <g transform={`translate(0 ${descend * 120}) rotate(${-descend * 14} 540 900)`}>
              <Figure x={540} y={1150} s={2.1} face="return" />
            </g>
          </svg>
        </>
      )}
      <Caption
        lines={
          chunk === 1
            ? ['Bên kia cửa sổ,', 'người ta đang rửa bát,']
            : chunk === 2
              ? ['cười theo ti vi.']
              : [
                  'Tối ấy,',
                  <>
                    <b>chẳng ai nhìn sang.</b>
                  </>,
                ]
        }
      />
    </AbsoluteFill>
  );
};

// ============================================================
// S6 — TURN: 90° orbit 0–1.2s (36f) easeInOutCubic to thin edge,
// voice entry +9f lead-in, then hard cuts on measured "không" onsets
// k1 44f (hand / empty doorframe) · k2 68f (gaze up / open sky) ·
// k3 89f (look down / empty ground). Thin edge lands 0.28s before k1.
// Board back BOARD + TAPE + wood brace; wind strip throughout.
// NO chip. Each "không" lights on its own cut.
// ============================================================
const S6_D = 126;
const S6_ORBIT = 36; // 0–1.2s
const S6_K1 = 44; // 1.48s
const S6_K2 = 68; // 2.26s
const S6_K3 = 89; // 2.96s (±0.15 tolerance carried in these exact frames)
const WindStrip: React.FC<{f: number; seed: number}> = ({f, seed}) => (
  <>
    {Array.from({length: 9}).map((_, i) => {
      const sp = 3 + hash(seed + i) * 5;
      const x = 1080 - ((f * sp * 8 + hash(seed + i * 3) * 1400) % 1400);
      const y = 200 + hash(seed + i * 7) * 1400 + Math.sin(f / 12 + i) * 24;
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: 60 + hash(i + seed) * 70,
            height: 8,
            background: 'rgba(243,246,255,0.5)',
            borderRadius: 4,
            transform: `rotate(${(hash(i * 2 + seed) - 0.5) * 30}deg)`,
          }}
        />
      );
    })}
  </>
);
export const S6Scene: React.FC = () => {
  const f = useCurrentFrame();
  const orbiting = f < S6_ORBIT;
  // cut index after orbit: 0 pre-k1 (edge beat), 1 doorframe, 2 sky, 3 ground
  const cut = f < S6_K1 ? 0 : f < S6_K2 ? 1 : f < S6_K3 ? 2 : 3;
  const orbitT = easeInOutCubic(ramp(f, 0, S6_ORBIT));
  const frontSX = Math.cos(orbitT * Math.PI * 0.5); // 1 → 0 (thin edge)
  const backO = ramp(f, 10, S6_ORBIT);
  const voiced = f >= 9; // 0.30s lead-in
  const kLit = [f >= S6_K1, f >= S6_K2, f >= S6_K3];
  const capColor = (lit: boolean): string => (lit ? LAMP : DIM);
  return (
    <AbsoluteFill style={{background: COBALT_TOP}}>
      <Sky />
      {orbiting || (!orbiting && cut === 0) ? (
        <div style={{position: 'absolute', inset: 0}}>
          {/* front face: sen brick courses collapsing to thin edge (B-C2:
              BrickWall grammar clipped to the collapsing width, centered) */}
          {(() => {
            const w = 860 * Math.max(frontSX, 0.012);
            return (
              <div
                style={{
                  position: 'absolute',
                  left: 540 - w / 2,
                  top: 500,
                  width: w,
                  height: 1000,
                  background: '#B3126A', // sen-dark mortar behind course gaps
                  border: `8px solid ${INK}`,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: (w - 1080) / 2,
                    top: 0,
                    width: 1080,
                    height: 1000,
                  }}
                >
                  <BrickWall top={0} rows={12} />
                </div>
              </div>
            );
          })()}
          {/* revealed back: raw board + cross tape + wood brace */}
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 500,
              width: 840,
              height: 1000,
              background: BOARD,
              border: `8px solid ${INK}`,
              opacity: backO,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -40,
                top: 430,
                width: 920,
                height: 64,
                background: TAPE,
                opacity: 0.9,
                transform: 'rotate(-18deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -40,
                top: 430,
                width: 920,
                height: 64,
                background: TAPE,
                opacity: 0.9,
                transform: 'rotate(18deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 700,
                top: 120,
                width: 60,
                height: 880,
                background: WOOD,
                border: `6px solid ${INK}`,
                transform: 'rotate(9deg)',
              }}
            />
          </div>
          {/* figure walking behind, around the edge */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <Figure x={lerp(430, 640, orbitT)} y={1560} s={1.05} face="back" climbT={f * 0.5} />
          </svg>
          <WindStrip f={f} seed={11} />
        </div>
      ) : cut === 1 ? (
        <div style={{position: 'absolute', inset: 0}}>
          {/* k1: hand touches empty doorframe */}
          <div
            style={{
              position: 'absolute',
              left: 140,
              top: 480,
              width: 800,
              height: 1040,
              background: BOARD,
              border: `8px solid ${INK}`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 250,
                top: 120,
                width: 300,
                height: 800,
                border: `10px dashed ${INK}`,
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 90,
                top: 300,
                width: 620,
                height: 46,
                background: TAPE,
                opacity: 0.85,
                transform: 'rotate(-12deg)',
              }}
            />
          </div>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <Figure x={540} y={1620} s={1.25} face="back" />
            {/* reaching hand into the empty frame */}
            <line
              x1={590}
              y1={1150}
              x2={660}
              y2={1080}
              stroke={SHIRT}
              strokeWidth={30}
              strokeLinecap="round"
            />
            <circle cx={668} cy={1072} r={20} fill={SHIRT} stroke={INK} strokeWidth={5} />
          </svg>
          <WindStrip f={f} seed={21} />
        </div>
      ) : cut === 2 ? (
        <div style={{position: 'absolute', inset: 0}}>
          {/* k2: gaze up at open sky, no roof */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg,#0C1248 0%,${COBALT_BOT} 70%)`,
            }}
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={200 + hash(i * 5 + 1) * 680}
              cy={300 + hash(i * 9 + 2) * 500}
              r={4 + hash(i + 3) * 5}
              fill={LAMP}
              opacity={0.8}
            />
          ))}
          {/* snapped roof anchored to wall stubs: posts carry the break (B-C3) */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            {/* wall stubs: brick-textured posts the roof broke off from */}
            <g>
              <rect
                x={150}
                y={700}
                width={110}
                height={900}
                fill={SEN}
                stroke={INK}
                strokeWidth={7}
              />
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) => (
                <line
                  key={`l${r}`}
                  x1={150}
                  y1={786 + r * 86}
                  x2={260}
                  y2={786 + r * 86}
                  stroke={INK}
                  strokeWidth={5}
                />
              ))}
              <rect
                x={820}
                y={700}
                width={110}
                height={900}
                fill={SEN}
                stroke={INK}
                strokeWidth={7}
              />
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) => (
                <line
                  key={`r${r}`}
                  x1={820}
                  y1={786 + r * 86}
                  x2={930}
                  y2={786 + r * 86}
                  stroke={INK}
                  strokeWidth={5}
                />
              ))}
            </g>
            {/* snapped beams rising from the post tops, zigzag break ends facing the open sky */}
            <g stroke={WOOD} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="205,700 300,640 330,655 390,600" fill="none" />
              <polyline points="875,700 780,640 750,655 690,600" fill="none" />
            </g>
            <Figure x={540} y={1620} s={1.5} face="gaze" />
          </svg>
          <WindStrip f={f} seed={31} />
        </div>
      ) : (
        <div style={{position: 'absolute', inset: 0}}>
          {/* k3: look down at empty ground, nowhere to sit */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 1300,
              bottom: 0,
              background: '#232A7E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 1300,
              height: 10,
              background: INK,
            }}
          />
          {/* B-C4: dashed "empty spot" ellipse must live inside an <svg> (a bare
              <ellipse> child of a div never paints) and sit above the caption pill. */}
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <ellipse
              cx={540}
              cy={1400}
              rx={330}
              ry={50}
              fill="none"
              stroke={TAPE}
              strokeWidth={6}
              strokeDasharray="26 20"
              opacity={0.8}
            />
          </svg>
          <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
            <g transform="translate(540 1470) scale(1.25)">
              <ellipse cx={0} cy={6} rx={64} ry={12} fill="#000" opacity={0.32} />
              <rect
                x={-40}
                y={-140}
                width={80}
                height={140}
                rx={22}
                fill={SHIRT}
                stroke={INK}
                strokeWidth={5}
              />
              <rect x={-34} y={-140} width={26} height={140} rx={12} fill={PANTS} />
              <rect x={10} y={-140} width={26} height={140} rx={12} fill={PANTS} />
              <circle cx={0} cy={-196} r={42} fill={HAT} stroke={INK} strokeWidth={5} />
              <circle cx={0} cy={-162} r={9} fill={SHIRT} stroke={INK} strokeWidth={4} />
            </g>
          </svg>
          <WindStrip f={f} seed={41} />
        </div>
      )}
      {voiced && (
        <Caption
          lines={
            f < S6_K1
              ? ['Phía sau bức tường:']
              : [
                  <>
                    <span style={{color: capColor(kLit[0]), fontWeight: kLit[0] ? 800 : 600}}>
                      không cửa,
                    </span>{' '}
                    <span style={{color: capColor(kLit[1]), fontWeight: kLit[1] ? 800 : 600}}>
                      không mái,
                    </span>
                  </>,
                  <span style={{color: capColor(kLit[2]), fontWeight: kLit[2] ? 800 : 600}}>
                    không một chỗ để ngồi.
                  </span>,
                ]
          }
        />
      )}
    </AbsoluteFill>
  );
};

// silence unused-export guard for shot-length mirror (keeps tsc honest if timeline shifts)
export const XDM_C_DURATIONS = {
  s5a1: S5A1_D,
  s5a2: S5A2_D,
  s5b: S5B_D,
  s6: S6_D,
  s6cuts: [S6_K1, S6_K2, S6_K3],
};
