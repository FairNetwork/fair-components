import { HTMLAttributes } from 'react';

export interface ToggleProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  isOn: boolean;
  onToggle: (isOn: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export interface ToggleStyleProps {
  $isOn: boolean;
  $disabled?: boolean;
}

