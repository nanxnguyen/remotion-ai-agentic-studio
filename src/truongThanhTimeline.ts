// "Đừng sợ phải trả giá cho sự trưởng thành". Durations = measured TTS (public/audio/truongthanh) + breathing room.
export const TT_TOTAL = 1613;

export const TT_SHOTS = {
  open: {from: 0, duration: 175, voice: 's1', sec: 5.3},
  bill: {from: 175, duration: 394, voice: 's2', sec: 12.62},
  debt: {from: 569, duration: 297, voice: 's3', sec: 9.38},
  pain: {from: 866, duration: 204, voice: 's4', sec: 6.29},
  paid: {from: 1070, duration: 201, voice: 's5', sec: 6.19},
  wake: {from: 1271, duration: 342, voice: 's6', sec: 9.98},
} as const;

export const TT_VOICE_OFFSET = 4;

export const TT_SFX = [
  {shot: 'open', offset: 58, src: 'paper-move.mp3', volume: 0.3},
  {shot: 'bill', offset: 56, src: 'typewriter.mp3', volume: 0.16, duration: 60},
  {shot: 'bill', offset: 196, src: 'typewriter.mp3', volume: 0.16, duration: 50},
  {shot: 'bill', offset: 276, src: 'typewriter.mp3', volume: 0.16, duration: 60},
  {shot: 'debt', offset: 112, src: 'click.mp3', volume: 0.25},
  {shot: 'pain', offset: 80, src: 'shimmer.mp3', volume: 0.18},
  // impact.mp3 peak latency ~16.5f: start early so the hit lands on the stamp at offset 150.
  {shot: 'paid', offset: 134, src: 'impact.mp3', volume: 0.36},
  {shot: 'wake', offset: 150, src: 'riser.mp3', volume: 0.16, duration: 100},
  {shot: 'wake', offset: 250, src: 'shimmer.mp3', volume: 0.22},
] as const;
