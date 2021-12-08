import useUpdateEffect from '../../useUpdateEffect';

import type { Plugin } from '../types';

export const useReadyPlugin: Plugin<any, any[]> = (fetchInstance, { manual, ready = true, defaultParams = [] }) => {
  useUpdateEffect(() => {
    if (!manual && ready) {
      fetchInstance.run(...defaultParams);
    }
  }, [ready]);

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

useReadyPlugin.onInit = ({ ready = true, manual = true }) => {
  return {
    loading: !manual && ready,
  };
};
