import React, { FC, ReactNode, useEffect, useState } from 'react';
import { StyledCard } from './Card.styles';

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
};

const Card: FC<CardProps> = ({ children, buttonText, badgeText }) => {
    return <StyledCard>{children}</StyledCard>;
};

Card.displayName = 'Card';

export default Card;
