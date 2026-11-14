import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
} from '../../../animation/StickmanDirectorKit';
import {GROUND_Y, GlassCage, STYLE_ID, SceneFade} from '../kit';
import {timeline} from '../timeline';

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  const pose = directorPose({
    preset: 'argue',
    originX: 525,
    groundY: GROUND_Y,
    time,
  });

  const cracks = interpolate(frame, [15, 75], [0.2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneFade durationInFrames={timeline.shots.scene06.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <line x1={80} y1={GROUND_Y} x2={1000} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
        <DirectorCharacter pose={pose} styleId={STYLE_ID} />
        <GlassCage x={340} y={GROUND_Y - 540} width={400} height={540} progress={1} cracks={cracks} />
      </DirectorStage>
      <DirectorCaption text="An toàn... nhưng đổi bằng cô độc" styleId={STYLE_ID} />
    </SceneFade>
  );
};
