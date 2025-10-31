export const toggleValue = (values: string[], value: string): string[] => {
  if (values.includes(value)) {
    return values.filter((existing) => existing !== value);
  }
  return [...values, value];
};

