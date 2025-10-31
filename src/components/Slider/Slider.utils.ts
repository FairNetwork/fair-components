export const getPercentage = (value: number, min: number, max: number): number => {
  if (max <= min) {
    return 0;
  }
  const clamped = Math.min(Math.max(value, min), max);
  return ((clamped - min) / (max - min)) * 100;
};

