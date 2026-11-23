import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CunBongMascot, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Trong thí nghiệm có thật năm một nghìn chín trăm sáu mươi tư của Randy Gardner, sau mười một ngày thức trắng, cậu ấy đã ngủ bù liền mười bốn tiếng bốn mươi phút mới hồi phục.';

export const Scene12: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12}});

  return (
    <MascotStage theme="studio" zoom={1.05}>
      <div
        style={{
          position: 'absolute',
          top: 96,
          left: 88,
          width: 960,
          padding: '38px 44px',
          borderRadius: 28,
          background: 'rgba(15, 23, 42, 0.9)',
          border: '3px solid #38BDF8',
          transform: `scale(${0.92 + pop * 0.08})`,
        }}
      >
        <div style={{color: '#38BDF8', fontSize: 24, fontWeight: 900, marginBottom: 8}}>
          HỒ SƠ CÓ THẬT (1964)
        </div>
        <div style={{color: '#FFFFFF', fontSize: 48, fontWeight: 900, marginBottom: 14}}>
          RANDY GARDNER — 264 GIỜ
        </div>
        <div style={{color: '#FDE047', fontSize: 34, fontWeight: 800}}>
          Ngủ bù liên tục: 14 tiếng 40 phút
        </div>
      </div>

      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={1440}
          y={620}
          scale={1.26}
          mood="happy"
          pose="thumbsUp"
          flip
          narration={NARRATION}
          bandages={4}
        />
      </svg>
      <SubtitleBar text="Thí nghiệm Randy Gardner (1964): sau 11 ngày thức trắng, cậu ngủ bù 14 tiếng 40 phút mới hồi phục!" />
    </MascotStage>
  );
};
