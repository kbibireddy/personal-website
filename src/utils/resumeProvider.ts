import { Resume } from '@/types/resume';

/**
 * Resume provider that loads different resume types based on the type parameter
 * @param type - The resume type to load (e.g., 'software', 'data', 'product')
 * @returns Promise<Resume> - The loaded resume data
 */
export async function getResume(type?: string): Promise<Resume> {
  try {
    let resumeData: Resume;
    
    if (type) {
      // Try to load the specific resume type
      try {
        const specificResume = await import(`@/data/resume_${type}.json`);
        resumeData = specificResume.default as unknown as Resume;
      } catch (error) {
        console.warn(`Resume type '${type}' not found, falling back to swe resume`);
        // Fallback to swe resume
        const defaultResume = await import('@/data/resume_swe.json');
        resumeData = defaultResume.default as unknown as Resume;
      }
    } else {
      // Load swe resume as default
      const defaultResume = await import('@/data/resume_swe.json');
      resumeData = defaultResume.default as unknown as Resume;
    }
    
    return resumeData;
  } catch (error) {
    console.error('Failed to load resume data:', error);
    throw new Error('Failed to load resume data');
  }
}


