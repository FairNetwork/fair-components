import { ChangeEvent, InputHTMLAttributes } from 'react';

export type CheckboxShape = 'rounded' | 'square';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size' | 'checked'> {
  checked: boolean;
  onChange: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  shape?: CheckboxShape;
}

export interface CheckboxStyleProps {
  $checked: boolean;
  $shape: CheckboxShape;
  $disabled?: boolean;
}

