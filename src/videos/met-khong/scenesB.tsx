import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {clamp} from '../../stick';
import {
  BG,
  WALL,
  GRAY,
  CREAM,
  LAMP,
  INK,
  FONT,
  SERIF,
  ramp,
  MetCaps,
  MinhHoa,
  LampGlow,
} from './kit';
import {MET_SHOTS} from './timeline';

// metkhong scenes B (s5-s7). Khung 1080x1920. Caption nam duoi (MetCaps, bottom 260),
// moi chu trong hinh >= 56px, khong chu nao o 210px day ngoai caption.
// Frame-driven, deterministic (chi sin/interpolate theo f).

// ---------- vector icons (khong emoji) ----------
const WrenchIcon: React.FC = () => (
  <svg
    width="118"
    height="118"
    viewBox="0 0 24 24"
    fill="none"
    stroke={LAMP}
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a4.6 4.6 0 0 0-6.1 6.1L3 18l3 3 5.6-5.6a4.6 4.6 0 0 0 6.1-6.1L14.5 12l-2.5-2.5 2.7-3.2z" />
    <circle cx="17.5" cy="6.5" r="1.4" fill={LAMP} stroke="none" />
  </svg>
);

const BroomIcon: React.FC = () => (
  <svg
    width="118"
    height="118"
    viewBox="0 0 24 24"
    fill="none"
    stroke={CREAM}
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7.5" y1="2.5" x2="14.5" y2="13.5" stroke={LAMP} strokeWidth={2} />
    <path d="M12.5 13.5 19.5 11.5l1.5 7-7 1.5z" fill="rgba(255,196,107,.14)" stroke={LAMP} />
    <line x1="14.2" y1="15.8" x2="15.2" y2="19.4" />
    <line x1="16.4" y1="15.2" x2="17.4" y2="18.8" />
    <line x1="18.6" y1="14.6" x2="19.6" y2="18.2" />
  </svg>
);

const ChatIcon: React.FC = () => (
  <svg
    width="118"
    height="118"
    viewBox="0 0 24 24"
    fill="none"
    stroke={LAMP}
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="12" rx="3.5" />
    <path d="M8.5 16.5 6.5 21l6-4.5" />
    <circle cx="8.6" cy="10" r="1.4" fill={CREAM} stroke="none" />
    <circle cx="12.4" cy="10" r="1.4" fill={CREAM} stroke="none" />
    <circle cx="16.2" cy="10" r="1.4" fill={CREAM} stroke="none" />
  </svg>
);

// s5: ba the viec quanh bong nguoi cui dau o giua, vao lan luot.
export const MetS5: React.FC = () => {
  const f = useCurrentFrame();
  const d = MET_SHOTS.s5.duration;
  const bow = 14 + 4 * Math.sin(f / 26);
  const breathe = 1 + 0.008 * Math.sin(f / 20);
  const cards = [
    {label: 'Sửa đồ', Icon: WrenchIcon, at: 8},
    {label: 'Dọn nhà', Icon: BroomIcon, at: 34},
    {label: 'Trả lời tin', Icon: ChatIcon, at: 60, wide: true},
  ];
  const dust = [
    {x: 300, y: 430},
    {x: 770, y: 450},
    {x: 215, y: 720},
    {x: 865, y: 780},
    {x: 420, y: 520},
    {x: 660, y: 545},
  ];
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <LampGlow glow={0.55} flick={0.3} />
      {/* bong den treo tren dinh dau */}
      <div
        style={{
          position: 'absolute',
          left: 537,
          top: 200,
          width: 6,
          height: 105,
          background: '#3A4356',
          opacity: ramp(f, 2),
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 522,
          top: 292,
          width: 36,
          height: 22,
          borderRadius: 6,
          background: '#3A4356',
          opacity: ramp(f, 2),
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 498,
          top: 308,
          width: 84,
          height: 84,
          borderRadius: 42,
          background: LAMP,
          boxShadow: `0 0 90px 30px rgba(255,196,107,${0.45 + 0.08 * Math.sin(f / 18)})`,
          opacity: ramp(f, 4),
        }}
      />
      {/* bui bay trong quuang sang */}
      {dust.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y + 12 * Math.sin(f / 34 + i),
            width: 10,
            height: 10,
            borderRadius: 5,
            background: GRAY,
            opacity: 0.2 + 0.15 * Math.sin(f / 28 + i * 1.9),
          }}
        />
      ))}
      {/* bong nguoi cui dau o giua */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 590,
          height: 560,
          display: 'flex',
          justifyContent: 'center',
          opacity: ramp(f, 4),
          transform: `scale(${breathe})`,
          transformOrigin: '50% 20%',
        }}
      >
        <div style={{position: 'relative', width: 340, height: 560}}>
          <div
            style={{
              position: 'absolute',
              left: -50,
              top: -40,
              width: 440,
              height: 440,
              borderRadius: 220,
              background: 'radial-gradient(circle, rgba(255,196,107,.12), transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 80,
              top: 20 + bow,
              width: 180,
              height: 180,
              borderRadius: 90,
              background: 'linear-gradient(135deg, #2B3547 0%, #0C1017 70%)',
              boxShadow:
                '18px 10px 40px rgba(255,196,107,.18), inset -14px -10px 30px rgba(0,0,0,.6)',
              transform: 'rotate(6deg)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 84,
                borderRadius: '90px 90px 0 0',
                background: '#05070B',
                opacity: 0.9,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 145,
              top: 190 + bow * 0.4,
              width: 50,
              height: 52,
              background: '#161D29',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 228,
              width: 340,
              height: 172,
              borderRadius: '170px 170px 36px 36px',
              background: 'linear-gradient(180deg,#2A3547,#1B2331)',
              border: '1px solid rgba(243,237,226,.14)',
              boxShadow:
                'inset -18px 0 34px rgba(255,196,107,.10), inset 0 -18px 30px rgba(0,0,0,.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 2,
              top: 300,
              width: 72,
              height: 210,
              borderRadius: 36,
              background: '#1B2331',
              transform: 'rotate(8deg)',
              border: '1px solid rgba(243,237,226,.10)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 2,
              top: 300,
              width: 72,
              height: 210,
              borderRadius: 36,
              background: '#1F2837',
              transform: 'rotate(-8deg)',
              border: '1px solid rgba(255,196,107,.22)',
              boxShadow: '6px 0 22px rgba(255,196,107,.12)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 14,
              top: 486,
              width: 62,
              height: 62,
              borderRadius: 31,
              background: '#C99A68',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 14,
              top: 486,
              width: 62,
              height: 62,
              borderRadius: 31,
              background: '#D9A878',
              boxShadow: '0 0 18px rgba(255,196,107,.25)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 36,
              top: 384,
              width: 268,
              height: 120,
              borderRadius: 24,
              background: '#141B27',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 528,
              width: 300,
              height: 30,
              borderRadius: 15,
              background: 'radial-gradient(ellipse, rgba(0,0,0,.55), transparent 70%)',
            }}
          />
        </div>
      </div>
      {/* the trai / phai */}
      {cards.slice(0, 2).map((c, i) => (
        <div
          key={c.label}
          style={{
            position: 'absolute',
            top: 620,
            left: i === 0 ? 46 : undefined,
            right: i === 1 ? 46 : undefined,
            width: 270,
            background: `linear-gradient(180deg,#242F42,${WALL})`,
            borderRadius: 28,
            border: '1px solid rgba(243,237,226,.14)',
            padding: '26px 12px 30px',
            textAlign: 'center',
            opacity: ramp(f, c.at, 16),
            transform: `translateY(${interpolate(f, [c.at, c.at + 16], [44, 0], clamp)}px)`,
          }}
        >
          <div
            style={{
              height: 10,
              borderRadius: 5,
              background: LAMP,
              margin: '0 60px 22px',
              opacity: 0.9,
            }}
          />
          <div
            style={{
              width: 168,
              height: 168,
              borderRadius: 84,
              margin: '0 auto',
              border: `2px solid rgba(255,196,107,.4)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(12,16,23,.5)',
            }}
          >
            <c.Icon />
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 600,
              fontSize: 58,
              color: CREAM,
              marginTop: 20,
              lineHeight: 1.3,
            }}
          >
            {c.label}
          </div>
          <div style={{display: 'flex', gap: 12, justifyContent: 'center', marginTop: 18}}>
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: k === 0 ? LAMP : GRAY,
                  opacity: k === 0 ? 1 : 0.45,
                }}
              />
            ))}
          </div>
        </div>
      ))}
      {/* the chat rong phia duoi */}
      <div
        style={{
          position: 'absolute',
          left: 170,
          right: 170,
          top: 1180,
          height: 190,
          background: `linear-gradient(180deg,#242F42,${WALL})`,
          borderRadius: 32,
          border: `2px solid rgba(255,196,107,.45)`,
          boxShadow: '0 0 44px rgba(255,196,107,.14)',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          padding: '0 40px',
          opacity: ramp(f, cards[2].at, 16),
          transform: `translateY(${interpolate(f, [cards[2].at, cards[2].at + 16], [44, 0], clamp)}px)`,
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 66,
            border: `2px solid rgba(255,196,107,.4)`,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(12,16,23,.5)',
          }}
        >
          <ChatIcon />
        </div>
        <div
          style={{fontFamily: FONT, fontWeight: 600, fontSize: 60, color: CREAM, lineHeight: 1.3}}
        >
          Trả lời tin
        </div>
      </div>
      <MinhHoa />
      <MetCaps
        sec={MET_SHOTS.s5.sec}
        duration={d}
        parts={[
          'Mình quen miệng nói: Để tôi lo được.',
          'Rồi người ta cũng tin là mình lo được hết.',
        ]}
        accents={['Để tôi lo được.']}
      />
    </AbsoluteFill>
  );
};

// s6: CU DAP duy nhat — nhin thang, mat truu tuong + chu Serif >=100px, push-in cham, den sang dan.
export const MetS6: React.FC = () => {
  const f = useCurrentFrame();
  const d = MET_SHOTS.s6.duration;
  const push = interpolate(f, [0, d], [1, 1.09], clamp);
  const glow = interpolate(f, [0, d], [0.45, 1], clamp);
  const open = ramp(f, 6, 30);
  const blink = interpolate(f, [150, 156, 162], [1, 0.12, 1], clamp);
  const lidY = (0.15 + 0.85 * open) * blink;
  const gx = 16 * Math.sin(f / 36);
  const gy = 10 * Math.sin(f / 48);
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <LampGlow glow={0.45 + 0.55 * glow} flick={0.2} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${push})`,
          transformOrigin: '50% 42%',
        }}
      >
        {/* quang sang mat (~960px, >30% khung) */}
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: 220,
            width: 960,
            height: 960,
            borderRadius: 480,
            background: `radial-gradient(circle, rgba(255,196,107,${0.3 * glow + 0.06}), rgba(255,196,107,${0.1 * glow}) 45%, transparent 70%)`,
          }}
        />
        {/* mat truu tuong */}
        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 510,
            width: 800,
            height: 380,
            transform: `scaleY(${lidY})`,
            transformOrigin: '50% 50%',
            opacity: ramp(f, 4),
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'linear-gradient(180deg,#2C3749,#171E2A)',
              border: '3px solid rgba(243,237,226,.4)',
              boxShadow: `0 0 90px rgba(255,196,107,${0.25 * glow}), inset 0 -30px 60px rgba(0,0,0,.55)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 270 + gx,
              top: 60 + gy,
              width: 260,
              height: 260,
              borderRadius: 130,
              background:
                'radial-gradient(circle at 40% 35%, #FFD9A0 0%, #FFC46B 35%, #7A4D16 75%, #3A2708 100%)',
              border: '6px solid #0C1017',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 64,
                top: 64,
                width: 120,
                height: 120,
                borderRadius: 60,
                background: '#05070B',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 78,
                top: 78,
                width: 32,
                height: 32,
                borderRadius: 16,
                background: '#FFF6E6',
                opacity: 0.95,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 150,
                top: 160,
                width: 14,
                height: 14,
                borderRadius: 7,
                background: '#FFF6E6',
                opacity: 0.7,
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 40,
              right: 40,
              top: -24,
              height: 150,
              borderRadius: '50%',
              borderTop: `12px solid ${INK}`,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 40,
              right: 40,
              top: 6,
              height: 120,
              borderRadius: '50%',
              borderTop: '10px solid rgba(243,237,226,.85)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 130,
              right: 130,
              bottom: 2,
              height: 90,
              borderRadius: '50%',
              borderBottom: '8px solid rgba(243,237,226,.5)',
            }}
          />
        </div>
        {/* gach noi mat voi cau hoi */}
        <div
          style={{
            position: 'absolute',
            left: 480,
            top: 1040,
            width: 120,
            height: 6,
            borderRadius: 3,
            background: LAMP,
            opacity: ramp(f, 30, 16),
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 1080,
            textAlign: 'center',
            opacity: ramp(f, 20, 18),
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 100,
              color: CREAM,
              lineHeight: 1.2,
              textShadow: '0 4px 30px rgba(0,0,0,.8)',
            }}
          >
            Dạo này,
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 120,
              color: LAMP,
              lineHeight: 1.15,
              textShadow: '0 0 44px rgba(255,196,107,.35), 0 4px 30px rgba(0,0,0,.8)',
            }}
          >
            mệt không?
          </div>
        </div>
      </div>
      <MinhHoa />
      <MetCaps
        sec={MET_SHOTS.s6.sec}
        duration={d}
        parts={['Nhưng có hôm, mình chỉ mong ai đó', 'hỏi một câu thôi: Dạo này, mệt không?']}
        accents={['', 'mệt không?']}
      />
    </AbsoluteFill>
  );
};

// s7: tach tra boc khoi + hai ban tay, den am tran day, chu Serif + CTA comment (khong hashtag).
export const MetS7: React.FC = () => {
  const f = useCurrentFrame();
  const d = MET_SHOTS.s7.duration;
  const warm = ramp(f, 8, 50);
  const skin = 'linear-gradient(135deg,#EFC08C,#C98F56)';
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <LampGlow glow={0.55 + 0.45 * warm} flick={0.15} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 700px 500px at 50% 40%, rgba(255,196,107,${0.28 * warm + 0.06}), transparent 72%)`,
        }}
      />
      {/* day den trang tri */}
      <div
        style={{
          position: 'absolute',
          left: 200,
          right: 200,
          top: 268,
          height: 4,
          background: '#3A4356',
          opacity: ramp(f, 6),
        }}
      />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 250 + i * 145;
        const y = 292 + Math.abs(i - 2) * 22;
        return (
          <div
            key={i}
            style={{position: 'absolute', left: x, top: y, opacity: ramp(f, 10 + i * 6)}}
          >
            <div style={{width: 4, height: 18, background: '#3A4356', margin: '0 auto'}} />
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                background: LAMP,
                boxShadow: '0 0 26px 8px rgba(255,196,107,.5)',
                opacity: 0.55 + 0.3 * Math.sin(f / 22 + i * 1.4),
              }}
            />
          </div>
        );
      })}
      {/* mat ban */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          right: 80,
          top: 990,
          height: 22,
          borderRadius: 11,
          background: 'linear-gradient(90deg,#3A2E1E,#8A6132,#3A2E1E)',
          opacity: ramp(f, 8),
          boxShadow: '0 10px 40px rgba(0,0,0,.6)',
        }}
      />
      {/* tay trai: nang tach tra */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 900,
          width: 500,
          height: 200,
          opacity: ramp(f, 16, 18),
          transform: `translateX(${-interpolate(f, [16, 34], [120, 0], clamp)}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 40,
            width: 190,
            height: 100,
            borderRadius: 30,
            background: '#232D3F',
            transform: 'rotate(-6deg)',
            border: '1px solid rgba(243,237,226,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 316,
            top: 38,
            width: 26,
            height: 104,
            borderRadius: 10,
            background: '#4A5568',
            transform: 'rotate(-6deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 330,
            top: 30,
            width: 150,
            height: 110,
            borderRadius: 60,
            background: skin,
            transform: 'rotate(-10deg)',
            boxShadow: '0 8px 26px rgba(0,0,0,.5)',
          }}
        />
        {[0, 1, 2].map((k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: 352 + k * 37,
              top: -20 + (k === 1 ? -8 : 0),
              width: 32,
              height: 72,
              borderRadius: 16,
              background: skin,
              transform: `rotate(${-8 + k * 8}deg)`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            left: 458,
            top: 34,
            width: 34,
            height: 82,
            borderRadius: 17,
            background: skin,
            transform: 'rotate(35deg)',
          }}
        />
      </div>
      {/* tach tra */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, opacity: ramp(f, 8)}}>
        {[0, 1, 2].map((i) => {
          const p = ((f + i * 30) % 90) / 90;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 490 + i * 50,
                top: 570 - p * 140 + 12 * Math.sin(p * 6 + i * 2),
                width: 30,
                height: 200,
                borderRadius: 15,
                filter: 'blur(8px)',
                background: 'linear-gradient(180deg, transparent, rgba(243,237,226,.35))',
                opacity: Math.sin(p * Math.PI) * 0.55,
              }}
            />
          );
        })}
        <div
          style={{
            position: 'absolute',
            left: 370,
            top: 948,
            width: 340,
            height: 54,
            borderRadius: '50%',
            background: 'linear-gradient(180deg,#4A5568,#2A3342)',
            border: '1px solid rgba(243,237,226,.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 620,
            top: 830,
            width: 96,
            height: 120,
            borderRadius: '50%',
            border: '18px solid #E9DFCE',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 430,
            top: 790,
            width: 220,
            height: 165,
            clipPath: 'polygon(0 0,100% 0,88% 100%,12% 100%)',
            background: 'linear-gradient(180deg,#F3EDE2,#D8CDB8)',
            boxShadow: '0 14px 40px rgba(0,0,0,.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 446,
            top: 780,
            width: 188,
            height: 42,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 40% 35%, #A06A33 0%, #4A2E12 75%)',
            border: '3px solid #E9DFCE',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 470,
            top: 786,
            width: 60,
            height: 16,
            borderRadius: 8,
            background: 'rgba(255,196,107,.7)',
            transform: 'rotate(-12deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 462,
            top: 820,
            width: 22,
            height: 110,
            borderRadius: 11,
            background: 'rgba(255,255,255,.35)',
            transform: 'rotate(6deg)',
          }}
        />
      </div>
      {/* tay phai: chia ra */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 920,
          width: 480,
          height: 200,
          opacity: ramp(f, 34, 18),
          transform: `translateX(${interpolate(f, [34, 52], [120, 0], clamp)}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 110,
            top: 40,
            width: 190,
            height: 100,
            borderRadius: 30,
            background: '#232D3F',
            transform: 'rotate(6deg)',
            border: `1px solid rgba(255,196,107,.25)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 276,
            top: 38,
            width: 26,
            height: 104,
            borderRadius: 10,
            background: '#4A5568',
            transform: 'rotate(6deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 190,
            top: 30,
            width: 170,
            height: 100,
            borderRadius: 50,
            background: skin,
            transform: 'rotate(8deg)',
            boxShadow: '0 8px 26px rgba(0,0,0,.5), 0 0 30px rgba(255,196,107,.2)',
          }}
        />
        {[0, 1, 2, 3].map((k) => (
          <div
            key={k}
            style={{
              position: 'absolute',
              right: 200 + k * 36,
              top: 100 + (k === 0 || k === 3 ? -6 : 0),
              width: 30,
              height: 66,
              borderRadius: 15,
              background: skin,
              transform: `rotate(${6 - k * 5}deg)`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            right: 330,
            top: 22,
            width: 32,
            height: 76,
            borderRadius: 16,
            background: skin,
            transform: 'rotate(-32deg)',
          }}
        />
      </div>
      {/* cau chot Serif + CTA comment */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 1170,
          textAlign: 'center',
          opacity: ramp(f, 110, 20),
        }}
      >
        <span
          style={{
            fontFamily: SERIF,
            fontSize: 88,
            color: CREAM,
            textShadow: '0 4px 30px rgba(0,0,0,.8)',
          }}
        >
          Bạn có{' '}
        </span>
        <span
          style={{
            fontFamily: SERIF,
            fontSize: 88,
            color: LAMP,
            textShadow: '0 0 40px rgba(255,196,107,.4), 0 4px 30px rgba(0,0,0,.8)',
          }}
        >
          mệt không?
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 70,
          right: 70,
          top: 1296,
          display: 'flex',
          justifyContent: 'center',
          opacity: ramp(f, 150, 24),
        }}
      >
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 56,
            color: CREAM,
            padding: '18px 34px',
            borderRadius: 999,
            background: 'rgba(255,196,107,.12)',
            border: '2px solid rgba(255,196,107,.55)',
            boxShadow: '0 0 34px rgba(255,196,107,.2)',
            lineHeight: 1.4,
            textAlign: 'center',
          }}
        >
          Bình luận cho mình biết nhé
        </div>
      </div>
      <MinhHoa />
      <MetCaps
        sec={MET_SHOTS.s7.sec}
        duration={d}
        parts={[
          'Nếu bạn cũng đang đợi câu đó, thì hôm nay mình hỏi bạn nhé:',
          'Bạn có mệt không? Mệt thì nghỉ một chút đi.',
          'Lớn rồi, đâu phải lúc nào cũng gánh một mình.',
        ]}
        accents={['hỏi bạn nhé:', 'nghỉ một chút', 'gánh một mình.']}
      />
    </AbsoluteFill>
  );
};
