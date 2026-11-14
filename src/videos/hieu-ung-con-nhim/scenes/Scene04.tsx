import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
  KineticStroke,
} from '../../../animation/StickmanDirectorKit';
import {GROUND_Y, STYLE_ID, SceneFade, THEME} from '../kit';
import {timeline} from '../timeline';

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  const pose = directorPose({
    preset: 'thinking',
    originX: 540,
    groundY: GROUND_Y,
    time,
  });

  const textScale = interpolate(frame, [0, 14], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneFade durationInFrames={timeline.shots.scene04.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <g transform={`translate(540, 470) scale(${textScale}) translate(-540, -470)`}>
          <text
            x={540}
            y={450}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize={62}
            fontWeight={800}
            fontFamily="Inter, sans-serif"
          >
            GẦN GŨI = NGUY HIỂM
          </text>
          <KineticStroke
            kind="underline"
            x={210}
            y={485}
            width={660}
            startFrame={8}
            durationFrames={20}
            color={THEME.accent}
            strokeWidth={8}
          />
        </g>
        <line x1={120} y1={GROUND_Y} x2={960} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
        <DirectorCharacter pose={pose} styleId={STYLE_ID} />
      </DirectorStage>
      <DirectorCaption text="Gần gũi đồng nghĩa với nguy hiểm" styleId={STYLE_ID} />
    </SceneFade>
  );
};
