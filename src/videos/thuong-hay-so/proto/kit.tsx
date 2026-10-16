// Shared kit for thuong-hay-so-bat-dau-lai prototype (story profile).
// Palette + type per docs/thuong-hay-so-bat-dau-lai/design-spec.md §1.
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {E_SINE, Grain, mix, ramp} from './motion';

export const TILE = '#E6ECE8';
export const GROUT = '#C3CEC8';
export const INOX = '#B8C2C6';
export const DUSK1 = '#3D2C5E';
export const DUSK2 = '#C77DA0';
export const INK = '#2A2238';
export const PILL = 'rgba(36,27,51,0.85)';
export const PAPER = '#F7F5FA';
export const RED = '#FF5A36';
export const BLUE = '#9DB4FF';
// Text-only deep periwinkle (1 step darker) — T1: body text on light tile needs more
// contrast; LED/grade washes keep BLUE. Never use for light emission.
export const BLUE_DEEP = '#6E8BFF';
export const LABEL = '#8C86A0';
// ---- Locked character kit (T3): exact hues shared by hook/turn/end. Do not substitute.
// mình (self): SKIN skin + SLEEVE_MINH sleeve. người ấy (partner): SKIN skin + SHIRT torso + HAIR hair.
// Chopsticks always STICK1/STICK2. Bowls always KitBowl geometry.
export const SLEEVE_MINH = '#C9BBA6';
export const STICK1 = '#8A5A33';
export const STICK2 = '#74491F';
export const SOUP = '#EFE6D2';
export const GREEN = '#3E7C4F';
export const GREEN_LT = '#6FA968';
export const SKIN = '#E3B98E';
export const SHIRT = '#5A6B8C';
export const HAIR = '#23202B';

export const HEAD = "'Literata',Georgia,serif";
export const CAP = "'Lexend','Be Vietnam Pro',sans-serif";

export const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

export const ThoFonts: React.FC = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Literata:wght@600;700&family=Lexend:wght@500;600;700&display=swap');`}</style>
);

// Caption pill: bottom 224 + lift, max 2 lines, centered. Size default 58 (>=54).
export const ThoLine: React.FC<{
  text: string;
  accent?: string;
  accentColor?: string;
  size?: number;
  enter?: number;
  lift?: number;
}> = ({text, accent, accentColor = RED, size = 58, enter = 0, lift = 0}) => {
  const f = useCurrentFrame();
  const e = enter <= 0 ? 1 : ramp(f, enter, 12, E_SINE);
  const parts = accent ? text.split(accent) : [text];
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 224 + lift,
        display: 'flex',
        justifyContent: 'center',
        opacity: e,
        transform: `translateY(${(1 - e) * 16}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 952,
          fontFamily: CAP,
          fontWeight: 500,
          fontSize: size,
          lineHeight: 1.45,
          textAlign: 'center',
          color: PAPER,
          padding: '22px 30px 26px',
          borderRadius: 26,
          background: PILL,
          border: '1px solid rgba(247,245,250,.14)',
          textShadow: '0 2px 14px rgba(0,0,0,.9)',
        }}
      >
        {accent && parts.length === 2 ? (
          <>
            {parts[0]}
            <span style={{color: accentColor, fontWeight: 700}}>{accent}</span>
            {parts[1]}
          </>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

// Big headline (F1/F2/s4b): Literata 600, accent spans colored.
export type H是 = {t: string; c?: string; b?: boolean};
export const Headline: React.FC<{lines: H是[][]; size?: number; top?: number; enter?: number}> = ({
  lines,
  size = 84,
  top = 300,
  enter = 0,
}) => {
  const f = useCurrentFrame();
  const e = enter <= 0 ? 1 : ramp(f, enter, 14, E_SINE);
  return (
    <div
      style={{
        position: 'absolute',
        left: 70,
        right: 70,
        top,
        textAlign: 'center',
        opacity: e,
        transform: `translateY(${(1 - e) * 18}px)`,
      }}
    >
      {lines.map((segs, i) => (
        <div
          key={i}
          style={{
            fontFamily: HEAD,
            fontWeight: 600,
            fontSize: size,
            lineHeight: 1.32,
            color: PAPER,
            textShadow: '0 3px 22px rgba(20,12,40,.85)',
            textWrap: 'balance' as const,
          }}
        >
          {segs.map((s, j) => (
            <span
              key={j}
              style={s.c ? {color: s.c, fontWeight: 700} : s.b ? {fontWeight: 700} : undefined}
            >
              {s.t}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

// LED Giu am: breathes on a 72f (2.4s) cycle, never turns off.
export const Led: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 11}) => {
  const f = useCurrentFrame();
  const b = 0.62 + 0.38 * (0.5 - Math.cos((Math.PI * 2 * f) / 72) / 2);
  return (
    <div
      style={{
        position: 'absolute',
        left: x - r * 2,
        top: y - r * 2,
        width: r * 4,
        height: r * 4,
        background: `radial-gradient(circle, rgba(255,90,54,${0.95 * b}) 0%, rgba(255,90,54,${0.55 * b}) 35%, rgba(255,90,54,0) 70%)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: r * 2 - r * 0.55,
          top: r * 2 - r * 0.55,
          width: r * 1.1,
          height: r * 1.1,
          borderRadius: '50%',
          background: `rgba(255,${Math.round(120 + 80 * b)},90,1)`,
          boxShadow: `0 0 ${Math.round(10 + 14 * b)}px rgba(255,90,54,${0.9 * b})`,
        }}
      />
    </div>
  );
};

export const MinhHoa: React.FC<{top?: number}> = ({top = 120}) => (
  <div
    style={{
      position: 'absolute',
      top,
      right: 70,
      fontFamily: CAP,
      fontWeight: 600,
      fontSize: 32,
      color: LABEL,
      background: 'rgba(42,34,56,.72)',
      padding: '8px 18px',
      borderRadius: 14,
      border: '1px solid rgba(140,134,160,.4)',
    }}
  >
    minh hoạ
  </div>
);

// Tile wall background (gach men + ron).
export const TileWall: React.FC<{dim?: number}> = ({dim = 0}) => (
  <div style={{position: 'absolute', inset: 0, background: TILE}}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 86px, ${GROUT} 86px 92px), repeating-linear-gradient(90deg, transparent 0 86px, ${GROUT} 86px 92px)`,
        opacity: 0.85,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(180deg, rgba(61,44,94,.28), rgba(61,44,94,0) 40%, rgba(30,25,45,${0.25 + dim * 0.35}) 100%)`,
      }}
    />
  </div>
);

// Dusk window: violet dusk gradient + sun smudge + frame.
export const DuskWindow: React.FC<{x: number; y: number; w: number; h: number}> = ({
  x,
  y,
  w,
  h,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      borderRadius: 18,
      overflow: 'hidden',
      border: '10px solid #4A4458',
      boxShadow: '0 18px 60px rgba(20,10,40,.45)',
      background: `linear-gradient(180deg, ${DUSK1} 0%, #6B4A8C 45%, ${DUSK2} 78%, #E8A87C 100%)`,
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: w * 0.55,
        top: h * 0.52,
        width: w * 0.3,
        height: h * 0.2,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,220,180,.9), rgba(255,220,180,0) 70%)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: h * 0.78,
        height: h * 0.22,
        background: 'rgba(35,25,55,.5)',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: w * 0.06,
        top: h * 0.7,
        width: w * 0.34,
        height: h * 0.1,
        background: 'rgba(30,20,50,.45)',
        borderRadius: 4,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: w * 0.58,
        top: h * 0.73,
        width: w * 0.36,
        height: h * 0.09,
        background: 'rgba(30,20,50,.45)',
        borderRadius: 4,
      }}
    />
    {/* cross mullion = real window frame */}
    <div
      style={{
        position: 'absolute',
        left: w * 0.5 - 7,
        top: 0,
        bottom: 0,
        width: 14,
        background: '#4A4458',
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: h * 0.46,
        height: 12,
        background: '#4A4458',
      }}
    />
  </div>
);

// Rice cooker with Nau / Giu am labels + steam wisp.
export const Cooker: React.FC<{x: number; y: number; s?: number; steam?: number}> = ({
  x,
  y,
  s = 1,
  steam = 1,
}) => {
  const f = useCurrentFrame();
  const w = 300 * s,
    h = 330 * s;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h}}>
      {steam > 0 &&
        [0, 1].map((i) => {
          const ph = (f / 60 + i * 0.5) % 1;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: w * (0.4 + i * 0.18),
                top: -70 * s - ph * 90 * s,
                width: 44 * s,
                height: 90 * s,
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(247,245,250,.5), rgba(247,245,250,0) 70%)',
                opacity: steam * (1 - ph) * 0.7,
                transform: `translateX(${Math.sin((f + i * 40) / 18) * 12 * s}px) scale(${0.7 + ph * 0.7})`,
              }}
            />
          );
        })}
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: w,
          height: h * 0.72,
          borderRadius: `${40 * s}px ${40 * s}px ${26 * s}px ${26 * s}px`,
          background: `linear-gradient(180deg, #D5DBDE, ${INOX} 60%, #9AA4A9)`,
          boxShadow: '0 24px 60px rgba(20,15,35,.4), inset 0 2px 0 rgba(255,255,255,.7)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: w * 0.08,
          bottom: h * 0.66,
          width: w * 0.84,
          height: h * 0.22,
          borderRadius: `${30 * s}px`,
          background: 'linear-gradient(180deg, #8E979C, #6E777C)',
          boxShadow: 'inset 0 3px 8px rgba(0,0,0,.35)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: w * 0.26,
          bottom: h * 0.16,
          width: w * 0.48,
          height: h * 0.34,
          borderRadius: 14 * s,
          background: '#3A3344',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,.6)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 12 * s,
            top: 8 * s,
            fontFamily: CAP,
            fontWeight: 600,
            fontSize: 19 * s,
            color: '#8E8AA0',
          }}
        >
          Nấu
        </div>
        <Led x={32 * s} y={h * 0.34 - 30 * s} r={13 * s} />
        <div
          style={{
            position: 'absolute',
            left: 54 * s,
            bottom: 12 * s,
            fontFamily: CAP,
            fontWeight: 600,
            fontSize: 19 * s,
            color: PAPER,
            whiteSpace: 'nowrap',
          }}
        >
          Giữ ấm
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: w,
          height: h * 0.72,
          borderRadius: `${40 * s}px ${40 * s}px ${26 * s}px ${26 * s}px`,
          background: 'linear-gradient(105deg, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 30%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

// KitBowl — locked bowl geometry (T3): rim ring (depth) + wall band + soup surface
// with gloss arc + floating scallions with contact shadows + optional steam.
// Same geometry in hook (scallions), turn (scallions per D-review), end (sticks across).
export const Bowl: React.FC<{
  x: number;
  y: number;
  s?: number;
  scallions?: number;
  sticksAcross?: boolean;
  lift?: number;
  steam?: number;
}> = ({x, y, s = 1, scallions = 4, sticksAcross = false, lift = 0, steam = 0}) => {
  const f = useCurrentFrame();
  const w = 340 * s,
    h = 200 * s;
  const strands = [0, 1, 2, 3, 4, 5].slice(0, scallions);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h + 110 * s,
        transform: `translateY(${-lift}px)`,
      }}
    >
      {steam > 0 &&
        [0, 1].map((i) => {
          const ph = (f / 70 + i * 0.5) % 1;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: w * (0.3 + i * 0.3),
                top: -40 * s - ph * 100 * s,
                width: 64 * s,
                height: 110 * s,
                borderRadius: '50%',
                background:
                  'radial-gradient(ellipse, rgba(247,245,250,.62), rgba(247,245,250,0) 70%)',
                opacity: Math.min(1, steam * (1 - ph) * 1.1),
                transform: `translateX(${Math.sin((f + i * 45) / 20) * 10 * s}px) scale(${0.7 + ph * 0.8})`,
              }}
            />
          );
        })}
      {/* contact shadow */}
      <div
        style={{
          position: 'absolute',
          left: -14 * s,
          top: (96 + h * 0.5) * s,
          width: w + 28 * s,
          height: 44 * s,
          borderRadius: '50%',
          background: 'rgba(25,18,40,.35)',
          filter: 'blur(10px)',
        }}
      />
      {/* outer body */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 70 * s,
          width: w,
          height: h * 0.78,
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #F4F6F5, #C9D2CE 70%, #A9B4AF)',
          boxShadow: '0 20px 50px rgba(20,15,35,.35), inset 0 3px 6px rgba(255,255,255,.8)',
        }}
      />
      {/* bottom shade crescent = depth */}
      <div
        style={{
          position: 'absolute',
          left: w * 0.1,
          top: (70 + h * 0.52) * s,
          width: w * 0.8,
          height: h * 0.2,
          borderRadius: '50%',
          background: 'rgba(90,100,105,.35)',
          filter: 'blur(4px)',
        }}
      />
      {/* rim ring */}
      <div
        style={{
          position: 'absolute',
          left: -6 * s,
          top: 58 * s,
          width: w + 12 * s,
          height: h * 0.24,
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #FFFFFF, #D8DEDC)',
          boxShadow: 'inset 0 -3px 6px rgba(120,130,135,.4)',
        }}
      />
      {/* wall band (inner depth) */}
      <div
        style={{
          position: 'absolute',
          left: w * 0.05,
          top: (58 + h * 0.1) * s,
          width: w * 0.9,
          height: h * 0.16,
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #B9A77F, #D9C8A4)',
        }}
      />
      {/* soup surface */}
      <div
        style={{
          position: 'absolute',
          left: w * 0.07,
          top: (58 + h * 0.14) * s,
          width: w * 0.86,
          height: h * 0.5,
          borderRadius: '50%',
          background: `radial-gradient(ellipse at 50% 40%, ${SOUP}, #E2D3B8 75%, #C9B58F)`,
          boxShadow: 'inset 0 6px 18px rgba(120,90,50,.35)',
        }}
      />
      {strands.map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: w * (0.22 + 0.12 * i + 0.03 * Math.sin(i * 7)),
            top: (58 + h * (0.22 + 0.06 * (i % 3))) * s,
            width: 64 * s,
            height: 13 * s,
            borderRadius: 7 * s,
            background: i % 2 ? GREEN : GREEN_LT,
            transform: `rotate(${-18 + i * 13}deg)`,
            boxShadow: '0 2px 4px rgba(40,70,40,.4), 0 4px 8px rgba(120,90,50,.25)',
          }}
        />
      ))}
      {/* gloss arc */}
      <div
        style={{
          position: 'absolute',
          left: w * 0.12,
          top: (58 + h * 0.12) * s,
          width: w * 0.34,
          height: h * 0.2,
          borderRadius: '50%',
          borderLeft: `${5 * s}px solid rgba(255,255,255,.55)`,
          borderTop: `${4 * s}px solid rgba(255,255,255,.3)`,
          transform: 'rotate(-18deg)',
          pointerEvents: 'none',
        }}
      />
      {sticksAcross && (
        <div
          style={{
            position: 'absolute',
            left: -30 * s,
            top: (58 + h * 0.32) * s,
            width: w + 70 * s,
            height: 15 * s,
            transform: 'rotate(-4deg)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 6 * s,
              borderRadius: 4 * s,
              background: STICK1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 8 * s,
              left: 0,
              right: 0,
              height: 6 * s,
              borderRadius: 4 * s,
              background: STICK2,
            }}
          />
        </div>
      )}
    </div>
  );
};

// KitHand — locked hand (T3): sleeve + wrist + palm + index/middle fingers over the top
// stick + thumb beneath. dir 'down' (hook: reaching into bowl) or 'right' (turn: holding from left).
export const HandChop: React.FC<{
  x: number;
  y: number;
  s?: number;
  angle?: number;
  strand?: boolean;
  frozen?: boolean;
  dir?: 'down' | 'right';
}> = ({x, y, s = 1, angle = 24, strand = true, frozen = false, dir = 'down'}) => {
  const f = useCurrentFrame();
  const tremble = frozen ? 0 : Math.sin(f / 9) * 3 * s;
  if (dir === 'right') {
    return (
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 440 * s,
          height: 220 * s,
          transform: `translateX(${tremble}px)`,
        }}
      >
        {/* sleeve */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 55 * s,
            width: 170 * s,
            height: 110 * s,
            borderRadius: `${40 * s}px`,
            background: `linear-gradient(180deg, ${SLEEVE_MINH}, #A89A82)`,
            boxShadow: '0 10px 30px rgba(20,15,35,.3)',
          }}
        />
        {/* palm */}
        <div
          style={{
            position: 'absolute',
            left: 140 * s,
            top: 50 * s,
            width: 120 * s,
            height: 120 * s,
            borderRadius: `${42 * s}px`,
            background: `linear-gradient(180deg, ${SKIN}, #C99A68)`,
            boxShadow: '0 12px 30px rgba(20,15,35,.35)',
          }}
        />
        {/* fingers over top stick */}
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: (170 + i * 38) * s,
              top: 30 * s,
              width: 34 * s,
              height: 110 * s,
              borderRadius: `${16 * s}px`,
              background: `linear-gradient(180deg, ${SKIN}, #D0A276)`,
              boxShadow: '0 4px 10px rgba(20,15,35,.25)',
            }}
          />
        ))}
        {/* thumb beneath */}
        <div
          style={{
            position: 'absolute',
            left: 165 * s,
            top: 140 * s,
            width: 34 * s,
            height: 70 * s,
            borderRadius: `${15 * s}px`,
            background: SKIN,
            transform: 'rotate(24deg)',
          }}
        />
        {/* sticks pointing right, slight convergence */}
        <div
          style={{
            position: 'absolute',
            left: 150 * s,
            top: 78 * s,
            width: 280 * s,
            height: 11 * s,
            borderRadius: 6 * s,
            background: STICK1,
            transform: 'rotate(-3deg)',
            transformOrigin: 'left center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 150 * s,
            top: 104 * s,
            width: 280 * s,
            height: 11 * s,
            borderRadius: 6 * s,
            background: STICK2,
            transform: 'rotate(2deg)',
            transformOrigin: 'left center',
          }}
        />
        {strand && (
          <div
            style={{
              position: 'absolute',
              left: 408 * s,
              top: 82 * s,
              width: 60 * s,
              height: 14 * s,
              borderRadius: 7 * s,
              background: GREEN,
              transform: 'rotate(10deg)',
              boxShadow: '0 3px 8px rgba(40,70,40,.5)',
            }}
          />
        )}
      </div>
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 200 * s,
        height: 420 * s,
        transform: `rotate(${angle}deg) translateX(${tremble}px)`,
        transformOrigin: '50% 0%',
      }}
    >
      {/* sleeve */}
      <div
        style={{
          position: 'absolute',
          left: 55 * s,
          top: 0,
          width: 90 * s,
          height: 150 * s,
          borderRadius: `${30 * s}px`,
          background: `linear-gradient(180deg, ${SLEEVE_MINH}, #A89A82)`,
          boxShadow: '0 10px 30px rgba(20,15,35,.3)',
        }}
      />
      {/* wrist + palm */}
      <div
        style={{
          position: 'absolute',
          left: 50 * s,
          top: 118 * s,
          width: 100 * s,
          height: 118 * s,
          borderRadius: `${36 * s}px`,
          background: `linear-gradient(180deg, ${SKIN}, #C99A68)`,
          boxShadow: '0 12px 30px rgba(20,15,35,.35)',
        }}
      />
      {/* index + middle fingers over the top stick */}
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: (64 + i * 36) * s,
            top: 150 * s,
            width: 32 * s,
            height: 108 * s,
            borderRadius: `${15 * s}px`,
            background: `linear-gradient(180deg, ${SKIN}, #D0A276)`,
            boxShadow: '0 4px 10px rgba(20,15,35,.25)',
          }}
        />
      ))}
      {/* thumb beneath sticks */}
      <div
        style={{
          position: 'absolute',
          left: 118 * s,
          top: 196 * s,
          width: 30 * s,
          height: 72 * s,
          borderRadius: `${14 * s}px`,
          background: SKIN,
          transform: 'rotate(-22deg)',
        }}
      />
      {/* sticks */}
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: (72 + i * 26) * s,
            top: 196 * s,
            width: 11 * s,
            height: 214 * s,
            borderRadius: 6 * s,
            background: i ? STICK2 : STICK1,
          }}
        />
      ))}
      {strand && (
        <div
          style={{
            position: 'absolute',
            left: 62 * s,
            top: 394 * s,
            width: 66 * s,
            height: 15 * s,
            borderRadius: 8 * s,
            background: GREEN,
            transform: 'rotate(8deg)',
            boxShadow: '0 3px 8px rgba(40,70,40,.5)',
          }}
        />
      )}
    </div>
  );
};

// Film grain + vignette finish for proto frames.
export const Finish: React.FC = () => (
  <>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 90% 90% at 50% 45%, rgba(0,0,0,0) 55%, rgba(24,16,40,.38) 100%)',
      }}
    />
    <Grain opacity={0.06} />
  </>
);

export {mix};
