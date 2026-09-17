"use client";

import { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '@/types/theme';
import { getAccentHex, getMutedTextClass, getSurfaceClass } from '@/utils/theme';
import { PiBuildingOfficeDuotone } from 'react-icons/pi';
import { BsCalendarDate } from 'react-icons/bs';
import { useResume } from '@/utils/useResume';
import { formatYearsSinceStart } from '@/utils/dates';

interface WorkExperienceProps {
  theme: Theme;
}

export default function WorkExperience({ theme }: WorkExperienceProps) {
  const { resume: resumeData, loading } = useResume();
  const accent = getAccentHex(theme);
  const muted = getMutedTextClass(theme);
  const surface = getSurfaceClass(theme);

  if (loading || !resumeData) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current/20 border-t-current" />
      </div>
    );
  }

  return (
    <div className="relative space-y-0 border-l border-current/10">
      {resumeData.workExperience.map((job, index) => {
        const tenureLabel = formatYearsSinceStart(job.period);

        return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="group relative pl-6 pb-10 last:pb-0"
          >
            <span
              className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-transparent transition-shadow duration-300 group-hover:ring-[color:var(--job-accent)]/20"
              style={
                {
                  backgroundColor: accent,
                  ['--job-accent' as string]: accent,
                } as CSSProperties
              }
            />

            <div
              className={`-ml-1 rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 group-hover:border-current/10 ${surface} group-hover:bg-opacity-100`}
            >
              <div className="mb-3 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 sm:grid-cols-[auto_1fr_auto] sm:items-start">
                <PiBuildingOfficeDuotone
                  className="mt-1 shrink-0 opacity-70"
                  style={{ color: accent }}
                />
                <h3
                  className={`min-w-0 font-syne text-lg font-semibold sm:text-xl ${
                    theme === 'meta' ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {job.title}, {job.company}
                  {tenureLabel && (
                    <span className={`tenure-label ml-1 font-normal italic ${muted}`}>
                      {tenureLabel}
                    </span>
                  )}
                </h3>
                <div
                  className={`col-start-2 flex shrink-0 items-center gap-2 sm:col-start-3 sm:row-start-1 sm:pt-1 ${muted}`}
                >
                  <BsCalendarDate className="shrink-0" />
                  <span className="whitespace-nowrap font-mono text-xs tracking-wide">
                    {job.period}
                  </span>
                </div>
              </div>
              <ul className={`list-disc space-y-2.5 pl-5 text-[0.95rem] leading-relaxed ${theme === 'meta' ? 'text-slate-700' : 'text-slate-300'}`}>
                {job.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
