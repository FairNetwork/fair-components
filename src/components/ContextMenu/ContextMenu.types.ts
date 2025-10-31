import { ReactNode } from 'react';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  isOpen: boolean;
  position: ContextMenuPosition;
  onRequestClose: () => void;
  labelledBy?: string;
}

export interface ContextMenuStyleProps {
  $isOpen: boolean;
}

