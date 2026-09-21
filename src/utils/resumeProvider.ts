import { Resume } from '@/types/resume';

/**
 * Load the SWE resume data
 */
export async function getResume(): Promise<Resume> {
  try {
    const defaultResume = await import('@/data/resume_swe.json');
    return defaultResume.default as unknown as Resume;
  } catch (error) {
    console.error('Failed to load resume data:', error);
    throw new Error('Failed to load resume data');
  }
}

/**
 * Get SWE resume overrides for PDF/DOCX export
 */
export async function getOverrides(): Promise<any> {
  try {
    const sweOverrides = await import('@/data/resume_swe_overrides.json');
    return sweOverrides.default;
  } catch (error) {
    console.error('Failed to load overrides:', error);
    return {
      title: "Professional Resume",
      website: "https://karthikbibireddy.com",
      summary: "Experienced professional with diverse skills and expertise."
    };
  }
}

/**
 * Get SWE resume data with overrides applied
 */
export async function getResumeWithOverrides(): Promise<Resume> {
  try {
    const [resumeData, overrides] = await Promise.all([
      getResume(),
      getOverrides()
    ]);
    
    return {
      ...resumeData,
      headline: overrides.headline || resumeData.headline,
      professionalSummary: overrides.professionalSummary || resumeData.professionalSummary,
      website: overrides.website || resumeData.website,
    };
  } catch (error) {
    console.error('Failed to load resume with overrides:', error);
    throw new Error('Failed to load resume with overrides');
  }
}
