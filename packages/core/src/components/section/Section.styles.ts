import styled from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledSectionProp = WithTheme<{ $backgroundColor: string; $textColor: string }>;

export const StyledSection = styled.div<StyledSectionProp>`
    width: 100%;

    background-color: ${({ $backgroundColor }: StyledSectionProp) => $backgroundColor};
    color: ${({ $textColor }: StyledSectionProp) => $textColor};
`;
