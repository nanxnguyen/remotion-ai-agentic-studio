import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
  KineticStroke,
} from '../../../animation/StickmanDirectorKit';
import {GROUND_Y, STYLE_ID, SceneFade, THEME} from '../kit';
import {timeline} from '../timeline';

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  const step = spring({frame, fps, config: {damping: 18, stiffness: 80}});
  const leftX = 330 + step * 75;
  const rightX = 750 - step * 75;

  const leftPose = directorPose({
    preset: 'pointing',
    originX: leftX,
    groundY: GROUND_Y,
    time,
  });
  const rightPose = directorPose({
    preset: 'pointing',
    originX: rightX,
    groundY: GROUND_Y,
    time,
    facing: -1,
  });

  const warmGlow = interpolate(frame, [30, 90], [0, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneFade durationInFrames={timeline.shots.scene08.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <circle cx={540} cy={GROUND_Y - 260} r={260} fill={THEME.accent} opacity={warmGlow} />
        <line x1={120} y1={GROUND_Y} x2={960} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
        <DirectorCharacter pose={leftPose} styleId={STYLE_ID} />
        <DirectorCharacter pose={rightPose} styleId={STYLE_ID} accessory="scarf" />
        <KineticStroke
          kind="arrow"
          x={435}
          y={GROUND_Y - 480}
          width={210}
          startFrame={25}
          durationFrames={28}
          color={THEME.accent}
          strokeWidth={6}
        />
      </DirectorStage>
      <DirectorCaption text="Khoảng cách vừa đủ để không làm đau" styleId={STYLE_ID} />
    </SceneFade>
  );
};
