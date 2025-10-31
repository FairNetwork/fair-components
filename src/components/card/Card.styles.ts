import { styled } from '@linaria/react';
import { motion } from 'motion/react';
import type { Theme } from '../../theme/ColorSchemeProvider';

export interface StyledCardProps {
    $width: string;
    theme: Theme;
}

export const StyledCard = styled(motion.div)<StyledCardProps>`
    position: relative;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.secondaryBackgroundColor};
    width: ${({ $width }) => $width};
    padding: 12px;
    aspect-ratio: 9 / 16;
    border-radius: 6px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-4px);
    }
`;

export const StyledCardBadge = styled.div<{ theme: Theme }>`
    position: absolute;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.primaryBackgroundColor};
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 6px 12px;
    background-color: ${({ theme }) => theme.secondaryBackgroundColor};
`;

export const StyledCardButton = styled.button<{ theme: Theme }>`
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 100px;
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #fff;
    transition: opacity 0.2s ease-in-out;

    &:hover {
        opacity: 0.85;
    }
`;

export const StyledCardContent = styled.div`
    flex: 1;
`;
