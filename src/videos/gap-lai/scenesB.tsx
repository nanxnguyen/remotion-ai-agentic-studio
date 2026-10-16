import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {GAP_SHOTS, GAP_VOICE_OFFSET} from './timeline';

// gaplai scenes B (v2 s4–s7): "phòng đêm đèn vàng".
// Tả thực tối giản (bust tròn, không que), palette brief: nền #171310, sàn #241B14,
// vàng đèn #E8B04B, kem #F5EBD7, xám quá khứ #8A7E6E, viền khung #3A2E22. Không cam #F58B4C.
// Text khớp docs/gaplai/voice.json v2; duration/sec đọc từ GAP_SHOTS (timeline v2, TOTAL 1518).
const BG = '#171310';
const FLOOR = '#241B14';
const LAMP = '#E8B04B';
const CREAM = '#F5EBD7';
const GRAY = '#8A7E6E';
const FRAME = '#3A2E22';
const WOOD = '#4A3826';
const CUSHION = '#6B543A';
const FONT = "'Be Vietnam Pro','Inter',sans-serif";
const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const soft = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const ramp = (f: number, a: number, len = 14) =>
  interpolate(f, [a, a + len], [0, 1], {...clamp, easing: soft});
const bob = (f: number) => Math.sin(f / 9) * 4;

export const GapFonts: React.FC = () => (
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

// ---------- caption dưới, Be Vietnam Pro 600, tối đa 2 dòng, đáy cách 250px (>210px) ----------
const GLine: React.FC<{text: string; accent?: string; len: number}> = ({text, accent, len}) => {
  const f = useCurrentFrame();
  const o =
    interpolate(f, [0, 9], [0, 1], clamp) * (1 - interpolate(f, [len - 7, len], [0, 1], clamp));
  const y = interpolate(f, [0, 12], [16, 0], {...clamp, easing: soft});
  const parts = accent ? text.split(accent) : [text];
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        bottom: 250,
        textAlign: 'center',
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 58,
        lineHeight: 1.32,
        color: CREAM,
        textShadow: '0 2px 18px rgba(0,0,0,.78), 0 0 5px rgba(0,0,0,.9)',
        opacity: o,
        transform: `translateY(${y}px)`,
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
  );
};

const GCaps: React.FC<{sec: number; duration: number; parts: string[]; accents?: string[]}> = ({
  sec,
  duration,
  parts,
  accents = [],
}) => {
  const total = parts.join('').length;
  let acc = 0;
  return (
    <>
      {parts.map((t, i) => {
        const from = GAP_VOICE_OFFSET + Math.round((acc / total) * sec * 30);
        acc += t.length;
        const end =
          i === parts.length - 1
            ? duration
            : GAP_VOICE_OFFSET + Math.round((acc / total) * sec * 30);
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(12, end - from)}>
            <GLine text={t} accent={accents[i]} len={Math.max(12, end - from)} />
          </Sequence>
        );
      })}
    </>
  );
};

// ---------- phòng đêm + đèn treo ----------
export const Room: React.FC<{lamp: number; children?: React.ReactNode; id: string}> = ({
  lamp,
  children,
  id,
}) => {
  const f = useCurrentFrame();
  const fl = lamp * (1 + 0.035 * Math.sin(f * 2.1) + 0.02 * Math.sin(f * 5.7));
  return (
    <>
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <defs>
          <linearGradient id={`${id}bg`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1E1611" />
            <stop offset="0.62" stopColor={BG} />
            <stop offset="0.652" stopColor="#201813" />
            <stop offset="1" stopColor={FLOOR} />
          </linearGradient>
          <radialGradient id={`${id}gl`}>
            <stop offset="0" stopColor={LAMP} stopOpacity={0.5} />
            <stop offset="1" stopColor={LAMP} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="1080" height="1920" fill={`url(#${id}bg)`} />
        {[1400, 1550, 1700].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="1080"
            y2={y}
            stroke="#000"
            strokeWidth="3"
            opacity={0.2}
          />
        ))}
        <circle cx="540" cy="430" r="470" fill={`url(#${id}gl)`} opacity={0.25 + 0.55 * fl} />
        <rect x="534" y="0" width="12" height="300" fill="#0E0B08" />
        <path
          d="M 468 300 L 612 300 L 654 384 L 426 384 Z"
          fill="#2E2318"
          stroke={FRAME}
          strokeWidth={5}
        />
        <ellipse
          cx="540"
          cy="398"
          rx="30"
          ry="20"
          fill={LAMP}
          opacity={0.35 + 0.6 * Math.min(1, fl)}
        />
        {children}
      </svg>
      <AbsoluteFill style={{boxShadow: 'inset 0 0 240px rgba(0,0,0,.62)', pointerEvents: 'none'}} />
    </>
  );
};

// ---------- ghế gỗ nhìn nghiêng ----------
export const Chair: React.FC<{x: number; y: number; s?: number; flip?: boolean; dim?: number}> = ({
  x,
  y,
  s = 1,
  flip = false,
  dim = 0,
}) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} opacity={1 - dim * 0.35}>
    <rect x={-112} y={-330} width={36} height={200} rx={15} fill={WOOD} />
    <rect x={-104} y={-150} width={216} height={36} rx={14} fill={WOOD} />
    <rect x={-96} y={-172} width={200} height={24} rx={12} fill={CUSHION} />
    <rect x={-104} y={-114} width={30} height={114} fill={WOOD} />
    <rect x={82} y={-114} width={30} height={114} fill={WOOD} />
    <rect x={-96} y={-238} width={196} height={22} rx={11} fill={WOOD} />
    <rect x={70} y={-238} width={22} height={92} fill={WOOD} />
    <line x1={-112} y1={-320} x2={-76} y2={-145} stroke={LAMP} strokeWidth={5} opacity={0.26} />
  </g>
);

// ---------- tách trà (x,y = mặt bàn); steam=false: trà đã nguội, không khói ----------
export const Tea: React.FC<{x: number; y: number; f: number; steam?: boolean}> = ({
  x,
  y,
  f,
  steam = true,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx="0" cy="26" rx="72" ry="16" fill="#100C09" opacity={0.5} />
    <ellipse cx="0" cy="18" rx="66" ry="14" fill="#D9C6A8" />
    <path d="M -46 18 L 46 18 L 33 66 L -33 66 Z" fill="#EFE3CC" />
    <ellipse cx="0" cy="18" rx="46" ry="10" fill={steam ? '#8A5A2E' : '#5E3A20'} />
    <path
      d="M 46 30 Q 72 32 64 52 Q 58 64 36 60"
      fill="none"
      stroke="#EFE3CC"
      strokeWidth={9}
      strokeLinecap="round"
    />
    {steam &&
      [-18, 14].map((dx, i) => {
        const o = 0.3 + 0.25 * Math.sin(f / 7 + i * 2.1);
        return (
          <path
            key={i}
            d={`M ${dx} -6 q 13 -22 0 -44 q -13 -22 0 -44`}
            fill="none"
            stroke={CREAM}
            strokeWidth={7}
            strokeLinecap="round"
            opacity={o}
            strokeDasharray="30 26"
            strokeDashoffset={-f * 6 + i * 20}
          />
        );
      })}
  </g>
);

// ---------- người tả thực tối giản (bust), mood: down/calm/soft ----------
const Bust: React.FC<{
  x: number;
  y: number;
  s?: number;
  sw: string;
  mood?: 'down' | 'calm' | 'soft';
  tilt?: number;
  headDx?: number;
  f: number;
}> = ({x, y, s = 1, sw, mood = 'calm', tilt = 0, headDx = 0, f}) => {
  const skin = '#E9BE9C';
  const hair = '#241D18';
  const ey = mood === 'down' ? -118 : -128;
  return (
    <g transform={`translate(${x} ${y + bob(f) * 0.5}) scale(${s})`}>
      <rect x={-95} y={-40} width={190} height={168} rx={70} fill={sw} />
      <path
        d="M -26 -44 L 0 -18 L 26 -44"
        fill="none"
        stroke="rgba(0,0,0,.25)"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform={`translate(${headDx} 0) rotate(${tilt} 0 -100)`}>
        <rect x={-22} y={-80} width={44} height={44} fill="#D8A67E" />
        <circle cx="0" cy="-148" r="64" fill={hair} />
        <rect x={-58} y={-178} width={20} height={62} rx={10} fill={hair} />
        <rect x={38} y={-178} width={20} height={62} rx={10} fill={hair} />
        <circle cx="0" cy="-132" r="56" fill={skin} />
        <rect x={-56} y={-196} width={112} height={36} rx={18} fill={hair} />
        {mood === 'down' ? (
          <>
            <path
              d="M -34 -120 q 12 8 24 0"
              fill="none"
              stroke="#2A2320"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <path
              d="M 10 -120 q 12 8 24 0"
              fill="none"
              stroke="#2A2320"
              strokeWidth={6}
              strokeLinecap="round"
            />
            <path
              d="M -14 -94 Q 0 -102 14 -94"
              fill="none"
              stroke="#2A2320"
              strokeWidth={6}
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <circle cx={-22} cy={ey} r="5.5" fill="#2A2320" />
            <circle cx={22} cy={ey} r="5.5" fill="#2A2320" />
            {mood === 'soft' ? (
              <path
                d="M -16 -102 Q 0 -88 16 -102"
                fill="none"
                stroke="#2A2320"
                strokeWidth={6}
                strokeLinecap="round"
              />
            ) : (
              <line
                x1={-12}
                y1={-98}
                x2={12}
                y2={-98}
                stroke="#2A2320"
                strokeWidth={6}
                strokeLinecap="round"
              />
            )}
          </>
        )}
      </g>
    </g>
  );
};

// ---------- khung ảnh cũ + nhãn "minh hoạ" (nội dung vẽ trong hộp 600x500) ----------
export const Photo: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  label?: boolean;
  tint?: boolean;
  glow?: number;
  id: string;
  children: React.ReactNode;
}> = ({x, y, w, h, label = true, tint = false, glow = 0, id, children}) => {
  const sc = Math.min((w - 52) / 600, (h - 52) / 500);
  return (
    <g>
      {glow > 0 && (
        <rect
          x={x - w / 2 - 10}
          y={y - h / 2 - 10}
          width={w + 20}
          height={h + 20}
          rx={26}
          fill="none"
          stroke={LAMP}
          strokeWidth={6}
          opacity={glow}
        />
      )}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={22} fill={FRAME} />
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={22}
        fill="#000"
        opacity={0.3}
        transform={`translate(0 10)`}
      />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={22} fill={FRAME} />
      <defs>
        <clipPath id={id}>
          <rect x={x - w / 2 + 26} y={y - h / 2 + 26} width={w - 52} height={h - 52} rx={8} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g transform={`translate(${x} ${y}) scale(${sc}) translate(-300 -250)`}>{children}</g>
        {tint && (
          <rect
            x={x - w / 2 + 26}
            y={y - h / 2 + 26}
            width={w - 52}
            height={h - 52}
            fill={GRAY}
            opacity={0.2}
          />
        )}
      </g>
      {label && (
        <g transform={`translate(${x - w / 2 + 44} ${y - h / 2 + 52})`}>
          <rect x={-72} y={-30} width={148} height={52} rx={26} fill="rgba(10,8,6,.62)" />
          <text
            textAnchor="middle"
            y={7}
            fontSize={30}
            fill={GRAY}
            style={{fontFamily: FONT, fontWeight: 600}}
          >
            minh hoạ
          </text>
        </g>
      )}
    </g>
  );
};

// ----- nội dung ảnh 1 (600x500): văn phòng khuya -----
export const OldOffice: React.FC = () => (
  <>
    <rect x="0" y="0" width="600" height="500" fill="#232C3B" />
    <rect x="360" y="36" width="196" height="176" fill="#121826" stroke="#3A4A5E" strokeWidth={8} />
    <line x1="458" y1="36" x2="458" y2="212" stroke="#3A4A5E" strokeWidth={6} />
    <line x1="360" y1="124" x2="556" y2="124" stroke="#3A4A5E" strokeWidth={6} />
    <circle cx="500" cy="80" r="24" fill="#D8DCE4" opacity={0.85} />
    <circle cx="410" cy="170" r="3" fill="#8A93A6" />
    <circle cx="440" cy="150" r="3" fill="#8A93A6" />
    <circle cx="520" cy="180" r="3" fill="#8A93A6" />
    <rect x="0" y="360" width="600" height="140" fill="#1A2230" />
    <rect x="0" y="352" width="600" height="16" fill="#2E3A4E" />
    <rect x="118" y="196" width="176" height="128" rx={10} fill="#0E141C" />
    <rect x="130" y="208" width="152" height="104" rx={6} fill="#9FB6CC" opacity={0.85} />
    <rect x="144" y="224" width={70} height={8} rx={4} fill="#0E141C" opacity={0.5} />
    <rect x="144" y="242" width={110} height={8} rx={4} fill="#0E141C" opacity={0.3} />
    <rect x="190" y="324" width={32} height={30} fill="#0E141C" />
    <rect x="352" y="330" width="90" height="12" rx={6} fill="#D8DCE4" opacity={0.8} />
    <rect x="362" y="344" width="70" height="10" rx={5} fill="#D8DCE4" opacity={0.5} />
    <circle cx="262" cy="252" r="44" fill="#C9A184" />
    <path d="M 182 360 Q 187 290 262 282 Q 337 290 342 360 Z" fill="#39445A" />
    <circle cx="262" cy="238" r="46" fill="#1B212E" opacity={0.9} />
    <rect x="28" y="292" width="52" height="62" rx={8} fill="#E8B04B" opacity={0.25} />
    <circle cx="54" cy="284" r="13" fill={LAMP} opacity={0.9} />
    <rect x="48" y="238" width="12" height="48" fill="#2E3A4E" />
    <rect x="36" y="44" width="82" height="82" fill="none" stroke="#8A93A6" strokeWidth={7} />
    <line x1="77" y1="44" x2="77" y2="74" stroke="#E8B04B" strokeWidth={7} strokeLinecap="round" />
    <line x1="77" y1="85" x2="99" y2="85" stroke="#8A93A6" strokeWidth={7} strokeLinecap="round" />
  </>
);

// ----- nội dung ảnh 2 (600x500): phòng tối chỉ còn đèn ngủ -----
const NightRoom: React.FC = () => (
  <>
    <rect x="0" y="0" width="600" height="500" fill="#10131B" />
    <rect x="52" y="44" width="150" height="150" fill="#0B0E15" stroke="#2A3350" strokeWidth={7} />
    <circle cx="150" cy="100" r="22" fill="#D8DCE4" opacity={0.7} />
    <ellipse cx="300" cy="440" rx="240" ry="34" fill="#181D29" />
    <rect x="40" y="310" width="380" height="42" rx={10} fill="#242B3D" />
    <rect x="40" y="266" width="380" height="62" rx={20} fill="#2C3A55" />
    <rect x="40" y="292" width="240" height="62" rx={14} fill="#3A4A6B" />
    <rect x="318" y="250" width="88" height="42" rx={16} fill="#C9CFD8" />
    <rect x="86" y="238" width="200" height="46" rx={23} fill="#55627E" />
    <circle cx="306" cy="252" r="27" fill="#C9A184" />
    <path d="M 282 244 A 27 27 0 0 1 330 244 L 330 232 Q 306 214 282 232 Z" fill="#1B212E" />
    <rect x="452" y="300" width="96" height="130" rx={8} fill="#242B3D" />
    <rect x="484" y="238" width="10" height="66" fill="#242B3D" />
    <path d="M 458 240 L 522 240 L 510 206 L 470 206 Z" fill="#3A2E22" />
    <circle cx="489" cy="252" r="46" fill={LAMP} opacity={0.32} />
    <circle cx="489" cy="248" r="13" fill={LAMP} opacity={0.95} />
    <line x1="566" y1="150" x2="566" y2="420" stroke={LAMP} strokeWidth={7} opacity={0.65} />
  </>
);

// ----- nội dung ảnh mới (600x500): buổi sáng bình thường -----
export const MorningNew: React.FC = () => (
  <>
    <defs>
      <linearGradient id="mng" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F7E7BE" />
        <stop offset="1" stopColor="#EAC78D" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="600" height="500" fill="url(#mng)" />
    <rect x="150" y="36" width="300" height="230" fill="#FDF6E3" stroke="#8A6F4D" strokeWidth={9} />
    <line x1="300" y1="36" x2="300" y2="266" stroke="#8A6F4D" strokeWidth={7} />
    <line x1="150" y1="151" x2="450" y2="151" stroke="#8A6F4D" strokeWidth={7} />
    <circle cx="370" cy="110" r="40" fill="#FFFDF4" />
    <circle cx="370" cy="110" r="62" fill="#FFFDF4" opacity={0.35} />
    <path d="M 160 240 Q 220 200 280 236 Q 340 200 440 238 L 440 266 L 160 266 Z" fill="#9DB38A" />
    <rect x="0" y="330" width="600" height="170" fill="#D9B985" />
    <circle cx="215" cy="392" r="42" fill="#E9BE9C" />
    <circle cx="215" cy="382" r="44" fill="#4A3A2E" opacity={0.95} />
    <circle cx="215" cy="396" r="37" fill="#E9BE9C" />
    <path d="M 143 470 Q 148 420 215 414 Q 282 420 287 470 Z" fill="#7A6A52" />
    <circle cx="201" cy="394" r="4" fill="#2A2320" />
    <circle cx="229" cy="394" r="4" fill="#2A2320" />
    <path
      d="M 205 412 Q 215 419 225 412"
      fill="none"
      stroke="#2A2320"
      strokeWidth={4.5}
      strokeLinecap="round"
    />
    <rect x="420" y="420" width="56" height="50" rx={8} fill="#8A5A3A" />
    <path
      d="M 448 420 Q 444 380 420 366 M 448 420 Q 452 380 476 366 M 448 420 L 448 378"
      fill="none"
      stroke="#5E7A4E"
      strokeWidth={9}
      strokeLinecap="round"
    />
    <ellipse cx="418" cy="362" rx="24" ry="13" fill="#6E8A5E" transform="rotate(-24 418 362)" />
    <ellipse cx="478" cy="362" rx="24" ry="13" fill="#6E8A5E" transform="rotate(24 478 362)" />
  </>
);

// ----- nền hành lang đêm (mờ, dissolve nhẹ sau khung chính — không phải chủ thể) -----
const Corridor: React.FC<{o: number}> = ({o}) => (
  <g opacity={o}>
    <defs>
      <filter id="s5blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
    </defs>
    <g filter="url(#s5blur)">
      <rect x="0" y="0" width="1080" height="1920" fill="#0F0C09" />
      <polygon points="340,1250 740,1250 1080,1920 0,1920" fill="#171310" />
      <line x1="540" y1="1250" x2="540" y2="1920" stroke="#000" strokeWidth="4" opacity={0.5} />
      <line x1="340" y1="1250" x2="0" y2="1920" stroke="#000" strokeWidth="4" opacity={0.5} />
      <line x1="740" y1="1250" x2="1080" y2="1920" stroke="#000" strokeWidth={4} opacity={0.5} />
      {[0, 1, 2].map((i) => {
        const y = 560 + i * 230;
        const w = 150 - i * 18;
        return (
          <g key={i}>
            <rect
              x={60}
              y={y}
              width={w}
              height={190}
              fill="#1D150E"
              stroke={FRAME}
              strokeWidth={5}
            />
            <line
              x1={60 + w - 14}
              y1={y + 12}
              x2={60 + w - 14}
              y2={y + 178}
              stroke={LAMP}
              strokeWidth={6}
              opacity={0.55}
            />
            <rect
              x={1080 - 60 - w}
              y={y}
              width={w}
              height={190}
              fill="#1D150E"
              stroke={FRAME}
              strokeWidth={5}
            />
            <line
              x1={1080 - 60 - 14}
              y1={y + 12}
              x2={1080 - 60 - 14}
              y2={y + 178}
              stroke={LAMP}
              strokeWidth={6}
              opacity={0.55}
            />
          </g>
        );
      })}
      {[0, 1, 2].map((i) => {
        const y = 420 + i * 200;
        return (
          <g key={`l${i}`}>
            <circle cx="540" cy={y} r={60 - i * 8} fill={LAMP} opacity={0.16} />
            <circle cx="540" cy={y} r={12} fill={LAMP} opacity={0.8} />
          </g>
        );
      })}
      <circle cx="540" cy="1250" r="180" fill={LAMP} opacity={0.1} />
    </g>
  </g>
);

// ----- nội dung ảnh s5 (600x500): điện thoại với tin nhắn soạn dở -----
const PhoneDraft: React.FC<{f: number}> = ({f}) => {
  const cursor = f % 30 < 18 ? 1 : 0;
  return (
    <>
      <rect x="0" y="0" width="600" height="500" fill="#141821" />
      <rect x="0" y="380" width="600" height="120" fill="#10131B" />
      <rect x="440" y="30" width="120" height="110" fill="none" stroke="#2A3350" strokeWidth={7} />
      <circle cx="500" cy="80" r="26" fill="#D8DCE4" opacity={0.7} />
      <rect
        x="170"
        y="30"
        width="260"
        height="440"
        rx="38"
        fill="#0B0E14"
        stroke="#3A4A5E"
        strokeWidth={8}
      />
      <rect x="186" y="76" width="228" height="378" rx="12" fill="#1E2735" />
      <text
        x="300"
        y="108"
        textAnchor="middle"
        fontSize={22}
        fill="#8A93A6"
        style={{fontFamily: FONT}}
      >
        23:47
      </text>
      <rect x="200" y="126" width="150" height="44" rx="22" fill="#39445A" />
      <text
        x="275"
        y="155"
        textAnchor="middle"
        fontSize={21}
        fill="#D8DCE4"
        style={{fontFamily: FONT}}
      >
        Ngủ chưa?
      </text>
      <rect
        x="200"
        y="182"
        width="180"
        height="44"
        rx="22"
        fill="none"
        stroke="#5A6478"
        strokeWidth={3}
        strokeDasharray="8 7"
        opacity={0.7}
      />
      <text
        x="290"
        y="211"
        textAnchor="middle"
        fontSize={21}
        fill="#5A6478"
        style={{fontFamily: FONT}}
        opacity={0.8}
      >
        Mình ổn mà…
      </text>
      <line x1="212" y1="204" x2="368" y2="204" stroke="#5A6478" strokeWidth={3} opacity={0.8} />
      <rect
        x="200"
        y="300"
        width="200"
        height="110"
        rx="22"
        fill="#2E3A1E"
        stroke={LAMP}
        strokeWidth={4}
      />
      <text
        x="300"
        y="338"
        textAnchor="middle"
        fontSize={22}
        fill={CREAM}
        style={{fontFamily: FONT}}
      >
        Mọi người ơi,
      </text>
      <text
        x="300"
        y="368"
        textAnchor="middle"
        fontSize={22}
        fill={CREAM}
        style={{fontFamily: FONT}}
      >
        mình mệt quá…
      </text>
      <rect x="293" y="380" width="14" height="22" fill={LAMP} opacity={cursor} />
      <circle cx="370" cy="430" r="18" fill="none" stroke="#5A6478" strokeWidth={4} />
      <path
        d="M 362 430 L 378 430 M 372 422 L 380 430 L 372 438"
        stroke="#5A6478"
        strokeWidth={4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
};

// ---------- S4 (v2): montage 2 ảnh cũ dissolve nhẹ ----------
const P4 = [
  'Rồi nghe bạn ấy kể hết.',
  'Những đêm tăng ca muộn, mùi mì khuya lẫn tiếng quạt rè,',
  'một mình nuốt mệt vào trong.',
];
export const GapS4: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = GAP_SHOTS.s4;
  const zoom1 = 1 + 0.045 * ramp(f, 0, 80);
  const out1 = 1 - ramp(f, 78, 22);
  const in2 = ramp(f, 78, 22);
  const zoom2 = 1 + 0.045 * ramp(f, 90, 72);
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <Room lamp={0.45} id="s4">
        <g opacity={0.32}>
          <Chair x={200} y={1420} s={1.1} dim={1} />
          <Chair x={880} y={1420} s={1.1} flip dim={1} />
        </g>
      </Room>
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <g opacity={out1} transform={`translate(540 820) scale(${zoom1}) translate(-540 -820)`}>
          <Photo x={540} y={820} w={700} h={600} id="s4a" tint>
            <OldOffice />
          </Photo>
        </g>
        <g opacity={in2} transform={`translate(540 820) scale(${zoom2}) translate(-540 -820)`}>
          <Photo x={540} y={820} w={700} h={600} id="s4b" tint>
            <NightRoom />
          </Photo>
        </g>
      </svg>
      <GCaps sec={sec} duration={D} parts={P4} accents={['kể hết', 'quạt rè', 'nuốt mệt']} />
    </AbsoluteFill>
  );
};

// ---------- S5 (v2): 1 hình chính — điện thoại soạn dở; hành lang đêm chỉ dissolve nền mờ ----------
const P5 = [
  'Có tin nhắn soạn rồi lại xóa,',
  'chẳng dám gửi cho ai.',
  'Nhìn bạn bè đi xa, chỉ thấy mình đứng yên mà tủi.',
];
export const GapS5: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = GAP_SHOTS.s5;
  const zoom = 1 + 0.04 * ramp(f, 0, D);
  const inAll = ramp(f, 0, 16);
  const corridorO = 0.42 * ramp(f, 10, 30);
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <Room lamp={0.55} id="s5" />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <Corridor o={corridorO} />
        <g opacity={inAll} transform={`translate(540 830) scale(${zoom}) translate(-540 -830)`}>
          <Photo x={540} y={830} w={700} h={600} id="s5a">
            <PhoneDraft f={f} />
          </Photo>
        </g>
      </svg>
      <GCaps
        sec={sec}
        duration={D}
        parts={P5}
        accents={['soạn rồi lại xóa', 'gửi cho ai', 'đứng yên mà tủi']}
      />
    </AbsoluteFill>
  );
};

// ---------- S6 (v2): khung ảnh mới đặt cạnh khung cũ ----------
const P6 = [
  'Mình sẽ cho bạn ấy xem hôm nay.',
  'Chưa hoàn hảo đâu, vẫn mệt,',
  'nhưng biết nghỉ, biết nhờ giúp, biết tha cho mình hơn.',
];
export const GapS6: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = GAP_SHOTS.s6;
  const zoom = 1 + 0.05 * ramp(f, 0, D);
  const inAll = ramp(f, 0, 16);
  const newGlow = 0.25 + 0.65 * ramp(f, 76, 26);
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <Room lamp={0.65} id="s6" />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <g opacity={inAll} transform={`translate(540 830) scale(${zoom}) translate(-540 -830)`}>
          <g transform="translate(302 830) rotate(-3)">
            <Photo x={0} y={0} w={420} h={440} id="s6a" tint>
              <OldOffice />
            </Photo>
          </g>
          <g transform="translate(778 830) rotate(3)">
            <Photo x={0} y={0} w={420} h={470} id="s6b" label={false} glow={newGlow}>
              <MorningNew />
            </Photo>
          </g>
        </g>
      </svg>
      <GCaps sec={sec} duration={D} parts={P6} accents={['hôm nay', 'hoàn hảo', 'tha cho mình']} />
    </AbsoluteFill>
  );
};

// ---------- S7 (v2): cú đập duy nhất — cái ôm, đèn vàng tràn ----------
const P7 = ['Và trước khi rời đi, mình sẽ ôm bạn ấy một cái thật lâu,', 'rồi nói khẽ: cảm ơn nha.'];
export const GapS7: React.FC = () => {
  const f = useCurrentFrame();
  const {sec, duration: D} = GAP_SHOTS.s7;
  const lamp = interpolate(f, [10, 95], [0.55, 1], {...clamp, easing: soft});
  const zoom = 1 + 0.06 * ramp(f, 0, 100);
  const hugIn = ramp(f, 0, 20);
  const sway = Math.sin(f / 9) * 5;
  return (
    <AbsoluteFill style={{background: BG}}>
      <GapFonts />
      <Room lamp={lamp} id="s7" />
      <svg
        viewBox="0 0 1080 1920"
        width="1080"
        height="1920"
        style={{position: 'absolute', inset: 0}}
      >
        <defs>
          <radialGradient id="s7halo">
            <stop offset="0" stopColor={LAMP} stopOpacity={0.5} />
            <stop offset="0.7" stopColor={LAMP} stopOpacity={0.22} />
            <stop offset="1" stopColor={LAMP} stopOpacity={0} />
          </radialGradient>
        </defs>
        <g transform={`translate(540 880) scale(${zoom}) translate(-540 -880)`} opacity={hugIn}>
          <circle cx="540" cy="800" r="310" fill="url(#s7halo)" opacity={0.35 + 0.65 * lamp} />
          <Chair x={220} y={1420} s={0.95} dim={0.4} />
          <Chair x={860} y={1420} s={0.95} flip dim={0.4} />
          <g transform={`translate(0 ${sway})`}>
            <Bust x={480} y={930} s={1} sw="#6B7686" mood="down" tilt={7} f={f} />
            <Bust x={602} y={930} s={1.05} sw="#C9B18C" mood="soft" tilt={-7} f={f + 14} />
            <path
              d="M 614 940 Q 545 1000 476 928"
              fill="none"
              stroke="#C9B18C"
              strokeWidth={36}
              strokeLinecap="round"
            />
            <path
              d="M 468 946 Q 542 1010 606 932"
              fill="none"
              stroke="#6B7686"
              strokeWidth={36}
              strokeLinecap="round"
              opacity={0.95}
            />
          </g>
        </g>
      </svg>
      <GCaps sec={sec} duration={D} parts={P7} accents={['ôm', 'cảm ơn nha']} />
    </AbsoluteFill>
  );
};
