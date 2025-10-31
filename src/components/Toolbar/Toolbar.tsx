import React from 'react';
import { ToolbarContainer, ToolbarButton, ToolbarGlow, ToolbarLabel } from './Toolbar.styles';
import { ToolbarProps } from './Toolbar.types';
import { getActionAriaLabel } from './Toolbar.utils';

export const Toolbar: React.FC<ToolbarProps> = ({ actions, ariaLabel }) => (
  <ToolbarContainer
    role="toolbar"
    aria-label={ariaLabel ?? 'liquid glass toolbar'}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
  >
    {actions.map((action) => (
      <ToolbarButton
        key={action.id}
        type="button"
        aria-label={getActionAriaLabel(action.label)}
        onClick={() => {
          if (!action.disabled) {
            action.onPress();
          }
        }}
        disabled={action.disabled}
        $isActive={action.isActive}
        whileHover={{ scale: action.disabled ? 1 : 1.06 }}
        whileTap={{ scale: action.disabled ? 1 : 0.92 }}
        data-active={action.isActive}
      >
        <ToolbarGlow
          initial={{ opacity: 0 }}
          animate={{ opacity: action.isActive ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
        {action.icon}
        <ToolbarLabel>{action.label}</ToolbarLabel>
      </ToolbarButton>
    ))}
  </ToolbarContainer>
);

export default Toolbar;

