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
  DinnerTable,
  FONT,
  INK,
  MessageBubble,
  MUTED,
  NightWindow,
  NIGHT_BG,
  NIGHT_DEEP,
  NotifBadge,
  PhoneFrame,
  pushIn,
  ramp,
  SKIN,
  soft,
  WOOD,
} from './kit';
import {KTT_SHOTS} from './timeline';

// s1-s3 (scene-agent-1). Night cold, captions light (CREAM pill) via kit CcCaps.
// Durations/sec from timeline.ts (voice Thanh Long = script):
// s1 from 0 dur ~135 sec 3.0; s2 from ~135 dur ~210 sec 6.0; s3 from ~345 dur ~210 sec 6.0.
// Captions join with single spaces to the verbatim voice.json lines. All text
// weight 600 (Be Vietnam Pro 600, design-spec §3). Mock phone only via kit
// PhoneFrame (pill "minh hoạ" built in). No caption/phone forks, no network import.

// ---- shared bits (night apartment) ----
const NightApartment: React.FC<{y?: number}> = ({y = 100}) => (
  <g>
    <rect x={80} y={y} width={920} height={440} rx={28} fill={NIGHT_DEEP} />
    <rect x={110} y={y + 30} width={860} height={380} rx={18} fill="#151528" />
    <NightWindow x={140} y={y + 40} w={300} h={340} />
    <NightWindow x={640} y={y + 40} w={300} h={340} />
    <rect x={110} y={y + 350} width={860} height={60} fill={WOOD} opacity={0.7} />
  </g>
);

// ================= s1 HOOK (3s + 15f hold) =================
// Close-up phone showing message: "Em nhớ anh. Bao giờ mình gặp lại?"
export const KttS1: React.FC = () => {
  const f = useCurrentFrame();
  const dur = KTT_SHOTS.s1.duration;
  // Phone appears with pop, message fades in
  const pop = interpolate(f, [2, 20], [0.5, 1], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const msgIn = interpolate(f, [25, 45], [0, 1], {...clamp, easing: soft});
  // Slow zoom
  const zoom = pushIn(f, dur, 0.04);
  return (
    <AbsoluteFill style={{background: NIGHT_BG, overflow: 'hidden'}}>
      <CcFonts />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${zoom})`,
          transformOrigin: '50% 55%',
        }}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={1920} fill={NIGHT_BG} />
          <NightApartment />
          {/* desk / nightstand */}
          <rect x={0} y={1300} width={1080} height={620} fill={WOOD} />
          <rect x={0} y={1290} width={1080} height={18} fill="#2A2A3A" />
          <ellipse cx={540} cy={1350} rx={320} ry={28} fill={INK} opacity={0.2} />
          {/* Phone with message */}
          <PhoneFrame x={270} y={580} w={540} h={860} border={INK}>
            <g transform={`translate(540 920) scale(${pop}) translate(-540 -920)`}>
              {/* Chat background */}
              <rect x={300} y={600} width={480} height={520} rx={20} fill="#0D0D1A" />
              {/* Message from "Em" */}
              <g opacity={msgIn}>
                <MessageBubble x={340} y={650} text="Em nhớ anh." w={400} fromMe={false} />
                <MessageBubble
                  x={340}
                  y={770}
                  text="Bao giờ mình gặp lại?"
                  w={400}
                  fromMe={false}
                />
              </g>
              {/* Time indicator */}
              <text
                x={540}
                y={1220}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={28}
                fontWeight={600}
                fill={MUTED}
              >
                22:14 · Hôm nay
              </text>
              <rect x={490} y={1280} width={100} height={10} rx={5} fill={INK} opacity={0.85} />
            </g>
            {/* Notif badge on top right */}
            <g opacity={interpolate(f, [5, 15], [0, 1], clamp)}>
              <NotifBadge cx={750} cy={660} r={30} />
            </g>
          </PhoneFrame>
        </svg>
      </div>
      <CcCaps
        sec={3.0}
        duration={dur}
        dark={false}
        parts={['Anh tưởng mình giấu được tất cả.']}
        accents={['giấu được tất cả']}
      />
    </AbsoluteFill>
  );
};

// ================= s2 COLD DINNER (6s) =================
// 22:15. Lan reheating soup for the 3rd time. Two empty chairs.
export const KttS2: React.FC = () => {
  const f = useCurrentFrame();
  const dur = KTT_SHOTS.s2.duration;
  const zoom = pushIn(f, dur, 0.03);
  // Microwave light pulse
  const microwavePulse = 0.3 + 0.3 * Math.abs(Math.sin(f / 8));
  // Steam from bowl (subtle)
  const steamY = interpolate(f, [0, dur], [100, -50], clamp);
  const steamO = interpolate(f, [0, dur], [0.6, 0.1], clamp);
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
          {/* Kitchen/dining area */}
          <rect x={80} y={120} width={920} height={500} rx={28} fill={NIGHT_DEEP} />
          <rect x={110} y={150} width={860} height={440} rx={18} fill="#151528" />
          {/* Window with rain */}
          <NightWindow x={140} y={160} w={300} h={380} />
          <NightWindow x={640} y={160} w={300} h={380} />
          {/* Microwave */}
          <rect
            x={700}
            y={420}
            width={200}
            height={140}
            rx={16}
            fill={microwavePulse > 0.5 ? '#3A4A5A' : '#2A3A4A'}
            opacity={0.9}
          />
          <rect x={720} y={440} width={160} height={80} rx={8} fill="#0D0D1A" />
          <text
            x={800}
            y={495}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={32}
            fontWeight={600}
            fill={microwavePulse > 0.5 ? AMBER : MUTED}
          >
            22:15
          </text>
          {/* Dinner table with 2 empty chairs */}
          <DinnerTable x={540} y={800} hasFood={true} emptyChairs={2} />
          {/* Bowl being reheated - steam */}
          <g opacity={steamO}>
            <path
              d={`M 480 ${850 + steamY} q 20 -30 40 -50 q 20 20 40 0`}
              stroke={CREAM}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              opacity={0.5}
            />
            <path
              d={`M 540 ${830 + steamY} q 20 -35 40 -55 q 20 20 40 0`}
              stroke={CREAM}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              opacity={0.4}
            />
            <path
              d={`M 600 ${850 + steamY} q 20 -30 40 -50 q 20 20 40 0`}
              stroke={CREAM}
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              opacity={0.5}
            />
          </g>
          {/* Lan's silhouette at table */}
          <Bust x={540} y={950} mood="sad" mom={true} scale={0.85} />
          {/* Clock on wall */}
          <circle cx={940} cy={200} r={60} fill="#1A1A2E" stroke={WOOD} strokeWidth={6} />
          <text
            x={940}
            y={210}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={36}
            fontWeight={600}
            fill={MUTED}
          >
            22:15
          </text>
          <line
            x1={940}
            y1={200}
            x2={940 + Math.cos(-Math.PI / 2) * 45}
            y2={200 + Math.sin(-Math.PI / 2) * 45}
            stroke={CREAM}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <line
            x1={940}
            y1={200}
            x2={940 + Math.cos(-Math.PI / 6) * 30}
            y2={200 + Math.sin(-Math.PI / 6) * 30}
            stroke={CREAM}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <CcCaps
        sec={6.0}
        duration={dur}
        dark={false}
        parts={['Đêm ấy, vợ anh lại hâm canh.', 'Lần thứ ba.', 'Hai chiếc ghế trống.']}
        accents={['hâm canh', 'Lần thứ ba', 'ghế trống']}
      />
    </AbsoluteFill>
  );
};

// ================= s3 HUSBAND RETURNS (6s) =================
// Minh enters, puts phone down. Lan doesn't ask. An runs with drawing.
export const KttS3: React.FC = () => {
  const f = useCurrentFrame();
  const dur = KTT_SHOTS.s3.duration;
  const zoom = pushIn(f, dur, 0.025);
  // Door opens at ~f15
  const doorOpen = interpolate(f, [15, 45], [0, 1], {...clamp, easing: soft});
  // Minh walks in
  const minhX = interpolate(f, [20, 70], [1200, 540], {...clamp, easing: soft});
  // Lan turns head slightly
  const lanTurn = interpolate(f, [50, 80], [0, 1], clamp);
  // An runs in from right with drawing
  const anX = interpolate(f, [60, 100], [1200, 540], {...clamp, easing: soft});
  const anDrawingScale = interpolate(f, [100, 120], [0.5, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
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
          {/* Living room */}
          <rect x={80} y={120} width={920} height={500} rx={28} fill={NIGHT_DEEP} />
          <rect x={110} y={150} width={860} height={440} rx={18} fill="#151528" />
          <NightWindow x={140} y={160} w={300} h={380} />
          <NightWindow x={640} y={160} w={300} h={380} />
          {/* Door */}
          <g transform={`translate(${(1 - doorOpen) * 120} 0)`}>
            <rect x={80} y={120} width={120} height={500} fill={WOOD} />
          </g>
          {/* Door frame */}
          <rect x={80} y={120} width={8} height={500} fill="#2A2A3A" />
          <rect x={192} y={120} width={8} height={500} fill="#2A2A3A" />
          {/* Dinner table in background */}
          <DinnerTable x={540} y={750} hasFood={true} emptyChairs={2} />
          {/* Lan at table - turns to look */}
          <g transform={`translate(540 950) rotate(${lanTurn * -10}) translate(-540 -950)`}>
            <Bust x={540} y={950} mood="sad" mom={true} scale={0.8} />
          </g>
          {/* Minh entering */}
          <g transform={`translate(${minhX} 0)`}>
            <Bust x={540} y={850} mood="down" dad={true} scale={1.1} />
            {/* Phone in hand, then placing on table */}
            {f > 70 && (
              <g transform={`translate(540 1100)`}>
                <rect x={-40} y={-20} width={80} height={140} rx={12} fill={INK} />
                <rect x={-30} y={-10} width={60} height={120} rx={8} fill="#0D0D1A" />
              </g>
            )}
          </g>
          {/* An running in with drawing */}
          {f > 60 && (
            <g transform={`translate(${anX} 0) scale(${anDrawingScale})`}>
              <Bust x={540} y={1050} mood="soft" child={true} scale={0.9} />
              {/* Drawing in hand */}
              <g transform={`translate(540 1150) rotate(-10)`}>
                <rect
                  x={-60}
                  y={-80}
                  width={120}
                  height={160}
                  rx={8}
                  fill="#FEFEFE"
                  stroke="#D0D0D0"
                  strokeWidth={3}
                />
                <text
                  x={0}
                  y={40}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize={24}
                  fontWeight={600}
                  fill={INK}
                >
                  🎨
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>
      <CcCaps
        sec={6.0}
        duration={dur}
        dark={false}
        parts={[
          'Minh bước vào, úp điện thoại xuống bàn.',
          'Lan không hỏi.',
          'Bé An chạy tới, cầm một tờ giấy.',
        ]}
        accents={['úp điện thoại', 'không hỏi', 'Bé An']}
      />
    </AbsoluteFill>
  );
};
