import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {
  DBTFonts,
  DbtLine,
  Finish,
  GridPaper,
  Handwrite,
  HILITE,
  INK,
  LampGlow,
  PAPER,
  PencilChar,
} from '../proto/kit';
import {E_SINE, mix, ramp} from '../proto/motion';
import {S8_CAPTION_BOUNDARIES} from '../timeline';

const CAPTIONS = [
  'Không phải bạn không tiết kiệm.',
  'Lương về chưa kịp giữ,',
  'đã có nơi đi mất.',
] as const;

export const Scene13 = () => {
  const frame = useCurrentFrame();
  const barIn = ramp(frame, 8, 22, E_SINE);
  const arrowIn = ramp(frame, 28, 20, E_SINE);
  const barWidth = mix(120, 700, barIn);
  const arrowSlide = mix(34, 0, arrowIn);
  const captionIndex = frame < S8_CAPTION_BOUNDARIES.firstEnd ? 0 : frame < S8_CAPTION_BOUNDARIES.secondEnd ? 1 : 2;
  const captionAccent =
    captionIndex === 1 ? 'chưa kịp giữ' : captionIndex === 2 ? 'đã có nơi đi mất' : undefined;
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper />
      <LampGlow opacity={0.22} x={120} y={80} />
      <div
        style={{
          position: 'absolute',
          left: 92,
          top: 260,
          width: 896,
          height: 1040,
          background: 'rgba(255,255,255,.42)',
          border: `3px solid ${INK}`,
          borderRadius: 8,
          boxShadow: '0 18px 34px rgba(62,69,75,.16)',
        }}
      >
        <Handwrite text="SAO KÊ" size={38} x={42} y={34} color={INK} />
        <div
          style={{
            position: 'absolute',
            left: 68,
            top: 220,
            width: 760,
            height: 34,
            background: 'rgba(62,69,75,.14)',
            borderRadius: 18,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 68,
            top: 220,
            width: barWidth,
            height: 34,
            background: HILITE,
            borderRadius: 18,
            boxShadow: '0 3px 0 rgba(184,168,0,.28)',
          }}
        />
        <Handwrite text="LƯƠNG VỀ" size={40} x={70} y={150} color={INK} />
        <Handwrite
          text="chưa kịp giữ"
          size={36}
          x={72}
          y={290}
          color={INK}
          style={{opacity: barIn}}
        />
        {['tiền nhà', 'ăn uống', 'trả góp', 'gửi về nhà'].map((label, index) => {
          const y = 430 + index * 122;
          return (
            <div
              key={label}
              style={{
                position: 'absolute',
                left: 78,
                top: y,
                width: 700,
                height: 80,
                opacity: arrowIn,
                transform: `translateX(${arrowSlide}px)`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 37,
                  width: 520,
                  height: 7,
                  background: INK,
                  opacity: 0.72,
                  transform: `rotate(${index % 2 === 0 ? -4 : 4}deg)`,
                  transformOrigin: 'left center',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 505,
                  top: 20,
                  width: 34,
                  height: 34,
                  borderTop: '7px solid #3E454B',
                  borderRight: '7px solid #3E454B',
                  transform: 'rotate(45deg)',
                }}
              />
              <Handwrite text={label} size={34} x={570} y={14} color={INK} />
            </div>
          );
        })}
      </div>
      <PencilChar x={120} y={1240} s={0.9} pose="sit" enter={8} />
      <DbtLine text={CAPTIONS[captionIndex]} accent={captionAccent} enter={0} />
      <Finish />
    </AbsoluteFill>
  );
};
