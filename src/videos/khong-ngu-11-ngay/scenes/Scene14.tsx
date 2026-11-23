import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CunBongMascot, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Kỷ lục thức khuya nhất của bạn từng đạt là bao nhiêu tiếng? Bình luận bên dưới cho tôi biết với nhé!';

export const Scene14: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 12}});

  return (
    <MascotStage theme="studio" zoom={1.04}>
      <div
        style={{
          position: 'absolute',
          top: 115,
          left: 110,
          width: 980,
          padding: '44px 48px',
          borderRadius: 32,
          background: 'rgba(15, 23, 42, 0.9)',
          border: '4px solid #38BDF8',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          transform: `scale(${0.9 + pop * 0.1})`,
        }}
      >
        <div
          style={{
            color: '#38BDF8',
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 1.5,
            marginBottom: 14,
          }}
        >
          THỬ THÁCH BÌNH LUẬN 👇
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
          Kỷ lục thức trắng lâu nhất của bạn là bao nhiêu tiếng?
        </div>
        <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
          {['24 Tiếng', '36 Tiếng', '48 Tiếng', 'Hơn 72 Tiếng!'].map((tag) => (
            <span
              key={tag}
              style={{
                background: '#1E293B',
                border: '2px solid #F58B4C',
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

      <SubtitleBar text="Kỷ lục thức khuya nhất của bạn là bao nhiêu tiếng? Bình luận bên dưới nhé!" />
    </MascotStage>
  );
};
