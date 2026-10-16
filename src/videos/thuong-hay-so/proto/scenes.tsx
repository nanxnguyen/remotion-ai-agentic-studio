// Prototype scenes for thuong-hay-so-bat-dau-lai (design-agent Phase 3).
// Hook grammar adapted from spotlight-hero-card demo (pool sweep -> lock + pulse ->
// slow push-in -> hold); render is original SVG kitchen per story profile.
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, mix, ramp} from './motion';
import {
  BLUE,
  BLUE_DEEP,
  Bowl,
  CAP,
  Cooker,
  DUSK1,
  DUSK2,
  DuskWindow,
  Finish,
  GREEN,
  GREEN_LT,
  HAIR,
  HEAD,
  HandChop,
  Headline,
  INK,
  INOX,
  LABEL,
  Led,
  MinhHoa,
  PAPER,
  PILL,
  RED,
  SHIRT,
  SKIN,
  SOUP,
  STICK1,
  STICK2,
  TILE,
  ThoFonts,
  ThoLine,
  TileWall,
  clamp,
} from './kit';
import {bezier} from './motion';

export const HOOK_DUR = 129;
export const TURN_DUR = 234;
export const END_DUR = 198;

// ------------------------------------------------------------------ s1 HOOK
export const ProtoHook: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = mix(1, 1.05, ramp(f, 0, HOOK_DUR, E_SINE)); // t1: visible breath, sine, no overshoot
  // spotlight grammar: pool travels cooker -> bowl, locks at f34 +8% pulse
  const poolX = mix(220, 540, ramp(f, 4, 30, E_SINE));
  const pulse =
    1 + 0.1 * (1 - Math.abs(f - 34) / 6 > 0 ? Math.max(0, 1 - Math.abs(f - 34) / 6) : 0);
  const warm = 0.22 + 0.33 * ramp(f, 30, 40, E_SINE); // grade am dang khi "thuong"
  const cold = ramp(f, 80, 6, E_SINE) * (1 - ramp(f, 89, 8, E_SINE)) * 0.4; // tup chop 1 lan khi "so"
  return (
    <AbsoluteFill style={{background: TILE, overflow: 'hidden'}}>
      <ThoFonts />
      <div style={{position: 'absolute', inset: -60, transform: `scale(${zoom})`}}>
        <TileWall />
        <DuskWindow x={90} y={120} w={900} h={380} />
        {/* chair + jacket silhouette (bg, blurred) */}
        <div
          style={{
            position: 'absolute',
            left: 830,
            top: 590,
            width: 250,
            height: 380,
            filter: 'blur(2px)',
            opacity: 0.95,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 30,
              top: 60,
              width: 26,
              height: 320,
              borderRadius: 12,
              background: '#5A4A38',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 194,
              top: 60,
              width: 26,
              height: 320,
              borderRadius: 12,
              background: '#5A4A38',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 20,
              top: 30,
              width: 210,
              height: 44,
              borderRadius: 20,
              background: '#6B5744',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 45,
              top: 60,
              width: 160,
              height: 210,
              borderRadius: 46,
              background: 'linear-gradient(180deg,#7A6A9C,#4E4266)',
              transform: 'rotate(-4deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 95,
              top: 70,
              width: 60,
              height: 90,
              background: '#3A3149',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 88,
              top: 62,
              width: 74,
              height: 20,
              borderRadius: 10,
              background: '#57496E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 108,
              top: 170,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#332C44',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 70,
              top: 90,
              width: 16,
              height: 150,
              borderRadius: 8,
              background: 'rgba(30,25,45,.45)',
              transform: 'rotate(6deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 160,
              top: 90,
              width: 16,
              height: 150,
              borderRadius: 8,
              background: 'rgba(30,25,45,.45)',
              transform: 'rotate(-6deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 180,
              top: 150,
              width: 56,
              height: 170,
              borderRadius: 26,
              background: 'linear-gradient(180deg,#655A80,#453D59)',
            }}
          />
        </div>
        {/* table (horizon raised: less empty gray) */}
        <div
          style={{
            position: 'absolute',
            left: -60,
            right: -60,
            top: 1040,
            bottom: -60,
            background: `linear-gradient(180deg, #C6CDD1, ${INOX} 12%, #9AA4A9 100%)`,
            boxShadow: '0 -18px 60px rgba(20,15,35,.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -60,
            right: -60,
            top: 1040,
            height: 10,
            background: 'rgba(255,255,255,.6)',
          }}
        />
        {/* spare chopsticks resting left of own bowl */}
        <div
          style={{
            position: 'absolute',
            left: -30,
            top: 1700,
            width: 300,
            height: 13,
            borderRadius: 7,
            background: STICK2,
            transform: 'rotate(-7deg)',
            boxShadow: '0 6px 14px rgba(20,15,35,.35)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: -30,
            top: 1718,
            width: 300,
            height: 13,
            borderRadius: 7,
            background: STICK1,
            transform: 'rotate(-7deg)',
            boxShadow: '0 6px 14px rgba(20,15,35,.35)',
          }}
        />
        {/* small dish of picked scallions, right foreground */}
        <div
          style={{
            position: 'absolute',
            left: 690,
            top: 1640,
            width: 190,
            height: 110,
            borderRadius: '50%',
            background: '#DDE3E1',
            boxShadow: '0 14px 36px rgba(20,15,35,.35)',
          }}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 712 + i * 34,
              top: 1668 + (i % 2) * 14,
              width: 46,
              height: 12,
              borderRadius: 6,
              background: i % 2 ? GREEN : GREEN_LT,
              transform: `rotate(${-14 + i * 11}deg)`,
              boxShadow: '0 2px 5px rgba(40,70,40,.4)',
            }}
          />
        ))}
        <Cooker x={20} y={1300} s={0.9} steam={1} />
        {/* hero: opposite bowl (KitBowl depth + steam) */}
        <Bowl x={370} y={1140} s={1.35} scallions={4} steam={0.7} />
        {/* own bowl foreground + second chopsticks across */}
        <Bowl x={150} y={1560} s={1.0} scallions={5} sticksAcross steam={0.5} />
        {/* locked KitHand with fingers gripping sticks */}
        <HandChop x={600} y={740} s={1.2} angle={22} strand />
        {/* warm pool locked on hero bowl */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(520px 480px at ${poolX}px 1230px, rgba(255,122,72,${warm * pulse}), rgba(255,122,72,0) 70%)`,
          }}
        />
        {/* cold tube flicker once */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `linear-gradient(180deg, rgba(157,180,255,${cold}), rgba(157,180,255,${cold * 0.4}) 60%, rgba(157,180,255,0) 100%)`,
          }}
        />
      </div>
      {/* scrim behind headline (T1 contrast) */}
      <div
        style={{
          position: 'absolute',
          left: 40,
          right: 40,
          top: 130,
          height: 360,
          borderRadius: 30,
          background: 'rgba(24,16,44,.38)',
        }}
      />
      <Headline
        top={150}
        size={80}
        lines={[
          [{t: 'Bạn giữ mối quan hệ ấy'}],
          [{t: 'vì '}, {t: 'thương,', c: RED}],
          [{t: 'hay vì '}, {t: 'sợ', c: BLUE_DEEP}, {t: ' phải bắt đầu lại?'}],
        ]}
      />
      <Finish />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ s7 TURN (split + converge)
// C3: same locked KitHand + KitBowl in both halves; bowl carries scallions (D-mandated,
// flagged for content-review E vs script s7a "khong hanh"); converge frame is fully neutral;
// tags rest at 50%; caption lifted 70px and shortened to one line to clear the lower bowl.
export const ProtoTurn: React.FC = () => {
  const f = useCurrentFrame();
  const conv = ramp(f, 90, 60, E_SINE); // 0 split -> 1 merged neutral (full at f150)
  const washA = 0.34 * (1 - conv) + 0.04;
  const washB = 0.38 * (1 - conv) + 0.04;
  const veil = conv * 0.2; // faint unifying haze only — bases crossfade below carry the converge
  const divOp = 1 - ramp(f, 110, 30, E_SINE); // rod fully gone by f140
  const tagOp = 0.35 + 0.65 * (1 - ramp(f, 110, 60, E_SINE)); // rests at 35% (t4)
  const half = (top: boolean) => (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: top ? 0 : 960,
        height: 960,
        overflow: 'hidden',
        background: top
          ? `linear-gradient(180deg, #6B4A5E, #8C5A6E 60%, #7A4E62)`
          : `linear-gradient(180deg, #3A4666, #2E3A55 60%, #333E5E)`,
      }}
    >
      {/* converge: shared neutral base crossfades in as conv->1 (bases truly merge) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: conv,
          background: 'linear-gradient(180deg, #5E556E, #57506B 60%, #4E485E)',
        }}
      />
      {/* table band grounds the bowl */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 560,
          bottom: 0,
          background: top
            ? 'linear-gradient(180deg,#8C6A72,#6E4E58)'
            : 'linear-gradient(180deg,#46536E,#333E5A)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 560,
          height: 8,
          background: 'rgba(255,255,255,.35)',
        }}
      />
      {/* converge: table bands also merge to one neutral tone */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 560,
          bottom: 0,
          opacity: conv * 0.9,
          background: 'linear-gradient(180deg,#5A5468,#4C4658)',
        }}
      />
      {/* locked KitHand (right-facing) + KitBowl, identical in both halves */}
      <HandChop x={80} y={285} s={0.95} dir="right" strand={false} frozen />
      {/* C3-cont: CLEAN bowl (script s7a) + picked-scallion dish beside it, mirrored halves */}
      <Bowl x={400} y={285} s={1.0} scallions={0} steam={0.6} />
      <div
        style={{
          position: 'absolute',
          left: 780,
          top: 455,
          width: 150,
          height: 92,
          borderRadius: '50%',
          background: '#DDE3E1',
          boxShadow: '0 10px 30px rgba(10,8,20,.4)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 24 + i * 34,
              top: 28 + (i % 2) * 14,
              width: 44,
              height: 11,
              borderRadius: 6,
              background: i % 2 ? GREEN : GREEN_LT,
              transform: `rotate(${-14 + i * 12}deg)`,
            }}
          />
        ))}
      </div>
      <div style={{position: 'absolute', inset: 0, background: `rgba(94,85,110,${veil})`}} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: top ? `rgba(255,90,54,${washA})` : `rgba(157,180,255,${washB})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 90,
          top: top ? 110 : 60,
          opacity: tagOp,
          fontFamily: CAP,
          fontWeight: 700,
          fontSize: 44,
          color: top ? RED : BLUE_DEEP,
          background: PILL,
          padding: '12px 26px',
          borderRadius: 20,
        }}
      >
        {top ? 'vì thương' : 'vì sợ'}
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{background: INK, overflow: 'hidden'}}>
      <ThoFonts />
      {half(true)}
      {half(false)}
      {/* seam-melt band: soft neutral bridge across y=960, melts any residual split line */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 900,
          height: 120,
          opacity: conv,
          background:
            'linear-gradient(180deg, rgba(94,85,110,0), rgba(94,85,110,.9) 50%, rgba(94,85,110,0))',
        }}
      />
      {/* divider rod */}
      <div
        style={{
          position: 'absolute',
          left: 60,
          right: 60,
          top: 956,
          height: 8,
          borderRadius: 4,
          background: 'rgba(247,245,250,.85)',
          opacity: divOp,
          boxShadow: '0 0 24px rgba(247,245,250,.6)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 508,
          top: 928,
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: PAPER,
          opacity: divOp,
          boxShadow: '0 0 30px rgba(247,245,250,.7)',
        }}
      />
      <ThoLine
        text="Cái bát vẫn y hệt nhau."
        accent="y hệt nhau"
        accentColor={PAPER}
        size={56}
        lift={70}
      />
      <Finish />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ s10 END (F2 press-in + still hold)
// paper-title-card grammar: word press scale 1.28->1 + blur 7->0, stagger 4f/9f,
// bezier(0.2,0.75,0.3,1); NO underline, NO fade-out, NO color accent (brief color discipline).
const PRESS_EASE = bezier(0.2, 0.75, 0.3, 1);
const F2: {t: string; b?: boolean; br?: boolean}[] = [
  {t: 'Nếu'},
  {t: 'hôm nay'},
  {t: 'mới gặp', b: true},
  {t: 'người ấy,', br: true},
  {t: 'biết mọi điều'},
  {t: 'đang biết,', br: true},
  {t: 'bạn có'},
  {t: 'chọn', b: true},
  {t: 'bước vào'},
  {t: 'không?'},
];
export const ProtoEnd: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = mix(1, 1.04, ramp(f, 0, 120, E_SINE)); // push-in roi dung im han
  return (
    <AbsoluteFill style={{background: '#14101E', overflow: 'hidden'}}>
      <ThoFonts />
      <div style={{position: 'absolute', inset: -60, transform: `scale(${zoom})`}}>
        <TileWall dim={0.55} />
        {/* inside room */}
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 130,
            right: 200,
            bottom: 130,
            overflow: 'hidden',
            borderRadius: 8,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, #463E5C, #6B6480 45%, #7E7890 75%, #6E6A80)',
            }}
          />
          {/* cold tube streak: horizontal band on tiles at LED height (balances the red LED) */}
          <div
            style={{
              position: 'absolute',
              left: -20,
              top: 1380,
              width: 680,
              height: 140,
              background:
                'linear-gradient(90deg, rgba(157,180,255,.6), rgba(157,180,255,.3) 55%, rgba(157,180,255,0) 100%)',
              filter: 'blur(3px)',
            }}
          />
          {/* partner seated, head bowed over bowl held at chest — eating, not looking up */}
          <div style={{position: 'absolute', left: 360, top: 790, width: 280, height: 530}}>
            <div
              style={{
                position: 'absolute',
                left: 55,
                top: 250,
                width: 170,
                height: 280,
                borderRadius: 55,
                background: `linear-gradient(180deg, ${SHIRT}, #3E4A63)`,
                transform: 'rotate(6deg)',
              }}
            />
            {/* head bowed down toward bowl */}
            <div
              style={{
                position: 'absolute',
                left: 75,
                top: 130,
                width: 120,
                height: 130,
                borderRadius: 55,
                background: SKIN,
                opacity: 0.95,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 58,
                top: 55,
                width: 155,
                height: 115,
                borderRadius: 55,
                background: HAIR,
              }}
            />
            {/* far arm holding bowl at chest */}
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: 330,
                width: 120,
                height: 44,
                borderRadius: 22,
                background: SKIN,
                transform: 'rotate(12deg)',
              }}
            />
            {/* near arm raised, sticks to mouth */}
            <div
              style={{
                position: 'absolute',
                left: 150,
                top: 220,
                width: 130,
                height: 44,
                borderRadius: 22,
                background: SKIN,
                transform: 'rotate(-38deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 150,
                top: 196,
                width: 8,
                height: 110,
                borderRadius: 4,
                background: STICK1,
                transform: 'rotate(18deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 162,
                top: 198,
                width: 8,
                height: 110,
                borderRadius: 4,
                background: STICK2,
                transform: 'rotate(22deg)',
              }}
            />
            {/* bowl held at chest */}
            <div
              style={{
                position: 'absolute',
                left: 105,
                top: 330,
                width: 130,
                height: 88,
                borderRadius: '50%',
                background: `radial-gradient(ellipse, ${SOUP}, #D9C8A8)`,
                border: '11px solid #DDE3E1',
                boxShadow: '0 14px 34px rgba(20,15,35,.4)',
              }}
            />
          </div>
          {/* small dish of picked scallions beside partner */}
          <div
            style={{
              position: 'absolute',
              left: 210,
              top: 1180,
              width: 150,
              height: 90,
              borderRadius: '50%',
              background: '#DDE3E1',
              boxShadow: '0 10px 30px rgba(20,15,35,.3)',
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 25 + i * 34,
                  top: 28 + (i % 2) * 14,
                  width: 44,
                  height: 11,
                  borderRadius: 6,
                  background: i % 2 ? GREEN : GREEN_LT,
                  transform: `rotate(${-14 + i * 12}deg)`,
                }}
              />
            ))}
          </div>
          {/* "cho van cho": own bowl + chopsticks across + steam, near table */}
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 1420,
              width: 800,
              height: 260,
              borderRadius: 30,
              background: 'linear-gradient(180deg, #8E979C, #6E777C)',
              boxShadow: '0 -14px 50px rgba(20,15,35,.35)',
            }}
          />
          <Bowl x={170} y={1360} s={1.0} scallions={5} sticksAcross steam={0.6} />
          <div
            style={{
              position: 'absolute',
              left: 310,
              top: 1240,
              width: 44,
              height: 130,
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse, rgba(247,245,250,.45), rgba(247,245,250,0) 70%)',
              transform: `translateX(${Math.sin(f / 16) * 10}px)`,
            }}
          />
          <Cooker x={500} y={1440} s={0.6} steam={1} />
        </div>
        {/* door frame (frame-in-frame): jambs + lintel + threshold + hinges */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 200,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 130,
            bottom: 60,
            width: 4,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 200,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 200,
            top: 130,
            bottom: 60,
            width: 4,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 130,
            background: '#14101E',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 200,
            right: 200,
            top: 130,
            height: 4,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 60,
            background: '#0E0B16',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 60,
            height: 3,
            background: 'rgba(247,245,250,.14)',
          }}
        />
        {[500, 1100].map((y) => (
          <div
            key={y}
            style={{
              position: 'absolute',
              left: 52,
              top: y,
              width: 26,
              height: 44,
              borderRadius: 8,
              background: '#3A3344',
              boxShadow: 'inset 0 2px 5px rgba(0,0,0,.7)',
            }}
          />
        ))}
        {/* observer (minh): back of head + shoulders at the threshold, cool rim from tube side */}
        <div
          style={{
            position: 'absolute',
            left: 40,
            bottom: 120,
            width: 340,
            height: 900,
            filter: 'blur(3px)',
            opacity: 0.96,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 65,
              top: 0,
              width: 210,
              height: 235,
              borderRadius: '50%',
              background: 'linear-gradient(180deg, #2E2838, #1D1826)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 195,
              width: 100,
              height: 90,
              borderRadius: 24,
              background: '#241F33',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 130,
              top: 205,
              width: 80,
              height: 60,
              borderRadius: 18,
              background: '#171221',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 25,
              top: 260,
              width: 290,
              height: 640,
              borderRadius: 120,
              background: 'linear-gradient(180deg, #3B3550, #241F33)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 288,
              top: 280,
              width: 8,
              height: 580,
              borderRadius: 4,
              background: 'linear-gradient(180deg, rgba(157,180,255,.55), rgba(157,180,255,.05))',
            }}
          />
        </div>
      </div>
      {/* F2 headline: press-in per word, holds through silence */}
      <div style={{position: 'absolute', left: 150, right: 150, top: 175, textAlign: 'center'}}>
        <div
          style={{
            fontFamily: HEAD,
            fontWeight: 600,
            fontSize: 66,
            lineHeight: 1.4,
            color: PAPER,
            textShadow: '0 3px 24px rgba(10,6,25,.9)',
          }}
        >
          {F2.map((w, i) => {
            const t = ramp(f, 8 + i * 4, 9, PRESS_EASE);
            return (
              <React.Fragment key={i}>
                <span
                  style={{
                    display: 'inline-block',
                    opacity: t,
                    transform: `scale(${1.28 - 0.28 * t})`,
                    filter: `blur(${(1 - t) * 7}px)`,
                    fontWeight: w.b ? 700 : 600,
                    marginRight: '0.26em',
                  }}
                >
                  {w.t}
                </span>
                {w.br && <br />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      <Finish />
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------------ storyboard tiles (low-fi)
const BOARD_BG = '#1E1B2E';
const TileFrame: React.FC<{id: string; card: string; children: React.ReactNode; note?: string}> = ({
  id,
  card,
  children,
  note,
}) => (
  <AbsoluteFill style={{background: BOARD_BG, overflow: 'hidden'}}>
    {children}
    <div
      style={{
        position: 'absolute',
        left: 40,
        top: 28,
        fontFamily: CAP,
        fontWeight: 700,
        fontSize: 64,
        color: PAPER,
        textShadow: '0 2px 10px rgba(0,0,0,.9)',
        zIndex: 5,
      }}
    >
      {id}
    </div>
    <div
      style={{
        position: 'absolute',
        left: 42,
        top: 102,
        fontFamily: CAP,
        fontWeight: 500,
        fontSize: 40,
        color: LABEL,
        textShadow: '0 2px 8px rgba(0,0,0,.9)',
        zIndex: 5,
      }}
    >
      {card}
    </div>
    <div
      style={{
        position: 'absolute',
        left: 140,
        right: 140,
        bottom: 224,
        height: 120,
        border: '3px dashed rgba(247,245,250,.5)',
        borderRadius: 20,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 140,
        right: 140,
        bottom: 90,
        textAlign: 'center',
        fontFamily: CAP,
        fontSize: 40,
        color: LABEL,
      }}
    >
      {note ?? 'caption bottom:224'}
    </div>
  </AbsoluteFill>
);
const PropBowl: React.FC<{x: number; y: number; s?: number; warm?: boolean}> = ({
  x,
  y,
  s = 1,
  warm,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 300 * s,
      height: 150 * s,
      borderRadius: '50%',
      background: warm ? '#E8A37C' : '#B9C4DE',
      border: `${14 * s}px solid #DDE3E1`,
    }}
  />
);

export const BoardTile: React.FC<{shot?: number}> = ({shot = 1}) => {
  return (
    <>
      {shot === 1 && (
        <TileFrame
          id="s1 HOOK"
          card="spotlight-hero-card"
          note="headline F1 = caption (frame 0 đủ chữ)"
        >
          <PropBowl x={390} y={950} s={1.3} />
          <div
            style={{
              position: 'absolute',
              left: 110,
              top: 230,
              right: 110,
              textAlign: 'center',
              fontFamily: HEAD,
              fontSize: 80,
              lineHeight: 1.35,
              color: PAPER,
            }}
          >
            Bạn giữ mối quan hệ ấy
            <br />
            vì <span style={{color: RED}}>thương</span>,<br />
            hay vì <span style={{color: BLUE_DEEP}}>sợ</span> phải bắt đầu lại?
          </div>
          <div
            style={{
              position: 'absolute',
              left: 500,
              top: 700,
              width: 80,
              height: 260,
              background: SKIN,
              borderRadius: 36,
              transform: 'rotate(20deg)',
            }}
          />
        </TileFrame>
      )}
      {shot === 2 && (
        <TileFrame
          id="s2 BẾP HAI NGƯỜI"
          card="depth-layer-moves/multiplane"
          note="drift 3 lớp → nồi LED Nấu→Giữ ấm"
        >
          <div
            style={{
              position: 'absolute',
              left: 190,
              top: 430,
              width: 700,
              height: 250,
              borderRadius: 18,
              background: 'linear-gradient(180deg,#3D2C5E,#C77DA0)',
              border: '8px solid #4A4458',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 520,
              top: 430,
              width: 14,
              height: 250,
              background: '#4A4458',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 190,
              top: 780,
              width: 700,
              height: 560,
              borderRadius: 24,
              background: '#9AA4A9',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 190,
              top: 780,
              height: 8,
              right: 190,
              background: 'rgba(255,255,255,.5)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 270,
              top: 1000,
              width: 180,
              height: 90,
              borderRadius: '50%',
              background: '#E4E9E7',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 290,
              top: 978,
              width: 160,
              height: 24,
              borderRadius: 8,
              background: '#74491F',
              transform: 'rotate(-4deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 620,
              top: 1000,
              width: 180,
              height: 90,
              borderRadius: '50%',
              background: '#E4E9E7',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 630,
              top: 978,
              width: 160,
              height: 24,
              borderRadius: 8,
              background: '#74491F',
              transform: 'rotate(-4deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 770,
              top: 700,
              width: 120,
              height: 60,
              borderRadius: 14,
              background: '#5A4A38',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 790,
              top: 560,
              width: 130,
              height: 150,
              borderRadius: 36,
              background: '#4E4266',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 190,
              top: 680,
              width: 80,
              height: 104,
              borderRadius: 16,
              background: '#8E979C',
              border: '3px solid #6E777C',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 210,
              top: 700,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: RED,
              boxShadow: '0 0 18px rgba(255,90,54,.9)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 206,
              top: 772,
              width: 48,
              height: 30,
              borderRadius: '50%',
              border: '8px solid #C9BBA6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 222,
              top: 808,
              width: 14,
              height: 68,
              borderRadius: 6,
              background: '#C9BBA6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 222,
              top: 830,
              width: 26,
              height: 10,
              borderRadius: 4,
              background: '#C9BBA6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 222,
              top: 850,
              width: 26,
              height: 10,
              borderRadius: 4,
              background: '#C9BBA6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 248,
              top: 808,
              width: 12,
              height: 52,
              borderRadius: 6,
              background: '#B0A48C',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 248,
              top: 838,
              width: 20,
              height: 9,
              borderRadius: 4,
              background: '#B0A48C',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 440,
              top: 1120,
              width: 200,
              height: 150,
              borderRadius: 26,
              background: '#B8C2C6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 505,
              top: 1180,
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: RED,
              boxShadow: '0 0 20px rgba(255,90,54,.95)',
            }}
          />
        </TileFrame>
      )}
      {shot === 3 && (
        <TileFrame
          id="s3"
          card="overhead-camera-moves/tilt-reveal"
          note="settle top-down, gắp 3 cọng → đĩa"
        >
          <PropBowl x={200} y={800} s={1.2} />
          <PropBowl x={620} y={800} s={1.2} />
          <div
            style={{
              position: 'absolute',
              left: 470,
              top: 1150,
              width: 140,
              height: 90,
              borderRadius: '50%',
              background: '#DDE3E1',
            }}
          />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 490 + i * 30,
                top: 1170,
                width: 40,
                height: 12,
                borderRadius: 6,
                background: GREEN,
              }}
            />
          ))}
        </TileFrame>
      )}
      {shot === 4 && (
        <TileFrame
          id="s4 RE-HOOK"
          card="speed-ramp-freeze/freeze-annotate"
          note="freeze slope-0 + vòng tròn cọng hành"
        >
          <div
            style={{
              position: 'absolute',
              left: 500,
              top: 750,
              width: 80,
              height: 260,
              background: SKIN,
              borderRadius: 36,
              transform: 'rotate(20deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 430,
              top: 980,
              width: 220,
              height: 220,
              borderRadius: '50%',
              border: `10px solid ${PAPER}`,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 180,
              top: 1300,
              right: 180,
              textAlign: 'center',
              fontFamily: HEAD,
              fontSize: 60,
              color: PAPER,
            }}
          >
            Vì người ấy, hay vì mình?
          </div>
        </TileFrame>
      )}
      {shot === 5 && (
        <TileFrame
          id="s5 THƯƠNG — chạy ra mở cửa"
          card="hidden-cut/light-leak-burn"
          note="cut giấu trong đỉnh sáng — cửa mở, dusk tràn"
        >
          <div style={{position: 'absolute', inset: 0, background: 'rgba(120,70,80,.35)'}} />
          <PropBowl x={330} y={640} s={1.0} warm />
          <div
            style={{
              position: 'absolute',
              left: 90,
              top: 0,
              bottom: 0,
              width: 120,
              background: '#14101E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 300,
              top: 1000,
              width: 420,
              height: 560,
              borderRadius: 28,
              background: 'linear-gradient(180deg,#C77DA0 0%,#E8A87C 65%,#FFD9A8 100%)',
              boxShadow: '0 0 100px rgba(255,150,100,.85)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 400,
              top: 1180,
              width: 120,
              height: 300,
              borderRadius: 55,
              background: SHIRT,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 415,
              top: 1095,
              width: 90,
              height: 95,
              borderRadius: 42,
              background: SKIN,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 408,
              top: 1060,
              width: 104,
              height: 70,
              borderRadius: 34,
              background: HAIR,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 640,
              top: 1150,
              width: 180,
              height: 220,
              borderRadius: 70,
              background: '#46536E',
              transform: 'rotate(14deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 140,
              top: 420,
              fontFamily: CAP,
              fontWeight: 700,
              fontSize: 40,
              color: RED,
              background: PILL,
              padding: '10px 24px',
              borderRadius: 18,
            }}
          >
            vì thương
          </div>
        </TileFrame>
      )}
      {shot === 6 && (
        <TileFrame
          id="s6 SỢ — ngồi yên, thở phào"
          card="hidden-cut/invisible-cut"
          note="rewind 12f + diễn y hệt, grade lạnh"
        >
          <div style={{position: 'absolute', inset: 0, background: 'rgba(70,90,150,.42)'}} />
          <PropBowl x={330} y={640} s={1.0} />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 40,
                right: 40,
                top: 850 + i * 52,
                height: 26,
                borderRadius: 13,
                background: 'rgba(247,245,250,.28)',
                transform: 'skewX(-14deg)',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 806,
              fontFamily: CAP,
              fontWeight: 700,
              fontSize: 34,
              color: PAPER,
              background: 'rgba(42,34,56,.8)',
              padding: '8px 20px',
              borderRadius: 16,
            }}
          >
            ◀◀ 12f tua lại
          </div>
          <div
            style={{
              position: 'absolute',
              left: 400,
              top: 1230,
              width: 260,
              height: 150,
              borderRadius: 65,
              background: '#3E4A63',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 455,
              top: 1160,
              width: 150,
              height: 110,
              borderRadius: 52,
              background: SKIN,
              opacity: 0.92,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 140,
              top: 420,
              fontFamily: CAP,
              fontWeight: 700,
              fontSize: 40,
              color: BLUE_DEEP,
              background: PILL,
              padding: '10px 24px',
              borderRadius: 18,
            }}
          >
            vì sợ
          </div>
          <div
            style={{
              position: 'absolute',
              left: 180,
              top: 1440,
              right: 180,
              textAlign: 'center',
              fontFamily: CAP,
              fontSize: 38,
              color: LABEL,
            }}
          >
            insert đũa lạ 0.6s mờ — không thành NV thứ ba
          </div>
        </TileFrame>
      )}
      {shot === 7 && (
        <TileFrame
          id="s7 TURN — y hệt nhau"
          card="before-after-slider-scrub"
          note="chia trên/dưới → hội tụ trung tính"
        >
          {[0, 1].map((h) => (
            <div
              key={h}
              style={{
                position: 'absolute',
                left: 140,
                top: 560 + h * 430,
                right: 140,
                height: 400,
                borderRadius: 24,
                background: h === 0 ? '#8C5A6E' : '#3A4666',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 40,
                  top: 150,
                  width: 200,
                  height: 80,
                  borderRadius: 36,
                  background: '#C9BBA6',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 200,
                  top: 160,
                  width: 70,
                  height: 60,
                  borderRadius: 22,
                  background: SKIN,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 190,
                  top: 175,
                  width: 170,
                  height: 14,
                  borderRadius: 7,
                  background: '#8A5A33',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 330,
                  top: 120,
                  width: 250,
                  height: 130,
                  borderRadius: '50%',
                  background: '#DDE3E1',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 365,
                  top: 140,
                  width: 180,
                  height: 90,
                  borderRadius: '50%',
                  background: '#EFE6D2',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 600,
                  top: 200,
                  width: 110,
                  height: 64,
                  borderRadius: '50%',
                  background: '#DDE3E1',
                }}
              />
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 618 + i * 24,
                    top: 218 + (i % 2) * 10,
                    width: 30,
                    height: 9,
                    borderRadius: 5,
                    background: GREEN,
                  }}
                />
              ))}
            </div>
          ))}
          <div
            style={{
              position: 'absolute',
              left: 140,
              right: 140,
              top: 972,
              height: 8,
              background: PAPER,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 150,
              top: 500,
              fontFamily: CAP,
              fontWeight: 700,
              fontSize: 32,
              color: RED,
              background: PILL,
              padding: '8px 18px',
              borderRadius: 14,
            }}
          >
            vì thương
          </div>
          <div
            style={{
              position: 'absolute',
              left: 150,
              top: 1420,
              fontFamily: CAP,
              fontWeight: 700,
              fontSize: 32,
              color: BLUE_DEEP,
              background: PILL,
              padding: '8px 18px',
              borderRadius: 14,
            }}
          >
            vì sợ
          </div>
        </TileFrame>
      )}
      {shot === 8 && (
        <TileFrame
          id="s8 NGƯỠNG — treo chìa, nhìn lâu"
          card="tension/pull-back-isolation"
          note="pull-back về ngưỡng cửa + rack focus"
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 130,
              background: '#14101E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 130,
              background: '#14101E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 54,
              background: '#0E0B16',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 800,
              width: 60,
              height: 120,
              borderRadius: 22,
              background: '#8E979C',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 552,
              top: 920,
              width: 36,
              height: 24,
              borderRadius: '50%',
              border: '7px solid #C9BBA6',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 690,
              top: 1010,
              width: 26,
              height: 60,
              borderRadius: 12,
              background: SKIN,
              transform: 'rotate(-18deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 380,
              top: 800,
              width: 190,
              height: 330,
              borderRadius: 80,
              background: SHIRT,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 420,
              top: 730,
              width: 115,
              height: 115,
              borderRadius: 55,
              background: SKIN,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 408,
              top: 680,
              width: 140,
              height: 90,
              borderRadius: 44,
              background: HAIR,
            }}
          />
          {[
            [350, 660, 1, 1],
            [590, 660, -1, 1],
            [350, 1150, 1, -1],
            [590, 1150, -1, -1],
          ].map(([bx, by, sx, sy], i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: sx === 1 ? bx : bx - 46,
                top: sy === 1 ? by : by - 46,
                width: 46,
                height: 46,
                borderLeft: sx === 1 ? '5px solid rgba(247,245,250,.9)' : undefined,
                borderRight: sx === -1 ? '5px solid rgba(247,245,250,.9)' : undefined,
                borderTop: sy === 1 ? '5px solid rgba(247,245,250,.9)' : undefined,
                borderBottom: sy === -1 ? '5px solid rgba(247,245,250,.9)' : undefined,
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              left: 60,
              top: 1080,
              width: 250,
              height: 480,
              borderRadius: 120,
              background: '#2E2838',
              filter: 'blur(6px)',
              opacity: 0.9,
            }}
          />
          {/* gaze close-up inset: mình's eye looking long (s8 beat) — build inserts this after the wide */}
          <div
            style={{
              position: 'absolute',
              left: 640,
              top: 420,
              width: 300,
              height: 190,
              borderRadius: 28,
              background: '#241F33',
              border: '3px solid rgba(247,245,250,.35)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 40,
                top: 62,
                width: 220,
                height: 66,
                borderRadius: '50%',
                background: PAPER,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 150,
                top: 66,
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: '#23202B',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 165,
                top: 78,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: PAPER,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 40,
                top: 30,
                width: 220,
                height: 22,
                borderRadius: 11,
                background: '#171221',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 36,
                top: 118,
                fontFamily: CAP,
                fontSize: 26,
                color: LABEL,
              }}
            >
              mắt mình — nhìn lâu
            </div>
          </div>
        </TileFrame>
      )}
      {shot === 9 && (
        <TileFrame id="s9" card="scan-bracket-sweep" note="3 insert × 2.2s + nhãn minh hoạ">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 190,
                top: 560 + i * 260,
                right: 190,
                height: 210,
                borderRadius: 24,
                background: i === 1 ? '#2E3350' : '#E9E4D8',
                border: `4px solid ${i === 1 ? BLUE : '#8E8AA0'}`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 40,
                  top: i === 1 ? 40 : 70,
                  right: 40,
                  textAlign: 'center',
                  fontFamily: i === 1 ? HEAD : CAP,
                  fontSize: i === 1 ? 64 : 44,
                  color: i === 1 ? PAPER : INK,
                }}
              >
                {i === 0
                  ? '“Xin lỗi nha.” · 00:47'
                  : i === 1
                    ? "“Lại 'gì cũng được'.”"
                    : 'đĩa hành gạt sang bên'}
              </div>
            </div>
          ))}
          <div
            style={{
              position: 'absolute',
              top: 480,
              right: 200,
              fontFamily: CAP,
              fontSize: 32,
              color: LABEL,
            }}
          >
            minh hoạ
          </div>
        </TileFrame>
      )}
      {shot === 10 && (
        <TileFrame
          id="s10 F2"
          card="paper-title-card"
          note="CẤM ghế đối diện + đèn · hai màu ngang nhau"
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 130,
              background: '#14101E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 130,
              background: '#14101E',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 400,
              top: 850,
              width: 220,
              height: 360,
              borderRadius: 80,
              background: SHIRT,
            }}
          />
          <PropBowl x={380} y={1250} s={1.0} />
          <div
            style={{
              position: 'absolute',
              left: 120,
              top: 230,
              right: 120,
              textAlign: 'center',
              fontFamily: HEAD,
              fontSize: 64,
              lineHeight: 1.4,
              color: PAPER,
            }}
          >
            Nếu hôm nay mới gặp người ấy,
            <br />
            biết mọi điều đang biết,
            <br />
            bạn có chọn bước vào không?
          </div>
        </TileFrame>
      )}
    </>
  );
};

// ------------------------------------------------------------------ font diacritics proof
export const DiacriticsTest: React.FC = () => (
  <AbsoluteFill style={{background: INK, overflow: 'hidden'}}>
    <ThoFonts />
    <div style={{position: 'absolute', left: 80, right: 80, top: 200}}>
      <div style={{fontFamily: HEAD, fontWeight: 600, fontSize: 84, lineHeight: 1.5, color: PAPER}}>
        ẮẰẲẴẶ ẤẦẨẪẬ ỐỒỔỖỘ ỚỜỞỠỢ ỨỪỬỮỰ ẾỀỂỄỆ
      </div>
      <div style={{fontFamily: HEAD, fontWeight: 600, fontSize: 84, lineHeight: 1.5, color: PAPER}}>
        Chìa khoá lạch cạch — Giữ ấm, nhặt hành, thở phào.
      </div>
      <div
        style={{
          fontFamily: CAP,
          fontWeight: 500,
          fontSize: 60,
          lineHeight: 1.5,
          color: PAPER,
          marginTop: 40,
        }}
      >
        Bạn giữ mối quan hệ ấy vì thương, hay vì sợ phải bắt đầu lại?
      </div>
      <div
        style={{
          fontFamily: CAP,
          fontWeight: 700,
          fontSize: 40,
          lineHeight: 1.5,
          color: RED,
          marginTop: 30,
        }}
      >
        Đang nhặt dở, mình khựng lại. Nghe tiếng chìa khoá, mình chạy ra mở cửa.
      </div>
      <div
        style={{
          fontFamily: CAP,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.5,
          color: LABEL,
          marginTop: 30,
        }}
      >
        00:47 “Xin lỗi nha.” minh hoạ · đũa lạ · ỡ ngỡ ngàng
      </div>
    </div>
  </AbsoluteFill>
);
