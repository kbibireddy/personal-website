export type Theme = 'meta' | 'discord' | 'netflix';

export interface ThemeConfig {
  volume?: number; // Volume for theme audio (0.0 to 1.0)
  initialLoadDelay?: number; // Delay for initial page load audio (ms)
  themeChangeDelay?: number; // Delay for theme change audio (ms)
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  volume: 0.4, // 40% volume
  initialLoadDelay: 500, // 500ms delay on initial load
  themeChangeDelay: 0 // No delay when switching themes
};