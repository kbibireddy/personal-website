// Animation color palettes
export const ANIMATION_COLORS = {
  stars: [
    '#FF4500', // Orange Red
    '#FF6347', // Tomato
    '#FF7F50', // Coral
    '#FFA500', // Orange
    '#FFD700', // Gold
    '#FFFF00', // Yellow
    '#32CD32', // Lime Green
    '#00FF00', // Lime
    '#98FB98', // Pale Green
    '#90EE90', // Light Green
  ],
  sparks: [
    '#FF0000', // Red
    '#FF4500', // Orange Red
    '#FFA500', // Orange
    '#FFD700', // Gold
    '#FFFF00', // Yellow
    '#ADFF2F', // Green Yellow
    '#7FFF00', // Chartreuse
    '#00FF00', // Green
    '#32CD32', // Lime Green
    '#98FB98', // Pale Green
  ],
} as const;

/**
 * Get a random color from a specific animation palette
 * @param type - The type of animation ('stars' or 'sparks')
 * @returns A random color from the specified palette
 */
export function getRandomAnimationColor(type: keyof typeof ANIMATION_COLORS): string {
  const colors = ANIMATION_COLORS[type];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Get multiple random colors from a specific animation palette
 * @param type - The type of animation ('stars' or 'sparks')
 * @param count - Number of colors to return
 * @returns Array of random colors from the specified palette
 */
export function getRandomAnimationColors(type: keyof typeof ANIMATION_COLORS, count: number): string[] {
  const colors = ANIMATION_COLORS[type];
  const result: string[] = [];
  
  for (let i = 0; i < count; i++) {
    result.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  
  return result;
} 