import React, { FC, ReactNode, useMemo } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ColorMode, Colors, Theme } from './ColorSchemeProvider.types';

export interface ColorSchemeProviderProps {
  colorMode: ColorMode;
  theme: Theme;
  children: ReactNode;
}

const GlobalThemeVariables = createGlobalStyle<{ $colors: Colors; $mode: ColorMode }>`
  :root {
    color-scheme: ${({ $mode }) => $mode};
    ${({ $colors }) =>
      Object.entries($colors)
        .map(([token, value]) => `--${token}: ${value};`)
        .join('\n')}
  }
`;

export const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({ children, theme, colorMode }) => {
  const colors = theme[colorMode];

  const themeValue = useMemo(
    () => ({
      colorMode,
      colors,
      theme,
    }),
    [colorMode, colors, theme],
  );

  return (
    <ThemeProvider theme={themeValue}>
      <GlobalThemeVariables $colors={colors} $mode={colorMode} />
      {children}
    </ThemeProvider>
  );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
