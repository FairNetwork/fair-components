import React, { ChangeEvent, forwardRef, useId } from 'react';
import { Box, CheckboxWrapper, HiddenInput, Label, CheckMark } from './Checkbox.styles';
import { CheckboxProps } from './Checkbox.types';
import { getCheckboxLabelId } from './Checkbox.utils';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id: providedId, checked, onChange, label, shape = 'rounded', disabled = false, ...rest }, ref) => {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const labelId = getCheckboxLabelId(id);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked, event);
    };

    return (
      <CheckboxWrapper htmlFor={id}>
        <HiddenInput
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          aria-checked={checked}
          aria-labelledby={label ? labelId : undefined}
          {...rest}
        />
        <Box
          $checked={checked}
          $shape={shape}
          $disabled={disabled}
          whileTap={{ scale: disabled ? 1 : 0.96 }}
          aria-hidden
        >
          <CheckMark
            viewBox="0 0 24 24"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: checked ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <path d="M5 13.5L10 18L19 7" />
          </CheckMark>
        </Box>
        {label && <Label id={labelId}>{label}</Label>}
      </CheckboxWrapper>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

