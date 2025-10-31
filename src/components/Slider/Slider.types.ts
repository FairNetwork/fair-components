import { ChangeEvent } from 'react';

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  onChange: (value: number, event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export interface SliderStyleProps {
  $disabled?: boolean;
}

