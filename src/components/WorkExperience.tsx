import { motion } from 'framer-motion'
import { Theme } from '@/types/theme';
import { getCardBgClass } from '@/utils/theme';
import resumeData from '@/data/resume.json'

interface WorkExperienceProps {
  theme: Theme;
}

export default function WorkExperience({ theme }: WorkExperienceProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
      <div className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-6`}>
        {resumeData.workExperience.map((job, index) => (
          <div key={index} className={`${index !== 0 ? 'mt-8' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-current">{job.company}</h3>
                <p className="text-current/80">{job.title}</p>
              </div>
              <p className="text-current/80">{job.period}</p>
            </div>
            <ul className="mt-4 list-disc list-inside text-current/90">
              {job.description.map((desc, i) => (
                <li key={i} className="mb-2">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
} 