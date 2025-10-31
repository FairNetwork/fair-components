import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  isFullWidth?: boolean;
}

export interface ButtonStyleProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $isFullWidth: boolean;
  disabled?: boolean;
}

