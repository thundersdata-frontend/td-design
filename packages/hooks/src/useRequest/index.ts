import useRequestImpl from './useRequestImpl';

import { useDebouncePlugin } from './plugins/useDebouncePlugin';
import { useLoadingDelayPlugin } from './plugins/useLoadingDelayPlugin';
import { useThrottlePlugin } from './plugins/useThrottlePlugin';
import { useRefreshDepsPlugin } from './plugins/useRefreshDepsPlugin';
import { useRetryPlugin } from './plugins/useRetryPlugin';
import { useCachePlugin } from './plugins/useCachePlugin';
import { useReadyPlugin } from './plugins/useReadyPlugin';
import { clearCache } from './utils/cache';
import type { Options, Plugin, Service } from './types';

export { clearCache };

export default function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[]
) {
  return useRequestImpl<TData, TParams>(service, options, [
    ...(plugins || []),
    useDebouncePlugin,
    useLoadingDelayPlugin,
    useThrottlePlugin,
    useRefreshDepsPlugin,
    useCachePlugin,
    useRetryPlugin,
    useReadyPlugin,
  ] as Plugin<TData, TParams>[]);
}
