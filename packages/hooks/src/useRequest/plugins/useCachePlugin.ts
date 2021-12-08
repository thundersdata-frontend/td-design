import { useRef } from 'react';
import useCreation from '../../useCreation';
import useUnmount from '../../useUnmount';
import * as cache from '../utils/cache';
import * as cachePromise from '../utils/cachePromise';

import type { Plugin } from '../types';
type Func = (...args: any[]) => any;

export const useCachePlugin: Plugin<any, any[]> = (
  fetchInstance,
  { cacheKey, cacheTime = 5 * 60 * 1000, staleTime = 0 }
) => {
  const unSubscribeRef = useRef<Func>();
  const currentPromiseRef = useRef<Promise<any>>();

  useCreation(() => {
    if (!cacheKey) return;

    const cacheData = cache.getCache(cacheKey);
    if (cacheData) {
      fetchInstance.state.data = cacheData.data;
      fetchInstance.state.params = cacheData.params;
    }

    unSubscribeRef.current = cache.subscribe(cacheKey, data => {
      fetchInstance.setState({ data });
    });
  }, []);

  useUnmount(() => {
    unSubscribeRef.current?.();
  });

  if (!cacheKey) return {};

  return {
    onBefore: () => {
      const cacheData = cache.getCache(cacheKey);
      if (!cacheData) return {};
      if (staleTime === -1 || new Date().getTime() - cacheData.time <= staleTime)
        return {
          loading: false,
          data: cacheData?.data,
          returnNow: true,
        };
      return {
        data: cacheData?.data,
      };
    },
    onRequest: (service, args) => {
      let servicePromise = cachePromise.getCachePromise(cacheKey);
      if (servicePromise && servicePromise !== currentPromiseRef.current) return { servicePromise };

      servicePromise = service(...args);
      currentPromiseRef.current = servicePromise;
      cachePromise.setCachePromise(cacheKey, servicePromise);
      return { servicePromise };
    },
    onSuccess: (data, params) => {
      if (cacheKey) {
        unSubscribeRef.current?.();
        cache.setCache(cacheKey, cacheTime, data, params);
      }
    },
    onMutate: data => {
      if (cacheKey) {
        unSubscribeRef.current?.();
        cache.setCache(cacheKey, cacheTime, data, fetchInstance.state.params);
        unSubscribeRef.current = cache.subscribe(cacheKey, data => {
          fetchInstance.setState({ data });
        });
      }
    },
  };
};
