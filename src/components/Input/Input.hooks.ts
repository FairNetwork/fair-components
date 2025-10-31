import { useEffect, useMemo, useState } from 'react';

export const useMaxLengthPulse = (
  value: string | undefined,
  maxLength: number | undefined,
  threshold = 0.85,
): boolean => {
  const shouldCheck = typeof maxLength === 'number' && maxLength > 0;

  const ratio = useMemo(() => {
    if (!shouldCheck || !value) {
      return 0;
    }
    return value.length / maxLength;
  }, [shouldCheck, value, maxLength]);

  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    if (!shouldCheck) {
      setIsPulsing(false);
      return;
    }
    if (ratio >= threshold) {
      setIsPulsing(true);
    } else {
      setIsPulsing(false);
    }
  }, [ratio, threshold, shouldCheck]);

  return isPulsing;
};

