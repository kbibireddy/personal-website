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

export const themeConfigs: Record<Theme, ThemeConfig> = {
  netflix: {
    primary: '#E50914',
    secondary: '#B20710',
    background: '#141414',
    text: '#FFFFFF',
    accent: '#E50914',
    cardBg: 'bg-white/10',
    muted: '#6D6D6E',
    highlight: '#DC2626',
    font: 'font-space-grotesk'
  },
  meta: {
    primary: '#0866FF',
    secondary: '#0064E0',
    background: '#FFFFFF',
    text: '#050505',
    accent: '#0866FF',
    cardBg: 'bg-black/5',
    muted: '#65676B',
    highlight: '#1D9BF0',
    font: 'font-inter'
  },
  discord: {
    primary: '#5865F2',
    secondary: '#4752C4',
    background: '#313338',
    text: '#FFFFFF',
    accent: '#5865F2',
    cardBg: 'bg-[#5865F2]/10',
    muted: '#949BA4',
    highlight: '#5865F2',
    font: 'font-roboto-mono'
  }
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