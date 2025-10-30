"use client";

import React from 'react';
import { generateDOCX } from '@/utils/docx';
import { getResumeWithOverrides } from '@/utils/resumeProvider';
import { Resume } from '@/types/resume';

interface PDFResumeProps {
  resumeType?: string;
  onDownload?: (format: 'pdf' | 'docx') => void;
}

export default function PDFResume({ resumeType, onDownload }: PDFResumeProps) {
  const [data, setData] = React.useState<Resume | null>(null);
  
  const PDF_CONFIG = {
    fonts: {
      name: 18,
      headline: 14,
      section: 16,
      normal: 13,
      small: 11
    },
    jobs: {
      maxJobs: 3,
      maxBullets: {
        0: 6,
        1: 4,
        2: 3,
        default: 2
      }
    },
    skills: {
      maxSkills: 55,
      sortByProficiency: true
    },
    education: {
      showGPA: false,
      maxEducation: 2
    }
  };
  
  const formatPeriod = (period: string): string => {
    const monthMap: Record<string, string> = {
      jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr', may: 'May', jun: 'Jun',
      jul: 'Jul', aug: 'Aug', sep: 'Sep', oct: 'Oct', nov: 'Nov', dec: 'Dec'
    };
    let normalized = period
      .replace(/\u2013|\u2014|–|—/g, '-') // replace en/em dash with hyphen
      .replace(/\s+-\s+/g, ' - ');
    Object.entries(monthMap).forEach(([lower, proper]) => {
      const re = new RegExp(`\\b${lower}\\b`, 'gi');
      normalized = normalized.replace(re, proper);
      const upper = lower.toUpperCase();
      const reUpper = new RegExp(`\\b${upper}\\b`, 'g');
      normalized = normalized.replace(reUpper, proper);
    });
    return normalized;
  };
  
  React.useEffect(() => {
    const loadResume = async () => {
      try {
        const resumeData = await getResumeWithOverrides(resumeType);
        setData(resumeData);
      } catch (error) {
        console.error('Failed to load resume:', error);
      }
    };

    loadResume();
  }, [resumeType]);
  
  const getBulletCount = (index: number): number => {
    return PDF_CONFIG.jobs.maxBullets[index as keyof typeof PDF_CONFIG.jobs.maxBullets] || PDF_CONFIG.jobs.maxBullets.default;
  };

  const handleDownloadClick = async (format: 'pdf' | 'docx') => {
    if (format === 'docx') {
      await generateDOCX(resumeType);
    }
    onDownload?.(format);
  };

  if (!data) {
    return null;
  }

  return (
    <div id="pdf-content" className="hidden">
      <div className="p-5 max-w-[800px] mx-auto bg-white text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Header */}
        <div className="text-center mb-3 print-avoid-break">
          <h1 className="text-2xl font-bold mb-1 text-black">{data.name}</h1>
          <p className="text-sm mb-0.5 text-black">{data.headline}</p>
                      <div className="text-sm text-black">
              {data.contact.email} • {data.contact.phone} • {data.contact.location}
            </div>
            <div className="text-sm text-black">
              {data.contact.linkedin} • {data.website || "https://karthikbibireddy.com"}
            </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-3 print-avoid-break">
          <h2 className="text-lg font-bold mb-1 text-black">Professional Summary</h2>
          <p className="text-sm text-black leading-5">{data.professionalSummary}</p>
        </div>

        {/* Work Experience */}
        <div className="mb-3">
          <h2 className="text-lg font-bold mb-1 text-black">Work Experience</h2>
          {data.workExperience.slice(0, PDF_CONFIG.jobs.maxJobs).map((job, index) => (
            <div key={index} className="mb-2.5 print-avoid-break">
              <div className="flex justify-between text-sm mb-1">
                <div className="text-black">
                  <span className="font-bold">{job.company}</span> - {job.title}
                </div>
                <span className="text-black">{job.period}</span>
              </div>
              <div className="pl-1">
                {job.description.slice(0, getBulletCount(index)).map((desc, i) => (
                  <div key={i} className="flex items-start gap-2 text-[13px] leading-[1.2] mb-[2px] text-black">
                    <span className="text-black/70">‣</span>
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-3 print-avoid-break">
          <h2 className="text-lg font-bold mb-1 text-black">Technical Skills</h2>
          <p className="text-sm text-black leading-5">
            {data.skills
              .sort((a, b) => PDF_CONFIG.skills.sortByProficiency ? b.proficiency - a.proficiency : 0)
              .slice(0, PDF_CONFIG.skills.maxSkills)
              .map(skill => skill.name)
              .join(' • ')}
          </p>
        </div>

        {/* Education */}
        <div className="print-avoid-break">
          <h2 className="text-lg font-bold mb-1 text-black">Education</h2>
          <div className="space-y-1">
            {data.education.slice(0, PDF_CONFIG.education.maxEducation).map((edu, index) => (
              <div key={index} className="text-sm text-black">
                <span className="font-bold">{edu.degree}</span>
                <span className="italic"> from </span>
                <span className="font-bold">{edu.school}</span>
                <span className="font-bold">  ({formatPeriod(edu.period)})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 