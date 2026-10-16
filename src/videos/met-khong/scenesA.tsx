import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {clamp, soft} from '../../stick';
import {BG, WALL, GRAY, CREAM, LAMP, INK, FONT, VO, ramp, MetCaps, MinhHoa, LampGlow} from './kit';
import {MET_SHOTS} from './timeline';

// metkhong scenes A (s1-s4) v2: "chung cu khuya xam lanh + mot bong den am".
// Tat ca chi tiet ve bang CSS/SVG deterministic, frame-driven, khong random.

// Deterministic pseudo-random tu index (khong Math.random / Date.now).
const prand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const SKIN_KID = '#EBC08F';
const SKIN_ADULT = '#D9A26F';
const SHIRT_KID = '#C96F4A';
const SHIRT_ADULT = '#3E5A78';
const PANTS = '#2E3A4F';
const WOOD = '#4A3524';
const BOX = '#8A5F36';
const BOX_D = '#6E4A29';

// ---------------------------------------------------------------- s1
export const MetS1: React.FC = () => {
  const f = useCurrentFrame();
  const d = MET_SHOTS.s1.duration;
  const zoom = interpolate(f, [0, d], [1, 1.045], {...clamp, easing: soft});
  const enter = ramp(f, 4, 16);
  const handIn = interpolate(f, [10, 48], [140, 0], {...clamp, easing: soft});
  const wobble = Math.sin(f / 14) * 5;
  const warm = interpolate(f, [6, 50], [0.55, 0.9], clamp);
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <LampGlow glow={0.55} flick={0.3} />
      {/* vignette am ky uc */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: warm,
          background:
            'radial-gradient(ellipse 700px 620px at 50% 42%, rgba(255,190,110,.20), rgba(20,10,5,.55) 78%)',
        }}
      />
      {/* khung anh ky uc (>=40% khung: cao ~1000px) */}
      <div
        style={{
          position: 'absolute',
          left: 90,
          right: 90,
          top: 270,
          height: 1000,
          transform: `rotate(-2deg) scale(${zoom})`,
          opacity: enter,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#EFE3CC',
            borderRadius: 26,
            boxShadow: '0 30px 90px rgba(0,0,0,.6), 0 0 90px rgba(255,196,107,.14)',
            border: '1px solid rgba(120,90,60,.4)',
          }}
        />
        {/* anh ben trong */}
        <div
          style={{
            position: 'absolute',
            left: 44,
            right: 44,
            top: 44,
            bottom: 190,
            borderRadius: 12,
            overflow: 'hidden',
            background: 'linear-gradient(180deg,#5A3D26 0%,#8A5A33 46%,#B07B45 62%,#6B4A2E 100%)',
          }}
        >
          <svg
            viewBox="0 0 900 620"
            style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}
          >
            <defs>
              <radialGradient id="met-sun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD894" />
                <stop offset="100%" stopColor="#E8963F" />
              </radialGradient>
            </defs>
            {/* mat troi + may */}
            <circle cx={450} cy={250} r={92} fill="url(#met-sun)" opacity={0.95} />
            <ellipse cx={230} cy={150} rx={110} ry={30} fill="#F3DEB8" opacity={0.35} />
            <ellipse cx={680} cy={120} rx={130} ry={32} fill="#F3DEB8" opacity={0.3} />
            {/* mat dat san */}
            <rect x={0} y={470} width={900} height={150} fill="#3D2A1B" />
            <rect x={0} y={462} width={900} height={14} fill="#5A4028" />
            <ellipse cx={450} cy={540} rx={330} ry={26} fill="#2A1D12" opacity={0.8} />
            {/* gach san deterministic */}
            {Array.from({length: 9}).map((_, i) => (
              <line
                key={i}
                x1={40 + i * 95}
                y1={484}
                x2={20 + i * 98}
                y2={620}
                stroke="#241811"
                strokeWidth={5}
                opacity={0.8}
              />
            ))}
            {/* vet xuoc dau goi + duong chuyen dong cua be */}
            <g transform={`translate(${wobble} 0)`}>
              <path
                d="M150 380 Q 200 330 260 300"
                stroke="#FFE3B0"
                strokeWidth={7}
                fill="none"
                strokeLinecap="round"
                opacity={0.6}
              />
              <path
                d="M120 430 Q 175 390 240 360"
                stroke="#FFE3B0"
                strokeWidth={5}
                fill="none"
                strokeLinecap="round"
                opacity={0.4}
              />
              {/* be dang nga */}
              <g transform="rotate(-14 320 380)">
                <ellipse cx={320} cy={520} rx={66} ry={14} fill="#241811" opacity={0.55} />
                <circle cx={320} cy={330} r={52} fill={SKIN_KID} />
                <circle cx={302} cy={322} r={7} fill="#2A1A10" />
                <path
                  d="M300 352 Q 320 364 342 350"
                  stroke="#7A4A28"
                  strokeWidth={6}
                  fill="none"
                  strokeLinecap="round"
                />
                <rect x={284} y={382} width={72} height={104} rx={26} fill={SHIRT_KID} />
                <rect
                  x={216}
                  y={392}
                  width={76}
                  height={30}
                  rx={15}
                  fill={SKIN_KID}
                  transform="rotate(-24 216 392)"
                />
                <rect
                  x={348}
                  y={392}
                  width={76}
                  height={30}
                  rx={15}
                  fill={SKIN_KID}
                  transform="rotate(18 348 392)"
                />
                <rect x={288} y={480} width={28} height={66} rx={14} fill={PANTS} />
                <rect x={324} y={480} width={28} height={66} rx={14} fill={PANTS} />
                {/* vet xuoc dau goi */}
                <circle cx={354} cy={500} r={12} fill="#B23A2E" opacity={0.9} />
                <circle cx={354} cy={500} r={5} fill="#7E241B" />
              </g>
            </g>
            {/* hai ban tay nguoi lon do lay (truot vao tu phai) */}
            <g transform={`translate(${handIn} 0)`}>
              <rect
                x={560}
                y={330}
                width={230}
                height={64}
                rx={32}
                fill={SHIRT_ADULT}
                transform="rotate(-8 560 330)"
              />
              <rect
                x={560}
                y={430}
                width={230}
                height={64}
                rx={32}
                fill="#354E6B"
                transform="rotate(6 560 430)"
              />
              <ellipse
                cx={560}
                cy={340}
                rx={44}
                ry={52}
                fill={SKIN_ADULT}
                transform="rotate(-8 560 340)"
              />
              <ellipse
                cx={560}
                cy={452}
                rx={44}
                ry={52}
                fill={SKIN_ADULT}
                transform="rotate(6 560 452)"
              />
              {[0, 1, 2, 3].map((i) => (
                <g key={i}>
                  <rect
                    x={492 - i * 4}
                    y={304 + i * 26}
                    width={72}
                    height={22}
                    rx={11}
                    fill={SKIN_ADULT}
                    transform={`rotate(-8 492 ${304 + i * 26})`}
                  />
                  <rect
                    x={492 - i * 4}
                    y={416 + i * 26}
                    width={72}
                    height={22}
                    rx={11}
                    fill={SKIN_ADULT}
                    transform={`rotate(6 492 ${416 + i * 26})`}
                  />
                </g>
              ))}
              {/* tay ao cua be cham toi */}
              <rect
                x={392}
                y={398}
                width={80}
                height={26}
                rx={13}
                fill={SKIN_KID}
                transform="rotate(10 392 398)"
              />
            </g>
          </svg>
          {/* hat bui ky uc */}
          {Array.from({length: 10}).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: 8 + prand(i) * 10,
                height: 8 + prand(i) * 10,
                borderRadius: 20,
                background: 'rgba(255,220,160,.5)',
                left: prand(i + 40) * 820,
                top: 40 + prand(i + 80) * 480,
                transform: `translateY(${Math.sin(f / 18 + i * 1.7) * 14}px)`,
                opacity: 0.35 + prand(i + 3) * 0.4,
              }}
            />
          ))}
        </div>
        {/* chu thich trong khung (>=56px, tren vung caption) */}
        <div
          style={{
            position: 'absolute',
            left: 44,
            right: 44,
            bottom: 56,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{fontFamily: FONT, fontSize: 58, fontWeight: 600, color: '#4A3423'}}>
            sân nhà · 1998
          </div>
          <div style={{fontFamily: FONT, fontSize: 58, color: '#B23A2E'}}>✚</div>
        </div>
        {/* 4 goc dan bang keo */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 170,
              height: 52,
              background: 'rgba(232,210,170,.88)',
              boxShadow: '0 4px 14px rgba(0,0,0,.35)',
              left: i % 2 === 0 ? -58 : undefined,
              right: i % 2 === 1 ? -58 : undefined,
              top: i < 2 ? -24 : undefined,
              bottom: i >= 2 ? -24 : undefined,
              transform: `rotate(${i === 0 ? -38 : i === 1 ? 38 : i === 2 ? 38 : -38}deg)`,
            }}
          />
        ))}
      </div>
      <MinhHoa />
      <MetCaps
        sec={MET_SHOTS.s1.sec}
        duration={d}
        parts={['Hồi nhỏ, ngã một cái là có người', 'chạy tới hỏi: Đau không con?']}
        accents={['Đau không con?']}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- s2
const DUST_N = 16;
export const MetS2: React.FC = () => {
  const f = useCurrentFrame();
  const d = MET_SHOTS.s2.duration;
  const enter = ramp(f, 2, 14);
  const reach = interpolate(f, [0, d], [70, 0], {...clamp, easing: soft});
  const lit = interpolate(f, [VO + 28, VO + 78], [0, 1], {...clamp, easing: soft});
  const sway = Math.sin(f / 26) * 1.4;
  const glow = 0.45 + 0.75 * lit;
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <LampGlow glow={glow} flick={0.7 * (1 - lit) + 0.12} />
      {/* tran nha + day dien */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 150,
          background: INK,
          opacity: enter,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 10,
            background: '#232D40',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 520,
            top: 150,
            width: 14,
            height: 130,
            background: '#0A0D13',
          }}
        />
      </div>
      {/* dui den + bong den */}
      <div style={{position: 'absolute', left: 440, top: 272, width: 174, opacity: enter}}>
        <div
          style={{
            margin: '0 auto',
            width: 92,
            height: 56,
            borderRadius: 14,
            background: '#2A3547',
            border: '1px solid rgba(243,237,226,.2)',
          }}
        />
        <div style={{position: 'relative', margin: '6px auto 0', width: 130, height: 130}}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 70,
              background: '#3A4356',
              border: '2px solid #232D40',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 70,
              background: LAMP,
              opacity: lit,
              boxShadow: `0 0 ${60 + lit * 130}px ${20 + lit * 60}px rgba(255,196,107,${0.35 + lit * 0.45})`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 30,
              top: 30,
              width: 34,
              height: 34,
              borderRadius: 20,
              background: 'rgba(255,255,255,.85)',
              opacity: 0.25 + lit * 0.65,
            }}
          />
        </div>
      </div>
      {/* quang sang hinh non xuong nguoi */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          top: 400,
          height: 900,
          opacity: 0.08 + lit * 0.5,
          background:
            'linear-gradient(180deg, rgba(255,196,107,.55), rgba(255,196,107,.06) 75%, transparent)',
          clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0% 100%)',
        }}
      />
      {/* hat bui bay trong quang sang (deterministic theo index) */}
      {Array.from({length: DUST_N}).map((_, i) => {
        const span = 950;
        const speed = 1.1 + prand(i + 7) * 2.2;
        const y = (prand(i + 100) * span + f * speed) % span;
        const x = 540 + (prand(i + 200) - 0.5) * (220 + y * 0.55) + Math.sin(f / 20 + i * 2.1) * 22;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: 430 + y,
              width: 6 + prand(i + 300) * 11,
              height: 6 + prand(i + 300) * 11,
              borderRadius: 20,
              background: 'rgba(255,214,150,.8)',
              opacity: lit * (0.3 + prand(i + 400) * 0.55),
              boxShadow: '0 0 12px rgba(255,196,107,.7)',
            }}
          />
        );
      })}
      {/* ghe + nguoi kieng chan (cao ~1100px) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 596 + reach * 0.3,
          opacity: enter,
          transform: `rotate(${sway * 0.4}deg)`,
        }}
      >
        {/* ghe go */}
        <div
          style={{
            position: 'absolute',
            left: 300,
            top: 560,
            width: 480,
            height: 44,
            borderRadius: 12,
            background: WOOD,
            boxShadow: '0 14px 40px rgba(0,0,0,.5)',
          }}
        />
        {[0, 1].map((r) =>
          [0, 1].map((c) => (
            <div
              key={`${r}${c}`}
              style={{
                position: 'absolute',
                left: 322 + c * 410,
                top: 604 + r * 96,
                width: 34,
                height: 112,
                borderRadius: 10,
                background: '#3A2A1C',
              }}
            />
          )),
        )}
        <div
          style={{
            position: 'absolute',
            left: 300,
            top: 792,
            width: 480,
            height: 18,
            borderRadius: 9,
            background: '#2E2115',
          }}
        />
        {/* chan dung tren ghe, kieng got */}
        <div
          style={{
            position: 'absolute',
            left: 452,
            top: 340,
            width: 52,
            height: 230,
            borderRadius: 24,
            background: PANTS,
            transform: 'rotate(4deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 576,
            top: 340,
            width: 52,
            height: 230,
            borderRadius: 24,
            background: '#34405A',
            transform: 'rotate(-4deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 440,
            top: 548,
            width: 76,
            height: 30,
            borderRadius: 15,
            background: SKIN_ADULT,
            transform: 'rotate(4deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 564,
            top: 548,
            width: 76,
            height: 30,
            borderRadius: 15,
            background: SKIN_ADULT,
            transform: 'rotate(-4deg)',
          }}
        />
        {/* than + dau */}
        <div
          style={{
            position: 'absolute',
            left: 470,
            top: 150,
            width: 140,
            height: 210,
            borderRadius: 60,
            background: '#3B4A63',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 500,
            top: 60,
            width: 92,
            height: 104,
            borderRadius: 48,
            background: SKIN_ADULT,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 500,
            top: 44,
            width: 92,
            height: 44,
            borderRadius: 40,
            background: '#1C1410',
          }}
        />
        {/* tay phai voi len bong den */}
        <div
          style={{
            position: 'absolute',
            left: 560,
            top: -190 + reach,
            width: 46,
            height: 330,
            borderRadius: 23,
            background: SKIN_ADULT,
            transform: 'rotate(-8deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 528,
            top: -226 + reach,
            width: 96,
            height: 60,
            borderRadius: 30,
            background: SKIN_ADULT,
          }}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 522 + i * 22,
              top: -244 + reach,
              width: 20,
              height: 44,
              borderRadius: 10,
              background: SKIN_ADULT,
            }}
          />
        ))}
        {/* tay trai dang ra giu thang bang */}
        <div
          style={{
            position: 'absolute',
            left: 330,
            top: 170,
            width: 150,
            height: 42,
            borderRadius: 21,
            background: SKIN_ADULT,
            transform: 'rotate(14deg)',
          }}
        />
      </div>
      {/* san nha */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1426,
          bottom: 0,
          background: '#0C1017',
          opacity: enter,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 8,
            background: '#232D40',
          }}
        />
      </div>
      <MinhHoa />
      <MetCaps
        sec={MET_SHOTS.s2.sec}
        duration={d}
        parts={['Lớn rồi thì khác.', 'Bóng đèn cháy cũng tự bắc ghế thay.']}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- s3
export const MetS3: React.FC = () => {
  const f = useCurrentFrame();
  const d = MET_SHOTS.s3.duration;
  const half = Math.floor(d / 2);
  const outA = f < half ? 1 : interpolate(f, [half, half + 12], [1, 0], clamp);
  const inB = ramp(f, half, 12);
  const lift = interpolate(f, [0, half], [46, 0], {...clamp, easing: soft});
  const scr = interpolate(f, [half, d], [40, 0], {...clamp, easing: soft});
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <LampGlow glow={0.4} flick={0.2} />
      {outA > 0 && (
        <div style={{position: 'absolute', inset: 0, opacity: outA}}>
          {/* cau thang tro: 4 mat bac len dan sang phai + tay vin song song */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 120 + i * 160,
                top: 600 - i * 88,
                width: 250,
                height: 42,
                borderRadius: 8,
                background: i % 2 ? '#232D40' : '#2A3547',
                border: '1px solid rgba(243,237,226,.12)',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              left: 150,
              top: 268,
              width: 700,
              height: 16,
              borderRadius: 8,
              background: '#3A4356',
              transform: 'rotate(-29deg)',
              transformOrigin: 'left center',
            }}
          />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 232 + i * 160,
                top: 462 - i * 88,
                width: 14,
                height: 140,
                background: '#3A4356',
              }}
            />
          ))}
          {/* den cau thang */}
          <div
            style={{
              position: 'absolute',
              left: 880,
              top: 330,
              width: 60,
              height: 60,
              borderRadius: 30,
              background: LAMP,
              boxShadow: '0 0 60px 20px rgba(255,196,107,.4)',
            }}
          />
          {/* thung carton (tam nhin thap, be bo len) */}
          <div
            style={{
              position: 'absolute',
              left: 210,
              top: 560 + lift,
              width: 660,
              height: 600,
              transform: 'rotate(-1.5deg)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 60,
                top: -40,
                width: 540,
                height: 90,
                background: BOX_D,
                clipPath: 'polygon(0 100%, 8% 0, 92% 0, 100% 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 40,
                width: 660,
                height: 560,
                borderRadius: 22,
                background: BOX,
                border: '2px solid rgba(40,22,10,.5)',
                boxShadow: '0 30px 80px rgba(0,0,0,.55)',
              }}
            />
            {/* bang keo chu thap */}
            <div
              style={{
                position: 'absolute',
                left: 290,
                top: 40,
                width: 80,
                height: 560,
                background: 'rgba(240,222,180,.85)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 240,
                width: 660,
                height: 70,
                background: 'rgba(240,222,180,.8)',
              }}
            />
            {/* nhan dia chi */}
            <div
              style={{
                position: 'absolute',
                left: 60,
                top: 330,
                width: 540,
                height: 252,
                borderRadius: 10,
                background: '#F3EDE2',
                boxShadow: '0 6px 20px rgba(0,0,0,.4)',
                padding: '16px 24px',
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 58,
                  fontWeight: 600,
                  color: '#1E2633',
                  lineHeight: 1.3,
                }}
              >
                PHÒNG 302
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 58,
                  fontWeight: 600,
                  color: '#1E2633',
                  lineHeight: 1.3,
                }}
              >
                NGÁCH 5
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 58,
                  fontWeight: 600,
                  color: '#6E4A29',
                  lineHeight: 1.3,
                }}
              >
                NHẸ TAY ↑↑
              </div>
            </div>
            {/* hai tay be hai ben thung */}
            <div
              style={{
                position: 'absolute',
                left: -90,
                top: 220,
                width: 150,
                height: 70,
                borderRadius: 35,
                background: SHIRT_ADULT,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -150,
                top: 205,
                width: 90,
                height: 100,
                borderRadius: 40,
                background: SKIN_ADULT,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -90,
                top: 220,
                width: 150,
                height: 70,
                borderRadius: 35,
                background: SHIRT_ADULT,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -150,
                top: 205,
                width: 90,
                height: 100,
                borderRadius: 40,
                background: SKIN_ADULT,
              }}
            />
          </div>
        </div>
      )}
      {inB > 0 && (
        <div
          style={{position: 'absolute', inset: 0, opacity: inB, transform: `translateY(${scr}px)`}}
        >
          {/* ban dem + man hinh */}
          <div
            style={{
              position: 'absolute',
              left: 150,
              top: 420,
              width: 780,
              height: 560,
              borderRadius: 28,
              background: '#0A0E15',
              border: '2px solid rgba(154,163,178,.3)',
              boxShadow: '0 0 90px rgba(120,160,255,.10), 0 30px 80px rgba(0,0,0,.6)',
              padding: '34px 40px',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
              <div style={{width: 26, height: 26, borderRadius: 13, background: '#E05A4E'}} />
              <div style={{width: 26, height: 26, borderRadius: 13, background: '#E8B04B'}} />
              <div style={{width: 26, height: 26, borderRadius: 13, background: '#5AC878'}} />
              <div
                style={{
                  marginLeft: 'auto',
                  fontFamily: FONT,
                  fontSize: 64,
                  fontWeight: 600,
                  color: LAMP,
                }}
              >
                23:47
              </div>
            </div>
            <div
              style={{
                marginTop: 26,
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 58,
                color: CREAM,
                lineHeight: 1.6,
              }}
            >
              <div>
                <span style={{color: '#7EA2E8'}}>while</span> (đêm) {'{'}
              </div>
              <div style={{paddingLeft: 48}}>làm_tiếp();</div>
              <div>{'}'}</div>
            </div>
            {[
              ['#5AC878', 420],
              ['#7EA2E8', 560],
              ['#9AA3B2', 340],
              ['#E8B04B', 480],
            ].map(([c, w], i) => (
              <div
                key={i}
                style={{
                  marginTop: 20,
                  width: w as number,
                  height: 22,
                  borderRadius: 11,
                  background: c as string,
                  opacity: 0.55,
                }}
              />
            ))}
          </div>
          {/* ban phim goi y */}
          <div
            style={{
              position: 'absolute',
              left: 230,
              top: 1010,
              width: 620,
              height: 120,
              borderRadius: 18,
              background: '#1A2230',
              border: '1px solid rgba(154,163,178,.25)',
            }}
          >
            {Array.from({length: 18}).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 30 + (i % 9) * 62,
                  top: 24 + Math.floor(i / 9) * 50,
                  width: 48,
                  height: 36,
                  borderRadius: 8,
                  background: prand(i + 11) > 0.85 ? LAMP : '#2E3A4F',
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
          {/* coc ca phe boc khoi */}
          <div style={{position: 'absolute', left: 700, top: 1060, width: 220, height: 220}}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 70 + i * 36,
                  top: -70 + ((f * 2 + i * 60) % 90) * -0.6,
                  width: 18,
                  height: 70,
                  borderRadius: 12,
                  background: 'rgba(243,237,226,.35)',
                  opacity: 0.5 - (((f * 2 + i * 60) % 90) / 90) * 0.4,
                  transform: `translateX(${Math.sin(f / 16 + i * 2) * 10}px) skewX(-6deg)`,
                  filter: 'blur(3px)',
                }}
              />
            ))}
            <div
              style={{
                position: 'absolute',
                left: 30,
                top: 60,
                width: 160,
                height: 130,
                borderRadius: '20px 20px 70px 70px',
                background: '#E8E0D0',
                boxShadow: '0 16px 40px rgba(0,0,0,.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 45,
                top: 72,
                width: 130,
                height: 34,
                borderRadius: 17,
                background: '#4A2E18',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 80,
                width: 56,
                height: 70,
                borderRadius: 26,
                border: '14px solid #E8E0D0',
                borderLeft: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 10,
                top: 195,
                width: 200,
                height: 22,
                borderRadius: 11,
                background: '#2A3547',
              }}
            />
          </div>
        </div>
      )}
      <MinhHoa />
      <MetCaps
        sec={MET_SHOTS.s3.sec}
        duration={d}
        parts={['Đồ nặng cũng tự bê.', 'Việc muộn cũng tự ôm.']}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- s4
export const MetS4: React.FC = () => {
  const f = useCurrentFrame();
  const d = MET_SHOTS.s4.duration;
  const settle = Math.max(1, d - 30);
  const zoom = interpolate(f, [0, settle], [1, 1.035], {...clamp, easing: soft});
  const enter = ramp(f, 4, 16);
  const breathe = 1 + 0.012 * Math.sin(f / 22);
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden', transform: `scale(${zoom})`}}>
      <LampGlow glow={0.55 * breathe} flick={0.22} />
      {/* cua so dem thanh pho */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 230,
          width: 840,
          height: 440,
          borderRadius: 24,
          overflow: 'hidden',
          background: 'linear-gradient(180deg,#0A0F1C,#131C30)',
          border: '10px solid #232D40',
          opacity: enter,
          boxShadow: '0 20px 70px rgba(0,0,0,.55)',
        }}
      >
        <circle cx={700} cy={90} r={44} fill="#F3EDE2" opacity={0.85} />
        {[0, 1, 2].map((b) => (
          <div
            key={b}
            style={{
              position: 'absolute',
              left: 60 + b * 250,
              bottom: 0,
              width: 200,
              height: 200 + prand(b + 5) * 130,
              background: '#080C14',
            }}
          >
            {Array.from({length: 12}).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 24 + (i % 3) * 58,
                  top: 30 + Math.floor(i / 3) * 52,
                  width: 34,
                  height: 26,
                  borderRadius: 4,
                  background:
                    prand(b * 31 + i * 7) > 0.45 ? 'rgba(255,196,107,.9)' : 'rgba(154,163,178,.25)',
                }}
              />
            ))}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 12,
            background: '#232D40',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: 12,
            background: '#232D40',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg,transparent 60%,rgba(255,196,107,.08))',
          }}
        />
      </div>
      {/* ghe trong doi dien */}
      <div
        style={{position: 'absolute', left: 390, top: 640, width: 300, height: 330, opacity: enter}}
      >
        <div
          style={{
            position: 'absolute',
            left: 40,
            top: 0,
            width: 220,
            height: 200,
            borderRadius: 40,
            background: '#232D40',
            border: '2px solid rgba(243,237,226,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 30,
            width: 180,
            height: 140,
            borderRadius: 30,
            background: '#2E3A4F',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 30,
            top: 200,
            width: 240,
            height: 40,
            borderRadius: 14,
            background: WOOD,
          }}
        />
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 50 + i * 180,
              top: 240,
              width: 26,
              height: 90,
              borderRadius: 10,
              background: '#3A2A1C',
            }}
          />
        ))}
      </div>
      {/* mam com day */}
      <div
        style={{
          position: 'absolute',
          left: 110,
          top: 950,
          width: 860,
          height: 480,
          opacity: enter,
          transform: `scale(${breathe})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 240,
            background: '#5A4128',
            border: '3px solid rgba(243,237,226,.16)',
            boxShadow: '0 30px 90px rgba(0,0,0,.6), 0 0 70px rgba(255,196,107,.10)',
          }}
        />
        <div style={{position: 'absolute', inset: 26, borderRadius: 220, background: '#3E2C1B'}} />
        {/* bat com day + dua gac */}
        <div style={{position: 'absolute', left: 120, top: 130, width: 280, height: 240}}>
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 90,
              width: 240,
              height: 140,
              borderRadius: '30px 30px 120px 120px',
              background: '#EFE8DA',
              boxShadow: '0 14px 40px rgba(0,0,0,.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 35,
              top: 96,
              width: 210,
              height: 60,
              borderRadius: 40,
              background: '#2A3547',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 38,
              top: 62,
              width: 204,
              height: 84,
              borderRadius: '50%',
              background: '#FBF6EA',
              border: '4px solid #D8CFB8',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 58,
              top: 60,
              width: 164,
              height: 60,
              borderRadius: '50%',
              background: '#FFFDF6',
            }}
          />
          {Array.from({length: 9}).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 76 + prand(i + 21) * 128,
                top: 66 + prand(i + 61) * 40,
                width: 17,
                height: 10,
                borderRadius: 8,
                background: '#E0D3B8',
                transform: `rotate(${prand(i) * 60}deg)`,
              }}
            />
          ))}
          {/* hoi nong */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 80 + i * 55,
                top: -40 + ((f * 2 + i * 55) % 80) * -0.7,
                width: 20,
                height: 64,
                borderRadius: 12,
                background: 'rgba(243,237,226,.32)',
                filter: 'blur(3px)',
                opacity: 0.55 - (((f * 2 + i * 55) % 80) / 80) * 0.4,
                transform: `translateX(${Math.sin(f / 15 + i * 2.2) * 12}px)`,
              }}
            />
          ))}
          {/* doi dua gac ngang mieng bat */}
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 66,
              width: 230,
              height: 16,
              borderRadius: 8,
              background: '#C9A86A',
              transform: 'rotate(14deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 66,
              top: 82,
              width: 230,
              height: 16,
              borderRadius: 8,
              background: '#B28E52',
              transform: 'rotate(14deg)',
            }}
          />
        </div>
        {/* dia ca chien + bat canh */}
        <div style={{position: 'absolute', left: 440, top: 120, width: 300, height: 150}}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 300,
              height: 150,
              borderRadius: '50%',
              background: '#EFE8DA',
              border: '4px solid #D8CFB8',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 41,
              width: 160,
              height: 68,
              borderRadius: '50%',
              background: '#C98A3E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 70,
              width: 160,
              height: 36,
              borderRadius: '50%',
              background: '#E8B04B',
              opacity: 0.7,
            }}
          />
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 108 + i * 34,
                top: 52,
                width: 10,
                height: 46,
                borderRadius: 5,
                background: '#8A5A22',
                opacity: 0.8,
                transform: `rotate(${i ? -12 : 12}deg)`,
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              left: 208,
              top: 58,
              width: 44,
              height: 34,
              background: '#C98A3E',
              clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
            }}
          />
          <circle cx={92} cy={70} r={9} fill="#2A1A10" />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 120 + i * 30,
                top: 96,
                width: 22,
                height: 12,
                borderRadius: 6,
                background: '#4E7E3E',
              }}
            />
          ))}
        </div>
        <div style={{position: 'absolute', left: 470, top: 290, width: 240, height: 130}}>
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 30,
              width: 200,
              height: 90,
              borderRadius: '16px 16px 60px 60px',
              background: '#3E6E8E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 34,
              top: 12,
              width: 172,
              height: 52,
              borderRadius: '50%',
              background: '#9CC3D8',
            }}
          />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 70 + i * 44,
                top: 24,
                width: 30,
                height: 14,
                borderRadius: 7,
                background: '#4E7E3E',
              }}
            />
          ))}
        </div>
        {/* ban tay gap do an tu duoi khung */}
        <div
          style={{
            position: 'absolute',
            left: -30,
            bottom: -30,
            width: 260,
            height: 120,
            borderRadius: 60,
            background: SHIRT_ADULT,
            transform: 'rotate(-12deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 150,
            bottom: 30,
            width: 110,
            height: 90,
            borderRadius: 45,
            background: SKIN_ADULT,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 220,
            bottom: 60,
            width: 190,
            height: 14,
            borderRadius: 7,
            background: '#C9A86A',
            transform: 'rotate(-16deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 226,
            bottom: 76,
            width: 190,
            height: 14,
            borderRadius: 7,
            background: '#B28E52',
            transform: 'rotate(-16deg)',
          }}
        />
      </div>
      {/* den tuong tho hoi (co thanh treo) */}
      <div
        style={{
          position: 'absolute',
          left: 962,
          top: 738,
          width: 120,
          height: 18,
          borderRadius: 9,
          background: '#232D40',
          opacity: enter,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 880,
          top: 700,
          width: 90,
          height: 90,
          borderRadius: 45,
          background: LAMP,
          opacity: 0.5 + 0.1 * Math.sin(f / 22),
          boxShadow: '0 0 70px 24px rgba(255,196,107,.35)',
        }}
      />
      <MinhHoa />
      <MetCaps
        sec={MET_SHOTS.s4.sec}
        duration={d}
        parts={['Buồn cũng để sang một bên,', 'vì sáng mai vẫn phải đi làm.']}
      />
    </AbsoluteFill>
  );
};
