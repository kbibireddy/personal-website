import { useState, useEffect } from 'react';
import { Resume } from '@/types/resume';
import { getResume } from './resumeProvider';

interface UseResumeReturn {
  resume: Resume | null;
  resumeType: string | undefined;
  loading: boolean;
  error: string | null;
  changeResumeType: (type: string | undefined) => Promise<void>;
}

/**
 * Custom hook for managing resume data with URL query parameter support
 * @returns Object containing resume data, type, loading state, and change function
 */
export function useResume(): UseResumeReturn {
  const [resume, setResume] = useState<Resume | null>(null);
  const [resumeType, setResumeType] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get resume type from URL query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const typeFromUrl = urlParams.get('type');
        const type = typeFromUrl || 'swe'; // Default to 'swe' if no type specified
        
        setResumeType(type);
        const resumeData = await getResume(type);
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

  const changeResumeType = async (type: string | undefined) => {
    try {
      setLoading(true);
      setError(null);
      
      setResumeType(type);
      const resumeData = await getResume(type);
      setResume(resumeData);
      
      // Update URL without page reload
      const url = new URL(window.location.href);
      if (type && type !== 'swe') {
        url.searchParams.set('type', type);
      } else {
        url.searchParams.delete('type');
      }
      window.history.pushState({}, '', url.toString());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change resume type';
      setError(errorMessage);
      console.error('Failed to change resume type:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    resume,
    resumeType,
    loading,
    error,
    changeResumeType
  };
}
