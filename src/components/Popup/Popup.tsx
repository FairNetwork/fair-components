import React, { useId } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button } from '../Button';
import {
  PopupActions,
  PopupBody,
  PopupContainer,
  PopupDescription,
  PopupOverlay,
  PopupTitle,
} from './Popup.styles';
import { PopupProps } from './Popup.types';
import { splitPopupActions } from './Popup.utils';

export const Popup: React.FC<PopupProps> = ({
  isOpen,
  title,
  description,
  onClose,
  actions = [],
  children,
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const { primary, secondary } = splitPopupActions(actions);

  return (
    <AnimatePresence>
      {isOpen && (
        <PopupOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <PopupContainer
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <PopupTitle id={titleId}>{title}</PopupTitle>
            {description && <PopupDescription id={descriptionId}>{description}</PopupDescription>}
            {children && <PopupBody>{children}</PopupBody>}
            {(primary || secondary.length > 0) && (
              <PopupActions>
                {secondary.map((action) => (
                  <Button
                    key={action.id}
                    variant={action.variant === 'secondary' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      action.onPress();
                      onClose();
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
                {primary && (
                  <Button
                    key={primary.id}
                    variant={primary.variant === 'secondary' ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => {
                      primary.onPress();
                      onClose();
                    }}
                  >
                    {primary.label}
                  </Button>
                )}
              </PopupActions>
            )}
          </PopupContainer>
        </PopupOverlay>
      )}
    </AnimatePresence>
  );
};

export default Popup;

