import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MenuContainer, MenuItem, ItemIcon, ItemLabel, ItemShortcut } from './ContextMenu.styles';
import { ContextMenuProps } from './ContextMenu.types';
import { getMenuItemKey } from './ContextMenu.utils';

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  isOpen,
  position,
  onRequestClose,
  labelledBy,
}) => {
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        onRequestClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onRequestClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <MenuContainer
          ref={menuRef}
          role="menu"
          aria-labelledby={labelledBy}
          initial={{ opacity: 0, scale: 0.9, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -6 }}
          transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
          style={{ top: position.y, left: position.x, transformOrigin: 'top left' }}
        >
          {items.map((item, index) => (
            <MenuItem
              key={getMenuItemKey(item.id, index)}
              role="menuitem"
              tabIndex={item.disabled ? -1 : 0}
              data-disabled={item.disabled}
              aria-disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  item.onSelect();
                  onRequestClose();
                }
              }}
              onKeyDown={(event) => {
                if (item.disabled) {
                  return;
                }
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  item.onSelect();
                  onRequestClose();
                }
              }}
            >
              {item.icon && <ItemIcon aria-hidden>{item.icon}</ItemIcon>}
              <ItemLabel>{item.label}</ItemLabel>
              {item.shortcut && <ItemShortcut>{item.shortcut}</ItemShortcut>}
            </MenuItem>
          ))}
        </MenuContainer>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;

