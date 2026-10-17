import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {
  AMBER,
  Bust,
  CcCaps,
  CcFonts,
  CHILD_TOP,
  CREAM,
  FONT,
  INK,
  MOM_TOP,
  MUTED,
  NIGHT_BG,
  NIGHT_DEEP,
  NightWindow,
  MealTable,
  PhoneFrame,
  ROOM_CHILD,
  SKIN,
  SoloTable,
  VoiceWave,
  WarmGlow,
  WOOD,
  bob,
  clamp,
} from './kit';
import {CGN_SHOTS} from './timeline';

const W = 1080;
const H = 1920;

// s7–s8: TwoRoomsCall — hai panel riêng (Con tường lạnh / Mẹ tường ấm) +
// VoiceWave nối giữa + phone portrait cầu nối. Caption dùng kit CcCaps,
// phone cầu nối dùng kit PhoneFrame (màn đêm phủ tối bên trong).

// Panel Con: tường lạnh ROOM_CHILD, NightWindow mưa riêng, bust áp phone,
// SoloTable 1 bát cơm nguội (kit SoloTable KHÔNG steam).
const PanelCon: React.FC<{f: number; sway: number; idp: string}> = ({f, sway, idp}) => (
  <g>
    <defs>
      <clipPath id={`cgn${idp}winCon`}>
        <rect x={640} y={200} width={340} height={250} rx={24} />
      </clipPath>
    </defs>
    <rect
      x={60}
      y={100}
      width={960}
      height={650}
      rx={36}
      fill={ROOM_CHILD}
      stroke={CHILD_TOP}
      strokeWidth={4}
    />
    <rect x={100} y={136} width={130} height={52} rx={26} fill={CHILD_TOP} />
    <text
      x={165}
      y={172}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={30}
      fontWeight={600}
      fill={CREAM}
    >
      Con
    </text>
    <g clipPath={`url(#cgn${idp}winCon)`}>
      <NightWindow x={640} y={200} w={340} h={250} />
    </g>
    <g transform={`translate(0 ${(bob(f) * sway).toFixed(2)})`}>
      <Bust x={260} y={480} mood="soft" mom={false} />
      <rect x={328} y={412} width={58} height={116} rx={19} fill={INK} />
      <rect x={336} y={424} width={42} height={78} rx={9} fill="#10151B" />
      <ellipse cx={340} cy={540} rx={36} ry={50} fill={SKIN} />
    </g>
    <SoloTable x={790} y={680} />
  </g>
);

// Panel Mẹ: tường ấm NIGHT_BG, glow hổ phách, NightWindow riêng,
// MealTable mâm 2 bát + steam ấm (kit MealTable có sẵn steam).
const PanelMe: React.FC<{f: number; sway: number; glowId: string; idp: string}> = ({
  f,
  sway,
  glowId,
  idp,
}) => (
  <g>
    <defs>
      <clipPath id={`cgn${idp}winMe`}>
        <rect x={100} y={940} width={280} height={210} rx={22} />
      </clipPath>
    </defs>
    <rect
      x={60}
      y={830}
      width={960}
      height={640}
      rx={36}
      fill={NIGHT_BG}
      stroke={WOOD}
      strokeWidth={4}
    />
    <circle cx={800} cy={1080} r={280} fill={`url(#${glowId})`} opacity={0.8} />
    <rect x={100} y={866} width={130} height={52} rx={26} fill={MOM_TOP} />
    <text
      x={165}
      y={902}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={30}
      fontWeight={600}
      fill={CREAM}
    >
      Mẹ
    </text>
    <g clipPath={`url(#cgn${idp}winMe)`}>
      <NightWindow x={100} y={940} w={280} h={210} />
    </g>
    <MealTable x={280} y={1360} />
    <g transform={`translate(0 ${(bob(f) * sway).toFixed(2)})`}>
      <Bust x={810} y={1205} mood="soft" mom />
      <rect x={678} y={1137} width={58} height={116} rx={19} fill={INK} />
      <rect x={686} y={1149} width={42} height={78} rx={9} fill="#10151B" />
      <ellipse cx={690} cy={1263} rx={36} ry={50} fill={SKIN} />
    </g>
  </g>
);

// Dải VoiceWave nối hai panel, nằm hai bên phone cầu nối.
// s8 đã cúp máy: sóng tắt (tĩnh + mờ).
const BridgeWaves: React.FC<{f: number; dim: boolean}> = ({f, dim}) => (
  <g opacity={dim ? 0.35 : 1}>
    <VoiceWave x={100} y={790} f={dim ? 0 : f} />
    <VoiceWave x={770} y={790} f={dim ? 0 : f} />
  </g>
);

// Nhãn "minh hoạ" vẽ lại trên màn đêm (lớp phủ tối che pill gốc của
// PhoneFrame — pill là bắt buộc theo design-spec §5, cùng tọa độ kit).
const MinhHoaOnDark: React.FC = () => (
  <g>
    <rect x={437} y={642} width={172} height={52} rx={26} fill={MUTED} opacity={0.9} />
    <text
      x={523}
      y={678}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={30}
      fontWeight={600}
      fill="#FFFFFF"
    >
      minh hoạ
    </text>
  </g>
);

// s7: phone cầu nối "Đang gọi — Mẹ" + timer chạy + sóng thoại sống.
const PhoneCalling: React.FC<{f: number}> = ({f}) => {
  const t = Math.max(0, Math.floor((f - 4) / 30));
  const mm = String(Math.floor(t / 60)).padStart(2, '0');
  const ss = String(t % 60).padStart(2, '0');
  const pulse = 0.55 + 0.45 * Math.sin(f / 9);
  const bars = [30, 52, 38, 60, 34, 48, 28];
  return (
    <PhoneFrame x={395} y={600} w={280} h={400} border="#0F0C0A">
      <rect x={413} y={618} width={244} height={364} rx={50} fill="#171310" />
      <MinhHoaOnDark />
      <text
        x={535}
        y={775}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={40}
        fontWeight={600}
        fill={CREAM}
      >
        Đang gọi
      </text>
      <text
        x={535}
        y={830}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={46}
        fontWeight={600}
        fill={CREAM}
      >
        Mẹ
      </text>
      <text
        x={535}
        y={882}
        textAnchor="middle"
        fontFamily={FONT}
        fontSize={34}
        fontWeight={600}
        fill={AMBER}
      >
        {mm}:{ss}
      </text>
      <g fill={AMBER}>
        {bars.map((h, i) => {
          const hh = h * (0.8 + 0.2 * Math.sin(f / 8 + i));
          return <rect key={i} x={480 + i * 17} y={918 - hh / 2} width={9} height={hh} rx={4.5} />;
        })}
      </g>
      <circle cx={535} cy={960} r={9} fill={AMBER} opacity={pulse} />
    </PhoneFrame>
  );
};

// s8: cùng phone, đã cúp máy — "Đã gọi lại ✓" hổ phách + sóng tĩnh.
// CẤM hiện "Đang gọi" (voice đã "Cúp máy rồi").
const PhoneDone: React.FC = () => (
  <PhoneFrame x={395} y={600} w={280} h={400} border="#0F0C0A">
    <rect x={413} y={618} width={244} height={364} rx={50} fill="#171310" />
    <MinhHoaOnDark />
    <text
      x={535}
      y={800}
      textAnchor="middle"
      fontFamily={FONT}
      fontSize={34}
      fontWeight={600}
      fill={AMBER}
    >
      Đã gọi lại ✓
    </text>
    <g fill={AMBER}>
      <rect x={480} y={862} width={9} height={36} rx={4.5} />
      <rect x={497} y={852} width={9} height={56} rx={4.5} />
      <rect x={514} y={862} width={9} height={36} rx={4.5} opacity={0.7} />
      <rect x={531} y={857} width={9} height={46} rx={4.5} opacity={0.7} />
      <rect x={548} y={865} width={9} height={30} rx={4.5} opacity={0.5} />
      <rect x={565} y={862} width={9} height={36} rx={4.5} opacity={0.5} />
    </g>
    <circle cx={535} cy={945} r={10} fill={AMBER} opacity={0.8} />
  </PhoneFrame>
);

// Thoại v3 (voice.json): s7 22 từ, accent cơm đã nguội · nhỏ xíu.
// Vòng 3: bỏ "Ngoài cửa, mưa vẫn gõ nhẹ." (suy diễn fact theo review vòng 2).
const S7_PARTS = [
  'Mình vừa ăn bát cơm đã nguội,',
  'vừa kể: hôm nay ăn gì,',
  'chỗ con có mưa không.',
  'Toàn chuyện nhỏ xíu.',
];
const S7_ACCENTS = ['cơm đã nguội', '', '', 'nhỏ xíu'];

// Thoại v2: s8 HIGHLIGHT (c). Accent "Một cuộc gọi lại thôi".
const S8_PARTS = [
  'Cúp máy rồi mình nghĩ mãi:',
  'có những người chẳng cần',
  'mình làm gì lớn lao.',
  'Một cuộc gọi lại thôi,',
  'họ cũng vui rồi.',
];
const S8_ACCENTS = ['', '', '', 'Một cuộc gọi lại thôi', ''];

export const CgnS7: React.FC = () => {
  const f = useCurrentFrame();
  const D = CGN_SHOTS.s7.duration;
  const zoom = interpolate(f, [0, D - 1], [1, 1.05], clamp);
  return (
    <AbsoluteFill style={{background: NIGHT_DEEP}}>
      <CcFonts />
      <div
        style={{width: W, height: H, transform: `scale(${zoom})`, transformOrigin: '540px 960px'}}
      >
        <svg width={W} height={H} viewBox="0 0 1080 1920">
          <defs>
            <radialGradient id="cgnS7glow">
              <stop offset="0" stopColor={AMBER} stopOpacity={0.5} />
              <stop offset="1" stopColor={AMBER} stopOpacity={0} />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={W} height={H} fill={NIGHT_DEEP} />
          <PanelCon f={f} sway={1} idp="s7" />
          <BridgeWaves f={f} dim={false} />
          <PanelMe f={f} sway={1} glowId="cgnS7glow" idp="s7" />
          <PhoneCalling f={f} />
          <WarmGlow level={0.6} />
        </svg>
      </div>
      <CcCaps sec={CGN_SHOTS.s7.sec} duration={D} parts={S7_PARTS} accents={S7_ACCENTS} />
    </AbsoluteFill>
  );
};

export const CgnS8: React.FC = () => {
  const f = useCurrentFrame();
  const D = CGN_SHOTS.s8.duration;
  const zoom = interpolate(f, [0, D - 1], [1, 1.015], clamp);
  // Shimmer ấm khớp SFX warm-chime (s8+120, dài 70f). Không CTA.
  const shim = interpolate(f, [120, 135, 175, 190], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{background: NIGHT_DEEP}}>
      <CcFonts />
      <div
        style={{width: W, height: H, transform: `scale(${zoom})`, transformOrigin: '540px 960px'}}
      >
        <svg width={W} height={H} viewBox="0 0 1080 1920">
          <defs>
            <radialGradient id="cgnS8glow">
              <stop offset="0" stopColor={AMBER} stopOpacity={0.5} />
              <stop offset="1" stopColor={AMBER} stopOpacity={0} />
            </radialGradient>
          </defs>
          <rect x={0} y={0} width={W} height={H} fill={NIGHT_DEEP} />
          <PanelCon f={f} sway={0.4} idp="s8" />
          <BridgeWaves f={f} dim />
          <PanelMe f={f} sway={0.4} glowId="cgnS8glow" idp="s8" />
          <PhoneDone />
          {shim > 0 && (
            <g opacity={shim}>
              <circle cx={535} cy={800} r={200} fill={AMBER} opacity={0.12} />
              <circle cx={380} cy={640} r={7} fill={CREAM} opacity={0.8} />
              <circle cx={692} cy={700} r={5} fill={CREAM} opacity={0.7} />
              <circle cx={660} cy={960} r={6} fill={AMBER} opacity={0.8} />
              <circle cx={410} cy={940} r={5} fill={AMBER} opacity={0.7} />
            </g>
          )}
          <WarmGlow level={0.4} />
        </svg>
      </div>
      {/* Caption tắt ở D-30: hold lặng cuối 30f (outro hold đã có trong timeline). */}
      <CcCaps sec={CGN_SHOTS.s8.sec} duration={D - 30} parts={S8_PARTS} accents={S8_ACCENTS} />
    </AbsoluteFill>
  );
};
