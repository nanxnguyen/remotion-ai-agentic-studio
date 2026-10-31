import React from 'react';
import type {CharacterPose, Point} from './character-motion';

const stroke = '#E9E7E5';
const shade = '#AAA8B7';

/** Vector-only puppet. All motion comes from the caller's frame-deterministic pose. */
export const CharacterPuppet: React.FC<{pose: CharacterPose; shadow?: boolean}> = ({
  pose,
  shadow = true,
}) => {
  const seg = (a: Point, b: Point, width: number, color = stroke) => (
    <line
      x1={a.x}
      y1={a.y}
      x2={b.x}
      y2={b.y}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
    />
  );
  const leftShoulder = {x: pose.shoulder.x - 28, y: pose.shoulder.y};
  const rightShoulder = {x: pose.shoulder.x + 28, y: pose.shoulder.y};
  const leftHip = {x: pose.hip.x - 22, y: pose.hip.y};
  const rightHip = {x: pose.hip.x + 22, y: pose.hip.y};
  const head = pose.head;
  const eyeY = pose.expression === 'tired' ? 5 : -8;
  return (
    <g>
      {shadow && (
        <ellipse
          cx={pose.hip.x}
          cy={Math.max(pose.feet[0].y, pose.feet[1].y) + 10}
          rx={110}
          ry={12}
          fill="#000000"
          opacity={0.35}
        />
      )}
      {seg(leftHip, pose.knees[0], 36, shade)}
      {seg(pose.knees[0], pose.feet[0], 32, shade)}
      {seg(leftShoulder, pose.elbows[0], 30, shade)}
      {seg(pose.elbows[0], pose.hands[0], 26, shade)}
      {seg(rightHip, pose.knees[1], 38)}
      {seg(pose.knees[1], pose.feet[1], 34)}
      {seg(pose.hip, pose.shoulder, 70)}
      {seg(rightShoulder, pose.elbows[1], 35)}
      {seg(pose.elbows[1], pose.hands[1], 29)}
      <circle cx={pose.hands[0].x} cy={pose.hands[0].y} r={14} fill={shade} />
      <circle cx={pose.hands[1].x} cy={pose.hands[1].y} r={16} fill={stroke} />
      <circle cx={head.x} cy={head.y} r={59} fill={stroke} />
      <ellipse cx={head.x - 15} cy={head.y - 18} rx={23} ry={15} fill="#FFFFFF" opacity={0.12} />
      <circle cx={head.x - 19} cy={head.y + eyeY} r={6} fill="#191B26" />
      <circle cx={head.x + 19} cy={head.y + eyeY} r={6} fill="#191B26" />
      {pose.expression === 'focused' ? (
        <path
          d={`M ${head.x - 19} ${head.y + 25} Q ${head.x} ${head.y + 17} ${head.x + 19} ${head.y + 25}`}
          stroke="#191B26"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path
          d={`M ${head.x - 17} ${head.y + 25} Q ${head.x} ${head.y + (pose.expression === 'tired' ? 17 : 30)} ${head.x + 17} ${head.y + 25}`}
          stroke="#191B26"
          strokeWidth={5}
          strokeLinecap="round"
          fill="none"
        />
      )}
    </g>
  );
};
