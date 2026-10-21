import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {
  AMBER,
  AMBER_WARM,
  Bust,
  ChildDrawing,
  CcCaps,
  CcFonts,
  clamp,
  COLD,
  COLD_DARK,
  CREAM,
  EndingText,
  FONT,
  INK,
  MUTED,
  NIGHT_BG,
  NIGHT_DEEP,
  pushIn,
  ramp,
  SKIN,
  WarmGlow,
  WOOD,
} from './kit';
import {KTT_SHOTS} from './timeline';

// s7-s8 (scene-agent-3). Resolution: wife leaves with child, empty drawing remains.
// Durations/sec from timeline.ts:
// s7 from ~1275 dur ~210 sec 6.0; s8 from ~1485 dur ~135 sec 3.0 + 30f hold.

// ================= s7 WIFE LEAVES (6s) =================
// Lan takes child's hand, walks to bedroom. "Xin lỗi không làm mọi chuyện như cũ được, anh à."
export const KttS7: React.FC = () => {
  const f = useCurrentFrame();
  const dur = KTT_SHOTS.s7.duration;
  const zoom = pushIn(f, dur, 0.03);
  // Lan and An walk away
  const walkAway = interpolate(f, [20, 120], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });
  // Door closes
  const doorClose = interpolate(f, [140, 180], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  // Minh left alone
  const aloneGlow = interpolate(f, [180, dur], [0, 0.5], clamp);
  return (
    <AbsoluteFill style={{background: NIGHT_BG, overflow: 'hidden'}}>
      <CcFonts />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: '50% 50%',
        }}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={1920} fill={NIGHT_BG} />
          {/* Hallway to bedroom */}
          <rect x={200} y={120} width={680} height={800} rx={20} fill={NIGHT_DEEP} />
          <rect x={220} y={140} width={640} height={760} rx={16} fill="#151528" />
          {/* Bedroom door at end of hall */}
          <g transform={`translate(0 ${(1 - doorClose) * -300})`}>
            <rect x={460} y={140} width={160} height={300} fill={WOOD} />
          </g>
          <rect x={460} y={140} width={8} height={300} fill="#2A2A3A" />
          <rect x={612} y={140} width={8} height={300} fill="#2A2A3A" />
          {/* Door handle */}
          <circle cx={590} cy={280} r={12} fill="#C9B896" />
          {/* Lan and An walking away from camera */}
          <g
            transform={`translate(${walkAway * -150} ${walkAway * 200}) scale(${1 - walkAway * 0.3})`}
          >
            {/* Lan */}
            <Bust x={540} y={600} mood="calm" mom={true} scale={1.2} />
            {/* An holding Lan's hand */}
            <Bust x={500} y={720} mood="soft" child={true} scale={0.9} />
            {/* Hand connection */}
            <path
              d="M 490 680 q 10 30 30 40"
              stroke={SKIN}
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
            />
          </g>
          {/* Minh alone at table - small in foreground */}
          <g opacity={aloneGlow} transform="translate(0 400)">
            <Bust x={540} y={1100} mood="down" dad={true} scale={0.8} />
          </g>
          {/* Drawing left on table */}
          <g transform="translate(290 900) scale(0.6)">
            <ChildDrawing x={0} y={0} w={500} h={420} showEmpty={true} />
          </g>
          {/* Phone still on table, screen dark */}
          <rect x={470} y={800} width={140} height={240} rx={20} fill={INK} opacity={0.7} />
          <rect x={480} y={810} width={120} height={220} rx={14} fill="#0D0D1A" opacity={0.7} />
        </svg>
      </div>
      <CcCaps
        sec={6.0}
        duration={dur}
        dark={false}
        parts={[
          'Lan nắm tay con, đi về phía phòng ngủ.',
          'Xin lỗi không làm mọi chuyện như cũ được,',
          'anh à.',
        ]}
        accents={['nắm tay con', 'phòng ngủ', 'như cũ được', 'anh à']}
      />
    </AbsoluteFill>
  );
};

// ================= s8 ENDING - EMPTY SPACE (3s + 30f hold) =================
// Minh looks at empty space in drawing. Clock ticking. No dialogue.
// Text: "Có những khoảng trống... không thể lấp bằng một lời xin lỗi."
export const KttS8: React.FC = () => {
  const f = useCurrentFrame();
  const dur = KTT_SHOTS.s8.duration;
  const zoom = pushIn(f, dur, 0.02);
  // Camera slowly pushes into drawing
  const drawingZoom = interpolate(f, [0, dur], [1, 1.5], {
    ...clamp,
    easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  });
  // Clock tick visual
  const tick = Math.floor(f / 15) % 2 === 0;
  // Minh's gaze
  const gazeShift = interpolate(f, [30, 90], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: NIGHT_BG, overflow: 'hidden'}}>
      <CcFonts />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: '50% 50%',
        }}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={1920} fill={NIGHT_BG} />
          {/* Dark room, only drawing lit */}
          <rect x={0} y={0} width={1080} height={1920} fill={NIGHT_DEEP} />
          {/* Spotlight on drawing */}
          <ellipse cx={540} cy={700} rx={400} ry={350} fill={AMBER} opacity={0.08} />
          {/* Drawing - large, centered, zooming in */}
          <g transform={`translate(290 400) scale(${drawingZoom}) translate(-290 -400)`}>
            <ChildDrawing x={0} y={0} w={500} h={420} showEmpty={true} />
            {/* Highlight the empty dad space */}
            <g opacity={interpolate(f, [60, dur], [0, 1], clamp)}>
              <rect
                x={190}
                y={150}
                width={120}
                height={180}
                rx={20}
                fill="none"
                stroke={AMBER_WARM}
                strokeWidth={5}
                strokeDasharray="20 15"
                strokeDashoffset={interpolate(f, [60, dur], [50, 0], clamp)}
              />
              <circle cx={250} cy={240} r={8} fill={AMBER_WARM} opacity={0.8} />
              <circle
                cx={250}
                cy={240}
                r={20}
                fill="none"
                stroke={AMBER_WARM}
                strokeWidth={2}
                opacity={0.4}
              />
            </g>
          </g>
          {/* Clock on wall - ticking */}
          <g transform="translate(880 180)">
            <circle cx={0} cy={0} r={50} fill={NIGHT_DEEP} stroke={WOOD} strokeWidth={4} />
            {/* Clock face */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
              <line
                key={angle}
                x1={Math.cos((angle * Math.PI) / 180) * 38}
                y1={Math.sin((angle * Math.PI) / 180) * 38}
                x2={Math.cos((angle * Math.PI) / 180) * 45}
                y2={Math.sin((angle * Math.PI) / 180) * 45}
                stroke={CREAM}
                strokeWidth={2}
                strokeLinecap="round"
              />
            ))}
            {/* Hour hand */}
            <line
              x1={0}
              y1={0}
              x2={Math.cos(((-90 + 22.5 * 5) * Math.PI) / 180) * 25}
              y2={Math.sin(((-90 + 22.5 * 5) * Math.PI) / 180) * 25}
              stroke={CREAM}
              strokeWidth={4}
              strokeLinecap="round"
            />
            {/* Minute hand - ticks */}
            <line
              x1={0}
              y1={0}
              x2={Math.cos(((-90 + 6 * (f / 15)) * Math.PI) / 180) * 35}
              y2={Math.sin(((-90 + 6 * (f / 15)) * Math.PI) / 180) * 35}
              stroke={AMBER}
              strokeWidth={3}
              strokeLinecap="round"
            />
            {/* Center */}
            <circle cx={0} cy={0} r={6} fill={AMBER} />
          </g>
          {/* Minh sitting in shadow, looking at drawing */}
          <g opacity={0.6} transform="translate(0 300)">
            <Bust x={540} y={1200} mood="down" dad={true} scale={0.7} />
            {/* Head turn toward drawing */}
            <g transform={`translate(540 1206) rotate(${gazeShift * -15}) translate(-540 -1206)`}>
              <g transform="translate(540 1206)">
                <circle cx={-34} cy={-4} r={6} fill={INK} />
                <circle cx={10} cy={-4} r={6} fill={INK} />
              </g>
            </g>
          </g>
          {/* Phone on table - dark, ignored */}
          <rect x={470} y={1300} width={140} height={240} rx={20} fill={INK} opacity={0.4} />
          <rect x={480} y={1310} width={120} height={220} rx={14} fill="#0D0D1A" opacity={0.4} />
          {/* Ending text */}
          <EndingText f={f} duration={dur} />
        </svg>
      </div>
      {/* No captions for s8 - pure visual + ending text */}
    </AbsoluteFill>
  );
};
