import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CunBongMascot, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Nghe đồn kỷ lục thế giới từng có người thức suốt mười một ngày không chợp mắt. Vậy chuyện gì thật sự xảy ra bên trong cơ thể bạn qua từng mốc giờ?';

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: Math.max(0, frame - 10), fps, config: {damping: 12}});

  return (
    <MascotStage theme="studio" zoom={1.05}>
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 110,
          width: 780,
          padding: '38px 42px',
          borderRadius: 28,
          background: 'rgba(15, 23, 42, 0.88)',
          border: '3px solid #38BDF8',
          transform: `scale(${0.92 + pop * 0.08})`,
        }}
      >
        <div
          style={{
            color: '#38BDF8',
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 1.5,
            marginBottom: 10,
          }}
        >
          THỬ THÁCH SINH HỌC
        </div>
        <div style={{color: '#FFFFFF', fontSize: 52, fontWeight: 900, lineHeight: 1.2}}>
          11 NGÀY KHÔNG NGỦ
        </div>
        <div style={{color: '#94A3B8', fontSize: 24, fontWeight: 700, marginTop: 12}}>
          Từ 24h → 48h → 72h → 120h → 264h
        </div>
      </div>

      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={1360}
          y={620}
          scale={1.3}
          mood="determined"
          pose="point"
          flip
          narration={NARRATION}
        />
      </svg>
      <SubtitleBar text="Kỷ lục thế giới từng thức 11 ngày không chợp mắt. Chuyện gì xảy ra qua từng mốc giờ?" />
    </MascotStage>
  );
};
