export enum ColorMode {
    Dark = 'dark',
    Light = 'light',
}

export interface ColorSettings {
    primaryColor: string;
    secondaryColor: string;
    primaryBackgroundColor: string;
    secondaryBackgroundColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
}

export interface ColorScheme {
    light: ColorSettings;
    dark: ColorSettings;
}
