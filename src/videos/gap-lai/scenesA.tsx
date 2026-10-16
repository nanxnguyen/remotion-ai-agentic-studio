import React from 'react';
import {AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {bob, clamp, soft} from '../../stick';
import {GAP_SHOTS, GAP_VOICE_OFFSET} from './timeline';

// gaplai scenes A (s1–s3): "phòng đêm đèn vàng".
// Palette (brief): nền #171310, sàn #241B14, vàng đèn #E8B04B,
// kem #F5EBD7, xám quá khứ #8A7E6E, viền khung #3A2E22.
// Nhân vật: minh họa phẳng tối giản tả thực — KHÔNG pictogram que, KHÔNG cam #F58B4C.
const BG = '#171310';
const FLOOR = '#241B14';
const LAMP = '#E8B04B';
const CREAM = '#F5EBD7';
const GRAY = '#8A7E6E';
const FRAME = '#3A2E22';
const FONT = "'Be Vietnam Pro','Inter',sans-serif";
const VO = GAP_VOICE_OFFSET;

const ramp = (f: number, a: number, len = 14) =>
  interpolate(f, [a, a + len], [0, 1], {...clamp, easing: soft});

// Start frame of each caption part — same char-proportional rule as tt2 Caps.
const starts = (parts: string[], sec: number) => {
  const total = parts.join('').length;
  let acc = 0;
  return parts.map((t) => {
    const s = VO + Math.round((acc / total) * sec * 30);
    acc += t.length;
    return s;
  });
};

// Be Vietnam Pro 600 local (fix final review: không @import Google Fonts lúc render).
const GapFonts: React.FC = () => (
  <style>{`
@font-face{font-family:'Be Vietnam Pro';font-weight:600;font-display:swap;
src:url('${staticFile('fonts/BeVietnamPro-SemiBold-VN.woff2')}') format('woff2');
unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}
@font-face{font-family:'Be Vietnam Pro';font-weight:600;font-display:swap;
src:url('${staticFile('fonts/BeVietnamPro-SemiBold-LatinExt.woff2')}') format('woff2');
unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:'Be Vietnam Pro';font-weight:600;font-display:swap;
src:url('${staticFile('fonts/BeVietnamPro-SemiBold-Latin.woff2')}') format('woff2');
unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
`}</style>
);

// Caption dưới, căn giữa, tối đa 2 dòng, đáy cách 260px (tránh 210px đáy).
const GapLine: React.FC<{text: string; accent?: string; size?: number}> = ({
  text,
  accent,
  size = 56,
}) => {
  const f = useCurrentFrame();
  const parts = accent ? text.split(accent) : [text];
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 260,
        display: 'flex',
        justifyContent: 'center',
        opacity: interpolate(f, [0, 9], [0, 1], clamp),
        transform: `translateY(${interpolate(f, [0, 12], [16, 0], {...clamp, easing: soft})}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 952,
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: size,
          lineHeight: 1.45,
          textAlign: 'center',
          color: CREAM,
          padding: '22px 30px 26px',
          borderRadius: 26,
          background: 'rgba(10,7,4,.62)',
          border: '1px solid rgba(245,235,215,.12)',
          textShadow: '0 2px 14px rgba(0,0,0,.9)',
        }}
      >
        {accent && parts.length === 2 ? (
          <>
            {parts[0]}
            <span style={{color: LAMP}}>{accent}</span>
            {parts[1]}
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

const GapCaps: React.FC<{
  sec: number;
  duration: number;
  parts: string[];
  accents?: string[];
  size?: number;
}> = ({sec, duration, parts, accents = [], size}) => {
  const froms = starts(parts, sec);
  return (
    <>
      {parts.map((t, i) => {
        const from = froms[i];
        const end = i === parts.length - 1 ? duration : froms[i + 1];
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(12, end - from)}>
            <GapLine text={t} accent={accents[i]} size={size} />
          </Sequence>
        );
      })}
    </>
  );
};

// Đèn treo + nón sáng. flick: 0..1 độ nhấp nháy nhẹ.
// hardware=false: chỉ quầng + nón sáng (dùng khi khung ảnh che mất chao đèn).
const Lamp: React.FC<{x?: number; glow?: number; flick?: number; hardware?: boolean}> = ({
  x = 540,
  glow = 1,
  flick = 0,
  hardware = true,
}) => {
  const f = useCurrentFrame();
  const fl = 1 - flick * (0.06 + 0.04 * Math.sin(f / 7) * Math.sin(f / 13));
  return (
    <g>
      <defs>
        <radialGradient id="gapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={LAMP} stopOpacity={0.55 * glow * fl} />
          <stop offset="45%" stopColor={LAMP} stopOpacity={0.18 * glow * fl} />
          <stop offset="100%" stopColor={LAMP} stopOpacity={0} />
        </radialGradient>
        <linearGradient id="gapCone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={LAMP} stopOpacity={0.22 * glow * fl} />
          <stop offset="100%" stopColor={LAMP} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <circle cx={x} cy={430} r={330} fill="url(#gapGlow)" />
      <polygon
        points={`${x - 95},470 ${x + 95},470 ${x + 260},1360 ${x - 260},1360`}
        fill="url(#gapCone)"
      />
      {hardware && (
        <g>
          <line x1={x} y1={0} x2={x} y2={330} stroke="#0C0906" strokeWidth={14} />
          <polygon
            points={`${x - 105},470 ${x + 105},470 ${x + 62},340 ${x - 62},340`}
            fill="#0C0906"
            stroke={FRAME}
            strokeWidth={6}
          />
          <circle cx={x} cy={492} r={30} fill={LAMP} opacity={0.95 * fl} />
          <circle cx={x} cy={492} r={52} fill={LAMP} opacity={0.25 * fl} />
        </g>
      )}
    </g>
  );
};

// Ghế bành gỗ nhìn ngang. dir=1 tựa lưng bên trái (ngồi quay phải), dir=-1 ngược lại.
const Chair: React.FC<{x: number; y?: number; dir?: 1 | -1; empty?: boolean}> = ({
  x,
  y = 1380,
  dir = 1,
  empty = false,
}) => {
  const f = useCurrentFrame();
  const rim = empty ? 0.3 + 0.14 * Math.sin(f / 12) : 0;
  const bx = dir === 1 ? x - 150 : x + 80; // backrest x
  return (
    <g>
      <ellipse cx={x} cy={y + 8} rx={190} ry={26} fill="#000" opacity={0.45} />
      <rect
        x={bx}
        y={y - 330}
        width={72}
        height={330}
        rx={34}
        fill="#2E2115"
        stroke={FRAME}
        strokeWidth={6}
      />
      {empty && (
        <rect
          x={bx}
          y={y - 330}
          width={72}
          height={330}
          rx={34}
          fill="none"
          stroke={LAMP}
          strokeWidth={4}
          opacity={rim}
        />
      )}
      <rect
        x={x - 160}
        y={y - 110}
        width={320}
        height={72}
        rx={30}
        fill="#3A2A1B"
        stroke={FRAME}
        strokeWidth={6}
      />
      <rect x={x - 160} y={y - 122} width={320} height={30} rx={15} fill="#4A3826" />
      <rect
        x={dir === 1 ? x + 88 : x - 160}
        y={y - 210}
        width={72}
        height={110}
        rx={24}
        fill="#2E2115"
        stroke={FRAME}
        strokeWidth={6}
      />
      <rect x={x - 140} y={y - 44} width={26} height={52} fill="#1D140C" />
      <rect x={x + 114} y={y - 44} width={26} height={52} fill="#1D140C" />
    </g>
  );
};

// Người ngồi tả thực tối giản (đầu + tóc + thân áo + tay + chân), KHÔNG que.
const Seated: React.FC<{
  x: number;
  y?: number;
  flip?: boolean;
  slump?: number;
  skin?: string;
  top?: string;
  bottom?: string;
  hair?: string;
  scale?: number;
}> = ({
  x,
  y = 1272,
  flip = false,
  slump = 0,
  skin = '#E4B98F',
  top = '#6E5136',
  bottom = '#2B2015',
  hair = '#191008',
  scale = 1,
}) => {
  const f = useCurrentFrame();
  const breathe = bob(f) * 0.6;
  const headY = -352 + slump * 46 + breathe;
  const headX = 30 + slump * 26;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
      {/* chân: đùi ngang + bắp chân đứng */}
      <rect x={-30} y={-118} width={200} height={64} rx={30} fill={bottom} />
      <rect x={110} y={-80} width={62} height={88} rx={28} fill={bottom} />
      <ellipse cx={145} cy={14} rx={46} ry={16} fill="#14100B" />
      {/* thân áo */}
      <rect x={-72} y={-330 + breathe} width={150} height={224} rx={62} fill={top} />
      <rect
        x={-72}
        y={-330 + breathe}
        width={150}
        height={224}
        rx={62}
        fill="#000"
        opacity={0.12}
      />
      {/* tay đặt lên đùi */}
      <rect
        x={-6}
        y={-280}
        width={52}
        height={180}
        rx={26}
        fill={top}
        transform="rotate(18 20 -190)"
      />
      <circle cx={72} cy={-112} r={24} fill={skin} />
      {/* cổ + tóc sau gáy + đầu */}
      <rect x={-2} y={-392 + breathe} width={56} height={52} rx={20} fill={skin} />
      <ellipse cx={headX - 44} cy={headY + 34} rx={26} ry={54} fill={hair} />
      <circle cx={headX} cy={headY} r={62} fill={skin} />
      {/* tóc */}
      <path
        d={`M ${headX - 62} ${headY - 8} A 62 62 0 0 1 ${headX + 62} ${headY - 8} L ${headX + 62} ${headY - 34} A 62 62 0 0 0 ${headX - 62} ${headY - 34} Z`}
        fill={hair}
      />
      {/* mắt nhắm/mệt: mí cụp */}
      <line
        x1={headX - 2}
        y1={headY + 2}
        x2={headX + 26}
        y2={headY + 6}
        stroke="#3A2417"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <line
        x1={headX - 2}
        y1={headY + 44 - slump * 8}
        x2={headX + 26}
        y2={headY + 40 - slump * 8}
        stroke="#3A2417"
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.7}
      />
    </g>
  );
};

const Room: React.FC<{children: React.ReactNode; dim?: number}> = ({children, dim = 0}) => (
  <svg viewBox="0 0 1080 1920" width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
    <rect width="1080" height="1920" fill={BG} />
    <rect y={1300} width={1080} height={620} fill={FLOOR} />
    {[1380, 1480, 1580, 1680].map((yy) => (
      <line
        key={yy}
        x1={0}
        y1={yy}
        x2={1080}
        y2={yy}
        stroke="#000"
        strokeWidth={3}
        opacity={0.35}
      />
    ))}
    <rect width="1080" height="1920" fill="url(#gapShade)" />
    <defs>
      <radialGradient id="gapShade" cx="50%" cy="30%" r="90%">
        <stop offset="55%" stopColor="#000" stopOpacity={0} />
        <stop offset="100%" stopColor="#000" stopOpacity={0.55} />
      </radialGradient>
    </defs>
    {children}
    {dim > 0 && <rect width="1080" height="1920" fill="#000" opacity={dim} />}
  </svg>
);

// ---------------- S1: phòng đêm, 1 người + ghế trống, push-in chậm ----------------
const P1 = ['Gặp lại mình của vài năm trước,', 'bạn sẽ nói gì đầu tiên?'];
export const GapS1: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = GAP_SHOTS.s1;
  // Push-in rất chậm về ghế trống (760, 1000): 1 → 1.07.
  const zoom = interpolate(f, [0, D], [1, 1.07], {...clamp, easing: soft});
  const cx = 760,
    cy = 1000;
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <rect width="1080" height="1920" fill={BG} />
        <rect y={1300} width={1080} height={620} fill={FLOOR} />
        <g transform={`translate(${cx - cx * zoom} ${cy - cy * zoom}) scale(${zoom})`}>
          <Lamp x={540} flick={0.5} />
          <Chair x={330} dir={1} />
          <Seated x={330} slump={0.25} />
          <Chair x={760} dir={-1} empty />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={470 + i * 90 + Math.sin(f / 22 + i * 2.1) * 22}
              cy={700 + i * 130 + Math.cos(f / 26 + i * 1.7) * 18}
              r={5}
              fill={LAMP}
              opacity={0.28}
            />
          ))}
        </g>
      </svg>
      <GapCaps sec={sec} duration={D} parts={P1} accents={['', 'đầu tiên?']} />
    </AbsoluteFill>
  );
};

// ---------------- S2: khung ảnh cũ + nhãn minh hoạ, dissolve mềm ----------------
const P2 = [
  'Chắc không phải là cố lên đâu.',
  'Hồi đó mình đã cố nhiều rồi,',
  'cố tới mức chẳng muốn nghe thêm lời khuyên nào nữa.',
];
const YoungSlump: React.FC = () => (
  <g>
    {/* cửa sổ đêm + trăng */}
    <rect x={120} y={80} width={220} height={260} fill="#101418" stroke={GRAY} strokeWidth={8} />
    <line x1={230} y1={80} x2={230} y2={340} stroke={GRAY} strokeWidth={6} />
    <line x1={120} y1={210} x2={340} y2={210} stroke={GRAY} strokeWidth={6} />
    <circle cx={285} cy={140} r={30} fill={GRAY} opacity={0.8} />
    {/* ghế (sau lưng) */}
    <rect x={120} y={400} width={56} height={240} rx={26} fill="#3B3B3B" opacity={0.9} />
    {/* thân gục nghiêng về bàn */}
    <rect
      x={176}
      y={420}
      width={130}
      height={180}
      rx={60}
      fill={GRAY}
      opacity={0.9}
      transform="rotate(28 241 510)"
    />
    {/* hai tay khoanh trên bàn */}
    <rect x={300} y={540} width={150} height={36} rx={18} fill="#C9BBA6" opacity={0.85} />
    <rect x={310} y={572} width={140} height={32} rx={16} fill="#B3A48E" opacity={0.85} />
    {/* đầu gục lên tay */}
    <circle cx={380} cy={520} r={56} fill="#C9BBA6" opacity={0.95} />
    <path d="M 324 510 A 56 56 0 0 1 436 510 L 436 484 A 56 56 0 0 0 324 484 Z" fill="#3B3B3B" />
    {/* mặt bàn */}
    <rect x={60} y={600} width={640} height={26} rx={10} fill={GRAY} opacity={0.85} />
    <rect x={120} y={626} width={22} height={180} fill={GRAY} opacity={0.6} />
    <rect x={618} y={626} width={22} height={180} fill={GRAY} opacity={0.6} />
    {/* đèn bàn nhỏ */}
    <rect x={580} y={470} width={16} height={130} fill={GRAY} />
    <circle cx={562} cy={486} r={22} fill={LAMP} opacity={0.5} />
    {/* giấy tờ vương */}
    <rect
      x={90}
      y={566}
      width={110}
      height={34}
      rx={4}
      fill={GRAY}
      opacity={0.5}
      transform="rotate(-8 145 583)"
    />
    <rect
      x={480}
      y={570}
      width={90}
      height={30}
      rx={4}
      fill={GRAY}
      opacity={0.45}
      transform="rotate(6 525 585)"
    />
  </g>
);

export const GapS2: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = GAP_SHOTS.s2;
  // Dissolve mềm vào (18f), hold tới hết shot (hold >> 0.6s).
  const o = ramp(f, 8, 22);
  const sc = interpolate(f, [8, 40], [0.96, 1], {...clamp, easing: soft});
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <Room dim={0.35 + (1 - o) * 0.25}>
        <Lamp x={540} glow={0.5} hardware={false} />
        <Chair x={330} dir={1} />
        <Seated x={330} slump={0.4} />
        <Chair x={760} dir={-1} empty />
      </Room>
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <g opacity={o} transform={`translate(540 830) scale(${sc}) translate(-540 -830)`}>
          <rect x={140} y={360} width={800} height={940} rx={28} fill="#0D0A07" opacity={0.6} />
          <rect
            x={160}
            y={380}
            width={760}
            height={900}
            rx={26}
            fill="#1D150E"
            stroke={FRAME}
            strokeWidth={18}
          />
          <g clipPath="url(#gapOld)">
            <rect x={200} y={470} width={680} height={740} fill="#241C13" />
            <g transform="translate(140 480) scale(0.97)">
              <YoungSlump />
            </g>
            <rect x={200} y={470} width={680} height={740} fill={BG} opacity={0.25} />
          </g>
          <defs>
            <clipPath id="gapOld">
              <rect x={200} y={470} width={680} height={740} rx={8} />
            </clipPath>
          </defs>
          {/* nhãn minh hoạ — xám, góc trên-phải khung */}
          <rect x={668} y={404} width={212} height={62} rx={31} fill="#0D0A07" opacity={0.85} />
          <text
            x={774}
            y={448}
            textAnchor="middle"
            fontSize={34}
            fontStyle="italic"
            fill={GRAY}
            style={{fontFamily: FONT, fontWeight: 600}}
          >
            minh hoạ
          </text>
        </g>
      </svg>
      <GapCaps
        sec={sec}
        duration={D}
        parts={P2}
        accents={['cố lên', 'cố nhiều rồi', 'lời khuyên']}
        size={54}
      />
    </AbsoluteFill>
  );
};

// ---------------- S3: 2 ghế gần lại, trà bốc khói, đèn ấm lên ----------------
const P3 = ['Mình sẽ ngồi xuống cạnh bạn ấy thôi,', 'rồi hỏi khẽ một câu: dạo này, mệt lắm hả?'];

const Steam: React.FC<{x: number; y: number; phase?: number}> = ({x, y, phase = 0}) => {
  const f = useCurrentFrame();
  const prog = ((f + phase) % 45) / 45;
  return (
    <path
      d="M 0 0 C -16 -30 16 -62 0 -100"
      transform={`translate(${x} ${y - prog * 60})`}
      fill="none"
      stroke={CREAM}
      strokeWidth={10}
      strokeLinecap="round"
      opacity={(1 - prog) * 0.75}
    />
  );
};

export const GapS3: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = GAP_SHOTS.s3;
  // Hai ghế gần lại: từ xa (s1) tiến vào gần (nội suy 30f đầu). Giữ khe giữa 2 ghế cho bàn trà.
  const near = ramp(f, 0, 30);
  const lx = interpolate(near, [0, 1], [330, 368]);
  const rx = interpolate(near, [0, 1], [760, 712]);
  // Đèn ấm lên dần.
  const warm = ramp(f, 10, 60);
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <Room>
        <Lamp x={540} glow={0.65 + warm * 0.45} flick={0.35} />
        <Chair x={lx} dir={1} />
        <Seated x={lx} slump={0.15} />
        <Chair x={rx} dir={-1} empty />
        {/* bàn tròn + tách trà */}
        <ellipse cx={540} cy={1420} rx={150} ry={26} fill="#000" opacity={0.45} />
        <rect x={528} y={1408} width={24} height={60} fill="#1D140C" />
        <ellipse
          cx={540}
          cy={1400}
          rx={112}
          ry={36}
          fill="#3A2A1B"
          stroke={FRAME}
          strokeWidth={6}
        />
        <ellipse cx={540} cy={1392} rx={112} ry={30} fill="#4A3826" />
        <ellipse cx={540} cy={1356} rx={68} ry={18} fill="#241A10" stroke={FRAME} strokeWidth={5} />
        <path d="M 478 1318 L 492 1356 L 588 1356 L 602 1318 Z" fill={CREAM} opacity={0.92} />
        <ellipse cx={540} cy={1318} rx={62} ry={14} fill="#F9F2E4" />
        <ellipse cx={540} cy={1318} rx={46} ry={10} fill="#8A5A2B" />
        <path
          d="M 602 1325 A 27 27 0 1 1 598 1352"
          fill="none"
          stroke={CREAM}
          strokeWidth={9}
          opacity={0.9}
        />
        <Steam x={518} y={1300} phase={0} />
        <Steam x={543} y={1300} phase={15} />
        <Steam x={566} y={1300} phase={30} />
        {/* lớp ấm phủ toàn khung */}
        <rect width="1080" height="1920" fill={LAMP} opacity={warm * 0.07} />
      </Room>
      <GapCaps sec={sec} duration={D} parts={P3} accents={['', 'mệt lắm hả?']} size={54} />
    </AbsoluteFill>
  );
};
