import { ReactNode } from 'react';

export interface FilterChipOption {
  id: string;
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface FilterChipsProps {
  options: FilterChipOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  ariaLabel?: string;
}

export interface ChipStyleProps {
  $isActive: boolean;
}

