"use client";

// React and core imports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Components
import WorkExperience from '@/components/WorkExperience';
import Portfolio from '@/components/Portfolio';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import TableOfContents from '@/components/TableOfContents';
import SpaceTimeAnimation from '@/components/SpaceTimeAnimation';
import ElectronicSpark from '@/components/ElectronicSpark';
import SkillBadge from '@/components/SkillBadge';
import PDFResume from '@/components/PDFResume';

// Data and types
import resumeData from '@/data/resume.json';
import { Theme } from '@/types/theme';
import { Resume } from '@/types/resume';
import { themeConfigs, getCardBgClass, getAccentClasses } from '@/utils/theme';

// Icons
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaGraduationCap,
  FaTools,
  FaProjectDiagram,
  FaFilePdf,
  FaFileWord
} from 'react-icons/fa';
import { MdWorkOutline, MdOutlineCloudQueue } from "react-icons/md";
import { GiSoapExperiment } from "react-icons/gi";
import { PiCode } from 'react-icons/pi';
import { TbDatabase } from 'react-icons/tb';
import { BsGraphUpArrow } from 'react-icons/bs';
import { PiBrainThin } from 'react-icons/pi';
import { LiaCogSolid } from 'react-icons/lia';

// Utils
import { generatePDF } from '@/utils/pdf';
import { generateDOCX } from '@/utils/docx';

const skillCategories = {
  languages: ['Python', 'Java', 'C++', 'JavaScript'],
  frameworks: ['React', 'Node.js'],
  data: ['SQL', 'Machine Learning', 'Quantitative Analysis'],
  cloud: ['AWS']
};

export default function Home() {
  const [theme, setTheme] = useState<Theme>('netflix');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const getThemeClasses = (theme: Theme) => {
    switch (theme) {
      case 'netflix':
        return 'bg-[#141414] text-white font-space-grotesk';
      case 'meta':
        return 'bg-white text-[#050505] font-inter';
      case 'discord':
        return 'bg-[#313338] text-white font-roboto-mono';
      default:
        return 'bg-[#141414] text-white font-space-grotesk';
    }
  };

  const getAccentClasses = (theme: Theme) => {
    switch (theme) {
      case 'netflix':
        return 'from-[#E50914] to-[#B20710]';
      case 'meta':
        return 'from-[#0866FF] to-[#0064E0]';
      case 'discord':
        return 'from-[#5865F2] to-[#4752C4]';
      default:
        return 'from-[#E50914] to-[#B20710]';
    }
  };

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

  const getSkillColor = (theme: Theme, category: string) => {
    switch (theme) {
      case 'netflix':
        return {
          languages: 'bg-[#E50914]/20 hover:bg-[#E50914]/30',
          frameworks: 'bg-[#B20710]/20 hover:bg-[#B20710]/30',
          data: 'bg-[#DC2626]/20 hover:bg-[#DC2626]/30',
          cloud: 'bg-[#6D6D6E]/20 hover:bg-[#6D6D6E]/30'
        }[category];
      case 'meta':
        return {
          languages: 'bg-[#0866FF]/20 hover:bg-[#0866FF]/30',
          frameworks: 'bg-[#0064E0]/20 hover:bg-[#0064E0]/30',
          data: 'bg-[#1D9BF0]/20 hover:bg-[#1D9BF0]/30',
          cloud: 'bg-[#65676B]/20 hover:bg-[#65676B]/30'
        }[category];
      case 'discord':
        return {
          languages: 'bg-[#5865F2]/20 hover:bg-[#5865F2]/30',
          frameworks: 'bg-[#4752C4]/20 hover:bg-[#4752C4]/30',
          data: 'bg-[#949BA4]/20 hover:bg-[#949BA4]/30',
          cloud: 'bg-[#5865F2]/20 hover:bg-[#5865F2]/30'
        }[category];
      default:
        return 'bg-white/10 hover:bg-white/20';
    }
  };

  return (
    <main className={`min-h-screen w-screen overflow-x-hidden p-8 md:p-24 transition-colors duration-300 relative ${getThemeClasses(theme)}`}>
      <div className="absolute inset-0 z-0">
        {theme === 'netflix' && <SpaceTimeAnimation />}
        {theme === 'discord' && <ElectronicSpark />}
      </div>
      
      <div className="relative z-10">
        <ThemeSwitcher onThemeChange={setTheme} />
        <TableOfContents theme={theme} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto backdrop-blur-sm"
        >
          <div className="flex flex-col mb-12">
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${getAccentClasses(theme)} text-transparent bg-clip-text animate-gradient`}>
              {resumeData.name}
            </h1>
            
            <p className="text-xl md:text-2xl mb-6">
              I am an <span className={`font-bold bg-gradient-to-r ${getAccentClasses(theme)} text-transparent bg-clip-text`}>{resumeData.headline}</span>
            </p>

            <p className="text-lg mb-4 text-current/80 flex items-center gap-2">
              <FaMapMarkerAlt className="text-xl" />
              {resumeData.contact.location}
            </p>

            <div className="flex items-center space-x-6">
              <motion.a
                href={resumeData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-3xl text-current hover:text-[#E50914] dark:hover:text-[#E50914] transition-colors duration-200"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href={resumeData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-3xl text-current hover:text-[#0866FF] dark:hover:text-[#0866FF] transition-colors duration-200"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href={`mailto:${resumeData.contact.email}`}
                whileHover={{ scale: 1.1 }}
                className="text-3xl text-current hover:text-[#5865F2] dark:hover:text-[#5865F2] transition-colors duration-200"
              >
                <FaEnvelope />
              </motion.a>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => generatePDF()}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getAccentClasses(theme)} text-white text-sm font-medium transition-transform`}
                >
                  <FaFilePdf />
                  PDF
                </motion.button>
                <motion.button
                  onClick={() => generateDOCX(resumeData as Resume)}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getAccentClasses(theme)} text-white text-sm font-medium transition-transform`}
                >
                  <FaFileWord />
                  DOCX
                </motion.button>
              </div>
            </div>
          </div>

          <section id="summary" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
            <p className={`text-lg text-current/90 ${getCardBgClass(theme)} p-6 rounded-lg`}>
              {resumeData.professionalSummary}
            </p>
          </section>

          <section id="experience" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MdWorkOutline className="text-2xl" />
              Work Experience
            </h2>
            <WorkExperience theme={theme} />
          </section>

          <section id="education" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-2xl" />
              Education
            </h2>
            <div className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-6`}>
              {resumeData.education.map((edu, index) => (
                <div key={index} className={index === 0 ? "mb-6" : ""}>
                  <h3 className="text-xl font-semibold text-current">{edu.degree}</h3>
                  <p className="text-current/80">{edu.school}</p>
                  <p className="text-current/80">{edu.period}</p>
                  <p className="text-current/90">GPA: {edu.gpa}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="skills" className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaTools className="text-2xl" />
              Skills
            </h2>
            <div className={`${getCardBgClass(theme)} backdrop-blur-sm rounded-lg p-6`}>
              {Object.entries(
                resumeData.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) {
                    acc[skill.category] = [];
                  }
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof resumeData.skills>)
              ).map(([category, skills]) => {
                const getCategoryIcon = (cat: string) => {
                  switch (cat) {
                    case 'Languages': return <PiCode />;
                    case 'Data': return <TbDatabase />;
                    case 'Cloud': return <MdOutlineCloudQueue />;
                    case 'Backend': return <BsGraphUpArrow />;
                    case 'AI/ML': return <PiBrainThin />;
                    case 'Finance': return <BsGraphUpArrow />;
                    case 'Architecture': return <LiaCogSolid />;
                    default: return <FaProjectDiagram />;
                  }
                };

                return (
                  <div key={category} className="mb-6 last:mb-0">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      {getCategoryIcon(category)}
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-3">
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
                )
              })}
            </div>
          </section>

          <section id="portfolio">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GiSoapExperiment className="text-2xl" />
              Portfolio
            </h2>
            <Portfolio theme={theme} />
          </section>
        </motion.div>
      </div>
      <PDFResume data={resumeData as Resume} />
    </main>
  )
} 