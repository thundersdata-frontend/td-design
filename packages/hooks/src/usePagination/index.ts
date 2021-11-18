import { useMemo } from 'react';
import useRequest from '../useRequest';
import useUpdateEffect from '../useUpdateEffect';
import useMemoizedFn from '../useMemoizedFn';

export default function usePagination<T, TData extends PaginationData<T>, TParams extends any[] = PaginationParams>(
  service: Service<TData, TParams>,
  options: PaginationOptions<TData, TParams> = {}
) {
  const { refreshDeps = [], defaultPageSize = 10, ...rest } = options;

  const result = useRequest(service, {
    defaultParams: [{ current: 1, pageSize: defaultPageSize }] as TParams,
    ...rest,
  });

  const { current = 1, pageSize = defaultPageSize } = result.params[0] ?? {};

  const total = result.data?.total ?? 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  const onChange = (current: number, pageSize: number) => {
    let toPage = current <= 0 ? 1 : current;
    const toPageSize = pageSize <= 0 ? 1 : pageSize;
    const tempTotalPage = Math.ceil(total / toPageSize);

    if (toPage > tempTotalPage) {
      toPage = Math.max(1, tempTotalPage);
    }

    const [oldParams = {}, ...restParams] = result.params ?? [];

    result.run(
      {
        ...oldParams,
        current: toPage,
        pageSize: toPageSize,
      },
      ...restParams
    );
  };

  const changeCurrent = (current: number) => {
    onChange(current, pageSize);
  };

  const changePageSize = (pageSize: number) => {
    onChange(current, pageSize);
  };

  useUpdateEffect(() => {
    if (!options.manual) {
      changeCurrent(1);
    }
  }, [...refreshDeps]);

  return {
    ...result,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange: useMemoizedFn(onChange),
      changeCurrent: useMemoizedFn(changeCurrent),
      changePageSize: useMemoizedFn(changePageSize),
    },
  };
}
