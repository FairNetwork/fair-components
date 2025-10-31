import React, { ChangeEvent, forwardRef, useMemo } from 'react';
import { Track, Progress, Handle, RangeInput, SliderLabel, SliderWrapper } from './Slider.styles';
import { SliderProps } from './Slider.types';
import { getPercentage } from './Slider.utils';

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ value, min = 0, max = 100, step = 1, label, onChange, disabled = false }, ref) => {
    const percentage = useMemo(() => getPercentage(value, min, max), [value, min, max]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value);
      onChange(nextValue, event);
    };

    return (
      <SliderWrapper>
        {label && <SliderLabel>{label}</SliderLabel>}
        <Track $disabled={disabled} whileTap={{ scale: disabled ? 1 : 0.99 }}>
          <Progress
            style={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          />
          <Handle
            $disabled={disabled}
            style={{ left: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            animate={{
              boxShadow: `0 10px 25px rgba(120, 200, 255, ${0.3 + percentage / 500})`,
            }}
          />
          <RangeInput
            ref={ref}
            type="range"
            aria-label={label ?? 'slider control'}
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            $disabled={disabled}
          />
        </Track>
      </SliderWrapper>
    );
  },
);

Slider.displayName = 'Slider';

export default Slider;

