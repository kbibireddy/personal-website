"use client";

import { motion } from 'framer-motion'
import { Theme } from '@/types/theme';
import { getCardBgClass, getAccentClasses } from '@/utils/theme';
import { FaExternalLinkAlt } from 'react-icons/fa';
import resumeData from '@/data/resume_swe.json';

interface PortfolioProps {
  theme: Theme;
}

export default function Portfolio({ theme }: PortfolioProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-500';
      case 'WIP':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'Discontinued':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resumeData.projects?.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-6`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>
          <div className="mb-4">
            {project.description.map((desc, i) => (
              <p key={i} className="text-current/90 mb-2">{desc}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className={`${getCardBgClass(theme)} px-3 py-1 rounded-full text-sm text-current/80`}
              >
                {tech}
              </span>
            ))}
          </div>
          {project.link && project.status === 'Active' && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getAccentClasses(theme)} text-white text-sm font-medium transition-transform`}
            >
              Try it out
              <FaExternalLinkAlt />
            </motion.a>
          )}
          {project.link && project.status !== 'Active' && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-500/20 text-gray-500 text-sm font-medium cursor-not-allowed"
            >
              Try it out
              <FaExternalLinkAlt />
            </motion.a>
          )}
        </motion.div>
      ))}
    </div>
  );
} 