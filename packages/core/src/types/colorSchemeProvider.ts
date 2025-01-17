export enum ColorMode {
    Dark,
    Light,
}

export interface ColorScheme {
    dark: ColorSettings;
    light: ColorSettings;
}

export interface ColorSettings {
    primaryColor: string;
    secondaryColor: string;
    primaryBackgroundColor: string;
    secondaryBackgroundColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
}
