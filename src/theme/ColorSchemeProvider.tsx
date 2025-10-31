import { css } from '@linaria/core';
import { styled, ThemeProvider } from '@linaria/react';
import React, {
    CSSProperties,
    ReactNode,
    createContext,
    useContext,
    useMemo,
} from 'react';
import { ColorMode, ColorScheme, ColorSettings } from './types';

export type Theme = Record<string, string>;

export interface ColorSchemeContextValue {
    colorMode: ColorMode;
    color: ColorSettings;
}

export interface ColorSchemeProviderProps {
    children: ReactNode;
    colors: ColorScheme;
    colorMode?: ColorMode;
    style?: CSSProperties;
}

const globalStyles = css`
    :global(.ellipsis) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const ProviderRoot = styled.div<{ $textColor: string }>`
    color: ${({ $textColor }) => $textColor};
`;

export const ColorSchemeContext = createContext<ColorSchemeContextValue | undefined>(undefined);

export const useColorScheme = () => {
    const context = useContext(ColorSchemeContext);

    if (!context) {
        throw new Error('useColorScheme must be used within a ColorSchemeProvider');
    }

    return context;
};

const createTheme = (colors: ColorScheme, mode: ColorMode): Theme => {
    const settings = mode === ColorMode.Light ? colors.light : colors.dark;

    return Object.entries(settings).reduce<Theme>((acc, [token, value]) => {
        acc[token] = value;
        return acc;
    }, {});
};

const createCssVariables = (theme: Theme): CSSProperties => {
    return Object.entries(theme).reduce<CSSProperties>((acc, [token, value]) => {
        const kebabCaseToken = token
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/[_\s]+/g, '-')
            .toLowerCase();

        acc[`--fc-${kebabCaseToken}`] = value;
        return acc;
    }, {});
};

export const ColorSchemeProvider = ({
    children,
    colors,
    colorMode = ColorMode.Light,
    style,
}: ColorSchemeProviderProps) => {
    void globalStyles;

    const theme = useMemo(() => createTheme(colors, colorMode), [colorMode, colors]);
    const cssVariables = useMemo(() => createCssVariables(theme), [theme]);
    const contextValue = useMemo<ColorSchemeContextValue>(() => {
        return {
            colorMode,
            color: colorMode === ColorMode.Light ? colors.light : colors.dark,
        };
    }, [colorMode, colors]);

    return (
        <ThemeProvider theme={theme}>
            <ColorSchemeContext.Provider value={contextValue}>
                <ProviderRoot
                    data-color-mode={colorMode}
                    style={{ ...cssVariables, ...style }}
                    $textColor={theme.primaryTextColor}
                >
                    {children}
                </ProviderRoot>
            </ColorSchemeContext.Provider>
        </ThemeProvider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
