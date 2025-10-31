import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getTheme, glassThemes, GlassTheme, ThemeMode } from './theme';

export interface ThemeContextValue {
  mode: ThemeMode;
  theme: GlassTheme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface GlassThemeProviderProps {
  initialMode?: ThemeMode;
  children: React.ReactNode;
}

export const useGlassTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useGlassTheme must be used within a GlassThemeProvider');
  }
  return context;
};

export const GlassThemeProvider: React.FC<GlassThemeProviderProps> = ({
  initialMode = 'light',
  children,
}) => {
  const [mode, setModeState] = useState<ThemeMode>(initialMode);

  useEffect(() => {
    setModeState(initialMode);
  }, [initialMode]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
  }, []);

  const toggleMode = useCallback(() => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => getTheme(mode), [mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      theme,
      setMode,
      toggleMode,
    }),
    [mode, theme, setMode, toggleMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export { glassThemes };
export type { GlassTheme, ThemeMode };

