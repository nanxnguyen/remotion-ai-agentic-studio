import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ComicBurst, CunBongMascot, MascotStage, SubtitleBar, TiredEyesOverlay} from '../kit';

const NARRATION =
  'Đang nói chuyện bình thường tự dưng tôi ngáy khò khò ba giây rồi giật mình tỉnh dậy, mém chút nữa rớt luôn cái ly!';

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const wakeUp = frame >= 45;
  return (
    <MascotStage
      theme="savanna"
      shake={frame >= 45 && frame <= 58 ? 0.8 : 0}
      impactFrame={45}
      zoom={1.08}
    >
      <TiredEyesOverlay level={10} />
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{position: 'absolute', inset: 0}}
      >
        <CunBongMascot
          x={840}
          y={620}
          scale={1.3}
          mood={wakeUp ? 'wide' : 'dizzy'}
          pose={wakeUp ? 'panic' : 'idle'}
          narration={NARRATION}
          bandages={2}
        />
      </svg>
      {!wakeUp && <ComicBurst text="Zzz..." x={1150} y={340} color="#6366F1" startFrame={5} />}
      {wakeUp && <ComicBurst text="GIẬT MÌNH!!" x={1180} y={320} color="#EF4444" startFrame={45} />}
      <SubtitleBar text="Đang nói chuyện tự dưng ngáy 3 giây rồi giật mình tỉnh dậy, mém rớt cái ly!" />
    </MascotStage>
  );
};
