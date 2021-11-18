import useRequestImpl from './useRequestImpl';

import { useDebouncePlugin } from './plugins/useDebouncePlugin';
import { useLoadingDelayPlugin } from './plugins/useLoadingDelayPlugin';
import { useThrottlePlugin } from './plugins/useThrottlePlugin';
import { useRefreshDepsPlugin } from './plugins/useRefreshDepsPlugin';
import { useRetryPlugin } from './plugins/useRetryPlugin';
import { useCachePlugin } from './plugins/useCachePlugin';

export default function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugins<TData, TParams>[]
) {
  return useRequestImpl<TData, TParams>(service, options, [
    ...(plugins ?? []),
    useDebouncePlugin,
    useThrottlePlugin,
    useRefreshDepsPlugin,
    useLoadingDelayPlugin,
    useRetryPlugin,
    useCachePlugin,
  ] as Plugins<TData, TParams>[]);
}
