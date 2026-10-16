// Timeline — xay-doi-minh-hay-chung-minh (director, Phase 7)
// Source of truth: measured HoaiMy voice (51.75s) + AUD-T1 trimmed holds (7.45s) = 59.20s = 1776f @30fps.
// Voice.json byte-locked since gate A; E02 s6 cuts on measured "khong" onsets; BGM offset +3.0s (mix-plan).

export const XDM_FPS = 30;
export const XDM_TOTAL = 1776;

export type XdmShotKey =
  | 's1'
  | 's2a'
  | 's2b'
  | 's3'
  | 's4'
  | 's5a1'
  | 's5a2'
  | 's5b'
  | 's6'
  | 's7a'
  | 's7b'
  | 's8'
  | 's9a'
  | 's9b'
  | 's10'
  | 's11';

export interface XdmShot {
  key: XdmShotKey;
  from: number;
  durationInFrames: number;
  /** Voice clip file (under public/audio/xay-doi-minh-hay-chung-minh/). */
  voice: string;
  /** Voice entry offset inside the shot, in frames (s6 has 0.30s lead-in). */
  voiceOffset: number;
}

const F = (seconds: number): number => Math.round(seconds * XDM_FPS);

export const XDM_SHOTS: Record<XdmShotKey, XdmShot> = {
  s1: {key: 's1', from: 0, durationInFrames: 105, voice: 's1.mp3', voiceOffset: 0},
  s2a: {key: 's2a', from: 105, durationInFrames: 132, voice: 's2a.mp3', voiceOffset: 0},
  s2b: {key: 's2b', from: 237, durationInFrames: 100, voice: 's2b.mp3', voiceOffset: 0},
  s3: {key: 's3', from: 337, durationInFrames: 151, voice: 's3.mp3', voiceOffset: 0},
  s4: {key: 's4', from: 488, durationInFrames: 133, voice: 's4.mp3', voiceOffset: 0},
  s5a1: {key: 's5a1', from: 621, durationInFrames: 39, voice: 's5a1.mp3', voiceOffset: 0},
  s5a2: {key: 's5a2', from: 660, durationInFrames: 88, voice: 's5a2.mp3', voiceOffset: 0},
  s5b: {key: 's5b', from: 748, durationInFrames: 184, voice: 's5b.mp3', voiceOffset: 0},
  // s6: 0.30s silent lead-in, voice entry at +9f; 3 "khong" cuts on measured onsets.
  s6: {key: 's6', from: 932, durationInFrames: 126, voice: 's6.mp3', voiceOffset: 9},
  s7a: {key: 's7a', from: 1058, durationInFrames: 91, voice: 's7a.mp3', voiceOffset: 0},
  s7b: {key: 's7b', from: 1149, durationInFrames: 67, voice: 's7b.mp3', voiceOffset: 0},
  s8: {key: 's8', from: 1216, durationInFrames: 138, voice: 's8.mp3', voiceOffset: 0},
  s9a: {key: 's9a', from: 1354, durationInFrames: 79, voice: 's9a.mp3', voiceOffset: 0},
  s9b: {key: 's9b', from: 1433, durationInFrames: 82, voice: 's9b.mp3', voiceOffset: 0},
  s10: {key: 's10', from: 1515, durationInFrames: 144, voice: 's10.mp3', voiceOffset: 0},
  s11: {key: 's11', from: 1659, durationInFrames: 117, voice: 's11.mp3', voiceOffset: 0},
};

/** s6 "khong" cut frames, shot-relative (E02, measured onsets 1.48/2.26/2.96s). */
export const XDM_S6_CUTS_SHOT = [F(1.48), F(2.26), F(2.96)];
/** s6 cut frames, absolute. */
export const XDM_S6_CUTS_ABS = XDM_S6_CUTS_SHOT.map((f) => XDM_SHOTS.s6.from + f);

export interface XdmSfx {
  shot: XdmShotKey;
  /** Offset from shot start, in frames. */
  offset: number;
  file: string;
  /** Gain in dB for the Reel mix. */
  gainDb: number;
  trimFrames: number;
}

// Anchored cue table (audio-agent round 2, AUD-T3..T5, E09 hum lift).
export const XDM_SFX: XdmSfx[] = [
  {shot: 's1', offset: 0, file: 'sfx-bulb-hum.mp3', gainDb: -24, trimFrames: 105},
  {shot: 's2a', offset: F(4.18), file: 'sfx-glass-clink.mp3', gainDb: -22, trimFrames: 8},
  {shot: 's3', offset: F(0.41), file: 'sfx-engrave.mp3', gainDb: -22, trimFrames: 11},
  {shot: 's3', offset: F(1.37), file: 'sfx-brick-a.mp3', gainDb: -20, trimFrames: 15},
  {shot: 's3', offset: F(2.15), file: 'sfx-brick-b.mp3', gainDb: -23, trimFrames: 15},
  {shot: 's3', offset: F(2.85), file: 'sfx-brick-a.mp3', gainDb: -26, trimFrames: 15},
  {shot: 's7b', offset: F(1.95), file: 'sfx-chalk.mp3', gainDb: -26, trimFrames: 11},
  {shot: 's9a', offset: F(2.3), file: 'sfx-window-off.mp3', gainDb: -16, trimFrames: 6},
  {shot: 's9b', offset: 0, file: 'sfx-bulb-hum.mp3', gainDb: -24, trimFrames: 83},
  {shot: 's10', offset: F(2.46), file: 'sfx-brick-soft.mp3', gainDb: -27, trimFrames: 15},
  {shot: 's10', offset: F(4.64), file: 'sfx-chalk.mp3', gainDb: -26, trimFrames: 11},
];

/** BGM: bed file starts at video t=+3.0s (AUD-T2); dawn (file 48s) lands at video 51.0s ≈ s10. */
export const XDM_BGM_OFFSET_FRAMES = F(3.0);
export const XDM_AUDIO_DIR = 'xay-doi-minh-hay-chung-minh';
