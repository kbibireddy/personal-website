import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TudumToastProps {
  show: boolean;
  onClose: () => void;
}

export default function TudumToast({ show, onClose }: TudumToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-20 left-4 z-50 bg-[#E50914] text-white px-4 py-2 rounded-lg shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">🎬</span>
            <span className="font-medium">Netflix Theme Loaded!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}