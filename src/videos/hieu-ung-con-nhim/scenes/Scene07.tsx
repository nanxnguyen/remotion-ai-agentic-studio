import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
} from '../../../animation/StickmanDirectorKit';
import {DefenseSpikes, GROUND_Y, GlowingHeart, STYLE_ID, SceneFade} from '../kit';
import {timeline} from '../timeline';

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  const pose = directorPose({
    preset: 'idle',
    originX: 540,
    groundY: GROUND_Y,
    time,
  });

  const spikeShrink = interpolate(frame, [0, 95], [0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const unlock = interpolate(frame, [45, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneFade durationInFrames={timeline.shots.scene07.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <line x1={120} y1={GROUND_Y} x2={960} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
        <DefenseSpikes cx={540} cy={GROUND_Y - 310} progress={spikeShrink} color="#7A7A86" />
        <DirectorCharacter pose={pose} styleId={STYLE_ID} />
        <GlowingHeart x={540} y={GROUND_Y - 320} scale={0.8} locked unlockProgress={unlock} />
      </DirectorStage>
      <DirectorCaption text="An toàn thật không nằm sau bức tường" styleId={STYLE_ID} />
    </SceneFade>
  );
};
