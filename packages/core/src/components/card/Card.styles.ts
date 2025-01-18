import styled from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledCardProp = WithTheme<{ $width: string; $isActive: boolean }>;

export const StyledCard = styled.div<StyledCardProp>`
    position: relative;
    margin-top: 12px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: ${({ theme }: StyledCardProp) => theme.secondaryBackgroundColor};
    width: ${({ $width }: StyledCardProp) => $width};
    padding: 12px;
    aspect-ratio: 9/16;
    border-radius: 6px;

    transition: opacity 0.3s;

    opacity: ${({ $isActive }: StyledCardProp) => ($isActive ? 1 : 0.6)};
`;

type StyledCardBadgeProp = WithTheme<unknown>;

export const StyledCardBadge = styled.div<StyledCardBadgeProp>`
    position: absolute;
    border: ${({ theme }: StyledCardBadgeProp) => `1px solid ${theme.primaryBackgroundColor}`};
    border-radius: 6px;

    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 6px 12px;

    background-color: ${({ theme }: StyledCardBadgeProp) => theme.secondaryBackgroundColor};
`;

type StyledCardButtonProp = WithTheme<unknown>;

export const StyledCardButton = styled.button<StyledCardButtonProp>`
    background-color: ${({ theme }: StyledCardButtonProp) => theme.primaryColor};
    border-radius: 100px;
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #fff;

    transition: opacity 0.2s;

    &:hover {
        opacity: 0.8;
    }
`;

export const StyledCardContent = styled.div``;
