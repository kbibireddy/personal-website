"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '@/types/theme';
import {
  TOC_HIDE_SCROLL_THRESHOLD,
  TOC_MIN_VIEWPORT_WIDTH,
} from '@/constants/layout';
import { EXPERIENCE_SECTION_ID, PAGE_SECTIONS } from '@/constants/sections';

interface Props {
  theme: Theme;
}

export default function TableOfContents({ theme }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => {
      if (window.innerWidth < TOC_MIN_VIEWPORT_WIDTH) {
        setVisible(false);
        return;
      }

      const experience = document.getElementById(EXPERIENCE_SECTION_ID);
      if (!experience) {
        return;
      }

      const { top } = experience.getBoundingClientRect();
      setVisible(top > window.innerHeight * TOC_HIDE_SCROLL_THRESHOLD);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, []);

  const getThemeClasses = (theme: Theme) => {
    switch (theme) {
      case 'netflix':
        return 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white';
      case 'meta':
        return 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black';
      case 'discord':
        return 'bg-[#5865F2]/5 hover:bg-[#5865F2]/10 text-white/70 hover:text-white';
      default:
        return 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white';
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : -20,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden toc:block"
    >
      <ul className="space-y-2">
        {PAGE_SECTIONS.map((section) => (
          <motion.li
            key={section.id}
            whileHover={{ x: 5 }}
            className={`
              cursor-pointer rounded-lg px-4 py-2
              transition-all duration-300 ease-in-out
              backdrop-blur-sm text-sm
              ${getThemeClasses(theme)}
            `}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
