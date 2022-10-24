import { useMemo } from 'react';

import RAF from '../utils/RAF';

export function useRAF() {
  const raf = useMemo(() => {
    return new RAF();
  }, []);
  return { raf };
}
