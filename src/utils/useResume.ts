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
        
        // Set resumeType for display purposes (empty string for SWE, actual type for others)
        if (typeFromUrl === 'swe' || !typeFromUrl) {
          setResumeType(undefined); // SWE is default, no type parameter
        } else {
          setResumeType(typeFromUrl);
        }
        
        // For data loading, treat 'swe' and no type the same
        const typeForData = typeFromUrl === 'swe' ? undefined : (typeFromUrl || undefined);
        const resumeData = await getResume(typeForData);
        setResume(resumeData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load resume';
        setError(errorMessage);
        console.error('Failed to load resume:', err);
      } finally {
        setLoading(false);
      }
    };

    // Load resume on mount
    loadResume();

    // Listen for URL changes (browser back/forward buttons)
    const handlePopState = () => {
      loadResume();
    };

    window.addEventListener('popstate', handlePopState);

    // Listen for URL changes from other components
    const handleUrlChange = () => {
      loadResume();
    };

    // Custom event listener for URL changes
    window.addEventListener('resumeTypeChanged', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('resumeTypeChanged', handleUrlChange);
    };
  }, []);

  const changeResumeType = async (type: string | undefined) => {
    try {
      setLoading(true);
      setError(null);
      
      // Set resumeType for display (undefined for SWE, actual type for others)
      if (type === 'swe' || !type) {
        setResumeType(undefined);
      } else {
        setResumeType(type);
      }
      
      // For data loading, treat 'swe' and undefined the same
      const typeForData = (type === 'swe' || !type) ? undefined : type;
      const resumeData = await getResume(typeForData);
      setResume(resumeData);
      
      // Update URL without page reload
      const url = new URL(window.location.href);
      if (type && type !== 'swe') {
        url.searchParams.set('type', type);
      } else {
        url.searchParams.delete('type');
      }
      window.history.pushState({}, '', url.toString());
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('resumeTypeChanged'));
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
