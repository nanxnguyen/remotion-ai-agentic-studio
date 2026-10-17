// workbench.ts — chung-minh-de-lam-gi manifest for video-shotcraft workbench (director owns)
// Tables imported from timeline.ts per SC/references/workbench.md §2.
import {CMD_SHOTS, CMD_TOTAL} from './timeline';

export const WORKBENCH = {
  slug: 'chung-minh-de-lam-gi',
  compId: 'ChungMinhDeLamGiReel',
  totalFrames: CMD_TOTAL,
  fps: 30,
  width: 1080,
  height: 1920,
  shots: Object.values(CMD_SHOTS).map((s) => ({
    id: s.key,
    from: s.from,
    duration: s.durationInFrames,
    voice: s.voice,
  })),
  audioDir: 'chung-minh-de-lam-gi',
};
