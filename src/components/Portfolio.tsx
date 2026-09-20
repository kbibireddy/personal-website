"use client";

import { motion } from 'framer-motion';
import { Theme } from '@/types/theme';
import {
  getAccentHex,
  getAccentBorderClass,
  getMutedTextClass,
  getSurfaceClass,
} from '@/utils/theme';
import { FaExternalLinkAlt } from 'react-icons/fa';
import resumeData from '@/data/resume_swe.json';

interface PortfolioProps {
  theme: Theme;
}

export default function Portfolio({ theme }: PortfolioProps) {
  const accent = getAccentHex(theme);
  const muted = getMutedTextClass(theme);
  const surface = getSurfaceClass(theme);
  const accentBorder = getAccentBorderClass(theme);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-emerald-400';
      case 'WIP':
        return 'text-amber-400';
      case 'Discontinued':
        return 'text-rose-400';
      default:
        return muted;
    }
  };

  return (
    <div className="space-y-6">
      {resumeData.projects?.map((project, index) => (
        <motion.article
          key={index}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          whileHover={{ x: 4 }}
          className={`rounded-2xl border ${accentBorder} ${surface} px-5 py-5 transition-colors`}
        >
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h3
              className={`font-outfit text-xl font-semibold ${
                theme === 'meta' ? 'text-slate-900' : 'text-white'
              }`}
            >
              {project.title}
            </h3>
            <span
              className={`font-mono text-[0.65rem] uppercase tracking-[0.16em] ${getStatusColor(project.status)}`}
            >
              {project.status}
            </span>
          </div>
          <div className="mb-4">
            {project.description.map((desc, i) => (
              <p
                key={i}
                className={`mb-2 text-[0.95rem] leading-relaxed ${theme === 'meta' ? 'text-slate-700' : 'text-slate-300'}`}
              >
                {desc}
              </p>
            ))}
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className={`font-mono text-[0.7rem] tracking-wide ${muted}`}
              >
                {tech}
                {i < project.technologies.length - 1 ? ' ·' : ''}
              </span>
            ))}
          </div>
          {project.link ? (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-[#0B1220]"
              style={{
                background: `linear-gradient(135deg, ${accent}, ${theme === 'discord' ? '#0EA5E9' : '#14B8A6'})`,
              }}
            >
              Try it out
              <FaExternalLinkAlt className="text-xs" />
            </motion.a>
          ) : (
            <div className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-current/10 px-4 py-2 text-sm font-medium opacity-50">
              Try it out
              <FaExternalLinkAlt className="text-xs" />
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
}
