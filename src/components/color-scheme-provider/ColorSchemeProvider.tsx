import React, { FC, ReactNode, useEffect } from "react";
import { ColorMode, Theme } from "./ColorSchemeProvider.types";

export interface ColorSchemeProviderProps {
    colorMode: ColorMode;
    theme: Theme;
    children: ReactNode;
}

export const ColorSchemeProvider: FC<ColorSchemeProviderProps> = ({
                                                                      children,
                                                                      theme,
                                                                      colorMode,
                                                                  }) => {
    useEffect(() => {
        const root = document.documentElement;

        // Setze das Attribut für CSS-Selektoren (optional)
        root.setAttribute("data-color-mode", colorMode);

        // Theme-Objekt in CSS-Variablen schreiben
        const colors = theme[colorMode];
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }, [theme, colorMode]);

    return <div>{children}</div>;
};

ColorSchemeProvider.displayName = "ColorSchemeProvider";

export default ColorSchemeProvider