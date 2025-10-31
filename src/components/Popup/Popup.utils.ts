import { PopupAction } from './Popup.types';

export const splitPopupActions = (actions: PopupAction[] = []) => {
  const primary = actions.find((action) => action.variant === 'primary') ?? actions[0];
  const secondary = actions.filter((action) => action !== primary);
  return { primary, secondary };
};

