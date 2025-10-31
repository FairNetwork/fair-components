import { styled } from '@linaria/react';

export const StyledSection = styled.section<{ $backgroundColor: string; $textColor: string }>`
    width: 100%;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    color: ${({ $textColor }) => $textColor};
    padding: 24px;
    border-radius: 12px;
`;
