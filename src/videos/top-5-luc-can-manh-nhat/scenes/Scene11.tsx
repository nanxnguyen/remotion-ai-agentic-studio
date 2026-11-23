import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ComicBurst, CreatureArt, CunBongMascot, GagTally, MascotStage, SubtitleBar} from '../kit';

const NARRATION =
  'Và thế là chiếc xuồng của tôi chính thức chia làm hai nửa. Giờ tôi phải chèo vào bờ bằng cái muỗng ăn cơm. Lần băng bó thứ hai!';

export const Scene11: React.FC = () => {
  const frame = useCurrentFrame();
  const split = interpolate(frame, [20, 50], [0, 75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shake = frame >= 18 && frame <= 32 ? 1.0 : 0;

  return (
    <MascotStage theme="river" shake={shake}>
      <GagTally count={2} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        {/* Split Wooden Canoe */}
        <g transform={`translate(${430 - split}, 770) rotate(${-split * 0.15})`}>
          <path
            d="M -160 -20 L 0 -20 L -20 40 L -130 35 Z"
            fill="#92400E"
            stroke="#451A03"
            strokeWidth={5}
          />
        </g>
        <g transform={`translate(${620 + split}, 770) rotate(${split * 0.15})`}>
          <path
            d="M 0 -20 L 160 -20 L 130 35 L 20 40 Z"
            fill="#92400E"
            stroke="#451A03"
            strokeWidth={5}
          />
        </g>

        <CunBongMascot
          x={500}
          y={610}
          scale={1.18}
          mood="dizzy"
          pose="paddle"
          narration={NARRATION}
          bandages={2}
        />
        <CreatureArt kind="hippo" x={1320} y={600} scale={1.28} jawOpen={frame < 25 ? 0.9 : 0.15} />
      </svg>
      <ComicBurst text="VỠ TAN!" x={780} y={480} color="#3B82F6" startFrame={20} />
      <SubtitleBar text="Chiếc xuồng chia làm hai nửa. Giờ tôi phải chèo vào bờ bằng cái muỗng ăn cơm. Lần băng bó thứ 2!" />
    </MascotStage>
  );
};
