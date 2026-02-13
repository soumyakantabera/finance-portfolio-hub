/**
 * Application configuration
 * Toggle between static data (GitHub Pages) and Supabase
 */

export const config = {
  // Set to 'static' for GitHub Pages deployment, 'supabase' for dynamic backend
  dataSource: (import.meta.env.VITE_DATA_SOURCE || 'static') as 'static' | 'supabase',
  
  // GitHub Pages base path (if deploying to a subdirectory)
  basePath: import.meta.env.VITE_BASE_PATH || '',
  
  // Feature flags
  features: {
    commandPalette: true,
    designSystemToggle: true,
    readingProgress: true,
    backToTop: true,
    imageFilters: true,
    universalEmbed: true,
  },
};

export const isStatic = config.dataSource === 'static';
export const isSupabase = config.dataSource === 'supabase';
