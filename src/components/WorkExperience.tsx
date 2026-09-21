"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '@/types/theme';
import { getAccentTextClass, getMutedTextClass } from '@/utils/theme';
import { useResume } from '@/utils/useResume';

interface WorkExperienceProps {
  theme: Theme;
}

export default function WorkExperience({ theme }: WorkExperienceProps) {
  const { resume: resumeData, loading } = useResume();
  const muted = getMutedTextClass(theme);
  const accentText = getAccentTextClass(theme);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  if (loading || !resumeData) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current/20 border-t-current" />
      </div>
    );
  }

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const proficiencyByName = new Map(
    resumeData.skills.map((skill) => [skill.name, skill.proficiency])
  );

  return (
    <div className="space-y-10">
      {resumeData.workExperience.map((job, index) => {
        const isOpen = !!expanded[index];
        const bodyClass = `text-[0.95rem] leading-relaxed ${
          theme === 'meta' ? 'text-slate-700' : 'text-slate-300'
        }`;
        const jobSkills = [...(job.skills ?? [])].sort((a, b) => {
          const byProf =
            (proficiencyByName.get(b) ?? 0) - (proficiencyByName.get(a) ?? 0);
          return byProf !== 0 ? byProf : a.localeCompare(b);
        });

        return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="group"
          >
            <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <h3
                className={`min-w-0 font-outfit text-lg font-semibold sm:text-xl ${
                  theme === 'meta' ? 'text-slate-900' : 'text-white'
                }`}
              >
                {job.title}, {job.company}
              </h3>
              <span className={`shrink-0 whitespace-nowrap font-mono text-xs tracking-wide sm:pt-1 ${muted}`}>
                {job.period}
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {isOpen || !job.summary ? (
                <motion.ul
                  key="details"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`list-disc space-y-2.5 pl-5 ${bodyClass}`}
                >
                  {job.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </motion.ul>
              ) : (
                <motion.p
                  key="summary"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={bodyClass}
                >
                  {job.summary}
                </motion.p>
              )}
            </AnimatePresence>

            {jobSkills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {jobSkills.map((name, i) => (
                  <span
                    key={name}
                    className={`font-mono text-[0.7rem] tracking-wide ${muted}`}
                  >
                    {name}
                    {i < jobSkills.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            )}

            {!!job.summary && (
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className={`mt-3 text-sm font-medium underline underline-offset-2 transition-colors ${accentText}`}
              >
                {isOpen ? 'Show summary' : 'Show full details'}
              </button>
            )}
          </motion.article>
        );
      })}
    </div>
  );
}
