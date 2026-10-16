// Timeline — thuong-hay-so-bat-dau-lai (director-owned).
// Frames @30fps from task-review.md §4 (ffprobe voice 52.60s + tails/gaps/silence).
// THS_TOTAL = 1769f = 58.97s (40–60s).
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export type ShotSpan = {from: number; duration: number; voiceFrom: number; voiceDuration: number};

export const THS_TOTAL = 1769;

// Shot ranges (inclusive from, duration). Voice spans where the clip plays.
export const SHOTS: Record<string, ShotSpan> = {
  s1: {from: 0, duration: 114, voiceFrom: 0, voiceDuration: 103},
  s2: {from: 114, duration: 142, voiceFrom: 114, voiceDuration: 131},
  s3: {from: 256, duration: 121, voiceFrom: 256, voiceDuration: 110},
  s4a: {from: 377, duration: 43, voiceFrom: 377, voiceDuration: 43},
  s4b: {from: 429, duration: 119, voiceFrom: 429, voiceDuration: 108},
  s5: {from: 548, duration: 174, voiceFrom: 548, voiceDuration: 163},
  s6a: {from: 722, duration: 134, voiceFrom: 722, voiceDuration: 134},
  s6b: {from: 868, duration: 131, voiceFrom: 868, voiceDuration: 120},
  s7a: {from: 999, duration: 153, voiceFrom: 999, voiceDuration: 153},
  s7b: {from: 1161, duration: 56, voiceFrom: 1161, voiceDuration: 45},
  s8: {from: 1217, duration: 161, voiceFrom: 1217, voiceDuration: 150},
  s9: {from: 1378, duration: 202, voiceFrom: 1378, voiceDuration: 191},
  s10: {from: 1580, duration: 189, voiceFrom: 1580, voiceDuration: 132},
};

// Gaps/holds between split keys (frames, no voice): s4 420–428, s6 856–867, s7 1152–1160.
// Closing silence: s10 voice ends 1711, hold to 1768 (57f ≈ 1.9s pure silence).
export const GAPS = {
  s4: {from: 420, duration: 9},
  s6: {from: 856, duration: 12},
  s7: {from: 1152, duration: 9},
};
export const SILENCE_END = {from: 1712, duration: 57};

// Voice clip file per key (public/audio/thuong-hay-so-bat-dau-lai/<file>).
export const VOICE: Record<string, string> = {
  s1: 's1.mp3',
  s2: 's2.mp3',
  s3: 's3.mp3',
  s4a: 's4a.mp3',
  s4b: 's4b.mp3',
  s5: 's5.mp3',
  s6a: 's6a.mp3',
  s6b: 's6b.mp3',
  s7a: 's7a.mp3',
  s7b: 's7b.mp3',
  s8: 's8.mp3',
  s9: 's9.mp3',
  s10: 's10.mp3',
};

// SFX cues: offset relative to shot start (frames), gain linear. From assets-manifest mix plan.
export type SfxCue = {shot: string; offset: number; src: string; volume: number; duration: number};
export const SFX: SfxCue[] = [
  {shot: 's2', offset: 90, src: 'sfx-cooker-click.mp3', volume: 0.6, duration: 5},
  {shot: 's3', offset: 18, src: 'sfx-soup.mp3', volume: 0.35, duration: 31},
  {shot: 's4a', offset: 36, src: 'sfx-humcut.mp3', volume: 0.3, duration: 36},
  {shot: 's5', offset: 108, src: 'sfx-keys-a.mp3', volume: 0.5, duration: 34},
  {shot: 's6a', offset: 0, src: 'sfx-rewind.mp3', volume: 0.4, duration: 14},
  {shot: 's6a', offset: 135, src: 'sfx-exhale.mp3', volume: 0.5, duration: 11},
  {shot: 's6b', offset: 108, src: 'sfx-keys-b.mp3', volume: 0.42, duration: 33},
  {shot: 's7a', offset: 72, src: 'sfx-converge.mp3', volume: 0.25, duration: 38},
  {shot: 's8', offset: 6, src: 'sfx-keys-a.mp3', volume: 0.35, duration: 34},
  {shot: 's9', offset: 15, src: 'sfx-msg.mp3', volume: 0.3, duration: 32},
];

// Mix (audio-agent plan): bed 0.22 (−13.2dB), duck 0.11 (−19.2dB, ramp 6f), swell holds 0.28.
// BGM fades to 0 over 9f at s10 "không?" (voice end 1711) into pure closing silence.
export const MIX = {
  bed: 0.22,
  duck: 0.11,
  duckRamp: 6,
  swell: 0.28,
  bgmFadeStart: 1703,
  bgmFadeDur: 9,
};

export const TOTAL = THS_TOTAL;
