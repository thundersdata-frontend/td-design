import { useAutoRunPlugin } from './plugins/useAutoRunPlugin';
import { useCachePlugin } from './plugins/useCachePlugin';
import { useDebouncePlugin } from './plugins/useDebouncePlugin';
import { useLoadingDelayPlugin } from './plugins/useLoadingDelayPlugin';
import { useRetryPlugin } from './plugins/useRetryPlugin';
import { useThrottlePlugin } from './plugins/useThrottlePlugin';
import type { Options, Plugin, Service } from './types';
import useRequestImpl from './useRequestImpl';
import { clearCache } from './utils/cache';

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
