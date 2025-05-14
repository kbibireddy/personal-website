"use client";

import { Theme } from '@/types/theme';
import { themeConfigs } from '@/utils/theme';

interface SkillBadgeProps {
  name: string;
  proficiency: number;
  theme: Theme;
}

export default function SkillBadge({ name, proficiency, theme }: SkillBadgeProps) {
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (proficiency / 5) * circumference;

  const getProgressColor = (theme: Theme) => {
    switch (theme) {
      case 'netflix':
        return '#E50914';
      case 'meta':
        return '#0866FF';
      case 'discord':
        return '#5865F2';
      default:
        return '#E50914';
    }
  };

  return (
    <div className={`
      px-4 py-2 rounded-full
      text-sm font-medium
      transition-all duration-200
      bg-white/5 hover:bg-white/10
      text-current
      flex items-center gap-2
      shadow-[0_2px_4px_rgba(0,0,0,0.1)]
      hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]
    `}>
      {name}
      <div className="relative w-6 h-6">
        <svg className="w-6 h-6 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="12"
            cy="12"
            r={radius}
            className="stroke-current/20"
            strokeWidth="3"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="12"
            cy="12"
            r={radius}
            stroke={getProgressColor(theme)}
            strokeWidth="3"
            fill="none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease'
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
          {proficiency}
        </span>
      </div>
    </div>
  );
} 