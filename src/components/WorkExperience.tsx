"use client";

import { motion } from 'framer-motion'
import { Theme } from '@/types/theme';
import { getCardBgClass } from '@/utils/theme';
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { BsCalendarDate } from "react-icons/bs";
import { useResume } from '@/utils/useResume';
import { formatYearsSinceStart } from '@/utils/dates';

interface WorkExperienceProps {
  theme: Theme;
}

export default function WorkExperience({ theme }: WorkExperienceProps) {
  const { resume: resumeData, loading } = useResume();

  if (loading || !resumeData) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {resumeData.workExperience.map((job, index) => {
        const tenureLabel = formatYearsSinceStart(job.period);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-6`}
          >
            <div className="mb-4 grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 sm:grid-cols-[auto_1fr_auto] sm:items-start">
              <PiBuildingOfficeDuotone className="shrink-0 mt-1" />
              <h3 className="text-xl font-semibold text-current min-w-0">
                {job.title},{' '}
                {job.company}
                {tenureLabel && (
                  <span className="tenure-label text-current/70 font-normal italic ml-1">
                    {tenureLabel}
                  </span>
                )}
              </h3>
              <div className="col-start-2 flex items-center gap-2 text-current/80 shrink-0 sm:col-start-3 sm:row-start-1 sm:pt-1">
                <BsCalendarDate className="shrink-0" />
                <span className="whitespace-nowrap">{job.period}</span>
              </div>
            </div>
            <ul className="list-disc list-inside text-current/90 space-y-2">
              {job.description.map((desc, i) => (
                <li key={i} className="leading-relaxed">{desc}</li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
} 