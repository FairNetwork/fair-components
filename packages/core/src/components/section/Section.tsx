import React, { FC, ReactNode } from 'react';
import { StyledSection } from './Section.styles';

export type SectionProps = {
    /**
     * The background color of the section.
     */
    backgroundColor: string;
    /**
     * The content that should be displayed inside the section.
     */
    children?: ReactNode;
    /**
     * The text color of the section.
     */
    textColor: string;
};

const Section: FC<SectionProps> = ({ children, textColor, backgroundColor }) => {
    return (
        <StyledSection $backgroundColor={backgroundColor} $textColor={textColor}>
            {children}
        </StyledSection>
    );
};

Section.displayName = 'Section';

export default Section;
