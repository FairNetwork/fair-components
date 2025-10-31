import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { BadgeStyleProps } from './Badge.types';

const toneStyles = {
  default: css`
    background: rgba(255, 255, 255, 0.2);
    color: ${({ theme }) => theme.colors.textPrimary};
  `,
  accent: css`
    background: linear-gradient(135deg, rgba(120, 200, 255, 0.9) 0%, rgba(70, 150, 220, 0.6) 100%);
    color: rgba(10, 20, 40, 0.9);
  `,
};

export const BadgeContainer = styled(motion.div)<BadgeStyleProps>`
  min-width: 1.5rem;
  padding: 0.25rem 0.55rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: ${({ theme }) => theme.glass.borderWidth}px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: ${({ theme }) => theme.glass.shadow};
  ${({ $tone }) => toneStyles[$tone]};
`;

