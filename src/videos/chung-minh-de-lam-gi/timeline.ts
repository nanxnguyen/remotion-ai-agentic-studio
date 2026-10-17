// Timeline — chung-minh-de-lam-gi (director, Phase 7 scaffold)
// Source of truth: measured Thanh-Long-Nang-Cao voice (49.55s) + locked gaps/holds (6.05s) = 55.60s = 1668f @30fps.
// voice.json byte-locked since gate A; every voiceOffset = 0 (voice placed at shot.from per join-notes §82).

export const CMD_FPS = 30;
export const CMD_TOTAL = 1668;

export type CmdShotKey =
  | 's1' | 's2a' | 's2b' | 's3' | 's4a' | 's4b' | 's5'
  | 's6' | 's7a' | 's7b' | 's8' | 's9a' | 's9b' | 's10' | 's11';

export interface CmdShot {
  key: CmdShotKey;
  from: number;
  durationInFrames: number;
  voice: string;
  voiceOffset: number;
}

const F = (seconds: number): number => Math.round(seconds * CMD_FPS);

export const CMD_SHOTS: Record<CmdShotKey, CmdShot> = {
  s1: { key: 's1', from: 0, durationInFrames: 66, voice: 's1.mp3', voiceOffset: 0 },
  s2a: { key: 's2a', from: 73, durationInFrames: 101, voice: 's2a.mp3', voiceOffset: 0 },
  s2b: { key: 's2b', from: 182, durationInFrames: 88, voice: 's2b.mp3', voiceOffset: 0 },
  s3: { key: 's3', from: 283, durationInFrames: 114, voice: 's3.mp3', voiceOffset: 0 },
  s4a: { key: 's4a', from: 416, durationInFrames: 110, voice: 's4a.mp3', voiceOffset: 0 },
  s4b: { key: 's4b', from: 535, durationInFrames: 116, voice: 's4b.mp3', voiceOffset: 0 },
  s5: { key: 's5', from: 658, durationInFrames: 82, voice: 's5.mp3', voiceOffset: 0 },
  s6: { key: 's6', from: 737, durationInFrames: 116, voice: 's6.mp3', voiceOffset: 0 },
  s7a: { key: 's7a', from: 845, durationInFrames: 107, voice: 's7a.mp3', voiceOffset: 0 },
  s7b: { key: 's7b', from: 944, durationInFrames: 107, voice: 's7b.mp3', voiceOffset: 0 },
  s8: { key: 's8', from: 1055, durationInFrames: 123, voice: 's8.mp3', voiceOffset: 0 },
  s9a: { key: 's9a', from: 1190, durationInFrames: 97, voice: 's9a.mp3', voiceOffset: 0 },
  s9b: { key: 's9b', from: 1312, durationInFrames: 100, voice: 's9b.mp3', voiceOffset: 0 },
  s10: { key: 's10', from: 1412, durationInFrames: 97, voice: 's10.mp3', voiceOffset: 0 },
  s11: { key: 's11', from: 1508, durationInFrames: 160, voice: 's11.mp3', voiceOffset: 0 },
};

// Mix-plan audio cues (shot-relative seconds → absolute frames); gains ≤ −16 dB.
// s1 ting: 0.90s → abs 27f, ends 1.20s (no SFX under first two words — AR-02).
// s3 taps: noun-tail anchored +0.05s post word-end (AR-03): 1.51/2.29/3.13s.
// s9a drip-b: 3.70s (last-word end +0.02), ends within timeline gap before s9b.
// s4a/s8: applause texture whole shot (−26 dB).
export interface CmdSfx {
  shot: CmdShotKey;
  offset: number;
  file: string;
  gainDb: number;
  trimFrames: number;
}

export const CMD_SFX: CmdSfx[] = [
  { shot: 's1', offset: F(0.90), file: 'sfx-ting.mp3', gainDb: -18, trimFrames: 9 },
  { shot: 's3', offset: F(1.51), file: 'sfx-tap-a.mp3', gainDb: -18, trimFrames: 8 },
  { shot: 's3', offset: F(2.29), file: 'sfx-tap-b.mp3', gainDb: -21, trimFrames: 7 },
  { shot: 's3', offset: F(3.13), file: 'sfx-tap-a.mp3', gainDb: -24, trimFrames: 5 },
  { shot: 's4a', offset: 0, file: 'sfx-applause.mp3', gainDb: -26, trimFrames: 110 },
  { shot: 's8', offset: 0, file: 'sfx-applause.mp3', gainDb: -26, trimFrames: 123 },
  { shot: 's9a', offset: F(3.70), file: 'sfx-drip-b.mp3', gainDb: -16, trimFrames: 11 },
];

// BGM: starts at video t=0 (no offset), no loop, truncate at end.
// Bed −11.1 dB (0.279); gap-lift −7.1 dB (0.442); s9a −18.1 dB (0.124); s9b −24.1 dB (0.062); OFF s10–s11; pure silence 53.60–55.60s.
export const CMD_BGM_KEYS: Array<[number, number]> = [
  [0, 0],
  [36, 0.279],
  [496, 0.279],   // s4a boundary: keep bed while applause carries the lift
  [498, 0.442],   // gap lift
  [500, 0.442],
  [502, 0.279],
  [1055, 0.279],  // s8 applause keeps bed
  [1057, 0.442],
  [1059, 0.442],
  [1061, 0.279],
  [1190, 0.279],
  [1190, 0.124],  // s9a night deepens
  [1312, 0.062],  // s9b lower
  [1400, 0],      // 46.67s fade-out start → silence by s10
  [CMD_TOTAL, 0],
];

export const CMD_AUDIO_DIR = 'chung-minh-de-lam-gi';
