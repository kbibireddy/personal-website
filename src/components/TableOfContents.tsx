"use client";

import { motion } from 'framer-motion';
import { Theme } from '@/types/theme';
import { PAGE_SECTIONS } from '@/constants/sections';

interface Props {
  theme: Theme;
}

export default function TableOfContents({ theme }: Props) {
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
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
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
