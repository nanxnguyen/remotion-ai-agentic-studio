import {defineVideo} from '../../core';
import {SilentFactoryReel, FILM_DURATION_FRAMES} from './Reel';
import type {FilmShot} from './Reel';

const defaults: FilmShot[] = Array.from({length: 36}, (_, i) => ({
  id: 'shot-' + String(i + 1).padStart(2, '0'),
  action: (['walk', 'reach', 'stumble', 'repair', 'help', 'rise'] as const)[i % 6],
  scene: (['city', 'stairs', 'workshop', 'bridge', 'dawn'] as const)[Math.floor(i / 7.2) % 5],
  caption: 'Every small step matters.',
  highlight: 'step',
  palette: 'hope' as const,
}));

export const silentFactoryLongformVideo = defineVideo({
  id: 'SilentFactoryLongform',
  slug: 'silent-factory-longform',
  component: SilentFactoryReel,
  durationInFrames: FILM_DURATION_FRAMES,
  fps: 30,
  width: 2560,
  height: 1440,
  defaultProps: {title: 'Silent Factory 2K', shots: defaults},
  testFrames: [0, 175, 1250, 3150, 5000, 6299],
});
