"use client";

import { motion } from 'framer-motion'
import { Theme } from '@/types/theme';
import { getCardBgClass } from '@/utils/theme';
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { BsCalendarDate } from "react-icons/bs";

import resumeData from '@/data/resume.json'

interface WorkExperienceProps {
  theme: Theme;
}

export default function WorkExperience({ theme }: WorkExperienceProps) {
  return (
    <div className="space-y-6">
      {resumeData.workExperience.map((job, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-6`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-current flex items-center gap-2">
                <PiBuildingOfficeDuotone />
                <span className="mr-1">{job.title},</span>
                <span>{job.company}</span>
              </h3>
            </div>
            <p className="text-current/80 flex items-center gap-2">
              <BsCalendarDate />
              {job.period}
            </p>
          </div>
          <ul className="list-disc list-inside text-current/90 space-y-2">
            {job.description.map((desc, i) => (
              <li key={i} className="leading-relaxed">{desc}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
} 