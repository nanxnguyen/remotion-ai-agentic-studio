import {defineSequentialTimeline} from './video-definition';

export type VoicePadding = Readonly<{leadInFrames?: number; holdFrames?: number}>;

export type VoiceShot<Id extends string = string> = VoicePadding &
  Readonly<{
    id: Id;
    // Measured clip length (scripts/measure-voice.mjs), never an estimate.
    voiceSeconds: number;
    voice?: string;
  }>;

type VoiceTimelineShot = Readonly<{
  from: number;
  duration: number;
  voice?: string;
  // Frame offset of the clip inside the shot; present only when there is a lead-in.
  voiceFrom?: number;
}>;

export type VoiceTimeline<Id extends string> = Readonly<{
  shots: Readonly<Record<Id, VoiceTimelineShot>>;
  totalDurationInFrames: number;
}>;

const assertPadding = (label: string, value: number): void => {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer`);
  }
};

// Rounds up (with a float tolerance) so the last spoken syllable is never cut by the next shot.
export const framesForVoice = (
  seconds: number,
  fps: number,
  {leadInFrames = 0, holdFrames = 0}: VoicePadding = {},
): number => {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    throw new Error(`voice length must be a positive number of seconds, got ${seconds}`);
  }
  if (!Number.isInteger(fps) || fps <= 0) throw new Error('fps must be a positive integer');
  assertPadding('leadInFrames', leadInFrames);
  assertPadding('holdFrames', holdFrames);
  return leadInFrames + Math.ceil(seconds * fps - 1e-6) + holdFrames;
};

export const defineVoiceTimeline = <const T extends readonly VoiceShot[]>(
  definitions: T,
  fps: number,
): VoiceTimeline<T[number]['id']> => {
  const base = defineSequentialTimeline(
    definitions.map((shot) => ({
      id: shot.id,
      durationInFrames: framesForVoice(shot.voiceSeconds, fps, shot),
      ...(shot.voice ? {voice: shot.voice} : {}),
    })),
  );
  const shots: Record<string, VoiceTimelineShot> = {};
  for (const shot of definitions) {
    const lead = shot.leadInFrames ?? 0;
    shots[shot.id] = Object.freeze({...base.shots[shot.id], ...(lead ? {voiceFrom: lead} : {})});
  }
  return Object.freeze({
    shots: Object.freeze(shots) as Readonly<Record<T[number]['id'], VoiceTimelineShot>>,
    totalDurationInFrames: base.totalDurationInFrames,
  });
};
