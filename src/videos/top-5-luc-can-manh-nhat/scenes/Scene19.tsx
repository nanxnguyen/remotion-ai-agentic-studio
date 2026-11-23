import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CunBongMascot, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Nếu bắt buộc phải chọn một trong năm sinh vật này để ngủ chung một đêm, bạn sẽ chọn con nào? Bình luận bên dưới cho tôi biết với nhé!';

export const Scene19: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12}});

  return (
    <MascotStage theme="studio">
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 110,
          width: 980,
          padding: '44px 48px',
          borderRadius: 32,
          background: 'rgba(15, 23, 42, 0.9)',
          border: '4px solid #F58B4C',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          transform: `scale(${0.9 + pop * 0.1})`,
        }}
      >
        <div
          style={{
            color: '#F58B4C',
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 1.5,
            marginBottom: 14,
          }}
        >
          CÂU HỎI DÀNH CHO BẠN 👇
        </div>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: 54,
            fontWeight: 900,
            lineHeight: 1.25,
            marginBottom: 24,
          }}
        >
          Bắt buộc chọn 1 trong 5 con để ngủ chung 1 đêm, bạn chọn con nào?
        </div>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
          {['1. Linh Cẩu', '2. Báo Đốm', '3. Hà Mã', '4. Cá Sấu', '5. Cá Mập'].map((tag) => (
            <span
              key={tag}
              style={{
                background: '#1E293B',
                border: '2px solid #38BDF8',
                color: '#E2E8F0',
                fontSize: 24,
                fontWeight: 800,
                padding: '10px 22px',
                borderRadius: 999,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={1480}
          y={610}
          scale={1.32}
          mood="happy"
          pose="thumbsUp"
          flip
          narration={NARRATION}
          bandages={4}
        />
      </svg>

      <SubtitleBar text="Bắt buộc chọn 1 trong 5 sinh vật này để ngủ chung một đêm, bạn chọn con nào? Bình luận bên dưới nhé!" />
    </MascotStage>
  );
};
