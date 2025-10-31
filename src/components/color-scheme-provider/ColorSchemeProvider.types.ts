export enum ColorMode {
    Dark = 'dark',
    Light = 'light',
}

export interface Colors {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;

    backgroundColor: string;
    backgroundColorSecondary: string;
    surfaceColor: string;

    textColor: string;
    textColorSecondary: string;
    textColorDisabled: string;

    successColor: string;
    warningColor: string;
    errorColor: string;
    infoColor: string;
}

export interface Glass {
    blurStrength: string;
    transparency: number;
    borderColor: string;
    borderWidth: string;
    glowColor: string;
    glowIntensity: number;
    shadowColor: string;
    shadowBlur: string;
    edgeHighlight: string;
}

export interface Typography {
    fontFamily: string;
    fontSizeBase: string;
    headingWeight: number;
    textWeight: number;
}

export interface Radius {
    small: string;
    medium: string;
    large: string;
}

export interface Theme {
    colors: Colors;
    glass: Glass;
    typography: Typography;
    radius: Radius;
    spacing: (factor: number) => string;
}

export type ColorScheme = Record<ColorMode, Theme>;
