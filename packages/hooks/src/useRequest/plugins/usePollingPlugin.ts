import { useRef } from 'react';
import useUpdateEffect from '../../useUpdateEffect';

import type { Plugin } from '../types';

const usePollingPlugin: Plugin<any, any[]> = (fetchInstance, { pollingInterval }) => {
  const timerRef = useRef<NodeJS.Timeout>();

  const stopPolling = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useUpdateEffect(() => {
    if (!pollingInterval) {
      stopPolling();
    }
  }, [pollingInterval]);

  if (!pollingInterval) {
    return {};
  }

  return {
    onBefore: () => {
      stopPolling();
    },
    onFinally: () => {
      timerRef.current = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    },
    onCancel: () => {
      stopPolling();
    },
  };
};

export default usePollingPlugin;
