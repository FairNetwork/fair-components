import React from 'react';
import { BadgeContainer } from './Badge.styles';
import { BadgeProps } from './Badge.types';
import { formatBadgeValue } from './Badge.utils';

export const Badge: React.FC<BadgeProps> = ({ value, tone = 'default', max, ...rest }) => (
  <BadgeContainer
    $tone={tone}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    {...rest}
  >
    {formatBadgeValue(value, max)}
  </BadgeContainer>
);

export default Badge;

