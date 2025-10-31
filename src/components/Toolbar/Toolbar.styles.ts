import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ToolbarItemStyleProps } from './Toolbar.types';

export const ToolbarContainer = styled(motion.nav)`
  position: relative;
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  border: ${({ theme }) => theme.glass.borderWidth}px solid rgba(255, 255, 255, 0.25);
  box-shadow: ${({ theme }) => theme.glass.shadow};
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.75rem;
`;

export const ToolbarButton = styled(motion.button)<ToolbarItemStyleProps>`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.glass.focusRing};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const ToolbarGlow = styled(motion.span)`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(120, 200, 255, 0.35), transparent 70%);
  opacity: 0;
`;

export const ToolbarLabel = styled.span`
  position: absolute;
  bottom: -1.6rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

