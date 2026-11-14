import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
} from '../../../animation/StickmanDirectorKit';
import {GROUND_Y, GlowingHeart, STYLE_ID, SceneFade, THEME} from '../kit';
import {timeline} from '../timeline';

export const Scene09: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  const zoom = interpolate(frame, [0, 90], [1, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const leftPose = directorPose({
    preset: 'celebrate',
    originX: 430,
    groundY: GROUND_Y,
    time,
  });
  const rightPose = directorPose({
    preset: 'presenting',
    originX: 650,
    groundY: GROUND_Y,
    time,
    facing: -1,
  });

  return (
    <SceneFade durationInFrames={timeline.shots.scene09.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <g transform={`translate(540, 1080) scale(${zoom}) translate(-540, -1080)`}>
          <circle cx={540} cy={GROUND_Y - 260} r={300} fill={THEME.accent} opacity={0.14} />
          <line x1={120} y1={GROUND_Y} x2={960} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
          <DirectorCharacter pose={leftPose} styleId={STYLE_ID} />
          <DirectorCharacter pose={rightPose} styleId={STYLE_ID} accessory="scarf" />
          <GlowingHeart x={540} y={GROUND_Y - 380} scale={1.15} />
        </g>
      </DirectorStage>
      <DirectorCaption text="Bạn có đang giấu gai với ai không?" styleId={STYLE_ID} />
    </SceneFade>
  );
};
