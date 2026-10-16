import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  AMBER,
  Bust,
  CcCaps,
  CcFonts,
  CREAM,
  FONT,
  INK,
  MISS,
  MUTED,
  MissedBadge,
  NIGHT_BG,
  NIGHT_DEEP,
  NightWindow,
  PhoneFrame,
  SKIN,
  StreetLamp,
  VoiceWave,
  WarmGlow,
  clamp,
  ramp,
  soft,
} from './kit';
import {CGN_SHOTS} from './timeline';

// scenesB (rebuild v2): s4 (phòng tối + màn hình sáng) → s5 (bản lề 2 beat,
// HIGHLIGHT a) → s6 (đỉnh ấm MAX, HIGHLIGHT b).
// Chỉ dùng kit nguyên bản (CcFonts/CcCaps/PhoneFrame/MissedBadge/Bust/
// StreetLamp/VoiceWave/WarmGlow/NightWindow) — không fork. Captions khớp
// voice.json v2 từng chữ (parts.join(' ') ≡ voice sau normalize whitespace).
// Deterministic: không Date.now / Math.random, chỉ sin theo frame.

// Phone áp tai vẽ tay (kit không có; khớp scenesC) — không fork kit.
const PhoneAtEar: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g>
    <ellipse cx={x - 6} cy={y + 148} rx={38} ry={54} fill={SKIN} />
    <rect x={x} y={y} width={64} height={130} rx={22} fill="#0F0C0A" />
    <rect x={x + 8} y={y + 12} width={48} height={90} rx={10} fill="#171310" />
  </g>
);

const STARS: [number, number, number][] = [
  [120, 200, 4],
  [300, 120, 3],
  [520, 260, 4],
  [760, 140, 3],
  [940, 300, 4],
  [200, 420, 3],
  [880, 480, 3],
  [640, 90, 3],
];

// ---------- S4: phòng tối, màn hình sáng bật lên giữa bóng tối ----------
const S4_PARTS = [
  'Tối, phòng đã tắt đèn. ',
  'Mở điện thoại lên, dòng chữ ',
  '"Cuộc gọi nhỡ — Mẹ" vẫn nằm đó, ',
  'mình chột dạ.',
];
const S4_ACC = ['', '', 'vẫn nằm đó', 'chột dạ'];

export const CgnS4: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = CGN_SHOTS.s4;
  const phoneIn = ramp(f, 6, 26);
  const phoneY = interpolate(f, [6, 32], [70, 0], {...clamp, easing: soft});
  const glow = ramp(f, 10, 40);
  const pop = interpolate(f, [34, 44, 52], [0, 1.1, 1], clamp);
  const zoom = 1 + 0.02 * ramp(f, 0, D);
  return (
    <AbsoluteFill style={{background: NIGHT_DEEP}}>
      <CcFonts />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <g transform={`translate(540 960) scale(${zoom}) translate(-540 -960)`}>
          <rect x="-60" y="-60" width="1200" height="2040" fill={NIGHT_DEEP} />
          {/* tường phòng tối + sàn */}
          <rect x="-60" y="-60" width="1200" height="1420" fill="#241C16" />
          <rect x="-60" y="1360" width="1200" height="620" fill="#14100D" />
          {/* cửa sổ đêm mưa chéo (kit, không trăng) — clip khít khung, mưa không tràn */}
          <clipPath id="s4win">
            <rect x={90} y={380} width={300} height={400} rx={24} />
          </clipPath>
          <g clipPath="url(#s4win)">
            <NightWindow x={90} y={380} w={300} h={400} />
          </g>
          {/* giường silhouette phải, giữ vùng caption đáy trống */}
          <rect x={560} y={1150} width={460} height={170} rx={44} fill="#14100D" />
          <rect x={592} y={1096} width={180} height={92} rx={40} fill="#2B2320" />
          <rect x={560} y={1150} width={460} height={56} rx={28} fill="#2B2320" />
          {/* quầng sáng màn hình hắt ra bóng tối */}
          <ellipse cx={540} cy={1050} rx={330} ry={490} fill={CREAM} opacity={glow * 0.1} />
          {/* phone sáng bật lên, gọi nhỡ ban chiều hiện lại */}
          <g opacity={phoneIn} transform={`translate(0 ${phoneY})`}>
            <PhoneFrame>
              <text
                x="540"
                y="810"
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={72}
                fontWeight={600}
                fill={INK}
              >
                Mẹ
              </text>
              <text
                x="540"
                y="880"
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={44}
                fontWeight={600}
                fill={MISS}
              >
                Cuộc gọi nhỡ
              </text>
              <g
                transform={`translate(540 1010) scale(${Math.max(0.001, pop)}) translate(-540 -1010)`}
              >
                <MissedBadge cx={540} cy={1010} r={86} />
              </g>
              <text
                x="540"
                y="1170"
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={38}
                fontWeight={600}
                fill={MUTED}
              >
                Chiều nay
              </text>
            </PhoneFrame>
          </g>
        </g>
      </svg>
      <CcCaps sec={sec} duration={D} parts={S4_PARTS} accents={S4_ACC} />
    </AbsoluteFill>
  );
};

// ---------- S5 BẢN LỀ (HIGHLIGHT a): đèn đường gọi đi → CLOSE-UP mẹ ----------
// SFX (timeline, giữ nguyên): ring s5+5, pickup s5+45 → chuông dừng ở f45-57,
// beat 2 mẹ vào f52-86, nín nhịp sau "hai tiếng" rồi mới tới câu mẹ.
const S5_PARTS = [
  'Mình bấm gọi lại, ',
  'cũng chính ngón tay ban chiều bấm tắt. ',
  'Mẹ bắt máy ngay, chưa kịp reo hai tiếng. ',
  '"Con ăn cơm chưa?"',
];
const S5_ACC = ['', 'chính ngón tay ban chiều bấm tắt', '', 'Con ăn cơm chưa?'];

export const CgnS5: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = CGN_SHOTS.s5;
  const beat2 = ramp(f, 52, 34);
  const glow = 0.25 * ramp(f, 4, 30) + 0.25 * ramp(f, 50, 45);
  const zoom = 1 + 0.04 * ramp(f, 0, D);
  const ringOut = 1 - ramp(f, 45, 12);
  const momY = interpolate(f, [52, 86], [80, 0], {...clamp, easing: soft});
  const timer = `00:${String(3 + Math.min(9, Math.floor(f / 30))).padStart(2, '0')}`;
  const ringR = (phase: number) => 26 + ((f * 3 + phase) % 70);
  const ringO = (phase: number) => ringOut * (1 - ((f * 3 + phase) % 70) / 70);
  return (
    <AbsoluteFill style={{background: NIGHT_DEEP}}>
      <CcFonts />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <defs>
          <linearGradient id="s5bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={NIGHT_DEEP} />
            <stop offset="0.55" stopColor={NIGHT_BG} />
            <stop offset="1" stopColor={NIGHT_DEEP} />
          </linearGradient>
          <radialGradient id="s5mom">
            <stop offset="0" stopColor={AMBER} stopOpacity={0.55} />
            <stop offset="0.6" stopColor={AMBER} stopOpacity={0.22} />
            <stop offset="1" stopColor={AMBER} stopOpacity={0} />
          </radialGradient>
        </defs>
        <g transform={`translate(540 960) scale(${zoom}) translate(-540 -960)`}>
          <rect x="-60" y="-60" width="1200" height="2040" fill="url(#s5bg)" />
          {STARS.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={CREAM} opacity={0.7} />
          ))}
          {/* vệt đường đêm + bóng nhà xa */}
          <rect x="0" y="1290" width="1080" height="120" fill="#14100D" />
          <line
            x1="0"
            y1="1350"
            x2="1080"
            y2="1350"
            stroke={AMBER}
            strokeWidth={6}
            strokeDasharray="46 40"
            opacity={0.4}
          />
          <g fill="#171310" opacity={0.9}>
            <rect x="820" y="1080" width="190" height="220" />
            <rect x="60" y="1120" width="150" height="180" />
          </g>
          {/* beat 1: con dưới đèn đường gọi đi */}
          <StreetLamp x={170} y={1300} h={700} />
          <polygon points="296,620 340,620 560,1300 120,1300" fill={AMBER} opacity={0.1} />
          <g>
            <Bust x={390} y={870} mood="calm" scale={1.9} />
            <PhoneAtEar x={482} y={740} />
            {/* sóng chuông gọi đi, dừng khi mẹ bắt máy (khớp SFX pickup s5+45) */}
            <circle
              cx={514}
              cy={780}
              r={ringR(0)}
              fill="none"
              stroke={AMBER}
              strokeWidth={6}
              opacity={ringO(0)}
            />
            <circle
              cx={514}
              cy={780}
              r={ringR(35)}
              fill="none"
              stroke={AMBER}
              strokeWidth={6}
              opacity={ringO(35)}
            />
          </g>
          {/* thẻ trạng thái "Đang gọi — Mẹ" (màn đêm, không sub-rect xanh) */}
          <g>
            <rect x={560} y={180} width={440} height={230} rx={36} fill="#0F0C0A" />
            <rect x={574} y={194} width={412} height={202} rx={28} fill="#171310" />
            <rect x={594} y={210} width={176} height={48} rx={24} fill={MUTED} opacity={0.9} />
            <text
              x={682}
              y={245}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={30}
              fontWeight={600}
              fill="#FFFFFF"
            >
              minh hoạ
            </text>
            <text
              x={780}
              y={318}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={44}
              fontWeight={600}
              fill={CREAM}
            >
              Đang gọi — Mẹ
            </text>
            <text
              x={780}
              y={368}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={38}
              fontWeight={600}
              fill={AMBER}
            >
              {timer}
            </text>
          </g>
          {/* beat 2: CLOSE-UP mẹ áp phone vào tai, ấm tràn lên (tiền cảnh phải,
              không đè đầu con / phone con / thẻ trạng thái) */}
          <g opacity={beat2} transform={`translate(0 ${momY})`}>
            <circle cx={770} cy={760} r={380} fill="url(#s5mom)" />
            <Bust x={770} y={760} mood="soft" mom scale={2.4} />
            <PhoneAtEar x={887} y={615} />
          </g>
          {/* dải sóng thoại nối hai beat, vẽ trên cùng để không bị thân mẹ che */}
          <g opacity={0.25 + 0.75 * beat2}>
            <VoiceWave x={470} y={1010} w={200} f={f} />
          </g>
        </g>
        <WarmGlow level={glow} />
      </svg>
      <CcCaps sec={sec} duration={D} parts={S5_PARTS} accents={S5_ACC} />
    </AbsoluteFill>
  );
};

// ---------- S6 (HIGHLIGHT b): đỉnh ấm NHẤT — WarmGlow MAX 1.0 + push-in chậm nhất ----------
const S6_PARTS = ['Hóa ra mẹ chẳng nhờ gì cả. ', 'Mẹ chỉ muốn nghe giọng mình một chút thôi.'];
const S6_ACC = ['', 'nghe giọng mình một chút thôi'];

export const CgnS6: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = CGN_SHOTS.s6;
  const zoom = 1 + 0.04 * ramp(f, 0, D);
  const lamp = 0.9 + 0.035 * Math.sin(f * 2.1) + 0.02 * Math.sin(f * 5.7);
  const sway = Math.sin(f / 9) * 4;
  return (
    <AbsoluteFill style={{background: NIGHT_BG}}>
      <CcFonts />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <defs>
          <linearGradient id="s6bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#241C16" />
            <stop offset="0.6" stopColor={NIGHT_BG} />
            <stop offset="1" stopColor={NIGHT_DEEP} />
          </linearGradient>
          <radialGradient id="s6lamp">
            <stop offset="0" stopColor={AMBER} stopOpacity={0.5} />
            <stop offset="1" stopColor={AMBER} stopOpacity={0} />
          </radialGradient>
        </defs>
        <g transform={`translate(540 960) scale(${zoom}) translate(-540 -960)`}>
          <rect x="-60" y="-60" width="1200" height="2040" fill="url(#s6bg)" />
          {/* đèn treo vàng ấm mạnh nhất */}
          <circle cx="540" cy="430" r="470" fill="url(#s6lamp)" opacity={0.9} />
          <rect x="534" y="0" width="12" height="300" fill="#0E0B08" />
          <path
            d="M 468 300 L 612 300 L 654 384 L 426 384 Z"
            fill="#2E2318"
            stroke="#3A2E22"
            strokeWidth={5}
          />
          <ellipse
            cx="540"
            cy="398"
            rx="30"
            ry="20"
            fill={AMBER}
            opacity={0.35 + 0.6 * Math.min(1, lamp)}
          />
          {/* cửa sổ đêm mưa chéo bên trái (clip mưa tràn khung kit) */}
          <defs>
            <clipPath id="s6win">
              <rect x={70} y={560} width={260} height={340} rx={24} />
            </clipPath>
          </defs>
          <g clipPath="url(#s6win)">
            <NightWindow x={70} y={560} w={260} h={340} />
          </g>
          <g transform={`translate(0 ${sway})`}>
            <circle cx="540" cy="830" r="300" fill="url(#s6lamp)" opacity={0.75} />
            <Bust x={540} y={760} mood="soft" mom scale={2.4} />
            <PhoneAtEar x={668} y={580} />
          </g>
        </g>
        <WarmGlow level={1} />
      </svg>
      <CcCaps sec={sec} duration={D} parts={S6_PARTS} accents={S6_ACC} />
    </AbsoluteFill>
  );
};
