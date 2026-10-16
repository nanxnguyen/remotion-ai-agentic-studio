import type {CSSProperties} from 'react';

export const colors = {
  bg: '#090909', panel: '#151515', panel2: '#1c1b1a', text: '#f5f0eb', muted: '#9a948d',
  gold: '#d4a574', gold2: '#e8c49a', violet: '#a78bfa', cyan: '#67e8f9', coral: '#fb7185', mint: '#6ee7b7',
};

export const title: CSSProperties = {fontFamily: 'DM Serif Display', color: colors.text, letterSpacing: '-0.045em', lineHeight: 0.94};
export const body: CSSProperties = {fontFamily: 'Inter', color: colors.text};
export const mono: CSSProperties = {fontFamily: 'JetBrains Mono', color: colors.text};
