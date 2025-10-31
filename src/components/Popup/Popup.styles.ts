import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PopupOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.glass.overlay};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9990;
`;

export const PopupContainer = styled(motion.div)`
  width: min(420px, 90vw);
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(${({ theme }) => theme.glass.backdropBlur});
  border: ${({ theme }) => theme.glass.borderWidth}px solid rgba(255, 255, 255, 0.3);
  box-shadow: ${({ theme }) => theme.glass.shadow};
  padding: 2rem 1.75rem 1.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const PopupTitle = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
`;

export const PopupDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
`;

export const PopupBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 0.95rem;
`;

export const PopupActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

