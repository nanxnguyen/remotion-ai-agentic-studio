import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {E_SINE, ramp} from '../motion';
import {
  CAP,
  DBTFonts,
  DbtLine,
  Finish,
  GridPaper,
  INK,
  MinhHoa,
  PencilChar,
  SCREEN,
} from '../kit';

const FeedCard: React.FC<{top: number; kind: 'home' | 'car' | 'wedding'; enter: number}> = ({
  top,
  kind,
  enter,
}) => {
  const f = useCurrentFrame();
  const e = enter <= 0 ? 1 : ramp(f, enter, 16, E_SINE);
  const accent = kind === 'home' ? '#B8CBD4' : kind === 'car' ? '#C9BFA9' : '#D8C2C5';
  return (
    <div
      style={{
        position: 'absolute',
        left: 22,
        top,
        width: 326,
        height: 154,
        borderRadius: 13,
        background: '#F0F3F0',
        opacity: e,
        transform: `translateY(${(1 - e) * 32}px)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 12,
          borderRadius: 9,
          background: accent,
          border: `2px solid ${INK}`,
        }}
      >
        {kind === 'home' && (
          <>
            <div
              style={{
                position: 'absolute',
                left: 56,
                top: 47,
                width: 120,
                height: 55,
                background: '#EDE7D5',
                border: `3px solid ${INK}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 42,
                top: 35,
                width: 150,
                height: 28,
                background: '#A77F67',
                transform: 'rotate(-4deg)',
                border: `3px solid ${INK}`,
              }}
            />
          </>
        )}
        {kind === 'car' && (
          <div
            style={{
              position: 'absolute',
              left: 42,
              top: 58,
              width: 205,
              height: 42,
              borderRadius: 16,
              background: '#5D6D75',
              border: `3px solid ${INK}`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 28,
                top: -23,
                width: 120,
                height: 30,
                background: '#B8CBD4',
                border: `3px solid ${INK}`,
                borderRadius: '24px 24px 4px 4px',
              }}
            />
          </div>
        )}
        {kind === 'wedding' && (
          <>
            <div
              style={{
                position: 'absolute',
                left: 92,
                top: 33,
                width: 45,
                height: 45,
                borderRadius: '50%',
                background: '#5A636B',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 184,
                top: 33,
                width: 45,
                height: 45,
                borderRadius: '50%',
                background: '#5A636B',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 76,
                top: 78,
                width: 82,
                height: 50,
                borderRadius: '42px 42px 8px 8px',
                background: '#F3F5F2',
                border: `3px solid ${INK}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 168,
                top: 78,
                width: 82,
                height: 50,
                borderRadius: '42px 42px 8px 8px',
                background: '#D8C2C5',
                border: `3px solid ${INK}`,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

/** s7a — an illustrative feed, with no names or numeric claims. */
export const Scene11: React.FC = () => {
  const f = useCurrentFrame();
  const glow = 0.25 + 0.12 * Math.sin(f / 18);
  const thumb = ramp(f, 18, 24, E_SINE);
  return (
    <AbsoluteFill style={{background: '#252D35', overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper dim={0.9} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 44%, rgba(220,234,242,${glow}) 0%, rgba(37,45,53,0) 38%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 410,
          top: 300,
          width: 260,
          height: 490,
          borderRadius: 32,
          background: '#202A31',
          border: `10px solid ${INK}`,
          boxShadow: '0 16px 34px rgba(0,0,0,.5)',
          overflow: 'hidden',
        }}
      >
        <div style={{height: 28, background: INK}} />
        <FeedCard top={22} kind="home" enter={0} />
        <FeedCard top={192} kind="car" enter={18} />
        <FeedCard top={362} kind="wedding" enter={36} />
      </div>
      <PencilChar x={150} y={1080} s={1.22} pose="sit" enter={0} />
      <div
        style={{
          position: 'absolute',
          left: 330,
          top: 1190,
          width: 72,
          height: 26,
          borderRadius: 16,
          background: INK,
          transform: `rotate(-35deg) translate(${thumb * 18}px, ${-thumb * 32}px)`,
          transformOrigin: 'right center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 70,
          right: 70,
          fontFamily: CAP,
          color: SCREEN,
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 600,
          opacity: 0.85,
        }}
      >
        NỬA ĐÊM
      </div>
      <MinhHoa top={132} />
      <div style={{position: 'absolute', left: 70, right: 70, top: 1450}}>
        <DbtLine
          text={f < 58 ? 'Nửa đêm, bạn lướt thấy' : 'bạn bè đã có nhà,\ncó xe, đã cưới.'}
          accent={f < 58 ? undefined : 'đã cưới.'}
          accentColor="#FFE24D"
          size={54}
        />
      </div>
      <Finish />
    </AbsoluteFill>
  );
};
