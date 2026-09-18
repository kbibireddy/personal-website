"use client";

import { motion } from 'framer-motion';
import { Theme } from '@/types/theme';
import { themeConfigs } from '@/utils/theme';

interface ThemeSwitcherProps {
  onThemeChange: (theme: Theme) => void;
  theme?: Theme;
}

export default function ThemeSwitcher({ onThemeChange, theme }: ThemeSwitcherProps) {
  const activeTheme = theme ?? 'netflix';

  const handleThemeChange = (next: Theme) => {
    onThemeChange(next);
  };

  const getThemeColors = (t: Theme) => {
    switch (t) {
      case 'netflix':
        return { left: '#2DD4BF', right: '#0B1220' };
      case 'meta':
        return { left: '#0D9488', right: '#F3F6FA' };
      case 'discord':
        return { left: '#38BDF8', right: '#12151C' };
      default:
        return { left: '#2DD4BF', right: '#0B1220' };
    }
  };

  const renderSplitCircle = (t: Theme) => {
    const colors = getThemeColors(t);

    return (
      <svg className="h-5 w-5" viewBox="0 0 32 32" style={{ transform: 'rotate(30deg)' }}>
        <defs>
          <clipPath id={`clip-${t}`}>
            <circle cx="16" cy="16" r="16" />
          </clipPath>
        </defs>
        <path
          d="M16 0 L32 0 L32 32 L16 32 Z"
          fill={colors.left}
          clipPath={`url(#clip-${t})`}
        />
        <path
          d="M0 0 L16 0 L16 32 L0 32 Z"
          fill={colors.right}
          clipPath={`url(#clip-${t})`}
        />
      </svg>
    );
  };

  return (
    <div className="theme-switcher fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
      <div className="flex items-center gap-2 rounded-full border border-current/10 bg-black/20 px-3 py-2 backdrop-blur-md dark:bg-white/5">
        <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] opacity-60 sm:inline">
          Themes
        </span>
        <div className="flex gap-1.5">
          {Object.keys(themeConfigs).map((t) => (
            <motion.button
              key={t}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleThemeChange(t as Theme)}
              className={`flex h-6 w-6 items-center justify-center overflow-hidden rounded-full transition-all duration-200 ${
                activeTheme === t ? 'ring-2 ring-offset-2 ring-offset-transparent ring-white/40' : ''
              }`}
              aria-label={`${t} theme`}
              aria-pressed={activeTheme === t}
            >
              {renderSplitCircle(t as Theme)}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
