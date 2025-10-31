import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { InputStyleProps } from './Input.types';

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.95rem;
`;

export const Label = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FieldContainer = styled(motion.div)<InputStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.glass.borderRadius};
  border: ${({ theme }) => theme.glass.borderWidth}px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  box-shadow: ${({ theme, $isFocused }) =>
    $isFocused ? `${theme.glass.focusRing}, ${theme.glass.shadow}` : theme.glass.shadow};
  padding: ${({ $isCompact }) => ($isCompact ? '0.35rem 0.65rem' : '0.65rem 0.9rem')};
  transition: box-shadow 0.2s ease, border-color 0.3s ease, background 0.3s ease;
  overflow: hidden;

  ${({ $status, theme }) =>
    $status !== 'default' &&
    css`
      border-color: ${$status === 'warning' ? theme.colors.warning : theme.colors.error};
    `};
`;

export const GlassField = styled.input<InputStyleProps>`
  flex: 1;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ $isCompact }) => ($isCompact ? '0.9rem' : '1rem')};
  padding: 0;
  outline: none;
  height: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ActionSlot = styled.button<{ $position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-${({ $position }) => ($position === 'left' ? 'right' : 'left')}: 0.4rem;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.glass.focusRing};
  }

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

export const HelperText = styled.span<{ $status: InputStyleProps['$status'] }>`
  font-size: 0.75rem;
  color: ${({ theme, $status }) => {
    switch ($status) {
      case 'warning':
        return theme.colors.warning;
      case 'error':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  }};
  padding-left: 0.6rem;
`;

export const Aura = styled(motion.span)`
  position: absolute;
  inset: -35%;
  border-radius: inherit;
  filter: blur(25px);
  pointer-events: none;
  opacity: 0;
`;

