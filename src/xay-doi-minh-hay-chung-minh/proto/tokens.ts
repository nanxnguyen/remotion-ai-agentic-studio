// Design tokens — xay-doi-minh-hay-chung-minh (from brief Style, locked by design-agent)
// Must NOT resemble truongthanh (black/white/orange), claude-mem (cream/clay), Understand Anything (dark/gold).
export const C = {
  cobaltTop: '#141B6B',
  cobaltBot: '#2A36C9',
  sen: '#FF2E9A',
  senLight: '#FF5CB3',
  senDark: '#B3126A',
  lampWhite: '#F3F6FF',
  ice: '#8FE3FF', // window light + the ONLY "họ" accent (s9a)
  boardBack: '#7A7FA6', // raw cardboard back
  tape: '#D9DCF2',
  jade: '#19C48A', // appears in-scene only from s10; accent for "xây cho mình"
  dawnTop: '#DDEBFF',
  dawnBot: '#F2FBF6',
  ink: '#0A0F3D', // outline + caption pill
  shirt: '#E9EEFF',
  pants: '#1A2060',
  hat: '#FFA3D1',
  wood: '#8A6B46', // ladder / brace timber (tool, not accent)
  sun: '#FFC46B', // first morning sun, s10–s11 only
  labelGrey: '#8B93C9',
} as const;

export const F_HEAD = "'Bricolage Grotesque', 'Archivo', sans-serif";
export const F_BODY = "'Archivo', sans-serif";

// Seeded pseudo-random (frame-driven only; no Math.random/Date.now)
export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
