import { useEffect, useMemo, useRef } from 'react';

import { debounce, DebouncedFunc, DebounceSettings } from 'lodash-es';

import type { Plugin } from '../types';

export const useDebouncePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { debounceWait, debounceLeading, debounceTrailing, debounceMaxWait }
) => {
  const debounceRef = useRef<DebouncedFunc<any>>();

  const options = useMemo(() => {
    const settings: DebounceSettings = {};
    if (debounceLeading !== undefined) {
      settings.leading = debounceLeading;
    }
    if (debounceTrailing !== undefined) {
      settings.trailing = debounceTrailing;
    }
    if (debounceMaxWait !== undefined) {
      settings.maxWait = debounceMaxWait;
    }
    return settings;
  }, [debounceLeading, debounceTrailing, debounceMaxWait]);

  useEffect(() => {
    if (debounceWait) {
      const originRunAsync = fetchInstance.runAsync.bind(fetchInstance);
      debounceRef.current = debounce(
        (cb: any) => {
          cb();
        },
        debounceWait,
        options
      );

      fetchInstance.runAsync = (...args) =>
        new Promise((resolve, reject) => {
          debounceRef.current?.(() => {
            originRunAsync(...args)
              .then(resolve)
              .catch(reject);
          });
        });

      return () => {
        debounceRef.current?.cancel();
        fetchInstance.runAsync = originRunAsync;
      };
    }
    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceWait, options]);

  if (!debounceWait) return {};

  return {
    onCancel: () => {
      debounceRef.current?.cancel();
    },
  };
};
