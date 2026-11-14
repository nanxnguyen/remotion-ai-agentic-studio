import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {locomotionPose} from '../../../animation/character-motion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
} from '../../../animation/StickmanDirectorKit';
import {GROUND_Y, GlassCage, STYLE_ID, SceneFade} from '../kit';
import {timeline} from '../timeline';

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  const cageDrop = spring({frame, fps, config: {damping: 18, stiffness: 95}});
  const mainPose = directorPose({
    preset: 'slumped',
    originX: 540,
    groundY: GROUND_Y,
    time,
  });

  // Passerby walking from left to right outside the cage.
  const passerX = 140 + time * 135;
  const passerPose = locomotionPose({
    time,
    originX: passerX,
    groundY: GROUND_Y,
    speed: 135,
    mode: 'walk',
  });

  return (
    <SceneFade durationInFrames={timeline.shots.scene05.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <line x1={80} y1={GROUND_Y} x2={1000} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
        <g opacity={0.35}>
          <DirectorCharacter pose={passerPose} styleId={STYLE_ID} shadow={false} />
        </g>
        <DirectorCharacter pose={mainPose} styleId={STYLE_ID} />
        <GlassCage x={340} y={GROUND_Y - 540} width={400} height={540} progress={cageDrop} />
      </DirectorStage>
      <DirectorCaption text="Bạn dựng tường để tự bảo vệ mình" styleId={STYLE_ID} />
    </SceneFade>
  );
};
