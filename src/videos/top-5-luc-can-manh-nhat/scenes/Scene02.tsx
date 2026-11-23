import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CunBongMascot, DangerCard, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Lực cắn trung bình của con người chỉ khoảng một trăm sáu mươi P S I. Nghe cũng tạm ổn đúng không? Thế là tôi quyết định đi đo thử lực cắn của năm sinh vật bá đạo nhất hành tinh!';

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame: Math.max(0, frame - 20), fps, config: {damping: 12}});
  const cardX = interpolate(frame, [0, 25], [1400, 1280], {extrapolateRight: 'clamp'});

  return (
    <MascotStage theme="studio">
      <DangerCard
        roundLabel="MỐC SO SÁNH"
        creatureName="Con Người (Trung Bình)"
        psi={160}
        subLabel="~710 Newton"
        accentColor="#38BDF8"
      />
      <div
        style={{
          position: 'absolute',
          left: cardX,
          top: 230,
          width: 480,
          padding: 32,
          borderRadius: 28,
          background: 'rgba(15,23,42,0.85)',
          border: '3px solid #38BDF8',
          transform: `scale(${pop})`,
          color: '#F8FAFC',
        }}
      >
        <div style={{fontSize: 28, fontWeight: 800, color: '#38BDF8', marginBottom: 14}}>
          THỬ THÁCH ĐO LỰC CẮN
        </div>
        <div style={{fontSize: 44, fontWeight: 900, lineHeight: 1.2}}>TOP 5 QUÁI THÚ HÀNH TINH</div>
        <div style={{fontSize: 22, color: '#94A3B8', marginTop: 12}}>
          Từ 1,100 PSI đến 4,000 PSI
        </div>
      </div>

      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={740}
          y={620}
          scale={1.32}
          mood="determined"
          pose="holdMeter"
          narration={NARRATION}
        />
      </svg>
      <SubtitleBar text="Lực cắn trung bình của con người chỉ khoảng 160 PSI. Thế là tôi đi đo thử 5 sinh vật bá đạo nhất hành tinh!" />
    </MascotStage>
  );
};
