import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
  KineticStroke,
} from '../../../animation/StickmanDirectorKit';
import {DefenseSpikes, GROUND_Y, STYLE_ID, SceneFade, THEME} from '../kit';
import {timeline} from '../timeline';

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  // Two hedgehog-like figures move closer, collide with spikes, then bounce back.
  const cycle = Math.sin(Math.min(1, frame / 55) * Math.PI);
  const leftX = 320 + cycle * 115;
  const rightX = 760 - cycle * 115;
  const spikeFactor = interpolate(frame, [20, 42, 70], [0.4, 1, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const leftPose = directorPose({
    preset: cycle > 0.7 ? 'argue' : 'presenting',
    originX: leftX,
    groundY: GROUND_Y,
    time,
  });
  const rightPose = directorPose({
    preset: cycle > 0.7 ? 'shocked' : 'idle',
    originX: rightX,
    groundY: GROUND_Y,
    time,
    facing: -1,
  });

  return (
    <SceneFade durationInFrames={timeline.shots.scene02.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <text
          x={540}
          y={420}
          textAnchor="middle"
          fill={THEME.accent}
          fontSize={56}
          fontWeight={800}
          fontFamily="Inter, sans-serif"
        >
          HIỆU ỨNG CON NHÍM
        </text>
        <KineticStroke kind="underline" x={270} y={450} width={540} startFrame={6} durationFrames={22} />
        <line x1={120} y1={GROUND_Y} x2={960} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
        <DefenseSpikes cx={leftX} cy={GROUND_Y - 250} progress={spikeFactor} outerR={175} />
        <DefenseSpikes cx={rightX} cy={GROUND_Y - 250} progress={spikeFactor} outerR={175} color="#8E8E98" />
        <DirectorCharacter pose={leftPose} styleId={STYLE_ID} />
        <DirectorCharacter pose={rightPose} styleId={STYLE_ID} accessory="beanie" />
      </DirectorStage>
      <DirectorCaption text="Hiệu ứng Con Nhím trong tâm lý học" styleId={STYLE_ID} />
    </SceneFade>
  );
};
