import { ReactNode } from 'react';

export interface PopupAction {
  id: string;
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export interface PopupProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  actions?: PopupAction[];
  children?: ReactNode;
}

