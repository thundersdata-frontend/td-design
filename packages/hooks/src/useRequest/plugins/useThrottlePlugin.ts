import { throttle, DebouncedFunc, ThrottleSettings } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import Fetch from '../Fetch';

export function useThrottlePlugin<TData, TParams extends any[]>(
  fetchInstance: Fetch<TData, TParams>,
  { throttleWait, throttleLeading, throttleTrailing }: ThrottleRequestOptions
) {
  const throttleRef = useRef<DebouncedFunc<any>>();

  const options = useMemo(() => {
    const settings: ThrottleSettings = {};
    if (throttleLeading !== undefined) {
      settings.leading = throttleLeading;
    }
    if (throttleTrailing !== undefined) {
      settings.trailing = throttleTrailing;
    }
    return settings;
  }, [throttleLeading, throttleTrailing]);

  useEffect(() => {
    if (throttleWait) {
      const originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
      throttleRef.current = throttle(
        (cb: any) => {
          cb();
        },
        throttleWait,
        options
      );

      fetchInstance.runAsync = (...args) =>
        new Promise((resolve, reject) => {
          throttleRef.current?.(() => {
            originRunAsync(...args)
              .then(resolve)
              .catch(reject);
          });
        });

      return () => {
        throttleRef.current?.cancel();
        fetchInstance.runAsync = originRunAsync;
      };
    }
    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttleWait, options]);

  if (!throttleWait) return {};

  return {
    onCancel: () => {
      throttleRef.current?.cancel();
    },
  };
}
