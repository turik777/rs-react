'use client';

import { useEffect, useState, type FC, type ReactNode } from 'react';
import { ThemeContext, type Theme } from '../../context/ThemeContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../utils/queryClient';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
};
