// Timeline — ban-khong-can-tro-thanh-ai-khac-de-duoc-yeu (voice-driven, measured)
// Shot duration = ceil(measured clip frames) + semantic hold. Nothing is estimated.
// Durations from join-notes.md (script estimates used pending real voice:measure re-run).
// Holds are semantic, not padding:
//   s1 question lands; s2 quote ends; s3 silence named; s4 memory->present turn;
//   s5 question holds; s6 core question breath; s7 meaning lands; s8 mutual adjust;
//   s9 final wish + 60-frame (2.0s) closing hold.

export const FPS = 30;

// Script-estimated voice seconds (pending real measurement from voice:measure)
export const ESTIMATED_SECONDS = [
  5.4, 6.3, 4.9, 6.6, 3.9, 3.3, 7.3, 4.9, 5.9,
] as const; // s1..s9 (s6a+s6b combined = 3.3s)

// Semantic holds after each shot, in frames
export const HOLDS = [30, 24, 36, 27, 30, 45, 30, 30, 60] as const;

const VOICE_FRAMES = ESTIMATED_SECONDS.map((seconds) => Math.ceil(seconds * FPS));
const TOTALS = VOICE_FRAMES.map((voice, index) => voice + HOLDS[index]);

export interface Shot {
  id: string;
  from: number;
  duration: number;
  voice: number;
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

// Re-export for voice:measure compatibility
export const VOICE_SECONDS = {
  s1: ESTIMATED_SECONDS[0],
  s2: ESTIMATED_SECONDS[1],
  s3: ESTIMATED_SECONDS[2],
  s4: ESTIMATED_SECONDS[3],
  s5: ESTIMATED_SECONDS[4],
  s6a: 1.8,
  s6b: 1.5,
  s7: ESTIMATED_SECONDS[6],
  s8: ESTIMATED_SECONDS[7],
  s9: ESTIMATED_SECONDS[8],
} as const;