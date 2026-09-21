"use client";

import { motion } from 'framer-motion';
import { Theme } from '@/types/theme';
import {
  getMutedTextClass,
  getSurfaceClass,
  getAccentBorderClass,
} from '@/utils/theme';
import { FaExternalLinkAlt } from 'react-icons/fa';
import resumeData from '@/data/resume_swe.json';

interface PortfolioProps {
  theme: Theme;
}

export default function Portfolio({ theme }: PortfolioProps) {
  const muted = getMutedTextClass(theme);
  const surface = getSurfaceClass(theme);
  const border = getAccentBorderClass(theme);
  const isLight = theme === 'meta';
  const chipClass = `
        inline-flex items-center gap-2 rounded-xl border px-3 py-1.5
        text-sm font-medium transition-all duration-200
        ${surface} ${border}
        hover:-translate-y-0.5
      `;

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return isLight
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-emerald-400/20 text-emerald-300';
      case 'WIP':
        return isLight
          ? 'bg-amber-100 text-amber-800'
          : 'bg-amber-400/20 text-amber-300';
      case 'Discontinued':
        return isLight
          ? 'bg-rose-100 text-rose-700'
          : 'bg-rose-400/20 text-rose-300';
      default:
        return isLight
          ? 'bg-slate-100 text-slate-600'
          : 'bg-white/10 text-slate-400';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 sm:items-start">
      {resumeData.projects?.map((project, index) => (
        <motion.article
          key={index}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="min-w-0"
        >
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <h3
              className={`font-outfit text-xl font-semibold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {project.title}
            </h3>
            <span
              className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] ${getStatusClass(project.status)}`}
            >
              {project.status}
            </span>
          </div>
          <div className="mb-4">
            {project.description.map((desc, i) => (
              <p
                key={i}
                className={`mb-2 text-[0.95rem] leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
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
              className={chipClass}
            >
              Try it out
              <FaExternalLinkAlt className="text-xs" />
            </motion.a>
          ) : (
            <div className={`${chipClass} cursor-not-allowed opacity-50 hover:translate-y-0`}>
              Try it out
              <FaExternalLinkAlt className="text-xs" />
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
}
