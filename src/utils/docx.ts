"use client";

import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx';
import { getResumeWithOverrides } from './resumeProvider';

const DOCX_CONFIG = {
  fonts: {
    NAME: 28,
    TITLE: 24,
    HEADING: 24,
    NORMAL: 20,
    SMALL: 18,
  },
  layout: {
    bullet: { level: 0 },
    spacing: {
      section: { before: 210, after: 200 },
      item: { before: 0, after: 90 },
      header: 200,
      summary: 400
    },
    margin: {
      top: 1000,
      right: 1000,
      bottom: 1000,
      left: 1000,
    }
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
    maxSkills: 30,
    sortByProficiency: true
  },
  education: {
    showGPA: false,
    maxEducation: 2
  }
};

export async function generateDOCX(type?: string): Promise<void> {
  const data = await getResumeWithOverrides(type);
  
  const doc = new Document({
    sections: [{
      properties: {
        page: { margin: DOCX_CONFIG.layout.margin }
      },
      children: [
        // Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: DOCX_CONFIG.layout.spacing.header },
          children: [
            new TextRun({
              text: data.name,
              bold: true,
              size: DOCX_CONFIG.fonts.NAME,
              font: "Arial"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: DOCX_CONFIG.layout.spacing.header },
          children: [
            new TextRun({
              text: data.headline,
              size: DOCX_CONFIG.fonts.TITLE,
              font: "Arial"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: DOCX_CONFIG.layout.spacing.header },
          children: [
            new TextRun({ text: data.contact.email, size: DOCX_CONFIG.fonts.SMALL, font: "Arial" }),
            new TextRun({ text: " • ", size: DOCX_CONFIG.fonts.SMALL, font: "Arial" }),
            new TextRun({ text: data.contact.phone, size: DOCX_CONFIG.fonts.SMALL, font: "Arial" }),
            new TextRun({ text: " • ", size: DOCX_CONFIG.fonts.SMALL, font: "Arial" }),
            new TextRun({ text: data.contact.location, size: DOCX_CONFIG.fonts.SMALL, font: "Arial" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: DOCX_CONFIG.layout.spacing.summary },
          children: [
            new TextRun({ text: data.contact.linkedin, size: DOCX_CONFIG.fonts.SMALL, font: "Arial" }),
            new TextRun({ text: " • ", size: DOCX_CONFIG.fonts.SMALL, font: "Arial" }),
            new TextRun({ text: data.website, size: DOCX_CONFIG.fonts.SMALL, font: "Arial" })
          ]
        }),

        // Professional Summary
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: DOCX_CONFIG.layout.spacing.section,
          children: [new TextRun({ 
            text: "Professional Summary", 
            bold: true,
            size: DOCX_CONFIG.fonts.HEADING,
            font: "Arial"
          })]
        }),
        new Paragraph({
          spacing: { after: DOCX_CONFIG.layout.spacing.summary },
          children: [
            new TextRun({
              text: data.professionalSummary,
              size: DOCX_CONFIG.fonts.NORMAL,
              font: "Arial"
            })
          ]
        }),

        // Work Experience
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: DOCX_CONFIG.layout.spacing.section,
          children: [new TextRun({ 
            text: "Work Experience", 
            bold: true,
            size: DOCX_CONFIG.fonts.HEADING,
            font: "Arial"
          })]
        }),
        ...data.workExperience.slice(0, DOCX_CONFIG.jobs.maxJobs).map((job, index) => [
          new Paragraph({
            spacing: DOCX_CONFIG.layout.spacing.item,
            children: [
              new TextRun({ 
                text: job.company + " - " + job.title, 
                bold: true,
                size: DOCX_CONFIG.fonts.NORMAL,
                font: "Arial"
              }),
              new TextRun({ text: "  ", size: DOCX_CONFIG.fonts.NORMAL, font: "Arial" }),
              new TextRun({ 
                text: job.period, 
                italics: true,
                size: DOCX_CONFIG.fonts.NORMAL,
                font: "Arial"
              })
            ]
          }),
          ...job.description.slice(0, DOCX_CONFIG.jobs.maxBullets[index as keyof typeof DOCX_CONFIG.jobs.maxBullets] || DOCX_CONFIG.jobs.maxBullets.default).map(
            desc => new Paragraph({
              spacing: { before: 0, after: 60 },
              bullet: DOCX_CONFIG.layout.bullet,
              children: [new TextRun({ 
                text: desc,
                size: DOCX_CONFIG.fonts.NORMAL,
                font: "Arial"
              })]
            })
          )
        ]).flat(),

        // Technical Skills
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: DOCX_CONFIG.layout.spacing.section,
          children: [new TextRun({ 
            text: "Technical Skills", 
            bold: true,
            size: DOCX_CONFIG.fonts.HEADING,
            font: "Arial"
          })]
        }),
        new Paragraph({
          spacing: { after: DOCX_CONFIG.layout.spacing.summary },
          children: [
            new TextRun({
              text: data.skills
                .sort((a, b) => DOCX_CONFIG.skills.sortByProficiency ? b.proficiency - a.proficiency : 0)
                .slice(0, DOCX_CONFIG.skills.maxSkills)
                .map(skill => skill.name)
                .join(" • "),
              size: DOCX_CONFIG.fonts.NORMAL,
              font: "Arial"
            })
          ]
        }),

        // Education
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: DOCX_CONFIG.layout.spacing.section,
          children: [new TextRun({ 
            text: "Education", 
            bold: true,
            size: DOCX_CONFIG.fonts.HEADING,
            font: "Arial"
          })]
        }),
        ...data.education.slice(0, DOCX_CONFIG.education.maxEducation).map((edu, index) => [
          new Paragraph({
            spacing: { before: 0, after: 2 },
            children: [
              new TextRun({ 
                text: `${edu.degree}${DOCX_CONFIG.education.showGPA ? ` (GPA: ${edu.gpa})` : ''}`, 
                bold: true,
                size: DOCX_CONFIG.fonts.NORMAL,
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({ 
                text: edu.school,
                size: DOCX_CONFIG.fonts.NORMAL,
                font: "Arial"
              }),
              new TextRun({ 
                text: "  ",
                size: DOCX_CONFIG.fonts.NORMAL,
                font: "Arial"
              }),
              new TextRun({ 
                text: edu.period,
                italics: true,
                size: DOCX_CONFIG.fonts.NORMAL,
                font: "Arial"
              })
            ]
          })
        ]).flat()
      ]
    }]
  });

  // Generate and save document
  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Karthik_Bibireddy_Resume.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
} 