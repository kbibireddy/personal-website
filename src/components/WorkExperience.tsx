"use client";

import { motion } from 'framer-motion';
import { Theme } from '@/types/theme';
import { getMutedTextClass, getSurfaceClass } from '@/utils/theme';
import { useResume } from '@/utils/useResume';
import { formatYearsSinceStart } from '@/utils/dates';

interface WorkExperienceProps {
  theme: Theme;
}

export default function WorkExperience({ theme }: WorkExperienceProps) {
  const { resume: resumeData, loading } = useResume();
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
    <div className="space-y-8">
      {resumeData.workExperience.map((job, index) => {
        const tenureLabel = formatYearsSinceStart(job.period);

        return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="group"
          >
            <div
              className={`rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 group-hover:border-current/10 ${surface} group-hover:bg-opacity-100`}
            >
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
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
                <span className={`shrink-0 whitespace-nowrap font-mono text-xs tracking-wide sm:pt-1 ${muted}`}>
                  {job.period}
                </span>
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
