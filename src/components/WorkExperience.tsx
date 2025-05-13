import { motion } from 'framer-motion'
import resumeData from '@/data/resume.json'

type Theme = 'netflix' | 'meta' | 'discord';

interface WorkExperienceProps {
  theme: Theme;
}

const getCardBgClass = (theme: Theme) => {
  switch (theme) {
    case 'netflix':
      return 'bg-white/10';
    case 'meta':
      return 'bg-black/5';
    case 'discord':
      return 'bg-[#5865F2]/10';
    default:
      return 'bg-white/10';
  }
};

export default function WorkExperience({ theme }: WorkExperienceProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="space-y-8">
        {resumeData.workExperience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-8 shadow-lg hover:bg-white/10 transition-all max-w-4xl`}
          >
            <h3 className="text-xl font-semibold text-current">{exp.title}</h3>
            <p className="text-current/80 mb-2">{exp.company}</p>
            <p className="text-current/70 mb-4">{exp.period}</p>
            <ul className="list-disc list-inside space-y-2">
              {exp.description.map((desc, idx) => (
                <li key={idx} className="text-current/90">{desc}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 