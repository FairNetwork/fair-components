export const formatBadgeValue = (value: number | string, max?: number): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof max === 'number' && value > max) {
    return `${max}+`;
  }

  return value.toString();
};

