import { useEffect, useMemo, useRef } from 'react';

import { DebouncedFunc, throttle, ThrottleSettings } from 'lodash-es';

import type { Plugin } from '../types';

export const useThrottlePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { throttleWait, throttleLeading, throttleTrailing }
) => {
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
        fetchInstance.runAsync = originRunAsync;
        throttleRef.current?.cancel();
      };
    }
  }, [throttleWait, throttleLeading, throttleTrailing]);

  if (!throttleWait) return {};

  return {
    onCancel: () => {
      throttleRef.current?.cancel();
    },
  };
};
