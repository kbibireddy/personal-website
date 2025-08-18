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
  
  // PDF Generation Configuration
  const PDF_CONFIG = {
    // Font sizes in pixels
    fonts: {
      name: 24,           // Name size
      headline: 14,       // Headline size
      section: 18,        // Section headers
      normal: 13,         // Normal text
      small: 11           // Small text
    },
      // Job display configuration
  jobs: {
    maxJobs: 3,         // Maximum number of jobs to show
    maxBullets: {
      // Specify exact number of bullet points for each job by index
      // Index 0 = most recent job, Index 1 = second most recent, etc.
      0: 6,             // Most recent job: 6 bullets
      1: 4,             // Second job: 4 bullets
      2: 3,             // Third job: 3 bullets
      // Add more job indices as needed
      default: 2        // Default bullets for any job not specifically configured
    }
  },
    // Skills configuration
    skills: {
      maxSkills: 25,      // Maximum number of skills to show
      sortByProficiency: true  // Sort skills by proficiency
    },
    // Education configuration
    education: {
      showGPA: false,      // Whether to show GPA in PDF
      maxEducation: 2     // Maximum number of education entries
    }
  };
  
  // Load resume data with overrides applied
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
  
  // Function to get number of bullets based on job index
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
          <div className="grid grid-cols-2 gap-2">
            {data.education.slice(0, PDF_CONFIG.education.maxEducation).map((edu, index) => (
              <div key={index} className="text-sm">
                <div className="text-black font-bold">
                  {edu.degree} {PDF_CONFIG.education.showGPA && `(GPA: ${edu.gpa})`}
                </div>
                <div className="text-black text-[13px] leading-5">{edu.school}</div>
                <div className="text-black text-[13px] leading-5">{edu.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 