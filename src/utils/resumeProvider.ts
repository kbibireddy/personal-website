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

/**
 * Get overrides for a specific resume type
 * @param type - The resume type to get overrides for
 * @returns Promise<any> - The overrides data
 */
export async function getOverrides(type?: string): Promise<any> {
  try {
    let overrides: any = {};
    
    if (type && type !== 'swe') {
      try {
        const specificOverrides = await import(`@/data/resume_${type}_overrides.json`);
        overrides = specificOverrides.default;
      } catch {
        // Fallback to SWE overrides
        const sweOverrides = await import('@/data/resume_swe_overrides.json');
        overrides = sweOverrides.default;
      }
    } else {
      // Load SWE overrides
      const sweOverrides = await import('@/data/resume_swe_overrides.json');
      overrides = sweOverrides.default;
    }
    
    return overrides;
  } catch (error) {
    console.error('Failed to load overrides:', error);
    // Use default values if all else fails
    return {
      title: "Professional Resume",
      website: "https://karthikbibireddy.com",
      summary: "Experienced professional with diverse skills and expertise."
    };
  }
}

/**
 * Get resume data with overrides applied
 * @param type - The resume type to load
 * @returns Promise<Resume> - The resume data with overrides applied
 */
export async function getResumeWithOverrides(type?: string): Promise<Resume> {
  try {
    const [resumeData, overrides] = await Promise.all([
      getResume(type),
      getOverrides(type)
    ]);
    
    // Apply overrides to resume data
    const finalData = {
      ...resumeData,
      headline: overrides.headline || resumeData.headline,
      professionalSummary: overrides.professionalSummary || resumeData.professionalSummary,
      website: overrides.website || resumeData.website,
    };
    
    return finalData;
  } catch (error) {
    console.error('Failed to load resume with overrides:', error);
    throw new Error('Failed to load resume with overrides');
  }
}


