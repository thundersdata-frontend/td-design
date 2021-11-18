import useLatest from '../useLatest';
import useUpdate from '../useUpdate';
import useCreation from '../useCreation';
import useMount from '../useMount';
import useUnmount from '../useUnmount';
import Fetch from './Fetch';
import useMemoizedFn from '../useMemoizedFn';

export default function useRequestImpl<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugins<TData, TParams>[] = []
) {
  const { manual = false, defaultParams, onBefore, onSuccess, onError, onFinally, ...rest } = options;

  const fetchOptions = {
    manual,
    onBefore,
    onSuccess,
    onError,
    onFinally,
    ...rest,
  };

  const serviceRef = useLatest(service);
  const forceUpdate = useUpdate();

  const fetchInstance = useCreation(() => new Fetch<TData, TParams>(serviceRef, fetchOptions, forceUpdate), []);
  fetchInstance.options = fetchOptions;
  fetchInstance.pluginImpls = plugins.map(plugin => plugin(fetchInstance, fetchOptions));

  useMount(() => {
    if (!manual) {
      const params = fetchInstance.state.params || defaultParams || ([] as unknown as TParams);
      fetchInstance.run(...params);
    }
  });

  useUnmount(() => {
    fetchInstance.cancel();
  });

  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
    refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
    run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
    runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
    mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance)),
  } as Result<TData, TParams>;
}
