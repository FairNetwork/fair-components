import React, { FC, ReactNode } from 'react';
import { StyledSection } from './Section.styles';

export type SectionProps = {
    backgroundColor: string;
    children?: ReactNode;
    textColor: string;
};

const Section: FC<SectionProps> = ({ children, textColor, backgroundColor }) => {
    return (
        <StyledSection $textColor={textColor} $backgroundColor={backgroundColor}>
            {children}
        </StyledSection>
    );
};

Section.displayName = 'Section';

export default Section;
