import { ReactNode } from 'react';

export interface ToolbarAction {
  id: string;
  icon: ReactNode;
  label: string;
  onPress: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export interface ToolbarProps {
  actions: ToolbarAction[];
  ariaLabel?: string;
}

export interface ToolbarItemStyleProps {
  $isActive?: boolean;
}

