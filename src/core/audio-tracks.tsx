import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

export type AudioTrack = Readonly<{
  src: string;
  from?: number;
  durationInFrames?: number;
  volume?: number;
  startFrom?: number;
}>;

const resolveSource = (src: string) =>
  /^(?:https?:|data:|blob:)/.test(src) ? src : staticFile(src);

export const AudioTrackPlayer: React.FC<AudioTrack> = ({
  src,
  from = 0,
  durationInFrames,
  volume = 1,
  startFrom = 0,
}) => (
  <Sequence from={from} durationInFrames={durationInFrames} layout="none">
    <Audio src={resolveSource(src)} volume={volume} startFrom={startFrom} />
  </Sequence>
);

export const VoiceTrack = AudioTrackPlayer;

export const SfxTrack: React.FC<AudioTrack> = (props) => (
  <AudioTrackPlayer volume={0.8} {...props} />
);

export const BackgroundMusic: React.FC<AudioTrack> = (props) => (
  <AudioTrackPlayer volume={0.12} {...props} />
);
