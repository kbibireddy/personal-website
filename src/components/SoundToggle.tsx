import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface SoundToggleProps {
  isNetflixTheme: boolean;
  onSoundToggle: (enabled: boolean) => void;
}

export default function SoundToggle({ isNetflixTheme, onSoundToggle }: SoundToggleProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleToggle = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    onSoundToggle(newState);
  };

  if (!isNetflixTheme) {
    return null;
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E50914]/20 hover:bg-[#E50914]/30 text-[#E50914] text-sm font-medium transition-all duration-200 border border-[#E50914]/30"
    >
      {soundEnabled ? (
        <>
          <FaVolumeUp className="text-sm" />
          <span>Sound On</span>
        </>
      ) : (
        <>
          <FaVolumeMute className="text-sm" />
          <span>Sound Off</span>
        </>
      )}
    </motion.button>
  );
}