import { Theme } from '@/types/theme';

interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  cardBg: string;
  muted: string;
  highlight: string;
  font: string;
}

/** Restyled accent systems: same theme IDs, new visual language. White/green (meta) is primary. */
export const themeConfigs: Record<Theme, ThemeConfig> = {
  meta: {
    primary: '#0D9488',
    secondary: '#0F766E',
    background: '#F3F6FA',
    text: '#0F172A',
    accent: '#0D9488',
    cardBg: 'bg-slate-900/[0.04]',
    muted: '#64748B',
    highlight: '#14B8A6',
    font: 'font-outfit antialiased',
  },
  netflix: {
    primary: '#2DD4BF',
    secondary: '#14B8A6',
    background: '#0B1220',
    text: '#E8EEF7',
    accent: '#2DD4BF',
    cardBg: 'bg-white/[0.04]',
    muted: '#94A3B8',
    highlight: '#5EEAD4',
    font: 'font-outfit antialiased',
  },
  discord: {
    primary: '#38BDF8',
    secondary: '#0EA5E9',
    background: '#12151C',
    text: '#E2E8F0',
    accent: '#38BDF8',
    cardBg: 'bg-sky-400/[0.06]',
    muted: '#94A3B8',
    highlight: '#7DD3FC',
    font: 'font-outfit antialiased',
  },
};

export const getThemeClasses = (theme: Theme): string => {
  const config = themeConfigs[theme];
  return `bg-[${config.background}] text-[${config.text}] ${config.font}`;
};

export const getAccentClasses = (theme: Theme): string => {
  const config = themeConfigs[theme];
  return `from-[${config.primary}] to-[${config.secondary}]`;
};

export const getCardBgClass = (theme: Theme): string => {
  return themeConfigs[theme].cardBg;
};

export const getAccentHex = (theme: Theme): string => themeConfigs[theme].accent;

export const getShellClasses = (theme: Theme): string => {
  switch (theme) {
    case 'meta':
      return 'bg-[#F3F6FA] text-[#0F172A] font-outfit antialiased';
    case 'discord':
      return 'bg-[#12151C] text-[#E2E8F0] font-outfit antialiased';
    case 'netflix':
    default:
      return 'bg-[#0B1220] text-[#E8EEF7] font-outfit antialiased';
  }
};

export const getAccentTextClass = (theme: Theme): string => {
  switch (theme) {
    case 'meta':
      return 'text-teal-700';
    case 'discord':
      return 'text-sky-400';
    case 'netflix':
    default:
      return 'text-teal-300';
  }
};

export const getAccentBorderClass = (theme: Theme): string => {
  switch (theme) {
    case 'meta':
      return 'border-teal-600/40';
    case 'discord':
      return 'border-sky-400/35';
    case 'netflix':
    default:
      return 'border-teal-300/35';
  }
};

export const getSurfaceClass = (theme: Theme): string => {
  switch (theme) {
    case 'meta':
      return 'bg-slate-900/[0.03]';
    case 'discord':
      return 'bg-sky-400/[0.05]';
    case 'netflix':
    default:
      return 'bg-white/[0.03]';
  }
};

export const getMutedTextClass = (theme: Theme): string => {
  switch (theme) {
    case 'meta':
      return 'text-slate-600';
    case 'discord':
    case 'netflix':
    default:
      return 'text-slate-400';
  }
};
