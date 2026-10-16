// claude-mem reel timeline. Durations = measured TTS length (public/audio/cm/*.mp3) + breathing room.
export const CM_TOTAL = 1628;

export const CM_SHOTS = {
  hook: {from: 0, duration: 302, voice: 's1'},
  pain: {from: 302, duration: 174, voice: 's2'},
  hooks: {from: 476, duration: 270, voice: 's3'},
  store: {from: 746, duration: 177, voice: 's4'},
  recall: {from: 923, duration: 404, voice: 's5'},
  outro: {from: 1327, duration: 301, voice: 's6'},
} as const;

export const CM_VOICE_OFFSET = 4;

export const CM_SFX = [
  {shot: 'hook', offset: 8, src: 'paper-move.mp3', volume: 0.3},
  {shot: 'hook', offset: 100, src: 'sweep.mp3', volume: 0.34},
  {shot: 'hook', offset: 215, src: 'click.mp3', volume: 0.35},
  {shot: 'pain', offset: 8, src: 'typewriter.mp3', volume: 0.22, duration: 90},
  {shot: 'pain', offset: 110, src: 'sweep.mp3', volume: 0.3},
  {shot: 'hooks', offset: 6, src: 'scan.mp3', volume: 0.25},
  {shot: 'hooks', offset: 150, src: 'click.mp3', volume: 0.3},
  {shot: 'store', offset: 10, src: 'sweep.mp3', volume: 0.3},
  {shot: 'store', offset: 70, src: 'click.mp3', volume: 0.3},
  {shot: 'recall', offset: 6, src: 'shimmer.mp3', volume: 0.22},
  {shot: 'recall', offset: 118, src: 'click.mp3', volume: 0.3},
  {shot: 'recall', offset: 262, src: 'scan.mp3', volume: 0.25},
  {shot: 'outro', offset: 6, src: 'riser.mp3', volume: 0.2, duration: 100},
  {shot: 'outro', offset: 100, src: 'impact.mp3', volume: 0.36},
  {shot: 'outro', offset: 150, src: 'shimmer.mp3', volume: 0.24},
] as const;
