import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {CharacterPuppet} from '../../animation/CharacterPuppet';
import {
  bagDisplacement,
  blendPose,
  locomotionPose,
  punchPose,
  pushupPose,
  smoothstep,
} from '../../animation/character-motion';

const FPS = 30;
const GROUND = 880;
const BG = '#0A0E1A';

const Stage: React.FC<{children: React.ReactNode; caption: string}> = ({children, caption}) => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse at 60% 40%, #283047 0%, #12192C 48%, #070A12 100%)',
      color: '#EDEBE9',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    <svg
      viewBox="0 0 1920 1080"
      width="100%"
      height="100%"
      style={{position: 'absolute', inset: 0}}
    >
      <defs>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#333B51" />
          <stop offset="1" stopColor={BG} />
        </linearGradient>
      </defs>
      <rect x="0" y={GROUND} width="1920" height="200" fill="url(#floor)" />
      <rect x="0" y={GROUND} width="1920" height="3" fill="#778197" opacity={0.55} />
      <ellipse cx="900" cy="920" rx="670" ry="40" fill="#E1A8A0" opacity={0.045} />
      {children}
    </svg>
    <div
      style={{
        position: 'absolute',
        top: 86,
        left: 118,
        fontSize: 31,
        fontWeight: 700,
        letterSpacing: 7,
        color: '#E9BCB3',
      }}
    >
      CHARACTER MOTION LAB
    </div>
    <div
      style={{
        position: 'absolute',
        bottom: 64,
        left: 118,
        fontSize: 27,
        fontWeight: 600,
        letterSpacing: 4,
        color: '#A8B6CC',
      }}
    >
      {caption}
    </div>
  </AbsoluteFill>
);

const WalkToRun: React.FC = () => {
  const f = useCurrentFrame();
  const time = f / FPS;
  const runStart = 1.6;
  const walk = locomotionPose({
    time,
    originX: 340,
    groundY: GROUND,
    speed: 150,
    mode: 'walk',
  });
  const run = locomotionPose({
    time: Math.max(0, time - runStart),
    originX: 340 + 150 * runStart,
    groundY: GROUND,
    speed: 280,
    mode: 'run',
  });
  const mix = smoothstep((time - runStart) / 0.24);
  const pose = time < runStart ? walk : blendPose(walk, run, mix);
  return (
    <Stage caption="01 / FOOT-LOCK WALK → RUN">
      <g opacity={0.18}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={i * 260 - 20}
            y={350 + (i % 3) * 40}
            width={92}
            height={GROUND - 350 - (i % 3) * 40}
            fill="#48536C"
          />
        ))}
      </g>
      <CharacterPuppet pose={pose} />
    </Stage>
  );
};

const Pushups: React.FC = () => {
  const frame = useCurrentFrame();
  const pose = pushupPose({time: frame / FPS, originX: 815, groundY: GROUND});
  return (
    <Stage caption="02 / HAND + TOE CONTACT / BODY WEIGHT">
      <rect x="480" y={GROUND - 8} width="800" height="8" rx="4" fill="#AE6E73" opacity="0.6" />
      <CharacterPuppet pose={pose} />
    </Stage>
  );
};

const Boxing: React.FC = () => {
  const frame = useCurrentFrame();
  const time = frame / FPS;
  const baseX = 1070;
  const bagRadius = 78;
  const offset = bagDisplacement(time);
  const pose = punchPose({time, originX: 760, groundY: GROUND, bagX: baseX, bagRadius});
  return (
    <Stage caption="03 / HAND TARGET IK + DAMPED BAG REACTION">
      <rect x="1025" y="105" width="90" height="16" rx="8" fill="#A7B4C9" />
      <path d={`M 1070 121 L ${baseX + offset} 352`} stroke="#77879B" strokeWidth="8" />
      <ellipse cx={baseX + offset} cy={GROUND + 12} rx="110" ry="15" fill="#000" opacity="0.35" />
      <g transform={`translate(${offset} 0)`}>
        <rect
          x={baseX - bagRadius}
          y="350"
          width={bagRadius * 2}
          height="410"
          rx="68"
          fill="#A84C58"
        />
        <rect
          x={baseX - bagRadius + 8}
          y="372"
          width="26"
          height="360"
          rx="13"
          fill="#DE7D7C"
          opacity="0.45"
        />
        <line
          x1={baseX - 68}
          y1="432"
          x2={baseX + 68}
          y2="432"
          stroke="#422534"
          strokeWidth="7"
          opacity="0.65"
        />
        <line
          x1={baseX - 68}
          y1="678"
          x2={baseX + 68}
          y2="678"
          stroke="#422534"
          strokeWidth="7"
          opacity="0.65"
        />
      </g>
      <CharacterPuppet pose={pose} />
    </Stage>
  );
};

/** Technical, silent 10s reference render. Not a finished narrative or a sourced film. */
export const CharacterMotionLabReel: React.FC = () => (
  <>
    <Sequence from={0} durationInFrames={96}>
      <WalkToRun />
    </Sequence>
    <Sequence from={96} durationInFrames={84}>
      <Pushups />
    </Sequence>
    <Sequence from={180} durationInFrames={120}>
      <Boxing />
    </Sequence>
  </>
);
