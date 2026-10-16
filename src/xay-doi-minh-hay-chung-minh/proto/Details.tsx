// Detail stills for D-gate evidence (full 1080×1920, same tokens/art as scenes).
// S2bFace (D01) · S5bInterior + chip variant (D02/D07) · S5bFaceReturn (D02) · S9aBrick (D04).
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Grain, Vignette} from '../lib/Polish';
import {Caption} from './Caption';
import {FONT_CSS} from './fonts';
import {Deckle, PaperGrain} from './Paper';
import {SignBoard} from './Wall';
import {C, F_BODY, F_HEAD, hash} from './tokens';

// Source chip (D07): Archivo 32px (Q11 floor), ink pill, top corner.
export const ChipSource: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 120,
      right: 48,
      maxWidth: 600,
      background: 'rgba(10,15,61,0.88)',
      border: `3px solid ${C.labelGrey}`,
      borderRadius: 18,
      padding: '18px 26px',
      fontFamily: F_BODY,
      fontWeight: 600,
      fontSize: 32,
      lineHeight: 1.4,
      color: C.lampWhite,
      textAlign: 'left',
    }}
  >
    Hiệu ứng spotlight
    <br />
    (Gilovich & cs., 2000):
    <br />
    ta hay nghĩ người khác
    <br />
    để ý mình hơn thực tế
  </div>
);

const Frame: React.FC<{bg: string; children: React.ReactNode}> = ({bg, children}) => (
  <AbsoluteFill style={{background: bg}}>
    <style>{FONT_CSS}</style>
    {children}
    <PaperGrain opacity={0.14} />
    <Vignette strength={0.3} color="#06081E" inner={0.55} />
    <Grain opacity={0.06} blend="soft-light" />
  </AbsoluteFill>
);

// D01: s2b crash-zoom endpoint — gượng face ≥400px, eyes down, dismissive hand at edge.
export const S2bFace: React.FC = () => {
  const s = 3.4; // head ~285*s ≈ 520px wide
  return (
    <Frame bg="linear-gradient(180deg, #1B2068 0%, #2A2A72 60%, #141B6B 100%)">
      {/* feast bokeh behind */}
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
      {/* adult dismissive hand entering left (no face, per script) */}
      <div
        style={{
          position: 'absolute',
          left: -40,
          top: 700,
          width: 260,
          height: 120,
          background: '#E8B98A',
          border: `5px solid ${C.ink}`,
          borderRadius: 60,
          transform: 'rotate(-14deg)',
        }}
      />
      {/* giant awkward face (+ short hair: 18, bareheaded, never bald) */}
      <div style={{position: 'absolute', left: 540 - 150 * s, top: 330, width: 300 * s, filter: 'drop-shadow(0 18px 26px rgba(6,8,30,0.45))'}}>
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
            background: '#F6CFA8',
            border: `8px solid ${C.ink}`,
            borderRadius: '50%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <PaperGrain opacity={0.15} />
          {/* brows, raised uneasy */}
          <div style={{position: 'absolute', left: 62 * s, top: 78 * s, width: 60 * s, height: 12 * s, background: C.ink, borderRadius: 8 * s, transform: 'rotate(10deg)'}} />
          <div style={{position: 'absolute', right: 62 * s, top: 78 * s, width: 60 * s, height: 12 * s, background: C.ink, borderRadius: 8 * s, transform: 'rotate(-10deg)'}} />
          {/* eyes down (mắt cụp) */}
          <div style={{position: 'absolute', left: 70 * s, top: 130 * s, display: 'flex', gap: 56 * s}}>
            {[0, 1].map((i) => (
              <div key={i} style={{width: 30 * s, height: 14 * s, borderRadius: 8 * s, background: C.ink}} />
            ))}
          </div>
          {/* gượng: flat wry mouth, tilted */}
          <div style={{position: 'absolute', left: 118 * s, top: 208 * s, width: 70 * s, height: 13 * s, borderRadius: 7 * s, background: C.ink, transform: 'rotate(-7deg)'}} />
          {/* blush */}
          <div style={{position: 'absolute', left: 40 * s, top: 175 * s, width: 44 * s, height: 22 * s, borderRadius: '50%', background: 'rgba(255,110,130,0.4)'}} />
          <div style={{position: 'absolute', right: 40 * s, top: 175 * s, width: 44 * s, height: 22 * s, borderRadius: '50%', background: 'rgba(255,110,130,0.4)'}} />
        </div>
        {/* shoulders hint */}
        <div style={{width: 340 * s, height: 120 * s, background: C.shirt, border: `8px solid ${C.ink}`, borderRadius: 60 * s, margin: `${-30 * s}px 0 0 ${-20 * s}px`}} />
      </div>
      <Caption segs={[{text: 'Có người bật cười: '}, {text: '"Nó á? Còn lâu."', accent: C.sen}]} />
    </Frame>
  );
};

// D02: s5b ice-window interior — back silhouette at sink + steam + TV flicker.
export const S5bInterior: React.FC<{chip?: boolean}> = ({chip = false}) => (
  <Frame bg="linear-gradient(180deg, #0B0E33 0%, #141B6B 100%)">
    {/* window frame (ice rim: room light spills on inner edge) */}
    <div
      style={{
        position: 'absolute',
        left: 140,
        top: 200,
        width: 800,
        height: 900,
        background: '#1A2060',
        border: `6px solid ${C.ink}`,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: 'inset 0 0 0 4px rgba(143,227,255,0.35), 0 0 60px rgba(143,227,255,0.12)',
      }}
    >
      {/* night outside */}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #0A0F3D 0%, #1E2A6B 100%)'}} />
      {/* window mullions: seen THROUGH panes (kept off the figure's head) */}
      <div style={{position: 'absolute', left: 470, top: 0, width: 18, height: 900, background: C.ink}} />
      <div style={{position: 'absolute', left: 0, top: 340, width: 800, height: 18, background: C.ink}} />
      <div style={{position: 'absolute', left: 488, top: 0, width: 4, height: 900, background: 'rgba(143,227,255,0.4)'}} />
      {/* TV flicker wash on wall (bigger) + set */}
      <div style={{position: 'absolute', left: 40, top: 60, width: 380, height: 270, background: 'rgba(143,227,255,0.30)', filter: 'blur(40px)'}} />
      <div style={{position: 'absolute', left: 60, top: 90, width: 320, height: 200, background: C.ice, opacity: 0.85, border: `5px solid ${C.ink}`, borderRadius: 12, overflow: 'hidden'}}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{position: 'absolute', left: 0, top: 24 + i * 46, width: 320, height: 9, background: 'rgba(10,15,61,0.35)'}} />
        ))}
      </div>
      {/* counter line across (basin + figure stand on it) */}
      <div style={{position: 'absolute', left: 0, top: 640, width: 800, height: 30, background: '#2A3170', borderTop: `5px solid ${C.ink}`, borderBottom: `5px solid ${C.ink}`}} />
      {/* basin on counter, left-center */}
      <div style={{position: 'absolute', left: 180, top: 520, width: 260, height: 120, background: '#232A66', border: `5px solid ${C.ink}`, borderRadius: '16px 16px 8px 8px'}} />
      {/* faucet + stream LEFT of figure, into basin */}
      <div style={{position: 'absolute', left: 130, top: 420, width: 26, height: 110, background: '#3A4188', border: `4px solid ${C.ink}`, borderRadius: 10}} />
      <div style={{position: 'absolute', left: 130, top: 400, width: 110, height: 22, background: '#3A4188', border: `4px solid ${C.ink}`, borderRadius: 10}} />
      <div style={{position: 'absolute', left: 196, top: 422, width: 10, height: 100, background: C.ice, opacity: 0.8, borderRadius: 5}} />
      <div style={{position: 'absolute', left: 214, top: 422, width: 6, height: 90, background: C.ice, opacity: 0.5, borderRadius: 3}} />
      {/* STANDING back-figure at counter (faceless, E03): head high, torso down to counter */}
      <div style={{position: 'absolute', left: 500, top: 180, width: 200, height: 460}}>
        <div style={{position: 'absolute', bottom: 0, left: 35, width: 130, height: 330, background: '#0A0F3D', border: `5px solid ${C.ink}`, borderRadius: 46}} />
        <div style={{position: 'absolute', bottom: 310, left: 55, width: 95, height: 95, background: '#0A0F3D', border: `5px solid ${C.ink}`, borderRadius: '50%'}} />
        {/* arms down to counter */}
        <div style={{position: 'absolute', bottom: 20, left: -5, width: 56, height: 220, background: '#0A0F3D', border: `5px solid ${C.ink}`, borderRadius: 24, transform: 'rotate(10deg)'}} />
        <div style={{position: 'absolute', bottom: 20, right: -5, width: 56, height: 220, background: '#0A0F3D', border: `5px solid ${C.ink}`, borderRadius: 24, transform: 'rotate(-10deg)'}} />
      </div>
      {/* steam curls above basin */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 220 + i * 70,
            top: 300 + (i % 2) * 50,
            width: 46,
            height: 180,
            borderRadius: 23,
            background: 'rgba(243,246,255,0.20)',
            filter: 'blur(10px)',
            transform: `rotate(${(i - 1) * 12}deg)`,
          }}
        />
      ))}
      {/* ice light spill */}
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 500px 400px at 50% 40%, rgba(143,227,255,0.20), rgba(143,227,255,0) 70%)'}} />
    </div>
    {chip && <ChipSource />}
    <Caption segs={[{text: 'Bên kia cửa sổ, người ta đang rửa bát, '}, {text: 'cười theo ti vi.'}]} />
  </Frame>
);

// D02b: return cut — face in cold spotlight, calm, lips slightly parted, helmet on.
export const S5bFaceReturn: React.FC = () => {
  const s = 2.5;
  return (
    <Frame bg="linear-gradient(180deg, #0B0E33 0%, #141B6B 100%)">
      {/* spotlight beam diagonal (cold, meaningful light) */}
      <div
        style={{
          position: 'absolute',
          left: -200,
          top: -100,
          width: 900,
          height: 1500,
          background: 'linear-gradient(105deg, rgba(243,246,255,0.55) 0%, rgba(243,246,255,0.16) 55%, rgba(243,246,255,0) 75%)',
          transform: 'rotate(12deg)',
        }}
      />
      {/* light pool behind head */}
      <div
        style={{
          position: 'absolute',
          left: 140,
          top: 240,
          width: 800,
          height: 900,
          background: 'radial-gradient(ellipse 400px 450px at 50% 45%, rgba(243,246,255,0.22), rgba(243,246,255,0) 70%)',
        }}
      />
      <div style={{position: 'absolute', left: 540 - 150 * s, top: 380, width: 300 * s, filter: 'drop-shadow(0 18px 26px rgba(6,8,30,0.5))'}}>
        {/* helmet (worn since s3) */}
        <div style={{width: 326 * s, height: 64 * s, background: C.hat, border: `8px solid ${C.ink}`, borderTopLeftRadius: 160 * s, borderTopRightRadius: 160 * s, borderBottomLeftRadius: 20 * s, borderBottomRightRadius: 20 * s, marginBottom: `${-36 * s}px`, marginLeft: `${-13 * s}px`, position: 'relative', zIndex: 1}}>
          <div style={{position: 'absolute', bottom: -14 * s, left: -28 * s, width: 382 * s, height: 32 * s, background: C.hat, border: `8px solid ${C.ink}`, borderRadius: 16 * s}} />
        </div>
        <div style={{width: 300 * s, height: 300 * s, background: '#F6CFA8', border: `8px solid ${C.ink}`, borderRadius: '50%', position: 'relative', overflow: 'hidden'}}>
          <PaperGrain opacity={0.15} />
          {/* calm eyes looking left (toward window), lids low */}
          <div style={{position: 'absolute', left: 74 * s, top: 136 * s, display: 'flex', gap: 64 * s}}>
            {[0, 1].map((i) => (
              <div key={i} style={{width: 36 * s, height: 26 * s, borderRadius: '50%', background: '#FFF', border: `${5 * s}px solid ${C.ink}`, position: 'relative'}}>
                <div style={{position: 'absolute', left: 2 * s, top: 2 * s, width: 16 * s, height: 16 * s, borderRadius: '50%', background: C.ink}} />
              </div>
            ))}
          </div>
          {/* môi khẽ mở: small, quiet */}
          <div style={{position: 'absolute', left: 141 * s, top: 216 * s, width: 24 * s, height: 30 * s, borderRadius: '50%', background: '#5A2233', border: `${5 * s}px solid ${C.ink}`}} />
          {/* cold rim on face */}
          <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle 300px at 30% 20%, rgba(243,246,255,0.30), rgba(243,246,255,0) 60%)'}} />
        </div>
        <div style={{width: 340 * s, height: 110 * s, background: C.shirt, border: `8px solid ${C.ink}`, borderRadius: 60 * s, margin: `${-30 * s}px 0 0 ${-20 * s}px`}} />
      </div>
      <Caption segs={[{text: 'Tối ấy, '}, {text: 'chẳng ai nhìn sang.', accent: C.lampWhite}]} />
    </Frame>
  );
};

// D04: s9a foreground — brick in hand readable at 480px + dark window + headline.
export const S9aBrick: React.FC = () => (
  <Frame bg="linear-gradient(180deg, #0B0E33 0%, #141B6B 70%, #1E2A6B 100%)">
    {/* towers + the clicked-off window (faint remnant glow) */}
    <div style={{position: 'absolute', left: 120, top: 470, width: 380, height: 480, background: '#10155A', border: `5px solid ${C.ink}`, borderRadius: 14}}>
      <div style={{position: 'absolute', left: 110, top: 130, width: 160, height: 190, background: '#1E2560', border: `5px solid ${C.ink}`, borderRadius: 10}}>
        <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle 60px at 50% 50%, rgba(143,227,255,0.25), rgba(143,227,255,0) 70%)'}} />
      </div>
    </div>
    <div style={{position: 'absolute', right: 80, top: 530, width: 300, height: 420, background: '#10155A', border: `5px solid ${C.ink}`, borderRadius: 14}} />
    {/* headline top */}
    <div style={{position: 'absolute', top: 110, width: 1080, textAlign: 'center', fontFamily: F_HEAD, fontWeight: 800, fontSize: 68, lineHeight: 1.22, color: C.lampWhite, textShadow: '0 3px 26px rgba(6,8,30,0.6)'}}>
      <div>Người từng xem thường bạn</div>
      <div>
        <span style={{color: C.ice}}>có thể đã quên.</span>
      </div>
    </div>
    {/* blazing sign above the dark towers (E07: sign rực rọi vào bóng tối) */}
    <SignBoard x={320} y={300} w={440} fs={56} lit={1} />
    {/* foreground hand + brick (≥560px wide brick) */}
    <div style={{position: 'absolute', left: 120, top: 1010, width: 840, height: 420}}>
      <Deckle w={600} h={260} seed={91} />
      <div
        style={{
          position: 'absolute',
          left: 40,
          top: 60,
          width: 600,
          height: 260,
          background: `linear-gradient(180deg, ${C.senLight} 0%, ${C.sen} 45%, ${C.senDark} 100%)`,
          border: `7px solid ${C.ink}`,
          borderRadius: 16,
          overflow: 'hidden',
          filter: 'drop-shadow(0 16px 22px rgba(6,8,30,0.5))',
        }}
      >
        {/* rim-light from the blazing sign (E07): cold top/left edge */}
        <div style={{position: 'absolute', left: 0, top: 0, width: '100%', height: 30, background: 'linear-gradient(180deg, rgba(255,92,179,0.55), rgba(255,92,179,0))'}} />
        <div style={{position: 'absolute', left: 0, top: 0, width: 16, height: '100%', background: 'linear-gradient(90deg, rgba(243,246,255,0.4), rgba(243,246,255,0))'}} />
        <PaperGrain opacity={0.22} />
      </div>
      {/* gripping hand from right + shirt cuff (fingers wrap the brick edge) */}
      <div style={{position: 'absolute', right: 60, top: 20, width: 260, height: 340, background: C.shirt, border: `7px solid ${C.ink}`, borderRadius: 60, transform: 'rotate(-8deg)'}} />
      <div style={{position: 'absolute', right: 190, top: 120, width: 150, height: 90, background: '#F6CFA8', border: `6px solid ${C.ink}`, borderRadius: 45, transform: 'rotate(-8deg)'}} />
      <div style={{position: 'absolute', right: 130, top: 190, width: 120, height: 60, background: '#F6CFA8', border: `6px solid ${C.ink}`, borderRadius: 30, transform: 'rotate(14deg)'}} />
    </div>
  </Frame>
);
