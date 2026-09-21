"use client";

import { Theme } from '@/types/theme';
import { getAccentHex, getSurfaceClass, getAccentBorderClass } from '@/utils/theme';

interface SkillBadgeProps {
  name: string;
  proficiency: number;
  theme: Theme;
}

export default function SkillBadge({ name, proficiency, theme }: SkillBadgeProps) {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (proficiency / 5) * circumference;
  const accent = getAccentHex(theme);
  const surface = getSurfaceClass(theme);
  const border = getAccentBorderClass(theme);

  return (
    <div
      className={`
        flex items-center gap-2 rounded-xl border px-3 py-1.5
        text-sm font-medium transition-all duration-200
        ${surface} ${border}
        hover:-translate-y-0.5
      `}
    >
      {name}
      <div className="relative h-5 w-5">
        <svg className="h-5 w-5 -rotate-90 transform" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r={radius}
            className="stroke-current/20"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r={radius}
            stroke={accent}
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease',
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.55rem] font-semibold">
          {proficiency}
        </span>
      </div>
    </div>
  );
}
