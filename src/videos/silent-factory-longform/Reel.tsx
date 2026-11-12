import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CharacterPuppet} from '../../animation/CharacterPuppet';
import {locomotionPose, solveTwoBone} from '../../animation/character-motion';
import type {CharacterPose, Point} from '../../animation/character-motion';

export const SHOT_FRAMES = 175;
export const FILM_FPS = 30;
export const FILM_SHOTS = 36;
export const FILM_DURATION_FRAMES = SHOT_FRAMES * FILM_SHOTS;

export type StickAction =
  | 'walk'
  | 'run'
  | 'stumble'
  | 'reach'
  | 'repair'
  | 'help'
  | 'rise'
  | 'pause'
  | 'plant'
  | 'water'
  | 'offer';
export type StickScene = 'city' | 'stairs' | 'workshop' | 'bridge' | 'dawn' | 'garden';
export type FilmShot = {
  id: string;
  action: StickAction;
  scene: StickScene;
  caption: string;
  highlight: string;
  palette?: 'cold' | 'warm' | 'hope';
  prop?:
    | 'cracked_cup'
    | 'leaking_cup'
    | 'empty_cup'
    | 'seed'
    | 'soil_cup'
    | 'planted_cup'
    | 'sprout_cup'
    | 'flower_cup'
    | 'cup_garden'
    | 'tipped_cup'
    | 'falling_star'
    | 'blank_page'
    | 'folded_star'
    | 'torn_star'
    | 'paper_star'
    | 'star_chain'
    | 'window_stars'
    | 'dark_window'
    | 'two_window_stars';
  weather?: 'rain';
};
export type FilmProps = {title: string; shots: FilmShot[]};
const W = 1920;
const H = 1080;
const FLOOR = 865;
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const blend = (a: number, b: number, t: number) => a + (b - a) * t;
const point = (p: Point, dx: number, dy: number): Point => ({x: p.x + dx, y: p.y + dy});

function expressivePose(action: StickAction, time: number, index: number): CharacterPose {
  const speed = action === 'run' ? 200 : ['walk', 'stumble', 'rise'].includes(action) ? 80 : 1;
  const walking = ['walk', 'stumble', 'run', 'rise'].includes(action);
  const x = walking ? 450 + (index % 3) * 150 : 850 + (index % 4) * 48;
  const base = locomotionPose({
    time: Math.max(0, time),
    originX: x,
    groundY: FLOOR,
    speed,
    mode: action === 'run' ? 'run' : 'walk',
  });
  const lift = Math.sin(clamp(time / 5.83) * Math.PI);
  const crouch = action === 'plant' || action === 'water' ? 92 * lift : 0;
  const drop = action === 'stumble' ? 95 * lift : action === 'pause' ? 25 * lift : 0;
  const lean = action === 'stumble' ? 90 * lift : action === 'reach' ? 24 * lift : 0;
  const shoulder = point(base.shoulder, lean, drop + crouch);
  const hip = point(base.hip, lean * 0.3, drop * 0.55 + crouch * 0.65);
  const head = point(base.head, lean, drop + crouch);
  const handTarget = (side: 0 | 1): Point => {
    if (action === 'plant' || action === 'water') {
      return {
        x: hip.x + (side === 0 ? 55 : 150),
        y: FLOOR - (action === 'water' && side === 1 ? 155 : 125),
      };
    }
    if (action === 'offer') {
      return {x: hip.x + (side === 0 ? 105 : 160), y: hip.y + 15};
    }
    const dir = side === 0 ? -1 : 1;
    const rise = action === 'reach' || action === 'help' ? 185 * lift : 0;
    const activity = action === 'repair' ? 110 * (0.5 + 0.5 * Math.sin(time * 8)) : 0;
    const offer = action === 'help' ? 78 : 0;
    return point(
      base.hands[side],
      dir * (activity * 0.3 + offer) + lean,
      -rise + activity * 0.45 + drop * 0.3,
    );
  };
  const targets: readonly [Point, Point] = [handTarget(0), handTarget(1)];
  const left = solveTwoBone(point(shoulder, -28, 0), targets[0], 103, 100, -1);
  const right = solveTwoBone(point(shoulder, 28, 0), targets[1], 103, 100, 1);
  const knees: readonly [Point, Point] = [
    solveTwoBone(point(hip, -22, 0), base.feet[0], 153, 150, -1).joint,
    solveTwoBone(point(hip, 22, 0), base.feet[1], 153, 150, -1).joint,
  ];
  return {
    ...base,
    shoulder,
    hip,
    head,
    hands: [left.end, right.end],
    elbows: [left.joint, right.joint],
    knees,
    expression:
      action === 'stumble' || action === 'pause'
        ? 'tired'
        : ['repair', 'run', 'reach', 'plant', 'water'].includes(action)
          ? 'focused'
          : 'calm',
  };
}
const Backdrop: React.FC<{
  scene: StickScene;
  index: number;
  time: number;
  weather?: FilmShot['weather'];
}> = ({scene, index, time, weather}) => {
  const dawn = scene === 'dawn';
  const garden = scene === 'garden';
  const warm = dawn || scene === 'workshop' || garden;
  const sky = dawn ? '#456079' : garden ? '#314B59' : warm ? '#253244' : '#0C172A';
  const ground = garden ? '#304B3E' : warm ? '#263B4B' : '#14243A';
  const parallax = Math.sin(time * 0.23 + index * 0.2) * 24;
  return (
    <>
      <rect x="0" y="0" width={W} height={H} fill={sky} />
      <circle
        cx={1520 - parallax}
        cy={245}
        r={dawn ? 148 : 78}
        fill={dawn ? '#F4BD71' : '#D8E3E9'}
        opacity={dawn ? 0.85 : 0.34}
      />
      <g opacity="0.22" transform={'translate(' + parallax + ' 0)'}>
        {Array.from({length: 12}, (_, i) => (
          <rect
            key={i}
            x={-35 + i * 183}
            y={365 + ((i * 71 + index * 17) % 270)}
            width={110 + (i % 3) * 20}
            height={H}
            fill={i % 2 ? '#5C7189' : '#3B5571'}
            rx={7}
          />
        ))}
      </g>
      <rect x={0} y={FLOOR} width={W} height={H - FLOOR} fill={ground} />
      <path
        d={'M 0 ' + FLOOR + ' L ' + W + ' ' + FLOOR}
        stroke={dawn ? '#DDBB87' : '#7B90A6'}
        strokeWidth={4}
        opacity={0.48}
      />
      {scene === 'stairs' && (
        <g>
          {Array.from({length: 10}, (_, i) => (
            <rect
              key={i}
              x={380 + i * 107}
              y={FLOOR - 30 - i * 48}
              width={107}
              height={48 + i * 48}
              stroke="#8EA0B3"
              strokeWidth={4}
              fill={i === 5 ? '#11192A' : '#384A5F'}
              opacity={0.9}
            />
          ))}
          <rect
            x={380 + 5 * 107}
            y={FLOOR - 30 - 5 * 48}
            width={107}
            height={47 + 5 * 48}
            fill="#101729"
          />
          <path d="M 911 580 L 970 560" stroke="#F1B76E" strokeWidth={8} strokeDasharray="18 12" />
        </g>
      )}
      {scene === 'workshop' && (
        <g>
          <rect x={225} y={535} width={425} height={85} rx={15} fill="#607186" />
          <rect x={270} y={620} width={28} height={245} fill="#536980" />
          <rect x={575} y={620} width={28} height={245} fill="#536980" />
          <circle cx={442} cy={520} r={22} fill="#E6C27C" />
          <path
            d="M 1510 865 L 1510 430 L 1620 430"
            stroke="#93AAC3"
            strokeWidth={13}
            fill="none"
          />
        </g>
      )}
      {scene === 'bridge' && (
        <g stroke="#72879B" strokeWidth={12} opacity={0.72}>
          <path d="M 0 640 H 1920 M 0 725 H 1920" />
          {Array.from({length: 16}, (_, i) => (
            <path key={i} d={'M ' + i * 125 + ' 640 L ' + (i * 125 + 70) + ' 865'} />
          ))}
        </g>
      )}
      {scene === 'city' &&
        Array.from({length: 10}, (_, i) => (
          <circle
            key={i}
            cx={i * 213 + 70}
            cy={510 + (i % 4) * 42}
            r={8}
            fill="#F0CA8A"
            opacity={0.4}
          />
        ))}
      {scene === 'dawn' && (
        <path
          d="M 0 720 Q 600 640 1100 740 T 1920 700 L 1920 865 L 0 865 Z"
          fill="#52727C"
          opacity={0.5}
        />
      )}
      {garden && (
        <g>
          <path
            d="M 0 760 Q 420 700 860 760 T 1920 735 L 1920 865 L 0 865 Z"
            fill="#466B4F"
            opacity={0.8}
          />
          {Array.from({length: 18}, (_, i) => (
            <path
              key={i}
              d={`M ${i * 118 + 20} 865 q -18 -44 -2 -72 q 22 26 2 72 q 18 -35 40 -42`}
              stroke="#8FC58A"
              strokeWidth={8}
              fill="none"
              strokeLinecap="round"
              opacity={0.8}
            />
          ))}
          <rect
            x={120}
            y={805}
            width={410}
            height={65}
            rx={18}
            fill="#725847"
            stroke="#B28B69"
            strokeWidth={8}
          />
          <rect
            x={1380}
            y={805}
            width={410}
            height={65}
            rx={18}
            fill="#725847"
            stroke="#B28B69"
            strokeWidth={8}
          />
        </g>
      )}
      {weather === 'rain' && (
        <g stroke="#B8DCE9" strokeWidth={5} opacity={0.45}>
          {Array.from({length: 70}, (_, i) => {
            const x = (i * 127 + time * 380) % W;
            const y = (i * 83) % 760;
            return <line key={i} x1={x} y1={y} x2={x - 35} y2={y + 76} />;
          })}
        </g>
      )}
    </>
  );
};

const Caption: React.FC<{shot: FilmShot; local: number}> = ({shot, local}) => {
  if (!shot.caption.trim()) return null;
  const fade = clamp(Math.min(local / 12, (SHOT_FRAMES - local) / 15));
  const highlight = shot.highlight.trim();
  const index = highlight ? shot.caption.toLowerCase().indexOf(highlight.toLowerCase()) : -1;
  const color =
    shot.palette === 'hope' ? '#8FE0C2' : shot.palette === 'warm' ? '#F7CA78' : '#EA8C8C';
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: 120,
        right: 120,
        display: 'flex',
        justifyContent: 'center',
        opacity: fade,
      }}
    >
      <div
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: 52,
          fontWeight: 800,
          letterSpacing: -1,
          color: '#F7F8F6',
          textAlign: 'center',
          lineHeight: 1.25,
          textShadow: '0 5px 22px rgba(0,0,0,.9)',
          background: 'rgba(5,12,23,.50)',
          borderRadius: 24,
          padding: '15px 33px',
        }}
      >
        {index < 0 ? (
          shot.caption
        ) : (
          <>
            {shot.caption.slice(0, index)}
            <span style={{color}}>{shot.caption.slice(index, index + highlight.length)}</span>
            {shot.caption.slice(index + highlight.length)}
          </>
        )}
      </div>
    </div>
  );
};

const PaperStarProp: React.FC<{
  kind?: FilmShot['prop'];
  x: number;
  y: number;
  time: number;
}> = ({kind, x, y, time}) => {
  const starKinds = [
    'falling_star',
    'blank_page',
    'folded_star',
    'torn_star',
    'paper_star',
    'star_chain',
    'window_stars',
    'dark_window',
    'two_window_stars',
  ];
  if (!kind || !starKinds.includes(kind)) return null;
  const starPoints = '0,-42 10,-13 42,-13 17,6 26,38 0,20 -26,38 -17,6 -42,-13 -10,-13';
  const star = (sx: number, sy: number, scale: number, rotation: number, fill: string) => (
    <g transform={'translate(' + sx + ' ' + sy + ') rotate(' + rotation + ') scale(' + scale + ')'}>
      <polygon points={starPoints} fill={fill} stroke="#D9B56F" strokeWidth={4} />
      <path
        d="M 0 -30 L 0 15 M -27 -8 L 27 -8"
        stroke="#B68B50"
        strokeWidth={3}
        opacity={0.55}
        fill="none"
      />
    </g>
  );
  const fall = kind === 'falling_star' ? -150 + Math.min(145, time * 30) : Math.sin(time * 2.1) * 4;
  return (
    <g transform={'translate(' + x + ' ' + (y + fall) + ')'}>
      {kind === 'blank_page' && (
        <g>
          <path
            d="M -54 -40 L 36 -40 L 54 -22 L 54 42 L -54 42 Z"
            fill="#F5F0E5"
            stroke="#A8B4C0"
            strokeWidth={5}
          />
          <path
            d="M 36 -40 L 36 -22 L 54 -22 M -34 -12 L 28 -12 M -34 5 L 28 5 M -34 22 L 12 22"
            stroke="#B8B6AA"
            strokeWidth={3}
            fill="none"
          />
        </g>
      )}
      {kind === 'folded_star' && star(0, 0, 1.08, Math.sin(time * 1.5) * 4, '#F7F0DC')}
      {kind === 'torn_star' && (
        <g>
          <path
            d="M -2 -42 L -10 -13 L -42 -13 L -17 6 L -26 38 L -2 20 Z"
            fill="#F1E7D5"
            stroke="#D9B56F"
            strokeWidth={4}
            transform="translate(-15 0) rotate(-10 -15 0)"
          />
          <path
            d="M 2 -42 L 10 -13 L 42 -13 L 17 6 L 26 38 L 2 20 Z"
            fill="#F1E7D5"
            stroke="#D9B56F"
            strokeWidth={4}
            transform="translate(15 0) rotate(10 15 0)"
          />
          <path d="M -4 -38 L 7 -15 L -5 3 L 10 20" stroke="#8D6B5A" strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === 'paper_star' && star(0, 0, 1.25, Math.sin(time * 1.2) * 3, '#F7F0DC')}
      {kind === 'star_chain' && (
        <g>
          <path d="M -115 -4 Q 0 26 115 -4" stroke="#D8C59B" strokeWidth={5} fill="none" />
          {star(-92, 0, 0.88, -8, '#F7F0DC')}
          {star(0, 17, 1.02, 4, '#F7F0DC')}
          {star(92, 0, 0.88, 8, '#F7F0DC')}
        </g>
      )}
      {kind === 'dark_window' && (
        <g>
          <rect x="-170" y="-140" width="340" height="280" rx="12" fill="#101A2A" stroke="#AAB6C4" strokeWidth="13" />
          <path d="M 0 -132 V 132 M -162 0 H 162" stroke="#8296AA" strokeWidth="9" />
          <rect x="-154" y="-124" width="308" height="248" fill="#081321" opacity="0.55" />
        </g>
      )}
      {kind === 'window_stars' && (
        <g>
          <rect x="-170" y="-140" width="340" height="280" rx="12" fill="#17243A" stroke="#AAB6C4" strokeWidth="13" />
          <path d="M 0 -132 V 132 M -162 0 H 162" stroke="#8296AA" strokeWidth="9" />
          <circle cx="0" cy="0" r="112" fill="#EFCB78" opacity={0.42 + 0.06 * Math.sin(time * 2)} />
          {star(-78, -48, 0.68, -6, '#F4D98C')}
          {star(72, -44, 0.64, 8, '#F4D98C')}
          {star(0, 72, 0.58, 0, '#F4D98C')}
        </g>
      )}
      {kind === 'two_window_stars' && (
        <g>
          <rect x="-285" y="-112" width="210" height="224" rx="10" fill="#17243A" stroke="#AAB6C4" strokeWidth="12" />
          <path d="M -180 -106 V 106 M -279 0 H -81" stroke="#8296AA" strokeWidth="8" />
          <rect x="75" y="-112" width="210" height="224" rx="10" fill="#17243A" stroke="#AAB6C4" strokeWidth="12" />
          <path d="M 180 -106 V 106 M 81 0 H 279" stroke="#8296AA" strokeWidth="8" />
          <path d="M -75 4 Q 0 -35 75 4" stroke="#D8C59B" strokeWidth="7" fill="none" />
          <circle cx="-180" cy="0" r="82" fill="#EFCB78" opacity={0.38 + 0.05 * Math.sin(time * 2)} />
          <circle cx="180" cy="0" r="82" fill="#EFCB78" opacity={0.38 + 0.05 * Math.sin(time * 2)} />
          {star(-180, 0, 0.76, -5, '#F4D98C')}
          {star(180, 0, 0.76, 5, '#F4D98C')}
        </g>
      )}
      {kind === 'falling_star' && (
        <g>
          <path
            d="M -78 -28 L -22 -10"
            stroke="#F4D98C"
            strokeWidth={8}
            strokeLinecap="round"
            opacity={0.5}
          />
          {star(0, 0, 1.18, Math.sin(time * 2) * 8, '#F7F0DC')}
        </g>
      )}
    </g>
  );
};

const CupProp: React.FC<{
  kind?: FilmShot['prop'];
  x: number;
  y: number;
  time: number;
}> = ({kind, x, y, time}) => {
  if (!kind || ['falling_star', 'blank_page', 'folded_star', 'torn_star', 'paper_star', 'star_chain', 'window_stars', 'dark_window', 'two_window_stars'].includes(kind)) return null;
  const pot = (offset: number, stage: string) => (
    <g transform={'translate(' + offset + ' 0)'}>
      <path
        d="M -62 -126 L 62 -126 L 47 -10 Q 0 13 -47 -10 Z"
        fill="#C9D2D5"
        stroke="#718797"
        strokeWidth={9}
      />
      <ellipse cx={0} cy={-126} rx={62} ry={14} fill="#E4E9E8" stroke="#718797" strokeWidth={8} />
      <path
        d="M -8 -116 L 8 -90 L -5 -71 L 13 -48 L 2 -28"
        stroke="#8D665C"
        strokeWidth={8}
        fill="none"
        strokeLinecap="round"
      />
      {stage === 'leak' && (
        <g fill="#8BD6E7" opacity={0.9}>
          <path
            d="M 42 -18 q 18 18 0 34 q -18 -16 0 -34"
            transform={'translate(0 ' + Math.sin(time * 4) * 7 + ')'}
          />
          <path
            d="M -44 -2 q 13 14 0 25 q -13 -12 0 -25"
            transform={'translate(0 ' + Math.sin(time * 3 + 1) * 8 + ')'}
          />
        </g>
      )}
      {(stage === 'soil' || stage === 'sprout' || stage === 'flower') && (
        <ellipse cx={0} cy={-126} rx={55} ry={11} fill="#6A4C3A" />
      )}
      {(stage === 'sprout' || stage === 'flower') && (
        <g stroke="#77B77A" strokeWidth={9} fill="none" strokeLinecap="round">
          <path d="M 0 -132 Q -4 -174 0 -205" />
          <path d="M -2 -166 Q -43 -198 -56 -175" />
          <path d="M 2 -183 Q 42 -218 58 -193" />
        </g>
      )}
      {stage === 'flower' && (
        <g transform="translate(0 -214)">
          <circle r={13} fill="#F2C46E" />
          {Array.from({length: 6}, (_, i) => (
            <ellipse
              key={i}
              cx={0}
              cy={-24}
              rx={13}
              ry={23}
              fill="#E99AAB"
              transform={'rotate(' + i * 60 + ' 0 0)'}
            />
          ))}
        </g>
      )}
    </g>
  );
  if (kind === 'seed') {
    return (
      <g transform={'translate(' + (x - 70) + ' ' + (y - 18) + ')'}>
        <ellipse
          cx={0}
          cy={0}
          rx={17}
          ry={10}
          fill="#A77A42"
          transform={`rotate(${-25 + Math.sin(time * 3) * 12} 0 0)`}
        />
        <path d="M -8 -5 Q 0 -18 12 -12" stroke="#D5B27B" strokeWidth={4} fill="none" />
      </g>
    );
  }
  const stage =
    kind === 'leaking_cup' || kind === 'cracked_cup'
      ? 'leak'
      : kind === 'empty_cup'
        ? 'empty'
        : kind === 'soil_cup' || kind === 'planted_cup'
          ? 'soil'
          : kind === 'sprout_cup'
            ? 'sprout'
            : kind === 'flower_cup'
              ? 'flower'
              : 'soil';
  return (
    <g
      transform={
        'translate(' + x + ' ' + y + ') rotate(' + (kind === 'tipped_cup' ? 62 : 0) + ' 0 -70)'
      }
    >
      {kind === 'cup_garden' ? (
        <>
          {pot(-210, 'flower')}
          {pot(0, 'sprout')}
          {pot(210, 'flower')}
        </>
      ) : (
        pot(0, stage)
      )}
      {kind === 'cup_garden' && (
        <g fill="#F0C66F">
          <circle cx={-300} cy={-36} r={8} />
          <circle cx={300} cy={-42} r={8} />
        </g>
      )}
      {kind === 'tipped_cup' && <ellipse cx={-80} cy={-18} rx={40} ry={12} fill="#6A4C3A" />}
    </g>
  );
};

export const SilentFactoryReel: React.FC<FilmProps> = ({shots}) => {
  const frame = useCurrentFrame();
  const index = Math.min(FILM_SHOTS - 1, Math.floor(frame / SHOT_FRAMES));
  const shot = shots[index] || shots[0];
  const local = frame - index * SHOT_FRAMES;
  const time = local / FILM_FPS;
  const wave = Math.sin(time * 2.2 + index);
  const hero = expressivePose(shot.action, time, index);
  const viewVariant = index % 5;
  const zoom = viewVariant === 0 ? 1.09 : viewVariant === 3 ? 0.94 : 1;
  const dx = viewVariant === 2 ? -92 : viewVariant === 4 ? 100 : 0;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#0B1728'}}>
      <svg
        viewBox={'0 0 ' + W + ' ' + H}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        <Backdrop scene={shot.scene} index={index} time={time} weather={shot.weather} />
        <g
          transform={
            'translate(' + dx + ' 0) translate(960 540) scale(' + zoom + ') translate(-960 -540)'
          }
        >
          <CupProp kind={shot.prop} x={hero.hip.x + 100} y={FLOOR - 8} time={time} />
          <CharacterPuppet pose={hero} accessory="wristband" accent="#F2C46E" />
          <PaperStarProp
            kind={shot.prop}
            x={
              shot.prop === 'window_stars' ||
              shot.prop === 'dark_window' ||
              shot.prop === 'two_window_stars'
                ? 1450
                : shot.prop === 'star_chain'
                  ? hero.hip.x + 180
                  : hero.hands[1].x + 58
            }
            y={
              shot.prop === 'window_stars' ||
              shot.prop === 'dark_window' ||
              shot.prop === 'two_window_stars'
                ? 610
                : shot.prop === 'star_chain'
                  ? FLOOR - 230
                  : hero.hands[1].y - 28
            }
            time={time}
          />
          {shot.action === 'repair' && (
            <g opacity={0.9 + 0.1 * wave}>
              <rect
                x={hero.hands[1].x - 15}
                y={hero.hands[1].y - 75}
                width={25}
                height={120}
                rx={8}
                fill="#E8BA68"
                transform={
                  'rotate(' + 12 * wave + ' ' + hero.hands[1].x + ' ' + hero.hands[1].y + ')'
                }
              />
              <circle
                cx={hero.hands[1].x + 36}
                cy={hero.hands[1].y - 5}
                r={6 + 6 * Math.abs(wave)}
                fill="#F7C873"
              />
            </g>
          )}
          {(shot.action === 'help' || shot.action === 'offer') && (
            <g transform={'translate(360 80) scale(0.70)'}>
              <CharacterPuppet
                pose={expressivePose('help', time * 0.5, index + 2)}
                shadow={false}
                accessory="scarf"
                accent="#78BDE8"
              />
            </g>
          )}
        </g>
        <rect
          x={0}
          y={0}
          width={W}
          height={H}
          fill="#F3C68A"
          opacity={shot.scene === 'dawn' ? 0.055 : 0}
        />
        <rect
          x={0}
          y={0}
          width={W}
          height={H}
          fill="#000"
          opacity={
            clamp(Math.min(local, SHOT_FRAMES - local) / 7) < 1
              ? (1 - clamp(Math.min(local, SHOT_FRAMES - local) / 7)) * 0.12
              : 0
          }
        />
      </svg>
      <Caption shot={shot} local={local} />
    </AbsoluteFill>
  );
};
