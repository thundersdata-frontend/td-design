import useUpdateEffect from '../../useUpdateEffect';
import type { Plugin } from '../types';

export const useRefreshDepsPlugin: Plugin<any, any[]> = (fetchInstance, { manual, refreshDeps = [] }) => {
  useUpdateEffect(() => {
    if (!manual) {
      fetchInstance.refresh();
    }
  }, [...refreshDeps]);

  return {};
};
