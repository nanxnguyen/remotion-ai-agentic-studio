import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {
  AMBER,
  Bust,
  CcCaps,
  CcFonts,
  ChatBubble,
  COLD,
  COLD_DARK,
  DAY_BG,
  DESK,
  FONT,
  INK,
  MISS,
  MissedBadge,
  MUTED,
  PhoneFrame,
  SKIN,
  bob,
  clamp,
  ramp,
} from './kit';

// s1-s3 rebuild v2 (scene-agent-1). Day cold, captions dark (INK pill) via kit CcCaps.
// Durations/sec from timeline.ts (voice Thanh Long v3 = script v2):
// s1 from 0 dur 114 sec 2.80; s2 from 114 dur 99 sec 2.80; s3 from 213 dur 193 sec 5.92.
// Captions join with single spaces to the verbatim voice.json v2 lines. All text
// weight 600 (Be Vietnam Pro 600, design-spec §3). Mock phone only via kit
// PhoneFrame (pill "minh hoạ" built in). No caption/phone forks, no network import.

// ---- shared bits (day office) ----
const DayWindow: React.FC<{y?: number}> = ({y = 120}) => (
  <g>
    <rect x={80} y={y} width={920} height={420} rx={28} fill="#D5E2EA" />
    <rect x={110} y={y + 30} width={890} height={360} rx={18} fill="#F4F8FA" />
    <line x1={540} y1={y + 30} x2={540} y2={y + 390} stroke={DESK} strokeWidth={10} />
    <circle cx={850} cy={y + 120} r={52} fill="#F5D98A" opacity={0.85} />
    <rect x={110} y={y + 310} width={890} height={80} fill={DESK} opacity={0.7} />
  </g>
);

const pushIn = (f: number, dur: number, amt = 0.04) =>
  interpolate(f, [0, dur], [1, 1 + amt], {...clamp, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94)});

// ================= s1 HOOK (114f) =================
export const CgnS1: React.FC = () => {
  const f = useCurrentFrame();
  const dur = 114;
  // Phone shake: 3 beats early (±8px), decaying by f45.
  const shake = f < 45 ? Math.sin(f / 2.4) * 8 * (1 - f / 45) : 0;
  const ring = f < 45 ? 0.35 + 0.45 * Math.abs(Math.sin(f / 4.8)) : 0;
  const pop = interpolate(f, [2, 20], [0.6, 1], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  return (
    <AbsoluteFill style={{background: DAY_BG, overflow: 'hidden'}}>
      <CcFonts />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${pushIn(f, dur)})`,
          transformOrigin: '50% 55%',
        }}
      >
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={1920} fill={DAY_BG} />
          <DayWindow />
          {/* desk kept clean — caption pill zone (y>1450) must stay clear */}
          <rect x={0} y={1450} width={1080} height={470} fill={DESK} />
          <rect x={0} y={1440} width={1080} height={18} fill="#AEBFCC" />
          <ellipse cx={540} cy={1500} rx={300} ry={26} fill={INK} opacity={0.12} />
          {/* ring streaks (2 each side) */}
          <g opacity={ring}>
            <path
              d="M 200 780 q -40 110 0 220"
              fill="none"
              stroke={MISS}
              strokeWidth={10}
              strokeLinecap="round"
              opacity={0.7}
            />
            <path
              d="M 150 730 q -60 160 0 320"
              fill="none"
              stroke={MISS}
              strokeWidth={8}
              strokeLinecap="round"
              opacity={0.35}
            />
            <path
              d="M 880 780 q 40 110 0 220"
              fill="none"
              stroke={MISS}
              strokeWidth={10}
              strokeLinecap="round"
              opacity={0.7}
            />
            <path
              d="M 930 730 q 60 160 0 320"
              fill="none"
              stroke={MISS}
              strokeWidth={8}
              strokeLinecap="round"
              opacity={0.35}
            />
          </g>
          <g transform={`translate(${shake} 0)`}>
            <PhoneFrame>
              <g transform={`translate(540 860) scale(${pop}) translate(-540 -860)`}>
                <MissedBadge cx={540} cy={860} r={86} />
              </g>
              <text
                x={540}
                y={1010}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={52}
                fontWeight={600}
                fill={MISS}
              >
                Cuộc gọi nhỡ
              </text>
              <text
                x={540}
                y={1090}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={72}
                fontWeight={600}
                fill={INK}
              >
                Mẹ
              </text>
              <text
                x={540}
                y={1145}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={32}
                fontWeight={600}
                fill={MUTED}
              >
                Chiều nay
              </text>
              <rect x={326} y={1200} width={200} height={88} rx={44} fill="#DCE6EC" />
              <text
                x={426}
                y={1256}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={32}
                fontWeight={600}
                fill={INK}
              >
                Nhắn tin
              </text>
              <rect x={554} y={1200} width={200} height={88} rx={44} fill={COLD} />
              <text
                x={654}
                y={1256}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={32}
                fontWeight={600}
                fill="#FFFFFF"
              >
                Gọi lại
              </text>
              <rect x={470} y={1350} width={140} height={14} rx={7} fill={INK} opacity={0.85} />
            </PhoneFrame>
          </g>
        </svg>
      </div>
      <CcCaps
        sec={2.8}
        duration={dur}
        dark
        parts={['Mẹ gọi lúc mình đang bận.', 'Mình định lát nữa gọi lại…']}
        accents={['Mẹ gọi', 'gọi lại']}
      />
    </AbsoluteFill>
  );
};

// ================= s2 DECLINE, finger CLOSE-UP POV (99f) =================
export const CgnS2: React.FC = () => {
  const f = useCurrentFrame();
  const dur = 99;
  // Tap hits at f8 (SFX s2+8): finger travels 2->8, squash 8->14, ripple 8->42.
  const press = interpolate(f, [2, 8], [0, 1], clamp);
  const release = interpolate(f, [16, 30], [0, 1], clamp);
  const down = press * (1 - release);
  const squash =
    1 -
    0.12 *
      interpolate(f, [8, 14], [0, 1], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)}) *
      (1 - release);
  const ripple = interpolate(f, [8, 42], [0, 1], clamp);
  // Banner: slides in 0-8, dismissed 20-32 after tap.
  const bannerIn = interpolate(f, [0, 8], [-300, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const bannerOut = interpolate(f, [20, 32], [0, -340], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const bannerY = bannerIn + bannerOut;
  const bannerO = 1 - interpolate(f, [28, 34], [0, 1], clamp);
  const fingerO = 1 - interpolate(f, [34, 42], [0, 1], clamp);
  // Piled notifications: overlay cards, staggered after dismissal.
  const msg = (at: number) =>
    interpolate(f, [at, at + 14], [560, 0], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const msgO = (at: number) => ramp(f, at, 8);
  const cards = [
    {y: 796, t: 'Deadline 17h nhé!', at: 44},
    {y: 884, t: 'Gửi file qua giúp mình', at: 54},
    {y: 972, t: 'Họp 14h30 nha', at: 64},
  ];
  // CLOSE-UP finger (POV người con): wide fingertip over the decline button.
  const FX = 815;
  const TIP = 510 + down * 165;
  return (
    <AbsoluteFill style={{background: DAY_BG, overflow: 'hidden'}}>
      <CcFonts />
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <rect x={0} y={0} width={1080} height={1920} fill={DAY_BG} />
        <DayWindow y={80} />
        {/* desk surface + laptop with work */}
        <rect x={0} y={980} width={1080} height={940} fill={DESK} />
        <rect x={0} y={970} width={1080} height={18} fill="#AEBFCC" />
        <g>
          <rect x={140} y={1060} width={620} height={380} rx={20} fill={INK} />
          <rect x={164} y={1084} width={572} height={332} rx={10} fill="#F4F8FA" />
          <rect x={200} y={1130} width={380} height={30} rx={15} fill={COLD} opacity={0.85} />
          <rect x={200} y={1180} width={500} height={22} rx={11} fill={DESK} />
          <rect x={200} y={1218} width={450} height={22} rx={11} fill={DESK} />
          <rect x={200} y={1256} width={470} height={22} rx={11} fill={DESK} />
          {/* caret blink (deterministic) */}
          {f % 30 < 15 ? (
            <rect x={210 + ((f * 7) % 400)} y={1296} width={6} height={34} fill={COLD_DARK} />
          ) : null}
          <rect x={80} y={1440} width={740} height={36} rx={18} fill="#AEBFCC" />
          {/* coffee */}
          <rect x={830} y={1200} width={90} height={120} rx={14} fill="#FFFFFF" />
          <rect x={842} y={1212} width={66} height={20} rx={10} fill="#8A5A6B" />
        </g>
        {/* incoming-call banner (generic, no app logo) */}
        <g opacity={bannerO} transform={`translate(0 ${bannerY})`}>
          <rect
            x={110}
            y={540}
            width={860}
            height={230}
            rx={36}
            fill="#FFFFFF"
            stroke={INK}
            strokeWidth={6}
          />
          <circle cx={225} cy={655} r={64} fill={MISS} />
          <g
            transform="translate(205 635) scale(1.7)"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </g>
          <text x={320} y={650} fontFamily={FONT} fontSize={56} fontWeight={600} fill={INK}>
            Mẹ
          </text>
          <text x={320} y={710} fontFamily={FONT} fontSize={36} fontWeight={600} fill={MUTED}>
            đang gọi…
          </text>
          {/* decline button (squash on tap) */}
          <g transform={`translate(${FX} 655) scale(${squash}) translate(${-FX} -655)`}>
            <circle cx={FX} cy={655} r={78} fill={MISS} />
            <g
              transform={`translate(${FX - 24} 631) rotate(135 12 12) scale(2)`}
              fill="none"
              stroke="#FFFFFF"
              strokeWidth={2.6}
              strokeLinecap="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </g>
          </g>
          {/* tap ripple */}
          {f >= 8 && ripple < 1 ? (
            <circle
              cx={FX}
              cy={655}
              r={78 + ripple * 80}
              fill="none"
              stroke={MISS}
              strokeWidth={8}
              opacity={(1 - ripple) * 0.8}
            />
          ) : null}
        </g>
        {/* "đã bấm tắt" pill after dismissal */}
        <g opacity={ramp(f, 36, 8)}>
          <rect x={330} y={600} width={420} height={72} rx={36} fill={MISS} />
          <text
            x={540}
            y={648}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={34}
            fontWeight={600}
            fill="#FFFFFF"
          >
            Đã bấm tắt
          </text>
        </g>
        {/* CLOSE-UP finger POV pressing the decline button (beats the SFX at f8) */}
        <g opacity={fingerO} transform={`translate(0 ${down * 165})`}>
          <rect x={FX - 85} y={60} width={170} height={120} fill={COLD} />
          <rect x={FX - 85} y={150} width={170} height={360} rx={85} fill={SKIN} />
          <ellipse cx={FX} cy={470} rx={42} ry={28} fill="#F5D3B8" />
        </g>
        {/* piled-up notification cards (clear of caption zone) */}
        {cards.map((c, i) => (
          <g key={i} opacity={msgO(c.at)} transform={`translate(${msg(c.at)} 0)`}>
            <rect
              x={560}
              y={c.y}
              width={440}
              height={80}
              rx={26}
              fill={i === 1 ? COLD : '#FFFFFF'}
              stroke={DESK}
              strokeWidth={4}
            />
            <text
              x={592}
              y={c.y + 52}
              fontFamily={FONT}
              fontSize={30}
              fontWeight={600}
              fill={i === 1 ? '#FFFFFF' : INK}
            >
              {c.t}
            </text>
          </g>
        ))}
      </svg>
      <CcCaps
        sec={2.8}
        duration={dur}
        dark
        parts={['Chiều đó mẹ gọi,', 'mình đang họp dở', 'nên bấm tắt vội.']}
        accents={['', 'họp dở', 'bấm tắt vội']}
      />
    </AbsoluteFill>
  );
};

// ================= s3 CHAT + MONTAGE 3 việc, chốt "quên bẵng" (193f) =================
export const CgnS3: React.FC = () => {
  const f = useCurrentFrame();
  const dur = 193;
  // Beat windows: chat 0-74, meeting 59-138, checklist/typing 124-193. Wipe-left transitions.
  const chatX = interpolate(f, [60, 74], [0, -1080], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const meetX =
    interpolate(f, [60, 74], [1080, 0], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)}) +
    interpolate(f, [124, 138], [0, -1080], {...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1)});
  const workX = interpolate(f, [124, 138], [1080, 0], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const chatPop = interpolate(f, [5, 23], [0.5, 1], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const bobY = bob(f);
  // Typing keys bounce (deterministic, active during work beat; typing SFX s3+40).
  const key = (i: number) => (f > 124 ? Math.abs(Math.sin(f / 3 + i * 1.7)) * -10 : 0);
  const tick = (at: number) => ramp(f, at, 8);
  // Reminder note "Nhớ gọi lại cho mẹ!" — fades as it is forgotten ("quên bẵng").
  const noteO = 1 - ramp(f, 172, 18) * 0.85;
  return (
    <AbsoluteFill style={{background: DAY_BG, overflow: 'hidden'}}>
      <CcFonts />
      {/* beat 1: chat */}
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${chatX}px)`}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={1920} fill={DAY_BG} />
          <DayWindow y={100} />
          <rect x={0} y={900} width={1080} height={1020} fill={DESK} opacity={0.55} />
          <g transform={`translate(540 ${640 + bobY}) scale(${chatPop}) translate(-540 -640)`}>
            <ChatBubble x={210} y={580} w={660} text="Lát con gọi lại nha." />
            <text
              x={830}
              y={740}
              textAnchor="end"
              fontFamily={FONT}
              fontSize={30}
              fontWeight={600}
              fill={MUTED}
            >
              Đã gửi · chiều nay
            </text>
          </g>
          {/* sent-chat phone (kit PhoneFrame: pill "minh hoạ" built in) */}
          <g opacity={ramp(f, 20, 12)}>
            <PhoneFrame x={380} y={790} w={320} h={530}>
              <text
                x={540}
                y={950}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={44}
                fontWeight={600}
                fill={INK}
              >
                Mẹ
              </text>
              <rect x={420} y={1000} width={240} height={140} rx={24} fill={COLD} />
              <text
                x={440}
                y={1058}
                fontFamily={FONT}
                fontSize={30}
                fontWeight={600}
                fill="#FFFFFF"
              >
                Lát con
              </text>
              <text
                x={440}
                y={1110}
                fontFamily={FONT}
                fontSize={30}
                fontWeight={600}
                fill="#FFFFFF"
              >
                gọi lại nha.
              </text>
              <text
                x={540}
                y={1200}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={28}
                fontWeight={600}
                fill={MUTED}
              >
                Đã gửi
              </text>
              <rect x={490} y={1280} width={100} height={10} rx={5} fill={INK} opacity={0.85} />
            </PhoneFrame>
          </g>
        </svg>
      </div>
      {/* beat 2: meeting room (việc 1: họp tiếp) */}
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${meetX}px)`}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={1920} fill={DAY_BG} />
          <rect x={80} y={120} width={920} height={300} rx={28} fill="#D5E2EA" />
          <text
            x={540}
            y={300}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={44}
            fontWeight={600}
            fill={INK}
          >
            Họp 14h30
          </text>
          <rect x={140} y={230} width={800} height={14} rx={7} fill={COLD} opacity={0.6} />
          {/* three colleagues (minimal-realistic busts) */}
          <Bust x={300} y={760} mood="calm" scale={1.15} />
          <Bust x={540} y={720} mood="calm" scale={1.25} />
          <Bust x={780} y={760} mood="calm" scale={1.15} />
          {/* table */}
          <ellipse cx={540} cy={1150} rx={430} ry={90} fill={DESK} />
          <rect x={240} y={1090} width={600} height={40} rx={20} fill="#AEBFCC" />
          <rect x={340} y={1030} width={160} height={110} rx={10} fill={INK} />
          <rect x={580} y={1030} width={160} height={110} rx={10} fill={INK} />
          {/* agenda ticks appearing */}
          <g opacity={tick(84)}>
            <rect x={180} y={1300} width={720} height={88} rx={24} fill="#FFFFFF" />
            <circle cx={240} cy={1344} r={22} fill={COLD} />
            <path
              d="M 228 1344 l 9 10 l 18 -20"
              stroke="#FFFFFF"
              strokeWidth={7}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={280} y={1358} fontFamily={FONT} fontSize={34} fontWeight={600} fill={INK}>
              Chốt kế hoạch tuần
            </text>
          </g>
          <g opacity={tick(100)}>
            <rect x={180} y={1404} width={720} height={88} rx={24} fill="#FFFFFF" />
            <circle cx={240} cy={1448} r={22} fill={COLD} />
            <path
              d="M 228 1448 l 9 10 l 18 -20"
              stroke="#FFFFFF"
              strokeWidth={7}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x={280} y={1462} fontFamily={FONT} fontSize={34} fontWeight={600} fill={INK}>
              Chia việc cho nhóm
            </text>
          </g>
        </svg>
      </div>
      {/* beat 3: typing + checklist (việc 2+3), chốt quên bẵng */}
      <div style={{position: 'absolute', inset: 0, transform: `translateX(${workX}px)`}}>
        <svg width={1080} height={1920} viewBox="0 0 1080 1920">
          <rect x={0} y={0} width={1080} height={1920} fill={DAY_BG} />
          <text
            x={540}
            y={240}
            textAnchor="middle"
            fontFamily={FONT}
            fontSize={48}
            fontWeight={600}
            fill={INK}
          >
            Trả lời tin nhắn…
          </text>
          {/* laptop + bouncing keys */}
          <g>
            <rect x={190} y={330} width={700} height={420} rx={20} fill={INK} />
            <rect x={214} y={354} width={652} height={372} rx={10} fill="#F4F8FA" />
            <rect x={250} y={400} width={300} height={26} rx={13} fill={DESK} />
            <rect x={250} y={442} width={520} height={26} rx={13} fill={DESK} />
            <rect x={250} y={484} width={440} height={26} rx={13} fill={DESK} />
            {f % 26 < 13 ? <rect x={250} y={526} width={8} height={36} fill={COLD_DARK} /> : null}
            {/* keyboard */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={250 + i * 100}
                y={600 + key(i)}
                width={80}
                height={64}
                rx={14}
                fill={i % 2 ? COLD : '#FFFFFF'}
                stroke={DESK}
                strokeWidth={4}
              />
            ))}
          </g>
          {/* sticky reminder — fades as it is forgotten */}
          <g opacity={noteO * ramp(f, 140, 10)}>
            <rect
              x={786}
              y={160}
              width={244}
              height={104}
              rx={12}
              fill="#F5D98A"
              stroke={INK}
              strokeWidth={4}
            />
            <text x={808} y={202} fontFamily={FONT} fontSize={28} fontWeight={600} fill={INK}>
              Nhớ gọi lại
            </text>
            <text x={808} y={238} fontFamily={FONT} fontSize={28} fontWeight={600} fill={INK}>
              cho mẹ!
            </text>
          </g>
          {/* checklist jobs getting done */}
          {[
            {y: 860, t: 'Trả lời tin nhắn', at: 152},
            {y: 972, t: 'Gửi file cho nhóm', at: 166},
            {y: 1084, t: 'Làm nốt vài việc', at: 180},
          ].map((r, i) => (
            <g key={i} opacity={ramp(f, 130 + i * 8, 10)}>
              <rect
                x={150}
                y={r.y}
                width={780}
                height={96}
                rx={26}
                fill="#FFFFFF"
                stroke={DESK}
                strokeWidth={4}
              />
              <g opacity={tick(r.at)}>
                <circle cx={216} cy={r.y + 48} r={24} fill={COLD} />
                <path
                  d={`M 203 ${r.y + 48} l 10 11 l 20 -22`}
                  stroke="#FFFFFF"
                  strokeWidth={8}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              {tick(r.at) < 1 ? (
                <circle cx={216} cy={r.y + 48} r={24} fill="none" stroke={MUTED} strokeWidth={6} />
              ) : null}
              <text
                x={260}
                y={r.y + 62}
                fontFamily={FONT}
                fontSize={36}
                fontWeight={600}
                fill={INK}
              >
                {r.t}
              </text>
            </g>
          ))}
          {/* warm hint that evening is coming */}
          <g opacity={interpolate(f, [168, 192], [0, 0.5], clamp)}>
            <rect x={150} y={1220} width={780} height={120} rx={28} fill={AMBER} opacity={0.35} />
            <text
              x={540}
              y={1296}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={34}
              fontWeight={600}
              fill={INK}
            >
              Trời sắp tối dần…
            </text>
          </g>
        </svg>
      </div>
      <CcCaps
        sec={5.92}
        duration={dur}
        dark
        parts={[
          'Mình nhắn vội: "Lát con gọi lại nha."',
          'Rồi họp tiếp, trả lời tin nhắn,',
          'làm nốt việc, rồi quên bẵng.',
        ]}
        accents={['Lát con gọi lại nha', '', 'quên bẵng']}
      />
    </AbsoluteFill>
  );
};
