import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {OrcaSvg, SharkSvg} from '../creatures';
import {DepthBadge, DepthStage, ScaleCaption} from '../kit';

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const depth = interpolate(frame, [0, 210], [100, 332], {
    easing: Easing.inOut(Easing.quad),
  });

  const sharkX = interpolate(frame, [10, 120], [1150, 160], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const sharkY = interpolate(frame, [150, 210], [640, -380], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const orcaX = interpolate(frame, [50, 150], [-720, 210], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const orcaY = interpolate(frame, [150, 210], [1060, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <DepthStage depthMeters={depth}>
      <DepthBadge label="332 MÉT" triggerFrame={0} />

      <div style={{position: 'absolute', left: sharkX, top: sharkY}}>
        <SharkSvg frame={frame} />
      </div>

      <div style={{position: 'absolute', left: orcaX, top: orcaY}}>
        <OrcaSvg frame={frame} />
      </div>

      <ScaleCaption
        top={340}
        segments={[
          {text: 'Ở ĐỘ SÂU 332 MÉT', startFrame: 0, endFrame: 65, accentColor: '#fde047'},
          {text: 'LÀ GIỚI HẠN LẶN SÂU NHẤT', startFrame: 65, endFrame: 135},
          {text: 'CỦA CON NGƯỜI', startFrame: 135, endFrame: 210},
        ]}
      />
    </DepthStage>
  );
};
