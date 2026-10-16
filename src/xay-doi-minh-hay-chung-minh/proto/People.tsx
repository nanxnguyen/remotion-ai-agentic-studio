// Original paper-cut puppet for this video (no demo exists for the character;
// motion grammar comes from cards, art is brief-locked):
// round head, ink outline #0A0F3D 5px, shirt #E9EEFF, pants #1A2060,
// helmet #FFA3D1 (pale pink — same family as proof-side but off the wall #FF2E9A).
import React from 'react';
import {C} from './tokens';

export type Face = 'calm' | 'awkward' | 'down' | 'hope' | 'parted';

const INK_OUT = `4px solid ${C.ink}`;

export const Person: React.FC<{
  x: number;
  y: number; // feet position
  h?: number;
  hat?: boolean;
  face?: Face;
  flip?: boolean;
  opacity?: number;
}> = ({x, y, h = 300, hat = true, face = 'calm', flip = false, opacity = 1}) => {
  const s = h / 300;
  const mouth: Record<Face, React.ReactNode> = {
    calm: <div style={{width: 26 * s, height: 8 * s, borderRadius: 5 * s, background: C.ink}} />,
    awkward: (
      <div
        style={{
          width: 30 * s,
          height: 6 * s,
          borderRadius: 4 * s,
          background: C.ink,
          transform: 'rotate(-7deg)',
        }}
      />
    ),
    down: (
      <div
        style={{
          width: 22 * s,
          height: 6 * s,
          borderRadius: 4 * s,
          background: C.ink,
          transform: 'rotate(8deg)',
        }}
      />
    ),
    hope: (
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
    ),
    parted: (
      <div
        style={{
          width: 17 * s,
          height: 22 * s,
          borderRadius: '50%',
          background: '#5A2233',
          border: `${3 * s}px solid ${C.ink}`,
        }}
      />
    ),
  };
  const eyeY = face === 'down' ? 8 * s : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y - h,
        width: 150 * s,
        height: h,
        opacity,
        transform: flip ? 'scaleX(-1)' : undefined,
        filter: 'drop-shadow(0 10px 14px rgba(6,8,30,0.35))',
      }}
    >
      {/* legs: thigh + knee joint disc + shin (articulated, brief: khớp xoay) */}
      <div style={{position: 'absolute', bottom: 0, left: 38 * s, display: 'flex', gap: 10 * s}}>
        {[0, 1].map((i) => (
          <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: 30 * s, height: 44 * s, background: C.pants, border: INK_OUT, borderRadius: 10 * s}} />
            <div
              style={{
                width: 20 * s,
                height: 20 * s,
                borderRadius: '50%',
                background: C.pants,
                border: INK_OUT,
                margin: `${-4 * s}px 0`,
                zIndex: 1,
              }}
            />
            <div style={{width: 30 * s, height: 44 * s, background: C.pants, border: INK_OUT, borderRadius: 10 * s}} />
          </div>
        ))}
      </div>
      {/* torso */}
      <div
        style={{
          position: 'absolute',
          bottom: 88 * s,
          left: 28 * s,
          width: 94 * s,
          height: 110 * s,
          background: C.shirt,
          border: INK_OUT,
          borderRadius: 22 * s,
        }}
      />
      {/* arms: upper + elbow joint disc + forearm */}
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
        <div style={{width: 26 * s, height: 44 * s, background: C.shirt, border: INK_OUT, borderRadius: 12 * s}} />
        <div style={{width: 18 * s, height: 18 * s, borderRadius: '50%', background: C.shirt, border: INK_OUT, margin: `${-4 * s}px 0`, zIndex: 1}} />
        <div style={{width: 26 * s, height: 42 * s, background: C.shirt, border: INK_OUT, borderRadius: 12 * s}} />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 96 * s,
          right: 8 * s,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: 'rotate(-14deg)',
        }}
      >
        <div style={{width: 26 * s, height: 44 * s, background: C.shirt, border: INK_OUT, borderRadius: 12 * s}} />
        <div style={{width: 18 * s, height: 18 * s, borderRadius: '50%', background: C.shirt, border: INK_OUT, margin: `${-4 * s}px 0`, zIndex: 1}} />
        <div style={{width: 26 * s, height: 42 * s, background: C.shirt, border: INK_OUT, borderRadius: 12 * s}} />
      </div>
      {/* head */}
      <div
        style={{
          position: 'absolute',
          bottom: 190 * s,
          left: 33 * s,
          width: 84 * s,
          height: 84 * s,
          background: '#F6CFA8',
          border: INK_OUT,
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6 * s,
        }}
      >
        <div style={{display: 'flex', gap: 14 * s, marginTop: eyeY}}>
          {[0, 1].map((i) => (
            <div key={i} style={{width: 9 * s, height: face === 'down' ? 5 * s : 12 * s, borderRadius: 5 * s, background: C.ink}} />
          ))}
        </div>
        {mouth[face]}
      </div>
      {/* helmet, or short hair when bareheaded (never bald) */}
      {hat ? (
        <div
          style={{
            position: 'absolute',
            bottom: 252 * s,
            left: 26 * s,
            width: 98 * s,
            height: 52 * s,
            background: C.hat,
            border: INK_OUT,
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
              border: INK_OUT,
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

// Loose brick prop (paper-cut): sen body, light top edge, ink outline.
export const Brick: React.FC<{x: number; y: number; w?: number; h?: number; label?: string}> = ({
  x,
  y,
  w = 200,
  h = 96,
  label,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      background: `linear-gradient(180deg, ${C.senLight} 0%, ${C.sen} 45%, ${C.senDark} 100%)`,
      border: `5px solid ${C.ink}`,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: 'drop-shadow(0 8px 10px rgba(6,8,30,0.4))',
    }}
  >
    {label && (
      <span style={{fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: 30, color: C.lampWhite}}>
        {label}
      </span>
    )}
  </div>
);
