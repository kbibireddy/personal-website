import { Theme } from '@/types/theme';

// Default volume for theme sounds (40%)
export const DEFAULT_VOLUME = 0.4;

// Map of theme to audio file paths
const THEME_AUDIO_MAP: Record<Theme, string> = {
  meta: '/personal-website/audio/meta-pop.mp3',
  discord: '/personal-website/audio/discord-notification.mp3',
  netflix: '/personal-website/audio/netflix-tudum.mp3'
};

// Cache audio instances to prevent reloading
const audioCache: Record<string, HTMLAudioElement> = {};

/**
 * Play theme-specific audio with volume control
 * @param theme Current theme
 * @param volume Volume level (0.0 to 1.0)
 * @param delay Delay in milliseconds before playing
 */
export const playThemeAudio = (theme: Theme, volume: number = DEFAULT_VOLUME, delay: number = 0) => {
  const audioPath = THEME_AUDIO_MAP[theme];
  if (!audioPath) return;

  // Get or create audio instance
  if (!audioCache[theme]) {
    audioCache[theme] = new Audio(audioPath);
  }
  
  const audio = audioCache[theme];
  
  // Reset audio to start
  audio.currentTime = 0;
  audio.volume = Math.max(0, Math.min(1, volume)); // Clamp volume between 0 and 1
  
  // Play with delay if specified
  if (delay > 0) {
    setTimeout(() => {
      audio.play().catch(console.error);
    }, delay);
  } else {
    audio.play().catch(console.error);
  }
};
