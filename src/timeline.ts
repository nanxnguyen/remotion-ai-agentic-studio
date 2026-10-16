export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const TOTAL = 1290;

export const SHOTS = {
  hook: {from: 0, duration: 303},
  pain: {from: 303, duration: 151},
  reveal: {from: 454, duration: 120},
  proof: {from: 574, duration: 99},
  search: {from: 673, duration: 387},
  outro: {from: 1060, duration: 230},
} as const;

export const SFX = [
  {shot: 'hook', offset: 30, src: 'paper-move.mp3', volume: 0.34},
  {shot: 'pain', offset: 10, src: 'sweep.mp3', volume: 0.34},
  {shot: 'reveal', offset: 14, src: 'typewriter.mp3', volume: 0.24, duration: 90},
  {shot: 'reveal', offset: 55, src: 'scan.mp3', volume: 0.25},
  // impact.mp3 has a measured 16.5f peak latency; start early so its peak lands on f606.
  {shot: 'proof', offset: 15, src: 'impact.mp3', volume: 0.36},
  {shot: 'search', offset: 36, src: 'typewriter.mp3', volume: 0.19, duration: 70},
  {shot: 'search', offset: 105, src: 'click.mp3', volume: 0.35},
  {shot: 'outro', offset: 12, src: 'riser.mp3', volume: 0.22, duration: 95},
  // Same peak compensation: source starts at f1152, main hit lands at f1168.
  {shot: 'outro', offset: 91, src: 'impact.mp3', volume: 0.40},
  {shot: 'outro', offset: 145, src: 'shimmer.mp3', volume: 0.24},
] as const;
