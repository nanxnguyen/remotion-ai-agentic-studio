import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {DBTFonts, Finish, GridPaper, HILITE, Handwrite, LampGlow, PAPER} from '../kit';
import {E_SINE, mix, ramp} from '../motion';

const CLIMAX_TEXT = 'Dạo này, bạn sống có vui không?';

export const Scene15 = () => {
  const frame = useCurrentFrame();
  const write = ramp(frame, 14, 28, E_SINE);
  const glow = ramp(frame, 0, 36, E_SINE);
  const sit = ramp(frame, 8, 20, E_SINE);
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper />
      <LampGlow opacity={0.22 + 0.4 * glow} x={-80} y={180} />
      <div
        style={{
          position: 'absolute',
          left: -120,
          top: 440,
          width: 1320,
          height: 580,
          background: 'linear-gradient(110deg, rgba(246,231,196,.72), rgba(246,231,196,0))',
          transform: 'rotate(-7deg)',
          opacity: glow,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 74,
          right: 74,
          top: 420,
          textAlign: 'center',
          opacity: write,
          transform: `translateY(${(1 - write) * 18}px)`,
        }}
      >
        <Handwrite
          text="Dạo này, bạn"
          size={72}
          x={0}
          y={0}
          color="#3E454B"
          style={{position: 'relative', left: 'auto', top: 'auto', display: 'block'}}
        />
        <div style={{position: 'relative', display: 'inline-block', marginTop: 26}}>
          <div
            style={{
              position: 'absolute',
              left: -18,
              right: -18,
              top: 47,
              height: 28,
              background: HILITE,
              borderRadius: 14,
              opacity: 0.82,
              transform: `scaleX(${write})`,
              transformOrigin: 'left center',
            }}
          />
          <div
            style={{
              position: 'relative',
              fontFamily: "'Lora',Georgia,serif",
              fontStyle: 'italic',
              fontSize: 72,
              lineHeight: 1.2,
              color: '#3E454B',
            }}
          >
            sống có vui không?
          </div>
        </div>
      </div>
      {/* hug-knees pose: shoulders fold inward around both knees. */}
      <div
        style={{
          position: 'absolute',
          left: 390,
          top: 1150 + mix(18, 0, sit),
          width: 310,
          height: 350,
          opacity: sit,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 105,
            top: 0,
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: '#3E454B',
            boxShadow: '0 8px 20px rgba(62,69,75,.22)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 95,
            top: 88,
            width: 120,
            height: 155,
            borderRadius: '44% 44% 24% 24%',
            background: '#4A5258',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 190,
            width: 210,
            height: 120,
            borderRadius: '60% 50% 44% 42%',
            background: '#3E454B',
            transform: 'rotate(-8deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 168,
            top: 190,
            width: 120,
            height: 110,
            borderRadius: '50%',
            background: '#3E454B',
            transform: 'rotate(18deg)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 94,
            top: 175,
            width: 170,
            height: 20,
            borderRadius: 12,
            background: '#D8D2BF',
            transform: 'rotate(16deg)',
            transformOrigin: 'left center',
          }}
        />
      </div>
      <div
        aria-label={CLIMAX_TEXT}
        style={{position: 'absolute', left: 40, right: 40, bottom: 224, height: 34}}
      />
      <Finish />
    </AbsoluteFill>
  );
};
