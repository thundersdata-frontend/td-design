import { useRef } from 'react';

import useUpdateEffect from '../../useUpdateEffect';
import type { Plugin } from '../types';

export const usePollingPlugin: Plugin<any, any[]> = (
  fetchInstance,
  { pollingInterval, pollingErrorRetryCount = -1 }
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const countRef = useRef<number>(0);

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

  if (!pollingInterval) return {};

  return {
    onBefore: () => {
      stopPolling();
    },
    onError: () => {
      countRef.current += 1;
    },
    onSuccess: () => {
      countRef.current = 0;
    },
    onFinally: () => {
      if (
        pollingErrorRetryCount === -1 ||
        // When an error occurs, the request is not repeated after pollingErrorRetryCount retries
        (pollingErrorRetryCount !== -1 && countRef.current <= pollingErrorRetryCount)
      ) {
        // 之所以用setTimeout, 是因为fetchInstance.refresh()最后都会走到onFinally，然后这里又会再次调用refresh，从而实现跟interval一样的效果
        timerRef.current = setTimeout(() => {
          fetchInstance.refresh();
        }, pollingInterval);
      } else {
        countRef.current = 0;
      }
    },
    onCancel: () => {
      stopPolling();
    },
  };
};
