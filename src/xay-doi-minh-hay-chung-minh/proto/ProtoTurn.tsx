// ProtoTurn — style frame 2: s7a split at the board edge.
// Left: lit sen front + blazing sign + spotlight. Right: dark raw back
// (#7A7FA6 + tape + wood brace). Character stands ON the edge, half lit.
// Caption bottom:224, "cho người khác nhìn" in sen.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Grain, Vignette} from '../lib/Polish';
import {Caption} from './Caption';
import {FONT_CSS} from './fonts';
import {PaperGrain} from './Paper';
import {Person} from './People';
import {SignBoard, Wall} from './Wall';
import {C, hash} from './tokens';

export const ProtoTurn: React.FC = () => {
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.cobaltTop} 0%, ${C.cobaltBot} 100%)`}}>
      <style>{FONT_CSS}</style>
      {/* LEFT: lit front */}
      <div style={{position: 'absolute', left: 0, top: 0, width: 540, height: 1920, overflow: 'hidden'}}>
        {Array.from({length: 14}).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: hash(i * 3 + 21) * 540,
              top: hash(i * 7 + 22) * 380,
              width: 3 + hash(i * 11 + 5) * 4,
              height: 3 + hash(i * 11 + 5) * 4,
              borderRadius: '50%',
              background: 'rgba(243,246,255,0.5)',
              opacity: 0.25 + hash(i * 13 + 1) * 0.4,
            }}
          />
        ))}
        <Wall x={-40} y={420} cols={3} rows={12} seed={5} />
        <SignBoard x={20} y={560} w={500} fs={62} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 420px 700px at 60% 45%, rgba(243,246,255,0.28), rgba(243,246,255,0) 70%)',
          }}
        />
      </div>
      {/* RIGHT: dark raw back */}
      <div style={{position: 'absolute', left: 540, top: 0, width: 540, height: 1920, background: '#23264D', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 60, top: 420, width: 60, height: 1150, background: C.boardBack, border: `5px solid ${C.ink}`}} />
        {/* tape crosses */}
        {[560, 800, 1040, 1280].map((t) => (
          <div
            key={t}
            style={{
              position: 'absolute',
              left: 20,
              top: t,
              width: 150,
              height: 44,
              background: C.tape,
              opacity: 0.85,
              transform: 'rotate(-18deg)',
              border: `3px solid ${C.ink}`,
            }}
          />
        ))}
        {/* wood brace (wood token) */}
        <div style={{position: 'absolute', left: 200, top: 500, width: 46, height: 1000, background: C.wood, border: `4px solid ${C.ink}`, transform: 'rotate(9deg)'}} />
        {/* s7a has NO chalk (D05): the room blink belongs to s7b only — see board tile s7b */}
      </div>
      {/* edge line */}
      <div style={{position: 'absolute', left: 536, top: 0, width: 8, height: 1920, background: C.ink}} />
      {/* character on the edge, half in light */}
      <Person x={440} y={1500} h={340} hat face="down" />
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: 1100,
          width: 540,
          height: 500,
          background: 'linear-gradient(90deg, rgba(243,246,255,0.20), rgba(10,15,61,0.55))',
        }}
      />
      <Caption
        segs={[{text: 'Mười năm, bạn xây một bức tường '}, {text: 'cho người khác nhìn.', accent: C.sen}]}
      />
      <PaperGrain opacity={0.14} />
      <Vignette strength={0.3} color="#06081E" inner={0.55} />
      <Grain opacity={0.07} blend="soft-light" />
    </AbsoluteFill>
  );
};
