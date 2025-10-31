import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { scaleOnHover } from '../../utils/animations';
import { ButtonBase, ButtonContent, IconSlot, LoadingSpinner } from './Button.styles';
import { ButtonProps } from './Button.types';
import { isIconOnly } from './Button.utils';

const MotionButtonBase = motion(ButtonBase);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      isLoading = false,
      loadingText = 'Loading',
      variant = 'primary',
      size = 'md',
      isFullWidth = false,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const iconOnly = isIconOnly(children, icon);
    const { ['aria-label']: ariaLabelProp, type: buttonType, ...buttonProps } = rest;
    const type = buttonType ?? 'button';
    const computedAriaLabel = iconOnly ? ariaLabelProp ?? 'icon button' : ariaLabelProp;

    return (
      <MotionButtonBase
        ref={ref}
        type={type}
        aria-busy={isLoading}
        aria-live={isLoading ? 'polite' : undefined}
        aria-label={computedAriaLabel}
        $variant={variant}
        $size={size}
        $isFullWidth={isFullWidth}
        disabled={disabled || isLoading}
        variants={scaleOnHover}
        initial="rest"
        whileHover="hover"
        whileTap="press"
        {...buttonProps}
      >
        <ButtonContent>
          {icon && <IconSlot aria-hidden>{icon}</IconSlot>}
          {children}
        </ButtonContent>
        {isLoading && (
          <LoadingSpinner role="status" aria-live="assertive">
            {loadingText}
          </LoadingSpinner>
        )}
      </MotionButtonBase>
    );
  },
);

Button.displayName = 'Button';

export default Button;

