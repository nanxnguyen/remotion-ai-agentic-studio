// ScenesA — xay-doi-minh-hay-chung-minh (scene-agent A, sole owner)
// Shots: s1 (f0–105), s2a (f105–237), s2b (f237–337).
// Self-contained: local tokens/grammar adapted from src/xay-doi-minh-hay-chung-minh/proto/*
// (Headline press-in, bulb chase, linear sweep, brick drop overshoot+squash+dust, gượng face).
// Frame-driven only: useCurrentFrame (shot-local via Reel <Sequence>) + seeded hash.
// Durations read from timeline import (never edited here).
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {XDM_SHOTS} from '../timeline';

// ---------- local tokens (design-spec §1) ----------
const C = {
  cobaltTop: '#141B6B',
  cobaltBot: '#2A36C9',
  sen: '#FF2E9A',
  senLight: '#FF5CB3',
  senDark: '#B3126A',
  lampWhite: '#F3F6FF',
  ice: '#8FE3FF',
  jade: '#19C48A',
  ink: '#0A0F3D',
  shirt: '#E9EEFF',
  pants: '#1A2060',
  hat: '#FFA3D1',
  wood: '#8A6B46',
  skin: '#F6CFA8',
  skinShadow: '#E8B98A',
} as const;

const F_HEAD = "'Bricolage Grotesque','Archivo',sans-serif";
const F_BODY = "'Archivo',sans-serif";

// Seeded pseudo-random (no Math.random / Date.now).
const hash = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x);

// cubic-bezier solver (same grammar as lib/Polish bezier).
const bezier = (x1: number, y1: number, x2: number, y2: number) => {
  const ax = 1 - 3 * x2 + 3 * x1;
  const bx = 3 * x2 - 6 * x1;
  const cx = 3 * x1;
  const ay = 1 - 3 * y2 + 3 * y1;
  const by = 3 * y2 - 6 * y1;
  const cy = 3 * y1;
  const sx = (u: number): number => ((ax * u + bx) * u + cx) * u;
  const sy = (u: number): number => ((ay * u + by) * u + cy) * u;
  const dx = (u: number): number => (3 * ax * u + 2 * bx) * u + cx;
  return (t: number): number => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let u = t;
    for (let i = 0; i < 8; i++) {
      const err = sx(u) - t;
      if (Math.abs(err) < 1e-7) break;
      const d = dx(u);
      if (Math.abs(d) < 1e-6) break;
      u -= err / d;
    }
    return sy(u);
  };
};

// Brick drop settle (deck-deal grammar, J3-scaled: dip ~8% of brick height,
// overshoot y1>1 + short squash + lagged dust).
const dropY = (frame: number, land: number, fromY: number, toY: number) => {
  const fall = interpolate(frame, [land - 8, land], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  const s01 = clamp01((frame - land) / 6);
  const e = bezier(0.3, 0, 0.25, 1.15)(s01);
  const y = fromY + (toY - fromY) * fall + (e - s01) * 30;
  const squash = s01 > 0 && s01 < 1 ? Math.sin(s01 * Math.PI) * 0.1 : 0;
  return {y, squash};
};

// ---------- shared bits ----------
type CapSeg = {text: string; accent?: string; bold?: boolean};

// Caption pill: bottom 224, Archivo SemiBold 58px on ink 85%, nothing in bottom 210px.
const Caption: React.FC<{segs: CapSeg[]}> = ({segs}) => (
  <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', pointerEvents: 'none'}}>
    <div
      style={{
        marginBottom: 224,
        maxWidth: 940,
        background: 'rgba(10,15,61,0.85)',
        borderRadius: 28,
        padding: '22px 40px',
        textAlign: 'center',
        fontFamily: F_BODY,
        fontWeight: 600,
        fontSize: 58,
        lineHeight: 1.32,
        color: C.lampWhite,
      }}
    >
      {segs.map((s, i) => (
        <span
          key={i}
          style={
            s.accent ? {color: s.accent, fontWeight: 800} : s.bold ? {fontWeight: 800} : undefined
          }
        >
          {s.text.split('\n').map((line, j, arr) => (
            <React.Fragment key={j}>
              {line}
              {j < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      ))}
    </div>
  </AbsoluteFill>
);

// Paper fiber overlay (deterministic tile).
const FIBER_SVG =
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>` +
  `<filter id='p' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>` +
  `<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='7' stitchTiles='stitch'/>` +
  `<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/>` +
  `</filter><rect width='240' height='240' filter='url(#p)'/></svg>`;
const FIBER_URI = `url("data:image/svg+xml;utf8,${encodeURIComponent(FIBER_SVG)}")`;

const PaperGrain: React.FC<{opacity?: number}> = ({opacity = 0.14}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      opacity,
      backgroundImage: FIBER_URI,
      backgroundSize: '240px 240px',
    }}
  />
);

const Vignette: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background:
        'radial-gradient(ellipse 72% 72% at 50% 46%, rgba(6,8,30,0) 50%, rgba(6,8,30,0.10) 77%, rgba(6,8,30,0.32) 100%)',
    }}
  />
);

// Running-bond sen wall, straight top edge.
const BRICK_W = 216;
const BRICK_H = 96;
const Wall: React.FC<{x: number; y: number; cols: number; rows: number; seed?: number}> = ({
  x,
  y,
  cols,
  rows,
  seed = 1,
}) => {
  const bricks: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const off = r % 2 === 1 ? -BRICK_W / 2 : 0;
    for (let cix = -1; cix < cols + 1; cix++) {
      const tone = hash(seed * 131 + r * 17 + cix * 7);
      const bg =
        tone < 0.33
          ? `linear-gradient(180deg, ${C.senLight} 0%, ${C.sen} 60%, ${C.senDark} 100%)`
          : tone < 0.66
            ? `linear-gradient(180deg, ${C.sen} 0%, ${C.senDark} 100%)`
            : `linear-gradient(180deg, #FF7CC0 0%, ${C.senLight} 55%, ${C.sen} 100%)`;
      bricks.push(
        <div
          key={`${r}-${cix}`}
          style={{position: 'absolute', left: cix * BRICK_W + off, top: r * BRICK_H}}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: BRICK_W - 8,
              height: BRICK_H - 8,
              background: bg,
              border: `4px solid ${C.ink}`,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <PaperGrain opacity={0.2} />
          </div>
        </div>,
      );
    }
  }
  return (
    <div
      style={{position: 'absolute', left: x, top: y, width: cols * BRICK_W, height: rows * BRICK_H}}
    >
      {bricks}
    </div>
  );
};

// Bulb sign "THẤY CHƯA?" — bulbs chase while f<20 (shot-local), then steady.
const SignBoard: React.FC<{x: number; y: number; w?: number; fs?: number; f: number}> = ({
  x,
  y,
  w = 640,
  fs = 84,
  f,
}) => {
  const chase = f < 20 ? (f % 5) / 5 : 1;
  const bulbs = 14;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        padding: '26px 10px 30px',
        background: '#2A0A2E',
        border: `5px solid ${C.ink}`,
        borderRadius: 22,
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(255,46,154,0.55)',
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 14px 12px'}}>
        {Array.from({length: bulbs}).map((_, i) => {
          const on = f < 20 ? (i / bulbs < chase ? 1 : 0.25) : 1;
          return (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: on > 0.5 ? '#FFF6D8' : '#5A4A3A',
                boxShadow: on > 0.5 ? '0 0 12px 4px rgba(255,240,200,0.9)' : 'none',
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          fontFamily: F_HEAD,
          fontWeight: 800,
          fontSize: fs,
          letterSpacing: '0.02em',
          color: C.senLight,
          textShadow: '0 0 18px rgba(255,46,154,0.9), 0 0 46px rgba(255,46,154,0.5)',
        }}
      >
        THẤY CHƯA?
      </div>
    </div>
  );
};

// Cold linear sweep band (strictly linear — eased light reads as intent).
// Local: pass shot-local frame + active window.
const SweepBand: React.FC<{f: number; y: number; height: number}> = ({f, y, height}) => {
  const x = interpolate(f, [0, 30], [-300, 1400]); // linear
  const grad = (c: string) =>
    `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${c} 42%, ${c} 58%, rgba(0,0,0,0) 100%)`;
  return (
    <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: x - 640,
          top: y - height / 2,
          width: 1280,
          height,
          background: grad('rgba(243,246,255,0.40)'),
          filter: 'blur(30px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x - 470,
          top: y - 46,
          width: 940,
          height: 92,
          background: grad('rgba(243,246,255,0.55)'),
          filter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x - 330,
          top: y - 22,
          width: 660,
          height: 44,
          background: grad('rgba(255,255,255,0.65)'),
          filter: 'blur(5px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: x - 300,
          top: y - 4,
          width: 600,
          height: 8,
          background: grad('#ffffff'),
          filter: 'blur(1.5px)',
        }}
      />
    </div>
  );
};

// Paper-cut figure. flip=true faces right (toward the ice window in s1).
const Person: React.FC<{
  x: number;
  y: number;
  h?: number;
  hat?: boolean;
  face?: 'calm' | 'awkward' | 'hope' | 'parted';
  eyesDown?: boolean;
  flip?: boolean;
  fistUp?: boolean;
}> = ({
  x,
  y,
  h = 300,
  hat = true,
  face = 'calm',
  eyesDown = false,
  flip = false,
  fistUp = false,
}) => {
  const s = h / 300;
  const mouth =
    face === 'hope' ? (
      <div
        style={{
          width: 30 * s,
          height: 14 * s,
          border: `${4 * s}px solid ${C.ink}`,
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderRadius: `0 0 ${20 * s}px ${20 * s}px`,
        }}
      />
    ) : face === 'awkward' ? (
      <div
        style={{
          width: 30 * s,
          height: 6 * s,
          borderRadius: 4 * s,
          background: C.ink,
          transform: 'rotate(-7deg)',
        }}
      />
    ) : face === 'parted' ? (
      <div
        style={{
          width: 17 * s,
          height: 22 * s,
          borderRadius: '50%',
          background: '#5A2233',
          border: `${3 * s}px solid ${C.ink}`,
        }}
      />
    ) : (
      <div style={{width: 26 * s, height: 8 * s, borderRadius: 5 * s, background: C.ink}} />
    );
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y - h,
        width: 150 * s,
        height: h,
        transform: flip ? 'scaleX(-1)' : undefined,
        filter: 'drop-shadow(0 10px 14px rgba(6,8,30,0.35))',
      }}
    >
      <div style={{position: 'absolute', bottom: 0, left: 38 * s, display: 'flex', gap: 10 * s}}>
        {[0, 1].map((i) => (
          <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div
              style={{
                width: 30 * s,
                height: 44 * s,
                background: C.pants,
                border: `4px solid ${C.ink}`,
                borderRadius: 10 * s,
              }}
            />
            <div
              style={{
                width: 20 * s,
                height: 20 * s,
                borderRadius: '50%',
                background: C.pants,
                border: `4px solid ${C.ink}`,
                margin: `${-4 * s}px 0`,
                zIndex: 1,
              }}
            />
            <div
              style={{
                width: 30 * s,
                height: 44 * s,
                background: C.pants,
                border: `4px solid ${C.ink}`,
                borderRadius: 10 * s,
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 88 * s,
          left: 28 * s,
          width: 94 * s,
          height: 110 * s,
          background: C.shirt,
          border: `4px solid ${C.ink}`,
          borderRadius: 22 * s,
        }}
      />
      {/* left arm */}
      <div
        style={{
          position: 'absolute',
          bottom: 96 * s,
          left: 8 * s,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'rotate(10deg)',
        }}
      >
        <div
          style={{
            width: 26 * s,
            height: 44 * s,
            background: C.shirt,
            border: `4px solid ${C.ink}`,
            borderRadius: 12 * s,
          }}
        />
        <div
          style={{
            width: 18 * s,
            height: 18 * s,
            borderRadius: '50%',
            background: C.shirt,
            border: `4px solid ${C.ink}`,
            margin: `${-4 * s}px 0`,
            zIndex: 1,
          }}
        />
        <div
          style={{
            width: 26 * s,
            height: 42 * s,
            background: C.shirt,
            border: `4px solid ${C.ink}`,
            borderRadius: 12 * s,
          }}
        />
      </div>
      {/* right arm — raised with clenched fist when fistUp */}
      <div
        style={{
          position: 'absolute',
          bottom: fistUp ? 150 * s : 96 * s,
          right: 2 * s,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: fistUp ? 'rotate(-150deg)' : 'rotate(-14deg)',
        }}
      >
        <div
          style={{
            width: 26 * s,
            height: 44 * s,
            background: C.shirt,
            border: `4px solid ${C.ink}`,
            borderRadius: 12 * s,
          }}
        />
        <div
          style={{
            width: 18 * s,
            height: 18 * s,
            borderRadius: '50%',
            background: C.shirt,
            border: `4px solid ${C.ink}`,
            margin: `${-4 * s}px 0`,
            zIndex: 1,
          }}
        />
        <div
          style={{
            width: 26 * s,
            height: 42 * s,
            background: C.shirt,
            border: `4px solid ${C.ink}`,
            borderRadius: 12 * s,
          }}
        />
        {fistUp && (
          <div
            style={{
              width: 30 * s,
              height: 30 * s,
              borderRadius: '50%',
              background: C.skin,
              border: `4px solid ${C.ink}`,
              marginTop: `${-6 * s}px`,
            }}
          />
        )}
      </div>
      {/* head */}
      <div
        style={{
          position: 'absolute',
          bottom: 190 * s,
          left: 33 * s,
          width: 84 * s,
          height: 84 * s,
          background: C.skin,
          border: `4px solid ${C.ink}`,
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6 * s,
        }}
      >
        <div style={{display: 'flex', gap: 14 * s, marginTop: eyesDown ? 8 * s : 0}}>
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 9 * s,
                height: eyesDown ? 5 * s : 12 * s,
                borderRadius: 5 * s,
                background: C.ink,
              }}
            />
          ))}
        </div>
        {mouth}
      </div>
      {hat ? (
        <div
          style={{
            position: 'absolute',
            bottom: 252 * s,
            left: 26 * s,
            width: 98 * s,
            height: 52 * s,
            background: C.hat,
            border: `4px solid ${C.ink}`,
            borderRadius: `${50 * s}px ${50 * s}px ${12 * s}px ${12 * s}px`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: -6 * s,
              left: -12 * s,
              width: 122 * s,
              height: 16 * s,
              background: C.hat,
              border: `4px solid ${C.ink}`,
              borderRadius: 8 * s,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            bottom: 248 * s,
            left: 31 * s,
            width: 88 * s,
            height: 44 * s,
            background: C.ink,
            borderTopLeftRadius: 44 * s,
            borderTopRightRadius: 44 * s,
            borderBottomLeftRadius: 10 * s,
            borderBottomRightRadius: 10 * s,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: -8 * s,
                left: (12 + i * 26) * s,
                width: 0,
                height: 0,
                borderLeft: `${9 * s}px solid transparent`,
                borderRight: `${9 * s}px solid transparent`,
                borderTop: `${14 * s}px solid ${C.ink}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================================
// S1 — HOOK / COVER (105f). Cover bands per script.md frame-0 table.
// Headline full from f0 (static, press-in settle only); bulb chase f0–20;
// cold sweep upper-wall band y930–1070 (sign excluded); brick "cộp" f18;
// push 1.00→1.04 toward ice window. No bottom caption.
// ============================================================
export const S1Scene: React.FC = () => {
  const f = useCurrentFrame(); // shot-local (Reel Sequence)
  const dur = XDM_SHOTS.s1.durationInFrames;
  const push = interpolate(f, [0, dur], [1, 1.04]);
  const {y: brickY, squash} = dropY(f, 18, 596, 806);
  // Press-in settle flavor, readable at f0: opacity 1 throughout, scale 1.03→1.
  const settle = interpolate(f, [0, 9], [1.03, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.75, 0.3, 1),
  });
  return (
    <AbsoluteFill
      style={{background: `linear-gradient(180deg, ${C.cobaltTop} 0%, ${C.cobaltBot} 100%)`}}
    >
      <div
        style={{
          position: 'absolute',
          inset: -60,
          transform: `scale(${push})`,
          transformOrigin: '720px 690px',
        }}
      >
        {Array.from({length: 26}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: hash(i * 3 + 1) * 1080,
              top: hash(i * 7 + 2) * 560,
              width: 3 + hash(i * 11) * 4,
              height: 3 + hash(i * 11) * 4,
              borderRadius: '50%',
              background: 'rgba(243,246,255,0.5)',
              opacity: 0.25 + hash(i * 13) * 0.4,
            }}
          />
        ))}
        {/* HEADLINE band 115–538px, full from f0 */}
        <div
          style={{
            position: 'absolute',
            top: 118,
            width: 1080,
            textAlign: 'center',
            transform: `scale(${settle})`,
          }}
        >
          <div
            style={{
              fontFamily: F_HEAD,
              fontWeight: 800,
              fontSize: 86,
              lineHeight: 1.18,
              letterSpacing: '-0.015em',
              color: C.lampWhite,
              textShadow: '0 3px 26px rgba(6,8,30,0.6)',
            }}
          >
            <div>
              Bạn đang <span style={{color: C.jade}}>xây</span>
            </div>
            <div>cuộc đời mình,</div>
            <div>
              hay cố <span style={{color: C.sen}}>chứng minh</span>
            </div>
            <div>ai đó đã sai?</div>
          </div>
        </div>
        {/* ice window 614–768px, right third */}
        <div
          style={{
            position: 'absolute',
            left: 700,
            top: 560,
            width: 380,
            height: 260,
            background: '#10155A',
            border: `5px solid ${C.ink}`,
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          <PaperGrain opacity={0.12} />
          {Array.from({length: 6}).map((_, i) => {
            const lit = i === 4;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 40 + (i % 3) * 110,
                  top: 36 + Math.floor(i / 3) * 110,
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  background: lit ? C.ice : '#232A7A',
                  border: `4px solid ${C.ink}`,
                  boxShadow: lit ? '0 0 26px 6px rgba(143,227,255,0.75)' : 'none',
                  overflow: 'hidden',
                }}
              >
                {lit && (
                  <>
                    <div
                      style={{
                        position: 'absolute',
                        left: 34,
                        top: 0,
                        width: 6,
                        height: 80,
                        background: '#10155A',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 34,
                        width: 80,
                        height: 6,
                        background: '#10155A',
                      }}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
        {/* wall 806px+ (straight top), ladder, figure gazing right at window */}
        <Wall x={60} y={830} cols={4} rows={9} seed={3} />
        <div style={{position: 'absolute', left: 180, top: 560, width: 130, height: 300}}>
          {[0, 1].map((s) => (
            <div
              key={s}
              style={{
                position: 'absolute',
                left: s * 104,
                top: 0,
                width: 22,
                height: 300,
                background: C.wood,
                border: `4px solid ${C.ink}`,
                borderRadius: 8,
              }}
            />
          ))}
          {[40, 130, 220].map((t) => (
            <div
              key={t}
              style={{
                position: 'absolute',
                left: 0,
                top: t,
                width: 126,
                height: 18,
                background: C.wood,
                border: `4px solid ${C.ink}`,
                borderRadius: 6,
              }}
            />
          ))}
        </div>
        <Person x={150} y={830} h={300} hat face="hope" flip fistUp={false} />
        {/* falling brick lands f18 on wall top */}
        <div
          style={{
            position: 'absolute',
            left: 288,
            top: brickY,
            width: 200,
            height: 92,
            transform: `scaleY(${1 - squash})`,
            background: `linear-gradient(180deg, ${C.senLight} 0%, ${C.sen} 45%, ${C.senDark} 100%)`,
            border: `5px solid ${C.ink}`,
            borderRadius: 10,
            filter: 'drop-shadow(0 8px 10px rgba(6,8,30,0.4))',
          }}
        />
        {f >= 18 &&
          Array.from({length: 9}).map((_, i) => {
            const a = (i / 9) * Math.PI * 2;
            const life = clamp01((f - 18) / 20);
            const r = life * (60 + hash(i * 5 + 9) * 80);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 388 + Math.cos(a) * r,
                  top: 830 + Math.sin(a) * r * 0.5,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: C.senLight,
                  opacity: 0.85 * (1 - life),
                }}
              />
            );
          })}
        {/* sign band 1114–1344px */}
        <SignBoard x={220} y={1130} w={640} fs={84} f={f} />
        {/* cold sweep, upper-wall band only (sign untouched) */}
        {f <= 32 && <SweepBand f={f} y={1000} height={140} />}
        {/* ground fade only — 88–100% stays empty */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 1690,
            width: 1080,
            height: 230,
            background: 'linear-gradient(180deg, rgba(6,8,30,0) 0%, rgba(6,8,30,0.4) 60%)',
          }}
        />
      </div>
      <PaperGrain opacity={0.14} />
      <Vignette />
    </AbsoluteFill>
  );
};

// ============================================================
// S2a — Tết memory, overhead-tabletop (132f).
// Warm cobalt; long table vertical; bánh chưng, đào branch, faceless
// adults; 18yo standing, fist clenched; tag "10 năm trước" top-left.
// Caption 2 chunks (flip f72); cup-clink motion at f125 (SFX anchor).
// ============================================================
const S2A_FLIP = 72;
const S2A_CLINK = 125;

export const S2aScene: React.FC = () => {
  const f = useCurrentFrame(); // shot-local
  const chunk2 = f >= S2A_FLIP;
  // dishes settle in along table length (overhead-drop grammar, one pass;
  // A-S2A-01: pre-landed early set + short 8f settle so ≥3 dishes read by shot+6f)
  const dishY = (land: number, y: number): number => {
    const t = interpolate(f, [land - 8, land], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    return y - (1 - t) * 260;
  };
  const dishO = (land: number): number =>
    interpolate(f, [land - 8, land], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  // cup clink: two cups tilt toward each other at the SFX frame
  const clink = interpolate(f, [S2A_CLINK - 4, S2A_CLINK, S2A_CLINK + 6], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{background: 'linear-gradient(180deg, #1B2068 0%, #2A2A72 60%, #141B6B 100%)'}}
    >
      {/* warm memory wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 700px 900px at 50% 45%, rgba(255,180,120,0.10), rgba(255,180,120,0) 70%)',
        }}
      />
      {/* đào branch behind table top */}
      <div style={{position: 'absolute', left: 620, top: 130, width: 330, height: 420}}>
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 60,
            width: 26,
            height: 360,
            background: '#4A2E1E',
            border: `4px solid ${C.ink}`,
            borderRadius: 12,
            transform: 'rotate(8deg)',
          }}
        />
        {Array.from({length: 12}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 40 + hash(i * 3 + 11) * 260,
              top: 20 + hash(i * 7 + 12) * 300,
              width: 34 + hash(i * 5 + 13) * 22,
              height: 34 + hash(i * 5 + 13) * 22,
              borderRadius: '50%',
              background: i % 3 === 0 ? C.hat : '#FF7CC0',
              border: `3px solid ${C.ink}`,
              opacity: dishO(6),
            }}
          />
        ))}
      </div>
      {/* drifting petals (seeded linear fall, loops across shot) */}
      {Array.from({length: 8}).map((_, i) => {
        const cyc = 66;
        const t = ((f + hash(i * 17 + 5) * cyc) % cyc) / cyc;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 120 + hash(i * 3 + 21) * 840 + Math.sin((f + i * 20) / 14) * 24,
              top: 100 + t * 1500,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: '#FFA3D1',
              opacity: 0.5 * (1 - t),
            }}
          />
        );
      })}
      {/* long Tết table, vertical */}
      <div
        style={{
          position: 'absolute',
          left: 290,
          top: 420,
          width: 500,
          height: 1120,
          background: '#5A3D22',
          border: `6px solid ${C.ink}`,
          borderRadius: 26,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #6B4A2A 0%, #4E3319 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: 26,
            background: 'rgba(243,246,255,0.14)',
          }}
        />
        {/* table runner */}
        <div
          style={{
            position: 'absolute',
            left: 210,
            top: 0,
            width: 80,
            height: 1120,
            background: '#7A1F2B',
            opacity: 0.85,
          }}
        />
        {/* bánh chưng (leaf green packs) */}
        {[
          {x: 60, y: 120, land: 2},
          {x: 300, y: 120, land: 4},
          {x: 180, y: 420, land: 6},
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: b.x,
              top: dishY(b.land, b.y),
              opacity: dishO(b.land),
            }}
          >
            <div
              style={{
                width: 130,
                height: 110,
                background: '#2E7D46',
                border: `5px solid ${C.ink}`,
                borderRadius: 12,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 58,
                top: -6,
                width: 14,
                height: 122,
                background: '#D9DCF2',
                border: `3px solid ${C.ink}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -6,
                top: 48,
                width: 142,
                height: 14,
                background: '#D9DCF2',
                border: `3px solid ${C.ink}`,
              }}
            />
          </div>
        ))}
        {/* bowls + oranges */}
        {[
          {x: 70, y: 640, land: 10},
          {x: 310, y: 640, land: 14},
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: b.x,
              top: dishY(b.land, b.y),
              width: 120,
              height: 80,
              opacity: dishO(b.land),
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 20,
                width: 120,
                height: 60,
                background: '#E9EEFF',
                border: `5px solid ${C.ink}`,
                borderRadius: '10px 10px 40px 40px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 14,
                top: 0,
                width: 92,
                height: 34,
                background: '#FFC46B',
                border: `4px solid ${C.ink}`,
                borderRadius: '50%',
              }}
            />
          </div>
        ))}
        {/* oranges pile */}
        <div style={{position: 'absolute', left: 180, top: dishY(18, 880), opacity: dishO(18)}}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: (i % 3) * 56 - 20,
                top: Math.floor(i / 3) * -48,
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#F59B23',
                border: `4px solid ${C.ink}`,
              }}
            />
          ))}
        </div>
        {/* clinking cups bottom of table */}
        <div style={{position: 'absolute', left: 150, top: 1010, width: 200, height: 90}}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 20 - clink * 10,
              width: 70,
              height: 60,
              background: '#E9EEFF',
              border: `5px solid ${C.ink}`,
              borderRadius: '8px 8px 24px 24px',
              transform: `rotate(${-8 - clink * 14}deg)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 20 - clink * 10,
              width: 70,
              height: 60,
              background: '#E9EEFF',
              border: `5px solid ${C.ink}`,
              borderRadius: '8px 8px 24px 24px',
              transform: `rotate(${8 + clink * 14}deg)`,
            }}
          />
          {clink > 0.4 && (
            <div
              style={{
                position: 'absolute',
                left: 88,
                top: -6,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(243,246,255,0.9)',
                boxShadow: '0 0 18px 6px rgba(243,246,255,0.8)',
              }}
            />
          )}
        </div>
        {/* steam curls above bowls */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 130 + i * 110 + Math.sin((f + i * 30) / 18) * 14,
              top: 540,
              width: 40,
              height: 150,
              borderRadius: 20,
              background: 'rgba(243,246,255,0.16)',
              filter: 'blur(8px)',
            }}
          />
        ))}
      </div>
      {/* faceless adult silhouettes flanking the table */}
      {[
        {x: 40, y: 700},
        {x: 60, y: 1100},
        {x: 880, y: 700},
        {x: 900, y: 1100},
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: 150,
            height: 330,
            opacity: 0.92,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 33,
              top: 0,
              width: 84,
              height: 84,
              borderRadius: '50%',
              background: '#232A66',
              border: `5px solid ${C.ink}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 15,
              top: 80,
              width: 120,
              height: 250,
              background: '#232A66',
              border: `5px solid ${C.ink}`,
              borderRadius: 40,
            }}
          />
        </div>
      ))}
      {/* 18yo standing at table center, fist clenched, no hat */}
      <Person x={465} y={1180} h={330} hat={false} face="hope" fistUp />
      {/* memory tag top-left */}
      <div
        style={{
          position: 'absolute',
          left: 48,
          top: 120,
          background: 'rgba(10,15,61,0.85)',
          border: '3px solid rgba(217,220,242,0.7)',
          borderRadius: 16,
          padding: '14px 28px',
          fontFamily: F_BODY,
          fontWeight: 600,
          fontSize: 36,
          color: C.lampWhite,
          letterSpacing: '0.02em',
        }}
      >
        10 năm trước
      </div>
      {!chunk2 ? (
        <Caption segs={[{text: 'Mười tám tuổi,\nmâm cơm Tết đông họ hàng,'}]} />
      ) : (
        <Caption segs={[{text: 'bạn nói:\n'}, {text: '"Con sẽ làm được."', bold: true}]} />
      )}
      <PaperGrain opacity={0.14} />
      <Vignette />
    </AbsoluteFill>
  );
};

// ============================================================
// S2b — sting, crash-zoom-punch #1 (100f). E11: NO laugh sample.
// (1) f0–29: adult hand waves dismissively (no face).
// (2) f30–end: hard cut + punch 1.22→1 to gượng close-up,
//     eyes-down, dismissive hand at edge, face ≥400px, no other face.
// Caption flips on the cut.
// ============================================================
const S2B_CUT = 30;

export const S2bScene: React.FC = () => {
  const f = useCurrentFrame(); // shot-local
  const dur = XDM_SHOTS.s2b.durationInFrames;
  void dur;
  if (f < S2B_CUT) {
    // --- beat 1: dismissive adult hand-wave, feast bokeh behind, no face ---
    const wave = Math.sin((f / S2B_CUT) * Math.PI * 2);
    return (
      <AbsoluteFill
        style={{background: 'linear-gradient(180deg, #1B2068 0%, #2A2A72 60%, #141B6B 100%)'}}
      >
        {Array.from({length: 12}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: hash(i * 3 + 51) * 1080,
              top: 500 + hash(i * 7 + 52) * 1100,
              width: 50 + hash(i * 11 + 53) * 90,
              height: 50 + hash(i * 11 + 53) * 90,
              borderRadius: '50%',
              background: 'rgba(255,180,120,0.14)',
            }}
          />
        ))}
        {/* waving adult hand from left, enlarged 1.3× (A-S2B-01; no face anywhere) */}
        <div
          style={{
            position: 'absolute',
            left: 90 + wave * 46,
            top: 840,
            width: 442,
            height: 195,
            background: C.skinShadow,
            border: `8px solid ${C.ink}`,
            borderRadius: 98,
            transform: `rotate(${-14 + wave * 10}deg)`,
            filter: 'drop-shadow(0 14px 18px rgba(6,8,30,0.45))',
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                right: -39 + (i % 2) * 18,
                top: 16 + i * 39,
                width: 117,
                height: 39,
                background: C.skinShadow,
                border: `6px solid ${C.ink}`,
                borderRadius: 20,
              }}
            />
          ))}
        </div>
        {/* foreground feast bokeh (A-S2B-01: fills the surround, stays minimal) */}
        {[
          {x: 60, y: 420, d: 220, o: 0.12},
          {x: 800, y: 480, d: 180, o: 0.14},
          {x: 760, y: 1300, d: 240, o: 0.1},
          {x: 80, y: 1350, d: 170, o: 0.12},
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: b.x,
              top: b.y,
              width: b.d,
              height: b.d,
              borderRadius: '50%',
              background: `rgba(255,180,120,${b.o})`,
              filter: 'blur(18px)',
            }}
          />
        ))}
        <Caption segs={[{text: 'Có người bật cười:'}]} />
        <PaperGrain opacity={0.14} />
        <Vignette />
      </AbsoluteFill>
    );
  }
  // --- beat 2: gượng close-up after hard cut + punch-in ---
  const lf = f - S2B_CUT;
  const punch = interpolate(lf, [0, 8], [1.22, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const s = 3.4; // head ≈ 520px wide (≥400px)
  return (
    <AbsoluteFill
      style={{background: 'linear-gradient(180deg, #1B2068 0%, #2A2A72 60%, #141B6B 100%)'}}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${punch})`,
          transformOrigin: '540px 850px',
        }}
      >
        {Array.from({length: 10}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: hash(i * 3 + 41) * 1080,
              top: 1200 + hash(i * 7 + 42) * 500,
              width: 40 + hash(i * 11 + 43) * 70,
              height: 40 + hash(i * 11 + 43) * 70,
              borderRadius: '50%',
              background: 'rgba(255,180,120,0.16)',
            }}
          />
        ))}
        {/* dismissive adult hand lingering at left edge (no face) */}
        <div
          style={{
            position: 'absolute',
            left: -50,
            top: 700,
            width: 260,
            height: 120,
            background: C.skinShadow,
            border: `5px solid ${C.ink}`,
            borderRadius: 60,
            transform: 'rotate(-14deg)',
          }}
        />
        {/* giant gượng face, eyes down, short hair (bareheaded, never bald) */}
        <div
          style={{
            position: 'absolute',
            left: 540 - 150 * s,
            top: 330,
            width: 300 * s,
            filter: 'drop-shadow(0 18px 26px rgba(6,8,30,0.45))',
          }}
        >
          <div
            style={{
              width: 300 * s,
              height: 48 * s,
              background: C.ink,
              borderTopLeftRadius: 150 * s,
              borderTopRightRadius: 150 * s,
              marginBottom: `${-30 * s}px`,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  bottom: -16 * s,
                  left: (36 + i * 62) * s,
                  width: 0,
                  height: 0,
                  borderLeft: `${18 * s}px solid transparent`,
                  borderRight: `${18 * s}px solid transparent`,
                  borderTop: `${26 * s}px solid ${C.ink}`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: 300 * s,
              height: 300 * s,
              background: C.skin,
              border: `8px solid ${C.ink}`,
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <PaperGrain opacity={0.15} />
            <div
              style={{
                position: 'absolute',
                left: 62 * s,
                top: 78 * s,
                width: 60 * s,
                height: 12 * s,
                background: C.ink,
                borderRadius: 8 * s,
                transform: 'rotate(10deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 62 * s,
                top: 78 * s,
                width: 60 * s,
                height: 12 * s,
                background: C.ink,
                borderRadius: 8 * s,
                transform: 'rotate(-10deg)',
              }}
            />
            {/* eyes down (mắt cụp) */}
            <div
              style={{
                position: 'absolute',
                left: 70 * s,
                top: 130 * s,
                display: 'flex',
                gap: 56 * s,
              }}
            >
              {[0, 1].map((i) => (
                <div
                  key={i}
                  style={{width: 30 * s, height: 14 * s, borderRadius: 8 * s, background: C.ink}}
                />
              ))}
            </div>
            {/* gượng: flat wry mouth, tilted */}
            <div
              style={{
                position: 'absolute',
                left: 118 * s,
                top: 208 * s,
                width: 70 * s,
                height: 13 * s,
                borderRadius: 7 * s,
                background: C.ink,
                transform: 'rotate(-7deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 40 * s,
                top: 175 * s,
                width: 44 * s,
                height: 22 * s,
                borderRadius: '50%',
                background: 'rgba(255,110,130,0.4)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 40 * s,
                top: 175 * s,
                width: 44 * s,
                height: 22 * s,
                borderRadius: '50%',
                background: 'rgba(255,110,130,0.4)',
              }}
            />
          </div>
          <div
            style={{
              width: 340 * s,
              height: 120 * s,
              background: C.shirt,
              border: `8px solid ${C.ink}`,
              borderRadius: 60 * s,
              margin: `${-30 * s}px 0 0 ${-20 * s}px`,
            }}
          />
        </div>
      </div>
      <Caption segs={[{text: '"Nó á? '}, {text: 'Còn lâu."', accent: C.sen}]} />
      <PaperGrain opacity={0.14} />
      <Vignette />
    </AbsoluteFill>
  );
};
