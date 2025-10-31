import React, { FC, ReactNode, useRef } from 'react';
import { useInView } from 'motion/react';
import { StyledCard, StyledCardBadge, StyledCardButton, StyledCardContent } from './Card.styles';

export type CardProps = {
    badgeText?: string;
    buttonText?: string;
    children: ReactNode;
    onButtonClick?: () => void;
    width?: string;
};

const Card: FC<CardProps> = ({
    children,
    buttonText,
    onButtonClick,
    badgeText,
    width = '200px',
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: false, amount: 0.4 });

    return (
        <StyledCard
            ref={ref}
            $width={width}
            initial={{ opacity: 0.6, y: 16 }}
            animate={{ opacity: isInView ? 1 : 0.6, y: isInView ? 0 : 16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            {badgeText && <StyledCardBadge>{badgeText}</StyledCardBadge>}
            <StyledCardContent>{children}</StyledCardContent>
            {buttonText && (
                <StyledCardButton onClick={onButtonClick}>{buttonText}</StyledCardButton>
            )}
        </StyledCard>
    );
};

Card.displayName = 'Card';

export default Card;
