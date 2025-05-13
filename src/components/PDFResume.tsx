"use client";

import React from 'react';
import { Resume } from '@/types/resume';
import { generateDOCX } from '@/utils/docx';
import resumeOverrides from '@/data/resume_overrides.json';

interface PDFResumeProps {
  data: Resume;
  onDownload?: (format: 'pdf' | 'docx') => void;
}

export default function PDFResume({ data, onDownload }: PDFResumeProps) {
  // Function to get number of bullets based on job index
  const getBulletCount = (index: number): number => {
    switch(index) {
      case 0: return 6; // Most recent job: 10 bullets
      default: return 5; // Older jobs: 6 bullets
    }
  };

  const handleDownloadClick = async (format: 'pdf' | 'docx') => {
    if (format === 'docx') {
      await generateDOCX(data);
    }
    onDownload?.(format);
  };

  return (
    <div id="pdf-content" className="hidden">
      <div className="p-6 max-w-[800px] mx-auto bg-white text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Header */}
        <div className="text-center mb-4 print-avoid-break">
          <h1 className="text-2xl font-bold mb-1 text-black">{data.name}</h1>
          <p className="text-sm mb-1 text-black">{resumeOverrides.title}</p>
          <div className="text-sm text-black">
            {data.contact.email} • {data.contact.phone} • {data.contact.location}
          </div>
          <div className="text-sm text-black">
            {data.contact.linkedin} • {resumeOverrides.website}
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-4 print-avoid-break">
          <h2 className="text-lg font-bold mb-1 text-black">Professional Summary</h2>
          <p className="text-sm text-black">{resumeOverrides.summary}</p>
        </div>

        {/* Work Experience */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-1 text-black">Work Experience</h2>
          {data.workExperience.map((job, index) => (
            <div key={index} className="mb-3 print-avoid-break">
              <div className="flex justify-between text-sm">
                <div className="text-black">
                  <span className="font-bold">{job.company}</span> - {job.title}
                </div>
                <span className="text-black">{job.period}</span>
              </div>
              <ul className="list-disc list-inside text-sm mt-1">
                {job.description.slice(0, getBulletCount(index)).map((desc, i) => (
                  <li key={i} className="mb-0.5 text-black text-[13px]">{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-4 print-avoid-break">
          <h2 className="text-lg font-bold mb-1 text-black">Technical Skills</h2>
          <p className="text-sm text-black">
            {data.skills
              .sort((a, b) => b.proficiency - a.proficiency)
              .slice(0, 25)
              .map(skill => skill.name)
              .join(' • ')}
          </p>
        </div>

        {/* Education */}
        <div className="print-avoid-break">
          <h2 className="text-lg font-bold mb-1 text-black">Education</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.education.map((edu, index) => (
              <div key={index} className="text-sm">
                <div className="text-black font-bold">{edu.degree} (GPA: {edu.gpa})</div>
                <div className="text-black text-[13px]">{edu.school}</div>
                <div className="text-black text-[13px]">{edu.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 