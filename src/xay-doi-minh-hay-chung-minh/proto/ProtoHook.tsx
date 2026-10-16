// ProtoHook — s1 HOOK/COVER (114f = 3.81s @30fps).
// Cover = frame 0: headline FULL from f0 (no type-in), subject + sign visible.
// Motion (one staged beat): bulb chase f0-20 + cold sweep f0-30 (linear, 命门)
// + brick "cộp" lands f18 with overshoot + dust + push-in 1.00->1.04 to window.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {EASE, Grain, ramp, Vignette} from '../lib/Polish';
import {FONT_CSS} from './fonts';
import {PaperGrain} from './Paper';
import {Brick, Person} from './People';
import {Wall, SignBoard, dropY} from './Wall';
import {WallSweep} from './Sweep';
import {C, F_BODY, F_HEAD, hash} from './tokens';

export const HOOK_DUR = 114;

const HL: {t: string; c?: string}[] = [
  {t: 'Bạn đang'},
  {t: 'xây', c: C.jade},
  {t: 'cuộc đời mình,'},
  {t: 'hay cố'},
  {t: 'chứng minh', c: C.sen},
  {t: 'ai đó đã sai?'},
];
// line breaks: L1 "Bạn đang xây" / L2 "cuộc đời mình," / L3 "hay cố chứng minh" / L4 "ai đó đã sai?"

export const ProtoHook: React.FC = () => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, HOOK_DUR], [1, 1.04]);
  const {y: brickY, squash} = dropY(frame, 18, 596, 806);
  const dust = Math.min(1, Math.max(0, (frame - 18) / 14));
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.cobaltTop} 0%, ${C.cobaltBot} 100%)`}}>
      <style>{FONT_CSS}</style>
      <div
        style={{
          position: 'absolute',
          inset: -60,
          transform: `scale(${push})`,
          transformOrigin: '720px 690px',
        }}
      >
        {/* stars / paper flecks (seeded, static) */}
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
        {/* HEADLINE 6-28%: static, full at f0 */}
        <div style={{position: 'absolute', top: 118, width: 1080, textAlign: 'center'}}>
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
        {/* right building + ice window 32-40% (clean frame: mullion cross, soft glow) */}
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
                  boxShadow: lit ? `0 0 26px 6px rgba(143,227,255,0.75)` : 'none',
                  overflow: 'hidden',
                }}
              >
                {lit && (
                  <>
                    <div style={{position: 'absolute', left: 34, top: 0, width: 6, height: 80, background: '#10155A'}} />
                    <div style={{position: 'absolute', left: 0, top: 34, width: 80, height: 6, background: '#10155A'}} />
                  </>
                )}
              </div>
            );
          })}
        </div>
        {/* wall 42-88% */}
        <Wall x={60} y={830} cols={4} rows={9} seed={3} />
        {/* ladder (wood token) */}
        <div style={{position: 'absolute', left: 180, top: 560, width: 130, height: 300}}>
          {[0, 1].map((s) => (
            <div key={s} style={{position: 'absolute', left: s * 104, top: 0, width: 22, height: 300, background: C.wood, border: `4px solid ${C.ink}`, borderRadius: 8}} />
          ))}
          {[40, 130, 220].map((t) => (
            <div key={t} style={{position: 'absolute', left: 0, top: t, width: 126, height: 18, background: C.wood, border: `4px solid ${C.ink}`, borderRadius: 6}} />
          ))}
        </div>
        {/* person on ladder top, arm raised with brick until f18 */}
        <Person x={150} y={830} h={300} hat face="hope" />
        {/* falling brick -> lands on wall top (starts in raised hand) */}
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
        {/* paper dust at landing */}
        {frame >= 18 &&
          Array.from({length: 7}).map((_, i) => {
            const a = (i / 7) * Math.PI * 2;
            const r = dust * (40 + hash(i * 5 + 9) * 60);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 430 + Math.cos(a) * r,
                  top: 830 + Math.sin(a) * r * 0.5,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: C.senLight,
                  opacity: 0.8 * (1 - dust),
                }}
              />
            );
          })}
        {/* sign 58-70% */}
        <SignBoard x={220} y={1130} w={640} />
        {/* cold sweep across UPPER wall only f0-30 (D11: sign y-range excluded) */}
        {frame <= 32 && <WallSweep from={-300} to={1400} y={1000} height={140} />}
        {/* alley ground: soft fade, no hard slab edge */}
        <div style={{position: 'absolute', left: 0, top: 1690, width: 1080, height: 230, background: 'linear-gradient(180deg, rgba(6,8,30,0) 0%, rgba(6,8,30,0.4) 60%)'}} />
      </div>
      <PaperGrain opacity={0.14} />
      <Vignette strength={0.32} color="#06081E" inner={0.55} />
      <Grain opacity={0.07} blend="soft-light" />
      {/* hidden caption-zone guard note (not rendered): s1 has no bottom caption */}
    </AbsoluteFill>
  );
};
