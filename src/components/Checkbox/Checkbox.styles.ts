import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { CheckboxStyleProps } from './Checkbox.types';

export const CheckboxWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.9rem;
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const shapeStyles = {
  rounded: css`
    border-radius: 12px;
  `,
  square: css`
    border-radius: 8px;
  `,
};

export const Box = styled(motion.span)<CheckboxStyleProps>`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: ${({ theme }) => theme.glass.borderWidth}px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme, $checked }) =>
    $checked ? `linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.accentSoft} 100%)` : 'rgba(255,255,255,0.08)'};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  box-shadow: ${({ theme, $checked }) =>
    $checked ? `${theme.glass.focusRing}, ${theme.glass.shadow}` : theme.glass.shadow};
  transition: background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  ${({ $shape }) => shapeStyles[$shape]};

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

export const Label = styled.span`
  user-select: none;
`;

export const CheckMark = styled(motion.svg)`
  width: 0.9rem;
  height: 0.9rem;
  stroke: rgba(15, 35, 55, 0.95);
  stroke-width: 2.4;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

