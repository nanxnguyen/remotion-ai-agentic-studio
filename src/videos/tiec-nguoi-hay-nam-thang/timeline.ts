// Timeline — tiec-nguoi-hay-nam-thang (voice-driven, measured)
// Shot duration = ceil(measured clip frames) + semantic hold. Nothing is estimated.
// Durations measured with ffprobe on public/audio/tiec-nguoi-hay-nam-thang/*.mp3
// (Thanh Long clone, VieNeu-TTS v3 Turbo). Evidence: docs/tiec-nguoi-hay-nam-thang/voice-final-asr.md
//
// Holds are semantic, not padding:
//   s1 question lands; s2 quote ends; s3 narration names the silence ("im lặng một lúc");
//   s4 memory -> present turn; s5 narration names the silence again ("không kể thêm");
//   s6 fear -> meaning turn; s7 meaning -> final question;
//   s8 the 60-frame (2.0s) closing hold mandated by Gate A ticket A-C7.

export const FPS = 30;

// ffprobe format=duration, s1..s8, in seconds.
export const MEASURED_SECONDS = [
  3.287958, 4.891625, 3.296208, 5.471417, 3.429583, 5.689958, 5.090958, 6.334458,
] as const;

// Hold after each clip, in frames.
export const HOLDS = [30, 24, 48, 27, 48, 27, 30, 60] as const;

const VOICE_FRAMES = MEASURED_SECONDS.map((seconds) => Math.ceil(seconds * FPS));
const TOTALS = VOICE_FRAMES.map((voice, index) => voice + HOLDS[index]);

export interface Shot {
  id: string;
  from: number;
  duration: number;
  /** frames of measured voice at the head of the shot */
  voice: number;
  /** frames of hold after the voice ends */
  hold: number;
}

export const SPANS: Shot[] = TOTALS.map((duration, index) => ({
  id: `s${index + 1}`,
  from: TOTALS.slice(0, index).reduce((a, b) => a + b, 0),
  duration,
  voice: VOICE_FRAMES[index],
  hold: HOLDS[index],
}));

export const TOTAL_FRAMES = TOTALS.reduce((a, b) => a + b, 0);
export const TOTAL_SECONDS = TOTAL_FRAMES / FPS;
