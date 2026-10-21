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
  FONT,
  INK,
  MOM_TOP,
  MessageBubble,
  MUTED,
  NightWindow,
  NIGHT_BG,
  NIGHT_DEEP,
  PhoneFrame,
  pushIn,
  ramp,
  SKIN,
  soft,
  WOOD,
} from './kit';
import {KTT_SHOTS} from './timeline';

// s4-s6 (scene-agent-2). Emotional core: drawing reveal, wife's confrontation, climax.
// Durations/sec from timeline.ts:
// s4 from ~555 dur ~210 sec 6.0; s5 from ~765 dur ~240 sec 7.0; s6 from ~1005 dur ~270 sec 8.0.

// ================= s4 RE-HOOK - DRAWING MISSING FATHER (6s) =================
// Drawing has mom and child, but one side empty. "Con chừa chỗ này cho ba. Ba về rồi, con mới vẽ."
export const KttS4: React.FC = () => {
  const f = useCurrentFrame();
  const dur = KTT_SHOTS.s4.duration;
  const zoom = pushIn(f, dur, 0.03);
  // Drawing appears
  const drawingIn = interpolate(f, [10, 40], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  // Pencil drawing dad's spot (dashed outline appears)
  const dashedIn = interpolate(f, [60, 100], [0, 1], clamp);
  // An points to empty spot
  const pointIn = interpolate(f, [100, 130], [0, 1], clamp);
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
          {/* Living room - close on drawing */}
          <rect x={80} y={120} width={920} height={500} rx={28} fill={NIGHT_DEEP} />
          <rect x={110} y={150} width={860} height={440} rx={18} fill="#151528" />
          <NightWindow x={140} y={160} w={300} h={380} />
          <NightWindow x={640} y={160} w={300} h={380} />
          {/* An holding drawing up */}
          <Bust x={540} y={650} mood="soft" child={true} scale={1.2} />
          {/* Drawing - large, centered */}
          <g opacity={drawingIn} transform="translate(290 780)">
            <ChildDrawing x={0} y={0} w={500} h={420} showEmpty={true} />
          </g>
          {/* Dashed outline animation for empty dad spot */}
          {f > 60 && (
            <g opacity={dashedIn} transform="translate(480 930)">
              <rect
                x={0}
                y={0}
                width={120}
                height={180}
                rx={20}
                fill="none"
                stroke={AMBER}
                strokeWidth={4}
                strokeDasharray="15 10"
                strokeDashoffset={interpolate(f, [60, 120], [100, 0], clamp)}
              />
              <text
                x={60}
                y={100}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={28}
                fontWeight={600}
                fill={AMBER}
                opacity={0.8}
              >
                Ba
              </text>
              <text
                x={60}
                y={130}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={22}
                fontWeight={600}
                fill={AMBER}
                opacity={0.7}
              >
                (chỗ trống)
              </text>
            </g>
          )}
          {/* An's pointing hand */}
          {f > 100 && (
            <g opacity={pointIn} transform="translate(480 1050)">
              <path
                d="M 0 0 L -40 -60 L -20 -60 L -20 -100 L 20 -100 L 20 -60 L 40 -60 Z"
                fill={SKIN}
                stroke={INK}
                strokeWidth={2}
              />
            </g>
          )}
          {/* Minh and Lan in background, watching */}
          <g opacity={0.4} transform="translate(200 0)">
            <Bust x={300} y={1100} mood="down" dad={true} scale={0.7} />
          </g>
          <g opacity={0.4} transform="translate(-200 0)">
            <Bust x={780} y={1100} mood="sad" mom={true} scale={0.7} />
          </g>
        </svg>
      </div>
      <CcCaps
        sec={6.0}
        duration={dur}
        dark={false}
        parts={[
          'Bức tranh có mẹ và con,',
          'nhưng một bên còn trống.',
          'Con chừa chỗ này cho ba.',
          'Ba về rồi, con mới vẽ.',
        ]}
        accents={['mẹ và con', 'bên còn trống', 'chỗ này cho ba', 'Ba về rồi']}
      />
    </AbsoluteFill>
  );
};

// ================= s5 WIFE'S CONFRONTATION (7s) =================
// Lan looks at Minh. Calm voice. "Con đợi anh mỗi tối. Em cũng từng như thế." Minh bows head, silent.
export const KttS5: React.FC = () => {
  const f = useCurrentFrame();
  const dur = KTT_SHOTS.s5.duration;
  const zoom = pushIn(f, dur, 0.025);
  // Lan turns to Minh
  const lanTurn = interpolate(f, [10, 50], [0, 1], {...clamp, easing: soft});
  // Minh bows head
  const minhBow = interpolate(f, [80, 130], [0, 1], {...clamp, easing: soft});
  // Warm glow builds as Lan speaks
  const warmGlow = interpolate(f, [30, 120], [0, 0.6], clamp);
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
          {/* Warm glow overlay */}
          <rect
            x={-100}
            y={-100}
            width={1280}
            height={2120}
            fill={AMBER}
            opacity={warmGlow * 0.08}
          />
          {/* Intimate close-up framing */}
          <rect x={140} y={180} width={800} height={900} rx={30} fill={NIGHT_DEEP} opacity={0.9} />
          {/* Lan - close up, firm but calm */}
          <g transform={`translate(${lanTurn * -80} 0)`}>
            <Bust x={380} y={600} mood="calm" mom={true} scale={1.5} />
            {/* Eyes locked on Minh */}
            <g transform="translate(380 606)">
              <circle cx={-34} cy={-4} r={8} fill={INK} />
              <circle cx={10} cy={-4} r={8} fill={INK} />
            </g>
          </g>
          {/* Minh - close up, bowing head */}
          <g transform={`translate(${minhBow * 60} ${minhBow * 80})`}>
            <Bust x={700} y={600} mood="down" dad={true} scale={1.5} />
          </g>
          {/* Drawing still visible in An's hands at bottom */}
          <g transform="translate(290 1300) scale(0.7)">
            <ChildDrawing x={0} y={0} w={500} h={420} showEmpty={true} />
          </g>
          {/* Phone on table between them */}
          <rect x={470} y={1150} width={140} height={240} rx={20} fill={INK} />
          <rect x={480} y={1160} width={120} height={220} rx={14} fill="#0D0D1A" />
        </svg>
      </div>
      <CcCaps
        sec={7.0}
        duration={dur}
        dark={false}
        parts={[
          'Lan nhìn Minh.',
          'Giọng rất bình tĩnh.',
          'Con đợi anh mỗi tối.',
          'Em cũng từng như thế.',
        ]}
        accents={['Lan nhìn Minh', 'bình tĩnh', 'mỗi tối', 'cũng từng như thế']}
      />
    </AbsoluteFill>
  );
};

// ================= s6 CLIMAX - TRUTH (8s) =================
// Lan places phone before Minh. "Em biết chuyện rồi. Em chỉ muốn nghe anh nói thật." Minh: "Anh... xin lỗi."
export const KttS6: React.FC = () => {
  const f = useCurrentFrame();
  const dur = KTT_SHOTS.s6.duration;
  const zoom = pushIn(f, dur, 0.035);
  // Phone slides to center
  const phoneSlide = interpolate(f, [10, 60], [1, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  // Message on screen revealed
  const msgReveal = interpolate(f, [70, 110], [0, 1], clamp);
  // Minh's reaction
  const minhReact = interpolate(f, [130, 180], [0, 1], {...clamp, easing: soft});
  // Cold blue wash over scene
  const coldWash = interpolate(f, [100, dur], [0, 0.4], clamp);
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
          {/* Cold wash overlay */}
          <rect x={0} y={0} width={1080} height={1920} fill={COLD} opacity={coldWash} />
          {/* Table surface */}
          <rect x={140} y={500} width={800} height={100} rx={12} fill={WOOD} opacity={0.8} />
          {/* Phone sliding to center */}
          <g transform={`translate(${phoneSlide * 200} 0)`}>
            <PhoneFrame x={290} y={580} w={500} h={800} border={COLD}>
              <g>
                {/* Chat screen with revealed messages */}
                <rect x={310} y={600} width={460} height={600} rx={16} fill="#0D0D1A" />
                {/* Match app header */}
                <rect x={310} y={600} width={460} height={80} rx={16} fill={COLD} />
                <text
                  x={540}
                  y={648}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize={36}
                  fontWeight={600}
                  fill="#FFFFFF"
                >
                  Tinder
                </text>
                {/* Messages */}
                <g opacity={msgReveal}>
                  <MessageBubble
                    x={350}
                    y={720}
                    text="Em nhớ anh. Bao giờ mình gặp lại?"
                    w={380}
                    fromMe={false}
                  />
                  <MessageBubble x={350} y={850} text="Anh bận à? 😢" w={380} fromMe={false} />
                  <MessageBubble
                    x={350}
                    y={980}
                    text="Cuối tuần này tự do không?"
                    w={380}
                    fromMe={false}
                  />
                </g>
                <rect x={490} y={1320} width={100} height={10} rx={5} fill={INK} opacity={0.85} />
              </g>
            </PhoneFrame>
          </g>
          {/* Lan's hand placing phone */}
          {f < 80 && (
            <g transform="translate(540 1350)">
              <rect x={-50} y={-40} width={100} height={160} rx={20} fill={SKIN} />
              <ellipse cx={0} cy={80} rx={50} ry={20} fill={MOM_TOP} />
            </g>
          )}
          {/* Minh's face - realization */}
          <g transform={`translate(0 ${minhReact * 40})`}>
            <Bust x={540} y={350} mood="down" dad={true} scale={1.8} />
          </g>
          {/* Lan's face - firm */}
          <Bust x={540} y={1150} mood="calm" mom={true} scale={1.2} />
        </svg>
      </div>
      <CcCaps
        sec={8.0}
        duration={dur}
        dark={false}
        parts={[
          'Lan đặt điện thoại trước mặt Minh.',
          'Em biết chuyện rồi.',
          'Em chỉ muốn nghe anh nói thật.',
          'Minh cúi đầu: Anh... xin lỗi.',
        ]}
        accents={['điện thoại', 'biết chuyện rồi', 'nghe anh nói thật', 'xin lỗi']}
      />
    </AbsoluteFill>
  );
};
