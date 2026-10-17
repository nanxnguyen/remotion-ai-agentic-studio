// ScenesE.tsx — chung-minh-de-lam-gi (scene-agent E, Phase 7 build)
// s7b: H2b turn — medal drifts up-out (opacity), chest dashed outline + flat orange core @70%.
// 107f @30fps = 3.57s. Reuses ProtoTurn design + frame-driven medal fade.
// s8: evidence — white line + 4 week ticks (static), hero chip entrance 0.3-3.8s + fade 0.3s.
// 123f @30fps = 4.10s. Voice carries, no SFX.
// s9a: H3a spine — mirror duet stagger-in (masked rise 115% -> -10% -> 0, 14f+6f), ? pops.
// 97f @30fps = 3.23s. Water drips SFX. T6: no motion-blur.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, draw, drift} from '../../../chung-minh-de-lam-gi/proto/tokens';
import {FONT_CSS} from '../../../chung-minh-de-lam-gi/proto/fonts';
import {Medal, Que, Mirror, BeamFan} from '../../../chung-minh-de-lam-gi/proto/figures';
import {Caption, Chip, MinhHoa} from '../../../chung-minh-de-lam-gi/proto/text';

// ---------- s7b ----------
export const DUR_S7B = 107;

export const S7bScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S7B - 1));
  // Medal drifts up and fades (opacity only — flat, T6).
  const medalOut = interpolate(frame, [10, 60], [0, 1], {...clamp, easing: drift});
  const chestIn = interpolate(frame, [18, 48], [0, 1], clamp);
  const glow = interpolate(frame, [40, 70], [0, 0.7], clamp);
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <g opacity={1 - medalOut} transform={`translate(0 ${(-medalOut * 160).toFixed(1)})`}>
            <Medal x={540} y={560} r={120} dim={medalOut > 0.4} />
          </g>
          <g opacity={chestIn}>
            <Que x={540} y={1150} s={1.25} face="droop" />
            <rect
              x={470}
              y={985}
              width={140}
              height={130}
              rx={40}
              fill="none"
              stroke={C.white}
              strokeWidth={8}
              strokeDasharray="22 16"
            />
            <ellipse cx={540} cy={1050} rx={44} ry={40} fill={C.orange} opacity={glow} />
          </g>
        </svg>
      </AbsoluteFill>
      <Caption
        chunks={['Nó chỉ treo yên', 'trên tường. Còn câu nói', 'vẫn nằm trong ngực.']}
        accents={['treo yên', 'nằm trong ngực.']}
      />
    </AbsoluteFill>
  );
};

// ---------- s8 ----------
export const DUR_S8 = 123;
const CHIP_START = 9; // 0.3s * 30
const CHIP_END = 123 - 9; // fade 0.3s before cut

export const S8Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S8 - 1));
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <line x1={140} y1={1250} x2={940} y2={1250} stroke={C.grey} strokeWidth={6} />
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={260 + i * 200} cy={1050} r={12} fill={C.white} />
          ))}
          <line
            x1={200}
            y1={1050}
            x2={880}
            y2={1050}
            stroke={C.white}
            strokeWidth={14}
            strokeLinecap="round"
          />
          <Medal x={170} y={1050} r={52} />
          <ellipse
            cx={880}
            cy={1050}
            rx={60}
            ry={34}
            fill="none"
            stroke={C.orange}
            strokeWidth={8}
            strokeDasharray="16 12"
          />
          <Que x={540} y={1450} s={0.8} face="calm" />
        </svg>
      </AbsoluteFill>
      <Caption chunks={['Có nghiên cứu theo dõi', 'bốn tuần: đạt điều']} />
      <Chip
        text="Nghiên cứu dọc 4 tuần (J. Personality 2010, abstract): đạt mục tiêu ngoại lai không tăng wellbeing"
        from={CHIP_START}
        to={CHIP_END}
        top={120}
      />
    </AbsoluteFill>
  );
};

// ---------- s9a ----------
export const DUR_S9A = 97;
const MASK_RISE_START = 0;
const MASK_RISE_END = 14;
const OVERSHOOT_END = 20;

export const S9aScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + 0.03 * (frame / (DUR_S9A - 1));
  // Mirror duet stagger-in: masked rise 115% -> -10% -> 0, 14f+6f, 2f/char-equiv.
  const riseT = interpolate(frame, [MASK_RISE_START, MASK_RISE_END], [0, 1], {
    ...clamp,
    easing: draw,
  });
  const overT = interpolate(frame, [MASK_RISE_END, OVERSHOOT_END], [1, 0], clamp);
  const scale = 1.15 + 0.15 * overT; // 115% -> 105% -> 100%
  const yOffset = -10 * riseT; // masked rise from below
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <style>{FONT_CSS}</style>
      <AbsoluteFill style={{transform: `scale(${zoom.toFixed(4)})`}}>
        <svg
          viewBox="0 0 1080 1920"
          width="1080"
          height="1920"
          style={{position: 'absolute', inset: 0}}
        >
          <Mirror x={540} y={950} />
          <g transform={`translate(540 ${1150 + yOffset}) scale(${scale.toFixed(4)})`}>
            <Que x={0} y={0} s={1.0} face="calm" />
            <Que x={280} y={0} s={1.0} face="calm" flip opacity={0.85} />
          </g>
          <text
            x={680}
            y={600}
            textAnchor="middle"
            fontFamily="'Lexend', 'Be Vietnam Pro', sans-serif"
            fontWeight={700}
            fontSize={110}
            fill={C.white}
            opacity={frame > 30 ? 1 : 0}
          >
            ?
          </text>
        </svg>
      </AbsoluteFill>
      <Caption
        chunks={['Nửa đêm, bạn soi gương', 'thật lâu, không sửa tóc,']}
        accents={['gương']}
      />
    </AbsoluteFill>
  );
};
