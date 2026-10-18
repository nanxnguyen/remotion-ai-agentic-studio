import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {
  DBTFonts,
  DbtLine,
  Finish,
  GridPaper,
  Handwrite,
  INK,
  LampGlow,
  PAPER,
  PencilChar,
} from '../proto/kit';
import {E_SINE, mix, ramp} from '../proto/motion';

export const Scene14 = () => {
  const frame = useCurrentFrame();
  const clear = ramp(frame, 8, 48, E_SINE);
  const retreat = mix(0, 180, clear);
  return (
    <AbsoluteFill style={{background: PAPER, overflow: 'hidden'}}>
      <DBTFonts />
      <GridPaper />
      <LampGlow opacity={0.18 * (1 - clear)} x={80} y={120} />
      <div
        style={{
          position: 'absolute',
          left: 95,
          top: 300,
          width: 890,
          height: 860,
          background: 'rgba(255,255,255,.48)',
          border: `3px solid ${INK}`,
          borderRadius: 8,
          opacity: 1 - clear * 0.82,
          transform: `translateX(${-retreat}px) rotate(${-clear * 2}deg)`,
        }}
      >
        <Handwrite text="chẳng ai hỏi" size={52} x={100} y={180} color={INK} />
        <div
          style={{
            position: 'absolute',
            left: 120,
            top: 330,
            width: 630,
            height: 10,
            background: '#D23B2E',
            transform: 'rotate(-5deg)',
            opacity: 0.8,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 520,
            width: 500,
            height: 10,
            background: INK,
            transform: 'rotate(3deg)',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 170,
            top: 650,
            width: 180,
            height: 90,
            border: `3px solid ${INK}`,
            borderRadius: '50%',
            opacity: 0.72,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 420,
          width: 920,
          height: 670,
          background: PAPER,
          border: `2px solid rgba(62,69,75,.28)`,
          opacity: clear,
          transform: `translateX(${mix(90, 0, clear)}px)`,
          boxShadow: '0 14px 28px rgba(62,69,75,.1)',
        }}
      />
      <PencilChar x={690} y={1110} s={0.84} pose="sit" enter={0} />
      <DbtLine
        text="Mà đã bao nhiêu năm rồi, chẳng ai hỏi bạn một câu."
        accent="chẳng ai hỏi"
        enter={0}
      />
      <Finish />
    </AbsoluteFill>
  );
};
