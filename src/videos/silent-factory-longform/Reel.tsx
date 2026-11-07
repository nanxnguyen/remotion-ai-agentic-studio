import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {CharacterPuppet} from '../../animation/CharacterPuppet';
import {locomotionPose, solveTwoBone} from '../../animation/character-motion';
import type {CharacterPose, Point} from '../../animation/character-motion';
import {DoorFilm} from './door/DoorFilm';

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
  | 'pause';
export type StickScene = 'city' | 'stairs' | 'workshop' | 'bridge' | 'dawn';
export type FilmShot = {
  id: string;
  action: StickAction;
  scene: StickScene;
  caption: string;
  highlight: string;
  palette?: 'cold' | 'warm' | 'hope';
};
export type FilmProps = {title: string; shots: FilmShot[]; film?: string};
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
  const drop = action === 'stumble' ? 95 * lift : action === 'pause' ? 25 * lift : 0;
  const lean = action === 'stumble' ? 90 * lift : action === 'reach' ? 24 * lift : 0;
  const shoulder = point(base.shoulder, lean, drop);
  const hip = point(base.hip, lean * 0.3, drop * 0.55);
  const head = point(base.head, lean, drop);
  const arm = (side: 0 | 1): Point => {
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
  const hands: readonly [Point, Point] = [arm(0), arm(1)];
  const left = solveTwoBone(point(shoulder, -28, 0), hands[0], 103, 100, -1);
  const right = solveTwoBone(point(shoulder, 28, 0), hands[1], 103, 100, 1);
  return {
    ...base,
    shoulder,
    hip,
    head,
    hands: [left.end, right.end],
    elbows: [left.joint, right.joint],
    expression:
      action === 'stumble' || action === 'pause'
        ? 'tired'
        : ['repair', 'run', 'reach'].includes(action)
          ? 'focused'
          : 'calm',
  };
}

const Backdrop: React.FC<{scene: StickScene; index: number; time: number}> = ({
  scene,
  index,
  time,
}) => {
  const dawn = scene === 'dawn';
  const warm = dawn || scene === 'workshop';
  const sky = dawn ? '#456079' : warm ? '#253244' : '#0C172A';
  const ground = warm ? '#263B4B' : '#14243A';
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

export const SilentFactoryReel: React.FC<FilmProps> = ({shots, film}) => {
  if (film === 'a-door-for-tomorrow') return <DoorFilm shots={shots} />;
  return <GenericReel shots={shots} title="" />;
};

const GenericReel: React.FC<FilmProps> = ({shots}) => {
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
        <Backdrop scene={shot.scene} index={index} time={time} />
        <g
          transform={
            'translate(' + dx + ' 0) translate(960 540) scale(' + zoom + ') translate(-960 -540)'
          }
        >
          <CharacterPuppet pose={hero} />
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
          {shot.action === 'help' && (
            <g transform={'translate(360 80) scale(0.70)'}>
              <CharacterPuppet
                pose={expressivePose('pause', time * 0.5, index + 2)}
                shadow={false}
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
