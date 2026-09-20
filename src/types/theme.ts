export type Theme = 'meta' | 'discord' | 'netflix';

/** Audio timing/volume for theme switcher sounds (from theme-audio-and-fonts). */
export interface ThemeAudioConfig {
  volume?: number; // 0.0 to 1.0
  initialLoadDelay?: number; // ms
  themeChangeDelay?: number; // ms
}

export const DEFAULT_THEME_AUDIO_CONFIG: ThemeAudioConfig = {
  volume: 0.4,
  initialLoadDelay: 500,
  themeChangeDelay: 0,
};
