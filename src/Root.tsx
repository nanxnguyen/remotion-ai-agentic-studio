import React from 'react';
import {Composition} from 'remotion';
import {videoRegistry} from './videos/registry';

export const Root: React.FC = () => (
  <>
    {videoRegistry.map((video) => (
      <Composition
        key={video.id}
        id={video.id}
        component={video.component}
        durationInFrames={video.durationInFrames}
        fps={video.fps}
        width={video.width}
        height={video.height}
        {...('defaultProps' in video ? {defaultProps: video.defaultProps} : {})}
      />
    ))}
  </>
);
