import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SliderStyleProps } from './Slider.types';

export const SliderWrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SliderLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Track = styled(motion.div)<SliderStyleProps>`
  position: relative;
  height: 0.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: ${({ theme }) => theme.glass.borderWidth}px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  overflow: hidden;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
`;

export const Progress = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(120, 200, 255, 0.9) 0%, rgba(70, 150, 220, 0.65) 100%);
`;

export const Handle = styled(motion.span)<SliderStyleProps>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 10px 25px rgba(120, 200, 255, 0.4);
  border: ${({ theme }) => theme.glass.borderWidth}px solid ${({ theme }) => theme.colors.accent};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const RangeInput = styled.input<SliderStyleProps>`
  position: absolute;
  inset: -0.75rem 0;
  width: 100%;
  height: calc(100% + 1.5rem);
  background: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
  }

  &::-moz-range-thumb {
    width: 0;
    height: 0;
    border: none;
  }

  &::-webkit-slider-runnable-track {
    height: 0;
    background: transparent;
  }

  &::-moz-range-track {
    height: 0;
    background: transparent;
  }
`;

