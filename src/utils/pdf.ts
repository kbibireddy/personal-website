"use client";

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function generatePDF(): Promise<void> {
  const content = document.getElementById('pdf-content');
  if (!content) return;

  // Temporarily make the content visible and set dimensions
  content.classList.remove('hidden');
  content.style.position = 'fixed';
  content.style.top = '0';
  content.style.left = '0';
  content.style.width = '800px';
  content.style.backgroundColor = 'white';
  content.style.color = 'black';
  content.style.zIndex = '-1000';

  try {
    // Wait for content to be properly rendered
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(content, {
      useCORS: true,
      logging: false,
      width: 800,
      height: content.scrollHeight,
      scale: 2,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const clonedContent = clonedDoc.getElementById('pdf-content');
        if (clonedContent) {
          clonedContent.style.visibility = 'visible';
          clonedContent.style.display = 'block';
          // Add print-friendly styles
          clonedContent.classList.add('print-friendly');
        }
      }
    });

    const contentWidth = 210; // A4 width in mm
    const contentHeight = (canvas.height * contentWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Add the image to the PDF
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      0,
      contentWidth,
      contentHeight
    );

    // If content is longer than one page, add additional pages
    if (contentHeight > 297) { // A4 height in mm
      let remainingHeight = contentHeight;
      let position = -297;

      while (remainingHeight > 297) {
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          0,
          position,
          contentWidth,
          contentHeight
        );
        remainingHeight -= 297;
        position -= 297;
      }
    }

    pdf.save('Karthik_Bibireddy_Resume.pdf');
  } finally {
    // Reset the content styles
    content.classList.add('hidden');
    content.style.position = '';
    content.style.top = '';
    content.style.left = '';
    content.style.width = '';
    content.style.backgroundColor = '';
    content.style.color = '';
    content.style.zIndex = '';
  }
} 