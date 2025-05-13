import { motion } from 'framer-motion';
import { useState } from 'react';

type Theme = 'netflix' | 'meta' | 'discord';

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  cardBg: string;
  muted: string;
  highlight: string;
}

const themeConfigs: Record<Theme, ThemeColors> = {
  netflix: {
    primary: '#E50914',
    secondary: '#B20710',
    background: '#141414',
    text: '#FFFFFF',
    accent: '#E50914',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    muted: '#6D6D6E',
    highlight: '#DC2626'
  },
  meta: {
    primary: '#0866FF',
    secondary: '#0064E0',
    background: '#FFFFFF',
    text: '#050505',
    accent: '#0866FF',
    cardBg: 'rgba(0, 0, 0, 0.05)',
    muted: '#65676B',
    highlight: '#1D9BF0'
  },
  discord: {
    primary: '#5865F2',
    secondary: '#4752C4',
    background: '#313338',
    text: '#FFFFFF',
    accent: '#5865F2',
    cardBg: 'rgba(88, 101, 242, 0.1)',
    muted: '#949BA4',
    highlight: '#5865F2'
  }
};

interface ThemeSwitcherProps {
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeSwitcher({ onThemeChange }: ThemeSwitcherProps) {
  const [activeTheme, setActiveTheme] = useState<Theme>('netflix');

  const handleThemeChange = (theme: Theme) => {
    setActiveTheme(theme);
    onThemeChange(theme);
  };

  const getThemeLetter = (theme: Theme) => {
    switch (theme) {
      case 'netflix': return 'N';
      case 'meta': return 'M';
      case 'discord': return 'D';
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Theme:</span>
        <div className="flex space-x-2">
          {Object.keys(themeConfigs).map((theme) => (
            <motion.button
              key={theme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleThemeChange(theme as Theme)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                activeTheme === theme 
                  ? 'ring-2 ring-offset-2 ring-offset-background ring-white/50' 
                  : ''
              }`}
              style={{
                backgroundColor: themeConfigs[theme as Theme].primary
              }}
            >
              <span className="sr-only">{theme} theme</span>
              <span className="text-white text-xs font-bold">
                {getThemeLetter(theme as Theme)}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
} 