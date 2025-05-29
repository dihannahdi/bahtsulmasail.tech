'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme which reflects the actual applied theme (light/dark), 
  // especially when the initial theme is "system".
  // Fallback to theme if resolvedTheme is somehow not available yet, though rare after mount.
  const currentActualTheme = resolvedTheme || theme;

  if (!mounted) {
    // Placeholder to prevent layout shift and SSR mismatch.
    // Sized to roughly match the button: p-2 (0.5rem padding each side) + w-5 (1.25rem icon) = ~2.25rem.
    // 2.25rem = 36px. w-9 is 2.25rem.
    return <div className="w-9 h-9 rounded-md" />;
  }

  const toggleTheme = () => {
    setTheme(currentActualTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
    >
      {currentActualTheme === 'dark' ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-5 h-5"
        >
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.504-4.705-10.504-10.504 0-3.414 1.612-6.48 4.118-8.406a.75.75 0 01.819.162z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-5 h-5"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.866 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.59zM6.106 5.106a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.061L6.106 5.106zM3 12a.75.75 0 01.75-.75h2.25A.75.75 0 016 12a.75.75 0 01-.75.75H3.75A.75.75 0 013 12z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggleButton; 