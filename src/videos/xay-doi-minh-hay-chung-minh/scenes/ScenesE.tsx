import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {XDM_SHOTS} from '../timeline';

// ScenesE — s9a / s9b / s10 / s11 (agent E, sole owner).
// Frame-driven only: useCurrentFrame + interpolate. No Date.now / Math.random.
// Headlines replace bottom captions (never both). Nothing inside bottom 210px.
// Audio (SFX/BGM/silence) lives in Reel; scenes are visual-only.

// ---------- palette (design-spec §1) ----------
const COBALT_TOP = '#141B6B';
const COBALT_BOT = '#2A36C9';
const SEN = '#FF2E9A';
const SEN_DARK = '#B3126A';
const LAMP = '#F3F6FF';
const ICE = '#8FE3FF';
const JADE = '#19C48A';
const DAWN_A = '#DDEBFF';
const DAWN_B = '#F2FBF6';
const INK = '#0A0F3D';
const SHIRT = '#E9EEFF';
const PANTS = '#1A2060';
const HAT = '#FFA3D1';
const BOARD = '#7A7FA6';
const SUN = '#FFC46B';

const HEAD_FONT = '"Bricolage Grotesque","Archivo","Be Vietnam Pro",sans-serif';
const CAP_FONT = '"Archivo","Be Vietnam Pro",sans-serif';

// ---------- deterministic helpers ----------
const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const ramp = (f: number, start: number, len: number): number => clamp01((f - start) / len);
const hexRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const mixHex = (a: string, b: string, t: number): string => {
  const u = hexRgb(a);
  const v = hexRgb(b);
  return `rgb(${Math.round(lerp(u[0], v[0], t))},${Math.round(lerp(u[1], v[1], t))},${Math.round(
    lerp(u[2], v[2], t),
  )})`;
};
const smooth = (f: number, a: number, b: number): number =>
  interpolate(f, [a, b], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

// ---------- shared bits ----------
const Headline: React.FC<{lines: React.ReactNode[]; size?: number; color?: string}> = ({
  lines,
  size = 86,
  color = LAMP,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 118,
      left: 0,
      width: 1080,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: HEAD_FONT,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.2,
      color,
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

// Small paper-cut figure at wall foot. (x, y) = feet position. kneel 0..1 lowers torso.
const Figure: React.FC<{
  x: number;
  y: number;
  s: number;
  hatOn?: boolean;
  kneel?: number;
  brickInHand?: boolean;
  opacity?: number;
}> = ({x, y, s, hatOn = true, kneel = 0, brickInHand = true, opacity = 1}) => {
  const legH = lerp(64, 30, kneel);
  const torsoH = lerp(96, 70, kneel);
  const headR = 30;
  const headY = -(legH + torsoH + headR + 6);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      {/* legs */}
      <rect x={-26} y={-legH} width={22} height={legH} fill={PANTS} stroke={INK} strokeWidth={5} />
      <rect x={4} y={-legH} width={22} height={legH} fill={PANTS} stroke={INK} strokeWidth={5} />
      {/* torso */}
      <rect
        x={-34}
        y={-(legH + torsoH)}
        width={68}
        height={torsoH}
        rx={10}
        fill={SHIRT}
        stroke={INK}
        strokeWidth={5}
      />
      {/* arm toward brick */}
      <rect
        x={30}
        y={-(legH + torsoH) + 18}
        width={44}
        height={18}
        rx={9}
        fill={SHIRT}
        stroke={INK}
        strokeWidth={5}
      />
      {/* head */}
      <circle cx={0} cy={headY} r={headR} fill={SHIRT} stroke={INK} strokeWidth={5} />
      {hatOn && (
        <path
          d={`M ${-headR - 8} ${headY - 8} L ${-20} ${headY - headR - 26} L ${20} ${
            headY - headR - 26
          } L ${headR + 8} ${headY - 8} Z`}
          fill={HAT}
          stroke={INK}
          strokeWidth={5}
          strokeLinejoin="round"
        />
      )}
      {/* brick in hand */}
      {brickInHand && (
        <g transform={`translate(96 ${-(legH + torsoH) + 8})`}>
          <rect
            x={-34}
            y={-24}
            width={68}
            height={48}
            rx={4}
            fill={SEN}
            stroke={INK}
            strokeWidth={5}
          />
          <rect x={-34} y={-24} width={68} height={8} fill={LAMP} opacity={0.55} />
        </g>
      )}
    </g>
  );
};

// Blazing bulb sign "THẤY CHƯA?" — glow + bulb row, brightness driven by `on` (1 = blazing).
const Sign: React.FC<{x: number; y: number; s: number; on: number; flicker: number}> = ({
  x,
  y,
  s,
  on,
  flicker,
}) => {
  const bulbs = 9;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.25 + 0.75 * on}>
      <ellipse cx={0} cy={0} rx={330} ry={120} fill={SEN} opacity={0.35 * on * (1 + flicker)} />
      <rect
        x={-300}
        y={-90}
        width={600}
        height={180}
        rx={26}
        fill={on > 0.5 ? SEN : SEN_DARK}
        stroke={INK}
        strokeWidth={6}
      />
      <text
        x={0}
        y={34}
        textAnchor="middle"
        fontFamily={HEAD_FONT}
        fontWeight={800}
        fontSize={96}
        fill={LAMP}
        opacity={0.35 + 0.65 * on}
      >
        THẤY CHƯA?
      </text>
      {Array.from({length: bulbs}).map((_, i) => (
        <circle
          key={i}
          cx={-264 + i * 66}
          cy={-112}
          r={14}
          fill={LAMP}
          opacity={(0.55 + 0.45 * flicker) * on}
        />
      ))}
    </g>
  );
};

// ---------- S9a: wide, ice window ON then "tách" off @2.30s (f69), lighting change ----------
export const S9aScene: React.FC = () => {
  const f = useCurrentFrame();
  const D = XDM_SHOTS.s9a.durationInFrames;
  void D;
  const OFF = Math.round(2.3 * 30); // window-off SFX frame (sound in Reel)
  const flip = smooth(f, OFF, OFF + 11); // 0.36s inOutQuad sink, seek-safe
  const skyTop = mixHex(COBALT_TOP, '#070B33', flip);
  const skyBot = mixHex(COBALT_BOT, '#10165E', flip);
  const iceGlow = 1 - flip;
  const rim = mixHex(LAMP, '#5A64B8', flip * 0.7); // rim-light cools as ice dies
  const flick = Math.sin(f * 0.9) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{background: skyTop}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <defs>
          <linearGradient id="s9asky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={skyTop} />
            <stop offset="1" stopColor={skyBot} />
          </linearGradient>
          <radialGradient id="s9aice" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={ICE} stopOpacity={0.85 * iceGlow} />
            <stop offset="1" stopColor={ICE} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#s9asky)" />
        {/* far tower across the alley */}
        <rect x={620} y={330} width={330} height={700} fill={mixHex('#232B7A', '#0D123F', flip)} />
        {/* ice window: ON then clicks off */}
        <rect
          x={700}
          y={430}
          width={170}
          height={130}
          fill={iceGlow > 0.5 ? ICE : '#1A2060'}
          stroke={INK}
          strokeWidth={6}
        />
        <line x1={785} y1={430} x2={785} y2={560} stroke={INK} strokeWidth={6} />
        <line x1={700} y1={495} x2={870} y2={495} stroke={INK} strokeWidth={6} />
        <ellipse cx={785} cy={495} rx={190} ry={170} fill="url(#s9aice)" />
        {/* ice wash across the alley while ON */}
        <rect x={0} y={330} width={1080} height={420} fill={ICE} opacity={0.1 * iceGlow} />
        {/* dark towers flanking (E07) — BEFORE wall+Sign so the plate reads clean (C1) */}
        <rect
          x={-40}
          y={700}
          width={180}
          height={1010}
          fill="#0D123F"
          stroke={INK}
          strokeWidth={6}
        />
        <rect
          x={940}
          y={760}
          width={180}
          height={950}
          fill="#0D123F"
          stroke={INK}
          strokeWidth={6}
        />
        {/* sen wall (dims with sink; Sign itself stays exempt, re-drawn below — C6) */}
        <rect x={60} y={1010} width={420} height={700} fill={SEN} stroke={INK} strokeWidth={6} />
        {/* small figure at wall foot */}
        <Figure x={540} y={1560} s={0.62} hatOn brickInHand />
        {/* off-window remnant: dead frame + faint cold edge */}
        {flip > 0 && (
          <rect
            x={700}
            y={430}
            width={170}
            height={130}
            fill="none"
            stroke={rim}
            strokeWidth={4}
            opacity={0.5 * flip}
          />
        )}
        {/* foreground hand/brick ≥40px WITH rim-light (E07, cold top/left edge) */}
        <g transform="translate(800 1620) rotate(-8)">
          <rect
            x={-130}
            y={-80}
            width={260}
            height={160}
            rx={10}
            fill={SEN}
            stroke={INK}
            strokeWidth={7}
          />
          <rect x={-130} y={-80} width={260} height={16} fill={rim} opacity={0.9} />
          <rect x={-130} y={-80} width={16} height={160} fill={rim} opacity={0.9} />
          <rect x={-120} y={-40} width={240} height={10} fill={INK} opacity={0.35} />
          {/* slim gripping hand: palm + 3 finger wraps on the brick edge (C7) */}
          <rect
            x={-198}
            y={-32}
            width={56}
            height={116}
            rx={26}
            fill={SHIRT}
            stroke={INK}
            strokeWidth={7}
          />
          {[-8, 18, 44].map((yy) => (
            <line
              key={yy}
              x1={-152}
              y1={yy}
              x2={-112}
              y2={yy}
              stroke={INK}
              strokeWidth={7}
              strokeLinecap="round"
            />
          ))}
        </g>
        {/* world sink overlay (white-melt zeroes in dark; Sign exempt — redrawn after) */}
        <rect x={0} y={0} width={1080} height={1920} fill="#05071F" opacity={0.42 * flip} />
        {/* blazing sign on top of sink: no brightness pop at the s9a→s9b cut (C6) */}
        <Sign x={270} y={1170} s={0.62} on={1} flicker={flick * 0.12} />
      </svg>
      <Headline
        lines={[
          'Người từng',
          'xem thường bạn',
          <span key="a" style={{color: ICE}}>
            có thể đã quên.
          </span>,
        ]}
      />
    </AbsoluteFill>
  );
};

// ---------- S9b: pull-back, sign blazing into darkness, narrowing pool ----------
export const S9bScene: React.FC = () => {
  const f = useCurrentFrame();
  const D = XDM_SHOTS.s9b.durationInFrames;
  const t = ramp(f, 0, D);
  const pull = interpolate(f, [0, D], [1.06, 1.0], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const poolRx = lerp(270, 150, t * t);
  const flick = Math.sin(f * 0.7) * 0.5 + 0.5;

  return (
    <AbsoluteFill style={{background: '#070B33'}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1080,
          height: 1920,
          transform: `scale(${pull})`,
          transformOrigin: '540px 1100px',
        }}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <defs>
            <linearGradient id="s9bsky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#070B33" />
              <stop offset="1" stopColor="#10165E" />
            </linearGradient>
            <radialGradient id="s9bpool" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={LAMP} stopOpacity={0.5} />
              <stop offset="1" stopColor={LAMP} stopOpacity={0} />
            </radialGradient>
            <radialGradient id="s9bsen" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={SEN} stopOpacity={0.55} />
              <stop offset="1" stopColor={SEN} stopOpacity={0} />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#s9bsky)" />
          {/* dead window across the alley (stays dark) */}
          <rect x={620} y={330} width={330} height={700} fill="#0D123F" />
          <rect
            x={700}
            y={430}
            width={170}
            height={130}
            fill="#141A55"
            stroke={INK}
            strokeWidth={6}
          />
          {/* sen blaze into the dark */}
          <ellipse cx={270} cy={1180} rx={420} ry={330} fill="url(#s9bsen)" />
          <rect
            x={60}
            y={1010}
            width={420}
            height={700}
            fill={SEN_DARK}
            stroke={INK}
            strokeWidth={6}
          />
          <Sign x={270} y={1170} s={0.72} on={1} flicker={flick * 0.15} />
          {/* narrowing pool around the small figure */}
          <ellipse cx={600} cy={1560} rx={poolRx} ry={150} fill="url(#s9bpool)" />
          <Figure x={600} y={1580} s={0.55} hatOn brickInHand />
        </svg>
      </div>
      <Headline
        size={72}
        lines={[
          'Người từng',
          'xem thường bạn',
          <span key="a" style={{color: ICE}}>
            có thể đã quên.
          </span>,
          <span key="b">
            Còn bạn <span style={{color: SEN}}>vẫn sống</span>
          </span>,
          <span key="c">
            để họ <span style={{color: SEN}}>phải tiếc.</span>
          </span>,
        ]}
      />
    </AbsoluteFill>
  );
};

// Point along a polyline (for the chalk nib that must lead the line).
const polyPoint = (pts: Array<[number, number]>, t: number): [number, number] => {
  const segs: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0];
    const dy = pts[i + 1][1] - pts[i][1];
    const len = Math.sqrt(dx * dx + dy * dy);
    segs.push(len);
    total += len;
  }
  let want = clamp01(t) * total;
  for (let i = 0; i < segs.length; i++) {
    if (want <= segs[i] || i === segs.length - 1) {
      const k = segs[i] === 0 ? 0 : want / segs[i];
      return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)];
    }
    want -= segs[i];
  }
  return pts[pts.length - 1];
};

const ROOM_PTS: Array<[number, number]> = [
  [300, 1420],
  [300, 1120],
  [780, 1120],
  [780, 1420],
  [640, 1420],
  [640, 1300],
  [560, 1300],
  [560, 1420],
];
const roomPath = `M ${ROOM_PTS.map((p) => `${p[0]} ${p[1]}`).join(' L ')}`;

// s11 chalk room: contained right of the dead board (x > 480), with door notch (C5).
const S11_ROOM_PTS: Array<[number, number]> = [
  [580, 1560],
  [580, 1180],
  [900, 1180],
  [900, 1560],
  [780, 1560],
  [780, 1400],
  [700, 1400],
  [700, 1560],
];
const s11RoomPath = `M ${S11_ROOM_PTS.map((p) => `${p[0]} ${p[1]}`).join(' L ')}`;
// Dawn-facing window straddling the right wall + chair inside (jade, self-drawn with the room).
const S11_WINDOW_PATH = 'M 864 1224 H 936 V 1296 H 864 Z M 900 1224 V 1296 M 864 1260 H 936';
const S11_CHAIR_PATH =
  'M 640 1470 H 720 M 640 1470 V 1400 M 652 1470 L 646 1522 M 708 1470 L 714 1522';

// ---------- S10: night→dawn; step+place / bulbs-out+dawn / jade run+chalk ----------
export const S10Scene: React.FC = () => {
  const f = useCurrentFrame();
  const D = XDM_SHOTS.s10.durationInFrames;
  void D;
  // (1) step + place 0.4–2.45s
  const step = smooth(f, Math.round(0.4 * 30), Math.round(0.4 * 30) + Math.round(2.05 * 30));
  // (2) bulbs-out + dawn 1.8–3.2s
  const dawn = smooth(f, Math.round(1.8 * 30), Math.round(1.8 * 30) + Math.round(1.4 * 30));
  // (3) jade run + chalk start ≥2.6s
  const chalk = smooth(f, Math.round(2.6 * 30), Math.round(2.6 * 30) + 40);
  const sky = mixHex(COBALT_TOP, DAWN_A, dawn);
  const skyB = mixHex(COBALT_BOT, DAWN_B, dawn);
  const sunO = ramp(f, Math.round(2.2 * 30), 40);
  const figX = lerp(420, 540, step);
  const kneel = smooth(f, Math.round(1.2 * 30), Math.round(1.2 * 30) + 30);
  // Restaged above the caption pill (pill top ≈1515): feet on ground 1360,
  // brick hand 1254 → ground 1330 (C3).
  const brickY = lerp(
    1254,
    1330,
    smooth(f, Math.round(1.2 * 30), Math.round(1.2 * 30) + Math.round(1.25 * 30)),
  );
  const thud = ramp(f, Math.round(2.46 * 30), 4) * (1 - ramp(f, Math.round(2.46 * 30) + 14, 12));
  const [nibX, nibY] = polyPoint(ROOM_PTS, chalk);
  const birdX = lerp(-80, 1160, ramp(f, 110, 34));
  const chunk2 = f >= 80;

  return (
    <AbsoluteFill style={{background: sky}}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <defs>
          <linearGradient id="s10sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={sky} />
            <stop offset="0.62" stopColor={skyB} />
            <stop offset="0.62" stopColor={mixHex('#0D123F', '#B9C4E8', dawn)} />
            <stop offset="1" stopColor={mixHex('#0D123F', '#8E99C9', dawn)} />
          </linearGradient>
          <radialGradient id="s10sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={SUN} stopOpacity={0.9} />
            <stop offset="1" stopColor={SUN} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={1080} height={1920} fill="url(#s10sky)" />
        {/* first morning sun wash */}
        <ellipse cx={840} cy={620} rx={260} ry={200} fill="url(#s10sun)" opacity={sunO} />
        <circle cx={840} cy={620} r={64} fill={SUN} opacity={sunO} stroke={INK} strokeWidth={5} />
        {/* dead sign behind: bulbs die one by one across the dawn window */}
        <g opacity={1 - dawn * 0.55}>
          <rect
            x={60}
            y={1010}
            width={420}
            height={300}
            fill={SEN_DARK}
            stroke={INK}
            strokeWidth={6}
          />
          {Array.from({length: 7}).map((_, i) => {
            const off = ramp(f, Math.round(1.8 * 30) + i * 6, 6);
            return (
              <circle
                key={i}
                cx={110 + i * 53}
                cy={1040}
                r={12}
                fill={LAMP}
                opacity={0.9 * (1 - off)}
              />
            );
          })}
        </g>
        {/* ground (raised so the whole action zone clears the caption pill — C3) */}
        <rect x={0} y={1360} width={1080} height={560} fill={mixHex('#0D123F', '#9AA3D6', dawn)} />
        {/* distant bird */}
        <path
          d={`M ${birdX} 560 q 18 -16 36 0 q 18 -16 36 0`}
          stroke={INK}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
          opacity={ramp(f, 110, 8) * (1 - ramp(f, 136, 8))}
        />
        {/* placed brick on the ground (soft thud @2.46s = "đất"; hidden until the step — C8) */}
        <g transform={`translate(${figX + 120} ${brickY})`} opacity={ramp(f, 12, 6)}>
          <rect
            x={-52}
            y={-30}
            width={104}
            height={60}
            rx={5}
            fill={SEN}
            stroke={INK}
            strokeWidth={6}
          />
          <ellipse
            cx={0}
            cy={34}
            rx={70 + thud * 30}
            ry={12}
            fill={INK}
            opacity={0.25 + thud * 0.3}
          />
        </g>
        {/* paper dust on thud (hash-seeded offsets, frame-driven) */}
        {Array.from({length: 6}).map((_, i) => {
          const dx = ((i * 37 + 11) % 60) - 30;
          const dy = -((i * 53 + 7) % 44);
          return (
            <rect
              key={i}
              x={figX + 120 + dx + thud * dx * 1.6}
              y={brickY + dy * thud}
              width={10}
              height={14}
              fill={LAMP}
              opacity={thud * 0.9}
              transform={`rotate(${i * 30 + f} ${figX + 120 + dx} ${brickY})`}
            />
          );
        })}
        {/* jade light run on the ground toward the brick */}
        <line
          x1={figX}
          y1={1330}
          x2={figX + 120}
          y2={brickY}
          stroke={JADE}
          strokeWidth={10}
          strokeLinecap="round"
          opacity={chalk}
        />
        {/* chalk room draws itself; nib leads the line */}
        <path
          d={roomPath}
          fill="none"
          stroke={JADE}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - chalk}
          opacity={0.25 + 0.75 * chalk}
        />
        {chalk > 0 && chalk < 1 && (
          <g transform={`translate(${nibX} ${nibY})`}>
            <rect
              x={-6}
              y={-34}
              width={12}
              height={34}
              rx={6}
              fill={SHIRT}
              stroke={INK}
              strokeWidth={4}
            />
            <circle cx={0} cy={4} r={8} fill={JADE} stroke={INK} strokeWidth={4} />
          </g>
        )}
        {/* figure steps out, kneels, places (feet on the raised ground — C3) */}
        <Figure x={figX} y={1360} s={0.7} hatOn kneel={kneel} brickInHand={kneel < 0.9} />
      </svg>
      {chunk2 ? (
        <Caption
          lines={[
            <span key="a">
              Ngay chỗ <span style={{color: JADE}}>mình đang đứng.</span>
            </span>,
          ]}
        />
      ) : (
        <Caption
          lines={[
            'Viên gạch trên tay,',
            <span key="b">
              lần này, bạn đặt <span style={{color: JADE}}>xuống đất.</span>
            </span>,
          ]}
        />
      )}
    </AbsoluteFill>
  );
};

// ---------- S11: static hold — push 1.00→1.03 then DEAD stop, final 2.0s frozen ----------
export const S11Scene: React.FC = () => {
  const f = useCurrentFrame();
  const D = XDM_SHOTS.s11.durationInFrames;
  const FREEZE_AT = D - 60; // final 2.0s pure silence: zero motion
  const fm = Math.min(f, FREEZE_AT);
  const push = interpolate(fm, [0, FREEZE_AT], [1.0, 1.03], {
    easing: Easing.inOut(Easing.quad),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const hatT = smooth(fm, 0, Math.round(0.8 * 30)); // hat off 0–0.8s
  const chalkT = lerp(0.82, 1, smooth(fm, 0, 45)); // chalk completes 0–1.5s
  const sway = Math.sin(fm * 0.35) * 1.6; // wind on paper edges only

  return (
    <AbsoluteFill style={{background: DAWN_B}}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1080,
          height: 1920,
          transform: `scale(${push})`,
          transformOrigin: '540px 1100px',
        }}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <defs>
            <linearGradient id="s11sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={DAWN_A} />
              <stop offset="1" stopColor={DAWN_B} />
            </linearGradient>
            <radialGradient id="s11sun" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor={SUN} stopOpacity={0.55} />
              <stop offset="1" stopColor={SUN} stopOpacity={0} />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={1080} height={1920} fill="url(#s11sky)" />
          <ellipse cx={840} cy={560} rx={330} ry={240} fill="url(#s11sun)" />
          {/* back world: dead sen board, level with the chalk room (E12) */}
          <g opacity={0.9}>
            <rect
              x={120}
              y={980}
              width={360}
              height={420}
              fill={BOARD}
              stroke={INK}
              strokeWidth={6}
            />
            {/* sign remnant contained inside the plate bounds (C4) */}
            <rect
              x={150}
              y={1030}
              width={300}
              height={110}
              rx={20}
              fill={SEN_DARK}
              stroke={INK}
              strokeWidth={5}
            />
            <text
              x={300}
              y={1102}
              textAnchor="middle"
              fontFamily={HEAD_FONT}
              fontWeight={800}
              fontSize={40}
              fill={LAMP}
              opacity={0.5}
            >
              THẤY CHƯA?
            </text>
            {/* paper edge flutter (wind touches paper only) */}
            <g transform={`rotate(${sway} 480 980)`}>
              <rect
                x={380}
                y={950}
                width={100}
                height={40}
                fill="#D9DCF2"
                stroke={INK}
                strokeWidth={4}
              />
            </g>
          </g>
          {/* front world: completed jade chalk room, clear of the board (C5) */}
          <path
            d={s11RoomPath}
            fill="none"
            stroke={JADE}
            strokeWidth={10}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - chalkT}
          />
          {/* dawn-facing window on the right wall */}
          <path
            d={S11_WINDOW_PATH}
            fill="none"
            stroke={JADE}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - chalkT}
          />
          {/* chair inside the room */}
          <path
            d={S11_CHAIR_PATH}
            fill="none"
            stroke={JADE}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - chalkT}
          />
          <g transform={`rotate(${-sway} 300 1180)`}>
            <rect
              x={252}
              y={1150}
              width={96}
              height={38}
              fill="#D9DCF2"
              stroke={INK}
              strokeWidth={4}
            />
          </g>
          {/* ground line */}
          <rect x={0} y={1560} width={1080} height={360} fill="#C9D2F2" />
          <line x1={0} y1={1560} x2={1080} y2={1560} stroke={INK} strokeWidth={6} />
          {/* placed brick carried over from s10, at the figure's feet in the chalk area (C9) */}
          <g transform="translate(660 1530)">
            <rect
              x={-52}
              y={-30}
              width={104}
              height={60}
              rx={5}
              fill={SEN}
              stroke={INK}
              strokeWidth={6}
            />
            <rect x={-52} y={-30} width={104} height={10} fill={LAMP} opacity={0.5} />
          </g>
          {/* figure center between worlds; hat travels head → hand at side */}
          <Figure x={540} y={1560} s={0.78} hatOn={false} brickInHand={false} />
          <g
            transform={`translate(${lerp(540, 610, hatT)} ${lerp(1560 - 250, 1560 - 110, hatT)}) rotate(${lerp(
              0,
              24,
              hatT,
            )})`}
          >
            <path
              d="M -48 -6 L -20 -44 L 20 -44 L 48 -6 Z"
              fill={HAT}
              stroke={INK}
              strokeWidth={5}
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
      <Headline
        color={INK}
        lines={[
          'Viên gạch',
          'tiếp theo,',
          <span key="a">
            bạn đặt <span style={{color: JADE}}>cho ai?</span>
          </span>,
        ]}
      />
    </AbsoluteFill>
  );
};
