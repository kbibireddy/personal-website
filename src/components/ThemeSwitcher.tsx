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

  const getThemeColors = (theme: Theme) => {
    switch (theme) {
      case 'netflix':
        return { left: '#E50914', right: '#000000' }; // Red and Black
      case 'meta':
        return { left: '#0866FF', right: '#FFFFFF' }; // Blue and White
      case 'discord':
        return { left: '#5865F2', right: '#4752C4' }; // Discord Blue and Darker Blue
      default:
        return { left: '#E50914', right: '#000000' };
    }
  };

  const renderSplitCircle = (theme: Theme) => {
    const colors = getThemeColors(theme);
    
    return (
      <svg className="w-6 h-6" viewBox="0 0 32 32" style={{ transform: 'rotate(30deg)' }}>
        <defs>
          <clipPath id={`clip-${theme}`}>
            <circle cx="16" cy="16" r="16" />
          </clipPath>
        </defs>
        
        {/* Left half - clipped to circle */}
        <path
          d="M16 0 L32 0 L32 32 L16 32 Z"
          fill={colors.left}
          clipPath={`url(#clip-${theme})`}
        />
        {/* Right half - clipped to circle */}
        <path
          d="M0 0 L16 0 L16 32 L0 32 Z"
          fill={colors.right}
          clipPath={`url(#clip-${theme})`}
        />
        {/* Diagonal separator line */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="32"
          strokeWidth="1"
          opacity="0.8"
        />
      </svg>
    );
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Themes:</span>
        <div className="flex space-x-2">
          {Object.keys(themeConfigs).map((theme) => (
            <motion.button
              key={theme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleThemeChange(theme as Theme)}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden ${
                activeTheme === theme 
                  ? 'ring-2 ring-offset-2 ring-offset-background ring-white/50' 
                  : ''
              }`}
            >
              {renderSplitCircle(theme as Theme)}
              <span className="sr-only">{theme} theme</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
} 