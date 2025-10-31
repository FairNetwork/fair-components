import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MenuContainer = styled(motion.ul)`
  position: fixed;
  min-width: 220px;
  padding: 0.5rem;
  margin: 0;
  border-radius: ${({ theme }) => theme.glass.borderRadius};
  list-style: none;
  border: ${({ theme }) => theme.glass.borderWidth}px solid rgba(255, 255, 255, 0.25);
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  box-shadow: ${({ theme }) => theme.glass.shadow};
  color: ${({ theme }) => theme.colors.textPrimary};
  z-index: 9999;
`;

export const MenuItem = styled(motion.li)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 12px;
  cursor: pointer;
  color: inherit;
  transition: background 0.25s ease, transform 0.2s ease;

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => `${theme.glass.focusRing}`};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-1px);
  }

  &[data-disabled='true'] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const ItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  opacity: 0.9;
`;

export const ItemLabel = styled.span`
  flex: 1;
`;

export const ItemShortcut = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

