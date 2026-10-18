// Director-owned workbench manifest for the 16-key story reel.
import {KEYS} from './workbench-keys';
import {timeline} from './timeline';
import {VOICE_SECONDS} from './voice-durations';

export const WORKBENCH = {
  slug: 'dung-bien-tuoi-30-thanh-ban-an',
  compId: 'DungBienTuoi30ThanhBanAnReel',
  fps: 30,
  width: 1080,
  height: 1920,
  totalFrames: timeline.totalDurationInFrames,
  shots: KEYS.map((key, index) => {
    const shot = timeline.shots[`scene${String(index + 1).padStart(2, '0')}` as keyof typeof timeline.shots];
    return {id: key, from: shot.from, duration: shot.duration, voiceSeconds: VOICE_SECONDS[key]};
  }),
  audioDir: 'dung-bien-tuoi-30-thanh-ban-an',
} as const;
