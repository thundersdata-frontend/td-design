import { useRef } from 'react';
import type { Plugin } from '../types';

export const useLoadingDelayPlugin: Plugin<any, any[]> = (fetchInstance, { loadingDelay }) => {
  const timerRef = useRef<NodeJS.Timeout>();

  if (!loadingDelay) return {};

  const cancelTimeout = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    onBefore: () => {
      cancelTimeout();

      timerRef.current = setTimeout(() => {
        fetchInstance.setState({
          loading: true,
        });
      }, loadingDelay);

      return {
        loading: false,
      };
    },
    onCancel: () => {
      cancelTimeout();
    },
    onFinally: () => {
      cancelTimeout();
    },
  };
};
