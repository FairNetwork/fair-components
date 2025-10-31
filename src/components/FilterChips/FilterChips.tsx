import React from 'react';
import { ChipButton, ChipIcon, ChipsWrapper } from './FilterChips.styles';
import { FilterChipsProps } from './FilterChips.types';
import { toggleValue } from './FilterChips.utils';

export const FilterChips: React.FC<FilterChipsProps> = ({
  options,
  selectedValues,
  onChange,
  ariaLabel,
}) => (
  <ChipsWrapper role="group" aria-label={ariaLabel ?? 'filter options'}>
    {options.map((option) => {
      const isActive = selectedValues.includes(option.value);
      return (
        <ChipButton
          key={option.id}
          type="button"
          $isActive={isActive}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(toggleValue(selectedValues, option.value))}
          aria-pressed={isActive}
        >
          {option.icon && <ChipIcon aria-hidden>{option.icon}</ChipIcon>}
          {option.label}
        </ChipButton>
      );
    })}
  </ChipsWrapper>
);

export default FilterChips;

