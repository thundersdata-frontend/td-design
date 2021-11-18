import { useRef } from 'react';
import Fetch from '../Fetch';

export function useLoadingDelayPlugin<TData, TParams extends any[]>(
  fetchInstance: Fetch<TData, TParams>,
  { loadingDelay }: { loadingDelay: number }
) {
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
}
