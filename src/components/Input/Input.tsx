import React, { forwardRef, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import { borderPulse, scaleOnHover } from '../../utils/animations';
import {
  ActionSlot,
  Aura,
  FieldContainer,
  GlassField,
  HelperText,
  InputWrapper,
  Label,
} from './Input.styles';
import { InputProps, InputStatus } from './Input.types';
import { useMaxLengthPulse } from './Input.hooks';
import { getStatusColors } from './Input.utils';

const MotionFieldContainer = motion(FieldContainer);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      leftAction,
      rightAction,
      status = 'default',
      isCompact = false,
      onLeftActionClick,
      onRightActionClick,
      leftActionAriaLabel,
      rightActionAriaLabel,
      maxLength,
      value,
      onFocus,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();
    const trackedValue = useMemo(() => {
      if (value !== undefined && value !== null) {
        return value.toString();
      }
      if (rest.defaultValue !== undefined && rest.defaultValue !== null) {
        return rest.defaultValue.toString();
      }
      return '';
    }, [value, rest.defaultValue]);

    const isNearLimit = useMaxLengthPulse(trackedValue, maxLength);

    const visualStatus: InputStatus = useMemo(() => {
      if (status !== 'default') {
        return status;
      }
      return isNearLimit ? 'warning' : 'default';
    }, [status, isNearLimit]);

    const shouldPulse = visualStatus !== 'default';

    const statusColors = useMemo(() => getStatusColors(theme, visualStatus), [theme, visualStatus]);
    const helperId = helperText && (rest.id || rest.name) ? `${rest.id ?? rest.name}-helper` : undefined;

    return (
      <InputWrapper>
        {label && <Label>{label}</Label>}
        <MotionFieldContainer
          variants={scaleOnHover}
          initial="rest"
          whileHover="hover"
          whileTap="press"
          animate={isFocused ? 'hover' : 'rest'}
          $isFocused={isFocused}
          $hasLeftAction={Boolean(leftAction)}
          $hasRightAction={Boolean(rightAction)}
          $isCompact={isCompact}
          $status={visualStatus}
        >
          {leftAction && (
            <ActionSlot
              type="button"
              onClick={onLeftActionClick}
              aria-label={leftActionAriaLabel ?? 'input left action'}
              $position="left"
            >
              {leftAction}
            </ActionSlot>
          )}
          <GlassField
            ref={ref}
            $isFocused={isFocused}
            $hasLeftAction={Boolean(leftAction)}
            $hasRightAction={Boolean(rightAction)}
            $isCompact={isCompact}
            $status={visualStatus}
            value={value}
            maxLength={maxLength}
            onFocus={(event) => {
              setIsFocused(true);
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setIsFocused(false);
              onBlur?.(event);
            }}
            aria-invalid={status === 'error'}
            aria-describedby={helperId}
            {...rest}
          />
          {rightAction && (
            <ActionSlot
              type="button"
              onClick={onRightActionClick}
              aria-label={rightActionAriaLabel ?? 'input right action'}
              $position="right"
            >
              {rightAction}
            </ActionSlot>
          )}
          <Aura
            aria-hidden
            variants={borderPulse(statusColors)}
            initial="rest"
            animate={shouldPulse ? 'active' : 'rest'}
          />
        </MotionFieldContainer>
        {helperText && (
          <HelperText id={helperId} $status={visualStatus}>
            {helperText}
          </HelperText>
        )}
      </InputWrapper>
    );
  },
);

Input.displayName = 'Input';

export default Input;

