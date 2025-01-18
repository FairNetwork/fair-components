import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { StyledCard, StyledCardBadge, StyledCardButton, StyledCardContent } from './Card.styles';

export type CardProps = {
    /**
     * The text of the badge.
     */
    badgeText?: string;
    /**
     * The text of the button.
     */
    buttonText?: string;
    /**
     * The content of the card.
     */
    children: ReactNode;
    /**
     * Function to be executed when the button is clicked.
     */
    onButtonClick?: () => void;
    /**
     * The width of the card.
     */
    width?: string;
};

const Card: FC<CardProps> = ({
    children,
    buttonText,
    onButtonClick,
    badgeText,
    width = '200px',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const checkVisibility = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const inViewport =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth);
            setIsVisible(inViewport);
        }
    };

    useEffect(() => {
        checkVisibility();
        window.addEventListener('scroll', checkVisibility);
        window.addEventListener('resize', checkVisibility);

        return () => {
            window.removeEventListener('scroll', checkVisibility);
            window.removeEventListener('resize', checkVisibility);
        };
    }, []);

    return (
        <StyledCard $width={width} $isActive={isVisible} ref={ref}>
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
