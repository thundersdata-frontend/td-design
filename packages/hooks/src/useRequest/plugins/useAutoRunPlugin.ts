import { useRef } from 'react';
import useUpdateEffect from '../../useUpdateEffect';

import type { Plugin } from '../types';

export const useAutoRunPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { manual, ready = true, defaultParams = [], refreshDeps = [] }
) => {
  const hasRun = useRef(false);
  hasRun.current = false;

  useUpdateEffect(() => {
    if (!manual && ready) {
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);

  useUpdateEffect(() => {
    if (hasRun.current) {
      return;
    }
    if (!manual) {
      hasRun.current = true;
      fetchInstance.refresh();
    }
  }, [...refreshDeps]);

  return {
    onBefore: () => {
      if (!ready) {
        return {
          stopNow: true,
        };
      }
      return {};
    },
  };
};

useAutoRunPlugin.onInit = ({ ready = true, manual = true }) => {
  return {
    loading: !manual && ready,
  };
};
