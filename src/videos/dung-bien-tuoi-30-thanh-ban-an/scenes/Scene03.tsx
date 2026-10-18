import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {FitText} from '../../../core/fit-text';
import {E_SINE, ramp} from '../motion';
import {CAP, DBTFonts, Finish, GridPaper, Handwrite, PencilChar, Ruler} from '../kit';

const Caption: React.FC<{text: string; start: number; end?: number}> = ({
  text,
  start,
  end = Number.POSITIVE_INFINITY,
}) => {
  const frame = useCurrentFrame();
  const active = frame >= start && frame < end;
  const opacity = active ? ramp(frame, start, 12, E_SINE) : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: 64,
        right: 64,
        bottom: 224,
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${(1 - opacity) * 16}px)`,
      }}
    >
      <FitText
        text={text}
        maxWidth={900}
        maxLines={2}
        fontFamily={CAP}
        fontWeight={600}
        minFontSize={54}
        maxFontSize={62}
        style={{
          color: '#F3F5F2',
          background: 'rgba(62,69,75,.88)',
          borderRadius: 24,
          padding: '20px 28px',
        }}
      />
    </div>
  );
};

export const Scene03 = () => {
  const frame = useCurrentFrame();
  const walk = ramp(frame, 12, 72, E_SINE);
  const x = interpolate(walk, [0, 1], [120, 530]);
  return (
    <AbsoluteFill style={{background: '#F0F3F0', overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper />
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 230,
          fontFamily: CAP,
          fontSize: 34,
          color: '#7C858C',
          letterSpacing: 2,
        }}
      >
        CÁI THƯỚC KHẮC SẴN
      </div>
      <Ruler x={100} y={610} width={820} angle={-8} ticks={[18, 22, 25, 30]} />
      <Handwrite text="18 học xong" size={42} x={90} y={800} enter={8} />
      <Handwrite text="25 cưới" size={42} x={420} y={850} enter={20} />
      <Handwrite text="30 lên quản lý" size={42} x={600} y={430} enter={32} />
      <PencilChar x={x} y={1120} s={0.92} pose="hold" />
      <Caption text="Cái thước khắc sẵn:" start={0} end={28} />
      <Caption text="mười tám học xong," start={28} end={62} />
      <Caption text="hai mươi lăm cưới," start={62} end={96} />
      <Caption text="ba mươi lên quản lý." start={96} />
      <Finish />
    </AbsoluteFill>
  );
};
