import useRequestImpl from './useRequestImpl';

import { useDebouncePlugin } from './plugins/useDebouncePlugin';
import { useLoadingDelayPlugin } from './plugins/useLoadingDelayPlugin';
import { useThrottlePlugin } from './plugins/useThrottlePlugin';
import { useRetryPlugin } from './plugins/useRetryPlugin';
import { useCachePlugin } from './plugins/useCachePlugin';
import { clearCache } from './utils/cache';
import { useAutoRunPlugin } from './plugins/useAutoRunPlugin';

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
    useCachePlugin,
    useRetryPlugin,
    useAutoRunPlugin,
  ] as Plugin<TData, TParams>[]);
}
