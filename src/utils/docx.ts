"use client";

import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx';
import { Resume } from '@/types/resume';
import resumeOverrides from '@/data/resume_overrides.json';

// Font sizes in half-points (1/2 pt)
const FONT_SIZES = {
  NAME: 28,          // 14pt
  TITLE: 24,         // 12pt
  HEADING: 24,       // 12pt
  NORMAL: 20,        // 10pt
  SMALL: 18,         // 9pt
};

// Document configuration
const CONFIG = {
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
};

export async function generateDOCX(data: Resume): Promise<void> {
  const doc = new Document({
    sections: [{
      properties: {
        page: { margin: CONFIG.margin }
      },
      children: [
        // Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: CONFIG.spacing.header },
          children: [
            new TextRun({
              text: data.name,
              bold: true,
              size: FONT_SIZES.NAME,
              font: "Arial"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: CONFIG.spacing.header },
          children: [
            new TextRun({
              text: resumeOverrides.title,
              size: FONT_SIZES.TITLE,
              font: "Arial"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: CONFIG.spacing.header },
          children: [
            new TextRun({ text: data.contact.email, size: FONT_SIZES.SMALL, font: "Arial" }),
            new TextRun({ text: " • ", size: FONT_SIZES.SMALL, font: "Arial" }),
            new TextRun({ text: data.contact.phone, size: FONT_SIZES.SMALL, font: "Arial" }),
            new TextRun({ text: " • ", size: FONT_SIZES.SMALL, font: "Arial" }),
            new TextRun({ text: data.contact.location, size: FONT_SIZES.SMALL, font: "Arial" })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: CONFIG.spacing.summary },
          children: [
            new TextRun({ text: data.contact.linkedin, size: FONT_SIZES.SMALL, font: "Arial" }),
            new TextRun({ text: " • ", size: FONT_SIZES.SMALL, font: "Arial" }),
            new TextRun({ text: resumeOverrides.website, size: FONT_SIZES.SMALL, font: "Arial" })
          ]
        }),

        // Professional Summary
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: CONFIG.spacing.section,
          children: [new TextRun({ 
            text: "Professional Summary", 
            bold: true,
            size: FONT_SIZES.HEADING,
            font: "Arial"
          })]
        }),
        new Paragraph({
          spacing: { after: CONFIG.spacing.summary },
          children: [
            new TextRun({
              text: resumeOverrides.summary,
              size: FONT_SIZES.NORMAL,
              font: "Arial"
            })
          ]
        }),

        // Work Experience
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: CONFIG.spacing.section,
          children: [new TextRun({ 
            text: "Work Experience", 
            bold: true,
            size: FONT_SIZES.HEADING,
            font: "Arial"
          })]
        }),
        ...data.workExperience.slice(0, -1).map((job, index) => [
          new Paragraph({
            spacing: CONFIG.spacing.item,
            children: [
              new TextRun({ 
                text: job.company + " - " + job.title, 
                bold: true,
                size: FONT_SIZES.NORMAL,
                font: "Arial"
              }),
              new TextRun({ text: "  ", size: FONT_SIZES.NORMAL, font: "Arial" }),
              new TextRun({ 
                text: job.period, 
                italics: true,
                size: FONT_SIZES.NORMAL,
                font: "Arial"
              })
            ]
          }),
          ...job.description.slice(0, index === 0 ? 6 : 5).map(
            desc => new Paragraph({
              spacing: { before: 0, after: 60 },
              bullet: CONFIG.bullet,
              children: [new TextRun({ 
                text: desc,
                size: FONT_SIZES.NORMAL,
                font: "Arial"
              })]
            })
          )
        ]).flat(),

        // Technical Skills
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: CONFIG.spacing.section,
          children: [new TextRun({ 
            text: "Technical Skills", 
            bold: true,
            size: FONT_SIZES.HEADING,
            font: "Arial"
          })]
        }),
        new Paragraph({
          spacing: { after: CONFIG.spacing.summary },
          children: [
            new TextRun({
              text: data.skills
                .sort((a, b) => b.proficiency - a.proficiency)
                .slice(0, 20)
                .map(skill => skill.name)
                .join(" • "),
              size: FONT_SIZES.NORMAL,
              font: "Arial"
            })
          ]
        }),

        // Education
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: CONFIG.spacing.section,
          children: [new TextRun({ 
            text: "Education", 
            bold: true,
            size: FONT_SIZES.HEADING,
            font: "Arial"
          })]
        }),
        ...data.education.map((edu, index) => [
          new Paragraph({
            spacing: { before: 0, after: 2 },
            children: [
              new TextRun({ 
                text: `${edu.degree} (GPA: ${edu.gpa})`, 
                bold: true,
                size: FONT_SIZES.NORMAL,
                font: "Arial"
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({ 
                text: edu.school,
                size: FONT_SIZES.NORMAL,
                font: "Arial"
              }),
              new TextRun({ 
                text: "  ",
                size: FONT_SIZES.NORMAL,
                font: "Arial"
              }),
              new TextRun({ 
                text: edu.period,
                italics: true,
                size: FONT_SIZES.NORMAL,
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