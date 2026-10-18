import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FitText} from '../../../core/fit-text';
import {E_SINE, mix, ramp} from '../motion';
import {CAP, DBTFonts, Finish, GridPaper, Handwrite, INK, PencilChar, Ruler} from '../kit';

const Sheet: React.FC<{
  x: number;
  y: number;
  rotate: number;
  opacity: number;
  children: React.ReactNode;
}> = ({x, y, rotate, opacity, children}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 700,
      height: 540,
      background: 'rgba(240,243,240,.93)',
      border: '2px solid rgba(62,69,75,.42)',
      boxShadow: '0 18px 28px rgba(62,69,75,.16)',
      transform: `rotate(${rotate}deg)`,
      opacity,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0 58px, rgba(175,214,211,.55) 58px 60px), repeating-linear-gradient(90deg, transparent 0 58px, rgba(175,214,211,.55) 58px 60px)',
      }}
    />
    {children}
  </div>
);

const Caption: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: 64,
      right: 64,
      bottom: 224,
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <FitText
      text="Và danh sách ấy, vẫn cứ dài thêm."
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

export const Scene04 = () => {
  const frame = useCurrentFrame();
  const paperE = ramp(frame, 0, 22, E_SINE);
  const slide = mix(0, -88, ramp(frame, 28, 35, E_SINE));
  return (
    <AbsoluteFill style={{background: '#F0F3F0', overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper />
      <Sheet x={280 + slide} y={280} rotate={-7} opacity={paperE}>
        <Handwrite text="18 học xong" size={42} x={80} y={100} enter={0} />
        <Handwrite text="22 đi làm" size={42} x={90} y={185} enter={8} />
        <Handwrite text="25 cưới" size={42} x={96} y={270} enter={16} />
        <Handwrite text="30 lên quản lý" size={42} x={110} y={355} enter={24} />
      </Sheet>
      <Sheet x={85 + slide} y={650} rotate={5} opacity={ramp(frame, 14, 28, E_SINE)}>
        <Handwrite text="mua nhà" size={44} x={78} y={96} enter={35} />
        <Handwrite text="có xe" size={44} x={92} y={190} enter={45} />
        <Handwrite text="ổn định" size={44} x={105} y={282} enter={55} />
        <Handwrite text="..." size={66} x={120} y={378} enter={65} />
      </Sheet>
      <Ruler x={-160 + slide} y={1110} width={620} angle={-12} ticks={[18, 22, 25, 30]} />
      <PencilChar x={720} y={1230} s={0.9} pose="stand" />
      <div
        style={{
          position: 'absolute',
          left: 660,
          top: 1110,
          fontFamily: CAP,
          fontSize: 34,
          color: INK,
          transform: 'rotate(-7deg)',
        }}
      >
        còn nữa...
      </div>
      <Caption />
      <Finish />
    </AbsoluteFill>
  );
};
