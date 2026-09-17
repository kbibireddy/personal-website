"use client";

import { useState, useEffect, type CSSProperties } from 'react';
import { motion } from 'framer-motion';

import WorkExperience from '@/components/WorkExperience';
import Portfolio from '@/components/Portfolio';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LatticeAtmosphere from '@/components/LatticeAtmosphere';
import SkillBadge from '@/components/SkillBadge';
import PDFResume from '@/components/PDFResume';

import { Theme } from '@/types/theme';
import {
  getShellClasses,
  getAccentTextClass,
  getAccentBorderClass,
  getSurfaceClass,
  getMutedTextClass,
  getAccentHex,
} from '@/utils/theme';
import { useResume } from '@/utils/useResume';
import { useActiveSection } from '@/hooks/useActiveSection';
import { PAGE_SECTIONS } from '@/constants/sections';

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaTools,
  FaFilePdf,
  FaFileWord,
} from 'react-icons/fa';
import { MdWorkOutline, MdMoney } from 'react-icons/md';
import { GiSoapExperiment } from 'react-icons/gi';
import { PiCode, PiBrainThin, PiNetworkXDuotone, PiToolboxDuotone } from 'react-icons/pi';
import { TbDatabase, TbApps, TbMathIntegrals } from 'react-icons/tb';
import { BsGraphUpArrow } from 'react-icons/bs';
import { SiDwavesystems } from 'react-icons/si';
import { AiTwotoneApi } from 'react-icons/ai';
import { RiStockFill } from 'react-icons/ri';

import { generatePDF } from '@/utils/pdf';
import { generateDOCX } from '@/utils/docx';
import { formatProfessionalSummary, getTotalCareerYears } from '@/utils/dates';
import {
  CONTENT_FONT_SCALE,
  CONTENT_SECTION_MAX_WIDTH,
  TENURE_FONT_RATIO,
} from '@/constants/layout';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10% 0px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export default function Home() {
  const [theme, setTheme] = useState<Theme>('netflix');
  const [mounted, setMounted] = useState(false);
  const [showGPA, setShowGPA] = useState<{ [key: number]: boolean }>({});
  const { resume: resumeData, loading } = useResume();
  const activeSection = useActiveSection(mounted && !loading && !!resumeData);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleGPA = (index: number) => {
    setShowGPA((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted || loading || !resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1220] text-teal-300">
        <div className="h-10 w-10 rounded-full border-2 border-teal-300/30 border-t-teal-300 animate-spin" />
      </div>
    );
  }

  const professionalSummary = formatProfessionalSummary(
    resumeData.professionalSummary,
    getTotalCareerYears(resumeData.workExperience)
  );

  const accent = getAccentHex(theme);
  const accentText = getAccentTextClass(theme);
  const accentBorder = getAccentBorderClass(theme);
  const surface = getSurfaceClass(theme);
  const muted = getMutedTextClass(theme);

  return (
    <main
      className={`relative min-h-screen w-full overflow-x-hidden transition-colors duration-500 ${getShellClasses(theme)}`}
    >
      <LatticeAtmosphere theme={theme} />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10 lg:py-0">
        <ThemeSwitcher onThemeChange={setTheme} theme={theme} />

        <div className="lg:grid lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          {/* Brand rail — hero-level name signal */}
          <header className="relative mb-14 flex flex-col lg:sticky lg:top-0 lg:mb-0 lg:h-screen lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col"
            >
              <h1
                className={`font-syne text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.15rem] ${
                  theme === 'meta' ? 'text-slate-900' : 'text-white'
                }`}
              >
                {resumeData.name}
              </h1>

              <p className={`mt-5 max-w-md text-base leading-relaxed sm:text-lg ${muted}`}>
                I am a{' '}
                <span className={`font-medium ${theme === 'meta' ? 'text-slate-900' : 'text-slate-100'}`}>
                  {resumeData.headline}
                </span>
              </p>

              <p className={`mt-4 flex items-center gap-2 text-sm ${muted}`}>
                <FaMapMarkerAlt className={`${accentText} shrink-0`} />
                {resumeData.contact.location}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <motion.a
                  href={resumeData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${accentBorder} ${surface} text-xl transition-colors hover:opacity-90`}
                  aria-label="GitHub"
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  href={resumeData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${accentBorder} ${surface} text-xl transition-colors hover:opacity-90`}
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  href={`mailto:${resumeData.contact.email}`}
                  whileHover={{ y: -2 }}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${accentBorder} ${surface} text-xl transition-colors hover:opacity-90`}
                  aria-label="Email"
                >
                  <FaEnvelope />
                </motion.a>

                <motion.button
                  onClick={() => generatePDF()}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#0B1220] transition-transform"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${theme === 'discord' ? '#0EA5E9' : '#14B8A6'})` }}
                >
                  <FaFilePdf />
                  PDF
                </motion.button>
                <motion.button
                  onClick={() => generateDOCX()}
                  whileHover={{ y: -2 }}
                  className={`inline-flex items-center gap-2 rounded-xl border ${accentBorder} ${surface} px-3.5 py-2.5 text-sm font-medium transition-transform`}
                >
                  <FaFileWord />
                  DOCX
                </motion.button>
              </div>

              <nav
                aria-label="Page sections"
                className="mt-10 flex gap-2 overflow-x-auto pb-1 lg:mt-auto lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
              >
                {PAGE_SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`group flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        isActive
                          ? theme === 'meta'
                            ? 'text-slate-900'
                            : 'text-white'
                          : muted
                      }`}
                    >
                      <span
                        className="hidden h-px w-8 transition-all duration-300 lg:block"
                        style={{
                          backgroundColor: isActive ? accent : 'currentColor',
                          opacity: isActive ? 1 : 0.25,
                          width: isActive ? '3rem' : '2rem',
                        }}
                      />
                      <span
                        className={`font-mono text-[0.7rem] uppercase tracking-[0.16em] ${
                          isActive ? accentText : ''
                        }`}
                      >
                        {section.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </header>

          {/* Scroll content — same sections & data */}
          <div
            className="content-section mx-auto w-full pb-20 lg:py-20"
            style={
              {
                '--content-max-width': CONTENT_SECTION_MAX_WIDTH,
                '--content-font-scale': CONTENT_FONT_SCALE,
                '--tenure-font-size': `calc(1.25rem * ${TENURE_FONT_RATIO})`,
              } as CSSProperties
            }
          >
            <motion.section id="summary" className="mb-16 scroll-mt-24" {...fadeUp}>
              <h2
                className={`mb-4 font-syne text-2xl font-bold tracking-tight ${
                  theme === 'meta' ? 'text-slate-900' : 'text-white'
                }`}
              >
                Professional Summary
              </h2>
              <p className={`text-base leading-relaxed sm:text-lg ${muted} ${theme === 'meta' ? 'text-slate-700' : 'text-slate-300'}`}>
                {professionalSummary}
              </p>
            </motion.section>

            <motion.section id="experience" className="mb-16 scroll-mt-24" {...fadeUp}>
              <h2
                className={`mb-6 flex items-center gap-2 font-syne text-2xl font-bold tracking-tight ${
                  theme === 'meta' ? 'text-slate-900' : 'text-white'
                }`}
              >
                <MdWorkOutline className={accentText} />
                Work Experience
              </h2>
              <WorkExperience theme={theme} />
            </motion.section>

            <motion.section id="education" className="mb-16 scroll-mt-24" {...fadeUp}>
              <h2
                className={`mb-6 flex items-center gap-2 font-syne text-2xl font-bold tracking-tight ${
                  theme === 'meta' ? 'text-slate-900' : 'text-white'
                }`}
              >
                <FaGraduationCap className={accentText} />
                Education
              </h2>
              <div className="space-y-8 border-l border-current/10 pl-5">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="relative">
                    <span
                      className="absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <h3
                      className={`font-syne text-lg font-semibold ${
                        theme === 'meta' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <p className={muted}>{edu.school}</p>
                    <p className={`font-mono text-xs uppercase tracking-wider ${muted}`}>
                      {edu.period}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      {showGPA[index] ? (
                        <p className="text-sm">GPA: {edu.gpa}</p>
                      ) : (
                        <button
                          onClick={() => toggleGPA(index)}
                          className={`text-sm underline underline-offset-2 transition-colors ${accentText}`}
                        >
                          see more
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section id="skills" className="mb-16 scroll-mt-24" {...fadeUp}>
              <h2
                className={`mb-6 flex items-center gap-2 font-syne text-2xl font-bold tracking-tight ${
                  theme === 'meta' ? 'text-slate-900' : 'text-white'
                }`}
              >
                <FaTools className={accentText} />
                Skills
              </h2>
              <div className="space-y-8">
                {Object.entries(
                  resumeData.skills.reduce((acc, skill) => {
                    const category = skill.category || 'Other';
                    if (!acc[category]) {
                      acc[category] = [];
                    }
                    acc[category].push(skill);
                    return acc;
                  }, {} as Record<string, typeof resumeData.skills>)
                ).map(([category, skills]) => {
                  const getCategoryIcon = (cat: string) => {
                    switch (cat) {
                      case 'Languages':
                        return <PiCode />;
                      case 'Data':
                        return <TbDatabase />;
                      case 'Cloud':
                        return <SiDwavesystems />;
                      case 'Backend':
                        return <BsGraphUpArrow />;
                      case 'AI/ML':
                        return <PiBrainThin />;
                      case 'Finance':
                        return <MdMoney />;
                      case 'Architecture':
                        return <PiNetworkXDuotone />;
                      case 'APIs':
                        return <AiTwotoneApi />;
                      case 'DevOps & Tooling':
                        return <PiToolboxDuotone />;
                      case 'Frontend':
                        return <TbApps />;
                      case 'Quant & Math':
                        return <TbMathIntegrals />;
                      case 'Trading':
                        return <RiStockFill />;
                      default:
                        return <FaTools />;
                    }
                  };

                  return (
                    <div key={category}>
                      <h3 className={`mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] ${accentText}`}>
                        {getCategoryIcon(category)}
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {skills
                          .sort((a, b) => b.proficiency - a.proficiency)
                          .map((skill) => (
                            <SkillBadge
                              key={skill.name}
                              name={skill.name}
                              proficiency={skill.proficiency}
                              theme={theme}
                            />
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section id="portfolio" className="scroll-mt-24" {...fadeUp}>
              <h2
                className={`mb-6 flex items-center gap-2 font-syne text-2xl font-bold tracking-tight ${
                  theme === 'meta' ? 'text-slate-900' : 'text-white'
                }`}
              >
                <GiSoapExperiment className={accentText} />
                Portfolio
              </h2>
              <Portfolio theme={theme} />
            </motion.section>
          </div>
        </div>
      </div>
      <PDFResume />
    </main>
  );
}
