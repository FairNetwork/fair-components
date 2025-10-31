import { InputHTMLAttributes, ReactNode } from 'react';

export type InputStatus = 'default' | 'warning' | 'error';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  status?: InputStatus;
  isCompact?: boolean;
  onRightActionClick?: () => void;
  onLeftActionClick?: () => void;
  leftActionAriaLabel?: string;
  rightActionAriaLabel?: string;
}

export interface InputStyleProps {
  $isFocused: boolean;
  $hasLeftAction: boolean;
  $hasRightAction: boolean;
  $isCompact: boolean;
  $status: InputStatus;
}

