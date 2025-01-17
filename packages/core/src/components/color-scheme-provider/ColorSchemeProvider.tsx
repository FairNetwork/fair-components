import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ColorMode, ColorScheme, ColorSettings } from '../../types/colorSchemeProvider';

export type ColorSchemeProviderProps = {
    /**
     * The content of the application or the components for which the styles should be set
     */
    children: ReactNode;
    /**
     * The colors of the components
     */
    colors: ColorScheme;
    /**
     * The color mode to be used for the children
     */
    colorMode?: ColorMode;
    /**
     * Additional styles set on the root element
     */
    style?: { [key: string]: string | number };
};

export interface Theme {
    [key: string]: string;
}

export type WithTheme<T> = T & {
    theme: Theme;
};

const GlobalStyle = createGlobalStyle`
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export interface ColorSchemeContextProps {
    color: ColorSettings;
    colorMode: ColorMode;
}

export const ColorSchemeContext = createContext<ColorSchemeContextProps | undefined>(undefined);

export const useColorScheme = () => useContext(ColorSchemeContext);

const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
    children,
    colors,
    colorMode = ColorMode.Light,
    style,
}) => {
    const theme: Theme = useMemo(() => {
        const settings = colorMode === ColorMode.Light ? colors.light : colors.dark;

        return Object.keys(settings).reduce((acc, key) => {
            acc[key] = settings[key as keyof ColorSettings];
            return acc;
        }, {} as Theme);
    }, [colorMode, colors]);

    const contextValue: ColorSchemeContextProps | undefined = useMemo(() => {
        return {
            colorMode,
            color: colorMode === ColorMode.Light ? colors.light : colors.dark,
        };
    }, [colorMode, colors]);

    return (
        <ThemeProvider theme={theme}>
            <ColorSchemeContext.Provider value={contextValue}>
                <div
                    className="color-scheme-provider"
                    style={{
                        ...style,
                        color: theme['primaryTextColor'],
                    }}
                >
                    {children}
                </div>
                <GlobalStyle />
            </ColorSchemeContext.Provider>
        </ThemeProvider>
    );
};

ColorSchemeProvider.displayName = 'ColorSchemeProvider';

export default ColorSchemeProvider;
