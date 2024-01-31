import { DependencyList } from 'react';

import useMemoizedFn from '../useMemoizedFn';
import useRequest from '../useRequest';
import useSafeState from '../useSafeState';
import useUpdateEffect from '../useUpdateEffect';

interface PageParams {
  page: number;
  pageSize: number;
}

interface Page<T> extends PageParams {
  list: T[];
  total: number;
  totalPage?: number;
}

interface InfiniteScrollOptions<TData> {
  manual?: boolean;
  refreshDeps?: DependencyList;

  onBefore?: () => void;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
  onFinally?: (data?: TData, error?: Error) => void;
}

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 10;

function useInfiniteScroll<T>(
  service: (data: PageParams) => Promise<Page<T>>,
  options?: InfiniteScrollOptions<Page<T>>
) {
  const { manual = false, refreshDeps = [], onBefore, onSuccess, onError, onFinally } = options || {};

  const [data, setData] = useSafeState<Page<T>>();
  const [loadingMore, setLoadingMore] = useSafeState(false);
  const [noMoreData, setNoMoreData] = useSafeState(false);

  const { loading, error, run, runAsync, cancel } = useRequest(
    async (lastData: Page<T>) => {
      const currentData = await service(
        lastData
          ? {
              page: lastData.page + 1,
              pageSize: lastData.pageSize,
            }
          : {
              page: INITIAL_PAGE,
              pageSize: INITIAL_PAGE_SIZE,
            }
      );

      if (!currentData) {
        setNoMoreData(true);
        return currentData;
      }

      setNoMoreData(currentData.page * currentData.pageSize >= currentData.total);

      if (!lastData) {
        setData({
          ...currentData,
          list: [...(currentData.list || [])],
        });
      } else {
        setData({
          ...currentData,
          list: [...(lastData.list || []), ...(currentData.list || [])],
        });
      }

      return currentData;
    },
    {
      manual,
      onBefore,
      onSuccess,
      onError,
      onFinally(_, d, e) {
        setLoadingMore(false);
        onFinally?.(d, e);
      },
    }
  );

  const loadMore = useMemoizedFn(() => {
    if (noMoreData) return;

    setLoadingMore(true);
    return run(data);
  });

  const refresh = useMemoizedFn(() => {
    setLoadingMore(false);
    return runAsync();
  });

  useUpdateEffect(() => {
    run();
  }, [...refreshDeps]);

  return {
    data: data?.list || [],
    loading,
    loadingMore,
    noMoreData,
    error,

    loadMore,
    refresh,
    cancel,
    mutate: setData,
  };
}

export default useInfiniteScroll;
