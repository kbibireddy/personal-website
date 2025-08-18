"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '@/utils/useResume';
import { PiCode, PiBrainThin } from 'react-icons/pi';

interface ResumeTypeToggleProps {
  theme: string;
}

export default function ResumeTypeToggle({ theme }: ResumeTypeToggleProps) {
  const { resumeType, changeResumeType } = useResume();

  const handleTypeChange = async (type: string) => {
    await changeResumeType(type === 'swe' ? undefined : type);
  };

  const getButtonClasses = (type: string) => {
    const isActive = (type === 'swe' && !resumeType) || (type === 'quant' && resumeType === 'quant');
    const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm";
    
    if (isActive) {
      return `${baseClasses} text-white bg-gradient-to-r ${
        theme === 'netflix' ? 'from-red-600 to-red-700' :
        theme === 'meta' ? 'from-blue-600 to-blue-700' :
        theme === 'discord' ? 'from-indigo-600 to-indigo-700' :
        'from-red-600 to-red-700'
      } shadow-lg`;
    }
    
    return `${baseClasses} text-current/70 hover:text-current bg-current/5 hover:bg-current/10 border border-current/20 hover:border-current/30`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-8 right-8 z-50 flex items-center gap-2"
    >
      <motion.button
        onClick={() => handleTypeChange('swe')}
        className={getButtonClasses('swe')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PiCode className="text-base" />
        SWE
      </motion.button>
      
      <motion.button
        onClick={() => handleTypeChange('quant')}
        className={getButtonClasses('quant')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <PiBrainThin className="text-base" />
        Quant
      </motion.button>
    </motion.div>
  );
}
