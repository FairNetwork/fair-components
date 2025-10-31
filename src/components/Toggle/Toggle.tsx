import React, { forwardRef } from 'react';
import { ToggleButton, ToggleLabel, ToggleWrapper, Thumb } from './Toggle.styles';
import { ToggleProps } from './Toggle.types';
import { getToggleAriaPressed } from './Toggle.utils';

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ isOn, onToggle, label, disabled = false, ...rest }, ref) => (
    <ToggleWrapper>
      <ToggleButton
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isOn}
        aria-pressed={getToggleAriaPressed(isOn)}
        aria-label={rest['aria-label'] ?? label ?? 'toggle control'}
        onClick={() => {
          if (!disabled) {
            onToggle(!isOn);
          }
        }}
        whileTap={{ scale: 0.96 }}
        $isOn={isOn}
        $disabled={disabled}
        disabled={disabled}
        {...rest}
      >
        <Thumb
          layout
          $isOn={isOn}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          animate={{
            background: isOn ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
            boxShadow: isOn
              ? '0 10px 20px rgba(120, 200, 255, 0.45)'
              : '0 6px 16px rgba(0, 0, 0, 0.35)',
          }}
        />
      </ToggleButton>
      {label && <ToggleLabel>{label}</ToggleLabel>}
    </ToggleWrapper>
  ),
);

Toggle.displayName = 'Toggle';

export default Toggle;

