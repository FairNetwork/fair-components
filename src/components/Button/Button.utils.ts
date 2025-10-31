import { ReactNode } from 'react';

export const isIconOnly = (content: ReactNode, icon?: ReactNode): boolean => {
  if (!icon) {
    return false;
  }
  if (content === null || content === undefined || content === false) {
    return true;
  }
  if (typeof content === 'string') {
    return content.trim().length === 0;
  }
  if (Array.isArray(content)) {
    return content.every((child) => child === null || child === undefined || child === false);
  }
  return false;
};

