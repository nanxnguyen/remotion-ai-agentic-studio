import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {directorPose} from '../../../animation/stickman-director';
import {
  DirectorCaption,
  DirectorCharacter,
  DirectorStage,
  KineticStroke,
} from '../../../animation/StickmanDirectorKit';
import {GROUND_Y, GlowingHeart, STYLE_ID, SceneFade, THEME} from '../kit';
import {timeline} from '../timeline';

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;

  const shocked = frame > 45;
  const pose = directorPose({
    preset: shocked ? 'shocked' : 'pointing',
    originX: shocked ? 340 : 380,
    groundY: GROUND_Y,
    time,
  });

  const flashAlpha = interpolate(frame, [42, 46, 56], [0, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneFade durationInFrames={timeline.shots.scene03.duration}>
      <DirectorStage styleId={STYLE_ID}>
        <rect x={0} y={0} width={1080} height={1920} fill={THEME.accent} opacity={flashAlpha * 0.16} />
        <line x1={120} y1={GROUND_Y} x2={960} y2={GROUND_Y} stroke="#2B2B32" strokeWidth={4} />
        <DirectorCharacter pose={pose} styleId={STYLE_ID} />
        <GlowingHeart x={750} y={GROUND_Y - 340} scale={1.15} />
        {shocked && (
          <KineticStroke
            kind="polyline"
            x={555}
            y={GROUND_Y - 400}
            points={[
              {x: 150, y: 20},
              {x: 80, y: 70},
              {x: 115, y: 95},
              {x: 20, y: 165},
            ]}
            startFrame={42}
            durationFrames={8}
            color={THEME.accent}
            strokeWidth={9}
          />
        )}
      </DirectorStage>
      <DirectorCaption text="Quy tắc ngầm sau lần tổn thương đầu" styleId={STYLE_ID} />
    </SceneFade>
  );
};
