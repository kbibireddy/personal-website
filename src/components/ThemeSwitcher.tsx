import { motion } from 'framer-motion';
import { useState } from 'react';
import { Theme } from '@/types/theme';
import { themeConfigs } from '@/utils/theme';

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