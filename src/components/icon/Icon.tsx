import React, { CSSProperties, MouseEventHandler } from 'react';

export interface IconProps {
    icon: string;
    size?: CSSProperties['fontSize'];
    color?: CSSProperties['color'];
    onClick?: MouseEventHandler<HTMLElement>;
    style?: CSSProperties;
}

const Icon: React.FC<IconProps> = ({ icon, color, size, style, onClick }) => {
    return (
        <i
            className={icon}
            style={{
                ...style,
                fontSize: size,
                color,
                cursor: typeof onClick === 'function' ? 'pointer' : 'default',
            }}
            onClick={onClick}
        />
    );
};

Icon.displayName = 'Icon';

export default Icon;
