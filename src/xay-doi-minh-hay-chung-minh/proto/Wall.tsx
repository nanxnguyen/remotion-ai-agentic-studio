// Running-bond paper wall + bulb sign (original staging for this video).
// Sign bulbs chase f0-20 (cover beat), brick drop uses deck-deal settle grammar:
// bezier(0.3,0,0.25,1.15) overshoot (y1>1 — 命门) + press 0.996->1.
import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {bezier} from '../lib/Polish';
import {Deckle, PaperGrain} from './Paper';
import {C, F_HEAD, hash} from './tokens';

export const BRICK_W = 216;
export const BRICK_H = 96;

export const Wall: React.FC<{
  x: number;
  y: number;
  cols: number;
  rows: number;
  seed?: number;
}> = ({x, y, cols, rows, seed = 1}) => {
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
        <div key={`${r}-${cix}`} style={{position: 'absolute', left: cix * BRICK_W + off, top: r * BRICK_H}}>
          <Deckle w={BRICK_W - 8} h={BRICK_H - 8} seed={seed * 131 + r * 17 + cix * 7} />
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
            <PaperGrain opacity={0.22} />
          </div>
        </div>,
      );
    }
  }
  return (
    <div style={{position: 'absolute', left: x, top: y, width: cols * BRICK_W, height: rows * BRICK_H}}>
      {bricks}
      <PaperGrain opacity={0.1} />
    </div>
  );
};

// Bulb sign "THẤY CHƯA?" — bulbs chase f0-20, then steady warm.
export const SignBoard: React.FC<{x: number; y: number; w?: number; lit?: number; fs?: number}> = ({
  x,
  y,
  w = 640,
  lit = 1,
  fs = 84,
}) => {
  const frame = useCurrentFrame();
  const chase = frame < 20 ? (frame % 5) / 5 : 1;
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
        boxShadow: `0 0 ${Math.round(60 * lit)}px rgba(255,46,154,${0.55 * lit})`,
        opacity: 0.35 + 0.65 * lit,
      }}
    >
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '0 14px 12px'}}>
        {Array.from({length: bulbs}).map((_, i) => {
          const on = frame < 20 ? (i / bulbs < chase ? 1 : 0.25) : 1;
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
          textShadow: `0 0 18px rgba(255,46,154,0.9), 0 0 46px rgba(255,46,154,${0.5 * lit})`,
        }}
      >
        THẤY CHƯA?
      </div>
    </div>
  );
};

// Brick drop settle (deck-deal grammar): 8f fall + settle overshoot + press.
export const dropY = (frame: number, land: number, fromY: number, toY: number) => {
  const fall = interpolate(frame, [land - 8, land], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.3, 0, 0.2, 1),
  });
  const s01 = Math.min(1, Math.max(0, (frame - land) / 6));
  const e = bezier(0.3, 0, 0.25, 1.15)(s01); // y1>1 — landing must bounce, 命门
  const y = fromY + (toY - fromY) * fall + (e - s01) * 90; // proto-staging: ~30px dip so the bounce reads on pixels
  const squash = s01 < 1 && s01 > 0 ? Math.sin(s01 * Math.PI) * 0.12 : 0;
  return {y, squash};
};
