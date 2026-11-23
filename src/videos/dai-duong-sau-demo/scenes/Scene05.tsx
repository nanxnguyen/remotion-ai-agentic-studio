import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {GlowingRedXSvg, GoblinSharkSvg} from '../creatures';
import {DepthBadge, DepthStage, ScaleCaption} from '../kit';

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const depth = interpolate(frame, [0, 210], [632, 1000], {
    easing: Easing.inOut(Easing.quad),
  });

  // 0-100: Glowing Red X (No Sunlight); 95-210: Goblin Shark rises from abyss
  const xOpacity = interpolate(frame, [0, 15, 85, 110], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sharkY = interpolate(frame, [95, 145], [1900, 780], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <DepthStage depthMeters={depth}>
      <DepthBadge label="1000 MÉT" triggerFrame={0} />

      <div
        style={{
          position: 'absolute',
          left: 230,
          top: 650,
          opacity: xOpacity,
        }}
      >
        <GlowingRedXSvg frame={frame} />
      </div>

      <div style={{position: 'absolute', left: 165, top: sharkY}}>
        <GoblinSharkSvg frame={frame} />
      </div>

      <ScaleCaption
        top={340}
        segments={[
          {text: 'TỪ 1000 MÉT TRỞ XUỐNG', startFrame: 0, endFrame: 50, accentColor: '#f87171'},
          {text: 'ÁNH SÁNG BIẾN MẤT HOÀN TOÀN', startFrame: 50, endFrame: 105},
          {
            text: 'NƠI Ở CỦA QUÁI VẬT ĐÁY SÂU',
            startFrame: 105,
            endFrame: 160,
            accentColor: '#fde047',
          },
          {
            text: 'VÀ ĐÂY MỚI CHỈ LÀ 10%...',
            startFrame: 160,
            endFrame: 210,
            accentColor: '#38bdf8',
          },
        ]}
      />
    </DepthStage>
  );
};
