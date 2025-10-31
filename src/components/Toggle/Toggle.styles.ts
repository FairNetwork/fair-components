import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ToggleStyleProps } from './Toggle.types';

export const ToggleWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.9rem;
`;

export const ToggleButton = styled(motion.button)<ToggleStyleProps>`
  position: relative;
  width: 3rem;
  height: 1.6rem;
  border-radius: 999px;
  border: ${({ theme }) => theme.glass.borderWidth}px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  background: ${({ theme, $isOn }) =>
    $isOn
      ? `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentSoft} 100%)`
      : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  box-shadow: ${({ theme, $isOn }) =>
    $isOn ? `${theme.glass.focusRing}, ${theme.glass.shadow}` : theme.glass.shadow};
  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $isOn }) => ($isOn ? 'flex-end' : 'flex-start')};
  padding: 0 0.25rem;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => `${theme.glass.focusRing}, ${theme.glass.shadow}`};
  }

  &:hover {
    box-shadow: ${({ theme }) => `${theme.glass.hoverRing}, ${theme.glass.shadow}`};
  }
`;

export const Thumb = styled(motion.span)<ToggleStyleProps>`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
`;

export const ToggleLabel = styled.span`
  user-select: none;
`;

