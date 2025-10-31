import { GlassTheme } from '../../theme/theme';
import { InputStatus } from './Input.types';

export const getStatusColors = (theme: GlassTheme, status: InputStatus): string[] => {
  switch (status) {
    case 'warning':
      return [
        `${theme.colors.warning}`,
        `rgba(255, 196, 86, 0.75)`,
        `rgba(255, 166, 46, 0.55)`,
      ];
    case 'error':
      return [
        `${theme.colors.error}`,
        `rgba(255, 145, 145, 0.75)`,
        `rgba(255, 105, 105, 0.55)`,
      ];
    default:
      return [
        `${theme.colors.accent}`,
        `${theme.colors.accentSoft}`,
        `${theme.colors.glow}`,
      ];
  }
};

