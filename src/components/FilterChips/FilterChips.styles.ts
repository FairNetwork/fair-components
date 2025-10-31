import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ChipStyleProps } from './FilterChips.types';

export const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const ChipButton = styled(motion.button)<ChipStyleProps>`
  border: ${({ theme }) => theme.glass.borderWidth}px solid rgba(255, 255, 255, 0.25);
  background: ${({ theme, $isActive }) =>
    $isActive
      ? `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentSoft} 100%)`
      : 'rgba(255, 255, 255, 0.12)'};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  color: ${({ theme, $isActive }) =>
    $isActive ? 'rgba(12, 30, 50, 0.95)' : theme.colors.textSecondary};
  border-radius: 999px;
  padding: 0.45rem 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${({ theme, $isActive }) =>
    $isActive ? `${theme.glass.focusRing}, ${theme.glass.shadow}` : theme.glass.shadow};
  transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => `${theme.glass.focusRing}, ${theme.glass.shadow}`};
  }
`;

export const ChipIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

