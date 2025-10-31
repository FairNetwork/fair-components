import { motion } from 'motion/react';
import styled from 'styled-components';

/* Root Wrapper */
export const StyledInputRoot = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  gap: 0;
  font-family: var(--lg-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
`;

/* Left Action */
export const StyledInputLeftAction = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 999px;
  margin-right: -16px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0.15));
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(24px) saturate(1.2);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 0;
  border: none;

  &:hover {
    transform: translateX(-1px) scale(1.02);
  }

  &:active {
    transform: translateX(-1px) scale(0.97);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

/* Glass Shell */
export const StyledInputShell = styled.div`
  position: relative;
  display: inline-flex;
  align-items: stretch;
  min-height: 56px;
  border-radius: 28px;
  padding: 4px;
  overflow: hidden;
  background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.1))
    rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 20px 50px rgba(15, 23, 42, 0.18);
  backdrop-filter: blur(24px) saturate(1.2);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &[data-invalid='true'] {
    border-color: var(--color-invalid, #ff3b30);
  }

  &[data-warning='true'] {
    border-color: var(--color-warning, #ffd60a);
  }

  &[data-disabled='true'] {
    opacity: 0.6;
  }
`;

/* Input Wrapper */
export const StyledInputFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 56px 0 22px;
`;

/* Input Field */
export const StyledInputElement = styled.input`
  appearance: none;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 17px;
  width: 100%;
  outline: none;

  &::placeholder {
    color: rgba(45, 45, 45, 0.55);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

/* Right Action */
export const StyledInputRightAction = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  padding: 0;

  &:hover {
    transform: translateY(-50%) scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

/* Border Animation */
export const StyledInputBorderOverlay = styled.svg`
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
`;

export const StyledInputBorderPath = styled(motion.path)`
  stroke-width: 2;
  fill: transparent;
  stroke: var(--border-anim-color, var(--accent-color, #0a84ff));
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  stroke-dasharray: 0 1;
  stroke-dashoffset: 0.5;
`;
