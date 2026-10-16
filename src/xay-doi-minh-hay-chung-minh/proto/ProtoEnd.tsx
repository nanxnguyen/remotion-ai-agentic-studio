// ProtoEnd — style frame 3: s11 dawn.
// Dawn sky #DDEBFF->#F2FBF6; dead sen board behind (sign dark) + jade chalk
// room drawn on the ground (door, sunrise window, chair); brick placed on the
// ground; character center, hat in hand; final headline held (press-in done).
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Grain, Vignette} from '../lib/Polish';
import {FONT_CSS} from './fonts';
import {PaperGrain} from './Paper';
import {Brick, Person} from './People';
import {C, F_HEAD} from './tokens';

export const ProtoEnd: React.FC = () => {
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.dawnTop} 0%, ${C.dawnBot} 70%, #D8EFDF 100%)`}}>
      <style>{FONT_CSS}</style>
      {/* dawn light washes from the sunrise window side */}
      <div
        style={{
          position: 'absolute',
          left: 480,
          top: 700,
          width: 600,
          height: 260,
          background: 'radial-gradient(ellipse 300px 130px at 70% 60%, rgba(255,214,150,0.35), rgba(255,214,150,0) 70%)',
        }}
      />
      {/* dead board behind-left, sign dark */}
      <div style={{position: 'absolute', left: 40, top: 700, width: 300, height: 700, background: C.boardBack, border: `5px solid ${C.ink}`, opacity: 0.9, transform: 'rotate(-4deg)'}} />
      <div
        style={{
          position: 'absolute',
          left: 62,
          top: 780,
          width: 256,
          padding: '14px 6px',
          background: '#2A0A2E',
          border: `5px solid ${C.ink}`,
          borderRadius: 16,
          textAlign: 'center',
          opacity: 0.55,
          transform: 'rotate(-4deg)',
        }}
      >
        <div style={{fontFamily: F_HEAD, fontWeight: 800, fontSize: 38, color: '#7A2A55'}}>THẤY CHƯA?</div>
      </div>
      {/* jade chalk room on ground */}
      <div style={{position: 'absolute', left: 420, top: 1050, width: 560, height: 420}}>
        <div style={{position: 'absolute', inset: 0, border: `7px solid ${C.jade}`, borderRadius: 14, opacity: 0.9}} />
        {/* door: right side, clear of person/brick/chair */}
        <div style={{position: 'absolute', left: 390, bottom: -7, width: 130, height: 240, border: `7px solid ${C.jade}`, borderBottom: 'none', borderRadius: '60px 60px 0 0'}} />
        {/* sunrise window: frame + cross + dawn sun (sun token) */}
        <div style={{position: 'absolute', right: 60, top: 60, width: 150, height: 150, border: `7px solid ${C.jade}`, borderRadius: 12, overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: 30, top: 52, width: 76, height: 76, borderRadius: '50%', background: C.sun}} />
          <div style={{position: 'absolute', left: 68, top: 0, width: 7, height: 150, background: C.jade}} />
          <div style={{position: 'absolute', left: 0, top: 68, width: 150, height: 7, background: C.jade}} />
        </div>
        {/* chair: backrest + seat + legs, one readable silhouette (D09) */}
        <div style={{position: 'absolute', left: 220, bottom: 30, width: 110, height: 190}}>
          <div style={{position: 'absolute', left: 0, top: 0, width: 26, height: 120, background: 'transparent', border: `7px solid ${C.jade}`, borderRadius: 10}} />
          <div style={{position: 'absolute', left: 0, top: 112, width: 110, height: 30, background: 'transparent', border: `7px solid ${C.jade}`, borderRadius: 10}} />
          <div style={{position: 'absolute', left: 8, top: 136, width: 7, height: 54, background: C.jade}} />
          <div style={{position: 'absolute', left: 95, top: 136, width: 7, height: 54, background: C.jade}} />
        </div>
      </div>
      {/* the placed brick on the ground */}
      <Brick x={470} y={1330} w={220} h={100} />
      {/* character beside the brick, hat HELD in right hand at side (D08) */}
      <Person x={400} y={1450} h={330} hat={false} face="hope" />
      <div style={{position: 'absolute', left: 498, top: 1240, width: 100, height: 54, background: C.hat, border: `4px solid ${C.ink}`, borderRadius: '50px 50px 10px 10px', transform: 'rotate(12deg)'}} />
      {/* final headline */}
      <div style={{position: 'absolute', top: 150, width: 1080, textAlign: 'center'}}>
        <div style={{fontFamily: F_HEAD, fontWeight: 800, fontSize: 88, lineHeight: 1.18, color: C.ink}}>
          <div>Viên gạch</div>
          <div>tiếp theo,</div>
          <div>
            bạn đặt <span style={{color: C.jade}}>cho ai?</span>
          </div>
        </div>
      </div>
      <Vignette strength={0.12} color="#3A4A6B" inner={0.6} />
      <PaperGrain opacity={0.12} />
      <Grain opacity={0.05} blend="overlay" />
    </AbsoluteFill>
  );
};
