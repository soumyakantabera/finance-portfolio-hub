import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeName = 'navy-gold' | 'emerald' | 'rose' | 'purple' | 'ocean' | 'sunset';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: { name: ThemeName; label: string; preview: string }[] = [
  { name: 'navy-gold', label: 'Navy & Gold', preview: 'bg-[#1e3a5f]' },
  { name: 'emerald', label: 'Emerald', preview: 'bg-[#047857]' },
  { name: 'rose', label: 'Rose', preview: 'bg-[#be123c]' },
  { name: 'purple', label: 'Purple', preview: 'bg-[#7c3aed]' },
  { name: 'ocean', label: 'Ocean', preview: 'bg-[#0891b2]' },
  { name: 'sunset', label: 'Sunset', preview: 'bg-[#ea580c]' },
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('portfolio-theme') as ThemeName) || 'navy-gold';
    }
    return 'navy-gold';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    themes.forEach(t => root.classList.remove(`theme-${t.name}`));
    
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
