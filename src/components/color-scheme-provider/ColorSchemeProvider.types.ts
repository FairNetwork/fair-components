export enum ColorMode {
  Dark = 'dark',
  Light = 'light',
}

export interface Colors {
  background: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

export type Theme = Record<ColorMode, Colors>;
