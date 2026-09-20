import { Theme, DEFAULT_THEME_AUDIO_CONFIG } from '@/types/theme';

export const DEFAULT_VOLUME = DEFAULT_THEME_AUDIO_CONFIG.volume ?? 0.4;

const THEME_AUDIO_MAP: Record<Theme, string> = {
  meta: '/personal-website/audio/meta-pop.mp3',
  discord: '/personal-website/audio/discord-notification.mp3',
  netflix: '/personal-website/audio/netflix-tudum.mp3',
};

const audioCache: Record<string, HTMLAudioElement> = {};

/**
 * Play theme-specific audio with volume control.
 */
export const playThemeAudio = (
  theme: Theme,
  volume: number = DEFAULT_VOLUME,
  delay: number = DEFAULT_THEME_AUDIO_CONFIG.themeChangeDelay ?? 0
) => {
  const audioPath = THEME_AUDIO_MAP[theme];
  if (!audioPath || typeof window === 'undefined') return;

  if (!audioCache[theme]) {
    audioCache[theme] = new Audio(audioPath);
  }

  const audio = audioCache[theme];
  audio.currentTime = 0;
  audio.volume = Math.max(0, Math.min(1, volume));

  if (delay > 0) {
    setTimeout(() => {
      audio.play().catch(console.error);
    }, delay);
  } else {
    audio.play().catch(console.error);
  }
};
