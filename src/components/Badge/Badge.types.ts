import { HTMLAttributes } from 'react';

export type BadgeTone = 'default' | 'accent';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  value: number | string;
  tone?: BadgeTone;
  max?: number;
}

export interface BadgeStyleProps {
  $tone: BadgeTone;
}

