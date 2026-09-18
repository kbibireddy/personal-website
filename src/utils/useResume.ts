import { useState, useEffect } from 'react';
import { Resume } from '@/types/resume';
import { getResume } from './resumeProvider';

interface UseResumeReturn {
  resume: Resume | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook for loading the SWE resume data
 */
export function useResume(): UseResumeReturn {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        setLoading(true);
        setError(null);
        const resumeData = await getResume();
        setResume(resumeData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load resume';
        setError(errorMessage);
        console.error('Failed to load resume:', err);
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, []);

  return {
    resume,
    loading,
    error,
  };
}
