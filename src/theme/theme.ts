export type ThemeMode = 'light' | 'dark';

export interface GlassPalette {
  textPrimary: string;
  textSecondary: string;
  background: string;
  surface: string;
  accent: string;
  accentSoft: string;
  border: string;
  glow: string;
  warning: string;
  error: string;
  success: string;
}

export interface GlassParameters {
  backdropBlur: string;
  surfaceOpacity: number;
  borderWidth: number;
  borderRadius: string;
  focusRing: string;
  hoverRing: string;
  shadow: string;
  overlay: string;
}

export interface GlassTheme {
  mode: ThemeMode;
  colors: GlassPalette;
  glass: GlassParameters;
}

const lightTheme: GlassTheme = {
  mode: 'light',
  colors: {
    textPrimary: 'rgba(10, 18, 36, 0.88)',
    textSecondary: 'rgba(10, 18, 36, 0.64)',
    background: 'rgba(245, 248, 255, 0.8)',
    surface: 'rgba(255, 255, 255, 0.65)',
    accent: 'rgba(70, 140, 255, 0.9)',
    accentSoft: 'rgba(120, 180, 255, 0.45)',
    border: 'rgba(255, 255, 255, 0.5)',
    glow: 'rgba(120, 200, 255, 0.8)',
    warning: 'rgba(255, 176, 45, 0.95)',
    error: 'rgba(255, 95, 95, 0.95)',
    success: 'rgba(120, 220, 180, 0.95)',
  },
  glass: {
    backdropBlur: '20px',
    surfaceOpacity: 0.75,
    borderWidth: 1.5,
    borderRadius: '18px',
    focusRing: '0 0 0 1.5px rgba(120, 200, 255, 0.9)',
    hoverRing: '0 0 0 1px rgba(120, 200, 255, 0.6)',
    shadow: '0 20px 40px -25px rgba(15, 30, 60, 0.35)',
    overlay: 'rgba(245, 248, 255, 0.35)',
  },
};

const darkTheme: GlassTheme = {
  mode: 'dark',
  colors: {
    textPrimary: 'rgba(232, 240, 255, 0.94)',
    textSecondary: 'rgba(232, 240, 255, 0.64)',
    background: 'rgba(12, 20, 33, 0.8)',
    surface: 'rgba(18, 28, 46, 0.65)',
    accent: 'rgba(120, 200, 255, 0.95)',
    accentSoft: 'rgba(70, 150, 220, 0.5)',
    border: 'rgba(130, 180, 255, 0.45)',
    glow: 'rgba(130, 210, 255, 0.85)',
    warning: 'rgba(255, 190, 60, 0.95)',
    error: 'rgba(255, 115, 115, 0.95)',
    success: 'rgba(120, 220, 190, 0.95)',
  },
  glass: {
    backdropBlur: '22px',
    surfaceOpacity: 0.6,
    borderWidth: 1.5,
    borderRadius: '18px',
    focusRing: '0 0 0 1.5px rgba(130, 210, 255, 0.9)',
    hoverRing: '0 0 0 1px rgba(130, 210, 255, 0.6)',
    shadow: '0 24px 48px -32px rgba(4, 12, 24, 0.65)',
    overlay: 'rgba(6, 12, 20, 0.6)',
  },
};

export const glassThemes: Record<ThemeMode, GlassTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode: ThemeMode): GlassTheme => glassThemes[mode];

export type { GlassTheme as Theme };

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends GlassTheme {}
}

