import RAF from '../utils/RAF';
import { useMemo } from 'react';

export function useRAF() {
  const raf = useMemo(() => {
    return new RAF();
  }, []);
  return { raf };
}
