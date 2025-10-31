import { keyframes } from 'styled-components';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { ButtonStyleProps } from './Button.types';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const sizeStyles = {
  sm: css`
    padding: 0.45rem 1rem;
    font-size: 0.85rem;
    min-height: 2.25rem;
    gap: 0.4rem;
  `,
  md: css`
    padding: 0.65rem 1.25rem;
    font-size: 0.95rem;
    min-height: 2.5rem;
    gap: 0.55rem;
  `,
  lg: css`
    padding: 0.85rem 1.6rem;
    font-size: 1.05rem;
    min-height: 2.9rem;
    gap: 0.65rem;
  `,
};

const variantStyles = {
  primary: css<ButtonStyleProps>`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.accent} 0%,
      ${({ theme }) => theme.colors.accentSoft} 100%
    );
    color: rgba(8, 16, 30, 0.92);
  `,
  secondary: css<ButtonStyleProps>`
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    color: ${({ theme }) => theme.colors.textPrimary};
  `,
  ghost: css<ButtonStyleProps>`
    background: rgba(255, 255, 255, 0.08);
    color: ${({ theme }) => theme.colors.textSecondary};
    border-color: rgba(255, 255, 255, 0.28);
  `,
};

export const ButtonBase = styled(motion.button)<ButtonStyleProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: ${({ theme }) => theme.glass.borderRadius};
  border: ${({ theme }) => theme.glass.borderWidth}px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  box-shadow: ${({ theme }) => theme.glass.shadow};
  transition: all 0.2s ease;
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  overflow: hidden;
  text-decoration: none;
  user-select: none;

  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};

  &:hover {
    box-shadow: ${({ theme }) => `${theme.glass.hoverRing}, ${theme.glass.shadow}`};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => `${theme.glass.focusRing}, ${theme.glass.shadow}`};
  }

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: inherit;
`;

export const IconSlot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
`;

export const LoadingSpinner = styled.span`
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  backdrop-filter: blur(18px);
  background: rgba(255, 255, 255, 0.12);
  color: inherit;
  font-weight: 600;

  &:before {
    content: '';
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: ${({ theme }) => theme.colors.accent};
    animation: ${spin} 0.9s linear infinite;
  }
`;

